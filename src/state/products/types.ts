import type {
    ListProducts,
    ListProductTags,
} from "@/lib/shopify/client/graphql"
import type { TShopifyResponse } from "@/lib/shopify/client/types"
import type { ReadonlyURLSearchParams } from "next/navigation"

export type TListProductTagsVariables = undefined
export type TListProductTags = TShopifyResponse<typeof ListProductTags>

export type TListProductsVariables = {
    searchParams: ReadonlyURLSearchParams | URLSearchParams
}
export type TListProducts = TShopifyResponse<typeof ListProducts>
