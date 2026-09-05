import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type {
  Child, RoutineTask, ChatMessage, LangCode, Theme, UserRole, TabId,
  Gender, FinancialTier, AppPhase, Guardian, Hobby, TimeOfDay,
} from '@/types';
import { INITIAL_CHILDREN, INITIAL_ROUTINE, DEFAULT_GIFT_IMAGE, FINANCIAL_XP_MULTIPLIERS } from '@/data/initialData';
import { TRANSLATIONS, type Translation } from '@/data/translations';
import { THEMES } from '@/data/themes';
import { LANGUAGES } from '@/data/languages';
import { supabase } from '@/lib/supabase';

interface Notification {
  id: number;
  msg: string;
  type: 'success' | 'error' | 'info';
}

interface FamiliaContextValue {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: Translation;
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
  userRole: UserRole;
  setUserRole: (r: UserRole) => void;
  activeChildId: string;
  setActiveChildId: (id: string) => void;
  activeChild: Child;
  isRTL: boolean;

  appPhase: AppPhase;
  setAppPhase: (p: AppPhase) => void;
  parentPhone: string;
  setParentPhone: (s: string) => void;
  otpCode: string;
  setOtpCode: (s: string) => void;
  generatedOtp: string;
  handleSendOtp: (method?: 'sms' | 'whatsapp', dial?: string) => void;
  handleVerifyOtp: () => void;
  handleConfirmSetup: () => void;
  financialTier: FinancialTier;
  setFinancialTier: (t: FinancialTier) => void;
  handleSelectFinancial: (tier: FinancialTier) => void;
  aiCalculatingXp: boolean;
  guardians: Guardian[];
  handleAddGuardian: (name: string, phone: string) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (b: boolean) => void;
  protectionEnabled: boolean;
  setProtectionEnabled: (b: boolean) => void;
  screenTimeEnabled: boolean;
  setScreenTimeEnabled: (b: boolean) => void;

  parentPin: string;
  isPinUnlocked: boolean;
  showPinModal: boolean;
  setShowPinModal: (b: boolean) => void;
  pinInput: string;
  setPinInput: (s: string) => void;
  handleVerifyPin: () => void;

  childrenList: Child[];
  routineTasks: RoutineTask[];
  hideGrades: boolean;
  setHideGrades: (b: boolean) => void;

  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (s: string) => void;
  isAiLoading: boolean;
  handleSendChatMessage: () => void;

  handleCompleteTask: (taskId: string) => void;
  handleParentApproveTask: (taskId: string, approve: boolean) => void;
  handleAddTask: (task: { title: string; titleAr: string; xp: number; timeOfDay: TimeOfDay; requiresVision: boolean; scheduledTime: string }) => void;
  handleEditTask: (taskId: string, updates: Partial<RoutineTask>) => void;
  handleDeleteTask: (taskId: string) => void;
  handleMissTask: (taskId: string) => void;

  handleCreateChild: (data: { name: string; gender: Gender; phone: string; email: string; password: string; ambition: string; hobbies: Hobby[] }) => void;
  handleEditChild: (childId: string, updates: Partial<Child>) => void;

  handleAddWishlistGoal: (title: string, image: string) => void;
  handleDeleteGoal: (goalId: string) => void;
  handleClaimReward: (goalId: string) => void;

  handleAddGrade: (subject: string, score: number, maxScore: number) => void;

  feedbackText: string;
  setFeedbackText: (s: string) => void;
  feedbackSent: boolean;
  feedbackReply: string | null;
  handleSendFeedback: () => void;

  handleShareAchievement: () => void;

  notification: Notification | null;
  triggerNotification: (msg: string, type?: 'success' | 'error' | 'info') => void;

  activeTab: TabId;
  setActiveTab: (t: TabId) => void;

  trialDaysLeft: number;
  isSubscribed: boolean;
  setIsSubscribed: (b: boolean) => void;

  householdId: string | null;
  authLoading: boolean;
  childLoginEmail: string;
  setChildLoginEmail: (s: string) => void;
  childLoginPassword: string;
  setChildLoginPassword: (s: string) => void;
  handleChildLogin: () => void;
  handleSignOut: () => void;
}

const FamiliaContext = createContext<FamiliaContextValue | null>(null);

