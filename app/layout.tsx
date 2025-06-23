import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { LanguageProvider } from "@/components/language-provider"
import { OrganizationProvider } from "@/components/organization-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PDPA System - ABC Company Ltd.",
  description: "Personal Data Protection Act Compliance Management System",
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
        <OrganizationProvider>
          <LanguageProvider>
            <AuthProvider>{children}</AuthProvider>
            <Toaster />
          </LanguageProvider>
        </OrganizationProvider>
      </body>
    </html>
  )
}
