import React from 'react';
import { Triangle, Info } from 'lucide-react';
import { calculateCombination, formatBigInt } from '../utils/mathUtils';

interface PascalTriangleProps {
  selectedN: number;
  selectedR: number;
  onSelect: (n: number, r: number) => void;
}

export const PascalTriangle: React.FC<PascalTriangleProps> = ({
  selectedN,
  selectedR,
  onSelect,
}) => {
  const MAX_ROWS = 7; // 0 to 6 rows

  const rows: { n: number; items: { r: number; val: bigint }[] }[] = [];
  for (let n = 0; n <= MAX_ROWS; n++) {
    const items = [];
    for (let r = 0; r <= n; r++) {
      const res = calculateCombination(n, r);
      items.push({ r, val: res.combination });
    }
    rows.push({ n, items });
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Triangle className="w-5 h-5 text-amber-400" />
            <span>Pascal Üçgeni &amp; Kombinasyon Bağıntısı</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Pascal Üçgeni'nin n. satırının r. elemanı tam olarak C(n, r) kombinasyonuna eşittir.
          </p>
        </div>

        <div className="text-xs text-amber-400 font-mono bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
          C(n, r) = C(n, n-r)
        </div>
      </div>

      {/* The Pyramid */}
      <div className="overflow-x-auto py-2">
        <div className="min-w-[420px] flex flex-col items-center space-y-2">
          {rows.map((row) => (
            <div key={row.n} className="flex items-center justify-center gap-1.5 sm:gap-2">
              <span className="w-8 text-[11px] font-mono text-slate-500 text-right pr-2 select-none">
                n={row.n}
              </span>
              {row.items.map((item) => {
                const isSelected = row.n === selectedN && item.r === selectedR;
                const isSymmetric = row.n === selectedN && item.r === row.n - selectedR && item.r !== selectedR;

                return (
                  <button
                    key={item.r}
                    onClick={() => onSelect(row.n, item.r)}
                    title={`C(${row.n}, ${item.r}) = ${formatBigInt(item.val)}`}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center border ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 border-amber-300 scale-110 shadow-lg shadow-amber-400/40 ring-2 ring-amber-400 z-10'
                        : isSymmetric
                        ? 'bg-amber-900/40 text-amber-300 border-amber-500/50'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    {formatBigInt(item.val)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Explanation Footer */}
      <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-slate-300">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Kombinasyonun Temel Özellikleri:</span>
        </div>
        <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] text-slate-400">
          <li><strong>C(n, 0) = 1:</strong> Sıfır elemanlı boş küme her kümenin 1 tane vardır.</li>
          <li><strong>C(n, n) = 1:</strong> Kümenin tüm elemanlarını içeren tek bir küme vardır.</li>
          <li><strong>C(n, 1) = n:</strong> n elemandan 1 eleman tam n farklı şekilde seçilebilir.</li>
          <li><strong>Simetri Kuralı:</strong> C(n, r) = C(n, n - r) (Örneğin: C(7, 3) = C(7, 4) = 35).</li>
        </ul>
      </div>
    </div>
  );
};
