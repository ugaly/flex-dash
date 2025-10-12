"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Campaign } from "@/types/campaign"

interface CampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (campaign: Partial<Campaign>) => void
  campaign?: Campaign | null
}

export function CampaignModal({ isOpen, onClose, onSave, campaign }: CampaignModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    timeRange: "2025-10-12 00:00 - 2025-10-12 23:59",
    numberOfPeople: "",
    destination: "",
  })

  useEffect(() => {
    if (campaign) {
      setFormData({
        title: campaign.title,
        timeRange: `${campaign.timeRange.start} - ${campaign.timeRange.end}`,
        numberOfPeople: campaign.totalRecipients.toString(),
        destination: campaign.destination,
      })
    } else {
      setFormData({
        title: "",
        timeRange: "2025-10-12 00:00 - 2025-10-12 23:59",
        numberOfPeople: "",
        destination: "",
      })
    }
  }, [campaign])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const [start, end] = formData.timeRange.split(" - ")
    onSave({
      ...campaign,
      title: formData.title,
      totalRecipients: Number.parseInt(formData.numberOfPeople),
      destination: formData.destination,
      timeRange: { start, end },
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold">Campaign Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeRange" className="text-base font-semibold">
              Time Range:
            </Label>
            <Input
              id="timeRange"
              value={formData.timeRange}
              onChange={(e) => setFormData({ ...formData, timeRange: e.target.value })}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfPeople" className="text-base font-semibold">
              Number of People
            </Label>
            <Input
              id="numberOfPeople"
              type="number"
              value={formData.numberOfPeople}
              onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination" className="text-base font-semibold">
              Destination
            </Label>
            <Select
              value={formData.destination}
              onValueChange={(value) => setFormData({ ...formData, destination: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Play recording">Play recording</SelectItem>
                <SelectItem value="Ivr">Ivr</SelectItem>
                <SelectItem value="Agent">Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
