"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getUserFromStorage } from "@/lib/auth"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header/app-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const user = getUserFromStorage()
    if (!user) {
      router.push("/login")
    }
  }, [router])

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader sticky />
          <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
