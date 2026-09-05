import type { LangCode } from '@/types';

export interface Translation {
  appName: string;
  subTitle: string;
  trialBanner: string;
  trialExpired: string;
  subscribeBtn: string;
  navRoutine: string;
  navCoach: string;
  navWishlist: string;
  navScreenTime: string;
  navGrades: string;
  navChildren: string;
  navSupport: string;
  parentPinTitle: string;
  enterPinDesc: string;
  unlockBtn: string;
  invalidPin: string;
  parentRole: string;
  childRole: string;
  switchRole: string;
  addKid: string;
  addGuardian: string;
  childLimitWarning: string;
  routineTitle: string;
  verifiedByAI: string;
  pendingParentApproval: string;
  approveBtn: string;
  reviewBtn: string;
  uploadProof: string;
  xpGained: string;
  screenTimeLimit: string;
  screenTimeDesc: string;
  exemptAppsNote: string;
  gradeManagerTitle: string;
  hideGradesToggle: string;
  addGrade: string;
  aiIntervention: string;
  wishlistTitle: string;
  addWishGoal: string;
  deleteGoal: string;
  xpRequired: string;
  claimReward: string;
  attachPhoto: string;
  themePickerTitle: string;
  supportCornerTitle: string;
  sendFeedback: string;
  shareAchievement: string;
  shareSub: string;
  genderBoy: string;
  genderGirl: string;
  ambitionPrompt: string;
  howDidYouHear: string;
  confirmTimeRoutine: string;
  sleepTimeNotice: string;
  confirmBtn: string;
  morning: string;
  afternoon: string;
  night: string;
  completeBtn: string;
  completedBtn: string;
  rejectBtn: string;
  level: string;
  streak: string;
  days: string;
  coachTitle: string;
  coachPlaceholder: string;
  sendBtn: string;
  subject: string;
  score: string;
  date: string;
  status: string;
  saveBtn: string;
  cancelBtn: string;
  childName: string;
  childGender: string;
  childPhone: string;
  childEmail: string;
  childPassword: string;
  noGrades: string;
  noWishlist: string;
  feedbackPlaceholder: string;
  feedbackSent: string;
  languageLabel: string;
  themeLabel: string;
  progress: string;
  of: string;
  mins: string;
  hours: string;
  remaining: string;
  used: string;
  aiThinking: string;
  aiApproved: string;
  aiSentToParent: string;
  taskRejected: string;
  xpGranted: string;
  pinUnlocked: string;
  childAdded: string;
  wishAdded: string;
  wishRemoved: string;
  gradeAdded: string;
  rewardClaimed: string;
  notEnoughXp: string;
  routineSectionMorning: string;
  routineSectionAfternoon: string;
  routineSectionNight: string;
  sleepSchedule: string;
  bedtime: string;
  wakeTime: string;
  sleepDuration: string;
  gradesHidden: string;
  gradesVisible: string;
  averageScore: string;
  topSubject: string;
  needsSupport: string;
  financialTier: string;
  ambition: string;
  whatsappShare: string;
  achievementCard: string;
  proBadge: string;
  trialDaysLeft: string;
  extendedFamilyPlan: string;
  childProfile: string;
  selectChild: string;
  aiCoachIntro: string;
  aiCoachIntroAr: string;
  noTasksPending: string;
  allDone: string;
  dailyProgress: string;
  tasksCompleted: string;
  // New keys
  onboardingTitle: string;
  onboardingSubtitle: string;
  startTrial: string;
  startSubscription: string;
  enterPhone: string;
  enterPhoneDesc: string;
  phonePlaceholder: string;
  sendOtp: string;
  enterOtp: string;
  enterOtpDesc: string;
  verifyOtp: string;
  resendOtp: string;
  otpSent: string;
  invalidOtp: string;
  financialTitle: string;
  financialDesc: string;
  financialVeryLow: string;
  financialLow: string;
  financialAverage: string;
  financialGood: string;
  financialVeryGood: string;
  aiCalculatingXp: string;
  aiXpResult: string;
  aiXpDesc: string;
  addTask: string;
  editTask: string;
  deleteTask: string;
  taskTitle: string;
  taskXp: string;
  taskTimeOfDay: string;
  requiresCamera: string;
  taskMissed: string;
  xpPenalty: string;
  xpPenaltyDesc: string;
  missedTask: string;
  taskDeleted: string;
  taskAdded: string;
  taskEdited: string;
  childNoEditPermission: string;
  hobbiesLabel: string;
  hobbyName: string;
  hobbyDays: string;
  hobbyTime: string;
  addHobby: string;
  removeHobby: string;
  hobbyReminderNote: string;
  guardianName: string;
  guardianPhone: string;
  guardianAdded: string;
  guardianVerified: string;
  guardianVerifying: string;
  notificationsPermission: string;
  advancedProtection: string;
  advancedProtectionDesc: string;
  enableNotifications: string;
  enableProtection: string;
  screenTimeFree: string;
  screenTimeHomework: string;
  screenTimeFinal: string;
  screenTimeFreeDesc: string;
  screenTimeHomeworkDesc: string;
  screenTimeFinalDesc: string;
  screenTimeUnlimited: string;
  screenTimeUnlimitedWarn: string;
  aiGradeAnalysis: string;
  aiGradeAdvice: string;
  aiGradeLowScore: string;
  aiGradeGoodScore: string;
  aiGradeExcellent: string;
  freeResources: string;
  feedbackReplySuggestion: string;
  feedbackReplyComplaint: string;
  searchLanguages: string;
  darkMode: string;
  lightMode: string;
  bgToggle: string;
  wakeTimeLabel: string;
  schoolTime: string;
  returnTime: string;
  sleepTimeLabel: string;
  morningRoutineAuto: string;
  routineAutoDesc: string;
  routineAutoCalc: string;
  childReadOnly: string;
  childReadOnlyDesc: string;
  linkedAccount: string;
  linkedAccountDesc: string;
  editChild: string;
  childSettings: string;
  notificationsPermissionDesc: string;
  cameraPermission: string;
  cameraPermissionDesc: string;
  screenTimePermission: string;
  screenTimePermissionDesc: string;
  countrySelector: string;
  deliverySms: string;
  deliveryWhatsapp: string;
  childLoginBtn: string;
  signOut: string;
  bestOption: string;
  customDuration: string;
  // Payment screen
  paymentTitle: string;
  paymentDesc: string;
  paymentCard: string;
  paymentCardDesc: string;
  paymentMobileWallet: string;
  paymentMobileWalletDesc: string;
  paymentInstaPay: string;
  paymentInstaPayDesc: string;
  paymentFawry: string;
  paymentFawryDesc: string;
  paymentDigitalWallet: string;
  paymentDigitalWalletDesc: string;
  scanCard: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardHolder: string;
  confirmPayment: string;
  paymentSuccess: string;
  paymentProcessing: string;
  selectPaymentMethod: string;
  resendViaSms: string;
  resendViaWhatsapp: string;
  fawryRefCode: string;
  fawryRefDesc: string;
  uploadReceipt: string;
  captureReceipt: string;
  receiptUploaded: string;
  summaryTitle: string;
  summaryDesc: string;
  summaryPlan: string;
  summaryPlanTrial: string;
  summaryPlanSubscribed: string;
  summaryPayment: string;
  summaryPhone: string;
  summaryPermissions: string;
  summaryFinancial: string;
  summaryEnabled: string;
  summaryDisabled: string;
  summaryConfirmBtn: string;
  setupComplete: string;
  selectSubOption: string;
  systemPermissionsTitle: string;
  systemPermissionsDesc: string;
  selectPaymentSubFirst: string;
}

