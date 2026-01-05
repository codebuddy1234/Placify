"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type UserRole = "coordinator" | "student" | "company" | null

interface User {
  id: string
  email: string
  role: UserRole
  name: string
  profile?: any
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  register: (data: any, role: UserRole) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("tracktalent_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      // Demo: Check localStorage for registered users
      const usersKey = `tracktalent_users_${role}`
      const users = JSON.parse(localStorage.getItem(usersKey) || "[]")

      const foundUser = users.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        const userData = { ...foundUser, role }
        delete userData.password
        setUser(userData)
        localStorage.setItem("tracktalent_user", JSON.stringify(userData))
        return true
      }

      return false
    } catch (error) {
      console.error("[v0] Login error:", error)
      return false
    }
  }

  const register = async (data: any, role: UserRole) => {
    try {
      const usersKey = `tracktalent_users_${role}`
      const users = JSON.parse(localStorage.getItem(usersKey) || "[]")

      // Check if user already exists
      if (users.some((u: any) => u.email === data.email)) {
        return false
      }

      const newUser = {
        id: Date.now().toString(),
        ...data,
        role,
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      localStorage.setItem(usersKey, JSON.stringify(users))

      // Auto login after registration
      const userData = { ...newUser }
      delete userData.password
      setUser(userData)
      localStorage.setItem("tracktalent_user", JSON.stringify(userData))

      return true
    } catch (error) {
      console.error("[v0] Registration error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("tracktalent_user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
