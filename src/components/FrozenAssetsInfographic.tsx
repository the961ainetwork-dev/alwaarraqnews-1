import React, { useState } from 'react';
import { 
  DollarSign, 
  Globe, 
  Clock, 
  Scale, 
  AlertTriangle, 
  TrendingDown, 
  MapPin, 
  FileText, 
  Calendar, 
  Compass, 
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'motion/react';

interface FrozenAssetsInfographicProps {
  language: 'ar' | 'en';
}

export const FrozenAssetsInfographic: React.FC<FrozenAssetsInfographicProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'quantities' | 'distribution' | 'timeline' | 'legal' | 'geopolitics'>('quantities');
  const [selectedCountry, setSelectedCountry] = useState<string | null>('china');

  // Chart Data
  const chartData = [
    {
      id: 'china',
      nameAr: 'الصين',
      nameEn: 'China',
      amount: 22.5,
      rangeAr: '20 - 25 مليار $',
      rangeEn: '$20B - $25B',
      descAr: 'أرصدة نفطية محتجزة في حسابات مقيدة؛ تُستخدم حصرياً لتمويل الواردات الصينية لإيران (مقايضة).',
      descEn: 'Oil revenues held in restricted accounts; used exclusively for bartering Chinese imports.',
      color: '#b91c1c'
    },
    {
      id: 'iraq',
      nameAr: 'العراق',
      nameEn: 'Iraq',
      amount: 11.0,
      rangeAr: '10 - 12 مليار $',
      rangeEn: '$10B - $12B',
      descAr: 'مستحقات غاز وكهرباء؛ محتجزة بموجب تفويضات أمريكية مشروطة للأغراض الإنسانية فقط.',
      descEn: 'Gas and electricity payments; held under conditional US waivers strictly for humanitarian purchases.',
      color: '#d97706'
    },
    {
      id: 'eu',
      nameAr: 'الاتحاد الأوروبي والبنوك الدولية',
      nameEn: 'EU & International Banks',
      amount: 7.5,
      rangeAr: '5 - 10 مليار $',
      rangeEn: '$5B - $10B',
      descAr: 'أصول موزعة في بريطانيا، وألمانيا، وإيطاليا، وتخضع لعقوبات مرتبطة ببروتوكولات حظر الانتشار النووي.',
      descEn: 'Assets distributed across UK, Germany, and Italy under non-proliferation sanctions.',
      color: '#2563eb'
    },
    {
      id: 'south-korea',
      nameAr: 'كوريا الجنوبية',
      nameEn: 'South Korea',
      amount: 6.0,
      rangeAr: '6 مليار $',
      rangeEn: '$6B',
      descAr: 'أموال نفطية نُقلت في أواخر عام 2023 إلى بنوك سويسرية ثم إلى قطر بموجب صفقة تبادل سجناء، وتخضع لرقابة مشددة.',
      descEn: 'Oil funds transferred in late 2023 to Swiss banks and then to Qatar via a prisoner swap deal, under strict oversight.',
      color: '#10b981'
    },
    {
      id: 'usa',
      nameAr: 'الولايات المتحدة',
      nameEn: 'United States',
      amount: 3.0,
      rangeAr: '2 - 4 مليار $',
      rangeEn: '$2B - $4B',
      descAr: 'تشمل عقارات بعثات دبلوماسية سابقة، وأموال عسكرية ما قبل 1979، وأرصدة مجمدة خاضعة لأحكام قضائية لصالح ضحايا الإرهاب.',
      descEn: 'Includes former diplomatic properties, pre-1979 military funds, and frozen assets subject to US court judgments for terrorism victims.',
      color: '#4f46e5'
    },
    {
      id: 'japan',
      nameAr: 'اليابان',
      nameEn: 'Japan',
      amount: 3.0,
      rangeAr: '3 مليار $',
      rangeEn: '$3B',
      descAr: 'أموال ناتجة عن مبيعات النفط قبل إعادة فرض العقوبات الأمريكية عام 2018.',
      descEn: 'Revenues from oil sales prior to the re-imposition of US sanctions in 2018.',
      color: '#06b6d4'
    },
    {
      id: 'luxembourg',
      nameAr: 'لوكسمبورغ (Clearstream)',
      nameEn: 'Luxembourg (Clearstream)',
      amount: 1.8,
      rangeAr: '1.6 - 2 مليار $',
      rangeEn: '$1.6B - $2B',
      descAr: 'سندات وأصول تابعة للبنك المركزي الإيراني خضعت لنزاعات قضائية طويلة في المحاكم الأوروبية والأمريكية.',
      descEn: 'Bonds and assets of the Central Bank of Iran subject to prolonged litigation in US and European courts.',
      color: '#7c3aed'
    }
  ];

  // Timeline Data
  const timelineEvents = [
    {
      periodAr: '1979 (أزمة الرهائن)',
      periodEn: '1979 (Hostage Crisis)',
      titleAr: 'موجة التجميد الأولى والأمر 12170',
      titleEn: 'First Wave & Executive Order 12170',
      descAr: 'أصدر الرئيس الأمريكي جيمي كارتر أمراً تنفيذياً جمد بموجبه حوالي 12 مليار دولار من الأصول الإيرانية عقب اقتحام السفارة الأمريكية في طهران. سُويت جزئياً باتفاقات الجزائر 1981 وإنشاء محكمة لاهاي.',
      descEn: 'US President Jimmy Carter issued an executive order freezing approximately $12B in response to the US Embassy takeover in Tehran. Partially resolved by the 1981 Algiers Accords and the Hague Tribunal.',
      icon: Clock,
      statusAr: 'بداية حقبة العقوبات المالية',
      statusEn: 'Beginning of the financial sanctions era'
    },
    {
      periodAr: '2006 - 2010',
      periodEn: '2006 - 2010',
      titleAr: 'موجة العقوبات النووية والقرارات الأممية',
      titleEn: 'Nuclear Sanctions & UN Resolutions',
      descAr: 'أصدر مجلس الأمن الدولي قرارات بموجب الفصل السابع (مثل 1737 و1929) فرضت تجميداً دولياً واسعاً على أصول الأفراد والشركات والبنك المركزي الإيراني المرتبطين بالبرنامج النووي، وحذا الاتحاد الأوروبي حذو واشنطن.',
      descEn: 'The UN Security Council passed Chapter VII resolutions (like 1737 & 1929) imposing sweeping international freezes on assets of entities, individuals, and the Central Bank linked to nuclear activities.',
      icon: ShieldAlert,
      statusAr: 'تدويل حظر الأصول الإيرانية',
      statusEn: 'Internationalization of the asset freeze'
    },
    {
      periodAr: '2015 - 2018',
      periodEn: '2015 - 2018',
      titleAr: 'الاتفاق النووي وإعادة التجميد (الضغط الأقصى)',
      titleEn: 'JCPOA & Re-freezing (Maximum Pressure)',
      descAr: 'بموجب الاتفاق النووي لعام 2015، أُفرج عن جزء كبير من الأصول (50-100 مليار دولار). ولكن في 2018، انسحبت أمريكا وفرضت عقوبات ثانوية على أي بنك يتعامل مع البنك المركزي الإيراني، مما أعاد تجميد الأصول عالمياً.',
      descEn: 'Under the 2015 nuclear deal (JCPOA), a large portion ($50B-$100B) was unfrozen. In 2018, the US withdrew and applied secondary sanctions on any bank dealing with the Central Bank of Iran, re-freezing assets worldwide.',
      icon: TrendingDown,
      statusAr: 'سياسة الضغط الأقصى الأمريكية',
      statusEn: 'US Maximum Pressure strategy'
    },
    {
      periodAr: '2023 - 2026',
      periodEn: '2023 - 2026',
      titleAr: 'صفقات التبادل والقنوات الإنسانية المقيدة',
      titleEn: 'Prisoner Swaps & Restricted Humanitarian Channels',
      descAr: 'وساطة قطرية وعُمانية ناجحة أفضت لنقل 6 مليارات دولار من كوريا الجنوبية إلى حسابات مقيدة في قطر تحت إشراف الخزانة الأمريكية للأغراض الإنسانية فقط، وإفراجات دورية مقيدة من العراق لحسابات وسيطة.',
      descEn: 'Qatari and Omani mediation led to the transfer of $6B from South Korea to restricted accounts in Qatar monitored by the US Treasury for humanitarian use only, along with periodic structured releases from Iraq.',
      icon: Calendar,
      statusAr: 'ترتيبات مالية معقدة بالوساطة',
      statusEn: 'Complex mediated financial channels'
    }
  ];

  // Legal Framework Data
  const legalFrameworks = [
    {
      titleAr: 'القانون المحلي الأمريكي والتشريعات العابرة للحدود',
      titleEn: 'US Domestic Law & Extraterritorial Jurisdiction',
      descAr: 'تعتمد الولايات المتحدة على "قانون الصلاحيات الاقتصادية الطارئة الدولية" (IEEPA) لتجميد الأصول، وينفذ ذلك مكتب مراقبة الأصول الأجنبية (OFAC) التابع لوزارة الخزانة الأمريكية عبر نظام المقاصة بالدولار (Fedwire)، مما يمنح العقوبات مفعولاً عابراً للحدود وعابراً للقارات.',
      descEn: 'The US relies on the International Emergency Economic Powers Act (IEEPA) to freeze assets, executed by the Office of Foreign Assets Control (OFAC) of the Treasury. This leverages the USD clearing system (Fedwire) to enforce extraterritorial, global compliance.'
    },
    {
      titleAr: 'معضلة الحصانة السيادية ومقاضاة الدول',
      titleEn: 'Sovereign Immunity Dilemma & State Lawsuits',
      descAr: 'سمحت تعديلات قانون حصانات الدول الأجنبية (FSIA) وقانون حماية ضحايا الإرهاب (TRIA) للمواطنين الأمريكيين بمقاضاة إيران. وقضت المحكمة العليا الأمريكية في قضية "بترسون ضد البنك المركزي الإيراني" بمصادرة نحو 2 مليار دولار من الأصول المجمدة لدى سيتي بنك في نيويورك كتعويضات لعائلات ضحايا تفجير ثكنات المارينز في بيروت عام 1983.',
      descEn: 'Amendments to the Foreign Sovereign Immunities Act (FSIA) and Terrorism Risk Insurance Act (TRIA) enabled US citizens to sue Iran. In Peterson v. CBI, the US Supreme Court approved distributing $2B of frozen Central Bank assets held at Citibank NY to families of the 1983 Beirut barracks bombing victims.'
    },
    {
      titleAr: 'موقف محكمة العدل الدولية (حكم مارس 2023)',
      titleEn: 'International Court of Justice (March 2023 Ruling)',
      descAr: 'رفعت إيران دعوى أمام محكمة لاهاي بحجة انتهاك "معاهدة الصداقة 1955". وقضت المحكمة بأن الولايات المتحدة انتهكت التزاماتها بمصادرة أصول شركات إيرانية، لكنها أعلنت عدم اختصاصها القضائي للحكم في تجميد أصول البنك المركزي الإيراني (التي تمثل الكتلة الكبرى) لحصانتها السيادية الخاصة.',
      descEn: 'Iran sued the US at the ICJ citing the 1955 Treaty of Amity. In March 2023, the ICJ ruled that the US violated international obligations by allowing seizure of Iranian state-owned companies\' assets, but declared it lacked jurisdiction over the freezing of the Central Bank of Iran’s assets due to separate sovereign immunity doctrines.'
    }
  ];

  const totalSovereignAssets = 54.8; // sum of represent values

  return (
    <div className="border-4 border-double border-red-800 p-5 md:p-6 bg-[#fdfbf7] text-black relative my-8 shadow-[6px_6px_0px_0px_rgba(153,27,27,1)]">
      {/* Top Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-800"></div>

      {/* Header bar */}
      <div className="flex justify-between items-center pb-3 mb-5 border-b-2 border-red-800">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-800 rounded-none inline-block animate-pulse"></span>
          <span className="font-mono text-xs tracking-widest font-black uppercase text-red-950">
            {isAr ? 'لوحة البيانات والتحليل التفاعلي للأصول' : 'INTERACTIVE ASSET ANALYSIS & DATA GRID'}
          </span>
        </div>
        <div className="bg-red-900 text-white text-[10px] font-mono px-2 py-0.5 font-bold tracking-widest">
          {isAr ? 'ملف خاص بالشرق الأوسط' : 'MIDDLE EAST SPECIAL CASE FILE'}
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center md:text-right rtl:text-right ltr:text-left space-y-2 mb-6">
        <h3 className="text-lg md:text-xl font-bold text-red-850 tracking-tight leading-tight uppercase font-mono">
          {isAr ? 'ملف التقصي المدمج' : 'Sovereign Dossier Supplement'}
        </h3>
        <h2 className="text-xl md:text-3xl font-black text-zinc-950 tracking-tight leading-none">
          {isAr ? 'الأصول الإيرانية المجمدة في الخارج: دراسة استقصائية تفاعلية' : 'Iranian Frozen Assets Abroad: Interactive Deep-Dive'}
        </h2>
        <p className="text-xs md:text-sm text-zinc-700 font-serif leading-relaxed">
          {isAr 
            ? 'توزيع الأرصدة المقيدة جغرافياً، ومحطاتها التاريخية والأطر القانونية المعقدة المنظمة لتسييلها وإدارتها.'
            : 'Geographical distribution of restricted funds, chronological waves of freezes, and the complex legal battles governing their liquidation.'}
        </p>
      </div>

      {/* TABS SELECTOR */}
      <div className="flex flex-wrap border-b border-zinc-200 mb-6 gap-1 md:gap-2">
        <button
          onClick={() => setActiveTab('quantities')}
          className={`px-4 py-2 text-xs md:text-sm font-bold font-sans cursor-pointer transition-all border-b-2 ${
            activeTab === 'quantities'
              ? 'border-red-800 text-red-950 bg-red-50/30'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          📊 {isAr ? 'الأبعاد الكمية والتقديرات' : 'Quantitative Estimates'}
        </button>
        <button
          onClick={() => setActiveTab('distribution')}
          className={`px-4 py-2 text-xs md:text-sm font-bold font-sans cursor-pointer transition-all border-b-2 ${
            activeTab === 'distribution'
              ? 'border-red-800 text-red-950 bg-red-50/30'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          🗺️ {isAr ? 'التوزيع الجغرافي والشركاء' : 'Geographical Distribution'}
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 text-xs md:text-sm font-bold font-sans cursor-pointer transition-all border-b-2 ${
            activeTab === 'timeline'
              ? 'border-red-800 text-red-950 bg-red-50/30'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          📅 {isAr ? 'موجات التجميد التاريخية' : 'Historical Waves'}
        </button>
        <button
          onClick={() => setActiveTab('legal')}
          className={`px-4 py-2 text-xs md:text-sm font-bold font-sans cursor-pointer transition-all border-b-2 ${
            activeTab === 'legal'
              ? 'border-red-800 text-red-950 bg-red-50/30'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          ⚖️ {isAr ? 'الأطر القانونية والنزاعات' : 'Legal & Litigation'}
        </button>
        <button
          onClick={() => setActiveTab('geopolitics')}
          className={`px-4 py-2 text-xs md:text-sm font-bold font-sans cursor-pointer transition-all border-b-2 ${
            activeTab === 'geopolitics'
              ? 'border-red-800 text-red-950 bg-red-50/30'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          🌐 {isAr ? 'التداعيات وآليات الإدارة' : 'Geopolitics & Management'}
        </button>
      </div>

      {/* CONTENT FIELDS */}
      
      {/* Tab 1: Quantities / Recharts Chart */}
      {activeTab === 'quantities' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Legend & Stats */}
            <div className="md:col-span-5 space-y-4 text-right rtl:text-right ltr:text-left">
              <div className="bg-red-50/40 border border-red-100 p-4 rounded-none space-y-1">
                <span className="text-[10px] font-mono font-bold text-red-800 block uppercase">
                  {isAr ? 'إجمالي الأصول المقيدة والمجمدة عالمياً' : 'TOTAL ESTIMATED FROZEN ASSETS'}
                </span>
                <span className="text-3xl md:text-4xl font-sans font-black text-red-900">
                  $100B - $120B
                </span>
                <p className="text-xs text-zinc-650 font-serif leading-relaxed">
                  {isAr 
                    ? 'تتفاوت التقديرات الرسمية نظراً للسرية والتحويلات لحسابات الضمان المقيدة (Escrow Accounts) المخصصة للأغراض الإنسانية وشراء السلع التموينية والطبية.'
                    : 'Official estimates fluctuate due to bank secrecy, exchange rates, and assets parked in restricted Escrow accounts for humanitarian goods and medical transactions.'}
                </p>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="border-b border-zinc-200 pb-1.5 flex justify-between items-center">
                  <span className="text-zinc-400">{isAr ? 'المستوى الأول (كلي):' : 'Level 1 (Sweeping Freezes):'}</span>
                  <span className="font-bold text-zinc-800">{isAr ? 'مجمد كلياً بقرارات أمريكية ومحاكم' : 'Strictly frozen by executive orders'}</span>
                </div>
                <div className="border-b border-zinc-200 pb-1.5 flex justify-between items-center">
                  <span className="text-zinc-400">{isAr ? 'المستوى الثاني (مقيد):' : 'Level 2 (Conditional Escrow):'}</span>
                  <span className="font-bold text-zinc-800">{isAr ? 'مقايضات تجارية وسلع إنسانية خاضعة للرقابة' : 'Barter-only restricted accounts'}</span>
                </div>
              </div>
            </div>

            {/* Recharts Bar Chart */}
            <div className="md:col-span-7 bg-white p-4 border border-zinc-200 h-80 relative flex flex-col justify-between">
              <span className="text-xxs font-mono font-bold text-zinc-400 absolute top-2 right-2 uppercase">
                {isAr ? 'توزيع الأرصدة (بالمليار دولار) - تقديرات محدثة' : 'ASSET RESERVES DISTRIBUTION ($ BILLIONS) - CURRENT ESTIMATES'}
              </span>
              <div className="h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={chartData} 
                    layout="vertical"
                    margin={{ top: 5, right: 10, left: isAr ? 20 : 0, bottom: 5 }}
                  >
                    <XAxis type="number" stroke="#a1a1aa" fontSize={10} />
                    <YAxis 
                      dataKey={isAr ? "nameAr" : "nameEn"} 
                      type="category" 
                      stroke="#a1a1aa" 
                      fontSize={10} 
                      width={isAr ? 85 : 120}
                      orientation={isAr ? "right" : "left"}
                    />
                    <Tooltip 
                      formatter={(value: any) => [`$${value}B`, isAr ? 'الحجم التقريبي' : 'Approx. Volume']}
                      contentStyle={{ fontFamily: 'monospace', fontSize: '11px', background: '#ffffff', border: '1px solid #e4e4e7' }}
                    />
                    <Bar dataKey="amount" fill="#b91c1c" radius={0}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] font-mono text-zinc-400 text-center uppercase">
                {isAr ? 'انقر على علامة التبويب "التوزيع الجغرافي" بالخارج لاستعراض تفاصيل حجز كل دولة.' : 'Switch to the "Geographical Distribution" tab to inspect detailed country data.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Distribution / Interactive Selector */}
      {activeTab === 'distribution' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Country buttons list */}
            <div className="md:col-span-4 space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
              <span className="text-xxs font-mono font-black text-zinc-400 tracking-wider uppercase block mb-2">
                {isAr ? 'اختر الدولة / الكيان المحتجز:' : 'SELECT HOLDING COUNTRY / ENTITY:'}
              </span>
              {chartData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCountry(item.id)}
                  className={`w-full text-right rtl:text-right ltr:text-left p-2.5 text-xs font-sans transition-all flex items-center justify-between border cursor-pointer rounded-none ${
                    selectedCountry === item.id
                      ? 'border-red-800 bg-red-800 text-white font-bold'
                      : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
                  }`}
                >
                  <span className="font-semibold">{isAr ? item.nameAr : item.nameEn}</span>
                  <span className={`font-mono text-[10px] font-black px-1.5 py-0.5 rounded-none ${
                    selectedCountry === item.id ? 'bg-white/20 text-white' : 'bg-red-50 text-red-800'
                  }`}>
                    {isAr ? item.rangeAr : item.rangeEn}
                  </span>
                </button>
              ))}
            </div>

            {/* Country Detail Display Box */}
            <div className="md:col-span-8 border border-zinc-200 bg-white p-5 space-y-4 text-right rtl:text-right ltr:text-left flex flex-col justify-between">
              {(() => {
                const activeData = chartData.find(c => c.id === selectedCountry) || chartData[0];
                return (
                  <>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                        <span className="bg-zinc-950 text-white font-mono text-[9px] font-bold px-2 py-0.5">
                          SECURE FILE RECORD: {activeData.id.toUpperCase()}
                        </span>
                        <span className="font-mono text-xs font-bold text-red-800 uppercase">
                          {isAr ? 'التقدير التقريبي' : 'ESTIMATED RANGE'} : {isAr ? activeData.rangeAr : activeData.rangeEn}
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-zinc-900 font-sans flex items-center gap-2">
                        <MapPin size={18} className="text-red-800 animate-pulse" />
                        {isAr ? activeData.nameAr : activeData.nameEn}
                      </h4>

                      <div className="bg-amber-50/50 p-3.5 border-r-4 border-red-800 font-serif text-sm md:text-base leading-relaxed text-zinc-800 italic">
                        {isAr ? activeData.descAr : activeData.descEn}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-dashed border-zinc-200 grid grid-cols-2 gap-3 text-xxs font-mono text-zinc-500">
                      <div>
                        <span>{isAr ? 'الحالة المصرفية:' : 'Banking Status:'}</span>
                        <span className="font-bold text-zinc-800 block uppercase">
                          {activeData.id === 'china' || activeData.id === 'iraq' ? (isAr ? 'مقاصة مقيدة / سلع' : 'Restricted Escrow / Barter') :
                           activeData.id === 'south-korea' ? (isAr ? 'مستودع ضمان مشروط في قطر' : 'Conditional Custody in Qatar') :
                           activeData.id === 'luxembourg' ? (isAr ? 'نزاع سندات معلق' : 'Pending Bond Litigation') :
                           (isAr ? 'تجميد سيادي كامل بموجب OFAC' : 'Full Sovereign Freeze via OFAC')}
                        </span>
                      </div>
                      <div>
                        <span>{isAr ? 'جهة الإشراف والتحقق:' : 'Supervision Authority:'}</span>
                        <span className="font-bold text-zinc-800 block uppercase">
                          {activeData.id === 'usa' || activeData.id === 'south-korea' || activeData.id === 'iraq' ? 'US Treasury OFAC' : 'National Banks & CBI'}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="relative border-r md:border-r-0 md:before:absolute md:before:inset-y-0 md:before:left-1/2 md:before:w-[2px] md:before:bg-zinc-200 pr-6 md:pr-0">
            {timelineEvents.map((event, idx) => {
              const IconComp = event.icon;
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-col md:flex-row items-stretch md:justify-between mb-8 md:mb-10 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline node badge on line */}
                  <div className="absolute right-[-31px] md:left-1/2 md:right-auto md:translate-x-[-50%] top-0 w-8 h-8 rounded-full border-2 border-red-800 bg-white flex items-center justify-center text-red-800 shadow-sm z-10">
                    <IconComp size={14} />
                  </div>

                  {/* Content Box */}
                  <div className="w-full md:w-[45%] border border-zinc-200 bg-white p-4 shadow-sm space-y-2 text-right rtl:text-right ltr:text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-red-800 bg-red-100/40 px-2.5 py-0.5 rounded-none">
                        {isAr ? event.periodAr : event.periodEn}
                      </span>
                      <span className="font-mono text-[9px] text-zinc-400 font-bold">
                        WAVE 0{idx + 1}
                      </span>
                    </div>
                    <h4 className="text-sm md:text-base font-black text-zinc-900 font-sans">
                      {isAr ? event.titleAr : event.titleEn}
                    </h4>
                    <p className="text-xs text-zinc-650 leading-relaxed font-serif">
                      {isAr ? event.descAr : event.descEn}
                    </p>
                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] font-bold text-zinc-500 font-mono">
                      <span>{isAr ? 'السمة الأساسية:' : 'Core Attribute:'}</span>
                      <span className="text-red-900">{isAr ? event.statusAr : event.statusEn}</span>
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop balance */}
                  <div className="hidden md:block w-[45%]"></div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Legal Context */}
      {activeTab === 'legal' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legalFrameworks.map((law, idx) => (
            <div 
              key={idx} 
              className="border border-zinc-200 bg-white p-4 space-y-3 shadow-sm text-right rtl:text-right ltr:text-left flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="font-mono text-[9px] font-black text-red-800 bg-red-50 px-2 py-0.5 uppercase block w-max">
                  {isAr ? `البند القانوني 0${idx + 1}` : `LEGAL RECORD 0${idx + 1}`}
                </span>
                <h4 className="text-xs md:text-sm font-black text-zinc-900 font-sans border-b border-zinc-100 pb-1">
                  {isAr ? law.titleAr : law.titleEn}
                </h4>
                <p className="text-xs text-zinc-650 leading-relaxed font-serif">
                  {isAr ? law.descAr : law.descEn}
                </p>
              </div>
              <div className="pt-3 border-t border-dashed border-zinc-200 text-xxs font-mono text-zinc-400 flex items-center gap-1">
                <Scale size={10} />
                <span>{isAr ? 'مرجع قانوني وسيادي معتمد' : 'Verified Legal Jurisdiction Record'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Geopolitics & Management */}
      {activeTab === 'geopolitics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Left side: Management Channels */}
            <div className="border border-zinc-200 bg-white p-5 space-y-4 text-right rtl:text-right ltr:text-left">
              <h4 className="text-sm md:text-base font-black text-zinc-900 font-sans flex items-center gap-2 border-b border-zinc-200 pb-2">
                <TrendingUp size={16} className="text-red-800" />
                {isAr ? 'آليات تسييل وإدارة الأموال المجمدة' : 'Restricted Liquidation & Financial Channels'}
              </h4>
              <p className="text-xs text-zinc-650 font-serif leading-relaxed">
                {isAr 
                  ? 'لا تظل الأموال المجمدة راكدة بالكامل؛ بل تخضع لإجراءات إدارة مالية استثنائية لمنع تآكل قيمتها أو لتوظيفها في حسابات الضمان المقيدة (Escrow Accounts) كقناة سداد إنسانية.'
                  : 'Sovereign frozen assets are not entirely stagnant. They undergo special financial custody measures, such as low-risk Treasury bond allocations, or are channeled into restricted Escrow accounts for humanitarian trade.'}
              </p>

              <div className="space-y-3 font-mono text-xxs">
                <div className="bg-zinc-50 p-2.5 border-r-2 border-red-800">
                  <span className="font-bold text-zinc-800 block mb-0.5">{isAr ? 'الاستثمار في السندات الحكومية قصيرة الأجل' : 'Short-Term Sovereign Bond Investment'}</span>
                  <span className="text-zinc-500">{isAr ? 'يتم الاحتفاظ ببعض الأصول في شكل سندات خزانة قصيرة الأجل تدر فوائد بسيطة تضاف إلى أصل الأرصدة.' : 'Some funds are stored as short-term treasury bills earning modest yields, added to the principal balance.'}</span>
                </div>
                <div className="bg-zinc-50 p-2.5 border-r-2 border-red-800">
                  <span className="font-bold text-zinc-800 block mb-0.5">{isAr ? 'حسابات الضمان المقيدة للاستخدام الإنساني' : 'Restricted Escrow Trust Funds'}</span>
                  <span className="text-zinc-500">{isAr ? 'تتم تسوية الواردات الغذائية والطبية مباشرة عبر مصارف وسيطة بدول ثالثة (مثل بنوك قطر والبنك السويسري) دون ملامسة النقد.' : 'Payments are made directly from third-country trustee banks (e.g., Qatar/Switzerland) to suppliers of food and medicine.'}</span>
                </div>
              </div>
            </div>

            {/* Right side: Geopolitical Outcomes */}
            <div className="border border-zinc-200 bg-zinc-950 p-5 space-y-4 text-right rtl:text-right ltr:text-left text-white shadow-md">
              <h4 className="text-sm md:text-base font-black text-amber-400 font-sans flex items-center gap-2 border-b border-zinc-850 pb-2">
                <Globe size={16} className="text-amber-400 animate-pulse" />
                {isAr ? 'الخلاصة الجيوسياسية والاستنتاج' : 'Geopolitical Synthesis & Outlook'}
              </h4>
              <p className="text-xs text-zinc-400 font-serif leading-relaxed">
                {isAr 
                  ? 'تمثل الأصول الإيرانية المجمدة أداة كلاسيكية لصراع الهيمنة في العلاقات الدولية الحديثة. يبرز هذا الملف التنافس الشديد بين فكرة "السيادة الوطنية" وحصانة البنوك المركزية وبين "التشريعات المحلية العابرة للحدود" التي تفرضها الولايات المتحدة لقوتها المهيمنة على شبكة المقاصة المصرفية العالمية.'
                  : 'Sovereign frozen assets remain a core leverage tool in modern diplomatic conflict. It highlights a structural clash between traditional international principles of sovereign state immunity and the extraterritorial domestic laws enforced via US supremacy over the global banking network.'}
              </p>

              <div className="p-3.5 bg-zinc-900 border border-zinc-800 font-serif text-xs leading-relaxed text-amber-200 italic">
                {isAr 
                  ? '✦ في نهاية المطاف، لن تتم عملية فك التجميد الشامل والشامل عن هذه المليارات الوطنية عبر أروقة المحاكم الدولية، بل عبر صفقات سياسية كبرى معقدة تعيد صياغة الملف النووي والاتفاقيات الإقليمية.'
                  : '✦ Ultimately, the sweeping release of these billions will not materialize in international courtrooms, but rather through grand political bargains restructuring nuclear protocols and regional defense arrangements.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
