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
import { ArrowLeft, CheckCircle, Phone, MessageCircle, Car, Building, Wrench, Droplets, ChevronDown, ChevronUp, Star, Home, ParkingCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const GaragesParkingDetailContent = () => {
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
              placeholder="ej. 25"
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
            placeholder={systemName || "ej. Antideslizante, impermeable, decorativo..."}
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

  // Productos/servicios basados en CATEGORIA_4_GARAZHI_PARKINGY.md
  const products = [
    {
      id: 'residenciales',
      icon: Home,
      title: 'Garajes Residenciales',
      subtitle: 'Sistemas para garajes domésticos y privados',
      image: '/assets/project-metallic-garage.jpg',
      description: 'Pisos económicos para garajes domésticos que eliminan el polvo y resisten aceites',
      problems: [
        'Pil del piso de hormigón (coche siempre gris)',
        'Manchas de aceite y gasolina que no se limpian',
        'Hormigón se desmorona y deteriora',
        'Aspecto feo del garaje viejo',
        'Querer hacer "como el vecino, pero mejor"'
      ],
      solutions: [
        'Ya NO produce polvo - coche limpio',
        'Manchas de aceite se limpian fácilmente',
        'Aspecto hermoso - garaje como de revista',
        'Fácil de lavar con manguera',
        'Montaje rápido 1-2 días',
        'Precio accesible desde 13€/m²'
      ],
      systems: [
        {
          name: 'EpoxiGarage M² Residencial',
          badge: 'MEJOR PARA GARAJES DOMÉSTICOS',
          description: 'Para garajes domésticos',
          basedOn: 'Flowcoat SF41',
          thickness: '0.3-0.5mm',
          curing: '24h peatonal, 48h vehículos',
          resistance: 'Aceites y combustibles',
          application: 'Rodillo o brocha (¡fácil!)',
          durability: '5-8 años',
          price: '13-20 €/m²',
          whyBest: [
            'PRECIO ACCESIBLE - desde 13€/m² con trabajo',
            'Ya NO produce polvo - coche limpio',
            'Manchas de aceite se limpian fácilmente',
            'Aspecto hermoso - garaje como de revista',
            'Fácil de lavar con manguera',
            'Montaje rápido 1-2 días'
          ],
          finish: 'Liso brillante o mate',
          colors: 'Gris RAL 7035 (clásico), gris oscuro RAL 7024, verde, azul',
          includes: [
            'Preparación superficie (lijado)',
            'Imprimación EpoxiBase M² Imprimación',
            '2 capas EpoxiGarage M² Residencial',
            'Protección esquinas y umbrales'
          ]
        },
        {
          name: 'EpoxiArte M² Classic',
          badge: 'GARAJE PREMIUM',
          description: 'Para coches coleccionistas',
          basedOn: 'Peran STB Classic',
          thickness: '4mm',
          curing: '24 horas',
          decorative: 'Efecto decorativo con cuarzo',
          mirror: 'Posible efecto espejo',
          price: '55-80 €/m²',
          whyBest: [
            'Parece showroom de coches',
            'Efecto decorativo con cuarzo',
            'Recubrimiento más grueso (4mm) = más duradero',
            'Se puede hacer efecto espejo',
            'Garaje se convierte en parte de la casa'
          ],
          finish: 'Decorativo con agregados de cuarzo',
          colors: 'Personalizable con efectos especiales',
          options: [
            'Recubrimiento espejo EpoxiCristal M² Transparente',
            'Logo marca coche favorita en el piso',
            'Marcado para cada coche'
          ]
        }
      ]
    },
    {
      id: 'multipisos',
      icon: Building,
      title: 'Parkings de Varios Pisos',
      subtitle: 'Sistemas para parkings comerciales en cubiertas',
      image: '/assets/project-warehouse-before-after.jpg',
      description: 'Sistemas impermeables para parkings en cubiertas con garantía vitalicia',
      problems: [
        'Filtración de agua a pisos inferiores',
        'Deterioro del hormigón por sal en invierno',
        'Grietas por cambios de temperatura',
        'Manchas y suciedad - aspecto descuidado',
        'Rampas resbaladizas peligrosas'
      ],
      solutions: [
        'IMPERMEABILIZACIÓN TOTAL - agua no filtra abajo',
        'Resistencia a sal invernal (reactivos antihielo)',
        'Elástico - no se agrieta con movimiento del hormigón',
        'Resistente UV - no se decolora al sol',
        'Durabilidad 15-20 años'
      ],
      systems: [
        {
          name: 'EpoxiCubierta M²',
          badge: 'ESTÁNDAR PARA CUBIERTAS',
          description: 'Impermeabilización parkings',
          basedOn: 'Deckshield',
          thickness: '2.5-4mm',
          curing: '24-48 horas',
          waterproof: '100% garantizada',
          wear: 'Resistente a neumáticos/cadenas',
          elasticity: 'Se adapta a movimientos del hormigón',
          uv: 'Resistencia UV total',
          price: '30-43 €/m²',
          whyBest: [
            'IMPERMEABILIZACIÓN TOTAL - agua no filtra abajo',
            'Resistencia a sal invernal (reactivos antihielo)',
            'Elástico - no se agrieta con movimiento del hormigón',
            'Resistente UV - no se decolora al sol',
            'Durabilidad 15-20 años'
          ],
          finish: 'Poliuretano alifático resistente UV',
          system: [
            'Imprimación: Epoxi penetrante',
            'Membrana: Poliuretano elástico (impermeable)',
            'Protección: Agregados cuarzo antideslizantes',
            'Acabado: Poliuretano alifático (resistente UV)',
            'Drenaje: Desagües integrados y pendientes'
          ],
          applications: [
            'Parking en cubierta transitable',
            'Parkings de varios pisos',
            'Parkings subterráneos con riesgo filtración',
            'Terrazas-parking'
          ]
        },
        {
          name: 'EpoxiCubierta M² Express',
          badge: 'REPARACIÓN URGENTE',
          description: 'Sistema rápido',
          basedOn: 'Deckshield Rapide',
          thickness: '2.5-4mm',
          curing: 'Curado acelerado',
          speed: 'Reducido tiempo aplicación',
          waterproof: 'Impermeabilización rápida',
          service: 'Puesta en servicio acelerada',
          price: '34-48 €/m²',
          whyBest: [
            'Más rápido 30-40% que Deckshield estándar',
            'Se puede abrir parking en 24 horas',
            'Misma calidad que sistema estándar',
            'Ideal para reparación por zonas'
          ],
          finish: 'Mismas prestaciones que EpoxiCubierta M² estándar',
          when: [
            'Parking no se puede cerrar mucho tiempo',
            'Reparación urgente de filtraciones',
            'Trabajos estacionales (hay que terminar antes del invierno)',
            'Mínimas molestias a residentes'
          ]
        }
      ]
    },
    {
      id: 'talleres',
      icon: Wrench,
      title: 'Talleres y Autoservicios',
      subtitle: 'Sistemas para talleres mecánicos y cambio de aceite',
      image: '/assets/project-industrial-blue-gray.jpg',
      description: 'Pisos resistentes para talleres con equipos pesados y derrames constantes de aceites',
      problems: [
        'Manchas constantes de aceite, gasolina, lubricantes',
        'Equipos pesados (elevadores, prensas)',
        'Caída de herramientas',
        'Suciedad de ruedas de clientes',
        'Dificultad de limpieza'
      ],
      solutions: [
        'Soporta elevadores pesados',
        'Lubricante no se absorbe - fácil de limpiar',
        'Resistente a caída de herramientas',
        'Reparación rápida si se daña',
        'No produce polvo - limpio en el box'
      ],
      systems: [
        {
          name: 'EpoxiRápido M²',
          badge: 'PARA ZONAS DE TRABAJO',
          description: 'Sistema curado rápido',
          basedOn: 'Flowfast',
          thickness: '3-4mm',
          curing: '8-12 horas',
          oils: 'Excelente resistencia aceites',
          impact: 'Alta resistencia impactos',
          cleaning: 'Limpieza máxima',
          price: '20-30 €/m²',
          whyBest: [
            'Soporta elevadores pesados',
            'Lubricante no se absorbe - fácil de limpiar',
            'Resistente a caída de herramientas',
            'Reparación rápida si se daña',
            'No produce polvo - limpio en el box'
          ],
          finish: 'Antideslizante (seguridad mecánicos)',
          colors: 'Normalmente gris (práctico)',
          applications: [
            'Boxes de trabajo',
            'Zonas de elevadores',
            'Áreas de cambio aceite',
            'Talleres mecánicos generales'
          ]
        },
        {
          name: 'EpoxiForte M² Industrial',
          badge: 'REPARACIÓN PESADA',
          description: 'Para zonas neumáticos y reparación pesada',
          basedOn: 'Flowscreed',
          thickness: '6mm',
          curing: '24 horas',
          strength: 'Máxima resistencia equipos pesados',
          slip: 'Antideslizante - seguridad',
          impact: 'Resistente a impactos',
          price: '34-48 €/m²',
          whyBest: [
            'Máxima resistencia bajo equipos pesados',
            'Antideslizante - seguridad',
            'Resistente a impactos',
            'Espesor 6mm - confiable'
          ],
          finish: 'Rugoso antideslizante con agregados cuarzo',
          applications: [
            'Zonas neumáticos',
            'Reparación pesada',
            'Bajo equipos muy pesados',
            'Áreas alta actividad'
          ]
        },
        {
          name: 'EpoxiGarage M² Residencial',
          badge: 'ZONA RECEPCIÓN/ENTREGA',
          description: 'Para parte oficina del taller',
          basedOn: 'Flowcoat SF41',
          thickness: '0.5mm',
          curing: '24 horas',
          appearance: 'Aspecto hermoso - clientes contentos',
          cleaning: 'Fácil de limpiar',
          economic: 'Económico',
          fast: 'Montaje rápido',
          price: '13-20 €/m²',
          whyBest: [
            'Aspecto hermoso - clientes contentos',
            'Fácil de limpiar',
            'Económico',
            'Montaje rápido'
          ],
          finish: 'Liso brillante',
          applications: [
            'Zona recepción clientes',
            'Oficina del taller',
            'Sala de espera',
            'Zona entrega vehículos'
          ]
        }
      ]
    },
    {
      id: 'lavaderos',
      icon: Droplets,
      title: 'Autolavados',
      subtitle: 'Sistemas para lavaderos de coches y autolavados',
      image: '/assets/project-decorative-white-black.jpg',
      description: 'Pisos antideslizantes para autolavados con agua constante y productos químicos',
      problems: [
        'Agua constante y productos de limpieza',
        'Química agresiva para autolavado',
        'Resbaladizo - peligroso para trabajadores',
        'Necesidad de pendientes para drenaje de agua',
        'Resistencia a alta presión de agua'
      ],
      solutions: [
        'NO resbaladizo incluso con agua + champú',
        'Impermeable - agua no se filtra',
        'Pendientes integradas hacia desagües (1-2%)',
        'Resistente a química agresiva de autolavado',
        'Soporta lavado a alta presión'
      ],
      systems: [
        {
          name: 'EpoxiArte M² Aqua',
          badge: 'ESPECIAL PARA AUTOLAVADOS',
          description: 'Para zonas húmedas',
          basedOn: 'Peran STB Wet Areas',
          thickness: '5mm',
          curing: '24 horas',
          slip: 'R11-R13 (¡máximo!)',
          waterproof: 'Total',
          chemicals: 'Resistente autolavado y detergentes',
          texture: 'Rugosidad controlada',
          price: '40-60 €/m²',
          whyBest: [
            'NO resbaladizo incluso con agua + champú',
            'Impermeable - agua no se filtra',
            'Pendientes integradas hacia desagües (1-2%)',
            'Resistente a química agresiva de autolavado',
            'Soporta lavado a alta presión'
          ],
          finish: 'Rugoso antideslizante máximo',
          elements: [
            'Pendientes hacia desagües (integradas)',
            'Esquinas redondeadas junto a paredes (radio 100mm)',
            'Textura antideslizante en toda el área',
            'Sellado juntas Sellador M² Híbrido'
          ],
          applications: [
            'Autolavados manuales',
            'Túneles de lavado',
            'Zonas de encerado',
            'Áreas de secado'
          ]
        },
        {
          name: 'EpoxiCubierta M²',
          badge: 'AUTOLAVADOS EXTERIORES',
          description: 'Para autolavados al aire libre',
          basedOn: 'Deckshield',
          thickness: '3-4mm',
          curing: '24-48 horas',
          uv: 'Resistente UV - no se deteriora al sol',
          frost: 'Resistente heladas - soporta invierno',
          waterproof: 'Impermeable',
          chemicals: 'No se deteriora por química',
          price: '30-43 €/m²',
          whyBest: [
            'Resistente UV - no se deteriora al sol',
            'Resistente heladas - soporta invierno',
            'Impermeable',
            'No se deteriora por química'
          ],
          finish: 'Poliuretano alifático resistente intemperie',
          applications: [
            'Autolavados autoservicio exteriores',
            'Estaciones lavado 24h',
            'Zonas lavado camiones',
            'Lavaderos industriales'
          ]
        }
      ]
    },
    {
      id: 'subterraneos',
      icon: Building,
      title: 'Parkings Subterráneos',
      subtitle: 'Sistemas para parkings de comunidades residenciales',
      image: '/assets/project-industrial-yellow.jpg',
      description: 'Soluciones económicas para parkings subterráneos que eliminan polvo y mejoran iluminación',
      problems: [
        'Humedad y ambiente húmedo',
        'Eflorescencias en hormigón',
        'Polvo y suciedad de coches',
        'Mala iluminación - necesita piso claro',
        'Residentes se quejan del estado del parking'
      ],
      solutions: [
        'Ya no produce polvo',
        'Protege hormigón de deterioro',
        'Colores claros - mejor iluminación',
        'Fácil de lavar',
        'Precio económico desde 10€/m²'
      ],
      systems: [
        {
          name: 'EpoxiCoat M² Estándar',
          badge: 'SOLUCIÓN ECONÓMICA',
          description: 'Protección básica',
          basedOn: 'Flowcoat Standard',
          thickness: '0.2-0.4mm (recubrimiento fino)',
          curing: '16-24 horas',
          resistance: 'Aceites y químicos suaves',
          application: 'Simple con rodillo',
          lifetime: '5-8 años',
          price: '10-16 €/m²',
          whyBest: [
            'BARATO - desde 10€/m²',
            'Ya no produce polvo',
            'Protege hormigón de deterioro',
            'Colores claros - mejor iluminación',
            'Fácil de lavar'
          ],
          finish: 'Liso con rodillo',
          colors: 'Gris claro (refleja luz, parece más luminoso)',
          ideal: [
            'Parkings subterráneos pequeños',
            'Proyectos con presupuesto limitado',
            'Parkings viejos (renovación cosmética)',
            'Comunidades con presupuesto limitado'
          ]
        },
        {
          name: 'EpoxiCubierta M²',
          badge: 'IMPERMEABILIZACIÓN TOTAL',
          description: 'Cuando se necesita impermeabilización total',
          basedOn: 'Deckshield',
          thickness: '2.5-4mm',
          curing: '24-48 horas',
          waterproof: 'Impermeabilización total',
          protection: 'Protección humedad arriba y abajo',
          elasticity: 'Elástico - no se agrieta',
          durability: 'Durabilidad máxima',
          price: '30-43 €/m²',
          whyBest: [
            'Impermeabilización total',
            'Protección humedad arriba y abajo',
            'Elástico - no se agrieta',
            'Durabilidad máxima'
          ],
          finish: 'Sistema multicapa impermeable',
          when: [
            'Sobre parking hay apartamentos residenciales',
            'Hay filtraciones desde arriba',
            'Humedad alta',
            'Se necesita durabilidad 15+ años'
          ]
        }
      ]
    },
    {
      id: 'comerciales',
      icon: ParkingCircle,
      title: 'Parkings Comerciales Grandes',
      subtitle: 'Sistemas para parkings de centros comerciales y grandes superficies',
      image: '/assets/project-warehouse-before-after.jpg',
      description: 'Sistemas de montaje rápido por zonas para parkings comerciales de gran superficie',
      problems: [
        'Áreas grandes (5,000-20,000+ m²)',
        'No se puede cerrar todo el parking',
        'Tráfico intensivo 24/7',
        'Filtración agua a niveles inferiores',
        'Rampas acceso muy resbaladizas en invierno'
      ],
      solutions: [
        'Trabajo POR ZONAS - parking no se cierra completamente',
        'Rápido - zona lista en 1-2 días',
        'Mínimas pérdidas por cierre de plazas',
        'Se puede trabajar de noche',
        'Impermeabilización garantizada'
      ],
      systems: [
        {
          name: 'EpoxiCubierta M² Express',
          badge: 'PARA PARKINGS GRANDES',
          description: 'Sistema rápido',
          basedOn: 'Deckshield Rapide',
          thickness: '2.5-4mm',
          curing: 'Curado acelerado',
          service: 'Se puede abrir en 24 horas',
          waterproof: 'Impermeabilización total',
          durability: 'Misma durabilidad que estándar',
          price: '34-48 €/m²',
          whyBest: [
            'Trabajo POR ZONAS - parking no se cierra completamente',
            'Rápido - zona lista en 1-2 días',
            'Mínimas pérdidas por cierre de plazas',
            'Se puede trabajar de noche'
          ],
          finish: 'Sistema acelerado mismas prestaciones',
          technology: [
            'Semana 1: Zona A (200 plazas cerradas, 800 funcionan)',
            'Semana 2: Zona B (200 plazas cerradas, 800 funcionan)',
            'Y así sucesivamente...'
          ],
          result: 'Parking funciona todo el tiempo, molestias mínimas'
        },
        {
          name: 'EpoxiSeguro M² Antideslizante',
          badge: 'PARA RAMPAS',
          description: 'Máxima seguridad',
          basedOn: 'Flowsafe',
          thickness: '2-4mm',
          curing: '24 horas',
          slip: 'Coeficiente R12-R13 (¡máximo!)',
          wear: 'Resistencia desgaste Clase AR2',
          visibility: 'Colores de seguridad',
          durability: '>10 años',
          price: '40-60 €/m²',
          whyBest: [
            'NO resbaladizo incluso en invierno con nieve',
            'Seguridad conductores - menos accidentes',
            'Colores brillantes - se ve la rampa',
            'Resistente a frenado constante'
          ],
          finish: 'Máximo antideslizante con agregados especiales',
          colors: [
            'Amarillo (advertencia)',
            'Rojo (zonas stop)',
            'Verde (permiso circulación)'
          ],
          applications: [
            'Rampas de acceso',
            'Zonas antes de salida',
            'Cruces peatonales en parking',
            'Escaleras'
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
              <ParkingCircle className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Pisos para Garajes y Parkings
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Sistemas EpoxiCubierta M² para parkings, cubiertas transitables e impermeabilización
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-8">
                <p className="text-primary font-semibold">
                  Para: Garajes residenciales, parkings de varios pisos, talleres, lavaderos
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✓ Impermeabilización garantizada
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  ✓ Resistente a aceites y gasolina
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  ✓ Montaje rápido
                </div>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  ✓ Garantía vitalicia
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
                Nuestras Soluciones Especializadas para Garajes
              </h2>
              <p className="text-lg text-muted-foreground">
                Sistemas Epoxi M² adaptados para cada tipo de garaje y parking
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

        {/* Additional Services for Garages and Parking */}
        <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Servicios Adicionales para Garajes y Parkings
                </h2>
                <p className="text-lg text-muted-foreground">
                  Servicios profesionales incluidos en todos nuestros proyectos de pavimentos
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Preparation and Installation */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Preparación e Instalación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Preparación profesional (lijado, granallado)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Reparación de grietas y desperfectos
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Imprimación EpoxiBase M² especializada
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Montaje certificado por personal especializado
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Waterproofing and Protection */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Impermeabilización</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Sellado juntas con Sellador M² Híbrido
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Protección perímetros y esquinas
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Drenajes integrados (donde necesario)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Garantía vitalicia impermeabilización
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Maintenance and Warranty */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Garantía y Mantenimiento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Hasta 15 años garantía sistema
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Soporte técnico 24/7
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Revisiones anuales gratuitas
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Reparación express cuando necesario
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
                  ¿Qué Sistema Elegir?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Guía rápida para seleccionar el sistema ideal según su tipo de garaje o parking
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para garaje doméstico 20-50 m²:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiGarage M² Residencial</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(barato + práctico)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para garaje con coches colección:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiArte M² Classic</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(como showroom)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para parking subterráneo comunidad:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiCoat M² Estándar</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(presupuesto) o EpoxiCubierta M² (si hay filtraciones)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para parking en cubierta:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiCubierta M²</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(¡obligatorio! impermeabilización!)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para parking comercial grande:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiCubierta M² Express</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(rápido por zonas)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para taller:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiRápido M² + EpoxiGarage M²</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(zonas trabajo + recepción)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para autolavado:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiArte M² Aqua</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(antideslizante + resistente agua)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para rampas:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiSeguro M² Antideslizante</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(¡seguridad!)</p>
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
                Consulta Gratuita para Garajes y Parkings
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                ¿No sabe qué sistema es ideal para su garaje o parking?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Lo que incluye:</h3>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Visita de especialista técnico
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Evaluación estado del hormigón
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Verificación humedad (para impermeabilización)
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Detección zonas problemáticas
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Cálculo por zonas (si parking grande)
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Propuesta técnica con garantías
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
                          window.open('https://wa.me/34622313855?text=Hola, necesito consulta gratuita para pisos de garaje/parking. ¿Podrían visitarme?', '_blank');
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Consulta Garajes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-2 text-black">
                  ¡Ayudamos a elegir la solución perfecta bajo su presupuesto!
                </h3>
                <p className="text-black/80 mb-4">
                  Nuestros expertos le ayudarán con la solución óptima para su garaje o parking
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90 hover:text-black">
                      Solicitar Presupuesto Garajes
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Solicitar Presupuesto - Pisos para Garajes y Parkings</DialogTitle>
                    </DialogHeader>
                    <QuoteForm productTitle="Pisos para Garajes y Parkings" />
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
                Ejemplos de Proyectos de Garajes y Parkings Realizados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Garaje Residencial 25 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiGarage M² Residencial</li>
                      <li><strong>Color:</strong> Gris claro RAL 7035</li>
                      <li><strong>Tiempo:</strong> 1 día</li>
                      <li><strong>Precio:</strong> 350€ (14€/m²)</li>
                      <li><strong>Resultado:</strong> "¡Ahora el coche está limpio! ¡Ya no produce polvo!"</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Parking Subterráneo 3,000 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiCoat M² Estándar + EpoxiSeguro M² (rampas)</li>
                      <li><strong>Color:</strong> Gris claro (iluminación +30%)</li>
                      <li><strong>Marcado:</strong> 150 plazas parking</li>
                      <li><strong>Tiempo:</strong> 12 días</li>
                      <li><strong>Ahorro:</strong> Piso más claro = menos lámparas</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Parking Cubierta CC 5,000 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiCubierta M² Express (por zonas)</li>
                      <li><strong>Impermeabilización:</strong> Total, 100% garantía</li>
                      <li><strong>Tiempo:</strong> 20 días (por zonas, parking funcionó)</li>
                      <li><strong>Resultado:</strong> Sin filtraciones, garantía vitalicia impermeabilización</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Autoservicio 400 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Zonas:</strong></li>
                      <li className="ml-4">• Boxes trabajo: EpoxiRápido M² 4mm (6 boxes)</li>
                      <li className="ml-4">• Zona recepción: EpoxiGarage M² (80 m²)</li>
                      <li className="ml-4">• Lavado: EpoxiArte M² Aqua (40 m²)</li>
                      <li><strong>Color:</strong> Gris + marcado amarillo</li>
                      <li><strong>Resultado:</strong> Aspecto profesional, clientes satisfechos</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Autolavado Autoservicio 200 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiArte M² Aqua</li>
                      <li><strong>Pendientes:</strong> 2% hacia desagües centrales</li>
                      <li><strong>Antideslizante:</strong> R12</li>
                      <li><strong>Resultado:</strong> Trabajadores ya no se caen, agua drena rápido</li>
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

const GaragesParkingDetail = () => (
  <LanguageProvider>
    <GaragesParkingDetailContent />
  </LanguageProvider>
);

export default GaragesParkingDetail;
