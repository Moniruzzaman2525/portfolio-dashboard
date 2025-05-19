import { ProjectsTable } from "@/components/Feather/Projects/projects-table"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Projects",
    description: "Manage your projects",
}

export default function ProjectsPage() {
    return (
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <p className="text-muted-foreground">View and manage all your projects.</p>
            </div>
            <ProjectsTable />
        </div>
    )
}
