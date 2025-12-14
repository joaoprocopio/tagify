import "@/assets/styles/tailwind.css"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/lib/theme/provider"
import { SidebarInset, SidebarProvider } from "@/lib/ui/components/sidebar"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            className={`${geistSans.variable} ${geistMono.variable}`}
            lang="en"
            suppressHydrationWarning>
            <body>
                <ThemeProvider
                    enableSystem
                    disableTransitionOnChange
                    attribute="class"
                    defaultTheme="system">
                    <SidebarProvider>
                        <AppSidebar />
                        <SidebarInset>{children}</SidebarInset>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
