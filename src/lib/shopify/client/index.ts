import { createFetcher } from "@/lib/fetcher"
import {
    TShopifyRequest,
    TShopifyResponse,
    TShopifyGeneratedQueries,
} from "@/lib/shopify/client/types"

const shopifyFetcher = createFetcher({
    baseURL: process.env.SHOPIFY_ADMIN_GQL_API_URL,
})

export async function shopifyClient<
    TQuery extends keyof TShopifyGeneratedQueries,
    TGeneratedQuery extends
        TShopifyGeneratedQueries[keyof TShopifyGeneratedQueries] =
        TShopifyGeneratedQueries[TQuery],
>(
    request: TShopifyRequest<TQuery, TGeneratedQuery>,
): Promise<TShopifyResponse<TQuery, TGeneratedQuery>> {
    const json = await shopifyFetcher<
        TShopifyResponse<TQuery, TGeneratedQuery>
    >("", {
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
