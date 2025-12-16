import * as services from "@/state/products/server/services"

export type TGetProductsV1Response = Awaited<
    ReturnType<typeof services.listServerProducts>
>

export async function GET() {
    const products = await services.listServerProducts()

    return Response.json(products)
}
