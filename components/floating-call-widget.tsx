// "use client"

// import { useCall } from "@/lib/call-context"
// import { Phone, Video, Mic, MicOff, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"

// export function FloatingCallWidget() {
//   const { currentCall, callState, endCall } = useCall()
//   const [duration, setDuration] = useState(0)
//   const [isMuted, setIsMuted] = useState(false)
//   const [isSpeaker, setIsSpeaker] = useState(false)
//   const [isExpanded, setIsExpanded] = useState(false)

//   useEffect(() => {
//     if (callState === "active") {
//       const interval = setInterval(() => {
//         setDuration((prev) => prev + 1)
//       }, 1000)
//       return () => clearInterval(interval)
//     } else {
//       setDuration(0)
//     }
//   }, [callState])

//   if (!currentCall || callState === "idle") return null

//   const formatDuration = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, "0")}`
//   }

//   return (
//     <div
//       className={cn(
//         "fixed z-50 transition-all duration-300 ease-in-out",
//         isExpanded ? "top-20 right-6 w-96" : "bottom-6 right-6 w-80",
//       )}
//     >
//       <div className="relative backdrop-blur-2xl bg-gradient-to-br from-background/95 via-background/90 to-background/95 border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
//         {/* Animated gradient background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 animate-pulse" />

//         <div className="relative p-6">
//           {/* Header */}
//           <div className="flex items-start justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
//                   {currentCall.name.charAt(0)}
//                 </div>
//                 {callState === "active" && (
//                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
//                 )}
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">{currentCall.name}</h3>
//                 <p className="text-sm text-muted-foreground">{currentCall.number}</p>
//               </div>
//             </div>
//             <div className="flex gap-1">
//               <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(!isExpanded)}>
//                 {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
//               </Button>
//             </div>
//           </div>

//           {/* Call status */}
//           <div className="text-center mb-6">
//             {callState === "dialing" && (
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
//                 <p className="text-sm text-muted-foreground">Calling...</p>
//               </div>
//             )}
//             {callState === "active" && (
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full" />
//                 <p className="text-sm font-medium">{formatDuration(duration)}</p>
//               </div>
//             )}
//           </div>

//           {/* Action buttons */}
//           {callState === "active" && (
//             <div className="flex items-center justify-center gap-4 mb-4">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={cn(
//                   "h-14 w-14 rounded-full backdrop-blur-xl transition-all duration-200",
//                   isMuted ? "bg-red-500/20 hover:bg-red-500/30 text-red-500" : "bg-muted/50 hover:bg-muted",
//                 )}
//                 onClick={() => setIsMuted(!isMuted)}
//               >
//                 {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
//               </Button>

//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={cn(
//                   "h-14 w-14 rounded-full backdrop-blur-xl transition-all duration-200",
//                   isSpeaker ? "bg-primary/20 hover:bg-primary/30 text-primary" : "bg-muted/50 hover:bg-muted",
//                 )}
//                 onClick={() => setIsSpeaker(!isSpeaker)}
//               >
//                 {isSpeaker ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
//               </Button>

//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-14 w-14 rounded-full bg-muted/50 hover:bg-muted backdrop-blur-xl"
//               >
//                 <Video className="h-6 w-6" />
//               </Button>
//             </div>
//           )}

//           {/* End call button */}
//           <Button
//             onClick={endCall}
//             className="w-full h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-lg shadow-red-500/25"
//           >
//             <Phone className="h-5 w-5 mr-2 rotate-[135deg]" />
//             End Call
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }










// "use client"

// import { useCall } from "@/lib/call-context"
// import { Phone, Video, Mic, MicOff, Volume2, VolumeX, Maximize2, Minimize2, GripVertical } from "lucide-react"
// import { useState, useEffect, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"

// export function FloatingCallWidget() {
//   const { currentCall, callState, endCall } = useCall()
//   const [duration, setDuration] = useState(0)
//   const [isMuted, setIsMuted] = useState(false)
//   const [isSpeaker, setIsSpeaker] = useState(false)
//   const [isExpanded, setIsExpanded] = useState(false)
  
//   // Dragging state
//   const [position, setPosition] = useState({ x: 20, y: 20 })
//   const [isDragging, setIsDragging] = useState(false)
//   const dragRef = useRef<HTMLDivElement>(null)
//   const dragStartPos = useRef({ x: 0, y: 0 })

//   useEffect(() => {
//     if (callState === "active") {
//       const interval = setInterval(() => {
//         setDuration((prev) => prev + 1)
//       }, 1000)
//       return () => clearInterval(interval)
//     } else {
//       setDuration(0)
//     }
//   }, [callState])

//   // Drag handlers
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (e.button !== 0) return // Only left click
    
//     setIsDragging(true)
//     dragStartPos.current = {
//       x: e.clientX - position.x,
//       y: e.clientY - position.y
//     }
    
//     e.preventDefault()
//   }

//   const handleMouseMove = (e: MouseEvent) => {
//     if (!isDragging) return
    
//     const newX = e.clientX - dragStartPos.current.x
//     const newY = e.clientY - dragStartPos.current.y
    
