import React, { useState } from 'react';
import { Eye, Layers, Sparkles, HelpCircle } from 'lucide-react';
import { generateCombinationsList } from '../utils/mathUtils';

interface VisualCombinationsProps {
  n: number;
  r: number;
}

export const VisualCombinations: React.FC<VisualCombinationsProps> = ({ n, r }) => {
  // Demo dataset of items
  const DEFAULT_ITEMS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const [activeSubset, setActiveSubset] = useState<number | null>(null);

  // If n is too large (> 10), we cap visual presentation to avoid freezing
  const effectiveN = Math.min(10, Math.max(1, n));
  const effectiveR = Math.min(effectiveN, Math.max(0, r));

  const currentElements = DEFAULT_ITEMS.slice(0, effectiveN);
  const subsets = generateCombinationsList(currentElements, effectiveR);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-amber-400" />
            <span>Kümeler ve Alt Gruplar Görselleştiricisi</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Kombinasyon, kümeden seçilen elemanların sırasız tüm farklı gruplarıdır.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-300 font-mono font-bold border border-amber-400/20">
            C({effectiveN}, {effectiveR}) = {subsets.length} Alt Küme
          </span>
          {n > 10 && (
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-1 rounded border border-amber-800/60">
              (Görsel demo için n=10 ile sınırlandı)
            </span>
          )}
        </div>
      </div>

      {/* Main Set Display */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Ana Küme S (n = {effectiveN} eleman):</span>
          <span className="text-[11px] text-slate-500 font-mono">
            S = &#123; {currentElements.join(', ')} &#125;
          </span>
        </div>
        <div className="flex flex-wrap gap-2 p-3.5 bg-slate-950 rounded-xl border border-slate-800">
          {currentElements.map((item, idx) => {
            const isHighlighted =
              activeSubset !== null &&
              subsets[activeSubset] &&
              subsets[activeSubset].includes(item);

            return (
              <div
                key={idx}
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-200 border ${
                  isHighlighted
                    ? 'bg-amber-400 text-slate-950 border-amber-300 scale-110 shadow-lg shadow-amber-400/40 ring-2 ring-amber-400'
                    : 'bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>

      {/* Generated Subsets Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-semibold">
            Oluşturulan {effectiveR} Elemanlı Tüm Alt Kümeler:
          </span>
          <span className="text-[11px] text-slate-400">
            (Üzerine gelerek ana kümedeki elemanları vurgulayın)
          </span>
        </div>

        {subsets.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 bg-slate-950 rounded-xl">
            r &gt; n olduğu için hiçbir alt küme oluşturulamaz.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-[280px] overflow-y-auto p-1">
            {subsets.map((subset, idx) => {
              const isSelected = activeSubset === idx;
              return (
                <button
                  key={idx}
                  onMouseEnter={() => setActiveSubset(idx)}
                  onMouseLeave={() => setActiveSubset(null)}
                  className={`p-2 rounded-xl border text-left font-mono text-xs transition duration-150 flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-500 font-sans mr-1">{idx + 1}.</span>
                  <span className="font-bold text-white">
                    &#123;{subset.length > 0 ? subset.join(', ') : '∅'}&#125;
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong>Permütasyon ile Fark:</strong> Kombinasyonda sıralama önemsizdir. Yani &#123;A, B&#125; ile &#123;B, A&#125; aynı gruptur ve sadece 1 kez sayılır.
        </span>
      </div>
    </div>
  );
};
