import { validatePayload } from '../utils/validator.js';
import { enhancePromptWithGemini } from '../services/promptEnhancer.js';
import { generateBouquetImage } from '../services/imageService.js';

export async function generateBouquet(req, res) {
  const startTime = Date.now();

  try {
    const rawPayload = req.body || {};
    
    // 1. VALIDATE PAYLOAD & BUILD STRUCTURED BOUQUET JSON
    const bouquetJSON = validatePayload(rawPayload);

    // 2. GEMINI PROMPT ENHANCER SERVICE (Using GEMINI_API_KEY)
    const enhancedPrompt = await enhancePromptWithGemini(bouquetJSON);

    // 3. GEMINI 2.5 FLASH IMAGE GENERATOR SERVICE
    const { imageUrl, generator } = await generateBouquetImage(enhancedPrompt);

    const generationTime = Number(((Date.now() - startTime) / 1000).toFixed(2));

    // 4. RETURN CLEAN RESPONSE PAYLOAD
    return res.json({
      success: true,
      prompt: enhancedPrompt,
      generator: generator || 'Google Gemini 2.5 Flash Image',
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
