import React, { useState } from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  Flame, 
  Smartphone, 
  Trash2, 
  UserMinus, 
  Vote, 
  Coins, 
  Database,
  ArrowRight,
  RefreshCw,
  TrendingDown,
  Users,
  BarChart2,
  Tv,
  Calendar
} from 'lucide-react';

interface FifaPolymarketInfographicProps {
  language: 'ar' | 'en';
}

interface PredictionMarket {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  yesPrice: number; // in USDC (e.g. 0.62)
  volume: number; // total traded volume in USDC
  trend: 'up' | 'down';
  tagsAr: string[];
  tagsEn: string[];
}

const countries = [
  { id: 'US', nameEn: 'US', nameAr: 'الولايات المتحدة' },
  { id: 'UK', nameEn: 'UK', nameAr: 'المملكة المتحدة' },
  { id: 'Germany', nameEn: 'Germany', nameAr: 'ألمانيا' },
  { id: 'France', nameEn: 'France', nameAr: 'فرنسا' },
  { id: 'China', nameEn: 'China', nameAr: 'الصين' },
  { id: 'India', nameEn: 'India', nameAr: 'الهند' },
  { id: 'South Korea', nameEn: 'South Korea', nameAr: 'كوريا الجنوبية' }
];

const mediaData = [
  {
    categoryEn: 'Watching TV and online video',
    categoryAr: 'مشاهدة التلفاز والفيديو الرقمي',
    color: 'bg-cyan-500',
    values: { US: 5.8, UK: 4.8, Germany: 3.8, France: 4.9, China: 3.3, India: 4.1, 'South Korea': 4.4 }
  },
  {
    categoryEn: 'Listening to music, podcasts, radio',
    categoryAr: 'الاستماع للموسيقى والبودكاست والراديو',
    color: 'bg-amber-500',
    values: { US: 3.5, UK: 2.7, Germany: 2.4, France: 2.5, China: 1.6, India: 2.7, 'South Korea': 1.8 }
  },
  {
    categoryEn: 'Playing video games',
    categoryAr: 'ألعاب الفيديو والترفيه الإلكتروني',
    color: 'bg-rose-500',
    values: { US: 2.8, UK: 1.8, Germany: 1.6, France: 1.9, China: 1.4, India: 2.3, 'South Korea': 1.4 }
  },
  {
    categoryEn: 'Using social media',
    categoryAr: 'منصات التواصل الاجتماعي والتفاعل',
    color: 'bg-purple-600',
    values: { US: 3.1, UK: 3.0, Germany: 2.0, France: 2.4, China: 2.7, India: 3.6, 'South Korea': 1.9 }
  }
];

const ageData = [
  {
    labelEn: '18-34 years of age',
    labelAr: 'من ١٨ إلى ٣٤ عاماً',
    color: 'bg-cyan-500',
    values: { US: 37, UK: 31, Germany: 25, France: 24, China: 21, India: 43, 'South Korea': 20 }
  },
  {
    labelEn: '35-54 years of age',
    labelAr: 'من ٣٥ إلى ٥٤ عاماً',
    color: 'bg-amber-500',
    values: { US: 38, UK: 39, Germany: 45, France: 46, China: 49, India: 41, 'South Korea': 37 }
  },
  {
    labelEn: '55+ years of age',
    labelAr: '٥٥ عاماً فما فوق',
    color: 'bg-rose-500',
    values: { US: 25, UK: 30, Germany: 32, France: 30, China: 31, India: 16, 'South Korea': 42 }
  }
];

const sportsData = [
  { sportEn: 'American football', sportAr: 'كرة القدم الأمريكية', values: { US: 78, UK: 20, Germany: 18, France: 7, China: 10, India: 29, 'South Korea': 4 } },
  { sportEn: 'Baseball', sportAr: 'البيسبول', values: { US: 57, UK: 11, Germany: 4, France: 5, China: 9, India: 26, 'South Korea': 64 } },
  { sportEn: 'Basketball', sportAr: 'كرة السلة', values: { US: 70, UK: 26, Germany: 21, France: 24, China: 72, India: 38, 'South Korea': 22 } },
  { sportEn: 'Cricket', sportAr: 'الكريكت', values: { US: 7, UK: 26, Germany: 2, France: 2, China: 5, India: 89, 'South Korea': 1 } },
  { sportEn: 'Golf', sportAr: 'الغولف', values: { US: 29, UK: 25, Germany: 6, France: 6, China: 12, India: 21, 'South Korea': 32 } },
  { sportEn: 'Motorsports', sportAr: 'رياضة المحركات والسباقات', values: { US: 20, UK: 34, Germany: 27, France: 22, China: 32, India: 40, 'South Korea': 6 } },
  { sportEn: 'Tennis', sportAr: 'التنس الأرضي', values: { US: 36, UK: 48, Germany: 29, France: 47, China: 40, India: 56, 'South Korea': 22 } }
];

