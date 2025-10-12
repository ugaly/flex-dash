// "use client"

// import { useEffect, useState } from "react"
// import { getUserFromStorage } from "@/lib/auth"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import {
//   BarChart3,
//   Users,
//   Activity,
//   Database,
//   DollarSign,
//   Shield,
//   Server,
//   AlertCircle,
//   CheckCircle,
//   Clock,
// } from "lucide-react"

// export default function AdminDashboardPage() {
//   const [user, setUser] = useState<any>(null)

//   useEffect(() => {
//     const currentUser = getUserFromStorage()
//     setUser(currentUser)
//   }, [])

//   const systemStats = [
//     { title: "Total Users", value: "2,543", change: "+18%", icon: Users, gradient: "from-blue-500 to-cyan-500" },
//     {
//       title: "System Uptime",
//       value: "99.9%",
//       change: "+0.2%",
//       icon: Activity,
//       gradient: "from-green-500 to-emerald-500",
//     },
//     { title: "Revenue", value: "$124K", change: "+22%", icon: DollarSign, gradient: "from-purple-500 to-pink-500" },
//     { title: "Database Size", value: "45.2GB", change: "+15%", icon: Database, gradient: "from-orange-500 to-red-500" },
//   ]

//   const systemHealth = [
//     { name: "API Server", status: "operational", uptime: "99.98%", icon: Server },
//     { name: "Database", status: "operational", uptime: "99.95%", icon: Database },
//     { name: "Cache Layer", status: "operational", uptime: "100%", icon: Activity },
//     { name: "Auth Service", status: "operational", uptime: "99.99%", icon: Shield },
//   ]

//   const recentActivities = [
//     { action: "New user registered", user: "john.doe@example.com", time: "2 min ago", type: "user" },
//     { action: "System backup completed", user: "System", time: "15 min ago", type: "system" },
//     { action: "Security scan passed", user: "Security Bot", time: "1 hour ago", type: "security" },
//     { action: "Database optimized", user: "Admin", time: "2 hours ago", type: "database" },
//   ]

//   return (
//     <div className="space-y-6 p-4">
//       {/* Header Section */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-[#1788cb] to-[#00b3f3] bg-clip-text text-transparent">
//             Administrator Dashboard
//           </h1>
//           <p className="text-muted-foreground mt-2">Welcome back, {user?.name}! System overview and controls.</p>
//         </div>
//         <Button className="bg-gradient-to-r from-purple-600 to-[#1788cb] hover:opacity-90">
//           <Shield className="mr-2 h-4 w-4" />
//           System Settings
//         </Button>
//       </div>

//       {/* System Stats Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {systemStats.map((stat, index) => {
//           const Icon = stat.icon
//           return (
//             <Card
//               key={index}
//               className="relative overflow-hidden backdrop-blur-sm bg-card/95 border-border dark:border-border/80 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)] transition-all duration-300 hover:-translate-y-1 group"
//             >
//               <div
//                 className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
//               />
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -mr-16 -mt-16" />
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//                 <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} bg-opacity-10`}>
//                   <Icon className="h-4 w-4 text-white" />
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stat.value}</div>
//                 <p className={`text-xs mt-1 ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
//                   {stat.change} from last month
//                 </p>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid gap-4 lg:grid-cols-3">
//         {/* System Health - Takes 2 columns */}
//         <Card className="lg:col-span-2 backdrop-blur-sm bg-card/95 border-border dark:border-border/80 dark:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Activity className="h-5 w-5 text-green-500" />
//               System Health
//             </CardTitle>
//             <CardDescription>Real-time service status monitoring</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {systemHealth.map((service, i) => {
//                 const Icon = service.icon
//                 return (
//                   <div
//                     key={i}
//                     className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 transition-all"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
//                         <Icon className="h-5 w-5 text-white" />
//                       </div>
//                       <div>
//                         <p className="font-medium">{service.name}</p>
//                         <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <CheckCircle className="h-5 w-5 text-green-500" />
//                       <span className="text-sm font-medium text-green-500 capitalize">{service.status}</span>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Quick Stats */}
//         <Card className="backdrop-blur-sm bg-card/95 border-border dark:border-border/80 dark:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <BarChart3 className="h-5 w-5 text-[#1788cb]" />
//               Analytics
//             </CardTitle>
//             <CardDescription>Key performance indicators</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {[
//                 { label: "User Growth", value: 92, color: "from-blue-500 to-cyan-500" },
//                 { label: "System Performance", value: 98, color: "from-green-500 to-emerald-500" },
//                 { label: "Security Score", value: 95, color: "from-purple-500 to-pink-500" },
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
//         {/* Recent Activities */}
//         <Card className="lg:col-span-2 backdrop-blur-sm bg-card/95 border-border dark:border-border/80 dark:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Clock className="h-5 w-5 text-[#1788cb]" />
//               Recent Activities
//             </CardTitle>
//             <CardDescription>Latest system events and actions</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {recentActivities.map((activity, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
//                 >
//                   <div
//                     className={`h-2 w-2 rounded-full ${activity.type === "security" ? "bg-green-500" : "bg-[#1788cb]"} animate-pulse`}
//                   />
//                   <div className="flex-1">
//                     <p className="text-sm font-medium">{activity.action}</p>
//                     <p className="text-xs text-muted-foreground">{activity.user}</p>
//                   </div>
//                   <span className="text-xs text-muted-foreground">{activity.time}</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* System Alerts */}
//         <Card className="backdrop-blur-sm bg-card/95 border-border dark:border-border/80 dark:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <AlertCircle className="h-5 w-5 text-yellow-500" />
//               Alerts
//             </CardTitle>
//             <CardDescription>System notifications</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
//                 <p className="text-sm font-medium text-green-600 dark:text-green-400">All systems operational</p>
//                 <p className="text-xs text-muted-foreground mt-1">No critical alerts</p>
//               </div>
//               <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
//                 <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Scheduled maintenance</p>
//                 <p className="text-xs text-muted-foreground mt-1">Tomorrow at 2:00 AM</p>
//               </div>
//               <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
//                 <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Update available</p>
//                 <p className="text-xs text-muted-foreground mt-1">Version 2.1.0 ready</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }









