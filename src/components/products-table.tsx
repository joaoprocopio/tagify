"use client"

import { Badge } from "@/lib/ui/components/badge"
import { Button } from "@/lib/ui/components/button"
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
import { ProductSearchParams } from "@/state/products/constants"
import { productsQueries } from "@/state/products/query"
import type { TListProducts } from "@/state/products/types"
import { array } from "@/utils/arr"
import { isEmpty, isNil } from "@/utils/is"
import { capitalizeFirst } from "@/utils/str"
import { useQuery } from "@tanstack/react-query"
import type { ColumnDef, SortingState } from "@tanstack/react-table"
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ImageIcon, MoveDown, MoveUp, X } from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import * as React from "react"
import { thumbHashToDataURL } from "thumbhash"

export type TProductNodeValue =
    TListProducts["data"]["products"]["edges"][number]["node"]

export type TThumbnailCellValue = NonNullable<
    TProductNodeValue["media"]["nodes"][number]["preview"]
>["image"]

export type TTitleCellValue = TProductNodeValue["title"]

export type TStatusCellValue = TProductNodeValue["status"]

export type TStockCellValue = Pick<
    TProductNodeValue,
    "totalInventory" | "tracksInventory" | "variantsCount"
>

export type TTagsCellValue = TProductNodeValue["tags"]

export const columns = [
    {
        id: "thumbnail",
        header: "",
        accessorFn: (row) =>
            row.node.media.nodes.at(0)?.preview
                ?.image satisfies TThumbnailCellValue,
        cell: function ThumbnailCell(context) {
            const thumb = context.getValue() as TThumbnailCellValue

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
            )
        },
    },

    {
        id: "title",
        accessorFn: (row) => row.node.title satisfies TTitleCellValue,
        header: function TitleHeader(context) {
            const isAsc = context.column.getIsSorted() === "asc"

            return (
                <Button
                    className="text-[length:inherit]"
                    variant="ghost"
                    size="xs"
                    onClick={() => context.column.toggleSorting(isAsc)}>
                    <span>Title</span>
                    <span className="text-muted-foreground">
                        {isAsc ? (
                            <MoveDown className="size-2.5" />
                        ) : (
                            <MoveUp className="size-2.5" />
                        )}
                    </span>
                </Button>
            )
        },
        cell: function TitleCell(context) {
            const title = context.getValue() as TTitleCellValue

            return <div>{title}</div>
        },
    },

    {
        id: "status",
        header: "Status",
        accessorFn: (row) => row.node.status satisfies TStatusCellValue,
        cell: function StatusCell(context) {
            const status = context.getValue() as TStatusCellValue

            return (
                <Badge
                    variant="secondary"
                    className="data-[status=ACTIVE]:bg-success data-[status=ACTIVE]:text-success-foreground data-[status=DRAFT]:bg-info data-[status=DRAFT]:text-info-foreground"
                    data-status={status}>
                    {capitalizeFirst(status)}
                </Badge>
            )
        },
    },

    {
        id: "stock",
        accessorFn: (row) =>
            ({
                totalInventory: row.node.totalInventory,
                tracksInventory: row.node.tracksInventory,
                variantsCount: row.node.variantsCount,
            }) satisfies TStockCellValue,
        sortingFn: (prevRow, nextRow) => {
            const prevStock = prevRow.original.node.totalInventory
            const nextStock = nextRow.original.node.totalInventory

            return nextStock - prevStock
        },
        header: function StockHeader(context) {
            const isAsc = context.column.getIsSorted() === "asc"

            return (
                <Button
                    className="text-[length:inherit]"
                    variant="ghost"
                    size="xs"
                    onClick={() => context.column.toggleSorting(isAsc)}>
                    <span>Stock</span>
                    <span className="text-muted-foreground">
                        {isAsc ? (
                            <MoveDown className="size-2.5" />
                        ) : (
                            <MoveUp className="size-2.5" />
                        )}
                    </span>
                </Button>
            )
        },
        cell: function StockCell(context) {
            const stock = context.getValue() as TStockCellValue

            return (
                <div
                    className="group"
                    data-empty={stock.totalInventory === 0}>
                    {stock.tracksInventory ? (
                        <>
                            <span className="group-data-[empty=true]:text-destructive">
                                <span className="tabular-nums">
                                    {stock.totalInventory}
                                </span>{" "}
                                in stock
                            </span>
                            {Boolean(
                                !isNil(stock.variantsCount?.count) &&
                                stock.variantsCount.count > 1,
                            ) && (
                                <span>
                                    <span> for </span>
                                    <span className="tabular-nums">
                                        {stock.variantsCount!.count}
                                    </span>
                                    <span> variants</span>
                                </span>
                            )}
                        </>
                    ) : (
                        <span className="text-muted-foreground">
                            Stock not tracked
                        </span>
                    )}
                </div>
            )
        },
    },

    {
        id: "tags",
        header: "Tags",
        accessorFn: (row) => row.node.tags satisfies TTagsCellValue,
        cell: function TagsCell(context) {
            const tags = context.getValue() as TTagsCellValue

            return (
                <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            )
        },
    },
] as const satisfies ColumnDef<
    TListProducts["data"]["products"]["edges"][number]
>[]

export function ProductsTable() {
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: "title", desc: false },
    ])

    const searchParams = useSearchParams()
    const products = useQuery(productsQueries.list({ searchParams }))
    const table = useReactTable({
        columns: columns,
        data: products.data?.data.products.edges || [],
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    })

    return (
        <TableContainer>
            <Table className="[&_tr>:first-child]:pl-container [&_tr>:last-child]:pr-container [&_tr>:first-child]:w-10">
                <ProductsTableCaption className="m-0 pt-8 pb-16" />

                <TableHeader className="top-header bg-background/60 sticky inset-x-0 z-1 backdrop-blur">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {!isEmpty(table.getRowModel().rows) &&
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={
                                    row.getIsSelected() ? "selected" : undefined
                                }>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function ProductsTableCaption(
    props: React.ComponentProps<typeof TableCaption>,
) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const products = useQuery(productsQueries.list({ searchParams }))
    const count = useQuery(productsQueries.count({ searchParams }))
    const hasSearchParams = React.useMemo(
        () => !isEmpty(searchParams.size),
        [searchParams],
    )

    function clearFilters() {
        router.push(pathname)
    }

    if (
        products.isSuccess &&
        hasSearchParams &&
        isEmpty(products.data.data.products.edges)
    ) {
        return (
            <TableCaption {...props}>
                <div className="flex flex-col items-center justify-center gap-2.5">
                    <span>No products were found.</span>
                    <Button
                        size="xs"
                        variant="ghost"
                        className="text-foreground!"
                        onClick={clearFilters}>
                        <span>Clear filters</span>
                        <X />
                    </Button>
                </div>
            </TableCaption>
        )
    }

    if (count.isSuccess && hasSearchParams && !isEmpty(count.data)) {
        return (
            <TableCaption {...props}>
                <div className="flex flex-col items-center justify-center gap-2.5">
                    <span>
                        Showing {count.data}{" "}
                        {count.data > 1 ? "products" : "product"}
                    </span>
                    <Button
                        size="xs"
                        variant="ghost"
                        className="text-foreground!"
                        onClick={clearFilters}>
                        <span>Clear filters</span>
                        <X />
                    </Button>
                </div>
            </TableCaption>
        )
    }

    return undefined
}
