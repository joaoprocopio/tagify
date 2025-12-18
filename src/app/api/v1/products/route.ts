import * as services from "@/state/products/server/services"
import { TListProducts } from "@/state/products/types"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const products = (await services.listServerProducts({
        searchParams: request.nextUrl.searchParams,
    })) satisfies TListProducts

    return Response.json(products)
}
