import React, { useState, useEffect } from 'react';
import { Newspaper, Moon, Sun, Search, Languages, Printer, Sliders } from 'lucide-react';
import { LayoutMode } from '../types';

function HeaderLogo() {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <svg id="logo-svg-fallback" className="w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 text-black select-none" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="94" stroke="black" strokeWidth="3" />
        <circle cx="100" cy="100" r="88" stroke="black" strokeWidth="1" strokeDasharray="3 3" />
        
        <rect x="55" y="45" width="6" height="15" fill="black" />
        <line x1="58" y1="35" x2="58" y2="65" stroke="black" strokeWidth="1.5" />
        
        <rect x="70" y="38" width="6" height="25" fill="black" />
        <line x1="73" y1="28" x2="73" y2="70" stroke="black" strokeWidth="1.5" />

        <rect x="85" y="48" width="6" height="12" fill="black" />
        <line x1="88" y1="40" x2="88" y2="65" stroke="black" strokeWidth="1.5" />

        <path d="M102 38 L107 33 L112 38 M107 34 L107 55" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <path d="M125 35 C145 35 155 50 155 58 C155 65 145 75 125 75" stroke="black" strokeWidth="1" strokeDasharray="2 2" fill="none" />
        <path d="M140 30 C155 45 155 60 140 78" stroke="black" strokeWidth="1" fill="none" />
        
        <text x="100" y="115" fontFamily="'Cairo', 'Inter', sans-serif" fontWeight="950" fontSize="32" textAnchor="middle" fill="black">الورّاق</text>
        <text x="100" y="132" fontFamily="monospace" fontSize="8" textAnchor="middle" fill="black" fontWeight="bold">alwarraqnews.com</text>

        <path d="M35 110 C35 150 70 170 100 170 C130 170 165 150 165 110" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        <path d="M43 125 C40 120 48 118 50 123 C52 128 46 130 43 125 Z" fill="black" />
        <path d="M54 140 C50 135 58 133 60 138 C62 143 56 145 54 140 Z" fill="black" />
        <path d="M68 152 C64 147 72 145 74 150 C76 155 70 157 68 152 Z" fill="black" />
        <path d="M84 161 C80 156 88 154 90 159 C92 164 86 166 84 161 Z" fill="black" />

        <path d="M157 125 C160 120 152 118 150 123 C148 128 154 130 157 125 Z" fill="black" />
        <path d="M146 140 C150 135 142 133 140 138 C138 143 144 145 146 140 Z" fill="black" />
        <path d="M132 152 C136 147 128 145 126 150 C124 155 130 157 132 152 Z" fill="black" />
        <path d="M116 161 C120 156 112 154 110 159 C108 164 114 166 116 161 Z" fill="black" />
      </svg>
    );
  }

  return (
    <img
      id="logo-image-render"
      src="/logo.png"
      alt="الورّاق Al-Warraq Logo"
      onError={() => setImgFailed(true)}
      referrerPolicy="no-referrer"
      decoding="async"
      className="w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 object-contain select-none pointer-events-none"
    />
  );
}

interface HeaderProps {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenGenerator: () => void;
  currentUser: { email: string; username: string; role: 'reader' | 'admin' } | null;
  onAuthClick: () => void;
  onLogOut: () => void;
  onAdminClick: () => void;
  siteDesign?: any;
}

