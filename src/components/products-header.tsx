"use client"

import { SidebarTrigger, useSidebar } from "@/lib/ui/components/sidebar"

export function ProductsHeader() {
    const sidebar = useSidebar()

    return (
        <header className="h-layout-header container grid grid-cols-[auto_auto_1fr] items-center gap-x-2 border-b">
            <SidebarTrigger hidden={sidebar.open} />

            <h1 className="text-xs font-semibold">Products</h1>
        </header>
    )
}
