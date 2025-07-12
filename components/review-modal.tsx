"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Send, ThumbsUp, Heart } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  swap: {
    id: number
    partner: {
      name: string
      avatar: string
    }
    skills: string
  }
}

export function ReviewModal({ isOpen, onClose, swap }: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Please add a rating",
        description: "Select a star rating before submitting your review.",
        variant: "destructive",
        duration: 2000,
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Review submitted! ⭐",
        description: `Thank you for reviewing your swap with ${swap.partner.name}.`,
        duration: 3000,
      })

      onClose()
      setRating(0)
      setReview("")
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your review. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
            Review Your Swap
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Partner Info */}
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-purple-50 rounded-xl">
            <Avatar className="h-12 w-12 border-2 border-emerald-200">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-gradient-primary text-white font-bold">
                {swap.partner.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-800">{swap.partner.name}</h3>
              <p className="text-sm text-gray-600">{swap.skills}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">How was your experience?</Label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-all duration-200 hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-center text-sm text-gray-600">
                {rating === 0 && "Click to rate"}
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </div>
            </div>

            {/* Review Text */}
            <div className="space-y-3">
              <Label htmlFor="review" className="text-sm font-semibold">
                Share your experience (optional)
              </Label>
              <Textarea
                id="review"
                placeholder="Tell others about your skill exchange experience..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                className="border-2 focus:border-emerald-500 transition-colors resize-none"
              />
            </div>

            {/* Quick Feedback Options */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Quick feedback</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: ThumbsUp, text: "Great teacher", color: "bg-blue-100 text-blue-800" },
                  { icon: Heart, text: "Very patient", color: "bg-pink-100 text-pink-800" },
                  { icon: Star, text: "Highly skilled", color: "bg-yellow-100 text-yellow-800" },
                ].map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 ${item.color}`}
                  >
                    <item.icon className="h-3 w-3" />
                    <span>{item.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gradient-primary text-white hover:opacity-90 transition-all duration-200 hover-lift"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="spinner mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Review
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