export function FamiliaProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>('en');
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [isDark, setIsDark] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('parent');
  const [activeChildId, setActiveChildId] = useState('c1');
  const [activeTab, setActiveTab] = useState<TabId>('routine');

  const [appPhase, setAppPhase] = useState<AppPhase>('onboarding');
  const [parentPhone, setParentPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [financialTier, setFinancialTier] = useState<FinancialTier>('average');
  const [aiCalculatingXp, setAiCalculatingXp] = useState(false);
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [protectionEnabled, setProtectionEnabled] = useState(false);
  const [screenTimeEnabled, setScreenTimeEnabled] = useState(false);

  const [parentPin] = useState('1234');
  const [pinInput, setPinInput] = useState('');
  const [isPinUnlocked, setIsPinUnlocked] = useState(true);
  const [showPinModal, setShowPinModal] = useState(false);

  const [childrenList, setChildrenList] = useState<Child[]>(INITIAL_CHILDREN);
  const [routineTasks, setRoutineTasks] = useState<RoutineTask[]>(INITIAL_ROUTINE);
  const [hideGrades, setHideGrades] = useState(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{ sender: 'ai', text: '' }]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackReply, setFeedbackReply] = useState<string | null>(null);

  const [notification, setNotification] = useState<Notification | null>(null);
  const [trialDaysLeft] = useState(7);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [householdId, setHouseholdId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [childLoginEmail, setChildLoginEmail] = useState('');
  const [childLoginPassword, setChildLoginPassword] = useState('');

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const activeChild = childrenList.find((c) => c.id === activeChildId) || childrenList[0];
  const isRTL = LANGUAGES.find((l) => l.code === lang)?.dir === 'rtl';

  useEffect(() => {
    document.dir = isRTL ? 'rtl' : 'ltr';
  }, [lang, isRTL]);

  useEffect(() => {
    setChatMessages([{ sender: 'ai', text: lang === 'ar' ? t.aiCoachIntroAr : t.aiCoachIntro }]);
  }, [lang]);

  // Auth state listener
  useEffect(() => {
    let mounted = true;

    supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        if (!mounted) return;
        if (session?.user) {
          const userId = session.user.id;
          const { data: member } = await supabase
            .from('household_members')
            .select('household_id, role, display_name')
            .eq('user_id', userId)
            .maybeSingle();

          if (member) {
            setHouseholdId(member.household_id);
            setUserRole(member.role as UserRole);
            if (member.role === 'parent') {
              setAppPhase('app');
            } else {
              setAppPhase('app');
            }
            await loadHouseholdData(member.household_id);
          }
        } else {
          setHouseholdId(null);
          if (appPhase === 'app') {
            setAppPhase('onboarding');
          }
        }
        setAuthLoading(false);
      })();
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (!session) {
        setAuthLoading(false);
        setAppPhase('onboarding');
      }
    });

    return () => { mounted = false; };
  }, []);

  const loadHouseholdData = async (hhId: string) => {
    try {
      const { data: children } = await supabase
        .from('children_profiles')
        .select('*')
        .eq('household_id', hhId);

      if (children && children.length > 0) {
        const fullChildren: Child[] = await Promise.all(children.map(async (c) => {
          const { data: hobs } = await supabase.from('hobbies').select('*').eq('child_id', c.id);
          const { data: grds } = await supabase.from('grades').select('*').eq('child_id', c.id).order('date', { ascending: false });
          const { data: wishes } = await supabase.from('wishlist_items').select('*').eq('child_id', c.id);
          return mapDbChildToChild(c, hobs || [], grds || [], wishes || []);
        }));
        setChildrenList(fullChildren);
        if (fullChildren.length > 0) setActiveChildId(fullChildren[0].id);
      }

      const { data: tasks } = await supabase
        .from('routine_tasks')
        .select('*')
        .eq('household_id', hhId)
        .order('sort_order', { ascending: true });

      if (tasks && tasks.length > 0) {
        setRoutineTasks(tasks.map(mapDbTaskToTask));
      }

      const { data: grds } = await supabase.from('guardians').select('*').eq('household_id', hhId);
      if (grds) setGuardians(grds.map((g) => ({ id: g.id, name: g.name, phone: g.phone, verified: g.verified })));

      const { data: settings } = await supabase.from('app_settings').select('*').eq('user_id', (await supabase.auth.getUser()).data.user?.id).maybeSingle();
      if (settings) {
        if (settings.language) setLang(settings.language as LangCode);
        if (settings.theme_id) {
          const th = THEMES.find((t2) => t2.id === settings.theme_id);
          if (th) setTheme(th);
        }
        if (typeof settings.is_dark === 'boolean') {
          setIsDark(settings.is_dark);
          if (settings.is_dark) {
            const dt = THEMES.filter((t2) => !t2.isLight);
            if (!dt.find((t2) => t2.id === settings.theme_id)) setTheme(dt[0]);
          } else {
            const lt = THEMES.filter((t2) => t2.isLight);
            if (!lt.find((t2) => t2.id === settings.theme_id)) setTheme(lt[0]);
          }
        }
        setNotificationsEnabled(settings.notifications_enabled || false);
        setProtectionEnabled(settings.protection_enabled || false);
        setScreenTimeEnabled(settings.screen_time_enabled || false);
      }
    } catch (err) {
      console.error('Error loading household data:', err);
    }
  };

  const triggerNotification = useCallback((msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ id: Date.now(), msg, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  const updateChildXP = useCallback((childId: string, amount: number) => {
    setChildrenList((prev) =>
      prev.map((c) => {
        if (c.id !== childId) return c;
        const newXp = Math.max(0, c.xp + amount);
        const newLevel = Math.floor(newXp / 250) + 1;
        return { ...c, xp: newXp, level: newLevel };
      })
    );
    const child = childrenList.find((c) => c.id === childId);
    if (child) {
      const newXp = Math.max(0, child.xp + amount);
      const newLevel = Math.floor(newXp / 250) + 1;
      supabase.from('children_profiles').update({ xp: newXp, level: newLevel }).eq('id', childId).then();
    }
  }, [childrenList]);

  const calculateAiXpCost = useCallback((baseCost: number, tier: FinancialTier) => {
    const multiplier = FINANCIAL_XP_MULTIPLIERS[tier] || 1.5;
    return Math.round(baseCost * multiplier);
  }, []);

  // Auth: OTP (mock)
  const handleSendOtp = useCallback((method: 'sms' | 'whatsapp' = 'sms', dial: string = '+20') => {
    if (!parentPhone.trim()) return;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    const methodLabel = method === 'whatsapp' ? t.deliveryWhatsapp : t.deliverySms;
    triggerNotification(`${t.otpSent} ${methodLabel}`, 'success');
  }, [parentPhone, t, triggerNotification]);

  const handleVerifyOtp = useCallback(() => {
    if (otpCode.length === 6) {
      setOtpCode('');
      setAppPhase('permissions');
    } else {
      triggerNotification(t.invalidOtp, 'error');
    }
  }, [otpCode, t, triggerNotification]);

  const handleSelectFinancial = useCallback((tier: FinancialTier) => {
    setFinancialTier(tier);
    setAiCalculatingXp(true);
    setAppPhase('summary');
    setChildrenList((prev) => prev.map((c) => ({ ...c, financialTier: tier })));
    setTimeout(() => {
      setAiCalculatingXp(false);
      triggerNotification(t.aiXpResult, 'success');
    }, 2000);
  }, [t, triggerNotification]);

  // Create parent auth account + household after summary confirmation
  const handleConfirmSetup = useCallback(async () => {
    setAuthLoading(true);
    const fullPhone = `${parentPhone}`;
    const email = `parent_${fullPhone}@familia.ai`;
    const password = `Familia_${fullPhone}`;

    // Transition to main app immediately so the user never sees a stuck spinner
    setAppPhase('app');

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError && !signUpError.message.includes('already')) {
        triggerNotification(signUpError.message, 'error');
        setAuthLoading(false);
        return;
      }

      let userId: string | undefined;

      if (signUpError?.message.includes('already')) {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          triggerNotification(signInError.message, 'error');
          setAuthLoading(false);
          return;
        }
        userId = signInData.user?.id;
      } else {
        userId = signUpData?.user?.id;
      }

      if (!userId) {
        setAuthLoading(false);
        return;
      }

      // Check if user already has a household
      const { data: existingMember } = await supabase
        .from('household_members')
        .select('household_id, role')
        .eq('user_id', userId)
        .maybeSingle();

      if (existingMember) {
        setHouseholdId(existingMember.household_id);
        setUserRole(existingMember.role as UserRole);
        await loadHouseholdData(existingMember.household_id);
        triggerNotification(t.pinUnlocked, 'success');
        setAuthLoading(false);
        return;
      }

      // Create household
      const { data: hhData } = await supabase
        .from('households')
        .insert({ financial_tier: financialTier, is_subscribed: isSubscribed })
        .select()
        .single();

      if (hhData) {
        setHouseholdId(hhData.id);
        await supabase.from('household_members').insert({ household_id: hhData.id, user_id: userId, role: 'parent', display_name: 'Parent' });
        await supabase.from('routine_tasks').insert(
          INITIAL_ROUTINE.map((task, i) => ({
            household_id: hhData.id,
            time_of_day: task.timeOfDay,
            title: task.title,
            title_ar: task.titleAr || task.title,
            xp: task.xp,
            requires_vision: task.requiresVision,
            scheduled_time: task.scheduledTime || '',
            sort_order: i,
          }))
        );
        await supabase.from('app_settings').upsert({
          user_id: userId,
          language: lang,
          theme_id: theme.id,
          is_dark: isDark,
          notifications_enabled: notificationsEnabled,
          protection_enabled: protectionEnabled,
          screen_time_enabled: screenTimeEnabled,
        });
        triggerNotification(t.setupComplete, 'success');
      }
    } catch (err) {
      console.error('Error creating account:', err);
      triggerNotification('Failed to create account', 'error');
    }
    setAuthLoading(false);
  }, [parentPhone, financialTier, isSubscribed, lang, theme, isDark, notificationsEnabled, protectionEnabled, screenTimeEnabled, t, triggerNotification]);

  const handleAddGuardian = useCallback((name: string, phone: string) => {
    if (!name.trim() || !phone.trim() || !householdId) return;
    supabase.from('guardians').insert({ household_id: householdId, name, phone, verified: false }).then(({ data }) => {
      if (data) {
        setGuardians((prev) => [...prev, { id: (data as any).id, name, phone, verified: false }]);
      }
    });
    triggerNotification(t.guardianVerifying, 'info');
    setTimeout(() => {
      setGuardians((prev) => prev.map((g) => (g.phone === phone ? { ...g, verified: true } : g)));
      if (householdId) {
        supabase.from('guardians').update({ verified: true }).eq('phone', phone).eq('household_id', householdId).then();
      }
      triggerNotification(t.guardianVerified, 'success');
    }, 1500);
  }, [householdId, t, triggerNotification]);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => {
      const newDark = !prev;
      const lightThemes = THEMES.filter((th) => th.isLight);
      const darkThemes = THEMES.filter((th) => !th.isLight);
      if (newDark) setTheme(darkThemes[0]);
      else setTheme(lightThemes[0]);
      return newDark;
    });
  }, []);

  const handleVerifyPin = useCallback(() => {
    if (pinInput === parentPin) {
      setIsPinUnlocked(true);
      setUserRole('parent');
      setShowPinModal(false);
      setPinInput('');
      triggerNotification(t.pinUnlocked, 'success');
    } else {
      triggerNotification(t.invalidPin, 'error');
    }
  }, [pinInput, parentPin, t, triggerNotification]);

  // Task completion
  const handleCompleteTask = useCallback((taskId: string) => {
    const task = routineTasks.find((r) => r.id === taskId);
    if (!task || task.completed) return;

    if (userRole === 'child' && task.requiresVision) {
      setIsAiLoading(true);
      setTimeout(() => {
        setIsAiLoading(false);
        setRoutineTasks((prev) => prev.map((r) => (r.id === taskId ? { ...r, completed: true, parentApproved: false } : r)));
        triggerNotification(t.aiSentToParent, 'info');
        if (householdId && activeChildId) {
          supabase.from('task_completions').upsert({
            child_id: activeChildId,
            task_id: taskId,
            completion_date: new Date().toISOString().split('T')[0],
            completed: true,
            parent_approved: false,
          }).then();
        }
      }, 1200);
    } else {
      setRoutineTasks((prev) => prev.map((r) => (r.id === taskId ? { ...r, completed: true, parentApproved: true } : r)));
      updateChildXP(activeChildId, task.xp);
      triggerNotification(`+${task.xp} XP`, 'success');
      if (householdId && activeChildId) {
        supabase.from('task_completions').upsert({
          child_id: activeChildId,
          task_id: taskId,
          completion_date: new Date().toISOString().split('T')[0],
          completed: true,
          parent_approved: true,
        }).then();
      }
    }
  }, [routineTasks, userRole, activeChildId, householdId, updateChildXP, triggerNotification, t]);

  const handleParentApproveTask = useCallback((taskId: string, approve: boolean) => {
    const task = routineTasks.find((r) => r.id === taskId);
    if (approve) {
      setRoutineTasks((prev) => prev.map((r) => (r.id === taskId ? { ...r, completed: true, parentApproved: true } : r)));
      if (task) updateChildXP(activeChildId, task.xp);
      triggerNotification(t.xpGranted, 'success');
    } else {
      setRoutineTasks((prev) => prev.map((r) => (r.id === taskId ? { ...r, completed: false, parentApproved: false } : r)));
      triggerNotification(t.taskRejected, 'info');
    }
    if (householdId && activeChildId) {
      supabase.from('task_completions').update({
        completed: approve,
        parent_approved: approve,
      }).eq('child_id', activeChildId).eq('task_id', taskId).eq('completion_date', new Date().toISOString().split('T')[0]).then();
    }
  }, [routineTasks, activeChildId, householdId, updateChildXP, triggerNotification, t]);

  const handleAddTask = useCallback((data: { title: string; titleAr: string; xp: number; timeOfDay: TimeOfDay; requiresVision: boolean; scheduledTime: string }) => {
    const newTask: RoutineTask = {
      id: `r_${Date.now()}`,
      timeOfDay: data.timeOfDay,
      title: data.title,
      titleAr: data.titleAr || data.title,
      xp: data.xp,
      requiresVision: data.requiresVision,
      completed: false,
      parentApproved: false,
      proofImage: '',
      scheduledTime: data.scheduledTime,
    };
    setRoutineTasks((prev) => [...prev, newTask]);
    if (householdId) {
      supabase.from('routine_tasks').insert({
        household_id: householdId,
        time_of_day: data.timeOfDay,
        title: data.title,
        title_ar: data.titleAr,
        xp: data.xp,
        requires_vision: data.requiresVision,
        scheduled_time: data.scheduledTime,
      }).then();
    }
    triggerNotification(t.taskAdded, 'success');
  }, [householdId, t, triggerNotification]);

  const handleEditTask = useCallback((taskId: string, updates: Partial<RoutineTask>) => {
    setRoutineTasks((prev) => prev.map((r) => (r.id === taskId ? { ...r, ...updates } : r)));
    if (householdId) {
      const dbUpdates: Record<string, any> = {};
      if (updates.title) dbUpdates.title = updates.title;
      if (updates.titleAr) dbUpdates.title_ar = updates.titleAr;
      if (updates.xp !== undefined) dbUpdates.xp = updates.xp;
      if (updates.timeOfDay) dbUpdates.time_of_day = updates.timeOfDay;
      if (updates.requiresVision !== undefined) dbUpdates.requires_vision = updates.requiresVision;
      if (updates.scheduledTime !== undefined) dbUpdates.scheduled_time = updates.scheduledTime;
      supabase.from('routine_tasks').update(dbUpdates).eq('id', taskId).then();
    }
    triggerNotification(t.taskEdited, 'success');
  }, [householdId, t, triggerNotification]);

  const handleDeleteTask = useCallback((taskId: string) => {
    setRoutineTasks((prev) => prev.filter((r) => r.id !== taskId));
    if (householdId) {
      supabase.from('routine_tasks').delete().eq('id', taskId).then();
    }
    triggerNotification(t.taskDeleted, 'info');
  }, [householdId, t, triggerNotification]);

  const handleMissTask = useCallback((taskId: string) => {
    const task = routineTasks.find((r) => r.id === taskId);
    if (!task || task.completed) return;
    setRoutineTasks((prev) => prev.map((r) => (r.id === taskId ? { ...r, missed: true, completed: true, parentApproved: false } : r)));
    updateChildXP(activeChildId, -task.xp);
    triggerNotification(t.missedTask, 'error');
    if (householdId && activeChildId) {
      supabase.from('task_completions').upsert({
        child_id: activeChildId,
        task_id: taskId,
        completion_date: new Date().toISOString().split('T')[0],
        completed: true,
        parent_approved: false,
        missed: true,
      }).then();
    }
  }, [routineTasks, activeChildId, householdId, updateChildXP, triggerNotification, t]);

  const handleCreateChild = useCallback((data: { name: string; gender: Gender; phone: string; email: string; password: string; ambition: string; hobbies: Hobby[] }) => {
    if (childrenList.length >= 5) {
      triggerNotification(t.childLimitWarning, 'error');
      return;
    }
    if (!data.name.trim()) return;
    const newChild: Child = {
      id: `c_${Date.now()}`,
      name: data.name,
      arabicName: data.name,
      gender: data.gender,
      avatar: data.gender === 'boy' ? '👦🚀' : '👧✨',
      phone: data.phone || '+201000000000',
      email: data.email || '',
      password: data.password || '',
      ambition: data.ambition || 'Future Champion',
      hobbies: data.hobbies || [],
      xp: 200,
      level: 1,
      streak: 1,
      financialTier: financialTier,
      screenTimeUsedMins: 0,
      grades: [],
      wishlist: [],
    };
    setChildrenList((prev) => [...prev, newChild]);
    setActiveChildId(newChild.id);
    triggerNotification(t.childAdded, 'success');

    if (householdId) {
      supabase.from('children_profiles').insert({
        household_id: householdId,
        name: data.name,
        arabic_name: data.name,
        gender: data.gender,
        avatar: newChild.avatar,
        phone: data.phone || '',
        email: data.email || '',
        ambition: data.ambition || '',
        xp: 200,
        level: 1,
        streak: 1,
        financial_tier: financialTier,
      }).then(({ data: inserted }) => {
        if (inserted && (inserted as any[]).length > 0) {
          const newId = (inserted as any[])[0].id;
          setActiveChildId(newId);
          if (data.hobbies.length > 0) {
            supabase.from('hobbies').insert(
              data.hobbies.map((h) => ({
                child_id: newId,
                name: h.name,
                days: h.days,
                time: h.time,
              }))
            ).then();
          }
        }
      });
    }
  }, [childrenList.length, financialTier, householdId, t, triggerNotification]);

  const handleEditChild = useCallback((childId: string, updates: Partial<Child>) => {
    setChildrenList((prev) => prev.map((c) => (c.id === childId ? { ...c, ...updates } : c)));
    if (householdId) {
      const dbUpdates: Record<string, any> = {};
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.arabicName) dbUpdates.arabic_name = updates.arabicName;
      if (updates.ambition) dbUpdates.ambition = updates.ambition;
      if (updates.phone) dbUpdates.phone = updates.phone;
      if (updates.email) dbUpdates.email = updates.email;
      supabase.from('children_profiles').update(dbUpdates).eq('id', childId).then();
    }
  }, [householdId]);

  const handleAddWishlistGoal = useCallback((title: string, image: string) => {
    if (!title.trim()) return;
    const baseCost = 500 + Math.floor(Math.random() * 500);
    const aiXpCost = calculateAiXpCost(baseCost, financialTier);
    const newGoal = {
      id: `w_${Date.now()}`,
      title,
      xpCost: aiXpCost,
      image: image || DEFAULT_GIFT_IMAGE,
      status: 'active' as const,
      aiGenerated: true,
    };
    setChildrenList((prev) => prev.map((c) => (c.id === activeChildId ? { ...c, wishlist: [...c.wishlist, newGoal] } : c)));
    triggerNotification(`${t.wishAdded} AI: ${aiXpCost} XP`, 'success');
    if (householdId) {
      supabase.from('wishlist_items').insert({
        child_id: activeChildId,
        title,
        xp_cost: aiXpCost,
        image: image || DEFAULT_GIFT_IMAGE,
        status: 'active',
        ai_generated: true,
      }).then();
    }
  }, [activeChildId, financialTier, householdId, calculateAiXpCost, t, triggerNotification]);

  const handleDeleteGoal = useCallback((goalId: string) => {
    setChildrenList((prev) => prev.map((c) => (c.id === activeChildId ? { ...c, wishlist: c.wishlist.filter((w) => w.id !== goalId) } : c)));
    triggerNotification(t.wishRemoved, 'info');
    if (householdId) {
      supabase.from('wishlist_items').delete().eq('id', goalId).then();
    }
  }, [activeChildId, householdId, t, triggerNotification]);

  const handleClaimReward = useCallback((goalId: string) => {
    const goal = activeChild.wishlist.find((w) => w.id === goalId);
    if (!goal) return;
    if (activeChild.xp < goal.xpCost) {
      triggerNotification(t.notEnoughXp, 'error');
      return;
    }
    updateChildXP(activeChildId, -goal.xpCost);
    setChildrenList((prev) => prev.map((c) => (c.id === activeChildId ? { ...c, wishlist: c.wishlist.filter((w) => w.id !== goalId) } : c)));
    triggerNotification(t.rewardClaimed, 'success');
    if (householdId) {
      supabase.from('wishlist_items').delete().eq('id', goalId).then();
    }
  }, [activeChild, activeChildId, householdId, updateChildXP, t, triggerNotification]);

  const handleAddGrade = useCallback((subject: string, score: number, maxScore: number) => {
    if (!subject.trim()) return;
    const pct = (score / maxScore) * 100;
    const newGrade = {
      id: `g_${Date.now()}`,
      subject,
      score: Number(score),
      maxScore: Number(maxScore),
      date: new Date().toISOString().split('T')[0],
      status: (pct >= 85 ? 'Excellent' : pct >= 70 ? 'Good' : 'Needs Support') as 'Excellent' | 'Good' | 'Needs Support',
    };
    setChildrenList((prev) => prev.map((c) => (c.id === activeChildId ? { ...c, grades: [...c.grades, newGrade] } : c)));
    triggerNotification(t.gradeAdded, 'success');
    if (householdId) {
      supabase.from('grades').insert({
        child_id: activeChildId,
        subject,
        score: Number(score),
        max_score: Number(maxScore),
        date: new Date().toISOString().split('T')[0],
        status: newGrade.status,
      }).then();
    }
  }, [activeChildId, householdId, t, triggerNotification]);

  const handleSendChatMessage = useCallback(() => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setIsAiLoading(true);
    setTimeout(() => {
      setIsAiLoading(false);
      const responses: Record<string, string[]> = {
        ar: [
          `ما أخبارك يا ${activeChild.name}؟ 👋 إنت بطل وأنا فخور بك! استمر في التفوق 🌟`,
          `يا بطل، راجع دروسك بانتظام وخد راحة بين المراجعات. إنت تقدر! 💪`,
          `حلو إنك بتسأل! الساينس والرياضيات محتاجين تركيز. تحب أشرحلك حاجة معينة؟ 📚`,
          `استمر يا نجم! كل خطوة بتقربك من حلمك. أنا معك دايماً 🚀✨`,
        ],
        en: [
          `What's up champ? 👋 You're a star and I'm proud of you! Keep shining! 🌟`,
          `Hey ${activeChild.name}! Review your lessons regularly and take breaks. You've got this! 💪`,
          `Great question! Science and Math need focus. Want me to explain something specific? 📚`,
          `Keep going, superstar! Every step gets you closer to your dream. I'm always here for you 🚀✨`,
        ],
        es: [
          `¿Qué tal, campeón? 👋 ¡Eres una estrella y estoy orgulloso de ti! ¡Sigue brillando! 🌟`,
          `¡Hey ${activeChild.name}! Repasa tus lecciones y toma descansos. ¡Tú puedes! 💪`,
          `¡Buena pregunta! Ciencias y Matemáticas necesitan enfoque. ¿Quieres que te explique algo? 📚`,
          `¡Sigue así, estrella! Cada paso te acerca a tu sueño. Siempre estoy aquí para ti 🚀✨`,
        ],
      };
      const pool = responses[lang] || responses.en;
      const reply = pool[Math.floor(Math.random() * pool.length)];
      setChatMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      if (householdId) {
        supabase.from('chat_messages').insert([
          { child_id: activeChildId, sender: 'user', text: userMsg },
          { child_id: activeChildId, sender: 'ai', text: reply },
        ]).then();
      }
    }, 1000);
  }, [chatInput, activeChild, lang, activeChildId, householdId]);

  const handleSendFeedback = useCallback(() => {
    if (!feedbackText.trim()) return;
    const isComplaint = /شكوى|complaint|queja|مشكلة|problem/i.test(feedbackText);
    const reply = isComplaint ? t.feedbackReplyComplaint : t.feedbackReplySuggestion;
    setFeedbackReply(reply);
    setFeedbackSent(true);
    setFeedbackText('');
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackReply(null);
    }, 5000);
  }, [feedbackText, t]);

  const handleShareAchievement = useCallback(() => {
    const text = `🎉 ${activeChild.name} reached Level ${activeChild.level} with ${activeChild.xp} XP on Familia AI!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }, [activeChild]);

  const handleChildLogin = useCallback(async () => {
    if (!childLoginEmail.trim() || !childLoginPassword.trim()) return;
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: childLoginEmail,
      password: childLoginPassword,
    });
    if (error) {
      triggerNotification(t.invalidOtp, 'error');
      setAuthLoading(false);
    }
  }, [childLoginEmail, childLoginPassword, t, triggerNotification]);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    setHouseholdId(null);
    setUserRole('parent');
    setAppPhase('onboarding');
    setChildrenList(INITIAL_CHILDREN);
    setRoutineTasks(INITIAL_ROUTINE);
    setChildLoginEmail('');
    setChildLoginPassword('');
  }, []);

  // Persist settings to database when they change
  useEffect(() => {
    if (!householdId) return;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from('app_settings').upsert({
        user_id: user.id,
        language: lang,
        theme_id: theme.id,
        is_dark: isDark,
        notifications_enabled: notificationsEnabled,
        protection_enabled: protectionEnabled,
      }).then();
    });
  }, [lang, theme, isDark, notificationsEnabled, protectionEnabled, householdId]);

  const value: FamiliaContextValue = {
    lang, setLang, t, theme, setTheme, isDark, toggleDarkMode,
    userRole, setUserRole, activeChildId, setActiveChildId, activeChild, isRTL,
    appPhase, setAppPhase, parentPhone, setParentPhone, otpCode, setOtpCode,
    generatedOtp, handleSendOtp, handleVerifyOtp, handleConfirmSetup,
    financialTier, setFinancialTier, handleSelectFinancial, aiCalculatingXp,
    guardians, handleAddGuardian, notificationsEnabled, setNotificationsEnabled,
    protectionEnabled, setProtectionEnabled,
    screenTimeEnabled, setScreenTimeEnabled,
    parentPin, isPinUnlocked, showPinModal, setShowPinModal, pinInput, setPinInput, handleVerifyPin,
    childrenList, routineTasks, hideGrades, setHideGrades,
    chatMessages, chatInput, setChatInput, isAiLoading, handleSendChatMessage,
    handleCompleteTask, handleParentApproveTask, handleAddTask, handleEditTask, handleDeleteTask, handleMissTask,
    handleCreateChild, handleEditChild,
    handleAddWishlistGoal, handleDeleteGoal, handleClaimReward, handleAddGrade,
    feedbackText, setFeedbackText, feedbackSent, feedbackReply, handleSendFeedback,
    handleShareAchievement,
    notification, triggerNotification,
    activeTab, setActiveTab,
    trialDaysLeft, isSubscribed, setIsSubscribed,
    householdId, authLoading,
    childLoginEmail, setChildLoginEmail, childLoginPassword, setChildLoginPassword,
    handleChildLogin, handleSignOut,
  };

  return <FamiliaContext.Provider value={value}>{children}</FamiliaContext.Provider>;
}

export function useFamilia() {
  const ctx = useContext(FamiliaContext);
  if (!ctx) throw new Error('useFamilia must be used within FamiliaProvider');
  return ctx;
}

// Database row mappers
function mapDbChildToChild(c: any, hobbies: any[], grades: any[], wishes: any[]): Child {
  return {
    id: c.id,
    name: c.name || '',
    arabicName: c.arabic_name || c.name || '',
    gender: c.gender || 'boy',
    avatar: c.avatar || '👦',
    phone: c.phone || '',
    email: c.email || '',
    password: '',
    ambition: c.ambition || '',
    hobbies: (hobbies || []).map((h: any) => ({ id: h.id, name: h.name, days: h.days || [], time: h.time || '' })),
    xp: c.xp || 0,
    level: c.level || 1,
    streak: c.streak || 0,
    financialTier: (c.financial_tier || 'average') as FinancialTier,
    screenTimeUsedMins: c.screen_time_used_mins || 0,
    grades: (grades || []).map((g: any) => ({
      id: g.id, subject: g.subject, score: Number(g.score), maxScore: Number(g.max_score),
      date: g.date, status: g.status,
    })),
    wishlist: (wishes || []).map((w: any) => ({
      id: w.id, title: w.title, xpCost: w.xp_cost, image: w.image, status: w.status, aiGenerated: w.ai_generated,
    })),
  };
}

function mapDbTaskToTask(r: any): RoutineTask {
  return {
    id: r.id,
    timeOfDay: r.time_of_day,
    title: r.title,
    titleAr: r.title_ar,
    xp: r.xp,
    requiresVision: r.requires_vision,
    completed: false,
    parentApproved: false,
    proofImage: '',
    scheduledTime: r.scheduled_time,
  };
}
