import React, { useState } from 'react';
import { 
  Building2, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  BarChart3, 
  PieChart, 
  Globe2, 
  Layers, 
  FileText, 
  Ship, 
  Plane, 
  Hotel, 
  Factory, 
  Zap, 
  Wifi, 
  HeartPulse, 
  ShoppingCart, 
  GraduationCap, 
  Fuel, 
  Truck, 
  Anchor,
  Share2,
  Copy,
  Check,
  Download,
  Info,
  DollarSign,
  ChevronRight,
  Filter
} from 'lucide-react';

interface SpMiddleEastWarGCCInfographicProps {
  language: 'ar' | 'en';
}

export const SpMiddleEastWarGCCInfographic: React.FC<SpMiddleEastWarGCCInfographicProps> = ({ language }) => {
  const isAr = language === 'ar';

  const [activeScenario, setActiveScenario] = useState<'base' | 'downside'>('base');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'HIGH' | 'MODERATE' | 'DEFENSIVE'>('ALL');
  const [activeSectorId, setActiveSectorId] = useState<string | null>('hospitality');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareWhatsApp = (title: string, text: string) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`*${title}*\n\n${text}\n\n👉 ${window.location.href}`)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Data for Chart 1 (Base Case Impact Score 1-10) and Chart 2 (Downside Impact Score 1-10)
  const sectors = [
    {
      id: 'hospitality',
      icon: Hotel,
      titleAr: 'الفندقة والسياحة',
      titleEn: 'Hospitality & Tourism',
      category: 'HIGH',
      baseRisk: 8.5,
      downsideRisk: 9.8,
      keyStatAr: 'هبوط إشغال فنادق دبي إلى ٣٣٪ في آذار ٢٠٢٦ (مقابل ٨٤٫٧٪ في شباط)',
      keyStatEn: 'Dubai hotel occupancy dropped to 33% in Mar 2026 (from 84.7% in Feb)',
      descAr: 'انخفاض حاد في نسب الإشغال مع خروج ٥,٤٠٠ غرفة من الخدمة للتجديد أو الإغلاق المؤقت. تباطؤ التعافي الكامل حتى نهاية ٢٠٢٧.',
      descEn: 'Severe drop in occupancy with 5,400 rooms temporarily removed from supply. Full recovery delayed to end of 2027.',
      ratingsImpactAr: 'مراجعة نظرة مستقبلية إلى سلبية لشركة FIVE Holdings (BB-)',
      ratingsImpactEn: 'Outlook revised to Negative for FIVE Holdings (BB-)'
    },
    {
      id: 'real_estate_dev',
      icon: Building2,
      titleAr: 'التطوير العقاري (السكني والتجاري)',
      titleEn: 'Real Estate Developers',
      category: 'HIGH',
      baseRisk: 7.8,
      downsideRisk: 9.2,
      keyStatAr: 'تراجع مبيعات دبي الشهرية إلى ١٢,٨٨٧ عقاراً (مقابل ١٧,١٩٨ في بداية العام)',
      keyStatEn: 'Dubai monthly sales dropped to 12,887 (vs 17,198 avg Jan-Feb)',
      descAr: 'انخفاض المبيعات المسبقة مع دخول ٢٠٪ وحدات جديدة في دبي بحلول ٢٠٢٨. حساسية عالية للعمالة الوافدة والاستثمار الأجنبي.',
      descEn: 'Declining presales with 20% additional unit supply in Dubai by 2028. High vulnerability to expatriate outflows.',
      ratingsImpactAr: 'نظرة سلبية لـ Omniyat Holdings (BB-) و PNC Investments/Sobha (BB)',
      ratingsImpactEn: 'Negative Outlook on Omniyat Holdings (BB-) & PNC Investments/Sobha (BB)'
    },
    {
      id: 'luxury_real_estate',
      icon: Building2,
      titleAr: 'العقارات الفاخرة للغاية',
      titleEn: 'Luxury Real Estate Developers',
      category: 'HIGH',
      baseRisk: 7.2,
      downsideRisk: 9.0,
      keyStatAr: '٢٩٦ صفقة فائقة الفخامة بقيمة ٥٫١ مليار دولار في دبي خلال النصف الأول',
      keyStatEn: '296 ultra-luxury sales worth $5.1B in Dubai during H1 2026',
      descAr: 'المشترون المحليون يعوضون تراجع المستثمرين الأجانب مؤقتاً، لكن القطاع أشد حساسيات لتحولات المكاتب العائلية الأجنبية.',
      descEn: 'Local buyers buffered foreign pullback temporarily, but sector remains highly sensitive to HNWI capital flight.',
      ratingsImpactAr: 'مخاطر تباطؤ حاد في صفقات النخبة عند طول الصراع',
      ratingsImpactEn: 'Risk of sharp deceleration in ultra-luxury transactions if war persists'
    },
    {
      id: 'aviation',
      icon: Plane,
      titleAr: 'الطيران والمطارات',
      titleEn: 'Aviation & Airports',
      category: 'HIGH',
      baseRisk: 8.0,
      downsideRisk: 9.5,
      keyStatAr: 'تراجع مسافري مطار دبي بـ ٢٠٫٦٪ والشحن بـ ٢٢٫٧٪ في الربع الأول',
      keyStatEn: 'Dubai airport Q1 pax down 20.6% YoY & cargo down 22.7%',
      descAr: 'إغلاق الممرات الجوية وارتفاع كلفة وقود الطيران والتأمين ضد مخاطر الحرب يضغط على هوامش ربحية شركات الطيران.',
      descEn: 'Airspace closures, soaring jet fuel costs, and war risk insurance heavily weigh on airline EBITDA margins.',
      ratingsImpactAr: 'ضغوط تشغيلية مرتفعة على طيران الإمارات، القطري، والخليجي',
      ratingsImpactEn: 'High operational pressures across GCC hub carriers'
    },
    {
      id: 'logistics',
      icon: Ship,
      titleAr: 'النقل والشحن اللوجستي (مضيق هرمز)',
      titleEn: 'Transportation & Logistics (Hormuz)',
      category: 'HIGH',
      baseRisk: 8.8,
      downsideRisk: 9.7,
      keyStatAr: 'هبوط عبور سفن هرمز إلى أقل من ٢٠-٤٠ سفينة/يومياً (مقابل ١٤٠ سابقاً)',
      keyStatEn: 'Hormuz daily ship transits dropped to under 20-40 (vs 140 pre-war)',
      descAr: 'قفزة بأقساط التأمين ضد مخاطر الحرب من ٠٫٢٥٪ إلى ٣٪-٤٪ من قيمة السفينة. تحول نحو الشحن البري والمسارات البديلة.',
      descEn: 'War risk premiums jumped from 0.25% to 3%-4% of vessel value. Rerouting to overland corridors and Fujairah/Sohar.',
      ratingsImpactAr: 'اختناقات سلاسل الإمداد وارتفاع تكاليف الشحن البحري',
      ratingsImpactEn: 'Supply chain bottlenecks and severe maritime rate inflation'
    },
    {
      id: 'construction',
      icon: Factory,
      titleAr: 'الإنشاءات والمقاولات',
      titleEn: 'Construction & Contracting',
      category: 'HIGH',
      baseRisk: 7.5,
      downsideRisk: 8.8,
      keyStatAr: 'ارتفاع تكاليف البناء في الإمارات بـ ٧٪-١٢٪ والسعودية بـ ٥٪-٨٪ لعام ٢٠٢٦',
      keyStatEn: 'UAE building costs up 7%-12% & KSA up 5%-8% in 2026',
      descAr: 'انكماش هوامش أرباح المقاولين بعقود الأسعار الثابتة. ضغوط لتعديل العقود لتفادي توقف مشاريع بـ ٣٠٦ مليارات دولار.',
      descEn: 'Margin compression for fixed-price contractors. Re-negotiation pressures to avoid project delays on $306B pipeline.',
      ratingsImpactAr: 'ضغوط سيولة على الشركات المتوسطة والصغيرة بالمقاولات',
      ratingsImpactEn: 'Liquidity pressures on mid-tier contracting entities'
    },
    {
      id: 'oil_gas',
      icon: Fuel,
      titleAr: 'النفط والغاز والخدمات البترولية',
      titleEn: 'Oil & Gas (Upstream & Services)',
      category: 'MODERATE',
      baseRisk: 6.5,
      downsideRisk: 8.5,
      keyStatAr: 'احتجاز وإغلاق إنتاج نحو ١٫٣ مليار برميل نفط ومكثفات',
      keyStatEn: '1.3 Billion barrels of crude & condensate shut-in or trapped',
      descAr: 'أسعار برنت مرتفعة ($١١٠ في الأساسي)، لكن إغلاق المضيق يحرم دولاً بلا مسارات بديلة (قطر، الكويت، العراق) من التصدير.',
      descEn: 'High Brent crude ($110 base case) offsets volume losses for UAE/KSA pipeline routes, but severe for Qatar/Kuwait.',
      ratingsImpactAr: 'مرونة عالية للسعودية والإمارات بفضل أنابيب شرق-غرب وحبشان',
      ratingsImpactEn: 'Stronger resilience for KSA & UAE due to bypass pipelines'
    },
    {
      id: 'petrochem',
      icon: Layers,
      titleAr: 'البتروكيماويات والأسمدة',
      titleEn: 'Chemicals & Petrochemicals',
      category: 'MODERATE',
      baseRisk: 6.8,
      downsideRisk: 8.6,
      keyStatAr: 'الخليج يزود ٤٧٪ من الكبريت و٣٥٪ من اليوريا و٢٥٪ من البوليمرات عالمياً',
      keyStatEn: 'GCC accounts for 47% global sulfur, 35% urea, 25% polymers',
      descAr: 'تخفيض معدلات التشغيل وإعلان حالات القوة القاهرة في مجمعات راس لفان والجبيـل، مع ارتفاع أسعار المنتج النهائي.',
      descEn: 'Force majeure declarations and lower plant utilization, partially offset by global chemical price spikes.',
      ratingsImpactAr: 'تأثير غير متكافئ بحسب موقع المصانع وقربها من موانئ خارج هرمز',
      ratingsImpactEn: 'Uneven impact based on proximity to non-Hormuz ports'
    },
    {
      id: 'metals',
      icon: Anchor,
      titleAr: 'المعادن والتعدين (الألومنيوم)',
      titleEn: 'Metals & Mining (Aluminum)',
      category: 'MODERATE',
      baseRisk: 6.2,
      downsideRisk: 8.2,
      keyStatAr: 'تضرر مصهرين بالإمارات والبحرين وخروج ٣ ملايين طن ألومنيوم',
      keyStatEn: '2 smelters damaged in UAE & Bahrain removing 3M metric tons',
      descAr: 'المنطقة تنتج ٨٪-٩٪ من الألومنيوم العالمي. إعادة إعمار الطاقة الإنتاجية تستغرق حتى سنة كاملة وتتطلب نفقات إضافية.',
      descEn: 'Middle East produces 8%-9% global aluminum. Capacity restoration requires up to 12 months capex investment.',
      ratingsImpactAr: 'تداعيات سلاسل التوريد وارتفاع كلفة الشحن المادي',
      ratingsImpactEn: 'Supply chain disruptions and physical damage capex burdens'
    },
    {
      id: 'consumer_discretionary',
      icon: ShoppingCart,
      titleAr: 'التجزئة والسلع الاستهلاكية الترفيهية',
      titleEn: 'Consumer Discretionary & Retail',
      category: 'MODERATE',
      baseRisk: 6.0,
      downsideRisk: 8.0,
      keyStatAr: 'تراجع القوة الشرائية وإنفاق السياح والمقيمين على السلع الفاخرة',
      keyStatEn: 'Drop in tourism and expat discretionary spending on luxury goods',
      descAr: 'ضغط على هوامش أرباح سيارات وساعات وسياحة السلع الفاخرة نتيجة ارتفاع تكاليف الشحن وهبوط التدفق السياحي.',
      descEn: 'Margin pressure on luxury retail and automotive due to freight costs and lower international visitor footprint.',
      ratingsImpactAr: 'تأثر مباشر بأسواق دبي والدوحة ذات النسبة العالية للوافدين',
      ratingsImpactEn: 'Direct impact in Dubai and Doha expat-dense retail centers'
    },
    {
      id: 'consumer_staples',
      icon: ShoppingCart,
      titleAr: 'الأغذية والسلع الأساسية (غير الترفيهية)',
      titleEn: 'Consumer Staples & Food Security',
      category: 'DEFENSIVE',
      baseRisk: 3.5,
      downsideRisk: 5.5,
      keyStatAr: 'ارتفاع مؤشر دروري لشحن الحاويات بـ ١٤٤٪ إلى ٤,٦٣٩ دولاراً',
      keyStatEn: 'Drewry Container Shipping Index up 144% to $4,639/FEU',
      descAr: 'طلب مرن وصامد. حكومات الخليج تضع الأمن الغذائي أولوية قصوى ودعم الأسعار يحد من انكشاف الشركات.',
      descEn: 'Resilient demand. GCC government food security mandates mitigate availability risks despite freight inflation.',
      ratingsImpactAr: 'مرونة ائتمانية عالية واستقرار في أرباح المبيعات الأساسية',
      ratingsImpactEn: 'High credit resilience and steady revenues'
    },
    {
      id: 'telecom',
      icon: Wifi,
      titleAr: 'الحديث والاتصالات وتقنية المعلومات',
      titleEn: 'Telecommunications',
      category: 'DEFENSIVE',
      baseRisk: 2.5,
      downsideRisk: 4.0,
      keyStatAr: 'استقرار الإيرادات المفوترة ونمو الطلب على حزم الإنترنت المنزلي',
      keyStatEn: 'Stable post-paid revenues & surge in home broadband usage',
      descAr: 'قطاع دفاعي قوي يتغذى على المزايا الاحتكارية المرتفعة، والعقود الحكومية، وطلب العمل والتعليم عن بُعد.',
      descEn: 'Defensive moat supported by high post-paid market share, government contracts, and work-from-home demand.',
      ratingsImpactAr: 'جودة ائتمانية ممتازة واستقرار ائتماني ثابت (e&, stc, Ooredoo)',
      ratingsImpactEn: 'Top-tier credit stability (e&, stc, Ooredoo)'
    },
    {
      id: 'utilities',
      icon: Zap,
      titleAr: 'المرافق العامة (الكهرباء والمياه)',
      titleEn: 'Utilities (Power & Water)',
      category: 'DEFENSIVE',
      baseRisk: 2.0,
      downsideRisk: 3.5,
      keyStatAr: 'طلب غير مرن مدعوم بمخزونات احتياطية وتوفر الموانئ البديلة',
      keyStatEn: 'Inelastic demand backed by on-site reserves & non-Hormuz ports',
      descAr: 'أعلى القطاعات صموداً واستقراراً، بفضل العقود طويلة الأجل مع الحكومات واستخدام موانئ الفجيرة وصحار للتوريد.',
      descEn: 'Most resilient sector with sovereign-backed long-term off-take agreements and bypass port access (Fujairah/Sohar).',
      ratingsImpactAr: 'تصنيفات ائتمانية مستقرة ومحمية هيكلياً',
      ratingsImpactEn: 'Structurally protected and stable credit ratings'
    },
    {
      id: 'healthcare',
      icon: HeartPulse,
      titleAr: 'الرعاية الصحية والمستشفيات',
      titleEn: 'Healthcare & Pharmaceuticals',
      category: 'DEFENSIVE',
      baseRisk: 3.0,
      downsideRisk: 5.0,
      keyStatAr: 'نمو مرضى الإمارات بـ ٣٪-٧٪ في الربع الأول وتأمين إجباري شامل',
      keyStatEn: 'UAE patient volume up 3%-7% in Q1 with mandatory health insurance',
      descAr: 'التأمين الصحّي الإلزامي يدعم الإيرادات، مع أولوية للشحنات الطبية الدوائية عبر الموانئ والمطارات.',
      descEn: 'Mandatory insurance underpins revenues, with priority customs clearing for essential medical shipments.',
      ratingsImpactAr: 'أداء مستقر ومخاطر منخفضة للغاية',
      ratingsImpactEn: 'Stable performance with low rating risks'
    },
    {
      id: 'education',
      icon: GraduationCap,
      titleAr: 'التعليم والمدارس الخاصة (K-12)',
      titleEn: 'Education (K-12 Private Schools)',
      category: 'DEFENSIVE',
      baseRisk: 3.8,
      downsideRisk: 6.2,
      keyStatAr: 'تجميد الأقساط المدرسية واستقرار التسجيل في المدارس الوطنية',
      keyStatEn: 'Tuition freezes and stable enrollment in national curricula',
      descAr: 'انكشاف معتدل بالمرتكزات الوطنية (السعودية وعُمان)، ومخاطر متوسطة في دبي والبحرين حال مغادرة عائلات الوافدين.',
      descEn: 'Low risk in KSA/Oman with high citizen bases; moderate vulnerability in UAE/Bahrain to expat family outflows.',
      ratingsImpactAr: 'تأثير معتدل محصور بمدارس المناهج الأجنبية والوافدين',
      ratingsImpactEn: 'Moderate impact confined to international expat schools'
    }
  ];

  const filteredSectors = sectors.filter(s => {
    if (selectedCategory === 'ALL') return true;
    return s.category === selectedCategory;
  });

  const activeSector = sectors.find(s => s.id === activeSectorId) || sectors[0];

  return (
    <div className="bg-[#0b0f17] text-zinc-100 rounded-xl border border-zinc-800 p-4 md:p-8 font-sans space-y-8 select-text shadow-2xl overflow-hidden relative">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Header Banner */}
      <div className="relative z-10 border-b border-zinc-800 pb-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-[#c20000] text-white font-mono font-black text-[10px] px-2.5 py-1 rounded uppercase tracking-widest flex items-center gap-1.5 shadow-md">
              <BarChart3 size={12} />
              S&P GLOBAL RATINGS
            </span>
            <span className="bg-zinc-800 text-amber-400 border border-amber-500/30 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
              {isAr ? 'تحليل الحساسية الخاص لعام ٢٠٢٦' : '2026 SPECIAL CREDIT REPORT'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleShareWhatsApp(
                isAr ? 'تقرير ستاندرد آند بورز: مخاطر حرب الشرق الأوسط على شركات الخليج' : 'S&P Global Report: GCC Corporate Sector War Risks',
                isAr ? 'تحليل شامل من وكالة ستاندرد آند بورز لـ ١٥ قطاعاً اقتصادياً في دول الخليج تحت سيناريوهين' : 'S&P Global Ratings sensitivity & scenario analysis of 15 GCC corporate sectors under war conditions.'
              )}
              className="bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 hover:text-white px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Share2 size={12} />
              <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedLink ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copiedLink ? (isAr ? 'تم النسخ' : 'COPIED') : (isAr ? 'نسخ الرابط' : 'COPY LINK')}</span>
            </button>
          </div>
        </div>

        <div className="space-y-2 text-right rtl:text-right ltr:text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-sans tracking-tight leading-snug">
            {isAr 
              ? 'تحليل الحساسية والسيناريوهات: حرب الشرق الأوسط تخلق مخاطر غير متكافئة لقطاعات الشركات في دول مجلس التعاون الخليجي'
              : 'Scenario & Sensitivity Analysis: Middle East War Creates Uneven Risk For GCC Corporate Sectors'
            }
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 font-serif italic max-w-4xl leading-relaxed">
            {isAr 
              ? 'تقييم ائتماني شامل صادق عن وكالة ستاندرد آند بورز العالمية (S&P Global Ratings) يحلل أثر الاضطرابات الممتدة في مضيق هرمز وارتفاع تكاليف اللوجستيات وتبادلات الإنفاق الرأسمالي على ١٥ قطاعاً خليجياً.'
              : 'Official credit analysis by S&P Global Ratings assessing the structural shift from immediate operational shock to prolonged uncertainty across 15 GCC corporate sectors.'
            }
          </p>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-lg space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
              {isAr ? 'الربحية والتكاليف اللوجستية' : 'Profitability & Freight'}
            </span>
            <p className="text-xs text-zinc-300 font-medium">
              {isAr ? 'تراجع أرباح جميع القطاعات بحلول نهاية ٢٠٢٦ بسبب تضاعف كلفة الشحن والـ War Risk' : 'Profitability drops across almost all sectors by end-2026 due to freight inflation.'}
            </p>
          </div>
          <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-lg space-y-1">
            <span className="text-[10px] font-mono text-red-400 uppercase font-bold block">
              {isAr ? 'الإنفاق الرأسمالي والدين' : 'Capex & Debt Issuance'}
            </span>
            <p className="text-xs text-zinc-300 font-medium">
              {isAr ? 'إعادة تقييم الاستثمارات التوسعية وانخفاض حجم إصدارات أدوات الدين بالسوق' : 'Postponement of discretionary capex and lower bond/sukuk issuance volumes.'}
            </p>
          </div>
          <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-lg space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
              {isAr ? 'القطاعات الدفاعية' : 'Defensive Moats'}
            </span>
            <p className="text-xs text-zinc-300 font-medium">
              {isAr ? 'صمود ممتاز للمرافق (الكهرباء والماء) والاتصالات والرعاية الصحية والأغذية' : 'Utilities, Telecom, Healthcare, & Food Staples remain highly resilient.'}
            </p>
          </div>
          <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-lg space-y-1">
            <span className="text-[10px] font-mono text-blue-400 uppercase font-bold block">
              {isAr ? 'المصدات السيادية vs الشركات' : 'Sovereign vs Corporate'}
            </span>
            <p className="text-xs text-zinc-300 font-medium">
              {isAr ? 'استقرار التصنيفات السيادية للخليج بفعل الاحتياطيات الضخمة خلافاً للشركات' : 'Sovereign credit ratings remain stable due to massive liquid fiscal buffers.'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Scenario Toggle Banner */}
      <div className="relative z-10 bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-sm font-mono font-bold text-amber-300 uppercase tracking-wide flex items-center gap-2">
              <Layers size={14} />
              {isAr ? 'اختر سيناريو النمذجة الائتمانية لـ S&P' : 'Select S&P Rating Macro Scenario'}
            </h3>
            <p className="text-xs text-zinc-400">
              {isAr 
                ? 'مقارنة السيناريو الأساسي (تعافي تدريجي بالنصف الثاني) بالسيناريو التنازلي (صراع ممتد وتآكل هيكلي)'
                : 'Compare Base Case (Second-half supply easing) with Downside Scenario (Multi-year persistent conflict)'
              }
            </p>
          </div>

          <div className="flex items-center gap-1 bg-black p-1 rounded-lg border border-zinc-800 shrink-0">
            <button
              onClick={() => setActiveScenario('base')}
              className={`px-4 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                activeScenario === 'base'
                  ? 'bg-amber-500 text-black shadow-md font-extrabold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isAr ? 'السيناريو الأساسي (Base)' : 'Base Case Scenario'}
            </button>
            <button
              onClick={() => setActiveScenario('downside')}
              className={`px-4 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                activeScenario === 'downside'
                  ? 'bg-red-600 text-white shadow-md font-extrabold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isAr ? 'السيناريو التنازلي (Downside)' : 'Downside Scenario'}
            </button>
          </div>
        </div>

        {/* Dynamic Scenario Highlights Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-right rtl:text-right ltr:text-left">
          {activeScenario === 'base' ? (
            <>
              <div className="bg-amber-950/30 border border-amber-800/50 p-3 rounded-lg space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold block">
                  {isAr ? 'افتراضات برنت وشحن هرمز' : 'Brent & Hormuz Volume Assumptions'}
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {isAr 
                    ? 'انفراج تدريجي لاضطرابات هرمز بالنصف الثاني لعام ٢٠٢٦ مع متوسط تصدير ٧٥٪ من أحجام ما قبل الحرب. سعر برنت يبلغ $١١٠ لعام ٢٠٢٦ و$٨٠ لعام ٢٠٢٧.'
                    : 'Hormuz shipments average 75% of pre-war volumes in H2 2026. Brent crude averages $110/bbl in 2026 and $80/bbl in 2027.'
                  }
                </p>
              </div>
              <div className="bg-amber-950/30 border border-amber-800/50 p-3 rounded-lg space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold block">
                  {isAr ? 'النمو الاقتصادي لدول الخليج' : 'GCC Real GDP Impact'}
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {isAr 
                    ? 'انخفاض الناتج المحلي الإجمالي الحقيقي للخليج بمتوسط ٣٪ في ٢٠٢٦. نمو إيجابي بالسعودية (+٢٫٦٪) وعُمان (+١٫٦٪) والإمارات (+١٫٥٪).'
                    : 'GCC real GDP declines by 3% average in 2026, with KSA (+2.6%), Oman (+1.6%), and UAE (+1.5%) maintaining growth.'
                  }
                </p>
              </div>
              <div className="bg-amber-950/30 border border-amber-800/50 p-3 rounded-lg space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold block">
                  {isAr ? 'نطاق إجراءات التصنيف الائتماني' : 'Credit Action Range'}
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {isAr 
                    ? 'تعديل نظرات مستقبلية لسلبية في قطاعات السياحة والعقار المكتظة بالديون (مثل FIVE وSobha وOmniyat) دون تخفيضات جماعية واسعة.'
                    : 'Selective negative outlook revisions for debt-laden tourism/real estate entities without broad mass downgrades.'
                  }
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-red-950/40 border border-red-800/60 p-3 rounded-lg space-y-1">
                <span className="text-[10px] font-mono text-red-400 font-bold block">
                  {isAr ? 'تأكل هيكلي وهبوط الطلب العالمي' : 'Structural Erosion & Global Oil Demand'}
                </span>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {isAr 
                    ? 'اشتباكات متعددة السنوات تمنع تطبيع التجارة. انخفاض الطلب العالمي على النفط بـ ١٠٪ بحلول ٢٠٢٧ مع تضخم ركودي وسياسات نقدية متشددة.'
                    : 'Persistent multi-year conflict prevents trade normalization. Global oil demand falls 10% by 2027 amid severe stagflation.'
                  }
                </p>
              </div>
              <div className="bg-red-950/40 border border-red-800/60 p-3 rounded-lg space-y-1">
                <span className="text-[10px] font-mono text-red-400 font-bold block">
                  {isAr ? 'خروج الوافدين وهبوط العقار' : 'Expat Outflows & Asset Price Slump'}
                </span>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {isAr 
                    ? 'نزوح قطاع الوافدين في الإمارات وقطر يسبب هبوطاً حاداً بإيجارات ومبيعات العقارات، وتأثر قطاعات التعليم والتجزئة للطيران.'
                    : 'Expatriate departures across UAE & Qatar cause steep property price drops and systemic headwinds for retail & aviation.'
                  }
                </p>
              </div>
              <div className="bg-red-950/40 border border-red-800/60 p-3 rounded-lg space-y-1">
                <span className="text-[10px] font-mono text-red-400 font-bold block">
                  {isAr ? 'تخفيضات ائتمانية واسعة' : 'Widespread Credit Downgrades'}
                </span>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {isAr 
                    ? 'تخفيض تصنيفات الشركات في القطاعات الحساسة، وزيادة الفجوة بين الملاءة المالية وقدرة تجاوز اختناقات اللوجستيات.'
                    : 'Widespread rating downgrades across non-defensive corporate sectors as logistics & capital access contract.'
                  }
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Interactive Matrix Section (Chart 1 & 2 Representation) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sector Filter & Risk Bar Comparison (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
              <BarChart3 size={16} className="text-amber-400" />
              {isAr 
                ? `مصفوفة أثر القطاعات (${activeScenario === 'base' ? 'السيناريو الأساسي' : 'السيناريو التنازلي'})` 
                : `Sector Credit Risk Scoreboard (${activeScenario === 'base' ? 'Base Case' : 'Downside'})`
              }
            </h3>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-mono">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedCategory === 'ALL' ? 'bg-zinc-700 text-white font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                {isAr ? 'الكل (١٥)' : 'ALL (15)'}
              </button>
              <button
                onClick={() => setSelectedCategory('HIGH')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedCategory === 'HIGH' ? 'bg-red-900/80 text-red-200 border border-red-700 font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                {isAr ? 'عالية المخاطر' : 'HIGH RISK'}
              </button>
              <button
                onClick={() => setSelectedCategory('MODERATE')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedCategory === 'MODERATE' ? 'bg-amber-900/80 text-amber-200 border border-amber-700 font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                {isAr ? 'متوسطة' : 'MODERATE'}
              </button>
              <button
                onClick={() => setSelectedCategory('DEFENSIVE')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedCategory === 'DEFENSIVE' ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-700 font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                {isAr ? 'دفاعية' : 'DEFENSIVE'}
              </button>
            </div>
          </div>

          {/* Interactive Bars List */}
          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredSectors.map((sector) => {
              const Icon = sector.icon;
              const isSelected = sector.id === activeSectorId;
              const riskScore = activeScenario === 'base' ? sector.baseRisk : sector.downsideRisk;
              
              const barColor = riskScore >= 7.5 ? 'bg-red-500' : riskScore >= 5.5 ? 'bg-amber-500' : 'bg-emerald-500';
              const badgeBg = riskScore >= 7.5 ? 'bg-red-950 text-red-400 border-red-800' : riskScore >= 5.5 ? 'bg-amber-950 text-amber-400 border-amber-800' : 'bg-emerald-950 text-emerald-400 border-emerald-800';

              return (
                <div
                  key={sector.id}
                  onClick={() => setActiveSectorId(sector.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer space-y-2 ${
                    isSelected 
                      ? 'bg-zinc-800 border-amber-500/80 shadow-lg' 
                      : 'bg-zinc-900/80 border-zinc-800/80 hover:bg-zinc-850 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${badgeBg} border`}>
                        <Icon size={14} />
                      </div>
                      <span className="font-bold text-white">
                        {isAr ? sector.titleAr : sector.titleEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${badgeBg}`}>
                        {riskScore >= 7.5 
                          ? (isAr ? 'حرج / شديد' : 'SEVERE IMPACT') 
                          : riskScore >= 5.5 
                            ? (isAr ? 'متوسط / متأثر' : 'MODERATE IMPACT') 
                            : (isAr ? 'دفاعي / مرن' : 'RESILIENT')
                        }
                      </span>
                      <span className="font-black text-amber-400">
                        {riskScore.toFixed(1)}/10
                      </span>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
                    <div 
                      className={`h-full ${barColor} transition-all duration-500 rounded-full`}
                      style={{ width: `${(riskScore / 10) * 100}%` }}
                    ></div>
                  </div>

                  {/* Micro Stat */}
                  <p className="text-[11px] text-zinc-400 font-serif italic truncate">
                    {isAr ? sector.keyStatAr : sector.keyStatEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Sector Deep Dive Panel (5 cols) */}
        <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 space-y-5 text-right rtl:text-right ltr:text-left flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                {React.createElement(activeSector.icon, { size: 18, className: "text-amber-400" })}
                <span className="font-mono text-xs text-amber-400 font-bold uppercase">
                  {isAr ? 'بطاقة التقييم القطاعي' : 'SECTOR DOSSIER BRIEF'}
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">S&P RESEARCH 2026</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-white font-sans">
                {isAr ? activeSector.titleAr : activeSector.titleEn}
              </h3>
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="text-zinc-400">
                  {isAr ? 'درجة الخطورة الأساسية:' : 'Base Risk:'} <strong className="text-amber-400">{activeSector.baseRisk}/10</strong>
                </span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-400">
                  {isAr ? 'درجة السيناريو التنازلي:' : 'Downside Risk:'} <strong className="text-red-400">{activeSector.downsideRisk}/10</strong>
                </span>
              </div>
            </div>

            {/* Key Statistic Box */}
            <div className="p-3 bg-zinc-950 border-r-4 border-amber-500 rounded text-xs space-y-1">
              <span className="text-[9px] font-mono text-amber-400 uppercase font-bold block">
                {isAr ? 'أهم مؤشر ميداني مسجل (S&P Data):' : 'Key Field Metric (S&P Data):'}
              </span>
              <p className="text-zinc-200 font-bold">
                {isAr ? activeSector.keyStatAr : activeSector.keyStatEn}
              </p>
            </div>

            {/* Detailed Description */}
            <div className="space-y-2 text-xs text-zinc-300 leading-relaxed font-serif">
              <h4 className="font-mono text-[10px] text-zinc-400 uppercase font-bold">
                {isAr ? 'محتوى التحليل الائتماني والهيكلي:' : 'Credit & Structural Analysis:'}
              </h4>
              <p>
                {isAr ? activeSector.descAr : activeSector.descEn}
              </p>
            </div>

            {/* Ratings Impact Alert */}
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded text-xs space-y-1">
              <span className="text-[9px] font-mono text-red-400 uppercase font-bold flex items-center gap-1">
                <AlertTriangle size={12} />
                {isAr ? 'أثر إجراءات التصنيف الائتماني المباشرة:' : 'Direct Rating Action Impact:'}
              </span>
              <p className="text-red-200 font-semibold">
                {isAr ? activeSector.ratingsImpactAr : activeSector.ratingsImpactEn}
              </p>
            </div>
          </div>

          {/* Action button inside Sector Box */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500">
              {isAr ? 'S&P GCC Corporate Benchmark' : 'S&P GCC Corporate Benchmark'}
            </span>
            <button
              onClick={() => handleShareWhatsApp(
                isAr ? `تقرير S&P: قطاع ${activeSector.titleAr}` : `S&P Report: ${activeSector.titleEn}`,
                isAr ? `${activeSector.keyStatAr}\n\n${activeSector.descAr}` : `${activeSector.keyStatEn}\n\n${activeSector.descEn}`
              )}
              className="bg-zinc-800 hover:bg-zinc-700 text-amber-300 px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Share2 size={12} />
              <span>{isAr ? 'مشاركة هذا القطاع' : 'Share Sector Data'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Footer Notes & Legal Disclaimer */}
      <div className="relative z-10 border-t border-zinc-800 pt-4 text-[10px] font-mono text-zinc-500 space-y-2 text-right rtl:text-right ltr:text-left">
        <p className="leading-relaxed">
          {isAr 
            ? 'ملاحظة المحرر: تعتقد وكالة ستاندرد آند بورز العالمية (S&P Global Ratings) أن هناك درجة عالية من عدم اليقين بشأن مدة ونطاق حرب الشرق الأوسط وتأثيرها المحتمل على أسعار السلع الأساسية، وسلاسل الإمداد، والاقتصادات، والظروف الائتمانية. بناءً عليه، تحمل توقعاتنا الأساسية قدراً كبيراً من عدم اليقين.'
            : 'Editor’s Note: S&P Global Ratings believes there is a high degree of unpredictability around the duration and scale of the Middle East war and its potential effect on commodity prices, supply chains, economies, and credit conditions.'
          }
        </p>
        <div className="flex flex-wrap items-center justify-between text-zinc-600 gap-2">
          <span>© 2026 S&P Global Financial Services LLC. All rights reserved.</span>
          <span>Dossier Source: S&P Global Ratings Emerging Markets Research</span>
        </div>
      </div>

    </div>
  );
};
