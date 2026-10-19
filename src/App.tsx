/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Calculator as CalcIcon,
  Code2,
  Terminal,
  Triangle,
  Award,
  BookOpen,
  FileText,
  Sparkles,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Calculator } from './components/Calculator';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { VisualCombinations } from './components/VisualCombinations';
import { PascalTriangle } from './components/PascalTriangle';
import { HomeworkReportModal } from './components/HomeworkReportModal';
import { Footer } from './components/Footer';
import { JAVA_CODE_SNIPPETS } from './data/javaCodes';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calc' | 'code' | 'terminal' | 'pascal'>('calc');
  const [n, setN] = useState<number>(7);
  const [r, setR] = useState<number>(3);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Standard code download handler
  const handleDownloadStandardCode = () => {
    const snippet = JAVA_CODE_SNIPPETS[0];
    const blob = new Blob([snippet.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = snippet.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        onOpenReport={() => setIsReportOpen(true)}
        onDownloadStandardCode={handleDownloadStandardCode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Assignment Brief Card */}
        <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                Ödev Metni
              </span>
              <span className="text-xs text-amber-300 font-mono font-semibold">
                C(n, r) = n! / (r! * (n - r)!)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              &ldquo;N elemanlı bir kümenin elemanları ile oluşturulacak r elemanlı farklı grupların sayısı n’in r’li kombinasyonu olarak adlandırılır. N’in r’li kombinasyonu C(n,r) şeklinde gösterilir. Java ile kombinasyon hesaplayan program yazınız. <strong>Enes Öztürk imzalı olsun.</strong>&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsReportOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition active:scale-95 shadow-md shadow-amber-500/20"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ödev Raporu / Teslim Belgesi</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('calc')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'calc'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <CalcIcon className="w-4 h-4" />
            <span>Hesaplayıcı &amp; Matematik</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Java Kaynak Kodları (4 Farklı Çözüm)</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'terminal'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Canlı Java Konsolu (Terminal)</span>
          </button>

          <button
            onClick={() => setActiveTab('pascal')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'pascal'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Triangle className="w-4 h-4" />
            <span>Pascal Üçgeni &amp; Teori</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'calc' && (
          <div className="space-y-8 animate-fadeIn">
            <Calculator
              n={n}
              r={r}
              setN={setN}
              setR={setR}
              onRunInTerminal={() => setActiveTab('terminal')}
            />
            {/* Visual Representation of Combinations */}
            <VisualCombinations n={n} r={r} />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="animate-fadeIn">
            <JavaCodeViewer />
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="space-y-6 animate-fadeIn">
            <TerminalSimulator n={n} r={r} setN={setN} setR={setR} />
          </div>
        )}

        {activeTab === 'pascal' && (
          <div className="space-y-8 animate-fadeIn">
            <PascalTriangle
              selectedN={n}
              selectedR={r}
              onSelect={(newN, newR) => {
                setN(newN);
                setR(newR);
              }}
            />
            {/* Additional Educational Guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Kombinasyon ile Permütasyon Arasındaki Fark</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Permütasyon P(n, r):</strong> Sıralama (diziliş) önemlidir. Örneğin bir yarışmada ilk 3 dereceye gireceklerin belirlenmesi permütasyondur: P(n, r) = n! / (n-r)!
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Kombinasyon C(n, r):</strong> Sadece küme seçimi önemlidir, elemanların hangi sırada seçildiği sonucu değiştirmez. Sıralama önemsiz olduğu için permütasyon sonucu r! değerine bölünür: C(n, r) = P(n, r) / r! = n! / (r! * (n-r)!)
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Faktöriyel Neden Hızla Büyür?</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Faktöriyel fonksiyonu üstel büyümeden bile daha hızlı artar.
                </p>
                <div className="font-mono text-xs text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div>5! = 120</div>
                  <div>10! = 3.628.800</div>
                  <div>20! = 2.432.902.008.176.640.000 (Java long sınırı)</div>
                  <div>21! =&gt; long taşması (BigInteger gerekir!)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Homework Report Modal */}
      <HomeworkReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        n={n}
        r={r}
      />

      {/* Footer with Enes Öztürk Signature */}
      <Footer
        onOpenReport={() => setIsReportOpen(true)}
        onDownloadStandardCode={handleDownloadStandardCode}
      />
    </div>
  );
}
