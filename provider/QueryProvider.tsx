"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./ThemeProvider";
import { LenisProvider } from "@/provider/LenisProvider";

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <LenisProvider>
                    {children}
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            duration: 3500,
                            style: {
                                background: "#18181b",
                                color: "#f4f4f5",
                                border: "1px solid #27272a",
                                borderRadius: "12px",
                                fontSize: "14px",
                            },
                        }}
                    />
                </LenisProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}