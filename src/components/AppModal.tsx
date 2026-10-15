import React, { useState, useEffect } from 'react';
import { WeeklyApp } from '../types';
import { InteractiveAppRunner } from './InteractiveAppRunner';
import { 
  X, ExternalLink, Star, ChevronLeft, ChevronRight, 
  Terminal, BookOpen, Cpu, Check, Share2, Edit3, Link2, Plus, Github,
  Lock, Copy
} from 'lucide-react';

interface AppModalProps {
  app: WeeklyApp | null;
  onClose: () => void;
  onSelectApp: (app: WeeklyApp) => void;
  onEditApp: (app: WeeklyApp) => void;
  allApps: WeeklyApp[];
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  isAdmin?: boolean;
  onRequireAdmin?: (reason?: string) => void;
}

export const AppModal: React.FC<AppModalProps> = ({
  app,
  onClose,
  onSelectApp,
  onEditApp,
  allApps,
  isFavorite,
  onToggleFavorite,
  isAdmin = false,
  onRequireAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'app' | 'architecture' | 'outcomes'>('app');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActiveTab('app');
  }, [app]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!app) return null;

  const currentIndex = allApps.findIndex(a => a.id === app.id);
  const prevApp = currentIndex > 0 ? allApps[currentIndex - 1] : null;
  const nextApp = currentIndex < allApps.length - 1 ? allApps[currentIndex + 1] : null;

  const handleShare = () => {
    if (!isAdmin) {
      onRequireAdmin?.('Bağlantı kopyalama işlemi sadece Bugra (Yönetici) tarafından yapılabilir.');
      return;
    }
    const url = app.projectUrl || `${window.location.origin}#week-${app.weekNumber}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleTriggerEdit = () => {
    if (!isAdmin) {
      onRequireAdmin?.('Sitede değişiklik yapma ve link ekleme/düzenleme yetkisi sadece Bugra (Yönetici) hesabına aittir.');
      return;
    }
    onEditApp(app);
  };

  const hasLink = Boolean(app.projectUrl && app.projectUrl.trim() !== '');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-stone-950 border border-red-900/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-amber-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="h-1 bg-gradient-to-r from-red-700 via-amber-400 to-red-700 w-full" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-red-950/80 bg-stone-900/70 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 rounded bg-gradient-to-r from-red-800 to-amber-700 border border-amber-500/40 text-amber-100 font-mono text-xs font-bold shadow-sm">
              {app.weekLabel}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-100 flex items-center gap-2">
                {app.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                <span>{app.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-amber-400">{app.status || 'Boş (Proje Bekleniyor)'}</span>
                <span aria-hidden="true">·</span>
                <span>{app.estimatedTime}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-500/50 text-amber-400 text-xs font-semibold transition-colors"
              title={isAdmin ? "Proje Linkinizi Ekleyin / Düzenleyin" : "Düzenlemek için Yönetici Girişi Yapın"}
            >
              {!isAdmin ? <Lock className="w-3.5 h-3.5 text-amber-500/80" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{hasLink ? 'Linki Düzenle' : 'Kendi Linkini Koy'}</span>
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-amber-400 transition-colors"
              title={isAdmin ? "Bağlantıyı Kopyala" : "Bağlantıyı Kopyala (Sadece Yönetici)"}
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onToggleFavorite(app.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isFavorite 
                  ? 'bg-amber-950/50 border-amber-500/60 text-amber-400' 
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-amber-400'
              }`}
              title="Favori"
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-100 transition-colors ml-1"
              title="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Custom Project Link Alert Banner */}
        <div 
          className="px-5 py-3 bg-stone-900/90 border-b border-red-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          onCopy={(e) => {
            if (!isAdmin) {
              e.preventDefault();
              onRequireAdmin?.('Link kopyalama işlemi sadece Bugra (Yönetici) tarafından yapılabilir.');
            }
          }}
        >
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-amber-400 shrink-0" />
            {hasLink ? (
              <div className="flex items-center gap-2">
                <span className="text-stone-300">
                  Canlı Proje Adresi: 
                  <strong className="text-amber-400 font-mono ml-1 select-none">
                    {app.projectUrl}
                  </strong>
                </span>
                {!isAdmin && (
                  <span className="px-2 py-0.5 rounded bg-amber-950/50 text-amber-400 border border-amber-800/40 font-mono text-[10px] flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    Kopyalama & Değiştirme Korumalı
                  </span>
                )}
              </div>
            ) : (
              <span className="text-stone-400 italic">
                Bu haftanın bağlantısı henüz boş. {isAdmin ? 'Kendi projenizin adresini ekleyebilirsiniz.' : 'Yönetici tarafından proje linki bekleniyor.'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {app.githubUrl && (
              <a
                href={app.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-stone-950 hover:bg-stone-900 border border-stone-800 text-stone-300 text-xs"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
            {hasLink ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-semibold"
                  >
                    <Copy className="w-3 h-3 text-amber-400" />
                    <span>Linki Kopyala</span>
                  </button>
                )}
                <a
                  href={app.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-red-700 to-amber-600 text-amber-100 font-bold hover:opacity-90"
                >
                  <span>Projeyi Yeni Sekmede Aç</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <button
                onClick={handleTriggerEdit}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
              >
                {!isAdmin ? <Lock className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {isAdmin ? 'Kendi Linkimi Ekle' : 'Link Ekle (Yönetici)'}
              </button>
            )}
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-5 pt-3 pb-2 border-b border-stone-800/80 bg-stone-900/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-stone-900 rounded-lg border border-red-950/60">
            <button
              onClick={() => setActiveTab('app')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'app'
                  ? 'bg-gradient-to-r from-red-800 to-amber-600 text-amber-100 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-300" />
              Çalışma Alanı / Prototip
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'architecture'
                  ? 'bg-gradient-to-r from-red-800 to-amber-600 text-amber-100 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              Hafta Planı & Mimari
            </button>
            <button
              onClick={() => setActiveTab('outcomes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'outcomes'
                  ? 'bg-gradient-to-r from-red-800 to-amber-600 text-amber-100 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-amber-300" />
              Teknoloji & Notlar
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            <button
              disabled={!prevApp}
              onClick={() => prevApp && onSelectApp(prevApp)}
              className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-amber-400 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Önceki Hafta"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={!nextApp}
              onClick={() => nextApp && onSelectApp(nextApp)}
              className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-amber-400 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Sonraki Hafta"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-210px)] space-y-6">
          {activeTab === 'app' && (
            <div>
              <div className="mb-4 p-3 bg-stone-900/60 rounded-xl border border-red-950/70 text-xs text-stone-300 flex items-center justify-between">
                <span>
                  <strong>Yiğit Poyraz Çalışma Alanı:</strong> Kendi projenizi tamamlayana kadar aşağıdaki prototip motorunu test edebilir veya üstteki butondan kendi proje adresinizi tanımlayabilirsiniz.
                </span>
                <span className="font-mono text-amber-400 font-bold shrink-0 ml-2">
                  {hasLink ? 'Özel Link Tanımlı' : 'Proje Bekleniyor'}
                </span>
              </div>
              <InteractiveAppRunner app={app} />
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4 text-stone-300 text-sm">
              <div className="p-4 bg-stone-900/60 rounded-xl border border-red-950/80">
                <h4 className="text-sm font-bold text-amber-400 mb-2">Proje Amacı & Kapsamı</h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {app.customDescription || app.longDescription}
                </p>
              </div>

              <div className="p-4 bg-stone-900/60 rounded-xl border border-red-950/80">
                <h4 className="text-sm font-bold text-amber-400 mb-2">Mühendislik Yaklaşımı</h4>
                <ul className="text-xs space-y-2 text-stone-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">▪</span>
                    <span>Kullanıcı odaklı arayüz ve tarayıcı performansı için hafif mimari yapılandırılmıştır.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">▪</span>
                    <span>Yiğit Poyraz tarafından belirlenecek harici canlı proje bağlantısıyla tam entegredir.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">▪</span>
                    <span>Tüm link ve proje bilgileri tarayıcı yerel belleğinde (localStorage) kalıcı olarak saklanır.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'outcomes' && (
            <div className="space-y-4 text-stone-300 text-sm">
              <div className="p-4 bg-stone-900/60 rounded-xl border border-red-950/80">
                <h4 className="text-sm font-bold text-amber-400 mb-3">Bu Haftanın Temel Hedefleri</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {app.learningOutcomes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-stone-950 rounded-lg border border-stone-800 text-xs">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-stone-900/60 rounded-xl border border-red-950/80">
                <h4 className="text-sm font-bold text-amber-400 mb-3">Teknoloji Yığını</h4>
                <div className="flex flex-wrap gap-2">
                  {app.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded bg-stone-950 border border-red-900/60 text-xs font-mono text-stone-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-red-950/80 bg-stone-900/80 flex items-center justify-between text-xs text-stone-400">
          <span>Geliştirici: <strong className="text-amber-400 font-semibold">Yiğit Poyraz</strong></span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-stone-500">{app.weekLabel} / 30</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-200 rounded-lg font-medium transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
