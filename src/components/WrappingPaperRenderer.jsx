import React from 'react';
import { WRAPPING_STYLES } from '../data/wrappingData';

export const WrappingPaperRenderer = ({ wrapId = 'kraft_paper', centerPos = { x: 350, y: 380 } }) => {
  const style = WRAPPING_STYLES.find(s => s.id === wrapId) || WRAPPING_STYLES[0];
  const cx = centerPos.x;
  const cy = centerPos.y;

  return (
    <g className="wrapping-paper-layer pointer-events-none">
      {/* Dynamic SVG Filter Definitions */}
      <defs>
        {/* Soft Drop Shadow for Wrapping Folds */}
        <filter id="wrapFoldShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity={style.shadowOpacity} />
        </filter>

        {/* Satin / Silk Sheen Gradient */}
        <linearGradient id="satinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={style.primaryColor} />
          <stop offset="35%" stopColor={style.accentColor} />
          <stop offset="70%" stopColor={style.secondaryColor} />
          <stop offset="100%" stopColor={style.primaryColor} />
        </linearGradient>

        {/* Gold Foil Accent Border for Matte Black */}
        <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#e2b867" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        {/* Mesh Pattern */}
        <pattern id="meshGrid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 16 M 0 0 L 16 16" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* BACK WRAPPING PAPER CONE / FOLDS */}
      <g filter="url(#wrapFoldShadow)">
        {/* Left Back Wing Fold */}
        <path
          d={`M ${cx - 160} ${cy - 220} Q ${cx - 240} ${cy - 120}, ${cx - 80} ${cy + 160} L ${cx} ${cy + 180} Z`}
          fill={style.type === 'satin' ? 'url(#satinGradient)' : style.secondaryColor}
          opacity={style.type === 'transparent' ? 0.4 : 0.95}
        />

        {/* Right Back Wing Fold */}
        <path
          d={`M ${cx + 160} ${cy - 220} Q ${cx + 240} ${cy - 120}, ${cx + 80} ${cy + 160} L ${cx} ${cy + 180} Z`}
          fill={style.type === 'satin' ? 'url(#satinGradient)' : style.secondaryColor}
          opacity={style.type === 'transparent' ? 0.4 : 0.95}
        />

        {/* Central Back Fan Fold */}
        <path
          d={`M ${cx - 190} ${cy - 200} C ${cx - 90} ${cy - 280}, ${cx + 90} ${cy - 280}, ${cx + 190} ${cy - 200} L ${cx + 90} ${cy + 170} L ${cx - 90} ${cy + 170} Z`}
          fill={style.type === 'satin' ? 'url(#satinGradient)' : style.primaryColor}
          opacity={style.type === 'transparent' ? 0.35 : 1}
        />

        {/* Optional Gold Trim Line for Matte Black / Luxury Styles */}
        {style.id === 'matte_black' && (
          <path
            d={`M ${cx - 190} ${cy - 200} Q ${cx} ${cy - 275}, ${cx + 190} ${cy - 200}`}
            fill="none"
            stroke="url(#goldFoil)"
            strokeWidth="3"
          />
        )}

        {/* Mesh Overlay Pattern if White Mesh */}
        {style.type === 'mesh' && (
          <path
            d={`M ${cx - 190} ${cy - 200} C ${cx - 90} ${cy - 280}, ${cx + 90} ${cy - 280}, ${cx + 190} ${cy - 200} L ${cx + 90} ${cy + 170} L ${cx - 90} ${cy + 170} Z`}
            fill="url(#meshGrid)"
            opacity="0.8"
          />
        )}
      </g>

      {/* FRONT WRAPPING PAPER CUFF / LOWER CONE (Overlaps lower stems, under ribbon) */}
      <g filter="url(#wrapFoldShadow)">
        {/* Left Front Lapel */}
        <path
          d={`M ${cx - 140} ${cy + 20} C ${cx - 90} ${cy - 30}, ${cx - 10} ${cy + 40}, ${cx - 40} ${cy + 160} L ${cx} ${cy + 180} Z`}
          fill={style.primaryColor}
          stroke={style.accentColor}
          strokeWidth="1"
          opacity={style.type === 'transparent' ? 0.6 : 0.98}
        />

        {/* Right Front Lapel */}
        <path
          d={`M ${cx + 140} ${cy + 20} C ${cx + 90} ${cy - 30}, ${cx + 10} ${cy + 40}, ${cx + 40} ${cy + 160} L ${cx} ${cy + 180} Z`}
          fill={style.secondaryColor}
          stroke={style.accentColor}
          strokeWidth="1"
          opacity={style.type === 'transparent' ? 0.6 : 0.98}
        />

        {/* Upper-Left Light Reflection Sheen */}
        <path
          d={`M ${cx - 150} ${cy - 180} Q ${cx - 100} ${cy - 220}, ${cx - 50} ${cy - 160}`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
};
