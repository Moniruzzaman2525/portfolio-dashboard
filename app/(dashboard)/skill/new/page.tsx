import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AddSkillForm } from "@/components/Feather/Skills/AddSkillForm"


export const metadata: Metadata = {
    title: "Create Skills",
    description: "Create a new Skills",
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
                <h1 className="text-2xl font-bold tracking-tight">Create Skills</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Skills Details</CardTitle>
                    <CardDescription>Fill in the details below to create a new Skills.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddSkillForm />
                </CardContent>
            </Card>
        </div>
    )
}
