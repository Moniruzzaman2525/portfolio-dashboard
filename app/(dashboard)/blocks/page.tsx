import { BlocksTable } from "@/components/Feather/Blocks/blocks-table"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blocks",
    description: "Manage your blocks",
}

export default function BlocksPage() {
    return (
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Blocks</h1>
                <p className="text-muted-foreground">View and manage all your blocks.</p>
            </div>
            <BlocksTable />
        </div>
    )
}
