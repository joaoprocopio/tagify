import "@/assets/styles/tailwind.css"
import { AppSidebar } from "@/components/app-sidebar"
import { CacheDevtools } from "@/lib/cache/devtools"
import CacheProvider from "@/lib/cache/provider"
import { ThemeProvider } from "@/lib/theme/provider"
import { SidebarInset, SidebarProvider } from "@/lib/ui/components/sidebar"
import { Toaster } from "@/lib/ui/components/sonner"
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

export default async function Layout({ children }: React.PropsWithChildren) {
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
                            <SidebarInset>
                                <App>{children}</App>
                            </SidebarInset>
                            <Toaster />
                            <CacheDevtools />
                        </SidebarProvider>
                    </ThemeProvider>
                </CacheProvider>
            </body>
        </html>
    )
}

// Esse component já tem acesso a todos seus antecessores, como os providers e etc.
// Dessa forma fica mais fácil de separar o que é lógica de Layout e de Providers, do que é lógica do App em si.
function App({ children }: React.PropsWithChildren) {
    return children
}
