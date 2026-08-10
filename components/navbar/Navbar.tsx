"use client";

import { GitFork, BookOpen, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { ThemeButton } from "../ui/ThemeButton";

export function Navbar() {
    return (
        <header className="w-full bg-background/80 border-b border-border backdrop-blur-md z-30 transition-colors">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between font-mono text-xs">
               
                <Link href="/" className="flex items-center gap-2 text-foreground font-bold text-base tracking-tight hover:opacity-90 transition-opacity">
                    <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center rounded-sm font-black text-xs shadow-sm">
                        P
                    </div>
                    <span className="font-mono tracking-tighter text-lg font-extrabold uppercase">
                        Pixel<span className="text-zinc-500">Link</span>
                    </span>
                </Link>

             
                <div className="flex items-center gap-2">
                    
                    <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-md bg-zinc-100/60 dark:bg-zinc-900/60 p-0.5">
                        <button 
                            className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors"
                            title="Toggle Grid Overlay"
                        >
                            <LayoutGrid className="w-3.5 h-3.5" />
                        </button>
                        <button 
                            className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors"
                            title="API Documentation"
                        >
                            <BookOpen className="w-3.5 h-3.5" />
                        </button>
                        <ThemeButton />
                    </div>
                </div>
            </div>
        </header>
    );
}
