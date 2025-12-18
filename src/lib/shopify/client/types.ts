/* eslint-disable @typescript-eslint/no-explicit-any */
import { GeneratedQueryTypes } from "@/lib/shopify/types/admin.generated"

export type TShopifyGeneratedQueries = GeneratedQueryTypes

export type TShopifyResponse<
    TQuery extends keyof TShopifyGeneratedQueries,
    TGeneratedQuery extends
        TShopifyGeneratedQueries[keyof TShopifyGeneratedQueries] =
        TShopifyGeneratedQueries[TQuery],
> = {
    data: TGeneratedQuery["return"]
    extensions?: Record<string, any>
    headers?: Headers
}

export type TShopifyRequest<
    TQuery extends keyof TShopifyGeneratedQueries,
    TGeneratedQuery extends
        TShopifyGeneratedQueries[keyof TShopifyGeneratedQueries] =
        TShopifyGeneratedQueries[TQuery],
> = {
    query: TQuery
    variables?: TGeneratedQuery["variables"]
    options?: RequestInit
}
