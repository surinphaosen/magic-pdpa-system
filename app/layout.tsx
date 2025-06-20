import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { OrganizationProvider } from "@/components/organization-provider"
import { LanguageProvider } from "@/components/language-provider"
import { AuthProvider } from "@/components/auth-provider"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <OrganizationProvider>
          <LanguageProvider>
            <AuthProvider>{children}</AuthProvider>
          </LanguageProvider>
        </OrganizationProvider>
      </body>
    </html>
  )
}
