import floristPrompt from "./floristPrompt.js";
import stylePrompt from "./stylePrompt.js";
import negativePrompt from "./negativePrompt.js";

/**
 * Simplified Master Prompt Builder
 * Combines florist composition, Disney/Pixar style, and negative exclusions into a clean single-line string.
 */
export function buildPrompt(data) {
  return `${floristPrompt(data)} ${stylePrompt()} ${negativePrompt()}`;
}

export default buildPrompt;
