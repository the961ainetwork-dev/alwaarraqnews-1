import React from 'react';
import { Megaphone, ArrowUpRight } from 'lucide-react';
import { Article } from '../types';

interface BreakingBarProps {
  language: 'ar' | 'en';
  latestBreaking: Article | null;
  onSelectArticle: (article: Article) => void;
  siteDesign?: any;
}

export default function BreakingBar({ language, latestBreaking, onSelectArticle, siteDesign }: BreakingBarProps) {
  const isAr = language === 'ar';
  const customAlert = isAr ? siteDesign?.alertBannerAr : siteDesign?.alertBannerEn;

  // Render if we have either a breaking story or a custom alert configured by the admin
  if (!latestBreaking && !customAlert) return null;

  return (
    <div 
      className="bg-black text-white py-2 px-4 shadow-none select-auto flex items-center justify-between border-b border-zinc-800 font-sans"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
        {/* Grayscale monochrome عاجل badge */}
        <div className="bg-white text-black px-3 py-1 rounded-sm text-xs font-black tracking-wide uppercase min-w-max flex items-center gap-1 shadow-none font-sans border border-black animate-pulse">
          <Megaphone size={12} className="text-black" />
          <span>{isAr ? 'يحدث الآن' : 'HAPPENING NOW'}</span>
        </div>

        {/* Ticking Marquee Text */}
        {latestBreaking ? (
          <button
            onClick={() => onSelectArticle(latestBreaking)}
            className="text-right flex-1 text-xs md:text-sm font-extrabold tracking-wide hover:underline cursor-pointer flex items-center gap-1 text-white truncate focus:outline-none"
          >
            <span className="truncate">
              {isAr ? latestBreaking.titleAr : latestBreaking.titleEn}
              {customAlert && <span className="mx-4 text-amber-400">★ {customAlert}</span>}
            </span>
            <ArrowUpRight size={14} className="opacity-80 flex-shrink-0" />
          </button>
        ) : (
          <div className="text-right flex-1 text-xs md:text-sm font-extrabold tracking-wide text-amber-400 truncate">
            {customAlert}
          </div>
        )}

        {/* Dynamic date/time ticker block */}
        <span className="hidden md:inline-block text-[10px] text-zinc-400 border-r pr-3 border-zinc-800 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-3 font-mono">
          {latestBreaking?.readTimeAr ? (isAr ? `مطالعة: ${latestBreaking.readTimeAr}` : `Read: ${latestBreaking.readTimeEn}`) : (isAr ? 'تنبيه مباشر' : 'Live Alert')}
        </span>
      </div>
    </div>
  );
}
