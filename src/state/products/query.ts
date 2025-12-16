import { defineKey, defineKeys, defineQueries } from "@/lib/query/utils/define"
import { queryOptions } from "@/lib/query/utils/options"
import * as services from "@/state/products/services"

export type TProductsNamespace = "products"

export const productsQueryKeys = defineKeys<TProductsNamespace>()({
    list: () => defineKey("products", "list"),
})

export const productsQueries = defineQueries<TProductsNamespace>()({
    list: () =>
        queryOptions({
            queryKey: productsQueryKeys.list(),
            queryFn: () => services.listProducts(),
        }),
})
