// "use client"

// import { useCall } from "@/lib/call-context"
// import { Phone, Video, X, User, Clock, Delete } from "lucide-react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { cn } from "@/lib/utils"
// import { Card } from "@/components/ui/card"

// export function CallPanel({ onClose }: { onClose?: () => void }) {
//   const { callState, queueCalls, startCall, setCallState } = useCall()
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [view, setView] = useState<"queue" | "dialer">("queue")

//   const handleDialPad = (digit: string) => {
//     setPhoneNumber((prev) => prev + digit)
//   }

//   const handleBackspace = () => {
//     setPhoneNumber((prev) => prev.slice(0, -1))
//   }

//   const handleCall = () => {
//     if (phoneNumber) {
//       startCall({
//         id: Date.now().toString(),
//         name: "Unknown",
//         number: phoneNumber,
//         status: "dialing",
//       })
//       setPhoneNumber("")
//     }
//   }

//   const handleQueueCall = (call: (typeof queueCalls)[0]) => {
//     startCall(call)
//   }

//   return (
//     <div className="h-full flex flex-col backdrop-blur-xl bg-gradient-to-br from-background/95 via-background/90 to-background/95 border-l border-border/50">
//       {/* Header */}
//       <div className="p-3 border-b border-border/50 backdrop-blur-xl bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10">
//         <div className="flex items-center justify-between mb-2">
//           <div>
//             <h2 className="text-base font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
//               Call Manager
//             </h2>
//             <p className="text-xs text-muted-foreground">Flex Administrator</p>
//           </div>
//           {onClose && (
//             <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 rounded-full">
//               <X className="h-3.5 w-3.5" />
//             </Button>
//           )}
//         </div>

//         {/* View toggle */}
//         <div className="flex gap-2">
//           <Button
//             variant={view === "queue" ? "default" : "ghost"}
//             size="sm"
//             onClick={() => setView("queue")}
//             className={cn(
//               "flex-1 rounded-lg transition-all duration-200 h-8 text-xs",
//               view === "queue" && "bg-gradient-to-r from-primary to-blue-500 shadow-lg shadow-primary/25",
//             )}
//           >
//             <Clock className="h-3.5 w-3.5 mr-1.5" />
//             Queue ({queueCalls.length})
//           </Button>
//           <Button
//             variant={view === "dialer" ? "default" : "ghost"}
//             size="sm"
//             onClick={() => setView("dialer")}
//             className={cn(
//               "flex-1 rounded-lg transition-all duration-200 h-8 text-xs",
//               view === "dialer" && "bg-gradient-to-r from-primary to-blue-500 shadow-lg shadow-primary/25",
//             )}
//           >
//             <Phone className="h-3.5 w-3.5 mr-1.5" />
//             Dialer
//           </Button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto p-3">
//         {view === "queue" ? (
//           <div className="space-y-2.5">
//             {queueCalls.map((call) => (
//               <Card
//                 key={call.id}
//                 className="p-3 backdrop-blur-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 cursor-pointer group"
//                 onClick={() => handleQueueCall(call)}
//               >
//                 <div className="flex items-center gap-2.5">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
//                     <User className="h-5 w-5 text-primary" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-sm truncate">{call.name}</h3>
//                     <p className="text-xs text-muted-foreground truncate">{call.number}</p>
//                   </div>
//                   <Button
//                     size="icon"
//                     className="h-9 w-9 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/25 hover:scale-110 transition-transform"
//                   >
//                     <Phone className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {/* Phone number display */}
//             <div className="relative">
//               <Input
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 placeholder="Enter number"
//                 className="text-center text-xl h-14 backdrop-blur-xl bg-white/80 dark:bg-zinc-800/80 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl font-semibold pr-12"
//               />
//               {phoneNumber && (
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={handleBackspace}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full hover:bg-red-500/10"
//                 >
//                   <Delete className="h-4 w-4 text-red-500" />
//                 </Button>
//               )}
//             </div>

