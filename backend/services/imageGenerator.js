import { generateGeminiImage } from './geminiService.js';

/**
 * AI #2: Pluggable Image Generator Engine (Gemini / Flux / Imagen)
 */
export async function generateBouquetImage(finalPrompt) {
  // 1. Attempt Direct Gemini Image Model
  const geminiDataUrl = await generateGeminiImage(finalPrompt);
  if (geminiDataUrl) {
    return {
      imageUrl: geminiDataUrl,
      generator: 'Google Gemini 2.5 Image Generator'
    };
  }

  // 2. Fallback to High-Res Flux 4K Engine
  const seed = Math.floor(Math.random() * 1000000);
  const fluxUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;

  return {
    imageUrl: fluxUrl,
    generator: 'Flux Engine (Pollinations 4K)'
  };
}
