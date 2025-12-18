import { shopifyClient } from "@/lib/shopify/client"
import {
    ProductSearchParams,
    ProductStatusFilter,
} from "@/state/products/constants"
import { ListProducts, ListProductTags } from "@/state/products/server/graphql"
import { TListProducts, TListProductTags } from "@/state/products/types"
import { hasOwnProperty } from "@/utils/is"
import { SearchParams } from "next/dist/server/request/search-params"

export async function listServerProducts(
    searchParams: SearchParams,
): Promise<TListProducts> {
    // A sintaxe usada pra busca é encontrada aqui.
    // Isso não é um padrão especificado pelo GraphQL e sim um padrão de busca do Shopify em si.
    // https://shopify.dev/docs/api/usage/search-syntax
    let queryString = ""

    for (const param in searchParams) {
        if (!hasOwnProperty(searchParams, param)) {
            continue
        }

        const value = searchParams[param]

        if (param === ProductSearchParams.search.value) {
            queryString += `title:${value}*`
        }

        if (
            param === ProductSearchParams.status.value &&
            value !== ProductStatusFilter.ALL.value
        ) {
            queryString += `status:${value}`
        }

        if (param === ProductSearchParams.tag.value) {
            queryString += `tag:${value}`
        }
    }

    const products = await shopifyClient({
        query: ListProducts,
        variables: { queryString: queryString },
    })

    return products
}

export async function listServerProductTags(): Promise<TListProductTags> {
    const tags = await shopifyClient({
        query: ListProductTags,
    })

    return tags
}
