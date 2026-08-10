"use client";

import { Zap, ShieldCheck, Globe, Clock, Database } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    );
}

const STATS = [
    { icon: Zap,        label: "Avg Redirect",    value: "<5ms",  color: "text-yellow-500" },
    { icon: ShieldCheck, label: "Safety Scanned", value: "100%",  color: "text-emerald-500" },
    { icon: Globe,      label: "Links Shortened",  value: "∞",    color: "text-indigo-500" },
    { icon: Database,   label: "Cache Layer",      value: "Redis", color: "text-rose-500" },
];

const LINKS = [
    { href: "https://github.com/Manav948/url-shortener", icon: <GithubIcon />, label: "Source Code" },
];

export function Footer() {
    return (
        <footer className="w-full border-t border-zinc-200 dark:border-zinc-800/80 bg-background transition-colors duration-300 font-mono">

            <div className="max-w-4xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-zinc-100 dark:border-zinc-800/60">
                {STATS.map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="flex flex-col items-center gap-1 text-center">
                        <div className="flex items-center gap-1.5">
                            <Icon className={`w-3.5 h-3.5 ${color}`} />
                            <span className="text-[10px] text-zinc-400 uppercase tracking-wider">{label}</span>
                        </div>
                        <span className="text-lg font-extrabold text-foreground">{value}</span>
                    </div>
                ))}
            </div>

          
            <div className="max-w-4xl mx-auto px-6 py-5 flex flex-col items-center gap-4 text-center">
                
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-foreground text-background flex items-center justify-center rounded-sm font-black text-[10px]">
                        P
                    </div>
                    <span className="text-sm font-extrabold uppercase tracking-tight text-foreground">
                        Pixel<span className="text-zinc-400">Link</span>
                    </span>
                    <span className="text-[10px] text-zinc-400">v2.4.0</span>
                </div>

           
                <div className="flex items-center gap-6 text-[11px] text-zinc-500">
                    {LINKS.map(({ href, icon, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                        >
                            {icon} {label}
                        </a>
                    ))}
                </div>

              
                <div className="flex items-center gap-4 text-[11px] text-zinc-400 flex-wrap justify-center">
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        SYSTEM_ONLINE
                    </span>
                    <span>Made with ❤️ by Manav</span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date().getFullYear()} — All rights reserved
                    </span>
                </div>
            </div>

           
            <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent opacity-60" />
        </footer>
    );
}
