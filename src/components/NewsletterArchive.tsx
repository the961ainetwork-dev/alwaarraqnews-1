import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  BookOpen, 
  Copy, 
  Check, 
  Share2, 
  Eye, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Flame, 
  RefreshCw, 
  ArrowLeft,
  FileText,
  Sparkles
} from 'lucide-react';

export interface NewsletterStory {
  id: string;
  category: string;
  headlineEn: string;
  headlineAr: string;
  synopsisEn: string;
  synopsisAr: string;
  ctaEn: string;
  ctaAr: string;
  url: string;
  unsplashTerm: string;
}

export interface ArchivedNewsletter {
  id: string;
  dateStr: string;      // e.g. "16 June 2026"
  dateStrAr: string;    // e.g. "١٦ يونيو ٢٠٢٦"
  themeEn: string;
  themeAr: string;
  category: string;     // e.g. "techno-politics", "resource-friction"
  views: number;
  stories: NewsletterStory[];
}

interface NewsletterArchiveProps {
  language: 'ar' | 'en';
  layoutMode: 'classic-print' | 'modern-white';
  onLoadEdition: (stories: NewsletterStory[], id: string) => void;
  activeStoryId?: string;
  currentStories?: NewsletterStory[];
}

// Pre-seeded high-fidelity historical dispatches reflecting Al-Warraq standard
const PRE_SEEDED_ARCHIVE: ArchivedNewsletter[] = [
  {
    id: "arch-mou-signed",
    dateStr: "17 June 2026",
    dateStrAr: "١٧ يونيو ٢٠٢٦",
    themeEn: "The Sovereign Switchboard",
    themeAr: "خطوط التحويل السيادية",
    category: "techno-politics",
    views: 18950,
    stories: [
      {
        id: "mou-h1",
        category: "techno-politics",
        headlineEn: "THE US-IRAN SWAP: THE RECOIL OF THE 2026 WAR AND THE ACCELERATED SHUNT",
        headlineAr: "تسونامي التفاهم: زلزال توقيع مذكرة واشنطن وطهران ومسارات الالتفاف الطاقي واللوجستي الجريئة",
        synopsisEn: "Now that the US-Iran MOU is signed, Gulf powers rapid-run pipeline expansions and cross-peninsula railways to bypass Strait of Hormuz pressure.",
        synopsisAr: "الآن بعد توقيع مذكرة التفاهم بين الولايات المتحدة وإيران، ماذا بعد؟ دول المنطقة تتحرك بسرعة فائقة لتكييف بنيتها اللوجستية وتوسيع شبكات الأنابيب والسكك لتفادي طائلة حصار مضيق هرمز الحرج.",
        ctaEn: "ANALYZE FRICTION",
        ctaAr: "تفكيك المسار",
        url: "https://alwarraqnews.com/section/editor-desk",
        unsplashTerm: "nuclear power oil dock ship industry"
      },
      {
        id: "mou-h2",
        category: "cyber-finance",
        headlineEn: "THE LIQUIDITY ESCROLL: LEBANON EUROBONDS CAPTURED IN THE 22-CENT SWIRL",
        headlineAr: "الملتفّ المالي: سندات يوروبوندز لبنان تنجرف في دوّامة الـ 22 سنتاً",
        synopsisEn: "A high-stakes chess match unfolds in post-war Lebanon as distressed debt funds brace for restructured haircuts. Behind closed doors, advisors recalculate exit yields.",
        synopsisAr: "معادلة صعبة تصيب السندات السيادية اللبنانية in أعقاب صدمات الحرب المستمرة في الشرق الأوسط. وفي كواليس المكاتب المغلقة، يعيد المستشارون تصفير التوقعات مع اتساع تكلفة المخاطر.",
        ctaEn: "DECODE DILEMMA",
        ctaAr: "فك الشفرة",
        url: "https://alwarraqnews.com/section/editor-desk",
        unsplashTerm: "financial market screen index graph"
      }
    ]
  },
  {
    id: "arch-bypass",
    dateStr: "16 June 2026",
    dateStrAr: "١٦ يونيو ٢٠٢٦",
    themeEn: "Bypass Geopolitics & Logistics Pipeline Shifts",
    themeAr: "جغرافيا الالتفاف: وثبة الأنابيب والشبكات اللوجستية بالخليج",
    category: "resource-friction",
    views: 15420,
    stories: [
      {
        id: "bp-1",
        category: "resource-friction",
        headlineEn: "THE FUJAIRAH SPEED-RUN: SECOND PIPELINE DOUBLE-LOCKS EMIRATIAN FLOWS",
        headlineAr: "حركية الفجيرة: الإسراع في بناء خط الشرق-الغرب المزدوج لتجاوز هرمز",
        synopsisEn: "UAE greenlights immediate scaling of East coast pipeline capacity, assuring secondary global output bypass lines are operational ahead of schedule.",
        synopsisAr: "الإمارات تعلن رسمياً تسريع خطوط أنابيب النفط والغاز للالتفاف الكلي على مضيق هرمز لضمان وصول الإمدادات العالمية عبر ميناء الفجيرة.",
        ctaEn: "TRACE CAPABILITIES",
        ctaAr: "رصد القدرات",
        url: "https://alwarraqnews.com/section/middle-east",
        unsplashTerm: "oil steel pipeline industry dock"
      },
      {
        id: "bp-2",
        category: "supply-chains",
        headlineEn: "SAR ARAB PASS: OVERLAND RAIL DESERT CHANNELS CUT CARGO DURATION IN HALF",
        headlineAr: "قطارات السيادة: شبكة سار الدولية للبضائع تعيد تشكيل زمن النقل عبر البادية",
        synopsisEn: "Saudi Railways initiates full-load dry corridors spanning from Eastern ports to Jordanian borderlines, circumventing maritime bottlenecks.",
        synopsisAr: "الخطوط الحديدية السعودية تطبق ممراً دولياً سريعاً ينقل الحاويات من شواطئ الخليج الشرقية للمنفذ الأردني، مقتطعاً نصف زمن الشحن البحري.",
        ctaEn: "UNPACK CORRIDORS",
        ctaAr: "فك لوجستيات الممر",
        url: "https://alwarraqnews.com/section/markets",
        unsplashTerm: "desert railway train steel cargo"
      }
    ]
  },
  {
    id: "arch-cybershield",
    dateStr: "15 June 2026",
    dateStrAr: "١٥ يونيو ٢٠٢٦",
    themeEn: "Cyber-Shield Mesh Networks & Financial Decentralization",
    themeAr: "حجاب الفضاء الرقمي والشبكات اللامركزية لمعالجة شلل السيولة",
    category: "telecom-internet",
    views: 12110,
    stories: [
      {
        id: "cy-1",
        category: "telecom-internet",
        headlineEn: "LEBANON OVER THE SATELLITE: COMMENCING LOCALIZED LEO STATION ARRAYS",
        headlineAr: "أقمار الحبر: بدء تشغيل مصفوفات أقمار ميكروية لحماية سيادة الاتصال بلبنان",
        synopsisEn: "With subsea assets vulnerable under geopolitical friction, domestic cooperatives test microwave and LEO beams to shield public data channels.",
        synopsisAr: "وسط هشاشة كوابل الأعماق، يبدأ تقنيون لبنانيون حياكة شبكات سحابية بديلة من الأقمار منخفضة المدار لضمان استمرارية الصحافة والخدمات الأساسية.",
        ctaEn: "SECURE CHANNELS",
        ctaAr: "تأمين الشبكة",
        url: "https://alwarraqnews.com/section/telecom-internet",
        unsplashTerm: "satellite orbit network fiber telecomm"
      },
      {
        id: "cy-2",
        category: "cyber-finance",
        headlineEn: "THE CRYPTO-PAPYRUS: BEIRUT DIGITAL INDEX STABILIZES INTERNAL TRADES",
        headlineAr: "العملات الرقمية المحلية: تسوية التحويلات الأهلية وسط شلل الثقة بالبنوك",
        synopsisEn: "Independent blockchain node developers implement offline-safe ledgers to clear daily food and logistics trade settlements in Beirut suburbs.",
        synopsisAr: "مطورو البرمجيات الحرة في بيروت يطلقون شبكات دفع مدعومة برمز مشفر لتسهيل التعاملات الأهلية بعيداً عن أزمة السيولة وعقم التسهيلات المصرفية.",
        ctaEn: "DECODE CRYPTO",
        ctaAr: "قراءة الشفرة",
        url: "https://alwarraqnews.com/section/markets",
        unsplashTerm: "circuit board blockchain currency light code"
      }
    ]
  },
  {
    id: "arch-leaks",
    dateStr: "14 June 2026",
    dateStrAr: "١٤ يونيو ٢٠٢٦",
    themeEn: "The Doha Secret Drafts & Syrian Energy Rapprochement",
    themeAr: "وثائق الدوحة السرية وخارطة دمج البنى التحتية في سوريا ولبنان",
    category: "techno-politics",
    views: 9840,
    stories: [
      {
        id: "lk-1",
        category: "techno-politics",
        headlineEn: "THE 60-DAY ACCORD DRAFTS: LEAKING WASHINGTON’S PROPOSED STABILITY Blueprints",
        headlineAr: "تسريبات بروتوكول الـ 60 يوماً: النواة الدبلوماسية للهدنة المتقطعة",
        synopsisEn: "Qatar and Pakistan backchannel logs show rigorous regional investments offered in exchange for a full maritime freeze in Persian waters.",
        synopsisAr: "مسودات دبلوماسية مسربة في الدوحة تكشف عن رغبة غربية لتمويل خطط توسع اقتصادي طموح مقابل تفكيك كلي لحقول الألغام البحرية وهدنة مستدامة.",
        ctaEn: "INSPECT BLUEPRINTS",
        ctaAr: "قراءة البنود",
        url: "https://alwarraqnews.com/section/editor-desk",
        unsplashTerm: "doha skyscraper flag embassy office"
      },
      {
        id: "lk-2",
        category: "resource-friction",
        headlineEn: "SYRIAN GRID SYNERGIES: RE-ENGAGING POST-WAR LOGISTICS VIA GULF CAPITAL",
        headlineAr: "طاقة الشام: عروض خليجية لإعادة تأهيل شبكات نقل الغاز والكهرباء السورية",
        synopsisEn: "Syria climbs geopolitical priorities as Gulf brokers propose reconstructing cross-border pipelines to supply Beirut and Amman directly.",
        synopsisAr: "رؤوس أموال خليجية تدخل مفاوضات تمويل مشروعات نقل الطاقة عبر الأراضي السورية، كخطوة استباقية لدمج دمشق في شبكات الربط الكهربائي واللوجستي.",
        ctaEn: "ANALYZE GRID",
        ctaAr: "تحليل الشبكة",
        url: "https://alwarraqnews.com/section/middle-east",
        unsplashTerm: "high voltage power transmission lines dusk"
      }
    ]
  }
];

