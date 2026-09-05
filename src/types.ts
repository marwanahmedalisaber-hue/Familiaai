export type LangCode =
  | 'en' | 'ar' | 'es' | 'fr' | 'de' | 'tr' | 'pt' | 'it' | 'ru' | 'zh'
  | 'ja' | 'ko' | 'hi' | 'ur' | 'id' | 'ms' | 'fa' | 'sw' | 'nl' | 'pl'
  | 'th' | 'vi' | 'tl' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'pa' | 'or'
  | 'my' | 'km' | 'lo' | 'si' | 'ne' | 'am' | 'ha' | 'yo' | 'ig' | 'zu'
  | 'af' | 'sq' | 'az' | 'uz' | 'kk' | 'ky' | 'tg' | 'mn' | 'ka' | 'hy';

export interface Language {
  code: LangCode;
  name: string;
  native: string;
  dir: 'ltr' | 'rtl';
  flag: string;
}

export interface Theme {
  id: string;
  name: string;
  primary: string;
  bg: string;
  text: string;
  border: string;
  gradient: string;
  isLight: boolean;
}

export type UserRole = 'parent' | 'child';
export type Gender = 'boy' | 'girl';
export type TimeOfDay = 'morning' | 'afternoon' | 'night';
export type FinancialTier = 'very_low' | 'low' | 'average' | 'good' | 'very_good';
export type AppPhase = 'onboarding' | 'otp' | 'payment' | 'permissions' | 'financial' | 'summary' | 'child_login' | 'app';

export interface Hobby {
  id: string;
  name: string;
  days: string[];
  time: string;
}

export interface Grade {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
  date: string;
  status: 'Excellent' | 'Good' | 'Needs Support';
}

export interface WishlistItem {
  id: string;
  title: string;
  xpCost: number;
  image: string;
  status: 'active' | 'claimed';
  aiGenerated: boolean;
}

export interface Child {
  id: string;
  name: string;
  arabicName: string;
  gender: Gender;
  avatar: string;
  phone: string;
  email: string;
  password: string;
  ambition: string;
  hobbies: Hobby[];
  xp: number;
  level: number;
  streak: number;
  financialTier: FinancialTier;
  screenTimeUsedMins: number;
  grades: Grade[];
  wishlist: WishlistItem[];
}

export interface RoutineTask {
  id: string;
  timeOfDay: TimeOfDay;
  title: string;
  titleAr?: string;
  xp: number;
  requiresVision: boolean;
  completed: boolean;
  parentApproved: boolean;
  proofImage: string;
  scheduledTime?: string;
  missed?: boolean;
}

export interface Guardian {
  id: string;
  name: string;
  phone: string;
  verified: boolean;
}

export interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

export type TabId = 'routine' | 'coach' | 'wishlist' | 'screentime' | 'grades' | 'children' | 'support';
