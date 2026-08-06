import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Converts bouquet JSON into a concise visual prompt.
 */
export async function generateGeminiPrompt(bouquetJSON) {
  if (!ai) return "";

  const systemPrompt = `
You are a professional florist.

Convert the bouquet JSON into ONE concise image prompt.

Rules:
- Do not invent flowers.
- Do not change quantities.
- Describe only the bouquet.
- Mention wrapping paper, ribbon, and arrangement if provided.
- Output ONLY the prompt text.
`;

  const models = [
    "gemini-2.5-pro",
    "gemini-2.5-flash"
  ];

  for (const model of models) {
    try {
      const res = await ai.models.generateContent({
        model,
        contents: `${systemPrompt}

User Selection JSON:
${JSON.stringify(bouquetJSON, null, 2)}`
      });

      const text = res.text?.trim();

      if (text) {
        return text
          .replace(/^(Here is|Visual Description|Optimized Prompt).*?:/gmi, "")
          .replace(/\*\*|\*|>/g, "")
          .trim();
      }
    } catch (err) {
      console.warn(`⚠️ ${model} failed:`, err.message);
    }
  }

  return "";
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
    console.warn('⚠️ [Gemini 2.5 Flash Image] quota info:', err.message);
  }

  return null;
}
