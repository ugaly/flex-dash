"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EditQueuePage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("basic")

  // Mock data - replace with actual data fetching based on params.id
  const queueId = params.id

  const tabs = [
    { id: "basic", label: "Basic Settings" },
    { id: "agent", label: "Agent Options" },
    { id: "caller", label: "Caller Experience" },
    { id: "announcements", label: "Announcements" },
    { id: "destinations", label: "Destinations" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Queue updated", queueId)
    router.push("/queues")
  }

  return (
    <div className="queue-form-page">
      <div className="queue-form-container">
        <h1 className="queue-form-title">Edit Queue</h1>

        <div className="queue-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`queue-tab ${activeTab === tab.id ? "queue-tab-active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === "basic" && (
            <div className="queue-tab-content">
              <div className="queue-section">
                <h2 className="queue-section-title">Basic Queue Information</h2>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Queue Name <span className="queue-required">*</span>
                    </Label>
                    <Input type="text" className="queue-input" defaultValue="SMARTQUEUE" />
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">Description</Label>
                    <Input type="text" className="queue-input" />
                  </div>
                </div>
                <div className="queue-form-group queue-form-group-full">
                  <Label className="queue-label">
                    Music On Hold <span className="queue-required">*</span>
                  </Label>
                  <select className="queue-select-full">
                    <option>Select</option>
                  </select>
                </div>
              </div>

              <div className="queue-section">
                <h2 className="queue-section-title">Queue Processing Options</h2>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Queue No Answer <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="queueNoAnswer" value="yes" defaultChecked />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="queueNoAnswer" value="no" />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Call Confirmation: <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="callConfirmation" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="callConfirmation" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Call Confirm Announcement <span className="queue-required">*</span>
                    </Label>
                    <select className="queue-select-full">
                      <option>[ Select Option ]</option>
                    </select>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Queue Weight: <span className="queue-required">*</span>
                    </Label>
                    <Input type="number" defaultValue="0" className="queue-input" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="queue-form-actions">
            <Button type="submit" className="queue-save-btn">
              Save Queue Configuration
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
