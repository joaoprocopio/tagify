"use client"

import dynamic from "next/dynamic"

export const CacheDevtools = dynamic(async () => {
    const { ReactQueryDevtools } =
        await import("@tanstack/react-query-devtools")

    return { default: ReactQueryDevtools }
})
