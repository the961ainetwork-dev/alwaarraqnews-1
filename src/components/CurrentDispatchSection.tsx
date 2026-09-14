import React, { useState, useMemo } from 'react';
import { 
  Radio, 
  Share2, 
  Copy, 
  Check, 
  BookOpen, 
  Calendar, 
  Flame, 
  ArrowRight, 
  ArrowLeft,
  ShieldAlert, 
  Sliders, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Mail, 
  Archive,
  ExternalLink
} from 'lucide-react';
import { Article, IntelligenceDispatch } from '../types';
import { getStoredDispatches } from '../data/intelligenceDispatches';

interface CurrentDispatchSectionProps {
  language: 'ar' | 'en';
  layoutMode?: 'classic-print' | 'modern-white';
  articles: Article[];
  onNavigateToDispatch: (issueId?: string) => void;
  onSelectArticle?: (article: Article) => void;
  subscribers?: string[];
  setSubscribers?: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CurrentDispatchSection({
  language,
  layoutMode = 'classic-print',
  articles,
  onNavigateToDispatch,
  onSelectArticle,
  subscribers = [],
  setSubscribers
}: CurrentDispatchSectionProps) {
  const isAr = language === 'ar';
  
  // Get latest published dispatch
  const dispatches = useMemo(() => getStoredDispatches(), []);
  const latestDispatch: IntelligenceDispatch = dispatches[0] || {
    id: 'dispatch-2026-09-14-144',
    issueNumber: 144,
    dateStr: 'Monday, September 14, 2026',
    dateStrAr: 'الاثنين، ١٤ أيلول / سبتمبر ٢٠٢٦',
    timestamp: 1789455600000,
    titleAr: 'برقية الورّاق الاستخباراتية: هندسة مسارات الترانزيت الطاقي وارتدادات يوروبوندز لبنان وتوازنات الهدنة الإقليمية',
    titleEn: 'Al-Warraq Intelligence Dispatch: Energy Transit Geopolitics, Lebanon Eurobond Recoil & Regional Truce Balances',
    classificationAr: 'وثيقة تداول سيادي واقتصادي - نشرة ديوان التحرير اليومية',
    classificationEn: 'SOVEREIGN INTELLIGENCE WIRE - DAILY DESK CIRCULATION',
    executiveBriefingAr: 'تفتح غرفة الرصد الاستخباراتي في "الورّاق" نافذة التحليل اليومي على جملة من التحولات الجيواقتصادية المتسارعة؛ يتقدمها تسارع القوى الإقليمية نحو إنشاء ممرات لوجستية وبدائل خطوط أنابيب النفط والغاز لتجاوز مخاطر الاختناق الملاحي، بالتوازي مع التطورات المصرفية والنقدية الحساسة في بيروت، حيث تعيد الصناديق السيادية والدولية تسعير ديون لبنان واليوروبوندز.',
    executiveBriefingEn: 'The Intelligence Desk at Al-Warraq opens today\'s daily briefing on rapid geo-economic realignments: foremost regional infrastructure pivots establishing alternative crude and gas bypass pipelines to hedge chokepoint vulnerabilities, coupled with crucial sovereign debt repricing on Lebanese Eurobonds.',
    leadArticleId: 'us-iran-mou-regional-recoil-bypass-2026',
    keyTakeaways: [
      'تسارع استثمارات الممرات اللوجستية البديلة في الخليج ومصر لتفادي توترات الممرات البحرية الحساسة.',
      'تذبذب أسعار سندات يوروبوندز لبنان حول مستوى ٢٢-٢٤ سنتاً مع استمرار الترقب لبرنامج صندوق النقد الدولي.',
      'تدفق رؤوس الأموال السيادية نحو قطاعات الذكاء الاصطناعي والحوسبة الفائقة في الرياض وأبوظبي.'
    ],
    readTimeMinutes: 7,
    authorAr: 'ديوان الرصد والتحليل الاستخباراتي - الورّاق',
    authorEn: 'Al-Warraq Intelligence Monitoring Bureau',
    status: 'published',
    views: 1842,
    broadcastSentAt: '2026-09-14 06:30 UTC',
    subscriberCountAtBroadcast: 4180,
    sections: []
  };

  // Find lead article object if available
  const leadArticle = useMemo(() => {
    if (!latestDispatch.leadArticleId) return null;
    return articles.find(a => a.id === latestDispatch.leadArticleId) || null;
  }, [latestDispatch, articles]);

  // Copy state
  const [copied, setCopied] = useState(false);
  
  // Quick subscribe state
  const [emailInput, setEmailInput] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  // Audio briefing preview simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopyRawDispatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    let text = `⚡ ${isAr ? latestDispatch.titleAr : latestDispatch.titleEn}\n`;
    text += `📅 ${isAr ? latestDispatch.dateStrAr : latestDispatch.dateStr} | ${isAr ? `العدد #${latestDispatch.issueNumber}` : `Issue #${latestDispatch.issueNumber}`}\n`;
    text += `🔒 ${isAr ? latestDispatch.classificationAr : latestDispatch.classificationEn}\n\n`;
    text += `📌 ${isAr ? 'الإيجاز التنفيذي:' : 'Executive Briefing:'}\n${isAr ? latestDispatch.executiveBriefingAr : latestDispatch.executiveBriefingEn}\n\n`;
    text += `⚡ ${isAr ? 'النقاط الحاكمة:' : 'Key Takeaways:'}\n`;
    latestDispatch.keyTakeaways.forEach((t, i) => {
      text += `${i + 1}. ${t}\n`;
    });
    text += `\n🌐 ${isAr ? 'طالع البرقية والأرشيف كاملاً عبر ديوان الورّاق:' : 'Read full dispatch & archive on Al-Warraq:'} ${window.location.origin}/?category=intelligence-dispatch\n`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = emailInput.trim();
    if (!clean) return;
    if (setSubscribers && !subscribers.includes(clean)) {
      setSubscribers(prev => [...prev, clean]);
    }
    setSubscribedSuccess(true);
    setEmailInput('');
  };

