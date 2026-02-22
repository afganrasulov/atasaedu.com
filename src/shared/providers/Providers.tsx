"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { WhatsAppProvider } from "@/features/whatsapp/WhatsAppContext";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5, // 5 minutes cache
                        gcTime: 1000 * 60 * 60 * 24, // 24 hours garbage collection for aggressive caching
                    }
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <WhatsAppProvider>
                    {children}
                </WhatsAppProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
