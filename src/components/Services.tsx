import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Factory, Utensils, Zap, Car, Sparkles, Wrench, ArrowRight, Clock, Droplets, Crown, Package } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';

const Services = () => {
  const { t, language } = useLanguage();

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
      title: 'Pisos para Garajes y Parkings',
      subtitle: 'Para: Garajes residenciales, parkings de varios pisos, talleres, lavaderos',
      description: 'Sistemas EpoxiCubierta M² para parkings, cubiertas transitables e impermeabilización',
      features: ['Recubrimientos resistentes a aceites y gasolina para garajes', 'Impermeabilización de parkings en cubiertas', 'Sistemas de montaje rápido para parkings (con mínimo cierre)', 'Recubrimientos antideslizantes para rampas de acceso', 'Pisos resistentes para talleres y autoservicios', 'Garantía vitalicia impermeabilización']
    },
    {
      id: 'technical-specialized',
      icon: Zap,
      title: 'Pisos Técnicos Especiales',
      subtitle: 'Para: Laboratorios, fábricas electrónicas, hospitales, producciones high-tech',
      description: 'Pavimentos ESD, conductivos y químico-resistentes para industrias exigentes',
      features: ['Pisos antiestáticos para electrónica (protección contra estática)', 'Recubrimientos químico-resistentes para laboratorios', 'Pisos para altas temperaturas (hornos, calderas)', 'Recubrimientos antideslizantes para seguridad en producción', 'Soluciones especializadas personalizadas', 'Certificación ISO 61340 / IEC']
    },
    {
      id: 'fast-urgent',
      icon: Clock,
      title: 'Trabajos Rápidos y Urgentes',
      subtitle: 'Para: Objetos con tiempo limitado, situaciones de emergencia, proyectos urgentes',
      description: 'Sistemas de curado ultra rápido para proyectos urgentes y emergencias',
      features: ['Reparación express de pisos en 1-2 días', 'Sistemas rápidos con curado acelerado', 'Trabajos en clima frío (desde -5°C)', 'Reparaciones de emergencia y restauración', 'Mínima parada de producción', 'Servicio 24/7 disponible']
    },
    {
      id: 'repair-restoration',
      icon: Wrench,
      title: 'Reparación y Restauración',
      subtitle: 'Para: Cualquier objeto con pisos dañados',
      description: 'Soluciones de restauración, autonivelado e impermeabilización',
      features: ['Reparación de grietas y baches', 'Restauración de recubrimientos antiguos', 'Reemplazo de áreas dañadas', 'Sellado de juntas y conexiones', 'Imprimación de superficies débiles', 'Renovación completa de pisos']
    },
    {
      id: 'painting-protective',
      icon: Sparkles,
      title: 'Pintura y Recubrimientos Protectores',
      subtitle: 'Para: Objetos pequeños, proyectos económicos, renovación de pisos',
      description: 'Recubrimientos de laca y protectores para proyectos económicos',
      features: ['Recubrimientos de laca para protección del hormigón', 'Pintura de pisos en garajes y almacenes', 'Recubrimientos protectores para metal', 'Renovación rápida de pisos antiguos', 'Soluciones económicas para áreas pequeñas', 'Kits DIY disponibles']
    },
    {
      id: 'wet-areas',
      icon: Droplets,
      title: 'Pisos para Áreas Húmedas',
      subtitle: 'Para: Lavaderos de autos, piscinas, duchas, baños, lavanderías',
      description: 'Recubrimientos impermeables y antideslizantes para áreas húmedas',
      features: ['Recubrimientos impermeables', 'Pisos antideslizantes para seguridad', 'Recubrimientos para esquinas redondeadas', 'Selladores especiales para juntas', 'Resistentes a productos de limpieza', 'Certificación R11-R13']
    },
    {
      id: 'vip-individual',
      icon: Crown,
      title: 'Proyectos Individuales y VIP',
      subtitle: 'Para: Objetos exclusivos, soluciones no estándar',
      description: 'Diseños exclusivos y soluciones personalizadas para proyectos únicos',
      features: ['Diseño de recubrimientos únicos personalizados', 'Combinación de diferentes sistemas', 'Colores y efectos no estándar', 'Consultas técnicas y desarrollo de soluciones', 'Sistemas complejos multicapa', 'Proyectos desde 20.000€']
    },
    {
      id: 'components-materials',
      icon: Package,
      title: 'Componentes y Materiales',
      subtitle: 'Para: Contratistas, maestros, entusiastas DIY, distribuidores',
      description: 'Materiales y componentes Epoxi M² para venta por separado',
      features: ['Pigmentos en polvo para coloración (8 colores)', 'Agregados de cuarzo de diferentes granulometrías', 'Selladores para juntas y conexiones', 'Imprimaciones para preparación de superficies', 'Aceleradores para curado rápido', 'Kits DIY completos con soporte técnico']
    }
  ];

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
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {typeof service.title === 'object' ? service.title.es : service.title}
                  </CardTitle>
                  <p className="text-sm text-primary/80 font-medium mt-2">
                    {typeof service.subtitle === 'object' ? service.subtitle.es : service.subtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-center text-sm">
                    {typeof service.description === 'object' ? service.description.es : service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {(Array.isArray(service.features) ? service.features : (typeof service.features === 'object' ? service.features.es : [])).map((feature, featureIndex) => (
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
                    <Link to={`/services/${service.id}`}>
                      Más información
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
