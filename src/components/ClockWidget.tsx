import React, { useState, useEffect } from 'react';
import { Clock, Calendar, ChevronDown, ChevronUp, Globe } from 'lucide-react';

export const ClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  let displayHours = hours;
  let ampm = '';

  if (!is24Hour) {
    ampm = hours >= 12 ? ' ÖS' : ' ÖÖ';
    displayHours = hours % 12 || 12;
  }

  const formattedHours = String(displayHours).padStart(2, '0');

  // Turkish Date Formatting
  const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const dayName = days[time.getDay()];
  const monthName = months[time.getMonth()];
  const dateNum = time.getDate();
  const year = time.getFullYear();

  return (
    <div 
      className="fixed bottom-4 right-4 z-40 transition-all duration-300"
      role="region"
      aria-label="Saat ve Tarih Göstergesi"
    >
      <div className="relative group bg-stone-950/95 backdrop-blur-md border border-red-900/70 shadow-[0_8px_32px_rgba(120,19,36,0.35)] rounded-xl ring-1 ring-amber-500/25 overflow-hidden transition-all duration-200 hover:border-amber-500/50">
        {/* Glow Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-amber-400 hover:text-amber-300"
            title="Genişlet"
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-bold tabular-nums">{formattedHours}:{minutes}</span>
            <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
          </button>
        ) : (
          <div className="p-3.5 min-w-[210px]">
            {/* Top Widget Header */}
            <div className="flex items-center justify-between gap-3 text-[10px] text-stone-400 mb-1.5 pb-1 border-b border-stone-800/80">
              <div className="flex items-center gap-1.5 text-amber-400/90 font-medium">
                <Globe className="w-3 h-3 text-amber-500" />
                <span>İstanbul (UTC+3)</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIs24Hour(!is24Hour)}
                  className="px-1.5 py-0.5 rounded bg-stone-900 hover:bg-stone-800 text-[9px] font-mono text-stone-300 border border-stone-800 transition-colors"
                  title="Saat Formatını Değiştir"
                >
                  {is24Hour ? '24S' : '12S'}
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-0.5 rounded text-stone-500 hover:text-stone-300"
                  title="Küçült"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Live Clock Display */}
            <div className="flex items-baseline gap-1 my-0.5">
              <span className="text-2xl sm:text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 tabular-nums tracking-tight drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">
                {formattedHours}:{minutes}
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-amber-500/90 tabular-nums">
                :{seconds}
              </span>
              {ampm && (
                <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold ml-1">
                  {ampm}
                </span>
              )}
            </div>

            {/* Turkish Date Display */}
            <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium mt-1">
              <Calendar className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="truncate">
                {dateNum} {monthName} {year}, <span className="text-amber-400/90">{dayName}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
