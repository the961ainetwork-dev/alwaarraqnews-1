import React, { useState, useMemo, useEffect } from 'react';
import { 
  Article, 
  IntelligenceDispatch 
} from '../types';
import { 
  getStoredDispatches 
} from '../data/intelligenceDispatches';
import AlWarraqLogo from './AlWarraqLogo';
import Breadcrumbs from './Breadcrumbs';
import { 
  Radio, 
  Share2, 
  Copy, 
  Check, 
  Printer, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Calendar, 
  Archive, 
  Search, 
  Flame, 
  BookOpen, 
  ShieldAlert, 
  ArrowLeft, 
  ArrowRight, 
  Mail, 
  Sliders, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  FileText,
  Clock,
  Send,
  Eye,
  Type
} from 'lucide-react';

interface IntelligenceDispatchPageProps {
  language: 'ar' | 'en';
  layoutMode: 'classic-print' | 'modern-white';
  articles: Article[];
  subscribers?: string[];
  setSubscribers?: React.Dispatch<React.SetStateAction<string[]>>;
  onSelectArticle?: (article: Article) => void;
  onNavigateHome?: () => void;
  onNavigateToComposer?: () => void;
}

export default function IntelligenceDispatchPage({
  language,
  layoutMode,
  articles,
  subscribers = [],
  setSubscribers,
  onSelectArticle,
  onNavigateHome,
  onNavigateToComposer
}: IntelligenceDispatchPageProps) {
  const isAr = language === 'ar';

  // Load dispatches from storage
  const [allDispatches, setAllDispatches] = useState<IntelligenceDispatch[]>(() => getStoredDispatches());

  // Selected issue
  const [selectedIssueId, setSelectedIssueId] = useState<string>(() => {
    const latest = allDispatches[0];
    return latest ? latest.id : 'dispatch-2026-09-14-144';
  });

  // Current active view
  const [activeTab, setActiveTab] = useState<'reader' | 'archive'>('reader');

  // Text sizing option for enhanced readability
  const [fontSizeScale, setFontSizeScale] = useState<'standard' | 'large'>('standard');

  // Active dispatch issue
  const currentDispatch = useMemo(() => {
    return allDispatches.find(d => d.id === selectedIssueId) || allDispatches[0];
  }, [allDispatches, selectedIssueId]);

  // Archive search term
  const [archiveSearch, setArchiveSearch] = useState('');

  // Audio briefing playback simulation state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Copy feedback state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Subscriber email state
  const [subEmail, setSubEmail] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  // Audio player timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1.5;
        });
      }, 300);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlayingAudio]);

  // Copy WhatsApp
  const handleCopyWhatsApp = () => {
    if (!currentDispatch) return;
    let text = `📰 *${isAr ? 'نشرة الورّاق الاستخباراتية اليومية' : 'Al-Warraq Daily Intelligence Dispatch'}*\n`;
    text += `📅 ${isAr ? currentDispatch.dateStrAr : currentDispatch.dateStr} | ${isAr ? `العدد #${currentDispatch.issueNumber}` : `Issue #${currentDispatch.issueNumber}`}\n`;
    text += `🔒 ${isAr ? currentDispatch.classificationAr : currentDispatch.classificationEn}\n\n`;
    text += `*${isAr ? currentDispatch.titleAr : currentDispatch.titleEn}*\n\n`;
    text += `📌 *${isAr ? 'الإيجاز التنفيذي:' : 'Executive Briefing:'}*\n${isAr ? currentDispatch.executiveBriefingAr : currentDispatch.executiveBriefingEn}\n\n`;
    text += `⚡ *${isAr ? 'المحددات الاستراتيجية الحاكمة:' : 'Key Strategic Takeaways:'}*\n`;
    currentDispatch.keyTakeaways.forEach((t, i) => {
      text += `${i + 1}. ${t}\n`;
    });
    text += `\n🌐 ${isAr ? 'طالع العدد كاملاً مع الوثائق عبر ديوان الورّاق:' : 'Read full edition & dossiers on Al-Warraq:'} https://alwarraqnews.com/?category=intelligence-dispatch\n`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey('whatsapp');
      setTimeout(() => setCopiedKey(null), 2500);
    });
  };

  // Copy Raw Dispatch
  const handleCopyRaw = () => {
    if (!currentDispatch) return;
    let text = `═══════════════════════════════════════════════════════════\n`;
    text += `      AL-WARRAQ DAILY INTELLIGENCE DISPATCH // نشرة الورّاق\n`;
    text += `═══════════════════════════════════════════════════════════\n`;
    text += `ISSUE: #${currentDispatch.issueNumber} | DATE: ${currentDispatch.dateStrAr}\n`;
    text += `CLASSIFICATION: ${currentDispatch.classificationAr}\n\n`;
    text += `TITLE: ${currentDispatch.titleAr}\n\n`;
    text += `EXECUTIVE BRIEFING:\n${currentDispatch.executiveBriefingAr}\n\n`;
    text += `KEY TAKEAWAYS:\n`;
    currentDispatch.keyTakeaways.forEach((t, i) => {
      text += `[${i + 1}] ${t}\n`;
    });
    text += `\nSECTIONS IN THIS ISSUE:\n`;
    currentDispatch.sections.forEach(s => {
      text += `• ${s.sectionTitleAr} (${s.articleIds.length} reports)\n`;
    });
    text += `═══════════════════════════════════════════════════════════\n`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey('raw');
      setTimeout(() => setCopiedKey(null), 2500);
    });
  };

  // Print Dispatch
  const handlePrint = () => {
    window.print();
  };

  // Subscribe submit
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes('@')) return;
    if (setSubscribers && !subscribers.includes(subEmail)) {
      setSubscribers(prev => [...prev, subEmail]);
    }
    setSubSuccess(true);
    setSubEmail('');
  };

  // Filtered dispatches for archive
  const filteredDispatches = useMemo(() => {
    if (!archiveSearch) return allDispatches;
    const q = archiveSearch.toLowerCase();
    return allDispatches.filter(d => 
      d.titleAr.toLowerCase().includes(q) ||
      d.titleEn.toLowerCase().includes(q) ||
      d.issueNumber.toString().includes(q) ||
      d.dateStrAr.toLowerCase().includes(q)
    );
  }, [allDispatches, archiveSearch]);

  if (!currentDispatch) {
    return (
      <div className="p-16 text-center text-zinc-500 font-mono">
        {isAr ? 'لا توجد نشرات استخباراتية منشورة حالياً.' : 'No intelligence dispatches available.'}
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-[#f7f6f2] text-black font-sans pb-24 text-right rtl:text-right ltr:text-left selection:bg-red-900 selection:text-white"
      id="intelligence-dispatch-page"
    >
      
      {/* 1. TOP NEWSLETTER CONTROL BAR */}
      <nav className="bg-zinc-950 text-white border-b-2 border-red-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Left: Dispatch Identity & Pulse */}
          <div className="flex items-center gap-2.5">
            <AlWarraqLogo size="sm" variant="dark" showText={false} />
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1">
                <Radio size={12} className="text-red-500 animate-pulse" />
                {isAr ? 'نشرة التحرير اليومية' : 'DAILY NEWSLETTER'}
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="font-mono text-[11px] font-bold text-amber-300">
                {isAr ? `العدد #${currentDispatch.issueNumber}` : `Issue #${currentDispatch.issueNumber}`}
              </span>
            </div>
          </div>

          {/* Center/Right: View Switcher & Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('reader')}
              className={`px-3 py-1 font-mono text-[11px] font-black uppercase rounded-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'reader'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <BookOpen size={12} />
              <span>{isAr ? 'قراءة النشرة' : 'Read Newsletter'}</span>
            </button>

            <button
              onClick={() => setActiveTab('archive')}
              className={`px-3 py-1 font-mono text-[11px] font-black uppercase rounded-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'archive'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Archive size={12} />
              <span>{isAr ? 'الأرشيف' : 'Archive'}</span>
              <span className="bg-zinc-800 text-zinc-400 px-1 py-0.2 text-[9px] rounded-xs">
                {allDispatches.length}
              </span>
            </button>

            {/* Font Scaler */}
            <button
              onClick={() => setFontSizeScale(fontSizeScale === 'standard' ? 'large' : 'standard')}
              className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-xs transition-colors cursor-pointer"
              title={isAr ? 'تكبير / تصغير حجم الخط' : 'Toggle text scale'}
            >
              <Type size={13} />
            </button>

            {onNavigateToComposer && (
              <button
                onClick={onNavigateToComposer}
                className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black font-mono text-[10px] font-black uppercase tracking-wider rounded-xs flex items-center gap-1 transition-colors cursor-pointer"
                title={isAr ? 'فتح استوديو التحرير ومؤلف النشرة' : 'Composer'}
              >
                <Sliders size={11} />
                <span className="hidden sm:inline">{isAr ? 'مؤلف النشرة' : 'Composer'}</span>
              </button>
            )}

            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="px-2.5 py-1 text-zinc-400 hover:text-white font-mono text-[11px] transition-colors cursor-pointer"
              >
                {isAr ? 'الرئيسية' : 'Home'}
              </button>
            )}
          </div>

        </div>
      </nav>

      {/* 2. MAIN READING CONTAINER */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 md:pt-10">

        {/* Top Breadcrumb Navigation */}
        <Breadcrumbs
          language={language}
          activeCategory="intelligence-dispatch"
          setActiveCategory={(catId) => {
            if (catId === 'all' && onNavigateHome) {
              onNavigateHome();
            } else {
              const url = new URL(window.location.href);
              if (catId === 'all') {
                url.searchParams.delete('category');
              } else {
                url.searchParams.set('category', catId);
              }
              window.history.pushState({}, '', url.toString());
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
          subSectionTitle={
            activeTab === 'archive' 
              ? (isAr ? 'أرشيف الأعداد السابقة' : 'Archive Editions') 
              : (isAr ? `العدد #${currentDispatch.issueNumber}` : `Issue #${currentDispatch.issueNumber}`)
          }
          className="mb-6"
        />

        {/* TAB A: CURRENT NEWSLETTER EDITION */}
        {activeTab === 'reader' && (
          <div className="space-y-6">

            {/* NEWSLETTER PAPER CANVAS */}
            <article className="bg-[#fefefc] border-2 border-zinc-900 p-6 sm:p-10 md:p-12 shadow-[0_4px_25px_rgba(0,0,0,0.06)] relative">
              
              {/* Top Watermark & Authentic Metadata Header */}
              <div className="flex flex-col items-center border-b-2 border-black pb-6 space-y-4">
                
                {/* Micro Dateline Strip */}
                <div className="w-full flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase border-b border-zinc-300 pb-2">
                  <span className="font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block animate-pulse"></span>
                    {isAr ? 'وثيقة تداول سيادي واقتصادي موثقة' : 'AUTHENTICATED SOVEREIGN CIRCULATION'}
                  </span>
                  <span className="text-zinc-400">ISSN 2958-824X</span>
                  <span>{isAr ? 'بيروت، لبنان' : 'BEIRUT, LEBANON'}</span>
                </div>

                {/* THE OFFICIAL AL-WARRAQ LOGO SEAL & MASTHEAD */}
                <div className="flex flex-col items-center text-center space-y-2 pt-2">
                  <div className="hover:scale-105 transition-transform duration-300">
                    <AlWarraqLogo size="lg" variant="black" showText={false} />
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-red-700 font-black uppercase block">
                      {isAr ? 'ديوان الرصد والاستخبارات الاقتصادية والجيوسياسية' : 'SOVEREIGN INTELLIGENCE & MACRO DESK'}
                    </span>
                    <h1 className="font-serif font-black text-2xl sm:text-4xl md:text-5xl text-black tracking-tight leading-none">
                      {isAr ? 'نشرة الورّاق الاستخباراتية' : 'Al-Warraq Intelligence Dispatch'}
                    </h1>
                    <span className="font-serif italic text-xs md:text-sm text-zinc-600 block pt-1">
                      {isAr 
                        ? 'البرقية اليومية الموثقة للمتعاملين، الدبلوماسيين، وصناع القرار في الشرق الأدنى والخليج'
                        : 'The daily morning intelligence brief for asset managers, diplomats, and policy executives'}
                    </span>
                  </div>
                </div>

                {/* Double Rule Dateline Strip */}
                <div className="w-full border-y-2 border-black py-2.5 flex flex-wrap justify-between items-center gap-2 font-mono text-xs text-black">
                  <div className="flex items-center gap-3">
                    <span className="font-black bg-black text-amber-300 px-2.5 py-0.5 text-[11px] uppercase tracking-wider">
                      {isAr ? `العدد: #${currentDispatch.issueNumber}` : `Issue #${currentDispatch.issueNumber}`}
                    </span>
                    <span className="font-bold text-zinc-800">
                      {isAr ? currentDispatch.dateStrAr : currentDispatch.dateStr}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-zinc-600 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-red-700" />
                      <span>{isAr ? `${currentDispatch.readTimeMinutes} دقائق قراءة` : `${currentDispatch.readTimeMinutes} min read`}</span>
                    </span>
                    <span>•</span>
                    <span className="bg-zinc-100 text-zinc-800 px-2 py-0.5 border border-zinc-300 font-bold">
                      {isAr ? currentDispatch.classificationAr : currentDispatch.classificationEn}
                    </span>
                  </div>
                </div>

              </div>

              {/* Newsletter Interactive Quick Toolbar */}
              <div className="my-5 p-3 bg-[#f5f4ef] border border-zinc-300 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                
                {/* Audio Briefing Player */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className={`px-3 py-1.5 font-bold uppercase flex items-center gap-1.5 border transition-all cursor-pointer ${
                      isPlayingAudio 
                        ? 'bg-red-700 text-white border-red-800 shadow-xs' 
                        : 'bg-white hover:bg-zinc-100 text-black border-zinc-400'
                    }`}
                  >
                    {isPlayingAudio ? <Pause size={12} /> : <Play size={12} />}
                    <span>{isPlayingAudio ? (isAr ? 'إيقاف الموجز الصوتي' : 'Pause Audio') : (isAr ? 'استمع للموجز الصوتي' : 'Listen Audio Brief')}</span>
                  </button>

                  {isPlayingAudio && (
                    <div className="flex items-center gap-2">
                      <div className="w-24 md:w-36 bg-zinc-300 h-1.5 border border-zinc-400 relative overflow-hidden">
                        <div className="bg-red-700 h-full transition-all duration-300" style={{ width: `${audioProgress}%` }}></div>
                      </div>
                      <span className="text-[10px] text-zinc-500">{Math.round(audioProgress)}%</span>
                    </div>
                  )}
                </div>

                {/* Sharing & Printing Utilities */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyWhatsApp}
                    className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1 border border-emerald-900 transition-colors cursor-pointer"
                    title={isAr ? 'مشاركة النص بتنسيق مهني عبر واتساب' : 'Share formatted text to WhatsApp'}
                  >
                    {copiedKey === 'whatsapp' ? <Check size={12} /> : <Share2 size={12} />}
                    <span>{copiedKey === 'whatsapp' ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'مشاركة واتساب' : 'WhatsApp')}</span>
                  </button>

                  <button
                    onClick={handleCopyRaw}
                    className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 text-zinc-800 font-bold flex items-center gap-1 border border-zinc-400 transition-colors cursor-pointer"
                    title={isAr ? 'نسخ نص التيلكس بالكامل' : 'Copy telex wire'}
                  >
                    {copiedKey === 'raw' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    <span>{copiedKey === 'raw' ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ التيلكس' : 'Copy Telex')}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 text-zinc-800 font-bold flex items-center gap-1 border border-zinc-400 transition-colors cursor-pointer"
                    title={isAr ? 'طباعة نسخة ورقية نظيفة' : 'Print edition'}
                  >
                    <Printer size={12} />
                    <span>{isAr ? 'طباعة' : 'Print'}</span>
                  </button>
                </div>

              </div>

              {/* NEWSLETTER MAIN DISPATCH HEADLINE */}
              <div className="py-4 space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-red-50 border border-red-200 text-red-900 font-mono text-[10px] font-black uppercase tracking-wider">
                  <ShieldAlert size={12} className="text-red-600" />
                  <span>{isAr ? 'المطالعة الحاكمة لليوم' : 'TODAY\'S CORE DISPATCH'}</span>
                </div>

                <h2 className={`font-serif font-black text-black leading-tight tracking-tight ${
                  fontSizeScale === 'large' ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl md:text-3xl'
                }`}>
                  {isAr ? currentDispatch.titleAr : currentDispatch.titleEn}
                </h2>
              </div>

              {/* EXECUTIVE EDITORIAL LETTER / MEMORANDUM */}
              <div className="my-6 p-6 sm:p-7 bg-[#faf8f2] border-r-4 rtl:border-r-4 rtl:border-l-0 ltr:border-l-4 ltr:border-r-0 border-red-700 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-300 pb-2.5">
                  <span className="font-serif italic font-bold text-sm text-zinc-900">
                    {isAr ? 'حضرة السادة المشتركين وصناع القرار،' : 'Dear Executives & Subscribers,'}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase">
                    {isAr ? 'مذكرة ديوان التحرير' : 'DESK MEMORANDUM'}
                  </span>
                </div>

                <div className={`font-serif text-zinc-900 leading-relaxed space-y-3 ${
                  fontSizeScale === 'large' ? 'text-base md:text-lg' : 'text-sm md:text-base'
                }`}>
                  <p className="whitespace-pre-line first-letter:text-3xl first-letter:font-black first-letter:float-right rtl:first-letter:float-right ltr:first-letter:float-left first-letter:ml-3 rtl:first-letter:ml-3 ltr:first-letter:mr-3 first-letter:text-red-800">
                    {isAr ? currentDispatch.executiveBriefingAr : currentDispatch.executiveBriefingEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-300/80 flex flex-wrap justify-between items-center text-xs font-mono text-zinc-600">
                  <span className="font-bold text-black">
                    {isAr ? (currentDispatch.authorAr || 'ديوان الرصد والتحليل الاستخباراتي - الورّاق') : (currentDispatch.authorEn || 'Al-Warraq Intelligence Bureau')}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    {isAr ? 'بث رقمي مؤمّن • 06:00 UTC' : 'Secured Digital Transmission • 06:00 UTC'}
                  </span>
                </div>
              </div>

              {/* KEY STRATEGIC SIGNALS (THE 3 CORE TAKEAWAYS) */}
              {currentDispatch.keyTakeaways && currentDispatch.keyTakeaways.length > 0 && (
                <div className="my-8 border-2 border-black p-5 sm:p-6 bg-white space-y-4">
                  <div className="flex items-center justify-between border-b border-black pb-2.5">
                    <div className="flex items-center gap-2">
                      <Flame size={15} className="text-red-700" />
                      <h3 className="font-mono text-xs md:text-sm font-black uppercase tracking-wider text-black">
                        {isAr ? 'النقاط الاستراتيجية الحاكمة في إصدار اليوم' : 'The Governing Signals (3 Core Takeaways)'}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase">
                      {isAr ? 'إيجاز صانع القرار' : 'Executive Brief'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {currentDispatch.keyTakeaways.map((point, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 p-3 bg-[#fbfbfa] border border-zinc-200 hover:border-zinc-400 transition-colors"
                      >
                        <span className="font-mono font-black text-xs px-2 py-0.5 bg-black text-amber-300 shrink-0">
                          0{idx + 1}
                        </span>
                        <p className={`font-sans text-zinc-900 leading-snug ${
                          fontSizeScale === 'large' ? 'text-sm md:text-base font-medium' : 'text-xs md:text-sm font-medium'
                        }`}>
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CATEGORIZED NEWSLETTER DESKS & INVESTIGATIONS */}
              <div className="space-y-12 my-10 pt-4">
                {currentDispatch.sections.map((sec, secIdx) => (
                  <section key={sec.sectionId} className="space-y-5">
                    
                    {/* Desk Section Header */}
                    <div className="border-b-2 border-black pb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-black bg-red-800 text-white px-2 py-0.5">
                          {isAr ? `الباب 0${secIdx + 1}` : `SECTION 0${secIdx + 1}`}
                        </span>
                        <h3 className="font-serif font-black text-lg md:text-xl text-black">
                          {isAr ? sec.sectionTitleAr : sec.sectionTitleEn}
                        </h3>
                      </div>
                      <span className="font-mono text-[11px] text-zinc-500 font-bold">
                        {sec.articleIds.length} {isAr ? 'تقارير موثقة' : 'filed reports'}
                      </span>
                    </div>

                    {/* Desk Stories List (Newsletter Card Layout) */}
                    <div className="space-y-5">
                      {sec.articleIds.map((id, aIdx) => {
                        const article = articles.find(a => a.id === id);
                        if (!article) return null;
                        const override = sec.storyOverrides?.[id];
                        const isLead = id === currentDispatch.leadArticleId || override?.isPinnedLead;

                        return (
                          <div 
                            key={id}
                            className={`p-5 sm:p-6 transition-all border ${
                              isLead 
                                ? 'bg-[#fcfbf7] border-2 border-red-800 shadow-[3px_3px_0px_0px_rgba(185,28,28,0.15)]' 
                                : 'bg-white border-zinc-300 hover:border-zinc-500 shadow-xs'
                            }`}
                          >
                            {isLead && (
                              <div className="inline-flex items-center gap-1.5 bg-red-800 text-white font-mono text-[9px] font-black px-2 py-0.5 uppercase tracking-wider mb-2.5">
                                <span>★</span>
                                <span>{isAr ? 'الملف الافتتاحي للباب' : 'FEATURED LEAD DOSSIER'}</span>
                              </div>
                            )}

                            <h4 
                              onClick={() => onSelectArticle && onSelectArticle(article)}
                              className={`font-serif font-black text-black hover:text-red-700 transition-colors leading-snug cursor-pointer ${
                                isLead 
                                  ? (fontSizeScale === 'large' ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-lg md:text-xl')
                                  : (fontSizeScale === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base')
                              }`}
                            >
                              {override?.customHeadlineAr || (isAr ? article.titleAr : article.titleEn)}
                            </h4>

                            <p className={`font-serif text-zinc-700 mt-2 leading-relaxed ${
                              fontSizeScale === 'large' ? 'text-sm md:text-base' : 'text-xs md:text-sm'
                            }`}>
                              {isAr ? article.summaryAr : article.summaryEn}
                            </p>

                            {/* Editorial Angle Note */}
                            {override?.customNotesAr && (
                              <div className="mt-3 p-3 bg-amber-50/80 border-r-3 rtl:border-r-3 rtl:border-l-0 ltr:border-l-3 ltr:border-r-0 border-amber-600 font-sans text-xs text-amber-950">
                                <span className="font-mono font-black text-[10px] text-amber-800 uppercase block mb-0.5">
                                  {isAr ? 'زاوية ديوان التحرير:' : 'EDITORIAL ANGLE & BOTTOM LINE:'}
                                </span>
                                <p>{override.customNotesAr}</p>
                              </div>
                            )}

                            {/* Article Card Footer Link */}
                            <div className="mt-4 pt-3 border-t border-dashed border-zinc-200 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                              <span className="text-zinc-500 text-[11px] font-bold">
                                {article.date} • {article.author}
                              </span>

                              <button
                                onClick={() => onSelectArticle && onSelectArticle(article)}
                                className="text-red-700 hover:text-red-900 font-black flex items-center gap-1.5 transition-colors cursor-pointer group"
                              >
                                <span>{isAr ? 'طالع التحقيق والوثائق كاملة' : 'Read Full Dossier'}</span>
                                <span className="transform group-hover:translate-x-0.5 transition-transform rtl:rotate-180">→</span>
                              </button>
                            </div>

                          </div>
                        );
                      })}
                    </div>

                  </section>
                ))}
              </div>

              {/* NEWSLETTER CLOSING / EDITORIAL SIGN-OFF */}
              <div className="border-t-2 border-black pt-8 mt-12 space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 bg-[#f7f6f2] p-6 border border-zinc-300">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] font-black text-zinc-500 uppercase tracking-widest block">
                      {isAr ? 'التوقيع والاعتماد التحريري' : 'EDITORIAL VERIFICATION'}
                    </span>
                    <p className="font-serif italic text-sm text-zinc-800">
                      {isAr 
                        ? 'تُرسل هذه النشرة للمشتركين حصرياً. حقوق النشر والتحليل محفوظة لمؤسسة الورّاق الصحفية المستقلة.' 
                        : 'Transmitted exclusively to registered decision-makers. Copyright © Al-Warraq Independent Press.'}
                    </p>
                    <div className="pt-2 font-serif font-black text-base text-black">
                      {isAr ? 'ديوان الرصد والتحليل الاستخباراتي — بيروت' : 'Al-Warraq Intelligence Monitoring Bureau — Beirut'}
                    </div>
                  </div>

                  {/* Stamp & Seal */}
                  <div className="shrink-0 flex flex-col items-center sm:items-end">
                    <div className="p-2 border-2 border-red-800 bg-white shadow-xs">
                      <AlWarraqLogo size="md" variant="crimson" showText={false} />
                    </div>
                    <span className="font-mono text-[8px] text-red-800 font-bold uppercase tracking-widest mt-1">
                      VERIFIED DISPATCH // 2026
                    </span>
                  </div>
                </div>

                {/* Newsletter Bottom Actions */}
                <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
                  <button
                    onClick={handleCopyWhatsApp}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs font-black uppercase flex items-center gap-2 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                  >
                    <Share2 size={13} />
                    <span>{isAr ? 'مشاركة النشرة بالواتساب' : 'Share via WhatsApp'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-mono text-xs font-black uppercase flex items-center gap-2 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                  >
                    <Printer size={13} />
                    <span>{isAr ? 'طباعة نسخة ورقية' : 'Print Hardcopy'}</span>
                  </button>
                </div>

              </div>

            </article>

            {/* SUBSCRIBER NEWSLETTER INBOX SIGNUP CARD */}
            <div className="bg-zinc-950 text-white p-6 sm:p-8 border-2 border-zinc-900 shadow-md">
              <div className="max-w-xl mx-auto text-center space-y-3">
                <div className="inline-block bg-red-700 text-white font-mono text-[9px] font-black px-2.5 py-0.5 uppercase tracking-widest">
                  {isAr ? 'اشتراك مباشر في النشرة الصباحية' : 'MORNING DISPATCH INBOX'}
                </div>

                <h3 className="font-serif font-black text-xl sm:text-2xl text-white">
                  {isAr ? 'استلم برقية الورّاق الاستخباراتية يومياً في بريدك' : 'Get Al-Warraq Intelligence Dispatch in Your Inbox'}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {isAr 
                    ? 'إيجاز تنفيذي فجر كل يوم يشمل أهم مؤشرات أسواق المال والطاقة والتحقيقات السيادية قبل بدء تداولات المنطقة.'
                    : 'A high-density briefing delivered every morning at 06:00 UTC covering markets, energy, and sovereign investigations.'}
                </p>

                {subSuccess ? (
                  <div className="p-3 bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono text-xs flex items-center justify-center gap-2">
                    <CheckCircle2 size={15} />
                    <span>{isAr ? '✓ تم تسجيل بريدكم بنجاح لاستلام النشرة القادمة.' : '✓ Subscribed! You will receive the next morning dispatch.'}</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-2 max-w-md mx-auto">
                    <input
                      type="email"
                      required
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      placeholder={isAr ? 'أدخل عنوان بريدك الإلكتروني...' : 'Enter your corporate email...'}
                      className="flex-1 p-2.5 text-xs text-white bg-zinc-900 border border-zinc-700 font-mono placeholder:text-zinc-500 outline-none focus:border-red-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white font-mono text-xs font-black uppercase tracking-wider border border-red-500 cursor-pointer transition-colors"
                    >
                      {isAr ? 'تسجيل الاشتراك' : 'SUBSCRIBE'}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB B: PAST ISSUES ARCHIVE */}
        {activeTab === 'archive' && (
          <div className="space-y-6">
            
            {/* Archive Header & Search Bar */}
            <div className="bg-white border-2 border-black p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <AlWarraqLogo size="sm" variant="black" showText={false} />
                <div>
                  <h2 className="font-serif font-black text-lg md:text-xl text-black">
                    {isAr ? 'أرشيف أعداد نشرة الورّاق الاستخباراتية' : 'Intelligence Dispatches Archive'}
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {isAr ? 'تصفح كافة الأعداد الصادرة والتحليلات السيادية السابقة.' : 'Browse all historical editions and analytical telegraphs.'}
                  </p>
                </div>
              </div>

              <div className="relative w-full sm:w-72">
                <Search size={14} className="absolute top-2.5 right-2.5 text-zinc-400" />
                <input
                  type="text"
                  value={archiveSearch}
                  onChange={(e) => setArchiveSearch(e.target.value)}
                  placeholder={isAr ? 'بحث في الأرشيف (رقم، عنوان)...' : 'Search issues...'}
                  className="w-full pl-3 pr-8 py-2 text-xs border border-zinc-400 bg-[#fafaf8] font-mono outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Archive Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredDispatches.map(disp => (
                <div
                  key={disp.id}
                  onClick={() => {
                    setSelectedIssueId(disp.id);
                    setActiveTab('reader');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-zinc-300 hover:border-black p-5 sm:p-6 transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black bg-black text-amber-300 px-2 py-0.5">
                        {isAr ? `العدد #${disp.issueNumber}` : `Issue #${disp.issueNumber}`}
                      </span>
                      <span className="font-mono text-[11px] text-zinc-500 font-bold">
                        {disp.dateStrAr}
                      </span>
                    </div>

                    <h3 className="font-serif font-black text-base text-black group-hover:text-red-700 transition-colors leading-snug">
                      {disp.titleAr}
                    </h3>

                    <p className="font-serif text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                      {disp.executiveBriefingAr}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {disp.sections.map(s => (
                        <span key={s.sectionId} className="font-mono text-[9px] bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 text-zinc-700 font-bold">
                          {s.sectionTitleAr} ({s.articleIds.length})
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-zinc-200 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500 text-[11px]">
                      {disp.views || 0} {isAr ? 'قارئ نشط' : 'readers'}
                    </span>
                    <span className="text-red-700 font-bold flex items-center gap-1 group-hover:underline">
                      <span>{isAr ? 'فتح قراءة العدد ←' : 'Read Issue →'}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
