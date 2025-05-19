import type { Metadata } from "next"
import Dashboard from "@/components/Feather/Home/Dashboard"
import DashboardOverview from "@/components/Feather/Home/DashboardOverview"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your projects and blocks",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-8">
      <Dashboard />
      <DashboardOverview />
    </div>
  )
}
