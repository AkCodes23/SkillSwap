"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  profileImage?: string
  rating: number
  skillsOffered: Array<{ name: string; level: string }>
  skillsWanted: string[]
  bio?: string
  location?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Partial<User>) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const mockUsers: Record<string, User> = {
  "alex@skillswap.com": {
    id: "1",
    name: "Alex Johnson",
    email: "alex@skillswap.com",
    profileImage: "",
    rating: 4.8,
    skillsOffered: [
      { name: "Python", level: "Expert" },
      { name: "Cooking", level: "Intermediate" },
      { name: "Photography", level: "Advanced" },
    ],
    skillsWanted: ["UI/UX Design", "Machine Learning"],
    bio: "Full-stack developer passionate about React and Node.js",
    location: "San Francisco",
  },
  "sarah@skillswap.com": {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@skillswap.com",
    profileImage: "",
    rating: 4.9,
    skillsOffered: [
      { name: "UI/UX Design", level: "Expert" },
      { name: "Graphic Design", level: "Advanced" },
      { name: "Digital Marketing", level: "Intermediate" },
    ],
    skillsWanted: ["Python Programming", "Data Analysis"],
    bio: "Designer with 10+ years in UX/UI design",
    location: "New York",
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Explicit isAuthenticated state

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("skillswap_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true) // Set isAuthenticated on load
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("skillswap_user")
        setIsAuthenticated(false)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers[email.toLowerCase()]
    if (foundUser) {
      setUser(foundUser)
      setIsAuthenticated(true) // Set isAuthenticated on successful login
      localStorage.setItem("skillswap_user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    setIsAuthenticated(false) // Ensure it's false on failed login
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false) // Set isAuthenticated on logout
    localStorage.removeItem("skillswap_user")
  }

  const register = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (userData.email && !mockUsers[userData.email.toLowerCase()]) {
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || "",
        email: userData.email,
        profileImage: userData.profileImage || "",
        rating: 5.0,
        skillsOffered: userData.skillsOffered || [],
        skillsWanted: userData.skillsWanted || [],
        bio: userData.bio || "",
        location: userData.location || "",
      }

      mockUsers[userData.email.toLowerCase()] = newUser
      setUser(newUser)
      setIsAuthenticated(true) // Set isAuthenticated on successful registration
      localStorage.setItem("skillswap_user", JSON.stringify(newUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    setIsAuthenticated(false) // Ensure it's false on failed registration
    return false
  }

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("skillswap_user", JSON.stringify(updatedUser))

      if (mockUsers[user.email]) {
        mockUsers[user.email] = updatedUser
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
