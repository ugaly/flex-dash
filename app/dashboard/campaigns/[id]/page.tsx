"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RealTimeActivity } from "@/components/campaigns/dashboard/real-time-activity"
import { SystemPerformance } from "@/components/campaigns/dashboard/system-performance"
import { BroadcastStats } from "@/components/campaigns/dashboard/broadcast-stats"
import { ResponseCollection } from "@/components/campaigns/dashboard/response-collection"
import { SystemAlerts } from "@/components/campaigns/dashboard/system-alerts"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function CampaignDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const callsChartRef = useRef<HTMLCanvasElement>(null)
  const volumeChartRef = useRef<HTMLCanvasElement>(null)
  const callsChartInstance = useRef<Chart | null>(null)
  const volumeChartInstance = useRef<Chart | null>(null)

  const [stats, setStats] = useState({
    activeCalls: 0,
    callsPerSecond: 0,
    rejection: 0,
    connectionRate: 0,
    noAnswer: 0,
    currentProgress: 0,
    totalProgress: 100,
  })

  useEffect(() => {
    if (callsChartInstance.current) {
      callsChartInstance.current.destroy()
      callsChartInstance.current = null
    }
    if (volumeChartInstance.current) {
      volumeChartInstance.current.destroy()
      volumeChartInstance.current = null
    }

    // Initialize charts with initial data
    if (callsChartRef.current) {
      const ctx = callsChartRef.current.getContext("2d")
      if (ctx) {
        // Generate initial 20 data points
        const now = new Date()
        const initialLabels = Array.from({ length: 20 }, (_, i) => {
          const time = new Date(now.getTime() - (19 - i) * 1000)
          return time.toLocaleTimeString("en-US", { hour12: false })
        })
        const initialDialing = Array.from({ length: 20 }, () => Math.floor(Math.random() * 3) + 3)
        const initialAnswered = Array.from({ length: 20 }, () => Math.floor(Math.random() * 2) + 2)

        callsChartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: initialLabels,
            datasets: [
              {
                label: "Dialing",
                data: initialDialing,
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.4,
              },
              {
                label: "Answered",
                data: initialAnswered,
                borderColor: "rgb(251, 146, 60)",
                backgroundColor: "rgba(251, 146, 60, 0.1)",
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        })
      }
    }

    if (volumeChartRef.current) {
      const ctx = volumeChartRef.current.getContext("2d")
      if (ctx) {
        volumeChartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [
              {
                label: "Call Volume",
                data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 50)),
                backgroundColor: "rgb(59, 130, 246)",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        })
      }
    }

    const fetchData = () => {
      setStats((prev) => ({
        activeCalls: Math.floor(Math.random() * 10),
        callsPerSecond: Math.floor(Math.random() * 5),
        rejection: Math.floor(Math.random() * 3),
        connectionRate: Math.floor(Math.random() * 20) + 70,
        noAnswer: Math.floor(Math.random() * 20) + 10,
        currentProgress: Math.min(prev.currentProgress + 1, prev.totalProgress),
        totalProgress: prev.totalProgress,
      }))

      // Update charts
      if (callsChartInstance.current) {
        const chart = callsChartInstance.current
        const now = new Date()
        const newLabel = now.toLocaleTimeString("en-US", { hour12: false })
        const newDialing = Math.floor(Math.random() * 3) + 3
        const newAnswered = Math.floor(Math.random() * 2) + 2

        chart.data.labels?.push(newLabel)
        chart.data.datasets[0].data.push(newDialing)
        chart.data.datasets[1].data.push(newAnswered)

        // Keep only last 20 points
        if (chart.data.labels && chart.data.labels.length > 20) {
          chart.data.labels.shift()
          chart.data.datasets[0].data.shift()
          chart.data.datasets[1].data.shift()
        }

        chart.update("none")
      }

      if (volumeChartInstance.current) {
        volumeChartInstance.current.update("none")
      }
    }

    const interval = setInterval(fetchData, 1000)

    return () => {
      clearInterval(interval)
      if (callsChartInstance.current) {
        callsChartInstance.current.destroy()
        callsChartInstance.current = null
      }
      if (volumeChartInstance.current) {
        volumeChartInstance.current.destroy()
        volumeChartInstance.current = null
      }
    }
  }, [])

  return (
    <div className="h-screen bg-gray-50">
      <div className=" mx-auto p-6 space-y-6  h-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Voice Broadcast Dashboard</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-600">Live Status</span>
              <span className="text-sm font-medium text-blue-600">October 12, 2025</span>
            </div>
          </div>
          <Button
            onClick={() => router.push("/dashboard/campaigns")}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Back to Campaigns
          </Button>
        </div>

        <RealTimeActivity {...stats} />

        <SystemPerformance
          avgMessageDuration="00:00"
          callSuccessRate={0}
          callDropRate={0}
          callsPerSecond={0}
          avgAnswerTime="0s"
          activeChannels="0/0"
        />



        <div className="grid grid-cols-2 gap-6">
          <BroadcastStats
            totalCalls={0}
            processed={0}
            remaining={0}
            connected={0}
            voicemail={0}
            failed={0}
            completionRate={0}
          />
          <ResponseCollection totalResponses={0} responseRate={0} />
        </div>



        <SystemAlerts
          alerts={[
            {
              id: "1",
              title: "Low Response Rate",
              message: "Customer Feedback broadcast showing below average response collection rate.",
              type: "warning",
            },
            {
              id: "2",
              title: "Channel Utilization",
              message: "Approaching maximum channel capacity (25/35). Consider rescheduling non-critical broadcasts.",
              type: "warning",
            },
          ]}
        />

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Calls in Real-time</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-sm text-blue-600 font-medium">Live</span>
            </div>
          </div>
          <div className="h-96">
            <canvas ref={callsChartRef} />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Call Volume By Hour</h3>
          <div className="h-96">
            <canvas ref={volumeChartRef} />
          </div>
        </div>


      </div>
    </div>
  )
}
