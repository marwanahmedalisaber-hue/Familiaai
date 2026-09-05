import { useState } from 'react';
import { FamiliaProvider, useFamilia } from '@/context/FamiliaContext';
import Onboarding from '@/components/Onboarding';
import Header from '@/components/Header';
import TabNav from '@/components/TabNav';
import TrialBanner from '@/components/TrialBanner';
import NotificationToast from '@/components/NotificationToast';
import ChildSummary from '@/components/ChildSummary';
import PinModal from '@/components/PinModal';
import AddChildModal from '@/components/AddChildModal';
import AddWishModal from '@/components/AddWishModal';
import AddGradeModal from '@/components/AddGradeModal';
import RoutineTab from '@/tabs/RoutineTab';
import CoachTab from '@/tabs/CoachTab';
import WishlistTab from '@/tabs/WishlistTab';
import ScreenTimeTab from '@/tabs/ScreenTimeTab';
import GradesTab from '@/tabs/GradesTab';
import ChildrenTab from '@/tabs/ChildrenTab';
import SupportTab from '@/tabs/SupportTab';
import type { TabId } from '@/types';
import { Loader2 } from 'lucide-react';

function FamiliaApp() {
  const { activeTab, theme, appPhase, isDark, authLoading, userRole } = useFamilia();
  const [showAddChild, setShowAddChild] = useState(false);
  const [showAddWish, setShowAddWish] = useState(false);
  const [showAddGrade, setShowAddGrade] = useState(false);

  if (authLoading) {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center`}>
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (appPhase !== 'app') {
    return <Onboarding />;
  }

  const tabs: Record<TabId, React.ReactNode> = {
    routine: <RoutineTab />,
    coach: <CoachTab />,
    wishlist: <WishlistTab onAddWish={() => setShowAddWish(true)} />,
    screentime: <ScreenTimeTab />,
    grades: <GradesTab onAddGrade={() => setShowAddGrade(true)} />,
    children: userRole === 'parent' ? <ChildrenTab onAddChild={() => setShowAddChild(true)} /> : <SupportTab />,
    support: <SupportTab />,
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${isDark ? 'text-slate-100' : 'text-slate-800'} flex flex-col transition-colors duration-300`}>
      <TrialBanner />
      <Header />
      <TabNav />

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 space-y-5">
        <ChildSummary />
        <div className="pb-8">{tabs[activeTab]}</div>
      </main>

      <NotificationToast />
      <PinModal />
      <AddChildModal show={showAddChild} onClose={() => setShowAddChild(false)} />
      <AddWishModal show={showAddWish} onClose={() => setShowAddWish(false)} />
      <AddGradeModal show={showAddGrade} onClose={() => setShowAddGrade(false)} />
    </div>
  );
}

export default function App() {
  return (
    <FamiliaProvider>
      <FamiliaApp />
    </FamiliaProvider>
  );
}
