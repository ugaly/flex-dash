"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit } from "lucide-react"

interface Role {
  id: number
  name: string
  permissions: string[]
}

export default function PermissionsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - replace with actual data fetching
  const roles: Role[] = [
    {
      id: 1,
      name: "Agent",
      permissions: ["Can view my task", "Can view all task", "Can view support"],
    },
    {
      id: 2,
      name: "Supervisor",
      permissions: [
        "Can view dashboard",
        "Can view user",
        "Can add user",
        "Can edit user",
        "Can disable/enable user",
        "Can reset user password",
        "Can view role",
        "Can add role",
        "Can edit role",
        "Can disable role",
        "Can view setting",
        "Can update setting",
        "Can view customer",
        "Can view audit trail",
        "Can view report",
        "Can view all task",
        "Can add setting",
        "Can delete setting",
        "Can update setting",
        "Can view support",
      ],
    },
    {
      id: 3,
      name: "Super Admin",
      permissions: [
        "Can View Indevelopment",
        "Can view dashboard",
        "Can view user",
        "Can add user",
        "Can edit user",
        "Can disable/enable user",
        "Can reset user password",
        "Can view role",
        "Can add role",
        "Can edit role",
        "Can disable role",
        "Can view setting",
        "Can update setting",
        "Can view customer",
        "Can view audit trail",
        "Can view report",
        "Can view feedback",
        "Can view my task",
        "Can view supervisor task",
        "Can view department task",
        "Can view all task",
        "Can view overdue task",
        "Can view dashboard",
        "can view cdr",
        "Can edit ivr",
        "Can edit virtual",
        "Can view member",
        "Can edit member",
        "Can add afya Enquiry",
        "Can add NHIF Enquiry",
        "Can manage NHIF activities",
        "Can View Indevelopment",
        "Can edit ivr",
        "Can edit virtual",
        "Can view member",
        "Can add user",
        "Can view my task",
        "Can view dashboard",
        "can view cdr",
        "Can edit ivr",
        "Can view member",
        "Can view Agent Dashboard",
        "Can view Afya",
        "Can view NHIF",
        "Can view configrations",
        "Can view agent",
        "Can view dashboard data",
        "Can view charts",
        "Can view support",
      ],
    },
    {
      id: 4,
      name: "Admin",
      permissions: [
        "Can view user",
        "Can view dashboard",
        "Can View Indevelopment",
        "Can add user",
        "Can edit user",
        "Can disable/enable user",
        "Can reset user password",
        "Can view role",
        "Can add role",
        "Can edit role",
        "Can view setting",
        "Can view agent",
        "Can view audit trail",
        "Can view report",
        "Can Add setting",
        "Can delete setting",
        "Can view dashboard data",
        "Can view charts",
        "Can view support",
      ],
    },
    {
      id: 5,
      name: "Agent",
      permissions: ["Can view my task", "Can view all task", "Can view support"],
    },
    {
      id: 6,
      name: "Supervisor",
      permissions: [
        "Can view dashboard",
        "Can view charts",
        "Can view dashboard data",
        "Can view user",
        "Can add user",
        "Can edit user",
        "Can disable/enable user",
        "Can reset user password",
        "Can view role",
        "Can add role",
        "Can edit role",
        "Can view setting",
        "Can view agent",
        "Can view audit trail",
        "Can view report",
        "Can view all task",
        "Can add setting",
        "Can delete setting",
        "Can update setting",
        "Can view support",
      ],
    },
    {
      id: 7,
      name: "Admin",
      permissions: [
        "Can view user",
        "Can view dashboard",
        "Can View Indevelopment",
        "Can add user",
        "Can edit user",
        "Can disable/enable user",
        "Can reset user password",
        "Can view role",
        "Can add role",
        "Can edit role",
        "Can view setting",
        "Can view agent",
        "Can view audit trail",
        "Can view report",
        "Can Add setting",
        "Can delete setting",
        "Can view dashboard data",
        "Can view charts",
        "Can view support",
      ],
    },
    {
      id: 8,
      name: "Agent",
      permissions: ["Can view my task", "Can view all task", "Can view support"],
    },
    {
      id: 9,
      name: "Supervisor",
      permissions: [
        "Can view dashboard",
        "Can view charts",
        "Can view dashboard data",
        "Can view user",
        "Can add user",
        "Can edit user",
        "Can disable/enable user",
        "Can reset user password",
        "Can view role",
        "Can add role",
        "Can edit role",
        "Can view setting",
        "Can view agent",
        "Can view audit trail",
        "Can view report",
        "Can view all task",
        "Can add setting",
        "Can delete setting",
        "Can update setting",
        "Can view support",
      ],
    },
    {
      id: 10,
      name: "Admin",
      permissions: [
        "Can view user",
        "Can view dashboard",
        "Can View Indevelopment",
        "Can add user",
        "Can edit user",
        "Can disable/enable user",
        "Can reset user password",
        "Can view role",
        "Can add role",
        "Can edit role",
        "Can view setting",
        "Can view agent",
        "Can view audit trail",
        "Can view report",
        "Can Add setting",
        "Can delete setting",
        "Can view dashboard data",
        "Can view charts",
        "Can view support",
      ],
    },
  ]

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.permissions.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRoles = filteredRoles.slice(startIndex, endIndex)

  const handleEditRole = (id: number) => {
    router.push(`/dashboard/permissions/${id}`)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto">
         {/* max-w-7xl */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Permission Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage roles and their associated permissions</p>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Search:</span>
          <Input
            type="text"
            placeholder="Search roles or permissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <div className="rounded-lg border bg-card overflow-hidden">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="text-white w-16 whitespace-nowrap">S/N</TableHead>
                <TableHead className="text-white w-48 whitespace-nowrap">Name</TableHead>
                <TableHead className="text-white">Permissions</TableHead>
                <TableHead className="text-white w-32 whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRoles.map((role, index) => (
                <TableRow key={role.id} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                  <TableCell className="whitespace-nowrap align-top">{startIndex + index + 1}</TableCell>
                  <TableCell className="font-medium whitespace-nowrap align-top">{role.name}</TableCell>
                  <TableCell className="align-top">
                    <div className="text-sm text-muted-foreground break-words whitespace-normal leading-relaxed">
                      {role.permissions.join(" , ")}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap align-top">
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleEditRole(role.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredRoles.length)} of {filteredRoles.length} entries
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
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {page}
                </Button>
              )
            })}
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
