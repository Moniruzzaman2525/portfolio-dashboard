"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import * as z from "zod"
import { RichTextEditor } from "@/components/Dashboard/rich-text-editor"
import { createBlock } from "@/services/Blocks"
import { toast } from "sonner"
import { handleImageUpload } from "@/lib/handleImageUpload"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Block name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    type: z.string({
        required_error: "Please select a block type.",
    }),
    project: z.string({
        required_error: "Please select a project.",
    }),
    code: z.string().optional(),
    image: z.any()
})



export function BlockForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            type: "",
            code: "",
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
        const res = await createBlock(payload)

        if (res.success) {
            toast.success(res?.message);
            setIsSubmitting(false)
            router.push(`/blocks`)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Block Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter block Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Block Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ui-component">UI Component</SelectItem>
                                        <SelectItem value="feature">Feature</SelectItem>
                                        <SelectItem value="layout">Layout</SelectItem>
                                        <SelectItem value="utility">Utility</SelectItem>
                                        <SelectItem value="integration">Integration</SelectItem>
                                    </SelectContent>
                                </Select>
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
                                <RichTextEditor value={field.value} onChange={field.onChange} placeholder="Enter block description" />
                            </FormControl>
                            <FormDescription>
                                Use the toolbar to format your description with headings, lists, and more.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code Snippet (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Paste code snippet here"
                                    className="min-h-[200px] font-mono text-sm"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Add any code snippets or implementation details for this block.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload Image</FormLabel>
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
                            <FormDescription>
                                Upload a visual reference for this block, like a screenshot.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => router.push("/")}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Block"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
