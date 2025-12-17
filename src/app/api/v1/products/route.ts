import * as services from "@/state/products/server/services"
import { NextRequest } from "next/server"

export type TGetProductsV1Response = Awaited<
    ReturnType<typeof services.listServerProducts>
>

export async function GET(request: NextRequest) {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams)
    const products = await services.listServerProducts(searchParams)

    return Response.json(products)
}
