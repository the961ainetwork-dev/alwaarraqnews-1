import React from 'react';
import { Clock, Eye, ArrowLeft, ArrowRight, Rss, Share2, Check, Bookmark, Copy } from 'lucide-react';
import { Article, LayoutMode } from '../types';
import { INITIAL_ARTICLES } from '../data';

interface ArticleCardProps {
  key?: React.Key;
  article: Article;
  layoutMode: LayoutMode;
  language: 'ar' | 'en';
  variant: 'lead' | 'standard' | 'opinion' | 'minimal';
  onSelect: (article: Article) => void;
  index?: number;
  isSaved?: boolean;
  onToggleSave?: (article: Article, e: React.MouseEvent) => void;
  onTagClick?: (tag: string, e: React.MouseEvent) => void;
  hideImage?: boolean;
}

export default function ArticleCard({
  article,
  layoutMode,
  language,
  variant,
  onSelect,
  index,
  isSaved = false,
  onToggleSave,
  onTagClick,
  hideImage = false,
}: ArticleCardProps) {
  const isAr = language === 'ar';
  const isPrint = layoutMode === 'classic-print';

  const isInvestigative = 
    article.category === 'investigations' || 
    article.categories?.includes('investigations') ||
    article.category === 'alwarraq-investigations' ||
    article.categories?.includes('alwarraq-investigations') ||
    [
      'lebanon-framework-agreement-analysis-2026',
      'solidere-extension-2069',
      'lebanon-ceasefire-mirage-2026',
      'lebanon-economic-abyss-2026',
      'ch12-hebrew-jd-vance-criticism-2026',
      'israel-lebanon-deal-behind-scenes',
      'south-lebanon-secret-annex-investigation',
      'iran-frozen-assets-2026'
    ].includes(article.id);

  const isLebanonBureau = 
    article.category === 'lebanon' || 
    article.categories?.includes('lebanon');

  const shouldHideImage = hideImage || isLebanonBureau;

  const [copied, setCopied] = React.useState(false);

  const getShareUrl = () => `https://www.alwarraqnews.com/?article=${article.id}`;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = getShareUrl();
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = getShareUrl();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: summary,
          url: shareUrl,
        });
      } catch (err) {
        console.warn('Native share failed or dismissed:', err);
      }
    }
  };

  const handleShareWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = getShareUrl();
    const prefix = isAr 
      ? `هذا تنبيه إخباري من alwarraqnews.com - تحليل وتغطية صحفية\n\n` 
      : `This is a news alert from alwarraqnews.com - News Analysis and Reporting\n\n`;
    const textToShare = `${prefix}*${title}*\n${summary}\n\n👉 ${isAr ? 'اقرأ الخبر كاملاً:' : 'Read full article:'} ${shareUrl}\n\njoin our whatsapp group on https://chat.whatsapp.com/Fgh6uYQegGKKjs3DL6hy6A -  read more on alwarraqnews.com - Read our latest newsletter edition on join our premium subscribers https://www.alwarraqnews.com/premium-pricing`;
    const encoded = encodeURIComponent(textToShare);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleShareTwitter = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = getShareUrl();
    const textToTweet = `${title} - ${shareUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(textToTweet)}`, '_blank');
  };

  const handleShareFacebook = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = getShareUrl();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const renderSocialShareButtons = () => {
    return (
      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
        {/* Bookmark button */}
        {onToggleSave && (
          <button
            onClick={(e) => onToggleSave(article, e)}
            className={`h-6 px-1.5 py-0.5 rounded transition-all focus:outline-none cursor-pointer flex items-center justify-center gap-1 text-[9px] font-sans font-black border ${
              isSaved
                ? 'bg-amber-100 text-amber-800 border-amber-400'
                : 'bg-white text-zinc-700 hover:text-black hover:bg-zinc-100 border-zinc-400'
            }`}
            title={isSaved ? (isAr ? 'إلغاء حفظ المقال' : 'Remove Bookmark') : (isAr ? 'حفظ المقال' : 'Save Article')}
          >
            <Bookmark size={9} className={isSaved ? 'fill-current text-amber-600' : ''} />
            <span>{isSaved ? (isAr ? 'محفوظ' : 'Saved') : (isAr ? 'حفظ' : 'Save')}</span>
          </button>
        )}

        {/* Copy button */}
        <button
          onClick={handleShare}
          className="h-6 px-2 py-0.5 text-zinc-700 hover:text-black hover:bg-zinc-100 border border-zinc-400 rounded transition-all focus:outline-none cursor-pointer flex items-center justify-center gap-1 text-[9px] font-sans font-black bg-white"
          title={isAr ? 'نسخ الرابط' : 'Copy link'}
        >
          {copied ? <Check size={10} className="text-green-600 font-extrabold" /> : <Copy size={10} />}
          <span>{copied ? (isAr ? 'تم!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
        </button>

        {/* Native OS Share button */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleNativeShare}
            className="h-6 px-2 py-0.5 text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50 border border-indigo-400 rounded transition-all focus:outline-none cursor-pointer flex items-center justify-center gap-1 text-[9px] font-sans font-black bg-white"
            title={isAr ? 'مشاركة عبر النظام' : 'System Share'}
          >
            <Share2 size={10} className="text-indigo-600" />
            <span>{isAr ? 'نظام' : 'System'}</span>
          </button>
        )}
        
        {/* WhatsApp */}
        <button
          onClick={handleShareWhatsApp}
          className="h-6 w-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border border-zinc-400 rounded transition-all focus:outline-none cursor-pointer flex items-center justify-center bg-white"
          title={isAr ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008 0c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.512 5.281 3.51 8.487-.005 6.657-5.34 11.997-11.953 12.003-2.005-.001-3.973-.501-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436-.005 9.858-4.427 9.862-9.864.002-2.63-1.023-5.102-2.89-6.97C16.576 1.899 14.102 1.071 12.004 1.07 6.573 1.075 2.149 5.497 2.146 10.93.141 12.616.637 14.215 1.588 15.8l-.999 3.648 3.734-.979z"/>
          </svg>
        </button>

        {/* Twitter */}
        <button
          onClick={handleShareTwitter}
          className="h-6 w-6 text-zinc-800 hover:text-black hover:bg-zinc-100 border border-zinc-400 rounded transition-all focus:outline-none cursor-pointer flex items-center justify-center bg-white"
          title={isAr ? 'مشاركة عبر إكس' : 'Share on X'}
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.16l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>

        {/* Facebook */}
        <button
          onClick={handleShareFacebook}
          className="h-6 w-6 text-blue-700 hover:text-blue-800 hover:bg-blue-50 border border-zinc-400 rounded transition-all focus:outline-none cursor-pointer flex items-center justify-center bg-white"
          title={isAr ? 'مشاركة عبر فيسبوك' : 'Share on Facebook'}
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>
      </div>
    );
  };

  const title = isAr ? article.titleAr : article.titleEn;
  const summary = isAr ? article.summaryAr : article.summaryEn;
  const authorName = isAr ? (article.author?.nameAr || '') : (article.author?.nameEn || '');
  const authorTitle = isAr ? (article.author?.titleAr || '') : (article.author?.titleEn || '');

  // Helper to count words
  const countWords = (text: string) => {
    if (!text) return 0;
    const clean = text.trim().replace(/\s+/g, ' ');
    return clean ? clean.split(' ').length : 0;
  };

  // Determine dynamic read time based on estimated word count of the summary and content
  const contentText = isAr ? article.contentAr : article.contentEn;
  const summaryText = isAr ? article.summaryAr : article.summaryEn;
  const wordCount = countWords(summaryText) + countWords(contentText);
  
  // WPM based on language (average 130 WPM for Arabic, 200 WPM for English)
  const wpm = isAr ? 130 : 200;
  const calculatedMinutes = Math.max(1, Math.ceil(wordCount / wpm));
  
  const dynamicReadTime = isAr 
    ? `${calculatedMinutes} دقائق قراءة` 
    : `${calculatedMinutes} min read`;

  // Custom Category translator for labels
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'fifa-2026': return isAr ? 'فيفا 2026' : 'FIFA 2026';
      case 'exclusives': return isAr ? 'التحقيقات الصحفية' : 'Investigations';
      case 'editor-desk': return isAr ? 'من رئيس التحرير' : "From Editor";
      case 'lebanon': return isAr ? 'أخبار لبنان' : 'Lebanon News';
      case 'instats': return isAr ? 'إحصاءات' : 'In Stats';
      case 'middle-east': return isAr ? 'شؤون الشرق الأوسط' : 'Middle East Core';
      case 'markets': return isAr ? 'أسواق المال' : 'Markets';
      case 'telecom-internet': return isAr ? 'الاتصالات والإنترنت' : 'Telecom & Internet';
      case 'research-reports': return isAr ? 'أبحاث ودراسات' : 'Research & Reports';
      case 'sports': return isAr ? 'رياضة' : 'Sports';
      case 'wellness-lifestyle': return isAr ? 'الصحة' : 'Health';
      default: return isAr ? 'خبر عام' : 'General News';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(article);
  };

  const renderMetadataSection = () => {
    const excerpt = isAr 
      ? (article.excerptAr || article.summaryAr) 
      : (article.excerptEn || article.summaryEn);
      
    // Find related articles (excluding current article) from INITIAL_ARTICLES
    const relatedArticles = INITIAL_ARTICLES.filter(
      (art) => art.id !== article.id && 
              (art.category === article.category || 
               (art.tags && article.tags && art.tags.some(t => article.tags.includes(t))))
    ).slice(0, 1);

    return (
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="mt-3 p-3 bg-zinc-50 border border-zinc-200 font-sans space-y-2 text-right rtl:text-right ltr:text-left text-xs rounded select-none"
      >
        {/* Excerpt Summary */}
        <div className="space-y-1">
          <span className="text-[8px] font-mono font-extrabold text-zinc-400 block uppercase tracking-wider">
            {isAr ? '● المقتطف والملخص' : '● EXCERPT SUMMARY'}
          </span>
          <p className="text-[10px] text-zinc-850 italic leading-normal font-medium line-clamp-2">
            {excerpt}
          </p>
        </div>

        {/* Story Topic / Hashtags */}
        {article.tags && article.tags.length > 0 && (
          <div className="space-y-1">
            <span className="text-[8px] font-mono font-extrabold text-[#b91c1c] block uppercase tracking-wider">
              {isAr ? '# الأوسمة والمواضيع:' : '# TOPIC HASHTAGS:'}
            </span>
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => onTagClick?.(tag, e)}
                  className="text-[#b91c1c] hover:text-black font-mono text-[9px] font-black transition-colors cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Related post links */}
        {relatedArticles.length > 0 && (
          <div className="space-y-1 pt-1.5 border-t border-zinc-200">
            <span className="text-[8px] font-mono font-extrabold text-zinc-400 block uppercase tracking-wider">
              {isAr ? '🔗 مقال متصل بالخبر:' : '🔗 RELATED POST:'}
            </span>
            {relatedArticles.map((rArt) => {
              const rTitle = isAr ? rArt.titleAr : rArt.titleEn;
              return (
                <button
                  key={rArt.id}
                  onClick={() => onSelect(rArt)}
                  className="block text-right rtl:text-right ltr:text-left text-[9px] font-sans font-bold text-zinc-650 hover:text-[#b91c1c] transition-colors cursor-pointer truncate w-full"
                >
                  • {rTitle}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const articleId = `article-card-${article.id}`;

  // 1. LEAD SPOTLIGHT
  if (variant === 'lead') {
    return (
      <article
        id={articleId}
        onClick={handleClick}
        className={`group cursor-pointer transition-all duration-300 block overflow-hidden p-5 ${
          isPrint
            ? 'bg-transparent border-4 border-black border-double pb-6 mb-6'
            : 'bg-white rounded-lg border-2 border-black hover:bg-zinc-50'
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {!isInvestigative && !shouldHideImage && (
            <div className="lg:w-7/12 relative overflow-hidden">
              <img
                src={article.imageUrl}
                alt={title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-[280px] md:h-[350px] object-cover bw-image border border-black transition-opacity duration-300"
              />
              {article.isBreaking && (
                <span className="absolute top-4 right-4 bg-black text-white text-[10px] font-black uppercase px-2 py-1 tracking-wider border border-white font-sans">
                  {isAr ? 'عاجل عاجل' : 'Breaking Cable'}
                </span>
              )}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 select-none font-sans">
                <span className="bg-black text-white text-[9px] font-bold uppercase px-2.5 py-0.5 border border-white">
                  {getCategoryLabel(article.category)}
                </span>
                <span className="bg-black text-white text-[9px] font-mono font-bold px-2 py-0.5 border border-white flex items-center gap-1">
                  <Clock size={9} />
                  {dynamicReadTime}
                </span>
              </div>
            </div>
          )}

          <div className={`${(isInvestigative || hideImage) ? 'lg:w-full' : 'lg:w-5/12'} flex flex-col justify-center px-2 lg:px-0`}>
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 mb-3 font-sans font-bold uppercase">
              {article.category !== 'editor-desk' && (
                <>
                  <span className="text-black underline">{authorName}</span>
                  <span>•</span>
                </>
              )}
              <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 text-[9px] font-mono font-black border border-zinc-300 px-1.5 py-0.5 rounded">
                <Clock size={9} />
                {dynamicReadTime}
              </span>
            </div>

            <h3
              className={`text-black font-black tracking-tight leading-tight transition-colors group-hover:text-zinc-650 font-sans text-xl md:text-2xl lg:text-3xl`}
            >
              {title}
            </h3>

            {/* Render excerpt directly below headline */}
            <div className="mt-2.5 p-3 bg-red-50/45 rounded-md border-r-4 border-[#b91c1c] text-right rtl:text-right ltr:text-left">
              <span className="text-[9px] font-mono font-black text-[#b91c1c] block uppercase tracking-wider mb-1 select-none">
                {isAr ? '● مقتطف رئيسي' : '● EXCERPT'}
              </span>
              <p className="text-xs md:text-sm text-neutral-900 font-sans italic font-bold select-text">
                {article.excerpt || (isAr ? (article.excerptAr || article.summaryAr) : (article.excerptEn || article.summaryEn))}
              </p>
            </div>

            {/* New Hashtag Bar containing links to filtered views */}
            {(article.hashtags || article.tags) && (article.hashtags || article.tags)!.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5 select-none items-center">
                <span className="text-[10px] font-mono font-extrabold text-zinc-500 uppercase">
                  {isAr ? 'أوسمة متصلة:' : 'HASHTAGS:'}
                </span>
                {(article.hashtags || article.tags)!.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagClick?.(tag, e);
                    }}
                    className="bg-[#b91c1c]/5 hover:bg-[#b91c1c]/10 text-[#b91c1c] hover:text-black font-mono text-[10px] font-black px-2 py-0.5 rounded transition-all cursor-pointer border border-[#b91c1c]/10"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            <p className="mt-3 text-zinc-700 text-xs md:text-sm leading-relaxed font-sans line-clamp-3 font-medium">
              {summary}
            </p>
            {renderMetadataSection()}

            <div className="mt-5 pt-4 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <div className="flex items-center gap-3">
                <span className="font-bold">
                  {article.views.toLocaleString()} {isAr ? 'قارئ مطالع' : 'reads'}
                </span>
                {renderSocialShareButtons()}
              </div>
              <span className="text-black font-black underline inline-flex items-center gap-1 group-hover:no-underline">
                {isAr ? 'مطالعة السند الكامل' : 'Read Full Log'}
                {isAr ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 2. STANDARD CARD (Slick for Pinterest-style layout blocks)
  if (variant === 'standard') {
    return (
      <article
        id={articleId}
        onClick={handleClick}
        className={`group cursor-pointer transition-all duration-300 flex flex-col overflow-hidden p-4 ${
          isPrint
            ? 'bg-transparent border border-black pb-5 mb-2'
            : 'bg-white rounded-md border-2 border-black h-full hover:bg-zinc-50'
        }`}
      >
        {!isInvestigative && !shouldHideImage && (
          <div className="relative overflow-hidden aspect-video border-b border-black">
            <img
              src={article.imageUrl}
              alt={title}
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80";
              }}
              className="w-full h-full object-cover bw-image transition-opacity duration-300"
            />
            <span className="absolute bottom-2 right-2 bg-black text-white text-[9px] font-black px-2 py-0.5 font-sans border-t border-l border-white">
              {getCategoryLabel(article.category)}
            </span>
            <span className="absolute bottom-2 left-2 bg-black text-white text-[9px] font-mono font-bold px-1.5 py-0.5 border border-white flex items-center gap-1">
              <Clock size={8} />
              {dynamicReadTime}
            </span>
          </div>
        )}

        <div className="flex-1 flex flex-col pt-3">
          <div className="flex items-center gap-2 text-[9px] text-zinc-500 mb-2 font-sans font-extrabold uppercase">
            {article.category !== 'editor-desk' && (
              <>
                <span className="text-black">{authorName}</span>
                <span>•</span>
              </>
            )}
            <span className="inline-flex items-center gap-0.5 text-zinc-650">
              <Clock size={9} />
              {dynamicReadTime}
            </span>
          </div>

          <h4
            className={`text-black group-hover:text-zinc-650 transition-colors font-sans text-sm md:text-base font-black leading-snug line-clamp-3`}
          >
            {title}
          </h4>

          {/* Render excerpt directly below headline */}
          <div className="mt-2 p-2.5 bg-red-50/45 rounded border-r-2 border-[#b91c1c] text-right rtl:text-right ltr:text-left">
            <p className="text-[11px] text-neutral-900 font-sans italic font-bold select-text leading-relaxed">
              {article.excerpt || (isAr ? (article.excerptAr || article.summaryAr) : (article.excerptEn || article.summaryEn))}
            </p>
          </div>

          {/* New Hashtag Bar containing links to filtered views */}
          {(article.hashtags || article.tags) && (article.hashtags || article.tags)!.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1 select-none items-center">
              {(article.hashtags || article.tags)!.map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagClick?.(tag, e);
                  }}
                  className="bg-[#b91c1c]/5 hover:bg-[#b91c1c]/10 text-[#b91c1c] hover:text-black font-mono text-[9px] font-black px-1.5 py-0.5 rounded transition-all cursor-pointer border border-[#b91c1c]/10"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          <p className="mt-2 text-zinc-650 text-xs leading-relaxed line-clamp-4 font-sans font-medium flex-1">
            {summary}
          </p>
          {renderMetadataSection()}

          <div className="mt-4 pt-2.5 border-t border-zinc-150 flex justify-between items-center text-[9px] text-zinc-400 font-mono font-bold">
            <div className="flex items-center gap-2">
              <span>{article.date}</span>
              <span>•</span>
              {renderSocialShareButtons()}
            </div>
            <span className="flex items-center gap-1 font-black text-black underline">
              {isAr ? 'مطالعة الفكر' : 'Brief'}
              {isAr ? <ArrowLeft size={9} /> : <ArrowRight size={9} />}
            </span>
          </div>
        </div>
      </article>
    );
  }

  // 3. OPINION WRITERS CARD (Slick circular highlight or square print variant)
  if (variant === 'opinion') {
    return (
      <article
        id={articleId}
        onClick={handleClick}
        className={`group cursor-pointer transition-all duration-300 relative text-center flex flex-col items-center justify-between p-5 h-full ${
          isPrint
            ? 'bg-transparent border border-black border-dashed rounded-none'
            : 'bg-zinc-50 hover:bg-zinc-100 rounded-md border-2 border-black'
        }`}
      >
        <div className="flex flex-col items-center flex-grow w-full pt-2">
          <div className="flex items-center gap-1 mt-1 text-[9px] text-black font-mono font-bold bg-zinc-200 border border-zinc-300 px-1.5 py-0.5">
            <Clock size={8} />
            <span>{dynamicReadTime}</span>
          </div>

          <div className="w-8 h-0.5 bg-black my-2.5"></div>

          <h4
            className={`text-black group-hover:text-zinc-600 transition-colors font-sans font-black text-xs md:text-sm leading-snug line-clamp-3 text-center mb-2`}
          >
            "{title}"
          </h4>

          {/* Render excerpt directly below headline */}
          <div className="mt-1.5 p-2 bg-red-50/45 rounded border-r-2 border-[#b91c1c] text-center w-full">
            <p className="text-[10px] text-neutral-950 font-sans italic font-bold select-text leading-relaxed">
              {article.excerpt || (isAr ? (article.excerptAr || article.summaryAr) : (article.excerptEn || article.summaryEn))}
            </p>
          </div>

          {/* New Hashtag Bar containing links to filtered views */}
          {(article.hashtags || article.tags) && (article.hashtags || article.tags)!.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1 select-none items-center justify-center w-full">
              {(article.hashtags || article.tags)!.map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagClick?.(tag, e);
                  }}
                  className="bg-[#b91c1c]/5 hover:bg-[#b91c1c]/10 text-[#b91c1c] hover:text-black font-mono text-[8px] font-black px-1.5 py-0.5 rounded transition-all cursor-pointer border border-[#b91c1c]/10"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-zinc-650 text-[11px] leading-relaxed line-clamp-2 italic max-w-sm font-sans mb-3 font-medium">
          {summary}
        </p>
        {renderMetadataSection()}

        <div className="flex items-center gap-3 mt-1 select-none flex-wrap justify-center">
          <span className="text-[9px] uppercase font-bold text-black underline font-mono group-hover:no-underline">
            {isAr ? 'مسودة المحرر الكاملة' : 'Read Full Opinion'}
          </span>
          {renderSocialShareButtons()}
        </div>
      </article>
    );
  }

  // 4. MINIMAL LIST RENDERER
  const displayIndex = typeof index === 'number' ? index + 1 : undefined;

  return (
    <div
      id={articleId}
      onClick={handleClick}
      className={`group cursor-pointer py-3.5 transition-all flex gap-3 border-b items-start ${
        isPrint ? 'border-zinc-350' : 'border-zinc-200 hover:bg-zinc-50'
      }`}
    >
      {displayIndex !== undefined ? (
        <span className="text-xl font-sans text-black font-black shrink-0 leading-none group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform select-none">
          {displayIndex}
        </span>
      ) : (
        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-black mt-1.5 transition-colors"></div>
      )}
      
      <div className="flex-1 w-full overflow-hidden">
        <span className="text-[8px] text-zinc-500 font-black tracking-widest uppercase font-mono mb-1 block">
          {getCategoryLabel(article.category)}
        </span>
        <h5 className="text-black group-hover:text-zinc-600 transition-colors font-sans text-xs md:text-sm font-black leading-tight">
          {title}
        </h5>

        {/* Render excerpt directly below headline */}
        <p className="mt-1 text-zinc-700 text-[10px] leading-relaxed font-sans italic font-bold select-text">
          {article.excerpt || (isAr ? (article.excerptAr || article.summaryAr) : (article.excerptEn || article.summaryEn))}
        </p>

        {/* New Hashtag Bar containing links to filtered views */}
        {(article.hashtags || article.tags) && (article.hashtags || article.tags)!.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1 select-none items-center">
            {(article.hashtags || article.tags)!.slice(0, 3).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick?.(tag, e);
                }}
                className="bg-[#b91c1c]/5 hover:bg-[#b91c1c]/10 text-[#b91c1c] hover:text-black font-mono text-[8px] font-black px-1 rounded transition-all cursor-pointer border border-[#b91c1c]/10"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mt-1.5 text-[9px] text-zinc-500 font-mono font-bold">
          <span className="inline-flex items-center gap-0.5 bg-zinc-100 text-black border border-zinc-300 px-1 py-0.5">
            <Clock size={8} />
            {dynamicReadTime}
          </span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          {renderSocialShareButtons()}
        </div>
      </div>
    </div>
  );
}
