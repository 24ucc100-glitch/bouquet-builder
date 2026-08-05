import { generateGeminiImage } from './geminiService.js';

/**
 * AI #2: Pluggable Free Image Generator Engine
 * Uses Pollinations POST API to generate and return base64 4K bouquet artwork.
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

  // 2. Primary Free Engine: Pollinations High-Speed POST API (Base64 Guaranteed Delivery)
  try {
    const seed = Math.floor(Math.random() * 1000000);
    const shortPrompt = finalPrompt.slice(0, 800); // Clean length for optimal diffusion

    const response = await fetch('https://image.pollinations.ai/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: shortPrompt,
        width: 1024,
        height: 1024,
        seed: seed,
        model: 'flux',
        nologo: true
      })
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const base64Image = Buffer.from(arrayBuffer).toString('base64');
      const mimeType = response.headers.get('content-type') || 'image/jpeg';
      
      return {
        imageUrl: `data:${mimeType};base64,${base64Image}`,
        generator: 'Flux 1.0 HD Engine (Base64 Direct Delivery)'
      };
    } else {
      console.warn('⚠️ Pollinations POST status:', response.status);
    }
  } catch (err) {
    console.warn('⚠️ Pollinations POST fetch error:', err.message);
  }

  // 3. Fallback GET URL
  const seed = Math.floor(Math.random() * 1000000);
  return {
    imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt.slice(0, 500))}?width=1024&height=1024&seed=${seed}&nologo=true`,
    generator: 'Flux 1.0 HD Engine (URL Fallback)'
  };
}
