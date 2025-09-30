import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Factory, Utensils, Zap, Car, Sparkles, Wrench, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 'food-industry',
      icon: Utensils,
      titleKey: 'services.food.title',
      descKey: 'services.food.desc',
      features: ['Autonivelantes (2-4 mm)', 'Capas medias (4-6 mm)', 'Capas gruesas (6-12 mm)', 'Certificación HACCP/FDA', 'Acabado antideslizante', 'Higiénico con EscudoBio™']
    },
    {
      id: 'industrial',
      icon: Factory,
      titleKey: 'services.industrial.title',
      descKey: 'services.industrial.desc',
      features: ['Pavimentos para naves', 'Centros logísticos', 'Zonas alto tráfico', 'Señalización integrada', 'Montaje rápido (2-4h)', 'Aplicable hasta -20°C']
    },
    {
      id: 'parking-decks',
      icon: Car,
      titleKey: 'services.parking.title',
      descKey: 'services.parking.desc',
      features: ['Sistemas Deckshield', 'Parkings cubiertos/abiertos', 'Cubiertas transitables', 'Impermeabilización', 'Balcones y terrazas', 'Resistente a sales/aceites']
    },
    {
      id: 'decorative',
      icon: Sparkles,
      titleKey: 'services.decorative.title',
      descKey: 'services.decorative.desc',
      features: ['Efectos metallic', 'Suelos 3D', 'Revestimientos cuarzo', 'Diseños personalizados', 'Logotipos integrados', 'Acabados exclusivos']
    },
    {
      id: 'specialized',
      icon: Zap,
      titleKey: 'services.esd.title',
      descKey: 'services.esd.desc',
      features: ['Pavimentos ESD', 'Pavimentos conductivos', 'Salas blancas', 'ISO 61340 / DIN / ASTM', 'Industria electrónica', 'Control estático']
    },
    {
      id: 'repairs',
      icon: Wrench,
      titleKey: 'services.repair.title',
      descKey: 'services.repair.desc',
      features: ['Reparación grietas', 'Autonivelado suelos', 'Restauración pavimentos', 'Impermeabilización', 'Imprimaciones', 'Capas protectoras']
    }
  ];

  return (
    <section id="services" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('services.title')}
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
                    {t(service.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-center">
                    {t(service.descKey)}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
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
