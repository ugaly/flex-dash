"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

interface PermissionCategory {
  name: string
  permissions: string[]
}

export default function PermissionDetailPage() {
  const router = useRouter()
  const params = useParams()
  const roleId = params.id

  const [roleName, setRoleName] = useState("Supervisor")
  const [roleDescription, setRoleDescription] = useState("Role for Supervisor")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterMode, setFilterMode] = useState<"all" | "selected">("all")

  // Mock permission categories
  const [permissionCategories, setPermissionCategories] = useState<PermissionCategory[]>([
    {
      name: "Indevelopment",
      permissions: ["View Indevelopment"],
    },
    {
      name: "Layout",
      permissions: [
        "view dashboard",
        "view agent",
        "view dashboard",
        "view agent",
        "view dashboard",
        "view agent",
        "view dashboard",
        "view agent",
        "view Agent Dashboard",
        "view Agent Dashboard",
        "view Agent Dashboard",
        "view Agent Dashboard",
      ],
    },
    {
      name: "User Modal",
      permissions: [
        "view user",
        "add user",
        "edit user",
        "disable/enable user",
        "reset user password",
        "view user",
        "add user",
        "edit user",
        "disable/enable user",
        "reset user password",
        "view user",
        "add user",
        "edit user",
        "disable/enable user",
        "reset user password",
        "view user",
        "add user",
        "edit user",
        "disable/enable user",
        "reset user password",
        "view user",
        "edit user",
        "disable/enable user",
        "reset user password",
        "disable/enable user",
        "reset user password",
      ],
    },
    {
      name: "Afya",
      permissions: ["view Afya"],
    },
    {
      name: "NHIF",
      permissions: ["view NHIF"],
    },
    {
      name: "Dashboard",
      permissions: ["view dashboard data"],
    },
    {
      name: "CDR",
      permissions: [
        "view SMARTQUEUE",
        "view CITSQUEUE",
        "view MOHQUEUE",
        "view ZssfQueueEn",
        "view ZssfQueueSw",
        "view SamakiSamakiQueue",
      ],
    },
    {
      name: "Role Management",
      permissions: [
        "view role",
        "add role",
        "edit role",
        "disable role",
        "view role",
        "add role",
        "view role",
        "edit role",
        "disable role",
        "view role",
        "add role",
        "edit role",
        "disable role",
        "view role",
        "add role",
        "edit role",
        "disable role",
        "view role",
        "disable role",
        "view role",
        "add role",
        "edit role",
        "disable role",
      ],
    },
    {
      name: "System Settings",
      permissions: [
        "view setting",
        "update setting",
        "view customer",
        "view audit trail",
        "view all task",
        "edit virtual",
        "view member",
        "view charts",
        "view customer",
        "update setting",
        "view supervisor task",
        "view department task",
        "view all task",
        "view overdue task",
        "view dashboard data",
        "can view cdr",
        "edit virtual",
        "view charts",
        "update setting",
        "view customer",
        "view audit trail",
        "view supervisor task",
        "view department task",
        "can view cdr",
        "view charts",
        "update setting",
        "view customer",
        "view audit trail",
        "view supervisor task",
        "view department task",
        "can view cdr",
        "view charts",
        "update setting",
        "view customer",
        "view audit trail",
        "view supervisor task",
        "view department task",
        "can view cdr",
        "view charts",
        "update setting",
        "view customer",
        "view audit trail",
        "view supervisor task",
        "view department task",
        "can view cdr",
        "view charts",
        "update setting",
        "view customer",
        "view audit trail",
        "view supervisor task",
        "view department task",
        "can view cdr",
        "view charts",
        "update setting",
        "view customer",
        "view audit trail",
        "view supervisor task",
        "view department task",
        "can view cdr",
        "view charts",
        "update setting",
        "view customer",
        "view audit trail",
        "view supervisor task",
        "view department task",
        "can view cdr",
        "view charts",
        "update setting",
        "view customer",
        "view audit trail",
      ],
    },
    {
      name: "System Report Settings",
      permissions: ["view report", "view report", "view report", "view report", "view report", "view report"],
    },
    {
      name: "System Task Settings",
      permissions: [
        "view feedback",
        "view my task",
        "add NHIF Enquiry",
        "view feedback",
        "view my task",
        "view feedback",
        "view my task",
        "view feedback",
        "view my task",
        "view feedback",
        "view my task",
        "view feedback",
        "view my task",
      ],
    },
    {
      name: "Layouts",
      permissions: [
        "view overdue task",
        "view dashboard",
        "view overdue task",
        "view overdue task",
        "view overdue task",
        "view overdue task",
        "view overdue task",
      ],
    },
    {
      name: "IVR Settings",
      permissions: ["edit ivr", "edit ivr", "edit ivr", "edit ivr", "edit ivr", "edit ivr"],
    },
    {
      name: "layout",
      permissions: [
        "edit virtual queue",
        "edit virtual queue",
        "edit virtual queue",
        "edit virtual queue",
        "edit virtual queue",
        "edit virtual queue",
      ],
    },
    {
      name: "Queues",
      permissions: [
        "view member",
        "edit member",
        "view member",
        "edit member",
        "view member",
        "edit member",
        "view member",
        "edit member",
        "view member",
        "edit member",
        "view member",
        "edit member",
      ],
    },
    {
      name: "Development",
      permissions: ["View Indevelopment"],
    },
    {
      name: "User management",
      permissions: [
        "disable/enable user",
        "reset user password",
        "disable/enable user",
        "reset user password",
        "disable/enable user",
        "reset user password",
      ],
    },
    {
      name: "Settings",
      permissions: [
        "view feedback",
        "view my task",
        "view feedback",
        "view my task",
        "view feedback",
        "view my task",
        "view feedback",
      ],
    },
    {
      name: "Agent Settings",
      permissions: [
        "view configrations",
        "view agent",
        "view dashboard data",
        "view backup",
        "view monitoring",
        "view support",
      ],
    },
  ])

  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set([
      "view dashboard",
      "view user",
      "add user",
      "edit user",
      "disable/enable user",
      "reset user password",
      "view role",
      "add role",
      "edit role",
      "view setting",
      "update setting",
      "view customer",
      "view audit trail",
      "view report",
      "view all task",
      "view dashboard data",
      "view charts",
    ]),
  )

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["User Modal", "Layout"]))

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName)
    } else {
      newExpanded.add(categoryName)
    }
    setExpandedCategories(newExpanded)
  }

  const togglePermission = (permission: string) => {
    const newSelected = new Set(selectedPermissions)
    if (newSelected.has(permission)) {
      newSelected.delete(permission)
    } else {
      newSelected.add(permission)
    }
    setSelectedPermissions(newSelected)
  }

  const selectAllInCategory = (category: PermissionCategory) => {
    const newSelected = new Set(selectedPermissions)
    category.permissions.forEach((p) => newSelected.add(p))
    setSelectedPermissions(newSelected)
  }

  const filteredCategories = permissionCategories
    .map((category) => ({
      ...category,
      permissions: category.permissions.filter((p) => p.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((category) => {
      if (searchQuery && category.permissions.length === 0) return false
      if (filterMode === "selected") {
        return category.permissions.some((p) => selectedPermissions.has(p))
      }
      return true
    })

  const handleSave = () => {
    console.log("Saving role:", { roleId, roleName, roleDescription, permissions: Array.from(selectedPermissions) })
    router.push("/dashboard/permissions")
  }

  const handleCancel = () => {
    router.push("/dashboard/permissions")
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Edit Role Permissions</h1>
        </div>

        {/* Role Information */}
        <div className="mb-6 rounded-lg border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1 w-12 bg-blue-600 rounded" />
            <h2 className="text-lg font-semibold text-blue-600">Role Information</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="roleName" className="text-base font-semibold">
                Role Name
              </Label>
              <Input id="roleName" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roleDescription" className="text-base font-semibold">
                Role Description
              </Label>
              <Input
                id="roleDescription"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="mb-6 rounded-lg border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1 w-12 bg-blue-600 rounded" />
            <h2 className="text-lg font-semibold text-blue-600">Permissions</h2>
          </div>

          <p className="mb-4 text-sm text-muted-foreground">
            Assign permissions to this role by checking the boxes below. Permissions are grouped by category.
          </p>

          {/* Search and Filter */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search permissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={filterMode === "all" ? "default" : "outline"}
                onClick={() => setFilterMode("all")}
                className={filterMode === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                All Categories
              </Button>
              <Button
                variant={filterMode === "selected" ? "default" : "outline"}
                onClick={() => setFilterMode("selected")}
                className={filterMode === "selected" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                Selected Only
              </Button>
            </div>
          </div>

          {/* Permission Categories */}
          <div className="space-y-4">
            {filteredCategories.map((category) => {
              const isExpanded = expandedCategories.has(category.name)
              const selectedCount = category.permissions.filter((p) => selectedPermissions.has(p)).length

              return (
                <div key={category.name} className="rounded-lg border bg-background">
                  <div className="flex items-center justify-between p-4">
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="flex items-center gap-2 text-left flex-1"
                    >
                      <div className="h-1 w-8 bg-blue-600 rounded" />
                      <span className="font-semibold text-foreground">{category.name}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-blue-600" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-blue-600" />
                      )}
                      <span className="text-blue-600 font-medium ml-2">Expand</span>
                    </button>

                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {selectedCount} / {category.permissions.length} permissions available
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => selectAllInCategory(category)}
                        className="text-sm"
                      >
                        Select All
                      </Button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.permissions.map((permission, idx) => (
                          <div key={`${permission}-${idx}`} className="flex items-center gap-2">
                            <Checkbox
                              id={`${category.name}-${permission}-${idx}`}
                              checked={selectedPermissions.has(permission)}
                              onCheckedChange={() => togglePermission(permission)}
                            />
                            <Label
                              htmlFor={`${category.name}-${permission}-${idx}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {permission}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleCancel} className="px-8 bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-8">
            Save Role
          </Button>
        </div>
      </div>
    </div>
  )
}
