"use client";

import React from "react";

interface CircularThemeOverlayProps {
    isAnimating: boolean;
    targetTheme: "dark" | "light" | null;
}

export function CircularThemeOverlay({ isAnimating, targetTheme }: CircularThemeOverlayProps) {
    if (!isAnimating || !targetTheme) return null;

    const colorClass = targetTheme === "dark" ? "bg-[#030303]" : "bg-[#fafafa]";

    return (
        <div
            aria-hidden="true"
            className={`fixed top-1/2 left-1/2 w-[120vw] h-[120vw] rounded-full pointer-events-none z-99999 animate-smooth-circle ${colorClass}`}
        />
    );
}
