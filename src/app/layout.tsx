import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/topnav"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Mission Control",
  description: "Custom tools & operator dashboard",
  icons: { icon: "/favicon.ico" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="font-sans">
        <Sidebar />
        <div className="pl-60">
          <TopNav />
          <main className="min-h-[calc(100vh-3.5rem)] bg-[#0a0a0a]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
