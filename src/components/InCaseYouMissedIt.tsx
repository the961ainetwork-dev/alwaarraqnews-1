import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bookmark, 
  ExternalLink, 
  Search, 
  Filter, 
  Calendar, 
  RefreshCw, 
  Tag, 
  Compass,
  ArrowUpDown,
  BookOpen,
  MessageCircle,
  Printer
} from 'lucide-react';
import { DOSSIER_DESKTOP_META } from './AlWarraqInvestigations';

interface NewswireItem {
  id: string;
  date: string;
  dateAr: string;
  category: string;
  categoryAr: string;
  headlineEn: string;
  headlineAr: string;
  synopsisEn: string;
  synopsisAr: string;
  url: string;
  isInvestigation?: boolean;
}

// Pre-seeded list of daily newswires, ordered newest to oldest
const NEWSWIRES: NewswireItem[] = [
  {
    id: "nw-09",
    date: "2026-06-17",
    dateAr: "١٧ يونيو ٢٠٢٦",
    category: "techno-politics",
    categoryAr: "سياسة تكنولوجية",
    headlineEn: "THE US-IRAN SWAP: THE RECOIL OF THE 2026 WAR AND THE ACCELERATED SHUNT",
    headlineAr: "تسونامي التفاهم: زلزال توقيع مذكرة واشنطن وطهران ومسارات الالتفاف الطاقي واللوجستي الجريئة",
    synopsisEn: "Now that the US-Iran MOU is signed, Gulf powers rapid-run pipeline expansions and cross-peninsula railways to bypass Strait of Hormuz pressure. Who stands to benefit?",
    synopsisAr: "الآن بعد توقيع مذكرة التفاهم بين الولايات المتحدة وإيران، ماذا بعد؟ دول المنطقة تتحرك بسرعة فائقة لتكييف بنيتها اللوجستية وتوسيع شبكات الأنابيب والسكك لتفادي طائلة حصار مضيق هرمز الحرج.",
    url: "https://alwarraqnews.com/section/editor-desk"
  },
  {
    id: "nw-08",
    date: "2026-06-17",
    dateAr: "١٧ يونيو ٢٠٢٦",
    category: "cyber-finance",
    categoryAr: "تمويل سيبراني",
    headlineEn: "THE LIQUIDITY ESCROLL: LEBANON EUROBONDS CAPTURED IN THE 22-CENT SWIRL",
    headlineAr: "الملتفّ المالي: سندات يوروبوندز لبنان تنجرف في دوّامة الـ 22 سنتاً",
    synopsisEn: "A high-stakes chess match unfolds in post-war Lebanon as distressed debt funds brace for restructured haircuts. Behind closed doors, elite advisors recalculate exit yields against regional risk premiums.",
    synopsisAr: "معادلة صعبة تصيب السندات السيادية اللبنانية في أعقاب صدمات الحرب المستمرة في الشرق الأوسط. وفي كواليس المكاتب المغلقة، يعيد المستشارون تصفير التوقعات مع اتساع تكلفة المخاطر وتأجيل الإصلاحات التشريعية.",
    url: "https://alwarraqnews.com/section/editor-desk"
  },
  {
    id: "nw-07",
    date: "2026-06-17",
    dateAr: "١٧ يونيو ٢٠٢٦",
    category: "techno-politics",
    categoryAr: "سياسة تكنولوجية",
    headlineEn: "SUBSEA MONOPOLY: THE COLD WAR ALONG SILICON TELECOM SHORES",
    headlineAr: "احتكار القاع: حياكة أسلاك الحرب الباردة فوق كوابل الاتصالات البحرية",
    synopsisEn: "Sovereign superpowers are silently rerouting optical fiber highways along deep marine shelves. The ambition is not merely connectivity—it is absolute territorial surveillance under the guise of cloud infrastructure.",
    synopsisAr: "قوى سيادية تعيد مد الطرق البحرية للألياف البصرية عبر الجروف القارية العميقة بنشاط هائل. طموح الاندفاع الجديد لا يقتصر على ربط القارات بالمقومات الرقمية، بل يهدف إلى إرساء مراقبة كلية شاملة تحت غطاء السحاب.",
    url: "https://alwarraqnews.com/section/telecom-internet"
  },
  {
    id: "nw-06",
    date: "2026-06-17",
    dateAr: "١٧ يونيو ٢٠٢٦",
    category: "resource-friction",
    categoryAr: "نزاع الموارد",
    headlineEn: "DESERT KINETICS: THE ECO-AGRI RESISTANCE IN THE SEMI-ARID PLAIN",
    headlineAr: "حركية البادية: مقاومة زراعية ذكية لصد اختلال المناخ في وهاد البقاع",
    synopsisEn: "Amidst extreme regional droughts, cooperative farmers deploy miniature solar telemetry grids to reclaim dry fields. The agricultural revolution is offline, independent, and strictly decentralized.",
    synopsisAr: "في قلب مواسم الجفاف القاسية، يبتكر مزارعو البقاع مجسات رطوبة وشمسيات هجينة لاستنقاذ التربة من وهن العطش. الثورة الزراعية الجديدة تبدأ لا مركزية، مستقلة، وخارج تغطية الشبكات الموحدة.",
    url: "https://alwarraqnews.com/section/lebanon"
  },
  {
    id: "nw-05",
    date: "2026-06-17",
    dateAr: "١٧ يونيو ٢٠٢٦",
    category: "sovereign-intel",
    categoryAr: "استخبارات سيادية",
    headlineEn: "THE ALGORITHMIC EXPURGATORY: CRITICAL JOURNALISM TO OVERRIDE SYNTHETIC NOISE",
    headlineAr: "التصفية الخوارزمية: زاوية الحبر والتحقيق تصعد لمقاومة السيل التقني الزائف",
    synopsisEn: "As global feeds are flooded with synthetic generative noise, elite field reporters double down on handwritten logs and physical verify channels. Authenticity is now a form of systemic rebellion.",
    synopsisAr: "بينما تجتاح الخورازميات فضاء تلقي الأخبار ببريق زائف مكرر، يلوذ المراقبون بالتحقيق الميداني المدقّق والمشاهدة الحية المباشرة. باتت الحقيقة المحققة تمثل اليوم شكلًا صارمًا من العصيان المعرفي.",
    url: "https://alwarraqnews.com/section/exclusives"
  },
  {
    id: "nw-04",
    date: "2026-06-16",
    dateAr: "١٦ يونيو ٢٠٢٦",
    category: "resource-friction",
    categoryAr: "نزاع الموارد",
    headlineEn: "THE FUJAIRAH SPEED-RUN: SECOND PIPELINE DOUBLE-LOCKS EMIRATIAN FLOWS",
    headlineAr: "حركية الفجيرة: الإسراع في بناء خط الشرق-الغرب المزدوج لتجاوز هرمز",
    synopsisEn: "UAE greenlights immediate scaling of East coast pipeline capacity, assuring secondary global output bypass lines are operational ahead of schedule.",
    synopsisAr: "الإمارات تعلن رسمياً تسريع خطوط أنابيب النفط والغاز للالتفاف الكلي على مضيق هرمز لضمان وصول الإمدادات العالمية عبر ميناء الفجيرة.",
    url: "https://alwarraqnews.com/section/middle-east"
  },
  {
    id: "nw-03",
    date: "2026-06-16",
    dateAr: "١٦ يونيو ٢٠٢٦",
    category: "supply-chains",
    categoryAr: "سلاسل الإمداد",
    headlineEn: "SAR ARAB PASS: OVERLAND RAIL DESERT CHANNELS CUT CARGO DURATION IN HALF",
    headlineAr: "قطارات السيادة: شبكة سار الدولية للبضائع تعيد تشكيل زمن النقل عبر البادية",
    synopsisEn: "Saudi Railways initiates full-load dry corridors spanning from Eastern ports to Jordanian borderlines, circumventing maritime bottlenecks.",
    synopsisAr: "الخطوط الحديدية السعودية تطبق ممراً دولياً سريعاً ينقل الحاويات من شواطئ الخليج الشرقية للمنفذ الأردني، مقتطعاً نصف زمن الشحن البحري.",
    url: "https://alwarraqnews.com/section/markets"
  },
  {
    id: "nw-02",
    date: "2026-06-15",
    dateAr: "١٥ يونيو ٢٠٢٦",
    category: "telecom-internet",
    categoryAr: "الاتصالات والإنترنت",
    headlineEn: "LEBANON OVER THE SATELLITE: COMMENCING LOCALIZED LEO STATION ARRAYS",
    headlineAr: "أقمار الحبر: بدء تشغيل مصفوفات أقمار ميكروية لحماية سيادة الاتصال بلبنان",
    synopsisEn: "With subsea assets vulnerable under geopolitical friction, domestic cooperatives test microwave and LEO beams to shield public data channels.",
    synopsisAr: "وسط هشاشة كوابل الأعماق، يبدأ تقنيون لبنانيون حياكة شبكات سحابية بديلة من الأقمار منخفضة المدار لضمان استمرارية الصحافة والخدمات الأساسية.",
    url: "https://alwarraqnews.com/section/telecom-internet"
  },
  {
    id: "nw-01",
    date: "2026-06-15",
    dateAr: "١٥ يونيو ٢٠٢٦",
    category: "cyber-finance",
    categoryAr: "تمويل سيبراني",
    headlineEn: "THE CRYPTO-PAPYRUS: BEIRUT DIGITAL INDEX STABILIZES INTERNAL TRADES",
    headlineAr: "العملات الرقمية المحلية: تسوية التحويلات الأهلية وسط شلل الثقة بالبنوك",
    synopsisEn: "Independent blockchain node developers implement offline-safe ledgers to clear daily food and logistics trade settlements in Beirut suburbs.",
    synopsisAr: "مطورو البرمجيات الحرة في بيروت يطلقون شبكات دفع مدعومة برمز مشفر لتسهيل التعاملات الأهلية بعيداً عن أزمة السيولة وعقم التسهيلات المصرفية.",
    url: "https://alwarraqnews.com/section/markets"
  },
  {
    id: "nw-00",
    date: "2026-06-14",
    dateAr: "١٤ يونيو ٢٠٢٦",
    category: "techno-politics",
    categoryAr: "سياسة تكنولوجية",
    headlineEn: "THE 60-DAY ACCORD DRAFTS: LEAKING WASHINGTON’S PROPOSED STABILITY Blueprints",
    headlineAr: "تسريبات بروتوكول الـ 60 يوماً: النواة الدبلوماسية للهدنة المتقطعة",
    synopsisEn: "Qatar and Pakistan backchannel logs show rigorous regional investments offered in exchange for a full maritime freeze in Persian waters.",
    synopsisAr: "مسودات دبلوماسية مسربة في الدوحة تكشف عن رغبة غربية لتمويل خطط توسع اقتصادي طموح مقابل تفكيك كلي لحقول الألغام البحرية وهدنة مستدامة.",
    url: "https://alwarraqnews.com/section/editor-desk"
  }
];

