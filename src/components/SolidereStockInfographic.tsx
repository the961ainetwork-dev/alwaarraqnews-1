import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  AlertTriangle, 
  ArrowDownRight, 
  Lock, 
  Layers, 
  HelpCircle,
  FileText,
  Search
} from 'lucide-react';

interface SolidereStockInfographicProps {
  language: 'ar' | 'en';
}

export const SolidereStockInfographic: React.FC<SolidereStockInfographicProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [selectedPhase, setSelectedPhase] = useState<number>(3); // Default to Phase 4 (2025-2026)

  // Comparative data for the ownership vertical bars
  const ownershipData = {
    preCrisis: {
      retail: 65,
      public: 25,
      institutions: 10
    },
    current2026: {
      retail: 40,
      public: 10,
      institutions: 50
    }
  };

  return (
    <div 
      id="solidere-stock-struggle-infographic"
      className="border-4 border-black p-4 md:p-6 bg-stone-50 text-black font-sans relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none ltr:text-left rtl:text-right"
    >
      {/* Newspaper Badge Header */}
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 border-b-4 border-black pb-4 mb-6">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <span className="bg-red-800 text-white text-[10px] font-mono px-2 py-0.5 font-bold tracking-widest uppercase">
              {isAr ? 'تحقيق استقصائي مصوّر لـ "الوراق"' : 'AL-WARRAQ INVESTIGATIVE INFOGRAPHIC'}
            </span>
            <span className="bg-black text-white text-[10px] font-mono px-2 py-0.5 font-bold uppercase">
              DOSSIER #2026
            </span>
          </div>
          <h3 className="text-xl md:text-3xl font-black tracking-tight text-zinc-950 leading-tight">
            {isAr ? 'تطور وإعادة توزيع أسهم سوليدير (حتى 2026)' : 'Solidere Share Evolution & Redistribution (Until 2026)'}
          </h3>
          <p className="text-xs md:text-sm text-zinc-700 font-serif font-bold italic">
            {isAr ? 'تحقيق الوراق نيوز: لمن تؤول السيطرة الفعلية والسيادة على وسط العاصمة؟' : 'Al-Warraq News Investigation: Who Holds De Facto Sovereignty Over Beirut Downtown?'}
          </p>
        </div>

        {/* Newspaper logo block right */}
        <div className="border-2 border-black p-2 bg-white text-center flex flex-col justify-center min-w-[140px] shrink-0 font-mono">
          <div className="flex items-center justify-center gap-1">
            <Search size={14} className="text-red-800 stroke-[3]" />
            <span className="text-red-800 font-black text-xs">AL-WARRAQ</span>
          </div>
          <span className="text-black font-black text-[13px] tracking-tighter leading-none">
            {isAr ? 'الوراق نيوز' : 'AL-WARRAQ NEWS'}
          </span>
          <div className="h-[1px] bg-zinc-300 my-1"></div>
          <span className="text-zinc-600 text-[9px] font-bold block uppercase">
            {isAr ? 'قسم التحقيقات الاستقصائية' : 'Sovereign Desk'}
          </span>
        </div>
      </div>

      {/* Main 3-Column Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* PANEL 1: Stock Trajectory (5/12 cols) */}
        <div className="lg:col-span-5 border-2 border-black p-4 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-3">
              <TrendingUp className="text-red-800" size={18} />
              <h4 className="font-sans font-black text-xs md:text-sm uppercase tracking-tight">
                {isAr ? '❶ تطور قيمة السهم والمنعطفات التاريخية' : '❶ STOCK PRICE TRAJECTORY & HISTORICAL PIVOTS'}
              </h4>
            </div>

            {/* Price Line SVG */}
            <div className="border border-zinc-200 bg-zinc-50/50 p-2 relative rounded-none mb-3">
              <div className="absolute top-2 left-2 font-mono text-[9px] text-zinc-500 font-bold">
                USD {isAr ? 'السعر بالدولار' : 'PRICE RANGE'}
              </div>
              
              <svg viewBox="0 0 400 180" className="w-full h-auto overflow-visible font-mono">
                {/* Horizontal reference lines */}
                <line x1="40" y1="20" x2="380" y2="20" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="2" />
                <line x1="40" y1="70" x2="380" y2="70" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="2" />
                <line x1="40" y1="120" x2="380" y2="120" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="2" />
                <line x1="40" y1="160" x2="380" y2="160" stroke="#dcdcdc" strokeWidth="1" />

                {/* Left Y Axis Labels */}
                <text x="32" y="24" className="text-[9px] fill-zinc-500 font-bold text-right">80</text>
                <text x="32" y="74" className="text-[9px] fill-zinc-500 font-bold text-right">40</text>
                <text x="32" y="124" className="text-[9px] fill-zinc-500 font-bold text-right">15</text>
                <text x="32" y="164" className="text-[9px] fill-zinc-500 font-bold text-right">0</text>

                {/* Shaded area underneath the stock line */}
                <path
                  d="M 50 155 Q 110 145 150 115 T 250 45 T 350 42 L 350 160 L 50 160 Z"
                  fill="url(#area-grad)"
                  opacity="0.15"
                />

                <defs>
                  <linearGradient id="area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#991b1b" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>

                {/* Stock Price Line with Custom Curve */}
                <path
                  d="M 50 155 Q 110 145 150 115 T 250 45 T 350 42"
                  fill="none"
                  stroke="#991b1b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Nodes (Interactive Points) */}
                {[
                  { cx: 50, cy: 155, label: '2019', val: '$5-8' },
                  { cx: 150, cy: 115, label: '21-2020', val: '$30+' },
                  { cx: 250, cy: 45, label: '24-2022', val: '$80' },
                  { cx: 350, cy: 42, label: '26-2025', val: '$60-80' }
                ].map((pt, idx) => (
                  <g 
                    key={idx} 
                    className="cursor-pointer group"
                    onClick={() => setSelectedPhase(idx)}
                  >
                    <circle
                      cx={pt.cx}
                      cy={pt.cy}
                      r={selectedPhase === idx ? "8" : "5"}
                      className={`transition-all duration-200 ${
                        selectedPhase === idx 
                          ? 'fill-red-800 stroke-black stroke-2 scale-125' 
                          : 'fill-white stroke-red-800 stroke-2 hover:fill-red-100 hover:scale-110'
                      }`}
                    />
                    <text
                      x={pt.cx}
                      y={pt.cy - 12}
                      className="text-[10px] font-black fill-black text-center"
                      textAnchor="middle"
                    >
                      {pt.val}
                    </text>
                    <text
                      x={pt.cx}
                      y="174"
                      className={`text-[9px] font-mono text-center font-bold ${
                        selectedPhase === idx ? 'fill-red-800 font-black' : 'fill-zinc-500'
                      }`}
                      textAnchor="middle"
                    >
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Interactive Stage Exporter Details */}
            <div className="border border-zinc-200 p-3 bg-stone-100/60 min-h-[140px] flex flex-col justify-between">
              {selectedPhase === 0 && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center border-b border-zinc-300 pb-1">
                    <span className="bg-zinc-800 text-white font-mono text-[9px] px-1.5 py-0.5 font-bold">STAGE 1: 2019</span>
                    <span className="font-sans font-black text-xs text-zinc-950">{isAr ? 'ركود السعر والجمود العقاري' : 'Price Stagnation & Freeze'}</span>
                  </div>
                  <p className="text-xs font-serif text-zinc-700 leading-relaxed">
                    {isAr 
                      ? 'قبل الانهيار، عانت أسهم سوليدير من ركود طويل بين 5 و8 دولارات بسبب غياب السيولة والاستثمارات الأجنبية، وشلل شبه كامل لعمليات البناء والبيع العقاري.'
                      : 'Prior to the collapse, Solidere stock languished between $5 and $8 due to massive capital flight, complete lack of liquidity, and frozen physical development.'}
                  </p>
                </div>
              )}
              {selectedPhase === 1 && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center border-b border-zinc-300 pb-1">
                    <span className="bg-amber-600 text-white font-mono text-[9px] px-1.5 py-0.5 font-bold">STAGE 2: 2020-2021</span>
                    <span className="font-sans font-black text-xs text-zinc-950">{isAr ? 'فورة الهروب المالي (اللولار)' : 'The "Lollar" Escape Bubble'}</span>
                  </div>
                  <p className="text-xs font-serif text-zinc-700 leading-relaxed">
                    {isAr 
                      ? 'مع تقييد المصارف للودائع، هرب صغار المودعين وكبارهم لشراء أسهم سوليدير كوسيلة لتسييل الأرصدة البنكية وتحويلها لأصول عقارية، مما رفع السعر ليتجاوز 30 دولاراً.'
                      : 'As bank accounts froze, depositors frantically bought Solidere shares as the sole exit channel to convert virtual paper balances ("Lollars") into prime physical real estate assets.'}
                  </p>
                </div>
              )}
              {selectedPhase === 2 && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center border-b border-zinc-300 pb-1">
                    <span className="bg-red-800 text-white font-mono text-[9px] px-1.5 py-0.5 font-bold">STAGE 3: 2022-2024</span>
                    <span className="font-sans font-black text-xs text-zinc-950">{isAr ? 'تجميع النفوذ وذروة الاحتكار' : 'Elite Consolidation & Peak'}</span>
                  </div>
                  <p className="text-xs font-serif text-zinc-700 leading-relaxed">
                    {isAr 
                      ? 'بلغ سعر السهم ذروته التاريخية مقترباً من 80 دولاراً بالتوازي مع قيام حيتان ماليين وكيانات استثمارية كبرى بشراء الأسهم المتبقية وتكثيف قبضتهم الإدارية.'
                      : 'Stock peaked near historical highs of $80 as institutional conglomerates, financial oligarchs, and offshore entities bought out retail holdings to construct board veto blocks.'}
                  </p>
                </div>
              )}
              {selectedPhase === 3 && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center border-b border-zinc-300 pb-1">
                    <span className="bg-black text-white font-mono text-[9px] px-1.5 py-0.5 font-bold">STAGE 4: 2025-2026</span>
                    <span className="font-sans font-black text-xs text-red-900">{isAr ? 'حرب الاستحواذ الشرسة والتمديد' : 'Aggressive Proxy War & Lease'}</span>
                  </div>
                  <p className="text-xs font-serif text-zinc-700 leading-relaxed">
                    {isAr 
                      ? 'صراع السيطرة يستقر في الذروة بالتوازي مع تمديد عمر الشركة لـ 50 عاماً إضافية (حتى 2069)، وسعي صحناوي الشرس لفرض واقع جديد بحصة تصويت تتخطى 40%.'
                      : 'The board struggle stabilizes at the top. Concurrently, a 50-year lease extension (until 2069) is pushed, while Sehnaoui builds a de facto 40%+ proxy front to monetize assets.'}
                  </p>
                </div>
              )}

              {/* Navigation dots indicator */}
              <div className="flex justify-center gap-1.5 pt-2 border-t border-zinc-200 mt-2">
                {[0, 1, 2, 3].map((step) => (
                  <button
                    key={step}
                    onClick={() => setSelectedPhase(step)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      selectedPhase === step ? 'bg-red-800 scale-110' : 'bg-zinc-300 hover:bg-zinc-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-[10px] text-zinc-500 font-mono italic ltr:text-right rtl:text-left">
            * {isAr ? 'اضغط على النقاط الحمراء في الرسم البياني لاستكشاف مراحل تطور السهم' : 'Click the red nodes on the price line chart to explore stock stages.'}
          </div>
        </div>

        {/* PANEL 2: Share Distribution Stack Bars (3.5/12 cols) */}
        <div className="lg:col-span-3.5 border-2 border-black p-4 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-3">
              <Users className="text-red-800 animate-pulse" size={18} />
              <h4 className="font-sans font-black text-xs md:text-sm uppercase tracking-tight">
                {isAr ? '❷ إعادة توزيع الملكية والأسهم' : '❷ SHARE REDISTRIBUTION'}
              </h4>
            </div>

            <p className="text-[11px] font-serif text-zinc-650 leading-relaxed mb-4">
              {isAr 
                ? 'تكشف البيانات عن تبخر مخيف للمساهمات الصغيرة والعامة لبلدية بيروت، وتمرير الملكية لحساب الجبابرة والأوليغارشية المالية:'
                : 'Comparative study on how retail investors and public municipality holdings were aggressively dissolved and swallowed by financial elites:'}
            </p>

            {/* Vertical Stack Bar Charts */}
            <div className="grid grid-cols-2 gap-4 items-end pt-2">
              
              {/* Pre-Crisis Bar */}
              <div className="space-y-2 text-center">
                <span className="font-mono text-[9px] font-black text-zinc-500 uppercase block">
                  {isAr ? 'قبل الأزمة' : 'PRE-CRISIS'}
                </span>
                
                {/* Visual Stacked Column */}
                <div className="h-56 w-14 mx-auto border-2 border-black flex flex-col font-mono text-[10px] font-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
                  {/* Retail Investors 65% */}
                  <div 
                    className="bg-zinc-800 text-white flex flex-col items-center justify-center transition-all hover:bg-zinc-950" 
                    style={{ height: '65%' }}
                    title={isAr ? 'صغار المساهمين: 65%' : 'Retail Shareholders: 65%'}
                  >
                    <span>65%</span>
                    <span className="text-[7px] leading-none opacity-85 scale-90">{isAr ? 'صغار' : 'Retail'}</span>
                  </div>
                  {/* Public / Municipality 25% */}
                  <div 
                    className="bg-zinc-400 text-black flex flex-col items-center justify-center border-t border-b border-black transition-all hover:bg-zinc-500" 
                    style={{ height: '25%' }}
                    title={isAr ? 'بلدية بيروت ومؤسسات عامة: 25%' : 'Municipality: 25%'}
                  >
                    <span>25%</span>
                    <span className="text-[7px] leading-none opacity-85 scale-90">{isAr ? 'عام' : 'Gov'}</span>
                  </div>
                  {/* Financial Elites 10% */}
                  <div 
                    className="bg-red-800 text-white flex flex-col items-center justify-center transition-all hover:bg-red-900" 
                    style={{ height: '10%' }}
                    title={isAr ? 'مؤسسات وأوليغارشية: 10%' : 'Elites: 10%'}
                  >
                    <span>10%</span>
                  </div>
                </div>
              </div>

              {/* 2026 Estimates Bar */}
              <div className="space-y-2 text-center">
                <span className="font-mono text-[9px] font-black text-red-800 uppercase block">
                  {isAr ? 'التقديرات الحالية (2026)' : '2026 ESTIMATES'}
                </span>

                {/* Visual Stacked Column */}
                <div className="h-56 w-14 mx-auto border-2 border-black flex flex-col font-mono text-[10px] font-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
                  {/* Retail Investors 40% */}
                  <div 
                    className="bg-zinc-800 text-white flex flex-col items-center justify-center transition-all hover:bg-zinc-950" 
                    style={{ height: '40%' }}
                    title={isAr ? 'صغار المساهمين: 40%' : 'Retail Shareholders: 40%'}
                  >
                    <span>40%</span>
                    <span className="text-[7px] leading-none opacity-85 scale-90">{isAr ? 'صغار' : 'Retail'}</span>
                  </div>
                  {/* Public / Municipality 10% */}
                  <div 
                    className="bg-zinc-400 text-black flex flex-col items-center justify-center border-t border-b border-black transition-all hover:bg-zinc-500" 
                    style={{ height: '10%' }}
                    title={isAr ? 'بلدية بيروت ومؤسسات عامة: 10%' : 'Municipality: 10%'}
                  >
                    <span className="text-red-950 font-extrabold">10%</span>
                    <span className="text-[7px] leading-none opacity-85 scale-90">{isAr ? 'تصفية!' : 'Gov'}</span>
                  </div>
                  {/* Financial Elites 50% */}
                  <div 
                    className="bg-red-800 text-white flex flex-col items-center justify-center transition-all hover:bg-red-900" 
                    style={{ height: '50%' }}
                    title={isAr ? 'مؤسسات وأوليغارشية: 50%' : 'Elites: 50%'}
                  >
                    <span className="animate-pulse text-xs font-black">50%</span>
                    <span className="text-[7px] leading-none opacity-85 scale-90">{isAr ? 'سيطرة' : 'Control'}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Legend map */}
          <div className="border border-zinc-200 bg-stone-100 p-2 text-[9px] font-mono leading-normal mt-4 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-zinc-800 shrink-0 border border-black"></div>
              <span className="text-zinc-700">{isAr ? 'صغار المستثمرين والملاك الأصليين (65% ◀ 40%)' : 'Retail Investors & Original Owners (65% ◀ 40%)'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-zinc-400 shrink-0 border border-black"></div>
              <span className="text-zinc-700">{isAr ? 'بلدية بيروت والمؤسسات العامة (25% ◀ 10% تصفية)' : 'Beirut Municipality & Public Shares (25% ◀ 10%)'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-red-800 shrink-0 border border-black"></div>
              <span className="text-zinc-700">{isAr ? 'المؤسسات المالية الكبرى والأوليغارشية (10% ◀ 50% سيطرة)' : 'Financial Elites & Oligarchs (10% ◀ 50%)'}</span>
            </div>
          </div>
        </div>

        {/* PANEL 3: Right Side: Split into Sehnaoui leverage & Property Stripping (3.5/12 cols) */}
        <div className="lg:col-span-3.5 flex flex-col gap-4">
          
          {/* Subpanel 3A: Sehnaoui Front */}
          <div className="border-2 border-black p-4 bg-white flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-2.5">
                <Building2 className="text-red-800" size={18} />
                <h4 className="font-sans font-black text-xs uppercase tracking-tight">
                  {isAr ? '❸ جبهة أنطون صحناوي والوكلاء' : '❸ SEHNAOUI PROXY FRONT'}
                </h4>
              </div>

              <span className="bg-red-850 text-white font-mono text-[9px] font-black uppercase px-1.5 py-0.5 tracking-wider block text-center mb-3">
                {isAr ? 'النفوذ الفعلي غير المعلن' : 'DE FACTO EFFECTIVE INFLUENCE'}
              </span>

              {/* Sehnaoui Stats Row */}
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-zinc-100 p-2 border border-zinc-200">
                  <span className="font-mono text-[10px] text-zinc-600 font-bold">{isAr ? 'رسمياً:' : 'OFFICIALLY:'}</span>
                  <span className="font-mono text-xs font-black text-zinc-950 bg-white border border-zinc-300 px-1.5 py-0.5">
                    {isAr ? '10% تملك مباشر' : '10% Direct'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center bg-red-50 p-2 border border-red-200 animate-pulse">
                  <span className="font-mono text-[10px] text-red-950 font-black">{isAr ? 'فعلياً بالوكالة:' : 'BY PROXIES:'}</span>
                  <span className="font-mono text-xs font-black text-white bg-red-800 px-1.5 py-0.5 border border-black">
                    {isAr ? '40%+ نفوذ فعلي' : '40%+ Influence'}
                  </span>
                </div>
              </div>

              {/* Network illustration mock schema */}
              <div className="border border-zinc-200 bg-zinc-50/50 p-2 my-2.5 flex flex-col items-center justify-center space-y-1 font-mono text-[8px] leading-tight text-center">
                <div className="bg-black text-white px-2 py-0.5 font-bold rounded-xs">
                  {isAr ? '«أنطون صحناوي / SGBL»' : 'Antoun Sehnaoui / SGBL'}
                </div>
                <div className="text-zinc-400 font-black">↓ ↓ ↓</div>
                <div className="grid grid-cols-3 gap-1 w-full">
                  <div className="border border-zinc-300 bg-white p-0.5">
                    <span className="text-red-800 font-black">10%</span>
                    <span className="block text-[7px] text-zinc-500">{isAr ? 'مباشر' : 'Direct'}</span>
                  </div>
                  <div className="border border-zinc-300 bg-white p-0.5">
                    <span className="text-red-850 font-black">17%</span>
                    <span className="block text-[7px] text-zinc-500">{isAr ? 'تفويضات' : 'Proxies'}</span>
                  </div>
                  <div className="border border-red-200 bg-red-50 p-0.5">
                    <span className="text-red-900 font-black">13%+</span>
                    <span className="block text-[7px] text-zinc-500">{isAr ? 'أصوات رافعة' : 'Leveraged'}</span>
                  </div>
                </div>
                <p className="text-[8px] text-zinc-500 font-serif leading-none mt-1">
                  * {isAr ? 'تجميع تفويضات المساهمين الغائبين عبر ذراع SGBL' : 'Aggregating absent shareholders via SGBL financial arms'}
                </p>
              </div>
            </div>

            <p className="text-[10px] font-serif text-zinc-600 leading-relaxed italic border-t border-zinc-100 pt-2">
              {isAr 
                ? 'مورغان أورتاغوس: صحناوي يستعرض نفوذه بالوكالة للسيطرة على مجلس الإدارة وإجبار الحرس القديم على الرضوخ.'
                : 'Leveraged votes: Sehnaoui exercises voting proxies to overhaul board structure, ousting traditional administrative blocks.'}
            </p>
          </div>

          {/* Subpanel 3B: Public Property Stripping */}
          <div className="border-2 border-black p-4 bg-white flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-2">
                <AlertTriangle className="text-red-850 stroke-[2.5]" size={18} />
                <h4 className="font-sans font-black text-xs uppercase tracking-tight">
                  {isAr ? '❹ تجريد الملكية العامة والمؤسسات' : '❹ PUBLIC PROPERTY STRIPPING'}
                </h4>
              </div>

              <ul className="text-[10px] font-serif text-zinc-800 space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5 border-b border-zinc-100 pb-1.5">
                  <span className="text-red-800 font-black shrink-0 font-mono">◀</span>
                  <div>
                    <strong>{isAr ? 'صفقة أسهم البلدية:' : 'Municipality Swap Deal:'}</strong>{' '}
                    {isAr 
                      ? 'مبادلة أسهم بلدية بيروت في سوليدير (2.4 مليون دولار) بمبنى "غراند ثياتر" المتهالك.'
                      : 'Swapping Beirut Municipality’s solid core $2.4M shares in Solidere for the dilapidated "Grand Theatre" property.'}
                  </div>
                </li>
                <li className="flex items-start gap-1.5 border-b border-zinc-100 pb-1.5">
                  <span className="text-red-800 font-black shrink-0 font-mono">◀</span>
                  <div>
                    <strong>{isAr ? 'إقصاء الشريك البلدي:' : 'Ousting Beirut Oversight:'}</strong>{' '}
                    {isAr 
                      ? 'إخراج البلدية كلياً كشريك مساهم لقطع أرباحها المتراكمة والحد من رقابتها القانونية.'
                      : 'Evicting Beirut Municipality as a shareholder to terminate accumulated dividends and suppress oversight.'}
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-800 font-black shrink-0 font-mono">◀</span>
                  <div>
                    <strong>{isAr ? 'إخراج ممثلي التراث والشركاء:' : 'Eviction of Heritage Guardians:'}</strong>{' '}
                    {isAr 
                      ? 'خصخصة مطلقة تنهي الطابع العمومي التاريخي للعاصمة وتؤمّن تصفية الأصول العقارية الحيوية.'
                      : 'Absolute privatization to wipe out the historic public traits of Beirut, monetizing prime civic blocks.'}
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-red-800 text-white font-mono text-[8px] font-bold py-1 px-1.5 mt-2.5 text-center uppercase tracking-wide">
              ⚠️ {isAr ? 'تجريد البلدية من كامل أسهمها بأسعار وهمية' : 'Municipality fully stripped of share value'}
            </div>
          </div>

        </div>

      </div>

      {/* Slogan Ribbon Bottom */}
      <div className="border-2 border-black bg-red-950 text-white p-3 mt-6 text-center font-black font-sans uppercase tracking-wider text-[11px] md:text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-center items-center gap-2">
        <span className="bg-red-700 text-white font-mono text-[9px] font-black px-1.5 py-0.5 animate-pulse shrink-0">
          {isAr ? 'مستقبل العاصمة' : 'CAPITAL IN RISK'}
        </span>
        <p className="m-0 select-text">
          {isAr 
            ? '⚠️ مستقبل العاصمة: مجهول؟ لمن ستؤول السيادة العقارية على وسط بيروت لـ 50 عاماً القادمة؟' 
            : '⚠️ CAPITAL FUTURE UNKNOWN: WHO WILL HOLD REAL ESTATE SOVEREIGNTY OVER BEIRUT FOR THE NEXT 50 YEARS?'}
        </p>
      </div>
    </div>
  );
};
