"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Plus, Trash2 } from "lucide-react"

interface IVR {
  id: number
  name: string
  description: string
}

export default function IVRSettingsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const ivrs: IVR[] = [
    { id: 1, name: "ZssfEnglish", description: "Zssf English IVR" },
    { id: 2, name: "ZssfSw", description: "Zssf Swahili Queue" },
    { id: 3, name: "SamakiEntry", description: "SamakiEntry" },
    { id: 4, name: "WezeshaServicesSW", description: "WezeshaServicesSW" },
    { id: 5, name: "WezeshaPregnantSW", description: "WezeshaPregnantSW" },
    { id: 6, name: "WezeshaAgeSW", description: "WezeshaAgeSW" },
    { id: 7, name: "WezeshaStationCodeSW", description: "WezeshaStationCodeSW" },
    { id: 8, name: "WezeshaServicesEN", description: "WezeshaServicesEN" },
    { id: 9, name: "WezeshaPregnantEN", description: "WezeshaPregnantEN" },
    { id: 10, name: "WezeshaGenderEN", description: "WezeshaGenderEN" },
  ]

  const filteredIVRs = ivrs.filter(
    (ivr) =>
      ivr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ivr.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredIVRs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentIVRs = filteredIVRs.slice(startIndex, endIndex)

  const handleAddIVR = () => {
    router.push("/dashboard/settings/ivr/new")
  }

  const handleViewIVR = (id: number) => {
    router.push(`/dashboard/settings/ivr/${id}`)
  }

  const handleEditIVR = (id: number) => {
    router.push(`/settings/ivr/${id}/edit`)
  }

  const handleDeleteIVR = (id: number) => {
    console.log("Delete IVR:", id)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">IVR SETTINGS</h1>
          <Button onClick={handleAddIVR}>Add IVR</Button>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Search:</span>
          <Input
            type="text"
            placeholder="Search IVRs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="text-white">S/N</TableHead>
                <TableHead className="text-white">IVR NAME</TableHead>
                <TableHead className="text-white">IVR DESCRIPTION</TableHead>
                <TableHead className="text-white">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentIVRs.map((ivr, index) => (
                <TableRow key={ivr.id} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell className="font-medium">{ivr.name}</TableCell>
                  <TableCell>{ivr.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleViewIVR(ivr.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleEditIVR(ivr.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteIVR(ivr.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredIVRs.length)} of {filteredIVRs.length} entries
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
