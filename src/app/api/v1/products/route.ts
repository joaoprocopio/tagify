import { resolveCachePolicy } from "@/lib/next/cache-policy"
import { STALE_TIME_IN_SECS } from "@/lib/query/client"
import { shopifyClient } from "@/lib/shopify/client"
import { ListProducts } from "@/lib/shopify/client/graphql"
import {
    ProductSearchParams,
    ProductStatusFilter,
} from "@/state/products/constants"
import { productsQueryKeys } from "@/state/products/query"
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
                    accumulator.push(`title:${value}*`)
                    break
                case ProductSearchParams.status.value:
                    if (value === ProductStatusFilter.ALL.value) break
                    accumulator.push(`status:${value}`)
                    break
                case ProductSearchParams.tag.value:
                    accumulator.push(`tag:${value}`)
                    break
            }

            return accumulator
        }, [] as string[])
        .join(" ")

    const products = (await shopifyClient({
        query: ListProducts,
        variables: { queryString: queryString },
        options: {
            cache: resolveCachePolicy(request.cache, "force-cache"),
            next: {
                tags: productsQueryKeys.list({
                    searchParams: request.nextUrl.searchParams,
                }) as unknown as string[],
                revalidate: STALE_TIME_IN_SECS,
            },
            signal: request.signal,
        },
    })) satisfies TListProducts

    return Response.json(products)
}
