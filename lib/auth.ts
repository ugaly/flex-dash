export type UserRole = "agent" | "administrator"

export interface User {
  username: string
  role: UserRole
  name: string
}

const users: User[] = [
  { username: "agent", role: "agent", name: "Agent User" },
  { username: "administrator", role: "administrator", name: "Administrator" },
]

export function authenticateUser(username: string, password: string): User | null {
  const user = users.find((u) => u.username === username)
  if (user && password) {
    return user
  }
  return null
}

export function getUserFromStorage(): User | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("frlex_user")
  if (userStr) {
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }
  return null
}

export function saveUserToStorage(user: User) {
  localStorage.setItem("frlex_user", JSON.stringify(user))
}

export function clearUserFromStorage() {
  localStorage.removeItem("frlex_user")
}
