import { getClients } from "@/api/client/get-Clients"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { Users } from "lucide-react"
import { startOfMonth, isWithinInterval, startOfDay, endOfDay } from "date-fns"

interface Client {
  id: string
  createdAt: Date
  // add other client properties as needed
}

interface ClientStats {
  total: number
  new: number
}

export function ClientCard() {
  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: getClients,
  })

  const calculateNewClientsPercentage = (clients: Client[]): ClientStats => {
    if (!clients?.length)
      return {
        total: 0,
        new: 0,
      }

    const today = new Date()
    const monthStart = startOfMonth(today)

    // Get clients created this month
    const newClients = clients.filter((client) => {
      const createdAt = client.createdAt
      return isWithinInterval(createdAt, {
        start: startOfDay(monthStart),
        end: endOfDay(today),
      })
    })

    const newClientsCount = newClients.length

    return {
      total: clients.length,
      new: newClientsCount,
    }
  }

  const clientStats =
    isLoading === false && clients
      ? calculateNewClientsPercentage(clients)
      : null

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Clientes</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {isLoading || !clientStats ? (
          <div className="space-y-1">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {clientStats.total}
            </span>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 dark:text-emerald-400">
                {clientStats.new === 0 ? "" : clientStats.new}
              </span>{" "}
              {clientStats.new === 1
                ? "cliente novo esse mês"
                : clientStats.new === 0
                ? "nenhum cliente novo esse mês"
                : "clientes novos esse mês"}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
