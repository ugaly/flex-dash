"use client"

import { useState } from "react"
import { CallPanel } from "@/components/call-panel"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CallCenterPage() {
  const [showPanel, setShowPanel] = useState(true)
  const [panelWidth, setPanelWidth] = useState(25) // percentage
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className="h-[calc(100vh-4rem)] flex relative">
      {/* WebView Section */}
      <div
        className={cn("relative transition-all duration-300 ease-in-out", isFullscreen && "fixed inset-0 z-50")}
        style={{ width: isFullscreen ? "100%" : showPanel ? `${100 - panelWidth}%` : "100%" }}
      >
        {/* Controls */}
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
            onClick={() => setShowPanel(!showPanel)}
            className="h-10 w-10 rounded-xl backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700 shadow-lg hover:scale-105 transition-transform"
          >
            {showPanel ? (
              <ChevronRight className="h-5 w-5 text-zinc-900 dark:text-white" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-zinc-900 dark:text-white" />
            )}
          </Button>
        </div>

        {/* WebView iframe */}
        <div className="h-full rounded-2xl overflow-hidden border border-border/50 shadow-2xl m-4">
         <iframe
  src="https://ui.aceternity.com/components/text-generate-effect"
  className="w-full h-full"
  title="Instagram"
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

      {/* Call Panel */}
      {showPanel && !isFullscreen && (
        <div className="transition-all duration-300 ease-in-out" style={{ width: `${panelWidth}%` }}>
          <CallPanel onClose={() => setShowPanel(false)} />
        </div>
      )}

      {/* Resize handle */}
      {showPanel && !isFullscreen && (
        <div
          className="absolute top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 transition-colors group"
          style={{ left: `${100 - panelWidth}%` }}
          onMouseDown={(e) => {
            const startX = e.clientX
            const startWidth = panelWidth

            const handleMouseMove = (e: MouseEvent) => {
              const diff = startX - e.clientX
              const newWidth = Math.max(20, Math.min(50, startWidth + (diff / window.innerWidth) * 100))
              setPanelWidth(newWidth)
            }

            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove)
              document.removeEventListener("mouseup", handleMouseUp)
            }

            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
          }}
        >
          <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-primary/20 transition-colors" />
        </div>
      )}
    </div>
  )
}
