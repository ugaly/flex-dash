"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    Phone,
    Mail,
    Play,
    Download,
    CalendarIcon,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Filter,
    Users,
    Voicemail,
    Clock,
    PhoneMissed,
} from "lucide-react"
import { useCallManager } from "@/contexts/call-manager-context"
import { SharedCallManagerPanel } from "@/components/shared-call-manager-panel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

const mockData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    phoneNumber: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    lastCallDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    numberOfCalls: Math.floor(Math.random() * 10) + 1,
    hasVoicemail: Math.random() > 0.5,
}))

type DateFilter = "today" | "week" | "month" | "custom"
type SortField = "phoneNumber" | "lastCallDate" | "numberOfCalls"
type SortDirection = "asc" | "desc" | null

export default function MissedCallsPage() {
    const { isVisible, panelWidth, toggleVisibility, isMinimized } = useCallManager()
    const [entriesPerPage, setEntriesPerPage] = useState("10")
    const [currentPage, setCurrentPage] = useState(1)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [dateFilter, setDateFilter] = useState<DateFilter | null>(null)
    const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: undefined,
        to: undefined,
    })
    const [sortField, setSortField] = useState<SortField | null>(null)
    const [sortDirection, setSortDirection] = useState<SortDirection>(null)

    const showPanel = isVisible && !isMinimized

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            if (sortDirection === "asc") {
                setSortDirection("desc")
            } else if (sortDirection === "desc") {
                setSortField(null)
                setSortDirection(null)
            }
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const handleExport = () => {
        const csvContent = [
            ["Phone Number", "Last Call Date", "No of Calls", "Voicemail"],
            ...mockData.map((row) => [
                row.phoneNumber,
                row.lastCallDate,
                row.numberOfCalls.toString(),
                row.hasVoicemail ? "Yes" : "No",
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `missed-calls-${format(new Date(), "yyyy-MM-dd")}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const sortedData = [...mockData].sort((a, b) => {
        if (!sortField || !sortDirection) return 0

        let aValue: string | number = ""
        let bValue: string | number = ""

        if (sortField === "phoneNumber") {
            aValue = a.phoneNumber
            bValue = b.phoneNumber
        } else if (sortField === "lastCallDate") {
            aValue = new Date(a.lastCallDate).getTime()
            bValue = new Date(b.lastCallDate).getTime()
        } else if (sortField === "numberOfCalls") {
            aValue = a.numberOfCalls
            bValue = b.numberOfCalls
        }

        if (sortDirection === "asc") {
            return aValue > bValue ? 1 : -1
        } else {
            return aValue < bValue ? 1 : -1
        }
    })

    const totalEntries = sortedData.length
    const entriesCount = Number.parseInt(entriesPerPage)
    const totalPages = Math.ceil(totalEntries / entriesCount)
    const startIndex = (currentPage - 1) * entriesCount
    const endIndex = startIndex + entriesCount
    const currentData = sortedData.slice(startIndex, endIndex)

    const handleRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => setIsRefreshing(false), 1000)
    }

    const renderSortIcon = (field: SortField) => {
        if (sortField !== field) {
            return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        }
        if (sortDirection === "asc") {
            return <ArrowUp className="ml-2 h-4 w-4" />
        }
        return <ArrowDown className="ml-2 h-4 w-4" />
    }

    const totalMissedCalls = mockData.length
    const totalVoicemails = mockData.filter(row => row.hasVoicemail).length
    const recentCalls = mockData.filter(row => {
        const callDate = new Date(row.lastCallDate)
        const today = new Date()
        return (today.getTime() - callDate.getTime()) < 24 * 60 * 60 * 1000 // Last 24 hours
    }).length

    return (
        <div className="h-screen flex relative bg-background">
            <div
                className="relative transition-all duration-300 ease-in-out flex flex-col"
                style={{ width: showPanel ? `${100 - panelWidth}%` : "100%" }}
            >

                <div className="flex-1 overflow-auto p-6">
                    <div className="bg-card  border border-border ">
                        <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-slate-50 to-blue-50/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Users className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Voice Mail and CallBack</h2>
                                    <p className="text-sm text-gray-600">Manage your missed calls and voicemail messages</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRefresh}
                                    disabled={isRefreshing}
                                    className="h-10 gap-2 border-blue-200 hover:bg-blue-50"
                                >
                                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                                    Refresh
                                </Button>
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={handleExport}
                                    className="h-10 gap-2 bg-blue-600 hover:bg-blue-700"
                                >
                                    <Download className="h-4 w-4" />
                                    Export CSV
                                </Button>
                            </div>
                        </div>

                        {/* Filters Section */}
                        {/* <div className="flex items-center gap-3 p-4 border-b border-border bg-blue-50/20">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-gray-700">Filter by date:</span>
                            </div>
                            <Button
                                variant={dateFilter === "today" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setDateFilter("today")}
                                className="h-8 gap-2 bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                            >
                                Today
                            </Button>
                            <Button
                                variant={dateFilter === "week" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setDateFilter("week")}
                                className="h-8 gap-2 bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                            >
                                This Week
                            </Button>
                            <Button
                                variant={dateFilter === "month" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setDateFilter("month")}
                                className="h-8 gap-2 bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                            >
                                This Month
                            </Button>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={dateFilter === "custom" ? "default" : "outline"}
                                        size="sm"
                                        className="h-8 gap-2 bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                                    >
                                        <CalendarIcon className="h-3.5 w-3.5" />
                                        Custom Range
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        selected={{ from: customDateRange.from, to: customDateRange.to }}
                                        onSelect={(range) => {
                                            setCustomDateRange({ from: range?.from, to: range?.to })
                                            if (range?.from && range?.to) {
                                                setDateFilter("custom")
                                            }
                                        }}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                            {dateFilter && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setDateFilter(null)
                                        setCustomDateRange({ from: undefined, to: undefined })
                                    }}
                                    className="h-8 text-gray-500 hover:text-gray-700"
                                >
                                    Clear
                                </Button>
                            )}
                        </div> */}

                        <div className="flex items-center justify-between p-4 border-b border-border bg-gray-50/50">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Show</span>
                                <Select
                                    value={entriesPerPage}
                                    onValueChange={(value) => {
                                        setEntriesPerPage(value)
                                        setCurrentPage(1)
                                    }}
                                >
                                    <SelectTrigger className="w-[100px] border-gray-300">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-gray-600">entries</span>
                            </div>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                                Total: {totalEntries} records
                            </Badge>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50/30 hover:bg-blue-50">
                                    <TableHead className="w-[250px]">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleSort("phoneNumber")}
                                            className="h-8 px-3 font-bold text-gray-900 hover:bg-blue-100/50 gap-2"
                                        >
                                            <Phone className="h-4 w-4 text-blue-600" />
                                            Phone Number
                                            {renderSortIcon("phoneNumber")}
                                        </Button>
                                    </TableHead>
                                    <TableHead className="w-[180px]">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleSort("lastCallDate")}
                                            className="h-8 px-3 font-bold text-gray-900 hover:bg-blue-100/50 gap-2"
                                        >
                                            <CalendarIcon className="h-4 w-4 text-blue-600" />
                                            Last Call Date
                                            {renderSortIcon("lastCallDate")}
                                        </Button>
                                    </TableHead>
                                    <TableHead className="w-[150px]">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleSort("numberOfCalls")}
                                            className="h-8 px-3 font-bold text-gray-900 hover:bg-blue-100/50 gap-2"
                                        >
                                            <Clock className="h-4 w-4 text-blue-600" />
                                            No of Calls
                                            {renderSortIcon("numberOfCalls")}
                                        </Button>
                                    </TableHead>
                                    <TableHead className="w-[150px] font-bold text-gray-900">
                                        <div className="flex items-center gap-2">
                                            <Voicemail className="h-4 w-4 text-blue-600" />
                                            Voicemail
                                        </div>
                                    </TableHead>
                                    <TableHead className="w-[200px] font-bold text-gray-900 text-center">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentData.map((row) => (
                                    <TableRow key={row.id} className="hover:bg-blue-50/30 transition-colors">
                                        <TableCell className="font-semibold text-gray-900">
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-blue-600" />
                                                {row.phoneNumber}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="h-4 w-4 text-gray-400" />
                                                {row.lastCallDate}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                                {row.numberOfCalls} calls
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {row.hasVoicemail ? (
                                                <Button variant="outline" size="sm"className="h-8 gap-2 bg-green-50 border-green-200 text-green-700 hover:text-gray-900 hover:bg-slate-100 cursor-pointer transition-colors">
                                                    <Play className="h-3 w-3" />
                                                    Play Voicemail
                                                </Button>
                                            ) : (
                                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                                    <Voicemail className="h-3 w-3" />
                                                    No voicemail
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 justify-center">
                                                <Button variant="outline" size="sm" className="h-8 gap-2 bg-blue-50 border-blue-200 text-blue-700 hover:text-gray-900 hover:bg-slate-100 cursor-pointer transition-colors">
                                                    <Phone className="h-3 w-3" />
                                                    Call Back
                                                </Button>
                                                <Button variant="outline" size="sm" className="h-8 gap-2 bg-gray-50 border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-slate-100 cursor-pointer transition-colors">
                                                    <Mail className="h-3 w-3" />
                                                    Email
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="flex items-center justify-between p-4 border-t border-border bg-gray-50/50">
                            <div className="text-sm text-gray-600">
                                Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries
                            </div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-blue-50"}
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum: number
                                        if (totalPages <= 5) {
                                            pageNum = i + 1
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i
                                        } else {
                                            pageNum = currentPage - 2 + i
                                        }
                                        return (
                                            <PaginationItem key={pageNum}>
                                                <PaginationLink
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    isActive={currentPage === pageNum}
                                                    className={`cursor-pointer ${currentPage === pageNum
                                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                                        : "hover:bg-blue-50"
                                                        }`}
                                                >
                                                    {pageNum}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )
                                    })}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-blue-50"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>

            {showPanel && <SharedCallManagerPanel />}
        </div>
    )
}