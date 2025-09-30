import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie, Shield } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getCookieConsent, saveCookieConsent, setupCookieEventListeners } from '@/lib/cookies';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    // Setup cookie event listeners
    setupCookieEventListeners();
    
    // Check if user has already made a choice
    const consentChoice = getCookieConsent();
    if (!consentChoice) {
      // Show banner after a small delay for better UX
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1000);
    }
  }, []);


  const handleAccept = () => {
    saveCookieConsent(true);
    hideBanner();
  };

  const handleReject = () => {
    saveCookieConsent(false);
    hideBanner();
  };

  const hideBanner = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const resetConsent = () => {
    setIsVisible(true);
    setIsAnimating(true);
  };

  // Expose reset function globally for testing/admin purposes
  useEffect(() => {
    (window as any).showCookieBanner = resetConsent;
  }, []);

  if (!isVisible) return null;


  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={hideBanner}
      />
      
      {/* Cookie Banner */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[9999] p-4 transition-all duration-300 ease-out ${
          isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              
              {/* Icon and Content */}
              <div className="flex-1 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('cookies.title')}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t('cookies.message')}
                  </p>
                  
                  {/* Privacy Features */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>{t('cookies.gdprCompliant')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Cookie className="w-3 h-3" />
                      <span>{t('cookies.consentMode')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReject}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 px-6 py-2 text-sm font-medium transition-all duration-200"
                >
                  {t('cookies.reject')}
                </Button>
                
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {t('cookies.accept')}
                </Button>
              </div>

              {/* Close Button */}
              <button
                onClick={hideBanner}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Learn More Link */}
            <div className="mt-4 pt-4 border-t border-gray-200/50">
              <a
                href="/privacy-policy"
                className="text-xs text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
              >
                {t('cookies.learnMore')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
