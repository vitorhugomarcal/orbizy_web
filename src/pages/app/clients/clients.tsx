import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Helmet } from "react-helmet-async"
import { ClientRegister } from "./client-register"
import { ClientsTable } from "./clients-table"

export function Clients() {
  return (
    <SidebarInset>
      <Helmet title="Clientes" />
      <header className="flex h-16 shrink-0 items-center gap-2 justify-between mr-4">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Clientes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ClientRegister />
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <ClientsTable />
      </div>
    </SidebarInset>
  )
}
