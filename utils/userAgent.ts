import { userAgentInfo } from "@/types/userAgent";

export function getUserAgent(userAgent?: string): userAgentInfo {
    if (!userAgent) {
        return {
            browser: "unknown",
            os: "unknown",
            device: "unknown"
        }
    }
    const ua = userAgent.toLowerCase();
    let device: "mobile" | "desktop" | "tablet" | "unknown" = "unknown";
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
        device = "tablet";
    } else if (/mobile|iphone|android|touch/i.test(ua)) {
        device = "mobile";
    }

    let os = "unknown";
    if (ua.includes("windows")) {
        os = "windows";
    } else if (ua.includes("macintosh") || ua.includes("mac os x")) {
        os = "macos";
    } else if (ua.includes("android")) {
        os = "android";
    } else if (ua.includes("linux")) {
        os = "linux";
    } else if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
        os = "ios";
    }

    let browser = "unknown";
    if (ua.includes("chrome") && !ua.includes("edge") && !ua.includes("opr")) {
        browser = "chrome";
    } else if (ua.includes("safari") && !ua.includes("chrome")) {
        browser = "safari";
    } else if (ua.includes("firefox")) {
        browser = "firefox";
    } else if (ua.includes("edge")) {
        browser = "edge";
    } else if (ua.includes("opr") || ua.includes("opera")) {
        browser = "opera";
    }
    return { browser, os, device };
}