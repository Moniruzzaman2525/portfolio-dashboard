"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getExperience = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experience`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                tags: ["experience"],
            },
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
}


export const createExperience = async (data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experience`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        revalidateTag("experience")
        return result;
    } catch (error: any) {
        return Error(error);
    }
}


export const deleteExperience = async (id: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experience/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
                "Content-Type": "application/json",
            },
        });
        const result = await res.json();
        revalidateTag("experience")
        return result;
    } catch (error: any) {
        return Error(error);
    }
}


export const updateExperience = async (id: any, data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experience/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        revalidateTag("experience")
        return result;
    } catch (error: any) {
        return Error(error);
    }
}

export const getSingleExperience = async (id: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experience/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                tags: ["experience"],
            },
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
}
