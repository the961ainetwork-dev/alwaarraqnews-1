import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  Users, 
  Scale, 
  TrendingUp, 
  ArrowLeftRight, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  BookOpen,
  MapPin,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Article } from '../types';

interface SolidereInfographicProps {
  language: 'ar' | 'en';
  onSelectArticle: (article: Article) => void;
  articles: Article[];
}

export const SolidereInfographic: React.FC<SolidereInfographicProps> = ({
  language,
  onSelectArticle,
  articles
}) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'timeline' | 'power' | 'stances' | 'deals'>('timeline');
  const [selectedTimelineYear, setSelectedTimelineYear] = useState<string>('2026');
  const [selectedDeal, setSelectedDeal] = useState<'grand' | 'judicial'>('grand');

  // Retrieve the full Solidere article from articles database
  const solidereArticle = articles.find(a => a.id === 'solidere-extension-2069');

  const handleReadFullArticle = () => {
    if (solidereArticle) {
      onSelectArticle(solidereArticle);
    }
  };

  // 1. Timeline Data
  const timelineData = [
    {
      year: '1994',
      titleAr: 'تأسيس الشركة والتفويض الأصلي',
      titleEn: 'Founding & Original Mandate',
      durationAr: '25 عاماً (كانت تنتهي في 2019)',
      durationEn: '25 years (Set to expire in 2019)',
      descAr: 'تأسست الشركة بموجب القانون رقم 117 بهدف إعادة إعمار وسط بيروت التجاري الذي دمرته الحرب الأهلية، مع تعهدات بجلب رؤوس الأموال وتحريك الاقتصاد في فترة ما بعد الحرب.',
      descEn: 'Established under Law 117 with the declared objective of reconstructing Beirut\'s commercial district destroyed by the civil war, promising to attract investment and revive the economy.',
      statusAr: 'مستثمر مؤقت محدد بمهام معينة',
      statusEn: 'Temporary developer with defined milestones',
      icon: Building2
    },
    {
      year: '2005 - 2007',
      titleAr: 'المهل الإضافية في عهد السنيورة',
      titleEn: 'Siniora Cabinet Extensions',
      durationAr: 'تمديد 10 سنوات إضافية حتى 2029',
      durationEn: 'Extended 10 additional years to 2029',
      descAr: 'أقرت حكومة فؤاد السنيورة تمديداً أولياً لعشر سنوات. وفي 2007، تم توسيع صلاحيات الشركة بمرسوم يتيح لها العمل الاستشاري والهندسي، مما حولها إلى إمبراطورية عقارية مغطاة رسمياً.',
      descEn: 'Fouad Siniora\'s cabinet approved a 10-year extension. In 2007, a decree expanded company operations to consult and engineer abroad, creating a state-sanctioned real estate empire.',
      statusAr: 'توسع الصلاحيات والتحول لقوة عقارية عابرة',
      statusEn: 'Expansion into a sovereign real estate empire',
      icon: ArrowLeftRight
    },
    {
      year: '2026',
      titleAr: 'المطالبة الكبرى وتثبيت التمديد حتى 2069',
      titleEn: 'The 75-Year Demand to 2069',
      durationAr: 'إبقاء الشركة 75 سنة من تاريخ التأسيس',
      durationEn: 'Locking company term to 75 years from founding',
      descAr: 'المدير العام ناصر الشماع يطالب باعتماد المدة التأسيسية القصوى (75 عاماً) في النظام التأسيسي، لتتحول الشركة عملياً من مُكلّف إعادة إعمار إلى "مالك أبدي" لوسط العاصمة اللبنانية دون مراجعة أو محاسبة.',
      descEn: 'General Manager Nasser Chammaa requests restoring the maximum founding duration (75 years) from the original bylaws, changing Solidere from a temporary agent into an "eternal landlord" of downtown.',
      statusAr: 'انتقال السيادة على وسط بيروت بشكل دائم',
      statusEn: 'Permanent transfer of downtown Beirut sovereignty',
      icon: Calendar
    }
  ];

  // 2. Power Factions Data
  const factionsData = [
    {
      nameAr: 'جناح الإدارة الحالية (ناصر الشماع)',
      nameEn: 'Current Management (Nasser Chammaa)',
      roleAr: 'المدير العام والشركاء المؤسسون المقربون من عهد الحريري التأسيسي',
      roleEn: 'General Manager & Founding Partners historically tied to Hariri-era setups',
      targetAr: 'تثبيت التمديد كطوق نجاة للاحتفاظ بالسيطرة وإغراء المستثمرين بمستقبل مشاريع طويلة المدى لإنقاذ أسهم الشركة.',
      targetEn: 'Securing the extension as a life raft to maintain control, alluring institutional investors with long-term prospects to revive falling stock values.',
      influenceAr: 'يسيطر على التوجهات الإدارية والعقود الحكومية الحالية ومفاوضات الكواليس السياسية مع السلطة.',
      influenceEn: 'Controls executive actions, operational land sales, and current backroom political negotiations.',
      percent: 'السيطرة الفعلية الحالية',
      percentVal: 'الإدارة والعمليات'
    },
    {
      nameAr: 'جبهة الاستحواذ المالي (أنطون صحناوي)',
      nameEn: 'Financial Takeover Bloc (Antoun Sehnaoui)',
      roleAr: 'رئيس مجلس إدارة مصرف "سوسييتيه جنرال" وحلفائه الماليين',
      roleEn: 'Chairman of SGBL (Société Générale de Banque au Liban) & allied investors',
      targetAr: 'التسلل والسيطرة التامة على أصول وسط بيروت. تشير تسريبات إلى استحواذه على ما يزيد عن 40% من الأسهم (بينما يعترف مسؤولو سوليدير بـ 10% مباشرة و 17% وكالات تفويض).',
      targetEn: 'Acquiring total dominance over BCD core landbank. Leaks show aggregate ownership exceeding 40% (compared to 10% direct & 17% proxy claimed by company).',
      influenceAr: 'شريكته وموفدته المندوبة الأميركية السابقة "مورغان أورتاغوس" تصفه بأنه لاعب محلي قوي، مع تحذيرات سيادية من ارتباطات استثمارية بالغة الحساسية قد تتسرب لشركات أجنبية.',
      influenceEn: 'Allied with high-profile international proxies. Critics warn that aggressive stock absorption might open paths for foreign portfolio transfers.',
      percent: 'نسبة الأسهم المتداولة والمسربة',
      percentVal: '40% تسريبات مقابل 27% معترف بها'
    }
  ];

  // 3. Political Stance Map
  const politicalStances = [
    {
      status: 'support',
      titleAr: 'موافقون وداعمون للتمديد',
      titleEn: 'Approved / Supportive',
      color: 'border-emerald-600 bg-emerald-50 text-emerald-950',
      badge: 'bg-emerald-600 text-white',
      factionsAr: 'رئاسة الجمهورية (جوزيف عون)، رئاسة الحكومة (نواف سلام)، رئيس مجلس النواب نبيه بري، الزعيم وليد جنبلاط.',
      factionsEn: 'Presidency (Joseph Aoun), PM Nawaf Salam, Speaker Nabih Berri, and Walid Jumblatt.',
      motivesAr: 'توفير غطاء سياسي بحجة "استقرار الاستثمارات" ومنع انهيار البورصة اللبنانية، وحماية مصالح كبار المساهمين كجزء من تسوية استقرار سياسي متبادل.',
      motivesEn: 'Providing comprehensive political backing to secure "investment stability", arrest stock collapse, and protect major shareholders in a mutual stability deal.'
    },
    {
      status: 'oppose',
      titleAr: 'معارضون بشكل قاطع',
      titleEn: 'Opposed / Rejected',
      color: 'border-rose-600 bg-rose-50 text-rose-950',
      badge: 'bg-rose-600 text-white',
      factionsAr: 'كتلة الوفاء للمقاومة (حزب الله).',
      factionsEn: 'Loyalty to Resistance Block (Hezbollah).',
      motivesAr: 'التخوف من الأبعاد السيادية وهوية المالكين الجدد، ورفض تكريس الاحتكار الأبدي لوسط العاصمة اللبنانية، ومقاومة تمرير صفقات عقارية لصالح قوى ماليّة معينة.',
      motivesEn: 'Fearing deep sovereignty breaches, rejecting permanent private monopoly over the capital\'s heart, and strongly warning against the ultimate identity of the offshore investors.'
    },
    {
      status: 'undecided',
      titleAr: 'مترددون ومراقبون',
      titleEn: 'Hesitant / Awaiting',
      color: 'border-amber-650 bg-amber-50 text-amber-950',
      badge: 'bg-amber-600 text-white',
      factionsAr: 'القوات اللبنانية، حزب الكتائب.',
      factionsEn: 'Lebanese Forces, Kataeb Party.',
      motivesAr: 'ترقب ومراقبة لمآلات الصراع الداخلي بين ناصر الشماع وأنطون صحناوي لتحديد الموقف النهائي بناءً على توازنات القوى والسيطرة الفعلية على وسط بيروت.',
      motivesEn: 'Awaiting the exact outcome of the internal management struggle to position themselves according to the balance of control over the capital.'
    }
  ];

  return (
    <section className="border-4 border-double border-red-800 p-5 md:p-6 bg-[#fcfbfa] text-black relative my-8 shadow-[6px_6px_0px_0px_rgba(153,27,27,1)]" id="solidere-sovereign-infographic">
      {/* Top Banner Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-850"></div>
      
      {/* Section Tag */}
      <div className="flex justify-between items-center pb-3 mb-5 border-b-2 border-red-800">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-800 rounded-none inline-block animate-pulse"></span>
          <span className="font-mono text-xs tracking-widest font-black uppercase text-red-850">
            {isAr ? 'صراع النفوذ، التسويات السياسية والصفقات البلدية' : 'POWER STRUGGLE, POLITICAL SETTLEMENTS & MUNICIPAL DEALS'}
          </span>
        </div>
        <div className="bg-red-800 text-white text-[10px] font-mono px-2 py-0.5 font-bold tracking-widest">
          {isAr ? 'تحقيق ورسم إنفوجرافيك تفاعلي' : 'INTERACTIVE INFOGRAPHIC'}
        </div>
      </div>

      {/* Main Title & Teaser */}
      <div className="text-center md:text-right rtl:text-right ltr:text-left space-y-3 mb-6">
        <h3 className="text-lg md:text-xl font-bold text-red-800 tracking-tight leading-tight uppercase font-mono">
          {isAr ? 'من سيملك بيروت حقاً لنصف القرن القادم؟' : 'Who Will Truly Own Beirut for the Next Half-Century?'}
        </h3>
        <h2 className="text-2xl md:text-4.5xl font-black text-zinc-900 tracking-tight leading-tight">
          {isAr ? 'تمديد ولاية "سوليدير" حتى 2069' : "Solidere's Mandate Extension to 2069"}
        </h2>
        <p className="text-base md:text-lg text-zinc-700 font-serif max-w-4xl mx-auto leading-relaxed">
          {isAr 
            ? 'تفكيك كواليس القرار الحكومي بالغ الحساسية: تحول شركة إعادة الإعمار المؤقتة إلى مالك أبدي لوسط بيروت، وتفاصيل صراع الأجنحة داخل "سوليدير" بين جناح ناصر الشماع وجبهة أنطون صحناوي.'
            : 'Deconstructing a highly sensitive cabinet decision: transforming a temporary redeveloper into an eternal owner of Beirut BCD, and mapping the fierce proxy war between Nasser Chammaa and Antoun Sehnaoui.'}
        </p>
      </div>

      {/* Standalone Box Cluster for the Stock Struggle & Sehnaoui Takeover */}
      <div className="border-2 border-black bg-amber-50/40 p-5 md:p-6 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-right rtl:text-right ltr:text-left space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-black">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-red-800 shrink-0" size={24} />
            <h4 className="text-lg md:text-xl font-black text-zinc-950 font-sans">
              {isAr ? 'معركة على قلب بيروت: كواليس تطور أسهم "سوليدير" واستحواذ صحناوي' : 'Battle for the Heart of Beirut: Solidere Stock & Sehnaoui Takeover'}
            </h4>
          </div>
          <span className="bg-red-800 text-white font-mono text-[10px] font-black uppercase px-2 py-1 tracking-wider">
            {isAr ? 'تحقيق خاص وموثق' : 'EXCLUSIVE COVERAGE'}
          </span>
        </div>

        <p className="text-base md:text-lg text-zinc-800 font-serif leading-relaxed">
          {isAr 
            ? 'لعقود من الزمن، وقفت "سوليدير" كرمز مطلق للحقبة الحريرية في فترة ما بعد الحرب. أما اليوم، وفي خضم الانهيار الاقتصادي، تحول سهم الشركة من ركود مالي إلى ملاذ آمن للودائع المحتجزة (اللولار)، لتنفجر معركة شرسة يقودها أنطون صحناوي للاستحواذ على النفوذ والسيطرة الكاملة على مجلس الإدارة ووسط العاصمة اللبنانية.'
            : 'For decades, Solidere was the symbol of the post-war Hariri era. Today, amid the economic collapse, its stock shifted from stagnation to a financial safe haven for trapped deposits ("Lollars"), igniting a fierce takeover battle led by Antoun Sehnaoui for total boardroom control.'}
        </p>

        {/* Bento Grid Metrics inside the Cluster Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Box 1: Stock Rise */}
          <div className="border border-zinc-300 bg-white p-4 space-y-2">
            <h5 className="font-sans font-black text-xs uppercase text-zinc-500 tracking-wider">
              📈 {isAr ? 'تطور سعر السهم' : 'Stock Trajectory'}
            </h5>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-black text-zinc-950">$60-$80</span>
              <span className="font-mono text-xs text-emerald-600 font-bold">↑ 800%</span>
            </div>
            <p className="text-xs font-serif text-zinc-650 leading-relaxed">
              {isAr 
                ? 'ارتفع السهم من ركود 5-8 دولارات قبل 2019 ليتجاوز 60 دولاراً بدافع تهافت المودعين لحماية ودائعهم البنكية.'
                : 'Shares surged from a pre-2019 average of $5-$8 to over $60 as depositors hedged trapped cash.'}
            </p>
          </div>

          {/* Box 2: Takeover Battle */}
          <div className="border border-zinc-300 bg-white p-4 space-y-2">
            <h5 className="font-sans font-black text-xs uppercase text-zinc-500 tracking-wider">
              👥 {isAr ? 'حصة أنطون صحناوي' : 'Sehnaoui Shareholding'}
            </h5>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-black text-red-850">40%</span>
              <span className="font-mono text-xs text-red-800 font-bold">{isAr ? 'تسريبات غير معلنة' : 'Opaque Leaks'}</span>
            </div>
            <p className="text-xs font-serif text-zinc-650 leading-relaxed">
              {isAr 
                ? 'تزعم التسريبات سيطرته على 40% عبر تفويضات ووكالات، بينما تعترف إدارة سوليدير بـ 10% مباشرة و 17% وكالات.'
                : 'Leaks indicate up to 40% control via allied proxies, while official company records state 10% direct + 17% proxy.'}
            </p>
          </div>

          {/* Box 3: Sovereign Warning */}
          <div className="border border-zinc-300 bg-white p-4 space-y-2">
            <h5 className="font-sans font-black text-xs uppercase text-zinc-500 tracking-wider">
              ⚠️ {isAr ? 'الأبعاد السيادية' : 'Sovereign Dimension'}
            </h5>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-base font-black text-red-850">{isAr ? 'شبهة تغلغل أجنبي' : 'Foreign Ingress Risk'}</span>
            </div>
            <p className="text-xs font-serif text-zinc-650 leading-relaxed">
              {isAr 
                ? 'مخاوف معلنة من تسييل أصول وسط بيروت لصالح صناديق أجنبية قد تؤول في نهاية المطاف لمحافظ استثمارية دولية بالغة الحساسية.'
                : 'Sovereign risks of liquidating Lebanon\'s center to foreign offshore vehicles linked to sensitive international portfolios.'}
            </p>
          </div>
        </div>

        {/* Action Link inside the box cluster */}
        <div className="flex justify-end pt-2">
          <button 
            onClick={() => {
              const art = articles.find(a => a.id === 'solidere-stock-struggle-2026');
              if (art) onSelectArticle(art);
            }}
            className="border-2 border-black bg-black hover:bg-zinc-900 text-white font-mono text-[11px] font-black uppercase px-4 py-2.5 shadow-[2px_2px_0px_0px_rgba(153,27,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all cursor-pointer"
          >
            {isAr ? '🔍 مطالعة التحقيق المستقل حول أسهم سوليدير واستحواذ صحناوي' : '🔍 Read Exclusive Stock Takeover Analysis'}
          </button>
        </div>
      </div>

      {/* Nav Tabs styled as press matrix buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 font-mono text-[11px] md:text-xs">
        <button 
          onClick={() => setActiveTab('timeline')}
          className={`px-3 py-3 border-2 font-black transition-all ${
            activeTab === 'timeline' 
              ? 'bg-red-800 text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-black'
          }`}
        >
          {isAr ? '⏱️ الخط الزمني التاريخي للشركة' : '⏱️ Historical Timeline Matrix'}
        </button>
        <button 
          onClick={() => setActiveTab('power')}
          className={`px-3 py-3 border-2 font-black transition-all ${
            activeTab === 'power' 
              ? 'bg-red-800 text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-black'
          }`}
        >
          {isAr ? '⚖️ صراع الأجنحة والسيطرة' : '⚖️ Control & Power Struggles'}
        </button>
        <button 
          onClick={() => setActiveTab('stances')}
          className={`px-3 py-3 border-2 font-black transition-all ${
            activeTab === 'stances' 
              ? 'bg-red-800 text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-black'
          }`}
        >
          {isAr ? '🗺️ خريطة المواقف السياسية' : '🗺️ Geopolitical Stance Map'}
        </button>
        <button 
          onClick={() => setActiveTab('deals')}
          className={`px-3 py-3 border-2 font-black transition-all ${
            activeTab === 'deals' 
              ? 'bg-red-800 text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-black'
          }`}
        >
          {isAr ? '📁 صفقات الكواليس وقوانين اللعبة' : '📁 Backroom & Court Deals'}
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-h-[300px]">
        
        {/* TAB 1: Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-200 pb-3 mb-4 flex justify-between items-center">
              <h4 className="font-sans font-black text-lg text-red-900">
                {isAr ? 'مسار تمديد وتثبيت الإمبراطورية العقارية' : 'Legal Lifespan & Extension Maneuvers'}
              </h4>
              <span className="text-xs text-zinc-500 font-mono font-bold">
                {isAr ? 'انقر على المراحل للمقارنة السريعة' : 'Click nodes to investigate details'}
              </span>
            </div>

            {/* Timeline Progress Bar Graphic */}
            <div className="relative pt-6 pb-2">
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-zinc-200 -translate-y-1/2 z-0 hidden md:block"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {timelineData.map((node) => {
                  const isSelected = selectedTimelineYear === node.year;
                  const NodeIcon = node.icon;
                  return (
                    <div 
                      key={node.year}
                      onClick={() => setSelectedTimelineYear(node.year)}
                      className={`cursor-pointer p-4 border-2 transition-all text-right rtl:text-right ltr:text-left ${
                        isSelected 
                          ? 'border-red-800 bg-red-50/50 shadow-[3px_3px_0px_0px_rgba(153,27,27,1)]' 
                          : 'border-zinc-300 bg-white hover:border-black'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`font-mono text-xl font-black ${isSelected ? 'text-red-850' : 'text-zinc-400'}`}>
                          {node.year}
                        </span>
                        <NodeIcon size={18} className={isSelected ? 'text-red-800' : 'text-zinc-400'} />
                      </div>
                      <h5 className="font-sans font-black text-xs md:text-sm text-zinc-900 leading-snug mb-1">
                        {isAr ? node.titleAr : node.titleEn}
                      </h5>
                      <p className="font-mono text-[10px] font-bold text-red-800 bg-red-50 inline-block px-1.5 py-0.5 rounded-none">
                        {isAr ? node.durationAr : node.durationEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Node Deep-dive Details */}
            {(() => {
              const selectedNode = timelineData.find(n => n.year === selectedTimelineYear) || timelineData[2];
              return (
                <div className="bg-[#fbfbf9] border border-zinc-200 p-4 space-y-3 animate-fade-in text-right rtl:text-right ltr:text-left">
                  <div className="flex items-center gap-2 pb-2 border-b border-dashed border-zinc-300">
                    <span className="text-xs bg-black text-white px-2 py-0.5 font-mono">
                      {isAr ? 'تحليل المرحلة' : 'Stage Breakdown'} ({selectedNode.year})
                    </span>
                    <strong className="text-sm font-sans font-black text-zinc-900">
                      {isAr ? selectedNode.titleAr : selectedNode.titleEn}
                    </strong>
                  </div>
                  <p className="text-zinc-700 font-serif text-base leading-relaxed">
                    {isAr ? selectedNode.descAr : selectedNode.descEn}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-mono pt-1 text-red-800">
                    <span className="font-bold">⚠️ {isAr ? 'الوضعية القانونية:' : 'Legal Stance:'}</span>
                    <span className="bg-red-50 px-2 py-0.5">{isAr ? selectedNode.statusAr : selectedNode.statusEn}</span>
                  </div>
                </div>
              );
            })()}

            {/* Infographic Note */}
            <div className="p-3 bg-zinc-50 border-l-4 border-zinc-400 text-[11px] font-mono leading-relaxed text-zinc-600">
              {isAr 
                ? 'استطاعت الشركة الحفاظ على امتيازات كبرى طوال العقود الثلاثة الماضية وتوسيع مرسوم صلاحياتها في 2007 خارج نطاق التفويض الموكل للبلديات، مستندة على دعم سياسي كامل.' 
                : 'The corporation successfully leveraged deep administrative connections to bypass core municipal parameters, achieving autonomous sovereign development powers beyond normal bylaws.'}
            </div>
          </div>
        )}

        {/* TAB 2: Power Struggle */}
        {activeTab === 'power' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-200 pb-3 mb-4">
              <h4 className="font-sans font-black text-lg text-red-900 text-right rtl:text-right ltr:text-left">
                {isAr ? 'موازين القوى: ناصر الشماع مقابل إمبراطورية أنطون صحناوي' : 'Balance of Power: Nasser Chammaa vs. Antoun Sehnaoui'}
              </h4>
              <p className="text-xs text-zinc-500 font-mono text-right rtl:text-right ltr:text-left">
                {isAr ? 'صراع أجنحة للسيطرة على الأصول والعقارات في بيروت' : 'Fierce stock absorption war to control the ultimate commercial district'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {factionsData.map((fac, idx) => (
                <div key={idx} className="border border-zinc-200 bg-[#fdfdfc] p-4 flex flex-col justify-between text-right rtl:text-right ltr:text-left space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
                      <div className="w-2 h-5 bg-red-800"></div>
                      <h5 className="font-sans font-black text-base text-zinc-900">
                        {isAr ? fac.nameAr : fac.nameEn}
                      </h5>
                    </div>

                    <div className="space-y-2 text-sm md:text-base font-serif">
                      <div>
                        <span className="block font-mono text-[10px] text-zinc-500 font-extrabold tracking-wider uppercase">
                          {isAr ? 'الهوية والصفة:' : 'Role & Alignment:'}
                        </span>
                        <p className="text-zinc-800">{isAr ? fac.roleAr : fac.roleEn}</p>
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] text-zinc-500 font-extrabold tracking-wider uppercase">
                          {isAr ? 'الهدف التكتيكي:' : 'Tactical Target:'}
                        </span>
                        <p className="text-zinc-800">{isAr ? fac.targetAr : fac.targetEn}</p>
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] text-zinc-500 font-extrabold tracking-wider uppercase">
                          {isAr ? 'حجم التأثير والقدرة:' : 'Scope of Influence:'}
                        </span>
                        <p className="text-zinc-800 leading-relaxed">{isAr ? fac.influenceAr : fac.influenceEn}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-2.5 border border-red-100 font-mono text-[11px] flex justify-between items-center">
                    <span className="text-red-900 font-bold">{isAr ? fac.percent : fac.percent}</span>
                    <span className="bg-red-800 text-white font-black px-2 py-0.5 text-[10px]">
                      {isAr ? fac.percentVal : fac.percentVal}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Infographic block showing the stakes */}
            <div className="border border-zinc-200 bg-zinc-50/50 p-4 space-y-2 text-right rtl:text-right ltr:text-left">
              <span className="font-mono text-[10px] font-black text-red-800 uppercase block">
                ⚠️ {isAr ? 'المخاوف السيادية الكبرى:' : 'MAJOR SOVEREIGN WARNINGS:'}
              </span>
              <p className="text-sm md:text-base text-zinc-700 font-serif leading-relaxed">
                {isAr 
                  ? 'يرى المعارضون أن تمرير التمديد في ظل تغلغل أنطون صحناوي قد يمهد الطريق لنقل ملكية وسط بيروت التاريخية لشركات أو صناديق استثمار دولية غامضة، مع مخاوف من تسرب بعض هذه الأسهم لصناديق تدير محافظ مالية بالغة الحساسية.'
                  : 'Opponents argue that extending Solidere\'s lease while Sehnaoui aggressively consolidates stock might pave paths to transfer historic downtown landbanks to offshore investment funds with opaque beneficial owners.'}
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: Political Stances */}
        {activeTab === 'stances' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-200 pb-3 mb-4">
              <h4 className="font-sans font-black text-lg text-red-900 text-right rtl:text-right ltr:text-left">
                {isAr ? 'خريطة التوافقات والتسويات السياسية الكبرى' : 'Political Consent Map & Cabinet Settlement'}
              </h4>
              <p className="text-xs text-zinc-500 font-mono text-right rtl:text-right ltr:text-left">
                {isAr ? 'لا يوجد قرار بهذا الحجم دون هندسة تسوية سياسية شاملة متبادلة الضمانات' : 'No corporate extension occurs without high-stakes political trade-offs'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {politicalStances.map((stance, idx) => (
                <div key={idx} className={`border-2 p-4 flex flex-col justify-between text-right rtl:text-right ltr:text-left space-y-4 ${stance.color}`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-200/50">
                      <h5 className="font-sans font-black text-xs md:text-sm">
                        {isAr ? stance.titleAr : stance.titleEn}
                      </h5>
                      <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 ${
                        stance.status === 'support' ? 'bg-emerald-600 text-white' :
                        stance.status === 'oppose' ? 'bg-red-700 text-white' : 'bg-amber-600 text-white'
                      }`}>
                        {stance.status === 'support' ? (isAr ? 'داعم' : 'SUPPORT') :
                         stance.status === 'oppose' ? (isAr ? 'معارض' : 'OPPOSE') : (isAr ? 'متردد' : 'AWAIT')}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm md:text-base font-serif">
                      <div>
                        <strong className="block font-sans font-black text-zinc-900 mb-1">
                          {isAr ? 'الأطراف والقوى:' : 'Political Entities:'}
                        </strong>
                        <p className="font-serif text-zinc-850 leading-relaxed">
                          {isAr ? stance.factionsAr : stance.factionsEn}
                        </p>
                      </div>
                      <div>
                        <strong className="block font-sans font-black text-zinc-900 mb-1">
                          {isAr ? 'الدوافع والحجج الاستراتيجية:' : 'Strategic Motives:'}
                        </strong>
                        <p className="font-serif text-zinc-750 leading-relaxed">
                          {isAr ? stance.motivesAr : stance.motivesEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Backroom & Court Deals */}
        {activeTab === 'deals' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-200 pb-3 mb-4 text-right rtl:text-right ltr:text-left">
              <h4 className="font-sans font-black text-lg text-red-900">
                {isAr ? 'صفقات الكواليس والملفات القضائية المغلقة' : 'Backroom Deals & Shelved Judicial Files'}
              </h4>
              <p className="text-xs text-zinc-500 font-mono">
                {isAr ? 'تفاصيل الاتفاقات العقارية والقرارات القضائية التي حسمت بقاء الشركة' : 'Behind-the-scenes legal actions and asset trades securing the lease'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Selector Side */}
              <div className="lg:col-span-4 space-y-2">
                <button
                  onClick={() => setSelectedDeal('grand')}
                  className={`w-full text-right rtl:text-right ltr:text-left p-4 border-2 font-black transition-all ${
                    selectedDeal === 'grand'
                      ? 'border-red-800 bg-red-50/50 shadow-[3px_3px_0px_0px_rgba(153,27,27,1)]'
                      : 'border-zinc-300 bg-white hover:border-black'
                  }`}
                >
                  <span className="font-mono text-xs text-red-800 block mb-1">
                    {isAr ? '📌 المقايضة الكبرى' : '📌 THE GRAND SWAP'}
                  </span>
                  <h5 className="font-sans text-sm font-black text-zinc-900">
                    {isAr ? 'تنازل بلدية بيروت عن الأسهم' : 'Beirut Municipality Share Swap'}
                  </h5>
                </button>

                <button
                  onClick={() => setSelectedDeal('judicial')}
                  className={`w-full text-right rtl:text-right ltr:text-left p-4 border-2 font-black transition-all ${
                    selectedDeal === 'judicial'
                      ? 'border-red-800 bg-red-50/50 shadow-[3px_3px_0px_0px_rgba(153,27,27,1)]'
                      : 'border-zinc-300 bg-white hover:border-black'
                  }`}
                >
                  <span className="font-mono text-xs text-red-800 block mb-1">
                    {isAr ? '⚖️ الضغوط القضائية' : '⚖️ JUDICIAL PRESSURE'}
                  </span>
                  <h5 className="font-sans text-sm font-black text-zinc-900">
                    {isAr ? 'تجميد مراجعات شورى الدولة' : 'State Council Appeals Shelving'}
                  </h5>
                </button>
              </div>

              {/* Right Details Side */}
              <div className="lg:col-span-8 border border-zinc-200 p-4 bg-[#fdfdfc] text-right rtl:text-right ltr:text-left space-y-4">
                {selectedDeal === 'grand' ? (
                  <div className="space-y-3">
                    <h5 className="font-sans font-black text-base text-zinc-900 pb-2 border-b border-zinc-100 flex items-center justify-between">
                      <span>{isAr ? 'كواليس صفقة التنازل والمقايضة' : 'The Asset Swap Details'}</span>
                      <span className="font-mono text-xs text-red-800 font-bold">{isAr ? 'قيمة الصفقة: 2.4 مليون دولار' : 'Value: $2.4M'}</span>
                    </h5>
                    <p className="text-base text-zinc-700 font-serif leading-relaxed">
                      {isAr 
                        ? 'عقدت اجتماعات سرية بين رئيس بلدية بيروت "إبراهيم زيدان" والمدير العام لشركة سوليدير "زياد أبو جمرة" لترتيب صفقة كبرى: تتنازل بلدية بيروت بموجبها عن كامل أسهمها في شركة سوليدير (المقدرة بـ 2.4 مليون دولار) وتغض الطرف عن أرباح تراكمية مستحقة للبلدية لم تسددها الشركة.'
                        : 'Secret meetings took place between Beirut Mayor Ibrahim Zeidan and Solidere General Manager Ziad Abu Jamra to swap municipal assets. The municipality waives its entire shareholding in Solidere ($2.4 million) and clears unpaid company debts.'}
                    </p>
                    <div className="bg-amber-50 p-3 border border-amber-200 space-y-2">
                      <strong className="block text-xs font-mono text-amber-900">
                        {isAr ? 'المقايضة الفعلية:' : 'The Exchange Hook:'}
                      </strong>
                      <p className="text-sm md:text-base text-zinc-750 leading-relaxed font-serif">
                        {isAr 
                          ? 'تحصل بلدية بيروت في المقابل على مبنى "غراند ثياتر" التراثي المتهالك. يهدف الشماع وأبو جمرة من هذا إلى التخلص من الأعباء المالية الضخمة لترميم المبنى التاريخي، وإقصاء البلدية من الجمعية العمومية للمساهمين للحد من المراقبة والمساءلة.'
                          : 'In return, Beirut Municipality receives the historic, heavily dilapidated "Grand Theatre" building. Solidere rids itself of million-dollar restoration costs and pushes the municipality out of shareholder assemblies to avoid local municipal oversight.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h5 className="font-sans font-black text-base text-zinc-900 pb-2 border-b border-zinc-100">
                      {isAr ? 'شطب الطعون واستبعاد قضاة النزاهة' : 'State Council Sidelining & Appeal Rejections'}
                    </h5>
                    <p className="text-base text-zinc-700 font-serif leading-relaxed">
                      {isAr 
                        ? 'شهدت كواليس القضاء اللبناني ضغوطاً سياسية مكثفة طالت مجلس شورى الدولة، وأدت إلى استبعاد القاضية ريتا كرم التي كانت قد أصدرت دراسة واضحة توصي بإبطال تمديد عام 2005 واعتبار الشركة منتهية الصلاحية منذ 2019.'
                        : 'The Lebanese judiciary suffered intense executive pressure leading to the exclusion of Judge Rita Karam, who previously compiled a comprehensive brief recommending the invalidation of the 2005 extension decree.'}
                    </p>
                    <div className="bg-red-50 p-3 border border-red-200 space-y-2">
                      <strong className="block text-xs font-mono text-red-900">
                        {isAr ? 'النتائج والقرارات الصادرة في أيار:' : 'Judicial Closures in May:'}
                      </strong>
                      <p className="text-sm md:text-base text-zinc-750 leading-relaxed font-serif">
                        {isAr 
                          ? 'برئاسة يوسف الجميل، قام مجلس شورى الدولة بتجميد كافة الطعون. وفي أيار الماضي، صادق المجلس على رد مراجعة صاحب منتجع السان جورج "فادي خوري" بحجة "انتفاء الصفة والمصلحة"، مما أغلق ملف الملاحقات القانونية ضد شركة سوليدير تماماً.'
                          : 'Under Youssef Al-Jamil, the State Council shelved all litigation. Last May, it formally dismissed the appeal of Saint George Resort owner Fadi Khouri, claiming "lack of standing and legal interest", ending judicial threats against Solidere.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Visual Bottom Callout with Action */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t-2 border-red-800 pt-5">
        <div className="flex items-center gap-3 text-right rtl:text-right ltr:text-left">
          <BookOpen className="text-red-800 shrink-0" size={24} />
          <div>
            <h5 className="font-sans font-black text-sm text-zinc-900 leading-snug">
              {isAr ? 'ملف متكامل وموثق بالوثائق السيادية والمالية' : 'Full Dossier Verified & Logged'}
            </h5>
            <p className="text-xs text-zinc-600 font-serif">
              {isAr 
                ? 'احصل على المستندات الرسمية، نصوص الطعون القضائية لمالكي العقارات الأصليين، ومحاضر صفقات بلدية بيروت.'
                : 'Review corporate blueprints, legal challenge briefs, and Beirut municipal minutes.'}
            </p>
          </div>
        </div>

        <button 
          onClick={handleReadFullArticle}
          className="bg-red-800 hover:bg-red-900 text-white font-black text-xs px-6 py-3 rounded-none flex items-center gap-2 cursor-pointer transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1"
        >
          <span>{isAr ? 'مطالعة التحقيق التفصيلي الكامل' : 'Read Full Editorial Dossier'}</span>
          {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
    </section>
  );
};
