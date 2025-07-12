"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Mail, Edit } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Profile</h1>
            <p className="text-gray-600">Manage your profile information and skills</p>
          </div>
          <Link href="/profile/edit">
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-blue-500 text-white text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{user.rating}</span>
                <span className="text-gray-500">({user.reviews} reviews)</span>
              </div>

              <div className="flex items-center justify-center space-x-1 text-gray-500 mb-4">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>

              <div className="flex items-center justify-center space-x-1 text-gray-500 mb-4">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{user.location}</span>
              </div>

              <div className="text-left">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>

              <div className="mt-6 text-left">
                <h3 className="font-semibold mb-2">Availability</h3>
                <div className="flex flex-wrap gap-1">
                  {user.availability.map((time: string) => (
                    <Badge key={time} variant="outline" className="text-xs">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Skills I Can Offer</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.map((skill: any) => (
                    <Badge key={skill.name} className="bg-green-100 text-green-800 hover:bg-green-200">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Skills I Want to Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skillsWanted.map((skill: string) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
