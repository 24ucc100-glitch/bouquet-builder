/**
 * Ribbon Engine & Friendly Color Mapper
 */
export const RIBBON_COLORS = [
  { name: 'Satin Pink Ribbon', hex: '#f472b6' },
  { name: 'Velvet Crimson Ribbon', hex: '#f43f5e' },
  { name: 'Scarlet Red Ribbon', hex: '#e11d48' },
  { name: 'Burgundy Wine Ribbon', hex: '#991b1b' },
  { name: 'Hot Magenta Ribbon', hex: '#d946ef' },
  { name: 'Soft Peony Ribbon', hex: '#fb7185' },
  { name: 'Imperial Gold Ribbon', hex: '#eab308' },
  { name: 'Amber Sunburst Ribbon', hex: '#f59e0b' },
  { name: 'Tangerine Coral Ribbon', hex: '#f97316' },
  { name: 'Canary Yellow Ribbon', hex: '#fbbf24' },
  { name: 'Ocean Blue Ribbon', hex: '#3b82f6' },
  { name: 'Royal Violet Ribbon', hex: '#9333ea' },
  { name: 'Soft Lavender Ribbon', hex: '#8b5cf6' },
  { name: 'Plum Indigo Ribbon', hex: '#a855f7' },
  { name: 'Emerald Leaf Ribbon', hex: '#10b981' },
  { name: 'Snow White Ribbon', hex: '#ffffff' },
  { name: 'Midnight Black Ribbon', hex: '#0f172a' }
];

export function resolveRibbonName(colorHexOrName) {
  if (!colorHexOrName) return 'Satin Pink Ribbon';
  const found = RIBBON_COLORS.find(r => r.hex.toLowerCase() === colorHexOrName.toLowerCase() || r.name.toLowerCase() === colorHexOrName.toLowerCase());
  return found ? found.name : colorHexOrName;
}
