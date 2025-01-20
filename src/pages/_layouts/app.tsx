import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export function AppLayout() {
  return (
    <div className="antialiased">
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    </div>
  )
}
