import React from 'react';
import { Sparkles, Layers, Code2, Award, ExternalLink } from 'lucide-react';

interface HeaderProps {
  onRandomLaunch: () => void;
  onOpenBatchManager: () => void;
  activeCount: number;
  customLinksCount: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  onRandomLaunch, 
  onOpenBatchManager, 
  activeCount, 
  customLinksCount 
}) => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-stone-950/85 border-b border-red-950/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Zone 1: Logo & Brand Lockup (Sol Üst Y.P Logosu & Yiğit Poyraz) */}
        <div className="flex items-center gap-3.5 shrink-0">
          <a href="#" className="flex items-center gap-3 group">
            {/* Y.P Custom Monogram Logo */}
            <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-800 via-red-950 to-stone-950 border border-red-700/80 shadow-[0_0_15px_rgba(153,27,27,0.4)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:border-amber-500/80 transition-all duration-300">
              <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-400 to-amber-500 text-base tracking-tighter drop-shadow-sm select-none">
                Y.P
              </span>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-stone-950" />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors whitespace-nowrap">
                Yiğit Poyraz
              </span>
              <span className="text-[11px] font-medium tracking-wide text-amber-500/90 uppercase whitespace-nowrap">
                30 Haftalık Uygulama Portalı
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Single-line, clean typography) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-300">
          <a 
            href="#apps-section" 
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-red-500" />
            Tüm Uygulamalar ({activeCount})
          </a>
          <a 
            href="#curriculum-section" 
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Code2 className="w-3.5 h-3.5 text-amber-500" />
            30 Haftalık Plan
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenBatchManager}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-amber-500/50 hover:border-amber-400 text-amber-400 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0"
            title="Tüm 30 Haftanın Linklerini Düzenle"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Linkleri Yönet ({customLinksCount}/30)</span>
          </button>
          
          <button
            onClick={onRandomLaunch}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-red-700 via-red-800 to-amber-600 hover:from-red-600 hover:to-amber-500 text-amber-100 rounded-lg text-xs font-bold shadow-lg shadow-red-950/60 hover:shadow-amber-500/20 transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Rastgele Aç</span>
          </button>
        </div>

      </div>
    </header>
  );
};
