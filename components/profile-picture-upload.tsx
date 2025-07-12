"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Camera, Upload, X, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ProfilePictureUploadProps {
  currentImage?: string
  userName: string
  onImageUpdate: (imageUrl: string) => void
}

export function ProfilePictureUpload({ currentImage, userName, onImageUpdate }: ProfilePictureUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
          duration: 3000,
        })
        return
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file.",
          variant: "destructive",
          duration: 3000,
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedImage) return

    setIsUploading(true)

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you'd upload to a service like Cloudinary, AWS S3, etc.
      onImageUpdate(selectedImage)

      toast({
        title: "Profile picture updated! 📸",
        description: "Your new profile picture has been saved successfully.",
        duration: 3000,
      })

      setIsOpen(false)
      setSelectedImage(null)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onImageUpdate("")
    toast({
      title: "Profile picture removed",
      description: "Your profile picture has been removed.",
      duration: 2000,
    })
    setIsOpen(false)
  }

  return (
    <>
      <div className="relative group">
        <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
          <AvatarImage src={currentImage || "/placeholder.svg"} />
          <AvatarFallback className="bg-gradient-primary text-white text-3xl font-bold">
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <Button
          onClick={() => setIsOpen(true)}
          className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 rounded-full shadow-lg cursor-pointer hover:bg-emerald-600 transition-colors group-hover:scale-110"
          size="sm"
        >
          <Camera className="h-4 w-4 text-white" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
              Update Profile Picture
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Current/Preview Image */}
            <div className="flex justify-center">
              <Avatar className="h-32 w-32 border-4 border-emerald-200">
                <AvatarImage src={selectedImage || currentImage} />
                <AvatarFallback className="bg-gradient-primary text-white text-4xl font-bold">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Upload Options */}
            <div className="space-y-4">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full gradient-primary text-white hover:opacity-90 transition-all duration-200 hover-lift"
                disabled={isUploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                Choose New Picture
              </Button>

              {selectedImage && (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    {isUploading ? (
                      <div className="flex items-center">
                        <div className="spinner mr-2"></div>
                        Uploading...
                      </div>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Save Picture
                      </>
                    )}
                  </Button>
                  <Button onClick={() => setSelectedImage(null)} variant="outline" disabled={isUploading}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {currentImage && !selectedImage && (
                <Button
                  onClick={handleRemove}
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove Current Picture
                </Button>
              )}
            </div>

            <div className="text-xs text-gray-500 text-center">Supported formats: JPG, PNG, GIF (max 5MB)</div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
