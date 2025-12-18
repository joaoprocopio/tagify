import { createFetcher } from "@/lib/fetcher"
import {
    TListProducts,
    TListProductsVariables,
    TListProductTags,
} from "@/state/products/types"
import { isEmpty } from "@/utils/is"

const apiFetcher = createFetcher({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export async function listProducts(variables: TListProductsVariables) {
    const url = !isEmpty(variables.searchParams.size)
        ? `/v1/products?${variables.searchParams.toString()}`
        : "/v1/products"
    const json = await apiFetcher<TListProducts>(url)

    return json
}

export async function listTags() {
    const json = await apiFetcher<TListProductTags>("/v1/tags")

    return json
}
