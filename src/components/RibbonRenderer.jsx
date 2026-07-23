import React from 'react';
import { RIBBON_COLORS } from '../data/ribbonData';

export const RibbonRenderer = ({
  colorHex = '#e2b867',
  width = 30,
  bowStyle = 'classic_double',
  tailLength = 120,
  centerPos = { x: 350, y: 520 }
}) => {
  const colorObj = RIBBON_COLORS.find(c => c.hex.toLowerCase() === colorHex.toLowerCase()) || {
    hex: colorHex,
    shine: '#ffffff'
  };

  const cx = centerPos.x;
  const cy = centerPos.y;
  const halfW = width / 2;

  return (
    <g className="ribbon-layer pointer-events-none">
      <defs>
        <filter id="ribbonShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.45" />
        </filter>

        <linearGradient id={`ribbonGrad_${colorHex.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colorObj.hex} />
          <stop offset="50%" stopColor={colorObj.shine} />
          <stop offset="100%" stopColor={colorObj.hex} />
        </linearGradient>
      </defs>

      {/* TAIL RIBBONS (Trailing below bow) */}
      <g filter="url(#ribbonShadow)">
        {/* Left Ribbon Tail */}
        <path
          d={`M ${cx - halfW * 0.4} ${cy} Q ${cx - 30 - width * 0.5} ${cy + tailLength * 0.6}, ${cx - 50 - width} ${cy + tailLength} L ${cx - 20 - width} ${cy + tailLength} Q ${cx - 10} ${cy + tailLength * 0.5}, ${cx} ${cy}`}
          fill={`url(#ribbonGrad_${colorHex.replace('#','')})`}
        />

        {/* Right Ribbon Tail */}
        <path
          d={`M ${cx + halfW * 0.4} ${cy} Q ${cx + 30 + width * 0.5} ${cy + tailLength * 0.6}, ${cx + 50 + width} ${cy + tailLength} L ${cx + 20 + width} ${cy + tailLength} Q ${cx + 10} ${cy + tailLength * 0.5}, ${cx} ${cy}`}
          fill={`url(#ribbonGrad_${colorHex.replace('#','')})`}
        />
      </g>

      {/* CENTRAL RIBBON WRAP BAND */}
      <rect
        x={cx - 50 - halfW * 0.5}
        y={cy - halfW * 0.6}
        width={100 + width}
        height={width * 0.9}
        rx={width * 0.3}
        fill={`url(#ribbonGrad_${colorHex.replace('#','')})`}
        filter="url(#ribbonShadow)"
      />

      {/* BOW ASSEMBLY */}
      <g filter="url(#ribbonShadow)">
        {bowStyle === 'classic_double' || bowStyle === 'grand_layered' ? (
          <>
            {/* Left Main Bow Loop */}
            <path
              d={`M ${cx} ${cy} C ${cx - 50 - width} ${cy - 40 - width}, ${cx - 80 - width} ${cy + 10}, ${cx} ${cy}`}
              fill={`url(#ribbonGrad_${colorHex.replace('#','')})`}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="1"
            />
            {/* Right Main Bow Loop */}
            <path
              d={`M ${cx} ${cy} C ${cx + 50 + width} ${cy - 40 - width}, ${cx + 80 + width} ${cy + 10}, ${cx} ${cy}`}
              fill={`url(#ribbonGrad_${colorHex.replace('#','')})`}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="1"
            />

            {/* Extra Layered Loops if Grand Layered */}
            {bowStyle === 'grand_layered' && (
              <>
                <path
                  d={`M ${cx} ${cy} C ${cx - 35 - width} ${cy - 25}, ${cx - 50 - width} ${cy + 25}, ${cx} ${cy}`}
                  fill={colorObj.shine}
                  opacity="0.75"
                />
                <path
                  d={`M ${cx} ${cy} C ${cx + 35 + width} ${cy - 25}, ${cx + 50 + width} ${cy + 25}, ${cx} ${cy}`}
                  fill={colorObj.shine}
                  opacity="0.75"
                />
              </>
            )}
          </>
        ) : bowStyle === 'french_knot' ? (
          <>
            {/* French Tailored Loop */}
            <ellipse
              cx={cx - 35 - halfW}
              cy={cy - 10}
              rx={35 + halfW}
              ry={20 + halfW * 0.4}
              fill={`url(#ribbonGrad_${colorHex.replace('#','')})`}
              transform={`rotate(-15, ${cx - 35 - halfW}, ${cy - 10})`}
            />
            <ellipse
              cx={cx + 35 + halfW}
              cy={cy - 10}
              rx={35 + halfW}
              ry={20 + halfW * 0.4}
              fill={`url(#ribbonGrad_${colorHex.replace('#','')})`}
              transform={`rotate(15, ${cx + 35 + halfW}, ${cy - 10})`}
            />
          </>
        ) : null /* Minimal tie is just the sleek central band */}

        {/* Central Bow Knot */}
        <circle
          cx={cx}
          cy={cy}
          r={width * 0.55}
          fill={colorObj.hex}
          stroke={colorObj.shine}
          strokeWidth="2"
        />
        <circle
          cx={cx - width * 0.15}
          cy={cy - width * 0.15}
          r={width * 0.2}
          fill="#ffffff"
          opacity="0.4"
        />
      </g>
    </g>
  );
};
