import {
    defineKey,
    defineKeys,
    defineNamespace,
    defineQueries,
} from "@/lib/cache/utils/define"
import { queryOptions } from "@/lib/cache/utils/options"
import * as server from "@/state/products/server/services"
import * as client from "@/state/products/services"

export const productsNamespace = defineNamespace("products")

export const productsQueryKeys = defineKeys(productsNamespace)({
    list: () => defineKey("products", "list"),
})

export const productsQueries = defineQueries(productsNamespace)({
    serverList: () =>
        queryOptions({
            queryKey: productsQueryKeys.list(),
            queryFn: () => server.listServerProducts(),
        }),
    list: () =>
        queryOptions({
            queryKey: productsQueryKeys.list(),
            queryFn: () => client.listProducts(),
        }),
})