//             {/* Dial pad */}
//             <div className="grid grid-cols-3 gap-2">
//               {[
//                 { digit: "1", letters: "" },
//                 { digit: "2", letters: "ABC" },
//                 { digit: "3", letters: "DEF" },
//                 { digit: "4", letters: "GHI" },
//                 { digit: "5", letters: "JKL" },
//                 { digit: "6", letters: "MNO" },
//                 { digit: "7", letters: "PQRS" },
//                 { digit: "8", letters: "TUV" },
//                 { digit: "9", letters: "WXYZ" },
//                 { digit: "*", letters: "" },
//                 { digit: "0", letters: "+" },
//                 { digit: "#", letters: "" },
//               ].map((item) => (
//                 <Button
//                   key={item.digit}
//                   variant="ghost"
//                   onClick={() => handleDialPad(item.digit)}
//                   className="h-16 backdrop-blur-xl bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-800 border-2 border-zinc-200/50 dark:border-zinc-700/50 rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 active:scale-95"
//                 >
//                   <span className="text-2xl font-bold bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
//                     {item.digit}
//                   </span>
//                   {item.letters && (
//                     <span className="text-[10px] text-muted-foreground font-medium mt-0.5">{item.letters}</span>
//                   )}
//                 </Button>
//               ))}
//             </div>

//             {/* Call buttons */}
//             <div className="flex gap-2">
//               <Button
//                 onClick={handleCall}
//                 disabled={!phoneNumber}
//                 className="flex-1 h-14 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//               >
//                 <Phone className="h-5 w-5 mr-2" />
//                 Call
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 h-14 rounded-xl backdrop-blur-xl bg-white/80 dark:bg-zinc-800/80 border-2 border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 hover:scale-105 active:scale-95 text-sm"
//               >
//                 <Video className="h-5 w-5 mr-2" />
//                 Video
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }



// "use client"

// import { useCall } from "@/lib/call-context"
// import { Phone, Video, X, User, Clock } from "lucide-react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { cn } from "@/lib/utils"

// export function CallPanel({ onClose }: { onClose?: () => void }) {
//   const { callState, queueCalls, startCall, setCallState } = useCall()
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [view, setView] = useState<"queue" | "dialer">("queue")

//   const handleDialPad = (digit: string) => {
//     setPhoneNumber((prev) => prev + digit)
//   }

//   const handleBackspace = () => {
//     setPhoneNumber((prev) => prev.slice(0, -1))
//   }

//   const handleCall = () => {
//     if (phoneNumber) {
//       startCall({
//         id: Date.now().toString(),
//         name: "Unknown",
//         number: phoneNumber,
//         status: "dialing",
//       })
//       setPhoneNumber("")
//     }
//   }

//   const handleQueueCall = (call: (typeof queueCalls)[0]) => {
//     startCall(call)
//   }

//   return (
//     <div className="h-full flex flex-col bg-white border-l border-gray-300">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-300">
//         <div className="flex items-center justify-between mb-3">
//           <div>
//             <h2 className="text-lg font-semibold text-gray-900">Call Manager</h2>
//             <p className="text-sm text-gray-600">Flex Administrator</p>
//           </div>
//           {onClose && (
//             <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
//               <X className="h-4 w-4" />
//             </Button>
//           )}
//         </div>

