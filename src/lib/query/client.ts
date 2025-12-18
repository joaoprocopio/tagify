import { isNil } from "@/utils/is"
import { QueryClient, isServer } from "@tanstack/react-query"
import * as React from "react"

let browserQueryClient: QueryClient | undefined

const makeQueryClient = React.cache(() => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30 * 1000, // 30s
            },
        },
    })
})

export function getQueryClient() {
    if (isServer) {
        return makeQueryClient()
    }

    if (isNil(browserQueryClient)) {
        browserQueryClient = makeQueryClient()
    }

    return browserQueryClient
}
