import { ProductsHeader } from "@/components/products-header"
import { ProductsTable } from "@/components/products-table"
import { getQueryClient } from "@/lib/cache/client"
import { productsCache } from "@/state/products/cache"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function Products() {
    const client = getQueryClient()
    await client.prefetchQuery(productsCache.queries.list())

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <ProductsHeader />
            <ProductsTable />
        </HydrationBoundary>
    )
}
