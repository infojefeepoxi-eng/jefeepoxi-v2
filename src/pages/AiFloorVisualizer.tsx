import React, { useRef, useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Upload, Image as ImageIcon, Wand2, ArrowLeft, Info, Download, Loader2, Lock, Key, Check, X, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { sendQuoteEmail } from '@/lib/emailService';

const AiFloorVisualizer = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>(
    language === 'es' 
      ? 'Reemplaza el piso actual con un suelo epoxi como se muestra en la imagen.' 
      : 'Replace the current floor with an epoxy floor as shown in the image.'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Generation limit system
  const [generationsUsed, setGenerationsUsed] = useState<number>(0);
  const [generationsAvailable, setGenerationsAvailable] = useState<number>(1);
  const [isUnlimited, setIsUnlimited] = useState<boolean>(false);
  const [usedCodes, setUsedCodes] = useState<string[]>([]);
  const [showLimitModal, setShowLimitModal] = useState<boolean>(false);
  const [accessCode, setAccessCode] = useState<string>('');
  const [codeError, setCodeError] = useState<string>('');
  
  // Quote form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    surface: '',
    address: '',
    finishType: '',
    message: '',
    gdprConsent: false
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const roomInputRef = useRef<HTMLInputElement | null>(null);
  const refInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (file: File, setter: (v: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        // Convert to PNG and resize if needed
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Resize if too large (max 1024x1024 for dall-e-2)
          const maxSize = 1024;
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = (height / width) * maxSize;
              width = maxSize;
            } else {
              width = (width / height) * maxSize;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Convert to PNG with compression
            const pngDataUrl = canvas.toDataURL('image/png', 0.8);
            setter(pngDataUrl);
          }
        };
        img.src = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const onUploadRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file, setRoomImage);
  };

  const onUploadReference = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file, setReferenceImage);
  };

  const generatePreview = async () => {
    if (!roomImage) return;
    
    // Check generation limit
    if (!checkGenerationLimit()) {
      return;
    }
    
    setIsLoading(true);
    setErrorMsg(null);
    
    try {
      // Use Hetzner VPS for AI generation (no timeout limits)
      const API_URL = import.meta.env.PROD 
        ? 'https://ai.pocketbasemax.cc/api/ai-visualizer'  // Production: Hetzner VPS via Cloudflare
        : '/.netlify/functions/ai-visualizer';             // Development: Netlify local
      
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomImageBase64: roomImage,
          referenceImageBase64: referenceImage,
          prompt
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Request failed: ${res.status}`);
      }

      const data = await res.json();
      if (data?.image_base64) {
        setResultImage(`data:image/png;base64,${data.image_base64}`);
        // Increment generations used
        setGenerationsUsed(prev => prev + 1);
      } else {
        throw new Error('No image_base64 in response');
      }
    } catch (e: any) {
      console.error('AI Generation Error:', e);
      setErrorMsg(e?.message || 'Error generating image');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!resultImage) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `jefeepoxi-ai-floor-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prevent page close during generation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isLoading) {
        e.preventDefault();
        e.returnValue = language === 'es' 
          ? 'La generación está en progreso. ¿Estás seguro de que quieres salir?'
          : 'Generation in progress. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isLoading, language]);

  // Load generation limits from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ai_generation_limits');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setGenerationsUsed(data.used || 0);
        setGenerationsAvailable(data.available || 1);
        setIsUnlimited(data.isUnlimited || false);
        setUsedCodes(data.usedCodes || []);
      } catch (e) {
        console.error('Error loading generation limits:', e);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const data = {
      used: generationsUsed,
      available: generationsAvailable,
      isUnlimited: isUnlimited,
      usedCodes: usedCodes
    };
    localStorage.setItem('ai_generation_limits', JSON.stringify(data));
  }, [generationsUsed, generationsAvailable, isUnlimited, usedCodes]);

  // Verify access code
  const verifyAccessCode = () => {
    setCodeError('');
    const code = accessCode.trim().toLowerCase();
    
    // Check if code already used
    if (usedCodes.includes(code)) {
      setCodeError(language === 'es' 
        ? 'Este código ya fue utilizado' 
        : 'This code has already been used');
      return;
    }

    // Valid codes
    const codes = {
      '2b5715b': 2,  // +2 generations
      'ffdf2f8': 2,  // +2 generations  
      '112300': -1   // Unlimited (admin)
    };

    if (codes[code] !== undefined) {
      if (code === '112300') {
        // Admin code - unlimited
        setIsUnlimited(true);
        setGenerationsAvailable(999);
      } else {
        // Regular code - add generations
        setGenerationsAvailable(prev => prev + codes[code]);
      }
      
      setUsedCodes(prev => [...prev, code]);
      setAccessCode('');
      setShowLimitModal(false);
      setCodeError('');
    } else {
      setCodeError(language === 'es' 
        ? 'Código inválido. Solicita presupuesto para recibir uno.' 
        : 'Invalid code. Request a quote to receive one.');
    }
  };

  // Check if generation is allowed
  const checkGenerationLimit = (): boolean => {
    if (isUnlimited) return true;
    if (generationsUsed < generationsAvailable) return true;
    
    setShowLimitModal(true);
    return false;
  };

  // Handle quote form submission
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gdprConsent) {
      toast({
        title: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' 
          ? 'Debe aceptar la política de privacidad para continuar' 
          : 'You must accept the privacy policy to continue',
        variant: 'destructive',
      });
      return;
    }
    
    setFormSubmitting(true);

    try {
      // Add AI Visualizer specific note to message
      const enrichedFormData = {
        ...formData,
        message: `[SOLICITUD DESDE AI VISUALIZADOR]\n\nEste cliente solicitó acceso a generaciones adicionales de AI.\n\nPor favor, enviar código de acceso: 2b5715b o ffdf2f8\n\n${formData.message || 'Sin descripción adicional'}`
      };
      
      // Send email using the same service as main contact form
      await sendQuoteEmail(enrichedFormData);
      
      setFormSuccess(true);
      toast({
        title: language === 'es' ? '¡Solicitud enviada!' : 'Request sent!',
        description: language === 'es' 
          ? 'Recibirás un código de acceso por email en las próximas 24 horas.' 
          : 'You will receive an access code by email within 24 hours.',
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        surface: '',
        address: '',
        finishType: '',
        message: '',
        gdprConsent: false
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: language === 'es' ? 'Error al enviar' : 'Sending error',
        description: language === 'es' 
          ? 'Hubo un problema. Por favor, llámanos directamente al +34 622 313 855' 
          : 'There was a problem. Please call us directly at +34 622 313 855',
        variant: 'destructive',
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-10 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <Link to="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
              </Button>
            </Link>

            <div className="text-center max-w-3xl mx-auto">
              <Wand2 className="w-14 h-14 text-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                {language === 'es' 
                  ? 'Visualizador IA – Cambia tu piso a Epoxi' 
                  : 'AI Visualizer – Transform Your Floor to Epoxy'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'es' 
                  ? 'Sube una foto de tu interior y genera una vista previa realista con el acabado epoxi que elijas.'
                  : 'Upload a photo of your interior and generate a realistic preview with the epoxy finish of your choice.'}
              </p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{language === 'es' ? 'Genera tu vista previa' : 'Generate Your Preview'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-2 block">
                    {language === 'es' ? '1. Foto de tu interior' : '1. Photo of Your Interior'}
                  </Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    {roomImage ? (
                      <div className="space-y-3">
                        <img src={roomImage} alt="room" className="max-w-full h-auto rounded-md mx-auto" style={{maxHeight: '300px'}} loading="lazy" decoding="async" />
                        <Button variant="outline" size="sm" onClick={() => setRoomImage(null)}>
                          {language === 'es' ? 'Cambiar imagen' : 'Change image'}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-muted-foreground flex flex-col items-center py-10">
                        <ImageIcon className="w-12 h-12 mb-3" />
                        <p className="mb-4">
                          {language === 'es' ? 'Arrastra o selecciona una imagen' : 'Drag or select an image'}
                        </p>
                        <input ref={roomInputRef} type="file" accept="image/*" onChange={onUploadRoom} className="hidden" />
                        <Button variant="outline" onClick={() => roomInputRef.current?.click()}>
                          <Upload className="w-4 h-4 mr-2" /> 
                          {language === 'es' ? 'Subir imagen' : 'Upload image'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">
                    {language === 'es' ? '2. Referencia de piso epoxi (opcional)' : '2. Epoxy floor reference (optional)'}
                  </Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    {referenceImage ? (
                      <div className="space-y-3">
                        <img src={referenceImage} alt="reference" className="max-w-full h-auto rounded-md mx-auto" style={{maxHeight: '200px'}} loading="lazy" decoding="async" />
                        <Button variant="outline" size="sm" onClick={() => setReferenceImage(null)}>
                          {language === 'es' ? 'Quitar referencia' : 'Remove reference'}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-muted-foreground flex flex-col items-center py-6">
                        <p className="mb-3 text-sm">
                          {language === 'es' ? 'Sube un ejemplo del piso que deseas' : 'Upload an example of the floor you want'}
                        </p>
                        <input ref={refInputRef} type="file" accept="image/*" onChange={onUploadReference} className="hidden" />
                        <Button variant="outline" size="sm" onClick={() => refInputRef.current?.click()}>
                          <Upload className="w-4 h-4 mr-2" /> 
                          {language === 'es' ? 'Subir referencia' : 'Upload reference'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">
                    {language === 'es' ? '3. Describe el piso Epoxi' : '3. Describe the Epoxy Floor'}
                  </Label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={language === 'es' 
                      ? 'Ej: Reemplaza el piso actual con un suelo epoxi como se muestra en la imagen.'
                      : 'E.g.: Replace the current floor with an epoxy floor as shown in the image.'}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button onClick={generatePreview} disabled={!roomImage || isLoading} className="w-full" size="lg">
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Wand2 className="w-5 h-5 mr-2" />
                  )}
                  {isLoading 
                    ? (language === 'es' ? 'Generando…' : 'Generating…') 
                    : (language === 'es' ? 'Generar vista previa' : 'Generate preview')}
                </Button>

                {isLoading && (
                  <div className="mt-4 p-5 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border-2 border-primary/20 rounded-xl shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-bold text-primary mb-2">
                          {language === 'es' 
                            ? '⏱️ Generación en progreso...' 
                            : '⏱️ Generation in progress...'}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {language === 'es' 
                            ? 'Nuestro sistema de IA está procesando tu imagen. Esto puede tardar 30-60 segundos. Por favor, mantén esta página abierta.' 
                            : 'Our AI system is processing your image. This may take 30-60 seconds. Please keep this page open.'}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-primary/70">
                          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse delay-75"></span>
                          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                    {errorMsg}
                  </div>
                )}

                {resultImage && (
                  <div className="mt-6">
                    <Label className="mb-3 block text-lg">{language === 'es' ? 'Resultado' : 'Result'}</Label>
                    <img src={resultImage} alt="result" className="rounded-lg shadow-lg w-full mb-4" loading="lazy" decoding="async" />
                    <Button onClick={downloadImage} variant="default" size="lg" className="w-full">
                      <Download className="w-5 h-5 mr-2" />
                      {language === 'es' ? 'Descargar imagen' : 'Download image'}
                    </Button>
                  </div>
                )}

                <div className="mt-6 text-xs text-muted-foreground flex items-start gap-2 bg-muted/50 p-4 rounded-md">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    {language === 'es' 
                      ? 'Powered by OpenAI gpt-image-1. La IA reemplazará el piso de tu foto con el acabado epoxi descrito, manteniendo el resto del interior intacto.'
                      : 'Powered by OpenAI gpt-image-1. The AI will replace your photo\'s floor with the described epoxy finish, keeping the rest of the interior intact.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'es' ? 'Cómo funciona' : 'How it Works'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">1</div>
                  <p>{language === 'es' ? 'Sube una foto de tu habitación o espacio' : 'Upload a photo of your room or space'}</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">2</div>
                  <p>{language === 'es' ? '(Opcional) Sube una foto de referencia del piso epoxi deseado' : '(Optional) Upload a reference photo of the desired epoxy floor'}</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">3</div>
                  <p>{language === 'es' ? 'Describe el acabado: color, textura, brillo' : 'Describe the finish: color, texture, gloss'}</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">4</div>
                  <p>{language === 'es' ? 'Genera la vista previa con IA' : 'Generate the preview with AI'}</p>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <p className="text-xs">
                    <strong>{language === 'es' ? 'Nota:' : 'Note:'}</strong> {language === 'es' 
                      ? 'Esta es una visualización aproximada. El resultado real puede variar según las condiciones de instalación.'
                      : 'This is an approximate visualization. The actual result may vary depending on installation conditions.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Generation Limit Modal */}
      <Dialog open={showLimitModal} onOpenChange={setShowLimitModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Lock className="w-6 h-6 text-primary" />
              {language === 'es' ? 'Generación Limitada' : 'Limited Generation'}
            </DialogTitle>
            <DialogDescription className="text-base">
              {language === 'es' 
                ? 'Has utilizado tu generación gratuita. Para continuar, introduce un código de acceso o solicita presupuesto.' 
                : 'You have used your free generation. To continue, enter an access code or request a quote.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Code Input Section */}
            <div className="p-5 border-2 border-primary/20 rounded-xl bg-primary/5">
              <div className="flex items-center gap-2 mb-3">
                <Key className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">
                  {language === 'es' ? '¿Ya tienes un código?' : 'Already have a code?'}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'es' 
                  ? 'Si ya solicitaste presupuesto y recibiste un código por email, introdúcelo aquí:' 
                  : 'If you already requested a quote and received a code by email, enter it here:'}
              </p>
              
              <div className="flex gap-2">
                <Input
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder={language === 'es' ? 'Introduce tu código' : 'Enter your code'}
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && verifyAccessCode()}
                />
                <Button onClick={verifyAccessCode} className="px-6">
                  <Check className="w-4 h-4 mr-2" />
                  {language === 'es' ? 'Verificar' : 'Verify'}
                </Button>
              </div>
              
              {codeError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
                  <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-600">{codeError}</p>
                </div>
              )}
            </div>

            {/* Request Quote Form Section */}
            <div className="p-5 border-2 border-muted rounded-xl">
              <h3 className="font-bold text-lg mb-2">
                {language === 'es' ? '¿No tienes código? Solicita uno gratis' : 'Don\'t have a code? Request one for free'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'es' 
                  ? 'Completa el formulario y recibirás un código de acceso para 2 generaciones adicionales por email.' 
                  : 'Complete the form and you will receive an access code for 2 additional generations by email.'}
              </p>

              {formSuccess ? (
                <div className="p-6 bg-gradient-to-br from-emerald-900/90 to-green-900/90 border-2 border-emerald-600/50 rounded-xl shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center">
                      <Check className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-emerald-50 mb-2">
                        {language === 'es' ? '¡Solicitud enviada con éxito!' : 'Request sent successfully!'}
                      </h4>
                      <p className="text-sm text-emerald-100/90 leading-relaxed">
                        {language === 'es' 
                          ? 'Gracias por tu interés. Recibirás un código de acceso para 2 generaciones adicionales por email en las próximas 24 horas.' 
                          : 'Thank you for your interest. You will receive an access code for 2 additional generations by email within 24 hours.'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      {language === 'es' ? 'Nombre completo' : 'Full name'} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="tu@email.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        {language === 'es' ? 'Teléfono' : 'Phone'} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+34 600 000 000"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">
                        {language === 'es' ? 'Superficie estimada (m²)' : 'Estimated surface (m²)'}
                      </Label>
                      <Input
                        value={formData.surface}
                        onChange={(e) => setFormData({...formData, surface: e.target.value})}
                        placeholder={language === 'es' ? 'ej. 150' : 'e.g. 150'}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        {language === 'es' ? 'Dirección del proyecto' : 'Project address'}
                      </Label>
                      <Input
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder={language === 'es' ? 'Ciudad, provincia' : 'City, province'}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      {language === 'es' ? 'Tipo de acabado deseado' : 'Desired finish type'}
                    </Label>
                    <Input
                      value={formData.finishType}
                      onChange={(e) => setFormData({...formData, finishType: e.target.value})}
                      placeholder={language === 'es' ? 'ej. Industrial, decorativo...' : 'e.g. Industrial, decorative...'}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      {language === 'es' ? 'Descripción del proyecto' : 'Project description'}
                    </Label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder={language === 'es' ? 'Cuéntanos más detalles...' : 'Tell us more details...'}
                      rows={3}
                      className="mt-1 resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.gdprConsent}
                      onCheckedChange={(checked) => setFormData({...formData, gdprConsent: checked as boolean})}
                      required
                    />
                    <label htmlFor="privacy" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                      {language === 'es' 
                        ? 'Acepto la política de privacidad y consiento el tratamiento de mis datos para recibir información comercial de JefeEpoxi.' 
                        : 'I accept the privacy policy and consent to the processing of my data to receive commercial information from JefeEpoxi.'}
                    </label>
                  </div>

                  <Button type="submit" disabled={formSubmitting || !formData.gdprConsent} className="w-full" size="lg">
                    {formSubmitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {language === 'es' ? 'Enviando...' : 'Sending...'}</>
                    ) : (
                      <><Send className="w-4 h-4 mr-2" /> {language === 'es' ? 'Solicitar Presupuesto' : 'Request Quote'}</>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Info Box */}
            <div className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border-2 border-primary/20 rounded-xl shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground mb-2 text-base flex items-center gap-2">
                    <span>📧</span>
                    {language === 'es' ? 'Recibirás tu código por email' : 'You will receive your code by email'}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === 'es' 
                      ? 'Después de enviar el formulario, revisaremos tu solicitud y te enviaremos un código de acceso para 2 generaciones adicionales en un plazo de 24 horas.' 
                      : 'After submitting the form, we will review your request and send you an access code for 2 additional generations within 24 hours.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AiFloorVisualizer;