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
        }),
    customSlug: z.string()
        .trim()
        .min(1, { message: "Custom slug is required" })
        .max(100, { message: "Custom slug is too long" })
        .regex(/^[a-zA-Z0-9_-]+$/, { message: "Custom slug can only contain letters, numbers, hyphens, and underscores" })
        .optional(),
    expiryDate: z.string()
        .datetime({ message: "Expiry date must be a valid ISO 8601 date string" })
        .optional(),
});


export type UrlValidator = z.infer<typeof urlValidator>;
