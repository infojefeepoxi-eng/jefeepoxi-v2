import React, { useState, useCallback } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PDFViewer from '@/components/PDFViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const TarifaViewerContent = () => {
  const { t } = useLanguage();
  const [extractedText, setExtractedText] = useState<string>('');
  const [flowcreteSystems, setFlowcreteSystems] = useState<string[]>([]);

  const handleTextExtracted = useCallback((text: string) => {
    setExtractedText(prev => prev + ' ' + text);
    
    // Extract Flowcrete systems and services from text
    const systemKeywords = [
      'FLOWCRETE', 'EPOXY', 'POLIURETANO', 'POLYURETHANE', 
      'DECORATIVO', 'INDUSTRIAL', 'METALLIC', 'ANTIDESLIZAN',
      'SISTEMA', 'PAVIMENTO', 'REVESTIMIENTO'
    ];
    
    const foundSystems = systemKeywords.filter(keyword => 
      text.toUpperCase().includes(keyword)
    );
    
    if (foundSystems.length > 0) {
      setFlowcreteSystems(prev => [...new Set([...prev, ...foundSystems])]);
    }
  }, []);

  const analyzeServices = () => {
    const services = [];
    const text = extractedText.toUpperCase();
    
    // Analyze extracted text for services
    if (text.includes('INDUSTRIAL') || text.includes('WAREHOUSE')) {
      services.push('🏭 Sistemas Industriales - Pavimentos para almacenes y fábricas');
    }
    
    if (text.includes('DECORATIVO') || text.includes('METALLIC')) {
      services.push('🎨 Sistemas Decorativos - Acabados metálicos y artísticos');
    }
    
    if (text.includes('ALIMENTARIA') || text.includes('FOOD')) {
      services.push('🍽️ Industria Alimentaria - Pavimentos higiénicos HACCP');
    }
    
    if (text.includes('GARAGE') || text.includes('PARKING')) {
      services.push('🚗 Sistemas para Garajes - Resistentes a aceites y combustibles');
    }
    
    if (text.includes('POLIURETANO') || text.includes('POLYURETHANE')) {
      services.push('🧪 Sistemas de Poliuretano - Alta resistencia química');
    }
    
    if (text.includes('ANTIDESLIZAN') || text.includes('ANTISLIP')) {
      services.push('⚠️ Sistemas Antideslizantes - Seguridad en superficies húmedas');
    }
    
    return services;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-12 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Tarifa Flowcrete 2024
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Consulta nuestros sistemas profesionales de pavimentos epóxicos y poliuretánicos
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <a href="/Tarifa Flowcrete 2024-octubre_v11.pdf" download>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PDF
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/#contact">
                    Solicitar Cotización
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Viewer Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* PDF Viewer */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Documento Tarifa Flowcrete
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PDFViewer 
                      file="/Tarifa Flowcrete 2024-octubre_v11.pdf"
                      onTextExtracted={handleTextExtracted}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Analysis Panel */}
              <div className="space-y-6">
                {/* Detected Systems */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      Sistemas Detectados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {flowcreteSystems.length > 0 ? (
                      <div className="space-y-2">
                        {flowcreteSystems.map((system, index) => (
                          <div key={index} className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm">
                            {system}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        Navegue por el PDF para detectar sistemas automáticamente
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Services Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Servicios Disponibles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analyzeServices().map((service, index) => (
                        <div key={index} className="text-sm p-3 bg-secondary/10 rounded-lg">
                          {service}
                        </div>
                      ))}
                      {analyzeServices().length === 0 && (
                        <p className="text-muted-foreground text-sm">
                          Los servicios se mostrarán conforme analice el documento
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact CTA */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <h3 className="font-semibold">¿Necesita una cotización?</h3>
                      <p className="text-sm text-muted-foreground">
                        Nuestros expertos le ayudarán a elegir el sistema ideal
                      </p>
                      <Button asChild className="w-full">
                        <Link to="/#contact">
                          Contactar Ahora
                        </Link>
                      </Button>
                    </div>
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

const TarifaViewer = () => (
  <LanguageProvider>
    <TarifaViewerContent />
  </LanguageProvider>
);

export default TarifaViewer;
