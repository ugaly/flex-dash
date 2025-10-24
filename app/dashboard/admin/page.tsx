"use client"

import type React from "react"

import { useState, useEffect } from "react"

export default function ManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const navItems = document.querySelectorAll(".imported-nav-item")
    const query = searchQuery.toLowerCase().trim()

    navItems.forEach((item) => {
      if (query === "") {
        ;(item as HTMLElement).style.display = ""
        return
      }

      const title = item.querySelector(".imported-nav-title")?.textContent?.toLowerCase() || ""
      const description = item.querySelector(".imported-nav-item p")?.textContent?.toLowerCase() || ""

      if (title.includes(query) || description.includes(query)) {
        ;(item as HTMLElement).style.display = ""
      } else {
        ;(item as HTMLElement).style.display = "none"
      }
    })
  }, [searchQuery])

  const handleSearch = () => {
    // Search is handled by useEffect
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="imported-body">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="imported-container">
        <header className="imported-header">
          <h2 className="imported-h2 font-bold">Management Console</h2>
        </header>

        <div className="imported-search-bar">
          <input
            type="text"
            placeholder="Search for functions or settings..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={handleKeyUp}
            className="imported-search-input"
          />
          <button type="button" onClick={handleSearch} className="imported-search-button">
            <i className="fas fa-search"></i> Search
          </button>
        </div>

        <div className="imported-nav-grid">
          <a className="imported-nav-item" href="https://cc.flex.co.tz/admin/stats">
            <div className="imported-nav-icon">
              <i className="fa fa-line-chart"></i>
            </div>
            <div className="imported-nav-title">Call Statistics</div>
            <p>View comprehensive call analytics and performance metrics for the system.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/admin/flex-charts">
            <div className="imported-nav-icon">
              <i className="fa fa-bar-chart"></i>
            </div>
            <div className="imported-nav-title">Flex Charts</div>
            <p>Access customizable data visualization tools for contact center metrics and analytics.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/agents">
            <div className="imported-nav-icon">
              <i className="fa fa-users"></i>
            </div>
            <div className="imported-nav-title">Agents</div>
            <p>Manage contact center agents, including profile settings, extensions, and performance tracking.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/reports">
            <div className="imported-nav-icon">
              <i className="fa fa-file-pdf"></i>
            </div>
            <div className="imported-nav-title">Reports</div>
            <p>Generate and export detailed reports on contact center activities and performance.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/cdr/all">
            <div className="imported-nav-icon">
              <i className="fa fa-phone"></i>
            </div>
            <div className="imported-nav-title">CDR</div>
            <p>Access Call Detail Records for reviewing and searching call history information.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/broadcasts">
            <div className="imported-nav-icon">
              <i className="fa fa-bullhorn"></i>
            </div>
            <div className="imported-nav-title">Call Campaigns</div>
            <p>Create and manage outbound call campaigns and broadcasting initiatives.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings">
            <div className="imported-nav-icon">
              <i className="fa fa-cogs"></i>
            </div>
            <div className="imported-nav-title">Settings</div>
            <p>Configure general system settings and preferences for the platform.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/roles">
            <div className="imported-nav-icon">
              <i className="fa fa-key"></i>
            </div>
            <div className="imported-nav-title">Role / Permissions</div>
            <p>Manage user roles and assign granular permissions for system access control.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/ivrs">
            <div className="imported-nav-icon">
              <i className="fa fa-volume-up"></i>
            </div>
            <div className="imported-nav-title">IVR</div>
            <p>Configure Interactive Voice Response menus and call flow structures.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings">
            <div className="imported-nav-icon">
              <i className="fa fa-users"></i>
            </div>
            <div className="imported-nav-title">Users</div>
            <p>Manage system users, including account creation, permissions, and profile settings.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/queues">
            <div className="imported-nav-icon">
              <i className="fa fa-list-ul"></i>
            </div>
            <div className="imported-nav-title">Queue</div>
            <p>Configure and manage call queues for efficient call distribution and handling.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/configs">
            <div className="imported-nav-icon">
              <i className="fa fa-cog"></i>
            </div>
            <div className="imported-nav-title">Configurations</div>
            <p>Access advanced system configuration options and technical settings.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/recordings">
            <div className="imported-nav-icon">
              <i className="fa fa-microphone"></i>
            </div>
            <div className="imported-nav-title">Recordings</div>
            <p>Manage call recordings, including storage, playback, and retention policies.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/setting/time-group">
            <div className="imported-nav-icon">
              <i className="fa fa-clock"></i>
            </div>
            <div className="imported-nav-title">Time Group</div>
            <p>Configure time-based groupings for scheduling call handling rules.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/setting/time-condition">
            <div className="imported-nav-icon">
              <i className="fa fa-calendar"></i>
            </div>
            <div className="imported-nav-title">Time Condition</div>
            <p>Set conditional rules for call routing based on date, time, and scheduling parameters.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/inbound-route">
            <div className="imported-nav-icon">
              <i className="fa fa-arrow-circle-down"></i>
            </div>
            <div className="imported-nav-title">Inbound Routes</div>
            <p>Configure routing rules for incoming calls based on various criteria.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/outbounds">
            <div className="imported-nav-icon">
              <i className="fa fa-arrow-circle-up"></i>
            </div>
            <div className="imported-nav-title">Outbound Routes</div>
            <p>Manage routing configurations for outgoing calls and trunk selection rules.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/departments">
            <div className="imported-nav-icon">
              <i className="fa fa-building"></i>
            </div>
            <div className="imported-nav-title">Departments</div>
            <p>Manage organizational departments for call routing and agent grouping.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/cdrs/configaration">
            <div className="imported-nav-icon">
              <i className="fa fa-language"></i>
            </div>
            <div className="imported-nav-title">CDR Configuration</div>
            <p>Configure Call Detail Record settings, including field customization and display options.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/trunks">
            <div className="imported-nav-icon">
              <i className="fa fa-road"></i>
            </div>
            <div className="imported-nav-title">Trunks</div>
            <p>Manage SIP trunks and connectivity options for external communications.</p>
          </a>

          <a className="imported-nav-item" href="https://cc.flex.co.tz/flex/settings/security">
            <div className="imported-nav-icon">
              <i className="fa fa-lock"></i>
            </div>
            <div className="imported-nav-title">Security</div>
            <p>Configure security settings, including authentication policies and access controls.</p>
          </a>
        </div>
      </div>
    </div>
  )
}
