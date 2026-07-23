import React from 'react';
import { STUDIO_THEMES } from './BackgroundStudio';
import { WRAP_STYLES } from '../engine/wrapRegistry';
import { Palette, Sun, Heart, Layers, Sparkles } from 'lucide-react';

export const CustomizerPanel = ({
  wrapStyleId = 'korean_pink',
  onSelectWrap,
  ribbonColorHex = '#f472b6',
  onChangeRibbonColor,
  activeBgId = 'dark_luxury',
  onSelectBg,
  cardConfig = {},
  onChangeCardConfig
}) => {
  const cardFonts = [
    { name: 'Serif Classic', font: 'font-serif' },
    { name: 'Modern Sans', font: 'font-sans' },
    { name: 'Monospace', font: 'font-mono' }
  ];

  return (
    <div className="w-80 h-full glass-panel flex flex-col border-l border-white/10 rounded-2xl overflow-hidden bg-slate-950/85 p-4 space-y-4 overflow-y-auto">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-200">
          Studio Ambiance & Styling
        </h3>
      </div>

      {/* 1. BACKGROUND STUDIO THEME SELECTOR */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>Studio Lighting Theme</span>
        </label>
        <div className="space-y-1.5">
          {Object.entries(STUDIO_THEMES).map(([key, theme]) => (
            <button
              key={theme.id}
              onClick={() => onSelectBg(theme.id)}
              className={`w-full p-2.5 rounded-xl text-xs text-left border transition-all flex items-center justify-between ${
                activeBgId === theme.id
                  ? 'border-amber-400 bg-amber-400/20 text-amber-300 font-bold'
                  : 'border-white/5 text-slate-400 hover:border-white/20'
              }`}
            >
              <span>{theme.name}</span>
              {activeBgId === theme.id && <div className="w-2 h-2 rounded-full bg-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* 2. WRAPPING TEXTURE OVERLAY SELECTOR */}
      <div className="space-y-2 border-t border-white/10 pt-3">
        <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Wrapping Material</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(WRAP_STYLES).slice(0, 6).map(([key, w]) => (
            <button
              key={w.id}
              onClick={() => onSelectWrap(w.id)}
              className={`p-2 rounded-xl text-[11px] text-left border transition-all ${
                wrapStyleId === w.id
                  ? 'border-amber-400 bg-amber-400/20 text-amber-300 font-bold'
                  : 'border-white/5 text-slate-400 hover:border-white/20'
              }`}
            >
              <span>{w.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. CARD FONT & COLOR EDITOR */}
      <div className="space-y-2 border-t border-white/10 pt-3">
        <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-amber-400" />
          <span>Card Text Styling</span>
        </label>
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-1.5">
            {cardFonts.map(f => (
              <button
                key={f.font}
                onClick={() => onChangeCardConfig({ ...cardConfig, font: f.font })}
                className={`p-1.5 rounded-lg text-[10px] text-center border transition-all ${
                  cardConfig.font === f.font ? 'border-amber-400 bg-amber-400/20 text-amber-300' : 'border-white/5 text-slate-400'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
