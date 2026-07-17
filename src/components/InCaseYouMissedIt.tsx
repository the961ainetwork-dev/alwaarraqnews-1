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
  Printer,
  Copy,
  Check,
  Share2,
  FileText,
  Shield,
  Clock
} from 'lucide-react';
import { DOSSIER_DESKTOP_META } from './AlWarraqInvestigations';
import { Article } from '../types';

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
    headlineEn: "THE 60-DAY ACCORD DRAFTS: LEAKING WASHINGTON’S PROPOSED STABILITY BLUEPRINTS",
    headlineAr: "تسريبات بروتوكول الـ 60 يوماً: النواة الدبلوماسية للهدنة المتقطعة",
    synopsisEn: "Qatar and Pakistan backchannel logs show rigorous regional investments offered in exchange for a full maritime freeze in Persian waters.",
    synopsisAr: "مسودات دبلوماسية مسربة في الدوحة تكشف عن رغبة غربية لتمويل خطط توسع اقتصادي طموح مقابل تفكيك كلي لحقول الألغام البحرية وهدنة مستدامة.",
    url: "https://alwarraqnews.com/section/editor-desk"
  }
];

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
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  // Copy to clipboard helper
  const handleCopyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {});
  };

  const entirePageUrl = `${window.location.origin}/section/in-case-you-missed-it`;

  return (
    <div 
      id="in-case-you-missed-it-section"
      className="border-4 border-black p-4 md:p-8 bg-[#fbfbfa] text-zinc-900 select-text relative my-4 space-y-8 print:border-none print:bg-white print:p-0"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Newspaper Top Header / Title Block */}
      <div className="border-b-4 border-black pb-2 text-center space-y-3 relative print:border-b-2">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-200 pb-1.5 print:hidden">
          <span>{isAr ? 'تأشيرة أمنية: سرية للغاية' : 'SECURITY LEVEL: RESTRICTED'}</span>
          <span className="font-bold">{isAr ? 'ديوان ورّاق للرصد الاستخباري' : 'AL-WARRAQ INTELLIGENCE REGISTRY'}</span>
          <span>{isAr ? 'طبعة جيو-سياسية ٢٠٢٦' : 'GEOPOLITICAL EDITION 2026'}</span>
        </div>

        {/* Vintage Printed Banner */}
        <div className="py-2">
          <h1 className="font-serif font-black text-3xl sm:text-5xl md:text-6xl text-zinc-900 tracking-tight leading-none uppercase">
            {isAr ? 'برقيات الوارّاق الاستباقية' : 'Al-Warraq Daily Telegrams'}
          </h1>
          <p className="font-mono text-xxs sm:text-xs tracking-wider uppercase text-zinc-500 mt-2">
            {isAr 
              ? 'الأرشيف الميداني الجامع لملفات التيلكس والتحقيقات الجيوسياسية المفقودة'
              : 'The comprehensive field archive of missed telex reports & tactical geopolitics'}
          </p>
        </div>

        {/* Traditional Printed Newspaper Double Borders and Issue Line */}
        <div className="border-t-4 border-b border-zinc-900 py-1.5 flex flex-wrap justify-between items-center text-xxs font-mono font-black tracking-widest text-zinc-700 uppercase">
          <span>{isAr ? 'السنة الرابعة • العدد ٤٢٨٠٠' : 'VOLUME IV • ISSUE 42,800'}</span>
          <span className="bg-zinc-900 text-white px-2 py-0.5 animate-pulse rounded-none print:bg-black">
            {isAr ? 'تحديث حي ومباشر' : 'LIVE FEED ACTIVE'}
          </span>
          <span>{isAr ? '١٧ يوليو ٢٠٢٦' : 'JULY 17, 2026'}</span>
        </div>
      </div>

      {/* Control Panel (Filter and Search Bar) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#f4f3f0] border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] print:hidden">
        
        {/* Search */}
        <div className="md:col-span-4 relative">
          <div className={`absolute inset-y-0 flex items-center pointer-events-none text-zinc-400 ${isAr ? 'right-3' : 'left-3'}`}>
            <Search size={14} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAr ? 'ابحث في البرقيات والملفات...' : 'Search telegram archives...'}
            className={`w-full py-2 border-2 border-zinc-300 focus:border-black focus:ring-0 outline-none font-sans text-xs transition-colors rounded-none bg-white ${isAr ? 'pr-9 pl-4' : 'pl-9 pr-4'}`}
          />
        </div>

        {/* Category selector */}
        <div className="md:col-span-5 flex items-center gap-2">
          <span className="font-mono text-xxs font-bold text-zinc-600 flex items-center gap-1 whitespace-nowrap">
            <Filter size={12} />
            {isAr ? 'القسم:' : 'Category:'}
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2 px-3 border-2 border-zinc-300 focus:border-black outline-none font-sans text-xs rounded-none bg-white cursor-pointer"
          >
            {categoriesList.map(cat => (
              <option key={cat} value={cat}>
                {categoryNameMap[cat] ? (isAr ? categoryNameMap[cat].ar : categoryNameMap[cat].en) : cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Sort and Reset controls */}
        <div className="md:col-span-3 flex items-center gap-2">
          <button
            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
            className="flex-1 py-2 px-3 border-2 border-zinc-300 hover:border-black transition-colors font-mono text-xxs font-black uppercase flex items-center justify-between bg-white cursor-pointer"
          >
            <span className="truncate">{sortOrder === 'desc' ? (isAr ? 'الأحدث أولاً' : 'NEWEST') : (isAr ? 'الأقدم أولاً' : 'OLDEST')}</span>
            <ArrowUpDown size={12} className="text-zinc-600 shrink-0" />
          </button>

          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSortOrder('desc');
            }}
            className="py-2 px-2 bg-white hover:bg-zinc-100 border-2 border-black cursor-pointer transition-all shrink-0"
            title={isAr ? 'تصفير الفلاتر' : 'Reset Filters'}
          >
            <RefreshCw size={13} className="text-zinc-800" />
          </button>
        </div>
      </div>

      {/* Whole Summary Box / Consolidated Executive Summary Section */}
      <div className="border-4 border-black p-6 bg-zinc-900 text-white shadow-[6px_6px_0px_0px_#000] relative overflow-hidden print:border-2 print:shadow-none print:text-black print:bg-white">
        {/* Background Watermark stamp */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] select-none font-sans font-black text-6xl md:text-9xl tracking-widest uppercase pointer-events-none rotate-12 print:hidden">
          {isAr ? 'ملخص سيادي للجريدة' : 'AL-WARRAQ REGISTER'}
        </div>

        <div className="relative z-10 space-y-5">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-700 pb-3 print:border-zinc-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse print:hidden" />
              <span className="font-mono text-xxs font-black tracking-wider uppercase text-red-500 print:text-black">
                {isAr ? 'الموجز الاستخباري والسياسي الموحد' : 'CONSOLIDATED INTELLIGENCE DISPATCH'}
              </span>
            </div>
            <div className="font-mono text-[10px] text-zinc-400 print:text-zinc-600">
              {isAr ? 'بتوقيت بيروت الميداني: ١٧ يوليو ٢٠٢٦' : 'BEIRUT GROUND TIME: JULY 17, 2026'}
            </div>
          </div>

          {/* Title and Summary Text */}
          <div className="space-y-3">
            <h3 className="text-xl md:text-2xl font-serif font-black tracking-tight text-amber-400 print:text-black">
              {isAr 
                ? 'التقرير الجامع للبرقيات الاستباقية: مسارات الالتفاف البديلة، ديون السيادة، وطوق الموارد' 
                : 'CONSOLIDATED EXECUTIVE BRIEFING: Parallel Squeezes, Sovereign Debt, & Resource Blocks'}
            </h3>
            
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans font-medium print:text-zinc-800">
              {isAr 
                ? 'يشهد ميزان القوى الجيوسياسي تحولات متسارعة مع اشتداد الخناق الأميركي على طهران وانهيار تفاهمات المياه الإقليمية. يكشف تتبع البرقيات الميدانية عن تحركات محمومة من الفجيرة والخطوط الحديدية السعودية لتأسيس ممرات طاقة بديلة تتجاوز مضيق هرمز كلياً. بالتوازي، يعاد رسم خرائط البنية التحتية والمدفوعات الأهلية؛ بدءاً من شبكات الأقمار ميكروية المدار في سماء لبنان لتجاوز انقطاع كوابل الأعماق، وصولاً لتشغيل شبكات السداد الرقمية المدعومة بالبلوكشين للتغلب على شلل السيولة ومصير سندات اليوروبوندز اللبنانية عند مستوى ٢٢ سنتاً.'
                : 'A major geopolitical shift is accelerating under intense sanctions and the breakdown of regional water-way pacts. Ground telemetry reveals intense coordinate maneuvers: UAE and Saudi Arabia are rapid-scaling East Coast pipelines and overland rail passes to bypass Strait of Hormuz choking points. Simultaneously, critical communication and domestic financial networks are being re-engineered—ranging from micro-satellite LEO constellations to secure sovereign data in Lebanese skies, to localized offline blockchain ledgers designed to settle neighborhood food trades in the face of distressed debt write-downs and Eurobonds captured in a 22-cent spiral.'}
            </p>
          </div>

          {/* Interactive Source URL for the entire summary */}
          <div className="bg-zinc-800 border border-zinc-700 p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 print:bg-zinc-50 print:border-zinc-300">
            <div className="space-y-0.5">
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block">{isAr ? 'رابط الملف الشامل المصدر:' : 'CONSOLIDATED REGISTRY SOURCE URL:'}</span>
              <span className="font-mono text-xs text-amber-400 break-all select-all font-semibold print:text-zinc-800">{entirePageUrl}</span>
            </div>
            <button
              onClick={() => handleCopyToClipboard(entirePageUrl, 'entire-summary')}
              className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white font-mono text-xxs font-bold uppercase transition-colors shrink-0 flex items-center gap-1 border border-zinc-600 cursor-pointer rounded-none print:hidden"
            >
              {copiedId === 'entire-summary' ? <Check size={11} className="text-green-400 animate-bounce" /> : <Copy size={11} />}
              <span>{copiedId === 'entire-summary' ? (isAr ? 'تم النسخ!' : 'COPIED!') : (isAr ? 'نسخ الرابط' : 'COPY URL')}</span>
            </button>
          </div>

          {/* Toolbar for Whole Summary */}
          <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-zinc-800 print:hidden">
            {/* CTA Button */}
            <button
              onClick={() => {
                if (onNavigateToSection) {
                  onNavigateToSection('premium-pricing');
                }
              }}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-mono text-xxs font-black uppercase transition-all shadow-[2px_2px_0px_0px_#fff] hover:shadow-none cursor-pointer flex items-center gap-1.5 rounded-none"
            >
              <BookOpen size={12} />
              <span>{isAr ? 'اشترك في برقيات التيلكس الحية' : 'SUBSCRIBE TO DIRECT TELEX ALERTS'}</span>
            </button>

            {/* WhatsApp Share Button */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                isAr 
                  ? `*الموجز الاستخباري الموحد من صحيفة الورّاق (١٧ يوليو ٢٠٢٦)*\n\nتحولات متسارعة تشهدها المنطقة مع إعادة هيكلة ممرات الطاقة والاتصالات الموازية.\n\nاقرأ التقرير والبرقيات كاملة عبر موقعنا:\n👉 ${entirePageUrl}`
                  : `*Al-Warraq Consolidated Executive Briefing (July 17, 2026)*\n\nRapid strategic shifts in energy pipelines, micro-satellites, and sovereign debt restructurings.\n\nRead the full telemetry:\n👉 ${entirePageUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xxs font-black uppercase transition-all shadow-[2px_2px_0px_0px_#fff] hover:shadow-none cursor-pointer flex items-center gap-1.5 rounded-none"
            >
              <MessageCircle size={12} />
              <span>{isAr ? 'مشاركة عبر واتساب' : 'SHARE VIA WHATSAPP'}</span>
            </a>

            {/* PDF Export Button */}
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-zinc-700 hover:bg-zinc-800 text-white font-mono text-xxs font-black uppercase transition-all shadow-[2px_2px_0px_0px_#fff] hover:shadow-none cursor-pointer flex items-center gap-1.5 rounded-none"
            >
              <Printer size={12} />
              <span>{isAr ? 'تصدير الملخص كملف PDF' : 'EXPORT AS PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Through-Reading Feed Layout */}
      <div className="space-y-8">
        {filteredNewswires.length === 0 ? (
          <div className="border-2 border-black bg-white p-12 text-center text-zinc-400 font-serif italic text-sm shadow-[4px_4px_0px_0px_#000]">
            {isAr ? 'لا توجد برقيات تطابق شروط البحث والفلاتر المحددة.' : 'No newswire updates found matching your filter criteria.'}
          </div>
        ) : (
          <div className="space-y-10">
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

              // Determine color themes for categories to elevate visual design
              const isUrgent = item.isInvestigation || item.category === 'sovereign-intel' || item.category === 'cyber-finance';

              return (
                <div 
                  key={item.id}
                  className={`border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#222] transition-all duration-200 flex flex-col justify-between gap-5 relative group print:border-b print:border-zinc-300 print:shadow-none print:p-4`}
                >
                  {/* Category Border Highlight Indicator */}
                  <div className={`absolute top-0 bottom-0 w-1.5 ${isAr ? 'right-0' : 'left-0'} ${isUrgent ? 'bg-red-700' : 'bg-zinc-800'} group-hover:w-2 transition-all`} />

                  {/* Top Header details inside the block */}
                  <div className="space-y-3 pl-3 pr-3">
                    {/* Index Stamp and Category Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-2 text-[10px] font-mono text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-red-700 uppercase tracking-wider">
                          {isAr ? `نشرة رقم: № ${item.id.toUpperCase()}` : `№ ${item.id.toUpperCase()}`}
                        </span>
                        <span className="text-zinc-300">•</span>
                        <span className="inline-flex items-center gap-1 font-bold">
                          <Calendar size={11} className="text-zinc-400" />
                          <span>{isAr ? item.dateAr : item.date}</span>
                        </span>
                        <span className="text-zinc-300">•</span>
                        <span className="inline-flex items-center gap-1 font-black uppercase px-2 py-0.5 bg-zinc-100 text-zinc-700 text-[9px] border border-zinc-200">
                          <Tag size={9} className="text-zinc-500" />
                          {categoryMapped}
                        </span>
                      </div>

                      {/* Display Index stamp */}
                      <span className="text-[10px] font-mono font-bold text-zinc-300 select-none group-hover:text-zinc-500">
                        {(index + 1).toString().padStart(2, '0')} / {filteredNewswires.length}
                      </span>
                    </div>

                    {/* Headline */}
                    <h4 
                      onClick={handleNavigation}
                      className="font-serif font-black text-lg md:text-2xl text-zinc-900 hover:text-red-700 transition-colors leading-snug cursor-pointer hover:underline"
                      style={{ textAlign: isAr ? 'right' : 'left' }}
                    >
                      {isAr ? item.headlineAr : item.headlineEn}
                    </h4>

                    {/* Reference and Copy Source Link block */}
                    <div className="bg-[#fcfcfb] border border-zinc-200 p-2.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 print:border-zinc-100">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[9px] font-black text-zinc-400 uppercase tracking-widest">{isAr ? 'رمز المعرّف والمستند:' : 'DOCUMENT SOURCE PATH:'}</span>
                        <a 
                          href={realUrl}
                          onClick={handleNavigation}
                          className="font-mono text-[10px] text-red-700 hover:text-black hover:underline font-bold bg-zinc-50 border border-zinc-200 px-2 py-0.5 transition-all flex items-center gap-1.5 truncate max-w-xs md:max-w-md"
                        >
                          <span>{relativeUrlPath}</span>
                          <ExternalLink size={9} />
                        </a>
                      </div>
                      <button
                        onClick={() => handleCopyToClipboard(realUrl, item.id)}
                        className="px-2 py-0.5 bg-white hover:bg-zinc-100 text-zinc-700 font-mono text-[9px] font-extrabold uppercase transition-colors border border-zinc-300 flex items-center gap-1 cursor-pointer rounded-none print:hidden shrink-0"
                        title={isAr ? 'نسخ رابط الخبر' : 'Copy link'}
                      >
                        {copiedId === item.id ? <Check size={10} className="text-green-500 animate-bounce" /> : <Copy size={10} />}
                        <span>{copiedId === item.id ? (isAr ? 'تم!' : 'COPIED!') : (isAr ? 'نسخ' : 'COPY')}</span>
                      </button>
                    </div>

                    {/* Synopsis */}
                    <div 
                      className="text-xs md:text-sm text-zinc-700 leading-relaxed font-sans font-medium"
                      style={{ textAlign: isAr ? 'right' : 'left' }}
                    >
                      {isAr ? item.synopsisAr : item.synopsisEn}
                    </div>
                  </div>

                  {/* Story Action Buttons Toolbar */}
                  <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-2.5 text-xxs font-mono pl-3 pr-3 print:hidden">
                    {/* CTA Button: Read Full Dispatch */}
                    <button
                      onClick={handleNavigation}
                      className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-black transition-all cursor-pointer rounded-none uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000] hover:shadow-none"
                    >
                      <BookOpen size={11} />
                      <span>{isAr ? 'اقرأ كامل البرقية والاستخبارات' : 'READ FULL DISPATCH'}</span>
                    </button>

                    {/* WhatsApp share story */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        isAr 
                          ? `*برقية من ديوان الورّاق:*\n\n*${item.headlineAr}*\n\n${item.synopsisAr}\n\n👉 اقرأ التحليل الكامل بالرابط المتضمن:\n${realUrl}`
                          : `*Sovereign Dispatch from Al-Warraq:*\n\n*${item.headlineEn}*\n\n${item.synopsisEn}\n\n👉 Read full details:\n${realUrl}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black transition-colors cursor-pointer rounded-none uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000] hover:shadow-none"
                      title={isAr ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
                    >
                      <MessageCircle size={11} />
                      <span>{isAr ? 'مشاركة واتساب' : 'SHARE'}</span>
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
                      className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold transition-colors border border-zinc-300 cursor-pointer rounded-none uppercase flex items-center gap-1.5"
                      title={isAr ? 'حفظ بصيغة PDF' : 'Save as PDF'}
                    >
                      <Printer size={11} />
                      <span>{isAr ? 'ملف PDF' : 'PRINT PDF'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Retro bottom printed footer note */}
      <div className="border-2 border-zinc-300 bg-zinc-100 p-4 text-center font-mono text-[10px] text-zinc-500 uppercase font-bold tracking-wider print:border-none print:bg-white">
        {isAr 
          ? 'تم تفويض وأرشفة هذه المصفوفة الميدانية لـ "فاتك قراءته" طبقاً لمنشورات ديوان الوراق المستقل.' 
          : 'Historic telemetry compiled under the legal and professional guidelines of Al-Warraq registry systems.'}
      </div>
    </div>
  );
}
