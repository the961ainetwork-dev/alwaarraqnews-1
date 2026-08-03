import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  AlertTriangle, 
  Flame, 
  ShieldAlert, 
  Ship, 
  TrendingDown, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Globe, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Anchor,
  DollarSign,
  Activity
} from 'lucide-react';

export interface EscalationEvent {
  day: number;
  date: string;
  category: 'military' | 'logistics' | 'diplomatic';
  severity: 'critical' | 'high' | 'moderate';
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  impactMetricsAr: string;
  impactMetricsEn: string;
  locationAr: string;
  locationEn: string;
}

const TIMELINE_EVENTS: EscalationEvent[] = [
  {
    day: 1,
    date: '25 Apr 2026',
    category: 'military',
    severity: 'critical',
    titleAr: 'اندلاع شرارة المواجهة البحرية وإغلاق المضيق',
    titleEn: 'Outbreak of Naval Warfare & Initial Hormuz Blockade',
    summaryAr: 'استهداف أول ناقلتين نفطيتين بقذائف وطائرات مسيّرة قرب مضيق هرمز. البحرية الإيرانية تعلن إغلاق الممر الملاحي، وقفزة بنسبة 500% في أقساط مخاطر الحرب للناقلات.',
    summaryEn: 'Initial drone attacks target two commercial VLCCs near the Strait of Hormuz. IRGC naval forces issue active transit warnings, sparking a 500% surge in war-risk insurance premiums.',
    impactMetricsAr: 'تعطل 13M برميل/يوم • ارتفاع التأمين 500% • برنت يتجاوز 110$',
    impactMetricsEn: '13M bpd disrupted • Insurance +500% • Brent > $110/bbl',
    locationAr: 'مضيق هرمز (المدخل الشرقي)',
    locationEn: 'Strait of Hormuz (Eastern Approach)'
  },
  {
    day: 15,
    date: '10 May 2026',
    category: 'logistics',
    severity: 'high',
    titleAr: 'انهيار عقود الـ FOB وتكدس الخزانات العائمة',
    titleEn: 'FOB Sales Collapse & Offshore Tanker Gridlock',
    summaryAr: 'امتناع عمالقة التكرير في آسيا عن إرسال سفنهم عبر المضيق. تكدس أكثر من 45 مليون برميل من خامات الخليج في الخزانات العائمة، وارتفاع رسوم تأجير الناقلات الضخمة إلى 200,000 دولار يومياً.',
    summaryEn: 'Asian refiners refuse passage through Hormuz. Over 45M barrels of Gulf crude get trapped in offshore floating storage as VLCC day-charter rates hit $200,000/day.',
    impactMetricsAr: '45M برميل محتجزة • أجور الناقلات 200k$/يوم',
    impactMetricsEn: '45M bbl trapped • VLCC rates $200k/day',
    locationAr: 'مرافئ التحميل البحرية بالخليج',
    locationEn: 'Arabian Gulf Marine Terminals'
  },
  {
    day: 30,
    date: '25 May 2026',
    category: 'logistics',
    severity: 'moderate',
    titleAr: 'تدشين جسر أدنوك المكوكي والتفريغ في الفجيرة (STS)',
    titleEn: 'Activation of ADNOC Shuttle Tonnage & Fujairah STS',
    summaryAr: 'أدنوك تسخر أسطولها السيادي لنقل الخام من المنصات البحرية وتفريغه بآلية "سفينة لسفينة" (STS) في الفجيرة خارج هرمز، لتصريف 80 مليون برميل وإعفاء المشتري الملتزم من التعويضات.',
    summaryEn: 'ADNOC deploys its owned VLCC fleet to shuttle crude from offshore fields directly to Fujairah STS terminals outside Hormuz, moving 80M barrels and setting a new delivery optionality standard.',
    impactMetricsAr: 'تصريف 80M برميل • إلغاء عقوبة 30$/برميل للشركاء',
    impactMetricsEn: '80M bbl cleared • Waived $30/bbl term penalty',
    locationAr: 'الفجيرة - خليج عمان',
    locationEn: 'Fujairah, Gulf of Oman'
  },
  {
    day: 50,
    date: '14 Jun 2026',
    category: 'diplomatic',
    severity: 'critical',
    titleAr: 'صدمة خصم خام البصرة (-14$) والربح التحكيمي',
    titleEn: 'Iraq Basrah Discount Shock (-$14/bbl) & Arbitrage',
    summaryAr: 'شركة سومو العراقية تضطر لتقديم خصم انتحاري بمقدار 14 دولاراً للبرميل لخام البصرة المتوسط لتفريغ خزانات الجنوب. أدنوك للتجارة تشتري الشحنة وتكتسب 17 دولاراً أرباح تحكيم عبر الفجيرة.',
    summaryEn: 'Iraq’s SOMO is forced to discount Basrah Medium by -$14/bbl to clear southern tanks. ADNOC Trading buys the cargo and captures a massive $17/bbl arbitrage reselling to Formosa in Taiwan.',
    impactMetricsAr: 'خصم البصرة -14$/برميل • أرباح تحكيم 17$/برميل',
    impactMetricsEn: 'Basrah discount -$14/bbl • $17/bbl arbitrage',
    locationAr: 'منصة البصرة النفطية (BOT)',
    locationEn: 'Basrah Oil Terminal (BOT)'
  },
  {
    day: 70,
    date: '04 Jul 2026',
    category: 'diplomatic',
    severity: 'critical',
    titleAr: 'تحذير صندوق النقد من الركود وسحب الطوارئ من SPR',
    titleEn: 'IMF Stagflation Warning & Coordinated SPR Releases',
    summaryAr: 'صندوق النقد يحذر من تراجع النمو العالمي بنسبة 40% والتضخم إلى 6%. الولايات المتحدة ووكالة الطاقة الدولية تعلنان عن سحب اضطراري لـ 30 مليون برميل من الاحتياطي الاستراتيجي SPR.',
    summaryEn: 'IMF warns of a 40% drop in global economic growth and a 6% inflation spike. US and IEA initiate emergency releases of 30M barrels from Strategic Petroleum Reserves.',
    impactMetricsAr: 'تراجع النمو 40% • سحب 30M برميل من SPR',
    impactMetricsEn: 'Global growth -40% • 30M bbl SPR release',
    locationAr: 'العواصم المالية العالمية',
    locationEn: 'Global Financial Capitals'
  },
  {
    day: 85,
    date: '19 Jul 2026',
    category: 'military',
    severity: 'high',
    titleAr: 'خط بترولاين البحر الأحمر والائتلاف الملاحي السعودي',
    titleEn: 'Full Petroline Red Sea Bypass & Saudi Maritime Coalition',
    summaryAr: 'المملكة تشغل خط أنبوب بترولاين بكامل طاقته (5 مليون برميل/يوم) نحو ميناء ينبع على البحر الأحمر، وتقود ائتلافاً بحرياً سيادياً لحماية ممرات الملاحة الدولية من الهجمات.',
    summaryEn: 'Saudi Arabia ramps up the East-West Petroline pipeline to full 5M bpd throughput to Yanbu on the Red Sea, forming a 30-nation naval coalition to escort commercial trade.',
    impactMetricsAr: 'ضخ 5M برميل/يوم عبر ينبع • تحالف بحري من 30 دولة',
    impactMetricsEn: '5M bpd via Petroline • 30-nation escort fleet',
    locationAr: 'أنبوب شرق-غرب (ينبع)',
    locationEn: 'East-West Petroline (Yanbu)'
  },
  {
    day: 100,
    date: '02 Aug 2026',
    category: 'diplomatic',
    severity: 'moderate',
    titleAr: 'مبادرة الدبلوماسية المزدوجة واتفاق الهدنة السويسرية',
    titleEn: 'Dual-Track Diplomacy & Swiss De-escalation Accord',
    summaryAr: 'تنسيق سعودي-أمريكي عالي المستوى يثمر اتفاق مسقط/سويسرا المؤقت، ودول الخليج تثبت نموذج المبيعات الجاهزة Delivered وخطوط الأنابيب البرية لمنع تكرار الصدمة.',
    summaryEn: 'High-level Saudi-US coordination leads to the Muscat/Swiss framework accord, permanently embedding STS delivered pricing and overland pipeline bypasses across GCC energy strategy.',
    impactMetricsAr: 'اتفاق مسقط السويسري • تثبيت نموذج Delivered الداعم',
    impactMetricsEn: 'Swiss accord signed • Permanent Delivered trade model',
    locationAr: 'جنيف / مسقط',
    locationEn: 'Geneva / Muscat'
  }
];

