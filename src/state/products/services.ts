import { createFetcher } from "@/lib/fetcher"
import {
    TListProducts,
    TListProductsVariables,
    TListProductTags,
} from "@/state/products/types"
import { isEmpty } from "@/utils/is"

function getApiBaseURL() {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000/api"
    }

    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
}

const apiFetcher = createFetcher({
    baseURL: getApiBaseURL(),
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
