import { useFamilia } from '@/context/FamiliaContext';
import type { TabId } from '@/types';
import { CheckCircle, MessageSquare, Gift, Smartphone, GraduationCap, Users, HelpCircle } from 'lucide-react';

const ALL_TABS: { id: TabId; icon: React.ReactNode; labelKey: 'navRoutine' | 'navCoach' | 'navWishlist' | 'navScreenTime' | 'navGrades' | 'navChildren' | 'navSupport'; parentOnly?: boolean }[] = [
  { id: 'routine', icon: <CheckCircle className="w-4 h-4" />, labelKey: 'navRoutine' },
  { id: 'coach', icon: <MessageSquare className="w-4 h-4" />, labelKey: 'navCoach' },
  { id: 'wishlist', icon: <Gift className="w-4 h-4" />, labelKey: 'navWishlist' },
  { id: 'screentime', icon: <Smartphone className="w-4 h-4" />, labelKey: 'navScreenTime' },
  { id: 'grades', icon: <GraduationCap className="w-4 h-4" />, labelKey: 'navGrades' },
  { id: 'children', icon: <Users className="w-4 h-4" />, labelKey: 'navChildren', parentOnly: true },
  { id: 'support', icon: <HelpCircle className="w-4 h-4" />, labelKey: 'navSupport' },
];

export default function TabNav() {
  const { t, activeTab, setActiveTab, theme, isRTL, userRole, isDark } = useFamilia();

  const tabs = ALL_TABS.filter((tab) => !(tab.parentOnly && userRole === 'child'));
  const navBg = isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/70 border-slate-200';
  const inactiveText = isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100';

  return (
    <nav className={`sticky top-[57px] z-30 backdrop-blur-md ${navBg} border-b`}>
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2" dir="ltr">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? `bg-gradient-to-tr ${theme.gradient} text-white shadow-lg`
                  : inactiveText
              }`}
            >
              {tab.icon}
              <span>{t[tab.labelKey]}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
