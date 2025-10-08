// "use client"

// import * as React from "react"
// import { useRouter } from "next/navigation"
// import {
//   Search,
//   User,
//   LogOut,
//   SettingsIcon,
//   ChevronDown,
//   TrendingUp,
//   FileText,
//   BarChart3,
//   Database,
//   Users,
//   Settings,
// } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { getUserFromStorage, clearUserFromStorage } from "@/lib/auth"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { SidebarTrigger } from "@/components/ui/sidebar"
// import { ModeToggle } from "@/components/mode-toggle"
// import { Badge } from "@/components/ui/badge"

// interface AppHeaderProps {
//   sticky?: boolean
// }

// const searchCategories = [
//   { name: "Dashboard", icon: TrendingUp },
//   { name: "Customers", icon: Users },
//   { name: "Reports", icon: FileText },
//   { name: "Analytics", icon: BarChart3 },
//   { name: "Settings", icon: Settings },
//   { name: "Database", icon: Database },
// ]

// export function AppHeader({ sticky = true }: AppHeaderProps) {
//   const router = useRouter()
//   const [user, setUser] = React.useState<any>(null)
//   const [status, setStatus] = React.useState<"active" | "inactive">("active")
//   const [searchOpen, setSearchOpen] = React.useState(false)
//   const [searchQuery, setSearchQuery] = React.useState("")
//   const [selectedCategory, setSelectedCategory] = React.useState("Dashboard")

//   React.useEffect(() => {
//     const currentUser = getUserFromStorage()
//     setUser(currentUser)
//   }, [])

//   const handleLogout = () => {
//     clearUserFromStorage()
//     router.push("/login")
//   }

//   return (
//     <>
//       <header
//         className={cn(
//           "flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card/95 backdrop-blur-xl transition-all duration-200 px-4 lg:px-6",
//           sticky && "sticky top-0 z-40",
//         )}
//       >
//         <div className="flex items-center gap-3">
//           <SidebarTrigger className="h-9 w-9" />
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" size="sm" className="h-9 gap-2 bg-transparent">
//                 <div className={cn("w-2 h-2 rounded-full", status === "active" ? "bg-green-500" : "bg-gray-400")} />
//                 <span className="capitalize">{status}</span>
//                 <ChevronDown className="h-3 w-3 opacity-50" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start" className="w-40">
//               <DropdownMenuItem onClick={() => setStatus("active")}>
//                 <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
//                 Active
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setStatus("inactive")}>
//                 <div className="w-2 h-2 rounded-full bg-gray-400 mr-2" />
//                 Inactive
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         <div className="flex-1 max-w-md mx-auto hidden md:block">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search anything..."
//               className="pl-10 h-10 bg-muted/50 border-border/50 focus-visible:ring-primary"
//               onClick={() => setSearchOpen(true)}
//               readOnly
//             />
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" onClick={() => setSearchOpen(true)}>
//             <Search className="h-4 w-4" />
//           </Button>
//           <ModeToggle />
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-9 gap-2 px-3">
//                 <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-medium">
//                   {user?.name?.charAt(0) || "U"}
//                 </div>
//                 <div className="hidden lg:flex flex-col items-start">
//                   <span className="text-sm font-medium leading-none">{user?.name || "User"}</span>
//                   <span className="text-xs text-muted-foreground capitalize">{user?.role || "Role"}</span>
//                 </div>
//                 <ChevronDown className="h-3 w-3 opacity-50" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-56">
//               <DropdownMenuLabel>
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium">{user?.name}</p>
//                   <p className="text-xs text-muted-foreground">{user?.username}</p>
//                   <Badge variant="secondary" className="w-fit text-xs capitalize mt-1">
//                     {user?.role}
//                   </Badge>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <User className="mr-2 h-4 w-4" />
//                 Profile
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <SettingsIcon className="mr-2 h-4 w-4" />
//                 Settings
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
//                 <LogOut className="mr-2 h-4 w-4" />
//                 Logout
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </header>

