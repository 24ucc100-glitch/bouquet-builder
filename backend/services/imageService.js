/**
 * AI #2: Pollinations Image Service
 * Renders 3D Disney Pixar bouquet artwork using the high-fidelity midjourney model engine.
 */
export async function generateBouquetImage(finalPrompt) {
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
