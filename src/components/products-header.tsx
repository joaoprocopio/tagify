"use client"

import { Button } from "@/lib/ui/components/button"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/lib/ui/components/input-group"
import { Kbd, KbdGroup } from "@/lib/ui/components/kbd"
import { SidebarTrigger, useSidebar } from "@/lib/ui/components/sidebar"
import { platformQueries } from "@/state/platform/query"
import {
    ProductSearchParams,
    ProductStatusFilter,
    TProductStatusFilter,
} from "@/state/products/constants"
import { useQuery } from "@tanstack/react-query"
import { ListFilter, Search, SlidersHorizontal } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import * as React from "react"

export function ProductsHeader() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const sidebar = useSidebar()
    const isMac = useQuery(platformQueries.isMac())

    const selectedStatus = React.useMemo(
        () =>
            searchParams.get(ProductSearchParams.status.value) ||
            ProductSearchParams.status.default.value,
        [searchParams],
    )

    const selectStatus = (status: TProductStatusFilter) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(ProductSearchParams.status.value, status)
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <header className="bg-background/60 h-header sticky inset-x-0 top-0 z-1 flex shrink-0 flex-col border-b backdrop-blur">
            <div className="px-container flex flex-1 shrink-0 items-center gap-x-2">
                <SidebarTrigger
                    className="-ml-1.5 aria-hidden:hidden"
                    aria-hidden={sidebar.open}
                />

                <h1 className="text-xs font-semibold">Products</h1>

                <div className="ml-3 flex items-center gap-x-2">
                    {Object.values(ProductStatusFilter).map((status) => (
                        <Button
                            key={status.value}
                            className="border"
                            size="xs"
                            variant={
                                selectedStatus === status.value
                                    ? "secondary"
                                    : "outline"
                            }
                            onClick={() => selectStatus(status.value)}>
                            <status.icon />
                            <span>{status.label}</span>
                        </Button>
                    ))}
                </div>

                <InputGroup className="ml-auto h-7 w-56">
                    <InputGroupAddon
                        className="pl-2"
                        align="inline-start">
                        <Search />
                    </InputGroupAddon>
                    <InputGroupInput
                        className="h-full"
                        placeholder="Search"
                    />
                    {isMac.isSuccess && (
                        <InputGroupAddon
                            className="pr-2"
                            align="inline-end">
                            <KbdGroup>
                                {/* TODO: trocar entre ctrl e cmd entre user agents */}
                                {isMac.data ? (
                                    <Kbd className="text-4xs">⌘K</Kbd>
                                ) : (
                                    <Kbd className="text-4xs">CTRL + K</Kbd>
                                )}
                            </KbdGroup>
                        </InputGroupAddon>
                    )}
                </InputGroup>
            </div>

            <div className="px-container flex flex-1 shrink-0 items-center justify-between gap-x-2">
                <Button
                    className="-ml-2.5"
                    size="xs"
                    variant="ghost">
                    <ListFilter />
                    <span>Filter</span>
                </Button>

                <Button
                    size="xs"
                    variant="outline">
                    <SlidersHorizontal />
                    <span>Display</span>
                </Button>
            </div>
        </header>
    )
}
