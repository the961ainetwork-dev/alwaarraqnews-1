import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Calendar, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  Globe, 
  Award, 
  Megaphone,
  Briefcase,
  Layers,
  Crown,
  BookOpen,
  Mail,
  Printer,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface PressReleasesProps {
  language: 'ar' | 'en';
}

export interface PressReleaseItem {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  dateEn: string;
  dateAr: string;
  locationEn: string;
  locationAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
}

export const PRESS_RELEASES: PressReleaseItem[] = [
  {
    id: 'launch-geopolitical-suites-2026',
    titleEn: 'Al-Warraq Gazette Unveils Integrated Geopolitical Decision Suites, Immersive "War Room," & Golden Prime Sovereign Subscriptions',
    titleAr: 'جريدة الوراق تكشف النقاب عن باقة أدوات القرار الجيوسياسي المتكاملة، "غرفة الحرب" التفاعلية، واشتراكات "العصر الذهبي" السيادية',
    categoryEn: 'CORPORATE & PRODUCT ANNOUNCEMENT',
    categoryAr: 'إعلان الشركة والمنتجات السيادية',
    dateEn: 'June 28, 2026',
    dateAr: '٢٨ يونيو ٢٠٢٦',
    locationEn: 'Beirut, Lebanon',
    locationAr: 'بيروت، لبنان',
    excerptEn: 'Al-Warraq Gazette officially launches its advanced intelligence expansion, introducing the interactive "What-If" Geopolitical Simulator, deep "Sovereign Investigations" archive, the real-time "War Room" tactical feed, and the elite "Golden Prime" workspace.',
    excerptAr: 'أعلنت جريدة الوراق رسمياً عن توسعها الاستخباراتي المتقدم، مطلقة محاكي تقدير المواقف الجيوسياسي "ماذا لو" التفاعلي، وأرشيف "التحقيقات السيادية" العميقة، ومركز رصد "غرفة الحرب" الفوري، وبوابة أعمال "العصر الذهبي" المخصصة للنخبة.',
    contentEn: `**BEIRUT, LEBANON — June 28, 2026** — Al-Warraq Gazette, the Levant's premier independent chronicle of political economy and sovereign intelligence, today announced the global deployment of its most ambitious digital expansion to date: the **Al-Warraq Geopolitical Decision Suite**. 

This comprehensive intelligence ecosystem has been engineered specifically to equip policymakers, sovereign wealth managers, risk analysts, and credentialed journalists with objective quantitative modeling and elite narrative reporting on Middle Eastern affairs.

The release integrates four pillar platforms designed for modern, high-stakes decision-making:

### 1. The Geopolitical "What If" Simulator
An interactive predictive-market sandbox utilizing state-of-the-art regional parameters. Users can simulate micro-level policy adjustments—including Gulf oil pipeline expansions, telecom privatization frameworks, and joint-GCC border customs integrations—and immediately generate tailored probability forecasts, identifying economic winners and losers with structural market strategy briefings.

### 2. The Sovereign Investigations Bureau (AlWarraq Investigations)
A deep-archive investigative repository exposing the critical, under-the-surface economic mechanics of the region. Featured dossiers include the comprehensive geological and geopolitical analysis of the South Lebanon maritime boundary demarcations and the high-stakes boardroom conflicts surrounding the historic Solidere real-estate extension decrees through the year 2069. Each dossier features real-time text-to-speech audio narration and precise word-count metrics.

### 3. The Interactive "War Room" Tactical Dashboard
A highly secure, simulated military-economic intercept hub monitoring the ongoing US-Iran geopolitical tension. The War Room fuses real-time intelligence briefs, shipping blockade risk models, and cyber-warfare reports with live maritime telemetry of the Strait of Hormuz, offering unprecedented tactical transparency.

### 4. The Elite "Golden Prime" Workspace & Subscription
The ultimate subscription gateway for sovereign entities. Subscribers receive unrestricted access to all investigative briefs, live telex feeds, custom-curated daily summaries, real-time economic indicators, and carbon-telex breaking notifications.

"True sovereign stability is born from information sovereignty," said the Editorial Board of Al-Warraq. "With this integrated suite, we are shifting the paradigm from reactive crisis reporting to predictive intelligence. Al-Warraq remains the ultimate chronicle of truth in an age of colorful noise."`,
    contentAr: `**بيروت، لبنان — ٢٨ يونيو ٢٠٢٦** — أعلنت جريدة الورّاق، الصحيفة السيادية المستقلة الرائدة في شؤون الاقتصاد السياسي والاستخبارات المالية في المشرق العربي، اليوم عن الإطلاق الرسمي لأكبر توسع رقمي في تاريخها: **باقة أدوات القرار الجيوسياسي المتكاملة من الوراق**.

تم تصميم هذه البيئة الاستخباراتية الشاملة وهندستها خصيصاً لتزويد صانعي السياسات، ومدراء الصناديق السيادية، ومحللي المخاطر، والصحفيين المعتمدين، بنماذج تقدير كمية موضوعية وتقارير استقصائية معمقة حول الشؤون الاستراتيجية والاقتصادية في الشرق الأوسط.

يشتمل الإصدار الجديد على أربعة أركان أساسية تخدم دوائر القرار رفيعة المستوى:

### ١. محاكي تقدير المواقف "ماذا لو" الجيوسياسي
بيئة محاكاة تفاعلية تعتمد على مؤشرات دقيقة ومحدثة لأسواق التنبؤات. يمكن للمستخدمين صياغة سيناريوهات مخصصة أو تعديل متغيرات حية—مثل مسارات أنابيب التفاف النفط، وخصخصة شبكات الاتصالات اللبنانية، والتكامل الجمركي الخليجي—والحصول فوراً على تقييم فوري لنسب الاستقرار والجدوى الاقتصادية والرابحين والخاسرين من القرار.

### ٢. منبر التحقيقات الاستقصائية السيادية (AlWarraq Investigations)
مستودع الأرشيف العميق الذي يكشف آليات الاقتصاد الخفية في المنطقة. يضم المنبر تحقيقات حصرية تتناول التحليلات الجيولوجية والجيوسياسية لترسيم الحدود البحرية اللبنانية، وصراعات الاستحواذ العقاري في وسط بيروت الممتدة بمرسوم رسمي حتى عام ٢٠٦٩. تتميز الملفات بخدمة القراءة الصوتية الذكية وحساب دقيق لأوقات المطالعة.

### ٣. لوحة تحكم تكتيكية حية لـ "غرفة الحرب"
مركز رصد تفاعلي تخصصي يتابع التوترات والسيناريوهات العسكرية والاقتصادية الدائرة بين الولايات المتحدة وإيران والمحاور التابعة لهما. تضم غرفة الحرب تقارير اعتراض استخباراتي مباشر، ونماذج تقدير مخاطر إغلاق المضائق البحرية، وتأثير الهجمات السيبرانية على تدفق الشحن مع رادارات ملاحة حية لمضيق هرمز.

### ٤. اشتراكات ومساحة أعمال "العصر الذهبي" النخبوية (Golden Prime)
الاشتراك السيادي الأرقى الذي يمنح صناديق الاستثمار والمؤسسات السيادية وصولاً غير محدود لكل تحقيقات الورّاق، وتيليكس الإشعارات العاجلة، والنشرة البريدية المتخصصة، ولوحة تحكم مخصصة لإدارة المحافظ الاستثمارية وأدوات التحليل الذكية.

وصرحت هيئة تحرير صحيفة الوراق في بيانها المشترك: "الاستقرار السيادي الحقيقي ينبع من السيادة المعرفية والمعلوماتية. من خلال هذه الباقة المتكاملة، نتحول بجريدتنا من مجرد ناقل للأحداث إلى شريك في استشراف واستباق الأزمات الاقتصادية والجيوسياسية."`
  },
  {
    id: 'sovereign-reserve-interview-2026',
    titleEn: 'Al-Warraq to Publish Exclusive Interview with Governor of sovereign reserve Treasury on Gold Assets',
    titleAr: 'الورّاق تنشر غداً حواراً خاصاً مع حاكم الخزينة السيادية حول الاحتياطيات الذهبية والسيولة المتاحة',
    categoryEn: 'EDITORIAL UPDATES',
    categoryAr: 'تحديثات هيئة التحرير',
    dateEn: 'June 20, 2026',
    dateAr: '٢٠ يونيو ٢٠٢٦',
    locationEn: 'Beirut, Lebanon',
    locationAr: 'بيروت، لبنان',
    excerptEn: 'An upcoming exclusive discussion focusing on the stability of the Lebanese Gold Reserves, currency pegs, and strategic sovereign hedges.',
    excerptAr: 'حوار مرتقب يسلط الضوء على سلامة واستقرار الاحتياطيات الذهبية اللبنانية، ومستقبل ربط العملة، والتحوطات الاستراتيجية المتبعة بالخزينة.',
    contentEn: `Following rumors of regional asset reallocations, Al-Warraq's senior economic editor has secured an exclusive sit-down interview with the Governor of the sovereign reserve Treasury. 

The interview, slated for release in tomorrow's morning printed edition and digital portal, will directly address:
- **Gold Auditing Standards:** The official confirmation of the safety of physical gold bullion currently secured in overseas vaults.
- **Liquidity Buffer Reserves:** The exact figures of usable foreign exchange reserves and tactical hedges against regional hyper-inflation.
- **Currency Stabilization Policies:** Future paths for the unified exchange rate under strict IMF structural benchmarks.

This press release serves as an official notice for financial markets and banking syndicates to expect major policy updates.`,
    contentAr: `على إثر انتشار شائعات حول إعادة تخصيص الأصول السيادية الإقليمية، نجح المحرر المالي لصحيفة الوراق في إجراء مقابلة استثنائية حصرية مع حاكم الخزينة السيادية.

المقابلة، التي ستنشر في طبعة الغد الورقية والنسخة الرقمية، ستجيب مباشرة على:
- **معايير تدقيق الذهب:** التأكيد الرسمي لسلامة وموثوقية سبائك الذهب المادي المودعة في الخزائن الآمنة الخارجية.
- **هوامش السيولة المتاحة:** الأرقام الدقيقة للاحتياطيات النقدية القابلة للاستخدام والتحوطات التكتيكية المتبعة لمواجهة التضخم الإقليمي.
- **سياسات تثبيت العملة:** المسارات المستقبلية المتاحة لسعر الصرف الموحد بموجب تفاهمات صندوق النقد الدولي.

يعتبر هذا الإيجاز الصحفي إشعاراً رسمياً للأسواق المالية والمصارف لترقب تطورات جوهرية.`
  }
];

