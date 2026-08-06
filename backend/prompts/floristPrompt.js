/**
 * Florist Composition Prompt Component
 * Handles exact flower composition, framing, greenery, wrap, ribbon, and style specifications.
 */
export function floristPrompt(data = {}) {
  const flowerText = Array.isArray(data.flowers)
    ? data.flowers.map(f => typeof f === 'object' ? `${f.count} ${f.type}` : f).join(', ')
    : data.flowers || '6 Velvet Red Roses, 3 White Lilies';

  const greeneryText = Array.isArray(data.greenery) ? data.greenery.join(', ') : data.greenery || 'Eucalyptus, Fern';

  return `
Create exactly ONE complete wrapped florist bouquet.

This is NOT a single flower.

This is NOT a close-up.

The bouquet fills approximately 80% of the image.

The entire bouquet is visible from top to bottom.

Flower composition:
${flowerText}

Greenery:
${greeneryText}

Wrapping:
${data.wrapping || data.wrap || 'Luxury Korean Pink Wrap'}

Ribbon:
${data.ribbon || 'Satin Pink Ribbon'}

Preserve every flower exactly.

Do not add flowers.

Do not remove flowers.

Arrange the bouquet into a professional florist dome.

Large flowers in the center.

Medium flowers around them.

Fillers between flowers.

Greenery behind flowers.

Hide all stems.

Wrap the bouquet using elegant Korean florist wrapping paper with layered folds.

Tie a large satin ribbon around the stems.

Attach a small cream greeting card.

Background:
Dark luxury florist studio.

Style:
Premium Disney/Pixar 3D illustration.

Luxury greeting card artwork.

Professional florist advertisement.

Warm cinematic lighting.

Soft shadows.

Ultra detailed.
`.trim();
}

export default floristPrompt;
