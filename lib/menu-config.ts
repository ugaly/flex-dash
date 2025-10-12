import { LayoutDashboard, Phone, Users, Settings, FileText, BarChart3, Shield, Database, PhoneMissed, MessageCircle, Home, ChartSpline, Book, Megaphone } from "lucide-react"
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
    { title: "Home", icon: Home, href: "/dashboard/admin" },
    { title: "Flex Chart", icon: BarChart3, href: "/dashboard/flex-chart" },
    { title: "Contact Center", icon: ChartSpline, href: "/dashboard/contact-center" },
    { title: "Call detail", icon: Book, href: "/dashboard/call-detail" },


    { title: "User Management", icon: Users, href: "/dashboard/users" },
    { title: "Campaign", icon: Megaphone, href: "/dashboard/campaigns" },
    // ...sharedItems,
  ]

  return role === "agent" ? agentItems : adminItems
}
