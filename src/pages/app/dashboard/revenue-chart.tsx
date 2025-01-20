"use client"

import {
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts"
import color from "tailwindcss/colors"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { getInvoices, type GetInvoiceProps } from "@/api/get-Invoices"
import { startOfYear, endOfYear, format, parse, isSameMonth } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
  desktop: {
    label: "R$",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RevenueChart() {
  const { data: invoices, isLoading } = useQuery<GetInvoiceProps[]>({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  })

  const getMonthlyApprovedInvoices = () => {
    if (!invoices) return []

    const currentYear = new Date().getFullYear()
    const startDate = startOfYear(new Date())
    const endDate = endOfYear(new Date())

    // Filter invoices for current year and APPROVED status
    const yearInvoices = invoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.createdAt)
      return (
        invoiceDate >= startDate &&
        invoiceDate <= endDate &&
        invoice.status === "APPROVED"
      )
    })

    // Create array of all months
    const months = Array.from({ length: 12 }, (_, index) => {
      return format(new Date(currentYear, index), "MMMM", { locale: ptBR })
    })

    // Calculate total revenue for each month
    const monthlyRevenue = months.map((month) => {
      const monthInvoices = yearInvoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.createdAt)
        const monthDate = parse(month, "MMMM", new Date(), { locale: ptBR })
        return isSameMonth(invoiceDate, monthDate)
      })

      const totalRevenue = monthInvoices.reduce((acc, invoice) => {
        return acc + Number(invoice.total) // Convert cents to full currency
      }, 0)

      return {
        month,
        R$: totalRevenue,
      }
    })

    return monthlyRevenue
  }

  const chartData = getMonthlyApprovedInvoices()

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>
            Janeiro - Dezembro {new Date().getFullYear()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <ChartContainer config={chartConfig}>
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelClassName="capitalize"
                      formatter={(value) =>
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(value))
                      }
                    />
                  }
                />
                <Bar
                  dataKey="R$"
                  fill={color.orange[500]}
                  radius={8}
                  animationDuration={2000}
                />
              </BarChart>
            )}
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
