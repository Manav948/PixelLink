import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export class ShortLinkRepository {
    async existsBySlug(slug: string): Promise<boolean> {
        const shortLink = await prisma.shortLink.findUnique({
            where: {
                slug,
            },
            select: {
                id: true
            }
        })
        return shortLink !== null
    }
    async createShortLink(data: Prisma.ShortLinkCreateInput) {
        return await prisma.shortLink.create({
            data
        })
    }
    async findBySlug(slug: string) {
        return await prisma.shortLink.findUnique({
            where: {
                slug
            }
        })
    }
    async incrementClickCount(slug: string) {
        return await prisma.shortLink.update({
            where: {
                slug,
            },
            data: {
                clickCount: {
                    increment: 1
                }
            }
        })
    }
    async createClick(data: {
        shortLinkId: string,
        ipAddress?: string,
        userAgent?: string,
        referrer?: string,
    }) {
        return await prisma.click.create({
            data
        })
    }
}
export const shortLinkRepository = new ShortLinkRepository();