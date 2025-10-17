"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Volume2,
  List,
  SettingsIcon,
  Mic,
  Clock,
  Calendar,
  ArrowDownCircle,
  ArrowUpCircle,
  Building,
  Languages,
  Phone,
  Lock,
  Music,
  FileText,
  Bell,
  Wrench,
  Menu,
  Search,
  AlertTriangle,
  Bot,
  MapPin,
  Asterisk,
} from "lucide-react"

interface SettingCard {
  title: string
  description: string
  icon: React.ReactNode
  route: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const settingsCards: SettingCard[] = [
    {
      title: "IVR",
      description: "Configure Interactive Voice Response systems for call routing",
      icon: <Volume2 className="h-8 w-8" />,
      route: "/dashboard/settings/ivr",
    },
    {
      title: "Queue",
      description: "Manage call queues and queue settings for inbound calls",
      icon: <List className="h-8 w-8" />,
      route: "/settings/queue",
    },
    {
      title: "Configurations",
      description: "System-wide configuration settings and parameters",
      icon: <SettingsIcon className="h-8 w-8" />,
      route: "/settings/configurations",
    },
    {
      title: "Recordings",
      description: "Manage voice recordings for greetings, prompts and messages",
      icon: <Mic className="h-8 w-8" />,
      route: "/settings/recordings",
    },
    {
      title: "Time Group",
      description: "Define groups of time periods for scheduling purposes",
      icon: <Clock className="h-8 w-8" />,
      route: "/settings/time-group",
    },
    {
      title: "Time Condition",
      description: "Set conditional call routing based on date and time",
      icon: <Calendar className="h-8 w-8" />,
      route: "/settings/time-condition",
    },
    {
      title: "Inbound Routes",
      description: "Configure routing for incoming calls by DID or CallerID",
      icon: <ArrowDownCircle className="h-8 w-8" />,
      route: "/settings/inbound-routes",
    },
    {
      title: "Outbound Routes",
      description: "Manage outgoing call paths and dial patterns",
      icon: <ArrowUpCircle className="h-8 w-8" />,
      route: "/settings/outbound-routes",
    },
    {
      title: "Departments",
      description: "Organize extensions and users into departmental groups",
      icon: <Building className="h-8 w-8" />,
      route: "/settings/departments",
    },
    {
      title: "CDR Configuration",
      description: "Configure Call Detail Records logging and reporting options",
      icon: <Languages className="h-8 w-8" />,
      route: "/settings/cdr-configuration",
    },
    {
      title: "Trunks",
      description: "Manage telephony connections to service providers",
      icon: <Phone className="h-8 w-8" />,
      route: "/settings/trunks",
    },
    {
      title: "Extensions",
      description: "Configure user telephone extensions and settings",
      icon: <Phone className="h-8 w-8" />,
      route: "/settings/extensions",
    },
    {
      title: "Security",
      description: "Manage security settings, permissions and access controls",
      icon: <Lock className="h-8 w-8" />,
      route: "/settings/security",
    },
    {
      title: "Music On Hold",
      description: "Upload and manage audio played during call holds",
      icon: <Music className="h-8 w-8" />,
      route: "/settings/music-on-hold",
    },
    {
      title: "Certificates",
      description: "Manage SSL/TLS certificates for secure communications",
      icon: <FileText className="h-8 w-8" />,
      route: "/settings/certificates",
    },
    {
      title: "Tones",
      description: "Configure system tones, rings and audible indicators",
      icon: <Bell className="h-8 w-8" />,
      route: "/settings/tones",
    },
    {
      title: "User Panel",
      description: "Customize user interface panels and dashboards",
      icon: <Wrench className="h-8 w-8" />,
      route: "/settings/user-panel",
    },
    {
      title: "Dial Plan",
      description: "Design call flow and routing logic for the phone system",
      icon: <Menu className="h-8 w-8" />,
      route: "/settings/dial-plan",
    },
    {
      title: "Audit Trails",
      description: "Review system activity logs and security events",
      icon: <AlertTriangle className="h-8 w-8" />,
      route: "/settings/audit-trails",
    },
    {
      title: "Virtual Assistant",
      description: "Configure AI-powered virtual assistants for automated responses",
      icon: <Bot className="h-8 w-8" />,
      route: "/settings/virtual-assistant",
    },
    {
      title: "Location Check",
      description: "Verify and manage geographical settings and locations",
      icon: <MapPin className="h-8 w-8" />,
      route: "/settings/location-check",
    },
    {
      title: "SIP Trunks",
      description: "Manage and configure SIP trunks for external communication",
      icon: <Asterisk className="h-8 w-8" />,
      route: "/settings/sip-trunks",
    },
  ]

  const filteredCards = settingsCards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCardClick = (route: string) => {
    router.push(route)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto ">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
        </header>

        {/* <div className="mb-8 flex gap-2">
          <Input
            type="text"
            placeholder="Search for functions or settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div> */}



        <div className="imported-search-bar">
          <input
            type="text"
            placeholder="Search for functions or settings..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="imported-search-input"
          />
          <button type="button" className="imported-search-button">
            <i className="fas fa-search"></i> Search
          </button>
        </div>



        <div className="imported-nav-grid">
          {filteredCards.map((card) => (
            <div
              key={card.title}
              className="imported-nav-item"
              onClick={() => handleCardClick(card.route)}
            >

              <div className="imported-nav-icon">
                {card.icon}
              </div>
              <div className="imported-nav-title">{card.title}</div>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
