import React, { useState } from 'react';
import { 
  Fuel, 
  TrendingUp, 
  Anchor, 
  AlertTriangle, 
  Calendar, 
  DollarSign, 
  Activity, 
  FileText, 
  Coins, 
  Scale, 
  Layers, 
  ChevronRight, 
  Clock, 
  Shield 
} from 'lucide-react';

interface FuelProfiteeringInfographicProps {
  language: 'ar' | 'en';
}

export const FuelProfiteeringInfographic: React.FC<FuelProfiteeringInfographicProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'breakdown' | 'detachment' | 'hawk' | 'cascade'>('breakdown');
  const [selectedCostComponent, setSelectedCostComponent] = useState<number | null>(null);
  const [hoveredCostComponent, setHoveredCostComponent] = useState<number | null>(null);
  const [activeHawkStep, setActiveHawkStep] = useState<number>(0);
  
  // Cost Component Data (July 2026 price of 2,220,000 LBP = ~$22.70 USD)
  const costComponents = [
    {
      id: 1,
      titleAr: 'التكلفة الأساسية (بلاتس البحر المتوسط)',
      titleEn: "Plat's Mediterranean Base Cost",
      valueLbp: 1120000,
      valueUsd: 11.45,
      percentage: 50.5,
      color: 'bg-zinc-700',
      hoverColor: 'hover:bg-zinc-800',
      icon: Fuel,
      descAr: 'التكلفة الفعلية للوقود المكرر بناءً على مؤشرات التكرير الإقليمية في حوض البحر الأبيض المتوسط، وليس استخراج النفط الخام العالمي.',
      descEn: 'The actual wholesale cost of refined product, which tracks regional Mediterranean refinery outputs rather than global crude extraction.'
    },
    {
      id: 2,
      titleAr: 'رسوم وضرائب الدولة (الزيادة التراكمية)',
      titleEn: 'State Excise Duties & VAT',
      valueLbp: 560000,
      valueUsd: 5.73,
      percentage: 25.2,
      color: 'bg-red-800',
      hoverColor: 'hover:bg-red-900',
      icon: Scale,
      descAr: 'تشمل ضريبة القيمة المضافة التي رُفعت إلى 12% في فبراير 2026 والضريبة المقطوعة الفورية البالغة 361,000 ليرة على كل 20 لتراً من البنزين (المستثنى منها المازوت لعصب المولدات). ضريبة القيمة المضافة تُحتسب تراكمياً فوق السعر والعمولات.',
      descEn: 'Driven by the February 2026 emergency budget package to fund civil service payrolls: VAT was hiked to 12% and a flat 361,000 LBP excise duty was added to gasoline (diesel was exempted to preserve neighborhood generators).'
    },
    {
      id: 3,
      titleAr: 'العلاوة والمصاريف اللوجستية (الشحن والتأمين)',
      titleEn: 'Premium & Maritime Logistics',
      valueLbp: 300000,
      valueUsd: 3.07,
      percentage: 13.5,
      color: 'bg-amber-700',
      hoverColor: 'hover:bg-amber-800',
      icon: Anchor,
      descAr: 'تكاليف الشحن عبر البحر الأبيض المتوسط، وتأمين الشحنات البحرية، ومصاريف التفريغ، المخزنة والمضخمة تحت غطاء مخاطر الحرب الإقليمية والاضطرابات الملاحية.',
      descEn: 'The physical freight cost of ocean shipping and high war-risk insurance premiums required to navigate the Eastern Mediterranean into Lebanese ports.'
    },
    {
      id: 4,
      titleAr: 'هوامش كارتل التوزيع ومحطات الوقود',
      titleEn: 'Distribution & Station Margins',
      valueLbp: 240000,
      valueUsd: 2.45,
      percentage: 10.8,
      color: 'bg-yellow-600',
      hoverColor: 'hover:bg-yellow-700',
      icon: Coins,
      descAr: 'عمولات وهوامش ربح ثابتة ومدولرة قانوناً بموجب جداول وزارة الطاقة، توزع بين تجمع كارتل المستوردين (APIC)، وصهاريج النقل البري، وأصحاب محطات المحروقات.',
      descEn: 'Fresh-dollarized margins legally locked by the Ministry of Energy tariff. This commission is split among the APIC import cartel, transport trucks, and retail station operators.'
    }
  ];

  // Historical price detachment data
  const historicalDetachment = [
    {
      eraAr: 'متوسط الفترة ١٩٩٤ – ٢٠٠٤',
      eraEn: '1994 – 2004 Average',
      crudePrice: '$20 – $40',
      pumpPriceUsd: 13.50,
      pumpPriceAr: '١٣.٥٠ دولار',
      ratio: '34%',
      barWidth: 'w-1/3',
      notesAr: 'علاقة توازنية طبيعية؛ ضرائب معتدلة، وهوامش استيراد تنافسية.',
      notesEn: 'Natural equilibrium; moderate consumption taxes, competitive margins.'
    },
    {
      eraAr: 'طفرات النفط التاريخية (٢٠٠٨ و٢٠١٤)',
      eraEn: 'Historic Oil Spikes (2008 & 2014)',
      crudePrice: '+$100',
      pumpPriceUsd: 16.00,
      pumpPriceAr: '١٦.٠٠ دولار',
      ratio: '16%',
      barWidth: 'w-2/5',
      notesAr: 'على الرغم من تجاوز البرميل عتبة الـ 100$، استقرت الصفيحة عند 16$ بسبب التثبيت النقدي وامتصاص الصدمات.',
      notesEn: 'Even with Brent crude trading above $100/bbl, state subsidies capped the canister at $16 USD.'
    },
    {
      eraAr: 'واقع شهر تموز ٢٠٢٦ الحالي',
      eraEn: 'July 2026 Current Reality',
      crudePrice: '~$71',
      pumpPriceUsd: 22.70,
      pumpPriceAr: '٢٢.٧٠ دولار',
      ratio: '32%',
      barWidth: 'w-3/5',
      isCurrent: true,
      notesAr: 'انفصال هيكلي تام! انخفض برنت إلى 71$ لكن الصفيحة سجلت 22.7$ (2,220,000 ل.ل) نتيجة حزم تمويل رواتب القطاع العام الصارمة.',
      notesEn: 'Structural decoupling: global oil drops near $71 but local canister shoots to $22.70 due to aggressive state tax extraction.'
    }
  ];

  // Hawk III Russian Evasion Scheme Steps
  const hawkSteps = [
    {
      step: '01',
      titleAr: 'شراء النفط الروسي المعاقب',
      titleEn: 'Acquisition of Sanctioned Oil',
      shortAr: 'المنشأ المحظور',
      shortEn: 'Sanctioned Origin',
      descAr: 'قام وسطاء وشركات دولية (مثل Sahara Energy وGalileo Trading) بشراء حوالي 36,000 طن من الفيول أويل الروسي الخاضع للعقوبات الغربية بأسعار مخفضة جداً تفوق خصومات السوق العادية.',
      descEn: 'International trading firms bought roughly 36,000 metric tons of refined Russian fuel oil at deep sub-market discounts, bypassing G7 and Western price ceilings.'
    },
    {
      step: '02',
      titleAr: 'تزوير المنشأ واللوجستيات',
      titleEn: 'Maritime Forgery Loop',
      shortAr: 'تزييف المنشأ',
      shortEn: 'Document Forgery',
      descAr: 'تم تزوير بيانات الشحن البحري، وجداول الشحنات، وشهادات المنشأ الخاصة بالسفينة "Hawk III" لإخفاء هوية النفط الحقيقية وتسويقه على أنه وقود ذو منشأ تركي أو مصري مسموح.',
      descEn: "Shipping manifests, custom declarations, and certificates of origin for the vessel 'Hawk III' were falsified to mask Russian origin under Turkish or Egyptian papers."
    },
    {
      step: '03',
      titleAr: 'الفوترة المضخمة ونهب الخزينة',
      titleEn: 'Inflated Invoicing',
      shortAr: 'فارق ٧ مليون دولار',
      shortEn: '$7M Fraud Premium',
      descAr: 'بيعت الشحنة المغشوشة لمؤسسة كهرباء لبنان (EDL). تمت فوترة الخزينة اللبنانية بقيمة 18 مليون دولار، وهو أعلى بـ 7 ملايين دولار من القيمة الفعلية للشحنة، مقتطعةً السيولة الشحيحة.',
      descEn: 'The cargo was delivered to Electricité du Liban (EDL). The Lebanese state was billed $18 million—exceeding the cargo’s true market value by roughly $7 million in illicit premiums.'
    },
    {
      step: '04',
      titleAr: 'الاتهام والملاحقة الجنائية',
      titleEn: 'Criminal Prosecutions',
      shortAr: 'توقيفات وملاحقات',
      shortEn: 'Arrest Warrants',
      descAr: 'في أكتوبر 2025، وجهت النيابة العامة المالية اللبنانية اتهامات جنائية وأصدرت مذكرات توقيف بتهم التزوير والإثراء غير المشروع ضد مديري شركات ومسؤولي طاقة متواطئين.',
      descEn: "In October 2025, Lebanon's Financial Public Prosecution issued indictments and arrest warrants for forgery and money laundering against oil executives and local energy accomplices."
    }
  ];

  // 2026 Price Cascade Timeline
  const cascadeTimeline = [
    {
      dateAr: '١٧ فبراير ٢٠٢٦',
      dateEn: 'Feb 17, 2026',
      titleAr: 'الزيادة الضريبية الكبرى',
      titleEn: 'Emergency Surcharges',
      descAr: 'مجلس الوزراء يرفع الضريبة على القيمة المضافة لـ 12% ويفرض 361,000 ليرة ضريبة مقطوعة على البنزين لتمويل القطاع العام. يرتفع سعر الصفيحة فوراً إلى 1,785,000 ليرة.',
      descEn: 'Cabinet approves emergency fiscal bill: VAT raised to 12% and flat 361,000 LBP surcharge levied on gasoline. Canister price instantly rises to 1,785,000 LBP.'
    },
    {
      dateAr: 'مارس ٢٠٢٦',
      dateEn: 'March 2026',
      titleAr: 'قفزة تعرفة السرفيس',
      titleEn: 'Transit Fare Surges',
      descAr: 'عدم قدرة السائقين على تحمل تكاليف الوقود يرفع تعرفة سيارة الأجرة المشتركة "السرفيس" إلى 400,000 ليرة للراكب الواحد. قطاع النقل يلوّح بشلل شامل وعصيان.',
      descEn: 'Shared taxi (Servees) fares jump to 400,000 LBP per ride as drivers pass on the tax burden. Transit unions warn of imminent systemic collapse.'
    },
    {
      dateAr: 'ربيع وصيف ٢٠٢٦',
      dateEn: 'Spring/Summer 2026',
      titleAr: 'معركة الدعم المعطلة',
      titleEn: 'The Subsidy Gridlock',
      descAr: 'السائقون يضغطون لطلب دعم شهري بـ 12 مليون ليرة للتعويض. الحكومة العاجزة والمشغولة بنزوح الحرب تؤجل وتماطل، تاركة المواطن يواجه تضخماً دائماً.',
      descEn: 'Syndicates demand 12M LBP monthly fuel subsidy. Cash-strapped state, managing wartime logistics and high displacements, delays execution, trapping citizens in inflation.'
    },
    {
      dateAr: 'يوليو ٢٠٢٦',
      dateEn: 'July 2026',
      titleAr: 'استقرار في مستويات مرتفعة',
      titleEn: 'Sustained High Pricing',
      descAr: 'رغم انخفاض نفط برنت العالمي بأكثر من 2% ملامساً 71$، يستقر السعر المحلي للبنزين عند 2,220,000 ليرة، مما يعني ترسيخ الضرائب كعبء هيكلي أبدي.',
      descEn: 'Despite global Brent crude dropping below $71, local retail gasoline stabilizes at its absolute peak of 2,220,000 LBP, embedding fuel taxation permanently into cost of living.'
    }
  ];

  const activeComponent = costComponents.find(c => c.id === selectedCostComponent) || costComponents.find(c => c.id === hoveredCostComponent) || null;

  return (
    <div className="bg-[#FAF8F5] text-zinc-900 border border-zinc-300 p-4 md:p-6 my-4 font-serif text-right rtl:text-right ltr:text-left select-none shadow-sm" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      
      {/* Visual Header */}
      <div className="border-b-2 border-zinc-800 pb-3 mb-6">
        <div className="flex justify-between items-center text-[10px] font-mono font-black text-amber-950 uppercase tracking-widest">
          <span>{isAr ? 'الملف الحادي عشر: المحروقات وكارتل APIC' : 'DOSSIER XI: PETROLEUM INTELLIGENCE'}</span>
          <span>{isAr ? 'تشريح تفاعلي معزز' : 'INTERACTIVE ENERGY LEDGER'}</span>
        </div>
        <h3 className="text-lg md:text-xl font-sans font-black tracking-tight text-zinc-950 mt-1">
          {isAr ? '❖ المرصد المالي التفاعلي: تشريح صفيحة المحروقات وسلاسل التوريد (٢٠٢٥-٢٠٢٦)' : '❖ Interactive Energy Observatory: Canister Breakdown & Shipping Autopsy'}
        </h3>
        <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
          {isAr 
            ? 'لوحة تفاعلية مخصصة لتفكيك صفيحة البنزين بقيمة ٢,٢٢٠,٠٠٠ ليرة، وفهم فجوة الضرائب المقطوعة، وسلسلة تهرب سفينة Hawk III من العقوبات الدولية.' 
            : 'Classified visual utility breaking down the 2,220,000 LBP gasoline canister, the state wage-funding taxes, and the Hawk III G7-cap evasion loop.'}
        </p>
      </div>

      {/* TABS SELECTOR */}
      <div className="flex flex-wrap gap-1 border-b border-zinc-300 pb-2 mb-6 text-xs font-mono font-bold select-none">
        <button
          onClick={() => setActiveTab('breakdown')}
          className={`px-3 py-2 border cursor-pointer transition-colors ${
            activeTab === 'breakdown'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white hover:bg-stone-100 text-zinc-600 border-zinc-300'
          }`}
        >
          {isAr ? '١. تشريح صفيحة الـ ٢.٢٢ مليون ل.ل' : '1. Canister Cost Autopsy'}
        </button>
        <button
          onClick={() => setActiveTab('detachment')}
          className={`px-3 py-2 border cursor-pointer transition-colors ${
            activeTab === 'detachment'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white hover:bg-stone-100 text-zinc-600 border-zinc-300'
          }`}
        >
          {isAr ? '٢. الانفصال عن النفط العالمي' : '2. Global Oil Detachment'}
        </button>
        <button
          onClick={() => setActiveTab('hawk')}
          className={`px-3 py-2 border cursor-pointer transition-colors ${
            activeTab === 'hawk'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white hover:bg-stone-100 text-zinc-600 border-zinc-300'
          }`}
        >
          {isAr ? '٣. مخطط تهريب النفط الروسي' : '3. Hawk III Sanctions Loop'}
        </button>
        <button
          onClick={() => setActiveTab('cascade')}
          className={`px-3 py-2 border cursor-pointer transition-colors ${
            activeTab === 'cascade'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white hover:bg-stone-100 text-zinc-600 border-zinc-300'
          }`}
        >
          {isAr ? '٤. تضخم النقل التراكمي' : '4. 2026 Price Cascade'}
        </button>
      </div>

      {/* TAB CONTENT: BREAKDOWN */}
      {activeTab === 'breakdown' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          
          {/* Chart visual representation */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="font-sans font-black text-xs text-amber-950 uppercase tracking-wider border-b border-zinc-200 pb-1.5">
              {isAr ? 'هيكل الصفيحة عيار 95 أوكتان (20 لتر) - ٢,٢٢٠,٠٠٠ ل.ل' : 'Canister Price Architecture (20L) - 2,220,000 LBP'}
            </h4>
            
            <p className="text-xxs text-zinc-500 italic leading-relaxed">
              {isAr 
                ? '✦ انقر على أو مرر الماوس فوق أي جزء من شريط النسبة المئوية أدناه للاطلاع على التفاصيل الاستقصائية والهيكل القانوني للهامش:' 
                : '✦ Click or hover over any segment of the stacked visual bar below to inspect the legal margin rules and state tax extraction rates:'}
            </p>

            {/* Stacked Percentage Bar */}
            <div className="h-10 w-full flex border border-zinc-400 overflow-hidden shadow-inner cursor-pointer rounded">
              {costComponents.map((comp) => {
                const isSelected = selectedCostComponent === comp.id;
                const isHovered = hoveredCostComponent === comp.id;
                return (
                  <div
                    key={comp.id}
                    onMouseEnter={() => setHoveredCostComponent(comp.id)}
                    onMouseLeave={() => setHoveredCostComponent(null)}
                    onClick={() => setSelectedCostComponent(comp.id === selectedCostComponent ? null : comp.id)}
                    className={`${comp.color} h-full transition-all duration-150 relative flex items-center justify-center text-white font-mono text-[10px] font-bold ${comp.hoverColor} ${
                      isSelected || isHovered ? 'ring-2 ring-zinc-950 ring-inset scale-y-105' : 'opacity-95'
                    }`}
                    style={{ width: `${comp.percentage}%` }}
                    title={isAr ? comp.titleAr : comp.titleEn}
                  >
                    <span>{comp.percentage}%</span>
                  </div>
                );
              })}
            </div>

            {/* Micro component labels list */}
            <div className="space-y-2.5 pt-2">
              {costComponents.map((comp) => {
                const isSelected = selectedCostComponent === comp.id;
                const isHovered = hoveredCostComponent === comp.id;
                return (
                  <button
                    key={comp.id}
                    onMouseEnter={() => setHoveredCostComponent(comp.id)}
                    onMouseLeave={() => setHoveredCostComponent(null)}
                    onClick={() => setSelectedCostComponent(comp.id === selectedCostComponent ? null : comp.id)}
                    className={`w-full text-right rtl:text-right ltr:text-left p-2.5 border transition-all flex items-center justify-between rounded ${
                      isSelected || isHovered 
                        ? 'bg-stone-100/80 border-zinc-800 shadow-sm' 
                        : 'bg-white border-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${comp.color} rounded-sm shrink-0`}></div>
                      <comp.icon size={14} className="text-zinc-600 shrink-0" />
                      <span className="font-sans font-bold text-xs text-zinc-800">
                        {isAr ? comp.titleAr : comp.titleEn}
                      </span>
                    </div>
                    <div className="font-mono text-xs font-bold shrink-0">
                      <span className="text-zinc-500 mr-1">({comp.percentage}%)</span>
                      <span className="text-red-900">{comp.valueLbp.toLocaleString()} ل.ل</span>
                      <span className="text-zinc-400 mx-1">|</span>
                      <span className="text-emerald-700">${comp.valueUsd.toFixed(2)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive details display panel */}
          <div className="lg:col-span-6 bg-stone-50 border border-zinc-200 p-4 flex flex-col justify-between">
            {activeComponent ? (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-zinc-300 pb-2">
                  <span className="bg-zinc-900 text-amber-50 text-[9px] font-mono font-black px-2 py-0.5 uppercase tracking-wider">
                    {isAr ? 'عنصر التكلفة النشط' : 'ACTIVE EXCISE ANALYSIS'}
                  </span>
                  <span className="font-mono text-xs font-bold text-zinc-600">
                    AW-REF-COMP-0{activeComponent.id}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className={`p-2 ${activeComponent.color} text-white rounded shrink-0`}>
                    <activeComponent.icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-black text-sm text-zinc-900">
                      {isAr ? activeComponent.titleAr : activeComponent.titleEn}
                    </h4>
                    <p className="font-mono text-xs font-bold text-red-900 mt-0.5">
                      {isAr ? 'القيمة المقدرة:' : 'Calculated Share:'} {activeComponent.valueLbp.toLocaleString()} {isAr ? 'ليرة لبنانية' : 'LBP'} (${activeComponent.valueUsd.toFixed(2)} USD)
                    </p>
                  </div>
                </div>

                <div className="border-t border-dashed border-zinc-200 pt-3">
                  <p className="text-xs text-zinc-700 font-serif leading-relaxed">
                    {isAr ? activeComponent.descAr : activeComponent.descEn}
                  </p>
                </div>

                {activeComponent.id === 2 && (
                  <div className="bg-red-50/50 p-2.5 border border-red-200 text-xxs text-red-950 font-sans leading-relaxed space-y-1.5 rounded">
                    <span className="font-black block uppercase text-red-800">⚠️ {isAr ? 'عقدة الضرائب الهندسية:' : 'FISCAL SYSTEM HIGHLIGHT:'}</span>
                    <p>
                      {isAr 
                        ? 'الضريبة المقطوعة البالغة ٣٦١,٠٠٠ ليرة المضافة في فبراير ٢٠٢٦ خضعت لضريبة القيمة المضافة الإضافية البالغة ١٢٪ لتصبح قيمتها المقتطعة الإجمالية أعلى، مما يجعل السعر اللبناني مفصولاً كلياً عن العرض العالمي وعاجزاً عن التعديل التنازلي التلقائي.' 
                        : 'The 361,000 LBP surcharge introduced in Feb 2026 is taxed with a cumulative 12% VAT, inflating the consumer retail baseline. This turns gasoline into a pure revenue collection node for public civil compensation.'}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400 border border-dashed border-zinc-300 bg-white">
                <FileText size={32} className="stroke-1 mb-2 text-zinc-300" />
                <h4 className="font-sans font-bold text-xs text-zinc-700 mb-1">
                  {isAr ? 'انقر أو مرر الماوس للتشريح' : 'Select Component to Inspect'}
                </h4>
                <p className="text-xxs max-w-xs leading-relaxed">
                  {isAr 
                    ? 'الرجاء اختيار أي عنصر من هيكل صفيحة البنزين لعرض التحليل القانوني والهندسة الضريبية الممنوحة لكارتل الاستيراد.' 
                    : 'Select any part of the 2,220,000 LBP cost chain to unlock legal definitions and import oligarchy parameters.'}
                </p>
              </div>
            )}

            <div className="border-t border-zinc-200 pt-3 mt-4 text-[10px] font-mono text-zinc-400 text-center select-none">
              {isAr ? 'بموجب جدول تركيب الأسعار الرسمي الصادر في يوليو ٢٠٢٦' : 'Based on official July 2026 Ministry of Energy (MoEW) Tariff Matrices'}
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: DETACHMENT */}
      {activeTab === 'detachment' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white p-4 border border-zinc-200">
            <h4 className="font-sans font-black text-xs text-amber-950 uppercase tracking-wider border-b border-zinc-200 pb-2 mb-3">
              {isAr ? 'الانفصال التاريخي: النفط الخام العالمي مقابل أسعار المحطات اللبنانية' : 'Historical Decoupling: Global Brent Crude vs. Beirut Pump Prices'}
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed font-serif mb-4">
              {isAr 
                ? 'توضح المقارنة أدناه كيف خرجت صفيحة البنزين في لبنان عن منطق السوق الحر. فعندما كان النفط العالمي عند ذروته التاريخية فوق ١٠٠$ للبرميل، كانت الصفيحة تباع بحدود ١٧$. اليوم، ومع بقاء خام برنت معتدلاً عند ٧١$، تلامس الصفيحة ٢٣$ بسبب الإتاوات الضريبية المرتفعة لتمويل موازنة عام ٢٠٢٦.'
                : 'The comparison below proves the structural detachment of retail gasoline from global trends. When Brent peaked above $100/bbl, canisters were capped at $17. Today, with Brent flat around $71/bbl, the Lebanese canister approaches $23 USD due to aggressive sovereign tax extraction for state salary outlays.'}
            </p>

            {/* Historical list & visual bars */}
            <div className="space-y-4">
              {historicalDetachment.map((item, idx) => (
                <div key={idx} className={`p-3 border rounded ${item.isCurrent ? 'bg-amber-50/50 border-amber-300' : 'bg-stone-50 border-zinc-200'}`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                    <span className="font-sans font-bold text-xs text-zinc-900">
                      {isAr ? item.eraAr : item.eraEn}
                    </span>
                    <div className="font-mono text-xxs font-bold flex gap-3 text-zinc-500">
                      <span>{isAr ? 'سعر برنت:' : 'Brent Crude:'} <strong className="text-zinc-800">{item.crudePrice}</strong></span>
                      <span className="text-red-900">{isAr ? 'سعر الصفيحة:' : 'Canister Price:'} <strong>{isAr ? item.pumpPriceAr : `$${item.pumpPriceUsd.toFixed(2)}`}</strong></span>
                    </div>
                  </div>

                  {/* Relative Visual bar representing retail cost in USD */}
                  <div className="w-full bg-zinc-200 h-2.5 rounded-sm overflow-hidden border border-zinc-300">
                    <div className={`h-full ${item.isCurrent ? 'bg-red-800' : 'bg-zinc-600'}`} style={{ width: `${(item.pumpPriceUsd / 25) * 100}%` }}></div>
                  </div>

                  <p className="text-xxs text-zinc-500 font-serif leading-relaxed mt-2 italic">
                    {isAr ? item.notesAr : item.notesEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: HAWK III SANCTIONS LOOP */}
      {activeTab === 'hawk' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          
          {/* Step list - Left column */}
          <div className="lg:col-span-5 space-y-2">
            <h4 className="font-sans font-black text-xs text-amber-950 uppercase tracking-wider border-b border-zinc-200 pb-2 mb-3">
              {isAr ? 'مراحل الالتفاف والتهريب على سفينة Hawk III' : 'Hawk III Sanctions Evasion Stages'}
            </h4>

            {hawkSteps.map((step, idx) => {
              const isActive = activeHawkStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveHawkStep(idx)}
                  className={`w-full text-right rtl:text-right ltr:text-left p-2.5 border transition-all flex items-start gap-2.5 rounded cursor-pointer ${
                    isActive 
                      ? 'bg-[#d97706]/10 border-[#d97706] shadow-sm' 
                      : 'bg-white border-zinc-200 hover:bg-stone-50'
                  }`}
                >
                  <span className={`font-mono text-xs font-black p-1 shrink-0 ${isActive ? 'text-[#d97706]' : 'text-zinc-400'}`}>
                    {step.step}
                  </span>
                  <div>
                    <h5 className="font-sans font-bold text-xs text-zinc-800">
                      {isAr ? step.titleAr : step.titleEn}
                    </h5>
                    <span className="font-mono text-[9px] text-[#b91c1c] font-bold block mt-0.5">
                      {isAr ? step.shortAr : step.shortEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Graphical diagram representing the step - Right column */}
          <div className="lg:col-span-7 bg-zinc-950 text-white p-4 border border-zinc-800 flex flex-col justify-between rounded min-h-[300px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="bg-red-800 text-white text-[8px] font-mono font-black px-2 py-0.5 uppercase tracking-widest flex items-center gap-1">
                  <Anchor size={10} />
                  {isAr ? 'مخطط التهرب والملاحقة' : 'SANCTIONS EVASION MAP'}
                </span>
                <span className="font-mono text-[10px] text-zinc-400">
                  AW-HAWK-STAGE-0{activeHawkStep + 1}
                </span>
              </div>

              {/* Interactive Visual Schematic diagram */}
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded text-center relative overflow-hidden flex flex-col justify-center items-center py-6">
                <div className="absolute top-2 left-2 flex items-center gap-1 opacity-20 font-mono text-[8px]">
                  <span>LAT: 34.4234 // LON: 35.8012</span>
                </div>
                
                {/* Visual state illustration */}
                {activeHawkStep === 0 && (
                  <div className="space-y-2 animate-fadeIn">
                    <Fuel size={40} className="text-[#d97706] mx-auto animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">RU PORT ➔ TANKER ACQUISITION</span>
                    <h4 className="font-sans font-black text-sm text-white">{isAr ? 'النفط الروسي المعفي من السقف' : 'Russian Discounted Fuel'}</h4>
                  </div>
                )}
                {activeHawkStep === 1 && (
                  <div className="space-y-2 animate-fadeIn">
                    <FileText size={40} className="text-blue-400 mx-auto animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">FORGED CARGO CERTIFICATE</span>
                    <h4 className="font-sans font-black text-sm text-white">{isAr ? 'شهادات مزورة (تركيا/مصر)' : 'Forged Papers (Turkish/Egyptian)'}</h4>
                  </div>
                )}
                {activeHawkStep === 2 && (
                  <div className="space-y-2 animate-fadeIn">
                    <DollarSign size={40} className="text-emerald-500 mx-auto animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">EDL OVERBILLING SCHEME</span>
                    <h4 className="font-sans font-black text-sm text-white">{isAr ? 'فوترة بقيمة ١٨ مليون دولار' : 'Invoiced at $18,000,000 USD'}</h4>
                  </div>
                )}
                {activeHawkStep === 3 && (
                  <div className="space-y-2 animate-fadeIn">
                    <Shield size={40} className="text-red-500 mx-auto animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">JUDICIAL WAR OFFICE WARRANT</span>
                    <h4 className="font-sans font-black text-sm text-white">{isAr ? 'مذكرات توقيف النيابة المالية' : 'Financial Crime Indictments'}</h4>
                  </div>
                )}
              </div>

              {/* Detailed description text */}
              <div className="pt-2">
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {isAr ? hawkSteps[activeHawkStep].descAr : hawkSteps[activeHawkStep].descEn}
                </p>
              </div>
            </div>

            <div className="bg-zinc-900 p-2 border border-zinc-800 text-[10px] font-sans text-amber-300/80 leading-relaxed flex items-center gap-2 mt-4 rounded">
              <AlertTriangle size={14} className="shrink-0 text-amber-400" />
              <span>
                {isAr 
                  ? 'رصد محققو النيابة العامة المالية لبنان عاجزاً عن استرداد الفارق وقام بدفع المبالغ كاملة بالدولار الفريش دون تدقيق مالي.' 
                  : 'Financial investigators estimated that this single vessel cost the Lebanese treasury $7M USD in fraudulent markups.'}
              </span>
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: 2026 PRICE CASCADE TIMELINE */}
      {activeTab === 'cascade' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white p-4 border border-zinc-200">
            <h4 className="font-sans font-black text-xs text-amber-950 uppercase tracking-wider border-b border-zinc-200 pb-2 mb-4">
              {isAr ? 'مسار الزيادات وتضخم النقل التراكمي لعام ٢٠٢٦' : '2026 Price Cascade & Transit Fare Timelines'}
            </h4>

            {/* Vertical timeline layout */}
            <div className="relative border-r border-dashed border-zinc-300 rtl:border-r ltr:border-l rtl:border-l-0 ltr:border-r-0 space-y-6 pr-5 ltr:pl-5 select-none">
              {cascadeTimeline.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Point node */}
                  <div className="absolute top-1.5 -right-[24px] ltr:-left-[24px] w-4 h-4 rounded-full bg-zinc-900 border-4 border-[#FAF8F5] flex items-center justify-center"></div>
                  
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-red-900 font-extrabold bg-red-50 px-2 py-0.5 inline-block">
                      {isAr ? item.dateAr : item.dateEn}
                    </span>
                    <h5 className="font-sans font-black text-xs text-zinc-900">
                      {isAr ? item.titleAr : item.titleEn}
                    </h5>
                    <p className="text-xs text-zinc-600 leading-relaxed font-serif max-w-3xl">
                      {isAr ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
