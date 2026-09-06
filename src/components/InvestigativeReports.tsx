import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  FileText, 
  Download, 
  Share2, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Flame, 
  Check, 
  Globe, 
  Building, 
  Layers, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowRight, 
  Zap, 
  Cpu, 
  Lock, 
  Heart,
  QrCode,
  FileCheck,
  Bookmark
} from 'lucide-react';
import { Article, UserProfile } from '../types';

interface InvestigativeReportsProps {
  language: 'ar' | 'en';
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
  selectedReportId?: string;
  onSelectReport?: (id: string) => void;
  currentUser?: UserProfile | null;
  isHomeDemoUser?: boolean;
  onNavigateToPremium?: () => void;
  onOpenQrShare?: (url: string) => void;
}

export const InvestigativeReports: React.FC<InvestigativeReportsProps> = ({
  language,
  allArticles,
  onSelectArticle,
  selectedReportId: initialSelectedReportId,
  onSelectReport,
  currentUser,
  isHomeDemoUser,
  onNavigateToPremium,
  onOpenQrShare,
}) => {
  const isAr = language === 'ar';
  const [selectedReportId, setSelectedReportId] = useState<string>(
    initialSelectedReportId || 'ft-israeli-military-religious-zionism-shift-2026'
  );
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isReading, setIsReading] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeTopicFilter, setActiveTopicFilter] = useState<'all' | 'sovereign' | 'economy' | 'energy' | 'governance' | 'tech'>('all');
  const [savedReportIds, setSavedReportIds] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('alwarraq_saved_reports');
      if (saved) {
        setSavedReportIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleSaveReport = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedReportIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('alwarraq_saved_reports', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  // Sync prop changes
  useEffect(() => {
    if (initialSelectedReportId) {
      setSelectedReportId(initialSelectedReportId);
    }
  }, [initialSelectedReportId]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Filter all investigative reports, policy research papers, and forensic briefs
  const investigativeReports = useMemo(() => {
    return allArticles.filter(article => {
      return (
        article.category === 'research-reports' ||
        article.category === 'investigative-reports' ||
        article.category === 'exclusives' ||
        article.category === 'alwarraq-investigations' ||
        article.category === 'special-investigations' ||
        (article.categories && (
          article.categories.includes('research-reports') ||
          article.categories.includes('investigative-reports') ||
          article.categories.includes('exclusives') ||
          article.categories.includes('special-investigations') ||
          article.categories.includes('alwarraq-investigations')
        )) ||
        article.id.includes('report') ||
        article.id.includes('shift') ||
        article.id.includes('analysis') ||
        article.id.includes('investigation') ||
        article.id.includes('reserves') ||
        article.id.includes('eurobond') ||
        article.id.includes('liquidity') ||
        article.id.includes('remittance') ||
        article.id.includes('solidere') ||
        article.id.includes('hormuz') ||
        article.id.includes('pipeline') ||
        article.id.includes('cables') ||
        article.id.includes('syria') ||
        article.id.includes('ft-') ||
        article.id.includes('sp-')
      );
    });
  }, [allArticles]);

  // Apply topic category and text search filter
  const filteredReports = useMemo(() => {
    return investigativeReports.filter(article => {
      // Category filter
      if (activeTopicFilter === 'sovereign') {
        const isSovereign = 
          article.id.includes('military') || 
          article.id.includes('zionism') || 
          article.id.includes('syria') || 
          article.id.includes('israel') || 
          article.id.includes('iran') || 
          article.id.includes('annex') || 
          article.id.includes('ceasefire') || 
          article.id.includes('saudi') ||
          article.id.includes('damascus');
        if (!isSovereign) return false;
      } else if (activeTopicFilter === 'economy') {
        const isEconomy = 
          article.id.includes('eurobond') || 
          article.id.includes('liquidity') || 
          article.id.includes('salameh') || 
          article.id.includes('remittance') || 
          article.id.includes('bdl') || 
          article.id.includes('deposits') || 
          article.id.includes('debt') || 
          article.id.includes('m3') ||
          article.id.includes('banking');
        if (!isEconomy) return false;
      } else if (activeTopicFilter === 'energy') {
        const isEnergy = 
          article.id.includes('oil') || 
          article.id.includes('pipeline') || 
          article.id.includes('gas') || 
          article.id.includes('fuel') || 
          article.id.includes('reserves') || 
          article.id.includes('spr') || 
          article.id.includes('energy');
        if (!isEnergy) return false;
      } else if (activeTopicFilter === 'governance') {
        const isGov = 
          article.id.includes('solidere') || 
          article.id.includes('salameh') || 
          article.id.includes('cabinet') || 
          article.id.includes('aml') || 
          article.id.includes('fifa') || 
          article.id.includes('profiteering');
        if (!isGov) return false;
      } else if (activeTopicFilter === 'tech') {
        const isTech = 
          article.id.includes('cable') || 
          article.id.includes('telecom') || 
          article.id.includes('internet') || 
          article.id.includes('ai') || 
          article.id.includes('data');
        if (!isTech) return false;
      }

      // Search keyword filter
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase().trim();
        const textAr = `${article.titleAr} ${article.summaryAr} ${article.excerptAr || ''} ${article.tags?.join(' ') || ''}`.toLowerCase();
        const textEn = `${article.titleEn} ${article.summaryEn} ${article.excerptEn || ''} ${article.tags?.join(' ') || ''}`.toLowerCase();
        return textAr.includes(q) || textEn.includes(q);
      }

      return true;
    });
  }, [investigativeReports, activeTopicFilter, searchFilter]);

  // Active report object
  const activeReport = 
    investigativeReports.find(a => a.id === selectedReportId) || 
    filteredReports[0] || 
    investigativeReports[0] || 
    allArticles[0];

  // Helper to format file codes
  const getReportCode = (article: Article) => {
    return `AW-REP-${article.id.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase()}-2026`;
  };

  // Estimate reading time and word count
  const getReadTimeEstimate = (article: Article) => {
    const text = (isAr ? article.contentAr : article.contentEn) || (isAr ? article.summaryAr : article.summaryEn) || '';
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 180));
    return {
      minutes,
      wordCount,
      displayAr: `${minutes} دقائق قراءة (${wordCount.toLocaleString('ar-EG')} كلمة)`,
      displayEn: `${minutes} min read (${wordCount.toLocaleString()} words)`
    };
  };

  // Text-to-speech audio reader toggle
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert(isAr ? 'عذراً، متصفحك لا يدعم قراءة النصوص صوتياً.' : 'Text-to-speech not supported.');
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      window.speechSynthesis.cancel();
      const contentToRead = (isAr ? activeReport.contentAr : activeReport.contentEn) || 
                            (isAr ? activeReport.summaryAr : activeReport.summaryEn) || '';
      
      const cleanText = contentToRead
        .replace(/[#*_`~>[\]()|]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = isAr ? 'ar-SA' : 'en-US';
      utterance.rate = speechRate;
      
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/?category=research-reports&report=${activeReport.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const currentReadStats = getReadTimeEstimate(activeReport);
  const isSelectedSaved = savedReportIds.includes(activeReport.id);

  return (
    <div className="space-y-8 animate-fade-in" id="investigative-reports-portal" ref={scrollContainerRef}>
      
      {/* 1. TOP MASTHEAD & SOVEREIGN BUREAU BANNER */}
      <div className="border-4 border-black bg-zinc-950 text-white p-6 relative overflow-hidden shadow-[6px_6px_0px_#991b1b]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#991b1b_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-red-800 text-amber-300 text-[10px] font-mono font-black px-2.5 py-0.5 uppercase tracking-widest border border-red-600 flex items-center gap-1.5">
                <ShieldAlert size={12} className="text-amber-300 animate-pulse" />
                <span>{isAr ? 'ديوان التقارير الاستقصائية والأبحاث المعمقة' : 'INVESTIGATIVE RESEARCH & POLICY REPOSITORY'}</span>
              </span>
              <span className="bg-zinc-800 text-zinc-300 text-[10px] font-mono px-2 py-0.5 border border-zinc-700">
                {isAr ? 'معتمدة وموثقة ٢٠٢٦' : 'VERIFIED 2026 DECLASSIFIED'}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black font-sans tracking-tight text-white">
              {isAr ? 'التقارير الاستقصائية والأبحاث والدراسات الميدانية' : 'Investigative Reports, Deep Studies & Policy Briefs'}
            </h1>

            <p className="text-xs md:text-sm text-zinc-300 font-serif max-w-4xl leading-relaxed">
              {isAr
                ? 'قاعدة بيانات ودراسات استقصائية شاملة تتضمن مسوحاً ميدانية، ونماذج تقدير موقف جيوسياسي، وتحليلات الطب الشرعي المالي لحركة السندات، وتدفقات الطاقة والنفط، والتحولات الهيكلية في الشرق الأوسط.'
                : 'A comprehensive intelligence repository comprising field research, geopolitical risk modeling, forensic financial audits of bond markets, energy pipelines, and institutional transformations across the region.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch md:items-end gap-3 shrink-0">
            <div className="bg-zinc-900 border border-zinc-800 p-3 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                {isAr ? 'إجمالي التقارير المفهرسة' : 'INDEXED REPORTS'}
              </span>
              <span className="text-xl font-mono font-black text-amber-400">
                {investigativeReports.length} {isAr ? 'تقريراً موثقاً' : 'Records'}
              </span>
            </div>

            <button
              onClick={handlePrint}
              className="bg-red-800 hover:bg-red-700 text-white font-mono font-bold text-xs px-4 py-3 flex items-center justify-center gap-2 border border-black shadow-[3px_3px_0px_#000] cursor-pointer transition-all active:translate-y-0.5"
              title={isAr ? 'طباعة / حفظ كملف PDF' : 'Print / Export as PDF'}
            >
              <Download size={14} className="text-amber-300" />
              <span>{isAr ? 'تصدير الأرشيف PDF' : 'EXPORT PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. TOPIC FILTER TABS & SEARCH CONTROLS */}
      <div className="bg-stone-100 border-2 border-black p-4 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
          
          {/* Topic Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <button
              onClick={() => setActiveTopicFilter('all')}
              className={`px-3 py-1.5 font-bold uppercase transition-all border cursor-pointer ${
                activeTopicFilter === 'all'
                  ? 'bg-red-950 text-amber-300 border-red-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {isAr ? `الكل (${investigativeReports.length})` : `All (${investigativeReports.length})`}
            </button>

            <button
              onClick={() => setActiveTopicFilter('sovereign')}
              className={`px-3 py-1.5 font-bold uppercase transition-all border cursor-pointer ${
                activeTopicFilter === 'sovereign'
                  ? 'bg-red-950 text-amber-300 border-red-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'تقارير سيادية ودفاعية' : 'Sovereign & Defense'}
            </button>

            <button
              onClick={() => setActiveTopicFilter('economy')}
              className={`px-3 py-1.5 font-bold uppercase transition-all border cursor-pointer ${
                activeTopicFilter === 'economy'
                  ? 'bg-red-950 text-amber-300 border-red-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'دراسات نقدية ومصرفية' : 'Monetary & Banking'}
            </button>

            <button
              onClick={() => setActiveTopicFilter('energy')}
              className={`px-3 py-1.5 font-bold uppercase transition-all border cursor-pointer ${
                activeTopicFilter === 'energy'
                  ? 'bg-red-950 text-amber-300 border-red-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'الطاقة والنفط والغاز' : 'Oil & Energy'}
            </button>

            <button
              onClick={() => setActiveTopicFilter('governance')}
              className={`px-3 py-1.5 font-bold uppercase transition-all border cursor-pointer ${
                activeTopicFilter === 'governance'
                  ? 'bg-red-950 text-amber-300 border-red-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'الحوكمة والمال العام' : 'Governance & Audit'}
            </button>

            <button
              onClick={() => setActiveTopicFilter('tech')}
              className={`px-3 py-1.5 font-bold uppercase transition-all border cursor-pointer ${
                activeTopicFilter === 'tech'
                  ? 'bg-red-950 text-amber-300 border-red-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'البنية الرقمية والاتصالات' : 'Tech & Subsea Networks'}
            </button>
          </div>

          {/* Search Filter Input */}
          <div className="relative w-full lg:w-72">
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-3 ltr:left-3 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={isAr ? 'ابحث في التقارير والأبحاث...' : 'Search reports & studies...'}
              className="w-full text-xs font-serif bg-white border border-zinc-400 py-2 px-8 focus:outline-none focus:border-red-800 shadow-inner"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-3 ltr:right-3 text-xs text-zinc-400 hover:text-black font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Counter Bar */}
        <div className="flex justify-between items-center text-[11px] font-mono text-zinc-600 border-t border-zinc-200 pt-2">
          <span>
            {isAr 
              ? `عرض ${filteredReports.length} تقرير وبحث استقصائي من أصل ${investigativeReports.length}` 
              : `Displaying ${filteredReports.length} of ${investigativeReports.length} investigative reports`}
          </span>
          <span className="font-bold text-red-900">
            {isAr ? 'مركز أبحاث الورّاق للدراسات الاستراتيجية' : 'AL-WARRAQ CENTER FOR STRATEGIC STUDIES'}
          </span>
        </div>
      </div>

      {/* 3. ACTIVE REPORT READING DESK / TERMINAL */}
      {activeReport && (
        <article className="border-4 border-black bg-white p-6 md:p-8 space-y-6 shadow-[8px_8px_0px_#000] relative">
          
          {/* Top Classification Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="bg-black text-amber-400 px-2.5 py-1 font-bold">
                {getReportCode(activeReport)}
              </span>
              <span className="text-red-800 font-black uppercase flex items-center gap-1">
                <FileCheck size={14} />
                <span>{isAr ? 'تقرير استقصائي معتمد' : 'OFFICIAL INVESTIGATIVE REPORT'}</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-zinc-500 text-xxs sm:text-xs">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                <span>{activeReport.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                <span>{isAr ? currentReadStats.displayAr : currentReadStats.displayEn}</span>
              </span>
            </div>
          </div>

          {/* Report Title & Lead Header */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3.5xl font-black font-sans text-zinc-950 leading-tight">
              {isAr ? activeReport.titleAr : activeReport.titleEn}
            </h2>

            {/* Author Bureau Box */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-stone-50 border border-zinc-300 p-3.5">
              <div className="flex items-center gap-3">
                {activeReport.author?.avatar ? (
                  <img
                    src={activeReport.author.avatar}
                    alt={isAr ? activeReport.author.nameAr : activeReport.author.nameEn}
                    className="w-10 h-10 rounded-none border border-black object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-zinc-900 text-white flex items-center justify-center font-bold font-mono">
                    AW
                  </div>
                )}
                <div>
                  <span className="font-sans font-bold text-xs sm:text-sm text-zinc-900 block">
                    {isAr ? activeReport.author?.nameAr || 'هيئة تحرير الورّاق' : activeReport.author?.nameEn || 'Al-Warraq Editorial Bureau'}
                  </span>
                  <span className="font-serif text-[11px] text-zinc-500 block">
                    {isAr ? activeReport.author?.titleAr || 'وحدة الأبحاث والدراسات الميدانية' : activeReport.author?.titleEn || 'Field Research & Intelligence Desk'}
                  </span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                {/* Text to Speech Button */}
                <button
                  onClick={toggleSpeech}
                  className={`px-3 py-1.5 border font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isReading 
                      ? 'bg-red-800 text-white border-red-900 animate-pulse' 
                      : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-400'
                  }`}
                  title={isAr ? 'الاستماع إلى التقرير صوتياً' : 'Listen to report'}
                >
                  {isReading ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{isReading ? (isAr ? 'إيقاف الصوت' : 'Stop Audio') : (isAr ? 'استماع' : 'Listen')}</span>
                </button>

                {/* Font Size Adjuster */}
                <div className="flex items-center border border-zinc-400 bg-white">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-1 font-serif text-xs ${fontSize === 'normal' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'}`}
                    title={isAr ? 'خط عادي' : 'Standard font'}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-1 font-serif text-sm font-bold ${fontSize === 'large' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'}`}
                    title={isAr ? 'خط كبير' : 'Large font'}
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setFontSize('xlarge')}
                    className={`px-2 py-1 font-serif text-base font-black ${fontSize === 'xlarge' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'}`}
                    title={isAr ? 'خط ضخم' : 'X-Large font'}
                  >
                    A++
                  </button>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleSaveReport(activeReport.id)}
                  className={`px-2.5 py-1.5 border flex items-center gap-1 cursor-pointer transition-all ${
                    isSelectedSaved 
                      ? 'bg-rose-600 text-white border-rose-700' 
                      : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-400'
                  }`}
                  title={isSelectedSaved ? (isAr ? 'محفوظ في المفضلة' : 'Saved') : (isAr ? 'حفظ في المفضلة' : 'Save Bookmark')}
                >
                  <Bookmark size={13} className={isSelectedSaved ? 'fill-current' : ''} />
                  <span className="hidden sm:inline">{isSelectedSaved ? (isAr ? 'محفوظ' : 'Saved') : (isAr ? 'حفظ' : 'Save')}</span>
                </button>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-400 cursor-pointer flex items-center gap-1"
                  title={isAr ? 'نسخ رابط التقرير' : 'Copy link'}
                >
                  {copiedLink ? <Check size={13} className="text-emerald-600" /> : <Share2 size={13} />}
                  <span>{copiedLink ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'مشاركة' : 'Share')}</span>
                </button>

                {/* Print / PDF */}
                <button
                  onClick={handlePrint}
                  className="px-2.5 py-1.5 bg-red-900 hover:bg-red-950 text-white border border-red-950 cursor-pointer flex items-center gap-1"
                  title={isAr ? 'تحميل التقرير كـ PDF' : 'Download report PDF'}
                >
                  <Download size={13} />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Executive Summary / Key Takeaways Box */}
          <div className="bg-amber-50/60 border-2 border-amber-600/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-red-900 font-mono text-xs font-black uppercase tracking-wider">
              <Sparkles size={14} className="text-amber-600" />
              <span>{isAr ? 'الموجز التنفيذي وتقدير الموقف' : 'EXECUTIVE BRIEF & SITUATION ASSESSMENT'}</span>
            </div>
            <p className="font-serif text-sm md:text-base text-zinc-850 leading-relaxed">
              {isAr ? activeReport.summaryAr : activeReport.summaryEn}
            </p>
          </div>

          {/* Report Main Image if present */}
          {activeReport.imageUrl && (
            <div className="relative border-2 border-black overflow-hidden group">
              <img
                src={activeReport.imageUrl}
                alt={isAr ? activeReport.titleAr : activeReport.titleEn}
                className="w-full max-h-[480px] object-cover filter contrast-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white p-2.5 text-xs font-serif flex justify-between items-center">
                <span>{isAr ? activeReport.titleAr : activeReport.titleEn}</span>
                <span className="font-mono text-xxs text-amber-300">{getReportCode(activeReport)}</span>
              </div>
            </div>
          )}

          {/* Report Full Editorial Text Body */}
          <div className={`prose max-w-none font-serif text-zinc-900 leading-relaxed border-t border-zinc-200 pt-6 ${
            fontSize === 'large' ? 'text-lg leading-loose' : fontSize === 'xlarge' ? 'text-xl leading-loose' : 'text-base leading-relaxed'
          }`}>
            <div className="whitespace-pre-line space-y-4">
              {(isAr ? activeReport.contentAr : activeReport.contentEn) || 
               (isAr ? activeReport.summaryAr : activeReport.summaryEn)}
            </div>
          </div>

          {/* Tags & Subject Taxonomy */}
          {activeReport.tags && activeReport.tags.length > 0 && (
            <div className="border-t border-dashed border-zinc-300 pt-4 flex flex-wrap items-center gap-2 font-mono text-xxs">
              <Tag size={13} className="text-zinc-500" />
              <span className="font-bold text-zinc-700">{isAr ? 'المفاتيح الموضوعية:' : 'Taxonomy:'}</span>
              {activeReport.tags.map((tag, idx) => (
                <span key={idx} className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-2 py-1 border border-zinc-300">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Official Bureau Sign-off Footer */}
          <div className="border-t-2 border-black pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-zinc-600 bg-stone-50 p-4">
            <div>
              <span className="block font-bold text-zinc-900">{isAr ? 'مركز أبحاث الورّاق للدراسات الاستراتيجية والتحقيقات' : 'Al-Warraq Strategic Research & Investigative Center'}</span>
              <span className="block text-xxs text-zinc-500">{isAr ? 'وثيقة غير خاضعة للتعديل — جميع الحقوق محفوظة ٢٠٢٦' : 'Immutable Record — All Rights Reserved 2026'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectArticle(activeReport)}
                className="bg-black hover:bg-zinc-800 text-white font-bold px-4 py-2 uppercase transition-all cursor-pointer shadow-[2px_2px_0px_#991b1b]"
              >
                {isAr ? 'فتح في عارض المقالات ←' : 'Open in Article Modal →'}
              </button>
            </div>
          </div>
        </article>
      )}

      {/* 4. COMPREHENSIVE INVESTIGATIVE REPORTS ARCHIVE CATALOG */}
      <section className="mt-12 pt-8 border-t-4 border-double border-zinc-950 space-y-6" id="investigative-reports-full-archive">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-950 text-white p-5 border-2 border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-amber-400" />
              <h3 className="text-lg md:text-xl font-black font-sans text-white">
                {isAr ? 'الأرشيف الشامل للتقارير والأبحاث الاستقصائية' : 'Comprehensive Investigative Reports Catalog'}
              </h3>
            </div>
            <p className="text-xs text-zinc-400 font-serif">
              {isAr 
                ? `تصفح كافة الدراسات الميدانية والتقارير الاستقصائية الموثقة (${filteredReports.length} دراسة مسجلة)` 
                : `Browse all declassified reports and research dispatches (${filteredReports.length} studies registered)`}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="bg-red-900 text-amber-200 px-3 py-1 font-bold border border-red-700">
              {isAr ? 'أبحاث ودراسات محكمة' : 'PEER-REVIEWED STUDIES'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((article) => {
            const isSelected = activeReport.id === article.id;
            const estimate = getReadTimeEstimate(article);
            const reportCode = getReportCode(article);
            const isSaved = savedReportIds.includes(article.id);

            return (
              <div 
                key={article.id}
                onClick={() => {
                  setSelectedReportId(article.id);
                  if (onSelectReport) onSelectReport(article.id);
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`p-5 flex flex-col justify-between transition-all cursor-pointer border ${
                  isSelected 
                    ? 'bg-amber-50/80 border-red-900 shadow-[4px_4px_0px_#7f1d1d]' 
                    : 'bg-white hover:bg-stone-50 border-zinc-300 hover:border-black shadow-[3px_3px_0px_rgba(0,0,0,0.08)]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-zinc-200 pb-2">
                    <span className="bg-zinc-100 text-zinc-800 px-2 py-0.5 font-bold uppercase border border-zinc-200">
                      {reportCode}
                    </span>
                    <span className="text-red-800 font-bold uppercase">
                      {article.category}
                    </span>
                  </div>

                  <h4 className="font-sans font-black text-sm md:text-base text-zinc-950 leading-snug line-clamp-3 hover:text-red-900 transition-colors">
                    {isAr ? article.titleAr : article.titleEn}
                  </h4>

                  <p className="font-serif text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                    {isAr ? (article.excerptAr || article.summaryAr) : (article.excerptEn || article.summaryEn)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-zinc-200 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500 font-bold">
                    {isAr ? estimate.displayAr : estimate.displayEn}
                  </span>

                  <span className="text-red-900 font-black flex items-center gap-1 group">
                    <span>{isAr ? 'قراءة التقرير' : 'Read Report'}</span>
                    <span className="rtl:rotate-180 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER GENERAL LICENSE NOTICE */}
      <div className="border-t border-zinc-200 pt-4 text-center text-xxs font-mono text-zinc-500">
        <span>
          {isAr
            ? 'ديوان الورّاق للتقارير والأبحاث الاستقصائية — مرخص للأغراض الصحفية والبحثية والتوثيق الأكاديمي المستقل'
            : 'Al-Warraq Investigative Reports Repository — Licensed for Journalism, Strategic Research & Sovereign Audit'}
        </span>
      </div>

    </div>
  );
};

export default InvestigativeReports;
