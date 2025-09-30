import { useParams, Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Phone, MessageCircle } from 'lucide-react';

const ServiceDetailContent = () => {
  const { serviceId } = useParams();
  const { t } = useLanguage();

  // Service details based on Flowcrete official website
  const serviceDetails: Record<string, any> = {
    'food-industry': {
      title: 'Industria Alimentaria - EpoxyClean M²',
      subtitle: 'Sistemas de poliuretano-cemento con BioShield™ para máxima higiene',
      heroImage: '/lovable-uploads/7d37393f-2fae-4f03-9555-2b30aa15fccb.png',
      description: 'Los sistemas EpoxyClean M² han sido específicamente diseñados para proporcionar pavimentos higiénicos y duraderos en entornos de procesamiento de alimentos. Incorpora la tecnología antimicrobiana BioShield™, que inhibe el crecimiento de hasta el 99.9% de las bacterias.',
      features: [
        {
          title: 'Certificación HACCP Internacional',
          desc: 'Cumple con los más altos estándares de seguridad alimentaria y normativa FDA'
        },
        {
          title: 'Tecnología BioShield™',
          desc: 'Protección antimicrobiana integrada que cumple con ISO 22196'
        },
        {
          title: 'Resistencia Superior',
          desc: 'Excelente resistencia química, mecánica y térmica hasta 120°C'
        },
        {
          title: 'Fácil Limpieza',
          desc: 'Superficie no porosa ideal para limpieza y desinfección frecuente'
        }
      ],
      systems: [
        {
          name: 'EpoxyClean SL (2-4 mm)',
          desc: 'Sistema autonivelante de capa fina para zonas de procesamiento ligero'
        },
        {
          name: 'EpoxyClean MF/HD (4-6 mm)',
          desc: 'Capas medias para zonas de producción y envasado'
        },
        {
          name: 'EpoxyClean HF/RT (6-9 mm)',
          desc: 'Sistemas de alto espesor para tráfico intenso y cargas pesadas'
        },
        {
          name: 'EpoxyClean Mortar (9+ mm)',
          desc: 'Máxima resistencia para zonas de procesamiento extremo'
        }
      ],
      applications: [
        'Procesamiento de carne y aves',
        'Industria láctea y quesería',
        'Procesamiento de pescado',
        'Panaderías y confitería',
        'Cervecerías y bodegas',
        'Cocinas comerciales',
        'Industria farmacéutica'
      ]
    },
    'industrial': {
      title: 'Pavimentos Industriales - EpoxySpeed M²',
      subtitle: 'Sistemas MMA de curado rápido para máxima productividad',
      heroImage: '/lovable-uploads/7d37393f-2fae-4f03-9555-2b30aa15fccb.png',
      description: 'Los sistemas EpoxySpeed M² utilizan tecnología de metacrilato de metilo (MMA) que permite un curado ultrarrápido y aplicación en condiciones extremas. Ideal cuando el tiempo de inactividad debe minimizarse.',
      features: [
        {
          title: 'Curado Ultrarrápido',
          desc: 'Listo para tráfico en 2-4 horas, minimizando el tiempo de inactividad'
        },
        {
          title: 'Instalación en Frío',
          desc: 'Aplicable desde -30°C hasta +40°C, ideal para cámaras frigoríficas'
        },
        {
          title: 'Alta Resistencia',
          desc: 'Soporta tráfico intenso de carretillas y vehículos pesados'
        },
        {
          title: 'Versatilidad',
          desc: 'Compatible con múltiples sustratos: hormigón, cerámica, metal, asfalto'
        }
      ],
      systems: [
        {
          name: 'EpoxySpeed 101/108 Primer',
          desc: 'Imprimaciones para diferentes tipos de sustrato y condiciones de humedad'
        },
        {
          name: 'EpoxySpeed 205 Standard',
          desc: 'Sistema estándar para zonas de tráfico medio-alto'
        },
        {
          name: 'EpoxySpeed 215/216 Flexible',
          desc: 'Versión flexible para puentes térmicos y zonas con movimiento'
        },
        {
          name: 'EpoxySpeed 301/304 Seal',
          desc: 'Sellados finales resistentes a químicos y abrasión'
        }
      ],
      applications: [
        'Naves industriales y almacenes',
        'Centros logísticos y distribución',
        'Cámaras frigoríficas',
        'Talleres mecánicos',
        'Plantas de producción',
        'Zonas de carga y descarga',
        'Supermercados (montaje nocturno)'
      ]
    },
    'parking-decks': {
      title: 'Parkings y Cubiertas - EpoxyDeck M²',
      subtitle: 'Sistemas de impermeabilización para parkings y cubiertas transitables',
      heroImage: '/lovable-uploads/7d37393f-2fae-4f03-9555-2b30aa15fccb.png',
      description: 'EpoxyDeck M² ofrece soluciones completas para la protección e impermeabilización de parkings de múltiples plantas y cubiertas transitables, combinando durabilidad con estética.',
      features: [
        {
          title: 'Impermeabilización Total',
          desc: 'Protección completa contra infiltración de agua y sales de deshielo'
        },
        {
          title: 'Resistencia a Aceites',
          desc: 'Excelente resistencia a derrames de combustibles y aceites de motor'
        },
        {
          title: 'Antideslizante',
          desc: 'Acabado texturizado para seguridad en condiciones húmedas'
        },
        {
          title: 'Durabilidad',
          desc: 'Resistente a tráfico vehicular intenso y condiciones climáticas extremas'
        }
      ],
      systems: [
        {
          name: 'EpoxyDeck Standard',
          desc: 'Sistema estándar para parkings cubiertos y descubiertos'
        },
        {
          name: 'EpoxyDeck Rapide',
          desc: 'Versión de curado rápido para minimizar cierres'
        },
        {
          name: 'EpoxyDeck Comfort',
          desc: 'Con propiedades de aislamiento acústico'
        },
        {
          name: 'EpoxyDeck ED',
          desc: 'Sistema de impermeabilización para cubiertas transitables'
        }
      ],
      applications: [
        'Parkings de varias plantas',
        'Parkings subterráneos',
        'Rampas y accesos',
        'Cubiertas transitables',
        'Balcones y terrazas',
        'Puentes peatonales',
        'Zonas de servicio'
      ]
    },
    'decorative': {
      title: 'Pavimentos Decorativos',
      subtitle: 'Acabados exclusivos con efectos únicos y diseños personalizados',
      heroImage: '/lovable-uploads/7d37393f-2fae-4f03-9555-2b30aa15fccb.png',
      description: 'Nuestros sistemas decorativos transforman el suelo en una verdadera obra de arte, combinando estética excepcional con las propiedades técnicas de los sistemas de resina.',
      features: [
        {
          title: 'Efectos Metálicos',
          desc: 'Acabados tipo "metallic" con efectos tridimensionales únicos'
        },
        {
          title: 'Diseño Personalizado',
          desc: 'Colores ilimitados, logotipos integrados y patrones exclusivos'
        },
        {
          title: 'Terrazzo Seamless',
          desc: 'Mondéco terrazzo sin juntas con agregados de cuarzo o mármol'
        },
        {
          title: 'Durabilidad Decorativa',
          desc: 'Belleza que perdura sin sacrificar resistencia'
        }
      ],
      systems: [
        {
          name: 'EpoxyDesign Metallic',
          desc: 'Efectos metálicos translúcidos con acabado tipo mármol'
        },
        {
          name: 'EpoxyDesign Terrazzo',
          desc: 'Terrazzo seamless con agregados naturales de colores'
        },
        {
          name: 'EpoxyDesign 2700',
          desc: 'Sistemas con cuarzo coloreado y piedra natural'
        },
        {
          name: 'EpoxyDesign 3D',
          desc: 'Suelos con efecto tridimensional y profundidad visual'
        }
      ],
      applications: [
        'Showrooms y concesionarios',
        'Tiendas retail y boutiques',
        'Hoteles y restaurantes',
        'Oficinas corporativas',
        'Espacios comerciales',
        'Viviendas residenciales',
        'Espacios culturales y museos'
      ]
    },
    'specialized': {
      title: 'Sistemas Especializados',
      subtitle: 'Pavimentos ESD, conductivos y químico-resistentes',
      heroImage: '/lovable-uploads/7d37393f-2fae-4f03-9555-2b30aa15fccb.png',
      description: 'Sistemas técnicos avanzados para industrias con requisitos específicos de control electrostático, resistencia química extrema o ambientes controlados.',
      features: [
        {
          title: 'Control Electrostático',
          desc: 'Pavimentos ESD certificados según ISO 61340, DIN EN 61340 y ASTM'
        },
        {
          title: 'Resistencia Química Extrema',
          desc: 'Sistemas vinil-éster para ambientes altamente corrosivos'
        },
        {
          title: 'Salas Blancas',
          desc: 'Acabados sin juntas para ambientes controlados ISO 14644'
        },
        {
          title: 'Certificaciones',
          desc: 'Cumplimiento con normativas internacionales más exigentes'
        }
      ],
      systems: [
        {
          name: 'EpoxyClean ESD',
          desc: 'Sistema antiestático con resistencia 10⁴-10⁶ Ω para industria electrónica'
        },
        {
          name: 'EpoxyChem VE',
          desc: 'Máxima resistencia química para plantas químicas y petroquímicas'
        },
        {
          name: 'Sistemas Conductivos',
          desc: 'Pavimentos con conductividad controlada para zonas ATEX'
        },
        {
          name: 'Cleanroom Systems',
          desc: 'Acabados especiales para salas blancas farmacéuticas'
        }
      ],
      applications: [
        'Fabricación de electrónica',
        'Salas blancas farmacéuticas',
        'Plantas químicas',
        'Refinerías petroquímicas',
        'Laboratorios',
        'Salas de servidores',
        'Industria aeroespacial'
      ]
    },
    'repairs': {
      title: 'Reparaciones y Mantenimiento',
      subtitle: 'Soluciones de restauración e impermeabilización',
      heroImage: '/lovable-uploads/7d37393f-2fae-4f03-9555-2b30aa15fccb.png',
      description: 'Servicios completos de reparación, restauración y mantenimiento para prolongar la vida útil de sus pavimentos existentes o preparar nuevos sustratos.',
      features: [
        {
          title: 'Reparación de Grietas',
          desc: 'Sellado profesional con resinas epoxy y poliuretano'
        },
        {
          title: 'Autonivelado',
          desc: 'Sistemas Isocrete para nivelar suelos irregulares'
        },
        {
          title: 'Impermeabilización',
          desc: 'Membranas anti-humedad DPM para sustratos húmedos'
        },
        {
          title: 'Restauración',
          desc: 'Renovación completa de pavimentos deteriorados'
        }
      ],
      systems: [
        {
          name: 'EpoxyLevel Screeds',
          desc: 'Morteros autonivelantes de 10-80mm para regularización'
        },
        {
          name: 'EpoxyPro Seal DPM',
          desc: 'Membrana impermeabilizante contra humedad ascendente'
        },
        {
          name: 'EpoxySpeed 208 Cove Mix',
          desc: 'Mortero gel para reparaciones rápidas y juntas'
        },
        {
          name: 'EpoxyPro Primers',
          desc: 'Imprimaciones para todo tipo de sustratos'
        }
      ],
      applications: [
        'Reparación de pavimentos industriales',
        'Nivelación de soleras',
        'Tratamiento de humedad',
        'Sellado de juntas',
        'Renovación de superficies',
        'Impermeabilización de sótanos',
        'Mantenimiento preventivo'
      ]
    }
  };

  const service = serviceDetails[serviceId || ''];

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Servicio no encontrado</h1>
          <Link to="/#services">
            <Button>Volver a Servicios</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <Link to="/#services">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Servicios
            </Button>
          </Link>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {service.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-foreground leading-relaxed mb-12">
              {service.description}
            </p>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {service.features.map((feature: any, index: number) => (
                <Card key={index} className="bg-gradient-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Systems */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Sistemas Disponibles
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.systems.map((system: any, index: number) => (
                  <Card key={index} className="bg-card border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {system.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {system.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Aplicaciones Típicas
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.applications.map((app: string, index: number) => (
                  <div key={index} className="flex items-center p-4 bg-card rounded-lg border border-border/50">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground">{app}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  ¿Interesado en este servicio?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Contacta con nuestros expertos para una consulta personalizada y presupuesto sin compromiso
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <a href="tel:+34622313855">
                      <Phone className="w-5 h-5 mr-2" />
                      Llamar ahora
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="https://wa.me/34622313855" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const ServiceDetail = () => {
  return (
    <LanguageProvider>
      <ServiceDetailContent />
    </LanguageProvider>
  );
};

export default ServiceDetail;

