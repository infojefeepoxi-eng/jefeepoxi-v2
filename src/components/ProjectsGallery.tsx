import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, MapPin, Calendar, Square } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Import project images
import projectIndustrialBlueGray from '@/assets/project-industrial-blue-gray.jpg';
import projectMetallicGarage from '@/assets/project-metallic-garage.jpg';
import projectIndustrialYellow from '@/assets/project-industrial-yellow.jpg';
import projectWarehouse from '@/assets/project-warehouse-before-after.jpg';
import projectDecorativeWhiteBlack from '@/assets/project-decorative-white-black.jpg';
import projectDecorativeGoldBlack from '@/assets/project-decorative-gold-black.jpg';
import projectDecorativeMetallicGray from '@/assets/project-decorative-metallic-gray.jpg';
import projectDecorativeWoodMarble from '@/assets/project-decorative-wood-marble.jpg';

interface Project {
  id: string;
  title: { es: string; en: string };
  location: string;
  date: string;
  surface: number;
  type: 'industrial' | 'food' | 'decorative' | 'parking';
  image: string;
  description: { es: string; en: string };
}

const ProjectsGallery = () => {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const projects: Project[] = [
    {
      id: '1',
      title: {
        es: 'Pavimento Industrial - Nave Logística',
        en: 'Industrial Flooring - Logistics Warehouse'
      },
      location: 'Valencia, España',
      date: '2024',
      surface: 850,
      type: 'industrial',
      image: projectIndustrialBlueGray,
      description: {
        es: 'Pavimento epoxi multicapa con señalización integrada para nave de distribución',
        en: 'Multi-layer epoxy flooring with integrated signage for distribution warehouse'
      }
    },
    {
      id: '2',
      title: {
        es: 'Pavimento Metálico - Taller Mecánico',
        en: 'Metallic Flooring - Mechanical Workshop'
      },
      location: 'Madrid, España',
      date: '2024',
      surface: 320,
      type: 'decorative',
      image: projectMetallicGarage,
      description: {
        es: 'Acabado metálico con efecto mármol para taller de alto rendimiento',
        en: 'Metallic finish with marble effect for high-performance workshop'
      }
    },
    {
      id: '3',
      title: {
        es: 'Pavimento Anti-estático - Centro Logístico',
        en: 'Anti-static Flooring - Logistics Center'
      },
      location: 'Barcelona, España',
      date: '2023',
      surface: 1200,
      type: 'industrial',
      image: projectIndustrialYellow,
      description: {
        es: 'Pavimento ESD con certificación ISO para almacén tecnológico',
        en: 'ESD flooring with ISO certification for technology warehouse'
      }
    },
    {
      id: '4',
      title: {
        es: 'Renovación Integral - Almacén',
        en: 'Complete Renovation - Warehouse'
      },
      location: 'Sevilla, España',
      date: '2023',
      surface: 950,
      type: 'industrial',
      image: projectWarehouse,
      description: {
        es: 'Transformación completa con pavimento autonivelante',
        en: 'Complete transformation with self-leveling flooring'
      }
    },
    {
      id: '5',
      title: {
        es: 'Diseño Artístico - Oficina Corporativa',
        en: 'Artistic Design - Corporate Office'
      },
      location: 'Valencia, España',
      date: '2024',
      surface: 180,
      type: 'decorative',
      image: projectDecorativeWhiteBlack,
      description: {
        es: 'Pavimento decorativo con diseño personalizado en blanco y negro',
        en: 'Decorative flooring with custom black and white design'
      }
    },
    {
      id: '6',
      title: {
        es: 'Efecto Dorado - Showroom Premium',
        en: 'Golden Effect - Premium Showroom'
      },
      location: 'Alicante, España',
      date: '2024',
      surface: 95,
      type: 'decorative',
      image: projectDecorativeGoldBlack,
      description: {
        es: 'Pavimento con efectos metálicos dorados para showroom exclusivo',
        en: 'Flooring with golden metallic effects for exclusive showroom'
      }
    },
    {
      id: '7',
      title: {
        es: 'Acabado Metálico - Garaje Residencial',
        en: 'Metallic Finish - Residential Garage'
      },
      location: 'Castellón, España',
      date: '2023',
      surface: 65,
      type: 'parking',
      image: projectDecorativeMetallicGray,
      description: {
        es: 'Pavimento decorativo con efecto metálico gris para garaje premium',
        en: 'Decorative flooring with gray metallic effect for premium garage'
      }
    },
    {
      id: '8',
      title: {
        es: 'Efecto Madera - Loft Moderno',
        en: 'Wood Effect - Modern Loft'
      },
      location: 'Valencia, España',
      date: '2024',
      surface: 140,
      type: 'decorative',
      image: projectDecorativeWoodMarble,
      description: {
        es: 'Pavimento con efecto madera y mármol para loft contemporáneo',
        en: 'Flooring with wood and marble effect for contemporary loft'
      }
    }
  ];

  const filters = [
    { key: 'all', labelKey: 'projects.filter.all' },
    { key: 'industrial', labelKey: 'projects.filter.industrial' },
    { key: 'decorative', labelKey: 'projects.filter.decorative' },
    { key: 'parking', labelKey: 'projects.filter.parking' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.type === activeFilter);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore nuestros proyectos más destacados en toda España y Europa
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.key)}
                className="transition-all duration-200"
              >
                {t(filter.labelKey)}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group overflow-hidden bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title[language]}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
                    {project.type}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.type === 'parking' && (
                    <div className="absolute bottom-4 right-4 flex items-center bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      <span>🅿️ Parking</span>
                    </div>
                  )}
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                  {project.title[language]}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description[language]}
                </p>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    {project.date}
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-2 text-primary" />
                    {project.surface} m²
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="mt-4 w-full group-hover:bg-primary/10">
                  Ver detalles
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;