//     // Keep within viewport bounds
//     const maxX = window.innerWidth - (dragRef.current?.offsetWidth || 320)
//     const maxY = window.innerHeight - (dragRef.current?.offsetHeight || 200)
    
//     setPosition({
//       x: Math.max(0, Math.min(newX, maxX)),
//       y: Math.max(0, Math.min(newY, maxY))
//     })
//   }

//   const handleMouseUp = () => {
//     setIsDragging(false)
//   }

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove)
//       document.addEventListener('mouseup', handleMouseUp)
      
//       return () => {
//         document.removeEventListener('mousemove', handleMouseMove)
//         document.removeEventListener('mouseup', handleMouseUp)
//       }
//     }
//   }, [isDragging])

//   if (!currentCall || callState === "idle") return null

//   const formatDuration = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, "0")}`
//   }

//   return (
//     <div
//       ref={dragRef}
//       className={cn(
//         "fixed z-50 transition-all duration-300 ease-in-out cursor-move select-none",
//         isDragging && "cursor-grabbing transition-none",
//         isExpanded ? "w-96" : "w-80"
//       )}
//       style={{
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//       }}
//       onMouseDown={handleMouseDown}
//     >
//       <div className={cn(
//         "relative backdrop-blur-2xl bg-gradient-to-br from-background/95 via-background/90 to-background/95 border border-border/50 rounded-2xl shadow-2xl overflow-hidden",
//         isDragging && "shadow-3xl scale-105"
//       )}>
//         {/* Animated gradient background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 animate-pulse" />

//         {/* Drag handle */}
//         <div className={cn(
//           "absolute top-3 left-3 w-6 h-6 flex items-center justify-center rounded-lg transition-all duration-200",
//           "bg-muted/50 hover:bg-muted/80 cursor-grab text-muted-foreground",
//           isDragging && "cursor-grabbing bg-primary/20 text-primary"
//         )}>
//           <GripVertical className="h-3 w-3" />
//         </div>

//         <div className="relative p-6">
//           {/* Header */}
//           <div className="flex items-start justify-between mb-4">
//             <div className="flex items-center gap-3 ml-6">
//               <div className="relative">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
//                   {currentCall.name.charAt(0)}
//                 </div>
//                 {callState === "active" && (
//                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
//                 )}
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">{currentCall.name}</h3>
//                 <p className="text-sm text-muted-foreground">{currentCall.number}</p>
//               </div>
//             </div>
//             <div className="flex gap-1">
//               <Button 
//                 variant="ghost" 
//                 size="icon" 
//                 className="h-8 w-8" 
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   setIsExpanded(!isExpanded)
//                 }}
//               >
//                 {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
//               </Button>
//             </div>
//           </div>

//           {/* Call status */}
//           <div className="text-center mb-6">
//             {callState === "dialing" && (
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
//                 <p className="text-sm text-muted-foreground">Calling...</p>
//               </div>
//             )}
//             {callState === "active" && (
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full" />
//                 <p className="text-sm font-medium">{formatDuration(duration)}</p>
//               </div>
//             )}
//           </div>

//           {/* Action buttons */}
//           {callState === "active" && (
//             <div className="flex items-center justify-center gap-4 mb-4">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={cn(
//                   "h-14 w-14 rounded-full backdrop-blur-xl transition-all duration-200",
//                   isMuted ? "bg-red-500/20 hover:bg-red-500/30 text-red-500" : "bg-muted/50 hover:bg-muted",
//                 )}
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   setIsMuted(!isMuted)
//                 }}
//               >
//                 {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
//               </Button>

//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={cn(
//                   "h-14 w-14 rounded-full backdrop-blur-xl transition-all duration-200",
//                   isSpeaker ? "bg-primary/20 hover:bg-primary/30 text-primary" : "bg-muted/50 hover:bg-muted",
//                 )}
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   setIsSpeaker(!isSpeaker)
//                 }}
//               >
//                 {isSpeaker ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
//               </Button>

//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-14 w-14 rounded-full bg-muted/50 hover:bg-muted backdrop-blur-xl"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <Video className="h-6 w-6" />
//               </Button>
//             </div>
//           )}

//           {/* End call button */}
//           <Button
//             onClick={(e) => {
//               e.stopPropagation()
//               endCall()
//             }}
//             className="w-full h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-lg shadow-red-500/25"
//           >
//             <Phone className="h-5 w-5 mr-2 rotate-[135deg]" />
//             End Call
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }








// "use client"

// import { useCall } from "@/lib/call-context"
// import { 
//   Phone, 
//   Video, 
//   Mic, 
//   MicOff, 
//   Volume2, 
//   VolumeX, 
//   Maximize2, 
//   Minimize2, 
//   GripVertical, 
//   Users,
//   MessageSquare,
//   Share,
//   Monitor,
//   Cast,
//   Clock,
//   Calendar,
//   User,
//   FileText,
//   MoreHorizontal,
//   Shield,
//   Lock
// } from "lucide-react"
// import { useState, useEffect, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { cn } from "@/lib/utils"

