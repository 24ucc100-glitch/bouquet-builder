import React from 'react';
import { Mail, Heart } from 'lucide-react';

export const GreetingCardOverlay = ({
  cardConfig = {
    message: 'Happy Birthday Sneha ❤️',
    shape: 'rectangle',
    font: 'font-serif',
    color: '#78350f',
    bgHex: '#fefce8'
  }
}) => {
  return (
    <div className="absolute top-20 right-14 z-30 pointer-events-none filter drop-shadow-2xl">
      <div className="relative transform rotate-[8deg] transition-all duration-300">
        {/* FLORIST CARD PIN BADGE */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-40 w-6 h-6 rounded-full bg-amber-400 border-2 border-amber-100 flex items-center justify-center shadow-lg">
          <Heart className="w-3 h-3 text-amber-950 fill-amber-950" />
        </div>

        {/* CARD CONTAINER */}
        <div
          className={`w-44 h-28 border-2 border-amber-400/80 rounded-2xl p-3 shadow-2xl flex flex-col items-center justify-center text-center ${
            cardConfig.shape === 'heart' ? 'rounded-full' : 'rounded-2xl'
          }`}
          style={{ backgroundColor: cardConfig.bgHex || '#fefce8' }}
        >
          <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-amber-800 font-bold mb-1 opacity-80">
            <Mail className="w-2.5 h-2.5" />
            <span>Florist Note</span>
          </div>

          <span
            className={`text-xs font-bold leading-tight px-1 ${cardConfig.font}`}
            style={{ color: cardConfig.color || '#78350f' }}
          >
            "{cardConfig.message || 'For You ❤️'}"
          </span>
        </div>
      </div>
    </div>
  );
};
