// "use client"

// import { useEffect, useState } from "react"
// import { getUserFromStorage } from "@/lib/auth"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Phone, PhoneCall, PhoneIncoming, PhoneMissed, Clock, TrendingUp, Users, Star, Activity } from "lucide-react"

// export default function AgentDashboardPage() {
//   const [user, setUser] = useState<any>(null)

//   useEffect(() => {
//     const currentUser = getUserFromStorage()
//     setUser(currentUser)
//   }, [])

//   const callStats = [
//     { title: "Active Calls", value: "12", icon: PhoneCall, color: "text-green-600" },
//     { title: "Incoming Queue", value: "8", icon: PhoneIncoming, color: "text-blue-600" },
//     { title: "Missed Calls", value: "3", icon: PhoneMissed, color: "text-red-600" },
//     { title: "Avg Handle Time", value: "4.2m", icon: Clock, color: "text-purple-600" },
//   ]

//   const recentCalls = [
//     { customer: "John Smith", time: "2 min ago", duration: "5:23", status: "completed", rating: 5 },
//     { customer: "Sarah Johnson", time: "15 min ago", duration: "3:45", status: "completed", rating: 4 },
//     { customer: "Mike Wilson", time: "32 min ago", duration: "8:12", status: "completed", rating: 5 },
//     { customer: "Emma Davis", time: "1 hour ago", duration: "2:34", status: "missed", rating: 0 },
//   ]

//   return (
//     <div className="space-y-6 p-4">
//       {/* Header Section */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
//           <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
//         </div>
//         <Button className="bg-blue-600 hover:bg-blue-700">
//           <Phone className="mr-2 h-4 w-4" />
//           Start Call
//         </Button>
//       </div>

//       {/* Call Stats Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {callStats.map((stat, index) => {
//           const Icon = stat.icon
//           return (
//             <Card key={index} className="border border-gray-300">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//                 <Icon className={`h-4 w-4 ${stat.color}`} />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stat.value}</div>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid gap-4 lg:grid-cols-3">
//         {/* Recent Calls */}
//         <Card className="lg:col-span-2 border border-gray-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Phone className="h-5 w-5 text-blue-600" />
//               Recent Calls
//             </CardTitle>
//             <CardDescription>Your latest customer interactions</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {recentCalls.map((call, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
//                       {call.customer.charAt(0)}
//                     </div>
//                     <div>
//                       <p className="font-medium text-sm">{call.customer}</p>
//                       <p className="text-xs text-gray-600">{call.time}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="text-right">
//                       <p className="text-sm font-medium">{call.duration}</p>
//                       <p className="text-xs text-gray-600 capitalize">{call.status}</p>
//                     </div>
//                     {call.rating > 0 && (
//                       <div className="flex items-center gap-1">
//                         {[...Array(call.rating)].map((_, i) => (
//                           <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Performance Metrics */}
//         <Card className="border border-gray-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <TrendingUp className="h-5 w-5 text-blue-600" />
//               Performance
//             </CardTitle>
//             <CardDescription>Today's metrics</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {[
//                 { label: "Call Quality", value: 94 },
//                 { label: "Customer Satisfaction", value: 88 },
//                 { label: "First Call Resolution", value: 76 },
//               ].map((metric, i) => (
//                 <div key={i} className="space-y-2">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="font-medium">{metric.label}</span>
//                     <span className="text-gray-600">{metric.value}%</span>
//                   </div>
//                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-blue-600 rounded-full"
//                       style={{ width: `${metric.value}%` }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Bottom Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {/* Active Customers */}
//         <Card className="border border-gray-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Users className="h-5 w-5 text-blue-600" />
//               Active Customers
//             </CardTitle>
//             <CardDescription>Currently in queue</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {["Priority", "Standard", "Callback"].map((type, i) => (
//                 <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded">
//                   <span className="text-sm font-medium">{type}</span>
//                   <span className="text-lg font-bold text-blue-600">{Math.floor(Math.random() * 10) + 1}</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Quick Actions */}
//         <Card className="border border-gray-300">
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//             <CardDescription>Common tasks</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               {["Take Next Call", "Schedule Callback", "View Call History"].map((action, i) => (
//                 <Button key={i} variant="outline" className="w-full justify-start" size="sm">
//                   <Activity className="mr-2 h-4 w-4" />
//                   {action}
//                 </Button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Today's Summary */}
//         <Card className="border border-gray-300">
//           <CardHeader>
//             <CardTitle>Today's Summary</CardTitle>
//             <CardDescription>Your daily overview</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {[
//                 { label: "Total Calls", value: "47" },
//                 { label: "Talk Time", value: "3h 24m" },
//                 { label: "Avg Rating", value: "4.8/5" },
//               ].map((item, i) => (
//                 <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded">
//                   <span className="text-sm font-medium">{item.label}</span>
//                   <span className="text-sm font-bold">{item.value}</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }




"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgentProfile } from "./components/agent-profile"
import { OverviewTab } from "./components/overview-tab"
import { PerformanceTab } from "./components/performance-tab"
import { QueueTab } from "./components/queue-tab"
import { LiveDateTime } from "./components/live-date-time"

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-6">
      {/* <div className="mx-auto max-w-7xl space-y-6"> */}
              <div className="mx-12 space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Agent Dashboard</h1>
            <p className="text-sm text-muted-foreground">Monitor your performance and queue status</p>
          </div>
          <div className="flex items-center gap-2 bg-muted/40 px-3 py-1.5 rounded-lg border border-border">
            <LiveDateTime />
          </div>

        </div>

        <AgentProfile />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="queue">Queue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <PerformanceTab />
          </TabsContent>

          <TabsContent value="queue" className="space-y-4">
            <QueueTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
