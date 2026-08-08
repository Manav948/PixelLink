const BLOCKED_DOMAINS = [
    "malware.testing.google.test",
    "phishing.example.com",
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
];
export class SafetyService {
    //  return true or false is the url is safe or not
    async isUrlSafe(url: string): Promise<boolean> {
        try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname;
            if (BLOCKED_DOMAINS.some(domain => hostname === domain || hostname.endsWith(`.${domain}`))) {
                return false;
            }
            const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
            if (apiKey) {
                const apiResponse = await this.checkGoogleSafeBrowsing(url, apiKey);
                if (!apiResponse) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.error("Error checking URL safety:", error);
            return true; // If there's an error, assume the URL is safe to avoid false positives
        }
    }
    private async checkGoogleSafeBrowsing(url: string, apiKey: string): Promise<boolean> {
        try {
            const response = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client: { clientId: "shortner", clientVersion: "1.0.0" },
                    threatInfo: {
                        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                        platformTypes: ["ANY_PLATFORM"],
                        threatEntryTypes: ["URL"],
                        threatEntries: [{ url }]
                    }
                })
            })
            const data = await response.json();
            return !data.matches || data.matches.length === 0;
        } catch (error) {
            return true;
        }
    }
}

export const safetyService = new SafetyService();