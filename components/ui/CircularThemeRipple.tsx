"use client";

import React from "react";

interface CircularThemeRippleProps {
    isAnimating: boolean;
    targetTheme: "dark" | "light" | null;
    clickCoords: { x: number; y: number };
}

export function CircularThemeRipple({ isAnimating, targetTheme, clickCoords }: CircularThemeRippleProps) {
    if (!isAnimating || !targetTheme) return null;

    const bgColor = targetTheme === "dark" ? "#030303" : "#fafafa";

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-99999 animate-clip-ripple"
            style={{
                backgroundColor: bgColor,
                ["--click-x" as any]: `${clickCoords.x}px`,
                ["--click-y" as any]: `${clickCoords.y}px`,
            }}
        />
    );
}
