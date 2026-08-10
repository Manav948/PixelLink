"use client";

import React from "react";
import { useTheme } from "@/provider/ThemeProvider";

function MoonIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
    );
}

function SunIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
          
            <line x1="12" y1="2"  x2="12" y2="5"  />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="2"  y1="12" x2="5"  y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
            <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"  />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="19.78" y1="4.22"  x2="17.66" y2="6.34"  />
            <line x1="6.34"  y1="17.66" x2="4.22"  y2="19.78" />
        </svg>
    );
}

export function ThemeButton() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={(e) => toggleTheme(e)}
            type="button"
            aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
            title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
            className="relative w-8 h-8 flex items-center justify-center rounded-md text-zinc-500 dark:text-zinc-400 hover:text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors overflow-hidden"
        >
            <span
                className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out"
                style={{
                    opacity:    isDark ? 1 : 0,
                    transform:  isDark ? "translateY(0) scale(1) rotate(0deg)" : "translateY(-10px) scale(0.5) rotate(-30deg)",
                    pointerEvents: "none",
                }}
            >
                <MoonIcon />
            </span>

            <span
                className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out"
                style={{
                    opacity:    isDark ? 0 : 1,
                    transform:  isDark ? "translateY(10px) scale(0.5) rotate(30deg)" : "translateY(0) scale(1) rotate(0deg)",
                    pointerEvents: "none",
                }}
            >
                <SunIcon />
            </span>
        </button>
    );
}

export default ThemeButton;