export default function PressReleases({ language }: PressReleasesProps) {
  const isAr = language === 'ar';
  const [selectedReleaseId, setSelectedReleaseId] = useState<string>('launch-geopolitical-suites-2026');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeRelease = PRESS_RELEASES.find(r => r.id === selectedReleaseId) || PRESS_RELEASES[0];

  const filteredReleases = useMemo(() => {
    return PRESS_RELEASES.filter(r => {
      const title = isAr ? r.titleAr : r.titleEn;
      const excerpt = isAr ? r.excerptAr : r.excerptEn;
      const query = searchQuery.toLowerCase();
      
      return !query || 
        title.toLowerCase().includes(query) || 
        excerpt.toLowerCase().includes(query) ||
        r.id.toLowerCase().includes(query);
    });
  }, [searchQuery, isAr]);

  const getReadTimeEstimate = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / (isAr ? 150 : 200)));
    return {
      minutes,
      words,
      display: isAr 
        ? `${minutes} دقائق قراءة (${words.toLocaleString()} كلمة)` 
        : `${minutes} min read (${words.toLocaleString()} words)`
    };
  };

  const readTimeEstimate = useMemo(() => {
    const text = isAr ? activeRelease.contentAr : activeRelease.contentEn;
    return getReadTimeEstimate(text);
  }, [activeRelease, isAr]);

  return (
    <div id="press-releases-container" className="bg-[#fcfbf9] text-[#1c1917] min-h-screen border border-[#e7e5e4] p-4 md:p-8 font-serif transition-all">
      
      {/* Press Header */}
      <div className="border-b-4 border-double border-stone-800 pb-6 mb-8 text-center md:text-right rtl:text-right ltr:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
          <Megaphone size={16} className="text-[#b91c1c]" />
          <span className="text-[11px] font-sans font-extrabold text-[#b91c1c] tracking-widest uppercase">
            {isAr ? 'مكتب النشر الصحفي والإعلامي' : 'AL-WARRAQ PRESS-WIRE SERVICES'}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-sans font-black text-stone-900 tracking-tight leading-none uppercase">
          {isAr ? 'البيانات الصحفية الرسمية' : 'Sovereign Press Releases'}
        </h1>
        <p className="text-xs md:text-sm text-stone-500 mt-2.5 font-serif italic max-w-3xl">
          {isAr 
            ? 'البيانات والإعلانات الصادرة رسمياً عن الإدارة وهيئة تحرير صحيفة الوراق لجمهور القراء والشركاء والمؤسسات المالية.' 
            : 'Official statements, platform upgrades, and product announcements published by the management and editorial boards of Al-Warraq.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Releases Feed Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Search box */}
          <div className="bg-white border border-[#e7e5e4] p-4 rounded shadow-sm space-y-2.5">
            <h3 className="text-xs font-sans font-black text-stone-700 uppercase tracking-wider">
              {isAr ? 'البحث في بيانات الصحافة' : 'SEARCH PRESS RELEASES'}
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder={isAr ? 'ابحث في البيانات...' : 'Search releases...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded text-xs py-2 px-3 pl-8 rtl:pl-3 rtl:pr-8 focus:outline-none focus:border-[#b91c1c] font-sans transition-colors"
              />
              <Search size={13} className="absolute left-2.5 top-2.5 text-stone-400 rtl:left-auto rtl:right-2.5" />
            </div>
          </div>

          {/* List of Releases */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-sans font-black text-stone-500 tracking-wider uppercase">
              {isAr ? 'أحدث البيانات المنشورة' : 'PUBLISHED WIRE CORRIDORS'}
            </h3>

            {filteredReleases.length === 0 ? (
              <div className="border border-dashed border-stone-300 p-8 text-center text-xs text-stone-400 font-sans">
                {isAr ? 'لم يتم العثور على بيانات صحفية.' : 'No press releases matched.'}
              </div>
            ) : (
              filteredReleases.map((release) => {
                const isActive = release.id === selectedReleaseId;
                const title = isAr ? release.titleAr : release.titleEn;
                const category = isAr ? release.categoryAr : release.categoryEn;
                const location = isAr ? release.locationAr : release.locationEn;
                const date = isAr ? release.dateAr : release.dateEn;

                return (
                  <button
                    key={release.id}
                    onClick={() => setSelectedReleaseId(release.id)}
                    className={`w-full text-left rtl:text-right p-4 rounded border transition-all duration-200 cursor-pointer flex flex-col gap-2 relative group ${
                      isActive 
                        ? 'bg-stone-100 border-[#b91c1c] shadow-sm text-stone-900' 
                        : 'bg-white border-[#e7e5e4] text-stone-700 hover:bg-stone-50 hover:border-stone-400'
                    }`}
                  >
                    {/* Visual Border Accent */}
                    {isActive && (
                      <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#b91c1c]" />
                    )}

                    <div className="flex justify-between items-center text-[9px] font-sans font-bold text-[#b91c1c]">
                      <span>{category}</span>
                      <span className="text-stone-400">{date}</span>
                    </div>

                    <h4 className="font-sans font-black text-xs md:text-sm leading-snug group-hover:text-[#b91c1c] transition-colors">
                      {title}
                    </h4>

                    <p className="text-[11px] text-stone-500 line-clamp-3 leading-relaxed">
                      {isAr ? release.excerptAr : release.excerptEn}
                    </p>

                    <div className="border-t border-stone-100 pt-2 flex justify-between items-center text-[9px] font-sans font-bold text-stone-400">
                      <span>{location}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={8} />
                        {getReadTimeEstimate(isAr ? release.contentAr : release.contentEn).minutes} min
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Classic Print Tradition Widget */}
          <div className="bg-stone-50 border border-stone-300 p-4 rounded text-stone-700 font-sans">
            <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider mb-2">
              {isAr ? 'منصة الإعلام الموثوقة' : 'Sovereign Press Bureau'}
            </h4>
            <p className="text-[11px] leading-relaxed text-stone-600 font-serif italic">
              {isAr 
                ? 'تلتزم جريدة الورّاق بتقديم بيانات صحفية مدققة وموقعة بالترميز الرقمي لضمان السيادة المعرفية ومكافحة الشائعات المالية والاقتصادية في بلاد الشام والخليج.' 
                : 'The Al-Warraq Press Bureau ensures all platform updates, investigative schedules, and structural indices are logged on-wire with pristine validation.'}
            </p>
          </div>

        </div>

        {/* Right Side: Immersive Press Release Document View (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="bg-white border-2 border-stone-200 rounded p-6 md:p-8 space-y-6 shadow-sm select-text">
            
            {/* Document Header */}
            <div className="border-b border-stone-200 pb-5 space-y-3">
              <div className="flex flex-wrap items-center gap-2 select-none">
                <span className="bg-[#b91c1c] text-white text-[10px] font-sans font-black px-2 py-0.5 rounded tracking-wider">
                  {isAr ? activeRelease.categoryAr : activeRelease.categoryEn}
                </span>
                <span className="text-stone-400 font-sans text-xs font-bold">
                  {isAr ? activeRelease.locationAr : activeRelease.locationEn} | {isAr ? activeRelease.dateAr : activeRelease.dateEn}
                </span>
              </div>
              
              <h2 className="text-xl md:text-3xl font-sans font-black text-stone-900 leading-tight">
                {isAr ? activeRelease.titleAr : activeRelease.titleEn}
              </h2>
            </div>

            {/* Read Time Summary Badge */}
            <div className="p-3 bg-stone-50 border-r-4 border-stone-400 rounded flex flex-col md:flex-row md:items-center justify-between gap-3 text-stone-600">
              <div className="space-y-0.5">
                <span className="text-[10px] font-sans font-black text-[#b91c1c] block uppercase tracking-wide">
                  {isAr ? '● مقتطف بياني' : '● PRESS SYNOPSIS'}
                </span>
                <p className="text-xs font-sans font-semibold text-stone-800 italic">
                  {isAr ? activeRelease.excerptAr : activeRelease.excerptEn}
                </p>
              </div>
              <div className="shrink-0 text-right md:text-left font-sans text-[10px] bg-stone-200/50 px-2.5 py-1 rounded">
                <span className="font-bold block text-stone-800">{readTimeEstimate.minutes} min read</span>
                <span className="text-[8px] text-stone-500 font-bold block">{readTimeEstimate.words} {isAr ? 'كلمة' : 'words'}</span>
              </div>
            </div>

            {/* Full Document Body with high typographic quality */}
            <div className="text-stone-800 space-y-5 leading-relaxed text-sm md:text-base border-b border-stone-200 pb-6 font-serif select-text">
              {(isAr ? activeRelease.contentAr : activeRelease.contentEn).split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('###')) {
                  const heading = paragraph.replace('###', '').trim();
                  return (
                    <h3 key={index} className="text-stone-900 font-sans font-black text-base md:text-lg tracking-tight border-b border-stone-200 pb-1 pt-3">
                      {heading}
                    </h3>
                  );
                }

                // Parse bold text
                const boldParts = paragraph.split('**');
                if (boldParts.length > 2) {
                  return (
                    <p key={index} className="leading-relaxed">
                      {boldParts.map((part, pIdx) => {
                        if (pIdx % 2 === 1) {
                          return <strong key={pIdx} className="text-stone-950 font-sans font-black">{part}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  );
                }

                return (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Bureau Signature Contact Info */}
            <div className="pt-4 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-stone-500 font-sans gap-4 select-none">
              <div className="space-y-1">
                <span className="font-bold text-stone-700 block">{isAr ? 'مكتب الشؤون الصحفية بالوراق' : 'Al-Warraq Media Relations Office'}</span>
                <span className="block font-serif italic">{isAr ? 'البريد الإلكتروني: press@alwarraqnews.com' : 'E-mail: press@alwarraqnews.com'}</span>
              </div>
              <div className="text-right md:text-left text-[10px] border-t md:border-t-0 md:border-l border-stone-200 pt-3 md:pt-0 md:pl-4">
                <span className="block text-stone-400">ARCHIVE ID: #PR-WIRE-{activeRelease.id.substring(0, 8).toUpperCase()}</span>
                <span className="block text-stone-400">SYSTEM: VERIFIED PRESS SCRIPT</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
