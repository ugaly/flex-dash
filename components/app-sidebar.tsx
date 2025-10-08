// "use client"

// import * as React from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { getMenuItems } from "@/lib/menu-config"
// import { getUserFromStorage } from "@/lib/auth"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// export function AppSidebar() {
//   const pathname = usePathname()
//   const { state } = useSidebar()
//   const [menuItems, setMenuItems] = React.useState<any[]>([])

//   React.useEffect(() => {
//     const user = getUserFromStorage()
//     if (user) {
//       setMenuItems(getMenuItems(user.role))
//     }
//   }, [])

//   return (
//     <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl">
//       <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center justify-center">
//         <div
//           className={cn(
//             "transition-all duration-300 relative group",
//             state === "collapsed" ? "w-12 h-12" : "w-16 h-16",
//           )}
//         >
//           <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-20 blur-xl group-hover:opacity-40 transition-all duration-300 rounded-full animate-pulse" />
//           <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-primary/80 via-secondary/80 to-primary/80 p-0.5 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-300">
//             <div className="w-full h-full bg-sidebar rounded-lg flex items-center justify-center">
//               <Image
//                 src="https://cc.flex.co.tz/public/assets/logoshorts.png"
//                 alt="Frlex"
//                 width={state === "collapsed" ? 36 : 56}
//                 height={state === "collapsed" ? 36 : 56}
//                 className="object-contain transition-all duration-300"
//               />
//             </div>
//           </div>
//         </div>
//       </SidebarHeader>
//       <SidebarContent className="px-2 py-4">
//         <SidebarMenu className="space-y-1">
//           <TooltipProvider delayDuration={0}>
//             {menuItems.map((item) => {
//               const isActive = pathname === item.href
//               const Icon = item.icon

//               return (
//                 <SidebarMenuItem key={item.href}>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <SidebarMenuButton
//                         asChild
//                         isActive={isActive}
//                         className={cn(
//                           "transition-all duration-300 relative group/item overflow-hidden",
//                           state === "collapsed"
//                             ? cn("h-14 w-14 justify-center p-0 mx-auto", isActive && "h-16 w-16")
//                             : "h-11 justify-start",
//                           isActive && [
//                             "bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10",
//                             "text-sidebar-accent-foreground font-semibold",
//                             "shadow-lg shadow-primary/10",
//                             "border border-primary/20",
//                             state === "collapsed" ? "scale-100" : "scale-105",
//                             "dark:from-primary/20 dark:via-secondary/20 dark:to-primary/20",
//                             "dark:shadow-primary/20",
//                             "dark:border-primary/30",
//                           ],
//                           !isActive && ["hover:bg-sidebar-accent/50", "hover:scale-[1.02]", "hover:shadow-md"],
//                         )}
//                       >
//                         <Link href={item.href} className="flex items-center gap-3 w-full">
//                           <div
//                             className={cn(
//                               "relative flex items-center justify-center transition-all duration-300",
//                               state === "collapsed" ? (isActive ? "w-8 h-8" : "w-6 h-6") : "w-5 h-5",
//                             )}
//                           >
//                             {isActive && (
//                               <>
//                                 <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-30 blur-lg animate-pulse" />
//                                 {state === "collapsed" && (
//                                   <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl animate-ping" />
//                                 )}
//                               </>
//                             )}
//                             <Icon
//                               className={cn(
//                                 "relative z-10 transition-all duration-300",
//                                 state === "collapsed" ? (isActive ? "h-8 w-8 animate-pulse" : "h-6 w-6") : "h-5 w-5",
//                                 isActive && [
//                                   "text-primary",
//                                   state === "collapsed" ? "scale-100" : "scale-110",
//                                   "drop-shadow-[0_0_10px_rgba(23,136,203,0.6)]",
//                                   "dark:drop-shadow-[0_0_16px_rgba(0,179,243,0.8)]",
//                                 ],
//                                 !isActive &&
//                                   "text-sidebar-foreground/70 group-hover/item:text-sidebar-foreground group-hover/item:scale-110",
//                               )}
//                             />
//                           </div>
//                           {state !== "collapsed" && (
//                             <span
//                               className={cn(
//                                 "text-sm transition-all duration-300",
//                                 isActive && "font-semibold tracking-wide",
//                                 !isActive && "font-medium",
//                               )}
//                             >
//                               {item.title}
//                             </span>
//                           )}
//                           {isActive && state !== "collapsed" && (
//                             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary via-secondary to-primary rounded-r-full shadow-lg shadow-primary/50 animate-pulse" />
//                           )}
//                         </Link>
//                       </SidebarMenuButton>
//                     </TooltipTrigger>
//                     {state === "collapsed" && (
//                       <TooltipContent
//                         side="right"
//                         className={cn(
//                           "font-semibold bg-gradient-to-r from-sidebar via-sidebar to-sidebar border shadow-xl text-sidebar-foreground",
//                           isActive ? "border-primary/40 shadow-primary/20" : "border-primary/20",
//                         )}
//                       >
//                         {item.title}
//                       </TooltipContent>
//                     )}
//                   </Tooltip>
//                 </SidebarMenuItem>
//               )
//             })}
//           </TooltipProvider>
//         </SidebarMenu>
//       </SidebarContent>
//     </Sidebar>
//   )
// }









