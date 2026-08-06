import { generateGeminiImage } from './geminiService.js';

/**
 * Image Generator Service
 * Uses Google Gemini 2.5 Flash Image Model exclusively for image generation.
 */
export async function generateBouquetImage(finalPrompt) {
  const geminiBase64 = await generateGeminiImage(finalPrompt);

  if (geminiBase64) {
    return {
      imageUrl: geminiBase64,
      generator: 'Google Gemini 2.5 Flash Image'
    };
  }

  throw new Error('Gemini 2.5 Flash Image generation returned no image data.');
}

export default generateBouquetImage;
