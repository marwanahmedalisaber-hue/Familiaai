import { useFamilia } from '@/context/FamiliaContext';
import Modal from '@/components/Modal';
import { useState } from 'react';
import { Plus, Trash2, Clock } from 'lucide-react';
import type { Hobby } from '@/types';

const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function AddChildModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const { t, theme, handleCreateChild, isDark } = useFamilia();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ambition, setAmbition] = useState('');
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [hobbyName, setHobbyName] = useState('');
  const [hobbyDays, setHobbyDays] = useState<string[]>([]);
  const [hobbyTime, setHobbyTime] = useState('16:00');

  if (!show) return null;

  const inputClass = isDark
    ? 'bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-600'
    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-slate-400';
  const labelClass = isDark ? 'text-slate-400' : 'text-slate-500';

  const toggleDay = (day: string) => {
    setHobbyDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const addHobby = () => {
    if (!hobbyName.trim()) return;
    setHobbies((prev) => [...prev, { id: `h_${Date.now()}`, name: hobbyName, days: hobbyDays, time: hobbyTime }]);
    setHobbyName('');
    setHobbyDays([]);
    setHobbyTime('16:00');
  };

  const removeHobby = (id: string) => {
    setHobbies((prev) => prev.filter((h) => h.id !== id));
  };

  const handleSave = () => {
    handleCreateChild({ name, gender, phone, email, password, ambition, hobbies });
    setName(''); setGender('boy'); setPhone(''); setEmail(''); setPassword(''); setAmbition(''); setHobbies([]);
    onClose();
  };

  return (
    <Modal title={t.addKid} onClose={onClose}>
      <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
        <div>
          <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.childName}</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Laith" className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
        </div>

        <div>
          <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.childGender}</label>
          <div className="flex gap-2">
            <button onClick={() => setGender('boy')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${gender === 'boy' ? `bg-gradient-to-tr ${theme.gradient} text-white border-transparent` : isDark ? 'bg-slate-900/80 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-300 text-slate-500'}`}>{t.genderBoy}</button>
            <button onClick={() => setGender('girl')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${gender === 'girl' ? `bg-gradient-to-tr ${theme.gradient} text-white border-transparent` : isDark ? 'bg-slate-900/80 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-300 text-slate-500'}`}>{t.genderGirl}</button>
          </div>
        </div>

        <div>
          <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.childPhone}</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+201012345678" className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.childEmail}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="laith@familia.ai" className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
          </div>
          <div>
            <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.childPassword}</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
          </div>
        </div>

        <div>
          <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.ambitionPrompt}</label>
          <input type="text" value={ambition} onChange={(e) => setAmbition(e.target.value)} placeholder="Robotics Engineer" className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
        </div>

        <div className={`rounded-xl border ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'} p-3 space-y-2`}>
          <label className={`text-xs font-bold ${labelClass} block`}>{t.hobbiesLabel}</label>
          <p className={`text-[10px] ${labelClass}`}>{t.hobbyReminderNote}</p>
          <input type="text" value={hobbyName} onChange={(e) => setHobbyName(e.target.value)} placeholder={t.hobbyName} className={`w-full px-3 py-2 rounded-lg border text-sm ${inputClass} focus:outline-none`} />
          <div className="flex flex-wrap gap-1">
            {DAYS.map((d) => (
              <button key={d} onClick={() => toggleDay(d)} className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors ${hobbyDays.includes(d) ? `bg-gradient-to-tr ${theme.gradient} text-white` : isDark ? 'bg-slate-700 text-slate-400' : 'bg-slate-200 text-slate-500'}`}>{d}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${labelClass}`} />
            <input type="time" value={hobbyTime} onChange={(e) => setHobbyTime(e.target.value)} className={`px-3 py-2 rounded-lg border text-sm ${inputClass} focus:outline-none`} />
            <button onClick={addHobby} disabled={!hobbyName.trim()} className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold bg-gradient-to-tr ${theme.gradient} text-white disabled:opacity-50 transition-transform hover:scale-105`}>
              <Plus className="w-3.5 h-3.5" />
              {t.addHobby}
            </button>
          </div>
          {hobbies.length > 0 && (
            <div className="space-y-1">
              {hobbies.map((h) => (
                <div key={h.id} className={`flex items-center justify-between px-3 py-1.5 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                  <span className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{h.name} - {h.days.join(', ')} - {h.time}</span>
                  <button onClick={() => removeHobby(h.id)} className="text-rose-400 hover:text-rose-300 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleSave} disabled={!name.trim()} className={`w-full py-3 rounded-xl text-sm font-bold bg-gradient-to-tr ${theme.gradient} text-white disabled:opacity-50 hover:scale-[1.02] transition-transform`}>
          {t.saveBtn}
        </button>
      </div>
    </Modal>
  );
}