export default function NewsletterArchive({ 
  language, 
  layoutMode, 
  onLoadEdition,
  activeStoryId,
  currentStories 
}: NewsletterArchiveProps) {
  const isAr = language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [localArchive, setLocalArchive] = useState<ArchivedNewsletter[]>(() => {
    // Attempt load from localStorage to allow dynamic edits persistence if needed, fallback to preseed
    try {
      const saved = localStorage.getItem('alwarraq_newsletter_archive');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Could not parse archive from localStorage:", e);
    }
    return PRE_SEEDED_ARCHIVE;
  });

  // Copy indicators inside archive viewer
  const [copiedStoryId, setCopiedStoryId] = useState<string | null>(null);
  const [loadedNotification, setLoadedNotification] = useState<string | null>(null);

  // Synchronize state if needed - e.g., if there's custom generation, users might want to save current as draft
  const handleSaveCurrentToArchive = () => {
    if (!currentStories || currentStories.length === 0) return;
    
    // Check if yesterday's or today's already exists
    const dateNow = new Date();
    const dayStr = dateNow.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const dayStrAr = dateNow.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
    
    const newArchived: ArchivedNewsletter = {
      id: `custom-${Date.now()}`,
      dateStr: dayStr,
      dateStrAr: dayStrAr,
      themeEn: "Active Telex Wire Dispatch Capture",
      themeAr: "موجز تيلكس حي مقتطع من البث المباشر",
      category: "live-intercept",
      views: Math.floor(Math.random() * 5000) + 1000,
      stories: currentStories
    };

    const updated = [newArchived, ...localArchive];
    setLocalArchive(updated);
    try {
      localStorage.setItem('alwarraq_newsletter_archive', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    
    setLoadedNotification(isAr ? "تم حفظ النسخة الحالية في أرشيف مراجعتك المحلي!" : "Current edition saved locally in your review archive!");
    setTimeout(() => setLoadedNotification(null), 3500);
  };

  const filteredArchive = useMemo(() => {
    const cleanQuery = searchTerm.trim().toLowerCase();
    if (!cleanQuery) return localArchive;

    return localArchive.filter(item => {
      return (
        item.themeEn.toLowerCase().includes(cleanQuery) ||
        item.themeAr.includes(cleanQuery) ||
        item.dateStr.toLowerCase().includes(cleanQuery) ||
        item.dateStrAr.includes(cleanQuery) ||
        item.stories.some(story => 
          story.headlineEn.toLowerCase().includes(cleanQuery) ||
          story.headlineAr.includes(cleanQuery) ||
          story.synopsisEn.toLowerCase().includes(cleanQuery) ||
          story.synopsisAr.includes(cleanQuery) ||
          story.category.toLowerCase().includes(cleanQuery)
        )
      );
    });
  }, [localArchive, searchTerm]);

  const selectedIssue = useMemo(() => {
    return localArchive.find(item => item.id === selectedIssueId) || null;
  }, [localArchive, selectedIssueId]);

  const handleCopyStoryText = (story: NewsletterStory) => {
    const textToCopy = `*${isAr ? story.headlineAr : story.headlineEn}*
${isAr ? story.synopsisAr : story.synopsisEn}
Ref: Al-Warraq Historical Index

👉 Source Dossier: ${story.url}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedStoryId(story.id);
    setTimeout(() => setCopiedStoryId(null), 2500);
  };

  const handleApplyEditionToLiveFeed = (archive: ArchivedNewsletter) => {
    onLoadEdition(archive.stories, archive.id);
    setLoadedNotification(
      isAr 
        ? `تم تحميل أرشيف تيلكس يوم ${archive.dateStrAr} بنجاح إلى شاشة اليوم!`
        : `Successfully loaded telex dispatch from ${archive.dateStr} into today's viewport!`
    );
    setTimeout(() => setLoadedNotification(null), 4000);
  };

  return (
    <div className={`p-1 space-y-6 ${layoutMode === 'classic-print' ? 'text-zinc-900' : 'text-black'}`}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {loadedNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-50 bg-black border-4 border-red-500 text-white p-4 font-mono text-xs shadow-2xl flex items-center gap-3"
          >
            <div className="w-2.5 h-2.5 bg-red-500 animate-ping rounded-none shrink-0" />
            <div className="flex-1">{loadedNotification}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-4 border-black p-6 bg-zinc-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="font-mono text-xxs font-black uppercase text-[#b91c1c] tracking-widest block mb-1">
            {isAr ? 'ديوان الأرشيف العام' : 'THE DIWAN WIRE ARCHIVE'}
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tighter leading-none text-black">
            {isAr ? 'سجلات البريد التاريخية' : 'HISTORICAL COPIES ARCHIVE'}
          </h2>
          <p className="text-zinc-600 font-sans text-xs max-w-xl mt-2 leading-relaxed">
            {isAr 
              ? 'تصفح وقارن طبعات النشرات السابقة التي تم اعتراض كوابلها، مدمجة بخصائص الاقتطاع والمشاركة أو تحميلها للبث الحي مجدداً.' 
              : 'Browse, decode, and reload previous daily transmissions. You can view full content layouts, copy metadata streams, or sync a dispatch back to the primary telex slate.'}
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {currentStories && currentStories.length > 0 && (
            <button
              onClick={handleSaveCurrentToArchive}
              className="bg-black hover:bg-zinc-800 text-white font-mono font-black text-xxs px-4 py-3 border border-black uppercase flex items-center gap-2 transition-all cursor-pointer w-full md:w-auto justify-center"
            >
              <Sparkles size={12} className="text-red-500" />
              <span>{isAr ? 'أرشفة النسخة النشطة حالياً' : 'ARCHIVE ACTIVE DISPATCH'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPONENT COLUMN: ISSUE LIST & SEARCH (GRID-SPAN 5 OR 6) */}
        <div className={`lg:col-span-5 space-y-4 ${selectedIssue ? 'hidden lg:block' : ''}`}>
          
          {/* SEARCH BAR */}
          <div className="relative border-4 border-black flex items-center bg-white">
            <span className="pl-4 pr-2 text-zinc-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isAr ? 'ابحث بالتاريخ، الكلمة، العناوين...' : 'Search dispatches by title, tag, keywords...'}
              className="w-full bg-white text-black font-mono text-xs px-2 py-3.5 outline-none"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="pr-4 text-xs font-mono font-black text-[#b91c1c]"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* HISTORIC ARCHIVE LIST */}
          <div className="space-y-3">
            {filteredArchive.length === 0 ? (
              <div className="border-2 border-dashed border-zinc-300 p-8 text-center bg-white text-zinc-500 font-mono text-xs">
                {isAr ? 'لا توجد سجلات مطابقة لهذا البحث.' : 'No historic records matching selection filters.'}
              </div>
            ) : (
              filteredArchive.map((item) => {
                const isActive = selectedIssueId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedIssueId(item.id)}
                    className={`border-4 border-black p-5 cursor-pointer transition-all hover:translate-y-[-1px] relative flex flex-col justify-between ${
                      isActive 
                        ? 'bg-zinc-100 shadow-[4px_4px_0px_0px_#000]' 
                        : 'bg-white shadow-[2px_2px_0px_0px_#000]'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] font-black uppercase text-white bg-zinc-800 px-1.5 py-0.5">
                            {item.category.toUpperCase()}
                          </span>
                          <span className="font-mono text-[10px] text-zinc-500 font-semibold flex items-center gap-1">
                            <Calendar size={10} />
                            <span>{isAr ? item.dateStrAr : item.dateStr}</span>
                          </span>
                        </div>
                        
                        <h3 className="text-sm font-black text-black leading-snug uppercase">
                          {isAr ? item.themeAr : item.themeEn}
                        </h3>
                      </div>
                      
                      <div className="text-right">
                        <span className="font-mono text-[9px] text-zinc-400 block">VIEWS</span>
                        <span className="font-mono text-xs font-black text-zinc-800">{item.views.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-dashed border-zinc-200">
                      <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase">
                        {item.stories.length} Dispatches Inside
                      </span>
                      
                      <span className="text-red-600 font-mono text-xxs font-black uppercase flex items-center gap-1 group-hover:translate-x-1">
                        <span>{isAr ? 'فك السجلات' : 'DECODE LOG'}</span>
                        <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} />
                      </span>
                    </div>

                    {/* Left aesthetic bar flag */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-black" />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL READER FOR ISSUES (GRID-SPAN 7 OR 12) */}
        <div className={`lg:col-span-7 ${!selectedIssue ? 'hidden lg:block' : 'col-span-12'}`}>
          {selectedIssue ? (
            <div className="border-4 border-black bg-white p-6 md:p-8 shadow-[4px_4px_0px_0px_#000] space-y-6">
              
              {/* BACK ACTION FOR MOBILE VIEW */}
              <button 
                onClick={() => setSelectedIssueId(null)}
                className="lg:hidden flex items-center gap-2 font-mono text-xxs font-black text-red-600 bg-zinc-100 p-2.5 border border-black mb-4 uppercase"
              >
                <ArrowLeft size={13} />
                <span>{isAr ? 'العودة للدليل' : 'BACK TO INDEX LIMIT'}</span>
              </button>

              {/* ARCHIVE HEAD DECK */}
              <div className="pb-6 border-b-4 border-double border-zinc-300">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
                  <div className="bg-red-600 text-white font-mono text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">
                    {isAr ? 'أرشيف تيليكس معتمد' : 'STARK COGNITIVE ARCHIVE'}
                  </div>
                  
                  <span className="font-mono text-xxs font-bold text-zinc-500 flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{isAr ? selectedIssue.dateStrAr : selectedIssue.dateStr}</span>
                  </span>
                </div>

                <h1 className="text-xl md:text-2xl font-sans font-black text-black uppercase leading-tight mt-1">
                  {isAr ? selectedIssue.themeAr : selectedIssue.themeEn}
                </h1>
                
                <p className="text-xxs text-zinc-500 font-mono mt-3 uppercase flex flex-wrap gap-x-4 gap-y-1">
                  <span>INDEX ID: {selectedIssue.id}</span>
                  <span>VIEWS: {selectedIssue.views.toLocaleString()} AUDITED</span>
                  <span>AUTHOR PROFILE: EDITOR-IN-CHIEF OFFICE</span>
                </p>
              </div>

              {/* STORIES RENDERER LIST */}
              <div className="space-y-6">
                {selectedIssue.stories.map((s, index) => (
                  <div key={s.id} className="border-2 border-black p-5 relative bg-zinc-50/50">
                    
                    <span className="absolute top-0 right-0 bg-black text-white text-[8px] font-mono px-2 py-0.5">
                      ARTICLE {index + 1}
                    </span>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[9px] bg-red-600 text-white font-black px-1.5 py-0.5 uppercase">
                        {s.category}
                      </span>
                      <span className="text-xxs font-mono text-zinc-400">Ref: T-{s.id}</span>
                    </div>

                    <h3 className="text-base font-black text-black uppercase leading-tight mb-2">
                      {isAr ? s.headlineAr : s.headlineEn}
                    </h3>

                    <p className="text-xs text-zinc-700 leading-relaxed font-medium mb-4">
                      {isAr ? s.synopsisAr : s.synopsisEn}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-dashed border-zinc-200">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black text-white hover:bg-zinc-800 text-[10px] font-mono font-bold px-3 py-1.5 uppercase flex items-center gap-1.5 transition-colors border border-black"
                      >
                        <span>{isAr ? s.ctaAr : s.ctaEn}</span>
                      </a>

                      <button
                        onClick={() => handleCopyStoryText(s)}
                        className="p-1.5 border border-black hover:bg-zinc-100 text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
                        title={isAr ? 'نسخ النص للحالات' : 'Copy Dispatch CopyText'}
                      >
                        {copiedStoryId === s.id ? (
                          <Check size={13} className="text-green-600" />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* GLOBAL INTERACTIVES */}
              <div className="pt-6 border-t border-double border-zinc-300 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleApplyEditionToLiveFeed(selectedIssue)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white border-2 border-black font-mono font-black text-xs py-3 text-center uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} />
                  <span>{isAr ? "تحميل هذه السجلات للبث المباشر" : "LOAD LOGS INTO TODAY'S SLATE"}</span>
                </button>
                
                <button
                  onClick={() => setSelectedIssueId(null)}
                  className="bg-white hover:bg-zinc-50 border-2 border-black text-black font-mono font-black text-xs py-3 px-6 text-center uppercase tracking-wider transition-colors cursor-pointer block lg:hidden"
                >
                  {isAr ? "إغلاق العرض" : "CLOSE DETAIL"}
                </button>
              </div>

            </div>
          ) : (
            <div className="border-4 border-black border-dashed bg-zinc-50 p-12 text-center h-full flex flex-col justify-center items-center space-y-4">
              <BookOpen size={48} className="text-zinc-400" />
              <div>
                <p className="font-mono text-xs font-black text-black uppercase">
                  {isAr ? 'اختر مجلداً لفك تشفير السجلات التاريخية' : 'NO DOSSIER DECODING ACTIVE'}
                </p>
                <p className="text-xxs text-zinc-500 max-w-xs mx-auto mt-1 leading-relaxed">
                  {isAr 
                    ? 'انقر فوق أي نشرة معروضة بالطرف لفك تشفير تفاصيل الكوابل والمخططات وتعديلات الممرات.' 
                    : 'Click any archival transmission on the left to unpack its multi-channel dispatches, verify references, and review metrics.'}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
