
// "use client"
// export default function AdminDashboardPage() {
 
//   return (
//     <div className="h-full m-0 p-0">
//       <div className="h-full  overflow-hidden border border-border/50 ">
//         <iframe
//           src="https://flxcc.flex.co.tz/flex-portal/dashboard"
//           className="w-full h-full"
//           title="Call Center"
//           sandbox="
//           allow-same-origin
//           allow-scripts
//           allow-popups
//           allow-forms
//           allow-modals
//           allow-downloads
//           allow-presentation
//           allow-top-navigation
//           allow-popups-to-escape-sandbox
//           "
//         />
//       </div>
//     </div>
//   )
// }



"use client"

import { useState } from "react"
import { FlexChartCard } from "@/components/flex-chart/flex-chart-card"
import { FlexChartModal } from "@/components/flex-chart/flex-chart-modal"
import { Plus } from "lucide-react"
import type { FlexChart } from "@/types/flex-chart"

export default function FlexChartPage() {
  const [charts, setCharts] = useState<FlexChart[]>([
    {
      id: "1",
      name: "FLEX CC",
      description: "Flex CC Dashboards",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "FLEX CRM",
      description: "Flex CRM Dashboards",
      createdAt: new Date().toISOString(),
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingChart, setEditingChart] = useState<FlexChart | null>(null)

  const handleAddNew = () => {
    setEditingChart(null)
    setIsModalOpen(true)
  }

  const handleEditChart = (chart: FlexChart) => {
    setEditingChart(chart)
    setIsModalOpen(true)
  }

  const handleSave = (data: { name: string; description: string }) => {
    if (editingChart) {
      // Update existing chart
      setCharts(charts.map((chart) => (chart.id === editingChart.id ? { ...chart, ...data } : chart)))
    } else {
      // Add new chart
      const newChart: FlexChart = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        createdAt: new Date().toISOString(),
      }
      setCharts([...charts, newChart])
    }
    setIsModalOpen(false)
    setEditingChart(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {charts.map((chart) => (
            <FlexChartCard key={chart.id} chart={chart} onClick={() => handleEditChart(chart)} />
          ))}

          {/* Add New Card */}
          <div
            onClick={handleAddNew}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition-colors min-h-[150px]"
          >
            <Plus className="w-12 h-12 text-cyan-500 mb-2" />
            <span className="text-lg font-semibold text-cyan-500">Add New</span>
          </div>
        </div>
      </div>

      <FlexChartModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingChart(null)
        }}
        onSave={handleSave}
        initialData={
          editingChart
            ? {
                name: editingChart.name,
                description: editingChart.description,
              }
            : undefined
        }
      />
    </div>
  )
}
