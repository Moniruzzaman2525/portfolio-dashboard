"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { handleImageUpload } from "@/lib/handleImageUpload"
import { updateSkills } from "@/services/Skills"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Skill name must be at least 2 characters.",
    }),
    image: z
        .union([z.instanceof(File), z.string()])
        .refine((val) => {
            if (typeof val === "string") return true // existing image URL
            return val instanceof File && val.size > 0 // new file
        }, {
            message: "Image is required.",
        }),
})

type SkillType = {
    _id: string
    name: string
    image: string
}

export function UpdateSkillForm({ skill }: { skill: SkillType }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: skill.name,
            image: "",
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)

        let imageUrl = typeof values.image === "string" ? values.image : ""

        // Only upload if a new file is selected
        if (values.image instanceof File) {
            const uploadedUrl = await handleImageUpload(values.image)

            if (!uploadedUrl) {
                toast.error("Image upload failed.")
                setIsSubmitting(false)
                return
            }
            imageUrl = uploadedUrl
        }

        const payload = {
            name: values.name,
            image: imageUrl,
        }

        try {
            const res = await updateSkills(skill._id, payload)

            if (res.success) {
                toast.success("Skill updated successfully!")
                router.push("/skill")
            } else {
                toast.error(res?.message || "Failed to update skill")
            }
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skill Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter skill name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skill Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => router.push("/skill")}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Skill"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
