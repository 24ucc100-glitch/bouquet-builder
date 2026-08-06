import { validatePayload } from '../utils/validator.js';
import { buildPrompt } from '../prompts/masterPrompt.js';
import { generateGeminiPrompt } from '../services/geminiService.js';
import { generateBouquetImage } from '../services/imageService.js';

export async function generateBouquet(req, res) {
  const startTime = Date.now();

  try {
    const rawPayload = req.body || {};
    
    // 1. VALIDATE PAYLOAD & BUILD STRUCTURED JSON
    const bouquetJSON = validatePayload(rawPayload);

    // 2. AI #1 / MODULAR PROMPT GENERATION PIPELINE
    let geminiPrompt = await generateGeminiPrompt(bouquetJSON);
    if (!geminiPrompt) {
      geminiPrompt = buildPrompt(bouquetJSON);
    } else {
      geminiPrompt = `${geminiPrompt}\n\n${buildPrompt(bouquetJSON)}`;
    }

    // 3. AI #2: IMAGE GENERATOR SERVICE
    const { imageUrl, generator } = await generateBouquetImage(geminiPrompt);

    const generationTime = Number(((Date.now() - startTime) / 1000).toFixed(2));

    // 4. RETURN CLEAN JSON RESPONSE
    return res.json({
      success: true,
      prompt: geminiPrompt,
      generator: generator || 'pollinations',
      generationTime: generationTime,
      imageUrl: imageUrl
    });

  } catch (error) {
    console.error('❌ Bouquet Controller Error:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      prompt: '',
      generator: 'fallback',
      generationTime: 0,
      imageUrl: '/assets/reference_bouquet.jpg'
    });
  }
}
