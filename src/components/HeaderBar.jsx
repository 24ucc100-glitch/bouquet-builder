import React from 'react';
import { Sparkles, Download, RotateCcw, ZoomIn, ZoomOut, Heart, Eye } from 'lucide-react';

export const HeaderBar = ({
  zoom = 1,
  onZoomChange,
  onResetCanvas,
  onExportPNG,
  onToggleLivePreview,
  isShowingLivePreview
}) => {
  return (
    <header className="w-full max-w-[1550px] mx-auto mb-4 p-3 rounded-2xl glass-panel border border-white/10 flex items-center justify-between bg-slate-950/80 shadow-2xl">
      {/* BRAND LOGO */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Sparkles className="w-5 h-5 text-slate-950" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-wide text-amber-200 uppercase">
            Bloom & Artistry
          </h1>
          <p className="text-[10px] text-slate-400">Luxury Florist Studio & AI Illustrator</p>
        </div>
      </div>

      {/* CANVAS TOOLBAR */}
      <div className="flex items-center gap-3">
        {/* VIEW MODE TOGGLE */}
        <button
          onClick={onToggleLivePreview}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
            isShowingLivePreview
              ? 'border-amber-400 bg-amber-400/20 text-amber-300'
              : 'border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isShowingLivePreview ? 'Live Florist Preview' : 'AI Render View'}</span>
        </button>

        {/* ZOOM CONTROLS */}
        <div className="flex items-center gap-1 bg-black/40 rounded-xl p-1 border border-white/10 text-xs">
          <button
            onClick={() => onZoomChange(Math.max(0.7, zoom - 0.1))}
            className="p-1 hover:text-amber-300 text-slate-400"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[10px] text-amber-300 px-1">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => onZoomChange(Math.min(1.4, zoom + 0.1))}
            className="p-1 hover:text-amber-300 text-slate-400"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* RESET CANVAS */}
        <button
          onClick={onResetCanvas}
          className="p-2 rounded-xl bg-black/40 border border-white/10 text-slate-400 hover:text-rose-400 transition-colors"
          title="Reset Bouquet"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* EXPORT PNG */}
        <button
          onClick={onExportPNG}
          className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-102 transition-transform"
        >
          <Download className="w-4 h-4 text-slate-950" />
          <span>Export 4K Artwork</span>
        </button>
      </div>
    </header>
  );
};