//         {/* View toggle */}
//         <div className="flex gap-2">
//           <Button
//             variant={view === "queue" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setView("queue")}
//             className="flex-1 text-sm"
//           >
//             <Clock className="h-4 w-4 mr-2" />
//             Queue ({queueCalls.length})
//           </Button>
//           <Button
//             variant={view === "dialer" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setView("dialer")}
//             className="flex-1 text-sm"
//           >
//             <Phone className="h-4 w-4 mr-2" />
//             Dialer
//           </Button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {view === "queue" ? (
//           <div className="space-y-3">
//             {queueCalls.map((call) => (
//               <div
//                 key={call.id}
//                 className="p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
//                 onClick={() => handleQueueCall(call)}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                     <User className="h-5 w-5 text-blue-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-medium text-sm text-gray-900 truncate">{call.name}</h3>
//                     <p className="text-sm text-gray-600 truncate">{call.number}</p>
//                   </div>
//                   <Button
//                     size="sm"
//                     className="h-9 w-9 p-0 bg-green-600 hover:bg-green-700"
//                   >
//                     <Phone className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {/* Phone number display */}
//             <div className="relative">
//               <Input
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 placeholder="Enter number"
//                 className="text-center text-lg h-12 border-2 border-gray-300 rounded-lg font-medium"
//               />
//               {phoneNumber && (
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={handleBackspace}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
//                 >
//                   ⌫
//                 </Button>
//               )}
//             </div>

//             {/* Dial pad */}
//             <div className="grid grid-cols-3 gap-3">
//               {[
//                 { digit: "1", letters: "" },
//                 { digit: "2", letters: "ABC" },
//                 { digit: "3", letters: "DEF" },
//                 { digit: "4", letters: "GHI" },
//                 { digit: "5", letters: "JKL" },
//                 { digit: "6", letters: "MNO" },
//                 { digit: "7", letters: "PQRS" },
//                 { digit: "8", letters: "TUV" },
//                 { digit: "9", letters: "WXYZ" },
//                 { digit: "*", letters: "" },
//                 { digit: "0", letters: "+" },
//                 { digit: "#", letters: "" },
//               ].map((item) => (
//                 <Button
//                   key={item.digit}
//                   variant="outline"
//                   onClick={() => handleDialPad(item.digit)}
//                   className="h-14 border border-gray-300 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50"
//                 >
//                   <span className="text-xl font-semibold text-gray-900">
//                     {item.digit}
//                   </span>
//                   {item.letters && (
//                     <span className="text-xs text-gray-500 mt-1">{item.letters}</span>
//                   )}
//                 </Button>
//               ))}
//             </div>

//             {/* Call buttons */}
//             <div className="flex gap-3">
//               <Button
//                 onClick={handleCall}
//                 disabled={!phoneNumber}
//                 className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
//               >
//                 <Phone className="h-5 w-5 mr-2" />
//                 Call
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 h-12 border border-gray-300 hover:bg-gray-50"
//               >
//                 <Video className="h-5 w-5 mr-2" />
//                 Video
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }




// "use client"

// import { useCall } from "@/lib/call-context"
// import { Phone, Video, X, User, Clock } from "lucide-react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { cn } from "@/lib/utils"

// export function CallPanel({ onClose }: { onClose?: () => void }) {
//   const { callState, queueCalls, startCall, setCallState } = useCall()
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [view, setView] = useState<"queue" | "dialer">("queue")

//   const handleDialPad = (digit: string) => {
//     setPhoneNumber((prev) => prev + digit)
//   }

//   const handleBackspace = () => {
//     setPhoneNumber((prev) => prev.slice(0, -1))
//   }

//   const handleCall = () => {
//     if (phoneNumber) {
//       startCall({
//         id: Date.now().toString(),
//         name: "Unknown",
//         number: phoneNumber,
//         status: "dialing",
//       })
//       setPhoneNumber("")
//     }
//   }

//   const handleQueueCall = (call: (typeof queueCalls)[0]) => {
//     startCall(call)
//   }

//   return (
//     <div className="h-full flex flex-col bg-white border-l border-gray-300">
//       {/* Header - Sticky */}
//       <div className="flex-shrink-0 border-b border-gray-300 bg-white">
//         <div className="p-3">
//           <div className="flex items-center justify-between mb-2">
//             <div>
//               <h2 className="text-sm font-semibold text-gray-900">Call Manager</h2>
//               <p className="text-xs text-gray-600">Flex Administrator</p>
//             </div>
//             {onClose && (
//               <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
//                 <X className="h-3 w-3" />
//               </Button>
//             )}
//           </div>

