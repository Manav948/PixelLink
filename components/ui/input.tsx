import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon, ...props }, ref) => {
        return (
            <div className="relative flex items-center w-full">
                {icon && <div className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none">{icon}</div>}
                <input
                    type={type}
                    className={cn(
                        "w-full bg-zinc-100/90 dark:bg-[#0a0a0c] border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 rounded-md px-3.5 py-2.5 text-xs font-mono transition-colors duration-200 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/50",
                        icon ? "pl-10" : "pl-3.5",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = "Input";