// "use client"

// import * as React from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { getMenuItems } from "@/lib/menu-config"
// import { getUserFromStorage } from "@/lib/auth"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Badge } from "@/components/ui/badge"

// export function AppSidebar() {
//   const pathname = usePathname()
//   const { state } = useSidebar()
//   const [menuItems, setMenuItems] = React.useState<any[]>([])
//   const [user, setUser] = React.useState<any>(null)

//   React.useEffect(() => {
//     const currentUser = getUserFromStorage()
//     if (currentUser) {
//       setUser(currentUser)
//       setMenuItems(getMenuItems(currentUser.role))
//     }
//   }, [])

//   return (
//     <Sidebar 
//       collapsible="icon" 
//       className="border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl shadow-2xl"
//     >
//       {/* Enhanced Header with User Info */}
//       <SidebarHeader className="h-20 border-b border-sidebar-border/50 px-4 py-4">
//         <div className="flex items-center gap-3 w-full">
//           {/* Logo Container */}
//           <div className={cn(
//             "relative transition-all duration-500 group",
//             state === "collapsed" ? "w-12 h-12" : "w-14 h-14"
//           )}>
//             {/* Animated Background Glow */}
//             <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/40 to-primary/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700 animate-pulse" />
            
//             {/* Main Logo Container */}
//             <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary p-0.5 shadow-2xl group-hover:shadow-3xl group-hover:shadow-primary/30 transition-all duration-500">
//               <div className="w-full h-full bg-sidebar rounded-[14px] flex items-center justify-center backdrop-blur-sm">
//                 <Image
//                   src="https://cc.flex.co.tz/public/assets/logoshorts.png"
//                   alt="Flex"
//                   width={state === "collapsed" ? 28 : 36}
//                   height={state === "collapsed" ? 28 : 36}
//                   className="object-contain transition-all duration-500 drop-shadow-lg"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* User Info - Only visible when expanded */}
//           {state !== "collapsed" && (
//             <div className="flex-1 min-w-0 space-y-1 animate-in slide-in-from-left-4 duration-500">
//               <div className="flex items-center gap-2">
//                 <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                   Flex
//                 </h1>
//                 <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-primary/20">
//                   Pro
//                 </Badge>
//               </div>
//               {user && (
//                 <p className="text-xs text-muted-foreground font-medium truncate">
//                   {user.name}
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       </SidebarHeader>

//       {/* Enhanced Navigation */}
//       <SidebarContent className="px-3 py-6">
//         <SidebarMenu className="space-y-2">
//           <TooltipProvider delayDuration={100}>
//             {menuItems.map((item, index) => {
//               const isActive = pathname === item.href
//               const Icon = item.icon

