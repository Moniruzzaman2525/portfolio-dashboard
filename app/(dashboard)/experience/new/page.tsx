import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlockForm } from "@/components/Feather/Blocks/block-form"
import { ExperienceForm } from "@/components/Feather/Experience/ExperienceForm"


export const metadata: Metadata = {
    title: "Create Block",
    description: "Create a new block",
}

export default function CreateBlockPage() {
    return (
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">Create Block</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Block Details</CardTitle>
                    <CardDescription>Fill in the details below to create a new block.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ExperienceForm />
                </CardContent>
            </Card>
        </div>
    )
}
