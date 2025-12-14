"use client"

import dengun from "@/assets/images/dengun.jpeg"
import { Avatar } from "@/lib/ui/components/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/lib/ui/components/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/lib/ui/components/sidebar"
import { isNil } from "@/utils/is"
import {
    ChartNoAxesColumn,
    ChevronDown,
    Inbox,
    LogOut,
    LucideIcon,
    Package,
    Search,
    Settings,
    ShoppingBag,
    User,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface LinkGroup {
    label?: string
    links: LinkItem[]
}

interface LinkItem {
    label: string
    icon?: LucideIcon
    href?: string
}
const groups: LinkGroup[] = [
    {
        links: [
            {
                icon: Search,
                href: "/search",
                label: "Search",
            },
            {
                icon: Inbox,
                href: "/inbox",
                label: "Inbox",
            },
        ],
    },
    {
        label: "Store",
        links: [
            {
                icon: ShoppingBag,
                href: "/products",
                label: "Products",
            },
            {
                icon: Package,
                href: "/orders",
                label: "Orders",
            },
            {
                icon: User,
                href: "/customers",
                label: "Customers",
            },
            {
                icon: ChartNoAxesColumn,
                href: "/analytics",
                label: "Analytics",
            },
        ],
    },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader className="h-layout-header flex-row items-center justify-between py-0">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="w-fit">
                            <Avatar className="size-5">
                                <Image
                                    className="aspect-square size-full"
                                    alt="Logo"
                                    src={dengun}
                                    width={24}
                                    height={24}
                                />
                            </Avatar>

                            <span className="text-sidebar-primary-foreground truncate">
                                Dengun
                            </span>

                            <ChevronDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="start"
                        className="min-w-48">
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Settings />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <LogOut />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <SidebarTrigger />
            </SidebarHeader>

            <SidebarContent>
                {groups.map((group, groupIndex) => (
                    <SidebarGroup key={groupIndex}>
                        {!isNil(group.label) && (
                            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        )}

                        <SidebarMenu>
                            {group.links.map((link, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={link.href === pathname}>
                                        {!isNil(link.href) ? (
                                            <Link href={link.href}>
                                                {!isNil(link.icon) && (
                                                    <link.icon />
                                                )}
                                                <span>{link.label}</span>
                                            </Link>
                                        ) : undefined}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}