//               return (
//                 <SidebarMenuItem key={item.href}>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <SidebarMenuButton
//                         asChild
//                         isActive={isActive}
//                         className={cn(
//                           "group relative overflow-hidden transition-all duration-500 ease-out",
//                           state === "collapsed" 
//                             ? cn(
//                                 "h-16 w-16 justify-center p-0 mx-auto rounded-2xl",
//                                 isActive && "h-18 w-18 scale-110"
//                               )
//                             : "h-12 justify-start rounded-xl px-4",
//                           isActive && [
//                             "bg-gradient-to-r from-primary/15 via-secondary/15 to-primary/15",
//                             "shadow-2xl shadow-primary/20",
//                             "border border-primary/30",
//                             "dark:from-primary/20 dark:via-secondary/20 dark:to-primary/20",
//                             state === "collapsed" ? "scale-110" : "scale-[1.02]",
//                           ],
//                           !isActive && [
//                             "hover:bg-sidebar-accent/60",
//                             "hover:shadow-lg",
//                             "hover:scale-[1.02]",
//                             "dark:hover:bg-sidebar-accent/40",
//                           ]
//                         )}
//                         style={{
//                           animationDelay: `${index * 100}ms`
//                         }}
//                       >
//                         <Link href={item.href} className="flex items-center gap-3 w-full relative">
//                           {/* Active State Glow Effect */}
//                           {isActive && (
//                             <>
//                               <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl animate-pulse" />
//                               {state === "collapsed" && (
//                                 <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10 rounded-xl animate-ping" />
//                               )}
//                             </>
//                           )}

//                           {/* Icon Container */}
//                           <div className={cn(
//                             "relative flex items-center justify-center transition-all duration-500",
//                             state === "collapsed" 
//                               ? cn(
//                                   "w-8 h-8",
//                                   isActive && "w-10 h-10"
//                                 )
//                               : "w-6 h-6",
//                             isActive && "scale-110"
//                           )}>
//                             {/* Icon Background Glow */}
//                             {isActive && (
//                               <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20 blur-md rounded-full animate-pulse" />
//                             )}
                            
//                             <Icon
//                               className={cn(
//                                 "relative z-10 transition-all duration-500",
//                                 state === "collapsed" 
//                                   ? cn(
//                                       isActive ? "h-7 w-7" : "h-6 w-6"
//                                     )
//                                   : "h-5 w-5",
//                                 isActive && [
//                                   "text-primary",
//                                   "drop-shadow-[0_0_12px_rgba(23,136,203,0.8)]",
//                                   "dark:drop-shadow-[0_0_16px_rgba(0,179,243,0.9)]",
//                                   "animate-pulse"
//                                 ],
//                                 !isActive && [
//                                   "text-sidebar-foreground/70",
//                                   "group-hover:text-sidebar-foreground",
//                                   "group-hover:scale-110",
//                                   "group-hover:drop-shadow-[0_0_8px_rgba(23,136,203,0.4)]"
//                                 ]
//                               )}
//                               strokeWidth={isActive ? 2.5 : 2}
//                             />
//                           </div>

//                           {/* Text Content - Only visible when expanded */}
//                           {state !== "collapsed" && (
//                             <div className="flex-1 flex items-center justify-between min-w-0">
//                               <span
//                                 className={cn(
//                                   "text-sm font-medium transition-all duration-500",
//                                   isActive 
//                                     ? "text-primary font-semibold tracking-wide" 
//                                     : "text-sidebar-foreground/90 group-hover:text-sidebar-foreground"
//                                 )}
//                               >
//                                 {item.title}
//                               </span>
                              
//                               {/* Badge for notifications */}
//                               {item.badge && (
//                                 <Badge 
//                                   variant="secondary" 
//                                   className={cn(
//                                     "text-[10px] px-1.5 py-0 h-4 transition-all duration-500",
//                                     isActive 
//                                       ? "bg-primary/20 text-primary border-primary/30" 
//                                       : "bg-muted text-muted-foreground"
//                                   )}
//                                 >
//                                   {item.badge}
//                                 </Badge>
//                               )}
//                             </div>
//                           )}

//                           {/* Active Indicator Bar */}
//                           {isActive && state !== "collapsed" && (
//                             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary via-secondary to-primary rounded-r-full shadow-lg shadow-primary/50 animate-pulse" />
//                           )}

//                           {/* Hover Effect */}
//                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//                         </Link>
//                       </SidebarMenuButton>
//                     </TooltipTrigger>
                    
