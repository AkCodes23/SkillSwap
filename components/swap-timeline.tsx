"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Clock, Star, Calendar, MessageCircle, Video, BookOpen } from "lucide-react"

interface TimelineEvent {
  id: string
  type: "session" | "milestone" | "review" | "message" | "achievement"
  title: string
  description: string
  date: string
  time: string
  icon: any
  color: string
  partner?: {
    name: string
    avatar: string
  }
  rating?: number
  achievement?: string
}

const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "session",
    title: "React Fundamentals - Session 8",
    description: "Completed final project review and deployment",
    date: "2024-07-10",
    time: "2:00 PM",
    icon: Video,
    color: "bg-green-500",
    partner: { name: "Sarah Johnson", avatar: "SJ" },
  },
  {
    id: "2",
    type: "achievement",
    title: "Certificate Earned!",
    description: "Successfully completed React learning path",
    date: "2024-07-10",
    time: "2:30 PM",
    icon: Star,
    color: "bg-yellow-500",
    achievement: "React Intermediate",
  },
  {
    id: "3",
    type: "review",
    title: "Received 5-star review",
    description: "Sarah rated your Python teaching skills",
    date: "2024-07-10",
    time: "3:00 PM",
    icon: Star,
    color: "bg-purple-500",
    partner: { name: "Sarah Johnson", avatar: "SJ" },
    rating: 5,
  },
  {
    id: "4",
    type: "session",
    title: "Python Advanced - Session 7",
    description: "Covered machine learning basics and scikit-learn",
    date: "2024-07-08",
    time: "10:00 AM",
    icon: Video,
    color: "bg-blue-500",
    partner: { name: "Sarah Johnson", avatar: "SJ" },
  },
  {
    id: "5",
    type: "milestone",
    title: "Halfway Point Reached",
    description: "Completed 50% of React learning objectives",
    date: "2024-06-25",
    time: "4:00 PM",
    icon: CheckCircle,
    color: "bg-emerald-500",
  },
  {
    id: "6",
    type: "message",
    title: "Study materials shared",
    description: "Sarah shared additional React resources and practice exercises",
    date: "2024-06-20",
    time: "11:30 AM",
    icon: MessageCircle,
    color: "bg-indigo-500",
    partner: { name: "Sarah Johnson", avatar: "SJ" },
  },
]

interface SwapTimelineProps {
  swapId: string
}

export function SwapTimeline({ swapId }: SwapTimelineProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center">
        <Clock className="mr-2 h-5 w-5 text-emerald-600" />
        Swap Timeline
      </h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-6">
          {mockTimelineEvents.map((event, index) => {
            const Icon = event.icon
            return (
              <div key={event.id} className="relative flex items-start space-x-4">
                {/* Timeline dot */}
                <div
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${event.color} shadow-lg`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                {/* Event content */}
                <Card className="flex-1 border-0 shadow-md hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-800">{event.title}</h4>
                          {event.partner && (
                            <div className="flex items-center space-x-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback className="bg-gradient-primary text-white text-xs">
                                  {event.partner.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-600">{event.partner.name}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>

                        {event.rating && (
                          <div className="flex items-center space-x-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= event.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        )}

                        {event.achievement && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {event.achievement}
                          </Badge>
                        )}
                      </div>

                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
