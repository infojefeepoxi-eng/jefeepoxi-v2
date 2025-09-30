import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre Nosotros',
    'nav.quote': 'Solicitar Presupuesto',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.legal': 'Aviso Legal',
    'nav.privacy': 'Política de Privacidad',
    'nav.cookies': 'Política de Cookies',
    'nav.faq': 'FAQ',
    
    'hero.title': 'Pavimentos epoxi profesionales en Valencia',
    'hero.subtitle': 'Más de 5 años de experiencia. 30 proyectos entregados en España y Europa.',
    'hero.cta.primary': 'Solicitar presupuesto',
    'hero.cta.secondary': 'Ver proyectos',
    
    'services.title': 'Nuestros Servicios',
    'services.industrial.title': 'Pavimentos Industriales',
    'services.industrial.desc': 'Soluciones para naves y logística',
    'services.food.title': 'Industria Alimentaria',
    'services.food.desc': 'Pavimentos higiénicos certificados',
    'services.esd.title': 'Pavimentos ESD',
    'services.esd.desc': 'Anti-estáticos, cumplimiento ISO/DIN/ASTM',
    'services.parking.title': 'Parkings y Talleres',
    'services.parking.desc': 'Acabados antideslizantes resistentes',
    'services.decorative.title': 'Pavimentos Decorativos',
    'services.decorative.desc': 'Metallic y epoxy designer',
    'services.repair.title': 'Autonivelantes y Reparaciones',
    'services.repair.desc': 'Soluciones de mantenimiento integral',
    
    'projects.title': 'Nuestros Proyectos',
    'projects.filter.all': 'Todos',
    'projects.filter.industrial': 'Industrial',
    'projects.filter.food': 'Alimentario',
    'projects.filter.decorative': 'Decorativo',
    'projects.filter.parking': 'Parking',
    
    'contact.title': 'Contacto',
    'contact.phone': 'Teléfono',
    'contact.whatsapp': 'WhatsApp',
    'contact.coverage': 'Desplazamiento por toda Europa',
    
    'footer.company': 'JefeEpoxi - Pavimentos epoxi profesionales',
    'footer.location': 'Valencia, España',

    // Vlog Section
    'vlog.title': 'Por qué la resina epoxi es superior a otros pavimentos',
    'vlog.subtitle': 'Descubre las ventajas técnicas y estéticas que hacen del epoxi la mejor opción',
    'vlog.cta': 'Solicitar presupuesto',
    'vlog.content.intro': 'En el mundo de los pavimentos industriales y decorativos, la resina epoxi se ha posicionado como la solución más avanzada y versátil del mercado. Su combinación única de propiedades técnicas y estéticas la convierte en la opción preferida por profesionales y propietarios que buscan durabilidad, funcionalidad y belleza.',
    'vlog.content.durability.title': 'Durabilidad Excepcional',
    'vlog.content.durability.text': 'Los pavimentos epoxi ofrecen una resistencia superior al desgaste, impacto y cargas pesadas. Mientras que la cerámica puede agrietarse y el vinilo se deforma, el epoxi mantiene su integridad estructural durante décadas.',
    'vlog.content.chemical.title': 'Resistencia Química Inigualable',
    'vlog.content.chemical.text': 'A diferencia del hormigón tradicional que absorbe líquidos y se mancha, la resina epoxi crea una barrera impermeable que resiste ácidos, bases, aceites y productos químicos industriales.',
    'vlog.content.maintenance.title': 'Mantenimiento Mínimo',
    'vlog.content.maintenance.text': 'Su superficie no porosa facilita la limpieza y desinfección, siendo ideal para industrias alimentarias y farmacéuticas donde la higiene es crucial.',
    'vlog.content.design.title': 'Versatilidad de Diseño',
    'vlog.content.design.text': 'Desde acabados industriales hasta efectos decorativos metalizados, el epoxi ofrece infinitas posibilidades de personalización que otros pavimentos no pueden igualar.',
    'vlog.advantages.title': 'Ventajas Clave del Pavimento Epoxi',
    'vlog.advantages.chemical': 'Alta resistencia química y mecánica',
    'vlog.advantages.waterproof': 'Impermeabilidad total y fácil limpieza',
    'vlog.advantages.design': 'Flexibilidad en diseños y colores personalizados',
    'vlog.advantages.durability': 'Durabilidad superior a largo plazo',
    'vlog.advantages.decorative': 'Soluciones decorativas y efectos únicos',
    'vlog.advantages.versatile': 'Ideal para industria, comercio y residencias',
    
    // Blog Page
    'blog.title': 'Blog y Artículos',
    'blog.subtitle': 'Conocimiento técnico y tendencias en pavimentos epoxi',
    'blog.readMore': 'Leer más',
    'blog.backHome': 'Volver al Inicio',
    'blog.backToBlog': 'Volver al blog',
    'blog.publishedOn': 'Publicado el',
    'blog.readTime': 'min de lectura',
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.about': 'About Us',
    'nav.quote': 'Request Quote',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.legal': 'Legal Notice',
    'nav.privacy': 'Privacy Policy',
    'nav.cookies': 'Cookie Policy',
    'nav.faq': 'FAQ',
    
    'hero.title': 'Professional Epoxy Flooring in Valencia',
    'hero.subtitle': 'Over 5 years of experience. 30 projects delivered in Spain and Europe.',
    'hero.cta.primary': 'Request quote',
    'hero.cta.secondary': 'View projects',
    
    'services.title': 'Our Services',
    'services.industrial.title': 'Industrial Flooring',
    'services.industrial.desc': 'Solutions for warehouses and logistics',
    'services.food.title': 'Food Industry',
    'services.food.desc': 'Certified hygienic flooring',
    'services.esd.title': 'ESD Flooring',
    'services.esd.desc': 'Anti-static, ISO/DIN/ASTM compliance',
    'services.parking.title': 'Parking & Workshops',
    'services.parking.desc': 'Resistant non-slip finishes',
    'services.decorative.title': 'Decorative Flooring',
    'services.decorative.desc': 'Metallic and designer epoxy',
    'services.repair.title': 'Self-leveling & Repairs',
    'services.repair.desc': 'Comprehensive maintenance solutions',
    
    'projects.title': 'Our Projects',
    'projects.filter.all': 'All',
    'projects.filter.industrial': 'Industrial',
    'projects.filter.food': 'Food',
    'projects.filter.decorative': 'Decorative',
    'projects.filter.parking': 'Parking',
    
    'contact.title': 'Contact',
    'contact.phone': 'Phone',
    'contact.whatsapp': 'WhatsApp',
    'contact.coverage': 'Travel throughout Europe',
    
    'footer.company': 'JefeEpoxi - Professional epoxy flooring',
    'footer.location': 'Valencia, Spain',

    // Vlog Section
    'vlog.title': 'Why Epoxy Resin Outperforms Other Floorings',
    'vlog.subtitle': 'Discover the technical and aesthetic advantages that make epoxy the best choice',
    'vlog.cta': 'Request Quote',
    'vlog.content.intro': 'In the world of industrial and decorative flooring, epoxy resin has positioned itself as the most advanced and versatile solution on the market. Its unique combination of technical and aesthetic properties makes it the preferred choice for professionals and owners seeking durability, functionality, and beauty.',
    'vlog.content.durability.title': 'Exceptional Durability',
    'vlog.content.durability.text': 'Epoxy floors offer superior resistance to wear, impact, and heavy loads. While ceramic can crack and vinyl deforms, epoxy maintains its structural integrity for decades.',
    'vlog.content.chemical.title': 'Unmatched Chemical Resistance',
    'vlog.content.chemical.text': 'Unlike traditional concrete that absorbs liquids and stains, epoxy resin creates an impermeable barrier that resists acids, bases, oils, and industrial chemicals.',
    'vlog.content.maintenance.title': 'Minimal Maintenance',
    'vlog.content.maintenance.text': 'Its non-porous surface facilitates cleaning and disinfection, making it ideal for food and pharmaceutical industries where hygiene is crucial.',
    'vlog.content.design.title': 'Design Versatility',
    'vlog.content.design.text': 'From industrial finishes to decorative metallic effects, epoxy offers infinite customization possibilities that other floors cannot match.',
    'vlog.advantages.title': 'Key Advantages of Epoxy Flooring',
    'vlog.advantages.chemical': 'High chemical and mechanical resistance',
    'vlog.advantages.waterproof': 'Complete waterproofing and easy cleaning',
    'vlog.advantages.design': 'Flexibility in custom designs and colors',
    'vlog.advantages.durability': 'Superior long-term durability',
    'vlog.advantages.decorative': 'Decorative solutions and unique effects',
    'vlog.advantages.versatile': 'Ideal for industry, commerce, and residences',
    
    // Blog Page
    'blog.title': 'Blog & Articles',
    'blog.subtitle': 'Technical knowledge and trends in epoxy flooring',
    'blog.readMore': 'Read more',
    'blog.backHome': 'Back to Home',
    'blog.backToBlog': 'Back to blog',
    'blog.publishedOn': 'Published on',
    'blog.readTime': 'min read',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};