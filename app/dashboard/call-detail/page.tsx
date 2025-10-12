// "use client"

// import type React from "react"

// import { useState, useEffect, useRef } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Calendar, Play, Pause, SkipBack, SkipForward, Volume2, X, Search } from "lucide-react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface CDRRecord {
//   id: number
//   date: string
//   customer: string
//   agent: string
//   queue: string
//   recording: string
//   disposition: string
//   duration: string
// }

// export default function CDRPage() {
//   const [records, setRecords] = useState<CDRRecord[]>([])
//   const [loading, setLoading] = useState(true)
//   const [dateRange, setDateRange] = useState("10/12/2025 - 12/10/2025")

//   const [searchQuery, setSearchQuery] = useState("")
//   const [filterAgent, setFilterAgent] = useState("all")
//   const [filterQueue, setFilterQueue] = useState("all")
//   const [filterDisposition, setFilterDisposition] = useState("all")

//   const [currentPage, setCurrentPage] = useState(1)
//   const recordsPerPage = 10

//   const [currentRecording, setCurrentRecording] = useState<CDRRecord | null>(null)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [currentTime, setCurrentTime] = useState(0)
//   const [duration, setDuration] = useState(0)
//   const [volume, setVolume] = useState(1)
//   const audioRef = useRef<HTMLAudioElement>(null)

//   const generateDummyData = (): CDRRecord[] => {
//     const agents = [
//       "Nosipho Baloyi",
//       "Hekela Sanga",
//       "Martha Mgana",
//       "Peter Kisinga",
//       "Linda Mathias",
//       "Justin Gara",
//       "Allen Kakwale",
//       "Loyce Kisepe",
//       "Ismail Mbezi",
//       "Emmanuel Maunganya",
//     ]

//     const queues = ["Sales", "Support", "Billing", "Technical", "General"]
//     const dispositions = ["Answered", "Missed", "Voicemail", "Transferred", "Abandoned"]

//     const data: CDRRecord[] = []

//     for (let i = 1; i <= 50; i++) {
//       const randomAgent = agents[Math.floor(Math.random() * agents.length)]
//       const randomQueue = queues[Math.floor(Math.random() * queues.length)]
//       const randomDisposition = dispositions[Math.floor(Math.random() * dispositions.length)]

//       const randomDate = new Date()
//       randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30))

//       const minutes = Math.floor(Math.random() * 30)
//       const seconds = Math.floor(Math.random() * 60)
//       const duration = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

//       data.push({
//         id: i,
//         date: randomDate.toLocaleString("en-US", {
//           year: "numeric",
//           month: "2-digit",
//           day: "2-digit",
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//         }),
//         customer: `+255${Math.floor(Math.random() * 900000000 + 100000000)}`,
//         agent: randomAgent,
//         queue: randomQueue,
//         recording: `/recordings/rec_${i}.wav`,
//         disposition: randomDisposition,
//         duration: duration,
//       })
//     }

//     return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//   }

//   const filteredRecords = records.filter((record) => {
//     const matchesSearch =
//       searchQuery === "" ||
//       record.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       record.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       record.queue.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       record.disposition.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       record.date.toLowerCase().includes(searchQuery.toLowerCase())

//     const matchesAgent = filterAgent === "all" || record.agent === filterAgent

//     const matchesQueue = filterQueue === "all" || record.queue === filterQueue

//     const matchesDisposition = filterDisposition === "all" || record.disposition === filterDisposition

//     return matchesSearch && matchesAgent && matchesQueue && matchesDisposition
//   })

//   const indexOfLastRecord = currentPage * recordsPerPage
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
//   const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord)
//   const totalPages = Math.ceil(filteredRecords.length / recordsPerPage)

//   const uniqueAgents = Array.from(new Set(records.map((r) => r.agent))).sort()
//   const uniqueQueues = Array.from(new Set(records.map((r) => r.queue))).sort()
//   const uniqueDispositions = Array.from(new Set(records.map((r) => r.disposition))).sort()

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [searchQuery, filterAgent, filterQueue, filterDisposition])

//   const playRecording = (record: CDRRecord) => {
//     setCurrentRecording(record)
//     setIsPlaying(true)
//   }

//   const togglePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause()
//       } else {
//         audioRef.current.play()
//       }
//       setIsPlaying(!isPlaying)
//     }
//   }

//   const handleTimeUpdate = () => {
//     if (audioRef.current) {
//       setCurrentTime(audioRef.current.currentTime)
//     }
//   }

//   const handleLoadedMetadata = () => {
//     if (audioRef.current) {
//       setDuration(audioRef.current.duration)
//     }
//   }

//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const time = Number.parseFloat(e.target.value)
//     setCurrentTime(time)
//     if (audioRef.current) {
//       audioRef.current.currentTime = time
//     }
//   }

