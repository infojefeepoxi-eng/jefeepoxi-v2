// JefeEpoxi Business Analytics Events
// Специфічні події для відстеження бізнес-метрик

import { trackEvent } from './cookies';

/**
 * Track quote request (most important conversion)
 */
export const trackQuoteRequest = (source: string = 'contact_form') => {
  trackEvent('quote_request', {
    event_category: 'conversion',
    event_label: source,
    value: 10, // High value for quote requests
    currency: 'EUR'
  });
  
  // Also track as conversion event
  trackEvent('generate_lead', {
    event_category: 'conversion',
    lead_type: 'quote_request',
    source: source
  });
  
  console.log('📊 Quote request tracked:', source);
};

/**
 * Track phone call clicks
 */
export const trackPhoneCall = (location: string = 'header') => {
  trackEvent('phone_call', {
    event_category: 'contact',
    event_label: location,
    value: 8, // High value for phone calls
    contact_method: 'phone'
  });
  
  console.log('📞 Phone call tracked:', location);
};

/**
 * Track WhatsApp clicks
 */
export const trackWhatsAppClick = (location: string = 'header') => {
  trackEvent('whatsapp_contact', {
    event_category: 'contact',
    event_label: location,
    value: 6, // Medium-high value for WhatsApp
    contact_method: 'whatsapp'
  });
  
  console.log('💬 WhatsApp contact tracked:', location);
};

/**
 * Track project gallery views
 */
export const trackProjectView = (projectType: string = 'general') => {
  trackEvent('view_project', {
    event_category: 'engagement',
    event_label: projectType,
    value: 2,
    content_type: 'project_gallery'
  });
  
  console.log('🖼️ Project view tracked:', projectType);
};

/**
 * Track service interest
 */
export const trackServiceInterest = (serviceType: string) => {
  trackEvent('service_interest', {
    event_category: 'engagement',
    event_label: serviceType,
    value: 3,
    content_type: 'service_page'
  });
  
  console.log('🔧 Service interest tracked:', serviceType);
};

/**
 * Track blog article reads
 */
export const trackArticleRead = (articleId: string, readTime: number = 0) => {
  trackEvent('article_read', {
    event_category: 'content',
    event_label: articleId,
    value: 1,
    read_time: readTime,
    content_type: 'blog_article'
  });
  
  console.log('📖 Article read tracked:', articleId);
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formType: string, formData?: any) => {
  trackEvent('form_submit', {
    event_category: 'conversion',
    event_label: formType,
    value: 5,
    form_type: formType
  });
  
  // Track specific form fields if provided
  if (formData) {
    if (formData.surface) {
      trackEvent('form_surface_area', {
        event_category: 'form_data',
        surface_range: categorizeArea(formData.surface)
      });
    }
    
    if (formData.finishType) {
      trackEvent('form_finish_type', {
        event_category: 'form_data',
        finish_type: formData.finishType
      });
    }
  }
  
  console.log('📝 Form submission tracked:', formType);
};

/**
 * Track language changes
 */
export const trackLanguageChange = (newLanguage: string, oldLanguage: string) => {
  trackEvent('language_change', {
    event_category: 'user_preference',
    event_label: `${oldLanguage}_to_${newLanguage}`,
    new_language: newLanguage,
    old_language: oldLanguage
  });
  
  console.log('🌐 Language change tracked:', `${oldLanguage} → ${newLanguage}`);
};

/**
 * Track scroll depth (for engagement)
 */
export const trackScrollDepth = (percentage: number, page: string = 'unknown') => {
  if (percentage >= 90) {
    trackEvent('scroll_depth_90', {
      event_category: 'engagement',
      event_label: page,
      scroll_depth: percentage
    });
    console.log('📜 Deep scroll tracked:', percentage + '%');
  }
};

/**
 * Track time on page (for engagement)
 */
export const trackTimeOnPage = (seconds: number, page: string = 'unknown') => {
  if (seconds > 30) { // Only track meaningful time
    trackEvent('time_on_page', {
      event_category: 'engagement',
      event_label: page,
      value: Math.round(seconds / 10), // Convert to 10-second units
      time_seconds: seconds
    });
    console.log('⏱️ Time on page tracked:', seconds + 's');
  }
};

/**
 * Helper function to categorize area size
 */
const categorizeArea = (area: string): string => {
  const numericArea = parseFloat(area);
  if (isNaN(numericArea)) return 'unknown';
  
  if (numericArea < 50) return 'small_under_50m2';
  if (numericArea < 200) return 'medium_50_200m2';
  if (numericArea < 500) return 'large_200_500m2';
  return 'extra_large_over_500m2';
};

/**
 * Initialize page view tracking with enhanced data
 */
export const trackPageView = (pageName: string, additionalData?: Record<string, any>) => {
  // Standard page view is already tracked by GA
  // This adds enhanced business context
  trackEvent('enhanced_page_view', {
    event_category: 'navigation',
    event_label: pageName,
    page_name: pageName,
    ...additionalData
  });
  
  console.log('📄 Enhanced page view tracked:', pageName);
};

/**
 * Track business-specific conversions for Valencia market
 */
export const trackValenciaSpecific = (action: string, district?: string) => {
  trackEvent('valencia_action', {
    event_category: 'local_business',
    event_label: action,
    value: 4,
    city: 'valencia',
    district: district || 'unknown',
    market: 'spain_east'
  });
  
  console.log('🏛️ Valencia-specific action tracked:', action);
};

// Export all tracking functions for easy import
export const JefeEpoxiAnalytics = {
  trackQuoteRequest,
  trackPhoneCall,
  trackWhatsAppClick,
  trackProjectView,
  trackServiceInterest,
  trackArticleRead,
  trackFormSubmission,
  trackLanguageChange,
  trackScrollDepth,
  trackTimeOnPage,
  trackPageView,
  trackValenciaSpecific
};
