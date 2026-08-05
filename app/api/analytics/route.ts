import { shortLinkRepository } from "@/repositories/shortLink.repository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug");

        if (!slug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Query parameter 'slug' is required",
                },
                { status: 400 }
            );
        }

        const analytics = await shortLinkRepository.getAnalyticsBySlug(slug);

        if (!analytics) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Short URL not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                id: analytics.id,
                slug: analytics.slug,
                longUrl: analytics.longUrl,
                clickCount: analytics.clickCount,
                isActive: analytics.isActive,
                expiryDate: analytics.expiryDate,
                createdAt: analytics.createdAt,
                updatedAt: analytics.updatedAt,
                recentClicks: analytics.clicks,
            },
        });
    } catch (error) {
        console.error("Analytics Endpoint Error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}
