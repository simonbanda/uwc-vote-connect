interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  timestamp: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private enabled: boolean;

  constructor() {
    this.enabled = process.env.NODE_ENV === 'production';
  }

  track(action: string, category: string, label?: string, value?: number) {
    if (!this.enabled) {
      console.log('Analytics (dev):', { action, category, label, value });
      return;
    }

    const event: AnalyticsEvent = {
      action,
      category,
      label,
      value,
      timestamp: Date.now(),
    };

    this.events.push(event);
    
    // In production, you would send this to your analytics service
    this.sendToAnalytics(event);
  }

  private sendToAnalytics(event: AnalyticsEvent) {
    // Placeholder for actual analytics service integration
    // Examples: Google Analytics, Mixpanel, Segment, etc.
    console.log('Sending to analytics:', event);
  }

  // Page view tracking
  pageView(path: string, title?: string) {
    this.track('page_view', 'navigation', path);
  }

  // User interaction tracking
  buttonClick(buttonName: string, location?: string) {
    this.track('click', 'button', `${buttonName}${location ? ` - ${location}` : ''}`);
  }

  // Error tracking
  error(errorMessage: string, errorType?: string) {
    this.track('error', 'application', `${errorType || 'unknown'}: ${errorMessage}`);
  }

  // Performance tracking
  performance(metric: string, value: number, unit: string) {
    this.track('performance', 'timing', `${metric} (${unit})`, value);
  }

  // Get analytics data (for debugging)
  getEvents() {
    return this.events;
  }

  // Clear analytics data
  clearEvents() {
    this.events = [];
  }
}

export const analytics = new Analytics();