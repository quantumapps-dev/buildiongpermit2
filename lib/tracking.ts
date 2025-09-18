export interface TrackingEvent {
  event: string
  properties?: Record<string, any>
  timestamp: Date
  sessionId: string
}

export type TrackingEventType =
  | "page_view"
  | "form_start"
  | "form_field_focus"
  | "form_field_complete"
  | "form_validation_error"
  | "form_submit_attempt"
  | "form_submit_success"
  | "form_abandon"
  | "button_click"
  | "error_occurred"

class TrackingService {
  private sessionId: string
  private events: TrackingEvent[] = []

  constructor() {
    this.sessionId = this.generateSessionId()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  track(eventType: TrackingEventType, properties?: Record<string, any>) {
    const event: TrackingEvent = {
      event: eventType,
      properties: {
        ...properties,
        url: typeof window !== "undefined" ? window.location.href : "",
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "",
      },
      timestamp: new Date(),
      sessionId: this.sessionId,
    }

    this.events.push(event)

    // Log to console for development (replace with actual analytics service)
    console.log("[Tracking]", event)

    // In production, you would send this to your analytics service
    // this.sendToAnalytics(event)
  }

  getEvents(): TrackingEvent[] {
    return [...this.events]
  }

  getSessionId(): string {
    return this.sessionId
  }

  // Method to send events to external analytics service
  private async sendToAnalytics(event: TrackingEvent) {
    // Example: Send to Google Analytics, Mixpanel, etc.
    // await fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event)
    // })
  }
}

export const trackingService = new TrackingService()
