import type { Theme } from '@/types';

export const THEMES: Theme[] = [
  { id: 'indigo', name: 'Deep Indigo', primary: '#4F46E5', bg: 'bg-slate-900', text: 'text-indigo-400', border: 'border-indigo-500', gradient: 'from-indigo-600 to-violet-700', isLight: false },
  { id: 'emerald', name: 'Emerald Forest', primary: '#10B981', bg: 'bg-emerald-950', text: 'text-emerald-400', border: 'border-emerald-500', gradient: 'from-emerald-600 to-teal-700', isLight: false },
  { id: 'crimson', name: 'Warm Crimson', primary: '#EF4444', bg: 'bg-rose-950', text: 'text-rose-400', border: 'border-rose-500', gradient: 'from-rose-600 to-red-700', isLight: false },
  { id: 'amber', name: 'Sunset Amber', primary: '#F59E0B', bg: 'bg-amber-950', text: 'text-amber-400', border: 'border-amber-500', gradient: 'from-amber-500 to-orange-600', isLight: false },
  { id: 'teal', name: 'Cyber Teal', primary: '#14B8A6', bg: 'bg-slate-950', text: 'text-teal-400', border: 'border-teal-500', gradient: 'from-teal-500 to-cyan-600', isLight: false },
  { id: 'cyan', name: 'Ocean Cyan', primary: '#06B6D4', bg: 'bg-slate-900', text: 'text-cyan-400', border: 'border-cyan-500', gradient: 'from-cyan-500 to-blue-600', isLight: false },
  { id: 'rose', name: 'Rose Pink', primary: '#F43F5E', bg: 'bg-slate-950', text: 'text-rose-300', border: 'border-rose-400', gradient: 'from-rose-500 to-pink-600', isLight: false },
  { id: 'lime', name: 'Neon Lime', primary: '#84CC16', bg: 'bg-stone-950', text: 'text-lime-400', border: 'border-lime-500', gradient: 'from-lime-500 to-green-600', isLight: false },
  { id: 'blue', name: 'Midnight Blue', primary: '#2563EB', bg: 'bg-blue-950', text: 'text-blue-400', border: 'border-blue-500', gradient: 'from-blue-600 to-indigo-700', isLight: false },
  { id: 'orange', name: 'Coral Orange', primary: '#F97316', bg: 'bg-stone-900', text: 'text-orange-400', border: 'border-orange-500', gradient: 'from-orange-500 to-amber-600', isLight: false },
  { id: 'slate', name: 'Dark Slate', primary: '#64748B', bg: 'bg-slate-950', text: 'text-slate-300', border: 'border-slate-500', gradient: 'from-slate-700 to-gray-800', isLight: false },
  { id: 'gold', name: 'Golden Champion', primary: '#EAB308', bg: 'bg-yellow-950', text: 'text-yellow-400', border: 'border-yellow-500', gradient: 'from-yellow-500 to-amber-600', isLight: false },
  { id: 'fuchsia', name: 'Fuchsia Neon', primary: '#D946EF', bg: 'bg-fuchsia-950', text: 'text-fuchsia-400', border: 'border-fuchsia-500', gradient: 'from-fuchsia-600 to-pink-700', isLight: false },
  { id: 'green', name: 'Forest Green', primary: '#16A34A', bg: 'bg-green-950', text: 'text-green-400', border: 'border-green-500', gradient: 'from-green-600 to-emerald-700', isLight: false },
  { id: 'lightClassic', name: 'Clean Light', primary: '#4F46E5', bg: 'bg-gray-100', text: 'text-indigo-600', border: 'border-indigo-300', gradient: 'from-indigo-500 to-blue-600', isLight: true },
  { id: 'lightEmerald', name: 'Mint Refresh', primary: '#059669', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300', gradient: 'from-emerald-500 to-teal-600', isLight: true },
];
