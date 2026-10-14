import React, { useState } from 'react';
import { WeeklyApp } from '../types';
import { X, Save, Download, Upload, Check, Link2, ExternalLink, RefreshCw } from 'lucide-react';

interface BatchLinkManagerModalProps {
  apps: WeeklyApp[];
  isOpen: boolean;
  onClose: () => void;
  onSaveAll: (updatedApps: WeeklyApp[]) => void;
}

export const BatchLinkManagerModal: React.FC<BatchLinkManagerModalProps> = ({
  apps,
  isOpen,
  onClose,
  onSaveAll
}) => {
  const [editedApps, setEditedApps] = useState<WeeklyApp[]>(apps);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [filterFilled, setFilterFilled] = useState<'all' | 'empty' | 'filled'>('all');

  // Reset when opened
  React.useEffect(() => {
    if (isOpen) {
      setEditedApps(apps);
    }
  }, [isOpen, apps]);

  if (!isOpen) return null;

  const handleFieldChange = (id: number, field: 'title' | 'projectUrl' | 'githubUrl', value: string) => {
    setEditedApps(prev => prev.map(a => {
      if (a.id !== id) return a;
      const updated = { ...a, [field]: value };
      if (field === 'projectUrl') {
        updated.status = value.trim() ? 'Yayında' : 'Boş (Proje Bekleniyor)';
      }
      return updated;
    }));
  };

  const handleSave = () => {
    onSaveAll(editedApps);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  const filledCount = editedApps.filter(a => a.projectUrl && a.projectUrl.trim() !== '').length;

  const filteredList = editedApps.filter(a => {
    const has = Boolean(a.projectUrl && a.projectUrl.trim() !== '');
    if (filterFilled === 'empty') return !has;
    if (filterFilled === 'filled') return has;
    return true;
  });

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(editedApps, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `yigit_poyraz_30_hafta_linkleri.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] bg-stone-950 border border-red-900/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-amber-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 w-full" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-red-950/80 bg-stone-900/80 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-amber-400" />
              30 Haftalık Toplu Proje Linki Yöneticisi
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Kendi projelerinizin canlı adreslerini ve GitHub linklerini bu ekrandan topluca girebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToJson}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs rounded-lg transition-colors"
              title="Yedek Olarak JSON İndir"
            >
              <Download className="w-3.5 h-3.5" />
              Yedekle (JSON)
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Bar & Filter Controls */}
        <div className="px-5 py-3 bg-stone-900/50 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-stone-400">
              Tanımlanan Proje Linki: <strong className="text-amber-400 font-mono text-sm">{filledCount} / 30</strong>
            </span>
            <div className="w-24 sm:w-36 h-2 bg-stone-900 rounded-full overflow-hidden border border-red-950/80">
              <div 
                className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300"
                style={{ width: `${(filledCount / 30) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-900 rounded-lg border border-red-950/80">
            <button
              onClick={() => setFilterFilled('all')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                filterFilled === 'all' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Tümü (30)
            </button>
            <button
              onClick={() => setFilterFilled('empty')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                filterFilled === 'empty' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Boş Olanlar ({30 - filledCount})
            </button>
            <button
              onClick={() => setFilterFilled('filled')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                filterFilled === 'filled' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Eklenenler ({filledCount})
            </button>
          </div>
        </div>

        {/* Scrollable Weeks List */}
        <div className="p-4 sm:p-5 overflow-y-auto max-h-[calc(90vh-210px)] space-y-3">
          {filteredList.map((app) => (
            <div
              key={app.id}
              className="p-3.5 bg-stone-900/70 rounded-xl border border-red-950/80 hover:border-amber-500/40 transition-colors grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs"
            >
              {/* Week Badge & Title */}
              <div className="md:col-span-3 flex items-center gap-2">
                <span className="font-mono font-bold text-amber-400 px-2 py-1 rounded bg-stone-950 border border-red-900/60 shrink-0">
                  {app.weekLabel}
                </span>
                <input
                  type="text"
                  value={app.title}
                  onChange={(e) => handleFieldChange(app.id, 'title', e.target.value)}
                  placeholder="Proje Adı"
                  className="w-full bg-stone-950 px-2.5 py-1.5 rounded border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-500/80"
                />
              </div>

              {/* Canlı Proje URL */}
              <div className="md:col-span-5">
                <div className="relative">
                  <input
                    type="url"
                    value={app.projectUrl || ''}
                    onChange={(e) => handleFieldChange(app.id, 'projectUrl', e.target.value)}
                    placeholder="https://projeniz.com (Canlı Proje Linki)"
                    className="w-full bg-stone-950 px-3 py-1.5 pr-8 rounded border border-red-950/80 font-mono text-amber-300 placeholder-stone-600 focus:outline-none focus:border-amber-500/80"
                  />
                  {app.projectUrl && (
                    <a
                      href={app.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-400"
                      title="Test Et (Yeni Sekmede Aç)"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* GitHub Repo URL */}
              <div className="md:col-span-4">
                <input
                  type="url"
                  value={app.githubUrl || ''}
                  onChange={(e) => handleFieldChange(app.id, 'githubUrl', e.target.value)}
                  placeholder="https://github.com/... (GitHub Linki)"
                  className="w-full bg-stone-950 px-3 py-1.5 rounded border border-stone-800 font-mono text-stone-300 placeholder-stone-600 focus:outline-none focus:border-amber-500/80"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-red-950/80 bg-stone-900/90 flex items-center justify-between">
          <span className="text-xs text-stone-400">
            Değişiklikler tarayıcınızda otomatik ve kalıcı saklanır.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold"
            >
              Vazgeç
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-amber-100 text-xs font-bold shadow-lg shadow-red-950/60"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
              {savedSuccess ? 'Tüm Değişiklikler Kaydedildi!' : 'Tümünü Kaydet'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
