import { defineKey, defineKeys, defineQueries } from "@/lib/query/utils/define"
import { queryOptions } from "@/lib/query/utils/options"
import * as services from "@/state/products/services"
import type {
    TListProductsVariables,
    TListProductTags,
} from "@/state/products/types"

export type TProductsNamespace = "products"

export const productsQueryKeys = defineKeys<TProductsNamespace>()({
    list: (variables: TListProductsVariables) =>
        defineKey("products", "list", variables.searchParams.toString()),
    tags: () => defineKey("products", "tags"),
})

export const productsQueries = defineQueries<TProductsNamespace>()({
    list: (variables: TListProductsVariables) =>
        queryOptions({
            queryKey: productsQueryKeys.list(variables),
            queryFn: () => services.listProducts(variables),
        }),
    tags: () =>
        queryOptions({
            queryKey: productsQueryKeys.tags(),
            queryFn: () => services.listTags(),
            select: selectTags,
        }),
})

function selectTags(tags: TListProductTags) {
    return tags.data.productTags?.edges.map((tag) => tag.node)
}
