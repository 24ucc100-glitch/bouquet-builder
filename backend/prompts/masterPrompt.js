import { DISNEY_STYLE_TOKENS } from './disneyPrompt.js';
import { NEGATIVE_TOKENS } from './negativePrompt.js';

/**
 * Master Prompt Builder
 */
export function buildMasterPrompt(basePrompt) {
  return `${basePrompt}. ${DISNEY_STYLE_TOKENS}. Avoid: ${NEGATIVE_TOKENS}.`;
}