// export function FloatingCallWidget() {
//   const { currentCall, callState, endCall } = useCall()
//   const [duration, setDuration] = useState(0)
//   const [isMuted, setIsMuted] = useState(false)
//   const [isSpeaker, setIsSpeaker] = useState(false)
//   const [isVideoOn, setIsVideoOn] = useState(false)
//   const [isScreenSharing, setIsScreenSharing] = useState(false)
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [callQuality, setCallQuality] = useState<"excellent" | "good" | "poor">("excellent")
  
//   // Dragging state
//   const [position, setPosition] = useState({ x: 20, y: 20 })
//   const [isDragging, setIsDragging] = useState(false)
//   const dragRef = useRef<HTMLDivElement>(null)
//   const dragStartPos = useRef({ x: 0, y: 0 })

//   // Mock participants
//   const participants = [
//     { id: 1, name: "You", avatar: "", isYou: true, isSpeaking: true },
//     { id: 2, name: "Sarah Wilson", avatar: "", isSpeaking: false },
//     { id: 3, name: "Mike Chen", avatar: "", isSpeaking: true },
//     { id: 4, name: "Emily Davis", avatar: "", isSpeaking: false },
//   ]

//   useEffect(() => {
//     if (callState === "active") {
//       const interval = setInterval(() => {
//         setDuration((prev) => prev + 1)
//       }, 1000)

//       // Simulate call quality changes
//       const qualityInterval = setInterval(() => {
//         const qualities = ["excellent", "good", "poor"] as const
//         setCallQuality(qualities[Math.floor(Math.random() * qualities.length)])
//       }, 10000)

//       return () => {
//         clearInterval(interval)
//         clearInterval(qualityInterval)
//       }
//     } else {
//       setDuration(0)
//     }
//   }, [callState])

//   // Drag handlers
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (e.button !== 0) return // Only left click
    
//     setIsDragging(true)
//     dragStartPos.current = {
//       x: e.clientX - position.x,
//       y: e.clientY - position.y
//     }
    
//     e.preventDefault()
//   }

//   const handleMouseMove = (e: MouseEvent) => {
//     if (!isDragging) return
    
//     const newX = e.clientX - dragStartPos.current.x
//     const newY = e.clientY - dragStartPos.current.y
    
//     // Keep within viewport bounds
//     const maxX = window.innerWidth - (dragRef.current?.offsetWidth || 320)
//     const maxY = window.innerHeight - (dragRef.current?.offsetHeight || 200)
    
//     setPosition({
//       x: Math.max(0, Math.min(newX, maxX)),
//       y: Math.max(0, Math.min(newY, maxY))
//     })
//   }

//   const handleMouseUp = () => {
//     setIsDragging(false)
//   }

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove)
//       document.addEventListener('mouseup', handleMouseUp)
      
//       return () => {
//         document.removeEventListener('mousemove', handleMouseMove)
//         document.removeEventListener('mouseup', handleMouseUp)
//       }
//     }
//   }, [isDragging])

//   if (!currentCall || callState === "idle") return null

//   const formatDuration = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, "0")}`
//   }

//   const getCallQualityColor = (quality: string) => {
//     switch (quality) {
//       case "excellent": return "text-green-500"
//       case "good": return "text-yellow-500"
//       case "poor": return "text-red-500"
//       default: return "text-green-500"
//     }
//   }

//   return (
//     <div
//       ref={dragRef}
//       className={cn(
//         "fixed z-50 transition-all duration-300 ease-in-out cursor-move select-none",
//         isDragging && "cursor-grabbing transition-none",
//         isExpanded ? "w-[500px]" : "w-80" // Increased expanded width
//       )}
//       style={{
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//       }}
//       onMouseDown={handleMouseDown}
//     >
//       <div className={cn(
//         "relative backdrop-blur-2xl bg-gradient-to-br from-background/95 via-background/90 to-background/95 border border-border/50 rounded-2xl shadow-2xl overflow-hidden",
//         isDragging && "shadow-3xl scale-105"
//       )}>
//         {/* Animated gradient background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 animate-pulse" />

//         {/* Drag handle */}
//         <div className={cn(
//           "absolute top-3 left-3 w-6 h-6 flex items-center justify-center rounded-lg transition-all duration-200 z-10",
//           "bg-muted/50 hover:bg-muted/80 cursor-grab text-muted-foreground",
//           isDragging && "cursor-grabbing bg-primary/20 text-primary"
//         )}>
//           <GripVertical className="h-3 w-3" />
//         </div>

//         <div className={cn("relative", isExpanded ? "p-6" : "p-6")}>
//           {/* Header */}
//           <div className="flex items-start justify-between mb-4">
//             <div className="flex items-center gap-3 ml-6">
//               <div className="relative">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
//                   {currentCall.name.charAt(0)}
//                 </div>
//                 {callState === "active" && (
//                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
//                 )}
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">{currentCall.name}</h3>
//                 <p className="text-sm text-muted-foreground">{currentCall.number}</p>
//                 {isExpanded && (
//                   <div className="flex items-center gap-2 mt-1">
//                     <Badge variant="secondary" className="text-xs">
//                       <Shield className="h-3 w-3 mr-1" />
//                       Encrypted
//                     </Badge>
//                     <Badge variant="outline" className={cn("text-xs", getCallQualityColor(callQuality))}>
//                       {callQuality}
//                     </Badge>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex gap-1">
//               <Button 
//                 variant="ghost" 
//                 size="icon" 
//                 className="h-8 w-8" 
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   setIsExpanded(!isExpanded)
//                 }}
//               >
//                 {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
//               </Button>
//             </div>
//           </div>