export const FifaPolymarketInfographic: React.FC<FifaPolymarketInfographicProps> = ({ language }) => {
  const isAr = language === 'ar';
  
  // Tab states: 'censorship', 'polymarket' or 'insights'
  const [activeSubTab, setActiveSubTab] = useState<'censorship' | 'polymarket' | 'insights'>('insights');
  const [insightType, setInsightType] = useState<'media' | 'sports' | 'age'>('media');

  // Polymarket States
  const [markets, setMarkets] = useState<PredictionMarket[]>([
    {
      id: 'coach-sack',
      titleAr: 'إقالة مدرب المنتخب الأمريكي أو المكسيكي قبل نهاية دور المجموعات',
      titleEn: 'US or Mexico Head Coach is sacked before group stage concludes',
      categoryAr: 'عقود إدارية',
      categoryEn: 'Managerial Contracts',
      yesPrice: 0.68,
      volume: 1452090,
      trend: 'up',
      tagsAr: ['إقالة', 'دور المجموعات'],
      tagsEn: ['Sack', 'Groups']
    },
    {
      id: 'referee-cards',
      titleAr: 'أكثر من 8 بطاقات صفراء يشهرها نفس الحكم في مباراة الافتتاح',
      titleEn: 'Over 8 yellow cards shown by the same referee in the opening match',
      categoryAr: 'سلوك الحكام',
      categoryEn: 'Referee Discipline',
      yesPrice: 0.42,
      volume: 890450,
      trend: 'down',
      tagsAr: ['بطاقات صفراء', 'تحكيم'],
      tagsEn: ['Yellow Cards', 'Referee']
    },
    {
      id: 'political-statement',
      titleAr: 'نجم بارز يدلي بتصريح سياسي علني خلال المؤتمر الصحفي الرسمي',
      titleEn: 'A marquee star issues a direct political statement in official press briefing',
      categoryAr: 'تصريحات اللاعبين',
      categoryEn: 'Player Statements',
      yesPrice: 0.79,
      volume: 3240800,
      trend: 'up',
      tagsAr: ['تصريح سياسي', 'شغف اللاعبين'],
      tagsEn: ['Political Rhetoric', 'Briefing']
    },
    {
      id: 'fan-zone-clash',
      titleAr: 'حظر بيع مشروبات الكحول بالكامل بمناطق المشجعين (Fan Zones) بولاية تكساس',
      titleEn: 'Total ban of alcohol sales in official Texas Fan Zones due to local code',
      categoryAr: 'الفعاليات الميدانية',
      categoryEn: 'Fan Zones Restrictions',
      yesPrice: 0.55,
      volume: 670120,
      trend: 'up',
      tagsAr: ['مناطق المشجعين', 'تكساس'],
      tagsEn: ['Fan Zones', 'Texas']
    }
  ]);

  // Balance & Transaction logs
  const [userBalance, setUserBalance] = useState<number>(1000); // 1000 USDC mock balance
  const [recentTx, setRecentTx] = useState<{
    id: string;
    marketTitle: string;
    type: 'YES' | 'NO';
    amount: number;
    shares: number;
    block: number;
    timestamp: string;
  }[]>([]);
  const [loadingMarketId, setLoadingMarketId] = useState<string | null>(null);

  // Handle betting prediction
  const handleBuyShares = (marketId: string, type: 'YES' | 'NO', price: number) => {
    if (userBalance < 50) return;
    
    setLoadingMarketId(marketId + '-' + type);
    
    setTimeout(() => {
      const betAmount = 100; // Flat 100 USDC bet
      const sharesGot = Math.round((betAmount / price) * 100) / 100;
      const targetMarket = markets.find(m => m.id === marketId);
      
      if (!targetMarket) return;

      // Deduct balance
      setUserBalance(prev => prev - betAmount);
      
      // Update market volume and slightly tilt odds
      setMarkets(prev => prev.map(m => {
        if (m.id === marketId) {
          const delta = type === 'YES' ? 0.04 : -0.04;
          const newYesPrice = Math.min(0.99, Math.max(0.01, Math.round((m.yesPrice + delta) * 100) / 100));
          return {
            ...m,
            yesPrice: newYesPrice,
            volume: m.volume + betAmount,
            trend: type === 'YES' ? 'up' : 'down'
          };
        }
        return m;
      }));

      // Add mock block ledger item
      const now = new Date();
      setRecentTx(prev => [
        {
          id: Math.random().toString(36).substring(2, 8).toUpperCase(),
          marketTitle: isAr ? targetMarket.titleAr : targetMarket.titleEn,
          type,
          amount: betAmount,
          shares: sharesGot,
          block: Math.floor(Math.random() * 80000) + 12040000,
          timestamp: now.toLocaleTimeString()
        },
        ...prev.slice(0, 4) // keep last 5
      ]);

      setLoadingMarketId(null);
    }, 600);
  };

  const handleResetSimulator = () => {
    setUserBalance(1000);
    setRecentTx([]);
    setMarkets([
      {
        id: 'coach-sack',
        titleAr: 'إقالة مدرب المنتخب الأمريكي أو المكسيكي قبل نهاية دور المجموعات',
        titleEn: 'US or Mexico Head Coach is sacked before group stage concludes',
        categoryAr: 'عقود إدارية',
        categoryEn: 'Managerial Contracts',
        yesPrice: 0.68,
        volume: 1452090,
        trend: 'up',
        tagsAr: ['إقالة', 'دور المجموعات'],
        tagsEn: ['Sack', 'Groups']
      },
      {
        id: 'referee-cards',
        titleAr: 'أكثر من 8 بطاقات صفراء يشهرها نفس الحكم في مباراة الافتتاح',
        titleEn: 'Over 8 yellow cards shown by the same referee in the opening match',
        categoryAr: 'سلوك الحكام',
        categoryEn: 'Referee Discipline',
        yesPrice: 0.42,
        volume: 890450,
        trend: 'down',
        tagsAr: ['بطاقات صفراء', 'تحكيم'],
        tagsEn: ['Yellow Cards', 'Referee']
      },
      {
        id: 'political-statement',
        titleAr: 'نجم بارز يدلي بتصريح سياسي علني خلال المؤتمر الصحفي الرسمي',
        titleEn: 'A marquee star issues a direct political statement in official press briefing',
        categoryAr: 'تصريحات اللاعبين',
        categoryEn: 'Player Statements',
        yesPrice: 0.79,
        volume: 3240800,
        trend: 'up',
        tagsAr: ['تصريح سياسي', 'شغف اللاعبين'],
        tagsEn: ['Political Rhetoric', 'Briefing']
      },
      {
        id: 'fan-zone-clash',
        titleAr: 'حظر بيع مشروبات الكحول بالكامل بمناطق المشجعين (Fan Zones) بولاية تكساس',
        titleEn: 'Total ban of alcohol sales in official Texas Fan Zones due to local code',
        categoryAr: 'الفعاليات الميدانية',
        categoryEn: 'Fan Zones Restrictions',
        yesPrice: 0.55,
        volume: 670120,
        trend: 'up',
        tagsAr: ['مناطق المشجعين', 'تكساس'],
        tagsEn: ['Fan Zones', 'Texas']
      }
    ]);
  };

  return (
    <div 
      id="fifa-polymarket-infographic"
      className="border-4 border-black p-4 md:p-6 bg-zinc-900 text-white font-sans relative shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] select-none ltr:text-left rtl:text-right"
    >
      {/* Banner Header */}
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 border-b-2 border-red-500 pb-4 mb-6">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-[10px] font-mono px-2 py-0.5 font-black tracking-widest uppercase">
              {isAr ? 'تقرير استقصائي مصور مدمج' : 'INTEGRATED INTERACTIVE INTELLIGENCE'}
            </span>
            <span className="bg-white text-black text-[10px] font-mono px-2 py-0.5 font-bold uppercase">
              FIFA 2026 AUDIT
            </span>
          </div>
          <h3 className="text-xl md:text-3xl font-black tracking-tight text-white leading-tight">
            {isAr ? 'تسليع المونديال: صراع السردية بين الفيفا والبلوكشين' : 'Commodifying the Cup: Narratives Between FIFA & Blockchain'}
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 font-serif">
            {isAr ? 'بيانات وإحصاءات حية حول الرقابة على خطاب الكراهية وتغول عقود المراهنات الدقيقة.' : 'Live metrics on speech regulation, sentiment screening, and decentralized micro-betting.'}
          </p>
        </div>

        {/* Dynamic Controls / Scoreboard */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-center">
          <button 
            onClick={() => setActiveSubTab('insights')}
            className={`px-3 py-1.5 font-mono text-[11px] font-black uppercase border-2 transition-all cursor-pointer ${
              activeSubTab === 'insights' 
                ? 'bg-red-600 border-red-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            📈 {isAr ? 'بيانات الجماهير الحيوية' : 'Global Audience Insights'}
          </button>
          <button 
            onClick={() => setActiveSubTab('polymarket')}
            className={`px-3 py-1.5 font-mono text-[11px] font-black uppercase border-2 transition-all cursor-pointer ${
              activeSubTab === 'polymarket' 
                ? 'bg-red-600 border-red-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            📊 {isAr ? 'عقود Polymarket المجهرية' : 'Polymarket Micro-Contracts'}
          </button>
          <button 
            onClick={() => setActiveSubTab('censorship')}
            className={`px-3 py-1.5 font-mono text-[11px] font-black uppercase border-2 transition-all cursor-pointer ${
              activeSubTab === 'censorship' 
                ? 'bg-red-600 border-red-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            🛡️ {isAr ? 'مصفاة الرقابة الرقمية' : 'Digital Censorship Audit'}
          </button>
        </div>
      </div>

      {/* Main Container */}
      {activeSubTab === 'insights' ? (
        /* GLOBAL AUDIENCE INSIGHTS PANEL */
        <div className="space-y-6">
          {/* Sub Tab selection for Insight categories */}
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
            <button
              onClick={() => setInsightType('media')}
              className={`px-3 py-1.5 font-mono text-[10px] font-black uppercase border cursor-pointer transition-all ${
                insightType === 'media'
                  ? 'bg-cyan-500 border-cyan-400 text-black font-extrabold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              📺 {isAr ? 'الاستهلاك الإعلامي اليومي' : 'Daily Media Consumption'}
            </button>
            <button
              onClick={() => setInsightType('sports')}
              className={`px-3 py-1.5 font-mono text-[10px] font-black uppercase border cursor-pointer transition-all ${
                insightType === 'sports'
                  ? 'bg-cyan-500 border-cyan-400 text-black font-extrabold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              ⚽ {isAr ? 'الاهتمام بالرياضات الأخرى' : 'Other Sports Watched'}
            </button>
            <button
              onClick={() => setInsightType('age')}
              className={`px-3 py-1.5 font-mono text-[10px] font-black uppercase border cursor-pointer transition-all ${
                insightType === 'age'
                  ? 'bg-cyan-500 border-cyan-400 text-black font-extrabold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              👥 {isAr ? 'الفئات العمرية للمشاهدين' : 'Age Demographics'}
            </button>
          </div>

          {insightType === 'media' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Stacked Chart (8/12 cols) */}
              <div className="lg:col-span-8 border border-zinc-800 p-4 bg-zinc-950 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-4">
                    <span className="text-cyan-400 font-mono text-xs font-black uppercase">
                      {isAr ? 'متوسط الساعات اليومية للاستهلاك الإعلامي (متابعي المونديال)' : 'Average Daily Hours of Media Consumption (World Cup Viewers)'}
                    </span>
                    <span className="text-zinc-500 text-[9px] font-mono">S&P GLOBAL Q1 2026</span>
                  </div>

                  {/* Horizontal Stacked Bars */}
                  <div className="space-y-4 pt-2">
                    {countries.map((country) => {
                      const values = mediaData.map(d => (d.values as any)[country.id] || 0);
                      const total = Math.round(values.reduce((sum, v) => sum + v, 0) * 10) / 10;
                      // Maximum total in dataset is ~15.2 (US)
                      const barContainerWidthPercent = (total / 15.5) * 100;

                      return (
                        <div key={country.id} className="space-y-1">
                          <div className="flex justify-between font-mono text-[11px] font-bold">
                            <span className="text-white">{isAr ? country.nameAr : country.nameEn}</span>
                            <span className="text-cyan-400 font-black">{total} {isAr ? 'ساعات يومياً' : 'hrs/day'}</span>
                          </div>
                          
                          <div className="w-full bg-zinc-900 h-8 border border-zinc-800 relative flex overflow-hidden">
                            {/* We wrap the segments so the total length of the bar represents total hours relative to 15.5 max */}
                            <div className="h-full flex" style={{ width: `${barContainerWidthPercent}%` }}>
                              {mediaData.map((d, index) => {
                                const val = (d.values as any)[country.id] || 0;
                                const widthPct = total > 0 ? (val / total) * 100 : 0;
                                if (val === 0) return null;
                                return (
                                  <div
                                    key={index}
                                    className={`${d.color} h-full border-r border-zinc-950/40 relative group cursor-pointer transition-opacity hover:opacity-90`}
                                    style={{ width: `${widthPct}%` }}
                                    title={`${isAr ? d.categoryAr : d.categoryEn}: ${val} hrs`}
                                  >
                                    {widthPct > 12 && (
                                      <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-black text-black">
                                        {val}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 pt-3 border-t border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {mediaData.map((d, index) => (
                    <div key={index} className="flex items-center gap-2 font-mono text-[10px]">
                      <span className={`w-3 h-3 ${d.color} inline-block shrink-0 border border-zinc-950`}></span>
                      <span className="text-zinc-300 leading-tight">{isAr ? d.categoryAr : d.categoryEn}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights Sidebar (4/12 cols) */}
              <div className="lg:col-span-4 border border-zinc-800 p-4 bg-zinc-950 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="border-b border-zinc-800 pb-2">
                    <span className="text-white font-sans text-xs font-black uppercase">
                      {isAr ? 'التحليل السلوكي للجمهور' : 'Behavioral Audience Analysis'}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-350 font-serif leading-relaxed">
                    {isAr
                      ? 'يظهر التقرير تفوقاً ساحقاً للولايات المتحدة في معدل استهلاك الوسائط الإعلامية بمتوسط يفوق ١٥ ساعة يومياً للفرد، تليها الهند ثم المملكة المتحدة.'
                      : 'World Cup viewers exhibit unprecedented screen dependency. In the United States, the total daily media consumption exceeds 15.2 hours per person, driven by digital video and multitasking.'}
                  </p>

                  <div className="border border-red-900 bg-red-950/20 p-3 text-right rtl:text-right ltr:text-left">
                    <div className="flex items-center gap-1.5 text-red-500 mb-1">
                      <Tv size={14} className="shrink-0" />
                      <span className="font-mono text-[9px] font-black uppercase">
                        {isAr ? 'علاقة المراهنات بالشاشات:' : 'BETTING SHIELD IMPACT:'}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-300 font-serif leading-relaxed">
                      {isAr
                        ? 'تداخل استهلاك الفيديو عبر الإنترنت (٥.٨ ساعات في أمريكا) مع الإفراط في استخدام وسائل التواصل يعني أن منصات التنبؤ اللامركزية تعثر على بيئة خصبة للمضاربة الفورية خلال لحظات البث المباشر.'
                        : 'High internet video consumption (5.8 hours in the US) matched with constant social media engagement creates the perfect lightning rod for real-time betting pools during live matches.'}
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-2 font-mono text-[9px] text-zinc-500 leading-tight mt-4">
                  {isAr ? '● العينة تشمل البالغين المتصلين بالإنترنت في الربع الأول من عام ٢٠٢٦.' : '● Base: ~1,000 online adults in Europe/APAC, ~2,500 in the US.'}
                </div>
              </div>
            </div>
          )}

          {insightType === 'sports' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Heatmap Grid (8/12 cols) */}
              <div className="lg:col-span-8 border border-zinc-800 p-4 bg-zinc-950">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-4">
                  <span className="text-cyan-400 font-mono text-xs font-black uppercase">
                    {isAr ? 'الرياضات الأخرى المفضلة لدى متابعي كأس العالم (%)' : 'Other Sports Watched by World Cup Viewers (%)'}
                  </span>
                  <span className="text-zinc-500 text-[9px] font-mono">CONSUMER INSIGHTS 2026</span>
                </div>

                {/* Heatmap Table Wrapper */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left rtl:text-right border-collapse font-mono text-[11px]">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-900/40 text-xxs text-zinc-400 font-black">
                        <th className="p-2 select-none">{isAr ? 'الرياضة' : 'Sport'}</th>
                        {countries.map(c => (
                          <th key={c.id} className="p-2 text-center font-black select-none">{c.id}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sportsData.map((row, rIdx) => (
                        <tr key={rIdx} className="border-b border-zinc-900 hover:bg-zinc-900/30 transition-colors">
                          <td className="p-2 font-sans font-bold text-white whitespace-nowrap">
                            {isAr ? row.sportAr : row.sportEn}
                          </td>
                          {countries.map(c => {
                            const val = (row.values as any)[c.id] || 0;
                            // Calculate color scale based on value (0 to 100)
                            // We use deep red palette matching our app's accent
                            let bgClass = "bg-zinc-900 text-zinc-400";
                            if (val >= 75) bgClass = "bg-red-900/90 text-white font-black";
                            else if (val >= 50) bgClass = "bg-red-800/70 text-white font-bold";
                            else if (val >= 30) bgClass = "bg-red-700/40 text-zinc-100";
                            else if (val >= 15) bgClass = "bg-red-900/20 text-zinc-300";
                            else if (val >= 5) bgClass = "bg-zinc-850 text-zinc-400";

                            return (
                              <td key={c.id} className={`p-2 text-center transition-colors font-bold ${bgClass}`}>
                                {val}%
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Legend of Heatmap */}
                <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-zinc-900 font-mono text-[10px] text-zinc-500">
                  <span>{isAr ? 'شدة الاهتمام:' : 'Legend:'}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-red-900/90 border border-zinc-950 inline-block"></span>
                    <span className="text-zinc-400">&ge; 75%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-red-800/70 border border-zinc-950 inline-block"></span>
                    <span className="text-zinc-400">50% - 74%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-red-700/40 border border-zinc-950 inline-block"></span>
                    <span className="text-zinc-400">30% - 49%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-red-900/20 border border-zinc-950 inline-block"></span>
                    <span className="text-zinc-400">&lt; 30%</span>
                  </div>
                </div>
              </div>

              {/* Other Sports Analysis (4/12 cols) */}
              <div className="lg:col-span-4 border border-zinc-800 p-4 bg-zinc-950 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="border-b border-zinc-800 pb-2">
                    <span className="text-white font-sans text-xs font-black uppercase">
                      {isAr ? 'خصوصية الأسواق الرياضية' : 'Market-Specific Sports Dynamics'}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-350 font-serif leading-relaxed">
                    {isAr
                      ? 'تمتلك كل دولة ديناميكيات رياضية شديدة التميز؛ الهند تهيمن فيها رياضة الكريكت بنسبة تبلغ ٨٩٪، بينما تكتسح كرة القدم الأمريكية والبيسبول والغولف السوق الأمريكية.'
                      : 'While the World Cup unites everyone around football (soccer), regional preferences remain deep-rooted. India demonstrates an absolute Cricket dominance of 89%, while the US shows high interest in American Football (78%) and Basketball (70%).'}
                  </p>

                  <div className="border border-cyan-950 bg-cyan-950/20 p-3 text-right rtl:text-right ltr:text-left">
                    <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                      <BarChart2 size={14} className="shrink-0" />
                      <span className="font-mono text-[9px] font-black uppercase">
                        {isAr ? 'فرص عقود المراهنات المتقاطعة:' : 'CROSS-SPORT PREDICTION VALUE:'}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-300 font-serif leading-relaxed">
                      {isAr
                        ? 'تستغل الأسواق اللامركزية هذا الاهتمام الإقليمي المتقاطع لطرح مراهنات مركبة؛ مثل ربط أداء لاعب المونديال اليوم بنتائج مباريات الكريكت القادمة في الهند أو مباريات السلة الأمريكية.'
                        : 'Predictive platforms leverage these highly regionalized datasets to cross-market betting contracts, linking live soccer action directly with domestic sports spikes.'}
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-2 font-mono text-[9px] text-zinc-500 leading-tight mt-4">
                  {isAr ? '● الإحصاءات تعكس من يتابع الرياضة أو يخطط لمتابعتها بنشاط.' : '● Surveys conducted in late 2025 and Q1 2026.'}
                </div>
              </div>
            </div>
          )}

          {insightType === 'age' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Stacked Chart (8/12 cols) */}
              <div className="lg:col-span-8 border border-zinc-800 p-4 bg-zinc-950 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-4">
                    <span className="text-cyan-400 font-mono text-xs font-black uppercase">
                      {isAr ? 'التركيبة العمرية لمتابعي كأس العالم (%)' : 'Age Distribution of World Cup Viewers (%)'}
                    </span>
                    <span className="text-zinc-500 text-[9px] font-mono">DEMOGRAPHICS 2026</span>
                  </div>

                  {/* Horizontal Stacked Bars */}
                  <div className="space-y-4 pt-2">
                    {countries.map((country) => {
                      const values = ageData.map(d => (d.values as any)[country.id] || 0);
                      const total = values.reduce((sum, v) => sum + v, 0);

                      return (
                        <div key={country.id} className="space-y-1">
                          <div className="flex justify-between font-mono text-[11px] font-bold">
                            <span className="text-white">{isAr ? country.nameAr : country.nameEn}</span>
                            <span className="text-zinc-400 font-bold">{total}%</span>
                          </div>
                          
                          <div className="w-full bg-zinc-900 h-8 border border-zinc-800 relative flex overflow-hidden">
                            {ageData.map((d, index) => {
                              const val = (d.values as any)[country.id] || 0;
                              const widthPct = total > 0 ? (val / total) * 100 : 0;
                              if (val === 0) return null;
                              return (
                                <div
                                  key={index}
                                  className={`${d.color} h-full border-r border-zinc-950/40 relative group cursor-pointer transition-opacity hover:opacity-90`}
                                  style={{ width: `${widthPct}%` }}
                                  title={`${isAr ? d.labelAr : d.labelEn}: ${val}%`}
                                >
                                  {widthPct > 12 && (
                                    <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-black text-black">
                                      {val}%
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 pt-3 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {ageData.map((d, index) => (
                    <div key={index} className="flex items-center gap-2 font-mono text-[10px]">
                      <span className={`w-3 h-3 ${d.color} inline-block shrink-0 border border-zinc-950`}></span>
                      <span className="text-zinc-300 leading-tight">{isAr ? d.labelAr : d.labelEn}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights Sidebar (4/12 cols) */}
              <div className="lg:col-span-4 border border-zinc-800 p-4 bg-zinc-950 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="border-b border-zinc-800 pb-2">
                    <span className="text-white font-sans text-xs font-black uppercase">
                      {isAr ? 'عولمة الديموغرافيا والشباب' : 'Demographic Shifts & Youth Dynamics'}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-350 font-serif leading-relaxed">
                    {isAr
                      ? 'تبرز الهند كأكثر الأسواق شباباً حيث تبلغ الفئة العمرية (١٨-٣٤ عاماً) حوالي ٤٣٪ من إجمالي المشاهدين، في حين تبرز كوريا الجنوبية كأكثر الأسواق تقدماً في السن بـ ٤٢٪ لمن هم فوق سن الـ ٥٥.'
                      : 'India stands out as the youngest viewership base with 43% of its World Cup viewers in the 18-34 bracket. Conversely, South Korea presents the oldest distribution with 42% of viewers aged 55 or above.'}
                  </p>

                  <div className="border border-red-900 bg-red-950/20 p-3 text-right rtl:text-right ltr:text-left">
                    <div className="flex items-center gap-1.5 text-red-500 mb-1">
                      <Users size={14} className="shrink-0" />
                      <span className="font-mono text-[9px] font-black uppercase">
                        {isAr ? 'استهداف الفئة الشابة بالمراهنات:' : 'YOUTH TARGETING METRICS:'}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-300 font-serif leading-relaxed">
                      {isAr
                        ? 'تستهدف منصات العقود اللامركزية والتطبيقات الرقمية بشكل مباشر الشباب (١٨-٣٤ عاماً) الذين يبحثون عن تسييل اهتمامهم الرياضي، مما يسرع تبنيهم لثقافة المضاربة.'
                        : 'Web3 prediction platforms disproportionately target the highly connected 18-34 cohort. This cohort is active across secondary screens and values fast on-chain execution.'}
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-2 font-mono text-[9px] text-zinc-500 leading-tight mt-4">
                  {isAr ? '● الإحصاءات الممثلة للمشاهدين مبنية على استطلاعات الرأي العام لعام ٢٠٢٦.' : '● Base: Approximately 1,000 online respondents per region.'}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : activeSubTab === 'censorship' ? (

        /* CENSORSHIP AUDIT PANEL */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Funnel Pipeline (7/12 Cols) */}
          <div className="lg:col-span-7 border border-zinc-800 p-4 bg-zinc-950 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-4">
                <span className="text-red-500 font-mono text-xs font-black uppercase">
                  {isAr ? 'مسار تصفية التعليقات بمونديال 2026' : 'World Cup 2026 Comment Filtration Funnel'}
                </span>
                <span className="text-zinc-500 text-[10px] font-mono">FIFA SENSORY AI AGENTS</span>
              </div>

              <p className="text-xs text-zinc-300 font-serif leading-relaxed mb-4">
                {isAr 
                  ? 'تم استخدام نماذج لغوية آلية لمسح وتصنيف التعليقات فور نشرها. التفجير الفعلي حدث بسبب ربط الجماهير لخسائر عقود المراهنات بأخطاء اللاعبين والحكام.'
                  : 'Algorithmic LLM agents scanned social comments instantly. Peak volatility in user anger is driven by bet losses being direct-linked to player profiles.'}
              </p>

              {/* Visual Funnel Steps */}
              <div className="space-y-3">
                {/* Step 1: 250M screened */}
                <div className="relative">
                  <div className="bg-zinc-900 border border-zinc-800 p-2.5 flex justify-between items-center z-10 relative">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-zinc-800 text-zinc-300 font-mono text-[11px] font-black flex items-center justify-center rounded-full">1</span>
                      <span className="text-xs font-bold">{isAr ? 'إجمالي التعليقات والمنشورات الممسوحة' : 'Total Screened Posts/Comments'}</span>
                    </div>
                    <span className="font-mono text-xs font-black text-white bg-zinc-800 px-2 py-0.5">250,000,000</span>
                  </div>
                  <div className="w-full bg-red-600/10 h-1 absolute bottom-0 left-0" style={{ width: '100%' }}></div>
                </div>

                {/* Step 2: 30M offensive flagged */}
                <div className="relative pl-4 rtl:pr-4">
                  <div className="bg-zinc-900 border border-zinc-800 p-2.5 flex justify-between items-center z-10 relative">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-950 text-red-400 font-mono text-[11px] font-black flex items-center justify-center rounded-full">2</span>
                      <span className="text-xs font-bold text-red-400">{isAr ? 'التعليقات المسيئة / الكراهية المرصودة' : 'Flagged as Offensive / Hate Speech'}</span>
                    </div>
                    <span className="font-mono text-xs font-black text-red-500 bg-red-950/50 px-2 py-0.5">30,000,000</span>
                  </div>
                  <div className="w-full bg-red-600/20 h-1 absolute bottom-0 left-0" style={{ width: '12%' }}></div>
                </div>

                {/* Step 3: 3.8M reviewed */}
                <div className="relative pl-8 rtl:pr-8">
                  <div className="bg-zinc-900 border border-zinc-800 p-2.5 flex justify-between items-center z-10 relative">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-amber-950 text-amber-400 font-mono text-[11px] font-black flex items-center justify-center rounded-full">3</span>
                      <span className="text-xs font-bold">{isAr ? 'المنشورات المحالة للتدقيق البشري والآلي المعمق' : 'Referred for Advanced Human/AI Review'}</span>
                    </div>
                    <span className="font-mono text-xs font-black text-amber-500 bg-amber-950/50 px-2 py-0.5">3,800,000</span>
                  </div>
                  <div className="w-full bg-red-600/30 h-1 absolute bottom-0 left-0" style={{ width: '1.5%' }}></div>
                </div>

                {/* Step 4: 388k deleted */}
                <div className="relative pl-12 rtl:pr-12 animate-pulse">
                  <div className="bg-red-900/30 border border-red-500/40 p-2.5 flex justify-between items-center z-10 relative">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-600 text-white font-mono text-[11px] font-black flex items-center justify-center rounded-full">4</span>
                      <span className="text-xs font-black text-red-100">{isAr ? 'التعليقات المحذوفة نهائياً فورا' : 'Permanently Deleted Immediately'}</span>
                    </div>
                    <span className="font-mono text-xs font-black text-white bg-red-700 px-2 py-0.5">388,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center text-[10px] text-zinc-500">
              <span>* {isAr ? 'المصدر: إدارة العلاقات الرقمية في الاتحاد الدولي لكرة القدم' : 'Source: FIFA Digital Moderation Agency'}</span>
              <span className="font-mono">UPDATE: JUNE 2026</span>
            </div>
          </div>

          {/* Historical Deletion Comparison (5/12 Cols) */}
          <div className="lg:col-span-5 border border-zinc-800 p-4 bg-zinc-950 flex flex-col justify-between">
            <div>
              <div className="border-b border-zinc-800 pb-2 mb-4">
                <span className="text-white font-sans text-xs font-black uppercase">
                  {isAr ? 'مقارنة المونديال الحالي بالمونديال السابق' : 'Historical World Cup Censorship Growth'}
                </span>
              </div>

              {/* Bar Comparison Charts */}
              <div className="space-y-6 py-2">
                {/* Qatar 2022 */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xxs">
                    <span className="text-zinc-400">QATAR 2022 {isAr ? 'قطر ٢٠٢٢' : ''}</span>
                    <span className="text-zinc-300 font-bold">287,000 {isAr ? 'حذف' : 'Deletions'}</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-6 border border-zinc-700 relative overflow-hidden">
                    <div className="bg-zinc-600 h-full transition-all" style={{ width: '74%' }}></div>
                    <span className="absolute inset-y-0 left-2 flex items-center font-mono text-[10px] font-black text-white">
                      74%
                    </span>
                  </div>
                </div>

                {/* USA/MEX/CAN 2026 */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xxs">
                    <span className="text-red-500 font-bold">USA/MEX/CAN 2026 {isAr ? '٢٠٢٦ الحالي' : ''}</span>
                    <span className="text-red-500 font-black">388,000 {isAr ? 'حذف' : 'Deletions'}</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-6 border border-zinc-700 relative overflow-hidden">
                    <div className="bg-red-700 h-full transition-all" style={{ width: '100%' }}></div>
                    <span className="absolute inset-y-0 left-2 flex items-center font-mono text-[10px] font-black text-white">
                      +35.2% {isAr ? 'زيادة الرقابة' : 'Censorship Surge'}
                    </span>
                  </div>
                </div>
              </div>

              {/* George Weah Warning Box */}
              <div className="border border-red-900 bg-red-950/20 p-3 mt-4 text-right rtl:text-right ltr:text-left space-y-1.5">
                <div className="flex items-center gap-1.5 text-red-500">
                  <ShieldAlert size={14} className="shrink-0" />
                  <span className="font-mono text-[9px] font-black uppercase">
                    {isAr ? 'تأثير عكسي ومكافحة فاشلة:' : 'INVERSE EFFECT WARNING:'}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-300 font-serif leading-relaxed">
                  {isAr 
                    ? 'إخفاء الإهانات والشتائم من الواجهة لا يحل مسببات المشكلة؛ فالتغول المالي لمنصات التوقيع اللامركزية يدفع الجماهير للعدوانية العنيفة تجاه اللاعبين لمجرد عدم تحقيق رهان دقيق.'
                    : 'Hiding insults on screen masks the systemic rot. Financial stress from live blockchain betting makes fans hostile to athletes when micro-predictions fail.'}
                </p>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-2 font-mono text-[9px] text-zinc-500 leading-tight">
              {isAr ? '● تم الكشف عن التقرير في أتلانتا - جورجيا لحركة الحكام المستقلين.' : '● Revealed in Atlanta, Georgia by independent oversight boards.'}
            </div>
          </div>

        </div>
      ) : (
        /* POLYMARKET LIVE BOARD SIMULATOR */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Contracts List (7/12 Cols) */}
          <div className="lg:col-span-7 border border-zinc-800 p-4 bg-zinc-950 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-4">
                <div className="flex items-center gap-1.5">
                  <Coins className="text-red-500" size={16} />
                  <span className="text-white font-sans text-xs font-black uppercase">
                    {isAr ? 'سوق المونديال المتوقع: عقود البلوكشين الحية' : 'Polymarket 2026: Live Blockchain Prediction Pool'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xxs text-zinc-400 bg-zinc-800 px-2 py-0.5">
                    USDC: {userBalance.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Compact Prediction Cards */}
              <div className="space-y-3.5">
                {markets.map((m) => {
                  const noPrice = Math.round((1.0 - m.yesPrice) * 100) / 100;
                  const yesPercentage = Math.round(m.yesPrice * 100);
                  const noPercentage = Math.round(noPrice * 100);

                  return (
                    <div key={m.id} className="border border-zinc-850 bg-zinc-900/60 p-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono text-red-500 font-bold bg-red-950/50 px-1.5 py-0.2 select-none uppercase">
                            {isAr ? m.categoryAr : m.categoryEn}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-500">
                            VOL: ${(m.volume / 1000).toFixed(0)}k USDC
                          </span>
                        </div>
                        <h4 className="text-xs font-black text-white leading-snug">
                          {isAr ? m.titleAr : m.titleEn}
                        </h4>
                        
                        {/* Dynamic Slider Track Visual */}
                        <div className="w-full bg-zinc-800 h-1 mt-1 rounded-full overflow-hidden flex">
                          <div className="bg-emerald-600 h-full" style={{ width: `${yesPercentage}%` }}></div>
                          <div className="bg-red-700 h-full" style={{ width: `${noPercentage}%` }}></div>
                        </div>
                      </div>

                      {/* Vote Buttons */}
                      <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
                        {/* YES Action */}
                        <button
                          onClick={() => handleBuyShares(m.id, 'YES', m.yesPrice)}
                          disabled={userBalance < 100 || loadingMarketId !== null}
                          className={`flex-1 md:flex-initial px-3 py-1 font-mono text-[11px] font-black rounded-none border border-emerald-600 cursor-pointer text-center text-emerald-400 transition-all ${
                            loadingMarketId === m.id + '-YES'
                              ? 'bg-emerald-950/80 animate-pulse'
                              : 'bg-emerald-950/20 hover:bg-emerald-600 hover:text-white'
                          }`}
                        >
                          {loadingMarketId === m.id + '-YES' ? '...' : `YES ${yesPercentage}¢`}
                        </button>

                        {/* NO Action */}
                        <button
                          onClick={() => handleBuyShares(m.id, 'NO', noPrice)}
                          disabled={userBalance < 100 || loadingMarketId !== null}
                          className={`flex-1 md:flex-initial px-3 py-1 font-mono text-[11px] font-black rounded-none border border-red-700 cursor-pointer text-center text-red-400 transition-all ${
                            loadingMarketId === m.id + '-NO'
                              ? 'bg-red-950/80 animate-pulse'
                              : 'bg-red-950/20 hover:bg-red-700 hover:text-white'
                          }`}
                        >
                          {loadingMarketId === m.id + '-NO' ? '...' : `NO ${noPercentage}¢`}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-zinc-850 flex justify-between items-center">
              <span className="text-[10px] text-zinc-500 font-mono">
                * {isAr ? 'اضغط YES أو NO لتجربة المضاربة وتسييل السردية الحية' : 'Click YES or NO to simulate trading probability contracts.'}
              </span>
              <button
                onClick={handleResetSimulator}
                className="text-red-500 font-mono text-xxs font-black hover:text-red-400 uppercase flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw size={10} /> {isAr ? 'إعادة ضبط المحاكاة' : 'Reset Simulator'}
              </button>
            </div>
          </div>

          {/* Simulated Real-Time Block Ledger (5/12 Cols) */}
          <div className="lg:col-span-5 border border-zinc-800 p-4 bg-zinc-950 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-4">
                <span className="text-white font-sans text-xs font-black uppercase flex items-center gap-1.5">
                  <Database size={13} className="text-red-500 animate-spin" />
                  {isAr ? 'مقياس تسلسل الكتل اللامركزي (Ledger)' : 'Live Simulated Blockchain Ledger'}
                </span>
                <span className="bg-red-950 text-red-400 text-[8px] font-mono font-black px-1.5 py-0.2 animate-pulse">
                  ON-CHAIN
                </span>
              </div>

              {/* Transactions Stream list */}
              {recentTx.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center text-zinc-600 font-serif">
                  <TrendingUp size={28} className="opacity-30 mb-2" />
                  <p className="text-xs italic">
                    {isAr ? 'في انتظار صفقاتك... اضغط لشراء العقود في اللوحة الجانبية' : 'No transactions recorded. Click YES or NO on any market to trigger trades.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {recentTx.map((tx) => (
                    <div key={tx.id} className="border border-zinc-900 bg-zinc-900/30 p-2 font-mono text-[10px] space-y-1">
                      <div className="flex justify-between items-center text-[9px] text-zinc-500 border-b border-zinc-900 pb-1">
                        <span>BLOCK: #{tx.block}</span>
                        <span>{tx.timestamp}</span>
                      </div>
                      <p className="text-zinc-200 font-sans font-extrabold truncate">
                        {tx.marketTitle}
                      </p>
                      <div className="flex justify-between items-center pt-0.5">
                        <span className={`font-black text-xxs px-1 py-0.1 ${
                          tx.type === 'YES' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                        }`}>
                          BOUGHT {tx.type} ({tx.shares} SHARES)
                        </span>
                        <span className="text-white font-bold">-{tx.amount} USDC</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Warning Slogan Footer */}
            <div className="border border-red-900 bg-red-950/20 p-2.5 text-[9px] font-serif leading-relaxed text-zinc-350">
              <span className="font-mono text-[9px] font-black text-red-500 block uppercase mb-1">
                ⚠️ {isAr ? 'تأثير المضاربة على كراهية الحكام واللاعبين:' : 'SPECULATION DISASTER FORECAST:'}
              </span>
              {isAr 
                ? 'عند تسييل مجريات المونديال، يتخلى المشجع عن ولائه التاريخي ويصبح مغلولاً بالمنفعة المالية. ينتهي الأمر بغضب مدمر على الحسابات الشخصية للحكام واللاعبين عند حدوث أي خطأ بسيط.'
                : 'By betting on micro-refereeing details, sports turn from passion into cold numbers. The immediate result is explosive personal hate directed at players on social feeds.'}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
