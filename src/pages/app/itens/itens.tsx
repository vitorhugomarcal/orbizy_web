import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Helmet } from "react-helmet-async"
import { ItensTable } from "./itens-table"
import { Button } from "@/components/ui/button"

export function Itens() {
  return (
    <SidebarInset>
      <Helmet title="Itens" />
      <header className="flex h-16 shrink-0 items-center gap-2 justify-between mr-4">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Itens</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button className="w-[240px]">+ Novo Item</Button>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <ItensTable />
      </div>
    </SidebarInset>
  )
}
