import {
    defineKey,
    defineKeys,
    defineNamespace,
    defineQueries,
} from "@/lib/cache/utils/define"
import { queryOptions } from "@/lib/cache/utils/options"
import * as server from "@/state/platform/server/services"
import * as client from "@/state/platform/services"
import { THeaders, TUserAgent } from "@/state/platform/types"

export const platformNamespace = defineNamespace("platform")

export const platformQueryKeys = defineKeys(platformNamespace)({
    userAgent: () => defineKey("platform", "user-agent"),
})

export const platformQueries = defineQueries(platformNamespace)({
    serverUserAgent: (headers: THeaders) =>
        queryOptions({
            queryKey: platformQueryKeys.userAgent(),
            queryFn: () => server.getServerUserAgent(headers),
        }),
    userAgent: () =>
        queryOptions({
            queryKey: platformQueryKeys.userAgent(),
            queryFn: () => client.getUserAgent(),
        }),
    isMac: () =>
        queryOptions({
            ...platformQueries.userAgent(),
            select: isMac,
        }),
})

function isMac(userAgent: TUserAgent): boolean {
    return userAgent.os.name === "mac"
}
