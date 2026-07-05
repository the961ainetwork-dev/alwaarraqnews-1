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
  Sparkle,
  Share2,
  Send,
  Check,
  Link,
  Download,
  Facebook,
  Twitter,
  Linkedin
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
import { CeasefireInternalConflictInfographic } from './CeasefireInternalConflictInfographic';
import { EconomicAbyssCrisisInfographic } from './EconomicAbyssCrisisInfographic';
import { FrozenAssetsInfographic } from './FrozenAssetsInfographic';
import { DepositsInfographic } from './DepositsInfographic';
import { SubseaCablesInfographic } from './SubseaCablesInfographic';
import { FuelProfiteeringInfographic } from './FuelProfiteeringInfographic';

export const DOSSIER_DESKTOP_META: Record<string, {
  fileId: string;
  badge: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}> = {
  'lebanon-framework-agreement-analysis-2026': {
    fileId: 'AW-FILE-01',
    badge: 'TOP SECRET',
    titleAr: 'الملف الأول: غاز قانا والحدود الجنوبية (٢٠٢٦)',
    titleEn: 'Dossier I: Maritime Gas Boundaries & South Border Realities',
    descAr: 'تحليل لنتائج حفر بئر قانا المخيبة، ومخاطر الصراع العسكري على جغرافيا البلوكات الجنوبية وترسيم الحدود.',
    descEn: 'TotalEnergies exploration drilling results, regional security risks, and oil/gas block maps.'
  },
  'solidere-extension-2069': {
    fileId: 'AW-FILE-02',
    badge: 'SOVEREIGN CORP',
    titleAr: 'الملف الثاني: تمديد مرسوم سوليدير لعام ٢٠٦٩ وصراع الأسهم',
    titleEn: 'Dossier II: Corporate Solidere Extension 2069 & Boardroom Battles',
    descAr: 'كواليس تمديد الامتياز العقاري حتى عام ٢٠٦٩ وصراعات الحرس القديم والجديد للاستحواذ على وسط بيروت.',
    descEn: 'The backstage of real estate extension decrees, Beirut stock peaks, and boardroom takeover bids.'
  },
  'lebanon-ceasefire-mirage-2026': {
    fileId: 'AW-FILE-03',
    badge: 'CIVIL SECURITY',
    titleAr: 'الملف الثالث: سراب وقف إطلاق النار في لبنان وشبح الصراع الداخلي الذي يلوح في الأفق',
    titleEn: 'Dossier III: Ceasefire Mirage & Looming Internal Conflict',
    descAr: 'تحليل للمشهد اللبناني المعقد بعد نزوح أكثر من مليون مدني وتفجر خلافات جوهرية بين الحكومة وحزب الله.',
    descEn: 'An intensive study of the deep friction between the Lebanese Cabinet and Hezbollah on disarmament demands.'
  },
  'lebanon-economic-abyss-2026': {
    fileId: 'AW-FILE-04',
    badge: 'ECONOMIC REPORT',
    titleAr: 'الملف الرابع: الهاوية الاقتصادية: الأنقاض، واللاجئون، ونظام مالي مشلول',
    titleEn: 'Dossier IV: The Economic Abyss: Rubble, Refugees, and a Crippled Financial System',
    descAr: 'تشريح للأضرار الهيكلية، وأزمة النازحين الحادة بالبلاد، والعجز الصاعق المقدر بنحو ١١ مليار دولار.',
    descEn: 'A detailed examination of the material damages, severe displacement crisis, and the $11 Billion rebuild gap.'
  },
  'ch12-hebrew-jd-vance-criticism-2026': {
    fileId: 'AW-FILE-05',
    badge: 'TRANSLATED INTEL',
    titleAr: 'الملف الخامس: "أمي مدمنة وفقر مدقع".. هجوم عبري على نائب الرئيس الأمريكي',
    titleEn: 'Dossier V: "My Mother is an Addict" - Hebrew Critique of JD Vance',
    descAr: 'شرح شامل لهجوم القناة 12 العبرية العنيف وتفاصيل النشأة المعقدة للرئيس المقبل والتحفظات الاستخباراتية الإسرائيلية.',
    descEn: 'A full overview of the Hebrew Channel 12 attack, detailing the complex upbringing of the Vice President.'
  },
  'israel-lebanon-deal-behind-scenes': {
    fileId: 'AW-FILE-06',
    badge: 'SECRET INTEL',
    titleAr: 'الملف السادس: كواليس المفاوضات: كيف أدى الخوف المشترك من نفوذ إيران إلى اتفاق لبناني-إسرائيلي',
    titleEn: 'Dossier VI: Behind the Scenes - How Shared Fear of Iran Led to an Israel-Lebanon Deal',
    descAr: 'مستند استخباري خاص يكشف تفاصيل الدبلوماسية السرية والضغوط المكثفة من إدارة ترامب لإبرام اتفاقية لبنان والالتفاف على النفوذ الإيراني.',
    descEn: 'Four days of nonstop negotiations in Washington between the Israeli and Lebanese governments were propelled by one clear shared interest: weakening the influence of Hezbollah and Iran in Lebanon.'
  },
  'south-lebanon-secret-annex-investigation': {
    fileId: 'AW-FILE-07',
    badge: 'MILITARY INTEL',
    titleAr: 'الملف السابع: خفايا الترتيبات الأمنية في جنوب لبنان وما وراء "الملحق السري"',
    titleEn: 'Dossier VII: Secret Security Arrangements & The South Lebanon Annex',
    descAr: 'من خلال آلية الإشراف والمراقبة ومجموعة التنسيق (MCG4L)، واشنطن الحاضر الأكبر في كل قرار ميداني.',
    descEn: 'Through the MCG4L coordination group, Washington acts as the core supervisor of every field decision.'
  },
  'iran-frozen-assets-2026': {
    fileId: 'AW-FILE-08',
    badge: 'GEOPOLITICAL INTEL',
    titleAr: 'الملف الثامن: الأصول الإيرانية المجمدة في الخارج',
    titleEn: 'Dossier VIII: Iranian Frozen Assets Abroad',
    descAr: 'تحليل دقيق للأبعاد الكمية، التوزيع الجغرافي، الأطر القانونية والتداعيات الجيوسياسية للأموال المحتجزة.',
    descEn: 'Comprehensive study of quantitative dimensions, legal structures, and geopolitical impacts.'
  },
  'lebanon-deposits-crisis-2026': {
    fileId: 'AW-FILE-09',
    badge: 'DEPOSITS REPORT',
    titleAr: 'الملف التاسع: أرقام المودعين الفجوة الكبرى ومستقبل الودائع لعام ٢٠٢٦',
    titleEn: 'Dossier IX: The Deposits Dilemma - Balance Sheet Gaps & Future Scenarios',
    descAr: 'تحليل استقصائي لودائع العملاء، وتوزيعها بالعملة الصعبة، والتحول السلوكي التاريخي للمودع اللبناني.',
    descEn: 'A deep-dive data autopsy of LBP vs. USD bank deposits, liquid reserves deficit, and gold allocation.'
  },
  'submarine-cables-geopolitics-2026': {
    fileId: 'AW-FILE-10',
    badge: 'DIGITAL INFRASTRUCTURE',
    titleAr: 'الملف العاشر: جيوبوليتيك الكابلات البحرية ومراكز البيانات تحت التهديد',
    titleEn: 'Dossier X: Subsea Cables Geopolitics & Digital Infrastructure Under Threat',
    descAr: 'ترجمة خاصة لتقريري الإيكونوميست وتساتام هاوس حول الصراع الصيني الأمريكي وحرب الظل الإيرانية على شبكات الإنترنت العالمية.',
    descEn: 'Chatham House and The Economist investigative translations regarding the US-China race and Iranian threat matrix.'
  },
  'fuel-profiteering-cartel-2026': {
    fileId: 'AW-FILE-11',
    badge: 'FUEL PROFITEERING',
    titleAr: 'الملف الحادي عشر: لغز صفيحة الـ 2,220,000 ليرة ومتاهة كارتل النفط في لبنان',
    titleEn: 'Dossier XI: The 2.22M LBP Fuel Riddle - Inside Lebanon’s Profiteering Cartel',
    descAr: 'تشريح استقصائي لهيكل أسعار صفيحة البنزين والمازوت وفضائح استيراد الوقود الروسي Hawk III لعامي ٢٠٢٥-٢٠٢٦.',
    descEn: 'A detailed look at the 20-liter canister price structure, the corporate cartel oligarchy, and Russian oil evasion scams.'
  }
};

