"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Target, Award, BookOpen, Users, Star, Zap, Brain } from "lucide-react"

interface LearningStats {
  totalHoursLearned: number
  totalHoursTaught: number
  skillsLearned: number
  skillsTaught: number
  averageSessionRating: number
  completionRate: number
  streakDays: number
  certificatesEarned: number
  favoriteSkillCategory: string
  mostActiveDay: string
  learningGoalProgress: number
  teachingGoalProgress: number
}

const mockStats: LearningStats = {
  totalHoursLearned: 156,
  totalHoursTaught: 89,
  skillsLearned: 8,
  skillsTaught: 5,
  averageSessionRating: 4.7,
  completionRate: 85,
  streakDays: 23,
  certificatesEarned: 4,
  favoriteSkillCategory: "Technology",
  mostActiveDay: "Tuesday",
  learningGoalProgress: 78,
  teachingGoalProgress: 92,
}

const skillProgress = [
  { skill: "React", level: "Intermediate", progress: 85, sessions: 8, hours: 24 },
  { skill: "Python", level: "Advanced", progress: 95, sessions: 12, hours: 36 },
  { skill: "UI/UX Design", level: "Beginner", progress: 45, sessions: 4, hours: 16 },
  { skill: "Photography", level: "Intermediate", progress: 70, sessions: 6, hours: 18 },
  { skill: "Spanish", level: "Advanced", progress: 90, sessions: 15, hours: 45 },
]

const monthlyActivity = [
  { month: "Jan", learned: 12, taught: 8 },
  { month: "Feb", learned: 18, taught: 10 },
  { month: "Mar", learned: 22, taught: 15 },
  { month: "Apr", learned: 28, taught: 18 },
  { month: "May", learned: 35, taught: 22 },
  { month: "Jun", learned: 41, taught: 16 },
]

export function LearningAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Learning Analytics
        </h2>
        <p className="text-gray-600">Track your progress and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg hover-lift">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="text-2xl font-bold text-emerald-600">{mockStats.totalHoursLearned}</span>
            </div>
            <div className="text-sm text-gray-600">Hours Learned</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover-lift">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold text-purple-600">{mockStats.totalHoursTaught}</span>
            </div>
            <div className="text-sm text-gray-600">Hours Taught</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover-lift">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-2xl font-bold text-yellow-600">{mockStats.averageSessionRating}</span>
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover-lift">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-5 w-5 text-amber-600 mr-2" />
              <span className="text-2xl font-bold text-amber-600">{mockStats.certificatesEarned}</span>
            </div>
            <div className="text-sm text-gray-600">Certificates</div>
          </CardContent>
        </Card>
      </div>

      {/* Goals Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Target className="mr-2 h-5 w-5 text-emerald-600" />
              Learning Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Annual Learning Target</span>
                <span>{mockStats.learningGoalProgress}%</span>
              </div>
              <Progress value={mockStats.learningGoalProgress} className="h-3" />
              <p className="text-xs text-gray-600">
                {200 - Math.round((mockStats.learningGoalProgress / 100) * 200)} hours remaining to reach your 200-hour
                goal
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Brain className="mr-2 h-5 w-5 text-purple-600" />
              Teaching Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Annual Teaching Target</span>
                <span>{mockStats.teachingGoalProgress}%</span>
              </div>
              <Progress value={mockStats.teachingGoalProgress} className="h-3" />
              <p className="text-xs text-gray-600">
                {100 - Math.round((mockStats.teachingGoalProgress / 100) * 100)} hours remaining to reach your 100-hour
                goal
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Progress */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
            Skill Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillProgress.map((skill) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium">{skill.skill}</h4>
                    <Badge variant="outline" className="text-xs">
                      {skill.level}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {skill.sessions} sessions • {skill.hours}h
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Progress value={skill.progress} className="flex-1 h-2" />
                  <span className="text-sm font-medium text-gray-600">{skill.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="mr-2 h-5 w-5 text-emerald-600" />
            Monthly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyActivity.map((month) => (
              <div key={month.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{month.month}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 text-xs text-emerald-600">Learned</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(month.learned / 50) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-xs text-gray-600">{month.learned}h</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 text-xs text-purple-600">Taught</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(month.taught / 50) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-xs text-gray-600">{month.taught}h</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Zap className="mr-2 h-5 w-5 text-amber-600" />
            Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-emerald-700">🎯 Learning Insights</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your most productive day is {mockStats.mostActiveDay}</li>
                <li>• You prefer {mockStats.favoriteSkillCategory.toLowerCase()} skills</li>
                <li>• {mockStats.streakDays}-day learning streak - keep it up!</li>
                <li>• {mockStats.completionRate}% completion rate - excellent!</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-700">💡 Recommendations</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Try learning design skills to complement your tech stack</li>
                <li>• Consider teaching more to boost your profile</li>
                <li>• Schedule sessions on weekends for better availability</li>
                <li>• Set up practice sessions to maintain your skills</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
