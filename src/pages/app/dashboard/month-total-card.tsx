import { getInvoices, type GetInvoiceProps } from "@/api/get-Invoices"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { ChevronsDown, ChevronsUp, PiggyBank } from "lucide-react"

export function MonthTotalCard() {
  const { data: invoices, isLoading } = useQuery<GetInvoiceProps[]>({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  })

  const revenueAmount = invoices?.length
    ? Number(
        invoices
          .filter((invoice) => invoice.status === "APPROVED")
          .reduce((total, invoice) => total + Number(invoice.total), 0)
          .toFixed(2)
      )
    : 0

  console.log(revenueAmount)

  const overdueAmount = 0
  const resultAmount = revenueAmount - overdueAmount

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  return (
    <Card className="col-span-6 lg:col-span-3">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Receitas</CardTitle>
        <ChevronsUp className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
      </CardHeader>
      <CardContent className="space-y-1 gap-4">
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          <span className="text-2xl font-bold tracking-tight">
            {formatCurrency(revenueAmount)}
          </span>
        )}
        {/* <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+4%</span> em
          relação ao ano anterior
        </p> */}
      </CardContent>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Despesas</CardTitle>
        <ChevronsDown className="h-4 w-4 text-destructive" />
      </CardHeader>
      <CardContent className="space-y-1 gap-4">
        <span className="text-2xl font-bold tracking-tight">
          {formatCurrency(overdueAmount)}
        </span>
        {/* <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+4%</span> em
          relação ao ano anterior
        </p> */}
      </CardContent>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Resultado líquido
        </CardTitle>
        <PiggyBank className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1 gap-4">
        <span className="text-2xl font-bold tracking-tight">
          {formatCurrency(resultAmount)}
        </span>
        {/* <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+4%</span> em
          relação ao ano anterior
        </p> */}
      </CardContent>
    </Card>
  )
}
