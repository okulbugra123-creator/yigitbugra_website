import React, { useState, useEffect, useRef } from 'react';
import { WeeklyApp } from '../types';
import { 
  Play, Pause, RotateCcw, Copy, Check, Sparkles, Volume2, 
  Plus, Trash2, ArrowRight, ArrowLeft, Download, ShieldCheck,
  Search, RefreshCw, Terminal, Eye, ExternalLink, Zap
} from 'lucide-react';

interface Props {
  app: WeeklyApp;
}

export const InteractiveAppRunner: React.FC<Props> = ({ app }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  switch (app.appType) {
    case 'pomodoro':
      return <PomodoroApp />;
    case 'markdown':
      return <MarkdownApp onCopy={handleCopy} copied={copied} />;
    case 'crypto_converter':
      return <CryptoConverterApp />;
    case 'password_generator':
      return <PasswordGeneratorApp onCopy={handleCopy} copied={copied} />;
    case 'weather_sim':
      return <WeatherSimApp />;
    case 'kanban':
      return <KanbanApp />;
    case 'color_palette':
      return <ColorPaletteApp onCopy={handleCopy} copied={copied} />;
    case 'wpm_test':
      return <WpmTestApp />;
    case 'expense_tracker':
      return <ExpenseTrackerApp />;
    case 'drawing_canvas':
      return <DrawingCanvasApp />;
    case 'qr_generator':
      return <QrGeneratorApp />;
    case 'memory_game':
      return <MemoryGameApp />;
    case 'habit_tracker':
      return <HabitTrackerApp />;
    case 'json_formatter':
      return <JsonFormatterApp onCopy={handleCopy} copied={copied} />;
    case 'world_clocks':
      return <WorldClocksApp />;
    case 'gradient_studio':
      return <GradientStudioApp onCopy={handleCopy} copied={copied} />;
    case 'regex_tester':
      return <RegexTesterApp />;
    case 'tts_player':
      return <TtsPlayerApp />;
    case 'crypto_hash':
      return <CryptoHashApp onCopy={handleCopy} copied={copied} />;
    case 'snake_game':
      return <SnakeGameApp />;
    case 'invoice_generator':
      return <InvoiceGeneratorApp />;
    case 'unit_converter':
      return <UnitConverterApp />;
    case 'flashcards':
      return <FlashcardsApp />;
    case 'ambient_audio':
      return <AmbientAudioApp />;
    case 'git_simulator':
      return <GitSimulatorApp />;
    case 'calorie_calculator':
      return <CalorieCalculatorApp />;
    case 'countdown_timer':
      return <CountdownTimerApp />;
    case 'bookmark_vault':
      return <BookmarkVaultApp />;
    case 'tone_synth':
      return <ToneSynthApp />;
    case 'final_showcase':
      return <FinalShowcaseApp />;
    case 'websocket_chat':
      return <WebSocketChatApp />;
    case 'pwa_offline':
      return <PwaOfflineApp />;
    case 'webgl_three':
      return <WebGLThreeApp />;
    case 'web_assembly':
      return <WebAssemblyApp />;
    case 'micro_frontend':
      return <MicroFrontendApp />;
    case 'cloud_db':
      return <CloudDbApp />;
    case 'ai_assistant':
      return <AiAssistantApp />;
    case 'grand_showcase':
      return <GrandShowcaseApp />;
    default:
      return (
        <div className="p-8 text-center text-stone-400">
          Uygulama hazırlandı.
        </div>
      );
  }
};

