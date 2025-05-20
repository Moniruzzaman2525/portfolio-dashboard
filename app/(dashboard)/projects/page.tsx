import { ProjectsTable } from "@/components/Feather/Projects/projects-table"
import { getProjects } from "@/services/Projects"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Projects",
    description: "Manage your projects",
}

export default async function ProjectsPage() {

    const projects = await getProjects()
    console.log(projects)


    return (
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <p className="text-muted-foreground">View and manage all your projects.</p>
            </div>
            <ProjectsTable projects={projects.data} />
        </div>
    )
}
