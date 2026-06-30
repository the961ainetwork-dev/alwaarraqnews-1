import React, { useState } from 'react';
import { 
  FileText, 
  TrendingDown, 
  ShieldAlert, 
  BookOpen, 
  Scale, 
  ChevronRight, 
  Sparkles,
  DollarSign
} from 'lucide-react';
import { Article } from '../types';
import { FrameworkAgreementInfographic } from './FrameworkAgreementInfographic';
import { CeasefireInternalConflictInfographic } from './CeasefireInternalConflictInfographic';
import { EconomicAbyssCrisisInfographic } from './EconomicAbyssCrisisInfographic';

interface NarrativeLebanonCrisisInfographicsProps {
  language: 'ar' | 'en';
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

type DossierKey = 'annex' | 'ceasefire' | 'economy';

export function NarrativeLebanonCrisisInfographics({
  language,
  articles,
  onSelectArticle
}: NarrativeLebanonCrisisInfographicsProps) {
  const isAr = language === 'ar';
  const [activeDossier, setActiveDossier] = useState<DossierKey>('annex');

  // Match the stories
  const annexArticle = articles.find(a => a.id === 'excl-leb-isr-secret-annex');
  const ceasefireArticle = articles.find(a => a.id === 'lebanon-ceasefire-mirage-2026');
  const economyArticle = articles.find(a => a.id === 'lebanon-economic-abyss-2026');

  const dossierConfig = {
    annex: {
      id: 'excl-leb-isr-secret-annex',
      titleAr: 'الملاحق السرية وسؤال الاستسلام القانوني',
      titleEn: 'Secret Annexes & The Legal Surrender Question',
      subtitleAr: 'بوابة المخطط الأمني: ترسيم الحدود وتحليل المادة 13 المثيرة للجدل في اتفاق الإطار',
      subtitleEn: 'Sovereign Demarcation: Analysis of Article 13 and the secret security annexes',
      article: annexArticle,
      badgeAr: 'ملحق سري',
      badgeEn: 'SECRET ANNEX',
      color: 'border-red-600 text-red-600 bg-red-50/50',
      activeColor: 'bg-red-800 text-white border-red-850',
      icon: Scale,
      component: <FrameworkAgreementInfographic language={language} />
    },
    ceasefire: {
      id: 'lebanon-ceasefire-mirage-2026',
      titleAr: 'سراب وقف إطلاق النار والصراع الداخلي',
      titleEn: 'Ceasefire Mirage & Domestic Conflict',
      subtitleAr: 'مؤشرات التوتر ومحاكاة مخاطر السلم الأهلي وتحديات القرار 1701 جنوب الليطاني',
      subtitleEn: 'Tension indicators, civil war threat simulations, and Resolution 1701 hurdles',
      article: ceasefireArticle,
      badgeAr: 'سيناريو توتر',
      badgeEn: 'STRIFE HAZARDS',
      color: 'border-amber-600 text-amber-600 bg-amber-50/50',
      activeColor: 'bg-amber-800 text-white border-amber-850',
      icon: ShieldAlert,
      component: <CeasefireInternalConflictInfographic language={language} />
    },
    economy: {
      id: 'lebanon-economic-abyss-2026',
      titleAr: 'الهاوية الاقتصادية وحساب فجوة الإعمار',
      titleEn: 'The Economic Abyss & Reconstruction Gap',
      subtitleAr: 'حاسبة العجز المالي التفاعلية، وتقدير المليارات المطلوبة لإعادة بناء الجنوب المشلول',
      subtitleEn: 'Interactive funding gap ledger and sovereign bankruptcy risk models',
      article: economyArticle,
      badgeAr: 'تقرير مالي',
      badgeEn: 'FINANCIAL LEDGER',
      color: 'border-emerald-600 text-emerald-600 bg-emerald-50/50',
      activeColor: 'bg-emerald-800 text-white border-emerald-850',
      icon: TrendingDown,
      component: <EconomicAbyssCrisisInfographic language={language} />
    }
  };

  const current = dossierConfig[activeDossier];

  const handleReadFull = () => {
    if (current.article) {
      onSelectArticle(current.article);
    }
  };

  return (
    <div 
      id="narrative-crisis-hub" 
      className="border-4 border-black p-5 md:p-6 bg-[#fcfbfa] text-black my-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
    >
      {/* Decorative Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-800 via-amber-600 to-emerald-700"></div>

      {/* Header section with branding */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-black pb-4 mb-6 mt-1 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-[#b91c1c] rounded-none animate-pulse"></span>
            <span className="font-mono text-xxs font-black tracking-widest text-[#b91c1c] uppercase">
              {isAr ? 'قسم التقارير البيانية التفاعلية للورّاق' : 'AL-WARRAQ VISUAL JOURNALISM UNIT'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-sans tracking-tight leading-tight">
            {isAr ? 'ثلاثية الأزمة السيادية اللبنانية' : 'The Triad of Lebanon\'s Sovereign Crisis'}
          </h2>
          <p className="text-xs md:text-sm text-zinc-600 font-serif mt-1 max-w-2xl leading-relaxed">
            {isAr 
              ? 'دراسات استقصائية عميقة معززة بنماذج بيانات حية ورسوم بيانية تفاعلية لحساب التكلفة الاقتصادية، والمساءلة القانونية، ومخاطر الصراع الداخلي.'
              : 'Interactive deep-dives powered by simulation calculators, bilingual frameworks, and geostrategic models of Lebanon’s survival factors.'}
          </p>
        </div>
        
        {/* Dynamic badge */}
        <div className="bg-black text-white font-mono text-[9px] font-black px-3 py-1.5 uppercase tracking-widest rounded-none self-start md:self-auto">
          {isAr ? 'تحديث حي مدمج' : 'INTEGRATED STACKS LIVE'}
        </div>
      </div>

      {/* STORY SELECTOR TABS (Swiss/Modern bento layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {(Object.keys(dossierConfig) as DossierKey[]).map((key) => {
          const cfg = dossierConfig[key];
          const isSelected = activeDossier === key;
          const IconComponent = cfg.icon;
          
          return (
            <button
              key={key}
              onClick={() => setActiveDossier(key)}
              className={`p-3 md:p-4 border-2 flex flex-col justify-between transition-all text-left rtl:text-right cursor-pointer relative ${
                isSelected 
                  ? `${cfg.activeColor} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-[1.01] z-10` 
                  : 'bg-white border-zinc-200 hover:border-black hover:bg-zinc-50'
              }`}
            >
              <div className="flex justify-between items-start w-full gap-2 mb-2">
                <span className={`font-mono text-[9px] font-black px-2 py-0.5 border ${
                  isSelected ? 'border-white text-white' : 'border-zinc-300 text-zinc-500'
                }`}>
                  {isAr ? cfg.badgeAr : cfg.badgeEn}
                </span>
                <IconComponent size={16} className={isSelected ? 'text-white' : 'text-zinc-400'} />
              </div>
              
              <div className="space-y-1">
                <h3 className="font-sans font-black text-xs md:text-sm leading-tight line-clamp-1">
                  {isAr ? cfg.titleAr : cfg.titleEn}
                </h3>
                <p className={`text-[10px] md:text-xs font-serif line-clamp-2 leading-relaxed ${
                  isSelected ? 'text-zinc-200' : 'text-zinc-500'
                }`}>
                  {isAr ? cfg.subtitleAr : cfg.subtitleEn}
                </p>
              </div>

              {isSelected && (
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-black rotate-45 transform border-t border-l border-white/20 hidden md:block" />
              )}
            </button>
          );
        })}
      </div>

      {/* REVOLUTIONARY HIGHLIGHT CARD OF THE SELECTED DOSSIER */}
      <div className="border-2 border-black bg-white p-4 md:p-6 mb-6 flex flex-col md:flex-row gap-6 items-start md:items-center relative">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#b91c1c]" />
            <span className="font-mono text-xxs font-black text-zinc-500 uppercase tracking-wider">
              {isAr ? 'التحليل الاستقصائي الأساسي والمستندات' : 'CRITICAL CORRELATION REPORT & DOSSIER'}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-sans font-black text-zinc-950 leading-tight">
            {isAr ? current.article?.titleAr : current.article?.titleEn}
          </h3>

          <p className="text-xs md:text-sm text-zinc-700 font-serif leading-relaxed line-clamp-3">
            {isAr ? current.article?.summaryAr : current.article?.summaryEn}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {current.article?.tags?.slice(0, 4).map((tag, idx) => (
              <span key={idx} className="bg-zinc-100 text-zinc-700 font-mono text-[9px] px-2 py-0.5 border border-zinc-200">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Read Full Article Call-To-Action Button */}
        {current.article && (
          <div className="w-full md:w-auto shrink-0 self-stretch md:self-center flex flex-col justify-center border-t md:border-t-0 md:border-l border-zinc-200 pt-4 md:pt-0 md:pl-6 rtl:md:border-l-0 rtl:md:border-r rtl:md:pr-6">
            <button
              onClick={handleReadFull}
              className="w-full px-5 py-3 bg-zinc-900 hover:bg-black text-white hover:text-amber-400 font-sans font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <BookOpen size={13} />
              <span>{isAr ? 'قرّاء التحقيق الكامل ←' : 'Read Full Exclusive →'}</span>
            </button>
          </div>
        )}
      </div>

      {/* EMBEDDED GRAPHICS STAGE */}
      <div className="border-4 border-double border-zinc-800 bg-zinc-950 text-white rounded-none p-2 relative overflow-hidden">
        {/* Stage watermark */}
        <div className="absolute top-2 left-2 pointer-events-none font-mono text-[8px] text-zinc-600 uppercase tracking-widest z-10">
          ALWARRAQ LABS // ENGINE v2.56
        </div>

        <div className="p-1 md:p-3">
          {current.component}
        </div>
      </div>

      {/* Bottom informational bar */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed border-zinc-200 text-xxs font-mono text-zinc-500">
        <span>{isAr ? '✦ وحدة الصحافة البيانية للورّاق - حقوق النشر محفوظة ٢٠٢٦' : '✦ Al-Warraq Visual Desk — Copyright 2026'}</span>
        <span>{isAr ? 'محاكاة حية مدعومة بنماذج استقصائية' : 'Live Geopolitical Projections'}</span>
      </div>
    </div>
  );
}
