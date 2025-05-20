
import { UpdateBlockForm } from '@/components/Feather/Blocks/update-blocks-form';
import { UpdateExperienceForm } from '@/components/Feather/Experience/UpdateExperienceForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSingleExperience } from '@/services/Experience';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
const updateExp = async ({ params }: { params: { expId: string } }) => {

    const expId = await params
    const id = expId?.expId
    const experience = await getSingleExperience(id)

    return (
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">Create Experience</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Experience Details</CardTitle>
                    <CardDescription>Fill in the details below to create a new Experience.</CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateExperienceForm experience={experience.data} />
                </CardContent>
            </Card>
        </div>
    );
};

export default updateExp;
