import { createFetcher } from "@/lib/fetcher"
import { TListProducts, TListProductTags } from "@/state/products/types"
import { isEmpty } from "@/utils/is"
import { SearchParams } from "next/dist/server/request/search-params"

function getApiBaseURL() {
    if (process.env.NODE_ENV === "development") {
        return "/api"
    }

    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
}

const apiFetcher = createFetcher({
    baseURL: getApiBaseURL(),
})

export async function listProducts(searchParams: SearchParams) {
    // TODO: criar uma útil pra rasterizar o objeto [`SearchParams`] de `Record<string, string | string[] | undefined>`
    //       para `Record<string, string>`
    const params = new URLSearchParams(searchParams as Record<string, string>)

    const url = !isEmpty(params)
        ? `/v1/products?${params.toString}`
        : "/v1/products"
    const json = await apiFetcher<TListProducts>(url)

    return json
}

export async function listTags() {
    const json = await apiFetcher<TListProductTags>("/v1/tags")

    return json
}
