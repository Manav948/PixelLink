"use client";

import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { ResultCard } from "@/components/url/ResultCard";
import { ShortForm } from "@/components/url/ShortenForm"
import { useState } from "react";


export default function Home() {
  const [result, setResult] = useState<{ shortUrl: string; slug: string; longUrl: string } | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 sm:py-24 flex flex-col items-center justify-center text-center">
        <div className="space-y-4 mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase">
            ⚡ High-Performance URL Engine
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Shorten Links. <br />
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Share Instantly.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 font-normal">
            Convert long URLs into clean, memorable short links backed by Redis high-speed caching and real-time analytics.
          </p>
        </div>

        <div className="w-full">
          <ShortForm onSuccess={(data) => setResult(data)} />
          {result && <ResultCard result={result} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
