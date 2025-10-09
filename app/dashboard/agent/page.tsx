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
//     { title: "Active Calls", value: "12", icon: PhoneCall, color: "text-green-500", bgColor: "bg-green-500/10" },
//     { title: "Incoming Queue", value: "8", icon: PhoneIncoming, color: "text-blue-500", bgColor: "bg-blue-500/10" },
//     { title: "Missed Calls", value: "3", icon: PhoneMissed, color: "text-red-500", bgColor: "bg-red-500/10" },
//     { title: "Avg Handle Time", value: "4.2m", icon: Clock, color: "text-purple-500", bgColor: "bg-purple-500/10" },
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
//           <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#1788cb] to-[#00b3f3] bg-clip-text text-transparent">
//             Agent Dashboard
//           </h1>
//           <p className="text-muted-foreground mt-2">Welcome back, {user?.name}! Ready to assist customers.</p>
//         </div>
//         <Button className="bg-gradient-to-r from-[#1788cb] to-[#00b3f3] hover:opacity-90">
//           <Phone className="mr-2 h-4 w-4" />
//           Start Call
//         </Button>
//       </div>

//       {/* Call Stats Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {callStats.map((stat, index) => {
//           const Icon = stat.icon
//           return (
//             <Card
//               key={index}
//               className="relative overflow-hidden backdrop-blur-sm bg-card/95 border-border dark:border-border/80 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(23,136,203,0.2)] transition-all duration-300 hover:-translate-y-1"
//             >
//               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#1788cb]/20 to-[#00b3f3]/20 rounded-full blur-2xl -mr-12 -mt-12" />
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//                 <div className={`p-2 rounded-lg ${stat.bgColor}`}>
//                   <Icon className={`h-4 w-4 ${stat.color}`} />
//                 </div>
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
//         {/* Recent Calls - Takes 2 columns */}
//         <Card className="lg:col-span-2 backdrop-blur-sm bg-card/95 border-border dark:border-border/80 dark:shadow-[0_0_30px_rgba(23,136,203,0.1)]">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Phone className="h-5 w-5 text-[#1788cb]" />
//               Recent Calls
//             </CardTitle>
//             <CardDescription>Your latest customer interactions</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {recentCalls.map((call, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 transition-all"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1788cb] to-[#00b3f3] flex items-center justify-center text-white font-semibold">
//                       {call.customer.charAt(0)}
//                     </div>
//                     <div>
//                       <p className="font-medium">{call.customer}</p>
//                       <p className="text-xs text-muted-foreground">{call.time}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <div className="text-right">
//                       <p className="text-sm font-medium">{call.duration}</p>
//                       <p className="text-xs text-muted-foreground capitalize">{call.status}</p>
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
//         <Card className="backdrop-blur-sm bg-card/95 border-border dark:border-border/80 dark:shadow-[0_0_30px_rgba(23,136,203,0.1)]">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <TrendingUp className="h-5 w-5 text-[#1788cb]" />
//               Performance
//             </CardTitle>
//             <CardDescription>Today's metrics</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {[
//                 { label: "Call Quality", value: 94, color: "from-green-500 to-emerald-500" },
//                 { label: "Customer Satisfaction", value: 88, color: "from-[#1788cb] to-[#00b3f3]" },
//                 { label: "First Call Resolution", value: 76, color: "from-purple-500 to-pink-500" },
//               ].map((metric, i) => (
//                 <div key={i} className="space-y-2">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="font-medium">{metric.label}</span>
//                     <span className="text-muted-foreground">{metric.value}%</span>
//                   </div>
//                   <div className="h-2 bg-muted rounded-full overflow-hidden">
//                     <div
//                       className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-500`}
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
//         <Card className="backdrop-blur-sm bg-card/95 border-border dark:border-border/80 dark:shadow-[0_0_30px_rgba(23,136,203,0.1)]">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Users className="h-5 w-5 text-[#1788cb]" />
//               Active Customers
//             </CardTitle>
//             <CardDescription>Currently in queue</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {["Priority", "Standard", "Callback"].map((type, i) => (
//                 <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
//                   <span className="text-sm font-medium">{type}</span>
//                   <span className="text-lg font-bold text-[#1788cb]">{Math.floor(Math.random() * 10) + 1}</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Quick Actions */}
//         <Card className="backdrop-blur-sm bg-card/95 border-border dark:border-border/80 dark:shadow-[0_0_30px_rgba(23,136,203,0.1)]">
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//             <CardDescription>Common tasks</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               {["Take Next Call", "Schedule Callback", "View Call History"].map((action, i) => (
//                 <Button key={i} variant="outline" className="w-full justify-start bg-transparent" size="sm">
//                   <Activity className="mr-2 h-4 w-4" />
//                   {action}
//                 </Button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Today's Summary */}
//         <Card className="backdrop-blur-sm bg-card/95 border-border dark:border-border/80 dark:shadow-[0_0_30px_rgba(23,136,203,0.1)]">
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
//                 <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
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

