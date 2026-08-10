"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CircularThemeOverlay } from "@/components/ui/CircularThemeOverlay";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isAnimating: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [isAnimating, setIsAnimating] = useState(false);
    const [targetTheme, setTargetTheme] = useState<Theme | null>(null);

    useEffect(() => {
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        const initialTheme = savedTheme || "dark";
        setTheme(initialTheme);

        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (isAnimating) return;

        const nextTheme: Theme = theme === "dark" ? "light" : "dark";
        setTargetTheme(nextTheme);
        setIsAnimating(true);

        // Halfway through circle animation, apply theme change
        setTimeout(() => {
            setTheme(nextTheme);
            localStorage.setItem("theme", nextTheme);

            if (nextTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }, 350);

        // Reset animation state when transition finishes
        setTimeout(() => {
            setIsAnimating(false);
            setTargetTheme(null);
        }, 750);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating }}>
            {children}
            <CircularThemeOverlay isAnimating={isAnimating} targetTheme={targetTheme} />
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
