"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Flame, Target, Users, Zap, Gift, Crown } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  progress: number
  maxProgress: number
  unlocked: boolean
  rarity: "common" | "rare" | "epic" | "legendary"
}

export function EngagementFeatures() {
  const [streak, setStreak] = useState(7)
  const [level, setLevel] = useState(5)
  const [xp, setXp] = useState(750)
  const [nextLevelXp] = useState(1000)
  const [showAchievement, setShowAchievement] = useState(false)

  const achievements: Achievement[] = [
    {
      id: "first-swap",
      title: "First Exchange",
      description: "Complete your first skill swap",
      icon: Zap,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      rarity: "common",
    },
    {
      id: "social-butterfly",
      title: "Social Butterfly",
      description: "Connect with 10 different people",
      icon: Users,
      progress: 7,
      maxProgress: 10,
      unlocked: false,
      rarity: "rare",
    },
    {
      id: "master-teacher",
      title: "Master Teacher",
      description: "Receive 5-star ratings from 5 students",
      icon: Crown,
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      rarity: "epic",
    },
    {
      id: "streak-master",
      title: "Streak Master",
      description: "Maintain a 30-day learning streak",
      icon: Flame,
      progress: 7,
      maxProgress: 30,
      unlocked: false,
      rarity: "legendary",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const simulateXpGain = () => {
    const gainedXp = Math.floor(Math.random() * 50) + 25
    setXp((prev) => prev + gainedXp)

    toast({
      title: `+${gainedXp} XP earned! ⚡`,
      description: "Keep learning to level up!",
      duration: 2000,
    })

    if (xp + gainedXp >= nextLevelXp) {
      setTimeout(() => {
        setLevel((prev) => prev + 1)
        setXp(0)
        toast({
          title: "Level Up! 🎉",
          description: `Congratulations! You've reached level ${level + 1}!`,
          duration: 4000,
        })
      }, 1000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-purple-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level Progress */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold text-gray-800">Level {level}</span>
              </div>
              <Progress value={(xp / nextLevelXp) * 100} className="mb-2" />
              <p className="text-sm text-gray-600">
                {xp}/{nextLevelXp} XP
              </p>
            </div>

            {/* Learning Streak */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Flame className="h-6 w-6 text-orange-500 mr-2" />
                <span className="text-2xl font-bold text-gray-800">{streak} days</span>
              </div>
              <p className="text-sm text-gray-600">Learning streak</p>
              <Badge className="mt-2 bg-orange-100 text-orange-800">🔥 On fire!</Badge>
            </div>

            {/* Quick Action */}
            <div className="text-center">
              <Button
                onClick={simulateXpGain}
                className="gradient-primary text-white hover:opacity-90 transition-all duration-200 hover-lift mb-2"
              >
                <Gift className="mr-2 h-4 w-4" />
                Daily Bonus
              </Button>
              <p className="text-xs text-gray-500">Earn XP for daily activities</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Target className="mr-2 h-5 w-5 text-emerald-600" />
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    achievement.unlocked ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${achievement.unlocked ? "bg-emerald-500" : "bg-gray-400"}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                        <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>{achievement.rarity}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={(achievement.progress / achievement.maxProgress) * 100}
                          className="flex-1 h-2"
                        />
                        <span className="text-xs text-gray-500">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