interface Props {
  language?: 'ar' | 'en';
}

export const Hormuz100DayTimeline: React.FC<Props> = ({ language = 'ar' }) => {
  const isAr = language === 'ar';
  
  const [selectedDay, setSelectedDay] = useState<number>(30); // Default to Day 30 (ADNOC shuttle)
  const [activeCategory, setActiveCategory] = useState<'all' | 'military' | 'logistics' | 'diplomatic'>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const filteredEvents = TIMELINE_EVENTS.filter(
    ev => activeCategory === 'all' || ev.category === activeCategory
  );

  const currentEvent = TIMELINE_EVENTS.find(e => e.day === selectedDay) || TIMELINE_EVENTS[2];

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedDay(prev => {
          const currentIndex = TIMELINE_EVENTS.findIndex(e => e.day === prev);
          const nextIndex = (currentIndex + 1) % TIMELINE_EVENTS.length;
          return TIMELINE_EVENTS[nextIndex].day;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div 
      className="w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border border-amber-900/40 rounded-xl p-4 md:p-6 shadow-2xl font-sans my-4 relative overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={12} className="animate-pulse text-amber-400" />
              {isAr ? 'خط زمني تفاعلي • ١٠٠ يوم من إغلاق هرمز' : 'INTERACTIVE TIMELINE • 100 DAYS OF HORMUZ BLOCKADE'}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{isAr ? 'شريط التصعيد والتطورات الميدانية (مرّر أو اضغط على النقاط)' : 'Escalation Event Markers (Hover or Click Dates)'}</span>
          </h3>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Auto Play / Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30' 
                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
            }`}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? (isAr ? 'إيقاف التناوب' : 'Pause Auto-Play') : (isAr ? 'تشغيل تلقائي' : 'Auto-Play')}</span>
          </button>

          {/* Category Filter */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 text-xs font-mono">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                activeCategory === 'all' ? 'bg-zinc-800 text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isAr ? 'الكل' : 'All'}
            </button>
            <button
              onClick={() => setActiveCategory('military')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                activeCategory === 'military' ? 'bg-red-950 text-red-400 font-bold border border-red-800' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isAr ? 'عسكري' : 'Naval'}
            </button>
            <button
              onClick={() => setActiveCategory('logistics')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                activeCategory === 'logistics' ? 'bg-emerald-950 text-emerald-400 font-bold border border-emerald-800' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isAr ? 'لوجستي' : 'Logistics'}
            </button>
            <button
              onClick={() => setActiveCategory('diplomatic')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                activeCategory === 'diplomatic' ? 'bg-cyan-950 text-cyan-400 font-bold border border-cyan-800' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isAr ? 'دبلوماسي' : 'Diplomatic'}
            </button>
          </div>
        </div>
      </div>

      {/* TIMELINE PROGRESS AXIS & EVENT MARKERS */}
      <div className="my-6 px-2 md:px-6 relative">
        {/* Main Line Axis */}
        <div className="h-2 w-full bg-zinc-800 rounded-full relative overflow-hidden">
          {/* Active Fill Gradient */}
          <div 
            className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 transition-all duration-500"
            style={{ width: `${(selectedDay / 100) * 100}%` }}
          />
        </div>

        {/* Date Markers Container */}
        <div className="flex justify-between items-center relative -top-3.5">
          {TIMELINE_EVENTS.map((event) => {
            const isSelected = selectedDay === event.day;
            const isFilteredOut = activeCategory !== 'all' && event.category !== activeCategory;

            let badgeColor = 'border-amber-500 bg-amber-500/20 text-amber-400';
            if (event.category === 'military') badgeColor = 'border-red-500 bg-red-500/20 text-red-400';
            if (event.category === 'logistics') badgeColor = 'border-emerald-500 bg-emerald-500/20 text-emerald-400';
            if (event.category === 'diplomatic') badgeColor = 'border-cyan-500 bg-cyan-500/20 text-cyan-400';

            return (
              <div 
                key={event.day}
                className={`flex flex-col items-center group cursor-pointer transition-all ${
                  isFilteredOut ? 'opacity-30 pointer-events-none' : 'opacity-100'
                }`}
                onClick={() => {
                  setSelectedDay(event.day);
                  setIsPlaying(false);
                }}
                onMouseEnter={() => {
                  setSelectedDay(event.day);
                }}
              >
                {/* Node Circle Pin */}
                <div 
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-black transition-all shadow-lg ${
                    isSelected 
                      ? 'bg-amber-500 border-white text-black scale-125 ring-4 ring-amber-500/30' 
                      : `${badgeColor} hover:scale-110`
                  }`}
                >
                  {event.day}
                </div>

                {/* Date Tag Label */}
                <span className={`text-[10px] font-mono mt-2 transition-all font-bold ${
                  isSelected ? 'text-amber-400 scale-105' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}>
                  {isAr ? `اليوم ${event.day}` : `Day ${event.day}`}
                </span>
                <span className="text-[9px] font-mono text-zinc-600 hidden md:inline">
                  {event.date.split(' ')[0]} {event.date.split(' ')[1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SELECTED EVENT DETAIL CARD (ANIMATED PRESENCE) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEvent.day}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 space-y-4 shadow-xl relative overflow-hidden"
        >
          {/* Top Bar Status Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded font-mono text-[10px] font-black uppercase border ${
                currentEvent.category === 'military'
                  ? 'bg-red-500/20 text-red-400 border-red-500/40'
                  : currentEvent.category === 'logistics'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
              }`}>
                {currentEvent.category === 'military' 
                  ? (isAr ? 'مواجهة عسكرية بحرية' : 'NAVAL ENGAGEMENT')
                  : currentEvent.category === 'logistics'
                  ? (isAr ? 'تحول لوجستي وشحن' : 'LOGISTICS WORKAROUND')
                  : (isAr ? 'دبلوماسية وسياسة كبرى' : 'DIPLOMATIC ACCORD')}
              </span>

              <span className="text-zinc-400 text-xs font-mono font-bold flex items-center gap-1">
                <Clock size={12} className="text-amber-400" />
                <span>{isAr ? `اليوم ${currentEvent.day} • ${currentEvent.date}` : `Day ${currentEvent.day} • ${currentEvent.date}`}</span>
              </span>
            </div>

            <span className="text-zinc-400 text-xs font-mono flex items-center gap-1 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
              <Anchor size={12} className="text-amber-400" />
              <span>{isAr ? currentEvent.locationAr : currentEvent.locationEn}</span>
            </span>
          </div>

          {/* Title & Detailed Summary */}
          <div>
            <h4 className="text-base md:text-lg font-black text-white leading-snug">
              {isAr ? currentEvent.titleAr : currentEvent.titleEn}
            </h4>
            <p className="text-xs md:text-sm text-zinc-300 mt-2 leading-relaxed font-serif">
              {isAr ? currentEvent.summaryAr : currentEvent.summaryEn}
            </p>
          </div>

          {/* Key Impact Metrics Ribbon */}
          <div className="bg-zinc-950 p-3 rounded-lg border border-amber-900/30 flex items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase font-bold">
                  {isAr ? 'الأثر المباشر والقياس الميداني' : 'KEY FIELD IMPACT METRIC'}
                </span>
                <span className="font-black text-amber-300">
                  {isAr ? currentEvent.impactMetricsAr : currentEvent.impactMetricsEn}
                </span>
              </div>
            </div>

            {/* Step Navigation Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => {
                  const idx = TIMELINE_EVENTS.findIndex(e => e.day === selectedDay);
                  if (idx > 0) setSelectedDay(TIMELINE_EVENTS[idx - 1].day);
                }}
                disabled={selectedDay === TIMELINE_EVENTS[0].day}
                className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 cursor-pointer"
              >
                {isAr ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
              <button
                onClick={() => {
                  const idx = TIMELINE_EVENTS.findIndex(e => e.day === selectedDay);
                  if (idx < TIMELINE_EVENTS.length - 1) setSelectedDay(TIMELINE_EVENTS[idx + 1].day);
                }}
                disabled={selectedDay === TIMELINE_EVENTS[TIMELINE_EVENTS.length - 1].day}
                className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 cursor-pointer"
              >
                {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Hormuz100DayTimeline;
