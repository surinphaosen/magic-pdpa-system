"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, FileText, Activity, Shield, Users, Settings, ChevronUp, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function AppSidebar(_a) {
    var _b;
    var props = __rest(_a, []);
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const pathname = usePathname();
    const navigationItems = [
        {
            title: t("nav.dashboard"),
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: t("nav.ropa"),
            url: "/ropa",
            icon: FileText,
        },
        {
            title: t("nav.logs"),
            url: "/logs",
            icon: Activity,
        },
        {
            title: t("nav.consent"),
            url: "/consent",
            icon: Shield,
        },
    ];
    const adminItems = [
        {
            title: t("nav.users"),
            url: "/admin/users",
            icon: Users,
        },
        {
            title: t("nav.settings"),
            url: "/settings",
            icon: Settings,
        },
    ];
    return (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="size-4"/>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">PDPA System</span>
            <span className="truncate text-xs">Magic Software</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (<SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {(user === null || user === void 0 ? void 0 : user.role) === "Admin" && (<SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (<SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname.startsWith(item.url)}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>)}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">{((_b = user === null || user === void 0 ? void 0 : user.name) === null || _b === void 0 ? void 0 : _b.charAt(0)) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user === null || user === void 0 ? void 0 : user.name}</span>
                    <span className="truncate text-xs">
                      <Badge variant="secondary" className="text-xs">
                        {user === null || user === void 0 ? void 0 : user.role}
                      </Badge>
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4"/>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
                <DropdownMenuItem onClick={logout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>);
}
