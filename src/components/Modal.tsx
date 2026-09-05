import { type ReactNode } from 'react';
import { X } from 'lucide-react';

export default function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl p-5 animate-slideUp">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-black text-white">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
