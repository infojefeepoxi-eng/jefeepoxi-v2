import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, CheckCircle, Phone, MessageCircle, Crown, Building, Palette, Hotel, Gem, Star as StarIcon, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const VipIndividualDetailContent = () => {
  const { t } = useLanguage();
  const [expandedSystems, setExpandedSystems] = useState<{[key: string]: boolean}>({});
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    superficie: '',
    direccion: '',
    tipoAcabado: '',
    descripcion: '',
    acepto: false
  });

  const toggleSystemDetails = (productId: string, systemIndex: number) => {
    const key = `${productId}-${systemIndex}`;
    setExpandedSystems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se enviaría el formulario
    console.log('Form submitted:', formData);
    // Cerrar modal y mostrar mensaje de éxito
  };

  const QuoteForm = ({ productTitle, systemName }: { productTitle?: string, systemName?: string }) => {
    // Auto-fill form based on clicked button
    useEffect(() => {
      if (systemName) {
        setFormData(prev => ({ 
          ...prev, 
          tipoAcabado: systemName,
          descripcion: `Estoy interesado en ${systemName} para ${productTitle}. `
        }));
      } else if (productTitle) {
        setFormData(prev => ({ 
          ...prev, 
          tipoAcabado: productTitle,
          descripcion: `Estoy interesado en ${productTitle}. `
        }));
      }
    }, [systemName, productTitle]);

    return (
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nombre">Nombre completo *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="telefono">Teléfono *</Label>
            <Input
              id="telefono"
              value={formData.telefono}
              onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="superficie">Superficie estimada (m²)</Label>
            <Input
              id="superficie"
              placeholder="ej. 300"
              value={formData.superficie}
              onChange={(e) => setFormData(prev => ({ ...prev, superficie: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="direccion">Dirección del proyecto</Label>
          <Input
            id="direccion"
            placeholder="Ciudad, provincia"
            value={formData.direccion}
            onChange={(e) => setFormData(prev => ({ ...prev, direccion: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="tipoAcabado">Tipo de acabado deseado</Label>
          <Input
            id="tipoAcabado"
            placeholder={systemName || "ej. Exclusivo, personalizado, único..."}
            value={formData.tipoAcabado}
            onChange={(e) => setFormData(prev => ({ ...prev, tipoAcabado: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="descripcion">Descripción del proyecto</Label>
          <Textarea
            id="descripcion"
            placeholder={`Cuéntanos más detalles sobre tu proyecto${productTitle ? ` de ${productTitle}` : ''}...`}
            value={formData.descripcion}
            onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
            rows={4}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="acepto"
            checked={formData.acepto}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acepto: checked as boolean }))}
          />
          <Label htmlFor="acepto" className="text-sm text-muted-foreground">
            Acepto la política de privacidad y consiento el tratamiento de mis datos para recibir información comercial de JefeEpoxi.
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={!formData.acepto}>
          Solicitar Presupuesto
        </Button>
      </form>
    );
  };

  // Productos/servicios basados en CATEGORIA_10_VIP_INDYVIDUALNI.md
  const products = [
    {
      id: 'exclusivos',
      icon: Crown,
      title: 'Objetos Exclusivos (Luxury)',
      subtitle: 'Soluciones 100% únicas para segmento luxury',
      image: '/assets/project-decorative-gold-black.jpg',
      description: 'Sistemas completamente personalizados para objetos exclusivos con máximas exigencias',
      problems: [
        'Necesidad 100% unicidad (no como todos)',
        'Máximas exigencias calidad y estética',
        'Soluciones arquitectónicas complejas',
        'Formas no estándar y geometría',
        'Integración con interiores caros'
      ],
      solutions: [
        'Efectos únicos - en ningún sitio más hay tales',
        'Logos y gráficos integrados en piso',
        'Combinaciones sistemas - varias tecnologías un proyecto',
        'Colores no estándar - exacto según Pantone',
        'Geometría compleja - curvas, pendientes, transiciones'
      ],
      systems: [
        {
          name: 'EpoxiTech M² Especial',
          badge: 'COMPLETAMENTE A MEDIDA',
          description: 'Soluciones a medida',
          basedOn: 'Sistemas Monile',
          thickness: 'Según proyecto',
          curing: '24-72 horas según sistema',
          specialized: 'Sistemas técnicos especializados',
          applications: 'Aplicaciones específicas según proyecto',
          formulas: 'Fórmulas personalizadas',
          technical: 'Máximos indicadores técnicos',
          price: '100-300 €/m²',
          whyBest: [
            'Efectos únicos - en ningún sitio más hay tales',
            'Logos y gráficos integrados en piso',
            'Combinaciones sistemas - varias tecnologías un proyecto',
            'Colores no estándar - exacto según Pantone',
            'Geometría compleja - curvas, pendientes, transiciones'
          ],
          finish: 'Completamente personalizado',
          exclusive: [
            'Logo Lamborghini 5x5m en piso concesionario',
            'Mapa mundo en piso oficina empresa internacional',
            'Efecto "cielo estrellado" en cine privado',
            'Gradiente oro a negro en joyería boutique',
            'Efecto 3D "abismo" en club nocturno'
          ]
        },
        {
          name: 'EpoxiTerrazo M² + Agregados Exclusivos',
          badge: 'TERRAZO PREMIUM',
          description: 'Imitación terrazo + materiales premium',
          basedOn: 'Mondéco',
          thickness: '8-12mm',
          curing: '48-72 horas',
          price: '80-150 €/m²',
          whyBest: [
            'Mármol Carrara - auténtico italiano',
            'Granito rosa - exclusivo de Portugal',
            'Nácar - de conchas marinas',
            'Vidrio coloreado - fabricación especial',
            'Metal - incrustaciones bronce, cobre, plata',
            'Piedras preciosas - cuarzo, amatista (para VIP)'
          ],
          finish: 'Terrazo pulido espejo',
          techniques: [
            'Terrazo veneciano - técnica clásica italiana',
            'Terrazo moderno - efectos minimalistas',
            'Terrazo mosaico - patrones complejos',
            'Terrazo degradado - transiciones suaves colores'
          ]
        }
      ]
    },
    {
      id: 'viviendas',
      icon: Building,
      title: 'Viviendas Elite y Mansiones',
      subtitle: 'Diseños exclusivos para residencias de lujo',
      image: '/assets/project-decorative-wood-marble.jpg',
      description: 'Sistemas exclusivos para residencias de lujo como en hoteles caros del mundo',
      problems: [
        'Quieren como en hoteles caros del mundo',
        'Diseño único según arquitectura casa',
        'Combinación con suelo radiante',
        'Diferentes zonas - diferentes efectos',
        'Máxima calidad ejecución'
      ],
      solutions: [
        'Compatibilidad total con suelos radiantes',
        'LEDs integrados - iluminación en piso',
        'Logos familia - escudos, monogramas',
        'Zonificación - diferentes efectos diferentes zonas'
      ],
      systems: [
        {
          name: 'EpoxiTerrazo M²',
          badge: 'PARA SALONES PRINCIPALES',
          description: 'Para salones y halls',
          basedOn: 'Mondéco',
          thickness: '8-12mm',
          curing: '48-72 horas',
          heating: 'Sistema completamente compatible',
          leds: 'LEDs integrados - iluminación piso',
          logos: 'Logos familia - escudos, monogramas',
          zoning: 'Zonificación - diferentes efectos diferentes zonas',
          price: '80-150 €/m²',
          whyBest: [
            'Compatibilidad total con suelos radiantes',
            'LEDs integrados - iluminación en piso',
            'Logos familia - escudos, monogramas',
            'Zonificación - diferentes efectos diferentes zonas'
          ],
          finish: 'Terrazo pulido espejo',
          designs: [
            '"Palazzo Veneciano" - mármol blanco Carrara + incrustaciones oro',
            '"Modern Lux" - base negra + agregados plata y blancos',
            '"Natural Stone" - base beige + granito natural',
            '"Art Deco" - patrones geométricos vidrio coloreado'
          ],
          time: '14-21 días trabajo manual + pulido',
          warranty: '25 años recubrimiento'
        },
        {
          name: 'EpoxiArte M² Classic + Efectos Artísticos',
          badge: 'PARA DORMITORIOS Y ZONAS PRIVADAS',
          description: 'Para dormitorios y zonas privadas',
          basedOn: 'Peran STB Classic',
          thickness: '4-8mm',
          curing: '24-48 horas',
          price: '70-120 €/m²',
          whyBest: [
            'Efectos únicos personalizados',
            'Integración perfecta con decoración',
            'Técnicas artísticas manuales',
            'Colores exactos según diseño interior'
          ],
          finish: 'Artístico personalizado',
          effects: [
            '"Ondas Metálicas" - efecto flujo metal',
            '"Vetas Mármol" - imitación mármol natural',
            '"Polvo Cósmico" - base oscura + incrustaciones brillantes',
            '"Profundidades Océano" - degradados azules'
          ]
        }
      ]
    },
    {
      id: 'corporaciones',
      icon: Building,
      title: 'Corporaciones Flagship',
      subtitle: 'Soluciones corporativas para empresas líderes',
      image: '/assets/project-industrial-blue-gray.jpg',
      description: 'Sistemas corporativos que reflejan el estatus de la empresa',
      problems: [
        'Necesidad reflejar estatus empresa',
        'Identidad corporativa en diseño',
        'Efecto impresionante para clientes y socios',
        'Máximos estándares calidad',
        'Unicidad entre competidores'
      ],
      solutions: [
        'Logos empresa integrados en diseño',
        'Colores corporativos exactos Pantone',
        'Efectos únicos que impresionan',
        'Zonificación por departamentos',
        'Máxima calidad ejecución'
      ],
      systems: [
        {
          name: 'EpoxiTech M² Especial',
          badge: 'SOLUCIONES CORPORATIVAS',
          description: 'Proyectos corporativos a medida',
          basedOn: 'Sistemas Monile',
          thickness: 'Según proyecto',
          curing: '24-72 horas',
          corporate: 'Logos empresa integrados diseño',
          pantone: 'Colores corporativos exactos Pantone',
          effects: 'Efectos únicos impresionan',
          zoning: 'Zonificación departamentos',
          quality: 'Máxima calidad ejecución',
          price: '100-300 €/m²',
          whyBest: [
            'Logos empresa integrados en diseño',
            'Colores corporativos exactos Pantone',
            'Efectos únicos que impresionan',
            'Zonificación por departamentos',
            'Máxima calidad ejecución'
          ],
          finish: 'Corporativo exclusivo',
          examples: [
            'Oficina principal IT: Logo 10x3m reception + códigos QR piso + zonas LED interactivas + zonificación equipos',
            'Entidad bancaria: Efecto "monedas oro" + logo banco agregados oro + zonas antiestáticas servidores',
            'Consorcio automotriz: Logos todas marcas zonas + efecto "velocidad" líneas dinámicas + colores corporativos Pantone'
          ]
        },
        {
          name: 'EpoxiArte M² Marino',
          badge: 'PARA EMPRESAS MARÍTIMAS',
          description: 'Certificación marina MED',
          basedOn: 'Peran STB Marine',
          thickness: '4-8mm',
          curing: '24-48 horas',
          marine: 'Certificación marina oficial MED',
          waves: 'Efectos "ondas marinas"',
          seawater: 'Resistencia agua marina',
          yachtLogos: 'Logos yacht-clubs',
          price: '80-130 €/m²',
          whyBest: [
            'Certificación marina oficial MED',
            'Efectos "ondas marinas"',
            'Resistencia agua marina',
            'Logos yacht-clubs'
          ],
          finish: 'Marina certificada',
          applications: [
            'Yacht-clubs y marinas',
            'Empresas navieras',
            'Clubes náuticos exclusivos',
            'Oficinas empresas marítimas'
          ]
        }
      ]
    },
    {
      id: 'artisticos',
      icon: Palette,
      title: 'Proyectos Artísticos y Culturales',
      subtitle: 'Integración del arte en arquitectura',
      image: '/assets/project-decorative-white-black.jpg',
      description: 'Sistemas artísticos para galerías, museos y espacios culturales',
      problems: [
        'Necesidad expresión artística',
        'Integración arte en arquitectura',
        'Formas no estándar y soluciones',
        'Colaboración con diseñadores y artistas',
        'Requisitos técnicos únicos'
      ],
      solutions: [
        'Recubrimientos neutrales - no distraen de obras',
        'Efectos especiales - subrayan arte',
        'Facilidad mantenimiento - limpieza rápida después eventos',
        'Antiestática - protección obras'
      ],
      systems: [
        {
          name: 'EpoxiArte M² Classic + Técnicas Artísticas',
          badge: 'PROYECTOS ARTÍSTICOS',
          description: 'Sistemas artísticos',
          basedOn: 'Peran STB Classic',
          thickness: '4-8mm',
          curing: '24-48 horas',
          neutral: 'Recubrimientos neutrales - no distraen obras',
          effects: 'Efectos especiales - subrayan arte',
          maintenance: 'Facilidad mantenimiento - limpieza rápida eventos',
          antistatic: 'Antiestática - protección obras',
          price: '70-120 €/m²',
          whyBest: [
            'Recubrimientos neutrales - no distraen de obras',
            'Efectos especiales - subrayan arte',
            'Facilidad mantenimiento - limpieza rápida después eventos',
            'Antiestática - protección obras'
          ],
          finish: 'Artístico personalizado',
          galleries: [
            'Galerías y museos: Neutros + efectos especiales + fácil mantenimiento + antiestática',
            'Teatros y salas concierto: Propiedades acústicas + colores oscuros + antideslizante oscuridad + reparación rápida temporadas',
            'Talleres artísticos: Resistencia pinturas + antiestática + limpieza fácil + colores inspiradores'
          ]
        },
        {
          name: 'EpoxiCristal M² Transparente',
          badge: 'PROTECCIÓN ELEMENTOS ARTÍSTICOS',
          description: 'Sellado transparente brillante',
          basedOn: 'Peran STC',
          thickness: '0.5-2mm',
          curing: '24 horas',
          protection: 'Protección cuadros integrados piso',
          sealing: 'Sellado mosaicos e incrustaciones',
          signatures: 'Protección firmas artistas recubrimiento',
          conservation: 'Conservación elementos históricos',
          price: '25-45 €/m²',
          whyBest: [
            'Protección cuadros integrados en piso',
            'Sellado mosaicos e incrustaciones',
            'Protección firmas artistas en recubrimiento',
            'Conservación elementos históricos'
          ],
          finish: 'Transparente protector',
          applications: [
            'Protección obras arte integradas',
            'Sellado mosaicos históricos',
            'Conservación elementos patrimoniales',
            'Protección incrustaciones valiosas'
          ]
        }
      ]
    },
    {
      id: 'joyerias',
      icon: Gem,
      title: 'Joyerías y Luxury Boutiques',
      subtitle: 'Pisos que realzan el lujo de los productos',
      image: '/assets/project-decorative-metallic-gray.jpg',
      description: 'Sistemas exclusivos para joyerías que realzan el lujo y valor de los productos',
      problems: [
        'Piso debe subrayar lujo productos',
        'Seguridad (antiestática para electrónica)',
        'Facilidad limpieza (polvo precioso)',
        'Aspecto estatus',
        'Unicidad entre competidores'
      ],
      solutions: [
        'Antiestática - protección básculas electrónicas y equipos',
        'Brillo espejo - joyas se ven aún mejor',
        'Limpieza fácil - polvo precioso fácil recoger',
        'Sin juntas - no se pierde piedra pequeña'
      ],
      systems: [
        {
          name: 'EpoxiTerrazo M² + Agregados Preciosos',
          badge: 'SOLUCIONES EXCLUSIVAS JOYERÍA',
          description: 'Soluciones exclusivas para jewelry',
          basedOn: 'Mondéco + agregados premium',
          thickness: '8-12mm',
          curing: '48-72 horas',
          antistatic: 'Antiestática - protección básculas electrónicas',
          mirror: 'Brillo espejo - joyas se ven mejor',
          cleaning: 'Limpieza fácil - polvo precioso fácil recoger',
          seamless: 'Sin juntas - no se pierde piedra pequeña',
          price: '100-200 €/m²',
          whyBest: [
            'Antiestática - protección básculas electrónicas y equipos',
            'Brillo espejo - joyas se ven aún mejor',
            'Limpieza fácil - polvo precioso fácil recoger',
            'Sin juntas - no se pierde piedra pequeña'
          ],
          finish: 'Lujo exclusivo',
          effects: [
            '"Diamond Dust Effect": Base negra brillante + incrustaciones cuarzo cristal + copos plata metálicos + pulido espejo = Efecto diamantes esparcidos',
            '"Gold Rush": Base azul oscuro + incrustaciones metálicas oro + agregados bronce = Efecto lujo y riqueza'
          ]
        },
        {
          name: 'EpoxiStatic M² ESD + Efectos Decorativos',
          badge: 'PARA JOYERÍAS HIGH-TECH',
          description: 'Para joyerías alta tecnología',
          basedOn: 'Flowstat ESD + decorativo',
          thickness: '3-6mm',
          curing: '24-48 horas',
          esd: 'Protección estática (básculas electrónicas, microscopios)',
          beauty: 'Aspecto hermoso',
          conductivity: 'Conductividad controlada',
          certification: 'Certificación ESD',
          price: '80-130 €/m²',
          whyBest: [
            'Protección estática (básculas electrónicas, microscopios)',
            'Aspecto hermoso',
            'Conductividad controlada',
            'Certificación ESD'
          ],
          finish: 'ESD decorativo',
          applications: [
            'Joyerías con equipos precisión',
            'Talleres orfebrería',
            'Zonas pesado diamantes',
            'Laboratorios gemología'
          ]
        }
      ]
    },
    {
      id: 'hoteles',
      icon: Hotel,
      title: 'Hoteles Exclusivos y Resorts',
      subtitle: 'Signature look para hoteles de lujo',
      image: '/assets/project-decorative-gold-black.jpg',
      description: 'Sistemas exclusivos para hoteles que compiten con cadenas mundiales',
      problems: [
        'Competencia con cadenas hoteleras mundiales',
        'Necesidad diseño memorable',
        'Diferentes condiciones climáticas',
        'Flujo intensivo huéspedes',
        'Máximos estándares servicio'
      ],
      solutions: [
        'Creación "signature look" hotel único',
        'Resistencia uso intensivo',
        'Facilidad mantenimiento',
        'Efectos memorables para huéspedes'
      ],
      systems: [
        {
          name: 'EpoxiTerrazo M²',
          badge: 'PARA LOBBIES HOTELES',
          description: 'Creación signature look hotel',
          basedOn: 'Mondéco',
          thickness: '8-12mm',
          curing: '48-72 horas',
          signature: 'Creación "signature look" hotel único',
          resistance: 'Resistencia uso intensivo',
          maintenance: 'Facilidad mantenimiento',
          memorable: 'Efectos memorables huéspedes',
          price: '80-150 €/m²',
          whyBest: [
            'Creación "signature look" hotel único',
            'Resistencia uso intensivo',
            'Facilidad mantenimiento',
            'Efectos memorables para huéspedes'
          ],
          finish: 'Signature hotel exclusivo',
          styles: [
            'Estilo Mediterráneo: Mármol crema y beige + agregados conchas marinas y corales = Efecto playa y mar + logo hotel integrado',
            'Minimalismo Moderno: Base blanco nieve + granito gris fino = Efecto limpieza y espacio + iluminación LED perímetro',
            'Lujo Clásico: Base negra o gris oscuro + agregados oro y cobre = Efecto lujo palaciego + franjas separadoras latón'
          ]
        },
        {
          name: 'EpoxiArte M² Marino',
          badge: 'PARA HOTELES PLAYA',
          description: 'Certificación marina objetos costeros',
          basedOn: 'Peran STB Marine',
          thickness: '4-8mm',
          curing: '24-48 horas',
          seawater: 'Resistencia agua salada',
          sand: 'Antideslizante sobre arena',
          marine: 'Certificación marina',
          salt: 'Resistencia sal',
          price: '80-130 €/m²',
          whyBest: [
            'Resistencia agua salada',
            'Antideslizante sobre arena',
            'Certificación marina',
            'Resistencia a sal'
          ],
          finish: 'Marina certificada',
          applications: [
            'Terrazas junto mar - resistencia agua salada',
            'Beach bars - antideslizante arena',
            'Muelles y embarcaderos - certificación marina',
            'Piscinas agua marina - resistencia sal'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-12 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <Link to="/#services">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Servicios
              </Button>
            </Link>
            
            <div className="text-center max-w-4xl mx-auto">
              <Crown className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Proyectos Individuales y VIP
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Diseños exclusivos y soluciones personalizadas para proyectos únicos
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-8">
                <p className="text-primary font-semibold">
                  Para: Objetos exclusivos, soluciones no estándar
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✓ Proyectos desde 20.000€
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  ✓ 100% personalizado
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  ✓ Diseño exclusivo
                </div>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  ✓ Garantía hasta 25 años
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nuestras Soluciones Exclusivas VIP
              </h2>
              <p className="text-lg text-muted-foreground">
                Sistemas Epoxi M² únicos y personalizados para proyectos de lujo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Product Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-primary/90 text-primary-foreground p-2 rounded-full">
                        <product.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">
                      {product.title}
                    </CardTitle>
                    <p className="text-primary font-medium">
                      {product.subtitle}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                      {product.description}
                    </p>

                    {/* Problems Section */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Problemas que resolvemos:</h4>
                      <ul className="space-y-2">
                        {product.problems?.map((problem, idx) => (
                          <li key={idx} className="flex items-start text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-primary/70 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {problem}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solutions Section */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Nuestras soluciones:</h4>
                      <ul className="space-y-2">
                        {product.solutions?.map((solution, idx) => (
                          <li key={idx} className="flex items-start text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Systems Section */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Sistemas recomendados:</h4>
                      <div className="space-y-4">
                        {product.systems?.map((system, idx) => {
                          const systemKey = `${product.id}-${idx}`;
                          const isExpanded = expandedSystems[systemKey];
                          
                          return (
                            <div key={idx} className="border rounded-lg overflow-hidden">
                              {/* System Header */}
                              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 relative">
                                <div className="flex items-center gap-2 mb-2">
                                  <h5 className="font-semibold text-primary text-base">{system.name}</h5>
                                  {system.badge && (
                                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                      <Star className="w-3 h-3" />
                                      {system.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-muted-foreground text-sm mb-3">{system.description}</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4 text-sm">
                                    <span className="font-medium">Espesor: <span className="text-primary">{system.thickness}</span></span>
                                    <span className="font-bold text-base text-primary">{system.price}</span>
                                  </div>
                                </div>
                                
                                {/* Compact Details Button in bottom right */}
                                <div className="mt-3 flex justify-end">
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => toggleSystemDetails(product.id, idx)}
                                    className="h-6 px-2 text-xs bg-primary hover:bg-primary/90 text-black hover:text-black shadow-sm hover:shadow-md transition-all duration-200"
                                  >
                                    <span className="font-medium text-xs">Detalles</span>
                                    {isExpanded ? 
                                      <ChevronUp className="w-3 h-3 ml-1" /> : 
                                      <ChevronDown className="w-3 h-3 ml-1" />
                                    }
                                  </Button>
                                </div>
                              </div>

                              {/* Expandable Details */}
                              <Collapsible open={isExpanded}>
                                <CollapsibleContent>
                                  <div className="p-4 bg-card border-t">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      {/* Technical Characteristics */}
                                      <div>
                                        <h6 className="font-semibold text-foreground mb-3">Características Técnicas:</h6>
                                        <div className="space-y-2 text-sm">
                                          {system.basedOn && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Basado en:</span>
                                              <span className="font-medium">{system.basedOn}</span>
                                            </div>
                                          )}
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Espesor aplicación:</span>
                                            <span className="font-medium">{system.thickness}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Tiempo curado:</span>
                                            <span className="font-medium">{system.curing}</span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Why Best */}
                                      <div>
                                        <h6 className="font-semibold text-foreground mb-3">¿Por qué es ideal?</h6>
                                        <ul className="space-y-2">
                                          {(system.whyBest || []).map((reason, reasonIdx) => (
                                            <li key={reasonIdx} className="flex items-start text-sm">
                                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                              <span className="text-muted-foreground">{reason}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>

                                    {/* Applications */}
                                    {system.applications && Array.isArray(system.applications) && (
                                      <div className="mt-6 pt-4 border-t">
                                        <h6 className="font-semibold text-foreground mb-3">Aplicaciones:</h6>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                          {system.applications.map((app, appIdx) => (
                                            <li key={appIdx} className="flex items-center text-muted-foreground">
                                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                                              {app}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {/* Additional Specifications */}
                                    <div className="mt-6 pt-4 border-t">
                                      <h6 className="font-semibold text-foreground mb-3">Especificaciones:</h6>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        {system.finish && (
                                          <div>
                                            <span className="text-muted-foreground">Acabado: </span>
                                            <span className="font-medium">{system.finish}</span>
                                          </div>
                                        )}
                                        {system.warranty && (
                                          <div>
                                            <span className="text-muted-foreground">Garantía: </span>
                                            <span className="font-medium">{system.warranty}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* CTA for this system */}
                                    <div className="mt-6 pt-4 border-t">
                                      <div className="flex gap-3">
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <Button className="flex-1">
                                              Solicitar {system.name}
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                              <DialogTitle>Solicitar Presupuesto - {system.name}</DialogTitle>
                                            </DialogHeader>
                                            <QuoteForm productTitle={product.title} systemName={system.name} />
                                          </DialogContent>
                                        </Dialog>
                                        <Button 
                                          variant="outline"
                                          onClick={() => {
                                            window.location.href = 'tel:+34622313855';
                                          }}
                                        >
                                          <Phone className="w-4 h-4 mr-2" />
                                          Consultar
                                        </Button>
                                        <Button 
                                          variant="outline"
                                          onClick={() => {
                                            window.open(`https://wa.me/34622313855?text=Hola, estoy interesado en ${system.name} para ${product.title}. ¿Podrían darme más información?`, '_blank');
                                          }}
                                        >
                                          <MessageCircle className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1">
                            Solicitar Presupuesto
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Solicitar Presupuesto - {product.title}</DialogTitle>
                          </DialogHeader>
                          <QuoteForm productTitle={product.title} />
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          window.location.href = 'tel:+34622313855';
                        }}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          window.open('https://wa.me/34622313855?text=Hola, estoy interesado en ' + product.title + '. ¿Podrían darme más información?', '_blank');
                        }}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services for VIP Projects */}
        <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Servicios Exclusivos VIP
                </h2>
                <p className="text-lg text-muted-foreground">
                  Servicios premium especializados incluidos en todos nuestros proyectos VIP
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Design and Development */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Diseño y Desarrollo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Diseño autor personalizado
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Visualización 3D fotorrealista
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Muestras prueba 50x50cm
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Colores exactos Pantone
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Agregados exclusivos importados
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Exclusive Execution */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Ejecución Exclusiva</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Maestro-artista especializado
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Trabajo manual técnicas artísticas
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Pulido espejo profesional
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Control calidad cada etapa
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Documentación fotográfica profesional
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* VIP Guarantees */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Garantías VIP</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Resultado como visualización - o rehacemos
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Plazos - o compensación 1% día
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Confidencialidad completa
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Exclusividad - tal no habrá en ningún sitio más
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Soporte vitalicio - siempre ayudaremos
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* System Selection Guide */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Proceso Selección Clientes VIP
                </h2>
                <p className="text-lg text-muted-foreground">
                  Trabajamos con proyectos donde la calidad y exclusividad son prioritarias
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Trabajamos con proyectos donde:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Presupuesto desde 20,000€</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Mínimo para calidad VIP</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Unicidad importante:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>No soluciones estándar</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Diseños completamente únicos</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Calidad crítica:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Dispuestos pagar por lo mejor</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Máxima calidad sin compromisos</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Plazos flexibles:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Entienden que arte necesita tiempo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Trabajo manual de calidad</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Confianza en expertos:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Dan libertad creativa</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Confían en nuestra experiencia</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">NO trabajamos si:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Criterio principal es precio</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Plazos irreales o cambios durante ejecución</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Free Consultation Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Consulta VIP Gratuita
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                ¿Tiene un proyecto exclusivo que requiere solución única?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Servicio exclusivo incluye:</h3>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Manager personal - solo su proyecto
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Visita cualquier punto Europa - proyectos grandes
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Consultas 24/7 - responderemos cualquier pregunta
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Confidencialidad - firmamos NDA
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Condiciones individuales - todo se discute
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Contacto directo VIP:</h3>
                    <div className="space-y-3">
                      <Button 
                        className="w-full"
                        onClick={() => {
                          window.location.href = 'tel:+34622313855';
                        }}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Llamar: +34 622 313 855
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          window.open('https://wa.me/34622313855?text=Hola, tengo proyecto VIP exclusivo. ¿Podrían contactarme para consulta?', '_blank');
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp VIP
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-2 text-black">
                  ¡Crearemos el piso de sus sueños!
                </h3>
                <p className="text-black/80 mb-4">
                  Nuestros expertos VIP crearán una solución única exclusivamente para usted
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90 hover:text-black">
                      Solicitar Consulta VIP
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Solicitar Consulta VIP - Proyectos Individuales</DialogTitle>
                    </DialogHeader>
                    <QuoteForm productTitle="Proyectos Individuales y VIP" />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Ejemplos de Proyectos VIP Realizados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Villa Privada Oligarca 500 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Proyecto:</strong> "Palazzo Veneciano"</li>
                      <li><strong>Sistemas:</strong> EpoxiTerrazo M² (zonas principales) + EpoxiArte M² (privadas)</li>
                      <li><strong>Materiales:</strong> Mármol Carrara + copos oro</li>
                      <li><strong>Especiales:</strong> Logo familia, escudo en piso</li>
                      <li><strong>Tiempo:</strong> 6 semanas</li>
                      <li><strong>Precio:</strong> 150,000€</li>
                      <li><strong>Resultado:</strong> Como museo, pero funcional</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Salón Flagship Porsche 800 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Proyecto:</strong> "Racing Spirit"</li>
                      <li><strong>Sistema:</strong> EpoxiArte M² Classic + acabado espejo</li>
                      <li><strong>Diseño:</strong> Logo Porsche 8x8m + líneas dinámicas</li>
                      <li><strong>Efecto:</strong> Coches parecen "volar" sobre piso</li>
                      <li><strong>Tiempo:</strong> 4 semanas</li>
                      <li><strong>Precio:</strong> 80,000€</li>
                      <li><strong>Resultado:</strong> Ventas crecieron 30% (clientes impresionados)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hotel 5 Estrellas Lobby 300 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Proyecto:</strong> "Mediterranean Dreams"</li>
                      <li><strong>Sistema:</strong> EpoxiTerrazo M² + agregados marinos</li>
                      <li><strong>Diseño:</strong> Efecto ondas marinas + logo hotel</li>
                      <li><strong>Materiales:</strong> Mármol + conchas marinas + nácar</li>
                      <li><strong>Tiempo:</strong> 3 semanas</li>
                      <li><strong>Precio:</strong> 45,000€</li>
                      <li><strong>Resultado:</strong> Huéspedes fotografían lobby para Instagram</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Joyería Boutique Cartier 120 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Proyecto:</strong> "Diamond Luxury"</li>
                      <li><strong>Sistema:</strong> EpoxiTerrazo M² + EpoxiStatic M² ESD</li>
                      <li><strong>Diseño:</strong> Base negra + agregados cristal</li>
                      <li><strong>Especiales:</strong> Antiestática + brillo espejo</li>
                      <li><strong>Tiempo:</strong> 2 semanas</li>
                      <li><strong>Precio:</strong> 25,000€</li>
                      <li><strong>Resultado:</strong> Joyas se ven aún más caras</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

const VipIndividualDetail = () => (
  <LanguageProvider>
    <VipIndividualDetailContent />
  </LanguageProvider>
);

export default VipIndividualDetail;
