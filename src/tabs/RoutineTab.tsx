import { useFamilia } from '@/context/FamiliaContext';
import { CheckCircle, Circle, Clock, Camera, ShieldCheck, AlertCircle, Loader2, Sun, CloudSun, Moon, Plus, Trash2, Edit, X, AlertTriangle } from 'lucide-react';
import type { TimeOfDay, RoutineTask } from '@/types';
import { useState } from 'react';

export default function RoutineTab() {
  const { routineTasks, t, userRole, isDark, theme } = useFamilia();
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState<RoutineTask | null>(null);

  const sections: { key: TimeOfDay; label: string; icon: React.ReactNode }[] = [
    { key: 'morning', label: t.routineSectionMorning, icon: <Sun className="w-4 h-4 text-amber-400" /> },
    { key: 'afternoon', label: t.routineSectionAfternoon, icon: <CloudSun className="w-4 h-4 text-orange-400" /> },
    { key: 'night', label: t.routineSectionNight, icon: <Moon className="w-4 h-4 text-indigo-400" /> },
  ];

  const completedCount = routineTasks.filter((r) => r.completed).length;
  const progress = routineTasks.length > 0 ? (completedCount / routineTasks.length) * 100 : 0;
  const cardBg = isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white/60 border-slate-200/60';
  const headingText = isDark ? 'text-white' : 'text-slate-900';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';
  const divider = isDark ? 'bg-slate-800' : 'bg-slate-200';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-black ${headingText}`}>{t.routineTitle}</h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${subText}`}>
            {completedCount}/{routineTasks.length} {t.tasksCompleted}
          </span>
          {userRole === 'parent' && (
            <button
              onClick={() => setShowAddTask(true)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-tr ${theme.gradient} text-white hover:scale-105 transition-transform`}
            >
              <Plus className="w-3.5 h-3.5" />
              {t.addTask}
            </button>
          )}
        </div>
      </div>

      <div className={`h-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'} overflow-hidden`}>
        <div className={`h-full rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-500`} style={{ width: `${progress}%` }} />
      </div>

      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${cardBg} border`}>
        <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
        <span className={`text-xs ${subText}`}>{t.sleepTimeNotice}</span>
      </div>

      {userRole === 'child' && (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isDark ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200'} border`}>
          <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span className={`text-xs ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>{t.childReadOnlyDesc}</span>
        </div>
      )}

      {sections.map((section) => {
        const tasks = routineTasks.filter((r) => r.timeOfDay === section.key);
        if (tasks.length === 0) return null;
        return (
          <div key={section.key} className="space-y-2.5">
            <div className="flex items-center gap-2">
              {section.icon}
              <h4 className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{section.label}</h4>
              <div className={`flex-1 h-px ${divider}`} />
            </div>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={() => setEditingTask(task)} />
            ))}
          </div>
        );
      })}

      {showAddTask && <TaskEditor onClose={() => setShowAddTask(false)} />}
      {editingTask && <TaskEditor task={editingTask} onClose={() => setEditingTask(null)} />}
    </div>
  );
}

function TaskCard({ task, onEdit }: { task: RoutineTask; onEdit: () => void }) {
  const { t, userRole, handleCompleteTask, handleParentApproveTask, handleDeleteTask, handleMissTask, isAiLoading, theme, isDark } = useFamilia();
  const [showActions, setShowActions] = useState(false);

  const cardBorder = task.missed
    ? 'border-rose-500/30 bg-rose-500/5'
    : task.completed && task.parentApproved
    ? 'border-emerald-500/30 bg-emerald-500/5'
    : task.completed && !task.parentApproved
    ? 'border-amber-500/30 bg-amber-500/5'
    : isDark ? 'border-slate-700/80 bg-slate-800/60' : 'border-slate-200/80 bg-white/60';

  return (
    <div className={`rounded-2xl border p-4 transition-all ${cardBorder}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {task.missed ? (
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            ) : task.completed && task.parentApproved ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : task.completed && !task.parentApproved ? (
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            ) : (
              <Circle className={`w-5 h-5 ${isDark ? 'text-slate-600' : 'text-slate-300'} flex-shrink-0`} />
            )}
            <h4 className={`text-sm font-bold ${(task.completed || task.missed) ? 'line-through ' + (isDark ? 'text-slate-400' : 'text-slate-400') : isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.morning === 'صباحاً' ? task.titleAr || task.title : task.title}
            </h4>
          </div>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">+{task.xp} XP</span>
            {task.scheduledTime && (
              <span className={`flex items-center gap-1 text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'} ${isDark ? 'bg-slate-700/50' : 'bg-slate-100'} px-2 py-0.5 rounded-md`}>
                <Clock className="w-3 h-3" />
                {task.scheduledTime}
              </span>
            )}
            {task.requiresVision && (
              <span className="flex items-center gap-1 text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                <Camera className="w-3 h-3" />
                {t.verifiedByAI}
              </span>
            )}
            {task.missed && (
              <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md">{t.taskMissed}</span>
            )}
            {task.completed && !task.parentApproved && !task.missed && (
              <span className="text-xs font-semibold text-amber-400">{t.pendingParentApproval}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {!task.completed && !task.missed && (
            <button
              onClick={() => handleCompleteTask(task.id)}
              disabled={isAiLoading}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 bg-gradient-to-tr ${theme.gradient} text-white hover:scale-105`}
            >
              {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : t.completeBtn}
            </button>
          )}
          {task.completed && !task.parentApproved && !task.missed && userRole === 'parent' && (
            <div className="flex gap-1.5">
              <button
                onClick={() => handleParentApproveTask(task.id, true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.approveBtn}
              </button>
              <button
                onClick={() => handleParentApproveTask(task.id, false)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/20 border border-rose-500/40 text-rose-400 hover:bg-rose-500/30 transition-colors"
              >
                {t.rejectBtn}
              </button>
            </div>
          )}
          {userRole === 'parent' && !task.missed && (
            <button
              onClick={() => setShowActions(!showActions)}
              className={`p-1.5 rounded-lg ${isDark ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-700' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'} transition-colors`}
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
          )}
          {showActions && userRole === 'parent' && (
            <div className="flex gap-1.5">
              <button
                onClick={onEdit}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-700 text-white hover:bg-slate-600 transition-colors"
              >
                {t.editTask}
              </button>
              <button
                onClick={() => handleMissTask(task.id)}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500/20 border border-rose-500/40 text-rose-400 hover:bg-rose-500/30 transition-colors"
              >
                {t.taskMissed}
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500/20 border border-rose-500/40 text-rose-400 hover:bg-rose-500/30 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {task.proofImage && task.completed && (
        <div className="mt-3 rounded-xl overflow-hidden border border-slate-700/60">
          <img src={task.proofImage} alt="proof" className="w-full h-32 object-cover" />
        </div>
      )}
    </div>
  );
}

function TaskEditor({ task, onClose }: { task?: RoutineTask; onClose: () => void }) {
  const { t, theme, handleAddTask, handleEditTask, isDark } = useFamilia();
  const [title, setTitle] = useState(task?.title || '');
  const [titleAr, setTitleAr] = useState(task?.titleAr || '');
  const [xp, setXp] = useState(task?.xp || 50);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(task?.timeOfDay || 'morning');
  const [requiresVision, setRequiresVision] = useState(task?.requiresVision ?? true);
  const [scheduledTime, setScheduledTime] = useState(task?.scheduledTime || '07:00');

  const inputClass = isDark
    ? 'bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-600'
    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-slate-400';
  const labelClass = isDark ? 'text-slate-400' : 'text-slate-500';

  const handleSave = () => {
    if (!title.trim()) return;
    if (task) {
      handleEditTask(task.id, { title, titleAr, xp, timeOfDay, requiresVision, scheduledTime });
    } else {
      handleAddTask({ title, titleAr, xp, timeOfDay, requiresVision, scheduledTime });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-md rounded-2xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border shadow-2xl p-5 animate-slideUp`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{task ? t.editTask : t.addTask}</h3>
          <button onClick={onClose} className={`p-1.5 rounded-lg ${isDark ? 'text-slate-400 hover:bg-slate-700 hover:text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'} transition-colors`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.taskTitle} (EN)</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Morning Toothbrushing" className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
          </div>
          <div>
            <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.taskTitle} (AR)</label>
            <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder="غسيل الأسنان الصباحي" className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
          </div>
          <div>
            <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.taskXp}</label>
            <input type="range" min="10" max="200" step="10" value={xp} onChange={(e) => setXp(Number(e.target.value))} className="w-full accent-indigo-500" />
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xs ${labelClass}`}>10</span>
              <span className="text-sm font-black text-amber-400">{xp} XP</span>
              <span className={`text-xs ${labelClass}`}>200</span>
            </div>
          </div>
          <div>
            <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.taskTimeOfDay}</label>
            <div className="flex gap-2">
              {(['morning', 'afternoon', 'night'] as TimeOfDay[]).map((tod) => (
                <button key={tod} onClick={() => setTimeOfDay(tod)} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${timeOfDay === tod ? `bg-gradient-to-tr ${theme.gradient} text-white border-transparent` : isDark ? 'bg-slate-900/80 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-300 text-slate-500'}`}>
                  {t[tod]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={`text-xs font-bold ${labelClass} mb-1.5 block`}>{t.sleepSchedule}</label>
            <input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border text-sm ${inputClass} focus:outline-none transition-colors`} />
          </div>
          <button onClick={() => setRequiresVision(!requiresVision)} className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${requiresVision ? 'bg-cyan-500/10 border-cyan-500/40' : isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-slate-50 border-slate-300'}`}>
            <span className={`flex items-center gap-2 text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Camera className={`w-4 h-4 ${requiresVision ? 'text-cyan-400' : isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              {t.requiresCamera}
            </span>
            <div className={`w-10 h-6 rounded-full transition-colors ${requiresVision ? 'bg-cyan-500' : isDark ? 'bg-slate-600' : 'bg-slate-300'}`}>
              <div className={`w-4 h-4 rounded-full bg-white m-1 transition-transform ${requiresVision ? 'translate-x-4' : ''}`} />
            </div>
          </button>
        </div>

        <button onClick={handleSave} disabled={!title.trim()} className={`w-full mt-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-tr ${theme.gradient} text-white disabled:opacity-50 hover:scale-[1.02] transition-transform`}>
          {t.saveBtn}
        </button>
      </div>
    </div>
  );
}
