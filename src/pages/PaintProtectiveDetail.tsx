import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import SEOHead from '@/components/SEOHead';
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
import { ArrowLeft, CheckCircle, Phone, MessageCircle, Paintbrush, Home, Building, Warehouse, Shield, Hammer, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import objetosPequenosImage from '@/assets/objetos-pequenos.webp';
import oficinasAlmacenesImage from '@/assets/oficinas-almacenes-ligeros.webp';
import talleresGarajesImage from '@/assets/talleres-garajes-domesticos.webp';
import proteccionMetalImage from '@/assets/proteccion-metal.webp';
import sotanosLocalesImage from '@/assets/sotanos-locales-tecnicos.webp';

const PaintProtectiveDetailContent = () => {
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
            placeholder={systemName || "ej. Laca brillante, protector, económico..."}
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

  // Productos/servicios basados en CATEGORIA_8_FARBUVANNYA_ZAHYSNI.md
  const products = [
    {
      id: 'pequenos',
      icon: Home,
      title: 'Objetos Pequeños (Soluciones Económicas)',
      subtitle: 'Recubrimientos accesibles para áreas pequeñas',
      image: objetosPequenosImage,
      description: 'Soluciones económicas para objetos pequeños con presupuesto limitado',
      problems: [
        'Presupuesto limitado - sistemas caros no al alcance',
        'Áreas pequeñas (20-200 m²)',
        'Necesidad resultado rápido',
        'Carga ligera (no necesita súper resistencia)',
        'Quieren proteger hormigón pero barato'
      ],
      solutions: [
        'PRECIO ACCESIBLE - desde 10€/m² con trabajo',
        'Rápido - en 2 días listo',
        'Aplicación simple - mínima preparación',
        'Protege hormigón de deterioro',
        'Ya no produce polvo',
        'Fácil lavar con agua'
      ],
      systems: [
        {
          name: 'EpoxiCoat M² Estándar',
          badge: 'SOLUCIÓN MÁS ACCESIBLE',
          description: 'Protección básica',
          basedOn: 'Flowcoat Standard',
          thickness: '0.2-0.4mm (recubrimiento fino)',
          curing: '16-24 horas',
          resistance: 'Aceites y químicos suaves',
          application: 'Simple con rodillo o brocha',
          lifetime: '5-8 años',
          price: '10-16 €/m²',
          whyBest: [
            'PRECIO ACCESIBLE - desde 10€/m² con trabajo',
            'Rápido - en 2 días listo',
            'Aplicación simple - mínima preparación',
            'Protege hormigón de deterioro',
            'Ya no produce polvo',
            'Fácil lavar con agua'
          ],
          finish: 'Mate o ligero satinado',
          colors: 'Gris, beige, verde, azul (estándares)',
          ideal: [
            'Talleres domésticos y trasteros',
            'Almacenes pequeños hasta 200 m²',
            'Sótanos y locales técnicos',
            'Garajes carga ligera',
            'Oficinas presupuesto limitado'
          ]
        },
        {
          name: 'EpoxiBase M² Imprimación',
          badge: 'PROTECCIÓN HORMIGÓN NUEVO',
          description: 'Imprimación penetrante',
          basedOn: 'Flowcoat Primer',
          thickness: 'Penetra hasta 3mm en hormigón',
          curing: '6-24 horas',
          penetration: 'Penetración hasta 3mm',
          consolidation: 'Fortalece superficie',
          adhesion: 'Adherencia >2.5 N/mm²',
          consumption: '150-300 g/m²',
          function: 'Sellado y fortalecimiento',
          price: '7-13 €/m²',
          whyBest: [
            'BARATO - desde 7€/m²',
            'Penetra profundo - fortalece base',
            'Sella polvo para siempre',
            'Preparación perfecta para pintura',
            'Se puede usar como recubrimiento independiente'
          ],
          finish: 'Imprimación penetrante consolidante',
          when: [
            'Hormigón nuevo - necesita sellar',
            'Hormigón poroso - produce polvo y se desmorona',
            'Solera débil - necesita fortalecer',
            'Preparación para otros sistemas'
          ],
          result: 'Hormigón deja de producir polvo, se vuelve más fuerte'
        }
      ]
    },
    {
      id: 'oficinas',
      icon: Building,
      title: 'Oficinas y Almacenes Ligeros',
      subtitle: 'Recubrimientos premium para espacios comerciales',
      image: oficinasAlmacenesImage,
      description: 'Recubrimientos tipo laca para oficinas y almacenes con carga ligera',
      problems: [
        'Necesidad renovación rápida',
        'Carga ligera - no necesita súper resistencia',
        'Aspecto estético importante',
        'Mínima parada',
        'Relación precio/calidad'
      ],
      solutions: [
        'BRILLO HERMOSO - como piso laca',
        'Fácil limpiar - solo con mopa húmeda',
        'Resistente sillas oficina con ruedas',
        'No deja marcas de calzado',
        'Montaje rápido - oficina funciona'
      ],
      systems: [
        {
          name: 'EpoxiLaca M² Brillante',
          badge: 'RECUBRIMIENTO LACA PREMIUM',
          description: 'Acabado tipo laca',
          basedOn: 'Flowcoat Lacquer',
          thickness: '0.15-0.3mm',
          curing: '24 horas',
          finish: 'Brillante tipo laca',
          chemical: 'Buena resistencia química',
          durability: '8-12 años',
          maintenance: 'Limpieza fácil',
          price: '13-23 €/m²',
          whyBest: [
            'BRILLO HERMOSO - como piso laca',
            'Fácil limpiar - solo con mopa húmeda',
            'Resistente sillas oficina con ruedas',
            'No deja marcas de calzado',
            'Montaje rápido - oficina funciona'
          ],
          technology: [
            'Preparación: Lijado ligero',
            'Imprimación: EpoxiBase M² Imprimación',
            '1ª capa: EpoxiLaca M² Brillante con rodillo',
            '2ª capa: EpoxiLaca M² Brillante (tras 6-8 horas)',
            'Opcional 3ª capa: Para máximo brillo'
          ],
          time: '2 días trabajo',
          walkable: 'En 24 horas',
          fullLoad: 'En 48 horas',
          colors: 'Gama completa RAL (cualquier color pedido)',
          popular: [
            'Gris claro RAL 7035 (neutral)',
            'Blanco RAL 9010 (espacio, limpieza)',
            'Beige RAL 1013 (cálido, acogedor)'
          ]
        },
        {
          name: 'EpoxiCoat M² Estándar',
          badge: 'PARA ALMACENES LIGEROS',
          description: 'Para locales almacenamiento carga ligera',
          basedOn: 'Flowcoat Standard',
          thickness: '0.2-0.4mm',
          curing: '16-24 horas',
          price: '10-16 €/m²',
          whyBest: [
            'Protege de polvo',
            'Fácil lavar',
            'Resistente derrames',
            'Precio accesible',
            'Montaje rápido'
          ],
          finish: 'Mate protector',
          applications: [
            'Almacenes papelería, ropa, productos',
            'Locales archivo',
            'Trasteros y despensas',
            'Locales técnicos'
          ]
        }
      ]
    },
    {
      id: 'talleres',
      icon: Hammer,
      title: 'Talleres y Garajes Domésticos',
      subtitle: 'Soluciones DIY para talleres caseros',
      image: talleresGarajesImage,
      description: 'Recubrimientos para talleres domésticos con posibilidad de aplicación DIY',
      problems: [
        'Necesita protección pero no muy caro',
        'Aceite y lubricante gotea periódicamente',
        'Caen herramientas',
        'Quieren bonito pero práctico',
        'Pueden hacer ellos mismos (proyectos DIY)'
      ],
      solutions: [
        'Brillo laca hermoso',
        'Aceite no se absorbe - fácil limpiar',
        'Resistente caída herramientas',
        'Fácil lavar al final trabajo',
        'Parece profesional'
      ],
      systems: [
        {
          name: 'EpoxiLaca M² Brillante',
          badge: 'PARA TALLERES DOMÉSTICOS',
          description: 'Brillo laca para talleres',
          basedOn: 'Flowcoat Lacquer',
          thickness: '0.15-0.3mm',
          curing: '24 horas',
          price: '13-23 €/m²',
          whyBest: [
            'Brillo laca hermoso',
            'Aceite no se absorbe - fácil limpiar',
            'Resistente caída herramientas',
            'Fácil lavar al final trabajo',
            'Parece profesional'
          ],
          finish: 'Laca brillante',
          diy: [
            'Preparación: Limpieza + lijado ligero lija',
            'Imprimación: EpoxiBase M² con rodillo (1 capa)',
            'Pintura: EpoxiLaca M² rodillo pelo corto (2 capas)',
            'Secado: 24 horas entre capas'
          ],
          kit: [
            'Instrucción paso a paso',
            'Herramientas necesarias',
            'Cálculo material',
            'Soporte técnico por teléfono'
          ]
        },
        {
          name: 'EpoxiGarage M² Residencial',
          badge: 'ALTERNATIVA GARAJES',
          description: 'Cuando elegir en vez de laca',
          basedOn: 'Flowcoat SF41',
          thickness: '0.4mm vs 0.2mm laca',
          curing: '24h peatonal, 48h vehículos',
          price: '13-20 €/m²',
          whyBest: [
            'Recubrimiento más grueso (0.4mm vs 0.2mm laca)',
            'Mejor resistencia aceites',
            'Más barato que laca',
            'Especialmente para garajes'
          ],
          finish: 'Mate resistente',
          when: [
            'Garaje se usa intensivamente',
            'Necesita mayor espesor',
            'Hay manchas aceite',
            'Presupuesto muy limitado'
          ]
        }
      ]
    },
    {
      id: 'metal',
      icon: Shield,
      title: 'Protección Estructuras Metal',
      subtitle: 'Recubrimientos anticorrosión para metal',
      image: proteccionMetalImage,
      description: 'Recubrimientos protectores para estructuras metálicas contra corrosión',
      problems: [
        'Corrosión pisos metálicos y plataformas',
        'Protección ambiente agresivo',
        'Antideslizante sobre metal',
        'Ruido pasos sobre metal',
        'Condensación superficies metálicas'
      ],
      solutions: [
        'PROTECCIÓN ANTICORROSIÓN - metal no se oxida',
        'Adherencia a metal excelente',
        'Elástico - se mueve con metal',
        'Absorción ruido - menos ruido pasos',
        'Efecto antideslizante'
      ],
      systems: [
        {
          name: 'EpoxiProtect M² Film',
          badge: 'PROTECCIÓN METAL',
          description: 'Recubrimientos protectivos',
          basedOn: 'Pinturas Filmógenas',
          thickness: '0.2-0.4mm',
          curing: '24 horas',
          film: 'Formación película protectora',
          application: 'Aplicación como pintura',
          protection: 'Protección superficial',
          finishes: 'Múltiples acabados disponibles',
          price: '12-20 €/m²',
          whyBest: [
            'PROTECCIÓN ANTICORROSIÓN - metal no se oxida',
            'Adherencia a metal excelente',
            'Elástico - se mueve con metal',
            'Absorción ruido - menos ruido pasos',
            'Efecto antideslizante'
          ],
          finish: 'Película protectora elástica',
          applications: [
            'Escaleras metálicas y plataformas',
            'Escaleras contraincendios',
            'Plataformas técnicas',
            'Pasarelas y cruces',
            'Pisos metálicos naves'
          ],
          technology: [
            'Limpieza: Eliminación óxido, desengrase',
            'Imprimación: Especial para metal',
            'Recubrimiento: EpoxiProtect M² Film (2-3 capas)',
            'Protección: Capa adicional si necesario'
          ]
        },
        {
          name: 'EpoxiBase M² Imprimación',
          badge: 'IMPRIMACIÓN METAL',
          description: 'Imprimación especial superficies metálicas',
          basedOn: 'Flowcoat Primer',
          thickness: 'Penetra poros corrosión',
          curing: '6-24 horas',
          price: '8-15 €/m²',
          whyBest: [
            'Penetra poros corrosión',
            'Bloquea oxidación posterior',
            'Adherencia perfecta',
            'Base para cualquier recubrimiento'
          ],
          finish: 'Imprimación anticorrosión',
          applications: [
            'Preparación estructuras metálicas',
            'Base para sistemas protectores',
            'Tratamiento superficies oxidadas',
            'Imprimación universal metal'
          ]
        }
      ]
    },
    {
      id: 'sotanos',
      icon: Warehouse,
      title: 'Sótanos y Locales Técnicos',
      subtitle: 'Protección contra humedad y consolidación',
      image: sotanosLocalesImage,
      description: 'Sistemas de protección contra humedad y consolidación para sótanos',
      problems: [
        'Humedad y ambiente húmedo',
        'Moho en paredes y piso',
        'Polvo del hormigón',
        'Olor desagradable humedad',
        'Necesita protección simple'
      ],
      solutions: [
        'BLOQUEA HUMEDAD desde abajo (humedad capilar)',
        'Sella poros - moho no crece',
        'Fortalece hormigón débil',
        'Sin olor - se puede trabajar en local cerrado',
        'Barato - protección básica'
      ],
      systems: [
        {
          name: 'EpoxiBase M² Imprimación',
          badge: 'PROTECCIÓN CONTRA HUMEDAD',
          description: 'Imprimación penetrante que sella',
          basedOn: 'Flowcoat Primer',
          thickness: 'Penetra hasta 3mm',
          curing: '6-24 horas',
          price: '8-15 €/m²',
          whyBest: [
            'BLOQUEA HUMEDAD desde abajo (humedad capilar)',
            'Sella poros - moho no crece',
            'Fortalece hormigón débil',
            'Sin olor - se puede trabajar en local cerrado',
            'Barato - protección básica'
          ],
          finish: 'Imprimación sellante',
          applications: [
            'Sótanos edificios residenciales',
            'Sótanos técnicos',
            'Refugios',
            'Pasos subterráneos',
            'Parkings con problemas humedad'
          ],
          technology: [
            'Secado local (si muy húmedo)',
            'Limpieza moho y eflorescencias',
            'Aplicación EpoxiBase M² 2 capas',
            'Resultado: Seco, no produce polvo, moho no crece'
          ]
        },
        {
          name: 'EpoxiSeal M² Antihumedad',
          badge: 'MÁXIMA PROTECCIÓN HUMEDAD',
          description: 'Barrera de humedad',
          basedOn: 'Hydraseal DPM',
          thickness: '0.3mm',
          curing: '24 horas',
          material: 'Imprimación epoxi 2-componente',
          membrane: 'Membrana protección humedad capilar',
          waterproof: 'Impermeabilidad absoluta',
          durability: '15+ años',
          price: '15-25 €/m²',
          whyBest: [
            'Protección membrana - humedad no pasa',
            'Se puede aplicar sobre hormigón húmedo',
            'Protección vitalicia',
            'Base para cualquier recubrimiento encima'
          ],
          finish: 'Membrana impermeabilizante',
          when: [
            'Humedad alta en sótano',
            'Humedad capilar sube desde tierra',
            'Moho aparece constantemente',
            'Crítico proteger de humedad'
          ],
          system: [
            'EpoxiSeal M² Antihumedad (membrana)',
            'EpoxiBase M² Imprimación (imprimación)',
            'EpoxiCoat M² Estándar (acabado final)'
          ]
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="Pintura y Recubrimientos Protectores Epoxi Valencia | Económico"
        description="Pintura epoxi y recubrimientos protectores para garajes, almacenes y áreas pequeñas en Valencia. Soluciones económicas y duraderas ☎️ +34 622 313 855"
        canonical="https://jefeepoxi.com/services/painting-protective"
        keywords="pintura epoxi valencia, recubrimientos protectores, pintura garajes económica, laca epoxi, protección hormigón, pintura industrial"
        ogType="website"
      />
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
              <Paintbrush className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Pintura y Recubrimientos Protectores
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Recubrimientos de laca y protectores para proyectos económicos
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-8">
                <p className="text-primary font-semibold">
                  Para: Objetos pequeños, proyectos económicos, renovación de pisos
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✓ Desde 7€/m² con trabajo
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  ✓ Kits DIY disponibles
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  ✓ Listo en 2 días
                </div>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  ✓ Base agua sin olor
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
                Nuestras Soluciones Económicas de Pintura
              </h2>
              <p className="text-lg text-muted-foreground">
                Sistemas Epoxi M² accesibles para protección y renovación
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

        {/* Additional Services for Paint Projects */}
        <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Servicios Adicionales para Proyectos de Pintura
                </h2>
                <p className="text-lg text-muted-foreground">
                  Servicios profesionales completos incluidos en todos nuestros proyectos de pintura
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* DIY Support */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Soporte DIY</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Kits DIY completos - material + herramientas
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Instrucciones paso a paso con fotos
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Video-instrucciones (código QR)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Soporte técnico por teléfono
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Ahorro 30-40% en mano obra
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quick Application */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Aplicación Rápida</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Preparación mínima superficie
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Aplicación simple con rodillo
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Base agua sin olor
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Listo en 2 días
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Se puede sobre recubrimiento viejo
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Economic Solutions */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Soluciones Económicas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Desde 7€/m² con trabajo
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Kits DIY desde 250€ (25 m²)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Descuentos proyectos grandes
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Ofertas estacionales verano
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Materiales de calidad profesional
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
                  Guía rápida para seleccionar el sistema de pintura ideal
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para taller doméstico (quiero bonito):</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiLaca M² Brillante</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(brillo laca)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para almacén pequeño (necesito barato):</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiCoat M² Estándar</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(protección + precio accesible)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para sótano (problemas humedad):</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiSeal M² Antihumedad</span>
                  </div>
                  <p className="text-xs text-muted-foreground">+ EpoxiBase M²</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para oficina (rápido + bonito):</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiLaca M² Brillante</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(se puede fin de semana)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para estructuras metálicas:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiProtect M² Film</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(anticorrosión)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para hormigón nuevo (protección básica):</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiBase M² Imprimación</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(consolidación + sellado)</p>
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
                Consulta Gratuita
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                ¿No sabe qué sistema de pintura es ideal para su proyecto?
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
                          window.open('https://wa.me/34622313855?text=Hola, necesito consulta gratuita para pintura de pisos. ¿Podrían visitarme?', '_blank');
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Consulta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-2 text-black">
                  ¡Contáctenos para el cálculo de su proyecto!
                </h3>
                <p className="text-black/80 mb-4">
                  Nuestros expertos le ayudarán a elegir la solución de pintura perfecta
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90 hover:text-black">
                      Solicitar Presupuesto Detallado
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Solicitar Presupuesto - Pintura y Recubrimientos Protectores</DialogTitle>
                    </DialogHeader>
                    <QuoteForm productTitle="Pintura y Recubrimientos Protectores" />
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
                Ejemplos de Proyectos Realizados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Taller Doméstico 30 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiLaca M² Brillante</li>
                      <li><strong>Color:</strong> Gris claro RAL 7035</li>
                      <li><strong>Método:</strong> DIY (propias manos)</li>
                      <li><strong>Tiempo:</strong> 1 fin de semana</li>
                      <li><strong>Precio:</strong> 450€ (15€/m²)</li>
                      <li><strong>Resultado:</strong> "¡Parece showroom coches!"</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Almacén Pequeño 150 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiCoat M² Estándar</li>
                      <li><strong>Color:</strong> Gris estándar</li>
                      <li><strong>Tiempo:</strong> 3 días</li>
                      <li><strong>Precio:</strong> 1,800€ (12€/m²)</li>
                      <li><strong>Resultado:</strong> Ya no produce polvo, fácil limpiar</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Oficina 80 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiLaca M² Brillante</li>
                      <li><strong>Color:</strong> Beige RAL 1013</li>
                      <li><strong>Tiempo:</strong> 2 días (trabajaron noche)</li>
                      <li><strong>Precio:</strong> 1,600€ (20€/m²)</li>
                      <li><strong>Resultado:</strong> Como parquet laca por 1/3 precio</li>
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
    </>
  );
};

const PaintProtectiveDetail = () => (
  <LanguageProvider>
    <PaintProtectiveDetailContent />
  </LanguageProvider>
);

export default PaintProtectiveDetail;
