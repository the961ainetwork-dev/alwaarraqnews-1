import React from 'react';
import { BookMarked, BookOpen, Globe, ArrowUpRight, Newspaper, Bookmark, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Article } from '../types';
import GeopoliticalImpactChart from './GeopoliticalImpactChart';

interface ContextualDossierProps {
  article: Article;
  allArticles: Article[];
  language: 'ar' | 'en';
  onSelectArticle: (article: Article) => void;
  savedArticleIds?: string[];
  onToggleSaveMultipleArticles?: (articles: Article[], save: boolean) => void;
  currentUser?: any;
  onAuthClick?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ContextualDossier({
  article,
  allArticles,
  language,
  onSelectArticle,
  savedArticleIds = [],
  onToggleSaveMultipleArticles,
  currentUser,
  onAuthClick,
}: ContextualDossierProps) {
  const isAr = language === 'ar';

  const [impactData, setImpactData] = React.useState<{ 
    impactAr: string; 
    impactEn: string; 
    topics?: { tag: string; nameAr: string; nameEn: string; score: number }[] 
  } | null>(null);
  const [loadingImpact, setLoadingImpact] = React.useState<boolean>(false);

  // Fetch geopolitical impact using Gemini API on the server proxy
  React.useEffect(() => {
    let active = true;
    const fetchImpact = async () => {
      setLoadingImpact(true);
      setImpactData(null);
      try {
        const response = await fetch('/api/dossier/geopolitical-impact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            titleAr: article.titleAr,
            titleEn: article.titleEn,
            category: article.category,
            tags: article.tags || [],
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch geopolitical impact');
        }
        const data = await response.json();
        if (active) {
          setImpactData(data);
        }
      } catch (err) {
        console.error('Error fetching geopolitical impact:', err);
      } finally {
        if (active) {
          setLoadingImpact(false);
        }
      }
    };

    fetchImpact();

    return () => {
      active = false;
    };
  }, [article.id, article.titleAr, article.titleEn, article.category]);

  // Find other articles matching Research & Reports and Middle East
  const getScoredArticles = (category: string) => {
    const candidates = allArticles.filter(a => {
      if (a.id === article.id) return false;
      return a.category === category || (a.categories && a.categories.includes(category));
    });

    const scored = candidates.map(c => {
      // Calculate shared tags score
      const sharedTags = (c.tags || []).filter(t => (article.tags || []).includes(t));
      
      // Calculate title/summary keyword matches as additional correlation weight
      let keywordScore = 0;
      const currentKeywords = [...(article.tags || []), ...article.titleEn.toLowerCase().split(/\s+/), ...article.titleAr.split(/\s+/)];
      const targetText = `${c.titleEn} ${c.titleAr} ${c.summaryEn} ${c.summaryAr}`.toLowerCase();
      
      currentKeywords.forEach(kw => {
        if (kw.length > 3 && targetText.includes(kw)) {
          keywordScore += 1;
        }
      });

      const totalScore = sharedTags.length * 3 + keywordScore;

      return {
        article: c,
        score: totalScore,
        sharedTags,
      };
    });

    // Sort by correlation score (descending) then date (descending)
    return scored
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.article.date).getTime() - new Date(a.article.date).getTime();
      })
      .slice(0, 2);
  };

  const relatedResearch = getScoredArticles('research-reports');
  const relatedMiddleEast = getScoredArticles('middle-east');

  const hasAnyRelated = relatedResearch.length > 0 || relatedMiddleEast.length > 0;

  if (!hasAnyRelated) return null;

  // Collection of all related articles in the dossier
  const allRelatedArticles = [
    ...relatedResearch.map(r => r.article),
    ...relatedMiddleEast.map(m => m.article)
  ];

  // Check if all of them are already saved
  const isAllSaved = allRelatedArticles.length > 0 && allRelatedArticles.every(art => savedArticleIds.includes(art.id));

  const handleSaveCollection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      if (onAuthClick) {
        alert(isAr 
          ? 'الرجاء تسجيل الدخول أو إنشاء حساب جديد لحفظ هذه المجموعة.' 
          : 'Please sign in or create an account to bookmark this collection.'
        );
        onAuthClick();
      }
      return;
    }

    if (onToggleSaveMultipleArticles) {
      onToggleSaveMultipleArticles(allRelatedArticles, !isAllSaved);
    }
  };

  return (
    <motion.div 
      id="contextual-editorial-dossier"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="border-4 border-black bg-[#fcfbf9] p-5 font-sans select-none text-right rtl:text-right ltr:text-left shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-5 rounded mt-8"
    >
      {/* Dossier Header */}
      <motion.div 
        variants={itemVariants}
        className="border-b-2 border-black pb-3 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2">
          <BookMarked size={20} className="text-[#b91c1c]" />
          <div>
            <h4 className="font-sans font-black text-sm uppercase tracking-tight text-black">
              {isAr ? 'الملف التراكمي والسياقي: ترابط التحليلات' : 'Contextual Dossier: Geopolitical Cross-Reference'}
            </h4>
            <span className="text-[10px] font-mono font-bold text-zinc-500 block">
              {isAr ? 'تقاطع الأبحاث والتحقيقات الإقليمية المرجعية المتقاطعة' : 'CROSS-REFERENCING INTELLECTUAL AND REGIONAL DISPATCHES'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap justify-end">
          <button
            id="save-dossier-collection-btn"
            onClick={handleSaveCollection}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-black border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all rounded-xs cursor-pointer ${
              isAllSaved 
                ? 'bg-amber-400 text-black border-black' 
                : 'bg-white text-black hover:bg-zinc-100'
            }`}
            title={
              isAllSaved
                ? (isAr ? 'إزالة المجموعة من المقالات المحفوظة' : 'Remove collection from Saved Articles')
                : (isAr ? 'حفظ المجموعة كاملة في المقالات المحفوظة' : 'Save entire collection to Saved Articles')
            }
          >
            <Bookmark size={11} className={isAllSaved ? 'fill-black' : ''} />
            <span>
              {isAllSaved 
                ? (isAr ? 'المجموعة محفوظة' : 'Collection Saved') 
                : (isAr ? 'حفظ المجموعة' : 'Save Collection')}
            </span>
          </button>

          <div className="bg-[#b91c1c] text-white px-2 py-0.5 text-[9px] font-mono font-black border border-white tracking-widest uppercase rounded-xs shrink-0">
            {isAr ? 'الاستخبارات المرجعية' : 'CROSS-REFERENCED INTEL'}
          </div>
        </div>
      </motion.div>

      {/* Main Grid Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recommended Category: Research & Reports */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1.5">
            <BookOpen size={13} className="text-[#b91c1c]" />
            <span className="font-mono text-[10px] font-black text-zinc-700 uppercase tracking-wider">
              {isAr ? 'الدراسات والبحوث المنهجية الموصى بها' : 'RESEARCH & TACTICAL REPORTS'}
            </span>
          </div>
          
          {relatedResearch.length > 0 ? (
            <div className="space-y-3">
              {relatedResearch.map(({ article: rel, sharedTags }) => {
                const relTitle = isAr ? rel.titleAr : rel.titleEn;
                const relSummary = isAr ? (rel.excerptAr || rel.summaryAr) : (rel.excerptEn || rel.summaryEn);
                return (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="group p-3 border border-zinc-200 hover:border-black bg-white hover:bg-neutral-50/50 cursor-pointer transition-all rounded-xs space-y-1.5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <h5 className="font-sans font-extrabold text-xs leading-snug text-neutral-900 group-hover:text-[#b91c1c] transition-colors line-clamp-2">
                        {relTitle}
                      </h5>
                      <ArrowUpRight size={11} className="text-zinc-400 group-hover:text-[#b91c1c] transition-colors shrink-0 mt-0.5" />
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-2 font-medium">
                      {relSummary}
                    </p>
                    {sharedTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {sharedTags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[8px] font-mono bg-amber-50 text-amber-800 px-1.5 py-0.2 border border-amber-200 rounded-xs">
                            #{isAr ? tag : tag.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[10px] text-zinc-400 italic">
              {isAr ? 'لا توجد أبحاث متطابقة حالياً.' : 'No highly-correlated research reports indexed.'}
            </p>
          )}
        </motion.div>

        {/* Recommended Category: Middle East Affairs */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1.5">
            <Globe size={13} className="text-[#b91c1c]" />
            <span className="font-mono text-[10px] font-black text-zinc-700 uppercase tracking-wider">
              {isAr ? 'تغطية شؤون الشرق الأوسط الكبرى' : 'MIDDLE EAST AFFAIRS'}
            </span>
          </div>
          
          {relatedMiddleEast.length > 0 ? (
            <div className="space-y-3">
              {relatedMiddleEast.map(({ article: rel, sharedTags }) => {
                const relTitle = isAr ? rel.titleAr : rel.titleEn;
                const relSummary = isAr ? (rel.excerptAr || rel.summaryAr) : (rel.excerptEn || rel.summaryEn);
                return (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="group p-3 border border-zinc-200 hover:border-black bg-white hover:bg-neutral-50/50 cursor-pointer transition-all rounded-xs space-y-1.5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <h5 className="font-sans font-extrabold text-xs leading-snug text-neutral-900 group-hover:text-[#b91c1c] transition-colors line-clamp-2">
                        {relTitle}
                      </h5>
                      <ArrowUpRight size={11} className="text-zinc-400 group-hover:text-[#b91c1c] transition-colors shrink-0 mt-0.5" />
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-2 font-medium">
                      {relSummary}
                    </p>
                    {sharedTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {sharedTags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[8px] font-mono bg-zinc-100 text-zinc-700 px-1.5 py-0.2 border border-zinc-200 rounded-xs">
                            #{isAr ? tag : tag.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[10px] text-zinc-400 italic">
              {isAr ? 'لا توجد تقارير إقليمية متطابقة حالياً.' : 'No regional intelligence reports indexed.'}
            </p>
          )}
        </motion.div>

        {/* Geopolitical Impact Assessment Card (Gemini AI powered) */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 border-2 border-dashed border-black bg-neutral-100/60 p-4 rounded-xs space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center gap-1.5 border-b border-zinc-300 pb-1.5">
            <Sparkles size={13} className="text-[#b91c1c] animate-pulse" />
            <span className="font-mono text-[10px] font-black text-neutral-850 uppercase tracking-wider">
              {isAr ? 'تقييم الأثر الجيوسياسي الذكي (مدعوم بـ Gemini)' : 'GEOPOLITICAL IMPACT ASSESSMENT (GEMINI AI)'}
            </span>
            <span className="ml-auto text-[8px] font-mono bg-[#b91c1c] text-white px-1.5 py-0.5 rounded-xs uppercase font-extrabold tracking-tight">
              {isAr ? 'فوري' : 'REAL-TIME'}
            </span>
          </div>

          {loadingImpact ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-2">
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                {isAr ? 'جاري تحليل الأبعاد الجيوسياسية...' : 'COMPUTING GEOPOLITICAL VECTORS...'}
              </p>
            </div>
          ) : impactData ? (
            <div className="text-right rtl:text-right ltr:text-left space-y-4">
              <p className="text-xs text-neutral-800 leading-relaxed font-sans font-medium select-text">
                {isAr ? impactData.impactAr : impactData.impactEn}
              </p>

              {/* D3-based Bar Chart visualization of the topic impact scores */}
              {impactData.topics && impactData.topics.length > 0 && (
                <div className="space-y-1.5">
                  <h5 className="font-mono text-[9px] font-black text-neutral-700 uppercase tracking-wider">
                    {isAr ? 'مؤشرات الأثر الاستراتيجي والموضوعي (بمقياس 0-100)' : 'STRATEGIC IMPACT INDICATORS (SCALE 0-100)'}
                  </h5>
                  <GeopoliticalImpactChart topics={impactData.topics} language={language} />
                </div>
              )}

              <div className="flex items-center gap-1.5 text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest pt-1 border-t border-zinc-200/50">
                <span>{isAr ? 'نموذج التحليل:' : 'ENGINE MODEL:'} GEMINI-3.5-FLASH</span>
                <span>•</span>
                <span>{isAr ? 'مستوى الثقة:' : 'CONFIDENCE:'} 96%</span>
              </div>
            </div>
          ) : (
            <p className="text-[10px] text-zinc-400 italic">
              {isAr ? 'فشل تحميل تقييم الأثر الجيوسياسي.' : 'Unable to compute geopolitical impact assessment.'}
            </p>
          )}
        </motion.div>
      </div>

      {/* Interactive metadata footprint */}
      <motion.div 
        variants={itemVariants}
        className="border-t border-dashed border-zinc-300 pt-3 flex items-center justify-between text-[9px] text-zinc-400 font-mono font-bold uppercase"
      >
        <span className="flex items-center gap-1">
          <Newspaper size={10} />
          {isAr ? 'وكالة أنباء الوراق • التحليل الجيوسياسي والسياقي' : 'Al-Warraq Wire • Geopolitical Context Engine'}
        </span>
        <span>
          {isAr ? 'مزامنة معيارية متكاملة' : 'Live Semantic Sync Matrix'}
        </span>
      </motion.div>
    </motion.div>
  );
}
