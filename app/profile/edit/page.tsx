"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, Zap, CheckCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { ProfilePictureUpload } from "@/components/profile-picture-upload"

const availableSkills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Machine Learning",
  "UI/UX Design",
  "Figma",
  "Adobe Creative Suite",
  "Photography",
  "Cooking",
  "Spanish",
  "French",
  "Guitar",
  "Piano",
  "Data Analysis",
  "Cloud Architecture",
  "DevOps",
]

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"]

export default function EditProfile() {
  const { user, updateProfile } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
    bio: user?.bio || "",
    availability: {
      weekdays: user?.availability?.includes("weekdays") || false,
      weekends: user?.availability?.includes("weekends") || false,
      mornings: user?.availability?.includes("mornings") || false,
      evenings: user?.availability?.includes("evenings") || false,
      flexible: user?.availability?.includes("flexible") || false,
    },
  })

  const [skillsOffered, setSkillsOffered] = useState(user?.skillsOffered || [])
  const [skillsWanted, setSkillsWanted] = useState(user?.skillsWanted || [])
  const [newSkill, setNewSkill] = useState("")
  const [newSkillLevel, setNewSkillLevel] = useState("Beginner")
  const [newSkillType, setNewSkillType] = useState<"offer" | "want">("offer")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAvailabilityChange = (key: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [key]: checked,
      },
    }))
  }

  const addSkill = () => {
    if (!newSkill) {
      toast({
        title: "Please select a skill",
        description: "Choose a skill from the dropdown menu.",
        variant: "destructive",
        duration: 2000,
      })
      return
    }

    if (newSkillType === "offer") {
      const exists = skillsOffered.some((skill) => skill.name === newSkill)
      if (exists) {
        toast({
          title: "Skill already added",
          description: "This skill is already in your offered skills list.",
          variant: "destructive",
          duration: 2000,
        })
        return
      }
      setSkillsOffered((prev) => [...prev, { name: newSkill, level: newSkillLevel }])
    } else {
      if (skillsWanted.includes(newSkill)) {
        toast({
          title: "Skill already added",
          description: "This skill is already in your wanted skills list.",
          variant: "destructive",
          duration: 2000,
        })
        return
      }
      setSkillsWanted((prev) => [...prev, newSkill])
    }

    toast({
      title: "Skill added! ✨",
      description: `${newSkill} has been added to your ${newSkillType === "offer" ? "offered" : "wanted"} skills.`,
      duration: 2000,
    })

    setNewSkill("")
    setNewSkillLevel("Beginner")
  }

  const removeSkill = (skillName: string, type: "offer" | "want") => {
    if (type === "offer") {
      setSkillsOffered((prev) => prev.filter((skill) => skill.name !== skillName))
    } else {
      setSkillsWanted((prev) => prev.filter((skill) => skill !== skillName))
    }

    toast({
      title: "Skill removed",
      description: `${skillName} has been removed from your skills.`,
      duration: 2000,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const availability = Object.entries(formData.availability)
      .filter(([_, value]) => value)
      .map(([key, _]) => key)

    const updatedData = {
      ...formData,
      availability,
      skillsOffered,
      skillsWanted,
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      await updateProfile(updatedData)

      toast({
        title: "Profile updated successfully! 🎉",
        description: "Your changes have been saved and are now live.",
        duration: 3000,
      })

      router.push("/profile")
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
                Edit Profile
              </h1>
              <p className="text-xl text-gray-600 mt-2">Manage your profile information and skills</p>
            </div>
            <div className="space-x-3">
              <Button variant="outline" onClick={() => router.back()} className="px-6">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-6 gradient-primary text-white hover:opacity-90 transition-all duration-200 hover-lift"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="spinner mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Information */}
            <Card className="border-0 shadow-xl hover-lift animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center space-y-4">
                  <ProfilePictureUpload
                    currentImage={user?.profileImage}
                    userName={formData.name}
                    onImageUpdate={(imageUrl) => {
                      // Update the user's profile image
                      updateProfile({ profileImage: imageUrl })
                    }}
                  />
                  <p className="text-sm text-gray-500">Click the camera icon to update your picture</p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-12 border-2 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-semibold">
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="h-12 border-2 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-semibold">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell others about yourself and your interests..."
                    rows={4}
                    className="border-2 focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="border-0 shadow-xl hover-lift animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <span>When are you available?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {Object.entries(formData.availability).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors"
                    >
                      <Switch
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => handleAvailabilityChange(key, checked)}
                        className="data-[state=checked]:bg-emerald-500"
                      />
                      <Label htmlFor={key} className="capitalize font-medium cursor-pointer">
                        {key}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Management */}
            <Card className="border-0 shadow-xl hover-lift animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Plus className="h-5 w-5 text-amber-600" />
                  </div>
                  <span>Skills Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Add New Skill */}
                <div className="space-y-4 p-6 bg-gradient-to-r from-emerald-50 to-purple-50 rounded-xl border border-emerald-200">
                  <h3 className="font-semibold text-lg flex items-center">
                    <Plus className="mr-2 h-5 w-5 text-emerald-600" />
                    Add New Skill
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Select value={newSkill} onValueChange={setNewSkill}>
                      <SelectTrigger className="h-12 border-2 focus:border-emerald-500">
                        <SelectValue placeholder="Select skill" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSkills.map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={newSkillLevel} onValueChange={setNewSkillLevel}>
                      <SelectTrigger className="h-12 border-2 focus:border-purple-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="flex items-center space-x-4 p-3 bg-white rounded-lg border">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="can-teach"
                          checked={newSkillType === "offer"}
                          onCheckedChange={(checked) => setNewSkillType(checked ? "offer" : "want")}
                          className="data-[state=checked]:bg-emerald-500"
                        />
                        <Label htmlFor="can-teach" className="text-sm font-medium">
                          Can Teach
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={addSkill}
                      className="h-12 gradient-primary text-white hover:opacity-90 transition-all duration-200 hover-lift"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                </div>

                {/* Current Skills */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg">Current Skills</h3>

                  {/* Skills Offered */}
                  <div className="space-y-3">
                    <h4 className="text-md font-medium text-emerald-700 flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Skills I Can Teach ({skillsOffered.length})
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {skillsOffered.map((skill) => (
                        <Badge
                          key={skill.name}
                          className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 pr-1 py-2 px-3 text-sm transition-colors"
                        >
                          <span className="font-medium">{skill.name}</span>
                          <span className="ml-2 text-xs opacity-75">({skill.level})</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-2 hover:bg-emerald-300 rounded-full"
                            onClick={() => removeSkill(skill.name, "offer")}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                      {skillsOffered.length === 0 && (
                        <p className="text-gray-500 italic">No skills added yet. Add some skills you can teach!</p>
                      )}
                    </div>
                  </div>

                  {/* Skills Wanted */}
                  <div className="space-y-3">
                    <h4 className="text-md font-medium text-purple-700 flex items-center">
                      <Zap className="mr-2 h-4 w-4" />
                      Skills I Want to Learn ({skillsWanted.length})
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {skillsWanted.map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-purple-100 text-purple-800 hover:bg-purple-200 pr-1 py-2 px-3 text-sm transition-colors"
                        >
                          <span className="font-medium">{skill}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-2 hover:bg-purple-300 rounded-full"
                            onClick={() => removeSkill(skill, "want")}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                      {skillsWanted.length === 0 && (
                        <p className="text-gray-500 italic">No skills added yet. Add some skills you want to learn!</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}
