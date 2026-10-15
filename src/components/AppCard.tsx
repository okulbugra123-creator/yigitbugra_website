import React, { useState } from 'react';
import { WeeklyApp } from '../types';
import { 
  Play, Star, ExternalLink, Edit3, Github, 
  Link2, CheckCircle2, CircleDashed, Plus, Check, X, Copy, Lock
} from 'lucide-react';

interface AppCardProps {
  app: WeeklyApp;
  onLaunch: (app: WeeklyApp) => void;
  onEdit: (app: WeeklyApp) => void;
  onQuickSaveUrl?: (appId: number, url: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  isAdmin?: boolean;
  onRequireAdmin?: (reason?: string) => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  onLaunch,
  onEdit,
  onQuickSaveUrl,
  isFavorite,
  onToggleFavorite,
  isAdmin = false,
  onRequireAdmin
}) => {
  const [isEditingInline, setIsEditingInline] = useState(false);
  const [inlineUrl, setInlineUrl] = useState(app.projectUrl || '');
  const [quickSaved, setQuickSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const hasLink = Boolean(app.projectUrl && app.projectUrl.trim() !== '');

  const handleStartEdit = () => {
    if (!isAdmin) {
      onRequireAdmin?.('Sitede herhangi bir değişiklik yapma, link ekleme veya yapıştırma yetkisi sadece Bugra (Yönetici) hesabına aittir.');
      return;
    }
    setIsEditingInline(true);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) {
      onRequireAdmin?.('Link kopyalama işlemi sadece Bugra (Yönetici) tarafından yapılabilir.');
      return;
    }
    if (app.projectUrl && app.projectUrl.trim()) {
      navigator.clipboard.writeText(app.projectUrl.trim());
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleOpenProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLink) {
      window.open(app.projectUrl, '_blank', 'noopener,noreferrer');
    } else {
      handleStartEdit();
    }
  };

  const handleSaveInline = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isAdmin) {
      onRequireAdmin?.('Değişiklikleri kaydetmek için yönetici girişi yapmalısınız.');
      return;
    }
    if (onQuickSaveUrl) {
      onQuickSaveUrl(app.id, inlineUrl.trim());
      setQuickSaved(true);
      setTimeout(() => {
        setQuickSaved(false);
        setIsEditingInline(false);
      }, 500);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-gradient-to-b from-stone-900/95 via-stone-950 to-stone-950 border border-red-950/80 hover:border-amber-500/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(120,19,36,0.35)] ring-1 ring-stone-900 hover:ring-amber-500/20">
      
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-red-800/40 to-transparent group-hover:via-amber-400/50 transition-all duration-300" />

      <div>
        {/* Header: Week Indicator & Status & Favorite Button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono font-bold text-amber-400 tracking-wider">
              {app.weekLabel}
            </span>
            <span className="text-stone-600" aria-hidden="true">·</span>
            <span className="text-stone-400 font-medium">
              {app.category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                if (!isAdmin) {
                  onRequireAdmin?.('Sitede proje detaylarını düzenleme yetkisi sadece Bugra (Yönetici) hesabına aittir.');
                  return;
                }
                onEdit(app);
              }}
              className="p-1.5 rounded-lg text-stone-500 hover:text-amber-300 hover:bg-stone-800/60 transition-colors"
              title={isAdmin ? "Ayrıntılı Düzenle (Başlık, Açıklama, GitHub)" : "Düzenlemek için Yönetici Girişi Yapın"}
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(app.id);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite 
                  ? 'text-amber-400 bg-amber-950/40 border border-amber-500/40' 
                  : 'text-stone-600 hover:text-stone-300 hover:bg-stone-800/50'
              }`}
              title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
              aria-label="Favori"
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1 mb-1.5">
          {app.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 mb-4">
          {app.description}
        </p>

        {/* Interactive Link Status & Fast Inline Input Box */}
        <div 
          className="mb-4 p-2.5 rounded-lg bg-stone-900/70 border border-red-950/80 transition-all"
          onCopy={(e) => {
            if (!isAdmin) {
              e.preventDefault();
              onRequireAdmin?.('Link kopyalama işlemi sadece Bugra (Yönetici) tarafından yapılabilir.');
            }
          }}
          onPaste={(e) => {
            if (!isAdmin) {
              e.preventDefault();
              onRequireAdmin?.('Link yapıştırma işlemi sadece Bugra (Yönetici) tarafından yapılabilir.');
            }
          }}
        >
          {isEditingInline ? (
            <form onSubmit={handleSaveInline} className="flex items-center gap-1.5">
              <input
                type="url"
                autoFocus
                value={inlineUrl}
                onChange={(e) => setInlineUrl(e.target.value)}
                placeholder="https://projeniz.com"
                className="flex-1 px-2.5 py-1 bg-stone-950 rounded border border-amber-500/80 text-amber-300 font-mono text-[11px] focus:outline-none"
              />
              <button
                type="submit"
                className="p-1.5 bg-gradient-to-r from-red-700 to-amber-600 text-amber-100 rounded hover:opacity-90 transition-opacity"
                title="Kaydet"
              >
                {quickSaved ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsEditingInline(false)}
                className="p-1.5 bg-stone-800 text-stone-400 rounded hover:text-stone-200"
                title="Vazgeç"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <div 
                className="flex items-center gap-1.5 truncate cursor-pointer select-none"
                onClick={handleStartEdit}
                title={isAdmin ? "Tıklayarak linki hızlıca değiştirin" : "Düzenlemek için Yönetici Girişi Yapın"}
              >
                {hasLink ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-mono text-amber-400 hover:underline truncate max-w-[150px] select-none">
                      {app.projectUrl?.replace(/^https?:\/\//, '')}
                    </span>
                  </>
                ) : (
                  <>
                    <CircleDashed className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span className="text-stone-500 italic hover:text-stone-400 select-none">
                      Link henüz eklenmedi {isAdmin ? '(Tıkla ve yapıştır)' : '(Yönetici Korumalı)'}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Admin-only Copy Link button */}
                {hasLink && (
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="p-1 rounded bg-stone-800/80 hover:bg-stone-800 text-stone-400 hover:text-amber-400 transition-colors"
                    title={isAdmin ? "Linki Kopyala (Yönetici)" : "Linki Kopyala (Sadece Yönetici)"}
                  >
                    {copiedLink ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}

                {app.githubUrl && (
                  <a
                    href={app.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-stone-400 hover:text-stone-100 p-0.5"
                    title="GitHub Reposunu Aç"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={handleStartEdit}
                  className="text-amber-400 hover:text-amber-300 text-[10px] font-semibold underline flex items-center gap-1"
                >
                  {!isAdmin && <Lock className="w-2.5 h-2.5 text-amber-500/80" />}
                  <span>{hasLink ? 'Değiştir' : '+ Link Ekle'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {app.techStack.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-900 border border-red-950/70 text-stone-300"
            >
              {tech}
            </span>
          ))}
          {app.techStack.length > 3 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 text-stone-500">
              +{app.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Info & Working Launch / Link Button */}
      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onLaunch(app)}
          className="text-stone-400 hover:text-amber-300 text-xs font-medium flex items-center gap-1 transition-colors"
          title="Haftalık Müfredat Detayı ve Çalışma Alanı"
        >
          <Play className="w-3 h-3 text-red-500" />
          <span>Detay / Demo</span>
        </button>

        {hasLink ? (
          <button
            onClick={handleOpenProject}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-amber-100 border border-amber-500/50 text-xs font-bold transition-all duration-200 active:scale-95 shadow-md shadow-red-950/50"
          >
            <span>Projeyi Aç</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-200" />
          </button>
        ) : (
          <button
            onClick={handleStartEdit}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all duration-200 active:scale-95"
          >
            <Plus className="w-3 h-3 text-amber-400" />
            <span>Kendi Linkini Koy</span>
          </button>
        )}
      </div>

    </div>
  );
};
