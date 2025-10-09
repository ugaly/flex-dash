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
    <Sidebar collapsible="icon" className="border-r border-gray-300 bg-white">
      {/* Header */}
      {state === "collapsed" ? (
        <SidebarHeader className="h-16 border-b border-sidebar-border/50 flex items-center justify-center">
          <div className={cn(
            "relative transition-all duration-300",
            state === "collapsed" ? "w-10 h-10" : "w-12 h-12"
          )}>
            <div className="absolute inset-0 blur-sm" />

            <div className="relative w-full h-full ">
              <div className="w-full h-full bg-sidebar rounded-[10px] flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Flex"
                  width={state === "collapsed" ? 30 : 38}
                  height={state === "collapsed" ? 20 : 38}
                  className="object-contain transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </SidebarHeader>

      ) : (
        <SidebarHeader className="h-16 border-b border-sidebar-border/100 px-4 py-4 flex items-center justify-center">
          {/* Centered Logo Container */}
          <div
            className={cn(
              "relative transition-all duration-500 group flex items-center justify-center",
              state as string === "collapsed" ? "w-14 h-14" : "w-30 h-12"
            )}
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br group-hover:blur-2xl transition-all duration-700 animate-pulse" />

            {/* Main Logo */}
            <div className="w-full h-full bg-sidebar rounded-[18px] flex items-center justify-center backdrop-blur-sm">
              <Image
                src="/logo.png"
                alt="Flex"
                width={(state as string) === "collapsed" ? 40 : 56}
                height={(state as string) === "collapsed" ? 40 : 46}
                className="object-contain transition-all duration-500 drop-shadow-lg"
              />
            </div>
          </div>
        </SidebarHeader>

      )}

      {/* Navigation */}
      <SidebarContent className="px-3 py-4">
        <SidebarMenu className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "transition-colors",
                    state === "collapsed" && [
                      "h-10 w-10 justify-center p-0 mx-auto rounded-md",
                      isActive && "bg-blue-100"
                    ],
                    state !== "collapsed" && [
                      "h-9 justify-start px-3 rounded-md",
                      isActive && "bg-blue-100 text-blue-700"
                    ],
                    !isActive && [
                      "hover:bg-gray-100"
                    ]
                  )}
                >
                  <Link href={item.href} className="flex items-center w-full">
                    <div className={cn(
                      "flex items-center justify-center",
                      state === "collapsed" ? "w-5 h-5" : "w-4 h-4"
                    )}>
                      <Icon
                        className={cn(
                          state === "collapsed" ? "h-4 w-4" : "h-3.5 w-3.5",
                          isActive ? "text-blue-600" : "text-gray-600"
                        )}
                      />
                    </div>

                    {state !== "collapsed" && (
                      <span className={cn(
                        "ml-3 text-sm",
                        isActive ? "text-blue-700 font-medium" : "text-gray-700"
                      )}>
                        {item.title}
                      </span>
                    )}

                    {state !== "collapsed" && item.badge && (
                      <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>

        {/* Footer Section - Only when expanded */}
        {/* {state !== "collapsed" && (
          <div className="mt-6 p-3 bg-gray-50 border border-gray-300 rounded-md">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Storage</span>
                <span className="font-medium text-gray-900">65%</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: '65%' }}
                />
              </div>
            </div>
          </div>
        )} */}
      </SidebarContent>
    </Sidebar>
  )
}