export const FLOWER_CATEGORIES = [
  { id: 'all', name: 'All Illustrated Collection' },
  { id: 'roses', name: '🌹 Hand-Painted Roses' },
  { id: 'tulips', name: '🌷 Spring Tulips' },
  { id: 'blooms', name: '🌺 Peonies & Lilies' },
  { id: 'sunflowers', name: '🌻 Sunflowers & Daisies' },
  { id: 'wildflowers', name: '🌸 Cherry Blossoms & Orchids' },
  { id: 'greenery', name: '🍃 Lush Greenery' },
  { id: 'decor', name: '✨ Cute Accents & Lights' },
];

export const BLOOM_STAGES = [
  { id: 'full', name: 'Full Bloom' },
  { id: 'half', name: 'Half Open' },
  { id: 'bud', name: 'Gentle Bud' }
];

export const FLOWERS_DATA = [
  // ROSES FROM USER SPRITE SHEET
  {
    id: 'rose_red',
    name: 'Velvet Red Rose',
    category: 'roses',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/rose_red.png',
    defaultSize: 130,
    stemLength: 180,
    colors: ['red', 'crimson'],
    tags: ['romantic', 'classic', 'bold']
  },
  {
    id: 'rose_pink',
    name: 'Blush Pink Rose',
    category: 'roses',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/rose_pink.png',
    defaultSize: 125,
    stemLength: 175,
    colors: ['pink', 'blush'],
    tags: ['sweet', 'romantic', 'soft']
  },
  {
    id: 'rose_cream',
    name: 'Pristine Cream Rose',
    category: 'roses',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/rose_cream.png',
    defaultSize: 125,
    stemLength: 175,
    colors: ['white', 'cream', 'ivory'],
    tags: ['pure', 'wedding', 'elegant']
  },
  {
    id: 'rose_yellow',
    name: 'Sunny Yellow Rose',
    category: 'roses',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/rose_yellow.png',
    defaultSize: 125,
    stemLength: 175,
    colors: ['yellow', 'gold'],
    tags: ['cheerful', 'friendship']
  },
  {
    id: 'rose_purple',
    name: 'Royal Purple Rose',
    category: 'roses',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/rose_purple.png',
    defaultSize: 125,
    stemLength: 175,
    colors: ['purple', 'violet'],
    tags: ['royal', 'mystic']
  },
  {
    id: 'rose_blue',
    name: 'Enchanted Blue Rose',
    category: 'roses',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/rose_blue.png',
    defaultSize: 125,
    stemLength: 175,
    colors: ['blue', 'sapphire'],
    tags: ['magical', 'rare']
  },

  // TULIPS FROM USER SPRITE SHEET
  {
    id: 'tulip_pink',
    name: 'Graceful Pink Tulip',
    category: 'tulips',
    layerType: 'accent_flower',
    image: '/assets/extracted_flowers/tulip_pink.png',
    defaultSize: 110,
    stemLength: 195,
    colors: ['pink', 'rose'],
    tags: ['spring', 'delicate']
  },
  {
    id: 'tulip_yellow',
    name: 'Bright Yellow Tulip',
    category: 'tulips',
    layerType: 'accent_flower',
    image: '/assets/extracted_flowers/tulip_yellow.png',
    defaultSize: 110,
    stemLength: 195,
    colors: ['yellow'],
    tags: ['spring', 'happy']
  },
  {
    id: 'tulip_purple',
    name: 'Velvet Purple Tulip',
    category: 'tulips',
    layerType: 'accent_flower',
    image: '/assets/extracted_flowers/tulip_purple.png',
    defaultSize: 110,
    stemLength: 195,
    colors: ['purple'],
    tags: ['spring', 'royal']
  },
  {
    id: 'tulip_red',
    name: 'Ruby Red Tulip',
    category: 'tulips',
    layerType: 'accent_flower',
    image: '/assets/extracted_flowers/tulip_red.png',
    defaultSize: 110,
    stemLength: 195,
    colors: ['red'],
    tags: ['spring', 'bold']
  },

  // LILIES FROM USER SPRITE SHEET
  {
    id: 'lily_white',
    name: 'Imperial White Lily',
    category: 'blooms',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/lily_white.png',
    defaultSize: 140,
    stemLength: 190,
    colors: ['white', 'gold'],
    tags: ['pure', 'royal']
  },
  {
    id: 'lily_pink',
    name: 'Stargazer Pink Lily',
    category: 'blooms',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/lily_pink.png',
    defaultSize: 140,
    stemLength: 190,
    colors: ['pink', 'magenta'],
    tags: ['opulent', 'luxury']
  },

  // SUNFLOWER FROM USER SPRITE SHEET
  {
    id: 'sunflower_golden',
    name: 'Sunburst Sunflower',
    category: 'sunflowers',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/sunflower_golden.png',
    defaultSize: 155,
    stemLength: 200,
    colors: ['yellow', 'amber'],
    tags: ['cheerful', 'summer']
  },

  // PEONIES FROM USER SPRITE SHEET
  {
    id: 'peony_pink',
    name: 'Royal Fluffy Pink Peony',
    category: 'blooms',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/peony_pink.png',
    defaultSize: 145,
    stemLength: 185,
    colors: ['pink', 'magenta'],
    tags: ['lush', 'opulent']
  },
  {
    id: 'peony_cream',
    name: 'Cream Soft Peony',
    category: 'blooms',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/peony_cream.png',
    defaultSize: 145,
    stemLength: 185,
    colors: ['cream', 'white'],
    tags: ['soft', 'elegant']
  },

  // CARNATIONS FROM USER SPRITE SHEET
  {
    id: 'carnation_pink',
    name: 'Ruffled Pink Carnation',
    category: 'blooms',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/carnation_pink.png',
    defaultSize: 120,
    stemLength: 175,
    colors: ['pink'],
    tags: ['sweet', 'classic']
  },
  {
    id: 'carnation_red',
    name: 'Ruffled Red Carnation',
    category: 'blooms',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/carnation_red.png',
    defaultSize: 120,
    stemLength: 175,
    colors: ['red'],
    tags: ['bold', 'classic']
  },

  // HYDRANGEAS FROM USER SPRITE SHEET
  {
    id: 'hydrangea_blue',
    name: 'Cloud Blue Hydrangea',
    category: 'blooms',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/hydrangea_blue.png',
    defaultSize: 160,
    stemLength: 190,
    colors: ['blue', 'cyan'],
    tags: ['voluminous', 'dreamy']
  },
  {
    id: 'hydrangea_pink',
    name: 'Blush Pink Hydrangea',
    category: 'blooms',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/hydrangea_pink.png',
    defaultSize: 160,
    stemLength: 190,
    colors: ['pink'],
    tags: ['voluminous', 'sweet']
  },

  // GERBERA FROM USER SPRITE SHEET
  {
    id: 'gerbera_pink',
    name: 'Sunny Pink Gerbera',
    category: 'sunflowers',
    layerType: 'accent_flower',
    image: '/assets/extracted_flowers/gerbera_pink.png',
    defaultSize: 125,
    stemLength: 180,
    colors: ['pink', 'magenta'],
    tags: ['happy', 'bold']
  },

  // DAISY, LAVENDER, BABY'S BREATH FROM USER SPRITE SHEET
  {
    id: 'daisy_white',
    name: 'Charming Field Daisy',
    category: 'sunflowers',
    layerType: 'accent_flower',
    image: '/assets/extracted_flowers/daisy_white.png',
    defaultSize: 100,
    stemLength: 165,
    colors: ['white', 'yellow'],
    tags: ['playful', 'fresh']
  },
  {
    id: 'lavender_purple',
    name: 'French Lavender Stem',
    category: 'wildflowers',
    layerType: 'accent_flower',
    image: '/assets/extracted_flowers/lavender_purple.png',
    defaultSize: 95,
    stemLength: 210,
    colors: ['purple', 'lavender'],
    tags: ['aromatic', 'rustic']
  },
  {
    id: 'babys_breath_cloud',
    name: 'Cloud Baby\'s Breath',
    category: 'wildflowers',
    layerType: 'babys_breath',
    image: '/assets/extracted_flowers/babys_breath_cloud.png',
    defaultSize: 140,
    stemLength: 190,
    colors: ['white'],
    tags: ['ethereal', 'delicate']
  },
  {
    id: 'chrysanthemum_pink',
    name: 'Pink Chrysanthemum',
    category: 'sunflowers',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/chrysanthemum_pink.png',
    defaultSize: 135,
    stemLength: 180,
    colors: ['pink'],
    tags: ['lush', 'rich']
  },
  {
    id: 'orchid_purple',
    name: 'Imperial Purple Orchid',
    category: 'wildflowers',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/orchid_purple.png',
    defaultSize: 130,
    stemLength: 180,
    colors: ['purple', 'magenta'],
    tags: ['exotic', 'luxury']
  },
  {
    id: 'orchid_white',
    name: 'Pristine White Orchid',
    category: 'wildflowers',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/orchid_white.png',
    defaultSize: 130,
    stemLength: 180,
    colors: ['white', 'ivory'],
    tags: ['exotic', 'pure']
  },
  {
    id: 'ranunculus_pink',
    name: 'Swirl Pink Ranunculus',
    category: 'blooms',
    layerType: 'main_flower',
    image: '/assets/extracted_flowers/ranunculus_pink.png',
    defaultSize: 125,
    stemLength: 175,
    colors: ['pink'],
    tags: ['swirl', 'delicate']
  },

  // LUSH GREENERY ITEMS
  {
    id: 'eucalyptus_silver',
    name: 'Silver Dollar Eucalyptus',
    category: 'greenery',
    layerType: 'bg_greenery',
    renderType: 'cartoon_eucalyptus',
    primaryColor: '#86efac',
    secondaryColor: '#166534',
    defaultSize: 155,
    stemLength: 220,
    colors: ['sage', 'green'],
    tags: ['modern', 'chic']
  },
  {
    id: 'ruscus_glossy',
    name: 'Italian Ruscus Leaves',
    category: 'greenery',
    layerType: 'bg_greenery',
    renderType: 'cartoon_ruscus',
    primaryColor: '#22c55e',
    secondaryColor: '#14532d',
    defaultSize: 145,
    stemLength: 210,
    colors: ['emerald', 'green'],
    tags: ['lush', 'emerald']
  },
  {
    id: 'fern_feathery',
    name: 'Feathery Leaf Fern',
    category: 'greenery',
    layerType: 'bg_greenery',
    renderType: 'cartoon_fern',
    primaryColor: '#16a34a',
    secondaryColor: '#052e16',
    defaultSize: 165,
    stemLength: 225,
    colors: ['forest_green'],
    tags: ['textured', 'botanical']
  },

  // CUTE DECORATIONS & LIGHTS
  {
    id: 'fairy_lights_twinkle',
    name: 'Warm LED Fairy Lights',
    category: 'decor',
    layerType: 'decor',
    renderType: 'cartoon_fairy_lights',
    primaryColor: '#fde047',
    defaultSize: 220,
    colors: ['gold'],
    tags: ['glowing', 'magical']
  },
  {
    id: 'monarch_butterfly',
    name: 'Flittering Butterfly',
    category: 'decor',
    layerType: 'decor',
    renderType: 'cartoon_butterfly',
    primaryColor: '#fb923c',
    secondaryColor: '#1e1b4b',
    defaultSize: 65,
    colors: ['orange', 'gold'],
    tags: ['cute', 'nature']
  }
];
