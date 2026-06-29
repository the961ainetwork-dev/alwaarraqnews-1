import React, { useMemo } from 'react';
import { TrendingUp, Eye } from 'lucide-react';
import { Article, LayoutMode } from '../types';

interface TrendingWidgetProps {
  articles: Article[];
  language: 'ar' | 'en';
  layoutMode: LayoutMode;
  onSelectArticle: (article: Article) => void;
}

export default function TrendingWidget({
  articles,
  language,
  layoutMode,
  onSelectArticle,
}: TrendingWidgetProps) {
  const isAr = language === 'ar';
  const isPrint = layoutMode === 'classic-print';

  const trendingArticles = useMemo(() => {
    // We target the top 5 most viewed articles over "the last 24-48 hours"
    // Our dataset has dates like '18 يونيو 2026', '16 يونيو 2026', etc.
    const recentDays = ['18 يونيو', '19 يونيو', '18 June', '19 June', '17 يونيو', '17 June'];
    
    // Attempt to filter for recent ones
    const recent = articles.filter((art) =>
      recentDays.some((day) => art.date.includes(day))
    );

    // If we have at least 5 recent ones, sort and take top 5
    if (recent.length >= 5) {
      return [...recent].sort((a, b) => b.views - a.views).slice(0, 5);
    }

    // Fallback to top 5 most viewed overall
    return [...articles].sort((a, b) => b.views - a.views).slice(0, 5);
  }, [articles]);

  const formatViews = (views: number) => {
    if (views >= 1000) {
      const kVal = (views / 1000).toFixed(1);
      return isAr ? `${kVal} ألف قراءة` : `${kVal}k views`;
    }
    return isAr ? `${views} قراءة` : `${views} views`;
  };

  return (
    <div
      id="trending-sidebar-widget"
      className={`border-4 p-5 transition-all w-full select-none ${
        isPrint
          ? 'border-zinc-800 bg-[#fbfbf9] text-zinc-900 border-double-editorial font-serif'
          : 'border-black bg-white text-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Title block with live red dot indicator */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className={isPrint ? 'text-black' : 'text-[#b91c1c]'} />
          <h3 className="font-sans font-black text-xs md:text-sm uppercase tracking-wider">
            {isAr ? 'الأكثر قراءة الآن' : 'Trending Wire'}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] font-extrabold uppercase bg-red-700/10 text-red-750 px-2 py-0.5 rounded-sm">
          <span className="w-1.5 h-1.5 bg-[#b91c1c] rounded-full inline-block animate-ping"></span>
          <span>{isAr ? 'مباشر ٢٤ ساعة' : 'LIVE 24H'}</span>
        </div>
      </div>

      {/* List items */}
      <div className="divide-y divide-zinc-200 space-y-3.5 pt-1">
        {trendingArticles.map((art, index) => {
          const title = isAr ? art.titleAr : art.titleEn;
          const readTime = isAr ? art.readTimeAr : art.readTimeEn;

          return (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="group flex gap-4 pt-3.5 first:pt-0 cursor-pointer text-left rtl:text-right"
            >
              {/* Massive high-contrast ranking number */}
              <div className="shrink-0 flex items-start pt-1">
                <span className="font-sans font-black text-2xl md:text-3.5xl tracking-tight text-neutral-300 group-hover:text-black transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[8px] font-extrabold tracking-wider uppercase text-zinc-400">
                    {art.category.replace('-', ' ')}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[8px] text-zinc-500 font-bold uppercase shrink-0">
                    <Eye size={10} className="stroke-[2.5]" />
                    <span>{formatViews(art.views)}</span>
                  </div>
                </div>

                <h4 className="font-sans font-bold text-xs leading-snug text-neutral-900 group-hover:text-[#b91c1c] group-hover:underline transition-colors line-clamp-2">
                  {title}
                </h4>

                <div className="flex items-center gap-2 font-mono text-[8px] text-zinc-400 pt-0.5">
                  <span>{isAr ? art.date : art.date}</span>
                  <span>•</span>
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