// "use client"

// import { useEffect, useState } from "react"
// import { getUserFromStorage } from "@/lib/auth"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import {
//   BarChart3,
//   Users,
//   Activity,
//   Database,
//   DollarSign,
//   Shield,
//   Server,
//   AlertCircle,
//   CheckCircle,
//   Clock,
// } from "lucide-react"

// export default function AdminDashboardPage() {
//   const [user, setUser] = useState<any>(null)

//   useEffect(() => {
//     const currentUser = getUserFromStorage()
//     setUser(currentUser)
//   }, [])

//   const systemStats = [
//     { title: "Total Users", value: "2,543", change: "+18%", icon: Users },
//     { title: "System Uptime", value: "99.9%", change: "+0.2%", icon: Activity },
//     { title: "Revenue", value: "$124K", change: "+22%", icon: DollarSign },
//     { title: "Database Size", value: "45.2GB", change: "+15%", icon: Database },
//   ]

//   const systemHealth = [
//     { name: "API Server", status: "operational", uptime: "99.98%", icon: Server },
//     { name: "Database", status: "operational", uptime: "99.95%", icon: Database },
//     { name: "Cache Layer", status: "operational", uptime: "100%", icon: Activity },
//     { name: "Auth Service", status: "operational", uptime: "99.99%", icon: Shield },
//   ]

//   const recentActivities = [
//     { action: "New user registered", user: "john.doe@example.com", time: "2 min ago", type: "user" },
//     { action: "System backup completed", user: "System", time: "15 min ago", type: "system" },
//     { action: "Security scan passed", user: "Security Bot", time: "1 hour ago", type: "security" },
//     { action: "Database optimized", user: "Admin", time: "2 hours ago", type: "database" },
//   ]

//   return (
//     // <div className="space-y-6 p-4">
//     <div className="h-full m-0 p-0">

//       {/* Header Section
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Administrator Dashboard</h1>
//           <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
//         </div>
//         <Button className="bg-blue-600 hover:bg-blue-700">
//           <Shield className="mr-2 h-4 w-4" />
//           System Settings
//         </Button>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {systemStats.map((stat, index) => {
//           const Icon = stat.icon
//           return (
//             <Card key={index} className="border border-gray-300">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//                 <Icon className="h-4 w-4 text-blue-600" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stat.value}</div>
//                 <p className={`text-xs mt-1 ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
//                   {stat.change} from last month
//                 </p>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>

