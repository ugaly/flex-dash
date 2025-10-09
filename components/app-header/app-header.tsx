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
import StatusDropdown from "./status-dropdown"

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
                  <SidebarTrigger className="h-9 w-9" />

        {/* <div className="flex items-center gap-3">
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
        </div> */}

        <StatusDropdown />

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
          {/* <ModeToggle /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 gap-2 px-3">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">
                    {user?.name || "User"}
                  </span>
                  <span className="text-xs text-gray-600 capitalize">
                    {user?.role || "Role"}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-600 truncate">@{user?.username}</p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded mt-1 inline-block">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <div className="space-y-1 p-1">
                <DropdownMenuItem className="flex items-center gap-3 p-2 cursor-pointer">
                  <User className="h-4 w-4 text-gray-600" />
                  <div>
                    <span className="text-sm">Profile</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-3 p-2 cursor-pointer">
                  <SettingsIcon className="h-4 w-4 text-gray-600" />
                  <div>
                    <span className="text-sm">Settings</span>
                  </div>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />

              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <p className="text-xs font-medium text-gray-600 mb-2">QUICK STATS</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 rounded bg-white">
                    <div className="font-bold text-blue-600">12</div>
                    <div className="text-gray-600">Projects</div>
                  </div>
                  <div className="text-center p-2 rounded bg-white">
                    <div className="font-bold text-green-600">3</div>
                    <div className="text-gray-600">Active</div>
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-3 p-2 cursor-pointer text-red-600"
              >
                <LogOut className="h-4 w-4" />
                <div>
                  <span className="text-sm">Logout</span>
                </div>
              </DropdownMenuItem>

              <div className="p-2 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last login: Today</span>
                  <span className="text-xs border border-gray-300 px-2 py-0.5 rounded">v2.4.1</span>
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
  <div className="w-64 border-r border-gray-200 bg-gray-50 p-4 overflow-y-auto flex-shrink-0">
    <h3 className="text-sm font-semibold mb-3 text-gray-700 uppercase tracking-wide">
      Categories
    </h3>
    <div className="space-y-1">
      {searchCategories.map((category) => {
        const Icon = category.icon
        const isActive = selectedCategory === category.name
        return (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{category.name}</span>
          </button>
        )
      })}
    </div>

    {/* <div className="mt-6 p-3 rounded-lg bg-blue-50 border border-blue-200">
      <p className="text-xs font-medium text-gray-700 mb-2">
        Quick Stats
      </p>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Total Items</span>
          <span className="font-semibold">1,234</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Recent</span>
          <span className="font-semibold">45</span>
        </div>
      </div>
    </div> */}
  </div>

  {/* MAIN CONTENT AREA */}
  <div className="flex-1 p-6 overflow-y-auto min-w-0">
    {/* Search bar inside modal */}
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input
        placeholder={`Search in ${selectedCategory}...`}
        className="pl-10 h-12 text-sm bg-white border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoFocus
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
          onClick={() => setSearchQuery("")}
        >
          ×
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
              className="p-4 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Search className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm mb-1 text-gray-900">
                    Result {item} for "{searchQuery}"
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    This is a sample search result in {selectedCategory} category.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {selectedCategory}
                    </span>
                    <span className="text-xs text-gray-500">
                      2 mins ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Your Search</h3>
          <p className="text-sm text-gray-600 max-w-sm">
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
