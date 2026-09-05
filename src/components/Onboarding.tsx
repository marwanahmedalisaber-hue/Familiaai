import { useFamilia } from '@/context/FamiliaContext';
import { COUNTRY_CODES } from '@/data/countryCodes';
import { LANGUAGES } from '@/data/languages';
import {
  Sparkles, CreditCard, Phone, Shield, Loader2, Check, Bell, ChevronRight,
  Camera, Smartphone, Lock, ChevronDown, Search, MessageSquare, Globe,
  Moon, Sun, ScanLine, Wallet, Building2, Nfc, ArrowLeft, Upload,
} from 'lucide-react';
import type { FinancialTier } from '@/types';
import { useState, useEffect } from 'react';

type SubOption = { id: string; label: string };

const CARD_SUBS: SubOption[] = [
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'meeza', label: 'Meeza' },
];
const WALLET_SUBS: SubOption[] = [
  { id: 'vodafone', label: 'Vodafone Cash' },
  { id: 'orange', label: 'Orange Cash' },
  { id: 'etisalat', label: 'Etisalat Cash' },
  { id: 'we', label: 'WE Pay' },
];
const DIGITAL_SUBS: SubOption[] = [
  { id: 'apple', label: 'Apple Pay' },
  { id: 'google', label: 'Google Pay' },
  { id: 'paypal', label: 'PayPal' },
];