//                     {/* Enhanced Tooltip */}
//                     {state === "collapsed" && (
//                       <TooltipContent
//                         side="right"
//                         sideOffset={10}
//                         className={cn(
//                           "px-3 py-2 font-semibold text-xs border shadow-2xl backdrop-blur-xl transition-all duration-300",
//                           isActive 
//                             ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 text-primary shadow-primary/20" 
//                             : "bg-sidebar/95 border-border text-sidebar-foreground shadow-sidebar/20"
//                         )}
//                       >
//                         <div className="flex items-center gap-2">
//                           <span>{item.title}</span>
//                           {item.badge && (
//                             <Badge variant="secondary" className="text-[8px] px-1 h-3">
//                               {item.badge}
//                             </Badge>
//                           )}
//                         </div>
//                       </TooltipContent>
//                     )}
//                   </Tooltip>
//                 </SidebarMenuItem>
//               )
//             })}
//           </TooltipProvider>
//         </SidebarMenu>

//         {/* Enhanced Footer Section */}
//         {state !== "collapsed" && (
//           <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 backdrop-blur-sm">
//             <div className="space-y-2">
//               <div className="flex items-center justify-between text-xs">
//                 <span className="text-muted-foreground font-medium">Storage</span>
//                 <span className="font-semibold text-primary">65%</span>
//               </div>
//               <div className="w-full bg-muted rounded-full h-1.5">
//                 <div 
//                   className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-1000 ease-out"
//                   style={{ width: '65%' }}
//                 />
//               </div>
//               <p className="text-[10px] text-muted-foreground">
//                 Upgrade for more space
//               </p>
//             </div>
//           </div>
//         )}
//       </SidebarContent>
//     </Sidebar>
//   )
// }










"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { getMenuItems } from "@/lib/menu-config"
import { getUserFromStorage } from "@/lib/auth"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const [menuItems, setMenuItems] = React.useState<any[]>([])
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    const currentUser = getUserFromStorage()
    if (currentUser) {
      setUser(currentUser)
      setMenuItems(getMenuItems(currentUser.role))
    }
  }, [])

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl"
    >
      {/* Header */}
      {/* <SidebarHeader className="h-16 border-b border-sidebar-border/50 flex items-center justify-center">
        <div className={cn(
          "relative transition-all duration-300",
          state === "collapsed" ? "w-10 h-10" : "w-12 h-12"
        )}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl blur-sm" />
          
          <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-primary/90 to-secondary/90 p-0.5 shadow-lg">
            <div className="w-full h-full bg-sidebar rounded-[10px] flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Flex"
                width={state === "collapsed" ? 30 :38}
                height={state === "collapsed" ? 20 : 38}
                className="object-contain transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </SidebarHeader> */}


