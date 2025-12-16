import type { TGetProductsV1Response } from "@/app/api/v1/products/route"
import { createFetcher } from "@/lib/fetcher"

const fetcher = createFetcher({
    baseURL: "http://localhost:3000/api/v1",
})

export async function listProducts() {
    const json = await fetcher<TGetProductsV1Response>("/products")

    return json
}
