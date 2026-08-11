"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeClass(t: Theme) {
    if (t === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const isTransitioning = React.useRef(false);

    // Apply stored theme once on mount
    useEffect(() => {
        const saved = (localStorage.getItem("theme") as Theme) || "dark";
        setTheme(saved);
        applyThemeClass(saved);
    }, []);

    const toggleTheme = (e?: React.MouseEvent) => {
        // Prevent overlapping transitions (common on mobile double-tap)
        if (isTransitioning.current) return;

        const nextTheme: Theme = theme === "dark" ? "light" : "dark";

        // Store exact click position as CSS custom properties on :root so the
        // @keyframes vt-circle-expand can use them as the clip-path origin.
        const x = e ? e.clientX : window.innerWidth / 2;
        const y = e ? e.clientY : window.innerHeight / 2;
        document.documentElement.style.setProperty("--vt-x", `${x}px`);
        document.documentElement.style.setProperty("--vt-y", `${y}px`);

        // View Transitions API: the browser takes a screenshot of the current
        // page, then we mutate the DOM, and the API cross-fades using our CSS.
        // This happens entirely at compositor level: zero React blank frames.
        if (typeof document !== "undefined" && "startViewTransition" in document) {
            isTransitioning.current = true;
            // Safety unlock — slightly longer than the 1.1s CSS animation
            const unlockTimer = setTimeout(() => { isTransitioning.current = false; }, 1200);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const transition = (document as any).startViewTransition(() => {
                setTheme(nextTheme);
                applyThemeClass(nextTheme);
                localStorage.setItem("theme", nextTheme);
            });

            // Unlock as soon as the transition actually finishes
            transition.finished.finally(() => {
                clearTimeout(unlockTimer);
                isTransitioning.current = false;
            });
        } else {
            // Graceful fallback for browsers without View Transitions support
            setTheme(nextTheme);
            applyThemeClass(nextTheme);
            localStorage.setItem("theme", nextTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
