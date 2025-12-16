import { defineQueries } from "@/lib/query/utils/define"
import { queryOptions } from "@/lib/query/utils/options"
import {
    platformQueryKeys,
    type TPlatformNamespace,
} from "@/state/platform/query"
import * as services from "@/state/platform/server/services"

export const platformServerQueries = defineQueries<TPlatformNamespace>()({
    userAgent: () =>
        queryOptions({
            queryKey: platformQueryKeys.userAgent(),
            queryFn: () => services.getServerUserAgent(),
        }),
})
