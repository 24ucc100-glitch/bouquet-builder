import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * AI #1: Gemini Prompt Service
 * Converts structured bouquet JSON into a concise visual prompt.
 */
export async function generateGeminiPrompt(bouquetJSON) {
  if (!ai) return '';

  const systemPrompt = `You are a professional florist.
Your ONLY task is to convert bouquet JSON into one concise visual prompt describing a complete wrapped bouquet.
Do not invent flowers.
Do not change counts.
Do not add extra decorations.
Output ONLY raw prompt text without preamble or markdown formatting.`;

  // 1. Try Gemini 2.5 Pro Model
  try {
    const proRes = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: `${systemPrompt}\n\nUser Selection JSON:\n${JSON.stringify(bouquetJSON, null, 2)}`,
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
      contents: `${systemPrompt}\n\nUser Selection JSON:\n${JSON.stringify(bouquetJSON, null, 2)}`,
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
