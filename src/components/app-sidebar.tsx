import * as React from "react"
import {
  Banknote,
  BookUser,
  ClipboardList,
  Frame,
  HandCoins,
  LayoutDashboard,
  LifeBuoy,
  Map,
  Package,
  PieChart,
  Receipt,
  ReceiptText,
  RefreshCw,
  Send,
  Settings2,
  UserPlus,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import Logo from "@/assets/Logo"
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/api/get-Profile"
import NewLogo from "@/assets/newLogo"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Clientes",
      url: "/clients",
      icon: Users,
    },
    {
      title: "Fornecedores",
      url: "/supplier",
      icon: BookUser,
    },
    {
      title: "Itens",
      url: "/itens",
      icon: Package,
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "/settings/company",
      icon: Settings2,
    },
    {
      title: "Usuários",
      url: "/users",
      icon: UserPlus,
    },
    {
      title: "Suporte",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Orçamentos",
      url: "/estimates",
      icon: ReceiptText,
    },
    {
      name: "Cotações",
      url: "/suppliers-estimates",
      icon: ClipboardList,
    },
    {
      name: "Faturas",
      url: "/invoices",
      icon: Receipt,
    },
    {
      name: "Faturas Recorrentes",
      url: "/recurring",
      icon: RefreshCw,
    },
    {
      name: "Pagamentos",
      url: "/payments",
      icon: Banknote,
    },
    {
      name: "Despesas",
      url: "/expenses",
      icon: HandCoins,
    },
  ],
  main: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  if (!profile) return null

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex w-3/4">
                  <NewLogo />
                </div>
                <ModeToggle />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={profile} />
      </SidebarFooter>
    </Sidebar>
  )
}
