import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectForm } from "@/components/Feather/Projects/project-form"


export const metadata: Metadata = {
    title: "Create Project",
    description: "Create a new project",
}

export default function CreateProjectPage() {
    return (
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">Create Project</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                    <CardDescription>Fill in the details below to create a new project.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProjectForm />
                </CardContent>
            </Card>
        </div>
    )
}
