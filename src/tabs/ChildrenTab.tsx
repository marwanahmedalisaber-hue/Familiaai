import { useFamilia } from '@/context/FamiliaContext';
import { Plus, Phone, Zap, Flame, GraduationCap, Users, Lock, Mail, Settings, UserPlus } from 'lucide-react';
import { useState } from 'react';

export default function ChildrenTab({ onAddChild }: { onAddChild: () => void }) {
  const { childrenList, t, theme, userRole, setActiveChildId, setActiveTab, isDark, guardians, handleAddGuardian } = useFamilia();
  const [showGuardianForm, setShowGuardianForm] = useState(false);
  const [gName, setGName] = useState('');
  const [gPhone, setGPhone] = useState('');

  const headingText = isDark ? 'text-white' : 'text-slate-900';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardBg = isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white/60 border-slate-200/80';
  const inputBg = isDark ? 'bg-slate-900/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900';

  const handleAddGuardianSubmit = () => {
    handleAddGuardian(gName, gPhone);
    setGName('');
    setGPhone('');
    setShowGuardianForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" />
          <h3 className={`text-lg font-black ${headingText}`}>{t.navChildren}</h3>
        </div>
        {userRole === 'parent' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGuardianForm(!showGuardianForm)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${cardBg} ${isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">{t.addGuardian}</span>
            </button>
            <button
              onClick={onAddChild}
              disabled={childrenList.length >= 5}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-tr ${theme.gradient} text-white disabled:opacity-40 hover:scale-105 transition-transform`}
            >
              <Plus className="w-4 h-4" />
              {t.addKid}
            </button>
          </div>
        )}
      </div>

      {showGuardianForm && userRole === 'parent' && (
        <div className={`rounded-2xl border ${cardBg} p-4 space-y-3`}>
          <h4 className={`text-sm font-bold ${headingText}`}>{t.addGuardian}</h4>
          <input type="text" value={gName} onChange={(e) => setGName(e.target.value)} placeholder={t.guardianName} className={`w-full px-4 py-2.5 rounded-xl border text-sm placeholder:text-slate-500 focus:outline-none ${inputBg}`} />
          <input type="tel" value={gPhone} onChange={(e) => setGPhone(e.target.value)} placeholder={t.guardianPhone} className={`w-full px-4 py-2.5 rounded-xl border text-sm placeholder:text-slate-500 focus:outline-none ${inputBg}`} />
          <button onClick={handleAddGuardianSubmit} disabled={!gName.trim() || !gPhone.trim()} className={`w-full py-2.5 rounded-xl text-sm font-bold bg-gradient-to-tr ${theme.gradient} text-white disabled:opacity-50 transition-transform hover:scale-[1.02]`}>
            {t.saveBtn}
          </button>
        </div>
      )}

      {guardians.length > 0 && (
        <div className="space-y-2">
          {guardians.map((g) => (
            <div key={g.id} className={`flex items-center gap-3 rounded-xl border ${cardBg} p-3`}>
              <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center">
                <Users className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-bold ${headingText}`}>{g.name}</p>
                <p className={`text-xs ${subText}`}>{g.phone}</p>
              </div>
              {g.verified ? (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">{t.guardianVerified}</span>
              ) : (
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md">{t.guardianVerifying}</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className={`flex items-center justify-between px-3 py-2 rounded-xl ${cardBg} border`}>
        <span className={`text-xs ${subText}`}>{childrenList.length}/5</span>
        <div className={`flex-1 mx-3 h-1.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'} overflow-hidden`}>
          <div className={`h-full rounded-full bg-gradient-to-r ${theme.gradient}`} style={{ width: `${(childrenList.length / 5) * 100}%` }} />
        </div>
        {childrenList.length >= 5 && (
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-400">
            <Lock className="w-3 h-3" />
            {t.extendedFamilyPlan}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {childrenList.map((child) => (
          <div key={child.id} className={`rounded-2xl border ${cardBg} p-4`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-xl shadow-lg`}>
                {child.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-black ${headingText}`}>{child.name}</h4>
                <p className={`text-xs ${subText} truncate`}>{child.ambition}</p>
              </div>
              {userRole === 'parent' && (
                <button className={`p-1.5 rounded-lg ${isDark ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-700' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'} transition-colors`}>
                  <Settings className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <MiniStat icon={<Zap className="w-3.5 h-3.5 text-amber-400" />} value={`${child.xp}`} label="XP" isDark={isDark} />
              <MiniStat icon={<Flame className="w-3.5 h-3.5 text-orange-400" />} value={`${child.streak}`} label={t.streak} isDark={isDark} />
              <MiniStat icon={<GraduationCap className="w-3.5 h-3.5 text-indigo-400" />} value={`${child.level}`} label={t.level} isDark={isDark} />
            </div>

            <div className="space-y-1 mb-3">
              <div className={`flex items-center gap-2 text-xs ${subText}`}>
                <Phone className="w-3.5 h-3.5" />
                <span>{child.phone}</span>
              </div>
              {child.email && (
                <div className={`flex items-center gap-2 text-xs ${subText}`}>
                  <Mail className="w-3.5 h-3.5" />
                  <span>{child.email}</span>
                </div>
              )}
            </div>

            {child.hobbies.length > 0 && (
              <div className="mb-3">
                <p className={`text-[10px] font-bold ${subText} uppercase mb-1`}>{t.hobbiesLabel}</p>
                <div className="flex flex-wrap gap-1">
                  {child.hobbies.map((h) => (
                    <span key={h.id} className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
                      {h.name} {h.time}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {t.linkedAccount}
              </span>
            </div>

            <button
              onClick={() => { setActiveChildId(child.id); setActiveTab('routine'); }}
              className={`w-full py-2 rounded-xl text-xs font-bold transition-colors ${isDark ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {t.selectChild}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniStat({ icon, value, label, isDark }: { icon: React.ReactNode; value: string; label: string; isDark: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-0.5 py-1.5 rounded-lg border ${isDark ? 'bg-slate-900/50 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}>
      {icon}
      <span className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</span>
      <span className={`text-[9px] ${isDark ? 'text-slate-500' : 'text-slate-400'} uppercase`}>{label}</span>
    </div>
  );
}
