import React, { useState, useMemo, useEffect } from 'react';
import { 
  Article, 
  IntelligenceDispatch 
} from '../types';
import { 
  getStoredDispatches 
} from '../data/intelligenceDispatches';
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
  Layers
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

  // Load all dispatches from storage (including published ones)
  const [allDispatches, setAllDispatches] = useState<IntelligenceDispatch[]>(() => getStoredDispatches());

  // Currently viewed issue (defaults to latest issue)
  const [selectedIssueId, setSelectedIssueId] = useState<string>(() => {
    const latest = allDispatches[0];
    return latest ? latest.id : 'dispatch-2026-09-14-144';
  });

  // Current active tab: 'reader' (full dispatch issue view) vs 'archive' (all issues catalog)
  const [activeTab, setActiveTab] = useState<'reader' | 'archive'>('reader');

  // Find active dispatch
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

  // Subscriber email signup state
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
          return prev + 2;
        });
      }, 500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlayingAudio]);

  // Handle subscription form
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMail = subEmail.trim().toLowerCase();
    if (!cleanMail) return;

    if (setSubscribers) {
      setSubscribers(prev => {
        if (prev.includes(cleanMail)) return prev;
        const updated = [...prev, cleanMail];
        try {
          localStorage.setItem('alwarraq_subscribers', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
    setSubSuccess(true);
    setSubEmail('');
    setTimeout(() => setSubSuccess(false), 5000);
  };

  // Copy WhatsApp formatted text
  const handleCopyWhatsApp = () => {
    if (!currentDispatch) return;

    let text = `🚨 *${currentDispatch.titleAr}*\n`;
    text += `📡 *العدد ${currentDispatch.issueNumber}* | ${currentDispatch.dateStrAr}\n`;
    text += `🔒 _[${currentDispatch.classificationAr}]_\n\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📌 *الموجز التنفيذي لغرفة التحرير:*\n${currentDispatch.executiveBriefingAr}\n\n`;

    if (currentDispatch.keyTakeaways && currentDispatch.keyTakeaways.length > 0) {
      text += `🎯 *إشارات الرصد الاستخباري:*\n`;
      currentDispatch.keyTakeaways.forEach(k => {
        text += `• ${k}\n`;
      });
      text += `\n`;
    }

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📑 *أبرز محاور وقضايا العدد:*\n\n`;

    currentDispatch.sections.forEach(sec => {
      text += `*【 ${sec.sectionTitleAr} 】*\n`;
      sec.articleIds.forEach(id => {
        const art = articles.find(a => a.id === id);
        if (art) {
          const override = sec.storyOverrides?.[id];
          text += `▸ *${override?.customHeadlineAr || art.titleAr}*\n`;
          text += `  ${override?.customNotesAr || art.summaryAr.slice(0, 130)}...\n`;
          text += `  🔗 https://alwarraqnews.com/?article=${art.id}\n\n`;
        }
      });
    });

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🌐 طالع العدد كاملاً عبر الموقع: https://alwarraqnews.com/intelligence-dispatch\n`;

    navigator.clipboard.writeText(text);
    setCopiedKey('whatsapp');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Print current issue
  const handlePrint = () => {
    window.print();
  };

  // Filtered archived dispatches
  const filteredDispatches = useMemo(() => {
    if (!archiveSearch.trim()) return allDispatches;
    const term = archiveSearch.toLowerCase();
    return allDispatches.filter(d => 
      d.titleAr.toLowerCase().includes(term) ||
      d.titleEn.toLowerCase().includes(term) ||
      d.executiveBriefingAr.toLowerCase().includes(term) ||
      d.issueNumber.toString().includes(term) ||
      d.dateStrAr.toLowerCase().includes(term)
    );
  }, [allDispatches, archiveSearch]);

  if (!currentDispatch) {
    return (
      <div className="p-12 text-center text-zinc-500 font-mono">
        {isAr ? 'لا توجد برقيات استخباراتية منشورة حالياً.' : 'No intelligence dispatches available.'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f2] text-black font-sans pb-20 text-right rtl:text-right ltr:text-left" id="intelligence-dispatch-page">
      
      {/* 1. TOP HEADER & MASTHEAD BANNER */}
      <div className="bg-white border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-black pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] bg-red-700 text-white px-2 py-0.5 font-bold uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                  <Radio size={12} />
                  {isAr ? 'البث الاستخباراتي اليومي' : 'DAILY INTELLIGENCE WIRE'}
                </span>
                <span className="font-mono text-[10px] bg-black text-amber-300 px-2 py-0.5 font-bold">
                  {isAr ? `العدد #${currentDispatch.issueNumber}` : `ISSUE #${currentDispatch.issueNumber}`}
                </span>
                <span className="font-mono text-[10px] bg-zinc-200 text-zinc-700 px-2 py-0.5 font-bold">
                  {currentDispatch.dateStrAr}
                </span>
              </div>
              <h1 className="font-serif font-black text-2xl md:text-4xl text-black uppercase tracking-tight">
                {isAr ? 'برقيات البث الاستخباراتي اليومي' : 'Intelligence Broadcast Dispatch'}
              </h1>
              <p className="text-xs md:text-sm text-zinc-600 font-medium">
                {isAr 
                  ? 'نشرة التحرير والاستخبارات الاقتصادية والجيوسياسية اليومية للورّاق — مختارات مركزة من كبريات التحقيقات والأسواق والملفات السيادية.' 
                  : 'Al-Warraq daily high-density intelligence briefing: Curated investigations, macro-financial signals, and sovereign dossiers.'}
              </p>
            </div>

            {/* Navigation Switchers & Composer Shortcut */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('reader')}
                className={`px-4 py-2 font-mono text-xs font-black uppercase flex items-center gap-1.5 border-2 transition-all cursor-pointer ${
                  activeTab === 'reader'
                    ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]'
                    : 'bg-white text-black border-black hover:bg-zinc-100'
                }`}
              >
                <BookOpen size={13} />
                <span>{isAr ? 'العدد الصادر' : 'Current Issue'}</span>
              </button>

              <button
                onClick={() => setActiveTab('archive')}
                className={`px-4 py-2 font-mono text-xs font-black uppercase flex items-center gap-1.5 border-2 transition-all cursor-pointer ${
                  activeTab === 'archive'
                    ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]'
                    : 'bg-white text-black border-black hover:bg-zinc-100'
                }`}
              >
                <Archive size={13} />
                <span>{isAr ? 'أرشيف الأعداد' : 'All Issues Archive'}</span>
                <span className="font-mono text-[10px] bg-red-700 text-white px-1.5 py-0.2 rounded-full">
                  {allDispatches.length}
                </span>
              </button>

              {onNavigateToComposer && (
                <button
                  onClick={onNavigateToComposer}
                  className="px-3.5 py-2 bg-amber-300 hover:bg-amber-400 text-black font-mono text-xs font-black uppercase flex items-center gap-1.5 border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Sliders size={13} />
                  <span>{isAr ? 'مؤلف البرقية (الإدارة)' : 'Composer'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Issue Selector Strip (when multiple issues exist) */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-500">{isAr ? 'تصفح الأعداد الأخيرة:' : 'Recent Issues:'}</span>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {allDispatches.slice(0, 6).map(disp => (
                  <button
                    key={disp.id}
                    onClick={() => {
                      setSelectedIssueId(disp.id);
                      setActiveTab('reader');
                    }}
                    className={`px-2.5 py-1 text-xs border font-bold transition-all cursor-pointer ${
                      selectedIssueId === disp.id && activeTab === 'reader'
                        ? 'bg-red-700 text-white border-red-800 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-zinc-100 text-black border-zinc-300 hover:bg-zinc-200'
                    }`}
                  >
                    #{disp.issueNumber}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-zinc-500 text-[11px]">
              {isAr ? 'تصنيف البرقية:' : 'Classification:'} <strong className="text-red-700">{currentDispatch.classificationAr}</strong>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* TAB A: CURRENT DISPATCH READER */}
        {activeTab === 'reader' && (
          <div className="space-y-8">
            
            {/* Action Bar Floating/Top */}
            <div className="bg-white border-2 border-black p-3.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Audio Briefing Simulator Button */}
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`px-3 py-1.5 font-mono text-xs font-bold uppercase flex items-center gap-2 border border-black cursor-pointer transition-all ${
                    isPlayingAudio ? 'bg-red-700 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-black'
                  }`}
                >
                  {isPlayingAudio ? <Pause size={13} /> : <Play size={13} />}
                  <span>{isPlayingAudio ? (isAr ? 'إيقاف الموجز الصوتي' : 'Pause Audio') : (isAr ? 'استمع للموجز الصوتي' : 'Audio Briefing')}</span>
                </button>

                {isPlayingAudio && (
                  <div className="flex items-center gap-2 w-32 md:w-48 bg-zinc-200 h-2 border border-black relative">
                    <div className="bg-red-600 h-full transition-all duration-300" style={{ width: `${audioProgress}%` }} />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyWhatsApp}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs font-bold flex items-center gap-1.5 border border-black cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                >
                  {copiedKey === 'whatsapp' ? <Check size={12} /> : <Share2 size={12} />}
                  <span>{copiedKey === 'whatsapp' ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'مشاركة بالواتساب' : 'Share WhatsApp')}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-black font-mono text-xs font-bold flex items-center gap-1.5 border border-black cursor-pointer"
                >
                  <Printer size={12} />
                  <span>{isAr ? 'طباعة البرقية' : 'Print Wire'}</span>
                </button>
              </div>
            </div>

            {/* THE COMPLETE DISPATCH CANVAS */}
            <article className="bg-[#fcfcfa] border-4 border-black p-6 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black">
              
              {/* Masthead Header */}
              <div className="border-b-4 border-black pb-8 text-center space-y-3">
                <div className="flex justify-between items-center font-mono text-[10px] md:text-xs text-zinc-600 uppercase border-b border-black pb-2 mb-4">
                  <span className="font-bold">{currentDispatch.classificationAr}</span>
                  <span className="text-red-700 font-black tracking-widest">{currentDispatch.classificationEn}</span>
                  <span className="font-bold">{currentDispatch.dateStrEn}</span>
                </div>

                <div className="inline-block bg-black text-white px-5 py-1.5 font-mono text-xs font-black uppercase tracking-widest">
                  // AL-WARRAQ INTELLIGENCE BROADCAST DISPATCH //
                </div>

                <h1 className="font-serif font-black text-2xl md:text-4xl lg:text-5xl text-black leading-tight max-w-4xl mx-auto">
                  {currentDispatch.titleAr}
                </h1>

                <div className="flex flex-wrap justify-center items-center gap-3 font-mono text-xs md:text-sm text-zinc-700 pt-3">
                  <span className="font-black text-red-700 text-sm">العدد #{currentDispatch.issueNumber}</span>
                  <span>•</span>
                  <span className="font-bold">{currentDispatch.dateStrAr}</span>
                  <span>•</span>
                  <span className="text-zinc-600">زمن القراءة: {currentDispatch.readTimeMinutes} دقائق</span>
                  <span>•</span>
                  <span className="bg-amber-200 px-2 py-0.5 border border-black font-black text-black">
                    {currentDispatch.sections.reduce((acc, s) => acc + s.articleIds.length, 0)} ملفات استراتيجية
                  </span>
                </div>
              </div>

              {/* Executive Editorial Briefing Box */}
              <div className="my-8 p-6 md:p-8 bg-red-50/80 border-2 border-red-800 shadow-[4px_4px_0px_0px_rgba(185,28,28,1)]">
                <div className="flex items-center gap-2 mb-4 border-b border-red-800/40 pb-3">
                  <span className="p-1.5 bg-red-800 text-white font-mono text-[10px] font-black uppercase">
                    CONFIDENTIAL INTEL
                  </span>
                  <h3 className="font-sans font-black text-base md:text-lg text-red-950 uppercase">
                    {isAr ? 'الموجز التنفيذي لديوان التحرير الاستخباراتي' : 'Executive Editorial Telegram'}
                  </h3>
                </div>
                
                <p className="font-serif text-base md:text-lg text-zinc-950 leading-relaxed whitespace-pre-line">
                  {currentDispatch.executiveBriefingAr}
                </p>

                <div className="mt-6 pt-4 border-t border-red-800/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono text-red-900">
                  <span className="font-black">{currentDispatch.authorAr || 'ديوان الرصد والتحليل الاستخباراتي - الورّاق'}</span>
                  <span className="font-bold tracking-wider">BEIRUT BUREAU • SOVEREIGN TELEGRAPH</span>
                </div>
              </div>

              {/* Strategic Radar Signals */}
              {currentDispatch.keyTakeaways && currentDispatch.keyTakeaways.length > 0 && (
                <div className="my-8 p-5 bg-zinc-100 border-2 border-black">
                  <div className="font-mono text-xs md:text-sm font-black uppercase text-black mb-4 flex items-center gap-2 border-b border-black pb-2">
                    <Flame size={16} className="text-red-700" />
                    <span>{isAr ? 'أهم ۳ إشارات رصد استراتيجي للمتعاملين وصناع القرار' : 'Strategic Radar Signals'}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {currentDispatch.keyTakeaways.map((point, idx) => (
                      <div key={idx} className="p-3.5 bg-white border-2 border-black font-sans text-xs md:text-sm font-semibold leading-relaxed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <span className="font-mono text-xs font-black bg-black text-white px-2 py-0.5 ml-2 rtl:ml-2 ltr:mr-2">
                          0{idx + 1}
                        </span>
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grouped Sections Content */}
              <div className="space-y-10 my-10">
                {currentDispatch.sections.map((sec, secIdx) => (
                  <div key={sec.sectionId} className="space-y-4">
                    {/* Section Header */}
                    <div className="flex items-center justify-between border-b-2 border-black pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-black bg-black text-white px-2.5 py-1">
                          0{secIdx + 1}
                        </span>
                        <h3 className="font-sans font-black text-lg md:text-xl text-black uppercase">
                          {sec.sectionTitleAr}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-zinc-500 font-bold">
                        {sec.articleIds.length} {isAr ? 'تقارير' : 'reports'}
                      </span>
                    </div>

                    {/* Section Stories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {sec.articleIds.map(id => {
                        const article = articles.find(a => a.id === id);
                        if (!article) return null;
                        const override = sec.storyOverrides?.[id];
                        const isLead = id === currentDispatch.leadArticleId || override?.isPinnedLead;

                        return (
                          <div 
                            key={id}
                            className={`p-5 border-2 transition-all flex flex-col justify-between ${
                              isLead 
                                ? 'border-red-800 bg-white shadow-[5px_5px_0px_0px_rgba(185,28,28,1)]' 
                                : 'border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                            }`}
                          >
                            <div>
                              {isLead && (
                                <div className="inline-block bg-red-700 text-white font-mono text-[9px] font-black px-2 py-0.5 uppercase tracking-wider mb-2">
                                  ★ {isAr ? 'الملف الافتتاحي البارز' : 'FEATURED LEAD'}
                                </div>
                              )}

                              <h4 className="font-sans font-black text-base md:text-lg text-black leading-snug hover:text-red-700 transition-colors">
                                {override?.customHeadlineAr || article.titleAr}
                              </h4>

                              <p className="font-serif text-xs md:text-sm text-zinc-800 mt-2.5 leading-relaxed">
                                {article.summaryAr}
                              </p>

                              {override?.customNotesAr && (
                                <div className="mt-3 p-2.5 bg-amber-50 border-r-2 border-amber-600 font-sans text-xs text-amber-950 font-medium">
                                  <strong>{isAr ? 'ملاحظة ديوان التحرير:' : 'Note:'}</strong> {override.customNotesAr}
                                </div>
                              )}
                            </div>

                            <div className="mt-5 pt-3 border-t border-dashed border-zinc-300 flex items-center justify-between text-xs font-mono">
                              <span className="text-zinc-500 font-bold">{article.date}</span>
                              <button
                                type="button"
                                onClick={() => onSelectArticle && onSelectArticle(article)}
                                className="text-red-700 font-black hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <span>{isAr ? 'طالع التحليل الكامل ←' : 'Read Full File →'}</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Newsletter Dispatch Footer */}
              <div className="border-t-4 border-black pt-8 mt-12 text-center space-y-4">
                <div className="font-mono text-xs text-zinc-600 max-w-xl mx-auto">
                  {isAr 
                    ? 'تم تنضيد وبث هذه البرقية من مكاتب ديوان التحرير في بيروت • معهد الورّاق للدراسات السيادية والاستخبارات الاقتصادية' 
                    : 'Transmitted from Al-Warraq Editorial Bureau, Beirut • Institute for Sovereign Studies'}
                </div>

                <div className="flex flex-wrap justify-center gap-3 font-mono text-xs">
                  <button
                    type="button"
                    onClick={handleCopyWhatsApp}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {isAr ? 'مشاركة البرقية عبر الواتساب' : 'Share via WhatsApp'}
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-bold cursor-pointer"
                  >
                    {isAr ? 'طباعة نسخة ورقية' : 'Print Issue'}
                  </button>
                </div>
              </div>

            </article>

            {/* VIP SUBSCRIBER REGISTRATION BOX */}
            <div className="bg-black text-white p-6 md:p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]">
              <div className="max-w-2xl mx-auto text-center space-y-3">
                <div className="inline-block bg-red-700 text-white font-mono text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                  VIP INTELLIGENCE WIRE ACCESS
                </div>
                <h3 className="font-serif font-black text-xl md:text-3xl text-white">
                  {isAr ? 'اشترك لاستلام برقيات البث الاستخباراتي اليومية' : 'Subscribe to Al-Warraq Intelligence Daily Wire'}
                </h3>
                <p className="text-xs md:text-sm text-zinc-300">
                  {isAr 
                    ? 'احصل على ملخص تحليلي يومي فجر كل صباح يحتوي على أهم التحقيقات والإشارات الاستراتيجية في بريدك.' 
                    : 'Receive confidential daily briefings directly in your inbox before regional markets open.'}
                </p>

                {subSuccess ? (
                  <div className="p-3 bg-emerald-900 border border-emerald-500 text-emerald-100 font-bold text-xs flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>{isAr ? '✓ تم تسجيل اشتراككم بنجاح في ديوان البرقيات اليومية.' : '✓ Successfully subscribed to the daily wire.'}</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-2 max-w-md mx-auto">
                    <input
                      type="email"
                      required
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      placeholder={isAr ? 'أدخل بريدك الإلكتروني هنا...' : 'Enter your corporate email...'}
                      className="flex-1 p-2.5 text-xs text-black bg-white border-2 border-zinc-400 font-sans"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-mono text-xs font-black uppercase tracking-wider border border-white cursor-pointer transition-all"
                    >
                      {isAr ? 'انضمام للبث' : 'SUBSCRIBE'}
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
            
            {/* Archive Search & Title */}
            <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-sans font-black text-lg md:text-xl uppercase text-black flex items-center gap-2">
                  <Archive className="text-red-700" size={20} />
                  {isAr ? 'أرشيف برقيات البث الاستخباراتي اليومي' : 'Intelligence Dispatches Archive'}
                </h2>
                <p className="text-xs text-zinc-500">
                  {isAr ? 'تصفح كافة الأعداد الصادرة والوثائق الاستخباراتية المؤرشفة.' : 'Browse all historical editions and classified telegraph reports.'}
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search size={14} className="absolute top-2.5 right-2.5 text-zinc-400" />
                <input
                  type="text"
                  value={archiveSearch}
                  onChange={(e) => setArchiveSearch(e.target.value)}
                  placeholder={isAr ? 'بحث في الأرشيف (رقم، عنوان، تاريخ)...' : 'Search issues by keyword...'}
                  className="w-full pl-3 pr-8 py-2 text-xs border-2 border-black bg-zinc-50"
                />
              </div>
            </div>

            {/* Archive Issues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDispatches.map(disp => (
                <div
                  key={disp.id}
                  onClick={() => {
                    setSelectedIssueId(disp.id);
                    setActiveTab('reader');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(185,28,28,1)] hover:border-red-700 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-black bg-red-700 text-white px-2 py-0.5">
                        العدد #{disp.issueNumber}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500 font-bold">
                        {disp.dateStrAr}
                      </span>
                    </div>

                    <h3 className="font-sans font-black text-base text-black group-hover:text-red-700 transition-colors leading-snug mb-2">
                      {disp.titleAr}
                    </h3>

                    <p className="font-serif text-xs text-zinc-600 line-clamp-3 leading-relaxed mb-4">
                      {disp.executiveBriefingAr}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {disp.sections.map(s => (
                        <span key={s.sectionId} className="font-mono text-[9px] bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 text-zinc-700 font-bold">
                          {s.sectionTitleAr} ({s.articleIds.length})
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500">
                      {disp.views || 0} {isAr ? 'قراءة' : 'views'}
                    </span>
                    <span className="text-red-700 font-bold flex items-center gap-1 group-hover:underline">
                      <span>{isAr ? 'فتح العدد' : 'Read Issue'}</span>
                      <ArrowLeft size={12} className="rtl:inline ltr:hidden" />
                      <ArrowRight size={12} className="ltr:inline rtl:hidden" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