//       <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
//   <DialogContent
//     className="
//       w-[75vw]      /* Modal width = 75% of screen */
//       max-w-none
//       max-h-[85vh]  /* Height = 85% of screen */
//       p-0 gap-0
//       overflow-hidden
//       border-2 dark:border-zinc-700/50
//       rounded-2xl shadow-2xl
//       flex flex-col
//     "
//   >
//     {/* HEADER */}
//     <DialogHeader className="px-8 pt-8 pb-6 border-b dark:border-zinc-800 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5">
//       <DialogTitle className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//         Search Everything
//       </DialogTitle>
//       <p className="text-sm text-muted-foreground mt-1">
//         Find what you need across all categories
//       </p>
//     </DialogHeader>

//     {/* BODY */}
//     <div className="flex flex-1 h-[calc(85vh-120px)]">
//       {/* LEFT SIDEBAR */}
//       <div className="w-[220px] border-r dark:border-zinc-800 bg-gradient-to-b from-muted/30 to-muted/10 p-6 overflow-y-auto">
//         <h3 className="text-xs font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
//           Categories
//         </h3>
//         <div className="space-y-2">
//           {searchCategories.map((category) => {
//             const Icon = category.icon
//             const isActive = selectedCategory === category.name
//             return (
//               <button
//                 key={category.name}
//                 onClick={() => setSelectedCategory(category.name)}
//                 className={cn(
//                   "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
//                   isActive
//                     ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 scale-[1.02]"
//                     : "hover:bg-muted/80 dark:hover:bg-zinc-800/80 text-foreground/80 hover:text-foreground hover:scale-[1.01]",
//                 )}
//               >
//                 <Icon className={cn("h-4 w-4", isActive && "animate-pulse")} />
//                 <span>{category.name}</span>
//                 {isActive && (
//                   <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
//                 )}
//               </button>
//             )
//           })}
//         </div>

//         <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 border border-primary/20 dark:border-primary/10">
//           <p className="text-xs font-medium text-muted-foreground mb-2">
//             Quick Stats
//           </p>
//           <div className="space-y-1">
//             <div className="flex justify-between text-xs">
//               <span className="text-muted-foreground">Total Items</span>
//               <span className="font-semibold">1,234</span>
//             </div>
//             <div className="flex justify-between text-xs">
//               <span className="text-muted-foreground">Recent</span>
//               <span className="font-semibold">45</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex-1 p-8 overflow-y-auto">
//         {/* Search bar inside modal */}
//         <div className="relative mb-6">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//           <Input
//             placeholder={`Search in ${selectedCategory}...`}
//             className="pl-12 h-12 text-base bg-muted/50 dark:bg-zinc-900/50 border-2 dark:border-zinc-800 focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             autoFocus
//           />
//           {searchQuery && (
//             <Button
//               variant="ghost"
//               size="sm"
//               className="absolute right-2 top-1/2 -translate-y-1/2 h-8"
//               onClick={() => setSearchQuery("")}
//             >
//               Clear
//             </Button>
//           )}
//         </div>

