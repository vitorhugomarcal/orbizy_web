"use client"

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
import { Skeleton } from "@/components/ui/skeleton"
import { useGetEstimateChart } from "@/http/generated"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts"
import color from "tailwindcss/colors"

const chartConfig = {
  desktop: {
    label: "R$",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RevenueChart() {
  const { data, isLoading } = useGetEstimateChart()

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
              <BarChart accessibilityLayer data={data?.stats}>
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
