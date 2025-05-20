import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const authRoutes = ["/login", "/register"];

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("accessToken")?.value;

    let userInfo = null;

    if (accessToken) {
        try {
            userInfo = jwtDecode(accessToken);
        } catch (err) {
            console.error("JWT Decode failed", err);
        }
    }


    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }


    if (authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        "/",
        "/projects/:path*",
        "/blocks/:path*",
        "/login",
        "/register",
    ],
};
