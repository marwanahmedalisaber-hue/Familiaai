import { useFamilia } from '@/context/FamiliaContext';
import Modal from '@/components/Modal';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function AddWishModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const { t, theme, handleAddWishlistGoal, isDark } = useFamilia();
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');

  if (!show) return null;

  const inputClass = isDark
    ? 'bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-600'
    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-slate-400';
  const labelClass = isDark ? 'text-slate-400' : 'text-slate-500';

  const handleSave = () => {
    handleAddWishlistGoal(title, img);
    setTitle('');
    setImg('');
    onClose();
  };

  return (
    <Modal title={t.addWishGoal} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.wishlistTitle}</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Smart Scooter" className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
        </div>

        <div>
          <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.attachPhoto} (URL)</label>
          <input type="text" value={img} onChange={(e) => setImg(e.target.value)} placeholder="https://..." className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
        </div>

        <div className={`flex items-center gap-2 p-3 rounded-xl ${isDark ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-cyan-50 border border-cyan-200'}`}>
          <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <p className={`text-xs ${isDark ? 'text-cyan-200' : 'text-cyan-700'}`}>{t.aiXpDesc}</p>
        </div>

        <button onClick={handleSave} disabled={!title.trim()} className={`w-full py-3 rounded-xl text-sm font-bold bg-gradient-to-tr ${theme.gradient} text-white disabled:opacity-50 hover:scale-[1.02] transition-transform`}>
          {t.saveBtn}
        </button>
      </div>
    </Modal>
  );
}
