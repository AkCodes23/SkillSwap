"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Send } from "lucide-react"
import { useSwapRequests } from "@/hooks/use-swap-requests"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  location: string
  bio: string
  rating: number
  reviews: number
  availability: string[]
  skillsOffered: Array<{ name: string; level: string }>
  skillsWanted: string[]
  profileImage?: string
}

interface SwapRequestModalProps {
  isOpen: boolean
  onClose: () => void
  targetUser: User
}

export function SwapRequestModal({ isOpen, onClose, targetUser }: SwapRequestModalProps) {
  const [selectedSkillOffered, setSelectedSkillOffered] = useState("")
  const [selectedSkillWanted, setSelectedSkillWanted] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { sendRequest } = useSwapRequests()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSkillOffered || !selectedSkillWanted || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await sendRequest(targetUser.id, selectedSkillOffered, selectedSkillWanted, message.trim())
      toast({
        title: "Request Sent!",
        description: `Your swap request has been sent to ${targetUser.name}.`,
      })
      onClose()
      // Reset form
      setSelectedSkillOffered("")
      setSelectedSkillWanted("")
      setMessage("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Send className="h-5 w-5 text-blue-600" />
            <span>Send Swap Request</span>
          </DialogTitle>
          <DialogDescription>Send a skill exchange request to {targetUser.name}</DialogDescription>
        </DialogHeader>

        {/* Target User Info */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <Avatar className="h-12 w-12">
            <AvatarImage src={targetUser.profileImage || "/placeholder.svg"} />
            <AvatarFallback>
              {targetUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{targetUser.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{targetUser.rating}</span>
                <span className="ml-1">({targetUser.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{targetUser.location}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Skill I'm Offering */}
          <div className="space-y-2">
            <Label htmlFor="skillOffered">Skill I'm Offering *</Label>
            <Select value={selectedSkillOffered} onValueChange={setSelectedSkillOffered}>
              <SelectTrigger>
                <SelectValue placeholder="Select a skill you can teach" />
              </SelectTrigger>
              <SelectContent>
                {user?.skillsOffered.map((skill) => (
                  <SelectItem key={skill.name} value={skill.name}>
                    <div className="flex items-center justify-between w-full">
                      <span>{skill.name}</span>
                      <Badge variant="secondary" className="ml-2">
                        {skill.level}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skill I Want to Learn */}
          <div className="space-y-2">
            <Label htmlFor="skillWanted">Skill I Want to Learn *</Label>
            <Select value={selectedSkillWanted} onValueChange={setSelectedSkillWanted}>
              <SelectTrigger>
                <SelectValue placeholder="Select a skill you want to learn" />
              </SelectTrigger>
              <SelectContent>
                {targetUser.skillsOffered.map((skill) => (
                  <SelectItem key={skill.name} value={skill.name}>
                    <div className="flex items-center justify-between w-full">
                      <span>{skill.name}</span>
                      <Badge variant="secondary" className="ml-2">
                        {skill.level}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Introduce yourself and explain why you'd like to exchange skills..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">{message.length}/500 characters</p>
          </div>

          {/* Availability Info */}
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Their Availability</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {targetUser.availability.map((time) => (
                <Badge key={time} variant="outline" className="text-xs">
                  {time}
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
