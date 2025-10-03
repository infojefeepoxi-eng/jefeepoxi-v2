import React, { useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Image as ImageIcon, Wand2, ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const AiFloorVisualizer = () => {
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('Piso epoxi metalizado gris con acabado satinado');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const roomInputRef = useRef<HTMLInputElement | null>(null);
  const refInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (file: File, setter: (v: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setter(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onUploadRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file, (v) => setRoomImage(v));
  };

  const onUploadReference = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file, (v) => setReferenceImage(v));
  };

  const generatePreview = async () => {
    if (!roomImage) return;
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/.netlify/functions/ai-visualizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomImageBase64: roomImage,
          referenceImageBase64: referenceImage,
          prompt
        })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }
      const data = await res.json();
      if (data?.image_base64) {
        setResultImage(`data:image/png;base64,${data.image_base64}`);
      } else {
        throw new Error('No image_base64 in response');
      }
    } catch (e: any) {
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
                Volver al Inicio
              </Button>
            </Link>

            <div className="text-center max-w-3xl mx-auto">
              <Wand2 className="w-14 h-14 text-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Visualizador IA – Cambia tu piso a Epoxi
              </h1>
              <p className="text-muted-foreground">
                Sube una foto de tu interior y genera una vista previa realista con el acabado epoxi que elijas.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Sube tus imágenes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block">Foto de tu interior</Label>
                    <div className="border rounded-lg p-4 text-center">
                      {roomImage ? (
                        <img src={roomImage} alt="room" className="max-h-64 mx-auto rounded" />
                      ) : (
                        <div className="text-muted-foreground flex flex-col items-center py-10">
                          <ImageIcon className="w-8 h-8 mb-2" />
                          Arrastra o selecciona una imagen
                        </div>
                      )}
                      <input ref={roomInputRef} type="file" accept="image/*" onChange={onUploadRoom} className="hidden" />
                      <Button variant="outline" className="mt-4" onClick={() => roomInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-2" /> Subir imagen
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Referencia (opcional)</Label>
                    <div className="border rounded-lg p-4 text-center">
                      {referenceImage ? (
                        <img src={referenceImage} alt="reference" className="max-h-64 mx-auto rounded" />
                      ) : (
                        <div className="text-muted-foreground flex flex-col items-center py-10">
                          <ImageIcon className="w-8 h-8 mb-2" />
                          Ejemplo del acabado deseado
                        </div>
                      )}
                      <input ref={refInputRef} type="file" accept="image/*" onChange={onUploadReference} className="hidden" />
                      <Button variant="outline" className="mt-4" onClick={() => refInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-2" /> Subir referencia
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Describe el piso Epoxi</Label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ej: Piso epoxi autonivelante gris RAL 7042, satinado, antideslizante R11"
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={generatePreview} disabled={!roomImage || isLoading} className="flex-1">
                    <Wand2 className="w-4 h-4 mr-2" /> {isLoading ? 'Generando…' : 'Generar vista previa'}
                  </Button>
                </div>

                {errorMsg && (
                  <div className="mt-4 text-sm text-red-600">{errorMsg}</div>
                )}

                {resultImage && (
                  <div className="mt-6">
                    <Label className="mb-2 block">Resultado (demo)</Label>
                    <img src={resultImage} alt="result" className="rounded-md shadow" />
                  </div>
                )}

                <div className="mt-6 text-xs text-muted-foreground flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5" />
                  <p>
                    Demo local. El procesamiento real de IA requiere un backend con OpenAI. Proveeré endpoint que acepte: imagen de habitación (base64 o file_id), referencia (opcional) y prompt; devolverá imagen generada (base64).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API (planificado)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>En el backend se usará OpenAI Responses API con entrada de imágenes:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Subida como Base64 o file_id (API de archivos)</li>
                  <li>Herramienta image_generation con máscara opcional</li>
                  <li>Modelos: gpt-4.1 / gpt-4o + gpt-image-1 para edición</li>
                </ul>
                <p className="mt-2">Parámetros a enviar:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>roomImage (base64)</li>
                  <li>referenceImage (base64, opcional)</li>
                  <li>prompt (texto)</li>
                </ul>
                <p className="mt-2">Respuesta:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>image_base64 (png)</li>
                </ul>
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


