import React from 'react';

export const FlowerGraphicRenderer = ({ item, isSelected, showShadow = true }) => {
  // If item has a photorealistic image asset, render the high-res image with natural ambient drop shadow
  if (item.image) {
    return (
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain filter transition-all duration-300"
          style={{
            filter: showShadow 
              ? 'drop-shadow(0px 14px 18px rgba(0, 0, 0, 0.45)) drop-shadow(0px 4px 6px rgba(0,0,0,0.25))' 
              : 'none'
          }}
          loading="eager"
        />
      </div>
    );
  }

  const primary = item.primaryColor || '#e879f9';
  const secondary = item.secondaryColor || '#c084fc';

  // Vector renderers based on item renderType
  switch (item.renderType) {
    case 'svg_rose':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
          <g transform="translate(50,50)">
            {/* Outer Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <path
                key={i}
                d="M 0 0 C -25 -35, 25 -35, 0 0"
                fill={secondary}
                opacity="0.9"
                transform={`rotate(${angle}) scale(1.1)`}
              />
            ))}
            {/* Mid Petals */}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
              <path
                key={i}
                d="M 0 0 C -18 -25, 18 -25, 0 0"
                fill={primary}
                transform={`rotate(${angle})`}
              />
            ))}
            {/* Inner Spiral Petals */}
            <circle cx="0" cy="0" r="12" fill={secondary} />
            <path
              d="M -6 -4 C -8 6, 8 6, 6 -4 C 4 -10, -4 -10, -6 -4"
              fill={primary}
            />
            <circle cx="0" cy="0" r="4" fill="#831843" />
          </g>
        </svg>
      );

    case 'svg_peony':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-lg">
          <g transform="translate(50,50)">
            {Array.from({ length: 16 }).map((_, i) => {
              const rot = i * 22.5;
              return (
                <ellipse
                  key={i}
                  cx="0"
                  cy="-18"
                  rx="14"
                  ry="24"
                  fill={i % 2 === 0 ? primary : secondary}
                  opacity="0.85"
                  transform={`rotate(${rot})`}
                />
              );
            })}
            <circle cx="0" cy="0" r="16" fill="#fae8ff" />
            <circle cx="0" cy="0" r="8" fill="#e879f9" />
          </g>
        </svg>
      );

    case 'svg_dahlia':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
          <g transform="translate(50,50)">
            {Array.from({ length: 24 }).map((_, i) => {
              const rot = i * 15;
              const scale = 1 - (i % 3) * 0.15;
              return (
                <path
                  key={i}
                  d="M 0 0 L -6 -32 Q 0 -42 6 -32 Z"
                  fill={i % 2 === 0 ? primary : secondary}
                  transform={`rotate(${rot}) scale(${scale})`}
                />
              );
            })}
            <circle cx="0" cy="0" r="10" fill="#f97316" />
          </g>
        </svg>
      );

    case 'svg_hydrangea':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-md">
          <g transform="translate(60,60)">
            {[
              { x: -20, y: -20 }, { x: 20, y: -20 }, { x: 0, y: 0 },
              { x: -30, y: 10 }, { x: 30, y: 10 }, { x: 0, y: -35 },
              { x: -15, y: 25 }, { x: 15, y: 25 }
            ].map((pos, i) => (
              <g key={i} transform={`translate(${pos.x}, ${pos.y}) scale(0.6)`}>
                {[0, 90, 180, 270].map((rot, j) => (
                  <path
                    key={j}
                    d="M 0 0 C -12 -18, 12 -18, 0 0"
                    fill={i % 2 === 0 ? primary : secondary}
                    transform={`rotate(${rot})`}
                  />
                ))}
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'svg_tulip':
      return (
        <svg viewBox="0 0 80 100" className="w-full h-full filter drop-shadow-md">
          <g transform="translate(40,50)">
            <path d="M 0 35 C -30 10, -25 -30, 0 -40 C 25 -30, 30 10, 0 35 Z" fill={secondary} />
            <path d="M -15 30 C -35 -5, -20 -35, 0 -38 C -10 10, -5 25, -15 30 Z" fill={primary} />
            <path d="M 15 30 C 35 -5, 20 -35, 0 -38 C 10 10, 5 25, 15 30 Z" fill={primary} />
            <path d="M 0 35 C -15 15, -10 -25, 0 -35 C 10 -25, 15 15, 0 35 Z" fill="#fef08a" opacity="0.6" />
          </g>
        </svg>
      );

    case 'svg_lavender':
      return (
        <svg viewBox="0 0 60 120" className="w-full h-full filter drop-shadow-sm">
          <g transform="translate(30,60)">
            <line x1="0" y1="-50" x2="0" y2="50" stroke="#4d7c0f" strokeWidth="3" />
            {[-40, -30, -20, -10, 0, 10, 20].map((y, i) => (
              <g key={i} transform={`translate(0, ${y})`}>
                <ellipse cx="-8" cy="0" rx="7" ry="4" fill={primary} transform="rotate(-20)" />
                <ellipse cx="8" cy="0" rx="7" ry="4" fill={secondary} transform="rotate(20)" />
                <ellipse cx="0" cy="-4" rx="6" ry="4" fill="#c084fc" />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'svg_daisy':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-sm">
          <g transform="translate(50,50)">
            {Array.from({ length: 14 }).map((_, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-26"
                rx="6"
                ry="20"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="0.5"
                transform={`rotate(${i * (360 / 14)})`}
              />
            ))}
            <circle cx="0" cy="0" r="14" fill="#eab308" />
            <circle cx="-3" cy="-3" r="12" fill="#fde047" opacity="0.6" />
          </g>
        </svg>
      );

    case 'svg_ruscus':
    case 'svg_fern':
    case 'svg_sage':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full filter drop-shadow-md animate-sway">
          <g transform="translate(50,70)">
            <path d="M 0 60 Q 5 0, 0 -60" stroke="#14532d" strokeWidth="4" fill="none" />
            {[-40, -20, 0, 20, 40].map((y, i) => (
              <g key={i} transform={`translate(0, ${y})`}>
                <path
                  d="M 0 0 C -30 -15, -35 5, 0 10"
                  fill={primary}
                  stroke="#166534"
                  strokeWidth="1"
                />
                <path
                  d="M 0 0 C 30 -15, 35 5, 0 10"
                  fill={secondary}
                  stroke="#166534"
                  strokeWidth="1"
                />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'svg_babys_breath':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-sm">
          <g transform="translate(60,60)">
            {[
              { x: -35, y: -30 }, { x: 35, y: -30 }, { x: 0, y: -45 },
              { x: -40, y: 10 }, { x: 40, y: 10 }, { x: -20, y: -10 },
              { x: 20, y: -10 }, { x: 0, y: 20 }
            ].map((p, i) => (
              <g key={i} transform={`translate(${p.x}, ${p.y})`}>
                <line x1="0" y1="0" x2="-p.x/2" y2="20" stroke="#65a30d" strokeWidth="1" opacity="0.6" />
                <circle cx="0" cy="0" r="5" fill={primary} />
                <circle cx="-2" cy="-2" r="3" fill="#ffffff" />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'svg_fairy_lights':
      return (
        <svg viewBox="0 0 140 140" className="w-full h-full pointer-events-none animate-fairy">
          <g>
            <path
              d="M 20 20 Q 70 80, 120 20 Q 70 120, 20 120"
              fill="none"
              stroke="#e2b867"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              opacity="0.8"
            />
            {[
              { x: 20, y: 20 }, { x: 50, y: 55 }, { x: 85, y: 50 },
              { x: 120, y: 20 }, { x: 95, y: 95 }, { x: 45, y: 100 }
            ].map((pt, i) => (
              <g key={i} transform={`translate(${pt.x}, ${pt.y})`}>
                <circle cx="0" cy="0" r="10" fill="#fde047" opacity="0.35" />
                <circle cx="0" cy="0" r="5" fill="#fef08a" />
                <circle cx="0" cy="0" r="2" fill="#ffffff" />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'svg_butterfly':
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full filter drop-shadow-md">
          <g transform="translate(30,30)">
            <ellipse cx="-12" cy="-10" rx="14" ry="10" fill="#fb923c" transform="rotate(-15)" />
            <ellipse cx="12" cy="-10" rx="14" ry="10" fill="#f97316" transform="rotate(15)" />
            <ellipse cx="-10" cy="8" rx="10" ry="7" fill="#ea580c" transform="rotate(-10)" />
            <ellipse cx="10" cy="8" rx="10" ry="7" fill="#ea580c" transform="rotate(10)" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="-5" cy="-18" r="1.5" fill="#1e293b" />
            <circle cx="5" cy="-18" r="1.5" fill="#1e293b" />
          </g>
        </svg>
      );

    case 'svg_pearls':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full pointer-events-none filter drop-shadow">
          <path d="M 10 30 Q 60 100, 110 30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          {[10, 25, 40, 55, 70, 85, 100].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${30 + Math.sin(i * 0.8) * 35})`}>
              <circle cx="0" cy="0" r="6" fill="#f8fafc" />
              <circle cx="-2" cy="-2" r="2" fill="#ffffff" />
            </g>
          ))}
        </svg>
      );

    case 'svg_gold_leaf':
      return (
        <svg viewBox="0 0 80 100" className="w-full h-full filter drop-shadow-md">
          <g transform="translate(40,50)">
            <path d="M 0 40 Q 10 0, 0 -40 Q -10 0, 0 40" fill="url(#goldGradient)" />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#e2b867" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>
          </g>
        </svg>
      );

    case 'svg_mini_card':
      return (
        <svg viewBox="0 0 90 70" className="w-full h-full filter drop-shadow-lg">
          <rect x="5" y="5" width="80" height="60" rx="4" fill="#ffffff" stroke="#e2b867" strokeWidth="2" />
          <line x1="15" y1="20" x2="75" y2="20" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="15" y1="35" x2="65" y2="35" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="15" y1="50" x2="45" y2="50" stroke="#e2b867" strokeWidth="2" />
        </svg>
      );

    default:
      return (
        <div className="w-full h-full rounded-full bg-rose-500/80 flex items-center justify-center text-white text-xs">
          🌸
        </div>
      );
  }
};