//         {/* Search Results */}
//         <div className="space-y-3">
//           {searchQuery ? (
//             <>
//               {[1, 2, 3, 4, 5, 6].map((item) => (
//                 <div
//                   key={item}
//                   className="p-4 rounded-xl border dark:border-zinc-800 bg-card dark:bg-zinc-900/50 hover:bg-muted/50 dark:hover:bg-zinc-800/50 transition-all duration-200 cursor-pointer group hover:shadow-lg hover:scale-[1.01]"
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 flex items-center justify-center flex-shrink-0">
//                       <Search className="h-5 w-5 text-primary" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
//                         Result {item} for "{searchQuery}"
//                       </h4>
//                       <p className="text-xs text-muted-foreground line-clamp-2">
//                         This is a sample search result in {selectedCategory} category.
//                       </p>
//                       <div className="flex items-center gap-2 mt-2">
//                         <Badge variant="secondary" className="text-xs">
//                           {selectedCategory}
//                         </Badge>
//                         <span className="text-xs text-muted-foreground">
//                           2 mins ago
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </>
//           ) : (
//             <div className="flex flex-col items-center justify-center py-16 text-center">
//               <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 flex items-center justify-center mb-4">
//                 <Search className="h-10 w-10 text-primary/60" />
//               </div>
//               <h3 className="text-lg font-semibold mb-2">Start Your Search</h3>
//               <p className="text-sm text-muted-foreground max-w-sm">
//                 Type in the search box above to find items in {selectedCategory}.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   </DialogContent>
// </Dialog>

//     </>
//   )
// }






"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  User,
  LogOut,
  SettingsIcon,
  ChevronDown,
  TrendingUp,
  FileText,
  BarChart3,
  Database,
  Users,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getUserFromStorage, clearUserFromStorage } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"

interface AppHeaderProps {
  sticky?: boolean
}

const searchCategories = [
  { name: "Dashboard", icon: TrendingUp },
  { name: "Customers", icon: Users },
  { name: "Reports", icon: FileText },
  { name: "Analytics", icon: BarChart3 },
  { name: "Settings", icon: Settings },
  { name: "Database", icon: Database },
]

