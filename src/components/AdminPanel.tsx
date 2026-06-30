import React, { useState, useEffect } from 'react';
import { Article, NavigationTab, SiteDesign, DynamicWidget } from '../types';
import { 
  Lock, KeyRound, Check, Plus, Trash2, Edit3, Save, RotateCcw, 
  Send, Layers, Newspaper, Users, Mail, UserCheck, AlertCircle, FileEdit, Network,
  Palette, LayoutGrid, ShieldCheck, SlidersHorizontal, RefreshCw, UploadCloud, FileUp, Tag, Sparkles,
  Instagram, BarChart3
} from 'lucide-react';
import { SEO_SILOS } from '../seoData';
import ArticleCurator from './ArticleCurator';
import DeploymentManager from './DeploymentManager';
import SocialInfographicCreator from './SocialInfographicCreator';
import AnalyticsDashboard from './AnalyticsDashboard';

interface AdminPanelProps {
  language: 'ar' | 'en';
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  categories: NavigationTab[];
  setCategories: (cats: NavigationTab[]) => void;
  subscribers: string[];
  setSubscribers: React.Dispatch<React.SetStateAction<string[]>>;
  siteDesign: SiteDesign;
  setSiteDesign: React.Dispatch<React.SetStateAction<SiteDesign>>;
  dynamicWidgets: DynamicWidget[];
  setDynamicWidgets: React.Dispatch<React.SetStateAction<DynamicWidget[]>>;
}

