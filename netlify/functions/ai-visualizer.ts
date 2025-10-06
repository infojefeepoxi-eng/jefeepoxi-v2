import type { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { roomImageBase64, referenceImageBase64, prompt } = JSON.parse(event.body || '{}');

    if (!roomImageBase64 || !prompt) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'roomImageBase64 and prompt are required' }) };
    }

    console.log('🎨 AI Visualizer: Starting with gpt-image-1');

    // Convert base64 to Buffer
    const roomBuffer = Buffer.from(roomImageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const referenceBuffer = referenceImageBase64
      ? Buffer.from(referenceImageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64')
      : null;

    // Prepare images array
    const images: Buffer[] = [roomBuffer];
    if (referenceBuffer) {
      images.push(referenceBuffer);
    }

    // Use images.edit with gpt-image-1
    const result = await client.images.edit({
      model: 'gpt-image-1',
      image: images,
      prompt: `Replace the floor in the room with ${prompt}. Keep all other elements unchanged. Match the style if reference provided. Photorealistic interior photography.`,
      quality: 'high',
      size: '1024x1024',
      output_format: 'png'
    } as any);

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'No image generated' }) };
    }

    console.log('✅ Image generated successfully');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ image_base64: imageBase64 }),
    };
  } catch (error: any) {
    console.error('❌ AI Visualizer error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error?.message || 'Server error' }) };
  }
};

export default handler;