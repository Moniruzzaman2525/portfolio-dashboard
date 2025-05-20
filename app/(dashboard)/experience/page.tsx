import { ExperienceTable } from "@/components/Feather/Experience/ExperienceTable"
import { getExperience } from "@/services/Experience"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Experience",
    description: "Manage your experience",
}

export default async function ExperiencePage() {
    const experience = await getExperience()
    return (
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
                <p className="text-muted-foreground">View and manage all your experience.</p>
            </div>
            <ExperienceTable experiences={experience.data} />
        </div>
    )
}
