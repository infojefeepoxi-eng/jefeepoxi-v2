import { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import jefeepoxi_logo from '@/assets/jefeepoxi-logo.png';

const Footer = () => {
  const { t, language } = useLanguage();
  const [isMapOpen, setIsMapOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/7d37393f-2fae-4f03-9555-2b30aa15fccb.png" 
              alt="JefeEpoxi logo" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">JefeEpoxi</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {t('footer.company')}
            </p>
            <p className="text-muted-foreground text-sm">
              {t('footer.location')}
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">{language === 'es' ? 'Servicios' : 'Services'}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#services" className="hover:text-primary transition-colors">{language === 'es' ? 'Pavimentos Industriales' : 'Industrial Flooring'}</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors">{language === 'es' ? 'Industria Alimentaria' : 'Food Industry'}</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors">{language === 'es' ? 'Pavimentos ESD' : 'ESD Flooring'}</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors">{language === 'es' ? 'Parkings y Talleres' : 'Parking & Workshops'}</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors">{language === 'es' ? 'Pavimentos Decorativos' : 'Decorative Flooring'}</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors">{language === 'es' ? 'Reparaciones' : 'Repairs'}</a></li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">{language === 'es' ? 'Enlaces' : 'Links'}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#about" className="hover:text-primary transition-colors">{t('nav.about')}</a></li>
              <li><a href="/#projects" className="hover:text-primary transition-colors">{t('nav.projects')}</a></li>
              <li><a href="/blog" className="hover:text-primary transition-colors">{t('nav.blog')}</a></li>
              <li><a href="/legal-notice" className="hover:text-primary transition-colors">{t('nav.legal')}</a></li>
              <li><a href="/privacy-policy" className="hover:text-primary transition-colors">{t('nav.privacy')}</a></li>
              <li><a href="/cookies-policy" className="hover:text-primary transition-colors">{t('nav.cookies')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">{language === 'es' ? 'Contacto' : 'Contact'}</h3>
            <div className="space-y-3">
              <a 
                href="tel:+34622313855" 
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                +34 622 313 855
              </a>
              
              <a 
                href="https://wa.me/34622313855" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
              
              <a 
                href="mailto:infojefeEpoxi@gmail.com" 
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                infojefeEpoxi@gmail.com
              </a>
              
              <button
                onClick={() => setIsMapOpen(true)}
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Valencia, España
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} JefeEpoxi. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="/legal-notice" className="hover:text-primary transition-colors">{t('nav.legal')}</a>
              <a href="/privacy-policy" className="hover:text-primary transition-colors">{t('nav.privacy')}</a>
              <a href="/cookies-policy" className="hover:text-primary transition-colors">{t('nav.cookies')}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Map Dialog */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {language === 'es' ? 'Nuestra Ubicación - Valencia, España' : 'Our Location - Valencia, Spain'}
            </DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195887.67542142313!2d-0.5755543841796875!3d39.469906899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f4cf0efb06f%3A0xb4a351011f7f1d39!2sValencia%2C%20Spain!5e0!3m2!1sen!2s!4v1649876543210!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JefeEpoxi Location - Valencia"
            />
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+34622313855" className="hover:text-primary transition-colors">
                +34 622 313 855
              </a>
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:infojefeEpoxi@gmail.com" className="hover:text-primary transition-colors">
                infojefeEpoxi@gmail.com
              </a>
            </p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Valencia+Spain"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-primary hover:underline"
            >
              {language === 'es' ? 'Abrir en Google Maps →' : 'Open in Google Maps →'}
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
