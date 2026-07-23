import React from 'react';
import { WRAP_STYLES } from '../engine/wrapRegistry';

export const ProceduralWrap = ({ wrapStyleId = 'korean_pink' }) => {
  const wrap = WRAP_STYLES[wrapStyleId.toUpperCase()] || WRAP_STYLES.KOREAN_PINK;

  const cx = 350;
  const cy = 460;

  return (
    <g className="procedural-wrap-group pointer-events-none">
      <defs>
        <linearGradient id={`wrapGrad_${wrap.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={wrap.backColor} stopOpacity={wrap.opacity} />
          <stop offset="50%" stopColor={wrap.midColor} stopOpacity={wrap.opacity} />
          <stop offset="100%" stopColor={wrap.frontColor} stopOpacity={wrap.opacity} />
        </linearGradient>

        <filter id="wrapFoldShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* 1. BACK LAYER WRAP (Behind Flowers) */}
      <path
        d={`M ${cx - 240} ${cy - 160} Q ${cx} ${cy - 230} ${cx + 240} ${cy - 160} L ${cx + 180} ${cy + 220} Q ${cx} ${cy + 260} ${cx - 180} ${cy + 220} Z`}
        fill={`url(#wrapGrad_${wrap.id})`}
        stroke={wrap.borderColor}
        strokeWidth="2"
        opacity="0.85"
      />

      {/* 2. MIDDLE LAYER WRAP (Fold Left) */}
      <path
        d={`M ${cx - 250} ${cy - 130} C ${cx - 160} ${cy - 50}, ${cx - 120} ${cy + 80}, ${cx - 60} ${cy + 170} L ${cx - 180} ${cy + 210} Z`}
        fill={wrap.midColor}
        stroke={wrap.borderColor}
        strokeWidth="1.5"
        filter="url(#wrapFoldShadow)"
        opacity={wrap.opacity}
      />

      {/* 3. MIDDLE LAYER WRAP (Fold Right) */}
      <path
        d={`M ${cx + 250} ${cy - 130} C ${cx + 160} ${cy - 50}, ${cx + 120} ${cy + 80}, ${cx + 60} ${cy + 170} L ${cx + 180} ${cy + 210} Z`}
        fill={wrap.midColor}
        stroke={wrap.borderColor}
        strokeWidth="1.5"
        filter="url(#wrapFoldShadow)"
        opacity={wrap.opacity}
      />

      {/* 4. FRONT LAYER WRAP (Layered Geometric Folds) */}
      <path
        d={`M ${cx - 190} ${cy + 50} Q ${cx} ${cy + 120} ${cx + 190} ${cy + 50} L ${cx + 100} ${cy + 220} Q ${cx} ${cy + 245} ${cx - 100} ${cy + 220} Z`}
        fill={wrap.frontColor}
        stroke={wrap.borderColor}
        strokeWidth="2"
        filter="url(#wrapFoldShadow)"
        opacity={wrap.opacity}
      />

      {/* 5. HIGHLIGHT REFLECTION RIM */}
      <path
        d={`M ${cx - 230} ${cy - 145} Q ${cx} ${cy - 210} ${cx + 230} ${cy - 145}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        opacity="0.5"
      />
    </g>
  );
};