const en: Translation = {
  appName: 'Familia AI',
  subTitle: 'Smart Family Routine & Gamified Academic Coach',
  trialBanner: '7-Day Free Trial Active. Unrestricted Access.',
  trialExpired: 'Free Trial Expired! Please Subscribe to Continue.',
  subscribeBtn: 'Subscribe ($1/mo)',
  navRoutine: 'Daily Routine',
  navCoach: 'AI Coach',
  navWishlist: 'Wishlist & Store',
  navScreenTime: 'Screen Time',
  navGrades: 'Academic Manager',
  navChildren: 'Children Management',
  navSupport: 'Support & Complaints',
  parentPinTitle: 'Parent PIN Verification',
  enterPinDesc: 'Enter 4-digit PIN to access parent controls',
  unlockBtn: 'Unlock Controls',
  invalidPin: 'Incorrect PIN code',
  parentRole: 'Parent / Supervisor',
  childRole: 'Child Mode',
  switchRole: 'Switch Profile',
  addKid: 'Add New Child',
  addGuardian: 'Add Second Guardian',
  childLimitWarning: 'Maximum family limit reached (5 children max). Upgrade for Extended Family Plan.',
  routineTitle: "Today's Routine",
  verifiedByAI: 'Verified by Gemini Vision',
  pendingParentApproval: 'Awaiting Parent Approval',
  approveBtn: 'Approve Task',
  reviewBtn: 'Reject / Review',
  uploadProof: 'Upload Photo Proof',
  xpGained: 'XP Points Earned!',
  screenTimeLimit: 'Daily Screen Time Allowance',
  screenTimeDesc: '2h 15m Total (Smart Split)',
  exemptAppsNote: 'Calls, Alarms, Emergency tools are excluded',
  gradeManagerTitle: 'School Grade Tracker',
  hideGradesToggle: 'Hide Grades & Exam Schedule For Now',
  addGrade: 'Add Subject Grade',
  aiIntervention: 'AI Academic Advisor Alert',
  wishlistTitle: 'My Reward Wishlist',
  addWishGoal: 'Add Custom Reward Goal',
  deleteGoal: 'Delete Goal',
  xpRequired: 'XP Needed',
  claimReward: 'Redeem Reward',
  attachPhoto: 'Attach Reward Photo',
  themePickerTitle: 'Select Visual Theme (16 Color Palette)',
  supportCornerTitle: 'Support & Complaints Corner',
  sendFeedback: 'Submit Complaint / Feedback',
  shareAchievement: 'Share Achievement Card',
  shareSub: 'Inspire friends & family on WhatsApp!',
  genderBoy: 'Boy',
  genderGirl: 'Girl',
  ambitionPrompt: 'What is your dream future career?',
  howDidYouHear: 'How did you hear about Familia AI?',
  confirmTimeRoutine: 'Confirm Routines & Sleep Times',
  sleepTimeNotice: 'Mandatory 8 Hours Sleep Schedule (Bedtime 11:00 PM)',
  confirmBtn: 'Confirm & Save',
  morning: 'Morning',
  afternoon: 'Afternoon',
  night: 'Night',
  completeBtn: 'Complete',
  completedBtn: 'Completed',
  rejectBtn: 'Reject',
  level: 'Level',
  streak: 'Streak',
  days: 'days',
  coachTitle: 'AI Academic & Habit Coach',
  coachPlaceholder: 'Ask me anything about your studies or routine...',
  sendBtn: 'Send',
  subject: 'Subject',
  score: 'Score',
  date: 'Date',
  status: 'Status',
  saveBtn: 'Save',
  cancelBtn: 'Cancel',
  childName: 'Child Name',
  childGender: 'Gender',
  childPhone: 'Phone Number',
  childEmail: 'Child Email',
  childPassword: 'Child Password',
  noGrades: 'No grades recorded yet',
  noWishlist: 'No wishlist goals yet. Add one!',
  feedbackPlaceholder: 'Write your complaint or feedback...',
  feedbackSent: 'Feedback sent successfully!',
  languageLabel: 'Language',
  themeLabel: 'Theme',
  progress: 'Progress',
  of: 'of',
  mins: 'min',
  hours: 'hours',
  remaining: 'remaining',
  used: 'used',
  aiThinking: 'AI is verifying...',
  aiApproved: 'Gemini AI Approved! Earned',
  aiSentToParent: 'Sent to parents for 1-click approval',
  taskRejected: 'Task rejected',
  xpGranted: 'Task approved and XP granted!',
  pinUnlocked: 'Parent controls unlocked',
  childAdded: 'Profile created!',
  wishAdded: 'Reward goal added to wishlist!',
  wishRemoved: 'Goal removed',
  gradeAdded: 'Grade added',
  rewardClaimed: 'Reward claimed!',
  notEnoughXp: 'Not enough XP to claim this reward',
  routineSectionMorning: 'Morning Routine',
  routineSectionAfternoon: 'Afternoon Routine',
  routineSectionNight: 'Night Routine',
  sleepSchedule: 'Sleep Schedule',
  bedtime: 'Bedtime',
  wakeTime: 'Wake Up',
  sleepDuration: 'Sleep Duration',
  gradesHidden: 'Grades are currently hidden by parent',
  gradesVisible: 'Show Grades',
  averageScore: 'Average Score',
  topSubject: 'Top Subject',
  needsSupport: 'Needs Support',
  financialTier: 'Financial Tier',
  ambition: 'Ambition',
  whatsappShare: 'Share on WhatsApp',
  achievementCard: 'Achievement Card',
  proBadge: 'PRO AI',
  trialDaysLeft: 'days left in trial',
  extendedFamilyPlan: 'Extended Family Plan',
  childProfile: 'Child Profile',
  selectChild: 'Select Child',
  aiCoachIntro: "Hey champ! 👋 What's up? I'm your Familia AI coach — here to help you crush your goals and have fun doing it! What's on your mind today? 🚀",
  aiCoachIntroAr: 'أهلاً بك يا بطل! 👋 أنا الموجه الأكاديمي والتربوي الذكي لفاميليا آي آي. كيف أساعدك اليوم في دراستك أو روتينك اليومي؟ 🚀',
  noTasksPending: 'No tasks pending',
  allDone: 'All tasks done for today! 🎉',
  dailyProgress: 'Daily Progress',
  tasksCompleted: 'tasks completed',
  onboardingTitle: 'Welcome to Familia AI',
  onboardingSubtitle: 'Smart Family Routine & Gamified Academic Coach',
  startTrial: 'Start 7-Day Free Trial',
  startSubscription: 'Subscribe Now ($1/mo)',
  enterPhone: 'Enter Your Phone Number',
  enterPhoneDesc: 'We will send a 6-digit verification code via SMS or WhatsApp',
  phonePlaceholder: '+201012345678',
  sendOtp: 'Send Code',
  enterOtp: 'Enter Verification Code',
  enterOtpDesc: 'A 6-digit code was sent to your phone',
  verifyOtp: 'Verify & Continue',
  resendOtp: 'Resend Code',
  otpSent: 'Verification code sent!',
  invalidOtp: 'Invalid verification code',
  financialTitle: 'Financial Status',
  financialDesc: 'AI will use this to calculate XP requirements for rewards fairly',
  financialVeryLow: 'Very Low',
  financialLow: 'Low',
  financialAverage: 'Average',
  financialGood: 'Good',
  financialVeryGood: 'Very Good',
  aiCalculatingXp: 'AI is calculating XP costs...',
  aiXpResult: 'AI has set XP costs based on financial status',
  aiXpDesc: 'XP costs are automatically adjusted by AI',
  addTask: 'Add Task',
  editTask: 'Edit Task',
  deleteTask: 'Delete',
  taskTitle: 'Task Title',
  taskXp: 'XP Reward',
  taskTimeOfDay: 'Time of Day',
  requiresCamera: 'Requires Photo Verification',
  taskMissed: 'Missed',
  xpPenalty: 'XP Penalty',
  xpPenaltyDesc: 'Missed tasks deduct the same XP they would have awarded',
  missedTask: 'Task missed! -XP penalty applied',
  taskDeleted: 'Task deleted',
  taskAdded: 'Task added successfully',
  taskEdited: 'Task updated successfully',
  childNoEditPermission: 'Children can only view and complete tasks',
  hobbiesLabel: 'Sports & Hobbies',
  hobbyName: 'Activity Name',
  hobbyDays: 'Days',
  hobbyTime: 'Time',
  addHobby: 'Add Activity',
  removeHobby: 'Remove',
  hobbyReminderNote: 'AI will send reminders 30 min before each activity',
  guardianName: 'Guardian Name',
  guardianPhone: 'Guardian Phone',
  guardianAdded: 'Second guardian added!',
  guardianVerified: 'Guardian verified successfully',
  guardianVerifying: 'Verifying guardian phone...',
  notificationsPermission: 'Enable Notifications',
  advancedProtection: 'Advanced App Protection',
  advancedProtectionDesc: 'Prevent app uninstall even after device reset',
  enableNotifications: 'Enable',
  enableProtection: 'Activate',
  screenTimeFree: 'Free Time (1h)',
  screenTimeHomework: 'Homework (15min)',
  screenTimeFinal: 'Final Reward (1h)',
  screenTimeFreeDesc: '1 hour free after school — heavy apps locked after',
  screenTimeHomeworkDesc: '15 min — only AI/educational apps allowed (no games)',
  screenTimeFinalDesc: '1 hour after all tasks & homework completed',
  screenTimeUnlimited: 'Unlimited Time',
  screenTimeUnlimitedWarn: 'Warning: Unlimited screen time negatively impacts focus and grades',
  aiGradeAnalysis: 'AI Grade Analysis',
  aiGradeAdvice: 'AI Advice',
  aiGradeLowScore: 'needs extra support. Ask me what is difficult and I will explain with free resources!',
  aiGradeGoodScore: 'is doing well! Keep up the consistent effort.',
  aiGradeExcellent: 'is outstanding! You are a star! Keep shining!',
  freeResources: 'Free Learning Resources',
  feedbackReplySuggestion: 'Thank you for your wonderful suggestion! It will be studied and the app will be improved based on it!',
  feedbackReplyComplaint: 'We are sorry for what happened. We will resolve your complaint as quickly as possible. Thank you for reaching out!',
  searchLanguages: 'Search languages...',
  darkMode: 'Dark',
  lightMode: 'Light',
  bgToggle: 'Background',
  wakeTimeLabel: 'Wake Up Time',
  schoolTime: 'School Time',
  returnTime: 'Return Time',
  sleepTimeLabel: 'Sleep Time',
  morningRoutineAuto: 'Auto-Generated Morning Routine',
  routineAutoDesc: 'AI generates your routine based on wake & school times',
  routineAutoCalc: 'AI Auto-Calculate Routine',
  childReadOnly: 'View Only',
  childReadOnlyDesc: 'You can view and complete tasks. Ask your parent to add or edit tasks.',
  linkedAccount: 'Account Linked',
  linkedAccountDesc: 'This child account is linked to your parent account',
  editChild: 'Edit',
  childSettings: 'Settings',
  notificationsPermissionDesc: 'Get reminders for study, exercise, and task approvals',
  cameraPermission: 'Camera & Photo Gallery',
  cameraPermissionDesc: 'Required to verify task completion with photos',
  screenTimePermission: 'Screen Time & Usage Access',
  screenTimePermissionDesc: 'Monitor and manage daily screen time limits',
  countrySelector: 'Country',
  deliverySms: 'SMS',
  deliveryWhatsapp: 'WhatsApp',
  childLoginBtn: 'Child Login',
  signOut: 'Sign Out',
  bestOption: 'Best Option',
  customDuration: 'Custom Duration',
  paymentTitle: 'Complete Your Subscription',
  paymentDesc: 'Choose your preferred payment method',
  paymentCard: 'Credit / Debit Card',
  paymentCardDesc: 'Visa, Mastercard, Meeza',
  paymentMobileWallet: 'Mobile Wallet',
  paymentMobileWalletDesc: 'Vodafone Cash, Orange Cash, Etisalat Cash, WE Pay',
  paymentInstaPay: 'InstaPay',
  paymentInstaPayDesc: 'Instant bank transfer',
  paymentFawry: 'Fawry / Reference Code',
  paymentFawryDesc: 'Pay at any Fawry outlet',
  paymentDigitalWallet: 'Digital Wallet',
  paymentDigitalWalletDesc: 'Apple Pay, Google Pay, PayPal',
  scanCard: 'Scan Card via Camera',
  cardNumber: 'Card Number',
  cardExpiry: 'MM/YY',
  cardCvv: 'CVV',
  cardHolder: 'Cardholder Name',
  confirmPayment: 'Confirm Payment',
  paymentSuccess: 'Payment successful! Welcome to Familia AI',
  paymentProcessing: 'Processing payment...',
  selectPaymentMethod: 'Select Payment Method',
  resendViaSms: 'Resend via SMS',
  resendViaWhatsapp: 'Resend via WhatsApp',
  fawryRefCode: 'Fawry Reference Code',
  fawryRefDesc: 'Use this code to pay at any Fawry outlet or app',
  uploadReceipt: 'Upload Payment Receipt',
  captureReceipt: 'Take Photo of Receipt',
  receiptUploaded: 'Receipt uploaded',
  summaryTitle: 'Confirm Your Setup',
  summaryDesc: 'Review all your selections before we create your account',
  summaryPlan: 'Plan',
  summaryPlanTrial: '7-Day Free Trial',
  summaryPlanSubscribed: '$1/mo Subscription',
  summaryPayment: 'Payment Method',
  summaryPhone: 'Phone Number',
  summaryPermissions: 'Permissions',
  summaryFinancial: 'Financial Status',
  summaryEnabled: 'Enabled',
  summaryDisabled: 'Disabled',
  summaryConfirmBtn: 'Confirm & Start',
  setupComplete: 'Setup complete! Welcome to Familia AI',
  selectSubOption: 'Select option',
  systemPermissionsTitle: 'System Permissions',
  systemPermissionsDesc: 'Enable these for the best experience. You can change them later.',
  selectPaymentSubFirst: 'Please select an option first',
};

