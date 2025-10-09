"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CallManagerState {
  isVisible: boolean
  panelWidth: number
  isMinimized: boolean
}

interface CallManagerContextType extends CallManagerState {
  setIsVisible: (visible: boolean) => void
  setPanelWidth: (width: number) => void
  setIsMinimized: (minimized: boolean) => void
  toggleVisibility: () => void
  toggleMinimize: () => void
}

const CallManagerContext = createContext<CallManagerContextType | undefined>(undefined)

const STORAGE_KEY = "call-manager-state"

const defaultState: CallManagerState = {
  isVisible: true,
  panelWidth: 25,
  isMinimized: false,
}

export function CallManagerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CallManagerState>(defaultState)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setState(parsed)
      }
    } catch (error) {
      console.error("Failed to load call manager state:", error)
    }
    setIsHydrated(true)
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch (error) {
        console.error("Failed to save call manager state:", error)
      }
    }
  }, [state, isHydrated])

  const setIsVisible = (visible: boolean) => {
    setState((prev) => ({ ...prev, isVisible: visible }))
  }

  const setPanelWidth = (width: number) => {
    setState((prev) => ({ ...prev, panelWidth: width }))
  }

  const setIsMinimized = (minimized: boolean) => {
    setState((prev) => ({ ...prev, isMinimized: minimized }))
  }

  const toggleVisibility = () => {
    setState((prev) => ({ ...prev, isVisible: !prev.isVisible }))
  }

  const toggleMinimize = () => {
    setState((prev) => ({ ...prev, isMinimized: !prev.isMinimized }))
  }

  return (
    <CallManagerContext.Provider
      value={{
        ...state,
        setIsVisible,
        setPanelWidth,
        setIsMinimized,
        toggleVisibility,
        toggleMinimize,
      }}
    >
      {children}
    </CallManagerContext.Provider>
  )
}

export function useCallManager() {
  const context = useContext(CallManagerContext)
  if (context === undefined) {
    throw new Error("useCallManager must be used within a CallManagerProvider")
  }
  return context
}
