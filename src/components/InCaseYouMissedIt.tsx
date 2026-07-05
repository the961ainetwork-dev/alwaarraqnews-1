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
  BookOpen
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

interface InCaseYouMissedItProps {
  language: 'ar' | 'en';
  onNavigateToSection?: (sectionId: string) => void;
  onSelectDossier?: (id: string) => void;
}

export default function InCaseYouMissedIt({ language, onNavigateToSection, onSelectDossier }: InCaseYouMissedItProps) {
  const isAr = language === 'ar';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Dynamically merge the 11 dossiers into the newswire list
  const combinedNewswires = useMemo(() => {
    const list = [...NEWSWIRES];
    Object.entries(DOSSIER_DESKTOP_META).forEach(([id, meta]) => {
      list.push({
        id: id,
        date: "2026-06-20", // Grouped in June 2026
        dateAr: "٢٠ يونيو ٢٠٢٦",
        category: "investigations",
        categoryAr: "تحقيقات استقصائية",
        headlineEn: `INVESTIGATION: ${meta.titleEn}`,
        headlineAr: `تحقيق استقصائي: ${meta.titleAr}`,
        synopsisEn: meta.descEn,
        synopsisAr: meta.descAr,
        url: `https://alwarraqnews.com/section/alwarraq-investigations?dossier=${id}`,
        isInvestigation: true
      });
    });
    return list;
  }, []);

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

  const categoryNameMap: Record<string, { en: string, ar: string }> = {
    'all': { en: 'All Categories', ar: 'جميع الأقسام' },
    'techno-politics': { en: 'Techno-Politics', ar: 'سياسة تكنولوجية' },
    'cyber-finance': { en: 'Cyber-Finance', ar: 'تمويل سيبراني' },
    'resource-friction': { en: 'Resource Friction', ar: 'نزاع الموارد' },
    'sovereign-intel': { en: 'Sovereign Intel', ar: 'استخبارات سيادية' },
    'supply-chains': { en: 'Supply Chains', ar: 'سلاسل الإمداد' },
    'telecom-internet': { en: 'Telecom & Internet', ar: 'الاتصالات والإنترنت' },
    'investigations': { en: 'Special Investigations', ar: 'تحقيقات استقصائية' }
  };

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

      {/* Main Responsive Columns Table */}
      <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] overflow-hidden">
        {filteredNewswires.length === 0 ? (
          <div className="p-12 text-center text-zinc-400 font-serif italic text-sm">
            {isAr ? 'لا توجد برقيات تطابق شروط البحث والفلاتر المحددة.' : 'No newswire updates found matching your filter criteria.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-zinc-950 text-white font-mono text-[10px] md:text-xs tracking-widest uppercase border-b-4 border-black">
                  <th className="py-4 px-4 text-center w-28 border-r border-zinc-800">
                    {isAr ? 'التاريخ والرمز' : 'DATE & INDEX'}
                  </th>
                  <th className="py-4 px-4">
                    {isAr ? 'البرقية والخلاصة والتحليل' : 'TELEGRAM BRIEF & SYNOPSIS'}
                  </th>
                  <th className="py-4 px-4 w-36 text-center border-l border-zinc-800">
                    {isAr ? 'القسم' : 'CATEGORY'}
                  </th>
                  <th className="py-4 px-4 w-32 text-center border-l border-zinc-800">
                    {isAr ? 'رابط الإحالة' : 'DESTINATION'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-300 font-sans">
                {filteredNewswires.map((item, index) => {
                  const categoryMapped = categoryNameMap[item.category] 
                    ? (isAr ? categoryNameMap[item.category].ar : categoryNameMap[item.category].en) 
                    : item.category.toUpperCase();

                  const sectionId = item.isInvestigation ? 'alwarraq-investigations' : (item.url.split('/').pop() || 'all');
                  const realUrl = item.isInvestigation 
                    ? `${window.location.origin}/?category=alwarraq-investigations&dossier=${item.id}`
                    : `${window.location.origin}/section/${sectionId}`;
                  const relativeUrlPath = item.isInvestigation
                    ? `/section/alwarraq-investigations?dossier=${item.id}`
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
                    } else {
                      if (onNavigateToSection) {
                        onNavigateToSection(sectionId);
                      }
                    }
                  };

                  return (
                    <tr 
                      key={item.id} 
                      className="hover:bg-amber-500/5 transition-colors group align-top"
                    >
                      {/* Column 1: Date & ID */}
                      <td className="py-5 px-4 text-center border-r border-zinc-200 bg-zinc-50/50 font-mono text-[10px] space-y-1">
                        <div className="flex items-center justify-center gap-1 text-zinc-500">
                          <Calendar size={11} />
                          <span>{isAr ? item.dateAr : item.date}</span>
                        </div>
                        <div className="font-extrabold text-red-700 tracking-wider">
                          #{item.id.toUpperCase()}
                        </div>
                        <div className="text-[9px] text-zinc-400 font-medium">
                          {(index + 1).toString().padStart(2, '0')} / {filteredNewswires.length}
                        </div>
                      </td>

                      {/* Column 2: Headline & Synopsis (Under it) */}
                      <td className="py-5 px-5 space-y-2">
                        <h4 
                          onClick={handleNavigation}
                          className="font-sans font-black text-sm md:text-base text-zinc-900 group-hover:text-red-700 transition-colors leading-snug cursor-pointer hover:underline"
                        >
                          {isAr ? item.headlineAr : item.headlineEn}
                        </h4>
                        <p className="text-xs md:text-[13px] text-zinc-600 leading-relaxed font-sans font-medium">
                          {isAr ? item.synopsisAr : item.synopsisEn}
                        </p>

                        {/* Quick Action Share Row for Investigations */}
                        {item.isInvestigation && (
                          <div className="pt-2.5 flex flex-wrap items-center gap-1.5 text-[9px] font-mono select-none" onClick={(e) => e.stopPropagation()}>
                            <span className="text-zinc-400 font-black uppercase tracking-wider">{isAr ? 'بث سريع:' : 'TRANSMIT:'}</span>
                            
                            {/* WhatsApp */}
                            <a
                              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${isAr ? 'تقرير استقصائي سيادي من الورّاق:\n\n' : 'Classified investigation dossier from Al-Warraq:\n\n'}*${isAr ? item.headlineAr : item.headlineEn}*\n\n👉 ${window.location.origin}/?category=alwarraq-investigations&dossier=${item.id}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-0.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors uppercase rounded-none cursor-pointer"
                              title={isAr ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
                            >
                              WA
                            </a>

                            {/* Copy Link */}
                            <button
                              onClick={() => {
                                const shareUrl = `${window.location.origin}/?category=alwarraq-investigations&dossier=${item.id}`;
                                navigator.clipboard.writeText(shareUrl).then(() => {
                                  alert(isAr ? 'تم نسخ الرابط!' : 'Copied link!');
                                });
                              }}
                              className="px-2 py-0.5 bg-zinc-800 hover:bg-black text-white font-bold transition-colors border border-black cursor-pointer rounded-none"
                            >
                              LINK
                            </button>

                            {/* PDF Download */}
                            <button
                              onClick={() => {
                                if (onSelectDossier) {
                                  onSelectDossier(item.id);
                                }
                                if (onNavigateToSection) {
                                  onNavigateToSection('alwarraq-investigations');
                                }
                                setTimeout(() => {
                                  window.print();
                                }, 300);
                              }}
                              className="px-2 py-0.5 bg-red-900 hover:bg-red-950 text-white font-bold transition-colors border border-red-950 cursor-pointer rounded-none"
                              title={isAr ? 'تحميل كملف PDF' : 'Download as PDF'}
                            >
                              PDF
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Column 3: Category */}
                      <td className="py-5 px-4 text-center border-l border-zinc-200">
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-black uppercase px-2.5 py-1 bg-zinc-100 text-zinc-800 border border-zinc-300 rounded-sm">
                          <Tag size={9} className="text-zinc-500" />
                          {categoryMapped}
                        </span>
                      </td>

                      {/* Column 4: URL */}
                      <td className="py-5 px-4 text-center border-l border-zinc-200 bg-zinc-50/50">
                        <a
                          href={realUrl}
                          onClick={handleNavigation}
                          className="inline-flex items-center gap-1.5 font-mono text-xxs font-black text-red-700 hover:text-black hover:underline transition-colors uppercase border border-red-200 hover:border-black bg-white px-2.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                        >
                          <span>{relativeUrlPath}</span>
                          <ExternalLink size={10} className="shrink-0" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
