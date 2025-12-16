"use client"

import dynamic from "next/dynamic"

export const QueryDevtools = dynamic(async () => {
    const { ReactQueryDevtools } =
        await import("@tanstack/react-query-devtools")

    return { default: ReactQueryDevtools }
})
