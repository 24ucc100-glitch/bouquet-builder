import React from 'react';
import { FLOWERS_DATA } from '../data/flowersData';
import { Layers, ArrowUp, ArrowDown, Trash2, Copy, Eye, EyeOff } from 'lucide-react';

export const LayerInspector = ({
  items = [],
  selectedId,
  onSelectItem,
  onUpdateItem,
  onRemoveItem,
  onDuplicateItem
}) => {
  const getFlowerName = (flowerId) => {
    const found = FLOWERS_DATA.find(f => f.id === flowerId);
    return found ? found.name : flowerId;
  };

  const moveLayer = (id, direction) => {
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return;
    const targetIdx = direction === 'up' ? idx + 1 : idx - 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;

    // Swap Z-Index values
    const itemA = items[idx];
    const itemB = items[targetIdx];
    const currentZA = itemA.customZIndex || 30;
    const currentZB = itemB.customZIndex || 30;

    onUpdateItem(itemA.id, { customZIndex: currentZB + (direction === 'up' ? 1 : -1) });
    onUpdateItem(itemB.id, { customZIndex: currentZA });
  };

  return (
    <div className="w-64 h-full glass-panel flex flex-col border-r border-white/10 rounded-2xl overflow-hidden">
      <div className="p-3 border-b border-white/10 flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
            Layer Hierarchy
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
          {items.length} Layers
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {items.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-400">
            No items in bouquet. Select flowers from library to add.
          </div>
        ) : (
          items.map((item, index) => {
            const isSelected = selectedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className={`p-2.5 rounded-xl glass-card flex items-center justify-between cursor-pointer border transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400/15 text-amber-200'
                    : 'border-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-[10px] font-mono text-slate-400 w-4">
                    #{items.length - index}
                  </span>
                  <span className="text-xs font-medium truncate max-w-[110px]">
                    {getFlowerName(item.flowerId)}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Move Up Layer */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLayer(item.id, 'up');
                    }}
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                    title="Bring Layer Forward"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  {/* Move Down Layer */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLayer(item.id, 'down');
                    }}
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                    title="Send Layer Backward"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                  {/* Duplicate */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicateItem(item);
                    }}
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-amber-300"
                    title="Duplicate Item"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveItem(item.id);
                    }}
                    className="p-1 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
