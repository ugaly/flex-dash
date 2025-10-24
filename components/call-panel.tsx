"use client"

import { useCall } from "@/lib/call-context"
import { Phone, Video, X, User, Clock } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function CallPanel({ onClose }: { onClose?: () => void }) {
  const { queueCalls, startCall } = useCall()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [view, setView] = useState<"queue" | "dialer">("queue")

  const handleDialPad = (digit: string) => setPhoneNumber((prev) => prev + digit)
  const handleBackspace = () => setPhoneNumber((prev) => prev.slice(0, -1))

  const handleCall = () => {
    if (!phoneNumber) return
    startCall({
      id: Date.now().toString(),
      name: "Unknown",
      number: phoneNumber,
      status: "dialing",
    })
    setPhoneNumber("")
  }

  const handleQueueCall = (call: (typeof queueCalls)[0]) => startCall(call)

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200  shadow-lg overflow-hidden">
      <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-md">
        <div className="p-4 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Call Manager</h2>
              <p className="text-xs text-blue-100">Flex Administrator</p>
            </div>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-7 w-7 p-0 hover:bg-blue-700/30 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <Button
              variant={view === "queue" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setView("queue")}
              className={cn(
                "flex-1 text-xs h-8 border border-blue-400/40",
                view === "queue"
                  ? "bg-white text-blue-700 font-medium"
                  : "bg-transparent text-white hover:bg-blue-600/40"
              )}
            >
              <Clock className="h-3 w-3 mr-1" />
              Queue ({queueCalls.length})
            </Button>

            <Button
              variant={view === "dialer" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setView("dialer")}
              className={cn(
                "flex-1 text-xs h-8 border border-blue-400/40",
                view === "dialer"
                  ? "bg-white text-blue-700 font-medium"
                  : "bg-transparent text-white hover:bg-blue-200/40"
              )}
            >
              <Phone className="h-3 w-3 mr-1" />
              Dialer
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {view === "queue" ? (
          <div className="space-y-2">
            {queueCalls.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-6">No calls in queue</p>
            )}
            {queueCalls.map((call) => (
              <div
                key={call.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                onClick={() => handleQueueCall(call)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{call.name}</h3>
                    <p className="text-xs text-gray-600">{call.number}</p>
                  </div>
                </div>
                <Button
                  size="icon"
                  className="bg-green-600 hover:bg-green-700 h-7 w-7 rounded-full"
                >
                  <Phone className="h-4 w-4 text-white" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter number"
                className="text-center text-base font-medium h-11 border-gray-300"
              />
              {phoneNumber && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackspace}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 text-gray-500 hover:text-gray-700"
                >
                  ⌫
                </Button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
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
                  variant="outline"
                  onClick={() => handleDialPad(item.digit)}
                  className="h-14 flex flex-col justify-center items-center border-gray-300 bg-gray-100 border hover:text-gray-900 cursor-pointer  hover:bg-slate-50 text-gray-900 leading-none"
                >
                  <span className="text-lg font-semibold text-gray-900 leading-none hover:text-gray-900">{item.digit}</span>
                  {item.letters && (
                    <span className="text-[10px] text-gray-500 -mt-1 leading-none hover:text-gray-900">{item.letters}</span>
                  )}
                </Button>

              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleCall}
                disabled={!phoneNumber}
                className={cn(
                  "flex-1 h-11 text-white font-semibold text-sm shadow-sm transition-all",
                  !phoneNumber
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                )}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-11 text-gray-700 font-semibold text-sm border-gray-300 hover:bg-gray-100"
              >
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
