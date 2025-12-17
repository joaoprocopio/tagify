import type { TGetProductsV1Response } from "@/app/api/v1/products/route"
import type { TListProductTagsV1Response } from "@/app/api/v1/tags/route"
import { createFetcher } from "@/lib/fetcher"
import { isEmpty } from "@/utils/is"
import { SearchParams } from "next/dist/server/request/search-params"

const fetcher = createFetcher({
    baseURL: "http://localhost:3000/api/v1",
})

export async function listProducts(searchParams: SearchParams) {
    const params = new URLSearchParams(
        searchParams as Record<string, string>,
    ).toString()
    const url = !isEmpty(params) ? `/products?${params}` : "/products"
    const json = await fetcher<TGetProductsV1Response>(url)

    return json
}

export async function listTags() {
    const json = await fetcher<TListProductTagsV1Response>("/tags")

    return json
}
