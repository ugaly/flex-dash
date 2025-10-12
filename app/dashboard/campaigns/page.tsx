"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CampaignTable } from "@/components/campaigns/campaign-table"
import { CampaignModal } from "@/components/campaigns/campaign-modal"
import type { Campaign } from "@/types/campaign"
import { Card, CardHeader } from "@/components/ui/card"

export default function CampaignsPage() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "new product",
      totalRecipients: 0,
      simultaneousCalls: 200,
      destination: "Play recording",
      timeRange: {
        start: "2025-09-11 17:00",
        end: "2025-09-18 20:00",
      },
      status: "Ongoing",
      createdAt: "2025-09-12 11:45:30",
    },
    {
      id: "2",
      title: "Partnership",
      totalRecipients: 0,
      simultaneousCalls: 23,
      destination: "Ivr",
      timeRange: {
        start: "2025-06-17 00:00",
        end: "2025-06-17 23:59",
      },
      status: "Ongoing",
      createdAt: "2025-06-17 11:44:37",
    },
  ])

  const handleAddCampaign = () => {
    setSelectedCampaign(null)
    setIsModalOpen(true)
  }

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setIsModalOpen(true)
  }

  const handleSaveCampaign = (campaignData: Partial<Campaign>) => {
    if (selectedCampaign) {
      setCampaigns(campaigns.map((c) => (c.id === selectedCampaign.id ? { ...c, ...campaignData } : c)))
    } else {
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        title: campaignData.title || "",
        totalRecipients: campaignData.totalRecipients || 0,
        simultaneousCalls: 0,
        destination: campaignData.destination || "",
        timeRange: campaignData.timeRange || { start: "", end: "" },
        status: "Scheduled",
        createdAt: new Date().toLocaleString(),
      }
      setCampaigns([...campaigns, newCampaign])
    }
    setIsModalOpen(false)
  }

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id))
  }

  const handleTogglePause = (id: string) => {
    setCampaigns(
      campaigns.map((c) => (c.id === id ? { ...c, status: c.status === "Paused" ? "Ongoing" : "Paused" } : c)),
    )
  }

  const handleViewCampaign = (id: string) => {
    router.push(`/dashboard/campaigns/${id}`)
  }

  const handleViewCustomers = (id: string) => {
    router.push(`/dashboard/campaigns/${id}/customers`)
  }

  return (
    <div className="h-full bg-gray-50 p-6">
      <Card className="mb-6 p-4">
        <CardHeader className="border-b bg-white mb-4">
          <div className="flex items-center justify-end ">
            <Button onClick={handleAddCampaign} className="bg-blue-600 hover:bg-blue-700">
              Add Campaign
            </Button>
          </div>
        </CardHeader>
        <div className=" mx-auto">


          <CampaignTable
            campaigns={campaigns}
            onView={handleViewCampaign}
            onViewCustomers={handleViewCustomers}
            onEdit={handleEditCampaign}
            onDelete={handleDeleteCampaign}
            onTogglePause={handleTogglePause}
          />

          <CampaignModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveCampaign}
            campaign={selectedCampaign}
          />
        </div>
      </Card>
    </div>
  )
}
