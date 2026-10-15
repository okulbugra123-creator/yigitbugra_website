import React from 'react';
import { WeeklyApp } from '../types';
import { Layers, Terminal, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  apps: WeeklyApp[];
  onLaunch: (app: WeeklyApp) => void;
}

export const CurriculumRoadmap: React.FC<Props> = ({ apps, onLaunch }) => {
  const phases = [
    {
      title: 'Aşama 1: Temel Web Mimarisi & Hızlı Araçlar',
      weeks: 'Hafta 01 – 10',
      description: 'DOM etkileşimleri, asenkron zamanlayıcılar, veri doğrulama ve kullanıcı araçları.',
      apps: apps.slice(0, 10),
      color: 'from-red-900/50 to-stone-900'
    },
    {
      title: 'Aşama 2: Grafikler, Veri Yapıları & Oyun Döngüleri',
      weeks: 'Hafta 11 – 20',
      description: 'HTML5 Canvas, kriptografi, RegEx analizörleri, JSON derleyicisi ve 2D oyun motoru.',
      apps: apps.slice(10, 20),
      color: 'from-stone-900 to-amber-950/40'
    },
    {
      title: 'Aşama 3: İleri Seviye Sistemler & Ses Laboratuvarı',
      weeks: 'Hafta 21 – 30',
      description: 'Web Audio API sentezleyicisi, terminal emülatörü, fatura motoru ve beslenme analizi.',
      apps: apps.slice(20, 30),
      color: 'from-red-950/60 to-amber-900/40'
    },
    {
      title: 'Aşama 4: Bulut, Yapay Zeka & Büyük Final',
      weeks: 'Hafta 31 – 38',
      description: 'WebSockets, PWA, Cloud Firestore veritabanı, AI asistanı ve 38 haftalık büyük şaheser.',
      apps: apps.slice(30, 38),
      color: 'from-amber-950/50 to-red-950/80'
    }
  ];

  return (
    <section id="curriculum-section" className="py-14 border-b border-red-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Sistematik İlerleme
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100">
              38 Haftalık Geliştirici Yol Haritası
            </h2>
          </div>
          <p className="text-xs text-stone-400 max-w-md">
            Yiğit Poyraz tarafından kurgulanan 4 ana aşamalı mühendislik programında her hafta bir öncekinin temelleri üzerine inşa edilir.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {phases.map((phase, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-b from-stone-900/90 to-stone-950 border border-red-950/80 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono font-bold text-amber-400">{phase.weeks}</span>
                  <span className="text-[11px] text-stone-500 font-mono">{phase.apps.length} Uygulama</span>
                </div>

                <h3 className="text-sm font-bold text-stone-100 mb-2">
                  {phase.title}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed mb-4">
                  {phase.description}
                </p>

                <div className="space-y-1.5 border-t border-stone-800/80 pt-3">
                  {phase.apps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => onLaunch(app)}
                      className="w-full text-left p-2 rounded-lg bg-stone-950/80 hover:bg-stone-900 border border-stone-900 hover:border-amber-500/40 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="text-[10px] font-mono text-amber-500/80 shrink-0 font-bold">
                          {app.weekLabel}
                        </span>
                        <span className="text-xs text-stone-300 group-hover:text-amber-300 truncate">
                          {app.title}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-600 group-hover:text-amber-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
