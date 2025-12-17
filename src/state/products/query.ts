import { defineKey, defineKeys, defineQueries } from "@/lib/query/utils/define"
import { queryOptions } from "@/lib/query/utils/options"
import type { TShopifyResponse } from "@/lib/shopify/server/client"
import type { ListProductTagsQuery } from "@/lib/shopify/types/admin.generated"
import * as services from "@/state/products/services"
import { SearchParams } from "next/dist/server/request/search-params"

export type TProductsNamespace = "products"

export const productsQueryKeys = defineKeys<TProductsNamespace>()({
    list: (searchParams: SearchParams) =>
        defineKey("products", "list", searchParams),
    tags: () => defineKey("products", "tags"),
})

export const productsQueries = defineQueries<TProductsNamespace>()({
    list: (searchParams: SearchParams) =>
        queryOptions({
            queryKey: productsQueryKeys.list(searchParams),
            queryFn: () => services.listProducts(searchParams),
        }),
    tags: () =>
        queryOptions({
            queryKey: productsQueryKeys.tags(),
            queryFn: () => services.listTags(),
            select: selectTags,
        }),
})

function selectTags(tags: TShopifyResponse<ListProductTagsQuery>) {
    return tags.data.productTags?.edges.map((tag) => tag.node)
}
