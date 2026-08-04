/**
 * Wrap Engine & Styles
 */
export const WRAP_STYLES = {
  KOREAN_PINK: { id: 'korean_pink', name: 'Luxury Korean Blush Wrap' },
  LUXURY_WHITE: { id: 'luxury_white', name: 'Luxury Snow White Wrap' },
  LUXURY_BLACK: { id: 'luxury_black', name: 'Luxury Matte Black Wrap' },
  TRANSPARENT: { id: 'transparent', name: 'Crystal Clear Sheer Wrap' },
  MESH: { id: 'mesh', name: 'Golden Mesh Netting Wrap' },
  KRAFT: { id: 'kraft', name: 'Eco Kraft Paper Wrap' },
  PASTEL: { id: 'pastel', name: 'Pastel Lilac Korean Wrap' },
  VELVET: { id: 'velvet', name: 'Royal Velvet Burgundy Wrap' }
};

export function resolveWrapName(wrapIdOrName) {
  if (!wrapIdOrName) return 'Luxury Korean Pink Wrap';
  const upper = wrapIdOrName.toUpperCase();
  if (WRAP_STYLES[upper]) return WRAP_STYLES[upper].name;
  
  const found = Object.values(WRAP_STYLES).find(w => w.id === wrapIdOrName || w.name.toLowerCase() === wrapIdOrName.toLowerCase());
  return found ? found.name : wrapIdOrName;
}
