import { clickQueue } from "@/queue/click.queue";
import { cacheRepository, CachePayload } from "@/repositories/cache.repository";
import { shortLinkRepository } from "@/repositories/shortLink.repository";
import { createSlug } from "@/utils/slug";

const MAX_TRY = 5;

export interface AnalyticsData {
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
}

export class ShortLinkService {
    async generateUniqueSlug(longUrl: string) {
        let attempts = 0;
        while (attempts < MAX_TRY) {
            const slug = createSlug();
            const exists = await shortLinkRepository.existsBySlug(slug);

            if (!exists) {
                try {
                    return await shortLinkRepository.createShortLink({
                        slug,
                        longUrl,
                    });
                } catch {
                    // Handles rare race condition where two workers generate the same slug
                    attempts++;
                    continue;
                }
            }
            attempts++;
        }
        throw new Error("Unable to generate unique slug. Please try again later.");
    }

    async redirectToLongUrl(slug: string, analytics: AnalyticsData): Promise<string> {
        // 1. Attempt to read from Redis cache
        const cached = await cacheRepository.get(slug);

        if (cached) {
            let shortLinkId: string | null = null;
            let longUrl: string | null = null;

            if (typeof cached === "string") {
                try {
                    const parsed = JSON.parse(cached) as CachePayload;
                    if (parsed && parsed.id && parsed.longUrl) {
                        shortLinkId = parsed.id;
                        longUrl = parsed.longUrl;
                    } else {
                        longUrl = cached;
                    }
                } catch {
                    longUrl = cached;
                }
            } else if (typeof cached === "object" && cached !== null) {
                shortLinkId = cached.id;
                longUrl = cached.longUrl;
            }

            if (longUrl) {
                if (shortLinkId) {
                    this.enqueueClick(shortLinkId, analytics);
                }
                return longUrl;
            }
        }

        // 2. Cache miss: Fetch from PostgreSQL database
        const shortLink = await shortLinkRepository.findBySlug(slug);

        if (!shortLink) {
            throw new Error("SHORT_LINK_NOT_FOUND");
        }

        if (!shortLink.isActive) {
            throw new Error("SHORT_LINK_INACTIVE");
        }

        if (shortLink.expiryDate && new Date(shortLink.expiryDate) < new Date()) {
            throw new Error("SHORT_LINK_EXPIRED");
        }

        // 3. Populate Redis Cache
        const cachePayload: CachePayload = {
            id: shortLink.id,
            longUrl: shortLink.longUrl,
        };
        await cacheRepository.set(slug, cachePayload);

        // 4. Enqueue click analytics tracking
        this.enqueueClick(shortLink.id, analytics);

        return shortLink.longUrl;
    }

    private async enqueueClick(shortLinkId: string, analytics: AnalyticsData) {
        try {
            await clickQueue.add("track-click", {
                shortLinkId,
                ipAddress: analytics.ipAddress,
                userAgent: analytics.userAgent,
                referrer: analytics.referrer,
            });
        } catch (error) {
            console.error("Analytics Queue Error:", error);
        }
    }
    async createShortLink(params: { longUrl: string; customSlug?: string; expiryDate?: string }) {
        const { longUrl, customSlug, expiryDate } = params
        const expiryDateTime = expiryDate ? new Date(expiryDate) : undefined;

        if(customSlug) {
            const exists = await shortLinkRepository.existsBySlug(customSlug);
            if(exists) {
                throw new Error("CUSTOM_SLUG_ALREADY_EXISTS");
            }
            return await shortLinkRepository.createShortLink({
                slug : customSlug,
                longUrl,
                expiryDate : expiryDateTime
            })
        }
        let attempts = 0;
        while(attempts < MAX_TRY) {
            const slug = createSlug();
            const exists = await shortLinkRepository.existsBySlug(slug)
            if(!exists) {
                try {
                    return await shortLinkRepository.createShortLink({
                        slug,
                        longUrl,
                        expiryDate : expiryDateTime
                    })
                } catch (error) {
                    attempts++;
                    continue;
                }
            }
            attempts++;
        }
        throw new Error("Unable to generate unique slug. Please try again later.");
    }
}

export const shortLinkService = new ShortLinkService();
