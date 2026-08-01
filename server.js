import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { buildFinalBouquetDescription } from './src/engine/floristEngine.js';

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

// Initialize AI #1: Google Gemini API
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * PROMPT ENHANCEMENT ENGINE (No AI)
 * Automatically appends positive visual quality tokens and strict negative tokens.
 */
function enhancePrompt(basePrompt) {
  const POSITIVE_STYLE_TOKENS = [
    "Disney-Pixar premium 3D digital painting",
    "luxury florist artwork",
    "greeting card illustration",
    "soft painterly rendering",
    "mobile game artwork",
    "studio lighting",
    "elegant Korean wrapping folds",
    "premium florist arrangement",
    "cute rounded petals",
    "professional dome composition",
    "balanced bouquet",
    "4K illustration",
    "centered composition",
    "dark luxury studio background",
    "highly detailed",
    "vibrant colors"
  ].join(', ');

  const NEGATIVE_TOKENS = [
    "no cropped flowers",
    "no missing ribbon",
    "no extra flowers",
    "no watermark",
    "no text",
    "no logo",
    "no signature",
    "no vase",
    "no bowl",
    "no dish",
    "no pot",
    "no people",
    "no hands"
  ].join(', ');

  return `${basePrompt}. ${POSITIVE_STYLE_TOKENS}. Avoid: ${NEGATIVE_TOKENS}.`;
}

// API Endpoint: POST /api/generate
app.post('/api/generate', async (req, res) => {
  const startTime = Date.now();

  try {
    const rawPayload = req.body || {};
    console.log('1. User Raw Payload Received:', rawPayload);

    // STEP 1: VALIDATE USER PAYLOAD
    const validatedPayload = {
      flowers: Array.isArray(rawPayload.flowers) && rawPayload.flowers.length > 0
        ? rawPayload.flowers
        : ["6 Velvet Red Roses", "3 White Lilies"],
      leaves: Array.isArray(rawPayload.leaves) ? rawPayload.leaves : ["Eucalyptus", "Fern"],
      wrap: rawPayload.wrap || "Luxury Korean Pink Wrap",
      ribbon: rawPayload.ribbon || "Satin Pink Ribbon",
      card: rawPayload.card || "Happy Birthday Sneha ❤️",
      decorations: Array.isArray(rawPayload.decorations) ? rawPayload.decorations : ["Floating Sparkles"],
      occasion: rawPayload.occasion || "Birthday",
      theme: rawPayload.theme || "Dark Luxury Studio",
      size: rawPayload.size || "Standard Florist Dome"
    };

    // STEP 2: FLORIST BOUQUET ENGINE (Business Logic Arrangement BEFORE AI)
    const structuredBouquet = buildFinalBouquetDescription(validatedPayload);
    console.log('2. [Florist Engine Result] Structured Bouquet Object:\n', structuredBouquet);

    let geminiPromptResult = '';

    // STEP 3: AI #1 - GEMINI 2.5 FLASH (Prompt Engineering AI)
    if (ai) {
      try {
        console.log('3. [AI #1 - Gemini 2.5 Flash]: Understanding composition & engineering prompt...');
        
        const systemPrompt = `You are a professional Disney/Pixar floral art prompt engineer.
Input is a structured florist bouquet object.
Output EXACTLY ONE single-sentence visual prompt describing the handcrafted standing bouquet.
Preserve exact main flowers (${structuredBouquet.mainFlowers.join(', ')}), fillers (${structuredBouquet.fillers.join(', ')}), greenery (${structuredBouquet.greenery.join(', ')}), wrapping (${structuredBouquet.wrapping}), and ribbon (${structuredBouquet.ribbon}).
Do NOT include markdown, headers, preamble, or negative tokens. Output raw prompt text only.`;

        const geminiRes = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: `${systemPrompt}\n\nStructured Bouquet Object:\n${JSON.stringify(structuredBouquet, null, 2)}`,
        });

        if (geminiRes && geminiRes.text) {
          geminiPromptResult = geminiRes.text.trim();
          geminiPromptResult = geminiPromptResult.replace(/^(Here is|Visual Description|Optimized Prompt).*?:/gmi, '');
          geminiPromptResult = geminiPromptResult.replace(/\*\*|\*|>/g, '').trim();
          console.log('   [AI #1 Output]:', geminiPromptResult);
        }
      } catch (geminiErr) {
        console.warn('⚠️ [AI #1] Gemini Prompt Generator fallback used:', geminiErr.message);
      }
    }

    if (!geminiPromptResult) {
      geminiPromptResult = `A luxurious handcrafted florist bouquet featuring exactly ${structuredBouquet.mainFlowers.join(', ')}, ${structuredBouquet.fillers.join(', ')}, ${structuredBouquet.greenery.join(', ')} foliage, wrapped in ${structuredBouquet.wrapping}, finished with a ${structuredBouquet.ribbon}`;
    }

    // STEP 4: PROMPT ENHANCEMENT ENGINE (No AI)
    const finalMasterPrompt = enhancePrompt(geminiPromptResult);
    console.log('4. [Prompt Enhancement Engine] Final Master Prompt:\n', finalMasterPrompt);

    // STEP 5: AI #2 - PLUGGABLE IMAGE GENERATOR (Gemini Image / Flux Engine)
    let imageUrl = '';
    let usedGenerator = 'Flux Engine (Pollinations 4K)';

    if (ai) {
      try {
        console.log('5. [AI #2 - Direct Gemini Image Model]: Attempting gemini-2.5-flash-image...');
        const geminiImageRes = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: finalMasterPrompt,
        });

        if (geminiImageRes && geminiImageRes.candidates?.[0]?.content?.parts) {
          const imagePart = geminiImageRes.candidates[0].content.parts.find(p => p.inlineData);
          if (imagePart) {
            imageUrl = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
            usedGenerator = 'Google Gemini 2.5 Image Generator';
            console.log('   [AI #2] Gemini Direct Image Generation Success!');
          }
        }
      } catch (imageErr) {
        console.warn('⚠️ Direct Gemini Image Model rate-limited, executing Flux Engine fallback:', imageErr.message);
      }
    }

    if (!imageUrl) {
      console.log('5. [AI #2 - Flux Engine]: Generating high-res Disney/Pixar bouquet artwork...');
      const seed = Math.floor(Math.random() * 1000000);
      imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalMasterPrompt)}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;
    }

    const generationTime = `${((Date.now() - startTime) / 1000).toFixed(2)}s`;

    // STEP 6: EXPRESS CONVERTS & RETURNS RESPONSE
    const responsePayload = {
      success: true,
      imageUrl: imageUrl,
      prompt: finalMasterPrompt,
      bouquet: structuredBouquet,
      generator: usedGenerator,
      generationTime: generationTime
    };

    console.log(`6. Returning response (${generationTime}):`, responsePayload.success);
    return res.json(responsePayload);

  } catch (error) {
    console.error('❌ Error generating bouquet artwork:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      imageUrl: '/assets/reference_bouquet.jpg',
      generator: 'Fallback Reference View',
      generationTime: '0.0s'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🌸 Bloom & Artistry AI Florist Studio Server listening on http://localhost:${PORT}`);
});