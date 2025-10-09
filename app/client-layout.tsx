"use client"

import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { CallProvider } from "@/lib/call-context"
import { FloatingCallWidget } from "@/components/floating-call-widget"
import { IncomingCallModal } from "@/components/incoming-call-modal"

export function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
        <CallProvider>
          {children}
          <FloatingCallWidget />
          <IncomingCallModal />
        </CallProvider>
      </ThemeProvider>
      <Analytics />
    </>
  )
}

const DefaultClientLayout = ClientLayout
export default DefaultClientLayout
