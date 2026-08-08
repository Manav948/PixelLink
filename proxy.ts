import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/redis";

const RATE_LIMIT_WINDOW_SECONDS = 60;
const MAX_POST_REQUESTS = 10;
const MAX_GET_REQUESTS = 100

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isCreateRoute = pathname === "/api/url" && request.method === "POST";
    const isRedirectRoute = !pathname.startsWith("/api") && !pathname.startsWith("/_next") && pathname !== "/favicon.ico";

    if (!isCreateRoute && !isRedirectRoute) {
        return NextResponse.next();
    }
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const limit = isCreateRoute ? MAX_POST_REQUESTS : MAX_GET_REQUESTS;
    const key = `ratelimit:${isCreateRoute ? "create" : "redirect"}: ${ip}`

    try {
        const currentRequest = await redis.incr(key);

        if (currentRequest === 1) {
            await redis.expire(key, RATE_LIMIT_WINDOW_SECONDS);
        }

        if (currentRequest > limit) {
            return NextResponse.json({
                success: false,
                message: "Too many requests. Please try again later."
            }, {
                status: 429
            })
        }
    } catch (error) {
        console.log("Error in middleware file");
        console.error("Middleware Rate Limiting Error:", error);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/api/url", "/:slug*"]
}