import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft, Layers, Compass, ExternalLink } from 'lucide-react';
import { NavigationTab } from '../types';

interface BreadcrumbsProps {
  language: 'ar' | 'en';
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  categories: NavigationTab[];
  searchQuery?: string;
}

// Define the parent-child section relationships mapping
export const PARENT_CHILD_RELATIONS: Record<string, string> = {
  'lebanon': 'middle-east',
  'exclusives': 'middle-east',
  'translations': 'middle-east',
  'arab-markets': 'markets',
  'instats': 'markets',
  'research-reports': 'telecom-internet',
  'sentiment-analysis': 'telecom-internet',
  'fifa-2026': 'sports',
};

// Custom icons or indicators for parent groups
const GROUP_THEME_COLORS: Record<string, string> = {
  'middle-east': 'border-red-500 bg-red-50/50 hover:bg-red-50 text-red-700 dark:text-red-400',
  'markets': 'border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 dark:text-emerald-400',
  'telecom-internet': 'border-blue-500 bg-blue-50/50 hover:bg-blue-50 text-blue-700 dark:text-blue-400',
  'sports': 'border-amber-500 bg-amber-50/50 hover:bg-amber-50 text-amber-700 dark:text-amber-400',
};

export default function Breadcrumbs({
  language,
  activeCategory,
  setActiveCategory,
  categories,
  searchQuery,
}: BreadcrumbsProps) {
  const isAr = language === 'ar';

  // Find active category item
  const currentTab = categories.find((c) => c.id === activeCategory);
  
  // Find parent ID if any
  const parentId = PARENT_CHILD_RELATIONS[activeCategory];
  const parentTab = parentId ? categories.find((c) => c.id === parentId) : null;

  // Determine children sections of this category (if it is acts as a parent)
  const childTabs = categories.filter((c) => PARENT_CHILD_RELATIONS[c.id] === activeCategory);

  // Determine siblings if active section is a child
  const siblingTabs = parentId
    ? categories.filter((c) => PARENT_CHILD_RELATIONS[c.id] === parentId && c.id !== activeCategory)
    : [];

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
  };

  const getLabel = (tab: NavigationTab | null | undefined, fallbackId: string) => {
    if (!tab) return fallbackId;
    return isAr ? tab.labelAr : tab.labelEn;
  };

  // Helper render for separator icon with directional support
  const renderSeparator = () => {
    return isAr ? (
      <ChevronLeft size={11} className="text-zinc-400" />
    ) : (
      <ChevronRight size={11} className="text-zinc-400" />
    );
  };

  return (
    <div 
      id="custom-breadcrumbs-container"
      className="border-2 border-black bg-white p-4 font-mono select-none text-black flex flex-col gap-3.5"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Top row: Interactive Breadcrumbs stack & Section Link */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xxs">
        {/* Breadcrumb path */}
        <div className="flex items-center flex-wrap gap-1.5 font-bold">
          {/* Home Link */}
          <span
            id="breadcrumb-home-btn"
            onClick={() => handleCategorySelect('all')}
            className={`cursor-pointer hover:underline text-zinc-500 hover:text-black flex items-center gap-1 transition-colors`}
          >
            <Compass size={11} />
            {isAr ? 'الرئيسية' : 'Home'}
          </span>

          {/* If there is a parent node, render it first */}
          {parentTab && (
            <>
              {renderSeparator()}
              <span
                id={`breadcrumb-parent-${parentTab.id}`}
                onClick={() => handleCategorySelect(parentTab.id)}
                className="cursor-pointer hover:underline text-zinc-500 hover:text-black font-semibold"
              >
                {getLabel(parentTab, parentId as string)}
              </span>
            </>
          )}

          {/* Active branch */}
          {activeCategory !== 'all' && (
            <>
              {renderSeparator()}
              <span className="font-extrabold text-[#b91c1c] bg-red-50 px-1.5 py-0.5 border border-red-200/50 rounded-xs">
                {activeCategory === 'admin'
                  ? (isAr ? 'لوحة تحكم معن (الإدارة)' : 'Admin Panel')
                  : activeCategory === 'premium-pricing'
                  ? (isAr ? 'العضوية البريميوم الفاخرة ($)' : 'Sovereign Premium ($)')
                  : activeCategory === 'saved-articles'
                  ? (isAr ? 'المقالات المحفوظة' : 'Saved Articles')
                  : activeCategory === 'newsletter'
                  ? (isAr ? 'النشرة البريدية الكلاسيكية' : 'Classic Newsletter')
                  : activeCategory === 'sentiment-analysis'
                  ? (isAr ? 'تحليل المشاعر' : 'Sentiment Analysis')
                  : activeCategory === 'what-if-simulator'
                  ? (isAr ? 'محاكي تقدير المواقف "ماذا لو"' : 'What-If Geopolitical Simulator')
                  : getLabel(currentTab, activeCategory)}
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
        <div className="flex items-center gap-1.5 text-zinc-650 sm:border-l sm:pl-3 sm:rtl:border-l-0 sm:rtl:border-r sm:rtl:pr-3 border-zinc-200 text-xxs whitespace-nowrap">
          <span className="text-zinc-400">{isAr ? 'رابط القسم:' : 'Section URL:'}</span>
          <span className="bg-zinc-50 border border-zinc-200 px-2 py-0.5 select-all text-black font-black text-[10px] rounded-xs font-mono">
            {activeCategory === 'all'
              ? `https://alwarraqnews.com/${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`
              : activeCategory === 'admin'
              ? 'https://alwarraqnews.com/admin'
              : activeCategory === 'premium-pricing'
              ? 'https://alwarraqnews.com/premium-pricing'
              : activeCategory === 'saved-articles'
              ? 'https://alwarraqnews.com/saved-articles'
              : `https://alwarraqnews.com/section/${activeCategory}`}
          </span>
        </div>
      </div>

      {/* Bottom row: Parent-to-Child & Sibling Shortcuts Row */}
      <AnimatePresence mode="wait">
        {(childTabs.length > 0 || siblingTabs.length > 0) && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="pt-2.5 border-t border-dashed border-zinc-200 flex flex-col gap-2"
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
                      id={`drilldown-child-${tab.id}`}
                      onClick={() => handleCategorySelect(tab.id)}
                      className="px-2 py-1 text-xxs bg-zinc-150 hover:bg-black hover:text-white transition-all text-zinc-700 font-bold border border-zinc-300 hover:border-black rounded-xs flex items-center gap-1 cursor-pointer"
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
                    id={`jump-to-parent-${parentTab.id}`}
                    onClick={() => handleCategorySelect(parentTab.id)}
                    className="px-2 py-1 text-xxs bg-zinc-100 hover:bg-zinc-200 text-[#b91c1c] font-black border border-zinc-300 rounded-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {isAr ? <ArrowRight size={10} /> : <ArrowLeft size={10} />}
                    <span>{isAr ? `الرجوع للأعلى (${getLabel(parentTab, parentId)})` : `Go up to (${getLabel(parentTab, parentId)})`}</span>
                  </button>

                  {/* Sibling navigation list */}
                  <div className="flex flex-wrap gap-1.5">
                    {siblingTabs.map((tab) => (
                      <button
                        key={tab.id}
                        id={`drilldown-sibling-${tab.id}`}
                        onClick={() => handleCategorySelect(tab.id)}
                        className="px-2 py-1 text-xxs bg-white hover:bg-black hover:text-white transition-all text-zinc-600 font-bold border border-zinc-300 hover:border-black rounded-xs cursor-pointer"
                      >
                        {isAr ? tab.labelAr : tab.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
