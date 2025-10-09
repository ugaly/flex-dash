"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function QueueTrendChart() {
  const [data, setData] = useState(() => {
    const now = new Date()
    // Initialize 30 points, 1 second apart
    return Array.from({ length: 30 }, (_, i) => ({
      time: new Date(now.getTime() - (29 - i) * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
      waiting: Math.floor(Math.random() * 8),
    }))
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const now = new Date()
        const newPoint = {
          time: now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }),
          waiting: Math.floor(Math.random() * 8),
        }
        // keep last 30 points (rolling window)
        return [...prevData.slice(1), newPoint]
      })
    }, 1000) // update every 1 second

    return () => clearInterval(interval)
  }, [])

  return (
    <ChartContainer
      config={{
        waiting: {
          label: "Calls Waiting",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-[250px] w-full"
    >
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={20}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="waiting"
          stroke="var(--color-waiting)"
          fill="var(--color-waiting)"
          fillOpacity={0.25}
          isAnimationActive={true}
          animationDuration={500}
        />
      </AreaChart>
    </ChartContainer>
  )
}
