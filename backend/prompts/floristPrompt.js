/**
 * Florist Composition Prompt Component
 * Handles exact flower counts, greenery, wrapping paper, and ribbon.
 */
export function floristPrompt(data = {}) {
  const flowerText = Array.isArray(data.flowers)
    ? data.flowers.map(f => typeof f === 'object' ? `${f.count} ${f.type}` : f).join(', ')
    : data.flowers || '6 Velvet Red Roses, 3 White Lilies';

  const greeneryText = Array.isArray(data.greenery) ? data.greenery.join(', ') : data.greenery || 'Eucalyptus, Fern';

  return `
Create exactly ONE complete wrapped florist bouquet.

Flower composition:
${flowerText}

Greenery:
${greeneryText}

Wrapping:
${data.wrapping || data.wrap || 'Luxury Korean Pink Wrap'}

Ribbon:
${data.ribbon || 'Satin Pink Ribbon'}

Preserve exact flower counts.
Professional florist dome.
Hidden stems.
Dense bouquet.
Natural overlap.
`.trim();
}

export default floristPrompt;
