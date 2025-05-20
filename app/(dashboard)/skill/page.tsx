
import { SkillsTable } from "@/components/Feather/Skills/SkillsTable"
import { getSkills } from "@/services/Skills"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Skills",
    description: "Manage your Skills",
}

export default async function SkillsPage() {

    const skills = await getSkills()


    return (
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
                <p className="text-muted-foreground">View and manage all your skills.</p>
            </div>
            <SkillsTable skills={skills.data} />
        </div>
    )
}
