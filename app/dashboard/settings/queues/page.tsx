"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Queue {
  id: number
  name: string
  status: "Active" | "Inactive"
}

export default function QueuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Mock data - replace with actual data fetching
  const allQueues: Queue[] = [
    { id: 1, name: "SMARTQUEUE", status: "Active" },
    { id: 2, name: "MOHQUEUE", status: "Active" },
    { id: 3, name: "ZssfQueueEn", status: "Active" },
    { id: 4, name: "ZssfQueueSw", status: "Active" },
    { id: 5, name: "SamakiSamakiQueue", status: "Active" },
    { id: 6, name: "CITSQUEUE", status: "Active" },
  ]

  const filteredQueues = allQueues.filter(
    (queue) =>
      queue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      queue.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalRecords = filteredQueues.length
  const totalPages = Math.ceil(totalRecords / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentQueues = filteredQueues.slice(startIndex, endIndex)

  return (
    <div className="queue-page">
      <div className="queue-header">
        <h1 className="queue-title">Queues</h1>
      </div>

      <div className="queue-controls">
        <div className="queue-search-wrapper">
          <Input
            type="text"
            placeholder="Search by name, status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="queue-search-input"
          />
        </div>
        <Link href="/dashboard/settings/queues/create">
          <Button className="queue-add-btn">Add New Queue</Button>
        </Link>
      </div>

      <div className="queue-table-wrapper">
        <table className="queue-table">
          <thead>
            <tr>
              <th className="queue-th">S/N ↑</th>
              <th className="queue-th">QUEUE</th>
              <th className="queue-th">STATUS</th>
              <th className="queue-th">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentQueues.map((queue, index) => (
              <tr key={queue.id} className="queue-tr">
                <td className="queue-td">{startIndex + index + 1}</td>
                <td className="queue-td">{queue.name}</td>
                <td className="queue-td">
                  <span className="queue-status-badge">{queue.status}</span>
                </td>
                <td className="queue-td">
                  <div className="queue-actions">
                    <Link href={`/dashboard/settings/queues/edit/${queue.id}`}>
                      <Button className="queue-action-btn queue-view-btn">View</Button>
                    </Link>
                    <Link href={`/dashboard/settings/queues/members`}>
                    <Button className="queue-action-btn queue-members-btn">Members</Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="queue-pagination">
        <div className="queue-rows-per-page">
          <label>Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="queue-select"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="queue-page-info">
          Page {currentPage} of {totalPages} ({totalRecords} total records)
        </div>

        <div className="queue-page-buttons">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="queue-page-btn">
            «
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="queue-page-btn"
          >
            ‹
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`queue-page-btn ${currentPage === pageNum ? "queue-page-btn-active" : ""}`}
              >
                {pageNum}
              </button>
            )
          })}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="queue-page-btn"
          >
            ›
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="queue-page-btn"
          >
            »
          </button>
        </div>
      </div>
    </div>
  )
}
