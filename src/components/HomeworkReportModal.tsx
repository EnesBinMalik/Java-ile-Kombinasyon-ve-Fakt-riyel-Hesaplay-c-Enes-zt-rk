import React, { useState } from 'react';
import { X, Printer, Copy, Check, Award, FileCheck } from 'lucide-react';
import { calculateCombination, calculateFactorial, formatBigInt } from '../utils/mathUtils';

interface HomeworkReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  n: number;
  r: number;
}

export const HomeworkReportModal: React.FC<HomeworkReportModalProps> = ({
  isOpen,
  onClose,
  n,
  r,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const result = calculateCombination(n, r);
  const nFakt = calculateFactorial(n);
  const rFakt = calculateFactorial(r);
  const nMinusR = n - r;
  const nMinusRFakt = calculateFactorial(Math.max(0, nMinusR));

  const reportText = `==================================================================
                 ÖDEV TESLİM RAPORU
==================================================================
Öğrenci / Geliştirici : Enes Öztürk
Ders                  : Java Programlama / Algoritmalar
Ödev Konusu           : Faktöriyel ve Kombinasyon Hesaplama Programı
Tarih                 : 19 Ekim 2026
İmza                  : Enes Öztürk
==================================================================

[1] ÖDEV TANIMI:
N elemanlı bir kümenin elemanları ile oluşturulacak r elemanlı 
farklı grupların sayısı n'in r'li kombinasyonu olarak adlandırılır. 
N'in r'li kombinasyonu C(n,r) şeklinde gösterilir.

[2] MATEMATİKSEL FORMÜL:
C(n, r) = n! / (r! * (n - r)!)

[3] ÖRNEK ÇALIŞMA VE HESAPLAMA (n = ${n}, r = ${r}):
- n!      = ${n}! = ${formatBigInt(nFakt)}
- r!      = ${r}! = ${formatBigInt(rFakt)}
- (n-r)!  = (${n}-${r})! = ${nMinusR}! = ${formatBigInt(nMinusRFakt)}
- Formül  : C(${n}, ${r}) = ${formatBigInt(nFakt)} / (${formatBigInt(rFakt)} * ${formatBigInt(nMinusRFakt)})
- Sonuç   : C(${n}, ${r}) = ${formatBigInt(result.combination)}

Açıklama: ${n} elemanlı bir kümeden ${r} elemanlı ${formatBigInt(result.combination)} farklı grup oluşturulabilir.

[4] KOD TASARIMI VE MANTIK:
- Java Scanner sınıfı ile kullanıcıdan pozitif tam sayı değerleri alınır.
- n >= r >= 0 mantıksal kontrolleri yapılır.
- faktöriyel hesabı 'faktoriyel(int sayi)' metoduyla döngüsel olarak hesaplanır.
- Formül pay ve payda hesaplanarak hatasız şekilde bölme işlemi yapılır.

==================================================================
Onay & İmza: Enes Öztürk
==================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Ödev Teslim Belgesi</h3>
              <p className="text-xs text-slate-400">Java Kombinasyon Ödevi Raporu</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Report Document */}
        <div className="p-6 overflow-y-auto space-y-5 font-sans">
          {/* Document Header Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-800/50 to-slate-800/30 border border-amber-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold block">
                Ödev Teslim Raporu
              </span>
              <h4 className="text-lg font-bold text-white">Java Kombinasyon Hesabı</h4>
              <p className="text-xs text-slate-300">C(n,r) = n! / (r! * (n-r)!)</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Geliştirici &amp; Öğrenci</div>
              <div className="text-sm font-bold text-amber-300 flex items-center justify-end gap-1">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Enes Öztürk</span>
              </div>
            </div>
          </div>

          {/* Formatted Text Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre leading-relaxed overflow-x-auto selection:bg-amber-400 selection:text-slate-950">
            {reportText}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-400 hidden sm:inline">
            İmza Sahibi: <strong className="text-white">Enes Öztürk</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır</span>
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı!' : 'Raporu Kopyala'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
