import { useFamilia } from '@/context/FamiliaContext';
import { GraduationCap, Plus, Eye, EyeOff, TrendingUp, Star, AlertCircle, Sparkles, BookOpen } from 'lucide-react';

export default function GradesTab({ onAddGrade }: { onAddGrade: () => void }) {
  const { activeChild, t, theme, hideGrades, setHideGrades, userRole, isDark } = useFamilia();

  const headingText = isDark ? 'text-white' : 'text-slate-900';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardBg = isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white/60 border-slate-200/80';
  const emptyBg = isDark ? 'border-slate-700 text-slate-600' : 'border-slate-200 text-slate-300';

  if (hideGrades) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-400" />
          <h3 className={`text-lg font-black ${headingText}`}>{t.gradeManagerTitle}</h3>
        </div>
        <div className={`text-center py-12 rounded-2xl border border-dashed ${emptyBg}`}>
          <EyeOff className={`w-10 h-10 mx-auto mb-2 ${emptyBg}`} />
          <p className={`text-sm ${subText}`}>{t.gradesHidden}</p>
          {userRole === 'parent' && (
            <button onClick={() => setHideGrades(false)} className="mt-3 flex items-center gap-1.5 mx-auto px-4 py-2 rounded-xl text-xs font-bold bg-slate-700 text-white hover:bg-slate-600 transition-colors">
              <Eye className="w-3.5 h-3.5" />
              {t.gradesVisible}
            </button>
          )}
        </div>
      </div>
    );
  }

  const grades = activeChild.grades;
  const avg = grades.length > 0 ? Math.round(grades.reduce((s, g) => s + (g.score / g.maxScore) * 100, 0) / grades.length) : 0;
  const topGrade = grades.length > 0 ? grades.reduce((best, g) => (g.score / g.maxScore > best.score / best.maxScore ? g : best)) : null;
  const lowGrades = grades.filter((g) => (g.score / g.maxScore) * 100 < 70);

  const scoreColor = (pct: number) =>
    pct >= 85 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    : pct >= 70 ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    : 'text-rose-400 bg-rose-500/10 border-rose-500/30';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-400" />
          <h3 className={`text-lg font-black ${headingText}`}>{t.gradeManagerTitle}</h3>
        </div>
        {userRole === 'parent' && (
          <div className="flex items-center gap-2">
            <button onClick={() => setHideGrades(true)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${cardBg} ${isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'}`}>
              <EyeOff className="w-3.5 h-3.5" />
              {t.hideGradesToggle}
            </button>
            <button onClick={onAddGrade} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-tr ${theme.gradient} text-white hover:scale-105 transition-transform`}>
              <Plus className="w-4 h-4" />
              {t.addGrade}
            </button>
          </div>
        )}
      </div>

      {grades.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-2xl border ${cardBg} p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className={`text-xs ${subText} font-semibold`}>{t.averageScore}</span>
              </div>
              <span className={`text-2xl font-black ${headingText}`}>{avg}%</span>
            </div>
            <div className={`rounded-2xl border ${cardBg} p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-amber-400" />
                <span className={`text-xs ${subText} font-semibold`}>{t.topSubject}</span>
              </div>
              <span className={`text-sm font-black ${headingText} truncate`}>{topGrade?.subject || '-'}</span>
            </div>
          </div>

          {lowGrades.length > 0 && (
            <div className={`rounded-2xl border ${isDark ? 'bg-rose-500/5 border-rose-500/30' : 'bg-rose-50 border-rose-200'} p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span className={`text-sm font-bold ${isDark ? 'text-rose-300' : 'text-rose-600'}`}>{t.aiGradeAnalysis}</span>
              </div>
              {lowGrades.map((g) => (
                <p key={g.id} className={`text-xs ${subText} mb-1`}>
                  <span className="font-bold">{g.subject}</span>: {t.aiGradeLowScore}
                </p>
              ))}
            </div>
          )}
        </>
      )}

      {grades.length === 0 ? (
        <div className={`text-center py-12 rounded-2xl border border-dashed ${emptyBg}`}>
          <GraduationCap className={`w-10 h-10 mx-auto mb-2 ${emptyBg}`} />
          <p className={`text-sm ${subText}`}>{t.noGrades}</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {grades.map((grade) => {
            const pct = (grade.score / grade.maxScore) * 100;
            return (
              <div key={grade.id} className={`flex items-center justify-between rounded-xl border ${cardBg} p-3.5`}>
                <div className="flex items-center gap-3">
                  {pct >= 85 ? <Star className="w-5 h-5 text-emerald-400" /> : pct >= 70 ? <TrendingUp className="w-5 h-5 text-amber-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
                  <div>
                    <h4 className={`text-sm font-bold ${headingText}`}>{grade.subject}</h4>
                    <p className={`text-xs ${subText}`}>{grade.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-black px-2.5 py-1 rounded-md border ${scoreColor(pct)}`}>
                    {grade.score}/{grade.maxScore}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
