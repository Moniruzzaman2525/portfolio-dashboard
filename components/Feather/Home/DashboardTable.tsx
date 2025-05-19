import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { ProjectsTable } from '../Projects/projects-table';
import { BlocksTable } from './blocks-table';

const DashboardTable = () => {
    return (
        <div>
            <Tabs defaultValue="projects" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-auto">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="blocks">Blocks</TabsTrigger>
                </TabsList>
                <TabsContent value="projects" className="mt-4">
                    <ProjectsTable />
                </TabsContent>
                <TabsContent value="blocks" className="mt-4">
                    <BlocksTable />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DashboardTable;
