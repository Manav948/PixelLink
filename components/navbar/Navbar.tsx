import { Link2 } from "lucide-react";

export function Navbar() {
    return (
        <header className="w-full border-b border-zinc-800/60 bg-zinc-950/40 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-md shadow-indigo-500/10">
                        <Link2 className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold bg-linear-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                        TrimLink
                    </span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    System Active
                </div>
            </div>
        </header>
    );
}
