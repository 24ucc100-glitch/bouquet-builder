/**
 * AI #2: Pollinations Image Service
 * Generates 4K Disney/Pixar bouquet artwork using Pollinations AI (Flux 1.0 Engine).
 */
export async function generateBouquetImage(finalPrompt) {
  // 1. Primary Engine: Pollinations AI High-Speed POST API (Base64 Direct Delivery)
  try {
    const seed = Math.floor(Math.random() * 1000000);
    const cleanPrompt = finalPrompt.slice(0, 800);

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
        generator: 'Pollinations AI (Flux 1.0 HD Engine)'
      };
    } else {
      console.warn('⚠️ Pollinations POST status:', response.status);
    }
  } catch (err) {
    console.warn('⚠️ Pollinations POST fetch error:', err.message);
  }

  // 2. Fallback Engine: Pollinations AI GET Stream
  const seed = Math.floor(Math.random() * 1000000);
  return {
    imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt.slice(0, 500))}?width=1024&height=1024&seed=${seed}&nologo=true`,
    generator: 'Pollinations AI (Flux GET Fallback)'
  };
}

export default generateBouquetImage;
