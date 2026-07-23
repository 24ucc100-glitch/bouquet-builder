import React from 'react';

export const CartoonGraphicRenderer = ({ item, isSelected, bloomStage = 'full' }) => {
  // If item has extracted high-resolution PNG illustration asset, render image cleanly
  if (item.image) {
    return (
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain filter transition-all duration-300 drop-shadow-md hover:scale-105"
          loading="eager"
        />
      </div>
    );
  }

  const primary = item.primaryColor || '#f472b6';
  const secondary = item.secondaryColor || '#be185d';
  const accent = item.accentColor || '#fbcfe8';
  const uid = `grad_${item.id}_${Math.random().toString(36).substr(2, 4)}`;
  const stageScale = bloomStage === 'bud' ? 0.65 : bloomStage === 'half' ? 0.85 : 1.0;

  return (
    <div
      className="relative w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300"
      style={{ transform: `scale(${stageScale})` }}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-md overflow-visible">
        <defs>
          <linearGradient id={`${uid}_leaf`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primary} />
            <stop offset="100%" stopColor={secondary} />
          </linearGradient>
        </defs>

        {(() => {
          switch (item.renderType) {
            case 'cartoon_eucalyptus':
            case 'cartoon_ruscus':
            case 'cartoon_fern':
              return (
                <g transform="translate(60,60)">
                  <path d="M 0 55 Q 6 0, 0 -55" stroke={secondary} strokeWidth="4.5" fill="none" strokeLinecap="round" />
                  {[-40, -20, 0, 20, 40].map((y, i) => (
                    <g key={`leaf_${i}`} transform={`translate(0, ${y})`}>
                      <path
                        d="M 0 0 C -35 -20, -40 8, 0 14"
                        fill={`url(#${uid}_leaf)`}
                        stroke={secondary}
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 0 0 C 35 -20, 40 8, 0 14"
                        fill={`url(#${uid}_leaf)`}
                        stroke={secondary}
                        strokeWidth="1.5"
                      />
                    </g>
                  ))}
                </g>
              );

            case 'cartoon_fairy_lights':
              return (
                <g className="animate-fairy">
                  <path d="M 10 20 Q 60 90, 110 20 Q 60 110, 10 110" fill="none" stroke="#fde047" strokeWidth="2" strokeDasharray="5,5" />
                  {[
                    { x: 10, y: 20 }, { x: 45, y: 55 }, { x: 80, y: 45 },
                    { x: 110, y: 20 }, { x: 90, y: 90 }, { x: 35, y: 95 }
                  ].map((pt, i) => (
                    <g key={`lgt_${i}`} transform={`translate(${pt.x}, ${pt.y})`}>
                      <circle cx="0" cy="0" r="11" fill="#fde047" opacity="0.35" />
                      <circle cx="0" cy="0" r="6" fill="#fef08a" />
                    </g>
                  ))}
                </g>
              );

            case 'cartoon_butterfly':
              return (
                <g transform="translate(60,60)">
                  <ellipse cx="-15" cy="-12" rx="16" ry="12" fill="#fb923c" transform="rotate(-15)" />
                  <ellipse cx="15" cy="-12" rx="16" ry="12" fill="#f97316" transform="rotate(15)" />
                  <line x1="0" y1="-16" x2="0" y2="16" stroke="#18181b" strokeWidth="3.5" strokeLinecap="round" />
                </g>
              );

            default:
              return (
                <g transform="translate(60,60)">
                  <circle cx="0" cy="0" r="25" fill={primary} />
                  <circle cx="0" cy="0" r="10" fill="#fde047" />
                </g>
              );
          }
        })()}
      </svg>
    </div>
  );
};