const ar: Translation = {
  appName: 'Familia AI',
  subTitle: 'روتين العائلة الذكي والموجه الأكاديمي',
  trialBanner: 'فترة تجريبية مجانية (7 أيام) مفعلة بالكامل',
  trialExpired: 'انتهت الفترة التجريبية! يرجى الاشتراك للمتابعة',
  subscribeBtn: 'اشترك الآن ($1/شهرياً)',
  navRoutine: 'الروتين اليومي',
  navCoach: 'الموجه الذكي',
  navWishlist: 'الأمنيات والمكافآت',
  navScreenTime: 'وقت الشاشة',
  navGrades: 'إدارة الدرجات',
  navChildren: 'إدارة الأبناء',
  navSupport: 'الدعم والشكاوي',
  parentPinTitle: 'تأكيد رمز أمان الوالدين',
  enterPinDesc: 'أدخل الرمز السري المكون من 4 أرقام',
  unlockBtn: 'فتح الصلاحيات',
  invalidPin: 'الرمز السري غير صحيح',
  parentRole: 'حساب الأب/الأم',
  childRole: 'وضع الابن',
  switchRole: 'تبديل البروفايل',
  addKid: 'إضافة طفل جديد',
  addGuardian: 'إضافة ولي أمر ثانٍ',
  childLimitWarning: 'وصلت للحد الأقصى للعائلة (5 أبناء). اشترك في باقة العائلة الموسعة لإضافة المزيد.',
  routineTitle: 'الروتين اليومي',
  verifiedByAI: 'مفحوص بالذكاء الاصطناعي (Gemini)',
  pendingParentApproval: 'بانتظار تأكيد الأب/الأم',
  approveBtn: 'إنجاز',
  reviewBtn: 'رفض / مراجعة',
  uploadProof: 'تصوير إثبات المهمة',
  xpGained: 'نقاط خبرة مكتسبة!',
  screenTimeLimit: 'إجمالي وقت الشاشة المسموح',
  screenTimeDesc: 'ساعتين وربع إجمالي (تقسيم ذكي)',
  exemptAppsNote: 'المكالمات والمنبهات والطوارئ غير محسوبة',
  gradeManagerTitle: 'متابعة الدرجات والتقارير المدرسية',
  hideGradesToggle: 'إخفاء الدرجات والامتحانات للوقت الحالي',
  addGrade: 'إضافة درجة مادة',
  aiIntervention: 'تنبيه الموجه الأكاديمي الذكي',
  wishlistTitle: 'دفتر الأمنيات والمكافآت',
  addWishGoal: 'إضافة هدف أو مكافأة خاصة',
  deleteGoal: 'حذف الهدف',
  xpRequired: 'نقاط XP المطلوبة',
  claimReward: 'استبدال المكافأة',
  attachPhoto: 'إرفاق صورة الهدية',
  themePickerTitle: 'تخصيص ثيم وألوان التطبيق (16 ثيم)',
  supportCornerTitle: 'ركن الشكاوي والدعم الفني والمقترحات',
  sendFeedback: 'إرسال شكوى أو اقتراح',
  shareAchievement: 'مشاركة بطاقة الإنجاز',
  shareSub: 'شارك إنجازاتك مع الأقارب والأصدقاء عبر واتساب!',
  genderBoy: 'ولد',
  genderGirl: 'بنت',
  ambitionPrompt: 'ما هو طموحك المستقبلي؟',
  howDidYouHear: 'كيف تعرفت على تطبيق Familia AI؟',
  confirmTimeRoutine: 'تأكيد مواعيد الروتين والنوم',
  sleepTimeNotice: 'جدول النوم الإجباري (8 ساعات - موعد النوم 11:00 مساءً)',
  confirmBtn: 'تأكيد وحفظ المواعيد',
  morning: 'صباحاً',
  afternoon: 'بعد الظهر',
  night: 'مساءً',
  completeBtn: 'إنجاز',
  completedBtn: 'تم',
  rejectBtn: 'رفض',
  level: 'المستوى',
  streak: 'التتابع',
  days: 'أيام',
  coachTitle: 'الموجه الأكاديمي والتربوي الذكي',
  coachPlaceholder: 'اسألني أي شيء عن دراستك أو روتينك...',
  sendBtn: 'إرسال',
  subject: 'المادة',
  score: 'الدرجة',
  date: 'التاريخ',
  status: 'الحالة',
  saveBtn: 'حفظ',
  cancelBtn: 'إلغاء',
  childName: 'اسم الطفل',
  childGender: 'الجنس',
  childPhone: 'رقم الهاتف',
  childEmail: 'إيميل الطفل',
  childPassword: 'كلمة سر الطفل',
  noGrades: 'لا توجد درجات مسجلة بعد',
  noWishlist: 'لا توجد أهداف بعد. أضف واحداً!',
  feedbackPlaceholder: 'اكتب شكواك أو اقتراحك...',
  feedbackSent: 'تم إرسال الملاحظات بنجاح!',
  languageLabel: 'اللغة',
  themeLabel: 'الثيم',
  progress: 'التقدم',
  of: 'من',
  mins: 'دقيقة',
  hours: 'ساعات',
  remaining: 'متبقي',
  used: 'مستخدم',
  aiThinking: 'الذكاء الاصطناعي يفحص...',
  aiApproved: 'تمت الموافقة بالذكاء الاصطناعي! اكتسبت',
  aiSentToParent: 'تم الإرسال للأب والأم للتأكيد بنقرة واحدة',
  taskRejected: 'تم رفض المهمة',
  xpGranted: 'تم اعتماد المهمة وإضافة النقاط!',
  pinUnlocked: 'تم فتح صلاحيات الوالدين بنجاح',
  childAdded: 'تم إنشاء البروفايل!',
  wishAdded: 'تم إضافة الهدف لقائمة الأمنيات!',
  wishRemoved: 'تم حذف الهدف',
  gradeAdded: 'تم إضافة الدرجة',
  rewardClaimed: 'تم استبدال المكافأة!',
  notEnoughXp: 'لا توجد نقاط كافية لاستبدال هذه المكافأة',
  routineSectionMorning: 'روتين الصباح',
  routineSectionAfternoon: 'روتين بعد الظهر',
  routineSectionNight: 'روتين المساء',
  sleepSchedule: 'جدول النوم',
  bedtime: 'موعد النوم',
  wakeTime: 'موعد الاستيقاظ',
  sleepDuration: 'مدة النوم',
  gradesHidden: 'الدرجات مخفية حالياً من قبل الأب/الأم',
  gradesVisible: 'إظهار الدرجات',
  averageScore: 'متوسط الدرجات',
  topSubject: 'أفضل مادة',
  needsSupport: 'تحتاج دعم',
  financialTier: 'الحالة المادية',
  ambition: 'الطموح',
  whatsappShare: 'مشاركة على واتساب',
  achievementCard: 'بطاقة الإنجاز',
  proBadge: 'PRO AI',
  trialDaysLeft: 'أيام متبقية في التجربة',
  extendedFamilyPlan: 'باقة العائلة الموسعة',
  childProfile: 'بروفايل الطفل',
  selectChild: 'اختر الطفل',
  aiCoachIntro: 'أهلاً بك يا بطل! 👋 أنا الموجه الأكاديمي والتربوي الذكي لفاميليا آي آي. كيف أساعدك اليوم في دراستك أو روتينك اليومي؟ 🚀',
  aiCoachIntroAr: 'أهلاً بك يا بطل! 👋 أنا الموجه الأكاديمي والتربوي الذكي لفاميليا آي آي. كيف أساعدك اليوم في دراستك أو روتينك اليومي؟ 🚀',
  noTasksPending: 'لا توجد مهام معلقة',
  allDone: 'تم إنجاز جميع مهام اليوم! 🎉',
  dailyProgress: 'التقدم اليومي',
  tasksCompleted: 'مهام مكتملة',
  onboardingTitle: 'مرحباً بك في Familia AI',
  onboardingSubtitle: 'روتين العائلة الذكي والموجه الأكاديمي',
  startTrial: 'ابدأ التجربة المجانية (7 أيام)',
  startSubscription: 'اشترك الآن ($1/شهرياً)',
  enterPhone: 'أدخل رقم هاتفك',
  enterPhoneDesc: 'سنرسل رمز تحقق من 6 أرقام عبر SMS أو واتساب',
  phonePlaceholder: '+201012345678',
  sendOtp: 'إرسال الرمز',
  enterOtp: 'أدخل رمز التحقق',
  enterOtpDesc: 'تم إرسال رمز من 6 أرقام إلى هاتفك',
  verifyOtp: 'تحقق ومتابعة',
  resendOtp: 'إعادة إرسال الرمز',
  otpSent: 'تم إرسال رمز التحقق!',
  invalidOtp: 'رمز التحقق غير صحيح',
  financialTitle: 'الحالة المادية',
  financialDesc: 'الذكاء الاصطناعي سيستخدم هذا لحساب نقاط XP للمكافآت بعدالة',
  financialVeryLow: 'ضعيفة جداً',
  financialLow: 'ضعيفة',
  financialAverage: 'متوسطة',
  financialGood: 'جيدة',
  financialVeryGood: 'جيدة جداً',
  aiCalculatingXp: 'الذكاء الاصطناعي يحسب نقاط XP...',
  aiXpResult: 'تم تحديد نقاط XP بناءً على الحالة المادية',
  aiXpDesc: 'يتم تعديل نقاط XP تلقائياً بواسطة الذكاء الاصطناعي',
  addTask: 'إضافة مهمة',
  editTask: 'تعديل المهمة',
  deleteTask: 'حذف',
  taskTitle: 'عنوان المهمة',
  taskXp: 'مكافأة XP',
  taskTimeOfDay: 'وقت اليوم',
  requiresCamera: 'يتطلب تصوير للتحقق',
  taskMissed: 'ملغاة',
  xpPenalty: 'خصم النقاط',
  xpPenaltyDesc: 'المهام الملغاة تخصم نفس قيمة النقاط التي كانت ستعطى',
  missedTask: 'تم إلغاء المهمة! تم خصم نقاط XP',
  taskDeleted: 'تم حذف المهمة',
  taskAdded: 'تمت إضافة المهمة بنجاح',
  taskEdited: 'تم تحديث المهمة بنجاح',
  childNoEditPermission: 'الأبناء يمكنهم فقط رؤية وتنفيذ المهام',
  hobbiesLabel: 'الرياضات والهوايات',
  hobbyName: 'اسم النشاط',
  hobbyDays: 'الأيام',
  hobbyTime: 'الوقت',
  addHobby: 'إضافة نشاط',
  removeHobby: 'إزالة',
  hobbyReminderNote: 'سيقوم الذكاء الاصطناعي بإرسال تذكير قبل كل نشاع بـ 30 دقيقة',
  guardianName: 'اسم ولي الأمر',
  guardianPhone: 'هاتف ولي الأمر',
  guardianAdded: 'تمت إضافة ولي الأمر الثاني!',
  guardianVerified: 'تم التحقق من ولي الأمر بنجاح',
  guardianVerifying: 'جاري التحقق من هاتف ولي الأمر...',
  notificationsPermission: 'تفعيل الإشعارات',
  advancedProtection: 'الحماية المتقدمة للتطبيق',
  advancedProtectionDesc: 'منع حذف التطبيق حتى مع إعادة ضبط الجهاز',
  enableNotifications: 'تفعيل',
  enableProtection: 'تفعيل الحماية',
  screenTimeFree: 'وقت حر (ساعة)',
  screenTimeHomework: 'الواجبات (15 دقيقة)',
  screenTimeFinal: 'المكافأة الأخيرة (ساعة)',
  screenTimeFreeDesc: 'ساعة حرة بعد المدرسة — يتم قفل التطبيقات الثقيلة بعدها',
  screenTimeHomeworkDesc: '15 دقيقة — مسموح فقط بتطبيقات التعليم والذكاء الاصطناعي (بدون ألعاب)',
  screenTimeFinalDesc: 'ساعة بعد إنجاز جميع المهام والواجبات',
  screenTimeUnlimited: 'وقت غير محدود',
  screenTimeUnlimitedWarn: 'تحذير: وقت الشاشة غير المحدود يؤثر سلبياً على التركيز والدرجات',
  aiGradeAnalysis: 'تحليل الدرجات بالذكاء الاصطناعي',
  aiGradeAdvice: 'نصيحة الذكاء الاصطناعي',
  aiGradeLowScore: 'تحتاج دعم إضافي. اسألني عما يصعب عليك وسأشرح لك مع مصادر مجانية!',
  aiGradeGoodScore: 'أداء جيد! استمر في الاجتهاد المستمر.',
  aiGradeExcellent: 'ممتاز! أنت نجم! استمر في التألق!',
  freeResources: 'مصادر تعليمية مجانية',
  feedbackReplySuggestion: 'شكراً على اقتراحك الرائع، سيتم دراسته وتطوير التطبيق بناءً عليه!',
  feedbackReplyComplaint: 'عذراً لما حدث، سنقوم بحل شكواك في أسرع وقت ممكن شكراً لتواصلك معنا!',
  searchLanguages: 'ابحث عن لغة...',
  darkMode: 'داكن',
  lightMode: 'فاتح',
  bgToggle: 'الخلفية',
  wakeTimeLabel: 'موعد الاستيقاظ',
  schoolTime: 'موعد المدرسة',
  returnTime: 'موعد العودة',
  sleepTimeLabel: 'موعد النوم',
  morningRoutineAuto: 'الروتين الصباحي التلقائي',
  routineAutoDesc: 'يقوم الذكاء الاصطناعي بإنشاء الروتين بناءً على مواعيد الاستيقاظ والمدرسة',
  routineAutoCalc: 'حساب الروتين تلقائياً بالذكاء الاصطناعي',
  childReadOnly: 'عرض فقط',
  childReadOnlyDesc: 'يمكنك رؤية وتنفيذ المهام. اطلب من والديك إضافة أو تعديل المهام.',
  linkedAccount: 'الحساب مرتبط',
  linkedAccountDesc: 'هذا الحساب مرتبط بحساب الأب/الأم',
  editChild: 'تعديل',
  childSettings: 'إعدادات',
  notificationsPermissionDesc: 'استقبل تنبيهات المذاكرة والتمارين وتأكيد المهام',
  cameraPermission: 'الكاميرا ومعرض الصور',
  cameraPermissionDesc: 'نحتاج الكاميرا لتأكيد إنجاز المهام بالصور',
  screenTimePermission: 'وقت الشاشة ومراقبة الاستخدام',
  screenTimePermissionDesc: 'مراقبة وإدارة وقت الشاشة اليومي',
  countrySelector: 'الدولة',
  deliverySms: 'رسالة نصية',
  deliveryWhatsapp: 'واتساب',
  childLoginBtn: 'دخول الابن',
  signOut: 'تسجيل خروج',
  bestOption: 'أفضل خيار',
  customDuration: 'مدة مخصصة',
  paymentTitle: 'أكمل اشتراكك',
  paymentDesc: 'اختر طريقة الدفع المفضلة لديك',
  paymentCard: 'بطاقة ائتمان / خصم',
  paymentCardDesc: 'فيزا، ماستركارد، ميزة',
  paymentMobileWallet: 'محفظة موبايل',
  paymentMobileWalletDesc: 'فودافون كاش، أورانج كاش، اتصالات كاش، وي باي',
  paymentInstaPay: 'إنستا باي',
  paymentInstaPayDesc: 'تحويل بنكي فوري',
  paymentFawry: 'فوري / كود مرجعي',
  paymentFawryDesc: 'ادفع في أي منفذ فوري',
  paymentDigitalWallet: 'محفظة رقمية',
  paymentDigitalWalletDesc: 'أبل باي، جوجل باي، باي بال',
  scanCard: 'امسح البطاقة بالكاميرا',
  cardNumber: 'رقم البطاقة',
  cardExpiry: 'شهر/سنة',
  cardCvv: 'CVV',
  cardHolder: 'اسم حامل البطاقة',
  confirmPayment: 'تأكيد الدفع',
  paymentSuccess: 'تم الدفع بنجاح! مرحباً بك في فاميليا آي آي',
  paymentProcessing: 'جاري معالجة الدفع...',
  selectPaymentMethod: 'اختر طريقة الدفع',
  resendViaSms: 'إعادة عبر SMS',
  resendViaWhatsapp: 'إعادة عبر واتساب',
  fawryRefCode: 'كود مرجعي فوري',
  fawryRefDesc: 'استخدم هذا الكود للدفع في أي منفذ فوري أو التطبيق',
  uploadReceipt: 'رفع إيصال الدفع',
  captureReceipt: 'التقاط صورة للإيصال',
  receiptUploaded: 'تم رفع الإيصال',
  summaryTitle: 'تأكيد على جميع اختياراتك',
  summaryDesc: 'راجع جميع اختياراتك قبل إنشاء حسابك',
  summaryPlan: 'الباقة',
  summaryPlanTrial: 'تجربة مجانية (7 أيام)',
  summaryPlanSubscribed: 'اشتراك $1/شهرياً',
  summaryPayment: 'طريقة الدفع',
  summaryPhone: 'رقم الهاتف',
  summaryPermissions: 'الأذونات',
  summaryFinancial: 'الحالة المادية',
  summaryEnabled: 'مفعّل',
  summaryDisabled: 'غير مفعّل',
  summaryConfirmBtn: 'تأكيد ومتابعة',
  setupComplete: 'تم الإعداد! مرحباً بك في فاميليا آي آي',
  selectSubOption: 'اختر الخيار',
  systemPermissionsTitle: 'أذونات النظام',
  systemPermissionsDesc: 'فعّلها للحصول على أفضل تجربة. يمكنك تغييرها لاحقاً.',
  selectPaymentSubFirst: 'يرجى اختيار خيار أولاً',
};

