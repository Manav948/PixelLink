"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Copy, Check, ExternalLink, Sparkles } from "lucide-react";

interface ResultCardProps {
    result: {
        shortUrl: string;
        slug: string;
        longUrl: string;
    };
}

export function ResultCard({ result }: ResultCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(result.shortUrl);
        setCopied(true);
        toast.success("Short URL copied to clipboard!");
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-6 bg-card border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-2xl relative transition-colors duration-300 animate-in fade-in slide-in-from-bottom-3">
           
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-emerald-500" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-emerald-500" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-emerald-500" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-emerald-500" />

            <div className="flex items-center justify-between font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-3">
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> // SHORT_URL_GENERATED
                </span>
                <span className="text-zinc-500 font-mono">STATUS: 200_OK</span>
            </div>

           
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-zinc-100 dark:bg-black/90 border border-zinc-300 dark:border-zinc-800 rounded-lg p-2.5 pl-4">
                <span className="text-xs font-mono font-medium text-foreground truncate flex-1 select-all">
                    {result.shortUrl}
                </span>

                <div className="flex items-center gap-2">
                    <Button onClick={handleCopy} size="sm" variant="default" className="gap-1.5 text-xs bg-foreground text-background hover:opacity-90">
                        {copied ? (
                            <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                            </>
                        ) : (
                            <>
                                <Copy className="w-3.5 h-3.5" /> Copy Link
                            </>
                        )}
                    </Button>
                    
                    <a
                        href={result.shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-foreground hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                        title="Open Link"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>

           
            <div className="mt-3 text-left font-mono text-[11px] text-zinc-500 truncate">
                <span className="text-zinc-500 dark:text-zinc-600 font-semibold">TARGET: </span>
                <span className="text-zinc-700 dark:text-zinc-300 italic">{result.longUrl}</span>
            </div>
        </div>
    );
}
