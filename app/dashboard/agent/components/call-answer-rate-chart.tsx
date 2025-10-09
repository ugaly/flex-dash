"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { hour: "9 AM", answered: 12, missed: 2 },
  { hour: "10 AM", answered: 18, missed: 1 },
  { hour: "11 AM", answered: 15, missed: 3 },
  { hour: "12 PM", answered: 10, missed: 1 },
  { hour: "1 PM", answered: 14, missed: 2 },
  { hour: "2 PM", answered: 20, missed: 1 },
]

export function CallAnswerRateChart() {
  return (
    <ChartContainer
      config={{
        answered: {
          label: "Answered",
          color: "hsl(var(--chart-2))",
        },
        missed: {
          label: "Missed",
          color: "hsl(var(--chart-5))",
        },
      }}
      className="h-[250px] w-full"
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="answered" fill="var(--color-answered)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="missed" fill="var(--color-missed)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
