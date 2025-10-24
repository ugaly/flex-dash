"use client"

import { useCall } from "@/lib/call-context"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function IncomingCallModal() {
  const { currentCall, callState, answerCall, rejectCall } = useCall()
  const [isRinging, setIsRinging] = useState(false)

  useEffect(() => {
    if (callState === "incoming") {
      setIsRinging(true)
      const timeout = setTimeout(() => {
        rejectCall()
      }, 30000)
      return () => clearTimeout(timeout)
    } else {
      setIsRinging(false)
    }
  }, [callState, rejectCall])

  if (callState !== "incoming" || !currentCall) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />

      <div className="relative w-full max-w-md mx-4">
        <div className="backdrop-blur-2xl bg-gradient-to-br from-background/95 via-background/90 to-background/95 border border-border/50 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/20 to-primary/20 animate-pulse" />

          <div className="relative p-8">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold text-3xl shadow-2xl">
                  {currentCall.name.charAt(0)}
                </div>
                {isRinging && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
                  </>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentCall.name}</h2>
              <p className="text-muted-foreground">{currentCall.number}</p>
              <p className="text-sm text-muted-foreground mt-2">Incoming call...</p>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <Button
                  onClick={rejectCall}
                  size="icon"
                  className="h-16 w-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-2xl shadow-red-500/50 hover:scale-110 transition-all duration-200"
                >
                  <Phone className="h-7 w-7 rotate-[135deg]" />
                </Button>
                <span className="text-xs text-muted-foreground">Decline</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Button
                  onClick={answerCall}
                  size="icon"
                  className="h-20 w-20 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-2xl shadow-green-500/50 hover:scale-110 transition-all duration-200 animate-pulse"
                >
                  <Phone className="h-8 w-8" />
                </Button>
                <span className="text-xs font-medium">Answer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
