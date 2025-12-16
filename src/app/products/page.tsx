import { ProductsHeader } from "@/components/products-header"
import { ProductsTable } from "@/components/products-table"
import { getQueryClient } from "@/lib/query/client"
import { productsServerQueries } from "@/state/products/server/query"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function Products() {
    const client = getQueryClient()
    await client.prefetchQuery(productsServerQueries.list())

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <ProductsHeader />
            <ProductsTable />
        </HydrationBoundary>
    )
}
