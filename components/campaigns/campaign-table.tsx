"use client"

import { useState } from "react"
import { Eye, Edit, Trash2, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Campaign } from "@/types/campaign"

interface CampaignTableProps {
  campaigns: Campaign[]
  onView: (id: string) => void
  onViewCustomers: (id: string) => void
  onEdit: (campaign: Campaign) => void
  onDelete: (id: string) => void
  onTogglePause: (id: string) => void
}

export function CampaignTable({
  campaigns,
  onView,
  onViewCustomers,
  onEdit,
  onDelete,
  onTogglePause,
}: CampaignTableProps) {
  const [search, setSearch] = useState("")
  const [visibleColumns, setVisibleColumns] = useState({
    sn: true,
    title: true,
    totalRecipients: true,
    simultaneousCalls: true,
    destination: true,
    time: true,
    status: true,
    createdAt: true,
    action: true,
  })

  const filteredCampaigns = campaigns.filter((campaign) => campaign.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Column visibility ▼
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-blue-600 text-white">
            {Object.entries(visibleColumns).map(([key, value]) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={value}
                onCheckedChange={(checked) => setVisibleColumns((prev) => ({ ...prev, [key]: checked }))}
                className="capitalize"
              >
                {key === "sn" ? "SN" : key.replace(/([A-Z])/g, " $1").trim()}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex-1 max-w-sm">
          <Input placeholder="Search:" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              {visibleColumns.sn && <th className="px-4 py-3 text-left font-semibold">SN</th>}
              {visibleColumns.title && <th className="px-4 py-3 text-left font-semibold">Title</th>}
              {visibleColumns.totalRecipients && (
                <th className="px-4 py-3 text-left font-semibold">Total Recipients</th>
              )}
              {visibleColumns.simultaneousCalls && (
                <th className="px-4 py-3 text-left font-semibold">Simultaneous Calls</th>
              )}
              {visibleColumns.destination && <th className="px-4 py-3 text-left font-semibold">Destination</th>}
              {visibleColumns.time && <th className="px-4 py-3 text-left font-semibold">Time</th>}
              {visibleColumns.status && <th className="px-4 py-3 text-left font-semibold">Status</th>}
              {visibleColumns.createdAt && <th className="px-4 py-3 text-left font-semibold">Created At</th>}
              {visibleColumns.action && <th className="px-4 py-3 text-left font-semibold">Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map((campaign, index) => (
              <tr key={campaign.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                {visibleColumns.sn && <td className="px-4 py-3 text-sm">{index + 1}</td>}
                {visibleColumns.title && <td className="px-4 py-3 text-sm">{campaign.title}</td>}
                {visibleColumns.totalRecipients && <td className="px-4 py-3 text-sm">{campaign.totalRecipients}</td>}
                {visibleColumns.simultaneousCalls && (
                  <td className="px-4 py-3 text-sm">{campaign.simultaneousCalls}</td>
                )}
                {visibleColumns.destination && <td className="px-4 py-3 text-sm">{campaign.destination}</td>}
                {visibleColumns.time && (
                  <td className="px-4 py-3 text-sm text-xs">
                    {campaign.timeRange.start} - {campaign.timeRange.end}
                  </td>
                )}
                {visibleColumns.status && (
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        campaign.status === "Ongoing"
                          ? "bg-green-100 text-green-800"
                          : campaign.status === "Completed"
                            ? "bg-blue-100 text-blue-800"
                            : campaign.status === "Paused"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                )}
                {visibleColumns.createdAt && <td className="px-4 py-3 text-sm">{campaign.createdAt}</td>}
                {visibleColumns.action && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-blue-600 hover:bg-blue-700 h-8 w-8 p-0"
                        onClick={() => onViewCustomers(campaign.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => onView(campaign.id)}
                      >
                        Dashboard
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                        onClick={() => onTogglePause(campaign.id)}
                      >
                        {campaign.status === "Paused" ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => onEdit(campaign)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onDelete(campaign.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing 1 to {filteredCampaigns.length} of {campaigns.length} entries
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="default" size="sm" className="bg-blue-600">
            1
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
