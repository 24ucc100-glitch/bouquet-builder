export const FLORIST_PRESETS = [
  {
    id: 'reference_masterpiece',
    name: '💐 Reference Masterpiece',
    description: 'Exact recreation of your reference bouquet using extracted flower illustrations: Sunflowers, Pink Roses, Pink Lily, Cream Roses, Tulips, Carnations, Eucalyptus & Korean Wrap.',
    wrapId: 'korean_blush',
    ribbonColor: '#f472b6',
    ribbonWidth: 34,
    bowStyle: 'classic_double',
    cardMessage: 'For You ❤️',
    items: [
      { flowerId: 'eucalyptus_silver', x: 230, y: 110, scale: 1.1, rotation: -20, layerType: 'bg_greenery' },
      { flowerId: 'ruscus_glossy', x: 320, y: 100, scale: 1.1, rotation: -8, layerType: 'bg_greenery' },
      { flowerId: 'ruscus_glossy', x: 430, y: 110, scale: 1.1, rotation: 18, layerType: 'bg_greenery' },
      { flowerId: 'tulip_pink', x: 340, y: 140, scale: 1.05, rotation: -5, layerType: 'accent_flower' },
      { flowerId: 'tulip_pink', x: 410, y: 160, scale: 1.05, rotation: 10, layerType: 'accent_flower' },
      { flowerId: 'rose_cream', x: 290, y: 180, scale: 1.0, rotation: -12, layerType: 'main_flower' },
      { flowerId: 'rose_pink', x: 350, y: 220, scale: 1.25, rotation: 0, layerType: 'main_flower' },
      { flowerId: 'sunflower_golden', x: 260, y: 260, scale: 1.25, rotation: -8, layerType: 'main_flower' },
      { flowerId: 'lily_pink', x: 440, y: 240, scale: 1.2, rotation: 12, layerType: 'main_flower' },
      { flowerId: 'rose_cream', x: 390, y: 290, scale: 1.0, rotation: 5, layerType: 'main_flower' },
      { flowerId: 'carnation_pink', x: 320, y: 315, scale: 1.0, rotation: -6, layerType: 'main_flower' },
      { flowerId: 'carnation_pink', x: 450, y: 310, scale: 0.95, rotation: 14, layerType: 'main_flower' },
      { flowerId: 'babys_breath_cloud', x: 230, y: 210, scale: 1.0, rotation: -15, layerType: 'babys_breath' },
      { flowerId: 'babys_breath_cloud', x: 460, y: 200, scale: 1.0, rotation: 15, layerType: 'babys_breath' },
      { flowerId: 'fairy_lights_twinkle', x: 350, y: 230, scale: 1.1, rotation: 0, layerType: 'decor' }
    ]
  },
  {
    id: 'velvet_romance',
    name: 'Velvet Romance',
    description: 'Deep red roses, delicate baby\'s breath, and silver eucalyptus tied in luxury kraft wrap.',
    wrapId: 'kraft_brown',
    ribbonColor: '#e11d48',
    ribbonWidth: 32,
    bowStyle: 'classic_double',
    items: [
      { flowerId: 'eucalyptus_silver', x: 260, y: 150, scale: 1.1, rotation: -18, layerType: 'bg_greenery' },
      { flowerId: 'eucalyptus_silver', x: 440, y: 150, scale: 1.05, rotation: 16, layerType: 'bg_greenery' },
      { flowerId: 'babys_breath_cloud', x: 280, y: 200, scale: 1.0, rotation: -8, layerType: 'babys_breath' },
      { flowerId: 'babys_breath_cloud', x: 420, y: 195, scale: 1.0, rotation: 12, layerType: 'babys_breath' },
      { flowerId: 'rose_red', x: 350, y: 220, scale: 1.15, rotation: 2, layerType: 'main_flower' },
      { flowerId: 'rose_red', x: 300, y: 260, scale: 1.0, rotation: -12, layerType: 'main_flower' },
      { flowerId: 'rose_red', x: 400, y: 255, scale: 1.05, rotation: 10, layerType: 'main_flower' }
    ]
  }
];
