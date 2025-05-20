"use server";

import { cookies } from "next/headers";

export const getBlocks = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blocks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
        return result;
    } catch (error: any) {
        return Error(error);
    }
}


