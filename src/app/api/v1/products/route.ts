import { listServerProducts } from "@/state/products/server/services"

export type TGetProductsV1Response = Awaited<
    ReturnType<typeof listServerProducts>
>

export async function GET() {
    const products = await listServerProducts()

    return Response.json(products)
}
