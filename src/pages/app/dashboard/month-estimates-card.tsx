import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetEstimateMonth } from "@/http/generated"

import { ReceiptText } from "lucide-react"

export function MonthEstimatesCard() {
  const { data: estimates, isLoading } = useGetEstimateMonth()

  const monthlyStats = estimates?.stats

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
