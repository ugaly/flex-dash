"use client"

import { useState } from "react"
import type { LogsReportType } from "@/types/report"
import { FullDateRangePicker } from "../full-date-range-picker"

const LOGS_REPORT_OPTIONS = [
    { value: "all-logs", label: "ALL LOGS" },
    { value: "logs-by-agent", label: "LOGS BY AGENT" },
]

const QUEUE_OPTIONS = ["All", "MOHQUEUE", "ZssfQueueSw", "SMARTQUEUE", "ZssfQueueEn", "CITSQUEUE"]

const AGENT_EXTENSIONS = ["extension", "8112", "8090", "8092", "7028", "8114"]

const DESPOSITION_OPTIONS = ["All", "COMPLETECALLER", "ABANDON", "RINGNOANSWER", "CONNECT", "COMPLETEAGENT"]

export function LogsReportForm() {
    const [reportType, setReportType] = useState<LogsReportType>("all-logs")
    const [queue, setQueue] = useState("All")
    const [agentExtension, setAgentExtension] = useState("extension")
    const [desposition, setDesposition] = useState("All")
    const [dateRange, setDateRange] = useState("15/09/2025 20:20 - 14/10/2025 20:20")
    const [isLoading, setIsLoading] = useState(false)

    const handlePrint = async () => {
        setIsLoading(true)
        console.log("[v0] Printing logs report:", {
            reportType,
            queue,
            agentExtension: reportType === "logs-by-agent" ? agentExtension : undefined,
            desposition,
            dateRange,
        })
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
    }

    return (
        <div className="space-y-8">
            <div className="border-b border-gray-200 pb-4">
                <h2 className="text-3xl font-semibold text-gray-900">Logs Reports</h2>
                <p className="text-sm text-gray-500 mt-1">View and export detailed call logs and agent activity</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Report <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value as LogsReportType)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white hover:border-gray-400"
                        >
                            {LOGS_REPORT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            {/* <input
                                type="text"
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                placeholder="Select date range"
                                className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
                            />
                            <svg
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg> */}
                            <FullDateRangePicker value={dateRange} onChange={setDateRange} />

                        </div>

                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Queue <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={queue}
                            onChange={(e) => setQueue(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white hover:border-gray-400"
                        >
                            {QUEUE_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {reportType === "logs-by-agent" && (
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Agent Extension <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={agentExtension}
                                onChange={(e) => setAgentExtension(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white hover:border-gray-400"
                            >
                                {AGENT_EXTENSIONS.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Desposition <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={desposition}
                            onChange={(e) => setDesposition(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white hover:border-gray-400"
                        >
                            {DESPOSITION_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
                    <button
                        onClick={handlePrint}
                        disabled={isLoading}
                        className="px-8 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 active:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                    />
                                </svg>
                                <span>Print</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
