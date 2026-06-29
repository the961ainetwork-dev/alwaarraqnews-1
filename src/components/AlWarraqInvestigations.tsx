import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  FileText, 
  Calendar, 
  User, 
  TrendingUp, 
  Compass, 
  Award, 
  AlertCircle,
  Filter,
  Grid,
  List,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Printer,
  BookOpen,
  Clock,
  Tag,
  CornerDownRight,
  Bookmark,
  ArrowUpRight,
  Shield,
  FolderOpen,
  Layers,
  ChevronDown,
  Lock,
  Unlock,
  Sliders,
  Sparkle
} from 'lucide-react';
import { Article } from '../types';

// Infographics & Interactive Map Imports
import { FrameworkAgreementInfographic } from './FrameworkAgreementInfographic';
import { SolidereInfographic } from './SolidereInfographic';
import { SolidereStockInfographic } from './SolidereStockInfographic';
import { FifaPolymarketInfographic } from './FifaPolymarketInfographic';
import AliAlTaherMap from './AliAlTaherMap';
import LebanonConflictMap from './LebanonConflictMap';
import LebanonAMLVisualizer from './LebanonAMLVisualizer';

interface AlWarraqInvestigationsProps {
  language: 'ar' | 'en';
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
}

export default function AlWarraqInvestigations({
  language,
  allArticles,
  onSelectArticle
}: AlWarraqInvestigationsProps) {
  const isAr = language === 'ar';
  
  // Track selected dossier for our new immersive reader layout
  const [selectedDossierId, setSelectedDossierId] = useState<string>('lebanon-framework-agreement-analysis-2026');
  
  // Text-To-Speech Narration States
  const [isPlayingContent, setIsPlayingContent] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter to keep only the two main investigations
  const investigativeArticles = allArticles.filter(article => {
    return (
      article.id === 'lebanon-framework-agreement-analysis-2026' ||
      article.id === 'solidere-extension-2069'
    );
  });

  // Get active dossier object
  const activeDossier = investigativeArticles.find(a => a.id === selectedDossierId) || investigativeArticles[0] || null;

  // Helper to calculate word count and read time dynamically
  const getReadTimeEstimate = (article: Article) => {
    // English calculation
    const textEn = article.contentEn || '';
    const wordsEn = textEn.trim().split(/\s+/).filter(Boolean).length;
    const minutesEn = Math.max(1, Math.ceil(wordsEn / 200));

    // Arabic calculation
    const textAr = article.contentAr || '';
    const wordsAr = textAr.trim().split(/\s+/).filter(Boolean).length;
    const minutesAr = Math.max(1, Math.ceil(wordsAr / 150));

    return {
      minutesEn,
      wordsEn,
      minutesAr,
      wordsAr,
      displayEn: `${minutesEn} min read (${wordsEn.toLocaleString()} words)`,
      displayAr: `${minutesAr} دقائق قراءة (${wordsAr.toLocaleString()} كلمة)`
    };
  };

  const dossier1 = investigativeArticles.find(a => a.id === 'lebanon-framework-agreement-analysis-2026');
  const d1Estimate = dossier1 ? getReadTimeEstimate(dossier1) : null;

  const dossier2 = investigativeArticles.find(a => a.id === 'solidere-extension-2069');
  const d2Estimate = dossier2 ? getReadTimeEstimate(dossier2) : null;


  // Cancel speech synthesis on unmount or on active dossier change to prevent overlapping audio
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingContent(false);
  }, [selectedDossierId, language]);

  // Handle Text-To-Speech toggle
  const toggleSpeech = () => {
    if (!activeDossier) return;

    if ('speechSynthesis' in window) {
      if (isPlayingContent) {
        window.speechSynthesis.cancel();
        setIsPlayingContent(false);
      } else {
        const title = isAr ? activeDossier.titleAr : activeDossier.titleEn;
        const summary = isAr ? activeDossier.summaryAr : activeDossier.summaryEn;
        const content = isAr ? activeDossier.contentAr : activeDossier.contentEn;

        // Strip simple markdown tags for clean vocal readout
        const cleanMarkdownText = (text: string) => {
          return text
            .replace(/[#*`_~-]/g, ' ') 
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') 
            .replace(/\n+/g, ' . ') 
            .replace(/---/g, ' ')
            .trim();
        };

        const speechText = `${title}. ${summary}. ${cleanMarkdownText(content)}`;
        const utterance = new SpeechSynthesisUtterance(speechText);
        
        // Match specific voice codes
        utterance.lang = isAr ? 'ar-EG' : 'en-US';
        
        // Select matched native voice
        const voices = window.speechSynthesis.getVoices();
        const desiredVoice = voices.find(v => 
          v.lang.toLowerCase().replace('_', '-').startsWith(isAr ? 'ar' : 'en')
        );
        if (desiredVoice) {
          utterance.voice = desiredVoice;
        }

        utterance.rate = speechRate * (isAr ? 0.92 : 1.0); // Slightly slower for clear Arabic pronunciation

        utterance.onend = () => {
          setIsPlayingContent(false);
        };
        utterance.onerror = () => {
          setIsPlayingContent(false);
        };

        setIsPlayingContent(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert(isAr ? 'متصفحك لا يدعم خاصية نطق النصوص.' : 'Your browser does not support text-to-speech synthesis.');
    }
  };

  // Hot/Pinned flashing news wire headers for the archive desk ticker
  const tickerItems = isAr ? [
    "حصري: وثائق سرية تصف حقل قانا الجنوبي كخزان أمني بالكامل",
    "تحديث مالي: بورصة بيروت تسجل نشاط تداول مكثف على أسهم سوليدير فئة ب",
    "الاستخبارات الاقتصادية للوراق: ترقبوا موازنة مصرف لبنان المدققة لشهر حزيران",
    "تحليل سيادي: تعديل الحدود الاقتصادية يعيد صياغة معادلات النفوذ بالبحر المتوسط"
  ] : [
    "EXCLUSIVE: Classified files tag Qana Field Block-9 as a purely strategic buffer",
    "FINANCE FLASH: Beirut Stock Exchange lists heavy proxy-trading on Solidere class B shares",
    "AL-WARRAQ INTEL: BDL audited budget metrics for June 2026 leaked from treasury office",
    "SOVEREIGN REPORT: Med-Maritime boundary adjustments trigger new exclusive economic grid mapping"
  ];

  // Helper to format content paragraphs nicely
  const renderFormattedParagraphs = (text: string) => {
    return text.split('\n\n').map((para, i) => {
      const cleanPara = para.trim();
      if (!cleanPara) return null;

      // Render bullet points nicely
      if (cleanPara.startsWith('*') || cleanPara.startsWith('-')) {
        const items = cleanPara.split(/\n[*+-]\s+/).map(item => item.replace(/^[*+-]\s+/, '').trim());
        return (
          <ul key={i} className="list-disc pr-6 pl-6 my-4 space-y-2 text-zinc-800 font-serif text-sm md:text-base leading-relaxed border-r-2 border-red-800/20 rtl:border-r-2 rtl:border-l-0 ltr:border-l-2 ltr:border-r-0">
            {items.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        );
      }

      // Render headings
      if (cleanPara.startsWith('###')) {
        return (
          <h4 key={i} className="text-base md:text-lg font-black text-zinc-950 font-sans mt-6 mb-3 tracking-tight border-b border-zinc-200 pb-1 flex items-center gap-2">
            <span className="w-1.5 h-3 bg-red-800"></span>
            {cleanPara.replace('###', '').trim()}
          </h4>
        );
      }
      if (cleanPara.startsWith('####')) {
        return (
          <h5 key={i} className="text-sm md:text-md font-bold text-red-900 font-sans mt-4 mb-2">
            {cleanPara.replace('####', '').trim()}
          </h5>
        );
      }

      // Normal paragraph
      return (
        <p key={i} className="text-zinc-850 font-serif text-sm md:text-base leading-relaxed mb-4 text-justify select-text indent-4">
          {cleanPara}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6 text-black" id="alwarraq-investigations-exclusive-dossiers">
      
      {/* Newspaper Section Banner - Redesigned as historical intelligence binder header */}
      <div className="border-4 border-black p-6 bg-[#fbf9f4] relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-right rtl:text-right ltr:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-start rtl:justify-start ltr:justify-end">
              <span className="bg-red-900 text-amber-100 text-[10px] font-mono px-2.5 py-0.5 font-bold tracking-widest uppercase inline-block border border-black animate-pulse">
                {isAr ? 'غرفة الملفات السيادية' : 'SOVEREIGN DOSSIERS VAULT'}
              </span>
              <span className="bg-zinc-950 text-white text-[10px] font-mono px-2 py-0.5 inline-block">
                {isAr ? 'تصنيف سري للغاية' : 'CLASSIFIED INTEL - TS'}
              </span>
            </div>
            <h1 className="text-xl md:text-3xl font-black tracking-tight text-zinc-950 font-sans">
              {isAr ? 'التحقيقات الاستقصائية للورّاق' : 'AlWarraq Investigative Reporting'}
            </h1>
            <p className="text-sm md:text-base text-zinc-700 font-serif leading-relaxed max-w-3xl">
              {isAr 
                ? 'مساحة مخصصة ومستقلة لعرض الملفات الاستقصائية كوثائق كاملة ومستندات سيادية مدمجة. تصفح الفهرس على اليمين واقرأ التقرير كاملاً والرسوم التفاعلية مدمجة في صفحة الملف على اليسار.' 
                : 'A dedicated interactive vault designed to present our core investigations as complete physical briefing folders. Browse the index dossiers on the left and read the full investigation file with integrated blueprints on the right.'}
            </p>
          </div>
          
          <div className="border-2 border-double border-red-800 p-3 rotate-[2deg] hidden md:block text-center font-mono shrink-0 bg-white/50">
            <span className="text-red-800 font-black text-xs block uppercase tracking-widest">
              {isAr ? 'أرشيف التحقيقات' : 'INVESTIGATION VAULT'}
            </span>
            <span className="text-black font-black text-base">AL-WARRAQ // 2026</span>
          </div>
        </div>
      </div>

      {/* Ticker / Wire Flash Ticker */}
      <div className="bg-zinc-950 text-white py-1.5 px-4 overflow-hidden relative flex items-center gap-4 select-none">
        <span className="bg-red-800 text-white font-mono text-[9px] font-black px-2 py-0.5 uppercase shrink-0 animate-pulse flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          {isAr ? 'برق تيكر سيادي' : 'VAULT WIRE'}
        </span>
        <div className="relative w-full h-5 overflow-hidden">
          <div className="absolute flex gap-12 whitespace-nowrap animate-marquee font-mono text-xs text-amber-300">
            {tickerItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span>✦</span>
                <span>{item}</span>
              </span>
            ))}
            {/* Duplicate for seamless looping */}
            {tickerItems.map((item, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-2">
                <span>✦</span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* DOSSIER SELECTOR TABS - Vintage design, full width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <button
          onClick={() => {
            setSelectedDossierId('lebanon-framework-agreement-analysis-2026');
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className={`p-5 text-right rtl:text-right ltr:text-left transition-all duration-200 cursor-pointer select-none rounded ${
            selectedDossierId === 'lebanon-framework-agreement-analysis-2026'
              ? 'bg-amber-50/70 text-red-950 font-bold shadow-sm'
              : 'bg-stone-50 hover:bg-stone-100 text-zinc-850'
          }`}
        >
          <div className="flex items-center gap-2 mb-2 justify-between border-b border-zinc-200 pb-2">
            <span className={`px-2 py-0.5 text-[9px] font-mono font-black uppercase ${
              selectedDossierId === 'lebanon-framework-agreement-analysis-2026' ? 'text-red-800 bg-red-100/40 font-bold' : 'text-zinc-500 bg-zinc-200/50'
            }`}>
              📁 AW-FILE-01
            </span>
            <span className="font-mono text-[9px] text-red-800 font-bold tracking-widest">TOP SECRET</span>
          </div>
          <h3 className={`text-sm md:text-base font-black font-sans leading-tight transition-colors ${
            selectedDossierId === 'lebanon-framework-agreement-analysis-2026' ? 'text-red-900 font-extrabold' : 'text-zinc-950'
          }`}>
            {isAr ? 'الملف الأول: غاز قانا والحدود الجنوبية (٢٠٢٦)' : 'Dossier I: Maritime Gas Boundaries & South Border Realities'}
          </h3>
          <p className="font-serif text-xs text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
            {isAr 
              ? 'تحليل لنتائج حفر بئر قانا المخيبة، ومخاطر الصراع العسكري على جغرافيا البلوكات الجنوبية وترسيم الحدود.' 
              : 'TotalEnergies exploration drilling results, regional security risks, and oil/gas block maps.'}
          </p>
          {d1Estimate && (
            <div className="flex items-center gap-1.5 mt-3 text-[11px] font-mono font-bold text-[#b91c1c] border-t border-dashed border-zinc-200 pt-2.5">
              <Clock size={11} className="shrink-0 animate-pulse text-[#b91c1c]" />
              <span>{isAr ? d1Estimate.displayAr : d1Estimate.displayEn}</span>
            </div>
          )}
        </button>

        <button
          onClick={() => {
            setSelectedDossierId('solidere-extension-2069');
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className={`p-5 text-right rtl:text-right ltr:text-left transition-all duration-200 cursor-pointer select-none rounded ${
            selectedDossierId === 'solidere-extension-2069'
              ? 'bg-amber-50/70 text-red-950 font-bold shadow-sm'
              : 'bg-stone-50 hover:bg-stone-100 text-zinc-850'
          }`}
        >
          <div className="flex items-center gap-2 mb-2 justify-between border-b border-zinc-200 pb-2">
            <span className={`px-2 py-0.5 text-[9px] font-mono font-black uppercase ${
              selectedDossierId === 'solidere-extension-2069' ? 'text-red-800 bg-red-100/40 font-bold' : 'text-zinc-500 bg-zinc-200/50'
            }`}>
              📁 AW-FILE-02
            </span>
            <span className="font-mono text-[9px] text-red-800 font-bold tracking-widest">SOVEREIGN CORP</span>
          </div>
          <h3 className={`text-sm md:text-base font-black font-sans leading-tight transition-colors ${
            selectedDossierId === 'solidere-extension-2069' ? 'text-red-900 font-extrabold' : 'text-zinc-950'
          }`}>
            {isAr ? 'الملف الثاني: تمديد مرسوم سوليدير لعام ٢٠٦٩ وصراع الأسهم' : 'Dossier II: Corporate Solidere Extension 2069 & Boardroom Battles'}
          </h3>
          <p className="font-serif text-xs text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
            {isAr 
              ? 'كواليس تمديد الامتياز العقاري حتى عام ٢٠٦٩ وصراعات الحرس القديم والجديد للاستحواذ على وسط بيروت.' 
              : 'The backstage of real estate extension decrees, Beirut stock peaks, and boardroom takeover bids.'}
          </p>
          {d2Estimate && (
            <div className="flex items-center gap-1.5 mt-3 text-[11px] font-mono font-bold text-[#b91c1c] border-t border-dashed border-zinc-200 pt-2.5">
              <Clock size={11} className="shrink-0 animate-pulse text-[#b91c1c]" />
              <span>{isAr ? d2Estimate.displayAr : d2Estimate.displayEn}</span>
            </div>
          )}
        </button>
      </div>

      {/* FULL-WIDTH IMMERSIVE PHYSICAL DOCUMENT VAULT */}
      <div 
        ref={scrollContainerRef}
        className="w-full max-w-5xl mx-auto flex flex-col items-stretch animate-fadeIn"
      >
        {activeDossier ? (
          <div className="bg-[#fbf9f4] p-5 sm:p-8 relative flex flex-col justify-between h-full select-text min-h-[850px]">
            
            {/* STYLISH BINDER HOLES IN PARCHMENT DOCUMENT MARGIN - Giving actual filing binder effect! */}
            <div className="absolute top-12 bottom-12 right-2.5 flex flex-col justify-between w-4 pointer-events-none select-none opacity-40">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-zinc-400 border border-zinc-500 shadow-inner"></div>
              ))}
            </div>


              <div>
                {/* OFFICIAL EMBOSSED HEADER BLOCK */}
                <div className="border-b-4 border-double border-zinc-900 pb-4 mb-6 text-center select-none">
                  <div className="flex justify-between items-center text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest px-2">
                    <span>{isAr ? 'شعبة التحريات السيادية' : 'AL-WARRAQ INTELLIGENCE BOARD'}</span>
                    <span>{activeDossier.date}</span>
                    <span>AW-DISPATCH-99-{activeDossier.id.substring(0, 4).toUpperCase()}</span>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-black font-sans uppercase tracking-tight text-zinc-900 mt-2 mb-1">
                    {isAr ? '❖ ديوان تدوين وتوثيق البيانات المالية والسيادية ❖' : '❖ DECLASSIFIED SOVEREIGN INTEL ARCHIVES ❖'}
                  </h2>
                  <div className="text-[10px] font-mono text-red-800 font-extrabold tracking-widest uppercase">
                    {isAr ? 'تحذير: للوصول العام المستنير - وثيقة كاملة مفرج عنها' : 'DIRECTIVE OVERVIEW // READ-ONLY DISPATCH DOCUMENT'}
                  </div>
                </div>

                {/* DOSSIER SUMMARY METADATA GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-100 p-3 mb-6 font-mono text-xxs text-right rtl:text-right ltr:text-left select-none relative overflow-hidden">
                  <div className="space-y-0.5">
                    <span className="text-zinc-400 block">{isAr ? 'الرقم المرجعي:' : 'DOSSIER ID:'}</span>
                    <span className="font-bold text-zinc-800 uppercase">AW-{activeDossier.id.substring(0, 8)}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-zinc-400 block">{isAr ? 'الكاتب المسؤول:' : 'AUTHOR SIGNATURE:'}</span>
                    <span className="font-bold text-zinc-800">{isAr ? activeDossier.author.nameAr : activeDossier.author.nameEn}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-zinc-400 block">{isAr ? 'مستوى التصنيف:' : 'CLASSIFICATION:'}</span>
                    <span className="font-extrabold text-red-800 uppercase animate-pulse">● {isAr ? 'مستند مفرج عنه' : 'DECLASSIFIED'}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-zinc-400 block">{isAr ? 'زمن القراءة المقدر:' : 'READ ALLOTMENT:'}</span>
                    <span className="font-bold text-zinc-800">
                      {isAr ? getReadTimeEstimate(activeDossier).displayAr : getReadTimeEstimate(activeDossier).displayEn}
                    </span>
                  </div>
                </div>

                {/* TEXT TO SPEECH NARRATOR CONTROL CENTER */}
                <div className="bg-red-50/30 p-3.5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isPlayingContent ? 'bg-red-800 text-white animate-pulse' : 'bg-white text-red-850'}`}>
                      {isPlayingContent ? <Volume2 size={18} className="animate-bounce" /> : <VolumeX size={18} />}
                    </div>
                    <div className="text-right rtl:text-right ltr:text-left">
                      <h4 className="text-xs font-black font-sans text-red-950">
                        {isAr ? 'مساعد القراءة الصوتي للورّاق' : 'AlWarraq Audio Narration'}
                      </h4>
                      <p className="text-[10px] font-mono text-zinc-500">
                        {isPlayingContent 
                          ? (isAr ? 'البث الصوتي قيد النطق الفوري...' : 'Narration algorithm active...') 
                          : (isAr ? 'انقر على الزر للاستماع للمقال بالكامل.' : 'Listen to this comprehensive file.')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Speed rate adjustment */}
                    <div className="flex items-center gap-1.5 bg-white p-1 font-mono text-[9px] font-bold">
                      <span className="text-zinc-400 uppercase">{isAr ? 'السرعة:' : 'RATE:'}</span>
                      <button 
                        onClick={() => setSpeechRate(prev => Math.max(0.8, prev - 0.1))}
                        className="px-1 hover:bg-zinc-100 cursor-pointer"
                        title={isAr ? 'أبطأ' : 'Slower'}
                      >
                        -
                      </button>
                      <span className="text-zinc-800 px-1">{speechRate.toFixed(1)}x</span>
                      <button 
                        onClick={() => setSpeechRate(prev => Math.min(1.5, prev + 0.1))}
                        className="px-1 hover:bg-zinc-100 cursor-pointer"
                        title={isAr ? 'أسرع' : 'Faster'}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={toggleSpeech}
                      className={`font-mono text-xs font-black py-2 px-4 uppercase tracking-wider cursor-pointer transition-all ${
                        isPlayingContent 
                          ? 'bg-red-800 text-white hover:bg-red-900' 
                          : 'bg-[#d97706] text-black hover:bg-amber-600 font-extrabold'
                      }`}
                    >
                      {isPlayingContent ? (isAr ? 'إيقاف الاستماع ◼' : 'Stop Audio ◼') : (isAr ? 'تشغيل النطق 🔊' : 'Speak Text 🔊')}
                    </button>
                  </div>
                </div>

                {/* THE DOSSIER FILE MAIN HEADER */}
                <div className="space-y-3 mb-6 text-right rtl:text-right ltr:text-left">
                  <h1 className="text-xl sm:text-2xl font-black font-sans text-zinc-950 tracking-tight leading-snug">
                    {isAr ? activeDossier.titleAr : activeDossier.titleEn}
                  </h1>
                  <p className="text-sm md:text-base font-serif font-semibold italic text-zinc-700 bg-zinc-50 border-r-4 border-red-800 rtl:border-r-4 rtl:border-l-0 ltr:border-l-4 ltr:border-r-0 p-3 leading-relaxed">
                    {isAr ? activeDossier.summaryAr : activeDossier.summaryEn}
                  </p>
                </div>

                {/* MOUNTED DYNAMIC INFOGRAPHIC GRAPHICS DIRECTLY INLINE AS STAMPED FILE ATTACHMENTS */}
                <div className="my-6">
                  {activeDossier.id === 'lebanon-framework-agreement-analysis-2026' ? (
                    <div className="space-y-6">
                      <div className="p-4 bg-white relative overflow-hidden rounded-md shadow-sm">
                        <span className="bg-red-800 text-white text-[8px] font-mono font-black px-2 py-0.5 absolute top-0 right-0 uppercase tracking-widest">
                          {isAr ? 'وثيقة مدمجة أ' : 'EXHIBIT A'}
                        </span>
                        <div className="pt-2 mb-3">
                          <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase">
                            {isAr ? '✦ المخطط الجيولوجي لترسيم الحدود البحرية الجنوبية' : '✦ Southern Maritime Boundary & Block Terrain Blueprint'}
                          </h4>
                        </div>
                        <FrameworkAgreementInfographic language={language} />
                      </div>

                      <div className="p-4 bg-white relative overflow-hidden rounded-md shadow-sm">
                        <span className="bg-zinc-900 text-white text-[8px] font-mono font-black px-2 py-0.5 absolute top-0 right-0 uppercase tracking-widest">
                          {isAr ? 'وثيقة مدمجة ب' : 'EXHIBIT B'}
                        </span>
                        <div className="pt-2 mb-3">
                          <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase">
                            {isAr ? '✦ خريطة النفوذ والتوترات الحدودية والنفطية' : '✦ Geopolitical Regional Oil & Conflict Grid'}
                          </h4>
                        </div>
                        <LebanonConflictMap 
                          language={language} 
                          allArticles={allArticles}
                          onSelectArticle={(art) => { setSelectedDossierId(art.id); }} 
                        />
                      </div>
                    </div>
                  ) : activeDossier.id === 'solidere-extension-2069' ? (
                    <div className="p-4 bg-white relative overflow-hidden rounded-md shadow-sm">
                      <span className="bg-red-800 text-white text-[8px] font-mono font-black px-2 py-0.5 absolute top-0 right-0 uppercase tracking-widest">
                        {isAr ? 'وثيقة مدمجة أ' : 'EXHIBIT A'}
                      </span>
                      <div className="pt-2 mb-3">
                        <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase">
                          {isAr ? '✦ الجدول الزمني لمرسوم سوليدير التفاعلي ومستندات الأراضي' : '✦ Interactive Solidere 2069 Extension Timeline & Assets Board'}
                        </h4>
                      </div>
                      <SolidereInfographic 
                        language={language} 
                        articles={allArticles} 
                        onSelectArticle={(art) => { setSelectedDossierId(art.id); }} 
                      />
                    </div>
                  ) : activeDossier.id === 'solidere-stock-struggle-2026' ? (
                    <div className="p-4 bg-white relative overflow-hidden rounded-md shadow-sm">
                      <span className="bg-red-800 text-white text-[8px] font-mono font-black px-2 py-0.5 absolute top-0 right-0 uppercase tracking-widest">
                        {isAr ? 'وثيقة مدمجة أ' : 'EXHIBIT A'}
                      </span>
                      <div className="pt-2 mb-3">
                        <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase">
                          {isAr ? '✦ منحنى أسهم سوليدير وحصص تداول بورصة بيروت' : '✦ Beirut Bourse Solidere Stock Value Index & Corporate Bids'}
                        </h4>
                      </div>
                      <SolidereStockInfographic language={language} />
                    </div>
                  ) : activeDossier.id === 'fifa-polymarket-struggle-2026' ? (
                    <div className="p-4 bg-white relative overflow-hidden rounded-md shadow-sm">
                      <span className="bg-red-800 text-white text-[8px] font-mono font-black px-2 py-0.5 absolute top-0 right-0 uppercase tracking-widest">
                        {isAr ? 'وثيقة مدمجة أ' : 'EXHIBIT A'}
                      </span>
                      <div className="pt-2 mb-3">
                        <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase">
                          {isAr ? '✦ منصة موازين احتمالات بولي ماركت وعقود فيفا ٢٠٢٦' : '✦ Polymarket Probabilities & FIFA 2026 Contract Odds'}
                        </h4>
                      </div>
                      <FifaPolymarketInfographic language={language} />
                    </div>
                  ) : activeDossier.id === 'ali-al-taher-investigation' ? (
                    <div className="p-4 bg-white relative overflow-hidden rounded-md shadow-sm">
                      <span className="bg-red-800 text-white text-[8px] font-mono font-black px-2 py-0.5 absolute top-0 right-0 uppercase tracking-widest">
                        {isAr ? 'وثيقة مدمجة أ' : 'EXHIBIT A'}
                      </span>
                      <div className="pt-2 mb-3">
                        <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase">
                          {isAr ? '✦ تعقب مسارات وحركة رؤوس الأموال العسكرية لعلي الطاهر' : '✦ Tracker of Capital Flows & Geolocation Routes for Ali Al-Taher'}
                        </h4>
                      </div>
                      <AliAlTaherMap language={language} />
                    </div>
                  ) : activeDossier.id === 'fatf-grey-list-lebanon-2026' || activeDossier.id === 'fatf-gray-list-lebanon-2026' ? (
                    <div className="p-4 bg-white relative overflow-hidden rounded-md shadow-sm">
                      <span className="bg-red-800 text-white text-[8px] font-mono font-black px-2 py-0.5 absolute top-0 right-0 uppercase tracking-widest">
                        {isAr ? 'وثيقة مدمجة أ' : 'EXHIBIT A'}
                      </span>
                      <div className="pt-2 mb-3">
                        <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase">
                          {isAr ? '✦ شبكة غسيل الأموال وامتثال القطاع المصرفي اللبناني' : '✦ Anti-Money Laundering Framework & Lebanese Banking Compliance Map'}
                        </h4>
                      </div>
                      <LebanonAMLVisualizer language={language} layoutMode="digital" />
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-md">
                      <img 
                        src={activeDossier.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80"} 
                        alt={activeDossier.titleEn} 
                        referrerPolicy="no-referrer"
                        className="w-full h-64 object-cover grayscale contrast-125"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-black/85 text-white font-mono text-[9px] p-2 text-center uppercase tracking-widest">
                        {isAr ? 'صورة أرشيفية رسمية مدرجة بالملف' : 'OFFICIAL CASE FILE ARCHIVE PHOTO ATTACHMENT'}
                      </div>
                    </div>
                  )}
                </div>

                {/* THE COMPLETE DETAILED FULL TEXT OF THE DOSSIER FILE */}
                <div className="prose max-w-none text-zinc-900 border-t border-zinc-200 pt-6 text-right rtl:text-right ltr:text-left font-serif">
                  
                  {/* Watermark Stamps (Visual high-craft details) */}
                  <div className="relative">
                    
                    {/* CONFIDENTIAL stamped watermark on backing */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none select-none overflow-hidden rotate-[-25deg]">
                      <span className="text-red-900 text-5xl sm:text-7xl font-black tracking-widest border-8 border-red-900 px-8 py-4 rounded-xl">
                        {isAr ? 'سري للورّاق' : 'CONFIDENTIAL AW'}
                      </span>
                    </div>

                    <div className="relative z-10 space-y-2 select-text">
                      {renderFormattedParagraphs(activeDossier.contentAr || activeDossier.contentEn)}
                    </div>
                  </div>

                </div>

                {/* COOPERATIVE RESEARCH TAG NETWORK */}
                {activeDossier.tags && activeDossier.tags.length > 0 && (
                  <div className="border-t border-dashed border-zinc-300 mt-8 pt-4 text-right rtl:text-right ltr:text-left select-none">
                    <span className="font-mono text-[9px] font-black text-zinc-400 block uppercase mb-1.5">
                      {isAr ? '🔗 شبكة الأوسمة والاتصالات السيادية' : '🔗 CONNECTED SOVEREIGN TAG NETWORK'}
                    </span>
                    <div className="flex flex-wrap gap-1.5 justify-start rtl:justify-start ltr:justify-end">
                      {activeDossier.tags.map(t => (
                        <span key={t} className="bg-zinc-150 border border-zinc-300 text-zinc-700 font-mono text-[9px] px-2 py-0.5 rounded-none">
                          #{t.replace(/\s+/g, '_')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* DOSSIER FOOTER - DOCUMENT VALIDATION SEAL */}
              <div className="border-t-4 border-double border-zinc-950 pt-4 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xxs font-mono text-zinc-500 select-none">
                <div className="text-center sm:text-right">
                  <span className="block font-black text-zinc-800">
                    {isAr ? 'صحيفة الوراق المستقلة - ديوان التحريات' : 'AL-WARRAQ INDEPENDENT ARCHIVES // DOSSIER ROOM'}
                  </span>
                  <span>
                    {isAr 
                      ? 'تم التحقق من الوثائق والبيانات المدمجة وتوقيعها من مكتب التحرير بموجب الأصول الاستقصائية لعام ٢٠٢٦.' 
                      : 'Verified and signed off by the sovereign editorial board for publication on the official wire services.'}
                  </span>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => window.print()}
                    className="border border-black bg-white hover:bg-zinc-100 px-2.5 py-1 text-zinc-900 font-bold uppercase transition-colors cursor-pointer flex items-center gap-1"
                    title={isAr ? 'طباعة هذا الملف' : 'Print this dossier'}
                  >
                    <Printer size={11} />
                    <span>{isAr ? 'طباعة' : 'Print'}</span>
                  </button>
                  
                </div>
              </div>

            </div>
          ) : (
            <div className="border-4 border-dashed border-zinc-300 p-12 text-center text-zinc-400 font-mono bg-[#fbf9f4] h-full flex flex-col items-center justify-center">
              <FolderOpen size={48} className="text-zinc-300 mb-2 animate-pulse" />
              <p className="text-sm font-bold uppercase">{isAr ? 'يرجى تحديد ملف من الفهرس للقراءة' : 'SELECT A DOSSIER FILE TO BRIEF'}</p>
            </div>
          )}
        </div>


      {/* FOOTER GENERAL LICENSE NOTICE */}
      <div className="border-t border-zinc-200 pt-4 text-center text-xxs font-mono text-zinc-500">
        <p>
          {isAr 
            ? '© ٢٠٢٦ صحيفة الورّاق المستقلة. جميع وثائق التحقيق والرسوم التفاعلية تخضع للملكية الفكرية الاستقصائية والمكتب الصحفي السيادي.' 
            : '© 2026 AlWarraq Gazette. All investigative documentation, sovereign annexes, and timeline telemetry are copyright protected under registered press code.'}
        </p>
      </div>
    </div>
  );
}
