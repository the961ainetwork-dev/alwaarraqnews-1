import React, { useState, useRef, useEffect } from 'react';
import { NavigationTab, UserProfile } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Layers, 
  FileText, 
  Anchor, 
  Grid, 
  Landmark, 
  BarChart2, 
  TrendingUp, 
  Cpu, 
  BookOpen, 
  Award, 
  Heart, 
  Trophy, 
  Activity, 
  Bookmark,
  Globe,
  MessageSquare,
  MoreHorizontal,
  Menu,
  X,
  Sparkles,
  Flame,
  Megaphone,
  AlertCircle
} from 'lucide-react';

const DESK_METADATA: Record<string, {
  taglineAr: string;
  taglineEn: string;
  subAr: string;
  subEn: string;
  badge?: string;
  badgeColor?: string;
}> = {
  // Sovereign Desk
  'alwarraq-investigations': {
    taglineAr: 'تحقيقات استقصائية',
    taglineEn: 'Investigative Dossiers',
    subAr: 'ملفات كاشفة للحقائق ووثائق سرية استثنائية',
    subEn: 'Deep investigations and leaked diplomatic folders',
    badge: 'INTEL',
    badgeColor: 'bg-red-900/85 text-red-100 border-red-700'
  },
  'war-room': {
    taglineAr: 'شؤون العمليات',
    taglineEn: 'Tactical Command',
    subAr: 'متابعة بؤر التوتر الإقليمية وخرائط النزاع الحية',
    subEn: 'Dynamic threat monitoring and airspace/maritime telemetry',
    badge: 'LIVE',
    badgeColor: 'bg-amber-900/85 text-amber-100 border-amber-600'
  },
  'pulse-of-the-street': {
    taglineAr: 'نبض المعيشة',
    taglineEn: 'Grassroots Pulse',
    subAr: 'رصد تداعيات النزاعات على معيشة المواطنين والغلاء',
    subEn: 'Beirut inflation metrics, fuel rates, and localized struggles'
  },
  'lebanon': {
    taglineAr: 'المشهد المحلي',
    taglineEn: 'Lebanon News Desk',
    subAr: 'تغطية سيادية شاملة للملفات السياسية والبلدية',
    subEn: 'National socio-political dispatches and local features'
  },
  'middle-east': {
    taglineAr: 'الجيوبوليتيك الإقليمي',
    taglineEn: 'Regional Hegemony',
    subAr: 'دراسات خطوط التجارة وسكك الحديد والمنافذ الدولية',
    subEn: 'Regional transport links, water security, and cross-border pacts'
  },
  'exclusives': {
    taglineAr: 'ملفات خاصة',
    taglineEn: 'Exclusive Intel',
    subAr: 'انفرادات إعلامية خاصة بالورّاق ومسربات موثقة',
    subEn: 'Exclusive breakthroughs, leak analysis, and classified drafts',
    badge: 'EXCLUSIVE',
    badgeColor: 'bg-blue-900/85 text-blue-100 border-blue-700'
  },
  'translations': {
    taglineAr: 'متابعات أجنبية',
    taglineEn: 'Global Reports',
    subAr: 'ترجمات معمقة لأبحاث مراكز الفكر العالمية الكبرى',
    subEn: 'In-depth translated briefs from key international think-tanks'
  },

  // Geo-Finance Desk
  'economy': {
    taglineAr: 'شؤون الاقتصاد',
    taglineEn: 'Economic Focus',
    subAr: 'دراسات النمو، سلاسل الإمداد، وحوكمة المال العام',
    subEn: 'In-depth growth analysis, supply chains, and fiscal public audit'
  },
  'markets': {
    taglineAr: 'سندات وسلع',
    taglineEn: 'Sovereign Debt & Goods',
    subAr: 'سندات الخزينة، سلاسل إمداد القمح والمعادن',
    subEn: 'Sovereign yields, shipping grain supplies, and precious metal indexes'
  },
  'oil-energy': {
    taglineAr: 'أسواق النفط والطاقة',
    taglineEn: 'Oil & Energy Focus',
    subAr: 'تحولات الطاقة والنفط، خريطة الاحتياطيات وصناعة القرار الجيوسياسي',
    subEn: 'Global crude markets, proven reserves map, OPEC+ and geopolitical energy shifts'
  },
  'arab-markets': {
    taglineAr: 'البورصات العربية',
    taglineEn: 'Regional Exchanges',
    subAr: 'مؤشرات أسواق الأسهم والسيولة في الخليج والمشرق',
    subEn: 'Stock exchanges, GCC liquidity indexes, and development rates'
  },
  'instats': {
    taglineAr: 'البيانات التفاعلية',
    taglineEn: 'Socioeconomic Data',
    subAr: 'تحليل صفقات العقارات، إنتاج الزراعة، والمصارف',
    subEn: 'Interactive land transaction graphs and economic indicators'
  },
  'telecom-internet': {
    taglineAr: 'البنية الرقمية',
    taglineEn: 'Digital Infrastructure',
    subAr: 'شبكات الألياف البصرية، الكابلات البحرية والساتل',
    subEn: 'Submarine fiber optic networks and rural satellite internet'
  },
  'research-reports': {
    taglineAr: 'دراسات أكاديمية',
    taglineEn: 'Specialized Studies',
    subAr: 'أبحاث مائية شاملة وخطط الأمن الغذائي المستقبلي',
    subEn: 'Hydrological reports, agricultural audit, and demographics'
  },
  'iraq-us-dossier': {
    taglineAr: 'وثائق سيادية استثنائية',
    taglineEn: 'Sovereign Intel Room',
    subAr: 'تحقيقات ودراسات خاصة تشمل الممرات الاستثمارية وأزمات إمدادات الطاقة العالمية',
    subEn: 'Bilateral investment corridor evaluations and global energy chokepoint dossiers',
    badge: 'SOVEREIGN',
    badgeColor: 'bg-amber-950/90 text-amber-100 border-amber-600 animate-pulse'
  },

  // Strategic Opinion & Simulation
  'what-if-simulator': {
    taglineAr: 'مختبر السيناريوهات',
    taglineEn: 'Scenario Sandbox',
    subAr: 'محاكاة رياضية لتقدير المواقف وأثر الحصار التجاري',
    subEn: 'Interactive mathematical model for economic & border risk assessment',
    badge: 'SANDBOX',
    badgeColor: 'bg-emerald-900/85 text-emerald-100 border-emerald-600'
  },
  'sentiment-analysis': {
    taglineAr: 'رصد الرأي العام',
    taglineEn: 'Sentiment Tracker',
    subAr: 'تحليل الذكاء الاصطناعي لكلمات ومؤشر مزاج الشارع',
    subEn: 'Real-time media and public mood metric scraper'
  },
  'editor-desk': {
    taglineAr: 'أعمدة الفكر',
    taglineEn: 'Editorial Note',
    subAr: 'افتتاحيات ومساهمات فكرية لكبار الكتاب برئاسة أديب',
    subEn: 'Chief Editor columns, philosophy, and cultural heritage reviews'
  },
  'press-releases': {
    taglineAr: 'شريط الوكالات',
    taglineEn: 'Wire Dispatches',
    subAr: 'نصوص البيانات الرسمية للشركات والجهات الدبلوماسية',
    subEn: 'Direct diplomatic cables, PR wires, and company filings'
  },
  'newsletter': {
    taglineAr: 'النشرة الدورية',
    taglineEn: 'Classic Briefings',
    subAr: 'تسجيل الاشتراكات واستعراض النشرات الاستراتيجية المؤرشفة',
    subEn: 'Subscribe to classified reports and browse past archives'
  },
  'world-of-ai': {
    taglineAr: 'عالم الذكاء الاصطناعي',
    taglineEn: 'World of AI',
    subAr: 'تحليل سيادي لنماذج الذكاء الاصطناعي الصينية وهندسة التكاليف والجيوبوليتيك الرقمي',
    subEn: 'Sovereign assessment of Chinese neural models, cost structures, and digital geopolitics',
    badge: 'AI',
    badgeColor: 'bg-indigo-900/85 text-indigo-100 border-indigo-700 animate-pulse'
  },

  // Sports & Wellness Desk
  'fifa-2026': {
    taglineAr: 'مونديال 2026',
    taglineEn: 'World Cup 2026',
    subAr: 'تغطية المنتخبات العربية، لوجستيات وملاعب الجمهور',
    subEn: 'Arab team tactical previews, stadiums, and viewing zones',
    badge: 'FIFA',
    badgeColor: 'bg-indigo-900/85 text-indigo-100 border-indigo-700'
  },
  'sports': {
    taglineAr: 'تاريخ الرياضة',
    taglineEn: 'Athletic Heritage',
    subAr: 'أندية بيروت التاريخية، الشطرنج وبطولات الشباب',
    subEn: 'Archival Beirut athletic clubs, youth chess leagues, and profiles'
  },
  'wellness-lifestyle': {
    taglineAr: 'العمران والعافية',
    taglineEn: 'Longevity & Green Design',
    subAr: 'نمط الحياة في الكورة، العمارة الصديقة للبيئة والتهوية',
    subEn: 'Socio-cultural slow habits, traditional ventilation, and green bio-design'
  }
};

