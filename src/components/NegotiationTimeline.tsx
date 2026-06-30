import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Link2, 
  FileText, 
  Lock, 
  Unlock, 
  Zap, 
  ShieldAlert, 
  TrendingDown, 
  DollarSign, 
  Award,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Article } from '../types';

interface Milestone {
  id: string;
  dateAr: string;
  dateEn: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  statusAr: string;
  statusEn: string;
  statusType: 'completed' | 'ongoing' | 'leaked' | 'disputed';
  icon: React.ComponentType<any>;
  linkedArticleId?: string;
  intensityScore: number; // 0 to 100 geopolitical tension
}

interface NegotiationTimelineProps {
  language: 'ar' | 'en';
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export function NegotiationTimeline({ language, articles, onSelectArticle }: NegotiationTimelineProps) {
  const isAr = language === 'ar';
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>('m1');
  const [implementationProgress, setImplementationProgress] = useState<number>(45);

  const milestones: Milestone[] = [
    {
      id: 'm1',
      dateAr: '٨ أكتوبر ٢٠٢٣',
      dateEn: 'October 8, 2023',
      titleAr: 'اشتعال الجبهة الجنوبية وربط الساحات',
      titleEn: 'Frontline Flare-up & Strategy Linking',
      descAr: 'اندلاع مواجهات عسكرية مفتوحة على طول الخط الأزرق. حزب الله يعلن "جبهة إسناد" ويربط رسمياً أي وقف لإطلاق النار في الشمال بإنهاء الحرب في قطاع غزة، مكرساً نظرية "وحدة الساحات".',
      descEn: 'Intensive clashes erupt along the Blue Line. Hezbollah declares a supportive front and formally links any northern ceasefire to a ceasefire in Gaza, cementing the "Unity of the Arenas" doctrine.',
      statusAr: 'مرحلة الصراع المفتوح',
      statusEn: 'Active Conflict Phase',
      statusType: 'completed',
      icon: Zap,
      linkedArticleId: 'lebanon-ceasefire-mirage-2026',
      intensityScore: 85
    },
    {
      id: 'm2',
      dateAr: 'أواخر ٢٠٢٤ - ٢٠٢٥',
      dateEn: 'Late 2024 - 2025',
      titleAr: 'تعثر جهود القرار ١٧٠١ وفشل المبادرات',
      titleEn: 'Resolution 1701 Hurdles & Failed Envoys',
      descAr: 'المبعوثون الدوليون يقدمون عدة صيغ لوقف إطلاق النار وبسط سلطة الدولة. تفشل المقترحات جراء نزاع عميق حول حصرية قرار الحرب وصلاحية تمركز القوات المسلحة اللبنانية جنوب الليطاني.',
      descEn: 'Western and Arab envoys propose multiple ceasefires. Diplomatic initiatives collapse over the execution of Resolution 1701 and fierce local resistance to state disarmament demands.',
      statusAr: 'جمود دبلوماسي',
      statusEn: 'Diplomatic Deadlock',
      statusType: 'disputed',
      icon: ShieldAlert,
      linkedArticleId: 'lebanon-ceasefire-mirage-2026',
      intensityScore: 90
    },
    {
      id: 'm3',
      dateAr: '٢٨ فبراير ٢٠٢٦',
      dateEn: 'February 28, 2026',
      titleAr: 'اندلاع حرب إيران الإقليمية الكبرى',
      titleEn: 'Outbreak of Regional U.S.-Iran Conflict',
      descAr: 'بدء عمليات عسكرية أمريكية وإسرائيلية شاملة ضد إيران. النزاع يعصف بأسواق الطاقة العالمية ويشعل كافة جبهات الشرق الأوسط، مما يسفر عن أزمة تضخمية حادة تعوق جهود الاستقرار.',
      descEn: 'U.S. and Israel launch coordinate military strikes on Iran. The war disrupts energy shipping lanes, driving fuel and groceries up and triggering a global inflationary shock.',
      statusAr: 'تفجر الجبهات الإقليمية',
      statusEn: 'Regional Escalation',
      statusType: 'ongoing',
      icon: TrendingDown,
      linkedArticleId: 'cbs-iran-war-cost-americans-2026',
      intensityScore: 98
    },
    {
      id: 'm4',
      dateAr: 'أبريل ٢٠٢٦',
      dateEn: 'April 2026',
      titleAr: 'عملية "الغضب الملحمي" وفاتورة الحرب',
      titleEn: 'Operation "Epic Fury" & Global Toll',
      descAr: 'البنتاغون يطلق عملية "Epic Fury" بتكلفة ٢٥ مليار دولار لردع التهديدات الجوية والبحرية. تكلفة الحرب الإجمالية على الخزانة الأمريكية تقارب ٥٠ مليار دولار مع شلل مالي شامل للبلدات الحدودية.',
      descEn: 'Pentagon conducts Operation Epic Fury at an estimated $25 billion price tag. Total U.S. conflict spending approaches $50 billion as regional border towns remain entirely paralyzed.',
      statusAr: 'إنفاق عسكري هائل',
      statusEn: 'Defense Spending Surge',
      statusType: 'ongoing',
      icon: DollarSign,
      linkedArticleId: 'cbs-iran-war-cost-americans-2026',
      intensityScore: 92
    },
    {
      id: 'm5',
      dateAr: '٢١ مايو ٢٠٢٦',
      dateEn: 'May 21, 2026',
      titleAr: 'ذروة أسعار الوقود والضغط الاقتصادي العالمي',
      titleEn: 'Peak Energy Crisis & Household Cost Spikes',
      descAr: 'البنزين يبلغ ذروة تاريخية بـ ٤.٥٦ دولار للغالون بالولايات المتحدة. عائلات أمريكية تتحمل عبء ١,٠٠٠ دولار إضافية للأسر المتوسطة، مما يفرض ضغطاً سياسياً كبيراً لتسوية جبهة لبنان وإيران.',
      descEn: 'U.S. gasoline reaches $4.56/gal peak. Average households pay an extra $1,000 for food, fuel, and interest rates, creating heavy domestic pressure to broker ceasing of regional hostilities.',
      statusAr: 'ضغط سياسي واقتصادي',
      statusEn: 'Severe Cost Spikes',
      statusType: 'completed',
      icon: Clock,
      linkedArticleId: 'cbs-iran-war-cost-americans-2026',
      intensityScore: 78
    },
    {
      id: 'm6',
      dateAr: '١٦ يونيو ٢٠٢٦',
      dateEn: 'June 16, 2026',
      titleAr: 'تفاهمات الممر الذكي والربط السيادي',
      titleEn: 'Global South Smart Super-Grid Framework',
      descAr: 'كواليس محادثات سرية لتدشين ممر توزيع طاقة بديلة ذكية في عواصم الجنوب العالمي، كمحاولة التفافية للتكيف مع الحصار الجيوسياسي وتجنب خطوط الإمداد التقليدية المهددة.',
      descEn: 'Confidential drafts leak concerning an alternative energy distribution network and transcontinental super-grid, aiming to bypass high-risk trade lanes.',
      statusAr: 'مخططات لوجستية بديلة',
      statusEn: 'Alternative Corridors',
      statusType: 'ongoing',
      icon: Zap,
      linkedArticleId: 'excl-1',
      intensityScore: 65
    },
    {
      id: 'm7',
      dateAr: '٢٦ يونيو ٢٠٢٦',
      dateEn: 'June 26, 2026',
      titleAr: 'توقيع "اتفاق الإطار الثلاثي" ببروتوكول واشنطن',
      titleEn: 'Signing of Washington Trilateral Framework',
      descAr: 'برعاية أمريكية مباشرة، يوقع ممثلو إسرائيل ولبنان اتفاق إطار من ١٤ نقطة يدعو إلى إنهاء حالة الحرب وبسط سيادة الجيش اللبناني، وسط غموض حول آليات الإشراف والتحقق الميداني.',
      descEn: 'US-mediated trilateral framework comprising 14 clauses is signed in Washington D.C., officially concluding the state of war but leaving crucial enforcement points ambiguous.',
      statusAr: 'توقيع تاريخي معلق',
      statusEn: 'Sovereign Treaty Signed',
      statusType: 'completed',
      icon: Award,
      linkedArticleId: 'excl-leb-isr-secret-annex',
      intensityScore: 50
    },
    {
      id: 'm8',
      dateAr: '٢٩ يونيو ٢٠٢٦',
      dateEn: 'June 29, 2026',
      titleAr: 'تبادل ضربات يهدد الهدنة الهشة ومفاوضات الدوحة',
      titleEn: 'Military Strikes Threaten Ceasefire & Doha Talks',
      descAr: 'اشتباكات صاروخية مفاجئة خلال عطلة نهاية الأسبوع تهدد بانهيار الهدنة. الأطراف تعلن استئناف مفاوضات عاجلة في قطر لمحاولة احتواء التدهور قبل فوات الأوان.',
      descEn: 'Sudden military strikes trigger fears of total ceasefire breakdown. Key negotiators convene in Doha, Qatar to stabilize the fragile trilateral agreement.',
      statusAr: 'تهديد مباشر للهدنة',
      statusEn: 'Ceasefire Under Fire',
      statusType: 'disputed',
      icon: ShieldAlert,
      linkedArticleId: 'cbs-iran-war-cost-americans-2026',
      intensityScore: 88
    },
    {
      id: 'm9',
      dateAr: '٣٠ يونيو ٢٠٢٦ (اليوم)',
      dateEn: 'June 30, 2026 (Today)',
      titleAr: 'تسريب "الملحق الأمني السري" وصدمة التنازلات',
      titleEn: 'Leaked "Secret Security Annex" Shocks Lebanon',
      descAr: 'مسودة الملحق الأمني السري المسربة تكشف أن الانسحاب الإسرائيلي ليس التزاماً بل مكافأة دورية مشروطة برضا تل أبيب، مع إخضاع الجيش اللبناني لغربلة وتدقيق أمني أمريكي مباشر.',
      descEn: 'Classified security annex leaks, exposing that IDF redeployment is a periodic reward for LAF compliance rather than a legal treaty mandate, sparking an political storm in Beirut.',
      statusAr: 'تسريب استخباراتي خطير',
      statusEn: 'Classified Material Leaked',
      statusType: 'leaked',
      icon: Lock,
      linkedArticleId: 'excl-leb-isr-secret-annex',
      intensityScore: 95
    }
  ];

  const scrollToMilestone = (id: string) => {
    const element = milestoneRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveMilestoneId(id);
    }
  };

