import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center font-mono text-xs font-semibold transition-all duration-150 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

        const variants = {
            default: "bg-white hover:bg-zinc-200 text-black border border-white shadow-sm font-sans font-bold",
            outline: "bg-[#0c0c0e] border border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700 font-mono",
            secondary: "bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-100 font-mono",
            ghost: "hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 font-mono",
            destructive: "bg-rose-600 hover:bg-rose-500 text-white font-mono",
        };

        const sizes = {
            default: "h-10 px-5 py-2",
            sm: "h-8 px-3 text-xs rounded-sm",
            lg: "h-12 px-6 text-sm rounded-md",
            icon: "h-9 w-9 p-0",
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
                        <svg className="animate-spin h-3.5 w-3.5 text-current" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing...
                    </span>
                ) : (
                    children
                )}
            </button>
        );
    }
);
Button.displayName = "Button";
