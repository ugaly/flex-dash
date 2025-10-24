"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Member {
  id: number
  extension: string
  name: string
  penalty: string
}

export default function QueueMembersPage() {
  const params = useParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data - replace with actual data fetching
  const queueName = "SMARTQUEUE"
  const allMembers: Member[] = [
    { id: 1, extension: "8090", name: "Hekela Sanga", penalty: "10%" },
    { id: 2, extension: "7028", name: "Peter Kisinga", penalty: "90%" },
    { id: 3, extension: "8099", name: "Linda Mathias", penalty: "90%" },
    { id: 4, extension: "8091", name: "MOH MOH", penalty: "90%" },
    { id: 5, extension: "8097", name: "Allen Kakwale", penalty: "90%" },
    { id: 6, extension: "7029", name: "Loyce Kisepe", penalty: "90%" },
    { id: 7, extension: "8098", name: "Ismail Mbezi", penalty: "90%" },
    { id: 8, extension: "8095", name: "Admin Admin", penalty: "10%" },
    { id: 9, extension: "8089", name: "Emmanuel Mmanda", penalty: "10%" },
    { id: 10, extension: "8103", name: "NUNU ABDALLAH", penalty: "10%" },
    { id: 11, extension: "8102", name: "Stephen Odingo", penalty: "10%" },
    { id: 12, extension: "8101", name: "Emmanuel Maunganya", penalty: "10%" },
  ]

  const filteredMembers = allMembers.filter(
    (member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.extension.includes(searchQuery),
  )

  const totalRecords = filteredMembers.length
  const totalPages = Math.ceil(totalRecords / 10)
  const startIndex = (currentPage - 1) * 10
  const endIndex = startIndex + 10
  const currentMembers = filteredMembers.slice(startIndex, endIndex)

  const handleDelete = (id: number) => {
    console.log("Delete member:", id)
  }

  return (
    <div className="queue-members-page">
      <div className="queue-members-container">
        <div className="queue-members-sidebar">
          <h2 className="queue-members-sidebar-title">Queue Details</h2>
          <div className="queue-members-info">
            <span className="queue-members-info-label">Queue Name :</span>
            <span className="queue-members-info-value">{queueName}</span>
          </div>
        </div>

        <div className="queue-members-main">
          <div className="queue-members-header">
            <h1 className="queue-members-title">
              <span className="queue-members-title-name">{queueName}</span> Members
            </h1>
            <Link href={`/dashboard/settings/queues/members/add`}>
              <Button className="queue-members-add-btn">Add Member</Button>
            </Link>
          </div>

          <div className="queue-members-search">
            <Input
              type="text"
              placeholder="Search:"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="queue-members-search-input"
            />
          </div>

          <div className="queue-members-table-wrapper">
            <table className="queue-members-table">
              <thead>
                <tr>
                  <th className="queue-members-th">#</th>
                  <th className="queue-members-th">Extension</th>
                  <th className="queue-members-th">Name</th>
                  <th className="queue-members-th">Penalty</th>
                  <th className="queue-members-th">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentMembers.map((member, index) => (
                  <tr key={member.id} className="queue-members-tr">
                    <td className="queue-members-td">{startIndex + index + 1}</td>
                    <td className="queue-members-td">{member.extension}</td>
                    <td className="queue-members-td">{member.name}</td>
                    <td className="queue-members-td">{member.penalty}</td>
                    <td className="queue-members-td">
                      <button onClick={() => handleDelete(member.id)} className="queue-members-delete-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="queue-members-pagination">
            <div className="queue-members-pagination-info">Showing 1 to 10 of {totalRecords} entries</div>
            <div className="queue-members-pagination-buttons">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="queue-members-pagination-btn"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`queue-members-pagination-btn ${currentPage === i + 1 ? "queue-members-pagination-btn-active" : ""}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="queue-members-pagination-btn"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
