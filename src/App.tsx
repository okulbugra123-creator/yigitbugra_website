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
import { AdminLoginModal } from './components/AdminLoginModal';
import { Layers, Sparkles, AlertCircle, Link2, Plus, Globe, ShieldCheck } from 'lucide-react';
import { 
  saveProjectToFirestore, 
  saveAllProjectsToFirestore, 
  subscribeToFirestoreProjects, 
  fetchProjectsFromFirestore 
} from './services/projectsService';

// Helper to safely merge loaded data with all 38 weeks
function mergeProjects(loadedApps: any[]): WeeklyApp[] {
  if (!Array.isArray(loadedApps) || loadedApps.length === 0) return INITIAL_WEEKLY_APPS;
  const map = new Map<number, any>();
  loadedApps.forEach(item => {
    if (item && typeof item.id === 'number') {
      map.set(item.id, item);
    }
  });

  return INITIAL_WEEKLY_APPS.map(baseApp => {
    const existing = map.get(baseApp.id);
    if (existing) {
      return {
        ...baseApp,
        title: existing.customTitle || existing.title || baseApp.title,
        customTitle: existing.customTitle || existing.title || baseApp.title,
        description: existing.customDescription || existing.description || baseApp.description,
        customDescription: existing.customDescription || existing.description || baseApp.description,
        projectUrl: existing.projectUrl || '',
        githubUrl: existing.githubUrl || '',
        category: existing.category || baseApp.category,
        status: existing.status || (existing.projectUrl ? 'Yayında' : 'Boş (Proje Bekleniyor)')
      };
    }
    return baseApp;
  });
}

