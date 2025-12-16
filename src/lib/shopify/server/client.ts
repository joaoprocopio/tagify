import { createFetcher } from "@/lib/fetcher"
import { GeneratedQueryTypes } from "@/lib/shopify/types/admin.generated"

const shopifyFetcher = createFetcher({
    baseURL: process.env.SHOPIFY_ADMIN_GQL_API_URL,
})

// TODO: tem mais campos que vem da API, tipo extensions e errors
export type TShopifyResponse<TData> = {
    data: TData
}

export type TShopifyRequest<TQuery, TVariables> = {
    query: TQuery
    variables?: TVariables
    options?: RequestInit
}

export async function shopifyClient<
    TQuery extends keyof GeneratedQueryTypes,
    TData = GeneratedQueryTypes[TQuery]["return"],
    TVariables = GeneratedQueryTypes[TQuery]["variables"],
>(
    request: TShopifyRequest<TQuery, TVariables>,
): Promise<TShopifyResponse<TData>> {
    const json = await shopifyFetcher<TShopifyResponse<TData>>("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
            query: request.query,
            variables: request.variables,
        }),
        ...request.options,
    })

    return json
}
