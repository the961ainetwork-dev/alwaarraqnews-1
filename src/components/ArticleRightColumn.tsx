import React, { useState } from 'react';
import { 
  Newspaper, 
  Clock, 
  Flame, 
  TrendingUp, 
  Radio, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Check, 
  BookOpen, 
  Layers, 
  Eye, 
  ShieldAlert, 
  Globe, 
  Activity, 
  Sparkles, 
  Cpu, 
  Trophy,
  Flame as FireIcon
} from 'lucide-react';
import { Article, NavigationTab } from '../types';
import { NAVIGATION_TABS } from '../data';

interface ArticleRightColumnProps {
  currentArticleId: string;
  currentCategoryId?: string;
  allArticles: Article[];
  categories?: NavigationTab[];
  language: 'ar' | 'en';
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (categoryId: string) => void;
}

// Category icons map
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'special-investigations': <ShieldAlert size={14} className="text-red-700" />,
  'alwarraq-investigations': <ShieldAlert size={14} className="text-red-700" />,
  'urgent-release': <FireIcon size={14} className="text-red-600 animate-pulse" />,
  'lebanon': <Activity size={14} className="text-emerald-700" />,
  'editor-desk': <BookOpen size={14} className="text-zinc-900" />,
  'intelligence-dispatch': <Radio size={14} className="text-amber-600 animate-pulse" />,
  'economy': <TrendingUp size={14} className="text-blue-700" />,
  'markets': <TrendingUp size={14} className="text-indigo-700" />,
  'oil-energy': <Flame size={14} className="text-orange-600" />,
  'arab-markets': <TrendingUp size={14} className="text-teal-700" />,
  'middle-east': <Globe size={14} className="text-zinc-800" />,
  'war-room': <Radio size={14} className="text-red-800" />,
  'translations': <Globe size={14} className="text-purple-700" />,
  'telecom-internet': <Cpu size={14} className="text-cyan-700" />,
  'world-of-ai': <Sparkles size={14} className="text-violet-700" />,
  'sports': <Trophy size={14} className="text-amber-700" />,
  'fifa-2026': <Trophy size={14} className="text-yellow-600" />,
  'pulse-of-the-street': <Activity size={14} className="text-rose-700" />,
  'what-if-simulator': <Layers size={14} className="text-zinc-700" />,
};

