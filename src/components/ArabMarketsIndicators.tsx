import React, { useState } from 'react';
import { TrendingDown, TrendingUp, BarChart3, ShieldAlert, Award, FileText, Globe, Landmark, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';

interface ArabMarketsIndicatorsProps {
  language: 'ar' | 'en';
  layoutMode: 'digital' | 'classic-print';
}

export default function ArabMarketsIndicators({ language, layoutMode }: ArabMarketsIndicatorsProps) {
  const isAr = language === 'ar';
  const isPrint = layoutMode === 'classic-print';
  const [activeTab, setActiveTab] = useState<'stocks' | 'commodities'>('stocks');
  const [isReportExpanded, setIsReportExpanded] = useState(false);

  // Arab Stock Indices Mock/Dynamic Data matching real-time 2026 conditions
  const arabStocks = [
    { nameAr: 'تداول السعودية (TASI)', nameEn: 'Saudi Tadawul (TASI)', value: '12,410.50', change: '+1.45%', up: true, volume: '$1.48B', high: '12,440.00', low: '12,280.20' },
    { nameAr: 'سوق دبي المالي (DFM)', nameEn: 'Dubai Financial Market (DFM)', value: '4,180.20', change: '+1.12%', up: true, volume: '$124.5M', high: '4,202.90', low: '4,155.00' },
    { nameAr: 'سوق أبوظبي للأوراق المالية (ADX)', nameEn: 'Abu Dhabi Securities (ADX)', value: '9,340.60', change: '+0.88%', up: true, volume: '$310.2M', high: '9,380.00', low: '9,290.40' },
    { nameAr: 'بورصة الكويت (PRIME)', nameEn: 'Boursa Kuwait (PRIME)', value: '7,890.30', change: '+0.54%', up: true, volume: '$95.1M', high: '7,910.20', low: '7,840.10' },
    { nameAr: 'بورصة بيروت (BSE)', nameEn: 'Beirut Stock Exchange (BSE)', value: '1,950.40', change: '-0.32%', up: false, volume: '$2.4M', high: '1,962.00', low: '1,941.50' }
  ];

  // Energy & Commodities Active Tickers
  const commodities = [
    { nameAr: 'خام برنت العالمي (Brent)', nameEn: 'Brent Crude Spot', value: '77.40', change: '-1.85%', up: false, unit: 'USD/bbl', range: '76.90 - 79.20' },
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

      {/* TOP FEATURED ROW: The In-Depth USA-Iran Pact Report */}
      <div className="border border-black p-4 mb-6 bg-zinc-50 flex flex-col gap-4 relative overflow-hidden">
        {/* Editorial Top Ribbon */}
        <div className="flex justify-between items-center border-b border-zinc-300 pb-2.5">
          <span className="bg-[#b91c1c] text-white px-2 py-0.5 font-mono text-[9px] font-mono font-black tracking-widest uppercase flex items-center gap-1">
            <Award size={11} />
            {isAr ? 'تحليل عميق خاص' : 'SPECIAL STRATEGIC REPORT'}
          </span>
          <button 
            type="button"
            onClick={() => setIsReportExpanded(!isReportExpanded)}
            className="font-mono text-[9px] font-black uppercase text-zinc-650 hover:text-black flex items-center gap-1 cursor-pointer transition-colors"
          >
            {isReportExpanded ? (
              <>
                <Minimize2 size={11} />
                {isAr ? 'طي التحليل' : 'CONDENSE REPORT'}
              </>
            ) : (
              <>
                <Maximize2 size={11} />
                {isAr ? 'توسعة وقراءة كامل التقرير' : 'EXPAND FULL BRIEF'}
              </>
            )}
          </button>
        </div>

        {/* Report Content Panel */}
        <div className="space-y-4">
          <h5 className="font-sans font-black text-base md:text-lg text-zinc-950 leading-snug hover:text-[#b91c1c] transition-colors">
            {isAr 
              ? 'تقرير شامل: تداعيات الاتفاق الأميركي-الإيراني المؤقت على الأسواق المالية العالمية وحركة الطاقة' 
              : 'Implications of the Interim US-Iran MoU Pact on Global Financial Corridors & Energy Hubs'}
          </h5>

          <p className="text-xs text-zinc-700 leading-relaxed font-sans font-medium">
            {isAr 
              ? 'أحدث اتفاق السلام المؤقت ومذكرة التفاهم الموقعة بين الولايات المتحدة وإيران تحولاً جذرياً في الأسواق المالية العالمية، حيث اتجه المستثمرون بقوة نحو الأصول عالية المخاطر (Risk-On). وقد أدى هذا التطور الجيوسياسي البارز إلى تفكيك سريع لعلاوة المخاطر الجيوسياسية والتضخمية التي سيطرت على التداولات خلال فترة الحرب، مما انعكس بشكل مباشر على أسواق الطاقة، والأسهم، والسياسات النقدية الإقليمية.'
              : 'The latest interim peace agreement and Memorandum of Understanding (MoU) signed between the United States and Iran has triggered a radical shift in global financial markets, rotating heavy investment back into risk-on parameters. This landmark breakthrough rapidly disassembled the geopolitical and inflationary premium that overrode trade during the conflict, immediately influencing energy vectors, global stock indices, and regional monetary paradigms.'}
          </p>

          {/* Asset Responses - HTML Table styled beautifully just like InStats section */}
          <div className="border border-black overflow-hidden bg-white">
            <div className="bg-black text-white p-2 text-xxs font-mono font-bold tracking-wider uppercase flex justify-between">
              <span>{isAr ? 'ملخص تحركات الأصول الجيوسياسية' : 'GEOPOLITICAL ASSET ACTION METRICS'}</span>
              <span>{isAr ? 'عشرية ٢٠٢٦' : 'Q2 2026 UPDATE'}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-150 border-b border-black font-extrabold uppercase text-[10px] text-zinc-800">
                    <th className="p-2.5 text-right rtl:text-right border-r border-zinc-200">{isAr ? 'فئة الأصل' : 'Asset Class'}</th>
                    <th className="p-2.5 text-right rtl:text-right border-r border-zinc-200">{isAr ? 'المؤشر / السعر الحالي' : 'Ticker / Index Price'}</th>
                    <th className="p-2.5 text-center border-r border-zinc-200">{isAr ? 'اتجاه الحركة' : 'Direction'}</th>
                    <th className="p-2.5 text-right rtl:text-right">{isAr ? 'أبرز الملاحظات والتغيرات' : 'Structural Observations'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-medium">
                  {[
                    { catAr: 'الطاقة', catEn: 'Energy', nameAr: 'خام برنت', nameEn: 'Brent Crude', actionAr: 'هبوط', actionEn: 'Bearish (Drop)', up: false, notesAr: 'تراجع إلى مستويات 77 - 78 دولاراً للبرميل (بعد أن تجاوز ذروة 126 دولاراً).', notesEn: 'Retreated to $77–$78/bbl (down from a wartime peak of $126).' },
                    { catAr: 'الطاقة', catEn: 'Energy', nameAr: 'خام غرب تكساس (WTI)', nameEn: 'WTI Crude Oil', actionAr: 'هبوط', actionEn: 'Bearish (Drop)', up: false, notesAr: 'انخفض بنسبة 1.9% ليستقر عند 75.33 دولاراً للبرميل.', notesEn: 'Declined by 1.9% to settle at $75.33/bbl.' },
                    { catAr: 'الأسهم الأميركية', catEn: 'US Equities', nameAr: 'مؤشر إس آند بي 500', nameEn: 'S&P 500 Index', actionAr: 'صعود', actionEn: 'Bullish (Rise)', up: true, notesAr: 'ارتفعت العقود الآجلة بنسب تراوحت بين 0.7% إلى 0.9%.', notesEn: 'Futures rose in a 0.7% to 0.9% bandwidth.' },
                    { catAr: 'الأسهم الأميركية', catEn: 'US Equities', nameAr: 'مؤشر ناسداك', nameEn: 'Nasdaq Index', actionAr: 'صعود', actionEn: 'Bullish (Rise)', up: true, notesAr: 'قفزت العقود الآجلة بنسبة 1.1% بدعم من تحسن المعنويات.', notesEn: 'Futures jumped 1.1% on robust risk appetite.' },
                    { catAr: 'الأسهم الآسيوية', catEn: 'Asian Equities', nameAr: 'مؤشر نيكاي 225 (اليابان)', nameEn: 'Nikkei 225 (Japan)', actionAr: 'صعود', actionEn: 'Bullish (Rise)', up: true, notesAr: 'قفز بنسب قوية وصلت إلى 3.6% في بعض التداولات.', notesEn: 'Pointed up sharply, securing up to 3.6% in intraday trading.' },
                    { catAr: 'المعادن النفيسة', catEn: 'Precious Metals', nameAr: 'الذهب الفوري', nameEn: 'Spot Gold Index', actionAr: 'صعود', actionEn: 'Bullish (Rise)', up: true, notesAr: 'ارتفع بنسبة 1.5% مسجلاً نحو 4320 دولاراً للأونصة (يعكس شكوكاً متبقية).', notesEn: 'Gained 1.5% marking $4,320/oz (illustrating residual hedging).' },
                    { catAr: 'السندات', catEn: 'Sovereign Bonds', nameAr: 'سندات الخزانة الأميركية (10 سنوات)', nameEn: 'US 10-Yr Treasury', actionAr: 'هبوط العائد', actionEn: 'Yield Drop', up: false, notesAr: 'تراجع العائد بواقع 4 إلى 5 نقاط أساس ليسجل نحو 4.45%.', notesEn: 'Yield compressed by 4–5 bps to settle near 4.45%.' },
                    { catAr: 'العملات المشفرة', catEn: 'Crypto', nameAr: 'بتكوين (Bitcoin)', nameEn: 'Bitcoin (BTC)', actionAr: 'هبوط', actionEn: 'Bearish (Drop)', up: false, notesAr: 'تراجعت بشكل طفيف بنسبة 0.4% لتسجل 64,142 دولاراً.', notesEn: 'Dipped microscopically by 0.4% trading at $64,142.' }
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-zinc-50 transition-colors">
                      <td className="p-2.5 font-mono text-[10px] text-zinc-500 text-right rtl:text-right border-r border-zinc-200 font-bold whitespace-nowrap">
                        {isAr ? row.catAr : row.catEn}
                      </td>
                      <td className="p-2.5 text-right rtl:text-right text-xs font-bold font-sans border-r border-zinc-200">
                        {isAr ? row.nameAr : row.nameEn}
                      </td>
                      <td className="p-2.5 text-center border-r border-zinc-200">
                        <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 font-black uppercase tracking-wider select-none ${
                          row.up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-[#b91c1c]'
                        }`}>
                          {row.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                          <span>{isAr ? row.actionAr : row.actionEn}</span>
                        </span>
                      </td>
                      <td className="p-2.5 text-right rtl:text-right text-[11px] leading-relaxed text-zinc-600 font-sans font-medium">
                        {isAr ? row.notesAr : row.notesEn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Expanded Sections containing II, III, IV */}
          {isReportExpanded && (
            <div className="space-y-6 pt-2 border-t border-zinc-200 animate-slide-down">
              {/* II. Monetary Policy Impacts */}
              <div className="space-y-2">
                <h6 className="font-sans font-black text-sm text-zinc-950 uppercase border-r-4 border-[#b91c1c] pr-2.5">
                  {isAr ? 'ثانياً: التأثيرات على السياسة النقدية والعملات' : 'II. Impact on Monetary Policy & Sovereign Currencies'}
                </h6>
                <p className="text-xs text-zinc-700 leading-relaxed font-sans font-medium">
                  {isAr 
                    ? 'أدى تراجع أسعار الطاقة إلى إعادة تسعير طفيفة لمخاوف التضخم العالمية، إلا أن تأثيرات صدمة الطاقة السابقة لا تزال تلقي بظلالها على الأسواق الناشئة:'
                    : 'Though softening energy prices slightly readjusted global inflation expectations, the aftershocks of the prior energy crunch continue to overshadow emerging economies:'}
                </p>
                <ul className="list-disc list-inside text-xs text-zinc-650 space-y-1.5 pl-1.5 leading-relaxed font-sans font-medium">
                  <li>
                    <strong>{isAr ? 'الأسواق الناشئة الآسيوية:' : 'Emerging Asian Markets:'}</strong>{' '}
                    {isAr 
                      ? 'تراجعت معظم عملات هذه الأسواق أمام الدولار الأميركي، بما في ذلك الروبية الإندونيسية والبيزو الفلبيني.' 
                      : 'Most regional currencies depreciated against the USD, including the Indonesian Rupiah and Philippine Peso.'}
                  </li>
                  <li>
                    <strong>{isAr ? 'قرارات الفائدة المتوقعة:' : 'Benchmark Interest Rates:'}</strong>{' '}
                    {isAr 
                      ? 'يتجه البنك المركزي في كل من إندونيسيا والفلبين لرفع أسعار الفائدة الرئيسية بواقع ربع نقطة مئوية (0.25%) لمواجهة التبعات التضخمية السابقة، بينما يُتوقع أن يبقي البنك المركزي التايواني على أسعاره دون تغيير.' 
                      : 'Central banks of Indonesia and the Philippines are poised to hike benchmark rates by 25 bps to counteract prior inflationary momentum, while Taiwan is favored to hold steady.'}
                  </li>
                  <li>
                    <strong>{isAr ? 'الين الياباني:' : 'Japanese Yen (JPY):'}</strong>{' '}
                    {isAr 
                      ? 'استمرت معاناة العملة اليابانية، حيث هبط الين إلى أضعف مستوياته أمام الدولار منذ يوليو 2024 (نحو 160.58 ين للدولار)، مما يرفع من احتمالات التدخل الحكومي لاحتواء التضخم وتحقيق استقرار العملة.' 
                      : 'The Yen weakened further to lows not seen since July 2024 (around 160.58/USD), elevating intervention speculative risk for stabilizing the local inflation curve.'}
                  </li>
                  <li>
                    <strong>{isAr ? 'الدولار الأميركي:' : 'The US Dollar (USD):'}</strong>{' '}
                    {isAr 
                      ? 'تراجع مؤشر بلومبرغ للدولار الفوري بنسبة 0.2%، في حين حقق اليورو والدولار الأسترالي مكاسب طفيفة.' 
                      : 'The Bloomberg Dollar Spot Index dipped 0.2%, allowing modest recoveries for the Euro and Australian Dollar.'}
                  </li>
                </ul>
              </div>

              {/* III. Oil Flow logistics and Strait of Hormuz */}
              <div className="space-y-2">
                <h6 className="font-sans font-black text-sm text-zinc-950 uppercase border-r-4 border-[#b91c1c] pr-2.5">
                  {isAr ? 'ثالثاً: مستقبل تدفقات النفط ومعضلة "مضيق هرمز"' : 'III. Oil Flow Logistics & Strait of Hormuz Corridor Dynamics'}
                </h6>
                <p className="text-xs text-zinc-700 leading-relaxed font-sans font-medium">
                  {isAr 
                    ? 'رغم إعادة فتح مضيق هرمز نظرياً بموجب الاتفاق، إلا أن المشهد النفطي الإقليمي قد تغير بشكل هيكلي. تشير تحليلات "غولدمان ساكس" إلى أن تعافي تدفقات النفط عبر المضيق قد يستقر عند 70% فقط من مستويات ما قبل الحرب.'
                    : 'While the Strait of Hormuz has nominally reopened under the truce, the regional logistics landscape has experienced structural realignment. Goldman Sachs analytical briefs suggest shipping flows will stabilize near just 70% of pre-war volumes.'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white border border-zinc-200 p-3 space-y-1">
                    <span className="font-mono text-[9px] font-black text-zinc-400 uppercase tracking-wider">{isAr ? 'أولاً: الحاجة للتعافي' : 'A. Volume Requirements'}</span>
                    <p className="text-[11px] text-zinc-650 leading-relaxed font-sans">
                      {isAr 
                        ? 'تتطلب العودة لمستويات ما قبل النزاع زيادة التدفقات عبر هرمز بمقدار 13 مليون برميل يومياً (مقارنة بـ 20 مليون برميل يومياً قبل الحرب).'
                        : 'Resuming pre-war distribution benchmarks would necessitate adding 13 million barrels per day through Hormuz (vs. 20 million bpd beforehand).'}
                    </p>
                  </div>
                  <div className="bg-white border border-zinc-200 p-3 space-y-1">
                    <span className="font-mono text-[9px] font-black text-zinc-400 uppercase tracking-wider">{isAr ? 'ثانياً: البدائل الحالية' : 'B. Midstream Redirection'}</span>
                    <p className="text-[11px] text-zinc-650 leading-relaxed font-sans">
                      {isAr 
                        ? 'نجحت دول المنطقة في تحويل نحو 7.5 مليون برميل يومياً عبر مسارات بديلة، حيث كثفت "أرامكو السعودية" النقل نحو ساحل البحر الأحمر (ينبع)، واعتمدت الإمارات على ميناء الفجيرة، بينما وجه العراق شحناته إلى ميناء جيهان التركي.'
                        : 'Gulf states successfully diverted ~7.5 million bpd to alternative corridors: Saudi Aramco prioritized Red Sea terminals (Yanbu), the UAE relied on terminal infrastructure in Fujairah, and Iraq redirected shipments through Turkey (Ceyhan).'}
                    </p>
                  </div>
                  <div className="bg-white border border-zinc-200 p-3 space-y-1">
                    <span className="font-mono text-[9px] font-black text-zinc-400 uppercase tracking-wider">{isAr ? 'ثالثاً: فك الارتباط' : 'C. Structural Decoupling'}</span>
                    <p className="text-[11px] text-zinc-650 leading-relaxed font-sans">
                      {isAr 
                        ? 'أعلنت دولة الإمارات صراحة عن خطة طموحة للوصول إلى "صفر اعتماد" على مضيق هرمز من خلال توسيع موانئها الشرقية. بالتوازي، تبحث الكويت عن بدائل لتصدير خامها عبر خطوط أنابيب بالتعاون مع السعودية والإمارات.'
                        : 'The UAE explicitly announced an ambitious blueprint targeting "Zero reliance" on Hormuz by scaling its eastern deepwater ports, while Kuwait negotiates pipeline transmission access agreements with Saudi Arabia and the UAE.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* IV. Macro forecasts and risks */}
              <div className="space-y-2">
                <h6 className="font-sans font-black text-sm text-zinc-950 uppercase border-r-4 border-[#b91c1c] pr-2.5">
                  {isAr ? 'رابعاً: التوقعات الاقتصادية والمخاطر الكامنة' : 'IV. Macroeconomic Horizons & Embedded Tail-Risks'}
                </h6>
                <p className="text-xs text-zinc-700 leading-relaxed font-sans font-medium">
                  {isAr 
                    ? 'على الرغم من احتفاء الأسواق بهذا الاختراق الدبلوماسي، يبقى المشهد الاقتصادي الكلي محفوفاً بالتعقيدات والمخاطر التي تراقبها البنوك المركزية والمؤسسات المالية الكبرى (مثل Schroders) عن كثب:'
                    : 'Despite the enthusiastic risk-on reception, the broader macro environment remains complicated by systemic hazards monitored closely by central banks and asset management giants like Schroders:'}
                </p>
                <div className="space-y-2 text-xs text-zinc-650 font-sans font-medium">
                  <p>
                    📌 <strong>{isAr ? 'حزمة التعافي المالي المقدرة:' : 'Recovery Funding Underwriting:'}</strong>{' '}
                    {isAr 
                      ? 'يتطلب الاتفاق التمهيدي إقرار حزمة تعافي ضخمة بقيمة 300 مليار دولار، وهو ما سيفرض تحديات تمويلية واستثمارية جديدة.' 
                      : 'The interim draft mandates a massive $300bn stabilization and development package, presenting substantial underwriting and fiscal strains.'}
                  </p>
                  <p>
                    📌 <strong>{isAr ? 'ترحيل الملفات وتماسك الذهب:' : 'Deferred Negotiations & Metallic Hedging:'}</strong>{' '}
                    {isAr 
                      ? 'تم إرجاء البت في القضايا الأكثر تعقيداً، وعلى رأسها البرنامج النووي الإيراني، مما يبرر التماسك غير المعتاد لأسعار الذهب كملاذ آمن للتحوط ضد أي انهيار محتمل للاتفاق النهائي.' 
                      : 'The most complex assets—notably the Iranian nuclear framework—have been deferred. This explains spot Gold\'s persistent elevation as a strategic premium hedge against a prospective breakdown.'}
                  </p>
                  <p>
                    📌 <strong>{isAr ? 'البنية التحتية والخطوط اللوجستية:' : 'Energy & Transit Infrastructure Rehabilitation:'}</strong>{' '}
                    {isAr 
                      ? 'يرتبط التوازن الفعلي في أسواق النفط بسرعة إصلاح البنية التحتية المتضررة، وتجاوز العقبات اللوجستية، وتغلب مُلّاك السفن وناقلات النفط على مخاوفهم الأمنية للعودة إلى الإبحار عبر مضيق هرمز.' 
                      : 'Tangible balance in the global crude markets depends on the speed of restoring damaged refining/extraction systems and shipowners bypassing security premiums to normalize freight paths.'}
                  </p>
                </div>
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
