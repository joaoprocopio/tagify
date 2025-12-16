import { ProductsHeader } from "@/components/products-header"
import { ProductsTable } from "@/components/products-table"
import { getQueryClient } from "@/lib/cache/client"
import { productsQueries } from "@/state/products/cache"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function Products() {
    const client = getQueryClient()
    await client.prefetchQuery(productsQueries.serverList())

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <ProductsHeader />
            <ProductsTable />
        </HydrationBoundary>
    )
}
