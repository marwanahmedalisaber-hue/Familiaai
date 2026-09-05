import { useFamilia } from '@/context/FamiliaContext';
import { HelpCircle, Send, Check, Share2, Heart, ThumbsUp, MessageSquare, Sparkles } from 'lucide-react';

export default function SupportTab() {
  const { t, theme, feedbackText, setFeedbackText, feedbackSent, feedbackReply, handleSendFeedback, handleShareAchievement, isDark } = useFamilia();

  const headingText = isDark ? 'text-white' : 'text-slate-900';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardBg = isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white/60 border-slate-200/80';
  const inputBg = isDark ? 'bg-slate-900/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900';

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-cyan-400" />
        <h3 className={`text-lg font-black ${headingText}`}>{t.supportCornerTitle}</h3>
      </div>

      <div className={`rounded-2xl border ${cardBg} p-4`}>
        <label className={`text-sm font-bold ${headingText} mb-2 block`}>{t.sendFeedback}</label>
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder={t.feedbackPlaceholder}
          rows={4}
          className={`w-full px-4 py-3 rounded-xl border text-sm placeholder:text-slate-500 focus:outline-none transition-colors resize-none ${inputBg}`}
        />
        <button
          onClick={handleSendFeedback}
          disabled={!feedbackText.trim() || feedbackSent}
          className={`mt-3 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-tr ${theme.gradient} text-white disabled:opacity-50 hover:scale-105 transition-transform`}
        >
          {feedbackSent ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
          {feedbackSent ? t.feedbackSent : t.sendBtn}
        </button>

        {feedbackReply && (
          <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl ${isDark ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-cyan-50 border border-cyan-200'} animate-slideUp`}>
            <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className={`text-sm ${isDark ? 'text-cyan-200' : 'text-cyan-700'}`}>{feedbackReply}</p>
          </div>
        )}
      </div>

      <div className={`rounded-2xl border ${cardBg} p-4`}>
        <div className="flex items-center gap-2 mb-1">
          <Share2 className="w-5 h-5 text-emerald-400" />
          <h4 className={`text-sm font-bold ${headingText}`}>{t.shareAchievement}</h4>
        </div>
        <p className={`text-xs ${subText} mb-3`}>{t.shareSub}</p>
        <button
          onClick={handleShareAchievement}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          {t.whatsappShare}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <FeedbackCard icon={<ThumbsUp className="w-5 h-5 text-emerald-400" />} label="Helpful" isDark={isDark} cardBg={cardBg} />
        <FeedbackCard icon={<Heart className="w-5 h-5 text-rose-400" />} label="Love it" isDark={isDark} cardBg={cardBg} />
        <FeedbackCard icon={<MessageSquare className="w-5 h-5 text-cyan-400" />} label="Ideas" isDark={isDark} cardBg={cardBg} />
      </div>
    </div>
  );
}

function FeedbackCard({ icon, label, isDark, cardBg }: { icon: React.ReactNode; label: string; isDark: boolean; cardBg: string }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl border ${cardBg} hover:bg-slate-800 transition-colors cursor-pointer`}>
      {icon}
      <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</span>
    </div>
  );
}
