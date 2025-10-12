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
import { ArrowLeft, CheckCircle, Phone, MessageCircle, Package, Palette, Mountain, Settings, Zap, Hammer, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import pigmentosPolvoImage from '@/assets/pigmentos-polvo-coloracion.png';
import agregadosCuarzoImage from '@/assets/agregados-cuarzo.png';
import selladoresJuntasImage from '@/assets/selladores-juntas.png';
import componentesEspecialesImage from '@/assets/componentes-especiales.png';

const ComponentsMaterialsDetailContent = () => {
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
            <Label htmlFor="superficie">Cantidad estimada</Label>
            <Input
              id="superficie"
              placeholder="ej. 5 sacos, 10 kg"
              value={formData.superficie}
              onChange={(e) => setFormData(prev => ({ ...prev, superficie: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="direccion">Dirección de entrega</Label>
          <Input
            id="direccion"
            placeholder="Ciudad, provincia"
            value={formData.direccion}
            onChange={(e) => setFormData(prev => ({ ...prev, direccion: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="tipoAcabado">Tipo de material deseado</Label>
          <Input
            id="tipoAcabado"
            placeholder={systemName || "ej. Pigmentos, agregados, selladores..."}
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

  // Productos/servicios basados en CATEGORIA_11_DODATKOVO_PRODAYEMO.md
  const products = [
    {
      id: 'pigmentos',
      icon: Palette,
      title: 'Pigmentos en Polvo para Coloración',
      subtitle: '8 colores estándar para todos los sistemas',
      image: pigmentosPolvoImage,
      description: 'Pigmentos en polvo compatibles con todos los sistemas Epoxi M² para coloración personalizada',
      problems: [
        'Necesidad color concreto para proyecto',
        'Retocar recubrimiento existente',
        'Crear tonos únicos',
        'Reparación con color exacto',
        'Trabajo con volúmenes pequeños'
      ],
      solutions: [
        'Zonificación - zonas rojas peligro',
        'Marcado - salidas emergencia, zonas stop',
        'Acentos - detalles brillantes diseño',
        'Recubrimientos señalización - atención, peligro'
      ],
      systems: [
        {
          name: 'Pigmento M² Rojo',
          badge: 'ROJO ESTÁNDAR',
          description: 'Rojo estándar',
          basedOn: 'Flowfresh Red D',
          thickness: 'Pigmento en polvo (¡NO pasta!)',
          curing: 'Compatible todos sistemas',
          packaging: 'Saco 0,5 kg, Caja 50 unidades',
          consumption: '3-5% peso resina',
          price: '18.28 €/kg (saco 0,5kg = 9.14€)',
          whyBest: [
            'Zonificación - zonas rojas peligro',
            'Marcado - salidas emergencia, zonas stop',
            'Acentos - detalles brillantes diseño',
            'Recubrimientos señalización - atención, peligro'
          ],
          finish: 'Polvo pigmentante rojo',
          applications: [
            'Salidas emergencia centros comerciales',
            'Zonas peligro en producciones',
            'Franjas acentos diseño',
            'Logos color rojo'
          ]
        },
        {
          name: 'Pigmento M² Azul Oscuro',
          badge: 'AZUL CORPORATIVO',
          description: 'Azul oscuro',
          basedOn: 'Flowfresh Dark Blue D',
          thickness: 'Pigmento en polvo',
          curing: 'Compatible todos sistemas',
          price: '22.58 €/kg (saco 0,5kg = 11.29€)',
          whyBest: [
            'Colores corporativos - muchas empresas usan azul',
            'Temática marina - yacht-clubs, piscinas',
            'Centros médicos - asociación con limpieza',
            'Oficinas - solidez y confianza'
          ],
          finish: 'Polvo pigmentante azul',
          applications: [
            'Logos bancos y seguros',
            'Piscinas y aquaparques',
            'Centros médicos',
            'Empresas IT'
          ]
        },
        {
          name: 'Pigmento M² Verde Oscuro',
          badge: 'VERDE ECO',
          description: 'Verde oscuro',
          basedOn: 'Flowfresh Dark Green D',
          thickness: 'Pigmento en polvo',
          curing: 'Compatible todos sistemas',
          price: '23.65 €/kg (saco 0,5kg = 11.83€)',
          whyBest: [
            'Temática eco - empresas verdes',
            'Medicina - color médico tradicional',
            'Efectos naturales - bosque, hierba',
            'Efecto tranquilizante - SPA, zonas relax'
          ],
          finish: 'Polvo pigmentante verde',
          applications: [
            'Empresas ecológicas',
            'Centros médicos',
            'Zonas naturales',
            'Espacios relajación'
          ]
        },
        {
          name: 'Pigmento M² Gris Medio',
          badge: 'MÁS POPULAR INDUSTRIA',
          description: 'Gris medio',
          basedOn: 'Flowfresh Mid Grey D',
          thickness: 'Pigmento en polvo',
          packaging: 'Saco 1 kg, Caja 25 unidades',
          popular: 'Color más popular para industria',
          price: '18.28 €/kg (saco 1kg = 18.28€)',
          whyBest: [
            'Pisos industriales - práctico, no se ensucia',
            'Oficinas - neutral, profesional',
            'Almacenes - estándar sector',
            'Garajes - clásico'
          ],
          finish: 'Polvo pigmentante gris',
          applications: [
            'Naves industriales',
            'Oficinas corporativas',
            'Almacenes logísticos',
            'Garajes comerciales'
          ]
        }
      ]
    },
    {
      id: 'agregados',
      icon: Mountain,
      title: 'Agregados de Cuarzo',
      subtitle: 'Rellenos para refuerzo y efectos antideslizantes',
      image: agregadosCuarzoImage,
      description: 'Agregados de cuarzo para refuerzo de resistencia y creación de superficies antideslizantes',
      problems: [
        'Necesidad refuerzo resistencia recubrimiento',
        'Crear superficie antideslizante',
        'Efectos decorativos',
        'Ahorro espesor recubrimiento',
        'Reparación con textura exacta'
      ],
      solutions: [
        'Aumenta resistencia recubrimiento',
        'Reduce consumo resina',
        'Mejora antideslizante',
        'Universal para todos sistemas'
      ],
      systems: [
        {
          name: 'Relleno M² Extra Fino',
          badge: 'UNIVERSAL',
          description: 'Cuarzo extra fino',
          basedOn: 'Charge Extra Fine Filler',
          thickness: 'Mezcla cuarzo extra fino',
          packaging: 'Saco 25 kg',
          granulation: '0.1-0.3mm',
          color: 'Blanco cristalino',
          price: '1.27 €/kg (saco 25kg = 31.75€)',
          whyBest: [
            'Aumenta resistencia recubrimiento',
            'Reduce consumo resina',
            'Mejora antideslizante',
            'Universal para todos sistemas'
          ],
          finish: 'Agregado cuarzo fino',
          applications: [
            'Mezcla universal con resinas',
            'Capa base para resistencia',
            'Acabados finos - textura lisa',
            'Ahorro resina - hasta 30%'
          ],
          how: [
            'Mezcla con cualquier sistema Epoxi M²',
            'Proporción: 1-3 kg por 1 kg resina',
            'Mezcla cuidadosa',
            'Aplicación llana dentada'
          ]
        },
        {
          name: 'Relleno M² Sin Polvo',
          badge: 'SEGURO PARA SALUD',
          description: 'Cristalino seguro',
          basedOn: 'LDE Filler',
          thickness: 'Cuarzo cristalino sin polvo',
          safety: 'Menos 1% sílice respirable',
          danger: 'No peligroso al inhalar',
          packaging: 'Saco 20 kg',
          price: '1.83 €/kg (saco 20kg = 36.60€)',
          whyBest: [
            'SEGURO - no daña pulmones',
            'Certificado para centros médicos',
            'Se puede trabajar sin mascarilla',
            'Perfecto para proyectos residenciales'
          ],
          finish: 'Agregado seguro salud',
          critical: [
            'Centros médicos - seguridad personal',
            'Escuelas y guarderías - protección niños',
            'Locales residenciales - salud familia',
            'Locales cerrados - ventilación mínima'
          ]
        },
        {
          name: 'Relleno M² Blanco',
          badge: 'BLANCO DECORATIVO',
          description: 'Blanco decorativo',
          basedOn: 'Peran STC Filler White',
          thickness: 'Relleno cuarzo compacto blanco',
          compatibility: 'Sistemas Peran STC/EpoxiCristal M²',
          packaging: 'Saco 12 kg',
          color: 'Perfectamente blanco',
          price: '3.75 €/kg (saco 12kg = 45€)',
          whyBest: [
            'Color perfectamente blanco',
            'Granulación homogénea',
            'Alta decoratividad',
            'Compatible sistemas transparentes'
          ],
          finish: 'Agregado blanco decorativo',
          applications: [
            'Acabados decorativos blancos - efecto nieve',
            'Centros médicos - aspecto estéril',
            'Efectos contraste - incrustaciones blancas sobre oscuro',
            'Proyectos luxury - cuarzo blanco premium'
          ]
        }
      ]
    },
    {
      id: 'selladores',
      icon: Settings,
      title: 'Selladores para Juntas',
      subtitle: 'Selladores elásticos para juntas de dilatación',
      image: selladoresJuntasImage,
      description: 'Selladores especializados para juntas de dilatación y conexiones flexibles',
      problems: [
        'Juntas dilatación necesitan sellado',
        'Conexiones diferentes materiales',
        'Reparación juntas existentes',
        'Impermeabilización perímetro',
        'Conexiones elásticas'
      ],
      solutions: [
        'INTERIORES + EXTERIORES trabajos',
        'Adherencia mayoría materiales',
        'Elástico - se mueve con base',
        'Simple de usar'
      ],
      systems: [
        {
          name: 'Sellador M² Híbrido',
          badge: 'UNIVERSAL',
          description: 'Juntas flexibles',
          basedOn: 'SP540',
          thickness: 'Según junta',
          curing: '24 horas',
          material: 'Sellador elástico híbrido',
          application: 'Trabajos interiores y exteriores',
          packaging: 'Paquete 600ml (Caja 20 unidades + 4 boquillas)',
          color: 'Gris hormigón',
          price: '17.93€ por paquete 600ml',
          whyBest: [
            'INTERIORES + EXTERIORES trabajos',
            'Adherencia mayoría materiales',
            'Elástico - se mueve con base',
            'Simple de usar'
          ],
          finish: 'Sellador híbrido universal',
          applications: [
            'Juntas piso en zonas peatonales',
            'Juntas perimetrales (piso-pared)',
            'Conexiones garajes y almacenes',
            'Sellado alrededor equipos'
          ],
          advantages: [
            'Funciona +5°C a +40°C',
            'Impermeable',
            'No endurece "en piedra"',
            'Fácil aplicar'
          ]
        },
        {
          name: 'Sellador M² Módulo Bajo',
          badge: 'PARA JUNTAS DILATACIÓN',
          description: 'PU módulo bajo',
          basedOn: 'PU901',
          thickness: 'Según amplitud junta',
          curing: '24 horas',
          material: 'Sellador poliuretano módulo bajo',
          dilatation: 'Para juntas dilatación gran amplitud',
          color: 'Gris RAL7047',
          packaging: 'Paquete 600ml (Caja 20 unidades + 4 boquillas)',
          price: '9.74€ por paquete 600ml',
          whyBest: [
            'MÁXIMA ELASTICIDAD - se estira sin romperse',
            'Compensa movimientos hasta 25% ancho junta',
            'Durabilidad 15+ años',
            'No pierde elasticidad con tiempo'
          ],
          finish: 'Sellador elástico máximo',
          critical: [
            'Juntas dilatación - movimientos hasta 25%',
            'Conexiones hormigón/hormigón - estructuras prefabricadas',
            'Puentes térmicos - deformaciones temperatura',
            'Zonas sísmicas - movimientos terremotos'
          ],
          technical: [
            'Módulo elasticidad: Bajo',
            'Alargamiento relativo: >400%',
            'Dureza Shore A: 25-35',
            'Temperatura trabajo: -40°C a +80°C'
          ]
        }
      ]
    },
    {
      id: 'especiales',
      icon: Zap,
      title: 'Componentes Especiales',
      subtitle: 'Aceleradores, imprimaciones y componentes técnicos',
      image: componentesEspecialesImage,
      description: 'Componentes especiales para condiciones complejas y necesidades técnicas específicas',
      problems: [
        'Condiciones aplicación complejas',
        'Necesidad propiedades especiales',
        'Preparación superficies problemáticas',
        'Acelerar trabajos',
        'Protección factores específicos'
      ],
      solutions: [
        'RÁPIDO - en 4 horas se puede recubrir',
        'Sin olor - base agua',
        'Adherencia universal',
        'Se puede sobre hormigón húmedo (hasta 6% humedad)'
      ],
      systems: [
        {
          name: 'EpoxiPrimer M² Aqua',
          badge: 'IMPRIMACIÓN RÁPIDA',
          description: 'Imprimación rápida agua',
          basedOn: 'Peran Primer W',
          thickness: 'Imprimación 2-componente base agua',
          curing: 'Se puede recubrir en 4 horas a 20°C',
          packaging: 'Cubo 10 kg (2kg + 8kg)',
          consumption: '200-300 g/m²',
          price: '20.22 €/kg (cubo 10kg = 202.20€)',
          whyBest: [
            'RÁPIDO - en 4 horas se puede recubrir',
            'Sin olor - base agua',
            'Adherencia universal',
            'Se puede sobre hormigón húmedo (hasta 6% humedad)'
          ],
          finish: 'Imprimación rápida base agua',
          critical: [
            'Urgencia - necesita rápido',
            'Superficies no porosas - baldosas, metal, resinas viejas',
            'Base húmeda - se puede sobre hormigón húmedo',
            'Objetos residenciales - sin olor'
          ],
          applications: [
            'Imprimación baldosas antes recubrimiento',
            'Preparación superficies metálicas',
            'Trabajos rápidos tiempo limitado',
            'Proyectos residenciales (sin olor)'
          ]
        },
        {
          name: 'EpoxiTurbo M²',
          badge: 'ACELERADOR CURADO',
          description: 'Acelerador de curado',
          basedOn: 'Peran EWS',
          thickness: 'Acelerador específico sistemas Peran',
          nonylphenol: 'Sin nonilfenol',
          acceleration: 'Reduce tiempo curado 50%',
          packaging: 'Cubo 3,5 kg',
          price: '47 €/kg (cubo 3,5kg = 164.50€)',
          whyBest: [
            'Reduce tiempo curado 50%',
            'Funciona clima frío (+5°C y menos)',
            'Compatible nuestros sistemas principales',
            'Mejora propiedades iniciales'
          ],
          finish: 'Acelerador curado',
          when: [
            'Clima frío (+5°C y menos)',
            'Urgencia - necesita más rápido',
            'Paradas cortas producción',
            'Mal tiempo - hay que terminar'
          ],
          effect: [
            'Normal: 24 horas → Con EpoxiTurbo M²: 8-12 horas',
            'Clima frío: 48 horas → Con EpoxiTurbo M²: 16-20 horas'
          ],
          compatibility: [
            '✅ EpoxiCristal M² Transparente',
            '✅ EpoxiArte M² (todas variantes base Peran)',
            '✅ EpoxiTerrazo M²',
            '❌ NO compatible sistemas Flowfresh'
          ]
        },
        {
          name: 'Carga M² ESD',
          badge: 'CARGA CONDUCTIVA',
          description: 'Carga conductiva',
          basedOn: 'Flowfresh ESD SL D',
          thickness: 'Para sistemas antiestáticos Flowfresh ESD',
          packaging: 'Saco 0,04 kg (precio por unidad)',
          function: 'Otorgar propiedades antiestáticas',
          price: '23.54€ por saco 0,04kg',
          whyBest: [
            'Producciones electrónicas - protección ESD',
            'Laboratorios - zonas antiestáticas',
            'Cleanrooms - salas limpias',
            'Zonas explosivas - ATEX'
          ],
          finish: 'Carga conductiva ESD',
          applications: [
            'Fábricas componentes electrónicos',
            'Laboratorios investigación',
            'Salas limpias farmacéuticas',
            'Zonas ATEX certificadas'
          ],
          how: [
            'Se añade a EpoxiLimpio M² Antiestático',
            'Dosificación exacta según ficha técnica',
            'Mezcla cuidadosa',
            'Control conductividad después aplicación'
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
              <Package className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Componentes y Materiales
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Materiales y componentes Epoxi M² para venta por separado
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-8">
                <p className="text-primary font-semibold">
                  Para: Contratistas, maestros, entusiastas DIY, distribuidores
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✓ Pigmentos 8 colores
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  ✓ Agregados cuarzo
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  ✓ Kits DIY completos
                </div>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  ✓ Soporte técnico
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
                Nuestros Componentes y Materiales
              </h2>
              <p className="text-lg text-muted-foreground">
                Materiales Epoxi M² originales para profesionales y DIY
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

        {/* Additional Services for Components */}
        <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Servicios para Venta de Componentes
                </h2>
                <p className="text-lg text-muted-foreground">
                  Servicios profesionales incluidos en todos nuestros productos por separado
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Technical Support */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Soporte Técnico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Consultas técnicas - cómo usar correctamente
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Cálculo consumos - cantidad exacta para proyecto
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Mezcla colores - crear tonos únicos
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Muestras prueba - verificar antes pedido grande
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Instrucciones aplicación detalladas
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Professional Programs */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Programas Profesionales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Programa distribuidores - descuentos hasta 25%
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Programa contratistas - descuentos 10-15%
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Líneas crédito - aplazamiento pago
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Formación personal - cursos gratuitos
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Soporte marketing - materiales ventas
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Delivery and Packaging */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Envío y Embalaje</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Valencia: Gratis pedidos desde 500€
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        España: 50-150€ según peso
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Entrega urgente: +50% pero día siguiente
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Recogida: Descuento 5%
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Embalaje profesional seguro
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
                  ¿Qué Componente Necesita?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Guía rápida para seleccionar el componente ideal
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para colorear proyecto:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Pigmentos M² (8 colores)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rojo, azul, verde, gris, ocre, mostaza, crema</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para reforzar resistencia:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Relleno M² Extra Fino</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Ahorra resina 30% + aumenta resistencia</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para sellar juntas:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Sellador M² Módulo Bajo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(dilatación) / Sellador M² Híbrido (normales)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para acelerar trabajos:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiTurbo M²</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Reduce tiempo curado 50%</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para sistemas ESD:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>Carga M² ESD</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Antiestática certificada</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para imprimación rápida:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiPrimer M² Aqua</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Listo en 4 horas</p>
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
                ¿No sabe qué componentes necesita para su proyecto?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Lo que incluye:</h3>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Cálculo cantidad exacta materiales
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Selección componentes apropiados
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Instrucciones aplicación
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Soporte técnico durante proyecto
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
                          window.open('https://wa.me/34622313855?text=Hola, necesito componentes Epoxi M². ¿Podrían ayudarme?', '_blank');
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Componentes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-2 text-black">
                  ¡Solo vendemos componentes originales de máxima calidad!
                </h3>
                <p className="text-black/80 mb-4">
                  Nuestros expertos le ayudarán a elegir los componentes perfectos
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90 hover:text-black">
                      Solicitar Lista Precios
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Solicitar Lista Precios - Componentes y Materiales</DialogTitle>
                    </DialogHeader>
                    <QuoteForm productTitle="Componentes y Materiales" />
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
                Ejemplos de Uso de Componentes
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Reparación Logo Concesionario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Problema:</strong> Logo rojo Ferrari dañado</li>
                      <li><strong>Solución:</strong> Pigmento M² Rojo (0,5kg) + EpoxiCristal M² Transparente (5kg) + Relleno M² Extra Fino (2kg)</li>
                      <li><strong>Proceso:</strong> Restauración color + capa protectora</li>
                      <li><strong>Precio materiales:</strong> 150€</li>
                      <li><strong>Resultado:</strong> Logo como nuevo</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sellado Juntas Parking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Objeto:</strong> Parking subterráneo 50 juntas x 20m</li>
                      <li><strong>Solución:</strong> Sellador M² Módulo Bajo</li>
                      <li><strong>Cantidad:</strong> 10 cajas (200 paquetes)</li>
                      <li><strong>Longitud juntas:</strong> 1000 m.l.</li>
                      <li><strong>Precio materiales:</strong> 1,948€</li>
                      <li><strong>Resultado:</strong> Juntas selladas 15 años</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">DIY Garaje Propio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Objeto:</strong> Garaje doméstico 30 m²</li>
                      <li><strong>Kit:</strong> EpoxiBase M² Imprimación (1 cubo) + EpoxiCoat M² Estándar (2 cubos) + Herramientas</li>
                      <li><strong>Precio kit:</strong> 450€</li>
                      <li><strong>Ahorro mano obra:</strong> 300€</li>
                      <li><strong>Resultado:</strong> Garaje como nuevo en fin semana</li>
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

const ComponentsMaterialsDetail = () => (
  <LanguageProvider>
    <ComponentsMaterialsDetailContent />
  </LanguageProvider>
);

export default ComponentsMaterialsDetail;