export default function Header({
  language,
  setLanguage,
  layoutMode,
  setLayoutMode,
  searchQuery,
  setSearchQuery,
  onOpenGenerator,
  currentUser,
  onAuthClick,
  onLogOut,
  onAdminClick,
  siteDesign,
}: HeaderProps) {
  const [hijriDate, setHijriDate] = useState('');
  const [gregorianDate, setGregorianDate] = useState('');
  const [gitStatusLabel, setGitStatusLabel] = useState<'Live' | 'Syncing' | 'Out of Sync' | 'Loading'>('Loading');

  useEffect(() => {
    let active = true;
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/git-status');
        const data = await response.json();
        if (!active) return;
        if (response.ok && data.success) {
          if (data.isCurrentlyDeploying) {
            setGitStatusLabel('Syncing');
          } else {
            const statusStr = data.status || '';
            const isClean = statusStr.includes('nothing to commit, working tree clean') || 
                            statusStr.includes('working directory clean') ||
                            statusStr.includes('working tree clean');
            const isAhead = statusStr.includes('Your branch is ahead');
            const hasModifications = statusStr.includes('Changes not staged for commit') || 
                                     statusStr.includes('Changes to be committed') || 
                                     statusStr.includes('Untracked files:');
            
            if (isAhead || hasModifications || !isClean) {
              setGitStatusLabel('Out of Sync');
            } else {
              setGitStatusLabel('Live');
            }
          }
        } else {
          setGitStatusLabel('Out of Sync');
        }
      } catch (err) {
        if (active) setGitStatusLabel('Out of Sync');
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Current date is 2026-06-16 (Tuesday)
    const date = new Date('2026-06-16');
    
    // Arabic Date Formats
    const daysAr = ['الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد', 'الاثنين'];
    const monthsAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    
    // Gregorian: الثلاثاء 16 يونيو 2026 م
    const arDateText = `${daysAr[0]} - 16 ${monthsAr[5]} 2026 م`;
    // Hijri estimate for June 16, 2026
    const hijriDateText = `30 ذو القعدة 1447 هـ`;
    
    // English Date Formats
    const optionsEn: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const enDateText = date.toLocaleDateString('en-US', optionsEn);
    const hijriEnText = '30 Dhul-Qi\'dah 1447 AH';

    if (language === 'ar') {
      setGregorianDate(arDateText);
      setHijriDate(hijriDateText);
    } else {
      setGregorianDate(enDateText);
      setHijriDate(hijriEnText);
    }
  }, [language]);

  const isAr = language === 'ar';

  return (
    <header className="border-b border-black bg-white shadow-none select-none font-sans">
      {/* Top Utility Bar */}
      <div className="bg-black text-white py-1.5 px-4 text-[11px] font-bold border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Dates */}
          <div className="flex items-center gap-3" dir={isAr ? 'rtl' : 'ltr'}>
            <span className="font-extrabold text-neutral-300">{hijriDate}</span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-300">{gregorianDate}</span>
          </div>

          {/* Quick Actions (Theme, Generator, English/Arabic Translate) */}
          <div className="flex items-center gap-4">
            {/* Dynamic AI Generator button */}
            <button
              onClick={onOpenGenerator}
              id="btn-open-generator"
              className="flex items-center gap-1 bg-zinc-900 hover:bg-neutral-800 text-white border border-zinc-700 px-2.5 py-1 rounded-sm text-[10px] font-bold cursor-pointer transition-colors"
            >
              <Sliders size={11} className="text-white" />
              <span>{isAr ? 'رئيس التحرير المتكامل (AI)' : 'AI Editor Room'}</span>
            </button>

            {/* Print/Digital Layout Mode Toggle */}
            <div className="flex bg-zinc-900 border border-zinc-800 p-0.5 rounded-sm">
              <button
                onClick={() => setLayoutMode('digital')}
                id="btn-layout-digital"
                className={`px-2 py-0.5 rounded-xs text-[9px] transition-all cursor-pointer font-extrabold ${
                  layoutMode === 'digital'
                    ? 'bg-white text-black shadow-none'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title={isAr ? 'عرض لوحة رقمية حديثة' : 'Switch to Modern Digital layout'}
              >
                {isAr ? 'رقمي' : 'Digital'}
              </button>
              <button
                onClick={() => setLayoutMode('classic-print')}
                id="btn-layout-print"
                className={`px-2 py-0.5 rounded-xs text-[9px] transition-all cursor-pointer font-extrabold ${
                  layoutMode === 'classic-print'
                    ? 'bg-white text-black shadow-none'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title={isAr ? 'نمط الوردي الكلاسيكي' : 'Switch to Classic Paper Print'}
              >
                <span className="flex items-center gap-1">
                  <Printer size={9} />
                  {isAr ? 'مطبوع' : 'Print'}
                </span>
              </button>
            </div>

            {/* Lang Toggle */}
            <button
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              id="btn-set-lang"
              className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer font-bold py-0.5 text-zinc-300"
            >
              <Languages size={13} className="text-zinc-300" />
              <span>{isAr ? 'English' : 'عربي'}</span>
            </button>

            <span className="text-zinc-700">|</span>

            {/* Deployment Status Indicator */}
            <div className="flex items-center gap-1.5 mr-1 ml-1" title={isAr ? 'حالة التزامن مع مستودع جيت هاب' : 'Synchronization status with GitHub repository'}>
              <span className={`w-2 h-2 rounded-full shrink-0 ${
                gitStatusLabel === 'Live' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]' :
                gitStatusLabel === 'Syncing' ? 'bg-amber-500 animate-pulse' :
                gitStatusLabel === 'Out of Sync' ? 'bg-[#b91c1c] shadow-[0_0_8px_rgba(185,28,28,0.7)] animate-pulse' : 'bg-zinc-500'
              }`}></span>
              <span className="text-[10px] uppercase font-mono font-black text-zinc-300 select-none">
                <span className="hidden sm:inline text-zinc-500 font-bold">{isAr ? 'النشر:' : 'Deploy:'} </span>
                <span className={
                  gitStatusLabel === 'Live' ? 'text-emerald-400' :
                  gitStatusLabel === 'Syncing' ? 'text-amber-400 font-bold' :
                  gitStatusLabel === 'Out of Sync' ? 'text-red-400 font-bold' : 'text-zinc-400'
                }>
                  {gitStatusLabel === 'Live' ? (isAr ? 'مباشر' : 'Live') :
                   gitStatusLabel === 'Syncing' ? (isAr ? 'جاري المزامنة...' : 'Syncing') :
                   gitStatusLabel === 'Out of Sync' ? (isAr ? 'غير متزامن' : 'Out of Sync') : 
                   (isAr ? 'جاري الفحص...' : 'Checking...')}
                </span>
              </span>
            </div>

            <span className="text-zinc-700">|</span>

            {/* Auth Session Section */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-zinc-305 font-bold">
                  {isAr ? `أهلاً، ${currentUser.username}` : `Hello, ${currentUser.username}`}
                </span>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={onAdminClick}
                    className="bg-[#b91c1c] hover:bg-red-850 text-white font-mono px-2.5 py-0.5 text-[9px] uppercase font-black cursor-pointer transition-all border border-black rounded-sm"
                  >
                    {isAr ? 'لوحة تحكم معن' : 'Admin'}
                  </button>
                )}
                <button
                  onClick={onLogOut}
                  className="text-zinc-400 hover:text-white underline cursor-pointer text-[10px] font-bold"
                >
                  {isAr ? '[الخروج]' : '[Sign Out]'}
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="hover:text-zinc-300 cursor-pointer font-extrabold text-zinc-300 bg-zinc-950 px-2.5 py-1 border border-zinc-700 rounded-sm text-[10px]"
              >
                {isAr ? 'تسجيل الدخول / عضوية جديدة' : 'Sign In / Sign Up'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Branding Header Row */}
      <div className="py-6 px-4 bg-white border-b border-zinc-200" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Left/Right space or search depending on RTL */}
          <div className="w-full md:w-64 relative">
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
              <Search size={15} />
            </span>
            <input
              type="text"
              id="search-news"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث في أرشيف الصحيفة...' : 'Search newspaper archives...'}
              className="w-full pl-4 pr-10 py-1.5 border border-black rounded-sm text-xs outline-none bg-[#fafafa] font-bold focus:bg-white transition-all font-sans"
            />
          </div>

          {/* Core Cairo Typography Logo - Al-Warraq (with Logo to its right) */}
          <div className="text-center flex flex-col items-center select-none cursor-pointer">
            <div className="flex items-center justify-center gap-3 md:gap-4" dir="ltr">
              <h1 className="font-sans font-black tracking-tight">
                <span className="text-4xl md:text-5xl lg:text-5.5xl xl:text-[4.5rem] text-black font-black tracking-tighter leading-none select-none uppercase">
                  {isAr ? (siteDesign?.titleAr || 'الورّاق') : (siteDesign?.titleEn || 'Al-Warraq')}
                </span>
              </h1>
              <div className="shrink-0">
                <HeaderLogo />
              </div>
            </div>
            <span className="text-[10px] md:text-xs tracking-widest text-zinc-500 font-bold max-w-lg leading-relaxed mt-2 text-center" dir={isAr ? 'rtl' : 'ltr'}>
              {isAr ? (siteDesign?.sloganAr || 'صحيفة سياسية مالية شاملة تأسست في بيروت بموجب  امتياز 8/2026 المجلس الوطني للاعلام') : (siteDesign?.sloganEn || 'The Sovereign Archives of Political Economy, Intelligence, and Monetary Assets')}
            </span>
          </div>

          {/* Static Branding block representing Al-Warraq heritage */}
          <div className="hidden md:flex flex-col items-end text-xxs text-zinc-500 font-sans tracking-normal font-bold">
            <span className="font-black uppercase text-black border-b border-black pb-0.5 mb-1">
              {isAr ? (siteDesign?.subHeaderAr || 'ديوان تدوين الحقائق والبيانات المالية') : (siteDesign?.subHeaderEn || 'Al-Warraq Guild')}
            </span>
            <span>{isAr ? 'بيروت • بغداد • الرياض • القاهرة' : 'Beirut • Baghdad • Riyadh • Cairo'}</span>
            <span>{isAr ? 'مطبوع بأحبار الكربون النقية' : 'Pure Carbon Editorial Desk'}</span>
          </div>

        </div>
      </div>

      {/* Strict Monochrome double-boarder divider strip */}
      <div className="h-1.5 bg-black w-full border-t border-b border-white"></div>
    </header>
  );
}