//           {/* View toggle */}
//           <div className="flex gap-1">
//             <Button
//               variant={view === "queue" ? "default" : "outline"}
//               size="sm"
//               onClick={() => setView("queue")}
//               className="flex-1 text-xs h-7"
//             >
//               <Clock className="h-3 w-3 mr-1" />
//               Queue ({queueCalls.length})
//             </Button>
//             <Button
//               variant={view === "dialer" ? "default" : "outline"}
//               size="sm"
//               onClick={() => setView("dialer")}
//               className="flex-1 text-xs h-7"
//             >
//               <Phone className="h-3 w-3 mr-1" />
//               Dialer
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Content - Scrollable */}
//       <div className="flex-1 overflow-y-auto">
//         {view === "queue" ? (
//           <div className="p-2 space-y-1">
//             {queueCalls.map((call) => (
//               <div
//                 key={call.id}
//                 className="p-2 bg-gray-50 border border-gray-300 rounded hover:bg-gray-100 transition-colors cursor-pointer"
//                 onClick={() => handleQueueCall(call)}
//               >
//                 <div className="flex items-center gap-2">
//                   <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//                     <User className="h-3 w-3 text-blue-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-md font-medium text-gray-900 truncate">{call.name}</h3>
//                     <p className="text-md text-gray-600 truncate">{call.number}</p>
//                   </div>
//                   <Button
//                     size="sm"
//                     className="h-6 w-6 p-0 bg-green-600 hover:bg-green-700 flex-shrink-0"
//                   >
//                     <Phone className="h-3 w-3" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="p-3 space-y-3">
//             {/* Phone number display */}
//             <div className="relative">
//               <Input
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 placeholder="Enter number"
//                 className="text-center text-sm h-10 border border-gray-300 rounded font-medium"
//               />
//               {phoneNumber && (
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={handleBackspace}
//                   className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
//                 >
//                   ⌫
//                 </Button>
//               )}
//             </div>

//             {/* Dial pad */}
//             <div className="grid grid-cols-3 gap-2">
//               {[
//                 { digit: "1", letters: "" },
//                 { digit: "2", letters: "ABC" },
//                 { digit: "3", letters: "DEF" },
//                 { digit: "4", letters: "GHI" },
//                 { digit: "5", letters: "JKL" },
//                 { digit: "6", letters: "MNO" },
//                 { digit: "7", letters: "PQRS" },
//                 { digit: "8", letters: "TUV" },
//                 { digit: "9", letters: "WXYZ" },
//                 { digit: "*", letters: "" },
//                 { digit: "0", letters: "+" },
//                 { digit: "#", letters: "" },
//               ].map((item) => (
//                 <Button
//                   key={item.digit}
//                   variant="outline"
//                   onClick={() => handleDialPad(item.digit)}
//                   className="h-12 border border-gray-300 rounded flex flex-col items-center justify-center hover:bg-gray-50"
//                 >
//                   <span className="text-base font-semibold text-gray-900">
//                     {item.digit}
//                   </span>
//                   {item.letters && (
//                     <span className="text-[10px] text-gray-500 mt-0.5">{item.letters}</span>
//                   )}
//                 </Button>
//               ))}
//             </div>

//             {/* Call buttons */}
//             <div className="flex gap-2">
//               <Button
//                 onClick={handleCall}
//                 disabled={!phoneNumber}
//                 className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-white font-medium text-sm"
//               >
//                 <Phone className="h-4 w-4 mr-1" />
//                 Call
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 h-10 border border-gray-300 hover:bg-gray-50 text-sm"
//               >
//                 <Video className="h-4 w-4 mr-1" />
//                 Video
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }




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
      {/* 🌊 Header Section */}
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

          {/* View Toggle Buttons */}
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

      {/* 🧩 Content Section */}
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
            {/* Input */}
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

            {/* Dial Pad */}
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

            {/* Call Buttons */}
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
