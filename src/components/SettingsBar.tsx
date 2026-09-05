import { useFamilia } from '@/context/FamiliaContext';
import { LANGUAGES } from '@/data/languages';
import { THEMES } from '@/data/themes';
import { Globe, Palette, Check, Search, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export default function SettingsBar() {
  const { lang, setLang, theme, setTheme, t, isRTL, isDark, toggleDarkMode } = useFamilia();
  const [showLangs, setShowLangs] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [langSearch, setLangSearch] = useState('');

  const btnClass = isDark
    ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
    : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-slate-300';

  const dropdownClass = isDark
    ? 'bg-slate-800 border-slate-700'
    : 'bg-white border-slate-200';

  const filteredLangs = LANGUAGES.filter((l) =>
    l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
    l.native.toLowerCase().includes(langSearch.toLowerCase())
  );

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Dark/Light toggle */}
      <button
        onClick={toggleDarkMode}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${btnClass}`}
      >
        {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      </button>

      {/* Language picker with search */}
      <div className="relative">
        <button
          onClick={() => { setShowLangs(!showLangs); setShowThemes(false); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${btnClass}`}
        >
          <Globe className="w-3.5 h-3.5" />
          {LANGUAGES.find((l) => l.code === lang)?.flag}
          <span className="hidden sm:inline">{LANGUAGES.find((l) => l.code === lang)?.native}</span>
        </button>
        {showLangs && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowLangs(false)} />
            <div className={`absolute z-50 mt-2 w-64 rounded-xl ${dropdownClass} border shadow-2xl p-1.5 ${isRTL ? 'left-0' : 'right-0'}`}>
              <div className="relative mb-1.5">
                <Search className="absolute top-2.5 left-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={langSearch}
                  onChange={(e) => setLangSearch(e.target.value)}
                  placeholder={t.searchLanguages}
                  className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm border focus:outline-none ${isDark ? 'bg-slate-900 border-slate-600 text-white placeholder:text-slate-500' : 'bg-slate-50 border-slate-300 text-slate-700 placeholder:text-slate-400'}`}
                  autoFocus
                />
              </div>
              <div className="max-h-56 overflow-y-auto">
                {filteredLangs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setShowLangs(false); setLangSearch(''); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} ${lang === l.code ? (isDark ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-900') : isDark ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    <span className="text-lg">{l.flag}</span>
                    <span className="flex-1 text-start">{l.native}</span>
                    {lang === l.code && <Check className="w-4 h-4 text-emerald-500" />}
                  </button>
                ))}
                {filteredLangs.length === 0 && (
                  <p className="text-center text-xs text-slate-500 py-3">{t.searchLanguages}</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Theme picker */}
      <div className="relative">
        <button
          onClick={() => { setShowThemes(!showThemes); setShowLangs(false); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${btnClass}`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span className={`w-3 h-3 rounded-full bg-gradient-to-tr ${theme.gradient}`} />
        </button>
        {showThemes && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowThemes(false)} />
            <div className={`absolute z-50 mt-2 w-56 max-h-72 overflow-y-auto rounded-xl ${dropdownClass} border shadow-2xl p-1.5 ${isRTL ? 'left-0' : 'right-0'}`}>
              <p className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wide">{t.themePickerTitle}</p>
              <div className="grid grid-cols-2 gap-1.5">
                {THEMES.map((th) => (
                  <button
                    key={th.id}
                    onClick={() => { setTheme(th); setShowThemes(false); }}
                    className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} ${theme.id === th.id ? (isDark ? 'bg-slate-700 ring-1 ring-white/20' : 'bg-slate-100 ring-1 ring-slate-300') : ''}`}
                  >
                    <span className={`w-4 h-4 rounded-full bg-gradient-to-tr ${th.gradient} flex-shrink-0`} />
                    <span className={isDark ? 'text-slate-300 truncate' : 'text-slate-600 truncate'}>{th.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
