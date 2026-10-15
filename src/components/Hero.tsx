import React from 'react';
import { CategoryType } from '../types';
import { Search, Sparkles, Filter, Star, Code, Cpu, Award } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  categories: CategoryType[];
  selectedRange: 'all' | '1-10' | '11-20' | '21-30' | '31-38';
  onSelectRange: (range: 'all' | '1-10' | '11-20' | '21-30' | '31-38') => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  favoritesCount: number;
  customLinksCount: number;
  linkFilter: 'all' | 'with-link' | 'empty';
  onSelectLinkFilter: (filter: 'all' | 'with-link' | 'empty') => void;
  onOpenBatchManager: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  selectedRange,
  onSelectRange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount,
  customLinksCount,
  linkFilter,
  onSelectLinkFilter,
  onOpenBatchManager
}) => {
  return (
    <section className="relative pt-10 pb-12 overflow-hidden border-b border-red-950/70">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-red-900/20 via-red-950/30 to-amber-500/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle / Kicker */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400/90 font-mono">
            Yiğit Poyraz Mühendislik Portalı
          </span>
          <span className="text-stone-600" aria-hidden="true">·</span>
          <span className="text-xs text-stone-400 font-mono">2026 Sürümü</span>
        </div>

        {/* Main Hero Headline */}
        <div className="max-w-3xl mb-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-100 leading-[1.15]" style={{ textWrap: 'balance' }}>
            38 Haftalık Modern Web Uygulamaları ve Kod Ekosistemi
          </h1>
          <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
            Yiğit Poyraz tarafından her hafta için özel olarak kurgulanan 38 fonksiyonel web uygulaması.
            Koyu kırmızı ve asil sarı temasıyla tasarlanan bu arayüzde dilediğiniz haftayı başlatabilir ve anında deneyimleyebilirsiniz.
          </p>
        </div>

        {/* Stat Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-3.5 rounded-xl bg-stone-900/60 border border-red-950/80">
            <span className="text-[11px] text-stone-400 block font-medium">Toplam Hafta</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-mono font-bold text-amber-400">38</span>
              <span className="text-xs text-stone-400 font-medium">Hafta</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-900/60 border border-red-950/80">
            <span className="text-[11px] text-stone-400 block font-medium">Kendi Proje Linkleriniz</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-mono font-bold text-emerald-400">{customLinksCount}</span>
              <span className="text-xs text-stone-400 font-medium">/ 38 Ekli</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-900/60 border border-red-950/80">
            <span className="text-[11px] text-stone-400 block font-medium">Boş Bekleyen</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-mono font-bold text-stone-400">{38 - customLinksCount}</span>
              <span className="text-xs text-stone-400 font-medium">Proje Alanı</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-900/60 border border-red-950/80 flex flex-col justify-between">
            <span className="text-[11px] text-stone-400 block font-medium">Hızlı Düzenleme</span>
            <button
              onClick={onOpenBatchManager}
              className="mt-1 flex items-center justify-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded text-xs font-bold transition-colors"
            >
              <span>Tüm Linkleri Düzenle</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls Toolbar */}
        <div className="p-4 rounded-xl bg-stone-950/90 border border-red-950/80 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Uygulama adı, hafta (örn: Hafta 01 veya Hafta 38) veya teknoloji ara..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-900/90 rounded-lg border border-red-950/80 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/40 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-300 font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Range Selector & Favorites Toggle */}
            <div className="flex items-center gap-2">
              {/* Range Tabs */}
              <div className="flex items-center gap-1 p-1 bg-stone-900 rounded-lg border border-red-950/80 text-xs">
                {(['all', '1-10', '11-20', '21-30', '31-38'] as const).map((r) => {
                  const label = r === 'all' ? 'Tümü' : `${r}. Hafta`;
                  const active = selectedRange === r;
                  return (
                    <button
                      key={r}
                      onClick={() => onSelectRange(r)}
                      className={`px-2.5 py-1.5 rounded-md font-semibold text-[11px] transition-colors whitespace-nowrap ${
                        active 
                          ? 'bg-gradient-to-r from-red-800 to-amber-600 text-amber-100 shadow-sm' 
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Link Filter Tabs (Tümü, Link Eklenenler, Boş Bekleyenler) */}
              <div className="flex items-center gap-1 p-1 bg-stone-900 rounded-lg border border-red-950/80 text-xs">
                {(['all', 'with-link', 'empty'] as const).map((lf) => {
                  const label = lf === 'all' ? 'Tüm Linkler' : lf === 'with-link' ? 'Link Ekli' : 'Boş';
                  const active = linkFilter === lf;
                  return (
                    <button
                      key={lf}
                      onClick={() => onSelectLinkFilter(lf)}
                      className={`px-2.5 py-1.5 rounded-md font-semibold text-[11px] transition-colors whitespace-nowrap ${
                        active 
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-sm' 
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Favorites Filter */}
              <button
                onClick={onToggleFavoritesOnly}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${
                  showFavoritesOnly
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300 shadow-md'
                    : 'bg-stone-900 border-red-950/80 text-stone-400 hover:text-stone-200'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span className="hidden sm:inline">Favoriler</span>
                <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-stone-800 text-stone-300">
                  {favoritesCount}
                </span>
              </button>
            </div>

          </div>

          {/* Category Horizontal Filter Scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <span className="text-stone-500 text-[11px] mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3 text-red-500" />
              Kategori:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1 rounded-md font-medium text-xs whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
