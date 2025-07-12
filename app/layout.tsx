import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"
import { NotificationsProvider } from "@/hooks/use-notifications"
import { SwapRequestsProvider } from "@/hooks/use-swap-requests"
import { MessagesProvider } from "@/hooks/use-messages"
import { Navbar } from "@/components/layout/navbar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SkillSwap - Exchange Skills, Build Community",
  description: "Connect with others to exchange skills and knowledge in your community",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NotificationsProvider>
            <SwapRequestsProvider>
              <MessagesProvider>
                <Navbar />
                <main className="min-h-screen bg-gray-50">{children}</main>
                <Toaster />
              </MessagesProvider>
            </SwapRequestsProvider>
          </NotificationsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
