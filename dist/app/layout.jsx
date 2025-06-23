import "./globals.css";
import { OrganizationProvider } from "@/components/organization-provider";
import { LanguageProvider } from "@/components/language-provider";
import { AuthProvider } from "@/components/auth-provider";
export const metadata = {
    title: "v0 App",
    description: "Created with v0",
    generator: "v0.dev",
};
export default function RootLayout({ children, }) {
    return (<html lang="en">
      <body>
        <OrganizationProvider>
          <LanguageProvider>
            <AuthProvider>{children}</AuthProvider>
          </LanguageProvider>
        </OrganizationProvider>
      </body>
    </html>);
}
