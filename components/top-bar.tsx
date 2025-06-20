"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, User, Globe } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useOrganization } from "@/components/organization-provider"
import { useAuth } from "@/components/auth-provider"

export function TopBar() {
  const { language, setLanguage, t } = useLanguage()
  const { organizationData } = useOrganization()
  const { user } = useAuth()

  return (
    <div className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">PDPA System</h2>
          <Badge variant="secondary" className="text-xs">
            {language === "en" ? organizationData.companyName : organizationData.companyNameTh}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-medium">
                <Globe className="h-3 w-3 mr-1" />
                {language === "en" ? "EN" : "TH"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
                <span className="mr-2">🇺🇸</span>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("th")} className={language === "th" ? "bg-accent" : ""}>
                <span className="mr-2">🇹🇭</span>
                ไทย
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bell className="h-4 w-4" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <User className="h-4 w-4 mr-1" />
                <span className="text-xs">{user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
