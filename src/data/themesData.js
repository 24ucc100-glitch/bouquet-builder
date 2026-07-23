export const FLORIST_THEMES = [
  {
    id: 'romantic',
    name: '🌹 Romantic Red',
    description: 'Classic velvet red roses, baby\'s breath, and gold satin ribbon in luxury matte black wrap.',
    wrapId: 'matte_black',
    bgId: 'romantic_pink',
    ribbonColor: '#e11d48',
    ribbonStyle: 'satin',
    items: [
      { flowerId: 'eucalyptus_silver', x: 250, y: 150, scale: 1.1, rotation: -18, layerType: 'bg_greenery' },
      { flowerId: 'eucalyptus_silver', x: 450, y: 150, scale: 1.1, rotation: 18, layerType: 'bg_greenery' },
      { flowerId: 'rose_red', x: 350, y: 220, scale: 1.2, rotation: 0, layerType: 'main_flower' },
      { flowerId: 'rose_red', x: 290, y: 270, scale: 1.05, rotation: -12, layerType: 'main_flower' },
      { flowerId: 'rose_red', x: 410, y: 270, scale: 1.05, rotation: 14, layerType: 'main_flower' },
      { flowerId: 'babys_breath_cloud', x: 350, y: 175, scale: 1.0, rotation: 0, layerType: 'babys_breath' },
      { flowerId: 'fairy_lights_twinkle', x: 350, y: 250, scale: 1.0, rotation: 0, layerType: 'decor' }
    ]
  },
  {
    id: 'summer',
    name: '🌻 Summer Sunshine',
    description: 'Golden sunflowers, field daisies, and lush ferns tied in natural kraft paper.',
    wrapId: 'kraft_brown',
    bgId: 'sunset',
    ribbonColor: '#fde047',
    ribbonStyle: 'silk',
    items: [
      { flowerId: 'fern_feathery', x: 240, y: 140, scale: 1.15, rotation: -22, layerType: 'bg_greenery' },
      { flowerId: 'fern_feathery', x: 460, y: 140, scale: 1.15, rotation: 22, layerType: 'bg_greenery' },
      { flowerId: 'sunflower_golden', x: 350, y: 210, scale: 1.25, rotation: 0, layerType: 'main_flower' },
      { flowerId: 'daisy_charming', x: 280, y: 270, scale: 1.0, rotation: -10, layerType: 'accent_flower' },
      { flowerId: 'daisy_charming', x: 420, y: 270, scale: 1.0, rotation: 12, layerType: 'accent_flower' },
      { flowerId: 'honey_bee', x: 390, y: 170, scale: 1.0, rotation: 0, layerType: 'decor' }
    ]
  },
  {
    id: 'pastel',
    name: '🌸 Pastel Dream',
    description: 'Soft pink tulips, blush roses, and cherry blossoms in Korean wrap.',
    wrapId: 'korean_blush',
    bgId: 'soft_gradient',
    ribbonColor: '#f472b6',
    ribbonStyle: 'satin',
    items: [
      { flowerId: 'eucalyptus_silver', x: 250, y: 160, scale: 1.1, rotation: -15, layerType: 'bg_greenery' },
      { flowerId: 'eucalyptus_silver', x: 450, y: 160, scale: 1.1, rotation: 15, layerType: 'bg_greenery' },
      { flowerId: 'rose_pink', x: 350, y: 220, scale: 1.15, rotation: 0, layerType: 'main_flower' },
      { flowerId: 'tulip_pink', x: 290, y: 260, scale: 1.05, rotation: -10, layerType: 'accent_flower' },
      { flowerId: 'cherry_blossom', x: 410, y: 250, scale: 1.05, rotation: 12, layerType: 'accent_flower' }
    ]
  },
  {
    id: 'wedding',
    name: '🤍 Wedding Pure White',
    description: 'Pristine white lilies, white roses, pearls, and frosted cellophane.',
    wrapId: 'transparent_frosted',
    bgId: 'elegant_cream',
    ribbonColor: '#ffffff',
    ribbonStyle: 'lace',
    items: [
      { flowerId: 'lily_white', x: 350, y: 200, scale: 1.25, rotation: 0, layerType: 'main_flower' },
      { flowerId: 'rose_white', x: 285, y: 260, scale: 1.05, rotation: -10, layerType: 'main_flower' },
      { flowerId: 'rose_white', x: 415, y: 260, scale: 1.05, rotation: 10, layerType: 'main_flower' },
      { flowerId: 'pearl_garland', x: 350, y: 230, scale: 1.1, rotation: 0, layerType: 'decor' }
    ]
  },
  {
    id: 'valentines',
    name: '❤️ Valentine\'s Sparkle',
    description: 'Deep red roses, hearts, and fairy lights wrapped in Korean blush pink.',
    wrapId: 'korean_blush',
    bgId: 'romantic_pink',
    ribbonColor: '#e11d48',
    ribbonStyle: 'velvet',
    items: [
      { flowerId: 'rose_red', x: 350, y: 210, scale: 1.2, rotation: 0, layerType: 'main_flower' },
      { flowerId: 'rose_red', x: 290, y: 270, scale: 1.1, rotation: -12, layerType: 'main_flower' },
      { flowerId: 'rose_red', x: 410, y: 270, scale: 1.1, rotation: 12, layerType: 'main_flower' },
      { flowerId: 'fairy_lights_twinkle', x: 350, y: 240, scale: 1.0, rotation: 0, layerType: 'decor' },
      { flowerId: 'monarch_butterfly', x: 390, y: 170, scale: 1.0, rotation: -15, layerType: 'decor' }
    ]
  }
];
