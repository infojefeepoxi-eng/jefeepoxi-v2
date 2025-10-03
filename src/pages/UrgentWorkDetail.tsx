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
import { ArrowLeft, CheckCircle, Phone, MessageCircle, Zap, Clock, AlertTriangle, Snowflake, Wrench, Hospital, ChevronDown, ChevronUp, Star, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

const UrgentWorkDetailContent = () => {
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
            placeholder={systemName || "ej. Express, ultra rápido, emergencia..."}
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

  // Productos/servicios basados en CATEGORIA_6_SHVYDKI_TERMINOVI.md
  const products = [
    {
      id: 'emergencias',
      icon: AlertTriangle,
      title: 'Situaciones de Emergencia',
      subtitle: 'Sistemas ultra rápidos para emergencias críticas',
      image: '/assets/project-industrial-blue-gray.jpg',
      description: 'Soluciones express para emergencias que requieren reparación inmediata en 4-8 horas',
      problems: [
        'Filtraciones emergencia (parkings, almacenes)',
        'Daños piso por equipos pesados',
        'Requisitos urgentes servicios sanitarios',
        'No se puede parar producción',
        'Trabajos estacionales (llegar antes invierno/lluvias)'
      ],
      solutions: [
        '4 HORAS - y se puede caminar',
        '8 HORAS - y se puede circular coches',
        '24 HORAS - carga completa',
        'Funciona a +5°C (otros sistemas desde +10°C)',
        'Se puede aplicar sobre hormigón húmedo'
      ],
      systems: [
        {
          name: 'PoliExpress M²',
          badge: 'SISTEMA MÁS RÁPIDO',
          description: 'Curado ultra rápido',
          basedOn: 'Vulkem Quick',
          thickness: '2-5mm',
          curing: 'Poliuretano curado acelerado',
          service: 'Puesta en servicio: 4-8 horas!',
          application: 'Aplicación rápida',
          durability: 'Durabilidad completa',
          price: '60-80 €/m²',
          whyBest: [
            '4 HORAS - y se puede caminar',
            '8 HORAS - y se puede circular coches',
            '24 HORAS - carga completa',
            'Funciona a +5°C (otros sistemas desde +10°C)',
            'Se puede aplicar sobre hormigón húmedo'
          ],
          finish: 'Poliuretano ultra rápido',
          critical: [
            '🚨 Filtración parking - abajo apartamentos/oficinas',
            '🚨 Paró producción - cada hora = pérdidas',
            '🚨 Sanidad dio 48 horas para arreglar violaciones',
            '🚨 Trabajos estacionales - mañana llueve/hiela',
            '🚨 Avería almacén - piso dañado'
          ],
          technology: [
            'Horas 0-2: Limpieza y preparación',
            'Horas 2-4: Reparación EpoxiRepara M² Mortero',
            'Horas 4-6: Imprimación EpoxiBase M²',
            'Horas 6-10: Recubrimiento sistema principal',
            'Hora 18: Se puede explotar'
          ]
        },
        {
          name: 'EpoxiTurbo M²',
          badge: 'ACELERADOR CLIMA FRÍO',
          description: 'Acelerador de curado',
          basedOn: 'Peran EWS',
          thickness: 'Aditivo (no cambia espesor)',
          curing: 'Reduce tiempo curado 50%',
          accelerator: 'Acelerador específico',
          nonylphenol: 'Sin nonilfenol',
          properties: 'Mejora propiedades iniciales',
          price: '+20-30% al precio base',
          whyBest: [
            'Reduce tiempo curado en 50%',
            'Funciona en clima frío (+5°C y menos)',
            'Compatible con todas nuestras sistemas',
            'Mejora propiedades iniciales'
          ],
          finish: 'Se añade a cualquier sistema',
          when: [
            '❄️ Clima frío (+5°C y menos)',
            '⏰ Proyecto urgente - necesita más rápido',
            '🌧️ Lluvia mañana - hay que terminar',
            '🏭 Producción no puede esperar'
          ],
          applications: [
            'EpoxiRápido M² + EpoxiTurbo M² = listo en 6 horas',
            'EpoxiCubierta M² + EpoxiTurbo M² = impermeabilización rápida',
            'EpoxiArte M² + EpoxiTurbo M² = decorativo rápido'
          ]
        }
      ]
    },
    {
      id: 'parkings',
      icon: Clock,
      title: 'Parkings Urgentes',
      subtitle: 'Trabajos rápidos en parkings con mínimo cierre',
      image: '/assets/project-warehouse-before-after.jpg',
      description: 'Sistemas express para parkings que no se pueden cerrar mucho tiempo',
      problems: [
        'Parking no se puede cerrar mucho tiempo',
        'Residentes se quejan',
        'Filtraciones hay que parar AHORA',
        'Trabajos estacionales (verano corto)',
        'Mínimas molestias'
      ],
      solutions: [
        'Residentes no se quejan (parking funciona)',
        '50% más rápido que tecnología normal',
        'Se puede planificar por zonas',
        'Menos pérdidas por plazas cerradas'
      ],
      systems: [
        {
          name: 'EpoxiCubierta M² Express',
          badge: 'IMPERMEABILIZACIÓN RÁPIDA',
          description: 'Sistema rápido',
          basedOn: 'Deckshield Rapide',
          thickness: '2.5-4mm',
          curing: 'Sistema curado acelerado',
          service: 'Se puede abrir en 24 horas (en vez de 72 horas)',
          waterproof: 'Impermeabilización total',
          durability: 'Misma durabilidad que estándar',
          price: '34-48 €/m²',
          whyBest: [
            'Residentes no se quejan (parking funciona)',
            '50% más rápido que tecnología normal',
            'Se puede planificar por zonas',
            'Menos pérdidas por plazas cerradas'
          ],
          finish: 'Express mismas prestaciones que estándar',
          technology: [
            'Semana 1: Zona A (500 m²) - cerrada, resto funciona',
            'Semana 2: Zona B (500 m²) - cerrada, resto funciona',
            'Semana 3: Zona C (500 m²) - cerrada, resto funciona',
            'Y así sucesivamente...'
          ],
          result: 'Parking funciona todo el tiempo, molestias mínimas',
          savings: [
            'Pérdidas parking cerrado: 50€/plaza/día',
            '100 plazas × 10 días = 50,000€ pérdidas',
            'Con Express: 100 plazas × 2 días = 10,000€ pérdidas',
            'AHORRO: 40,000€ (compensa sobreprecio Express!)'
          ]
        }
      ]
    },
    {
      id: 'producciones',
      icon: Zap,
      title: 'Producciones Urgentes',
      subtitle: 'Express para fábricas con paradas limitadas',
      image: '/assets/project-industrial-yellow.jpg',
      description: 'Sistemas express para fábricas que no pueden parar producción mucho tiempo',
      problems: [
        'Producción no se puede parar (pérdidas millones)',
        'Paradas planificadas limitadas (2-3 días máximo)',
        'Daños emergencia piso',
        'Paradas estacionales (Año Nuevo, vacaciones verano)',
        'Multas por parada'
      ],
      solutions: [
        'Parada producción: 0 días (solo fines semana)',
        'Tecnología normal: 5 días laborables parada',
        'AHORRO: Millones euros'
      ],
      systems: [
        {
          name: 'EpoxiRápido M² + EpoxiTurbo M²',
          badge: 'EXPRESS PARA FÁBRICAS',
          description: 'Combinación sistema rápido + acelerador',
          basedOn: 'Flowfast + Peran EWS',
          thickness: '2-6mm',
          curing: 'Express: 2 días vs 5 días estándar',
          weekend: 'Tecnología "Weekend Express"',
          price: '30-45 €/m²',
          whyBest: [
            'Parada producción: 0 días (solo fines semana)',
            'Tecnología normal: 5 días laborables parada',
            'AHORRO: Millones euros'
          ],
          finish: 'Rápido sin comprometer calidad',
          technology: [
            'Viernes 18:00-22:00: Preparación superficie (4 horas)',
            'Sábado 8:00-12:00: Imprimación + EpoxiTurbo M² (4 horas)',
            'Sábado 16:00-20:00: EpoxiRápido M² capa base (4 horas)',
            'Domingo 8:00-12:00: Capa final (4 horas)',
            'Lunes 8:00: Explotación completa'
          ],
          result: '¡Nuevo piso en fin de semana!',
          savings: [
            'Parada producción: 100,000€/día',
            'Tecnología normal: 5 días = 500,000€ pérdidas',
            'Express: 2 días = 200,000€ pérdidas',
            'AHORRO: 300,000€ (con sobreprecio 20,000€ express)'
          ]
        },
        {
          name: 'EpoxiLiso M² Autonivelante',
          badge: 'RENOVACIÓN RÁPIDA',
          description: 'Para renovación cosmética rápida',
          basedOn: 'Sistemas Autonivelantes',
          thickness: '1-2mm - seca rápido',
          curing: '24 horas',
          selfLevel: 'Autonivelante - no necesita preparación cuidadosa',
          existing: 'Se puede sobre recubrimiento existente',
          price: '16-25 €/m²',
          whyBest: [
            'Espesor 1-2mm - seca rápido',
            'Autonivelante - no necesita preparación cuidadosa',
            'Se puede sobre recubrimiento existente',
            'Listo en 24 horas'
          ],
          finish: 'Perfectamente liso renovado',
          when: [
            'Renovación zonas oficina fábrica',
            'Reparación rápida antes auditoría',
            'Renovación cosmética almacén'
          ]
        }
      ]
    },
    {
      id: 'frio',
      icon: Snowflake,
      title: 'Trabajos en Frío',
      subtitle: 'Sistemas para clima frío desde -5°C',
      image: '/assets/project-metallic-garage.jpg',
      description: 'Sistemas especiales que funcionan en clima frío cuando otros sistemas no pueden',
      problems: [
        'Sistemas normales no funcionan a +5°C',
        'Invierno largo - no se puede esperar primavera',
        'Averías no esperan clima cálido',
        'Calefacción cara',
        'Plazos proyecto no se pueden mover'
      ],
      solutions: [
        'Funciona desde -5°C (otros solo desde +10°C)',
        'No necesita calentar local',
        'Se puede trabajar en invierno',
        'Curado rápido incluso en frío',
        'Ahorro en calefacción'
      ],
      systems: [
        {
          name: 'PoliRápido M² Frío',
          badge: 'ESPECIAL PARA FRÍO',
          description: 'Para bajas temperaturas',
          basedOn: 'Flowfresh RT',
          thickness: '3-6mm',
          curing: 'Desde -5°C (¡único!)',
          service: 'Puesta en servicio: 4-8 horas',
          elasticity: 'No se agrieta por frío',
          temperature: '-40°C a +80°C explotación',
          price: '55-75 €/m²',
          whyBest: [
            'Funciona desde -5°C (otros solo desde +10°C)',
            'No necesita calentar local',
            'Se puede trabajar en invierno',
            'Curado rápido incluso en frío',
            'Ahorro en calefacción'
          ],
          finish: 'Poliuretano resistente frío',
          applications: [
            'Parkings exteriores y terrazas',
            'Almacenes sin calefacción',
            'Reparaciones emergencia invierno',
            'Cámaras frigoríficas (no necesita descongelar)'
          ],
          winter: [
            'Limpieza nieve y hielo',
            'Secado superficie (equipo especial)',
            'Aplicación PoliRápido M² Frío',
            'Protección precipitaciones (carpas)',
            'Listo en 8 horas incluso a -5°C'
          ]
        }
      ]
    },
    {
      id: 'reparaciones',
      icon: Wrench,
      title: 'Reparaciones de Emergencia',
      subtitle: 'Restauración rápida después de averías',
      image: '/assets/project-decorative-gold-black.jpg',
      description: 'Sistemas de reparación estructural para restauración rápida después de averías',
      problems: [
        'Daños emergencia (explosión, incendio, inundación)',
        'Grietas críticas en piso',
        'Hundimientos y destrucciones',
        'Necesita restaurar POR LA NOCHE',
        'Casos seguros'
      ],
      solutions: [
        'Restauración rápida = menos pérdidas',
        'Documentación completa',
        'Garantía en restauración',
        'Materiales certificados'
      ],
      systems: [
        {
          name: 'EpoxiRepara M² Mortero',
          badge: 'REPARACIÓN EMERGENCIA',
          description: 'Reparación estructural',
          basedOn: 'Flowmortar',
          thickness: '5-50mm (¡se puede grueso!)',
          curing: '24 horas',
          compression: 'Resistencia compresión >100 N/mm²',
          adhesion: 'Adherencia >3 N/mm²',
          shrinkage: 'Retracción compensada',
          workability: 'Trabajabilidad 45 minutos a 20°C',
          price: '45-65 €/m²',
          whyBest: [
            'Restauración rápida = menos pérdidas',
            'Documentación completa',
            'Garantía en restauración',
            'Materiales certificados'
          ],
          finish: 'Mortero estructural reparación',
          emergency: [
            '🚨 Hundimiento piso por equipos pesados',
            '🚨 Grietas grandes por terremoto/asentamiento',
            '🚨 Baches por caída objetos pesados',
            '🚨 Destrucción juntas deformación'
          ],
          technology: [
            '18 horas desde avería hasta explotación completa!'
          ],
          applications: [
            'Reparaciones estructurales',
            'Restauración después incendios',
            'Reparación después inundaciones',
            'Casos seguros'
          ]
        },
        {
          name: 'Sellador M² Módulo Bajo',
          badge: 'SELLADO RÁPIDO JUNTAS',
          description: 'Para sellado emergencia',
          basedOn: 'Selladores elásticos',
          thickness: 'Según junta',
          curing: 'Sellado en 2-4 horas',
          temperature: 'Funciona a +5°C',
          elastic: 'Elástico - se mueve con hormigón',
          waterproof: 'Impermeable',
          price: '8-15 €/m.l.',
          whyBest: [
            'Sellado en 2-4 horas',
            'Funciona a +5°C',
            'Elástico - se mueve con hormigón',
            'Impermeable'
          ],
          finish: 'Sellador elástico',
          emergency: [
            'Filtraciones por juntas',
            'Rotura juntas deformación',
            'Destrucción sellador'
          ]
        }
      ]
    },
    {
      id: 'hospitales',
      icon: Hospital,
      title: 'Hospitales Urgentes',
      subtitle: 'Trabajos express en centros médicos',
      image: '/assets/project-decorative-white-black.jpg',
      description: 'Sistemas rápidos para hospitales que no se pueden cerrar',
      problems: [
        'Hospital no se puede cerrar',
        'Quirófanos funcionan 24/7',
        'Sanidad dio plazo',
        'Pacientes no pueden esperar',
        'Esterilidad crítica'
      ],
      solutions: [
        'Trabajo por departamentos',
        'En 12 horas quirófano listo',
        'Certificación rápida incluida'
      ],
      systems: [
        {
          name: 'EpoxiLimpio M² Antibacterial',
          badge: 'HIGIENE RÁPIDA',
          description: 'Sistema higiénico express',
          basedOn: 'Flowfresh con Polygiene®',
          thickness: '6mm',
          curing: 'Express con EpoxiTurbo M²',
          antibacterial: 'Polygiene® antibacterial',
          departments: 'Tecnología trabajo por departamentos',
          price: '50-70 €/m²',
          whyBest: [
            'Trabajo por departamentos',
            'En 12 horas quirófano listo',
            'Certificación rápida incluida'
          ],
          finish: 'Antibacterial express',
          technology: [
            'Quirófano 1: Cerrado reparación (24 horas)',
            'Quirófanos 2-6: Funcionan',
            'Día siguiente: Quirófano 2 reparación',
            'Y así sucesivamente...'
          ],
          express: [
            'Tarde: Preparación después última operación',
            'Noche: Aplicación EpoxiLimpio M² + EpoxiTurbo M²',
            'Mañana: Listo para primera operación'
          ],
          result: '¡En 12 horas quirófano listo!',
          applications: [
            'Quirófanos urgentes',
            'Salas procedimientos',
            'Urgencias médicas',
            'Laboratorios hospital'
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
              <Zap className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Trabajos Rápidos y Urgentes
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Sistemas de curado ultra rápido para proyectos urgentes y emergencias
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-8">
                <p className="text-primary font-semibold">
                  Para: Objetos con tiempo limitado, situaciones de emergencia, proyectos urgentes
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✓ Servicio 24/7 disponible
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  ✓ Curado ultra rápido
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  ✓ Mínima parada producción
                </div>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  ✓ Trabajos clima frío -5°C
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
                Nuestras Soluciones Express y de Emergencia
              </h2>
              <p className="text-lg text-muted-foreground">
                Sistemas Epoxi M² ultra rápidos para situaciones urgentes
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
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
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

        {/* Additional Services for Urgent Projects */}
        <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Servicio Express 24/7
                </h2>
                <p className="text-lg text-muted-foreground">
                  Servicios de emergencia incluidos en todos nuestros proyectos urgentes
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Emergency Response */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Respuesta Emergencia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Línea caliente 24/7 - llame cualquier hora
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Visita en 2 horas - dentro 50km ciudad
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Diagnóstico express - evaluación 30 minutos
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Cálculo in situ - costo exacto inmediato
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Inicio trabajos - día contacto o siguiente
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Express Teams */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Brigadas Express</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Brigada A: Objetos industriales
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Brigada B: Parkings y garajes
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Brigada C: Producciones alimentarias
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Brigada D: Sistemas especializados (ESD, química)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Equipos especiales clima frío
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Guarantees */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Nuestras Garantías Express</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Plazos - o multa 1000€/día retraso
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Calidad - igual que montaje normal
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Certificados - todos documentos necesarios
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Garantía - completa como sistemas normales
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Disponibilidad 24/7/365
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
                  ¿Cuándo Elegir Sistemas Express?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Guía para decidir si necesita sistemas urgentes o normales
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Obligatorio Express si:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Avería - filtraciones, daños</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Parada más cara que sobreprecio velocidad</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Sanidad dio plazo:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Si no multa/cierre</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Trabajos estacionales - antes invierno</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Parada planificada corta:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Fines semana, fiestas</span>
                  </div>
                  <p className="text-xs text-muted-foreground">No se puede parar mucho tiempo</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Sistema normal si:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Objeto se puede cerrar semana</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Presupuesto limitado, no hay urgencia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Speed Records Section */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Récords de Velocidad (Nuestros Logros)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Proyectos Más Rápidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>4 horas</strong> - PoliExpress M² 100 m² (garaje)</li>
                      <li><strong>8 horas</strong> - EpoxiLimpio M² 200 m² (cocina restaurante)</li>
                      <li><strong>24 horas</strong> - EpoxiCubierta M² Express 500 m² (parking)</li>
                      <li><strong>48 horas</strong> - EpoxiStatic M² ESD 300 m² (cleanroom)</li>
                      <li><strong>72 horas</strong> - EpoxiTermo M² 200 m² (junto horno)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Proyectos Clima Frío</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>-8°C</strong> - PoliRápido M² Frío 400 m² (almacén exterior)</li>
                      <li><strong>-15°C</strong> - Reparación emergencia almacén frigorífico</li>
                      <li><strong>-20°C</strong> - Cámara congelación sin descongelar</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Grandes Superficies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>5,000 m²</strong> en una semana (5 brigadas paralelo)</li>
                      <li><strong>15,000 m²</strong> en un mes (tecnología Express)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Ejemplos de Proyectos Urgentes Realizados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Avería Matadero (CASO REAL)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Problema:</strong> Reventó tubería, inundó nave, sanidad dio 48 horas</li>
                      <li><strong>Solución:</strong> PoliExpress M² + EpoxiLimpio M² Antibacterial</li>
                      <li><strong>Tiempo:</strong> 36 horas desde avería hasta certificación HACCP</li>
                      <li><strong>Resultado:</strong> Producción no paró, sanidad satisfecha</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filtración Parking CC (CRÍTICO)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Problema:</strong> Filtra a tiendas, pérdidas 10,000€/día</li>
                      <li><strong>Solución:</strong> EpoxiCubierta M² Express por zonas</li>
                      <li><strong>Tiempo:</strong> 5 días (en vez de 15 días estándar)</li>
                      <li><strong>Ahorro:</strong> 100,000€ pérdidas</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fábrica Electrónica - Parada Fiestas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Problema:</strong> Necesita piso ESD, parada solo 3 días</li>
                      <li><strong>Solución:</strong> EpoxiStatic M² ESD + EpoxiTurbo M² + trabajo nocturno</li>
                      <li><strong>Tiempo:</strong> 72 horas con montaje malla cobre</li>
                      <li><strong>Resultado:</strong> Fábrica arrancó en plazo</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Restaurante - Reparación Nocturna</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Problema:</strong> Cocina restaurante, no se puede cerrar</li>
                      <li><strong>Solución:</strong> EpoxiLimpio M² + EpoxiTurbo M² (turno noche)</li>
                      <li><strong>Tiempo:</strong> 22:00-08:00 (10 horas)</li>
                      <li><strong>Resultado:</strong> Restaurante abrió por la mañana</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hospital - Reparación Emergencia Quirófano</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Problema:</strong> Quirófano dañado, operaciones no se pueden aplazar</li>
                      <li><strong>Solución:</strong> EpoxiStatic M² ESD montaje express</li>
                      <li><strong>Tiempo:</strong> 16 horas (con medición ESD)</li>
                      <li><strong>Resultado:</strong> Quirófano funciona, ESD certificado</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Costo Servicios Express
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Sobreprecio por Velocidad:</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-primary/10 rounded">
                        <span className="font-medium">24 horas listo:</span>
                        <span className="font-bold text-primary">+50%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-primary/10 rounded">
                        <span className="font-medium">48 horas listo:</span>
                        <span className="font-bold text-primary">+30%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-primary/10 rounded">
                        <span className="font-medium">72 horas listo:</span>
                        <span className="font-bold text-primary">+20%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-primary/10 rounded">
                        <span className="font-medium">Trabajo frío (-5°C):</span>
                        <span className="font-bold text-primary">+25%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-primary/10 rounded">
                        <span className="font-medium">Trabajo nocturno:</span>
                        <span className="font-bold text-primary">+40%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-primary/10 rounded">
                        <span className="font-medium">Fines semana y fiestas:</span>
                        <span className="font-bold text-primary">+60%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">¡Pero el Ahorro en Parada se Compensa!</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <p className="font-semibold text-primary mb-2">Ejemplo cálculo fábrica:</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Parada producción: 50,000€/día</li>
                        <li>• Tecnología normal: 5 días = 250,000€ pérdidas</li>
                        <li>• Express 2 días: 100,000€ pérdidas + 30,000€ sobreprecio</li>
                        <li className="font-bold text-primary">• AHORRO: 120,000€</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Free Consultation Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Consulta Express Gratuita
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                ¿No sabe qué sistema express es ideal para su proyecto urgente?
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
                        Evaluación del estado del piso
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Cálculo de costos
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Propuesta técnica detallada
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Análisis urgencia del proyecto
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Planificación express optimizada
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
                          window.open('https://wa.me/34622313855?text=Hola, necesito consulta gratuita para trabajos urgentes. ¿Podrían visitarme?', '_blank');
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Consulta Express
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-2 text-black">
                  ¡Contáctenos para el cálculo de su proyecto urgente!
                </h3>
                <p className="text-black/80 mb-4">
                  Nuestros expertos le ayudarán a elegir la solución express perfecta
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90 hover:text-black">
                      Solicitar Presupuesto Express
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Solicitar Presupuesto - Trabajos Rápidos y Urgentes</DialogTitle>
                    </DialogHeader>
                    <QuoteForm productTitle="Trabajos Rápidos y Urgentes" />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

const UrgentWorkDetail = () => (
  <LanguageProvider>
    <UrgentWorkDetailContent />
  </LanguageProvider>
);

export default UrgentWorkDetail;
