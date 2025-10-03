import type { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { roomImageBase64, referenceImageBase64, prompt } = JSON.parse(event.body || '{}');

    if (!roomImageBase64 || !prompt) {
      return { statusCode: 400, body: 'roomImageBase64 and prompt are required' };
    }

    // Simple generate call for MVP. For inpainting, switch to images.edits with mask.
    const result = await client.images.generate({
      model: 'gpt-image-1',
      prompt,
      size: '1024x1024',
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      return { statusCode: 500, body: 'No image generated' };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_base64: imageBase64 }),
    };
  } catch (error: any) {
    const message = error?.message || 'Server error';
    return { statusCode: 500, body: message };
  }
};

export default handler;