import { useEffect, useState } from "react"
import { getUserFromStorage } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, PhoneCall, PhoneIncoming, PhoneMissed, Clock, TrendingUp, Users, Star, Activity } from "lucide-react"

export default function AgentDashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getUserFromStorage()
    setUser(currentUser)
  }, [])

  const callStats = [
    { title: "Active Calls", value: "12", icon: PhoneCall, color: "text-green-600" },
    { title: "Incoming Queue", value: "8", icon: PhoneIncoming, color: "text-blue-600" },
    { title: "Missed Calls", value: "3", icon: PhoneMissed, color: "text-red-600" },
    { title: "Avg Handle Time", value: "4.2m", icon: Clock, color: "text-purple-600" },
  ]

  const recentCalls = [
    { customer: "John Smith", time: "2 min ago", duration: "5:23", status: "completed", rating: 5 },
    { customer: "Sarah Johnson", time: "15 min ago", duration: "3:45", status: "completed", rating: 4 },
    { customer: "Mike Wilson", time: "32 min ago", duration: "8:12", status: "completed", rating: 5 },
    { customer: "Emma Davis", time: "1 hour ago", duration: "2:34", status: "missed", rating: 0 },
  ]

  return (
    <div className="space-y-6 p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Phone className="mr-2 h-4 w-4" />
          Start Call
        </Button>
      </div>

      {/* Call Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {callStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border border-gray-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Calls */}
        <Card className="lg:col-span-2 border border-gray-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              Recent Calls
            </CardTitle>
            <CardDescription>Your latest customer interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCalls.map((call, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                      {call.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{call.customer}</p>
                      <p className="text-xs text-gray-600">{call.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{call.duration}</p>
                      <p className="text-xs text-gray-600 capitalize">{call.status}</p>
                    </div>
                    {call.rating > 0 && (
                      <div className="flex items-center gap-1">
                        {[...Array(call.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Performance
            </CardTitle>
            <CardDescription>Today's metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Call Quality", value: 94 },
                { label: "Customer Satisfaction", value: 88 },
                { label: "First Call Resolution", value: 76 },
              ].map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{metric.label}</span>
                    <span className="text-gray-600">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Active Customers */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Active Customers
            </CardTitle>
            <CardDescription>Currently in queue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["Priority", "Standard", "Callback"].map((type, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <span className="text-sm font-medium">{type}</span>
                  <span className="text-lg font-bold text-blue-600">{Math.floor(Math.random() * 10) + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["Take Next Call", "Schedule Callback", "View Call History"].map((action, i) => (
                <Button key={i} variant="outline" className="w-full justify-start" size="sm">
                  <Activity className="mr-2 h-4 w-4" />
                  {action}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
            <CardDescription>Your daily overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Total Calls", value: "47" },
                { label: "Talk Time", value: "3h 24m" },
                { label: "Avg Rating", value: "4.8/5" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}