//           {/* Call status */}
//           <div className="text-center mb-6">
//             {callState === "dialing" && (
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
//                 <p className="text-sm text-muted-foreground">Calling...</p>
//               </div>
//             )}
//             {callState === "active" && (
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full" />
//                 <p className="text-sm font-medium">{formatDuration(duration)}</p>
//                 {isExpanded && (
//                   <>
//                     <span className="text-muted-foreground">•</span>
//                     <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                       <Users className="h-3 w-3" />
//                       <span>{participants.length} participants</span>
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Expanded Features */}
//           {isExpanded && callState === "active" && (
//             <div className="space-y-4 mb-6">
//               {/* Participants Grid */}
//               <div>
//                 <div className="flex items-center justify-between mb-3">
//                   <h4 className="text-sm font-semibold flex items-center gap-2">
//                     <Users className="h-4 w-4" />
//                     Participants
//                   </h4>
//                   <span className="text-xs text-muted-foreground">{participants.length}/8</span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   {participants.map((participant) => (
//                     <div
//                       key={participant.id}
//                       className={cn(
//                         "flex items-center gap-2 p-2 rounded-lg border transition-all duration-200",
//                         participant.isYou 
//                           ? "bg-primary/10 border-primary/20" 
//                           : "bg-muted/30 border-border/50",
//                         participant.isSpeaking && "ring-2 ring-primary/50"
//                       )}
//                     >
//                       <Avatar className="h-8 w-8">
//                         <AvatarFallback className="text-xs">
//                           {participant.name.split(' ').map(n => n[0]).join('')}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium truncate">
//                           {participant.name}
//                           {participant.isYou && (
//                             <span className="text-xs text-muted-foreground ml-1">(You)</span>
//                           )}
//                         </p>
//                         <div className="flex items-center gap-1">
//                           {participant.isSpeaking && (
//                             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                           )}
//                           <p className="text-xs text-muted-foreground">
//                             {participant.isSpeaking ? "Speaking" : "Listening"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Call Statistics */}
//               <div className="grid grid-cols-2 gap-4 text-xs">
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Audio Quality</span>
//                     <span className={getCallQualityColor(callQuality)}>{callQuality}</span>
//                   </div>
//                   <Progress value={callQuality === "excellent" ? 90 : callQuality === "good" ? 70 : 40} />
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Network</span>
//                     <span className="text-green-500">Stable</span>
//                   </div>
//                   <Progress value={85} />
//                 </div>
//               </div>

//               {/* Additional Controls */}
//               <div className="flex justify-center gap-2">
//                 <Button variant="outline" size="sm" className="flex-1">
//                   <MessageSquare className="h-4 w-4 mr-2" />
//                   Chat
//                 </Button>
//                 <Button variant="outline" size="sm" className="flex-1">
//                   <Share className="h-4 w-4 mr-2" />
//                   Share
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* Primary Action buttons */}
//           <div className={cn(
//             "flex items-center justify-center gap-4 mb-4",
//             isExpanded ? "gap-3" : "gap-4"
//           )}>
//             <Button
//               variant="ghost"
//               size="icon"
//               className={cn(
//                 "rounded-full backdrop-blur-xl transition-all duration-200",
//                 isMuted ? "bg-red-500/20 hover:bg-red-500/30 text-red-500" : "bg-muted/50 hover:bg-muted",
//                 isExpanded ? "h-12 w-12" : "h-14 w-14"
//               )}
//               onClick={(e) => {
//                 e.stopPropagation()
//                 setIsMuted(!isMuted)
//               }}
//             >
//               {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//             </Button>

//             <Button
//               variant="ghost"
//               size="icon"
//               className={cn(
//                 "rounded-full backdrop-blur-xl transition-all duration-200",
//                 isSpeaker ? "bg-primary/20 hover:bg-primary/30 text-primary" : "bg-muted/50 hover:bg-muted",
//                 isExpanded ? "h-12 w-12" : "h-14 w-14"
//               )}
//               onClick={(e) => {
//                 e.stopPropagation()
//                 setIsSpeaker(!isSpeaker)
//               }}
//             >
//               {isSpeaker ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
//             </Button>

//             <Button
//               variant="ghost"
//               size="icon"
//               className={cn(
//                 "rounded-full backdrop-blur-xl transition-all duration-200",
//                 isVideoOn ? "bg-primary/20 hover:bg-primary/30 text-primary" : "bg-muted/50 hover:bg-muted",
//                 isExpanded ? "h-12 w-12" : "h-14 w-14"
//               )}
//               onClick={(e) => {
//                 e.stopPropagation()
//                 setIsVideoOn(!isVideoOn)
//               }}
//             >
//               <Video className="h-5 w-5" />
//             </Button>

