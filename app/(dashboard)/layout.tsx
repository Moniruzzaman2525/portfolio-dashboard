import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/Dashboard/theme-provider"
import { DashboardLayout } from "@/components/Dashboard/dashboard-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: {
        default: "Dashboard",
        template: "%s | Dashboard",
    },
    description: "Manage your projects and blocks",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <DashboardLayout>{children}</DashboardLayout>
                </ThemeProvider>
            </body>
        </html>
    )
}
