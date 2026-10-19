import React from 'react';
import { Award, Terminal, Code2, Heart } from 'lucide-react';

interface FooterProps {
  onOpenReport: () => void;
  onDownloadStandardCode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReport, onDownloadStandardCode }) => {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-lg">
              ☕
            </div>
            <div>
              <div className="font-bold text-white text-base">
                Java Faktöriyel ve Kombinasyon Hesaplayıcı
              </div>
              <p className="text-xs text-slate-400">
                Formül: C(n, r) = n! / (r! * (n - r)!)
              </p>
            </div>
          </div>

          {/* Prominent Signature Badge */}
          <div className="flex items-center gap-3 bg-slate-900 border border-amber-500/30 rounded-2xl p-4 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                Ödev Hazırlayan &amp; İmza Sahibi
              </div>
              <div className="text-base font-extrabold text-amber-300 font-sans">
                Enes Öztürk
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Enes Öztürk — Java Ödev Çözüm Projesi. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenReport}
              className="hover:text-amber-400 transition underline underline-offset-2"
            >
              Ödev Teslim Formu
            </button>
            <span>•</span>
            <button
              onClick={onDownloadStandardCode}
              className="hover:text-amber-400 transition underline underline-offset-2"
            >
              KombinasyonHesaplayici.java İndir
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
