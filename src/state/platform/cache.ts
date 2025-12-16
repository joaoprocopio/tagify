import { defineCache, key, queryOptions } from "@/lib/cache/utils"
import * as services from "@/state/platform/services"
import { TUserAgent } from "@/state/platform/types"

export const platformCache = defineCache("platform")({
    keys: {
        queries: {
            userAgent: () => key("platform", "user-agent"),
        },
    },
    queries: {
        userAgent: () =>
            queryOptions({
                queryKey: platformCache.keys.queries.userAgent(),
                queryFn: () => services.getUserAgent(),
            }),
        isMac: () =>
            queryOptions({
                ...platformCache.queries.userAgent(),
                select: isMac,
            }),
    },
})

function isMac(userAgent: TUserAgent): boolean {
    return userAgent.os.name === "mac"
}
