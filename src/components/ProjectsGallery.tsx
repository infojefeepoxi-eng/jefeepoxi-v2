import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, MapPin, Calendar, Square, Euro } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link, useLocation } from 'react-router-dom';

// Import project images
import projectIndustrialBlueGray from '@/assets/project-industrial-blue-gray.jpg';
import projectMetallicGarage from '@/assets/project-metallic-garage.jpg';
import projectIndustrialYellow from '@/assets/project-industrial-yellow.jpg';
import projectWarehouse from '@/assets/project-warehouse-before-after.jpg';
import projectDecorativeWhiteBlack from '@/assets/project-decorative-white-black.jpg';
import projectDecorativeGoldBlack from '@/assets/project-decorative-gold-black.jpg';
import projectDecorativeMetallicGray from '@/assets/project-decorative-metallic-gray.jpg';
import projectDecorativeWoodMarble from '@/assets/project-decorative-wood-marble.jpg';
import projectMarbleLuxury from '@/assets/project-marble-luxury.jpg';
import projectGreenSalon from '@/assets/project-green-salon.jpg';
import projectMarbleStairs from '@/assets/project-marble-stairs.jpg';
import projectCreativeStudio from '@/assets/project-creative-studio.jpg';
import projectLuxuryYacht from '@/assets/project-luxury-yacht.jpg';
import projectWineCellar from '@/assets/project-wine-cellar.jpg';
import projectParkingUnderground from '@/assets/project-parking-underground.jpg';
import projectIndustrialWarehouse from '@/assets/project-industrial-warehouse.jpg';
import projectModernOffice from '@/assets/project-modern-office.jpg';
import projectLuxuryHotel from '@/assets/project-luxury-hotel.jpg';
import projectRestaurantFloor from '@/assets/project-restaurant-floor.jpg';
import projectRetailSpace from '@/assets/project-retail-space.jpg';
import projectGymFacility from '@/assets/project-gym-facility.jpg';
import projectMedicalCenter from '@/assets/project-medical-center.jpg';
import projectExhibitionHall from '@/assets/project-exhibition-hall.jpg';
import projectLaboratory from '@/assets/project-laboratory.jpg';
import projectSportsCenter from '@/assets/project-sports-center.jpg';
import projectConferenceCenter from '@/assets/project-conference-center.jpg';

interface Project {
  id: string;
  title: { es: string; en: string };
  location: string;
  date: string;
  surface: number;
  price?: number;
  type: 'industrial' | 'food' | 'decorative' | 'parking';
  image: string;
  description: { es: string; en: string };
}

