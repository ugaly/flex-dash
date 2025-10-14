"use client"

import { useState } from "react"
import type { SummaryReportType, FormatType, SummaryReportConfig } from "@/types/report"
import { DateRangePicker } from "../date-range-picker"
import { FullDateRangePicker } from "../full-date-range-picker"

const REPORT_OPTIONS = [
  { value: "contact-center-performance", label: "Contact Center Performance" },
  { value: "agent-performance", label: "Agent Performance" },
  { value: "ivr-report", label: "IVR Report" },
  { value: "customer-end-to-ivr", label: "Customer end to ivr" },
  { value: "outgoing-calls", label: "Outgoing Calls" },
  { value: "recording-report", label: "Recordings Report" },
  { value: "yearly-contact-center-performance", label: "Yearly Contact Center Performance" },
  { value: "agent-state-log-report", label: "Agent State Log Report" },
  { value: "agent-outgoing-call-report", label: "Agent Outgoing Call Report" },
]

const QUEUE_OPTIONS = ["All", "MOHQUEUE", "ZssfQueueSw", "SMARTQUEUE", "ZssfQueueEn", "CITSQUEUE"]

const IVR_OPTIONS = ["All", "IVR_Main", "IVR_Support", "IVR_Sales"]

const AGENT_OPTIONS = ["All", "8112", "8090", "8092", "7028", "8114"]

function getReportConfig(reportType: SummaryReportType): SummaryReportConfig {
  switch (reportType) {
    case "contact-center-performance":
    case "agent-performance":
      return { showTargetField: true, targetFieldLabel: "Target Queue", showRecordingName: false }
    case "ivr-report":
      return { showTargetField: true, targetFieldLabel: "Target IVR", showRecordingName: false }
    case "recording-report":
      return { showTargetField: true, targetFieldLabel: "Target IVR", showRecordingName: true }
    case "agent-state-log-report":
    case "agent-outgoing-call-report":
      return { showTargetField: true, targetFieldLabel: "Agent", showRecordingName: false }
    case "customer-end-to-ivr":
    case "outgoing-calls":
    case "yearly-contact-center-performance":
      return { showTargetField: false, targetFieldLabel: "Target Queue", showRecordingName: false }
    default:
      return { showTargetField: true, targetFieldLabel: "Target Queue", showRecordingName: false }
  }
}

export function SummaryReportForm() {
  const [reportType, setReportType] = useState<SummaryReportType>("contact-center-performance")
  const [targetValue, setTargetValue] = useState("All")
  const [recordingName, setRecordingName] = useState("")
  const [dateRange, setDateRange] = useState("15/09/2025 20:19 - 14/10/2025 20:19")
  const [format, setFormat] = useState<FormatType>("preview")
  const [isLoading, setIsLoading] = useState(false)

  const config = getReportConfig(reportType)

  const getTargetOptions = () => {
    if (config.targetFieldLabel === "Target IVR") return IVR_OPTIONS
    if (config.targetFieldLabel === "Agent") return AGENT_OPTIONS
    return QUEUE_OPTIONS
  }

  const handlePrint = async () => {
    setIsLoading(true)
    console.log("[v0] Printing report:", {
      reportType,
      targetValue,
      recordingName,
      dateRange,
      format,
    })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-semibold text-gray-900">Reports</h2>
        <p className="text-sm text-gray-500 mt-1">Generate and export contact center performance reports</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Report <span className="text-red-500">*</span>
            </label>
            <select
              value={reportType}
              onChange={(e) => {
                setReportType(e.target.value as SummaryReportType)
                setTargetValue("All")
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white hover:border-gray-400"
            >
              {REPORT_OPTIONS.map((option) => (
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

          {config.showTargetField && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">{config.targetFieldLabel}</label>
              <select
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white hover:border-gray-400"
              >
                {getTargetOptions().map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {config.showRecordingName && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Recording Name</label>
              <input
                type="text"
                value={recordingName}
                onChange={(e) => setRecordingName(e.target.value)}
                placeholder="Enter recording name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
              />
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Format:</label>
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="format"
                  value="preview"
                  checked={format === "preview"}
                  onChange={(e) => setFormat(e.target.value as FormatType)}
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Preview</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  checked={format === "excel"}
                  onChange={(e) => setFormat(e.target.value as FormatType)}
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Excel</span>
              </label>
            </div>
          </div>

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
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4h10z"
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
