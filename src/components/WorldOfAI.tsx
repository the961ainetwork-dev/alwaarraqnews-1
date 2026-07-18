import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Cpu, 
  Music, 
  TrendingUp, 
  DollarSign, 
  Globe2, 
  ShieldAlert, 
  ArrowUpRight, 
  Check, 
  ExternalLink,
  ChevronRight,
  Disc,
  Play,
  Volume2,
  Lock,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';

interface WorldOfAIProps {
  language: 'ar' | 'en';
}

export default function WorldOfAI({ language }: WorldOfAIProps) {
  const isAr = language === 'ar';
  const [activeRoom, setActiveRoom] = useState<string>('pink-floyd');
  const [isPlayingMusic, setIsPlayingMusic] = useState<string | null>(null);

  // Model cost comparison data (standard task cost in USD)
  const costData = [
    { 
      name: isAr ? 'ديب سيك (V4 Flash)' : 'DeepSeek V4 Flash', 
      company: 'DeepSeek',
      cost: 0.02, 
      color: '#10b981', // Emerald
      isChinese: true
    },
    { 
      name: isAr ? 'كيمي ٢.٦ (Kimi)' : 'Kimi 2.6', 
      company: 'Moonshot AI',
      cost: 0.33, 
      color: '#3b82f6', // Blue
      isChinese: true
    },
    { 
      name: isAr ? 'كيمي كيه ٣ (Kimi)' : 'Kimi K3', 
      company: 'Moonshot AI',
      cost: 0.95, 
      color: '#d97706', // Amber
      isChinese: true
    },
    { 
      name: isAr ? 'كلود فيبل ٥ (Claude)' : 'Claude Fable 5', 
      company: 'Anthropic',
      cost: 2.75, 
      color: '#ef4444', // Red
      isChinese: false
    }
  ];

  // Subscription Tiers (Music inspired)
  const subscriptions = [
    {
      id: 'adagio',
      nameAr: 'أداجيو (Adagio)',
      nameEn: 'Adagio Tier',
      speedAr: 'إيقاع بطيء ومهيب - لمعالجة الوثائق الكبيرة للغاية بتأنٍ ودقة عميقة',
      speedEn: 'Slow & Solemn Tempo - Perfect for ultra-deep, comprehensive processing of massive PDF dossiers',
      tokenAr: 'تصل إلى ٢ مليون رمز سياقي',
      tokenEn: 'Up to 2M Context Tokens',
      priceAr: 'مشمول للمستخدمين الأساسيين',
      priceEn: 'Included in Core Tier'
    },
    {
      id: 'andante',
      nameAr: 'أندانتي (Andante)',
      nameEn: 'Andante Tier',
      speedAr: 'إيقاع الخطوة المعتدلة - التوازن الأمثل للمحادثات اليومية والترجمة الاحترافية للبيانات السيادية',
      speedEn: 'Walking Pace Tempo - Optimally balanced for daily intelligence dialogues & rapid professional translation',
      tokenAr: 'تصل إلى ٥ مليون رمز سياقي',
      tokenEn: 'Up to 5M Context Tokens',
      priceAr: '$١٥ / شهرياً للمحللين',
      priceEn: '$15 / Month for Analysts'
    },
    {
      id: 'moderato',
      nameAr: 'موديراتو (Moderato)',
      nameEn: 'Moderato Tier',
      speedAr: 'إيقاع معتدل السرعة - كفاءة فائقة وموجات توليد تفاعلية لمعالجة الأكواد والتحليلات الضخمة',
      speedEn: 'Moderately Fast Tempo - High throughput & interactive generation waves for heavy software engineering',
      tokenAr: 'تصل إلى ١٠ مليون رمز سياقي',
      tokenEn: 'Up to 10M Context Tokens',
      priceAr: '$٣٩ / شهرياً للمؤسسات السيادية',
      priceEn: '$39 / Month for Sovereign Orgs'
    }
  ];

  // Rock-themed meeting rooms
  const rockRooms = [
    {
      id: 'pink-floyd',
      name: 'Pink Floyd / Dark Side',
      nameAr: 'بينك فلويد / الوجه المظلم',
      album: 'The Dark Side of the Moon (1973)',
      descAr: 'الاسم الأصلي لـ "مونشوت" بالصينية يعادل "الوجه المظلم للقمر"، تيمناً بألبومهم الأسطوري. هنا تُناقش الرؤى الفلسفية ونماذج الذكاء الاصطناعي الأعمق.',
      descEn: 'The original Chinese name of Moonshot AI is a direct translation of "The Dark Side of the Moon". This room is dedicated to philosophical breakthroughs and core neural-net designs.',
      accent: 'border-l-4 border-purple-500 bg-purple-50/50 dark:bg-purple-950/20'
    },
    {
      id: 'radiohead',
      name: 'Radiohead / OK Computer',
      nameAr: 'راديوهيد / أوك كومبيوتر',
      album: 'OK Computer (1997)',
      descAr: 'غرفة استراتيجية الهندسة المعمارية للنظام. ترمز للتكامل المعقد بين الإنسان والآلة والتمرد على التصميمات التقليدية للنماذج الأمريكية.',
      descEn: 'The system architecture headquarters. Named after the masterpiece capturing human-machine integration, breaking free from traditional Silicon Valley structures.',
      accent: 'border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
    },
    {
      id: 'led-zeppelin',
      name: 'Led Zeppelin / Stairway',
      nameAr: 'ليد زبلين / سلم السماء',
      album: 'Led Zeppelin IV (1971)',
      descAr: 'هنا يتم تطوير خوارزميات الاستدلال المعقد والـ Reasoning عالي الكثافة (نماذج K3). سلم تقني صاعد لتجاوز الفجوة التقنية الغربية.',
      descEn: 'Where complex reasoning algorithms and high-density K3 reasoning models are forged. A climbing technical ladder built to outpace Western models.',
      accent: 'border-l-4 border-amber-500 bg-amber-50/50 dark:bg-amber-950/20'
    },
    {
      id: 'nirvana',
      name: 'Nirvana / Nevermind',
      nameAr: 'نيرفانا / نيفرمايند',
      album: 'Nevermind (1991)',
      descAr: 'غرفة الابتكار الفوضوي السريع وبناء نماذج الـ Flash السريعة. فلسفتها تكسير القواعد المعتادة لتحقيق أقصى كفاءة برمجية بأقل استهلاك للطاقة.',
      descEn: 'The hub of rapid disruption and lightweight Flash model production. Its core philosophy centers on breaking rigid structures to maximize efficiency.',
      accent: 'border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
    }
  ];

  return (
    <div 
      id="world-of-ai-section" 
      className="border-4 border-black p-5 md:p-8 bg-white text-zinc-900 my-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-300"
    >
      {/* Visual Header Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700"></div>

      {/* 1. Header & Sovereign Branding */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-black pb-5 mb-8 mt-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-indigo-700 rounded-none animate-pulse"></span>
            <span className="font-mono text-xxs font-black tracking-widest text-indigo-700 uppercase">
              {isAr ? 'عالم الذكاء الاصطناعي — ملخص سيادي خاص' : 'THE WORLD OF ARTIFICIAL INTELLIGENCE — SPECIAL DOSSIER'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-sans tracking-tight leading-tight uppercase">
            {isAr ? 'شركة "مونشوت إيه آي" (Moonshot AI)' : 'Moonshot AI: China\'s Tech Vanguard'}
          </h2>
          <p className="text-sm md:text-base text-zinc-600 font-serif max-w-3xl leading-relaxed">
            {isAr 
              ? 'دراسة استقصائية حصرية حول تنين الذكاء الاصطناعي الصيني الصاعد، هيكله المالي، ألعاب الجيوبوليتكس والتحليل المقارن للتكلفة مع رواد وادي السيليكون.'
              : 'An exclusive sovereign brief on the rising Chinese AI dragon, its rock-and-roll culture, financial engineering, and cost-disruptive algorithms compared with Silicon Valley giants.'}
          </p>
        </div>

        <div className="bg-indigo-900 text-white font-mono text-[10px] font-black px-4 py-2 border border-indigo-950 uppercase tracking-widest flex items-center gap-1.5 self-start md:self-auto select-none">
          <Cpu size={12} className="animate-spin text-cyan-400" />
          <span>{isAr ? 'تصنيف: ذكاء سيادي' : 'CLASS: SOVEREIGN INTEL'}</span>
        </div>
      </div>

      {/* 2. Core Financial and Strategic KPIs (Bento Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* KPI 1 */}
        <div className="bg-zinc-50 border-2 border-zinc-200 p-4 relative flex flex-col justify-between group hover:border-black transition-all">
          <div>
            <span className="font-mono text-[9px] font-black text-zinc-500 uppercase tracking-wider block mb-1">
              {isAr ? 'القيمة السوقية الحالية' : 'CURRENT VALUATION'}
            </span>
            <h4 className="text-2xl md:text-3xl font-black font-sans text-indigo-950 tracking-tight">
              $20.0B
            </h4>
          </div>
          <p className="text-xxs font-serif text-zinc-500 mt-2 leading-relaxed">
            {isAr ? 'صعود مالي قياسي يضعها كأسرع شركة ناشئة نمواً بالصين.' : 'Unprecedented valuation slope placing it among China\'s top unicorn tiers.'}
          </p>
          <ArrowUpRight size={14} className="absolute bottom-3 right-3 text-zinc-400 group-hover:text-black" />
        </div>

        {/* KPI 2 */}
        <div className="bg-zinc-50 border-2 border-zinc-200 p-4 relative flex flex-col justify-between group hover:border-black transition-all">
          <div>
            <span className="font-mono text-[9px] font-black text-zinc-500 uppercase tracking-wider block mb-1">
              {isAr ? 'الجولة التمويلية المستهدفة' : 'TARGET FUNDING ROUND'}
            </span>
            <h4 className="text-2xl md:text-3xl font-black font-sans text-amber-600 tracking-tight flex items-center gap-1.5">
              $30.0B <span className="text-xs text-zinc-400">({isAr ? 'هدف' : 'Goal'})</span>
            </h4>
          </div>
          <p className="text-xxs font-serif text-zinc-500 mt-2 leading-relaxed">
            {isAr ? 'تسعى الشركة لجمع ٢ مليار دولار لترسيخ نفوذها.' : 'Seeking $2B in fresh venture backing to supercharge capital buffers.'}
          </p>
          <TrendingUp size={14} className="absolute bottom-3 right-3 text-zinc-400 group-hover:text-black" />
        </div>

        {/* KPI 3 */}
        <div className="bg-zinc-50 border-2 border-zinc-200 p-4 relative flex flex-col justify-between group hover:border-black transition-all">
          <div>
            <span className="font-mono text-[9px] font-black text-zinc-500 uppercase tracking-wider block mb-1">
              {isAr ? 'الإيرادات الدورية السنوية' : 'ANNUAL RECURRING REV (ARR)'}
            </span>
            <h4 className="text-2xl md:text-3xl font-black font-sans text-emerald-600 tracking-tight">
              $200M+
            </h4>
          </div>
          <p className="text-xxs font-serif text-zinc-500 mt-2 leading-relaxed">
            {isAr ? 'معدل إيرادات قياسي مدعوم بالطفرة الهائلة لروبوت Kimi.' : 'Rapidly scaling commercial inflows driven by massive consumer and API volumes.'}
          </p>
          <DollarSign size={14} className="absolute bottom-3 right-3 text-zinc-400 group-hover:text-black" />
        </div>

        {/* KPI 4 */}
        <div className="bg-zinc-50 border-2 border-zinc-200 p-4 relative flex flex-col justify-between group hover:border-black transition-all">
          <div>
            <span className="font-mono text-[9px] font-black text-zinc-500 uppercase tracking-wider block mb-1">
              {isAr ? 'الوجهة المستقبلية للاكتتاب' : 'PLANNED IPO DESTINATION'}
            </span>
            <h4 className="text-xl md:text-2xl font-black font-sans text-zinc-900 tracking-tight uppercase">
              Hong Kong
            </h4>
          </div>
          <p className="text-xxs font-serif text-zinc-500 mt-2 leading-relaxed">
            {isAr ? 'تفكيك الهيكل الخارجي للالتزام بالقواعد الصارمة لبكين.' : 'Unwinding offshore VIE structures to list locally under tight Beijing rules.'}
          </p>
          <Globe2 size={14} className="absolute bottom-3 right-3 text-zinc-400 group-hover:text-black" />
        </div>

      </div>

      {/* 3. Main Narrative split in 2 columns: Report content vs. Interactive Cost Infographic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        
        {/* Left Column: Comprehensive Report Text (7/12) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1 */}
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-black font-sans text-zinc-900 border-b-2 border-zinc-100 pb-2 flex items-center gap-2">
              <span className="bg-indigo-700 w-1.5 h-5 block"></span>
              {isAr ? '١. المقدمة والتعريف بالشركة' : '1. Introduction & Company Overview'}
            </h3>
            <p className="text-zinc-800 font-serif leading-relaxed text-sm md:text-base text-justify">
              {isAr ? (
                <>
                  تأسست شركة <strong>"مونشوت إيه آي" (Moonshot AI)</strong> في مطلع عام ٢٠٢٣ على يد <strong>يانغ تشيلين</strong>، الأستاذ السابق في جامعة "تسينغهوا" المرموقة في بكين. نجحت الشركة في فترة وجيزة للغاية في فرض نفسها كواحدة من أبرز "تنانين الذكاء الاصطناعي" في الصين، لا سيما بعد إطلاقها لروبوت الدردشة الشهير <strong>"كيمي" (Kimi)</strong>، الذي أصبح البديل الأبرز والأكثر شعبية وتداولاً لتطبيق "تشات جي بي تي" (ChatGPT) داخل السوق الصينية المحمية.
                </>
              ) : (
                <>
                  Founded in early 2023 by <strong>Yang Zhilin</strong>, a highly acclaimed former professor at Tsinghua University, <strong>Moonshot AI</strong> has rapidly emerged as one of China’s premier "AI Dragons". It gained widespread national prominence following the launch of its highly popular conversational chatbot, <strong>Kimi</strong>, which has firmly established itself as the leading domestic alternative to OpenAI's ChatGPT within the closely-guarded Chinese market.
                </>
              )}
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-black font-sans text-zinc-900 border-b-2 border-zinc-100 pb-2 flex items-center gap-2">
              <span className="bg-indigo-700 w-1.5 h-5 block"></span>
              {isAr ? '٢. القيادة والثقافة المؤسسية: مزيج بين الأكاديمية والموسيقى' : '2. Leadership & Culture: Academia and Rock\'n\'Roll Fusion'}
            </h3>
            <p className="text-zinc-800 font-serif leading-relaxed text-sm md:text-base text-justify">
              {isAr ? (
                <>
                  يمثل يانغ تشيلين (٣٣ عاماً) نموذجاً فريداً ومثيراً لرواد الأعمال المليارديرات؛ فهو يجمع بين الخلفية الأكاديمية النخبوية والشغف الفني الفطري بموسيقى الروك الكلاسيكية:
                </>
              ) : (
                <>
                  Yang Zhilin (33 years old) represents a highly unique class of modern tech entrepreneurs, seamlessly blending elite academic credentials with a profound, innate passion for classic rock music:
                </>
              )}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-700 font-serif text-xs md:text-sm pl-4 rtl:pl-0 rtl:pr-4">
              {isAr ? (
                <>
                  <li><strong>الخلفية الأكاديمية:</strong> يحمل شهادة دكتوراه من جامعة "كارنيغي ميلون" الأميركية، وألّف أكثر من ١٢ ورقة بحثية تحظى باستشهادات واسعة عالمياً في معالجة اللغات الطبيعية (NLP)، مع خبرة عملية سابقة في عمالقة السيليكون "ميتا" و"جوجل".</li>
                  <li><strong>الهوية الموسيقية:</strong> ينعكس شغف يانغ بالموسيقى بشكل مباشر على تصميم الشركة وروحها الداخلية:</li>
                  <li className="list-none pl-4 rtl:pr-4 text-zinc-600 italic">- <strong>الاسم الأصلي:</strong> كان يعادل بالصينية "الوجه المظلم للقمر"، تيمناً بألبوم فرقة "بينك فلويد" الشهير.</li>
                  <li className="list-none pl-4 rtl:pr-4 text-zinc-600 italic">- <strong>قاعات الاجتماعات:</strong> تحمل أسماء فرقه المفضلة مثل Radiohead، وLed Zeppelin، وQueen، وNirvana.</li>
                  <li className="list-none pl-4 rtl:pr-4 text-zinc-600 italic">- <strong>باقات الاشتراك:</strong> سميت بناءً على مصطلحات السرعة والإيقاع في الموسيقى الكلاسيكية: أداجيو، أندانتي، وموديراتو.</li>
                </>
              ) : (
                <>
                  <li><strong>Academic Pedigree:</strong> Holds a PhD from Carnegie Mellon University, has authored more than 12 highly-cited seminal papers in Natural Language Processing (NLP), and possessed previous engineering experience at Silicon Valley giants Meta and Google.</li>
                  <li><strong>Musical DNA:</strong> Yang’s passion for music is heavily woven into the company’s structural identity:</li>
                  <li className="list-none pl-4 text-zinc-600 italic">- <strong>Original Name:</strong> The Chinese characters translated directly to "The Dark Side of the Moon," an homage to Pink Floyd’s iconic album.</li>
                  <li className="list-none pl-4 text-zinc-600 italic">- <strong>Conference Rooms:</strong> Named after legendary rock bands: Radiohead, Led Zeppelin, Queen, and Nirvana.</li>
                  <li className="list-none pl-4 text-zinc-600 italic">- <strong>Subscription Packages:</strong> Structured after classical tempo indicators: Adagio, Andante, and Moderato.</li>
                </>
              )}
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-black font-sans text-zinc-900 border-b-2 border-zinc-100 pb-2 flex items-center gap-2">
              <span className="bg-indigo-700 w-1.5 h-5 block"></span>
              {isAr ? '٣. نموذج الأعمال وتسييل التكنولوجيا' : '3. Business Model & Financial Velocity'}
            </h3>
            <p className="text-zinc-800 font-serif leading-relaxed text-sm md:text-base text-justify">
              {isAr ? (
                <>
                  تتبع "مونشوت" استراتيجية هجومية متسارعة لتعظيم الإيرادات والتجهيز للاكتتاب العام للتأقلم مع كلفة الحوسبة الضخمة. تعتمد الشركة على باقات اشتراك موجهة للأفراد عبر تطبيق "Kimi" الذكي، بالإضافة إلى تقديم واجهات برمجة التطبيقات (APIs) وحلول النماذج الأساسية للقطاعات المؤسسية الكبرى والمؤسسات المالية التي تتجه نحو الاستقلال السيادي الكامل عن النماذج الغربية.
                </>
              ) : (
                <>
                  Moonshot pursues a high-velocity monetization strategy to offset massive compute costs and prepare for the capital markets. The company leverages a dual-engine approach: premium consumer subscription packages for the consumer-facing "Kimi" chatbot, alongside advanced API pipelines and customized base models tailored for large enterprises and sovereign organizations looking to de-risk from Western dependencies.
                </>
              )}
            </p>
          </div>

        </div>

        {/* Right Column: Comparative Infographic & Chart (5/12) */}
        <div className="lg:col-span-5 bg-zinc-50 border-2 border-black p-4 space-y-6" id="ai-infographic-panel">
          
          <div className="border-b border-zinc-200 pb-3">
            <span className="font-mono text-[9px] font-black text-red-600 uppercase tracking-widest block mb-0.5 animate-pulse">
              {isAr ? 'إنفوجرافيك مقارنة التكاليف' : 'INFOGRAPHIC: COST ARBITRAGE'}
            </span>
            <h4 className="font-sans font-black text-base text-zinc-900">
              {isAr ? 'تحليل مقارنة التكلفة البرمجية عالمياً' : 'Global Cost Analysis per Standard Task'}
            </h4>
            <p className="text-[11px] text-zinc-500 font-serif mt-0.5 leading-relaxed">
              {isAr 
                ? 'متوسط التكلفة المرجح بالدولار لتنفيذ مهمة برمجية معقدة موحدة لكل مليون رمز (وفقاً لتصنيفات ومؤشرات Artificial Analysis ٢٠٢٦)' 
                : 'Weighted average cost in USD to execute a standardized reasoning/coding task per 1M tokens (Artificial Analysis Registry 2026)'}
            </p>
          </div>

          {/* Interactive Recharts Bar Chart */}
          <div className="h-64 w-full" id="ai-cost-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={costData}
                layout="vertical"
                margin={{ top: 5, right: 15, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#71717a" fontSize={10} fontStyle="italic" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#71717a" 
                  fontSize={10} 
                  width={110} 
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-zinc-950 text-white p-2.5 border border-zinc-800 font-mono text-xxs space-y-1 rounded-none shadow-md">
                          <p className="font-black border-b border-zinc-800 pb-1">{data.name}</p>
                          <p><span className="text-zinc-400">{isAr ? 'الشركة:' : 'Company:'}</span> {data.company}</p>
                          <p><span className="text-zinc-400">{isAr ? 'التكلفة لكل مليون:' : 'Cost / 1M:'}</span> ${data.cost.toFixed(2)}</p>
                          <p className="text-amber-400 text-[10px] font-sans">
                            {data.isChinese 
                              ? (isAr ? '★ نموذج كفاءة صيني' : '★ Chinese Efficiency Node') 
                              : (isAr ? '✦ نموذج تفرع غربي' : '✦ Western Frontier Node')}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={24}>
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Analytic Quote Panel */}
          <div className="bg-white border border-zinc-200 p-3.5 space-y-2">
            <span className="font-mono text-[9px] font-black text-indigo-700 uppercase tracking-widest block">
              {isAr ? 'ملاحظة تحليلية استراتيجية' : 'STRATEGIC ANALYTICAL NOTE'}
            </span>
            <p className="text-[11px] md:text-xs text-zinc-700 font-serif leading-relaxed text-justify">
              {isAr ? (
                <>
                  يُظهر الجدول والبيانات المقارنة أن نموذج <strong>"Kimi 2.6"</strong> يوفر وفراً مالياً هائلاً يقارب <strong>٨٨٪</strong> مقارنة بالعملاق الأميركي <strong>"Claude Fable 5"</strong>. يمثل هذا التفوق العاصف ميزة تنافسية حاسمة لـ "مونشوت" في قطاع البرمجة (Coding)، وهي الخدمة الأكثر ربحية وتشغيلية لشركات الذكاء الاصطناعي اليوم. في حين يمثل نموذج <strong>"Kimi K3"</strong> الفئة الأكثر تقدماً وعمقاً بسعر تداول يبلغ ٠.٩٥ دولار، وهو ما يزال أقل من نصف كلفة منافسه الأميركي.
                </>
              ) : (
                <>
                  The cost matrix demonstrates that Moonshot’s <strong>Kimi 2.6</strong> provides an incredible <strong>88% cost reduction</strong> compared to the US frontier flagship <strong>Claude Fable 5</strong>. This aggressive pricing structure grants Chinese developers and enterprises a massive financial arbitrage, particularly in complex software engineering (Coding)—the most lucrative domain of generative AI services. Even Moonshot\'s elite reasoning model, <strong>Kimi K3</strong> ($0.95), remains less than half the price of its American peer.
                </>
              )}
            </p>
          </div>

        </div>

      </div>

      {/* 4. Rock Music & Culture Interactive Module */}
      <div className="border-2 border-black p-5 bg-zinc-950 text-white rounded-none relative overflow-hidden mb-8" id="music-culture-interactive">
        
        {/* Background visual graphics */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-950/40 to-transparent pointer-events-none"></div>
        <Disc size={180} className="absolute -bottom-12 -right-12 text-zinc-900 animate-spin-slow pointer-events-none opacity-40" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Music size={16} className="text-cyan-400 animate-bounce" />
            <span className="font-mono text-[9px] font-black text-cyan-400 uppercase tracking-widest">
              {isAr ? 'الهوية الثقافية النادرة للشركة' : 'CORPORATE ROCK CULTURE & MUSIC WORKSPACE'}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black font-sans mb-3 tracking-tight">
            {isAr ? 'الجانب المظلم للقمر: الاستوديو التفاعلي لمكاتب مونشوت' : 'The Dark Side of the Moon: Interactive Office Tour'}
          </h3>

          <p className="text-xs md:text-sm text-zinc-300 font-serif mb-6 max-w-3xl leading-relaxed">
            {isAr 
              ? 'تنعكس فلسفة يانغ تشيلين الموسيقية المتمردة على تصميم غرف الاجتماعات والبنية الداخلية لمكاتب الشركة ببكين. انقر على الغرف لتفعيل تفاصيل التصميم ونغمات الباقات التقنية:'
              : 'Yang Zhilin’s classical rock ideology is stamped on the physical conference rooms in Beijing. Click on any room below to load the structural blueprint, design code, and classical tempo metrics:'}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Room Selector Tab Controls (4/12) */}
            <div className="lg:col-span-5 space-y-2.5">
              {rockRooms.map((room) => {
                const isActive = activeRoom === room.id;
                return (
                  <button
                    key={room.id}
                    onClick={() => {
                      setActiveRoom(room.id);
                      setIsPlayingMusic(room.id);
                    }}
                    className={`w-full text-right rtl:text-right ltr:text-left p-3 border transition-all flex items-center justify-between cursor-pointer select-none rounded-none ${
                      isActive 
                        ? 'bg-white text-zinc-900 border-white shadow-[3px_3px_0px_0px_rgba(34,211,238,1)]' 
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className="font-sans font-black text-xs md:text-sm block">
                        {isAr ? room.nameAr : room.name}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500 block">
                        {room.album}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isActive && isPlayingMusic === room.id ? (
                        <div className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 bg-cyan-500 animate-music-bar-1"></span>
                          <span className="w-0.5 bg-cyan-500 animate-music-bar-2"></span>
                          <span className="w-0.5 bg-cyan-500 animate-music-bar-3"></span>
                        </div>
                      ) : (
                        <Play size={12} className="text-zinc-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Room Display Panel (7/12) */}
            <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 p-4 flex flex-col justify-between relative">
              
              {/* Decorative design coordinates */}
              <div className="absolute top-2 right-2 text-zinc-600 font-mono text-[8px] tracking-wider select-none">
                LOC: BEIJING_HQ // LAT: 39.9042 // LONG: 116.4074
              </div>

              {/* Display Current Room */}
              {(() => {
                const room = rockRooms.find(r => r.id === activeRoom) || rockRooms[0];
                return (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] font-black text-cyan-400 uppercase tracking-widest block">
                        {isAr ? 'غرفة اجتماعات الذكاء الاصطناعي النشطة' : 'ACTIVE NEURAL-NET DESIGN ROOM'}
                      </span>
                      <h4 className="text-lg font-black font-sans text-white uppercase flex items-center gap-2">
                        {isAr ? room.nameAr : room.name}
                        <Volume2 size={14} className="text-cyan-400" />
                      </h4>
                    </div>

                    <p className="text-xs font-serif text-zinc-300 leading-relaxed text-justify">
                      {isAr ? room.descAr : room.descEn}
                    </p>

                    <div className="border-t border-zinc-800 pt-3 flex items-center gap-3">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase">
                        {isAr ? 'إشارة الموسيقى التصويرية:' : 'Soundtrack Signature:'}
                      </span>
                      <span className="bg-zinc-800 text-cyan-400 font-mono text-[10px] font-bold px-2 py-0.5">
                        {room.album}
                      </span>
                    </div>
                  </div>
                );
              })()}

            </div>

          </div>

          {/* Subscription Classical Tempo Sub-Matrix */}
          <div className="mt-8 border-t border-zinc-800 pt-6">
            <h4 className="font-sans font-black text-sm text-zinc-200 mb-4 uppercase flex items-center gap-2">
              <Layers size={14} className="text-indigo-400" />
              {isAr ? 'هيكل باقات كيمي (Kimi) المرتكز على السلالم الموسيقية الكلاسيكية' : 'The Classical Tempo Subscription Framework'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="bg-zinc-900 border border-zinc-800 p-4 space-y-3 hover:border-indigo-500 transition-colors">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                    <span className="font-sans font-black text-xs text-white">
                      {isAr ? sub.nameAr : sub.nameEn}
                    </span>
                    <span className="bg-indigo-950/50 text-indigo-400 border border-indigo-900 font-mono text-[9px] font-black px-2 py-0.5 uppercase">
                      {sub.id}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-zinc-500 block">
                      {isAr ? 'فلسفة السرعة والإيقاع:' : 'Tempo Philosophy:'}
                    </span>
                    <p className="text-[11px] text-zinc-300 font-serif leading-relaxed">
                      {isAr ? sub.speedAr : sub.speedEn}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-xxs font-mono pt-1">
                    <span className="text-zinc-400">
                      {isAr ? sub.tokenAr : sub.tokenEn}
                    </span>
                    <span className="text-cyan-400 font-bold">
                      {isAr ? sub.priceAr : sub.priceEn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 5. Geopolitical Confrontation, "Distillation" Accusations & UX Gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Card A: Knowledge Distillation Accusations */}
        <div className="bg-red-50/30 border-2 border-red-200 p-5 space-y-3 relative">
          <div className="flex items-center gap-2 text-red-700">
            <ShieldAlert size={18} />
            <h4 className="font-sans font-black text-sm md:text-base uppercase tracking-tight">
              {isAr ? 'اتهامات "التقطير الفكري" والنزاع القانوني' : '"Knowledge Distillation" & Geopolitical Friction'}
            </h4>
          </div>

          <p className="text-xs md:text-sm text-zinc-800 font-serif leading-relaxed text-justify">
            {isAr ? (
              <>
                رغم القفزة التكنولوجية الكبيرة، تواجه "مونشوت" تحديات ترتبط بالملكية الفكرية وصراعات المنافسة العادلة مع القوى الغربية. حيث واجهت الشركة بجانب شقيقتها <strong>"ديب سيك" (DeepSeek)</strong> و<strong>"ميني ماكس" (MiniMax)</strong> اتهامات مباشرة وحادة من شركة <strong>"أنثروبيك" (Anthropic)</strong> الأميركية في فبراير. مفادها قيام النماذج الصينية بتدريب خوارزمياتها عبر سحب واستخلال قدرات نموذج (Claude) المتقدم عبر هجمات سحب منظمة تنتهك شروط الخدمة القياسية. (وهو ما تلتزم مونشوت الصمت حياله رسمياً).
              </>
            ) : (
              <>
                Despite its explosive rise, Moonshot faces friction regarding fair competition and IP boundaries. In February, the company—alongside fellow Chinese stars <strong>DeepSeek</strong> and <strong>MiniMax</strong>—faced direct, formal accusations from US-based <strong>Anthropic</strong>. The claims allege that the Chinese players trained their frontier architectures by scraping and "distilling" outputs from Claude in massive API harvesting campaigns that directly violate standard terms of service. (Moonshot has remained officially silent on these claims).
              </>
            )}
          </p>
          
          <div className="bg-white border border-red-200 text-red-950 text-[10px] font-mono px-2.5 py-1.5 flex items-center gap-1.5 rounded-none self-start">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-none inline-block"></span>
            <span>{isAr ? 'النزاع: أنثروبيك ضد عمالقة الصين' : 'CONFLICT: ANTHROPIC VS. CHINA CHIPS'}</span>
          </div>
        </div>

        {/* Card B: Performance/UX Gap Acknowledgement */}
        <div className="bg-amber-50/30 border-2 border-amber-200 p-5 space-y-3 relative">
          <div className="flex items-center gap-2 text-amber-700">
            <Award size={18} />
            <h4 className="font-sans font-black text-sm md:text-base uppercase tracking-tight">
              {isAr ? 'الاعتراف بالواقعية: فجوة الأداء الإجمالي' : 'Pragmatic Stance: The Frontier Performance Gap'}
            </h4>
          </div>

          <p className="text-xs md:text-sm text-zinc-800 font-serif leading-relaxed text-justify">
            {isAr ? (
              <>
                تتحلى قيادة "مونشوت" بواقعية تامة في تقييم الهوة التقنية الحالية؛ فعند الكشف عن نموذج الاستدلال الرائد <strong>"Kimi K3"</strong>، اعترف الأكاديمي يانغ تشيلين صراحة أنه على الرغم من الكفاءة الحسابية العالية لـ K3، إلا أنه ما زال هناك فجوة ملموسة في أداء الاستدلال التراكمي وتجربة المستخدم العامة والقدرة على الفهم العميق عند مقارنته بالنماذج الغربية الفائقة مثل <strong>Claude Fable 5</strong> و <strong>GPT-5</strong>.
              </>
            ) : (
              <>
                Moonshot\'s leadership adopts a remarkably realistic posture toward the technological divide. Upon unveiling their flagship reasoning engine, <strong>Kimi K3</strong>, Yang Zhilin openly conceded that despite K3’s state-of-the-art computational efficiency, a distinct gap remains in generalized user experience, reasoning density, and deep conceptual coherence compared to premier Western models like <strong>Claude Fable 5</strong> and <strong>GPT-5</strong>.
              </>
            )}
          </p>

          <div className="bg-white border border-amber-200 text-amber-950 text-[10px] font-mono px-2.5 py-1.5 flex items-center gap-1.5 rounded-none self-start">
            <span className="w-1.5 h-1.5 bg-amber-600 rounded-none inline-block"></span>
            <span>{isAr ? 'الواقع الفني: اعتراف علمي رصين' : 'TECHNICAL STAT: ACADEMIC CANDOR'}</span>
          </div>
        </div>

      </div>

      {/* 6. Strategic Conclusion / Summary Footer */}
      <div className="p-4 bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 font-serif leading-relaxed text-justify flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1 md:max-w-3xl">
          <span className="font-sans font-black text-zinc-950 block text-xs uppercase tracking-wider">
            {isAr ? 'الخلاصة والتحليل الجيوسياسي للورّاق' : 'Sovereign Intelligence Summation'}
          </span>
          <p className="text-[11px] md:text-xs">
            {isAr ? (
              'تجسد شركة "مونشوت" الاستراتيجية الصينية الجديدة في قطاع الذكاء الاصطناعي: تقديم نماذج محلية قوية، ذات كفاءة تشغيلية ممتازة، وأسعار تسعير هجومية قادرة على كسر احتكار الشركات الأميركية. ورغم الفجوة التكنولوجية الطفيفة والتوترات المتعلقة بالملكية الفكرية، فإن طموح الشركة للوصول إلى تقييم ٣٠ مليار دولار والاتجاه الصارم نحو بورصة هونغ كونغ يرسخ مكانتها كأحد أهم اللاعبين في صياغة النظام العالمي الجديد للذكاء الاصطناعي.'
            ) : (
              'Moonshot AI embodies China\'s strategic paradigm in the AI landscape: unleashing highly efficient local models with hyper-aggressive cost frameworks designed to break the Silicon Valley hegemony. Despite the current technical delta and IP friction, the firm’s $30B target valuation and strategic alignment with the Hong Kong Stock Exchange secure its role as a major pillar shaping the future of global machine intelligence.'
            )}
          </p>
        </div>
        <div className="text-left md:text-right font-mono text-[9px] text-zinc-400 border-t md:border-t-0 md:border-l border-zinc-200 pt-3 md:pt-0 md:pl-4 uppercase shrink-0">
          <span>DOCKET ID: #AI-MOONSHOT-2026</span>
          <br />
          <span>AL-WARRAQ CENTRAL INTEL UNIT</span>
        </div>
      </div>

    </div>
  );
}
