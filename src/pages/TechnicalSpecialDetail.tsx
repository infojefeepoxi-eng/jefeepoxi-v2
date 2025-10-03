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
import { ArrowLeft, CheckCircle, Phone, MessageCircle, Cpu, FlaskConical, Hospital, Flame, Microscope, Zap, ChevronDown, ChevronUp, Star, Thermometer } from 'lucide-react';
import { Link } from 'react-router-dom';

const TechnicalSpecialDetailContent = () => {
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
            placeholder={systemName || "ej. Antiestático, químico-resistente, alta temperatura..."}
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

  // Productos/servicios basados en CATEGORIA_5_SPECIALNI_TEHNICHNI.md
  const products = [
    {
      id: 'electronicas',
      icon: Cpu,
      title: 'Fábricas Electrónicas',
      subtitle: 'Sistemas antiestáticos ESD para protección de componentes',
      image: '/assets/project-industrial-blue-gray.jpg',
      description: 'Pisos antiestáticos certificados para fábricas de electrónica que protegen contra descargas electrostáticas',
      problems: [
        'Electricidad estática destruye microchips y placas',
        'Pérdidas por defectos debido a ESD (descarga electrostática)',
        'Requisitos estándares para producción electrónica',
        'Salas limpias - necesita superficie no porosa',
        'Certificación para trabajo con componentes sensibles'
      ],
      solutions: [
        'PROTECCIÓN contra ESD - microchips no se estropean',
        'Certificación oficial IEC 61340-5-1',
        'Conductividad constante permanente (no se pierde con años)',
        'Derivación estática controlada',
        'Ahorro en defectos - hasta 90% menos pérdidas'
      ],
      systems: [
        {
          name: 'EpoxiStatic M² ESD',
          badge: 'CERTIFICADO ANTIESTÁTICO',
          description: 'Antiestático conductivo',
          basedOn: 'Flowstat ESD',
          thickness: '2-4mm',
          curing: '24 horas',
          resistance: '10⁶ - 10⁹ ohmios (controlado)',
          certification: 'IEC 61340-5-1',
          conductivity: 'Permanente vitalicia',
          measurement: 'Certificado después montaje',
          price: '65-90 €/m²',
          whyBest: [
            'PROTECCIÓN contra ESD - microchips no se estropean',
            'Certificación oficial IEC 61340-5-1',
            'Conductividad constante permanente (no se pierde con años)',
            'Derivación estática controlada',
            'Ahorro en defectos - hasta 90% menos pérdidas'
          ],
          finish: 'Antiestático con grafito conductivo',
          system: [
            'Imprimación conductiva con relleno cobre',
            'Capa base epoxi con grafito conductivo',
            'Malla cobre para conexión tierra (paso 2-3m)',
            'Acabado final poliuretano antiestático',
            'Medición resistencia cada m²',
            'Certificado con valores conductividad'
          ],
          applications: [
            'Producción microchips y procesadores',
            'Montaje placas y electrónica',
            'Almacenes componentes electrónicos',
            'Centros reparación electrónica',
            'Laboratorios investigación'
          ],
          requirements: [
            'Calzado ESD para personal',
            'Productos limpieza especiales (no destruyen conductividad)',
            'Mediciones periódicas resistencia (una vez al año)'
          ]
        },
        {
          name: 'EpoxiLimpio M² Antiestático',
          badge: 'PARA ELECTRÓNICA ALIMENTARIA',
          description: 'Combinación antiestática + higiene',
          basedOn: 'Flowfresh ESD',
          thickness: '3-6mm',
          curing: '24 horas',
          esd: 'Protección ESD + antibacterial',
          haccp: 'Certificación HACCP + IEC 61340',
          combination: 'Dos en uno',
          price: '70-95 €/m²',
          whyBest: [
            'Protección ESD + antibacterial',
            'Certificación HACCP + IEC 61340',
            'Dos sistemas en uno',
            'Para electrónica alimentaria'
          ],
          finish: 'Antiestático antibacterial',
          applications: [
            'Producción básculas electrónicas',
            'Empaque electrónica para industria alimentaria',
            'Laboratorios control alimentario con equipos',
            'Plantas procesamiento con electrónica'
          ],
          component: 'Usa Carga M² ESD (carga conductiva)'
        }
      ]
    },
    {
      id: 'laboratorios',
      icon: FlaskConical,
      title: 'Laboratorios Químicos',
      subtitle: 'Sistemas químico-resistentes para laboratorios analíticos',
      image: '/assets/project-decorative-white-black.jpg',
      description: 'Pisos con máxima resistencia química para laboratorios con ácidos, álcalis y disolventes',
      problems: [
        'Derrames de ácidos, álcalis, disolventes',
        'Destrucción pisos normales por química',
        'Necesidad de fácil descontaminación',
        'Requisitos de limpieza',
        'Seguridad del personal'
      ],
      solutions: [
        'Soporta ácidos concentrados (HCl, H2SO4, HNO3)',
        'Resistente a álcalis (NaOH, KOH)',
        'No se destruye por disolventes orgánicos',
        'Fácil descontaminación en derrames',
        'Superficie sin juntas - fácil de lavar'
      ],
      systems: [
        {
          name: 'EpoxiQuímico M² Premium',
          badge: 'MÁXIMA RESISTENCIA QUÍMICA',
          description: 'Resistencia química extrema',
          basedOn: 'Flowchem (Viniléster)',
          thickness: '4-8mm',
          curing: '24 horas',
          base: 'Resina vinil-éster (¡mejor que epoxi normal!)',
          chemical: 'A ácidos concentrados y álcalis',
          waterproof: 'Absoluta',
          joints: 'Soldados químicamente',
          price: '45-65 €/m²',
          whyBest: [
            'Soporta ácidos concentrados (HCl, H2SO4, HNO3)',
            'Resistente a álcalis (NaOH, KOH)',
            'No se destruye por disolventes orgánicos',
            'Fácil descontaminación en derrames',
            'Superficie sin juntas - fácil de lavar'
          ],
          finish: 'Vinil-éster químico-resistente',
          applications: [
            'Laboratorios químicos analíticos',
            'Laboratorios control calidad',
            'Centros investigación',
            'Laboratorios farmacéuticos',
            'Laboratorios universitarios'
          ],
          options: [
            'Esquinas redondeadas con EpoxiCristal M² Tixo (fácil limpiar derrames)',
            'Desagües para derrames emergencia',
            'Zonificación colores (diferentes reactivos - diferentes zonas)'
          ]
        },
        {
          name: 'PoliQuímico M²',
          badge: 'PARA QUÍMICA AGRESIVA',
          description: 'Resistencia química PU',
          basedOn: 'Flowchem PU',
          thickness: '4-8mm',
          curing: '24 horas',
          chemical: 'Ácidos fuertes',
          waterproof: 'Total',
          joints: 'Soldados químicamente con cordón poliuretano',
          price: '50-70 €/m²',
          whyBest: [
            'Para química más agresiva',
            'Resistencia superior a ácidos',
            'Juntas soldadas químicamente',
            'Máxima durabilidad'
          ],
          finish: 'Poliuretano químico-resistente',
          applications: [
            'Talleres galvánicos',
            'Baños decapado',
            'Laboratorios con álcalis',
            'Plantas tratamiento aguas'
          ]
        }
      ]
    },
    {
      id: 'hospitales',
      icon: Hospital,
      title: 'Hospitales y Centros Médicos',
      subtitle: 'Sistemas higiénicos para instalaciones médicas',
      image: '/assets/project-decorative-gold-black.jpg',
      description: 'Pisos antibacteriales para hospitales con máxima higiene y resistencia a desinfectantes',
      problems: [
        'Necesidad de esterilidad',
        'Desinfección con productos clorados',
        'Antibacterial obligatorio',
        'Facilidad de limpieza',
        'Antiestática en quirófanos'
      ],
      solutions: [
        'Recubrimiento antibacterial Polygiene®',
        'Soporta desinfección con cloro',
        'Fácil lavar y desinfectar',
        'Superficie lisa - sin poros para bacterias',
        'Diferentes colores para zonificar departamentos'
      ],
      systems: [
        {
          name: 'EpoxiLimpio M² Antibacterial',
          badge: 'PARA HOSPITALES',
          description: 'Sistema higiénico',
          basedOn: 'Flowfresh con Polygiene®',
          thickness: '6mm',
          curing: '24 horas',
          antibacterial: 'Recubrimiento antibacterial Polygiene®',
          disinfection: 'Soporta desinfección cloro',
          cleaning: 'Fácil lavar y desinfectar',
          surface: 'Lisa sin poros para bacterias',
          colors: 'Diferentes colores para zonificar departamentos',
          price: '40-55 €/m²',
          whyBest: [
            'Recubrimiento antibacterial Polygiene®',
            'Soporta desinfección con cloro',
            'Fácil lavar y desinfectar',
            'Superficie lisa - sin poros para bacterias',
            'Diferentes colores para zonificar departamentos'
          ],
          finish: 'Antibacterial con tecnología Polygiene®',
          zones: [
            'Quirófanos: EpoxiStatic M² ESD (antiestática)',
            'Habitaciones: EpoxiLimpio M² Fino (liso, higiénico)',
            'Pasillos: EpoxiLiso M² Autonivelante (práctico)',
            'Salas procedimientos: EpoxiHigiene M² (máxima higiene)'
          ],
          coding: [
            'Verde - departamentos quirúrgicos',
            'Azul - terapéuticos',
            'Amarillo - infecciosos',
            'Rojo - reanimación'
          ]
        }
      ]
    },
    {
      id: 'temperaturas',
      icon: Flame,
      title: 'Altas Temperaturas',
      subtitle: 'Sistemas para hornos, calderas y fundiciones',
      image: '/assets/project-industrial-yellow.jpg',
      description: 'Pisos refractarios para producciones de alta temperatura que resisten hasta 1000°C',
      problems: [
        'Recubrimientos normales se derriten/queman',
        'Hornos, calderas, fundiciones',
        'Temperaturas 500-1000°C',
        'Resistencia al fuego obligatoria',
        'Durabilidad en condiciones extremas'
      ],
      solutions: [
        'Soporta HASTA 1000°C - no se derrite, no se quema',
        'Base mineral - absolutamente ignífuga',
        'No emite gases tóxicos al calentar',
        'Durabilidad en condiciones extremas',
        'Certificación para hornos industriales'
      ],
      systems: [
        {
          name: 'EpoxiTermo M² Alta Temp',
          badge: 'PARA TEMPERATURAS EXTREMAS',
          description: 'Altas temperaturas',
          basedOn: 'Isocrete K',
          thickness: '10-50mm según temperatura',
          curing: 'Térmico gradual',
          thermal: 'Hasta 1000°C!!!',
          base: '100% mineral sin resinas',
          application: 'Manual o proyectado',
          fireResistant: 'Certificada',
          price: '55-80 €/m²',
          whyBest: [
            'Soporta HASTA 1000°C - no se derrite, no se quema',
            'Base mineral - absolutamente ignífuga',
            'No emite gases tóxicos al calentar',
            'Durabilidad en condiciones extremas',
            'Certificación para hornos industriales'
          ],
          finish: 'Mineral refractario',
          applications: [
            'Junto a hornos industriales (metalurgia)',
            'Talleres fundición',
            'Calderas y generadores calor',
            'Centrales biomasa',
            'Plantas incineración residuos',
            'Fábricas cemento'
          ],
          specifications: [
            'Aglutinante: Cemento aluminoso especial',
            'Agregados: Arcilla refractaria chamota',
            'Fibras: Acero inoxidable (opcional)',
            'Curado: Térmico progresivo'
          ],
          zones: [
            'Hasta 400°C: espesor 10-15mm',
            'Hasta 700°C: espesor 20-30mm',
            'Hasta 1000°C: espesor 30-50mm'
          ]
        }
      ]
    },
    {
      id: 'cleanrooms',
      icon: Microscope,
      title: 'Salas Limpias (Cleanrooms)',
      subtitle: 'Sistemas para ambientes controlados ISO 14644',
      image: '/assets/project-decorative-white-black.jpg',
      description: 'Pisos perfectamente lisos para salas limpias con cero generación de polvo',
      problems: [
        'Clases limpieza ISO 14644 (clase 1-9)',
        'Ausencia absoluta de polvo',
        'Fácil desinfección',
        'Antiestática',
        'Superficie perfectamente lisa'
      ],
      solutions: [
        'ABSOLUTAMENTE LISA - sin poros para polvo',
        'Fácil desinfección',
        'No emite ninguna sustancia',
        'Cumple ISO 14644',
        'Esquinas redondeadas para ausencia zonas inaccesibles'
      ],
      systems: [
        {
          name: 'EpoxiLiso M² Autonivelante',
          badge: 'PARA SALAS LIMPIAS',
          description: 'Acabado perfectamente liso',
          basedOn: 'Sistemas Autonivelantes',
          thickness: '1-4mm',
          curing: '24 horas',
          surface: 'Espejo lisa',
          pores: '0%',
          dust: 'Generación polvo 0%',
          price: '16-25 €/m²',
          whyBest: [
            'ABSOLUTAMENTE LISA - sin poros para polvo',
            'Fácil desinfección',
            'No emite ninguna sustancia',
            'Cumple ISO 14644',
            'Esquinas redondeadas para ausencia zonas inaccesibles'
          ],
          finish: 'Espejo liso sin marcas',
          classes: [
            'ISO Clase 5-7: EpoxiLiso M² + EpoxiStatic M² ESD',
            'ISO Clase 7-9: EpoxiLiso M² estándar'
          ],
          applications: [
            'Salas limpias farmacéuticas',
            'Cleanrooms electrónicos',
            'Laboratorios biotecnología',
            'Salas montaje precisión'
          ]
        },
        {
          name: 'EpoxiStatic M² ESD',
          badge: 'CLEANROOMS ELECTRÓNICOS',
          description: 'Limpieza + antiestática',
          basedOn: 'Flowstat ESD',
          thickness: '2-4mm',
          curing: '24 horas',
          combination: 'Sala limpia + protección ESD',
          electronics: 'Para producción microchips',
          precision: 'Para montaje equipos precisión',
          price: '65-90 €/m²',
          whyBest: [
            'Sala limpia + protección contra ESD',
            'Para producción microchips',
            'Para montaje equipos precisión'
          ],
          finish: 'Antiestático espejo liso',
          applications: [
            'Cleanrooms producción semiconductores',
            'Salas montaje equipos médicos',
            'Laboratorios nanotecnología',
            'Centros investigación avanzada'
          ]
        }
      ]
    },
    {
      id: 'investigacion',
      icon: Microscope,
      title: 'Centros de Investigación',
      subtitle: 'Sistemas universales para centros de I+D',
      image: '/assets/project-decorative-wood-marble.jpg',
      description: 'Pisos versátiles para centros de investigación con diferentes tipos de estudios',
      problems: [
        'Diferentes tipos de investigaciones - diferentes requisitos',
        'Universalidad del recubrimiento',
        'Resistencia química',
        'Posibilidad de descontaminación',
        'Durabilidad (presupuesto limitado)'
      ],
      solutions: [
        'Resistencia a mayoría de químicos',
        'Fácil descontaminación en derrames',
        'Durabilidad 15+ años',
        'Se puede reparar por secciones'
      ],
      systems: [
        {
          name: 'EpoxiQuímico M² Premium',
          badge: 'UNIVERSAL PARA I+D',
          description: 'Resistencia química universal',
          basedOn: 'Flowchem (Viniléster)',
          thickness: '4-8mm',
          curing: '24 horas',
          chemical: 'Resistencia mayoría químicos',
          decontamination: 'Fácil descontaminación derrames',
          durability: 'Durabilidad 15+ años',
          repair: 'Reparable por secciones',
          price: '45-65 €/m²',
          whyBest: [
            'Resistencia a mayoría de químicos',
            'Fácil descontaminación en derrames',
            'Durabilidad 15+ años',
            'Se puede reparar por secciones'
          ],
          finish: 'Vinil-éster universal',
          combinations: [
            'Química orgánica: EpoxiQuímico M² Premium',
            'Biología: EpoxiLimpio M² Antibacterial',
            'Física/electrónica: EpoxiStatic M² ESD',
            'Analítica: EpoxiProtect M² Químico'
          ],
          applications: [
            'Centros investigación universitarios',
            'Laboratorios I+D empresariales',
            'Institutos investigación',
            'Centros tecnológicos'
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
              <Cpu className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Pisos Técnicos Especiales
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Pavimentos ESD, conductivos y químico-resistentes para industrias exigentes
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-8">
                <p className="text-primary font-semibold">
                  Para: Laboratorios, fábricas electrónicas, hospitales, producciones high-tech
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✓ Certificación ISO 61340 / IEC
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  ✓ Pavimentos ESD antiestáticos
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  ✓ Químico-resistentes extremos
                </div>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  ✓ Hasta 1000°C temperatura
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
                Nuestras Soluciones Técnicas Especializadas
              </h2>
              <p className="text-lg text-muted-foreground">
                Sistemas Epoxi M² de alta tecnología para industrias más exigentes
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

        {/* Additional Services for Technical Special Projects */}
        <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Servicios Adicionales para Proyectos Técnicos Especiales
                </h2>
                <p className="text-lg text-muted-foreground">
                  Servicios profesionales especializados incluidos en todos nuestros proyectos técnicos
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Certification and Documentation */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Certificación y Documentación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Certificado IEC 61340-5-1 (para ESD)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Protocolo medición resistencia
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Certificado HACCP (laboratorios alimentarios)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Pasaporte técnico del objeto
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Planos con ubicación conexiones tierra
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Special Equipment */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Equipamiento Especial</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Malla cobre conexión tierra (sistemas ESD)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Puntos conexión especializados
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Medidor resistencia profesional
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Calzado y alfombrillas ESD
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Capacitación personal especializado
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Technical Support */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Soporte Técnico 24/7</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Visita ante problemas 24/7
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Verificación conductividad (para ESD)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Reparación daños especializados
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Consultas explotación
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Garantía hasta 15 años
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
                  Guía rápida para seleccionar el sistema técnico ideal según su industria
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para producción electrónica:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiStatic M² ESD</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(¡OBLIGATORIO! Si no hay defectos)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para laboratorio químico:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiQuímico M² Premium</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(soporta cualquier química)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para fábrica farmacéutica:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiLiso M² Fino + EpoxiStatic M²</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(salas limpias + empaque)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para hospital:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiLimpio M² Antibacterial</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(zonas generales) + EpoxiStatic M² (quirófanos)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para taller fundición:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiTermo M² Alta Temp</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(junto hornos) + EpoxiForte M² (zonas trabajo)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para cleanroom:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiLiso M²</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(estándar) o + EpoxiStatic M² (si electrónica)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para centro investigación:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiQuímico M² Premium</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(universal)</p>
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
                Consulta Técnica Gratuita
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                ¿No sabe qué sistema es ideal para su proyecto especializado?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Para proyectos especializados:</h3>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Visita de ingeniero-tecnólogo
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Análisis requisitos específicos producción
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Selección sistema bajo estándares (ATEX, GMP, ISO)
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Cálculo con certificación incluida
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Pruebas muestras en sus condiciones
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Consulta con Flowcrete International
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
                          window.open('https://wa.me/34622313855?text=Hola, necesito consulta técnica para pisos especializados. ¿Podrían visitarme?', '_blank');
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Consulta Técnica
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-2 text-black">
                  ¡Ayudamos a pasar cualquier certificación!
                </h3>
                <p className="text-black/80 mb-4">
                  Nuestros expertos técnicos le ayudarán con la solución perfecta para su industria especializada
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90 hover:text-black">
                      Solicitar Presupuesto Técnico
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Solicitar Presupuesto - Pisos Técnicos Especiales</DialogTitle>
                    </DialogHeader>
                    <QuoteForm productTitle="Pisos Técnicos Especiales" />
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
                Ejemplos de Proyectos Técnicos Especiales Realizados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fábrica Microchips 1,200 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiStatic M² ESD</li>
                      <li><strong>Clase limpieza:</strong> ISO 6</li>
                      <li><strong>Resistencia:</strong> 10⁷ Ω (medido cada m²)</li>
                      <li><strong>Tiempo:</strong> 15 días</li>
                      <li><strong>Resultado:</strong> Defectos bajaron 85%, certificación pasada</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Laboratorio Químico Universidad 300 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiQuímico M² Premium</li>
                      <li><strong>Zonas:</strong> Orgánica, inorgánica, analítica</li>
                      <li><strong>Esquinas:</strong> Redondeadas todo perímetro</li>
                      <li><strong>Resultado:</strong> Soporta cualquier derrame, fácil descontaminar</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hospital Bloque Quirúrgico 500 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiStatic M² ESD (quirófanos) + EpoxiLimpio M² (pasillos)</li>
                      <li><strong>Colores:</strong> Verde (quirófanos), gris (pasillos)</li>
                      <li><strong>Resultado:</strong> Antiestática en quirófanos, higiene en todas partes</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Taller Fundición 600 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiTermo M² Alta Temp (junto horno 50mm) + EpoxiForte M² (zona trabajo)</li>
                      <li><strong>Temperatura junto horno:</strong> Hasta 800°C</li>
                      <li><strong>Resultado:</strong> Soporta 5 años sin reparación</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Producción Farmacéutica 2,000 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiLiso M² Fino (salas limpias ISO 7)</li>
                      <li><strong>Color:</strong> Blanco estéril</li>
                      <li><strong>Certificación:</strong> GMP, HACCP, FDA</li>
                      <li><strong>Resultado:</strong> Pasaron todas inspecciones, producción certificada</li>
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

const TechnicalSpecialDetail = () => (
  <LanguageProvider>
    <TechnicalSpecialDetailContent />
  </LanguageProvider>
);

export default TechnicalSpecialDetail;
