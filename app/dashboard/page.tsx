"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function DashboardPage() {
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
            {/* SiteHeader dihapus */}
            
            {/* Optional: Tambahkan konten halaman jika diinginkan */}
            <main className="flex flex-1 flex-col p-6">
              <h1 className="text-xl font-semibold">Hanya Sidebar Saja</h1>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
