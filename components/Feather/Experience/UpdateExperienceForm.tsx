"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { handleImageUpload } from "@/lib/handleImageUpload"
import { RichTextEditor } from "@/components/Dashboard/rich-text-editor"
import { updateExperience } from "@/services/Experience"

const formSchema = z.object({
    company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
    role: z.string().min(2, { message: "Role must be at least 2 characters." }),
    startDate: z.string().min(4, { message: "Start date is required." }),
    endDate: z.string().optional(),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    image: z.any().optional(),
})

type UpdateExperienceFormProps = {
    experience: {
        _id: string
        company: string
        role: string
        startDate: string
        endDate?: string
        description: string
        image?: string
    }
}

export function UpdateExperienceForm({ experience }: UpdateExperienceFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(experience.image || null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: experience.company,
            role: experience.role,
            startDate: experience.startDate,
            endDate: experience.endDate,
            description: experience.description,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        let imageUrl = imagePreview || ""

        // If a new file was uploaded
        if (values.image instanceof File) {
            const uploadedUrl = await handleImageUpload(values.image)
            if (uploadedUrl) {
                imageUrl = uploadedUrl
            } else {
                toast.error("Image upload failed")
                setIsSubmitting(false)
                return
            }
        }

        const payload = {
            ...values,
            endDate: values.endDate?.trim() || "Present",
            image: imageUrl,
        }

        const res = await updateExperience(experience._id, payload)

        console.log(res)
        if (res.success) {
            toast.success(res.message || "Experience updated successfully")
            router.push("/experience")
        } else {
            toast.error("Failed to update experience")
        }

        setIsSubmitting(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter company name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your role" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <RichTextEditor value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormDescription>Describe your responsibilities and achievements.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Update Logo</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            field.onChange(file)
                                            const reader = new FileReader()
                                            reader.onloadend = () => {
                                                setImagePreview(reader.result as string)
                                            }
                                            reader.readAsDataURL(file)
                                        }
                                    }}
                                />
                            </FormControl>
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mt-2 h-32 rounded-md border object-cover"
                                />
                            )}
                            <FormDescription>Upload a new company logo if needed.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => router.push("/experience")}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Experience"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
