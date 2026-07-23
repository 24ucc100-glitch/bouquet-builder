import React from 'react';
import { generateRibbonGeometry } from '../engine/ribbonEngine';

export const ProceduralRibbon = ({ colorHex = '#f472b6', ribbonScale = 1.0 }) => {
  const geom = generateRibbonGeometry(colorHex, 180, ribbonScale);

  return (
    <g className="procedural-ribbon-group filter drop-shadow-xl pointer-events-none">
      <defs>
        <linearGradient id={`ribbonGrad_${colorHex.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorHex} stopOpacity="1" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor={colorHex} stopOpacity="1" />
        </linearGradient>
        <filter id="knotShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* 1. Left Tail */}
      <path
        d={geom.leftTail.path}
        fill={colorHex}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
        className="transition-all duration-300"
      />

      {/* 2. Right Tail */}
      <path
        d={geom.rightTail.path}
        fill={colorHex}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
        className="transition-all duration-300"
      />

      {/* 3. Left Loop */}
      <path
        d={geom.leftLoop.path}
        fill={`url(#ribbonGrad_${colorHex.replace('#', '')})`}
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
        className="transition-all duration-300"
      />

      {/* 4. Right Loop */}
      <path
        d={geom.rightLoop.path}
        fill={`url(#ribbonGrad_${colorHex.replace('#', '')})`}
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
        className="transition-all duration-300"
      />

      {/* 5. Center Knot */}
      <ellipse
        cx={geom.centerKnot.cx}
        cy={geom.centerKnot.cy}
        rx={geom.centerKnot.rx}
        ry={geom.centerKnot.ry}
        fill={colorHex}
        stroke="#ffffff"
        strokeWidth="2"
        filter="url(#knotShadow)"
        className="transition-all duration-300"
      />
      <ellipse
        cx={geom.centerKnot.cx - 3}
        cy={geom.centerKnot.cy - 3}
        rx={geom.centerKnot.rx * 0.4}
        ry={geom.centerKnot.ry * 0.4}
        fill="#ffffff"
        opacity="0.5"
      />
    </g>
  );
};
