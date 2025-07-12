"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, MapPin, Star, MessageCircle } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  contact: {
    name: string
    avatar: string
    location: string
    rating: number
    email: string
    bio: string
    availability: string[]
    activeSwap?: {
      skills: string
      startDate: string
    }
  }
}

export function ContactModal({ isOpen, onClose, contact }: ContactModalProps) {
  const handleSendEmail = () => {
    window.location.href = `mailto:${contact.email}`
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Contact Information</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info */}
          <div className="text-center space-y-3">
            <Avatar className="h-16 w-16 mx-auto">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-blue-500 text-white text-lg">{contact.avatar}</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="text-lg font-semibold">{contact.name}</h3>
              <div className="flex items-center justify-center space-x-1 text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>{contact.location}</span>
              </div>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">Rating: {contact.rating}</span>
              </div>
            </div>
          </div>

          {/* Active Swap */}
          {contact.activeSwap && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">Active Swap:</h4>
              <p className="text-blue-800">{contact.activeSwap.skills}</p>
              <p className="text-sm text-blue-600">Started: {contact.activeSwap.startDate}</p>
            </div>
          )}

          {/* Contact Methods */}
          <div className="space-y-3">
            <h4 className="font-medium">Contact Methods:</h4>

            <Button onClick={handleSendEmail} className="w-full justify-start">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>

            <div className="text-sm text-gray-600">
              Copy Email:
              <button onClick={copyEmail} className="ml-1 text-blue-600 hover:underline">
                {contact.email}
              </button>
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <h4 className="font-medium">Availability:</h4>
            <div className="flex flex-wrap gap-1">
              {contact.availability.map((time) => (
                <Badge key={time} variant="outline" className="text-xs">
                  {time}
                </Badge>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="space-y-2">
            <h4 className="font-medium">About:</h4>
            <p className="text-sm text-gray-600">{contact.bio}</p>
          </div>

          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
