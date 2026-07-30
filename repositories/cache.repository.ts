import { redis } from "@/lib/redis"
class CacheRepository {
    async get(slug: string) {
        return await redis.get(slug)
    }

    async set(slug: string, longUrl: string) {
        await redis.set(slug, longUrl, {
            ex: 60 * 60
        })
    }
    async delete(slug : string) {
        await redis.del(slug)
    }
}

export const cacheRepository = new CacheRepository()