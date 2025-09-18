"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, User } from "lucide-react"
import { useTracking } from "@/hooks/use-tracking"

export function DogRegistrationWizard() {
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerAddress: "",
    dogName: "",
    dogBreed: "",
    dogAge: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formStarted, setFormStarted] = useState(false)
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set())

  const { trackFormInteraction, trackButtonClick, trackError } = useTracking()

  // Track form start when user first interacts
  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true)
      trackFormInteraction("start", undefined, {
        form_name: "dog_registration",
        total_fields: 5,
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    handleFormStart()

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (value.trim() && !completedFields.has(field)) {
      setCompletedFields((prev) => new Set([...prev, field]))
      trackFormInteraction("field_complete", field, {
        field_value_length: value.length,
        form_completion_percentage: Math.round(((completedFields.size + 1) / 5) * 100),
      })
    }
  }

  const handleInputFocus = (field: string) => {
    handleFormStart()
    trackFormInteraction("field_focus", field)
  }

  const validateForm = () => {
    const errors: string[] = []

    if (!formData.ownerName || formData.ownerName.length < 2) {
      errors.push("Owner name must be at least 2 characters")
    }
    if (!formData.ownerAddress.trim()) {
      errors.push("Owner address is required")
    }
    if (!formData.dogName.trim()) {
      errors.push("Dog name is required")
    }
    if (!formData.dogBreed.trim()) {
      errors.push("Dog breed is required")
    }
    if (!formData.dogAge || Number.parseInt(formData.dogAge) < 0) {
      errors.push("Valid dog age is required")
    }

    if (errors.length > 0) {
      trackFormInteraction("validation_error", undefined, {
        error_count: errors.length,
        errors: errors,
      })
    }

    return errors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    trackFormInteraction("submit_attempt", undefined, {
      form_completion_percentage: Math.round((completedFields.size / 5) * 100),
      completed_fields: Array.from(completedFields),
    })

    const errors = validateForm()

    if (errors.length > 0) {
      trackError("Form validation failed", "dog_registration_form")
      return
    }

    console.log("Form submitted:", formData)

    trackFormInteraction("submit_success", undefined, {
      form_data: {
        owner_name_length: formData.ownerName.length,
        dog_breed: formData.dogBreed,
        dog_age: formData.dogAge,
      },
      time_to_complete: Date.now(), // In real app, track actual time
    })

    setIsSubmitted(true)
  }

  const handleNewRegistration = () => {
    trackButtonClick("start_new_registration")

    setIsSubmitted(false)
    setFormStarted(false)
    setCompletedFields(new Set())
    setFormData({
      ownerName: "",
      ownerAddress: "",
      dogName: "",
      dogBreed: "",
      dogAge: "",
    })
  }

  useEffect(() => {
    return () => {
      if (formStarted && !isSubmitted && completedFields.size > 0) {
        trackFormInteraction("abandon", undefined, {
          completed_fields: Array.from(completedFields),
          completion_percentage: Math.round((completedFields.size / 5) * 100),
        })
      }
    }
  }, [formStarted, isSubmitted, completedFields, trackFormInteraction])

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold text-foreground">Registration Submitted Successfully!</h2>
            <p className="text-muted-foreground">Your dog registration application has been submitted.</p>
            <Button onClick={handleNewRegistration} variant="outline">
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
                  onFocus={() => handleInputFocus("ownerName")}
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
                  onFocus={() => handleInputFocus("ownerAddress")}
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
                  onFocus={() => handleInputFocus("dogName")}
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
                  onFocus={() => handleInputFocus("dogBreed")}
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
                  onFocus={() => handleInputFocus("dogAge")}
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
                onClick={() => trackButtonClick("submit_form", { form_name: "dog_registration" })}
              >
                Submit Registration
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
