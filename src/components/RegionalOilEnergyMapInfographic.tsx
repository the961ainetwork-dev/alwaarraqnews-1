import React, { useState } from 'react';
import { 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  ShieldAlert, 
  DollarSign, 
  Layers, 
  BarChart3, 
  Share2, 
  Check, 
  Zap, 
  Building2, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  Database,
  Briefcase,
  Activity
} from 'lucide-react';
import OilCurrencyVolatilityChart from './OilCurrencyVolatilityChart';

interface Props {
  language?: 'ar' | 'en';
}

export const RegionalOilEnergyMapInfographic: React.FC<Props> = ({ language = 'ar' }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'volatility' | 'reserves' | 'matrix' | 'dynamics' | 'venezuela'>('volatility');
  const [copied, setCopied] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<number | null>(null);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    const text = isAr 
      ? 'خريطة الطاقة الإقليمية والدولية — الرابحون والخاسرون وسط تحولات الأسعار وصناعة القرار - صحيفة الورّاق'
      : 'Regional and International Energy Map: Winners & Losers - Al-Warraq';
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + window.location.href)}`, '_blank');
  };

  // Proven Reserves Data
  const reserves = [
    { countryAr: 'فنزويلا', countryEn: 'Venezuela', bbl: 303, pct: 17, flag: '🇻🇪', highlight: 'الأكبر عالمياً / US Control $13B' },
    { countryAr: 'المملكة العربية السعودية', countryEn: 'Saudi Arabia', bbl: 267, pct: 15, flag: '🇸🇦', highlight: 'أقل تكلفة استخراج (<$10/برميل)' },
    { countryAr: 'إيران', countryEn: 'Iran', bbl: 208, pct: 12, flag: '🇮🇷', highlight: 'تحت ضغوط العقوبات' },
    { countryAr: 'العراق', countryEn: 'Iraq', bbl: 145, pct: 9, flag: '🇮🇶', highlight: 'مركز ثقل الإمدادات' },
    { countryAr: 'الإمارات العربية المتحدة', countryEn: 'United Arab Emirates', bbl: 113, pct: 7, flag: '🇦🇪', highlight: 'توسع في الغاز وتكرير المنتجات' },
    { countryAr: 'الكويت', countryEn: 'Kuwait', bbl: 101, pct: 6, flag: '🇰🇼', highlight: 'أصول سيادية ضخمة' },
    { countryAr: 'روسيا', countryEn: 'Russia', bbl: 80, pct: 5, flag: '🇷🇺', highlight: 'إعادة توجيه للأسواق الآسيوية' },
    { countryAr: 'الولايات المتحدة', countryEn: 'United States', bbl: 55, pct: 3.5, flag: '🇺🇸', highlight: 'المنتج الأكبر عالمياً (13.3M bpd)' }
  ];

  // Winners Data
  const winners = [
    {
      titleAr: 'الولايات المتحدة الأمريكية',
      titleEn: 'United States of America',
      badgeAr: 'المنتج الأكبر عالمياً',
      badgeEn: 'Top Global Producer',
      icon: <Globe className="text-emerald-400" size={20} />,
      pointsAr: [
        'ضخ مستويات قياسية لتغطية نقص الإمدادات وزيادة الحصة السوقية.',
        'تعزيز نفوذ المجموعات الأمريكية على سلاسل التوريد العالمية.',
        'السيطرة المباشرة على تسويق النفط الفنزويلي وتحصيل 13+ مليار دولار.'
      ],
      pointsEn: [
        'Pumping record volumes to capture market share and replace shortfalls.',
        'Strengthening global supply chain leverage for US energy majors.',
        'Direct oversight of Venezuelan crude sales generating $13B+ for Treasury.'
      ]
    },
    {
      titleAr: 'دول الخليج العربي (السعودية، الإمارات، الكويت)',
      titleEn: 'GCC Nations (Saudi Arabia, UAE, Kuwait)',
      badgeAr: 'أدنى تكلفة إنتاج',
      badgeEn: 'Lowest Extraction Cost',
      icon: <Flame className="text-amber-400" size={20} />,
      pointsAr: [
        'أقل تكلفة استخراج عالمياً (تحت 10 - 15 دولاراً للبرميل).',
        'ضمان هوامش ربح مرتفعة وتوليد سيولة قوية عبر الصناديق الثروية.',
        'المزود الأول للغاز المسال والنفط للأسواق الآسيوية والأوروبية.'
      ],
      pointsEn: [
        'Lowest lifting costs globally (below $10–$15 per barrel).',
        'Preserving elevated margins and sovereign wealth fund accumulation.',
        'Primary crude & LNG anchor for both Asian and European markets.'
      ]
    },
    {
      titleAr: 'شركات الوساطة والتكرير المستقلة',
      titleEn: 'Independent Trading & Refining Firms',
      badgeAr: 'أرباح قياسية من الهوامش',
      badgeEn: 'Record Spread Captures',
      icon: <Briefcase className="text-blue-400" size={20} />,
      pointsAr: [
        'تحقيق أرباح استثنائية من إعادة توجيه مسارات الشحن البحري.',
        'إدارة لوجستيات الخامات مع أراجيح أسعار المسارات البديلة.',
        'استغلال فروقات الأسعار بين الخامات الثقيلة والخفيفة.'
      ],
      pointsEn: [
        'Capturing windfall profits by rerouting maritime trade corridors.',
        'Managing physical crude logistics across volatile spot windows.',
        'Arbitraging sweet vs heavy crude pricing spreads.'
      ]
    }
  ];

  // Losers Data
  const losers = [
    {
      titleAr: 'إيران',
      titleEn: 'Iran',
      badgeAr: 'ضغوط وعقوبات مكثفة',
      badgeEn: 'Tightening Sanctions',
      icon: <ShieldAlert className="text-red-400" size={20} />,
      statusAr: 'تضييق الخناق على المبيعات النفطية ومنافذ التصدير الحيوية تحت وابل من العقوبات وتحديات التأمين البحري.',
      statusEn: 'Facing intensified sales restrictions, export terminal risks, and shadow fleet tracking.'
    },
    {
      titleAr: 'فنزويلا (القطاع المحلي/الرسمي)',
      titleEn: 'Venezuela (Local Official Sector)',
      badgeAr: 'تغليب الإدارة الخارجية',
      badgeEn: 'External Financial Control',
      icon: <Building2 className="text-orange-400" size={20} />,
      statusAr: 'رغم امتلاك أكبر احتياطي عالمي (~303 مليار برميل)، تحولت العائدات إلى أوراق مالية بسيادة وإدارة أمريكية مباشرة مع تهميش شركة PDVSA.',
      statusEn: 'Despite holding 303B barrels, domestic oil revenues have been externalized under US administrative licensing and account control.'
    },
    {
      titleAr: 'الدول المستوردة الصافية (مصر، تونس، الأردن، لبنان)',
      titleEn: 'Regional Net Energy Importers (Egypt, Tunisia, Jordan, Lebanon)',
      badgeAr: 'عجز موازنة وتضخم',
      badgeEn: 'Fiscal Deficit & Inflation',
      icon: <TrendingDown className="text-rose-400" size={20} />,
      statusAr: 'خسائر فادحة بالموازنات جراء ارتفاع فاتورة الاستيراد، أقساط التأمين البحري الشديدة، وضغوط الدين العام والتضخم.',
      statusEn: 'Severe fiscal strain caused by high fuel import bills, war risk maritime insurance, and inflationary spikes.'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100 rounded-xl border border-amber-900/40 p-4 md:p-8 my-8 shadow-2xl overflow-hidden relative">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Header Banner */}
      <div className="relative z-10 border-b border-zinc-800 pb-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Flame size={14} className="animate-pulse" />
            <span>{isAr ? 'إنفوجرافيك تفاعلي خاص — أسواق النفط والطاقة' : 'Interactive Special Infographic — Energy Markets'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-zinc-700"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الرابط' : 'Copy Link')}</span>
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <Zap size={14} />
              <span>{isAr ? 'مشاركة واتساب' : 'WhatsApp'}</span>
            </button>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-sans font-black text-amber-400 tracking-tight leading-snug">
          {isAr 
            ? 'خريطة الطاقة الإقليمية والدولية — الرابحون والخاسرون وسط تحولات الأسعار وصناعة القرار'
            : 'Regional and International Energy Map — Winners and Losers Amid Price Shifts'}
        </h2>
        <p className="text-sm text-zinc-400 mt-2 font-sans max-w-4xl leading-relaxed">
          {isAr
            ? 'تحليل جيواقتصادي استقصائي لإعادة تشكل أسواق النفط، الاحتياطيات المؤكدة، استراتيجية أوبك+، واستحواذ واشنطن على ١٣ مليار دولار من مبيعات خام فنزويلا.'
            : 'Geoeconomic investigative analysis of energy market realignment, proven reserves, OPEC+ strategies, and US capture of $13B in Venezuelan crude sales.'}
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-zinc-800/80 pb-3">
        <button
          onClick={() => setActiveTab('volatility')}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'volatility'
              ? 'bg-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/20'
              : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white'
          }`}
        >
          <Activity size={16} className="text-amber-400 animate-pulse" />
          <span>{isAr ? 'مؤشر تذبذب الأسعار والعملات (D3.js)' : 'Crude & Currency Volatility (D3 Chart)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('reserves')}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'reserves'
              ? 'bg-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/20'
              : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white'
          }`}
        >
          <Database size={16} />
          <span>{isAr ? 'الاحتياطيات المؤكدة' : 'Proven Crude Reserves'}</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'matrix'
              ? 'bg-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/20'
              : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white'
          }`}
        >
          <BarChart3 size={16} />
          <span>{isAr ? 'مصفوفة الرابحين والخاسرين' : 'Winners vs Losers Matrix'}</span>
        </button>

        <button
          onClick={() => setActiveTab('dynamics')}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'dynamics'
              ? 'bg-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/20'
              : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white'
          }`}
        >
          <Layers size={16} />
          <span>{isAr ? 'ديناميكيات العرض والطلب' : 'Supply & Demand'}</span>
        </button>

        <button
          onClick={() => setActiveTab('venezuela')}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'venezuela'
              ? 'bg-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/20'
              : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white'
          }`}
        >
          <DollarSign size={16} />
          <span>{isAr ? 'الملف الفنزويلي (13B$)' : 'Venezuela File ($13B)'}</span>
        </button>
      </div>

      {/* TAB 0: D3 VOLATILITY CHART */}
      {activeTab === 'volatility' && (
        <div className="space-y-4">
          <OilCurrencyVolatilityChart language={language} />
        </div>
      )}

      {/* TAB 1: RESERVES CHART */}
      {activeTab === 'reserves' && (
        <div className="space-y-6">
          <div className="bg-zinc-900/90 border border-zinc-800 p-4 md:p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <Database size={18} />
                <span>{isAr ? 'ترتيب القوى النفطية حسب الاحتياطي المؤكد (بليون برميل)' : 'Global Crude Reserves Ranking (Billion Barrels)'}</span>
              </h3>
              <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                {isAr ? 'المصدر: أبحاث أسواق الطاقة 2026' : 'Source: Energy Markets Research 2026'}
              </span>
            </div>

            <div className="space-y-4">
              {reserves.map((item, idx) => {
                const maxReserves = 303;
                const widthPct = Math.max((item.bbl / maxReserves) * 100, 8);
                return (
                  <div key={idx} className="group p-3 bg-zinc-950/60 hover:bg-zinc-950 rounded-lg border border-zinc-800/60 transition-all">
                    <div className="flex items-center justify-between text-xs md:text-sm mb-1.5 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.flag}</span>
                        <span className="font-bold text-zinc-200">{isAr ? item.countryAr : item.countryEn}</span>
                        <span className="text-xs text-amber-400 font-mono">({item.pct}% {isAr ? 'من الاحتياطي العالمي' : 'of World Total'})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-amber-400 text-sm md:text-base">~{item.bbl} B bbl</span>
                      </div>
                    </div>

                    <div className="w-full bg-zinc-800/80 rounded-full h-3 overflow-hidden p-0.5">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          idx === 0 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                          idx === 1 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                          idx === 7 ? 'bg-gradient-to-r from-blue-500 to-indigo-400' : 'bg-gradient-to-r from-amber-600 to-amber-500'
                        }`}
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>

                    <div className="mt-1.5 text-xxs font-mono text-zinc-400 flex items-center gap-1">
                      <ChevronRight size={12} className="text-amber-500 shrink-0" />
                      <span>{item.highlight}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WINNERS & LOSERS MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* WINNERS COLUMN */}
            <div className="bg-emerald-950/20 border border-emerald-900/40 p-5 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-lg border-b border-emerald-900/40 pb-3">
                <ArrowUpRight size={22} className="text-emerald-400" />
                <span>{isAr ? 'الرابحون في الخارطة الجديدة (Winners)' : 'Energy Market Winners'}</span>
              </div>

              <div className="space-y-4">
                {winners.map((w, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedWinner(selectedWinner === idx ? null : idx)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedWinner === idx 
                        ? 'bg-zinc-900 border-emerald-500/80 shadow-lg shadow-emerald-900/20' 
                        : 'bg-zinc-900/70 border-zinc-800 hover:border-emerald-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {w.icon}
                        <h4 className="font-bold text-sm md:text-base text-zinc-100">{isAr ? w.titleAr : w.titleEn}</h4>
                      </div>
                      <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                        {isAr ? w.badgeAr : w.badgeEn}
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-zinc-300 font-sans mt-3">
                      {(isAr ? w.pointsAr : w.pointsEn).map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span className="leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* LOSERS COLUMN */}
            <div className="bg-rose-950/20 border border-rose-900/40 p-5 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-black text-lg border-b border-rose-900/40 pb-3">
                <ArrowDownRight size={22} className="text-rose-400" />
                <span>{isAr ? 'الخاسرون والمتضررون (Losers)' : 'Energy Market Losers'}</span>
              </div>

              <div className="space-y-4">
                {losers.map((l, idx) => (
                  <div key={idx} className="p-4 bg-zinc-900/70 border border-zinc-800 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {l.icon}
                        <h4 className="font-bold text-sm md:text-base text-zinc-100">{isAr ? l.titleAr : l.titleEn}</h4>
                      </div>
                      <span className="text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded">
                        {isAr ? l.badgeAr : l.badgeEn}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed pt-1">
                      {isAr ? l.statusAr : l.statusEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DYNAMICS */}
      {activeTab === 'dynamics' && (
        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-xl space-y-6">
          <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Layers size={20} />
            <span>{isAr ? 'توازنات السوق: معركة العرض والطلب بين أوبك+ خارج أوبك' : 'Market Equilibrium: OPEC+ vs Non-OPEC Dynamics'}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-zinc-950/80 border border-amber-900/30 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <TrendingUp size={18} />
                <span>{isAr ? 'جانب الطلب (Demand Side)' : 'Demand Dynamics'}</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>{isAr ? 'التباطؤ الآسيوي:' : 'Asian Slowdown:'}</strong> {isAr ? 'تباطؤ نمو الطلب التقليدي في الصين والأسواق الآسيوية الكبرى بفعل التوسع في الطاقة المتجددة والمركبات الكهربائية.' : 'EV adoption and renewable power expansion are moderating traditional demand growth in China.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>{isAr ? 'نمو الشرق الأوسط وجنوب آسيا:' : 'Middle East & S. Asia Growth:'}</strong> {isAr ? 'طلب مستقر وحيوي في الخليج وجنوب آسيا لتلبية مشروعات التصنيع والتنمية المحلية.' : 'Resilient demand driven by infrastructure buildout and industrial consumption.'}</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-zinc-950/80 border border-blue-900/30 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Flame size={18} />
                <span>{isAr ? 'جانب المعروض (Supply Side)' : 'Supply Management'}</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>{isAr ? 'استراتيجية أوبك+:' : 'OPEC+ Supply Management:'}</strong> {isAr ? 'إدارة الخفض الطوعي للإنتاج لضمان توازن الأسعار واستقرار الإيرادات السيادية.' : 'Voluntary production cuts designed to prevent oversupply and maintain price floors.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>{isAr ? 'ضخ قياسي خارج أوبك:' : 'Record Non-OPEC Production:'}</strong> {isAr ? 'الولايات المتحدة، البرازيل، وغيانا تضخ بمستويات قياسية لانتزاع حصص سوقية جديدة.' : 'US shale, Brazil, and Guyana reaching record output to replace shortfalls.'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VENEZUELA FILE */}
      {activeTab === 'venezuela' && (
        <div className="bg-gradient-to-br from-zinc-900 via-amber-950/20 to-zinc-900 border border-amber-500/30 p-6 rounded-xl space-y-5">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-black text-xl">
              <DollarSign className="text-amber-400" size={24} />
              <span>{isAr ? 'ملف النفط الفنزويلي: السيطرة الأمريكية وعائدات الـ 13 مليار دولار' : 'Venezuelan Crude: US Oversight & $13B Treasury Windfall'}</span>
            </div>
            <span className="text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
              {isAr ? 'تقرير فايننشال تايمز الحصري' : 'Financial Times Exclusive'}
            </span>
          </div>

          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            {isAr
              ? 'كشفت تقارير صحيفة "فايننشال تايمز" الحصرية أن الإدارة الأمريكية، عقب فرض سيطرتها وتنظيم عمليات بيع النفط الفنزويلي عبر إعفاءات وآليات خاصة، نجحت في تحصيل أكثر من ١٣ مليار دولار من عائدات النفط لحسابات خاضعة لإدارتها المباشرة.'
              : 'Exclusive Financial Times reporting reveals that the US administration successfully redirected and collected over $13 billion from Venezuelan oil sales through specialized Treasury accounts and export licensing.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-lg space-y-1">
              <span className="text-amber-400 font-mono text-xl font-black">$13,000,000,000+</span>
              <h5 className="font-bold text-zinc-200">{isAr ? 'عائدات محصلة لعام 2026' : '2026 Direct Revenue Captured'}</h5>
              <p className="text-zinc-400 text-xxs leading-relaxed">{isAr ? 'إيرادات مبيعات النفط الفنزويلي الخاضعة للإدارة المباشرة بجمارك ومصارف أمريكية.' : 'Direct receipts from Venezuelan crude sales flowing to US-managed entities.'}</p>
            </div>

            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-lg space-y-1">
              <span className="text-amber-400 font-mono text-xl font-black">303,000,000,000 bbl</span>
              <h5 className="font-bold text-zinc-200">{isAr ? 'أكبر احتياطي نفطي عالمياً' : 'World\'s Largest Crude Reserve'}</h5>
              <p className="text-zinc-400 text-xxs leading-relaxed">{isAr ? 'يمثل 17% من الإجمالي العالمي مع تحول إدارة الصادرات بالكامل خارجياً.' : '17% of total global crude reserves now re-anchored to US refinery streams.'}</p>
            </div>

            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-lg space-y-1">
              <span className="text-amber-400 font-mono text-xl font-black">$100,000,000,000</span>
              <h5 className="font-bold text-zinc-200">{isAr ? 'استثمارات أمريكية مستهدفة' : 'Potential US Re-Investment'}</h5>
              <p className="text-zinc-400 text-xxs leading-relaxed">{isAr ? 'خطط لإدخال إكسون موبيل وشيفرون لإعادة إعمار البنية التحتية المتهالكة.' : 'Exploratory proposals for US energy majors to rebuild production infrastructure.'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Disclaimer */}
      <div className="mt-6 pt-4 border-t border-zinc-800/80 text-xxs font-mono text-zinc-400 flex flex-wrap items-center justify-between gap-2">
        <span>{isAr ? 'إعداد: قسم أبحاث النفط والأسواق السيادية — صحيفة الورّاق' : 'Prepared by: Energy & Sovereign Markets Desk — Al-Warraq'}</span>
        <span>{isAr ? 'تاريخ التحديث: يوليو 2026' : 'Last Updated: July 2026'}</span>
      </div>
    </div>
  );
};
