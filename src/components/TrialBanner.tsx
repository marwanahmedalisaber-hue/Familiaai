import { useFamilia } from '@/context/FamiliaContext';
import { Sparkles, CreditCard } from 'lucide-react';

export default function TrialBanner() {
  const { t, trialDaysLeft, isSubscribed, setIsSubscribed } = useFamilia();

  if (isSubscribed) {
    return (
      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/30">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-semibold text-emerald-400">PRO Active</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/15 to-orange-500/15 border-b border-amber-500/30">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <span className="text-xs font-semibold text-amber-300">
          {t.trialBanner} ({trialDaysLeft} {t.trialDaysLeft})
        </span>
      </div>
      <button
        onClick={() => setIsSubscribed(true)}
        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 transition-colors"
      >
        <CreditCard className="w-3.5 h-3.5" />
        {t.subscribeBtn}
      </button>
    </div>
  );
}
