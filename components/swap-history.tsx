"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  Star,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  RotateCcw,
  TrendingUp,
  Award,
  BookOpen,
  Users,
} from "lucide-react"
import { ReviewModal } from "@/components/review-modal"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SwapHistoryItem {
  id: string
  partner: {
    name: string
    avatar: string
    rating: number
  }
  skillTaught: string
  skillLearned: string
  status: "completed" | "cancelled" | "in-progress"
  startDate: string
  endDate?: string
  duration: string
  sessionsCompleted: number
  totalSessions: number
  myRating?: number
  partnerRating?: number
  myReview?: string
  partnerReview?: string
  certificateEarned?: boolean
  skillLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  progressPercentage: number
  tags: string[]
}

const mockSwapHistory: SwapHistoryItem[] = [
  {
    id: "1",
    partner: {
      name: "Sarah Johnson",
      avatar: "SJ",
      rating: 4.9,
    },
    skillTaught: "Python",
    skillLearned: "React",
    status: "completed",
    startDate: "2024-06-15",
    endDate: "2024-07-10",
    duration: "25 days",
    sessionsCompleted: 8,
    totalSessions: 8,
    myRating: 5,
    partnerRating: 4,
    myReview: "Sarah was an excellent teacher! Very patient and knowledgeable.",
    partnerReview: "Great student, always prepared and asked good questions.",
    certificateEarned: true,
    skillLevel: "Intermediate",
    progressPercentage: 100,
    tags: ["Web Development", "Frontend", "JavaScript"],
  },
  {
    id: "2",
    partner: {
      name: "Mike Chen",
      avatar: "MC",
      rating: 4.7,
    },
    skillTaught: "Photography",
    skillLearned: "UI/UX Design",
    status: "in-progress",
    startDate: "2024-07-01",
    duration: "12 days",
    sessionsCompleted: 4,
    totalSessions: 6,
    skillLevel: "Beginner",
    progressPercentage: 67,
    tags: ["Design", "Creative", "Visual Arts"],
  },
  {
    id: "3",
    partner: {
      name: "Emma Rodriguez",
      avatar: "ER",
      rating: 4.8,
    },
    skillTaught: "Cooking",
    skillLearned: "Data Analysis",
    status: "cancelled",
    startDate: "2024-05-20",
    endDate: "2024-05-25",
    duration: "5 days",
    sessionsCompleted: 2,
    totalSessions: 8,
    skillLevel: "Beginner",
    progressPercentage: 25,
    tags: ["Analytics", "Statistics", "Data Science"],
  },
  {
    id: "4",
    partner: {
      name: "David Kim",
      avatar: "DK",
      rating: 4.6,
    },
    skillTaught: "Guitar",
    skillLearned: "Spanish",
    status: "completed",
    startDate: "2024-04-10",
    endDate: "2024-05-15",
    duration: "35 days",
    sessionsCompleted: 12,
    totalSessions: 12,
    myRating: 4,
    partnerRating: 5,
    certificateEarned: true,
    skillLevel: "Advanced",
    progressPercentage: 100,
    tags: ["Language", "Music", "Cultural Exchange"],
  },
]

