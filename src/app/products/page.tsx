import { ProductsHeader } from "@/components/products-header"
import { ProductsTable } from "@/components/products-table"

export default async function Products() {
    return (
        <>
            <ProductsHeader />
            <ProductsTable />
        </>
    )
}
