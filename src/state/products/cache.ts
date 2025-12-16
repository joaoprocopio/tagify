import { defineCache, key, queryOptions } from "@/lib/cache/utils"
import { listProducts } from "@/state/products/services"

export const productsCache = defineCache("products")({
    keys: {
        queries: {
            list: () => key("products", "list"),
        },
    },
    queries: {
        list: () =>
            queryOptions({
                queryKey: productsCache.keys.queries.list(),
                queryFn: () => listProducts(),
            }),
    },
})
