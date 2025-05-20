
import { UpdateBlockForm } from '@/components/Feather/Blocks/update-blocks-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSingleBlock } from '@/services/Blocks';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
const BlocksId = async ({ params }: { params: { blockId: string } }) => {

    const blockId = await params
    const id = blockId?.blockId
    const block = await getSingleBlock(id)

    return (
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">Create Block</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Block Details</CardTitle>
                    <CardDescription>Fill in the details below to create a new Block.</CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateBlockForm block={block.data} />
                </CardContent>
            </Card>
        </div>
    );
};

export default BlocksId;
