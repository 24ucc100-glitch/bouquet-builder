import floristPrompt from "./floristPrompt.js";
import negativePrompt from "./negativePrompt.js";

/**
 * Modular Master Prompt Builder
 */
export function buildPrompt(data) {
  return `
${floristPrompt(data)}

${negativePrompt()}
`.trim();
}

export default buildPrompt;
