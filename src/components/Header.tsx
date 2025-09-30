import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link, useLocation } from 'react-router-dom';
import { trackPhoneCall, trackWhatsAppClick, trackLanguageChange } from '@/lib/analytics';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const toggleLanguage = () => {
    const oldLanguage = language;
    const newLanguage = language === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
    trackLanguageChange(newLanguage, oldLanguage);
  };

  const navItems = [
    { key: 'nav.home', href: '/', anchor: '#home' },
    { key: 'nav.services', href: '/', anchor: '#services' },
    { key: 'nav.projects', href: '/', anchor: '#projects' },
    { key: 'nav.about', href: '/', anchor: '#about' },
    { key: 'nav.blog', href: '/blog', anchor: null },
    { key: 'nav.contact', href: '/', anchor: '#contact' },
  ];

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/7d37393f-2fae-4f03-9555-2b30aa15fccb.png" 
              alt="JefeEpoxi logo" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">JefeEpoxi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.anchor && location.pathname === '/' ? item.anchor : item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={(e) => {
                  if (item.anchor && location.pathname === '/') {
                    e.preventDefault();
                    document.querySelector(item.anchor)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-muted-foreground hover:text-primary"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language.toUpperCase()}
            </Button>

            {/* Phone */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => trackPhoneCall('header')}
              asChild
            >
              <a href="tel:+34622313855" className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +34 622 313 855
              </a>
            </Button>

            {/* WhatsApp */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => trackWhatsAppClick('header')}
              asChild
            >
              <a 
                href="https://wa.me/34622313855" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </Button>

            {/* CTA */}
            <Button variant="default" asChild>
              <Link 
                to={location.pathname === '/' ? '#contact' : '/#contact'}
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('nav.quote')}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.anchor && location.pathname === '/' ? item.anchor : item.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 px-2 py-1"
                  onClick={(e) => {
                    if (item.anchor && location.pathname === '/') {
                      e.preventDefault();
                      document.querySelector(item.anchor)?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="flex flex-col space-y-3 mt-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="justify-start text-muted-foreground hover:text-primary"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language.toUpperCase()}
              </Button>

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => trackPhoneCall('mobile_menu')}
                asChild 
                className="justify-start"
              >
                <a href="tel:+34622313855" className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +34 622 313 855
                </a>
              </Button>

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => trackWhatsAppClick('mobile_menu')}
                asChild 
                className="justify-start"
              >
                <a 
                  href="https://wa.me/34622313855" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </Button>

              <Button variant="default" className="w-full" asChild>
                <Link 
                  to={location.pathname === '/' ? '#contact' : '/#contact'}
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  {t('nav.quote')}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;