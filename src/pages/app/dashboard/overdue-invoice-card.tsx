import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

export function OverdueInvoiceCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Faturas vencidas
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">R$ 7.892,40</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-red-500 dark:text-red-400"> -12%</span> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
