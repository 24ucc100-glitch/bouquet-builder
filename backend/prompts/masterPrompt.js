import floristPrompt from "./floristPrompt.js";
import stylePrompt from "./stylePrompt.js";
import cameraPrompt from "./cameraPrompt.js";
import negativePrompt from "./negativePrompt.js";

/**
 * Modular Master Prompt Builder
 * Combines florist composition, Disney/Pixar style, camera framing, and negative prompt.
 */
export function buildPrompt(data) {
  return `
${floristPrompt(data)}

${stylePrompt()}

${cameraPrompt()}

${negativePrompt()}
`.trim();
}

export default buildPrompt;
