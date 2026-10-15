import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, AlertCircle, Check } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  reason?: string | null;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  reason
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check credentials: adı Bugra şifre: Bugra123.
    const isUserValid = username.trim().toLowerCase() === 'bugra';
    const isPassValid = password === 'Bugra123.';

    if (isUserValid && isPassValid) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setUsername('');
        setPassword('');
        onLoginSuccess();
        onClose();
      }, 600);
    } else {
      setError('Kullanıcı adı veya şifre hatalı. Sadece yönetici (Bugra) yetkilidir.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm bg-stone-950 border border-red-900/80 rounded-2xl shadow-2xl p-6 ring-1 ring-amber-500/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-red-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-100">Yönetici Girişi</h3>
              <span className="text-[10px] text-stone-400 font-mono">Bugra Yetkili Yönetim Alanı</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-300 hover:bg-stone-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informative reason why admin is required */}
        {reason ? (
          <div className="mb-4 p-2.5 bg-amber-950/40 border border-amber-600/50 rounded-lg flex items-start gap-2 text-xs text-amber-200">
            <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <span>{reason}</span>
          </div>
        ) : (
          <div className="mb-4 p-2.5 bg-stone-900/80 border border-stone-800 rounded-lg flex items-start gap-2 text-xs text-stone-400">
            <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <span>Sitede link ekleme, değiştirme veya kopyalama/yapıştırma sadece yönetici (Bugra) tarafından yapılabilir.</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-2.5 bg-red-950/70 border border-red-800 rounded-lg flex items-center gap-2 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-2.5 bg-emerald-950/70 border border-emerald-800 rounded-lg flex items-center gap-2 text-xs text-emerald-200">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Giriş başarılı! Yönetici hakları aktif edildi.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-stone-300 font-semibold mb-1">
              Yönetici Adı
            </label>
            <input
              type="text"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Bugra"
              className="w-full px-3 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/80"
              required
            />
          </div>

          <div>
            <label className="block text-stone-300 font-semibold mb-1 flex items-center justify-between">
              <span>Şifre</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-stone-900 rounded-lg border border-red-950/80 text-amber-300 font-mono placeholder-stone-600 focus:outline-none focus:border-amber-500/80"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-amber-100 font-bold rounded-lg text-xs shadow-lg shadow-red-950/50 transition-all active:scale-95"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Yönetici Olarak Giriş Yap</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
