import React from 'react';

export const STUDIO_THEMES = {
  DARK_LUXURY: {
    id: 'dark_luxury',
    name: 'Dark Luxury Studio',
    bgClass: 'bg-gradient-to-b from-[#13111c] via-[#0d0c11] to-[#050508]',
    glowColor: 'rgba(245, 158, 11, 0.12)'
  },
  SOFT_LIGHT: {
    id: 'soft_light',
    name: 'Soft Daylight Studio',
    bgClass: 'bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617]',
    glowColor: 'rgba(255, 255, 255, 0.15)'
  },
  PASTEL_STUDIO: {
    id: 'pastel_studio',
    name: 'Pastel Korean Studio',
    bgClass: 'bg-gradient-to-b from-[#2e1065] via-[#1e1b4b] to-[#0f172a]',
    glowColor: 'rgba(244, 114, 182, 0.15)'
  },
  WEDDING_STUDIO: {
    id: 'wedding_studio',
    name: 'Imperial Wedding Studio',
    bgClass: 'bg-gradient-to-b from-[#3f0713] via-[#1f030a] to-[#090103]',
    glowColor: 'rgba(251, 191, 36, 0.18)'
  },
  STARLIGHT: {
    id: 'starlight',
    name: 'Midnight Starlight',
    bgClass: 'bg-gradient-to-b from-[#0284c7] via-[#0f172a] to-[#020617]',
    glowColor: 'rgba(56, 189, 248, 0.2)'
  }
};

export const BackgroundStudio = ({ activeBgId = 'dark_luxury' }) => {
  const theme = STUDIO_THEMES[activeBgId.toUpperCase()] || STUDIO_THEMES.DARK_LUXURY;

  return (
    <div className={`absolute inset-0 transition-colors duration-700 ${theme.bgClass}`}>
      {/* SOFT STUDIO TOP SPOTLIGHT */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[350px] rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: theme.glowColor }}
      />
      {/* AMBIENT RADIAL LIGHTING */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
    </div>
  );
};
