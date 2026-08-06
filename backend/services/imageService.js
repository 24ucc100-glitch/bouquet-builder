import { generateGeminiImage } from './geminiService.js';

/**
 * AI #2: Image Generator Service
 * Uses Gemini 2.5 Flash Image Model exclusively as primary generator, with fallback.
 */
export async function generateBouquetImage(finalPrompt) {
  // 1. Primary Image Generator: Gemini 2.5 Flash Image Model
  const geminiBase64 = await generateGeminiImage(finalPrompt);
  if (geminiBase64) {
    return {
      imageUrl: geminiBase64,
      generator: 'Google Gemini 2.5 Flash Image'
    };
  }

  // 2. Fail-safe Fallback Engine: Pollinations AI Midjourney Engine
  try {
    const seed = Math.floor(Math.random() * 1000000);
    const cleanPrompt = finalPrompt.slice(0, 500);

    const response = await fetch('https://image.pollinations.ai/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: cleanPrompt,
        width: 1024,
        height: 1024,
        seed: seed,
        model: 'midjourney',
        nologo: true
      })
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const base64Image = Buffer.from(arrayBuffer).toString('base64');
      const mimeType = response.headers.get('content-type') || 'image/jpeg';
      
      return {
        imageUrl: `data:${mimeType};base64,${base64Image}`,
        generator: 'Pollinations AI (Disney/Pixar Midjourney Engine)'
      };
    }
  } catch (err) {
    console.warn('⚠️ Pollinations POST fetch error:', err.message);
  }

  // Fallback GET stream
  const seed = Math.floor(Math.random() * 1000000);
  return {
    imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt.slice(0, 300))}?model=midjourney&width=1024&height=1024&seed=${seed}&nologo=true`,
    generator: 'Pollinations AI (Midjourney GET Fallback)'
  };
}

export default generateBouquetImage;
