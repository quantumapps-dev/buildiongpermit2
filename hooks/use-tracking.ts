"use client"

import { useCallback, useEffect } from "react"
import { trackingService, type TrackingEventType } from "@/lib/tracking"

export function useTracking() {
  const track = useCallback((eventType: TrackingEventType, properties?: Record<string, any>) => {
    trackingService.track(eventType, properties)
  }, [])

  const trackPageView = useCallback(
    (pageName: string, additionalProperties?: Record<string, any>) => {
      track("page_view", {
        page_name: pageName,
        ...additionalProperties,
      })
    },
    [track],
  )

  const trackFormInteraction = useCallback(
    (
      action:
        | "start"
        | "field_focus"
        | "field_complete"
        | "validation_error"
        | "submit_attempt"
        | "submit_success"
        | "abandon",
      fieldName?: string,
      additionalProperties?: Record<string, any>,
    ) => {
      const eventMap = {
        start: "form_start",
        field_focus: "form_field_focus",
        field_complete: "form_field_complete",
        validation_error: "form_validation_error",
        submit_attempt: "form_submit_attempt",
        submit_success: "form_submit_success",
        abandon: "form_abandon",
      } as const

      track(eventMap[action] as TrackingEventType, {
        field_name: fieldName,
        ...additionalProperties,
      })
    },
    [track],
  )

  const trackButtonClick = useCallback(
    (buttonName: string, additionalProperties?: Record<string, any>) => {
      track("button_click", {
        button_name: buttonName,
        ...additionalProperties,
      })
    },
    [track],
  )

  const trackError = useCallback(
    (errorMessage: string, errorContext?: string) => {
      track("error_occurred", {
        error_message: errorMessage,
        error_context: errorContext,
      })
    },
    [track],
  )

  return {
    track,
    trackPageView,
    trackFormInteraction,
    trackButtonClick,
    trackError,
    getSessionId: () => trackingService.getSessionId(),
    getEvents: () => trackingService.getEvents(),
  }
}

// Hook for tracking page views automatically
export function usePageTracking(pageName: string, additionalProperties?: Record<string, any>) {
  const { trackPageView } = useTracking()

  useEffect(() => {
    trackPageView(pageName, additionalProperties)
  }, [trackPageView, pageName, additionalProperties])
}
