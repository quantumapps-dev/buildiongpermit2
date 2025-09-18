"use client"

import { DogRegistrationWizard } from "@/components/dog-registration-wizard"
import { usePageTracking } from "@/hooks/use-tracking"

export default function Home() {
  usePageTracking("dog_registration_home", {
    page_type: "form_page",
    form_name: "dog_registration",
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Building Permit Application</h1>
            <p className="text-muted-foreground">Complete your dog registration in a few simple steps</p>
          </div>
          <DogRegistrationWizard />
        </div>
      </div>
    </div>
  )
}
