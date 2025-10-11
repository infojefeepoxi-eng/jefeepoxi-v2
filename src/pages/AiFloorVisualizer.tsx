import React, { useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Image as ImageIcon, Wand2, ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const AiFloorVisualizer = () => {
  const { language } = useLanguage();
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>(
    language === 'es' 
      ? 'Piso epoxi metalizado gris con acabado satinado' 
      : 'Gray metallic epoxy floor with satin finish'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
                        <img src={roomImage} alt="room" className="max-w-full h-auto rounded-md mx-auto" style={{maxHeight: '300px'}} />
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
                        <img src={referenceImage} alt="reference" className="max-w-full h-auto rounded-md mx-auto" style={{maxHeight: '200px'}} />
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
                      ? 'Ej: Piso epoxi autonivelante gris RAL 7042, satinado, antideslizante R11'
                      : 'E.g.: Self-leveling gray RAL 7042 epoxy floor, satin finish, non-slip R11'}
                    rows={3}
                  />
                </div>

                <Button onClick={generatePreview} disabled={!roomImage || isLoading} className="w-full" size="lg">
                  <Wand2 className="w-5 h-5 mr-2" /> 
                  {isLoading 
                    ? (language === 'es' ? 'Generando…' : 'Generating…') 
                    : (language === 'es' ? 'Generar vista previa' : 'Generate preview')}
                </Button>

                {errorMsg && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                    {errorMsg}
                  </div>
                )}

                {resultImage && (
                  <div className="mt-6">
                    <Label className="mb-3 block text-lg">{language === 'es' ? 'Resultado' : 'Result'}</Label>
                    <img src={resultImage} alt="result" className="rounded-lg shadow-lg w-full" />
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
      <Footer />
    </div>
  );
};

export default AiFloorVisualizer;