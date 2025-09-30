import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Cookie, Eye, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicyContent = () => {
  const { t, language } = useLanguage();

  const privacyContent = {
    es: {
      title: 'Política de Privacidad y Cookies',
      lastUpdated: 'Última actualización: Diciembre 2024',
      sections: [
        {
          title: 'Información General',
          icon: Shield,
          content: 'En JefeEpoxi, nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal cuando visitas nuestro sitio web.'
        },
        {
          title: 'Cookies que Utilizamos',
          icon: Cookie,
          content: 'Utilizamos cookies esenciales para el funcionamiento del sitio web, cookies analíticas para entender cómo los usuarios interactúan con nuestro sitio (Google Analytics), y cookies de marketing para mejorar nuestros servicios publicitarios.'
        },
        {
          title: 'Cómo Usamos tu Información',
          icon: Eye,
          content: 'La información recopilada se utiliza para: mejorar la experiencia del usuario, analizar el tráfico del sitio web, contactar contigo cuando solicites presupuestos, y cumplir con obligaciones legales.'
        },
        {
          title: 'Protección de Datos',
          icon: Lock,
          content: 'Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales. Cumplimos con el RGPD (Reglamento General de Protección de Datos) de la UE.'
        }
      ],
      rights: {
        title: 'Tus Derechos',
        list: [
          'Derecho de acceso a tus datos personales',
          'Derecho de rectificación de datos incorrectos',
          'Derecho de supresión ("derecho al olvido")',
          'Derecho de portabilidad de datos',
          'Derecho de oposición al tratamiento'
        ]
      },
      contact: {
        title: 'Contacto',
        content: 'Para cualquier consulta sobre privacidad o ejercer tus derechos, contacta con nosotros en: info@jefeEpoxi.com o +34 622 313 855'
      }
    },
    en: {
      title: 'Privacy Policy and Cookies',
      lastUpdated: 'Last updated: December 2024',
      sections: [
        {
          title: 'General Information',
          icon: Shield,
          content: 'At JefeEpoxi, we are committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information when you visit our website.'
        },
        {
          title: 'Cookies We Use',
          icon: Cookie,
          content: 'We use essential cookies for website functionality, analytics cookies to understand how users interact with our site (Google Analytics), and marketing cookies to improve our advertising services.'
        },
        {
          title: 'How We Use Your Information',
          icon: Eye,
          content: 'The collected information is used to: improve user experience, analyze website traffic, contact you when you request quotes, and comply with legal obligations.'
        },
        {
          title: 'Data Protection',
          icon: Lock,
          content: 'We implement technical and organizational security measures to protect your personal data. We comply with the EU GDPR (General Data Protection Regulation).'
        }
      ],
      rights: {
        title: 'Your Rights',
        list: [
          'Right of access to your personal data',
          'Right to rectification of incorrect data',
          'Right to erasure ("right to be forgotten")',
          'Right to data portability',
          'Right to object to processing'
        ]
      },
      contact: {
        title: 'Contact',
        content: 'For any privacy inquiries or to exercise your rights, contact us at: info@jefeEpoxi.com or +34 622 313 855'
      }
    }
  };

  const content = privacyContent[language as keyof typeof privacyContent] || privacyContent.es;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4">
            <Link to="/">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
            
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {content.title}
              </h1>
              <p className="text-muted-foreground">
                {content.lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              
              {/* Sections */}
              {content.sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <div key={index} className="bg-card rounded-2xl p-8 border border-border/50">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                          {section.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Rights Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8 border border-border/50">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {content.rights.title}
                </h2>
                <ul className="space-y-3">
                  {content.rights.list.map((right, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{right}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Section */}
              <div className="bg-card rounded-2xl p-8 border border-border/50 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {content.contact.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {content.contact.content}
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const PrivacyPolicy = () => {
  return <PrivacyPolicyContent />;
};

export default PrivacyPolicy;

