import { TShopifyResponse } from "@/lib/shopify/client/types"
import { ListProducts, ListProductTags } from "@/state/products/server/graphql"

export type TListProductTags = TShopifyResponse<typeof ListProductTags>

export type TListProducts = TShopifyResponse<typeof ListProducts>
