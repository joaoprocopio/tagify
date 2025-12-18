import { shopifyClient } from "@/lib/shopify/client"
import {
    ProductSearchParams,
    ProductStatusFilter,
} from "@/state/products/constants"
import { ListProducts, ListProductTags } from "@/state/products/server/graphql"
import {
    TListProducts,
    TListProductsVariables,
    TListProductTags,
} from "@/state/products/types"

export async function listServerProducts(
    variables: TListProductsVariables,
): Promise<TListProducts> {
    // A sintaxe usada pra busca é encontrada aqui.
    // Isso não é um padrão especificado pelo GraphQL e sim um padrão de busca do Shopify em si.
    // https://shopify.dev/docs/api/usage/search-syntax
    let queryString = ""

    for (const [key, value] of variables.searchParams) {
        if (key === ProductSearchParams.search.value) {
            queryString += `title:${value}*`
        }

        if (
            key === ProductSearchParams.status.value &&
            value !== ProductStatusFilter.ALL.value
        ) {
            queryString += `status:${value}`
        }

        if (key === ProductSearchParams.tag.value) {
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
