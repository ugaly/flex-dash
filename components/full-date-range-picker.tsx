"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DateRangePickerProps {
  value: string
  onChange: (value: string) => void
}

export function FullDateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPresets, setShowPresets] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState("Last 7 Days")
  const [startMonth, setStartMonth] = useState(new Date())
  const [endMonth, setEndMonth] = useState(() => {
    const next = new Date()
    next.setMonth(next.getMonth() + 1)
    return next
  })
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [startTime, setStartTime] = useState({ hour: 3, minute: 2, period: "PM" })
  const [endTime, setEndTime] = useState({ hour: 3, minute: 2, period: "PM" })

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowPresets(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const presets = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
    "Last Month",
    "Last 3 Months",
    "Custom Range",
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const formatDate = (date: Date, time: { hour: number; minute: number; period: string }) => {
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const year = date.getFullYear()
    const hour = String(time.hour).padStart(2, "0")
    const minute = String(time.minute).padStart(2, "0")
    return `${month}/${day}/${year} ${hour}:${minute} ${time.period}`
  }

  const handleApply = () => {
    if (startDate && endDate) {
      const formattedStart = formatDate(startDate, startTime)
      const formattedEnd = formatDate(endDate, endTime)
      onChange(`${formattedStart} - ${formattedEnd}`)
      setIsOpen(false)
      setShowPresets(false)
    }
  }

  const handlePresetSelect = (preset: string) => {
    setSelectedPreset(preset)
    if (preset === "Custom Range") {
      setShowPresets(false)
      setIsOpen(true)
    } else {
      const now = new Date()
      let start = new Date()
      let end = new Date()

      switch (preset) {
        case "Today":
          start = new Date(now.setHours(0, 0, 0, 0))
          end = new Date()
          break
        case "Yesterday":
          start = new Date(now.setDate(now.getDate() - 1))
          start.setHours(0, 0, 0, 0)
          end = new Date(start)
          end.setHours(23, 59, 59, 999)
          break
        case "Last 7 Days":
          start = new Date(now.setDate(now.getDate() - 7))
          end = new Date()
          break
        case "Last 30 Days":
          start = new Date(now.setDate(now.getDate() - 30))
          end = new Date()
          break
        case "This Month":
          start = new Date(now.getFullYear(), now.getMonth(), 1)
          end = new Date()
          break
        case "Last Month":
          start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
          end = new Date(now.getFullYear(), now.getMonth(), 0)
          break
        case "Last 3 Months":
          start = new Date(now.setMonth(now.getMonth() - 3))
          end = new Date()
          break
      }

      setStartDate(start)
      setEndDate(end)
      const formattedStart = formatDate(start, startTime)
      const formattedEnd = formatDate(end, endTime)
      onChange(`${formattedStart} - ${formattedEnd}`)
      setShowPresets(false)
    }
  }

  const renderCalendar = (date: Date, isStart: boolean) => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(date)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const days = []

    const prevMonth = new Date(year, month, 0)
    const prevMonthDays = prevMonth.getDate()

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(
        <button
          key={`prev-${i}`}
          className="w-10 h-10 text-center text-gray-300 hover:bg-gray-50 rounded text-sm"
          type="button"
        >
          {prevMonthDays - i}
        </button>,
      )
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)
      const isSelected =
        (startDate && currentDate.toDateString() === startDate.toDateString()) ||
        (endDate && currentDate.toDateString() === endDate.toDateString())
      const isInRange =
        startDate && endDate && currentDate >= startDate && currentDate <= endDate && startDate !== endDate

      days.push(
        <button
          key={day}
          onClick={() => {
            if (!startDate || (startDate && endDate)) {
              setStartDate(currentDate)
              setEndDate(null)
            } else if (currentDate >= startDate) {
              setEndDate(currentDate)
            } else {
              setEndDate(startDate)
              setStartDate(currentDate)
            }
          }}
          className={`w-10 h-10 text-center rounded text-sm transition-colors ${
            isSelected
              ? "bg-blue-600 text-white font-semibold"
              : isInRange
                ? "bg-blue-100 text-blue-900"
                : "hover:bg-gray-100 text-gray-700"
          }`}
          type="button"
        >
          {day}
        </button>,
      )
    }

    const remainingCells = 42 - days.length
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <button
          key={`next-${i}`}
          className="w-10 h-10 text-center text-gray-300 hover:bg-gray-50 rounded text-sm"
          type="button"
        >
          {i}
        </button>,
      )
    }

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              const newDate = new Date(date)
              newDate.setMonth(newDate.getMonth() - 1)
              if (isStart) setStartMonth(newDate)
              else setEndMonth(newDate)
            }}
            className="p-1 hover:bg-gray-100 rounded"
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="font-semibold text-gray-900">
            {monthNames[month]} {year}
          </div>
          <button
            onClick={() => {
              const newDate = new Date(date)
              newDate.setMonth(newDate.getMonth() + 1)
              if (isStart) setStartMonth(newDate)
              else setEndMonth(newDate)
            }}
            className="p-1 hover:bg-gray-100 rounded"
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div
              key={day}
              className="w-10 h-8 text-center text-xs font-semibold text-gray-600 flex items-center justify-center"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <div className="relative">
          {/* <button
            onClick={() => setShowPresets(!showPresets)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
            type="button"
          >
            <span className="w-5 h-5 flex items-center justify-center">#</span>
            <span>Show</span>
          </button> */}

          {showPresets && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-50 w-48">
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePresetSelect(preset)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    selectedPreset === preset ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700"
                  }`}
                  type="button"
                >
                  {preset}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center border w-full h-10 rounded-md overflow-hidden shadow-sm bg-white">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gray-100 px-3 py-2 border-r hover:bg-gray-200 transition-colors"
            type="button"
          >
            <Calendar className="h-5 w-5 text-gray-600" />
          </button>
          <Input
            type="text"
            value={value}
            readOnly
            onClick={() => setIsOpen(!isOpen)}
            className="border-0 shadow-none focus-visible:ring-0 cursor-pointer min-w-[320px]"
            placeholder="Select date range"
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-2xl z-50">
          <div className="flex">
            {renderCalendar(startMonth, true)}
            <div className="w-px bg-gray-200" />
            {renderCalendar(endMonth, false)}
          </div>

          <div className="border-t p-4 bg-gray-50">
            {/* <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <select
                  value={startTime.hour}
                  onChange={(e) => setStartTime({ ...startTime, hour: Number(e.target.value) })}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <span>:</span>
                <select
                  value={startTime.minute}
                  onChange={(e) => setStartTime({ ...startTime, minute: Number(e.target.value) })}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                    <option key={m} value={m}>
                      {String(m).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  value={startTime.period}
                  onChange={(e) => setStartTime({ ...startTime, period: e.target.value })}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>

              <span className="text-gray-400">-</span>

              <div className="flex items-center gap-2">
                <select
                  value={endTime.hour}
                  onChange={(e) => setEndTime({ ...endTime, hour: Number(e.target.value) })}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <span>:</span>
                <select
                  value={endTime.minute}
                  onChange={(e) => setEndTime({ ...endTime, minute: Number(e.target.value) })}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                    <option key={m} value={m}>
                      {String(m).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  value={endTime.period}
                  onChange={(e) => setEndTime({ ...endTime, period: e.target.value })}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div> */}

            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)} size="sm">
                Cancel
              </Button>
              <Button onClick={handleApply} className="bg-blue-600 hover:bg-blue-700" size="sm">
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
