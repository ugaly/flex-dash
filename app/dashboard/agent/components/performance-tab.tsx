"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CallAnswerRateChart } from "./call-answer-rate-chart"
import { HourlyPerformanceChart } from "./hourly-performance-chart"

export function PerformanceTab() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Call Answering Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <CallAnswerRateChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Hourly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <HourlyPerformanceChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
