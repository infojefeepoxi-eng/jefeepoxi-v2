// Cookie Consent Management Utilities
// Provides utilities for managing GDPR-compliant cookie consent

export interface CookieConsentSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

export const COOKIE_CONSENT_KEY = 'cookie-consent';
export const COOKIE_SETTINGS_KEY = 'cookie-settings';

/**
 * Get the current cookie consent status
 */
export const getCookieConsent = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(COOKIE_CONSENT_KEY) || sessionStorage.getItem(COOKIE_CONSENT_KEY);
};

/**
 * Get detailed cookie settings
 */
export const getCookieSettings = (): CookieConsentSettings => {
  if (typeof window === 'undefined') {
    return { essential: true, analytics: false, marketing: false, personalization: false };
  }
  
  const settings = localStorage.getItem(COOKIE_SETTINGS_KEY) || sessionStorage.getItem(COOKIE_SETTINGS_KEY);
  if (!settings) {
    return { essential: true, analytics: false, marketing: false, personalization: false };
  }
  
  try {
    return JSON.parse(settings);
  } catch {
    return { essential: true, analytics: false, marketing: false, personalization: false };
  }
};

/**
 * Save cookie consent and settings
 */
export const saveCookieConsent = (accepted: boolean, customSettings?: Partial<CookieConsentSettings>) => {
  if (typeof window === 'undefined') return;
  
  try {
    const consentValue = accepted ? 'accepted' : 'rejected';
    localStorage.setItem(COOKIE_CONSENT_KEY, consentValue);
    
    const settings: CookieConsentSettings = {
      essential: true, // Always true
      analytics: accepted,
      marketing: accepted,
      personalization: accepted,
      ...customSettings
    };
    
    localStorage.setItem(COOKIE_SETTINGS_KEY, JSON.stringify(settings));
    console.log('🍪 Cookie consent saved successfully');
  } catch (error) {
    console.warn('🍪 LocalStorage full, using sessionStorage as fallback');
    // Fallback to sessionStorage if localStorage is full
    const consentValue = accepted ? 'accepted' : 'rejected';
    sessionStorage.setItem(COOKIE_CONSENT_KEY, consentValue);
    
    const settings: CookieConsentSettings = {
      essential: true,
      analytics: accepted,
      marketing: accepted,
      personalization: accepted,
      ...customSettings
    };
    
    sessionStorage.setItem(COOKIE_SETTINGS_KEY, JSON.stringify(settings));
  }
  
  // Get the final settings and update Google Consent Mode
  const finalSettings = getCookieSettings();
  updateGoogleConsentMode(finalSettings);
  
  // Dispatch custom event for other components to listen
  const consentValue = accepted ? 'accepted' : 'rejected';
  window.dispatchEvent(new CustomEvent('cookieConsentChanged', { 
    detail: { consent: consentValue, settings: finalSettings } 
  }));
};

/**
 * Update Google Consent Mode v2
 */
export const updateGoogleConsentMode = (settings: CookieConsentSettings) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('consent', 'update', {
    ad_storage: settings.marketing ? 'granted' : 'denied',
    analytics_storage: settings.analytics ? 'granted' : 'denied',
    functionality_storage: settings.essential ? 'granted' : 'denied',
    personalization_storage: settings.personalization ? 'granted' : 'denied',
    security_storage: 'granted', // Always granted for security
  });
  
  console.log('🍪 Google Consent Mode updated:', settings);
};

/**
 * Reset cookie consent (for testing or user request)
 */
export const resetCookieConsent = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  localStorage.removeItem(COOKIE_SETTINGS_KEY);
  
  // Reset to default denied state
  if (window.gtag) {
    window.gtag('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted',
    });
  }
  
  window.dispatchEvent(new CustomEvent('cookieConsentReset'));
  console.log('🍪 Cookie consent reset');
};

/**
 * Check if a specific cookie category is allowed
 */
export const isCookieCategoryAllowed = (category: keyof CookieConsentSettings): boolean => {
  const settings = getCookieSettings();
  return settings[category];
};

/**
 * Initialize Google Analytics only if analytics cookies are allowed
 */
export const initializeAnalytics = () => {
  if (!isCookieCategoryAllowed('analytics')) {
    console.log('🍪 Analytics cookies not allowed, skipping GA initialization');
    return;
  }
  
  // GA is already initialized in index.html, just update consent
  const settings = getCookieSettings();
  updateGoogleConsentMode(settings);
  
  // Enable enhanced features after consent
  if (window.gtag && settings.analytics) {
    window.gtag('config', 'G-BQC18G9GBJ', {
      allow_google_signals: true,
      allow_ad_personalization_signals: settings.marketing
    });
  }
};

/**
 * Track event only if analytics is allowed
 */
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (!isCookieCategoryAllowed('analytics') || !window.gtag) {
    console.log('🍪 Analytics tracking blocked due to cookie settings');
    return;
  }
  
  window.gtag('event', eventName, parameters);
};

/**
 * Set up cookie consent event listeners
 */
export const setupCookieEventListeners = () => {
  if (typeof window === 'undefined') return;
  
  // Listen for consent changes
  window.addEventListener('cookieConsentChanged', (event: any) => {
    const { consent, settings } = event.detail;
    console.log('🍪 Cookie consent changed:', consent, settings);
    
    // Reload page if analytics was just enabled to ensure proper tracking
    if (settings.analytics && !getCookieSettings().analytics) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  });
  
  // Listen for consent reset
  window.addEventListener('cookieConsentReset', () => {
    console.log('🍪 Cookie consent was reset');
    // Optionally reload page or show banner again
    setTimeout(() => {
      window.location.reload();
    }, 500);
  });
};

// Export for global access (useful for debugging)
if (typeof window !== 'undefined') {
  (window as any).cookieUtils = {
    getCookieConsent,
    getCookieSettings,
    saveCookieConsent,
    resetCookieConsent,
    isCookieCategoryAllowed,
    trackEvent
  };
}

