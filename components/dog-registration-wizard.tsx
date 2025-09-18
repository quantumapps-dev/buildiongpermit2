"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, User } from "lucide-react"

export function DogRegistrationWizard() {
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerAddress: "",
    dogName: "",
    dogBreed: "",
    dogAge: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold text-foreground">Registration Submitted Successfully!</h2>
            <p className="text-muted-foreground">Your dog registration application has been submitted.</p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  ownerName: "",
                  ownerAddress: "",
                  dogName: "",
                  dogBreed: "",
                  dogAge: "",
                })
              }}
              variant="outline"
            >
              Submit Another Registration
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Dog Registration Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Owner Information</h3>

              <div className="space-y-2">
                <Label htmlFor="ownerName">Full Name *</Label>
                <Input
                  id="ownerName"
                  placeholder="Enter your full name"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange("ownerName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerAddress">Residential Address *</Label>
                <Textarea
                  id="ownerAddress"
                  placeholder="Enter your complete residential address"
                  value={formData.ownerAddress}
                  onChange={(e) => handleInputChange("ownerAddress", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dog Information</h3>

              <div className="space-y-2">
                <Label htmlFor="dogName">Dog's Name *</Label>
                <Input
                  id="dogName"
                  placeholder="Enter your dog's name"
                  value={formData.dogName}
                  onChange={(e) => handleInputChange("dogName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dogBreed">Breed *</Label>
                <Input
                  id="dogBreed"
                  placeholder="e.g., Golden Retriever, Mixed Breed"
                  value={formData.dogBreed}
                  onChange={(e) => handleInputChange("dogBreed", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dogAge">Age (in years) *</Label>
                <Input
                  id="dogAge"
                  type="number"
                  min="0"
                  max="30"
                  placeholder="Enter age in years"
                  value={formData.dogAge}
                  onChange={(e) => handleInputChange("dogAge", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">
                Submit Registration
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
