"use client"

import { useState } from "react"
import { ConversationsList } from "@/components/messaging/conversations-list"
import { ChatInterface } from "@/components/messaging/chat-interface"
import { Card } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const [showChat, setShowChat] = useState(false)

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId)
    setShowChat(true)
  }

  const handleBackToList = () => {
    setShowChat(false)
    setSelectedConversationId(null)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <div className={`md:col-span-1 ${showChat ? "hidden md:block" : ""}`}>
          <Card className="h-full">
            <ConversationsList
              onSelectConversation={handleSelectConversation}
              selectedConversationId={selectedConversationId || undefined}
            />
          </Card>
        </div>

        {/* Chat Interface */}
        <div className={`md:col-span-2 ${!showChat ? "hidden md:block" : ""}`}>
          <Card className="h-full">
            {selectedConversationId ? (
              <ChatInterface conversationId={selectedConversationId} onBack={handleBackToList} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <MessageCircle className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