//             {isExpanded && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={cn(
//                   "h-12 w-12 rounded-full backdrop-blur-xl transition-all duration-200",
//                   isScreenSharing ? "bg-green-500/20 hover:bg-green-500/30 text-green-500" : "bg-muted/50 hover:bg-muted"
//                 )}
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   setIsScreenSharing(!isScreenSharing)
//                 }}
//               >
//                 <Monitor className="h-5 w-5" />
//               </Button>
//             )}
//           </div>

//           {/* End call button */}
//           <Button
//             onClick={(e) => {
//               e.stopPropagation()
//               endCall()
//             }}
//             className={cn(
//               "w-full rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-lg shadow-red-500/25",
//               isExpanded ? "h-11" : "h-12"
//             )}
//           >
//             <Phone className="h-4 w-4 mr-2 rotate-[135deg]" />
//             End Call
//           </Button>

//           {/* Quick actions footer when expanded */}
//           {isExpanded && (
//             <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-border/50">
//               <Button variant="ghost" size="sm" className="text-xs">
//                 <Calendar className="h-3 w-3 mr-1" />
//                 Schedule
//               </Button>
//               <Button variant="ghost" size="sm" className="text-xs">
//                 <FileText className="h-3 w-3 mr-1" />
//                 Notes
//               </Button>
//               <Button variant="ghost" size="sm" className="text-xs">
//                 <User className="h-3 w-3 mr-1" />
//                 Profile
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }





// "use client"

// import { useCall } from "@/lib/call-context"
// import { 
//   Phone, 
//   Video, 
//   Mic, 
//   MicOff, 
//   Volume2, 
//   VolumeX, 
//   Maximize2, 
//   Minimize2, 
//   GripVertical, 
//   Users,
//   MessageSquare,
//   Share,
//   Monitor,
//   Cast,
//   Clock,
//   Calendar,
//   User,
//   FileText,
//   MoreHorizontal,
//   Shield,
//   Lock,
//   Signal,
//   Wifi
// } from "lucide-react"
// import { useState, useEffect, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { cn } from "@/lib/utils"

// export function FloatingCallWidget() {
//   const { currentCall, callState, endCall } = useCall()
//   const [duration, setDuration] = useState(0)
//   const [isMuted, setIsMuted] = useState(false)
//   const [isSpeaker, setIsSpeaker] = useState(false)
//   const [isVideoOn, setIsVideoOn] = useState(false)
//   const [isScreenSharing, setIsScreenSharing] = useState(false)
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [callQuality, setCallQuality] = useState<"excellent" | "good" | "poor">("excellent")
//   const [isMinimizing, setIsMinimizing] = useState(false)
  
//   // Dragging state
//   const [position, setPosition] = useState({ x: 20, y: 20 })
//   const [isDragging, setIsDragging] = useState(false)
//   const dragRef = useRef<HTMLDivElement>(null)
//   const dragStartPos = useRef({ x: 0, y: 0 })

//   // Mock participants
//   const participants = [
//     { id: 1, name: "You", avatar: "", isYou: true, isSpeaking: true, role: "Host" },
//     { id: 2, name: "Sarah Wilson", avatar: "", isSpeaking: false, role: "Participant" },
//     { id: 3, name: "Mike Chen", avatar: "", isSpeaking: true, role: "Co-host" },
//     { id: 4, name: "Emily Davis", avatar: "", isSpeaking: false, role: "Participant" },
//     // { id: 5, name: "Alex Johnson", avatar: "", isSpeaking: false, role: "Participant" },
//   ]

//   useEffect(() => {
//     if (callState === "active") {
//       const interval = setInterval(() => {
//         setDuration((prev) => prev + 1)
//       }, 1000)

//       // Simulate call quality changes
//       const qualityInterval = setInterval(() => {
//         const qualities = ["excellent", "good", "poor"] as const
//         setCallQuality(qualities[Math.floor(Math.random() * qualities.length)])
//       }, 10000)

//       return () => {
//         clearInterval(interval)
//         clearInterval(qualityInterval)
//       }
//     } else {
//       setDuration(0)
//     }
//   }, [callState])

//   // Instant toggle without animation delay
//   const handleToggleExpand = (e: React.MouseEvent) => {
//     e.stopPropagation()
//     setIsExpanded(!isExpanded)
//   }

//   // Drag handlers
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (e.button !== 0) return // Only left click
    
//     setIsDragging(true)
//     dragStartPos.current = {
//       x: e.clientX - position.x,
//       y: e.clientY - position.y
//     }
    
//     e.preventDefault()
//   }

//   const handleMouseMove = (e: MouseEvent) => {
//     if (!isDragging) return
    
//     const newX = e.clientX - dragStartPos.current.x
//     const newY = e.clientY - dragStartPos.current.y
    
//     // Keep within viewport bounds
//     const maxX = window.innerWidth - (dragRef.current?.offsetWidth || 320)
//     const maxY = window.innerHeight - (dragRef.current?.offsetHeight || 200)
    
