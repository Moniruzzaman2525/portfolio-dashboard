import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Manage your projects and blocks in one place.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild>
                    <Link href="/projects/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Project
                    </Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/blocks/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Block
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;
