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

  const isSaved = savedArticleIds.includes(mainArticle.id);

  // Social share triggers
  const handleWhatsAppShare = () => {
    const title = isAr ? mainArticle.titleAr : mainArticle.titleEn;
    const shareUrl = window.location.href;
    const text = `🚨 *${isAr ? 'عاجل: ' : 'URGENT: '}* ${title}\n\n${shareUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGenericShare = () => {
    const title = isAr ? mainArticle.titleAr : mainArticle.titleEn;
    const text = isAr ? mainArticle.summaryAr : mainArticle.summaryEn;
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
    
    const statusesAr = [
      'جاري استخراج مستندات التحليل المالي...',
      'رسم الخرائط والبيانات التكتيكية لوادي السيليكون...',
      'تضمين تحليلات جني الأرباح ونضج الأسواق العالمية...',
      'تأمين خطوط الاتصال وتصدير ملف الاستخبارات السيادية (PDF)...'
    ];
    const statusesEn = [
      'Extracting financial intelligence dockets...',
      'Mapping technical semiconductor telemetry...',
      'Compiling profit-taking and global market indicators...',
      'Securing transmission and exporting final intelligence brief (PDF)...'
    ];

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
                <span>DOCKET #URGENT-CHIPS-2026</span>
                <span className="font-bold">{pdfProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editorial Header */}
      <div className="border-b-4 border-double border-red-600 pb-6 mb-8 text-center md:text-right rtl:text-right ltr:text-left">
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

          {/* Flash Info Box */}
          <div className="bg-red-50/50 border border-red-200/60 rounded p-5 space-y-4">
            <div className="flex items-center gap-2 text-red-700">
              <Activity size={16} className="animate-pulse" />
              <h4 className="text-xs font-sans font-black uppercase tracking-wider">
                {isAr ? 'لوحة رصد الانهيار التكنولوجي' : 'TECH COLLAPSE TELEMETRY'}
              </h4>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-serif">
              {isAr 
                ? 'مؤشرات قطاع أشباه الموصلات العالمي تسجل هبوطاً تراكمياً يتجاوز ٢٠٪ من القمة الأخيرة، لتدخل رسمياً منطقة "السوق الهابطة" وسط شكوك حول عائد استثمارات الذكاء الاصطناعي التوليدي.' 
                : 'Global semiconductor indices record a cumulative plunge of 20%+ from peak, entering a technical "Bear Market" as CapEx returns on generative AI face severe skepticism.'}
            </p>

            <div className="border-t border-red-200/50 pt-4 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-sans font-bold text-zinc-500">
                <span>{isAr ? 'الشركة / المؤشر' : 'EQUITY / INDEX'}</span>
                <span>{isAr ? 'التغير الفوري' : 'FLASH INTRA-DAY'}</span>
              </div>
              
              <div className="divide-y divide-red-200/30">
                {chipStocksData.map((item, index) => (
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
              {isAr 
                ? 'تراجع أسهم الرقائق لا يعبر عن فشل الذكاء الاصطناعي بل عن انتقال حاد للسيولة لمستويات نضج مالي أعلى، بالتوازي مع تفوق الصين المتسارع وارتفاع مخاطر الحرب النفطية الإقليمية.' 
                : 'The chip stocks slide marks a structural sector rotation rather than an absolute failure of AI, compounding with rapid Chinese local designs and regional petro-geopolitical risk.'}
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
              onClick={(e) => onToggleSaveArticle(mainArticle, e)}
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
                {isAr 
                  ? 'سجّل رقمك أو بريدك للحصول على تنبيهات عاجلة مخصصة لمدراء الصناديق والمستثمرين فور صدور تحركات عسكرية أو تدهور أسهم الرقائق.' 
                  : 'Receive high-frequency flash warnings sent directly to your screen regarding trade lockups, Middle East escalation, and chip supply chains.'}
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
                    {isAr ? 'تحليل عاجل' : 'BREAKING RELEASES'}
                  </span>
                  <span className="text-zinc-400 font-sans text-xs font-bold">
                    {isAr ? 'وول ستريت / وادي السيليكون' : 'WALL STREET / SILICON VALLEY'} | {isAr ? '١٨ يوليو ٢٠٢٦' : 'July 18, 2026'}
                  </span>
                </div>
                <div className="text-[10px] font-mono bg-red-50 text-red-700 px-2.5 py-0.5 rounded border border-red-200/50">
                  {isAr ? 'رقم الوثيقة: #95400-A' : 'DOC ID: #95400-A'}
                </div>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-sans font-black text-zinc-950 leading-tight">
                {isAr ? mainArticle.titleAr : mainArticle.titleEn}
              </h2>

              {/* Author / Desk Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 pb-1 border-t border-zinc-100 mt-2 select-none">
                <div className="flex items-center gap-3">
                  <img 
                    src={mainArticle.author.avatar} 
                    alt={isAr ? mainArticle.author.nameAr : mainArticle.author.nameEn} 
                    className="w-10 h-10 rounded-full border border-zinc-200 object-cover"
                  />
                  <div>
                    <span className="text-xs font-sans font-black text-zinc-900 block leading-tight">
                      {isAr ? mainArticle.author.nameAr : mainArticle.author.nameEn}
                    </span>
                    <span className="text-[10px] font-sans text-zinc-500 block">
                      {isAr ? mainArticle.author.titleAr : mainArticle.author.titleEn}
                    </span>
                  </div>
                </div>

                {/* Inline Share & Download Actions for the Story ("each story in it") */}
                <div className="flex flex-wrap gap-1.5 items-center">
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
                    onClick={(e) => onToggleSaveArticle(mainArticle, e)}
                    title={isAr ? 'حفظ في المفضلة' : 'Bookmark docket'}
                    className="p-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 rounded transition-colors flex items-center cursor-pointer border border-zinc-200/50"
                  >
                    <Bookmark size={13} className={isSaved ? 'fill-amber-500 text-amber-500' : ''} />
                  </button>
                </div>
              </div>
            </div>

            {/* Banner Image */}
            <div className="relative h-64 md:h-96 rounded overflow-hidden border border-zinc-200">
              <img 
                src={mainArticle.imageUrl} 
                alt="Silicon Valley Chip Earthquake" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xxs font-sans font-semibold bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm inline-block">
                {isAr ? 'رسم تخطيطي لصناعة الموصلات الفائقة وخطوط الإنتاج العالمية' : 'Conceptual representation of global semiconductor foundries and supply chains'}
              </div>
            </div>

            {/* Read Time Synopsis Banner */}
            <div className="p-4 bg-red-50 border-r-4 border-red-500 rounded flex flex-col md:flex-row md:items-center justify-between gap-3 text-zinc-700">
              <div className="space-y-0.5">
                <span className="text-[10px] font-sans font-black text-red-600 block uppercase tracking-wide animate-pulse">
                  {isAr ? '● خلاصة التحليل' : '● EXECUTIVE BRIEF'}
                </span>
                <p className="text-xs font-sans font-semibold text-zinc-800 italic leading-relaxed">
                  {isAr ? mainArticle.summaryAr : mainArticle.summaryEn}
                </p>
              </div>
              <div className="shrink-0 text-right md:text-left font-sans text-[10px] bg-red-100 px-3 py-1.5 rounded">
                <span className="font-bold block text-red-800">{isAr ? '٨ دقائق قراءة' : '8 min read'}</span>
                <span className="text-[8px] text-red-600 font-bold block uppercase">{isAr ? 'مستند سري' : 'CONFIDENTIAL'}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="text-zinc-800 space-y-6 leading-relaxed border-b border-zinc-200 pb-8 select-text">
              {renderContent(isAr ? mainArticle.contentAr : mainArticle.contentEn)}
            </div>

            {/* 2. Primary Call To Action (CTA) Box at the end of the article story */}
            <div className="bg-red-50/40 border-2 border-red-600/50 rounded-lg p-5 md:p-6 space-y-4 my-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-red-600 to-amber-500" />
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-red-700">
                    <ShieldAlert size={16} className="animate-pulse" />
                    <span className="text-[10px] font-sans font-black uppercase tracking-wider">
                      {isAr ? 'مكتب الأبحاث والتحوط الجيوسياسي' : 'HEDGE & MACRO DESK ADVISORY'}
                    </span>
                  </div>
                  <h4 className="text-base md:text-lg font-sans font-black text-zinc-900">
                    {isAr ? 'كيف تحمي محفظتك المالية وتتحوط ضد "فقاعة الذكاء الاصطناعي"؟' : 'How to insulate your tech assets against the Bear Market correction?'}
                  </h4>
                  <p className="text-xs text-zinc-600 font-serif leading-relaxed max-w-2xl">
                    {isAr 
                      ? 'يقوم خبراء مكتب الأبحاث بالورّاق بإصدار دليلاً استقصائياً دورياً يتضمن بدائل استثمارية آمنة، وخرائط توزيع السيولة للشركات الصينية الناشئة مثل Moonshot AI، بالإضافة لخطط التحوط لأسهم TSMC وإنفيديا.' 
                      : 'Our strategic analysts provide monthly high-grade briefs detailing safe havens, Chinese capital shifts, and custom portfolio hedging guides to bypass global semiconductor turbulence.'}
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
                  <p className="font-extrabold">{isAr ? 'تم تفعيل حسابك الاستشاري وتأكيد بريدك الإلكتروني' : 'Strategic Advisory Registered Successfully!'}</p>
                  <p className="text-zinc-600 text-xxs">{isAr ? 'سيرسل إليك المحللون ملف التحوط المالي بصيغة PDF خلال الدقائق القادمة.' : 'Our analysts will dispatch the PDF hedging brief to your provided contact methods.'}</p>
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
                        <span>{isAr ? 'طلب خطة التحوط الفورية' : 'Request Hedge Report'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Tags & Hashtags */}
            <div className="pt-2 space-y-3 select-none">
              <div className="flex flex-wrap gap-1.5">
                {mainArticle.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-sans text-xxs font-bold px-2.5 py-1 rounded transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 text-red-600 font-sans text-xxs font-extrabold italic">
                {mainArticle.hashtags.map((ht, hIdx) => (
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
                <span className="block">DOCKET ID: #URGENT-CHIPS-2026</span>
                <span className="block">CLASSIFICATION: COGNITIVE OVERLAY SECURED</span>
              </div>
            </div>

          </article>
        </div>

      </div>

    </div>
  );
}
