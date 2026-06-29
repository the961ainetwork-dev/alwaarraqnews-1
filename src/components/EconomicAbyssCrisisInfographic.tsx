import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, TrendingDown, Users, AlertCircle, Coins, Hammer, HelpCircle, ArrowUpRight, BarChart3, Calculator } from 'lucide-react';

interface EconomicAbyssCrisisInfographicProps {
  language: 'ar' | 'en';
}

export function EconomicAbyssCrisisInfographic({ language }: EconomicAbyssCrisisInfographicProps) {
  const isAr = language === 'ar';
  
  // Tab states
  const [activeTab, setActiveTab] = useState<'overview' | 'calculator' | 'sectors'>('overview');
  
  // Interactive variables
  const [foreignAid, setForeignAid] = useState<number>(1.5); // Billions $ (0-12)
  const [reformsScore, setReformsScore] = useState<number>(20); // Reforms progress 0-100 %

  // Dynamic calculations
  // Reforms boost actual aid efficiency and unlock matching IMF funds
  const reformMultiplier = 0.2 + (reformsScore / 100) * 0.8;
  const effectiveAid = Math.min(11, parseFloat((foreignAid * reformMultiplier).toFixed(2)));
  const fundingGap = Math.max(0, parseFloat((11.0 - effectiveAid).toFixed(2)));
  
  // Years to recover
  // Base is 30 years without aid/reforms. Reforms + aid can drop it to 4-5 years.
  const recoveryYears = Math.max(4, Math.round(35 - (reformsScore * 0.18) - (foreignAid * 1.5)));

  const getRecoveryVerdict = () => {
    if (reformsScore < 30 && foreignAid < 3) {
      return {
        textAr: 'هاوية مالية ممتدة ونكوص دائم',
        textEn: 'Prolonged Sovereign Abyss & Default',
        color: 'text-red-500 bg-red-950/25 border-red-800/40'
      };
    }
    if (reformsScore >= 70 && foreignAid >= 7) {
      return {
        textAr: 'تعافي مستدام ونمو تدريجي',
        textEn: 'Sustainable Sovereign Recovery',
        color: 'text-emerald-500 bg-emerald-950/25 border-emerald-800/40'
      };
    }
    return {
      textAr: 'عجز تمويلي مستمر واستقرار هش',
      textEn: 'Fragile Stability & Chronic Deficit',
      color: 'text-amber-500 bg-amber-950/25 border-amber-800/40'
    };
  };

  const verdict = getRecoveryVerdict();

  // Sector breakdown data
  const sectors = [
    { nameAr: 'إعادة بناء الجنوب وضواحي بيروت', nameEn: 'South & Beirut Reconstruction', cost: 4.8, percent: 34, color: 'bg-red-800' },
    { nameAr: 'دعم وإسكان النازحين واللاجئين', nameEn: 'Refugee Housing & Relief', cost: 3.2, percent: 23, color: 'bg-amber-600' },
    { nameAr: 'البنية التحتية والكهرباء والاتصالات', nameEn: 'Infrastructure & Telecom Utilities', cost: 3.5, percent: 25, color: 'bg-blue-600' },
    { nameAr: 'إنقاذ وهيكلة القطاع المصرفي المجمد', nameEn: 'Banking Capital & Liquidity Rescue', cost: 2.5, percent: 18, color: 'bg-zinc-600' }
  ];

  return (
    <div className="border-2 border-zinc-800 bg-zinc-950 p-4 md:p-6 text-white font-sans select-none" id="economic-abyss-crisis-infographic">
      
      {/* Top Banner & Tab Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-4 mb-4 gap-2">
        <div className="space-y-1">
          <span className="bg-red-950 text-red-200 border border-red-700 text-[8px] font-mono tracking-widest uppercase font-black px-2 py-0.5 inline-block">
            {isAr ? 'البيانات المالية والاقتصادية للـ الورّاق' : 'FINANCIAL & DAMAGE DATA SHEET'}
          </span>
          <h3 className="text-sm md:text-base font-display font-black text-white">
            {isAr ? 'المأساة الاقتصادية لعام ٢٠٢٦ والشرخ المالي' : 'The 2026 Economic Disaster & Financial Abyss'}
          </h3>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex bg-zinc-900 border border-zinc-800 p-0.5 rounded-none shrink-0 w-full sm:w-auto font-mono text-[10px]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'bg-white text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'المشهد بالأرقام' : 'The Wound in Figures'}
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'calculator' ? 'bg-white text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'حاسبة فجوة التعافي' : 'Recovery Gap Calculator'}
          </button>
          <button
            onClick={() => setActiveTab('sectors')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'sectors' ? 'bg-white text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'ميزانية إعادة الإعمار' : 'Reconstruction Ledger'}
          </button>
        </div>
      </div>

      <div className="min-h-[320px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Overview and Core Figures */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-right rtl:text-right ltr:text-left animate-fadeIn"
              style={{ direction: isAr ? 'rtl' : 'ltr' }}
            >
              <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl mb-2">
                {isAr 
                  ? 'رصد بكتلة الضرر المباشر والخسائر المادية المترتبة على الصراع العسكري الدامي لعام ٢٠٢٦ في لبنان، مقسمة وفقاً لقواعد البيانات الدولية وتقييم البنك الدولي.' 
                  : 'A visual summary of the material damage and macroeconomic hemorrhaging caused by the 2026 war in Lebanon, structured on international development datasets.'}
              </p>

              {/* Bento Grid Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Total Loss */}
                <div className="border border-zinc-800 bg-zinc-900/40 p-4 text-center">
                  <TrendingDown size={20} className="text-red-500 mx-auto mb-1 animate-pulse" />
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase">
                    {isAr ? 'إجمالي الأضرار والخسائر' : 'TOTAL LOSS & DAMAGE'}
                  </span>
                  <div className="text-xl md:text-2xl font-black font-display text-white mt-1">$14B</div>
                  <span className="text-[9px] text-zinc-400 block mt-1 leading-normal">
                    {isAr ? 'يعادل الناتج المحلي للبنان لعام كامل' : 'Equals Lebanons total annual GDP'}
                  </span>
                </div>

                {/* Reconstruction Cost */}
                <div className="border border-zinc-800 bg-zinc-900/40 p-4 text-center">
                  <Hammer size={20} className="text-amber-500 mx-auto mb-1" />
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase">
                    {isAr ? 'كلفة إعادة الإعمار' : 'RECONSTRUCTION NEED'}
                  </span>
                  <div className="text-xl md:text-2xl font-black font-display text-white mt-1">$11B</div>
                  <span className="text-[9px] text-zinc-400 block mt-1 leading-normal">
                    {isAr ? 'بنية تحتية ومباني الجنوب وبيروت' : 'Required physical rebuild capital'}
                  </span>
                </div>

                {/* Displaced People */}
                <div className="border border-zinc-800 bg-zinc-900/40 p-4 text-center">
                  <Users size={20} className="text-blue-500 mx-auto mb-1" />
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase">
                    {isAr ? 'النازحون قسراً' : 'FORCED DISPLACED'}
                  </span>
                  <div className="text-xl md:text-2xl font-black font-display text-white mt-1">1.2M</div>
                  <span className="text-[9px] text-zinc-400 block mt-1 leading-normal">
                    {isAr ? 'أكثر من ٢٠٪ من السكان نزحوا' : 'Over 20% of the entire population'}
                  </span>
                </div>

                {/* GDP Contraction */}
                <div className="border border-zinc-800 bg-zinc-900/40 p-4 text-center">
                  <Landmark size={20} className="text-zinc-400 mx-auto mb-1" />
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase">
                    {isAr ? 'انكماش الاقتصاد منذ ٢٠١٩' : 'GDP CONTRACTION (SINCE 19)'}
                  </span>
                  <div className="text-xl md:text-2xl font-black font-display text-red-400 mt-1">-40%</div>
                  <span className="text-[9px] text-zinc-400 block mt-1 leading-normal">
                    {isAr ? 'انهيار مالي يسبق الصراع الحالي' : 'Chronic banking paralysis before war'}
                  </span>
                </div>

              </div>

              {/* Suffer points list in two-column format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-zinc-900/30 border border-zinc-850">
                  <span className="text-amber-400 font-mono text-[10px] font-bold block mb-1">
                    {isAr ? '● الكابوس الإنساني والمعيشي:' : '● THE HUMAN NIGHTMARE:'}
                  </span>
                  <ul className="text-xxs text-zinc-300 space-y-1 font-sans leading-relaxed list-disc list-inside">
                    <li>{isAr ? '٧٩٪ من المواطنين يعيشون تحت خط الفقر الحاد.' : '79% of Lebanese citizens live below the deep poverty line.'}</li>
                    <li>{isAr ? '١٦٦ ألف طالب معطل عن التعليم بسبب تحول المدارس لملاجئ.' : '166,000+ students locked out of schools transformed into shelters.'}</li>
                    <li>{isAr ? '٧٨٪ من المزارعين بالجنوب عاجزون عن ري وحصاد أراضيهم.' : '78% of farmers completely blocked from harvesting or watering fields.'}</li>
                  </ul>
                </div>

                <div className="p-3 bg-zinc-900/30 border border-zinc-850">
                  <span className="text-blue-400 font-mono text-[10px] font-bold block mb-1">
                    {isAr ? '● الشلل المالي والمصرفي:' : '● THE BANKING PARALYSIS:'}
                  </span>
                  <ul className="text-xxs text-zinc-300 space-y-1 font-sans leading-relaxed list-disc list-inside">
                    <li>{isAr ? 'ودائع المواطنين محتجزة بالكامل في مصارف في غيبوبة ميتة.' : 'Sovereign customer deposits frozen in a comatose banking system.'}</li>
                    <li>{isAr ? 'إفلاس تام لخزينة الدولة وعزلة كاملة عن أسواق المال.' : 'Total treasury default with zero access to global capital bonds.'}</li>
                    <li>{isAr ? 'امتناع المانحين عن تقديم قروض بلا إقرار قانون الفجوة المالية.' : 'International donors freeze reconstruct funding until gap acts pass.'}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Dynamic Recovery Calculator */}
          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-right rtl:text-right ltr:text-left"
              style={{ direction: isAr ? 'rtl' : 'ltr' }}
            >
              <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl mb-2">
                {isAr 
                  ? 'حاسبة المحاكاة المالية التفاعلية: تحكم في تدفق المساعدات الخارجية المطلوبة، ونقاط الإصلاحات المصرفية (كإقرار هيكلة الودائع وقانون فجوة الائتمان)، لتقرأ مباشرة حجم الفجوة المتبقية والجدول الزمني للتعافي.' 
                  : 'Financial Simulation Calculator: Manipulate aid inflows and financial structural reform indices to monitor the calculated Reconstruction Gap and years required for recovery.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pt-2">
                
                {/* Sliders (5 cols) */}
                <div className="md:col-span-5 space-y-4 border-l border-zinc-850 pl-0 md:pl-4">
                  
                  {/* Slider 1: Foreign Aid */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">
                        {isAr ? 'تدفقات المساعدات والقروض الخارجية:' : 'Foreign Aid & Loans Inflow:'}
                      </span>
                      <span className="font-mono text-zinc-400 text-[11px]">${foreignAid}B</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="12" 
                      step="0.5"
                      value={foreignAid} 
                      onChange={(e) => setForeignAid(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <span className="text-[10px] text-zinc-500 block">
                      {isAr 
                        ? 'مجموع المنح الخليجية والأوروبية وقروض صندوق النقد الدولي.'
                        : 'Total international grants, GCC aids, and IMF financing packages.'}
                    </span>
                  </div>

                  {/* Slider 2: Reforms Score */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">
                        {isAr ? 'مؤشر تفعيل الإصلاحات الهيكلية والمصرفية:' : 'Banking & Structural Reforms index:'}
                      </span>
                      <span className="font-mono text-zinc-400 text-[11px]">{reformsScore}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={reformsScore} 
                      onChange={(e) => setReformsScore(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <span className="text-[10px] text-zinc-500 block">
                      {isAr 
                        ? 'مدى الالتزام بمحاربة الفساد، قانون هيكلة المصارف وإقرار الفجوة المالية.'
                        : 'Approval rate of the comatose banking balance sheet & capital gap acts.'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-zinc-900 flex items-center gap-1.5">
                    <Calculator size={14} className="text-zinc-500 shrink-0" />
                    <span className="text-[9px] font-mono text-zinc-400">
                      {isAr ? 'الافتراض المالي: كلفة الإعمار الأساسية = ١١ مليار دولار' : 'Baseline: Base required Reconstruction = $11.0 Billion'}
                    </span>
                  </div>

                </div>

                {/* Outcome panel (7 cols) */}
                <div className="md:col-span-7 bg-zinc-900/35 p-4 flex flex-col justify-between border border-zinc-850">
                  <div className="space-y-4">
                    <h4 className="font-mono text-[9px] text-zinc-400 uppercase font-black tracking-widest block mb-2">
                      {isAr ? '✦ تحديث فوري للمؤشر المالي للتعافي:' : '✦ LIVE MACROECONOMIC IMPACT REPORT:'}
                    </h4>

                    {/* Calculated Funding Gap */}
                    <div className="grid grid-cols-2 gap-4 pb-2 border-b border-zinc-900">
                      <div>
                        <span className="text-zinc-500 text-[10px] block font-mono">
                          {isAr ? 'الفجوة التمويلية المتبقية:' : 'RECONSTRUCTION GAP:'}
                        </span>
                        <div className="text-xl md:text-2xl font-black font-display text-red-500 mt-0.5">
                          ${fundingGap} Billion
                        </div>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] block font-mono">
                          {isAr ? 'زمن التعافي المقدر:' : 'RECOVERY TIMELINE:'}
                        </span>
                        <div className="text-xl md:text-2xl font-black font-display text-amber-500 mt-0.5">
                          {recoveryYears} {isAr ? 'سنة' : 'Years'}
                        </div>
                      </div>
                    </div>

                    {/* Verdict Box */}
                    <div className="space-y-1">
                      <span className="text-zinc-400 text-xxs font-mono block">
                        {isAr ? 'تقدير الأفق الاقتصادي والائتماني:' : 'SOVEREIGN RECOVERY OUTLOOK VERDICT:'}
                      </span>
                      <div className={`p-2.5 border text-xs font-bold font-sans uppercase tracking-wide text-center ${verdict.color}`}>
                        {isAr ? verdict.textAr : verdict.textEn}
                      </div>
                    </div>

                  </div>

                  {/* Narrative paragraph based on state */}
                  <div className="mt-3 p-3 bg-zinc-950 border border-zinc-850 rounded-none text-xxs font-mono text-zinc-400">
                    <span className="text-zinc-200 uppercase font-black block mb-1">
                      {isAr ? '❖ تقييم خبير الورّاق للوضع المالي:' : '❖ BANKING CONSULTANT SUMMARY STATEMENT:'}
                    </span>
                    <p className="leading-relaxed">
                      {isAr 
                        ? `عند تدفق مساعدات قدره ${foreignAid} مليار دولار وإصلاحات بنسبة ${reformsScore}%، يدخل لبنان في نفق تمويلي معقد. ${reformsScore < 40 ? 'إن غياب الإصلاحات يجعل المانحين يحجبون الأموال، مما يحبس البلد في مأساة مدتها عقود.' : 'تفعيل الإصلاحات المالية يقلل زمن التدمير بشكل جوهري ويفتح نوافذ الائتمان.'}`
                        : `At $${foreignAid}B aid inflow and a ${reformsScore}% reform completion score, Lebanons sovereign path remains complicated. ${reformsScore < 40 ? 'Donors withhold cash in the absence of financial laws, locking the country in decades of chronic regression.' : 'Executing banking reforms and auditing the ledger lowers the reconstruction duration and reactivates financial assets.'}`}
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: Sectors Reconstruction Ledger */}
          {activeTab === 'sectors' && (
            <motion.div
              key="sectors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-right rtl:text-right ltr:text-left"
              style={{ direction: isAr ? 'rtl' : 'ltr' }}
            >
              <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl mb-2">
                {isAr 
                  ? 'رسم تخطيطي تفاعلي يوزع مبلغ الـ ١١ مليار دولار المطلوبة على القطاعات التنموية والصناعية اللبنانية، مما يوضح حجم العجز الفظيع.' 
                  : 'An interactive structural breakdown detailing how the requested $11.0 Billion Reconstruction Capital is allotted across Lebanons primary crippled sectors.'}
              </p>

              {/* Custom SVG/Bar Sector Ledger */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase">
                  {isAr ? '✦ بنود ميزانية إعادة الإعمار العاجلة:' : '✦ EMERGENCY RECONSTRUCTION BUDGET LEDGER:'}
                </h4>

                <div className="space-y-3.5">
                  {sectors.map((s, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-zinc-200">
                          {isAr ? s.nameAr : s.nameEn}
                        </span>
                        <div className="font-mono text-xxs space-x-1.5 space-x-reverse">
                          <span className="font-bold text-white">${s.cost}B</span>
                          <span className="text-zinc-500">({s.percent}%)</span>
                        </div>
                      </div>
                      
                      {/* Bar indicator */}
                      <div className="w-full bg-zinc-900 h-2 rounded-none overflow-hidden relative border border-zinc-850">
                        <div 
                          className={`h-full ${s.color}`}
                          style={{ width: `${s.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-red-950/20 border border-red-900/30 flex items-start gap-2 text-xxs text-zinc-300 font-mono mt-4">
                  <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {isAr 
                      ? 'تحذير سيادي: هذه البنود تمثل كلفة إعادة البناء الهيكلي فقط، ولا تتضمن تكاليف إزالة الركام وإخماد الحرائق النفطية ومصادرة الأملاك وتطهير الألغام والمقذوفات غير المنفجرة.' 
                      : 'Note: These metrics capture pure baseline material cost. They completely exclude secondary costs of clearing rubble, clearing land mines, or resolving ownership claims on destroyed plots.'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