const es: Translation = {
  appName: 'Familia AI',
  subTitle: 'Rutina Familiar Inteligente y Tutor Académico Gamificado',
  trialBanner: 'Prueba Gratuita de 7 Días Activa',
  trialExpired: '¡Prueba caducada! Suscríbete para continuar.',
  subscribeBtn: 'Suscribirse ($1/mes)',
  navRoutine: 'Rutina Diaria',
  navCoach: 'Tutor IA',
  navWishlist: 'Lista de Deseos',
  navScreenTime: 'Tiempo de Pantalla',
  navGrades: 'Gestor Académico',
  navChildren: 'Gestión de Hijos',
  navSupport: 'Soporte y Quejas',
  parentPinTitle: 'Verificación PIN de Padres',
  enterPinDesc: 'Ingresa el PIN de 4 dígitos para acceder',
  unlockBtn: 'Desbloquear Controles',
  invalidPin: 'Código PIN incorrecto',
  parentRole: 'Padre / Supervisor',
  childRole: 'Modo Hijo',
  switchRole: 'Cambiar Perfil',
  addKid: 'Agregar Nuevo Hijo',
  addGuardian: 'Agregar Segundo Tutor',
  childLimitWarning: 'Límite de familia alcanzado (máximo 5 hijos).',
  routineTitle: 'Rutina Diaria',
  verifiedByAI: 'Verificado por Gemini Vision',
  pendingParentApproval: 'Esperando Confirmación de Padres',
  approveBtn: 'Aprobar',
  reviewBtn: 'Revisar / Rechazar',
  uploadProof: 'Subir Foto de Prueba',
  xpGained: '¡Puntos XP Ganados!',
  screenTimeLimit: 'Límite Diario de Pantalla',
  screenTimeDesc: '2h 15m Total (División Inteligente)',
  exemptAppsNote: 'Llamadas, Alarmas y Emergencias excluidas',
  gradeManagerTitle: 'Gestor de Calificaciones Escolares',
  hideGradesToggle: 'Ocultar Calificaciones y Exámenes por Ahora',
  addGrade: 'Añadir Calificación',
  aiIntervention: 'Alerta del Tutor IA',
  wishlistTitle: 'Lista de Recompensas',
  addWishGoal: 'Añadir Recompensa Personalizada',
  deleteGoal: 'Eliminar Meta',
  xpRequired: 'XP Necesarios',
  claimReward: 'Reclamar Recompensa',
  attachPhoto: 'Adjuntar Foto del Regalo',
  themePickerTitle: 'Seleccionar Tema Visual (16 Paletas)',
  supportCornerTitle: 'Rincón de Soporte y Sugerencias',
  sendFeedback: 'Enviar Queja o Sugerencia',
  shareAchievement: 'Compartir Logros',
  shareSub: '¡Inspira a familiares en WhatsApp!',
  genderBoy: 'Niño',
  genderGirl: 'Niña',
  ambitionPrompt: '¿Cuál es tu profesión soñada?',
  howDidYouHear: '¿Cómo conociste Familia AI?',
  confirmTimeRoutine: 'Confirmar Horarios y Sueño',
  sleepTimeNotice: 'Horario Obligatorio de Sueño (8 Horas - Acostarse 11:00 PM)',
  confirmBtn: 'Confirmar y Guardar',
  morning: 'Mañana',
  afternoon: 'Tarde',
  night: 'Noche',
  completeBtn: 'Completar',
  completedBtn: 'Completado',
  rejectBtn: 'Rechazar',
  level: 'Nivel',
  streak: 'Racha',
  days: 'días',
  coachTitle: 'Tutor Académico y de Hábitos IA',
  coachPlaceholder: 'Pregúntame sobre tus estudios o rutina...',
  sendBtn: 'Enviar',
  subject: 'Materia',
  score: 'Calificación',
  date: 'Fecha',
  status: 'Estado',
  saveBtn: 'Guardar',
  cancelBtn: 'Cancelar',
  childName: 'Nombre del Hijo',
  childGender: 'Género',
  childPhone: 'Teléfono',
  childEmail: 'Email del Hijo',
  childPassword: 'Contraseña del Hijo',
  noGrades: 'No hay calificaciones registradas',
  noWishlist: 'No hay metas aún. ¡Añade una!',
  feedbackPlaceholder: 'Escribe tu queja o sugerencia...',
  feedbackSent: '¡Feedback enviado!',
  languageLabel: 'Idioma',
  themeLabel: 'Tema',
  progress: 'Progreso',
  of: 'de',
  mins: 'min',
  hours: 'horas',
  remaining: 'restante',
  used: 'usado',
  aiThinking: 'IA verificando...',
  aiApproved: '¡Gemini IA aprobó! Ganaste',
  aiSentToParent: 'Enviado a padres para confirmación',
  taskRejected: 'Tarea rechazada',
  xpGranted: '¡Tarea aprobada y XP otorgada!',
  pinUnlocked: 'Controles de padres desbloqueados',
  childAdded: '¡Perfil creado!',
  wishAdded: '¡Meta añadida a la lista!',
  wishRemoved: 'Meta eliminada',
  gradeAdded: 'Calificación añadida',
  rewardClaimed: '¡Recompensa reclamada!',
  notEnoughXp: 'XP insuficiente para esta recompensa',
  routineSectionMorning: 'Rutina Matutina',
  routineSectionAfternoon: 'Rutina Vespertina',
  routineSectionNight: 'Rutina Nocturna',
  sleepSchedule: 'Horario de Sueño',
  bedtime: 'Hora de dormir',
  wakeTime: 'Hora de despertar',
  sleepDuration: 'Duración del sueño',
  gradesHidden: 'Calificaciones ocultas por el padre',
  gradesVisible: 'Mostrar Calificaciones',
  averageScore: 'Promedio',
  topSubject: 'Mejor Materia',
  needsSupport: 'Necesita Apoyo',
  financialTier: 'Nivel Financiero',
  ambition: 'Ambición',
  whatsappShare: 'Compartir en WhatsApp',
  achievementCard: 'Tarjeta de Logro',
  proBadge: 'PRO AI',
  trialDaysLeft: 'días restantes de prueba',
  extendedFamilyPlan: 'Plan Familiar Extendido',
  childProfile: 'Perfil del Hijo',
  selectChild: 'Seleccionar Hijo',
  aiCoachIntro: '¡Hola campeón! 👋 Soy tu Tutor IA de Familia AI. ¿En qué puedo ayudarte hoy? 🚀',
  aiCoachIntroAr: '¡Hola campeón! 👋 Soy tu Tutor IA de Familia AI. ¿En qué puedo ayudarte hoy? 🚀',
  noTasksPending: 'No hay tareas pendientes',
  allDone: '¡Todas las tareas completadas! 🎉',
  dailyProgress: 'Progreso Diario',
  tasksCompleted: 'tareas completadas',
  onboardingTitle: 'Bienvenido a Familia AI',
  onboardingSubtitle: 'Rutina Familiar Inteligente y Tutor Académico Gamificado',
  startTrial: 'Iniciar Prueba Gratuita de 7 Días',
  startSubscription: 'Suscribirse Ahora ($1/mes)',
  enterPhone: 'Ingresa Tu Número de Teléfono',
  enterPhoneDesc: 'Enviaremos un código de 6 dígitos por SMS o WhatsApp',
  phonePlaceholder: '+201012345678',
  sendOtp: 'Enviar Código',
  enterOtp: 'Ingresa Código de Verificación',
  enterOtpDesc: 'Se envió un código de 6 dígitos a tu teléfono',
  verifyOtp: 'Verificar y Continuar',
  resendOtp: 'Reenviar Código',
  otpSent: '¡Código de verificación enviado!',
  invalidOtp: 'Código de verificación inválido',
  financialTitle: 'Estado Financiero',
  financialDesc: 'La IA usará esto para calcular los requisitos de XP de manera justa',
  financialVeryLow: 'Muy Bajo',
  financialLow: 'Bajo',
  financialAverage: 'Promedio',
  financialGood: 'Bueno',
  financialVeryGood: 'Muy Bueno',
  aiCalculatingXp: 'IA calculando costos de XP...',
  aiXpResult: 'La IA ha establecido costos de XP según el estado financiero',
  aiXpDesc: 'Los costos de XP se ajustan automáticamente por IA',
  addTask: 'Añadir Tarea',
  editTask: 'Editar Tarea',
  deleteTask: 'Eliminar',
  taskTitle: 'Título de Tarea',
  taskXp: 'Recompensa XP',
  taskTimeOfDay: 'Momento del Día',
  requiresCamera: 'Requiere Verificación con Foto',
  taskMissed: 'Perdida',
  xpPenalty: 'Penalización XP',
  xpPenaltyDesc: 'Las tareas perdidas deducen el mismo XP que habrían otorgado',
  missedTask: '¡Tarea perdida! Penalización de XP aplicada',
  taskDeleted: 'Tarea eliminada',
  taskAdded: 'Tarea añadida con éxito',
  taskEdited: 'Tarea actualizada con éxito',
  childNoEditPermission: 'Los hijos solo pueden ver y completar tareas',
  hobbiesLabel: 'Deportes y Aficiones',
  hobbyName: 'Nombre de Actividad',
  hobbyDays: 'Días',
  hobbyTime: 'Hora',
  addHobby: 'Añadir Actividad',
  removeHobby: 'Quitar',
  hobbyReminderNote: 'La IA enviará recordatorios 30 min antes de cada actividad',
  guardianName: 'Nombre del Tutor',
  guardianPhone: 'Teléfono del Tutor',
  guardianAdded: '¡Segundo tutor añadido!',
  guardianVerified: 'Tutor verificado con éxito',
  guardianVerifying: 'Verificando teléfono del tutor...',
  notificationsPermission: 'Activar Notificaciones',
  advancedProtection: 'Protección Avanzada de App',
  advancedProtectionDesc: 'Prevenir desinstalación incluso tras restablecer el dispositivo',
  enableNotifications: 'Activar',
  enableProtection: 'Activar',
  screenTimeFree: 'Tiempo Libre (1h)',
  screenTimeHomework: 'Tareas (15min)',
  screenTimeFinal: 'Recompensa Final (1h)',
  screenTimeFreeDesc: '1 hora libre después de la escuela — apps pesadas bloqueadas después',
  screenTimeHomeworkDesc: '15 min — solo apps educativas/IA permitidas (sin juegos)',
  screenTimeFinalDesc: '1 hora después de completar todas las tareas y deberes',
  screenTimeUnlimited: 'Tiempo Ilimitado',
  screenTimeUnlimitedWarn: 'Advertencia: el tiempo de pantalla ilimitado afecta negativamente la concentración y las calificaciones',
  aiGradeAnalysis: 'Análisis de Calificaciones IA',
  aiGradeAdvice: 'Consejo de IA',
  aiGradeLowScore: 'necesita apoyo adicional. ¡Pregúntame qué es difícil y te explicaré con recursos gratis!',
  aiGradeGoodScore: '¡va muy bien! Sigue con el esfuerzo constante.',
  aiGradeExcellent: '¡es sobresaliente! ¡Eres una estrella! ¡Sigue brillando!',
  freeResources: 'Recursos de Aprendizaje Gratuitos',
  feedbackReplySuggestion: '¡Gracias por tu maravillosa sugerencia! Se estudiará y la app mejorará basándose en ella!',
  feedbackReplyComplaint: '¡Lo sentimos por lo ocurrido! Resolveremos tu queja lo antes posible. ¡Gracias por contactarnos!',
  searchLanguages: 'Buscar idiomas...',
  darkMode: 'Oscuro',
  lightMode: 'Claro',
  bgToggle: 'Fondo',
  wakeTimeLabel: 'Hora de Despertar',
  schoolTime: 'Hora de Escuela',
  returnTime: 'Hora de Regreso',
  sleepTimeLabel: 'Hora de Dormir',
  morningRoutineAuto: 'Rutina Matutina Automática',
  routineAutoDesc: 'La IA genera tu rutina según las horas de despertar y escuela',
  routineAutoCalc: 'Auto-Calcular Rutina con IA',
  childReadOnly: 'Solo Lectura',
  childReadOnlyDesc: 'Puedes ver y completar tareas. Pide a tus padres que añadan o editen tareas.',
  linkedAccount: 'Cuenta Vinculada',
  linkedAccountDesc: 'Esta cuenta infantil está vinculada a tu cuenta de padre',
  editChild: 'Editar',
  childSettings: 'Ajustes',
  notificationsPermissionDesc: 'Recibe recordatorios para estudio, ejercicio y aprobación de tareas',
  cameraPermission: 'Cámara y Galería de Fotos',
  cameraPermissionDesc: 'Necesaria para verificar tareas completadas con fotos',
  screenTimePermission: 'Tiempo de Pantalla y Acceso de Uso',
  screenTimePermissionDesc: 'Monitorear y gestionar el tiempo de pantalla diario',
  countrySelector: 'País',
  deliverySms: 'SMS',
  deliveryWhatsapp: 'WhatsApp',
  childLoginBtn: 'Acceso de Hijo',
  signOut: 'Cerrar Sesión',
  bestOption: 'Mejor Opción',
  customDuration: 'Duración Personalizada',
  paymentTitle: 'Completa Tu Suscripción',
  paymentDesc: 'Elige tu método de pago preferido',
  paymentCard: 'Tarjeta de Crédito / Débito',
  paymentCardDesc: 'Visa, Mastercard, Meeza',
  paymentMobileWallet: 'Billetera Móvil',
  paymentMobileWalletDesc: 'Vodafone Cash, Orange Cash, Etisalat Cash, WE Pay',
  paymentInstaPay: 'InstaPay',
  paymentInstaPayDesc: 'Transferencia bancaria instantánea',
  paymentFawry: 'Fawry / Código de Referencia',
  paymentFawryDesc: 'Paga en cualquier sucursal de Fawry',
  paymentDigitalWallet: 'Billetera Digital',
  paymentDigitalWalletDesc: 'Apple Pay, Google Pay, PayPal',
  scanCard: 'Escanear Tarjeta con Cámara',
  cardNumber: 'Número de Tarjeta',
  cardExpiry: 'MM/AA',
  cardCvv: 'CVV',
  cardHolder: 'Nombre del Titular',
  confirmPayment: 'Confirmar Pago',
  paymentSuccess: '¡Pago exitoso! Bienvenido a Familia AI',
  paymentProcessing: 'Procesando pago...',
  selectPaymentMethod: 'Selecciona Método de Pago',
  resendViaSms: 'Reenviar por SMS',
  resendViaWhatsapp: 'Reenviar por WhatsApp',
  fawryRefCode: 'Código de Referencia Fawry',
  fawryRefDesc: 'Usa este código para pagar en cualquier sucursal de Fawry',
  uploadReceipt: 'Subir Recibo de Pago',
  captureReceipt: 'Tomar foto del recibo',
  receiptUploaded: 'Recibo subido',
  summaryTitle: 'Confirma Tu Configuración',
  summaryDesc: 'Revisa todas tus selecciones antes de crear tu cuenta',
  summaryPlan: 'Plan',
  summaryPlanTrial: 'Prueba Gratuita de 7 Días',
  summaryPlanSubscribed: 'Suscripción $1/mes',
  summaryPayment: 'Método de Pago',
  summaryPhone: 'Número de Teléfono',
  summaryPermissions: 'Permisos',
  summaryFinancial: 'Estado Financiero',
  summaryEnabled: 'Activado',
  summaryDisabled: 'Desactivado',
  summaryConfirmBtn: 'Confirmar y Comenzar',
  setupComplete: '¡Configuración completa! Bienvenido a Familia AI',
  selectSubOption: 'Selecciona opción',
  systemPermissionsTitle: 'Permisos del Sistema',
  systemPermissionsDesc: 'Actívalos para la mejor experiencia. Puedes cambiarlos después.',
  selectPaymentSubFirst: 'Selecciona una opción primero',
};

export const TRANSLATIONS: Record<LangCode, Translation> = {
  en, ar, es,
  fr: en, de: en, tr: en, pt: en, it: en, ru: en, zh: en, ja: en, ko: en,
  hi: en, ur: en, id: en, ms: en, fa: en, sw: en, nl: en, pl: en,
  th: en, vi: en, tl: en, bn: en, ta: en, te: en, mr: en, gu: en, pa: en, or: en,
  my: en, km: en, lo: en, si: en, ne: en, am: en, ha: en, yo: en, ig: en, zu: en,
  af: en, sq: en, az: en, uz: en, kk: en, ky: en, tg: en, mn: en, ka: en, hy: en,
};
