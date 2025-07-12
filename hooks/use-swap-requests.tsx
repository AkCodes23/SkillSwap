"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./use-auth"
import { useNotifications } from "./use-notifications"

export interface SwapRequest {
  id: string
  fromUserId: string
  toUserId: string
  fromUser: {
    id: string
    name: string
    email: string
    profileImage?: string
    rating: number
  }
  toUser: {
    id: string
    name: string
    email: string
    profileImage?: string
    rating: number
  }
  skillOffered: string
  skillWanted: string
  message: string
  status: "pending" | "accepted" | "rejected" | "cancelled" | "completed"
  createdAt: Date
  updatedAt: Date
}

interface SwapRequestsContextType {
  requests: SwapRequest[]
  sentRequests: SwapRequest[]
  receivedRequests: SwapRequest[]
  sendRequest: (toUserId: string, skillOffered: string, skillWanted: string, message: string) => Promise<void>
  acceptRequest: (requestId: string) => Promise<void>
  rejectRequest: (requestId: string) => Promise<void>
  cancelRequest: (requestId: string) => Promise<void>
  getRequestById: (requestId: string) => SwapRequest | undefined
}

const SwapRequestsContext = createContext<SwapRequestsContextType | undefined>(undefined)

// Mock users data
const mockUsers = {
  "1": {
    id: "1",
    name: "Alex Johnson",
    email: "alex@skillswap.com",
    profileImage: "",
    rating: 4.8,
  },
  "2": {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@skillswap.com",
    profileImage: "",
    rating: 4.9,
  },
}

export function SwapRequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<SwapRequest[]>([])
  const { user } = useAuth()
  const { addNotification } = useNotifications()

  // Initialize with some mock data
  useEffect(() => {
    const mockRequests: SwapRequest[] = [
      {
        id: "req-1",
        fromUserId: "2",
        toUserId: "1",
        fromUser: mockUsers["2"],
        toUser: mockUsers["1"],
        skillOffered: "UI/UX Design",
        skillWanted: "Python Programming",
        message: "Hi! I'd love to learn Python from you. I can teach you UI/UX design in return.",
        status: "pending",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "req-2",
        fromUserId: "1",
        toUserId: "2",
        fromUser: mockUsers["1"],
        toUser: mockUsers["2"],
        skillOffered: "Photography",
        skillWanted: "Graphic Design",
        message: "I'd like to exchange photography skills for graphic design lessons!",
        status: "accepted",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
      },
    ]

    setRequests(mockRequests)
  }, [])

  const sendRequest = async (toUserId: string, skillOffered: string, skillWanted: string, message: string) => {
    if (!user) return

    const newRequest: SwapRequest = {
      id: `req-${Date.now()}`,
      fromUserId: user.id,
      toUserId,
      fromUser: {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        rating: user.rating,
      },
      toUser: mockUsers[toUserId as keyof typeof mockUsers],
      skillOffered,
      skillWanted,
      message,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setRequests((prev) => [...prev, newRequest])

    // Add notification for the recipient
    addNotification({
      id: `notif-${Date.now()}`,
      type: "swap_request",
      title: "New Swap Request",
      message: `${user.name} wants to exchange ${skillOffered} for ${skillWanted}`,
      timestamp: new Date(),
      read: false,
      userId: toUserId,
    })
  }

  const acceptRequest = async (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: "accepted" as const, updatedAt: new Date() } : req)),
    )

    const request = requests.find((r) => r.id === requestId)
    if (request) {
      addNotification({
        id: `notif-${Date.now()}`,
        type: "swap_accepted",
        title: "Request Accepted!",
        message: `${request.toUser.name} accepted your swap request`,
        timestamp: new Date(),
        read: false,
        userId: request.fromUserId,
      })
    }
  }

  const rejectRequest = async (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: "rejected" as const, updatedAt: new Date() } : req)),
    )

    const request = requests.find((r) => r.id === requestId)
    if (request) {
      addNotification({
        id: `notif-${Date.now()}`,
        type: "swap_rejected",
        title: "Request Declined",
        message: `${request.toUser.name} declined your swap request`,
        timestamp: new Date(),
        read: false,
        userId: request.fromUserId,
      })
    }
  }

  const cancelRequest = async (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: "cancelled" as const, updatedAt: new Date() } : req)),
    )
  }

  const getRequestById = (requestId: string) => {
    return requests.find((req) => req.id === requestId)
  }

  const sentRequests = requests.filter((req) => req.fromUserId === user?.id)
  const receivedRequests = requests.filter((req) => req.toUserId === user?.id)

  return (
    <SwapRequestsContext.Provider
      value={{
        requests,
        sentRequests,
        receivedRequests,
        sendRequest,
        acceptRequest,
        rejectRequest,
        cancelRequest,
        getRequestById,
      }}
    >
      {children}
    </SwapRequestsContext.Provider>
  )
}

export function useSwapRequests() {
  const context = useContext(SwapRequestsContext)
  if (context === undefined) {
    throw new Error("useSwapRequests must be used within a SwapRequestsProvider")
  }
  return context
}

