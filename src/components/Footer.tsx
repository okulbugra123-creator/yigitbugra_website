import React from 'react';
import { Sparkles, Terminal, Code2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-stone-950 border-t border-red-950/80 pt-12 pb-24 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-800/80">
          
          {/* Logo & Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-800 to-stone-950 border border-red-700/80 flex items-center justify-center font-mono font-black text-amber-400 text-xs shadow-md">
              Y.P
            </div>
            <div>
              <span className="text-sm font-bold text-stone-100 block">Yiğit Poyraz</span>
              <span className="text-[11px] text-amber-500/80 font-mono">30 Haftalık Web Uygulama Portalı</span>
            </div>
          </div>

          {/* Quick Info & Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-400">
            <span>30 Hafta / 30 Canlı Uygulama</span>
            <span className="text-stone-700" aria-hidden="true">·</span>
            <span>Koyu Kırmızı & Altın Sarı Paleti</span>
            <span className="text-stone-700" aria-hidden="true">·</span>
            <span>TypeScript & React 19</span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Yiğit Poyraz. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-1">
            <span>Tasarım & Geliştirme:</span>
            <strong className="text-amber-400 font-semibold">Yiğit Poyraz</strong>
          </div>
        </div>

      </div>
    </footer>
  );
};
