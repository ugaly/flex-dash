"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Users, Phone, BarChart3, AlertCircle } from "lucide-react"

interface AgentActivity {
  onCall: number
  notReady: number
  wrapUp: number
  ready: number
}

interface ActiveCalls {
  ivr: number
  outgoing: number
  waiting: number
  receivedCalls: number
}

interface AllCalls {
  incomingCalls: number
  outboundCalls: number
  answered: number
  abandoned: number
}

interface Agent {
  first_name: string
  surname_name: string
  extension: string
  calls: string
  answered: string
}

interface CallHour {
  time: string
  calls: string
}

interface DashboardData {
  agent_activity: AgentActivity
  active_calls: ActiveCalls
  all_calls: AllCalls
  active_agents: Agent[]
  avg_wait_time: string
  avg_call_time: string
  avg_abandon_time: string
  longest_wait_time: string
  predicted_wait_time: string
  call_this_hour: CallHour[]
  date: string
}

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateDummyData = (): DashboardData => {
  const now = new Date()
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0")
    return {
      time: `${hour}:00`,
      calls: generateRandomNumber(10, 150).toString(),
    }
  })

  const agents = [
    { first_name: "Sarah", surname_name: "Johnson", extension: "1001", calls: "15", answered: "14" },
    { first_name: "Michael", surname_name: "Chen", extension: "1002", calls: "12", answered: "11" },
    { first_name: "Emily", surname_name: "Rodriguez", extension: "1003", calls: "18", answered: "17" },
    { first_name: "David", surname_name: "Kim", extension: "1004", calls: "10", answered: "9" },
    { first_name: "Jessica", surname_name: "Williams", extension: "1005", calls: "14", answered: "13" },
  ]

  return {
    agent_activity: {
      onCall: generateRandomNumber(2, 8),
      notReady: generateRandomNumber(0, 3),
      wrapUp: generateRandomNumber(1, 4),
      ready: generateRandomNumber(3, 10),
    },
    active_calls: {
      ivr: generateRandomNumber(5, 20),
      outgoing: generateRandomNumber(2, 10),
      waiting: generateRandomNumber(0, 8),
      receivedCalls: generateRandomNumber(10, 30),
    },
    all_calls: {
      incomingCalls: generateRandomNumber(100, 500),
      outboundCalls: generateRandomNumber(50, 200),
      answered: generateRandomNumber(200, 600),
      abandoned: generateRandomNumber(10, 50),
    },
    active_agents: agents,
    avg_wait_time: `00:${generateRandomNumber(10, 59).toString().padStart(2, "0")}`,
    avg_call_time: `0${generateRandomNumber(3, 9)}:${generateRandomNumber(10, 59).toString().padStart(2, "0")}`,
    avg_abandon_time: `00:${generateRandomNumber(5, 30).toString().padStart(2, "0")}`,
    longest_wait_time: `0${generateRandomNumber(1, 5)}:${generateRandomNumber(10, 59).toString().padStart(2, "0")}`,
    predicted_wait_time: `00:${generateRandomNumber(15, 45).toString().padStart(2, "0")}`,
    call_this_hour: hours,
    date: now.toLocaleString(),
  }
}

