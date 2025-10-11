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
import { ArrowLeft, CheckCircle, Phone, MessageCircle, Droplets, Waves, Bath, Shirt, Sparkles, Car, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const WetAreasDetailContent = () => {
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
              placeholder="ej. 50"
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
            placeholder={systemName || "ej. Antideslizante, impermeable, higiénico..."}
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

  // Productos/servicios basados en CATEGORIA_9_VOLOGHI_PRYMISHCHENNYA.md
  const products = [
    {
      id: 'lavaderos',
      icon: Car,
      title: 'Lavaderos de Autos y Detailing',
      subtitle: 'Sistemas antideslizantes para autolavados',
      image: '/assets/project-decorative-white-black.jpg',
      description: 'Pisos antideslizantes especiales para autolavados con agua constante y química agresiva',
      problems: [
        'Agua constante mezclada con champús y química',
        'Muy resbaladizo - trabajadores se caen y lastiman',
        'Agua se estanca - olor desagradable',
        'Química agresiva autolavado destruye hormigón',
        'Necesidad pendientes para drenaje agua'
      ],
      solutions: [
        'NO resbaladizo incluso con agua + champú + espuma',
        'Impermeable - agua no se filtra en hormigón',
        'Resistente química agresiva autolavado (cera, limpiadores)',
        'Soporta lavado alta presión (hasta 200 bar)',
        'Seca rápido - no hay estancamiento agua'
      ],
      systems: [
        {
          name: 'EpoxiArte M² Aqua',
          badge: 'ESPECIAL PARA AUTOLAVADOS',
          description: 'Para zonas húmedas 5mm',
          basedOn: 'Peran STB Wet Areas',
          thickness: '5mm',
          curing: '24 horas',
          slip: 'R11-R13 (¡máximo!)',
          waterproof: 'Total',
          chemicals: 'Resistente autolavado y detergentes',
          texture: 'Rugosidad controlada',
          price: '40-60 €/m²',
          whyBest: [
            'NO resbaladizo incluso con agua + champú + espuma',
            'Impermeable - agua no se filtra en hormigón',
            'Resistente química agresiva autolavado (cera, limpiadores)',
            'Soporta lavado alta presión (hasta 200 bar)',
            'Seca rápido - no hay estancamiento agua'
          ],
          finish: 'Rugoso antideslizante máximo',
          technical: [
            'Pendientes 2% hacia desagües centrales (integradas en recubrimiento)',
            'Esquinas redondeadas 100mm todo perímetro',
            'Textura antideslizante toda el área',
            'Sellado juntas Sellador M² Híbrido'
          ],
          zones: [
            'Puestos lavado: EpoxiArte M² Aqua R13 (máximo antideslizante)',
            'Puestos aspirado: EpoxiRápido M² (seco, aceite motores)',
            'Zona espera: EpoxiGarage M² (económico, bonito)',
            'Oficina: EpoxiLaca M² Brillante (prestigioso)'
          ]
        },
        {
          name: 'EpoxiCubierta M²',
          badge: 'AUTOLAVADOS EXTERIORES',
          description: 'Impermeabilización',
          basedOn: 'Deckshield',
          thickness: '3-4mm',
          curing: '24-48 horas',
          uv: 'Resistente UV - no se deteriora sol',
          frost: 'Resistente heladas - soporta congelación/descongelación',
          waterproof: 'Impermeable',
          durability: 'Durabilidad 15+ años',
          price: '30-43 €/m²',
          whyBest: [
            'Resistente UV - no se deteriora al sol',
            'Resistente heladas - soporta congelación/descongelación',
            'Impermeable',
            'Durabilidad 15+ años'
          ],
          finish: 'Poliuretano alifático resistente intemperie',
          when: [
            'Autolavados autoservicio calle',
            'Puestos lavado abiertos',
            'Necesita protección UV',
            'Resistencia heladas importante'
          ]
        }
      ]
    },
    {
      id: 'piscinas',
      icon: Waves,
      title: 'Piscinas y Aquaparques',
      subtitle: 'Sistemas resistentes al cloro para zonas de piscinas',
      image: '/assets/project-decorative-gold-black.jpg',
      description: 'Pisos especiales para piscinas resistentes al cloro con máxima antideslizante',
      problems: [
        'Cloro destruye recubrimientos normales',
        'Muy resbaladizo junto piscina - lesiones',
        'Humedad constante y condensación',
        'Pies descalzos - necesidad higiene',
        'Aspecto estético importante'
      ],
      solutions: [
        'SEGURIDAD - no resbaladizo incluso con pies mojados',
        'Resistencia cloro - no se destruye años',
        'Textura agradable para pies descalzos',
        'Higiénico - fácil desinfectar',
        'Colores bonitos - azul, turquesa'
      ],
      systems: [
        {
          name: 'EpoxiArte M² Aqua',
          badge: 'PARA ZONAS PISCINAS',
          description: 'Solución especial piscinas',
          basedOn: 'Peran STB Wet Areas',
          thickness: '5mm',
          curing: '24 horas',
          chlorine: 'Resistencia cloro y bromo',
          slip: 'R12-R13',
          texture: 'Agradable pies descalzos',
          drying: 'Secado rápido',
          hygiene: 'Superficie higiénica',
          price: '40-60 €/m²',
          whyBest: [
            'SEGURIDAD - no resbaladizo incluso con pies mojados',
            'Resistencia cloro - no se destruye años',
            'Textura agradable para pies descalzos',
            'Higiénico - fácil desinfectar',
            'Colores bonitos - azul, turquesa'
          ],
          finish: 'Antideslizante agradable al tacto',
          zones: [
            'Caminos alrededor piscina',
            'Vestuarios y duchas',
            'Zonas descanso junto piscina',
            'Zonas infantiles (especialmente importante antideslizante)'
          ],
          elements: [
            'Pendientes 1-2% desde piscina',
            'Esquinas redondeadas radio 100mm',
            'Desagües para drenaje agua',
            'Textura antideslizante'
          ]
        },
        {
          name: 'EpoxiCristal M² Tixo',
          badge: 'PARA ESQUINAS REDONDEADAS',
          description: 'Tixotrópico para verticales',
          basedOn: 'Peran TCW',
          thickness: 'Radio 50-100mm',
          curing: '24 horas',
          tixotropic: 'No gotea de verticales',
          water: 'Resistente contacto agua',
          transparent: 'Transparente - no cambia color base',
          adhesion: 'Adherencia perfecta esquinas',
          price: '25-35 €/m.l.',
          whyBest: [
            'Esquinas perfectas - fácil lavar',
            'No gotea al aplicar en paredes',
            'Resistente agua - vitalicio',
            'Transparente - no estropea diseño'
          ],
          finish: 'Transparente tixotrópico',
          applications: [
            'Esquinas redondeadas piscinas',
            'Conexiones piso-pared duchas',
            'Esquinas vestuarios',
            'Perímetro bañeras y jacuzzis'
          ]
        }
      ]
    },
    {
      id: 'duchas',
      icon: Bath,
      title: 'Duchas y Vestuarios',
      subtitle: 'Recubrimientos sin juntas para duchas',
      image: '/assets/project-decorative-white-black.jpg',
      description: 'Sistemas sin juntas para duchas que eliminan el moho y mejoran la higiene',
      problems: [
        'Humedad constante y vapor',
        'Baldosas resbaladizas - lesiones',
        'Moho en juntas baldosas',
        'Dificultad limpieza',
        'Olores desagradables por humedad'
      ],
      solutions: [
        'SIN JUNTAS - no hay sitios para moho',
        'Antideslizante - seguridad bajo ducha',
        'Fácil lavar - solo con agua y jabón',
        'Seca rápido',
        'Higiénico - bacterias no se multiplican'
      ],
      systems: [
        {
          name: 'EpoxiArte M² Aqua',
          badge: 'DUCHAS SIN JUNTAS',
          description: 'Recubrimiento sin juntas',
          basedOn: 'Peran STB Wet Areas',
          thickness: '5mm',
          curing: '24 horas',
          joints: 'SIN JUNTAS - no hay sitios moho',
          slip: 'Antideslizante - seguridad ducha',
          cleaning: 'Fácil lavar - agua + jabón',
          drying: 'Seca rápido',
          hygiene: 'Higiénico - bacterias no multiplican',
          price: '40-60 €/m²',
          whyBest: [
            'SIN JUNTAS - no hay sitios para moho',
            'Antideslizante - seguridad bajo ducha',
            'Fácil lavar - solo con agua y jabón',
            'Seca rápido',
            'Higiénico - bacterias no se multiplican'
          ],
          finish: 'Sin juntas antideslizante',
          technical: [
            'Demolición baldosa vieja (si necesario)',
            'Impermeabilización base EpoxiSeal M² Antihumedad',
            'Formación pendientes hacia desagüe (2-3%)',
            'Esquinas redondeadas EpoxiCristal M² Tixo radio 100mm',
            'Recubrimiento EpoxiArte M² Aqua 5mm',
            'Sellado perímetro Sellador M² Híbrido'
          ],
          result: 'Ducha como taza monolítica - agua no se estanca en ningún sitio'
        },
        {
          name: 'EpoxiLimpio M² Antibacterial',
          badge: 'PARA VESTUARIOS',
          description: 'Sistema higiénico',
          basedOn: 'Flowfresh con Polygiene®',
          thickness: '6mm',
          curing: '24 horas',
          antibacterial: 'Recubrimiento antibacterial',
          disinfectants: 'Resistencia desinfectantes',
          cleaning: 'Fácil lavar',
          barefoot: 'Agradable pies descalzos',
          slip: 'No resbaladizo incluso mojado',
          price: '40-55 €/m²',
          whyBest: [
            'Recubrimiento antibacterial',
            'Resistencia a desinfectantes',
            'Fácil lavar',
            'Agradable para pies descalzos',
            'No resbaladizo incluso mojado'
          ],
          finish: 'Antibacterial con Polygiene®',
          applications: [
            'Vestuarios gimnasios',
            'Vestuarios piscinas',
            'Baños y saunas (zonas descanso)',
            'Consultas médicas'
          ]
        }
      ]
    },
    {
      id: 'lavanderias',
      icon: Shirt,
      title: 'Lavanderías y Tintorerías',
      subtitle: 'Sistemas resistentes a detergentes y disolventes',
      image: '/assets/project-industrial-blue-gray.jpg',
      description: 'Pisos resistentes a detergentes agresivos y disolventes para lavanderías',
      problems: [
        'Detergentes agresivos y disolventes',
        'Humedad constante de vapor',
        'Agua caliente y vapor',
        'Manchas tintes ropa',
        'Resbaladizo por agua jabonosa'
      ],
      solutions: [
        'Resistencia detergentes y blanqueadores',
        'Soporta agua caliente y vapor',
        'Antideslizante - seguridad personal',
        'Fácil eliminar manchas tintes',
        'Seca rápido'
      ],
      systems: [
        {
          name: 'EpoxiArte M² Aqua',
          badge: 'PARA LAVANDERÍAS',
          description: 'Resistente detergentes',
          basedOn: 'Peran STB Wet Areas',
          thickness: '5mm',
          curing: '24 horas',
          detergents: 'Resistencia detergentes y blanqueadores',
          steam: 'Soporta agua caliente y vapor',
          slip: 'Antideslizante - seguridad personal',
          stains: 'Fácil eliminar manchas tintes',
          drying: 'Seca rápido',
          price: '40-60 €/m²',
          whyBest: [
            'Resistencia detergentes y blanqueadores',
            'Soporta agua caliente y vapor',
            'Antideslizante - seguridad personal',
            'Fácil eliminar manchas tintes',
            'Seca rápido'
          ],
          finish: 'Antideslizante resistente química',
          zones: [
            'Zona lavado: EpoxiArte M² Aqua (humedad + química)',
            'Zona secado: EpoxiLimpio M² (vapor caliente)',
            'Zona planchado: EpoxiCoat M² (zona seca)',
            'Almacén ropa: EpoxiGarage M² (económico)'
          ]
        },
        {
          name: 'EpoxiQuímico M² Premium',
          badge: 'PARA TINTORERÍAS',
          description: 'Resistencia química extrema',
          basedOn: 'Flowchem (Viniléster)',
          thickness: '4-8mm',
          curing: '24 horas',
          solvents: 'Resistencia percloroetileno y otros disolventes',
          stainRemovers: 'No se destruye por quitamanchas',
          waterproof: 'Impermeable',
          decontamination: 'Fácil descontaminar en derrames',
          price: '45-65 €/m²',
          whyBest: [
            'Resistencia a percloroetileno y otros disolventes',
            'No se destruye por quitamanchas',
            'Impermeable',
            'Fácil descontaminar en derrames'
          ],
          finish: 'Vinil-éster químico-resistente',
          applications: [
            'Tintorerías profesionales',
            'Talleres limpieza seco',
            'Zonas químicos agresivos',
            'Áreas descontaminación'
          ]
        }
      ]
    },
    {
      id: 'banos',
      icon: Bath,
      title: 'Baños Privados y Residenciales',
      subtitle: 'Alternativa moderna a las baldosas',
      image: '/assets/project-decorative-wood-marble.jpg',
      description: 'Baños sin juntas como alternativa moderna a las baldosas tradicionales',
      problems: [
        'Baldosas ducha constantemente con moho en juntas',
        'Resbaladizo después ducha',
        'Difícil limpiar esquinas',
        'Quieren diseño moderno sin juntas',
        'Reforma baño - caro y largo'
      ],
      solutions: [
        'SIN JUNTAS - no hay sitios para moho',
        'Superficie antideslizante - seguridad familia',
        'Fácil lavar - solo con esponja y jabón',
        'Cualquier color - según diseño baño',
        'Montaje rápido - 2 días vs 2 semanas baldosas'
      ],
      systems: [
        {
          name: 'EpoxiArte M² Aqua',
          badge: 'BAÑOS SIN JUNTAS',
          description: 'Solución revolucionaria en vez baldosas',
          basedOn: 'Peran STB Wet Areas',
          thickness: '5mm',
          curing: '24 horas',
          joints: 'SIN JUNTAS - no hay sitios moho',
          slip: 'Superficie antideslizante - seguridad familia',
          cleaning: 'Fácil lavar - esponja + jabón',
          colors: 'Cualquier color - según diseño baño',
          speed: 'Montaje rápido - 2 días vs 2 semanas baldosas',
          price: '40-60 €/m²',
          whyBest: [
            'SIN JUNTAS - no hay sitios para moho',
            'Superficie antideslizante - seguridad familia',
            'Fácil lavar - solo con esponja y jabón',
            'Cualquier color - según diseño baño',
            'Montaje rápido - 2 días vs 2 semanas baldosas'
          ],
          finish: 'Sin juntas antideslizante',
          technology: [
            'Demolición baldosas (si hay)',
            'Impermeabilización paredes EpoxiSeal M² Antihumedad',
            'Esquinas redondeadas EpoxiCristal M² Tixo (piso-pared)',
            'Recubrimiento piso EpoxiArte M² Aqua',
            'Recubrimiento paredes (hasta altura 1.5-2m)',
            'Sellado todas conexiones'
          ],
          result: 'Baño como taza monolítica',
          colors: [
            'Blanco (clásico, limpieza)',
            'Azul claro (temática marina)',
            'Beige (cálido, acogedor)',
            'Gris (minimalismo moderno)'
          ]
        },
        {
          name: 'EpoxiCristal M² Tixo',
          badge: 'ESQUINAS Y CONEXIONES',
          description: 'Resina transparente tixotrópica para superficies verticales',
          basedOn: 'Peran TCW',
          thickness: 'Radio esquinas',
          curing: '24 horas',
          tixotropic: 'No gotea',
          water: 'Resistente agua',
          transparent: 'Transparente - no cambia color base',
          corners: 'Perfecto para esquinas',
          price: '25-35 €/m.l.',
          whyBest: [
            'Esquinas perfectamente redondeadas - fácil lavar',
            'Conexiones impermeables',
            'Transparente - no estropea diseño',
            'Sellado vitalicio'
          ],
          finish: 'Transparente para esquinas',
          applications: [
            'Esquinas redondeadas piso-pared',
            'Esquinas cabinas ducha',
            'Conexión bañera-pared',
            'Perímetro lavabos'
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
              <Droplets className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Pisos para Áreas Húmedas
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Recubrimientos impermeables y antideslizantes para áreas húmedas
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-8">
                <p className="text-primary font-semibold">
                  Para: Lavaderos de autos, piscinas, duchas, baños, lavanderías
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✓ Certificación R11-R13
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  ✓ 100% impermeable
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  ✓ Esquinas redondeadas
                </div>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  ✓ Resistente química limpieza
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
                Nuestras Soluciones para Áreas Húmedas
              </h2>
              <p className="text-lg text-muted-foreground">
                Sistemas Epoxi M² impermeables y antideslizantes certificados
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

        {/* Additional Services for Wet Areas */}
        <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Servicios Adicionales para Áreas Húmedas
                </h2>
                <p className="text-lg text-muted-foreground">
                  Servicios profesionales especializados incluidos en todos nuestros proyectos húmedos
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Waterproofing */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Impermeabilización</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Impermeabilización base obligatoria
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Formación pendientes hacia desagües
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Esquinas redondeadas radio 100mm
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Sellado todas conexiones
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Garantía vitalicia impermeabilización
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Safety and Certification */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Seguridad y Certificación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Certificación antideslizante R11-R13
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Pruebas impermeabilidad 24h
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Test drenaje - agua drena 30 segundos
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Control calidad esquinas redondeadas
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Certificados técnicos incluidos
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Maintenance and Warranty */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Mantenimiento y Garantía</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Garantía impermeabilización vitalicia
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Garantía antideslizante 10 años
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Esquinas redondeadas 15 años garantía
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Sistema general 10-15 años
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Soporte técnico especializado
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
                  Guía rápida para seleccionar el sistema ideal para áreas húmedas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para autolavado:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiArte M² Aqua</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(antideslizante + resistente química)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para piscina privada:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiArte M² Aqua</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(seguridad + belleza)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para baño (en vez baldosas):</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiArte M² Aqua</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(sin juntas + higiénico)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para lavandería:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiArte M² Aqua</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(zonas principales) + EpoxiQuímico M² (tintorería)</p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Para lavado industrial:</h3>
                  <div className="flex items-center text-primary font-medium mb-1">
                    <span className="text-2xl mr-2">→</span>
                    <span>EpoxiLimpio M² Antibacterial</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(higiene + resistencia química)</p>
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
                ¿No sabe qué sistema es ideal para su área húmeda?
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
                          window.open('https://wa.me/34622313855?text=Hola, necesito consulta gratuita para pisos áreas húmedas. ¿Podrían visitarme?', '_blank');
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
                  Nuestros expertos le ayudarán a elegir la solución perfecta para áreas húmedas
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90 hover:text-black">
                      Solicitar Presupuesto Detallado
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Solicitar Presupuesto - Pisos para Áreas Húmedas</DialogTitle>
                    </DialogHeader>
                    <QuoteForm productTitle="Pisos para Áreas Húmedas" />
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
                    <CardTitle className="text-lg">Autolavado Autoservicio 4 Puestos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Área:</strong> 200 m²</li>
                      <li><strong>Sistema:</strong> EpoxiArte M² Aqua</li>
                      <li><strong>Pendientes:</strong> 2% hacia desagües centrales</li>
                      <li><strong>Antideslizante:</strong> R12</li>
                      <li><strong>Tiempo:</strong> 5 días</li>
                      <li><strong>Precio:</strong> 10,000€ (50€/m²)</li>
                      <li><strong>Resultado:</strong> Trabajadores ya no se caen, agua drena rápido</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Piscina Privada + Zona Descanso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Área:</strong> 80 m² (40 m² piscina + 40 m² zona descanso)</li>
                      <li><strong>Sistema:</strong> Piscina: EpoxiArte M² Aqua (azul) / Zona descanso: EpoxiArte M² Classic (beige)</li>
                      <li><strong>Esquinas:</strong> Todo perímetro redondeadas</li>
                      <li><strong>Tiempo:</strong> 7 días</li>
                      <li><strong>Precio:</strong> 4,000€</li>
                      <li><strong>Resultado:</strong> Como en hotel caro</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Baño Elite 25 m²</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Sistema:</strong> EpoxiArte M² Aqua (piso) + recubrimiento paredes hasta 2m</li>
                      <li><strong>Color:</strong> Blanco con incrustaciones azules</li>
                      <li><strong>Esquinas:</strong> R100mm todo perímetro</li>
                      <li><strong>Tiempo:</strong> 4 días</li>
                      <li><strong>Precio:</strong> 1,500€</li>
                      <li><strong>Resultado:</strong> Como hotel 5 estrellas, moho nunca más</li>
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

const WetAreasDetail = () => (
  <LanguageProvider>
    <WetAreasDetailContent />
  </LanguageProvider>
);

export default WetAreasDetail;
