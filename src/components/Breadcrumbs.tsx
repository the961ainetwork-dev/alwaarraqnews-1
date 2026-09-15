import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft, Layers, Compass, ExternalLink, FileText, Home } from 'lucide-react';
import { NavigationTab } from '../types';
import { NAVIGATION_TABS } from '../data';

interface BreadcrumbsProps {
  language: 'ar' | 'en';
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  categories?: NavigationTab[];
  searchQuery?: string;
  articleTitle?: string;
  subSectionTitle?: string;
  className?: string;
  compact?: boolean;
}

// Define the parent-child section relationships mapping
export const PARENT_CHILD_RELATIONS: Record<string, string> = {
  'lebanon': 'middle-east',
  'exclusives': 'special-investigations',
  'translations': 'middle-east',
  'war-room': 'middle-east',
  'pulse-of-the-street': 'middle-east',
  'markets': 'economy',
  'oil-energy': 'markets',
  'arab-markets': 'markets',
  'instats': 'markets',
  'research-reports': 'special-investigations',
  'alwarraq-investigations': 'special-investigations',
  'sentiment-analysis': 'telecom-internet',
  'world-of-ai': 'telecom-internet',
  'fifa-2026': 'sports',
  'what-if-simulator': 'middle-east',
  'iraq-us-dossier': 'special-investigations',
  'press-releases': 'economy',
  'editor-desk': 'special-investigations',
  'in-case-you-missed-it': 'special-investigations',
};

const SPECIAL_CATEGORY_LABELS: Record<string, { ar: string; en: string }> = {
  'all': { ar: 'الرئيسية', en: 'Home' },
  'admin': { ar: 'لوحة تحكم معن (الإدارة والتحرير)', en: 'Admin & Editorial Studio' },
  'intelligence-dispatch': { ar: 'نشرة الورّاق الاستخباراتية اليومية', en: 'Daily Intelligence Dispatch' },
  'daily-dispatch': { ar: 'نشرة الورّاق الاستخباراتية اليومية', en: 'Daily Intelligence Dispatch' },
  'dispatch': { ar: 'نشرة الورّاق الاستخباراتية اليومية', en: 'Daily Intelligence Dispatch' },
  'publication': { ar: 'نشرة الورّاق الاستخباراتية اليومية', en: 'Daily Intelligence Dispatch' },
  'newsletter': { ar: 'النشرة البريدية الكلاسيكية', en: 'Classic Newsletter' },
  'premium-pricing': { ar: 'العضوية البريميوم الفاخرة ($)', en: 'Sovereign Premium ($)' },
  'saved-articles': { ar: 'المقالات المحفوظة في الديوان', en: 'Saved Articles Archive' },
  'sentiment-analysis': { ar: 'تحليل المشاعر ومؤشر الرأي', en: 'Sentiment Analysis' },
  'what-if-simulator': { ar: 'محاكي تقدير المواقف "ماذا لو"', en: 'What-If Geopolitical Simulator' },
  'world-of-ai': { ar: 'عالم الذكاء الاصطناعي', en: 'World of AI' },
  'iraq-us-dossier': { ar: 'ملف الاستثمارات والسيادة', en: 'Sovereign Dossier' },
  'press-releases': { ar: 'البيانات الصحفية الموثقة', en: 'Press Releases' },
  'urgent-release': { ar: 'يحدث الآن والبرقيات العاجلة', en: 'Happening Now' },
  'war-room': { ar: 'غرفة الحرب الجيوسياسية', en: 'War Room Intel' },
  'pulse-of-the-street': { ar: 'نبض الشارع واستطلاعات الرأي', en: 'Pulse of the Street' },
  'crosswords': { ar: 'الكلمات المتقاطعة والترفيه الفكري', en: 'Crosswords & Interactive' },
  'special-investigations': { ar: 'التحقيقات الاستقصائية', en: 'Special Investigations' },
  'alwarraq-investigations': { ar: 'بوابة التحقيقات الاستقصائية', en: 'Al-Warraq Investigative Portal' },
  'editor-desk': { ar: 'من رئيس التحرير', en: "From the Editor-in-Chief" },
  'in-case-you-missed-it': { ar: 'في حال فاتك', en: 'In Case You Missed It' },
  'instats': { ar: 'إحصاءات الورّاق الرقمية', en: 'In Stats' },
  'videos': { ar: 'فيديو الورّاق', en: 'Al-Warraq Videos' },
  'podcast': { ar: 'بودكاست الورّاق', en: 'Al-Warraq Podcast' },
  'middle-east': { ar: 'شؤون الشرق الأوسط', en: 'Middle East Core' },
  'economy': { ar: 'الاقتصاد', en: 'Economy' },
  'markets': { ar: 'أسواق المال السيادية', en: 'Sovereign Markets' },
  'oil-energy': { ar: 'النفط والطاقة', en: 'Oil & Energy' },
  'arab-markets': { ar: 'الأسواق العربية', en: 'Arab Markets' },
  'telecom-internet': { ar: 'الاتصالات والإنترنت', en: 'Telecom & Internet' },
  'research-reports': { ar: 'التقارير الاستقصائية والأبحاث', en: 'Investigative Reports' },
  'sports': { ar: 'رياضة', en: 'Sports' },
  'fifa-2026': { ar: 'ملف فيفا 2026', en: 'FIFA 2026' },
  'wellness-lifestyle': { ar: 'الصحة والحياة', en: 'Health & Lifestyle' },
  'lebanon': { ar: 'أخبار وقضايا لبنان والشرق الأدنى', en: 'Lebanon & Near East' },
  'translations': { ar: 'ترجمات ودراسات دولية', en: 'Translations' },
  'exclusives': { ar: 'تحقيقات صحفية خاصة', en: 'Exclusives' }
};

