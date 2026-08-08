import { safetyService } from "@/services/safety.service";
import { shortLinkService } from "@/services/shortLink.service";
import { urlValidator } from "@/validators/url.validator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = urlValidator.safeParse(body);

        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: "Invalid payload",
                errors: result.error.format()
            },
                {
                    status: 400
                });
        }
        const isSafe = await safetyService.isUrlSafe(result.data.url);
        if (!isSafe) {
            return NextResponse.json({
                success : false, 
                message : "Url blocked: This URL is considered unsafe and has been blocked."
            })
        }

        const shortLinkUrl = await shortLinkService.generateUniqueSlug(
            result.data.url
        );
        return NextResponse.json({
            success: true,
            data: shortLinkUrl
        }, {
            status: 201
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
        },
            {
                status: 500
            })
    }
}