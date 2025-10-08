// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { authenticateUser, saveUserToStorage } from "@/lib/auth"
// import { LogIn } from "lucide-react"
// import Image from "next/image"
// import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

// export default function LoginPage() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const user = authenticateUser(username, password)
//       if (user) {
//         saveUserToStorage(user)
//         router.push("/dashboard")
//       } else {
//         setError("Invalid credentials")
//       }
//     } catch (err) {
//       setError("An error occurred")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

//       <Card className="w-full max-w-md relative backdrop-blur-sm bg-card/95 shadow-2xl border-border dark:border-border/80 dark:shadow-[0_0_50px_rgba(23,136,203,0.15)]">
//         <CardHeader className="space-y-4 text-center">
//           <div className="flex justify-center mb-2">
//             <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-1 shadow-lg">
//               <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
//                 <Image
//                   src="/logo.png"
//                   alt="Frlex Logo"
//                   width={80}
//                   height={80}
//                   className="object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//           <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//             {/* Welcome to Flex */}
//             {/* <TextGenerateEffect words="Welcome to Frlex" className="text-transparent bg-clip-text" filter={false} /> */}
//           </CardTitle>
//           <CardDescription className="text-base">Enter your credentials to access the system</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="Enter username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 className="h-11"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="h-11"
//               />
//             </div>
//             {error && (
//               <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
//                 {error}
//               </div>
//             )}
//             <Button
//               type="submit"
//               className="w-full h-11 text-base font-medium bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
//               disabled={loading}
//             >
//               {loading ? (
//                 "Signing in..."
//               ) : (
//                 <>
//                   <LogIn className="mr-2 h-4 w-4" />
//                   Sign In
//                 </>
//               )}
//             </Button>
//           </form>
//           <div className="mt-6 pt-6 border-t border-border/50">
//             <p className="text-xs text-center text-muted-foreground">
//               Demo credentials: <span className="font-mono font-semibold text-foreground">agent</span> or{" "}
//               <span className="font-mono font-semibold text-foreground">administrator</span>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }















// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { authenticateUser, saveUserToStorage } from "@/lib/auth"
// import { LogIn, User, Lock, Eye, EyeOff } from "lucide-react"
// import Image from "next/image"

// export default function LoginPage() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const user = authenticateUser(username, password)
//       if (user) {
//         saveUserToStorage(user)
//         router.push("/dashboard")
//       } else {
//         setError("Invalid credentials")
//       }
//     } catch (err) {
//       setError("An error occurred")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <img 
//           src="/blob.svg" 
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[550px] opacity-25 aspect-square" 
//           alt="Background blob" 
//         />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[720px] aspect-square border-2 border-white/5 rounded-full animate-spin-slow">
//           <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#a0cac7] rounded-full -translate-y-1/2"></div>
//           <div className="absolute top-1/2 -right-2 w-6 h-6 bg-[#a0cac7] rounded-full -translate-y-1/2"></div>
//         </div>
//       </div>

//       {/* Login Card */}
//       <Card className="w-full max-w-md relative backdrop-blur-sm bg-card/95 shadow-2xl border-border dark:border-border/80 dark:shadow-[0_0_50px_rgba(23,136,203,0.15)] z-10">
//         <CardHeader className="space-y-4 text-center">
//           <div className="flex justify-center mb-2">
//             <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-1 shadow-lg">
//               <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
//                 <Image
//                   src="/logo.png"
//                   alt="Frlex Logo"
//                   width={80}
//                   height={80}
//                   className="object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//           <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//             Welcome Back
//           </CardTitle>
//           <CardDescription className="text-base">Enter your credentials to access the system</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             {/* Username Field with Icon */}
//             <div className="space-y-2">
//               <Label htmlFor="username" className="text-sm font-medium">Username</Label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="Enter your username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                   className="h-11 pl-10 pr-4"
//                 />
//               </div>
//             </div>

//             {/* Password Field with Icon and Toggle */}
//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-sm font-medium">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="h-11 pl-10 pr-11"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {error && (
//               <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
//                 {error}
//               </div>
//             )}

//             <Button
//               type="submit"
//               className="w-full h-11 text-base font-medium bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 shadow-lg shadow-primary/25"
//               disabled={loading}
//             >
//               {loading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   Signing in...
//                 </div>
//               ) : (
//                 <>
//                   <LogIn className="mr-2 h-4 w-4" />
//                   Sign In
//                 </>
//               )}
//             </Button>
//           </form>

//           <div className="mt-6 pt-6 border-t border-border/50">
//             <p className="text-xs text-center text-muted-foreground">
//               Demo credentials:{" "}
//               <span className="font-mono font-semibold text-foreground bg-muted px-1.5 py-0.5 rounded">agent</span> or{" "}
//               <span className="font-mono font-semibold text-foreground bg-muted px-1.5 py-0.5 rounded">administrator</span>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }












"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { authenticateUser, saveUserToStorage } from "@/lib/auth"
import { LogIn, User, Lock, Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const user = authenticateUser(username, password)
      if (user) {
        saveUserToStorage(user)
        router.push("/dashboard")
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />


      <Card className="w-full max-w-md relative backdrop-blur-sm bg-card/95 shadow-2xl border-border dark:border-border/80 dark:shadow-[0_0_50px_rgba(23,136,203,0.15)]">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-1 shadow-lg">
              <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Frlex Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base">Enter your credentials to access the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field with Icon */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-11 pl-10 pr-4"
                />
              </div>
            </div>

            {/* Password Field with Icon and Toggle */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pl-10 pr-11"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 text-base font-medium bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 shadow-lg shadow-primary/25"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground">
              Demo credentials:{" "}
              <span className="font-mono font-semibold text-foreground bg-muted px-1.5 py-0.5 rounded">agent</span> or{" "}
              <span className="font-mono font-semibold text-foreground bg-muted px-1.5 py-0.5 rounded">administrator</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

