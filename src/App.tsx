import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_WEEKLY_APPS, CATEGORIES } from './data/appsData';
import { WeeklyApp, CategoryType } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AppCard } from './components/AppCard';
import { AppModal } from './components/AppModal';
import { EditProjectModal } from './components/EditProjectModal';
import { BatchLinkManagerModal } from './components/BatchLinkManagerModal';
import { CurriculumRoadmap } from './components/CurriculumRoadmap';
import { ClockWidget } from './components/ClockWidget';
import { Footer } from './components/Footer';
import { Layers, Sparkles, AlertCircle, Link2, Plus } from 'lucide-react';

export default function App() {
  // 30 Weekly Apps state, synchronized with localStorage
  const [apps, setApps] = useState<WeeklyApp[]>(() => {
    try {
      const saved = localStorage.getItem('yp_custom_projects_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 30) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_WEEKLY_APPS;
  });

  const [selectedApp, setSelectedApp] = useState<WeeklyApp | null>(null);
  const [editingApp, setEditingApp] = useState<WeeklyApp | null>(null);
  const [isBatchManagerOpen, setIsBatchManagerOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Tümü');
  const [selectedRange, setSelectedRange] = useState<'all' | '1-10' | '11-20' | '21-30'>('all');
  const [linkFilter, setLinkFilter] = useState<'all' | 'with-link' | 'empty'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('yp_portal_favorites');
      return saved ? JSON.parse(saved) : [1, 6, 20];
    } catch {
      return [1, 6, 20];
    }
  });

  // Save apps whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('yp_custom_projects_data', JSON.stringify(apps));
    } catch {
      // ignore
    }
  }, [apps]);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('yp_portal_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Count how many weeks currently have custom links
  const customLinksCount = useMemo(() => {
    return apps.filter(a => a.projectUrl && a.projectUrl.trim() !== '').length;
  }, [apps]);

  // Handle single app save
  const handleSaveApp = (updatedApp: WeeklyApp) => {
    setApps(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));
    if (selectedApp && selectedApp.id === updatedApp.id) {
      setSelectedApp(updatedApp);
    }
  };

  // Handle clear link
  const handleClearLink = (appId: number) => {
    setApps(prev => prev.map(a => {
      if (a.id !== appId) return a;
      return {
        ...a,
        projectUrl: '',
        githubUrl: '',
        status: 'Boş (Proje Bekleniyor)'
      };
    }));
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp(prev => prev ? {
        ...prev,
        projectUrl: '',
        githubUrl: '',
        status: 'Boş (Proje Bekleniyor)'
      } : null);
    }
  };

  // Handle batch save
  const handleSaveAllApps = (updatedList: WeeklyApp[]) => {
    setApps(updatedList);
    if (selectedApp) {
      const found = updatedList.find(a => a.id === selectedApp.id);
      if (found) setSelectedApp(found);
    }
  };

  // Toggle favorite
  const handleToggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Launch random application
  const handleRandomLaunch = () => {
    const randomApp = apps[Math.floor(Math.random() * apps.length)];
    setSelectedApp(randomApp);
  };

  // Filtered apps computation
  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      // Range filter
      if (selectedRange === '1-10' && (app.weekNumber < 1 || app.weekNumber > 10)) return false;
      if (selectedRange === '11-20' && (app.weekNumber < 11 || app.weekNumber > 20)) return false;
      if (selectedRange === '21-30' && (app.weekNumber < 21 || app.weekNumber > 30)) return false;

      // Category filter
      if (selectedCategory !== 'Tümü' && app.category !== selectedCategory) return false;

      // Link status filter
      const hasLink = Boolean(app.projectUrl && app.projectUrl.trim() !== '');
      if (linkFilter === 'with-link' && !hasLink) return false;
      if (linkFilter === 'empty' && hasLink) return false;

      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(app.id)) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = app.title.toLowerCase().includes(q);
        const inDesc = app.description.toLowerCase().includes(q);
        const inWeek = app.weekLabel.toLowerCase().includes(q) || `hafta ${app.weekNumber}`.includes(q);
        const inTech = app.techStack.some(t => t.toLowerCase().includes(q));
        const inUrl = (app.projectUrl || '').toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inWeek && !inTech && !inUrl) return false;
      }

      return true;
    });
  }, [apps, searchQuery, selectedCategory, selectedRange, linkFilter, showFavoritesOnly, favorites]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0507] text-stone-100 selection:bg-red-900 selection:text-amber-200">
      
      {/* Top Header with Y.P Logo & Yiğit Poyraz Title */}
      <Header
        onRandomLaunch={handleRandomLaunch}
        onOpenBatchManager={() => setIsBatchManagerOpen(true)}
        activeCount={filteredApps.length}
        customLinksCount={customLinksCount}
      />

      {/* Hero with Search, Custom Link Counter & Filters */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={CATEGORIES}
        selectedRange={selectedRange}
        onSelectRange={setSelectedRange}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        favoritesCount={favorites.length}
        customLinksCount={customLinksCount}
        linkFilter={linkFilter}
        onSelectLinkFilter={setLinkFilter}
        onOpenBatchManager={() => setIsBatchManagerOpen(true)}
      />

      {/* Main 30-Week Application Showcase Grid */}
      <main id="apps-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-red-950/70 gap-3">
          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-amber-500" />
            <h2 className="text-lg font-bold text-stone-100">
              30 Haftalık Uygulama Koleksiyonu
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-900 border border-red-950/80 text-amber-400 font-bold">
              {filteredApps.length} / 30
            </span>
            <span className="text-xs text-stone-400 font-mono hidden md:inline">
              ({customLinksCount} Kendi Proje Linkiniz Ekli)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBatchManagerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-500/50 text-amber-400 text-xs font-semibold transition-colors"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Toplu Link Girişi</span>
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredApps.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-stone-950/60 border border-red-950/80 my-8">
            <AlertCircle className="w-10 h-10 text-stone-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-stone-300 mb-1">
              Filtreye Uygun Proje Bulunamadı
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
              "{searchQuery}" aramanız veya seçtiğiniz filtreler için haftalık uygulama listelenemedi.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tümü');
                setSelectedRange('all');
                setLinkFilter('all');
                setShowFavoritesOnly(false);
              }}
              className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-medium text-amber-400"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        ) : (
          /* Cards Grid (Responsive 1 -> 2 -> 3 columns) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onLaunch={(clickedApp) => setSelectedApp(clickedApp)}
                onEdit={(clickedApp) => setEditingApp(clickedApp)}
                isFavorite={favorites.includes(app.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}

      </main>

      {/* 30-Week Curriculum Roadmap Section */}
      <CurriculumRoadmap
        apps={apps}
        onLaunch={(clickedApp) => setSelectedApp(clickedApp)}
      />

      {/* Interactive Application Modal Launcher */}
      <AppModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        onSelectApp={(newApp) => setSelectedApp(newApp)}
        onEditApp={(appToEdit) => setEditingApp(appToEdit)}
        allApps={apps}
        isFavorite={selectedApp ? favorites.includes(selectedApp.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Single Project Link & Detail Editor Modal */}
      <EditProjectModal
        app={editingApp}
        isOpen={Boolean(editingApp)}
        onClose={() => setEditingApp(null)}
        onSave={handleSaveApp}
        onClearLink={handleClearLink}
      />

      {/* 30 Weeks Batch Link Manager Modal */}
      <BatchLinkManagerModal
        apps={apps}
        isOpen={isBatchManagerOpen}
        onClose={() => setIsBatchManagerOpen(false)}
        onSaveAll={handleSaveAllApps}
      />

      {/* Real-time Clock & Date Widget (Sağ Alt Köşede Saat & Tarih) */}
      <ClockWidget />

      {/* Footer with Yiğit Poyraz branding */}
      <Footer />

    </div>
  );
}
