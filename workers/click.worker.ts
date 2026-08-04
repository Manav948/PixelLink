import { Worker } from "bullmq";
import { connection } from "@/lib/queue";
import { shortLinkRepository } from "@/repositories/shortLink.repository";

new Worker("click-analytics", async (job) => {
    const { shortLinkId, ipAddress, userAgent, referrer } = job.data;

    await shortLinkRepository.incrementClickCountById(shortLinkId);

    await shortLinkRepository.createClick({
        shortLinkId,
        ipAddress,
        userAgent,
        referrer
    })
    console.log(`processed click for ${shortLinkId}`)
}, {
    connection
})