export default function ArticleRightColumn({
  currentArticleId,
  currentCategoryId,
  allArticles,
  categories = NAVIGATION_TABS,
  language,
  onSelectArticle,
  onSelectCategory,
}: ArticleRightColumnProps) {
  const isAr = language === 'ar';
  const ChevronIcon = isAr ? ChevronLeft : ChevronRight;

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Filter out current article and sort latest stories by date / index
  const latestStories = allArticles
    .filter((a) => a.id !== currentArticleId)
    .slice(0, 8);

  // Trending / Most read stories (highest views)
  const trendingStories = [...allArticles]
    .filter((a) => a.id !== currentArticleId)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  // Key sections list for the right column
  const keySectionIds = [
    'special-investigations',
    'lebanon',
    'editor-desk',
    'intelligence-dispatch',
    'economy',
    'oil-energy',
    'arab-markets',
    'middle-east',
    'war-room',
    'translations',
    'telecom-internet',
    'fifa-2026',
    'pulse-of-the-street',
  ];

  const sectionsList = keySectionIds
    .map((id) => categories.find((c) => c.id === id))
    .filter(Boolean) as NavigationTab[];

  // Article count map per category
  const articleCountMap: Record<string, number> = {};
  allArticles.forEach((art) => {
    const cat = art.category || 'other';
    articleCountMap[cat] = (articleCountMap[cat] || 0) + 1;
    if (art.categories && Array.isArray(art.categories)) {
      art.categories.forEach((c) => {
        articleCountMap[c] = (articleCountMap[c] || 0) + 1;
      });
    }
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    try {
      const stored = localStorage.getItem('alwarraq_newsletter_subscribers');
      const list = stored ? JSON.parse(stored) : [];
      if (!list.includes(newsletterEmail)) {
        list.push(newsletterEmail);
        localStorage.setItem('alwarraq_newsletter_subscribers', JSON.stringify(list));
      }
    } catch (e) {
      console.warn('Newsletter storage bypassed', e);
    }
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubmitted(false), 4000);
  };

  return (
    <aside 
      id="article-right-column" 
      className="w-full space-y-6 select-text"
      aria-label={isAr ? 'العمود الجانبي: الأقسام وأحدث الأخبار' : 'Right Column: Sections & Latest Stories'}
    >
      {/* 1. SECTIONS DIRECTORY (دليل الأقسام الصحفية) */}
      <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0_0_#1b1c1e]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-[#b91c1c]" />
            <h3 className="font-sans font-black text-sm uppercase tracking-wide text-zinc-950">
              {isAr ? 'الأقسام الصحفية' : 'Newsroom Sections'}
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
            {sectionsList.length} {isAr ? 'قسماً' : 'depts'}
          </span>
        </div>

        <nav className="space-y-1" aria-label={isAr ? 'تصفح أقسام الجريدة' : 'Newspaper Sections'}>
          {sectionsList.map((sec) => {
            const count = articleCountMap[sec.id] || 0;
            const isActive = currentCategoryId === sec.id;
            const icon = CATEGORY_ICONS[sec.id] || <Newspaper size={14} className="text-zinc-600" />;
            const label = isAr ? sec.labelAr : sec.labelEn;

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectCategory(sec.id)}
                className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-sans font-bold transition-all text-left rtl:text-right cursor-pointer rounded-none border ${
                  isActive
                    ? 'bg-black text-white border-black shadow-[2px_2px_0_0_#b91c1c]'
                    : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-900 border-zinc-200 hover:border-black'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="shrink-0">{icon}</span>
                  <span className="truncate">{label}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {count > 0 && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-xs ${
                      isActive ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-700'
                    }`}>
                      {count}
                    </span>
                  )}
                  <ChevronIcon size={12} className={isActive ? 'text-white' : 'text-zinc-400'} />
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 2. LATEST STORIES (أحدث الأخبار والتقارير) */}
      <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0_0_#1b1c1e]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
            </span>
            <h3 className="font-sans font-black text-sm uppercase tracking-wide text-zinc-950">
              {isAr ? 'أحدث الأخبار والتقارير' : 'Latest Stories Wire'}
            </h3>
          </div>
          <span className="text-[10px] font-mono font-black text-red-700 uppercase bg-red-50 border border-red-200 px-1.5 py-0.5">
            {isAr ? 'تحديث حي' : 'LIVE'}
          </span>
        </div>

        <div className="divide-y divide-zinc-200 space-y-3">
          {latestStories.map((story, idx) => {
            const storyTitle = isAr ? story.titleAr : story.titleEn;
            const categoryLabel = isAr
              ? (story.category === 'fifa-2026' ? 'فيفا 2026' : story.category === 'lebanon' ? 'لبنان' : story.category === 'oil-energy' ? 'طاقة' : story.category === 'economy' ? 'اقتصاد' : story.category === 'intelligence-dispatch' ? 'استخبارات' : 'متابعة')
              : (story.category || 'News').toUpperCase();

            const articleHref = `/?article=${encodeURIComponent(story.id)}`;

            return (
              <a
                key={story.id}
                href={articleHref}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectArticle(story);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`group block pt-3 first:pt-0 cursor-pointer transition-all hover:bg-zinc-50 p-1.5 -mx-1.5 rounded-none ${
                  idx === 0 ? '' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Thumbnail Image */}
                  <div className="w-16 h-16 shrink-0 relative overflow-hidden bg-zinc-100 border border-black">
                    <img
                      src={story.imageUrl}
                      alt={storyTitle}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80";
                      }}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-200"
                    />
                    {story.isBreaking && (
                      <span className="absolute top-0 right-0 bg-red-700 text-white text-[7px] font-mono font-black px-1 uppercase leading-tight">
                        {isAr ? 'عاجل' : 'ALERT'}
                      </span>
                    )}
                  </div>

                  {/* Story Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono">
                      <span className="font-extrabold text-red-700 uppercase">
                        {categoryLabel}
                      </span>
                      <span className="text-zinc-300">•</span>
                      <span className="text-zinc-500 flex items-center gap-0.5">
                        <Clock size={9} />
                        {story.date}
                      </span>
                    </div>

                    <h4 className="font-sans font-bold text-xs text-zinc-950 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
                      {storyTitle}
                    </h4>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* 3. MOST READ / TRENDING (الأكثر قراءة ومتابعة) */}
      <div className="bg-zinc-50 border-2 border-black p-4 shadow-[3px_3px_0_0_#1b1c1e]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-red-600" />
            <h3 className="font-sans font-black text-sm uppercase tracking-wide text-zinc-950">
              {isAr ? 'الأكثر قراءة ومتابعة' : 'Most Read Dispatches'}
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-zinc-500">#TOP-5</span>
        </div>

        <ol className="space-y-3" aria-label={isAr ? 'المقالات الأكثر قراءة' : 'Most read stories'}>
          {trendingStories.map((item, index) => {
            const itemTitle = isAr ? item.titleAr : item.titleEn;
            const rank = (index + 1).toString().padStart(2, '0');
            const itemHref = `/?article=${encodeURIComponent(item.id)}`;

            return (
              <li key={item.id} className="border-b border-dashed border-zinc-300 pb-2.5 last:border-b-0 last:pb-0">
                <a
                  href={itemHref}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectArticle(item);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex items-start gap-3 cursor-pointer"
                >
                  <span className="font-mono font-black text-xl text-red-700 shrink-0 leading-none pt-0.5 select-none">
                    {rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-sans font-bold text-xs text-zinc-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
                      {itemTitle}
                    </h5>
                    <div className="mt-1 flex items-center gap-2 text-[9px] font-mono text-zinc-500">
                      <span className="text-zinc-600 uppercase font-bold">{item.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Eye size={10} className="text-zinc-400" />
                        {item.views ? item.views.toLocaleString() : '8,400'} {isAr ? 'قراءة' : 'views'}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      {/* 4. DAILY INTELLIGENCE DISPATCH SPOTLIGHT (البرقية الاستخباراتية) */}
      <div className="bg-zinc-950 text-white border-2 border-black p-4 relative overflow-hidden shadow-[3px_3px_0_0_#b91c1c]">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-red-600/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
          <div className="flex items-center gap-1.5">
            <Radio size={14} className="text-red-500 animate-pulse" />
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-red-500">
              AL-WARRAQ INTEL
            </span>
          </div>
          <span className="text-[9px] font-mono px-1.5 py-0.2 bg-red-950 text-red-300 border border-red-800 uppercase">
            CONFIDENTIAL
          </span>
        </div>

        <h4 className="font-sans font-black text-sm text-white leading-snug">
          {isAr ? 'برقية اليوم الاستخباراتية - الإصدار الحي السري' : 'Daily Classified Intelligence Dispatch'}
        </h4>
        <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed font-sans">
          {isAr
            ? 'تحديثات مباشرة ومسودات أمنية وجيوسياسية من غرف العمليات وصناع القرار في بيروت والشرق الأوسط.'
            : 'Confidential briefings and geopolitical assessments direct from editorial operations in Beirut.'}
        </p>

        <button
          type="button"
          onClick={() => onSelectCategory('intelligence-dispatch')}
          className="mt-3 w-full bg-red-700 hover:bg-red-600 text-white text-xs font-sans font-black py-2 px-3 flex items-center justify-center gap-1.5 transition-colors cursor-pointer uppercase tracking-wider"
        >
          <span>{isAr ? 'طالع البرقية الاستخباراتية' : 'Open Intelligence Wire'}</span>
          <ChevronIcon size={12} />
        </button>
      </div>

      {/* 5. NEWSLETTER BRIEFING (النشرة البريدية اليومية) */}
      <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0_0_#1b1c1e]">
        <h4 className="font-sans font-black text-xs uppercase tracking-wide text-zinc-950 flex items-center gap-1.5">
          <Send size={13} className="text-red-700" />
          {isAr ? 'الموجز الصباحي لصحيفة الورّاق' : 'Daily Morning Intelligence'}
        </h4>
        <p className="text-[11px] text-zinc-600 mt-1 leading-relaxed font-sans">
          {isAr 
            ? 'احصل على أهم التقارير والتحقيقات الاستقصائية يومياً في بريدك الإلكتروني قبل النشر العام.'
            : 'Receive the morning briefing and exclusive investigations directly in your inbox.'}
        </p>

        {newsletterSubmitted ? (
          <div className="mt-2.5 p-2 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-sans font-bold flex items-center gap-1.5">
            <Check size={14} className="text-emerald-600 shrink-0" />
            <span>{isAr ? 'تم الاشتراك بنجاح! ستصلك برقياتنا.' : 'Subscribed successfully!'}</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="mt-2.5 space-y-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={isAr ? 'أدخل بريدك الإلكتروني...' : 'Enter your email...'}
              className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 border border-zinc-300 text-zinc-900 focus:outline-none focus:border-black font-mono rounded-none"
            />
            <button
              type="submit"
              className="w-full bg-black hover:bg-zinc-800 text-white text-xs font-sans font-black py-1.5 px-3 transition-colors cursor-pointer uppercase tracking-wider"
            >
              {isAr ? 'اشترك في الموجز' : 'Subscribe to Wire'}
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
