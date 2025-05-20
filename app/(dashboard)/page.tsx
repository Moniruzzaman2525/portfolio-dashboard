import type { Metadata } from "next"
import Dashboard from "@/components/Feather/Home/Dashboard"
import DashboardHistory from "@/components/Feather/Home/DashboardHistory"
import DashboardOverview from "@/components/Feather/Home/DashboardOverview"
import DashboardTable from "@/components/Feather/Home/DashboardTable"
import { getProjects } from "@/services/Projects"
import { getBlocks } from "@/services/Blocks"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Manage your projects and blocks",
}

export default async function DashboardPage() {
    const projects = await getProjects()
    const blocks = await getBlocks()
    return (
        <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-8">
            <Dashboard />
            <DashboardHistory projects={projects?.data} blocks={blocks?.data} />
            <DashboardOverview />
            <DashboardTable projects={projects} blocks={blocks} />
        </div>
    )
}
