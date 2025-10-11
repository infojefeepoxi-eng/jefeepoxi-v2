import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, MessageCircle, Mail, MapPin, Clock, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { trackQuoteRequest, trackFormSubmission, trackPhoneCall, trackWhatsAppClick } from '@/lib/analytics';
import { sendQuoteEmail, initEmailJS } from '@/lib/emailService';
import { useLocation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ContactForm = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    surface: '',
    finishType: '',
    message: '',
    gdprConsent: false
  });

  // Initialize EmailJS and handle project data from navigation
  useEffect(() => {
    initEmailJS();
    
    // Check if we have project data from navigation
    if (location.state && location.state.projectData) {
      const { title, description, location: projectLocation, surface } = location.state.projectData;
      
      // Auto-fill the form with project information
      setFormData(prev => ({
        ...prev,
        message: `Estoy interesado en un proyecto similar a: "${title}"\n\n${description}\n\nUbicación del proyecto de referencia: ${projectLocation}\nSuperficie de referencia: ${surface} m²`,
        surface: surface ? surface.toString() : ''
      }));

      // Scroll to the form
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gdprConsent) {
      toast({
        title: "Error",
        description: "Debe aceptar la política de privacidad para continuar",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Track form submission and quote request
      trackFormSubmission('contact_quote_form', formData);
      trackQuoteRequest('contact_form');
      
      // Send email automatically to both addresses
      await sendQuoteEmail(formData);
      
      toast({
        title: "¡Solicitud enviada!",
        description: "Nos pondremos en contacto contigo en las próximas 24 horas.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        surface: '',
        finishType: '',
        message: '',
        gdprConsent: false
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error al enviar",
        description: "Hubo un problema. Por favor, llámanos directamente al +34 622 313 855",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Solicita tu presupuesto personalizado sin compromiso
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                Solicitar Presupuesto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Nombre completo *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Teléfono *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Superficie estimada (m²)
                    </label>
                    <Input
                      type="number"
                      value={formData.surface}
                      onChange={(e) => handleInputChange('surface', e.target.value)}
                      placeholder="ej. 150"
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Dirección del proyecto
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Ciudad, provincia"
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Tipo de acabado deseado
                  </label>
                  <Input
                    value={formData.finishType}
                    onChange={(e) => handleInputChange('finishType', e.target.value)}
                    placeholder="ej. Industrial, decorativo, antideslizante..."
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Descripción del proyecto
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Cuéntanos más detalles sobre tu proyecto..."
                    rows={4}
                    className="bg-background/50"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="gdpr"
                    checked={formData.gdprConsent}
                    onCheckedChange={(checked) => handleInputChange('gdprConsent', checked as boolean)}
                  />
                  <label htmlFor="gdpr" className="text-sm text-muted-foreground leading-relaxed">
                    Acepto la{' '}
                    <a href="/#contact" className="text-primary hover:underline">
                      política de privacidad
                    </a>{' '}
                    y consiento el tratamiento de mis datos para recibir información comercial de JefeEpoxi.
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Solicitar Presupuesto'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Información de Contacto
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="text-foreground font-medium">Teléfono</p>
                      <a href="tel:+34622313855" className="text-muted-foreground hover:text-primary">
                        +34 622 313 855
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="text-foreground font-medium">WhatsApp</p>
                      <a 
                        href="https://wa.me/34622313855" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        +34 622 313 855
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="text-foreground font-medium">Email</p>
                      <a href="mailto:infojefeEpoxi@gmail.com" className="text-muted-foreground hover:text-primary">
                        infojefeEpoxi@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="text-foreground font-medium">Ubicación</p>
                      <button
                        onClick={() => setIsMapOpen(true)}
                        className="text-muted-foreground hover:text-primary transition-colors cursor-pointer underline decoration-dotted"
                      >
                        Valencia, España
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="text-foreground font-medium">Horario</p>
                      <p className="text-muted-foreground">Lun - Vie: 8:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Cobertura de Servicio
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('contact.coverage')}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                  <div>• Madrid</div>
                  <div>• Barcelona</div>
                  <div>• Valencia</div>
                  <div>• Sevilla</div>
                  <div>• Zaragoza</div>
                  <div>• Málaga</div>
                  <div>• Murcia</div>
                  <div>• Palma de Mallorca</div>
                  <div>• Alicante</div>
                  <div>• Bilbao</div>
                  {showAllCities && (
                    <>
                      <div>• Las Palmas</div>
                      <div>• Córdoba</div>
                      <div>• Valladolid</div>
                      <div>• Vigo</div>
                      <div>• Gijón</div>
                      <div>• Granada</div>
                      <div>• Oviedo</div>
                      <div>• Santa Cruz de Tenerife</div>
                      <div>• Pamplona</div>
                      <div>• Almería</div>
                      <div>• San Sebastián</div>
                      <div>• Santander</div>
                      <div>• Burgos</div>
                      <div>• Albacete</div>
                      <div>• Castellón</div>
                      <div>• A Coruña</div>
                      <div>• Salamanca</div>
                      <div>• Logroño</div>
                      <div>• Badajoz</div>
                      <div>• Huelva</div>
                      <div>• Tarragona</div>
                      <div>• Lleida</div>
                      <div>• Marbella</div>
                      <div>• León</div>
                      <div>• Cádiz</div>
                      <div>• Jaén</div>
                      <div>• Ourense</div>
                      <div>• Pontevedra</div>
                      <div>• Vitoria-Gasteiz</div>
                      <div>• Toledo</div>
                      <div>• Guadalajara</div>
                      <div>• Cuenca</div>
                      <div>• Segovia</div>
                      <div>• Ávila</div>
                      <div>• Girona</div>
                      <div>• Huesca</div>
                      <div>• Teruel</div>
                      <div>• Soria</div>
                    </>
                  )}
                </div>
                {!showAllCities && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllCities(true)}
                    className="w-full text-primary hover:text-primary/80"
                  >
                    Ver más ciudades (+38)
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Map Dialog */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Nuestra Ubicación - Valencia, España
            </DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195887.67542142313!2d-0.5755543841796875!3d39.469906899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f4cf0efb06f%3A0xb4a351011f7f1d39!2sValencia%2C%20Spain!5e0!3m2!1sen!2s!4v1649876543210!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Valencia, España - JefeEpoxi Location"
            ></iframe>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4 text-primary" />
              <a href="tel:+34622313855" className="hover:text-primary transition-colors">
                +34 622 313 855
              </a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:infojefeEpoxi@gmail.com" className="hover:text-primary transition-colors">
                infojefeEpoxi@gmail.com
              </a>
            </div>
            <a
              href="https://www.google.com/maps/place/Valencia,+Spain/@39.4699075,-0.5755544,11z"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 mt-2"
            >
              <MapPin className="w-4 h-4" />
              Abrir en Google Maps →
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactForm;
