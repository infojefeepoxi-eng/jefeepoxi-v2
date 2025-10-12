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
import { ArrowLeft, CheckCircle, Phone, MessageCircle, Store, Car, Hotel, Building, Home, Anchor, ChevronDown, ChevronUp, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import tiendasImage from '@/assets/tiendas-boutiques.webp';
import autosalonesImage from '@/assets/autosalones.webp';
import hotelesImage from '@/assets/hoteles-restaurantes.webp';
import oficinasImage from '@/assets/oficinas.webp';
import viviendasImage from '@/assets/viviendas-exclusivas.webp';
import yatesImage from '@/assets/yates-marinos.webp';

const DecorativeFloorsDetailContent = () => {
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
              placeholder="ej. 150"
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
            placeholder={systemName || "ej. Decorativo, terrazo, metalizado..."}
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

  // Productos/servicios basados en CATEGORIA_3_DEKORATYVNI_PIDLOHY.md
  const products = [
    {
      id: 'tiendas',
      icon: Store,
      title: 'Tiendas y Boutiques',
      subtitle: 'Sistemas decorativos para espacios comerciales',
      image: tiendasImage,
      description: 'Pisos decorativos con efecto WOW para tiendas que quieren destacar y crear una experiencia única',
      problems: [
        'Potreба у WOW-ефекті для клієнтів',
        'Altos requisitos estéticos',
        'Flujo intenso de visitantes',
        'Deseo de destacar entre competidores',
        'Resistencia al tráfico constante'
      ],
      solutions: [
        'Hermoso efecto decorativo con agregado de cuarzo',
        'Cada piso es único - no hay dos iguales',
        'Soporta flujo intenso de visitantes',
        'Fácil de limpiar - siempre se ve limpio',
        'Efecto WOW - los clientes recuerdan la tienda'
      ],
      systems: [
        {
          name: 'EpoxiArte M² Classic',
          badge: 'MEJOR PARA TIENDAS',
          description: 'Decorativo con cuarzo 4mm',
          basedOn: 'Peran STB Classic',
          thickness: '4mm',
          curing: 'Aplicación manual especializada',
          impact: 'Clase IR4',
          durability: '>15 años',
          repair: 'Excelente reparabilidad',
          price: '55-80 €/m²',
          whyBest: [
            'Hermoso efecto decorativo con agregado de cuarzo',
            'Cada piso es único - no hay dos iguales',
            'Soporta flujo intenso de visitantes',
            'Fácil de limpiar - siempre se ve limpio',
            'Efecto WOW - los clientes recuerdan la tienda'
          ],
          finish: 'Textura natural con cuarzo multicolor',
          protection: 'Top-coat transparente EpoxiCristal M² Transparente',
          effects: [
            'Imitación mármol',
            'Incrustaciones multicolor (como terrazo)',
            'Reflejos metálicos',
            'Diseños individualizados'
          ],
          colors: 'Efectos disponibles: mármol, terrazo, metálicos, personalizados',
          applications: [
            'Tiendas de moda y calzado',
            'Boutiques exclusivas',
            'Joyerías y relojerías',
            'Tiendas de decoración'
          ]
        },
        {
          name: 'EpoxiArte M² Compact',
          badge: 'PARA BOUTIQUES ECONÓMICO',
          description: 'Decorativo compacto 3mm',
          basedOn: 'Peran STB Compact',
          thickness: '3mm',
          curing: 'Llana mecánica (más rápido)',
          traffic: 'Tráfico comercial intenso',
          maintenance: 'Mantenimiento fácil',
          price: '43-65 €/m²',
          whyBest: [
            'Más económico que Classic, pero igualmente hermoso',
            'Instalación más rápida',
            'Superficie lisa con incrustaciones decorativas',
            'Fácil de limpiar'
          ],
          finish: 'Superficie lisa con incrustaciones decorativas',
          colors: 'Mismos efectos que Classic',
          savings: 'Ahorro del 15-20% vs Classic con aspecto similar',
          applications: [
            'Boutiques con presupuesto ajustado',
            'Tiendas de cadena',
            'Espacios comerciales medianos',
            'Renovaciones rápidas'
          ]
        }
      ]
    },
    {
      id: 'autosalones',
      icon: Car,
      title: 'Autosalones',
      subtitle: 'Sistemas premium para showrooms automotrices',
      image: autosalonesImage,
      description: 'Pisos decorativos con efecto espejo que hacen que los vehículos se vean más lujosos y atractivos',
      problems: [
        'Necesidad de aspecto premium (vendemos autos caros)',
        'Manchas de neumáticos en el piso',
        'Los reflejos del piso deben realzar la belleza del auto',
        'Grandes superficies - se necesita velocidad',
        'Durabilidad con movimiento constante de vehículos'
      ],
      solutions: [
        'Aspecto luxury - realza el estatus de los autos',
        'Brillo espejo - los automóviles se ven aún mejor',
        'Resistencia a marcas de neumáticos',
        'Fácil eliminación de manchas de aceites',
        'Durabilidad 15+ años'
      ],
      systems: [
        {
          name: 'EpoxiArte M² Classic + Mirror Effect',
          badge: 'PREMIUM PARA SHOWROOMS',
          description: 'Efecto "piso espejo"',
          basedOn: 'Peran STB Classic + EpoxiCristal M²',
          thickness: '4mm + acabado espejo',
          curing: 'Aplicación especializada + pulido',
          layers: '1. Base EpoxiArte M² Classic 4mm + 2. EpoxiCristal M² Transparente (2-3 capas) + 3. Pulido a brillo espejo',
          result: 'Los automóviles se reflejan en el piso',
          price: '65-95 €/m²',
          whyBest: [
            'Efecto espejo - los autos se ven 20% más caros',
            'Aspecto premium - los clientes sienten lujo',
            'Fácil limpiar marcas de neumáticos',
            'Resistente a aceites y fluidos',
            'Durabilidad excepcional'
          ],
          finish: 'Brillo espejo con reflejo perfecto',
          colors: 'Opciones populares para autosalones',
          colorOptions: [
            'Negro brillante - máximo efecto espejo',
            'Gris oscuro con incrustaciones metálicas - luxury moderno',
            'Gris claro brillante - el espacio parece más grande'
          ],
          applications: [
            'Showrooms de autos premium',
            'Concesionarios de lujo',
            'Exposiciones automotrices',
            'Salones de motos exclusivos'
          ]
        },
        {
          name: 'EpoxiTerrazo M²',
          badge: 'PARA SALONES EXCLUSIVOS',
          description: 'Imitación terrazo pulido',
          basedOn: 'Mondéco',
          thickness: '3-5mm',
          curing: 'Pulido mecánico espejo',
          design: 'Diseños personalizados',
          aggregate: 'Mármol, granito, vidrio',
          price: '55-80 €/m²',
          whyBest: [
            'Efecto de terrazo natural',
            'Se puede integrar el logo de la marca',
            'Diseño único bajo colores corporativos',
            'Máximo luxury'
          ],
          finish: 'Terrazo pulido con agregados exclusivos',
          personalization: [
            'Logo de marca de auto en el piso',
            'Colores corporativos',
            'Agregados exclusivos (mármol, granito)',
            'Diseños únicos'
          ],
          applications: [
            'Concesionarios exclusivos',
            'Showrooms de marcas premium',
            'Espacios VIP automotrices',
            'Salones de autos clásicos'
          ]
        }
      ]
    },
    {
      id: 'hoteles',
      icon: Hotel,
      title: 'Hoteles y Restaurantes',
      subtitle: 'Sistemas elegantes para espacios de hospitalidad',
      image: hotelesImage,
      description: 'Pisos decorativos de lujo que crean la primera impresión perfecta y soportan alto tráfico',
      problems: [
        'Necesidad de diseño exquisito',
        'Altas cargas (cientos de personas diariamente)',
        'Facilidad de limpieza',
        'Resistencia a derrames (vino, comida, bebidas)',
        'Diferentes zonas - diferentes requisitos'
      ],
      solutions: [
        'Aspecto elegante de piedra natural',
        'Pulido espejo - lujo',
        'Soporta miles de huéspedes',
        'No se desgasta por años',
        'Se ve como un millón, cuesta 3-4 veces menos'
      ],
      systems: [
        {
          name: 'EpoxiTerrazo M²',
          badge: 'MEJOR PARA LOBBIES DE HOTEL',
          description: 'Imitación terrazo veneciano clásico',
          basedOn: 'Mondéco',
          thickness: '3-5mm',
          curing: 'Pulido mecánico espejo',
          design: 'Completamente personalizado',
          traffic: 'Clase 33 (máximo para tráfico intenso)',
          price: '55-80 €/m²',
          whyBest: [
            'Se ve como terrazo veneciano auténtico',
            'Cuesta 4 veces menos que piedra natural',
            'Instalación más rápida (7-10 días vs 30 días piedra)',
            'Se puede integrar el logo del hotel',
            'Soporta maletas con ruedas'
          ],
          finish: 'Pulido mecánico con diamante a brillo espejo',
          designs: [
            'Terrazo veneciano clásico (blanco + mármol)',
            'Terrazo moderno (negro + incrustaciones blancas)',
            'Terrazo colorido (según estilo del interior)',
            'Con logo del hotel integrado'
          ],
          aggregates: 'Mármol, granito, vidrio a elección',
          sealing: 'Impregnante protector para durabilidad',
          applications: [
            'Lobbies de hoteles 5 estrellas',
            'Recepción y áreas VIP',
            'Restaurantes fine dining',
            'Espacios de eventos exclusivos'
          ]
        },
        {
          name: 'EpoxiArte M² Classic',
          badge: 'PARA RESTAURANTES',
          description: 'Sistema decorativo para zonas gastronómicas',
          basedOn: 'Peran STB Classic',
          thickness: '4mm',
          curing: 'Aplicación especializada',
          zones: 'Diferentes acabados por zona',
          price: '55-80 €/m²',
          whyBest: [
            'Aspecto hermoso - crea atmósfera',
            'Fácil eliminación de manchas de vino, salsas',
            'Resistente a caída de platos',
            'Se lava sin esfuerzo',
            'Antideslizante incluso húmedo'
          ],
          finish: 'Decorativo con agregados de cuarzo',
          zoneApplication: [
            'Salón de huéspedes - EpoxiArte M² Classic (hermoso)',
            'Junto a barra - EpoxiArte M² Aqua (antideslizante)',
            'Terraza - EpoxiCubierta M² (resistente humedad)'
          ],
          styles: [
            'Restaurante Loft - Gris con incrustaciones metálicas',
            'Clásico - Beige con agregados de mármol',
            'Moderno - Monocromo con brillo',
            'Eco-style - Tonos naturales con piedra'
          ],
          applications: [
            'Salones de restaurantes',
            'Áreas de bar y cocktail',
            'Terrazas cubiertas',
            'Espacios gastronómicos'
          ]
        }
      ]
    },
    {
      id: 'oficinas',
      icon: Building,
      title: 'Oficinas',
      subtitle: 'Sistemas modernos para espacios corporativos',
      image: oficinasImage,
      description: 'Pisos decorativos profesionales que crean un ambiente de trabajo moderno y productivo',
      problems: [
        'Necesidad de aspecto moderno',
        'Resistencia a sillas de oficina con ruedas',
        'Facilidad de limpieza',
        'Colores corporativos y estilo',
        'Open space - grandes áreas sin juntas'
      ],
      solutions: [
        'Diseño minimalista moderno',
        'Superficie lisa - las sillas ruedan fácilmente',
        'Espacios sin juntas - visualmente agranda la oficina',
        'Limpieza diaria fácil',
        'No acumula polvo (como alfombras)'
      ],
      systems: [
        {
          name: 'EpoxiArte M² Compact',
          badge: 'PARA OFICINAS MODERNAS',
          description: 'Diseño minimalista contemporáneo',
          basedOn: 'Peran STB Compact',
          thickness: '3mm',
          curing: 'Aplicación mecánica rápida',
          surface: 'Lisa para sillas con ruedas',
          maintenance: 'Limpieza diaria sencilla',
          price: '43-65 €/m²',
          whyBest: [
            'Diseño minimalista moderno',
            'Superficie lisa - las sillas ruedan fácilmente',
            'Espacios sin juntas - visualmente agranda la oficina',
            'Limpieza diaria fácil',
            'No acumula polvo (como alfombras)'
          ],
          finish: 'Lisa con incrustaciones decorativas discretas',
          solutions: [
            'Gris claro + incrustaciones blancas (minimalismo)',
            'Gris oscuro mate (premium)',
            'Beige (cálido y acogedor)',
            'Colores corporativos personalizados'
          ],
          applications: [
            'Oficinas open space',
            'Salas de juntas',
            'Áreas de recepción',
            'Espacios coworking'
          ]
        },
        {
          name: 'EpoxiLiso M² Autonivelante',
          badge: 'PARA SALAS VIP',
          description: 'Acabado perfectamente liso',
          basedOn: 'Sistemas Autonivelantes',
          thickness: '1-4mm',
          curing: 'Instalación rápida (1-2 días)',
          surface: 'Superficie espejo perfectamente lisa',
          colors: 'Cualquier color RAL',
          price: '16-25 €/m²',
          whyBest: [
            'Superficie espejo perfectamente lisa',
            'Cualquier color RAL disponible',
            'Instalación rápida (1-2 días)',
            'Espesor mínimo (1-4mm) - no cambia nivel del piso',
            'Ideal para renovaciones'
          ],
          finish: 'Perfectamente liso sin texturas',
          applications: [
            'Salas de juntas VIP',
            'Oficinas ejecutivas',
            'Salas de presentaciones',
            'Áreas de recepción premium'
          ],
          advantages: [
            'Renovación sin cambiar puertas',
            'Instalación durante fin de semana',
            'Mínima interrupción del trabajo',
            'Resultado profesional inmediato'
          ]
        }
      ]
    },
    {
      id: 'viviendas',
      icon: Home,
      title: 'Viviendas Exclusivas',
      subtitle: 'Sistemas únicos para hogares de lujo',
      image: viviendasImage,
      description: 'Pisos decorativos exclusivos que convierten su hogar en una obra de arte única',
      problems: [
        'Diseño único (no como todos)',
        'Practicidad + belleza',
        'Alergia al polvo de alfombras',
        'Suelos radiantes (compatibilidad)',
        'Durabilidad sin renovación'
      ],
      solutions: [
        'Se ve como piedra natural por precio 4 veces menor',
        'Diseño individual según interior',
        'Hipoalergénico (sin polvo)',
        'Compatible con suelo radiante',
        'Limpieza fácil - ideal para familias con niños'
      ],
      systems: [
        {
          name: 'EpoxiTerrazo M²',
          badge: 'EXCLUSIVO PARA VIP',
          description: 'Imitación terrazo pulido premium',
          basedOn: 'Mondéco',
          thickness: '3-5mm',
          curing: 'Pulido mecánico con diamante',
          design: 'Individual según interior',
          heating: 'Compatible con suelo radiante',
          price: '55-80 €/m²',
          whyBest: [
            'Se ve como piedra natural por precio 4 veces menor',
            'Diseño individual según interior',
            'Hipoalergénico (sin polvo)',
            'Compatible con suelo radiante',
            'Limpieza fácil - ideal para familias con niños'
          ],
          finish: 'Pulido espejo con agregados naturales',
          designOptions: [
            'Terrazo veneciano (clásico)',
            'Minimalista moderno',
            'Colorido según interior',
            'Con incrustaciones de mármol, granito, vidrio'
          ],
          rooms: [
            'Salones y halls',
            'Cocinas-estudio',
            'Baños de lujo',
            'Terrazas y balcones'
          ],
          applications: [
            'Viviendas unifamiliares de lujo',
            'Áticos y penthouses',
            'Casas de campo exclusivas',
            'Residencias de diseño'
          ]
        },
        {
          name: 'EpoxiArte M² Classic',
          badge: 'PARA VIVIENDAS MODERNAS',
          description: 'Decorativo contemporáneo',
          basedOn: 'Peran STB Classic',
          thickness: '4mm',
          curing: 'Aplicación artesanal',
          comfort: 'No frío (como baldosas)',
          seamless: 'Sin juntas - moderno',
          price: '55-80 €/m²',
          whyBest: [
            'Hermoso efecto decorativo',
            'Práctico y duradero',
            'No frío (como baldosas)',
            'Sin juntas ni uniones - moderno',
            'Se pueden combinar colores por habitaciones'
          ],
          finish: 'Decorativo con agregados de cuarzo',
          combinations: [
            'Salón - Gris elegante con cuarzo',
            'Cocina - Beige práctico',
            'Dormitorios - Tonos cálidos',
            'Baños - Colores frescos'
          ],
          applications: [
            'Apartamentos modernos',
            'Lofts y estudios',
            'Casas contemporáneas',
            'Renovaciones integrales'
          ]
        }
      ]
    },
    {
      id: 'yates',
      icon: Anchor,
      title: 'Yates y Marinos',
      subtitle: 'Sistemas certificados para entornos marinos',
      image: yatesImage,
      description: 'Pisos decorativos marinos con certificación MED para yates y objetos costeros',
      problems: [
        'Contacto constante con agua marina',
        'La sal destruye recubrimientos normales',
        'Radiación UV del sol',
        'Requisitos de certificación marina',
        'Vibraciones y movimientos (en yates)'
      ],
      solutions: [
        'Certificación marina MED oficial',
        'Resistencia al agua marina y sal',
        'Resistencia UV - no se decolora al sol',
        'Antideslizante incluso mojado',
        'Hermoso aspecto decorativo'
      ],
      systems: [
        {
          name: 'EpoxiArte M² Marino',
          badge: 'ESPECIAL PARA MAR',
          description: 'Certificación marina MED',
          basedOn: 'Peran STB Marine',
          thickness: '4mm',
          curing: 'Sistema multicapa especializado',
          certification: 'Certificación MED (Equipamiento Marino)',
          nonylphenol: 'Sin nonilfenol, sin disolventes',
          seawater: 'Alta resistencia marina',
          price: '50-75 €/m²',
          whyBest: [
            'Certificación marina MED oficial',
            'Resistencia al agua marina y sal',
            'Resistencia UV - no se decolora al sol',
            'Antideslizante incluso mojado',
            'Hermoso aspecto decorativo'
          ],
          finish: 'Textura antideslizante para seguridad en agua',
          applications: [
            'Cubiertas de yates y barcos',
            'Muelles y embarcaderos',
            'Restaurantes costeros',
            'Clubes de playa',
            'Terrazas marinas'
          ],
          safety: 'Antideslizante R11-R13 para máxima seguridad',
          durability: 'Resistente a condiciones marinas extremas'
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
              <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Pisos Decorativos Hermosos
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Acabados exclusivos con efectos metálicos, 3D y diseños personalizados
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-8">
                <p className="text-primary font-semibold">
                  Para: Tiendas, showrooms, hoteles, restaurantes, oficinas, viviendas
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full">
                  ✓ Efectos Metálicos
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  ✓ Diseños 3D
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  ✓ Personalizados
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✓ Únicos e Irrepetibles
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid - Se completará en los siguientes pasos */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nuestras Soluciones Decorativas Premium
              </h2>
              <p className="text-lg text-muted-foreground">
                Sistemas EpoxiArte M² y EpoxiTerrazo M² para espacios exclusivos
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
                      loading="lazy"
                      decoding="async"
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
                        {product.problems.map((problem, idx) => (
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
                        {product.solutions.map((solution, idx) => (
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
                        {product.systems.map((system, idx) => {
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
                                            <span className="text-muted-foreground">Aplicación:</span>
                                            <span className="font-medium">{system.curing}</span>
                                          </div>
                                          {system.durability && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Durabilidad:</span>
                                              <span className="font-medium">{system.durability}</span>
                                            </div>
                                          )}
                                          {system.impact && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Resistencia impactos:</span>
                                              <span className="font-medium">{system.impact}</span>
                                            </div>
                                          )}
                                          {system.certification && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Certificación:</span>
                                              <span className="font-medium">{system.certification}</span>
                                            </div>
                                          )}
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
                                        {system.colors && (
                                          <div>
                                            <span className="text-muted-foreground">Colores: </span>
                                            <span className="font-medium">{system.colors}</span>
                                          </div>
                                        )}
                                        {system.protection && (
                                          <div>
                                            <span className="text-muted-foreground">Protección: </span>
                                            <span className="font-medium">{system.protection}</span>
                                          </div>
                                        )}
                                        {system.savings && (
                                          <div>
                                            <span className="text-muted-foreground">Ahorro: </span>
                                            <span className="font-medium text-green-600">{system.savings}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Effects (for decorative systems) */}
                                    {system.effects && (
                                      <div className="mt-6 pt-4 border-t">
                                        <h6 className="font-semibold text-foreground mb-3">Efectos Disponibles:</h6>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                          {system.effects.map((effect, effectIdx) => (
                                            <li key={effectIdx} className="flex items-center text-muted-foreground">
                                              <Sparkles className="w-3 h-3 text-primary mr-2" />
                                              {effect}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {/* Applications */}
                                    {system.applications && (
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
                            Solicitar Presupuesto Decorativo
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

        {/* System Selection Guide */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  ¿Qué Sistema Elegir?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Guía rápida para seleccionar el sistema Epoxi M² ideal para su proyecto decorativo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para tienda de ropa/calzado:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiArte M² Compact</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(hermoso + económico)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para autosalón premium:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiArte M² Classic</span>
                  </div>
                  <p className="text-xs text-muted-foreground">+ acabado espejo</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para hotel 5 estrellas:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiTerrazo M²</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(máximo lujo)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para oficina moderna:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiArte M² Compact</span>
                  </div>
                  <p className="text-xs text-muted-foreground">o EpoxiLiso M²</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para restaurante:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiArte M² Classic</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(salón) + EpoxiArte M² Aqua (bar)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para vivienda de lujo:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiTerrazo M²</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(salón) + EpoxiArte M² (otras habitaciones)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para yate/muelle:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiArte M² Marino</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(certificación marina)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para galería de arte:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiLiso M² Autonivelante</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(minimalismo neutral)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para centro comercial:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiTerrazo M²</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(atrios) + EpoxiArte M² Compact (pasillos)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services for Decorative Projects */}
        <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Servicios Adicionales para Proyectos Decorativos
                </h2>
                <p className="text-lg text-muted-foreground">
                  Servicios profesionales especializados incluidos en todos nuestros proyectos premium
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Design and Visualization */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Diseño y Visualización</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Visualización 3D del futuro piso
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Selección de colores y efectos
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Muestras 30x30cm para aprobación
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Consultoría de diseñador
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Exclusive Options */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Opciones Exclusivas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Logos y gráficos integrados
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Combinaciones de varios sistemas
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Colores y efectos no estándar
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Soluciones artísticas a medida
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Protection and Care */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Protección y Cuidado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Recubrimientos protectores para durabilidad
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Instrucciones de cuidado
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Productos especiales de limpieza
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Pulido periódico (para terrazo)
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Calidad Premium</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Hasta 15 años en recubrimiento
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Inspección gratuita al año
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Reparación de daños
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Pulido por pérdida de brillo
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Free Designer Consultation Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Consulta Gratuita de Diseñador
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                ¿No sabe qué diseño elegir para su proyecto?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Lo que incluye:</h3>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Visita de diseñador al objeto
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Visualización 3D de variantes
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Muestras de recubrimientos
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Selección según interior
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Cálculo de costo
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Contacto directo:</h3>
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
                          window.open('https://wa.me/34622313855?text=Hola, necesito consulta gratuita de diseñador para pisos decorativos. ¿Podrían visitarme?', '_blank');
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Consulta Diseñador
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-2 text-black">
                  ¡Transformaremos su piso en una obra de arte!
                </h3>
                <p className="text-black/80 mb-4">
                  Nuestros expertos le ayudarán a elegir la solución perfecta para crear espacios únicos
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90 hover:text-black">
                      Solicitar Presupuesto Decorativo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Solicitar Presupuesto - Pisos Decorativos</DialogTitle>
                    </DialogHeader>
                    <QuoteForm productTitle="Pisos Decorativos Hermosos" />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Ejemplos de Proyectos Decorativos Realizados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Autosalón Mercedes 600 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiArte M² Classic + EpoxiCristal M² (3 capas)</li>
                      <li><strong>Color:</strong> Negro brillante espejo</li>
                      <li><strong>Efecto:</strong> Los automóviles se reflejan en el piso</li>
                      <li><strong>Tiempo:</strong> 6 días</li>
                      <li><strong>Resultado:</strong> "¡Los clientes fotografían el piso!"</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hotel Boutique 400 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiTerrazo M² (lobby) + EpoxiArte M² Classic (pasillos)</li>
                      <li><strong>Diseño:</strong> Mármol blanco Carrara</li>
                      <li><strong>Elementos:</strong> Bandas divisorias de latón, logo del hotel</li>
                      <li><strong>Resultado:</strong> Se ve como palacio italiano</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Restaurante Fine Dining 250 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiArte M² Classic</li>
                      <li><strong>Color:</strong> Gris oscuro con incrustaciones blancas</li>
                      <li><strong>Acabado:</strong> Mate (no refleja)</li>
                      <li><strong>Resultado:</strong> Elegante y estiloso</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Apartamento de Lujo 180 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiTerrazo M² (salón) + EpoxiArte M² Aqua (baño)</li>
                      <li><strong>Diseño:</strong> Terrazo veneciano mármol blanco</li>
                      <li><strong>Compatibilidad:</strong> Suelo radiante</li>
                      <li><strong>Resultado:</strong> "¡Los invitados piensan que es piedra natural!"</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Galería de Arte Moderno 350 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiLiso M² Autonivelante</li>
                      <li><strong>Color:</strong> Gris claro mate RAL 7035</li>
                      <li><strong>Acabado:</strong> Perfectamente liso sin brillo</li>
                      <li><strong>Resultado:</strong> Fondo neutral para exposiciones</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Oficina Corporativa 500 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiArte M² Compact</li>
                      <li><strong>Color:</strong> Gris claro + incrustaciones blancas</li>
                      <li><strong>Tiempo:</strong> 3 días (fin de semana)</li>
                      <li><strong>Resultado:</strong> Espacio moderno y profesional</li>
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

const DecorativeFloorsDetail = () => (
  <LanguageProvider>
    <DecorativeFloorsDetailContent />
  </LanguageProvider>
);

export default DecorativeFloorsDetail;
