import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetClientsMonth } from "@/http/generated"
import { Users } from "lucide-react"

export function ClientCard() {
  const clientCard = useGetClientsMonth()

  console.log("CARD =>", clientCard)

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Clientes</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {clientCard.isLoading ? (
          <div className="space-y-1">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {clientCard.data?.total}
            </span>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 dark:text-emerald-400">
                {clientCard.data?.new === 0 ? "" : clientCard.data?.new}
              </span>{" "}
              {clientCard.data?.new === 1
                ? "cliente novo esse mês"
                : clientCard.data?.new === 0
                  ? "nenhum cliente novo esse mês"
                  : "clientes novos esse mês"}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
