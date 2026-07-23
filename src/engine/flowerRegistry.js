// Master Registry of 14 Supported Flower Types with colors, categories, sizes, and vector graphics definition

export const FLOWER_TYPES = {
  ROSES: {
    id: 'roses',
    name: 'Luxury Roses',
    category: 'large', // 'large' | 'medium' | 'filler'
    baseSize: 72,
    defaultColor: '#e11d48',
    colors: [
      { id: 'crimson', name: 'Velvet Red', hex: '#e11d48' },
      { id: 'blush', name: 'Blush Pink', hex: '#f472b6' },
      { id: 'pure_white', name: 'Pure White', hex: '#ffffff' },
      { id: 'sunburst', name: 'Golden Sunburst', hex: '#f59e0b' },
      { id: 'royal_violet', name: 'Royal Violet', hex: '#9333ea' },
      { id: 'coral', name: 'Coral Sunrise', hex: '#fb923c' }
    ]
  },
  SUNFLOWERS: {
    id: 'sunflowers',
    name: 'Golden Sunflowers',
    category: 'large',
    baseSize: 84,
    defaultColor: '#eab308',
    colors: [
      { id: 'golden', name: 'Golden Yellow', hex: '#eab308' },
      { id: 'amber', name: 'Amber Sunset', hex: '#f59e0b' }
    ]
  },
  LILIES: {
    id: 'lilies',
    name: 'Stargazer Lilies',
    category: 'large',
    baseSize: 80,
    defaultColor: '#ec4899',
    colors: [
      { id: 'stargazer', name: 'Stargazer Pink', hex: '#ec4899' },
      { id: 'white_lily', name: 'Imperial White', hex: '#ffffff' },
      { id: 'canary', name: 'Canary Yellow', hex: '#fbbf24' }
    ]
  },
  PEONIES: {
    id: 'peonies',
    name: 'Royal Peonies',
    category: 'large',
    baseSize: 78,
    defaultColor: '#fb7185',
    colors: [
      { id: 'peony_pink', name: 'Soft Peony Pink', hex: '#fb7185' },
      { id: 'magenta', name: 'Royal Magenta', hex: '#d946ef' },
      { id: 'white_peony', name: 'Snow Peony', hex: '#ffffff' }
    ]
  },
  HYDRANGEAS: {
    id: 'hydrangeas',
    name: 'French Hydrangeas',
    category: 'large',
    baseSize: 86,
    defaultColor: '#3b82f6',
    colors: [
      { id: 'ocean_blue', name: 'Ocean Sapphire', hex: '#3b82f6' },
      { id: 'lavender_hydrangea', name: 'Soft Lavender', hex: '#8b5cf6' },
      { id: 'pink_hydrangea', name: 'Blush Pink', hex: '#ec4899' }
    ]
  },
  TULIPS: {
    id: 'tulips',
    name: 'Dutch Tulips',
    category: 'medium',
    baseSize: 58,
    defaultColor: '#f43f5e',
    colors: [
      { id: 'crimson_tulip', name: 'Velvet Crimson', hex: '#f43f5e' },
      { id: 'yellow_tulip', name: 'Sunny Yellow', hex: '#fbbf24' },
      { id: 'purple_tulip', name: 'Royal Violet', hex: '#c084fc' },
      { id: 'white_tulip', name: 'Pure White', hex: '#ffffff' }
    ]
  },
  CARNATIONS: {
    id: 'carnations',
    name: 'Ruffled Carnations',
    category: 'medium',
    baseSize: 56,
    defaultColor: '#ec4899',
    colors: [
      { id: 'pink_carnation', name: 'Sweet Pink', hex: '#ec4899' },
      { id: 'red_carnation', name: 'Scarlet Red', hex: '#e11d48' },
      { id: 'violet_carnation', name: 'Plum Violet', hex: '#a855f7' }
    ]
  },
  GERBERAS: {
    id: 'gerberas',
    name: 'Bright Gerberas',
    category: 'medium',
    baseSize: 62,
    defaultColor: '#f97316',
    colors: [
      { id: 'orange_gerbera', name: 'Tangerine', hex: '#f97316' },
      { id: 'pink_gerbera', name: 'Hot Pink', hex: '#ec4899' },
      { id: 'yellow_gerbera', name: 'Bright Yellow', hex: '#eab308' }
    ]
  },
  ORCHIDS: {
    id: 'orchids',
    name: 'Phalaenopsis Orchids',
    category: 'medium',
    baseSize: 60,
    defaultColor: '#d946ef',
    colors: [
      { id: 'orchid_magenta', name: 'Mystic Magenta', hex: '#d946ef' },
      { id: 'orchid_white', name: 'Pure White', hex: '#ffffff' },
      { id: 'orchid_pink', name: 'Pastel Pink', hex: '#f472b6' }
    ]
  },
  RANUNCULUS: {
    id: 'ranunculus',
    name: 'Buttercup Ranunculus',
    category: 'medium',
    baseSize: 54,
    defaultColor: '#f43f5e',
    colors: [
      { id: 'rose_ranunculus', name: 'Deep Rose', hex: '#f43f5e' },
      { id: 'coral_ranunculus', name: 'Sunset Coral', hex: '#f97316' },
      { id: 'cream_ranunculus', name: 'Cream White', hex: '#fef08a' }
    ]
  },
  CHRYSANTHEMUMS: {
    id: 'chrysanthemums',
    name: 'Golden Chrysanthemums',
    category: 'medium',
    baseSize: 58,
    defaultColor: '#eab308',
    colors: [
      { id: 'gold_mums', name: 'Imperial Gold', hex: '#eab308' },
      { id: 'burgundy_mums', name: 'Burgundy Red', hex: '#991b1b' },
      { id: 'white_mums', name: 'Snow White', hex: '#ffffff' }
    ]
  },
  DAISIES: {
    id: 'daisies',
    name: 'Charming Daisies',
    category: 'medium',
    baseSize: 48,
    defaultColor: '#ffffff',
    colors: [
      { id: 'white_daisy', name: 'Classic White', hex: '#ffffff' },
      { id: 'pink_daisy', name: 'Blush Daisy', hex: '#f472b6' }
    ]
  },
  BABYS_BREATH: {
    id: 'babys_breath',
    name: "Baby's Breath",
    category: 'filler',
    baseSize: 42,
    defaultColor: '#ffffff',
    colors: [
      { id: 'white_filler', name: 'Snow White', hex: '#ffffff' },
      { id: 'cream_filler', name: 'Warm Yellow Tint', hex: '#fef08a' },
      { id: 'pink_filler', name: 'Blush Tint', hex: '#fbcfe8' }
    ]
  },
  LAVENDER: {
    id: 'lavender',
    name: 'French Lavender',
    category: 'filler',
    baseSize: 46,
    defaultColor: '#a855f7',
    colors: [
      { id: 'purple_lavender', name: 'Provence Violet', hex: '#a855f7' },
      { id: 'deep_lavender', name: 'Deep Indigo', hex: '#6366f1' }
    ]
  }
};
