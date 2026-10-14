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
  appType: 
    | 'pomodoro'
    | 'markdown'
    | 'crypto_converter'
    | 'password_generator'
    | 'weather_sim'
    | 'kanban'
    | 'color_palette'
    | 'wpm_test'
    | 'expense_tracker'
    | 'drawing_canvas'
    | 'qr_generator'
    | 'memory_game'
    | 'habit_tracker'
    | 'json_formatter'
    | 'world_clocks'
    | 'gradient_studio'
    | 'regex_tester'
    | 'tts_player'
    | 'crypto_hash'
    | 'snake_game'
    | 'invoice_generator'
    | 'unit_converter'
    | 'flashcards'
    | 'ambient_audio'
    | 'git_simulator'
    | 'calorie_calculator'
    | 'countdown_timer'
    | 'bookmark_vault'
    | 'tone_synth'
    | 'final_showcase';
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
