import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * AI #1: Gemini Pro / Flash Master Prompt Engineer
 * Uses Gemini Pro reasoning model to construct the 3D Disney Pixar visual prompt.
 */
export async function generateGeminiPrompt(structuredBouquet) {
  if (!ai) return '';

  const systemPrompt = `You are the world's best luxury florist and Disney/Pixar concept artist.
Your task is to create ONE premium handcrafted florist bouquet description based ONLY on the user's selections.

CRITICAL RULES:
- The final artwork MUST ALWAYS be a COMPLETE WRAPPED STANDING BOUQUET.
- Never generate single flowers, isolated flower heads, close-ups, macro shots, or vases.
- Always include: full bouquet, multi-layered Korean wrapping paper, large satin ribbon bow, dense florist dome arrangement, hidden stems.
- Preserve exact main flowers (${structuredBouquet.mainFlowers.join(', ')}), fillers (${structuredBouquet.fillers.join(', ')}), greenery (${structuredBouquet.greenery.join(', ')}), wrapping (${structuredBouquet.wrapping}), and ribbon (${structuredBouquet.ribbon}).

Output EXACTLY ONE single-sentence visual prompt describing the complete wrapped standing bouquet in Disney/Pixar 3D style. Do NOT include preamble, headers, markdown formatting, or negative tokens.`;

  // 1. Try Gemini 2.5 Pro Model
  try {
    const proRes = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: `${systemPrompt}\n\nStructured Bouquet Object:\n${JSON.stringify(structuredBouquet, null, 2)}`,
    });

    if (proRes && proRes.text) {
      let text = proRes.text.trim();
      text = text.replace(/^(Here is|Visual Description|Optimized Prompt).*?:/gmi, '');
      return text.replace(/\*\*|\*|>/g, '').trim();
    }
  } catch (err) {
    console.warn('⚠️ [Gemini 2.5 Pro] Prompt generator fallback used:', err.message);
  }

  // 2. Try Gemini 3.6 Flash Model
  try {
    const flashRes = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `${systemPrompt}\n\nStructured Bouquet Object:\n${JSON.stringify(structuredBouquet, null, 2)}`,
    });

    if (flashRes && flashRes.text) {
      let text = flashRes.text.trim();
      text = text.replace(/^(Here is|Visual Description|Optimized Prompt).*?:/gmi, '');
      return text.replace(/\*\*|\*|>/g, '').trim();
    }
  } catch (err) {
    console.warn('⚠️ [Gemini 3.6 Flash] Prompt generator fallback used:', err.message);
  }

  return '';
}

/**
 * Direct Gemini Native Image Generator
 * Supports Gemini 3.1 Flash Image, Gemini 2.5 Flash Image, and Imagen 4.0.
 */
export async function generateGeminiImage(promptText) {
  if (!ai) return null;

  // 1. Try Gemini 3.1 Flash Image Interactions API
  try {
    const interaction = await ai.interactions.create({
      model: 'gemini-3.1-flash-image',
      input: promptText,
    });

    if (interaction && interaction.output_image) {
      const mimeType = interaction.output_image.mimeType || 'image/png';
      return `data:${mimeType};base64,${interaction.output_image.data}`;
    }
  } catch (err) {
    console.warn('⚠️ [Gemini 3.1 Flash Image] quota info:', err.message);
  }

  // 2. Try Gemini 2.5 Flash Image Model
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: promptText,
    });

    if (res && res.candidates?.[0]?.content?.parts) {
      const part = res.candidates[0].content.parts.find(p => p.inlineData);
      if (part) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  } catch (err) {
    console.warn('⚠️ [Gemini 2.5 Flash Image] quota info:', err.message);
  }

  // 3. Try Imagen 4.0 Generate Images API
  try {
    const imgRes = await ai.models.generateImages({
      model: 'imagen-4.0-fast-generate-001',
      prompt: promptText,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' }
    });

    if (imgRes && imgRes.generatedImages?.[0]?.image?.imageBytes) {
      return `data:image/jpeg;base64,${imgRes.generatedImages[0].image.imageBytes}`;
    }
  } catch (err) {
    console.warn('⚠️ [Imagen 4.0] info:', err.message);
  }

  return null;
}
