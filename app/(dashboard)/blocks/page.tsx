import { BlocksTable } from "@/components/Feather/Blocks/blocks-table"
import { getBlocks } from "@/services/Blocks"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blocks",
    description: "Manage your blocks",
}

export default async function BlocksPage() {
    let blocksData = []

    try {
        const blocks = await getBlocks()
        if (blocks && Array.isArray(blocks.data)) {
            blocksData = blocks.data
        } else {
            console.error("Unexpected response from getBlocks():", blocks)
        }
    } catch (error) {
        console.error("Failed to fetch blocks:", error)
    }

    return (
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Blocks</h1>
                <p className="text-muted-foreground">View and manage all your blocks.</p>
            </div>
            <BlocksTable blocks={blocksData} />
        </div>
    )
}
