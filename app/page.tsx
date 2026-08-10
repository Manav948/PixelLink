"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { ShortForm } from "@/components/url/ShortenForm";
import { ResultCard } from "@/components/url/ResultCard";
import { Footer } from "@/components/footer/Footer";
import { Terminal } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    );
}

export default function Home() {
    const [result, setResult] = useState<{ shortUrl: string; slug: string; longUrl: string } | null>(null);
    const [mouseCoords, setMouseCoords] = useState({ x: 1436, y: 330 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseCoords({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans relative overflow-x-hidden transition-colors duration-300 selection:bg-foreground selection:text-background">
         
            <div className="absolute inset-0 bg-pixel-grid opacity-60 pointer-events-none z-0" />

       
            <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 font-mono font-black text-[320px] text-zinc-500/10 pointer-events-none select-none z-0">
                P
            </div>

            <div className="hidden sm:block absolute top-16 left-6 font-mono text-[11px] text-zinc-500 z-10 pointer-events-none select-none">
                x:{mouseCoords.x}, y:{mouseCoords.y} <br />
                fps: 60 | ms: 16.6
            </div>

            <div className="hidden sm:block absolute top-16 right-6 font-mono text-[11px] text-zinc-500 text-right z-10 pointer-events-none select-none">
                v:2.4.0 a:↓
            </div>

            <div className="hidden sm:block absolute bottom-14 left-6 font-mono text-[11px] text-zinc-500 z-10 pointer-events-none select-none">
                0:74.9°
            </div>

            <div className="hidden sm:block absolute bottom-14 right-6 font-mono text-[11px] text-zinc-500 text-right z-10 pointer-events-none select-none">
                cell:9,2
            </div>

           
            <Navbar />

          
            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center justify-center text-center relative z-10">
           
                <div className="space-y-4 mb-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/10 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-foreground font-mono text-xs mb-2">
                        <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                        <span>PIXEL-PERFECT URL ENGINE</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-foreground tracking-tighter leading-[1.05] font-sans">
                        Shorten Long <br />
                        Links in seconds
                    </h1>

                    <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-normal max-w-lg mx-auto leading-relaxed pt-2">
                        A pixel-perfect, ultra-fast URL shortener built for modern web apps. Powered by Redis caching & real-time analytics.
                    </p>

                   
                    <div className="flex items-center justify-center gap-3 pt-3">
                        <button
                            onClick={() => {
                                const inputEl = document.querySelector("input") as HTMLInputElement;
                                if (inputEl) inputEl.focus();
                            }}
                            className="bg-foreground hover:opacity-90 text-background font-bold font-mono text-xs px-5 py-2.5 rounded-md transition-all shadow-sm"
                        >
                            Shorten URL Now
                        </button>
                        <a
                            href="https://github.com/Manav948/url-shortener"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-zinc-100 dark:bg-[#0c0c0e] border border-zinc-300 dark:border-zinc-800 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800 font-mono text-xs px-4 py-2.5 rounded-md flex items-center gap-2 transition-all"
                        >
                            <span>Star On Github</span>
                            <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>

               
                <div className="w-full mt-2">
                    <ShortForm onSuccess={(data) => setResult(data)} />
                    {result && <ResultCard result={result} />}
                </div>
            </main>

            <Footer />
        </div>
    );
}
