import * as services from "@/state/products/server/services"
import { TListProductTags } from "@/state/products/types"

export async function GET() {
    const products =
        (await services.listServerProductTags()) satisfies TListProductTags

    return Response.json(products)
}
