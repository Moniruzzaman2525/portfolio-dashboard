"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
    {
        name: "Jan",
        projects: 3,
        blocks: 7,
    },
    {
        name: "Feb",
        projects: 2,
        blocks: 5,
    },
    {
        name: "Mar",
        projects: 1,
        blocks: 4,
    },
    {
        name: "Apr",
        projects: 2,
        blocks: 6,
    },
    {
        name: "May",
        projects: 4,
        blocks: 8,
    },
    {
        name: "Jun",
        projects: 3,
        blocks: 9,
    },
    {
        name: "Jul",
        projects: 5,
        blocks: 12,
    },
    {
        name: "Aug",
        projects: 2,
        blocks: 7,
    },
    {
        name: "Sep",
        projects: 2,
        blocks: 10,
    },
    {
        name: "Oct",
        projects: 0,
        blocks: 5,
    },
    {
        name: "Nov",
        projects: 0,
        blocks: 0,
    },
    {
        name: "Dec",
        projects: 0,
        blocks: 0,
    },
]

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip />
                <Bar dataKey="projects" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Projects" />
                <Bar dataKey="blocks" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} name="Blocks" />
            </BarChart>
        </ResponsiveContainer>
    )
}
