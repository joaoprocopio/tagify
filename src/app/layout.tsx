import "@/assets/styles/tailwind.css"
import { AppSidebar } from "@/components/app-sidebar"
import { getQueryClient } from "@/lib/query/client"
import { QueryDevtools } from "@/lib/query/devtools"
import { QueryProvider } from "@/lib/query/provider"
import { ThemeProvider } from "@/lib/theme/provider"
import { SidebarInset, SidebarProvider } from "@/lib/ui/components/sidebar"
import { Toaster } from "@/lib/ui/components/sonner"
import { SIDEBAR_COOKIE_NAME } from "@/lib/ui/constants/sidebar"
import { platformServerQueries } from "@/state/platform/server/query"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cookies } from "next/headers"

const geistSans = Geist({
    variable: "--font-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Tagify",
}

export default async function Layout({ children }: React.PropsWithChildren) {
    const client = getQueryClient()
    await client.prefetchQuery(platformServerQueries.userAgent())

    const readonlyCookies = await cookies()
    const sidebarCookie = readonlyCookies.get(SIDEBAR_COOKIE_NAME)

    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable}`}
            suppressHydrationWarning>
            <body>
                <QueryProvider>
                    <ThemeProvider
                        enableSystem
                        disableTransitionOnChange
                        attribute="class"
                        defaultTheme="system">
                        <SidebarProvider
                            defaultOpen={sidebarCookie?.value !== "false"}>
                            <AppSidebar />
                            <SidebarInset>{children}</SidebarInset>
                            <Toaster />
                            <QueryDevtools />
                        </SidebarProvider>
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    )
}
