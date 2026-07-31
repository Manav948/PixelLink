import { cacheRepository } from "@/repositories/cache.repository";
import { shortLinkRepository } from "@/repositories/shortLink.repository";
import { createSlug } from "@/utils/slug";

const Max_try = 5;
export class ShortLinkService {
    async generateUniqueSlug(longUrl: string) {
        let attempts = 0;
        while (attempts < Max_try) {
            const slug = createSlug();
            const exists = await shortLinkRepository.existsBySlug(slug);

            if (!exists) {
                return await shortLinkRepository.createShortLink({
                    slug,
                    longUrl
                })
            }
            attempts++;
        }
        throw new Error("Unable to generate unique slug. please try again later.");
    }

    async redirectToLongUrl(
        slug: string,
        analytics: {
            ipAddress?: string,
            userAgent?: string,
            referrer?: string,
        }
    ) {
        const cachedUrl = await shortLinkRepository.findBySlug(slug);

        if (cachedUrl) {
            return cachedUrl
        }

        const shortLink = await shortLinkRepository.findBySlug(slug);
        if (!shortLink) {
            throw new Error("Short Url not found");
        }
        await cacheRepository.set(slug, shortLink.longUrl);

        await shortLinkRepository.incrementClickCount(slug);
        try {
            await shortLinkRepository.createClick({
                shortLinkId: shortLink.id,
                ipAddress: analytics.ipAddress,
                userAgent: analytics.userAgent,
                referrer: analytics.referrer,
            })
        } catch (error) {
            console.error("Analytics Error:", error);
        }
        return shortLink.longUrl;
    }
}

export const shortLinkService = new ShortLinkService();