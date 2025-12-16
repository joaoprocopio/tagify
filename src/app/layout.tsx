import "@/assets/styles/tailwind.css"
import { AppSidebar } from "@/components/app-sidebar"
import { getQueryClient } from "@/lib/cache/client"
import { CacheDevtools } from "@/lib/cache/devtools"
import { CacheProvider } from "@/lib/cache/provider"
import { ThemeProvider } from "@/lib/theme/provider"
import { SidebarInset, SidebarProvider } from "@/lib/ui/components/sidebar"
import { Toaster } from "@/lib/ui/components/sonner"
import { platformQueries } from "@/state/platform/cache"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { headers } from "next/headers"

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
    await client.prefetchQuery(platformQueries.serverUserAgent(await headers()))

    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable}`}
            suppressHydrationWarning>
            <body>
                <CacheProvider>
                    <ThemeProvider
                        enableSystem
                        disableTransitionOnChange
                        attribute="class"
                        defaultTheme="system">
                        <SidebarProvider>
                            <AppSidebar />
                            <SidebarInset>{children}</SidebarInset>
                            <Toaster />
                            <CacheDevtools />
                        </SidebarProvider>
                    </ThemeProvider>
                </CacheProvider>
            </body>
        </html>
    )
}
