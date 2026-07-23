// Procedural Ribbon Generator
// Generates ribbon vector geometry comprising Left Loop, Right Loop, Center Knot, Left Tail, and Right Tail

export function generateRibbonGeometry(colorHex = '#f472b6', width = 180, scale = 1.0) {
  const cx = 350; // Center X of bouquet tie
  const cy = 620; // Center Y of bouquet tie

  return {
    colorHex,
    cx,
    cy,
    scale,
    // 1. Left Loop
    leftLoop: {
      path: `M ${cx} ${cy} C ${cx - 60 * scale} ${cy - 40 * scale}, ${cx - 90 * scale} ${cy + 10 * scale}, ${cx} ${cy}`,
      fill: colorHex,
      highlight: '#ffffff',
      shadow: 'rgba(0,0,0,0.3)'
    },
    // 2. Right Loop
    rightLoop: {
      path: `M ${cx} ${cy} C ${cx + 60 * scale} ${cy - 40 * scale}, ${cx + 90 * scale} ${cy + 10 * scale}, ${cx} ${cy}`,
      fill: colorHex,
      highlight: '#ffffff',
      shadow: 'rgba(0,0,0,0.3)'
    },
    // 3. Center Knot
    centerKnot: {
      cx: cx,
      cy: cy,
      rx: 16 * scale,
      ry: 12 * scale,
      fill: colorHex,
      highlight: '#ffffff'
    },
    // 4. Left Tail
    leftTail: {
      path: `M ${cx - 5} ${cy + 5} C ${cx - 30 * scale} ${cy + 50 * scale}, ${cx - 50 * scale} ${cy + 90 * scale}, ${cx - 45 * scale} ${cy + 110 * scale} L ${cx - 25 * scale} ${cy + 95 * scale} Z`,
      fill: colorHex
    },
    // 5. Right Tail
    rightTail: {
      path: `M ${cx + 5} ${cy + 5} C ${cx + 30 * scale} ${cy + 50 * scale}, ${cx + 50 * scale} ${cy + 90 * scale}, ${cx + 45 * scale} ${cy + 110 * scale} L ${cx + 25 * scale} ${cy + 95 * scale} Z`,
      fill: colorHex
    }
  };
}
