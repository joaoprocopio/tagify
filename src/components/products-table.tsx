"use client"

import { Badge } from "@/lib/ui/components/badge"
import { Skeleton } from "@/lib/ui/components/skeleton"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
} from "@/lib/ui/components/table"
import { productsQueries } from "@/state/products/query"
import { TListProducts } from "@/state/products/types"
import { array } from "@/utils/arr"
import { isEmpty, isNil } from "@/utils/is"
import { capitalizeFirst } from "@/utils/str"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import * as React from "react"
import { thumbHashToDataURL } from "thumbhash"

const headings = [undefined, "Product", "Status", "Stock", "Tags"] as (
    | string
    | undefined
)[]

export function ProductsTable() {
    const searchParams = useSearchParams()
    const products = useQuery(productsQueries.list({ searchParams }))

    return (
        <TableContainer>
            <Table className="[&_tr>:first-child]:pl-container [&_tr>:last-child]:pr-container [&_tr>:first-child]:w-10">
                {Boolean(
                    products.isSuccess &&
                    isEmpty(products.data.data.products.edges),
                ) && <TableCaption>No products were found.</TableCaption>}

                <TableHeader className="top-header bg-background/60 sticky inset-x-0 z-1 backdrop-blur">
                    <TableRow>
                        {headings.map((heading, index) => (
                            <TableHead key={index}>{heading}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <React.Suspense fallback={<ProductsTableBodySkeleton />}>
                    <ProductsTableBody />
                </React.Suspense>
            </Table>
        </TableContainer>
    )
}

function ProductsTableBodySkeleton() {
    return (
        <TableBody>
            {array(20).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {headings.map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                            {/* TODO: construir um skeleton mais bonitinho */}
                            <Skeleton
                                className={clsx({
                                    "size-10": cellIndex === 0,
                                    "h-6 w-full": cellIndex !== 0,
                                })}
                            />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    )
}

function ProductsTableBody() {
    const searchParams = useSearchParams()
    const products = useSuspenseQuery(productsQueries.list({ searchParams }))

    return (
        <TableBody>
            {products.data?.data.products.edges.map((product) => (
                <ProductsTableRow
                    key={product.node.id}
                    product={product.node}
                />
            ))}
        </TableBody>
    )
}

function ProductsTableRow({
    product,
}: {
    product: TListProducts["data"]["products"]["edges"][number]["node"]
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
        <TableRow>
            <TableCell>
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
                <Badge
                    variant="secondary"
                    className="data-[status=ACTIVE]:bg-success data-[status=ACTIVE]:text-success-foreground data-[status=DRAFT]:bg-info data-[status=DRAFT]:text-info-foreground"
                    data-status={product.status}>
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
                    <span className="text-muted-foreground">
                        Stock not tracked
                    </span>
                )}
            </TableCell>
            <TableCell>
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
