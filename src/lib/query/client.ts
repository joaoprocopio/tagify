import { isNil } from "@/utils/is"
import { QueryClient, isServer } from "@tanstack/react-query"
import * as React from "react"

let browserQueryClient: QueryClient | undefined

const makeQueryClient = React.cache(() => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
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
