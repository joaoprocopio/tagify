import { createFetcher } from "@/lib/fetcher"
import {
    TListProducts,
    TListProductsVariables,
    TListProductTags,
} from "@/state/products/types"
import { isEmpty } from "@/utils/is"
import { QueryFunctionContext } from "@tanstack/react-query"

const apiFetcher = createFetcher({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export async function listProducts(
    variables: TListProductsVariables,
    context: QueryFunctionContext,
) {
    const url = !isEmpty(variables.searchParams.size)
        ? `/v1/products?${variables.searchParams.toString()}`
        : "/v1/products"
    const json = await apiFetcher<TListProducts>(url, {
        signal: context.signal,
    })

    return json
}

export async function listTags(context: QueryFunctionContext) {
    const json = await apiFetcher<TListProductTags>("/v1/tags", {
        signal: context.signal,
    })

    return json
}
