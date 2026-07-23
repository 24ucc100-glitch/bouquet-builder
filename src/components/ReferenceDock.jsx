import React, { useState } from 'react';
import { Camera, Upload, Sparkles, Eye, EyeOff, Layers, Check, X } from 'lucide-react';
import { FLOWERS_DATA } from '../data/flowersData';

export const ReferenceDock = ({
  referenceImage,
  onUploadReference,
  onAutoMatchReference,
  isSplitView,
  onToggleSplitView
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUploadReference(url);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUploadReference(url);
    }
  };

  return (
    <div className="p-4 space-y-4 text-slate-100">
      <div className="flex items-center gap-2">
        <Camera className="w-5 h-5 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-200">
          Reference Bouquet Dock
        </h3>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        Upload any reference bouquet image to compare side-by-side or auto-extract matching flowers, greenery, wrap, and ribbons!
      </p>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
          dragOver ? 'border-amber-400 bg-amber-400/10' : 'border-white/15 bg-black/40 hover:border-amber-400/50'
        }`}
      >
        {referenceImage ? (
          <div className="space-y-3">
            <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <img src={referenceImage} alt="Reference Bouquet" className="w-full h-full object-cover" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUploadReference(null);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
                title="Remove Reference"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onToggleSplitView}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  isSplitView
                    ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                    : 'border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {isSplitView ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{isSplitView ? 'Hide Split View' : 'Show Side-by-Side'}</span>
              </button>
              <button
                onClick={onAutoMatchReference}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-102 transition-transform"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto Match</span>
              </button>
            </div>
          </div>
        ) : (
          <label className="cursor-pointer space-y-2 block">
            <Upload className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
            <div className="text-xs font-bold text-slate-200">
              Drag & Drop Reference Image
            </div>
            <div className="text-[10px] text-slate-400">or click to browse JPG, PNG, WebP</div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};
