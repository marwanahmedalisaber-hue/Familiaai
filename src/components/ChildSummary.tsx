import { useFamilia } from '@/context/FamiliaContext';
import { Share2, Flame, Star, Zap, TrendingUp } from 'lucide-react';

export default function ChildSummary() {
  const { activeChild, t, handleShareAchievement, theme, isDark } = useFamilia();

  const xpToNext = (activeChild.level * 250) - activeChild.xp;
  const xpProgress = ((activeChild.xp % 250) / 250) * 100;

  const headingText = isDark ? 'text-white' : 'text-slate-900';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardBg = isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white/60 border-slate-200/80';
  const statBg = isDark ? 'bg-slate-900/50 border-slate-700/50' : 'bg-slate-50 border-slate-200';

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${cardBg} p-5`}>
      <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-tr ${theme.gradient} opacity-10 blur-2xl`} />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-2xl shadow-lg`}>
            {activeChild.avatar}
          </div>
          <div>
            <h2 className={`text-xl font-black ${headingText}`}>{activeChild.name}</h2>
            <p className={`text-xs ${subText}`}>{activeChild.ambition}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md bg-gradient-to-tr ${theme.gradient} text-white`}>
                {t.level} {activeChild.level}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-orange-400">
                <Flame className="w-3.5 h-3.5" />
                {activeChild.streak} {t.days}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleShareAchievement}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-colors ${isDark ? 'bg-slate-700/80 border-slate-600 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.shareAchievement}</span>
        </button>
      </div>

      <div className="relative mt-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className={`flex items-center gap-1 ${subText} font-semibold`}>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            {activeChild.xp} XP
          </span>
          <span className={subText}>{xpToNext} XP {t.of} {t.level} {activeChild.level + 1}</span>
        </div>
        <div className={`h-2.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'} overflow-hidden`}>
          <div className={`h-full rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-500`} style={{ width: `${xpProgress}%` }} />
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-2 mt-4">
        <StatCard icon={<Star className="w-4 h-4 text-amber-400" />} label={t.level} value={`${activeChild.level}`} isDark={isDark} statBg={statBg} />
        <StatCard icon={<TrendingUp className="w-4 h-4 text-emerald-400" />} label={t.streak} value={`${activeChild.streak}`} isDark={isDark} statBg={statBg} />
        <StatCard icon={<Zap className="w-4 h-4 text-cyan-400" />} label="XP" value={`${activeChild.xp}`} isDark={isDark} statBg={statBg} />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, isDark, statBg }: { icon: React.ReactNode; label: string; value: string; isDark: boolean; statBg: string }) {
  return (
    <div className={`flex flex-col items-center gap-0.5 py-2 rounded-xl border ${statBg}`}>
      {icon}
      <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</span>
      <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'} uppercase tracking-wide`}>{label}</span>
    </div>
  );
}
