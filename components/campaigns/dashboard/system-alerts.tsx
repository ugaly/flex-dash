"use client"

import { AlertCircle } from "lucide-react"

interface Alert {
  id: string
  title: string
  message: string
  type: "warning" | "error" | "info"
}

interface SystemAlertsProps {
  alerts: Alert[]
}

export function SystemAlerts({ alerts }: SystemAlertsProps) {
  if (alerts.length === 0) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold">System Alerts</h3>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
            <h4 className="font-semibold text-red-800 mb-1">{alert.title}</h4>
            <p className="text-sm text-red-700">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
