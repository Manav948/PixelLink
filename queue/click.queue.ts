import {Queue} from "bullmq";
import {connection} from "@/lib/queue";

export const clickQueue = new Queue("click-analytics" , {
    connection
})