interface NavigationProps {
  language: 'ar' | 'en';
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  categories: NavigationTab[];
  currentUser?: UserProfile | null;
}

export default function Navigation({ language, activeCategory, setActiveCategory, categories, currentUser }: NavigationProps) {
  const isAr = language === 'ar';
  
  // State for desktop hover/dropdown tracking
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State for mobile menus
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<Record<string, boolean>>({});

  // Sub menus list "Menus for all" containing functional filter links
  const SUB_MENUS: Record<string, Array<{ labelAr: string; labelEn: string; searchTag: string }>> = {
    'pulse-of-the-street': [
      { labelAr: 'ثمن الصراع والتعافي', labelEn: 'The Cost of Conflict', searchTag: 'صراع' },
      { labelAr: 'محنة وحطام الجنوب', labelEn: 'South Lebanon Plight', searchTag: 'دمار' },
      { labelAr: 'تقرير التضخم والأسعار', labelEn: 'Beirut inflation Report', searchTag: 'تضخم' }
    ],
    all: [
      { labelAr: 'طبعة اليوم الكاملة', labelEn: "Today's Full Issue", searchTag: '' },
      { labelAr: 'ارشيف الطبعات السابقة', labelEn: 'Past Archives', searchTag: 'archives' },
      { labelAr: 'الحدث الرئيسي', labelEn: 'Major Headline', searchTag: 'تحركات' }
    ],
    'fifa-2026': [
      { labelAr: 'ملاعب وشاشات الجمهور', labelEn: 'Public Screenings & Fan Zones', searchTag: 'بث' },
      { labelAr: 'تكتيكات المنتخبات العربية', labelEn: 'Arab Teams Strategies', searchTag: 'تكتيكات' },
      { labelAr: 'ترتيب المجموعات والبطولة', labelEn: 'Standings & Schedules', searchTag: 'مونديال' }
    ],
    exclusives: [
      { labelAr: 'وثائق مسربة حصرية', labelEn: 'Leaked Intel Documents', searchTag: 'وثائق' },
      { labelAr: 'تحقيقات اقتصادية خاصة', labelEn: 'Economic Intel Blueprints', searchTag: 'مخطط' },
      { labelAr: 'مراسلات سرية', labelEn: 'Diplomatic Telegrams', searchTag: 'سرية' }
    ],
    'editor-desk': [
      { labelAr: 'مقالات رئيس التحرير', labelEn: 'Columns by Chief Editor', searchTag: 'أديب' },
      { labelAr: 'حلقة فكرية وثقافية', labelEn: 'Tangible Civil Heritage', searchTag: 'ثقافة' },
      { labelAr: 'مساهمات كبار الكتاب', labelEn: 'Guest Writers Panel', searchTag: 'فكر' }
    ],
    lebanon: [
      { labelAr: 'مشاريع مطابع بيروت', labelEn: 'Beirut Typologies & Printing', searchTag: 'بدارو' },
      { labelAr: 'أكاديميات سهل البقاع', labelEn: 'Bekaa Valley Green Agri-Tech', searchTag: 'سهل' },
      { labelAr: 'نهضة مسارح الحمرا', labelEn: 'Hamra Theater Renovation', searchTag: 'الحمرا' }
    ],
    instats: [
      { labelAr: 'العقارات والصفقات', labelEn: 'Real Estate Data', searchTag: 'real-estate' },
      { labelAr: 'الإنتاج الزراعي كينتك', labelEn: 'Agriculture Output', searchTag: 'agriculture' },
      { labelAr: 'مؤشر التضخم والأسعار', labelEn: 'Inflation & Markets', searchTag: 'inflation' }
    ],
    'middle-east': [
      { labelAr: 'سكك الحديد والربط الإقليمي', labelEn: 'GCC Super Railway Links', searchTag: 'الحديد' },
      { labelAr: 'سيادة الأمن المائي والأنفاق', labelEn: 'Water Aqueduct Treaties', searchTag: 'المائي' },
      { labelAr: 'عمران الألياف والمواد المستدامة', labelEn: 'Passive Smart Bio-Concrete', searchTag: 'الألياف' }
    ],
    markets: [
      { labelAr: 'مؤشرات بلومبرغ والسيولة', labelEn: 'Bloomberg Sovereign Yields', searchTag: 'بلومبرغ' },
      { labelAr: 'سلاسل إمداد السلع والقمح', labelEn: 'Continental Cargo Grains', searchTag: 'القمح' },
      { labelAr: 'سوق المعادن والرقاقات الذكية', labelEn: 'Silicon Photovoltaic Codes', searchTag: 'السيليكون' }
    ],
    'telecom-internet': [
      { labelAr: 'الألياف البصرية والكابلات البحرية', labelEn: 'Submarine Optical Core Fiber', searchTag: 'الألياف' },
      { labelAr: 'إنترنت الأقمار الفتية الريفية', labelEn: 'Rural Satellites internet', searchTag: 'الشبكة' },
      { labelAr: 'بنية الجيل الخامس التحتية', labelEn: '5G Independent Networks', searchTag: 'كريم' }
    ],
    'research-reports': [
      { labelAr: 'أبحاث مائية وأمن الغذاء', labelEn: 'Hydrology & Food Security', searchTag: 'الليطاني' },
      { labelAr: 'مؤشرات التضامن التعاوني', labelEn: 'Agricultural Cooperative Audit', searchTag: 'مؤسسات' },
      { labelAr: 'تقارير التعداد والمستقبل الاقتصادي', labelEn: 'Demographic Macro Future', searchTag: 'معهد' }
    ],
    sports: [
      { labelAr: 'أرشيف نوادي بيروت التاريخية', labelEn: 'Archival Beirut Academy Sports', searchTag: 'تاريخ' },
      { labelAr: 'بطولات الشطرنج والنشء الجديد', labelEn: 'Youth Chess Leagues', searchTag: 'الشطرنج' }
    ],
    'wellness-lifestyle': [
      { labelAr: 'العافية وعادات المعمرين بالكورة', labelEn: 'Longevity & Slow Habits in Koura', searchTag: 'زيت' },
      { labelAr: 'العمارة البيروتية الطبيعية المستدامة', labelEn: 'Ancient Structural Cooling Elements', searchTag: 'العمران' }
    ],
    'sentiment-analysis': [
      { labelAr: 'مؤشر رضا الرأي العام', labelEn: 'Sovereign Sentiment Index', searchTag: 'BDD' },
      { labelAr: 'رصد الكلمات الساخنة', labelEn: 'Hot Keyword Scraper', searchTag: 'البنية' }
    ]
  };

  const getMenuIcon = (id: string) => {
    switch(id) {
      case 'all': return <Grid size={13} />;
      case 'alwarraq-investigations': return <Sparkles size={13} />;
      case 'war-room': return <Flame size={13} />;
      case 'press-releases': return <Megaphone size={13} />;
      case 'pulse-of-the-street': return <Activity size={13} />;
      case 'sentiment-analysis': return <BarChart2 size={13} />;
      case 'fifa-2026': return <Trophy size={13} />;
      case 'exclusives': return <Layers size={13} />;
      case 'editor-desk': return <FileText size={13} />;
      case 'lebanon': return <Anchor size={13} />;
      case 'instats': return <TrendingUp size={13} />;
      case 'middle-east': return <Landmark size={13} />;
      case 'economy': return <TrendingUp size={13} />;
      case 'markets': return <BarChart2 size={13} />;
      case 'telecom-internet': return <Cpu size={13} />;
      case 'iraq-us-dossier': return <Landmark size={13} className="text-emerald-400" />;
      case 'world-of-ai': return <Sparkles size={13} className="text-indigo-400" />;
      case 'research-reports': return <BookOpen size={13} />;
      case 'sports': return <Award size={13} />;
      case 'wellness-lifestyle': return <Heart size={13} />;
      default: return <Grid size={13} />;
    }
  };

  // Define static groups
  const staticGroups = [
    {
      id: 'lebanon-region',
      labelAr: 'لبنان والمنطقة',
      labelEn: 'Lebanon & Region',
      icon: <Globe size={13} />,
      tabIds: ['lebanon', 'alwarraq-investigations', 'war-room', 'pulse-of-the-street', 'middle-east', 'exclusives'],
      descAr: 'المشهد السيادي والأمني والتحقيقات الجيوسياسية الخاصة بلبنان والمشرق العربي',
      descEn: 'Sovereign reports, threat command, and specialized investigative dossiers on Lebanon and the Levant.'
    },
    {
      id: 'markets-economy',
      labelAr: 'المال والاقتصاد',
      labelEn: 'Geo-Finance & Data',
      icon: <TrendingUp size={13} />,
      tabIds: ['economy', 'markets', 'oil-energy', 'arab-markets', 'instats', 'telecom-internet', 'research-reports', 'iraq-us-dossier'],
      descAr: 'مؤشرات التداول العربي وسندات الخزينة وسلاسل الإمداد ومؤشرات البيانات العقارية',
      descEn: 'Sovereign bond curves, GCC market indexes, subsea cables, and transactional land registries.'
    },
    {
      id: 'opinion-interactive',
      labelAr: 'الرأي والتفاعل',
      icon: <MessageSquare size={13} />,
      labelEn: 'Opinion & Risk Sandboxes',
      tabIds: ['editor-desk', 'sentiment-analysis', 'what-if-simulator', 'press-releases', 'newsletter', 'world-of-ai'],
      descAr: 'أعمدة رئيس التحرير، سيناريوهات محاكاة المخاطر الرياضية ورصد المشاعر العامة',
      descEn: 'Editorial columns, mathematical scenario simulations, and AI public mood tracking models.'
    },
    {
      id: 'sports-wellness',
      labelAr: 'رياضة وصحة',
      labelEn: 'Society & Wellness',
      icon: <Trophy size={13} />,
      tabIds: ['fifa-2026', 'sports', 'wellness-lifestyle'],
      descAr: 'ملفات المونديال، الرياضة البيروتية التراثية ومقالات جودة الحياة والعافية',
      descEn: 'Tactical World Cup stats, local athletic histories, and traditional biophilic cooling design.'
    }
  ];

  // Organize categories into hierarchical menu structures dynamically
  const menuGroups = staticGroups.map(group => {
    const tabsInGroup = categories.filter(cat => group.tabIds.includes(cat.id));
    return {
      ...group,
      tabs: tabsInGroup
    };
  }).filter(group => group.tabs.length > 0);

  // Unrecognized or custom categories added in administration get grouped under "More" dropdown
  const otherTabs = categories.filter(cat => 
    cat.id !== 'all' && 
    cat.id !== 'premium-pricing' && 
    cat.id !== 'translations' &&
    cat.id !== 'in-case-you-missed-it' &&
    !staticGroups.some(g => g.tabIds.includes(cat.id))
  );

  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menuId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180); // Smooth delay to guarantee comfortable cursor movement
  };

  const selectTab = (tabId: string) => {
    setActiveCategory(tabId);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenuSection = (menuId: string) => {
    setExpandedMobileMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  // Check if a group contains the currently active category to highlight it
  const isGroupActive = (tabIds: string[]) => {
    return tabIds.includes(activeCategory);
  };

  // Clean timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav 
      className="bg-black text-white sticky top-0 z-40 border-b border-zinc-850 select-none font-sans"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Desktop Navigation Layout */}
        <div className="hidden md:flex items-center justify-between text-xs font-bold py-1">
          <ul className="flex items-center gap-1 lg:gap-2.5 py-1">
            
            {/* 1. Direct Click Link: Home */}
            <li>
              <button
                id="nav-tab-all"
                onClick={() => selectTab('all')}
                className={`px-3 py-2 flex items-center gap-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-zinc-800 text-white font-black border-b-2 border-white'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Grid size={13} />
                <span>{isAr ? 'الرئيسية' : 'Home'}</span>
              </button>
            </li>

            {/* Direct Link: Urgent Release */}
            <li>
              <button
                id="nav-tab-urgent-release"
                onClick={() => selectTab('urgent-release')}
                className={`px-3 py-2 flex items-center gap-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === 'urgent-release'
                    ? 'bg-red-700 text-white font-black border-b-2 border-white'
                    : 'text-red-400 hover:text-red-300 hover:bg-red-950/20 border border-red-900/30'
                }`}
              >
                <AlertCircle size={13} className="text-red-500 animate-pulse animate-duration-1000" />
                <span className="font-extrabold uppercase">{isAr ? 'يحدث الآن' : 'Happening Now'}</span>
              </button>
            </li>

            {/* 2. Structured Group Dropdowns */}
            {menuGroups.map((group) => {
              const isOpen = activeDropdown === group.id;
              const hasActiveChild = isGroupActive(group.tabIds);

              return (
                <li 
                  key={group.id} 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    id={`nav-menu-trigger-${group.id}`}
                    className={`px-3 py-2 flex items-center gap-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                      hasActiveChild || isOpen
                        ? 'bg-zinc-850 text-white font-black border-b-2 border-white'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    <span className="text-zinc-400">{group.icon}</span>
                    <span>{isAr ? group.labelAr : group.labelEn}</span>
                    <ChevronDown 
                      size={11} 
                      className={`text-zinc-500 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {/* Desktop Dropdown Card with AnimatePresence */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className={`absolute top-full ${isAr ? 'right-0' : 'left-0'} mt-1 w-[460px] md:w-[500px] bg-zinc-950 border border-zinc-850 shadow-2xl rounded-none p-0 z-50`}
                      >
                        <div className={`flex flex-col sm:flex-row ${isAr ? 'sm:flex-row-reverse' : ''} h-full`}>
                          
                          {/* Left/Right Editorial Note Column */}
                          <div className={`hidden sm:flex sm:w-44 bg-zinc-900/40 p-4 ${isAr ? 'border-l border-zinc-850 text-right' : 'border-r border-zinc-850 text-left'} flex-col justify-between shrink-0 select-none`}>
                            <div>
                              <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase font-black block mb-2">
                                {isAr ? 'ـ ديوان التغطية ـ' : '— COVERAGE DESK —'}
                              </span>
                              <h5 className="font-display font-black text-white text-xs mb-1.5">
                                {isAr ? group.labelAr : group.labelEn}
                              </h5>
                              <p className="text-[10px] text-zinc-400 font-sans leading-relaxed">
                                {isAr ? group.descAr : group.descEn}
                              </p>
                            </div>
                            <div className={`pt-4 border-t border-zinc-900/60 font-mono text-[7px] text-zinc-600 space-y-0.5 ${isAr ? 'text-right' : 'text-left'}`}>
                              <div>SECTOR_REF: ALW-{group.id.toUpperCase()}</div>
                              <div>SYSTEM_LEVEL: SECURE_FEED</div>
                            </div>
                          </div>

                          {/* Interactive Category list Column */}
                          <div className={`flex-1 p-2 space-y-1 overflow-y-auto max-h-[420px] ${isAr ? 'text-right' : 'text-left'}`}>
                            {group.tabs.map((tab) => {
                              const isTabActive = activeCategory === tab.id;
                              const meta = DESK_METADATA[tab.id];
                              
                              return (
                                <div key={tab.id} className="group/item">
                                  <button
                                    id={`nav-submenu-tab-${tab.id}`}
                                    onClick={() => selectTab(tab.id)}
                                    className={`w-full p-2 flex items-start gap-2.5 rounded-none transition-all duration-150 border cursor-pointer ${
                                      isTabActive 
                                        ? 'bg-zinc-900 border-zinc-750 text-white' 
                                        : 'bg-transparent border-transparent hover:bg-zinc-900 hover:border-zinc-800 text-zinc-100'
                                    }`}
                                  >
                                    {/* Icon Accent */}
                                    <div className={`p-1.5 rounded-none ${isTabActive ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 group-hover/item:text-white'} shrink-0 mt-0.5`}>
                                      {getMenuIcon(tab.id)}
                                    </div>
                                    
                                    {/* Title & Subtitle */}
                                    <div className="flex-1 min-w-0">
                                      <div className={`flex items-center gap-1.5 flex-wrap ${isAr ? 'justify-start' : 'justify-start'}`}>
                                        <span className="font-display font-black text-xs leading-none">
                                          {isAr ? tab.labelAr : tab.labelEn}
                                        </span>
                                        
                                        {/* Badges */}
                                        {meta?.badge && (
                                          <span className={`text-[7px] font-mono font-black tracking-wider px-1 py-0.2 border ${meta.badgeColor || 'bg-red-950 text-red-200 border-red-700'}`}>
                                            {meta.badge}
                                          </span>
                                        )}
                                      </div>
                                      
                                      {/* Subheading */}
                                      <p className="text-[9.5px] text-zinc-500 mt-1 leading-normal truncate group-hover/item:text-zinc-300">
                                        {isAr ? (meta?.subAr || '') : (meta?.subEn || '')}
                                      </p>
                                    </div>
                                  </button>
                                </div>
                              );
                            })}
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}

            {/* Direct Standalone Link: War Room */}
            <li>
              <button
                id="nav-tab-war-room"
                onClick={() => selectTab('war-room')}
                className={`px-3 py-2 flex items-center gap-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === 'war-room'
                    ? 'bg-zinc-800 text-white font-black border-b-2 border-white'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900 border border-zinc-800/50'
                }`}
              >
                <Flame size={13} className="text-orange-500 animate-pulse" />
                <span>{isAr ? 'غرفة الحرب الجيوسياسية' : 'War Room Intel'}</span>
              </button>
            </li>

            {/* Direct Standalone Link: Press Releases */}
            <li>
              <button
                id="nav-tab-press-releases"
                onClick={() => selectTab('press-releases')}
                className={`px-3 py-2 flex items-center gap-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === 'press-releases'
                    ? 'bg-zinc-800 text-white font-black border-b-2 border-white'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900 border border-zinc-800/50'
                }`}
              >
                <Megaphone size={13} className="text-sky-400" />
                <span>{isAr ? 'البيانات الصحفية' : 'Press Releases'}</span>
              </button>
            </li>

            {/* Direct Standalone Link: Translations */}
            <li>
              <button
                id="nav-tab-translations"
                onClick={() => selectTab('translations')}
                className={`px-3 py-2 flex items-center gap-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === 'translations'
                    ? 'bg-zinc-800 text-white font-black border-b-2 border-white'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900 border border-zinc-800/50'
                }`}
              >
                <Globe size={13} className="text-emerald-400" />
                <span>{isAr ? 'ترجمات' : 'Translations'}</span>
              </button>
            </li>

            {/* Direct Standalone Link: In Case You Missed It */}
            <li>
              <button
                id="nav-tab-in-case-you-missed-it"
                onClick={() => selectTab('in-case-you-missed-it')}
                className={`px-3 py-2 flex items-center gap-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === 'in-case-you-missed-it'
                    ? 'bg-zinc-800 text-white font-black border-b-2 border-white'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900 border border-zinc-800/50'
                }`}
              >
                <Bookmark size={13} className="text-amber-400" />
                <span>{isAr ? 'فاتك قراءته' : 'In case you missed it'}</span>
              </button>
            </li>

            {/* 3. Dropdown for Custom/Extra tabs if they exceed static categories */}
            {otherTabs.length > 0 && (
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('other-menus')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id="nav-menu-trigger-others"
                  className={`px-3 py-2 flex items-center gap-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                    activeDropdown === 'other-menus'
                      ? 'bg-zinc-850 text-white font-black border-b-2 border-white'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <MoreHorizontal size={13} />
                  <span>{isAr ? 'المزيد' : 'More'}</span>
                  <ChevronDown size={11} className="text-zinc-500" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'other-menus' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className={`absolute top-full ${isAr ? 'right-0' : 'left-0'} mt-1 w-56 bg-zinc-950 border border-zinc-800 shadow-2xl rounded-none p-2 z-50`}
                      style={{ textAlign: isAr ? 'right' : 'left' }}
                    >
                      <div className="space-y-1">
                        {otherTabs.map((tab) => (
                          <button
                            key={tab.id}
                            id={`nav-submenu-other-tab-${tab.id}`}
                            onClick={() => selectTab(tab.id)}
                            className={`w-full px-3 py-2 flex items-center gap-2 rounded-none text-sm transition-colors cursor-pointer ${
                              activeCategory === tab.id
                                ? 'bg-zinc-800 text-white font-black'
                                : 'text-white hover:bg-zinc-900'
                            }`}
                          >
                            <Grid size={11} />
                            <span>{isAr ? tab.labelAr : tab.labelEn}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )}

            {/* 4. Direct Action Link: Premium Service */}
            <li>
              <button
                id="nav-tab-premium"
                onClick={() => selectTab('premium-pricing')}
                className={`px-3 py-2 flex items-center gap-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === 'premium-pricing'
                    ? 'bg-[#b91c1c] text-white font-black border-b-2 border-white'
                    : 'bg-[#b91c1c]/15 hover:bg-[#b91c1c]/30 text-red-400 font-extrabold border border-[#b91c1c]/30'
                }`}
              >
                <span className="text-amber-400">★</span>
                <span>{isAr ? 'الخدمة الممتازة ($)' : 'Sovereign Premium ($)'}</span>
              </button>
            </li>

            {/* 5. Bookmarks/Saved Articles if logged in */}
            {currentUser && (
              <li>
                <button
                  id="nav-tab-saved-articles"
                  onClick={() => selectTab('saved-articles')}
                  className={`px-3 py-2 flex items-center gap-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                    activeCategory === 'saved-articles'
                      ? 'bg-amber-100 text-amber-900 border-b-2 border-amber-500 font-black'
                      : 'bg-amber-500/10 text-amber-500 hover:text-white hover:bg-amber-500/20 border border-amber-500/30'
                  }`}
                >
                  <Bookmark size={11} className="fill-current text-amber-500" />
                  <span>{isAr ? 'المقالات المحفوظة' : 'Saved Articles'}</span>
                </button>
              </li>
            )}

            {/* 6. Golden Prime Workspace if approved */}
            {currentUser && (currentUser.role === 'admin' || currentUser.goldenPrimeStatus === 'approved') && (
              <li>
                <button
                  id="nav-tab-workspace"
                  onClick={() => selectTab('workspace')}
                  className={`px-3 py-2 flex items-center gap-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                    activeCategory === 'workspace'
                      ? 'bg-amber-650 text-white border-b-2 border-white font-black'
                      : 'bg-amber-500/10 text-amber-500 hover:text-white hover:bg-amber-500/25 border border-amber-500/40'
                  }`}
                >
                  <Sparkles size={11} className="text-amber-400 animate-pulse" />
                  <span>{isAr ? 'الديوان البحثي غولدن' : 'Golden Workspace'}</span>
                </button>
              </li>
            )}
          </ul>

          {/* Right ticker/indicator */}
          <div className="text-[10px] text-zinc-400 tracking-wider font-mono flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 bg-white inline-block animate-pulse rounded-full"></span>
            <span>{isAr ? 'شبكة البث المباشر للورّاق' : 'Al-Warraq Live Wire Feed'}</span>
          </div>
        </div>

        {/* Mobile Navigation Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-bold transition-all hover:bg-zinc-850 cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
              <span>{isAr ? 'قائمة التصفح' : 'Navigation Menu'}</span>
            </button>

            <div className="text-[10px] text-zinc-400 tracking-wider font-mono flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 bg-red-600 inline-block animate-pulse rounded-full"></span>
              <span>{isAr ? 'بث حي' : 'Live Wire'}</span>
            </div>
          </div>

          {/* Expandable Mobile Accordion Drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden bg-zinc-950 border-t border-zinc-900 py-3 px-1 space-y-2 text-xs"
              >
                {/* Home Link */}
                <button
                  onClick={() => selectTab('all')}
                  className={`w-full py-2.5 px-3 flex items-center gap-2 transition-all rounded ${
                    activeCategory === 'all'
                      ? 'bg-zinc-800 text-white font-extrabold border-r-4 border-white'
                      : 'text-zinc-400 hover:text-white bg-zinc-900/40'
                  }`}
                  style={{ textAlign: isAr ? 'right' : 'left' }}
                >
                  <Grid size={13} />
                  <span>{isAr ? 'الرئيسية (طبعة اليوم الكاملة)' : 'Home (Today\'s Issue)'}</span>
                </button>

                {/* Urgent Release Mobile Link */}
                <button
                  onClick={() => selectTab('urgent-release')}
                  className={`w-full py-2.5 px-3 flex items-center gap-2 transition-all rounded ${
                    activeCategory === 'urgent-release'
                      ? 'bg-red-950/80 text-white font-extrabold border-r-4 border-red-500'
                      : 'text-red-400 hover:text-red-300 bg-red-950/10 border border-red-900/25'
                  }`}
                  style={{ textAlign: isAr ? 'right' : 'left' }}
                >
                  <AlertCircle size={13} className="text-red-500 animate-pulse" />
                  <span>{isAr ? 'يحدث الآن' : 'Happening Now'}</span>
                </button>

                {/* Standalone War Room Link */}
                <button
                  onClick={() => selectTab('war-room')}
                  className={`w-full py-2.5 px-3 flex items-center gap-2 transition-all rounded ${
                    activeCategory === 'war-room'
                      ? 'bg-zinc-800 text-white font-extrabold border-r-4 border-white'
                      : 'text-zinc-400 hover:text-white bg-zinc-900/40'
                  }`}
                  style={{ textAlign: isAr ? 'right' : 'left' }}
                >
                  <Flame size={13} className="text-orange-500 animate-pulse" />
                  <span>{isAr ? 'غرفة الحرب الجيوسياسية' : 'War Room Intel'}</span>
                </button>

                {/* Standalone Press Releases Link */}
                <button
                  onClick={() => selectTab('press-releases')}
                  className={`w-full py-2.5 px-3 flex items-center gap-2 transition-all rounded ${
                    activeCategory === 'press-releases'
                      ? 'bg-zinc-800 text-white font-extrabold border-r-4 border-white'
                      : 'text-zinc-400 hover:text-white bg-zinc-900/40'
                  }`}
                  style={{ textAlign: isAr ? 'right' : 'left' }}
                >
                  <Megaphone size={13} className="text-sky-400" />
                  <span>{isAr ? 'البيانات الصحفية' : 'Press Releases'}</span>
                </button>

                {/* Standalone Translations Link */}
                <button
                  onClick={() => selectTab('translations')}
                  className={`w-full py-2.5 px-3 flex items-center gap-2 transition-all rounded ${
                    activeCategory === 'translations'
                      ? 'bg-zinc-800 text-white font-extrabold border-r-4 border-white'
                      : 'text-zinc-400 hover:text-white bg-zinc-900/40'
                  }`}
                  style={{ textAlign: isAr ? 'right' : 'left' }}
                >
                  <Globe size={13} className="text-emerald-400" />
                  <span>{isAr ? 'ترجمات' : 'Translations'}</span>
                </button>

                {/* Standalone In Case You Missed It Link */}
                <button
                  onClick={() => selectTab('in-case-you-missed-it')}
                  className={`w-full py-2.5 px-3 flex items-center gap-2 transition-all rounded ${
                    activeCategory === 'in-case-you-missed-it'
                      ? 'bg-zinc-800 text-white font-extrabold border-r-4 border-white'
                      : 'text-zinc-400 hover:text-white bg-zinc-900/40'
                  }`}
                  style={{ textAlign: isAr ? 'right' : 'left' }}
                >
                  <Bookmark size={13} className="text-amber-400" />
                  <span>{isAr ? 'فاتك قراءته' : 'In case you missed it'}</span>
                </button>

                {/* Submenu Accordions */}
                {menuGroups.map((group) => {
                  const isSectionExpanded = !!expandedMobileMenus[group.id];
                  const hasActiveChild = isGroupActive(group.tabIds);

                  return (
                    <div key={group.id} className="border border-zinc-900 rounded overflow-hidden">
                      <button
                        onClick={() => toggleMobileMenuSection(group.id)}
                        className={`w-full py-2.5 px-3 flex items-center justify-between transition-all bg-zinc-900/60 ${
                          hasActiveChild ? 'text-white font-extrabold border-r-4 border-white' : 'text-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-500">{group.icon}</span>
                          <span>{isAr ? group.labelAr : group.labelEn}</span>
                        </div>
                        <ChevronDown size={12} className={`text-zinc-500 transition-transform ${isSectionExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {isSectionExpanded && (
                        <div className="bg-zinc-950 px-2 py-2 border-t border-zinc-900/50 space-y-1.5">
                          {group.tabs.map((tab) => {
                            const isTabActive = activeCategory === tab.id;
                            const meta = DESK_METADATA[tab.id];
                            return (
                              <button
                                key={tab.id}
                                onClick={() => selectTab(tab.id)}
                                className={`w-full p-2 flex items-start gap-3 transition-all rounded-sm border ${
                                  isTabActive ? 'bg-zinc-900 border-zinc-800 text-white font-bold' : 'bg-transparent border-transparent text-zinc-400 hover:text-white'
                                }`}
                                style={{ textAlign: isAr ? 'right' : 'left' }}
                              >
                                <div className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0 mt-0.5">
                                  {getMenuIcon(tab.id)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-xs font-bold font-display">{isAr ? tab.labelAr : tab.labelEn}</span>
                                    {meta?.badge && (
                                      <span className={`text-[7px] font-mono px-1 py-0.2 font-black border ${meta.badgeColor || 'bg-red-950 text-red-200 border-red-800'}`}>
                                        {meta.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-zinc-500 mt-0.5 leading-normal">
                                    {isAr ? (meta?.subAr || '') : (meta?.subEn || '')}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Others/More Accordion for Mobile */}
                {otherTabs.length > 0 && (
                  <div className="border border-zinc-900 rounded overflow-hidden">
                    <button
                      onClick={() => toggleMobileMenuSection('others')}
                      className="w-full py-2.5 px-3 flex items-center justify-between transition-all bg-zinc-900/60 text-zinc-300"
                    >
                      <div className="flex items-center gap-2">
                        <MoreHorizontal size={13} />
                        <span>{isAr ? 'أقسام إضافية' : 'More Categories'}</span>
                      </div>
                      <ChevronDown size={12} className="text-zinc-500" />
                    </button>

                    {expandedMobileMenus['others'] && (
                      <div className="bg-zinc-950 px-2 py-1.5 space-y-1 border-t border-zinc-900/50">
                        {otherTabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => selectTab(tab.id)}
                            className={`w-full py-2 px-4 flex items-center gap-2 transition-all rounded-sm ${
                              activeCategory === tab.id ? 'bg-zinc-850 text-white font-bold' : 'text-zinc-500 hover:text-white'
                            }`}
                            style={{ textAlign: isAr ? 'right' : 'left' }}
                          >
                            <Grid size={11} />
                            <span>{isAr ? tab.labelAr : tab.labelEn}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Saved Articles Mobile */}
                {currentUser && (
                  <button
                    onClick={() => selectTab('saved-articles')}
                    className={`w-full py-2.5 px-3 flex items-center gap-2 transition-all rounded ${
                      activeCategory === 'saved-articles'
                        ? 'bg-amber-100 text-amber-950 font-extrabold border-r-4 border-amber-500'
                        : 'bg-amber-500/5 text-amber-500 hover:bg-amber-500/10 border border-amber-500/20'
                    }`}
                    style={{ textAlign: isAr ? 'right' : 'left' }}
                  >
                    <Bookmark size={13} className="fill-current text-amber-500" />
                    <span>{isAr ? 'المقالات المحفوظة' : 'Saved Articles'}</span>
                  </button>
                )}

                {/* Golden Prime Workspace Mobile */}
                {currentUser && (currentUser.role === 'admin' || currentUser.goldenPrimeStatus === 'approved') && (
                  <button
                    onClick={() => selectTab('workspace')}
                    className={`w-full py-2.5 px-3 flex items-center gap-2 transition-all rounded ${
                      activeCategory === 'workspace'
                        ? 'bg-amber-600 text-white font-extrabold border-r-4 border-amber-500'
                        : 'bg-amber-500/5 text-amber-500 hover:bg-amber-500/10 border border-amber-500/20'
                    }`}
                    style={{ textAlign: isAr ? 'right' : 'left' }}
                  >
                    <Sparkles size={13} className="text-amber-400 animate-pulse" />
                    <span>{isAr ? 'الديوان البحثي غولدن' : 'Golden Workspace'}</span>
                  </button>
                )}

                {/* Premium Services Button Mobile */}
                <button
                  onClick={() => selectTab('premium-pricing')}
                  className={`w-full py-2.5 px-3 flex items-center gap-2 rounded text-center justify-center font-black ${
                    activeCategory === 'premium-pricing'
                      ? 'bg-[#b91c1c] text-white'
                      : 'bg-[#b91c1c] text-white'
                  }`}
                >
                  <span className="text-amber-400">★</span>
                  <span>{isAr ? 'الخدمة الممتازة والاشتراكات' : 'Sovereign Premium ($)'}</span>
                </button>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </nav>
  );
}
