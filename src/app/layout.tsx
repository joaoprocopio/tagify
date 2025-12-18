import "@/assets/styles/tailwind.css"
import { AppSidebar } from "@/components/app-sidebar"
import { QueryDevtools } from "@/lib/query/devtools"
import { QueryProvider } from "@/lib/query/provider"
import { ThemeProvider } from "@/lib/theme/provider"
import { SidebarInset, SidebarProvider } from "@/lib/ui/components/sidebar"
import { Toaster } from "@/lib/ui/components/sonner"
import {
    getSidebarDefaultOpen,
    SIDEBAR_COOKIE_NAME,
} from "@/lib/ui/utils/sidebar"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cookies as getServerCookies } from "next/headers"

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
    const cookies = await getServerCookies()
    const sidebarCookie = cookies.get(SIDEBAR_COOKIE_NAME)

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
                        enableColorScheme
                        attribute="class"
                        defaultTheme="system">
                        <SidebarProvider
                            defaultOpen={getSidebarDefaultOpen(
                                sidebarCookie?.value,
                            )}>
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
