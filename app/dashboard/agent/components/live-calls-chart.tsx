"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function LiveCallsChart() {
  const [data, setData] = useState(() => {
    const now = new Date()
    // initial 6 data points (1-minute apart)
    return Array.from({ length: 6 }, (_, i) => {
      const time = new Date(now.getTime() - (5 - i) * 1000) // 1 second apart
      return {
        time: time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
        calls: Math.floor(Math.random() * 8),
      }
    })
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
          calls: Math.floor(Math.random() * 8),
        }

        // keep last 6 data points (rolling window)
        return [...prevData.slice(1), newPoint]
      })
    }, 1000) // update every 1 second

    return () => clearInterval(interval)
  }, [])

  return (
    <ChartContainer
      config={{
        calls: {
          label: "Active Calls",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[200px] w-full"
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
          dataKey="calls"
          stroke="var(--color-calls)"
          fill="var(--color-calls)"
          fillOpacity={0.25}
          isAnimationActive={true}
          animationDuration={500}
        />
      </AreaChart>
    </ChartContainer>
  )
}
