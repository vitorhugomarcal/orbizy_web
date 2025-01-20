import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { DollarSign } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { MonthEstimatesCard } from "./month-estimates-card"
import { ClientCard } from "./client-card"
import { MonthInvoiceCard } from "./month-invoice-card"
import { OverdueInvoiceCard } from "./overdue-invoice-card"
import { RevenueChart } from "./revenue-chart"
import { MonthTotalCard } from "./month-total-card"

export function Dashboard() {
  return (
    <SidebarInset>
      <Helmet title="Dashboard" />
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        <ClientCard />
        <MonthEstimatesCard />
        <MonthInvoiceCard />
        <OverdueInvoiceCard />
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-9">
        <RevenueChart />
        <MonthTotalCard />
      </div>
    </SidebarInset>
  )
}
