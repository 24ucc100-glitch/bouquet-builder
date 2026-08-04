import { resolveWrapName } from './wrapEngine.js';
import { resolveRibbonName } from './ribbonEngine.js';

/**
 * Florist Layout Engine
 * Generates the Final Bouquet Description Object required by the AI Studio Pipeline.
 */
export function buildFinalBouquetDescription(validatedPayload = {}) {
  const {
    flowers = [],
    leaves = [],
    wrap = 'Luxury Korean Pink Wrap',
    ribbon = 'Satin Pink Ribbon',
    card = 'Happy Birthday Sneha ❤️',
    decorations = ['Floating Sparkles']
  } = validatedPayload;

  const resolvedWrap = resolveWrapName(wrap);
  const resolvedRibbon = resolveRibbonName(ribbon);

  const mainFlowers = flowers.filter(f => !f.toLowerCase().includes("baby's breath") && !f.toLowerCase().includes("lavender"));
  const fillers = flowers.filter(f => f.toLowerCase().includes("baby's breath") || f.toLowerCase().includes("lavender"));

  return {
    mainFlowers: mainFlowers.length ? mainFlowers : ['6 Velvet Red Roses', '3 White Lilies'],
    fillers: fillers.length ? fillers : ["Baby's Breath fillers"],
    greenery: leaves.length ? leaves : ['Eucalyptus', 'Fern'],
    wrapping: resolvedWrap,
    ribbon: resolvedRibbon,
    decorations: decorations,
    greetingCard: card,
    bouquetShape: 'Balanced Florist Dome Composition',
    bouquetDensity: 'Lush, Full & Voluminous',
    floristLayout: 'Hand-tied Spiral Dome Arrangement',
    colorPalette: 'Harmonious Luxury Florist Palette'
  };
}
