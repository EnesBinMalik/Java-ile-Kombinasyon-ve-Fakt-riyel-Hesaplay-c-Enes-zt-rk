import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateCombination, formatBigInt } from '../utils/mathUtils';
import { CombinationResult } from '../types';

interface CalculatorProps {
  n: number;
  r: number;
  setN: (val: number) => void;
  setR: (val: number) => void;
  onRunInTerminal?: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({
  n,
  r,
  setN,
  setR,
  onRunInTerminal,
}) => {
  const [result, setResult] = useState<CombinationResult>(calculateCombination(n, r));

  useEffect(() => {
    const res = calculateCombination(n, r);
    setResult(res);
  }, [n, r]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#ec4899'],
    });
  };

  const PRESETS = [
    { n: 5, r: 2, label: 'C(5, 2) = 10', desc: '5 kişilik gruptan 2 temsilci seçimi' },
    { n: 7, r: 3, label: 'C(7, 3) = 35', desc: 'Ödev Örneği: 7 elemandan 3\'lü gruplar' },
    { n: 10, r: 4, label: 'C(10, 4) = 210', desc: '10 öğrenciden 4 kişilik münazara takımı' },
    { n: 8, r: 0, label: 'C(8, 0) = 1', desc: 'Boş küme seçimi (Her zaman 1)' },
    { n: 6, r: 6, label: 'C(6, 6) = 1', desc: 'Tüm kümenin kendisi (Her zaman 1)' },
    { n: 12, r: 5, label: 'C(12, 5) = 792', desc: '12 üyeli heyetten 5 kişilik alt komisyon' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Formal Formula Description */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30">
              <CalcIcon className="w-3.5 h-3.5" />
              <span>Matematiksel Tanım &amp; Formül</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              C(n, r) Kombinasyon Hesaplayıcı
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              <strong className="text-amber-400 font-semibold">N</strong> elemanlı bir kümenin elemanları ile oluşturulacak <strong className="text-amber-400 font-semibold">r</strong> elemanlı farklı grupların sayısı <strong className="text-white">n'in r'li kombinasyonu</strong> olarak adlandırılır.
            </p>
          </div>

          {/* Golden Math Formula Box */}
          <div className="bg-slate-950/80 backdrop-blur border border-amber-500/40 rounded-xl p-4 shadow-xl text-center min-w-[260px]">
            <div className="text-[11px] font-mono text-amber-300 uppercase tracking-widest mb-1">
              Kombinasyon Formülü
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400 flex items-center justify-center gap-2">
              <span>C(n, r) =</span>
              <div className="inline-flex flex-col items-center justify-center text-center">
                <span className="border-b border-amber-400 px-2 pb-0.5">n!</span>
                <span className="pt-0.5 text-base sm:text-lg">r! × (n - r)!</span>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-slate-400 border-t border-slate-800 pt-1">
              Enes Öztürk Ödev Çözüm Standardı
            </div>
          </div>
        </div>
      </div>

      {/* Inputs & Quick Presets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Number Controls (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Girdi Değerleri</span>
            </h2>
            <span className="text-xs text-slate-400">n ≥ r ≥ 0</span>
          </div>

          {/* n Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="n-input" className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-amber-400/20 text-amber-300 font-mono text-xs flex items-center justify-center font-bold">n</span>
                <span>Kümenin Eleman Sayısı (n):</span>
              </label>
              <span className="text-xs font-mono text-amber-400 font-bold">n = {n}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setN(Math.max(0, n - 1))}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-lg flex items-center justify-center transition border border-slate-700 active:scale-95"
                title="1 Azalt"
              >
                -
              </button>
              <input
                id="n-input"
                type="number"
                min="0"
                max="100"
                value={n}
                onChange={(e) => setN(parseInt(e.target.value) || 0)}
                className="flex-1 h-10 px-4 bg-slate-950 border border-slate-700 rounded-xl text-center font-mono font-bold text-white text-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
              />
              <button
                type="button"
                onClick={() => setN(Math.min(100, n + 1))}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-lg flex items-center justify-center transition border border-slate-700 active:scale-95"
                title="1 Artır"
              >
                +
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={Math.min(20, n)}
              onChange={(e) => setN(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* r Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="r-input" className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-blue-500/20 text-blue-300 font-mono text-xs flex items-center justify-center font-bold">r</span>
                <span>Grup / Alt Küme Eleman Sayısı (r):</span>
              </label>
              <span className="text-xs font-mono text-blue-400 font-bold">r = {r}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setR(Math.max(0, r - 1))}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-lg flex items-center justify-center transition border border-slate-700 active:scale-95"
                title="1 Azalt"
              >
                -
              </button>
              <input
                id="r-input"
                type="number"
                min="0"
                max={n}
                value={r}
                onChange={(e) => setR(parseInt(e.target.value) || 0)}
                className="flex-1 h-10 px-4 bg-slate-950 border border-slate-700 rounded-xl text-center font-mono font-bold text-white text-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              />
              <button
                type="button"
                onClick={() => setR(r + 1)}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-lg flex items-center justify-center transition border border-slate-700 active:scale-95"
                title="1 Artır"
              >
                +
              </button>
            </div>
            <input
              type="range"
              min="0"
              max={Math.max(1, Math.min(20, n))}
              value={Math.min(20, r)}
              onChange={(e) => setR(parseInt(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Quick Örnekler / Presets */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
              Örnek Kombinasyon Senaryoları:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setN(p.n);
                    setR(p.r);
                    triggerCelebration();
                  }}
                  className={`text-left p-2 rounded-lg border text-xs transition ${
                    n === p.n && r === p.r
                      ? 'bg-amber-500/20 border-amber-400/50 text-amber-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="font-mono font-bold text-amber-300">{p.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Calculation Result & Mathematical Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Result Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            {result.isValid ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Hesaplama Başarılı
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      C({result.n}, {result.r})
                    </span>
                  </div>

                  {onRunInTerminal && (
                    <button
                      onClick={onRunInTerminal}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold underline underline-offset-4 decoration-amber-500/40"
                    >
                      <span>Konsolda Görüntüle</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="bg-slate-950/90 rounded-xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                      Farklı Grup Sayısı (Kombinasyon)
                    </div>
                    <div className="text-4xl sm:text-5xl font-black font-mono text-amber-400 tracking-tight mt-1">
                      {formatBigInt(result.combination)}
                    </div>
                  </div>

                  <div className="flex flex-col items-center sm:items-end text-xs text-slate-400 space-y-1">
                    <div className="font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-200">
                      n = {result.n} | r = {result.r} | (n-r) = {result.nMinusR}
                    </div>
                    <span className="text-[11px] text-slate-500 italic">
                      İmza: Enes Öztürk
                    </span>
                  </div>
                </div>

                {/* Natural Language Meaning */}
                <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                  💡 <strong>Anlamı:</strong> <span className="underline decoration-amber-400 font-semibold">{result.n}</span> elemandan oluşan bir kümeden, sırası önemsiz olacak şekilde <span className="underline decoration-amber-400 font-semibold">{result.r}</span> elemanlı tam <strong className="text-amber-300 font-bold">{formatBigInt(result.combination)}</strong> farklı alt küme veya grup oluşturulabilir.
                </div>
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-red-400">Matematiksel Kural İhlali</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">{result.errorMessage}</p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setN(7);
                      setR(3);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold inline-flex items-center gap-1.5 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ödev Varsayılanına Dön: C(7, 3)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Step-by-Step Mathematical Expansion */}
          {result.isValid && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Adım Adım Matematiksel Çözüm Açılımı</span>
              </h3>

              <div className="space-y-3">
                {result.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition"
                  >
                    <div className="font-semibold text-xs text-amber-400 mb-1">
                      {step.title}
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{step.description}</p>
                    <div className="font-mono text-xs sm:text-sm bg-slate-900 p-3 rounded-lg border border-slate-800 text-emerald-400 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                      {step.math}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
