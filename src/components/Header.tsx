import { useFamilia } from '@/context/FamiliaContext';
import SettingsBar from '@/components/SettingsBar';
import { Shield, Baby, ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { t, theme, userRole, setUserRole, childrenList, activeChildId, setActiveChildId, isPinUnlocked, setShowPinModal, isRTL, isDark, handleSignOut } = useFamilia();
  const [showChildPicker, setShowChildPicker] = useState(false);

  const handleRoleSwitch = () => {
    if (userRole === 'child') {
      if (!isPinUnlocked) {
        setShowPinModal(true);
      } else {
        setUserRole('parent');
      }
    } else {
      setUserRole('child');
    }
  };

  const activeChild = childrenList.find((c) => c.id === activeChildId) || childrenList[0];
  const headerBg = isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-500' : 'text-slate-400';
  const dropdownBg = isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const dropdownHover = isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100';
  const dropdownActive = isDark ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-900';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md ${headerBg} border-b shadow-lg`}>
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-white font-black text-xl shadow-lg`}>
              F
            </div>
            <div>
              <h1 className={`text-lg font-black tracking-wide flex items-center gap-2 ${textPrimary}`}>
                Familia AI
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 font-semibold border border-emerald-500/30">
                  {t.proBadge}
                </span>
              </h1>
              <p className={`text-[10px] ${textSecondary} hidden sm:block`}>{t.subTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SettingsBar />

            <div className="relative">
              <button
                onClick={() => setShowChildPicker(!showChildPicker)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600' : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-slate-300'}`}
              >
                <span>{activeChild.avatar}</span>
                <span className="hidden md:inline">{activeChild.name}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {showChildPicker && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowChildPicker(false)} />
                  <div className={`absolute z-50 mt-2 w-48 rounded-xl ${dropdownBg} border shadow-2xl p-1.5 ${isRTL ? 'left-0' : 'right-0'}`}>
                    {childrenList.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => { setActiveChildId(child.id); setShowChildPicker(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${dropdownHover} transition-colors ${activeChildId === child.id ? dropdownActive : isDark ? 'text-slate-300' : 'text-slate-600'}`}
                      >
                        <span className="text-lg">{child.avatar}</span>
                        <span>{child.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleRoleSwitch}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                userRole === 'parent'
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-500 hover:bg-amber-500/20'
                  : 'bg-indigo-500/10 border-indigo-500/40 text-indigo-500 hover:bg-indigo-500/20'
              }`}
            >
              {userRole === 'parent' ? <Shield className="w-3.5 h-3.5" /> : <Baby className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{userRole === 'parent' ? t.parentRole : t.childRole}</span>
            </button>

            <button
              onClick={handleSignOut}
              title={t.signOut}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-500/40'
                  : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-rose-500 hover:border-rose-300'
              }`}
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
