import { shopifyClient } from "@/lib/shopify/server/client"
import {
    ProductSearchParams,
    ProductStatusFilter,
} from "@/state/products/constants"
import { ListProducts, ListProductTags } from "@/state/products/server/graphql"
import { hasOwnProperty } from "@/utils/is"
import { SearchParams } from "next/dist/server/request/search-params"

export async function listServerProducts(searchParams: SearchParams) {
    let query = ""

    for (const param in searchParams) {
        if (!hasOwnProperty(searchParams, param)) {
            continue
        }

        const value = searchParams[param]

        if (param === ProductSearchParams.search.value) {
            query += `title:${value}*`
        }

        if (
            param === ProductSearchParams.status.value &&
            value !== ProductStatusFilter.ALL.value
        ) {
            query += `status:${value}`
        }

        if (param === ProductSearchParams.tag.value) {
            query += `tag:${value}`
        }
    }

    const products = await shopifyClient({
        query: ListProducts,
        variables: { query: query },
    })

    return products
}

export async function listServerProductTags() {
    const tags = await shopifyClient({
        query: ListProductTags,
    })

    return tags
}
