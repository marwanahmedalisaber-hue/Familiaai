import { useFamilia } from '@/context/FamiliaContext';
import { Plus, Trash2, Gift, Zap, Lock, Check, Sparkles, Trophy } from 'lucide-react';

export default function WishlistTab({ onAddWish }: { onAddWish: () => void }) {
  const { activeChild, t, theme, handleDeleteGoal, handleClaimReward, userRole, isDark } = useFamilia();

  const headingText = isDark ? 'text-white' : 'text-slate-900';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardBg = isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white/60 border-slate-200/80';
  const emptyBg = isDark ? 'border-slate-700 text-slate-600' : 'border-slate-200 text-slate-300';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-rose-400" />
          <h3 className={`text-lg font-black ${headingText}`}>{t.wishlistTitle}</h3>
        </div>
        {userRole === 'parent' && (
          <button
            onClick={onAddWish}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-tr ${theme.gradient} text-white hover:scale-105 transition-transform`}
          >
            <Plus className="w-4 h-4" />
            {t.addWishGoal}
          </button>
        )}
      </div>

      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${cardBg} border`}>
        <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <span className={`text-xs ${subText}`}>
          {activeChild.xp} XP | {t.level} {activeChild.level}
        </span>
        <div className="flex-1" />
        <span className="flex items-center gap-1 text-xs font-semibold text-cyan-400">
          <Sparkles className="w-3 h-3" />
          {t.aiXpDesc}
        </span>
      </div>

      {activeChild.wishlist.length === 0 ? (
        <div className={`text-center py-12 rounded-2xl border border-dashed ${emptyBg}`}>
          <Gift className="w-10 h-10 mx-auto mb-2" />
          <p className={`text-sm ${subText}`}>{t.noWishlist}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeChild.wishlist.map((goal) => {
            const canAfford = activeChild.xp >= goal.xpCost;
            const progress = Math.min((activeChild.xp / goal.xpCost) * 100, 100);
            return (
              <div key={goal.id} className={`rounded-2xl border ${cardBg} overflow-hidden hover:shadow-xl transition-shadow`}>
                <div className="relative h-36 overflow-hidden">
                  <img src={goal.image} alt={goal.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                  {goal.aiGenerated && (
                    <span className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/80 text-cyan-400 text-[10px] font-bold">
                      <Sparkles className="w-3 h-3" />
                      AI
                    </span>
                  )}
                  <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/80 text-amber-400 text-xs font-bold">
                    <Zap className="w-3 h-3" />
                    {goal.xpCost} XP
                  </span>
                  {userRole === 'parent' && (
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="absolute bottom-2 right-2 p-1.5 rounded-md bg-slate-900/80 text-rose-400 hover:bg-rose-500/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <h4 className="absolute bottom-2 left-3 text-base font-black text-white drop-shadow-lg">{goal.title}</h4>
                </div>
                <div className="p-3">
                  <div className="h-2.5 rounded-full bg-slate-700 overflow-hidden mb-2">
                    <div className={`h-full rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-500`} style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${subText}`}>
                      {activeChild.xp}/{goal.xpCost} XP
                    </span>
                    {canAfford ? (
                      <button
                        onClick={() => handleClaimReward(goal.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                      >
                        <Trophy className="w-3.5 h-3.5" />
                        {t.claimReward}
                      </button>
                    ) : (
                      <span className={`flex items-center gap-1 text-xs font-semibold ${subText}`}>
                        <Lock className="w-3.5 h-3.5" />
                        {goal.xpCost - activeChild.xp} XP
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
