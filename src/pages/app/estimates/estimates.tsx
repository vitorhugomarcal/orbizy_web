import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Helmet } from "react-helmet-async"
import { EstimateTable } from "./estimate-table"
import { Button } from "@/components/ui/button"

export function Estimates() {
  return (
    <SidebarInset>
      <Helmet title="Orçamentos" />
      <header className="flex h-16 shrink-0 items-center gap-2 justify-between mr-4">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {/* <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem> */}
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Orçamentos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button className="w-[240px]">+ Novo orçamento</Button>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <EstimateTable />
      </div>
    </SidebarInset>
  )
}
