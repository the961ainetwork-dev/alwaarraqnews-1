import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Volume2, Type, Sparkles, BookOpen, Languages, Shield, ChevronLeft, ChevronRight, Play, Square, Lock, CreditCard, Share2, Send, Check, Link, Facebook, Twitter, Linkedin, ArrowRight, Tag, BookMarked, ExternalLink, Globe, Award, Download } from 'lucide-react';
import { Article, LayoutMode } from '../types';
import { INITIAL_ARTICLES } from '../data';
import SEOMetadataManager from './SEOMetadataManager';
import { SEO_SILOS, getAuthorProfile, AuthorProfile } from '../seoData';
import AliAlTaherMap from './AliAlTaherMap';
import LebanonConflictMap from './LebanonConflictMap';
import { SolidereStockInfographic } from './SolidereStockInfographic';
import { FifaPolymarketInfographic } from './FifaPolymarketInfographic';
import { FrameworkAgreementInfographic } from './FrameworkAgreementInfographic';
import { SolidereInfographic } from './SolidereInfographic';
import RiskSimulationSandbox from './RiskSimulationSandbox';
import ContextualDossier from './ContextualDossier';

interface ArticleViewerProps {
  article: Article;
  layoutMode: LayoutMode;
  language: 'ar' | 'en';
  currentUser: { email: string; username: string; role: 'reader' | 'admin'; isPremiumSubscriber?: boolean } | null;
  onClose: () => void;
  onAuthClick: () => void;
  onSubscribeClick: () => void;
  allArticles?: Article[];
  onSelectArticle?: (article: Article) => void;
  savedArticleIds?: string[];
  onToggleSaveMultipleArticles?: (articles: Article[], save: boolean) => void;
  onTagClick?: (tag: string, e: React.MouseEvent) => void;
}

