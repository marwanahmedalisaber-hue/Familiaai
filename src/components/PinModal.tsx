import { useFamilia } from '@/context/FamiliaContext';
import Modal from '@/components/Modal';
import { Shield, Lock } from 'lucide-react';
import { useState } from 'react';

export default function PinModal() {
  const { t, showPinModal, setShowPinModal, pinInput, setPinInput, handleVerifyPin, theme } = useFamilia();
  const [error, setError] = useState(false);

  if (!showPinModal) return null;

  const handleDigit = (d: string) => {
    if (pinInput.length < 4) {
      const newPin = pinInput + d;
      setPinInput(newPin);
      setError(false);
      if (newPin.length === 4) {
        setTimeout(() => {
          if (newPin === '1234') {
            handleVerifyPin();
          } else {
            setError(true);
            setPinInput('');
          }
        }, 200);
      }
    }
  };

  const handleBackspace = () => {
    setPinInput(pinInput.slice(0, -1));
    setError(false);
  };

  return (
    <Modal title={t.parentPinTitle} onClose={() => setShowPinModal(false)}>
      <div className="flex flex-col items-center gap-4">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center shadow-lg`}>
          <Shield className="w-8 h-8 text-white" />
        </div>
        <p className="text-sm text-slate-400 text-center">{t.enterPinDesc}</p>

        <div className={`flex gap-3 ${error ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                error
                  ? 'border-rose-500/50 bg-rose-500/10'
                  : i < pinInput.length
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                  : 'border-slate-600 bg-slate-900/50'
              }`}
            >
              {i < pinInput.length ? '•' : ''}
            </div>
          ))}
        </div>

        {error && <p className="text-xs font-semibold text-rose-400">{t.invalidPin}</p>}

        <div className="grid grid-cols-3 gap-2 mt-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="w-16 h-14 rounded-xl bg-slate-700 text-white text-xl font-bold hover:bg-slate-600 transition-colors"
            >
              {d}
            </button>
          ))}
          <button onClick={handleBackspace} className="w-16 h-14 rounded-xl bg-slate-700/50 text-slate-400 hover:bg-slate-600 transition-colors flex items-center justify-center">
            <Lock className="w-5 h-5 rotate-180" />
          </button>
          <button onClick={() => handleDigit('0')} className="w-16 h-14 rounded-xl bg-slate-700 text-white text-xl font-bold hover:bg-slate-600 transition-colors">
            0
          </button>
          <div className="w-16 h-14" />
        </div>
      </div>
    </Modal>
  );
}
