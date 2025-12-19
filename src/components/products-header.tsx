"use client"

import { useDebouncedFn } from "@/lib/debounce/hooks"
import { Button } from "@/lib/ui/components/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/lib/ui/components/command"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/lib/ui/components/dropdown-menu"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/lib/ui/components/input-group"
import { SidebarTrigger, useSidebar } from "@/lib/ui/components/sidebar"
import {
    ProductSearchParams,
    ProductStatusFilter,
} from "@/state/products/constants"
import { productsQueries } from "@/state/products/query"
import { isEmpty, isNil } from "@/utils/is"
import { useQuery } from "@tanstack/react-query"
import { ListFilter, Search, Squircle, Tag } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import * as React from "react"

export function ProductsHeader() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const sidebar = useSidebar()

    const selectedStatus = React.useMemo(
        () =>
            searchParams.get(ProductSearchParams.status.value) ||
            ProductSearchParams.status.default.value,
        [searchParams],
    )

    const selectedTag = React.useMemo(
        () => searchParams.get(ProductSearchParams.tag.value),
        [searchParams],
    )

    const selectedSearch = React.useMemo(
        () => searchParams.get(ProductSearchParams.search.value),
        [searchParams],
    )

    const selectStatus = (status: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(ProductSearchParams.status.value, status)
        router.push(`${pathname}?${params.toString()}`)
    }

    const selectTag = (tag: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(ProductSearchParams.tag.value, tag)
        router.push(`${pathname}?${params.toString()}`)
    }

    const selectSearch = useDebouncedFn((search: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (isEmpty(search)) {
            params.delete(ProductSearchParams.search.value)
        } else {
            params.set(ProductSearchParams.search.value, search)
        }

        router.push(`${pathname}?${params.toString()}`)
    })

    return (
        <header className="bg-background h-header px-container sticky inset-x-0 top-0 z-1 flex shrink-0 items-center gap-x-2 border-b backdrop-blur">
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
                        <status.icon className="text-muted-foreground" />
                        <span>{status.label}</span>
                    </Button>
                ))}
            </div>

            <ProductsHeaderFilter
                className="ml-auto h-8 w-64"
                selectTag={selectTag}
                selectSearch={selectSearch}
                selectStatus={selectStatus}
                selectedTag={selectedTag}
                selectedStatus={selectedStatus}
                selectedSearch={selectedSearch}
            />
        </header>
    )
}

function ProductsHeaderFilter({
    selectTag: _selectTag,
    selectSearch: _selectSearch,
    selectStatus: _selectStatus,
    selectedTag,
    selectedStatus,
    selectedSearch: _selectedSearch,
    ...props
}: React.ComponentProps<typeof InputGroup> & {
    selectTag: (tag: string) => void
    selectSearch: (search: string) => void
    selectStatus: (status: string) => void
    selectedTag: string | null
    selectedStatus: string
    selectedSearch: string | null
}) {
    const [selectedSearch, setSelectedSearch] = React.useState<string>(
        _selectedSearch || "",
    )

    const [open, setOpen] = React.useState(false)
    const tags = useQuery(productsQueries.tags())

    const selectTag: typeof _selectTag = (tag) => {
        _selectTag(tag)
        setOpen(false)
    }

    const selectSearch: typeof _selectSearch = (search) => {
        _selectSearch(search)
        setSelectedSearch(search)
    }

    const selectStatus: typeof _selectStatus = (status) => {
        _selectStatus(status)
        setOpen(false)
    }

    React.useEffect(() => {
        // Esse effect sincroniza a limpeza dos filtros, com o estado de busca do componente.
        if (!isNil(_selectedSearch)) {
            return undefined
        }

        // Caso o valor que esteja vindo dos parâmetros de busca seja nulo, ou seja — vazio, nós limpamos o estado de buscar.
        // Isso garante que ao limpar a busca o estado local esteja também sincronizado.
        setSelectedSearch("")
    }, [_selectedSearch])

    return (
        <InputGroup {...props}>
            <InputGroupAddon
                className="pl-1.5"
                align="inline-start">
                <Search />
            </InputGroupAddon>

            <InputGroupInput
                className="h-full"
                placeholder="Search..."
                value={selectedSearch}
                onChange={(e) => selectSearch(e.target.value)}
            />

            <InputGroupAddon align="inline-end">
                <DropdownMenu
                    open={open}
                    onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <InputGroupButton
                            className="size-6 border"
                            size="icon-xs"
                            variant="secondary">
                            <ListFilter className="size-3" />
                        </InputGroupButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <Tag />
                                    <span>Tag</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className="p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Filter..."
                                            autoFocus
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                No tags found.
                                            </CommandEmpty>
                                            {Boolean(
                                                tags.isSuccess &&
                                                !isNil(tags.data),
                                            ) && (
                                                <CommandGroup>
                                                    {tags.data!.map((tag) => (
                                                        <CommandItem
                                                            key={tag}
                                                            value={tag}
                                                            onSelect={
                                                                selectTag
                                                            }>
                                                            {tag}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            )}
                                        </CommandList>
                                    </Command>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <Squircle />
                                    <span>Status</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className="p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Filter..."
                                            autoFocus={true}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                No status found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {Object.values(
                                                    ProductStatusFilter,
                                                ).map((status) => (
                                                    <CommandItem
                                                        key={status.value}
                                                        value={status.value}
                                                        onSelect={selectStatus}>
                                                        {status.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </InputGroupAddon>
        </InputGroup>
    )
}
