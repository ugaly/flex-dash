"use client"

import { useEffect, useState } from "react"

export function LiveDateTime() {
  const [dateTime, setDateTime] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
      <span>{formattedDate}</span>
      <span className="text-muted-foreground/50">|</span>
      <span className="font-semibold text-foreground">{formattedTime}</span>
    </div>
  )
}
