import { validatePayload } from '../utils/validator.js';
import { buildFinalBouquetDescription } from '../florist/layoutEngine.js';
import { generateGeminiPrompt } from '../services/geminiService.js';
import { enhancePrompt } from '../services/promptEnhancer.js';
import { generateBouquetImage } from '../services/imageGenerator.js';

export async function generateBouquet(req, res) {
  const startTime = Date.now();

  try {
    const rawPayload = req.body || {};
    
    // 1. VALIDATE PAYLOAD
    const validatedPayload = validatePayload(rawPayload);

    // 2. FLORIST BOUQUET ENGINE (Business Logic Composition)
    const structuredBouquet = buildFinalBouquetDescription(validatedPayload);

    // 3. AI #1: GEMINI 2.5 FLASH (Prompt Engineering AI)
    let geminiPrompt = await generateGeminiPrompt(structuredBouquet);
    if (!geminiPrompt) {
      geminiPrompt = `A luxurious handcrafted florist bouquet featuring exactly ${structuredBouquet.mainFlowers.join(', ')}, ${structuredBouquet.fillers.join(', ')}, ${structuredBouquet.greenery.join(', ')} foliage, wrapped in ${structuredBouquet.wrapping}, finished with a ${structuredBouquet.ribbon}`;
    }

    // 4. PROMPT ENHANCEMENT ENGINE (No AI)
    const finalPrompt = enhancePrompt(geminiPrompt);

    // 5. AI #2: IMAGE GENERATOR (Pluggable)
    const { imageUrl, generator } = await generateBouquetImage(finalPrompt);

    const generationTime = `${((Date.now() - startTime) / 1000).toFixed(2)}s`;

    // 6. RETURN EXPRESS RESPONSE
    return res.json({
      success: true,
      imageUrl,
      prompt: finalPrompt,
      bouquet: structuredBouquet,
      generator,
      generationTime
    });

  } catch (error) {
    console.error('❌ Bouquet Controller Error:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      imageUrl: '/assets/reference_bouquet.jpg',
      generator: 'Fallback Reference View',
      generationTime: '0.0s'
    });
  }
}
