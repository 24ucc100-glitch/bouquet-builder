import React, { useState } from 'react';
import { FLOWER_TYPES } from '../engine/flowerRegistry';
import { GREENERY_TYPES } from '../engine/greeneryRegistry';
import { WRAP_STYLES } from '../engine/wrapRegistry';
import { Sparkles, Plus, Minus, Check, Palette, Mail, ChevronDown } from 'lucide-react';

export const SelectionStudio = ({
  flowerSelections = {},
  onChangeFlowerCount,
  onChangeFlowerColor,
  greenerySelections = {},
  onToggleGreenery,
  wrapStyleId = 'korean_pink',
  onSelectWrap,
  ribbonColorHex = '#f472b6',
  onChangeRibbonColor,
  cardConfig = {},
  onChangeCardConfig,
  onGenerateAI,
  isGeneratingAI
}) => {
  const [activeTab, setActiveTab] = useState('flowers'); // 'flowers' | 'greenery' | 'wrap_ribbon' | 'card'

  const ribbonColors = [
    { name: 'Satin Pink', hex: '#f472b6' },
    { name: 'Imperial Gold', hex: '#eab308' },
    { name: 'Velvet Red', hex: '#e11d48' },
    { name: 'Emerald Green', hex: '#10b981' },
    { name: 'Snow White', hex: '#ffffff' },
    { name: 'Midnight Black', hex: '#0f172a' }
  ];

  return (
    <div className="w-80 h-full glass-panel flex flex-col border-r border-white/10 rounded-2xl overflow-hidden bg-slate-950/85">
      {/* BRANDING HEADER */}
      <div className="p-3.5 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
            Florist Catalog
          </span>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-white/10 bg-black/40 text-[11px] font-semibold">
        <button
          onClick={() => setActiveTab('flowers')}
          className={`flex-1 py-2.5 text-center transition-all ${
            activeTab === 'flowers'
              ? 'text-amber-300 border-b-2 border-amber-400 bg-white/5'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🌸 Flowers
        </button>
        <button
          onClick={() => setActiveTab('greenery')}
          className={`flex-1 py-2.5 text-center transition-all ${
            activeTab === 'greenery'
              ? 'text-amber-300 border-b-2 border-amber-400 bg-white/5'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🍃 Foliage
        </button>
        <button
          onClick={() => setActiveTab('wrap_ribbon')}
          className={`flex-1 py-2.5 text-center transition-all ${
            activeTab === 'wrap_ribbon'
              ? 'text-amber-300 border-b-2 border-amber-400 bg-white/5'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🎀 Wrap
        </button>
        <button
          onClick={() => setActiveTab('card')}
          className={`flex-1 py-2.5 text-center transition-all ${
            activeTab === 'card'
              ? 'text-amber-300 border-b-2 border-amber-400 bg-white/5'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          💌 Card
        </button>
      </div>

      {/* TAB CONTENT VIEWPORT */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
        {/* 1. FLOWERS TAB (14 TYPES) */}
        {activeTab === 'flowers' && (
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
              Select Flower Varieties
            </h3>
            {Object.entries(FLOWER_TYPES).map(([key, f]) => {
              const currentData = flowerSelections[f.id] || { count: 0, colorHex: f.defaultColor };
              const count = currentData.count || 0;

              return (
                <div key={f.id} className="p-2.5 rounded-xl glass-card border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">{f.name}</span>
                    <div className="flex items-center gap-1.5 bg-black/50 rounded-lg px-2 py-1 border border-white/10">
                      <button
                        onClick={() => onChangeFlowerCount(f.id, -1)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-amber-300 font-bold text-xs w-4 text-center">{count}</span>
                      <button
                        onClick={() => onChangeFlowerCount(f.id, 1)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* COLOR SWATCHES */}
                  {count > 0 && (
                    <div className="flex items-center gap-1.5 pt-1 border-t border-white/5">
                      <span className="text-[10px] text-slate-400 mr-1">Color:</span>
                      {f.colors.map(c => (
                        <button
                          key={c.id}
                          onClick={() => onChangeFlowerColor(f.id, c.hex)}
                          className={`w-4 h-4 rounded-full border transition-transform ${
                            currentData.colorHex === c.hex ? 'ring-2 ring-amber-400 scale-110' : 'opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 2. GREENERY TAB (6 TYPES) */}
        {activeTab === 'greenery' && (
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
              Foliage & Greenery Accent
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(GREENERY_TYPES).map(([key, g]) => {
                const isSelected = !!greenerySelections[g.id];

                return (
                  <button
                    key={g.id}
                    onClick={() => onToggleGreenery(g.id)}
                    className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-400 bg-amber-400/15 text-amber-200'
                        : 'border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: g.colorHex }} />
                      <span className="text-xs font-medium">{g.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. WRAP & RIBBON TAB */}
        {activeTab === 'wrap_ribbon' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
                Wrapping Paper Style
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(WRAP_STYLES).map(([key, w]) => (
                  <button
                    key={w.id}
                    onClick={() => onSelectWrap(w.id)}
                    className={`p-2.5 rounded-xl text-xs text-left border transition-all ${
                      wrapStyleId === w.id
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300 font-semibold'
                        : 'border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: w.frontColor }} />
                      <span className="font-bold text-[11px]">{w.name}</span>
                    </div>
                    <span className="text-[9px] text-slate-400">{w.category}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-3">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
                Satin Ribbon Color
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {ribbonColors.map(r => (
                  <button
                    key={r.hex}
                    onClick={() => onChangeRibbonColor(r.hex)}
                    className={`p-2 rounded-xl text-[10px] font-medium border flex items-center gap-1.5 transition-all ${
                      ribbonColorHex === r.hex ? 'border-amber-400 bg-amber-400/20 text-amber-200' : 'border-white/5 text-slate-400'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: r.hex }} />
                    <span>{r.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. GREETING CARD TAB */}
        {activeTab === 'card' && (
          <div className="space-y-3.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
              Personalized Greeting Card
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400">Card Message</label>
              <input
                type="text"
                value={cardConfig.message || ''}
                onChange={(e) => onChangeCardConfig({ ...cardConfig, message: e.target.value })}
                placeholder="Happy Birthday Sneha ❤️"
                className="w-full p-2.5 text-xs rounded-xl bg-black/50 border border-white/10 text-slate-200 font-serif focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-slate-400">Card Font Style</label>
              <select
                value={cardConfig.font || 'font-serif'}
                onChange={(e) => onChangeCardConfig({ ...cardConfig, font: e.target.value })}
                className="w-full p-2.5 text-xs rounded-xl bg-black/50 border border-white/10 text-slate-200 focus:outline-none focus:border-amber-400"
              >
                <option value="font-serif">Elegant Serif</option>
                <option value="font-sans">Modern Sans</option>
                <option value="font-mono">Classic Mono</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* AI BOUTIQUE GENERATOR TRIGGER BUTTON */}
      <div className="p-3.5 border-t border-white/10 bg-black/40">
        <button
          onClick={onGenerateAI}
          disabled={isGeneratingAI}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-102 transition-transform disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 text-slate-950 ${isGeneratingAI ? 'animate-spin' : ''}`} />
          <span>{isGeneratingAI ? 'Generating AI Bouquet...' : '✨ Generate AI Bouquet'}</span>
        </button>
      </div>
    </div>
  );
};
