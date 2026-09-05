import { useFamilia } from '@/context/FamiliaContext';
import { Smartphone, Clock, AlertTriangle, Phone, Bell, Siren, Gamepad2, BookOpen, Infinity as InfinityIcon, Sparkles } from 'lucide-react';
import { useState } from 'react';

const TOTAL_MINS = 135; // 2h 15m
const FREE_MINS = 60;
const HOMEWORK_MINS = 15;
const FINAL_MINS = 60;

export default function ScreenTimeTab() {
  const { activeChild, t, theme, isDark, userRole } = useFamilia();
  const [unlimited, setUnlimited] = useState(false);

  const used = activeChild.screenTimeUsedMins;
  const remaining = Math.max(TOTAL_MINS - used, 0);
  const pct = Math.min((used / TOTAL_MINS) * 100, 100);
  const isOver = used > TOTAL_MINS;

  const hours = Math.floor(used / 60);
  const mins = used % 60;

  const headingText = isDark ? 'text-white' : 'text-slate-900';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardBg = isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white/60 border-slate-200/80';

  const segments = [
    { label: t.screenTimeFree, mins: FREE_MINS, icon: <Gamepad2 className="w-4 h-4 text-cyan-400" />, desc: t.screenTimeFreeDesc, color: 'from-cyan-500 to-blue-600' },
    { label: t.screenTimeHomework, mins: HOMEWORK_MINS, icon: <BookOpen className="w-4 h-4 text-amber-400" />, desc: t.screenTimeHomeworkDesc, color: 'from-amber-500 to-orange-600' },
    { label: t.screenTimeFinal, mins: FINAL_MINS, icon: <Sparkles className="w-4 h-4 text-emerald-400" />, desc: t.screenTimeFinalDesc, color: 'from-emerald-500 to-teal-600' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Smartphone className="w-5 h-5 text-cyan-400" />
        <h3 className={`text-lg font-black ${headingText}`}>{t.screenTimeLimit}</h3>
      </div>

      <div className={`rounded-2xl border ${cardBg} p-6 text-center`}>
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="10" className={isDark ? 'text-slate-700' : 'text-slate-200'} />
            <circle cx="60" cy="60" r="52" fill="none" stroke="url(#stgrad)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(pct / 100) * 327} 327`} className="transition-all duration-500" />
            <defs>
              <linearGradient id="stgrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={isOver ? '#EF4444' : '#06B6D4'} />
                <stop offset="100%" stopColor={isOver ? '#DC2626' : '#3B82F6'} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-black ${isOver ? 'text-rose-400' : headingText}`}>
              {unlimited ? <InfinityIcon className="w-8 h-8 mx-auto" /> : <>{hours > 0 ? `${hours}h ` : ''}{mins}m</>}
            </span>
            <span className={`text-xs ${subText}`}>{t.used}</span>
          </div>
        </div>
        {!unlimited && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <Clock className={`w-4 h-4 ${subText}`} />
            <span className={`text-sm ${subText}`}>
              {remaining > 0 ? `${remaining} ${t.mins} ${t.remaining}` : t.screenTimeDesc}
            </span>
          </div>
        )}
      </div>

      {!unlimited && (
        <div className="space-y-3">
          {segments.map((seg) => {
            const segPct = (seg.mins / TOTAL_MINS) * 100;
            return (
              <div key={seg.label} className={`rounded-2xl border ${cardBg} p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {seg.icon}
                    <span className={`text-sm font-bold ${headingText}`}>{seg.label}</span>
                  </div>
                  <span className={`text-xs font-bold ${subText}`}>{seg.mins} {t.mins}</span>
                </div>
                <div className={`h-2 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'} overflow-hidden mb-2`}>
                  <div className={`h-full rounded-full bg-gradient-to-r ${seg.color}`} style={{ width: `${segPct}%` }} />
                </div>
                <p className={`text-xs ${subText}`}>{seg.desc}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className={`rounded-2xl border ${cardBg} p-4`}>
        <p className={`text-sm font-bold ${headingText} mb-1`}>{t.screenTimeDesc}</p>
        <p className={`text-xs ${subText} mb-3`}>{t.exemptAppsNote}</p>
        <div className="grid grid-cols-3 gap-2">
          <ExemptCard icon={<Phone className="w-4 h-4 text-emerald-400" />} label="Calls" isDark={isDark} />
          <ExemptCard icon={<Bell className="w-4 h-4 text-amber-400" />} label="Alarms" isDark={isDark} />
          <ExemptCard icon={<Siren className="w-4 h-4 text-rose-400" />} label="Emergency" isDark={isDark} />
        </div>
      </div>

      {userRole === 'parent' && (
        <div className={`rounded-2xl border ${cardBg} p-4`}>
          <button
            onClick={() => setUnlimited(!unlimited)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <InfinityIcon className={`w-5 h-5 ${unlimited ? 'text-rose-400' : subText}`} />
              <span className={`text-sm font-bold ${headingText}`}>{t.screenTimeUnlimited}</span>
            </div>
            <div className={`w-10 h-6 rounded-full transition-colors ${unlimited ? 'bg-rose-500' : isDark ? 'bg-slate-600' : 'bg-slate-300'}`}>
              <div className={`w-4 h-4 rounded-full bg-white m-1 transition-transform ${unlimited ? 'translate-x-4' : ''}`} />
            </div>
          </button>
          {unlimited && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-rose-400">{t.screenTimeUnlimitedWarn}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ExemptCard({ icon, label, isDark }: { icon: React.ReactNode; label: string; isDark: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 py-3 rounded-xl border ${isDark ? 'bg-slate-900/50 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}>
      {icon}
      <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</span>
    </div>
  );
}
