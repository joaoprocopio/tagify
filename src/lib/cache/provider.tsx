"use client"

import { getQueryClient } from "@/lib/cache/client"
import { QueryClientProvider } from "@tanstack/react-query"

export default function CacheProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
