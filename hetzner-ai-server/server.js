const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const { File } = require('buffer');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS для доступу з вашого Netlify сайту
app.use(cors({
  origin: ['https://dapper-brigadeiros-b7c269.netlify.app', 'http://localhost:8080'],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '50mb' }));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Visualizer endpoint
app.post('/api/ai-visualizer', async (req, res) => {
  try {
    const { roomImageBase64, referenceImageBase64, prompt } = req.body;

    if (!roomImageBase64 || !prompt) {
      return res.status(400).json({ error: 'roomImageBase64 and prompt are required' });
    }

    console.log('🎨 AI Visualizer request received');

    // Convert base64 to Buffer
    const roomBuffer = Buffer.from(roomImageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    // Create File objects from Buffer (required by OpenAI SDK)
    const roomFile = new File([roomBuffer], 'room.png', { type: 'image/png' });
    
    // Prepare images array for gpt-image-1
    const images = [roomFile];
    
    // Add reference image if provided
    if (referenceImageBase64) {
      const refBuffer = Buffer.from(referenceImageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const refFile = new File([refBuffer], 'reference.png', { type: 'image/png' });
      images.push(refFile);
    }

    // Build comprehensive prompt
    const fullPrompt = `Task: Replace ONLY the floor in the first image with the epoxy floor style described below.

Floor description: ${prompt}

${referenceImageBase64 ? 'Reference: Use the second image as a style reference for the floor texture, color, and finish.' : ''}

Requirements:
- Keep ALL other elements unchanged (walls, furniture, lighting, windows, doors)
- The floor should look realistic and professionally installed
- Match lighting and perspective of the original room
- Maintain photorealistic quality`;

    console.log(`🎨 Generating with gpt-image-1 (${images.length} image${images.length > 1 ? 's' : ''})...`);
    
    // Use gpt-image-1 with multiple images if reference provided
    const result = await client.images.edit({
      model: 'gpt-image-1',
      image: images,
      prompt: fullPrompt,
      size: '1024x1024'
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      console.error('❌ No image generated');
      return res.status(500).json({ error: 'No image generated' });
    }

    console.log('✅ Image generated successfully with gpt-image-1');

    res.json({ image_base64: imageBase64 });

  } catch (error) {
    console.error('❌ AI Visualizer error:', error);
    res.status(500).json({ error: error?.message || 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AI Visualizer server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});


