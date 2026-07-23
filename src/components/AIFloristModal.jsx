import React, { useState } from 'react';
import { FLOWERS_DATA } from '../data/flowersData';
import { Sparkles, Bot, Check, X, Gift } from 'lucide-react';

export const AI_OCCASIONS = [
  { id: 'birthday', name: '🎂 Birthday Celebration', primaryFlower: 'rose_pink', style: 'playful' },
  { id: 'anniversary', name: '💍 Anniversary Romance', primaryFlower: 'rose_red', style: 'romantic' },
  { id: 'wedding', name: '👰 Elegant Wedding', primaryFlower: 'lily_white', style: 'wedding' },
  { id: 'mothers_day', name: '🌸 Mother\'s Day Warmth', primaryFlower: 'peony_bloom', style: 'pastel' },
  { id: 'graduation', name: '🎓 Graduation Honor', primaryFlower: 'sunflower_golden', style: 'cheerful' },
  { id: 'valentines', name: '❤️ Valentine\'s Passion', primaryFlower: 'rose_red', style: 'romantic' },
  { id: 'thank_you', name: '💐 Heartfelt Thank You', primaryFlower: 'tulip_pink', style: 'pastel' },
  { id: 'congratulations', name: '🎉 Congratulations', primaryFlower: 'gerbera_coral', style: 'cheerful' },
  { id: 'apology', name: '🕊️ Gentle Apology', primaryFlower: 'rose_white', style: 'pure' },
  { id: 'friendship', name: '🌼 True Friendship', primaryFlower: 'daisy_charming', style: 'cheerful' }
];

export const AIFloristModal = ({ isOpen, onClose, onApplyAIBouquet }) => {
  const [selectedOccasion, setSelectedOccasion] = useState('birthday');
  const [budget, setBudget] = useState('medium'); // compact, medium, deluxe
  const [colorPref, setColorPref] = useState('romantic');

  if (!isOpen) return null;

  const handleGenerate = () => {
    const occ = AI_OCCASIONS.find(o => o.id === selectedOccasion) || AI_OCCASIONS[0];
    const itemCount = budget === 'compact' ? 6 : budget === 'medium' ? 9 : 14;

    // Filter candidate flowers based on occasion preference
    let candidates = FLOWERS_DATA.filter(f => f.category !== 'greenery' && f.category !== 'decor');
    if (colorPref === 'romantic') {
      candidates = candidates.filter(f => f.colors.includes('red') || f.colors.includes('pink') || f.colors.includes('white'));
    } else if (colorPref === 'sunshine') {
      candidates = candidates.filter(f => f.colors.includes('yellow') || f.colors.includes('orange') || f.colors.includes('gold'));
    }

    if (candidates.length === 0) candidates = FLOWERS_DATA;

    const generatedItems = [];
    const centerPoint = { x: 350, y: 240 };

    for (let i = 0; i < itemCount; i++) {
      const isMain = i < 3;
      const flower = isMain
        ? (candidates.find(f => f.id === occ.primaryFlower) || candidates[0])
        : candidates[Math.floor(Math.random() * candidates.length)];

      const radius = isMain ? Math.random() * 50 : 70 + (i * 14);
      const angle = (i * 137.5) * (Math.PI / 180);
      const x = Math.round(centerPoint.x + Math.cos(angle) * radius);
      const y = Math.round(centerPoint.y + Math.sin(angle) * (radius * 0.7));
      const rot = Math.round((Math.random() * 24) - 12);
      const scale = parseFloat((0.9 + Math.random() * 0.2).toFixed(2));

      generatedItems.push({
        id: `ai_${Date.now()}_${i}`,
        flowerId: flower.id,
        x,
        y,
        rotation: rot,
        scale,
        layerType: flower.layerType || 'main_flower'
      });
    }

    // Auto add greenery backdrop
    generatedItems.unshift(
      { id: `ai_g1`, flowerId: 'eucalyptus_silver', x: 250, y: 150, scale: 1.1, rotation: -18, layerType: 'bg_greenery' },
      { id: `ai_g2`, flowerId: 'eucalyptus_silver', x: 450, y: 150, scale: 1.1, rotation: 18, layerType: 'bg_greenery' }
    );

    // Auto add fairy lights or cute butterfly
    generatedItems.push({
      id: `ai_decor`,
      flowerId: 'fairy_lights_twinkle',
      x: 350,
      y: 240,
      scale: 1.0,
      rotation: 0,
      layerType: 'decor'
    });

    onApplyAIBouquet({
      items: generatedItems,
      wrapStyle: colorPref === 'romantic' ? 'korean_blush' : 'kraft_brown',
      ribbonColor: colorPref === 'romantic' ? '#e11d48' : '#fde047'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-amber-400/50 shadow-2xl relative space-y-5 bg-slate-950/90">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-300">
              <Bot className="w-6 h-6 animate-bounce" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              🤖 AI Master Florist Mode
            </h3>
            <p className="text-xs text-slate-400">Specify your occasion & preferences for an instant luxury arrangement</p>
          </div>
        </div>

        {/* Occasion Picker */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
            1. Select Gifting Occasion
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {AI_OCCASIONS.map(occ => (
              <button
                key={occ.id}
                onClick={() => setSelectedOccasion(occ.id)}
                className={`p-2.5 rounded-xl glass-card text-left text-xs transition-all border ${
                  selectedOccasion === occ.id
                    ? 'border-amber-400 bg-amber-400/20 text-amber-200 font-semibold'
                    : 'border-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                {occ.name}
              </button>
            ))}
          </div>
        </div>

        {/* Budget / Bouquet Volume */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
            2. Bouquet Size & Volume
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'compact', name: 'Petite (6 Blooms)' },
              { id: 'medium', name: 'Classic (9 Blooms)' },
              { id: 'deluxe', name: 'Deluxe (14 Blooms)' }
            ].map(b => (
              <button
                key={b.id}
                onClick={() => setBudget(b.id)}
                className={`p-2 rounded-xl glass-card text-xs text-center transition-all border ${
                  budget === b.id
                    ? 'border-amber-400 bg-amber-400/20 text-amber-200 font-semibold'
                    : 'border-white/5 text-slate-300'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-102 transition-transform"
        >
          <Sparkles className="w-5 h-5 text-slate-950 animate-spin" />
          <span>Generate Master Arrangement</span>
        </button>
      </div>
    </div>
  );
};
