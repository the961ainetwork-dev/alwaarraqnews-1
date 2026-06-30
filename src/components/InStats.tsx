import React, { useState } from 'react';
import { TrendingDown, TrendingUp, DollarSign, Calendar, BarChart3, Percent, ChevronRight, BookMarked } from 'lucide-react';
import { INITIAL_ARTICLES } from '../data';
import { Article } from '../types';

interface InStatsProps {
  language: 'ar' | 'en';
  layoutMode: 'digital' | 'classic-print';
  onSelectArticle?: (article: Article) => void;
}

export default function InStats({ language, layoutMode, onSelectArticle }: InStatsProps) {
  const isAr = language === 'ar';
  const isPrint = layoutMode === 'classic-print';
  const [activeTab, setActiveTab] = useState<'real-estate' | 'agriculture' | 'inflation' | 'bdl-budget' | 'industrial-exports' | 'investment-banks'>('bdl-budget');
  const [activeInsight, setActiveInsight] = useState<number | null>(1);
  const [isArticleExpanded, setIsArticleExpanded] = useState<boolean>(false);

  // Real estate monthly transactions
  const realEstateMonthly = [
    { monthAr: 'يناير', monthEn: 'January', deals: 4633, valLbp: 42639 },
    { monthAr: 'فبراير', monthEn: 'February', deals: 3755, valLbp: 34542 },
    { monthAr: 'مارس', monthEn: 'March', deals: 3095, valLbp: 31275 },
    { monthAr: 'أبريل', monthEn: 'April', deals: 3493, valLbp: 33203 }
  ];

  // Real estate regional breakdown
  const realEstateRegions = [
    { nameAr: 'بيروت', nameEn: 'Beirut', valueLbp: 36474, pct: 25.7 },
    { nameAr: 'المتن الشمالي', nameEn: 'Northern Metn', valueLbp: 30089, pct: 21.2 },
    { nameAr: 'بعبدا/عاليه/الشوف', nameEn: 'Baabda/Aley/Chouf', valueLbp: 23163, pct: 16.4 },
    { nameAr: 'كسروان/جبيل', nameEn: 'Keserwan/Jbeil', valueLbp: 20462, pct: 14.4 },
    { nameAr: 'الشمال', nameEn: 'North', valueLbp: 15380, pct: 12.3 },
    { nameAr: 'البقاع/بعلبك الهرمل', nameEn: 'Bekaa/Baalbeck-Hermel', valueLbp: 6841, pct: 4.8 },
    { nameAr: 'الجنوب', nameEn: 'South', valueLbp: 5403, pct: 3.8 },
    { nameAr: 'النبطية', nameEn: 'Nabatieh', valueLbp: 1136, pct: 0.8 }
  ];

  // Agriculture historical data
  const agricultureYears = [
    { year: '2020', crop: 716.5, animal: 664.1 },
    { year: '2021', crop: 867.9, animal: 403.4 },
    { year: '2022', crop: 1400.0, animal: 881.5 },
    { year: '2023', crop: 1090.0, animal: 898.1 },
    { year: '2024', crop: 1500.0, animal: 730.8 },
    { year: '2025', crop: 2030.0, animal: 865.3 }
  ];

  // Agriculture crops breakdown
  const cropBreakdown = [
    { nameAr: 'المحاصيل المحظورة (مارجوانا)', nameEn: 'Prohibited Crops (Marijuana)', value: 846.0, pct: 41.6 },
    { nameAr: 'أشجار الفاكهة', nameEn: 'Fruit Trees', value: 650.5, pct: 32.0 },
    { nameAr: 'الخضروات والزهور', nameEn: 'Vegetables & Flowers', value: 272.7, pct: 13.4 },
    { nameAr: 'المحاصيل الصناعية', nameEn: 'Industrial Crops', value: 130.5, pct: 6.42 },
    { nameAr: 'المحاصيل الحقلية', nameEn: 'Field Crops', value: 129.6, pct: 6.37 }
  ];

  // CPI Inflation Trend 2026
  const cpiTrend = [
    { monthAr: 'ديسمبر 25', monthEn: 'Dec 2025', rate: 12.2 },
    { monthAr: 'يناير 26', monthEn: 'Jan 2026', rate: 11.0 },
    { monthAr: 'فبراير 26', monthEn: 'Feb 2026', rate: 12.3 },
    { monthAr: 'مارس 26', monthEn: 'Mar 2026', rate: 17.3 },
    { monthAr: 'أبريل 26', monthEn: 'Apr 2026', rate: 20.0 }
  ];

  // Detail item CPI category increase (April 2026)
  const cpiCategories = [
    { nameAr: 'التسلية والترفيه', nameEn: 'Recreation & Entertainment', rate: 42.2 },
    { nameAr: 'المياه والكهرباء والغاز والوقود', nameEn: 'Water, Electricity, Gas & Fuel', rate: 41.4 },
    { nameAr: 'التعليم', nameEn: 'Education', rate: 35.7 },
    { nameAr: 'النقل والمواصلات', nameEn: 'Transportation', rate: 33.3 },
    { nameAr: 'المواد الغذائية والمشروبات', nameEn: 'Food & Non-alcoholic Beverages', rate: 18.0 },
    { nameAr: 'الإيجارات السكنيّة', nameEn: 'Home Rent', rate: 17.7 }
  ];

  return (
    <div className={`border-4 border-black p-5 bg-white select-none transition-all font-sans ${
      isPrint ? 'vintage-paper border-[#1b2b1d] text-[#1b2b1d]' : 'bg-white text-zinc-900 shadow-xs'
    }`}>
      {/* Title Header with classic double line styling */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-5 border-b-2 border-black border-double">
        <div className="flex items-center gap-2">
          <TrendingUp size={20} className="text-black shrink-0" />
          <div>
            <h4 className="font-sans font-black text-xl md:text-2xl tracking-tighter uppercase">
              {isAr ? 'الورّاق في أرقام • الإحصاءات الأسبوعية' : 'IN STATS • Al-Warraq Graphic Bureau'}
            </h4>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
              {isAr ? 'بيانات رسمية وتغطية تحليلية صادرة ومؤكدة بالرسوم التوضيحية لعام ٢٠٢٦' : 'Consolidated Ministry of Finance & CAS Macro Telemetries - Q1 2026'}
            </p>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex border border-black p-0.5 mt-3 md:mt-0 max-w-full overflow-x-auto shrink-0 font-sans text-[11px] font-black">
          <button
            onClick={() => setActiveTab('bdl-budget')}
            className={`px-3 py-1 cursor-pointer transition-colors ${
              activeTab === 'bdl-budget' ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-700'
            }`}
          >
            {isAr ? 'ميزانية مصرف لبنان' : 'BDL Balance Sheet'}
          </button>
          <button
            onClick={() => setActiveTab('real-estate')}
            className={`px-3 py-1 cursor-pointer transition-colors border-l border-black ${
              activeTab === 'real-estate' ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-700'
            }`}
          >
            {isAr ? 'العقارات والصفقات' : 'Real Estate'}
          </button>
          <button
            onClick={() => setActiveTab('agriculture')}
            className={`px-3 py-1 cursor-pointer transition-colors border-x border-black ${
              activeTab === 'agriculture' ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-700'
            }`}
          >
            {isAr ? 'الإنتاج الزراعي' : 'Agriculture Output'}
          </button>
          <button
            onClick={() => setActiveTab('inflation')}
            className={`px-3 py-1 cursor-pointer transition-colors border-r border-black ${
              activeTab === 'inflation' ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-700'
            }`}
          >
            {isAr ? 'مؤشر الأسعار والتضخم' : 'Inflation Bureau'}
          </button>
          <button
            onClick={() => setActiveTab('industrial-exports')}
            className={`px-3 py-1 cursor-pointer transition-colors border-r border-black ${
              activeTab === 'industrial-exports' ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-700'
            }`}
          >
            {isAr ? 'الصادرات الصناعية' : 'Industrial Exports'}
          </button>
          <button
            onClick={() => setActiveTab('investment-banks')}
            className={`px-3 py-1 cursor-pointer transition-colors ${
              activeTab === 'investment-banks' ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-700'
            }`}
          >
            {isAr ? 'بنوك الاستثمار' : 'Investment Banks'}
          </button>
        </div>
      </div>

      {/* Tab Panel 1: REAL ESTATE TRANS */}
      {activeTab === 'real-estate' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Key Metric indicators */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="border border-black p-4 bg-zinc-50 relative overflow-hidden">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                {isAr ? 'قيمة الصفقات الإجمالية (٤ أشهر)' : 'Aggregate USD Value (Jan-Apr 2026)'}
              </span>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-black font-mono">$1.58B</span>
                <span className="text-xs text-red-650 font-bold flex items-center gap-0.5" dir="ltr">
                  <TrendingDown size={14} /> -18.2%
                </span>
              </div>
              <p className="text-[10.5px] text-zinc-500 mt-2 leading-relaxed">
                {isAr 
                  ? 'بلغت القيمة الإجمالية للعقارات المسجلة ١٤١,٦٦٠ مليار ليرة لبنانية مقارنة بـ ١٧٣,١٢٣ مليار ليرة في نفس الفترة من عام ٢٠٢٥.'
                  : 'Total registered real estate deals stood at LBP 141,660.3bn, down from LBP 173,123.4bn in the same 4-month period last year.'}
              </p>
            </div>

            <div className="border border-black p-4 bg-zinc-50 relative overflow-hidden">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                {isAr ? 'عدد المعاملات المسجلة' : 'Number of Transactions'}
              </span>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-black font-mono">14,976</span>
                <span className="text-xs text-red-650 font-bold flex items-center gap-0.5" dir="ltr">
                  <TrendingDown size={14} /> -31.0%
                </span>
              </div>
              <p className="text-[10.5px] text-zinc-500 mt-2 leading-relaxed">
                {isAr 
                  ? 'انخفضت المعاملات من ٢١,٧٢٠ معاملة في ٢٠٢٥. وتوزع النشاط بـ ٣,٢٣٠ معاملة بعبدا وعاليه والشوف تليها الشمال بـ ٣,١٩٨ معاملة.'
                  : 'Total deals recorded fell from 21,720 transactions in 2025. Baabda/Aley/Chouf led regional counts with 3,230, followed closely by the North.'}
              </p>
            </div>

            <div className="border border-black p-3 text-[10px] font-mono font-bold flex justify-between bg-black text-white items-center">
              <span>{isAr ? 'صفقات الأجانب المنفذة:' : 'Foreigners Transactions:'}</span>
              <span>230 {isAr ? 'صفقة (١.٥٪ من الإجمالي)' : 'deals (1.5% of total)'}</span>
            </div>
          </div>

          {/* Interactive Chart Container (Custom retro styled SVGs for pristine look & feel) */}
          <div className="lg:col-span-4 border border-zinc-300 p-4 flex flex-col justify-between">
            <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200">
              {isAr ? 'حركة المعاملات الشهرية خلال عام ٢٠٢٦' : 'Monthly Transaction Volumetrics - 2026'}
            </span>

            {/* Custom SVG Bar Chart */}
            <div className="h-44 w-full flex items-end gap-5 justify-around pt-6 px-2">
              {realEstateMonthly.map((m, idx) => {
                const maxDeals = 5000;
                const barHeight = (m.deals / maxDeals) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 group">
                    <span className="text-[10px] font-mono font-black scale-90 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-1 rounded-sm">
                      {m.deals}
                    </span>
                    <div className="w-full bg-zinc-100 hover:bg-black border border-black h-28 relative flex items-end transition-colors">
                      <div 
                        style={{ height: `${barHeight}%` }}
                        className="w-full bg-black group-hover:bg-zinc-650 transition-all border-t border-white"
                      ></div>
                    </div>
                    <span className="text-[10px] font-sans font-bold text-zinc-600 block mt-1">
                      {isAr ? m.monthAr : m.monthEn}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-[9px] text-zinc-400 text-center font-mono font-medium pt-3 border-t border-zinc-100">
              {isAr ? 'المصدر: المديرية العامة للشؤون العقارية • وزارة المالية' : 'Source: General Directorate of Land Registry and Cadastre'}
            </div>
          </div>

          {/* Right hand side: Regional Share list */}
          <div className="lg:col-span-4 border border-zinc-300 p-4 font-mono">
            <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200 font-sans">
              {isAr ? 'توزيع قيمة المبيعات حسب المنطق الإدارية' : 'Regional Breakdown by Transaction Value'}
            </span>

            <div className="space-y-2 mt-4 max-h-[190px] overflow-y-auto scrollbar-none pr-1">
              {realEstateRegions.map((r, idx) => (
                <div key={idx} className="text-[11px] flex flex-col gap-1">
                  <div className="flex justify-between items-center text-zinc-800 font-bold">
                    <span className="font-sans truncate max-w-[130px]">{isAr ? r.nameAr : r.nameEn}</span>
                    <div className="flex gap-2">
                      <span className="text-zinc-500">LBP {r.valueLbp.toLocaleString()}bn</span>
                      <span className="text-black font-black">({r.pct}%)</span>
                    </div>
                  </div>
                  {/* Share indicator */}
                  <div className="w-full h-1 bg-zinc-100 overflow-hidden border border-zinc-200">
                    <div style={{ width: `${r.pct}%` }} className="h-full bg-black"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel 2: AGRICULTURE */}
      {activeTab === 'agriculture' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Key metrics */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="border border-black p-4 bg-zinc-50 text-stone-900 relative">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                {isAr ? 'حجم الناتج القومي الزراعي (عام ٢٠٢٥)' : 'Gross National Agricultural GDP (2025)'}
              </span>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-black font-mono">$2.90B</span>
                <span className="text-xs text-green-700 font-bold flex items-center gap-0.5" dir="ltr">
                  <TrendingUp size={14} /> +33.0%
                </span>
              </div>
              <p className="text-[10.5px] text-zinc-500 mt-2 leading-relaxed">
                {isAr 
                  ? 'حققت الزراعة قفزة نوعية لتبلغ ٢.٩ مليار دولار مقارنة بـ ٢.٢ مليار في ٢٠٢٤ و ١.٩ مليار في ٢٠٢٣، مسجلة معدل نمو سنوي مركب قدره ١٦٪ منذ عام ٢٠٢٠.'
                  : 'Agricultural values jumped to $2.9bn from $2.2bn in 2024. Compound Annual Growth Rate (CAGR) stood at 16% over the 5-year tracking period.'}
              </p>
            </div>

            <div className="border border-black p-4 bg-zinc-50 text-stone-900 relative">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                {isAr ? 'هيكل الإنتاج (القسم المالي)' : 'Production structural composition'}
              </span>
              <div className="grid grid-cols-2 gap-3 mt-3 text-center">
                <div className="border border-zinc-200 p-2 bg-white flex flex-col items-center">
                  <span className="text-[9px] text-zinc-400 font-bold font-sans uppercase">{isAr ? 'الإنتاج النباتي' : 'Crop Output'}</span>
                  <span className="text-lg font-black font-mono mt-0.5">$2.03B</span>
                  <span className="text-[9px] font-mono text-zinc-500 font-bold">(70%)</span>
                </div>
                <div className="border border-zinc-200 p-2 bg-white flex flex-col items-center">
                  <span className="text-[9px] text-zinc-400 font-bold font-sans uppercase">{isAr ? 'الإنتاج الحيواني' : 'Animal Output'}</span>
                  <span className="text-lg font-black font-mono mt-0.5">$865.3M</span>
                  <span className="text-[9px] font-mono text-zinc-500 font-bold">(30%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Custom SVG Line Chart */}
          <div className="lg:col-span-4 border border-zinc-300 p-4 flex flex-col justify-between">
            <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200">
              {isAr ? 'مسار نمو الناتج التجاري الزراعي ٢٠٢٠ - ٢٠٢٥' : 'Gross Farm Financial Output Expansion 2020-2025'}
            </span>

            {/* Custom line plot */}
            <div className="h-44 w-full flex items-end relative justify-between pt-6 px-1">
              {/* Backing structural grid */}
              <div className="absolute inset-x-0 top-10 border-t border-zinc-100 border-dashed"></div>
              <div className="absolute inset-x-0 top-20 border-t border-zinc-100 border-dashed"></div>
              <div className="absolute inset-x-0 top-28 border-t border-zinc-100 border-dashed"></div>

              {agricultureYears.map((data, idx) => {
                const total = data.crop + data.animal;
                const maxTotal = 3000;
                // Height percentage multiplier
                const hTotal = (total / maxTotal) * 105;
                const hCrop = (data.crop / maxTotal) * 105;

                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 relative z-10">
                    <span className="text-[9px] font-mono font-black scale-85 text-zinc-500">
                      ${(total / 1000).toFixed(1)}B
                    </span>
                    <div className="w-4 bg-zinc-100 hover:bg-black border border-black h-28 relative flex flex-col justify-end">
                      {/* Crop stack */}
                      <div 
                        style={{ height: `${hCrop}%` }}
                        className="w-full bg-stone-900 border-t border-white"
                        title={`Crops: $${data.crop}m`}
                      ></div>
                      {/* Animal stack */}
                      <div 
                        style={{ height: `${hTotal - hCrop}%` }}
                        className="w-full bg-zinc-400 border-t border-white"
                        title={`Animal: $${data.animal}m`}
                      ></div>
                    </div>
                    <span className="text-[9.5px] font-mono font-bold text-zinc-600 block mt-1">
                      {data.year}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2.5 justify-center text-[8px] font-mono font-bold text-zinc-500 border-t border-zinc-150 pt-2.5">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-stone-900 inline-block"></span>{isAr ? 'الإنتاج الزراعي' : 'Crops'}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-zinc-400 inline-block"></span>{isAr ? 'الإنتاج الحيواني' : 'Animal'}</span>
            </div>
          </div>

          {/* Crops shares including Marijuana */}
          <div className="lg:col-span-4 border border-zinc-300 p-4 font-mono">
            <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200 font-sans">
              {isAr ? 'الحصص التفصيلية للمحاصيل المنتجة' : 'Detailed Crop Category Production Distribution'}
            </span>

            <div className="space-y-2 mt-4">
              {cropBreakdown.map((c, idx) => (
                <div key={idx} className="text-[11px] flex flex-col gap-0.5">
                  <div className="flex justify-between items-center text-zinc-800 font-bold">
                    <span className="font-sans truncate max-w-[150px]" title={isAr ? c.nameAr : c.nameEn}>
                      {isAr ? c.nameAr : c.nameEn}
                    </span>
                    <div className="flex gap-1.5 shrink-0">
                      <span className="text-zinc-500">${c.value}m</span>
                      <span className="text-black font-black">({c.pct}%)</span>
                    </div>
                  </div>
                  {/* Share indicator */}
                  <div className="w-full h-1 bg-zinc-150 overflow-hidden border border-zinc-200">
                    <div 
                      style={{ width: `${c.pct}%` }} 
                      className={`h-full ${idx === 0 ? 'bg-red-700' : 'bg-black'}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel 3: INFLATION */}
      {activeTab === 'inflation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Key metrics */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="border border-black p-4 bg-zinc-50 relative">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                {isAr ? 'مؤشر الرقم القياسي لأسعار الاستهلاك' : 'CAS Consumer Price Index (April 2026)'}
              </span>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-black font-mono">+20.0%</span>
                <span className="text-xs text-red-650 font-extrabold flex items-center gap-0.5" dir="ltr">
                  <TrendingUp size={14} /> YoY
                </span>
              </div>
              <p className="text-[10.5px] text-zinc-500 mt-2 leading-relaxed">
                {isAr 
                  ? 'سجل التضخم تسارعاً حاداً في أبريل ليصل ٢٠٪ على أساس سنوي مقارنة بـ ١٧.٣٪ في مارس، مدفوعاً بزيادة أسعار الطاقة، وتكاليف النقل، وتداعيات الحصار البحري العابر للشرق الأوسط.'
                  : 'Inflation rates snapped a cooling trend, accelerating to 20% in April 2026 due to regional spikes in oil, transportation premiums, and security/insurance overheads.'}
              </p>
            </div>

            <div className="border border-black p-4 bg-zinc-50 relative">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                {isAr ? 'عوامل التضخم التراكمي' : 'Primary Macro Drivers'}
              </span>
              <p className="text-[10.5px] text-zinc-600 leading-relaxed mt-2">
                {isAr 
                  ? 'يعود تراجع التضخم النسبي عن الخانات المئوية الثلاثية السابقة لعام ٢٠٢٤ إلى دولرة السلع والخدمات واستقرار سعر الصرف في مصرف لبنان عند حدوده الحالية، غير أن رسوم المرافق العامة والتعليم تواصل الضغط.'
                  : 'Bypassing historical triple-digit peaks is due in part to full retail dollarization and stable exchange peg since July 2023. Public fees and housing old rents continue driving core spikes.'}
              </p>
            </div>
          </div>

          {/* Interactive Line Chart */}
          <div className="lg:col-span-4 border border-zinc-300 p-4 flex flex-col justify-between">
            <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200">
              {isAr ? 'منحنى تسارع نسبة التضخم السنوية لعام ٢٠٢٦' : 'YoY Consumer Price Index Inflation Velocity'}
            </span>

            {/* Custom line plot */}
            <div className="h-44 w-full flex items-end relative justify-between pt-6 px-4">
              <div className="absolute inset-x-0 top-12 border-t border-zinc-150 border-dashed"></div>
              <div className="absolute inset-x-0 top-24 border-t border-zinc-150 border-dashed"></div>

              {cpiTrend.map((t, idx) => {
                const maxPct = 25;
                const plotHeight = (t.rate / maxPct) * 105;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 relative z-10">
                    <span className="text-[10px] font-mono font-black scale-90 text-red-650 bg-white border border-red-200 px-1 rounded-sm shadow-xs">
                      +{t.rate.toFixed(1)}%
                    </span>
                    <div className="w-1.5 bg-zinc-200 h-28 relative flex justify-center items-end">
                      {/* Fill height visual indicator */}
                      <div 
                        style={{ height: `${plotHeight}%` }}
                        className="w-full bg-black relative flex justify-center"
                      >
                        {/* Dot indicator */}
                        <div className="w-3.5 h-3.5 bg-black border-2 border-white rounded-full absolute -top-1.5 left-1/2 -ml-1.5 shadow-sm"></div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-zinc-500 block mt-1.5 whitespace-nowrap">
                      {isAr ? t.monthAr : t.monthEn}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-[8.5px] text-zinc-400 text-center font-mono pt-2 border-t border-zinc-100">
              {isAr ? 'المصدر: إدارة الإحصاء المركزي اللبناني (CAS)' : 'Source: Central Administration of Statistics, Lebanon'}
            </div>
          </div>

          {/* Categories index surge */}
          <div className="lg:col-span-4 border border-zinc-300 p-4 font-mono">
            <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200 font-sans">
              {isAr ? 'الفئات الأكثر ارتفاعاً في أبريل ٢٠٢٦ (سنوياً)' : 'April 2026 Main Sector Year-on-Year Jumps'}
            </span>

            <div className="space-y-2 mt-4">
              {cpiCategories.map((c, idx) => (
                <div key={idx} className="text-[11px] flex justify-between items-center text-zinc-800 font-bold border-b border-zinc-100 pb-1.5">
                  <span className="font-sans text-left truncate max-w-[190px]" title={isAr ? c.nameAr : c.nameEn}>
                    {isAr ? c.nameAr : c.nameEn}
                  </span>
                  <span className="text-red-650 font-black shrink-0 font-mono tracking-tighter">
                    +{c.rate}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel 4: BDL BUDGET */}
      {activeTab === 'bdl-budget' && (
        <div className="space-y-8 animate-fade-in text-right rtl:text-right ltr:text-left">
          {/* Top Panel Grid: Metrics, Stack, and Hard Truths */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Key BDL Solvency Indicators (Metrics) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div className="border border-black p-4 bg-red-50/50 relative overflow-hidden">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                  {isAr ? 'المركز الصافي للعملات الأجنبية لدى مصرف لبنان' : 'BDL NET FOREIGN CURRENCY POSITION'}
                </span>
                <div className="flex items-baseline gap-2 mt-1.5" dir="ltr">
                  <span className="text-3xl font-black font-mono text-red-700">-$48.6B</span>
                  <span className="text-xs text-red-650 font-bold flex items-center gap-0.5">
                    <TrendingDown size={14} /> Insolvency
                  </span>
                </div>
                <p className="text-[12.5px] text-zinc-650 mt-2 leading-relaxed">
                  {isAr 
                    ? 'رغم وجود ١١.٤ مليار دولار كاحتياطيات إجمالية، يقابلها نحو ٦٠ مليار دولار من الودائع الدولارية المستحقة للمصارف التجارية، مما يجعل المركز الصافي بالدولار سلبي للغاية.'
                    : 'Despite holding $11.4B in gross reserves, BDL faces over $60B in commercial banks USD claims, leaving its net foreign currency position severely negative.'}
                </p>
              </div>

              <div className="border border-black p-4 bg-amber-50/40 relative overflow-hidden">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                  {isAr ? 'احتياطي الذهب (مقيد بالكامل بقانون ١٩٨٦)' : 'GOLD RESERVES (LEGALLY RESTRICTED BY 1986 LAW)'}
                </span>
                <div className="flex items-baseline gap-2 mt-1.5" dir="ltr">
                  <span className="text-3xl font-black font-mono text-amber-700">~$40.0B</span>
                  <span className="text-xs text-zinc-600 font-bold flex items-center gap-0.5">
                    43% of Assets
                  </span>
                </div>
                <p className="text-[12.5px] text-zinc-650 mt-2 leading-relaxed">
                  {isAr 
                    ? 'يمثل الذهب ٤٣٪ من أصول البنك المركزي بقيمة تفوق ٣,٥٨٠ تريليون ليرة لبنانية، لكن يمنع التصرف به بأي شكل دون تشريع صادر عن مجلس النواب.'
                    : 'Gold accounts for 43% of total assets, valued at over LBP 3,580 trillion. However, any liquidation or use remains strictly banned without special legislative approval.'}
                </p>
              </div>

              <div className="border border-black p-3 text-[10px] font-mono font-bold flex justify-between bg-black text-white items-center">
                <span>{isAr ? 'فروقات تقييم العملات (محاسبي):' : 'Currency Valuation Adjustment (Book):'}</span>
                <span>LBP 1,402T</span>
              </div>
            </div>

            {/* Center Column: Assets vs Liabilities Balance Sheet Visual */}
            <div className="lg:col-span-4 border border-zinc-300 p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200">
                  {isAr ? 'هيكل ميزانية المصرف المركزي • الأصول والالتزامات' : 'BDL Balance Sheet • Assets vs. Liabilities'}
                </span>

                {/* Assets and Liabilities bars comparison */}
                <div className="space-y-4 mt-4">
                  {/* Assets Stack */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                      <span className="text-emerald-700">{isAr ? 'إجمالي الأصول المقدرة' : 'Gross Recorded Assets'}</span>
                      <span>~$67B</span>
                    </div>
                    <div className="w-full h-6 bg-zinc-100 border border-zinc-300 flex overflow-hidden">
                      {/* Gold segment 40B / 67B = 60% */}
                      <div className="bg-amber-500 h-full border-r border-white" style={{ width: '60%' }} title="Gold Reserves: $40B"></div>
                      {/* FX reserves 11.4B / 67B = 17% */}
                      <div className="bg-emerald-600 h-full border-r border-white" style={{ width: '17%' }} title="Gross FX Reserves: $11.4B"></div>
                      {/* Valuation diff 15.6B / 67B = 23% */}
                      <div className="bg-zinc-400 h-full" style={{ width: '23%' }} title="Valuation Adjustments: $15.6B"></div>
                    </div>
                    <div className="flex gap-2 text-[8px] font-mono text-zinc-500 font-bold">
                      <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 bg-amber-500 inline-block"></span>{isAr ? 'ذهب' : 'Gold'}</span>
                      <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 bg-emerald-600 inline-block"></span>{isAr ? 'احتياطي' : 'FX'}</span>
                      <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 bg-zinc-400 inline-block"></span>{isAr ? 'تقييم' : 'Val'}</span>
                    </div>
                  </div>

                  {/* Liabilities Stack */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                      <span className="text-red-700">{isAr ? 'الخصوم / ودائع المصارف المستحقة' : 'Liabilities / Bank Deposits'}</span>
                      <span>~$60B</span>
                    </div>
                    <div className="w-full h-6 bg-zinc-100 border border-zinc-300 flex overflow-hidden">
                      <div className="bg-red-700 h-full" style={{ width: '100%' }} title="Commercial Banks Deposits: $60B"></div>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-snug italic">
                      {isAr
                        ? '* يظهر جلياً عجز الـ١١.٤ مليار دولار عن تلبية الالتزامات البالغة ٦٠ مليار دولار.'
                        : '* Factoring in the $60B liabilities highlights the severe $48.6B net currency shortfall.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-zinc-400 text-center font-mono font-medium pt-3 border-t border-zinc-100 mt-4">
                {isAr ? 'المصدر: ميزانية مصرف لبنان في ١٥ حزيران ٢٠٢٦' : 'Source: BDL Bi-weekly Statement - June 15, 2026'}
              </div>
            </div>

            {/* Right Column: 6 Key Truths Interactive Section */}
            <div className="lg:col-span-4 border border-zinc-300 p-4 font-sans">
              <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200">
                {isAr ? 'الحقائق الست لميزانية مصرف لبنان' : 'BDL Balance Sheet: 6 Hard Truths'}
              </span>

              <div className="space-y-2 mt-3 max-h-[220px] overflow-y-auto pr-1">
                {[
                  {
                    id: 1,
                    titleAr: '١. وهم الاحتياطيات الإجمالية مقابل الصافية',
                    titleEn: '1. The Illusion of Gross vs. Net Reserves',
                    descAr: 'الميزانية تظهر وجود ١١.٦ مليار دولار كاحتياطيات، لكنها مجرد أصول يقابلها ٦٠ مليار دولار ودائع مستحقة للمصارف التجارية لا يمكن سدادها.',
                    descEn: 'The statement shows $11.6B gross reserves, but they are matched by $60B in deposits owed to commercial banks that cannot be repaid.'
                  },
                  {
                    id: 2,
                    titleAr: '٢. تعديلات التقييم ليست أموالاً حقيقية',
                    titleEn: '2. Valuation Adjustments are Bookkeeping',
                    descAr: '١,٤٠٢ تريليون ليرة من فروقات تقييم العملات على السعر الرسمي الجديد (٨٩,٥٠٠) هي مجرد قيد دفتري محاسبي، وليست سيولة قابلة للاستخدام.',
                    descEn: 'LBP 1,402T in valuation differences is a pure accounting book entry on the 89,500 LBP platform rate, not real spendable currency.'
                  },
                  {
                    id: 3,
                    titleAr: '٣. الذهب مقيد بقوة القانون',
                    titleEn: '3. Gold is Strictly Locked by Law',
                    descAr: 'يمثل الذهب ٤٣٪ من أصول البنك المركزي، لكن احتياطياته تخضع لقيود قانونية ودستورية تمنع التصرف بها دون تشريع برلماني وهو مستبعد سياسياً.',
                    descEn: 'Gold accounts for 43% of assets, but reserves are subject to strict constitutional restrictions banning any liquidation without parliament bills.'
                  },
                  {
                    id: 4,
                    titleAr: '٤. حجم الأزمة يتجاوز قدرات البنك المركزي',
                    titleEn: '4. The Problem Dwarfs Central Bank Power',
                    descAr: 'تتجاوز الفجوة المالية ضعف حجم الاقتصاد اللبناني بأكمله. يحاول المركزي إلقاء الحل على عاتق السلطة التشريعية بينما يتحمل المودعون الاقتطاعات.',
                    descEn: 'The total financial gap exceeds twice the entire size of the Lebanese GDP. BDL is shifting the burden to a divided legislative parliament.'
                  },
                  {
                    id: 5,
                    titleAr: '٥. الإطار القانوني بطيء للغاية',
                    titleEn: '5. Extremely Slow Legal Framework',
                    descAr: 'قانون تعافي القطاع المصرفي وقوانين السرية المصرفية لعام ٢٠٢٥ أحيت الآمال، غير أن النفوذ وأصحاب المصالح يعرقلون التنفيذ العملي والشامل.',
                    descEn: 'The Banking Recovery Law of 2025 revived IMF deal hopes, but implementation is stalled by intense lobbying from powerful interest groups.'
                  },
                  {
                    id: 6,
                    titleAr: '٦. الحرب تستنزف وسادة الأمان',
                    titleEn: '6. Conflict Depletes Remaining Buffer',
                    descAr: 'استقر الصرف عند ٨٩,٥٠٠ ليرة بفضل تجفيف السيولة، لكن النزاع يستنزف الاحتياطيات المتبقية ويتوقع انكماش الناتج المحلي بنسبة ٧٪ إلى ١٠٪.',
                    descEn: 'The Lira peg at 89,500 is artificially managed through liquidity drying, but regional war drains reserves and threatens 7-10% GDP contraction.'
                  }
                ].map((insight) => {
                  const isExpanded = activeInsight === insight.id;
                  return (
                    <div key={insight.id} className="border border-zinc-200 rounded-xs overflow-hidden transition-all duration-150">
                      <button
                        type="button"
                        onClick={() => setActiveInsight(isExpanded ? null : insight.id)}
                        className="w-full text-right rtl:text-right ltr:text-left block px-2.5 py-1.5 hover:bg-zinc-50 bg-white font-sans font-bold text-[11px] text-zinc-950 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="line-clamp-1">{isAr ? insight.titleAr : insight.titleEn}</span>
                          <ChevronRight size={12} className={`transform transition-transform text-[#b91c1c] shrink-0 ${isExpanded ? 'rotate-90' : 'rotate-0'}`} />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="p-2.5 bg-zinc-50 border-t border-zinc-200 text-[12px] leading-relaxed text-zinc-650 font-sans">
                          {isAr ? insight.descAr : insight.descEn}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Full Newspaper-Style Feature Article Presentation */}
          <div className="border-4 double border-black bg-white p-6 md:p-8 mt-8 space-y-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            {/* Vintage Double Border Header Row */}
            <div className="border-b-4 border-double border-black pb-4 flex flex-col md:flex-row justify-between items-center text-xs font-mono font-bold text-zinc-500 tracking-wider">
              <span className="uppercase text-[#b91c1c]">★ {isAr ? 'تقرير خاص وتحليل استقصائي مالي' : 'SPECIAL INVESTIGATIVE FINANCIAL DISPATCH'} ★</span>
              <div className="flex gap-4 mt-2 md:mt-0 items-center">
                <span>{isAr ? '٢٥ حزيران ٢٠٢٦' : 'June 25, 2026'}</span>
                <span className="text-zinc-300">•</span>
                <span>{isAr ? '٥ دقائق قراءة' : '5 Min Read'}</span>
              </div>
            </div>

            {/* Headline Block */}
            <div className="text-center py-4">
              <h1 className="font-sans font-black text-2xl md:text-3.5xl text-neutral-900 leading-tight tracking-tight select-text">
                {isAr ? 'ماذا تخبرنا ميزانية مصرف لبنان؟ وأين تتبخر الأموال؟' : 'What Does the BDL Balance Sheet Tell Us? And Where Does the Money Evaporate?'}
              </h1>
              <div className="w-24 h-1 bg-[#b91c1c] mx-auto mt-4"></div>
            </div>

            {/* Lead Paragraph / Excerpt */}
            <p className="font-sans italic font-semibold text-lg md:text-xl text-neutral-800 leading-relaxed max-w-4xl mx-auto border-l-4 rtl:border-l-0 rtl:border-r-4 border-zinc-300 pl-4 rtl:pl-0 rtl:pr-4 select-text">
              {isAr 
                ? 'تعكس ميزانية مصرف لبنان (BDL) الحالية تحولاً استراتيجياً في سياسته النقدية؛ فبعد سنوات من "الهندسات المالية" وشراء الوقت، انتقل المركزي اليوم إلى سياسة "الاحتواء وإدارة الأضرار". تتجلى هذه السياسة الجديدة في الامتناع عن إقراض الدولة بالعملات الأجنبية، وتجفيف السيومة بالليرة اللبنانية من الأسواق للحفاظ على استقرار سعر الصرف، وإصدار تعاميم (مثل 158 و166) لترشيد وتدقيق ما تبقى من سحوبات دولارية. ومع ذلك، فإن الغوص في أرقام ميزانية البنك المركزي يكشف عن حقائق قاسية لا يمكن للسياسات المحاسبية إخفاؤها:'
                : 'The current balance sheet of the Central Bank of Lebanon (BDL) reflects a strategic shift in its monetary policy. After years of "financial engineering" and buying time, the central bank has now moved to a policy of "containment and damage control." This new stance is evident in refraining from lending foreign currency to the state, drying up Lebanese Lira liquidity in the markets to maintain exchange rate stability, and issuing circulars (such as 158 and 166) to rationalize and audit remaining dollar withdrawals. However, a deep dive into the central bank\'s numbers reveals harsh truths that accounting policies cannot hide:'}
            </p>

            {/* INTEGRATED STORY BLUEPRINT, HASHTAGS & TOPIC NETWORK */}
            <div className="border-2 border-black bg-[#faf9f6] p-4 font-sans space-y-4 my-6 shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-right rtl:text-right ltr:text-left select-none max-w-4xl mx-auto rounded">
              <div className="flex items-center justify-between border-b border-zinc-300 pb-2.5">
                <div className="flex items-center gap-2">
                  <BookMarked size={14} className="text-[#b91c1c]" />
                  <span className="font-mono text-[10px] font-black uppercase text-[#b91c1c] tracking-wider">
                    {isAr ? 'موجز الملف والشبكة الدلالية' : 'Story Briefing & Topic Intelligence'}
                  </span>
                </div>
                <span className="text-[8px] font-mono text-zinc-400 font-bold">AL-WARRAQ WIRE DESK</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Excerpt Summary (7 cols) */}
                <div className="md:col-span-7 space-y-2 border-b md:border-b-0 md:border-r border-zinc-200 pb-3 md:pb-0 md:pr-4">
                  <span className="font-mono text-[9px] font-black text-zinc-400 block uppercase">
                    {isAr ? '● موجز التحرير والمحتوى' : '● EXCERPT SUMMARY'}
                  </span>
                  <p className="text-xs md:text-sm text-neutral-900 font-serif leading-relaxed italic font-semibold select-text">
                    {isAr 
                      ? 'تحليل مالي ميزانياتي لمصرف لبنان الصادر بمنتصف عام 2026، يكشف عن وهم الاحتياطيات النقدية وصعوبة الإنقاذ المالي في ظل تزايد فروقات التقييم الدفتري وتراكم الالتزامات بالعملات الصعبة.' 
                      : 'An in-depth balance sheet breakdown of Lebanon\'s Central Bank (BDL), exposing the illusion of gross reserves and detailing monetary containment measures amidst severe banking liabilities.'}
                  </p>
                  
                  {/* Hashtags section */}
                  <div className="pt-2 select-none">
                    <span className="font-mono text-[8px] font-black text-zinc-400 block uppercase mb-1">
                      {isAr ? 'أوسمة القصة الدلالية:' : 'STORY HASHTAGS:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['مصرف_لبنان', 'ميزانية_المركزي', 'الليرة_اللبنانية', 'السياسة_النقدية', 'فروقات_التقييم'].map(t => {
                        const displayTag = isAr ? t : t === 'مصرف_لبنان' ? 'BDL' : t === 'ميزانية_المركزي' ? 'BalanceSheet' : t === 'الليرة_اللبنانية' ? 'LebaneseLira' : t === 'السياسة_النقدية' ? 'MonetaryPolicy' : 'Valuation';
                        return (
                          <span
                            key={t}
                            className="text-[#b91c1c] hover:text-black text-[10px] font-mono font-black transition-colors"
                          >
                            #{displayTag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Topic Related Posts (5 cols) */}
                <div className="md:col-span-5 space-y-2.5">
                  <span className="font-mono text-[9px] font-black text-zinc-400 block uppercase">
                    {isAr ? '● تقارير متصلة بذات الموضوع' : '● TOPIC RELATED DISPATCHES'}
                  </span>
                  
                  <div className="space-y-2">
                    {(() => {
                      const related = INITIAL_ARTICLES.filter(art => 
                        art.category === 'lebanon' || art.category === 'markets'
                      ).slice(0, 2);

                      if (related.length === 0) {
                        return (
                          <p className="text-[10px] text-zinc-400 italic">
                            {isAr ? 'لا توجد تقارير إضافية حالياً في هذا التصنيف' : 'No related dispatches found.'}
                          </p>
                        );
                      }

                      return related.map(rArt => {
                        const rTitle = isAr ? rArt.titleAr : rArt.titleEn;
                        return (
                          <button
                            key={rArt.id}
                            type="button"
                            onClick={() => onSelectArticle && onSelectArticle(rArt)}
                            className="w-full text-right rtl:text-right ltr:text-left block p-2 border border-zinc-200 hover:border-[#b91c1c] hover:bg-white transition-all cursor-pointer rounded-xs group"
                          >
                            <span className="text-[9px] font-mono font-bold text-zinc-400 block">
                              {rArt.date}
                            </span>
                            <span className="text-[11px] font-sans font-extrabold text-neutral-800 group-hover:text-[#b91c1c] transition-colors line-clamp-1 leading-snug">
                              {rTitle}
                            </span>
                          </button>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Read More / Read Less Toggle Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setIsArticleExpanded(!isArticleExpanded)}
                className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white font-sans font-black text-xs md:text-sm uppercase tracking-wider transition-all duration-200 border-2 border-black hover:shadow-[4px_4px_0_0_rgba(185,28,28,1)] flex items-center gap-2 cursor-pointer"
              >
                {isArticleExpanded ? (
                  <>
                    <span>{isAr ? 'عرض أقل' : 'Read Less'}</span>
                    <span className="text-red-500 font-black text-xs">▲</span>
                  </>
                ) : (
                  <>
                    <span>{isAr ? 'اقرأ المزيد' : 'Read More'}</span>
                    <span className="text-red-500 font-black text-xs">▼</span>
                  </>
                )}
              </button>
            </div>

            {/* Expanded Section with columns and wrap-up */}
            {isArticleExpanded && (
              <div className="space-y-6 pt-2 animate-fade-in">
                {/* Six Analytical Columns / Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 max-w-6xl mx-auto">
                  {/* Point 1 */}
                  <div className="space-y-2 border-b md:border-b-0 border-zinc-100 pb-4 select-text">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-3xl font-black text-[#b91c1c]">1</span>
                      <h3 className="font-sans font-black text-sm md:text-base text-neutral-900 uppercase tracking-tight">
                        {isAr ? 'وهم الاحتياطيات الإجمالية مقابل الصافية' : 'The Illusion of Gross vs. Net Reserves'}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-neutral-700 font-sans leading-relaxed">
                      {isAr 
                        ? 'تشير الميزانية إلى وجود 11.6 مليار دولار كاحتياطيات أجنبية، وهو رقم يبدو مطمئناً للوهلة الأولى. لكن هذا الرقم يمثل إجمالي الأصول فقط. في الواقع، تراجعت احتياطيات العملات الأجنبية لدى مصرف لبنان بحوالي 642 مليون دولار منذ منتصف شباط/فبراير 2026، ليصل إجمالي الاحتياطيات إلى حوالي 11.4 مليار دولار بنهاية نيسان/أبريل. والأهم من ذلك، أنه عند الأخذ بعين الاعتبار نحو 60 مليار دولار من الودائع الدولارية المستحقة للمصارف التجارية (والتي لا قدرة على سدادها)، فإن مصرف لبنان يُعتبر معسراً فعلياً، ومركزه الصافي بالدولار سلبي للغاية. الـ 11.6 مليار دولار هي مجرد أصول، يقابلها 60 مليار دولار من الخصوم. ضمن سياسة مصرف لبنان الحالية، لا يمكن "إنقاذ" القطاع المصرفي باحتياطيات تم رهنها مسبقاً وتتجاوز الالتزامات حجمها بأضعاف مضاعفة.'
                        : 'The balance sheet points to $11.6 billion in foreign reserves, a figure that appears reassuring at first glance. But this represents gross assets only. In reality, BDL\'s foreign currency reserves dropped by about $642 million since mid-February 2026, reaching around $11.4 billion by the end of April. More importantly, when factoring in the nearly $60 billion in dollar deposits owed to commercial banks (which BDL has no capacity to repay), the central bank is effectively insolvent, with an extremely negative net foreign currency position. The $11.6 billion are merely assets matched by $60 billion in liabilities. Under current BDL policy, the banking sector cannot be "saved" by reserves that are already leveraged and whose liabilities dwarf them several times over.'}
                    </p>
                  </div>

                  {/* Point 2 */}
                  <div className="space-y-2 border-b md:border-b-0 border-zinc-100 pb-4 select-text">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-3xl font-black text-[#b91c1c]">2</span>
                      <h3 className="font-sans font-black text-sm md:text-base text-neutral-900 uppercase tracking-tight">
                        {isAr ? 'تعديلات التقييم ليست أموالاً حقيقية' : 'Valuation Adjustments are Not Real Money'}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-neutral-700 font-sans leading-relaxed">
                      {isAr 
                        ? 'البند الأكبر في الميزانية، والذي يبلغ 1,402 تريليون ليرة لبنانية كفروقات تقييم، هو قيد محاسبي بحت. فهو يعكس المكاسب الدفترية بالليرة الناتجة عن إعادة تقييم التزامات مصرف لبنان بالعملات الأجنبية على السعر الرسمي الجديد للمنصة (89,500 ليرة). هذا القيد المحاسبي ليس "سيولة نقدية قابلة للاستخدام"؛ فلا يمكن توزيعه على المودعين أو استخدامه لإعادة رسملة المصارف. تتطلب أي سياسة نقدية سليمة إعادة هيكلة الخسائر المتراكمة لمصرف لبنان واستعادة ربحيته، لأن الاستمرار في مراكمة هذه الخسائر يهدد قدرة المصرف على البقاء كمرساة للاستقرار المالي.'
                        : 'The largest item on the balance sheet, totaling LBP 1,402 trillion in valuation differences, is a pure accounting entry. It reflects book gains in LBP resulting from revaluing BDL\'s foreign currency liabilities at the new official platform rate (89,500 LBP). This accounting entry is not "usable liquidity"; it cannot be distributed to depositors or used to recapitalize banks. Any sound monetary policy requires restructuring BDL\'s accumulated losses and restoring its profitability, because continuing to accumulate these losses threatens the bank\'s viability as an anchor of financial stability.'}
                    </p>
                  </div>

                  {/* Point 3 */}
                  <div className="space-y-2 border-b md:border-b-0 border-zinc-100 pb-4 select-text">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-3xl font-black text-[#b91c1c]">3</span>
                      <h3 className="font-sans font-black text-sm md:text-base text-neutral-900 uppercase tracking-tight">
                        {isAr ? 'الذهب مقيد بقوة القانون' : 'Gold is Strictly Locked by Law'}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-neutral-700 font-sans leading-relaxed">
                      {isAr 
                        ? 'يمثل الذهب 43% من إجمالي الأصول (حوالي 3,580 تريليون ليرة / أي ما يقارب 40 مليار دولار بالأسعار الحالية). ورغم أن سياسة مصرف لبنان ترتكز على التباهي بهذا الغطاء، إلا أن احتياطيات الذهب تخضع لقيود قانونية ودستورية صارمة منذ منتصف الثمانينيات. وللتصرف بها، يتطلب الأمر اقتراح وإقرار قانون خاص في مجلس النواب. وفي ظل البيئة السياسية المنقسمة في لبنان، لا يُعد تسييل الذهب خياراً واقعياً على المدى القريب.'
                        : 'Gold represents 43% of total assets (about LBP 3,580 trillion / approximately $40 billion at current prices). Although BDL\'s policy relies on boasting of this cover, gold reserves have been subject to strict constitutional and legal restrictions since the mid-1980s. Liquidating or utilizing them requires the proposal and ratification of a special law in Parliament. In Lebanon\'s polarized political environment, liquidating gold is not a realistic option in the near term.'}
                    </p>
                  </div>

                  {/* Point 4 */}
                  <div className="space-y-2 border-b md:border-b-0 border-zinc-100 pb-4 select-text">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-3xl font-black text-[#b91c1c]">4</span>
                      <h3 className="font-sans font-black text-sm md:text-base text-neutral-900 uppercase tracking-tight">
                        {isAr ? 'حجم المشكلة يتجاوز قدرات البنك المركزي' : 'The Scale of the Problem Dwarfs BDL Power'}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-neutral-700 font-sans leading-relaxed">
                      {isAr 
                        ? 'تكمن الأزمة الأساسية في حجم الخسائر والفجوة المالية التي تتجاوز ضعف حجم الاقتصاد اللبناني الحالي. يحاول مصرف لبنان من خلال سياساته إلقاء عبء الحل على عاتق السلطة السياسية والتشريعية، إلا أنه لا يوجد أي زعيم سياسي أو سلطة نقدية ترغب في تحمل هذه المسؤولية والمصارحة أمام المودعين والجمهور، الذين تكبدوا بالفعل "اقتطاعات قسرية" (Haircuts) غير معلنة من خلال الخسارة الهائلة في قدرتهم الشرائية.'
                        : 'The core crisis lies in the scale of losses and the financial gap that exceeds twice the size of the current Lebanese economy. BDL tries through its policies to shift the burden of the solution onto the political and legislative authorities, yet no political leader or monetary authority is willing to bear this responsibility and be transparent with depositors and the public, who have already suffered undeclared "forced haircuts" through the massive loss in their purchasing power.'}
                    </p>
                  </div>

                  {/* Point 5 */}
                  <div className="space-y-2 border-b md:border-b-0 border-zinc-100 pb-4 select-text">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-3xl font-black text-[#b91c1c]">5</span>
                      <h3 className="font-sans font-black text-sm md:text-base text-neutral-900 uppercase tracking-tight">
                        {isAr ? 'الإطار القانوني يتحرك، ولكن ببطء شديد' : 'The Legal Framework Moves, but Very Slowly'}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-neutral-700 font-sans leading-relaxed">
                      {isAr 
                        ? 'أحيا إقرار البرلمان لقانون تعافي القطاع المصرفي والتعديلات على قانون السرية المصرفية في عام 2025 الآمال في الإصلاح، باعتبارها مكونات أساسية لاتفاق مستوى الموظفين مع صندوق النقد الدولي وخطوة لا غنى عنها لحل الأزمة المصرفية. ورغم هذه التطورات، لا يزال من غير الواضح ما إذا كانت خطة التعافي المالي الشاملة ستوضع قيد التنفيذ الفعلي، لا سيما في ظل المعارضة الشرسة من قِبل أصحاب المصالح والنفوذ.'
                        : 'The Parliament\'s passage of the Banking Sector Reform Law and amendments to the Banking Secrecy Law in 2025 revived hopes for reform, as they are essential components of the staff-level agreement with the IMF and an indispensable step toward resolving the banking crisis. Despite these developments, it remains unclear whether a comprehensive financial recovery plan will be put into actual practice, especially in the face of fierce opposition from vested interests.'}
                    </p>
                  </div>

                  {/* Point 6 */}
                  <div className="space-y-2 select-text">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-3xl font-black text-[#b91c1c]">6</span>
                      <h3 className="font-sans font-black text-sm md:text-base text-neutral-900 uppercase tracking-tight">
                        {isAr ? 'الحرب تستنزف وسادة الأمان المتبقية' : 'The War is Depleting the Safety Cushion'}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-neutral-700 font-sans leading-relaxed">
                      {isAr 
                        ? 'استقر سعر صرف الليرة اللبنانية بالقرب من 89,500 للدولار بفضل سياسة التجفيف النقدي التي يعتمدها مصرف لبنان، حتى مع استنزاف النزاع للاحتياطيات، وتدمير البنية التحتية، ودفع الاقتصاد المنهك أصلاً نحو مزيد من المجهول. يُحذر المحللون المستقلون من أن هذا الهدوء النقدي "يُدار بشكل مصطنع"، وليس ناتجاً عن نمو اقتصادي حقيقي. ومن المتوقع أن يؤدي الصراع الحالي إلى انكماش الناتج المحلي الإجمالي الحقيقي للبنان بنسبة تتراوح بين 7% و10% في عام 2026، مما سيتسبب في أضرار اقتصادية مباشرة وغير مباشرة قد تصل إلى 20 مليار دولار.'
                        : 'The exchange rate of the Lebanese pound stabilized near 89,500 per dollar thanks to BDL\'s monetary tightening policy, even as conflict drains reserves, destroys infrastructure, and pushes an already exhausted economy deeper into the unknown. Independent analysts warn that this monetary calm is "artificially managed" rather than the result of real economic growth. The ongoing conflict is projected to contract real GDP by 7% to 10% in 2026, causing direct and indirect economic damage that could reach $20 billion.'}
                    </p>
                  </div>
                </div>

                {/* Vintage Double Border Separator */}
                <div className="border-t-4 border-double border-black pt-4 max-w-5xl mx-auto mt-6">
                  <h4 className="font-sans font-black text-xs md:text-sm uppercase text-[#b91c1c] mb-2">
                    {isAr ? 'خلاصة التحرير المالي: الاحتواء لا الإنقاذ' : 'EDITORIAL WRAP-UP: CONTAINMENT NOT RESCUE'}
                  </h4>
                  <p className="text-sm md:text-base font-sans leading-relaxed text-neutral-800 italic font-semibold select-text">
                    {isAr 
                      ? 'إن ميزانية مصرف لبنان كما تظهر في 15 حزيران/يونيو لا تشير إلى وجود أي قدرة على الإنقاذ؛ بل تعكس مجرد "احتواء مُدار". الارتفاع الحاد في حسابات رأس المال (+33.5 تريليون ليرة) وتعديلات التقييم (+148 تريليون ليرة) هي تحسينات دفترية محاسبية وليست تحسناً حقيقياً في السيولة. إن الحل الشامل يتطلب خطة متكاملة تشمل: إعادة رسملة مصرف لبنان نفسه، وإعادة هيكلة التزاماته بالدولار، وتصميم برنامج لإعادة رسملة المصارف يعتمد على التوزيع العادل للخسائر بين الدولة، والمصارف، وكبار المودعين. لا شيء من هذا يظهر في الميزانية الحالية حتى الآن. ما نراه اليوم هو بنك مركزي يستميت في "الصمود وتثبيت الخطوط"، وليس بنكاً في موقع يسمح له بقيادة خطة إنقاذ وطنية.'
                      : 'BDL\'s balance sheet as of June 15 does not indicate any capacity to rescue; rather, it reflects merely "managed containment." The sharp rise in capital accounts (+LBP 33.5 trillion) and valuation adjustments (+LBP 148 trillion) are bookkeeping improvements rather than a genuine improvement in liquidity. A comprehensive solution requires an integrated plan including: recapitalizing BDL itself, restructuring its USD liabilities, and designing a banking recapitalization program based on the fair distribution of losses among the state, the banks, and large depositors. None of this is visible in the current balance sheet yet. What we see today is a central bank desperately struggling to "survive and hold the line," not a bank in a position to lead a national rescue plan.'}
                  </p>
                </div>

                {/* Call To Action (CTA) & WhatsApp Group Link */}
                <div className="mt-8 border-2 border-black bg-emerald-50/50 p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-[4px_4px_0_0_rgba(16,185,129,1)] transition-all max-w-5xl mx-auto rounded-lg">
                  <div className="space-y-2 text-center md:text-left rtl:md:text-right flex-1">
                    <span className="inline-block text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full">
                      {isAr ? 'تنبيهات عاجلة وتحليلات حصرية' : 'EXCLUSIVE BREAKING ALERTS'}
                    </span>
                    <h5 className="font-sans font-black text-base md:text-lg text-zinc-900 leading-snug">
                      {isAr ? 'هل تريد متابعة تحركات السوق والمالية اللبنانية أولاً بأول؟' : 'Get Real-time Updates on Lebanon’s Economy & Finance'}
                    </h5>
                    <p className="text-xs md:text-sm text-zinc-650 font-sans leading-relaxed">
                      {isAr 
                        ? 'انضم فوراً إلى مجتمع الوراق الإخباري على واتساب لتصلك تحليلات الميزانيات وتحديثات أسعار الصرف فور حدوثها مباشرة على هاتفك.' 
                        : 'Join Al-Warraq exclusive WhatsApp channel/group for real-time coverage, bi-weekly BDL balance sheet teardowns, and immediate macro-economic analysis.'}
                    </p>
                  </div>
                  <a 
                    href="https://chat.whatsapp.com/Fgh6uYQegGKKjs3DL6hy6A" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full md:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans font-black text-sm uppercase tracking-wider transition-all duration-200 border-2 border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center justify-center gap-2 rounded cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.852-4.388 9.855-9.778.002-2.61-1.01-5.063-2.851-6.906C16.435 2.079 13.99 1.06 11.997 1.06c-5.441 0-9.859 4.393-9.862 9.786-.001 2.012.5 3.971 1.451 5.584l-1.014 3.701 3.82-.998zm11.233-5.38c-.3-.149-1.774-.872-2.048-.971-.274-.1-.474-.149-.674.15-.2.299-.774.971-.949 1.171-.175.199-.349.224-.649.075-.3-.149-1.265-.464-2.41-1.482-.891-.793-1.492-1.773-1.667-2.072-.175-.299-.019-.461.13-.609.134-.133.3-.349.449-.523.15-.174.2-.299.3-.498.1-.2.05-.373-.025-.522-.075-.149-.674-1.62-.923-2.217-.243-.585-.49-.505-.674-.515-.175-.009-.374-.011-.573-.011-.2 0-.525.075-.799.373-.274.299-1.048 1.02-1.048 2.487 0 1.468 1.073 2.885 1.223 3.085.15.199 2.11 3.22 5.111 4.516.714.308 1.272.492 1.707.63.717.228 1.368.196 1.883.12.573-.085 1.774-.722 2.023-1.393.249-.672.249-1.245.175-1.369-.075-.124-.275-.199-.575-.349z"/>
                    </svg>
                    <span>{isAr ? 'انضم إلى مجتمع الواتساب' : 'Join WhatsApp Community'}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab Panel 5: INDUSTRIAL EXPORTS */}
      {activeTab === 'industrial-exports' && (
        <div className="space-y-8 animate-fade-in text-right rtl:text-right ltr:text-left select-text">
          {/* Top Panel Grid: Metrics & Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Key Industrial Metrics */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div className="border border-black p-4 bg-emerald-50/40 relative overflow-hidden">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                  {isAr ? 'إجمالي الصادرات الصناعية لعام ٢٠٢٥' : 'TOTAL INDUSTRIAL EXPORTS (2025)'}
                </span>
                <div className="flex items-baseline gap-2 mt-1.5" dir="ltr">
                  <span className="text-3xl font-black font-mono text-emerald-700">$2.90B</span>
                  <span className="text-xs text-emerald-650 font-bold flex items-center gap-0.5">
                    <TrendingUp size={14} /> +15.3%
                  </span>
                </div>
                <p className="text-[12.5px] text-zinc-650 mt-2 leading-relaxed font-sans">
                  {isAr 
                    ? 'سجلت الصادرات الصناعية اللبنانية نمواً ملحوظاً بقيمة ٣٨٦ مليون دولار لتصل إلى ٢.٩ مليار دولار مقارنة بـ ٢.٥ مليار دولار في ٢٠٢٤، متجاوزة مستويات ما قبل الأزمة لعام ٢٠١٩ (٢.٥ مليار دولار).'
                    : 'Lebanese industrial exports recorded a solid expansion of $386 million to touch $2.9 billion compared to $2.5 billion in 2024, surpassing pre-crisis levels of 2019 ($2.5B).'}
                </p>
              </div>

              <div className="border border-black p-4 bg-zinc-50 relative overflow-hidden">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                  {isAr ? 'القطاع القيادي: المعادن الأساسية ومصنوعاتها' : 'LEADING SECTOR: BASE METALS'}
                </span>
                <div className="flex items-baseline gap-2 mt-1.5" dir="ltr">
                  <span className="text-3xl font-black font-mono text-zinc-800">$600.7M</span>
                  <span className="text-xs text-zinc-600 font-bold flex items-center gap-0.5">
                    20.7% of Total
                  </span>
                </div>
                <p className="text-[12.5px] text-zinc-650 mt-2 leading-relaxed font-sans">
                  {isAr 
                    ? 'تصدرت المعادن الأساسية ومصنوعاتها قائمة الصادرات الصناعية بقيمة ٦٠٠.٧ مليون دولار وبنمو قياسي قدره ٣٧.٥٪ مقارنة بـ ٢٠٢٤، مدفوعة بزيادة الطلب الخارجي.'
                    : 'Base metals and metal products topped the industrial exports ranking at $600.7 million, printing a stellar 37.5% growth rate vs 2024, driven by elevated external demand.'}
                </p>
              </div>

              <div className="border border-black p-3 text-[10px] font-mono font-bold flex justify-between bg-black text-white items-center">
                <span>{isAr ? 'البلد الأكثر استيراداً (الإمارات):' : 'Top Export Country (UAE):'}</span>
                <span>$306.3M (10.6%)</span>
              </div>
            </div>

            {/* Center Column: Sector Breakdown Bar Chart */}
            <div className="lg:col-span-4 border border-zinc-300 p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200 font-sans">
                  {isAr ? 'ترتيب القطاعات الصناعية المصدرة • ٢٠٢٥' : 'Top Industrial Export Categories • 2025'}
                </span>

                <div className="space-y-3.5 mt-4">
                  {[
                    { nameAr: 'المعادن الأساسية', nameEn: 'Base Metals', val: 600.7, pct: 'w-[100%]', color: 'bg-zinc-800' },
                    { nameAr: 'الآلات والأجهزة الكهربائية', nameEn: 'Machinery & Electronics', val: 560.1, pct: 'w-[93%]', color: 'bg-emerald-600' },
                    { nameAr: 'المنتجات الكيماوية', nameEn: 'Chemical Products', val: 509.4, pct: 'w-[85%]', color: 'bg-zinc-500' },
                    { nameAr: 'المواد الغذائية والتبغ', nameEn: 'Prepared Foods & Tobacco', val: 455.2, pct: 'w-[76%]', color: 'bg-emerald-500' },
                    { nameAr: 'اللؤلؤ والأحجار الكريمة', nameEn: 'Pearls & Precious Stones', val: 229.1, pct: 'w-[38%]', color: 'bg-amber-500' }
                  ].map((s, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                        <span className="font-sans text-zinc-700">{isAr ? s.nameAr : s.nameEn}</span>
                        <span>${s.val}M</span>
                      </div>
                      <div className="w-full h-2.5 bg-zinc-100 border border-zinc-200">
                        <div className={`h-full ${s.color} ${s.pct}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-zinc-400 text-center font-mono font-medium pt-3 border-t border-zinc-100 mt-4">
                {isAr ? 'المصدر: التقرير السنوي لوزارة الصناعة اللبنانية' : 'Source: Ministry of Industry Annual Report'}
              </div>
            </div>

            {/* Right Column: Destination Share Index */}
            <div className="lg:col-span-4 border border-zinc-300 p-4 font-sans">
              <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200">
                {isAr ? 'وجهات الصادرات الصناعية اللبنانية' : 'Lebanese Export Destination Shares'}
              </span>

              <div className="space-y-2 mt-4">
                {[
                  { nameAr: 'الدول العربية', nameEn: 'Arab Countries', pct: '40.4%', trend: '+1.1%' },
                  { nameAr: 'الدول الأوروبية', nameEn: 'European Markets', pct: '19.0%', trend: '-2.0%' },
                  { nameAr: 'أفريقيا غير العربية', nameEn: 'Non-Arab Africa', pct: '15.6%', trend: '-0.7%' },
                  { nameAr: 'آسيا غير العربية', nameEn: 'Non-Arab Asia', pct: '12.4%', trend: '+2.4%' },
                  { nameAr: 'الأمريكيتان', nameEn: 'The Americas', pct: '11.0%', trend: '0.0%' },
                  { nameAr: 'أوقيانوسيا والشرق الأقصى', nameEn: 'Oceania & Far East', pct: '0.8%', trend: '-0.2%' }
                ].map((d, idx) => (
                  <div key={idx} className="text-[11px] flex justify-between items-center text-zinc-800 font-bold border-b border-zinc-100 pb-1.5 font-mono">
                    <span className="font-sans text-left truncate max-w-[190px]">
                      {isAr ? d.nameAr : d.nameEn}
                    </span>
                    <div className="flex items-center gap-1.5 text-right font-mono">
                      <span className="text-black font-black">{d.pct}</span>
                      <span className={`text-[9px] ${d.trend.startsWith('+') ? 'text-emerald-650' : d.trend.startsWith('-') ? 'text-red-500' : 'text-zinc-400'}`}>
                        ({d.trend})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Callout & Click-Through Report Trigger */}
          <div className="max-w-5xl mx-auto border-2 border-black p-5 bg-emerald-50/30 flex flex-col md:flex-row justify-between items-center gap-6 rounded-lg mt-6">
            <div className="space-y-1.5 flex-1">
              <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-850 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {isAr ? 'تقرير تحليلي معمق' : 'IN-DEPTH MARKET INTELLIGENCE REPORT'}
              </span>
              <h4 className="font-sans font-black text-base text-zinc-900 leading-snug">
                {isAr ? 'الصادرات الصناعية ترتفع بنسبة 15.3% إلى 2.9 مليار دولار في 2025' : 'Lebanese Industrial Exports Surge by 15.3% to $2.9 Billion in 2025'}
              </h4>
              <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                {isAr 
                  ? 'يتناول هذا التقرير تفاصيل مبيعات الآلات الصناعية، ومصادر الاستيراد (مثل الصين بنسبة ٣٤.٣٪)، وهيكل الصفقات وحركة المبادلات التجارية بالتفصيل.'
                  : 'This report details industrial machinery purchases, primary import origins (led by China at 34.3%), trading partners, and structural flows.'}
              </p>
            </div>
            <button
              onClick={() => {
                if (onSelectArticle) {
                  const art = INITIAL_ARTICLES.find(a => a.id === 'leb-industrial-exports-2025');
                  if (art) onSelectArticle(art);
                }
              }}
              className="w-full md:w-auto px-5 py-3 bg-black text-white hover:bg-zinc-800 transition-colors font-sans font-black text-xs uppercase tracking-wider border-2 border-black hover:shadow-[4px_4px_0_0_rgba(16,185,129,1)] flex items-center justify-center gap-2 rounded cursor-pointer"
            >
              <BookMarked size={16} />
              <span>{isAr ? 'اقرأ التقرير الكامل والتحليل' : 'Read Full Investigation'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab Panel 6: INVESTMENT BANKS */}
      {activeTab === 'investment-banks' && (
        <div className="space-y-8 animate-fade-in text-right rtl:text-right ltr:text-left select-text">
          {/* Top Panel Grid: Metrics & Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Key Banking Metrics */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div className="border border-black p-4 bg-amber-50/30 relative overflow-hidden">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                  {isAr ? 'الميزانية العمومية الموحدة لبنوك الاستثمار' : 'COMBINED BALANCE SHEET (Q1 2026)'}
                </span>
                <div className="flex items-baseline gap-2 mt-1.5" dir="ltr">
                  <span className="text-3xl font-black font-mono text-zinc-900">LBP 91.2T</span>
                  <span className="text-xs text-red-600 font-bold flex items-center gap-0.5">
                    <TrendingDown size={14} /> -1.1%
                  </span>
                </div>
                <p className="text-[12.5px] text-zinc-650 mt-2 leading-relaxed font-sans">
                  {isAr 
                    ? 'بلغت الميزانية الموحدة لبنوك الاستثمار في لبنان ٩١.٢ تريليون ليرة (حوالي ١.٠٢ مليار دولار)، مسجلة تراجعاً طفيفاً بنسبة ١.١٪ مقارنة بنهاية ٢٠٢٥، لكن بنمو قدره ٩.٨٪ سنوياً.'
                    : 'The consolidated balance sheet of investment banks stood at LBP 91.2 trillion (~$1.02 Billion), contracting slightly by 1.1% compared to year-end 2025, but expanding 9.8% YoY.'}
                </p>
              </div>

              <div className="border border-black p-4 bg-zinc-50 relative overflow-hidden">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                  {isAr ? 'أثر تعميم مصرف لبنان رقم ١٦٧' : 'IMPACT OF BDL CIRCULAR NO. 167'}
                </span>
                <div className="flex items-baseline gap-2 mt-1.5" dir="ltr">
                  <span className="text-3xl font-black font-mono text-blue-800">89,500</span>
                  <span className="text-xs text-zinc-600 font-bold flex items-center gap-0.5">
                    LBP / USD Rate
                  </span>
                </div>
                <p className="text-[12.5px] text-zinc-650 mt-2 leading-relaxed font-sans">
                  {isAr 
                    ? 'أعيد تقييم جميع أصول وخصوم العملات الأجنبية لدى بنوك الاستثمار وفق آلية التعميم ١٦٧ بسعر الصرف الرسمي البالغ ٨٩,٥٠٠ ليرة للدولار، مما انعكس بوضوح على هيكل الميزانيات.'
                    : 'All foreign currency assets and liabilities were converted at the official platform exchange rate of LBP 89,500 per USD as directed by Circular 167, shifting balance sheet aggregates.'}
                </p>
              </div>

              <div className="border border-black p-3 text-[10px] font-mono font-bold flex justify-between bg-black text-white items-center">
                <span>{isAr ? 'النقد والودائع لدى المصارف المركزية:' : 'Cash & Central Bank Deposits:'}</span>
                <span>LBP 35.6T (39%)</span>
              </div>
            </div>

            {/* Center Column: Assets Distribution Chart */}
            <div className="lg:col-span-4 border border-zinc-300 p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200 font-sans">
                  {isAr ? 'توزيع الأصول لبنوك الاستثمار • الربع الأول ٢٠٢٦' : 'Investment Banks Assets Share • Q1 2026'}
                </span>

                <div className="space-y-3.5 mt-4">
                  {[
                    { nameAr: 'النقد والودائع لدى البنوك المركزية', nameEn: 'Cash & CB Deposits', val: '35.6T', pct: 'w-[39%]', color: 'bg-zinc-800' },
                    { nameAr: 'محفظة الأوراق المالية (سندات الخزينة)', nameEn: 'Securities Portfolio', val: '10.0T', pct: 'w-[11%]', color: 'bg-zinc-600' },
                    { nameAr: 'مطالبات على العملاء المقيمين', nameEn: 'Resident Customers Claims', val: '8.7T', pct: 'w-[9.5%]', color: 'bg-emerald-600' },
                    { nameAr: 'مطالبات على القطاع المالي المقيم', nameEn: 'Resident Financial Claims', val: '7.7T', pct: 'w-[8.4%]', color: 'bg-amber-500' },
                    { nameAr: 'مطالبات على القطاع المالي غير المقيم', nameEn: 'Non-Res Financial Claims', val: '6.2T', pct: 'w-[6.8%]', color: 'bg-zinc-400' }
                  ].map((s, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                        <span className="font-sans text-zinc-700 truncate max-w-[180px]">{isAr ? s.nameAr : s.nameEn}</span>
                        <span>LBP {s.val}</span>
                      </div>
                      <div className="w-full h-2.5 bg-zinc-100 border border-zinc-200">
                        <div className={`h-full ${s.color} ${s.pct}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-zinc-400 text-center font-mono font-medium pt-3 border-t border-zinc-100 mt-4">
                {isAr ? 'المصدر: الإحصاءات النقدية والمصرفية لمصرف لبنان' : 'Source: BDL Monetary & Banking Statistics'}
              </div>
            </div>

            {/* Right Column: Liabilities Breakdown Index */}
            <div className="lg:col-span-4 border border-zinc-300 p-4 font-sans">
              <span className="text-xs font-black uppercase text-black block pb-2 border-b border-zinc-200">
                {isAr ? 'هيكل الودائع والالتزامات للقطاع' : 'Combined Deposits & Liabilities Share'}
              </span>

              <div className="space-y-3 mt-4">
                {[
                  { nameAr: 'ودائع العملاء المقيمين', nameEn: 'Resident Customer Deposits', val: 'LBP 29.1T', pct: '31.9%' },
                  { nameAr: 'حسابات رأس المال والمخصصات', nameEn: 'Capital Accounts & Reserves', val: 'LBP 24.6T', pct: '27.0%' },
                  { nameAr: 'التزامات للقطاع المالي غير المقيم', nameEn: 'Non-Res Financial Liab.', val: 'LBP 9.2T', pct: '10.1%' },
                  { nameAr: 'ودائع العملاء غير المقيمين', nameEn: 'Non-Res Customer Deposits', val: 'LBP 8.7T', pct: '9.5%' },
                  { nameAr: 'التزامات للقطاع المالي المقيم', nameEn: 'Resident Financial Liab.', val: 'LBP 5.2T', pct: '5.7%' }
                ].map((d, idx) => (
                  <div key={idx} className="text-[11px] flex justify-between items-center text-zinc-800 font-bold border-b border-zinc-100 pb-1.5 font-mono">
                    <span className="font-sans text-left truncate max-w-[170px]" title={isAr ? d.nameAr : d.nameEn}>
                      {isAr ? d.nameAr : d.nameEn}
                    </span>
                    <div className="flex flex-col items-end text-right font-mono">
                      <span className="text-black font-black">{d.val}</span>
                      <span className="text-[9px] text-zinc-450 font-normal">({d.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Callout & Click-Through Report Trigger */}
          <div className="max-w-5xl mx-auto border-2 border-black p-5 bg-amber-50/20 flex flex-col md:flex-row justify-between items-center gap-6 rounded-lg mt-6">
            <div className="space-y-1.5 flex-1">
              <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-0.5 rounded-full">
                {isAr ? 'دراسة إحصائية وتحليل مالي' : 'CONSOLIDATED BANKING SYSTEM METRICS'}
              </span>
              <h4 className="font-sans font-black text-base text-zinc-900 leading-snug">
                {isAr ? 'الميزانية العمومية لبنوك الاستثمار عند 91.2 تريليون ليرة لبنانية بنهاية آذار 2026' : 'Investment Banks Combined Balance Sheet Reaches LBP 91.2 Trillion in Q1 2026'}
              </h4>
              <p className="text-xs text-zinc-650 font-sans leading-relaxed">
                {isAr 
                  ? 'تفاصيل دقيقة لمطالبات العملاء المقيمين بالعملات المحلية والأجنبية، وتوزع الودائع، وهيكل حساب رأس المال والخصوم للبنوك الاستثمارية العاملة في لبنان.'
                  : 'Granular breakdown of customer claims in local and foreign currencies, resident/non-resident deposits, and equity structure of investment banks operating in Lebanon.'}
              </p>
            </div>
            <button
              onClick={() => {
                if (onSelectArticle) {
                  const art = INITIAL_ARTICLES.find(a => a.id === 'leb-investment-banks-sheet-2026');
                  if (art) onSelectArticle(art);
                }
              }}
              className="w-full md:w-auto px-5 py-3 bg-black text-white hover:bg-zinc-800 transition-colors font-sans font-black text-xs uppercase tracking-wider border-2 border-black hover:shadow-[4px_4px_0_0_rgba(217,119,6,1)] flex items-center justify-center gap-2 rounded cursor-pointer"
            >
              <BookMarked size={16} />
              <span>{isAr ? 'اقرأ التقرير الكامل والتحليل' : 'Read Full Investigation'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

