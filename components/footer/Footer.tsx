export function Footer() {
    return (
        <footer className="w-full border-t border-zinc-200 dark:border-zinc-900 bg-background py-6 font-mono text-xs text-zinc-500 dark:text-zinc-500 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>© {new Date().getFullYear()} PixelLink Engine v2.4.0</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-600">Built with Next.js 16, Redis & PostgreSQL</p>
            </div>
        </footer>
    );
}
