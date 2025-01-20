import { getInvoices } from "@/api/get-Invoices"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { ReceiptText } from "lucide-react"
import {
  startOfMonth,
  subMonths,
  isWithinInterval,
  startOfDay,
  endOfDay,
} from "date-fns"

interface Invoice {
  id: string
  createdAt: string | Date
  // add other invoice properties as needed
}

interface MonthlyStats {
  total: number
  percentageChange: number
}

export function MonthEstimatesCard() {
  const { data: invoices, isLoading } = useQuery<Invoice[]>({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  })

  const calculateMonthlyChange = (invoices: Invoice[]): MonthlyStats => {
    if (!invoices?.length)
      return {
        total: 0,
        percentageChange: 0,
      }

    const today = new Date()
    const currentMonthStart = startOfMonth(today)
    const lastMonthStart = startOfMonth(subMonths(today, 1))

    // Get current month invoices
    const currentMonthInvoices = invoices.filter((invoice) => {
      const createdAt = new Date(invoice.createdAt)
      return isWithinInterval(createdAt, {
        start: startOfDay(currentMonthStart),
        end: endOfDay(today),
      })
    })

    // Get last month invoices
    const lastMonthInvoices = invoices.filter((invoice) => {
      const createdAt = new Date(invoice.createdAt)
      return isWithinInterval(createdAt, {
        start: startOfDay(lastMonthStart),
        end: endOfDay(currentMonthStart),
      })
    })

    const currentMonthCount = currentMonthInvoices.length
    const lastMonthCount = lastMonthInvoices.length

    // Calculate percentage change
    // If last month was 0, we'll say it's a 100% increase
    const percentageChange =
      lastMonthCount === 0
        ? 100
        : ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100

    return {
      total: currentMonthCount,
      percentageChange: percentageChange,
    }
  }

  const monthlyStats = invoices ? calculateMonthlyChange(invoices) : null

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Orçamentos no mês
        </CardTitle>
        <ReceiptText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {isLoading || !monthlyStats ? (
          <div className="space-y-1">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthlyStats.total}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={`${
                  monthlyStats.percentageChange >= 0
                    ? "text-emerald-500 dark:text-emerald-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {monthlyStats.percentageChange >= 0 ? "+" : ""}
                {monthlyStats.percentageChange.toFixed(1)}%
              </span>{" "}
              em relação ao mês passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