export function AppHeader({ sticky = true }: AppHeaderProps) {
  const router = useRouter()
  const [user, setUser] = React.useState<any>(null)
  const [status, setStatus] = React.useState<"active" | "inactive">("active")
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("Dashboard")

  React.useEffect(() => {
    const currentUser = getUserFromStorage()
    setUser(currentUser)
  }, [])

  const handleLogout = () => {
    clearUserFromStorage()
    router.push("/login")
  }

  return (
    <>
      <header
        className={cn(
          "flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card/95 backdrop-blur-xl transition-all duration-200 px-4 lg:px-6",
          sticky && "sticky top-0 z-40",
        )}
      >
        <div className="flex items-center gap-3">
          <SidebarTrigger className="h-9 w-9" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2 bg-transparent">
                <div className={cn("w-2 h-2 rounded-full", status === "active" ? "bg-green-500" : "bg-gray-400")} />
                <span className="capitalize">{status}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem onClick={() => setStatus("active")}>
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("inactive")}>
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-2" />
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1 max-w-md mx-auto hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search anything..."
              className="pl-10 h-10 bg-muted/50 border-border/50 focus-visible:ring-primary"
              onClick={() => setSearchOpen(true)}
              readOnly
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" onClick={() => setSearchOpen(true)}>
            <Search className="h-4 w-4" />
          </Button>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 gap-3 px-3 hover:bg-primary/5 transition-all duration-200 group"
              >
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-medium shadow-lg shadow-primary/25">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background shadow-sm"></div>
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-semibold leading-none bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {user?.name || "User"}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize font-medium">
                    {user?.role || "Role"}
                  </span>
                </div>
                <ChevronDown className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-all duration-200 group-hover:translate-y-0.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 p-2 border-2 shadow-2xl rounded-xl bg-card/95 backdrop-blur-xl"
            >
              {/* User Info Section */}
              <DropdownMenuLabel className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-lg font-bold shadow-lg">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">@{user?.username}</p>
                    <Badge
                      variant="secondary"
                      className="w-fit text-xs capitalize mt-2 bg-primary/10 text-primary border-primary/20"
                    >
                      {user?.role}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="my-2 bg-border/50" />

              {/* Menu Items */}
              <div className="space-y-1 p-1">
                <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-primary/5 transition-all duration-200 group">
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Profile</span>
                    <span className="text-xs text-muted-foreground">View your profile</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-primary/5 transition-all duration-200 group">
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <SettingsIcon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Settings</span>
                    <span className="text-xs text-muted-foreground">Customize preferences</span>
                  </div>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="my-2 bg-border/50" />

              {/* Quick Stats */}
              <div className="p-3 rounded-lg bg-muted/50 border">
                <p className="text-xs font-semibold text-muted-foreground mb-2">QUICK STATS</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 rounded bg-background">
                    <div className="font-bold text-primary">12</div>
                    <div className="text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center p-2 rounded bg-background">
                    <div className="font-bold text-green-600">3</div>
                    <div className="text-muted-foreground">Active</div>
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator className="my-2 bg-border/50" />

              {/* Logout */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-destructive/10 text-destructive transition-all duration-200 group"
              >
                <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                  <LogOut className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Logout</span>
                  <span className="text-xs text-destructive/70">Sign out from your account</span>
                </div>
              </DropdownMenuItem>

              {/* Footer */}
              <div className="p-2 pt-3 border-t border-border/50">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Last login: Today</span>
                  <Badge variant="outline" className="text-xs">
                    v2.4.1
                  </Badge>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent
          className="
      w-[95vw] 
      h-[85vh]
      max-w-[95vw] /* Force max-width to be same as width */
      max-h-[85vh]
      p-0 
      gap-0
      overflow-hidden
      border-2 dark:border-zinc-700/50
      rounded-2xl 
      shadow-2xl
      flex 
      flex-col
      !mx-4 /* Add some margin on small screens */
    "
          style={{
            width: '50vw',
            maxWidth: '95vw'
          }}
        >
          {/* HEADER */}
          <DialogHeader className="px-8 pt-8 pb-6 border-b dark:border-zinc-800 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5">
            <DialogTitle className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Search Everything
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Find what you need across all categories
            </p>
          </DialogHeader>

          {/* BODY */}
          <div className="flex flex-1 h-[calc(85vh-120px)] min-h-0">
            {/* LEFT SIDEBAR */}
            <div className="w-[220px] border-r dark:border-zinc-800 bg-gradient-to-b from-muted/30 to-muted/10 p-6 overflow-y-auto flex-shrink-0">
              <h3 className="text-xs font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
                Categories
              </h3>
              <div className="space-y-2">
                {searchCategories.map((category) => {
                  const Icon = category.icon
                  const isActive = selectedCategory === category.name
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 scale-[1.02]"
                          : "hover:bg-muted/80 dark:hover:bg-zinc-800/80 text-foreground/80 hover:text-foreground hover:scale-[1.01]",
                      )}
                    >
                      <Icon className={cn("h-4 w-4", isActive && "animate-pulse")} />
                      <span>{category.name}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 border border-primary/20 dark:border-primary/10">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Quick Stats
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Total Items</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Recent</span>
                    <span className="font-semibold">45</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 p-8 overflow-y-auto min-w-0">
              {/* Search bar inside modal */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={`Search in ${selectedCategory}...`}
                  className="pl-12 h-12 text-base bg-muted/50 dark:bg-zinc-900/50 border-2 dark:border-zinc-800 focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear
                  </Button>
                )}
              </div>

              {/* Search Results */}
              <div className="space-y-3">
                {searchQuery ? (
                  <>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div
                        key={item}
                        className="p-4 rounded-xl border dark:border-zinc-800 bg-card dark:bg-zinc-900/50 hover:bg-muted/50 dark:hover:bg-zinc-800/50 transition-all duration-200 cursor-pointer group hover:shadow-lg hover:scale-[1.01]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 flex items-center justify-center flex-shrink-0">
                            <Search className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                              Result {item} for "{searchQuery}"
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              This is a sample search result in {selectedCategory} category.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {selectedCategory}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                2 mins ago
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 flex items-center justify-center mb-4">
                      <Search className="h-10 w-10 text-primary/60" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Start Your Search</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Type in the search box above to find items in {selectedCategory}.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
