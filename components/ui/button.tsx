import * as React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

        const variants = {
            default: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 focus:ring-indigo-500",
            outline: "border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-200 focus:ring-zinc-700",
            secondary: "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 focus:ring-zinc-600",
            ghost: "hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-100",
            destructive: "bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500",
        };

        const sizes = {
            default: "h-11 px-5 py-2 text-sm",
            sm: "h-9 px-3.5 text-xs rounded-lg",
            lg: "h-13 px-7 text-base rounded-2xl",
            icon: "h-11 w-11 p-0",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Loading...
                    </span>
                ) : (
                    children
                )}
            </button>
        );
    }
);
Button.displayName = "Button";
