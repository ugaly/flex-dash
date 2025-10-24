"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Upload, Eye, ChevronUp, ChevronDown, X } from "lucide-react"

interface UserData {
  id: number
  fullName: string
  username: string
  extension: string
  loginId: string
  email: string
  role: string
  department: string
  registeredAt: string
  firstName: string
  middleName: string
  surname: string
  phone: string
  systemRole: string
  disabled: boolean
}

export default function UsersPage() {
  const [showUserForm, setShowUserForm] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const itemsPerPage = 10

  const [users] = useState<UserData[]>([
    {
      id: 1,
      fullName: "Super Flex Administrator",
      username: "8080",
      extension: "8080",
      loginId: "8080",
      email: "superadmin@flex.co.tz",
      role: "Super Admin",
      department: "",
      registeredAt: "1 year ago",
      firstName: "Super",
      middleName: "Flex",
      surname: "Administrator",
      phone: "",
      systemRole: "super_admin",
      disabled: false,
    },
    {
      id: 2,
      fullName: "Zainabu Amir",
      username: "zainabu.amir",
      extension: "8110",
      loginId: "zainabu.amir",
      email: "zainab@samakisamaki.co.tz",
      role: "Admin",
      department: "",
      registeredAt: "1 month ago",
      firstName: "Zainabu",
      middleName: "",
      surname: "Amir",
      phone: "",
      systemRole: "admin",
      disabled: false,
    },
    {
      id: 3,
      fullName: "Tshepo Dooka",
      username: "tshepo",
      extension: "8111",
      loginId: "tshepo",
      email: "tshepo@neuro-flux.com",
      role: "Admin",
      department: "",
      registeredAt: "1 month ago",
      firstName: "Tshepo",
      middleName: "",
      surname: "Dooka",
      phone: "",
      systemRole: "admin",
      disabled: false,
    },
    {
      id: 4,
      fullName: "Ritha Laurian",
      username: "ritha.laurian",
      extension: "8100",
      loginId: "ritha.laurian",
      email: "ritha.laurian@flex.co.tz",
      role: "Supervisor",
      department: "Customer Experience and Expansion -",
      registeredAt: "8 months ago",
      firstName: "Ritha",
      middleName: "",
      surname: "Laurian",
      phone: "",
      systemRole: "supervisor",
      disabled: false,
    },
    {
      id: 5,
      fullName: "NUNU Kay abdallah",
      username: "nunu.abdallah",
      extension: "8114",
      loginId: "nunu.abdallah",
      email: "nunu.abdallah@gmail.com",
      role: "Admin",
      department: "Service Delivery -",
      registeredAt: "1 month ago",
      firstName: "NUNU",
      middleName: "Kay",
      surname: "abdallah",
      phone: "",
      systemRole: "admin",
      disabled: false,
    },
    {
      id: 6,
      fullName: "Michael J Mwakyusa",
      username: "michael.mwakyusa",
      extension: "8096",
      loginId: "michael.mwakyusa",
      email: "michael.mwakyusa@flex.co.tz",
      role: "Super Admin",
      department: "",
      registeredAt: "11 months ago",
      firstName: "Michael",
      middleName: "J",
      surname: "Mwakyusa",
      phone: "",
      systemRole: "super_admin",
      disabled: false,
    },
    {
      id: 7,
      fullName: "Emmanuel Simon Mmanda",
      username: "8089",
      extension: "8089",
      loginId: "8089",
      email: "luneya17@gmail.com",
      role: "Super Admin",
      department: "",
      registeredAt: "1 year ago",
      firstName: "Emmanuel",
      middleName: "Simon",
      surname: "Mmanda",
      phone: "",
      systemRole: "super_admin",
      disabled: false,
    },
    {
      id: 8,
      fullName: "Justin Gara",
      username: "Justin",
      extension: "8113",
      loginId: "Justin",
      email: "justin@creativelabgroup.co",
      role: "Admin",
      department: "Management -",
      registeredAt: "1 month ago",
      firstName: "Justin",
      middleName: "",
      surname: "Gara",
      phone: "",
      systemRole: "admin",
      disabled: false,
    },
    {
      id: 9,
      fullName: "Nosipho Baloyi",
      username: "Nosipho",
      extension: "8112",
      loginId: "Nosipho",
      email: "nosipho@creativelabgroup.co",
      role: "Supervisor",
      department: "Management -",
      registeredAt: "1 month ago",
      firstName: "Nosipho",
      middleName: "",
      surname: "Baloyi",
      phone: "",
      systemRole: "supervisor",
      disabled: false,
    },
    {
      id: 10,
      fullName: "Stephen Lawi Odiero",
      username: "stephen.lawi",
      extension: "8102",
      loginId: "stephen.lawi",
      email: "stephen.lawi@flex.co.tz",
      role: "Supervisor",
      department: "Customer Experience and Expansion -",
      registeredAt: "8 months ago",
      firstName: "Stephen",
      middleName: "Lawi",
      surname: "Odiero",
      phone: "",
      systemRole: "supervisor",
      disabled: false,
    },
  ])

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (pwd.length >= 12) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/\d/.test(pwd)) strength++
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++
    return Math.min(strength, 4)
  }

  const passwordStrength = calculatePasswordStrength(password)

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase()
    return (
      user.fullName.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.department.toLowerCase().includes(query)
    )
  })

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = a[sortColumn as keyof UserData]
    const bValue = b[sortColumn as keyof UserData]
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)
  const paginatedUsers = sortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleViewUser = (user: UserData) => {
    setSelectedUser(user)
    setShowUserForm(true)
  }

  const handleBackToTable = () => {
    setShowUserForm(false)
    setSelectedUser(null)
    setPassword("")
    setConfirmPassword("")
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setShowUserForm(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="p-6">
        {!showUserForm ? (
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">USERS</h1>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Sample CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Sample Excel
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setShowImportModal(true)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import CSV/Excel
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAddUser}>
                  Add User
                </Button>
              </div>
            </div>

            <Card className="p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-4">Flex Users</h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Excel
                    </Button>
                    <Button variant="outline" size="sm">
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      Column visibility ▼
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Search:</span>
                    <Input
                      type="search"
                      placeholder=""
                      className="w-48"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto border rounded-lg overflow-hidden shadow-sm">
                
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer"
                        onClick={() => handleSort("fullName")}
                      >
                        <div className="flex items-center gap-1">
                          Full Name
                          {sortColumn === "fullName" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer"
                        onClick={() => handleSort("username")}
                      >
                        <div className="flex items-center gap-1">
                          Username
                          {sortColumn === "username" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer"
                        onClick={() => handleSort("extension")}
                      >
                        <div className="flex items-center gap-1">
                          Extension
                          {sortColumn === "extension" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer"
                        onClick={() => handleSort("loginId")}
                      >
                        <div className="flex items-center gap-1">
                          Login ID
                          {sortColumn === "loginId" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer"
                        onClick={() => handleSort("email")}
                      >
                        <div className="flex items-center gap-1">
                          Email
                          {sortColumn === "email" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer"
                        onClick={() => handleSort("role")}
                      >
                        <div className="flex items-center gap-1">
                          Role
                          {sortColumn === "role" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer"
                        onClick={() => handleSort("department")}
                      >
                        <div className="flex items-center gap-1">
                          Department
                          {sortColumn === "department" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold cursor-pointer"
                        onClick={() => handleSort("registeredAt")}
                      >
                        <div className="flex items-center gap-1">
                          Registered At
                          {sortColumn === "registeredAt" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3 text-sm">{user.fullName}</td>
                        <td className="px-4 py-3 text-sm">{user.username}</td>
                        <td className="px-4 py-3 text-sm">{user.extension}</td>
                        <td className="px-4 py-3 text-sm">{user.loginId}</td>
                        <td className="px-4 py-3 text-sm text-green-600">{user.email}</td>
                        <td className="px-4 py-3 text-sm">{user.role}</td>
                        <td className="px-4 py-3 text-sm">{user.department}</td>
                        <td className="px-4 py-3 text-sm">{user.registeredAt}</td>
                        <td className="px-4 py-3 text-sm">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye className="w-5 h-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, sortedUsers.length)} of {sortedUsers.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-end mb-4">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white" onClick={handleBackToTable}>
                Back
              </Button>
            </div>

            <Card className="p-0 overflow-hidden">
              <div className={selectedUser ? "bg-blue-600 text-white px-6 py-4" : "bg-gray-100 px-6 py-4"}>
                <h2 className={`text-xl font-semibold ${selectedUser ? "text-white" : "text-gray-800"}`}>
                  {selectedUser ? "Update User" : "Register User"}
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Input placeholder="Enter firstname" defaultValue={selectedUser?.firstName} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Middle Name</label>
                    <Input placeholder="Enter middlename" defaultValue={selectedUser?.middleName} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Surname <span className="text-red-500">*</span>
                    </label>
                    <Input placeholder="Enter surname" defaultValue={selectedUser?.surname} />
                  </div>
                </div>

                {/* Email, Phone, Username */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input type="email" placeholder="Enter email" defaultValue={selectedUser?.email} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <Input type="tel" placeholder="Enter phone number" defaultValue={selectedUser?.phone} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder={selectedUser ? "" : "8088"}
                      defaultValue={selectedUser?.username}
                      className={!selectedUser ? "bg-blue-50" : ""}
                    />
                  </div>
                </div>

                {/* Extension, Department, System Role */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Extension <span className="text-red-500">*</span>
                    </label>
                    <Input placeholder={selectedUser ? "" : "8115"} defaultValue={selectedUser?.extension} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <Select defaultValue={selectedUser?.department}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="customer_experience">Customer Experience and Expansion</SelectItem>
                        <SelectItem value="service_delivery">Service Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      System Role <span className="text-red-500">*</span>
                    </label>
                    <Select defaultValue={selectedUser?.systemRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Context (only for new users) */}
                {!selectedUser && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Context</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="context1">Context 1</SelectItem>
                          <SelectItem value="context2">Context 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Activation (only for existing users) */}
                {selectedUser && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Activation</label>
                    <div className="flex items-center gap-2">
                      <Checkbox id="disabled" defaultChecked={selectedUser?.disabled} />
                      <label htmlFor="disabled" className="text-sm">
                        Disabled
                      </label>
                    </div>
                  </div>
                )}

                {/* Save Changes Button (only for existing users) */}
                {selectedUser && (
                  <div className="flex justify-end">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">Save Changes</Button>
                  </div>
                )}

                {/* Password Section */}
                <div className={`space-y-4 ${selectedUser ? "pt-6 border-t" : ""}`}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {selectedUser ? "User password" : "Password"} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="password"
                        placeholder={selectedUser ? "Password" : "••••"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={!selectedUser && password ? "bg-blue-50" : ""}
                      />
                      {!selectedUser && password && (
                        <div className="flex gap-1 mt-2">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded ${
                                level <= passwordStrength ? "bg-gray-400" : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {selectedUser ? "Re-enter password" : "Confirm password"}
                      </label>
                      <Input
                        type="password"
                        placeholder={selectedUser ? "Renter Password" : "Confirm Password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      {selectedUser ? "Reset User Password" : "Add User"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-end mt-4">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white" onClick={handleBackToTable}>
                Back
              </Button>
            </div>
          </div>
        )}

        <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-semibold">Import Users from CSV/Excel</DialogTitle>
                {/* <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowImportModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button> */}
              </div>
            </DialogHeader>

            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    System Role <span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tenant <span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant1">Tenant 1</SelectItem>
                      <SelectItem value="tenant2">Tenant 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Select CSV or Excel File <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer text-sm"
                  >
                    Choose file
                  </label>
                  <span className="text-sm text-muted-foreground">
                    {selectedFile ? selectedFile.name : "No file chosen"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported formats: CSV (.csv) and Excel (.xlsx, .xls). File should contain columns: username,
                  firstname, middlename, surname, phone, email
                </p>
              </div>

              <div className="bg-cyan-600 text-white p-4 rounded-lg">
                <h3 className="font-semibold mb-3">File Format Requirements:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Columns: sn, username, email, firstname, middlename, surname, phone</li>
                  <li>• Users will be updated/created based on email and phone number matching</li>
                  <li>• middlename can be NULL or empty</li>
                  <li>• All other fields are required</li>
                  <li>• Selected role and tenant will be applied to all imported users</li>
                </ul>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowImportModal(false)}
                  className="bg-gray-500 text-white hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Import Users</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <footer className="h-10 bg-background border-t border-border flex items-center justify-between px-4 text-xs">
        <div>
          Copyright © 2025{" "}
          <a
            href="http://flex.co.tz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Fléx Contact Center Software
          </a>
          . All rights reserved.
        </div>
        <div className="font-semibold">V10.5.15</div>
      </footer>
    </div>
  )
}
