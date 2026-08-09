export function Footer() {
    return (
        <footer className="w-full border-t border-zinc-800/60 py-6 mt-auto text-center text-xs text-zinc-500">
            <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p>© {new Date().getFullYear()} TrimLink. Ultra-Fast & Secure URL Shortener.</p>
                <p className="text-zinc-600">Powered by Next.js, TanStack Query & Redis</p>
            </div>
        </footer>
    );
}
