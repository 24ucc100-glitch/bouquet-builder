import React, { forwardRef } from 'react';
import { BackgroundStudio } from './BackgroundStudio';

export const BouquetCanvas = forwardRef(({
  generatedImageUrl = null,
  isGenerating = false,
  wrapStyle = 'korean_blush',
  ribbonColor = '#f472b6',
  activeBgId = 'dark_luxury',
  cardConfig = { message: 'Happy Birthday Emma ❤️', font: 'font-serif' },
  zoom = 1
}, ref) => {
  const displayImage = generatedImageUrl || '/assets/reference_bouquet.jpg';

  return (
    <div
      ref={ref}
      className="relative w-[700px] h-[780px] rounded-3xl glass-panel overflow-hidden shadow-2xl transition-transform duration-200"
      style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}
    >
      <BackgroundStudio activeBgId={activeBgId} />

      <div className="absolute inset-0 z-0 flex items-center justify-center p-4">
        <img
          key={displayImage}
          src={displayImage}
          alt="Bouquet Artwork"
          className={`w-full h-full object-contain filter transition-all duration-500 drop-shadow-2xl ${
            isGenerating ? 'opacity-40 blur-sm' : 'opacity-100'
          }`}
        />
      </div>

      {isGenerating && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
          <span className="text-amber-300 text-sm font-semibold animate-pulse">Painting your bouquet...</span>
        </div>
      )}

      <div className="absolute top-24 right-16 z-30 pointer-events-none">
        <div className="transform rotate-[8deg] filter drop-shadow-xl w-40 h-24 bg-[#fefce8] border-2 border-amber-400/80 rounded-2xl p-3 shadow-2xl flex flex-col items-center justify-center">
          <div className="text-[10px] uppercase tracking-widest text-amber-800 font-bold mb-1">Florist Note</div>
          <span className={`text-xs font-bold text-center leading-tight ${cardConfig.font} text-amber-950`}>
            "{cardConfig.message}"
          </span>
        </div>
      </div>
    </div>
  );
});

BouquetCanvas.displayName = 'BouquetCanvas';