//     setPosition({
//       x: Math.max(0, Math.min(newX, maxX)),
//       y: Math.max(0, Math.min(newY, maxY))
//     })
//   }

//   const handleMouseUp = () => {
//     setIsDragging(false)
//   }

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove)
//       document.addEventListener('mouseup', handleMouseUp)
      
//       return () => {
//         document.removeEventListener('mousemove', handleMouseMove)
//         document.removeEventListener('mouseup', handleMouseUp)
//       }
//     }
//   }, [isDragging])

//   if (!currentCall || callState === "idle") return null

//   const formatDuration = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, "0")}`
//   }

//   const getCallQualityColor = (quality: string) => {
//     switch (quality) {
//       case "excellent": return "text-green-500"
//       case "good": return "text-yellow-500"
//       case "poor": return "text-red-500"
//       default: return "text-green-500"
//     }
//   }

//   const getCallQualityProgress = (quality: string) => {
//     switch (quality) {
//       case "excellent": return 95
//       case "good": return 75
//       case "poor": return 45
//       default: return 95
//     }
//   }

//   return (
//     <div
//       ref={dragRef}
//       className={cn(
//         "fixed z-50 transition-all duration-200 ease-out cursor-move select-none",
//         isDragging && "cursor-grabbing transition-none",
//         isExpanded ? "w-[480px]" : "w-80"
//       )}
//       style={{
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//       }}
//       onMouseDown={handleMouseDown}
//     >
//       <div className={cn(
//         "relative backdrop-blur-2xl bg-gradient-to-br from-background/98 via-background/95 to-background/98 border border-border/60 rounded-2xl shadow-2xl overflow-hidden",
//         isDragging && "shadow-3xl scale-105"
//       )}>
//         {/* Animated gradient background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 animate-pulse" />

//         {/* Drag handle */}
//         <div className={cn(
//           "absolute top-3 left-3 w-6 h-6 flex items-center justify-center rounded-lg transition-all duration-200 z-10",
//           "bg-muted/50 hover:bg-muted/80 cursor-grab text-muted-foreground",
//           isDragging && "cursor-grabbing bg-primary/20 text-primary"
//         )}>
//           <GripVertical className="h-3 w-3" />
//         </div>

//         <div className={cn("relative", isExpanded ? "p-6" : "p-5")}>
//           {/* Header */}
//           <div className={cn("flex items-start justify-between", isExpanded ? "mb-6" : "mb-4")}>
//             <div className="flex items-center gap-3 ml-6">
//               <div className="relative">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
//                   {currentCall.name.charAt(0)}
//                 </div>
//                 {callState === "active" && (
//                   <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
//                 )}
//               </div>
//               <div className="space-y-1">
//                 <h3 className="font-semibold text-lg leading-tight">{currentCall.name}</h3>
//                 <p className="text-sm text-muted-foreground leading-tight">{currentCall.number}</p>
//                 {isExpanded && (
//                   <div className="flex items-center gap-2 mt-2">
//                     <Badge variant="secondary" className="text-xs px-2 py-0 h-5">
//                       <Shield className="h-3 w-3 mr-1" />
//                       Encrypted
//                     </Badge>
//                     <Badge variant="outline" className={cn("text-xs px-2 py-0 h-5", getCallQualityColor(callQuality))}>
//                       <Signal className="h-3 w-3 mr-1" />
//                       {callQuality}
//                     </Badge>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div  onClick={handleToggleExpand} className="flex gap-1">
//               <Button 
//                 variant="ghost" 
//                 size="icon" 
//                 className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors" 
//                 onClick={handleToggleExpand}
//               >
//                 {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
//               </Button>
//             </div>
//           </div>

