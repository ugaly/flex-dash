"use client"

import { useState } from "react"
import { SummaryReportForm } from "@/components/reports/summary-report-form"
import { LogsReportForm } from "@/components/reports/logs-report-form"

type TabType = "summary" | "logs"

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("summary")

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className=" mx-auto">
        {/* max-w-7xl */}
        <div className="bg-white rounded-t-lg border-b border-gray-200 shadow-sm">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("summary")}
              className={`px-8 py-4 font-medium text-sm transition-all relative ${
                activeTab === "summary"
                  ? "text-blue-600 bg-white"
                  : "text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              Summary Report
              {activeTab === "summary" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`px-8 py-4 font-medium text-sm transition-all relative ${
                activeTab === "logs"
                  ? "text-blue-600 bg-white"
                  : "text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              LOGS Reports
              {activeTab === "logs" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-b-lg shadow-sm p-8">
          {activeTab === "summary" ? <SummaryReportForm /> : <LogsReportForm />}
        </div>
      </div>
    </div>
  )
}
