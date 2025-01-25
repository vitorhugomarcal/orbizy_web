import {
  getClientsByMonth,
  type GetClientByMonthProps,
} from "@/api/client/get-Clients-By-Month"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { Users } from "lucide-react"

export function ClientCard() {
  const { data: clients, isLoading } = useQuery<GetClientByMonthProps>({
    queryKey: ["clients"],
    queryFn: getClientsByMonth,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Clientes</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {isLoading ? (
          <div className="space-y-1">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {clients?.total}
            </span>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 dark:text-emerald-400">
                {clients?.new === 0 ? "" : clients?.new}
              </span>{" "}
              {clients?.new === 1
                ? "cliente novo esse mês"
                : clients?.new === 0
                ? "nenhum cliente novo esse mês"
                : "clientes novos esse mês"}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
