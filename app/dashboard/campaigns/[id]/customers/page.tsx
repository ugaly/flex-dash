"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, BarChart3, Trash2, Edit, Eye } from "lucide-react"
import type { Customer } from "@/types/customer"

export default function CampaignCustomersPage() {
  const params = useParams()
  const router = useRouter()
  const campaignId = params.id as string
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [campaignData] = useState({
    title: "new product",
    campaignTime: "2025-09-11 17:00 - 2025-09-18 20:00",
    totalCustomers: 0,
    called: 0,
    pending: 0,
  })

  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(new Set(customers.map((c) => c.id)))
    } else {
      setSelectedCustomers(new Set())
    }
  }

  const handleSelectCustomer = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedCustomers)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedCustomers(newSelected)
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("[v0] File selected:", file.name)
    }
  }

  const handleImport = () => {
    console.log("[v0] Importing customers...")
  }

  const handleDownloadSample = () => {
    console.log("[v0] Downloading sample CSV...")
  }

  const handleDeleteSelected = () => {
    setCustomers(customers.filter((c) => !selectedCustomers.has(c.id)))
    setSelectedCustomers(new Set())
  }

  const handleViewDashboard = () => {
    router.push(`/dashboard/campaigns/${campaignId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 mx-6 mt-2">
        <h1 className="text-xl font-semibold">Campaign Customers</h1>
      </div>

      {/* Campaign Info */}
      <div className="bg-white px-6 py-4 border-b mx-6">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Title:</span>
            <span>{campaignData.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Campaign Time:</span>
            <span>{campaignData.campaignTime}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Total Customers:</span>
              <span>{campaignData.totalCustomers}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Called:</span>
              <span>{campaignData.called}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Pending:</span>
              <span>{campaignData.pending}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto p-6 space-y-6">
        {/* Upload Section */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
            <Input
              placeholder="Upload CSV file"
              readOnly
              className="flex-1 cursor-pointer"
              onClick={handleFileSelect}
            />
            <Button variant="outline" onClick={handleFileSelect}>
              Browse
            </Button>
            <Button onClick={handleImport} className="bg-blue-600 hover:bg-blue-700">
              Import
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadSample}
              className="bg-gray-600 text-white hover:bg-gray-700"
            >
              Download Sample CSV
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleViewDashboard}
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
              Add Customer
            </Button>
          </div>
        </div>

        {/* Delete Selected Button */}
        {selectedCustomers.size > 0 && (
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDeleteSelected} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={customers.length > 0 && selectedCustomers.size === customers.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left font-semibold">SN</th>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Phone Number</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Created At</th>
                <th className="px-4 py-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No customers added yet. Upload a CSV file or add customers manually.
                  </td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <tr key={customer.id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.has(customer.id)}
                        onChange={(e) => handleSelectCustomer(customer.id, e.target.checked)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">{customer.name}</td>
                    <td className="px-4 py-3 text-sm">{customer.phoneNumber}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          customer.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : customer.status === "Called"
                              ? "bg-blue-100 text-blue-800"
                              : customer.status === "Failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{customer.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                          onClick={() => setCustomers(customers.filter((c) => c.id !== customer.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
