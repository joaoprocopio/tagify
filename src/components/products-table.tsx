"use client"

import { Checkbox } from "@/lib/ui/components/checkbox"
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
} from "@/lib/ui/components/table"
import { productsQueries } from "@/state/products/query"
import { useQuery } from "@tanstack/react-query"

export function ProductsTable() {
    const products = useQuery(productsQueries.list())

    return (
        products.isSuccess && (
            <TableContainer className="container">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Checkbox />
                            </TableHead>
                            <TableHead>Thumbnail</TableHead>
                            <TableHead>Produto</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead>Estoque</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody></TableBody>
                </Table>

                <div>
                    {products.isSuccess && (
                        <pre>{JSON.stringify(products.data, null, 4)}</pre>
                    )}
                </div>
            </TableContainer>
        )
    )
}
