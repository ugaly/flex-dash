"use client"

import { useCallManager } from "@/contexts/call-manager-context"
import { CallPanel } from "@/components/call-panel"

export function SharedCallManagerPanel() {
  const { isVisible, panelWidth, setPanelWidth, isMinimized } = useCallManager()

  if (!isVisible || isMinimized) {
    return <CallPanel />
  }

  return (
    <>
      {/* Call Panel */}
      <div className="transition-all duration-300 ease-in-out h-full" style={{ width: `${panelWidth}%` }}>
        <CallPanel />
      </div>

      {/* Resize handle */}
      <div
        className="absolute top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 transition-colors group z-10"
        style={{ right: `${panelWidth}%` }}
        onMouseDown={(e) => {
          const startX = e.clientX
          const startWidth = panelWidth

          const handleMouseMove = (e: MouseEvent) => {
            const diff = e.clientX - startX
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
    </>
  )
}
