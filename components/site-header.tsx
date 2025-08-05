import { getCurrentUser } from "@/lib/get-current-user"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export async function SiteHeader() {
  const user = await getCurrentUser()

  const userInitial = user?.name?.charAt(0).toUpperCase() || "?"

  return (
    <header
      className="flex items-center border-b transition-all"
      style={{ height: "var(--header-height)" }}
    >
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        {/* Sidebar toggle button */}
        <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />

        {/* Vertical divider */}
        <Separator orientation="vertical" className="mx-2 h-4" />

        {/* Page title */}
        <h1 className="text-base font-medium">Dashboard</h1>

        {/* Right side user info and logout */}
        <div className="ml-auto flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={user.image ?? undefined}
                  alt={user.name ?? "User"}
                />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.name ?? "User"}</span>
            </div>
          )}
          <Button variant="ghost" size="sm" asChild>
            <a href="/logout" title="Logout">
              Logout
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
