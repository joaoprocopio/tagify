import * as services from "@/state/products/server/services"
import { TListProducts } from "@/state/products/types"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams)
    const products = (await services.listServerProducts(
        searchParams,
    )) satisfies TListProducts

    return Response.json(products)
}
