"use client"
import { urlValidator, UrlValidator } from "@/validators/url.validator";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, Clock, ShieldCheck, Sparkles } from "lucide-react"

interface ShortFormProps {
    onSuccess: (
        data: {
            shortUrl: string,
            slug: string,
            longUrl: string
        }
    ) => void
}
export function ShortForm({ onSuccess }: ShortFormProps) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<UrlValidator>({
        resolver: zodResolver(urlValidator),
        defaultValues: {
            url: "",
            customSlug: "",
        }
    })
    const createShortLinkMutation = useMutation({
        mutationFn: async (formData: UrlValidator) => {
            try {
                const res = await axios.post("/api/url", {
                    url: formData.url,
                    customSlug: formData.customSlug
                })
                return res.data.data
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw new Error(
                        error.response?.data?.message || "Failed to shorten URL."
                    );
                }

                throw new Error("Something went wrong.");
            }
        },
        onSuccess: (data) => {
            toast.success("Short URL generated successfully!");
            onSuccess({
                shortUrl: data.shortUrl || `${window.location.origin}/${data.slug}`,
                slug: data.slug,
                longUrl: data.longUrl
            })
            reset();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to shorten URL.");
        }
    })
    const onSubmit = (data: UrlValidator) => {
        createShortLinkMutation.mutate(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>
                        Destination URL
                    </label>
                    <Input
                        type="text"
                        placeholder="Paste long URL (e.g. https://example.com/very-long-link)..."
                        {...register("url")}
                    />
                    {errors.url && (
                        <p className="text-xs text-rose-400 font-medium pl-1">{errors.url.message}</p>
                    )}
                </div>
                <div>
                    <Button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className=""
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        {showAdvanced ? "Hide Custom Option" : "Add Custom Alias (Optional)"}
                    </Button>
                </div>
                {showAdvanced && (
                    <div>
                        <label>
                            Custom Alias (Optional)
                        </label>
                        <Input
                            type="text"
                            placeholder="e.g. my-custom-link"
                            {...register("customSlug")}
                        />
                        {errors.customSlug && (
                            <p className="text-xs text-rose-400 font-medium pl-1">
                                {errors.customSlug.message}
                            </p>
                        )}
                    </div>
                )}
                <Button
                    type="submit"
                    isLoading={createShortLinkMutation.isPending}
                    className=""
                >
                    Shorten Url
                    <ArrowRight className="" />
                </Button>
            </form>
            <div>
                <span>
                    <ShieldCheck className="" /> Malicious Link Protection
                </span>
                <span>
                    <Clock className="" /> High-speed
                </span>
            </div>
        </div>
    )
}