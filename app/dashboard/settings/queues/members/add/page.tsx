"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface AvailableMember {
  id: number
  extension: string
  name: string
  skills: number
  selected: boolean
}

export default function AddQueueMemberPage() {
  const params = useParams()
  const router = useRouter()

  const queueName = "SMARTQUEUE"
  const [members, setMembers] = useState<AvailableMember[]>([
    { id: 1, extension: "8112", name: "Nosipho Baloyi", skills: 10, selected: false },
    { id: 2, extension: "8092", name: "Martha Mgana", skills: 10, selected: false },
    { id: 3, extension: "8114", name: "NUNU abdallah", skills: 10, selected: false },
    { id: 4, extension: "8113", name: "Justin Gara", skills: 10, selected: false },
    { id: 5, extension: "8104", name: "Ngoni Mombeshora", skills: 10, selected: false },
    { id: 6, extension: "8101", name: "Emmanuel Maunganya", skills: 10, selected: false },
    { id: 7, extension: "8108", name: "Golden Simoia", skills: 10, selected: false },
    { id: 8, extension: "8109", name: "Sibahle Dlamini", skills: 10, selected: false },
    { id: 9, extension: "8105", name: "Justin Gara", skills: 10, selected: false },
    { id: 10, extension: "8088", name: "Flex Administrator", skills: 10, selected: false },
    { id: 11, extension: "8100", name: "Ritha Laurian", skills: 10, selected: false },
    { id: 12, extension: "8110", name: "Zainabu Amir", skills: 10, selected: false },
    { id: 13, extension: "8111", name: "Tshepo Dooka", skills: 10, selected: false },
  ])

  const handleToggleSelect = (id: number) => {
    setMembers((prev) => prev.map((member) => (member.id === id ? { ...member, selected: !member.selected } : member)))
  }

  const handleSkillChange = (id: number, value: number) => {
    setMembers((prev) => prev.map((member) => (member.id === id ? { ...member, skills: value } : member)))
  }

  const handleAddMembers = () => {
    const selectedMembers = members.filter((m) => m.selected)
    console.log("Adding members:", selectedMembers)
    router.push(`/queues/${params.id}/members`)
  }

  return (
    <div className="queue-add-member-page">
      <div className="queue-add-member-container">
        <h1 className="queue-add-member-title">Add Queue Member</h1>

        <div className="queue-add-member-info">
          <label className="queue-add-member-label">Queue Name</label>
          <div className="queue-add-member-queue-name">{queueName}</div>
        </div>

        <div className="queue-add-member-section">
          <label className="queue-add-member-section-label">Member</label>
          <div className="queue-add-member-table-wrapper">
            <table className="queue-add-member-table">
              <thead>
                <tr>
                  <th className="queue-add-member-th">#</th>
                  <th className="queue-add-member-th">Extension</th>
                  <th className="queue-add-member-th">Name</th>
                  <th className="queue-add-member-th">Skills</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="queue-add-member-tr">
                    <td className="queue-add-member-td">
                      <input
                        type="checkbox"
                        checked={member.selected}
                        onChange={() => handleToggleSelect(member.id)}
                        className="queue-add-member-checkbox"
                      />
                    </td>
                    <td className="queue-add-member-td">{member.extension}</td>
                    <td className="queue-add-member-td">{member.name}</td>
                    <td className="queue-add-member-td">
                      <select
                        value={member.skills}
                        onChange={(e) => handleSkillChange(member.id, Number(e.target.value))}
                        className="queue-add-member-select"
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="queue-add-member-actions">
          <Button onClick={handleAddMembers} className="queue-add-member-btn">
            Add Member
          </Button>
        </div>
      </div>
    </div>
  )
}
