import { createFetcher } from "@/lib/fetcher"
import { TListProducts, TListProductTags } from "@/state/products/types"
import { isEmpty } from "@/utils/is"
import { SearchParams } from "next/dist/server/request/search-params"

console.log(process.env)
console.log(process.env.VERCEL_URL)
console.log(process.env.NEXT_PUBLIC_VERCEL_URL)

const fetcher = createFetcher({
    baseURL: `${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL}/api/v1`,
})

export async function listProducts(searchParams: SearchParams) {
    const params = new URLSearchParams(
        searchParams as Record<string, string>,
    ).toString()
    const url = !isEmpty(params) ? `/products?${params}` : "/products"
    const json = await fetcher<TListProducts>(url)

    return json
}

export async function listTags() {
    const json = await fetcher<TListProductTags>("/tags")

    return json
}
