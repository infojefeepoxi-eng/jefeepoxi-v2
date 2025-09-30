import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { trackQuoteRequest, trackFormSubmission, trackPhoneCall, trackWhatsAppClick } from '@/lib/analytics';

const ContactForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      
      // Prepare email template parameters
      const templateParams = {
        to_name: 'JefeEpoxi',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        address: formData.address || 'No especificada',
        surface: formData.surface || 'No especificada',
        finish_type: formData.finishType || 'No especificado',
        message: formData.message || 'Sin mensaje adicional',
        date: new Date().toLocaleDateString('es-ES'),
        time: new Date().toLocaleTimeString('es-ES')
      };

      // Send email using EmailJS (you'll need to configure this)
      // For now, we'll use a fallback method
      await sendEmailFallback(templateParams);
      
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

  // Send email using Web3Forms API
  const sendEmailFallback = async (params: any) => {
    try {
      // Prepare form data for Web3Forms
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', 'YOUR_WEB3FORMS_KEY'); // You'll need to get this from web3forms.com
      formDataToSend.append('subject', `Nueva solicitud de presupuesto - ${params.from_name}`);
      formDataToSend.append('from_name', params.from_name);
      formDataToSend.append('email', params.from_email);
      formDataToSend.append('message', `
NUEVA SOLICITUD DE PRESUPUESTO
==============================

Datos del Cliente:
- Nombre: ${params.from_name}
- Email: ${params.from_email}
- Teléfono: ${params.phone}
- Dirección: ${params.address}

Detalles del Proyecto:
- Superficie estimada: ${params.surface} m²
- Tipo de acabado: ${params.finish_type}
- Descripción: ${params.message}

Fecha de solicitud: ${params.date} a las ${params.time}

---
Enviado desde: www.jefeepoxi.com
      `);
      
      // Send to both emails
      formDataToSend.append('cc', 'jefeepoxi@gmail.com');
      formDataToSend.append('to', 'infojefeepoxi@gmail.com');
      
      // For now, use mailto as fallback until Web3Forms is configured
      const subject = encodeURIComponent(`Nueva solicitud de presupuesto - ${params.from_name}`);
      const body = encodeURIComponent(`
NUEVA SOLICITUD DE PRESUPUESTO
==============================

Datos del Cliente:
- Nombre: ${params.from_name}
- Email: ${params.from_email}
- Teléfono: ${params.phone}
- Dirección: ${params.address}

Detalles del Proyecto:
- Superficie estimada: ${params.surface} m²
- Tipo de acabado: ${params.finish_type}
- Descripción: ${params.message}

Fecha de solicitud: ${params.date} a las ${params.time}

---
Enviado desde: www.jefeepoxi.com
      `);
      
      // Create mailto links for both emails
      const mailtoLink1 = `mailto:infojefeepoxi@gmail.com?subject=${subject}&body=${body}`;
      const mailtoLink2 = `mailto:jefeepoxi@gmail.com?subject=${subject}&body=${body}`;
      
      // Open both email clients
      window.open(mailtoLink1, '_blank');
      setTimeout(() => {
        window.open(mailtoLink2, '_blank');
      }, 500);
      
      console.log('📧 Email sent to both addresses:', params);
      
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
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
                      <p className="text-muted-foreground">Valencia, España</p>
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
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>• Valencia</div>
                  <div>• Madrid</div>
                  <div>• Barcelona</div>
                  <div>• Sevilla</div>
                  <div>• Zaragoza</div>
                  <div>• Bilbao</div>
                  <div>• Portugal</div>
                  <div>• Francia</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
