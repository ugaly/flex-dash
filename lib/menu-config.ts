import { LayoutDashboard, Phone, Users, Settings, FileText, BarChart3, Shield, Database, PhoneMissed, MessageCircle } from "lucide-react"
import type { UserRole } from "./auth"

export interface MenuItem {
  title: string
  icon: any
  href: string
}

export function getMenuItems(role: UserRole): MenuItem[] {
  const sharedItems: MenuItem[] = [{ title: "Settings", icon: Settings, href: "/dashboard/settings" }]

  const agentItems: MenuItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard/agent" },
    { title: "Call Center", icon: Phone, href: "/dashboard/call-center" },
    { title: "Missed Calls", icon: PhoneMissed, href: "/dashboard/missed-calls" },
    { title: "Message", icon: MessageCircle, href: "/dashboard/message-center" },
    // ...sharedItems,
  ]

  const adminItems: MenuItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard/admin" },
    { title: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    { title: "User Management", icon: Shield, href: "/dashboard/users" },
    { title: "Database", icon: Database, href: "/dashboard/database" },
    // ...sharedItems,
  ]

  return role === "agent" ? agentItems : adminItems
}
