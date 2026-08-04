import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * AI #1: Gemini 2.5 / 3.6 Flash Prompt Engineer
 * Converts structured user selections into ONE premium Disney/Pixar florist description.
 */
export async function generateGeminiPrompt(structuredBouquet) {
  if (!ai) return '';

  try {
    const systemPrompt = `You are the world's best luxury florist and Disney/Pixar concept artist.
Your task is to create ONE premium handcrafted florist bouquet description based ONLY on the user's selections.

CRITICAL RULES:
- The final artwork MUST ALWAYS be a COMPLETE WRAPPED STANDING BOUQUET.
- Never generate single flowers, isolated flower heads, close-ups, macro shots, or vases.
- Always include: full bouquet, multi-layered Korean wrapping paper, large satin ribbon bow, dense florist dome arrangement, hidden stems.
- Preserve exact main flowers (${structuredBouquet.mainFlowers.join(', ')}), fillers (${structuredBouquet.fillers.join(', ')}), greenery (${structuredBouquet.greenery.join(', ')}), wrapping (${structuredBouquet.wrapping}), and ribbon (${structuredBouquet.ribbon}).

Output EXACTLY ONE single-sentence visual prompt describing the complete wrapped standing bouquet in Disney/Pixar 3D style. Do NOT include preamble, headers, markdown formatting, or negative tokens.`;

    const geminiRes = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `${systemPrompt}\n\nStructured Bouquet Object:\n${JSON.stringify(structuredBouquet, null, 2)}`,
    });

    if (geminiRes && geminiRes.text) {
      let text = geminiRes.text.trim();
      text = text.replace(/^(Here is|Visual Description|Optimized Prompt).*?:/gmi, '');
      return text.replace(/\*\*|\*|>/g, '').trim();
    }
  } catch (err) {
    console.warn('⚠️ [Gemini Service] Gemini Prompt Generator fallback used:', err.message);
  }
  return '';
}

/**
 * Direct Gemini Image Generator Attempt
 */
export async function generateGeminiImage(promptText) {
  if (!ai) return null;

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
    console.warn('⚠️ Direct Gemini Image Model rate-limited, executing fallback:', err.message);
  }
  return null;
}
