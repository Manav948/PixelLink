import { shortLinkService } from "@/services/shortLink.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const longUrl = await shortLinkService.redirectToLongUrl(slug, {
            ipAddress:
                req.headers.get("x-forwarded-for") ??
                req.headers.get("x-real-ip") ??
                undefined,
            userAgent: req.headers.get("user-agent") ?? undefined,
            referrer: req.headers.get("referer") ?? undefined,
        })
        return NextResponse.redirect(longUrl)
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Short Url not found",
        },
            {
                status: 404
            })
    }
}