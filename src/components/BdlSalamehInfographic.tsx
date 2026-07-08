import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  Users, 
  Scale, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle, 
  UserCheck, 
  CheckCircle, 
  ChevronRight, 
  Search,
  BookOpen,
  Layers,
  Fingerprint
} from 'lucide-react';

interface BdlSalamehInfographicProps {
  language: 'ar' | 'en';
}

export const BdlSalamehInfographic: React.FC<BdlSalamehInfographicProps> = ({ language }) => {
  const isAr = language === 'ar';
  
  // Tabs for the two stories
  const [activeMainTab, setActiveMainTab] = useState<'uprising' | 'scrutiny'>('uprising');
  
  // Interactive states for Story 1 (uprising)
  const [selectedSubSector, setSelectedSubSector] = useState<'audit' | 'fawry' | 'vips' | 'consultant'>('audit');
  const [sayrafaVolume, setSayrafaVolume] = useState<number>(150); // million USD of simulated profits
  
  // Interactive states for Story 2 (scrutiny)
  const [selectedWitnessId, setSelectedWitnessId] = useState<string>('raja_abu_asleh');
  const [witnessSearch, setWitnessSearch] = useState<string>('');
  const [witnessFilter, setWitnessFilter] = useState<'all' | 'bdl' | 'audi' | 'med' | 'reg' | 'legal'>('all');

  // Sayrafa tax calculation
  const calculatedTaxRate = 0.17; // 17% exceptional tax
  const recoveredTax = sayrafaVolume * calculatedTaxRate;

  // Witness Database
  const witnesses = [
    {
      id: 'raja_abu_asleh',
      nameAr: 'رجا أبو عسلة',
      nameEn: 'Raja Abu Asleh',
      category: 'bdl',
      roleAr: 'مسؤول سابق في مصرف لبنان',
      roleEn: 'Former BDL Official',
      orgAr: 'مصرف لبنان',
      orgEn: 'Banque du Liban',
      focusAr: 'توضيح الآليات الإجرائية الداخلية لتحويل الأموال والقرارات الإدارية الخاصة بالحاكمية السابقة.',
      focusEn: 'Clarifying internal procedural mechanisms for fund transfers and administrative decrees under former governor.',
    },
    {
      id: 'nouman_nadour',
      nameAr: 'نعمان نضور',
      nameEn: 'Nouman Nadour',
      category: 'bdl',
      roleAr: 'مدير العمليات النقدية والأسواق سابقاً',
      roleEn: 'Former Monetary Operations Director',
      orgAr: 'مصرف لبنان',
      orgEn: 'Banque du Liban',
      focusAr: 'تفصيل حركة الأسواق المالية وعمليات منصة صيرفة وإصدار السندات.',
      focusEn: 'Detailing financial market movements, Sayrafa platform operations, and treasury bonds issuance.',
    },
    {
      id: 'pierre_kanaan',
      nameAr: 'بيار كنعان',
      nameEn: 'Pierre Kanaan',
      category: 'bdl',
      roleAr: 'رئيس الدائرة القانونية في مصرف لبنان',
      roleEn: 'Director of Legal Department at BDL',
      orgAr: 'مصرف لبنان',
      orgEn: 'Banque du Liban',
      focusAr: 'صياغة العقود الاستشارية والاتفاقات وتدقيق الجوانب التنظيمية والبيئة القانونية لشركة فوري.',
      focusEn: 'Drafting advisory contracts, agreements, and reviewing regulatory and legal frameworks for Fawry.',
    },
    {
      id: 'michel_armouni',
      nameAr: 'ميشال عرموني',
      nameEn: 'Michel Armouni',
      category: 'audi',
      roleAr: 'مسؤول مصرفي سابق',
      roleEn: 'Former Senior Banking Executive',
      orgAr: 'بنك عوده',
      orgEn: 'Bank Audi',
      focusAr: 'القروض المدعومة لشركة إسكان وميقاتي وحركة التحويلات عشية الانهيار المالي.',
      focusEn: 'Subsidized housing loans linked to Mikati, and transfer logs on the eve of the financial collapse.',
    },
    {
      id: 'mikey_chebli',
      nameAr: 'ميكي شبلي',
      nameEn: 'Mikey Chebli',
      category: 'audi',
      roleAr: 'مدير تنفيذي سابق لإدارة الثروات',
      roleEn: 'Former Wealth Management Director',
      orgAr: 'بنك عوده',
      orgEn: 'Bank Audi',
      focusAr: 'تتبع المستفيدين الحقيقيين النهائيين وعمليات الهندسة المالية الكبرى لصالح كبار المودعين.',
      focusEn: 'Tracking Ultimate Beneficial Owners (UBOs) and major financial engineering operations for top depositors.',
    },
    {
      id: 'nabil_chaya',
      nameAr: 'نبيل شعيا',
      nameEn: 'Nabil Chaya',
      category: 'audi',
      roleAr: 'مستشار ومسؤول الخزينة سابقاً',
      roleEn: 'Former Treasury and Brokerage Head',
      orgAr: 'بنك عوده',
      orgEn: 'Bank Audi',
      focusAr: 'تفاصيل شراء سندات اليوروبوندز والتعاون الفني بين الخزينة والبنك المركزي.',
      focusEn: 'Details on Eurobonds acquisition and technical coordination between BDL and the commercial treasury.',
    },
    {
      id: 'arif_mneimneh',
      nameAr: 'عارف منيمنة',
      nameEn: 'Arif Mneimneh',
      category: 'med',
      roleAr: 'مسؤول تنفيذي وإداري سابق',
      roleEn: 'Former Executive Director',
      orgAr: 'بنك البحر المتوسط (Bankmed)',
      orgEn: 'Bankmed',
      focusAr: 'ملفات الهندسة المالية والآليات المستخدمة لتحويل مبالغ ضخمة إلى الخارج في ٢٠١٩.',
      focusEn: 'Financial engineering logs and mechanisms used to move large-scale assets abroad during late 2019.',
    },
    {
      id: 'adel_jabr',
      nameAr: 'عادل جبر',
      nameEn: 'Adel Jabr',
      category: 'med',
      roleAr: 'مسؤول الائتمان والمخاطر سابقاً',
      roleEn: 'Former Credit & Risk Management Officer',
      orgAr: 'بنك البحر المتوسط (Bankmed)',
      orgEn: 'Bankmed',
      focusAr: 'بيان الأطر التنظيمية والتسهيلات التي منحت لجهات ومقاولين على صلة بالدولة.',
      focusEn: 'Explaining regulatory environments and facilities extended to state-connected entities and contractors.',
    },
    {
      id: 'moustafa_nakouzi',
      nameAr: 'مصطفى ناقوزي',
      nameEn: 'Moustafa Nakouzi',
      category: 'med',
      roleAr: 'مسؤول مالي تنفيذي',
      roleEn: 'Executive Financial Officer',
      orgAr: 'بنك البحر المتوسط (Bankmed)',
      orgEn: 'Bankmed',
      focusAr: 'مطابقة قيود التحويلات المالية الخارجية وتدقيق عقود المقاولات الكبرى.',
      focusEn: 'Reconciling outbound wire transfers and auditing major procurement contracts.',
    },
    {
      id: 'sami_akkaoui',
      nameAr: 'سامي عكاوي',
      nameEn: 'Sami Akkaoui',
      category: 'med',
      roleAr: 'مستشار الخزينة السابق',
      roleEn: 'Former Treasury Advisor',
      orgAr: 'بنك البحر المتوسط (Bankmed)',
      orgEn: 'Bankmed',
      focusAr: 'توضيح حركة السيولة بالدولار والعمليات المتبادلة مع مصرف لبنان المركزي.',
      focusEn: 'Clarifying USD cash flows and bilateral financial agreements with Banque du Liban.',
    },
    {
      id: 'samir_hammoud',
      nameAr: 'سمير حمود',
      nameEn: 'Samir Hammoud',
      category: 'reg',
      roleAr: 'الرئيس السابق للجنة الرقابة على المصارف',
      roleEn: 'Former President of the Banking Control Commission',
      orgAr: 'لجنة الرقابة على المصارف',
      orgEn: 'Banking Control Commission (BCCL)',
      focusAr: 'بيان البيئة الرقابية، والإنذارات المبكرة المرفوعة، ومدى الالتزام بالمعايير الاحترازية الكلية.',
      focusEn: 'Outlining the supervisory environment, warning briefs filed, and adherence to macroprudential guidelines.',
    },
    {
      id: 'kortbawi_law',
      nameAr: 'مكتب قرطباوي للمحاماة',
      nameEn: 'Kortbawi Law Firm',
      category: 'legal',
      roleAr: 'مستشار قانوني ومكتب محاماة في بيروت',
      roleEn: 'Legal Counsel & Law Office in Beirut',
      orgAr: 'مكتب قرطباوي وشريكه',
      orgEn: 'Kortbawi Law & Partners',
      focusAr: 'توضيح جوانب العقود الاستشارية وحقيقة نمط العمل المتكرر في تمرير الصفقات وعقود الاستشارات.',
      focusEn: 'Explaining the structuring of advisory contracts and whether patterns reflect a systematic modus operandi.',
    },
    {
      id: 'dechert_intl',
      nameAr: 'مكتب Dechert العالمي',
      nameEn: 'Dechert International',
      category: 'legal',
      roleAr: 'مكتب محاماة واستشارات قانونية دولي',
      roleEn: 'Global Legal Advisory Firm',
      orgAr: 'Dechert LLP',
      focusAr: 'العقود السنوية بمليارات الليرات والدولارات وتزويد "الصندوق الاستشاري" بصيغ قانونية معقدة.',
      focusEn: 'Analyzing annual multi-million dollar legal consultancies and templates built for "The Consultant Box".',
    }
  ];

  const selectedWitness = witnesses.find(w => w.id === selectedWitnessId) || witnesses[0];

  const filteredWitnesses = witnesses.filter(w => {
    const matchesSearch = isAr 
      ? w.nameAr.includes(witnessSearch) || w.roleAr.includes(witnessSearch) || w.orgAr.includes(witnessSearch)
      : w.nameEn.toLowerCase().includes(witnessSearch.toLowerCase()) || w.roleEn.toLowerCase().includes(witnessSearch.toLowerCase()) || w.orgEn.toLowerCase().includes(witnessSearch.toLowerCase());
    
    const matchesCategory = witnessFilter === 'all' || w.category === witnessFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#FAF8F5] text-zinc-900 border-2 border-black p-4 md:p-6 my-4 font-serif text-right rtl:text-right ltr:text-left" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      
      {/* SECTION BANNER */}
      <div className="border-b-2 border-black pb-4 mb-6">
        <div className="flex justify-between items-center text-[10px] font-mono font-black text-red-900 uppercase tracking-widest">
          <span>{isAr ? 'ديوان التحقيقات السيادية • الرقابة والامتثال' : 'SOVEREIGN INTEL DEPT • SPECIAL AUDIT'}</span>
          <span>{isAr ? 'تحديث يوليو ٢٠٢٦' : 'JULY 2026 EDITION'}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-sans font-black tracking-tight text-zinc-950 mt-1">
          {isAr ? '❖ مصرف لبنان في مواجهة آل سلامة: مجهر التدقيق الجنائي والملاحقة' : '❖ Banque du Liban vs. Salameh: Forensic Auditing & Judicial Track'}
        </h3>
        <p className="text-xs md:text-sm text-zinc-700 mt-2 font-serif leading-relaxed max-w-4xl">
          {isAr 
            ? 'مستند تحليلي تفاعلي يعرض ملفين استقصائيين مدمجين: الأول يحلل انتفاضة الحسابات وتفكيك الإرث المالي، والثاني يستعرض خارطة الملاحقات القضائية وقائمة الشهود والمسؤولين والمكاتب تحت المجهر.' 
            : 'Interactive intelligence briefing outlining two core aspects: BDL\'s account dismantling actions and the comprehensive forensic list of commercial, regulatory, and legal witnesses under scrutiny.'}
        </p>
      </div>

      {/* DUAL MAIN NAVIGATION TABS (THE TWO STORIES) */}
      <div className="grid grid-cols-2 gap-2 mb-6 select-none">
        <button
          onClick={() => setActiveMainTab('uprising')}
          className={`py-3 px-2 sm:px-4 text-center font-sans font-black text-xs sm:text-sm border-2 transition-all cursor-pointer ${
            activeMainTab === 'uprising'
              ? 'bg-red-950 text-white border-red-950 shadow-sm'
              : 'bg-white text-zinc-800 border-zinc-300 hover:bg-stone-50'
          }`}
        >
          📁 {isAr ? '١. انتفاضة الحسابات وتصفية الإرث' : '1. The Account Uprising & Audits'}
        </button>
        <button
          onClick={() => setActiveMainTab('scrutiny')}
          className={`py-3 px-2 sm:px-4 text-center font-sans font-black text-xs sm:text-sm border-2 transition-all cursor-pointer ${
            activeMainTab === 'scrutiny'
              ? 'bg-red-950 text-white border-red-950 shadow-sm'
              : 'bg-white text-zinc-800 border-zinc-300 hover:bg-stone-50'
          }`}
        >
          ⚖ {isAr ? '٢. الملاحقات وقائمة الشهود والشركاء' : '2. Legal Scrutiny & Witness List'}
        </button>
      </div>

      {/* STORY 1: ACCOUNT UPRISING */}
      {activeMainTab === 'uprising' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left selector menu for subsections */}
            <div className="lg:col-span-4 space-y-2">
              <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                {isAr ? 'المحاور الأربعة للحساب الشامل:' : 'FOUR AXES OF THE GRAND RECKONING:'}
              </span>
              
              <button
                onClick={() => setSelectedSubSector('audit')}
                className={`w-full text-right rtl:text-right ltr:text-left p-3 border rounded-none transition-all flex items-center justify-between cursor-pointer ${
                  selectedSubSector === 'audit'
                    ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold'
                    : 'bg-white border-zinc-200 hover:bg-stone-50 text-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Fingerprint size={16} className="text-amber-700" />
                  <span className="text-xs font-sans font-extrabold">{isAr ? 'تدقيق ألفاريز ومارسال' : 'Alvarez & Marsal Audit'}</span>
                </div>
                <ChevronRight size={14} className="text-zinc-400 shrink-0" />
              </button>

              <button
                onClick={() => setSelectedSubSector('fawry')}
                className={`w-full text-right rtl:text-right ltr:text-left p-3 border rounded-none transition-all flex items-center justify-between cursor-pointer ${
                  selectedSubSector === 'fawry'
                    ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold'
                    : 'bg-white border-zinc-200 hover:bg-stone-50 text-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle size={16} className="text-red-700 animate-pulse" />
                  <span className="text-xs font-sans font-extrabold">{isAr ? 'قضية فوري وآل سلامة' : 'Fawry & The Salamehs'}</span>
                </div>
                <ChevronRight size={14} className="text-zinc-400 shrink-0" />
              </button>

              <button
                onClick={() => setSelectedSubSector('vips')}
                className={`w-full text-right rtl:text-right ltr:text-left p-3 border rounded-none transition-all flex items-center justify-between cursor-pointer ${
                  selectedSubSector === 'vips'
                    ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold'
                    : 'bg-white border-zinc-200 hover:bg-stone-50 text-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users size={16} className="text-zinc-700" />
                  <span className="text-xs font-sans font-extrabold">{isAr ? 'ملفات الكبار (ميقاتي ومصرفيون)' : 'The VIP Files (Mikati & Bankers)'}</span>
                </div>
                <ChevronRight size={14} className="text-zinc-400 shrink-0" />
              </button>

              <button
                onClick={() => setSelectedSubSector('consultant')}
                className={`w-full text-right rtl:text-right ltr:text-left p-3 border rounded-none transition-all flex items-center justify-between cursor-pointer ${
                  selectedSubSector === 'consultant'
                    ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold'
                    : 'bg-white border-zinc-200 hover:bg-stone-50 text-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Scale size={16} className="text-red-900" />
                  <span className="text-xs font-sans font-extrabold">{isAr ? 'الصندوق الاستشاري الغامض' : 'The Consultant Box'}</span>
                </div>
                <ChevronRight size={14} className="text-zinc-400 shrink-0" />
              </button>

              {/* Dynamic Interactive Sayrafa Tax Tool */}
              <div className="bg-zinc-950 p-4 border border-black mt-4 text-white">
                <span className="text-[#d97706] text-[9px] font-mono font-black uppercase block tracking-wider mb-2">
                  ⚡ {isAr ? 'أداة حساب ضريبة منصة صيرفة (١٧٪)' : 'SAYRAFA SPECIAL WINDFALL TAX CALCULATOR (17%)'}
                </span>
                <p className="text-[10px] text-zinc-300 font-serif leading-relaxed mb-3">
                  {isAr 
                    ? 'تتبع مصرف لبنان الأرباح المحققة عبر ثغرات منصة صيرفة وبدأ في فرض ضريبة استثنائية بنسبة ١٧٪ لاسترداد الأموال المبددة.'
                    : 'BDL is tracking profits from Sayrafa loopholes and enforcing an exceptional 17% tax to retrieve squandered public capital.'}
                </p>
                <div className="space-y-3 font-mono">
                  <div className="flex justify-between text-xxs">
                    <span>{isAr ? 'حجم الأرباح الخاضعة للضريبة:' : 'Volume of Arbitraged Profits:'}</span>
                    <span className="text-amber-400 font-sans">${sayrafaVolume}M USD</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    value={sayrafaVolume}
                    onChange={(e) => setSayrafaVolume(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between items-center text-xxs border-t border-zinc-800 pt-2 text-[#22c55e]">
                    <span className="font-bold">{isAr ? 'الضريبة المستردة لخزينة الدولة:' : 'Recovered Tax to Treasury:'}</span>
                    <span className="font-sans font-black text-sm">${recoveredTax.toFixed(2)}M USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right details visualization area */}
            <div className="lg:col-span-8 bg-white p-5 border border-zinc-200 relative">
              <span className="bg-amber-100 text-amber-900 font-mono text-[8px] font-bold px-2 py-0.5 absolute top-0 right-0 uppercase tracking-widest">
                {isAr ? 'وثيقة مدمجة • تفاصيل المحور' : 'EXHIBIT FILE • SPECIAL AXIS'}
              </span>

              {selectedSubSector === 'audit' && (
                <div className="space-y-4 font-serif">
                  <div className="flex items-center gap-2 border-b border-zinc-150 pb-2">
                    <Fingerprint className="text-amber-800" size={20} />
                    <h4 className="font-sans font-black text-sm text-zinc-900 uppercase">
                      {isAr ? 'ألفاريز ومارسال - الجيل الثاني من التدقيق الجنائي' : 'Alvarez & Marsal - Phase II Deep Forensic Audit'}
                    </h4>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-800 leading-relaxed text-justify">
                    {isAr 
                      ? 'تم تلزيم شركة ألفاريز ومارسال رسمياً لمرحلة معمقة وجديدة تغطي الفترة بين أكتوبر ٢٠١٩ وديسمبر ٢٠٢٣ لتحديد المسؤوليات بجرائم تبديد الاحتياطيات الإلزامية بالعملات الأجنبية.'
                      : 'Alvarez & Marsal has been formally commissioned to execute an intensive new phase of auditing covering the period from October 2019 to December 2023, analyzing foreign exchange reserves dissipation.'}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xxs mt-4">
                    <div className="p-3 bg-stone-50 border border-zinc-200">
                      <span className="font-black text-red-900 block border-b border-zinc-200 pb-1 mb-1">
                        🔍 {isAr ? 'مليارات الدعم تحت المجهر' : 'Subsidies Billions Audit'}
                      </span>
                      <p className="text-zinc-600 text-xxs leading-relaxed font-serif">
                        {isAr ? 'تتبع كيفية صرف وتوزيع أموال الدعم للمحروقات والأدوية وتحديد المصارف والشركات المتورطة بالاحتكار.' : 'Tracing how basic commodity support funds were spent and which commercial banks leveraged arbitrage.'}
                      </p>
                    </div>
                    <div className="p-3 bg-stone-50 border border-zinc-200">
                      <span className="font-black text-red-900 block border-b border-zinc-200 pb-1 mb-1">
                        💸 {isAr ? 'حركة تحويلات الهيركات' : 'Haircut-era Transactions'}
                      </span>
                      <p className="text-zinc-600 text-xxs leading-relaxed font-serif">
                        {isAr ? 'تدقيق التحويلات الخارجية لكبار النافذين خلال فترات حجز سحوبات المودعين الصغار.' : 'Analyzing major capital transfers abroad enacted by politically connected figures during the retail withdrawal freeze.'}
                      </p>
                    </div>
                    <div className="p-3 bg-stone-50 border border-zinc-200">
                      <span className="font-black text-red-900 block border-b border-zinc-200 pb-1 mb-1">
                        📈 {isAr ? 'أرباح صيرفة والملاحقة' : 'Sayrafa Arbitrage Probe'}
                      </span>
                      <p className="text-zinc-600 text-xxs leading-relaxed font-serif">
                        {isAr ? 'التحري عن الثغرات المنفعية وفرض ضريبة بأثر رجعي لاستعادة مكتسبات منصة صيرفة غير المشروعة.' : 'Probing transactional loopholes and instituting exceptional 17% taxes on speculative margins.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubSector === 'fawry' && (
                <div className="space-y-4 font-serif">
                  <div className="flex items-center gap-2 border-b border-zinc-150 pb-2">
                    <AlertTriangle className="text-red-800" size={20} />
                    <h4 className="font-sans font-black text-sm text-zinc-900 uppercase">
                      {isAr ? 'ملف شركة فوري (Fawry Associates) والمطاردة الدولية' : 'Fawry Associates Scandals & International Pursuit'}
                    </h4>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-800 leading-relaxed text-justify">
                    {isAr 
                      ? 'قضية شركة فوري المملوكة لرجا سلامة (شقيق الحاكم السابق رياض سلامة) والتي تلقت ٣٣٠ مليون دولار كعمولات مخفية من بيع اليوروبوندز دون مبرر تشغيلي قانوني.'
                      : 'The Fawry Associates case involving Raja Salameh (brother of former BDL chief Riad Salameh), accused of receiving $330 Million in unearned intermediary brokerage fees.'}
                  </p>

                  <div className="p-3 bg-red-50 border-r-4 border-red-800 text-red-950 font-sans text-xxs leading-relaxed">
                    <strong>{isAr ? 'تطور قضائي حاسم (٢٠٢٦):' : 'JUDICIAL BREAKTHROUGH (2026):'}</strong>{' '}
                    {isAr 
                      ? 'رفضت الهيئة العامة لمحكمة التمييز دعاوى المخاصمة، مما فتح الطريق أمام قاضية التحقيق لمواصلة ملاحقة المتهمين بجرائم الاختلاس وتبييض الأموال بملف اتهامي مالي قيمته ٤٤.٨ مليون دولار.'
                      : 'The General Assembly of the Lebanese Supreme Court (Cassation) rejected obstructive "malpractice suits" filed by the Salamehs, greenlighting the first investigative judge in Beirut to issue official indictments.'}
                  </div>

                  <div className="bg-stone-50 border border-zinc-200 p-3 flex justify-between items-center text-xs font-mono">
                    <div>
                      <span className="text-zinc-400 block uppercase text-xxs">{isAr ? 'العمولات الكلية المقتطعة:' : 'TOTAL COMMISSION SIPHON:'}</span>
                      <strong className="text-lg font-black text-red-800 font-sans">$330,000,000</strong>
                    </div>
                    <div className="text-left ltr:text-left rtl:text-right">
                      <span className="text-zinc-400 block uppercase text-xxs">{isAr ? 'مستندات مذكرات ٢٠٢٦:' : '2026 INDICTMENT BUNDLE:'}</span>
                      <strong className="text-sm font-bold text-zinc-900 font-sans">$44,800,000</strong>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubSector === 'vips' && (
                <div className="space-y-4 font-serif">
                  <div className="flex items-center gap-2 border-b border-zinc-150 pb-2">
                    <Users className="text-zinc-800" size={20} />
                    <h4 className="font-sans font-black text-sm text-zinc-900 uppercase">
                      {isAr ? 'فتح ملفات الكبار: شبكة السياسيين والمصرفيين والمقاولين' : 'Dismantling VIP Immunity: Politicians, Bankers & Contractors'}
                    </h4>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-800 leading-relaxed text-justify">
                    {isAr 
                      ? 'امتد الحراك المالي الرقابي والقضائي ليطال النخبة الاقتصادية السابقة ممن تمتعوا بحمايات سياسية ومالية لسنوات طويلة دون مساءلة.'
                      : 'The new executive stance of Banque du Liban has systematically targeted previous networks of political and commercial banking immunities.'}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xxs">
                    <div className="p-3 bg-stone-50 border border-zinc-200">
                      <strong className="font-black text-zinc-950 font-sans block mb-1">
                        🏛 {isAr ? 'ملف عائلة ميقاتي وبنك عوده' : 'Mikati & Bank Audi Subsidy'}
                      </strong>
                      <span className="font-serif text-zinc-700 leading-relaxed block">
                        {isAr 
                          ? 'استئناف الادعاء بملف قروض الإسكان المدعومة الحاصل عليها رئيس الحكومة نجيب ميقاتي وعائلته عبر بنك عوده بقيمة ملايين الدولارات المخصصة بالأساس لذوي الدخل المحدود.'
                          : 'Re-activation of illicit enrichment charges surrounding millions of dollars in highly subsidized BDL housing loans funneled to Prime Minister Najib Mikati and family through Bank Audi.'}
                      </span>
                    </div>

                    <div className="p-3 bg-stone-50 border border-zinc-200">
                      <strong className="font-black text-zinc-950 font-sans block mb-1">
                        🏗 {isAr ? 'ملف الخواجة وعدس وصراع الأموال' : 'Khawaja, Adas & Asset Shifts'}
                      </strong>
                      <span className="font-serif text-zinc-700 leading-relaxed block">
                        {isAr 
                          ? 'إخضاع عمليات كبرى جرت لصالح رجال أعمال ومقاولين (من بينهم الخواجة وعدس) ممن حولوا أرصدة هائلة للخارج بالتعاون مع إدارات مصرفية عشية أكتوبر ٢٠١٩ لتدقيق جنائي مشدد.'
                          : 'Detailed audit of major state contractors and financial engineers (including Khawaja and Adas) regarding non-transparent capital outflows and asset conversions during late 2019.'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubSector === 'consultant' && (
                <div className="space-y-4 font-serif">
                  <div className="flex items-center gap-2 border-b border-zinc-150 pb-2">
                    <Scale className="text-red-900" size={20} />
                    <h4 className="font-sans font-black text-sm text-zinc-900 uppercase">
                      {isAr ? 'لغز "الصندوق الاستشاري" (The Consultant Box) ونمط العمل المتكرر' : 'The Secret "Consultant Box" & Modus Operandi Investigations'}
                    </h4>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-800 leading-relaxed text-justify">
                    {isAr 
                      ? 'يشير مصطلح "الصندوق الاستشاري" إلى عقود استشارية سنوية خيالية بمليارات الليرات والدولارات كانت تمنح لشبكة من كبرى مكاتب المحاماة والاستشارات لتشريع وتغطية العمليات المشبوهة.'
                      : 'The "Consultant Box" refers to highly inflated annual advisory structures worth billions of LBP and USD distributed to specific law firms to structurally and legally cover non-standard transactions.'}
                  </p>

                  <div className="p-3 bg-stone-900 text-amber-100 font-mono text-xxs leading-relaxed">
                    <strong>{isAr ? 'مكاتب تحت المجهر القضائي الجاري:' : 'LAW FIRMS CURRENTLY UNDER SCOPE:'}</strong>
                    <div className="grid grid-cols-2 gap-4 mt-2 font-sans">
                      <div className="border-r border-amber-900/40 pr-2">
                        <span className="text-white block font-bold">{isAr ? 'مكتب قرطباوي وبيروت' : 'Kortbawi Law (Beirut)'}</span>
                        <span className="text-zinc-400 text-[10px] block font-serif mt-0.5">{isAr ? 'استقصاء عقود ممتدة وتحديد نمط العمل.' : 'Auditing structural templates and fee schedules.'}</span>
                      </div>
                      <div>
                        <span className="text-white block font-bold">{isAr ? 'مكتب Dechert العالمي' : 'Dechert International'}</span>
                        <span className="text-zinc-400 text-[10px] block font-serif mt-0.5">{isAr ? 'التدقيق في آليات التغطية وتسهيل العمليات.' : 'Scrutiny of high-fee advisory briefs and operational protection.'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* STORY 2: JUDICIARY SCRUTINY & WITNESS DATABASE */}
      {activeMainTab === 'scrutiny' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left side: Witness Selector and search */}
            <div className="lg:col-span-5 bg-white p-4 border border-zinc-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center border-b border-zinc-200 pb-2 mb-3">
                  <h4 className="font-sans font-black text-xs text-red-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Users size={14} className="text-red-800" />
                    <span>{isAr ? 'قائمة الاستدعاءات والشهود المحتملين' : 'Potential Judicial Witness Register'}</span>
                  </h4>
                  <span className="bg-red-100 text-red-900 text-[9px] font-mono font-bold px-1.5 py-0.5">
                    {filteredWitnesses.length} {isAr ? 'شخصية' : 'Profiles'}
                  </span>
                </div>

                {/* Filter and Search Inputs */}
                <div className="space-y-2 mb-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder={isAr ? 'ابحث بالاسم أو الدور...' : 'Search name or role...'} 
                      value={witnessSearch}
                      onChange={(e) => setWitnessSearch(e.target.value)}
                      className="w-full bg-stone-50 border border-zinc-300 py-1.5 px-8 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <Search size={12} className="absolute left-2.5 top-2.5 text-zinc-400" />
                  </div>

                  {/* Horizontal pill filters */}
                  <div className="flex flex-wrap gap-1 text-[9px] font-mono">
                    {(['all', 'bdl', 'audi', 'med', 'reg', 'legal'] as const).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setWitnessFilter(cat)}
                        className={`px-2 py-0.5 border cursor-pointer uppercase font-bold transition-colors ${
                          witnessFilter === cat 
                            ? 'bg-zinc-950 text-white border-zinc-950' 
                            : 'bg-stone-50 text-zinc-600 border-zinc-200 hover:bg-stone-100'
                        }`}
                      >
                        {cat === 'all' && (isAr ? 'الكل' : 'ALL')}
                        {cat === 'bdl' && (isAr ? 'مصرف لبنان' : 'BDL')}
                        {cat === 'audi' && (isAr ? 'بنك عوده' : 'AUDI')}
                        {cat === 'med' && (isAr ? 'البحر المتوسط' : 'BANKMED')}
                        {cat === 'reg' && (isAr ? 'الرقابة' : 'REGULATORS')}
                        {cat === 'legal' && (isAr ? 'مكاتب قانونية' : 'LEGAL')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scrollable list of witness profiles */}
                <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
                  {filteredWitnesses.map(w => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWitnessId(w.id)}
                      className={`w-full text-right rtl:text-right ltr:text-left p-2.5 border transition-all cursor-pointer flex justify-between items-center rounded-none ${
                        selectedWitnessId === w.id 
                          ? 'bg-red-50 border-red-800 text-red-950 font-bold shadow-sm' 
                          : 'bg-stone-50 hover:bg-stone-100 border-zinc-200 text-zinc-800'
                      }`}
                    >
                      <div>
                        <span className="font-sans text-xs font-black block">{isAr ? w.nameAr : w.nameEn}</span>
                        <span className="font-serif text-[10px] text-zinc-500 block mt-0.5">{isAr ? w.roleAr : w.roleEn}</span>
                      </div>
                      <span className="bg-zinc-200/50 text-zinc-700 font-mono text-[8px] font-black uppercase px-1.5 py-0.5 shrink-0">
                        {w.category.toUpperCase()}
                      </span>
                    </button>
                  ))}

                  {filteredWitnesses.length === 0 && (
                    <div className="text-center py-8 text-zinc-400 font-mono text-xs">
                      {isAr ? 'لا يوجد نتائج للبحث الحالي' : 'No matching records found'}
                    </div>
                  )}
                </div>
              </div>

              {/* Crucial legal disclaimer warning */}
              <div className="bg-amber-50/50 border border-amber-300/30 p-3 text-xxs leading-relaxed font-serif text-amber-950">
                <strong>{isAr ? '⚠️ تنبيه وملاحظة قانونية جوهرية:' : '⚠️ CRITICAL LEGAL DISCLAIMER:'}</strong>{' '}
                {isAr 
                  ? 'إدراج أي اسم في هذه اللائحة، أو طلب الاستماع إليه، لا يحمل أي اتهام مباشر أو غير مباشر، ولا يرتب مسؤولية جزائية، والهدف ينحصر في استجلاء الحقيقة أمام القضاء المختص.' 
                  : 'Listing or requesting testimony from any individual listed in this catalog does not constitute an direct accusation or represent pre-judgment. The sole purpose is seeking facts.'}
              </div>
            </div>

            {/* Right side: Detailed witness investigation card */}
            <div className="lg:col-span-7 bg-white p-5 border border-zinc-200 relative flex flex-col justify-between">
              
              {/* Embossed stamp header */}
              <div className="border-b-4 border-double border-zinc-900 pb-3 mb-4 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="text-red-900" size={18} />
                  <span className="font-mono text-xxs font-black text-zinc-500 uppercase">{isAr ? 'بطاقة شاهد سيادي' : 'WITNESS BRIEFING CARD'}</span>
                </div>
                <span className="font-mono text-xxs font-extrabold text-red-800 uppercase animate-pulse">● {isAr ? 'ملف تدقيق نشط' : 'ACTIVE PROBE'}</span>
              </div>

              {/* Main bio panel */}
              <div className="space-y-4 font-serif">
                <div className="bg-stone-50 p-4 border border-zinc-200">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-sans font-black text-lg text-zinc-950">{isAr ? selectedWitness.nameAr : selectedWitness.nameEn}</h4>
                      <p className="text-xs font-semibold text-red-900 mt-1 font-mono">{isAr ? selectedWitness.roleAr : selectedWitness.roleEn}</p>
                      <div className="mt-2.5 flex gap-2">
                        <span className="bg-zinc-200 text-zinc-800 text-[9px] font-sans font-bold px-2 py-0.5">
                          {isAr ? selectedWitness.orgAr : selectedWitness.orgEn}
                        </span>
                        <span className="bg-zinc-900 text-amber-100 text-[9px] font-mono px-2 py-0.5">
                          SEC-{selectedWitness.category.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-14 h-14 bg-zinc-100 border border-zinc-300 flex items-center justify-center text-zinc-400 font-mono text-xxs select-none uppercase shrink-0">
                      {isAr ? 'التحري' : 'ID-CARD'}
                    </div>
                  </div>
                </div>

                {/* Substantive Questioning Focus Area */}
                <div>
                  <h5 className="font-sans font-black text-xs text-zinc-800 uppercase tracking-wider mb-2 border-b border-zinc-150 pb-1.5 flex items-center gap-1.5">
                    <Scale size={13} className="text-red-900" />
                    <span>{isAr ? 'محاور الاستجواب والتركيز القضائي:' : 'Core Foci of Judicial Questioning:'}</span>
                  </h5>
                  <div className="p-3 bg-red-50/20 border-r-2 border-red-800 text-xs md:text-sm text-zinc-900 leading-relaxed text-justify indent-2">
                    {isAr ? selectedWitness.focusAr : selectedWitness.focusEn}
                  </div>
                </div>

                {/* Technical "Modus Operandi" (pattern recognition) analysis */}
                <div className="bg-stone-50 border border-zinc-200 p-3 text-xxs leading-relaxed">
                  <strong className="font-sans font-black text-zinc-950 block mb-1">
                    ⚙ {isAr ? 'نمط العمل المتكرر (Modus Operandi):' : 'Modus Operandi Pattern Analysis:'}
                  </strong>
                  <span className="text-zinc-600">
                    {isAr 
                      ? 'تكتسب شهادات هذه الفئة أهمية لربط الهيكلية المالية المتطابقة في تحويلات المصارف المختلفة وتأكيد أو نفي وجود عمليات ممنهجة ومتكررة عشية الانهيار.'
                      : 'Testimony from these key profiles serves to identify structural and procedural overlaps in cross-border wiring across different commercial entities, establishing systematic patterns.'}
                  </span>
                </div>
              </div>

              {/* Verification signoff */}
              <div className="border-t border-zinc-200 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-zinc-400 select-none">
                <span>{isAr ? 'معتمد رسمياً في التحقيقات' : 'FORMALLY RECONCILED IN INQUIRIES'}</span>
                <span className="flex items-center gap-1 text-emerald-800">
                  <CheckCircle size={10} />
                  <span>{isAr ? 'تم التدقيق والتوثيق' : 'VERIFIED'}</span>
                </span>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