//       <div className="grid gap-4 lg:grid-cols-3">
//         <Card className="lg:col-span-2 border border-gray-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Activity className="h-5 w-5 text-green-600" />
//               System Health
//             </CardTitle>
//             <CardDescription>Real-time service status monitoring</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {systemHealth.map((service, i) => {
//                 const Icon = service.icon
//                 return (
//                   <div
//                     key={i}
//                     className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="h-8 w-8 rounded bg-green-600 flex items-center justify-center">
//                         <Icon className="h-4 w-4 text-white" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-sm">{service.name}</p>
//                         <p className="text-xs text-gray-600">Uptime: {service.uptime}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <CheckCircle className="h-4 w-4 text-green-600" />
//                       <span className="text-sm font-medium text-green-600 capitalize">{service.status}</span>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border border-gray-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <BarChart3 className="h-5 w-5 text-blue-600" />
//               Analytics
//             </CardTitle>
//             <CardDescription>Key performance indicators</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {[
//                 { label: "User Growth", value: 92 },
//                 { label: "System Performance", value: 98 },
//                 { label: "Security Score", value: 95 },
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

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <Card className="lg:col-span-2 border border-gray-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Clock className="h-5 w-5 text-blue-600" />
//               Recent Activities
//             </CardTitle>
//             <CardDescription>Latest system events and actions</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {recentActivities.map((activity, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-3 p-3 border border-gray-200 rounded hover:bg-gray-50"
//                 >
//                   <div className={`h-2 w-2 rounded-full ${activity.type === "security" ? "bg-green-600" : "bg-blue-600"}`} />
//                   <div className="flex-1">
//                     <p className="text-sm font-medium">{activity.action}</p>
//                     <p className="text-xs text-gray-600">{activity.user}</p>
//                   </div>
//                   <span className="text-xs text-gray-600">{activity.time}</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border border-gray-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <AlertCircle className="h-5 w-5 text-yellow-600" />
//               Alerts
//             </CardTitle>
//             <CardDescription>System notifications</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               <div className="p-3 border border-green-200 rounded bg-green-50">
//                 <p className="text-sm font-medium text-green-800">All systems operational</p>
//                 <p className="text-xs text-green-600 mt-1">No critical alerts</p>
//               </div>
//               <div className="p-3 border border-yellow-200 rounded bg-yellow-50">
//                 <p className="text-sm font-medium text-yellow-800">Scheduled maintenance</p>
//                 <p className="text-xs text-yellow-600 mt-1">Tomorrow at 2:00 AM</p>
//               </div>
//               <div className="p-3 border border-blue-200 rounded bg-blue-50">
//                 <p className="text-sm font-medium text-blue-800">Update available</p>
//                 <p className="text-xs text-blue-600 mt-1">Version 2.1.0 ready</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div> */}




//       <div className="h-full  overflow-hidden border border-border/50 ">
//         <iframe
//           src="https://cc.flex.co.tz/admindash"
//           className="w-full h-full"
//           title="Call Center"
//           sandbox="
//           allow-same-origin
//           allow-scripts
//           allow-popups
//           allow-forms
//           allow-modals
//           allow-downloads
//           allow-presentation
//           allow-top-navigation
//           allow-popups-to-escape-sandbox
//           "
//         />
//       </div>



//     </div>
//   )
// }









"use client"

import type React from "react"

import { useState, useEffect } from "react"