const ProjectsGallery = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const projects: Project[] = [
    {
      id: '1',
      title: {
        es: 'Pavimento Industrial - Nave Logística',
        en: 'Industrial Flooring - Logistics Warehouse'
      },
      location: 'Valencia, España',
      date: '2025',
      surface: 460,
      price: 25300,
      type: 'industrial',
      image: projectIndustrialBlueGray,
      description: {
        es: 'Pavimento Epoxi multicapa con señalización integrada para nave de distribución',
        en: 'Multi-layer Epoxi flooring with integrated signage for distribution warehouse'
      }
    },
    {
      id: '2',
      title: {
        es: 'Pavimento Metálico - Taller Mecánico',
        en: 'Metallic Flooring - Mechanical Workshop'
      },
      location: 'Madrid, España',
      date: '2025',
      surface: 320,
      price: 22400,
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
      date: '2025',
      surface: 600,
      price: 27000,
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
      date: '2025',
      surface: 950,
      price: 38000,
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
        es: 'Diseño Artístico - Habitación',
        en: 'Artistic Design - Room'
      },
      location: 'Valencia, España',
      date: '2025',
      surface: 46,
      price: 3680,
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
        es: 'Efecto Dorado - Oficina Personal',
        en: 'Golden Effect - Personal Office'
      },
      location: 'Alicante, España',
      date: '2025',
      surface: 35,
      price: 2975,
      type: 'decorative',
      image: projectDecorativeGoldBlack,
      description: {
        es: 'Pavimento con efectos metálicos dorados para oficina personal',
        en: 'Flooring with golden metallic effects for personal office'
      }
    },
    {
      id: '7',
      title: {
        es: 'Acabado Metálico - Espacio Residencial',
        en: 'Metallic Finish - Residential Space'
      },
      location: 'Castellón, España',
      date: '2025',
      surface: 120,
      price: 9600,
      type: 'decorative',
      image: projectDecorativeMetallicGray,
      description: {
        es: 'Pavimento decorativo con efecto metálico gris para espacio residencial',
        en: 'Decorative flooring with gray metallic effect for residential space'
      }
    },
    {
      id: '8',
      title: {
        es: 'Efecto Bronce - Loft Moderno',
        en: 'Bronze Effect - Modern Loft'
      },
      location: 'Valencia, España',
      date: '2025',
      surface: 80,
      price: 6400,
      type: 'decorative',
      image: projectDecorativeWoodMarble,
      description: {
        es: 'Pavimento con efecto bronce para loft contemporáneo',
        en: 'Flooring with bronze effect for contemporary loft'
      }
    },
    {
      id: '10',
      title: {
        es: 'Diseño Marmóreo - Villa Mediterránea',
        en: 'Marble Design - Mediterranean Villa'
      },
      location: 'Málaga, España',
      date: '2025',
      surface: 240,
      price: 19200,
      type: 'decorative',
      image: projectMarbleLuxury,
      description: {
        es: 'Pavimento con acabado marmóreo de alta gama con luz natural',
        en: 'High-end marble finish flooring with natural lighting'
      }
    },
    {
      id: '11',
      title: {
        es: 'Verde Profundo - Barbería',
        en: 'Deep Green - Barbershop'
      },
      location: 'Murcia, España',
      date: '2025',
      surface: 30,
      price: 2550,
      type: 'decorative',
      image: projectGreenSalon,
      description: {
        es: 'Pavimento epoxi verde profundo para barbería moderna',
        en: 'Deep green epoxy flooring for modern barbershop'
      }
    },
    {
      id: '12',
      title: {
        es: 'Escalera Marmórea - Edificio Corporativo',
        en: 'Marble Staircase - Corporate Building'
      },
      location: 'Alicante, España',
      date: '2025',
      surface: 45,
      price: 4050,
      type: 'decorative',
      image: projectMarbleStairs,
      description: {
        es: 'Pavimento con efecto mármol para escaleras de alto tráfico',
        en: 'Marble effect flooring for high-traffic stairs'
      }
    },
    {
      id: '13',
      title: {
        es: 'Estudio Creativo - Espacio Artístico',
        en: 'Creative Studio - Artistic Space'
      },
      location: 'Barcelona, España',
      date: '2025',
      surface: 150,
      price: 12000,
      type: 'decorative',
      image: projectCreativeStudio,
      description: {
        es: 'Pavimento multicapa con efectos artísticos para estudio creativo',
        en: 'Multi-layer flooring with artistic effects for creative studio'
      }
    },
    {
      id: '14',
      title: {
        es: 'Sala de Estar de Lujo',
        en: 'Luxury Living Room'
      },
      location: 'Valencia, España',
      date: '2025',
      surface: 55,
      price: 4400,
      type: 'decorative',
      image: projectLuxuryYacht,
      description: {
        es: 'Pavimento epoxi con efecto ámbar para sala de estar exclusiva',
        en: 'Epoxy flooring with amber effect for exclusive living room'
      }
    },
    {
      id: '15',
      title: {
        es: 'Habitación del Miedo - Perla Roja',
        en: 'Fear Room - Red Pearl'
      },
      location: 'Barcelona, España',
      date: '2025',
      surface: 150,
      price: 12000,
      type: 'decorative',
      image: projectWineCellar,
      description: {
        es: 'Pavimento epoxi con efecto perla roja para habitación temática',
        en: 'Epoxy flooring with red pearl effect for themed room'
      }
    },
    {
      id: '16',
      title: {
        es: 'Parking Subterráneo - Centro Comercial',
        en: 'Underground Parking - Shopping Center'
      },
      location: 'Madrid, España',
      date: '2025',
      surface: 390,
      price: 19500,
      type: 'parking',
      image: projectParkingUnderground,
      description: {
        es: 'Pavimento industrial para parking subterráneo con señalización',
        en: 'Industrial flooring for underground parking with signage'
      }
    },
    {
      id: '17',
      title: {
        es: 'Clínica Privada',
        en: 'Private Clinic'
      },
      location: 'Zaragoza, España',
      date: '2025',
      surface: 240,
      price: 10800,
      type: 'industrial',
      image: projectIndustrialWarehouse,
      description: {
        es: 'Pavimento antibacteriano de alta calidad para clínica privada',
        en: 'High-quality antibacterial flooring for private clinic'
      }
    },
    {
      id: '18',
      title: {
        es: 'Salón de Belleza - Estilo Floral',
        en: 'Beauty Salon - Floral Style'
      },
      location: 'Barcelona, España',
      date: '2025',
      surface: 46,
      price: 4140,
      type: 'decorative',
      image: projectModernOffice,
      description: {
        es: 'Pavimento decorativo con diseño floral para salón de belleza moderno',
        en: 'Decorative flooring with floral design for modern beauty salon'
      }
    },
    {
      id: '19',
      title: {
        es: 'Escaparate de Tienda - Estilo Vintage',
        en: 'Shop Window - Vintage Style'
      },
      location: 'Alicante, España',
      date: '2025',
      surface: 60,
      price: 4200,
      type: 'decorative',
      image: projectLuxuryHotel,
      description: {
        es: 'Pavimento decorativo con estilo vintage para escaparate de tienda',
        en: 'Decorative flooring with vintage style for shop window'
      }
    },
    {
      id: '20',
      title: {
        es: 'Villa Prestigiosa - Estilo Marfil',
        en: 'Prestigious Villa - Ivory Style'
      },
      location: 'Calpe, España',
      date: '2025',
      surface: 140,
      price: 9800,
      type: 'decorative',
      image: projectRestaurantFloor,
      description: {
        es: 'Pavimento decorativo estilo marfil para villa de lujo',
        en: 'Ivory style decorative flooring for luxury villa'
      }
    },
    {
      id: '21',
      title: {
        es: 'Barbería Dreadlocks',
        en: 'Dreadlocks Barber'
      },
      location: 'Madrid, España',
      date: '2025',
      surface: 42,
      price: 3360,
      type: 'decorative',
      image: projectRetailSpace,
      description: {
        es: 'Pavimento decorativo especializado para barbería de dreadlocks',
        en: 'Specialized decorative flooring for dreadlocks barber shop'
      }
    },
    {
      id: '22',
      title: {
        es: 'Cocina - Gris Claro',
        en: 'Kitchen - Light Gray'
      },
      location: 'Valencia, España',
      date: '2025',
      surface: 20,
      price: 1200,
      type: 'industrial',
      image: projectGymFacility,
      description: {
        es: 'Pavimento epoxi gris claro para cocina moderna',
        en: 'Light gray epoxy flooring for modern kitchen'
      }
    },
    {
      id: '23',
      title: {
        es: 'Bar Costero - Fondo Marino',
        en: 'Coastal Bar - Sea Floor'
      },
      location: 'Torrevieja, España',
      date: '2025',
      surface: 130,
      price: 10400,
      type: 'decorative',
      image: projectMedicalCenter,
      description: {
        es: 'Pavimento decorativo con efecto fondo marino para bar costero',
        en: 'Decorative flooring with sea floor effect for coastal bar'
      }
    },
    {
      id: '24',
      title: {
        es: 'Cabina de Ducha - Protección de Piedra',
        en: 'Shower Cabin - Stone Protection'
      },
      location: 'Gandía, España',
      date: '2025',
      surface: 5,
      price: 600,
      type: 'decorative',
      image: projectExhibitionHall,
      description: {
        es: 'Revestimiento epoxi protector con efecto piedra para cabina de ducha',
        en: 'Protective epoxy coating with stone effect for shower cabin'
      }
    },
    {
      id: '25',
      title: {
        es: 'Garaje - Parking',
        en: 'Garage - Parking'
      },
      location: 'Altea, España',
      date: '2025',
      surface: 40,
      price: 2400,
      type: 'parking',
      image: projectLaboratory,
      description: {
        es: 'Pavimento resistente para garaje y zona de aparcamiento',
        en: 'Durable flooring for garage and parking area'
      }
    },
    {
      id: '26',
      title: {
        es: 'Barbería - Estilo Azul y Blanco',
        en: 'Barber Shop - Blue and White Style'
      },
      location: 'Barcelona, España',
      date: '2025',
      surface: 53,
      price: 4240,
      type: 'decorative',
      image: projectSportsCenter,
      description: {
        es: 'Pavimento decorativo con diseño azul y blanco para barbería moderna',
        en: 'Decorative flooring with blue and white design for modern barber shop'
      }
    },
    {
      id: '27',
      title: {
        es: 'Hogar Acogedor - Estilo Mármol',
        en: 'Cozy Home - Marble Style'
      },
      location: 'Toledo, España',
      date: '2025',
      surface: 240,
      price: 19200,
      type: 'decorative',
      image: projectConferenceCenter,
      description: {
        es: 'Pavimento decorativo con efecto mármol para hogar acogedor',
        en: 'Decorative flooring with marble effect for cozy home'
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
                  {project.price && (
                    <div className="flex items-center font-semibold text-foreground">
                      <Euro className="w-4 h-4 mr-2 text-primary" />
                      {project.price.toLocaleString('es-ES')} €
                    </div>
                  )}
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-4 w-full group-hover:bg-primary/10"
                  asChild
                >
                  <Link 
                    to={location.pathname === '/' ? '#contact' : '/#contact'}
                    onClick={(e) => {
                      if (location.pathname === '/') {
                        e.preventDefault();
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Ver detalles
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
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
