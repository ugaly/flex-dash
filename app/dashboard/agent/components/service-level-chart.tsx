"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function ServiceLevelChart() {
  const [data, setData] = useState(() => {
    const now = new Date()
    return Array.from({ length: 20 }, (_, i) => ({
      time: new Date(now.getTime() - (19 - i) * 1000).toLocaleTimeString("en-US", {
        second: "2-digit",
        hour12: false,
      }),
      level: Math.floor(Math.random() * 30) + 70,
    }))
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const now = new Date()
        const newPoint = {
          time: now.toLocaleTimeString("en-US", {
            second: "2-digit",
            hour12: false,
          }),
          level: Math.floor(Math.random() * 30) + 70,
        }
        return [...prevData.slice(1), newPoint]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ChartContainer
      config={{
        level: {
          label: "Service Level %",
          color: "hsl(142, 76%, 36%)",
        },
      }}
      className="h-[200px] w-full"
    >
      <BarChart data={data} barSize={8}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          // show only seconds (like "39", "40", etc.)
          tickFormatter={(value) => value.replace(/^0/, "")}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[60, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="level"
          fill="hsl(142, 76%, 36%)"
          radius={[4, 4, 0, 0]}
          isAnimationActive={true}
          animationDuration={500}
        />
      </BarChart>
    </ChartContainer>
  )
}