export default function ContactCenterPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const callsChartRef = useRef<HTMLCanvasElement>(null)
  const hourlyChartRef = useRef<HTMLCanvasElement>(null)
  const callsChartInstance = useRef<any>(null)
  const hourlyChartInstance = useRef<any>(null)

  useEffect(() => {
    // Load Chart.js dynamically
    const loadChartJS = async () => {
      const Chart = (await import("chart.js/auto")).default

      // Initialize real-time calls chart
      if (callsChartRef.current && !callsChartInstance.current) {
        const ctx = callsChartRef.current.getContext("2d")
        if (ctx) {
          callsChartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
              labels: [],
              datasets: [
                {
                  label: "IVR Calls",
                  data: [],
                  borderColor: "#4287f5",
                  backgroundColor: "rgba(66, 135, 245, 0.1)",
                  tension: 0.4,
                  fill: false,
                },
                {
                  label: "Outgoing Calls",
                  data: [],
                  borderColor: "#f5a742",
                  backgroundColor: "rgba(245, 167, 66, 0.1)",
                  tension: 0.4,
                  fill: false,
                },
                {
                  label: "Waiting Calls",
                  data: [],
                  borderColor: "#f54242",
                  backgroundColor: "rgba(245, 66, 66, 0.1)",
                  tension: 0.4,
                  fill: false,
                },
                {
                  label: "Answered Calls",
                  data: [],
                  borderColor: "#42f56f",
                  backgroundColor: "rgba(66, 245, 111, 0.1)",
                  tension: 0.4,
                  fill: false,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                tooltip: {
                  mode: "index",
                  intersect: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  stacked: false,
                },
              },
            },
          })
        }
      }

      // Initialize hourly chart
      if (hourlyChartRef.current && !hourlyChartInstance.current) {
        const ctx = hourlyChartRef.current.getContext("2d")
        if (ctx) {
          hourlyChartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
              labels: [],
              datasets: [
                {
                  label: "Calls per Hour",
                  data: [],
                  backgroundColor: "rgba(0, 123, 255, 0.7)",
                  borderWidth: 0,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          })
        }
      }
    }

    loadChartJS()

    return () => {
      if (callsChartInstance.current) {
        callsChartInstance.current.destroy()
      }
      if (hourlyChartInstance.current) {
        hourlyChartInstance.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    const fetchData = () => {
      const newData = generateDummyData()
      setData(newData)
      updateCharts(newData)
    }

    fetchData()
    const interval = setInterval(fetchData, 1000) // Changed from 3000 to 1000ms
    return () => clearInterval(interval)
  }, [])

  const updateCharts = (newData: DashboardData) => {
    if (callsChartInstance.current && newData.active_calls) {
      const now = new Date()
      const timeLabel = `${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`

      callsChartInstance.current.data.labels.push(timeLabel)
      callsChartInstance.current.data.datasets[0].data.push(newData.active_calls.ivr)
      callsChartInstance.current.data.datasets[1].data.push(newData.active_calls.outgoing)
      callsChartInstance.current.data.datasets[2].data.push(newData.active_calls.waiting)
      callsChartInstance.current.data.datasets[3].data.push(newData.active_calls.receivedCalls)

      if (callsChartInstance.current.data.labels.length > 20) {
        callsChartInstance.current.data.labels.shift()
        callsChartInstance.current.data.datasets.forEach((dataset: any) => {
          dataset.data.shift()
        })
      }

      callsChartInstance.current.update()
    }

    if (hourlyChartInstance.current && newData.call_this_hour) {
      hourlyChartInstance.current.data.labels = newData.call_this_hour.map((item) => item.time)
      hourlyChartInstance.current.data.datasets[0].data = newData.call_this_hour.map((item) =>
        Number.parseInt(item.calls),
      )
      hourlyChartInstance.current.update()
    }
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-muted-foreground">Loading dashboard...</div>
      </div>
    )
  }

  const totalActive =
    data.active_calls.ivr + data.active_calls.outgoing + data.active_calls.waiting + data.active_calls.receivedCalls
  const totalCalls =
    Number.parseInt(data.all_calls.answered.toString()) + Number.parseInt(data.all_calls.abandoned.toString())
  const answeringRate =
    totalCalls > 0 ? Math.round((Number.parseInt(data.all_calls.answered.toString()) / totalCalls) * 100) : 0
  const abandonRate =
    totalCalls > 0 ? Math.round((Number.parseInt(data.all_calls.abandoned.toString()) / totalCalls) * 100) : 0

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-foreground">Contact Center Dashboard</h1>
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>
              Updated at: <span className="font-semibold text-primary">{data.date}</span>
            </span>
          </div>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {/* Agent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Agent Activity
              </CardTitle>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Last Hour
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex flex-col items-center flex-1 bg-gray-50 rounded-md p-2">
                  <div className="text-2xl font-bold text-blue-600">{data.agent_activity.onCall}</div>
                  <div className="text-xs text-muted-foreground">Talking</div>
                </div>
                <div className="flex flex-col items-center flex-1 bg-gray-50 rounded-md p-2 mx-2">
                  <div className="text-2xl font-bold text-red-600">{data.agent_activity.notReady}</div>
                  <div className="text-xs text-muted-foreground">Not Ready</div>
                </div>
                <div className="flex flex-col items-center flex-1 bg-gray-50 rounded-md p-2">
                  <div className="text-2xl font-bold text-amber-600">{data.agent_activity.wrapUp}</div>
                  <div className="text-xs text-muted-foreground">Wrap Up</div>
                </div>
                <div className="flex flex-col items-center flex-1 bg-gray-50 rounded-md p-2 ml-2">
                  <div className="text-2xl font-bold text-green-600">{data.agent_activity.ready}</div>
                  <div className="text-xs text-muted-foreground">Ready</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-700">Total Available</div>
                <div className="text-xl font-bold text-blue-700">{data.agent_activity.ready}</div>
              </div>
            </CardContent>
          </Card>

          {/* Active Calls */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between  border-b border-border/50">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Active Calls
              </CardTitle>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Real-time
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex flex-col items-center flex-1 bg-gray-50 rounded-md p-2">
                  <div className="text-2xl font-bold text-green-600">{data.active_calls.ivr}</div>
                  <div className="text-xs text-muted-foreground">IVR</div>
                </div>
                <div className="flex flex-col items-center flex-1 bg-gray-50 rounded-md p-2 mx-2">
                  <div className="text-2xl font-bold text-green-600">{data.active_calls.outgoing}</div>
                  <div className="text-xs text-muted-foreground">Outgoing</div>
                </div>
                <div className="flex flex-col items-center flex-1 bg-gray-50 rounded-md p-2 mx-2">
                  <div className="text-2xl font-bold text-amber-600">{data.active_calls.waiting}</div>
                  <div className="text-xs text-muted-foreground">Waiting</div>
                </div>
                <div className="flex flex-col items-center flex-1 bg-gray-50 rounded-md p-2 ml-2">
                  <div className="text-2xl font-bold text-green-600">{data.active_calls.receivedCalls}</div>
                  <div className="text-xs text-muted-foreground">Answered</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-700">Total Active</div>
                <div className="text-xl font-bold text-blue-700">{totalActive}</div>
              </div>
            </CardContent>
          </Card>

          {/* Call Statistics */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between  border-b border-border/50">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Call Statistics
              </CardTitle>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Today
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex flex-col items-center flex-1 bg-gray-50 rounded-md p-2">
                  <div className="text-2xl font-bold text-amber-600">{data.all_calls.incomingCalls}</div>
                  <div className="text-xs text-muted-foreground">IVR</div>
                </div>
                <div className="flex flex-col items-center flex-1 bg-gray-50 rounded-md p-2 mx-2">
                  <div className="text-2xl font-bold text-green-600">{data.all_calls.outboundCalls}</div>
                  <div className="text-xs text-muted-foreground">Outgoing</div>
                </div>
                <div className="flex flex-col items-center flex-1 bg-gray-50 rounded-md p-2 mx-2">
                  <div className="text-2xl font-bold text-red-600">{data.all_calls.abandoned}</div>
                  <div className="text-xs text-muted-foreground">Unattended</div>
                </div>
                <div className="flex flex-col items-center flex-1 bg-gray-50 rounded-md p-2 ml-2">
                  <div className="text-2xl font-bold text-green-600">{data.all_calls.answered}</div>
                  <div className="text-xs text-muted-foreground">Answered</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-700">Answering Rate</div>
                <div className="text-xl font-bold text-blue-700">{answeringRate}%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-5">
          <CardHeader className="flex flex-row items-center justify-between  border-b border-border/50">
            <CardTitle className="text-base font-semibold">Calls in Real-time</CardTitle>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Live
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <canvas ref={callsChartRef} />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">SLA Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-md p-3 text-center">
                  <div className="text-xl font-bold text-green-600">{answeringRate}%</div>
                  <div className="text-xs text-muted-foreground">Within SLA</div>
                </div>
                <div className="bg-slate-50 rounded-md p-3 text-center">
                  <div className="text-xl font-bold text-foreground">{data.avg_wait_time}</div>
                  <div className="text-xs text-muted-foreground">Avg. Wait Time</div>
                </div>
                <div className="bg-slate-50 rounded-md p-3 text-center">
                  <div className="text-xl font-bold text-foreground">{data.avg_call_time}</div>
                  <div className="text-xs text-muted-foreground">Avg. Call Time</div>
                </div>
                <div className="bg-slate-50 rounded-md p-3 text-center">
                  <div className="text-xl font-bold text-red-600">{abandonRate}%</div>
                  <div className="text-xs text-muted-foreground">Abandoned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Queue Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Queue Status</CardTitle>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Real-time
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-md p-3 text-center">
                  <div className="text-xl font-bold text-foreground">{data.active_calls.waiting}</div>
                  <div className="text-xs text-muted-foreground">In Queue</div>
                </div>
                <div className="bg-slate-50 rounded-md p-3 text-center">
                  <div className="text-xl font-bold text-foreground">{data.longest_wait_time}</div>
                  <div className="text-xs text-muted-foreground">Longest Wait</div>
                </div>
                <div className="bg-slate-50 rounded-md p-3 text-center">
                  <div className="text-xl font-bold text-green-600">{data.agent_activity.ready}</div>
                  <div className="text-xs text-muted-foreground">Agents Available</div>
                </div>
                <div className="bg-slate-50 rounded-md p-3 text-center">
                  <div className="text-xl font-bold text-amber-600">{data.predicted_wait_time}</div>
                  <div className="text-xs text-muted-foreground">Predicted Wait</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.agent_activity.ready === 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No Agents Available</AlertTitle>
                  <AlertDescription>Currently there are 0 agents available to take calls.</AlertDescription>
                </Alert>
              )}
              {data.active_calls.waiting > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Calls Waiting</AlertTitle>
                  <AlertDescription>There are {data.active_calls.waiting} calls waiting in the queue.</AlertDescription>
                </Alert>
              )}
              {data.agent_activity.ready > 0 && data.active_calls.waiting === 0 && (
                <Alert className="bg-green-50 border-green-500">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600">All Systems Normal</AlertTitle>
                  <AlertDescription>No issues detected in the contact center operations.</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Top Performing Agents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Top Performing Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {data.active_agents && data.active_agents.length > 0 ? (
                  data.active_agents.map((agent, index) => {
                    const answerRate =
                      Number.parseInt(agent.calls) > 0
                        ? Math.round((Number.parseInt(agent.answered) / Number.parseInt(agent.calls)) * 100)
                        : 0
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                        <div className="flex-1 font-medium">
                          {agent.first_name} {agent.surname_name}
                        </div>
                        <div className="text-sm text-muted-foreground">{agent.calls} calls</div>
                        <div className="text-sm text-muted-foreground">{answerRate}% CSAT</div>
                      </div>
                    )
                  })
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                      <div className="flex-1 font-medium">Sarah Johnson</div>
                      <div className="text-sm text-muted-foreground">15 calls</div>
                      <div className="text-sm text-muted-foreground">98% CSAT</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                      <div className="flex-1 font-medium">Michael Chen</div>
                      <div className="text-sm text-muted-foreground">12 calls</div>
                      <div className="text-sm text-muted-foreground">96% CSAT</div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Call Volume By Hour */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Call Volume By Hour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <canvas ref={hourlyChartRef} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}





