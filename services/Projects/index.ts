"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getProjects = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                tags: ["projects"],
            },
        });
        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
}


export const createProject = async (data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        revalidateTag("projects")
        return result;
    } catch (error: any) {
        return Error(error);
    }
}

export const updateProject = async (id: any, data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        console.log(result)
        revalidateTag("projects")
        return result;
    } catch (error: any) {
        return Error(error);
    }
}

export const deleteProjects = async (id: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
                "Content-Type": "application/json",
            },
        });
        const result = await res.json();
        revalidateTag("projects")
        return result;
    } catch (error: any) {
        return Error(error);
    }
}


export const getSingleProject = async (id: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                tags: ["projects"],
            },
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
}
