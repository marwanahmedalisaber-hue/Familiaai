import { useFamilia } from '@/context/FamiliaContext';
import { Send, Loader2, Sparkles, GraduationCap } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function CoachTab() {
  const { t, chatMessages, chatInput, setChatInput, handleSendChatMessage, isAiLoading, theme, activeChild, isDark } = useFamilia();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isAiLoading]);

  const headingText = isDark ? 'text-white' : 'text-slate-900';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardBg = isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white/60 border-slate-200/80';
  const aiBubble = isDark ? 'bg-slate-700/80 text-slate-200' : 'bg-slate-100 text-slate-700';
  const inputBg = isDark ? 'bg-slate-900/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center shadow-lg`}>
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className={`text-lg font-black ${headingText}`}>{t.coachTitle}</h3>
          <p className={`text-xs ${subText}`}>{activeChild.name} | {t.level} {activeChild.level}</p>
        </div>
      </div>

      <div className={`rounded-2xl border ${cardBg} flex flex-col h-[420px]`}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'user' ? `bg-gradient-to-tr ${theme.gradient} text-white rounded-br-md` : `${aiBubble} rounded-bl-md`}`}>
                {msg.sender === 'ai' && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wide">Familia AI</span>
                  </div>
                )}
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isAiLoading && (
            <div className="flex justify-start">
              <div className={`${aiBubble} rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2`}>
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className={`text-xs ${subText}`}>{t.aiThinking}</span>
              </div>
            </div>
          )}
        </div>

        <div className={`p-3 border-t ${isDark ? 'border-slate-700/60' : 'border-slate-200/60'}`}>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
              placeholder={t.coachPlaceholder}
              className={`flex-1 px-4 py-2.5 rounded-xl border text-sm placeholder:text-slate-500 focus:outline-none transition-colors ${inputBg}`}
            />
            <button
              onClick={handleSendChatMessage}
              disabled={!chatInput.trim() || isAiLoading}
              className={`p-2.5 rounded-xl bg-gradient-to-tr ${theme.gradient} text-white disabled:opacity-40 hover:scale-105 transition-transform`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
