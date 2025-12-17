import * as services from "@/state/products/server/services"

export type TListProductTagsV1Response = Awaited<
    ReturnType<typeof services.listServerProductTags>
>

export async function GET() {
    const products = await services.listServerProductTags()

    return Response.json(products)
}
