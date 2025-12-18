import { shopifyClient } from "@/lib/shopify/client"
import { ListProductTags } from "@/lib/shopify/client/graphql"
import { TListProductTags } from "@/state/products/types"

export async function GET() {
    const products = (await shopifyClient({
        query: ListProductTags,
    })) satisfies TListProductTags

    return Response.json(products)
}
