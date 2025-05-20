"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getBlocks = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blocks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                tags: ["blocks"],
            },
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
}


export const createBlock = async (data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blocks`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        revalidateTag("blocks")
        return result;
    } catch (error: any) {
        return Error(error);
    }
}


export const deleteBlocks = async (id: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blocks/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
                "Content-Type": "application/json",
            },
        });
        const result = await res.json();
        revalidateTag("blocks")
        return result;
    } catch (error: any) {
        return Error(error);
    }
}


export const updateBlock = async (id: any, data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blocks/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        revalidateTag("blocks")
        return result;
    } catch (error: any) {
        return Error(error);
    }
}

export const getSingleBlock = async (id: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blocks/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                tags: ["blocks"],
            },
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
}
