"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, PhoneOutgoing, Activity, Clock } from "lucide-react"
import { LiveCallsChart } from "./live-calls-chart"
import { ServiceLevelChart } from "./service-level-chart"

export function OverviewTab() {
  const stats = [
    { label: "Incoming Calls", value: "0", icon: Phone, color: "text-blue-600" },
    { label: "Outgoing Calls", value: "0", icon: PhoneOutgoing, color: "text-green-600" },
    { label: "Calls per Hour", value: "0", icon: Activity, color: "text-orange-600" },
    { label: "Avg. Handling Time", value: "00:00:00", icon: Clock, color: "text-purple-600" },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Live Call Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <LiveCallsChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Service Level</CardTitle>
          </CardHeader>
          <CardContent>
            <ServiceLevelChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
