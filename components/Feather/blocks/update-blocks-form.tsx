"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { RichTextEditor } from "@/components/Dashboard/rich-text-editor"
import { createBlock } from "@/services/Blocks"
import { toast } from "sonner"

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
})

// Sample project list
const projects = [
    { id: "1", name: "E-commerce Platform" },
    { id: "2", name: "CRM System" },
    { id: "3", name: "Mobile App" },
    { id: "4", name: "Marketing Website" },
    { id: "5", name: "Internal Dashboard" },
]

// Block type labels
const blockTypes: { [key: string]: string } = {
    "ui-component": "UI Component",
    "feature": "Feature",
    "layout": "Layout",
    "utility": "Utility",
    "integration": "Integration",
}

export function UpdateBlockForm({ block }: any) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            type: "",
            project: "",
            code: "",
        },
    })

    useEffect(() => {
        if (block) {
            const projectId =
                projects.find((p) => p.id === block.project || p.name === block.project)?.id || ""
            form.reset({
                name: block.name || "",
                description: block.description || "",
                type: block.type || "",
                project: projectId,
                code: block.code || "",
            })
        }
    }, [block, form])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)

        const res = await createBlock(values)

        if (res.success) {
            toast.success(res.message || "Block created successfully!")
            router.push("/blocks")
        } else {
            toast.error("Something went wrong!")
        }

        setIsSubmitting(false)
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
                                <FormLabel>Block Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter block name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) =>
                        (
                            <FormItem>
                                <FormLabel>Block Type</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type">
                                                {blockTypes[field.value] || ""}
                                            </SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.entries(blockTypes).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )
                        }
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <RichTextEditor
                                    key={field.value} 
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Enter block description"
                                />
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
                    name="project"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Associated Project</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select project">
                                            {projects.find((p) => p.id === field.value)?.name || ""}
                                        </SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {projects.map((project) => (
                                        <SelectItem key={project.id} value={project.id}>
                                            {project.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                            <FormDescription>
                                Add any code snippets or implementation details for this block.
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
                        {isSubmitting ? "Creating..." : block ? "Update Block" : "Create Block"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
