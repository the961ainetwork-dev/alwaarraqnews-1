import React, { useState } from 'react';
import { TrendingDown, TrendingUp, BarChart3, ShieldAlert, Award, FileText, Globe, Landmark, ChevronRight, Minimize2, Maximize2, Info, Activity, Coins, Cpu, RefreshCw, Check } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';

interface ArabMarketsIndicatorsProps {
  language: 'ar' | 'en';
  layoutMode: 'digital' | 'classic-print';
}

export default function ArabMarketsIndicators({ language, layoutMode }: ArabMarketsIndicatorsProps) {
  const isAr = language === 'ar';
  const isPrint = layoutMode === 'classic-print';
  const [activeTab, setActiveTab] = useState<'stocks' | 'commodities'>('stocks');
  const [isReportExpanded, setIsReportExpanded] = useState(true);
  const [infographicType, setInfographicType] = useState<'brent' | 'pipelines'>('brent');

  // Interactive state variables for live-refreshing market indicators
  const [stocks, setStocks] = useState([
    { nameAr: 'تداول السعودية (TASI)', nameEn: 'Saudi Tadawul (TASI)', value: 10933.00, change: -1.20, up: false, volume: '$1.48B', high: 11120.00, low: 10910.00 },
    { nameAr: 'سوق دبي المالي (DFM)', nameEn: 'Dubai Financial Market (DFM)', value: 4180.20, change: 1.12, up: true, volume: '$124.5M', high: 4202.90, low: 4155.00 },
    { nameAr: 'سوق أبوظبي للأوراق المالية (ADX)', nameEn: 'Abu Dhabi Securities (ADX)', value: 9340.60, change: 0.88, up: true, volume: '$310.2M', high: 9380.00, low: 9290.40 },
    { nameAr: 'بورصة الكويت (PRIME)', nameEn: 'Boursa Kuwait (PRIME)', value: 7890.30, change: 0.54, up: true, volume: '$95.1M', high: 7910.20, low: 7840.10 },
    { nameAr: 'بورصة بيروت (BSE)', nameEn: 'Beirut Stock Exchange (BSE)', value: 1950.40, change: -0.32, up: false, volume: '$2.4M', high: 1962.00, low: 1941.50 }
  ]);

  const [commoditiesList, setCommoditiesList] = useState([
    { nameAr: 'خام برنت العالمي (Brent)', nameEn: 'Brent Crude Spot', value: 81.50, change: 1.85, up: true, unit: 'USD/bbl', range: '77.40 - 82.10' },
    { nameAr: 'خام غرب تكساس (WTI)', nameEn: 'WTI Light Sweet', value: 75.33, change: -1.90, up: false, unit: 'USD/bbl', range: '74.80 - 77.10' },
    { nameAr: 'الغاز الطبيعي الفوري', nameEn: 'Natural Gas Spot', value: 2.14, change: -3.12, up: false, unit: 'USD/MMBtu', range: '2.10 - 2.25' },
    { nameAr: 'الذهب الفوري (Spot Gold)', nameEn: 'Spot Gold Index', value: 4320.50, change: 1.50, up: true, unit: 'USD/oz', range: '4,240.00 - 4,336.00' },
    { nameAr: 'الفضة الحرة (Spot Silver)', nameEn: 'Spot Silver Index', value: 31.25, change: 0.75, up: true, unit: 'USD/oz', range: '30.80 - 31.60' }
  ]);

  const [brentPrices, setBrentPrices] = useState([126.00, 112.00, 98.00, 77.40, 81.50]);
  const [pipelineFlows, setPipelineFlows] = useState([4.5, 1.2, 0.3]);

  const [gccCap, setGccCap] = useState(3.42);
  const [gccCapChange, setGccCapChange] = useState(2.18);
  const [oilVolume, setOilVolume] = useState(14.2);
  const [oilVolumeChange, setOilVolumeChange] = useState(-12.4);
  const [insurancePremium, setInsurancePremium] = useState(-4.50);

  const [lastUpdated, setLastUpdated] = useState<string>('2026-07-02 01:21:34');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Fluctuating stocks
      setStocks(prev => prev.map(stock => {
        const pct = (Math.random() * 0.8 - 0.4); // -0.4% to +0.4%
        const multiplier = 1 + (pct / 100);
        const newValue = stock.value * multiplier;
        const newChange = stock.change + pct;
        return {
          ...stock,
          value: parseFloat(newValue.toFixed(2)),
          change: parseFloat(newChange.toFixed(2)),
          up: newChange >= 0
        };
      }));

      // Fluctuating commodities
      setCommoditiesList(prev => prev.map(comm => {
        const pct = (Math.random() * 1.2 - 0.6); // -0.6% to +0.6%
        const multiplier = 1 + (pct / 100);
        const newValue = comm.value * multiplier;
        const newChange = comm.change + pct;
        return {
          ...comm,
          value: parseFloat(newValue.toFixed(comm.value < 10 ? 2 : 1)),
          change: parseFloat(newChange.toFixed(2)),
          up: newChange >= 0
        };
      }));

      // Fluctuating Brent Chart
      setBrentPrices(prev => {
        const updated = [...prev];
        const pct = (Math.random() * 2 - 1); // -1% to +1%
        updated[4] = parseFloat((updated[4] * (1 + pct / 100)).toFixed(2));
        return updated;
      });

      // Fluctuating Pipeline flows
      setPipelineFlows(prev => prev.map(flow => {
        const delta = (Math.random() * 0.2 - 0.1); // -0.1 to +0.1 M bpd
        return parseFloat(Math.max(0.1, flow + delta).toFixed(1));
      }));

      // Fluctuating GCC Cap
      setGccCap(prev => {
        const pct = (Math.random() * 0.4 - 0.2); // -0.2% to +0.2%
        return parseFloat((prev * (1 + pct / 100)).toFixed(2));
      });
      setGccCapChange(prev => parseFloat((prev + (Math.random() * 0.1 - 0.05)).toFixed(2)));

      // Fluctuating Oil corridor volume
      setOilVolume(prev => {
        const delta = (Math.random() * 0.4 - 0.2); // -0.2 to +0.2 M bpd
        return parseFloat(Math.max(5, prev + delta).toFixed(1));
      });
      setOilVolumeChange(prev => parseFloat((prev + (Math.random() * 0.2 - 0.1)).toFixed(1)));

      // Fluctuating Insurance premium
      setInsurancePremium(prev => {
        const delta = (Math.random() * 0.3 - 0.15); // -0.15 to +0.15 USD
        return parseFloat((prev + delta).toFixed(2));
      });

      // Update timestamp to current browser time with 2026 locked year
      const now = new Date();
      const year = 2026;
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setLastUpdated(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);

      setIsRefreshing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  // Auto-fluctuate crude oil and natural gas prices in real-time
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCommoditiesList(prev => prev.map(comm => {
        // Only fluctuate Brent Crude, WTI Light Sweet, and Natural Gas Spot
        const nameEn = comm.nameEn.toLowerCase();
        if (nameEn.includes('brent') || nameEn.includes('wti') || nameEn.includes('natural gas')) {
          const changePct = (Math.random() * 0.2 - 0.1); // small real-time variation (-0.1% to +0.1%)
          const multiplier = 1 + (changePct / 100);
          const newValue = comm.value * multiplier;
          // Change relative trend
          const changeDelta = (Math.random() * 0.15 - 0.075);
          const newChange = comm.change + changeDelta;
          return {
            ...comm,
            value: parseFloat(newValue.toFixed(comm.value < 10 ? 3 : 2)),
            change: parseFloat(newChange.toFixed(2)),
            up: newChange >= 0
          };
        }
        return comm;
      }));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Specific Arab markets sparkline paths (mock SVGs for professional trading appearance)
  const getSparklinePath = (index: number, up: boolean) => {
    const paths = [
      "M 0,25 C 10,15 20,35 30,22 C 40,10 50,28 60,18 C 70,8 80,20 100,2",
      "M 0,28 C 15,18 25,32 40,20 C 55,8 65,22 80,12 C 90,2 100,8",
      "M 0,20 C 10,25 20,15 30,12 C 45,8 60,30 75,18 C 85,10 100,4",
      "M 0,30 C 15,35 30,20 45,25 C 60,15 75,10 100,8",
      "M 0,10 C 15,12 30,22 45,18 C 60,25 75,32 100,38" // Downward trend
    ];
    return paths[index % paths.length];
  };

  // Infographics data mapped dynamically from prices state
  const brentTrendData = [
    { date: isAr ? '٢١ يونيو' : 'Jun 21', price: brentPrices[0], label: isAr ? 'فترة صراع الذروة' : 'Peak Conflict Period' },
    { date: isAr ? '٢٢ يونيو' : 'Jun 22', price: brentPrices[1], label: isAr ? 'بداية مفاوضات سويسرا' : 'Swiss Talks Commenced' },
    { date: isAr ? '٢٤ يونيو' : 'Jun 24', price: brentPrices[2], label: isAr ? 'التوقيع على الاتفاق' : 'Agreement Signed' },
    { date: isAr ? '٢٦ يونيو' : 'Jun 26', price: brentPrices[3], label: isAr ? 'أدنى مستويات التهدئة' : 'Truce Bottom Pricing' },
    { date: isAr ? '٢٩ يونيو' : 'Jun 29', price: brentPrices[4], label: isAr ? 'التصعيد والمنوشات الأخيرة' : 'Recent Skirmish Escalation' },
  ];

  const pipelineData = [
    { name: isAr ? 'أنابيب السعودية' : 'Saudi Petroline', max: 7.0, current: pipelineFlows[0] },
    { name: isAr ? 'أنابيب الإمارات' : 'UAE Habshan', max: 1.5, current: pipelineFlows[1] },
    { name: isAr ? 'أنابيب العراق' : 'Iraq Ceyhan', max: 0.5, current: pipelineFlows[2] },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black text-white p-2 border border-zinc-700 font-mono text-[10px] space-y-1">
          <p className="font-bold">{label}</p>
          {payload.map((item: any, idx: number) => (
            <p key={idx} className="flex gap-2 justify-between">
               <span>{item.name}:</span>
               <span className="font-bold">{item.value} {infographicType === 'brent' ? 'USD/bbl' : 'M bpd'}</span>
            </p>
          ))}
          {payload[0].payload.label && (
            <p className="text-zinc-400 border-t border-zinc-800 pt-1 mt-1 text-[9px]">
              {payload[0].payload.label}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`border-4 border-black p-5 bg-white select-none transition-all relative ${
      isPrint ? 'vintage-paper border-[#1b2b1d] text-[#1b2b1d]' : 'bg-white text-zinc-900 shadow-xs'
    }`}>
      {/* Dynamic Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white border-2 border-emerald-500 px-4 py-3 shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] flex items-center gap-2 font-mono text-xs animate-slide-in">
          <Check size={14} className="text-emerald-500 shrink-0" />
          <span>
            {isAr 
              ? 'تم تحديث البيانات الفيدرالية اللحظية للأسواق بنجاح.' 
              : 'Federal live market feed synchronized successfully.'}
          </span>
        </div>
      )}

      {/* Real-time Animated Ticker Bar using CSS keyframes */}
      <div className="mb-5 border border-zinc-200 rounded-md bg-zinc-950 text-white overflow-hidden py-2 relative shadow-inner select-none">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes ticker-marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .ticker-marquee-container {
            overflow: hidden;
            white-space: nowrap;
            width: 100%;
            display: flex;
            align-items: center;
          }
          .ticker-marquee-inner {
            display: inline-flex;
            animation: ticker-marquee 25s linear infinite;
            width: max-content;
            gap: 2rem;
          }
          .ticker-marquee-inner:hover {
            animation-play-state: paused;
          }
        `}} />
        
        <div className="ticker-marquee-container">
          {/* Badge indicator on the left side of the tape */}
          <div className="absolute left-0 top-0 bottom-0 px-3 bg-red-600 font-bold flex items-center text-[10px] uppercase tracking-wider font-mono z-10 border-r border-red-700 select-none shadow-md">
            <span className="animate-pulse mr-1.5 h-1.5 w-1.5 rounded-full bg-white inline-block"></span>
            {isAr ? 'مباشر' : 'LIVE'}
          </div>
          
          <div className="ticker-marquee-inner pl-16">
            {/* We duplicate items to create a seamless infinite marquee scrolling loop */}
            {[...Array(3)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                {commoditiesList
                  .filter(c => {
                    const name = c.nameEn.toLowerCase();
                    return name.includes('brent') || name.includes('wti') || name.includes('natural gas');
                  })
                  .map((item, idx) => {
                    // For RISING (change >= 0): Red color indicator, TrendingUp icon
                    // For FALLING (change < 0): Green color indicator, TrendingDown icon
                    const isRising = item.change >= 0;
                    const colorClass = isRising ? 'text-red-500 font-bold' : 'text-emerald-400 font-bold';
                    const bgClass = isRising ? 'bg-red-950/40 border-red-900/50' : 'bg-emerald-950/40 border-emerald-900/50';
                    const IconComponent = isRising ? TrendingUp : TrendingDown;
                    
                    return (
                      <div 
                        key={`${loopIdx}-${idx}`} 
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded border text-xs font-mono transition-colors duration-300 ${bgClass}`}
                      >
                        <span className="text-zinc-400 text-[10px] font-sans">
                          {isAr ? item.nameAr.split('(')[0].trim() : item.nameEn}
                        </span>
                        <span className="text-white font-bold">${item.value.toFixed(item.value < 10 ? 3 : 2)}</span>
                        <span className={`flex items-center gap-1 ${colorClass}`}>
                          <IconComponent size={12} className={isRising ? "text-red-500 shrink-0" : "text-emerald-400 shrink-0"} />
                          <span>{isRising ? '+' : ''}{item.change.toFixed(2)}%</span>
                        </span>
                      </div>
                    );
                  })}
                {/* Additional SPR Delivery item to make the tape richer and thematic */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded border bg-zinc-900/60 border-zinc-800 text-xs font-mono">
                  <span className="text-zinc-400 text-[10px] font-sans">
                    {isAr ? 'معدل سحب الاستراتيجي الفيدرالي' : 'US Federal SPR Draw'}
                  </span>
                  <span className="text-white font-bold">1.43M bpd</span>
                  <span className="text-red-400 font-bold px-1.5 py-0.25 bg-red-950/50 border border-red-900/40 rounded text-[9px]">
                    {isAr ? 'نشط طارئ' : 'ACTIVE'}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION HEADER: double line editorial format */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-4 mb-5 border-b-2 border-black border-double gap-4">
        <div className="flex items-center gap-2">
          <Landmark size={20} className="text-[#b91c1c] shrink-0" />
          <div>
            <h4 className="font-sans font-black text-lg md:text-xl tracking-tighter uppercase flex items-center gap-2">
              <span>{isAr ? 'مؤشرات الأسواق المالية العربية وتداول الطاقة' : 'ARAB MARKETS INDICATORS & ENERGY BOURSE'}</span>
            </h4>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
              {isAr ? 'البيانات اللحظية المتكاملة برعاية ملحق شؤون النقد والطاقة الإقليمي • الورّاق ٢٠٢٦' : 'MOU Integration Index & Intraday Arab Equity Tickers • Al-Warraq 2026'}
            </p>
          </div>
        </div>

        {/* Refresh Action & Categories Tab navigation */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Real-time Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-1.5 px-3 py-1 border border-black text-[11px] font-black font-sans uppercase transition-all select-none cursor-pointer ${
              isRefreshing 
                ? 'bg-zinc-150 text-zinc-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-[#b91c1c]'
            }`}
          >
            <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
            <span>{isRefreshing ? (isAr ? 'تحديث...' : 'REFRESHING...') : (isAr ? 'تحديث فوري' : 'REFRESH FEED')}</span>
          </button>

          <div className="flex border border-black p-0.5 font-sans text-[11px] font-black bg-white">
            <button
              onClick={() => setActiveTab('stocks')}
              className={`px-3 py-1 cursor-pointer transition-colors ${
                activeTab === 'stocks' ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-700'
              }`}
            >
              {isAr ? 'الأسهم والعواصم العربية' : 'Arab Equities'}
            </button>
            <button
              onClick={() => setActiveTab('commodities')}
              className={`px-3 py-1 cursor-pointer transition-colors border-l border-black ${
                activeTab === 'commodities' ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-700'
              }`}
            >
              {isAr ? 'النفط الخام والمعادن' : 'Crude Oil & Commodities'}
            </button>
          </div>
        </div>
      </div>

      {/* INFOGRAPHICS DASHBOARD PANEL */}
      <div className="border border-black mb-6 p-4 bg-zinc-50 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-200 pb-3 gap-3">
          <div>
            <span className="text-[10px] font-mono text-[#b91c1c] uppercase tracking-wider block font-black">
              {isAr ? 'التحليلات المرئية التفاعلية' : 'INTERACTIVE VISUAL INFOGRAPHICS'}
            </span>
            <h5 className="font-sans font-black text-sm text-zinc-950">
              {isAr ? 'بيانات معبر الطاقة هرمز وممرات الالتفاف الإقليمية' : 'Hormuz Transit Corridor & Regional Bypass Metrics'}
            </h5>
          </div>
          <div className="flex border border-black p-0.5 text-[10px] font-mono font-bold bg-white select-none shrink-0">
            <button
              onClick={() => setInfographicType('brent')}
              className={`px-2.5 py-1 cursor-pointer transition-all ${
                infographicType === 'brent' ? 'bg-[#b91c1c] text-white' : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              {isAr ? 'مؤشر نفط برنت وسعر التهدئة' : 'Brent Crude Index'}
            </button>
            <button
              onClick={() => setInfographicType('pipelines')}
              className={`px-2.5 py-1 cursor-pointer transition-all border-l border-black ${
                infographicType === 'pipelines' ? 'bg-[#b91c1c] text-white' : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              {isAr ? 'أنابيب الالتفاف الإقليمية' : 'Bypass Pipeline Capacities'}
            </button>
          </div>
        </div>

        <div className="h-64 w-full">
          {infographicType === 'brent' ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={brentTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#b91c1c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis 
                  dataKey="date" 
                  stroke="#18181b" 
                  tick={{ fontSize: 9, fontFamily: 'monospace', fontWeight: 700 }} 
                />
                <YAxis 
                  domain={[60, 140]} 
                  stroke="#18181b" 
                  tick={{ fontSize: 9, fontFamily: 'monospace', fontWeight: 700 }} 
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area 
                  name={isAr ? 'سعر خام برنت' : 'Brent Crude Price'} 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#b91c1c" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorBrent)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis 
                  dataKey="name" 
                  stroke="#18181b" 
                  tick={{ fontSize: 9, fontWeight: 700 }} 
                />
                <YAxis 
                  stroke="#18181b" 
                  tick={{ fontSize: 9, fontFamily: 'monospace', fontWeight: 700 }} 
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar 
                  name={isAr ? 'السعة التصميمية القصوى (مليون برميل)' : 'Max Capacity (M bpd)'} 
                  dataKey="max" 
                  fill="#e4e4e7" 
                  stroke="#71717a"
                  strokeWidth={1}
                />
                <Bar 
                  name={isAr ? 'التدفق التشغيلي النشط' : 'Current Active Flow (M bpd)'} 
                  dataKey="current" 
                  fill="#b91c1c" 
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[9px] font-mono text-zinc-500 gap-2 border-t border-zinc-200 pt-2">
          <span className="flex items-center gap-1">
            <Info size={10} className="text-[#b91c1c]" />
            {isAr 
              ? 'تتضح تقلبات النفط الكبيرة بالتوازي مع تصاعد ونزول سقف التفاؤل الدبلوماسي وعودة الضربات.' 
              : 'Oil volatility correlates tightly with rising/falling ceilings of diplomatic optimism and kinetic strikes.'}
          </span>
          <span className="font-bold">
            {isAr ? 'المصدر: تحليلات الورّاق الاستراتيجية للطاقة • غولدن ساكس' : 'Source: Al-Warraq Strategic Energy Bureau • Goldman Sachs'}
          </span>
        </div>
      </div>

      {/* TOP FEATURED ROW: Middle East & North Africa Markets */}
      <div className="border border-black p-4 mb-6 bg-zinc-50 flex flex-col gap-4 relative overflow-hidden">
        {/* Editorial Top Ribbon */}
        <div className="flex justify-between items-center border-b border-zinc-300 pb-2.5">
          <span className="bg-[#b91c1c] text-white px-2 py-0.5 font-mono text-[9px] font-black tracking-widest uppercase flex items-center gap-1">
            <Award size={11} />
            {isAr ? 'تقرير استراتيجي حصري' : 'EXCLUSIVE STRATEGIC REPORT'}
          </span>
          <button 
            type="button"
            onClick={() => setIsReportExpanded(!isReportExpanded)}
            className="font-mono text-[9px] font-black uppercase text-zinc-650 hover:text-black flex items-center gap-1 cursor-pointer transition-colors"
          >
            {isReportExpanded ? (
              <>
                <Minimize2 size={11} />
                {isAr ? 'طي التقرير' : 'CONDENSE FEATURE'}
              </>
            ) : (
              <>
                <Maximize2 size={11} />
                {isAr ? 'عرض قراءة موسعة' : 'EXPAND DETAILED LOOK'}
              </>
            )}
          </button>
        </div>

        {/* Report Content Panel */}
        <div className="space-y-4">
          <h5 className="font-sans font-black text-base md:text-lg text-zinc-950 leading-snug hover:text-[#b91c1c] transition-colors">
            {isAr 
              ? 'أسواق الشرق الأوسط وشمال أفريقيا: تقلبات هرمز والتوازن الخليجي الهش' 
              : 'Middle East & North Africa Markets: Hormuz Volatility & Fragile Gulf Equilibrium'}
          </h5>

          <p className="text-xs text-zinc-700 leading-relaxed font-sans font-medium">
            {isAr 
              ? 'قدم الأسبوع الأخير من شهر يونيو/حزيران 2026 درساً بليغاً في تقلبات السوق، مما يؤكد مدى سرعة تبدد التفاؤل الدبلوماسي أمام الوقائع الميدانية والتحركات العسكرية. ومع اقتراب نهاية الشهر، تجد الأسواق العربية نفسها عالقة في شد حذْب محفوف بالمخاطر بين وعود الاتفاق المؤقت بين الولايات المتحدة وإيران والكوابيس اللوجستية الناجمة عن تعطل ممر الطاقة.'
              : 'The final week of June 2026 provided a masterclass in market volatility, underscoring how quickly diplomatic optimism can evaporate in the face of on-the-ground realities and military maneuvers. As the month draws to a close, Arab markets find themselves caught in a perilous tug-of-war between the promises of the interim U.S.-Iran agreement and the logistic nightmares stemming from disruptions to the vital energy corridor.'}
          </p>

          {isReportExpanded && (
            <div className="space-y-6 pt-2 border-t border-zinc-200 animate-slide-down">
              {/* Part 1 */}
              <div className="space-y-2">
                <h6 className="font-sans font-black text-sm text-zinc-950 uppercase border-r-4 border-[#b91c1c] pr-2.5">
                  {isAr ? '١. النفط: تلاشي علاوة السلام وعودة التقلبات' : '1. Oil: Fading Peace Premium & Return of Volatility'}
                </h6>
                <p className="text-xs text-zinc-700 leading-relaxed font-sans font-medium">
                  {isAr 
                    ? 'اتجهت أسعار النفط العالمية نحو الانخفاض في بداية الأسبوع بفعل أنباء الاتفاق الأمريكي الإيراني، حيث انخفض خام برنت إلى ما دون 77.40 دولاراً للبرميل، بعد أن فقد حوالي 4.5 دولار في جلسة واحدة عقب الإعلان عن الاتفاق السويسري. لكن هذا الانخفاض تبخر بسرعة مع نهاية الأسبوع، حيث أثارت المناوشات البحرية الجديدة والغموض الذي يحيط بتفسير شروط حرية الحركة في مضيق هرمز مخاوف جديدة من تجدد الصراع، مما دفع برنت للارتداد ليقترب من 81.50+ دولار وسط تداولات عاصفة.'
                    : 'Global oil prices initially trended downward early in the week on news of the U.S.-Iran agreement, with Brent crude dipping to a low of $77.40 per barrel—shedding nearly $4.50 in a single session following the announcement of the Swiss accord. However, these losses evaporated by week\'s end as fresh naval skirmishes and ambiguity surrounding the interpretation of transit terms in the Strait of Hormuz sparked renewed fears of conflict, pushing Brent to bounce back above $81.50+ amid turbulent trading.'}
                </p>
              </div>

              {/* Part 2 */}
              <div className="space-y-2">
                <h6 className="font-sans font-black text-sm text-zinc-950 uppercase border-r-4 border-[#b91c1c] pr-2.5">
                  {isAr ? '٢. الأسهم الخليجية: أداء متأرجح بقيادة تداول (تاسي)' : '2. Gulf Equities: Swing Performance Led by Tadawul (TASI)'}
                </h6>
                <p className="text-xs text-zinc-700 leading-relaxed font-sans font-medium">
                  {isAr 
                    ? 'شهدت الأسواق المالية في منطقة الخليج أسبوعاً متقلباً. فبينما تفاعلت أسواق دبي وأبوظبي إيجاباً مع فرص التهدئة، شهد المؤشر العام للسعودية (تاسي) تداولات حذرة، حيث أغلق منخفضاً بنسبة 1.2% ليدافع عن مستويات 10,933 نقطة، متأثراً بتراجع أسهم أرامكو والقطاع البتروكيماوي. من ناحية أخرى، سجلت البورصة الكويتية استقراراً نسبياً بدعم من آمال توسيع ممر التصدير عبر الأنابيب البرية والربط اللوجستي.'
                    : 'Gulf stock markets experienced a highly volatile week. While Dubai and Abu Dhabi indices reacted positively to cooling tensions, Saudi Arabia\'s benchmark Tadawul All Share Index (TASI) saw cautious trading, closing down 1.2% to defend the 10,933-point level, weighed down by drops in Aramco and petrochemical giants. Conversely, the Kuwaiti bourse remained relatively stable, buoyed by hopes of expanding overland pipeline export routes and logistic integration.'}
                </p>
              </div>

              {/* Part 3 */}
              <div className="space-y-2">
                <h6 className="font-sans font-black text-sm text-zinc-950 uppercase border-r-4 border-[#b91c1c] pr-2.5">
                  {isAr ? '٣. معضلة هرمز وسيناريوهات فك الارتباط' : '3. The Hormuz Dilemma and Decoupling Scenarios'}
                </h6>
                <p className="text-xs text-zinc-700 leading-relaxed font-sans font-medium">
                  {isAr 
                    ? 'تتوقع أحدث تحليلات "غولدمان ساكس" و"سيتي جروب" أن تستقر تدفقات النفط عبر مضيق هرمز عند 70% فقط من مستويات ما قبل الحرب في الأمد القريب. ويعكس هذا التقييم الصدمة اللوجستية الهيكلية التي تعرض لها قطاع الشحن البحري، وتأخر تفعيل آلية "الخط الساخن" العسكري لتنسيق المرور بين واشنطن وطهران، مما يدفع دول المنطقة لتسريع مشاريع خطوط الأنابيب البرية الالتفافية لإنهاء اعتمادها الكامل على هذا الممر المائي الحرج.'
                    : 'The latest analytic briefs from Goldman Sachs and Citigroup estimate that oil shipments through the Strait of Hormuz will stabilize at just 70% of pre-war volumes in the near term. This assessment reflects the structural logistical shock suffered by the marine shipping industry and the delayed activation of the military "hotline" between Washington and Tehran, driving regional states to accelerate bypass pipelines to decouple completely from the critical waterway.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM TAB-RELATED PANELS (Stocks / Commodities detailed look) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        {/* Metric widgets block (Left side index) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="border border-black p-4 bg-zinc-50 relative overflow-hidden">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
              {isAr ? 'إجمالي رسملة الأسواق الخليجية' : 'GCC Aggregate Market Cap'}
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-3xl font-black font-mono">${gccCap.toFixed(2)}T</span>
              <span className={`text-xs font-bold flex items-center gap-0.5 ${gccCapChange >= 0 ? 'text-emerald-700' : 'text-[#b91c1c]'}`} dir="ltr">
                {gccCapChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />} 
                {gccCapChange >= 0 ? '+' : ''}{gccCapChange.toFixed(2)}%
              </span>
            </div>
            <p className="text-[10.5px] text-zinc-500 mt-2 leading-relaxed">
              {isAr 
                ? 'استجابت البورصات الإقليمية الكبرى وعلى رأسها البورصة السعودية والقطرية بارتفاعات ممتلية نتيجة زوال مخاوف حظر تدفق ناقلات النفط عبر المنافذ البحرية.'
                : 'Major regional equity exchanges pointed upwards, led by Tadawul, driven by the erasure of immediate shipping blockage threats around the Bab-el-Mandeb and Hormuz.'}
            </p>
          </div>

          <div className="border border-black p-4 bg-zinc-50 relative overflow-hidden">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
              {isAr ? 'متوسط قيمة التداول اليومي للطاقة' : 'Average Daily Oil Corridor Volume'}
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-3xl font-black font-mono">{oilVolume.toFixed(1)}M bpd</span>
              <span className={`text-xs font-bold flex items-center gap-0.5 ${oilVolumeChange >= 0 ? 'text-emerald-700' : 'text-red-650'}`} dir="ltr">
                {oilVolumeChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />} 
                {oilVolumeChange >= 0 ? '+' : ''}{oilVolumeChange.toFixed(1)}%
              </span>
            </div>
            <p className="text-[10.5px] text-zinc-500 mt-2 leading-relaxed">
              {isAr 
                ? 'تراجع حجم شحنات الطوارئ المارة بالقنوات البديلة بنسبة طفيفة نتيجة إعادة توجيه جزء من الحمولات للمسار الأساسي لمضيق هرمز بشكل تدريجي ومأمون.'
                : 'Emergency shipping diversions through bypass routes diminished as shipping outfits gradually and safely reprogrammed vessels back to the central gulf waterways.'}
            </p>
          </div>

          <div className="border border-black p-3 text-[10px] font-mono font-bold flex justify-between bg-black text-white items-center">
            <span>{isAr ? 'علاوة التأمين الجيوسياسي لبرميل النفط:' : 'Crude Geopolitical Insurance Premium:'}</span>
            <span className="text-red-400">{insurancePremium >= 0 ? '+' : ''}${insurancePremium.toFixed(2)} / bbl</span>
          </div>
        </div>

        {/* Detailed Items list with custom sparklines (Middle panel) */}
        <div className="lg:col-span-8 border border-zinc-300 p-4 font-mono flex flex-col justify-between">
          <div>
            <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200 font-sans">
              {activeTab === 'stocks' 
                ? (isAr ? 'الأسهم والعواصم العربية النشطة' : 'Active Arab Equity Board')
                : (isAr ? 'أسعار السلع ونفوط الطاقة العالمية' : 'Global Oil & Commodity Quotes')
              }
            </span>

            <div className="divide-y divide-zinc-200 mt-4 max-h-[220px] overflow-y-auto scrollbar-none pr-1">
              {(activeTab === 'stocks' ? stocks : commoditiesList).map((item, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center text-[10.5px] font-sans">
                  {/* Title metadata */}
                  <div className="space-y-0.5 max-w-[180px] sm:max-w-xs text-right rtl:text-right">
                    <span className="font-extrabold text-zinc-900 block truncate">{isAr ? item.nameAr : item.nameEn}</span>
                    <span className="font-mono text-[9px] text-zinc-400 uppercase">
                      {'volume' in item ? `${isAr ? 'حجم:' : 'Vol:'} ${item.volume}` : `${isAr ? 'المدى:' : 'Range:'} ${item.range}`}
                    </span>
                  </div>

                  {/* Tiny simulated interactive sparkline chart */}
                  <div className="hidden sm:block w-20 h-6">
                    <svg className="w-full h-full" viewBox="0 0 100 40">
                      <path
                        d={getSparklinePath(idx, item.up)}
                        fill="none"
                        stroke={item.up ? "#059669" : "#b91c1c"}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  {/* Value and direction indicator badge */}
                  <div className="text-left font-mono">
                    <div className="font-black text-zinc-950 flex items-center justify-end gap-1 font-mono">
                      <span>
                        {'unit' in item 
                          ? `${item.value.toLocaleString(undefined, { minimumFractionDigits: item.value < 10 ? 2 : 1, maximumFractionDigits: 2 })} ${item.unit}` 
                          : item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <span className={`text-[9.5px] font-black uppercase tracking-wider block text-left ${
                      item.up ? 'text-emerald-700' : 'text-[#b91c1c]'
                    }`}>
                      {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[9px] text-zinc-400 text-center font-mono font-medium pt-3 border-t border-zinc-100 flex items-center justify-between">
            <span>{isAr ? 'بث فوري عبر الأقمار: رويترز / بلومبرغ' : 'Live Feeds via Satellite: Reuters / Bloomberg'}</span>
            <span>{isAr ? `آخر تحديث: ${lastUpdated}` : `Last Updated: ${lastUpdated}`}</span>
          </div>
        </div>
      </div>

      {/* MARKET TRIAD: STRATEGIC EDITORIAL ANGLES INFOGRAPHIC */}
      <div className="mt-8 border-4 border-black p-4 md:p-6 bg-zinc-50 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* Top Accent Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#b91c1c]"></div>
        
        {/* Section Title */}
        <div className="border-b border-black pb-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-2.5 h-2.5 bg-[#b91c1c] inline-block animate-pulse"></span>
              <span className="font-mono text-[9px] font-black tracking-widest text-red-700 uppercase">
                {isAr ? 'زاوية التحليل الجيواقتصادي والمقالات الافتتاحية' : 'GEO-ECONOMIC INTELLIGENCE & EDITORIAL RADAR'}
              </span>
            </div>
            <h4 className="font-sans font-black text-lg md:text-xl text-zinc-950 leading-tight">
              {isAr ? 'ثلاثية زوايا السوق: الافتتاحيات الاستراتيجية والموقف الهيكلي' : 'The Market Triad: Strategic Editorials & Structural Angles'}
            </h4>
            <p className="text-[11px] text-zinc-500 font-serif leading-relaxed mt-1 max-w-2xl">
              {isAr 
                ? 'تحليل تفاعلي متزامن لثلاث جبهات رئيسية تحرك عصب المال العالمي: أسواق السلع وتحدي مضيق هرمز، طفرة الرقائق الآسيوية مقابل وهن العملات، ومستويات مناعة وول ستريت.' 
                : 'A cross-linked visual analysis of three core vectors defining global capital markets: gold and maritime corridors, Asia’s chip frenzy versus fiat fragility, and central banking Sintra limits.'}
            </p>
          </div>
          
          <span className="text-[9px] font-mono font-bold bg-black text-white px-2 py-0.5 rounded uppercase">
            {isAr ? '٣ جبهات تحليلية' : '3 Strategic Vertices'}
          </span>
        </div>

        {/* 3-Column Interactive Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Column 1: Gold & Strait of Hormuz Paradox */}
          <div className="border-2 border-black bg-white p-4 flex flex-col justify-between relative overflow-hidden group hover:shadow-[3px_3px_0px_0px_rgba(185,28,28,1)] transition-all">
            <div>
              <div className="flex justify-between items-start gap-2 mb-3">
                <div className="bg-amber-50 text-amber-700 border border-amber-200 p-2">
                  <Coins size={18} />
                </div>
                <div className="text-right rtl:text-right ltr:text-left">
                  <span className="font-mono text-[8.5px] font-bold text-red-700 uppercase tracking-wider block">
                    {isAr ? 'الملاذات الآمنة مقابل الفائدة' : 'SAFE-HAVENS VS MONETARY CURVE'}
                  </span>
                  <span className="inline-block bg-amber-150 text-amber-900 font-mono text-[9.5px] font-black border border-amber-300 px-1.5 py-0.2 mt-0.5" dir="ltr">
                    GOLD &lt; $4,000 / -25%
                  </span>
                </div>
              </div>

              <h5 className="font-sans font-black text-xs md:text-sm text-zinc-900 leading-snug mb-2">
                {isAr ? 'الذهب ومفارقة هرمز.. تسعير الفائدة يغلب دوي المدافع' : 'Gold & The Hormuz Paradox: Interest Rates Drown Out War Drums'}
              </h5>

              <p className="text-[11.5px] text-zinc-650 leading-relaxed font-serif mb-4 line-clamp-6">
                {isAr 
                  ? 'بين مطرقة الفيدرالي وسندان التوترات الجيوسياسية، يفقد المعدن الأصفر بريقه كأصل آمن، لتكشف الأسواق عن أولوياتها الحقيقية في النظام العالمي الراهن. لم يكن كسر الذهب لحاجز 4000 دولار هبوطاً مجرد تراجع فني، بل هو انعكاس عميق لتحول في سيكولوجية المستثمرين؛ فرأس المال يفضل العائد المرتفع على التحوط العقيم أمام أسعار الفائدة الأميركية المرتفعة لفترة أطول.' 
                  : 'Caught between the Federal Reserve\'s hammer and the anvil of geopolitical tensions, the yellow metal loses its luster as a safe-haven asset. Gold breaking below $4,000 was not a technical retracement; it reflects a shift in investor psychology where high interest rate yields dominate over non-yielding safe-haven hedging, even as U.S. and Iran trade mixed signals over the Strait of Hormuz.'}
              </p>
            </div>

            {/* Column 1 Mini Chart Tool */}
            <div className="border-t border-dashed border-zinc-200 pt-3.5 mt-2">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-zinc-500 mb-1">
                <span>{isAr ? 'قوة الدولار وعائدات الفائدة الأميركية' : 'US Dollar & High Interest Yield Pressure'}</span>
                <span className="text-emerald-700">85%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-100 border border-zinc-200">
                <div className="h-full bg-[#b91c1c] w-[85%]"></div>
              </div>
              <p className="text-[8.5px] text-zinc-400 font-mono mt-1 leading-tight">
                {isAr ? 'تفوق الفرصة البديلة لـ "العائد المرتفع" يجهض موجة صعود المعادن الثمينة.' : 'High opportunity cost of cash suppresses precious metals momentum.'}
              </p>
            </div>
          </div>

          {/* Column 2: Asia Between AI Frenzy & Currency Fragility */}
          <div className="border-2 border-black bg-white p-4 flex flex-col justify-between relative overflow-hidden group hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div>
              <div className="flex justify-between items-start gap-2 mb-3">
                <div className="bg-blue-50 text-blue-700 border border-blue-200 p-2">
                  <Cpu size={18} />
                </div>
                <div className="text-right rtl:text-right ltr:text-left">
                  <span className="font-mono text-[8.5px] font-bold text-blue-700 uppercase tracking-wider block">
                    {isAr ? 'طفرة الرقائق والعملة الوطنية' : 'CHIP BOOM VS FIAT DEVALUATION'}
                  </span>
                  <span className="inline-block bg-blue-150 text-blue-900 font-mono text-[9.5px] font-black border border-blue-300 px-1.5 py-0.2 mt-0.5" dir="ltr">
                    YEN @ 1986 LOW / $1.3T
                  </span>
                </div>
              </div>

              <h5 className="font-sans font-black text-xs md:text-sm text-zinc-900 leading-snug mb-2">
                {isAr ? 'آسيا بين نشوة "الذكاء الاصطناعي" وهشاشة العملات الحقيقية' : 'Asia Between "AI" Ecstasy & Real Currency Fragility'}
              </h5>

              <p className="text-[11.5px] text-zinc-650 leading-relaxed font-serif mb-4 line-clamp-6">
                {isAr 
                  ? 'أسواق المال الآسيوية تعيش انفصاماً تاريخياً؛ فبينما تقود أسهم الرقائق مؤشرات الأسهم إلى مستويات قياسية مدفوعة بطلب البنية التحتية وحاجة الذكاء الاصطناعي، تدفع الاقتصادات الحقيقية ثمن انهيار العملات المحلية والتضخم المستورد مثل انهيار الين الياباني إلى أدنى مستوياته منذ 1986. الأسواق تعاقب الاقتصادات التي تتباطأ في مجاراة الفائدة المتشددة.' 
                  : 'Asian financial markets are experiencing a historic disconnect. While chip makers drive stock benchmarks to record heights—fueled by global AI infrastructure spending—real economies are bearing the heavy tax of local currency depreciation, illustrated by the Japanese Yen collapsing to its lowest levels since 1986 as central banks delay hawkish pivots.'}
              </p>
            </div>

            {/* Column 2 Mini Chart Tool */}
            <div className="border-t border-dashed border-zinc-200 pt-3.5 mt-2">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-zinc-500 mb-1">
                <span>{isAr ? 'الفجوة بين القيمة السوقية والتضخم الحقيقي' : 'Semiconductor Market Cap vs. Real Inflation'}</span>
                <span className="text-blue-700">92%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-100 border border-zinc-200">
                <div className="h-full bg-blue-700 w-[92%]"></div>
              </div>
              <p className="text-[8.5px] text-zinc-400 font-mono mt-1 leading-tight">
                {isAr ? 'أكبر مكاسب ربع سنوية للأسهم التقنية الآسيوية منذ ١٧ عاماً.' : 'Largest quarterly gains in tech-index benchmarks in over 17 years.'}
              </p>
            </div>
          </div>

          {/* Column 3: Global Markets & US Exceptionalism */}
          <div className="border-2 border-black bg-white p-4 flex flex-col justify-between relative overflow-hidden group hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div>
              <div className="flex justify-between items-start gap-2 mb-3">
                <div className="bg-zinc-900 text-white p-2">
                  <Globe size={18} />
                </div>
                <div className="text-right rtl:text-right ltr:text-left">
                  <span className="font-mono text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block">
                    {isAr ? 'الاستثناء الأميركي ومجلس الاستقرار' : 'U.S. EXCEPTIONALISM & BIS WARNS'}
                  </span>
                  <span className="inline-block bg-zinc-200 text-zinc-900 font-mono text-[9.5px] font-black border border-zinc-300 px-1.5 py-0.2 mt-0.5" dir="ltr">
                    BIS WARNING / SINTRA DIALOGUE
                  </span>
                </div>
              </div>

              <h5 className="font-sans font-black text-xs md:text-sm text-zinc-900 leading-snug mb-2">
                {isAr ? 'الأسواق العالمية تسير على حبل مشدود بين الجيوسياسة والاستثناء' : 'Global Markets Walk a Tightrope: Geopolitics vs US Exceptionalism'}
              </h5>

              <p className="text-[11.5px] text-zinc-650 leading-relaxed font-serif mb-4 line-clamp-6">
                {isAr 
                  ? 'تبدو الأسواق المالية العالمية وكأنها تمتلك مناعة استثنائية ضد الصدمات والمنوشات؛ فهي تواصل شراء الانخفاضات مراهنة على متانة الاقتصاد الأميركي ووعود التكنولوجيا. لكن الخطر الحقيقي لا يكمن في المضائق البحرية وحدها، بل في قاعات البنوك المركزية وفي أروقة مدينة سينترا البرتغالية، حيث تبرز تحذيرات بنك التسويات الدولية من فقاعة الائتمان والفائدة المرتفعة.' 
                  : 'Global markets appear to have developed an almost supernatural immunity, continuing to buy the dips despite regional conflict flare-ups. However, the true risk brews inside central banking halls and Sintra corridors. The Bank for International Settlements (BIS) warns that excessive reliance on the "US Exceptionalism" narrative is a double-edged sword that masks tight credit stress.'}
              </p>
            </div>

            {/* Column 3 Mini Chart Tool */}
            <div className="border-t border-dashed border-zinc-200 pt-3.5 mt-2">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-zinc-500 mb-1">
                <span>{isAr ? 'احتمالية تصحيح الأسواق العنيف' : 'Asset Bubble Correction Exposure'}</span>
                <span className="text-red-600">76%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-100 border border-zinc-200">
                <div className="h-full bg-zinc-800 w-[76%]"></div>
              </div>
              <p className="text-[8.5px] text-zinc-400 font-mono mt-1 leading-tight">
                {isAr ? 'تأجيل الفيدرالي لقرارات خفض الفائدة يخنق الائتمان ويزيد خدمة الدين.' : 'Federal Reserve delays on rate cuts persist, clamping commercial credit lines.'}
              </p>
            </div>
          </div>

        </div>

        {/* Footer Notes */}
        <div className="mt-5 pt-3.5 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[9px] font-mono text-zinc-500 gap-2">
          <span className="flex items-center gap-1">
            <ShieldAlert size={11} className="text-[#b91c1c]" />
            {isAr 
              ? 'تخضع قراءات هذه اللوحة للتدقيق المستمر من قبل خبراء ملحق الورّاق للأسواق والتحوط المركزي.' 
              : 'All panel readings are periodically balanced against Al-Warraq Markets Desk geopolitical risk models.'}
          </span>
          <span className="font-bold">
            {isAr ? 'لجنة البحوث الاقتصادية الكلية • سينترا ٢٠٢٦' : 'Macro Research Division • Sintra / Basel 2026'}
          </span>
        </div>
      </div>
    </div>
  );
}
