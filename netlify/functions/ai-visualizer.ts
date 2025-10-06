import type { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import { File } from 'buffer';

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

    // Convert base64 to Buffer
    const roomBuffer = Buffer.from(roomImageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    // Create File object from Buffer (required by OpenAI SDK)
    const roomFile = new File([roomBuffer], 'room.png', { type: 'image/png' });

    // Build prompt with reference if provided
    let fullPrompt = `Replace the floor in the room with: ${prompt}. Keep all other elements (walls, furniture, lighting) exactly unchanged. Photorealistic interior photography, professional quality.`;
    
    if (referenceImageBase64) {
      fullPrompt += ` Match the floor style and texture from the reference image provided.`;
    }

    let imageBase64: string | undefined;
    let modelUsed = 'gpt-image-1';

    try {
      console.log('🎨 Trying gpt-image-1...');
      
      // Try gpt-image-1 first
      const result = await client.images.edit({
        model: 'gpt-image-1',
        image: roomFile,
        prompt: fullPrompt,
        size: '1024x1024'
      } as any);

      imageBase64 = result.data?.[0]?.b64_json;
      console.log('✅ Image generated with gpt-image-1');
      
    } catch (error: any) {
      // If 403 (not verified), show message that verification is needed
      if (error?.status === 403 || error?.message?.includes('must be verified')) {
        console.log('⚠️ gpt-image-1 not available - organization verification required');
        return { 
          statusCode: 403, 
          headers, 
          body: JSON.stringify({ 
            error: 'Organization verification required for AI floor visualization. Please verify your organization at https://platform.openai.com/settings/organization/general to enable this feature. Verification takes up to 15 minutes after completion.' 
          }) 
        };
      } else {
        // If other error, throw it
        throw error;
      }
    }

    if (!imageBase64) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'No image generated' }) };
    }

    console.log(`✅ Image generated successfully with ${modelUsed}`);

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