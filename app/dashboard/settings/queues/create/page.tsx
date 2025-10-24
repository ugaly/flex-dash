"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateQueuePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")

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
    console.log("Queue saved")
    router.push("/queues")
  }

  return (
    <div className="queue-form-page">
      <div className="queue-form-container">
        <h1 className="queue-form-title">Create New Queue</h1>

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
                    <Input type="text" className="queue-input" />
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

          {activeTab === "agent" && (
            <div className="queue-tab-content">
              <div className="queue-section">
                <h2 className="queue-section-title">Agent Settings</h2>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Agent Timeout (sec) <span className="queue-required">*</span>
                    </Label>
                    <Input type="number" className="queue-input" />
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Agent Timeout Restart <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="agentTimeoutRestart" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="agentTimeoutRestart" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Retry (sec) <span className="queue-required">*</span>
                    </Label>
                    <Input type="number" className="queue-input" />
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Wrap-up Time (sec) <span className="queue-required">*</span>
                    </Label>
                    <Input type="number" className="queue-input" />
                  </div>
                </div>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Member Delay (sec) <span className="queue-required">*</span>
                    </Label>
                    <Input type="number" className="queue-input" />
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Agent Announcement <span className="queue-required">*</span>
                    </Label>
                    <Input type="text" className="queue-input" />
                  </div>
                </div>
              </div>

              <div className="queue-section">
                <h2 className="queue-section-title">Agent Auto-Pause Options</h2>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Auto Pause <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="autoPause" value="all" />
                        <span>All</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="autoPause" value="queue" />
                        <span>Queue</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="autoPause" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Auto Pause Delay (sec) <span className="queue-required">*</span>
                    </Label>
                    <Input type="number" defaultValue="0" className="queue-input" />
                  </div>
                </div>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Auto Pause Busy <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="autoPauseBusy" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="autoPauseBusy" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Auto Pause Unavailable <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="autoPauseUnavailable" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="autoPauseUnavailable" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="queue-section">
                <h2 className="queue-section-title">Agent Restrictions</h2>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Restrict Dynamic Agents <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="restrictDynamicAgents" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="restrictDynamicAgents" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Agent Restriction <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="agentRestriction" value="none" defaultChecked />
                        <span>None</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="agentRestriction" value="moderate" />
                        <span>Moderate</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="agentRestriction" value="strict" />
                        <span>Strict</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Agents Regex <span className="queue-required">*</span>
                    </Label>
                    <Input type="text" className="queue-input" />
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Ringer Strategy <span className="queue-required">*</span>
                    </Label>
                    <select className="queue-select-full">
                      <option>Weighted Random</option>
                    </select>
                  </div>
                </div>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Auto Fill <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="autoFill" value="yes" defaultChecked />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="autoFill" value="no" />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Skip Busy Agent <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="skipBusyAgent" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="skipBusyAgent" value="yes" />
                        <span>Yes</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "caller" && (
            <div className="queue-tab-content">
              <div className="queue-section">
                <h2 className="queue-section-title">Caller Experience</h2>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Maximum Wait Time (sec) <span className="queue-required">*</span>
                    </Label>
                    <Input type="number" className="queue-input" />
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Wait Time Mode <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="waitTimeMode" value="absolute" defaultChecked />
                        <span>Absolute</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="waitTimeMode" value="relative" />
                        <span>Relative</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">Maximum Callers</Label>
                    <Input type="number" className="queue-input" />
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Service Level (sec) <span className="queue-required">*</span>
                    </Label>
                    <Input type="number" className="queue-input" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "announcements" && (
            <div className="queue-tab-content">
              <div className="queue-section">
                <h2 className="queue-section-title">Announcement Settings</h2>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Join Announcement <span className="queue-required">*</span>
                    </Label>
                    <select className="queue-select-full">
                      <option>Select</option>
                    </select>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Periodic Announcement <span className="queue-required">*</span>
                    </Label>
                    <select className="queue-select-full">
                      <option>Select</option>
                    </select>
                  </div>
                </div>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Relative Periodic Announce <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="relativePeriodicAnnounce" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="relativePeriodicAnnounce" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Random Periodic Announce <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="randomPeriodicAnnounce" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="randomPeriodicAnnounce" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="queue-section">
                <h2 className="queue-section-title">Position and Hold Time Announcements</h2>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Announce Position <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="announcePosition" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="announcePosition" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Announce Hold Time <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="announceHoldTime" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="announceHoldTime" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Announcement Frequency (sec) <span className="queue-required">*</span>
                    </Label>
                    <Input type="number" className="queue-input" />
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Minimum Interval <span className="queue-required">*</span>
                    </Label>
                    <select className="queue-select-full">
                      <option>15 seconds</option>
                    </select>
                  </div>
                </div>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Repeat Frequency (sec) <span className="queue-required">*</span>
                    </Label>
                    <Input type="number" className="queue-input" />
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      IVR Break <span className="queue-required">*</span>
                    </Label>
                    <select className="queue-select-full">
                      <option>None</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="queue-section">
                <h2 className="queue-section-title">Additional Announcement Options</h2>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      CID Name Prefix <span className="queue-required">*</span>
                    </Label>
                    <Input type="text" className="queue-input" />
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Wait Time Prefix <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="waitTimePrefix" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="waitTimePrefix" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Report Hold Time <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="reportHoldTime" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="reportHoldTime" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Alert Info <span className="queue-required">*</span>
                    </Label>
                    <select className="queue-select-full">
                      <option>None</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "destinations" && (
            <div className="queue-tab-content">
              <div className="queue-section">
                <h2 className="queue-section-title">Queue Destinations</h2>
                <p className="queue-section-subtitle">Empty Queue Options</p>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Join Empty <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="joinEmpty" value="yes" defaultChecked />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="joinEmpty" value="no" />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Leave Empty <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="leaveEmpty" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="leaveEmpty" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Penalty Members Limit <span className="queue-required">*</span>
                    </Label>
                    <Input type="number" defaultValue="0" className="queue-input" />
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Service Level (sec) <span className="queue-required">*</span>
                    </Label>
                    <select className="queue-select-full">
                      <option>10 seconds</option>
                    </select>
                  </div>
                </div>

                <p className="queue-section-subtitle">Call Recording Options</p>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Call Recording <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="callRecording" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="callRecording" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Mark Calls <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="markCalls" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="markCalls" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <p className="queue-section-subtitle">Ringer Options</p>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Ringer Volume Override <span className="queue-required">*</span>
                    </Label>
                    <select className="queue-select-full">
                      <option>Default</option>
                    </select>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Ringer Mode <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="ringerMode" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="ringerMode" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <p className="queue-section-subtitle">Statistics and Fallback Destinations</p>
                <div className="queue-form-grid">
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Queue Statistics <span className="queue-required">*</span>
                    </Label>
                    <div className="queue-radio-group">
                      <label className="queue-radio-label">
                        <input type="radio" name="queueStatistics" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label className="queue-radio-label">
                        <input type="radio" name="queueStatistics" value="no" defaultChecked />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div className="queue-form-group">
                    <Label className="queue-label">
                      Maximum Callers <span className="queue-required">*</span>
                    </Label>
                    <Input type="number" className="queue-input" />
                  </div>
                </div>
              </div>

              <div className="queue-section">
                <h2 className="queue-section-title">Queue Fallback Destinations</h2>
                <div className="queue-fallback-table">
                  <div className="queue-fallback-header">
                    <div className="queue-fallback-col">TYPE</div>
                    <div className="queue-fallback-col">DESTINATION</div>
                  </div>
                  <div className="queue-fallback-row">
                    <div className="queue-fallback-col">
                      <select className="queue-select-full">
                        <option>[ Select Option ]</option>
                      </select>
                    </div>
                    <div className="queue-fallback-col"></div>
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
