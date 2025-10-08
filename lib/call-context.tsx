"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export type CallState = "idle" | "dialing" | "incoming" | "active" | "queue"

export interface Call {
  id: string
  name: string
  number: string
  duration?: number
  status: CallState
  avatar?: string
}

interface CallContextType {
  currentCall: Call | null
  callState: CallState
  queueCalls: Call[]
  startCall: (call: Call) => void
  answerCall: () => void
  endCall: () => void
  rejectCall: () => void
  setCallState: (state: CallState) => void
  addToQueue: (call: Call) => void
  removeFromQueue: (id: string) => void
}

const CallContext = createContext<CallContextType | undefined>(undefined)

export function CallProvider({ children }: { children: React.ReactNode }) {
  const [currentCall, setCurrentCall] = useState<Call | null>(null)
  const [callState, setCallState] = useState<CallState>("idle")
  const [queueCalls, setQueueCalls] = useState<Call[]>([
    { id: "1", name: "Douglas Fortunatus", number: "+255 712 345 678", status: "queue" },
    { id: "2", name: "Jane Smith", number: "+255 713 456 789", status: "queue" },
    { id: "3", name: "Mike Johnson", number: "+255 714 567 890", status: "queue" },
  ])

  const startCall = useCallback((call: Call) => {
    setCurrentCall(call)
    setCallState("dialing")
    // Simulate call connecting after 2 seconds
    setTimeout(() => {
      setCallState("active")
    }, 5000)
  }, [])

  const answerCall = useCallback(() => {
    setCallState("active")
  }, [])

  const endCall = useCallback(() => {
    setCurrentCall(null)
    setCallState("idle")
  }, [])

  const rejectCall = useCallback(() => {
    setCurrentCall(null)
    setCallState("idle")
  }, [])

  const addToQueue = useCallback((call: Call) => {
    setQueueCalls((prev) => [...prev, call])
  }, [])

  const removeFromQueue = useCallback((id: string) => {
    setQueueCalls((prev) => prev.filter((call) => call.id !== id))
  }, [])

  return (
    <CallContext.Provider
      value={{
        currentCall,
        callState,
        queueCalls,
        startCall,
        answerCall,
        endCall,
        rejectCall,
        setCallState,
        addToQueue,
        removeFromQueue,
      }}
    >
      {children}
    </CallContext.Provider>
  )
}

export function useCall() {
  const context = useContext(CallContext)
  if (context === undefined) {
    throw new Error("useCall must be used within a CallProvider")
  }
  return context
}