//           {/* Call status */}
//           <div className={cn("text-center", isExpanded ? "mb-6" : "mb-5")}>
//             {callState === "dialing" && (
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
//                 <p className="text-sm text-muted-foreground">Calling...</p>
//               </div>
//             )}
//             {callState === "active" && (
//               <div className="flex items-center justify-center gap-2 flex-wrap">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-green-500 rounded-full" />
//                   <p className="text-sm font-medium">{formatDuration(duration)}</p>
//                 </div>
//                 {isExpanded && (
//                   <>
//                     <span className="text-muted-foreground text-sm">•</span>
//                     <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                       <Users className="h-4 w-4" />
//                       <span>{participants.length} participants</span>
//                     </div>
//                     <span className="text-muted-foreground text-sm">•</span>
//                     <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                       <Wifi className="h-4 w-4" />
//                       <span>Stable</span>
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Expanded Features */}
//           {isExpanded && callState === "active" && (
//             <div className="space-y-5 mb-6">
//               {/* Participants Grid */}
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground">
//                     <Users className="h-4 w-4" />
//                     Participants
//                   </h4>
//                   <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
//                     {participants.length}/8
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {participants.map((participant) => (
//                     <div
//                       key={participant.id}
//                       className={cn(
//                         "flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 group",
//                         participant.isYou 
//                           ? "bg-primary/10 border-primary/20 shadow-sm" 
//                           : "bg-muted/20 border-border/50",
//                         participant.isSpeaking && "ring-2 ring-primary/40 shadow-md"
//                       )}
//                     >
//                       <div className="relative">
//                         <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
//                           <AvatarFallback className={cn(
//                             "text-sm font-medium",
//                             participant.isYou ? "bg-primary text-primary-foreground" : "bg-muted"
//                           )}>
//                             {participant.name.split(' ').map(n => n[0]).join('')}
//                           </AvatarFallback>
//                         </Avatar>
//                         {participant.isSpeaking && (
//                           <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0 space-y-1">
//                         <div className="flex items-center gap-1">
//                           <p className="text-sm font-medium truncate">
//                             {participant.name}
//                           </p>
//                           {participant.isYou && (
//                             <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
//                               You
//                             </Badge>
//                           )}
//                         </div>
//                         <p className="text-xs text-muted-foreground capitalize">
//                           {participant.role}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Call Statistics */}
//               <div className="space-y-4 p-4 rounded-xl bg-muted/30 border border-border/50">
//                 <h4 className="text-sm font-semibold flex items-center gap-2">
//                   <Signal className="h-4 w-4" />
//                   Call Quality
//                 </h4>
//                 <div className="space-y-3">
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-muted-foreground">Audio Quality</span>
//                       <span className={cn("font-medium", getCallQualityColor(callQuality))}>
//                         {callQuality.charAt(0).toUpperCase() + callQuality.slice(1)}
//                       </span>
//                     </div>
//                     <Progress value={getCallQualityProgress(callQuality)} className="h-2" />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-muted-foreground">Network Stability</span>
//                       <span className="text-green-500 font-medium">Excellent</span>
//                     </div>
//                     <Progress value={92} className="h-2" />
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Controls */}
//               <div className="flex gap-2">
//                 <Button variant="outline" size="sm" className="flex-1 h-9">
//                   <MessageSquare className="h-4 w-4 mr-2" />
//                   Chat
//                 </Button>
//                 <Button variant="outline" size="sm" className="flex-1 h-9">
//                   <Share className="h-4 w-4 mr-2" />
//                   Share
//                 </Button>
//                 <Button variant="outline" size="sm" className="h-9 w-9">
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* Primary Action buttons */}
//           <div className={cn(
//             "flex items-center justify-center gap-4",
//             isExpanded ? "mb-6 gap-3" : "mb-5 gap-4"
//           )}>
//             <Button
//               variant="ghost"
//               size="icon"
//               className={cn(
//                 "rounded-full backdrop-blur-xl transition-all duration-200 border border-border/50",
//                 isMuted ? "bg-red-500/20 hover:bg-red-500/30 text-red-500 border-red-500/30" : "bg-muted/50 hover:bg-muted border-border/60",
//                 isExpanded ? "h-12 w-12" : "h-14 w-14"
//               )}
//               onClick={(e) => {
//                 e.stopPropagation()
//                 setIsMuted(!isMuted)
//               }}
//             >
//               {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//             </Button>

//             <Button
//               variant="ghost"
//               size="icon"
//               className={cn(
//                 "rounded-full backdrop-blur-xl transition-all duration-200 border border-border/50",
//                 isSpeaker ? "bg-primary/20 hover:bg-primary/30 text-primary border-primary/30" : "bg-muted/50 hover:bg-muted border-border/60",
//                 isExpanded ? "h-12 w-12" : "h-14 w-14"
//               )}
//               onClick={(e) => {
//                 e.stopPropagation()
//                 setIsSpeaker(!isSpeaker)
//               }}
//             >
//               {isSpeaker ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
//             </Button>

//             <Button
//               variant="ghost"
//               size="icon"
//               className={cn(
//                 "rounded-full backdrop-blur-xl transition-all duration-200 border border-border/50",
//                 isVideoOn ? "bg-primary/20 hover:bg-primary/30 text-primary border-primary/30" : "bg-muted/50 hover:bg-muted border-border/60",
//                 isExpanded ? "h-12 w-12" : "h-14 w-14"
//               )}
//               onClick={(e) => {
//                 e.stopPropagation()
//                 setIsVideoOn(!isVideoOn)
//               }}
//             >
//               <Video className="h-5 w-5" />
//             </Button>

//             {isExpanded && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={cn(
//                   "h-12 w-12 rounded-full backdrop-blur-xl transition-all duration-200 border border-border/50",
//                   isScreenSharing ? "bg-green-500/20 hover:bg-green-500/30 text-green-500 border-green-500/30" : "bg-muted/50 hover:bg-muted border-border/60"
//                 )}
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   setIsScreenSharing(!isScreenSharing)
//                 }}
//               >
//                 <Monitor className="h-5 w-5" />
//               </Button>
//             )}
//           </div>

//           {/* End call button */}
//           <Button
//             onClick={(e) => {
//               e.stopPropagation()
//               endCall()
//               setIsExpanded(false)
//             }}
//             className={cn(
//               "w-full rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-lg shadow-red-500/25 border-0 transition-all duration-200",
//               isExpanded ? "h-11 text-sm" : "h-12 text-base"
//             )}
//           >
//             <Phone className="h-4 w-4 mr-2 rotate-[135deg]" />
//             End Call
//           </Button>

//           {/* Quick actions footer when expanded */}
//           {isExpanded && (
//             <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/50">
//               <Button variant="ghost" size="sm" className="text-xs h-8 px-3">
//                 <Calendar className="h-3 w-3 mr-2" />
//                 Schedule
//               </Button>
//               <Button variant="ghost" size="sm" className="text-xs h-8 px-3">
//                 <FileText className="h-3 w-3 mr-2" />
//                 Notes
//               </Button>
//               <Button variant="ghost" size="sm" className="text-xs h-8 px-3">
//                 <User className="h-3 w-3 mr-2" />
//                 Profile
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useCall } from "@/lib/call-context"
import { 
  Phone, 
  Video, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  GripVertical,
  Users
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function FloatingCallWidget() {
  const { currentCall, callState, endCall } = useCall()
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaker, setIsSpeaker] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Dragging state
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const dragStartPos = useRef({ x: 0, y: 0 })

  // Mock participants
  const participants = [
    { id: 1, name: "You", isYou: true, isSpeaking: true },
    { id: 2, name: "Sarah Wilson", isSpeaking: false },
    { id: 3, name: "Mike Chen", isSpeaking: true },
    { id: 4, name: "Emily Davis", isSpeaking: false },
  ]

  useEffect(() => {
    if (callState === "active") {
      const interval = setInterval(() => {
        setDuration((prev) => prev + 1)
      }, 1000)

      return () => clearInterval(interval)
    } else {
      setDuration(0)
    }
  }, [callState])

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    
    setIsDragging(true)
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
    
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    
    const newX = e.clientX - dragStartPos.current.x
    const newY = e.clientY - dragStartPos.current.y
    
    const maxX = window.innerWidth - (dragRef.current?.offsetWidth || 320)
    const maxY = window.innerHeight - (dragRef.current?.offsetHeight || 200)
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  if (!currentCall || callState === "idle") return null

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div
      ref={dragRef}
      className={cn(
        "fixed z-50 bg-white border border-gray-300 rounded-lg cursor-move select-none",
        isExpanded ? "w-96" : "w-80",
        isDragging && "shadow-md"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="relative">
        {/* Drag handle */}
        <div className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center cursor-grab text-gray-500">
          <GripVertical className="h-3 w-3" />
        </div>

        <div className={cn(isExpanded ? "p-4" : "p-3")}>
          {/* Header */}
          <div className={cn("flex items-start justify-between", isExpanded ? "mb-4" : "mb-3")}>
            <div className="flex items-center gap-2 ml-6">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {currentCall.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-sm">{currentCall.name}</h3>
                <p className="text-xs text-gray-600">{currentCall.number}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0" 
              onClick={handleToggleExpand}
            >
              {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
            </Button>
          </div>

          {/* Call status */}
          <div className={cn("text-center", isExpanded ? "mb-4" : "mb-3")}>
            {callState === "dialing" && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <p className="text-xs text-gray-600">Calling...</p>
              </div>
            )}
            {callState === "active" && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p className="text-sm font-medium">{formatDuration(duration)}</p>
                {isExpanded && (
                  <>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Users className="h-3 w-3" />
                      <span>{participants.length}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Expanded Participants */}
          {isExpanded && callState === "active" && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-medium text-gray-700">Participants</h4>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {participants.length}/8
                </span>
              </div>
              <div className="space-y-2">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded border",
                      participant.isSpeaking && "bg-blue-50 border-blue-200"
                    )}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className={cn(
                        "text-xs",
                        participant.isYou ? "bg-blue-600 text-white" : "bg-gray-300"
                      )}>
                        {participant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        {participant.name}
                        {participant.isYou && (
                          <span className="text-xs text-gray-500 ml-1">(You)</span>
                        )}
                      </p>
                    </div>
                    {participant.isSpeaking && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Control buttons */}
          <div className={cn(
            "flex items-center justify-center gap-2",
            isExpanded ? "mb-4" : "mb-3"
          )}>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                isMuted ? "bg-red-100 border-red-300 text-red-700" : ""
              )}
              onClick={(e) => {
                e.stopPropagation()
                setIsMuted(!isMuted)
              }}
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                isSpeaker ? "bg-blue-100 border-blue-300 text-blue-700" : ""
              )}
              onClick={(e) => {
                e.stopPropagation()
                setIsSpeaker(!isSpeaker)
              }}
            >
              {isSpeaker ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                isVideoOn ? "bg-blue-100 border-blue-300 text-blue-700" : ""
              )}
              onClick={(e) => {
                e.stopPropagation()
                setIsVideoOn(!isVideoOn)
              }}
            >
              <Video className="h-4 w-4" />
            </Button>
          </div>

          {/* End call button */}
          <Button
            onClick={(e) => {
              e.stopPropagation()
              endCall()
              setIsExpanded(false)
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <Phone className="h-4 w-4 mr-2 rotate-[135deg]" />
            End Call
          </Button>
        </div>
      </div>
    </div>
  )
}