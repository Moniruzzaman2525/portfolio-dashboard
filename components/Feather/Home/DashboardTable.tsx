import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { ProjectsTable } from '../Projects/projects-table';

import { getBlocks } from '@/services/Blocks';
import { getProjects } from '@/services/Projects';
import { BlocksTable } from '../Blocks/blocks-table';

const DashboardTable = async () => {
    const projects = await getProjects()
    const blocks = await getBlocks()
    return (
        <div>
            <Tabs defaultValue="projects" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-auto">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="blocks">Blocks</TabsTrigger>
                </TabsList>
                <TabsContent value="projects" className="mt-4">
                    <ProjectsTable projects={projects.data} />
                </TabsContent>
                <TabsContent value="blocks" className="mt-4">
                    <BlocksTable blocks={blocks.data} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DashboardTable;
