"use client"

import { productsCache } from "@/state/products/cache"
import { useQuery } from "@tanstack/react-query"

export function ProductsTable() {
    const products = useQuery(productsCache.queries.list())

    return (
        <div className="container">
            {products.isSuccess && (
                <pre>{JSON.stringify(products.data, null, 4)}</pre>
            )}
        </div>
    )
}
