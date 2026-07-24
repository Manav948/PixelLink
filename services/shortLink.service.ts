import { shortLinkRepository } from "@/repositories/shortLink.repository";
import { createSlug } from "@/utils/slug";

const Max_try = 5;
export class ShortLinkService {
    async generateUniqueSlug(longUrl : string) {
        let attempts = 0;
        while(attempts < Max_try){
            const slug = createSlug();
            const exists = await shortLinkRepository.existsBySlug(slug);

            if(!exists){
                return await shortLinkRepository.createShortLink({
                    slug,
                    longUrl
                })
            }
            attempts++;
        }
        throw new Error("Unable to generate unique slug. please try again later.");
    }
}

export const shortLinkService = new ShortLinkService();