import { ProductsHeader } from "@/components/products-header"
import { ProductsTable } from "@/components/products-table"
import { getQueryClient } from "@/lib/query/client"
import { productsServerQueries } from "@/state/products/server/query"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { SearchParams } from "next/dist/server/request/search-params"

export default async function Products(props: {
    searchParams: Promise<SearchParams>
}) {
    const client = getQueryClient()
    const searchParams = await props.searchParams

    await Promise.all([
        client.prefetchQuery(productsServerQueries.list(searchParams)),
        client.prefetchQuery(productsServerQueries.tags()),
    ])

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <ProductsHeader />
            <ProductsTable />
        </HydrationBoundary>
    )
}
