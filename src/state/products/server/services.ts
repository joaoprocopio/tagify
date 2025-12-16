import { shopifyClient } from "@/lib/shopify/server/client"
import { ListProducts } from "@/state/products/server/graphql"

export async function listServerProducts() {
    const products = await shopifyClient({
        query: ListProducts,
        options: { cache: "force-cache" },
    })

    return products
}
