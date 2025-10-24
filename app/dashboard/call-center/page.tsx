"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCallManager } from "@/contexts/call-manager-context"
import { SharedCallManagerPanel } from "@/components/shared-call-manager-panel"
import { useState } from "react"

export default function CallCenterPage() {
  const { isVisible, panelWidth, toggleVisibility, isMinimized } = useCallManager()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const showPanel = isVisible && !isMinimized

  return (
    <div className="h-screen flex relative">
      <div
        className={cn("relative transition-all duration-300 ease-in-out", isFullscreen && "fixed inset-0 z-50")}
        style={{ width: isFullscreen ? "100%" : showPanel ? `${100 - panelWidth}%` : "100%" }}
      >
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-10 w-10 rounded-xl backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700 shadow-lg hover:scale-105 transition-transform"
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5 text-zinc-900 dark:text-white" />
            ) : (
              <Maximize2 className="h-5 w-5 text-zinc-900 dark:text-white" />
            )}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleVisibility}
            className="h-10 w-10 rounded-xl backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700 shadow-lg hover:scale-105 transition-transform"
          >
            {showPanel ? (
              <ChevronRight className="h-5 w-5 text-zinc-900 dark:text-white" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-zinc-900 dark:text-white" />
            )}
          </Button>
        </div>

        <div className="h-full rounded-2xl overflow-hidden border border-border/50 m-4">
          <iframe
            src="https://flxcc.flex.co.tz/flex-chat/public/login"
            //  src="https://flxcc.flex.co.tz/flex-crm/login"
            className="w-full h-full"
            title="Call Center"
            sandbox="
              allow-same-origin
              allow-scripts
              allow-popups
              allow-forms
              allow-modals
              allow-downloads
              allow-presentation
              allow-top-navigation
              allow-popups-to-escape-sandbox
            "
          />
        </div>
      </div>

      {showPanel && !isFullscreen && <SharedCallManagerPanel />}
    </div>
  )
}
