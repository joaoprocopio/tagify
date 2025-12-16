import { constEnum } from "@/lib/enum"
import type { ProductStatus as ShopifyProductStatus } from "@/lib/shopify/types/admin.types"
import {
    Archive,
    Circle,
    CircleDashed,
    CircleOff,
    LucideIcon,
    Tag,
} from "lucide-react"

export type TProductStatusFilter = "ALL" | ShopifyProductStatus

export const ProductStatusFilter = constEnum<
    TProductStatusFilter,
    { label: string; icon: LucideIcon }
>({
    ALL: {
        value: "ALL",
        label: "All",
        icon: Circle,
    },
    ACTIVE: {
        value: "ACTIVE",
        label: "Active",
        icon: Tag,
    },
    DRAFT: {
        value: "DRAFT",
        label: "Draft",
        icon: CircleDashed,
    },
    ARCHIVED: {
        value: "ARCHIVED",
        label: "Archived",
        icon: Archive,
    },
    UNLISTED: {
        value: "UNLISTED",
        label: "Unlisted",
        icon: CircleOff,
    },
})

export type TProductSearchParams = "status"

export const ProductSearchParams = constEnum<
    TProductSearchParams,
    { default: typeof ProductStatusFilter.ALL }
>({
    status: {
        value: "status",
        default: ProductStatusFilter.ALL,
    },
})
