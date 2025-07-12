"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, XCircle, Send, MessageCircle, Star, User } from "lucide-react"
import { useSwapRequests } from "@/hooks/use-swap-requests"
import { useAuth } from "@/hooks/use-auth"
import { useMessages } from "@/hooks/use-messages"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { toast } from "@/hooks/use-toast"

export default function SwapsPage() {
  const { sentRequests, receivedRequests, acceptRequest, rejectRequest, cancelRequest } = useSwapRequests()
  const { createOrGetConversation } = useMessages()
  const { user } = useAuth()
  const router = useRouter()
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>({})

  const handleAcceptRequest = async (requestId: string) => {
    setLoadingActions((prev) => ({ ...prev, [requestId]: true }))
    try {
      await acceptRequest(requestId)
      toast({
        title: "Request Accepted!",
        description: "You can now start messaging to coordinate your skill exchange.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingActions((prev) => ({ ...prev, [requestId]: false }))
    }
  }

  const handleRejectRequest = async (requestId: string) => {
    setLoadingActions((prev) => ({ ...prev, [requestId]: true }))
    try {
      await rejectRequest(requestId)
      toast({
        title: "Request Declined",
        description: "The request has been declined.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decline request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingActions((prev) => ({ ...prev, [requestId]: false }))
    }
  }

  const handleCancelRequest = async (requestId: string) => {
    setLoadingActions((prev) => ({ ...prev, [requestId]: true }))
    try {
      await cancelRequest(requestId)
      toast({
        title: "Request Cancelled",
        description: "Your request has been cancelled.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingActions((prev) => ({ ...prev, [requestId]: false }))
    }
  }

  const handleStartConversation = async (userId: string) => {
    try {
      const conversationId = await createOrGetConversation(userId)
      router.push(`/messages`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Swap Requests</h1>
        <p className="text-gray-600">Manage your skill exchange requests and communications</p>
      </div>

      <Tabs defaultValue="received" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="received" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Received ({receivedRequests.length})</span>
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Sent ({sentRequests.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Received Requests */}
        <TabsContent value="received" className="space-y-4">
          {receivedRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <User className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No requests received</h3>
                <p className="text-gray-500 text-center">
                  When others send you skill exchange requests, they'll appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            receivedRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.fromUser.profileImage || "/placeholder.svg"} />
                        <AvatarFallback>
                          {request.fromUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{request.fromUser.name}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>{request.fromUser.rating}</span>
                          </div>
                          <span>{request.fromUser.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-1">They're offering:</h4>
                      <Badge variant="secondary">{request.skillOffered}</Badge>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-1">They want to learn:</h4>
                      <Badge variant="secondary">{request.skillWanted}</Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Message:</h4>
                    <p className="text-gray-700">{request.message}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(request.createdAt, { addSuffix: true })}
                    </span>

                    <div className="flex space-x-2">
                      {request.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectRequest(request.id)}
                            disabled={loadingActions[request.id]}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id)}
                            disabled={loadingActions[request.id]}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                        </>
                      )}
                      {request.status === "accepted" && (
                        <Button size="sm" onClick={() => handleStartConversation(request.fromUserId)}>
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Sent Requests */}
        <TabsContent value="sent" className="space-y-4">
          {sentRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Send className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No requests sent</h3>
                <p className="text-gray-500 text-center">
                  Browse skills and send requests to start exchanging knowledge!
                </p>
                <Button className="mt-4" onClick={() => router.push("/browse")}>
                  Browse Skills
                </Button>
              </CardContent>
            </Card>
          ) : (
            sentRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.toUser.profileImage || "/placeholder.svg"} />
                        <AvatarFallback>
                          {request.toUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{request.toUser.name}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>{request.toUser.rating}</span>
                          </div>
                          <span>{request.toUser.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-1">You're offering:</h4>
                      <Badge variant="secondary">{request.skillOffered}</Badge>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-1">You want to learn:</h4>
                      <Badge variant="secondary">{request.skillWanted}</Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Your message:</h4>
                    <p className="text-gray-700">{request.message}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(request.createdAt, { addSuffix: true })}
                    </span>

                    <div className="flex space-x-2">
                      {request.status === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelRequest(request.id)}
                          disabled={loadingActions[request.id]}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                      {request.status === "accepted" && (
                        <Button size="sm" onClick={() => handleStartConversation(request.toUserId)}>
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
