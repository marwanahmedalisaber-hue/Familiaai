import { useFamilia } from '@/context/FamiliaContext';
import Modal from '@/components/Modal';
import { useState } from 'react';

export default function AddGradeModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const { t, theme, handleAddGrade, isDark } = useFamilia();
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(85);
  const [maxScore, setMaxScore] = useState(100);

  if (!show) return null;

  const inputClass = isDark
    ? 'bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-600'
    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-slate-400';
  const labelClass = isDark ? 'text-slate-400' : 'text-slate-500';

  const handleSave = () => {
    handleAddGrade(subject, score, maxScore);
    setSubject('');
    setScore(85);
    setMaxScore(100);
    onClose();
  };

  const pct = (score / maxScore) * 100;
  const scoreColor = pct >= 85 ? 'text-emerald-400' : pct >= 70 ? 'text-amber-400' : 'text-rose-400';

  return (
    <Modal title={t.addGrade} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.subject}</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Mathematics" className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.score}</label>
            <input type="number" min="0" value={score} onChange={(e) => setScore(Number(e.target.value))} className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
          </div>
          <div>
            <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.of}</label>
            <input type="number" min="1" value={maxScore} onChange={(e) => setMaxScore(Number(e.target.value))} className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
          </div>
        </div>

        <div className="text-center">
          <span className={`text-2xl font-black ${scoreColor}`}>{pct.toFixed(0)}%</span>
        </div>

        <button onClick={handleSave} disabled={!subject.trim()} className={`w-full py-3 rounded-xl text-sm font-bold bg-gradient-to-tr ${theme.gradient} text-white disabled:opacity-50 hover:scale-[1.02] transition-transform`}>
          {t.saveBtn}
        </button>
      </div>
    </Modal>
  );
}
