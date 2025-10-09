// "use client"

// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// const data = [
//   { hour: "8 AM", calls: 8, avgTime: 195 },
//   { hour: "9 AM", calls: 14, avgTime: 180 },
//   { hour: "10 AM", calls: 19, avgTime: 165 },
//   { hour: "11 AM", calls: 23, avgTime: 190 },
//   { hour: "12 PM", calls: 11, avgTime: 210 },
//   { hour: "1 PM", calls: 16, avgTime: 175 },
//   { hour: "2 PM", calls: 21, avgTime: 160 },
//   { hour: "3 PM", calls: 25, avgTime: 155 },
//   { hour: "4 PM", calls: 18, avgTime: 170 },
//   { hour: "5 PM", calls: 12, avgTime: 185 },
// ]

// export function HourlyPerformanceChart() {
//   return (
//     <ChartContainer
//       config={{
//         calls: {
//           label: "Total Calls",
//           color: "hsl(var(--chart-1))",
//         },
//         avgTime: {
//           label: "Avg Time (sec)",
//           color: "hsl(var(--chart-3))",
//         },
//       }}
//       className="h-[250px] w-full"
//     >
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" vertical={false} />
//         <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
//         <YAxis yAxisId="left" tickLine={false} axisLine={false} tickMargin={8} />
//         <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tickMargin={8} />
//         <ChartTooltip content={<ChartTooltipContent />} />
//         <Bar yAxisId="left" dataKey="calls" fill="var(--color-calls)" radius={[4, 4, 0, 0]} />
//         <Bar yAxisId="right" dataKey="avgTime" fill="var(--color-avgTime)" radius={[4, 4, 0, 0]} />
//       </BarChart>
//     </ChartContainer>
//   )
// }




"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { hour: "8 AM", calls: 8, avgTime: 195 },
  { hour: "9 AM", calls: 14, avgTime: 180 },
  { hour: "10 AM", calls: 19, avgTime: 165 },
  { hour: "11 AM", calls: 23, avgTime: 190 },
  { hour: "12 PM", calls: 11, avgTime: 210 },
  { hour: "1 PM", calls: 16, avgTime: 175 },
  { hour: "2 PM", calls: 21, avgTime: 160 },
  { hour: "3 PM", calls: 25, avgTime: 155 },
  { hour: "4 PM", calls: 18, avgTime: 170 },
  { hour: "5 PM", calls: 12, avgTime: 185 },
]

export function HourlyPerformanceChart() {
  return (
    <ChartContainer
      config={{
        calls: {
          label: "Total Calls",
          color: "hsl(217, 91%, 60%)",
        },
        avgTime: {
          label: "Avg Time (sec)",
          color: "hsl(25, 95%, 53%)",
        },
      }}
      className="h-[250px] w-full"
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis yAxisId="left" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="calls"
          stroke="hsl(217, 91%, 60%)"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 5 }}
          style={{
            filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))",
          }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="avgTime"
          stroke="hsl(25, 95%, 53%)"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 5 }}
          style={{
            filter: "drop-shadow(0 2px 4px rgba(249, 115, 22, 0.3))",
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}
