import { useFamilia } from '@/context/FamiliaContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast() {
  const { notification } = useFamilia();
  if (!notification) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-cyan-400" />,
  };

  const borders = {
    success: 'border-emerald-500/50',
    error: 'border-rose-500/50',
    info: 'border-cyan-500/50',
  };

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-slideDown">
      <div className={`flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/95 backdrop-blur-md border ${borders[notification.type]} shadow-2xl`}>
        {icons[notification.type]}
        <span className="text-sm font-semibold text-white whitespace-nowrap">{notification.msg}</span>
      </div>
    </div>
  );
}
