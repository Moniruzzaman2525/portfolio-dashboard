import { ProjectsTable } from "@/components/Feather/Projects/projects-table"
import { SkillsTable } from "@/components/Feather/Skills/SkillsTable"
import { getProjects } from "@/services/Projects"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Projects",
    description: "Manage your projects",
}

export default async function ProjectsPage() {

    const projects = await getProjects()


    return (
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
                <p className="text-muted-foreground">View and manage all your skills.</p>
            </div>
            <SkillsTable skills={projects.data} />
        </div>
    )
}
