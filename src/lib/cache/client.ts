import { isNil } from "@/utils/is"
import { QueryClient, isServer } from "@tanstack/react-query"

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
    if (isServer) {
        return makeQueryClient()
    }

    if (isNil(browserQueryClient)) {
        browserQueryClient = makeQueryClient()
    }

    return browserQueryClient
}
