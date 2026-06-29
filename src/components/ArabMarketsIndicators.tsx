import React, { useState } from 'react';
import { TrendingDown, TrendingUp, BarChart3, ShieldAlert, Award, FileText, Globe, Landmark, ChevronRight, Minimize2, Maximize2, Info, Activity } from 'lucide-react';
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

  // Arab Stock Indices Mock/Dynamic Data matching real-time 2026 conditions
  const arabStocks = [
    { nameAr: 'تداول السعودية (TASI)', nameEn: 'Saudi Tadawul (TASI)', value: '10,933.00', change: '-1.20%', up: false, volume: '$1.48B', high: '11,120.00', low: '10,910.00' },
    { nameAr: 'سوق دبي المالي (DFM)', nameEn: 'Dubai Financial Market (DFM)', value: '4,180.20', change: '+1.12%', up: true, volume: '$124.5M', high: '4,202.90', low: '4,155.00' },
    { nameAr: 'سوق أبوظبي للأوراق المالية (ADX)', nameEn: 'Abu Dhabi Securities (ADX)', value: '9,340.60', change: '+0.88%', up: true, volume: '$310.2M', high: '9,380.00', low: '9,290.40' },
    { nameAr: 'بورصة الكويت (PRIME)', nameEn: 'Boursa Kuwait (PRIME)', value: '7,890.30', change: '+0.54%', up: true, volume: '$95.1M', high: '7,910.20', low: '7,840.10' },
    { nameAr: 'بورصة بيروت (BSE)', nameEn: 'Beirut Stock Exchange (BSE)', value: '1,950.40', change: '-0.32%', up: false, volume: '$2.4M', high: '1,962.00', low: '1,941.50' }
  ];

  // Energy & Commodities Active Tickers
  const commodities = [
    { nameAr: 'خام برنت العالمي (Brent)', nameEn: 'Brent Crude Spot', value: '81.50', change: '+1.85%', up: true, unit: 'USD/bbl', range: '77.40 - 82.10' },
    { nameAr: 'خام غرب تكساس (WTI)', nameEn: 'WTI Light Sweet', value: '75.33', change: '-1.90%', up: false, unit: 'USD/bbl', range: '74.80 - 77.10' },
    { nameAr: 'الغاز الطبيعي الفوري', nameEn: 'Natural Gas Spot', value: '2.14', change: '-3.12%', up: false, unit: 'USD/MMBtu', range: '2.10 - 2.25' },
    { nameAr: 'الذهب الفوري (Spot Gold)', nameEn: 'Spot Gold Index', value: '4,320.50', change: '+1.50%', up: true, unit: 'USD/oz', range: '4,240.00 - 4,336.00' },
    { nameAr: 'الفضة الحرة (Spot Silver)', nameEn: 'Spot Silver Index', value: '31.25', change: '+0.75%', up: true, unit: 'USD/oz', range: '30.80 - 31.60' }
  ];

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

  // Infographics data
  const brentTrendData = [
    { date: isAr ? '٢١ يونيو' : 'Jun 21', price: 126.00, label: isAr ? 'فترة صراع الذروة' : 'Peak Conflict Period' },
    { date: isAr ? '٢٢ يونيو' : 'Jun 22', price: 112.00, label: isAr ? 'بداية مفاوضات سويسرا' : 'Swiss Talks Commenced' },
    { date: isAr ? '٢٤ يونيو' : 'Jun 24', price: 98.00, label: isAr ? 'التوقيع على الاتفاق' : 'Agreement Signed' },
    { date: isAr ? '٢٦ يونيو' : 'Jun 26', price: 77.40, label: isAr ? 'أدنى مستويات التهدئة' : 'Truce Bottom Pricing' },
    { date: isAr ? '٢٩ يونيو' : 'Jun 29', price: 81.50, label: isAr ? 'التصعيد والمنوشات الأخيرة' : 'Recent Skirmish Escalation' },
  ];

  const pipelineData = [
    { name: isAr ? 'أنابيب السعودية' : 'Saudi Petroline', max: 7.0, current: 4.5 },
    { name: isAr ? 'أنابيب الإمارات' : 'UAE Habshan', max: 1.5, current: 1.2 },
    { name: isAr ? 'أنابيب العراق' : 'Iraq Ceyhan', max: 0.5, current: 0.3 },
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
    <div className={`border-4 border-black p-5 bg-white select-none transition-all ${
      isPrint ? 'vintage-paper border-[#1b2b1d] text-[#1b2b1d]' : 'bg-white text-zinc-900 shadow-xs'
    }`}>
      {/* SECTION HEADER: double line editorial format */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-5 border-b-2 border-black border-double">
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

        {/* Categories Tab navigation just like CAS Stats section */}
        <div className="flex border border-black p-0.5 mt-3 md:mt-0 max-w-full overflow-x-auto shrink-0 font-sans text-[11px] font-black">
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
              <span className="text-3xl font-black font-mono">$3.42T</span>
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-0.5" dir="ltr">
                <TrendingUp size={14} /> +2.18%
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
              <span className="text-3xl font-black font-mono">14.2M bpd</span>
              <span className="text-xs text-red-650 font-bold flex items-center gap-0.5" dir="ltr">
                <TrendingDown size={14} /> -12.4%
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
            <span className="text-red-400">-$4.50 / bbl</span>
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
              {(activeTab === 'stocks' ? arabStocks : commodities).map((item, idx) => (
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
                      <span>{'unit' in item ? `${item.value} ${item.unit}` : item.value}</span>
                    </div>
                    <span className={`text-[9.5px] font-black uppercase tracking-wider block text-left ${
                      item.up ? 'text-emerald-700' : 'text-[#b91c1c]'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[9px] text-zinc-400 text-center font-mono font-medium pt-3 border-t border-zinc-100 flex items-center justify-between">
            <span>{isAr ? 'بث فوري عبر الأقمار: رويترز / بلومبرغ' : 'Live Feeds via Satellite: Reuters / Bloomberg'}</span>
            <span>2026-06-18</span>
          </div>
        </div>
      </div>
    </div>
  );
}
