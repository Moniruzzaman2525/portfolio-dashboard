"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { createSkills } from "@/services/Skills"
import { handleImageUpload } from "@/lib/handleImageUpload"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Skill name must be at least 2 characters.",
    }),
    image: z
        .instanceof(File, { message: "Image is required." })
        .refine((file) => file.size > 0, { message: "Image is required." }),
})

export function AddSkillForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: undefined,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)

        let imageUrl = "";
        if (values.image) {
            const uploadedUrl = await handleImageUpload(values.image);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            } else {
                alert("Image upload failed");
                return;
            }
        }
        const payload = {
            ...values,
            image: imageUrl,
        };
        try {
            const res = await createSkills(payload)

            if (res.success) {
                toast.success("Skill added successfully!")
                router.push("/skill")
            } else {
                toast.error(res?.message || "Failed to add skill")
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
                    <Button variant="outline" type="button" onClick={() => router.push("/")}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Adding..." : "Add Skill"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
