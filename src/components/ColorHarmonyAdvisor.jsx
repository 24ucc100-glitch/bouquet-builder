import React from 'react';
import { FLOWERS_DATA } from '../data/flowersData';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { FlowerGraphicRenderer } from './FlowerGraphicRenderer';

export const ColorHarmonyAdvisor = ({ items = [], onAddFlower }) => {
  if (items.length === 0) return null;

  // Extract all colors from placed flowers
  const presentColors = new Set();
  items.forEach(item => {
    const flowerDef = FLOWERS_DATA.find(f => f.id === item.flowerId);
    if (flowerDef && flowerDef.colors) {
      flowerDef.colors.forEach(c => presentColors.add(c));
    }
  });

  // Calculate harmony state
  let harmonyTitle = 'Harmonious Florist Mix';
  let harmonyDesc = 'Balanced color temperature and texture blend.';
  let score = 92;

  if (presentColors.has('red') || presentColors.has('crimson')) {
    harmonyTitle = 'Velvet Romance Palette';
    harmonyDesc = 'Rich deep reds paired with organic greenery and white accent filler.';
    score = 96;
  } else if (presentColors.has('yellow') || presentColors.has('gold')) {
    harmonyTitle = 'Warm Golden Harvest';
    harmonyDesc = 'Vibrant warm tones evoking summer sunshine and field flowers.';
    score = 94;
  } else if (presentColors.has('pink') || presentColors.has('blush')) {
    harmonyTitle = 'Pastel Blossom Symphony';
    harmonyDesc = 'Soft feminine pastels with delicate petal transitions.';
    score = 98;
  } else if (presentColors.has('white') && presentColors.has('sage')) {
    harmonyTitle = 'Imperial Botanical Pure';
    harmonyDesc = 'Clean minimalist elegance with fresh leaves and pristine petals.';
    score = 97;
  }

  // Find 2 recommended flowers that complement current colors
  const recommended = FLOWERS_DATA.filter(flower => {
    // Exclude if item count is large or already present 3+ times
    const count = items.filter(i => i.flowerId === flower.id).length;
    return count === 0;
  }).slice(0, 3);

  return (
    <div className="mx-auto w-[700px] mb-4 glass-panel p-3.5 rounded-2xl flex items-center justify-between border border-amber-400/30 bg-amber-500/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-amber-200">{harmonyTitle}</h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold">
              {score}% Florist Harmony
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">{harmonyDesc}</p>
        </div>
      </div>

      {/* Suggested Companion Flowers */}
      {recommended.length > 0 && (
        <div className="flex items-center gap-2 border-l border-white/10 pl-3">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Suggested Pairings:</span>
          <div className="flex gap-1.5">
            {recommended.map(flower => (
              <button
                key={`rec_${flower.id}`}
                onClick={() => onAddFlower(flower)}
                className="group relative w-9 h-9 rounded-xl glass-card flex items-center justify-center p-1 hover:scale-110 hover:border-amber-400 transition-all"
                title={`Add recommended ${flower.name}`}
              >
                <FlowerGraphicRenderer item={flower} showShadow={false} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