export default function Breadcrumbs({
  language,
  activeCategory,
  setActiveCategory,
  categories = NAVIGATION_TABS,
  searchQuery,
  articleTitle,
  subSectionTitle,
  className = '',
  compact = false
}: BreadcrumbsProps) {
  const isAr = language === 'ar';

  // Find active category item
  const currentTab = categories.find((c) => c.id === activeCategory);
  
  // Find parent ID if any
  const parentId = PARENT_CHILD_RELATIONS[activeCategory];
  const parentTab = parentId ? categories.find((c) => c.id === parentId) : null;

  // Determine children sections of this category (if it acts as a parent)
  const childTabs = categories.filter((c) => PARENT_CHILD_RELATIONS[c.id] === activeCategory);

  // Determine siblings if active section is a child
  const siblingTabs = parentId
    ? categories.filter((c) => PARENT_CHILD_RELATIONS[c.id] === parentId && c.id !== activeCategory)
    : [];

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
  };

  const getLabel = (tab: NavigationTab | null | undefined, fallbackId: string) => {
    if (SPECIAL_CATEGORY_LABELS[fallbackId]) {
      return isAr ? SPECIAL_CATEGORY_LABELS[fallbackId].ar : SPECIAL_CATEGORY_LABELS[fallbackId].en;
    }
    if (!tab) return fallbackId;
    return isAr ? tab.labelAr : tab.labelEn;
  };

  // Helper render for separator icon with directional support
  const renderSeparator = () => {
    return isAr ? (
      <ChevronLeft size={11} className="text-zinc-400 shrink-0" />
    ) : (
      <ChevronRight size={11} className="text-zinc-400 shrink-0" />
    );
  };

  return (
    <nav 
      aria-label="Breadcrumb navigation"
      id="custom-breadcrumbs-container"
      className={`border-2 border-black bg-white ${compact ? 'p-2.5' : 'p-3.5 sm:p-4'} font-mono select-none text-black flex flex-col gap-3 shadow-xs ${className}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Top row: Interactive Breadcrumbs stack & Section Link */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 text-xxs">
        {/* Breadcrumb path */}
        <div className="flex items-center flex-wrap gap-1.5 font-bold">
          {/* Home Link */}
          <button
            type="button"
            id="breadcrumb-home-btn"
            onClick={() => handleCategorySelect('all')}
            className="cursor-pointer hover:underline text-zinc-500 hover:text-black flex items-center gap-1 transition-colors"
          >
            <Home size={11} />
            <span>{isAr ? 'الرئيسية' : 'Home'}</span>
          </button>

          {/* If there is a parent node, render it first */}
          {parentTab && (
            <>
              {renderSeparator()}
              <button
                type="button"
                id={`breadcrumb-parent-${parentTab.id}`}
                onClick={() => handleCategorySelect(parentTab.id)}
                className="cursor-pointer hover:underline text-zinc-500 hover:text-black font-semibold transition-colors"
              >
                {getLabel(parentTab, parentId as string)}
              </button>
            </>
          )}

          {/* Active category / section */}
          {activeCategory !== 'all' && (
            <>
              {renderSeparator()}
              <button
                type="button"
                onClick={() => handleCategorySelect(activeCategory)}
                className={`font-extrabold px-1.5 py-0.5 border rounded-xs transition-colors cursor-pointer ${
                  articleTitle || subSectionTitle 
                    ? 'text-zinc-600 bg-zinc-100 hover:bg-zinc-200 border-zinc-300' 
                    : 'text-[#b91c1c] bg-red-50 hover:bg-red-100 border-red-200/60'
                }`}
              >
                {getLabel(currentTab, activeCategory)}
              </button>
            </>
          )}

          {/* Sub-section (e.g. Issue #144) */}
          {subSectionTitle && (
            <>
              {renderSeparator()}
              <span className="font-extrabold text-[#b91c1c] bg-red-50 px-1.5 py-0.5 border border-red-200 rounded-xs">
                {subSectionTitle}
              </span>
            </>
          )}

          {/* Article Title (when inside an article dossier) */}
          {articleTitle && (
            <>
              {renderSeparator()}
              <span className="flex items-center gap-1 font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 border border-zinc-300 rounded-xs max-w-xs md:max-w-md truncate" title={articleTitle}>
                <FileText size={10} className="text-red-700 shrink-0" />
                <span className="truncate">{articleTitle}</span>
              </span>
            </>
          )}

          {/* Search phrase append */}
          {searchQuery && (
            <>
              {renderSeparator()}
              <span className="text-zinc-400">{isAr ? 'ترشيح البحث' : 'Search Term'}</span>
              {renderSeparator()}
              <span className="font-extrabold text-[#b91c1c] bg-zinc-100 px-1.5 py-0.5 border border-zinc-200 rounded-xs">
                "{searchQuery}"
              </span>
            </>
          )}
        </div>

        {/* Live section URL indicator */}
        <div className="flex items-center gap-1.5 text-zinc-600 sm:border-l sm:pl-3 sm:rtl:border-l-0 sm:rtl:border-r sm:rtl:pr-3 border-zinc-200 text-xxs whitespace-nowrap">
          <span className="text-zinc-400">{isAr ? 'رابط المسار:' : 'Path URL:'}</span>
          <span className="bg-zinc-50 border border-zinc-200 px-2 py-0.5 select-all text-black font-black text-[10px] rounded-xs font-mono">
            {activeCategory === 'all'
              ? `https://alwarraqnews.com/${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`
              : activeCategory === 'admin'
              ? 'https://alwarraqnews.com/admin'
              : activeCategory === 'intelligence-dispatch'
              ? 'https://alwarraqnews.com/intelligence-dispatch'
              : activeCategory === 'premium-pricing'
              ? 'https://alwarraqnews.com/premium-pricing'
              : activeCategory === 'saved-articles'
              ? 'https://alwarraqnews.com/saved-articles'
              : `https://alwarraqnews.com/section/${activeCategory}`}
          </span>
        </div>
      </div>

      {/* Bottom row: Parent-to-Child & Sibling Shortcuts Row (only when not in compact mode) */}
      {!compact && (childTabs.length > 0 || siblingTabs.length > 0) && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="pt-2 border-t border-dashed border-zinc-200 flex flex-col gap-2"
          >
            {/* 1. If currently a Parent Category: Display children to drill down into */}
            {childTabs.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-zinc-400 text-xxs font-bold flex items-center gap-1">
                  <Layers size={10} className="text-zinc-500" />
                  {isAr ? 'الفروع التابعة:' : 'Subsections:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {childTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      id={`drilldown-child-${tab.id}`}
                      onClick={() => handleCategorySelect(tab.id)}
                      className="px-2 py-0.5 text-xxs bg-zinc-100 hover:bg-black hover:text-white transition-all text-zinc-700 font-bold border border-zinc-300 hover:border-black rounded-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isAr ? tab.labelAr : tab.labelEn}</span>
                      {isAr ? <ArrowLeft size={10} /> : <ArrowRight size={10} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. If currently a Child Category: Display parent jump back and active siblings */}
            {siblingTabs.length > 0 && parentTab && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-zinc-400 text-xxs font-bold flex items-center gap-1">
                    <Compass size={10} className="text-zinc-500" />
                    {isAr ? `تصفح باقي أقسام ${getLabel(parentTab, parentId)}:` : `Other sections in ${getLabel(parentTab, parentId)}:`}
                  </span>
                  
                  {/* Jump up to Parent Button */}
                  <button
                    type="button"
                    id={`jump-to-parent-${parentTab.id}`}
                    onClick={() => handleCategorySelect(parentTab.id)}
                    className="px-2 py-0.5 text-xxs bg-zinc-100 hover:bg-zinc-200 text-[#b91c1c] font-black border border-zinc-300 rounded-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {isAr ? <ArrowRight size={10} /> : <ArrowLeft size={10} />}
                    <span>{isAr ? `الرجوع للأعلى (${getLabel(parentTab, parentId)})` : `Go up to (${getLabel(parentTab, parentId)})`}</span>
                  </button>

                  {/* Sibling navigation list */}
                  <div className="flex flex-wrap gap-1.5">
                    {siblingTabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        id={`drilldown-sibling-${tab.id}`}
                        onClick={() => handleCategorySelect(tab.id)}
                        className="px-2 py-0.5 text-xxs bg-white hover:bg-black hover:text-white transition-all text-zinc-600 font-bold border border-zinc-300 hover:border-black rounded-xs cursor-pointer"
                      >
                        {isAr ? tab.labelAr : tab.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </nav>
  );
}
