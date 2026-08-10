import { cn } from "@/lib/utils";

interface AnimatedGridProps {
    className?: string;
}

export function AnimatedGrid({ className }: AnimatedGridProps) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "animated-grid absolute inset-0 pointer-events-none select-none",
                className
            )}
        />
    );
}
