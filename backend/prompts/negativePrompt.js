/**
 * Negative Prompt Component
 * Concise exclusion rules.
 */
export function negativePrompt() {
  return `
Do not generate:
single flower
macro shot
vase
basket
cropped bouquet
flower field
text
logo
watermark.
`.trim();
}

export default negativePrompt;
