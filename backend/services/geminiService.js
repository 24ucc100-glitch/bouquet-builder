import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Converts bouquet JSON into a concise visual prompt using Gemini 3.6 Flash.
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
    "gemini-3.6-flash",
    "gemini-2.5-pro"
  ];

  for (const model of models) {
    try {
      const res = await ai.models.generateContent({
        model,
        contents: `${systemPrompt}\n\nUser Selection JSON:\n${JSON.stringify(bouquetJSON, null, 2)}`
      });

      const text = res.text?.trim();

      if (text) {
        return text
          .replace(/^(Here is|Visual Description|Optimized Prompt).*?:/gmi, "")
          .replace(/\*\*|\*|>/g, "")
          .trim();
      }
    } catch (err) {
      console.warn(`⚠️ [Gemini Service] ${model} prompt error:`, err.message);
    }
  }

  return "";
}

/**
 * Direct Gemini Native Image Generator
 */
export async function generateGeminiImage(promptText) {
  if (!ai) return null;

  const imageModels = [
    "gemini-3.1-flash-image",
    "gemini-2.5-flash-image"
  ];

  for (const model of imageModels) {
    try {
      const res = await ai.models.generateContent({
        model,
        contents: promptText,
      });

      if (res && res.candidates?.[0]?.content?.parts) {
        const part = res.candidates[0].content.parts.find(p => p.inlineData);
        if (part) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    } catch (err) {
      console.warn(`⚠️ [Gemini Image] ${model} error:`, err.message);
    }
  }

  return null;
}
