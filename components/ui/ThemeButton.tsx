"use client";

import React from "react";
import { useTheme } from "@/provider/ThemeProvider";

export function ThemeButton() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={(e) => toggleTheme(e)}
            type="button"
            className="relative p-2 text-zinc-400 hover:text-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40 rounded-md transition-colors focus:outline-none cursor-pointer"
            title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
            aria-label="Toggle Theme"
        >
            <svg
                width={18}
                height={18}
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`transition-transform duration-700 ease-out ${isDark ? "rotate-40" : "rotate-90"}`}
            >
                <mask id="moon-mask">
                    <rect x={0} y={0} width={20} height={20} fill="white" />
                    <circle cx={11} cy={3} r={8} fill="black" />
                </mask>
                <circle
                    cx={10}
                    cy={10}
                    r={8}
                    mask="url(#moon-mask)"
                />
                <g className={`transition-all duration-500 origin-center ${isDark ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}>
                    <circle cx={18} cy={10} r="1.5" />
                    <circle cx={14} cy={16.928} r="1.5" />
                    <circle cx={6} cy={16.928} r="1.5" />
                    <circle cx={2} cy={10} r="1.5" />
                    <circle cx={6} cy={3.1718} r="1.5" />
                    <circle cx={14} cy={3.1718} r="1.5" />
                </g>
            </svg>
        </button>
    );
}

export default ThemeButton;
