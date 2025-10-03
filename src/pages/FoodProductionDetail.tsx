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
import { ArrowLeft, CheckCircle, Phone, MessageCircle, Beef, Milk, Cookie, Wine, ChefHat, Snowflake, ChevronDown, ChevronUp, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const FoodProductionDetailContent = () => {
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
            placeholder={systemName || "ej. Antibacterial, HACCP, higiénico..."}
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

  // Productos/servicios basados en CATEGORIA_2_HARCHOVI_VYROBNYTSTVA.md
  const products = [
    {
      id: 'mataderos',
      icon: Beef,
      title: 'Mataderos y Cárnicos',
      subtitle: 'Sistemas higiénicos para procesamiento de carne',
      image: '/assets/project-industrial-blue-gray.jpg',
      description: 'Pisos antibacteriales para mataderos con contacto constante con sangre, grasas y proteínas',
      problems: [
        'Contacto constante con sangre, grasas y proteínas',
        'Necesidad de lavado frecuente con químicos',
        'Requisitos de control sanitario y certificación HACCP',
        'Riesgo de multiplicación bacteriana en poros del piso',
        'Humedad constante y lavado a presión'
      ],
      solutions: [
        'Superficie antibacterial - máxima higiene',
        'Lavado fácil bajo alta presión',
        'Resistente a sangre, grasas y proteínas',
        'Soporta desinfectantes químicos',
        'Certificación HACCP - pasa cualquier inspección',
        'Superficie sin juntas - las bacterias no tienen dónde esconderse'
      ],
      systems: [
        {
          name: 'EpoxiLimpio M² Antibacterial',
          badge: 'MEJOR PARA MATADEROS',
          description: 'Sistema higiénico HACCP',
          basedOn: 'Flowfresh con Polygiene®',
          thickness: '6-9mm',
          curing: '24 horas',
          antibacterial: 'Polygiene® integrada',
          haccp: 'Certificación HACCP y FDA',
          bacteria: 'Inhibe crecimiento hasta 99.9%',
          price: '40-55 €/m²',
          whyBest: [
            'Superficie antibacterial - máxima higiene',
            'Lavado fácil bajo alta presión',
            'Resistente a sangre, grasas y proteínas',
            'Soporta desinfectantes químicos',
            'Certificación HACCP - pasa cualquier inspección',
            'Superficie sin juntas - las bacterias no tienen dónde esconderse'
          ],
          finish: 'Liso antibacterial con tecnología Polygiene®',
          colors: 'Gris claro RAL 7035 (recomendado para cárnicos)',
          applications: [
            'Zonas de despiece y procesamiento',
            'Salas de corte y empacado',
            'Áreas de limpieza y desinfección',
            'Cámaras de maduración'
          ]
        },
        {
          name: 'EpoxiLimpio M² HD Resistente',
          badge: 'ZONAS DE DESPIECE',
          description: 'Alta resistencia al desgaste',
          basedOn: 'Flowfresh HD',
          thickness: '9mm',
          curing: '24 horas',
          wear: 'Máxima resistencia',
          impact: 'Alta resistencia a impactos',
          price: '53-70 €/m²',
          whyBest: [
            'Soporta cuchillos y herramientas pesadas',
            'Máxima resistencia al desgaste',
            'No se daña por impactos constantes',
            'Superficie rugosa para seguridad'
          ],
          finish: 'Rugoso antideslizante para zonas húmedas',
          applications: [
            'Zonas de despiece con herramientas',
            'Áreas de carga pesada',
            'Rampas y muelles de carga',
            'Zonas de alta actividad'
          ]
        }
      ]
    },
    {
      id: 'lacteos',
      icon: Milk,
      title: 'Lácteos y Queserías',
      subtitle: 'Sistemas para máxima higiene alimentaria',
      image: '/assets/project-decorative-white-black.jpg',
      description: 'Pisos higiénicos para lácteos con resistencia al ácido láctico y limpieza con vapor',
      problems: [
        'Ácido láctico y productos alcalinos de limpieza',
        'Humedad constante y vapor',
        'Altos requisitos de higiene',
        'Agua caliente y vapor en desinfección',
        'Grasas lácteas y suero'
      ],
      solutions: [
        'Superficie extra lisa - nada se adhiere',
        'Soporta vapor caliente en desinfección',
        'Resistencia al ácido láctico',
        'Esquinas redondeadas integradas (radio 100mm)',
        'Color blanco - se ve cualquier contaminación'
      ],
      systems: [
        {
          name: 'EpoxiHigiene M²',
          badge: 'MÁXIMA HIGIENE',
          description: 'Máxima higiene alimentaria',
          basedOn: 'Flowcrete HF',
          thickness: '4-6mm',
          curing: '24 horas',
          temperature: '-30°C a +100°C',
          steam: 'Limpieza con vapor hasta 150°C',
          waterproof: '100% sin poros',
          bacteriostatic: 'Superficie inerte',
          price: '32-46 €/m²',
          whyBest: [
            'Superficie extra lisa - se limpia en segundos',
            'Soporta vapor caliente hasta 150°C',
            'Resistencia al ácido láctico',
            'Esquinas redondeadas integradas',
            'Color blanco - se ve cualquier contaminación'
          ],
          finish: 'Extra liso para limpieza perfecta',
          colors: 'Blanco (recomendado), gris claro, azul claro',
          applications: [
            'Plantas procesadoras de leche',
            'Queserías y mantequillerías',
            'Salas de pasteurización',
            'Áreas de envasado lácteo'
          ]
        },
        {
          name: 'EpoxiLimpio M² Fino',
          badge: 'ZONAS DE ENVASADO',
          description: 'Capa fina autonivelante',
          basedOn: 'Flowfresh SL',
          thickness: '2-3mm',
          curing: '24 horas',
          selfLevel: 'Alta fluidez',
          surface: 'Lisa y uniforme',
          application: 'Rápida aplicación',
          price: '25-35 €/m²',
          whyBest: [
            'Superficie perfectamente lisa',
            'Fácil movimiento de carros',
            'Limpieza rápida',
            'Aspecto estético'
          ],
          finish: 'Perfectamente liso sin marcas',
          applications: [
            'Zonas de envasado',
            'Salas de control de calidad',
            'Oficinas de planta',
            'Pasillos de circulación'
          ]
        }
      ]
    },
    {
      id: 'panaderias',
      icon: Cookie,
      title: 'Panaderías y Confiterías',
      subtitle: 'Sistemas para producción de pan y repostería',
      image: '/assets/project-decorative-gold-black.jpg',
      description: 'Pisos antibacteriales para panaderías resistentes a harinas, azúcares y grasas',
      problems: [
        'Polvo de harina por todas partes',
        'Grasas y aceites',
        'Cambios de temperatura (hornos calientes - almacenes fríos)',
        'Lavado constante',
        'Requisitos de seguridad alimentaria'
      ],
      solutions: [
        'Recubrimiento antibacterial - previene moho',
        'Fácil eliminación de harina y azúcar',
        'Resistencia a grasas y aceites',
        'Se limpia sin residuos',
        'Certificación HACCP'
      ],
      systems: [
        {
          name: 'EpoxiLimpio M² Antibacterial',
          badge: 'ESTÁNDAR PANADERÍAS',
          description: 'Solución universal',
          basedOn: 'Flowfresh con Polygiene®',
          thickness: '6mm',
          curing: '24 horas',
          antibacterial: 'Polygiene® integrada',
          haccp: 'Certificación HACCP',
          price: '40-55 €/m²',
          whyBest: [
            'La harina se barre fácilmente (superficie lisa)',
            'Azúcar y jarabes no se absorben',
            'Resistencia a grasas',
            'Antibacterial - previene moho',
            'Limpieza diaria fácil'
          ],
          finish: 'Liso antibacterial',
          colors: 'Crema (recomendado), ocre, gris claro',
          applications: [
            'Talleres de producción de masa',
            'Zonas de horneado',
            'Departamentos de empaque',
            'Almacenes de materia prima'
          ]
        },
        {
          name: 'EpoxiLimpio M² Llana',
          badge: 'EQUIPOS PESADOS',
          description: 'Aplicación manual',
          basedOn: 'Flowfresh HF',
          thickness: '4-6mm',
          curing: '24 horas',
          application: 'Aplicación con llana',
          strength: 'Resistencia aumentada',
          equipment: 'Para equipos pesados',
          price: '35-50 €/m²',
          whyBest: [
            'Soporta mezcladores y amasadoras pesadas',
            'Resistente bajo presión de equipos',
            'Fácil reparación si se daña'
          ],
          finish: 'Texturizado resistente',
          applications: [
            'Zonas con equipos pesados',
            'Áreas de amasado',
            'Zonas de alto tráfico',
            'Reparaciones localizadas'
          ]
        }
      ]
    },
    {
      id: 'cerveceras',
      icon: Wine,
      title: 'Cervecerías y Bodegas',
      subtitle: 'Sistemas resistentes a ácidos y alcoholes',
      image: '/assets/project-industrial-yellow.jpg',
      description: 'Pisos resistentes a ácidos orgánicos y alcoholes para cervecerías y bodegas',
      problems: [
        'Ácidos (láctico, acético)',
        'Humedad constante',
        'Azúcares y extractos de malta',
        'Alcohol y ácidos orgánicos',
        'Altos requisitos de limpieza'
      ],
      solutions: [
        'Resistencia a todos los ácidos y alcoholes',
        'Desinfección fácil',
        'No absorbe olores',
        'Recubrimiento sin juntas'
      ],
      systems: [
        {
          name: 'EpoxiProtect M² Químico',
          badge: 'ZONAS DE FERMENTACIÓN',
          description: 'Máxima resistencia química a ácidos',
          basedOn: 'Flowshield',
          thickness: '3-6mm',
          curing: '24 horas',
          chemicalResistance: 'Alta a ácidos y álcalis',
          acids: 'Resistente a ácidos orgánicos',
          alcohol: 'Resistente a alcoholes',
          price: '28-40 €/m²',
          whyBest: [
            'Resistencia a todos los ácidos y alcoholes',
            'Desinfección fácil',
            'No absorbe olores',
            'Recubrimiento sin juntas'
          ],
          finish: 'Liso brillante o mate',
          applications: [
            'Salas de fermentación',
            'Bodegas de crianza',
            'Áreas de destilación',
            'Zonas de limpieza ácida'
          ]
        },
        {
          name: 'EpoxiLimpio M² Antibacterial',
          badge: 'ZONAS DE ENVASADO',
          description: 'Higiene + facilidad de limpieza',
          basedOn: 'Flowfresh con Polygiene®',
          thickness: '6mm',
          curing: '24 horas',
          antibacterial: 'Polygiene® integrada',
          cleaning: 'Limpieza fácil',
          price: '40-55 €/m²',
          whyBest: [
            'Superficie antibacterial',
            'Fácil limpieza y desinfección',
            'No retiene olores',
            'Acabado sin juntas'
          ],
          finish: 'Liso antibacterial',
          applications: [
            'Salas de envasado',
            'Áreas de etiquetado',
            'Zonas de almacén terminado',
            'Laboratorios de control'
          ]
        }
      ]
    },
    {
      id: 'restaurantes',
      icon: ChefHat,
      title: 'Restaurantes y Cocinas',
      subtitle: 'Sistemas para cocinas profesionales',
      image: '/assets/project-decorative-wood-marble.jpg',
      description: 'Pisos antibacteriales para cocinas profesionales con máxima seguridad e higiene',
      problems: [
        'Grasas y aceites de cocción',
        'Agua caliente y vapor',
        'Caída de utensilios y equipos',
        'Lavado constante con químicos',
        'Normas sanitarias'
      ],
      solutions: [
        'Certificación para contacto alimentario',
        'Protección antibacterial',
        'Se limpia fácilmente de grasa',
        'Buena apariencia',
        'Seguro para el personal'
      ],
      systems: [
        {
          name: 'EpoxiLimpio M² Antibacterial',
          badge: 'ESTÁNDAR COCINAS',
          description: 'Certificado para cocinas',
          basedOn: 'Flowfresh con Polygiene®',
          thickness: '6mm',
          curing: '24 horas',
          foodContact: 'Certificación contacto alimentario',
          antibacterial: 'Protección antibacterial',
          grease: 'Fácil limpieza de grasas',
          price: '40-55 €/m²',
          whyBest: [
            'Certificación para contacto alimentario',
            'Protección antibacterial',
            'Se limpia fácilmente de grasa',
            'Buena apariencia',
            'Seguro para el personal'
          ],
          finish: 'Liso antibacterial',
          colors: 'Gris claro, crema, blanco',
          applications: [
            'Cocina caliente (fogones, hornos)',
            'Cocina fría (ensaladas, cortes)',
            'Lavado de vajilla',
            'Almacenes de productos'
          ]
        },
        {
          name: 'EpoxiArte M² Aqua',
          badge: 'ZONAS DE LAVADO',
          description: 'Para zonas húmedas',
          basedOn: 'Peran STB Wet Areas',
          thickness: '5mm',
          curing: '24 horas',
          slip: 'R11-R13 antideslizante',
          waterproof: 'Completamente impermeable',
          texture: 'Rugosidad controlada',
          price: '40-60 €/m²',
          whyBest: [
            'Máximo antideslizante - seguridad del personal',
            'Impermeable - no se pudre',
            'Pendientes integradas hacia desagües',
            'Esquinas redondeadas radio 100mm'
          ],
          finish: 'Rugoso antideslizante',
          applications: [
            'Zonas de lavado de vajilla',
            'Áreas de limpieza',
            'Baños y vestuarios',
            'Zonas húmedas en general'
          ]
        }
      ]
    },
    {
      id: 'camaras',
      icon: Snowflake,
      title: 'Cámaras Frigoríficas',
      subtitle: 'Sistemas para temperaturas extremas',
      image: '/assets/project-metallic-garage.jpg',
      description: 'Pisos especiales para cámaras frigoríficas que curan a bajas temperaturas',
      problems: [
        'Temperaturas extremadamente bajas (-40°C)',
        'Condensación y hielo',
        'Cambios de temperatura (entrada de equipos)',
        'Grietas por frío en hormigón normal',
        'Dificultad de reparación (no se puede descongelar)'
      ],
      solutions: [
        'Montaje SIN descongelación completa de cámara',
        'Rápido - cámara funciona en 8 horas',
        'Elástico - soporta cambios de temperatura',
        'No se agrieta ni a -40°C',
        'Antibacterial - higiene también en frío'
      ],
      systems: [
        {
          name: 'EpoxiLimpio M² Rápido',
          badge: 'ESPECIAL PARA FRÍO',
          description: 'Curado rápido para frío',
          basedOn: 'Flowfresh RT',
          thickness: '3-6mm',
          curing: 'Desde -5°C (¡se puede montar en frío!)',
          serviceTime: '4-8 horas',
          elasticity: 'Alta - no se agrieta por frío',
          temperature: '-40°C a +80°C',
          price: '45-60 €/m²',
          whyBest: [
            'Montaje SIN descongelación completa de cámara',
            'Rápido - cámara funciona en 8 horas',
            'Elástico - soporta cambios de temperatura',
            'No se agrieta ni a -40°C',
            'Antibacterial - higiene también en frío'
          ],
          finish: 'Liso antibacterial resistente al frío',
          colors: 'Blanco, gris claro (recomendados para cámaras)',
          applications: [
            'Cámaras frigoríficas -40°C',
            'Congeladores industriales',
            'Túneles de congelación',
            'Almacenes refrigerados'
          ],
          savings: [
            'No necesita descongelar todo el almacén',
            'Mínima pérdida de producto',
            'Puesta en servicio rápida'
          ]
        },
        {
          name: 'PoliRápido M² Frío',
          badge: 'FRÍO EXTREMO',
          description: 'Para bajas temperaturas',
          basedOn: 'Flowfresh RT (versión poliuretano)',
          thickness: '4-8mm',
          curing: 'Desde -5°C',
          elasticity: 'Aún mayor elasticidad',
          outdoor: 'Ideal para almacenes exteriores fríos',
          price: '50-70 €/m²',
          whyBest: [
            'Aún mayor elasticidad',
            'Funciona desde -5°C',
            'Ideal para almacenes frigoríficos exteriores'
          ],
          finish: 'Poliuretano elástico',
          applications: [
            'Almacenes frigoríficos exteriores',
            'Cámaras de congelación extrema',
            'Zonas de carga refrigerada',
            'Muelles frigoríficos'
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
              <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Pisos para Producción Alimentaria
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Sistemas EpoxiLimpio M² con tecnología Polygiene® para máxima higiene alimentaria
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-8">
                <p className="text-primary font-semibold">
                  Para: Mataderos, lácteos, panaderías, restaurantes, cocinas, cámaras frigoríficas
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✓ Certificación HACCP
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  ✓ Tecnología Polygiene®
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  ✓ Antibacterial 99.9%
                </div>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  ✓ Certificación FDA
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid - Solo primera categoría por ahora */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nuestras Soluciones Higiénicas Especializadas
              </h2>
              <p className="text-lg text-muted-foreground">
                Sistemas EpoxiLimpio M² certificados para cada tipo de producción alimentaria
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
                                          {system.antibacterial && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Tecnología antibacterial:</span>
                                              <span className="font-medium">{system.antibacterial}</span>
                                            </div>
                                          )}
                                          {system.haccp && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Certificaciones:</span>
                                              <span className="font-medium">{system.haccp}</span>
                                            </div>
                                          )}
                                          {system.bacteria && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Eficacia antibacterial:</span>
                                              <span className="font-medium">{system.bacteria}</span>
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
                            Solicitar Presupuesto HACCP
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

        {/* Additional Services for Food Production */}
        <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Servicios Adicionales para Producciones Alimentarias
                </h2>
                <p className="text-lg text-muted-foreground">
                  Servicios profesionales especializados incluidos en todos nuestros proyectos HACCP
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Mandatory Elements */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Elementos Obligatorios (Incluidos)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Esquinas redondeadas con EpoxiLimpio M² Media Caña (radio 100mm)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Pendientes hacia desagües - integradas en recubrimiento
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Sellado de juntas - Sellador M² para juntas de dilatación
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Zonas antideslizantes - donde necesario para seguridad
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Certificaciones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Certificado HACCP del sistema
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Certificado FDA (para producciones de exportación)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Protocolo de pruebas
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Pasaporte técnico del objeto
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Warranty and Service */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Garantía</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Hasta 15 años en recubrimiento
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Soporte técnico 24/7
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Revisiones gratuitas una vez al año
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
                  Guía rápida para seleccionar el sistema EpoxiLimpio M² ideal según su producción alimentaria
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para matadero:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiLimpio M² Antibacterial</span>
                  </div>
                  <p className="text-xs text-muted-foreground">+ EpoxiLimpio M² HD (zonas despiece) + Rápido (cámaras frías)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para lácteos:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiHigiene M²</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(máxima higiene + lisura)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para panadería:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiLimpio M² Antibacterial</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(universal)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para restaurante:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiLimpio M² + EpoxiArte M² Aqua</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(cocina + lavado vajilla)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para cámara frigorífica:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiLimpio M² Rápido</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(montaje en frío) + PoliRápido M² (frío extremo)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para cervecería:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiProtect M² + EpoxiLimpio M²</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(fermentación + envasado)</p>
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
                Consulta Gratuita HACCP
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                ¿No sabe qué sistema es ideal para su producción alimentaria?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Lo que incluye:</h3>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Visita de especialista técnico alimentario
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Análisis de especificidad de producción
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Selección de sistema bajo certificación
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Cálculo con esquinas redondeadas incluidas
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Ayuda con certificación HACCP
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
                          window.open('https://wa.me/34622313855?text=Hola, necesito consulta gratuita para pisos alimentarios HACCP. ¿Podrían visitarme?', '_blank');
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Consulta HACCP
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-2 text-black">
                  ¡Ayudamos a pasar la certificación desde la primera vez!
                </h3>
                <p className="text-black/80 mb-4">
                  Nuestros expertos le ayudarán a elegir la solución perfecta para HACCP
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90 hover:text-black">
                      Solicitar Presupuesto HACCP
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Solicitar Presupuesto - Pisos Alimentarios HACCP</DialogTitle>
                    </DialogHeader>
                    <QuoteForm productTitle="Pisos para Producción Alimentaria" />
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
                Ejemplos de Proyectos Alimentarios Realizados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Matadero 2,500 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiLimpio M² Antibacterial + HD</li>
                      <li><strong>Zonas:</strong> Despiece (HD), Procesamiento (Antibacterial)</li>
                      <li><strong>Color:</strong> Gris claro RAL 7035</li>
                      <li><strong>Tiempo:</strong> 10 días por zonas</li>
                      <li><strong>Resultado:</strong> HACCP certificado primera vez</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Panadería 800 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiLimpio M² Antibacterial 6mm</li>
                      <li><strong>Color:</strong> Crema (Pigmento M² Crema)</li>
                      <li><strong>Tiempo:</strong> 3 días</li>
                      <li><strong>Resultado:</strong> Harina no se adhiere, fácil limpiar</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Lácteos 1,500 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiHigiene M² + esquinas 100mm</li>
                      <li><strong>Color:</strong> Blanco puro</li>
                      <li><strong>Tiempo:</strong> 7 días</li>
                      <li><strong>Resultado:</strong> Se limpia en minutos, soporta vapor caliente</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Restaurante 150 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiLimpio M² (cocina) + EpoxiArte M² Aqua (lavado)</li>
                      <li><strong>Colores:</strong> Gris + antideslizante</li>
                      <li><strong>Tiempo:</strong> 2 días</li>
                      <li><strong>Resultado:</strong> Pasó inspección sanitaria</li>
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

const FoodProductionDetail = () => (
  <LanguageProvider>
    <FoodProductionDetailContent />
  </LanguageProvider>
);

export default FoodProductionDetail;
