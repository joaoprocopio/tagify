"use client"

import { Button } from "@/lib/ui/components/button"
import { SidebarTrigger, useSidebar } from "@/lib/ui/components/sidebar"
import { Archive, Squircle, SquircleDashed, Tag } from "lucide-react"

export function ProductsHeader() {
    const sidebar = useSidebar()

    return (
        <header className="h-layout-header container flex items-center gap-x-2 border-b">
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
        </header>
    )
}
