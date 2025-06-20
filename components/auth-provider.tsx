"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  username: string
  role: "Admin" | "Department User"
  department?: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers = [
  { username: "admin1", password: "password1234", role: "Admin" as const },
  { username: "user1", password: "password1234", role: "Department User" as const, department: "HR" },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const savedUser = localStorage.getItem("pdpa-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/login") {
      router.push("/login")
    }
  }, [user, isLoading, pathname, router])

  const login = (username: string, password: string): boolean => {
    const foundUser = mockUsers.find((u) => u.username === username && u.password === password)

    if (foundUser) {
      const userData = {
        username: foundUser.username,
        role: foundUser.role,
        department: foundUser.department,
      }
      setUser(userData)
      localStorage.setItem("pdpa-user", JSON.stringify(userData))
      router.push("/dashboard")
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pdpa-user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
