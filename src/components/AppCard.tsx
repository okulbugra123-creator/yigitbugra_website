import React from 'react';
import { WeeklyApp } from '../types';
import { 
  Play, Star, Clock, ExternalLink, Edit3, Github, 
  Link2, CheckCircle2, CircleDashed, Plus
} from 'lucide-react';

interface AppCardProps {
  app: WeeklyApp;
  onLaunch: (app: WeeklyApp) => void;
  onEdit: (app: WeeklyApp) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  onLaunch,
  onEdit,
  isFavorite,
  onToggleFavorite
}) => {
  const hasLink = Boolean(app.projectUrl && app.projectUrl.trim() !== '');

  const handleOpenProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLink) {
      window.open(app.projectUrl, '_blank', 'noopener,noreferrer');
    } else {
      // If no link, open the edit modal directly so the user can put their project link!
      onEdit(app);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-gradient-to-b from-stone-900/95 via-stone-950 to-stone-950 border border-red-950/80 hover:border-amber-500/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(120,19,36,0.3)] ring-1 ring-stone-900 hover:ring-amber-500/20">
      
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
              onClick={() => onEdit(app)}
              className="p-1.5 rounded-lg text-stone-500 hover:text-amber-300 hover:bg-stone-800/60 transition-colors"
              title="Proje Bilgisini ve Linkini Düzenle"
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
        <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1 mb-2">
          {app.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 mb-4">
          {app.description}
        </p>

        {/* Link Status Box */}
        <div className="mb-4 p-2.5 rounded-lg bg-stone-900/60 border border-red-950/70 flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 truncate">
            {hasLink ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono text-amber-400 truncate max-w-[170px]" title={app.projectUrl}>
                  {app.projectUrl?.replace(/^https?:\/\//, '')}
                </span>
              </>
            ) : (
              <>
                <CircleDashed className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span className="text-stone-500 italic">
                  Link henüz eklenmedi (Boş)
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {app.githubUrl && (
              <a
                href={app.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-stone-400 hover:text-stone-100 p-1"
                title="GitHub Reposunu Aç"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => onEdit(app)}
              className="text-amber-500 hover:text-amber-400 underline text-[10px] font-semibold"
            >
              {hasLink ? 'Değiştir' : '+ Link Ekle'}
            </button>
          </div>
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
          className="text-stone-400 hover:text-amber-300 text-xs font-medium flex items-center gap-1"
          title="Hafta Detayı ve Önizleme"
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
            onClick={() => onEdit(app)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all duration-200 active:scale-95"
          >
            <Plus className="w-3 h-3 text-amber-400" />
            <span>Kendi Linkini Koy</span>
          </button>
        )}
      </div>

    </div>
  );
};
