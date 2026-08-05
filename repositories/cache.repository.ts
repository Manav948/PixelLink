import { redis } from "@/lib/redis";

export interface CachePayload {
    id: string;
    longUrl: string;
}

class CacheRepository {
    async get(slug: string): Promise<CachePayload | string | null> {
        const value = await redis.get<CachePayload | string>(slug);
        return value;
    }

    async set(slug: string, value: CachePayload | string, ttlSeconds: number = 60 * 60): Promise<void> {
        await redis.set(slug, value, {
            ex: ttlSeconds,
        });
    }

    async delete(slug: string): Promise<void> {
        await redis.del(slug);
    }
}

export const cacheRepository = new CacheRepository();
