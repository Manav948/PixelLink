import z from "zod";

export const urlValidator = z.object({
    url: z.string()
        .trim()
        .min(1, { message: "URL is required" })
        .max(2048, { message: "URL is too long" })
        .url({ message: "Invalid URL" })
        .refine((url) => {
            try {
                const protocol = new URL(url).protocol;
                return protocol === "http:" || protocol === "https:";
            } catch {
                return false;
            }
        }, {
            message: "Only HTTP or HTTPS URLs are allowed"
        })
});

export type UrlValidator = z.infer<typeof urlValidator>;