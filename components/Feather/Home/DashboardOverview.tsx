import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Overview } from './Overview';
import { RecentActivity } from '@/components/Dashboard/recent-activity';

const DashboardOverview = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>Project and block creation over time.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <Overview />
                </CardContent>
            </Card>
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest actions on your dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RecentActivity />
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardOverview;
