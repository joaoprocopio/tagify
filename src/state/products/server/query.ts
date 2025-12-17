import { defineQueries } from "@/lib/query/utils/define"
import { queryOptions } from "@/lib/query/utils/options"
import {
    productsQueryKeys,
    type TProductsNamespace,
} from "@/state/products/query"
import * as services from "@/state/products/server/services"
import { SearchParams } from "next/dist/server/request/search-params"

export const productsServerQueries = defineQueries<TProductsNamespace>()({
    list: (searchParams: SearchParams) =>
        queryOptions({
            queryKey: productsQueryKeys.list(searchParams),
            queryFn: () => services.listServerProducts(searchParams),
        }),
    tags: () =>
        queryOptions({
            queryKey: productsQueryKeys.tags(),
            queryFn: () => services.listServerProductTags(),
        }),
})
