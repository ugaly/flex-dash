"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FlexChartModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { name: string; description: string }) => void
  initialData?: {
    name: string
    description: string
  }
}

export function FlexChartModal({ isOpen, onClose, onSave, initialData }: FlexChartModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setDescription(initialData.description)
    } else {
      setName("")
      setDescription("")
    }
  }, [initialData, isOpen])

  const handleSave = () => {
    if (name.trim()) {
      onSave({ name, description })
      setName("")
      setDescription("")
    }
  }

  const handleBack = () => {
    setName("")
    setDescription("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="p-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-base font-semibold text-gray-700">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2"
                placeholder="Enter name"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-base font-semibold text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 min-h-[120px]"
                placeholder="Enter description"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={handleBack} className="bg-gray-500 text-white hover:bg-gray-600">
                Back
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700" disabled={!name.trim()}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
