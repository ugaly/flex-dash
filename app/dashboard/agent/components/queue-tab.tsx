"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Phone, Clock, Timer, XCircle } from "lucide-react"
import { QueueTrendChart } from "./queue-trend-chart"

export function QueueTab() {
  const queueStats = [
    { label: "Calls in Queue", value: "0", icon: Phone },
    { label: "Avg. Wait Time", value: "00:00:00", icon: Clock },
    { label: "Avg. Wrap-up Time", value: "00:00:00", icon: Timer },
    { label: "Abandoned Calls", value: "0", icon: XCircle },
  ]

  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Agent is currently not connected to the system. Please connect to start receiving calls.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {queueStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Queue Trend (Last Hour)</CardTitle>
        </CardHeader>
        <CardContent>
          <QueueTrendChart />
        </CardContent>
      </Card>
    </div>
  )
}