export function SwapHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedSwap, setSelectedSwap] = useState<SwapHistoryItem | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)

  const filteredHistory = mockSwapHistory
    .filter((swap) => {
      const matchesSearch =
        swap.partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        swap.skillTaught.toLowerCase().includes(searchTerm.toLowerCase()) ||
        swap.skillLearned.toLowerCase().includes(searchTerm.toLowerCase()) ||
        swap.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = statusFilter === "all" || swap.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        case "oldest":
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        case "rating":
          return (b.myRating || 0) - (a.myRating || 0)
        case "duration":
          return b.sessionsCompleted - a.sessionsCompleted
        default:
          return 0
      }
    })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "in-progress":
        return <RotateCcw className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleLeaveReview = (swap: SwapHistoryItem) => {
    setSelectedSwap(swap)
    setShowReviewModal(true)
  }

  const handleViewDetails = (swap: SwapHistoryItem) => {
    setSelectedSwap(swap)
    setShowDetailsModal(true)
  }

  const handleDownloadCertificate = (swap: SwapHistoryItem) => {
    // Create a simple certificate
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 800
    canvas.height = 600

    if (ctx) {
      // Background
      ctx.fillStyle = "#f0fdf4"
      ctx.fillRect(0, 0, 800, 600)

      // Border
      ctx.strokeStyle = "#10b981"
      ctx.lineWidth = 10
      ctx.strokeRect(20, 20, 760, 560)

      // Title
      ctx.fillStyle = "#065f46"
      ctx.font = "bold 48px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Certificate of Completion", 400, 120)

      // Skill
      ctx.font = "bold 36px Arial"
      ctx.fillText(swap.skillLearned, 400, 200)

      // Details
      ctx.font = "24px Arial"
      ctx.fillText(`Completed with ${swap.partner.name}`, 400, 280)
      ctx.fillText(`Duration: ${swap.duration}`, 400, 320)
      ctx.fillText(`Sessions: ${swap.sessionsCompleted}`, 400, 360)
      ctx.fillText(`Level Achieved: ${swap.skillLevel}`, 400, 400)

      // Date
      ctx.font = "20px Arial"
      ctx.fillText(`Completed on: ${new Date(swap.endDate!).toLocaleDateString()}`, 400, 480)

      // Download
      const link = document.createElement("a")
      link.download = `${swap.skillLearned}_Certificate.png`
      link.href = canvas.toDataURL()
      link.click()
    }

    toast({
      title: "Certificate Downloaded! 📜",
      description: `Your ${swap.skillLearned} certificate has been downloaded.`,
      duration: 3000,
    })
  }

  const stats = {
    total: mockSwapHistory.length,
    completed: mockSwapHistory.filter((s) => s.status === "completed").length,
    inProgress: mockSwapHistory.filter((s) => s.status === "in-progress").length,
    cancelled: mockSwapHistory.filter((s) => s.status === "cancelled").length,
    certificates: mockSwapHistory.filter((s) => s.certificateEarned).length,
    totalSessions: mockSwapHistory.reduce((sum, s) => sum + s.sessionsCompleted, 0),
    averageRating:
      mockSwapHistory.filter((s) => s.myRating).reduce((sum, s) => sum + (s.myRating || 0), 0) /
        mockSwapHistory.filter((s) => s.myRating).length || 0,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
            Swap History
          </h2>
          <p className="text-gray-600 mt-1">Track your learning journey and past exchanges</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="hover-lift border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Swaps</div>
          </CardContent>
        </Card>
        <Card className="hover-lift border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card className="hover-lift border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card className="hover-lift border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </CardContent>
        </Card>
        <Card className="hover-lift border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.certificates}</div>
            <div className="text-sm text-gray-600">Certificates</div>
          </CardContent>
        </Card>
        <Card className="hover-lift border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.totalSessions}</div>
            <div className="text-sm text-gray-600">Sessions</div>
          </CardContent>
        </Card>
        <Card className="hover-lift border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{stats.averageRating.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by partner, skill, or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 focus:border-emerald-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 border-2 focus:border-emerald-500">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 border-2 focus:border-emerald-500">
                <TrendingUp className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="duration">Most Sessions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No swap history found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredHistory.map((swap, index) => (
            <Card
              key={swap.id}
              className="border-0 shadow-lg hover-lift transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  {/* Main Info */}
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="h-14 w-14 border-2 border-white shadow-lg">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-gradient-primary text-white font-bold">
                        {swap.partner.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-lg text-gray-800">{swap.partner.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{swap.partner.rating}</span>
                        </div>
                        <Badge className={getStatusColor(swap.status)}>
                          {getStatusIcon(swap.status)}
                          <span className="ml-1 capitalize">{swap.status.replace("-", " ")}</span>
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(swap.startDate).toLocaleDateString()}</span>
                          {swap.endDate && (
                            <>
                              <span>-</span>
                              <span>{new Date(swap.endDate).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{swap.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>
                            {swap.sessionsCompleted}/{swap.totalSessions} sessions
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-emerald-100 text-emerald-800">Taught: {swap.skillTaught}</Badge>
                          <span className="text-gray-400">↔</span>
                          <Badge className="bg-purple-100 text-purple-800">Learned: {swap.skillLearned}</Badge>
                        </div>
                        {swap.certificateEarned && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Award className="h-3 w-3 mr-1" />
                            Certified
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {swap.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Progress Bar for In-Progress Swaps */}
                      {swap.status === "in-progress" && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${swap.progressPercentage}%` }}
                          ></div>
                        </div>
                      )}

                      {/* Ratings */}
                      {swap.status === "completed" && (swap.myRating || swap.partnerRating) && (
                        <div className="flex items-center space-x-4 text-sm">
                          {swap.myRating && (
                            <div className="flex items-center space-x-1">
                              <span className="text-gray-600">You rated:</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= swap.myRating! ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                          {swap.partnerRating && (
                            <div className="flex items-center space-x-1">
                              <span className="text-gray-600">They rated:</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= swap.partnerRating! ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 lg:ml-4">
                    <Button
                      onClick={() => handleViewDetails(swap)}
                      variant="outline"
                      size="sm"
                      className="w-full lg:w-auto"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>

                    {swap.status === "completed" && !swap.myRating && (
                      <Button
                        onClick={() => handleLeaveReview(swap)}
                        className="w-full lg:w-auto gradient-primary text-white hover:opacity-90"
                        size="sm"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Leave Review
                      </Button>
                    )}

                    {swap.certificateEarned && (
                      <Button
                        onClick={() => handleDownloadCertificate(swap)}
                        variant="outline"
                        size="sm"
                        className="w-full lg:w-auto border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Certificate
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Swap Details Modal */}
      {selectedSwap && (
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="max-w-2xl border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
                Swap Details
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Partner Info */}
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-purple-50 rounded-xl">
                <Avatar className="h-16 w-16 border-2 border-emerald-200">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-gradient-primary text-white font-bold text-lg">
                    {selectedSwap.partner.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedSwap.partner.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{selectedSwap.partner.rating}</span>
                  </div>
                  <Badge className={getStatusColor(selectedSwap.status)}>
                    {getStatusIcon(selectedSwap.status)}
                    <span className="ml-1 capitalize">{selectedSwap.status.replace("-", " ")}</span>
                  </Badge>
                </div>
              </div>

              {/* Swap Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Exchange Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">You taught:</span>
                      <Badge className="bg-emerald-100 text-emerald-800">{selectedSwap.skillTaught}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">You learned:</span>
                      <Badge className="bg-purple-100 text-purple-800">{selectedSwap.skillLearned}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level achieved:</span>
                      <span className="font-medium">{selectedSwap.skillLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-medium">{selectedSwap.progressPercentage}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Started:</span>
                      <span className="font-medium">{new Date(selectedSwap.startDate).toLocaleDateString()}</span>
                    </div>
                    {selectedSwap.endDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed:</span>
                        <span className="font-medium">{new Date(selectedSwap.endDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{selectedSwap.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sessions:</span>
                      <span className="font-medium">
                        {selectedSwap.sessionsCompleted}/{selectedSwap.totalSessions}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              {(selectedSwap.myReview || selectedSwap.partnerReview) && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Reviews</h4>
                  {selectedSwap.myReview && (
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <p className="text-sm font-medium text-emerald-800">Your review:</p>
                      <p className="text-sm text-emerald-700 mt-1">"{selectedSwap.myReview}"</p>
                      {selectedSwap.myRating && (
                        <div className="flex mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= selectedSwap.myRating! ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {selectedSwap.partnerReview && (
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">Their review:</p>
                      <p className="text-sm text-purple-700 mt-1">"{selectedSwap.partnerReview}"</p>
                      {selectedSwap.partnerRating && (
                        <div className="flex mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= selectedSwap.partnerRating! ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Tags */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSwap.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                {selectedSwap.certificateEarned && (
                  <Button
                    onClick={() => handleDownloadCertificate(selectedSwap)}
                    className="gradient-primary text-white hover:opacity-90"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                )}
                <Button onClick={() => setShowDetailsModal(false)} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Review Modal */}
      {selectedSwap && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => {
            setShowReviewModal(false)
            setSelectedSwap(null)
          }}
          swap={{
            id: Number.parseInt(selectedSwap.id),
            partner: selectedSwap.partner,
            skills: `${selectedSwap.skillTaught} ↔ ${selectedSwap.skillLearned}`,
          }}
        />
      )}
    </div>
  )
}
