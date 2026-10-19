import React, { useState } from 'react';
import { Code2, Copy, Check, Download, FileCode, CheckCircle, Lightbulb } from 'lucide-react';
import { JAVA_CODE_SNIPPETS } from '../data/javaCodes';

export const JavaCodeViewer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(JAVA_CODE_SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);

  const activeSnippet =
    JAVA_CODE_SNIPPETS.find((s) => s.id === selectedId) || JAVA_CODE_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeSnippet.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeSnippet.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = activeSnippet.code.split('\n');

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {JAVA_CODE_SNIPPETS.map((snippet) => {
          const isActive = snippet.id === activeSnippet.id;
          return (
            <button
              key={snippet.id}
              onClick={() => setSelectedId(snippet.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs whitespace-nowrap transition border ${
                isActive
                  ? 'bg-amber-500/15 border-amber-400 text-amber-300 font-bold shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileCode className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{snippet.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-amber-400/20 text-amber-200' : 'bg-slate-800 text-slate-500'
                }`}
              >
                {snippet.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Code Header & Info */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-white text-base">
                {activeSnippet.fileName}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Enes Öztürk İmzalı
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">{activeSnippet.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{activeSnippet.fileName} İndir</span>
            </button>
          </div>
        </div>

        {/* Bullet Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-800">
          {activeSnippet.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Display with Line Numbers */}
      <div className="rounded-2xl border border-slate-800 bg-[#0d1117] overflow-hidden shadow-2xl font-mono text-xs sm:text-[13px]">
        {/* Editor Tab Bar */}
        <div className="bg-[#161b22] px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="text-slate-300 font-semibold">{activeSnippet.fileName}</span>
            <span className="text-slate-500 text-xs">({lines.length} satır)</span>
          </div>
          <span className="text-[11px] text-amber-400 font-sans">
            Yazar: <strong>Enes Öztürk</strong>
          </span>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-6 overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => {
                const lineNum = idx + 1;
                const isComment =
                  line.trim().startsWith('//') ||
                  line.trim().startsWith('/*') ||
                  line.trim().startsWith('*');
                const isKeyword =
                  line.includes('public class') ||
                  line.includes('import ') ||
                  line.includes('return ') ||
                  line.includes('static ') ||
                  line.includes('void ') ||
                  line.includes('long ') ||
                  line.includes('int ');

                let lineStyle = 'text-slate-200';
                if (isComment) lineStyle = 'text-slate-500 italic';
                else if (line.includes('System.out.println') || line.includes('System.out.print'))
                  lineStyle = 'text-sky-300';
                else if (isKeyword) lineStyle = 'text-amber-200';

                return (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="w-10 pr-4 text-right text-slate-600 select-none text-[11px] align-top">
                      {lineNum}
                    </td>
                    <td className={`whitespace-pre ${lineStyle}`}>{line || ' '}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Java Code Logic Explanation Box */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Bu Java Kodunun Çalışma Mantığı &amp; Ödev Notları</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <strong className="text-amber-400 block mb-1">1. Faktöriyel Metodu:</strong>
            Faktöriyel hesabı n! = 1 × 2 × ... × n döngüsüyle yapılır. 0! ve 1! matematiksel olarak 1'dir. Negatif sayılarda faktöriyel tanımsızdır.
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <strong className="text-amber-400 block mb-1">2. Kombinasyon Mantığı:</strong>
            C(n,r) = n! / (r! * (n-r)!) formülüdür. Önce paydadaki r! ve (n-r)! çarpılır, ardından n! bu çarpıma bölünür.
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <strong className="text-amber-400 block mb-1">3. Veri Tipi Seçimi (long):</strong>
            int tipi en fazla 12! değerini taşır. Bu kodda faktöriyel sonuçları için 64-bitlik <code>long</code> tipi kullanılmıştır.
          </div>
        </div>
      </div>
    </div>
  );
};
