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
  CheckCircle2, 
  Mail, 
  Clock,
  Send,
  Printer,
  ChevronRight
} from 'lucide-react';
import { Article, IntelligenceDispatch } from '../types';
import { getStoredDispatches } from '../data/intelligenceDispatches';
import AlWarraqLogo from './AlWarraqLogo';

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

  // Copy state
  const [copied, setCopied] = useState(false);
  
  // Quick subscribe state
  const [emailInput, setEmailInput] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

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
    text += `\n🌐 ${isAr ? 'طالع البرقية والأرشيف كاملاً عبر ديوان الورّاق:' : 'Read full dispatch & archive on Al-Warraq:'} https://alwarraqnews.com/?category=intelligence-dispatch\n`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = emailInput.trim();
    if (!clean || !clean.includes('@')) return;
    if (setSubscribers && !subscribers.includes(clean)) {
      setSubscribers(prev => [...prev, clean]);
    }
    setSubscribedSuccess(true);
    setEmailInput('');
  };

  return (
    <section 
      id="current-daily-dispatch-section"
      className="my-10 bg-[#faf8f5] border-2 border-zinc-900 shadow-[0_4px_20px_rgba(0,0,0,0.06)] relative overflow-hidden"
    >
      {/* 1. NEWSLETTER MASTHEAD STRIP */}
      <div className="bg-zinc-950 text-white p-4 sm:p-5 border-b-2 border-red-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3.5">
            <AlWarraqLogo size="md" variant="dark" showText={false} />
            
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-black bg-red-700 text-white px-2 py-0.5 uppercase tracking-widest flex items-center gap-1">
                  <Radio size={10} className="animate-pulse" />
                  {isAr ? 'نشرة التحرير اليومية' : 'DAILY NEWSLETTER'}
                </span>
                <span className="font-mono text-[11px] font-bold text-amber-300">
                  {isAr ? `العدد #${latestDispatch.issueNumber}` : `Issue #${latestDispatch.issueNumber}`}
                </span>
                <span className="text-zinc-600 hidden sm:inline">•</span>
                <span className="font-mono text-[10px] text-zinc-400 hidden sm:inline">
                  {isAr ? latestDispatch.dateStrAr : latestDispatch.dateStr}
                </span>
              </div>

              <h2 className="font-serif font-black text-lg sm:text-xl text-white tracking-tight leading-snug">
                {isAr ? 'نشرة الورّاق الاستخباراتية — الإصدار الصباحي' : 'Al-Warraq Intelligence Dispatch — Morning Edition'}
              </h2>
            </div>
          </div>

          {/* Action Callout */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <span className="font-mono text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-1 uppercase hidden lg:inline-block">
              {isAr ? latestDispatch.classificationAr : latestDispatch.classificationEn}
            </span>

            <button
              onClick={() => onNavigateToDispatch(latestDispatch.id)}
              className="bg-red-700 hover:bg-red-600 text-white font-mono font-black text-xs px-4 py-2 uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-red-500 shadow-xs"
            >
              <span>{isAr ? 'قراءة النشرة الكاملة' : 'READ FULL NEWSLETTER'}</span>
              {isAr ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
            </button>
          </div>

        </div>
      </div>

      {/* 2. NEWSLETTER BODY CONTENT */}
      <div className="p-5 sm:p-8 md:p-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Column (8/12): The Day's Lead Dispatch & Signals */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Headline */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-100 text-red-900 font-mono text-[10px] font-black uppercase">
              <ShieldAlert size={12} className="text-red-700" />
              <span>{isAr ? 'المطالعة الحاكمة لليوم' : 'TODAY\'S CORE BRIEFING'}</span>
            </div>

            <h3 
              onClick={() => onNavigateToDispatch(latestDispatch.id)}
              className="font-serif font-black text-xl sm:text-2xl md:text-3xl text-zinc-950 hover:text-red-800 transition-colors leading-tight tracking-tight cursor-pointer"
            >
              {isAr ? latestDispatch.titleAr : latestDispatch.titleEn}
            </h3>
          </div>

          {/* Executive Memorandum Excerpt */}
          <div className="p-5 sm:p-6 bg-white border-r-4 rtl:border-r-4 rtl:border-l-0 ltr:border-l-4 ltr:border-r-0 border-red-700 border-y border-l rtl:border-l rtl:border-r-0 ltr:border-r ltr:border-l-0 border-zinc-200 shadow-xs space-y-3 font-serif">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
              <span className="font-serif italic font-bold text-xs text-zinc-800">
                {isAr ? 'إيجاز ديوان التحرير للمتعاملين:' : 'Executive Desk Brief:'}
              </span>
              <span className="font-mono text-[10px] text-zinc-400">06:00 UTC</span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed line-clamp-3 md:line-clamp-4">
              {isAr ? latestDispatch.executiveBriefingAr : latestDispatch.executiveBriefingEn}
            </p>
          </div>

          {/* Governing Signals Box */}
          {latestDispatch.keyTakeaways && latestDispatch.keyTakeaways.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <span className="font-mono text-xs text-zinc-700 uppercase font-black flex items-center gap-1.5">
                <Flame size={14} className="text-red-700" />
                <span>{isAr ? 'النقاط الاستراتيجية الحاكمة في إصدار اليوم:' : 'Governing Signals (3 Core Takeaways):'}</span>
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {latestDispatch.keyTakeaways.map((takeaway, tIdx) => (
                  <div 
                    key={tIdx} 
                    className="p-3 bg-white border border-zinc-300 flex items-start gap-2 text-xs text-zinc-900 font-sans leading-snug hover:border-zinc-500 transition-colors shadow-2xs"
                  >
                    <span className="font-mono font-black text-red-700 shrink-0">0{tIdx + 1}</span>
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Reader Nav Links */}
          <div className="pt-4 border-t border-zinc-300 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateToDispatch(latestDispatch.id)}
                className="bg-black hover:bg-zinc-800 text-white font-black px-4 py-2 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BookOpen size={12} />
                <span>{isAr ? 'فتح النشرة كاملة مع الوثائق' : 'Open Complete Newsletter'}</span>
                {isAr ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
              </button>

              <button
                onClick={handleCopyRawDispatch}
                className="bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 font-bold px-3 py-2 flex items-center gap-1.5 transition-colors cursor-pointer"
                title={isAr ? 'نسخ نص التيلكس' : 'Copy telex'}
              >
                {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ التيلكس' : 'Copy Telex')}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
              <Clock size={12} className="text-zinc-400" />
              <span>{isAr ? '٧ دقائق قراءة مركزة' : '7 min read'}</span>
              <span>•</span>
              <span>{isAr ? `${latestDispatch.views} قارئ نشط` : `${latestDispatch.views} readers`}</span>
            </div>
          </div>

        </div>

        {/* Sidebar Column (4/12): Desks Breakdown & Newsletter Inbox Subscription */}
        <div className="lg:col-span-4 space-y-5 bg-white p-5 sm:p-6 border border-zinc-300 shadow-2xs">
          
          <div className="border-b border-zinc-200 pb-3">
            <span className="font-mono text-xs font-black text-red-800 uppercase tracking-wider block">
              {isAr ? 'أبواب التغطية في النشرة' : 'NEWSLETTER SECTIONS'}
            </span>
            <span className="text-[11px] text-zinc-500 mt-0.5 block">
              {isAr ? 'تقارير ميدانية مصنفة حسب مكاتب الرصد' : 'Filed investigative dossiers by monitoring desk'}
            </span>
          </div>

          {/* Desks List */}
          <div className="space-y-2">
            {[
              { id: 'war-room', titleAr: 'غرفة الحرب والجيوبوليتيك الإقليمي', titleEn: 'War Room & Regional Geopolitics', count: 3 },
              { id: 'lebanon', titleAr: 'قضايا لبنان والشرق الأدنى السيادية', titleEn: 'Lebanon & Near East Dossiers', count: 3 },
              { id: 'markets', titleAr: 'أسواق المال والطاقة واليوروبوندز', titleEn: 'Markets, Energy & Eurobonds', count: 2 },
              { id: 'ports-trade', titleAr: 'مرافئ الترانزيت وسلاسل الإمداد', titleEn: 'Transit Corridors & Supply Chains', count: 2 }
            ].map(desk => (
              <div 
                key={desk.id}
                onClick={() => onNavigateToDispatch(latestDispatch.id)}
                className="p-2.5 bg-[#faf9f6] hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-400 transition-colors cursor-pointer flex justify-between items-center group"
              >
                <span className="text-xs font-serif font-bold text-zinc-800 group-hover:text-red-700 truncate">
                  {isAr ? desk.titleAr : desk.titleEn}
                </span>
                <span className="font-mono text-[9px] font-bold text-zinc-500 shrink-0">
                  {desk.count} {isAr ? 'تقارير' : 'files'}
                </span>
              </div>
            ))}
          </div>

          {/* Newsletter Email Subscription Box */}
          <div className="pt-4 border-t border-zinc-200 space-y-2.5">
            <div className="flex items-center gap-1.5">
              <Mail size={13} className="text-red-700" />
              <span className="font-mono text-[10px] font-black text-zinc-800 uppercase tracking-wider">
                {isAr ? 'اشتراك في النشرة الصباحية' : 'MORNING NEWSLETTER SUBSCRIPTION'}
              </span>
            </div>

            <p className="text-[11px] text-zinc-600 font-sans leading-relaxed">
              {isAr 
                ? 'استلم البرقية الاستخباراتية فجر كل يوم مباشرة في بريدك الإلكتروني.' 
                : 'Get the confidential morning briefing delivered directly to your inbox.'}
            </p>

            {subscribedSuccess ? (
              <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 font-mono text-[11px] flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span>{isAr ? '✓ تم تسجيل اشتراككم بنجاح.' : '✓ Successfully enrolled!'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={isAr ? 'أدخل عنوان بريدك الإلكتروني...' : 'Enter your corporate email...'}
                  className="w-full text-xs p-2 bg-[#fbfbfa] border border-zinc-300 font-mono placeholder:text-zinc-400 outline-none focus:border-red-600"
                />
                <button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-mono text-[10px] font-black uppercase py-2 tracking-wider transition-colors cursor-pointer border border-red-800"
                >
                  {isAr ? 'تسجيل الاشتراك مجاناً ✉' : 'SUBSCRIBE FREE ✉'}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
