interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private enabled: boolean;

  constructor() {
    this.enabled = typeof window !== 'undefined' && 'performance' in window;
    
    if (this.enabled) {
      this.initializeObserver();
    }
  }

  private initializeObserver() {
    // Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('LCP', lastEntry.startTime, 'ms');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          this.recordMetric('FID', entry.processingStart - entry.startTime, 'ms');
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        this.recordMetric('CLS', clsValue, 'score');
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          this.recordMetric('TTFB', navigation.responseStart - navigation.fetchStart, 'ms');
          this.recordMetric('DOM Content Loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart, 'ms');
          this.recordMetric('Load Complete', navigation.loadEventEnd - navigation.fetchStart, 'ms');
        }
      }, 0);
    });
  }

  private recordMetric(name: string, value: number, unit: string) {
    const metric: PerformanceMetric = {
      name,
      value: Math.round(value * 100) / 100,
      unit,
      timestamp: Date.now(),
    };

    this.metrics.push(metric);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${name} = ${metric.value}${unit}`);
    }
  }

  // Manual performance tracking
  markStart(name: string): void {
    if (this.enabled) {
      performance.mark(`${name}-start`);
    }
  }

  markEnd(name: string): number {
    if (this.enabled) {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name, 'measure')[0];
      const duration = measure.duration;
      
      this.recordMetric(name, duration, 'ms');
      
      // Clean up marks and measures
      performance.clearMarks(`${name}-start`);
      performance.clearMarks(`${name}-end`);
      performance.clearMeasures(name);
      
      return duration;
    }
    return 0;
  }

  // Resource timing analysis
  analyzeResources(): void {
    if (!this.enabled) return;

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    resources.forEach(resource => {
      const duration = resource.responseEnd - resource.startTime;
      const type = this.getResourceType(resource.name);
      
      this.recordMetric(`${type} Load Time`, duration, 'ms');
    });
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'JavaScript';
    if (url.includes('.css')) return 'CSS';
    if (url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)) return 'Image';
    if (url.includes('.woff') || url.includes('.ttf')) return 'Font';
    return 'Other';
  }

  // Memory usage (if available)
  getMemoryUsage(): Record<string, number> | null {
    if (this.enabled && 'memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      };
    }
    return null;
  }

  // Get all metrics
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  // Clear metrics
  clearMetrics(): void {
    this.metrics = [];
  }

  // Export metrics for analytics
  exportMetrics(): string {
    return JSON.stringify(this.metrics, null, 2);
  }
}

export const performanceMonitor = new PerformanceMonitor();