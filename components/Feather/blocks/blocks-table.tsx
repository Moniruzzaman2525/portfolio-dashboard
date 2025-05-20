"use client"

import { useState } from "react"
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Search, Trash2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { deleteBlocks } from "@/services/Blocks"
import { toast } from "sonner"



export function BlocksTable({ blocks }: { blocks: any[] }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [blockToDelete, setBlockToDelete] = useState<string | null>(null)

    const [sortColumn, setSortColumn] = useState<string | null>("name")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const filteredBlocks = blocks?.filter(
        (block) =>
            block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            block.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            block.project.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const sortedBlocks = [...filteredBlocks].sort((a, b) => {
        if (!sortColumn) return 0

        const aValue = a[sortColumn as keyof typeof a]
        const bValue = b[sortColumn as keyof typeof b]

        if (sortDirection === "asc") {
            return aValue > bValue ? 1 : -1
        } else {
            return aValue < bValue ? 1 : -1
        }
    })

    const handleDeleteClick = (blockId: string) => {
        setBlockToDelete(blockId)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = async () => {
        const res = await deleteBlocks(blockToDelete)
        if (res.success) {
            toast.success(res?.message);
        }
        setDeleteDialogOpen(false)
        setBlockToDelete(null)
    }

    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div>
                    <CardTitle>Blocks</CardTitle>
                    <CardDescription>Manage your reusable blocks and components.</CardDescription>
                </div>
                <div className="flex w-full sm:w-auto items-center space-x-2">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search blocks..."
                            className="w-full pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button asChild>
                        <Link href="/blocks/new">New Block</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("name")}>
                                        <span>Name</span>
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("type")}>
                                        <span>Type</span>
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("project")}>
                                        <span>Project</span>
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("createdAt")}>
                                        <span>Created</span>
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden lg:table-cell">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("updatedAt")}>
                                        <span>Updated</span>
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedBlocks.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No blocks found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                sortedBlocks.map((block) => (
                                    <TableRow key={block._id}>
                                        <TableCell className="font-medium">{block.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={block.type === "UI Component" ? "outline" : "secondary"}>{block.type}</Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">{block.project}</TableCell>
                                        <TableCell className="hidden md:table-cell">{block.createdAt}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{block.updatedAt}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    {/* <DropdownMenuItem asChild>
                                                        <Link href={`/blocks/${block._id}`}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem> */}
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/blocks/${block._id}/edit`}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:text-destructive"
                                                        onClick={() => handleDeleteClick(block._id)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this block?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the block and remove it from any projects using
                            it.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}
