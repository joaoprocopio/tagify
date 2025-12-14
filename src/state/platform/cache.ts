import { defineCache, key, queryOptions } from "@/lib/cache/utils"
import { PlatformServices, UserAgent } from "@/state/platform/services"

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
                queryFn: PlatformServices.getUserAgent,
            }),
        isMac: () =>
            queryOptions({
                ...platformCache.queries.userAgent(),
                select: isMac,
            }),
    },
})

function isMac(userAgent: UserAgent) {
    return userAgent.os.name === "mac"
}
