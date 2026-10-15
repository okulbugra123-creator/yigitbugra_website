export type CategoryType = 
  | 'Tümü'
  | 'Verimlilik & Araçlar'
  | 'Geliştirici & Kod'
  | 'Görsel & Yaratıcı'
  | 'Finans & Hesaplama'
  | 'Oyun & Eğlence'
  | 'Sistem & Yardımcı';

export type ProjectStatus = 
  | 'Boş (Proje Bekleniyor)'
  | 'Geliştiriliyor'
  | 'Yayında'
  | 'Tamamlandı';

export interface WeeklyApp {
  id: number;
  weekNumber: number;
  weekLabel: string; // e.g. "Hafta 01"
  title: string;
  category: CategoryType;
  description: string;
  longDescription: string;
  techStack: string[];
  difficulty: 'Temel' | 'Orta' | 'İleri';
  appType: string;
  learningOutcomes: string[];
  estimatedTime: string;
  accentColor?: string;
  // User's custom project details (empty by default)
  projectUrl?: string; // Boş link alanı
  githubUrl?: string;  // Boş GitHub link alanı
  customTitle?: string;
  customDescription?: string;
  status?: ProjectStatus;
}
