import { shopifyClient } from "@/lib/shopify/client"
import { ListProducts } from "@/lib/shopify/client/graphql"
import {
    ProductSearchParams,
    ProductStatusFilter,
} from "@/state/products/constants"
import { TListProducts } from "@/state/products/types"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    // A sintaxe usada pra busca é encontrada aqui.
    // Isso não é um padrão especificado pelo GraphQL e sim um padrão de busca do Shopify em si.
    // https://shopify.dev/docs/api/usage/search-syntax
    const queryString: string = request.nextUrl.searchParams
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

    const products = (await shopifyClient({
        query: ListProducts,
        variables: { queryString: queryString },
    })) satisfies TListProducts

    return Response.json(products)
}
