import React, { useState } from 'react';
import { Mail, Check, X, Heart, Circle, Square, Stamp } from 'lucide-react';

export const CARD_SHAPES = [
  { id: 'rectangle', name: 'Classic Card' },
  { id: 'heart', name: 'Romantic Heart' },
  { id: 'circle', name: 'Circular Seal' },
  { id: 'mini_envelope', name: 'Mini Envelope' },
  { id: 'wax_seal', name: 'Wax Stamp Seal' }
];

export const CARD_FONTS = [
  { id: 'font-serif', name: 'Serif Classic' },
  { id: 'font-sans', name: 'Modern Sans' },
  { id: 'font-mono', name: 'Typewriter' }
];

export const GreetingCardModal = ({
  isOpen,
  onClose,
  cardConfig,
  onSaveCardConfig
}) => {
  const [text, setText] = useState(cardConfig.message || '');
  const [shape, setShape] = useState(cardConfig.shape || 'rectangle');
  const [font, setFont] = useState(cardConfig.font || 'font-serif');
  const [color, setColor] = useState(cardConfig.color || '#78350f');

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveCardConfig({
      message: text,
      shape,
      font,
      color
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-amber-400/50 shadow-2xl relative space-y-4 bg-slate-950/90">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Personal Florist Greeting Note</h3>
            <p className="text-xs text-slate-400">Attached to bouquet ribbon knot</p>
          </div>
        </div>

        {/* Card Shape Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
            Card Shape
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CARD_SHAPES.map(s => (
              <button
                key={s.id}
                onClick={() => setShape(s.id)}
                className={`p-2 rounded-xl glass-card text-xs text-center border transition-all ${
                  shape === s.id
                    ? 'border-amber-400 bg-amber-400/20 text-amber-200 font-semibold'
                    : 'border-white/5 text-slate-300'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your custom heartfelt note here..."
          maxLength={120}
          rows={3}
          className={`w-full p-4 text-xs rounded-2xl bg-black/50 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none leading-relaxed ${font}`}
          style={{ color }}
        />

        {/* Font Picker */}
        <div className="flex justify-between items-center text-xs text-slate-400">
          <div className="flex gap-1.5">
            {CARD_FONTS.map(f => (
              <button
                key={f.id}
                onClick={() => setFont(f.id)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] ${
                  font === f.id ? 'border-amber-400 bg-amber-400/10 text-amber-300' : 'border-white/5 text-slate-400'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
          <span>{120 - text.length} left</span>
        </div>

        {/* Modal Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Check className="w-4 h-4" />
            <span>Attach Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