export default function App() {
  // Admin authentication state (Bugra / Bugra123.)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('yp_admin_logged_in') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // 38 Weekly Apps state, synchronized with localStorage & Firestore
  const [apps, setApps] = useState<WeeklyApp[]>(() => {
    try {
      const saved = localStorage.getItem('yp_custom_projects_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return mergeProjects(parsed);
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
  const [selectedRange, setSelectedRange] = useState<'all' | '1-10' | '11-20' | '21-30' | '31-38'>('all');
  const [linkFilter, setLinkFilter] = useState<'all' | 'with-link' | 'empty'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('yp_portal_favorites');
      return saved ? JSON.parse(saved) : [1, 6, 20, 38];
    } catch {
      return [1, 6, 20, 38];
    }
  });

  // Admin login success
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    try {
      localStorage.setItem('yp_admin_logged_in', 'true');
    } catch {}
  };

  // Admin logout
  const handleAdminLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('yp_admin_logged_in');
    } catch {}
  };

  // Guard for admin-only actions
  const requireAdmin = (action: () => void) => {
    if (isAdmin) {
      action();
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  // Cross-device server sync fallback
  const syncToServer = async (projectsList: WeeklyApp[]) => {
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: projectsList })
      });
    } catch {
      // ignore server offline errors
    }
  };

  // Real-time Firestore synchronization across all devices
  useEffect(() => {
    // 1. Subscribe to live Firestore updates from any device
    const unsubscribe = subscribeToFirestoreProjects((cloudProjects) => {
      if (cloudProjects && cloudProjects.length > 0) {
        const merged = mergeProjects(cloudProjects);
        setApps(merged);
        try {
          localStorage.setItem('yp_custom_projects_data', JSON.stringify(merged));
        } catch {}
      }
    });

    // 2. Fetch initial cloud data or seed if cloud is empty
    fetchProjectsFromFirestore().then((cloudData) => {
      if (cloudData && cloudData.length > 0) {
        const merged = mergeProjects(cloudData);
        setApps(merged);
        try {
          localStorage.setItem('yp_custom_projects_data', JSON.stringify(merged));
        } catch {}
      } else {
        // If cloud collection is new, sync local projects to cloud so other devices get them
        try {
          const localSaved = localStorage.getItem('yp_custom_projects_data');
          if (localSaved) {
            const parsed = JSON.parse(localSaved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const merged = mergeProjects(parsed);
              saveAllProjectsToFirestore(merged);
              return;
            }
          }
        } catch {}
        // Initialize default 38 weeks in Firestore
        saveAllProjectsToFirestore(INITIAL_WEEKLY_APPS);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Save apps locally whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('yp_custom_projects_data', JSON.stringify(apps));
    } catch {
      // ignore
    }
  }, [apps]);

  // Ensure persistence when the tab/window is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        localStorage.setItem('yp_custom_projects_data', JSON.stringify(apps));
        const blob = new Blob([JSON.stringify({ projects: apps })], { type: 'application/json' });
        navigator.sendBeacon?.('/api/projects', blob);
      } catch {
        // ignore
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
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

  // Handle single app save with immediate direct localStorage flush and Firestore cloud sync
  const handleSaveApp = (updatedApp: WeeklyApp) => {
    const nextApps = apps.map(a => a.id === updatedApp.id ? updatedApp : a);
    setApps(nextApps);
    try {
      localStorage.setItem('yp_custom_projects_data', JSON.stringify(nextApps));
    } catch {}
    saveProjectToFirestore(updatedApp);
    syncToServer(nextApps);
    if (selectedApp && selectedApp.id === updatedApp.id) {
      setSelectedApp(updatedApp);
    }
  };

  // Quick save URL directly from the card
  const handleQuickSaveUrl = (appId: number, url: string) => {
    let savedTarget: WeeklyApp | null = null;
    const nextApps = apps.map(a => {
      if (a.id !== appId) return a;
      const updated = {
        ...a,
        projectUrl: url.trim(),
        status: url.trim() ? ('Yayında' as const) : ('Boş (Proje Bekleniyor)' as const)
      };
      savedTarget = updated;
      return updated;
    });
    setApps(nextApps);
    try {
      localStorage.setItem('yp_custom_projects_data', JSON.stringify(nextApps));
    } catch {}
    if (savedTarget) {
      saveProjectToFirestore(savedTarget);
    }
    syncToServer(nextApps);
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp(prev => prev ? {
        ...prev,
        projectUrl: url.trim(),
        status: url.trim() ? 'Yayında' : 'Boş (Proje Bekleniyor)'
      } : null);
    }
  };

  // Handle clear link
  const handleClearLink = (appId: number) => {
    let clearedTarget: WeeklyApp | null = null;
    const nextApps = apps.map(a => {
      if (a.id !== appId) return a;
      const updated = {
        ...a,
        projectUrl: '',
        githubUrl: '',
        status: 'Boş (Proje Bekleniyor)' as const
      };
      clearedTarget = updated;
      return updated;
    });
    setApps(nextApps);
    try {
      localStorage.setItem('yp_custom_projects_data', JSON.stringify(nextApps));
    } catch {}
    if (clearedTarget) {
      saveProjectToFirestore(clearedTarget);
    }
    syncToServer(nextApps);
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp(prev => prev ? {
        ...prev,
        projectUrl: '',
        githubUrl: '',
        status: 'Boş (Proje Bekleniyor)'
      } : null);
    }
  };

  // Handle batch save across all devices
  const handleSaveAllApps = (updatedList: WeeklyApp[]) => {
    setApps(updatedList);
    try {
      localStorage.setItem('yp_custom_projects_data', JSON.stringify(updatedList));
    } catch {}
    saveAllProjectsToFirestore(updatedList);
    syncToServer(updatedList);
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
      if (selectedRange === '31-38' && (app.weekNumber < 31 || app.weekNumber > 38)) return false;

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
      
      {/* Top Header with Y.P Logo, Yiğit Poyraz Title & Admin Controls */}
      <Header
        onRandomLaunch={handleRandomLaunch}
        onOpenBatchManager={() => requireAdmin(() => setIsBatchManagerOpen(true))}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onAdminLogout={handleAdminLogout}
        isAdmin={isAdmin}
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
        onOpenBatchManager={() => requireAdmin(() => setIsBatchManagerOpen(true))}
      />

      {/* Main 38-Week Application Showcase Grid */}
      <main id="apps-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-red-950/70 gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <Layers className="w-4 h-4 text-amber-500" />
            <h2 className="text-lg font-bold text-stone-100">
              38 Haftalık Uygulama Koleksiyonu
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-900 border border-red-950/80 text-amber-400 font-bold">
              {filteredApps.length} / {apps.length}
            </span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Bulut Eşitleme Aktif (Firestore): Tüm cihazlardan anlık senkronize
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => requireAdmin(() => setIsBatchManagerOpen(true))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-500/50 text-amber-400 text-xs font-semibold transition-colors"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Toplu Link Girişi & Yedekleme</span>
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
                onEdit={(clickedApp) => requireAdmin(() => setEditingApp(clickedApp))}
                onQuickSaveUrl={handleQuickSaveUrl}
                isFavorite={favorites.includes(app.id)}
                onToggleFavorite={handleToggleFavorite}
                isAdmin={isAdmin}
                onRequireAdmin={() => setIsAdminLoginOpen(true)}
              />
            ))}
          </div>
        )}

      </main>

      {/* 38-Week Curriculum Roadmap Section */}
      <CurriculumRoadmap
        apps={apps}
        onLaunch={(clickedApp) => setSelectedApp(clickedApp)}
      />

      {/* Interactive Application Modal Launcher */}
      <AppModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        onSelectApp={(newApp) => setSelectedApp(newApp)}
        onEditApp={(appToEdit) => requireAdmin(() => setEditingApp(appToEdit))}
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

      {/* 38 Weeks Batch Link Manager Modal */}
      <BatchLinkManagerModal
        apps={apps}
        isOpen={isBatchManagerOpen}
        onClose={() => setIsBatchManagerOpen(false)}
        onSaveAll={handleSaveAllApps}
      />

      {/* Admin Login Modal (Bugra / Bugra123.) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Real-time Clock & Date Widget (Sağ Alt Köşede Saat & Tarih) */}
      <ClockWidget />

      {/* Footer with Yiğit Poyraz branding */}
      <Footer />

    </div>
  );
}