import { Article } from '../types';

interface InCaseYouMissedItProps {
  language: 'ar' | 'en';
  allArticles?: Article[];
  onNavigateToSection?: (sectionId: string) => void;
  onSelectDossier?: (id: string) => void;
  onSelectArticle?: (article: Article) => void;
}

export default function InCaseYouMissedIt({ 
  language, 
  allArticles, 
  onNavigateToSection, 
  onSelectDossier,
  onSelectArticle
}: InCaseYouMissedItProps) {
  const isAr = language === 'ar';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const categoryNameMap: Record<string, { en: string, ar: string }> = {
    'all': { en: 'All Categories', ar: 'جميع الأقسام' },
    'techno-politics': { en: 'Techno-Politics', ar: 'سياسة تكنولوجية' },
    'cyber-finance': { en: 'Cyber-Finance', ar: 'تمويل سيبراني' },
    'resource-friction': { en: 'Resource Friction', ar: 'نزاع الموارد' },
    'sovereign-intel': { en: 'Sovereign Intel', ar: 'استخبارات سيادية' },
    'supply-chains': { en: 'Supply Chains', ar: 'سلاسل الإمداد' },
    'telecom-internet': { en: 'Telecom & Internet', ar: 'الاتصالات والإنترنت' },
    'investigations': { en: 'Special Investigations', ar: 'تحقيقات استقصائية' },
    'lebanon': { en: 'Lebanon News', ar: 'أخبار لبنان' },
    'middle-east': { en: 'Middle East Core', ar: 'شؤون الشرق الأوسط' },
    'markets': { en: 'Sovereign Markets', ar: 'أسواق المال' },
    'arab-markets': { en: 'Arab Markets Indicators', ar: 'الأسواق العربية' },
    'exclusives': { en: 'Investigations', ar: 'التحقيقات الصحفية' },
    'economy': { en: 'Economy', ar: 'الاقتصاد' }
  };

  // Dynamically merge the 11 dossiers and all other articles into the newswire list
  const combinedNewswires = useMemo(() => {
    const list = [...NEWSWIRES].map(item => ({
      ...item,
      isInvestigation: false,
      isArticleObject: false,
      articleObject: undefined as Article | undefined
    }));
    
    // Track added IDs to avoid duplicates
    const addedIds = new Set(list.map(item => item.id));

    // Helper to format date in Arabic
    const formatDateAr = (dateStr: string) => {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      
      const monthsAr: Record<string, string> = {
        '01': 'يناير', '02': 'فبراير', '03': 'مارس', '04': 'أبريل',
        '05': 'مايو', '06': 'يونيو', '07': 'يوليو', '08': 'أغسطس',
        '09': 'سبتمبر', '10': 'أكتوبر', '11': 'نوفمبر', '12': 'ديسمبر'
      };

      const toArDigits = (numStr: string) => {
        const arDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return numStr.split('').map(char => {
          const val = parseInt(char, 10);
          return isNaN(val) ? char : arDigits[val];
        }).join('');
      };

      const monthName = monthsAr[month] || month;
      return `${toArDigits(parseInt(day, 10).toString())} ${monthName} ${toArDigits(year)}`;
    };

    // First merge dossiers from DOSSIER_DESKTOP_META
    Object.entries(DOSSIER_DESKTOP_META).forEach(([id, meta]) => {
      if (addedIds.has(id)) return;

      // Find matching article in allArticles to get its actual date if available
      const matchedArticle = allArticles?.find(a => a.id === id);
      const itemDate = matchedArticle?.date || "2026-06-20";
      const itemDateAr = matchedArticle?.date ? formatDateAr(matchedArticle.date) : "٢٠ يونيو ٢٠٢٦";

      list.push({
        id: id,
        date: itemDate,
        dateAr: itemDateAr,
        category: "investigations",
        categoryAr: "تحقيقات استقصائية",
        headlineEn: `INVESTIGATION: ${meta.titleEn}`,
        headlineAr: `تحقيق استقصائي: ${meta.titleAr}`,
        synopsisEn: matchedArticle?.summaryEn || meta.descEn,
        synopsisAr: matchedArticle?.summaryAr || meta.descAr,
        url: `https://alwarraqnews.com/section/alwarraq-investigations?dossier=${id}`,
        isInvestigation: true,
        isArticleObject: true,
        articleObject: matchedArticle
      });
      addedIds.add(id);
    });

    // Also merge other general articles from allArticles to keep the list completely fresh!
    if (allArticles) {
      allArticles.forEach(article => {
        if (addedIds.has(article.id)) return;

        // Skip categories that do not fit the news-wire layout
        const skipCategories = ['instats', 'videos', 'podcast', 'what-if-simulator', 'premium-pricing', 'newsletter'];
        if (skipCategories.includes(article.category)) return;

        list.push({
          id: article.id,
          date: article.date,
          dateAr: formatDateAr(article.date),
          category: article.category,
          categoryAr: categoryNameMap[article.category]?.ar || article.category,
          headlineEn: article.titleEn,
          headlineAr: article.titleAr,
          synopsisEn: article.summaryEn || article.excerptEn || '',
          synopsisAr: article.summaryAr || article.excerptAr || '',
          url: `https://alwarraqnews.com/section/${article.category}?article=${article.id}`,
          isInvestigation: article.category === 'exclusives' || article.category === 'alwarraq-investigations',
          isArticleObject: true,
          articleObject: article
        });
        addedIds.add(article.id);
      });
    }

    return list;
  }, [allArticles]);

  // Compute unique categories
  const categoriesList = useMemo(() => {
    const cats = new Set(combinedNewswires.map(item => item.category));
    return ['all', ...Array.from(cats)];
  }, [combinedNewswires]);

  // Filter & Sort using combined feed
  const filteredNewswires = useMemo(() => {
    let result = combinedNewswires.filter(item => {
      const matchSearch = 
        item.headlineEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.headlineAr.includes(searchTerm) ||
        item.synopsisEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.synopsisAr.includes(searchTerm);
      
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchSearch && matchCat;
    });

    return result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [combinedNewswires, searchTerm, selectedCategory, sortOrder]);

  return (
    <div 
      id="in-case-you-missed-it-section"
      className="border-4 border-black p-4 md:p-8 bg-zinc-50 text-zinc-900 select-text font-sans relative my-4 space-y-6 md:space-y-8"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Decorative Stamp */}
      <div className="absolute top-4 right-4 md:right-8 opacity-10 select-none hidden md:block">
        <Bookmark size={120} className="text-zinc-900" />
      </div>

      {/* Header Grid */}
      <div className="border-b-4 border-black pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-800 border border-amber-500/30 px-3 py-1 text-[10px] font-mono tracking-wider uppercase font-extrabold rounded-sm">
            <BookOpen size={11} className="text-amber-700 animate-pulse" />
            <span>{isAr ? 'برقيات سيادية ورصد ميداني' : 'SOVEREIGN FEED & GROUND INTEL'}</span>
          </div>
          <h2 className="font-sans font-black text-2xl md:text-4xl text-black tracking-tight uppercase leading-none">
            {isAr ? 'في حال فاتك' : 'In Case You Missed It'}
          </h2>
          <p className="text-xs md:text-sm text-zinc-600 max-w-2xl">
            {isAr 
              ? 'الأرشيف الميداني المتكامل لبرقيات تيلكس والتحقيقات الجيوسياسية مرتبة من الأحدث إلى الأقدم لقراءات استثنائية مكثفة.' 
              : 'Chronological telemetry and deep field telegram briefs. Your essential logbook of missed critical updates and tactical intelligence.'}
          </p>
        </div>

        <button 
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
            setSortOrder('desc');
          }}
          className="font-mono text-xxs font-black bg-white hover:bg-zinc-100 border-2 border-black px-3 py-1.5 cursor-pointer uppercase transition-all flex items-center gap-1.5 self-stretch md:self-auto justify-center"
        >
          <RefreshCw size={11} />
          <span>{isAr ? 'تصفير الفلاتر' : 'RESET FILTERS'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
        
        {/* Search */}
        <div className="md:col-span-4 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-400">
            <Search size={14} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAr ? 'ابحث في البرقيات...' : 'Search telegrams...'}
            className="w-full pl-9 pr-4 py-2 border-2 border-zinc-200 focus:border-black focus:ring-0 outline-none font-sans text-xs transition-colors rounded-none"
          />
        </div>

        {/* Category selector */}
        <div className="md:col-span-5 flex items-center gap-2">
          <span className="font-mono text-xxs font-bold text-zinc-500 flex items-center gap-1 whitespace-nowrap">
            <Filter size={11} />
            {isAr ? 'القسم:' : 'Category:'}
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2 px-3 border-2 border-zinc-200 focus:border-black outline-none font-sans text-xs rounded-none bg-white cursor-pointer"
          >
            {categoriesList.map(cat => (
              <option key={cat} value={cat}>
                {categoryNameMap[cat] ? (isAr ? categoryNameMap[cat].ar : categoryNameMap[cat].en) : cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div className="md:col-span-3 flex items-center justify-end gap-2">
          <span className="font-mono text-xxs font-bold text-zinc-500 whitespace-nowrap">
            {isAr ? 'الترتيب:' : 'Sort:'}
          </span>
          <button
            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
            className="w-full py-2 px-3 border-2 border-zinc-200 hover:border-black transition-colors font-mono text-xxs font-black uppercase flex items-center justify-between bg-white cursor-pointer"
          >
            <span>{sortOrder === 'desc' ? (isAr ? 'الأحدث أولاً' : 'NEWEST FIRST') : (isAr ? 'الأقدم أولاً' : 'OLDEST FIRST')}</span>
            <ArrowUpDown size={12} className="text-zinc-600" />
          </button>
        </div>
      </div>

      {/* Consolidated Executive Summary Section */}
      <div className="border-4 border-black p-6 bg-zinc-900 text-white shadow-[6px_6px_0px_0px_#000] relative overflow-hidden my-6">
        {/* watermark/stamp in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none font-sans font-black text-6xl md:text-8xl tracking-widest uppercase pointer-events-none rotate-12">
          {isAr ? 'ملخص سيادي' : 'SOVEREIGN BRIEF'}
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-700 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="font-mono text-xxs font-black tracking-wider uppercase text-red-500">
                {isAr ? 'الموجز الاستخباري والسياسي الموحد' : 'CONSOLIDATED INTELLIGENCE DISPATCH'}
              </span>
            </div>
            <div className="font-mono text-[10px] text-zinc-400">
              {isAr ? 'بتوقيت بيروت ونيويورك: ١٧ يوليو ٢٠٢٦' : 'BEIRUT & NY TIME: JULY 17, 2026'}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-amber-400 font-sans">
              {isAr 
                ? 'التقرير الجامع للبرقيات الاستباقية: مسارات الالتفاف البديلة، ديون السيادة، وطوق الموارد' 
                : 'CONSOLIDATED EXECUTIVE BRIEFING: Parallel Squeezes, Sovereign Debt, & Resource Blocks'}
            </h3>
            
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
              {isAr 
                ? 'يشهد ميزان القوى الجيوسياسي تحولات متسارعة مع اشتداد الخناق الأميركي على طهران وانهيار تفاهمات المياه الإقليمية. يكشف تتبع البرقيات الميدانية عن تحركات محمومة من الفجيرة والخطوط الحديدية السعودية لتأسيس ممرات طاقة بديلة تتجاوز مضيق هرمز كلياً. بالتوازي، يعاد رسم خرائط البنية التحتية والمدفوعات الأهلية؛ بدءاً من شبكات الأقمار ميكروية المدار في سماء لبنان لتجاوز انقطاع كوابل الأعماق، وصولاً لتشغيل شبكات السداد الرقمية المدعومة بالبلوكشين للتغلب على شلل السيولة ومصير سندات اليوروبوندز اللبنانية عند مستوى ٢٢ سنتاً.'
                : 'A major geopolitical shift is accelerating under intense sanctions and the breakdown of regional water-way pacts. Ground telemetry reveals intense coordinate maneuvers: UAE and Saudi Arabia are rapid-scaling East Coast pipelines and overland rail passes to bypass Strait of Hormuz choking points. Simultaneously, critical communication and domestic financial networks are being re-engineered—ranging from micro-satellite LEO constellations to secure sovereign data in Lebanese skies, to localized offline blockchain ledgers designed to settle neighborhood food trades in the face of distressed debt write-downs and Eurobonds captured in a 22-cent spiral.'}
            </p>
          </div>

          {/* Buttons for Whole Summary */}
          <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-zinc-800">
            {/* CTA Button */}
            <button
              onClick={() => {
                if (onNavigateToSection) {
                  onNavigateToSection('premium-pricing');
                }
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-mono text-xxs font-black uppercase transition-all shadow-[2px_2px_0px_0px_#fff] hover:shadow-none cursor-pointer flex items-center gap-1.5 rounded-none"
            >
              <BookOpen size={12} />
              <span>{isAr ? 'اشتراك في برقيات التيلكس الحية' : 'SUBSCRIBE TO DIRECT TELEX ALERTS'}</span>
            </button>

            {/* WhatsApp Share Button */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                isAr 
                  ? `*الموجز الاستخباري الجامع من ديوان الورّاق (١٧ يوليو ٢٠٢٦)*\n\nتحولات متسارعة تشهدها المنطقة مع إعادة هيكلة ممرات الطاقة والاتصالات الموازية.\n\nاقرأ التقرير كاملاً:\n👉 ${window.location.origin}/section/in-case-you-missed-it`
                  : `*Al-Warraq Consolidated Executive Briefing (July 17, 2026)*\n\nRapid strategic shifts in energy pipelines, micro-satellites and sovereign debt restructurings.\n\nRead the full telemetry:\n👉 ${window.location.origin}/section/in-case-you-missed-it`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xxs font-black uppercase transition-all shadow-[2px_2px_0px_0px_#fff] hover:shadow-none cursor-pointer flex items-center gap-1.5 rounded-none"
            >
              <MessageCircle size={12} />
              <span>{isAr ? 'مشاركة عبر واتساب' : 'SHARE BRIEF VIA WHATSAPP'}</span>
            </a>

            {/* PDF Export Button */}
            <button
              onClick={() => {
                window.print();
              }}
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-800 text-white font-mono text-xxs font-black uppercase transition-all shadow-[2px_2px_0px_0px_#fff] hover:shadow-none cursor-pointer flex items-center gap-1.5 rounded-none"
            >
              <Printer size={12} />
              <span>{isAr ? 'تصدير الملخص كملف PDF' : 'EXPORT BRIEF AS PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Through-Reading Feed Layout */}
      <div className="space-y-6">
        {filteredNewswires.length === 0 ? (
          <div className="border-4 border-black bg-white p-12 text-center text-zinc-400 font-serif italic text-sm shadow-[4px_4px_0px_0px_#000]">
            {isAr ? 'لا توجد برقيات تطابق شروط البحث والفلاتر المحددة.' : 'No newswire updates found matching your filter criteria.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredNewswires.map((item, index) => {
              const categoryMapped = categoryNameMap[item.category] 
                ? (isAr ? categoryNameMap[item.category].ar : categoryNameMap[item.category].en) 
                : item.category.toUpperCase();

              const sectionId = item.isInvestigation ? 'alwarraq-investigations' : (item.url?.split('/').pop()?.split('?')[0] || 'all');
              
              const realUrl = item.isInvestigation 
                ? `${window.location.origin}/?category=alwarraq-investigations&dossier=${item.id}`
                : item.isArticleObject
                  ? `${window.location.origin}/?article=${item.id}`
                  : `${window.location.origin}/section/${sectionId}`;
                  
              const relativeUrlPath = item.isInvestigation
                ? `/section/alwarraq-investigations?dossier=${item.id}`
                : item.isArticleObject
                  ? `/?article=${item.id}`
                  : `/section/${sectionId}`;

              const handleNavigation = (e: React.MouseEvent) => {
                e.preventDefault();
                if (item.isInvestigation) {
                  if (onSelectDossier) {
                    onSelectDossier(item.id);
                  }
                  if (onNavigateToSection) {
                    onNavigateToSection('alwarraq-investigations');
                  }
                } else if (item.isArticleObject && item.articleObject) {
                  if (onSelectArticle) {
                    onSelectArticle(item.articleObject);
                  }
                } else {
                  if (onNavigateToSection) {
                    onNavigateToSection(sectionId);
                  }
                }
              };

              return (
                <div 
                  key={item.id}
                  className="border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#b91c1c] hover:border-[#b91c1c] transition-all duration-200 flex flex-col justify-between gap-4 relative group"
                >
                  {/* Story Index Stamp */}
                  <div className="absolute top-4 left-4 font-mono text-[9px] font-black text-zinc-300 select-none group-hover:text-red-200 transition-colors">
                    {(index + 1).toString().padStart(2, '0')} / {filteredNewswires.length}
                  </div>

                  <div className="space-y-3">
                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-zinc-500">
                      <span className="inline-flex items-center gap-1 text-zinc-500 font-bold">
                        <Calendar size={11} />
                        <span>{isAr ? item.dateAr : item.date}</span>
                      </span>
                      <span className="text-zinc-300">•</span>
                      <span className="font-extrabold text-red-700 uppercase tracking-wide">
                        #{item.id.toUpperCase()}
                      </span>
                      <span className="text-zinc-300">•</span>
                      <span className="inline-flex items-center gap-1 font-black uppercase px-1.5 py-0.5 bg-zinc-100 text-zinc-700 text-[9px] border border-zinc-200 rounded-sm">
                        <Tag size={9} />
                        {categoryMapped}
                      </span>
                    </div>

                    {/* Headline */}
                    <h4 
                      onClick={handleNavigation}
                      className="font-sans font-black text-base md:text-xl text-zinc-900 hover:text-[#b91c1c] transition-colors leading-snug cursor-pointer hover:underline"
                      style={{ textAlign: isAr ? 'right' : 'left' }}
                    >
                      {isAr ? item.headlineAr : item.headlineEn}
                    </h4>

                    {/* Reference Link row */}
                    <div className="flex flex-wrap items-center gap-1.5" style={{ direction: 'ltr', justifyContent: isAr ? 'flex-start' : 'flex-start' }}>
                      <span className="font-mono text-xxs font-bold text-zinc-400">SOURCE URL:</span>
                      <a 
                        href={realUrl}
                        onClick={handleNavigation}
                        className="font-mono text-[10px] text-red-700 hover:text-black font-semibold bg-zinc-50 border border-zinc-200 hover:border-black px-2 py-0.5 transition-colors flex items-center gap-1"
                      >
                        <span>{relativeUrlPath}</span>
                        <ExternalLink size={9} />
                      </a>
                    </div>

                    {/* Synopsis */}
                    <p 
                      className="text-xs md:text-sm text-zinc-600 leading-relaxed font-sans font-medium"
                      style={{ textAlign: isAr ? 'right' : 'left' }}
                    >
                      {isAr ? item.synopsisAr : item.synopsisEn}
                    </p>
                  </div>

                  {/* Story Action Buttons Toolbar */}
                  <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center gap-2 text-xxs font-mono">
                    {/* CTA: Read Full Story */}
                    <button
                      onClick={handleNavigation}
                      className="px-3 py-1.5 bg-black hover:bg-zinc-800 text-white font-extrabold transition-colors cursor-pointer rounded-none uppercase flex items-center gap-1"
                    >
                      <BookOpen size={11} />
                      <span>{isAr ? 'اقرأ كامل البرقية' : 'READ FULL DISPATCH'}</span>
                    </button>

                    {/* WhatsApp share story */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        isAr 
                          ? `*برقية سيادية من ديوان الورّاق:*\n\n*${item.headlineAr}*\n\n${item.synopsisAr}\n\n👉 اقرأ التفاصيل الكاملة:\n${realUrl}`
                          : `*Sovereign Dispatch from Al-Warraq:*\n\n*${item.headlineEn}*\n\n${item.synopsisEn}\n\n👉 Read full details:\n${realUrl}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold transition-colors cursor-pointer rounded-none uppercase flex items-center gap-1"
                      title={isAr ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
                    >
                      <MessageCircle size={11} />
                      <span>{isAr ? 'مشاركة' : 'SHARE'}</span>
                    </a>

                    {/* PDF Download story */}
                    <button
                      onClick={() => {
                        if (item.isInvestigation) {
                          if (onSelectDossier) {
                            onSelectDossier(item.id);
                          }
                          if (onNavigateToSection) {
                            onNavigateToSection('alwarraq-investigations');
                          }
                        } else if (item.isArticleObject && item.articleObject) {
                          if (onSelectArticle) {
                            onSelectArticle(item.articleObject);
                          }
                        }
                        setTimeout(() => {
                          window.print();
                        }, 300);
                      }}
                      className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-extrabold transition-colors border border-zinc-300 cursor-pointer rounded-none uppercase flex items-center gap-1"
                      title={isAr ? 'حفظ بصيغة PDF' : 'Save as PDF'}
                    >
                      <Printer size={11} />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Retro bottom dispatch note */}
      <div className="border-2 border-zinc-300 bg-zinc-100 p-4 text-center font-mono text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
        {isAr 
          ? 'تم إصدار هذه المصفوفة التاريخية لـ "فاتك قراءته" وفق نظام حوكمة البيانات المعتمد بموجب طبعة ٢٠٢٦.' 
          : 'Historic matrices compiled under the authority guidelines of Al-Warraq news registry systems.'}
      </div>
    </div>
  );
}
