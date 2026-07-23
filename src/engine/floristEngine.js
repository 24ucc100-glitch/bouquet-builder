import { FLOWER_TYPES } from './flowerRegistry';
import { GREENERY_TYPES } from './greeneryRegistry';

/**
 * Professional Florist Arrangement Algorithm
 * Calculates exact spatial layout (x, y, rotation, scale, zIndex, shadow)
 * following professional florist principles for a balanced dome-shaped bouquet.
 */
export function calculateFloristLayout(flowerSelections = {}, greenerySelections = {}) {
  const elements = [];
  const centerX = 350;
  const centerY = 340;

  // 1. PLACE GREENERY & FOLIAGE (BACKGROUND / OUTER FRAME LAYER)
  const activeGreenery = Object.entries(greenerySelections)
    .filter(([_, enabled]) => enabled)
    .map(([id]) => GREENERY_TYPES[id.toUpperCase()] || GREENERY_TYPES.EUCALYPTUS);

  if (activeGreenery.length > 0) {
    const totalFoliageCount = activeGreenery.length * 4;
    for (let i = 0; i < totalFoliageCount; i++) {
      const gType = activeGreenery[i % activeGreenery.length];
      const angle = (i / totalFoliageCount) * Math.PI * 1.6 - Math.PI * 0.8; // Fan arc around top
      const radius = 170 + (i % 3) * 20;

      const gx = centerX + Math.sin(angle) * radius;
      const gy = centerY - Math.cos(angle) * (radius * 0.75);
      const rot = (angle * 180) / Math.PI + (i % 2 === 0 ? 15 : -15);

      elements.push({
        id: `greenery_${gType.id}_${i}`,
        kind: 'greenery',
        typeId: gType.id,
        name: gType.name,
        colorHex: gType.colorHex,
        accentHex: gType.accentHex,
        leafShape: gType.leafShape,
        x: gx,
        y: gy,
        rotation: rot,
        scale: gType.defaultScale * (0.85 + (i % 3) * 0.1),
        zIndex: 10 + i, // Behind flowers
        shadow: 'rgba(0,0,0,0.25)'
      });
    }
  }

  // 2. CATEGORIZE USER SELECTED FLOWERS
  const largeFlowers = [];
  const mediumFlowers = [];
  const fillerFlowers = [];

  Object.entries(flowerSelections).forEach(([flowerId, selectionData]) => {
    const count = typeof selectionData === 'number' ? selectionData : selectionData.count || 0;
    const colorHex = selectionData.colorHex || FLOWER_TYPES[flowerId.toUpperCase()]?.defaultColor || '#e11d48';

    if (count > 0) {
      const typeConfig = FLOWER_TYPES[flowerId.toUpperCase()];
      if (!typeConfig) return;

      for (let c = 0; c < count; c++) {
        const item = {
          flowerId,
          typeConfig,
          colorHex,
          index: c
        };
        if (typeConfig.category === 'large') largeFlowers.push(item);
        else if (typeConfig.category === 'medium') mediumFlowers.push(item);
        else fillerFlowers.push(item);
      }
    }
  });

  let zCounter = 100;

  // 3. PLACE LARGE FLOWERS IN CENTER & INNER DOME
  largeFlowers.forEach((item, idx) => {
    const total = largeFlowers.length;
    let lx = centerX;
    let ly = centerY;
    let rot = (idx % 2 === 0 ? 1 : -1) * (5 + idx * 7);

    if (total === 1) {
      lx = centerX;
      ly = centerY;
    } else {
      const angle = (idx / total) * Math.PI * 2;
      const r = 45 + (idx % 2) * 15;
      lx = centerX + Math.cos(angle) * r;
      ly = centerY + Math.sin(angle) * (r * 0.8);
    }

    elements.push({
      id: `flower_large_${item.flowerId}_${idx}`,
      kind: 'flower',
      category: 'large',
      flowerId: item.flowerId,
      name: item.typeConfig.name,
      baseSize: item.typeConfig.baseSize,
      colorHex: item.colorHex,
      x: lx,
      y: ly,
      rotation: rot,
      scale: 1.0 + (idx % 3) * 0.05,
      zIndex: zCounter++,
      shadow: '0 12px 24px rgba(0,0,0,0.35)'
    });
  });

  // 4. PLACE MEDIUM FLOWERS AROUND CENTER IN A BALANCED DOME ARC
  mediumFlowers.forEach((item, idx) => {
    const total = mediumFlowers.length;
    const angle = (idx / Math.max(1, total)) * Math.PI * 1.7 - Math.PI * 0.85;
    const r = 110 + (idx % 3) * 20;

    const mx = centerX + Math.sin(angle) * r;
    const my = centerY - Math.cos(angle) * (r * 0.7);
    const rot = (angle * 180) / Math.PI * 0.4;

    elements.push({
      id: `flower_medium_${item.flowerId}_${idx}`,
      kind: 'flower',
      category: 'medium',
      flowerId: item.flowerId,
      name: item.typeConfig.name,
      baseSize: item.typeConfig.baseSize,
      colorHex: item.colorHex,
      x: mx,
      y: my,
      rotation: rot,
      scale: 0.95 + (idx % 2) * 0.08,
      zIndex: zCounter++,
      shadow: '0 8px 18px rgba(0,0,0,0.3)'
    });
  });

  // 5. PLACE FILLER FLOWERS IN GAPS BETWEEN FLOWERS
  fillerFlowers.forEach((item, idx) => {
    const total = fillerFlowers.length;
    const angle = (idx / Math.max(1, total)) * Math.PI * 2;
    const r = 70 + (idx % 4) * 30;

    const fx = centerX + Math.cos(angle) * r;
    const fy = centerY + Math.sin(angle) * (r * 0.75);

    elements.push({
      id: `flower_filler_${item.flowerId}_${idx}`,
      kind: 'flower',
      category: 'filler',
      flowerId: item.flowerId,
      name: item.typeConfig.name,
      baseSize: item.typeConfig.baseSize,
      colorHex: item.colorHex,
      x: fx,
      y: fy,
      rotation: idx * 25,
      scale: 0.85 + (idx % 2) * 0.1,
      zIndex: zCounter++,
      shadow: '0 4px 10px rgba(0,0,0,0.2)'
    });
  });

  return elements;
}
