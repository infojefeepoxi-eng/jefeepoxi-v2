import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import jefeepoxy_logo from '@/assets/jefeepoxy-logo.png';

const Footer = () => {
  const { t } = useLanguage();

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
              alt="Jefeepoxy logo" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Jefeepoxy</span>
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
            <h3 className="text-foreground font-semibold">Servicios</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#services" className="hover:text-primary transition-colors">Pavimentos Industriales</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors">Industria Alimentaria</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors">Pavimentos ESD</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors">Parkings y Talleres</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors">Pavimentos Decorativos</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors">Reparaciones</a></li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Enlaces</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#about" className="hover:text-primary transition-colors">{t('nav.about')}</a></li>
              <li><a href="/#projects" className="hover:text-primary transition-colors">{t('nav.projects')}</a></li>
              <li><a href="/blog" className="hover:text-primary transition-colors">{t('nav.blog')}</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">{t('nav.legal')}</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">{t('nav.privacy')}</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">{t('nav.cookies')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Contacto</h3>
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
                href="mailto:infojefeepoxy@gmail.com" 
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                infojefeepoxy@gmail.com
              </a>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                Valencia, España
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>
              © {currentYear} Jefeepoxy. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span>CIF: B12345678</span>
              <span>Registro Mercantil de Valencia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
