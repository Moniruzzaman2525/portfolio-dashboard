import { ProjectForm } from '@/components/Feather/Projects/project-form';
import { UpdateProjectForm } from '@/components/Feather/Projects/update-project-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSingleProject } from '@/services/Projects';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const UpdateProject = async ({ params }: { params: { projectId: string } }) => {

    const projectId = await params
    const id = projectId?.projectId

    const project = await getSingleProject(id)

    return (
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">Create Project</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                    <CardDescription>Fill in the details below to create a new project.</CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateProjectForm project={project.data} />
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateProject;
