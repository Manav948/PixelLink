import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const totalLink = await prisma.shortLink.count();
        const aggregatedClicks = await prisma.shortLink.aggregate({
            _sum: {
                clickCount: true
            }
        })
        const topLinks = await prisma.shortLink.findMany({
            orderBy: {
                clickCount: "desc"
            },
            take: 5,
            select: {
                id: true,
                slug: true,
                longUrl: true,
                clickCount: true,
                createdAt: true
            }
        })
        return NextResponse.json({
            success: true,
            data: {
                totalLinks: totalLink,
                totalClicks: aggregatedClicks._sum.clickCount || 0,
                topLinks: topLinks
            }
        })
    } catch (error) {
        console.error("Overview Analytics Error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
        }, {
            status: 500
        })
    }

}