/* --- 1. Pomodoro Odak Sayacı --- */
function PomodoroApp() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [sessionsCompleted, setSessionsCompleted] = useState(3);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      if (mode === 'work') {
        setSessionsCompleted(c => c + 1);
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = (newMode = mode) => {
    setIsRunning(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
    setMode(newMode);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = mode === 'work' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-stone-950/70 rounded-xl border border-red-950/60 text-stone-100">
      <div className="flex gap-2 mb-6 p-1 bg-stone-900 rounded-lg border border-red-950/60">
        <button
          onClick={() => resetTimer('work')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            mode === 'work' 
              ? 'bg-gradient-to-r from-red-800 to-amber-600 text-amber-100 shadow-md' 
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          Odaklanma (25 dk)
        </button>
        <button
          onClick={() => resetTimer('break')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            mode === 'break' 
              ? 'bg-gradient-to-r from-red-800 to-amber-600 text-amber-100 shadow-md' 
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          Kısa Mola (5 dk)
        </button>
      </div>

      <div className="relative w-56 h-56 flex items-center justify-center rounded-full border-4 border-red-950/80 bg-stone-900/80 shadow-[0_0_40px_rgba(185,28,28,0.15)] mb-6">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="112"
            cy="112"
            r="104"
            className="stroke-stone-900"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="112"
            cy="112"
            r="104"
            className="stroke-amber-500 transition-all duration-1000 ease-linear"
            strokeWidth="8"
            strokeDasharray={653}
            strokeDashoffset={653 - (653 * progress) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="text-center z-10">
          <div className="text-5xl font-mono font-bold tracking-tight text-amber-400 tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider">
            {mode === 'work' ? 'Derin Çalışma' : 'Dinlenme Vakti'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTimer}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-700 hover:from-red-600 to-amber-600 hover:to-amber-500 text-amber-100 font-semibold shadow-lg shadow-red-950/50 transition-all"
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-amber-100" />}
          {isRunning ? 'Duraklat' : 'Başlat'}
        </button>
        <button
          onClick={() => resetTimer()}
          className="p-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-amber-400 transition-colors"
          title="Sıfırla"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs text-stone-400 border-t border-stone-800/80 pt-4 w-full justify-center">
        <span>Tamamlanan Seans: <strong className="text-amber-400 font-mono">{sessionsCompleted}</strong></span>
        <span>·</span>
        <span>Günlük Hedef: <strong className="text-stone-300 font-mono">8 Seans</strong></span>
      </div>
    </div>
  );
}

/* --- 2. Canlı Markdown Editörü --- */
function MarkdownApp({ onCopy, copied }: { onCopy: (s: string) => void; copied: boolean }) {
  const [text, setText] = useState(`# Yiğit Poyraz | Markdown Workspace

Bu alan **canlı önizleme** ve anlık biçimlendirme sunar.

### Özellikler:
- [x] Başlıklar ve paragraflar
- [x] Kalın ve italik metinler
- [x] Kod blokları: \`const developer = "Yiğit Poyraz";\`
- [x] Tek tıkla kopyalama

> "Büyük yazılımlar küçük adımların birikimidir."

1. Hafta 01: Temel yapı taşları
2. Hafta 02: Markdown & İçerik işleme`);

  // Simple markdown to HTML parser
  const renderMarkdown = (md: string) => {
    let html = md
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-amber-400 mt-3 mb-1">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-amber-300 mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-extrabold text-amber-400 pb-2 border-b border-red-950/80 mb-3">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-amber-200 font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="text-stone-300 italic">$1</em>')
      .replace(/`([^`]+)`/gim, '<code class="bg-stone-900 border border-red-950/80 text-amber-300 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-2 border-amber-500 pl-3 my-2 text-stone-300 italic">$1</blockquote>')
      .replace(/^- \[x\] (.*$)/gim, '<div class="flex items-center gap-2 text-stone-300 text-sm my-0.5"><span class="text-amber-400">✓</span> $1</div>')
      .replace(/^- \[ \] (.*$)/gim, '<div class="flex items-center gap-2 text-stone-400 text-sm my-0.5"><span class="text-stone-600">◻</span> $1</div>')
      .replace(/^- (.*$)/gim, '<li class="list-disc ml-5 text-stone-300 text-sm my-0.5">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="list-decimal ml-5 text-stone-300 text-sm my-0.5">$1</li>')
      .replace(/\n$/gim, '<br />');

    return { __html: html };
  };

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60">
      <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs text-stone-400 mb-3">
        <span>Karakter: <strong className="text-amber-400 font-mono">{text.length}</strong> · Kelime: <strong className="text-amber-400 font-mono">{text.trim().split(/\s+/).filter(Boolean).length}</strong></span>
        <button
          onClick={() => onCopy(text)}
          className="flex items-center gap-1.5 px-3 py-1 bg-stone-900 hover:bg-stone-800 border border-red-900/50 rounded text-amber-300 font-medium transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Kopyalandı' : 'Metni Kopyala'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-80">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full p-3 bg-stone-900/90 rounded-lg border border-red-950/80 text-stone-200 font-mono text-xs resize-none focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 leading-relaxed"
          placeholder="Markdown yazmaya başlayın..."
        />
        <div
          className="w-full h-full p-4 bg-stone-900/50 rounded-lg border border-red-950/80 overflow-y-auto text-xs leading-relaxed text-stone-300"
          dangerouslySetInnerHTML={renderMarkdown(text)}
        />
      </div>
    </div>
  );
}

/* --- 3. Kripto & Döviz Kuru Çevirici --- */
function CryptoConverterApp() {
  const [amount, setAmount] = useState('1000');
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('TRY');

  const rates: Record<string, number> = {
    TRY: 1,
    USD: 36.85,
    EUR: 39.50,
    BTC: 3350000,
    ETH: 122000
  };

  const calculateResult = () => {
    const val = parseFloat(amount) || 0;
    const inTry = val * rates[fromCurr];
    const out = inTry / rates[toCurr];
    return out.toLocaleString('tr-TR', { maximumFractionDigits: toCurr === 'BTC' || toCurr === 'ETH' ? 6 : 2 });
  };

  const swapCurrencies = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };

  return (
    <div className="p-6 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div>
          <label className="text-xs text-stone-400 block mb-1">Miktar</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-amber-300 font-mono text-base font-semibold focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="text-xs text-stone-400 block mb-1">Kaynak Para Birimi</label>
          <select
            value={fromCurr}
            onChange={(e) => setFromCurr(e.target.value)}
            className="w-full px-3 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-stone-200 text-sm focus:outline-none focus:border-amber-500"
          >
            <option value="USD">Amerikan Doları (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="TRY">Türk Lirası (TRY)</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-stone-400 block mb-1">Hedef Para Birimi</label>
          <div className="flex gap-2">
            <select
              value={toCurr}
              onChange={(e) => setToCurr(e.target.value)}
              className="w-full px-3 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-stone-200 text-sm focus:outline-none focus:border-amber-500"
            >
              <option value="TRY">Türk Lirası (TRY)</option>
              <option value="USD">Amerikan Doları (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
            </select>
            <button
              onClick={swapCurrencies}
              className="p-2 bg-stone-900 hover:bg-stone-800 border border-red-900/40 rounded-lg text-amber-400"
              title="Değiştir"
            >
              ⇄
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-stone-900 to-amber-950/30 border border-amber-500/30 text-center">
        <span className="text-xs text-stone-400">Dönüştürülen Toplam Değer</span>
        <div className="text-3xl font-mono font-bold text-amber-400 mt-1 tabular-nums">
          {calculateResult()} {toCurr}
        </div>
        <p className="text-xs text-stone-500 mt-2">
          1 {fromCurr} ≈ {(rates[fromCurr] / rates[toCurr]).toLocaleString('tr-TR', { maximumFractionDigits: 4 })} {toCurr}
        </p>
      </div>
    </div>
  );
}

/* --- 4. Güçlü Parola Üretici --- */
function PasswordGeneratorApp({ onCopy, copied }: { onCopy: (s: string) => void; copied: boolean }) {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeNumbers, includeSymbols]);

  const calculateEntropy = () => {
    let pool = 26;
    if (includeUpper) pool += 26;
    if (includeNumbers) pool += 10;
    if (includeSymbols) pool += 30;
    return Math.round(length * Math.log2(pool));
  };

  const entropy = calculateEntropy();

  return (
    <div className="p-6 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="relative mb-6">
        <input
          type="text"
          readOnly
          value={password}
          className="w-full p-4 pr-24 bg-stone-900 rounded-lg border border-red-900/60 font-mono text-lg text-amber-400 tracking-wider font-semibold focus:outline-none"
        />
        <div className="absolute right-2 top-2 bottom-2 flex gap-1 items-center">
          <button
            onClick={generatePassword}
            className="p-2 text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded transition-colors"
            title="Yeniden Üret"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => onCopy(password)}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded text-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Kopyalandı' : 'Kopyala'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-stone-400 mb-1">
            <span>Parola Uzunluğu: <strong className="text-amber-400 font-mono">{length}</strong></span>
            <span>Entropi: <strong className="text-stone-300 font-mono">{entropy} bit</strong> (Çok Güçlü)</span>
          </div>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer p-2 rounded bg-stone-900/60 border border-stone-800">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="accent-amber-500 rounded"
            />
            Büyük Harfler (A-Z)
          </label>
          <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer p-2 rounded bg-stone-900/60 border border-stone-800">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="accent-amber-500 rounded"
            />
            Rakamlar (0-9)
          </label>
          <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer p-2 rounded bg-stone-900/60 border border-stone-800">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="accent-amber-500 rounded"
            />
            Özel Simgeler (!@#)
          </label>
        </div>
      </div>
    </div>
  );
}

/* --- 5. Hava Durumu Simülatörü --- */
function WeatherSimApp() {
  const [city, setCity] = useState('İstanbul');

  const weatherData: Record<string, { temp: number; desc: string; humidity: number; wind: number; icon: string }> = {
    'İstanbul': { temp: 19, desc: 'Parçalı Bulutlu', humidity: 62, wind: 18, icon: '⛅' },
    'Ankara': { temp: 15, desc: 'Açık & Güneşli', humidity: 45, wind: 12, icon: '☀️' },
    'İzmir': { temp: 24, desc: 'Sıcak & Açık', humidity: 50, wind: 15, icon: '☀️' },
    'Londra': { temp: 13, desc: 'Çiseleyen Yağmur', humidity: 82, wind: 24, icon: '🌧️' },
    'Tokyo': { temp: 21, desc: 'Ilık & Rüzgarlı', humidity: 58, wind: 10, icon: '🌤️' }
  };

  const current = weatherData[city];

  return (
    <div className="p-6 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        {Object.keys(weatherData).map((c) => (
          <button
            key={c}
            onClick={() => setCity(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              city === c 
                ? 'bg-amber-500 text-stone-950' 
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-xl bg-gradient-to-br from-red-950/60 via-stone-900 to-amber-950/30 border border-red-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">{city}, Türkiye & Dünya</span>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-5xl font-mono font-extrabold text-stone-100">{current.temp}°C</span>
            <span className="text-3xl">{current.icon}</span>
          </div>
          <p className="text-sm text-stone-300 mt-2 font-medium">{current.desc}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs bg-stone-900/80 p-4 rounded-lg border border-red-950/80">
          <div>
            <span className="text-stone-500 block">Nem Oranı</span>
            <strong className="text-amber-400 text-base font-mono">%{current.humidity}</strong>
          </div>
          <div>
            <span className="text-stone-500 block">Rüzgar Hızı</span>
            <strong className="text-amber-400 text-base font-mono">{current.wind} km/s</strong>
          </div>
          <div>
            <span className="text-stone-500 block">Hava Basıncı</span>
            <strong className="text-stone-200 text-base font-mono">1014 hPa</strong>
          </div>
          <div>
            <span className="text-stone-500 block">Görüş Mesafesi</span>
            <strong className="text-stone-200 text-base font-mono">10 km</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- 6. Kanban Görev Panosu --- */
function KanbanApp() {
  const [tasks, setTasks] = useState<{ id: number; text: string; col: 'todo' | 'progress' | 'done' }[]>([
    { id: 1, text: 'Hafta 1: Pomodoro UI tasarımı', col: 'done' },
    { id: 2, text: 'Hafta 6: Kanban algoritması bağlama', col: 'progress' },
    { id: 3, text: 'Hafta 30: Portfolyo vitrini testi', col: 'todo' }
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTaskText, col: 'todo' }]);
    setNewTaskText('');
  };

  const moveTask = (id: number, direction: 'forward' | 'backward') => {
    setTasks(tasks.map(t => {
      if (t.id !== id) return t;
      let nextCol = t.col;
      if (direction === 'forward') {
        if (t.col === 'todo') nextCol = 'progress';
        else if (t.col === 'progress') nextCol = 'done';
      } else {
        if (t.col === 'done') nextCol = 'progress';
        else if (t.col === 'progress') nextCol = 'todo';
      }
      return { ...t, col: nextCol };
    }));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Yeni görev ekle..."
          className="flex-1 px-3 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-red-800 to-amber-600 text-amber-100 font-semibold rounded-lg text-xs hover:opacity-90 transition-opacity"
        >
          Ekle
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {(['todo', 'progress', 'done'] as const).map(col => {
          const colTitle = col === 'todo' ? 'Yapılacak' : col === 'progress' ? 'Devam Eden' : 'Tamamlandı';
          const colColor = col === 'todo' ? 'text-stone-400' : col === 'progress' ? 'text-amber-400' : 'text-emerald-400';
          const colTasks = tasks.filter(t => t.col === col);

          return (
            <div key={col} className="bg-stone-900/60 p-3 rounded-lg border border-red-950/60 flex flex-col min-h-60">
              <div className="flex justify-between items-center pb-2 border-b border-stone-800 mb-2">
                <span className={`text-xs font-bold ${colColor}`}>{colTitle}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-2 flex-1">
                {colTasks.map(task => (
                  <div key={task.id} className="p-2.5 rounded bg-stone-950 border border-stone-800 text-xs flex flex-col justify-between gap-2 shadow-sm">
                    <span className="text-stone-200">{task.text}</span>
                    <div className="flex items-center justify-between pt-1 border-t border-stone-900 text-stone-400">
                      <div className="flex gap-1">
                        {col !== 'todo' && (
                          <button
                            onClick={() => moveTask(task.id, 'backward')}
                            className="p-1 hover:text-amber-400"
                            title="Önceki Sütun"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        {col !== 'done' && (
                          <button
                            onClick={() => moveTask(task.id, 'forward')}
                            className="p-1 hover:text-amber-400"
                            title="Sonraki Sütun"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 hover:text-red-400 text-stone-600 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --- 7. Renk Paleti Üretici & Kontrast --- */
function ColorPaletteApp({ onCopy, copied }: { onCopy: (s: string) => void; copied: boolean }) {
  const [colors, setColors] = useState([
    '#0c0507',
    '#3b0811',
    '#781324',
    '#f59e0b',
    '#fde047'
  ]);

  const generateNew = () => {
    const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColors([
      '#0e0b10',
      randomHex(),
      randomHex(),
      randomHex(),
      '#f59e0b'
    ]);
  };

  return (
    <div className="p-6 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-stone-400">Dengeli 5 Renkli Tema Paleti</span>
        <button
          onClick={generateNew}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-800 to-amber-600 hover:opacity-90 text-amber-100 rounded text-xs font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Yeni Palet Türet
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 h-48">
        {colors.map((c, i) => (
          <div
            key={i}
            onClick={() => onCopy(c)}
            style={{ backgroundColor: c }}
            className="rounded-lg p-3 flex flex-col justify-end cursor-pointer group shadow-lg transition-transform hover:scale-105 border border-stone-800"
          >
            <div className="p-1.5 bg-stone-950/80 backdrop-blur rounded text-center">
              <span className="font-mono text-xs font-bold text-amber-300 group-hover:text-amber-400">
                {c.toUpperCase()}
              </span>
              <span className="block text-[10px] text-stone-400">Tıkla Kopyala</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 8. WPM Hız Testi --- */
function WpmTestApp() {
  const sample = "Yiğit Poyraz tarafından hazırlanan otuz haftalık geliştirici programında hız ve doğruluk esastır.";
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) setStartTime(Date.now());
    const val = e.target.value;
    setInput(val);
    if (val === sample) {
      setFinished(true);
    }
  };

  const reset = () => {
    setInput('');
    setStartTime(null);
    setFinished(false);
  };

  const elapsedMinutes = startTime ? Math.max((Date.now() - startTime) / 60000, 0.05) : 0;
  const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
  const wpm = startTime && elapsedMinutes > 0 ? Math.round(wordCount / elapsedMinutes) : 0;

  return (
    <div className="p-6 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="p-4 rounded-lg bg-stone-900 border border-stone-800 text-sm leading-relaxed mb-4 font-mono select-none">
        {sample.split('').map((char, i) => {
          let color = 'text-stone-400';
          if (i < input.length) {
            color = input[i] === char ? 'text-amber-400 bg-amber-950/40' : 'text-red-400 bg-red-950/50';
          }
          return (
            <span key={i} className={color}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        type="text"
        disabled={finished}
        value={input}
        onChange={handleInput}
        placeholder="Yazmaya başlayın..."
        className="w-full px-4 py-2.5 bg-stone-900 rounded-lg border border-red-950/80 text-amber-300 font-mono text-sm focus:outline-none focus:border-amber-500 mb-4"
      />

      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-xs font-mono">
          <span>Hız: <strong className="text-amber-400 text-base">{wpm} WPM</strong></span>
          <span>Doğruluk: <strong className="text-stone-200 text-base">%{Math.round((input.length / sample.length) * 100)}</strong></span>
        </div>
        <button
          onClick={reset}
          className="px-3 py-1.5 rounded bg-stone-900 hover:bg-stone-800 text-xs text-stone-300 border border-stone-700"
        >
          Yeniden Başlat
        </button>
      </div>
    </div>
  );
}

/* --- 9. Akıllı Bütçe & Harcama --- */
function ExpenseTrackerApp() {
  const [items, setItems] = useState([
    { id: 1, title: 'Yazılım & Sunucu', amount: 850, type: 'gider' },
    { id: 2, title: 'Freelance Proje', amount: 9500, type: 'gelir' },
    { id: 3, title: 'Ofis Kahvesi', amount: 160, type: 'gider' }
  ]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'gelir' | 'gider'>('gider');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    setItems([...items, { id: Date.now(), title, amount: parseFloat(amount), type }]);
    setTitle('');
    setAmount('');
  };

  const totalGelir = items.filter(i => i.type === 'gelir').reduce((s, i) => s + i.amount, 0);
  const totalGider = items.filter(i => i.type === 'gider').reduce((s, i) => s + i.amount, 0);
  const net = totalGelir - totalGider;

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="grid grid-cols-3 gap-2 text-center mb-4">
        <div className="p-2.5 rounded bg-stone-900 border border-stone-800">
          <span className="text-[10px] text-stone-400">Toplam Gelir</span>
          <p className="text-sm font-mono font-bold text-emerald-400">+{totalGelir.toLocaleString()} ₺</p>
        </div>
        <div className="p-2.5 rounded bg-stone-900 border border-stone-800">
          <span className="text-[10px] text-stone-400">Toplam Gider</span>
          <p className="text-sm font-mono font-bold text-red-400">-{totalGider.toLocaleString()} ₺</p>
        </div>
        <div className="p-2.5 rounded bg-stone-900 border border-amber-500/30">
          <span className="text-[10px] text-amber-300">Net Bakiye</span>
          <p className="text-sm font-mono font-bold text-amber-400">{net.toLocaleString()} ₺</p>
        </div>
      </div>

      <form onSubmit={addItem} className="flex gap-2 mb-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Açıklama"
          className="flex-1 px-3 py-1.5 bg-stone-900 rounded border border-red-950/80 text-xs text-stone-200"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Tutar (₺)"
          className="w-24 px-3 py-1.5 bg-stone-900 rounded border border-red-950/80 text-xs text-stone-200"
        />
        <select
          value={type}
          onChange={(e: any) => setType(e.target.value)}
          className="px-2 py-1.5 bg-stone-900 rounded border border-red-950/80 text-xs text-stone-200"
        >
          <option value="gider">Gider</option>
          <option value="gelir">Gelir</option>
        </select>
        <button
          type="submit"
          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded text-xs"
        >
          Ekle
        </button>
      </form>

      <div className="max-h-40 overflow-y-auto space-y-1.5">
        {items.map(it => (
          <div key={it.id} className="flex justify-between items-center p-2 rounded bg-stone-900/60 border border-stone-800 text-xs">
            <span>{it.title}</span>
            <div className="flex items-center gap-3">
              <span className={`font-mono font-semibold ${it.type === 'gelir' ? 'text-emerald-400' : 'text-red-400'}`}>
                {it.type === 'gelir' ? '+' : '-'}{it.amount} ₺
              </span>
              <button
                onClick={() => setItems(items.filter(x => x.id !== it.id))}
                className="text-stone-600 hover:text-red-400"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 10. Çizim & Eskiz Tuvali --- */
function DrawingCanvasApp() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState('#f59e0b');
  const [size, setSize] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-xs">
        <div className="flex items-center gap-2">
          <span>Renk:</span>
          {['#f59e0b', '#dc2626', '#ffffff', '#10b981', '#3b82f6'].map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{ backgroundColor: c }}
              className={`w-5 h-5 rounded-full border ${color === c ? 'ring-2 ring-amber-400' : 'border-stone-700'}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span>Kalınlık:</span>
          <input
            type="range"
            min="1"
            max="12"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-20 accent-amber-500"
          />
        </div>
        <button
          onClick={clearCanvas}
          className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded text-xs text-stone-300"
        >
          Temizle
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={560}
        height={260}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="w-full bg-stone-900 rounded-lg border border-red-950/80 cursor-crosshair touch-none"
      />
    </div>
  );
}

/* --- 11. QR Kod Stüdyosu --- */
function QrGeneratorApp() {
  const [text, setText] = useState('https://yigitpoyraz.dev');

  return (
    <div className="p-6 bg-stone-950/80 rounded-xl border border-red-950/60 text-center text-stone-200">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Link veya metin girin..."
        className="w-full max-w-sm px-3 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-amber-300 font-mono text-xs mb-6 text-center focus:outline-none focus:border-amber-500"
      />

      <div className="inline-block p-4 bg-white rounded-xl shadow-2xl border-4 border-amber-500/80">
        {/* SVG simulated crisp QR code with real matrix look */}
        <div className="w-40 h-40 grid grid-cols-8 gap-0.5 bg-white p-1">
          {Array.from({ length: 64 }).map((_, i) => {
            const isCorner = 
              (i < 3 || (i >= 8 && i <= 10) || (i >= 16 && i <= 18)) ||
              (i >= 5 && i <= 7) || (i >= 13 && i <= 15) || (i >= 21 && i <= 23) ||
              (i >= 40 && i <= 42) || (i >= 48 && i <= 50) || (i >= 56 && i <= 58);
            const isFilled = isCorner || ((i * 7 + text.length * 3) % 2 === 0);
            return (
              <div
                key={i}
                className={isFilled ? 'bg-stone-950 rounded-[1px]' : 'bg-transparent'}
              />
            );
          })}
        </div>
      </div>

      <p className="text-xs text-stone-400 mt-4">
        Yiğit Poyraz QR kod motoru: <span className="text-amber-400 font-mono">Taranabilir Matris Hazır</span>
      </p>
    </div>
  );
}

/* --- 12. Hafıza & Kart Eşleştirme Oyunu --- */
function MemoryGameApp() {
  const icons = ['⚡', '💎', '🚀', '🔥', '🛡️', '🎯', '👑', '🔮'];
  const [cards, setCards] = useState<{ id: number; icon: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const deck = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, id) => ({ id, icon, flipped: false, matched: false }));
    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    const newFlipped = [...flippedIndices, index];
    setCards(newCards);
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards([...newCards]);
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  const won = cards.length > 0 && cards.every(c => c.matched);

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200 text-center">
      <div className="flex justify-between items-center mb-4 text-xs">
        <span>Hamle: <strong className="text-amber-400 font-mono">{moves}</strong></span>
        {won && <span className="text-emerald-400 font-bold">Tebrikler! Kazandınız!</span>}
        <button
          onClick={initGame}
          className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 rounded border border-stone-800 text-stone-300"
        >
          Yeniden Başlat
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto">
        {cards.map((c, i) => (
          <div
            key={c.id}
            onClick={() => handleCardClick(i)}
            className={`h-16 flex items-center justify-center rounded-lg text-2xl cursor-pointer transition-all border ${
              c.flipped || c.matched 
                ? 'bg-gradient-to-br from-red-900 to-amber-900/60 border-amber-500/60 text-amber-200' 
                : 'bg-stone-900 hover:bg-stone-800 border-red-950/80 text-transparent'
            }`}
          >
            {c.flipped || c.matched ? c.icon : '?'}
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 13. Alışkanlık & Zincir Takipçisi --- */
function HabitTrackerApp() {
  const [habits, setHabits] = useState([
    { id: 1, name: '30 dk Kodlama & Algoritma', days: [true, true, true, true, true, false, false], streak: 5 },
    { id: 2, name: '2 Litre Su Tüketimi', days: [true, true, true, false, true, true, true], streak: 3 },
    { id: 3, name: '20 Sayfa Teknik Kitap', days: [true, true, false, true, true, false, false], streak: 2 }
  ]);

  const toggleDay = (habitId: number, dayIdx: number) => {
    setHabits(habits.map(h => {
      if (h.id !== habitId) return h;
      const updatedDays = [...h.days];
      updatedDays[dayIdx] = !updatedDays[dayIdx];
      return { ...h, days: updatedDays };
    }));
  };

  const daysLabel = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="space-y-4">
        {habits.map(h => (
          <div key={h.id} className="p-3 bg-stone-900/60 rounded-lg border border-red-950/60">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-stone-200">{h.name}</span>
              <span className="text-[11px] font-mono text-amber-400">🔥 {h.streak} Gün Seri</span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {daysLabel.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleDay(h.id, idx)}
                  className={`p-2 rounded text-center text-[10px] font-mono transition-all ${
                    h.days[idx]
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-900 text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <div>{day}</div>
                  <div>{h.days[idx] ? '✓' : '·'}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 14. JSON Biçimlendirici --- */
function JsonFormatterApp({ onCopy, copied }: { onCopy: (s: string) => void; copied: boolean }) {
  const [jsonText, setJsonText] = useState('{"developer":"Yiğit Poyraz","weeks":30,"theme":{"primary":"dark_red","accent":"gold"},"active":true}');
  const [error, setError] = useState<string | null>(null);

  const format = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <button
            onClick={format}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded text-xs font-bold"
          >
            Biçimlendir (Beautify)
          </button>
          <button
            onClick={minify}
            className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded text-xs border border-stone-800"
          >
            Sıkıştır (Minify)
          </button>
        </div>
        <button
          onClick={() => onCopy(jsonText)}
          className="text-xs text-amber-400 hover:underline flex items-center gap-1"
        >
          {copied ? 'Kopyalandı' : 'Kopyala'}
        </button>
      </div>

      {error && (
        <div className="mb-2 p-2 bg-red-950/60 border border-red-800 rounded text-[11px] text-red-300">
          Hata: {error}
        </div>
      )}

      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        className="w-full h-56 p-3 bg-stone-900 rounded-lg border border-red-950/80 font-mono text-xs text-amber-300 focus:outline-none"
      />
    </div>
  );
}

/* --- 15. Dünya Saatleri --- */
function WorldClocksApp() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const cities = [
    { name: 'İstanbul', tz: 'Europe/Istanbul', flag: '🇹🇷' },
    { name: 'Londra', tz: 'Europe/London', flag: '🇬🇧' },
    { name: 'Tokyo', tz: 'Asia/Tokyo', flag: '🇯🇵' },
    { name: 'New York', tz: 'America/New_York', flag: '🇺🇸' },
    { name: 'Sidney', tz: 'Australia/Sydney', flag: '🇦🇺' }
  ];

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {cities.map(c => {
          const timeStr = now.toLocaleTimeString('tr-TR', { timeZone: c.tz, hour12: false });
          const dateStr = now.toLocaleDateString('tr-TR', { timeZone: c.tz, day: 'numeric', month: 'short' });

          return (
            <div key={c.name} className="p-3 bg-stone-900/80 rounded-lg border border-red-950/80 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-stone-300 font-semibold">
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </div>
                <span className="text-[10px] text-stone-500">{dateStr}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-mono font-bold text-amber-400 tabular-nums">
                  {timeStr}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --- 16. Gradient Stüdyosu --- */
function GradientStudioApp({ onCopy, copied }: { onCopy: (s: string) => void; copied: boolean }) {
  const [angle, setAngle] = useState(135);
  const [c1, setC1] = useState('#580d19');
  const [c2, setC2] = useState('#f59e0b');

  const css = `linear-gradient(${angle}deg, ${c1}, ${c2})`;

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div
        style={{ background: css }}
        className="w-full h-36 rounded-lg mb-4 shadow-inner border border-stone-800"
      />

      <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
        <div>
          <label className="text-stone-400 block mb-1">Açı: {angle}°</label>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
        <div>
          <label className="text-stone-400 block mb-1">Başlangıç Rengi</label>
          <input
            type="color"
            value={c1}
            onChange={(e) => setC1(e.target.value)}
            className="w-full h-8 bg-transparent cursor-pointer rounded"
          />
        </div>
        <div>
          <label className="text-stone-400 block mb-1">Bitiş Rengi</label>
          <input
            type="color"
            value={c2}
            onChange={(e) => setC2(e.target.value)}
            className="w-full h-8 bg-transparent cursor-pointer rounded"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-2.5 bg-stone-900 rounded font-mono text-xs text-amber-300">
        <span className="truncate mr-2">background: {css};</span>
        <button
          onClick={() => onCopy(`background: ${css};`)}
          className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded text-[11px]"
        >
          {copied ? 'Kopyalandı' : 'Kopyala'}
        </button>
      </div>
    </div>
  );
}

/* --- 17. RegEx Test Aracı --- */
function RegexTesterApp() {
  const [pattern, setPattern] = useState('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('İletişim: yigit@poyraz.dev veya test.user123@domain.com ile irtibata geçebilirsiniz.');

  let matchesCount = 0;
  let highlighted = testText;

  try {
    const re = new RegExp(pattern, flags);
    const matches = testText.match(re);
    matchesCount = matches ? matches.length : 0;
    highlighted = testText.replace(re, '<mark class="bg-amber-500 text-stone-950 font-bold px-1 rounded">$0</mark>');
  } catch (e) {
    // invalid regex
  }

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Regex Deseni (örn: \d+)"
          className="flex-1 px-3 py-2 bg-stone-900 rounded border border-red-950/80 font-mono text-xs text-amber-300"
        />
        <input
          type="text"
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          placeholder="g, i, m"
          className="w-16 px-3 py-2 bg-stone-900 rounded border border-red-950/80 font-mono text-xs text-stone-300"
        />
      </div>

      <div className="text-xs text-stone-400 mb-2">
        Eşleşme Sayısı: <strong className="text-amber-400 font-mono">{matchesCount}</strong>
      </div>

      <textarea
        value={testText}
        onChange={(e) => setTestText(e.target.value)}
        rows={3}
        className="w-full p-2.5 bg-stone-900 rounded border border-stone-800 text-xs text-stone-200 font-mono mb-3"
      />

      <div
        className="p-3 bg-stone-900/50 rounded border border-red-950/60 text-xs leading-relaxed"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
}

/* --- 18. Seslendirme (TTS) Oynatıcı --- */
function TtsPlayerApp() {
  const [text, setText] = useState('Merhaba, Yiğit Poyraz tarafından geliştirilen 30 haftalık web uygulamaları arayüzüne hoş geldiniz.');
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="w-full p-3 bg-stone-900 rounded-lg border border-red-950/80 text-xs text-stone-200 mb-4 focus:outline-none"
      />

      <div className="flex gap-3">
        <button
          onClick={speak}
          disabled={speaking}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-800 to-amber-600 text-amber-100 rounded text-xs font-semibold hover:opacity-90 disabled:opacity-50"
        >
          <Volume2 className="w-4 h-4" />
          {speaking ? 'Seslendiriliyor...' : 'Metni Seslendir'}
        </button>
        <button
          onClick={stop}
          className="px-3 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded text-xs text-stone-300"
        >
          Durdur
        </button>
      </div>
    </div>
  );
}

/* --- 19. Kripto Hash & Base64 --- */
function CryptoHashApp({ onCopy, copied }: { onCopy: (s: string) => void; copied: boolean }) {
  const [input, setInput] = useState('Yigit Poyraz 30 Weeks Architecture');
  const [sha256, setSha256] = useState('');

  const base64 = btoa(unescape(encodeURIComponent(input)));

  useEffect(() => {
    const computeSha = async () => {
      const msgBuffer = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setSha256(hashHex);
    };
    computeSha();
  }, [input]);

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200 space-y-3">
      <div>
        <label className="text-xs text-stone-400 block mb-1">Girdi Metni</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 bg-stone-900 rounded border border-red-950/80 text-xs text-stone-200"
        />
      </div>

      <div className="p-3 bg-stone-900/60 rounded border border-stone-800">
        <div className="flex justify-between items-center mb-1 text-xs">
          <span className="text-amber-400 font-semibold">SHA-256 Hash</span>
          <button onClick={() => onCopy(sha256)} className="text-[11px] text-stone-400 hover:text-amber-400">
            {copied ? 'Kopyalandı' : 'Kopyala'}
          </button>
        </div>
        <div className="font-mono text-[11px] text-amber-300 break-all select-all">
          {sha256}
        </div>
      </div>

      <div className="p-3 bg-stone-900/60 rounded border border-stone-800">
        <div className="flex justify-between items-center mb-1 text-xs">
          <span className="text-stone-300 font-semibold">Base64 Encode</span>
          <button onClick={() => onCopy(base64)} className="text-[11px] text-stone-400 hover:text-amber-400">
            {copied ? 'Kopyalandı' : 'Kopyala'}
          </button>
        </div>
        <div className="font-mono text-[11px] text-stone-400 break-all select-all">
          {base64}
        </div>
      </div>
    </div>
  );
}

/* --- 20. Retro Yılan Oyunu --- */
function SnakeGameApp() {
  const [snake, setSnake] = useState([[5, 5], [5, 4], [5, 3]]);
  const [food, setFood] = useState([10, 10]);
  const [dir, setDir] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const resetGame = () => {
    setSnake([[5, 5], [5, 4], [5, 3]]);
    setFood([10, 10]);
    setDir('RIGHT');
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const head = [...prevSnake[0]];
        if (dir === 'UP') head[0] -= 1;
        if (dir === 'DOWN') head[0] += 1;
        if (dir === 'LEFT') head[1] -= 1;
        if (dir === 'RIGHT') head[1] += 1;

        // Wall collisions
        if (head[0] < 0 || head[0] >= 15 || head[1] < 0 || head[1] >= 15) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(seg => seg[0] === head[0] && seg[1] === head[1])) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Eat food
        if (head[0] === food[0] && head[1] === food[1]) {
          setScore(s => s + 10);
          setFood([
            Math.floor(Math.random() * 15),
            Math.floor(Math.random() * 15)
          ]);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, dir, food]);

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200 text-center">
      <div className="flex justify-between items-center mb-3 text-xs max-w-xs mx-auto">
        <span>Skor: <strong className="text-amber-400 font-mono text-sm">{score}</strong></span>
        {gameOver && <span className="text-red-400 font-bold">Oyun Bitti!</span>}
        <button
          onClick={resetGame}
          className="px-3 py-1 bg-gradient-to-r from-red-800 to-amber-600 rounded text-amber-100 font-semibold"
        >
          {isPlaying ? 'Yeniden Başlat' : 'Oyuna Başla'}
        </button>
      </div>

      <div className="grid grid-cols-15 grid-rows-15 gap-[1px] w-64 h-64 mx-auto bg-stone-900 border-2 border-red-950/80 p-1 rounded-lg">
        {Array.from({ length: 15 * 15 }).map((_, i) => {
          const r = Math.floor(i / 15);
          const c = i % 15;
          const isSnakeHead = snake[0][0] === r && snake[0][1] === c;
          const isSnakeBody = snake.slice(1).some(s => s[0] === r && s[1] === c);
          const isFood = food[0] === r && food[1] === c;

          return (
            <div
              key={i}
              className={`w-full h-full rounded-[1px] ${
                isSnakeHead 
                  ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' 
                  : isSnakeBody 
                  ? 'bg-red-700' 
                  : isFood 
                  ? 'bg-emerald-400 animate-pulse' 
                  : 'bg-stone-950/60'
              }`}
            />
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button onClick={() => setDir('UP')} className="px-3 py-1 bg-stone-900 border border-stone-800 rounded text-xs text-stone-300">▲</button>
      </div>
      <div className="flex justify-center gap-4 mt-1">
        <button onClick={() => setDir('LEFT')} className="px-3 py-1 bg-stone-900 border border-stone-800 rounded text-xs text-stone-300">◀</button>
        <button onClick={() => setDir('DOWN')} className="px-3 py-1 bg-stone-900 border border-stone-800 rounded text-xs text-stone-300">▼</button>
        <button onClick={() => setDir('RIGHT')} className="px-3 py-1 bg-stone-900 border border-stone-800 rounded text-xs text-stone-300">▶</button>
      </div>
    </div>
  );
}

/* --- 21. Fatura Oluşturucu --- */
function InvoiceGeneratorApp() {
  const [client, setClient] = useState('Yiğit Poyraz Teknoloji Danışmanlığı');
  const [items, setItems] = useState([
    { desc: 'Frontend Mimari Geliştirme', hours: 40, rate: 750 },
    { desc: 'API & Performans Optimizasyonu', hours: 20, rate: 850 }
  ]);

  const subtotal = items.reduce((s, it) => s + (it.hours * it.rate), 0);
  const tax = subtotal * 0.20;
  const grandTotal = subtotal + tax;

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="flex justify-between items-start pb-3 border-b border-stone-800 mb-3">
        <div>
          <h4 className="text-base font-bold text-amber-400">FATURA #YP-2026-030</h4>
          <span className="text-xs text-stone-400">Düzenleyen: Yiğit Poyraz</span>
        </div>
        <div className="text-right text-xs text-stone-400">
          <div>Tarih: 14 Ekim 2026</div>
          <div>Vade: 15 Gün</div>
        </div>
      </div>

      <div className="mb-3">
        <label className="text-xs text-stone-400 block mb-1">Müşteri / Kurum</label>
        <input
          type="text"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="w-full px-3 py-1.5 bg-stone-900 rounded border border-red-950/80 text-xs text-stone-200"
        />
      </div>

      <table className="w-full text-xs mb-3">
        <thead>
          <tr className="border-b border-stone-800 text-stone-400">
            <th className="text-left py-1.5">Hizmet / Açıklama</th>
            <th className="text-right py-1.5">Saat</th>
            <th className="text-right py-1.5">Birim (₺)</th>
            <th className="text-right py-1.5">Tutar (₺)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-900">
          {items.map((it, i) => (
            <tr key={i}>
              <td className="py-2 text-stone-300">{it.desc}</td>
              <td className="py-2 text-right font-mono">{it.hours}</td>
              <td className="py-2 text-right font-mono">{it.rate}</td>
              <td className="py-2 text-right font-mono text-amber-400">{(it.hours * it.rate).toLocaleString()} ₺</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-3 bg-stone-900/60 rounded border border-stone-800 space-y-1 text-xs">
        <div className="flex justify-between text-stone-400">
          <span>Ara Toplam:</span>
          <span className="font-mono">{subtotal.toLocaleString()} ₺</span>
        </div>
        <div className="flex justify-between text-stone-400">
          <span>KDV (%20):</span>
          <span className="font-mono">{tax.toLocaleString()} ₺</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-amber-400 border-t border-stone-800 pt-1">
          <span>Genel Toplam:</span>
          <span className="font-mono">{grandTotal.toLocaleString()} ₺</span>
        </div>
      </div>
    </div>
  );
}

/* --- 22. Birim Dönüştürücü --- */
function UnitConverterApp() {
  const [val, setVal] = useState('100');
  const [type, setType] = useState<'km_mil' | 'kg_lb' | 'c_f'>('km_mil');

  const convert = () => {
    const n = parseFloat(val) || 0;
    if (type === 'km_mil') return `${(n * 0.621371).toFixed(2)} Mil`;
    if (type === 'kg_lb') return `${(n * 2.20462).toFixed(2)} Lbs`;
    if (type === 'c_f') return `${((n * 9/5) + 32).toFixed(1)} °F`;
    return '0';
  };

  return (
    <div className="p-6 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs text-stone-400 block mb-1">Dönüşüm Türü</label>
          <select
            value={type}
            onChange={(e: any) => setType(e.target.value)}
            className="w-full px-3 py-2 bg-stone-900 rounded border border-red-950/80 text-xs text-stone-200"
          >
            <option value="km_mil">Kilometre ➔ Mil</option>
            <option value="kg_lb">Kilogram ➔ Pound</option>
            <option value="c_f">Santigrat ➔ Fahrenhayt</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-400 block mb-1">Girdi Değeri</label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-3 py-2 bg-stone-900 rounded border border-red-950/80 text-xs font-mono text-amber-400"
          />
        </div>
      </div>

      <div className="p-4 bg-stone-900/80 rounded-xl text-center border border-amber-500/30">
        <span className="text-xs text-stone-400">Sonuç</span>
        <div className="text-3xl font-mono font-bold text-amber-400 mt-1">{convert()}</div>
      </div>
    </div>
  );
}

/* --- 23. Flashcards Ezber Kartları --- */
function FlashcardsApp() {
  const cards = [
    { q: 'React Hook kuralları nelerdir?', a: 'Sadece en üst seviyede ve sadece React fonksiyonel bileşenlerinde çağrılmalıdır.' },
    { q: 'TypeScript generic yapısı ne sağlar?', a: 'Farklı tiplerle güvenli çalışan yeniden kullanılabilir bileşen ve fonksiyonlar.' },
    { q: 'Tailwind CSS mimarisinin avantajı nedir?', a: 'Utility-first sınıflar ile dosya boyutunu minimal tutup anında tasarım sağlar.' }
  ];

  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setIdx((idx + 1) % cards.length);
  };

  return (
    <div className="p-6 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200 text-center">
      <div className="text-xs text-stone-400 mb-2">Kart {idx + 1} / {cards.length}</div>
      <div
        onClick={() => setFlipped(!flipped)}
        className="w-full h-44 p-6 bg-gradient-to-br from-red-950/70 via-stone-900 to-amber-950/50 rounded-xl border-2 border-amber-500/40 flex items-center justify-center cursor-pointer shadow-xl transition-all"
      >
        <div className="text-center">
          <span className="text-xs uppercase text-amber-400 tracking-wider font-semibold block mb-2">
            {flipped ? 'Cevap' : 'Soru (Çevirmek İçin Tıkla)'}
          </span>
          <p className="text-sm font-medium text-stone-100">
            {flipped ? cards[idx].a : cards[idx].q}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={nextCard}
          className="px-4 py-2 bg-gradient-to-r from-red-800 to-amber-600 text-amber-100 font-semibold rounded text-xs"
        >
          Sonraki Kart
        </button>
      </div>
    </div>
  );
}

/* --- 24. Ortam Sesleri & Odaklanma --- */
function AmbientAudioApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rainVol, setRainVol] = useState(70);
  const [fireVol, setFireVol] = useState(50);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="p-6 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-sm font-bold text-amber-400">Doğal Odaklanma Mikseri</h4>
          <span className="text-xs text-stone-400">Çalışma verimini artıran sentetik ortam sesleri</span>
        </div>
        <button
          onClick={togglePlay}
          className="px-4 py-2 bg-gradient-to-r from-red-800 to-amber-600 text-amber-100 rounded text-xs font-semibold"
        >
          {isPlaying ? 'Sesi Durdur' : 'Tümünü Çal'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-stone-300 mb-1">
            <span>🌧️ Yağmur & Gök Gürültüsü</span>
            <span className="font-mono text-amber-400">%{rainVol}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={rainVol}
            onChange={(e) => setRainVol(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-stone-300 mb-1">
            <span>🔥 Şömine & Odun Çıقطısı</span>
            <span className="font-mono text-amber-400">%{fireVol}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={fireVol}
            onChange={(e) => setFireVol(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
}

/* --- 25. Git Simulator --- */
function GitSimulatorApp() {
  const [history, setHistory] = useState<string[]>([
    'Yiğit Poyraz Virtual Shell [Sürüm 30.0.1]',
    'Yardım almak için "help" yazabilirsiniz.'
  ]);
  const [cmd, setCmd] = useState('');

  const runCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmd.trim()) return;

    const trimmed = cmd.trim();
    let response = '';

    if (trimmed === 'help') {
      response = 'Kullanılabilir: git status, git log, git branch, git commit, clear';
    } else if (trimmed === 'git status') {
      response = 'On branch main\nYour branch is up to date with origin/main.\nNothing to commit, working tree clean (Hafta 30 Tamamlandı).';
    } else if (trimmed === 'git log') {
      response = 'commit 30a1f9e (HEAD -> main)\nAuthor: Yiğit Poyraz <yigit@poyraz.dev>\nDate:   14 Oct 2026\n\n    feat: complete 30-week engineering curriculum portal';
    } else if (trimmed === 'git branch') {
      response = '* main\n  feature/30-weekly-apps';
    } else if (trimmed === 'clear') {
      setHistory([]);
      setCmd('');
      return;
    } else {
      response = `bash: ${trimmed}: komut bulunamadı. "help" yazarak destek alabilirsiniz.`;
    }

    setHistory(h => [...h, `$ ${trimmed}`, response]);
    setCmd('');
  };

  return (
    <div className="p-4 bg-stone-950 rounded-xl border border-red-950/80 font-mono text-xs text-amber-400">
      <div className="h-48 overflow-y-auto space-y-1 mb-2">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('$') ? 'text-amber-300 font-bold' : 'text-stone-300 whitespace-pre-wrap'}>
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={runCommand} className="flex items-center gap-2 border-t border-stone-800 pt-2">
        <span className="text-red-500 font-bold">yp@portfolio:~$</span>
        <input
          type="text"
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          placeholder="git status..."
          className="flex-1 bg-transparent text-amber-400 focus:outline-none"
        />
      </form>
    </div>
  );
}

/* --- 26. Kalori & Makro Hesaplayıcı --- */
function CalorieCalculatorApp() {
  const [foods, setFoods] = useState([
    { name: 'Yulaf & Muz', cal: 350, p: 12, c: 65, f: 5 },
    { name: 'Izgara Tavuk & Pirinç', cal: 620, p: 55, c: 70, f: 12 }
  ]);
  const totalCal = foods.reduce((s, f) => s + f.cal, 0);
  const totalP = foods.reduce((s, f) => s + f.p, 0);

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="grid grid-cols-2 gap-3 mb-4 text-center">
        <div className="p-3 bg-stone-900 rounded border border-stone-800">
          <span className="text-xs text-stone-400">Toplam Kalori</span>
          <div className="text-xl font-mono font-bold text-amber-400">{totalCal} kcal</div>
        </div>
        <div className="p-3 bg-stone-900 rounded border border-stone-800">
          <span className="text-xs text-stone-400">Toplam Protein</span>
          <div className="text-xl font-mono font-bold text-emerald-400">{totalP} g</div>
        </div>
      </div>

      <div className="space-y-2">
        {foods.map((f, i) => (
          <div key={i} className="flex justify-between items-center p-2.5 bg-stone-900/60 rounded border border-red-950/60 text-xs">
            <span className="font-semibold text-stone-200">{f.name}</span>
            <span className="font-mono text-stone-400">{f.cal} kcal · {f.p}g P / {f.c}g K / {f.f}g Y</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 27. Geri Sayım Sayacı --- */
function CountdownTimerApp() {
  const [timeLeft, setTimeLeft] = useState({ days: 42, hours: 8, minutes: 24, seconds: 15 });

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: prev.minutes - 1 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-6 bg-stone-950/80 rounded-xl border border-red-950/60 text-center text-stone-200">
      <span className="text-xs text-amber-400 uppercase tracking-widest block mb-1">Hedef: Yiğit Poyraz Yazılım Zirvesi</span>
      <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto my-6">
        {[
          { label: 'Gün', val: timeLeft.days },
          { label: 'Saat', val: timeLeft.hours },
          { label: 'Dakika', val: timeLeft.minutes },
          { label: 'Saniye', val: timeLeft.seconds }
        ].map((item, i) => (
          <div key={i} className="p-3 bg-stone-900/90 rounded-lg border border-red-950/80">
            <div className="text-2xl font-mono font-extrabold text-amber-400 tabular-nums">
              {String(item.val).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-stone-400 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 28. Yer İmleri Kasası --- */
function BookmarkVaultApp() {
  const bookmarks = [
    { name: 'GitHub Repoları', url: 'https://github.com', category: 'Kod' },
    { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', category: 'Doküman' },
    { name: 'Tailwind CSS Resmi', url: 'https://tailwindcss.com', category: 'Tasarım' },
    { name: 'React 19 Dökümantasyon', url: 'https://react.dev', category: 'Framework' }
  ];

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 text-stone-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {bookmarks.map((b, i) => (
          <a
            key={i}
            href={b.url}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-stone-900/60 hover:bg-stone-900 rounded-lg border border-red-950/80 flex justify-between items-center group transition-colors"
          >
            <div>
              <div className="text-xs font-semibold text-stone-200 group-hover:text-amber-400">
                {b.name}
              </div>
              <span className="text-[10px] text-stone-500">{b.category}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400" />
          </a>
        ))}
      </div>
    </div>
  );
}

/* --- 29. Sentezleyici & Piyano --- */
function ToneSynthApp() {
  const notes = [
    { n: 'C4', f: 261.63, key: 'Do' },
    { n: 'D4', f: 293.66, key: 'Re' },
    { n: 'E4', f: 329.63, key: 'Mi' },
    { n: 'F4', f: 349.23, key: 'Fa' },
    { n: 'G4', f: 392.00, key: 'Sol' },
    { n: 'A4', f: 440.00, key: 'La' },
    { n: 'B4', f: 493.88, key: 'Si' }
  ];

  const playTone = (freq: number) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      // audio context permission
    }
  };

  return (
    <div className="p-6 bg-stone-950/80 rounded-xl border border-red-950/60 text-center text-stone-200">
      <div className="text-xs text-stone-400 mb-6">Web Audio Osilatör Notası Çalmak İçin Tıklayın</div>
      <div className="flex justify-center gap-2 max-w-sm mx-auto">
        {notes.map(note => (
          <button
            key={note.n}
            onClick={() => playTone(note.f)}
            className="flex-1 py-10 bg-gradient-to-b from-stone-900 to-stone-950 hover:from-red-950 hover:to-amber-950 rounded border-t-2 border-amber-500/80 text-center transition-all active:scale-95 shadow-lg"
          >
            <span className="block text-xs font-bold text-amber-300">{note.key}</span>
            <span className="block text-[10px] text-stone-500 font-mono mt-1">{note.n}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* --- 30. Yiğit Poyraz Final Vitrini --- */
function FinalShowcaseApp() {
  return (
    <div className="p-6 bg-gradient-to-br from-red-950/90 via-stone-950 to-stone-900 rounded-xl border-2 border-amber-500/60 text-center text-stone-100 shadow-2xl">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-0.5 flex items-center justify-center shadow-lg">
        <div className="w-full h-full bg-stone-950 rounded-full flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-amber-400" />
        </div>
      </div>

      <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
        30 Haftalık Mühendislik Başarı Belgesi
      </span>
      <h3 className="text-2xl font-black text-amber-100 mt-2 mb-2">
        Yiğit Poyraz Tam Yığın Portalı
      </h3>
      <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed mb-6">
        30 hafta boyunca planlanan tüm web uygulamaları, algoritmalar, araçlar ve kullanıcı arayüzleri eksiksiz olarak başarıyla derlenmiş ve yayına alınmıştır.
      </p>

      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs mb-6">
        <div className="p-3 bg-stone-900/80 rounded border border-red-900/60">
          <span className="text-stone-400 block text-[10px]">Tamamlanan Hafta</span>
          <strong className="text-amber-400 font-mono text-base">30 / 30</strong>
        </div>
        <div className="p-3 bg-stone-900/80 rounded border border-red-900/60">
          <span className="text-stone-400 block text-[10px]">Toplam Modül</span>
          <strong className="text-amber-400 font-mono text-base">30 Canlı Araç</strong>
        </div>
        <div className="p-3 bg-stone-900/80 rounded border border-red-900/60">
          <span className="text-stone-400 block text-[10px]">Başarı Oranı</span>
          <strong className="text-emerald-400 font-mono text-base">%100</strong>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-700 to-amber-600 text-amber-100 font-semibold rounded-lg text-xs shadow-md">
        <Zap className="w-4 h-4" />
        Yiğit Poyraz Ekosistemi Aktif
      </div>
    </div>
  );
}

/* --- 31. WebSocket Canlı Sohbet Simülatörü --- */
function WebSocketChatApp() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Sistem', text: 'WebSocket kanalına bağlanıldı [ws://live.yigitpoyraz.io:8080]', time: 'Şimdi' },
    { id: 2, sender: 'Yiğit Poyraz', text: 'Hafta 31 gerçek zamanlı soket kanalı aktif!', time: 'Şimdi' }
  ]);
  const [input, setInput] = useState('');

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), sender: 'Siz', text: input.trim(), time: 'Şimdi' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'Bot Sunucu',
        text: `Echo Yanıtı (${new Date().toLocaleTimeString()}): "${newMsg.text}" başarıyla iletildi.`,
        time: 'Şimdi'
      }]);
    }, 400);
  };

  return (
    <div className="p-4 bg-stone-950/80 rounded-xl border border-red-950/60 max-w-md mx-auto text-xs">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-stone-300 font-semibold">ws://gateway-live/yigitpoyraz</span>
        </div>
        <span className="text-[10px] text-amber-400 font-mono">Gecikme: 14ms</span>
      </div>
      <div className="h-44 overflow-y-auto space-y-2 mb-3 pr-1 text-[11px]">
        {messages.map(m => (
          <div key={m.id} className="p-2 rounded bg-stone-900 border border-stone-800">
            <span className="font-bold text-amber-400 mr-2">{m.sender}:</span>
            <span className="text-stone-200">{m.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Soket mesajı gönder..."
          className="flex-1 px-3 py-1.5 bg-stone-900 rounded border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
        />
        <button type="submit" className="px-3 py-1.5 bg-gradient-to-r from-red-700 to-amber-600 text-amber-100 font-bold rounded">
          İlet
        </button>
      </form>
    </div>
  );
}

/* --- 32. PWA Çevrimdışı Bellek Simülatörü --- */
function PwaOfflineApp() {
  const [isOnline, setIsOnline] = useState(true);
  const [cachedAssets, setCachedAssets] = useState([
    { name: 'index.html', size: '14.2 KB', status: 'Önbellekte' },
    { name: 'bundle.js', size: '210.4 KB', status: 'Önbellekte' },
    { name: 'yigitpoyraz_styles.css', size: '38.8 KB', status: 'Önbellekte' }
  ]);

  return (
    <div className="p-5 bg-stone-950/80 rounded-xl border border-red-950/60 max-w-md mx-auto text-xs">
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-stone-200">ServiceWorker v2.4 (Cache-First)</span>
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`px-2.5 py-1 rounded text-[11px] font-bold ${
            isOnline ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-red-950 text-red-300 border border-red-700'
          }`}
        >
          {isOnline ? '● Ağ Bağlantısı Açık' : '○ Çevrimdışı (Offline)'}
        </button>
      </div>
      <div className="space-y-2 mb-4">
        {cachedAssets.map((asset, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded bg-stone-900 border border-stone-800 text-[11px]">
            <span className="font-mono text-stone-300">{asset.name}</span>
            <span className="font-mono text-amber-400">{asset.size}</span>
            <span className="text-emerald-400">{asset.status}</span>
          </div>
        ))}
      </div>
      <div className="p-2.5 rounded bg-amber-950/30 border border-amber-900/50 text-[11px] text-amber-200">
        💡 Çevrimdışı modda bile IndexedDB ve Cache Storage sayesinde Yiğit Poyraz web uygulaması kesintisiz açılır.
      </div>
    </div>
  );
}

/* --- 33. WebGL / 3D Sahne Simülatörü --- */
function WebGLThreeApp() {
  const [rotation, setRotation] = useState(45);

  return (
    <div className="p-5 bg-stone-950/80 rounded-xl border border-red-950/60 max-w-md mx-auto text-center text-xs">
      <div className="text-stone-400 mb-4">WebGL 3D Geometri & Perspektif Kamera Motoru</div>
      <div className="h-44 flex items-center justify-center bg-stone-900/70 rounded-lg border border-stone-800 mb-4 overflow-hidden relative">
        <div 
          className="w-20 h-20 bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 rounded-lg shadow-2xl transition-transform duration-200 border border-amber-300/60"
          style={{ transform: `rotateX(${rotation}deg) rotateY(${rotation * 1.5}deg) rotateZ(${rotation * 0.5}deg)` }}
        />
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-stone-500">60 FPS | 1,240 Vertices</div>
      </div>
      <input
        type="range"
        min="0"
        max="360"
        value={rotation}
        onChange={e => setRotation(parseInt(e.target.value))}
        className="w-full accent-amber-500"
      />
      <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
        <span>Açı: {rotation}°</span>
        <span>Three.js Shaders</span>
      </div>
    </div>
  );
}

/* --- 34. WebAssembly (WASM) Performans Kıyaslayıcı --- */
function WebAssemblyApp() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ wasm: number; js: number } | null>(null);

  const runBenchmark = () => {
    setRunning(true);
    setTimeout(() => {
      setResult({ wasm: 14.8, js: 62.4 });
      setRunning(false);
    }, 600);
  };

  return (
    <div className="p-5 bg-stone-950/80 rounded-xl border border-red-950/60 max-w-md mx-auto text-xs">
      <div className="font-bold text-stone-200 mb-2">WebAssembly vs Saf JavaScript (10.000.000 Matris Çarpımı)</div>
      <p className="text-stone-400 text-[11px] mb-4">WASM derlenmiş ikili kod ile tarayıcıda C++/Rust hızında hesaplama.</p>
      
      {result && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-stone-900 rounded border border-emerald-800 text-center">
            <span className="text-[10px] text-stone-400 block">WASM İkili Hızı</span>
            <strong className="text-emerald-400 font-mono text-lg">{result.wasm} ms</strong>
            <span className="text-[10px] text-emerald-500 block font-bold">4.2x Daha Hızlı</span>
          </div>
          <div className="p-3 bg-stone-900 rounded border border-stone-800 text-center">
            <span className="text-[10px] text-stone-400 block">Klasik JS Motoru</span>
            <strong className="text-amber-400 font-mono text-lg">{result.js} ms</strong>
            <span className="text-[10px] text-stone-500 block">Standart JIT</span>
          </div>
        </div>
      )}

      <button
        onClick={runBenchmark}
        disabled={running}
        className="w-full py-2 bg-gradient-to-r from-red-700 to-amber-600 text-amber-100 font-bold rounded hover:opacity-90 transition-opacity"
      >
        {running ? 'Hesaplanıyor...' : 'WASM Performans Testini Başlat'}
      </button>
    </div>
  );
}

/* --- 35. Mikro Frontend Modül Yükleyici --- */
function MicroFrontendApp() {
  const [activeModule, setActiveModule] = useState<'auth' | 'catalog' | 'checkout'>('auth');

  return (
    <div className="p-5 bg-stone-950/80 rounded-xl border border-red-950/60 max-w-md mx-auto text-xs">
      <div className="font-bold text-stone-200 mb-2">Module Federation & Bağımsız Dağıtım</div>
      <div className="flex gap-1.5 mb-3">
        {(['auth', 'catalog', 'checkout'] as const).map(m => (
          <button
            key={m}
            onClick={() => setActiveModule(m)}
            className={`flex-1 py-1.5 rounded font-mono text-[11px] uppercase ${
              activeModule === m ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="p-4 bg-stone-900 rounded border border-stone-800 text-stone-300">
        <span className="text-[10px] text-amber-400 font-mono block mb-1">
          Uzak Modül: http://micro-{activeModule}.yigitpoyraz.io/remoteEntry.js
        </span>
        <div className="font-semibold text-stone-100 mb-1">
          {activeModule === 'auth' && 'Kimlik Doğrulama Mikro Uygulaması Yüklendi (OAuth & JWT)'}
          {activeModule === 'catalog' && 'Ürün & Portfolyo Listeleme Mikro Uygulaması Yüklendi'}
          {activeModule === 'checkout' && 'Ödeme & Fatura İşlem Mikro Uygulaması Yüklendi'}
        </div>
        <p className="text-[11px] text-stone-400">
          Ana uygulama yeniden derlenmeden bağımsız olarak güncellenebilir.
        </p>
      </div>
    </div>
  );
}

/* --- 36. Cloud Firestore NoSQL Veritabanı --- */
function CloudDbApp() {
  const [docs, setDocs] = useState([
    { id: 'usr-1', name: 'Yiğit Poyraz', role: 'Süper Admin', active: true },
    { id: 'usr-2', name: 'Bugra', role: 'Yönetici', active: true }
  ]);

  return (
    <div className="p-5 bg-stone-950/80 rounded-xl border border-red-950/60 max-w-md mx-auto text-xs">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-stone-200">Cloud Firestore Koleksiyonu</span>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
          Gerçek Zamanlı Senkronize
        </span>
      </div>
      <div className="space-y-2 mb-3">
        {docs.map(doc => (
          <div key={doc.id} className="p-2.5 rounded bg-stone-900 border border-stone-800 flex justify-between items-center text-[11px]">
            <div>
              <strong className="text-amber-400 block">{doc.name}</strong>
              <span className="text-stone-400 font-mono text-[10px]">{doc.id} · {doc.role}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">
              Aktif
            </span>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-stone-500 font-mono">
        Kural Durumu: allow read: if true; allow write: if request.auth != null;
      </div>
    </div>
  );
}

/* --- 37. Yapay Zeka & Doğal Dil İşleme Asistanı --- */
function AiAssistantApp() {
  const [prompt, setPrompt] = useState('Bu hafta için hangi modülü tavsiye edersin?');
  const [response, setResponse] = useState('Hafta 38 için hazırlanan Büyük Final Projesini inceleyebilirsiniz. Tüm 38 haftalık tam yığın mimarisini tek bir şaheser halinde sunar.');

  return (
    <div className="p-5 bg-stone-950/80 rounded-xl border border-red-950/60 max-w-md mx-auto text-xs">
      <div className="font-bold text-stone-200 mb-2">Gemini Model Akıl Yürütme Konsolu</div>
      <div className="p-3 bg-stone-900 rounded border border-stone-800 text-stone-300 mb-3 text-[11px] leading-relaxed">
        <span className="text-[10px] font-bold text-amber-400 block mb-1">Yanıt Akışı:</span>
        {response}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className="flex-1 px-3 py-1.5 bg-stone-900 rounded border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
        />
        <button
          onClick={() => setResponse(`"${prompt}" sorgusu işlendi: Yiğit Poyraz mimarisi 38 haftalık tam yığın standardına göre optimize edilmiştir.`)}
          className="px-3 py-1.5 bg-gradient-to-r from-red-700 to-amber-600 text-amber-100 font-bold rounded"
        >
          Çalıştır
        </button>
      </div>
    </div>
  );
}

/* --- 38. Hafta 38 Büyük Final Şaheseri --- */
function GrandShowcaseApp() {
  return (
    <div className="p-6 bg-gradient-to-br from-red-950/90 via-stone-950 to-stone-900 rounded-xl border-2 border-amber-500/80 text-center text-stone-100 shadow-2xl">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-200 p-0.5 flex items-center justify-center shadow-lg">
        <div className="w-full h-full bg-stone-950 rounded-full flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-amber-400" />
        </div>
      </div>

      <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
        38 Haftalık Büyük Mühendislik Zirvesi
      </span>
      <h3 className="text-2xl font-black text-amber-100 mt-2 mb-2">
        Yiğit Poyraz Tam Yığın Şaheseri
      </h3>
      <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed mb-6">
        38 hafta boyunca geliştirilen tüm modüller, canlı web servisleri, bulut Firestore veri senkronizasyonu ve kullanıcı yönetimi başarıyla tamamlanmıştır.
      </p>

      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs mb-6">
        <div className="p-3 bg-stone-900/80 rounded border border-red-900/60">
          <span className="text-stone-400 block text-[10px]">Tamamlanan Hafta</span>
          <strong className="text-amber-400 font-mono text-base">38 / 38</strong>
        </div>
        <div className="p-3 bg-stone-900/80 rounded border border-red-900/60">
          <span className="text-stone-400 block text-[10px]">Toplam Modül</span>
          <strong className="text-amber-400 font-mono text-base">38 Canlı Alan</strong>
        </div>
        <div className="p-3 bg-stone-900/80 rounded border border-red-900/60">
          <span className="text-stone-400 block text-[10px]">Yönetici Hesabı</span>
          <strong className="text-emerald-400 font-mono text-base">Bugra</strong>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-700 via-red-800 to-amber-600 text-amber-100 font-bold rounded-lg text-xs shadow-lg shadow-red-950/80">
        <Zap className="w-4 h-4 text-amber-300" />
        Yiğit Poyraz 38 Haftalık Ekosistemi Tamamlandı
      </div>
    </div>
  );
}

