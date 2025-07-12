"use client" 

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { X, Star, MapPin, Send, Heart, UserPlus } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  avatar: string
  location: string
  rating: number
  reviews: number
  bio: string
  skills: string[]
  isOnline?: boolean
}

interface UserInteractionPanelProps {
  user: User
  onClose: () => void
}

export function UserInteractionPanel({ user, onClose }: UserInteractionPanelProps) {
  const [message, setMessage] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const handleSendMessage = () => {
    if (!message.trim()) return

    toast({
      title: "Message sent!",
      description: `Your message has been sent to ${user.name}`,
    })
    setMessage("")
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? `Removed ${user.name} from your favorites` : `Added ${user.name} to your favorites`,
    })
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing ? `You unfollowed ${user.name}` : `You are now following ${user.name}`,
    })
  }

  return (
    <Card className="w-80 shadow-2xl border-0 animate-slide-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-gradient-primary text-white font-bold">{user.avatar}</AvatarFallback>
            </Avatar>
            {user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{user.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-amber-500 fill-current" />
              <span className="text-sm">{user.rating}</span>
              <span className="text-xs text-gray-500">({user.reviews})</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600">{user.bio}</p>

        {/* Skills */}
        <div>
          <p className="text-sm font-semibold mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {user.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLike}
            className={`flex-1 ${isLiked ? "text-red-600 border-red-200" : ""}`}
          >
            <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
            {isLiked ? "Liked" : "Like"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleFollow}
            className={`flex-1 ${isFollowing ? "text-blue-600 border-blue-200" : ""}`}
          >
            <UserPlus className="h-4 w-4 mr-1" />
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        {/* Quick Message */}
        <div className="space-y-2">
          <p className="text-sm font-semibold">Send a quick message</p>
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="resize-none"
          />
          <Button onClick={handleSendMessage} disabled={!message.trim()} className="w-full gradient-primary text-white">
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
