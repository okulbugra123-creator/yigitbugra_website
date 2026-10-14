import React, { useState, useEffect } from 'react';
import { WeeklyApp, ProjectStatus, CategoryType } from '../types';
import { CATEGORIES } from '../data/appsData';
import { X, Save, Link2, Github, Check, AlertCircle, Trash2, ExternalLink } from 'lucide-react';

interface EditProjectModalProps {
  app: WeeklyApp | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedApp: WeeklyApp) => void;
  onClearLink: (appId: number) => void;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  app,
  isOpen,
  onClose,
  onSave,
  onClearLink
}) => {
  const [title, setTitle] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [category, setCategory] = useState<CategoryType>('Geliştirici & Kod');
  const [status, setStatus] = useState<ProjectStatus>('Yayında');
  const [description, setDescription] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (app) {
      setTitle(app.customTitle || app.title);
      setProjectUrl(app.projectUrl || '');
      setGithubUrl(app.githubUrl || '');
      setCategory(app.category);
      setStatus(app.status || (app.projectUrl ? 'Yayında' : 'Boş (Proje Bekleniyor)'));
      setDescription(app.customDescription || app.description);
    }
  }, [app]);

  if (!isOpen || !app) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStatus: ProjectStatus = 
      projectUrl.trim() 
        ? (status === 'Boş (Proje Bekleniyor)' ? 'Yayında' : status)
        : 'Boş (Proje Bekleniyor)';

    const updated: WeeklyApp = {
      ...app,
      title: title.trim() || app.title,
      customTitle: title.trim() || app.title,
      projectUrl: projectUrl.trim(),
      githubUrl: githubUrl.trim(),
      category: category,
      status: updatedStatus,
      description: description.trim() || app.description,
      customDescription: description.trim() || app.description
    };

    onSave(updated);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 600);
  };

  const handleClear = () => {
    setProjectUrl('');
    setGithubUrl('');
    setStatus('Boş (Proje Bekleniyor)');
    onClearLink(app.id);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-stone-950 border border-red-900/70 rounded-2xl shadow-2xl p-6 ring-1 ring-amber-500/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-red-950/80">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-gradient-to-r from-red-800 to-amber-700 text-amber-200 border border-amber-500/40">
              {app.weekLabel}
            </span>
            <h3 className="text-base font-bold text-stone-100">
              Kendi Proje Linkinizi Ekleyin
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-500 hover:text-stone-300 hover:bg-stone-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Proje Adı */}
          <div>
            <label className="block text-stone-300 font-semibold mb-1">
              Proje / Uygulama Adı
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Portfolyo Sitem, E-Ticaret Arayüzü, vb."
              className="w-full px-3 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/40"
            />
          </div>

          {/* Canlı Proje Linki */}
          <div>
            <label className="block text-amber-400 font-semibold mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5" />
                Canlı Proje Linki (URL)
              </span>
              <span className="text-[10px] text-stone-500 font-normal">Tıklandığında açılacak web adresi</span>
            </label>
            <input
              type="url"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              placeholder="https://benim-projem.com veya https://...vercel.app"
              className="w-full px-3 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-amber-300 font-mono text-xs placeholder-stone-600 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/40"
            />
          </div>

          {/* GitHub Repo Linki */}
          <div>
            <label className="block text-stone-300 font-semibold mb-1 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              GitHub Kod Deposu (Opsiyonel)
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/kullaniciadi/proje-adi"
              className="w-full px-3 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-stone-300 font-mono text-xs placeholder-stone-600 focus:outline-none focus:border-amber-500/80"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Kategori */}
            <div>
              <label className="block text-stone-300 font-semibold mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-2.5 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-stone-200 focus:outline-none focus:border-amber-500/80"
              >
                {CATEGORIES.filter(c => c !== 'Tümü').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Durum */}
            <div>
              <label className="block text-stone-300 font-semibold mb-1">
                Yayın Durumu
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full px-2.5 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-amber-400 font-semibold focus:outline-none focus:border-amber-500/80"
              >
                <option value="Boş (Proje Bekleniyor)">Boş (Proje Bekleniyor)</option>
                <option value="Geliştiriliyor">Geliştiriliyor</option>
                <option value="Yayında">Yayında</option>
                <option value="Tamamlandı">Tamamlandı</option>
              </select>
            </div>
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-stone-300 font-semibold mb-1">
              Kısa Proje Notu / Açıklaması
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Bu projede ne yaptınız? Hangi kütüphaneleri kullandınız?"
              className="w-full px-3 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-stone-200 placeholder-stone-600 resize-none focus:outline-none focus:border-amber-500/80"
            />
          </div>

          {/* Butonlar */}
          <div className="pt-3 border-t border-red-950/80 flex items-center justify-between gap-3">
            {app.projectUrl ? (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 px-3 py-2 text-stone-400 hover:text-red-400 hover:bg-stone-900 rounded-lg transition-colors"
                title="Link ve Ayarları Sıfırla"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Linki Sıfırla
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 transition-colors font-medium"
              >
                İptal
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-amber-100 font-bold shadow-md shadow-red-950/50 transition-all"
              >
                {savedNotice ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
                {savedNotice ? 'Kaydedildi!' : 'Bağlantıyı Kaydet'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
