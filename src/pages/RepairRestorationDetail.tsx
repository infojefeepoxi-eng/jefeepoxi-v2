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
import { ArrowLeft, CheckCircle, Phone, MessageCircle, Wrench, Building, Home, Factory, Hammer, Settings, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import reparacionGrietasImage from '@/assets/reparacion-grietas-baches.webp';
import restauracionRecubrimientosImage from '@/assets/restauracion-recubrimientos.webp';
import selladoJuntasImage from '@/assets/sellado-juntas.webp';
import renovacionGarajesImage from '@/assets/renovacion-garajes.webp';
import renovacionPisosComercialesImage from '@/assets/renovacion-pisos-comerciales.webp';

const RepairRestorationDetailContent = () => {
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
            placeholder={systemName || "ej. Reparación, restauración, renovación..."}
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

  // Productos/servicios basados en CATEGORIA_7_REMONT_VIDNOVLENNYA.md
  const products = [
    {
      id: 'grietas',
      icon: Hammer,
      title: 'Reparación de Grietas y Baches',
      subtitle: 'Reparación estructural de daños en hormigón',
      image: reparacionGrietasImage,
      description: 'Reparación duradera de grietas y baches con sistemas más fuertes que el hormigón original',
      problems: [
        'Grietas en piso hormigón (por asentamiento, cargas)',
        'Baches por caída objetos pesados',
        'Desconchados junto puertas y accesos',
        'Deterioro hormigón por humedad',
        'Necesidad reparación fuerte duradera'
      ],
      solutions: [
        'MÁS FUERTE QUE HORMIGÓN - reparación más duradera que original',
        'Sin retracción - no forma grietas nuevas',
        'Adherencia perfecta - no se despega',
        'Se puede capa gruesa una vez (hasta 50mm)',
        'Curado rápido - en 24 horas carga completa'
      ],
      systems: [
        {
          name: 'EpoxiRepara M² Mortero',
          badge: 'REPARACIÓN ESTRUCTURAL',
          description: 'Reparación estructural',
          basedOn: 'Flowmortar',
          thickness: '5-50mm (desde pequeños desconchados hasta baches grandes)',
          curing: '24 horas',
          compression: 'Resistencia compresión >100 N/mm² (¡más fuerte que hormigón!)',
          adhesion: 'Adherencia >3 N/mm² (no se despega)',
          shrinkage: 'Retracción compensada (no se agrieta)',
          workability: 'Trabajabilidad 45 minutos a 20°C',
          price: '30-50 €/m²',
          whyBest: [
            'MÁS FUERTE QUE HORMIGÓN - reparación más duradera que original',
            'Sin retracción - no forma grietas nuevas',
            'Adherencia perfecta - no se despega',
            'Se puede capa gruesa una vez (hasta 50mm)',
            'Curado rápido - en 24 horas carga completa'
          ],
          finish: 'Mortero estructural alta resistencia',
          types: [
            'Grietas pequeñas (1-5mm): espesor 5-10mm',
            'Grietas medianas (5-20mm): espesor 10-20mm',
            'Baches grandes (20-100mm): espesor 20-50mm',
            'Grietas estructurales: reparación completa + armado'
          ],
          technology: [
            'Apertura grieta (perfil V)',
            'Limpieza polvo y residuos',
            'Imprimación EpoxiBase M² Imprimación',
            'Relleno EpoxiRepara M² Mortero',
            'Nivelación nivel piso',
            'Recubrimiento sistema principal (si necesario)'
          ],
          durability: 'Reparación de larga duración'
        }
      ]
    },
    {
      id: 'antiguos',
      icon: Building,
      title: 'Restauración de Recubrimientos Antiguos',
      subtitle: 'Renovación sobre recubrimientos existentes',
      image: restauracionRecubrimientosImage,
      description: 'Renovación económica de recubrimientos antiguos sin demolición completa',
      problems: [
        'Recubrimiento epoxi viejo se descascara',
        'Baldosas agrietadas y se caen',
        'Pintura vieja se descascara',
        'Quieren renovar sin demolición completa',
        'Presupuesto limitado'
      ],
      solutions: [
        'No necesita demoler todo recubrimiento viejo',
        'Ahorro 50-70% en preparación',
        'Rápido - listo en un día',
        'Base perfecta para cualquier sistema Epoxi M²'
      ],
      systems: [
        {
          name: 'EpoxiBase M² Imprimación',
          badge: 'IMPRIMACIÓN RECUBRIMIENTOS VIEJOS',
          description: 'Imprimación penetrante',
          basedOn: 'Flowcoat Primer',
          thickness: 'Penetra hasta 3mm en base',
          curing: '6-24 horas',
          penetration: 'Penetración hasta 3mm en base',
          consolidation: 'Fortalece superficies débiles',
          adhesion: 'Adherencia >2.5 N/mm²',
          recoat: 'Tiempo repintado 6-24 horas',
          viscosity: 'Baja para penetración profunda',
          price: '8-15 €/m²',
          whyBest: [
            'No necesita demoler todo recubrimiento viejo',
            'Ahorro 50-70% en preparación',
            'Rápido - listo en un día',
            'Base perfecta para cualquier sistema Epoxi M²'
          ],
          finish: 'Imprimación penetrante consolidante',
          when: [
            'Epoxi viejo - se descascara pero base firme',
            'Hormigón poroso - se desmorona, produce polvo',
            'Base débil - necesita fortalecer',
            'Baldosas - buenas pero algunas cayeron'
          ],
          how: [
            'Penetra profundo en poros hormigón',
            'Fortalece capas débiles',
            'Crea base perfecta para recubrimiento nuevo',
            'Sella polvo y grietas pequeñas'
          ]
        },
        {
          name: 'EpoxiCoat M² Estándar',
          badge: 'RENOVACIÓN ECONÓMICA',
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
            'Rápido - en 2 días listo',
            'Se puede aplicar sobre recubrimiento viejo',
            'Protege de deterioro posterior'
          ],
          finish: 'Liso aplicado con rodillo',
          when: [
            'Presupuesto limitado - necesita barato',
            'Renovación cosmética - solo refrescar',
            'Oficinas - carga ligera',
            'Almacenes - proteger de polvo'
          ]
        }
      ]
    },
    {
      id: 'juntas',
      icon: Settings,
      title: 'Sellado de Juntas y Conexiones',
      subtitle: 'Sellado elástico de juntas de dilatación',
      image: selladoJuntasImage,
      description: 'Sellado profesional de juntas de dilatación y conexiones con materiales elásticos',
      problems: [
        'Juntas dilatación se separaron',
        'Agua filtra por juntas',
        'Sellador viejo se agrietó',
        'Juntas entre piso y paredes',
        'Conexiones móviles'
      ],
      solutions: [
        'ELÁSTICO - se mueve con hormigón, no se rompe',
        'Compensa movimientos hasta 25% ancho junta',
        'Impermeable - no filtra',
        'Durabilidad 10-15 años',
        'No endurece "en piedra" - queda flexible'
      ],
      systems: [
        {
          name: 'Sellador M² Módulo Bajo',
          badge: 'PARA JUNTAS DILATACIÓN',
          description: 'PU módulo bajo',
          basedOn: 'PU901',
          thickness: 'Según junta',
          curing: '24 horas',
          material: 'Sellador poliuretano módulo bajo',
          elasticity: 'Alta (se mueve con hormigón)',
          adhesion: 'A hormigón, metal, recubrimientos viejos',
          color: 'Gris RAL7047',
          packaging: '600ml (cómodo para juntas)',
          price: '8-15 €/m.l.',
          whyBest: [
            'ELÁSTICO - se mueve con hormigón, no se rompe',
            'Compensa movimientos hasta 25% ancho junta',
            'Impermeable - no filtra',
            'Durabilidad 10-15 años',
            'No endurece "en piedra" - queda flexible'
          ],
          finish: 'Sellador elástico poliuretano',
          applications: [
            'Juntas dilatación en piso',
            'Conexiones hormigón/hormigón',
            'Juntas estructuras prefabricadas',
            'Conexiones móviles'
          ],
          technology: [
            'Limpieza sellador viejo',
            'Preparación bordes junta',
            'Imprimación (si necesario)',
            'Relleno Sellador M² Módulo Bajo',
            'Formación perfil',
            'Listo en 24 horas'
          ]
        },
        {
          name: 'Sellador M² Híbrido',
          badge: 'SELLADOR UNIVERSAL',
          description: 'Juntas flexibles',
          basedOn: 'SP540',
          thickness: 'Según aplicación',
          curing: '24 horas',
          material: 'Sellador elástico híbrido',
          application: 'Trabajos interiores y exteriores',
          adhesion: 'A mayoría materiales',
          elasticity: 'Media',
          price: '5-12 €/m.l.',
          whyBest: [
            'Universal - para mayoría tareas',
            'Simple de usar',
            'Buena relación precio/calidad',
            'Aplicación rápida'
          ],
          finish: 'Sellador híbrido universal',
          when: [
            'Objetos residenciales - juntas garajes',
            'Oficinas - juntas perimetrales',
            'Tiendas - juntas cosméticas',
            'Almacenes - juntas junto puertas'
          ]
        }
      ]
    },
    {
      id: 'garajes',
      icon: Home,
      title: 'Renovación Garajes Residenciales',
      subtitle: 'Renovación completa de garajes domésticos',
      image: renovacionGarajesImage,
      description: 'Renovación completa de garajes domésticos eliminando manchas y daños',
      problems: [
        'Manchas aceite absorbidas durante años',
        'Grietas por heladas',
        'Desconchados junto puertas',
        'Produce polvo constantemente',
        'Aspecto descuidado'
      ],
      solutions: [
        'Manchas bloqueadas para siempre, no vuelven aparecer',
        'Recubrimiento elástico no se agrieta',
        'Ya NO produce polvo, fácil lavar',
        'Como garaje nuevo'
      ],
      systems: [
        {
          name: 'EpoxiGarage M² Residencial',
          badge: 'RENOVACIÓN GARAJES DOMÉSTICOS',
          description: 'Para garajes domésticos',
          basedOn: 'Flowcoat SF41',
          thickness: '0.3-0.5mm',
          curing: '24h peatonal, 48h vehículos',
          resistance: 'Aceites y combustibles',
          price: '13-20 €/m²',
          whyBest: [
            'Manchas bloqueadas para siempre, no vuelven aparecer',
            'Recubrimiento elástico no se agrieta',
            'Ya NO produce polvo, fácil lavar',
            'Como garaje nuevo'
          ],
          finish: 'Liso brillante o mate',
          problems: [
            'Manchas aceite: Desengrase + EpoxiBase M² + EpoxiGarage M²',
            'Grietas heladas: EpoxiRepara M² (grietas) + EpoxiGarage M² (toda área)',
            'Polvo y desmoronamiento: EpoxiBase M² Imprimación + EpoxiGarage M²'
          ],
          technology: [
            'Limpieza aceite y suciedad',
            'Reparación grietas EpoxiRepara M²',
            'Lijado hasta hormigón limpio',
            'Imprimación EpoxiBase M² Imprimación',
            '2 capas EpoxiGarage M² Residencial',
            'Listo: ¡Garaje como nuevo!'
          ],
          time: '2-3 días reparación',
          durability: 'Sistema duradero'
        }
      ]
    },
    {
      id: 'comerciales',
      icon: Factory,
      title: 'Renovación Pisos Comerciales',
      subtitle: 'Renovación rápida de oficinas y comercios',
      image: renovacionPisosComercialesImage,
      description: 'Renovación rápida de pisos comerciales sin cerrar el negocio',
      problems: [
        'Desgaste en zonas alto tráfico',
        'Daños por muebles y equipos',
        'Pérdida aspecto exterior',
        'Daños localizados',
        'Necesita reparación rápida sin cerrar'
      ],
      solutions: [
        'Capa fina (1-2mm) - no cambia nivel',
        'Autonivelante - no necesita preparación perfecta',
        'Rápido - listo en 24 horas',
        'Se puede sobre recubrimiento existente',
        'Superficie perfectamente lisa'
      ],
      systems: [
        {
          name: 'EpoxiLiso M² Autonivelante',
          badge: 'RENOVACIÓN RÁPIDA OFICINAS',
          description: 'Acabado perfectamente liso',
          basedOn: 'Sistemas Autonivelantes',
          thickness: '1-2mm - seca rápido',
          curing: '24 horas',
          selfLevel: 'Autonivelante - no necesita preparación cuidadosa',
          existing: 'Se puede sobre recubrimiento existente',
          surface: 'Perfectamente lisa',
          price: '16-25 €/m²',
          whyBest: [
            'Capa fina (1-2mm) - no cambia nivel',
            'Autonivelante - no necesita preparación perfecta',
            'Rápido - listo en 24 horas',
            'Se puede sobre recubrimiento existente',
            'Superficie perfectamente lisa'
          ],
          finish: 'Perfectamente liso renovado',
          applications: [
            'Renovación pisos oficina',
            'Reparación rápida tiendas',
            'Renovación cosmética reception',
            'Preparación para alquiler locales'
          ]
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="Reparación y Restauración Pavimentos Epoxi Valencia"
        description="Reparación profesional de pavimentos epoxi en Valencia. Restauración de grietas, baches y recubrimientos dañados. Presupuesto gratuito ☎️ +34 622 313 855"
        canonical="https://jefeepoxi.com/services/repair-restoration"
        keywords="reparación pavimentos valencia, restauración suelos epoxi, reparar grietas pavimento, renovación pisos industriales, sellado juntas"
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
              <Wrench className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Reparación y Restauración
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Soluciones de restauración, autonivelado e impermeabilización
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-8">
                <p className="text-primary font-semibold">
                  Para: Cualquier objeto con pisos dañados
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✓ Diagnóstico gratuito
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  ✓ Más fuerte que hormigón original
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  ✓ Reparación duradera
                </div>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  ✓ Sin demolición completa
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
                Nuestras Soluciones de Reparación
              </h2>
              <p className="text-lg text-muted-foreground">
                Sistemas Epoxi M² para restaurar y mejorar pisos dañados
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

        {/* Additional Services for Repair Projects */}
        <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Servicios Adicionales para Proyectos de Reparación
                </h2>
                <p className="text-lg text-muted-foreground">
                  Servicios profesionales completos incluidos en todos nuestros proyectos de reparación
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Free Diagnosis */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Diagnóstico Gratuito</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Inspección especialista - evaluación estado piso
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Mediciones - áreas, profundidad daños
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Pruebas - resistencia hormigón, humedad
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Informe - descripción detallada problemas
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Presupuesto - costo exacto reparación
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quality Guarantee */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Control de Calidad</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Diagnóstico gratuito - siempre
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Presupuesto exacto - sin costos ocultos
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Reparación de máxima durabilidad
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Plazos - o compensación
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Calidad - mejor que estaba
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Emergency Repairs */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Reparaciones Urgentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Visita en 2 horas - dentro ciudad
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Inicio trabajos - día contacto
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Reparación express - sobreprecio +30%, pero 2x más rápido
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Disponible 24/7 para emergencias
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
                  ¿Qué Sistema Elegir para Reparación?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Guía rápida para seleccionar el sistema de reparación ideal
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para reparación estructural (grietas, baches):</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiRepara M² Mortero</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(más fuerte que hormigón)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para fortalecer hormigón débil:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiBase M² Imprimación</span>
                  </div>
                  <p className="text-xs text-muted-foreground">+ EpoxiBase M² Universal</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para sellado juntas:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Sellador M² Módulo Bajo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(dilatación) / Sellador M² Híbrido (normales)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para renovación garajes:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiGarage M² Residencial</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(práctico + accesible)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para renovación oficinas:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiLiso M² Autonivelante</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(rápido + bonito)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para renovación almacenes:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiCoat M² Estándar</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(económico) o EpoxiRápido M² (duradero)</p>
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
                ¿No sabe qué tipo de reparación necesita su piso?
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
                          window.open('https://wa.me/34622313855?text=Hola, necesito consulta gratuita para reparación de pisos. ¿Podrían visitarme?', '_blank');
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
                  ¡Contáctenos para el cálculo de su reparación!
                </h3>
                <p className="text-black/80 mb-4">
                  Nuestros expertos le ayudarán a elegir la solución de reparación perfecta
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90 hover:text-black">
                      Solicitar Presupuesto Detallado
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Solicitar Presupuesto - Reparación y Restauración</DialogTitle>
                    </DialogHeader>
                    <QuoteForm productTitle="Reparación y Restauración" />
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
                Ejemplos de Proyectos de Reparación Realizados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Almacén Viejo 2,000 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Estado:</strong> Grietas, baches, polvo, manchas aceite</li>
                      <li><strong>Reparación:</strong> Grietas: EpoxiRepara M² (150 m.l.) + Baches: EpoxiRepara M² (50 m²) + Toda área: EpoxiBase M² + EpoxiCoat M²</li>
                      <li><strong>Tiempo:</strong> 7 días</li>
                      <li><strong>Precio:</strong> 28,000€ (en vez de 80,000€ piso nuevo)</li>
                      <li><strong>Resultado:</strong> Como piso nuevo por 1/3 precio</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Garaje Después Inundación 40 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Problema:</strong> Inundó, recubrimiento viejo se despegó</li>
                      <li><strong>Reparación:</strong> Eliminación recubrimiento viejo + Secado y desinfección + EpoxiBase M² + EpoxiGarage M²</li>
                      <li><strong>Tiempo:</strong> 3 días</li>
                      <li><strong>Precio:</strong> 800€</li>
                      <li><strong>Resultado:</strong> Mejor que estaba antes inundación</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Autoservicio - Reparación Local</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Problema:</strong> Zona dañada bajo elevador</li>
                      <li><strong>Reparación:</strong> EpoxiRepara M² (bache) + EpoxiRápido M² (zona 3x3m)</li>
                      <li><strong>Tiempo:</strong> 1 día</li>
                      <li><strong>Precio:</strong> 500€</li>
                      <li><strong>Resultado:</strong> Taller funcionó, reparación invisible</li>
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

const RepairRestorationDetail = () => (
  <LanguageProvider>
    <RepairRestorationDetailContent />
  </LanguageProvider>
);

export default RepairRestorationDetail;