  return (
    <section 
      id="current-daily-dispatch-section"
      className="my-8 border-4 border-black bg-zinc-950 text-white relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]"
    >
      {/* Background Watermark Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Dispatch Masthead Banner */}
      <div className="relative z-10 bg-[#120505] border-b-2 border-red-800/80 p-4 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-red-950/90 text-red-300 border border-red-700/80 px-2.5 py-1 font-mono text-[10px] uppercase font-black tracking-wider">
            <Radio size={13} className="text-red-400 animate-pulse" />
            <span>{isAr ? 'البرقية الاستخباراتية اليومية الحية' : 'LIVE INTELLIGENCE DISPATCH'}</span>
          </div>

          <span className="bg-amber-400 text-black font-mono font-black text-[10px] px-2 py-0.5 uppercase tracking-widest border border-black">
            {isAr ? `العدد: #${latestDispatch.issueNumber}` : `ISSUE #${latestDispatch.issueNumber}`}
          </span>

          <span className="font-mono text-zinc-400 text-xxs font-bold">
            {isAr ? latestDispatch.dateStrAr : latestDispatch.dateStr}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 uppercase tracking-wider hidden sm:inline-block">
            {isAr ? latestDispatch.classificationAr : latestDispatch.classificationEn}
          </span>
          <span className="bg-red-700 text-white font-mono text-[9px] font-black uppercase px-2 py-1 tracking-widest animate-pulse">
            {isAr ? 'بث مباشر' : 'DISPATCHED'}
          </span>
        </div>
      </div>

      {/* Main Dispatch Content Grid */}
      <div className="relative z-10 p-5 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left/Main Column (8/12): Title, Lead Story & Executive Synthesis */}
        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xxs font-mono text-amber-400 uppercase tracking-widest font-extrabold">
              <ShieldAlert size={12} className="text-red-500 animate-pulse" />
              <span>{isAr ? 'المطالعة الحاكمة لديوان التحرير لليوم' : 'EDITORIAL INTELLIGENCE SYNOPSIS'}</span>
            </div>

            <h3 
              onClick={() => onNavigateToDispatch(latestDispatch.id)}
              className="font-serif font-black text-xl md:text-2xl lg:text-3xl text-white hover:text-amber-300 transition-colors leading-tight tracking-tight cursor-pointer"
            >
              {isAr ? latestDispatch.titleAr : latestDispatch.titleEn}
            </h3>
          </div>

          {/* Executive Briefing Text Box */}
          <div className="p-4 bg-zinc-900/80 border-r-4 rtl:border-r-4 rtl:border-l-0 ltr:border-l-4 ltr:border-r-0 border-red-600 space-y-2 font-serif text-zinc-200 text-xs md:text-sm leading-relaxed">
            <span className="font-mono text-[10px] font-black text-red-400 uppercase tracking-wider block">
              {isAr ? 'الإيجاز التنفيذي الميداني:' : 'EXECUTIVE STRATEGIC BRIEFING:'}
            </span>
            <p className="line-clamp-4">
              {isAr ? latestDispatch.executiveBriefingAr : latestDispatch.executiveBriefingEn}
            </p>
          </div>

          {/* Key Strategic Takeaways Ticker */}
          {latestDispatch.keyTakeaways && latestDispatch.keyTakeaways.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="font-mono text-xxs text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                <Flame size={12} className="text-amber-500" />
                <span>{isAr ? 'النقاط السيادية الحاكمة في إصدار اليوم:' : 'CORE GOVERNING SIGNALS IN TODAY\'S ISSUE:'}</span>
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {latestDispatch.keyTakeaways.map((takeaway, tIdx) => (
                  <div 
                    key={tIdx} 
                    className="p-3 bg-zinc-900/60 border border-zinc-850 flex items-start gap-2 text-xxs text-zinc-300 font-sans leading-normal hover:border-zinc-700 transition-colors"
                  >
                    <span className="font-mono font-black text-amber-400 shrink-0">0{tIdx + 1}.</span>
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onNavigateToDispatch(latestDispatch.id)}
                className="bg-red-700 hover:bg-red-600 text-white font-mono font-black text-xs px-5 py-3 border border-red-500 uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-y-0.5"
              >
                <span>{isAr ? 'طالعة وقراءة البرقية الكاملة والأرشيف' : 'READ FULL DISPATCH & ARCHIVE'}</span>
                {isAr ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
              </button>

              <button
                onClick={handleCopyRawDispatch}
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs px-3.5 py-3 border border-zinc-700 uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                title={isAr ? 'نسخ نص البرقية بالكامل إلى الحافظة' : 'Copy telex wire to clipboard'}
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? (isAr ? 'تم النسخ بنجاح' : 'COPIED') : (isAr ? 'نسخ التيلكس' : 'COPY TELEX')}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-xxs font-mono text-zinc-400">
              <span className="flex items-center gap-1">
                <BookOpen size={12} className="text-amber-400" />
                <span>{isAr ? `زمن القراءة: ٧ دقائق` : `Read time: 7 min`}</span>
              </span>
              <span>•</span>
              <span className="text-zinc-500">
                {isAr ? `${latestDispatch.views} قارئ نشط` : `${latestDispatch.views} active readers`}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (4/12): Sections Breakdown & Quick Telex Circular Subscription */}
        <div className="lg:col-span-4 space-y-4 bg-zinc-900/50 p-4 md:p-5 border border-zinc-800">
          
          <div className="border-b border-zinc-800 pb-3">
            <span className="font-mono text-xxs font-black text-amber-400 uppercase tracking-widest block">
              {isAr ? 'أبواب التغطية في هذا الإصدار' : 'COVERAGE DESKS IN THIS ISSUE'}
            </span>
            <span className="text-[11px] text-zinc-400 mt-0.5 block">
              {isAr ? 'تحقيقات ميدانية مصنفة حسب مكاتب الرصد' : 'Filed investigative dossiers by monitoring desk'}
            </span>
          </div>

          {/* Desks Highlights List */}
          <div className="space-y-2">
            {[
              { id: 'war-room', titleAr: 'غرفة الحرب والجيوبوليتيك الإقليمي', titleEn: 'War Room & Regional Geopolitics', count: 3, badge: 'CRITICAL' },
              { id: 'lebanon', titleAr: 'أخبار وقضايا لبنان والشرق الأدنى', titleEn: 'Lebanon & Near East News', count: 3, badge: 'SOVEREIGN' },
              { id: 'markets', titleAr: 'أسواق المال والطاقة واليوروبوندز', titleEn: 'Markets, Energy & Eurobonds', count: 2, badge: 'FINANCE' },
              { id: 'ports-trade', titleAr: 'الموانئ وسلاسل التوريد والترانزيت', titleEn: 'Ports & Transit Corridors', count: 2, badge: 'TRADE' }
            ].map(desk => (
              <div 
                key={desk.id}
                onClick={() => onNavigateToDispatch(latestDispatch.id)}
                className="p-2.5 bg-zinc-950/80 border border-zinc-850 hover:border-amber-500/50 transition-colors cursor-pointer flex justify-between items-center group"
              >
                <div className="min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                  <span className="text-xs font-sans font-bold text-zinc-200 group-hover:text-amber-300 block truncate">
                    {isAr ? desk.titleAr : desk.titleEn}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500">
                    {desk.count} {isAr ? 'تقارير موثقة' : 'filed items'}
                  </span>
                </div>
                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 bg-zinc-900 border border-zinc-700 text-amber-400 shrink-0">
                  {desk.badge}
                </span>
              </div>
            ))}
          </div>

          {/* Inline Telex Newsletter Signup */}
          <div className="pt-3 border-t border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xxs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Mail size={12} className="text-red-400" />
                <span>{isAr ? 'استقبال البرقية اليومية عبر البريد' : 'DAILY TELEX DISPATCH INBOX'}</span>
              </span>
            </div>

            {subscribedSuccess ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-600/80 text-emerald-300 font-mono text-xs flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>{isAr ? '✓ تم إدراج عنوانكم في ديوان المشتركين للبث القادم.' : '✓ Email enrolled for tomorrow\'s 06:00 UTC wire.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={isAr ? 'أدخل عنوان بريدك لتلقي البرقية' : 'Enter email for morning briefing wire'}
                  className="w-full text-xs p-2 bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-600 font-mono outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-mono text-[10px] font-black uppercase py-2 border border-zinc-600 transition-colors cursor-pointer"
                >
                  {isAr ? 'تسجيل الاشتراك في البث اليومي ✉' : 'ENROLL FOR MORNING WIRE ✉'}
                </button>
              </form>
            )}
          </div>

          {/* Quick Audio Telegraph Simulation */}
          <div className="pt-2 border-t border-zinc-850 flex items-center justify-between text-xxs font-mono text-zinc-400">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-amber-300 cursor-pointer"
            >
              {isPlayingAudio ? <Volume2 size={12} className="text-red-400 animate-pulse" /> : <VolumeX size={12} />}
              <span>{isPlayingAudio ? (isAr ? 'إيقاف البث الصوتي' : 'Stop Audio Wire') : (isAr ? 'تشغيل البث الصوتي الموجز' : 'Audio Brief Preview')}</span>
            </button>
            <span className="text-zinc-600">
              {isAr ? 'إشارة ديجيتال مشفرة' : 'Encrypted Stream'}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
