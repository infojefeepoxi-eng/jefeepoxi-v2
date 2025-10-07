import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Warehouse, Factory, Truck, Wrench, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Importar imágenes
import warehouseImage from '@/assets/hero-epoxy-warehouse.jpg';
import factoryImage from '@/assets/project-industrial-blue-gray.jpg';
import logisticsImage from '@/assets/project-industrial-yellow.jpg';
import productionImage from '@/assets/project-warehouse-before-after.jpg';

const IndustrialSolutions = () => {
  const { t } = useLanguage();

  const solutions = [
    {
      id: 'almacenes',
      icon: Warehouse,
      image: warehouseImage,
      title: 'Pisos para Almacenes',
      subtitle: 'Sistemas para centros de almacenamiento y distribución',
      description: 'Pisos resistentes para almacenes con movimiento constante de equipos pesados (montacargas, apiladores)',
      problems: [
        'Movimiento constante de equipos pesados',
        'Daños por caída de mercancías',
        'Polvo del piso de hormigón',
      ],
      systems: [
        { name: 'EpoxiRápido M²', tag: 'MEJOR PARA ALMACENES', price: '20-30 €/m²' },
        { name: 'EpoxiForte M² Industrial', tag: 'ZONAS DE CARGA', price: '34-48 €/m²' },
        { name: 'EpoxiLiso M² Autonivelante', tag: 'ZONAS OFICINA', price: '16-25 €/m²' },
      ],
      link: '/business-production',
    },
    {
      id: 'fabricas',
      icon: Factory,
      image: factoryImage,
      title: 'Pisos para Fábricas',
      subtitle: 'Sistemas para plantas industriales y químicas',
      description: 'Pisos químico-resistentes para fábricas con sustancias agresivas y cargas mecánicas constantes',
      problems: [
        'Sustancias químicas agresivas (ácidos, álcalis)',
        'Temperaturas altas o bajas',
        'Carga mecánica constante',
      ],
      systems: [
        { name: 'EpoxiProtect M² Químico', tag: 'MEJOR PARA QUÍMICAS', price: '28-40 €/m²' },
        { name: 'EpoxiTermo M² Alta Temp', tag: 'HASTA 1000°C', price: '55-80 €/m²' },
      ],
      link: '/business-production',
    },
    {
      id: 'logistica',
      icon: Truck,
      image: logisticsImage,
      title: 'Centros Logísticos',
      subtitle: 'Sistemas para centros de distribución automatizados',
      description: 'Pisos para centros logísticos con trabajo 24/7 y sistemas automatizados de almacenamiento',
      problems: [
        'Trabajo 24/7 - no se puede parar',
        'Sistemas automatizados (robots AGV)',
        'Áreas enormes (10,000+ m²)',
      ],
      systems: [
        { name: 'EpoxiRápido M²', tag: 'MONTAJE RÁPIDO', price: '20-30 €/m²' },
        { name: 'EpoxiLiso M² Autonivelante', tag: 'PARA AUTOMATIZACIÓN', price: '16-25 €/m²' },
      ],
      link: '/business-production',
    },
    {
      id: 'produccion',
      icon: Wrench,
      image: productionImage,
      title: 'Naves de Producción',
      subtitle: 'Sistemas para talleres y áreas de manufactura',
      description: 'Pisos universales para diferentes tipos de producciones con diversos requisitos',
      problems: [
        'Contacto con aceites y líquidos refrigerantes',
        'Caída de herramientas y piezas',
        'Zonas con diferentes cargas',
      ],
      systems: [
        { name: 'EpoxiBase M² Universal', tag: 'SIN OLOR', price: '13-20 €/m²' },
        { name: 'EpoxiForte M² Industrial', tag: 'TALLERES PESADOS', price: '34-48 €/m²' },
      ],
      link: '/business-production',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nuestras Soluciones Especializadas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sistemas Epoxi M² adaptados para cada tipo de instalación industrial
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Card 
                key={solution.id} 
                className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/50"
              >
                {/* Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className="w-8 h-8" />
                      <h3 className="text-2xl font-bold">{solution.title}</h3>
                    </div>
                    <p className="text-sm text-white/90">{solution.subtitle}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Description */}
                  <p className="text-foreground mb-4 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Problems */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-primary mb-3">
                      Problemas que resolvemos:
                    </h4>
                    <ul className="space-y-2">
                      {solution.problems.map((problem, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Systems */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-primary mb-3">
                      Sistemas recomendados:
                    </h4>
                    <div className="space-y-3">
                      {solution.systems.map((system, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-sm">{system.name}</span>
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                {system.tag}
                              </span>
                            </div>
                            <span className="text-sm text-primary font-medium">{system.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to={solution.link}>
                    <Button 
                      className="w-full group/btn"
                      variant="default"
                    >
                      Ver Detalles Completos
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            ¿No encuentra su tipo de proyecto?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Tenemos soluciones para más de 11 categorías diferentes de instalaciones industriales y comerciales
          </p>
          <Link to="/#contact">
            <Button size="lg" className="bg-primary hover:bg-primary-glow">
              Solicitar Consulta Técnica Gratuita
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IndustrialSolutions;
