"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./use-auth"

export interface Message {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  read: boolean
}

export interface Conversation {
  id: string
  participants: string[]
  participantDetails: Array<{
    id: string
    name: string
    email: string
    profileImage?: string
    isOnline: boolean
  }>
  lastMessage?: Message
  unreadCount: number
  createdAt: Date
  updatedAt: Date
}

interface MessagesContextType {
  conversations: Conversation[]
  messages: Message[]
  activeConversation: string | null
  setActiveConversation: (conversationId: string | null) => void
  sendMessage: (receiverId: string, content: string) => Promise<void>
  markAsRead: (conversationId: string) => void
  getConversationMessages: (conversationId: string) => Message[]
  createOrGetConversation: (participantId: string) => Promise<string>
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

// Mock users data
const mockUsers = {
  "1": {
    id: "1",
    name: "Alex Johnson",
    email: "alex@skillswap.com",
    profileImage: "",
    isOnline: true,
  },
  "2": {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@skillswap.com",
    profileImage: "",
    isOnline: true,
  },
}

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const { user } = useAuth()

  // Initialize with mock data
  useEffect(() => {
    if (!user) return

    const mockConversations: Conversation[] = [
      {
        id: "conv-1",
        participants: ["1", "2"],
        participantDetails: [mockUsers["1"], mockUsers["2"]],
        unreadCount: user.id === "1" ? 0 : 2,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 30 * 60 * 1000),
      },
    ]

    const mockMessages: Message[] = [
      {
        id: "msg-1",
        conversationId: "conv-1",
        senderId: "2",
        receiverId: "1",
        content: "Hi Alex! I saw your Python skills and would love to learn from you.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: user.id === "1" ? true : false,
      },
      {
        id: "msg-2",
        conversationId: "conv-1",
        senderId: "1",
        receiverId: "2",
        content: "Hi Sarah! I'd be happy to help you with Python. Your UI/UX skills look amazing!",
        timestamp: new Date(Date.now() - 90 * 60 * 1000),
        read: true,
      },
      {
        id: "msg-3",
        conversationId: "conv-1",
        senderId: "2",
        receiverId: "1",
        content: "Great! When would be a good time to start? I'm free most evenings.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: user.id === "1" ? false : true,
      },
    ]

    // Update conversations with last message
    const conversationsWithLastMessage = mockConversations.map((conv) => ({
      ...conv,
      lastMessage: mockMessages
        .filter((msg) => msg.conversationId === conv.id)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0],
    }))

    setConversations(conversationsWithLastMessage)
    setMessages(mockMessages)
  }, [user])

  const sendMessage = async (receiverId: string, content: string) => {
    if (!user) return

    // Find or create conversation
    const conversationId = await createOrGetConversation(receiverId)

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: user.id,
      receiverId,
      content,
      timestamp: new Date(),
      read: false,
    }

    setMessages((prev) => [...prev, newMessage])

    // Update conversation
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: newMessage,
              updatedAt: new Date(),
              unreadCount: conv.participants.includes(receiverId) ? conv.unreadCount + 1 : conv.unreadCount,
            }
          : conv,
      ),
    )
  }

  const markAsRead = (conversationId: string) => {
    if (!user) return

    setMessages((prev) =>
      prev.map((msg) =>
        msg.conversationId === conversationId && msg.receiverId === user.id ? { ...msg, read: true } : msg,
      ),
    )

    setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv)))
  }

  const getConversationMessages = (conversationId: string) => {
    return messages
      .filter((msg) => msg.conversationId === conversationId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
  }

  const createOrGetConversation = async (participantId: string): Promise<string> => {
    if (!user) throw new Error("User not authenticated")

    // Check if conversation already exists
    const existingConv = conversations.find(
      (conv) => conv.participants.includes(user.id) && conv.participants.includes(participantId),
    )

    if (existingConv) {
      return existingConv.id
    }

    // Create new conversation
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      participants: [user.id, participantId],
      participantDetails: [
        {
          id: user.id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
          isOnline: true,
        },
        mockUsers[participantId as keyof typeof mockUsers],
      ],
      unreadCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setConversations((prev) => [...prev, newConversation])
    return newConversation.id
  }

  return (
    <MessagesContext.Provider
      value={{
        conversations,
        messages,
        activeConversation,
        setActiveConversation,
        sendMessage,
        markAsRead,
        getConversationMessages,
        createOrGetConversation,
      }}
    >
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessagesContext)
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider")
  }
  return context
}