{state === "collapsed" ? (
  <SidebarHeader className="h-16 border-b border-sidebar-border/50 flex items-center justify-center">
        <div className={cn(
          "relative transition-all duration-300",
          state === "collapsed" ? "w-10 h-10" : "w-12 h-12"
        )}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl blur-sm" />
          
          <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-primary/90 to-secondary/90 p-0.5 shadow-lg">
            <div className="w-full h-full bg-sidebar rounded-[10px] flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Flex"
                width={state === "collapsed" ? 30 :38}
                height={state === "collapsed" ? 20 : 38}
                className="object-contain transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </SidebarHeader>

):(
      <SidebarHeader className="h-20 border-b border-sidebar-border/50 px-4 py-4">
        <div className="flex items-center gap-3 w-full">
          {/* Logo Container */}
          <div className={cn(
            "relative transition-all duration-500 group",
            state === "collapsed" ? "w-12 h-12" : "w-14 h-14"
          )}>
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/40 to-primary/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700 animate-pulse" />
            
            {/* Main Logo Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary p-0.5 shadow-2xl group-hover:shadow-3xl group-hover:shadow-primary/30 transition-all duration-500">
              <div className="w-full h-full bg-sidebar rounded-[14px] flex items-center justify-center backdrop-blur-sm">
                <Image
                  src="/logo.png"
                  alt="Flex"
                  width={state === "collapsed" ? 28 : 36}
                  height={state === "collapsed" ? 28 : 36}
                  className="object-contain transition-all duration-500 drop-shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* User Info - Only visible when expanded */}
          {state !== "collapsed" && (
            <div className="flex-1 min-w-0 space-y-1 animate-in slide-in-from-left-4 duration-500">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Flex
                </h1>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-primary/20">
                  Pro
                </Badge>
              </div>
              {user && (
                <p className="text-xs text-muted-foreground font-medium truncate">
                  {user.name}
                </p>
              )}
            </div>
          )}
        </div>
      </SidebarHeader>
 )}
      {/* Navigation */}
      <SidebarContent className="px-2 py-4">
        <SidebarMenu className="space-y-1">
          <TooltipProvider delayDuration={100}>
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <SidebarMenuItem key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "group relative transition-all duration-300",
                          // Collapsed state - smaller, centered
                          state === "collapsed" && [
                            "h-12 w-12 justify-center p-0 mx-auto",
                            "rounded-xl", // Smaller rounded corners when collapsed
                            isActive && [
                              "bg-gradient-to-r from-primary/20 to-secondary/20",
                              "shadow-md shadow-primary/10",
                              "border border-primary/20",
                            ]
                          ],
                          // Expanded state - normal size
                          state !== "collapsed" && [
                            "h-10 justify-start px-3",
                            "rounded-lg", // Normal rounded corners when expanded
                            isActive && [
                              "bg-gradient-to-r from-primary/15 to-secondary/15",
                              "shadow-lg shadow-primary/10",
                              "border border-primary/20",
                            ]
                          ],
                          // Hover states for both
                          !isActive && [
                            "hover:bg-sidebar-accent/50",
                            "dark:hover:bg-sidebar-accent/30",
                          ]
                        )}
                      >
                        <Link href={item.href} className="flex items-center w-full">
                          {/* Icon Container */}
                          <div className={cn(
                            "relative flex items-center justify-center transition-all duration-300",
                            state === "collapsed" ? "w-6 h-6" : "w-5 h-5"
                          )}>
                            {/* Active glow effect - only when expanded */}
                            {isActive && state !== "collapsed" && (
                              <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                            )}
                            
                            <Icon
                              className={cn(
                                "relative z-10 transition-all duration-300",
                                // Icon sizes
                                state === "collapsed" ? "h-5 w-5" : "h-4 w-4",
                                // Active state styling
                                isActive && [
                                  "text-primary",
                                  "drop-shadow-[0_0_8px_rgba(23,136,203,0.6)]",
                                ],
                                // Inactive state styling
                                !isActive && [
                                  "text-sidebar-foreground/70",
                                  "group-hover:text-sidebar-foreground",
                                ]
                              )}
                              strokeWidth={isActive ? 2.5 : 2}
                            />
                          </div>

                          {/* Text Content - Only visible when expanded */}
                          {state !== "collapsed" && (
                            <span
                              className={cn(
                                "ml-3 text-sm font-medium transition-all duration-300",
                                isActive 
                                  ? "text-primary font-semibold" 
                                  : "text-sidebar-foreground/80 group-hover:text-sidebar-foreground"
                              )}
                            >
                              {item.title}
                            </span>
                          )}

                          {/* Active Indicator - Only when expanded */}
                          {/* {isActive && state !== "collapsed" && (
                            <div className="ml-auto w-1.5 h-6 bg-gradient-to-b from-primary to-secondary rounded-full shadow-sm shadow-primary/30" />
                          )} */}

                          {/* Badge - Only when expanded */}
                          {state !== "collapsed" && item.badge && (
                            <Badge 
                              variant="secondary" 
                              className="ml-auto text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-primary/20"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    
                    {/* Enhanced Tooltip for collapsed state */}
                    {state === "collapsed" && (
                      <TooltipContent
                        side="right"
                        sideOffset={8}
                        className={cn(
                          "px-3 py-2 text-xs font-medium border shadow-lg backdrop-blur-sm",
                          isActive 
                            ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 text-primary" 
                            : "bg-sidebar border-border text-sidebar-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-[8px] px-1 h-3 bg-primary/10 text-primary">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </SidebarMenuItem>
              )
            })}
          </TooltipProvider>
        </SidebarMenu>

        {/* Footer Section - Only when expanded */}
        {state !== "collapsed" && (
          <div className="mt-6 p-3 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Storage</span>
                <span className="font-semibold text-primary">65%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-500"
                  style={{ width: '65%' }}
                />
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}