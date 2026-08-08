import { Worker } from "bullmq";
import { connection } from "@/lib/queue";
import { shortLinkRepository } from "@/repositories/shortLink.repository";
import { getUserAgent } from "@/utils/userAgent";

new Worker("click-analytics", async (job) => {
    const { shortLinkId, ipAddress, userAgent, referrer } = job.data;

    const deviceDetails = getUserAgent(userAgent);

    await shortLinkRepository.recordClick({
        shortLinkId,
        ipAddress,
        userAgent,
        referrer,
    });

    console.log(
        `[Worker] Processed click for ${shortLinkId} | Device: ${deviceDetails.device} | OS: ${deviceDetails.os} | Browser: ${deviceDetails.browser}`
    );
}, {
    connection,
});
