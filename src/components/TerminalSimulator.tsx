import React, { useState, useEffect } from 'react';
import { Terminal as TermIcon, Play, Copy, Check, RotateCcw, Monitor, ShieldCheck } from 'lucide-react';
import { calculateCombination, calculateFactorial, formatBigInt } from '../utils/mathUtils';

interface TerminalSimulatorProps {
  n: number;
  r: number;
  setN: (val: number) => void;
  setR: (val: number) => void;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({ n, r, setN, setR }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [localN, setLocalN] = useState<number>(n);
  const [localR, setLocalR] = useState<number>(r);
  const [outputLines, setOutputLines] = useState<string[]>([]);

  const generateOutput = (valN: number, valR: number) => {
    const lines: string[] = [];
    lines.push('$ javac KombinasyonHesaplayici.java');
    lines.push('$ java KombinasyonHesaplayici');
    lines.push('==================================================');
    lines.push('  JAVA FAKTÖRİYEL VE KOMBİNASYON HESAPLAYICI');
    lines.push('  Geliştirici & İmza: Enes Öztürk');
    lines.push('==================================================');
    lines.push(`Kümenin toplam eleman sayısını giriniz (n): ${valN}`);
    lines.push(`Oluşturulacak grubun eleman sayısını giriniz (r): ${valR}`);

    if (valN < 0 || valR < 0) {
      lines.push('');
      lines.push('HATA: Eleman sayıları negatif olamaz!');
      lines.push('==================================================');
      lines.push('  Program hata ile sonlandı. - Enes Öztürk');
      lines.push('==================================================');
      return lines;
    }

    if (valR > valN) {
      lines.push('');
      lines.push(`HATA: r sayısı (${valR}), n sayısından (${valN}) büyük olamaz! (r <= n olmalıdır)`);
      lines.push('==================================================');
      lines.push('  Program hata ile sonlandı. - Enes Öztürk');
      lines.push('==================================================');
      return lines;
    }

    const nFakt = calculateFactorial(valN);
    const rFakt = calculateFactorial(valR);
    const nMinusR = valN - valR;
    const nMinusRFakt = calculateFactorial(nMinusR);
    const payda = rFakt * nMinusRFakt;
    const sonuc = payda === 0n ? 0n : nFakt / payda;

    lines.push('');
    lines.push('------------- HESAPLAMA ADIMLARI -------------');
    lines.push(`n!      = ${valN}! = ${formatBigInt(nFakt)}`);
    lines.push(`r!      = ${valR}! = ${formatBigInt(rFakt)}`);
    lines.push(`(n-r)!  = (${valN}-${valR})! = ${nMinusR}! = ${formatBigInt(nMinusRFakt)}`);
    lines.push(`Formül  : C(${valN},${valR}) = ${valN}! / (${valR}! * (${valN}-${valR})!)`);
    lines.push(`Payda   : ${valR}! * ${nMinusR}! = ${formatBigInt(payda)}`);
    lines.push('----------------------------------------------');
    lines.push(`SONUÇ   : C(${valN},${valR}) = ${formatBigInt(sonuc)}`);
    lines.push(`${valN} elemanlı bir kümeden ${valR} elemanlı ${formatBigInt(sonuc)} farklı grup oluşturulabilir.`);
    lines.push('==================================================');
    lines.push('  Program başarıyla sonlandı. - Enes Öztürk');
    lines.push('==================================================');

    return lines;
  };

  useEffect(() => {
    setLocalN(n);
    setLocalR(r);
    setOutputLines(generateOutput(n, r));
  }, [n, r]);

  const handleRun = () => {
    setIsRunning(true);
    setN(localN);
    setR(localR);
    const all = generateOutput(localN, localR);
    setOutputLines([]);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setOutputLines(all.slice(0, current));
      if (current >= all.length) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 45);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Canlı Java Konsol Simülatörü</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                OpenJDK 21
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Java derleme (javac) ve çalıştırma (java) konsol çıktısını test edin.
            </p>
          </div>
        </div>

        {/* Console Inputs & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <span className="text-slate-400 font-mono">n:</span>
            <input
              type="number"
              min="0"
              max="50"
              value={localN}
              onChange={(e) => setLocalN(parseInt(e.target.value) || 0)}
              className="w-12 bg-transparent text-amber-300 font-mono font-bold focus:outline-none text-center"
            />
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-mono">r:</span>
            <input
              type="number"
              min="0"
              max="50"
              value={localR}
              onChange={(e) => setLocalR(parseInt(e.target.value) || 0)}
              className="w-12 bg-transparent text-blue-300 font-mono font-bold focus:outline-none text-center"
            />
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-md shadow-emerald-500/20 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Çalışıyor...' : 'Java Konsolunda Çalıştır'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Konsol Çıktısını Kopyala"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Realistic Terminal Window */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0c1017] shadow-2xl font-mono text-xs">
        {/* Terminal Titlebar */}
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-slate-400 text-[11px]">
              bash - enes-ozturk@dev-pc: ~/homework/java-kombinasyon
            </span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Enes Öztürk İmzalı Çözüm</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 min-h-[340px] max-h-[480px] overflow-y-auto space-y-1 text-slate-300 selection:bg-amber-400 selection:text-slate-950">
          {outputLines.map((line, idx) => {
            const isCommand = line.startsWith('$');
            const isHeader = line.includes('JAVA FAKTÖRİYEL') || line.includes('Geliştirici') || line.includes('Enes Öztürk');
            const isResult = line.startsWith('SONUÇ') || line.includes('farklı grup');
            const isError = line.startsWith('HATA');
            const isStep = line.includes('!') || line.includes('Formül');

            let textColor = 'text-slate-300';
            if (isCommand) textColor = 'text-sky-400 font-bold';
            else if (isHeader) textColor = 'text-amber-300 font-bold';
            else if (isResult) textColor = 'text-emerald-400 font-bold bg-emerald-950/30 px-1 rounded';
            else if (isError) textColor = 'text-rose-400 font-bold';
            else if (isStep) textColor = 'text-slate-200';

            return (
              <div key={idx} className={`${textColor} leading-relaxed whitespace-pre-wrap`}>
                {line}
              </div>
            );
          })}

          {isRunning && (
            <div className="flex items-center gap-2 text-amber-400 animate-pulse pt-2">
              <span className="w-2 h-4 bg-amber-400 inline-block" />
              <span>İşleniyor...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
