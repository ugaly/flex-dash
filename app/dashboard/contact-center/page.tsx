
"use client"
export default function ContactCenterPage() {
 
  return (
    <div className="h-full m-0 p-0">
      <div className="h-full  overflow-hidden border border-border/50 ">
        <iframe
          src="https://cc.flex.co.tz/admin/stats"
          className="w-full h-full"
          title="Call Center"
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
  )
}