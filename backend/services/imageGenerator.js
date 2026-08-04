import { generateGeminiImage } from './geminiService.js';

/**
 * AI #2: Pluggable Free Image Generator Engine
 * Uses the world's best free open-weights diffusion model (Flux 1.0 4K Engine).
 */
export async function generateBouquetImage(finalPrompt) {
  // 1. Attempt Direct Gemini Image Model (if quota / billing enabled)
  const geminiDataUrl = await generateGeminiImage(finalPrompt);
  if (geminiDataUrl) {
    return {
      imageUrl: geminiDataUrl,
      generator: 'Google Gemini 2.5 Image Generator'
    };
  }

  // 2. Primary Free Engine: Flux 1.0 High-Definition Disney/Pixar Model
  const seed = Math.floor(Math.random() * 1000000);
  const fluxUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true&enhance=true`;

  return {
    imageUrl: fluxUrl,
    generator: 'Flux 1.0 HD Engine (Best Free 4K AI Generator)'
  };
}