  // Set up intersection observer to highlight milestone on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px -10% -30% 0px',
      threshold: 0.3
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveMilestoneId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    Object.values(milestoneRefs.current).forEach((el) => {
      if (el) observer.observe(el as Element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const getStatusBadge = (type: Milestone['statusType'], label: string) => {
    const classes = {
      completed: 'bg-emerald-950 text-emerald-400 border-emerald-800',
      ongoing: 'bg-blue-950 text-blue-400 border-blue-800 animate-pulse',
      leaked: 'bg-red-950 text-red-400 border-red-800 font-black',
      disputed: 'bg-amber-950 text-amber-400 border-amber-800'
    };

    return (
      <span className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border ${classes[type]}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="border-4 border-black p-4 md:p-6 bg-white text-black my-6 relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" id="negotiation-ceasefire-timeline">
      {/* Decorative top ribbon */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-700"></div>

      {/* Title block */}
      <div className="border-b-2 border-black pb-4 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="text-[#b91c1c] animate-pulse" size={16} />
          <span className="font-mono text-xxs font-bold tracking-widest text-red-700 uppercase">
            {isAr ? 'الجدول الزمني التفاعلي للمفاوضات والقرار ١٧٠١' : 'LEBANON-ISRAEL CEASEFIRE NEGOTIATIONS REGISTRY'}
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
          <div>
            <h3 className="text-xl md:text-2xl font-black font-sans tracking-tight">
              {isAr ? 'سجل تتبع المفاوضات الإطارية والهدنة' : 'The Chronological Ceasefire Negotiation Matrix'}
            </h3>
            <p className="text-xs text-zinc-600 font-serif max-w-2xl leading-relaxed mt-1">
              {isAr 
                ? 'مخطط زمني تفاعلي يربط محطات الحوار الدبلوماسي الشائك من جبهات القتال بجنوب الليطاني إلى صفقات واشنطن السرية والتقارير الاستقصائية الموثقة.'
                : 'An interactive scroll-linked visual registry mapping critical negotiation milestones directly to Al-Warraq’s secret dossiers and economic context nodes.'}
            </p>
          </div>
          
          {/* Status Gauge */}
          <div className="bg-zinc-50 border border-zinc-200 p-3 shrink-0 w-full md:w-56 space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-zinc-500 uppercase">
              <span>{isAr ? 'معدل نفاذ وتطبيق الاتفاق' : 'Agreement Implementation Rate'}</span>
              <span className="text-red-700">{implementationProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-200">
              <div 
                className="h-full bg-red-700 transition-all duration-1000"
                style={{ width: `${implementationProgress}%` }}
              ></div>
            </div>
            <p className="text-[9px] text-zinc-500 font-serif leading-none mt-0.5">
              {isAr ? 'عالق في عقبات الملحق الأمني السري لعام ٢٠٦٩' : 'Stalled by secret security annex disputes.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* SIDE BAR QUICK INDEX (Navigator Panel) */}
        <div className="lg:col-span-1 border border-zinc-200 bg-zinc-50 p-3 space-y-4 lg:sticky lg:top-4 z-10">
          <div className="font-mono text-xxs font-black text-zinc-500 tracking-wider uppercase border-b border-zinc-200 pb-1.5">
            {isAr ? 'فهرس المحطات السريعة' : 'SCROLL-TO-VIEW INDEX'}
          </div>
          
          <div className="space-y-1.5">
            {milestones.map((m) => {
              const isActive = activeMilestoneId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => scrollToMilestone(m.id)}
                  className={`w-full text-left rtl:text-right px-2.5 py-2 font-sans transition-all text-xs border cursor-pointer flex items-center justify-between gap-1.5 ${
                    isActive 
                      ? 'bg-zinc-900 border-black text-white font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-black hover:bg-zinc-50'
                  }`}
                >
                  <div className="truncate flex-1">
                    <span className="font-mono text-[9px] block text-red-600 font-semibold">{isAr ? m.dateAr : m.dateEn}</span>
                    <span className="block truncate text-[10px] leading-tight font-black">{isAr ? m.titleAr : m.titleEn}</span>
                  </div>
                  {isActive && <ChevronRight className="shrink-0 text-red-500" size={12} />}
                </button>
              );
            })}
          </div>

          {/* Key Legend */}
          <div className="border-t border-zinc-200 pt-3 space-y-2">
            <span className="font-mono text-[9px] font-bold text-zinc-400 block uppercase tracking-wider">{isAr ? 'مستويات التوتر الجيوسياسي' : 'GEOPOLITICAL TENSION MAP'}</span>
            <div className="flex items-center gap-1.5 text-xxs font-mono text-zinc-600">
              <span className="w-2.5 h-2.5 bg-red-650 inline-block bg-red-600"></span>
              <span>{isAr ? 'أزمة خطيرة (فوق ٩٠)' : 'Critical (90+ score)'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xxs font-mono text-zinc-600">
              <span className="w-2.5 h-2.5 bg-amber-500 inline-block"></span>
              <span>{isAr ? 'نزاع نشط (٧٠-٨٩)' : 'Active Dispute (70-89)'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xxs font-mono text-zinc-600">
              <span className="w-2.5 h-2.5 bg-zinc-400 inline-block"></span>
              <span>{isAr ? 'تفاهمات وهدوء' : 'Diplomatic Calm'}</span>
            </div>
          </div>
        </div>

        {/* CHRONOLOGICAL TIMELINE STREAM */}
        <div className="lg:col-span-3 space-y-6 max-h-[640px] overflow-y-auto pr-2" ref={timelineContainerRef}>
          {milestones.map((m) => {
            const isActive = activeMilestoneId === m.id;
            const Icon = m.icon;
            const isCritical = m.intensityScore >= 90;
            
            // Find linked article object
            const linkedArticle = articles.find(art => art.id === m.linkedArticleId);

            return (
              <div 
                key={m.id}
                id={m.id}
                ref={(el) => { milestoneRefs.current[m.id] = el; }}
                className={`transition-all duration-300 p-4 border-2 relative ${
                  isActive 
                    ? 'border-black bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ring-1 ring-red-500/30' 
                    : 'border-zinc-200 bg-white hover:border-zinc-400'
                }`}
              >
                {/* Geopolitical Tension Indicator Bar on top */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                    isCritical ? 'bg-red-600' : m.intensityScore >= 70 ? 'bg-amber-500' : 'bg-zinc-400'
                  }`}
                />

                {/* Milestone Metadata Header */}
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 border border-black ${
                      isActive ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700'
                    }`}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] font-black text-red-700 tracking-wider block">
                        {isAr ? m.dateAr : m.dateEn}
                      </span>
                      <span className="font-mono text-[9px] text-zinc-500">
                        {isAr ? `نقاط التوتر الجيوسياسي: ${m.intensityScore}` : `Geopolitical Tension: ${m.intensityScore}/100`}
                      </span>
                    </div>
                  </div>

                  <div>
                    {getStatusBadge(m.statusType, isAr ? m.statusAr : m.statusEn)}
                  </div>
                </div>

                {/* Main Content */}
                <h4 className="font-sans font-black text-sm md:text-base text-zinc-950 mb-1.5 leading-tight">
                  {isAr ? m.titleAr : m.titleEn}
                </h4>
                
                <p className="text-xs md:text-sm text-zinc-700 font-serif leading-relaxed mb-4 whitespace-pre-line">
                  {isAr ? m.descAr : m.descEn}
                </p>

                {/* DIRECT LINKED NEWS ARTICLE CONTEXT NODE */}
                {linkedArticle && (
                  <div className="border border-zinc-200 bg-white p-3 space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Link2 size={11} className="text-[#b91c1c]" />
                        <span className="font-mono text-[9px] text-[#b91c1c] font-bold uppercase tracking-wider">
                          {isAr ? 'عقدة سياق ومستند مرتبط' : 'LINKED CONTEXT NODE'}
                        </span>
                      </div>
                      <span className="bg-zinc-100 border border-zinc-200 text-zinc-500 font-mono text-[8px] px-1.5 py-0.2">
                        {linkedArticle.category.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h5 className="font-sans font-black text-xs text-zinc-900 line-clamp-1 leading-snug">
                        {isAr ? linkedArticle.titleAr : linkedArticle.titleEn}
                      </h5>
                      <p className="text-[10px] text-zinc-500 font-serif leading-relaxed line-clamp-2">
                        {isAr ? linkedArticle.summaryAr : linkedArticle.summaryEn}
                      </p>
                    </div>

                    <div className="pt-1.5 flex justify-end border-t border-dashed border-zinc-200">
                      <button
                        onClick={() => onSelectArticle(linkedArticle)}
                        className="font-sans text-[10px] font-black text-zinc-900 hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>{isAr ? 'تصفح التحقيق كاملاً في الأرشيف ←' : 'Examine the Full Investigation ←'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
