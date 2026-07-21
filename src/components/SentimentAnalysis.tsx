import React, { useState, useEffect } from 'react';
import { 
  BarChart2, 
  Search, 
  ExternalLink, 
  HelpCircle, 
  MessageSquare, 
  Cpu, 
  TrendingUp, 
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  Hash,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface SentimentPost {
  platform: string;
  userHandle: string;
  userName: string;
  originalText: string;
  summaryAr: string;
  summaryEn: string;
  sentiment: 'positive' | 'neutral' | 'negative' | string;
  score: number;
  topics: string[];
  url: string;
  timestamp: string;
}

interface SentimentData {
  feed: SentimentPost[];
  globalSentimentScore: number;
  topicsCloud: { text: string; weight: number }[];
}

interface SentimentAnalysisProps {
  language: 'ar' | 'en';
  layoutMode: any;
}

export default function SentimentAnalysis({ language, layoutMode }: SentimentAnalysisProps) {
  const isAr = language === 'ar';
  
  // Interactive search state starting with a key sovereign brand tag
  const [searchTarget, setSearchTarget] = useState(isAr ? 'مفاوضات لبنان وإسرائيل' : 'Lebanon-Israel Negotiations');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentimentResult, setSentimentResult] = useState<SentimentData | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(true);

  // Load initial sentiment scrape target on mount
  useEffect(() => {
    handleRunAnalysis();
  }, []);

  const handleRunAnalysis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTarget.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/sentiment/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: searchTarget })
      });

      if (!response.ok) {
        throw new Error(isAr ? 'فشل الاتصال بخادم تحليل المشاعر.' : 'Failed to reach sentiment database.');
      }

      const data = await response.json();
      if (data && data.feed) {
        setSentimentResult(data);
      } else {
        throw new Error(isAr ? 'استجابة الخادم غير صالحة.' : 'Invalid server response structure.');
      }
    } catch (err: any) {
      console.error("Sentiment analysis error:", err);
      setError(err?.message || (isAr ? 'عطل غير متوقع في محرك التلخيص.' : 'Unexpected telemetry malfunction.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Group feed posts by platforms for the columns
  const platformsList = ['X', 'Facebook', 'LinkedIn', 'Instagram'];
  
  const getPostsForPlatform = (platformName: string): SentimentPost[] => {
    if (!sentimentResult || !sentimentResult.feed) return [];
    return sentimentResult.feed.filter(
      p => p.platform.toLowerCase() === platformName.toLowerCase()
    );
  };

  // Colors & icons matching platform guidelines
  const getPlatformDetails = (platformName: string) => {
    switch (platformName.toLowerCase()) {
      case 'x':
        return {
          bgColor: 'bg-black',
          textColor: 'text-white',
          accentColor: 'border-zinc-800',
          logoText: '𝕏',
          badgeStyle: 'bg-black text-white border-zinc-100'
        };
      case 'facebook':
        return {
          bgColor: 'bg-[#1877F2]',
          textColor: 'text-white',
          accentColor: 'border-blue-750',
          logoText: '𝗙',
          badgeStyle: 'bg-blue-50 text-[#1877F2] border-blue-200'
        };
      case 'linkedin':
        return {
          bgColor: 'bg-[#0A66C2]',
          textColor: 'text-white',
          accentColor: 'border-cyan-800',
          logoText: '𝗶𝗻',
          badgeStyle: 'bg-cyan-50 text-[#0A66C2] border-cyan-200'
        };
      case 'instagram':
        return {
          bgColor: 'bg-gradient-to-r from-[#833AB4] via-[#F56040] to-[#FCAF45]',
          textColor: 'text-white',
          accentColor: 'border-rose-400',
          logoText: '🝔',
          badgeStyle: 'bg-rose-50 text-[#E4405F] border-rose-200'
        };
      case 'reddit':
        return {
          bgColor: 'bg-[#FF4500]',
          textColor: 'text-white',
          accentColor: 'border-orange-800',
          logoText: '𝗿/',
          badgeStyle: 'bg-orange-50 text-[#FF4500] border-orange-200'
        };
      case 'substack':
        return {
          bgColor: 'bg-[#FF6719]',
          textColor: 'text-white',
          accentColor: 'border-amber-700',
          logoText: '🍊',
          badgeStyle: 'bg-amber-50 text-[#FF6719] border-amber-200'
        };
      default:
        return {
          bgColor: 'bg-zinc-650',
          textColor: 'text-white',
          accentColor: 'border-zinc-700',
          logoText: '•',
          badgeStyle: 'bg-zinc-100 text-zinc-700 border-zinc-300'
        };
    }
  };

  const calculatePlatformBreakdownState = () => {
    if (!sentimentResult || !sentimentResult.feed) return [];
    
    return platformsList.map(p => {
      const posts = getPostsForPlatform(p);
      const total = posts.length || 1;
      const posCount = posts.filter(item => item.sentiment === 'positive').length;
      const negCount = posts.filter(item => item.sentiment === 'negative').length;
      const neuCount = posts.filter(item => item.sentiment === 'neutral' || !['positive','negative'].includes(item.sentiment)).length;

      return {
        platform: p,
        positivePct: Math.round((posCount / total) * 100),
        negativePct: Math.round((negCount / total) * 100),
        neutralPct: Math.round((neuCount / total) * 100),
      };
    });
  };

  const platformsStats = calculatePlatformBreakdownState();

  return (
    <div className="w-full max-w-7xl mx-auto px-1 space-y-7 select-none font-sans" id="sentiment-page-wrapper">
      
      {/* Editorial Headline Panel */}
      <div className="border-4 border-black p-7 bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" id="sentiment-title-hero">
        <div className="absolute top-0 right-0 w-28 h-28 bg-red-600/10 rounded-full blur-2xl translate-x-12 -translate-y-12"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-black pb-5 mb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[14px] font-black text-white bg-red-650 px-2.5 py-1 border border-black uppercase animate-pulse">
                {isAr ? 'الاستخبارات السيادية' : 'SOVEREIGN OSINT TELEMETRY'}
              </span>
              <span className="font-mono text-[15px] text-zinc-400 font-bold">CORE-ENGINE v3.45</span>
            </div>
            <h1 className="font-sans font-black text-[23px] md:text-[30px] text-black tracking-tight leading-none uppercase">
              {isAr ? 'ديوان رصد المشاعر العامة والكلمات الساخنة' : 'CONSUMER SENTIMENT & OSINT FEED CONSOLE'}
            </h1>
            <p className="text-zinc-500 text-[18px] font-medium font-serif leading-relaxed">
              {isAr 
                ? 'مجمّع "تويت-ديك" الفوري وعمود رصد السرديات واستخلاص التقارير السنوية والشهرية الذكية.' 
                : 'Real-time multi-platform consumer sentiment dashboard reflecting public discourse across networks.'}
            </p>
          </div>

          <div className="mt-5 md:mt-0 flex gap-2.5">
            <button
              id="toggle-report-btn"
              onClick={() => setIsReportOpen(!isReportOpen)}
              className="bg-black hover:bg-zinc-900 text-white font-mono font-black text-[15px] uppercase tracking-widest px-5 py-3 border border-black transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex items-center gap-2.5 cursor-pointer"
            >
              <BarChart2 size={16} />
              {isAr ? (isReportOpen ? 'إخفاء التقرير العام' : 'عرض التقرير العام') : (isReportOpen ? 'COLLAPSE ANALYTICS' : 'EXPAND ANALYTICS')}
            </button>
          </div>
        </div>

        {/* Brand Scraper Command Center */}
        <form onSubmit={handleRunAnalysis} className="grid grid-cols-1 md:grid-cols-12 gap-3.5" id="sentiment-search-form">
          <div className="md:col-span-8 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
              <Search size={19} />
            </span>
            <input
              id="sentiment-search-input"
              type="text"
              required
              disabled={isLoading}
              value={searchTarget}
              onChange={(e) => setSearchTarget(e.target.value)}
              placeholder={isAr ? 'أدخل اسم الشركة، الموضوع، أو الحدث...' : 'Enter brand keyword, politician name, or strategic assets...'}
              className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border-2 border-black text-black font-sans font-black text-[18px] md:text-[20px] shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.1)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all text-left rtl:text-right rtl:pl-4 rtl:pr-11"
            />
          </div>
          <div className="md:col-span-4 flex gap-2.5">
            <button
              id="scrape-trigger-btn"
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#b91c1c] hover:bg-black text-white font-mono font-black text-[15px] tracking-widest uppercase transition-all py-3.5 border-2 border-black select-none cursor-pointer flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none disabled:bg-zinc-300 disabled:text-zinc-500 disabled:border-zinc-400 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <Cpu size={17} className={isLoading ? "animate-spin" : ""} />
              {isLoading ? (isAr ? 'جاري الرصد والتحليل...' : 'RUNNING CORE ANALYSIS...') : (isAr ? 'رصد وتحليل المشاعر الفورية' : 'INITIATE AI SCRAPING ENGINE')}
            </button>
          </div>
        </form>
      </div>

      {/* Upper Feature Section of the Page dated Today (July 10, 2026) focusing on Lebanon-Israel negotiations */}
      <div className="border-4 border-black p-7 bg-[#fbfbf9] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] text-left rtl:text-right space-y-6" id="upper-feature-negotiations">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 border-b-2 border-black pb-6">
          {/* Main Story Column */}
          <div className="lg:w-7/12 space-y-3.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-mono text-[13px] font-black text-white bg-red-650 px-2.5 py-1 border border-black uppercase animate-pulse">
                {isAr ? 'قصة مميزة عاجلة - اليوم' : "TODAY'S SPECIAL DISPATCH"}
              </span>
              <span className="font-mono text-[14px] text-zinc-500 font-bold">
                {isAr ? 'الجمعة، ١٠ يوليو ٢٠٢٦' : 'Friday, July 10, 2026'}
              </span>
              <span className="font-mono text-[13px] text-zinc-400">|</span>
              <span className="font-mono text-[13px] text-emerald-600 font-bold">
                {isAr ? 'رصد فوري متقلب' : 'LIVE DISCOURSE VOLATILITY'}
              </span>
            </div>
            
            <h2 className="font-sans font-black text-[21px] md:text-[25px] text-black tracking-tight leading-snug uppercase">
              {isAr 
                ? 'مفاوضات وقف إطلاق النار: انقسام حاد في مشاعر الشارع مع تسريب الملحق الأمني السري والتحذير من البند ١٣' 
                : 'CEASEFIRE TELEMETRY: PUBLIC SENTIMENT SHARPLY DIVIDED AS SECRETS OF THE SECURITY ANNEX EXPOSE ASYMMETRIC RIGHTS'}
            </h2>
            
            <div className="font-serif text-[15.5px] leading-relaxed text-zinc-800 space-y-3 select-text">
              <p>
                {isAr ? (
                  <>
                    <strong>بيروت —</strong> مع دخول الاتفاق الإطاري اللبناني الإسرائيلي المكون من 14 نقطة مرحلة التدقيق الشعبي الحرجة اليوم، رصد مركز الاستخبارات الرقمية التابع لـ «الورّاق نيوز» تقلبات حادة في مشاعر الرأي العام عبر مختلف المنصات الاجتماعية. في حين يهيمن التفاؤل والارتياح على منصات إنستغرام وفيسبوك (محرزة ذروة تفاؤل إيجابي بنسبة ٥٨٪) بسبب الرغبة الملحة لعودة النازحين إلى مدن وقرى الجنوب واستقرار الأوضاع الميدانية، يعتمل في عمق منصة «إكس» والشبكات المهنية استياء شديد وحذر قانوني بالغ.
                  </>
                ) : (
                  <>
                    <strong>BEIRUT —</strong> As the US-mediated 14-point framework agreement between Lebanon and Israel enters its critical public vetting phase today, Al-Warraq's digital intelligence core has observed unprecedented volatility in citizen cognitive mapping across social networks. While mainstream networks like Instagram and Facebook strike an optimistic tone regarding border de-escalation and the repatriation of displaced families (drawing a 58% positive sentiment peak on hopes of returning to Tyre and Nabatieh), a deep undercurrent of legal anxiety is sweeping through X (Twitter) and professional directories.
                  </>
                )}
              </p>
              <p>
                {isAr ? (
                  <>
                    وتتركز الانتقادات الرقمية والهاشتاغات النشطة اليوم حول تسريبين بالغي الخطورة: «الملحق الأمني السري» الذي يربط الانسحاب الإسرائيلي بنزع السلاح دون جداول زمنية محددة ويمنح الطيران الإسرائيلي حرية العمل العسكري، والمادة ١٣ من الاتفاق الإطاري التي تحرم الدولة اللبنانية من سيادتها في مقاضاة إسرائيل أمام المحافل القانونية الدولية عن خسائر الحرب. ويندد المغردون اللبنانيون بما يصفونه بـ «المفارقة التاريخية المحرجة» لرئيس الوزراء نواف سلام، وهو الرئيس السابق لمحكمة العدل الدولية، الذي يرأس حالياً حكومة تتخلى تحت الضغط الدولي عن حقوق المساءلة القانونية للبنان مقابل وقف حرب مدمرة.
                  </>
                ) : (
                  <>
                    The focus of public ire centers on two highly controversial disclosures: the unreleased 'Secret Security Annex' (which leaks suggest codifies Israeli military intervention rights and ties withdrawal to Hezbollah disarming with no fixed schedules) and the notorious 'Article 13' (which strips Beirut of its sovereignty to pursue international legal accountability). Lebanese social media users are actively pointing to the profound historical irony of Prime Minister Nawaf Salam—a former President of the International Court of Justice (ICJ)—administering a framework that forces his own state to withdraw complaints of war crimes from international forums.
                  </>
                )}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3.5 border-t border-zinc-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 border-2 border-black flex items-center justify-center font-sans font-black text-xs text-zinc-900 select-none shrink-0">
                  MB
                </div>
                <div>
                  <span className="font-sans font-black text-[14px] text-black block leading-none">
                    {isAr ? 'معن برازي' : 'Maan Barazy'}
                  </span>
                  <span className="font-mono text-[11.5px] text-zinc-500 font-bold leading-none">
                    {isAr ? 'رئيس تحرير صحيفة الورّاق' : 'Editor-in-Chief, Al-Warraq'}
                  </span>
                </div>
              </div>

              {/* Action Button to activate the detailed dashboard for this topic */}
              <button
                type="button"
                onClick={() => {
                  setSearchTarget(isAr ? 'مفاوضات لبنان وإسرائيل' : 'Lebanon-Israel Negotiations');
                  setTimeout(() => {
                    handleRunAnalysis();
                    const el = document.getElementById('tweetdeck-container');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-black hover:bg-red-750 text-white hover:text-white font-mono font-black text-[13px] uppercase tracking-widest px-4 py-2.5 border border-black transition-colors shadow-[2px_2px_0px_0px_rgba(185,28,28,1)] flex items-center gap-2 cursor-pointer select-none"
              >
                <span>{isAr ? 'تحديث وتدقيق بيانات المشاعر الفورية ←' : 'ACTIVATE COGNITIVE WIRE DECK →'}</span>
              </button>
            </div>
          </div>

          {/* Metrics Column */}
          <div className="w-full lg:w-5/12 bg-white border-2 border-black p-5 space-y-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center pb-2 border-b border-dashed border-zinc-300">
              <span className="font-mono text-[13px] font-black uppercase text-zinc-500">
                {isAr ? 'مؤشرات النبض الرقمي الميداني' : 'CEASEFIRE DISCOURSE RATINGS'}
              </span>
              <span className="font-mono text-[11px] font-black uppercase text-white bg-[#b91c1c] px-1.5 py-0.5 animate-pulse">
                {isAr ? '١٠ يوليو ٢٠٢٦' : 'JULY 10, 2026'}
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Metric 1 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[14px] font-bold">
                  <span className="text-zinc-800">{isAr ? 'الرغبة في الاستقرار وعودة النازحين' : 'Border De-escalation & Repatriation'}</span>
                  <span className="text-emerald-600 font-black">58% {isAr ? 'إيجابي' : 'POS'}</span>
                </div>
                <div className="w-full h-3 bg-zinc-100 border border-zinc-300 rounded-xs overflow-hidden">
                  <div className="h-full bg-emerald-400 transition-all" style={{ width: '58%' }}></div>
                </div>
                <p className="text-[11.5px] text-zinc-500 font-serif leading-tight">
                  {isAr 
                    ? 'أمل عارم بعودة الأسر النازحة إلى صور والنبطية والخط الأزرق.' 
                    : 'Intense public longing for regional safety, return to Tyre/Nabatieh, and end of airstrikes.'}
                </p>
              </div>

              {/* Metric 2 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[14px] font-bold">
                  <span className="text-zinc-800">{isAr ? 'السيادة والاعتراض على الملحق الأمني' : 'Security Annex & Airspace Control'}</span>
                  <span className="text-rose-600 font-black">84% {isAr ? 'سلبي' : 'NEG'}</span>
                </div>
                <div className="w-full h-3 bg-zinc-100 border border-zinc-300 rounded-xs overflow-hidden">
                  <div className="h-full bg-rose-500 transition-all" style={{ width: '84%' }}></div>
                </div>
                <p className="text-[11.5px] text-zinc-500 font-serif leading-tight">
                  {isAr 
                    ? 'رفض شعبي جارف لمنح سلاح الجو الأجنبي حرية الحركة والعمل الميداني.' 
                    : 'Severe resentment regarding foreign airspace operational freedom in southern Lebanon.'}
                </p>
              </div>

              {/* Metric 3 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[14px] font-bold">
                  <span className="text-zinc-800">{isAr ? 'التنازل القانوني والمساءلة (البند ١٣)' : 'Article 13 Waiver & Accountability'}</span>
                  <span className="text-rose-600 font-black">78% {isAr ? 'سلبي' : 'NEG'}</span>
                </div>
                <div className="w-full h-3 bg-zinc-100 border border-zinc-300 rounded-xs overflow-hidden">
                  <div className="h-full bg-rose-400 transition-all" style={{ width: '78%' }}></div>
                </div>
                <p className="text-[11.5px] text-zinc-500 font-serif leading-tight">
                  {isAr 
                    ? 'استياء بالغ من إسقاط لبنان حقه في ملاحقة إسرائيل قانونياً في المحافل الدولية.' 
                    : 'Widespread distress over state withdrawal of ICC/ICJ complaints as a pricing hurdle for peace.'}
                </p>
              </div>

              {/* Metric 4 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[14px] font-bold">
                  <span className="text-zinc-800">{isAr ? 'إعادة الإعمار والتمويل الخارجي' : 'Telecom & Utility Reconstruction'}</span>
                  <span className="text-zinc-650 font-black">65% {isAr ? 'مستقر' : 'NEU/POS'}</span>
                </div>
                <div className="w-full h-3 bg-zinc-100 border border-zinc-300 rounded-xs overflow-hidden">
                  <div className="h-full bg-blue-400 transition-all" style={{ width: '65%' }}></div>
                </div>
                <p className="text-[11.5px] text-zinc-500 font-serif leading-tight">
                  {isAr 
                    ? 'تطلع حذر لبدء تمويل وتدقيق تأهيل الاتصالات وشبكات الكهرباء والمياه.' 
                    : 'Cautious hope that international funds will quickly restore Alfa/Touch telecom stations.'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-dashed border-zinc-200 text-center">
              <span className="font-mono text-[11px] text-zinc-400 font-bold uppercase">
                {isAr ? 'عينة الرصد المستهدفة: ٢,٥٠٠ تدوينة مصنفة بالذكاء الاصطناعي' : 'DISCOURSE COHORT: 2,500 MODEL-CLASSIFIED SOCIAL POSTS'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Monitoring Feature Introduction & Highlight Bar */}
      <div className="border-4 border-black p-6 bg-amber-50 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] text-left rtl:text-right space-y-4" id="social-monitoring-intro-feature">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[14px] font-black text-white bg-black px-2.5 py-1 uppercase rounded-xs">
              {isAr ? 'ميزة رصد شبكات التواصل' : 'FEATURE: SOCIAL MEDIA MONITORING ENGINE'}
            </span>
            <p className="text-black font-sans font-black text-[18px] md:text-[20px] uppercase">
              {isAr ? 'منظومة الذكاء الاصطراطي المتطورة لرصد النبض والتوجهات عبر المنصات' : 'ADVANCED MULTI-CHANNEL PUBLIC COGNITIVE MONITORING'}
            </p>
            <p className="text-zinc-700 font-serif text-[16px] leading-relaxed">
              {isAr 
                ? 'تقوم هذه المنظومة بمسح فوري لأكثر من 120 نقطة اتصال وعقدة رقمية في الثانية الواحدة، مكنونة من تحليل السرديات واستخلاص التقارير اللحظية وإشارات التحذير المبكر للماركات والشركات والموضوعات الاستراتيجية بدقة فائقة.' 
                : 'Our neural core system scans more than 120 digital nodes per second across major channels including X, Facebook, LinkedIn, and Instagram. Applying advanced deep learning model summarization, it reveals public perception, flags critical complain trends, and tracks strategic brand assets in real-time.'}
            </p>
          </div>
        </div>

        {/* Highlight Bar of Key Findings and Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t-2 border-black font-mono" id="social-metrics-highlight-bar">
          <div className="bg-white border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center md:text-left rtl:md:text-right">
            <span className="text-[13px] text-zinc-500 font-bold block">{isAr ? 'عقد الشبكة الفعالة' : 'ACTIVE CHANNELS'}</span>
            <span className="text-[20px] font-black text-black">4 PLATFORMS</span>
          </div>
          <div className="bg-white border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center md:text-left rtl:md:text-right">
            <span className="text-[13px] text-zinc-500 font-bold block">{isAr ? 'زمن الاستجابة للشبكة' : 'METRIC ENGAGEMENT'}</span>
            <span className="text-[20px] font-black text-emerald-600">180ms REACTION</span>
          </div>
          <div className="bg-white border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center md:text-left rtl:md:text-right col-span-1 md:col-span-2">
            <span className="text-[13px] text-[#b91c1c] font-black block">📢 {isAr ? 'الخلاصة والنتائج البارزة' : 'KEY TELEMETRY FINDING'}</span>
            <span className="text-[15px] font-black text-black line-clamp-1">
              {isAr 
                ? 'ثقة متنامية وإيجابية بنسبة (+38) حول منطقة بيروت الرقمية مع حياد مستقر للبنية التحتية.' 
                : 'Robust discourse advantage (+38) observed; high sentiment indexes on Beirut Digital District.'}
            </span>
          </div>
        </div>
      </div>

      {/* Error telemetry */}
      {error && (
        <div id="sentiment-error-banner" className="p-5 bg-red-50 border-4 border-[#b91c1c] text-red-800 flex items-start gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <AlertTriangle className="text-[#b91c1c] shrink-0 mt-0.5 animate-bounce" size={21} />
          <div className="space-y-1.5 text-left rtl:text-right">
            <h4 className="font-mono text-xs font-black uppercase text-red-500">{isAr ? 'إخفاق الرصد الفوري' : 'DISPATCH AGGREGATION FAILURE'}</h4>
            <p className="font-medium text-[15px] leading-relaxed">{error}</p>
            <button 
              onClick={() => handleRunAnalysis()} 
              className="mt-2 text-[13px] font-mono font-bold uppercase underline cursor-pointer text-[#b91c1c] hover:text-black inline-flex items-center gap-1.5"
            >
              <RotateCcw size={13} /> {isAr ? 'إعادة الإرسال الفوري' : 'TRIGGER SECONDARY RELAY'}
            </button>
          </div>
        </div>
      )}

      {/* Redesigned Consumer Sentiment featured analytics in ONE unified Row */}
      {isReportOpen && sentimentResult && (
        <div 
          id="sentiment-report-featured-row" 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 border-4 border-black p-6 bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] animate-fade-in"
        >
          {/* Card 1: Global Gauge Chart */}
          <div className="border-2 border-black p-5 space-y-4 bg-zinc-50 flex flex-col justify-between" id="gauge-score-widget">
            <div>
              <div className="flex justify-between items-center pb-2.5 border-b border-dashed border-zinc-355">
                <span className="font-mono text-[15px] text-zinc-500 font-extrabold uppercase">GLOBAL HEALTH INDEX</span>
                <span className="font-mono text-[16px] font-black uppercase text-[#b91c1c]">VERIFIED RANGE</span>
              </div>
              
              {/* Semi-circular gauge SVG */}
              <div className="relative flex flex-col items-center pt-3">
                <svg className="w-48 h-28" viewBox="0 0 100 55">
                  {/* Background Track Arc */}
                  <path 
                    d="M 10 50 A 40 40 0 0 1 90 50" 
                    fill="none" 
                    stroke="#e4e4e7" 
                    strokeWidth="10" 
                    strokeLinecap="round"
                  />
                  {/* Color segments representing general indicators */}
                  <path 
                    d="M 10 50 A 40 40 0 0 1 35 21" 
                    fill="none" 
                    stroke="#fca5a5" 
                    strokeWidth="10" 
                  />
                  <path 
                    d="M 35 21 A 40 40 0 0 1 65 21" 
                    fill="none" 
                    stroke="#e4e4e7" 
                    strokeWidth="10" 
                  />
                  <path 
                    d="M 65 21 A 40 40 0 0 1 90 50" 
                    fill="none" 
                    stroke="#a7f3d0" 
                    strokeWidth="10" 
                  />

                  {/* Active Value Arc overlay */}
                  {(() => {
                    const score = sentimentResult.globalSentimentScore;
                    const anglePct = (score + 100) / 200;
                    const angleRad = Math.PI - anglePct * Math.PI;
                    const radius = 35;
                    const endX = 50 + radius * Math.cos(angleRad);
                    const endY = 50 - radius * Math.sin(angleRad);
                    
                    return (
                      <g>
                        <line 
                          x1="50" 
                          y1="50" 
                          x2={endX} 
                          y2={endY} 
                          stroke="black" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                        />
                        <circle cx="50" cy="50" r="4" fill="black" />
                      </g>
                    );
                  })()}
                </svg>

                {/* Score numbers block */}
                <div className="absolute bottom-1 flex flex-col items-center">
                  <span className="font-sans font-black text-[30px] tracking-tight leading-none text-black select-none">
                    {sentimentResult.globalSentimentScore > 0 ? '+' : ''}{sentimentResult.globalSentimentScore}
                  </span>
                  <span className="font-mono text-[14px] uppercase tracking-wider font-bold text-zinc-450 mt-1">
                    {sentimentResult.globalSentimentScore > 30 
                      ? (isAr ? 'الأكثر إيجابية وثقة' : 'HIGH DISCOURSE ADVANTAGE') 
                      : sentimentResult.globalSentimentScore < -10 
                      ? (isAr ? 'مخاطر استياء وصخب' : 'VOLATILE REVIEWS DETECTED') 
                      : (isAr ? 'حياد مستقر مائل للموضوعية' : 'BALANCED MODERATE CONTEXT')
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Score Range explanation */}
            <div className="grid grid-cols-3 text-center pt-3.5 font-mono text-[14px] font-black text-zinc-500 uppercase border-t border-zinc-200 mt-2">
              <div>
                <span className="block text-rose-600">-100</span>
                <span className="text-[13px]">{isAr ? 'سلبي مطلق' : 'CRITICAL COMPLAINTS'}</span>
              </div>
              <div>
                <span className="block text-zinc-650">0</span>
                <span className="text-[13px]">{isAr ? 'حياد تام' : 'NEUTRAL POINT'}</span>
              </div>
              <div>
                <span className="block text-emerald-600">+100</span>
                <span className="text-[13px]">{isAr ? 'ثقة مطلقة' : 'ENTHUSIASTIC SUPPORT'}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Platform Comparison Breakdowns */}
          <div className="border-2 border-black p-5 space-y-5 bg-zinc-50" id="platform-breakdown-widget">
            <div className="flex justify-between items-center pb-1.5 border-b border-dashed border-zinc-300">
              <span className="font-mono text-[15px] text-zinc-500 font-extrabold uppercase">COGNITIVE PLATFORM DISPERSION</span>
              <span className="font-mono text-[15px] text-zinc-400 font-bold">% Pos vs % Neg</span>
            </div>

            <div className="space-y-3.5">
              {platformsStats.map((stat) => {
                const details = getPlatformDetails(stat.platform);
                return (
                  <div key={stat.platform} className="space-y-1.5">
                    <div className="flex justify-between items-center font-mono text-[15.5px]">
                      <span className="font-bold uppercase flex items-center gap-1.5">
                        <span className={`${details.bgColor} w-2.5 h-2.5 rounded-xs inline-block`}></span>
                        {stat.platform}
                      </span>
                      
                      <div className="flex items-center gap-2 text-[14.5px]">
                        <span className="text-emerald-600 font-black">+{stat.positivePct}%</span>
                        <span className="text-zinc-400">/</span>
                        <span className="text-zinc-600 font-bold">{stat.neutralPct}%</span>
                        <span className="text-zinc-400">/</span>
                        <span className="text-rose-600 font-black">-{stat.negativePct}%</span>
                      </div>
                    </div>

                    {/* Stacked bar ratio comparison */}
                    <div className="w-full h-4 bg-zinc-200 border border-black flex overflow-hidden rounded-xs">
                      {stat.positivePct > 0 && (
                        <div 
                          style={{ width: `${stat.positivePct}%` }} 
                          className="h-full bg-emerald-400 transition-all border-none"
                          title="Positive ratio"
                        />
                      )}
                      {stat.neutralPct > 0 && (
                        <div 
                          style={{ width: `${stat.neutralPct}%` }} 
                          className="h-full bg-zinc-300 transition-all border-none"
                          title="Neutral ratio"
                        />
                      )}
                      {stat.negativePct > 0 && (
                        <div 
                          style={{ width: `${stat.negativePct}%` }} 
                          className="h-full bg-rose-450 transition-all border-none"
                          title="Negative ratio"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 3: Key Topics Heatmap Word Cloud */}
          <div className="border-2 border-black p-5 bg-zinc-50 flex flex-col justify-between" id="topics-word-cloud-widget">
            <div>
              <div className="flex justify-between items-center pb-2 border-b border-dashed border-zinc-300 mb-3.5">
                <span className="font-mono text-[15px] text-zinc-500 font-extrabold uppercase">HOT DISCUSSION THEMES</span>
                <span className="font-mono text-[15px] text-[#b91c1c] font-black uppercase flex items-center gap-0.5">
                  <Hash size={12} /> WEIGHT FACTOR
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 justify-center leading-relaxed">
                {sentimentResult.topicsCloud && sentimentResult.topicsCloud.length > 0 ? (
                  sentimentResult.topicsCloud.map((topic, index) => {
                    const w = Math.max(3, Math.min(10, topic.weight));
                    const fontSizes = [
                      'text-[15px]', 
                      'text-[15.5px]', 
                      'text-[16px]', 
                      'text-[16.5px]', 
                      'text-[17px]', 
                      'text-[17.5px]', 
                      'text-[18px]', 
                      'text-[19px] font-extrabold', 
                      'text-[20px] font-black text-[#b91c1c]', 
                      'text-[21px] font-black text-[#b91c1c] border border-black/10 px-1', 
                      'text-[22px] font-black text-[#b91c1c] border-2 border-black px-2 py-0.5 bg-white shadow-[1px_1px_0px_rgba(0,0,0,1)]' 
                    ];
                    
                    const sizeClass = fontSizes[w] || 'text-[18px]';
                    
                    return (
                      <span 
                        key={index} 
                        className={`font-mono uppercase transition-colors select-all rounded-xs hover:bg-[#b91c1c] hover:text-white cursor-help ${sizeClass} text-zinc-800 p-1`}
                        title={`Extracted weight density score: ${topic.weight}`}
                      >
                        {topic.text}
                      </span>
                    );
                  })
                ) : (
                  <p className="text-[16px] text-zinc-400 font-mono italic">No themes extracted from sample size.</p>
                )}
              </div>
            </div>

            <div className="p-3 bg-white border border-dashed border-zinc-300 mt-4">
              <p className="text-[15px] text-zinc-450 font-serif leading-normal select-text">
                {isAr 
                  ? 'التحذير الإجرائي: ترتفع الأوزان تصاعدياً للدلالة الإحصائية.'
                  : 'System notice: Word sizes indicate proportional volume of user mentions and density weight.'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Primary Workspace Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Dynamic TweetDeck Column Feed Container - Now full standard 12 columns to show all columns */}
        <div className="col-span-12 border-4 border-black bg-neutral-100 p-5 space-y-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
          id="tweetdeck-container"
        >
          <div className="flex justify-between items-center pb-3 border-b-2 border-black" id="tweetdeck-header">
            <div>
              <h3 className="font-sans font-black text-[15px] uppercase tracking-wider text-black flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#b91c1c] animate-pulse"></span>
                {isAr ? 'ديوان رصيف الاتصالات والإرساليات الفورية' : 'LIVE CROSS-PLATFORM CONSUMER TWEETDECK WIRE'}
              </h3>
              <p className="text-[16px] text-zinc-505 font-serif mt-0.5">
                {isAr 
                  ? 'روافد البيانات الفورية مصنفة هرمياً لكل وسيط تواصل اجتماعي مع التلخيص الثنائي.' 
                  : 'Horizontal or grid columns layout representing processed postings across major directories.'}
              </p>
            </div>
            
            <div className="flex items-center gap-2.5 font-mono text-[15px] text-zinc-400">
              <span className="px-2.5 py-1 bg-zinc-200 text-zinc-800 border-zinc-300 font-bold">8 WIRES UNLOCKED</span>
            </div>
          </div>

          {/* Scrape Target Badge Indicator */}
          {sentimentResult && (
            <div className="flex items-center gap-2.5 py-2 px-3.5 bg-white border border-zinc-300 font-mono text-[16px] text-zinc-650 rounded-xs">
              <span className="text-zinc-400">📍 TARGET:</span>
              <span className="font-black text-black uppercase">"{searchTarget}"</span>
              <span className="text-zinc-300">|</span>
              <span className="text-emerald-600 font-bold select-none flex items-center gap-1.5">
                <CheckCircle size={15} /> {isAr ? 'مستدام وموثّق بالذكاء اصطناعي' : 'MODEL VERIFIED'}
              </span>
            </div>
          )}

          {isLoading ? (
            /* Loading State styled beautifully with news agency ticker tape */
            <div className="py-28 flex flex-col items-center justify-center space-y-5 bg-white border border-zinc-300 rounded-xs shadow-inner" id="deck-loading-view">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-zinc-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#b91c1c] border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-5 bg-zinc-50 rounded-full flex items-center justify-center">
                  <Cpu className="text-[#b91c1c] animate-pulse" size={24} />
                </div>
              </div>
              <div className="space-y-2 text-center px-5">
                <p className="font-mono text-xs font-black text-zinc-800 tracking-widest uppercase">
                  {isAr ? 'جاري تحفيز شبكة الرصد الفوري...' : 'ENGAGING DECK TELEMETRY...'}
                </p>
                <div className="max-w-xs mx-auto overflow-hidden bg-zinc-100 h-1.5 relative">
                  <div className="absolute top-0 bottom-0 left-0 bg-[#b91c1c] w-1/2 animate-[sidebarTranslate_1s_infinite_linear]"></div>
                </div>
                <p className="text-[12px] text-zinc-400 italic">
                  {isAr ? 'مزامنة فيسبوك، إكس، لينكدإن، وإنستغرام...' : 'Scraping and running model digests on all four major networks...'}
                </p>
              </div>
            </div>
          ) : (
            /* Redesigned to show ALL columns in a high-density, fully visible grid! No horizontal scrollbar lock anymore */
            <div className="w-full" id="horizontal-deck-scroller">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {platformsList.map((p) => {
                  const posts = getPostsForPlatform(p);
                  const pStyle = getPlatformDetails(p);

                  return (
                    <div 
                      key={p} 
                      className="bg-white border-2 border-black flex flex-col shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-full rounded-xs overflow-hidden"
                      id={`column-${p}`}
                    >
                      {/* Column Title header */}
                      <div className={`p-3.5 ${pStyle.bgColor} ${pStyle.textColor} border-b-2 border-black flex justify-between items-center`}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[15px] font-black bg-white/20 px-2 py-0.5 rounded-xs">
                            {pStyle.logoText}
                          </span>
                          <span className="font-mono text-[15px] font-black uppercase tracking-widest">
                            {p}
                          </span>
                        </div>
                        <span className="font-mono text-[14px] font-bold opacity-80">
                          {posts.length} {posts.length === 1 ? 'wire' : 'wires'}
                        </span>
                      </div>

                      {/* Posts Stack card feed */}
                      <div className="p-3 space-y-4 bg-zinc-50/50">
                        {posts.length === 0 ? (
                          <div className="py-24 text-center text-zinc-400 space-y-2.5">
                            <HelpCircle className="mx-auto opacity-35" size={27} />
                            <p className="font-mono text-[15px] uppercase italic">
                              {isAr ? 'في انتظار البرقية' : 'Awaiting wires'}
                            </p>
                          </div>
                        ) : (
                          posts.map((post, idx) => {
                            const isPositive = post.sentiment === 'positive';
                            const isNegative = post.sentiment === 'negative';
                            
                            return (
                              <div 
                                key={idx} 
                                className="bg-white border-2 border-black p-4 space-y-3.5 group hover:scale-[1.02] transition-transform shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                                id={`post-card-${p}-${idx}`}
                              >
                                {/* Upper row of metadata */}
                                <div className="flex justify-between items-start gap-1 pb-2 border-b border-dashed border-zinc-200">
                                  <div className="text-left">
                                    <h4 className="font-sans font-black text-[16px] text-zinc-900 leading-tight">
                                      {post.userName}
                                    </h4>
                                    <span className="font-mono text-[14px] text-zinc-400 block font-bold leading-none select-text">
                                      {post.userHandle}
                                    </span>
                                  </div>
                                  <span className="font-mono text-[14px] text-zinc-400 font-bold shrink-0">
                                    {post.timestamp}
                                  </span>
                                </div>

                                {/* Original post excerpt */}
                                <p className="text-[16px] text-zinc-800 leading-relaxed font-serif text-left rtl:text-right select-text italic border-l-2 border-zinc-200 pl-2">
                                  "{post.originalText}"
                                </p>

                                {/* AI Intelligence summarizer block */}
                                <div className="bg-neutral-50 p-2.5 border border-zinc-200 space-y-1.5 rounded-xs">
                                  <div className="flex items-center gap-2 border-b border-zinc-150 pb-1 mb-1">
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                                    <span className="font-mono text-[14px] font-black text-zinc-500 uppercase tracking-wide">
                                      {isAr ? 'ملخص الذكاء الاصطناعي' : 'AI DIGITAL SYNOPSIS'}
                                    </span>
                                  </div>
                                  <p className="text-[15px] text-zinc-700 leading-relaxed font-medium select-text">
                                    {isAr ? post.summaryAr : post.summaryEn}
                                  </p>
                                </div>

                                {/* Topics generated tags */}
                                {post.topics && post.topics.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5">
                                    {post.topics.map((t, tIdx) => (
                                      <span key={tIdx} className="font-mono text-[14.5px] bg-zinc-100 hover:bg-neutral-200 text-zinc-650 px-1.5 py-0.5 border border-zinc-250 uppercase font-black">
                                        #{t}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                {/* Bottom score row and outbound link click */}
                                <div className="pt-2.5 border-t border-dashed border-zinc-200 flex justify-between items-center">
                                  <div className="flex items-center gap-1.5">
                                    {isPositive ? (
                                      <span className="font-mono text-[14px] font-extrabold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-250 uppercase">
                                        🟢 POS ({post.score})
                                      </span>
                                    ) : isNegative ? (
                                      <span className="font-mono text-[14px] font-extrabold px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-250 uppercase">
                                        🔴 NEG ({post.score})
                                      </span>
                                    ) : (
                                      <span className="font-mono text-[14px] font-extrabold px-2 py-0.5 bg-zinc-100 text-zinc-700 border border-zinc-200 uppercase">
                                        ⚪ NEU ({post.score})
                                      </span>
                                    )}
                                  </div>

                                  <a
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[14px] text-zinc-400 hover:text-red-650 flex items-center gap-0.5 uppercase tracking-wider font-extrabold transition-colors cursor-pointer group-hover:translate-x-0.5"
                                  >
                                    <ExternalLink size={12} />
                                    <span>{isAr ? 'الأصل' : 'ORIG'}</span>
                                  </a>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
