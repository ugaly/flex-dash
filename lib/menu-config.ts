import { LayoutDashboard, Phone, Users, Settings, FileText, BarChart3, Shield, Database } from "lucide-react"
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
    { title: "Customers", icon: Users, href: "/dashboard/customers" },
    { title: "Reports", icon: FileText, href: "/dashboard/reports" },
    ...sharedItems,
  ]

  const adminItems: MenuItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard/admin" },
    { title: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    { title: "User Management", icon: Shield, href: "/dashboard/users" },
    { title: "Database", icon: Database, href: "/dashboard/database" },
    ...sharedItems,
  ]

  return role === "agent" ? agentItems : adminItems
}
