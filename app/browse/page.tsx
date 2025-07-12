"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, MapPin, Clock, Filter, Users, Zap, MessageCircle } from "lucide-react"
import { SwapRequestModal } from "@/components/swap-request-modal"
import { toast } from "@/hooks/use-toast"
import { UserInteractionPanel } from "@/components/user-interaction-panel"

const popularSkills = [
  { name: "React", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
  { name: "TypeScript", color: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200" },
  { name: "Node.js", color: "bg-green-100 text-green-800 hover:bg-green-200" },
  { name: "Machine Learning", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
  { name: "UI/UX Design", color: "bg-pink-100 text-pink-800 hover:bg-pink-200" },
  { name: "Figma", color: "bg-orange-100 text-orange-800 hover:bg-orange-200" },
  { name: "Adobe Creative Suite", color: "bg-red-100 text-red-800 hover:bg-red-200" },
]

const users = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@skillswap.com",
    avatar: "AJ",
    location: "San Francisco",
    rating: 4.9,
    reviews: 42,
    bio: "Full-stack developer passionate about React and Node.js",
    skillsOffered: [
      { name: "Python", level: "Expert" },
      { name: "Cooking", level: "Intermediate" },
      { name: "Photography", level: "Advanced" },
    ],
    skillsWanted: ["UI/UX Design", "Machine Learning"],
    availability: ["weekdays", "evenings", "flexible"],
    isOnline: true,
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@skillswap.com",
    avatar: "SC",
    location: "New York",
    rating: 4.7,
    reviews: 38,
    bio: "Designer with 10+ years in UX/UI design",
    skillsOffered: [
      { name: "UI/UX Design", level: "Expert" },
      { name: "Figma", level: "Advanced" },
      { name: "Adobe Creative Suite", level: "Intermediate" },
    ],
    skillsWanted: ["React", "Python Programming"],
    availability: ["weekends", "mornings"],
    isOnline: false,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    email: "emma@skillswap.com",
    avatar: "ER",
    location: "London",
    rating: 4.8,
    reviews: 55,
    bio: "Data scientist and ML engineer",
    skillsOffered: [
      { name: "Python", level: "Expert" },
      { name: "Machine Learning", level: "Advanced" },
      { name: "Data Analysis", level: "Expert" },
    ],
    skillsWanted: ["Cloud Architecture", "DevOps"],
    availability: ["weekdays", "weekends", "mornings", "evenings", "flexible"],
    isOnline: true,
  },
]

export default function BrowseSkills() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("all")
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUserForInteraction, setSelectedUserForInteraction] = useState<any>(null)
  const [showInteractionPanel, setShowInteractionPanel] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSkill =
      selectedSkill === "all" ||
      user.skillsOffered.some((skill) => skill.name.toLowerCase().includes(selectedSkill.toLowerCase()))

    return matchesSearch && matchesSkill
  })

  const handleSendRequest = (user: (typeof users)[0]) => {
    setSelectedUser(user)
    setShowRequestModal(true)
  }

  const handleSkillClick = (skillName: string) => {
    setSearchTerm(skillName)
    toast({
      title: "Filter applied",
      description: `Showing results for "${skillName}"`,
      duration: 2000,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
              Browse Skills
            </h1>
            <p className="text-xl text-gray-600">Discover talented people and find skills you want to learn</p>
          </div>

          {/* Search and Filters */}
          <Card className="border-0 shadow-xl hover-lift animate-slide-in">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search by name, skill, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 border-2 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger className="w-full md:w-48 h-12 border-2 focus:border-emerald-500">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="All Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    {popularSkills.map((skill) => (
                      <SelectItem key={skill.name} value={skill.name.toLowerCase()}>
                        {skill.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Popular Skills */}
          <div className="animate-slide-in">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Zap className="mr-2 h-6 w-6 text-emerald-600" />
              Popular Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {popularSkills.map((skill) => (
                <Badge
                  key={skill.name}
                  className={`${skill.color} cursor-pointer transition-all duration-200 hover-lift px-4 py-2 text-sm font-medium`}
                  onClick={() => handleSkillClick(skill.name)}
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold flex items-center">
                <Users className="mr-2 h-6 w-6 text-purple-600" />
                {filteredUsers.length} people found
              </h3>
              {isLoading && <div className="spinner"></div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user, index) => (
                <Card
                  key={user.id}
                  className="hover-lift border-0 shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* User Header */}
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-14 w-14 border-2 border-white shadow-lg">
                            <AvatarImage src={`/placeholder-user.jpg`} />
                            <AvatarFallback className="bg-gradient-primary text-white text-lg font-bold">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-gray-800">{user.name}</h4>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            <span>{user.location}</span>
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="h-4 w-4 text-amber-500 fill-current" />
                            <span className="text-sm font-medium">{user.rating}</span>
                            <span className="text-sm text-gray-500">({user.reviews})</span>
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-gray-600 leading-relaxed">{user.bio}</p>

                      {/* Skills Offered */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Offers</p>
                        <div className="flex flex-wrap gap-2">
                          {user.skillsOffered.map((skill) => (
                            <Badge
                              key={skill.name}
                              className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                            >
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Skills Wanted */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Wants</p>
                        <div className="flex flex-wrap gap-2">
                          {user.skillsWanted.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{user.availability.join(", ")}</span>
                      </div>

                      {/* Action Button */}
                      <div className="flex space-x-2">
                        <Button
                          className="flex-1 gradient-primary text-white hover:opacity-90 transition-all duration-200 hover-lift"
                          onClick={() => handleSendRequest(user)}
                        >
                          <Zap className="mr-2 h-4 w-4" />
                          Send Request
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedUserForInteraction(user)
                            setShowInteractionPanel(true)
                          }}
                          className="px-3"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Swap Request Modal */}
      {selectedUser && (
        <SwapRequestModal
          isOpen={showRequestModal}
          onClose={() => {
            setShowRequestModal(false)
            setSelectedUser(null)
          }}
          targetUser={selectedUser}
        />
      )}

      {/* User Interaction Panel */}
      {selectedUserForInteraction && showInteractionPanel && (
        <div className="fixed top-20 right-4 z-50">
          <UserInteractionPanel
            user={{
              ...selectedUserForInteraction,
              skills: selectedUserForInteraction.skillsOffered.map((skill: any) => skill.name),
            }}
            onClose={() => {
              setShowInteractionPanel(false)
              setSelectedUserForInteraction(null)
            }}
          />
        </div>
      )}
    </div>
  )
}
