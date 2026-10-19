import React from 'react';
import { Terminal, Award, FileText, Download, Code2, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenReport: () => void;
  onDownloadStandardCode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReport, onDownloadStandardCode }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-mono font-black text-lg">
            ☕
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight text-base sm:text-lg flex items-center gap-1.5">
                Java <span className="text-amber-400 font-mono">C(n,r)</span> Kombinasyon
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Java 17+
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans hidden sm:block">
              Faktöriyel &amp; Kombinasyon Hesaplama Programı
            </p>
          </div>
        </div>

        {/* Right: Signature Badge & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Enes Öztürk Signature Badge */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 border border-amber-500/30 rounded-full px-3 py-1 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="text-left">
              <div className="text-[10px] text-slate-400 leading-none">Geliştirici &amp; İmza</div>
              <div className="text-xs font-bold text-amber-300 leading-tight flex items-center gap-1">
                <span>Enes Öztürk</span>
                <Award className="w-3.5 h-3.5 text-amber-400 inline" />
              </div>
            </div>
          </div>

          {/* Quick Ödev Raporu Button */}
          <button
            onClick={onOpenReport}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Ödev Teslim Belgesi ve Raporunu Görüntüle"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Ödev Raporu</span>
          </button>

          {/* Download Java File */}
          <button
            onClick={onDownloadStandardCode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition active:scale-95"
            title="KombinasyonHesaplayici.java dosyasını indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">.java İndir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
