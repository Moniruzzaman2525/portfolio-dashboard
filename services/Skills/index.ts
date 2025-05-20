"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getSkills = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                tags: ["skills"],
            },
        });
        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
}


export const createSkills = async (data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        revalidateTag("skills")
        return result;
    } catch (error: any) {
        return Error(error);
    }
}

export const updateSkills = async (id: any, data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        console.log(result)
        revalidateTag("skills")
        return result;
    } catch (error: any) {
        return Error(error);
    }
}

export const deleteSkills = async (id: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
                "Content-Type": "application/json",
            },
        });
        const result = await res.json();
        revalidateTag("skills")
        return result;
    } catch (error: any) {
        return Error(error);
    }
}


export const getSingleSkill = async (id: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                tags: ["skills"],
            },
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
}
