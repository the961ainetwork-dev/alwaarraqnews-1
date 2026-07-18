import React, { useState, useMemo } from 'react';
import { 
  AlertCircle, 
  TrendingDown, 
  TrendingUp, 
  Globe, 
  Cpu, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Share2, 
  BookOpen, 
  Activity, 
  DollarSign, 
  Award,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Printer,
  Download,
  Check,
  Mail,
  Phone,
  ShieldAlert,
  Send
} from 'lucide-react';
import { Article } from '../types';
import { NEW_ARTICLES } from '../newArticles';

interface UrgentReleaseProps {
  language: 'ar' | 'en';
  onNavigateToSection: (sectionId: string) => void;
  onSelectArticle: (article: Article) => void;
  savedArticleIds: string[];
  onToggleSaveArticle: (article: Article, e: React.MouseEvent) => void;
}

export default function UrgentRelease({
  language,
  onNavigateToSection,
  onSelectArticle,
  savedArticleIds,
  onToggleSaveArticle
}: UrgentReleaseProps) {
  const isAr = language === 'ar';

  // State management
  const [selectedDocket, setSelectedDocket] = useState<'chips' | 'iraq'>('chips');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [pdfCompiling, setPdfCompiling] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);
  const [pdfStatusMsg, setPdfStatusMsg] = useState('');

  // Find the Silicon Valley chip story
  const mainArticle = useMemo(() => {
    return NEW_ARTICLES.find(a => a.id === 'silicon-valley-chips-earthquake-2026') || NEW_ARTICLES[0];
  }, []);

  // Define the Iraq-US $60 Billion Sovereign Investment Package Special Report
  const iraqArticle = useMemo(() => {
    return {
      id: 'iraq-us-investment-alignment-2026',
      slug: 'iraq-us-investment-alignment-2026',
      category: 'urgent-release',
      titleAr: 'أبرز الاتفاقيات الاستثمارية الموقعة بين العراق والولايات المتحدة بـ 60 مليار دولار',
      titleEn: '$60 Billion Sovereign Agreements: The Landmark Iraq-US Investment Corridor',
      summaryAr: 'تفاصيل تاريخية للاتفاقيات الموقعة خلال زيارة رئيس الوزراء علي الزيدي إلى واشنطن لتغطية قطاعات النفط، الغاز، الاتصالات والتمويل، بمشاركة كونوكو فيليبس وإكسون لإنهاء التبعية للغاز الإيراني بحلول نهاية سبتمبر.',
      summaryEn: 'Complete strategic intelligence brief on the $60B investment agreements signed in Washington under PM Ali Al-Zaidy and President Trump, detailing ConocoPhillips, ExxonMobil, and Chevron in Kirkuk and Faw.',
      author: {
        nameAr: 'علي بن الورّاق',
        nameEn: 'Ali bin Al-Warraq',
        titleAr: 'رئيس وحدة أبحاث الطاقة والنفط الإقليمية',
        titleEn: 'Chief Regional Energy & Oil Analyst',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      },
      imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200', // Heavy industrial petrochemical plant/refinery
      date: '2026-07-18',
      readTimeAr: 'دقائق القراءة - 4',
      readTimeEn: '4 min read',
      tags: ['العراق', 'الولايات_المتحدة', 'كونوكو_فيليبس', 'إكسون_موبيل', 'شيفرون', 'كركوك', 'الفاو', 'طريق_التنمية', 'الغاز_اليراني', 'Iraq', 'USA', 'ConocoPhillips', 'ExxonMobil', 'Chevron', 'Kirkuk', 'Faw_Energy_City', 'Energy_Security'],
      hashtags: ['IraqUSDeals', 'EnergySecurity', 'KirkukOverhaul', 'FawEnergyCity'],
      contentAr: `### شركات أميركية توقع اتفاقيات لاستثمار 60 مليار دولار في العراق
ضمت شركة "كونوكو فيليبس" إلى عشرات الشركات الأميركية العاملة في قطاعات الطاقة والرعاية الصحية والتمويل والتكنولوجيا لتوقيع اتفاقيات بقيمة تقارب 60 مليار دولار، في خطوة تستهدف دعم الاقتصاد العراقي.

جاءت هذه الاتفاقيات في ختام زيارة استمرت أسبوعاً لرئيس الوزراء العراقي علي الزيدي إلى واشنطن، حيث تعهد الرئيس الأميركي دونالد ترمب بإبرام صفقات نفطية "ضخمة" مع العراق، أحد أقدم منتجي النفط في منظمة "أوبك".

سعى الزيدي خلال الزيارة إلى جذب الاستثمارات الأميركية وإعادة تقديم العراق باعتباره بلداً مستقراً وجاذباً للأعمال.

تأتي هذه الاجتماعات بعد أكثر من أربعة أشهر من التوتر بين الولايات المتحدة وإيران، والذي أدى إلى اضطراب حركة الشحن والنشاط الصناعي والنمو الاقتصادي في منطقة الخليج العربي وخارجها.

> "سعينا الأساسي في العراق هو استقطاب شركاء استراتيجيين لا مجرد مقاولين، لخلق بيئة تنموية مستدامة وحماية سيادتنا الوطنية." - علي الزيدي، رئيس وزراء العراق

### من الصراع إلى التجارة والاستثمار
مثّلت المحادثات بين إدارة الرئيس الأميركي ترمب ورئيس الوزراء العراقي علي الزيدي فرصة لواشنطن لتعزيز نفوذها في العراق ودفع الحكومة إلى نزع سلاح الفصائل المسلحة المدعومة من إيران. وكان ترمب قد حذّر في وقت سابق البرلمان العراقي من اختيار رئيس الوزراء الأسبق نوري المالكي لقيادة الحكومة، معتبراً أنه "وثيق الصلة بإيران".

قال وزير الطاقة الأميركي كريس رايت، خلال فعالية نظمتها غرفة التجارة الأميركية، إن هدف الولايات المتحدة في الشرق الأوسط يتمثل في "تحويل منطقة مزقتها الصراعات إلى منطقة تقوم على التجارة والاستثمار".

شاركت شركات أميركية عدة في توقيع اتفاقيات مع العراق، من بينها "هاليبرتون" و"ستارلينك" التابعة لـ"سبيس إكس"، و"كيه بي آر" و"جيه بي مورغان تشيس". كما أكد الزيدي أن الدولة ماضية بحسم لإنهاء وجود أي سلاح خارج نطاق القانون بحلول نهاية سبتمبر 2026.

### حقل كركوك النفطي وعودة كونوكو فيليبس
كان أبرز الاتفاقيات إعلان "كونوكو فيليبس" استحواذها على حصة تبلغ 42% في مجمع حقول كركوك النفطي العملاق التابع لشركة "بي بي" في العراق. تشمل الصفقة منطقة تضم احتياطيات تعادل أكثر من 3 مليارات برميل من النفط المكافئ، إضافة إلى فرص استكشاف جديدة، فيما قدّر محللو "باركليز" قيمة الصفقة بنحو 400 مليون دولار.

يبلغ إنتاج مجمع كركوك حالياً نحو 328 ألف برميل يومياً، مع منح الشركات حوافز مالية على أي إنتاج يتجاوز هذا المستوى، وهو ما اعتبره محللو "باركليز" أكثر جاذبية مُقارنةً بعقود الخدمة التقليدية المعتمدة في العراق.

تأتي الصفقة ضمن استراتيجية "بي بي" للتركيز مجدداً على النفط والغاز بعد تراجع رهاناتها على الطاقة المتجددة، بينما تمثل عودة "كونوكو فيليبس" إلى العراق أول استثمار لها في البلاد منذ أكثر من عقد.

### خطوط أنابيب بديلة لتجاوز مضيق هرمز
وأشار التقرير الاستخباراتي إلى أن خطط زيادة إنتاج العراق من النفط تواجه تحديات، أبرزها اضطراب حركة الشحن عبر الخليج العربي نتيجة الحرب، وهو المسار الذي تعتمد عليه بغداد لتصدير معظم إنتاجها. وفي هذا السياق، تشارك "شيفرون" ضمن تحالف يدرس إنشاء خط أنابيب جديد إلى البحر المتوسط عبر سوريا لتجاوز هذا المسار المضطرب وتأمين تصدير النفط بعيداً عن ضغوط مضيق هرمز.

قالت "بي بي" (BP) إن "كونوكو فيليبس" ستستحوذ على 42% من حصتها في مشروع مشترك يعيد تطوير حقول كركوك النفطية العملاقة، وتتوقع "شيفرون" أيضاً توقيع اتفاق نفطي لدفع مفاوضاتها بشأن الاستثمار في حقول نفطية كبيرة وخط أنابيب لتجاوز مضيق هرمز.

### إنهاء التبعية للغاز الإيراني ومشاريع الفاو
أجرى العراق سلسلة محادثات مع كبرى شركات الطاقة والهندسة الأميركية بشأن استثمار الغاز وزيادة إنتاج النفط وقدرات التصدير والتكرير، في وقت تحاول البلاد إنهاء حاجتها إلى الغاز المستورد لتشغيل محطات الكهرباء. وبحث الزيدي مع الرئيس التنفيذي لشركة "إكسون موبيل" دارين وودز، خطط جمع الغاز المصاحب لوقف حرقه والاستفادة منه في تشغيل المحطات المترابطة.

تأتي المحادثات في وقت تسعى بغداد إلى تقليص اعتمادها على الغاز الإيراني، الذي يسهم في تأمين أكثر من 30% من إنتاج الكهرباء. وكانت إمدادات الغاز الإيراني قد توقفت بالكامل في 18 مارس، ما تسبب في فقدان أكثر من 3000 ميغاواط من القدرة الإنتاجية، قبل استئناف الضخ جزئياً في 21 مارس بنحو 5 ملايين متر مكعب يومياً.

تستهدف العراق رفع إنتاجها النفطي إلى 5 ملايين برميل يومياً على المدى القريب، وصولاً إلى 7 ملايين برميل يومياً قبل نهاية العقد.

وأعلن الزيدي عن خطط مشاريع "مدينة الطاقة" في شبه جزيرة الفاو جنوب العراق، التي تشمل مجمعات لتكرير النفط الخام، ومنشآت لإنتاج وتجميع الغاز، ومحطات توليد الكهرباء، والتي ترتبط بمسار طريق التنمية الاستراتيجي.`,
      contentEn: `### US Corporations Sign Agreements to Invest $60 Billion in Iraq
ConocoPhillips has joined dozens of US companies operating across energy, healthcare, defense, technology, and sovereign finance to sign landmark agreements valued at approximately $60 billion, aiming to comprehensively revitalize the Iraqi economy.

The historic deals were finalized at the conclusion of Iraqi Prime Minister Ali Al-Zaidy's week-long visit to Washington, where US President Donald Trump pledged to unlock "massive" oil projects in partnership with Iraq, one of OPEC's founding and oldest producers.

Throughout the visit, Al-Zaidy sought to actively attract American capital and re-present Iraq as a stable, secure, and highly lucrative destination for foreign direct investment.

The high-level summits come after more than four months of acute regional tensions, which have severely disrupted maritime shipping lanes, industrial supply chains, and macro-economic growth across the Arabian Gulf.

> "Our fundamental directive in Iraq is to cultivate deep strategic partners rather than transient contractors, paving the way for real structural reforms and securing our sovereign energy future." - Prime Minister Ali Al-Zaidy

### Transitioning From Conflict to Trade and Investment
The intensive discussions between the Trump administration and Prime Minister Al-Zaidy offered Washington a crucial window to reinforce its influence in Iraq and encourage the federal government to secure a state monopoly on weaponry. President Trump had previously cautioned the Iraqi parliament against appointing figures overly aligned with regional actors, stressing the importance of independent Iraqi statehood.

US Energy Secretary Chris Wright, addressing a VIP forum at the US Chamber of Commerce, stated that Washington's geopolitical mandate in the Middle East is to "transform a conflict-torn region into a resilient, trade-and-investment-driven economic corridor."

Multiple leading American corporations entered into binding agreements, including Halliburton, SpaceX's Starlink constellation, KBR, and JPMorgan Chase. Prime Minister Al-Zaidy reaffirmed that Baghdad is moving decisively to disarm all unauthorized paramilitary factions and secure complete sovereign control over weapons by the end of September 2026.

### The Kirkuk Oil Complex & ConocoPhillips' Strategic Return
The crown jewel of the energy agreements is ConocoPhillips' acquisition of a 42% stake in BP's joint venture to redevelop the supergiant Kirkuk oil field in northern Iraq. The transaction covers block reserves exceeding 3 billion barrels of oil equivalent and opens up high-yield exploration frontiers. Barclays analysts estimate the transaction value at approximately $400 million.

Kirkuk's baseline production currently averages 328,000 barrels per day. The new agreement provides international operators with robust financial incentives for incremental production, which Barclays analysts highlighted as far more attractive than traditional Iraqi service contracts.

The deal marks ConocoPhillips' return to Iraq after a decade-long absence, funded through organic project cash flows, while aligning with BP's refocus on core oil and gas assets.

### Bypassing the Strait of Hormuz via the Mediterranean
Strategic dockets indicate that Iraq's oil export growth is highly vulnerable to shipping bottlenecks in the Arabian Gulf. To hedge against this risk, Chevron is participating in a joint consortium studying a new overland export pipeline leading directly to the Mediterranean Sea through Syria.

This multi-billion-dollar project would secure oil flows directly to European markets, insulating Iraqi energy sovereignty from any geopolitical blockades or security flare-ups in the Strait of Hormuz.

Chevron is prepared to finalize the pipeline and field agreements, ensuring a diversified logistics matrix for northern and southern crude extraction.

### Dismantling Iranian Gas Reliance & Al-Faw Energy City
Baghdad is holding critical talks with US energy giant ExxonMobil, led by CEO Darren Woods, to capture flared associated gas and channel it directly to local power grids. Currently, Iraq depends on Iranian gas imports for over 30% of its power generation, leaving the country highly vulnerable to sudden shutoffs.

On March 18, a total suspension of Iranian gas imports plunged the nation into darkness, wiping out 3,000 MW of generation capacity before partially resuming under intense emergency diplomacy.

To achieve total energy self-sufficiency, Iraq is targeting a short-term crude capacity of 5 million barrels per day, scaling to 7 million barrels per day by 2030, while building "Al-Faw Energy City" on the Fao Peninsula. This mega-hub will house integrated refining complexes, gas processing plants, and power grids linked directly to the strategic Development Road.`
    };
  }, []);

  const currentArticle = selectedDocket === 'chips' ? mainArticle : iraqArticle;
  const isSaved = savedArticleIds.includes(currentArticle.id);

  // Social share triggers
  const handleWhatsAppShare = () => {
    const title = isAr ? currentArticle.titleAr : currentArticle.titleEn;
    const shareUrl = window.location.href;
    const text = `🚨 *${isAr ? 'عاجل: ' : 'URGENT: '}* ${title}\n\n${shareUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGenericShare = () => {
    const title = isAr ? currentArticle.titleAr : currentArticle.titleEn;
    const text = isAr ? currentArticle.summaryAr : currentArticle.summaryEn;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: shareUrl
      }).catch(err => {
        navigator.clipboard.writeText(shareUrl);
        alert(isAr ? 'تم نسخ رابط البرقية العاجلة للحافظة' : 'Flash briefing link copied to clipboard');
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert(isAr ? 'تم نسخ رابط البرقية العاجلة للحافظة' : 'Flash briefing link copied to clipboard');
    }
  };

  const triggerPdfGeneration = () => {
    setPdfCompiling(true);
    setPdfProgress(5);
    
    const chipStatusesAr = [
      'جاري استخراج مستندات التحليل المالي...',
      'رسم الخرائط والبيانات التكتيكية لوادي السيليكون...',
      'تضمين تحليلات جني الأرباح ونضج الأسواق العالمية...',
      'تأمين خطوط الاتصال وتصدير ملف الاستخبارات السيادية (PDF)...'
    ];
    const chipStatusesEn = [
      'Extracting financial intelligence dockets...',
      'Mapping technical semiconductor telemetry...',
      'Compiling profit-taking and global market indicators...',
      'Securing transmission and exporting final intelligence brief (PDF)...'
    ];

    const iraqStatusesAr = [
      'جاري استيراد وثائق الشراكة الاستراتيجية ومذكرات الـ 60 مليار دولار...',
      'رسم الحدود اللوجستية لمشروع كركوك النفطي وعقد الـ 42%...',
      'تأكيد خيارات النقل لخط أنابيب البحر المتوسط الالتفافي (عبر سوريا)...',
      'صياغة الملف الاستراتيجي النهائي لشبكات الغاز والكهرباء وتصديره كـ PDF...'
    ];
    const iraqStatusesEn = [
      'Loading $60 Billion bilateral energy dockets...',
      'Mapping Kirkuk oilfield concession and 42% ConocoPhillips stake...',
      'Computing alternative Mediterranean pipeline routes bypassing Hormuz...',
      'Compiling final sovereign intelligence brief and building secure PDF file...'
    ];

    const statusesAr = selectedDocket === 'chips' ? chipStatusesAr : iraqStatusesAr;
    const statusesEn = selectedDocket === 'chips' ? chipStatusesEn : iraqStatusesEn;

    setPdfStatusMsg(isAr ? statusesAr[0] : statusesEn[0]);

    const interval = setInterval(() => {
      setPdfProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setPdfCompiling(false);
            window.print(); // Triggers browser native save-as-PDF flow beautifully
          }, 600);
          return 100;
        }
        
        const nextProgress = prev + Math.floor(Math.random() * 20) + 10;
        const msgIdx = Math.min(Math.floor((nextProgress / 100) * 4), 3);
        setPdfStatusMsg(isAr ? statusesAr[msgIdx] : statusesEn[msgIdx]);
        
        return Math.min(nextProgress, 100);
      });
    }, 250);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput && !phoneInput) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmailInput('');
      setPhoneInput('');
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };

  // Market metrics representing the "Bear Market" drop
  const chipStocksData = [
    { name: 'NVIDIA (NVDA)', change: '-24.5%', status: 'down', color: 'text-red-500' },
    { name: 'TSMC (TSM)', change: '-18.2%', status: 'down', color: 'text-red-500' },
    { name: 'AMD (AMD)', change: '-21.0%', status: 'down', color: 'text-red-500' },
    { name: 'Intel (INTC)', change: '-15.8%', status: 'down', color: 'text-red-500' },
    { name: 'ASML (ASML)', change: '-22.4%', status: 'down', color: 'text-red-500' },
    { name: 'Nasdaq 100', change: '-8.5%', status: 'down', color: 'text-red-400' },
    { name: 'Brent Crude Oil', change: '+12.4%', status: 'up', color: 'text-emerald-500' },
  ];

  const iraqTelemetryData = [
    { name: 'Total US Investment', change: '$60.0 Billion', status: 'up', color: 'text-emerald-600 font-extrabold' },
    { name: 'Kirkuk Stake Transferred', change: '42.0%', status: 'up', color: 'text-emerald-500 font-extrabold' },
    { name: 'Target Output Crude', change: '7.0M BPD', status: 'up', color: 'text-emerald-500' },
    { name: 'Iranian Gas Dependence', change: '-100% Target', status: 'down', color: 'text-red-500 font-extrabold' },
    { name: 'Militia Disarm Deadline', change: 'Sept 30, 2026', status: 'neutral', color: 'text-zinc-700' },
    { name: 'Chevron Med Pipeline', change: '3.0B Barrels', status: 'up', color: 'text-amber-600' },
  ];

  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('###')) {
        const heading = paragraph.replace('###', '').trim();
        return (
          <h3 key={index} className="text-zinc-900 font-sans font-black text-lg md:text-xl tracking-tight border-b border-zinc-200 pb-2 pt-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-red-600 inline-block"></span>
            {heading}
          </h3>
        );
      }

      if (paragraph.startsWith('>')) {
        const quote = paragraph.replace('>', '').trim();
        return (
          <blockquote key={index} className="border-r-4 rtl:border-r-4 ltr:border-l-4 border-red-600 bg-red-50/40 p-4 rounded text-zinc-800 font-sans italic text-sm md:text-base my-4 leading-relaxed">
            {quote}
          </blockquote>
        );
      }

      // Parse bold text
      const boldParts = paragraph.split('**');
      if (boldParts.length > 2) {
        return (
          <p key={index} className="leading-relaxed font-serif text-zinc-800 text-sm md:text-base">
            {boldParts.map((part, pIdx) => {
              if (pIdx % 2 === 1) {
                return <strong key={pIdx} className="text-zinc-950 font-sans font-black">{part}</strong>;
              }
              return part;
            })}
          </p>
        );
      }

      return (
        <p key={index} className="leading-relaxed font-serif text-zinc-800 text-sm md:text-base">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div id="urgent-release-page-container" className="bg-[#fdfcfb] text-zinc-900 min-h-screen border border-zinc-200 p-4 md:p-8 transition-all relative">
      
      {/* 1. PDF Compilation Overlay (Simulation of Premium High-Fidelity Intelligence Generation) */}
      {pdfCompiling && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all animate-fade-in">
          <div className="bg-white border border-zinc-200 rounded-lg p-6 md:p-8 max-w-md w-full shadow-2xl text-center space-y-5">
            <div className="relative w-16 h-16 mx-auto">
              {/* Spinner */}
              <div className="absolute inset-0 rounded-full border-4 border-zinc-100 border-t-red-600 animate-spin" />
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-zinc-200" />
              <Cpu size={20} className="text-zinc-600 absolute inset-0 m-auto animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="bg-red-100 text-red-800 text-[10px] font-sans font-black px-2 py-0.5 rounded tracking-wider uppercase inline-block">
                {isAr ? 'تأمين مستند سيادي' : 'SECURING TRANSCRIPT'}
              </span>
              <h3 className="text-lg font-sans font-black text-zinc-900">
                {isAr ? 'جاري تصدير التقرير الفني المشفّر' : 'Generating Secure Cryptographic Report'}
              </h3>
              <p className="text-xs text-zinc-500 font-serif min-h-8">
                {pdfStatusMsg}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden border border-zinc-200">
                <div 
                  className="bg-gradient-to-r from-red-600 to-amber-500 h-full transition-all duration-300"
                  style={{ width: `${pdfProgress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                <span>{selectedDocket === 'chips' ? 'DOCKET #URGENT-CHIPS-2026' : 'DOCKET #URGENT-IRAQ-2026'}</span>
                <span className="font-bold">{pdfProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editorial Header */}
      <div className="border-b-4 border-double border-red-600 pb-6 mb-6 text-center md:text-right rtl:text-right ltr:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-2 select-none">
          <AlertCircle size={16} className="text-red-600 animate-pulse" />
          <span className="text-[11px] font-sans font-extrabold text-red-600 tracking-widest uppercase animate-pulse">
            {isAr ? 'برقية عاجلة — طبعة طارئة' : 'URGENT RELEASE WIRE — FLASH BRIEFING'}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-sans font-black text-zinc-950 tracking-tight leading-none uppercase select-text">
          {isAr ? 'الإصدارات والبرقيات العاجلة' : 'Urgent Releases & Bulletins'}
        </h1>
        <p className="text-xs md:text-sm text-zinc-500 mt-2.5 font-serif italic max-w-3xl select-text">
          {isAr 
            ? 'تغطية استثنائية فورية للأحداث الطارئة والتحولات الاستراتيجية الكبرى التي تمس الاقتصاد السياسي العالمي والأمن القومي.' 
            : 'Immediate, high-frequency intelligence coverage of major strategic disruptions, macro market shocks, and national security developments.'}
        </p>
      </div>

      {/* Classified Docket Selector Tabs (Folder-tab layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 font-sans select-none">
        <button
          onClick={() => {
            setSelectedDocket('chips');
            setSubmitSuccess(false);
          }}
          className={`relative overflow-hidden p-4 rounded border-2 transition-all cursor-pointer text-right rtl:text-right ltr:text-left flex flex-col justify-between gap-1.5 group ${selectedDocket === 'chips' ? 'border-red-600 bg-red-50/20 shadow-sm' : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50'}`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-black uppercase tracking-wider ${selectedDocket === 'chips' ? 'text-red-700' : 'text-zinc-400'}`}>
              DOCKET #95400-A
            </span>
            <Cpu size={16} className={selectedDocket === 'chips' ? 'text-red-600' : 'text-zinc-400 group-hover:text-zinc-600 transition-colors'} />
          </div>
          <h3 className={`text-xs md:text-sm font-black ${selectedDocket === 'chips' ? 'text-zinc-950' : 'text-zinc-600 group-hover:text-zinc-800'}`}>
            {isAr ? 'برقية عاجلة: زلزال أشباه الموصلات العالمي' : 'Urgent Release: Global Chip Stock Crash'}
          </h3>
          <span className="text-[9px] font-mono text-zinc-400 block mt-1">JULY 18, 2026 | SILICON VALLEY</span>
          {selectedDocket === 'chips' && <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-600" />}
        </button>

        <button
          onClick={() => {
            setSelectedDocket('iraq');
            setSubmitSuccess(false);
          }}
          className={`relative overflow-hidden p-4 rounded border-2 transition-all cursor-pointer text-right rtl:text-right ltr:text-left flex flex-col justify-between gap-1.5 group ${selectedDocket === 'iraq' ? 'border-red-600 bg-red-50/20 shadow-sm' : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50'}`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-black uppercase tracking-wider ${selectedDocket === 'iraq' ? 'text-red-700' : 'text-zinc-400'}`}>
              DOCKET #95400-B
            </span>
            <Globe size={16} className={selectedDocket === 'iraq' ? 'text-red-600' : 'text-zinc-400 group-hover:text-zinc-600 transition-colors'} />
          </div>
          <h3 className={`text-xs md:text-sm font-black ${selectedDocket === 'iraq' ? 'text-zinc-950' : 'text-zinc-600 group-hover:text-zinc-800'}`}>
            {isAr ? 'تقرير خاص: الاتفاقيات الاستثمارية الكبرى للعراق' : 'Special Report: Major Iraq-US Investments'}
          </h3>
          <span className="text-[9px] font-mono text-zinc-400 block mt-1">JULY 18, 2026 | WASHINGTON / BAGHDAD</span>
          {selectedDocket === 'iraq' && <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-600" />}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Market Intel Panel & Actions (4 Cols) */}
        <div className="lg:col-span-4 space-y-6 select-none">
          
          {/* Quick Navigator Button */}
          <button
            onClick={() => onNavigateToSection('all')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-zinc-900 text-white rounded text-xs font-sans font-bold hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
          >
            {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            <span>{isAr ? 'العودة إلى الطبعة الكاملة للصحيفة' : 'Return to Full Issue / Home'}</span>
          </button>

          {/* Flash Info Box with contextual metrics */}
          <div className="bg-red-50/50 border border-red-200/60 rounded p-5 space-y-4">
            <div className="flex items-center gap-2 text-red-700">
              <Activity size={16} className="animate-pulse" />
              <h4 className="text-xs font-sans font-black uppercase tracking-wider">
                {selectedDocket === 'chips' 
                  ? (isAr ? 'لوحة رصد الانهيار التكنولوجي' : 'TECH COLLAPSE TELEMETRY')
                  : (isAr ? 'مؤشرات الشراكة العراقية الأمريكية' : 'IRAQ-US INVESTMENT TELEMETRY')}
              </h4>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-serif">
              {selectedDocket === 'chips'
                ? (isAr 
                  ? 'مؤشرات قطاع أشباه الموصلات العالمي تسجل هبوطاً تراكمياً يتجاوز ٢٠٪ من القمة الأخيرة، لتدخل رسمياً منطقة "السوق الهابطة" وسط شكوك حول عائد استثمارات الذكاء الاصطناعي التوليدي.' 
                  : 'Global semiconductor indices record a cumulative plunge of 20%+ from peak, entering a technical "Bear Market" as CapEx returns on generative AI face severe skepticism.')
                : (isAr
                  ? 'رصد متكامل للاستثمارات السيادية المتبادلة وعقود الامتياز الكبرى وحزم التمويل الموقعة لتحديث قطاع الطاقة العراقي وبناء مسارات الإمداد البديلة.'
                  : 'A real-time mapping of bilateral sovereign agreements, concession sizes, and pipeline financing routes designed to overhaul Iraq energy infrastructures.')}
            </p>

            <div className="border-t border-red-200/50 pt-4 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-sans font-bold text-zinc-500">
                <span>{selectedDocket === 'chips' ? (isAr ? 'الشركة / المؤشر' : 'EQUITY / INDEX') : (isAr ? 'البند / الشريك الاستراتيجي' : 'DOCKET / STRATEGIC PARTNER')}</span>
                <span>{selectedDocket === 'chips' ? (isAr ? 'التغير الفوري' : 'FLASH INTRA-DAY') : (isAr ? 'حجم التعاقد / المؤشر' : 'VOLUME / INDICATOR')}</span>
              </div>
              
              <div className="divide-y divide-red-200/30">
                {(selectedDocket === 'chips' ? chipStocksData : iraqTelemetryData).map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 text-xs font-mono font-medium">
                    <span className="text-zinc-800">{item.name}</span>
                    <span className={`font-bold ${item.color}`}>{item.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Editorial Perspective */}
          <div className="bg-zinc-50 border border-zinc-200 rounded p-5 space-y-3 font-sans">
            <h4 className="text-xs font-black text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
              <Award size={14} className="text-amber-500" />
              <span>{isAr ? 'مذكرة تحليلية سيادية' : 'SOVEREIGN ADVISORY'}</span>
            </h4>
            <p className="text-[11px] leading-relaxed text-zinc-600 font-serif italic">
              {selectedDocket === 'chips'
                ? (isAr 
                  ? 'تراجع أسهم الرقائق لا يعبر عن فشل الذكاء الاصطناعي بل عن انتقال حاد للسيولة لمستويات نضج مالي أعلى، بالتوازي مع تفوق الصين المتسارع وارتفاع مخاطر الحرب النفطية الإقليمية.' 
                  : 'The chip stocks slide marks a structural sector rotation rather than an absolute failure of AI, compounding with rapid Chinese local designs and regional petro-geopolitical risk.')
                : (isAr
                  ? 'اتفاق كركوك يمثل عودة استباقية لشركات النفط الأمريكية الكبرى بهدف حماية تدفقات الطاقة العالمية وإنهاء النفوذ الإقليمي لغاز طهران كشرط مسبق لرفع الإنتاج إلى ٧ ملايين برميل.'
                  : 'The Kirkuk concession marks a preemptive return of US majors to insulate global energy lifelines, while eliminating Iranian gas dependence as a precondition to unleash 7M BPD capacity.')}
            </p>
          </div>

          {/* Upgraded Sidebar Actions Container with WhatsApp & PDF triggers */}
          <div className="bg-white border-2 border-zinc-200 rounded p-4 space-y-3 font-sans text-xs">
            <h4 className="font-black text-zinc-800 text-xxs tracking-wider uppercase pb-2 border-b border-zinc-100 flex items-center gap-1">
              <Activity size={12} className="text-zinc-500" />
              <span>{isAr ? 'أدوات الاستخبارات والتوزيع' : 'INTELLIGENCE DISTRIBUTION TOOLS'}</span>
            </h4>
            
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppShare}
              className="w-full flex items-center justify-between py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-extrabold transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {/* SVG for WhatsApp */}
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.013-5.112-2.86-6.961C16.628 1.936 14.15 1.921 11.515 1.921 6.08 1.921 1.657 6.341 1.653 11.78c-.001 1.637.43 3.235 1.252 4.636l-.993 3.633 3.735-.98l1.002.585zM17.65 14.537c-.31-.155-1.833-.905-2.115-1.008-.282-.103-.487-.155-.69.155-.203.31-.787.98-.966 1.185-.179.205-.359.231-.669.076-.31-.155-1.309-.483-2.495-1.541-.923-.824-1.546-1.841-1.727-2.15-.18-.31-.02-.477.136-.631.14-.139.31-.36.465-.54.155-.18.205-.31.31-.515.103-.205.052-.385-.026-.54-.078-.155-.69-1.662-.945-2.277-.249-.599-.501-.518-.69-.527-.179-.008-.385-.01-.591-.01-.205 0-.54.077-.822.385-.282.31-1.077 1.053-1.077 2.569 0 1.516 1.103 2.981 1.257 3.187.154.205 2.17 3.313 5.257 4.646.734.317 1.307.506 1.753.648.739.235 1.412.202 1.944.123.593-.088 1.833-.749 2.09-1.474.256-.725.256-1.346.179-1.474-.076-.128-.282-.205-.591-.361z" />
                </svg>
                <span>{isAr ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}</span>
              </span>
              <ChevronLeft size={12} className="rtl:rotate-0 ltr:rotate-180" />
            </button>

            {/* Print & PDF Button */}
            <button
              onClick={triggerPdfGeneration}
              className="w-full flex items-center justify-between py-2.5 px-3 bg-red-700 hover:bg-red-800 text-white rounded font-extrabold transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Download size={15} />
                <span>{isAr ? 'تنزيل التقرير السيادي (PDF)' : 'Download Sovereign PDF'}</span>
              </span>
              <Printer size={13} className="text-red-300" />
            </button>

            {/* Quick Copy Link */}
            <button
              onClick={handleGenericShare}
              className="w-full flex items-center justify-between py-2.5 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded font-bold transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Share2 size={15} className="text-zinc-500" />
                <span>{isAr ? 'مشاركة عبر البريد والأجهزة' : 'Share Docket Report'}</span>
              </span>
              <span className="text-[10px] bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-600 font-mono">LINK</span>
            </button>

            {/* Archive Bookmark */}
            <button
              onClick={(e) => onToggleSaveArticle(currentArticle, e)}
              className="w-full flex items-center justify-between py-2.5 px-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 rounded font-semibold border border-zinc-200 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Bookmark size={15} className={isSaved ? 'fill-amber-500 text-amber-500' : 'text-zinc-400'} />
                <span>{isAr ? (isSaved ? 'تم الحفظ بالأرشيف الخاص' : 'حفظ البرقية للأرشيف') : (isSaved ? 'Archived in My Files' : 'Bookmark Briefing')}</span>
              </span>
              <span className="text-[9px] text-zinc-400 font-mono">SECURE</span>
            </button>
          </div>

          {/* Quick Newsletter & SMS Alert Signup Box (Sidebar CTA) */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 text-white rounded p-5 space-y-4">
            <div className="space-y-1.5">
              <span className="text-red-500 font-sans text-[10px] font-black uppercase tracking-wider block">
                {isAr ? 'تنبيهات استباقية بالرسائل النصية' : 'PREEMPTIVE SMS ALERTS'}
              </span>
              <h4 className="text-sm font-sans font-black leading-tight text-zinc-100">
                {isAr ? 'خط التحوط السريع للتحذيرات الاستراتيجية' : 'Emergency Hedge & Warning Hotline'}
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-serif">
                {selectedDocket === 'chips'
                  ? (isAr 
                    ? 'سجّل رقمك أو بريدك للحصول على تنبيهات عاجلة مخصصة لمدراء الصناديق والمستثمرين فور صدور تحركات عسكرية أو تدهور أسهم الرقائق.' 
                    : 'Receive high-frequency flash warnings sent directly to your screen regarding trade lockups, Middle East escalation, and chip supply chains.')
                  : (isAr
                    ? 'اشترك في قائمة المستثمرين الاستثنائية للحصول على إشعارات الصفقات، وملخصات مشاريع التسييل والغاز، ومذكرات الاستثمار في الفاو.'
                    : 'Subscribe to our VIP investor channel to secure live updates on sovereign projects, Exxon gas capture yields, and Al-Faw dockets.')}
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded text-red-400 text-xxs leading-relaxed font-sans text-center space-y-1">
                <Check size={14} className="mx-auto text-emerald-500 animate-bounce" />
                <p className="font-bold">{isAr ? 'تم تفعيل التنبيه المباشر بنجاح' : 'Advisory Subscription Activated!'}</p>
                <p className="text-zinc-400">{isAr ? 'ستصلك البرقية القادمة فور صدورها.' : 'Secure briefings will be routed to you.'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="absolute right-3 top-2.5 h-4 w-4 text-zinc-500 rtl:right-3 ltr:left-3" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder={isAr ? 'البريد الإلكتروني المالي...' : 'Financial Email address...'}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs rounded py-2 px-3 rtl:pr-9 ltr:pl-9 focus:outline-none focus:border-red-600 font-sans"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute right-3 top-2.5 h-4 w-4 text-zinc-500 rtl:right-3 ltr:left-3" />
                  <input
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder={isAr ? 'رقم الهاتف للتنبيهات SMS...' : 'Mobile for SMS warnings...'}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs rounded py-2 px-3 rtl:pr-9 ltr:pl-9 focus:outline-none focus:border-red-600 font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-700 hover:bg-red-600 disabled:bg-zinc-800 text-white font-sans font-black text-xs py-2 rounded shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 uppercase"
                >
                  {isSubmitting ? (
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={12} />
                      <span>{isAr ? 'تفعيل تنبيهات التحوط' : 'Activate Hedge Alerts'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Right Side: The Premium Telegraph Document Layout (8 Cols) */}
        <div className="lg:col-span-8">
          <article className="bg-white border-2 border-zinc-200 rounded p-6 md:p-8 space-y-6 shadow-sm select-text relative">
            
            {/* Header Area */}
            <div className="border-b border-zinc-200 pb-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 select-none">
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white text-[10px] font-sans font-black px-2 py-0.5 rounded tracking-wider uppercase animate-pulse">
                    {selectedDocket === 'chips' ? (isAr ? 'تحليل عاجل' : 'BREAKING RELEASES') : (isAr ? 'تقرير استثنائي' : 'SPECIAL REPORT')}
                  </span>
                  <span className="text-zinc-400 font-sans text-xs font-bold">
                    {selectedDocket === 'chips' 
                      ? (isAr ? 'وول ستريت / وادي السيليكون' : 'WALL STREET / SILICON VALLEY')
                      : (isAr ? 'الشرق الأوسط / واشنطن' : 'MIDDLE EAST / WASHINGTON')} | {isAr ? '١٨ يوليو ٢٠٢٦' : 'July 18, 2026'}
                  </span>
                </div>
                <div className="text-[10px] font-mono bg-red-50 text-red-700 px-2.5 py-0.5 rounded border border-red-200/50">
                  {selectedDocket === 'chips' ? 'DOC ID: #95400-A' : 'DOC ID: #95400-B'}
                </div>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-sans font-black text-zinc-950 leading-tight">
                {isAr ? currentArticle.titleAr : currentArticle.titleEn}
              </h2>

              {/* Author / Desk Badge & Live Weather Telemetry widget */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 pb-2 border-t border-zinc-100 mt-2 select-none">
                <div className="flex items-center gap-3">
                  <img 
                    src={currentArticle.author.avatar} 
                    alt={isAr ? currentArticle.author.nameAr : currentArticle.author.nameEn} 
                    className="w-10 h-10 rounded-full border border-zinc-200 object-cover animate-fade-in"
                  />
                  <div>
                    <span className="text-xs font-sans font-black text-zinc-900 block leading-tight">
                      {isAr ? currentArticle.author.nameAr : currentArticle.author.nameEn}
                    </span>
                    <span className="text-[10px] font-sans text-zinc-500 block">
                      {isAr ? currentArticle.author.titleAr : currentArticle.author.titleEn}
                    </span>
                  </div>
                </div>

                {/* Weather monitoring widget next to the author badge */}
                <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200/60 px-3.5 py-2 rounded text-[10px] font-mono">
                  <div>
                    <span className="text-zinc-400 block text-[8px] uppercase tracking-wider">{isAr ? 'موقع الرصد' : 'MONITOR SITE'}</span>
                    <span className="font-extrabold text-zinc-900 block leading-tight">
                      {selectedDocket === 'chips' ? (isAr ? 'واشنطن العاصمة' : 'Washington, D.C.') : (isAr ? 'بغداد / واشنطن' : 'Baghdad / Wash. DC')}
                    </span>
                  </div>
                  <div className="w-px h-6 bg-zinc-300" />
                  <div>
                    <span className="text-zinc-400 block text-[8px] uppercase tracking-wider">{isAr ? 'الحرارة والمناخ' : 'TEMP & OUTLOOK'}</span>
                    <span className="text-zinc-800 font-bold block leading-tight">
                      {selectedDocket === 'chips' ? '24°C / ' + (isAr ? 'غيوم' : 'Overcast') : '41°C / ' + (isAr ? 'جاف' : 'Sunny')}
                    </span>
                  </div>
                  <div className="w-px h-6 bg-zinc-300 hidden sm:block" />
                  <div className="hidden sm:block">
                    <span className="text-zinc-400 block text-[8px] uppercase tracking-wider">{isAr ? 'الرياح / الرطوبة' : 'WIND / HUMIDITY'}</span>
                    <span className="text-zinc-500 block leading-tight">
                      {selectedDocket === 'chips' ? '7.4 km/h | 82%' : '12 km/h | 15%'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Share & Bookmark Actions row */}
              <div className="flex flex-wrap gap-1.5 items-center justify-end border-t border-zinc-100 pt-3">
                <button
                  onClick={handleWhatsAppShare}
                  title={isAr ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}
                  className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded transition-colors flex items-center gap-1.5 text-xxs font-sans font-black cursor-pointer border border-emerald-200/40"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.013-5.112-2.86-6.961C16.628 1.936 14.15 1.921 11.515 1.921 6.08 1.921 1.657 6.341 1.653 11.78c-.001 1.637.43 3.235 1.252 4.636l-.993 3.633 3.735-.98l1.002.585zM17.65 14.537c-.31-.155-1.833-.905-2.115-1.008-.282-.103-.487-.155-.69.155-.203.31-.787.98-.966 1.185-.179.205-.359.231-.669.076-.31-.155-1.309-.483-2.495-1.541-.923-.824-1.546-1.841-1.727-2.15-.18-.31-.02-.477.136-.631.14-.139.31-.36.465-.54.155-.18.205-.31.31-.515.103-.205.052-.385-.026-.54-.078-.155-.69-1.662-.945-2.277-.249-.599-.501-.518-.69-.527-.179-.008-.385-.01-.591-.01-.205 0-.54.077-.822.385-.282.31-1.077 1.053-1.077 2.569 0 1.516 1.103 2.981 1.257 3.187.154.205 2.17 3.313 5.257 4.646.734.317 1.307.506 1.753.648.739.235 1.412.202 1.944.123.593-.088 1.833-.749 2.09-1.474.256-.725.256-1.346.179-1.474-.076-.128-.282-.205-.591-.361z" />
                  </svg>
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>

                <button
                  onClick={triggerPdfGeneration}
                  title={isAr ? 'تنزيل كملف PDF' : 'Download PDF Document'}
                  className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded transition-colors flex items-center gap-1.5 text-xxs font-sans font-black cursor-pointer border border-red-200/40"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">PDF</span>
                </button>

                <button
                  onClick={handleGenericShare}
                  title={isAr ? 'نسخ رابط القصة' : 'Copy link / Share'}
                  className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded transition-colors flex items-center gap-1.5 text-xxs font-sans font-bold cursor-pointer"
                >
                  <Share2 size={13} />
                  <span className="hidden sm:inline">{isAr ? 'مشاركة' : 'Share'}</span>
                </button>

                <button
                  onClick={(e) => onToggleSaveArticle(currentArticle, e)}
                  title={isAr ? 'حفظ في المفضلة' : 'Bookmark docket'}
                  className="p-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 rounded transition-colors flex items-center cursor-pointer border border-zinc-200/50"
                >
                  <Bookmark size={13} className={isSaved ? 'fill-amber-500 text-amber-500' : ''} />
                </button>
              </div>
            </div>

            {/* Banner Image */}
            <div className="relative h-64 md:h-96 rounded overflow-hidden border border-zinc-200 animate-fade-in" key={selectedDocket}>
              <img 
                src={currentArticle.imageUrl} 
                alt={isAr ? currentArticle.titleAr : currentArticle.titleEn} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xxs font-sans font-semibold bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm inline-block">
                {selectedDocket === 'chips' 
                  ? (isAr ? 'رسم تخطيطي لصناعة الموصلات الفائقة وخطوط الإنتاج العالمية' : 'Conceptual representation of global semiconductor foundries and supply chains')
                  : (isAr ? 'موقع مجمع تصفية النفط والغاز بمدينة الطاقة في شبه جزيرة الفاو' : 'Site view of the integrated refining and gas capture complex at Al-Faw Energy City')}
              </div>
            </div>

            {/* Read Time Synopsis Banner */}
            <div className="p-4 bg-red-50 border-r-4 border-red-500 rounded flex flex-col md:flex-row md:items-center justify-between gap-3 text-zinc-700">
              <div className="space-y-0.5">
                <span className="text-[10px] font-sans font-black text-red-600 block uppercase tracking-wide animate-pulse">
                  {isAr ? '● خلاصة التحليل' : '● EXECUTIVE BRIEF'}
                </span>
                <p className="text-xs font-sans font-semibold text-zinc-800 italic leading-relaxed">
                  {isAr ? currentArticle.summaryAr : currentArticle.summaryEn}
                </p>
              </div>
              <div className="shrink-0 text-right md:text-left font-sans text-[10px] bg-red-100 px-3 py-1.5 rounded">
                <span className="font-bold block text-red-800">{isAr ? currentArticle.readTimeAr : currentArticle.readTimeEn}</span>
                <span className="text-[8px] text-red-600 font-bold block uppercase">{isAr ? 'مستند سري' : 'CONFIDENTIAL'}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="text-zinc-800 space-y-6 leading-relaxed border-b border-zinc-200 pb-8 select-text animate-fade-in" key={selectedDocket + '-content'}>
              {renderContent(isAr ? currentArticle.contentAr : currentArticle.contentEn)}
            </div>

            {/* 2. Primary Call To Action (CTA) Box at the end of the article story */}
            <div className="bg-red-50/40 border-2 border-red-600/50 rounded-lg p-5 md:p-6 space-y-4 my-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-red-600 to-amber-500" />
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-red-700">
                    <ShieldAlert size={16} className="animate-pulse" />
                    <span className="text-[10px] font-sans font-black uppercase tracking-wider">
                      {selectedDocket === 'chips' ? (isAr ? 'مكتب الأبحاث والتحوط الجيوسياسي' : 'HEDGE & MACRO DESK ADVISORY') : (isAr ? 'مكتب الشراكات والاستثمار السيادي' : 'SOVEREIGN CORRIDOR desk')}
                    </span>
                  </div>
                  <h4 className="text-base md:text-lg font-sans font-black text-zinc-900">
                    {selectedDocket === 'chips'
                      ? (isAr ? 'كيف تحمي محفظتك المالية وتتحوط ضد "فقاعة الذكاء الاصطناعي"؟' : 'How to insulate your tech assets against the Bear Market correction?')
                      : (isAr ? 'طلب الدليل الاستثماري التفصيلي لاتفاقيات الـ 60 مليار دولار' : 'Request the Bilateral Funding Prospectus for the $60B Energy Pact')}
                  </h4>
                  <p className="text-xs text-zinc-600 font-serif leading-relaxed max-w-2xl">
                    {selectedDocket === 'chips'
                      ? (isAr 
                        ? 'يقوم خبراء مكتب الأبحاث بالورّاق بإصدار دليلاً استقصائياً دورياً يتضمن بدائل استثمارية آمنة، وخرائط توزيع السيولة للشركات الصينية الناشئة مثل Moonshot AI، بالإضافة لخطط التحوط لأسهم TSMC وإنفيديا.' 
                        : 'Our strategic analysts provide monthly high-grade briefs detailing safe havens, Chinese capital shifts, and custom portfolio hedging guides to bypass global semiconductor turbulence.')
                      : (isAr
                        ? 'احصل على الكراس التفصيلي للمشروعات السيادية بمدينة الفاو للطاقة، وعقود امتياز كركوك الموقعة، وخطط كونوكو فيليبس وإكسون لجمع الغاز وتجنب الإمدادات الإيرانية.'
                        : 'Our investment desk provides comprehensive prospectuses detailing capital structuring, Al-Faw Energy City assets, BP-Conoco concessions, and Chevron pipeline financing protocols.')}
                  </p>
                </div>
                
                {/* Visual badge */}
                <div className="bg-amber-100 text-amber-900 border border-amber-200 text-xxs font-sans font-black px-3 py-1 rounded select-none shrink-0 self-start md:self-auto">
                  {isAr ? 'طبعة محدودة — تصنيف سري' : 'LIMITED RELEASE — SECURED INTEL'}
                </div>
              </div>

              {submitSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 text-xs font-sans text-center space-y-1.5">
                  <Check size={18} className="mx-auto text-emerald-600 animate-bounce" />
                  <p className="font-extrabold">{isAr ? 'تم تسجيل اهتمامك الاستثماري بنجاح وتأكيد الاتصال' : 'Investor Docket Secured Successfully!'}</p>
                  <p className="text-zinc-600 text-xxs">
                    {isAr 
                      ? 'سيرسل إليك المحللون مستند الطرح المالي التفصيلي وصيغ الشراكة بصيغة PDF عبر القنوات المؤمنة.' 
                      : 'Our financial advisors will dispatch the exclusive sovereign investment dossier (PDF) to your authorized email address shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="bg-white border border-zinc-200 rounded p-4 shadow-sm flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 space-y-2 sm:space-y-0 sm:flex sm:gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute right-3 top-2.5 h-4.5 w-4.5 text-zinc-400 rtl:right-3 ltr:left-3" />
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder={isAr ? 'أدخل البريد المالي المعتمد...' : 'Approved financial email...'}
                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-xs rounded py-2 px-3 rtl:pr-9 ltr:pl-9 focus:outline-none focus:border-red-600 font-sans"
                      />
                    </div>
                    <div className="relative flex-1">
                      <Phone className="absolute right-3 top-2.5 h-4.5 w-4.5 text-zinc-400 rtl:right-3 ltr:left-3" />
                      <input
                        type="tel"
                        required
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        placeholder={isAr ? 'رقم الهاتف للتنبيه العاجل (SMS)...' : 'SMS number for flash warnings...'}
                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-xs rounded py-2 px-3 rtl:pr-9 ltr:pl-9 focus:outline-none focus:border-red-600 font-sans"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-red-700 hover:bg-red-800 disabled:bg-zinc-300 text-white font-sans font-black text-xs px-5 py-2.5 rounded shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0 uppercase"
                  >
                    {isSubmitting ? (
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>{selectedDocket === 'chips' ? (isAr ? 'طلب خطة التحوط الفورية' : 'Request Hedge Report') : (isAr ? 'طلب ملف الاكتتاب الاستثماري' : 'Request Investment Dossier')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Tags & Hashtags */}
            <div className="pt-2 space-y-3 select-none">
              <div className="flex flex-wrap gap-1.5">
                {currentArticle.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-sans text-xxs font-bold px-2.5 py-1 rounded transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 text-red-600 font-sans text-xxs font-extrabold italic">
                {currentArticle.hashtags.map((ht, hIdx) => (
                  <span key={hIdx}>#{ht}</span>
                ))}
              </div>
            </div>

            {/* Footer Signatures */}
            <div className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-zinc-400 font-sans gap-4 select-none">
              <div className="space-y-1">
                <span className="font-bold text-zinc-600 block">{isAr ? 'مكتب التحليل والأسواق بمجموعة الوراق' : 'Al-Warraq Financial Intelligence Desk'}</span>
                <span className="block font-serif italic">{isAr ? 'البريد الإلكتروني للأبحاث: analytics@alwarraqnews.com' : 'E-mail: analytics@alwarraqnews.com'}</span>
              </div>
              <div className="text-right md:text-left text-[10px] border-t md:border-t-0 md:border-l border-zinc-200 pt-3 md:pt-0 md:pl-4">
                <span className="block">DOCKET ID: {selectedDocket === 'chips' ? '#URGENT-CHIPS-2026' : '#URGENT-IRAQ-2026'}</span>
                <span className="block">CLASSIFICATION: COGNITIVE OVERLAY SECURED</span>
              </div>
            </div>

          </article>
        </div>

      </div>

    </div>
  );
}