//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const vol = Number.parseFloat(e.target.value)
//     setVolume(vol)
//     if (audioRef.current) {
//       audioRef.current.volume = vol
//     }
//   }

//   const skipForward = () => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration)
//     }
//   }

//   const skipBackward = () => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0)
//     }
//   }

//   const closePlayer = () => {
//     if (audioRef.current) {
//       audioRef.current.pause()
//     }
//     setCurrentRecording(null)
//     setIsPlaying(false)
//     setCurrentTime(0)
//   }

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60)
//     const seconds = Math.floor(time % 60)
//     return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//   }

//   useEffect(() => {
//     setTimeout(() => {
//       setRecords(generateDummyData())
//       setLoading(false)
//     }, 1500)
//   }, [])

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
//           <div className="text-xl font-semibold text-blue-600">Loading Call Detail Records...</div>
//           <div className="text-sm text-gray-500 mt-2">V10.5.15</div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 pb-32">
//       <div className="max-w-7xl mx-auto">
//         <Card className="shadow-lg">
//           <CardHeader className="border-b bg-white">
//             <CardTitle className="text-gray-600 text-lg font-medium">CALL DETAIL RECORDS</CardTitle>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="mb-6">
//               <div className="flex items-center gap-2 max-w-md">
//                 <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
//                   <div className="bg-gray-100 px-3 py-2 border-r">
//                     <Calendar className="h-5 w-5 text-gray-600" />
//                   </div>
//                   <Input
//                     type="text"
//                     value={dateRange}
//                     onChange={(e) => setDateRange(e.target.value)}
//                     className="border-0 shadow-none focus-visible:ring-0"
//                     placeholder="Select date range"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6 space-y-4">
//               <div className="flex items-center gap-2">
//                 <div className="relative flex-1 max-w-md">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <Input
//                     type="text"
//                     placeholder="Search by customer, agent, queue, disposition..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//                 {searchQuery && (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setSearchQuery("")}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     Clear
//                   </Button>
//                 )}
//               </div>

//               <div className="flex items-center gap-3 flex-wrap">
//                 <span className="text-sm font-medium text-gray-700">Filters:</span>

//                 <Select value={filterAgent} onValueChange={setFilterAgent}>
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="All Agents" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Agents</SelectItem>
//                     {uniqueAgents.map((agent) => (
//                       <SelectItem key={agent} value={agent}>
//                         {agent}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>

//                 <Select value={filterQueue} onValueChange={setFilterQueue}>
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="All Queues" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Queues</SelectItem>
//                     {uniqueQueues.map((queue) => (
//                       <SelectItem key={queue} value={queue}>
//                         {queue}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>

//                 <Select value={filterDisposition} onValueChange={setFilterDisposition}>
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="All Dispositions" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Dispositions</SelectItem>
//                     {uniqueDispositions.map((disposition) => (
//                       <SelectItem key={disposition} value={disposition}>
//                         {disposition}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>

//                 {(filterAgent !== "all" || filterQueue !== "all" || filterDisposition !== "all") && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => {
//                       setFilterAgent("all")
//                       setFilterQueue("all")
//                       setFilterDisposition("all")
//                     }}
//                     className="text-gray-600"
//                   >
//                     Reset Filters
//                   </Button>
//                 )}
//               </div>
//             </div>

//             <div className="border rounded-lg overflow-hidden shadow-sm">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-blue-600 hover:bg-blue-600">
//                     <TableHead className="text-white font-semibold">#</TableHead>
//                     <TableHead className="text-white font-semibold">Date</TableHead>
//                     <TableHead className="text-white font-semibold">Customer</TableHead>
//                     <TableHead className="text-white font-semibold">Agent</TableHead>
//                     <TableHead className="text-white font-semibold">Queue</TableHead>
//                     <TableHead className="text-white font-semibold">Recording</TableHead>
//                     <TableHead className="text-white font-semibold">Disposition</TableHead>
//                     <TableHead className="text-white font-semibold">Duration</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {currentRecords.map((record) => (
//                     <TableRow key={record.id} className="hover:bg-gray-50">
//                       <TableCell className="font-medium">{record.id}</TableCell>
//                       <TableCell className="text-sm">{record.date}</TableCell>
//                       <TableCell className="text-sm">{record.customer}</TableCell>
//                       <TableCell className="text-sm">{record.agent}</TableCell>
//                       <TableCell>
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                           {record.queue}
//                         </span>
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
//                           onClick={() => playRecording(record)}
//                         >
//                           <Play className="h-4 w-4 mr-1" />
//                           Play
//                         </Button>
//                       </TableCell>
//                       <TableCell>
//                         <span
//                           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                             record.disposition === "Answered"
//                               ? "bg-green-100 text-green-800"
//                               : record.disposition === "Missed"
//                                 ? "bg-red-100 text-red-800"
//                                 : record.disposition === "Voicemail"
//                                   ? "bg-yellow-100 text-yellow-800"
//                                   : record.disposition === "Transferred"
//                                     ? "bg-purple-100 text-purple-800"
//                                     : "bg-gray-100 text-gray-800"
//                           }`}
//                         >
//                           {record.disposition}
//                         </span>
//                       </TableCell>
//                       <TableCell className="font-mono text-sm">{record.duration}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>