interface AlWarraqInvestigationsProps {
  language: 'ar' | 'en';
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
  selectedDossierId?: string;
  onSelectDossier?: (id: string) => void;
}

export default function AlWarraqInvestigations({
  language,
  allArticles,
  onSelectArticle,
  selectedDossierId: propSelectedDossierId,
  onSelectDossier
}: AlWarraqInvestigationsProps) {
  const isAr = language === 'ar';
  
  // Track selected dossier for our new immersive reader layout
  const [localSelectedDossierId, setLocalSelectedDossierId] = useState<string>('lebanon-framework-agreement-analysis-2026');
  
  const selectedDossierId = propSelectedDossierId !== undefined ? propSelectedDossierId : localSelectedDossierId;
  const setSelectedDossierId = onSelectDossier !== undefined ? onSelectDossier : setLocalSelectedDossierId;
  
  // Text-To-Speech Narration States
  const [isPlayingContent, setIsPlayingContent] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [copiedLink, setCopiedLink] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/?category=alwarraq-investigations&dossier=${selectedDossierId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  // Filter to keep only the main investigations
  const investigativeArticles = allArticles.filter(article => {
    return (
      article.id === 'lebanon-framework-agreement-analysis-2026' ||
      article.id === 'solidere-extension-2069' ||
      article.id === 'lebanon-ceasefire-mirage-2026' ||
      article.id === 'lebanon-economic-abyss-2026' ||
      article.id === 'ch12-hebrew-jd-vance-criticism-2026' ||
      article.id === 'israel-lebanon-deal-behind-scenes' ||
      article.id === 'south-lebanon-secret-annex-investigation' ||
      article.id === 'iran-frozen-assets-2026' ||
      article.id === 'lebanon-deposits-crisis-2026' ||
      article.id === 'submarine-cables-geopolitics-2026' ||
      article.id === 'fuel-profiteering-cartel-2026'
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
        {investigativeArticles.map((article) => {
          const meta = DOSSIER_DESKTOP_META[article.id];
          const isSelected = selectedDossierId === article.id;
          const estimate = getReadTimeEstimate(article);
          if (!meta) return null;
          
          return (
            <div
              key={article.id}
              onClick={() => {
                setSelectedDossierId(article.id);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`p-5 text-right rtl:text-right ltr:text-left transition-all duration-200 cursor-pointer select-none rounded flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-50/70 text-red-950 font-bold shadow-sm ring-1 ring-amber-200 border-l-4 border-l-red-900 rtl:border-l-0 rtl:border-r-4 rtl:border-r-red-900'
                  : 'bg-stone-50 hover:bg-stone-100 text-zinc-850 border border-zinc-200'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-2 justify-between border-b border-zinc-200 pb-2">
                  <span className={`px-2 py-0.5 text-[9px] font-mono font-black uppercase ${
                    isSelected ? 'text-red-800 bg-red-100/40 font-bold' : 'text-zinc-500 bg-zinc-200/50'
                  }`}>
                    📁 {meta.fileId}
                  </span>
                  <span className="font-mono text-[9px] text-red-800 font-bold tracking-widest uppercase">{meta.badge}</span>
                </div>
                <h3 className={`text-sm md:text-base font-black font-sans leading-tight transition-colors ${
                  isSelected ? 'text-red-900 font-extrabold' : 'text-zinc-950'
                }`}>
                  {isAr ? meta.titleAr : meta.titleEn}
                </h3>
                <p className="font-serif text-xs text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
                  {isAr ? meta.descAr : meta.descEn}
                </p>
                {estimate && (
                  <div className="flex items-center gap-1.5 mt-3 text-[11px] font-mono font-bold text-[#b91c1c] border-t border-dashed border-zinc-200 pt-2.5 mb-3">
                    <Clock size={11} className="shrink-0 animate-pulse text-[#b91c1c]" />
                    <span>{isAr ? estimate.displayAr : estimate.displayEn}</span>
                  </div>
                )}
              </div>

              {/* Share, WhatsApp, and PDF buttons */}
              <div 
                className="mt-2 pt-2 border-t border-zinc-200 flex items-center justify-between gap-2 text-xxs font-mono"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[10px] text-zinc-400 font-bold">{isAr ? 'روابط بث سريعة:' : 'QUICK TRANSMIT:'}</span>
                <div className="flex items-center gap-1.5">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${isAr ? 'تقرير استقصائي من ديوان تحريات الورّاق:\n\n' : 'Classified investigation dossier from Al-Warraq:\n\n'}*${isAr ? meta.titleAr : meta.titleEn}*\n\n👉 ${window.location.origin}/?category=alwarraq-investigations&dossier=${article.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors uppercase rounded-none cursor-pointer"
                    title={isAr ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
                  >
                    WA
                  </a>

                  {/* Copy Link */}
                  <button
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/?category=alwarraq-investigations&dossier=${article.id}`;
                      navigator.clipboard.writeText(shareUrl).then(() => {
                        alert(isAr ? 'تم نسخ الرابط!' : 'Copied link!');
                      });
                    }}
                    className="px-2 py-1 bg-zinc-800 hover:bg-black text-white font-bold transition-colors border border-black cursor-pointer rounded-none"
                  >
                    LINK
                  </button>

                  {/* PDF Download */}
                  <button
                    onClick={() => {
                      setSelectedDossierId(article.id);
                      setTimeout(() => {
                        window.print();
                      }, 300);
                    }}
                    className="px-2 py-1 bg-red-900 hover:bg-red-950 text-white font-bold transition-colors border border-red-950 cursor-pointer rounded-none"
                    title={isAr ? 'تحميل كملف PDF' : 'Download as PDF'}
                  >
                    PDF
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
                  ) : activeDossier.id === 'lebanon-ceasefire-mirage-2026' ? (
                    <div className="p-4 bg-zinc-950 relative overflow-hidden rounded-md shadow-sm border border-zinc-800">
                      <span className="bg-red-800 text-white text-[8px] font-mono font-black px-2 py-0.5 absolute top-0 right-0 uppercase tracking-widest">
                        {isAr ? 'وثيقة مدمجة أ' : 'EXHIBIT A'}
                      </span>
                      <div className="pt-2 mb-3">
                        <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase">
                          {isAr ? '✦ المخطط التفاعلي لمؤشرات توتر ومخاطر الفتنة اللبنانية' : '✦ Interactive Tension Indicators & Lebanese Civil Strife Map'}
                        </h4>
                      </div>
                      <CeasefireInternalConflictInfographic language={language} />
                    </div>
                  ) : activeDossier.id === 'lebanon-economic-abyss-2026' ? (
                    <div className="p-4 bg-zinc-950 relative overflow-hidden rounded-md shadow-sm border border-zinc-800">
                      <span className="bg-red-800 text-white text-[8px] font-mono font-black px-2 py-0.5 absolute top-0 right-0 uppercase tracking-widest">
                        {isAr ? 'وثيقة مدمجة أ' : 'EXHIBIT A'}
                      </span>
                      <div className="pt-2 mb-3">
                        <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase">
                          {isAr ? '✦ حاسبة العجز التمويلي وتقدير فجوات ميزانية الإعمار' : '✦ Reconstruction Gap Calculator & Emergency Ledger'}
                        </h4>
                      </div>
                      <EconomicAbyssCrisisInfographic language={language} />
                    </div>
                  ) : activeDossier.id === 'iran-frozen-assets-2026' ? (
                    <div className="p-4 bg-[#fdfbf7] relative overflow-hidden rounded-md shadow-sm border border-zinc-200">
                      <span className="bg-red-800 text-white text-[8px] font-mono font-black px-2 py-0.5 absolute top-0 right-0 uppercase tracking-widest">
                        {isAr ? 'مستند تحليلي مدمج' : 'ATTACHED ANALYSIS RECORD'}
                      </span>
                      <div className="pt-2 mb-3 text-right rtl:text-right ltr:text-left">
                        <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase">
                          {isAr ? '✦ تقديرات الأصول المجمدة والتوزيع الجغرافي والنزاعات القانونية' : '✦ Frozen Assets Estimates, Geographic Distribution & Litigation Analysis'}
                        </h4>
                      </div>
                      <FrozenAssetsInfographic language={language} />
                    </div>
                  ) : activeDossier.id === 'lebanon-deposits-crisis-2026' ? (
                    <div className="p-1 bg-white relative overflow-hidden rounded-md">
                      <DepositsInfographic language={language} />
                    </div>
                  ) : activeDossier.id === 'submarine-cables-geopolitics-2026' ? (
                    <div className="p-1 bg-[#0D0E12] relative overflow-hidden rounded-md">
                      <SubseaCablesInfographic language={language} />
                    </div>
                  ) : activeDossier.id === 'fuel-profiteering-cartel-2026' ? (
                    <div className="p-1 bg-[#FAF8F5] relative overflow-hidden rounded-md">
                      <FuelProfiteeringInfographic language={language} />
                    </div>
                  ) : null}
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

                {/* SOVEREIGN DISPATCH SHARE & PDF DOWNLOAD PANEL */}
                <div className="border-t-2 border-black mt-8 pt-6 select-none print:hidden">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Share2 size={14} className="text-red-800 shrink-0 animate-pulse" />
                      <span className="font-mono text-[10px] font-black uppercase text-zinc-800 tracking-wider">
                        {isAr ? 'منظومة بث ونشر الوثيقة السيادية' : 'SOVEREIGN DISPATCH TRANSMISSION'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 justify-start md:justify-end">
                      {/* Twitter / X */}
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(isAr ? activeDossier.titleAr : activeDossier.titleEn)}&url=${encodeURIComponent(`${window.location.origin}/?category=alwarraq-investigations&dossier=${selectedDossierId}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-black hover:bg-zinc-850 text-white rounded-none text-[10px] font-mono font-bold uppercase transition-colors"
                        title={isAr ? 'مشاركة عبر إكس' : 'Share on X / Twitter'}
                      >
                        <Twitter size={10} />
                        <span>X / TWITTER</span>
                      </a>

                      {/* Facebook */}
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/?category=alwarraq-investigations&dossier=${selectedDossierId}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-sky-900 hover:bg-sky-950 text-white rounded-none text-[10px] font-mono font-bold uppercase transition-colors"
                        title={isAr ? 'مشاركة عبر فيسبوك' : 'Share on Facebook'}
                      >
                        <Facebook size={10} />
                        <span>FACEBOOK</span>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/?category=alwarraq-investigations&dossier=${selectedDossierId}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-850 hover:bg-black text-white rounded-none text-[10px] font-mono font-bold uppercase transition-colors"
                        title={isAr ? 'مشاركة عبر لينكد إن' : 'Share on LinkedIn'}
                      >
                        <Linkedin size={10} />
                        <span>LINKEDIN</span>
                      </a>

                      {/* WhatsApp */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${isAr ? 'هذا مستند استقصائي مفرج عنه من الورّاق:\n\n' : 'Classified sovereign dossier from Al-Warraq:\n\n'}*${isAr ? activeDossier.titleAr : activeDossier.titleEn}*\n\n👉 ${window.location.origin}/?category=alwarraq-investigations&dossier=${selectedDossierId}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-none text-[10px] font-mono font-bold uppercase transition-colors"
                        title={isAr ? 'إرسال عبر واتساب' : 'Share on WhatsApp'}
                      >
                        <Send size={10} />
                        <span>WHATSAPP</span>
                      </a>

                      {/* Copy Link */}
                      <button
                        onClick={handleCopyLink}
                        className={`flex items-center gap-1 px-2.5 py-1.5 border border-black rounded-none text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                          copiedLink ? 'bg-emerald-50 text-emerald-700 border-emerald-500' : 'bg-white text-black hover:bg-zinc-100'
                        }`}
                      >
                        {copiedLink ? <Check size={10} /> : <Link size={10} />}
                        <span>{copiedLink ? (isAr ? 'تم النسخ!' : 'COPIED!') : (isAr ? 'نسخ الرابط' : 'COPY LINK')}</span>
                      </button>

                      {/* PDF Download */}
                      <button
                        onClick={() => window.print()}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-red-900 hover:bg-red-950 text-white rounded-none text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer border border-red-950"
                        title={isAr ? 'تحميل كملف PDF رسمي' : 'Download official PDF'}
                      >
                        <Download size={10} />
                        <span>{isAr ? 'تحميل كـ PDF' : 'DOWNLOAD PDF'}</span>
                      </button>
                    </div>
                  </div>
                </div>
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
