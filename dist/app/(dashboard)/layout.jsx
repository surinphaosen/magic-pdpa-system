"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
export default function DashboardLayout({ children, }) {
    return (<SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopBar />
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>);
}
