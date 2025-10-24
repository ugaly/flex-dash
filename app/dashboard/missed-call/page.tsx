"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Phone } from "lucide-react"
import { useCallManager } from "@/contexts/call-manager-context"
import { SharedCallManagerPanel } from "@/components/shared-call-manager-panel"

export default function MissedCallsPage() {
  const { isVisible, panelWidth, toggleVisibility, isMinimized } = useCallManager()

  const showPanel = isVisible && !isMinimized

  return (
    <div className="h-screen flex relative bg-background">
      <div
        className="relative transition-all duration-300 ease-in-out"
        style={{ width: showPanel ? `${100 - panelWidth}%` : "100%" }}
      >
        <div className="border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Phone className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Missed Calls</h1>
          </div>
          <Button variant="secondary" size="icon" onClick={toggleVisibility} className="h-10 w-10 rounded-xl">
            {showPanel ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Missed Calls</h2>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="font-medium">+1 (555) 123-456{i}</p>
                        <p className="text-sm text-muted-foreground">
                          {i} hour{i > 1 ? "s" : ""} ago
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Call Back
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPanel && <SharedCallManagerPanel />}
    </div>
  )
}
