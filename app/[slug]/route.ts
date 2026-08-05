import { shortLinkService } from "@/services/shortLink.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const forwardedFor = req.headers.get("x-forwarded-for");
        const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : (req.headers.get("x-real-ip") ?? undefined);

        const longUrl = await shortLinkService.redirectToLongUrl(slug, {
            ipAddress: clientIp,
            userAgent: req.headers.get("user-agent") ?? undefined,
            referrer: req.headers.get("referer") ?? undefined,
        });

        return NextResponse.redirect(longUrl, 307);
    } catch (error: any) {
        const message = error?.message;

        if (message === "SHORT_LINK_EXPIRED") {
            return NextResponse.json(
                { success: false, message: "This short link has expired" },
                { status: 410 }
            );
        }

        if (message === "SHORT_LINK_INACTIVE") {
            return NextResponse.json(
                { success: false, message: "This short link is currently inactive" },
                { status: 410 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Short URL not found" },
            { status: 404 }
        );
    }
}