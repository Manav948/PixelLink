import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
    let dbStatus = "DOWN";
    let redisStatus = "DOWN";

    try {
        await prisma.$queryRaw`SELECT 1`;
        dbStatus = "UP";
    } catch (error) {
        console.log("PostGress is connection is not working and not connected");
        console.error("Health Check - Postgres Error:", error);
    }
    try {
        await redis.ping();
        redisStatus = "UP";
    } catch (error) {
        console.log("Redis is not connected successfully something wrong");
        console.error("Health Check - Redis Error:", error);
    }
    const isHealthy = dbStatus === "UP" && redisStatus === "UP";
    const statusCode = isHealthy ? 200 : 503;
    return NextResponse.json(
        {
            status: isHealthy ? "Connected Successfully" : "Not Connected",
            timestamp: new Date().toISOString(),
            database: dbStatus,
            rediis: redisStatus,
        },
        {
            status: statusCode,
        }
    )
}