import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export class ShortLinkRepository {
    async existsBySlug(slug: string): Promise<boolean> {
        const shortLink = await prisma.shortLink.findUnique({
            where: {
                slug,
            },
            select: {
                id: true,
            },
        });
        return shortLink !== null;
    }

    async createShortLink(data: Prisma.ShortLinkCreateInput) {
        return await prisma.shortLink.create({
            data,
        });
    }

    async findBySlug(slug: string) {
        return await prisma.shortLink.findUnique({
            where: {
                slug,
            },
        });
    }

    async recordClick(data: {
        shortLinkId: string;
        ipAddress?: string;
        userAgent?: string;
        referrer?: string;
    }) {
        return await prisma.$transaction([
            prisma.shortLink.update({
                where: { id: data.shortLinkId },
                data: {
                    clickCount: {
                        increment: 1,
                    },
                },
            }),
            prisma.click.create({
                data: {
                    shortLinkId: data.shortLinkId,
                    ipAddress: data.ipAddress,
                    userAgent: data.userAgent,
                    referrer: data.referrer,
                },
            }),
        ]);
    }

    async getAnalyticsBySlug(slug: string) {
        return await prisma.shortLink.findUnique({
            where: {
                slug,
            },
            include: {
                clicks: {
                    orderBy: {
                        clickedAt: "desc",
                    },
                    take: 100,
                },
            },
        });
    }
}

export const shortLinkRepository = new ShortLinkRepository();