export default function ArticleViewer({
  article,
  layoutMode,
  language,
  currentUser,
  onClose,
  onAuthClick,
  onSubscribeClick,
  allArticles,
  onSelectArticle,
  savedArticleIds = [],
  onToggleSaveMultipleArticles,
  onTagClick,
}: ArticleViewerProps) {
  const isAr = language === 'ar';
  const isPrint = layoutMode === 'classic-print';

  // State managers
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');

  const handleDecreaseFontSize = () => {
    if (fontSize === 'xl') setFontSize('lg');
    else if (fontSize === 'lg') setFontSize('base');
    else if (fontSize === 'base') setFontSize('sm');
  };

  const handleIncreaseFontSize = () => {
    if (fontSize === 'sm') setFontSize('base');
    else if (fontSize === 'base') setFontSize('lg');
    else if (fontSize === 'lg') setFontSize('xl');
  };
  const [activeLang, setActiveLang] = useState<'ar' | 'en'>(language);
  const [aiSummary, setAiSummary] = useState<{ ar: string; en: string } | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<{ ar: string; en: string } | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [isPlayingContent, setIsPlayingContent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [ctaEmail, setCtaEmail] = useState('');
  const [ctaSuccess, setCtaSuccess] = useState(false);
  const [activeAuthorProfile, setActiveAuthorProfile] = useState<AuthorProfile | null>(null);

  const isPremiumLocked = article.isPremium && (!currentUser || (currentUser.role !== 'admin' && !currentUser.isPremiumSubscriber));

  // Content bindings
  const title = activeLang === 'ar' ? article.titleAr : article.titleEn;
  const summary = activeLang === 'ar' ? article.summaryAr : article.summaryEn;
  const content = activeLang === 'ar' ? article.contentAr : article.contentEn;
  const authorName = activeLang === 'ar' ? (article.author?.nameAr || '') : (article.author?.nameEn || '');
  const authorTitle = activeLang === 'ar' ? (article.author?.titleAr || '') : (article.author?.titleEn || '');
  // Calculate dynamic reading time based on content length using a standard words-per-minute estimation
  const calculatedReadTime = (() => {
    if (!content) return activeLang === 'ar' ? 'دقيقة واحدة للقراءة' : '1 min read';
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const wpm = activeLang === 'ar' ? 150 : 200;
    const minutes = Math.max(1, Math.ceil(words / wpm));
    if (activeLang === 'ar') {
      if (minutes === 1) return 'دقيقة واحدة للقراءة';
      if (minutes === 2) return 'دقيقتان للقراءة';
      if (minutes >= 3 && minutes <= 10) return `${minutes} دقائق للقراءة`;
      return `${minutes} دقيقة للقراءة`;
    }
    return `${minutes} min read`;
  })();

  const readTime = calculatedReadTime;

  // Dynamic Head meta tags & NewsArticle schema JSON-LD generation
  useEffect(() => {
    if (!article) return;

    const siteName = 'الورّاق Al-Warraq';
    const isArLang = activeLang === 'ar';
    const pageTitle = `${title} | ${siteName}`;
    
    // Update document title
    const prevTitle = document.title;
    document.title = pageTitle.length > 60 ? pageTitle.substring(0, 57) + '...' : pageTitle;

    // Track original states for safe cleanup on drawer unmount
    const updatedTags: { attributeName: 'name' | 'property'; attributeValue: string; originalValue: string | null }[] = [];

    const updateOrTrackMeta = (attributeName: 'name' | 'property', attributeValue: string, contentValue: string) => {
      const element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      const originalValue = element ? element.getAttribute('content') : null;
      updatedTags.push({ attributeName, attributeValue, originalValue });
      
      let metaElem = element;
      if (!metaElem) {
        metaElem = document.createElement('meta');
        metaElem.setAttribute(attributeName, attributeValue);
        document.head.appendChild(metaElem);
      }
      metaElem.setAttribute('content', contentValue || '');
    };

    // Description & Open Graph tags
    const descText = summary.length > 155 ? summary.substring(0, 152) + '...' : summary;
    updateOrTrackMeta('name', 'description', descText);
    updateOrTrackMeta('property', 'og:title', title);
    updateOrTrackMeta('property', 'og:description', summary);
    updateOrTrackMeta('property', 'og:image', article.imageUrl);
    updateOrTrackMeta('property', 'og:type', 'article');
    updateOrTrackMeta('property', 'og:url', `https://alwarraqnews.com/article/${article.id}`);
    updateOrTrackMeta('name', 'twitter:card', 'summary_large_image');
    
    // Schema JSON-LD
    const profile = getAuthorProfile(article.author?.nameEn || '', article.author?.nameAr || '');
    const isoDate = '2026-06-18T08:00:00Z'; 
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `https://alwarraqnews.com/article/${article.id}`
      },
      'headline': title,
      'image': [article.imageUrl],
      'datePublished': isoDate,
      'dateModified': isoDate,
      'author': [
        {
          '@type': 'Person',
          'name': authorName,
          'jobTitle': isArLang ? profile.titleAr : profile.titleEn,
          'sameAs': `https://alwarraqnews.com/author/${profile.id}`
        }
      ],
      'publisher': {
        '@type': 'Organization',
        'name': siteName,
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://alwarraqnews.com/logo_al_warraq.png'
        }
      },
      'description': summary
    };

    // Inject JSON-LD to DOM head
    const oldScript = document.getElementById('article-viewer-jsonld');
    if (oldScript) oldScript.remove();
    
    const script = document.createElement('script');
    script.id = 'article-viewer-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      // Revert title on close
      document.title = prevTitle;
      
      // Clean up injected/updated tags
      for (const tag of updatedTags) {
        const element = document.querySelector(`meta[${tag.attributeName}="${tag.attributeValue}"]`);
        if (element) {
          if (tag.originalValue !== null) {
            element.setAttribute('content', tag.originalValue);
          } else {
            element.remove();
          }
        }
      }

      // Cleanup JSON-LD script from DOM
      const activeScript = document.getElementById('article-viewer-jsonld');
      if (activeScript) activeScript.remove();
    };
  }, [article, activeLang, title, summary]);

  // Font size mapping
  const fontClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-sm';
      case 'lg': return 'text-lg md:text-xl';
      case 'xl': return 'text-xl md:text-2xl';
      default: return 'text-base md:text-lg';
    }
  };

  // 1. Text-To-Speech SpeechSynthesis
  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingContent(false);
  };

  const handleSpeak = () => {
    if (isPremiumLocked) {
      alert(isAr ? 'عذراً، الاستماع الصوتي للمقالات الخاصة متاح لمشتركي العضوية الفاخرة فقط.' : 'Audio narration is restricted to Premium Patrons only.');
      return;
    }
    if (!('speechSynthesis' in window)) {
      alert(isAr ? 'متصفحك لا يدعم قراءة النصوص صوتياً.' : 'Your browser does not support text-to-speech synthesis.');
      return;
    }

    if (isPlayingContent) {
      stopAudio();
      return;
    }

    try {
      // Clean text
      const speechText = `${title}. ${summary}. ${content.replace(/\n/g, ' ')}`;
      const utterance = new SpeechSynthesisUtterance(speechText);
      
      // Choose appropriate voice language
      utterance.lang = activeLang === 'ar' ? 'ar-SA' : 'en-US';
      
      // Attempt to select a native voice
      const voices = window.speechSynthesis.getVoices();
      const desiredVoice = voices.find(v => v.lang.startsWith(activeLang === 'ar' ? 'ar' : 'en'));
      if (desiredVoice) {
        utterance.voice = desiredVoice;
      }

      utterance.onend = () => {
        setIsPlayingContent(false);
      };
      utterance.onerror = () => {
        setIsPlayingContent(false);
      };

      setIsPlayingContent(true);
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("SpeechSynthesis error:", error);
      setIsPlayingContent(false);
    }
  };

  // 2. Fetch AI Summary from our Express custom endpoint
  const handleFetchSummary = async () => {
    if (isPremiumLocked) {
      alert(isAr ? 'عذراً، التلخيص الآلي للمقالات الخاصة متاح لمشتركي العضوية الفاخرة فقط.' : 'AI executive summary services are restricted to Premium Patrons only.');
      return;
    }
    if (aiSummary) return; // already loaded
    setLoadingSummary(true);
    try {
      const response = await fetch('/api/news/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleAr: article.titleAr,
          contentAr: article.contentAr,
          type: 'summary'
        })
      });
      const data = await response.json();
      setAiSummary({
        ar: data.summaryAr,
        en: data.summaryEn
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSummary(false);
    }
  };

  // 3. Fetch Political Grounding Supplement
  const handleFetchAnalysis = async () => {
    if (isPremiumLocked) {
      alert(isAr ? 'عذراً، التحليل المتقدم للمقالات الخاصة متاح لمشتركي العضوية الفاخرة فقط.' : 'Strategic AI forecasting is restricted to Premium Patrons only.');
      return;
    }
    if (aiAnalysis) return;
    setLoadingAnalysis(true);
    try {
      const response = await fetch('/api/news/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleAr: article.titleAr,
          contentAr: article.contentAr,
          type: 'analysis'
        })
      });
      const data = await response.json();
      setAiAnalysis({
        ar: data.analysisAr,
        en: data.analysisEn
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  // Toggle Translation
  const handleLanguageToggle = () => {
    setActiveLang((curr) => (curr === 'ar' ? 'en' : 'ar'));
  };

  const shareUrl = `https://www.alwarraqnews.com/?article=${article.id}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => {
        setCopiedLink(false);
      }, 2000);
    }).catch(err => {
      console.error('Could not copy link', err);
    });
  };

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ctaEmail.trim()) {
      const stored = localStorage.getItem('alwarraq_subscribers');
      if (stored) {
        try {
          const list = JSON.parse(stored);
          if (Array.isArray(list) && !list.includes(ctaEmail)) {
            list.push(ctaEmail);
            localStorage.setItem('alwarraq_subscribers', JSON.stringify(list));
          }
        } catch (err) {}
      }
      setCtaSuccess(true);
      setCtaEmail('');
    }
  };

  const articlesList = allArticles || INITIAL_ARTICLES;

  const primaryTag = article.tags && article.tags.length > 0 ? article.tags[0] : null;

  // Find Arabic translation of main tag for localized title
  const primaryTagAr = (() => {
    if (!primaryTag) return '';
    for (const silo of SEO_SILOS) {
      const found = silo.tags.find((tag: any) => tag.nameEn === primaryTag);
      if (found) return found.nameAr;
    }
    return '';
  })();
  const tagLabel = isAr && primaryTagAr ? primaryTagAr : primaryTag;

  // Filter the current article list to show articles sharing the same primary tag
  const recommendedForYou = (() => {
    if (!primaryTag) return [];
    return articlesList.filter(art => 
      art.id !== article.id && 
      art.tags && 
      art.tags.includes(primaryTag)
    ).slice(0, 3);
  })();

  const handleSelectRelated = (art: Article) => {
    stopAudio();
    if (onSelectArticle) {
      onSelectArticle(art);
    }
    const container = document.getElementById('reader-drawer');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const parseAndRenderContent = (text: string) => {
    if (!text) return null;
    
    // Sort other articles by title length descending to prevent partial match conflicts
    const sortedOthers = [...articlesList]
      .filter(art => art.id !== article.id)
      .sort((a, b) => {
        const titleA = activeLang === 'ar' ? a.titleAr : a.titleEn;
        const titleB = activeLang === 'ar' ? b.titleAr : b.titleEn;
        return titleB.length - titleA.length;
      });

    let parts: Array<{ type: 'text' | 'link'; content: string; article?: Article }> = [{ type: 'text', content: text }];

    for (const otherArt of sortedOthers) {
      const otherTitle = activeLang === 'ar' ? otherArt.titleAr : otherArt.titleEn;
      if (!otherTitle || otherTitle.length < 5) continue;

      const newParts: typeof parts = [];
      for (const part of parts) {
        if (part.type === 'link') {
          newParts.push(part);
          continue;
        }

        const occurrences = part.content.split(otherTitle);
        if (occurrences.length > 1) {
          for (let i = 0; i < occurrences.length; i++) {
            if (occurrences[i]) {
              newParts.push({ type: 'text', content: occurrences[i] });
            }
            if (i < occurrences.length - 1) {
              newParts.push({ type: 'link', content: otherTitle, article: otherArt });
            }
          }
        } else {
          newParts.push(part);
        }
      }
      parts = newParts;
    }

    return (
      <div className="leading-relaxed whitespace-pre-line select-text">
        {parts.map((part, idx) => {
          if (part.type === 'link' && part.article) {
            const linkedArt = part.article;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectRelated(linkedArt)}
                className="text-[#b91c1c] underline hover:text-black font-semibold mx-1 inline-flex items-center gap-0.5 border-b border-dashed border-[#b91c1c] cursor-pointer transition-colors"
                title={`${isAr ? 'قراءة التحقيق الكامل:' : 'Read Related Exclusive Report:'} ${activeLang === 'ar' ? linkedArt.titleAr : linkedArt.titleEn}`}
              >
                <span>{part.content}</span>
                <ExternalLink size={10} className="inline opacity-80" />
              </button>
            );
          }
          return <span key={idx}>{part.content}</span>;
        })}
      </div>
    );
  };

  return (
    <>
      <SEOMetadataManager article={article} language={activeLang} />
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="ArticleViewer fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 md:p-8 cursor-default"
      dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
      onClick={() => { stopAudio(); onClose(); }}
    >
      {/* Centered Modal Container Panel */}
      <motion.div 
        id="reader-drawer"
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()} 
        className={`w-full max-w-4xl max-h-[92vh] rounded-md shadow-2xl flex flex-col overflow-hidden border border-zinc-350 ${
          isPrint ? 'bg-[#fbf9f4] text-[#1b2b1d]' : 'bg-white text-gray-900'
        }`}
      >
        {/* Top Sticky bar for controlling viewer config */}
        <div className={`border-b py-3 px-5 flex items-center justify-between font-sans text-xs shrink-0 select-none ${
          isPrint ? 'bg-[#fbf9f4] border-[#1b2b1d]/20 text-[#1b2b1d]' : 'bg-white border-gray-200/90 text-gray-950'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { stopAudio(); onClose(); }}
              id="btn-close-reader"
              className="p-1 px-3 rounded-md hover:bg-gray-100 flex items-center gap-1 font-semibold text-gray-500 cursor-pointer"
              title={activeLang === 'ar' ? 'إغلاق القارئ' : 'Close Reader'}
            >
              <X size={15} />
              <span>{activeLang === 'ar' ? 'الرجوع للصحيفة' : 'Back to News'}</span>
            </button>
            <span className="text-gray-300">|</span>
            <div className="flex bg-gray-150 rounded-sm p-0.5 items-center gap-1 border border-zinc-200">
              <button 
                onClick={handleDecreaseFontSize} 
                disabled={fontSize === 'sm'}
                className={`px-2 py-0.5 rounded-xs font-black transition-all cursor-pointer ${
                  fontSize === 'sm' 
                    ? 'text-gray-300 cursor-not-allowed opacity-50' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                title={activeLang === 'ar' ? 'تصغير الخط A-' : 'Decrease Font Size A-'}
              >A-</button>
              
              <span className="text-[10px] text-gray-500 font-mono px-1 select-none font-bold uppercase">
                {fontSize}
              </span>

              <button 
                onClick={handleIncreaseFontSize} 
                disabled={fontSize === 'xl'}
                className={`px-2 py-0.5 rounded-xs font-black transition-all cursor-pointer ${
                  fontSize === 'xl' 
                    ? 'text-gray-300 cursor-not-allowed opacity-50' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                title={activeLang === 'ar' ? 'تكبير الخط A+' : 'Increase Font Size A+'}
              >A+</button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio narration button */}
            <button
              onClick={handleSpeak}
              id="btn-narrate-story"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                isPlayingContent 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              {isPlayingContent ? <Square size={13} className="animate-bounce" /> : <Play size={13} />}
              <span>{isPlayingContent ? (activeLang === 'ar' ? 'إيقاف الاستماع' : 'Stop Narration') : (activeLang === 'ar' ? 'استمع للمقال' : 'Listen to Report')}</span>
            </button>

            {/* Translation switch inside reader */}
            <button
              onClick={handleLanguageToggle}
              id="btn-reader-translation"
              className="flex items-center gap-1 bg-accent/10 border border-accent/20 hover:bg-accent/20 text-accent px-3 py-1.5 rounded-md text-xs cursor-pointer"
            >
              <Languages size={13} />
              <span>{activeLang === 'ar' ? 'English Translation' : 'الترجمة العربية'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Article Content Box */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 font-sans">
          {activeAuthorProfile ? (
            <div className="max-w-3xl mx-auto space-y-8 animate-fade-in text-gray-900 border-2 border-black p-6 md:p-8 bg-zinc-50 shadow-[4px_4px_0_0_#1b1c1e]">
              {/* Header Navigation link */}
              <div className="flex items-center justify-between border-b border-black pb-4">
                <button
                  type="button"
                  onClick={() => setActiveAuthorProfile(null)}
                  className="flex items-center gap-1.5 bg-black hover:bg-zinc-800 text-white text-xxs font-extrabold px-3 py-1.5 font-mono uppercase cursor-pointer transition-all duration-150"
                >
                  <ChevronLeft size={12} />
                  {isAr ? 'العودة للمادة الصحفية' : 'Return to Dispatch Report'}
                </button>
                <span className="font-mono text-[9px] font-bold text-[#b91c1c] uppercase tracking-wider flex items-center gap-1 select-none">
                  <Shield size={12} className="text-[#b91c1c]" />
                  {isAr ? 'التحقق الثنائي للمقالات والخبرة' : 'E-E-A-T Verified Profile'}
                </span>
              </div>

              {/* Bio Header card */}
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-right md:rtl:text-right">
                <img
                  src={activeAuthorProfile.avatar}
                  alt={activeAuthorProfile.nameEn}
                  className="w-24 h-24 rounded-full object-cover border-2 border-black shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                  }}
                />
                <div className="space-y-2 flex-1">
                  <h3 className="font-sans font-black text-2xl text-zinc-900 border-b border-zinc-200 pb-1">
                    {activeLang === 'ar' ? activeAuthorProfile.nameAr : activeAuthorProfile.nameEn}
                  </h3>
                  <p className="font-mono text-[10px] font-bold text-[#b91c1c] uppercase tracking-wider">
                    {activeLang === 'ar' ? activeAuthorProfile.titleAr : activeAuthorProfile.titleEn}
                  </p>
                  <p className="text-xs text-zinc-700 leading-relaxed font-sans font-medium">
                    {activeLang === 'ar' ? activeAuthorProfile.bioAr : activeAuthorProfile.bioEn}
                  </p>
                </div>
              </div>

              {/* Credentials and Expertise (EEAT core values) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="border-2 border-black p-4 bg-white">
                  <h4 className="font-sans font-black text-xs uppercase text-zinc-950 pb-2 border-b-2 border-black flex items-center gap-1.5 select-none">
                    <Award size={14} className="text-[#b91c1c]" />
                    {isAr ? 'الخبرة والاعتمادات المهنية' : 'Expertise & Credentials'}
                  </h4>
                  <ul className="list-disc list-inside text-xxs text-zinc-600 space-y-2 pt-3 leading-relaxed font-sans font-medium">
                    {activeLang === 'ar' 
                      ? activeAuthorProfile.credentialsAr.map((cred, idx) => <li key={idx}>{cred}</li>)
                      : activeAuthorProfile.credentialsEn.map((cred, idx) => <li key={idx}>{cred}</li>)
                    }
                  </ul>
                </div>

                <div className="border-2 border-black p-4 bg-white flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-sans font-black text-xs uppercase text-zinc-950 pb-2 border-b-2 border-black flex items-center gap-1.5 select-none">
                      <Globe size={14} className="text-zinc-600" />
                      {isAr ? 'التحري والاتصال الآمن' : 'Compliance & Contacts'}
                    </h4>
                    <p className="text-[10px] text-zinc-500 leading-relaxed font-semibold">
                      {isAr 
                        ? 'إننا في مؤسسة الوراق نصادق ونبث من خلال لجان الفحص المهني. يمكنك الاتصال المباشر بالصحفي:' 
                        : 'Reporters are fully verified under absolute compliance with factual journalism standards.'}
                    </p>
                    <div className="space-y-1.5 pt-1.5 text-xxs font-mono">
                      {activeAuthorProfile.twitter && (
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-400">Twitter:</span>
                          <span className="text-black font-black hover:underline cursor-pointer">{activeAuthorProfile.twitter}</span>
                        </div>
                      )}
                      {activeAuthorProfile.linkedin && (
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-400">LinkedIn:</span>
                          <span className="text-black font-black hover:underline cursor-pointer">{activeAuthorProfile.linkedin}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Secure Mail:</span>
                        <a href={`mailto:${activeAuthorProfile.email}`} className="text-[#b91c1c] font-black hover:underline">{activeAuthorProfile.email}</a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-[#b91c1c]/10 p-2.5 border-2 border-[#b91c1c] text-center select-none">
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 font-black text-[#b91c1c] tracking-wider">Verified Under E-E-A-T Guild Rules</span>
                  </div>
                </div>
              </div>

              {/* All published articles list (Auto-linking) */}
              <div className="space-y-3.5 pt-3">
                <h4 className="font-sans font-black text-xs uppercase text-zinc-950 flex items-center gap-1.5 select-none border-b-2 border-black pb-2">
                  <BookMarked size={14} className="text-[#b91c1c]" />
                  {isAr 
                    ? `مجموع التقريرات والتحقيقات الصادرة بأقلامنا (${articlesList.filter(a => (a.author && a.author.nameEn === activeAuthorProfile.nameEn) || getAuthorProfile(a.author?.nameEn || '', a.author?.nameAr || '').id === activeAuthorProfile.id).length})` 
                    : `Dispatches & Investigation History (${articlesList.filter(a => (a.author && a.author.nameEn === activeAuthorProfile.nameEn) || getAuthorProfile(a.author?.nameEn || '', a.author?.nameAr || '').id === activeAuthorProfile.id).length} articles)`}
                </h4>
                <div className="space-y-3">
                  {articlesList
                    .filter(a => (a.author && a.author.nameEn === activeAuthorProfile.nameEn) || getAuthorProfile(a.author?.nameEn || '', a.author?.nameAr || '').id === activeAuthorProfile.id)
                    .map(art => {
                      const artTitle = activeLang === 'ar' ? art.titleAr : art.titleEn;
                      const artSummary = activeLang === 'ar' ? art.summaryAr : art.summaryEn;
                      return (
                        <div 
                          key={art.id} 
                          className="p-3 border-2 border-zinc-200 bg-white hover:border-[#b91c1c] active:border-black transition-all cursor-pointer space-y-1.5 shadow-[2px_2px_0_0_#eaeaea] hover:shadow-[4px_4px_0_0_#eaeaea]"
                          onClick={() => {
                            stopAudio();
                            setActiveAuthorProfile(null);
                            if (onSelectArticle) onSelectArticle(art);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] bg-zinc-100 text-zinc-700 font-extrabold px-1.5 py-0.5 uppercase tracking-wider">
                              {art.category}
                            </span>
                            <span className="text-[9px] font-mono text-zinc-400">{art.date}</span>
                          </div>
                          <h5 className="font-sans font-black text-xs text-zinc-950 hover:text-[#b91c1c] leading-snug">
                            {artTitle}
                          </h5>
                          <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed">
                            {artSummary}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
            
            {/* Breadcrumbs & simulated Permalink URL */}
            <div className="border border-zinc-200 bg-zinc-55/80 p-3 font-mono text-[10px] leading-relaxed flex flex-col gap-1.5 select-none text-black">
              <div className="flex items-center flex-wrap gap-1 text-zinc-500">
                <span className="hover:underline cursor-pointer font-bold" onClick={() => { stopAudio(); onClose(); }}>
                  {isAr ? 'الرئيسية' : 'Home'}
                </span>
                <span>&gt;</span>
                <span className="text-zinc-700 font-bold">
                  {article.category === 'fifa-2026' && (isAr ? 'فيفا 2026' : 'FIFA 2026')}
                  {article.category === 'exclusives' && (isAr ? 'التحقيقات الصحفية' : 'Investigations')}
                  {article.category === 'editor-desk' && (isAr ? 'من رئيس التحرير' : 'From the Editor')}
                  {article.category === 'lebanon' && (isAr ? 'أخبار لبنان' : 'Lebanon News')}
                  {article.category === 'instats' && (isAr ? 'إحصاءات الورّاق' : 'In Stats')}
                  {article.category === 'middle-east' && (isAr ? 'شؤون الشرق الأوسط' : 'Middle East')}
                  {article.category === 'markets' && (isAr ? 'أسواق المال' : 'Markets')}
                  {article.category === 'telecom-internet' && (isAr ? 'لاتصالات والإنترنت' : 'Telecom & Internet')}
                  {article.category === 'research-reports' && (isAr ? 'أبحاث ودراساة' : 'Research & Reports')}
                  {article.category === 'sports' && (isAr ? 'رياضة' : 'Sports')}
                  {article.category === 'wellness-lifestyle' && (isAr ? 'الصحة' : 'Curae News')}
                </span>
                <span>&gt;</span>
                <span className="text-black font-extrabold line-clamp-1">{title}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 border-t border-zinc-200/60 pt-1.5 mt-0.5">
                <span className="text-zinc-400 font-sans font-bold">{isAr ? 'رابط المقال السريع:' : 'Permalink URL:'}</span>
                <span className="bg-zinc-200/50 px-1.5 py-0.5 select-all text-black font-black">
                  https://alwarraqnews.com/article/{article.id}
                </span>
              </div>
            </div>

            {/* Article Editorial Label */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-accent font-sans bg-accent/5 px-2.5 py-1 rounded-sm">
                {article.category === 'middle-east' && (activeLang === 'ar' ? 'صحافة الشرق الأوسط الدولية' : 'Asharq Al-Awsat Exclusives')}
                {article.category === 'opinion' && (activeLang === 'ar' ? 'الأعمدة والآراء الأكثر تأثيراً' : 'Commentary & Opinional Columns')}
                {article.category === 'world' && (activeLang === 'ar' ? 'أخبار دولية وقارية' : 'International News Bureau')}
                {article.category !== 'middle-east' && article.category !== 'opinion' && article.category !== 'world' && (activeLang === 'ar' ? 'تغطية مخصصة' : 'Specialized Supplement')}
              </span>
              <span className="text-xs text-gray-400 font-sans">{article.date}</span>
            </div>

            {/* Headline Title */}
            <div className="space-y-2">
              <h2 
                className={`text-gray-950 font-bold leading-tight select-text ${
                  isPrint ? 'font-serif text-3xl md:text-5xl leading-tight' : 'font-sans text-2xl md:text-4xl leading-snug'
                }`}
              >
                {title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-sans tracking-wide select-none">
                <BookOpen size={13} className="text-[#b91c1c]" />
                <span className="font-semibold">{readTime}</span>
              </div>
            </div>

            {/* Excerpt Summary below the headline */}
            <div className="p-3 bg-red-50/40 rounded border-r-2 border-red-800 text-right rtl:text-right ltr:text-left">
              <p className="text-xs font-mono font-black text-red-800 uppercase tracking-widest mb-1 select-none">
                {isAr ? '● المقتطف والملخص' : '● EXCERPT SUMMARY'}
              </p>
              <p className="text-xs md:text-sm text-neutral-900 font-serif leading-relaxed italic font-semibold select-text">
                {article.excerpt || (isAr ? (article.excerptAr || article.summaryAr) : (article.excerptEn || article.summaryEn))}
              </p>
            </div>

            {/* New Hashtag Bar containing links to filtered views */}
            {(article.hashtags || article.tags) && (article.hashtags || article.tags)!.length > 0 && (
              <div className="py-2 flex flex-wrap gap-1.5 border-b border-gray-100 select-none items-center">
                <span className="text-[10px] font-mono font-extrabold text-zinc-400 uppercase mr-1">
                  {isAr ? 'أوسمة متصلة:' : 'TAGS:'}
                </span>
                {(article.hashtags || article.tags)!.map((t) => {
                  let arabicLabel = '';
                  for (const silo of SEO_SILOS) {
                    const found = silo.tags.find(tag => tag.nameEn === t);
                    if (found) {
                      arabicLabel = found.nameAr;
                      break;
                    }
                  }
                  const displayTag = isAr && arabicLabel ? arabicLabel : t;
                  const cleanTag = displayTag.replace(/\s+/g, '_');
                  return (
                    <button
                      key={t}
                      onClick={(e) => {
                        onClose(); // Close the viewer
                        onTagClick?.(t, e); // Filter the view
                      }}
                      className="bg-[#b91c1c]/5 hover:bg-[#b91c1c]/10 text-[#b91c1c] font-mono text-[10px] font-black px-2 py-0.5 rounded transition-all cursor-pointer border border-[#b91c1c]/10"
                    >
                      #{cleanTag}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Author info Card badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-gray-150 py-4 font-sans text-xs text-gray-500 shrink-0 gap-4">
              {article.category === 'editor-desk' ? (
                <div className="flex items-center gap-2 py-2 px-3 bg-zinc-50 border border-zinc-200 rounded-xs font-mono font-black text-black text-[11px] uppercase tracking-wider select-none">
                  ✍️ {activeLang === 'ar' ? 'هيئة تحرير صحيفة الوارّاق' : 'Al-Warraq Editorial Board'}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const profile = getAuthorProfile(article.author?.nameEn || '', article.author?.nameAr || '');
                    setActiveAuthorProfile(profile);
                  }}
                  className="flex items-center gap-3 group text-left cursor-pointer select-none bg-zinc-50 hover:bg-zinc-100 p-2 border border-zinc-200 transition-all duration-150 rounded-xs"
                  title={activeLang === 'ar' ? 'عرض ميثاق المهنية والخبرة E-E-A-T لهذا الصحفي' : 'Verify Journalist E-E-A-T Credentials'}
                >
                  {article.author?.avatar && (
                    <img 
                      src={article.author.avatar} 
                      alt={authorName} 
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                      }}
                      className="w-10 h-10 rounded-full object-cover border-2 border-black group-hover:scale-105 transition-transform" 
                    />
                  )}
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm flex items-center gap-1 group-hover:text-[#b91c1c] transition-colors">
                      <span>{authorName}</span>
                      <Shield size={12} className="text-emerald-600 shrink-0" />
                    </h5>
                    <p className="text-gray-500 text-xxs flex items-center gap-1">
                      <span>{authorTitle || (activeLang === 'ar' ? 'مراسل وكالة الصحافة' : 'Press Agency Reporter')}</span>
                      <span className="text-zinc-350">•</span>
                      <span className="text-[#b91c1c] uppercase font-mono font-bold tracking-wider text-[8px]">{activeLang === 'ar' ? 'اعتماد موثوق' : 'EEAT Credentialed'}</span>
                    </p>
                  </div>
                </button>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1 font-semibold text-primary">
                  <BookOpen size={13} />
                  {readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Volume2 size={13} />
                  {article.views.toLocaleString()} {activeLang === 'ar' ? 'زيارة' : 'readers'}
                </span>
                <span>•</span>
                <div id="inline-text-resizer" className="flex items-center gap-1 bg-zinc-100 p-0.5 border border-zinc-200 rounded-xs select-none">
                  <button
                    type="button"
                    onClick={handleDecreaseFontSize}
                    disabled={fontSize === 'sm'}
                    className={`px-1.5 py-0.5 rounded-xs font-black text-[10px] transition-colors cursor-pointer ${
                      fontSize === 'sm'
                        ? 'text-zinc-300 cursor-not-allowed'
                        : 'text-zinc-700 hover:bg-zinc-200'
                    }`}
                    title={activeLang === 'ar' ? 'تصغير الخط A-' : 'Decrease Font Size A-'}
                  >
                    A-
                  </button>
                  <span className="text-[9px] font-mono font-bold text-zinc-500 px-1 uppercase">
                    {activeLang === 'ar' ? 'الخط' : 'Size'}: {fontSize}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncreaseFontSize}
                    disabled={fontSize === 'xl'}
                    className={`px-1.5 py-0.5 rounded-xs font-black text-[10px] transition-colors cursor-pointer ${
                      fontSize === 'xl'
                        ? 'text-zinc-300 cursor-not-allowed'
                        : 'text-zinc-700 hover:bg-zinc-200'
                    }`}
                    title={activeLang === 'ar' ? 'تكبير الخط A+' : 'Increase Font Size A+'}
                  >
                    A+
                  </button>
                </div>
              </div>
            </div>

            {/* Headline Editorial Photo */}
            {article.id === 'solidere-stock-struggle-2026' ? (
              <div className="mb-6">
                <SolidereStockInfographic language={activeLang} />
              </div>
            ) : article.id === 'fifa-polymarket-struggle-2026' ? (
              <div className="mb-6">
                <FifaPolymarketInfographic language={activeLang} />
              </div>
            ) : article.id === 'lebanon-framework-agreement-analysis-2026' ? (
              <div className="mb-6">
                <FrameworkAgreementInfographic language={activeLang} />
              </div>
            ) : article.id === 'solidere-extension-2069' ? (
              <div className="mb-6">
                <SolidereInfographic 
                  language={activeLang} 
                  articles={allArticles || []} 
                  onSelectArticle={onSelectArticle || (() => {})} 
                />
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-lg shadow-sm">
                <img 
                  src={article.imageUrl} 
                  alt={title} 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-[280px] md:h-[420px] object-cover" 
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-3 text-white text-xxs text-right font-sans">
                  {activeLang === 'ar' ? 'صورة تعبيرية من الأرشيف لخدمة الشرق الأوسط الإخبارية' : 'Illustrative Archive Photo for Asharq Al-Awsat wire services.'}
                </div>
              </div>
            )}

            {/* INTEGRATED STORY BLUEPRINT, HASHTAGS & TOPIC NETWORK */}
            <div className="border-2 border-black bg-[#faf9f6] p-4 font-sans space-y-4 my-6 shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-right rtl:text-right ltr:text-left select-none">
              <div className="flex items-center justify-between border-b border-zinc-300 pb-2.5">
                <div className="flex items-center gap-2">
                  <BookMarked size={14} className="text-[#b91c1c]" />
                  <span className="font-mono text-[10px] font-black uppercase text-[#b91c1c] tracking-wider">
                    {isAr ? 'موجز الملف والشبكة الدلالية' : 'Story Briefing & Topic Intelligence'}
                  </span>
                </div>
                <span className="text-[8px] font-mono text-zinc-400 font-bold">AL-WARRAQ WIRE DESK</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Excerpt Summary (7 cols) */}
                <div className="md:col-span-7 space-y-2 border-b md:border-b-0 md:border-r border-zinc-200 pb-3 md:pb-0 md:pr-4">
                  <span className="font-mono text-[9px] font-black text-zinc-400 block uppercase">
                    {isAr ? '● موجز التحرير والمحتوى' : '● EXCERPT SUMMARY'}
                  </span>
                  <p className="text-xs md:text-sm text-neutral-900 font-serif leading-relaxed italic font-semibold select-text">
                    {summary}
                  </p>
                  
                  {/* Hashtags section */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="pt-2 select-none">
                      <span className="font-mono text-[8px] font-black text-zinc-400 block uppercase mb-1">
                        {isAr ? 'أوسمة القصة الدلالية:' : 'STORY HASHTAGS:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {article.tags.map(t => {
                          let arabicLabel = '';
                          for (const silo of SEO_SILOS) {
                            const found = silo.tags.find(tag => tag.nameEn === t);
                            if (found) {
                              arabicLabel = found.nameAr;
                              break;
                            }
                          }
                          const displayTag = isAr && arabicLabel ? arabicLabel : t;
                          const cleanTag = displayTag.replace(/\s+/g, '_');
                          return (
                            <span
                              key={t}
                              className="text-[#b91c1c] hover:text-black text-[10px] font-mono font-black transition-colors"
                            >
                              #{cleanTag}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Topic Related Posts (5 cols) */}
                <div className="md:col-span-5 space-y-2.5">
                  <span className="font-mono text-[9px] font-black text-zinc-400 block uppercase">
                    {isAr ? '● تقارير متصلة بذات الموضوع' : '● TOPIC RELATED DISPATCHES'}
                  </span>
                  
                  <div className="space-y-2">
                    {(() => {
                      const related = articlesList.filter(art => 
                        art.id !== article.id && 
                        (art.category === article.category || 
                         (art.tags && article.tags && art.tags.some(t => article.tags.includes(t))))
                      ).slice(0, 2);

                      if (related.length === 0) {
                        return (
                          <p className="text-[10px] text-zinc-400 italic">
                            {isAr ? 'لا توجد تقارير إضافية حالياً في هذا التصنيف' : 'No related dispatches found.'}
                          </p>
                        );
                      }

                      return related.map(rArt => {
                        const rTitle = activeLang === 'ar' ? rArt.titleAr : rArt.titleEn;
                        return (
                          <button
                            key={rArt.id}
                            type="button"
                            onClick={() => handleSelectRelated(rArt)}
                            className="w-full text-right rtl:text-right ltr:text-left block p-2 border border-zinc-200 hover:border-[#b91c1c] hover:bg-white transition-all cursor-pointer rounded-xs group"
                          >
                            <span className="text-[9px] font-mono font-bold text-zinc-400 block">
                              {rArt.date}
                            </span>
                            <span className="text-[11px] font-sans font-extrabold text-neutral-800 group-hover:text-[#b91c1c] transition-colors line-clamp-1 leading-snug">
                              {rTitle}
                            </span>
                          </button>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* AUTOMATED EXPLICIT PARENT AUTHORITY LINK */}
            {article.parentAuthorityArticleId && (
              (() => {
                const parentArt = articlesList.find(a => a.id === article.parentAuthorityArticleId);
                if (!parentArt) return null;
                const parentTitle = activeLang === 'ar' ? parentArt.titleAr : parentArt.titleEn;
                return (
                  <div className="border border-black bg-zinc-50 p-3.5 flex items-start gap-3 rounded-none animate-fade-in select-none">
                    <span className="text-lg">🔗</span>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] font-black uppercase text-[#b91c1c] tracking-wider block">
                        {isAr ? 'وثيقة ميثاق مرجعية (Authority Page Backlink)' : 'Authority Page Reference Backlink'}
                      </span>
                      <p className="text-[11px] text-zinc-500 font-sans font-medium">
                        {isAr 
                          ? 'هذا التغطية الاستقصائية مبنية وموثقة بالإحالة إلى الأرشيف المركزي الموثوق:' 
                          : 'This investigative dispatch is officially backed by authoritative reference archives:'}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleSelectRelated(parentArt)}
                        className="text-xs font-sans font-black text-[#b91c1c] hover:text-black flex items-center gap-1.5 transition-colors text-left cursor-pointer underline font-bold"
                      >
                        <span>{parentTitle}</span>
                        <ArrowRight size={12} className="shrink-0" />
                      </button>
                    </div>
                  </div>
                );
              })()
            )}

            {/* INTEGRATED AI ENRICHMENT ACTIONS BAR */}
            <div className="bg-zinc-100 rounded-sm p-4 border-2 border-black font-sans flex flex-col md:flex-row items-center justify-between gap-3 shadow-none">
              <div className="flex items-center gap-2">
                <Sparkles className="text-black animate-pulse" size={18} />
                <div>
                  <h6 className="font-black text-black text-xs">{activeLang === 'ar' ? 'مساعد التحرير الآلي للوارّاق (Gemini)' : 'Al-Warraq AI Editorial Assistant'}</h6>
                  <p className="text-[10px] text-zinc-500 font-bold">{activeLang === 'ar' ? 'توليد ملخص تنفيذي أو تحليل استراتيجي ذكي للأبعاد الإقليمية للموضوع.' : 'Generate live executive summary bullet points or deeper analytical forecasts.'}</p>
                </div>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <button
                  onClick={handleFetchSummary}
                  disabled={loadingSummary}
                  id="btn-get-ai-summary"
                  className="flex-1 md:flex-none flex items-center justify-center gap-1 bg-white border border-black hover:bg-zinc-200 text-black py-1.5 px-3 rounded-none text-xs cursor-pointer font-bold disabled:opacity-55"
                >
                  {loadingSummary ? '...' : (activeLang === 'ar' ? 'تلخيص الخبر بالذكاء' : 'Summarize with AI')}
                </button>
                <button
                  onClick={handleFetchAnalysis}
                  disabled={loadingAnalysis}
                  id="btn-get-ai-analysis"
                  className="flex-1 md:flex-none flex items-center justify-center gap-1 bg-black text-white hover:bg-zinc-800 py-1.5 px-3 rounded-none text-xs cursor-pointer font-bold disabled:opacity-55"
                >
                  {loadingAnalysis ? '...' : (activeLang === 'ar' ? 'التحليل والعمق الاستراتيجي' : 'Analytical Insight')}
                </button>
              </div>
            </div>

            {/* AI Summary result box */}
            {aiSummary && (
              <div className="bg-zinc-50 border border-black p-4 rounded-none font-sans">
                <div className="flex items-center gap-1.5 text-xs text-black font-black mb-2">
                  <Sparkles size={14} />
                  <span>{activeLang === 'ar' ? 'خلاصة التحليل المكثفة لوجهة نظر الورّاق:' : 'Al-Warraq Executive Bullet Summary:'}</span>
                </div>
                <div className="whitespace-pre-line text-xs md:text-sm text-zinc-800 leading-relaxed font-sans select-text font-medium">
                  {activeLang === 'ar' ? aiSummary.ar : aiSummary.en}
                </div>
              </div>
            )}

            {/* AI Analysis forecasting box */}
            {aiAnalysis && (
              <div className="bg-zinc-100 border-2 border-double border-black p-5 rounded-none select-text">
                <div className="flex items-center gap-1.5 text-xs text-black font-black mb-2 font-sans">
                  <Shield size={14} className="text-black" />
                  <span>{activeLang === 'ar' ? 'الملحق الاستقرائي والبعد الإقليمي المتقدم:' : 'Geopolitical Forecasting Supplement:'}</span>
                </div>
                <p className="text-xs md:text-sm text-zinc-900 leading-relaxed font-sans font-semibold italic">
                  {activeLang === 'ar' ? aiAnalysis.ar : aiAnalysis.en}
                </p>
              </div>
            )}

            {/* Headline Body Story content */}
            {isPremiumLocked ? (
              <div className="space-y-6">
                <div className="relative overflow-hidden select-none pointer-events-none">
                  <div 
                    className={`whitespace-pre-line text-black/45 tracking-wide leading-relaxed prose max-w-none font-medium filter blur-[2.5px] ${fontClass()}`}
                  >
                    {content.slice(0, 220)}...
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tracking market assets, sovereign liquidity limits, HSBC private bank assets, and Lebanese capital flight reserves.
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
                </div>

                {/* Secure Premium Lock Box Station */}
                <div className="border-4 border-black bg-[#faf9f6] p-6 text-center space-y-4 shadow-[4px_4px_0_0_#000] relative z-10 animate-fade-in my-2">
                  <div className="w-12 h-12 bg-red-50 border-2 border-black text-[#b91c1c] flex items-center justify-center mx-auto rounded-sm">
                    <Lock size={20} className="animate-pulse" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-sans font-black text-sm md:text-base uppercase tracking-tight text-neutral-900">
                      {isAr ? 'حظر سيادي: المحتوى متاح حصرياً للمشتركين بجريدة الوراق' : 'Sovereign Restriction: Report Reserved for Patrons'}
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-bold max-w-md mx-auto leading-normal">
                      {isAr 
                        ? 'إن تحقيقات ديوان الوراق الميدانية، والملفات السياسية والمصرفية الكبرى، محمية ومخصصة لأصحاب العضويات والمساهمات الاقتصادية المستقلة.' 
                        : 'Al-Warraq’s deep geopolitical coverage, banking leaks, and chief editor bulletins are secured under patron-only subscription tiers.'}
                    </p>
                  </div>

                  {/* Pricing brief summary */}
                  <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto py-2">
                    <div className="p-2.5 border-2 border-black bg-white text-center">
                      <span className="block font-mono text-[9px] text-zinc-400 font-bold uppercase">{isAr ? 'الخيار الشهري' : 'MONTHLY PATRON'}</span>
                      <span className="block font-sans font-black text-xl text-black">$20<span className="text-[10px] font-mono text-zinc-400 font-medium">/mo</span></span>
                    </div>
                    <div className="p-2.5 border-2 border-black bg-white text-center relative">
                      <span className="block font-mono text-[9px] text-zinc-400 font-bold uppercase">{isAr ? 'الخيار السنوي' : 'ANNUAL DIRECT'}</span>
                      <span className="block font-sans font-black text-xl text-[#b91c1c]">$200<span className="text-[10px] font-mono text-zinc-400 font-medium">/yr</span></span>
                      <span className="absolute -top-2 right-1/2 translate-x-1/2 bg-[#b91c1c] text-white text-[7px] font-mono px-1 font-black uppercase">
                        {isAr ? 'توفير' : 'SAVE'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 max-w-sm mx-auto pt-3">
                    {!currentUser ? (
                      <button
                        onClick={() => { stopAudio(); onAuthClick(); }}
                        className="w-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase py-2.5 border border-black cursor-pointer transition-all"
                      >
                        {isAr ? 'تسجيل الدخول لتفعيل الاشتراك' : 'SIGN IN / SIGN UP TO UNLOCK'}
                      </button>
                    ) : (
                      <button
                        onClick={() => { stopAudio(); onSubscribeClick(); }}
                        className="w-full bg-[#b91c1c] hover:bg-neutral-950 text-white font-black text-xs uppercase py-3 border-2 border-black cursor-pointer transition-all shadow-[3px_3px_0_0_#000]"
                      >
                        {isAr ? 'ترقية حسابي والاشتراك الآمن فوراً' : 'SUBSCRIBE & PURCHASE INSTANT ACCESS'}
                      </button>
                    )}
                    <span className="text-[8px] font-mono text-zinc-400 tracking-wider">
                      {isAr ? 'تأمين بنظام معيار التشفير المتقدم وبدون التزامات خفية' : 'SECURE SEC-256 TRANSCEIVER. ZERO HIDDEN COST.'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className={`select-text text-black font-sans tracking-wide leading-relaxed prose max-w-none font-medium ${fontClass()}`}
              >
                {parseAndRenderContent(content)}
              </div>
            )}

            {/* Injected Interactive Map for Ali Al-Taher strategic hill investigation */}
            {article.id === 'ali-al-taher-investigation' && (
              <AliAlTaherMap language={activeLang} />
            )}

            {/* Injected Interactive Regional Map for Lebanon conflict intensity */}
            {article.id === 'israel-escalation-logic-lebanon' && (
              <LebanonConflictMap 
                language={activeLang} 
                allArticles={allArticles}
                onSelectArticle={onSelectArticle}
              />
            )}

            {/* Injected Interactive Risk Simulation Sandbox for proactive risk intelligence editorial */}
            {article.id === 'lebanon-proactive-risk-intelligence-2026' && (
              <RiskSimulationSandbox language={activeLang} />
            )}

            {/* ARTICLE SEO TARGET KEYWORDS */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-6 pt-4 border-t border-zinc-200 select-none">
                <span className="font-mono text-[9px] font-black text-zinc-400 block uppercase mb-2">
                  {isAr ? 'عناقيد الكلمات الرئيسية والمقالات المتصلة (CMS Tags):' : 'SEO Silo Tags & Indexed Keywords:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map(t => {
                    let arabicLabel = '';
                    for (const silo of SEO_SILOS) {
                      const found = silo.tags.find(tag => tag.nameEn === t);
                      if (found) {
                        arabicLabel = found.nameAr;
                        break;
                      }
                    }
                    return (
                      <span
                        key={t}
                        className="bg-zinc-100 border border-zinc-200 hover:border-black text-zinc-800 text-[10px] font-sans font-semibold px-2 py-0.5"
                      >
                        #{isAr && arabicLabel ? arabicLabel : t}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SOCIAL SHARING HUB */}
            <div className="mt-8 pt-6 border-t-2 border-black flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans select-none">
              <div className="flex items-center gap-2">
                <Share2 size={16} className="text-zinc-600 shrink-0" />
                <span className="font-mono text-xs font-black uppercase text-zinc-700 tracking-wider">
                  {isAr ? 'مشاركة الوثيقة والتحقيق السري' : 'SHARE TRANSMISSION WIRE'}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-zinc-800 text-white rounded-none text-xxs font-mono font-bold uppercase transition-colors"
                >
                  <Twitter size={11} />
                  <span>X / TWITTER</span>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-900 hover:bg-sky-950 text-white rounded-none text-xxs font-mono font-bold uppercase transition-colors"
                >
                  <Facebook size={11} />
                  <span>FACEBOOK</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-none text-xxs font-mono font-bold uppercase transition-colors"
                >
                  <Linkedin size={11} />
                  <span>LINKEDIN</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${activeLang === 'ar' ? 'هذا تنبيه إخباري من alwarraqnews.com - تحليل وتغطية صحفية\n\n' : 'This is a news alert from alwarraqnews.com - News Analysis and Reporting\n\n'}*${title}*\n${summary}\n\n👉 ${shareUrl}\n\njoin our whatsapp group on https://chat.whatsapp.com/Fgh6uYQegGKKjs3DL6hy6A -  read more on alwarraqnews.com - Read our latest newsletter edition on join our premium subscribers https://www.alwarraqnews.com/premium-pricing`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-none text-xxs font-mono font-bold uppercase transition-colors"
                >
                  <Send size={11} />
                  <span>WHATSAPP</span>
                </a>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-black rounded-none text-xxs font-mono font-black uppercase transition-all cursor-pointer ${
                    copiedLink ? 'bg-emerald-50 text-emerald-700 border-emerald-500' : 'bg-white text-black hover:bg-zinc-100'
                  }`}
                >
                  {copiedLink ? <Check size={11} /> : <Link size={11} />}
                  <span>{copiedLink ? (isAr ? 'تم النسخ!' : 'COPIED!') : (isAr ? 'نسخ الرابط' : 'COPY LINK')}</span>
                </button>

                {/* PDF Download */}
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900 hover:bg-red-950 text-white rounded-none text-xxs font-mono font-bold uppercase transition-colors cursor-pointer border border-red-950"
                  title={isAr ? 'تحميل كملف PDF رسمي' : 'Download official PDF'}
                >
                  <Download size={11} />
                  <span>{isAr ? 'تحميل كـ PDF' : 'DOWNLOAD PDF'}</span>
                </button>
              </div>
            </div>

            {/* DUAL EDITORIAL CALL TO ACTION */}
            <div className="mt-6 p-6 border-4 border-black bg-zinc-50 relative overflow-hidden font-sans">
              {/* Visual accents */}
              <div className="absolute top-0 right-0 w-32 h-full bg-red-600/5 transform skew-x-12 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
                <div className="flex-1 space-y-1.5">
                  <span className="inline-block bg-[#b91c1c] text-white font-mono font-black text-[9px] px-2 py-0.5 uppercase tracking-widest">
                    {isAr ? 'التحالف الصحفي الحر' : 'THE UNBIASED TRUTH COALITION'}
                  </span>
                  <h4 className="font-sans font-black text-sm md:text-base text-zinc-950 uppercase tracking-tight leading-tight">
                    {isAr ? 'دعم التحقيقات السيادية ومتابعة الخط الساخن' : 'FUEL SOVEREIGN JOURNALISM • ACCESS MONETARY MAPS'}
                  </h4>
                  <p className="text-zinc-600 text-xxs leading-relaxed font-bold max-w-xl">
                    {isAr 
                      ? 'ديوان الورّاق لا يخضع لتمويل خارجي أو رتوش تسويقية. اشترك في النشرة الفورية لتلقي مستجدات الطاقة والمقاصات المصرفية مباشرة عبر تيلكس.' 
                      : 'Al-Warraq operates independently without external sponsorship or synthetic noise. Sign up below for direct wire updates or support us with a premium grade subscription.'}
                  </p>
                </div>

                <div className="w-full md:w-auto shrink-0 flex flex-col gap-3 justify-center min-w-[280px]">
                  {ctaSuccess ? (
                    <div className="bg-emerald-100/80 border-2 border-emerald-500 text-emerald-800 p-3 text-center rounded-none font-mono text-xxs flex items-center justify-center gap-2">
                      <Check size={14} className="text-emerald-700 animate-bounce" />
                      <strong>{isAr ? 'تم تسجيل عنوانكم في خط الاتصال المباشر!' : 'TELEX DIRECT LINE SECURED!'}</strong>
                    </div>
                  ) : (
                    <form onSubmit={handleCtaSubmit} className="flex gap-1.5">
                      <input
                        type="email"
                        required
                        value={ctaEmail}
                        onChange={(e) => setCtaEmail(e.target.value)}
                        placeholder={isAr ? 'بريدك الإلكتروني للتيلكس' : 'Enter email for direct line'}
                        className="flex-1 bg-white border-2 border-black text-black font-mono text-xxs px-3 py-2 outline-none focus:border-red-650"
                      />
                      <button
                        type="submit"
                        className="bg-black hover:bg-neutral-800 text-white font-mono font-black text-xxs px-4 py-2 uppercase border border-black cursor-pointer tracking-wider shrink-0 animate-pulse"
                      >
                        {isAr ? 'تفعيل' : 'JOIN'}
                      </button>
                    </form>
                  )}

                  {!currentUser?.isPremiumSubscriber && (
                    <button
                      onClick={() => { stopAudio(); onClose(); onSubscribeClick(); }}
                      className="w-full bg-[#b91c1c] hover:bg-neutral-900 border-2 border-black text-white font-mono font-black text-xxs py-2 uppercase text-center cursor-pointer transition-all shadow-[2px_2px_0_0_#000]"
                    >
                      {isAr ? 'الترقية للعضوية الفاخرة ✦ $20' : 'INVEST IN TRUTH ✦ PREMIUM $20'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* CONTEXTUAL DOSSIER SECTION AT THE BOTTOM OF THE ARTICLE VIEW */}
            <ContextualDossier
              article={article}
              allArticles={articlesList}
              language={activeLang}
              onSelectArticle={handleSelectRelated}
              savedArticleIds={savedArticleIds}
              onToggleSaveMultipleArticles={onToggleSaveMultipleArticles}
              currentUser={currentUser}
              onAuthClick={onAuthClick}
            />

            {/* RECOMMENDED FOR YOU */}
            {primaryTag && recommendedForYou.length > 0 && (
              <div id="recommended-for-you-section" className="mt-8 font-sans select-none border-2 border-black p-5 bg-neutral-50 shadow-[4px_4px_0_0_#b91c1c]">
                <div className="flex items-center justify-between mb-4 border-b border-zinc-200 pb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Sparkles size={15} className="text-[#b91c1c] animate-pulse" />
                    <h4 className="font-sans font-black text-xs uppercase text-zinc-950 tracking-wider flex items-center gap-1.5">
                      {isAr ? 'موصى به لك' : 'RECOMMENDED FOR YOU'}
                    </h4>
                    <span className="text-[10px] bg-[#b91c1c]/10 text-[#b91c1c] border border-[#b91c1c]/20 font-extrabold px-2 py-0.5 font-mono select-all">
                      #{tagLabel}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-black text-zinc-400">
                    {isAr ? 'توصيات مخصصة' : 'TAILORED DISPATCHES'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedForYou.map((recArt) => {
                    const recTitle = activeLang === 'ar' ? recArt.titleAr : recArt.titleEn;
                    const recCategoryLabel = activeLang === 'ar' 
                      ? (recArt.category === 'fifa-2026' ? 'فيفا 2026' : recArt.category === 'exclusives' ? 'تحقيقات' : recArt.category === 'editor-desk' ? 'رأي التحرير' : recArt.category === 'lebanon' ? 'لبنان' : recArt.category === 'middle-east' ? 'الشرق الأوسط' : 'تغطية')
                      : recArt.category.toUpperCase();

                    return (
                      <div
                        key={recArt.id}
                        id={`rec-item-${recArt.id}`}
                        onClick={() => handleSelectRelated(recArt)}
                        className="group flex flex-col border border-zinc-200 hover:border-[#b91c1c] bg-white p-3 transition-all cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-150"
                      >
                        {/* Compact thumbnail image */}
                        <div className="relative aspect-video w-full overflow-hidden border border-zinc-100 bg-zinc-50 shrink-0 mb-2">
                          <img
                            src={recArt.imageUrl}
                            alt={recTitle}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=850&q=80";
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-1 left-1 bg-black text-white text-[8px] font-mono px-1.5 py-0.5 uppercase tracking-wider font-bold">
                            {recCategoryLabel}
                          </div>
                        </div>

                        {/* Title text */}
                        <h5 className="font-sans font-black text-xs text-zinc-900 group-hover:text-red-700 transition-colors line-clamp-2 mt-0.5 leading-snug">
                          {recTitle}
                        </h5>

                        <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono mt-auto pt-2 border-t border-zinc-100">
                          <span>{recArt.date}</span>
                          <span className="font-bold flex items-center gap-1">
                            <BookOpen size={9} />
                            {activeLang === 'ar' ? recArt.readTimeAr : recArt.readTimeEn}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* RELATED TRANSMISSIONS */}
            <div className="mt-8 font-sans select-none border-t-2 border-black pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5">
                  <BookOpen size={16} className="text-red-700" />
                  <h4 className="font-mono text-xs font-black uppercase text-zinc-950 tracking-wider">
                    {isAr ? 'تحقيقات ذات صلة وسقوف المعرفة' : 'RELATED DISPATCHES & MONITOR CORE'}
                  </h4>
                </div>
                <span className="text-[9px] font-mono font-black text-zinc-400">
                  {isAr ? 'مستندات مرشحة تلقائياً' : 'SYSTEM MATCHED ARCHIVES'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {articlesList
                  .filter(a => a.id !== article.id)
                  .filter(a => a.category === article.category)
                  .slice(0, 3)
                  .concat(
                    articlesList
                      .filter(a => a.id !== article.id && a.category !== article.category)
                      .slice(0, Math.max(0, 3 - articlesList.filter(a => a.id !== article.id && a.category === article.category).length))
                  )
                  .map((relArt) => {
                    const relTitle = activeLang === 'ar' ? relArt.titleAr : relArt.titleEn;
                    const relCategoryLabel = activeLang === 'ar' 
                      ? (relArt.category === 'fifa-2026' ? 'فيفا 2026' : relArt.category === 'exclusives' ? 'تحقيقات' : relArt.category === 'editor-desk' ? 'رأي التحرير' : relArt.category === 'lebanon' ? 'لبنان' : relArt.category === 'middle-east' ? 'الشرق الأوسط' : 'تغطية')
                      : relArt.category.toUpperCase();

                    return (
                      <div
                        key={relArt.id}
                        onClick={() => handleSelectRelated(relArt)}
                        className="group flex flex-col border border-zinc-200 bg-white hover:border-[#b91c1c] active:border-black p-3 transition-all cursor-pointer shadow-sm hover:shadow-md"
                      >
                        {/* Compact thumbnail image */}
                        <div className="relative aspect-video w-full overflow-hidden border border-zinc-100 bg-zinc-50 shrink-0 mb-2">
                          <img
                            src={relArt.imageUrl}
                            alt={relTitle}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=850&q=80";
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-1 left-1 bg-black text-white text-[8px] font-mono px-1.5 py-0.5 uppercase tracking-wider font-bold">
                            {relCategoryLabel}
                          </div>
                        </div>

                        {/* Title text */}
                        <h5 className="font-sans font-black text-xs text-zinc-900 group-hover:text-red-700 transition-colors line-clamp-2 mt-0.5 leading-snug">
                          {relTitle}
                        </h5>

                        <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono mt-auto pt-2 border-t border-zinc-100">
                          <span>{relArt.date}</span>
                          <span className="font-bold flex items-center gap-1">
                            <BookOpen size={9} />
                            {activeLang === 'ar' ? relArt.readTimeAr : relArt.readTimeEn}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Footer Editorial Sign off */}
            <div className="mt-10 border-t border-black pt-6 text-center text-xs text-zinc-500 font-sans select-none font-medium">
              <p>© {activeLang === 'ar' ? 'جميع الحقوق محفوظة لجريدة الوراق ومجلس المخططين والناشرين الأحرار - بيروت • القاهرة' : 'Copyright Al-Warraq Guild of Free Printers. Published on Ink-Press Systems.'}</p>
              <p className="mt-1 text-[10px] text-zinc-400 font-mono">Printed with Carbon-Base Sustainable Ink on Digital Press.</p>
            </div>

          </div>
        )}
        </div>
      </motion.div>
    </motion.div>
    </>
  );
}