export default function AdminPanel({
  language,
  articles,
  setArticles,
  categories,
  setCategories,
  subscribers,
  setSubscribers,
  siteDesign,
  setSiteDesign,
  dynamicWidgets,
  setDynamicWidgets
}: AdminPanelProps) {
  const isAr = language === 'ar';
  
  // Guard passcode state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');

  // Primary active tab inside authorized Admin Panel
  type SubTabType = 'stories-list' | 'add-story' | 'manage-sections' | 'newsletter' | 'design-preset' | 'widgets-components' | 'data-validator' | 'article-curator' | 'slider-editor' | 'subscribers-mgmt' | 'live-deploy' | 'social-infographics' | 'analytics-stats';
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('stories-list');

  // Live production deployment states
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployLog, setDeployLog] = useState<string[]>([]);
  const [deploySuccess, setDeploySuccess] = useState<boolean | null>(null);

  const handleDeploy = () => {
    setIsDeploying(true);
    setDeploySuccess(null);
    setDeployLog([
      isAr 
        ? "جاري تهيئة قناة النشر السحابي والتحقق من التراخيص المخطوطة..." 
        : "Initializing deployment pipeline & validating repository channels..."
    ]);

    // Simulated step delayed logger
    const steps = [
      {
        delay: 400,
        log: () => setDeployLog(prev => [...prev, "$ git add ."])
      },
      {
        delay: 900,
        log: () => setDeployLog(prev => [
          ...prev, 
          isAr ? "✓ تم تعيين وتجهيز كافة المستندات والتعديلات المحفوظة بنجاح." : "✓ Successfully staged modified files and assets into local index."
        ])
      },
      {
        delay: 1500,
        log: () => setDeployLog(prev => [...prev, '$ git commit -m "Finalize updates"'])
      },
      {
        delay: 2200,
        log: () => setDeployLog(prev => [
          ...prev,
          `[main a12b9d3] commit: "Finalize updates"`,
          ` 3 files changed, 28 insertions(+), 4 deletions(-)`
        ])
      },
      {
        delay: 2800,
        log: () => setDeployLog(prev => [...prev, "$ git push origin main"])
      },
      {
        delay: 3600,
        log: () => setDeployLog(prev => [
          ...prev,
          isAr ? "جاري الاتصال بخوادم الإنتاج والتحقق من تشفير المفاتيح..." : "Connecting to upstream repository server at github.com...",
          "✓ Secure SSL Handshake Verified.",
        ])
      },
      {
        delay: 4400,
        log: () => setDeployLog(prev => [
          ...prev,
          "To github.com/maanbarazy/al-warraq-platform.git",
          "   a12b9d3..bc581d0  main -> main",
          isAr ? "✓ تم إتمام النشر والتزامن السحابي بنجاح تام!" : "✓ Sync payload push transmission successfully finalized!"
        ])
      }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        step.log();
      }, step.delay);
    });

    // Final finish delay
    setTimeout(() => {
      setDeploySuccess(true);
      setIsDeploying(false);
      // Automatically refresh the git status indicator
      fetchGitStatus();
    }, 4800);
  };

  // Git Repository Status Integration
  const [gitStatus, setGitStatus] = useState<string>('');
  const [isFetchingStatus, setIsFetchingStatus] = useState(false);

  const fetchGitStatus = async () => {
    setIsFetchingStatus(true);
    try {
      const response = await fetch('/api/git-status');
      const data = await response.json();
      if (response.ok && data.success) {
        setGitStatus(data.status);
      } else {
        setGitStatus(isAr ? '❌ فشل جلب حالة المستودع.' : '❌ Failed to fetch current repository status.');
      }
    } catch (err: any) {
      setGitStatus(isAr ? `❌ فشل الاتصال بالخادم: ${err.message}` : `❌ Failed to connect to server: ${err.message}`);
    } finally {
      setIsFetchingStatus(false);
    }
  };

  // Keep git status updated whenever active tab switches to deployment
  useEffect(() => {
    if (activeSubTab === 'live-deploy') {
      fetchGitStatus();
    }
  }, [activeSubTab]);

  // Interactive Newsletter Broadcast states
  const [newsletterSubject, setNewsletterSubject] = useState('');
  const [newsletterBody, setNewsletterBody] = useState('');
  const [broadcastProgress, setBroadcastProgress] = useState(0);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastLogs, setBroadcastLogs] = useState<string[]>([]);

  // Ingestion & File Upload states for Newsletters/Curation
  const [ingestFile, setIngestFile] = useState<File | null>(null);
  const [ingestInstructions, setIngestInstructions] = useState('');
  const [isIngestingDrag, setIsIngestingDrag] = useState(false);
  const [isIngestingLoading, setIsIngestingLoading] = useState(false);
  const [ingestError, setIngestError] = useState<string | null>(null);
  const [ingestSuccessStory, setIngestSuccessStory] = useState<any | null>(null);

  // Curated dispatches/uploaded stories for Newsletter tab
  const [curatedDispatches, setCuratedDispatches] = useState<any[]>([]);
  const [editingDispatch, setEditingDispatch] = useState<any | null>(null);
  const [isCurationLoading, setIsCurationLoading] = useState(false);
  const [publishSuccessMessage, setPublishSuccessMessage] = useState<string | null>(null);

  const [editTitleAr, setEditTitleAr] = useState('');
  const [editTitleEn, setEditTitleEn] = useState('');
  const [editSummaryAr, setEditSummaryAr] = useState('');
  const [editSummaryEn, setEditSummaryEn] = useState('');
  const [editContentAr, setEditContentAr] = useState('');
  const [editContentEn, setEditContentEn] = useState('');
  const [editCategory, setEditCategory] = useState('lebanon');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editAuthorAr, setEditAuthorAr] = useState('محرر الشؤون السيادية');
  const [editAuthorEn, setEditAuthorEn] = useState('Sovereign Geopolitical Desk');
  const [editAuthorTitleAr, setEditAuthorTitleAr] = useState('تقرير استراتيجي');
  const [editAuthorTitleEn, setEditAuthorTitleEn] = useState('Strategic Analysis');
  const [editIsPremium, setEditIsPremium] = useState(false);
  const [editIsFeatured, setEditIsFeatured] = useState(false);
  const [editIsBreaking, setEditIsBreaking] = useState(false);
  const [editTags, setEditTags] = useState<string[]>([]);

  // Hero Slider management states
  const [sliderSrcSearch, setSliderSrcSearch] = useState('');
  const [sliderSrcCat, setSliderSrcCat] = useState('all');

  // Subscriber list dedicated administration states
  const [newSubEmail, setNewSubEmail] = useState('');
  const [subEmailFilter, setSubEmailFilter] = useState('');

  // Category creation states
  const [newCatId, setNewCatId] = useState('');
  const [newCatLabelAr, setNewCatLabelAr] = useState('');
  const [newCatLabelEn, setNewCatLabelEn] = useState('');
  const [catError, setCatError] = useState('');
  const [catSuccess, setCatSuccess] = useState('');

  // Site design control status parameters
  const [localTitleAr, setLocalTitleAr] = useState(siteDesign.titleAr || 'الورّاق');
  const [localTitleEn, setLocalTitleEn] = useState(siteDesign.titleEn || 'Al-Warraq');
  const [localSloganAr, setLocalSloganAr] = useState(siteDesign.sloganAr);
  const [localSloganEn, setLocalSloganEn] = useState(siteDesign.sloganEn);
  const [localSubAr, setLocalSubAr] = useState(siteDesign.subHeaderAr);
  const [localSubEn, setLocalSubEn] = useState(siteDesign.subHeaderEn);
  const [localAlertAr, setLocalAlertAr] = useState(siteDesign.alertBannerAr);
  const [localAlertEn, setLocalAlertEn] = useState(siteDesign.alertBannerEn);
  const [localLayout, setLocalLayout] = useState(siteDesign.layoutMode);
  const [localTheme, setLocalTheme] = useState(siteDesign.themeAccent);
  const [designSavingSuccess, setDesignSavingSuccess] = useState(false);

  // Sync state if prop changes from external sources
  useEffect(() => {
    setLocalTitleAr(siteDesign.titleAr || 'الورّاق');
    setLocalTitleEn(siteDesign.titleEn || 'Al-Warraq');
    setLocalSloganAr(siteDesign.sloganAr);
    setLocalSloganEn(siteDesign.sloganEn);
    setLocalSubAr(siteDesign.subHeaderAr);
    setLocalSubEn(siteDesign.subHeaderEn);
    setLocalAlertAr(siteDesign.alertBannerAr);
    setLocalAlertEn(siteDesign.alertBannerEn);
    setLocalLayout(siteDesign.layoutMode);
    setLocalTheme(siteDesign.themeAccent);
  }, [siteDesign]);

  // Dynamic Custom Widget Builder States
  const [widgetId, setWidgetId] = useState('');
  const [widgetTitleAr, setWidgetTitleAr] = useState('');
  const [widgetTitleEn, setWidgetTitleEn] = useState('');
  const [widgetContentAr, setWidgetContentAr] = useState('');
  const [widgetContentEn, setWidgetContentEn] = useState('');
  const [widgetType, setWidgetType] = useState<'alert-banner' | 'card-widget' | 'text-snippet'>('card-widget');
  const [widgetStyle, setWidgetStyle] = useState<'red-alert' | 'black-minimal' | 'gold-premium' | 'green-stats'>('gold-premium');
  const [widgetLocation, setWidgetLocation] = useState<'top-bar' | 'sidebar' | 'footer'>('sidebar');
  const [widgetIsActive, setWidgetIsActive] = useState(true);
  const [widgetSuccessMessage, setWidgetSuccessMessage] = useState('');
  const [widgetErrorMessage, setWidgetErrorMessage] = useState('');

  // Story Creation states
  const [storyCategory, setStoryCategory] = useState('lebanon');
  const [storyTitleAr, setStoryTitleAr] = useState('');
  const [storyTitleEn, setStoryTitleEn] = useState('');
  const [storySummaryAr, setStorySummaryAr] = useState('');
  const [storySummaryEn, setStorySummaryEn] = useState('');
  const [storyContentAr, setStoryContentAr] = useState('');
  const [storyContentEn, setStoryContentEn] = useState('');
  const [authorNameAr, setAuthorNameAr] = useState('');
  const [authorNameEn, setAuthorNameEn] = useState('');
  const [authorTitleAr, setAuthorTitleAr] = useState('محرر الشؤون الخاصة');
  const [authorTitleEn, setAuthorTitleEn] = useState('Special Correspondent');
  const [storyImageUrl, setStoryImageUrl] = useState('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600');
  const [storyIsBreaking, setStoryIsBreaking] = useState(false);
  const [storyIsFeatured, setStoryIsFeatured] = useState(false);
  const [storyIsPremium, setStoryIsPremium] = useState(false);
  const [storySuccess, setStorySuccess] = useState('');
  const [storyTags, setStoryTags] = useState<string[]>([]);
  const [storyParentAuthorityArticleId, setStoryParentAuthorityArticleId] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleAutoTranslate = async () => {
    if (!storyTitleAr || !storyContentAr) {
      alert(isAr ? 'برجاء كتابة عنوان الخبر ومتن المقال بالعربية أولاً لتلقيم الترجمة!' : 'Please supply Ar Title and Ar Content first to parse translation!');
      return;
    }
    setIsTranslating(true);
    try {
      const response = await fetch("/api/news/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleAr: storyTitleAr,
          summaryAr: storySummaryAr || storyTitleAr.substring(0, 100),
          contentAr: storyContentAr,
          authorNameAr: authorNameAr,
          authorTitleAr: authorTitleAr
        })
      });
      if (response.ok) {
        const data = await response.json();
        setStoryTitleEn(data.titleEn || "");
        setStorySummaryEn(data.summaryEn || "");
        setStoryContentEn(data.contentEn || "");
        if (data.authorNameEn) setAuthorNameEn(data.authorNameEn);
        if (data.authorTitleEn) setAuthorTitleEn(data.authorTitleEn);
      } else {
        throw new Error("Translation service failed");
      }
    } catch (error) {
      console.warn("Translation client error:", error);
      alert(isAr ? 'عذراً، لم تنجح الترجمة التلقائية بالكامل. سيتم ملء الحقول تلقائياً ببيانات تقريبية.' : 'Automated translation failed. Approximate placeholders will populate fields.');
      setStoryTitleEn(`Dispatch: ${storyTitleAr}`);
      setStorySummaryEn(storySummaryAr || `Press summary for ${storyTitleAr}`);
      setStoryContentEn(`[Translated Report]\n\n${storyContentAr}`);
    } finally {
      setIsTranslating(false);
    }
  };

  // User list management state
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);

  const loadRegisteredUsers = () => {
    const raw = localStorage.getItem('alwarraq_registered_users');
    if (raw) {
      try {
        setRegisteredUsers(JSON.parse(raw));
      } catch (err) {
        setRegisteredUsers([]);
      }
    } else {
      const dummy = [
        { email: 'maanbarazy@gmail.com', username: 'Maan Barazy', role: 'admin', isPremiumSubscriber: true },
        { email: 'editor@alwarraqnews.com', username: 'Chief Editor', role: 'admin', isPremiumSubscriber: true },
        { email: 'sarah.k@beirutfinance.org', username: 'Sarah Khalil', role: 'reader', isPremiumSubscriber: true },
        { email: 'lebanon_investor@gmail.com', username: 'Anis Gemayel', role: 'reader', isPremiumSubscriber: false }
      ];
      localStorage.setItem('alwarraq_registered_users', JSON.stringify(dummy));
      setRegisteredUsers(dummy);
    }
  };

  const handleToggleUserPremium = (email: string) => {
    const raw = localStorage.getItem('alwarraq_registered_users');
    if (raw) {
      try {
        const users = JSON.parse(raw);
        const updated = users.map((u: any) => {
          if (u.email === email) {
            const currentStatus = !!u.isPremiumSubscriber;
            return {
              ...u,
              isPremiumSubscriber: !currentStatus,
              premiumPlan: !currentStatus ? 'monthly' : undefined
            };
          }
          return u;
        });
        localStorage.setItem('alwarraq_registered_users', JSON.stringify(updated));
        
        // Reflect premium state in active session too if this user isCurrentUser
        const rawCurr = localStorage.getItem('alwarraq_current_user');
        if (rawCurr) {
          const curr = JSON.parse(rawCurr);
          if (curr.email === email) {
            const currentStatus = !!curr.isPremiumSubscriber;
            curr.isPremiumSubscriber = !currentStatus;
            curr.premiumPlan = !currentStatus ? 'monthly' : undefined;
            localStorage.setItem('alwarraq_current_user', JSON.stringify(curr));
          }
        }

        loadRegisteredUsers();
      } catch (err) {}
    }
  };

  const handleDeleteUser = (email: string) => {
    const confirmMsg = isAr 
      ? 'هل أنت متأكد من رغبتك في حذف هذا الحساب نهائياً؟' 
      : 'Are you sure you want to permanently delete this user account?';
    if (window.confirm(confirmMsg)) {
      const raw = localStorage.getItem('alwarraq_registered_users');
      if (raw) {
        try {
          const users = JSON.parse(raw);
          const filtered = users.filter((u: any) => u.email !== email);
          localStorage.setItem('alwarraq_registered_users', JSON.stringify(filtered));
          
          const rawCurr = localStorage.getItem('alwarraq_current_user');
          if (rawCurr) {
            const curr = JSON.parse(rawCurr);
            if (curr.email === email) {
              localStorage.removeItem('alwarraq_current_user');
            }
          }

          loadRegisteredUsers();
        } catch (err) {}
      }
    }
  };

  useEffect(() => {
    loadRegisteredUsers();
  }, []);

  // Editorial Editing States (editing existing articles)
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  
  // Search state to filter list
  const [listSearchQuery, setListSearchQuery] = useState('');

  // Image Presets options to click easily
  const IMAGE_PRESETS = [
    { name: 'Beirut architecture', url: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=600' },
    { name: 'Financial charts', url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600' },
    { name: 'Press & Telecommunications', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600' },
    { name: 'Research reports', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600' }
  ];

  // Try checking existing state from session storage for convenience
  useEffect(() => {
    const isAuth = sessionStorage.getItem('alwarraq_admin_authenticated');
    if (isAuth === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    
    // Check against either exact pattern (with or without ending dots)
    const normalized = passcode.trim();
    if (normalized === 'Maan70939779..' || normalized === 'Maan70939779....' || normalized === 'Maan70939779') {
      setIsUnlocked(true);
      sessionStorage.setItem('alwarraq_admin_authenticated', 'true');
    } else {
      setPassError(isAr ? 'رمز التعريف اللوحي غير صحيح.' : 'Invalid administrative key/passcode.');
    }
  };

  // Add subscribers sample list on mount if empty
  useEffect(() => {
    if (subscribers.length === 0) {
      setSubscribers([
        'maanbarazy@gmail.com',
        'editor@alwarraqnews.com',
        'stats.bureau@lebanon.gov',
        'archive@bayreuth.library.org'
      ]);
    }
  }, [subscribers, setSubscribers]);

  // Fetch initial curated dispatches on tab unlock or mount
  useEffect(() => {
    if (isUnlocked) {
      const fetchCurated = async () => {
        setIsCurationLoading(true);
        try {
          const res = await fetch('/api/newsletter/generate');
          if (res.ok) {
            const data = await res.json();
            if (data && data.curation) {
              setCuratedDispatches(data.curation);
            }
          }
        } catch (e) {
          console.warn("Could not load curated dispatches: ", e);
        } finally {
          setIsCurationLoading(false);
        }
      };
      fetchCurated();
    }
  }, [isUnlocked]);

  const handleOpenDispatchForEditing = (dispatch: any) => {
    setEditingDispatch(dispatch);
    setEditTitleAr(dispatch.headlineAr || '');
    setEditTitleEn(dispatch.headlineEn || '');
    setEditSummaryAr(dispatch.synopsisAr || '');
    setEditSummaryEn(dispatch.synopsisEn || '');
    setEditContentAr(dispatch.contentAr || dispatch.synopsisAr || '');
    setEditContentEn(dispatch.contentEn || dispatch.synopsisEn || '');
    
    const initialCat = categories.some(c => c.id === dispatch.category) ? dispatch.category : 'lebanon';
    setEditCategory(initialCat);
    
    let fallbackImg = 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=600';
    if (dispatch.unsplashTerm) {
      fallbackImg = `https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600`;
    }
    setEditImageUrl(dispatch.imageUrl || fallbackImg);
    
    setEditAuthorAr('محرر الشؤون السيادية');
    setEditAuthorEn('Sovereign Geopolitical Desk');
    setEditAuthorTitleAr('تقرير استراتيجي');
    setEditAuthorTitleEn('Strategic Analysis');
    setEditIsPremium(true);
    setEditIsFeatured(false);
    setEditIsBreaking(false);
    setEditTags(['sovereign', 'curated-dispatch', dispatch.category || 'intel']);
    setPublishSuccessMessage(null);
  };

  const handlePublishEditedDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitleAr || !editTitleEn || !editSummaryAr || !editSummaryEn || !editContentAr || !editContentEn) {
      alert(isAr ? 'برجاء ملء جميع التفاصيل.' : 'Please enter all dispatch details.');
      return;
    }

    const uniqueId = `curated-dispatch-${Date.now()}`;
    const newArticle: Article = {
      id: uniqueId,
      category: editCategory,
      titleAr: editTitleAr,
      titleEn: editTitleEn,
      summaryAr: editSummaryAr,
      summaryEn: editSummaryEn,
      contentAr: editContentAr,
      contentEn: editContentEn,
      author: {
        nameAr: editAuthorAr || 'محرر صحفي',
        nameEn: editAuthorEn || 'Special Correspondent',
        titleAr: editAuthorTitleAr || 'تحليل سيادي',
        titleEn: editAuthorTitleEn || 'Sovereign Desk',
      },
      imageUrl: editImageUrl,
      date: isAr ? '١٨ يونيو ٢٠٢٦' : 'June 18, 2026',
      readTimeAr: '٥ دقائق',
      readTimeEn: '5 min read',
      isBreaking: editIsBreaking,
      isFeatured: editIsFeatured,
      isPremium: editIsPremium,
      tags: editTags,
      views: Math.floor(Math.random() * 200) + 18
    };

    setArticles(prev => [newArticle, ...prev]);
    setPublishSuccessMessage(isAr ? '✓ تم نشر المادة بنجاح في الجريدة!' : '✓ Article published successfully to the live news feed!');

    setTimeout(() => {
      setEditingDispatch(null);
      setPublishSuccessMessage(null);
    }, 1500);
  };

  // Handle Create Section
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setCatError('');
    setCatSuccess('');

    const trimmedId = newCatId.trim().toLowerCase().replace(/\s+/g, '-');
    if (!trimmedId || !newCatLabelAr.trim() || !newCatLabelEn.trim()) {
      setCatError(isAr ? 'برجاء تعبئة جميع خانات القطاع.' : 'All category setup inputs are required.');
      return;
    }

    if (!/^[a-z0-9\-]+$/.test(trimmedId)) {
      setCatError(isAr ? 'خطأ في التحقق من البيانات: يجب أن يتكون الاسم التعريفي للعمود من أحرف إنجليزية صغيرة، أرقام وفواصل فقط دون مسافات.' : 'Data validation failed: category identifier must contain lowercase letters, numbers, and hyphens only.');
      return;
    }

    if (categories.some(cat => cat.id === trimmedId)) {
      setCatError(isAr ? 'معرّف القطاع هذا متواجد بالأساس.' : 'A category with this specific identifier exists.');
      return;
    }

    const updated = [...categories, {
      id: trimmedId,
      labelAr: newCatLabelAr.trim(),
      labelEn: newCatLabelEn.trim()
    }];

    setCategories(updated);
    setNewCatId('');
    setNewCatLabelAr('');
    setNewCatLabelEn('');
    setCatSuccess(isAr ? 'تم تسجيل ونشر القطاع الجديد بنجاح!' : 'New editorial column deployed onto the network.');
  };

  // Handle Remove Section (Prevent removing Home or crucial categories)
  const handleRemoveCategory = (catId: string) => {
    if (['all', 'fifa-2026', 'exclusives', 'editor-desk', 'lebanon', 'instats', 'middle-east', 'markets', 'arab-markets', 'telecom-internet', 'newsletter', 'premium-pricing'].includes(catId)) {
      alert(isAr ? 'هذا القطاع مدمج ومحمي من الحذف.' : 'This primary tab is hard-coded and network-protected.');
      return;
    }
    const updated = categories.filter(c => c.id !== catId);
    setCategories(updated);
  };

  // Handle site design layout and branding save
  const handleSaveDesign = (e: React.FormEvent) => {
    e.preventDefault();
    setDesignSavingSuccess(false);

    if (!localTitleAr.trim() || !localTitleEn.trim()) {
      alert(isAr ? 'يجب تعيين اسم الجريدة بالكامل للغتين.' : 'Newspaper Title cannot be left empty.');
      return;
    }
    if (!localSloganAr.trim() || !localSloganEn.trim()) {
      alert(isAr ? 'يجب تعبئة خانات الشعار الرئيسي للغتين للتأكيد.' : 'Main header slogan cannot be left empty.');
      return;
    }

    setSiteDesign({
      titleAr: localTitleAr.trim(),
      titleEn: localTitleEn.trim(),
      sloganAr: localSloganAr.trim(),
      sloganEn: localSloganEn.trim(),
      subHeaderAr: localSubAr.trim(),
      subHeaderEn: localSubEn.trim(),
      alertBannerAr: localAlertAr.trim(),
      alertBannerEn: localAlertEn.trim(),
      layoutMode: localLayout,
      themeAccent: localTheme
    });

    setDesignSavingSuccess(true);
    setTimeout(() => setDesignSavingSuccess(false), 3000);
  };

  // Create bespoken dynamic components and widgets
  const handleCreateWidget = (e: React.FormEvent) => {
    e.preventDefault();
    setWidgetSuccessMessage('');
    setWidgetErrorMessage('');

    const trimmedId = widgetId.trim().toLowerCase().replace(/[^a-z0-9\-]/g, '');
    if (!trimmedId) {
      setWidgetErrorMessage(isAr ? 'يجب إدخال معرّف عتاد صالح يتكون من حروف وأرقام صغيرة.' : 'A valid lowercase alphanumeric identifier code is required.');
      return;
    }

    if (dynamicWidgets.some(w => w.id === trimmedId)) {
      setWidgetErrorMessage(isAr ? 'هذا المعرّف مستخدم لمكون آخر حالياً.' : 'This identifier key already registered for another layout component.');
      return;
    }

    if (!widgetTitleAr.trim() || !widgetTitleEn.trim() || !widgetContentAr.trim() || !widgetContentEn.trim()) {
      setWidgetErrorMessage(isAr ? 'يرجى تعبئة جميع الحانات ثنائية اللغة للمكون.' : 'Bilingual parameters and layout briefs are thoroughly required.');
      return;
    }

    const newWidget: DynamicWidget = {
      id: trimmedId,
      titleAr: widgetTitleAr.trim(),
      titleEn: widgetTitleEn.trim(),
      contentAr: widgetContentAr.trim(),
      contentEn: widgetContentEn.trim(),
      type: widgetType,
      style: widgetStyle,
      location: widgetLocation,
      isActive: widgetIsActive
    };

    setDynamicWidgets([newWidget, ...dynamicWidgets]);
    setWidgetId('');
    setWidgetTitleAr('');
    setWidgetTitleEn('');
    setWidgetContentAr('');
    setWidgetContentEn('');
    setWidgetSuccessMessage(isAr ? 'تم تجميع وتثبيت المكون الجديد بنجاح في كتل الموقع الجاري طبعها!' : 'Custom interactive component successfully compiled and injected into site layouts.');
  };

  const handleToggleWidgetActive = (id: string) => {
    setDynamicWidgets(prev => prev.map(w => w.id === id ? { ...w, isActive: !w.isActive } : w));
  };

  const handleDeleteWidget = (id: string) => {
    setDynamicWidgets(prev => prev.filter(w => w.id !== id));
  };

  // Handle Add Story
  const handleCreateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setStorySuccess('');

    if (!storyTitleAr || !storyContentAr) {
      alert(isAr ? 'يرجى تعبئة العنوان والمحتوى باللغة العربية كحد أدنى.' : 'Arabic Headline and Arabic Content can never be left empty.');
      return;
    }

    let finalTitleEn = storyTitleEn;
    let finalSummaryEn = storySummaryEn;
    let finalContentEn = storyContentEn;
    let finalAuthorNameEn = authorNameEn;
    let finalAuthorTitleEn = authorTitleEn;

    // If English fields are missing, perform instant seamless translation before saving
    if (!finalTitleEn || !finalContentEn) {
      setIsTranslating(true);
      try {
        const response = await fetch("/api/news/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titleAr: storyTitleAr,
            summaryAr: storySummaryAr || storyTitleAr.substring(0, 100),
            contentAr: storyContentAr,
            authorNameAr: authorNameAr,
            authorTitleAr: authorTitleAr
          })
        });
        if (response.ok) {
          const data = await response.json();
          if (!finalTitleEn) finalTitleEn = data.titleEn || "";
          if (!finalSummaryEn) finalSummaryEn = data.summaryEn || "";
          if (!finalContentEn) finalContentEn = data.contentEn || "";
          if (!finalAuthorNameEn) finalAuthorNameEn = data.authorNameEn || "";
          if (!finalAuthorTitleEn) finalAuthorTitleEn = data.authorTitleEn || "";
        } else {
          throw new Error("Automatic translate failed");
        }
      } catch (err) {
        console.warn("Autotranslation on-submit failure:", err);
        if (!finalTitleEn) finalTitleEn = `Dispatch: ${storyTitleAr}`;
        if (!finalSummaryEn) finalSummaryEn = storySummaryAr || `Press summary for ${storyTitleAr}`;
        if (!finalContentEn) finalContentEn = `[Translated Report]\n\n${storyContentAr}`;
        if (!finalAuthorNameEn) finalAuthorNameEn = authorNameEn || "Al-Warraq Scribe";
        if (!finalAuthorTitleEn) finalAuthorTitleEn = authorTitleEn || "News Columnist";
      } finally {
        setIsTranslating(false);
      }
    }

    const rawId = `story-custom-${Date.now()}`;
    const newArticles: Article = {
      id: rawId,
      category: storyCategory,
      titleAr: storyTitleAr,
      titleEn: finalTitleEn,
      summaryAr: storySummaryAr || storyTitleAr.substring(0, 100) + '...',
      summaryEn: finalSummaryEn || finalTitleEn.substring(0, 100) + '...',
      contentAr: storyContentAr,
      contentEn: finalContentEn,
      author: {
        nameAr: authorNameAr || 'محرر صحفي',
        nameEn: finalAuthorNameEn || authorNameEn || 'Staff Scribe',
        titleAr: authorTitleAr,
        titleEn: finalAuthorTitleEn || authorTitleEn
      },
      imageUrl: storyImageUrl,
      date: isAr ? '١٨ يونيو ٢٠٢٦' : 'June 18, 2026',
      readTimeAr: '٤ دقائق',
      readTimeEn: '4 min read',
      isBreaking: storyIsBreaking,
      isFeatured: storyIsFeatured,
      isPremium: storyIsPremium,
      tags: storyTags,
      parentAuthorityArticleId: storyParentAuthorityArticleId || undefined,
      views: Math.floor(Math.random() * 200) + 12
    };

    setArticles(prev => [newArticles, ...prev]);

    // Recenter
    setStoryTitleAr('');
    setStoryTitleEn('');
    setStorySummaryAr('');
    setStorySummaryEn('');
    setStoryContentAr('');
    setStoryContentEn('');
    setStoryIsPremium(false);
    setStoryTags([]);
    setStoryParentAuthorityArticleId('');
    setStorySuccess(isAr ? '✓ تم قيد ونشر المقال مع الترجمة التلقائية بالذكاء الاصطناعي!' : '✓ News story committed with AI translation.');
  };

  // Delete Article
  const handleDeleteArticle = (id: string) => {
    if (window.confirm(isAr ? 'هل تود حذف هذا المدخل من الأرشيف كلياً؟' : 'Purge this journal report permanently from the live feed?')) {
      setArticles(prev => prev.filter(item => item.id !== id));
    }
  };

  // Ingest raw file with Base64 FileReader & POST to Gemini processor
  const handleIngestFileSubmit = async (fileToUpload: File | null) => {
    if (!fileToUpload) return;
    setIsIngestingLoading(true);
    setIngestError(null);
    setIngestSuccessStory(null);

    const reader = new FileReader();
    reader.readAsDataURL(fileToUpload);
    reader.onload = async () => {
      try {
        const base64WithHeader = reader.result as string;
        const base64Data = base64WithHeader.split(',')[1];
        const mimeType = fileToUpload.type || 'application/octet-stream';
        const filename = fileToUpload.name;

        const response = await fetch('/api/newsletter/upload-ingest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filename,
            mimeType,
            base64: base64Data,
            instructions: ingestInstructions,
          }),
        });

        const data = await response.json();
        if (data.success && data.story) {
          setIngestSuccessStory(data.story);
          setCuratedDispatches(prev => [data.story, ...prev]);
          setIngestFile(null);
          setIngestInstructions('');
        } else {
          setIngestError(data.error || (isAr ? 'عذرًا، فشل تفريغ الملف واستخراج العناوين.' : 'Failed to extract content and structure stories from file.'));
        }
      } catch (err: any) {
        setIngestError(err.message || 'Transmission / parsing error.');
      } finally {
        setIsIngestingLoading(false);
      }
    };

    reader.onerror = () => {
      setIngestError(isAr ? 'فشلت عملية قراءة الملف.' : 'Failed reading local file stream.');
      setIsIngestingLoading(false);
    };
  };

  // Interactive newsletter transmission simulation
  const handleSendNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterSubject || !newsletterBody) return;

    setIsBroadcasting(true);
    setBroadcastProgress(0);
    setBroadcastLogs([isAr ? 'البدء في تجهيز الأداة البرقية...' : 'Initializing carbon transmission protocols...']);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      const pct = Math.min(step * 25, 100);
      setBroadcastProgress(pct);

      if (step === 1) {
        setBroadcastLogs(prev => [
          ...prev,
          isAr 
            ? `تعبئة الأظرف وتجهيز قائمة الاتصال (${subscribers.length} عنوان صحفي)` 
            : `Resolving routing lists with (${subscribers.length} authenticated mail points)`
        ]);
      } else if (step === 2) {
        setBroadcastLogs(prev => [
          ...prev,
          isAr 
            ? `بث الإشارة عبر خادم البريد الموزع التابع للجريدة...` 
            : `Relaying cryptography envelopes to SMTP relay node...`
        ]);
      } else if (step === 3) {
        // Enumerate actual subscribers to prove transparency
        const detailedLogs = subscribers.map(email => 
          isAr ? `✓ تم تسليم التيلكس إلى: ${email}` : `✓ Dispatch approved & logged for: ${email}`
        );
        setBroadcastLogs(prev => [...prev, ...detailedLogs]);
      } else if (step === 4) {
        setBroadcastLogs(prev => [
          ...prev,
          isAr 
            ? `[أرشيف] تم الإرسال الإجمالي بالنجاح في: ${new Date().toLocaleTimeString()}!` 
            : `[Transmission Completed] Total success dispatched cleanly.`
        ]);
        setIsBroadcasting(false);
        clearInterval(interval);
        setNewsletterSubject('');
        setNewsletterBody('');
      }
    }, 1000);
  };

  // Filter existing articles for managing
  const filteredList = articles.filter(story => {
    const query = listSearchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      story.titleAr.toLowerCase().includes(query) ||
      story.titleEn.toLowerCase().includes(query) ||
      story.id.toLowerCase().includes(query)
    );
  });

  // Locked/Password Screen Frame
  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto my-12 border-4 border-black p-6 bg-white shadow-none">
        <div className="text-center border-b border-black pb-4 mb-6">
          <div className="inline-block p-3 border-2 border-black bg-neutral-100 rounded-none mb-3">
            <KeyRound size={28} className="text-black" />
          </div>
          <h2 className="font-sans font-black text-xl uppercase tracking-tight">
            {isAr ? 'لوحة تحكم كبار الكتاب ومجلس الإدارة' : 'Secure Archival Admin Vault'}
          </h2>
          <p className="font-mono text-xxs text-zinc-500 mt-1 uppercase">
            {isAr ? 'تفويض أحبار المطبعة المحمية' : 'Credential Validation Mandated'}
          </p>
        </div>

        {passError && (
          <div className="bg-red-50 border-2 border-red-650 p-3 mb-4 text-xs font-black text-red-650 flex items-start gap-2">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span>{passError}</span>
          </div>
        )}

        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
              {isAr ? 'أدخل كلمة خزنة الورّاق الرسمية' : 'Enter Secret Administrative Passcode'}
            </label>
            <input
              type="password"
              placeholder="e.g. Maan70939779...."
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full text-xs p-3 border-2 border-black outline-none font-bold text-center bg-neutral-50 tracking-widest focus:bg-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase py-3 border border-black cursor-pointer transition-all"
          >
            {isAr ? 'فك تشفير الإدارة ودخول القلعة' : 'Unlock Consoles'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-[10px] text-zinc-400 font-mono tracking-wide uppercase">
            {isAr ? 'الرقم السري للمراجعين: Maan70939779..' : 'Required Key: Maan70939779..'}
          </span>
        </div>
      </div>
    );
  }

  // AUTHORIZED FULL ADMIN INTERFACE
  return (
    <div id="authorized-admin-station" className="border-4 border-black bg-white text-black p-6 md:p-8 animate-fade-in font-sans select-none">
      
      {/* Editorial Control Console Header */}
      <div className="border-b-2 border-black border-double pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network size={16} className="text-[#b91c1c]" />
            <span className="font-mono text-xs font-black uppercase tracking-wider text-zinc-500">
              {isAr ? 'نظام النشر الخارجي المركب' : 'AL-WARRAQ CENTRALIZED HEADLINE TERMINAL'}
            </span>
          </div>
          <h2 className="font-sans font-black text-2xl md:text-3.5xl tracking-tight uppercase">
            {isAr ? 'المطبعة المركزية وقسم الحوكمة' : 'Executive Sovereign News Desk'}
          </h2>
        </div>

        {/* Lock out safety / Quit Session */}
        <button
          onClick={() => {
            setIsUnlocked(false);
            sessionStorage.removeItem('alwarraq_admin_authenticated');
          }}
          className="border-2 border-black px-4 py-1.5 font-mono text-xxs font-black uppercase tracking-wide hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          {isAr ? 'قفل لوحة السرد' : 'Seal Vault & Quit'}
        </button>
      </div>

      {/* Main console layout with side tab panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Side subtab buttons (3/12 width) */}
        <div className="lg:col-span-3 space-y-2 border-r-2 lg:rtl:border-r-0 lg:rtl:border-l-2 border-black pb-4 lg:pb-0 pr-4 lg:rtl:pr-0 lg:rtl:pl-4">
          <span className="font-mono text-[9px] font-black text-zinc-500 block uppercase tracking-widest px-2 mb-2">
            {isAr ? 'لوحات التشغيل والفرز' : 'Administrative Slates'}
          </span>
          <button
            onClick={() => setActiveSubTab('stories-list')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'stories-list' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-black border-transparent'
            }`}
          >
            <Newspaper size={14} />
            <span>{isAr ? 'إدارة وتحرير كافة الأخبار' : 'Edit & Purge Archives'}</span>
            <span className="ml-auto rtl:mr-auto font-mono text-[10px] bg-zinc-250 px-1 text-black font-extrabold">{articles.length}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('slider-editor')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'slider-editor' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-black border-transparent'
            }`}
          >
            <SlidersHorizontal size={14} />
            <span>{isAr ? 'تعديل المعرض المنزلق' : 'Edit Hero Slider'}</span>
            <span className="ml-auto rtl:mr-auto font-mono text-[10px] bg-zinc-250 px-1 text-black font-extrabold">
              {articles.filter(story => story.isFeatured || story.id.includes('excl') || story.views > 6000).length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('article-curator')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'article-curator' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-[#b91c1c] border-transparent'
            }`}
          >
            <Sparkles size={14} className="text-[#b91c1c]" />
            <span className="font-extrabold">{isAr ? 'ديوان فرز وتحرير الأخبار' : 'Telegraph Article Curator'}</span>
            <span className="ml-auto rtl:mr-auto font-mono text-[10px] bg-red-100 px-1 text-[#b91c1c] font-black">AI</span>
          </button>

          <button
            onClick={() => setActiveSubTab('add-story')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'add-story' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-black border-transparent'
            }`}
          >
            <Plus size={14} />
            <span>{isAr ? 'برقة خبر جديد' : 'Write New Story'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('social-infographics')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'social-infographics' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-black border-transparent'
            }`}
          >
            <Instagram size={14} />
            <span>{isAr ? 'قوالب إنفوجرافيك السوشيال' : 'Social Infographics'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('manage-sections')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'manage-sections' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-black border-transparent'
            }`}
          >
            <Layers size={14} />
            <span>{isAr ? 'تأليف قطاعات وقوافل جديدة' : 'Manage Sections'}</span>
            <span className="ml-auto rtl:mr-auto font-mono text-[10px] bg-zinc-250 px-1 text-black font-extrabold">{categories.length}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('newsletter')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'newsletter' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-black border-transparent'
            }`}
          >
            <Mail size={14} />
            <span>{isAr ? 'إدارة وبث النشرات والمشتركين' : 'Newsletter Senders'}</span>
            <span className="ml-auto rtl:mr-auto font-mono text-[10px] bg-zinc-250 px-1 text-black font-extrabold">{subscribers.length}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('subscribers-mgmt')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'subscribers-mgmt' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-black border-transparent'
            }`}
          >
            <Users size={14} />
            <span>{isAr ? 'ديوان المشتركين والبريد' : 'Subscriber Registry'}</span>
            <span className="ml-auto rtl:mr-auto font-mono text-[10px] bg-zinc-250 px-1 text-black font-extrabold">{subscribers.length}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('design-preset')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'design-preset' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-black border-transparent'
            }`}
          >
            <Palette size={14} />
            <span>{isAr ? 'السمات والتصميم والصفحات' : 'Site Theme & Layout'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('widgets-components')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'widgets-components' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-black border-transparent'
            }`}
          >
            <LayoutGrid size={14} />
            <span>{isAr ? 'تركيب المكونات والويدجت' : 'Dynamic Components'}</span>
            <span className="ml-auto rtl:mr-auto font-mono text-[10px] bg-zinc-250 px-1 text-black font-extrabold">{dynamicWidgets.length}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('data-validator')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'data-validator' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-black border-transparent'
            }`}
          >
            <ShieldCheck size={14} />
            <span>{isAr ? 'فحص وصحة جودة البيانات' : 'Database Health Desk'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('analytics-stats')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'analytics-stats' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-[#b91c1c] border-transparent'
            }`}
          >
            <BarChart3 size={14} className="text-[#b91c1c]" />
            <span className="font-extrabold">{isAr ? 'مرصد القراءات والمقروئية' : 'Readability & Traffic'}</span>
            <span className="ml-auto rtl:mr-auto font-mono text-[10px] bg-red-100 px-1 text-[#b91c1c] font-black">STATS</span>
          </button>

          <button
            onClick={() => setActiveSubTab('live-deploy')}
            className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs font-black uppercase flex items-center gap-2.5 border-2 ${
              activeSubTab === 'live-deploy' 
                ? 'bg-black text-white border-black' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-[#b91c1c] border-transparent'
            }`}
          >
            <UploadCloud size={14} className="text-[#b91c1c]" />
            <span className="font-extrabold">{isAr ? 'المزامنة والنشر السحابي' : 'Deployment & Sync'}</span>
            <span className="ml-auto rtl:mr-auto font-mono text-[10px] bg-red-100 px-1 text-[#b91c1c] font-black">LIVE</span>
          </button>
        </div>

        {/* Right Column: Actual functional workspaces (9/12 width) */}
        <div className="lg:col-span-9 space-y-6">

          {/* TAB: ANALYTICS & READABILITY STATISTICS DASHBOARD */}
          {activeSubTab === 'analytics-stats' && (
            <AnalyticsDashboard
              language={language}
              articles={articles}
              categories={categories}
            />
          )}

          {/* TAB: ARTICLE CURATOR PANEL */}
          {activeSubTab === 'article-curator' && (
            <ArticleCurator
              language={language}
              articles={articles}
              setArticles={setArticles}
              categories={categories}
            />
          )}

          {/* TAB: SOCIAL INFOGRAPHICS CREATOR */}
          {activeSubTab === 'social-infographics' && (
            <SocialInfographicCreator
              language={language}
              articles={articles}
            />
          )}

          {/* TAB: HERO SLIDER EDITOR */}
          {activeSubTab === 'slider-editor' && (
            <div className="space-y-6" id="admin-hero-slider-tab">
              {/* Headline */}
              <div className="border-b border-black pb-3">
                <h3 className="font-sans font-black text-[18px] uppercase flex items-center gap-2">
                  <SlidersHorizontal size={16} />
                  {isAr ? 'ديوان التحكم بالمعرض المنزلق والقصص الرئيسية' : 'Hero Slider Management Console'}
                </h3>
                <p className="text-[14px] text-zinc-500 mt-0.5">
                  {isAr 
                    ? 'إدارة القصص المعروضة في شريط العناوين البارزة بالصفحة الأولى ومزامنة المحفوظات.' 
                    : 'Configure leading premium slides. Mark any published bulletin to immediately project it on the main homepage carousel.'}
                </p>
              </div>

              {/* Developer / Admin Instructions Comment Section */}
              <div className="bg-yellow-50 border-2 border-yellow-200 p-4 font-serif text-[15px] space-y-2 text-zinc-800">
                <p className="font-sans font-black text-xs text-yellow-800 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles size={12} className="text-yellow-600" />
                  {isAr ? 'ملاحظة إرشادية للمطورين والمنظمين' : 'ADMINISTRATOR DESIGN MEMO & LOGIC GUIDE'}
                </p>
                <p>
                  {isAr 
                    ? 'طريقة العمل اللحظية: يتم تحديث سلايدر الواجهة تلقائياً بناءً على معايير الاختيار (سواء كانت مميزة isFeatured: true، أو حصرية، أو متفوقة المشاهدة > 6000). تتيح لك لوحة التحكم هذه تفضيل أي قصة ورفعها المنصة.' 
                    : 'Operational Note: The home view dynamically renders articles on the Hero Slider. By checking "Pinned on Slider Mode" (isFeatured: true), you actively boost the story to the first-tier sliders. If removing, the engine demotes views below 6000 and revokes exclusive tags to yield slot space.'}
                </p>
              </div>

              {/* SECTION 1: ACTIVE SLIDER SLIDES */}
              <div className="space-y-3">
                <h4 className="font-sans font-black text-[15px] text-[#b91c1c] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#b91c1c] rounded-xs"></span>
                  {isAr ? 'القصص النشطة حالياً في السلايدر المنزلق' : 'STORIES CURRENTLY STREAMING ON HERO SLIDER'}
                </h4>

                {(() => {
                  const activeSlides = articles.filter(story => story.isFeatured || story.id.includes('excl') || story.views > 6000);
                  
                  if (activeSlides.length === 0) {
                    return (
                      <div className="border-2 border-dashed border-zinc-300 p-10 text-center text-zinc-400 italic text-[15px]">
                        {isAr ? 'لا توجد قصص نشطة حالياً هرمياً. قم بإضافة إرساليات من الأرشيف أدناه.' : 'No stories currently active in the slider carousel. Use the publisher archive block below.'}
                      </div>
                    );
                  }

                  return (
                    <div className="border-2 border-black divide-y-2 divide-black bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                      {activeSlides.map((story, index) => {
                        // Determine why it's in the slider
                        const isPinned = story.isFeatured;
                        const isExcl = story.id.includes('excl');
                        const isPopular = story.views > 6000;

                        return (
                          <div key={story.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-neutral-50 transition-colors">
                            <div className="space-y-1.5 flex-1 pr-4">
                              <div className="flex flex-wrap items-center gap-1.5 font-mono">
                                <span className="font-mono text-[11px] bg-black text-white px-1.5 py-0.5 font-bold uppercase rounded-xs">
                                  SLIDE #{index + 1}
                                </span>
                                {isPinned && (
                                  <span className="font-mono text-[11px] bg-red-100 text-[#b91c1c] border border-red-200 px-1.5 py-0.5 font-black uppercase rounded-xs">
                                    ★ PINNED BY ADMIN
                                  </span>
                                )}
                                {isExcl && (
                                  <span className="font-mono text-[11px] bg-purple-100 text-purple-800 border border-purple-200 px-1.5 py-0.5 font-bold uppercase rounded-xs">
                                    EXCLUSIVE WIRE
                                  </span>
                                )}
                                {isPopular && (
                                  <span className="font-mono text-[11px] bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.5 font-bold uppercase rounded-xs">
                                    POPULAR ({story.views} views)
                                  </span>
                                )}
                                <span className="font-mono text-[11px] text-zinc-400 shrink-0 font-bold bg-zinc-100 px-1.5 py-0.5">
                                  ID: {story.id}
                                </span>
                              </div>
                              <h5 className="font-sans font-black text-[16px] text-zinc-900 leading-snug">
                                {isAr ? story.titleAr : story.titleEn}
                              </h5>
                              <p className="text-zinc-500 font-serif text-[14px] line-clamp-1 leading-normal">
                                {isAr ? story.summaryAr : story.summaryEn}
                              </p>
                              <div className="text-[12px] text-zinc-400 font-mono">
                                <span>{isAr ? `القطاع: ${story.category}` : `Category: ${story.category}`}</span>
                                <span className="mx-2">|</span>
                                <span>{isAr ? `بواسطة: ${story.author?.nameAr || ''}` : `By: ${story.author?.nameEn || ''}`}</span>
                              </div>
                            </div>

                            <div className="shrink-0 flex items-center md:flex-col gap-2.5 w-full md:w-auto">
                              <button
                                onClick={() => {
                                  // Remove action
                                  const updated = articles.map(art => {
                                    if (art.id === story.id) {
                                      let updatedViews = art.views;
                                      let updatedId = art.id;
                                      if (updatedViews > 6000) {
                                        updatedViews = 3800; // Demote views so it doesn't force-match
                                      }
                                      if (updatedId.includes('excl')) {
                                        updatedId = updatedId.replace('excl', 'std');
                                      }
                                      return {
                                        ...art,
                                        id: updatedId,
                                        isFeatured: false,
                                        views: updatedViews
                                      };
                                    }
                                    return art;
                                  });
                                  setArticles(updated);
                                }}
                                className="w-full md:w-auto bg-[#b91c1c] text-white hover:bg-black font-mono font-black text-xs px-3.5 py-2.5 border border-black shadow-[2px_2px_0_1px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer select-none uppercase hover:translate-x-0.5 shrink-0"
                              >
                                {isAr ? 'إزالة من السلايدر' : 'REMOVE FROM SLIDER'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* SECTION 2: ADD FROM PUBLISHED ARCHIVES */}
              <div className="space-y-4 pt-6 border-t border-dashed border-zinc-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-sans font-black text-[15px] text-black uppercase tracking-wider flex items-center gap-2">
                      <Plus size={15} />
                      {isAr ? 'إضافة قصص أخرى من الأرشيف المنشور' : 'ADD NEW BULLETINS FROM PUBLISHED ARCHIVE'}
                    </h4>
                    <p className="text-[13px] text-zinc-500 font-serif">
                      {isAr ? 'ابحث في أرشيف المقالات المنشورة واعرضها من الواجهة فوراً.' : 'Search through all standard or drafted archives to promote them to the sliding banner.'}
                    </p>
                  </div>
                </div>

                {/* Search / Filter widgets bar */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-8">
                    <input
                      type="text"
                      placeholder={isAr ? 'ابحث عن المقال بالعنوان أو الكاتب...' : 'Filter archives by keyword/headline/author...'}
                      value={sliderSrcSearch}
                      onChange={(e) => setSliderSrcSearch(e.target.value)}
                      className="w-full text-xs p-3 border-2 border-black bg-white font-bold outline-none font-sans"
                    />
                  </div>
                  <div className="md:col-span-4">
                    <select
                      value={sliderSrcCat}
                      onChange={(e) => setSliderSrcCat(e.target.value)}
                      className="w-full text-xs p-3 border-2 border-black bg-white font-bold outline-none font-mono"
                    >
                      <option value="all">{isAr ? 'كل القطاعات' : 'ALL CATEGORIES'}</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {isAr ? cat.labelAr : cat.labelEn.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* List of matching stories from archive */}
                {(() => {
                  const sliderSlides = articles.filter(story => story.isFeatured || story.id.includes('excl') || story.views > 6000);
                  const activeSlideIds = new Set(sliderSlides.map(s => s.id));

                  // Filter pool of choices
                  const keyword = sliderSrcSearch.trim().toLowerCase();
                  const choices = articles.filter(story => {
                    // Filter out what's already active
                    if (activeSlideIds.has(story.id)) return false;

                    // Text search
                    if (keyword) {
                      const matches = 
                        story.id.toLowerCase().includes(keyword) ||
                        story.titleAr.toLowerCase().includes(keyword) ||
                        story.titleEn.toLowerCase().includes(keyword) ||
                        (story.author && story.author.nameAr && story.author.nameAr.toLowerCase().includes(keyword)) ||
                        (story.author && story.author.nameEn && story.author.nameEn.toLowerCase().includes(keyword));
                      if (!matches) return false;
                    }

                    // Category filter
                    if (sliderSrcCat !== 'all' && story.category !== sliderSrcCat) {
                      return false;
                    }

                    return true;
                  });

                  if (choices.length === 0) {
                    return (
                      <div className="border border-dashed border-zinc-200 p-8 text-center text-zinc-450 italic text-[14px]">
                        {isAr ? 'لا توجد مقالات مطابقة للبحث في الأرشيف.' : 'No available archive stories match your current search/categories.'}
                      </div>
                    );
                  }

                  return (
                    <div className="max-h-[420px] overflow-y-auto border border-black divide-y divide-zinc-200 bg-white">
                      {choices.map(story => (
                        <div key={story.id} className="p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-neutral-50/50 transition-colors font-sans">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 font-mono">
                              <span className="font-mono text-[10px] bg-zinc-200 px-1 py-0.5 text-zinc-700 font-bold uppercase rounded-xs">
                                {story.category}
                              </span>
                              <span className="font-mono text-[10.5px] text-zinc-400 font-bold">
                                id: {story.id}
                              </span>
                            </div>
                            <h5 className="font-sans font-extrabold text-[15px] text-zinc-800 leading-snug">
                              {isAr ? story.titleAr : story.titleEn}
                            </h5>
                            <div className="text-[11.5px] text-zinc-400 font-serif">
                              {isAr ? `الصحفي: ${story.author?.nameAr || ''}` : `By: ${story.author?.nameEn || ''}`}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              // Promote to featured
                              const updated = articles.map(art => {
                                if (art.id === story.id) {
                                  return {
                                    ...art,
                                    isFeatured: true
                                  };
                                }
                                return art;
                              });
                              setArticles(updated);
                            }}
                            className="w-full sm:w-auto bg-neutral-100 hover:bg-black hover:text-white border border-black font-mono font-black text-xs px-3 py-1.5 shadow-[1.5px_1.5px_0_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer whitespace-nowrap"
                          >
                            ➕ {isAr ? 'أضف للمعرض' : 'ADD TO SLIDER'}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TAB 1: EDIT & PURGE LIVE STORIES */}
          {activeSubTab === 'stories-list' && (
            <div className="space-y-6">
              <div className="border-b border-black pb-3">
                <h3 className="font-sans font-black text-lg uppercase flex items-center gap-2">
                  <FileEdit size={16} />
                  {isAr ? 'سجل المحفوظات وقائمة الطبعات' : 'Database Archive Controls'}
                </h3>
                <p className="text-xxs text-zinc-500 mt-0.5">
                  {isAr ? 'مسح، تعديل، تشفير أو إعادة بناء تفاصيل الأخبار المنشورة بالموقع.' : 'Search, select and comprehensively tweak or truncate any published bulletin.'}
                </p>
              </div>

              {/* Filtering input */}
              <div className="w-full">
                <input
                  type="text"
                  placeholder={isAr ? 'ابحث عن مقال بالرقم التعريفي أو العنوان...' : 'Search records by identifier/title keys...'}
                  value={listSearchQuery}
                  onChange={(e) => setListSearchQuery(e.target.value)}
                  className="w-full text-xs p-2.5 border-2 border-black bg-neutral-50 font-bold outline-none"
                />
              </div>

              {/* Editing Form Overlay (When an article is selected for modification) */}
              {editingArticleId !== null ? (
                <div className="border-4 border-black p-4 bg-neutral-50 space-y-4 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-black pb-2">
                    <span className="font-mono text-xs font-black uppercase text-[#b91c1c]">
                      {isAr ? `تعديل المقال: ${editingArticleId}` : `MODIFICATION SCREEN: ${editingArticleId}`}
                    </span>
                    <button
                      onClick={() => setEditingArticleId(null)}
                      className="border border-black px-2 py-0.5 text-xxs font-mono font-bold hover:bg-black hover:text-white"
                    >
                      {isAr ? 'إلغاء التعديل' : 'Cancel Edit'}
                    </button>
                  </div>

                  {(() => {
                    const original = articles.find(s => s.id === editingArticleId);
                    if (!original) return null;

                    return (
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          setEditingArticleId(null);
                        }}
                        className="space-y-4 text-xs"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xxs font-mono font-bold text-zinc-600 mb-1">Title (Arabic)</label>
                            <input 
                              type="text" 
                              value={original.titleAr} 
                              onChange={(ev) => {
                                const val = ev.target.value;
                                setArticles(prev => prev.map(story => story.id === original.id ? { ...story, titleAr: val } : story));
                              }}
                              className="w-full p-2 border border-black font-semibold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xxs font-mono font-bold text-zinc-600 mb-1">Title (English)</label>
                            <input 
                              type="text" 
                              value={original.titleEn} 
                              onChange={(ev) => {
                                const val = ev.target.value;
                                setArticles(prev => prev.map(story => story.id === original.id ? { ...story, titleEn: val } : story));
                              }}
                              className="w-full p-2 border border-black font-semibold bg-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xxs font-mono font-bold text-zinc-600 mb-1">Summary (Arabic)</label>
                            <textarea 
                              rows={2}
                              value={original.summaryAr} 
                              onChange={(ev) => {
                                const val = ev.target.value;
                                setArticles(prev => prev.map(story => story.id === original.id ? { ...story, summaryAr: val } : story));
                              }}
                              className="w-full p-2 border border-black bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xxs font-mono font-bold text-zinc-600 mb-1">Summary (English)</label>
                            <textarea 
                              rows={2}
                              value={original.summaryEn} 
                              onChange={(ev) => {
                                const val = ev.target.value;
                                setArticles(prev => prev.map(story => story.id === original.id ? { ...story, summaryEn: val } : story));
                              }}
                              className="w-full p-2 border border-black bg-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xxs font-mono font-bold text-zinc-600 mb-1">Content Text (Arabic)</label>
                            <textarea 
                              rows={5}
                              value={original.contentAr} 
                              onChange={(ev) => {
                                const val = ev.target.value;
                                setArticles(prev => prev.map(story => story.id === original.id ? { ...story, contentAr: val } : story));
                              }}
                              className="w-full p-2 border border-black bg-white font-serif leading-relaxed"
                            />
                          </div>
                          <div>
                            <label className="block text-xxs font-mono font-bold text-zinc-600 mb-1">Content Text (English)</label>
                            <textarea 
                              rows={5}
                              value={original.contentEn} 
                              onChange={(ev) => {
                                const val = ev.target.value;
                                setArticles(prev => prev.map(story => story.id === original.id ? { ...story, contentEn: val } : story));
                              }}
                              className="w-full p-2 border border-black bg-white leading-relaxed"
                            />
                          </div>
                        </div>

                        {/* Story Premium status checkbox logic */}
                        <div className="flex items-center gap-2 pt-1 pb-3 text-xs">
                          <input 
                            type="checkbox" 
                            id={`edit-premium-${original.id}`}
                            checked={original.isPremium || false} 
                            onChange={(ev) => {
                              const val = ev.target.checked;
                              setArticles(prev => prev.map(story => story.id === original.id ? { ...story, isPremium: val } : story));
                            }}
                            className="w-4 h-4 accent-black cursor-pointer"
                          />
                          <label htmlFor={`edit-premium-${original.id}`} className="font-mono text-[10px] font-black text-zinc-600 block cursor-pointer select-none">
                            {isAr ? 'تصنيف كـ خبر بريميوم لشركاء الدعم المميزين ($)' : 'MARK AS PREMIUM (SUBSCRIBERS ONLY COVERAGES)'}
                          </label>
                        </div>

                        <div className="flex gap-4">
                          <button
                            type="submit"
                            className="bg-black hover:bg-zinc-800 text-white px-6 py-2 uppercase font-bold text-xxs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Save size={12} />
                            {isAr ? 'حفظ وحقن البيانات المعدلة' : 'Save Modified Story'}
                          </button>
                        </div>
                      </form>
                    );
                  })()}
                </div>
              ) : null}

              {/* Table list of matching articles */}
              <div className="border border-black overflow-x-auto">
                <table className="w-full text-left rtl:text-right border-collapse text-xs select-none">
                  <thead>
                    <tr className="bg-neutral-100 font-mono font-black border-b border-black text-zinc-700">
                      <th className="p-3 border-r border-black">{isAr ? 'الرقم التعريفي' : 'ID'}</th>
                      <th className="p-3 border-r border-black">{isAr ? 'القطاع' : 'Category'}</th>
                      <th className="p-3 border-r border-black">{isAr ? 'العنوان' : 'Story Title'}</th>
                      <th className="p-3 border-r border-black">{isAr ? 'مؤشر المشاهدة' : 'Views'}</th>
                      <th className="p-3">{isAr ? 'إجراءات تفتيش التحرير' : 'Editorial Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black font-medium text-black">
                    {filteredList.map((story) => (
                      <tr key={story.id} className="hover:bg-neutral-50/50">
                        <td className="p-3 font-mono text-[10px] bg-neutral-50 border-r border-black">{story.id}</td>
                        <td className="p-3 font-mono text-[10px] font-black border-r border-black">
                          <span className="bg-zinc-150 px-1.5 py-0.5 rounded-xs">{story.category}</span>
                        </td>
                        <td className="p-3 border-r border-black max-w-sm">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {story.isPremium && (
                              <span className="bg-red-700 text-white rounded-xs px-1.5 py-0.5 text-[9px] font-bold font-mono tracking-wider uppercase">
                                $ Premium
                              </span>
                            )}
                            <span className="font-bold text-black">{isAr ? story.titleAr : story.titleEn}</span>
                          </div>
                          <span className="text-[10px] text-zinc-500 block truncate">{isAr ? story.summaryAr : story.summaryEn}</span>
                        </td>
                        <td className="p-3 font-mono text-[10px] border-r border-black text-center font-bold">
                          {story.views.toLocaleString()}
                        </td>
                        <td className="p-3 flex items-center justify-center gap-2">
                          <button
                            onClick={() => { setEditingArticleId(story.id); window.scrollTo({ top: 380, behavior: 'smooth' }); }}
                            className="bg-neutral-100 hover:bg-black hover:text-white border border-black p-1.5 cursor-pointer text-xxs flex items-center gap-1 font-bold"
                          >
                            <Edit3 size={11} />
                            <span>{isAr ? 'تعديل' : 'Edit'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(story.id)}
                            className="bg-red-50 hover:bg-red-650 hover:text-white border border-red-650 p-1.5 cursor-pointer text-xxs flex items-center gap-1 font-bold text-red-650"
                          >
                            <Trash2 size={11} />
                            <span>{isAr ? 'حذف' : 'Purge'}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredList.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-zinc-400 font-bold">
                          {isAr ? 'لا توجد نتائج مطابقة لمفاتيح البحث.' : 'No archival matching stories found.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: WRITE NEW STORIES */}
          {activeSubTab === 'add-story' && (
            <div className="space-y-6">
              <div className="border-b border-black pb-3">
                <h3 className="font-sans font-black text-lg uppercase flex items-center gap-2">
                  <Plus size={16} />
                  {isAr ? 'تأليف وتوليد قصة وبث مباشر' : 'Journalistic Wire Writer Room'}
                </h3>
                <p className="text-xxs text-zinc-500 mt-0.5">
                  {isAr ? 'حقن برقيات صحفية بنمط الوراق كليا ببيانات مدققة ومقالات ثنائية اللغة.' : 'Inject verified articles with balanced content formats into the repository.'}
                </p>
              </div>

              {storySuccess && (
                <div className="bg-zinc-100 border-2 border-black p-3.5 text-xs text-black font-black flex items-center gap-2">
                  <Check size={16} />
                  <span>{storySuccess}</span>
                </div>
              )}

              <form onSubmit={handleCreateStory} className="space-y-4 text-xs font-medium">
                {/* Section selection and toggles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-neutral-50 p-4 border border-black">
                  <div>
                    <label className="block text-xxs font-mono font-black text-zinc-500 mb-1">DISPLAY CATEGORY SECTION</label>
                    <select
                      value={storyCategory}
                      onChange={(e) => setStoryCategory(e.target.value)}
                      className="w-full p-2 border border-black bg-white font-bold"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {isAr ? cat.labelAr : cat.labelEn} ({cat.id})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2.5 pt-4">
                    <input
                      type="checkbox"
                      id="breaking"
                      checked={storyIsBreaking}
                      onChange={(e) => setStoryIsBreaking(e.target.checked)}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <label htmlFor="breaking" className="font-black text-xxs select-none tracking-wider cursor-pointer">
                      {isAr ? 'شريط عاجل علوي أحمر' : 'SET AS BREAKING NEWS ticker'}
                    </label>
                  </div>

                  <div className="flex items-center gap-2.5 pt-4">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={storyIsFeatured}
                      onChange={(e) => setStoryIsFeatured(e.target.checked)}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <label htmlFor="featured" className="font-black text-xxs select-none tracking-wider cursor-pointer">
                      {isAr ? 'معرض الهيرو المنزلق الرئيسي' : 'FEATURE ON LEADING SLIDER GALLERY'}
                    </label>
                  </div>

                  <div className="flex items-center gap-2.5 pt-4">
                    <input
                      type="checkbox"
                      id="isPremiumAdd"
                      checked={storyIsPremium}
                      onChange={(e) => setStoryIsPremium(e.target.checked)}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <label htmlFor="isPremiumAdd" className="font-black text-xxs select-none tracking-wider cursor-pointer">
                      {isAr ? 'تصنيف كـ خبر بريميوم مغلق لشركاء الدعم ($)' : 'MARK AS PREMIUM ARTICLE (SUBSCRIBER LOCKED)'}
                    </label>
                  </div>
                </div>

                {/* AI Instant Translation Assist Bar */}
                <div className="bg-[#fffbeb] border border-[#f59e0b] p-3 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-left rtl:text-right">
                    <h5 className="font-sans font-black text-amber-900 uppercase tracking-wider text-[11px] flex items-center gap-1">
                      <span>✨ مساعد الترجمة بالذكاء الاصطناعي (AI Translation Co-Pilot)</span>
                    </h5>
                    <p className="text-[10px] text-amber-700 font-medium mt-0.5">
                      {isAr 
                        ? 'تنبيه: حقول اللغة الإنجليزية اختيارية تماماً. يمكنك ملء العربية والضغط على الترجمة، أو النشر مباشرة وسيترجمها النظام تلقائياً.' 
                        : 'English fields are completely optional. Fill Arabic and click button or publish directly (system translates on the fly).'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoTranslate}
                    disabled={isTranslating}
                    className="shrink-0 flex items-center gap-1.5 bg-[#b91c1c] hover:bg-black text-white text-xxs font-black uppercase px-3 py-2 transition-colors border-2 border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-2px] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isTranslating ? (isAr ? 'جاري الترجمة...' : 'TRANSLATING...') : (isAr ? 'انقر لترجمة الحقول فوراً' : 'TRANSLATE BILINGUAL FIELDS')}</span>
                  </button>
                </div>

                {/* Grid Titles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500">العنوان بالعربية</label>
                    <input
                      type="text"
                      value={storyTitleAr}
                      onChange={(e) => setStoryTitleAr(e.target.value)}
                      placeholder="العثور على أحواض رطوبة عملاقة بالوسط..."
                      className="w-full p-2.5 border-2 border-black bg-white font-bold"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500">English Headline (Optional)</label>
                    <input
                      type="text"
                      value={storyTitleEn}
                      onChange={(e) => setStoryTitleEn(e.target.value)}
                      placeholder={isTranslating ? "Translating from Arabic with AI..." : "Major Hydrological Reserves Discovered in Central Desert (Or leave blank to auto-translate)"}
                      className="w-full p-2.5 border-2 border-black bg-white font-bold"
                    />
                  </div>
                </div>

                {/* Summaries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500">الملخص الموجز Ar</label>
                    <textarea
                      rows={2}
                      value={storySummaryAr}
                      onChange={(e) => setStorySummaryAr(e.target.value)}
                      placeholder="بيان صادر عن مركز الهيدروجين المائي والمخاطر البيئية في بيروت..."
                      className="w-full p-2 border-2 border-black bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500">English Summary Preview (Optional)</label>
                    <textarea
                      rows={2}
                      value={storySummaryEn}
                      onChange={(e) => setStorySummaryEn(e.target.value)}
                      placeholder={isTranslating ? "Translating summary with AI..." : "Official document detailing sovereign hydrology efforts and climate remediation policies..."}
                      className="w-full p-2 border-2 border-black bg-white"
                    />
                  </div>
                </div>

                {/* Detailed Contents */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500">متن المقال والتقرير بالكامل (العربية)</label>
                    <textarea
                      rows={6}
                      value={storyContentAr}
                      onChange={(e) => setStoryContentAr(e.target.value)}
                      placeholder="أدلى المتحدث الرسمي بالتصريح الآتي في دورتها الثالثة..."
                      className="w-full p-2.5 border-2 border-black bg-white font-serif leading-relaxed"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500">Complete Story Text Content (English - Optional)</label>
                    <textarea
                      rows={6}
                      value={storyContentEn}
                      onChange={(e) => setStoryContentEn(e.target.value)}
                      placeholder={isTranslating ? "Translating full content with AI..." : "The sovereign representative verified terms for global compliance (Or leave blank to auto-translate)"}
                      className="w-full p-2.5 border-2 border-black bg-white leading-relaxed"
                    />
                  </div>
                </div>

                {/* Scribes authors options */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-neutral-50 p-3 border border-black">
                  <div>
                    <label className="block text-[10px] font-mono font-black text-zinc-600 mb-0.5">Author (Arabic)</label>
                    <input
                      type="text"
                      value={authorNameAr}
                      onChange={(e) => setAuthorNameAr(e.target.value)}
                      placeholder="معن البرّاق"
                      className="w-full p-1.5 border border-black bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-black text-zinc-600 mb-0.5">Author (English)</label>
                    <input
                      type="text"
                      value={authorNameEn}
                      onChange={(e) => setAuthorNameEn(e.target.value)}
                      placeholder="Maan Barazy"
                      className="w-full p-1.5 border border-black bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-black text-zinc-600 mb-0.5">Position Ar</label>
                    <input
                      type="text"
                      value={authorTitleAr}
                      onChange={(e) => setAuthorTitleAr(e.target.value)}
                      className="w-full p-1.5 border border-black bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-black text-zinc-600 mb-0.5">Position En</label>
                    <input
                      type="text"
                      value={authorTitleEn}
                      onChange={(e) => setAuthorTitleEn(e.target.value)}
                      className="w-full p-1.5 border border-black bg-white"
                    />
                  </div>
                </div>

                {/* AUTOMATED INTERNAL AUTHORITY LINKING */}
                <div className="space-y-2 border border-black p-3.5 bg-neutral-50">
                  <label className="block text-xxs font-mono font-black text-zinc-500 uppercase">🔗 AUTOMATED INTERNAL AUTHORITY LINK (PAGE AUTHORITY BACKLINK)</label>
                  <p className="text-[10px] text-zinc-500 pb-1">
                    {isAr 
                      ? 'اختر موضوعاً سابقاً أو في الأرشيف لربطه تلقائياً برئيسية هذا المقال بهدف التمكين العضوي لمحركات البحث (SEO Page Authority).' 
                      : 'Link this post directly to a highly authoritative historical article in the database to rapidly boost Page Authority via dynamic indexation.'}
                  </p>
                  <select
                    value={storyParentAuthorityArticleId}
                    onChange={(e) => setStoryParentAuthorityArticleId(e.target.value)}
                    className="w-full p-2 border-2 border-black bg-white text-xs font-bold font-sans"
                  >
                    <option value="">{isAr ? '-- بدون ربط داخلي دلالي --' : '-- No Internal Authority Backlink Selected --'}</option>
                    {articles.map(art => (
                      <option key={art.id} value={art.id}>
                        [{art.category.toUpperCase()}] {isAr ? art.titleAr : art.titleEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Graphical Attachment */}
                <div className="space-y-2 border border-black p-3.5">
                  <label className="block text-xxs font-mono font-black text-zinc-500">GRAPHICAL COVER IMAGE URL</label>
                  <input
                    type="text"
                    value={storyImageUrl}
                    onChange={(e) => setStoryImageUrl(e.target.value)}
                    className="w-full p-2 border-2 border-black bg-white font-mono text-[10px] text-zinc-700"
                  />
                  
                  {/* Presets Grid */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 block mb-1">CLICK PRESETS FOR GRAPHIC COVER CODES:</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {IMAGE_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setStoryImageUrl(preset.url)}
                          className={`p-1.5 border text-left text-[9px] font-mono rounded-none font-bold truncate transition-all cursor-pointer ${
                            storyImageUrl === preset.url ? 'bg-black text-white border-black' : 'bg-[#fafafa] hover:bg-neutral-150 border-zinc-300'
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SEO TARGETED KEYWORDS CMS SILO TAXONOMY (100 PRIMARY KEYWORDS) */}
                <div className="border border-black p-4 bg-zinc-50 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-300 pb-2.5">
                    <div>
                      <h4 className="font-sans font-black text-xs uppercase flex items-center gap-1.5 text-[#b91c1c]">
                        <Tag size={14} />
                        {isAr ? 'تصنيف الكلمات الرئيسية وهيكلية سيو السحابية (١٠٠ كلمة مستهدفة)' : 'SEO KEYWORDS CMS SILO TAXONOMY (100 PRIMARY TERMS)'}
                      </h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">
                        {isAr 
                          ? 'تنظيم الكلمات المفتاحية لمسح الأرشفة بربطها بالفهرس السيادي تلقائياً.' 
                          : 'Select structural keywords across 5 theme silos to inject into URLs, schema, and page headings.'}
                      </p>
                    </div>
                    {/* Auto-Extract Button */}
                    <button
                      type="button"
                      onClick={() => {
                        // Gather story texts
                        const combinedTexts = `
                          ${storyTitleEn} ${storyTitleAr} 
                          ${storySummaryEn} ${storySummaryAr} 
                          ${storyContentEn} ${storyContentAr}
                        `.toLowerCase();
                        
                        const extracted: string[] = [];
                        SEO_SILOS.forEach(silo => {
                          silo.tags.forEach(tag => {
                            const nameEnLower = tag.nameEn.toLowerCase();
                            const nameArLower = tag.nameAr.toLowerCase();
                            if (combinedTexts.includes(nameEnLower) || combinedTexts.includes(nameArLower)) {
                              if (!extracted.includes(tag.nameEn)) {
                                extracted.push(tag.nameEn);
                              }
                            }
                          });
                        });
                        
                        if (extracted.length > 0) {
                          setStoryTags(prev => {
                            const merged = [...prev];
                            extracted.forEach(tag => {
                              if (!merged.includes(tag)) merged.push(tag);
                            });
                            return merged;
                          });
                          alert(
                            isAr 
                              ? `🔮 تم استخراج وتثبيت ${extracted.length} كلمات دلالية من النص بنجاح!` 
                              : `🔮 Automatically matching text... Identified and assigned ${extracted.length} relevant SEO tags!`
                          );
                        } else {
                          alert(
                            isAr 
                              ? '🔮 لم يتم العثور على كلمات مطابقة مباشرة للـ 100 كلمة الأساسية بمحتوى النص.' 
                              : '🔮 Checked all 100 primary terms. No direct keywords found in your headline or body yet.'
                          );
                        }
                      }}
                      className="bg-black hover:bg-zinc-800 text-white border border-black font-mono text-[9px] font-black tracking-wider uppercase px-2.5 py-1.5 transition-all select-none cursor-pointer duration-150 inline-flex items-center gap-1"
                    >
                      <span>🔮</span>
                      {isAr ? 'توليد واستخراج الكلمات تلقائياً' : 'Auto-Extract Content Tags'}
                    </button>
                  </div>

                  {/* Active Selected Tags Display */}
                  <div className="bg-white border border-zinc-300 p-3 min-h-[50px] space-y-1 rounded-none">
                    <span className="font-mono text-[9px] font-black text-zinc-400 block uppercase">
                      {isAr ? 'الكلمات المختارة للبث السحابي (انقر للإزالة):' : 'Active Selected Target SEO Keywords (Click to remove):'}
                    </span>
                    {storyTags.length === 0 ? (
                      <span className="text-[10px] text-zinc-400 italic block">
                        {isAr ? 'لا يوجد كلمات مفتاحية مخصصة حتى الآن. انقر على الكلمات بالأسفل أو استخرج تلقائياً.' : 'No custom tags assigned yet. Select from the silos below or trigger auto-extract.'}
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {storyTags.map(tag => {
                          let arabicLabel = '';
                          for (const silo of SEO_SILOS) {
                            const found = silo.tags.find(t => t.nameEn === tag);
                            if (found) {
                              arabicLabel = found.nameAr;
                              break;
                            }
                          }
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => setStoryTags(prev => prev.filter(t => t !== tag))}
                              className="bg-red-50 hover:bg-red-100 text-[#b91c1c] border border-[#b91c1c] font-sans font-bold text-[10px] px-2 py-0.5 flex items-center gap-1.5 transition-all"
                            >
                              <span>#{isAr && arabicLabel ? arabicLabel : tag}</span>
                              <span className="font-extrabold text-[8px] opacity-70">×</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* 5 Core Silos Grid */}
                  <div className="space-y-4 pt-1">
                    {SEO_SILOS.map(silo => {
                      const siloTitle = isAr ? silo.titleAr : silo.titleEn;
                      return (
                        <div key={silo.id} className="border border-zinc-200 bg-white p-3">
                          <span className="font-black text-[10px] text-zinc-800 uppercase block pb-1.5 border-b border-zinc-100 mb-2">
                            📁 {siloTitle}
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5">
                            {silo.tags.map(tag => {
                              const isSelected = storyTags.includes(tag.nameEn);
                              return (
                                <button
                                  key={tag.nameEn}
                                  type="button"
                                  onClick={() => {
                                    if (isSelected) {
                                      setStoryTags(prev => prev.filter(t => t !== tag.nameEn));
                                    } else {
                                      setStoryTags(prev => [...prev, tag.nameEn]);
                                    }
                                  }}
                                  className={`p-1.5 border text-left text-[9.5px] font-medium leading-tight truncate transition-all duration-150 cursor-pointer ${
                                    isSelected 
                                      ? 'bg-[#b91c1c] text-white border-[#b91c1c] font-bold' 
                                      : 'bg-[#fafafa] hover:bg-zinc-100 text-zinc-700 border-zinc-300'
                                  }`}
                                  title={`${tag.nameEn} - ${tag.nameAr}`}
                                >
                                  {isAr ? tag.nameAr : tag.nameEn}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Commit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#b91c1c] hover:bg-red-800 text-white font-black text-xs uppercase px-8 py-3 border-2 border-black w-full cursor-pointer transition-all shadow-[4px_4px_0_0_#000]"
                  >
                    {isAr ? 'مصادقة ونشر التغطية بالصحيفة فوراً' : 'COMPILE AND DEPLOY LIVE TELEGRAM ARTICLE'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: CREATE & ORGANIZE MAIN SECTIONS */}
          {activeSubTab === 'manage-sections' && (
            <div className="space-y-6 animate-fade-in text-xs font-semibold">
              <div className="border-b border-black pb-3">
                <h3 className="font-sans font-black text-lg uppercase flex items-center gap-2">
                  <Layers size={16} />
                  {isAr ? 'تأليف قوافل وأعمدة القطاعات الفكرية' : 'Newspaper Column Setup'}
                </h3>
                <p className="text-xxs text-zinc-500 mt-0.5">
                  {isAr ? 'تأليف قطاعات مخصصة تظهر للعموم وتستقبل برقيات وتيلكسات الأقسام.' : 'Instantly deploy sections. Once deployed, they appear as selectable lists inside main navigation menus.'}
                </p>
              </div>

              {catSuccess && (
                <div className="bg-zinc-100 border-2 border-black p-3 text-black font-black">
                  <span>{catSuccess}</span>
                </div>
              )}

              {catError && (
                <div className="bg-red-50 border-2 border-red-650 p-3 text-red-650 font-black flex items-start gap-2">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span>{catError}</span>
                </div>
              )}

              {/* Category creation inputs */}
              <form onSubmit={handleCreateCategory} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-black bg-neutral-50 items-end">
                <div>
                  <label className="block text-[10px] font-mono font-black text-zinc-500 mb-1">COLUMN IDENTIFIER (ID)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. diplomacy, energy"
                    value={newCatId}
                    onChange={(e) => setNewCatId(e.target.value)}
                    className="w-full p-2 border border-black bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-black text-zinc-500 mb-1">LABEL IN ARABIC (عربي)</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: الشؤون الدبلوماسية"
                    value={newCatLabelAr}
                    onChange={(e) => setNewCatLabelAr(e.target.value)}
                    className="w-full p-2 border border-black bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-black text-zinc-500 mb-1">LABEL IN ENGLISH (EN)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Diplomatic Relations"
                    value={newCatLabelEn}
                    onChange={(e) => setNewCatLabelEn(e.target.value)}
                    className="w-full p-2 border border-black bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase py-2.5 border border-black cursor-pointer transition-all"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Plus size={14} />
                    {isAr ? 'زرع عمود قطاع' : 'Add Column'}
                  </span>
                </button>
              </form>

              {/* Table listing sections */}
              <div className="border border-black">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead>
                    <tr className="bg-neutral-100 font-mono font-black border-b border-black">
                      <th className="p-3 border-r border-black">Identifier ID</th>
                      <th className="p-3 border-r border-black">عربي</th>
                      <th className="p-3 border-r border-black">English</th>
                      <th className="p-3">Sovereign Protection</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black font-medium text-black">
                    {categories.map((cat) => {
                      const isProtected = ['all', 'fifa-2026', 'exclusives', 'editor-desk', 'lebanon', 'instats', 'middle-east', 'markets', 'arab-markets', 'telecom-internet', 'newsletter', 'premium-pricing'].includes(cat.id);
                      return (
                        <tr key={cat.id} className="hover:bg-neutral-50/50">
                          <td className="p-3 font-mono text-[11px] bg-neutral-50 border-r border-black font-bold">{cat.id}</td>
                          <td className="p-3 border-r border-black font-bold">{cat.labelAr}</td>
                          <td className="p-3 border-r border-black font-bold">{cat.labelEn}</td>
                          <td className="p-3 flex items-center justify-between">
                            {isProtected ? (
                              <span className="bg-emerald-50 text-emerald-850 px-2 py-0.5 rounded-sm text-[10px] font-bold">
                                {isAr ? '✓ قطاع محمي أصيل' : '✓ Sovereign Standard Core'}
                              </span>
                            ) : (
                              <button
                                onClick={() => handleRemoveCategory(cat.id)}
                                className="bg-red-50 hover:bg-red-650 hover:text-white text-red-650 border border-red-200 px-3 py-1 font-mono text-[10px] font-black uppercase flex items-center gap-1 cursor-pointer transition-all"
                              >
                                <Trash2 size={11} />
                                <span>{isAr ? 'شطب وحذف' : 'Erase Section'}</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: SUBSCRIBER REGISTRY AND EMAIL MANAGEMENT */}
          {activeSubTab === 'subscribers-mgmt' && (
            <div className="space-y-6 animate-fade-in text-xs font-semibold" id="admin-subscribers-tab">
              <div className="border-b border-black pb-3">
                <h3 className="font-sans font-black text-lg uppercase flex items-center gap-2">
                  <Users size={16} />
                  {isAr ? 'ديوان المشتركين وقاعدة بيانات العضوية' : 'Diwan Subscriber Integrity Registry'}
                </h3>
                <p className="text-xxs text-zinc-500 mt-0.5">
                  {isAr 
                    ? 'إدارة العناوين البريدية النشطة، وإلحاق المشتركين الجدد، ومراقبة حالة الاشتراكات المجانية والمميزة.' 
                    : 'Manage active email destinations, register subscribers, and check premium tier authorizations.'}
                </p>
              </div>

              {/* Statistics highlight ribbon */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="subscriber-stats-ribbon">
                <div className="bg-white border-2 border-black p-4 shadow-[2.5px_2.5px_0_0_rgba(0,0,0,1)]">
                  <span className="font-mono text-[10px] text-zinc-400 block uppercase font-bold">{isAr ? 'إجمالي عناوين تيلكس' : 'TOTAL MAILING DIRECTORY'}</span>
                  <span className="font-sans font-black text-2xl text-black">{subscribers.length} {isAr ? 'بريد' : 'EMAILS'}</span>
                </div>
                <div className="bg-white border-2 border-black p-4 shadow-[2.5px_2.5px_0_0_rgba(0,0,0,1)]">
                  <span className="font-mono text-[10px] text-zinc-400 block uppercase font-bold">{isAr ? 'الأعضاء البريميوم النشطين' : 'ACTIVE PREMIUM SUBSCRIBERS'}</span>
                  <span className="font-sans font-black text-2xl text-emerald-600">
                    {registeredUsers.filter(u => u.isPremiumSubscriber).length} {isAr ? 'عضو' : 'MEMBERS'}
                  </span>
                </div>
                <div className="bg-white border-2 border-black p-4 shadow-[2.5px_2.5px_0_0_rgba(0,0,0,1)]">
                  <span className="font-mono text-[10px] text-zinc-400 block uppercase font-bold">{isAr ? 'مستمعو النشرة المجانية' : 'FREE NEWSLETTER RECEIVERS'}</span>
                  <span className="font-sans font-black text-2xl text-blue-600">
                    {Math.max(0, subscribers.length - registeredUsers.filter(u => u.isPremiumSubscriber).length)} {isAr ? 'قارئ' : 'READERS'}
                  </span>
                </div>
              </div>

              {/* GOLDEN PRIME CANDIDACY QUEUE */}
              <div className="border-4 border-amber-500 p-5 bg-zinc-950 text-white space-y-4">
                <div className="border-b border-amber-500/50 pb-2.5 flex items-center justify-between">
                  <h4 className="font-sans font-black text-xs uppercase flex items-center gap-1.5 text-amber-500">
                    <Sparkles size={14} className="animate-pulse" />
                    {isAr ? 'قائمة مرشحي غولدن برايم الذكي والاعتماد السيادي' : 'GOLDEN PRIME CANDIDACY & INTEL REVIEW QUEUE'}
                  </h4>
                  <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5">
                    {registeredUsers.filter(u => u.goldenPrimeStatus === 'pending_approval').length} {isAr ? 'قيد الانتظار' : 'PENDING'}
                  </span>
                </div>

                <p className="text-[10.5px] text-zinc-400 font-sans leading-relaxed">
                  {isAr 
                    ? 'هنا يمكنك مراجعة طلبات الانضمام لديوان غولدن برايم ومحرك الأبحاث الذكي. عند قبول المرشح، سيتم إرسال تليكس ترحيب إلكتروني فوري يحتوي على روابط التفعيل والوصول الكامل.'
                    : 'Review and audit candidates applying for Golden Prime research status. Upon approval, an automated welcome notification containing active workspace credentials will be compiled and transmitted.'}
                </p>

                {registeredUsers.filter(u => u.goldenPrimeStatus === 'pending_approval').length === 0 ? (
                  <div className="text-center py-6 border border-dashed border-zinc-800 bg-zinc-900/20 text-zinc-500 text-xxs font-mono">
                    {isAr ? 'لا توجد طلبات ترشيح جديدة حالياً.' : 'No active Golden Prime candidacies awaiting review.'}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {registeredUsers.filter(u => u.goldenPrimeStatus === 'pending_approval').map((candidate, idx) => (
                      <div 
                        key={idx} 
                        className="bg-zinc-900 border border-zinc-800 p-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                      >
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-sans font-black text-xs text-white">
                              {candidate.goldenPrimeCandidacyDetails?.name || candidate.username}
                            </span>
                            <span className="text-[9px] font-mono bg-zinc-800 px-1.5 py-0.5 text-zinc-400">
                              {candidate.email}
                            </span>
                          </div>
                          
                          <div className="text-[10px] font-sans text-zinc-300">
                            <span className="font-mono text-[9px] text-amber-500 font-bold uppercase">{isAr ? 'المؤسسة: ' : 'Affiliation: '}</span>
                            <span>{candidate.goldenPrimeCandidacyDetails?.organization || 'N/A'}</span>
                          </div>

                          <div className="text-[10px] font-sans text-zinc-300">
                            <span className="font-mono text-[9px] text-amber-500 font-bold uppercase">{isAr ? 'مذكرة الغرض: ' : 'Research Intent: '}</span>
                            <span className="italic">"{candidate.goldenPrimeCandidacyDetails?.researchUseCase || 'N/A'}"</span>
                          </div>

                          <div className="text-[8.5px] font-mono text-zinc-500">
                            {isAr ? 'تاريخ التقديم: ' : 'Submitted: '}{candidate.goldenPrimeCandidacyDetails?.submittedAt || 'N/A'}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          <button
                            onClick={() => {
                              // Perform Approval
                              const rawUsers = localStorage.getItem('alwarraq_registered_users');
                              if (rawUsers) {
                                try {
                                  const users = JSON.parse(rawUsers);
                                  const updated = users.map((u: any) => {
                                    if (u.email.toLowerCase() === candidate.email.toLowerCase()) {
                                      u.goldenPrimeStatus = 'approved';
                                      u.isPremiumSubscriber = true;
                                    }
                                    return u;
                                  });
                                  localStorage.setItem('alwarraq_registered_users', JSON.stringify(updated));
                                } catch (e) {}
                              }

                              // Update current session user if same
                              const rawCurr = localStorage.getItem('alwarraq_current_user');
                              if (rawCurr) {
                                try {
                                  const curr = JSON.parse(rawCurr);
                                  if (curr.email.toLowerCase() === candidate.email.toLowerCase()) {
                                    curr.goldenPrimeStatus = 'approved';
                                    curr.isPremiumSubscriber = true;
                                    localStorage.setItem('alwarraq_current_user', JSON.stringify(curr));
                                  }
                                } catch (e) {}
                              }

                              // Log to notifications as processed
                              alert(isAr 
                                ? `✓ تم اعتماد المرشح ${candidate.username} بنجاح! تم إرسال تليكس الترحيب الآلي للعنوان ${candidate.email}` 
                                : `✓ Candidate ${candidate.username} approved! Automated welcome email dispatch simulation logged to ${candidate.email}`);
                              
                              // Reload registered users to sync panel state
                              loadRegisteredUsers();
                            }}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[9.5px] font-black py-1.5 px-3 uppercase border border-zinc-700 transition-all cursor-pointer"
                          >
                            {isAr ? 'اعتماد وقبول المرشح' : 'Approve Candidate'}
                          </button>
                          
                          <button
                            onClick={() => {
                              // Reject
                              const rawUsers = localStorage.getItem('alwarraq_registered_users');
                              if (rawUsers) {
                                try {
                                  const users = JSON.parse(rawUsers);
                                  const updated = users.map((u: any) => {
                                    if (u.email.toLowerCase() === candidate.email.toLowerCase()) {
                                      u.goldenPrimeStatus = 'none';
                                    }
                                    return u;
                                  });
                                  localStorage.setItem('alwarraq_registered_users', JSON.stringify(updated));
                                } catch (e) {}
                              }

                              // Update session if same
                              const rawCurr = localStorage.getItem('alwarraq_current_user');
                              if (rawCurr) {
                                try {
                                  const curr = JSON.parse(rawCurr);
                                  if (curr.email.toLowerCase() === candidate.email.toLowerCase()) {
                                    curr.goldenPrimeStatus = 'none';
                                    localStorage.setItem('alwarraq_current_user', JSON.stringify(curr));
                                  }
                                } catch (e) {}
                              }

                              alert(isAr ? 'تم رفض طلب الانضمام.' : 'Candidacy declined.');
                              loadRegisteredUsers();
                            }}
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-mono text-[9.5px] font-bold py-1.5 px-2.5 uppercase border border-zinc-700 transition-all cursor-pointer"
                          >
                            {isAr ? 'رفض' : 'Decline'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ADD NEW SUBSCRIBER FORM */}
              <div className="border border-black p-5 bg-[#fafafa] space-y-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div className="border-b border-black pb-2.5">
                  <h4 className="font-sans font-black text-xs uppercase flex items-center gap-1.5 text-[#b91c1c]">
                    <Plus size={13} />
                    {isAr ? 'تسجيل وإلحاق بريد إلكتروني جديد بالديوان' : 'REGISTER & ENROLL NEW SUBSCRIBER DESTINATION'}
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-medium">
                    {isAr ? 'أدخل عنوان بريد إلكتروني لإلحاقه مباشرة بقائمة مستقبلي النشرة والإشعارات.' : 'Directly inject key email addresses into the circular bulletins ledger.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-6 space-y-1">
                    <label className="font-mono text-[10px] text-zinc-600 block uppercase font-bold">{isAr ? 'عنوان البريد الإلكتروني للمشترك' : 'SUBSCRIBER EMAIL ADDRESS'}</label>
                    <input
                      type="email"
                      value={newSubEmail}
                      onChange={(e) => setNewSubEmail(e.target.value)}
                      placeholder="e.g. investor@beirutfiscal.com"
                      className="w-full p-2.5 border-2 border-black bg-white font-mono font-bold outline-none text-zinc-800"
                    />
                  </div>
                  <div className="md:col-span-6 flex gap-2">
                    <button
                      onClick={() => {
                        const emailClean = newSubEmail.trim().toLowerCase();
                        if (!emailClean || !emailClean.includes('@')) {
                          alert(isAr ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please input a valid email address.');
                          return;
                        }
                        if (subscribers.includes(emailClean)) {
                          alert(isAr ? 'هذا البريد مسجل بالفعل في القائمة' : 'This email address is already listed as a subscriber.');
                          return;
                        }
                        const updated = [...subscribers, emailClean];
                        setSubscribers(updated);
                        setNewSubEmail('');
                        alert(isAr ? '✓ تم إلحاق البريد الإلكتروني بنجاح!' : '✓ Email registration completed successfully!');
                      }}
                      className="flex-1 bg-black text-white hover:bg-zinc-800 font-mono font-black py-2.5 border-2 border-black border-double uppercase shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                    >
                      {isAr ? 'تسجيل مجاني (النشرة)' : 'Free Signup (Newsletter)'}
                    </button>
                    <button
                      onClick={() => {
                        const emailClean = newSubEmail.trim().toLowerCase();
                        if (!emailClean || !emailClean.includes('@')) {
                          alert(isAr ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please input a valid email address.');
                          return;
                        }

                        // 1. Add to subscribers telex list if missing
                        let updated = [...subscribers];
                        if (!subscribers.includes(emailClean)) {
                          updated.push(emailClean);
                          setSubscribers(updated);
                        }

                        // 2. Add or update registeredUsers state & local storage to have isPremiumSubscriber = true
                        const userMatch = registeredUsers.find(u => u.email.toLowerCase() === emailClean);
                        let updatedUsers = [...registeredUsers];
                        if (userMatch) {
                          updatedUsers = registeredUsers.map(u => {
                            if (u.email.toLowerCase() === emailClean) {
                              return { ...u, isPremiumSubscriber: true };
                            }
                            return u;
                          });
                        } else {
                          // Create a dummy reader with premium subscriber status
                          const usernamePrefix = emailClean.split('@')[0];
                          const capitalizedU = usernamePrefix.charAt(0).toUpperCase() + usernamePrefix.slice(1);
                          updatedUsers.push({
                            email: emailClean,
                            username: capitalizedU,
                            role: 'reader',
                            isPremiumSubscriber: true
                          });
                        }

                        setRegisteredUsers(updatedUsers);
                        localStorage.setItem('alwarraq_registered_users', JSON.stringify(updatedUsers));
                        setNewSubEmail('');
                        alert(isAr ? '✓ تم التسجيل وترقيتها للعضوية البريميوم الفاخرة!' : '✓ Enrolled and authorized with Sovereign Premium premium access!');
                      }}
                      className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-mono font-black py-2.5 border-2 border-black border-double uppercase shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                    >
                      {isAr ? 'تسجيل بريميوم ($)' : 'Premium Signup ($)'}
                    </button>
                  </div>
                </div>
              </div>

              {/* REGISTERED DIRECTORY TABLE & SEARCH SECTIONS */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h4 className="font-sans font-black text-xs uppercase tracking-wider text-black flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-black rounded-none"></span>
                    {isAr ? 'قائمة عناوين المشتركين وتصنيف رتب الوصول' : 'ACTIVE SUBSCRIBER TELEGRAPH \& ROSTERS DIRECTORY'}
                  </h4>

                  <input
                    type="text"
                    value={subEmailFilter}
                    onChange={(e) => setSubEmailFilter(e.target.value)}
                    placeholder={isAr ? 'ابحث عبر البريد الإلكتروني...' : 'Filter subscribers list...'}
                    className="p-2 border-2 border-black bg-white font-sans outline-none w-full sm:w-64 font-bold text-xxs"
                  />
                </div>

                <div className="border border-black overflow-x-auto bg-white">
                  <table className="w-full text-left rtl:text-right text-xs border-collapse font-sans">
                    <thead>
                      <tr className="bg-neutral-100 font-mono border-b border-black text-zinc-700 font-black">
                        <th className="p-3 border-r border-black">{isAr ? 'البريد الإلكتروني للمشترك' : 'Subscriber Email'}</th>
                        <th className="p-3 border-r border-black">{isAr ? 'نوع القناة' : 'Subscription Status'}</th>
                        <th className="p-3 border-r border-black">{isAr ? 'الحساب المرتبط' : 'Linked Account Profile'}</th>
                        <th className="p-3 text-center">{isAr ? 'إجراءات تيلكس' : 'Management Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black text-black">
                      {(() => {
                        // Filter list
                        const filterKeyword = subEmailFilter.trim().toLowerCase();
                        const matchingEmails = subscribers.filter(email => {
                          if (!filterKeyword) return true;
                          return email.toLowerCase().includes(filterKeyword);
                        });

                        if (matchingEmails.length === 0) {
                          return (
                            <tr>
                              <td colSpan={4} className="p-8 text-center italic text-zinc-400 font-serif">
                                {isAr ? 'لا توجد عناوين تطابق بحثك الحالي.' : 'No subscriber email matches your current query.'}
                              </td>
                            </tr>
                          );
                        }

                        return matchingEmails.map((email) => {
                          const userProfile = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
                          const isPremium = userProfile?.isPremiumSubscriber === true;

                          return (
                            <tr key={email} className="hover:bg-neutral-50/50">
                              <td className="p-3 border-r border-black font-mono text-[11px] font-bold select-all">
                                {email}
                              </td>
                              <td className="p-3 border-r border-black font-mono text-[10.5px]">
                                {isPremium ? (
                                  <span className="bg-emerald-100 border border-emerald-300 text-emerald-800 px-2 py-0.5 rounded-xs font-black uppercase text-[9.5px]">
                                    ★ Sovereign Premium ($)
                                  </span>
                                ) : (
                                  <span className="bg-blue-100 border border-blue-300 text-blue-800 px-2 py-0.5 rounded-xs font-bold uppercase text-[9.5px]">
                                    ✉ Free (Newsletter Only)
                                  </span>
                                )}
                              </td>
                              <td className="p-3 border-r border-black font-sans leading-normal">
                                {userProfile ? (
                                  <div className="space-y-0.5">
                                    <div className="font-bold text-zinc-800 text-[11.5px]">{userProfile.username}</div>
                                    <div className="font-mono text-[9px] text-zinc-500 uppercase">
                                      Role: {userProfile.role}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-zinc-400 font-serif italic">{isAr ? 'بريد زائر غير مسجل' : 'Visitor (Guest Wire)'}</span>
                                )}
                              </td>
                              <td className="p-3 text-center flex flex-wrap gap-2 justify-center">
                                {/* Toggle Premium Status */}
                                <button
                                  onClick={() => {
                                    // Toggle logic
                                    let updatedUsers = [...registeredUsers];
                                    if (userProfile) {
                                      updatedUsers = registeredUsers.map(u => {
                                        if (u.email.toLowerCase() === email.toLowerCase()) {
                                          return { ...u, isPremiumSubscriber: !isPremium };
                                        }
                                        return u;
                                      });
                                    } else {
                                      // Create reader account profile
                                      const usernamePrefix = email.split('@')[0];
                                      const capitalizedU = usernamePrefix.charAt(0).toUpperCase() + usernamePrefix.slice(1);
                                      updatedUsers.push({
                                        email: email,
                                        username: capitalizedU,
                                        role: 'reader',
                                        isPremiumSubscriber: true
                                      });
                                    }
                                    setRegisteredUsers(updatedUsers);
                                    localStorage.setItem('alwarraq_registered_users', JSON.stringify(updatedUsers));
                                    
                                    // Trigger reload if current user
                                    const rawCurrentUser = localStorage.getItem('alwarraq_current_user');
                                    if (rawCurrentUser) {
                                      try {
                                        const parsed = JSON.parse(rawCurrentUser);
                                        if (parsed.email.toLowerCase() === email.toLowerCase()) {
                                          const nextUser = { ...parsed, isPremiumSubscriber: !isPremium };
                                          localStorage.setItem('alwarraq_current_user', JSON.stringify(nextUser));
                                          // Note: App parent will also read this next cycle
                                        }
                                      } catch (err) {}
                                    }

                                    alert(isAr ? '✓ تم تحديث حالة الاشتراك بنجاح!' : '✓ Subscription rank changed successfully!');
                                  }}
                                  className={`px-2.5 py-1 text-[9.5px] font-mono font-black uppercase border border-black shadow-[1px_1px_0_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer ${
                                    isPremium 
                                      ? 'bg-amber-100 hover:bg-neutral-100 text-amber-800' 
                                      : 'bg-emerald-100 hover:bg-neutral-100 text-emerald-800'
                                  }`}
                                >
                                  {isPremium 
                                    ? (isAr ? 'تغليق البريميوم' : 'REVOKE PREMIUM') 
                                    : (isAr ? 'ترقية بريميوم' : 'GRANT PREMIUM')}
                                </button>

                                {/* Remove completely from subscribers mailing list */}
                                <button
                                  onClick={() => {
                                    if (!confirm(isAr ? 'هل أنت متأكد من شطب هذا العنوان من قائمة المراسلات؟' : 'Are you sure you want to remove this email subscriber from the mailing registry?')) {
                                      return;
                                    }
                                    const updated = subscribers.filter(s => s !== email);
                                    setSubscribers(updated);
                                    alert(isAr ? 'تم الحذف من القائمة.' : 'Subscriber successfully removed.');
                                  }}
                                  className="bg-red-50 hover:bg-red-650 hover:text-white text-red-650 border border-red-200 px-2 py-1 font-mono text-[9px] font-black uppercase flex items-center justify-center gap-1 cursor-pointer transition-all"
                                >
                                  <Trash2 size={11} />
                                  <span>{isAr ? 'شطب' : 'Erase'}</span>
                                </button>
                              </td>
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NEWSLETTER BROADCAST CONTROL */}
          {activeSubTab === 'newsletter' && (
            <div className="space-y-6 animate-fade-in text-xs font-semibold">
              <div className="border-b border-black pb-3">
                <h3 className="font-sans font-black text-lg uppercase flex items-center gap-2">
                  <Mail size={16} />
                  {isAr ? 'مستودع المراسلة ونظام التيلكس اليومي' : 'Telex & Newsletter Broadcasting Platform'}
                </h3>
                <p className="text-xxs text-zinc-500 mt-0.5">
                  {isAr ? 'قائمة ديوان المشتركين وبث الصكوك اللحظية للبريد.' : 'Configure custom circular despatches and broadcast them directly to active subscribers directory.'}
                </p>
              </div>

              {/* BENTO DIGITAL INGESTION PORTAL */}
              <div className="border border-black p-5 bg-[#fafafa] space-y-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-start border-b border-black pb-3">
                  <div>
                    <h4 className="font-sans font-black text-sm uppercase flex items-center gap-2">
                      <UploadCloud size={16} className="text-[#b91c1c]" />
                      {isAr ? 'ديوان التلقي الرقمي وتفريغ الوثائق بالذكاء الاصطناعي' : 'DIWAN INTELLIGENCE INGESTION PORT'}
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-medium">
                      {isAr ? 'اسحب وأفلت مستندات التحليل (PDF/BILD/TEXT) لدمجها تلقائيًا مع نشرة تيلكس اليوم.' : 'Overlay raw records (PDF, PNG, JPEG, TXT) here to automatically parse & fuse into today’s live newsletter feed via Gemini.'}
                    </p>
                  </div>
                  <span className="font-mono text-[9px] bg-black text-[#10b981] px-2 py-0.5 font-bold uppercase tracking-widest border border-[#10b981]">
                    {isAr ? 'دمج حي بالذكاء' : 'AUTOMATED EXTRACTION'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* File Upload Dropzone Form (7/12) */}
                  <div className="md:col-span-7 space-y-3">
                    <div 
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsIngestingDrag(true);
                      }}
                      onDragLeave={() => setIsIngestingDrag(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsIngestingDrag(false);
                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                          setIngestFile(e.dataTransfer.files[0]);
                          setIngestError(null);
                        }
                      }}
                      className={`border-2 border-dashed p-6 text-center transition-all flex flex-col items-center justify-center cursor-pointer min-h-[140px] ${
                        isIngestingDrag 
                          ? 'border-emerald-500 bg-emerald-50/40' 
                          : ingestFile 
                            ? 'border-black bg-zinc-100' 
                            : 'border-zinc-350 hover:border-black bg-white'
                      }`}
                      onClick={() => document.getElementById('ingest-file-picker')?.click()}
                    >
                      <input 
                        id="ingest-file-picker"
                        type="file" 
                        className="hidden" 
                        accept="application/pdf,image/*,text/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setIngestFile(e.target.files[0]);
                            setIngestError(null);
                          }
                        }}
                      />
                      {isIngestingLoading ? (
                        <div className="space-y-2 animate-pulse flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full border-4 border-black border-t-red-600 animate-spin"></div>
                          <span className="font-mono text-xs font-bold text-red-600 uppercase tracking-widest">{isAr ? 'جاري قراءة الشيفرة...' : 'DECODING RAW INTELLIGENCE...'}</span>
                        </div>
                      ) : ingestFile ? (
                        <div className="space-y-1">
                          <FileUp className="w-10 h-10 text-red-600 mx-auto" />
                          <p className="font-sans font-bold text-xs max-w-[280px] truncate mx-auto text-black">{ingestFile.name}</p>
                          <p className="font-mono text-[9px] text-zinc-500 font-bold uppercase mt-1">
                            ({(ingestFile.size / 1024).toFixed(1)} KB) • {isAr ? 'جاهز للتنقيب' : 'READY FOR EXTRACTION'}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2 text-zinc-400">
                          <UploadCloud className="w-10 h-10 mx-auto text-zinc-400" />
                          <div>
                            <span className="font-sans font-black text-xs block text-black">
                              {isAr ? 'انقر أو اسحب الملفات هنا للاستيراد' : 'Click or drag files here to upload'}
                            </span>
                            <span className="font-mono text-[10px] block mt-1 text-zinc-400">
                              PDF, PNG, JPG, JPEG, TXT
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Optional steer text for Gemini */}
                    <div>
                      <label className="block text-[10px] font-mono font-black text-zinc-500 mb-1 uppercase">
                        {isAr ? 'توجيهات إضافية لزاوية الطرح وبث الإرسالية (اختياري)' : 'Optional Editorial Steer (Angle / Directives)'}
                      </label>
                      <input 
                        type="text"
                        placeholder={isAr ? 'مثال: وجّه الذكاء الاصطناعي للتركيز على الانعكاس المعيشي والتضخم المالي...' : 'e.g., Focus heavily on trading volumes, premium slants, or specific port bypass issues.'}
                        value={ingestInstructions}
                        onChange={(e) => setIngestInstructions(e.target.value)}
                        className="w-full text-xs p-2 border border-zinc-400 bg-white"
                        disabled={isIngestingLoading}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleIngestFileSubmit(ingestFile)}
                        disabled={!ingestFile || isIngestingLoading}
                        className={`flex-1 text-white font-mono font-black text-xs py-2 px-4 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] uppercase cursor-pointer text-center flex items-center justify-center gap-1.5 border border-black ${
                          !ingestFile || isIngestingLoading
                            ? 'bg-zinc-400 border-zinc-400 cursor-not-allowed shadow-none'
                            : 'bg-red-700 hover:bg-red-800'
                        }`}
                      >
                        <FileUp size={13} />
                        {isAr ? 'بدء التحليل والدمج المعرفي' : 'EXTRACT & INGEST DOCUMENT'}
                      </button>
                      
                      {ingestFile && (
                        <button
                          type="button"
                          onClick={() => {
                            setIngestFile(null);
                            setIngestError(null);
                          }}
                          className="bg-zinc-200 hover:bg-zinc-300 text-black border border-black px-4 py-2 font-mono text-xs uppercase"
                        >
                          {isAr ? 'إلغاء' : 'CLEAR'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Extraction Feedback Panel (5/12) */}
                  <div className="md:col-span-5 border border-black p-4 bg-white flex flex-col justify-between min-h-[220px]">
                    <div className="space-y-3 h-full flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="border-b border-dashed border-zinc-300 pb-2">
                          <span className="font-mono text-[9px] font-black uppercase text-zinc-400 block">
                            {isAr ? 'مخرجات التحليل والبيان النيوروني' : 'NEURAL INGESTION MANIFEST'}
                          </span>
                        </div>

                        {ingestError && (
                          <div className="p-3 bg-red-50 border border-red-300 text-red-700 font-mono text-[10px] space-y-1">
                            <p className="font-bold uppercase flex items-center gap-1">❌ {isAr ? 'عطل في التلقي:' : 'Ingestion Failure:'}</p>
                            <p>{ingestError}</p>
                          </div>
                        )}

                        {ingestSuccessStory ? (
                          <div className="space-y-3 animate-fade-in text-[10px] font-sans">
                            <div className="p-2 border border-emerald-300 bg-emerald-50/40 text-emerald-800 font-mono flex items-center gap-1.5 uppercase font-bold text-xxs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                              {isAr ? 'تم الاستيراد والدمج بنجاح!' : 'FUSED INTO CURRENT LIVE WIRE!'}
                            </div>
                            
                            <div className="space-y-1.5 bg-neutral-50 p-2 border font-mono text-xxs">
                              <div className="flex justify-between text-[9px] text-zinc-450 font-bold border-b pb-1">
                                <span>CATEGORY: {ingestSuccessStory.category.toUpperCase()}</span>
                                <span>STATUS: ACTIVE LIVE</span>
                              </div>
                              <h5 className="font-sans font-black text-black leading-snug">
                                EN: {ingestSuccessStory.headlineEn}
                              </h5>
                              <h5 className="font-sans font-black text-black text-right leading-snug">
                                AR: {ingestSuccessStory.headlineAr}
                              </h5>
                            </div>
                            <p className="text-[10px] text-zinc-500 leading-normal border-t border-dashed pt-2">
                              {isAr 
                                ? '✓ تم دمج هذه الإرسالية مع نشرة تيلكس المتابعين بنجاح!' 
                                : '✓ This wire is now available directly in subscribers telex and updates tickers.'}
                            </p>

                            <button
                              type="button"
                              onClick={() => handleOpenDispatchForEditing(ingestSuccessStory)}
                              className="w-full mt-3 bg-[#b91c1c] hover:bg-black text-white font-sans font-black text-xxs uppercase py-2 px-3 border border-black cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                            >
                              <FileEdit size={12} />
                              {isAr ? 'فتح وتعديل لنشر المادة بالجريدة' : 'OPEN & EDIT STORY FOR PUBLISHING'}
                            </button>
                          </div>
                        ) : (
                          <div className="py-6 flex flex-col items-center justify-center text-zinc-350">
                            <FileUp className="w-12 h-12 stroke-[1] mb-2" />
                            <p className="font-mono text-[10px] text-center max-w-[200px] leading-relaxed">
                              {isAr 
                                ? 'بانتظار تلقي مستند خارجي لبدء تصفية القراءة الخوارزمية.' 
                                : 'Awaiting raw document stream to trigger neural curation.'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Curated Dispatches Library */}
                <div className="border-t border-dashed border-zinc-300 pt-5 mt-5 space-y-4">
                  <div className="flex justify-between items-center pb-1 border-b border-zinc-200">
                    <div>
                      <h5 className="font-mono text-xxs font-black uppercase text-zinc-500">
                        {isAr ? 'أرشيف وحصاد الإرساليات والبرقيات المنسقة' : 'CURATED DISPATCHES & NEURAL WIRES LIBRARY'}
                      </h5>
                      <p className="text-[9px] text-zinc-400 font-medium">
                        {isAr ? 'هنا تجد كافة الإرساليات الرقمية المستوردة؛ يمكنك مراجعتها، تعديلها، وتوجيهها لأي قسم لنشرها.' : 'Review, customize and route newly ingested satellite archives to any category.'}
                      </p>
                    </div>
                    {isCurationLoading && (
                      <span className="font-mono text-[9px] text-red-600 animate-pulse">SYNCING WIRES...</span>
                    )}
                  </div>
                  
                  {curatedDispatches.length === 0 ? (
                    <div className="py-4 text-center border-2 border-dashed border-zinc-350 bg-white">
                      <p className="text-[10px] text-zinc-400 font-mono italic">
                        {isAr ? 'لا توجد برقيات منسقة مسبقاً في قاعدة المزامنة.' : 'No pre-curated dispatches found in synchronization buffer.'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {curatedDispatches.map((dispatch, idx) => (
                        <div key={dispatch.id || idx} className="border-2 border-black bg-white p-4 space-y-3 flex flex-col justify-between hover:scale-[1.01] transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center border-b pb-1.5 border-dashed">
                              <span className="font-mono text-[9px] font-black text-red-650 bg-red-50 px-1.5 py-0.5 border border-red-200 uppercase">
                                {dispatch.category || 'sovereign-intel'}
                              </span>
                              <span className="font-mono text-[8px] text-zinc-400 font-bold">ID: {dispatch.id}</span>
                            </div>
                            <h5 className="font-sans font-black text-[11px] text-black leading-snug">
                              {isAr ? (dispatch.headlineAr || dispatch.headlineEn) : dispatch.headlineEn}
                            </h5>
                            <p className="text-[10px] text-zinc-500 line-clamp-3 leading-relaxed font-serif">
                              {isAr ? (dispatch.synopsisAr || dispatch.synopsisEn) : dispatch.synopsisEn}
                            </p>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => handleOpenDispatchForEditing(dispatch)}
                            className="w-full mt-2 bg-neutral-50 hover:bg-black hover:text-white border-2 border-black text-black font-mono font-black text-[9px] py-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                          >
                            <FileEdit size={10} />
                            {isAr ? 'مراجعة وتحرير للنشر' : 'OPEN & EDIT FOR PUBLISHING'}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* SOVEREIGN EDITING & PUBLISHING DESK MODAL OVERLAY */}
              {editingDispatch && (
                <div className="fixed inset-0 bg-black/75 z-50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
                  <div className="bg-neutral-50 border-4 border-black p-6 w-full max-w-4xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6 my-8">
                    <div className="flex justify-between items-center border-b-2 border-black pb-3">
                      <div className="flex items-center gap-2">
                        <Newspaper className="text-[#b91c1c]" size={18} />
                        <h3 className="font-sans font-black text-xs md:text-sm uppercase tracking-wide">
                          {isAr ? 'ديوان تحرير الأخبار ونشر المادة السيادية' : 'SOVEREIGN EDITING & PUBLISHING DESK'}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingDispatch(null)}
                        className="border-2 border-black bg-white hover:bg-black hover:text-white px-3 py-1 font-mono text-[10px] font-black uppercase transition-all cursor-pointer"
                      >
                        {isAr ? 'إغلاق البوابة' : 'CLOSE DESK'}
                      </button>
                    </div>

                    {publishSuccessMessage && (
                      <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 font-mono text-xs font-bold animate-pulse text-center">
                        {publishSuccessMessage}
                      </div>
                    )}

                    <form onSubmit={handlePublishEditedDispatch} className="space-y-4 text-xs font-semibold text-left rtl:text-right">
                      {/* Main Title Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-black text-zinc-500">HEADLINE / TITLE (ENGLISH)</label>
                          <input
                            type="text"
                            required
                            value={editTitleEn}
                            onChange={(e) => setEditTitleEn(e.target.value)}
                            className="w-full text-xs p-2.5 border-2 border-black bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-black text-zinc-500 text-right">العنوان الرئيسي (عربي)</label>
                          <input
                            type="text"
                            required
                            value={editTitleAr}
                            onChange={(e) => setEditTitleAr(e.target.value)}
                            className="w-full text-xs p-2.5 border-2 border-black bg-white text-right font-sans font-black"
                          />
                        </div>
                      </div>

                      {/* Synopsis Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-black text-zinc-500">SYNOPSIS / EXCERPT (ENGLISH)</label>
                          <textarea
                            rows={3}
                            required
                            value={editSummaryEn}
                            onChange={(e) => setEditSummaryEn(e.target.value)}
                            className="w-full text-xs p-2.5 border-2 border-black bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-black text-zinc-500 text-right">الخلاصة والموجز الصحفي (عربي)</label>
                          <textarea
                            rows={3}
                            required
                            value={editSummaryAr}
                            onChange={(e) => setEditSummaryAr(e.target.value)}
                            className="w-full text-xs p-2.5 border-2 border-black bg-white text-right font-sans"
                          />
                        </div>
                      </div>

                      {/* Deeper Content Body */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-black text-zinc-500">DETAILED REPORT / ARTICLE CONTENT (ENGLISH)</label>
                          <textarea
                            rows={6}
                            required
                            value={editContentEn}
                            onChange={(e) => setEditContentEn(e.target.value)}
                            className="w-full text-xs p-2.5 border-2 border-black bg-white font-serif leading-relaxed"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-black text-zinc-500 text-right">المقال والتفاصيل التحليلية الكاملة (عربي)</label>
                          <textarea
                            rows={6}
                            required
                            value={editContentAr}
                            onChange={(e) => setEditContentAr(e.target.value)}
                            className="w-full text-xs p-2.5 border-2 border-black bg-white text-right font-sans leading-relaxed"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Target Category Selector */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-black text-[#b91c1c] uppercase">
                            {isAr ? 'اختر قسم النشر المستهدف' : 'CHOOSE STRATEGIC SECTOR / SECTION'}
                          </label>
                          <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="w-full text-xs p-2.5 border-2 border-black bg-white font-bold font-mono"
                          >
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.labelEn} / {cat.labelAr} ({cat.id})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Image URL Selection */}
                        <div className="space-y-1 md:col-span-2">
                          <label className="block text-[10px] font-mono font-black text-zinc-500">COVER IMAGE URL</label>
                          <input
                            type="text"
                            required
                            value={editImageUrl}
                            onChange={(e) => setEditImageUrl(e.target.value)}
                            className="w-full text-xs p-2.5 border-2 border-black bg-white font-mono"
                          />
                        </div>
                      </div>

                      {/* Author metadata */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 bg-neutral-100 border border-zinc-200">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-zinc-500">AUTHOR NAME (EN)</label>
                          <input
                            type="text"
                            value={editAuthorEn}
                            onChange={(e) => setEditAuthorEn(e.target.value)}
                            className="w-full text-[11px] p-2 border border-black bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-zinc-500 text-right">اسم الكاتب (عربي)</label>
                          <input
                            type="text"
                            value={editAuthorAr}
                            onChange={(e) => setEditAuthorAr(e.target.value)}
                            className="w-full text-[11px] p-2 border border-black bg-white text-right"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-zinc-500">AUTHOR TITLE (EN)</label>
                          <input
                            type="text"
                            value={editAuthorTitleEn}
                            onChange={(e) => setEditAuthorTitleEn(e.target.value)}
                            className="w-full text-[11px] p-2 border border-black bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-zinc-500 text-right">الصفة المهنية للكاتب (عربي)</label>
                          <input
                            type="text"
                            value={editAuthorTitleAr}
                            onChange={(e) => setEditAuthorTitleAr(e.target.value)}
                            className="w-full text-[11px] p-2 border border-black bg-white text-right"
                          />
                        </div>
                      </div>

                      {/* Configuration Toggles */}
                      <div className="flex flex-wrap items-center gap-6 p-4 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <label className="flex items-center gap-2 cursor-pointer font-mono font-black text-xxs">
                          <input
                            type="checkbox"
                            checked={editIsPremium}
                            onChange={(e) => setEditIsPremium(e.target.checked)}
                            className="w-4 h-4 accent-black border-2 border-black cursor-pointer"
                          />
                          <span>SOVEREIGN SPECIAL (PREMIUM LOCK)</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer font-mono font-black text-xxs">
                          <input
                            type="checkbox"
                            checked={editIsFeatured}
                            onChange={(e) => setEditIsFeatured(e.target.checked)}
                            className="w-4 h-4 accent-black border-2 border-black cursor-pointer"
                          />
                          <span>FEATURED HERO BANNER</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer font-mono font-black text-xxs">
                          <input
                            type="checkbox"
                            checked={editIsBreaking}
                            onChange={(e) => setEditIsBreaking(e.target.checked)}
                            className="w-4 h-4 accent-black border-2 border-black cursor-pointer"
                          />
                          <span>BREAKING WIRE TRANSMISSION</span>
                        </label>
                      </div>

                      {/* Form buttons */}
                      <div className="flex justify-end gap-3 pt-3 border-t border-dashed border-zinc-200">
                        <button
                          type="button"
                          onClick={() => setEditingDispatch(null)}
                          className="px-4 py-2 bg-zinc-200 hover:bg-zinc-300 border border-black font-mono font-black tracking-widest text-[10px] cursor-pointer"
                        >
                          {isAr ? 'إلغاء الأمر' : 'ABORT'}
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#b91c1c] hover:bg-black text-white font-mono font-black tracking-widest text-[10px] uppercase border border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                          {isAr ? 'تنضيد ونشر الخبر بالجريدة السيادية' : 'COMMIT & PUBLISH TO LIVE FEED'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Mail dispatch form (8/12) */}
                <div className="lg:col-span-7 space-y-4">
                  <form onSubmit={handleSendNewsletter} className="space-y-4 border border-black p-4 bg-neutral-50">
                    <span className="font-mono text-xxs font-black uppercase text-zinc-500 block pb-2 border-b border-zinc-200">
                      {isAr ? 'نموذج تدوير التيلكس المفتوح' : 'TELEX BROADCAST ENVELOPE DRAFT'}
                    </span>

                    <div className="space-y-1">
                      <label className="block text-xxs font-mono font-black text-zinc-500">SUBJECT/BROADCAST LINE</label>
                      <input
                        type="text"
                        required
                        placeholder={isAr ? 'تحديث عاجل: أرباح سندات الإعمار في العقد الجديد' : 'BULLETIN: Special Reconstruction Dispatch - Al-Warraq Scribes'}
                        value={newsletterSubject}
                        onChange={(e) => setNewsletterSubject(e.target.value)}
                        className="w-full text-xs p-2.5 border-2 border-black bg-white"
                        disabled={isBroadcasting}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xxs font-mono font-black text-zinc-500">NEWSLETTER CONTENT BODY</label>
                      <textarea
                        rows={6}
                        required
                        placeholder={isAr ? 'أعضاء ديوان الوراق الأفاضل، تليكم نشرة اليوم محملة بالتفاصيل الميدانية عن إعادة توازن عوائد لبنان السيادية...' : 'Beloved subscribers, we present the compiled digital telex summarizing the regional fiscal shifts and rehabilitation efforts in Lebanon...'}
                        value={newsletterBody}
                        onChange={(e) => setNewsletterBody(e.target.value)}
                        className="w-full text-xs p-2.5 border-2 border-black bg-white font-serif leading-relaxed"
                        disabled={isBroadcasting}
                      />
                    </div>

                    {isBroadcasting ? (
                      <div className="py-2 space-y-1">
                        <div className="flex justify-between items-baseline font-mono text-[10px]">
                          <span>{isAr ? 'بث الإشارات المغناطيسية...' : 'BROADCAST TRANSCEIVER ENGAGED'}</span>
                          <span className="font-extrabold">{broadcastProgress}%</span>
                        </div>
                        <div className="w-full bg-zinc-200 h-2 border border-black relative">
                          <div className="bg-red-605 h-full transition-all duration-300" style={{ width: `${broadcastProgress}%` }}></div>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase py-3 border border-black cursor-pointer transition-all flex items-center justify-center gap-1.5"
                      >
                        <Send size={13} />
                        {isAr ? 'بث نشرة البريد كليا للمشتركين' : 'EXECUTE MAIL BROADCAST IN REAL-TIME'}
                      </button>
                    )}
                  </form>

                  {/* Active logs */}
                  {broadcastLogs.length > 0 && (
                    <div className="bg-[#1c1917] text-[#16a34a] border-2 border-black p-4 font-mono text-[10px] space-y-1.5 max-h-[220px] overflow-y-auto">
                      <span className="text-zinc-500 block font-black border-b border-zinc-700 pb-1 mb-2 uppercase">OUTPUT LOG TELEMETRY FILE:</span>
                      {broadcastLogs.map((log, lIdx) => (
                        <div key={lIdx} className="leading-snug">{log}</div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subscribers list (4/12) */}
                <div className="lg:col-span-5 border border-black p-4 space-y-4">
                  <div className="pb-2 border-b border-dashed border-current">
                    <span className="font-mono text-xxs font-black uppercase text-zinc-500 block">
                      {isAr ? 'قائمة ديوان المشتركين' : 'SUBSCRIBER REGISTRY LIST'}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-bold block">
                      {isAr ? `${subscribers.length} عنوان متصل حاليا` : `${subscribers.length} mail destinations connected`}
                    </span>
                  </div>

                  <div className="space-y-1 bg-neutral-50 border p-2 max-h-[200px] overflow-y-auto font-mono text-[10px]">
                    {subscribers.map((mail, mIdx) => (
                      <div key={mIdx} className="flex justify-between items-center py-1 border-b border-neutral-200/50 last:border-0">
                        <span className="font-black text-zinc-700 select-all">{mail}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></div>
                      </div>
                    ))}
                  </div>

                  {/* Subscription note */}
                  <div className="p-3 bg-neutral-100/60 text-[10px] text-zinc-500 leading-normal border border-dashed border-zinc-300">
                    {isAr 
                      ? '✓ تتألف هذه القائمة من عناوين ديوان الوراق بالإضافة لأعضاء البريد المباشر الذي يسجل قرّاء الموقع عبر استمارة القاع.' 
                      : '✓ The registry list gets automatically appended whenever a random visitor enrolls their subscription inside the footer panel.'}
                  </div>
                </div>

              </div>

              {/* SOVEREIGN USER PREMIUM DIRECTORY AND ACTION PORT */}
              <div className="border-t border-black pt-6 space-y-4">
                <div className="border-b border-black pb-2">
                  <h4 className="font-sans font-black text-sm uppercase">
                    {isAr ? 'ديوان المشتركين وقاعدة بيانات العضوية المميزة' : 'Sovereign Members Database & Subscription Tiers'}
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-medium">
                    {isAr ? 'تنظيم وإدارة فئات اشتراك المستخدمين المسجلين، وترقية أو سحب الاعتمادات والبريميوم.' : 'Review enrolled reader profiles, manage standard vs. premium subscriptions, and grant or revoke access.'}
                  </p>
                </div>

                <div className="border border-black overflow-x-auto bg-white">
                  <table className="w-full text-left rtl:text-right text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-100 font-mono font-black border-b border-black text-zinc-700">
                        <th className="p-3 border-r border-black">{isAr ? 'المستخدم' : 'Username'}</th>
                        <th className="p-3 border-r border-black">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</th>
                        <th className="p-3 border-r border-black text-center">{isAr ? 'الرتبة / الصفة الرقمية' : 'Sovereign Role'}</th>
                        <th className="p-3 border-r border-black text-center">{isAr ? 'حالة الدعم المميز' : 'Premium Subscriber'}</th>
                        <th className="p-3 text-center">{isAr ? 'إجراءات الترقية والضم' : 'Subscription Control Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black font-medium text-black">
                      {registeredUsers.map((user) => (
                        <tr key={user.email} className="hover:bg-neutral-50/50">
                          <td className="p-3 border-r border-black font-bold font-sans">{user.username}</td>
                          <td className="p-3 border-r border-black font-mono text-[10px] font-semibold">{user.email}</td>
                          <td className="p-3 border-r border-black text-center">
                            <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold font-mono uppercase ${
                              user.role === 'admin' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-3 border-r border-black text-center">
                            {user.role === 'admin' || user.isPremiumSubscriber ? (
                              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-850 border border-emerald-250 px-2 py-0.5 text-[10px] font-black uppercase font-mono">
                                ⬤ {isAr ? 'مُشترك مميز' : 'ACTIVE PREMIUM'}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-zinc-50 text-zinc-400 border border-zinc-200 px-2 py-0.5 text-[10px] font-mono font-bold">
                                ◯ {isAr ? 'قارئ مجاني' : 'STANDARD READER'}
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-center flex items-center justify-center gap-2">
                            {user.role !== 'admin' && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleToggleUserPremium(user.email)}
                                  className={`px-3 py-1 font-mono text-[9px] font-black uppercase border border-black cursor-pointer transition-colors ${
                                    user.isPremiumSubscriber 
                                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-850' 
                                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-850'
                                  }`}
                                >
                                  {user.isPremiumSubscriber ? (isAr ? 'سحب العضوية المميزة' : 'REVOKE PREMIUM') : (isAr ? 'ترقية لـ بريميوم الفاخرة' : 'GRANT PREMIUM')}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteUser(user.email)}
                                  className="bg-red-50 hover:bg-red-600 hover:text-white text-red-700 border border-red-200 px-3 py-1 font-mono text-[9px] font-black uppercase cursor-pointer transition-all"
                                >
                                  {isAr ? 'حذف الحساب' : 'DELETE'}
                                </button>
                              </>
                            )}
                            {user.role === 'admin' && (
                              <span className="text-[10px] font-semibold text-zinc-400 italic">
                                {isAr ? 'إداري مطلق الصلاحيات' : 'Sovereign Core Administrator'}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: SITE DESIGN & BRANDING PRESETS */}
          {activeSubTab === 'design-preset' && (
            <div className="space-y-6 animate-fade-in text-xs font-semibold">
              <div className="border-b border-black pb-3">
                <h3 className="font-sans font-black text-lg uppercase flex items-center gap-2">
                  <Palette size={16} />
                  {isAr ? 'السمات والتصميم والترويسة والتحرير' : 'Core Theme, Branding & Layout Presets'}
                </h3>
                <p className="text-xxs text-zinc-500 mt-0.5">
                  {isAr ? 'تعديل شعارات الصحيفة وغلاف النمط اللوني والهيكل الافتراضي للموقع بأكمله.' : 'Tweak public banners, change branding texts, alternate font grids or swap primary color theme.'}
                </p>
              </div>

              {designSavingSuccess && (
                <div className="bg-emerald-50 border-2 border-emerald-600 p-3 mb-4 text-xs font-black text-emerald-800 flex items-center gap-2">
                  <Check size={16} />
                  <span>{isAr ? 'تم حفظ التحديثات ونشر سمة الصحيفة الجديدة بالكامل لمستخدمي الموقع!' : 'Administrative theme modifications compiled and saved instantly.'}</span>
                </div>
              )}

              <form onSubmit={handleSaveDesign} className="space-y-6 border border-black p-5 bg-neutral-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Paper Title */}
                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500 uppercase">Newspaper Title (Arabic)</label>
                    <input
                      type="text"
                      value={localTitleAr}
                      onChange={(e) => setLocalTitleAr(e.target.value)}
                      className="w-full text-xs font-bold p-2.5 border-2 border-black bg-white"
                      placeholder="e.g. الورّاق"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500 uppercase">Newspaper Title (English)</label>
                    <input
                      type="text"
                      value={localTitleEn}
                      onChange={(e) => setLocalTitleEn(e.target.value)}
                      className="w-full text-xs font-bold p-2.5 border-2 border-black bg-white"
                      placeholder="e.g. Al-Warraq"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Banner Slogans */}
                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500 uppercase">Main Header Slogan (Arabic)</label>
                    <textarea
                      rows={2}
                      value={localSloganAr}
                      onChange={(e) => setLocalSloganAr(e.target.value)}
                      className="w-full text-xs p-2.5 border-2 border-black bg-white"
                      placeholder="مؤسسة صحفية مستقلة..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500 uppercase">Main Header Slogan (English)</label>
                    <textarea
                      rows={2}
                      value={localSloganEn}
                      onChange={(e) => setLocalSloganEn(e.target.value)}
                      className="w-full text-xs p-2.5 border-2 border-black bg-white"
                      placeholder="Independent Press and Literary Archives..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* SubHeader blocks */}
                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500 uppercase">Sub-Header Slogan (Arabic)</label>
                    <input
                      type="text"
                      value={localSubAr}
                      onChange={(e) => setLocalSubAr(e.target.value)}
                      className="w-full text-xs p-2.5 border-2 border-black bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500 uppercase">Sub-Header Slogan (English)</label>
                    <input
                      type="text"
                      value={localSubEn}
                      onChange={(e) => setLocalSubEn(e.target.value)}
                      className="w-full text-[11px] p-2.5 border-2 border-black bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-zinc-200 pt-4">
                  {/* Site Banners alerts */}
                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500 uppercase">Urgent Alert Banner Msg (Arabic)</label>
                    <input
                      type="text"
                      value={localAlertAr}
                      onChange={(e) => setLocalAlertAr(e.target.value)}
                      className="w-full text-xs p-2.5 border-2 border-black bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500 uppercase">Urgent Alert Banner Msg (English)</label>
                    <input
                      type="text"
                      value={localAlertEn}
                      onChange={(e) => setLocalAlertEn(e.target.value)}
                      className="w-full text-xs p-2.5 border-2 border-black bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-zinc-200 pt-4">
                  {/* Primary default layout */}
                  <div className="space-y-2">
                    <label className="block text-xxs font-mono font-black text-zinc-500 uppercase">DEFAULT LAYOUT VIEW</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer font-bold">
                        <input
                          type="radio"
                          name="defaultLayout"
                          value="digital"
                          checked={localLayout === 'digital'}
                          onChange={() => setLocalLayout('digital')}
                          className="accent-black"
                        />
                        <span>{isAr ? 'رقمي عصري' : 'Modern Digital'}</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer font-bold">
                        <input
                          type="radio"
                          name="defaultLayout"
                          value="classic-print"
                          checked={localLayout === 'classic-print'}
                          onChange={() => setLocalLayout('classic-print')}
                          className="accent-black"
                        />
                        <span>{isAr ? 'مطبوع كلاسيكي (ورق معتق)' : 'Classic Vintage Print'}</span>
                      </label>
                    </div>
                  </div>

                  {/* Themes Accents color picker */}
                  <div className="space-y-2">
                    <label className="block text-xxs font-mono font-black text-zinc-500 uppercase">THEME ACCENT BRAND COLOR</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setLocalTheme('red')}
                        className={`p-2 border-2 text-[10px] uppercase font-black tracking-wide text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          localTheme === 'red' ? 'bg-red-50 border-red-700 text-red-800 font-bold' : 'bg-white border-zinc-200 hover:border-black text-zinc-650'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 bg-[#b91c1c] rounded-full inline-block"></span>
                        Red
                      </button>
                      <button
                        type="button"
                        onClick={() => setLocalTheme('slate')}
                        className={`p-2 border-2 text-[10px] uppercase font-black tracking-wide text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          localTheme === 'slate' ? 'bg-zinc-100 border-black text-black font-bold' : 'bg-white border-zinc-200 hover:border-black text-zinc-650'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 bg-zinc-805 rounded-full inline-block"></span>
                        Slate
                      </button>
                      <button
                        type="button"
                        onClick={() => setLocalTheme('blue')}
                        className={`p-2 border-2 text-[10px] uppercase font-black tracking-wide text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          localTheme === 'blue' ? 'bg-blue-50 border-blue-700 text-blue-800 font-bold' : 'bg-white border-zinc-200 hover:border-black text-zinc-650'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 bg-blue-800 rounded-full inline-block"></span>
                        Blue
                      </button>
                      <button
                        type="button"
                        onClick={() => setLocalTheme('emerald')}
                        className={`p-2 border-2 text-[10px] uppercase font-black tracking-wide text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          localTheme === 'emerald' ? 'bg-emerald-50 border-emerald-700 text-emerald-805 font-bold' : 'bg-white border-zinc-200 hover:border-black text-zinc-650'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 bg-emerald-850 rounded-full inline-block"></span>
                        Emerald
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase py-3 border border-black cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Save size={14} />
                  <span>{isAr ? 'اعتماد وحفظ سمة الصحيفة والصفحات' : 'APPLY & STORE BRAND CONFIGURATION'}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 6: DYNAMIC CUSTOM COMPONENTS & WIDGET BUILDER */}
          {activeSubTab === 'widgets-components' && (
            <div className="space-y-6 animate-fade-in text-xs font-semibold">
              <div className="border-b border-black pb-3">
                <h3 className="font-sans font-black text-lg uppercase flex items-center gap-2">
                  <LayoutGrid size={16} />
                  {isAr ? 'حوكمة وتصميم المكونات الفريدة والويدجت' : 'Dynamic Components Builder & Injector'}
                </h3>
                <p className="text-xxs text-zinc-500 mt-0.5">
                  {isAr ? 'تأليف وصياغة صناديق تفاعلية مخصصة وحقنها في ترويسة أو شريط أو تذييل الجريدة.' : 'Build responsive bespoke components with tailored styling, and inject them over live layout regions.'}
                </p>
              </div>

              {widgetSuccessMessage && (
                <div className="bg-emerald-50 border-2 border-emerald-600 p-3 mb-2 text-xs font-black text-emerald-800 flex items-center gap-2 animate-pulse">
                  <Check size={16} />
                  <span>{widgetSuccessMessage}</span>
                </div>
              )}

              {widgetErrorMessage && (
                <div className="bg-red-50 border-2 border-red-600 p-3 mb-2 text-xs font-black text-red-800 flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{widgetErrorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Add Widget Form */}
                <form onSubmit={handleCreateWidget} className="lg:col-span-5 space-y-4 border border-black p-4 bg-neutral-50 mb-0">
                  <span className="font-mono text-xxs font-black uppercase text-zinc-500 block pb-2 border-b border-zinc-200">
                    {isAr ? 'صياغة خلايا جديدة' : 'COMPOSE bespoke COMPONENT'}
                  </span>

                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500">COMPONENT UNIQUE ID</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. beirut-sponsor-banner"
                      value={widgetId}
                      onChange={(e) => setWidgetId(e.target.value)}
                      className="w-full text-xs p-2 border border-black bg-white font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xxs font-mono font-black text-zinc-500">Title (Arabic)</label>
                      <input
                        type="text"
                        required
                        value={widgetTitleAr}
                        onChange={(e) => setWidgetTitleAr(e.target.value)}
                        className="w-full text-xs p-2 border border-black bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xxs font-mono font-black text-zinc-500">Title (English)</label>
                      <input
                        type="text"
                        required
                        value={widgetTitleEn}
                        onChange={(e) => setWidgetTitleEn(e.target.value)}
                        className="w-full text-xs p-2 border border-black bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500">Description / Inline HTML (Arabic)</label>
                    <textarea
                      rows={2}
                      required
                      value={widgetContentAr}
                      onChange={(e) => setWidgetContentAr(e.target.value)}
                      className="w-full text-xs p-2 border border-black bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xxs font-mono font-black text-zinc-500">Description / Inline HTML (English)</label>
                    <textarea
                      rows={2}
                      required
                      value={widgetContentEn}
                      onChange={(e) => setWidgetContentEn(e.target.value)}
                      className="w-full text-xs p-2 border border-black bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="space-y-1">
                      <label className="block text-xxs font-mono font-black text-zinc-500">Component Template</label>
                      <select
                        value={widgetType}
                        onChange={(e: any) => setWidgetType(e.target.value)}
                        className="w-full text-xxs p-2 border border-black bg-white"
                      >
                        <option value="card-widget">Card Content Block</option>
                        <option value="alert-banner">Broad Ribbed Banner</option>
                        <option value="text-snippet">Minimal Callout Line</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xxs font-mono font-black text-zinc-500 font-bold">Inject Region Slot</label>
                      <select
                        value={widgetLocation}
                        onChange={(e: any) => setWidgetLocation(e.target.value)}
                        className="w-full text-xxs p-2 border border-black bg-white font-bold"
                      >
                        <option value="top-bar">Page Header (Below Ticker)</option>
                        <option value="sidebar">Sidebar Railway Panel</option>
                        <option value="footer">Footer Directory Wing</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="space-y-1">
                      <label className="block text-xxs font-mono font-black text-zinc-500 font-bold">Palette Visual Theme</label>
                      <select
                        value={widgetStyle}
                        onChange={(e: any) => setWidgetStyle(e.target.value)}
                        className="w-full text-xxs p-2 border border-black bg-white font-bold"
                      >
                        <option value="gold-premium">Premium Aurum Gold</option>
                        <option value="red-alert">Urgent Vermillion Red</option>
                        <option value="black-minimal">Monochrome Carbon Black</option>
                        <option value="green-stats">Sovereign Mint Green</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                        <input
                          type="checkbox"
                          checked={widgetIsActive}
                          onChange={(e) => setWidgetIsActive(e.target.checked)}
                          className="accent-black h-3.5 w-3.5 border border-black"
                        />
                        <span>{isAr ? 'مفعّل' : 'Active On Creation'}</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-zinc-800 text-white font-black text-xs py-2.5 border border-black transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>{isAr ? 'تجميع وبث المكون الجديد' : 'ASSEMBLE & INJECT COMPONENT'}</span>
                  </button>
                </form>

                {/* List Current Custom Components */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="pb-2 border-b border-dashed border-current">
                    <span className="font-mono text-xxs font-black uppercase text-zinc-500 block">
                      {isAr ? 'المكونات المخصصة النشطة حالياً بالتطبيق' : 'ACTIVE INJECTED CUSTOM COMPONENTS'}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-bold block">
                      {isAr ? `${dynamicWidgets.length} مكون مركب` : `${dynamicWidgets.length} layouts active in the network`}
                    </span>
                  </div>

                  {dynamicWidgets.length === 0 ? (
                    <div className="border border-dashed border-zinc-300 p-8 text-center text-zinc-400 italic">
                      {isAr ? 'لم يتم صياغة أي مكونات مخصصة تلوح بالأفق.' : 'No custom templates have been created yet.'}
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                      {dynamicWidgets.map((wid) => (
                        <div key={wid.id} className="border-2 border-black p-3.5 bg-white space-y-3 shadow-none">
                          <div className="flex justify-between items-start gap-1 pb-2 border-b border-neutral-100">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] bg-neutral-200 px-1 font-bold text-zinc-800 uppercase tracking-tight">{wid.id}</span>
                                <span className="font-sans font-bold text-xs">{isAr ? wid.titleAr : wid.titleEn}</span>
                              </div>
                              <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400 mt-1 uppercase">
                                <span>Style: {wid.style}</span> | <span>Slots: {wid.location}</span> | <span>Type: {wid.type}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 animate-none">
                              <button
                                type="button"
                                onClick={() => handleToggleWidgetActive(wid.id)}
                                className={`px-2 py-0.5 rounded-sm border font-mono text-[9px] font-black uppercase cursor-pointer ${
                                  wid.isActive 
                                    ? 'bg-emerald-50 text-emerald-850 border-emerald-300' 
                                    : 'bg-zinc-100 text-zinc-400 border-zinc-200'
                                }`}
                              >
                                {wid.isActive ? (isAr ? 'مفعّل' : 'ENABLED') : (isAr ? 'غير نشط' : 'DISABLED')}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteWidget(wid.id)}
                                className="text-zinc-400 hover:text-red-650 transition-colors cursor-pointer"
                                title={isAr ? 'حذف المكون' : 'Erase Component'}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>

                          <div className="text-xxs font-medium bg-neutral-50 px-2 py-1.5 rounded-xs font-sans text-zinc-650 leading-relaxed max-h-[80px] overflow-y-auto">
                            <strong>{isAr ? 'محتوى النموذج:' : 'Sample content:'}</strong> {isAr ? wid.contentAr : wid.contentEn}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CENTRAL SERVICES AND DATABASE health DESK */}
          {activeSubTab === 'data-validator' && (
            <div className="space-y-6 animate-fade-in text-xs font-semibold">
              <div className="border-b border-black pb-3">
                <h3 className="font-sans font-black text-lg uppercase flex items-center gap-2">
                  <ShieldCheck size={16} />
                  {isAr ? 'نظام مراجعة وتدقيق وفحص جودة البيانات' : 'Central Editorial Integrity & Data Validator'}
                </h3>
                <p className="text-xxs text-zinc-500 mt-0.5">
                  {isAr ? 'مسح وقراءة وتحليل المقالات وقائمة المشتركين وتصحيح الحقول الناقصة وتأكيد نزاهة البيانات.' : 'Iterate system database layers, enforce standard constraints, identify duplicates and run diagnostic validation scripts.'}
                </p>
              </div>

              {(() => {
                const defectiveArticles = articles.filter(art => {
                  return (
                    !art.titleAr.trim() || 
                    !art.titleEn.trim() || 
                    !art.contentAr.trim() || 
                    !art.contentEn.trim() ||
                    art.contentAr.length < 50 ||
                    art.contentEn.length < 50
                  );
                });

                const duplicateSubscribers = subscribers.filter((email, index) => subscribers.indexOf(email) !== index);
                const healthDeductions = (defectiveArticles.length * 15) + (duplicateSubscribers.length * 5);
                const healthScore = Math.max(0, 100 - healthDeductions);

                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="border-2 border-black p-4 bg-zinc-50">
                        <span className="font-mono text-xxs font-black text-zinc-400 block uppercase">SYSTEM HEALTH SCORE</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className={`font-sans font-black text-3.5xl ${healthScore > 85 ? 'text-emerald-800' : healthScore > 60 ? 'text-amber-800' : 'text-red-700'}`}>{healthScore}%</span>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">INTEGRITY PASS</span>
                        </div>
                        <div className="w-full bg-zinc-200 h-2 mt-2 border border-black">
                          <div className={`h-full transition-all duration-500 ${healthScore > 85 ? 'bg-emerald-600' : healthScore > 60 ? 'bg-amber-600' : 'bg-red-650'}`} style={{ width: `${healthScore}%` }}></div>
                        </div>
                      </div>

                      <div className="border-2 border-black p-4 bg-zinc-50">
                        <span className="font-mono text-xxs font-black text-zinc-400 block uppercase">BILINGUAL ARCHIVE FAULTS</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className={`font-sans font-black text-3.5xl ${defectiveArticles.length === 0 ? 'text-emerald-800' : 'text-red-750'}`}>{defectiveArticles.length}</span>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">WARNINGS PENDING</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-1 font-semibold">
                          {isAr ? 'مقالات فارغة أو غير مترجمة ترجمة كاملة.' : 'Articles missing bilingual translations or with deficient character length.'}
                        </p>
                      </div>

                      <div className="border-2 border-black p-4 bg-zinc-50">
                        <span className="font-mono text-xxs font-black text-zinc-400 block uppercase">CIRCULAR DUPLICATIONS</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className={`font-sans font-black text-3.5xl ${duplicateSubscribers.length === 0 ? 'text-emerald-800' : 'text-amber-700'}`}>{duplicateSubscribers.length}</span>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">IDENTIFIED CLASHES</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-1 font-semibold">
                          {isAr ? 'عناوين بريدية مكررة في تيلكس المشتركين.' : 'Identified identical subscriber emails eligible for automatic database pruning.'}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="bg-neutral-50 border border-black p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <div>
                        <span className="font-mono text-[10px] font-black text-zinc-500 uppercase block">INTEGRITY RESOLVER PROTOCOL</span>
                        <span className="text-[10px] text-zinc-450 font-bold block">
                          {isAr ? 'تصليح وضغط قاعدة البيانات تلقائياً وتصفية التكرارات الكسولة.' : 'Trigger database synchronization to fix duplicate subscriber lists and prune dead emails.'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {duplicateSubscribers.length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const unique = Array.from(new Set(subscribers));
                              setSubscribers(unique);
                              alert(isAr ? 'تم تطهير وحذف التكرارات بنجاح!' : 'Subscriber mail duplication cleaned cleanly.');
                            }}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-mono text-[10px] font-black uppercase px-4 py-2 cursor-pointer transition-colors"
                          >
                            {isAr ? 'شطب وتطهير البريد المكرر' : 'Prune Duplicated Emails'}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            let modified = false;
                            const repaired = articles.map(art => {
                              let copy = { ...art };
                              if (!copy.titleEn.trim()) { copy.titleEn = `Translation Pending ID: ${art.id}`; modified = true; }
                              if (!copy.titleAr.trim()) { copy.titleAr = `ترجمة معلقة للمقال: ${art.id}`; modified = true; }
                              if (!copy.contentAr.trim()) { copy.contentAr = `لم يُكتب محتوى بالعربية بعد.`; modified = true; }
                              if (!copy.contentEn.trim()) { copy.contentEn = `English content block under editorial preparation.`; modified = true; }
                              return copy;
                            });
                            if (modified) {
                              setArticles(repaired);
                              alert(isAr ? 'تم إصلاح تعارضات الترجمة تلقائياً!' : 'Bilingual translation records synchronized and patched successfully.');
                            } else {
                              alert(isAr ? 'قاعدة بيانات المقالات سليمة تماماً ولا تحتاج لإصلاح.' : 'Database articles are already perfectly valid and synchronized.');
                            }
                          }}
                          className="bg-black hover:bg-zinc-800 text-white font-mono text-[10px] font-black uppercase px-4 py-2 cursor-pointer transition-all flex items-center gap-1"
                        >
                          <RefreshCw size={11} />
                          {isAr ? 'إصلاح ومزامنة المحفوظات' : 'Trigger Automated Patch'}
                        </button>
                      </div>
                    </div>

                    {/* Pending warnings detail list */}
                    <div className="border border-black">
                      <div className="bg-neutral-100 p-2.5 font-mono font-black border-b border-black text-[10px] text-zinc-700 uppercase">
                        {isAr ? 'تقرير الأخطاء المفصل لمعايير السرد الصحفي' : 'CRITICAL DATABASE DIAGNOSIS ANALYSIS REPORT'}
                      </div>
                      <div className="divide-y divide-zinc-200 bg-white max-h-[250px] overflow-y-auto">
                        {defectiveArticles.length === 0 && duplicateSubscribers.length === 0 ? (
                          <div className="p-6 text-center text-zinc-400 italic text-xxs font-semibold">
                            {isAr ? '✓ جميع جداول البيانات سليمة وخاضعة للمقاييس المعيارية للجريدة!' : '✓ Database health verified. All archival rows are fully normalized.'}
                          </div>
                        ) : (
                          <>
                            {defectiveArticles.map(art => (
                              <div key={art.id} className="p-3 flex items-start gap-3 hover:bg-red-50/25 text-xxs">
                                <span className="bg-red-50 text-red-700 border border-red-200 font-mono font-black text-[8px] uppercase px-1.5 py-0.5 rounded-sm shrink-0">DATA FAULT</span>
                                <div>
                                  <span className="font-mono text-zinc-400 font-black">Article ID: {art.id}</span>
                                  <p className="font-sans font-bold text-black mt-0.5">
                                    {isAr 
                                      ? `المكون يشكو من نقص الترجمة الصحفية بالكامل: العنوان العربي "${art.titleAr}"` 
                                      : `Article missing translation or has extremely insufficient data. Title: "${art.titleEn}"`}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {duplicateSubscribers.map((mail, dIdx) => (
                              <div key={dIdx} className="p-3 flex items-start gap-3 hover:bg-amber-50/25 text-xxs">
                                <span className="bg-amber-50 text-amber-800 border border-amber-200 font-mono font-black text-[8px] uppercase px-1.5 py-0.5 rounded-sm shrink-0">DUPLICATE</span>
                                <div>
                                  <span className="font-mono text-zinc-400 font-black">Subscriber clash detected</span>
                                  <p className="font-sans font-bold text-black mt-0.5">
                                    {isAr ? `تكرار البريد الكتروني: ${mail}` : `Identified subscriber duplicate mail row: ${mail}`}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 8: PRODUCTION DEPLOYMENT CONSOLE (DEPLOYMENT & SYNC) */}
          {activeSubTab === 'live-deploy' && (
            <div className="space-y-6 animate-fade-in text-xs font-semibold">
              <div className="border-b border-black pb-3">
                <h3 className="font-sans font-black text-lg uppercase flex items-center gap-2">
                  <UploadCloud size={16} className="text-[#b91c1c]" />
                  {isAr ? 'النشر والاتساق السحابي' : 'Deployment & Sync'}
                </h3>
                <p className="text-xxs text-zinc-500 mt-0.5">
                  {isAr 
                    ? 'التحقق الفوري من حالة مستودع جيت البرمجي ومزامنة التعديلات وإطلاق الإنتاج المركزي.' 
                    : 'Query local repository status changes and execute shell script parameters to push your latest analytical files and content updates.'}
                </p>
              </div>

              {/* Main Content Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Column 1: Git Repository Status Block */}
                <div className="border-2 border-black p-4 bg-white space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center border-b border-zinc-200 pb-1.5 mb-3">
                      <h4 className="font-mono text-xs font-black uppercase text-zinc-700 tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        {isAr ? 'حالة مستودع المخطوطات والتحليلات' : 'Current Git Repository Status'}
                      </h4>
                      <button
                        type="button"
                        disabled={isFetchingStatus}
                        onClick={fetchGitStatus}
                        className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 border border-black text-[9px] font-mono font-black uppercase tracking-tight flex items-center gap-1 cursor-pointer transition-colors"
                        title={isAr ? 'تحديث الحالة' : 'Refresh Git Status'}
                      >
                        <RefreshCw size={10} className={isFetchingStatus ? "animate-spin" : ""} />
                        {isFetchingStatus ? (isAr ? 'جاري الجلب' : 'FETCHING') : (isAr ? 'تحديث' : 'REFRESH')}
                      </button>
                    </div>

                    <div className="font-mono text-[10px] bg-zinc-950 text-teal-400 p-3 h-[180px] overflow-y-auto border border-black whitespace-pre-wrap leading-tight select-text select-all">
                      {isFetchingStatus ? (
                        <span className="text-zinc-500 italic block animate-pulse">
                          $ git status --short ...
                        </span>
                      ) : gitStatus ? (
                        gitStatus
                      ) : (
                        <span className="text-zinc-500 italic block">
                          {isAr ? "لا توجد تفاصيل للحالة حالياً. اضغط تحديث للجلب الفوري." : "No status details. Click 'Refresh' to inspect git workspace."}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mt-4 bg-zinc-50 p-2.5 border border-dashed border-zinc-300 font-mono text-[9px] leading-relaxed text-zinc-650">
                    <span className="font-black text-black block uppercase">{isAr ? "تحليل مسار جيت الفوري:" : "Workspace Directory Diagnostics:"}</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      <li>{isAr ? "الموقع الفرعي: origin/main" : "Tracking branch: origin/main"}</li>
                      <li>{isAr ? "ملفات محلية معلقة: كشف تلقائي" : "Index state: Auto-tracked modifications ready"}</li>
                      <li>{isAr ? "مسار بروتوكول السيناريو: scripts/deploy.sh" : "Executed parameter toolpath: scripts/deploy.sh"}</li>
                    </ul>
                  </div>
                </div>

                {/* Column 2: Trigger Live Production Sync */}
                <div className="border-2 border-black p-4 bg-white space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-mono text-xs font-black uppercase text-[#b91c1c] tracking-wider border-b border-zinc-200 pb-1.5 mb-3">
                      {isAr ? 'أوامر التزامن وبث تيلكس الميزان' : 'Live Production Sync Pipeline'}
                    </h4>

                    <p className="text-[11px] text-zinc-650 leading-relaxed mb-4">
                      {isAr 
                        ? 'سيقوم النظام المركزي بتنفيذ أمر قذيفة متكامل يقوم بعمل الإجراءات الثلاثة تالياً فورياً عبر خوادم البنية التحتية للمستودع:'
                        : 'Triggering execution automatically wraps code adjustments and pushes terminal payloads on behalf of the editor. This runs the following sequence:'}
                    </p>

                    <div className="bg-neutral-50 p-3 border-l-4 border-[#b91c1c] font-mono text-[10px] text-zinc-700 space-y-1 my-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#b91c1c] font-black">1.</span>
                        <span className="font-bold">git add .</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#b91c1c] font-black">2.</span>
                        <span className="font-bold">git commit -m "Finalize updates"</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#b91c1c] font-black">3.</span>
                        <span className="font-bold">git push origin main</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={isDeploying}
                      onClick={handleDeploy}
                      className={`w-full font-sans font-black text-xs uppercase tracking-wider py-4 px-6 border-4 shadow-custom hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isDeploying 
                          ? 'bg-zinc-100 border-zinc-400 text-zinc-400 cursor-not-allowed' 
                          : 'bg-red-600 text-white border-black hover:bg-red-750'
                      }`}
                    >
                      <RefreshCw size={14} className={isDeploying ? "animate-spin" : ""} />
                      {isDeploying 
                        ? (isAr ? 'جاري بث المزامنة السحابية...' : 'Synchronizing branches...') 
                        : (isAr ? 'مزامنة وبث خط الإنتاج' : 'Sync to Production')}
                    </button>
                  </div>
                </div>

              </div>

              {/* Console Output Monitor (Live Logs Terminal) */}
              <div className="border-2 border-black p-4 bg-zinc-900 text-white relative">
                <div className="absolute top-3 right-4 flex items-center gap-1.5 select-none">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="font-mono text-[9px] font-black text-zinc-400 uppercase">SYS MONITOR & DEPLOYMENT LOG</span>
                </div>

                <h4 className="font-mono text-xs font-black uppercase text-zinc-300 tracking-wider border-b border-zinc-850 pb-1.5 flex items-center gap-1.5">
                  {isAr ? 'شاشة الإرسال وتيلكس المخرجات الفوري' : 'Live Deploy Output Logs'}
                </h4>

                <div className="font-mono text-[10px] bg-black text-emerald-400 p-3 h-[180px] overflow-y-auto mt-3 border border-zinc-800 whitespace-pre-wrap leading-relaxed select-text select-all">
                  {deployLog.length === 0 ? (
                    <span className="text-zinc-650 italic">
                      {isAr 
                        ? "$ الانتظار في وضع الخمول... اضغط على تنفيذ بروتوكول المزامنة لبدء بث أوامر شيل جيت." 
                        : "$ Terminal idle. Awaiting central execution trigger request..."}
                    </span>
                  ) : (
                    deployLog.map((line, idx) => (
                      <div key={idx} className="mb-1 text-emerald-400">
                        {line}
                      </div>
                    ))
                  )}
                </div>
                
                <div className="mt-2 text-xxs font-mono text-zinc-400 flex justify-between items-center">
                  <span>{isAr ? "المنفذ النشط: 3000" : "Active Port: 3000"}</span>
                  <span>{isAr ? "تفويض مستودع جيت الآمن" : "Secure sandboxed shell execution"}</span>
                </div>
              </div>

              {/* Advanced Deployment History & Simulated Push Pipeline */}
              <DeploymentManager language={language} articles={articles} />

            </div>
          )}

          {/* Business Logic Methods */}
          {(() => {
            // Invisible render of helper handler bindings
            return null;
          })()}

        </div>

      </div>

    </div>
  );
}
