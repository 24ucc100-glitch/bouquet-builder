/**
 * Simplified Florist Prompt Component
 */
export function floristPrompt(data = {}) {
  const flowerText = Array.isArray(data.flowers)
    ? data.flowers.map(f => typeof f === 'object' ? `${f.count} ${f.type}` : f).join(', ')
    : data.flowers || '6 Velvet Red Roses and 3 White Lilies';

  const greeneryText = Array.isArray(data.greenery) ? data.greenery.join(', ') : data.greenery || 'Eucalyptus foliage';

  return `A 3D Disney Pixar digital illustration of a luxury wrapped standing bouquet. Centerpiece of ${flowerText}, arranged with ${greeneryText}, wrapped in ${data.wrapping || data.wrap || 'Luxury Korean Pink Wrap'} paper with elegant folds, tied with a large silky ${data.ribbon || 'Satin Pink Ribbon'} bow.`;
}

export default floristPrompt;
