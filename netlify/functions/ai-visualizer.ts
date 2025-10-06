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

    // Create File objects from Buffer (required by OpenAI SDK)
    const roomFile = new File([roomBuffer], 'room.png', { type: 'image/png' });
    
    // Prepare images array for gpt-image-1
    const images: any[] = [roomFile];
    
    // Add reference image if provided
    if (referenceImageBase64) {
      const refBuffer = Buffer.from(referenceImageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const refFile = new File([refBuffer], 'reference.png', { type: 'image/png' });
      images.push(refFile);
    }

    // Build comprehensive prompt
    let fullPrompt = `Task: Replace ONLY the floor in the first image with the epoxy floor style described below.

Floor description: ${prompt}

${referenceImageBase64 ? 'Reference: Use the second image as a style reference for the floor texture, color, and finish.' : ''}

Requirements:
- Keep ALL other elements unchanged (walls, furniture, lighting, windows, doors)
- The floor should look realistic and professionally installed
- Match lighting and perspective of the original room
- Maintain photorealistic quality`;

    let imageBase64: string | undefined;
    let modelUsed = 'gpt-image-1';

    try {
      console.log(`🎨 Generating with gpt-image-1 (${images.length} image${images.length > 1 ? 's' : ''})...`);
      
      // Use gpt-image-1 with multiple images if reference provided
      const result = await client.images.edit({
        model: 'gpt-image-1',
        image: images,
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