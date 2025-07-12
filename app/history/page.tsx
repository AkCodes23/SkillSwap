"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SwapHistory } from "@/components/swap-history"
import { SwapTimeline } from "@/components/swap-timeline"
import { LearningAnalytics } from "@/components/learning-analytics"
import { History, BarChart3, Clock } from "lucide-react"

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("history")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
              Learning Journey
            </h1>
            <p className="text-xl text-gray-600">
              Track your progress, view your history, and analyze your learning patterns
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg border-0">
              <TabsTrigger
                value="history"
                className="flex items-center space-x-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700"
              >
                <History className="h-4 w-4" />
                <span>Swap History</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center space-x-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger
                value="timeline"
                className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
              >
                <Clock className="h-4 w-4" />
                <span>Timeline</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="animate-fade-in">
              <SwapHistory />
            </TabsContent>

            <TabsContent value="analytics" className="animate-fade-in">
              <LearningAnalytics />
            </TabsContent>

            <TabsContent value="timeline" className="animate-fade-in">
              <SwapTimeline swapId="1" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
