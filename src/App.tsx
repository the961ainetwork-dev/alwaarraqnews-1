import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Breadcrumbs from './components/Breadcrumbs';
import CurrencyAndWeather from './components/CurrencyAndWeather';
import BreakingBar from './components/BreakingBar';
import ArticleCard from './components/ArticleCard';
import ArticleViewer from './components/ArticleViewer';
import AIPanel from './components/AIPanel';
import InStats from './components/InStats';
import ArabMarketsIndicators from './components/ArabMarketsIndicators';
import PulseOfTheStreet from './components/PulseOfTheStreet';
import UserAuthModal from './components/UserAuthModal';
import AdminPanel from './components/AdminPanel';
import PremiumPricing from './components/PremiumPricing';
import Newsletter from './components/Newsletter';
import SentimentAnalysis from './components/SentimentAnalysis';
import WhatIfSimulator from './components/WhatIfSimulator';
import TrendingWidget from './components/TrendingWidget';
import LebanonAMLVisualizer from './components/LebanonAMLVisualizer';
import { SolidereInfographic } from './components/SolidereInfographic';
import { NarrativeLebanonCrisisInfographics } from './components/NarrativeLebanonCrisisInfographics';
import AlWarraqInvestigations from './components/AlWarraqInvestigations';
import AlWarraqVideos from './components/AlWarraqVideos';
import GoldenPrimeWorkspace from './components/GoldenPrimeWorkspace';
import InCaseYouMissedIt from './components/InCaseYouMissedIt';
import WarRoom from './components/WarRoom';
import PressReleases, { PRESS_RELEASES } from './components/PressReleases';
import { INITIAL_ARTICLES, NAVIGATION_TABS } from './data';
import { Article, LayoutMode, NavigationTab, SiteDesign, DynamicWidget, UserProfile } from './types';
import { Newspaper, Sparkles, ChevronLeft, ChevronRight, Bookmark, ArrowRight, ArrowLeft, Feather, Globe, TrendingUp, Cpu, BookOpen, Trophy, Heart, Menu, Crown, Zap, Compass, Lock, Unlock, Mail, Flame, Megaphone } from 'lucide-react';

const parseArabicOrEnglishDate = (dateStr: string): number => {
  if (!dateStr) return 0;
  
  // Replace Eastern Arabic digits (e.g., ٠١٢٣٤٥٦٧٨٩) with standard ASCII digits
  let cleaned = dateStr.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
  
  // Check if it's in Arabic (contains Arabic characters)
  const arabicMonths: { [key: string]: number } = {
    'يناير': 0, 'فبراير': 1, 'مارس': 2, 'أبريل': 3, 'مايو': 4, 'يونيو': 5,
    'يوليو': 6, 'أغسطس': 7, 'سبتمبر': 8, 'أكتوبر': 9, 'نوفمبر': 10, 'ديسمبر': 11
  };
  
  const parts = cleaned.trim().split(/\s+/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const monthStr = parts[1];
    const year = parseInt(parts[2], 10);
    
    if (!isNaN(day) && !isNaN(year)) {
      let month = 0;
      if (arabicMonths[monthStr] !== undefined) {
        month = arabicMonths[monthStr];
      } else {
        // Fallback for English months
        const engIdx = new Date(`${monthStr} 1, 2000`).getMonth();
        if (!isNaN(engIdx)) month = engIdx;
      }
      return new Date(year, month, day).getTime();
    }
  }
  
  const fallback = Date.parse(dateStr);
  return isNaN(fallback) ? 0 : fallback;
};

