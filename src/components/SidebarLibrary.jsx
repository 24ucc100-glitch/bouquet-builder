import React, { useState } from 'react';
import { FLOWER_PALETTES, INDIVIDUAL_FLOWER_COLORS } from '../data/palettesData';
import { Sparkles, Plus, Minus, Check, Mail } from 'lucide-react';

export const SidebarLibrary = ({
  activePaletteId,
  onSelectPalette,
  activeFlowerColor,
  onSelectFlowerColor,
  onGenerateBouquet,
  isGenerating
}) => {
  const [activeTab, setActiveTab] = useState('colors');

  // Selection Studio State
  const [flowers, setFlowers] = useState({
    'Red Roses': 6,
    'White Lilies': 3,
    'Sunflowers': 2,
    'Baby\'s Breath': 1,
    'Pink Tulips': 0,
    'Pink Peonies': 0
  });

  const [leaves, setLeaves] = useState({
    'Eucalyptus': true,
    'Fern': true,
    'Ruscus': false
  });

  const [wrap, setWrap] = useState('Pink Korean Wrap');
  const [ribbon, setRibbon] = useState('Pink Satin Ribbon');
  const [card, setCard] = useState('Happy Birthday Emma ❤️');

  const handleFlowerCountChange = (name, delta) => {
    setFlowers(prev => ({
      ...prev,
      [name]: Math.max(0, (prev[name] || 0) + delta)
    }));
  };

  const handleLeafToggle = (name) => {
    setLeaves(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleGenerate = () => {
    const selectedFlowers = Object.entries(flowers)
      .filter(([_, count]) => count > 0)
      .map(([name, count]) => (count === 1 && name === "Baby's Breath" ? name : `${count} ${name}`));

    const selectedLeaves = Object.entries(leaves)
      .filter(([_, enabled]) => enabled)
      .map(([name]) => name);

    onGenerateBouquet({
      flowers: selectedFlowers,
      leaves: selectedLeaves,
      wrap,
      ribbon,
      card,
    });
  };

  return (
    <div className="w-80 h-full glass-panel flex flex-col border-r border-white/10 rounded-2xl overflow-hidden bg-slate-950/80">
      {/* SIDEBAR TABS */}
      <div className="flex border-b border-white/10 bg-black/30">
        <button
          onClick={() => setActiveTab('colors')}
          className={`flex-1 py-3 text-xs font-semibold text-center transition-all ${
            activeTab === 'colors'
              ? 'text-amber-300 border-b-2 border-amber-400 bg-white/5'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🎨 Colors
        </button>
        <button
          onClick={() => setActiveTab('palettes')}
          className={`flex-1 py-3 text-xs font-semibold text-center transition-all ${
            activeTab === 'palettes'
              ? 'text-amber-300 border-b-2 border-amber-400 bg-white/5'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          💐 Palettes
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-3 text-xs font-semibold text-center transition-all ${
            activeTab === 'custom'
              ? 'text-amber-300 border-b-2 border-amber-400 bg-white/5'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          ✨ AI Studio
        </button>
      </div>

      {/* FLOWER COLORS TAB */}
      {activeTab === 'colors' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
              Select Primary Flower Color
            </h3>
            <p className="text-[11px] text-slate-400">
              Instantly morphs flower hues in real time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {INDIVIDUAL_FLOWER_COLORS.map(c => (
              <button
                key={c.id}
                onClick={() => onSelectFlowerColor(c.id)}
                className={`p-3 rounded-2xl glass-card text-left transition-all border flex items-center justify-between ${
                  activeFlowerColor === c.id
                    ? 'border-amber-400 bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/50 scale-102'
                    : 'border-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs font-medium">{c.name}</span>
                </div>
                {activeFlowerColor === c.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CURATED PALETTES TAB */}
      {activeTab === 'palettes' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {FLOWER_PALETTES.map(p => (
            <button
              key={p.id}
              onClick={() => onSelectPalette(p.id)}
              className={`w-full p-3 rounded-2xl glass-card text-left border transition-all flex flex-col gap-1 ${
                activePaletteId === p.id
                  ? 'border-amber-400 bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/40'
                  : 'border-white/5 text-slate-300 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-200">{p.name}</h4>
                {activePaletteId === p.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">{p.description}</p>
            </button>
          ))}
        </div>
      )}

      {/* CUSTOM AI STUDIO TAB */}
      {activeTab === 'custom' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
              🌸 Select Flowers & Quantities
            </label>
            <div className="space-y-1.5">
              {Object.entries(flowers).map(([name, count]) => (
                <div key={name} className="flex items-center justify-between p-2 rounded-xl glass-card text-xs">
                  <span className="text-slate-200 font-medium">{name}</span>
                  <div className="flex items-center gap-2 bg-black/40 rounded-lg px-2 py-1 border border-white/10">
                    <button
                      onClick={() => handleFlowerCountChange(name, -1)}
                      className="text-slate-400 hover:text-white p-0.5"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-amber-300 font-bold w-4 text-center">{count}</span>
                    <button
                      onClick={() => handleFlowerCountChange(name, 1)}
                      className="text-slate-400 hover:text-white p-0.5"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
              🍃 Foliage
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(leaves).map(([name, enabled]) => (
                <button
                  key={name}
                  onClick={() => handleLeafToggle(name)}
                  className={`p-2 rounded-xl text-xs flex items-center justify-between border transition-all ${
                    enabled
                      ? 'border-amber-400 bg-amber-400/20 text-amber-300 font-semibold'
                      : 'border-white/5 text-slate-400'
                  }`}
                >
                  <span>{name}</span>
                  {enabled && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>Greeting Card Message</span>
            </label>
            <input
              type="text"
              value={card}
              onChange={(e) => setCard(e.target.value)}
              placeholder="Happy Birthday Emma ❤️"
              className="w-full p-2.5 text-xs rounded-xl bg-black/50 border border-white/10 text-slate-200 font-serif placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-102 transition-transform disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 text-slate-950 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating AI Bouquet...' : '✨ Generate Custom AI Bouquet'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
