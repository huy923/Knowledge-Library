import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider, SidebarRail } from "@/components/ui/sidebar"
import { MainSidebar } from "@/components/main-sidebar"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SenseLib - Thư viện tri thức cho cộng đồng",
  description: "Nền tảng chia sẻ và tra cứu kiến thức đa lĩnh vực",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen">
              <MainSidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
              </div>
              <SidebarRail />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
