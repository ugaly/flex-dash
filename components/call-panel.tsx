"use client"

import { useCall } from "@/lib/call-context"
import { Phone, Video, X, User, Clock, Delete } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

export function CallPanel({ onClose }: { onClose?: () => void }) {
  const { callState, queueCalls, startCall, setCallState } = useCall()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [view, setView] = useState<"queue" | "dialer">("queue")

  const handleDialPad = (digit: string) => {
    setPhoneNumber((prev) => prev + digit)
  }

  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1))
  }

  const handleCall = () => {
    if (phoneNumber) {
      startCall({
        id: Date.now().toString(),
        name: "Unknown",
        number: phoneNumber,
        status: "dialing",
      })
      setPhoneNumber("")
    }
  }

  const handleQueueCall = (call: (typeof queueCalls)[0]) => {
    startCall(call)
  }

  return (
    <div className="h-full flex flex-col backdrop-blur-xl bg-gradient-to-br from-background/95 via-background/90 to-background/95 border-l border-border/50">
      {/* Header */}
      <div className="p-3 border-b border-border/50 backdrop-blur-xl bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-base font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Call Manager
            </h2>
            <p className="text-xs text-muted-foreground">Flex Administrator</p>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 rounded-full">
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* View toggle */}
        <div className="flex gap-2">
          <Button
            variant={view === "queue" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("queue")}
            className={cn(
              "flex-1 rounded-lg transition-all duration-200 h-8 text-xs",
              view === "queue" && "bg-gradient-to-r from-primary to-blue-500 shadow-lg shadow-primary/25",
            )}
          >
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            Queue ({queueCalls.length})
          </Button>
          <Button
            variant={view === "dialer" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("dialer")}
            className={cn(
              "flex-1 rounded-lg transition-all duration-200 h-8 text-xs",
              view === "dialer" && "bg-gradient-to-r from-primary to-blue-500 shadow-lg shadow-primary/25",
            )}
          >
            <Phone className="h-3.5 w-3.5 mr-1.5" />
            Dialer
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {view === "queue" ? (
          <div className="space-y-2.5">
            {queueCalls.map((call) => (
              <Card
                key={call.id}
                className="p-3 backdrop-blur-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 cursor-pointer group"
                onClick={() => handleQueueCall(call)}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{call.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{call.number}</p>
                  </div>
                  <Button
                    size="icon"
                    className="h-9 w-9 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/25 hover:scale-110 transition-transform"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Phone number display */}
            <div className="relative">
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter number"
                className="text-center text-xl h-14 backdrop-blur-xl bg-white/80 dark:bg-zinc-800/80 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl font-semibold pr-12"
              />
              {phoneNumber && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBackspace}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full hover:bg-red-500/10"
                >
                  <Delete className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>

            {/* Dial pad */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { digit: "1", letters: "" },
                { digit: "2", letters: "ABC" },
                { digit: "3", letters: "DEF" },
                { digit: "4", letters: "GHI" },
                { digit: "5", letters: "JKL" },
                { digit: "6", letters: "MNO" },
                { digit: "7", letters: "PQRS" },
                { digit: "8", letters: "TUV" },
                { digit: "9", letters: "WXYZ" },
                { digit: "*", letters: "" },
                { digit: "0", letters: "+" },
                { digit: "#", letters: "" },
              ].map((item) => (
                <Button
                  key={item.digit}
                  variant="ghost"
                  onClick={() => handleDialPad(item.digit)}
                  className="h-16 backdrop-blur-xl bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-800 border-2 border-zinc-200/50 dark:border-zinc-700/50 rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 active:scale-95"
                >
                  <span className="text-2xl font-bold bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                    {item.digit}
                  </span>
                  {item.letters && (
                    <span className="text-[10px] text-muted-foreground font-medium mt-0.5">{item.letters}</span>
                  )}
                </Button>
              ))}
            </div>

            {/* Call buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleCall}
                disabled={!phoneNumber}
                className="flex-1 h-14 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-14 rounded-xl backdrop-blur-xl bg-white/80 dark:bg-zinc-800/80 border-2 border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 hover:scale-105 active:scale-95 text-sm"
              >
                <Video className="h-5 w-5 mr-2" />
                Video
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
