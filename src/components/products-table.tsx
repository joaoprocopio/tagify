"use client"

import type { TGetProductsV1Response } from "@/app/api/v1/products/route"
import { Badge } from "@/lib/ui/components/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
} from "@/lib/ui/components/table"
import { productsQueries } from "@/state/products/query"
import { isNil } from "@/utils/is"
import { capitalizeFirst } from "@/utils/str"
import { useQuery } from "@tanstack/react-query"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import * as React from "react"
import { thumbHashToDataURL } from "thumbhash"

export function ProductsTable() {
    const products = useQuery(productsQueries.list())

    return (
        products.isSuccess && (
            <TableContainer>
                <Table>
                    <TableHeader className="bg-background/60 top-header sticky inset-x-0 z-1 backdrop-blur">
                        <TableRow>
                            <TableHead className="pl-container w-10"></TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="pr-container">Tags</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {products.data.data.products.edges.map((product) => (
                            <ProductsTableRow
                                key={product.node.id}
                                product={product.node}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    )
}

function ProductsTableRow({
    product,
}: {
    product: TGetProductsV1Response["data"]["products"]["edges"][number]["node"]
}) {
    const thumb = React.useMemo(
        () => product.media.nodes.at(0)?.preview?.image,
        [product.media.nodes],
    )

    const hashURL = React.useMemo(() => {
        if (isNil(thumb?.thumbhash)) {
            return undefined
        }

        const bytes = atob(thumb.thumbhash)
        const buffer = new Uint8Array(bytes.length).map((_, index) =>
            bytes.charCodeAt(index),
        )

        return thumbHashToDataURL(buffer)
    }, [thumb])

    return (
        <TableRow className="h-16">
            <TableCell className="pl-container">
                <div className="relative size-10 overflow-hidden rounded-lg border">
                    {thumb ? (
                        <Image
                            className="absolute inset-0 size-full"
                            src={thumb.url}
                            alt={thumb.altText || "This image has no alt."}
                            width={thumb.width || 200}
                            height={thumb.height || 200}
                            placeholder="blur"
                            blurDataURL={hashURL}
                        />
                    ) : (
                        <div className="absolute inset-0 flex size-full items-center justify-center">
                            <ImageIcon className="text-muted-foreground size-4.5" />
                        </div>
                    )}
                </div>
            </TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>
                <Badge variant="secondary">
                    {capitalizeFirst(product.status)}
                </Badge>
            </TableCell>

            <TableCell
                className="group"
                data-empty={product.totalInventory === 0}>
                {product.tracksInventory ? (
                    <>
                        <span className="group-data-[empty=true]:text-destructive">
                            <span className="tabular-nums">
                                {product.totalInventory}
                            </span>{" "}
                            in stock
                        </span>
                        {Boolean(
                            !isNil(product.variantsCount?.count) &&
                            product.variantsCount.count > 1,
                        ) && (
                            <span>
                                {" "}
                                for{" "}
                                <span className="tabular-nums">
                                    {product.variantsCount!.count}
                                </span>{" "}
                                variants
                            </span>
                        )}
                    </>
                ) : (
                    <span>Stock not tracked</span>
                )}
            </TableCell>
            <TableCell className="pr-container">
                <div className="flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </TableCell>
        </TableRow>
    )
}
