"use client"

import { useCall } from "@/lib/call-context"
import { 
  Phone, 
  Video, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  GripVertical,
  Users
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function FloatingCallWidget() {
  const { currentCall, callState, endCall } = useCall()
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaker, setIsSpeaker] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Dragging state
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const dragStartPos = useRef({ x: 0, y: 0 })

  // Mock participants
  const participants = [
    { id: 1, name: "You", isYou: true, isSpeaking: true },
    { id: 2, name: "Sarah Wilson", isSpeaking: false },
    { id: 3, name: "Mike Chen", isSpeaking: true },
    { id: 4, name: "Emily Davis", isSpeaking: false },
  ]

  useEffect(() => {
    if (callState === "active") {
      const interval = setInterval(() => {
        setDuration((prev) => prev + 1)
      }, 1000)

      return () => clearInterval(interval)
    } else {
      setDuration(0)
    }
  }, [callState])

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    
    setIsDragging(true)
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
    
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    
    const newX = e.clientX - dragStartPos.current.x
    const newY = e.clientY - dragStartPos.current.y
    
    const maxX = window.innerWidth - (dragRef.current?.offsetWidth || 320)
    const maxY = window.innerHeight - (dragRef.current?.offsetHeight || 200)
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  if (!currentCall || callState === "idle") return null

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div
      ref={dragRef}
      className={cn(
        "fixed z-50 bg-white border border-gray-300 rounded-lg cursor-move select-none",
        isExpanded ? "w-96" : "w-80",
        isDragging && "shadow-md"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="relative">
        {/* Drag handle */}
        <div className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center cursor-grab text-gray-500">
          <GripVertical className="h-3 w-3" />
        </div>

        <div className={cn(isExpanded ? "p-4" : "p-3")}>
          {/* Header */}
          <div className={cn("flex items-start justify-between", isExpanded ? "mb-4" : "mb-3")}>
            <div className="flex items-center gap-2 ml-6">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {currentCall.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-sm">{currentCall.name}</h3>
                <p className="text-xs text-gray-600">{currentCall.number}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0" 
              onClick={handleToggleExpand}
            >
              {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
            </Button>
          </div>

          {/* Call status */}
          <div className={cn("text-center", isExpanded ? "mb-4" : "mb-3")}>
            {callState === "dialing" && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <p className="text-xs text-gray-600">Calling...</p>
              </div>
            )}
            {callState === "active" && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p className="text-sm font-medium">{formatDuration(duration)}</p>
                {isExpanded && (
                  <>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Users className="h-3 w-3" />
                      <span>{participants.length}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Expanded Participants */}
          {isExpanded && callState === "active" && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-medium text-gray-700">Participants</h4>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {participants.length}/8
                </span>
              </div>
              <div className="space-y-2">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded border",
                      participant.isSpeaking && "bg-blue-50 border-blue-200"
                    )}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className={cn(
                        "text-xs",
                        participant.isYou ? "bg-blue-600 text-white" : "bg-gray-300"
                      )}>
                        {participant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        {participant.name}
                        {participant.isYou && (
                          <span className="text-xs text-gray-500 ml-1">(You)</span>
                        )}
                      </p>
                    </div>
                    {participant.isSpeaking && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Control buttons */}
          <div className={cn(
            "flex items-center justify-center gap-2",
            isExpanded ? "mb-4" : "mb-3"
          )}>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                isMuted ? "bg-red-100 border-red-300 text-red-700" : ""
              )}
              onClick={(e) => {
                e.stopPropagation()
                setIsMuted(!isMuted)
              }}
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                isSpeaker ? "bg-blue-100 border-blue-300 text-blue-700" : ""
              )}
              onClick={(e) => {
                e.stopPropagation()
                setIsSpeaker(!isSpeaker)
              }}
            >
              {isSpeaker ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                isVideoOn ? "bg-blue-100 border-blue-300 text-blue-700" : ""
              )}
              onClick={(e) => {
                e.stopPropagation()
                setIsVideoOn(!isVideoOn)
              }}
            >
              <Video className="h-4 w-4" />
            </Button>
          </div>

          {/* End call button */}
          <Button
            onClick={(e) => {
              e.stopPropagation()
              endCall()
              setIsExpanded(false)
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <Phone className="h-4 w-4 mr-2 rotate-[135deg]" />
            End Call
          </Button>
        </div>
      </div>
    </div>
  )
}