export default function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  
  // Custom Dynamic Brand Presets State
  const [siteDesign, setSiteDesign] = useState<SiteDesign>(() => {
    const raw = localStorage.getItem('alwarraq_site_design');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          // Migrate slogan to requested format
          if (parsed.sloganAr && parsed.sloganAr.includes('معن بن هلال')) {
            parsed.sloganAr = 'صحيفة سياسية مالية شاملة تأسست في بيروت بموجب  امتياز 8/2026 المجلس الوطني للاعلام';
            localStorage.setItem('alwarraq_site_design', JSON.stringify(parsed));
          }
          return parsed;
        }
      } catch (e) {}
    }
    return {
      layoutMode: 'digital',
      themeAccent: 'red',
      sloganAr: 'صحيفة سياسية مالية شاملة تأسست في بيروت بموجب  امتياز 8/2026 المجلس الوطني للاعلام',
      sloganEn: 'The Sovereign Archives of Political Economy, Intelligence, and Monetary Assets',
      subHeaderAr: 'ديوان تدوين الحقائق والبيانات المالية',
      subHeaderEn: 'Chronicle of Geopolitics, Intelligence, and Monetary Assets',
      alertBannerAr: 'تنبيه سيادي: ترقبوا غداً حواراً خاصاً مع مدير صندوق الاستدامة حول الاحتياطات الذهبية والسيولة.',
      alertBannerEn: 'Sovereign Dispatch: Stay tuned for tomorrow’s exclusive interview with the governor of Lebanese reserve treasury.',
      titleAr: 'الورّاق',
      titleEn: 'Al-Warraq'
    };
  });

  // Dynamic custom injected components State
  const [dynamicWidgets, setDynamicWidgets] = useState<DynamicWidget[]>(() => {
    const raw = localStorage.getItem('alwarraq_dynamic_widgets');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.filter((w: any) => w.id !== 'gold-reserves-widget');
      } catch (e) {}
    }
    return [];
  });

  const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => siteDesign.layoutMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    const rawPath = window.location.pathname || '/';
    const cleanPath = rawPath.toLowerCase().replace(/^\/|\/$/g, '');
    if (cleanPath === 'admin') {
      return 'admin';
    } else if (cleanPath === 'newsletter') {
      return 'newsletter';
    } else if (cleanPath === 'workspace') {
      return 'workspace';
    } else if (cleanPath.startsWith('section/')) {
      const cat = cleanPath.substring('section/'.length);
      return cat || 'all';
    } else if (cleanPath === 'premium-pricing') {
      return 'premium-pricing';
    }
    return 'all';
  });
  const [selectedArticle, rawSetSelectedArticle] = useState<Article | null>(null);
  const setSelectedArticle = (article: Article | null | ((prev: Article | null) => Article | null)) => {
    if (typeof article === 'function') {
      rawSetSelectedArticle(article);
    } else {
      rawSetSelectedArticle(article);
      if (article) {
        setAllArticles((prev) =>
          prev.map((a) => (a.id === article.id ? { ...a, views: a.views + 1 } : a))
        );
      }
    }
  };
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  
  // Persistent States
  const [allArticles, setAllArticles] = useState<Article[]>(() => {
    const raw = localStorage.getItem('alwarraq_all_articles');
    let articles = INITIAL_ARTICLES;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Smart merge: ensure new pre-seeded articles in INITIAL_ARTICLES are loaded
          const existingIds = new Set(parsed.filter(a => a && typeof a === 'object' && a.id).map((a: any) => a.id));
          const missing = INITIAL_ARTICLES.filter(a => a && a.id && !existingIds.has(a.id));
          if (missing.length > 0) {
            articles = [...missing, ...parsed];
          } else {
            articles = parsed;
          }
        }
      } catch (e) {}
    }

    // Explicitly find and prepend 'excl-leb-isr-secret-annex' so it is at the very top of allArticles state as requested
    const targetArticleIndex = articles.findIndex(a => a && a.id === 'excl-leb-isr-secret-annex');
    if (targetArticleIndex > -1) {
      const targetArticle = articles[targetArticleIndex];
      const rest = articles.filter(a => a && a.id !== 'excl-leb-isr-secret-annex');
      articles = [targetArticle, ...rest];
    }

    // Update local storage to persist the prepended order
    localStorage.setItem('alwarraq_all_articles', JSON.stringify(articles));
    return articles;
  });

  const [categories, setCategories] = useState<NavigationTab[]>(() => {
    const raw = localStorage.getItem('alwarraq_categories');
    if (raw) {
      try {
        const parsed: NavigationTab[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge to add missing tabs like what-if-simulator
          const merged = [...parsed];
          NAVIGATION_TABS.forEach(tab => {
            if (!merged.some(m => m.id === tab.id)) {
              merged.push(tab);
            }
          });
          return merged;
        }
      } catch (e) {}
    }
    return NAVIGATION_TABS;
  });

  const [subscribers, setSubscribers] = useState<string[]>(() => {
    const raw = localStorage.getItem('alwarraq_subscribers');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [
      'maanbarazy@gmail.com',
      'editor@alwarraqnews.com',
      'stats.bureau@lebanon.gov',
      'archive@bayreuth.library.org'
    ];
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const raw = localStorage.getItem('alwarraq_current_user');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {}
    }
    return null;
  });

  // Load saved article IDs based on current authenticated user
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser) {
      const savedRaw = localStorage.getItem(`alwarraq_saved_articles_${currentUser.email}`);
      if (savedRaw) {
        try {
          const parsed = JSON.parse(savedRaw);
          if (Array.isArray(parsed)) {
            setSavedArticleIds(parsed);
            return;
          }
        } catch (e) {}
      }
    }
    setSavedArticleIds([]);
  }, [currentUser]);

  // Home Demo Banner States
  const [homeDemoUsername, setHomeDemoUsername] = useState('');
  const [homeDemoEmail, setHomeDemoEmail] = useState('');
  const [homeDemoSuccess, setHomeDemoSuccess] = useState(false);
  const [homeDemoIsSubmitting, setHomeDemoIsSubmitting] = useState(false);
  const [homeDemoTimeLeft, setHomeDemoTimeLeft] = useState('');
  const [isHomeDemoUser, setIsHomeDemoUser] = useState(false);
  const [isBannerMenuOpen, setIsBannerMenuOpen] = useState(false);

  useEffect(() => {
    let intervalId: any = null;

    const updateCountdown = () => {
      if (!currentUser) {
        setIsHomeDemoUser(false);
        setHomeDemoTimeLeft('');
        return;
      }

      let demoExpiresAt = currentUser.goldenPrimeDemoExpiresAt;
      if (!demoExpiresAt) {
        const rawUsers = localStorage.getItem('alwarraq_registered_users');
        if (rawUsers) {
          try {
            const users = JSON.parse(rawUsers);
            const match = users.find((u: any) => u.email.toLowerCase() === currentUser.email.toLowerCase());
            if (match && match.goldenPrimeDemoExpiresAt) {
              demoExpiresAt = match.goldenPrimeDemoExpiresAt;
            } else if (match && match.goldenPrimeDemoExpires) {
              const parsed = Date.parse(match.goldenPrimeDemoExpires);
              if (!isNaN(parsed)) {
                demoExpiresAt = parsed;
              }
            }
          } catch (e) {}
        }
      }

      if (demoExpiresAt) {
        const now = Date.now();
        const diff = demoExpiresAt - now;
        if (diff > 0) {
          setIsHomeDemoUser(true);
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          const formatNumber = (num: number) => {
            const padded = num.toString().padStart(2, '0');
            if (language === 'ar') {
              return padded.replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
            }
            return padded;
          };

          const hStr = formatNumber(hours);
          const mStr = formatNumber(minutes);
          const sStr = formatNumber(seconds);

          setHomeDemoTimeLeft(`${hStr}:${mStr}:${sStr}`);
        } else {
          setIsHomeDemoUser(false);
          setHomeDemoTimeLeft('');
        }
      } else {
        setIsHomeDemoUser(false);
        setHomeDemoTimeLeft('');
      }
    };

    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [currentUser, language]);

  const activateHomeDemoForCurrentUser = () => {
    if (!currentUser) return;
    setHomeDemoIsSubmitting(true);

    setTimeout(() => {
      const demoExpiryMs = Date.now() + 24 * 60 * 60 * 1000;
      const demoExpiry = new Date(demoExpiryMs).toLocaleString();
      const rawUsers = localStorage.getItem('alwarraq_registered_users');
      let users = [];
      if (rawUsers) {
        try { users = JSON.parse(rawUsers); } catch(e) {}
      }

      let userFound = false;
      users = users.map((u: any) => {
        if (u.email.toLowerCase() === currentUser.email.toLowerCase()) {
          u.isPremiumSubscriber = true;
          u.goldenPrimeStatus = 'approved';
          u.goldenPrimeDemoExpires = demoExpiry;
          u.goldenPrimeDemoExpiresAt = demoExpiryMs;
          userFound = true;
        }
        return u;
      });
      if (!userFound) {
        users.push({
          email: currentUser.email,
          username: currentUser.username,
          role: currentUser.role,
          isPremiumSubscriber: true,
          goldenPrimeStatus: 'approved',
          goldenPrimeDemoExpires: demoExpiry,
          goldenPrimeDemoExpiresAt: demoExpiryMs
        });
      }
      localStorage.setItem('alwarraq_registered_users', JSON.stringify(users));

      // Update current user
      const updatedUser: UserProfile = {
        ...currentUser,
        isPremiumSubscriber: true,
        goldenPrimeStatus: 'approved',
        goldenPrimeDemoExpires: demoExpiry,
        goldenPrimeDemoExpiresAt: demoExpiryMs
      };
      localStorage.setItem('alwarraq_current_user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      setHomeDemoIsSubmitting(false);
      setHomeDemoSuccess(true);

      setTimeout(() => {
        setHomeDemoSuccess(false);
        setActiveCategory('workspace');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    }, 1000);
  };

  const activateInstantGuestDemo = () => {
    setHomeDemoIsSubmitting(true);
    setTimeout(() => {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const email = `guest-investigator-${randomId}@alwarraq.com`;
      const username = `Investigator Guest #${randomId}`;
      const demoExpiryMs = Date.now() + 24 * 60 * 60 * 1000;
      const demoExpiry = new Date(demoExpiryMs).toLocaleString();

      const rawUsers = localStorage.getItem('alwarraq_registered_users');
      let users = [];
      if (rawUsers) {
        try { users = JSON.parse(rawUsers); } catch(e) {}
      }

      const newDemoUser = {
        email,
        username,
        password: 'DemoPassword123!',
        role: 'reader',
        isPremiumSubscriber: true,
        goldenPrimeStatus: 'approved',
        goldenPrimeDemoExpires: demoExpiry,
        goldenPrimeDemoExpiresAt: demoExpiryMs
      };
      users.push(newDemoUser);

      localStorage.setItem('alwarraq_registered_users', JSON.stringify(users));

      // Set current user
      localStorage.setItem('alwarraq_current_user', JSON.stringify(newDemoUser));
      setCurrentUser(newDemoUser);

      setHomeDemoIsSubmitting(false);
      setHomeDemoSuccess(true);

      setTimeout(() => {
        setHomeDemoSuccess(false);
        setActiveCategory('workspace');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1200);
    }, 800);
  };

  const handleHomeDemoSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeDemoUsername || !homeDemoEmail) return;
    setHomeDemoIsSubmitting(true);

    setTimeout(() => {
      const email = homeDemoEmail.trim();
      const username = homeDemoUsername.trim();
      const demoExpiryMs = Date.now() + 24 * 60 * 60 * 1000;
      const demoExpiry = new Date(demoExpiryMs).toLocaleString();

      const rawUsers = localStorage.getItem('alwarraq_registered_users');
      let users = [];
      if (rawUsers) {
        try { users = JSON.parse(rawUsers); } catch(e) {}
      }

      let existing = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        existing.isPremiumSubscriber = true;
        existing.goldenPrimeStatus = 'approved';
        existing.goldenPrimeDemoExpires = demoExpiry;
        existing.goldenPrimeDemoExpiresAt = demoExpiryMs;
      } else {
        const newDemoUser = {
          email,
          username,
          password: 'DemoPassword123!',
          role: 'reader',
          isPremiumSubscriber: true,
          goldenPrimeStatus: 'approved',
          goldenPrimeDemoExpires: demoExpiry,
          goldenPrimeDemoExpiresAt: demoExpiryMs
        };
        users.push(newDemoUser);
      }

      localStorage.setItem('alwarraq_registered_users', JSON.stringify(users));

      // Set current user
      const currentUserProfile: UserProfile = {
        email,
        username,
        role: 'reader',
        isPremiumSubscriber: true,
        goldenPrimeStatus: 'approved',
        goldenPrimeDemoExpires: demoExpiry,
        goldenPrimeDemoExpiresAt: demoExpiryMs
      };
      localStorage.setItem('alwarraq_current_user', JSON.stringify(currentUserProfile));
      setCurrentUser(currentUserProfile);

      setHomeDemoIsSubmitting(false);
      setHomeDemoSuccess(true);

      setTimeout(() => {
        setHomeDemoSuccess(false);
        setHomeDemoUsername('');
        setHomeDemoEmail('');
        setActiveCategory('workspace');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    }, 1200);
  };

  // Sync saved articles to local storage
  const syncSavedArticles = (updatedList: string[]) => {
    if (currentUser) {
      localStorage.setItem(`alwarraq_saved_articles_${currentUser.email}`, JSON.stringify(updatedList));
    }
    setSavedArticleIds(updatedList);
  };

  const handleToggleSaveArticle = (article: Article, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      alert(language === 'ar' 
        ? 'الرجاء تسجيل الدخول أو إنشاء حساب جديد لحفظ هذا المقال.' 
        : 'Please sign in or create an account to bookmark this article.'
      );
      setIsAuthOpen(true);
      return;
    }

    const isSaved = savedArticleIds.includes(article.id);
    let newList: string[];
    if (isSaved) {
      newList = savedArticleIds.filter(id => id !== article.id);
    } else {
      newList = [...savedArticleIds, article.id];
    }
    syncSavedArticles(newList);
  };

  const handleToggleSaveMultipleArticles = (articles: Article[], save: boolean) => {
    if (!currentUser) {
      alert(language === 'ar' 
        ? 'الرجاء تسجيل الدخول أو إنشاء حساب جديد لحفظ هذه المجموعة.' 
        : 'Please sign in or create an account to bookmark this collection.'
      );
      setIsAuthOpen(true);
      return;
    }

    let newList = [...savedArticleIds];
    articles.forEach(art => {
      const isSaved = newList.includes(art.id);
      if (save && !isSaved) {
        newList.push(art.id);
      } else if (!save && isSaved) {
        newList = newList.filter(id => id !== art.id);
      }
    });
    syncSavedArticles(newList);
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchQuery(tag);
    setActiveCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedArticles = useMemo(() => {
    return allArticles.filter(art => savedArticleIds.includes(art.id));
  }, [allArticles, savedArticleIds]);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  
  // Custom Home view banner subscriber parameters
  const [bannerEmail, setBannerEmail] = useState('');
  const [bannerSubscribed, setBannerSubscribed] = useState(false);
  const [bannerTierSelected, setBannerTierSelected] = useState<'free' | 'premium' | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('alwarraq_all_articles', JSON.stringify(allArticles));
  }, [allArticles]);

  useEffect(() => {
    localStorage.setItem('alwarraq_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('alwarraq_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('alwarraq_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('alwarraq_current_user');
    }
  }, [currentUser]);

  // Sync siteDesign and dynamicWidgets on change
  useEffect(() => {
    localStorage.setItem('alwarraq_site_design', JSON.stringify(siteDesign));
    // Propagate layout modes back automatically
    setLayoutMode(siteDesign.layoutMode);
  }, [siteDesign]);

  useEffect(() => {
    localStorage.setItem('alwarraq_dynamic_widgets', JSON.stringify(dynamicWidgets));
  }, [dynamicWidgets]);

  // Synchronize path routing on mount/popstate
  useEffect(() => {
    const handleLocationChange = () => {
      const rawPath = window.location.pathname || '/';
      const cleanPath = rawPath.toLowerCase().replace(/^\/|\/$/g, '');
      if (cleanPath === 'admin') {
        setActiveCategory('admin');
      } else if (cleanPath === 'newsletter') {
        setActiveCategory('newsletter');
      } else if (cleanPath.startsWith('section/')) {
        const cat = cleanPath.substring('section/'.length);
        if (cat) setActiveCategory(cat);
      } else if (cleanPath === 'premium-pricing') {
        setActiveCategory('premium-pricing');
      } else {
        // Safe default unless we are previewing an item or editing.
        // Don't override if category is valid
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Update URL path without reload when activeCategory changes, preserving existing search query/article params
  useEffect(() => {
    const currentPath = window.location.pathname;
    let targetPath = '/';
    if (activeCategory === 'admin') {
      targetPath = '/admin';
    } else if (activeCategory === 'newsletter') {
      targetPath = '/newsletter';
    } else if (activeCategory === 'workspace') {
      targetPath = '/workspace';
    } else if (activeCategory === 'premium-pricing') {
      targetPath = '/premium-pricing';
    } else if (activeCategory !== 'all') {
      targetPath = `/section/${activeCategory}`;
    }

    if (currentPath !== targetPath) {
      try {
        window.history.pushState({ category: activeCategory }, '', targetPath + window.location.search);
      } catch (e) {
        console.warn("History pushState bypassed due to security/sandbox constraints:", e);
      }
    }
  }, [activeCategory]);

  // Use a ref for allArticles to avoid re-triggering this effect when articles list changes
  const allArticlesRef = React.useRef(allArticles);
  useEffect(() => {
    allArticlesRef.current = allArticles;
  }, [allArticles]);

  // Load and synchronize article from URL parameter ?article=xxx on mount/popstate
  useEffect(() => {
    const handleArticleParam = () => {
      const params = new URLSearchParams(window.location.search);
      const articleId = params.get('article');
      if (articleId) {
        const match = allArticlesRef.current.find(a => a.id === articleId);
        if (match) {
          setSelectedArticle(match);
        }
      } else {
        setSelectedArticle(null);
      }
    };
    handleArticleParam();
    window.addEventListener('popstate', handleArticleParam);
    return () => window.removeEventListener('popstate', handleArticleParam);
  }, []);

  // Synchronize browser URL parameter with open selectedArticle state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const existingId = params.get('article');
    
    if (selectedArticle) {
      if (existingId !== selectedArticle.id) {
        params.set('article', selectedArticle.id);
        const newSearch = params.toString();
        try {
          window.history.pushState({ articleId: selectedArticle.id }, '', `${window.location.pathname}?${newSearch}`);
        } catch (e) {
          console.warn("History pushState bypassed due to security/sandbox constraints:", e);
        }
      }
    } else {
      if (existingId) {
        params.delete('article');
        const searchStr = params.toString();
        const suffix = searchStr ? `?${searchStr}` : '';
        try {
          window.history.pushState({ articleId: null }, '', `${window.location.pathname}${suffix}`);
        } catch (e) {
          console.warn("History pushState bypassed due to security/sandbox constraints:", e);
        }
      }
    }
  }, [selectedArticle]);

  // Hero Slider Index pointer
  const [currentSlide, setCurrentSlide] = useState(0);

  const isAr = language === 'ar';

  // Synchronize dynamic AI generated reports from custom back-end database
  useEffect(() => {
    const fetchCustomArticles = async () => {
      try {
        const res = await fetch('/api/news/custom');
        if (res.ok) {
          const customStories = await res.json();
          if (customStories && customStories.length > 0) {
            const combined = [...customStories, ...INITIAL_ARTICLES];
            const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
            setAllArticles(unique);
          }
        }
      } catch (err) {
        console.warn("Backend call bypassed safely. Loading default Al-Warraq offline articles.");
      }
    };
    fetchCustomArticles();

    // Pull database updates periodically in background (every 15s)
    const interval = setInterval(fetchCustomArticles, 15000);
    return () => clearInterval(interval);
  }, []);

  // Update state whenever a new story is created with the AI panel editor
  const handleArticleGenerated = (newArticle: Article) => {
    setAllArticles((prev) => {
      const filtered = prev.filter(story => story.id !== newArticle.id);
      return [newArticle, ...filtered];
    });
    setSelectedArticle(newArticle);
  };

  // Helper to render dynamic widgets based on target location
  const renderWidgetsByLocation = (targetLocation: 'sidebar' | 'footer' | 'header') => {
    const activeWidgets = dynamicWidgets.filter(w => w.isActive && w.location === targetLocation);
    if (activeWidgets.length === 0) return null;

    return (
      <div className={`grid grid-cols-1 ${targetLocation === 'sidebar' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6 my-6`}>
        {activeWidgets.map((w) => {
          let cardStyle = 'border border-zinc-200 bg-white text-black';
          if (w.style === 'charcoal-dark') {
            cardStyle = 'bg-black text-white border border-zinc-800';
          } else if (w.style === 'gold-premium') {
            cardStyle = 'bg-[#fffbeb] text-amber-955 border-2 border-amber-400 font-serif';
          } else if (w.style === 'academic-tint') {
            cardStyle = 'bg-[#f0fdf4] text-emerald-990 border border-emerald-300';
          } else if (w.style === 'bordered-news') {
            cardStyle = 'bg-white text-black border-4 border-double border-black';
          }

          return (
            <div 
              key={w.id} 
              id={`widget-${w.id}`}
              className={`p-6 shadow-none transition-all hover:scale-[1.01] ${cardStyle}`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-[9px] font-extrabold uppercase bg-red-700 text-white px-2 py-0.5 animate-pulse">
                  {isAr ? 'مكوّن مخصّص' : 'DYN COMPONENT'}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 font-bold">ID: {w.id}</span>
              </div>
              <h4 className="font-sans font-black text-sm md:text-base mb-2 select-text leading-tight text-neutral-900 dark:text-neutral-100">
                {isAr ? w.titleAr : w.titleEn}
              </h4>
              <p className="font-sans text-xs opacity-90 leading-relaxed font-semibold mb-3 select-text text-neutral-800 dark:text-neutral-200">
                {isAr ? w.contentAr : w.contentEn}
              </p>
              {w.type === 'interactive-poll' && (
                <div className="space-y-2 mt-4 pt-4 border-t border-dashed border-zinc-300">
                  <span className="font-mono text-[10px] text-zinc-500 font-bold block">
                    {isAr ? 'تصويت القراء المباشر للصحيفة:' : 'Reader Interactive Ballot:'}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => alert(isAr ? 'شكراً لمشاركتك المخلصة.' : 'Poll registered securely.')} className="flex-1 py-1.5 border border-black hover:bg-black hover:text-white font-black text-[10px] cursor-pointer transition-all">
                      {isAr ? 'سديد' : 'Endorse'}
                    </button>
                    <button onClick={() => alert(isAr ? 'شكراً لمشاركتك المخلصة.' : 'Poll registered securely.')} className="flex-1 py-1.5 border border-zinc-400 hover:bg-zinc-100 text-zinc-700 font-black text-[10px] cursor-pointer transition-all">
                      {isAr ? 'تحرّز' : 'Reservation'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Find breaking news to populate the top ticker strip
  const latestBreaking = useMemo(() => {
    return allArticles.find(story => story.isBreaking === true) || allArticles[0] || null;
  }, [allArticles]);

  // Handle Search queries across translated titles and summaries
  const searchFilteredArticles = useMemo(() => {
    const term = searchQuery.toLowerCase().trim();
    const sorted = [...allArticles].sort((a, b) => {
      return parseArabicOrEnglishDate(b.date) - parseArabicOrEnglishDate(a.date);
    });
    if (!term) return sorted;
    return sorted.filter((story) => {
      return (
        story.titleAr.toLowerCase().includes(term) ||
        story.titleEn.toLowerCase().includes(term) ||
        story.summaryAr.toLowerCase().includes(term) ||
        story.summaryEn.toLowerCase().includes(term) ||
        (story.author && story.author.nameAr && story.author.nameAr.toLowerCase().includes(term)) ||
        (story.author && story.author.nameEn && story.author.nameEn.toLowerCase().includes(term)) ||
        (story.tags && story.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    });
  }, [allArticles, searchQuery]);

  // Slides for Slider Section
  const sliderSlides = useMemo(() => {
    // Choose featured or highly viewed articles for the slide gallery
    const filtered = allArticles.filter(story => story.isFeatured || story.id.includes('excl') || story.views > 6000);
    
    // Ensure 'excl-leb-isr-secret-annex' is the absolute first slide in the slider
    const secretAnnexIndex = filtered.findIndex(s => s.id === 'excl-leb-isr-secret-annex');
    let ordered = [...filtered];
    
    if (secretAnnexIndex > -1) {
      const secretAnnexArticle = filtered[secretAnnexIndex];
      const rest = filtered.filter(s => s.id !== 'excl-leb-isr-secret-annex');
      
      const gdpIndex = rest.findIndex(s => s.id === 'desk-gdp');
      if (gdpIndex > -1) {
        const gdpArticle = rest[gdpIndex];
        const restOfArticles = rest.filter(s => s.id !== 'desk-gdp');
        ordered = [secretAnnexArticle, gdpArticle, ...restOfArticles];
      } else {
        ordered = [secretAnnexArticle, ...rest];
      }
    } else {
      const gdpIndex = filtered.findIndex(s => s.id === 'desk-gdp');
      if (gdpIndex > -1) {
        const gdpArticle = filtered[gdpIndex];
        const rest = filtered.filter(s => s.id !== 'desk-gdp');
        ordered = [gdpArticle, ...rest];
      }
    }
    return ordered;
  }, [allArticles]);

  const activeSlide = useMemo(() => {
    if (!sliderSlides || sliderSlides.length === 0) return null;
    const index = (currentSlide >= 0 && currentSlide < sliderSlides.length) ? currentSlide : 0;
    return sliderSlides[index];
  }, [sliderSlides, currentSlide]);

  // Autoslide effect
  useEffect(() => {
    if (sliderSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [sliderSlides]);

  const handleNextSlide = () => {
    if (sliderSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % sliderSlides.length);
  };

  const handlePrevSlide = () => {
    if (sliderSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + sliderSlides.length) % sliderSlides.length);
  };

  // Section categorization lists
  const fifaArticles = useMemo(() => {
    return searchFilteredArticles.filter(story => story.category === 'fifa-2026' || (story.categories && story.categories.includes('fifa-2026')));
  }, [searchFilteredArticles]);

  const exclusivesArticles = useMemo(() => {
    return searchFilteredArticles.filter(story => story.category === 'exclusives' || (story.categories && story.categories.includes('exclusives')));
  }, [searchFilteredArticles]);

  const editorDeskArticles = useMemo(() => {
    return searchFilteredArticles.filter(story => story.category === 'editor-desk' || (story.categories && story.categories.includes('editor-desk')));
  }, [searchFilteredArticles]);

  const translationsArticles = useMemo(() => {
    return searchFilteredArticles.filter(story => story.category === 'translations' || (story.categories && story.categories.includes('translations')));
  }, [searchFilteredArticles]);

  const lebanonArticles = useMemo(() => {
    return searchFilteredArticles.filter(story => story.category === 'lebanon' || (story.categories && story.categories.includes('lebanon')));
  }, [searchFilteredArticles]);

  const middleEastArticles = useMemo(() => {
    return searchFilteredArticles.filter(story => story.category === 'middle-east' || (story.categories && story.categories.includes('middle-east')));
  }, [searchFilteredArticles]);

  const marketsArticles = useMemo(() => {
    return searchFilteredArticles.filter(story => story.category === 'markets' || (story.categories && story.categories.includes('markets')));
  }, [searchFilteredArticles]);

  const telecomArticles = useMemo(() => {
    return searchFilteredArticles.filter(story => story.category === 'telecom-internet' || (story.categories && story.categories.includes('telecom-internet')));
  }, [searchFilteredArticles]);

  const researchArticles = useMemo(() => {
    return searchFilteredArticles.filter(story => story.category === 'research-reports' || (story.categories && story.categories.includes('research-reports')));
  }, [searchFilteredArticles]);

  const sportsArticles = useMemo(() => {
    return searchFilteredArticles.filter(story => story.category === 'sports' || (story.categories && story.categories.includes('sports')));
  }, [searchFilteredArticles]);

  const wellnessArticles = useMemo(() => {
    return searchFilteredArticles.filter(story => story.category === 'wellness-lifestyle' || (story.categories && story.categories.includes('wellness-lifestyle')));
  }, [searchFilteredArticles]);

  // Sliced arrays for rendering on homepage (all) to load at most 2 rows (8 items)
  const displayedFifa = useMemo(() => {
    return activeCategory === 'all' ? fifaArticles.slice(0, 8) : fifaArticles;
  }, [fifaArticles, activeCategory]);

  const displayedExclusives = useMemo(() => {
    return activeCategory === 'all' ? exclusivesArticles.slice(0, 8) : exclusivesArticles;
  }, [exclusivesArticles, activeCategory]);

  const displayedEditorDesk = useMemo(() => {
    return activeCategory === 'all' ? editorDeskArticles.slice(0, 8) : editorDeskArticles;
  }, [editorDeskArticles, activeCategory]);

  const displayedTranslations = useMemo(() => {
    return activeCategory === 'all' ? translationsArticles.slice(0, 8) : translationsArticles;
  }, [translationsArticles, activeCategory]);

  const displayedLebanon = useMemo(() => {
    return activeCategory === 'all' ? lebanonArticles.slice(0, 8) : lebanonArticles;
  }, [lebanonArticles, activeCategory]);

  const displayedMiddleEast = useMemo(() => {
    return activeCategory === 'all' ? middleEastArticles.slice(0, 8) : middleEastArticles;
  }, [middleEastArticles, activeCategory]);

  const displayedMarkets = useMemo(() => {
    return activeCategory === 'all' ? marketsArticles.slice(0, 8) : marketsArticles;
  }, [marketsArticles, activeCategory]);

  const displayedTelecom = useMemo(() => {
    return activeCategory === 'all' ? telecomArticles.slice(0, 8) : telecomArticles;
  }, [telecomArticles, activeCategory]);

  const displayedResearch = useMemo(() => {
    return activeCategory === 'all' ? researchArticles.slice(0, 8) : researchArticles;
  }, [researchArticles, activeCategory]);

  const displayedSports = useMemo(() => {
    return activeCategory === 'all' ? sportsArticles.slice(0, 8) : sportsArticles;
  }, [sportsArticles, activeCategory]);

  const displayedWellness = useMemo(() => {
    return activeCategory === 'all' ? wellnessArticles.slice(0, 8) : wellnessArticles;
  }, [wellnessArticles, activeCategory]);

  // Quick fallback counts (Bypass empty check for InStats & PulseOfTheStreet standalone category views)
  const hasResults = searchFilteredArticles.length > 0 || activeCategory === 'instats' || activeCategory === 'pulse-of-the-street' || activeCategory === 'premium-pricing' || activeCategory === 'alwarraq-investigations' || activeCategory === 'war-room' || activeCategory === 'press-releases' || activeCategory === 'in-case-you-missed-it';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans antialiased selection:bg-black selection:text-white transition-colors duration-500 ${
        layoutMode === 'classic-print'
          ? 'vintage-paper text-[#1c1917]'
          : 'bg-[#fafafa] text-black'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* 1. Header component - Custom alwarraqnews title */}
      <Header
        language={language}
        setLanguage={setLanguage}
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        siteDesign={siteDesign}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
        currentUser={currentUser}
        onAuthClick={() => setIsAuthOpen(true)}
        onLogOut={() => {
          setCurrentUser(null);
          if (activeCategory === 'admin') {
            setActiveCategory('all');
          }
        }}
        onAdminClick={() => {
          setActiveCategory('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. Navigation with dynamic dropdown links and search triggers */}
      <Navigation
        language={language}
        activeCategory={activeCategory}
        setActiveCategory={(catId) => {
          setActiveCategory(catId);
          setSelectedArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        categories={categories}
        currentUser={currentUser}
      />

      {/* 3. Real-time Currency indices and weather widget in Grayscale */}
      <CurrencyAndWeather language={language} />

      {/* 4. Breaking Alerts black ribbon */}
      <BreakingBar
        language={language}
        latestBreaking={latestBreaking}
        onSelectArticle={(article) => setSelectedArticle(article)}
        siteDesign={siteDesign}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        
        {/* If searching or customized view but no content */}
        {!hasResults && activeCategory !== 'admin' ? (
          <div className="text-center py-24 bg-white border-2 border-black p-8 rounded-none max-w-2xl mx-auto">
            <Newspaper size={44} className="mx-auto text-black mb-4" />
            <h3 className="font-extrabold text-black text-xl">
              {isAr ? 'لم نجد مسودات مطابقة لبحثك' : 'No articles found matching query'}
            </h3>
            <p className="text-xs text-zinc-500 mt-2 font-bold max-w-md mx-auto">
              {isAr
                ? 'تأكد من اختيار الكلمات الأساسية، أو انقر فوق رئيس التحرير الآلي لتغطية الموضوع اللحظي.'
                : 'Modify your search tags or click the AI Editor tool on the upper bar to file a report instantly.'}
            </p>
            <button
              onClick={() => setIsGeneratorOpen(true)}
              className="mt-6 bg-black hover:bg-zinc-800 text-white rounded-none text-xs font-black px-6 py-2.5 cursor-pointer uppercase transition-all"
            >
              {isAr ? 'تغطية الملف بالذكاء الاصطناعي كلياً' : 'File this report with AI'}
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Dynamic Breadcrumbs and Simulated Page-Section URL bar */}
            <Breadcrumbs
              language={language}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              categories={categories}
              searchQuery={searchQuery}
            />

            {/* Conditionally render AdminPanel, PulseOfTheStreet, or standard categories */}
            {activeCategory === 'admin' ? (
              <AdminPanel
                language={language}
                articles={allArticles}
                setArticles={setAllArticles}
                categories={categories}
                setCategories={setCategories}
                subscribers={subscribers}
                setSubscribers={setSubscribers}
                siteDesign={siteDesign}
                setSiteDesign={setSiteDesign}
                dynamicWidgets={dynamicWidgets}
                setDynamicWidgets={setDynamicWidgets}
              />
            ) : activeCategory === 'newsletter' ? (
              <Newsletter
                language={language}
                layoutMode={layoutMode}
                subscribers={subscribers}
                setSubscribers={setSubscribers}
              />
            ) : activeCategory === 'in-case-you-missed-it' ? (
              <InCaseYouMissedIt
                language={language}
                onNavigateToSection={(sectionId) => {
                  setActiveCategory(sectionId);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ) : activeCategory === 'sentiment-analysis' ? (
              <SentimentAnalysis
                language={language}
                layoutMode={layoutMode}
              />
            ) : activeCategory === 'what-if-simulator' ? (
              <WhatIfSimulator
                language={language}
                layoutMode={layoutMode}
              />
            ) : activeCategory === 'alwarraq-investigations' ? (
              <AlWarraqInvestigations
                language={language}
                allArticles={allArticles}
                onSelectArticle={(article) => {
                  setSelectedArticle(article);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ) : activeCategory === 'videos' ? (
              <AlWarraqVideos
                language={language}
                allArticles={allArticles}
                currentUser={currentUser}
              />
            ) : activeCategory === 'war-room' ? (
              <WarRoom
                language={language}
                layoutMode={layoutMode}
              />
            ) : activeCategory === 'press-releases' ? (
              <PressReleases
                language={language}
              />
            ) : activeCategory === 'pulse-of-the-street' ? (
              <PulseOfTheStreet
                language={language}
                layoutMode={layoutMode}
                isFullPage={true}
                onNavigateToPulse={() => {
                  setActiveCategory('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ) : activeCategory === 'workspace' ? (
              <GoldenPrimeWorkspace
                language={language}
                currentUser={currentUser}
                allArticles={allArticles}
              />
            ) : activeCategory === 'premium-pricing' ? (
              <PremiumPricing
                language={language}
                currentUser={currentUser}
                onAuthClick={() => setIsAuthOpen(true)}
                onNavigateToWorkspace={() => {
                  setActiveCategory('workspace');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSubscriptionSuccess={() => {
                  // Reload user
                  const raw = localStorage.getItem('alwarraq_current_user');
                  if (raw) {
                    try {
                      setCurrentUser(JSON.parse(raw));
                    } catch (e) {}
                  }
                  setActiveCategory('workspace');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ) : activeCategory === 'saved-articles' ? (
              <section className="space-y-6">
                <div className="border-double-editorial-bottom pb-4 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-xl md:text-2xl tracking-tight flex items-center gap-2">
                    <Bookmark size={20} className="text-amber-500 fill-current" />
                    <span>{isAr ? 'المقالات والتحقيقات المحفوظة' : 'My Saved Articles & Intel'}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? `المجموع: ${savedArticles.length} مادة محفوظة` : `${savedArticles.length} Archives Registered`}
                  </span>
                </div>

                {savedArticles.length === 0 ? (
                  <div className="text-center py-16 border border-zinc-200 bg-zinc-50/50 flex flex-col items-center justify-center space-y-4">
                    <Bookmark size={36} className="text-zinc-300" />
                    <p className="font-sans font-medium text-sm text-zinc-500 max-w-md">
                      {isAr 
                        ? 'لم تحفظ أي مقالات حتى الآن. استخدم زر الحفظ المتوفر في كل بطاقة خبرية لتجميع مستنداتك الخاصة.' 
                        : 'No bookmarked records detected. Utilize the standard bookmark control on any file wire to preserve key intel.'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {savedArticles.map((story) => (
                      <div key={story.id} className="break-inside-avoid">
                        <ArticleCard
                          article={story}
                          layoutMode={layoutMode}
                          language={language}
                          variant="standard"
                          onSelect={(article) => setSelectedArticle(article)}
                          isSaved={savedArticleIds.includes(story.id)}
                          onToggleSave={handleToggleSaveArticle}
                          onTagClick={handleTagClick}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <>
                {/* Admin-Configured Header and Sidebar Component Injection Panels */}
                {activeCategory === 'all' && renderWidgetsByLocation('header')}
                {activeCategory === 'all' && renderWidgetsByLocation('sidebar')}

                {/* UPPER BANNER: ALWARRAQ INVESTIGATIVE DOSSIERS ACCESS */}
                {activeCategory === 'all' && !searchQuery && (
                  <div className="border-4 border-black p-5 md:p-6 bg-amber-50 text-black my-6 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden" id="alwarraq-investigations-access-banner">
                    {/* Retro line pattern watermark */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:100%_4px] pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-stretch gap-6">
                      
                      {/* Left: Headline & Editorial Info */}
                      <div className="flex-1 space-y-4 text-right rtl:text-right ltr:text-left">
                        <div className="flex flex-wrap items-center gap-2 justify-start rtl:justify-start ltr:justify-end">
                          <span className="bg-amber-800 text-white text-[10px] font-mono font-black px-2.5 py-1 uppercase tracking-widest inline-block">
                            {isAr ? 'بوابة التحقيقات الاستقصائية للورّاق' : 'ALWARRAQ INVESTIGATIVE DOSSIERS'}
                          </span>
                          <span className="bg-black text-amber-300 text-[10px] font-mono px-2 py-0.5 font-bold border border-black">
                            {isAr ? 'مستندات حرة وقراءة ممتدة' : 'FREE ARCHIVE & ANALYSIS'}
                          </span>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950 font-sans leading-tight">
                          {isAr 
                            ? 'التحقيقات الاستقصائية الكبرى:' 
                            : 'AlWarraq Special Investigations: Sovereign Gazettes & Boardroom Battles'}
                        </h2>
                        
                        <p className="text-sm md:text-base text-zinc-850 font-serif leading-relaxed max-w-4xl">
                          {isAr 
                            ? 'ولوج مجاني وحصري إلى تقارير معن البرازي العميقة المدعومة بخرائط تفاعلية، وتحليلات الجغرافيا السياسية، ومخططات سوليدير لعام ٢٠٦٩ وصراعات البورصة. تصفّح الأدلة والرسوم البيانية الآن.' 
                            : 'Unrestricted entry to Maan Barazy’s deep-dive archives. Includes interactive geopolitical border templates, historical Solidere 2069 timelines, and Beirut Stock Exchange takeover analysis.'}
                        </p>

                        {/* Summary points of the two big investigations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs font-serif text-zinc-800">
                          <div className="border-r-2 border-amber-800 pr-3 rtl:border-r-2 rtl:pr-3 ltr:border-l-2 ltr:pl-3 ltr:border-r-0">
                            <strong className="block text-zinc-950 font-sans font-bold text-sm mb-1">
                              {isAr ? '١. مأزق اتفاق الإطار والغاز' : '1. Demarcation & Geologic Realities'}
                            </strong>
                            <span>{isAr ? 'تحليل لنتائج بئر قانا المخيبة، ومخاطر الصراع العسكري على جغرافيا البلوكات الجنوبية.' : 'Total’s dry exploratory findings, War Risk Premiums, and sovereign boundary claims.'}</span>
                          </div>
                          
                          <div className="border-r-2 border-red-800 pr-3 rtl:border-r-2 rtl:pr-3 ltr:border-l-2 ltr:pl-3 ltr:border-r-0">
                            <strong className="block text-zinc-950 font-sans font-bold text-sm mb-1">
                              {isAr ? '٢. تمديد سوليدير لعام ٢٠٦٩' : '2. Solidere 2069 Takeover'}
                            </strong>
                            <span>{isAr ? 'كواليس حرب الاستحواذ بين الحرس القديم والتحالف المصرفي لـ SGBL ومصير قلب بيروت.' : 'How Solidere shares peaked above $80, Lollar proxy buys, and Nasser Chammaa vs. Sehnaoui.'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Instant Gateway Button */}
                      <div className="w-full lg:w-80 flex flex-col justify-center items-stretch bg-amber-100/60 p-4 border-2 border-black shrink-0 self-center text-center">
                        <span className="font-mono text-xxs font-black text-amber-900 block mb-2 uppercase tracking-widest">
                          {isAr ? 'الوصول الاستقصائي الحر' : 'UNRESTRICTED CITATION JOURNAL'}
                        </span>
                        
                        <button
                          onClick={() => {
                            setActiveCategory('alwarraq-investigations');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full bg-black hover:bg-zinc-850 text-white font-mono text-xs font-black py-3 px-4 uppercase border-2 border-black tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_rgba(217,119,6,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1"
                        >
                          <Compass size={15} className="animate-spin-slow text-amber-400" />
                          <span>
                            {isAr ? 'تصفح التحقيقات والرسوم ➜' : 'VIEW SPECIAL REPORTS ➜'}
                          </span>
                        </button>
                        
                        <p className="text-[10px] text-zinc-600 mt-3 font-mono">
                          {isAr ? 'شامل الرسوم البيانية ومقارنات الحدود السيادية' : 'Includes interactive timeline matrices'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* LOWER BANNER: GOLDEN PRIME WORKSPACE & 24H DEMO ACCOUNT ACCESS */}
                {activeCategory === 'all' && !searchQuery && (
                  <div className="border-4 border-red-800 p-5 md:p-6 bg-stone-900 text-white my-6 relative shadow-[8px_8px_0px_0px_rgba(153,27,27,1)] overflow-hidden" id="premium-home-banner">
                    {/* Retro watermark lines */}
                    <div className="absolute inset-0 bg-[radial-gradient(#991b1b_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-stretch gap-6">
                      
                      {/* Left: Branding & Message */}
                      <div className="flex-1 space-y-4 text-right rtl:text-right ltr:text-left">
                        <div className="flex flex-wrap items-center gap-2 justify-start rtl:justify-start ltr:justify-end">
                          <span className="bg-red-800 text-white text-[10px] font-mono font-black px-2.5 py-1 uppercase tracking-widest inline-block animate-pulse">
                            {isAr ? 'بوابة التحليلات ومساحة عمل جولدن برايم' : 'GOLDEN PRIME ANALYTICS & SOVEREIGN TELEMETRY'}
                          </span>
                          <span className="bg-zinc-800 text-amber-400 text-[10px] font-mono px-2 py-1 font-bold border border-amber-500/20">
                            {isAr ? 'ترقية فورية ٢٠٢٦' : 'LEVEL-1 INTEL EXPEDITED'}
                          </span>
                        </div>
                        
                        <h2 className="text-2xl md:text-3.5xl font-black tracking-tight text-white font-sans leading-tight">
                          {isAr 
                            ? 'أطلق أدوات لوحة تحليلات جولدن برايم ومحاكي "ماذا لو" الجغرافي' 
                            : 'Unlock Golden Prime Analytics & Geopolitical What-If Simulator'}
                        </h2>
                        
                        <p className="text-sm md:text-base text-zinc-300 font-serif leading-relaxed max-w-3xl">
                          {isAr 
                            ? 'بث فوري لتدفقات الأموال ومكافحة غسيل الأموال اللبنانية (AML Tracker)، وأدوات المحاكاة الاستراتيجية الجيو سياسية المتقدمة. قم بتنشيط حساب تجريبي فوري لـ ٢٤ ساعة دون قيود.' 
                            : 'Instantaneous telemetry of the anti-money laundering (AML) database, deep flow-of-funds trackers, and advanced strategic geopolitical simulators. Activate your instant 24-hour trial bypass.'}
                        </p>

                        {/* Interactive Status indicators */}
                        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono justify-start rtl:justify-start ltr:justify-end">
                          <div className="flex items-center gap-1.5 text-zinc-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>{isAr ? 'حالة البوابة: متصل' : 'Sovereign Port: ONLINE'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-zinc-400">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <span>{isAr ? 'رتبة الدخول الحالية:' : 'Access Level:'} {currentUser ? (currentUser.isPremiumSubscriber ? (isAr ? 'عضو جولدن برايم' : 'Golden Prime Member') : (isAr ? 'قارئ عادي' : 'Standard Reader')) : (isAr ? 'زائر غير مسجل' : 'Unregistered Guest')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Direct Controls */}
                      <div className="w-full lg:w-96 flex flex-col justify-center gap-3 bg-zinc-950 p-4 md:p-5 border-2 border-red-800 shrink-0 self-center">
                        
                        {/* Demo/Redirect Section */}
                        {homeDemoSuccess ? (
                          <div className="p-4 bg-emerald-950/40 border border-emerald-500 text-white text-center space-y-2 animate-fade-in">
                            <span className="text-emerald-400 text-lg">⚡</span>
                            <strong className="block text-xs uppercase font-mono font-black text-emerald-400">
                              {isAr ? 'تم التحقق والتنشيط!' : 'SOVEREIGN TUNNEL READY!'}
                            </strong>
                            <p className="text-xxs text-zinc-300 font-mono">
                              {isAr ? 'جاري إعادة التوجيه الفوري لمساحة العمل...' : 'EXPEDITING GATEWAY ROUTE NOW...'}
                            </p>
                          </div>
                        ) : isHomeDemoUser ? (
                          <div className="p-3 bg-zinc-900 border border-amber-600 text-center space-y-2.5">
                            <span className="bg-amber-600 text-black text-[9px] font-mono font-black px-2 py-0.5 uppercase tracking-wider inline-block">
                              {isAr ? 'الحساب التجريبي نشط حالياً' : 'DEMO ACCOUNT RUNNING'}
                            </span>
                            <div className="font-mono text-xs font-bold text-amber-400">
                              ⏱ {isAr ? 'الوقت المتبقي:' : 'TIME LEFT:'} {homeDemoTimeLeft}
                            </div>
                            <button
                              onClick={() => {
                                setActiveCategory('workspace');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xxs font-black py-2 uppercase border border-black cursor-pointer shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                            >
                              {isAr ? 'الذهاب لمساحة العمل الفاخرة ➜' : 'ENTER PREMIUM WORKSPACE ➜'}
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2.5">
                            {/* Demo Button for instant redirect */}
                            <button
                              disabled={homeDemoIsSubmitting}
                              onClick={currentUser ? activateHomeDemoForCurrentUser : activateInstantGuestDemo}
                              className="w-full bg-amber-600 hover:bg-amber-500 text-black font-mono text-xs font-black py-3 px-4 uppercase border-2 border-black tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_rgba(255,255,255,0.9)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 disabled:opacity-50"
                            >
                              <Zap size={15} className="fill-current animate-bounce" />
                              <span>
                                {homeDemoIsSubmitting 
                                  ? (isAr ? 'جاري التنشيط والولوج...' : 'ACTIVATING TUNNEL...') 
                                  : (isAr ? 'تشغيل حساب تجريبي ٢٤ ساعة (ولوج فوري) ⚡' : 'TRY 24H INSTANT FREE DEMO ⚡')}
                              </span>
                            </button>
                            <p className="text-[10px] text-zinc-400 text-center font-mono uppercase tracking-tight">
                              {isAr ? '* تفعيل فوري بضغطة واحدة دون الحاجة لبطاقة ائتمان' : '* 1-click bypass, no payment or card requested'}
                            </p>
                          </div>
                        )}

                        {/* Separator line */}
                        <div className="border-t border-zinc-800 my-1"></div>

                        {/* Interactive Buttons: Sign Up Premium + Menu Button */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              setActiveCategory('premium-pricing');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="bg-red-800 hover:bg-red-700 text-white font-mono text-xxs font-black py-2 px-3 border border-black uppercase transition-all hover:translate-y-[-1px] cursor-pointer text-center"
                          >
                            {isAr ? 'الاشتراك الفاخر ★' : 'PREMIUM PLANS ★'}
                          </button>

                          <button
                            onClick={() => setIsBannerMenuOpen(!isBannerMenuOpen)}
                            className={`font-mono text-xxs font-black py-2 px-3 border border-black uppercase transition-all flex items-center justify-center gap-1 cursor-pointer text-center ${
                              isBannerMenuOpen ? 'bg-amber-500 text-black border-amber-600' : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                            }`}
                          >
                            <Menu size={12} />
                            <span>{isAr ? 'دليل المزايا ☰' : 'FEATURE MENU ☰'}</span>
                          </button>
                        </div>

                      </div>
                    </div>

                    {/* Expandable Menu Panel */}
                    {isBannerMenuOpen && (
                      <div className="mt-5 pt-5 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 animate-fade-in relative z-10 text-right rtl:text-right ltr:text-left">
                        
                        <div 
                          onClick={() => {
                            setActiveCategory('workspace');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-3 cursor-pointer transition-all flex items-center justify-between group text-right rtl:text-right ltr:text-left"
                        >
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] text-zinc-500 uppercase block">{isAr ? 'لوحة البيانات الكبرى' : 'PRIMARY ANALYTICS'}</span>
                            <span className="text-xs font-black text-white group-hover:text-amber-400 block">{isAr ? 'مساحة العمل البحثية' : 'Research Workspace'}</span>
                          </div>
                          {isHomeDemoUser || (currentUser && currentUser.isPremiumSubscriber) ? (
                            <Unlock size={14} className="text-emerald-400" />
                          ) : (
                            <Lock size={14} className="text-amber-500" />
                          )}
                        </div>

                        <div 
                          onClick={() => {
                            setActiveCategory('what-if-simulator');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-3 cursor-pointer transition-all flex items-center justify-between group text-right rtl:text-right ltr:text-left"
                        >
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] text-zinc-500 uppercase block">{isAr ? 'المحاكاة الجغرافية' : 'STRATEGIC GAMEPLAY'}</span>
                            <span className="text-xs font-black text-white group-hover:text-amber-400 block">{isAr ? 'محاكي "ماذا لو"' : 'What-If Simulator'}</span>
                          </div>
                          {isHomeDemoUser || (currentUser && currentUser.isPremiumSubscriber) ? (
                            <Unlock size={14} className="text-emerald-400" />
                          ) : (
                            <Lock size={14} className="text-amber-500" />
                          )}
                        </div>

                        <div 
                          onClick={() => {
                            setActiveCategory('alwarraq-investigations');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-3 cursor-pointer transition-all flex items-center justify-between group text-right rtl:text-right ltr:text-left"
                        >
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] text-zinc-500 uppercase block">{isAr ? 'ملفات خاصة حصرية' : 'EXCLUSIVE INQUIRIES'}</span>
                            <span className="text-xs font-black text-white group-hover:text-amber-400 block">{isAr ? 'التحقيقات الكبرى' : 'Investigations Hub'}</span>
                          </div>
                          <Unlock size={14} className="text-emerald-400" />
                        </div>

                        <div 
                          onClick={() => {
                            setActiveCategory('pulse-of-the-street');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-3 cursor-pointer transition-all flex items-center justify-between group text-right rtl:text-right ltr:text-left"
                        >
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] text-zinc-500 uppercase block">{isAr ? 'استقصاء الرأي العام' : 'CIVIC PUBLIC PULSE'}</span>
                            <span className="text-xs font-black text-white group-hover:text-amber-400 block">{isAr ? 'نبض الشارع والمشاعر' : 'Pulse & Sentiment'}</span>
                          </div>
                          <Unlock size={14} className="text-emerald-400" />
                        </div>

                        <div 
                          onClick={() => {
                            setActiveCategory('newsletter');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-3 cursor-pointer transition-all flex items-center justify-between group text-right rtl:text-right ltr:text-left"
                        >
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] text-zinc-500 uppercase block">{isAr ? 'بث تيلكس فوري' : 'TELETYPE TELEGRAM'}</span>
                            <span className="text-xs font-black text-white group-hover:text-amber-400 block">{isAr ? 'نشرة التيلكس' : 'Telex Newsletter'}</span>
                          </div>
                          <Unlock size={14} className="text-emerald-400" />
                        </div>

                      </div>
                    )}

                  </div>
                )}

                {/* NARRATIVE LEBANON CRISIS INFOGRAPHICS DASHBOARD */}
                {activeCategory === 'all' && !searchQuery && (
                  <NarrativeLebanonCrisisInfographics
                    language={language}
                    articles={allArticles}
                    onSelectArticle={(article) => setSelectedArticle(article)}
                  />
                )}

                {/* HERO SLIDER AND TRENDING SIDEBAR SECTION (Replaces static hero layout) */}
                {activeCategory === 'all' && !searchQuery && sliderSlides.length > 0 && activeSlide && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column (8/12) - Slider */}
                    <div className="lg:col-span-8 w-full">
                      <section className="relative overflow-hidden border-4 border-double border-black p-4 bg-white">
                        {/* Section header indicator */}
                        <div className="flex justify-between items-center pb-2.5 mb-4 border-b border-zinc-200">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-black rounded-none inline-block"></span>
                            <span className="font-mono text-xxs tracking-widest font-black uppercase">
                              {isAr ? 'شريط العناوين البارزة وسلسلة التحقيقات' : 'Al-Warraq Premium Slider Gallery'}
                            </span>
                          </div>
                          <span className="font-mono text-xxs font-black text-zinc-400">
                            {String(currentSlide + 1).padStart(2, '0')} / {String(sliderSlides.length).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Main Slider Panel */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                          {/* Slider Copy */}
                          <div className="md:col-span-5 flex flex-col justify-between h-full py-2">
                            <div>
                              {/* Meta info info */}
                              <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest block mb-2 font-mono">
                                {activeSlide.category === 'editor-desk'
                                  ? (isAr ? 'هيئة تحرير صحيفة الوارّاق' : 'Al-Warraq Editorial Board')
                                  : (isAr ? `تغطية برئاسة: ${activeSlide.author?.nameAr || ''}` : `Filed by: ${activeSlide.author?.nameEn || ''}`)}
                              </span>

                              {/* Heading title */}
                              <h2 className="text-xl md:text-2xl lg:text-3.5xl font-black text-black leading-tight tracking-tight hover:underline cursor-pointer mb-4 font-sans"
                                  onClick={() => setSelectedArticle(activeSlide)}>
                                {isAr ? activeSlide.titleAr : activeSlide.titleEn}
                              </h2>

                              {/* Brief line */}
                              <p className="text-zinc-650 text-xs md:text-sm leading-relaxed mb-6 font-medium line-clamp-4">
                                {isAr ? activeSlide.summaryAr : activeSlide.summaryEn}
                              </p>
                            </div>

                            {/* Navigation Actions and Trigger */}
                            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-4">
                              <button 
                                onClick={() => setSelectedArticle(activeSlide)}
                                className="bg-black hover:bg-zinc-800 text-white font-black text-xs px-5 py-2.5 rounded-none cursor-pointer transition-colors"
                              >
                                {isAr ? 'مطالعة الفكر والتحرير الكامل' : 'Read Full Editorial'}
                              </button>

                              {/* Slide controllers */}
                              <div className="flex items-center gap-1.5">
                                <button 
                                  onClick={handlePrevSlide}
                                  className="w-8 h-8 rounded-none border border-black flex items-center justify-center hover:bg-zinc-100 cursor-pointer transition-colors text-black"
                                >
                                  {isAr ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                                </button>
                                <button 
                                  onClick={handleNextSlide}
                                  className="w-8 h-8 rounded-none border border-black flex items-center justify-center hover:bg-zinc-100 cursor-pointer transition-colors text-black"
                                >
                                  {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Slider Image (Strictly Grayscaled B&W) */}
                          <div 
                            onClick={() => setSelectedArticle(activeSlide)}
                            className="md:col-span-7 relative h-[250px] md:h-[380px] overflow-hidden border border-black cursor-pointer group/img transition-all"
                            title={isAr ? "انقر لقراءة التغطية والمخطوطة كاملة" : "Click to read the complete investigation & draft"}
                          >
                            <img 
                              src={activeSlide.imageUrl} 
                              alt="featured slider" 
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80";
                              }}
                              className="w-full h-full object-cover bw-image transition-transform duration-700 group-hover/img:scale-103"
                            />
                            {activeSlide.isBreaking && (
                              <span className="absolute top-4 right-4 bg-black text-white text-[9px] font-black tracking-widest px-2.5 py-1 uppercase border border-white font-mono">
                                {isAr ? 'تقرير عاجل' : 'EXCL REPORT'}
                              </span>
                            )}
                          </div>
                        </div>
                      </section>
                    </div>

                    {/* Right Column (4/12) - Trending Sidebar Widget */}
                    <div className="lg:col-span-4 w-full">
                      <TrendingWidget
                        articles={allArticles}
                        language={language}
                        layoutMode={layoutMode}
                        onSelectArticle={(article) => setSelectedArticle(article)}
                      />
                    </div>
                  </div>
                )}

                {/* STANDALONE WAR ROOM INTRO SECTION UNDER SLIDER */}
                {activeCategory === 'all' && !searchQuery && (
                  <div className="my-8 border-4 border-double border-red-600 bg-zinc-950 p-6 text-white shadow-[6px_6px_0px_rgba(220,38,38,0.15)] relative overflow-hidden" id="war-room-introduction-banner">
                    {/* Glowing pulse indicator */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1 font-mono text-xxs font-black tracking-widest uppercase">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                      <span>{isAr ? 'عاجل - جبهة مشتعلة' : 'LIVE CONFLICT ALERT'}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-8 space-y-4">
                        <div className="flex items-center gap-2">
                          <Flame className="text-orange-500 animate-pulse" size={24} />
                          <h3 className="font-sans font-black text-xl md:text-2xl text-white">
                            {isAr ? 'غرفة الحرب الجيوسياسية للورّاق' : 'Al-Warraq Geopolitical War Room'}
                          </h3>
                        </div>

                        <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-medium">
                          {isAr 
                            ? 'بوابة الرصد العملياتي والتحليلات العسكرية الميدانية الفورية. تابع تحركات الجيوش، الاستخبارات اللوجستية، خرائط السيطرة، وتقدير المواقف الاستراتيجي في الشرق الأوسط وممرات الطاقة الحيوية.'
                            : 'Real-time operational monitoring, military intel, and tactical briefings. Track troop movements, logistics intelligence, control maps, and strategic assessments of active hot zones and maritime energy corridors.'
                          }
                        </p>

                        {/* Interactive Sneak Peek Bullet */}
                        <div className="bg-zinc-900/80 border border-zinc-800 p-3.5 space-y-2 text-right rtl:text-right ltr:text-left">
                          <span className="text-[10px] font-mono font-black text-orange-400 uppercase tracking-wider block">
                            {isAr ? 'آخر تحديث تكتيكي' : 'Latest Tactical Dossier'}
                          </span>
                          <h4 className="font-bold text-xs md:text-sm text-white hover:underline cursor-pointer" onClick={() => { setActiveCategory('war-room'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                            {isAr 
                              ? 'تصاعد التوترات العسكرية بين الولايات المتحدة وإيران وتهديد اتفاق وقف إطلاق النار (مضيق هرمز)'
                              : 'US-Iran Military Tensions Escalate: Strait of Hormuz Ceasefire Accord Under Imminent Collapse'
                            }
                          </h4>
                          <p className="text-zinc-400 text-xxs leading-relaxed line-clamp-2">
                            {isAr
                              ? 'شهدت منطقة مضيق هرمز تصعيداً عسكرياً خطيراً وتبادلاً مكثفاً للضربات بين القوات الأمريكية وإيران، مما يهدد بانهيار مذكرة التفاهم واتفاق وقف إطلاق النار الذي وُقّع قبل نحو 10 أيام فقط لإنهاء الحرب بين البلدين.'
                              : 'A dangerous military escalation in the Strait of Hormuz has triggered intense direct strikes between US forces and Iran, threatening the complete collapse of the historic ceasefire and MOU.'
                            }
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-4 flex flex-col justify-center items-center md:items-end gap-3">
                        <button
                          onClick={() => {
                            setActiveCategory('war-room');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-black text-xs px-6 py-3.5 tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-[4px_4px_0px_#7f1d1d]"
                        >
                          <Flame size={14} className="animate-bounce" />
                          <span>{isAr ? 'دخول غرفة الحرب والخرائط التكتيكية' : 'Access Tactical War Room'}</span>
                        </button>
                        <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest">
                          {isAr ? 'مستويات التهديد: حرجة جداً' : 'Threat Assessment: CRITICAL'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

            {/* COHESIVE UNIFIED SYNDICATE MEMBERSHIP & DEMO TRIAL BANNER */}
            {activeCategory === 'all' && !searchQuery && (
              <section className="border-4 border-amber-600 p-6 bg-zinc-950 text-white my-6 shadow-[5px_5px_0px_0px_#d97706] text-left rtl:text-right relative overflow-hidden animate-fade-in">
                {/* Background design elements */}
                <div className="absolute top-0 right-0 w-32 h-full bg-amber-500/5 transform skew-x-12 pointer-events-none"></div>
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-1 text-[11.5px] font-mono tracking-wider uppercase font-black">
                      ⚡ {isAr ? 'ديوان الورّاق للمشتركين والفترة التجريبية الفاخرة' : 'AL-WARRAQ SYNDICATE & SOVEREIGN DEMO PORT'}
                    </div>
                    
                    <h3 className="font-sans font-black text-2xl md:text-3xl uppercase text-white leading-tight flex items-center gap-2">
                      <Sparkles size={24} className="text-[#f59e0b] animate-pulse shrink-0" />
                      <span>
                        {isAr 
                          ? 'انضم إلى شبكة التحقيقات وأطلق فترتك التجريبية الفاخرة فوراً' 
                          : 'JOIN THE WIRE & LAUNCH YOUR INSTANT 24H TRIAL PERIOD'}
                      </span>
                    </h3>
                    
                    <p className="text-zinc-100 font-serif text-[16px] leading-relaxed">
                      {isAr 
                        ? 'تجاوز فترات الانتظار والترشيح الطويلة! انضم لشبكتنا الصحفية المستقلة وقم بتنشيط حسابك التجريبي الفوري لـ غولدن برايم لمدة ٢٤ ساعة للوصول المباشر إلى مصادر المستندات السيادية والمسودة البحثية الفاخرة، أو انضم لنشرة تيلكس المجانية.'
                        : 'Bypass long verification buffers! Join our independent press syndicate and activate an instant 24-hour Golden Prime demo trial to operate the full-stack research dashboard, utilize interactive compilation tools, or subscribe to our free briefs.'}
                    </p>

                    {/* Benefit Tiers Checkboxes - Font +2pt, Grey to White */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-[13px] text-white">
                      <div className="bg-zinc-900 border border-zinc-800 p-3 flex items-start gap-2.5">
                        <span className="text-amber-400 font-bold shrink-0 text-sm">✉</span>
                        <div>
                          <strong className="block text-white text-sm">{isAr ? 'الديوان المجاني (ديوان التيلكس)' : 'FREE BRIEFING'}</strong>
                          <span className="text-white text-[12px] leading-snug block mt-0.5">{isAr ? 'نشرات يومية برأس مال تحليلي وموجز مبسط.' : 'Daily briefing bulletins delivered straight to your mailbox.'}</span>
                        </div>
                      </div>
                      <div className="bg-zinc-900 border border-zinc-800 p-3 flex items-start gap-2.5">
                        <span className="text-amber-400 font-bold shrink-0 text-sm">★</span>
                        <div>
                          <strong className="block text-amber-300 text-sm">{isAr ? 'العضوية الفاخرة (دعم صيرورة وصكوك)' : 'SOVEREIGN PREMIUM'}</strong>
                          <span className="text-white text-[12px] leading-snug block mt-0.5">{isAr ? 'فتح التحقيقات السيادية، وإشعارات حية، وتيلكس كربوني.' : 'Unrestricted investigative access, report breach alerts & live updates.'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Dynamic Action Card Column (5/12) */}
                  <div className="lg:col-span-5 bg-zinc-900 border-2 border-amber-500 p-5 shadow-[4px_4px_0_0_rgba(217,119,6,0.15)] space-y-4">
                    <span className="font-mono text-[11px] text-white block uppercase font-extrabold tracking-wider">
                      {isAr ? 'بوابة التحكم والولوج الفوري للمنصة' : 'DEMO CONTROL & SUBSCRIBER PORT'}
                    </span>

                    {homeDemoSuccess ? (
                      <div className="p-4 bg-amber-500/10 border-2 border-amber-600 text-white rounded-none space-y-2 text-center animate-fade-in">
                        <strong className="block text-sm uppercase font-sans font-black text-amber-300">
                          ⚡ {isAr ? 'تم تنشيط الحساب التجريبي بنجاح!' : 'DEMO ACTIVATED SUCCESSFULLY!'}
                        </strong>
                        <p className="text-[13px] font-serif leading-relaxed">
                          {isAr 
                            ? 'جاري نقلكم مباشرة إلى مساحة العمل البحثية لتصفح الوثائق واستخدام المسودة...'
                            : 'Redirecting you directly to the workspace to run inquiries and compile briefs...'}
                        </p>
                      </div>
                    ) : isHomeDemoUser ? (
                      <div className="p-4 bg-zinc-950 border-2 border-emerald-600 text-white rounded-none space-y-3 text-center">
                        <strong className="block text-sm uppercase font-sans font-black text-emerald-400">
                          {isAr ? '✓ حسابك التجريبي الفوري نشط الآن!' : '✓ YOUR INSTANT DEMO ACCOUNT IS ACTIVE!'}
                        </strong>
                        <div className="font-mono text-sm font-black text-amber-400 tracking-wider flex items-center justify-center gap-2 bg-zinc-900 px-3 py-1.5 border border-amber-500/30">
                          <span>⏱</span>
                          <span>{isAr ? 'الوقت المتبقي:' : 'TIME REMAINING:'} {homeDemoTimeLeft}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategory('workspace');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs font-black py-2.5 px-4 uppercase tracking-wider transition-all w-full shadow-[2px_2px_0px_0px_#10b981] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                        >
                          {isAr ? 'دخول مساحة العمل البحثية ⚡' : 'ENTER RESEARCH WORKSPACE ⚡'}
                        </button>
                      </div>
                    ) : bannerSubscribed ? (
                      <div className="p-4 bg-zinc-950 border-2 border-emerald-500 text-white rounded-none space-y-2 text-center">
                        <strong className="block text-sm uppercase font-sans font-black text-emerald-400">
                          {isAr ? '✓ تم تسجيل حضورك في الديوان!' : '✓ WELCOME TO AL-WARRAQ REGISTER!'}
                        </strong>
                        <p className="text-[13px] font-serif leading-relaxed">
                          {bannerTierSelected === 'premium' ? (
                            isAr 
                              ? `تم إدراج بريدك (${bannerEmail}) في قوائم البث والتحقق الفوري. نوجهك الآن لتنشيط حسابك السنوي وترقية رتبتك الاستراتيجية.`
                              : `Excellent! Your designated mail (${bannerEmail}) is verified. Moving you directly to our sovereign premium dashboard to activate your strategic access.`
                          ) : (
                            isAr 
                              ? `تم بنجاح إلحاق بريدك (${bannerEmail}) بسجل المشتركين في الديوان. ستتلقى أول بث تيلكس استراتيجي في النشرة القادمة.`
                              : `Subscription active! Your destination (${bannerEmail}) has been successfully cached in the Al-Warraq mailing database.`
                          )}
                        </p>
                      </div>
                    ) : currentUser ? (
                      <div className="space-y-4 text-center py-2">
                        <p className="text-[13.5px] font-sans font-semibold text-white leading-normal">
                          {isAr 
                            ? `مرحباً بك، ${currentUser.username || currentUser.email}. يمكنك بنقرة واحدة تنشيط دخولك التجريبي المجاني والكامل لكافة الأدوات الاستقصائية.`
                            : `Welcome, ${currentUser.username || currentUser.email}. With a single click, activate your instant 24-hour trial period to access all premium investigative services.`}
                        </p>
                        <button
                          type="button"
                          disabled={homeDemoIsSubmitting}
                          onClick={activateHomeDemoForCurrentUser}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs font-black py-3 px-4 border border-black uppercase tracking-wider transition-all cursor-pointer shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 w-full flex items-center justify-center gap-2"
                        >
                          <span>{homeDemoIsSubmitting ? (isAr ? 'جاري التنشيط والاعتماد...' : 'ACTIVATING DEMO...') : (isAr ? 'تنشيط وتشغيل الحساب التجريبي مجاناً ⚡' : 'ACTIVATE INSTANT FREE DEMO ⚡')}</span>
                        </button>
                      </div>
                    ) : (
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          // Fallback triggers direct demo signup on general submit
                          handleHomeDemoSignupSubmit(e);
                        }} 
                        className="space-y-3"
                      >
                        <div className="space-y-1 text-left rtl:text-right">
                          <label className="block text-[11px] font-mono uppercase font-black text-white">
                            {isAr ? 'اسم الباحث' : 'Researcher Name'}
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Maan Barazy"
                            value={homeDemoUsername}
                            onChange={(e) => setHomeDemoUsername(e.target.value)}
                            className="w-full text-xs p-2.5 border border-amber-500 bg-zinc-950 text-white font-bold placeholder-zinc-500 outline-none focus:border-white"
                          />
                        </div>

                        <div className="space-y-1 text-left rtl:text-right">
                          <label className="block text-[11px] font-mono uppercase font-black text-white">
                            {isAr ? 'البريد الإلكتروني للديوان' : 'Registry Email Address'}
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="researcher@example.com"
                            value={homeDemoEmail}
                            onChange={(e) => {
                              setHomeDemoEmail(e.target.value);
                              setBannerEmail(e.target.value);
                            }}
                            className="w-full text-xs p-2.5 border border-amber-500 bg-zinc-950 text-white font-semibold placeholder-zinc-500 outline-none focus:border-white"
                          />
                        </div>

                        {/* Interactive Buttons for Single Combined Form */}
                        <div className="flex flex-col gap-2 pt-2">
                          <button
                            type="button"
                            disabled={homeDemoIsSubmitting}
                            onClick={handleHomeDemoSignupSubmit}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs font-black py-3 px-4 border border-black uppercase tracking-wider transition-all cursor-pointer shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 w-full flex items-center justify-center gap-1.5"
                          >
                            <span>⚡ {isAr ? 'تنشيط الدخول التجريبي المجاني (٢٤ ساعة)' : 'ACTIVATE FREE 24H TRIAL'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const cleanMail = homeDemoEmail.trim().toLowerCase();
                              if (!cleanMail || !cleanMail.includes('@')) {
                                alert(isAr ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address.');
                                return;
                              }
                              if (!subscribers.includes(cleanMail)) {
                                setSubscribers([...subscribers, cleanMail]);
                              }
                              setBannerSubscribed(true);
                              setBannerTierSelected('free');
                            }}
                            className="bg-zinc-950 hover:bg-zinc-900 text-white font-mono text-xs font-black py-2.5 px-3 border border-amber-500/60 uppercase text-center select-none cursor-pointer transition-colors w-full flex items-center justify-center gap-1.5"
                          >
                            <span>✉ {isAr ? 'الاشتراك في نشرة التيلكس فقط' : 'SUBSCRIBE TO TELEX WIRE ONLY'}</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </section>
            )}



            {/* Pulse of the Street (ثمن الصراع) Custom Feature Section */}
            {activeCategory === 'all' && !searchQuery && (
              <PulseOfTheStreet 
                language={language} 
                layoutMode={layoutMode} 
                isFullPage={false}
                onNavigateToPulse={() => {
                  setActiveCategory('pulse-of-the-street');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* CONDITIONAL SUB SECTIONS FOR MAIN PAGE (PINTEREST MASONRY GRID 4-IN-A-ROW) */}
            
            {/* SECTION 1: EXCLUSIVES (انفرادات صحفية) */}
            {(activeCategory === 'all' || activeCategory === 'exclusives') && exclusivesArticles.length > 0 && (
              <section className="space-y-5">
                <div className="border-double-editorial-bottom pb-2 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
                    <Sparkles size={18} className="text-black shrink-0" />
                    <span>{isAr ? 'التحقيقات الصحفية' : 'Exclusive Bulletins & Enquiries'}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? `المطالع: ${exclusivesArticles.length} خبر` : `${exclusivesArticles.length} Filed Records`}
                  </span>
                </div>

                {/* Full-width Row for FIFA Feature Article */}
                {displayedExclusives.find(s => s.id === 'fifa-polymarket-struggle-2026') && (() => {
                  const fifaFeature = displayedExclusives.find(s => s.id === 'fifa-polymarket-struggle-2026')!;
                  return (
                    <div className="w-full bg-red-50/40 p-4 md:p-6 border-2 border-red-800 shadow-[6px_6px_0px_0px_rgba(153,27,27,1)] relative transition-all hover:scale-[1.002] mb-6">
                      <div className="absolute top-0 right-0 bg-red-800 text-white font-sans font-black text-[9px] md:text-[10px] uppercase px-3 py-1 tracking-widest z-10">
                        {isAr ? 'تحقيق مميز عاجل' : 'FEATURED SPECIAL INVESTIGATION'}
                      </div>
                      <ArticleCard
                        article={fifaFeature}
                        layoutMode={layoutMode}
                        language={language}
                        variant="lead"
                        onSelect={(article) => setSelectedArticle(article)}
                        isSaved={savedArticleIds.includes(fifaFeature.id)}
                        onToggleSave={handleToggleSaveArticle}
                        onTagClick={handleTagClick}
                      />
                    </div>
                  );
                })()}

                {/* Remaining Exclusives in a 4-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                  {displayedExclusives
                    .filter((story) => story.id !== 'fifa-polymarket-struggle-2026')
                    .map((story) => (
                      <div key={story.id} className="break-inside-avoid flex flex-col justify-between">
                        <ArticleCard
                          article={story}
                          layoutMode={layoutMode}
                          language={language}
                          variant="standard"
                          onSelect={(article) => setSelectedArticle(article)}
                          isSaved={savedArticleIds.includes(story.id)}
                          onToggleSave={handleToggleSaveArticle}
                          onTagClick={handleTagClick}
                        />
                      </div>
                    ))}
                </div>

                {/* SOLIDERE DEEP-DIVE ARCHIVES FOR EXCLUSIVES TAB ONLY */}
                {activeCategory === 'exclusives' && !searchQuery && (
                  <div className="mt-10 pt-10 border-t-4 border-double border-zinc-900">
                    <div className="bg-zinc-900 text-white p-5 border border-zinc-800 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-amber-500 rounded-none inline-block"></span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-amber-500 font-bold">
                          {isAr ? 'قسم أرشيف تحقيقات سوليدير ٢٠٦٩ الحصرية' : 'EXCLUSIVE SOLIDERE 2069 DEEP-DIVE DOSSIER'}
                        </span>
                      </div>
                      <h4 className="text-xl font-black font-sans mt-2">
                        {isAr ? 'الجدول الزمني والتحقيق التفاعلي لشركة سوليدير ومستندات الأراضي' : 'Interactive Solidere Extension Timeline & Beirut Bourse Stock Tracker'}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-2 max-w-4xl leading-relaxed">
                        {isAr 
                          ? 'تفاصيل تمديد مرسوم سوليدير التفاعلي لعام ٢٠٦٩ وتأثيره على قلب العاصمة وحرب الاستحواذ الدائرة بين أنطون صحناوي والحرس القديم، مع وثائق المحاضر القضائية.'
                          : 'A chronological interactive outline of Solidere’s legal mandates and the corporate takeover battle on the Beirut Stock Exchange between Antoun Sehnaoui and the old guard.'}
                      </p>
                    </div>
                    
                    <div className="border-4 border-black bg-white text-black p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <SolidereInfographic
                        language={language}
                        articles={allArticles}
                        onSelectArticle={(article) => setSelectedArticle(article)}
                      />
                    </div>
                  </div>
                )}

                {/* REDIRECT READ MORE */}
                {activeCategory === 'all' && exclusivesArticles.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                    <button
                      onClick={() => {
                        setActiveCategory('exclusives');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'طالع كامل تحقيقات الملف ←' : 'Read More in Exclusives →'}</span>
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 2: FROM THE EDITOR'S DESK (من طاولة رئيس التحرير) */}
            {(activeCategory === 'all' || activeCategory === 'editor-desk') && editorDeskArticles.length > 0 && (
              <section className="space-y-5">
                <div className="border-double-editorial-bottom pb-2 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
                    <Feather size={18} className="text-black shrink-0" />
                    <span>{isAr ? 'من رئيس التحرير' : "From the Editor-in-Chief\'s Desk"}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? 'إصدارات فكرية دورية' : 'Intellectual Columns'}
                  </span>
                </div>

                {/* 4 Cards in a Row masonry style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedEditorDesk.map((story) => (
                    <div key={story.id} className="break-inside-avoid">
                      <ArticleCard
                        article={story}
                        layoutMode={layoutMode}
                        language={language}
                        variant="opinion"
                        onSelect={(article) => setSelectedArticle(article)}
                        isSaved={savedArticleIds.includes(story.id)}
                        onToggleSave={handleToggleSaveArticle}
                        onTagClick={handleTagClick}
                      />
                    </div>
                  ))}
                </div>

                {/* REDIRECT READ MORE */}
                {activeCategory === 'all' && editorDeskArticles.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                    <button
                      onClick={() => {
                        setActiveCategory('editor-desk');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'طالع كامل زاوية رئيس التحرير ←' : "Read More from Chief Editor's Desk →"}</span>
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 2.5: TRANSLATIONS (ترجمات - مجلة فورين بوليسي والصحافة العالمية) */}
            {/* High-Impact "Golden Prime Research Engine" & Magazine/Newsletter Promo Sections */}
            {activeCategory === 'all' && !searchQuery && (
              <section 
                className="relative overflow-hidden border-4 border-black p-6 bg-zinc-950 text-white my-6 animate-fade-in"
              >
                {/* Visual Terminal / Grid Decoration */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.1)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-30"></div>
                <div className="absolute top-0 right-0 w-48 h-full bg-amber-500/5 transform skew-x-12 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-right rtl:text-right ltr:text-left">
                  <div className="space-y-3 flex-1">
                    <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 text-[10px] font-mono tracking-widest uppercase">
                      <Sparkles size={11} className="animate-pulse text-amber-400" />
                      <span>{isAr ? 'منصة الأبحاث السيادية الذكية' : 'AI-NATIVE SOVEREIGN WORKSPACE'}</span>
                    </div>
                    
                    <h3 className="font-sans font-black text-xl md:text-2xl text-white tracking-tight leading-tight uppercase">
                      {isAr 
                        ? 'نقدم لكم: محرك الأبحاث الذكي "غولدن برايم"' 
                        : 'Introducing: The Golden Prime Research Engine'}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs md:text-[13px] max-w-3xl leading-relaxed font-sans">
                      {isAr 
                        ? 'هذا ليس مجرد منبر للأخبار—إنه مساحتك الخاصة والآمنة لرفع مستنداتك الخارجية، وتوليف البيانات الاستقصائية والسيادية الحية، وتشكيل تقاريرك الاستخباراتية بالتكامل مع نموذج ذكاء اصطناعي مخصص ومعزز بأدوات التحرير المتقدمة.'
                        : 'This is not just news delivery—it’s a secure, private intelligence workspace. Upload external documents, synthesize real-time research against our live sovereign indexes, and draft complete briefs side-by-side with our tailored research models.'}
                    </p>

                    <div className="flex flex-wrap gap-4 text-[11px] font-mono text-zinc-500 font-bold uppercase pt-1">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500">✓</span>
                        <span>{isAr ? 'خزانة المستندات المستقلة' : 'Independent Source Vault'}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500">✓</span>
                        <span>{isAr ? 'توليف ومقاطعة البيانات الموجهة' : 'Source-Grounded AI Synthesis'}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500">✓</span>
                        <span>{isAr ? 'محرر ومسودة صياغة التقارير' : 'Live Report Compiler Canvas'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setActiveCategory('premium-pricing');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-amber-600 hover:bg-amber-500 text-white font-sans font-black text-xs px-6 py-4 uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#fff]"
                    >
                      <span>{isAr ? 'انضم إلى غولدن برايم الآن' : 'APPLY FOR GOLDEN PRIME'}</span>
                      <ArrowRight size={14} className="rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {activeCategory === 'all' && !searchQuery && (
              <section 
                onClick={() => {
                  setActiveCategory('newsletter');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="relative overflow-hidden border-4 border-black p-6 bg-zinc-950 text-white my-6 cursor-pointer group hover:border-red-650 transition-colors"
              >
                {/* Visual Accent Lines */}
                <div className="absolute top-0 right-0 w-32 h-full bg-red-600/10 transform skew-x-12 pointer-events-none"></div>
                <div className="absolute bottom-0 left-12 w-64 h-1/3 bg-zinc-800/10 transform -skew-x-12 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Left Column: Cover Preview Art */}
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    {/* Compact CSS Magazine Mock */}
                    <div className="relative w-16 h-22 bg-white border-2 border-black flex flex-col justify-between p-1.5 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] shrink-0 transform -rotate-2 group-hover:rotate-0 transition-transform">
                      <div className="border-b border-black pb-0.5 text-center">
                        <span className="font-sans font-black text-[8px] uppercase tracking-tighter text-black">
                          {isAr ? 'الورّاق' : 'AL-WARRAQ'}
                        </span>
                      </div>
                      <div className="h-8 bg-zinc-105 border border-zinc-300 flex items-center justify-center text-zinc-500 text-[6px] font-mono">
                        {isAr ? 'طبعة ٢٠٢٦' : 'ISSUE 18'}
                      </div>
                      <div className="flex justify-between items-center text-[5px] font-black text-red-600">
                        <span>PRINT</span>
                        <span>06/17</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="bg-red-700 text-white text-[9px] font-sans font-bold px-2 py-0.5 uppercase tracking-wider font-mono">
                        {isAr ? 'الصحيفة المطبوعة والملخص الفكري الأسبوعي' : 'QUARTERLY PRINT & TELEX DIRECT'}
                      </span>
                      <h3 className="font-sans font-black text-lg md:text-xl text-white mt-1.5 leading-tight group-hover:text-red-400 transition-colors">
                        {isAr 
                          ? 'ديوان ورثة المحبرة: تصفح ملخص التحقيقات المطبوع بالكامل' 
                          : 'The Sovereign Intelligence Dispatch: Access June Quarterly Edition'}
                      </h3>
                      <p className="text-zinc-400 text-xs mt-1 max-w-xl font-medium">
                        {isAr 
                          ? 'استكشف طبعة الصحافة الحرة للتحقيقات الاستقصائية المستقلة ومقالات رئيس التحرير لعام ٢٠٢٦، متوفرة مجاناً لمشتركينا.' 
                          : 'Explore deep structural breakdowns, sovereign asset updates, and monetary maps compiled by our editorial office.'}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Link / Action Call-To-Action */}
                  <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-end shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCategory('newsletter');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-red-700 hover:bg-red-600 text-white border border-red-600 font-mono font-black text-xs px-6 py-3.5 uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] group-hover:shadow-[3px_3px_0px_0px_rgba(239,68,68,1)]"
                    >
                      <span>{isAr ? 'طالعة الطبعة الكاملة' : 'OPEN WIRE DISPATCH'}</span>
                      <ArrowRight size={14} className="rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {(activeCategory === 'all' || activeCategory === 'translations') && translationsArticles.length > 0 && (
              <section className="space-y-5">
                <div className="border-double-editorial-bottom pb-2 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
                    <Globe size={18} className="text-black shrink-0" />
                    <span>{isAr ? 'ترجمات وصحافة دولية' : 'Translations & Global Press'}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? 'مقالات من فورين بوليسي والصحافة العالمية' : 'Foreign Policy & Global Features'}
                  </span>
                </div>

                {/* 4 Cards in a Row masonry style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedTranslations.map((story) => (
                    <div key={story.id} className="break-inside-avoid">
                      <ArticleCard
                        article={story}
                        layoutMode={layoutMode}
                        language={language}
                        variant="opinion"
                        onSelect={(article) => setSelectedArticle(article)}
                        isSaved={savedArticleIds.includes(story.id)}
                        onToggleSave={handleToggleSaveArticle}
                        onTagClick={handleTagClick}
                      />
                    </div>
                  ))}
                </div>

                {/* REDIRECT READ MORE */}
                {activeCategory === 'all' && translationsArticles.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                    <button
                      onClick={() => {
                        setActiveCategory('translations');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'طالع كامل قسم الترجمات ←' : 'Read More Translations →'}</span>
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 3: LEBANON NEWS (أخبار وأكاديميات لبنان) */}
            {(activeCategory === 'all' || activeCategory === 'lebanon') && lebanonArticles.length > 0 && (
              <section className="space-y-5">
                <div className="border-double-editorial-bottom pb-2 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
                    <Newspaper size={18} className="text-black shrink-0" />
                    <span>{isAr ? 'أخبار وقضايا لبنان والشرق الأدنى' : 'Lebanon & Levant Bureau'}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? 'تغطية بيروت الحية' : 'Beirut Wire Feed'}
                  </span>
                </div>

                {/* 4 Cards in a Row masonry style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedLebanon.map((story) => (
                    <div key={story.id} className="break-inside-avoid">
                      <ArticleCard
                        article={story}
                        layoutMode={layoutMode}
                        language={language}
                        variant="standard"
                        onSelect={(article) => setSelectedArticle(article)}
                        isSaved={savedArticleIds.includes(story.id)}
                        onToggleSave={handleToggleSaveArticle}
                        onTagClick={handleTagClick}
                      />
                    </div>
                  ))}
                </div>

                {/* Comparative Money Laundering Risk Visualization Section */}
                <div className="py-6">
                  <LebanonAMLVisualizer language={language} layoutMode={layoutMode} />
                </div>

                {/* REDIRECT READ MORE */}
                {activeCategory === 'all' && lebanonArticles.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                    <button
                      onClick={() => {
                        setActiveCategory('lebanon');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'طالع كامل ملف الشؤون اللبنانية ←' : 'Read More in Lebanon Bureau →'}</span>
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* THE TEASER BANNER INTRODUCING CONSUMER SENTIMENT SCRAPER */}
            {(activeCategory === 'all' || activeCategory === 'lebanon') && (
              <div 
                id="sentiment-promotional-banner" 
                className="border-4 border-black p-5 bg-zinc-50 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] my-6"
              >
                {/* Decorative retro tag */}
                <div className="absolute top-0 right-0 bg-[#b91c1c] text-white font-mono text-[9px] px-3 py-1 uppercase font-black tracking-widest">
                  {isAr ? 'الاستخبارات الفورية' : 'AI SENTIMENT TELEMETRY'}
                </div>
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                      <span className="font-mono text-xxs font-extrabold text-[#b91c1c] uppercase tracking-wider">
                        {isAr ? 'مؤشر رضا الرأي العام: بيروت الرقمية (+68)' : 'LEBANESE TECH DISCOURSE RADAR (+68)'}
                      </span>
                    </div>
                    
                    <h4 className="font-sans font-black text-sm md:text-base text-black tracking-tight leading-snug uppercase">
                      {isAr 
                        ? 'نموذج محاكاة الرأي العام وقياس رضا الشارع الرقمي (ديوان رصد المشاعر)' 
                        : 'EXPLORE MULTI-PLATFORM SENTIMENT FEED & OSINT ANALYSIS'}
                    </h4>
                    
                    <p className="text-xs text-zinc-650 leading-relaxed font-serif">
                      {isAr 
                        ? 'تحليل إحصائي معقد لنسب التقييم الإيجابي والسلبي للمؤسسات والبنية التحتية والحدث الرياضي بلبنان. يدمج البث المباشر الموحد لـ 12 ناقل عبر ست منصات رائدة بدعم الذكاء الاصطناعي.' 
                        : 'Explore real-time data harvesting across major sub-networks detailing user sentiment, public satisfaction, and discussion heatmaps regarding local tech hubs (BDD) and sovereign institutions.'}
                    </p>

                    {/* Brief bullet findings */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="bg-white border border-zinc-250 p-2 text-left rounded-xs">
                        <span className="block font-mono text-[8px] text-zinc-400 font-bold uppercase">{isAr ? 'الهدف الرئيسي' : 'TRACKED ASSET'}</span>
                        <span className="font-sans font-extrabold text-[10px] text-black">Beirut Digital District (BDD)</span>
                      </div>
                      <div className="bg-white border border-zinc-250 p-2 text-left rounded-xs">
                        <span className="block font-mono text-[8px] text-zinc-400 font-bold uppercase">{isAr ? 'المشاعر المهيمنة' : 'DOMINANT INSIGHT'}</span>
                        <span className="font-sans font-extrabold text-[10px] text-emerald-600">🟢 Positive Tech Resilience</span>
                      </div>
                      <div className="bg-white border border-zinc-250 p-2 text-left rounded-xs">
                        <span className="block font-mono text-[8px] text-zinc-400 font-bold uppercase">{isAr ? 'الكلمات الرائجة' : 'TOP COGNITIVE TAG'}</span>
                        <span className="font-sans font-extrabold text-[10px] text-black">#infrastructure #beirut</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 w-full md:w-auto">
                    <button
                      onClick={() => {
                        setActiveCategory('sentiment-analysis');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full bg-[#b91c1c] hover:bg-black text-white font-mono font-black text-xxs tracking-widest uppercase py-3 px-5 border-2 border-black cursor-pointer transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none flex items-center justify-center gap-1.5"
                    >
                      <span>{isAr ? 'إطلاق ديوان رصد المشاعر الكامل ←' : 'LAUNCH SENTIMENT WIRE DECK →'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3A: ARAB MARKETS INDICATORS (مؤشرات الأسواق العربية) */}
            {(activeCategory === 'all' || activeCategory === 'lebanon') && (
              <section className="space-y-5">
                <ArabMarketsIndicators language={language} layoutMode={layoutMode} />
              </section>
            )}

            {/* SECTION 3B: IN STATS - Al-Warraq Interactive Economic Panel */}
            {(activeCategory === 'all' || activeCategory === 'instats') && (
              <section className="space-y-5">
                <InStats 
                  language={language} 
                  layoutMode={layoutMode} 
                  onSelectArticle={(article) => setSelectedArticle(article)} 
                />
                
                {/* REDIRECT READ MORE */}
                {activeCategory === 'all' && (
                  <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                    <button
                      onClick={() => {
                        setActiveCategory('instats');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'عرض اللوحات الإحصائية التفاعلية بالكامل ←' : 'Read More in In Stats Board →'}</span>
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 4: MIDDLE EAST (أخبار وشؤون الشرق الأوسط) */}
            {(activeCategory === 'all' || activeCategory === 'middle-east') && middleEastArticles.length > 0 && (
              <section className="space-y-5">
                <div className="border-double-editorial-bottom pb-2 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
                    <Globe size={18} className="text-black shrink-0" />
                    <span>{isAr ? 'شؤون الشرق الأوسط' : 'Middle East Core Affairs'}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? 'مراسلات قارية' : 'Regional Telex'}
                  </span>
                </div>

                {/* 4 Cards in a Row masonry style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedMiddleEast.map((story) => (
                    <div key={story.id} className="break-inside-avoid">
                      <ArticleCard
                        article={story}
                        layoutMode={layoutMode}
                        language={language}
                        variant="standard"
                        onSelect={(article) => setSelectedArticle(article)}
                        isSaved={savedArticleIds.includes(story.id)}
                        onToggleSave={handleToggleSaveArticle}
                        onTagClick={handleTagClick}
                      />
                    </div>
                  ))}
                </div>

                {/* REDIRECT READ MORE */}
                {activeCategory === 'all' && middleEastArticles.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                    <button
                      onClick={() => {
                        setActiveCategory('middle-east');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'طالع بقية برقيات شؤون الشرق الأوسط ←' : 'Read More in Middle East →'}</span>
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 5: MARKETS (الأسواق وبورصات المعادن والسلع) */}
            {(activeCategory === 'all' || activeCategory === 'markets') && marketsArticles.length > 0 && (
              <section className="space-y-5">
                <div className="border-double-editorial-bottom pb-2 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
                    <TrendingUp size={18} className="text-black shrink-0" />
                    <span>{isAr ? 'أسواق المال' : 'Markets and Sovereign Finances'}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? 'بورصات المعادن والنفط' : 'Commodity Indices'}
                  </span>
                </div>

                {/* 4 Cards in a Row masonry style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedMarkets.map((story) => (
                    <div key={story.id} className="break-inside-avoid">
                      <ArticleCard
                        article={story}
                        layoutMode={layoutMode}
                        language={language}
                        variant="standard"
                        onSelect={(article) => setSelectedArticle(article)}
                        isSaved={savedArticleIds.includes(story.id)}
                        onToggleSave={handleToggleSaveArticle}
                        onTagClick={handleTagClick}
                      />
                    </div>
                  ))}
                </div>

                {/* REDIRECT READ MORE */}
                {activeCategory === 'all' && marketsArticles.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                    <button
                      onClick={() => {
                        setActiveCategory('markets');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'طالع كامل صفحات حركة الأسواق ←' : 'Read More in Markets & Indices →'}</span>
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* STANDALONE PRESS RELEASES PREVIEW SECTION AFTER MARKETS */}
            {activeCategory === 'all' && !searchQuery && PRESS_RELEASES.length > 0 && (
              <section className="space-y-5 my-8">
                <div className="border-double-editorial-bottom pb-2 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
                    <Megaphone size={18} className="text-zinc-800 shrink-0 animate-bounce" />
                    <span>{isAr ? 'البيانات الصحفية وإيجازات مجلس الإدارة' : 'Press Releases & Official Advisories'}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? 'إعلانات الشركة والمنتجات السيادية' : 'Corporate Bulletins'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PRESS_RELEASES.map((release) => (
                    <div 
                      key={release.id} 
                      className="border-2 border-black p-5 bg-zinc-50 hover:bg-white transition-all duration-200 flex flex-col justify-between shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] cursor-pointer"
                      onClick={() => {
                        setActiveCategory('press-releases');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xxs font-mono font-bold border-b border-zinc-200 pb-2">
                          <span className="text-amber-600 tracking-wider uppercase">
                            {isAr ? release.categoryAr : release.categoryEn}
                          </span>
                          <span className="text-zinc-400">
                            {isAr ? release.dateAr : release.dateEn}
                          </span>
                        </div>
                        <h4 className="font-sans font-black text-base text-black hover:underline leading-snug line-clamp-2">
                          {isAr ? release.titleAr : release.titleEn}
                        </h4>
                        <p className="text-zinc-600 text-xs leading-relaxed line-clamp-3">
                          {isAr ? release.excerptAr : release.excerptEn}
                        </p>
                      </div>
                      <div className="pt-4 flex items-center gap-1.5 text-xs font-black text-black font-mono border-t border-zinc-100 mt-4">
                        <span>{isAr ? 'قراءة البيان الكامل ←' : 'Read Full Announcement →'}</span>
                        <span className="text-[10px] text-zinc-400 font-normal">
                          ({isAr ? release.locationAr : release.locationEn})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                  <button
                    onClick={() => {
                      setActiveCategory('press-releases');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <span>{isAr ? 'الذهاب إلى منصة البيانات الصحفية ←' : 'Browse Press Releases Hub →'}</span>
                  </button>
                </div>
              </section>
            )}

            {/* SECTION 6: TELECOMMUNICATIONS & INTERNET (اتصالات وإنترنت) */}
            {(activeCategory === 'all' || activeCategory === 'telecom-internet') && telecomArticles.length > 0 && (
              <section className="space-y-5">
                <div className="border-double-editorial-bottom pb-2 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
                    <Cpu size={18} className="text-black shrink-0" />
                    <span>{isAr ? 'لاتصالات والإنترنت' : 'Telecom & Internet'}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? 'برقيات البنية التحتية والشبكات' : 'Telecom & Networking Wires'}
                  </span>
                </div>

                {/* 4 Cards in a Row masonry style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedTelecom.map((story) => (
                    <div key={story.id} className="break-inside-avoid">
                      <ArticleCard
                        article={story}
                        layoutMode={layoutMode}
                        language={language}
                        variant="standard"
                        onSelect={(article) => setSelectedArticle(article)}
                        isSaved={savedArticleIds.includes(story.id)}
                        onToggleSave={handleToggleSaveArticle}
                        onTagClick={handleTagClick}
                      />
                    </div>
                  ))}
                </div>

                {/* REDIRECT READ MORE */}
                {activeCategory === 'all' && telecomArticles.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                    <button
                      onClick={() => {
                        setActiveCategory('telecom-internet');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'صفحات الاتصالات والإنترنت ←' : 'Read More in Telecom →'}</span>
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 7: RESEARCH & REPORTS (أبحاث وتقارير) */}
            {(activeCategory === 'all' || activeCategory === 'research-reports') && researchArticles.length > 0 && (
              <section className="space-y-5">
                <div className="border-double-editorial-bottom pb-2 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
                    <BookOpen size={18} className="text-black shrink-0" />
                    <span>{isAr ? 'أبحاث ودراساة' : 'Research & Reports'}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? 'بيانات المركز الوطني' : 'Quantitative & Policy Analytics'}
                  </span>
                </div>

                {/* 4 Cards in a Row masonry style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedResearch.map((story) => (
                    <div key={story.id} className="break-inside-avoid">
                      <ArticleCard
                        article={story}
                        layoutMode={layoutMode}
                        language={language}
                        variant="standard"
                        onSelect={(article) => setSelectedArticle(article)}
                        isSaved={savedArticleIds.includes(story.id)}
                        onToggleSave={handleToggleSaveArticle}
                        onTagClick={handleTagClick}
                      />
                    </div>
                  ))}
                </div>

                {/* REDIRECT READ MORE */}
                {activeCategory === 'all' && researchArticles.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                    <button
                      onClick={() => {
                        setActiveCategory('research-reports');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'طالع كامل ملفات الأبحاث والمسوح ←' : 'Read More Research & Reports →'}</span>
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 8: SPORTS (رياضة) */}
            {(activeCategory === 'all' || activeCategory === 'sports') && sportsArticles.length > 0 && (
              <section className="space-y-5">
                <div className="border-double-editorial-bottom pb-2 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
                    <Trophy size={18} className="text-black shrink-0" />
                    <span>{isAr ? 'الرياضة والنهضة الفكرية والشبابية' : 'Sports & Intellectual Athletics'}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? 'أرشيف وتكتيكات' : 'Leagues & Historical Archival Athletics'}
                  </span>
                </div>

                {/* 4 Cards in a Row masonry style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedSports.map((story) => (
                    <div key={story.id} className="break-inside-avoid">
                      <ArticleCard
                        article={story}
                        layoutMode={layoutMode}
                        language={language}
                        variant="standard"
                        onSelect={(article) => setSelectedArticle(article)}
                        isSaved={savedArticleIds.includes(story.id)}
                        onToggleSave={handleToggleSaveArticle}
                        onTagClick={handleTagClick}
                      />
                    </div>
                  ))}
                </div>

                {/* REDIRECT READ MORE */}
                {activeCategory === 'all' && sportsArticles.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                    <button
                      onClick={() => {
                        setActiveCategory('sports');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'طالع بقية برقيات الرياضة ←' : 'Read More in Sports →'}</span>
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* SECTION: FIFA 2026 (فيفا 2026) moved under Sports */}
            {(activeCategory === 'all' || activeCategory === 'fifa-2026') && fifaArticles.length > 0 && (
              <section className="space-y-5">
                <div className="border-double-editorial-bottom pb-2 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
                    <Trophy size={18} className="text-black shrink-0" />
                    <span>{isAr ? 'فيفا كأس العالم 2026' : 'FIFA World Cup 2026'}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? 'تغطية حية وحصرية' : 'Live Tournament Feed'}
                  </span>
                </div>

                {/* 4 Cards in a Row masonry style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedFifa.map((story) => (
                    <div key={story.id} className="break-inside-avoid">
                      <ArticleCard
                        article={story}
                        layoutMode={layoutMode}
                        language={language}
                        variant="standard"
                        onSelect={(article) => setSelectedArticle(article)}
                        isSaved={savedArticleIds.includes(story.id)}
                        onToggleSave={handleToggleSaveArticle}
                        onTagClick={handleTagClick}
                      />
                    </div>
                  ))}
                </div>

                {/* REDIRECT READ MORE */}
                {activeCategory === 'all' && fifaArticles.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                    <button
                      onClick={() => {
                        setActiveCategory('fifa-2026');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'طالع كامل صفحات فيفا 2026 ←' : 'Read More in FIFA 2026 →'}</span>
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 9: WELLNESS & LIFESTYLE (صحة وأسلوب حياة) */}
            {(activeCategory === 'all' || activeCategory === 'wellness-lifestyle') && wellnessArticles.length > 0 && (
              <section className="space-y-5">
                <div className="border-double-editorial-bottom pb-2 flex justify-between items-center text-black">
                  <h3 className="font-sans font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
                    <Heart size={18} className="text-black shrink-0" />
                    <span>{isAr ? 'الصحة' : 'Curae News'}</span>
                  </h3>
                  <span className="font-mono text-xxs font-bold text-zinc-500">
                    {isAr ? 'عادات معمرين وأثر البيئة' : 'Mediterranean Longevity & Modern City Senses'}
                  </span>
                </div>

                {/* 4 Cards in a Row masonry style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedWellness.map((story) => (
                    <div key={story.id} className="break-inside-avoid">
                      <ArticleCard
                        article={story}
                        layoutMode={layoutMode}
                        language={language}
                        variant="standard"
                        onSelect={(article) => setSelectedArticle(article)}
                        isSaved={savedArticleIds.includes(story.id)}
                        onToggleSave={handleToggleSaveArticle}
                        onTagClick={handleTagClick}
                      />
                    </div>
                  ))}
                </div>

                {/* REDIRECT READ MORE */}
                {activeCategory === 'all' && wellnessArticles.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-dashed border-zinc-200">
                    <button
                      onClick={() => {
                        setActiveCategory('wellness-lifestyle');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 border border-black hover:bg-black hover:text-white font-sans font-extrabold text-[11px] uppercase cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'طالع ملفات النقاء والعافية ←' : 'Read More in Wellness →'}</span>
                    </button>
                  </div>
                )}
              </section>
            )}

          </>
        )}

            {/* BOTTOM NEWSLETTER SIGNUP AND PERSISTENCE METADATA - ALL GRAYSCALE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-black select-none">
              
              {/* Daily Newsletter signup */}
              <div className="bg-zinc-100 border-2 border-black p-6 flex flex-col justify-center items-center text-center">
                <span className="text-sm font-extrabold text-black mb-2 uppercase tracking-wide">
                  {isAr ? 'نشرة الوارّاق اليومية الكلاسيكية' : 'Al-Warraq Premium Daily Telex'}
                </span>
                <p className="text-xxs text-zinc-500 mb-4 font-bold max-w-sm">
                  {isAr 
                    ? 'اشتراك مباشر في أهم برقيات رئيس التحرير وأسرار المخطوطات الفكرية لليوم.' 
                    : 'Subscribe to receive the Editor\'s selected daily wire and political drafts.'}
                </p>

                {newsletterSubscribed ? (
                  <p className="text-xs text-black font-black bg-zinc-200 border border-black px-4 py-2">
                    {isAr ? '✓ نشكر اهتمامكم، تم تلقي عنوانكم وبث أول تيلكس.' : '✓ Access Granted! The first telegraph has been dispatched.'}
                  </p>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const sanitized = newsletterEmail.trim();
                      if (sanitized) {
                        setNewsletterSubscribed(true);
                        setSubscribers((prev) => {
                          if (prev.includes(sanitized)) return prev;
                          return [...prev, sanitized];
                        });
                      }
                    }}
                    className="space-y-2.5 w-full max-w-md"
                  >
                    <input 
                      type="email" 
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={isAr ? 'بريدك الإلكتروني التوثيقي' : 'Enter your registered email'} 
                      className="w-full text-xs p-2.5 border-2 border-black outline-none bg-white font-bold text-black text-center"
                    />
                    <button 
                      type="submit"
                      className="bg-black hover:bg-zinc-800 text-white text-[11px] font-black w-full py-2.5 cursor-pointer uppercase transition-all tracking-wider border border-black"
                    >
                      {isAr ? 'انضم لديوان المتابعين' : 'Register Subscription'}
                    </button>
                  </form>
                )}
              </div>

              {/* Informational heritage card */}
              <div className="bg-zinc-50 border-2 border-dashed border-black p-6 flex flex-col justify-center">
                <span className="font-black text-black text-sm block mb-2 uppercase">
                  {isAr ? 'حلقة النشر وتاريخ الطباعة' : 'The Tradition of Al-Warraq'}
                </span>
                <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                  {isAr 
                    ? 'الورَّاق: هو لقب صانعي الكتب ونساخي المحفوظات ومنسقي الفكر العربي القديم. تستلهم منصة "الوارق للأخبار" هذا الإرث لتضعه في إطار تقني حديث ذو لون أحادي صارم (Black & White)، متخلية عن تسييل الألوان وزخم الإعلانات لصالح جمالية الكلمة والتحليل المهني الرصين.'
                    : 'Al-Warraq is the historical title given to publishers, manuscript scribes, and philosophy editors in early Arabic history. Our platform revives this classic heritage through a strict monochrome ink format, giving precedence to high-impact truth over colorful visual noise.'}
                </p>
              </div>

            </div>

            {/* Admin Dynamic Footer Widgets Area */}
            {activeCategory === 'all' && renderWidgetsByLocation('footer')}

          </div>
        )}
      </main>

      {/* Reader Modal details room */}
      {selectedArticle && (
        <ArticleViewer
          article={selectedArticle}
          layoutMode={layoutMode}
          language={language}
          currentUser={currentUser}
          onClose={() => setSelectedArticle(null)}
          onAuthClick={() => setIsAuthOpen(true)}
          onSubscribeClick={() => { setSelectedArticle(null); setActiveCategory('premium-pricing'); }}
          allArticles={allArticles}
          onSelectArticle={(art) => setSelectedArticle(art)}
          savedArticleIds={savedArticleIds}
          onToggleSaveMultipleArticles={handleToggleSaveMultipleArticles}
          onTagClick={handleTagClick}
        />
      )}

      {/* AI News Editorial builder */}
      {isGeneratorOpen && (
        <AIPanel
          language={language}
          onClose={() => setIsGeneratorOpen(false)}
          onArticleGenerated={handleArticleGenerated}
        />
      )}

      {/* User Login and Sign Up Modal */}
      <UserAuthModal
        isOpen={isAuthOpen}
        language={language}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
          if (user?.role === 'admin') {
            setActiveCategory('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
}
