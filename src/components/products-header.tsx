"use client"

import { Button } from "@/lib/ui/components/button"
import { Input } from "@/lib/ui/components/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/lib/ui/components/input-group"
import { SidebarTrigger, useSidebar } from "@/lib/ui/components/sidebar"
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

    return (
        <>
            <div className="h-layout-header container flex items-center gap-x-2 border-b">
                <SidebarTrigger hidden={sidebar.open} />

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
                </InputGroup>
            </div>

            <div className="h-layout-subheader container flex items-center justify-between gap-x-2 border-b pl-3.5">
                <Button
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
        </>
    )
}
