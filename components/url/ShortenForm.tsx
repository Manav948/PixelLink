"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { urlValidator, UrlValidator } from "@/validators/url.validator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link2, Sparkles, ArrowRight, ShieldCheck, Clock, SlidersHorizontal, Plus } from "lucide-react";

interface ShortenFormProps {
    onSuccess: (data: { shortUrl: string; slug: string; longUrl: string }) => void;
}

export function ShortForm({ onSuccess }: ShortenFormProps) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UrlValidator>({
        resolver: zodResolver(urlValidator),
        defaultValues: {
            url: "",
            customSlug: "",
        },
    });

    const createShortLinkMutation = useMutation({
        mutationFn: async (formData: UrlValidator) => {
            try {
                const res = await axios.post("/api/url", {
                    url: formData.url,
                    customSlug: formData.customSlug || undefined,
                });
                return res.data.data;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw new Error(error.response?.data?.message || "Failed to shorten URL.");
                }
                throw new Error("Something went wrong. Please try again.");
            }
        },
        onSuccess: (data) => {
            toast.success("Short URL generated successfully!");
            onSuccess({
                shortUrl: data.shortUrl || `${window.location.origin}/${data.slug}`,
                slug: data.slug,
                longUrl: data.longUrl,
            });
            reset();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to shorten URL.");
        },
    });

    const onSubmit = (data: UrlValidator) => {
        createShortLinkMutation.mutate(data);
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-card border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-7 shadow-2xl relative transition-colors duration-300">
            {/* Corner Bracket Markers */}
            <Plus className="absolute -top-2 -left-2 w-4 h-4 text-zinc-400 dark:text-zinc-600 z-10 pointer-events-none" />
            <Plus className="absolute -top-2 -right-2 w-4 h-4 text-zinc-400 dark:text-zinc-600 z-10 pointer-events-none" />
            <Plus className="absolute -bottom-2 -left-2 w-4 h-4 text-zinc-400 dark:text-zinc-600 z-10 pointer-events-none" />
            <Plus className="absolute -bottom-2 -right-2 w-4 h-4 text-zinc-400 dark:text-zinc-600 z-10 pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
                <div className="space-y-1.5 text-left">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        <span>// DESTINATION_URL</span>
                        <span className="text-zinc-400 dark:text-zinc-600 font-semibold">REQUIRED</span>
                    </div>
                    <Input
                        type="text"
                        placeholder="Paste long URL (e.g. https://example.com/very-long-path)..."
                        icon={<Link2 className="w-4 h-4 text-zinc-400" />}
                        {...register("url")}
                    />
                    {errors.url && (
                        <p className="text-xs font-mono text-rose-500 dark:text-rose-400 pl-1">{errors.url.message}</p>
                    )}
                </div>

                
                <div
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full bg-zinc-100 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-lg p-3 flex items-center justify-between cursor-pointer transition-all group select-none"
                >
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-700 dark:text-zinc-300">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 group-hover:text-foreground transition-colors" />
                        <span>Custom Slug Settings</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold border border-zinc-300 dark:border-zinc-700/60">
                        {showAdvanced ? "[-] HIDE ALIAS" : "[+] ADD ALIAS"}
                    </span>
                </div>

            
                {showAdvanced && (
                    <div className="pt-1 space-y-1.5 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                            <span>// CUSTOM_ALIAS</span>
                            <span className="text-zinc-400 dark:text-zinc-600">OPTIONAL</span>
                        </div>
                        <Input
                            type="text"
                            placeholder="e.g. my-custom-brand"
                            icon={<Sparkles className="w-4 h-4 text-zinc-400" />}
                            {...register("customSlug")}
                        />
                        {errors.customSlug && (
                            <p className="text-xs font-mono text-rose-500 dark:text-rose-400 pl-1">
                                {errors.customSlug.message}
                            </p>
                        )}
                    </div>
                )}

        
                <div className="pt-2">
                    <Button
                        type="submit"
                        isLoading={createShortLinkMutation.isPending}
                        className="w-full h-11 text-xs uppercase tracking-wider font-mono font-extrabold bg-foreground text-background hover:opacity-90 transition-all rounded-md shadow-md"
                    >
                        Shorten URL <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                </div>
            </form>

           
            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800/70 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-500">
                <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Anti-Phishing Scan
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Redis Cache (&lt;5ms)
                </span>
            </div>
        </div>
    );
}