import { defineKey, defineKeys, defineQueries } from "@/lib/query/utils/define"
import { queryOptions } from "@/lib/query/utils/options"
import * as services from "@/state/products/services"
import type {
    TListProducts,
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
            queryFn: (context) => services.listProducts(variables, context),
        }),
    count: (variables: TListProductsVariables) =>
        queryOptions({
            ...productsQueries.list(variables),
            select: extractLength,
        }),
    tags: () =>
        queryOptions({
            queryKey: productsQueryKeys.tags(),
            queryFn: (context) => services.listTags(context),
            select: selectTags,
        }),
})

function extractLength(products: TListProducts) {
    return products.data.products.edges.length
}

function selectTags(tags: TListProductTags) {
    return tags.data.productTags?.edges.map((tag) => tag.node)
}
