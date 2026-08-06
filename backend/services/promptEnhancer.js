import { GoogleGenAI } from "@google/genai";
import { buildPrompt } from '../prompts/masterPrompt.js';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Gemini Prompt Enhancer Service
 * Uses Gemini 3.6 Flash / Gemini 2.5 Pro to intelligently enhance the bouquet JSON into a 3D Disney/Pixar visual prompt.
 */
export async function enhancePromptWithGemini(bouquetJSON) {
  // Build modular base prompt first
  const basePrompt = buildPrompt(bouquetJSON);

  if (!ai) return basePrompt;

  const systemPrompt = `
You are an expert 3D Disney/Pixar Concept Artist and Master Florist Prompt Engineer.

Your task is to take the structured bouquet inputs and expand them into ONE premium, highly descriptive single-line visual prompt for 3D digital illustration.

Rules:
- Describe a complete wrapped standing bouquet.
- Include exact flower counts, greenery, Korean wrapping folds, and satin ribbon bow.
- Specify Disney/Pixar 3D animated style, soft painterly rendering, warm studio lighting, and dark luxury background.
- Do NOT invent extra flower types.
- Output ONLY the expanded prompt text without markdown, headers, or preamble.
`;

  const models = ["gemini-3.6-flash", "gemini-2.5-pro"];

  for (const model of models) {
    try {
      const res = await ai.models.generateContent({
        model,
        contents: `${systemPrompt}\n\nUser Selection JSON:\n${JSON.stringify(bouquetJSON, null, 2)}\n\nModular Base Prompt:\n${basePrompt}`
      });

      const text = res.text?.trim();
      if (text) {
        return text
          .replace(/^(Here is|Visual Description|Optimized Prompt).*?:/gmi, "")
          .replace(/\*\*|\*|>/g, "")
          .trim();
      }
    } catch (err) {
      console.warn(`⚠️ [Prompt Enhancer] ${model} error:`, err.message);
    }
  }

  return basePrompt;
}

export default enhancePromptWithGemini;
