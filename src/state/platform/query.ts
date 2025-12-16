import { defineKey, defineKeys, defineQueries } from "@/lib/query/utils/define"
import { queryOptions } from "@/lib/query/utils/options"
import * as services from "@/state/platform/services"
import { TUserAgent } from "@/state/platform/types"

export type TPlatformNamespace = "platform"

export const platformQueryKeys = defineKeys<TPlatformNamespace>()({
    userAgent: () => defineKey("platform", "user-agent"),
})

export const platformQueries = defineQueries<TPlatformNamespace>()({
    userAgent: () =>
        queryOptions({
            queryKey: platformQueryKeys.userAgent(),
            queryFn: () => services.getUserAgent(),
        }),
    isMac: () =>
        queryOptions({
            ...platformQueries.userAgent(),
            select: selectIsMac,
        }),
})

function selectIsMac(userAgent: TUserAgent): boolean {
    return userAgent.os.name === "mac"
}
