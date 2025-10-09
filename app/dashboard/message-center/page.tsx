"use client"

import { cn } from "@/lib/utils"

export default function MessageCenterPage() {

    return (
        <div className="h-screen flex ">
            <div
                className={cn("relative transition-all duration-300 ease-in-outfixed inset-0 ")}
                style={{ width: "100%" }}
            >
                <div className="h-full rounded-2xl overflow-hidden border border-border/50 m-4">
                    <iframe
                        src="https://flxcc.flex.co.tz/flex-chat/public/login"
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


        </div>
    )
}
