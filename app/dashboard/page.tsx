"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getUserFromStorage } from "@/lib/auth"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const user = getUserFromStorage()
    if (user) {
      if (user.role === "agent") {
        router.push("/dashboard/agent")
      } else if (user.role === "administrator") {
        router.push("/dashboard/admin")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
      </div>
    </div>
  )
}
