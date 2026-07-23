import React, { forwardRef, useMemo } from 'react';
import { calculateFloristLayout } from '../engine/floristEngine';
import { ProceduralWrap } from './ProceduralWrap';
import { ProceduralRibbon } from './ProceduralRibbon';
import { BackgroundStudio } from './BackgroundStudio';
import { GreetingCardOverlay } from './GreetingCardOverlay';
import { Sparkles, Loader2 } from 'lucide-react';

export const LiveCanvasViewport = forwardRef(({
  flowerSelections = {},
  greenerySelections = {},
  wrapStyleId = 'korean_pink',
  ribbonColorHex = '#f472b6',
  activeBgId = 'dark_luxury',
  cardConfig = { message: 'Happy Birthday Sneha ❤️', shape: 'rectangle', font: 'font-serif', color: '#78350f' },
  aiGeneratedImageUrl = null,
  isGeneratingAI = false,
  showSparkles = true,
  zoom = 1
}, ref) => {
  // Calculate florist layout in real-time
  const layoutElements = useMemo(() => {
    return calculateFloristLayout(flowerSelections, greenerySelections);
  }, [flowerSelections, greenerySelections]);

  const displayImage = aiGeneratedImageUrl;

  return (
    <div
      ref={ref}
      className="relative w-[700px] h-[780px] rounded-3xl glass-panel overflow-hidden shadow-2xl transition-transform duration-200"
      style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}
    >
      {/* 1. BACKGROUND STUDIO LIGHTING */}
      <BackgroundStudio activeBgId={activeBgId} />

      {/* 2. FLOATING SPARKLES & HEARTS */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="absolute top-10 left-16 text-rose-300 opacity-60 animate-bounce text-sm">❤️</div>
          <div className="absolute top-20 right-20 text-amber-300 opacity-70 animate-pulse text-base">✨</div>
          <div className="absolute bottom-36 left-20 text-pink-300 opacity-60 animate-pulse text-xs">💖</div>
          <div className="absolute top-1/3 right-12 text-amber-200 opacity-80 animate-ping text-xs">⭐</div>
        </div>
      )}

      {/* 3. AI GENERATION LOADING OVERLAY */}
      {isGeneratingAI && (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
          <div className="text-xs font-bold text-amber-200 uppercase tracking-wider">Crafting Master AI Bouquet...</div>
          <div className="text-[10px] text-slate-400">Transforming florist layout into Disney/Pixar masterpiece</div>
        </div>
      )}

      {/* 4. CANVAS CONTENT (AI IMAGE OR LIVE FLORIST CANVAS) */}
      {displayImage ? (
        <div className="absolute inset-0 z-0 flex items-center justify-center p-4">
          <img
            src={displayImage}
            alt="Generated Bouquet Artwork"
            className="w-full h-full object-contain filter drop-shadow-2xl transition-all duration-500"
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-0">
          <svg className="w-full h-full" viewBox="0 0 700 780">
            {/* PROCEDURAL BACK WRAP LAYER */}
            <ProceduralWrap wrapStyleId={wrapStyleId} />

            {/* FLORIST LAYOUT ELEMENTS (FOLIAGE & FLOWERS) */}
            {layoutElements.map(el => {
              if (el.kind === 'greenery') {
                return (
                  <g
                    key={el.id}
                    transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation}) scale(${el.scale})`}
                    className="transition-transform duration-300"
                  >
                    <path
                      d="M 0 0 C -15 -40, -10 -90, 0 -130 C 10 -90, 15 -40, 0 0 Z"
                      fill={el.colorHex}
                      stroke={el.accentHex}
                      strokeWidth="1.5"
                    />
                    <circle cx="0" cy="-60" r="14" fill={el.colorHex} opacity="0.85" />
                    <circle cx="-12" cy="-90" r="11" fill={el.accentHex} opacity="0.75" />
                    <circle cx="12" cy="-90" r="11" fill={el.accentHex} opacity="0.75" />
                  </g>
                );
              }

              // FLOWER GRAPHIC RENDERING
              const size = el.baseSize * el.scale;
              const r = size / 2;

              return (
                <g
                  key={el.id}
                  transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation})`}
                  className="transition-transform duration-300"
                  style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.35))' }}
                >
                  {/* Outer Petal Ring */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, pIdx) => (
                    <path
                      key={pIdx}
                      d={`M 0 0 C -${r * 0.4} -${r * 0.9}, ${r * 0.4} -${r * 0.9}, 0 0 Z`}
                      fill={el.colorHex}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1.2"
                      transform={`rotate(${angle})`}
                    />
                  ))}

                  {/* Inner Petal Ring */}
                  {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, pIdx) => (
                    <circle
                      key={pIdx}
                      cx={Math.cos((angle * Math.PI) / 180) * (r * 0.4)}
                      cy={Math.sin((angle * Math.PI) / 180) * (r * 0.4)}
                      r={r * 0.35}
                      fill={el.colorHex}
                      opacity="0.9"
                    />
                  ))}

                  {/* Flower Center Bulb */}
                  <circle cx="0" cy="0" r={r * 0.28} fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                  <circle cx="-2" cy="-2" r={r * 0.12} fill="#ffffff" opacity="0.7" />
                </g>
              );
            })}

            {/* PROCEDURAL RIBBON */}
            <ProceduralRibbon colorHex={ribbonColorHex} />
          </svg>
        </div>
      )}

      {/* 5. EDITABLE GREETING CARD OVERLAY */}
      <GreetingCardOverlay cardConfig={cardConfig} />
    </div>
  );
});

LiveCanvasViewport.displayName = 'LiveCanvasViewport';
