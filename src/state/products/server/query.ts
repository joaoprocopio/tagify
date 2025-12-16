import { defineQueries } from "@/lib/query/utils/define"
import { queryOptions } from "@/lib/query/utils/options"
import {
    productsQueryKeys,
    type TProductsNamespace,
} from "@/state/products/query"
import * as services from "@/state/products/server/services"

export const productsServerQueries = defineQueries<TProductsNamespace>()({
    list: () =>
        queryOptions({
            queryKey: productsQueryKeys.list(),
            queryFn: () => services.listServerProducts(),
        }),
})
