import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Factory, Utensils, Zap, Car, Sparkles, Wrench, ArrowRight, Clock, Droplets, Crown, Package } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';

const Services = () => {
  const { t, language } = useLanguage();
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const services = [
    {
      id: 'business-industrial',
      icon: Factory,
      title: {
        es: 'Pisos para Negocio y Producción',
        en: 'Business and Production Floors'
      },
      subtitle: {
        es: 'Para: Almacenes, fábricas, centros logísticos, naves de producción',
        en: 'For: Warehouses, factories, logistics centers, production facilities'
      },
      description: {
        es: 'Sistemas certificados Epoxi M² para industria y logística con máximo rendimiento',
        en: 'Certified Epoxi M² systems for industry and logistics with maximum performance'
      },
      features: {
        es: ['Pisos resistentes para cargas pesadas (montacargas, camiones)', 'Sistemas de montaje rápido con mínima parada de producción', 'Pisos químico-resistentes para fábricas y químicas', 'Superficies autonivelantes lisas para oficinas y salas de exposición', 'Pisos para locales fríos y almacenes', 'Montaje rápido (8-12h)'],
        en: ['Heavy-duty floors for heavy loads (forklifts, trucks)', 'Quick installation systems with minimal production downtime', 'Chemical-resistant floors for factories and chemical plants', 'Smooth self-leveling surfaces for offices and exhibition halls', 'Floors for cold rooms and warehouses', 'Quick installation (8-12h)']
      }
    },
    {
      id: 'food-production',
      icon: Utensils,
      title: {
        es: 'Pisos para Producción Alimentaria',
        en: 'Food Production Floors'
      },
      subtitle: {
        es: 'Para: Mataderos, lácteos, panaderías, restaurantes, cocinas',
        en: 'For: Slaughterhouses, dairies, bakeries, restaurants, kitchens'
      },
      description: {
        es: 'Sistemas EpoxiLimpio M² con tecnología Polygiene® para máxima higiene alimentaria',
        en: 'EpoxiLimpio M² systems with Polygiene® technology for maximum food hygiene'
      },
      features: {
        es: ['Pisos higiénicos con recubrimiento antibacterial', 'Recubrimientos para cámaras frigoríficas y congeladores', 'Pisos para talleres de procesamiento de carne, pescado, leche', 'Superficies fáciles de limpiar para cocinas y producciones alimentarias', 'Recubrimientos con certificados HACCP y FDA', 'Tecnología Polygiene® antimicrobiana'],
        en: ['Hygienic floors with antibacterial coating', 'Coatings for cold storage and freezers', 'Floors for meat, fish, dairy processing workshops', 'Easy-to-clean surfaces for kitchens and food production', 'HACCP and FDA certified coatings', 'Polygiene® antimicrobial technology']
      }
    },
    {
      id: 'decorative-floors',
      icon: Sparkles,
      title: {
        es: 'Pisos Decorativos Hermosos',
        en: 'Beautiful Decorative Floors'
      },
      subtitle: {
        es: 'Para: Tiendas, showrooms, hoteles, restaurantes, oficinas, viviendas',
        en: 'For: Stores, showrooms, hotels, restaurants, offices, homes'
      },
      description: {
        es: 'Acabados exclusivos con efectos metálicos, 3D y diseños personalizados',
        en: 'Exclusive finishes with metallic effects, 3D and custom designs'
      },
      features: {
        es: ['Pisos decorativos brillantes con efecto mármol', 'Recubrimientos coloridos con agregados de cuarzo (como terrazo)', 'Recubrimientos transparentes protectores para conservar la belleza', 'Recubrimientos marinos resistentes para yates y objetos costeros', 'Pisos de diseño para espacios VIP', 'Diseños personalizados únicos'],
        en: ['Bright decorative floors with marble effect', 'Colorful coatings with quartz aggregates (like terrazzo)', 'Transparent protective coatings to preserve beauty', 'Marine-resistant coatings for yachts and coastal objects', 'Designer floors for VIP spaces', 'Unique custom designs']
      }
    },
    {
      id: 'garages-parking',
      icon: Car,
      title: {
        es: 'Pisos para Garajes y Parkings',
        en: 'Garage and Parking Floors'
      },
      subtitle: {
        es: 'Para: Garajes residenciales, parkings de varios pisos, talleres, lavaderos',
        en: 'For: Residential garages, multi-level parking, workshops, car washes'
      },
      description: {
        es: 'Sistemas EpoxiCubierta M² para parkings, cubiertas transitables e impermeabilización',
        en: 'EpoxiCubierta M² systems for parkings, walkable roofs and waterproofing'
      },
      features: {
        es: ['Recubrimientos resistentes a aceites y gasolina para garajes', 'Impermeabilización de parkings en cubiertas', 'Sistemas de montaje rápido para parkings (con mínimo cierre)', 'Recubrimientos antideslizantes para rampas de acceso', 'Pisos resistentes para talleres y autoservicios', 'Garantía vitalicia impermeabilización'],
        en: ['Oil and gasoline resistant coatings for garages', 'Waterproofing for roof parkings', 'Quick installation systems for parkings (with minimal closure)', 'Non-slip coatings for access ramps', 'Durable floors for workshops and car services', 'Lifetime waterproofing guarantee']
      }
    },
    {
      id: 'technical-specialized',
      icon: Zap,
      title: {
        es: 'Pisos Técnicos Especiales',
        en: 'Special Technical Floors'
      },
      subtitle: {
        es: 'Para: Laboratorios, fábricas electrónicas, hospitales, producciones high-tech',
        en: 'For: Laboratories, electronic factories, hospitals, high-tech production'
      },
      description: {
        es: 'Pavimentos ESD, conductivos y químico-resistentes para industrias exigentes',
        en: 'ESD, conductive and chemical-resistant floors for demanding industries'
      },
      features: {
        es: ['Pisos antiestáticos para electrónica (protección contra estática)', 'Recubrimientos químico-resistentes para laboratorios', 'Pisos para altas temperaturas (hornos, calderas)', 'Recubrimientos antideslizantes para seguridad en producción', 'Soluciones especializadas personalizadas', 'Certificación ISO 61340 / IEC'],
        en: ['Anti-static floors for electronics (static protection)', 'Chemical-resistant coatings for laboratories', 'High-temperature floors (ovens, boilers)', 'Non-slip coatings for production safety', 'Custom specialized solutions', 'ISO 61340 / IEC certification']
      }
    },
    {
      id: 'fast-urgent',
      icon: Clock,
      title: {
        es: 'Trabajos Rápidos y Urgentes',
        en: 'Fast and Urgent Works'
      },
      subtitle: {
        es: 'Para: Objetos con tiempo limitado, situaciones de emergencia, proyectos urgentes',
        en: 'For: Time-limited projects, emergency situations, urgent projects'
      },
      description: {
        es: 'Sistemas de curado ultra rápido para proyectos urgentes y emergencias',
        en: 'Ultra-fast curing systems for urgent projects and emergencies'
      },
      features: {
        es: ['Reparación express de pisos en 1-2 días', 'Sistemas rápidos con curado acelerado', 'Trabajos en clima frío (desde -5°C)', 'Reparaciones de emergencia y restauración', 'Mínima parada de producción', 'Servicio 24/7 disponible'],
        en: ['Express floor repair in 1-2 days', 'Quick systems with accelerated curing', 'Cold weather work (from -5°C)', 'Emergency repairs and restoration', 'Minimal production downtime', '24/7 service available']
      }
    },
    {
      id: 'repair-restoration',
      icon: Wrench,
      title: {
        es: 'Reparación y Restauración',
        en: 'Repair and Restoration'
      },
      subtitle: {
        es: 'Para: Cualquier objeto con pisos dañados',
        en: 'For: Any facility with damaged floors'
      },
      description: {
        es: 'Soluciones de restauración, autonivelado e impermeabilización',
        en: 'Restoration, self-leveling and waterproofing solutions'
      },
      features: {
        es: ['Reparación de grietas y baches', 'Restauración de recubrimientos antiguos', 'Reemplazo de áreas dañadas', 'Sellado de juntas y conexiones', 'Imprimación de superficies débiles', 'Renovación completa de pisos'],
        en: ['Crack and pothole repair', 'Restoration of old coatings', 'Replacement of damaged areas', 'Sealing of joints and connections', 'Priming of weak surfaces', 'Complete floor renovation']
      }
    },
    {
      id: 'painting-protective',
      icon: Sparkles,
      title: {
        es: 'Pintura y Recubrimientos Protectores',
        en: 'Paint and Protective Coatings'
      },
      subtitle: {
        es: 'Para: Objetos pequeños, proyectos económicos, renovación de pisos',
        en: 'For: Small facilities, budget projects, floor renovation'
      },
      description: {
        es: 'Recubrimientos de laca y protectores para proyectos económicos',
        en: 'Lacquer and protective coatings for budget projects'
      },
      features: {
        es: ['Recubrimientos de laca para protección del hormigón', 'Pintura de pisos en garajes y almacenes', 'Recubrimientos protectores para metal', 'Renovación rápida de pisos antiguos', 'Soluciones económicas para áreas pequeñas', 'Kits DIY disponibles'],
        en: ['Lacquer coatings for concrete protection', 'Floor painting in garages and warehouses', 'Protective coatings for metal', 'Quick renovation of old floors', 'Budget solutions for small areas', 'DIY kits available']
      }
    },
    {
      id: 'wet-areas',
      icon: Droplets,
      title: {
        es: 'Pisos para Áreas Húmedas',
        en: 'Floors for Wet Areas'
      },
      subtitle: {
        es: 'Para: Lavaderos de autos, piscinas, duchas, baños, lavanderías',
        en: 'For: Car washes, pools, showers, bathrooms, laundries'
      },
      description: {
        es: 'Recubrimientos impermeables y antideslizantes para áreas húmedas',
        en: 'Waterproof and non-slip coatings for wet areas'
      },
      features: {
        es: ['Recubrimientos impermeables', 'Pisos antideslizantes para seguridad', 'Recubrimientos para esquinas redondeadas', 'Selladores especiales para juntas', 'Resistentes a productos de limpieza', 'Certificación R11-R13'],
        en: ['Waterproof coatings', 'Non-slip floors for safety', 'Coatings for rounded corners', 'Special sealers for joints', 'Resistant to cleaning products', 'R11-R13 certification']
      }
    },
    {
      id: 'vip-individual',
      icon: Crown,
      title: {
        es: 'Proyectos Individuales y VIP',
        en: 'Individual and VIP Projects'
      },
      subtitle: {
        es: 'Para: Objetos exclusivos, soluciones no estándar',
        en: 'For: Exclusive facilities, non-standard solutions'
      },
      description: {
        es: 'Diseños exclusivos y soluciones personalizadas para proyectos únicos',
        en: 'Exclusive designs and custom solutions for unique projects'
      },
      features: {
        es: ['Diseño de recubrimientos únicos personalizados', 'Combinación de diferentes sistemas', 'Colores y efectos no estándar', 'Consultas técnicas y desarrollo de soluciones', 'Sistemas complejos multicapa', 'Proyectos desde 20.000€'],
        en: ['Custom unique coating design', 'Combination of different systems', 'Non-standard colors and effects', 'Technical consultations and solution development', 'Complex multi-layer systems', 'Projects from €20,000']
      }
    },
    {
      id: 'components-materials',
      icon: Package,
      title: {
        es: 'Componentes y Materiales',
        en: 'Components and Materials'
      },
      subtitle: {
        es: 'Para: Contratistas, maestros, entusiastas DIY, distribuidores',
        en: 'For: Contractors, professionals, DIY enthusiasts, distributors'
      },
      description: {
        es: 'Materiales y componentes Epoxi M² para venta por separado',
        en: 'Epoxi M² materials and components for separate sale'
      },
      features: {
        es: ['Pigmentos en polvo para coloración (8 colores)', 'Agregados de cuarzo de diferentes granulometrías', 'Selladores para juntas y conexiones', 'Imprimaciones para preparación de superficies', 'Aceleradores para curado rápido', 'Kits DIY completos con soporte técnico'],
        en: ['Powder pigments for coloring (8 colors)', 'Quartz aggregates of different grain sizes', 'Sealers for joints and connections', 'Primers for surface preparation', 'Accelerators for fast curing', 'Complete DIY kits with technical support']
      }
    }
  ];

  const visibleServices = services.slice(0, visibleCount);
  const hasMore = visibleCount < services.length;

  const handleLoadMore = () => {
    setVisibleCount(services.length);
  };

  return (
    <section id="services" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('services.title')} Epoxi M²
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {typeof service.title === 'object' ? service.title[language] : service.title}
                  </CardTitle>
                  <p className="text-sm text-primary/80 font-medium mt-2">
                    {typeof service.subtitle === 'object' ? service.subtitle[language] : service.subtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-center text-sm">
                    {typeof service.description === 'object' ? service.description[language] : service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {(Array.isArray(service.features) ? service.features : (typeof service.features === 'object' ? service.features[language] : [])).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full group"
                    asChild
                  >
                    <Link to={service.id === 'food-production' ? '/services/food-production' : service.id === 'business-industrial' ? '/services/business-industrial' : service.id === 'decorative-floors' ? '/services/decorative-floors' : service.id === 'garages-parking' ? '/services/garages-parking' : service.id === 'technical-specialized' ? '/services/technical-specialized' : service.id === 'fast-urgent' ? '/services/fast-urgent' : service.id === 'repair-restoration' ? '/services/repair-restoration' : service.id === 'painting-protective' ? '/services/painting-protective' : service.id === 'wet-areas' ? '/services/wet-areas' : service.id === 'vip-individual' ? '/services/vip-individual' : service.id === 'components-materials' ? '/services/components-materials' : `/services/${service.id}`}>
                      Más información
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={handleLoadMore}
              size="lg"
              className="px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ver más servicios ({services.length - visibleCount} restantes)
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
