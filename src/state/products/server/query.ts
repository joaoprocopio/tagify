import { defineQueries } from "@/lib/query/utils/define"
import { queryOptions } from "@/lib/query/utils/options"
import {
    productsQueryKeys,
    type TProductsNamespace,
} from "@/state/products/query"
import * as services from "@/state/products/server/services"
import { TListProductsVariables } from "@/state/products/types"

export const productsServerQueries = defineQueries<TProductsNamespace>()({
    list: (variables: TListProductsVariables) =>
        queryOptions({
            queryKey: productsQueryKeys.list(variables),
            queryFn: () => services.listServerProducts(variables),
        }),
    tags: () =>
        queryOptions({
            queryKey: productsQueryKeys.tags(),
            queryFn: () => services.listServerProductTags(),
        }),
})
