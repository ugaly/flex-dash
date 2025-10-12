"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FlexChartCardProps {
  chart: {
    id: string
    name: string
    description: string
  }
  onClick?: () => void
}

export function FlexChartCard({ chart, onClick }: FlexChartCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-700">
          <span
            className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0
                       after:w-0 after:h-[2px] after:bg-blue-700 after:transition-all after:duration-300
                       hover:after:w-full"
          >
            {chart.name}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{chart.description}</p>
      </CardContent>
    </Card>
  )
}
