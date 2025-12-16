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
import { useQuery } from "@tanstack/react-query"
import {
    Archive,
    ListFilter,
    Search,
    SlidersHorizontal,
    Squircle,
    SquircleDashed,
    Tag,
} from "lucide-react"

export function ProductsHeader() {
    const sidebar = useSidebar()
    const isMac = useQuery(platformQueries.isMac())

    return (
        <header>
            <div className="h-layout-header border-b">
                <div className="container flex h-full shrink-0 items-center gap-x-2">
                    <SidebarTrigger
                        className="-ml-1.5 aria-hidden:hidden"
                        aria-hidden={sidebar.open}
                    />

                    <h1 className="text-xs font-semibold">Products</h1>

                    <div className="ml-3 flex items-center gap-x-2">
                        <Button
                            className="border"
                            size="xs"
                            variant="secondary">
                            <Squircle />
                            <span>All</span>
                        </Button>

                        <Button
                            className="border"
                            size="xs"
                            variant="outline">
                            <Tag />
                            <span>Active</span>
                        </Button>

                        <Button
                            className="border"
                            size="xs"
                            variant="outline">
                            <SquircleDashed />
                            <span>Draft</span>
                        </Button>

                        <Button
                            className="border"
                            size="xs"
                            variant="outline">
                            <Archive />
                            <span>Archived</span>
                        </Button>
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
            </div>

            <div className="h-layout-subheader border-b">
                <div className="container flex h-full shrink-0 items-center justify-between gap-x-2">
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
            </div>
        </header>
    )
}
