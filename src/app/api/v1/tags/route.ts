import { STALE_TIME_IN_SECS } from "@/lib/query/client"
import { shopifyClient } from "@/lib/shopify/client"
import { ListProductTags } from "@/lib/shopify/client/graphql"
import { productsQueryKeys } from "@/state/products/query"
import { TListProductTags } from "@/state/products/types"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const products = (await shopifyClient({
        query: ListProductTags,
        options: {
            cache: request.cache || "force-cache",
            next: {
                tags: productsQueryKeys.tags() as unknown as string[],
                revalidate: STALE_TIME_IN_SECS,
            },
            signal: request.signal,
        },
    })) satisfies TListProductTags

    return Response.json(products)
}
