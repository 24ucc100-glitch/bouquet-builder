import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://bouquet-builder-nu.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Initialize AI #1: Google Gemini Text API
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * MASTER AI PROMPT BUILDER
 * Generates the master Disney/Pixar luxury florist artwork prompt preserving exact user selections.
 */
function buildMasterAIPrompt(userSelections, geminiEnhancedText = '') {
  const {
    flowers = ["6 Red Roses", "3 White Lilies", "2 Sunflowers", "Baby's Breath"],
    leaves = ["Eucalyptus", "Fern"],
    wrap = "Pink Korean Wrap",
    ribbon = "Pink Satin Ribbon",
    card = "Happy Birthday Sneha ❤️"
  } = userSelections;

  const flowerList = Array.isArray(flowers) ? flowers.join(', ') : flowers;
  const leafList = Array.isArray(leaves) ? leaves.join(', ') : leaves;

  const visualDescription = geminiEnhancedText || `A professional florist dome bouquet featuring exactly ${flowerList}, with ${leafList} foliage, wrapped in ${wrap} tied with ${ribbon}.`;

  const MASTER_STYLE = "Disney Pixar animated digital illustration style, luxury florist artwork, greeting card quality, cute but elegant, soft painterly rendering, rich gradients, warm cinematic lighting, professional floral composition, centered bouquet, dark luxury studio background, ultra detailed, 4K, masterpiece.";

  const NEGATIVE_PROMPT = "no vase, no people, no hands, no table, no logo, no watermark, no text, no extra flowers, no missing flowers, no blurry petals, no clipart, no stickers";

  return `${visualDescription}. ${MASTER_STYLE} Avoid: ${NEGATIVE_PROMPT}.`;
}

// API Endpoint: POST /api/generate
app.post('/api/generate', async (req, res) => {
  try {
    const userSelections = req.body;
    console.log('1. User Selected Bouquet Payload:', userSelections);

    let geminiEnhancedText = '';

    // STEP 1: AI #1 (Gemini Text Model) - Enhances the prompt based on user selections
    if (ai) {
      try {
        console.log('2. [AI #1 - Gemini 3.6 Flash]: Generating visual prompt description...');
        
        const systemPrompt = `You are a professional Disney/Pixar floral art prompt engineer.
Convert the user bouquet selections into a short 1-sentence visual description of the bouquet composition. Preserve exact flower counts and colors. Output ONLY raw prompt text without preamble.`;

        const flowerStr = Array.isArray(userSelections.flowers) ? userSelections.flowers.join(', ') : userSelections.flowers;
        const leafStr = Array.isArray(userSelections.leaves) ? userSelections.leaves.join(', ') : userSelections.leaves;

        const geminiRes = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: `${systemPrompt}\n\nSelections: Flowers: ${flowerStr}. Foliage: ${leafStr}. Wrap: ${userSelections.wrap}. Ribbon: ${userSelections.ribbon}.`,
        });

        if (geminiRes && geminiRes.text) {
          let text = geminiRes.text.trim();
          text = text.replace(/^(Here is|Visual Description|Optimized Prompt).*?:/gmi, '');
          text = text.replace(/\*\*|\*|>/g, '');
          text = text.replace(/(photo|photorealistic|camera|8k resolution)/gi, 'cartoon illustration');
          geminiEnhancedText = text.trim();
          console.log('   [AI #1 Result]:', geminiEnhancedText);
        }
      } catch (geminiError) {
        console.warn('⚠️ [AI #1] Gemini prompt enhancement fallback used:', geminiError.message);
      }
    }

    // STEP 2: Build Master Prompt
    const masterPrompt = buildMasterAIPrompt(userSelections, geminiEnhancedText);
    console.log('3. Master AI Prompt sent to Image Generator Engine:\n', masterPrompt);

    // STEP 3: AI #2 (Pluggable Image Generator Engine)
    console.log('4. [AI #2 - Image Generator]: Generating bouquet illustration...');
    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(masterPrompt)}?width=1024&height=1024&seed=${seed}&nologo=true`;

    console.log('5. [AI #2 Result] Generated Image URL:', imageUrl);

    return res.json({
      success: true,
      imageUrl: imageUrl,
      prompt: masterPrompt,
      bouquet: userSelections
    });

  } catch (error) {
    console.error('❌ Error generating bouquet artwork:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      imageUrl: '/assets/reference_bouquet.jpg'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🌸 Bloom & Artistry Express Server listening on http://localhost:${PORT}`);
});