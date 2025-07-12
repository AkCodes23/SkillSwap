"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Users, Clock, Star, Eye, Settings, Search, TrendingUp, Award, Zap } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useNotifications } from "@/hooks/use-notifications"
import { useState, useEffect } from "react"
import { EngagementFeatures } from "@/components/engagement-features"

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const { notifications, unreadCount } = useNotifications()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto p-8 animate-fade-in">
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6">
              <div className="text-3xl">🔄</div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
              SkillSwap
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Exchange skills, learn together, grow as a community
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/login">
              <Button
                size="lg"
                className="w-full gradient-primary text-white hover:opacity-90 transition-all duration-200 hover-lift"
              >
                <Zap className="mr-2 h-5 w-5" />
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-emerald-200 hover:bg-emerald-50 transition-all duration-200 bg-transparent"
              >
                Create Account
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">1000+</div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">500+</div>
              <div className="text-sm text-gray-500">Skills Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">2000+</div>
              <div className="text-sm text-gray-500">Successful Swaps</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="spinner mx-auto"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="gradient-primary text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
              <p className="text-emerald-100 text-lg">Ready to continue your skill exchange journey?</p>
            </div>
            <div className="space-x-4">
              <Link href="/browse">
                <Button variant="secondary" size="lg" className="hover-lift bg-white text-emerald-600 hover:bg-gray-50">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Skills
                </Button>
              </Link>
              <Link href="/profile/edit">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-emerald-600 bg-transparent hover-lift"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Update Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-in">
          {/* Stats Cards */}
          <Card className="hover-lift border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-orange-700 font-medium">Pending Requests</p>
                  <p className="text-3xl font-bold text-orange-800">1</p>
                  <p className="text-sm text-orange-600">awaiting response</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-emerald-700 font-medium">Active Swaps</p>
                  <p className="text-3xl font-bold text-emerald-800">1</p>
                  <p className="text-sm text-emerald-600">ongoing exchanges</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-700 font-medium">Your Rating</p>
                  <p className="text-3xl font-bold text-purple-800">4.8</p>
                  <p className="text-sm text-purple-600">from 25 reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add this after the existing grid */}
        <div className="mt-8">
          <EngagementFeatures />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="hover-lift border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Zap className="h-5 w-5 text-emerald-600" />
                </div>
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/browse"
                className="flex items-center space-x-3 p-4 rounded-xl hover:bg-emerald-50 transition-all duration-200 group border border-emerald-100"
              >
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                  <Search className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Browse Skills</p>
                  <p className="text-sm text-gray-500">Find people to learn from</p>
                </div>
              </Link>

              <Link
                href="/profile/edit"
                className="flex items-center space-x-3 p-4 rounded-xl hover:bg-purple-50 transition-all duration-200 group border border-purple-100"
              >
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Settings className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Update Profile</p>
                  <p className="text-sm text-gray-500">Manage your skills</p>
                </div>
              </Link>

              <Link
                href="/swaps"
                className="flex items-center space-x-3 p-4 rounded-xl hover:bg-amber-50 transition-all duration-200 group border border-amber-100"
              >
                <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                  <Eye className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">View Requests</p>
                  <p className="text-sm text-gray-500">Check pending swaps</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="hover-lift border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Bell className="h-5 w-5 text-red-600" />
                </div>
                <span>Notifications</span>
                {unreadCount > 0 && <Badge className="bg-red-500 text-white animate-pulse-slow">{unreadCount}</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${notification.read ? "bg-gray-300" : "bg-emerald-500 animate-pulse"}`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Link href="/notifications">
                <Button variant="outline" className="w-full mt-3 hover:bg-blue-50 bg-transparent">
                  View All Notifications
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="hover-lift border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">UI/UX Design ↔ Python</p>
                    <p className="text-xs text-gray-500">M to Alex Johnson • 7/9/2024</p>
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs mt-1 hover:bg-emerald-200">
                      <Award className="w-3 h-3 mr-1" />
                      active
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

