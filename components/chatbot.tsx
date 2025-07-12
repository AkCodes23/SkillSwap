"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, X, Send, Bot, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const botResponses = {
  greeting: [
    "Hi there! 👋 I'm SkillBot, your learning companion. How can I help you today?",
    "Hello! Welcome to SkillSwap! I'm here to help you navigate the platform. What would you like to know?",
    "Hey! I'm SkillBot. I can help you find skills, manage your profile, or answer any questions about SkillSwap!",
  ],
  skills: [
    "Great question! You can browse skills by going to the 'Browse Skills' page. Use the search bar to find specific skills or browse by category. What skill are you interested in learning?",
    "To find skills, try using our search feature! You can filter by skill type, location, or availability. Popular skills include React, Python, UI/UX Design, and more!",
  ],
  profile: [
    "You can update your profile by clicking on your avatar in the top right corner and selecting 'Settings'. Don't forget to add your skills and availability!",
    "To make your profile stand out, add a good bio, upload a profile picture, and list both skills you can teach and want to learn. This helps others find you!",
  ],
  swaps: [
    "Skill swaps work by exchanging knowledge! You teach someone a skill you know, and they teach you something in return. It's a win-win learning experience!",
    "To start a swap, browse skills, find someone interesting, and send them a swap request. Be clear about what you can offer and what you'd like to learn!",
  ],
  help: [
    "I can help you with: finding skills, updating your profile, understanding how swaps work, managing notifications, and general platform questions. What do you need help with?",
    "Here are some things I can assist with: skill discovery, profile optimization, swap management, platform navigation, and troubleshooting. Just ask!",
  ],
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 I'm SkillBot, your learning companion. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)]
    }

    if (message.includes("skill") || message.includes("learn") || message.includes("teach")) {
      return botResponses.skills[Math.floor(Math.random() * botResponses.skills.length)]
    }

    if (message.includes("profile") || message.includes("account") || message.includes("settings")) {
      return botResponses.profile[Math.floor(Math.random() * botResponses.profile.length)]
    }

    if (message.includes("swap") || message.includes("exchange") || message.includes("trade")) {
      return botResponses.swaps[Math.floor(Math.random() * botResponses.swaps.length)]
    }

    if (message.includes("help") || message.includes("support") || message.includes("how")) {
      return botResponses.help[Math.floor(Math.random() * botResponses.help.length)]
    }

    return "That's an interesting question! I'm still learning, but I can help you with finding skills, managing your profile, understanding swaps, and navigating SkillSwap. Is there something specific you'd like to know about?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot thinking time
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full gradient-primary text-white shadow-2xl hover:opacity-90 transition-all duration-200 hover-lift z-50 animate-pulse-slow"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 w-80 border-0 shadow-2xl z-50 transition-all duration-300 ${
        isMinimized ? "h-16" : "h-96"
      }`}
    >
      <CardHeader className="p-4 gradient-primary text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8 bg-white">
              <AvatarFallback className="bg-white text-emerald-600">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm">SkillBot</CardTitle>
              <p className="text-xs text-emerald-100">Always here to help!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsMinimized(!isMinimized)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-80">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === "user" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 border-2 focus:border-emerald-500"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="gradient-primary text-white hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