//             <div className="mt-6 flex items-center justify-between">
//               <div className="text-sm text-gray-600">
//                 Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredRecords.length)} of{" "}
//                 {filteredRecords.length}{" "}
//                 {filteredRecords.length !== records.length && `(filtered from ${records.length} total)`} records
//               </div>
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                 >
//                   Previous
//                 </Button>
//                 <div className="flex gap-1">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                     <Button
//                       key={page}
//                       variant={currentPage === page ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => setCurrentPage(page)}
//                       className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
//                     >
//                       {page}
//                     </Button>
//                   ))}
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {currentRecording && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl z-50">
//           <div className="max-w-7xl mx-auto p-4">
//             <div className="flex items-center gap-4">
//               <div className="flex-shrink-0 w-64">
//                 <div className="text-sm font-semibold text-gray-900 truncate">Recording #{currentRecording.id}</div>
//                 <div className="text-xs text-gray-500 truncate">
//                   {currentRecording.agent} - {currentRecording.customer}
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Button variant="ghost" size="sm" onClick={skipBackward}>
//                   <SkipBack className="h-4 w-4" />
//                 </Button>
//                 <Button variant="default" size="sm" onClick={togglePlayPause} className="bg-blue-600 hover:bg-blue-700">
//                   {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
//                 </Button>
//                 <Button variant="ghost" size="sm" onClick={skipForward}>
//                   <SkipForward className="h-4 w-4" />
//                 </Button>
//               </div>

//               <div className="flex-1 flex items-center gap-3">
//                 <span className="text-xs text-gray-600 font-mono w-12">{formatTime(currentTime)}</span>
//                 <input
//                   type="range"
//                   min="0"
//                   max={duration || 0}
//                   value={currentTime}
//                   onChange={handleSeek}
//                   className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//                 />
//                 <span className="text-xs text-gray-600 font-mono w-12">{formatTime(duration)}</span>
//               </div>

//               <div className="flex items-center gap-2 w-32">
//                 <Volume2 className="h-4 w-4 text-gray-600" />
//                 <input
//                   type="range"
//                   min="0"
//                   max="1"
//                   step="0.01"
//                   value={volume}
//                   onChange={handleVolumeChange}
//                   className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//                 />
//               </div>

//               <Button variant="ghost" size="sm" onClick={closePlayer}>
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           <audio
//             ref={audioRef}
//             src={currentRecording.recording}
//             onTimeUpdate={handleTimeUpdate}
//             onLoadedMetadata={handleLoadedMetadata}
//             onEnded={() => setIsPlaying(false)}
//             autoPlay
//           />
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Pause, SkipBack, SkipForward, Volume2, X, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"

interface CDRRecord {
  id: number
  date: string
  customer: string
  agent: string
  queue: string
  recording: string
  disposition: string
  duration: string
}

export default function CDRPage() {
  const [records, setRecords] = useState<CDRRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState("08/23/2025 3:02 PM - 10/12/2025 3:02 PM")

  const [searchQuery, setSearchQuery] = useState("")
  const [filterAgent, setFilterAgent] = useState("all")
  const [filterQueue, setFilterQueue] = useState("all")
  const [filterDisposition, setFilterDisposition] = useState("all")

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10

  const [currentRecording, setCurrentRecording] = useState<CDRRecord | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  const generateDummyData = (): CDRRecord[] => {
    const agents = [
      "Nosipho Baloyi",
      "Hekela Sanga",
      "Martha Mgana",
      "Peter Kisinga",
      "Linda Mathias",
      "Justin Gara",
      "Allen Kakwale",
      "Loyce Kisepe",
      "Ismail Mbezi",
      "Emmanuel Maunganya",
    ]

    const queues = ["Sales", "Support", "Billing", "Technical", "General"]
    const dispositions = ["Answered", "Missed", "Voicemail", "Transferred", "Abandoned"]

    const data: CDRRecord[] = []

    for (let i = 1; i <= 50; i++) {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)]
      const randomQueue = queues[Math.floor(Math.random() * queues.length)]
      const randomDisposition = dispositions[Math.floor(Math.random() * dispositions.length)]

      const randomDate = new Date()
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30))

      const minutes = Math.floor(Math.random() * 30)
      const seconds = Math.floor(Math.random() * 60)
      const duration = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

      data.push({
        id: i,
        date: randomDate.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        customer: `+255${Math.floor(Math.random() * 900000000 + 100000000)}`,
        agent: randomAgent,
        queue: randomQueue,
        recording: `/recordings/rec_${i}.wav`,
        disposition: randomDisposition,
        duration: duration,
      })
    }

    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      searchQuery === "" ||
      record.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.queue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.disposition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.date.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesAgent = filterAgent === "all" || record.agent === filterAgent

    const matchesQueue = filterQueue === "all" || record.queue === filterQueue

    const matchesDisposition = filterDisposition === "all" || record.disposition === filterDisposition

    return matchesSearch && matchesAgent && matchesQueue && matchesDisposition
  })

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage)

  const uniqueAgents = Array.from(new Set(records.map((r) => r.agent))).sort()
  const uniqueQueues = Array.from(new Set(records.map((r) => r.queue))).sort()
  const uniqueDispositions = Array.from(new Set(records.map((r) => r.disposition))).sort()

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filterAgent, filterQueue, filterDisposition])

  const playRecording = (record: CDRRecord) => {
    setCurrentRecording(record)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number.parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
  }

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration)
    }
  }

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0)
    }
  }

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setCurrentRecording(null)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    setTimeout(() => {
      setRecords(generateDummyData())
      setLoading(false)
    }, 1500)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-xl font-semibold text-blue-600">Loading Call Detail Records...</div>
          <div className="text-sm text-gray-500 mt-2">V10.5.15</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-32">
      <div className=" mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-white">
            <CardTitle className="text-gray-600 text-lg font-medium">CALL DETAIL RECORDS</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>

            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-medium text-gray-700">Filters:</span>

                <Select value={filterAgent} onValueChange={setFilterAgent}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Agents" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    {uniqueAgents.map((agent) => (
                      <SelectItem key={agent} value={agent}>
                        {agent}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterQueue} onValueChange={setFilterQueue}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Queues" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Queues</SelectItem>
                    {uniqueQueues.map((queue) => (
                      <SelectItem key={queue} value={queue}>
                        {queue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterDisposition} onValueChange={setFilterDisposition}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Dispositions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dispositions</SelectItem>
                    {uniqueDispositions.map((disposition) => (
                      <SelectItem key={disposition} value={disposition}>
                        {disposition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {(filterAgent !== "all" || filterQueue !== "all" || filterDisposition !== "all") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilterAgent("all")
                      setFilterQueue("all")
                      setFilterDisposition("all")
                    }}
                    className="text-gray-600"
                  >
                    Reset Filters
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Search:</span>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-600 hover:bg-blue-600">
                    <TableHead className="text-white font-semibold">#</TableHead>
                    <TableHead className="text-white font-semibold">Date</TableHead>
                    <TableHead className="text-white font-semibold">Customer</TableHead>
                    <TableHead className="text-white font-semibold">Agent</TableHead>
                    <TableHead className="text-white font-semibold">Queue</TableHead>
                    <TableHead className="text-white font-semibold">Recording</TableHead>
                    <TableHead className="text-white font-semibold">Disposition</TableHead>
                    <TableHead className="text-white font-semibold">Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell className="text-sm">{record.date}</TableCell>
                      <TableCell className="text-sm">{record.customer}</TableCell>
                      <TableCell className="text-sm">{record.agent}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {record.queue}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          onClick={() => playRecording(record)}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Play
                        </Button>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            record.disposition === "Answered"
                              ? "bg-green-100 text-green-800"
                              : record.disposition === "Missed"
                                ? "bg-red-100 text-red-800"
                                : record.disposition === "Voicemail"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : record.disposition === "Transferred"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {record.disposition}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{record.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredRecords.length)} of{" "}
                {filteredRecords.length}{" "}
                {filteredRecords.length !== records.length && `(filtered from ${records.length} total)`} records
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {currentRecording && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl z-50">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-64">
                <div className="text-sm font-semibold text-gray-900 truncate">Recording #{currentRecording.id}</div>
                <div className="text-xs text-gray-500 truncate">
                  {currentRecording.agent} - {currentRecording.customer}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={skipBackward}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button variant="default" size="sm" onClick={togglePlayPause} className="bg-blue-600 hover:bg-blue-700">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={skipForward}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 flex items-center gap-3">
                <span className="text-xs text-gray-600 font-mono w-12">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-xs text-gray-600 font-mono w-12">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center gap-2 w-32">
                <Volume2 className="h-4 w-4 text-gray-600" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <Button variant="ghost" size="sm" onClick={closePlayer}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <audio
            ref={audioRef}
            // src={currentRecording.recording}
            src={'https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race1.ogg'}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            autoPlay
          />
        </div>
      )}
    </div>
  )
}
