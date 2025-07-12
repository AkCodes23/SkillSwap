"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, MessageCircle } from "lucide-react"
import { useMessages } from "@/hooks/use-messages"
import { useAuth } from "@/hooks/use-auth"
import { formatDistanceToNow } from "date-fns"

interface ConversationsListProps {
  onSelectConversation: (conversationId: string) => void
  selectedConversationId?: string
}

export function ConversationsList({ onSelectConversation, selectedConversationId }: ConversationsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { conversations } = useMessages()
  const { user } = useAuth()

  const filteredConversations = conversations.filter((conversation) => {
    const otherParticipant = conversation.participantDetails.find((p) => p.id !== user?.id)
    return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <MessageCircle className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
            <p className="text-gray-500">Start a conversation by sending a swap request!</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredConversations.map((conversation) => {
              const otherParticipant = conversation.participantDetails.find((p) => p.id !== user?.id)
              if (!otherParticipant) return null

              return (
                <Button
                  key={conversation.id}
                  variant="ghost"
                  className={`w-full p-4 h-auto justify-start hover:bg-gray-50 ${
                    selectedConversationId === conversation.id ? "bg-blue-50 border-r-2 border-blue-600" : ""
                  }`}
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={otherParticipant.profileImage || "/placeholder.svg"} />
                        <AvatarFallback>
                          {otherParticipant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {otherParticipant.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 truncate">{otherParticipant.name}</h4>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>

                      {conversation.lastMessage && (
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-500 truncate">
                            {conversation.lastMessage.senderId === user?.id ? "You: " : ""}
                            {conversation.lastMessage.content}
                          </p>
                          <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                            {formatDistanceToNow(conversation.lastMessage.timestamp, { addSuffix: true })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
