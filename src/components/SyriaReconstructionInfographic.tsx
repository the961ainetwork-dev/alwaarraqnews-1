import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  RefreshCw, 
  Info, 
  Activity, 
  Coins,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Building2,
  Cpu,
  Truck,
  Droplets,
  Hammer,
  DollarSign,
  Heart,
  FileCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

interface SyriaReconstructionInfographicProps {
  language: 'ar' | 'en';
}

export function SyriaReconstructionInfographic({ language }: SyriaReconstructionInfographicProps) {
  const isAr = language === 'ar';
  
  // Interactive simulator for Reconstruction Budget Allocation
  const [totalBudgetNeeded, setTotalBudgetNeeded] = useState<number>(325); // Midpoint of 250 - 400 billion USD
  const [gulfContributionPct, setGulfContributionPct] = useState<number>(45); // Default 45% from Gulf countries
  const [intlAidPct, setIntlAidPct] = useState<number>(25); // Default 25% from international developmental loans (IMF/World Bank)
  const [privateSectorPct, setPrivateSectorPct] = useState<number>(20); // Default 20% from Private Public Partnerships & diaspora
  
  // Calculated values
  const domesticStatePct = Math.max(0, 100 - gulfContributionPct - intlAidPct - privateSectorPct);
  
  const gulfValue = (totalBudgetNeeded * gulfContributionPct) / 100;
  const intlValue = (totalBudgetNeeded * intlAidPct) / 100;
  const privateValue = (totalBudgetNeeded * privateSectorPct) / 100;
  const stateValue = (totalBudgetNeeded * domesticStatePct) / 100;

  // Selected sector details state
  const [selectedSector, setSelectedSector] = useState<string>('banking');

  const sectors = [
    {
      id: 'banking',
      nameAr: 'المصارف والخدمات المالية',
      nameEn: 'Banking & Financial Services',
      icon: Coins,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      barColor: '#f59e0b',
      pct: 95,
      impactAr: 'ربط البنوك المحلية بالمراسلات الدولية وسويفت، تسهيل الاعتمادات المستندية، وتدفق الحوالات الخارجية للمغتربين المقدرة بمليارات الدولارات سنوياً.',
      impactEn: 'Reconnecting domestic banks to SWIFT, facilitating trade letters of credit, and welcoming billions of dollars in annual remittances from the diaspora.',
      fundingAr: 'استثمارات خليجية ومؤسسات تنموية دولية.',
      fundingEn: 'Gulf corporate acquisitions, regional banking groups, and international development agencies.'
    },
    {
      id: 'energy',
      nameAr: 'الطاقة والبنية التحتية',
      nameEn: 'Energy & Infrastructure',
      icon: Droplets,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      barColor: '#3b82f6',
      pct: 88,
      impactAr: 'إعادة تأهيل محطات توليد الكهرباء، شبكات المياه، وإصلاح وصيانة حقول النفط والغاز في شمال شرق البلاد وتطويرها بتقنيات حديثة.',
      impactEn: 'Rehabilitating generation plants, water grids, repairing oil and gas fields in the northeast with advanced technology.',
      fundingAr: 'شركات النفط العالمية وصناديق سيادية إقليمية.',
      fundingEn: 'Global oil conglomerates, regional sovereign wealth funds, and bilateral state financing.'
    },
    {
      id: 'construction',
      nameAr: 'المقاولات والتشييد',
      nameEn: 'Construction & Rebuilding',
      icon: Hammer,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      barColor: '#10b981',
      pct: 92,
      impactAr: 'بناء المدن المهدمة، تعبيد الطرق السريعة، وتشييد مجمعات سكنية وتجارية عملاقة لتعويض العجز السكني الهائل الناتج عن الحرب.',
      impactEn: 'Rebuilding destroyed urban zones, repaving key national transit highways, and building large commercial and residential hubs to offset structural housing deficits.',
      fundingAr: 'تمويل حكومي مشترك وشراكات بين القطاعين العام والخاص (PPP).',
      fundingEn: 'State co-financing, Public-Private Partnerships (PPP), and regional infrastructure developers.'
    },
    {
      id: 'logistics',
      nameAr: 'النقل واللوجستيات',
      nameEn: 'Logistics & Transit',
      icon: Truck,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      barColor: '#6366f1',
      pct: 79,
      impactAr: 'استغلال موقع سوريا الاستراتيجي، إعادة تفعيل موانئ اللاذقية وطرطوس والمطارات والممرات البرية بين الخليج وتركيا وأوروبا.',
      impactEn: 'Leveraging Syria’s critical location to reactivate the Lattakia and Tartous deep-sea ports, airports, and overland highway cargo networks connecting the GCC with Turkey and Europe.',
      fundingAr: 'استثمارات إقليمية مشتركة.',
      fundingEn: 'Joint regional transit alliances, Turkish logistics operators, and Gulf maritime funds.'
    },
    {
      id: 'agriculture',
      nameAr: 'الزراعة والصناعات الغذائية',
      nameEn: 'Agriculture & Agri-Food',
      icon: Heart,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      barColor: '#f43f5e',
      pct: 70,
      impactAr: 'تأمين الأسمدة الحديثة والمعدات الزراعية المحظورة سابقاً، وفتح أسواق التصدير الإقليمية والعالمية للمنتجات السورية الشهيرة (مثل زيت الزيتون والحمضيات).',
      impactEn: 'Securing modern fertilizers and machinery previously blocked by sanctions, reopening regional export corridors for legendary Syrian agriculture, olive oil, and citrus crops.',
      fundingAr: 'القطاع الخاص المحلي والعربي.',
      fundingEn: 'Domestic private syndicates, regional retail distributors, and Arab agricultural banks.'
    }
  ];

  const activeSectorData = sectors.find(s => s.id === selectedSector) || sectors[0];

  const fundingChartData = [
    {
      name: isAr ? 'التمويل الخليجي' : 'Gulf Funds',
      value: Number(gulfValue.toFixed(1)),
      percentage: gulfContributionPct,
      color: '#d97706'
    },
    {
      name: isAr ? 'القروض الدولية' : 'Intl Aid & Loans',
      value: Number(intlValue.toFixed(1)),
      percentage: intlAidPct,
      color: '#2563eb'
    },
    {
      name: isAr ? 'القطاع الخاص والمغتربين' : 'Private & Diaspora',
      value: Number(privateValue.toFixed(1)),
      percentage: privateSectorPct,
      color: '#16a34a'
    },
    {
      name: isAr ? 'الخزينة المحلية والمشاريع المشتركة' : 'State Treasury',
      value: Number(stateValue.toFixed(1)),
      percentage: domesticStatePct,
      color: '#dc2626'
    }
  ];

  const timelineSteps = [
    {
      date: isAr ? 'ديسمبر ٢٠٢٤' : 'Dec 2024',
      titleAr: 'سقوط النظام وتأسيس حكومة انتقالية',
      titleEn: 'Regime Collapse & Transition',
      descAr: 'تولى أحمد الشرع تسيير المرحلة الانتقالية متعهداً بضمانات دولية ومكافحة الإرهاب.',
      descEn: 'Ahmad al-Sharaa takes over the transitional phase, committing to counter-terrorism.'
    },
    {
      date: isAr ? 'يناير - سبتمبر ٢٠٢٥' : 'Jan - Sep 2025',
      titleAr: 'تراخيص عامة للتسهيل التجاري',
      titleEn: 'OFAC General Licenses Issued',
      descAr: 'الخزانة الأمريكية (OFAC) تصدر تراخيص تدريجية للتجارة والمساعدات، وتلغي لوائح العقوبات تباعاً.',
      descEn: 'OFAC rolls out sweeping waivers easing trade, medical supplies, and humanitarian lanes.'
    },
    {
      date: isAr ? '١٨ ديسمبر ٢٠٢٥' : 'Dec 18, 2025',
      titleAr: 'إلغاء قانون قيصر رسمياً',
      titleEn: 'Caesar Act Repealed',
      descAr: 'وقع ترامب قانون الدفاع لعام ٢٠٢٦ متضمناً الإلغاء الكامل لعقوبات قيصر الثانوية الخانقة.',
      descEn: 'Trump signs the FY2026 NDAA, formally repealing the 2019 Caesar Act on secondary sanctions.'
    },
    {
      date: isAr ? '٨ يوليو ٢٠٢٦' : 'Jul 8, 2026',
      titleAr: 'لقاء قمة أنقرة والمراجعة الدستورية',
      titleEn: 'Ankara Summit & Cong. Review',
      descAr: 'لقاء تاريخي بين ترامب والشرع وإرسال إشعار الشطب الرسمي للكونغرس لبدء مهلة الـ 45 يوماً.',
      descEn: 'Historic Trump-Sharaa bilateral in Ankara; Trump sends formal intent to Congress for SST removal.'
    }
  ];

  return (
    <div className="border border-zinc-200 bg-stone-50 rounded-lg p-5 font-sans relative text-zinc-900 shadow-xs mt-4">
      
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-600 rounded-t-lg"></div>

      {/* Header */}
      <div className="border-b border-zinc-200 pb-4 mb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-600/10 text-amber-800">
            <Coins size={12} className="animate-pulse" />
            {isAr ? 'التقرير السيادي لإعادة الإعمار والتمويل' : 'SOVEREIGN RECONSTRUCTION & FINANCING DEEP-DIVE'}
          </span>
          <h4 className="font-sans font-black text-base md:text-lg text-zinc-950 mt-1 leading-snug">
            {isAr ? 'أدوات ونماذج محاكاة: العبور الاقتصادي السوري لعام ٢٠٢٦' : 'Interactive Modeling: Syria’s Economic Rebirth & Reconstruction Corridor'}
          </h4>
          <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
            {isAr ? 'نمذجة استباقية لمسار رفع العقوبات وتوزيع محركات النمو البالغة ٤٠٠ مليار دولار' : 'Proactive modeling of sanctions lift and the $400 Billion growth engine deployment'}
          </p>
        </div>
        <div className="text-right font-mono text-[10px] text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200 shrink-0">
          {isAr ? 'أفق المراجعة: ٤٥ يوماً دستورية' : 'Review Window: 45 Days'}
        </div>
      </div>

      {/* 1. Time Progression Pathway */}
      <div className="mb-8">
        <h5 className="text-xs font-bold text-zinc-400 font-mono tracking-wider uppercase mb-4 flex items-center gap-1.5">
          <Activity size={14} className="text-amber-600" />
          {isAr ? 'المسار الزمني لتفكيك الحصار وإعادة البناء (٢٠٢٤ - ٢٠٢٦)' : 'Timeline: Sanctions Demolition & Diplomatic De-escalation (2024-2026)'}
        </h5>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded border border-zinc-200 shadow-2xs hover:border-amber-400 transition-colors relative">
              <span className="absolute -top-2.5 right-3 bg-zinc-950 text-white text-[9px] font-mono px-2 py-0.5 rounded-sm font-bold border border-zinc-800">
                {step.date}
              </span>
              <div className="pt-2 text-right rtl:text-right ltr:text-left">
                <h6 className="font-extrabold text-xs text-zinc-950 leading-tight mb-1">
                  {isAr ? step.titleAr : step.titleEn}
                </h6>
                <p className="text-[11px] text-zinc-600 leading-normal">
                  {isAr ? step.descAr : step.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Two-Column Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sector Opportunities Interactive Curation */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white p-4 rounded-md border border-zinc-200 shadow-2xs flex-1">
            <h5 className="text-xs font-bold text-zinc-500 font-mono tracking-wider uppercase mb-4">
              {isAr ? '✦ قطاعات النمو الكبرى المستفيدة (انقر للاستعراض التفصيلي)' : '✦ Primary Sector Growth Catalog (Click to Deep-Dive)'}
            </h5>
            
            {/* Quick selectors list */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
              {sectors.map((sector) => {
                const IconComp = sector.icon;
                const isSelected = selectedSector === sector.id;
                return (
                  <button
                    key={sector.id}
                    onClick={() => setSelectedSector(sector.id)}
                    className={`flex sm:flex-col items-center justify-between sm:justify-center p-2.5 rounded border text-center transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-amber-950 border-amber-600 text-amber-400' 
                        : 'bg-stone-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700'
                    }`}
                  >
                    <IconComp size={16} className={`mb-1 ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`} />
                    <span className="text-[10px] font-bold leading-tight font-sans tracking-tight">
                      {isAr ? sector.nameAr.split(' ')[0] : sector.nameEn.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Sector Details Box */}
            <div className="bg-stone-50 border border-zinc-200 rounded p-4 relative overflow-hidden min-h-[140px]">
              <div className="absolute top-0 right-0 w-24 h-24 -mt-4 -mr-4 bg-amber-50 rounded-full flex items-center justify-center text-amber-100 opacity-20">
                {React.createElement(activeSectorData.icon, { size: 48 })}
              </div>
              
              <div className="relative z-10 text-right rtl:text-right ltr:text-left">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-2">
                  <h6 className="font-extrabold text-sm text-zinc-950 flex items-center gap-1.5">
                    {React.createElement(activeSectorData.icon, { size: 16, className: 'text-amber-600' })}
                    {isAr ? activeSectorData.nameAr : activeSectorData.nameEn}
                  </h6>
                  <span className="font-mono text-xs font-bold text-amber-600">
                    {isAr ? 'عائد متوقع مرتفع' : 'High Yield'} ({activeSectorData.pct}%)
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase font-bold">
                      {isAr ? 'طبيعة الاستفادة الفورية والفرص الاستثمارية:' : 'Nature of Direct Benefit & Growth Catalysts:'}
                    </span>
                    <p className="text-xs text-zinc-800 leading-relaxed font-serif mt-0.5 font-medium">
                      {isAr ? activeSectorData.impactAr : activeSectorData.impactEn}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase font-bold">
                      {isAr ? 'مصادر التمويل المتوقعة والمسارات المالية:' : 'Anticipated Capital Channels:'}
                    </span>
                    <p className="text-xs text-zinc-700 leading-normal font-sans font-semibold mt-0.5">
                      {isAr ? activeSectorData.fundingAr : activeSectorData.fundingEn}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reconstruction Budget Simulator */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-md border border-zinc-200 shadow-2xs flex-1 text-right rtl:text-right ltr:text-left">
            <h5 className="text-xs font-bold text-zinc-500 font-mono tracking-wider uppercase mb-3 flex items-center justify-between">
              <span>{isAr ? 'محاكي تمويل إعادة الإعمار' : 'RECONSTRUCTION CAPITAL MIX MODELER'}</span>
              <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-mono border border-amber-200">
                {isAr ? 'تفاعلي' : 'Interactive'}
              </span>
            </h5>

            {/* Sliders Block */}
            <div className="space-y-3 mb-4 font-sans text-xs">
              {/* Total Reconstruction Cost */}
              <div>
                <div className="flex justify-between font-bold text-zinc-850 mb-1">
                  <span>{isAr ? 'حجم الموازنة التقديرية لإعادة الإعمار:' : 'Total Estimated Rebuild Cost:'}</span>
                  <span className="text-zinc-950 font-mono">${totalBudgetNeeded}B USD</span>
                </div>
                <input 
                  type="range" 
                  min="250" 
                  max="400" 
                  step="5"
                  value={totalBudgetNeeded}
                  onChange={(e) => setTotalBudgetNeeded(Number(e.target.value))}
                  className="w-full accent-amber-600 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono mt-0.5">
                  <span>$250 Billion</span>
                  <span>$400 Billion</span>
                </div>
              </div>

              {/* Gulf Pct */}
              <div>
                <div className="flex justify-between font-medium text-zinc-750 mb-0.5">
                  <span>{isAr ? 'مساهمة رؤوس الأموال والتمويل الخليجي:' : 'Gulf Sovereign & Private Capital:'}</span>
                  <span className="font-bold font-mono text-amber-700">{gulfContributionPct}% ({gulfValue.toFixed(0)}B)</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="70" 
                  value={gulfContributionPct}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setGulfContributionPct(val);
                    // Ensure aggregate doesnt exceed 95
                    if (val + intlAidPct + privateSectorPct > 95) {
                      setIntlAidPct(Math.max(10, 95 - val - privateSectorPct));
                    }
                  }}
                  className="w-full accent-amber-600 h-1"
                />
              </div>

              {/* International Aid Pct */}
              <div>
                <div className="flex justify-between font-medium text-zinc-750 mb-0.5">
                  <span>{isAr ? 'القروض الدولية ومؤسسات التنمية:' : 'International Aid & Multilateral Loans:'}</span>
                  <span className="font-bold font-mono text-blue-700">{intlAidPct}% ({intlValue.toFixed(0)}B)</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  value={intlAidPct}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setIntlAidPct(val);
                    if (val + gulfContributionPct + privateSectorPct > 95) {
                      setGulfContributionPct(Math.max(20, 95 - val - privateSectorPct));
                    }
                  }}
                  className="w-full accent-blue-600 h-1"
                />
              </div>

              {/* Private Sector Pct */}
              <div>
                <div className="flex justify-between font-medium text-zinc-750 mb-0.5">
                  <span>{isAr ? 'الاستثمار الخاص والمغتربين والـ PPP:' : 'Private Public Partnerships & Diaspora:'}</span>
                  <span className="font-bold font-mono text-emerald-700">{privateSectorPct}% ({privateValue.toFixed(0)}B)</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="40" 
                  value={privateSectorPct}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setPrivateSectorPct(val);
                    if (val + gulfContributionPct + intlAidPct > 95) {
                      setGulfContributionPct(Math.max(20, 95 - val - intlAidPct));
                    }
                  }}
                  className="w-full accent-emerald-600 h-1"
                />
              </div>
            </div>

            {/* Recharts BarChart representing budget breakdown */}
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fundingChartData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 9, fill: '#52525b' }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => [`$${value} Billion`, isAr ? 'القيمة المقدرة' : 'Allocated']} contentStyle={{ background: '#18181b', color: '#fff', fontSize: '10px', borderRadius: '4px' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {fundingChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Risk Assessment Matrix Section */}
      <div className="mt-6 border-t border-zinc-200 pt-5 text-right rtl:text-right ltr:text-left">
        <h5 className="text-xs font-bold text-zinc-400 font-mono tracking-wider uppercase mb-3 flex items-center gap-1.5 justify-end">
          <AlertTriangle size={14} className="text-red-700 animate-pulse" />
          {isAr ? 'جدول تقييم المخاطر الاستثمارية الكلية' : 'Geopolitical Risk Assessment Matrix'}
        </h5>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
          {/* Risk 1 */}
          <div className="bg-[#fef2f2] border border-red-100 p-3 rounded text-xs">
            <span className="font-mono text-[9px] font-bold text-red-700 block uppercase">
              {isAr ? 'البنية التشريعية والقانونية • متوسط الخطورة' : 'LEGAL FRAMEWORK STRUCTURE • MEDIUM RISK'}
            </span>
            <p className="text-zinc-900 leading-normal font-medium mt-1">
              {isAr 
                ? 'الحاجة العاجلة لتشريعات حماية الملكيات وضمان تسييل الأرباح وحركية رأس المال الأجنبي دون قيود بيروقراطية.' 
                : 'Urgent demand for investment security codes, property ownership guarantees, and flexible foreign profit repatriation.'}
            </p>
          </div>
          
          {/* Risk 2 */}
          <div className="bg-[#fffbeb] border border-amber-100 p-3 rounded text-xs">
            <span className="font-mono text-[9px] font-bold text-amber-700 block uppercase">
              {isAr ? 'التضخم والعملة الوطنية • مخاطر مرتفعة' : 'INFLATION & CURRENCY VALUATION • HIGH RISK'}
            </span>
            <p className="text-zinc-900 leading-normal font-medium mt-1">
              {isAr 
                ? 'معالجة التضخم التاريخي لليرة السورية وتثبيت سعر الصرف عبر دعم الاحتياطي النقدي المركزي لتشجيع الصفقات طويلة المدى.' 
                : 'Overcoming historic hyperinflation of the Syrian Lira and stabilizing forex reserves to support long-term investment cycles.'}
            </p>
          </div>

          {/* Risk 3 */}
          <div className="bg-[#f0f9ff] border border-blue-100 p-3 rounded text-xs">
            <span className="font-mono text-[9px] font-bold text-blue-750 block uppercase">
              {isAr ? 'الاستقرار الأمني والسياسي • مخاطر متوسطة' : 'INTERNAL SECURITY STABILITY • MODERATE RISK'}
            </span>
            <p className="text-zinc-900 leading-normal font-medium mt-1">
              {isAr 
                ? 'رصد تماسك السلطة الانتقالية، وبسط سيادة القانون التامة، واحتواء بؤر التوتر والميليشيات المنحلة لتأمين ممرات الاستثمار.' 
                : 'Monitoring the unity of the transitional team, enforcing absolute rule of law, and fully neutralizing rogue factions.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
