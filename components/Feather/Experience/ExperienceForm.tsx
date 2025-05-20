"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { handleImageUpload } from "@/lib/handleImageUpload"
import { RichTextEditor } from "@/components/Dashboard/rich-text-editor"
import { createExperience } from "@/services/Experience" // <-- you'll create this API function

const formSchema = z.object({
    company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
    role: z.string().min(2, { message: "Role must be at least 2 characters." }),
    startDate: z.string().min(4, { message: "Start date is required." }),
    endDate: z.string().optional(),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    image: z.any(),
})

export function ExperienceForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        let imageUrl = ""

        if (values.image) {
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

        const res = await createExperience(payload)

        if (res.success) {
            toast.success(res.message)
            router.push("/experience")
        } else {
            toast.error("Failed to create experience")
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
                                <RichTextEditor value={field.value} onChange={field.onChange} placeholder="Describe your responsibilities, achievements, etc." />
                            </FormControl>
                            <FormDescription>
                                Format the content with lists, headings, links, and more.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload Company Logo</FormLabel>
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
                            <FormDescription>Company logo or relevant image.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => router.push("/experience")}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Experience"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
