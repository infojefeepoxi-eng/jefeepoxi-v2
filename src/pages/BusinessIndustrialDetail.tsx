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
import { ArrowLeft, CheckCircle, Phone, MessageCircle, Warehouse, Factory, Truck, Building, ChevronDown, ChevronUp, Star, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessIndustrialDetailContent = () => {
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
            placeholder={systemName || "ej. Industrial, decorativo, antideslizante..."}
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

  // Productos/servicios basados en CATEGORIA_1_BIZNES_VYROBNYTSTVO.md
  const products = [
    {
      id: 'almacenes',
      icon: Warehouse,
      title: 'Pisos para Almacenes',
      subtitle: 'Sistemas para centros de almacenamiento y distribución',
      image: '/assets/project-warehouse-before-after.jpg',
      description: 'Pisos resistentes para almacenes con movimiento constante de equipos pesados (montacargas, apiladores)',
      problems: [
        'Movimiento constante de equipos pesados (montacargas, apiladores)',
        'Daños por caída de mercancías pesadas',
        'Necesidad de montaje rápido sin parar el trabajo del almacén',
        'Polvo del piso de hormigón',
        'Dificultad de limpieza'
      ],
      solutions: [
        'Montaje rápido - almacén funciona en 12 horas',
        'Resiste montacargas y apiladores pesados',
        'No produce polvo, fácil de limpiar',
        'Resistente a derrames de aceites y líquidos',
        'Durabilidad 10-15 años'
      ],
      systems: [
        {
          name: 'EpoxiRápido M²',
          badge: 'MEJOR PARA ALMACENES',
          description: 'Sistema de curado rápido',
          basedOn: 'Flowfast',
          thickness: '2-6mm',
          curing: '8-12 horas a 20°C',
          compression: '>80 N/mm²',
          chemical: 'Excelente',
          temperature: '-30°C a +80°C',
          price: '20-30 €/m²',
          whyBest: [
            'Montaje rápido - almacén funciona en 12 horas',
            'Resiste montacargas y apiladores pesados',
            'No produce polvo, fácil de limpiar',
            'Resistente a derrames de aceites y líquidos',
            'Durabilidad 10-15 años'
          ],
          finish: 'Liso, satinado o antideslizante',
          colors: 'Gama completa RAL (normalmente grises para almacenes)',
          consumption: '2.5-3.5 kg/m² según espesor'
        },
        {
          name: 'EpoxiForte M² Industrial',
          badge: 'PARA ZONAS DE CARGA',
          description: 'Máxima resistencia industrial',
          basedOn: 'Flowscreed',
          thickness: '4-9mm',
          curing: '24 horas',
          impact: 'Clase IR4',
          pointLoad: '>15 kN',
          wear: '<0.1g',
          slip: 'R11-R13',
          price: '34-48 €/m²',
          whyBest: [
            'Máxima resistencia - resiste caída de mercancías pesadas',
            'Superficie rugosa antideslizante',
            'Ideal para rampas y muelles',
            'No se destruye por impactos constantes'
          ],
          finish: 'Rugoso antideslizante con agregados de cuarzo',
          aggregates: 'Cuarzo calibrado 0.1-0.8mm'
        },
        {
          name: 'EpoxiLiso M² Autonivelante',
          badge: 'PARA ZONAS OFICINA',
          description: 'Acabado perfectamente liso',
          basedOn: 'Sistemas Autonivelantes',
          thickness: '1-4mm',
          curing: '24 horas',
          selfLevel: 'Flujo perfecto',
          surface: 'Lisa y uniforme',
          price: '16-25 €/m²',
          whyBest: [
            'Superficie perfectamente lisa',
            'Aspecto estético',
            'Fácil limpieza',
            'Apto para sillas de oficina con ruedas'
          ],
          finish: 'Perfectamente liso sin marcas'
        }
      ]
    },
    {
      id: 'fabricas',
      icon: Factory,
      title: 'Pisos para Fábricas',
      subtitle: 'Sistemas para plantas industriales y químicas',
      image: '/assets/project-industrial-blue-gray.jpg',
      description: 'Pisos químico-resistentes para fábricas con sustancias agresivas y cargas mecánicas constantes',
      problems: [
        'Sustancias químicas agresivas (ácidos, álcalis, disolventes)',
        'Temperaturas altas o bajas',
        'Carga mecánica constante',
        'Requisitos de limpieza de producción',
        'Necesidad de recubrimientos químico-resistentes'
      ],
      solutions: [
        'Resiste derrames de ácidos, álcalis, disolventes',
        'No se destruye por química agresiva',
        'Impermeable - fácil de lavar',
        'Durabilidad incluso en condiciones extremas'
      ],
      systems: [
        {
          name: 'EpoxiProtect M² Químico',
          badge: 'MEJOR PARA QUÍMICAS',
          description: 'Protección química superior',
          basedOn: 'Flowshield',
          thickness: '3-6mm',
          curing: '24 horas',
          chemicalResistance: 'Alta a ácidos y álcalis',
          wear: 'Clase AR 1',
          waterproof: 'Total',
          adhesion: '>2.5 N/mm²',
          price: '28-40 €/m²',
          whyBest: [
            'Resiste derrames de ácidos, álcalis, disolventes',
            'No se destruye por química agresiva',
            'Impermeable - fácil de lavar',
            'Durabilidad incluso en condiciones extremas'
          ],
          finish: 'Liso brillante o mate',
          applications: [
            'Fábricas químicas y petroquímicas',
            'Plantas de tratamiento de aguas',
            'Laboratorios industriales',
            'Industria farmacéutica'
          ]
        },
        {
          name: 'EpoxiTermo M² Alta Temp',
          badge: 'HASTA 1000°C',
          description: 'Para altas temperaturas extremas',
          basedOn: 'Isocrete K',
          thickness: '10-50mm según temperatura',
          curing: 'Térmico gradual',
          temperature: 'Hasta 1000°C',
          base: '100% mineral sin resinas',
          fireResistant: 'Certificado industrial',
          price: '55-80 €/m²',
          whyBest: [
            'Resiste temperaturas extremas',
            'No se quema, no se derrite',
            'Para hornos, calderas, fundiciones',
            'Certificación ignífuga'
          ],
          finish: 'Mineral refractario',
          applications: [
            'Hornos industriales y calderas',
            'Fundiciones',
            'Industria metalúrgica',
            'Plantas de biomasa'
          ]
        }
      ]
    },
    {
      id: 'logisticos',
      icon: Truck,
      title: 'Centros Logísticos',
      subtitle: 'Sistemas para centros de distribución automatizados',
      image: '/assets/project-industrial-yellow.jpg',
      description: 'Pisos para centros logísticos con trabajo 24/7 y sistemas automatizados de almacenamiento',
      problems: [
        'Trabajo 24/7 - no se puede parar',
        'Sistemas automatizados de almacenamiento (robots AGV)',
        'Áreas enormes (10,000+ m²)',
        'Altos requisitos de nivelación del piso',
        'Movimiento intenso constante'
      ],
      solutions: [
        'Montaje por zonas - centro funciona',
        'Puesta en servicio en 12 horas',
        'Mínima parada de producción',
        'Superficie perfectamente lisa para robots AGV',
        'Grandes áreas sin juntas'
      ],
      systems: [
        {
          name: 'EpoxiRápido M²',
          description: 'Montaje rápido para logística',
          thickness: '3mm',
          curing: '12 horas',
          resistance: 'Tráfico pesado',
          price: '20-30 €/m²'
        },
        {
          name: 'EpoxiLiso M² Autonivelante',
          description: 'Para almacenes automatizados',
          thickness: '1-4mm',
          curing: '24 horas',
          resistance: 'Superficie perfecta',
          price: '16-25 €/m²'
        }
      ]
    },
    {
      id: 'produccion',
      icon: Building,
      title: 'Naves de Producción',
      subtitle: 'Sistemas para talleres y áreas de manufactura',
      image: '/assets/project-metallic-garage.jpg',
      description: 'Pisos universales para diferentes tipos de producciones con diversos requisitos',
      problems: [
        'Diferentes tipos de producciones - diferentes requisitos',
        'Contacto con aceites, líquidos refrigerantes',
        'Caída de herramientas y piezas',
        'Requisitos de limpieza e higiene',
        'Zonas con diferentes cargas'
      ],
      solutions: [
        'Se puede trabajar sin parar ventilación (sin olor)',
        'Universal - apta para diferentes zonas',
        'Base para recubrimientos gruesos y finos',
        'Se puede mezclar con agregados de cuarzo'
      ],
      systems: [
        {
          name: 'EpoxiBase M² Universal',
          description: 'Base universal - SIN OLOR',
          thickness: '2mm',
          curing: '24 horas',
          resistance: 'Universal',
          price: '13-20 €/m²'
        },
        {
          name: 'EpoxiForte M² Industrial',
          description: 'Para talleres pesados',
          thickness: '6mm',
          curing: '24 horas',
          resistance: 'Máxima resistencia',
          price: '34-48 €/m²'
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
              <Factory className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Pisos para Negocio y Producción
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Sistemas certificados Epoxi M² para industria y logística con máximo rendimiento
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-8">
                <p className="text-primary font-semibold">
                  Para: Almacenes, fábricas, centros logísticos, naves de producción
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nuestras Soluciones Especializadas
              </h2>
              <p className="text-lg text-muted-foreground">
                Sistemas Epoxi M² adaptados para cada tipo de instalación industrial
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
                        {product.problems.map((problem, idx) => (
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
                                            <span className="text-muted-foreground">Tiempo curado:</span>
                                            <span className="font-medium">{system.curing}</span>
                                          </div>
                                          {system.compression && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Resistencia compresión:</span>
                                              <span className="font-medium">{system.compression}</span>
                                            </div>
                                          )}
                                          {system.chemical && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Resistencia química:</span>
                                              <span className="font-medium">{system.chemical}</span>
                                            </div>
                                          )}
                                          {system.temperature && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Temperatura servicio:</span>
                                              <span className="font-medium">{system.temperature}</span>
                                            </div>
                                          )}
                                          {system.impact && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Resistencia impacto:</span>
                                              <span className="font-medium">{system.impact}</span>
                                            </div>
                                          )}
                                          {system.slip && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Coeficiente antideslizante:</span>
                                              <span className="font-medium">{system.slip}</span>
                                            </div>
                                          )}
                                          {system.consumption && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Consumo:</span>
                                              <span className="font-medium">{system.consumption}</span>
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
                                        {system.aggregates && (
                                          <div>
                                            <span className="text-muted-foreground">Agregados: </span>
                                            <span className="font-medium">{system.aggregates}</span>
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

        {/* Additional Info Section */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Servicios Adicionales Incluidos
                </h2>
                <p className="text-lg text-muted-foreground">
                  Servicios profesionales completos para proyectos industriales
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Preparación Profesional</h3>
                  <p className="text-sm text-muted-foreground">Lijado mecánico, granallado, reparación de grietas</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Montaje Certificado</h3>
                  <p className="text-sm text-muted-foreground">Personal certificado Flowcrete, control de calidad</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Garantía Extendida</h3>
                  <p className="text-sm text-muted-foreground">Hasta 15 años, soporte técnico 24/7</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Mantenimiento</h3>
                  <p className="text-sm text-muted-foreground">Revisiones anuales, reparación express</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Ejemplos de Proyectos Realizados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Centro Logístico 15,000 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiRápido M² 3mm</li>
                      <li><strong>Color:</strong> RAL 7035 (Gris claro)</li>
                      <li><strong>Tiempo:</strong> 14 días por zonas</li>
                      <li><strong>Resultado:</strong> Centro funcionó sin parar</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fábrica Química 3,000 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiProtect M² Químico 5mm</li>
                      <li><strong>Zonas:</strong> Divididas por resistencia química</li>
                      <li><strong>Resultado:</strong> Resistencia a ácidos y álcalis</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Taller Mecánico 2,500 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiForte M² Industrial 6mm</li>
                      <li><strong>Acabado:</strong> Antideslizante</li>
                      <li><strong>Resultado:</strong> Seguridad + resistencia</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                ¿Necesita una solución para su proyecto industrial?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nuestros expertos le ayudarán a elegir el sistema Epoxi M² ideal para su instalación
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg">
                      Consulta Gratuita
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Solicitar Presupuesto - Pisos para Negocio y Producción</DialogTitle>
                    </DialogHeader>
                    <QuoteForm productTitle="Pisos para Negocio y Producción" />
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    window.location.href = 'tel:+34622313855';
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +34 622 313 855
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    window.open('https://wa.me/34622313855?text=Hola, estoy interesado en pisos para negocio y producción. ¿Podrían darme más información?', '_blank');
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const BusinessIndustrialDetail = () => (
  <LanguageProvider>
    <BusinessIndustrialDetailContent />
  </LanguageProvider>
);

export default BusinessIndustrialDetail;
