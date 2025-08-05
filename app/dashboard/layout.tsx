// app/dashboard/layout.tsx

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import "@/app/globals.css" // Sesuaikan jika kamu mengatur global style di tempat lain

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <div className="flex min-h-screen">
        <AppSidebar variant="inset" />

        <SidebarInset>
          <div className="flex flex-col flex-1">
            <SiteHeader />

            <main className="flex-1 px-4 py-4 md:px-6 md:py-6">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
