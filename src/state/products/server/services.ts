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
    const queryString: string = variables.searchParams
        .entries()
        .reduce((accumulator, [key, value]) => {
            switch (key) {
                case ProductSearchParams.search.value:
                    accumulator += `title:${value}*`
                    break
                case ProductSearchParams.status.value:
                    if (value === ProductStatusFilter.ALL.value) break
                    accumulator += `status:${value}`
                    break
                case ProductSearchParams.tag.value:
                    accumulator += `tag:${value}`
                    break
            }

            return accumulator
        }, "")

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
