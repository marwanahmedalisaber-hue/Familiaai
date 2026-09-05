import type { Child, RoutineTask } from '@/types';

export const INITIAL_CHILDREN: Child[] = [
  {
    id: 'c1',
    name: 'Laith',
    arabicName: 'ليث',
    gender: 'boy',
    avatar: '👦⚡',
    phone: '+201012345678',
    email: 'laith@familia.ai',
    password: 'laith123',
    ambition: 'Robotics Engineer & Scientist',
    hobbies: [
      { id: 'h1', name: 'Football', days: ['Sat', 'Mon', 'Wed'], time: '16:00' },
      { id: 'h2', name: 'Swimming', days: ['Tue', 'Thu'], time: '17:30' },
    ],
    xp: 850,
    level: 4,
    streak: 6,
    financialTier: 'average',
    screenTimeUsedMins: 75,
    grades: [
      { id: 'g1', subject: 'Mathematics', score: 95, maxScore: 100, date: '2026-02-15', status: 'Excellent' },
      { id: 'g2', subject: 'Science', score: 68, maxScore: 100, date: '2026-02-20', status: 'Needs Support' },
      { id: 'g3', subject: 'English', score: 90, maxScore: 100, date: '2026-02-25', status: 'Good' },
    ],
    wishlist: [
      { id: 'w1', title: 'Smart Scooter', xpCost: 1500, image: 'https://images.pexels.com/photos/1624894/pexels-photo-1624894.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', status: 'active', aiGenerated: true },
      { id: 'w2', title: 'Weekend Family Burger Trip', xpCost: 600, image: 'https://images.pexels.com/photos/8305726/pexels-photo-8305726.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', status: 'active', aiGenerated: true },
    ],
  },
  {
    id: 'c2',
    name: 'Maya',
    arabicName: 'مايا',
    gender: 'girl',
    avatar: '👧🎨',
    phone: '+201098765432',
    email: 'maya@familia.ai',
    password: 'maya123',
    ambition: 'Pediatric Doctor',
    hobbies: [
      { id: 'h3', name: 'Gymnastics', days: ['Sun', 'Fri'], time: '15:00' },
    ],
    xp: 1200,
    level: 6,
    streak: 12,
    financialTier: 'average',
    screenTimeUsedMins: 45,
    grades: [
      { id: 'g4', subject: 'Biology', score: 98, maxScore: 100, date: '2026-02-18', status: 'Excellent' },
      { id: 'g5', subject: 'Physics', score: 88, maxScore: 100, date: '2026-02-22', status: 'Good' },
    ],
    wishlist: [
      { id: 'w3', title: 'Digital Art Drawing Tablet', xpCost: 2000, image: 'https://images.pexels.com/photos/29940157/pexels-photo-29940157.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', status: 'active', aiGenerated: true },
    ],
  },
];

export const INITIAL_ROUTINE: RoutineTask[] = [
  { id: 'r1', timeOfDay: 'morning', title: 'Morning Toothbrushing (Camera Check)', titleAr: 'غسيل الأسنان الصباحي (فحص بالكاميرا)', xp: 100, requiresVision: true, completed: true, parentApproved: true, proofImage: 'https://images.pexels.com/photos/7086231/pexels-photo-7086231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', scheduledTime: '07:05' },
  { id: 'r2', timeOfDay: 'morning', title: 'Make Your Bed & Tidying Room', titleAr: 'ترتيب السرير وتنظيف الغرفة', xp: 50, requiresVision: true, completed: true, parentApproved: true, proofImage: '', scheduledTime: '07:10' },
  { id: 'r3', timeOfDay: 'morning', title: 'Morning Shower & Hygiene', titleAr: 'الاستحمام الصباحي والنظافة', xp: 70, requiresVision: false, completed: false, parentApproved: false, proofImage: '', scheduledTime: '07:15' },
  { id: 'r4', timeOfDay: 'morning', title: 'Backpack & Homework Check Before School', titleAr: 'تجهيز الحقيبة المدرسية والواجبات', xp: 80, requiresVision: true, completed: false, parentApproved: false, proofImage: '', scheduledTime: '07:25' },
  { id: 'r5', timeOfDay: 'afternoon', title: 'Organize Desk & Study Table After School', titleAr: 'ترتيب مكتب الدراسة بعد المدرسة', xp: 60, requiresVision: true, completed: false, parentApproved: false, proofImage: '', scheduledTime: '15:00' },
  { id: 'r6', timeOfDay: 'night', title: 'Night Toothbrushing (Before Bed)', titleAr: 'غسيل الأسنان المسائي (قبل النوم)', xp: 100, requiresVision: true, completed: false, parentApproved: false, proofImage: '', scheduledTime: '22:45' },
];

export const DEFAULT_GIFT_IMAGE = 'https://images.pexels.com/photos/1661959/pexels-photo-1661959.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

// AI XP multiplier based on financial tier
export const FINANCIAL_XP_MULTIPLIERS: Record<string, number> = {
  very_low: 3.0,
  low: 2.0,
  average: 1.5,
  good: 1.0,
  very_good: 0.6,
};