export default function Onboarding() {
  const {
    t, theme, appPhase, setAppPhase, parentPhone, setParentPhone,
    otpCode, setOtpCode, handleSendOtp, handleVerifyOtp,
    financialTier, handleSelectFinancial, aiCalculatingXp,
    notificationsEnabled, setNotificationsEnabled, protectionEnabled, setProtectionEnabled,
    setIsSubscribed, generatedOtp, isSubscribed,
    childLoginEmail, setChildLoginEmail, childLoginPassword, setChildLoginPassword,
    handleChildLogin, authLoading, handleConfirmSetup,
    lang, setLang, isRTL, isDark, toggleDarkMode,
  } = useFamilia();

  const [countryDial, setCountryDial] = useState('+20');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'sms' | 'whatsapp'>('sms');
  const [showLangs, setShowLangs] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [selectedSub, setSelectedSub] = useState<string>('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [receiptCameraUploaded, setReceiptCameraUploaded] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [showResendChoices, setShowResendChoices] = useState(false);

  const isLight = theme.isLight;

  // Style helpers
  const headingClass = isLight ? 'text-slate-900' : 'text-white';
  const subtextClass = isLight ? 'text-slate-600' : 'text-slate-400';
  const accentTextClass = isLight ? 'text-blue-600' : 'text-cyan-400';
  const cardBgClass = isLight ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700';
  const cardBgSubtleClass = isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700/60';
  const inputClass = isLight
    ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500'
    : 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-600';
  const unselectedBtnClass = isLight
    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700';
  const dropdownBgClass = isLight ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700';
  const langItemHoverClass = isLight ? 'hover:bg-slate-100' : 'hover:bg-slate-700';
  const langItemActiveClass = isLight ? 'bg-blue-50 text-blue-700' : 'bg-slate-700 text-white';
  const langItemInactiveClass = isLight ? 'text-slate-700' : 'text-slate-300';
  const topBarBtnClass = isLight
    ? 'bg-white/80 border-slate-200 text-slate-600 hover:border-slate-300'
    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600';

  // Countdown timer
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleResendClick = () => {
    if (resendCountdown > 0) return;
    setShowResendChoices(true);
  };

  const doResend = (method: 'sms' | 'whatsapp') => {
    setDeliveryMethod(method);
    handleSendOtp(method, countryDial);
    setResendCountdown(60);
    setShowResendChoices(false);
  };

  const filteredCountries = COUNTRY_CODES.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) || c.dial.includes(countrySearch)
  );
  const filteredLangs = LANGUAGES.filter((l) =>
    l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
    l.native.toLowerCase().includes(langSearch.toLowerCase())
  );

  const paymentCategories = [
    { id: 'card', icon: <CreditCard className="w-5 h-5" />, label: t.paymentCard, desc: t.paymentCardDesc, subs: CARD_SUBS },
    { id: 'wallet', icon: <Wallet className="w-5 h-5" />, label: t.paymentMobileWallet, desc: t.paymentMobileWalletDesc, subs: WALLET_SUBS },
    { id: 'instapay', icon: <Nfc className="w-5 h-5" />, label: t.paymentInstaPay, desc: t.paymentInstaPayDesc, subs: [] },
    { id: 'fawry', icon: <Building2 className="w-5 h-5" />, label: t.paymentFawry, desc: t.paymentFawryDesc, subs: [] },
    { id: 'digital', icon: <Smartphone className="w-5 h-5" />, label: t.paymentDigitalWallet, desc: t.paymentDigitalWalletDesc, subs: DIGITAL_SUBS },
  ];

  const handleConfirmPayment = () => {
    const cat = paymentCategories.find((c) => c.id === selectedPayment);
    if (cat && cat.subs.length > 0 && !selectedSub) return;
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setAppPhase('otp');
    }, 1800);
  };

  const financialLabels: Record<FinancialTier, string> = {
    very_low: t.financialVeryLow, low: t.financialLow, average: t.financialAverage,
    good: t.financialGood, very_good: t.financialVeryGood,
  };

  // --- Landing screen ---
  if (appPhase === 'onboarding') {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-4`}>
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
          <button onClick={toggleDarkMode} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${topBarBtnClass}`}>
            {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>
          <div className="relative">
            <button onClick={() => setShowLangs(!showLangs)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${topBarBtnClass}`}>
              <Globe className="w-3.5 h-3.5" />
              {LANGUAGES.find((l) => l.code === lang)?.flag}
              <span className="hidden sm:inline">{LANGUAGES.find((l) => l.code === lang)?.native}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {showLangs && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowLangs(false)} />
                <div className={`absolute z-50 mt-2 w-64 rounded-xl ${dropdownBgClass} border shadow-2xl p-1.5 ${isRTL ? 'left-0' : 'right-0'}`}>
                  <div className="relative mb-1.5">
                    <Search className={`absolute top-2.5 left-3 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                    <input type="text" value={langSearch} onChange={(e) => setLangSearch(e.target.value)} placeholder={t.searchLanguages} className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm border focus:outline-none ${inputClass}`} autoFocus />
                  </div>
                  <div className="max-h-56 overflow-y-auto">
                    {filteredLangs.map((l) => (
                      <button key={l.code} onClick={() => { setLang(l.code); setShowLangs(false); setLangSearch(''); }} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${langItemHoverClass} ${lang === l.code ? langItemActiveClass : langItemInactiveClass}`}>
                        <span className="text-lg">{l.flag}</span>
                        <span className="flex-1 text-start">{l.native}</span>
                        {lang === l.code && <Check className="w-4 h-4 text-emerald-500" />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-3">
            <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-white font-black text-4xl shadow-2xl`}>F</div>
            <h1 className={`text-3xl font-black tracking-wide ${headingClass}`}>Familia AI</h1>
            <p className={`text-sm ${subtextClass}`}>{t.onboardingSubtitle}</p>
          </div>
          <div className="space-y-3">
            <button onClick={() => { setIsSubscribed(false); setAppPhase('otp'); }} className={`w-full flex items-center justify-between gap-3 p-5 rounded-2xl bg-gradient-to-tr ${theme.gradient} text-white font-bold shadow-xl hover:scale-[1.02] transition-transform`}>
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                <div className="text-start"><div>{t.startTrial}</div><div className="text-xs opacity-80 font-normal">{t.trialDaysLeft}</div></div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button onClick={() => { setIsSubscribed(true); setAppPhase('payment'); }} className={`w-full flex items-center justify-between gap-3 p-5 rounded-2xl border font-bold transition-colors ${unselectedBtnClass}`}>
              <div className="flex items-center gap-3">
                <CreditCard className={`w-6 h-6 ${isLight ? 'text-amber-500' : 'text-amber-400'}`} />
                <div className="text-start"><div>{t.startSubscription}</div><div className={`text-xs font-normal ${subtextClass}`}>$1/month</div></div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Payment screen with sub-options ---
  if (appPhase === 'payment') {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-4`}>
        <div className="max-w-md w-full space-y-5">
          <button onClick={() => setAppPhase('onboarding')} className={`flex items-center gap-1 text-sm transition-colors ${subtextClass} hover:opacity-70`}>
            <ArrowLeft className="w-4 h-4" />{t.cancelBtn}
          </button>
          <div className="text-center space-y-2">
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center shadow-xl`}>
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-2xl font-black ${headingClass}`}>{t.paymentTitle}</h2>
            <p className={`text-sm ${subtextClass}`}>{t.paymentDesc}</p>
          </div>

          <div className="space-y-2">
            {paymentCategories.map((cat) => (
              <div key={cat.id}>
                <button
                  onClick={() => { setSelectedPayment(cat.id); setSelectedSub(''); }}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all ${selectedPayment === cat.id ? `bg-gradient-to-tr ${theme.gradient} text-white border-transparent` : unselectedBtnClass}`}
                >
                  <div className="flex-shrink-0">{cat.icon}</div>
                  <div className="flex-1 text-start">
                    <div className="font-bold text-sm">{cat.label}</div>
                    <div className={`text-xs ${selectedPayment === cat.id ? 'opacity-80' : subtextClass}`}>{cat.desc}</div>
                  </div>
                  {selectedPayment === cat.id && <Check className="w-5 h-5" />}
                </button>

                {/* Sub-options */}
                {selectedPayment === cat.id && cat.subs.length > 0 && (
                  <div className={`mt-2 p-3 rounded-2xl border space-y-2 ${cardBgSubtleClass}`}>
                    <p className={`text-xs font-semibold ${subtextClass}`}>{t.selectSubOption}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.subs.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setSelectedSub(sub.id)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${selectedSub === sub.id ? `bg-gradient-to-tr ${theme.gradient} text-white border-transparent` : unselectedBtnClass}`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                    {/* Card form */}
                    {cat.id === 'card' && selectedSub && (
                      <div className="space-y-2 pt-2">
                        <button className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed text-sm font-semibold transition-colors ${isLight ? 'bg-slate-100 border-slate-300 text-blue-600 hover:bg-slate-200' : 'bg-slate-700/50 border-slate-600 text-cyan-400 hover:bg-slate-700'}`}>
                          <ScanLine className="w-4 h-4" />{t.scanCard}
                        </button>
                        <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19))} placeholder={t.cardNumber} className={`w-full px-4 py-3 rounded-xl border text-sm tracking-wider ${inputClass}`} />
                        <div className="flex gap-2">
                          <input type="text" value={cardExpiry} onChange={(e) => { const v = e.target.value.replace(/\D/g, ''); setCardExpiry(v.length >= 2 ? v.slice(0, 2) + '/' + v.slice(2, 4) : v); }} placeholder={t.cardExpiry} maxLength={5} className={`flex-1 px-4 py-3 rounded-xl border text-sm text-center ${inputClass}`} />
                          <input type="text" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} placeholder={t.cardCvv} maxLength={3} className={`w-20 px-4 py-3 rounded-xl border text-sm text-center ${inputClass}`} />
                        </div>
                        <input type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} placeholder={t.cardHolder} className={`w-full px-4 py-3 rounded-xl border text-sm ${inputClass}`} />
                      </div>
                    )}
                  </div>
                )}

                {/* Fawry receipt upload */}
                {selectedPayment === 'fawry' && cat.id === 'fawry' && (
                  <div className={`mt-2 p-4 rounded-2xl border space-y-3 ${cardBgSubtleClass}`}>
                    <p className={`text-xs ${subtextClass}`}>{t.fawryRefDesc}</p>
                    <label className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed text-sm font-semibold cursor-pointer transition-colors ${isLight ? 'bg-slate-100 border-slate-300 text-blue-600 hover:bg-slate-200' : 'bg-slate-700/50 border-slate-600 text-cyan-400 hover:bg-slate-700'}`}>
                      <Upload className="w-4 h-4" />
                      {receiptUploaded ? t.receiptUploaded : t.uploadReceipt}
                      <input type="file" accept="image/*" className="hidden" onChange={() => setReceiptUploaded(true)} />
                    </label>
                    <label className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed text-sm font-semibold cursor-pointer transition-colors ${isLight ? 'bg-slate-100 border-slate-300 text-blue-600 hover:bg-slate-200' : 'bg-slate-700/50 border-slate-600 text-cyan-400 hover:bg-slate-700'}`}>
                      <Camera className="w-4 h-4" />
                      {receiptCameraUploaded ? t.receiptUploaded : t.captureReceipt}
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={() => setReceiptCameraUploaded(true)} />
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={handleConfirmPayment} disabled={!selectedPayment || paymentProcessing || (!!paymentCategories.find((c) => c.id === selectedPayment)?.subs.length && !selectedSub)} className={`w-full py-3.5 rounded-2xl bg-gradient-to-tr ${theme.gradient} text-white font-bold disabled:opacity-50 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2`}>
            {paymentProcessing ? (<><Loader2 className="w-5 h-5 animate-spin" />{t.paymentProcessing}</>) : t.confirmPayment}
          </button>
        </div>
      </div>
    );
  }

  // --- OTP screen ---
  if (appPhase === 'otp') {
    const showOtpInput = otpCode.length > 0 || generatedOtp;
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-4`}>
        <div className="max-w-md w-full space-y-6">
          <button onClick={() => { setOtpCode(''); setParentPhone(''); setAppPhase(isSubscribed ? 'payment' : 'onboarding'); }} className={`flex items-center gap-1 text-sm transition-colors ${subtextClass} hover:opacity-70`}>
            <ArrowLeft className="w-4 h-4" />{t.cancelBtn}
          </button>
          <div className="text-center space-y-3">
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center shadow-xl`}>
              {showOtpInput ? <Shield className="w-8 h-8 text-white" /> : <Phone className="w-8 h-8 text-white" />}
            </div>
            <h2 className={`text-2xl font-black ${headingClass}`}>{showOtpInput ? t.enterOtp : t.enterPhone}</h2>
            <p className={`text-sm ${subtextClass}`}>{showOtpInput ? t.enterOtpDesc : t.enterPhoneDesc}</p>
            {showOtpInput && parentPhone && <p className={`text-xs font-semibold ${accentTextClass}`}>{countryDial}{parentPhone}</p>}
          </div>

          {!showOtpInput ? (
            <>
              <div className="flex gap-2">
                <div className="relative flex-shrink-0">
                  <button onClick={() => setShowCountryPicker(!showCountryPicker)} className={`flex items-center gap-1.5 px-3 py-3.5 rounded-2xl border font-semibold whitespace-nowrap transition-colors ${cardBgClass} hover:opacity-80`}>
                    <span className="text-lg">{COUNTRY_CODES.find((c) => c.dial === countryDial)?.flag || '🌐'}</span>
                    <span className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{countryDial}</span>
                    <ChevronDown className={`w-4 h-4 ${isLight ? 'text-slate-600' : 'text-slate-300'}`} />
                  </button>
                  {showCountryPicker && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowCountryPicker(false)} />
                      <div className={`absolute z-50 mt-2 w-64 rounded-2xl ${dropdownBgClass} border shadow-2xl p-1.5`}>
                        <div className="relative mb-1.5">
                          <Search className={`absolute top-2.5 left-3 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                          <input type="text" value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)} placeholder={t.searchLanguages} className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm border focus:outline-none ${inputClass}`} autoFocus />
                        </div>
                        <div className="max-h-56 overflow-y-auto">
                          {filteredCountries.map((c) => (
                            <button key={c.code} onClick={() => { setCountryDial(c.dial); setShowCountryPicker(false); setCountrySearch(''); }} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${langItemHoverClass} ${countryDial === c.dial ? langItemActiveClass : langItemInactiveClass}`}>
                              <span className="text-lg">{c.flag}</span>
                              <span className="flex-1 text-start font-semibold">{c.name}</span>
                              <span className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-slate-300'}`}>{c.dial}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <input type="tel" value={parentPhone} onChange={(e) => setParentPhone(e.target.value.replace(/\D/g, ''))} placeholder="10 1234 5678" className={`flex-1 px-4 py-3.5 rounded-2xl border text-lg text-center tracking-wider ${inputClass}`} />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setDeliveryMethod('sms')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border text-sm font-bold transition-all ${deliveryMethod === 'sms' ? (isLight ? 'bg-blue-50 border-blue-400 text-blue-600' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400') : unselectedBtnClass}`}>
                  <MessageSquare className="w-4 h-4" />{t.deliverySms}
                </button>
                <button onClick={() => setDeliveryMethod('whatsapp')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border text-sm font-bold transition-all ${deliveryMethod === 'whatsapp' ? (isLight ? 'bg-emerald-50 border-emerald-400 text-emerald-600' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400') : unselectedBtnClass}`}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  {t.deliveryWhatsapp}
                </button>
              </div>
              <button onClick={() => { handleSendOtp(deliveryMethod, countryDial); setResendCountdown(60); }} disabled={!parentPhone.trim()} className={`w-full py-3.5 rounded-2xl bg-gradient-to-tr ${theme.gradient} text-white font-bold disabled:opacity-50 hover:scale-[1.02] transition-transform`}>
                {t.sendOtp}
              </button>
            </>
          ) : (
            <>
              <input type="text" maxLength={6} value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))} placeholder="000000" className={`w-full px-4 py-3.5 rounded-2xl border text-2xl text-center tracking-[0.5em] ${inputClass} ${isLight ? 'placeholder:text-slate-300' : 'placeholder:text-slate-600'}`} />
              <button onClick={handleVerifyOtp} disabled={otpCode.length < 6} className={`w-full py-3.5 rounded-2xl bg-gradient-to-tr ${theme.gradient} text-white font-bold disabled:opacity-50 hover:scale-[1.02] transition-transform`}>
                {t.verifyOtp}
              </button>
              {showResendChoices ? (
                <div className="space-y-2">
                  <button onClick={() => doResend('sms')} className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl border text-sm font-bold transition-all ${isLight ? 'bg-blue-50 border-blue-400 text-blue-600' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'}`}>
                    <MessageSquare className="w-4 h-4" />{t.resendViaSms}
                  </button>
                  <button onClick={() => doResend('whatsapp')} className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl border text-sm font-bold transition-all ${isLight ? 'bg-emerald-50 border-emerald-400 text-emerald-600' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'}`}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    {t.resendViaWhatsapp}
                  </button>
                </div>
              ) : (
                <button onClick={handleResendClick} disabled={resendCountdown > 0} className={`w-full text-center text-sm transition-colors ${resendCountdown > 0 ? 'opacity-50 cursor-not-allowed' : ''} ${subtextClass} hover:opacity-70`}>
                  {resendCountdown > 0 ? `${t.resendOtp} (${resendCountdown}s)` : t.resendOtp}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // --- Permissions screen ---
  if (appPhase === 'permissions') {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-4`}>
        <div className="max-w-md w-full space-y-6">
          <button onClick={() => setAppPhase('otp')} className={`flex items-center gap-1 text-sm transition-colors ${subtextClass} hover:opacity-70`}>
            <ArrowLeft className="w-4 h-4" />{t.cancelBtn}
          </button>
          <div className="text-center space-y-3">
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center shadow-xl`}>
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-2xl font-black ${headingClass}`}>{t.systemPermissionsTitle}</h2>
            <p className={`text-sm ${subtextClass}`}>{t.systemPermissionsDesc}</p>
          </div>
          <div className="space-y-3">
            <PermissionCard icon={<Bell className={`w-5 h-5 ${isLight ? 'text-blue-500' : 'text-cyan-400'}`} />} title={t.notificationsPermission} desc={t.notificationsPermissionDesc} enabled={notificationsEnabled} onToggle={() => setNotificationsEnabled(!notificationsEnabled)} t={t} isLight={isLight} />
            <PermissionCard icon={<Camera className={`w-5 h-5 ${isLight ? 'text-amber-500' : 'text-amber-400'}`} />} title={t.cameraPermission} desc={t.cameraPermissionDesc} enabled={protectionEnabled} onToggle={() => setProtectionEnabled(!protectionEnabled)} t={t} isLight={isLight} />
          </div>
          <button onClick={() => setAppPhase('financial')} className={`w-full py-3.5 rounded-2xl bg-gradient-to-tr ${theme.gradient} text-white font-bold hover:scale-[1.02] transition-transform`}>
            {t.confirmBtn}
          </button>
        </div>
      </div>
    );
  }

  // --- Financial screen ---
  if (appPhase === 'financial') {
    const tiers: { key: FinancialTier; label: string }[] = [
      { key: 'very_low', label: t.financialVeryLow }, { key: 'low', label: t.financialLow },
      { key: 'average', label: t.financialAverage }, { key: 'good', label: t.financialGood },
      { key: 'very_good', label: t.financialVeryGood },
    ];
    if (aiCalculatingXp) {
      return (
        <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-4`}>
          <div className="text-center space-y-4">
            <Loader2 className={`w-12 h-12 mx-auto animate-spin ${accentTextClass}`} />
            <p className={`text-lg font-bold ${headingClass}`}>{t.aiCalculatingXp}</p>
            <p className={`text-sm ${subtextClass}`}>{t.aiXpDesc}</p>
          </div>
        </div>
      );
    }
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-4`}>
        <div className="max-w-md w-full space-y-6">
          <button onClick={() => setAppPhase('permissions')} className={`flex items-center gap-1 text-sm transition-colors ${subtextClass} hover:opacity-70`}>
            <ArrowLeft className="w-4 h-4" />{t.cancelBtn}
          </button>
          <div className="text-center space-y-3">
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center shadow-xl`}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-2xl font-black ${headingClass}`}>{t.financialTitle}</h2>
            <p className={`text-sm ${subtextClass}`}>{t.financialDesc}</p>
          </div>
          <div className="space-y-2">
            {tiers.map((tier) => (
              <button key={tier.key} onClick={() => handleSelectFinancial(tier.key)} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all hover:scale-[1.02] ${financialTier === tier.key ? `bg-gradient-to-tr ${theme.gradient} text-white border-transparent` : unselectedBtnClass}`}>
                <span className="font-bold">{tier.label}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Summary confirmation screen ---
  if (appPhase === 'summary') {
    const paymentLabel = selectedPayment
      ? paymentCategories.find((c) => c.id === selectedPayment)?.label || ''
      : t.summaryPlanTrial;
    const subLabel = selectedSub
      ? [...CARD_SUBS, ...WALLET_SUBS, ...DIGITAL_SUBS].find((s) => s.id === selectedSub)?.label || ''
      : '';
    const permsList = [
      { label: t.notificationsPermission, enabled: notificationsEnabled },
      { label: t.cameraPermission, enabled: protectionEnabled },
    ];
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-4`}>
        <div className="max-w-md w-full space-y-5">
          <button onClick={() => setAppPhase('financial')} className={`flex items-center gap-1 text-sm transition-colors ${subtextClass} hover:opacity-70`}>
            <ArrowLeft className="w-4 h-4" />{t.cancelBtn}
          </button>
          <div className="text-center space-y-2">
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center shadow-xl`}>
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-2xl font-black ${headingClass}`}>{t.summaryTitle}</h2>
            <p className={`text-sm ${subtextClass}`}>{t.summaryDesc}</p>
          </div>
          <div className={`rounded-2xl border p-4 space-y-3 ${cardBgClass}`}>
            <SummaryRow label={t.summaryPlan} value={isSubscribed ? t.summaryPlanSubscribed : t.summaryPlanTrial} isLight={isLight} />
            {isSubscribed && <SummaryRow label={t.summaryPayment} value={subLabel ? `${paymentLabel} - ${subLabel}` : paymentLabel} isLight={isLight} />}
            <SummaryRow label={t.summaryPhone} value={`${countryDial}${parentPhone}`} isLight={isLight} />
            <div className="space-y-1.5">
              <p className={`text-xs font-semibold ${subtextClass}`}>{t.summaryPermissions}</p>
              {permsList.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className={`text-sm ${headingClass}`}>{p.label}</span>
                  <span className={`text-xs font-bold ${p.enabled ? (isLight ? 'text-emerald-600' : 'text-emerald-400') : subtextClass}`}>{p.enabled ? t.summaryEnabled : t.summaryDisabled}</span>
                </div>
              ))}
            </div>
            <SummaryRow label={t.summaryFinancial} value={financialTier ? financialLabels[financialTier] : '-'} isLight={isLight} />
          </div>
          <button onClick={handleConfirmSetup} disabled={authLoading} className={`w-full py-3.5 rounded-2xl bg-gradient-to-tr ${theme.gradient} text-white font-bold disabled:opacity-50 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2`}>
            {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.summaryConfirmBtn}
          </button>
        </div>
      </div>
    );
  }

  // --- Child login ---
  if (appPhase === 'child_login') {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-4`}>
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-3">
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center shadow-xl`}>
              {authLoading ? <Loader2 className="w-8 h-8 text-white animate-spin" /> : <Lock className="w-8 h-8 text-white" />}
            </div>
            <h2 className={`text-2xl font-black ${headingClass}`}>Familia AI</h2>
            <p className={`text-sm ${subtextClass}`}>{t.childLoginBtn}</p>
          </div>
          <div className="space-y-3">
            <input type="email" value={childLoginEmail} onChange={(e) => setChildLoginEmail(e.target.value)} placeholder="laith@familia.ai" className={`w-full px-4 py-3.5 rounded-2xl border text-lg text-center ${inputClass}`} />
            <input type="password" value={childLoginPassword} onChange={(e) => setChildLoginPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleChildLogin()} placeholder="••••••" className={`w-full px-4 py-3.5 rounded-2xl border text-lg text-center tracking-wider ${inputClass}`} />
            <button onClick={handleChildLogin} disabled={!childLoginEmail.trim() || !childLoginPassword.trim() || authLoading} className={`w-full py-3.5 rounded-2xl bg-gradient-to-tr ${theme.gradient} text-white font-bold disabled:opacity-50 hover:scale-[1.02] transition-transform`}>
              {authLoading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : t.verifyOtp}
            </button>
            <button onClick={() => setAppPhase('onboarding')} className={`w-full text-center text-sm transition-colors ${subtextClass} hover:opacity-70`}>{t.cancelBtn}</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function PermissionCard({ icon, title, desc, enabled, onToggle, t, isLight }: {
  icon: React.ReactNode; title: string; desc: string; enabled: boolean; onToggle: () => void; t: any; isLight: boolean;
}) {
  const cardClass = isLight ? 'bg-white border-slate-200' : 'bg-slate-800/60 border-slate-700/60';
  const titleClass = isLight ? 'text-slate-900' : 'text-white';
  return (
    <div className={`flex items-center gap-3 p-4 rounded-2xl border ${cardClass}`}>
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold ${titleClass}`}>{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
      </div>
      <button onClick={onToggle} className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${enabled ? (isLight ? 'bg-emerald-50 text-emerald-600 border border-emerald-300' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40') : (isLight ? 'bg-slate-200 text-slate-500' : 'bg-slate-700 text-slate-400')}`}>
        {enabled ? <Check className="w-4 h-4" /> : t.enableNotifications}
      </button>
    </div>
  );
}

function SummaryRow({ label, value, isLight }: { label: string; value: string; isLight: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{label}</span>
      <span className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{value}</span>
    </div>
  );
}
