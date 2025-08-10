/**
 * Senior-level Analytics Helper
 * Centralized tracking for conversion optimization
 */

export const Analytics = {
  // Track events
  track: (eventName, parameters = {}) => {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }
    
    // Facebook Pixel (if implemented)
    if (window.fbq) {
      window.fbq('track', eventName, parameters);
    }
    
    // Custom analytics endpoint (for A/B testing)
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventName,
          parameters,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          referrer: document.referrer
        })
      }).catch(() => {
        // Fail silently
      });
    }
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${eventName}`, parameters);
    }
  },
  
  // Track page views
  pageView: (pageName) => {
    Analytics.track('page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  },
  
  // Track conversions
  conversion: (type, value = null) => {
    Analytics.track('conversion', {
      conversion_type: type,
      value: value,
      currency: 'CZK'
    });
  },
  
  // Track ROI calculations
  roiCalculation: (data) => {
    Analytics.track('roi_calculated', {
      event_category: 'engagement',
      calculator_type: data.type,
      roi_days: data.roiDays,
      yearly_savings: data.yearlySavings,
      project_cost: data.projectCost
    });
  },
  
  // Track lead generation
  leadCapture: (source, data = {}) => {
    Analytics.track('generate_lead', {
      event_category: 'lead_generation',
      lead_source: source,
      ...data
    });
  },
  
  // Track engagement
  engagement: (action, label = null) => {
    Analytics.track('user_engagement', {
      event_category: 'engagement',
      action: action,
      label: label
    });
  },
  
  // A/B Test tracking
  abTest: (testName, variant) => {
    Analytics.track('ab_test_view', {
      test_name: testName,
      variant: variant
    });
    
    // Store in session for consistent experience
    sessionStorage.setItem(`ab_test_${testName}`, variant);
  },
  
  // Get A/B test variant
  getAbTestVariant: (testName, variants = ['A', 'B']) => {
    // Check if already assigned
    const stored = sessionStorage.getItem(`ab_test_${testName}`);
    if (stored) return stored;
    
    // Randomly assign
    const variant = variants[Math.floor(Math.random() * variants.length)];
    Analytics.abTest(testName, variant);
    return variant;
  },
  
  // Performance tracking
  performance: (metric, value) => {
    Analytics.track('performance_metric', {
      metric_name: metric,
      value: value,
      unit: 'ms'
    });
  }
};

// Auto-track page views
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    Analytics.pageView(document.title);
  });
}

export default Analytics;