export default function ManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const navItems = document.querySelectorAll(".imported-nav-item")
    const query = searchQuery.toLowerCase().trim()

    navItems.forEach((item) => {
      if (query === "") {
        ;(item as HTMLElement).style.display = ""
        return
      }

      const title = item.querySelector(".imported-nav-title")?.textContent?.toLowerCase() || ""
      const description = item.querySelector(".imported-nav-item p")?.textContent?.toLowerCase() || ""

      if (title.includes(query) || description.includes(query)) {
        ;(item as HTMLElement).style.display = ""
      } else {
        ;(item as HTMLElement).style.display = "none"
      }
    })
  }, [searchQuery])

  const handleSearch = () => {
    // Search is handled by useEffect
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="imported-body">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="imported-container">
        <header className="imported-header">
          <h2 className="imported-h2 font-bold">Management Console</h2>
        </header>

        <div className="imported-search-bar">
          <input
            type="text"
            placeholder="Search for functions or settings..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={handleKeyUp}
            className="imported-search-input"
          />
          <button type="button" onClick={handleSearch} className="imported-search-button">
            <i className="fas fa-search"></i> Search
          </button>
        </div>

        <div className="imported-nav-grid">
          <a className="imported-nav-item" href="https://cc.flex.co.tz/admin/stats">
            <div className="imported-nav-icon">
              <i className="fa fa-line-chart"></i>
            </div>
            <div className="imported-nav-title">Call Statistics</div>
            <p>View comprehensive call analytics and performance metrics for the system.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/admin/flex-charts">
            <div className="imported-nav-icon">
              <i className="fa fa-bar-chart"></i>
            </div>
            <div className="imported-nav-title">Flex Charts</div>
            <p>Access customizable data visualization tools for contact center metrics and analytics.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/agents">
            <div className="imported-nav-icon">
              <i className="fa fa-users"></i>
            </div>
            <div className="imported-nav-title">Agents</div>
            <p>Manage contact center agents, including profile settings, extensions, and performance tracking.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/reports">
            <div className="imported-nav-icon">
              <i className="fa fa-file-pdf"></i>
            </div>
            <div className="imported-nav-title">Reports</div>
            <p>Generate and export detailed reports on contact center activities and performance.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/cdr/all">
            <div className="imported-nav-icon">
              <i className="fa fa-phone"></i>
            </div>
            <div className="imported-nav-title">CDR</div>
            <p>Access Call Detail Records for reviewing and searching call history information.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/broadcasts">
            <div className="imported-nav-icon">
              <i className="fa fa-bullhorn"></i>
            </div>
            <div className="imported-nav-title">Call Campaigns</div>
            <p>Create and manage outbound call campaigns and broadcasting initiatives.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings">
            <div className="imported-nav-icon">
              <i className="fa fa-cogs"></i>
            </div>
            <div className="imported-nav-title">Settings</div>
            <p>Configure general system settings and preferences for the platform.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/roles">
            <div className="imported-nav-icon">
              <i className="fa fa-key"></i>
            </div>
            <div className="imported-nav-title">Role / Permissions</div>
            <p>Manage user roles and assign granular permissions for system access control.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/ivrs">
            <div className="imported-nav-icon">
              <i className="fa fa-volume-up"></i>
            </div>
            <div className="imported-nav-title">IVR</div>
            <p>Configure Interactive Voice Response menus and call flow structures.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings">
            <div className="imported-nav-icon">
              <i className="fa fa-users"></i>
            </div>
            <div className="imported-nav-title">Users</div>
            <p>Manage system users, including account creation, permissions, and profile settings.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/queues">
            <div className="imported-nav-icon">
              <i className="fa fa-list-ul"></i>
            </div>
            <div className="imported-nav-title">Queue</div>
            <p>Configure and manage call queues for efficient call distribution and handling.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/configs">
            <div className="imported-nav-icon">
              <i className="fa fa-cog"></i>
            </div>
            <div className="imported-nav-title">Configurations</div>
            <p>Access advanced system configuration options and technical settings.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/recordings">
            <div className="imported-nav-icon">
              <i className="fa fa-microphone"></i>
            </div>
            <div className="imported-nav-title">Recordings</div>
            <p>Manage call recordings, including storage, playback, and retention policies.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/setting/time-group">
            <div className="imported-nav-icon">
              <i className="fa fa-clock"></i>
            </div>
            <div className="imported-nav-title">Time Group</div>
            <p>Configure time-based groupings for scheduling call handling rules.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/setting/time-condition">
            <div className="imported-nav-icon">
              <i className="fa fa-calendar"></i>
            </div>
            <div className="imported-nav-title">Time Condition</div>
            <p>Set conditional rules for call routing based on date, time, and scheduling parameters.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/inbound-route">
            <div className="imported-nav-icon">
              <i className="fa fa-arrow-circle-down"></i>
            </div>
            <div className="imported-nav-title">Inbound Routes</div>
            <p>Configure routing rules for incoming calls based on various criteria.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/outbounds">
            <div className="imported-nav-icon">
              <i className="fa fa-arrow-circle-up"></i>
            </div>
            <div className="imported-nav-title">Outbound Routes</div>
            <p>Manage routing configurations for outgoing calls and trunk selection rules.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/departments">
            <div className="imported-nav-icon">
              <i className="fa fa-building"></i>
            </div>
            <div className="imported-nav-title">Departments</div>
            <p>Manage organizational departments for call routing and agent grouping.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/cdrs/configaration">
            <div className="imported-nav-icon">
              <i className="fa fa-language"></i>
            </div>
            <div className="imported-nav-title">CDR Configuration</div>
            <p>Configure Call Detail Record settings, including field customization and display options.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/trunks">
            <div className="imported-nav-icon">
              <i className="fa fa-road"></i>
            </div>
            <div className="imported-nav-title">Trunks</div>
            <p>Manage SIP trunks and connectivity options for external communications.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/security">
            <div className="imported-nav-icon">
              <i className="fa fa-lock"></i>
            </div>
            <div className="imported-nav-title">Security</div>
            <p>Configure security settings, including authentication policies and access controls.</p>
          </a>
        </div>
      </div>
    </div>
  )
}
