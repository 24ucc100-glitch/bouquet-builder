import { buildMasterPrompt } from '../prompts/masterPrompt.js';

/**
 * Prompt Enhancer Service
 */
export function enhancePrompt(basePrompt) {
  return buildMasterPrompt(basePrompt);
}
