import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  FileText, 
  Calendar, 
  User, 
  TrendingUp, 
  Compass, 
  Award, 
  AlertCircle,
  Filter,
  Grid,
  List,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Printer,
  BookOpen,
  Clock,
  Tag,
  CornerDownRight,
  Bookmark,
  ArrowUpRight,
  Shield,
  ShieldAlert,
  ShieldCheck,
  FolderOpen,
  Layers,
  ChevronDown,
  Lock,
  Unlock,
  Sliders,
  Share2,
  Send,
  Check,
  Link as LinkIcon,
  Download,
  QrCode,
  FileCheck,
  Eye,
  Database,
  Globe,
  Flame,
  Cpu,
  BarChart2,
  Landmark,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { Article, UserProfile } from '../types';

// Infographics & Interactive Visualizer Embeds
import { FrameworkAgreementInfographic } from './FrameworkAgreementInfographic';
import { SolidereInfographic } from './SolidereInfographic';
import { SolidereStockInfographic } from './SolidereStockInfographic';
import { FifaPolymarketInfographic } from './FifaPolymarketInfographic';
import AliAlTaherMap from './AliAlTaherMap';
import LebanonConflictMap from './LebanonConflictMap';
import LebanonAMLVisualizer from './LebanonAMLVisualizer';
import { CeasefireInternalConflictInfographic } from './CeasefireInternalConflictInfographic';
import { EconomicAbyssCrisisInfographic } from './EconomicAbyssCrisisInfographic';
import { FrozenAssetsInfographic } from './FrozenAssetsInfographic';
import { DepositsInfographic } from './DepositsInfographic';
import { SubseaCablesInfographic } from './SubseaCablesInfographic';
import { FuelProfiteeringInfographic } from './FuelProfiteeringInfographic';
import { BdlSalamehInfographic } from './BdlSalamehInfographic';
import { USSPRReleaseInfographic } from './USSPRReleaseInfographic';
import { SyriaReconstructionInfographic } from './SyriaReconstructionInfographic';
import { InfrastructureWarInfographic } from './InfrastructureWarInfographic';
import { SpMiddleEastWarGCCInfographic } from './SpMiddleEastWarGCCInfographic';

export interface SpecialInvestigationsProps {
  language: 'ar' | 'en';
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
  selectedDossierId?: string;
  onSelectDossier?: (id: string) => void;
  currentUser?: UserProfile | null;
  isHomeDemoUser?: boolean;
  onNavigateToPremium?: () => void;
  onOpenQrShare?: (url: string) => void;
}

// Master Dossier Intelligence Index metadata dictionary
export const SPECIAL_DOSSIERS_INDEX: Record<string, {
  fileId: string;
  classification: string;
  badge: string;
  badgeColor: string;
  theme: 'sovereign' | 'economy' | 'energy' | 'governance' | 'tech';
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  leadAnalystAr: string;
  leadAnalystEn: string;
}> = {
  'damascus-extended-shadow-syrian-role-lebanon-2026': {
    fileId: 'DOSSIER-SEC-01',
    classification: 'TOP SECRET / SOVEREIGN',
    badge: 'PRIMARY DOSSIER',
    badgeColor: 'bg-red-950 text-amber-300 border-red-700',
    theme: 'sovereign',
    titleAr: 'الملف الاستراتيجي: ظلال دمشق الممتدة: خيارات وتجليات الدور السوري الجديد في لبنان',
    titleEn: 'Strategic Dossier: The Extended Shadow of Damascus - Syrian Role in Lebanon',
    descAr: 'تحليل سياسي واستراتيجي عميق يفكك حسابات القوى اللبنانية ودمشق تحت قيادة أحمد الشرع، متناولاً الخيارات الثلاثة للتدخل السوري والتوازنات الإقليمية.',
    descEn: 'A deep strategic analysis decoding the political calculations of Lebanese factions and Damascus under Ahmed al-Sharaa.',
    leadAnalystAr: 'وحدة الدراسات السيادية والمشرقية',
    leadAnalystEn: 'Sovereign & Levantine Intelligence Desk'
  },
  'ft-israeli-military-religious-zionism-shift-2026': {
    fileId: 'DOSSIER-SEC-02',
    classification: 'SOVEREIGN INTEL DECLASSIFIED',
    badge: 'MILITARY SHIFT',
    badgeColor: 'bg-red-900 text-white border-red-600',
    theme: 'sovereign',
    titleAr: 'تحقيق خاص: تحول بنية القيادة في الجيش الإسرائيلي نحو الصهيونية الدينية وآثاره الإقليمية',
    titleEn: 'Special Investigation: IDF Command Structure Shift Towards Religious Zionism',
    descAr: 'دراسة استقصائية تفصيلية عن تغلغل تيار الصهيونية الدينية في هيئة الأركان العامة ولواء غولاني وتداعياته على قواعد الاشتباك والاستيطان.',
    descEn: 'A forensic analysis tracking the doctrinal evolution of the IDF High Command and religious Zionist dominance across combat brigades.',
    leadAnalystAr: 'قسم الشؤون العسكرية والترجمات العبرية',
    leadAnalystEn: 'Military Bureau & Hebrew Intelligence Desk'
  },
  'lebanon-framework-agreement-analysis-2026': {
    fileId: 'DOSSIER-SEC-03',
    classification: 'RESTRICTED / MARITIME AUDIT',
    badge: 'GAS & BORDER',
    badgeColor: 'bg-blue-950 text-sky-300 border-blue-700',
    theme: 'energy',
    titleAr: 'ملف الغاز والحدود: نتائج حفر بئر قانا والنزاع البحري على البلوكات الجنوبية',
    titleEn: 'Maritime Dossier: Qana Well Exploration Audit & Southern Border Blocks',
    descAr: 'تقييم شامل لنتائج عمليات توتال إنرجيز، والحسابات الجيوسياسية لترسيم الحدود البحرية وصراع البلوكات النفطية.',
    descEn: 'TotalEnergies exploration drilling results, regional security risks, and offshore oil/gas block telemetry.',
    leadAnalystAr: 'هيئة تدقيق الطاقة والثروات الطبيعية',
    leadAnalystEn: 'Energy & Natural Resources Audit Desk'
  },
  'solidere-extension-2069': {
    fileId: 'DOSSIER-SEC-04',
    classification: 'FINANCIAL FORENSIC DEEP-DIVE',
    badge: 'SOVEREIGN CORP',
    badgeColor: 'bg-amber-950 text-amber-200 border-amber-600',
    theme: 'governance',
    titleAr: 'تحقيق سوليدير: تمديد مرسوم الامتياز حتى عام ٢٠٦٩ وصراعات الهيمنة على وسط بيروت',
    titleEn: 'Corporate Solidere Investigation: Decree Extension to 2069 & Boardroom Battles',
    descAr: 'كواليس التمديد الحكومي للامتياز العقاري حتى ٢٠٦٩، وتوزيع ملكية الأسهم وصراعات مجالس الإدارة على الواجهة البحرية.',
    descEn: 'Behind-the-scenes breakdown of real estate extension decrees, Beirut stock surges, and downtown asset distribution.',
    leadAnalystAr: 'وحدة الرقابة على المال العام والعقارات',
    leadAnalystEn: 'Public Assets & Corporate Governance Desk'
  },
  'lebanon-ceasefire-mirage-2026': {
    fileId: 'DOSSIER-SEC-05',
    classification: 'FIELD SECURITY REPORT',
    badge: 'CIVIL DISPUTE',
    badgeColor: 'bg-rose-950 text-rose-200 border-rose-700',
    theme: 'sovereign',
    titleAr: 'ملف وقف إطلاق النار: سراب التهدئة في لبنان وشبح الانقسام المؤسساتي والأهلي',
    titleEn: 'Ceasefire Mirage Dossier: Structural Friction & Looming Civil Tensions',
    descAr: 'دراسة ميدانية لتداعيات نزوح أكثر من مليون نسمة وتفجر الخلافات الجوهرية بين السراي الحكومي والمقاومة حول ترتيبات القرار ١٧٠١.',
    descEn: 'An intensive study of the friction between the Lebanese Cabinet and resistance movements on disarmament and sovereignty.',
    leadAnalystAr: 'غرفة رصد النزاعات والتحولات الديموغرافية',
    leadAnalystEn: 'Conflict Monitoring & Demographics Desk'
  },
  'lebanon-economic-abyss-2026': {
    fileId: 'DOSSIER-SEC-06',
    classification: 'MACROECONOMIC AUDIT',
    badge: 'ECONOMIC CRISIS',
    badgeColor: 'bg-stone-900 text-stone-200 border-stone-600',
    theme: 'economy',
    titleAr: 'تقرير الهاوية الاقتصادية: تشريح الأضرار الهيكلية، أزمة الإيواء، وفجوة إعادة الإعمار',
    titleEn: 'Economic Abyss Dossier: Infrastructure Damage, Displacement & Financial Paralysis',
    descAr: 'حصر مالي وهندسي للأضرار الاقتصادية المباشرة وغير المباشرة، مع تقدير فجوة التمويل البالغة ١١ مليار دولار وخطة التعافي المعطلة.',
    descEn: 'Comprehensive physical damage audit, displaced civilian economic toll, and the $11 Billion reconstruction deficit.',
    leadAnalystAr: 'فريق التحليل الاقتصادي الكلي والمالية العامة',
    leadAnalystEn: 'Macroeconomic & Fiscal Policy Unit'
  },
  'sp-hormuz-crisis-global-energy-dossier-2026': {
    fileId: 'DOSSIER-SEC-07',
    classification: 'STRATEGIC MARITIME ALERT',
    badge: 'ENERGY CHOKEPOINT',
    badgeColor: 'bg-red-950 text-amber-300 border-red-700',
    theme: 'energy',
    titleAr: 'ملف مضيق هرمز: سيناريو الإغلاق لمئة يوم وتداعياته على سلاسل إمداد النفط العالمية',
    titleEn: 'Strait of Hormuz Dossier: 100-Day Closure Scenario & Global Energy Fallout',
    descAr: 'محاكاة استراتيجية دقيقة لاختناق الملاحة البحرية في مضيق هرمز، وتأثيره على أسعار خام برنت، واحتياطيات الطوارئ الدولية.',
    descEn: 'A detailed geopolitical simulation assessing maritime shipping disruption, crude price shocks, and strategic petroleum reserves.',
    leadAnalystAr: 'مركز بحوث الطاقة والممرات الجيواقتصادية',
    leadAnalystEn: 'Energy Corridors & Geoeconomics Bureau'
  },
  'iraq-us-economic-corridor-dossier-2026': {
    fileId: 'DOSSIER-SEC-08',
    classification: 'SOVEREIGN CORRIDOR RECORD',
    badge: 'TRADE CORRIDOR',
    badgeColor: 'bg-emerald-950 text-emerald-200 border-emerald-700',
    theme: 'economy',
    titleAr: 'الملف العراقي الأمريكي: ممر التنمية واستراتيجيات فك الارتباط الطاقوي والاستثماري',
    titleEn: 'Iraq-US Investment Corridor Dossier: Energy Independence & Development Road',
    descAr: 'وثيقة استثمارية واستراتيجية متكاملة تبحث مشروعات الغاز المصاحب، وشبكة الربط الخليجي، ومشروع طريق التنمية الاستراتيجي.',
    descEn: 'An exhaustive dossier mapping the Development Road, associated gas capture projects, and US-Iraqi strategic pacts.',
    leadAnalystAr: 'ديوان العلاقات الدولية والاستثمارات السيادية',
    leadAnalystEn: 'Sovereign Investments & International Pacts Desk'
  }
};

export const SpecialInvestigations: React.FC<SpecialInvestigationsProps> = ({
  language,
  allArticles,
  onSelectArticle,
  selectedDossierId: initialDossierId,
  onSelectDossier,
  currentUser,
  isHomeDemoUser,
  onNavigateToPremium,
  onOpenQrShare,
}) => {
  const isAr = language === 'ar';
  const [selectedDossierId, setSelectedDossierId] = useState<string>(
    initialDossierId || 'damascus-extended-shadow-syrian-role-lebanon-2026'
  );
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isReading, setIsReading] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [themeFilter, setThemeFilter] = useState<'all' | 'sovereign' | 'economy' | 'energy' | 'governance' | 'tech'>('all');
  const [viewMode, setViewMode] = useState<'reader' | 'archive'>('reader');
  const [savedDossiers, setSavedDossiers] = useState<string[]>([]);
  const deskContainerRef = useRef<HTMLDivElement>(null);

  // Sync initial prop
  useEffect(() => {
    if (initialDossierId) {
      setSelectedDossierId(initialDossierId);
    }
  }, [initialDossierId]);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('alwarraq_saved_special_investigations');
      if (saved) {
        setSavedDossiers(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedDossiers(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('alwarraq_saved_special_investigations', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Aggregate all articles that belong to dossiers, investigative reports, and research dispatches
  const aggregatedInvestigations = useMemo(() => {
    return allArticles.filter(article => {
      const cat = article.category || '';
      const cats = article.categories || [];
      const id = article.id || '';

      return (
        cat === 'special-investigations' ||
        cat === 'alwarraq-investigations' ||
        cat === 'research-reports' ||
        cat === 'investigative-reports' ||
        cat === 'exclusives' ||
        cats.includes('special-investigations') ||
        cats.includes('alwarraq-investigations') ||
        cats.includes('research-reports') ||
        cats.includes('investigative-reports') ||
        cats.includes('exclusives') ||
        id in SPECIAL_DOSSIERS_INDEX ||
        id.includes('dossier') ||
        id.includes('investigation') ||
        id.includes('report') ||
        id.includes('shift') ||
        id.includes('syria') ||
        id.includes('solidere') ||
        id.includes('ceasefire') ||
        id.includes('abyss') ||
        id.includes('eurobond') ||
        id.includes('salameh') ||
        id.includes('hormuz') ||
        id.includes('pipeline') ||
        id.includes('cables') ||
        id.includes('ft-') ||
        id.includes('sp-')
      );
    });
  }, [allArticles]);

  // Apply search and theme filtering
  const filteredInvestigations = useMemo(() => {
    return aggregatedInvestigations.filter(article => {
      // Theme filter
      if (themeFilter !== 'all') {
        const meta = SPECIAL_DOSSIERS_INDEX[article.id];
        if (meta) {
          if (meta.theme !== themeFilter) return false;
        } else {
          const id = article.id.toLowerCase();
          if (themeFilter === 'sovereign') {
            const isSov = id.includes('military') || id.includes('zionism') || id.includes('syria') || id.includes('ceasefire') || id.includes('israel') || id.includes('war');
            if (!isSov) return false;
          } else if (themeFilter === 'economy') {
            const isEcon = id.includes('eurobond') || id.includes('liquidity') || id.includes('salameh') || id.includes('abyss') || id.includes('m3') || id.includes('banking');
            if (!isEcon) return false;
          } else if (themeFilter === 'energy') {
            const isEnergy = id.includes('oil') || id.includes('gas') || id.includes('spr') || id.includes('hormuz') || id.includes('pipeline') || id.includes('fuel');
            if (!isEnergy) return false;
          } else if (themeFilter === 'governance') {
            const isGov = id.includes('solidere') || id.includes('aml') || id.includes('fifa') || id.includes('profiteering');
            if (!isGov) return false;
          } else if (themeFilter === 'tech') {
            const isTech = id.includes('cable') || id.includes('telecom') || id.includes('ai') || id.includes('internet');
            if (!isTech) return false;
          }
        }
      }

      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const textAr = `${article.titleAr} ${article.summaryAr} ${article.excerptAr || ''} ${article.tags?.join(' ') || ''}`.toLowerCase();
        const textEn = `${article.titleEn} ${article.summaryEn} ${article.excerptEn || ''} ${article.tags?.join(' ') || ''}`.toLowerCase();
        return textAr.includes(q) || textEn.includes(q);
      }

      return true;
    });
  }, [aggregatedInvestigations, themeFilter, searchQuery]);

  // Active investigation / dossier object
  const activeDossier = 
    aggregatedInvestigations.find(a => a.id === selectedDossierId) || 
    filteredInvestigations[0] || 
    aggregatedInvestigations[0] || 
    allArticles[0];

  const activeMeta = SPECIAL_DOSSIERS_INDEX[activeDossier.id] || {
    fileId: `AW-DOC-${activeDossier.id.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase()}`,
    classification: 'DECLASSIFIED DOSSIER',
    badge: 'SPECIAL INTEL',
    badgeColor: 'bg-zinc-900 text-amber-300 border-zinc-700',
    theme: 'sovereign',
    titleAr: activeDossier.titleAr,
    titleEn: activeDossier.titleEn,
    descAr: activeDossier.summaryAr,
    descEn: activeDossier.summaryEn,
    leadAnalystAr: 'هيئة تحرير الورّاق — قسم التحقيقات الاستقصائية',
    leadAnalystEn: 'Al-Warraq Editorial Bureau — Investigative Desk'
  };

  // Estimate reading time and word count
  const readStats = useMemo(() => {
    const text = (isAr ? activeDossier.contentAr : activeDossier.contentEn) || (isAr ? activeDossier.summaryAr : activeDossier.summaryEn) || '';
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 190));
    return {
      minutes,
      wordCount,
      displayAr: `${minutes} دقائق قراءة (${wordCount.toLocaleString('ar-EG')} كلمة)`,
      displayEn: `${minutes} min read (${wordCount.toLocaleString()} words)`
    };
  }, [activeDossier, isAr]);

  // Speech synthesis toggle
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert(isAr ? 'عذراً، متصفحك لا يدعم قراءة النصوص صوتياً.' : 'Text-to-speech not supported.');
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      window.speechSynthesis.cancel();
      const contentToRead = (isAr ? activeDossier.contentAr : activeDossier.contentEn) || 
                            (isAr ? activeDossier.summaryAr : activeDossier.summaryEn) || '';
      
      const cleanText = contentToRead
        .replace(/[#*_`~>[\]()|]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = isAr ? 'ar-SA' : 'en-US';
      utterance.rate = speechRate;
      
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/?category=special-investigations&dossier=${activeDossier.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper to render contextual visualizer based on dossier ID
  const renderVisualizer = (id: string) => {
    switch(id) {
      case 'damascus-extended-shadow-syrian-role-lebanon-2026':
      case 'syria-reconstruction-framework-2026':
        return <SyriaReconstructionInfographic language={language} />;
      case 'ft-israeli-military-religious-zionism-shift-2026':
      case 'ali-al-taher-strategic-front':
        return <AliAlTaherMap language={language} />;
      case 'lebanon-conflict-geography-2026':
        return <LebanonConflictMap language={language} />;
      case 'lebanon-framework-agreement-analysis-2026':
        return <FrameworkAgreementInfographic language={language} />;
      case 'solidere-extension-2069':
        return (
          <div className="space-y-6">
            <SolidereStockInfographic language={language} />
            <SolidereInfographic language={language} />
          </div>
        );
      case 'lebanon-ceasefire-mirage-2026':
        return <CeasefireInternalConflictInfographic language={language} />;
      case 'lebanon-economic-abyss-2026':
        return <EconomicAbyssCrisisInfographic language={language} />;
      case 'lebanon-frozen-assets-2026':
        return <FrozenAssetsInfographic language={language} />;
      case 'lebanon-bank-deposits-forensic-2026':
        return <DepositsInfographic language={language} />;
      case 'subsea-cables-mediterranean-chokepoint':
        return <SubseaCablesInfographic language={language} />;
      case 'fuel-profiteering-cross-border-audit-2026':
        return <FuelProfiteeringInfographic language={language} />;
      case 'bdl-salameh-forensic-audit-report':
        return <BdlSalamehInfographic language={language} />;
      case 'us-spr-drawdown-geopolitical-analysis-2026':
        return <USSPRReleaseInfographic language={language} />;
      case 'infrastructure-war-lebanon-telecom-bridges-2026':
        return <InfrastructureWarInfographic language={language} />;
      case 'sp-ratings-middle-east-war-gcc-economies-2026':
        return <SpMiddleEastWarGCCInfographic language={language} />;
      case 'fifa-polymarket-arab-teams-odds-2026':
        return <FifaPolymarketInfographic language={language} />;
      case 'lebanon-aml-cft-financial-crimes-visualizer-2026':
        return <LebanonAMLVisualizer language={language} layoutMode="digital" />;
      default:
        return null;
    }
  };

  const isSaved = savedDossiers.includes(activeDossier.id);

  return (
    <div className="space-y-8 animate-fade-in" id="special-investigations-portal" ref={deskContainerRef}>
      
      {/* 1. TOP MASTHEAD & SOVEREIGN INVESTIGATION REPOSITORY BANNER */}
      <div className="border-4 border-black bg-zinc-950 text-white p-6 md:p-8 relative overflow-hidden shadow-[8px_8px_0px_#991b1b]">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#991b1b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-red-800 text-amber-300 text-[10px] font-mono font-black px-3 py-1 uppercase tracking-widest border border-red-600 flex items-center gap-1.5 shadow-[2px_2px_0px_#000]">
                <ShieldAlert size={13} className="text-amber-300 animate-pulse" />
                <span>{isAr ? 'ديوان التحقيقات الخاصة والملفات الاستقصائية' : 'SPECIAL INVESTIGATIONS & DOSSIERS HUB'}</span>
              </span>
              <span className="bg-zinc-800 text-zinc-300 text-[10px] font-mono px-2.5 py-1 border border-zinc-700">
                {isAr ? 'وثائق وأبحاث سيادية معتمدة ٢٠٢٦' : 'AUTHORIZED SOVEREIGN RESEARCH 2026'}
              </span>
              <span className="bg-amber-950/80 text-amber-300 text-[10px] font-mono px-2.5 py-1 border border-amber-800 flex items-center gap-1">
                <Database size={11} />
                <span>{aggregatedInvestigations.length} {isAr ? 'ملفاً موثقاً' : 'Records'}</span>
              </span>
            </div>

            <h1 className="text-2xl md:text-3.5xl lg:text-4xl font-black font-sans tracking-tight text-white leading-tight">
              {isAr ? 'التحقيقات الخاصة: الأرشيف السيادي للملفات والأبحاث المعمقة' : 'Special Investigations: The Sovereign Dossier & Long-Form Research Hub'}
            </h1>

            <p className="text-xs md:text-sm text-zinc-300 font-serif max-w-3xl leading-relaxed">
              {isAr
                ? 'مرصد وتحقيق متكامل يجمع كافة الملفات الاستقصائية، والتحقيقات الجنائية المالية، ووثائق تقدير الموقف الجيوسياسي، والخرائط التفاعلية للحدود والممرات الاقتصادية الحيوية في الشرق الأوسط.'
                : 'A dedicated multi-layered portal aggregating declassified dossiers, forensic financial audits, geopolitical risk modeling, energy corridor telemetry, and long-form investigative monographs.'}
            </p>
          </div>

          <div className="flex flex-row lg:flex-col gap-3 shrink-0 w-full lg:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="flex-1 lg:flex-none bg-red-800 hover:bg-red-700 text-white font-mono font-bold text-xs px-5 py-3 flex items-center justify-center gap-2 border border-black shadow-[4px_4px_0px_#000] cursor-pointer transition-all active:translate-y-0.5"
              title={isAr ? 'طباعة / حفظ كملف PDF' : 'Print / Export as PDF'}
            >
              <Download size={14} className="text-amber-300" />
              <span>{isAr ? 'تصدير الملفات PDF' : 'EXPORT DOSSIERS'}</span>
            </button>

            <button
              onClick={() => setViewMode(viewMode === 'reader' ? 'archive' : 'reader')}
              className="flex-1 lg:flex-none bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-zinc-700 font-mono font-bold text-xs px-4 py-3 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {viewMode === 'reader' ? <Grid size={14} /> : <FileText size={14} />}
              <span>{viewMode === 'reader' ? (isAr ? 'عرض الأرشيف الشبكي' : 'Archive Grid View') : (isAr ? 'العودة للمنصة القرائية' : 'Reading Desk View')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. TOPIC FILTER TABS & REAL-TIME SEARCH */}
      <div className="bg-stone-100 border-2 border-black p-4 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <button
              onClick={() => setThemeFilter('all')}
              className={`px-3.5 py-1.5 font-bold uppercase transition-all border cursor-pointer ${
                themeFilter === 'all'
                  ? 'bg-red-950 text-amber-300 border-red-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {isAr ? `كافة التحقيقات (${aggregatedInvestigations.length})` : `All (${aggregatedInvestigations.length})`}
            </button>

            <button
              onClick={() => setThemeFilter('sovereign')}
              className={`px-3.5 py-1.5 font-bold uppercase transition-all border cursor-pointer ${
                themeFilter === 'sovereign'
                  ? 'bg-red-950 text-amber-300 border-red-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'تحقيقات سيادية وعسكرية' : 'Sovereign & Military'}
            </button>

            <button
              onClick={() => setThemeFilter('economy')}
              className={`px-3.5 py-1.5 font-bold uppercase transition-all border cursor-pointer ${
                themeFilter === 'economy'
                  ? 'bg-red-950 text-amber-300 border-red-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'تدقيق مالي ومصرفي' : 'Forensic Banking & Debt'}
            </button>

            <button
              onClick={() => setThemeFilter('energy')}
              className={`px-3.5 py-1.5 font-bold uppercase transition-all border cursor-pointer ${
                themeFilter === 'energy'
                  ? 'bg-red-950 text-amber-300 border-red-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'الغاز وممرات الطاقة' : 'Oil & Gas Corridors'}
            </button>

            <button
              onClick={() => setThemeFilter('governance')}
              className={`px-3.5 py-1.5 font-bold uppercase transition-all border cursor-pointer ${
                themeFilter === 'governance'
                  ? 'bg-red-950 text-amber-300 border-red-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'حوكمة وشركات كبرى' : 'Corporate & Governance'}
            </button>

            <button
              onClick={() => setThemeFilter('tech')}
              className={`px-3.5 py-1.5 font-bold uppercase transition-all border cursor-pointer ${
                themeFilter === 'tech'
                  ? 'bg-red-950 text-amber-300 border-red-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'كابلات وبنية رقمية' : 'Subsea Cables & Tech'}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-3 ltr:left-3 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث في نصوص الوثائق والتحقيقات...' : 'Search dossier records & text...'}
              className="w-full text-xs font-serif bg-white border border-zinc-400 py-2.5 px-9 focus:outline-none focus:border-red-800 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-3 ltr:right-3 text-xs text-zinc-400 hover:text-black font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Counter and Classification Status */}
        <div className="flex justify-between items-center text-[11px] font-mono text-zinc-600 border-t border-zinc-200 pt-2">
          <span>
            {isAr 
              ? `عرض ${filteredInvestigations.length} دراسة وتحقيق خاص من أصل ${aggregatedInvestigations.length}` 
              : `Displaying ${filteredInvestigations.length} of ${aggregatedInvestigations.length} special investigations`}
          </span>
          <span className="font-bold text-red-900 flex items-center gap-1">
            <ShieldCheck size={13} />
            <span>{isAr ? 'توثيق ديوان التحقيقات والأبحاث السيادية' : 'AL-WARRAQ SOVEREIGN REPOSITORY'}</span>
          </span>
        </div>
      </div>

      {/* 3. FAST MULTI-DOSSIER SELECTOR STRIP */}
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-3 min-w-max">
          {filteredInvestigations.slice(0, 8).map((article) => {
            const isSelected = activeDossier.id === article.id;
            const meta = SPECIAL_DOSSIERS_INDEX[article.id] || {
              fileId: article.id.slice(0, 10).toUpperCase(),
              badge: 'REPORT'
            };

            return (
              <button
                key={article.id}
                onClick={() => {
                  setSelectedDossierId(article.id);
                  if (onSelectDossier) onSelectDossier(article.id);
                  if (deskContainerRef.current) {
                    deskContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`px-4 py-3 border text-right rtl:text-right ltr:text-left transition-all cursor-pointer flex flex-col gap-1 max-w-xs ${
                  isSelected
                    ? 'bg-red-950 text-white border-black shadow-[4px_4px_0px_#991b1b]'
                    : 'bg-white hover:bg-stone-50 text-zinc-900 border-zinc-300'
                }`}
              >
                <div className="flex justify-between items-center text-[9px] font-mono">
                  <span className={isSelected ? 'text-amber-300 font-bold' : 'text-zinc-500'}>
                    {meta.fileId}
                  </span>
                  <span className={`px-1.5 py-0.2 uppercase font-bold text-[8px] border ${isSelected ? 'bg-red-900 text-amber-200 border-red-700' : 'bg-zinc-100 text-zinc-700 border-zinc-200'}`}>
                    {meta.badge}
                  </span>
                </div>
                <span className="text-xs font-sans font-bold line-clamp-2 leading-tight">
                  {isAr ? article.titleAr : article.titleEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN LONG-FORM RESEARCH DESK & DOCUMENT VIEWER */}
      {viewMode === 'reader' && activeDossier && (
        <article className="border-4 border-black bg-white p-6 md:p-10 space-y-8 shadow-[10px_10px_0px_#000] relative">
          
          {/* Top Classification & Clearance Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-black text-amber-400 px-3 py-1 font-bold tracking-wider">
                {activeMeta.fileId}
              </span>
              <span className="bg-red-950 text-red-200 px-2.5 py-1 border border-red-800 font-black uppercase flex items-center gap-1">
                <ShieldAlert size={13} className="text-amber-400" />
                <span>{activeMeta.classification}</span>
              </span>
              <span className="bg-zinc-100 text-zinc-800 px-2.5 py-1 border border-zinc-300 font-bold uppercase">
                {activeMeta.badge}
              </span>
            </div>

            <div className="flex items-center gap-4 text-zinc-500 text-xxs sm:text-xs">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                <span>{activeDossier.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                <span>{isAr ? readStats.displayAr : readStats.displayEn}</span>
              </span>
            </div>
          </div>

          {/* Dossier Title & Subtitle Header */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-sans text-zinc-950 leading-tight">
              {isAr ? activeDossier.titleAr : activeDossier.titleEn}
            </h2>

            {/* Author Bureau & Action Console Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-stone-50 border border-zinc-300 p-4">
              <div className="flex items-center gap-3.5">
                {activeDossier.author?.avatar ? (
                  <img
                    src={activeDossier.author.avatar}
                    alt={isAr ? activeDossier.author.nameAr : activeDossier.author.nameEn}
                    className="w-11 h-11 rounded-none border-2 border-black object-cover"
                  />
                ) : (
                  <div className="w-11 h-11 bg-zinc-950 text-amber-300 flex items-center justify-center font-bold font-mono text-sm border-2 border-black">
                    SI
                  </div>
                )}
                <div>
                  <span className="font-sans font-bold text-xs sm:text-sm text-zinc-900 block">
                    {isAr ? activeDossier.author?.nameAr || 'هيئة التحقيقات الاستقصائية' : activeDossier.author?.nameEn || 'Special Investigations Desk'}
                  </span>
                  <span className="font-serif text-[11px] text-zinc-500 block">
                    {isAr ? activeMeta.leadAnalystAr : activeMeta.leadAnalystEn}
                  </span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                {/* Audio Narrator */}
                <button
                  onClick={toggleSpeech}
                  className={`px-3 py-1.5 border font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isReading 
                      ? 'bg-red-800 text-white border-red-900 animate-pulse' 
                      : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-400'
                  }`}
                  title={isAr ? 'الاستماع صوتياً' : 'Audio reader'}
                >
                  {isReading ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{isReading ? (isAr ? 'إيقاف الصوت' : 'Stop Audio') : (isAr ? 'استماع' : 'Listen')}</span>
                </button>

                {/* Font Resizer */}
                <div className="flex items-center border border-zinc-400 bg-white">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-1 font-serif text-xs ${fontSize === 'normal' ? 'bg-zinc-950 text-white' : 'text-zinc-700 hover:bg-zinc-100'}`}
                    title={isAr ? 'خط عادي' : 'Normal font'}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-1 font-serif text-sm font-bold ${fontSize === 'large' ? 'bg-zinc-950 text-white' : 'text-zinc-700 hover:bg-zinc-100'}`}
                    title={isAr ? 'خط كبير' : 'Large font'}
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setFontSize('xlarge')}
                    className={`px-2 py-1 font-serif text-base font-black ${fontSize === 'xlarge' ? 'bg-zinc-950 text-white' : 'text-zinc-700 hover:bg-zinc-100'}`}
                    title={isAr ? 'خط ضخم' : 'X-Large font'}
                  >
                    A++
                  </button>
                </div>

                {/* Bookmark */}
                <button
                  onClick={() => toggleSave(activeDossier.id)}
                  className={`px-2.5 py-1.5 border flex items-center gap-1 cursor-pointer transition-all ${
                    isSaved 
                      ? 'bg-rose-600 text-white border-rose-700' 
                      : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-400'
                  }`}
                  title={isSaved ? (isAr ? 'محفوظ في المفضلة' : 'Saved') : (isAr ? 'حفظ في المفضلة' : 'Save')}
                >
                  <Bookmark size={13} className={isSaved ? 'fill-current' : ''} />
                  <span className="hidden sm:inline">{isSaved ? (isAr ? 'محفوظ' : 'Saved') : (isAr ? 'حفظ' : 'Save')}</span>
                </button>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-400 cursor-pointer flex items-center gap-1"
                  title={isAr ? 'نسخ الرابط' : 'Copy link'}
                >
                  {copiedLink ? <Check size={13} className="text-emerald-600" /> : <Share2 size={13} />}
                  <span>{copiedLink ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'مشاركة' : 'Share')}</span>
                </button>

                {/* Print / PDF */}
                <button
                  onClick={handlePrint}
                  className="px-2.5 py-1.5 bg-red-900 hover:bg-red-950 text-white border border-red-950 cursor-pointer flex items-center gap-1"
                  title={isAr ? 'تحميل التقرير كـ PDF' : 'Download PDF'}
                >
                  <Download size={13} />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Executive Summary / Key Intelligence Takeaways Box */}
          <div className="bg-amber-50/70 border-2 border-amber-600/70 p-6 space-y-3">
            <div className="flex items-center gap-2 text-red-950 font-mono text-xs font-black uppercase tracking-wider">
              <Sparkles size={15} className="text-amber-600" />
              <span>{isAr ? 'الموجز التنفيذي وخلاصة تقدير الموقف الجيوسياسي' : 'EXECUTIVE BRIEF & GEOPOLITICAL ASSESSMENT'}</span>
            </div>
            <p className="font-serif text-sm md:text-base text-zinc-900 leading-relaxed font-medium">
              {isAr ? (activeDossier.summaryAr || activeMeta.descAr) : (activeDossier.summaryEn || activeMeta.descEn)}
            </p>
          </div>

          {/* Main Visualizer or Infographic if applicable */}
          {renderVisualizer(activeDossier.id) && (
            <div className="my-6 border-2 border-black p-4 bg-stone-50 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xxs text-zinc-500 uppercase pb-2 border-b border-zinc-300">
                <BarChart2 size={12} className="text-red-900" />
                <span>{isAr ? 'المخطط البياني والمسح الميداني المعتمد' : 'VERIFIED TELEMETRY & FIELD INFOGRAPHIC'}</span>
              </div>
              {renderVisualizer(activeDossier.id)}
            </div>
          )}

          {/* Dossier Hero Image if available and not redundant */}
          {activeDossier.imageUrl && !renderVisualizer(activeDossier.id) && (
            <div className="relative border-2 border-black overflow-hidden group">
              <img
                src={activeDossier.imageUrl}
                alt={isAr ? activeDossier.titleAr : activeDossier.titleEn}
                className="w-full max-h-[500px] object-cover filter contrast-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/85 text-white p-3 text-xs font-serif flex justify-between items-center">
                <span>{isAr ? activeDossier.titleAr : activeDossier.titleEn}</span>
                <span className="font-mono text-xxs text-amber-300">{activeMeta.fileId}</span>
              </div>
            </div>
          )}

          {/* Long-Form Research Text Body */}
          <div className={`prose max-w-none font-serif text-zinc-900 leading-relaxed border-t border-zinc-200 pt-6 ${
            fontSize === 'large' ? 'text-lg leading-loose' : fontSize === 'xlarge' ? 'text-xl leading-loose' : 'text-base leading-relaxed'
          }`}>
            <div className="whitespace-pre-line space-y-5">
              {(isAr ? activeDossier.contentAr : activeDossier.contentEn) || 
               (isAr ? activeDossier.summaryAr : activeDossier.summaryEn)}
            </div>
          </div>

          {/* Forensic Evidence & Footnotes Bar */}
          <div className="border-t-2 border-dashed border-zinc-300 pt-6 bg-stone-50/70 p-5 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-800 uppercase">
              <FolderOpen size={14} className="text-red-900" />
              <span>{isAr ? 'حواشي التوثيق والمصادر الميدانية' : 'DOCUMENTATION & FORENSIC SOURCES'}</span>
            </div>
            <ul className="text-xs font-serif text-zinc-600 space-y-1.5 list-disc rtl:pr-5 ltr:pl-5">
              <li>
                {isAr 
                  ? 'تم تدقيق كافة الأرقام والإحداثيات بالرجوع إلى البيانات الرسمية والمسوح الميدانية الموثقة لدى مركز الورّاق للأبحاث.' 
                  : 'All coordinates and fiscal metrics cross-verified against official filings and Al-Warraq field registries.'}
              </li>
              <li>
                {isAr
                  ? 'حقوق النشر والتحليل محفوظة لوحدة الدراسات والتحقيقات الاستقصائية ٢٠٢٦.'
                  : 'Copyright and analytical synthesis reserved for the Special Investigations Unit 2026.'}
              </li>
            </ul>
          </div>

          {/* Tags */}
          {activeDossier.tags && activeDossier.tags.length > 0 && (
            <div className="border-t border-zinc-200 pt-4 flex flex-wrap items-center gap-2 font-mono text-xxs">
              <Tag size={13} className="text-zinc-500" />
              <span className="font-bold text-zinc-700">{isAr ? 'المفاتيح الموضوعية:' : 'Taxonomy:'}</span>
              {activeDossier.tags.map((tag, idx) => (
                <span key={idx} className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-2.5 py-1 border border-zinc-300">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Modal Expansion CTA Footer */}
          <div className="border-t-4 border-black pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-zinc-600 bg-stone-100 p-5">
            <div>
              <span className="block font-black text-zinc-950 text-sm">{isAr ? 'ديوان التحقيقات الخاصة — صحافة الورّاق' : 'Special Investigations Desk — Al-Warraq Journalism'}</span>
              <span className="block text-xxs text-zinc-500">{isAr ? 'مرجع سيادي غير خاضع للمراجعة التحريرية الخارجية' : 'Internal Sovereign Repository — Immutable Record 2026'}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectArticle(activeDossier)}
                className="bg-black hover:bg-zinc-800 text-white font-bold px-5 py-2.5 uppercase transition-all cursor-pointer shadow-[3px_3px_0px_#991b1b] flex items-center gap-2"
              >
                <span>{isAr ? 'فتح في عارض المقالات التفاعلي' : 'Open in Interactive Reader'}</span>
                <ArrowRight size={13} className="rtl:rotate-180" />
              </button>
            </div>
          </div>
        </article>
      )}

      {/* 5. COMPLETE ARCHIVE CATALOG GRID */}
      <section className="mt-12 pt-8 border-t-4 border-double border-zinc-950 space-y-6" id="special-investigations-full-catalog">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-950 text-white p-5 border-2 border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-amber-400" />
              <h3 className="text-lg md:text-xl font-black font-sans text-white">
                {isAr ? 'فهرس التحقيقات والملفات الاستقصائية الشامل' : 'Comprehensive Dossiers & Investigations Index'}
              </h3>
            </div>
            <p className="text-xs text-zinc-400 font-serif">
              {isAr 
                ? `استعراض شامل لكافة الدراسات والوثائق والملفات المفتوحة (${filteredInvestigations.length} ملف)` 
                : `Comprehensive browse of all open records, policy papers, and dossiers (${filteredInvestigations.length} items)`}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="bg-red-900 text-amber-200 px-3 py-1 font-bold border border-red-700">
              {isAr ? 'أرشيف موثق ومفهرس' : 'CLASSIFIED CATALOG'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvestigations.map((article) => {
            const isSelected = activeDossier.id === article.id;
            const meta = SPECIAL_DOSSIERS_INDEX[article.id] || {
              fileId: `AW-DOC-${article.id.slice(0, 6).toUpperCase()}`,
              badge: article.category?.toUpperCase() || 'INVESTIGATION'
            };
            const isSavedItem = savedDossiers.includes(article.id);

            return (
              <div 
                key={article.id}
                onClick={() => {
                  setSelectedDossierId(article.id);
                  if (onSelectDossier) onSelectDossier(article.id);
                  setViewMode('reader');
                  if (deskContainerRef.current) {
                    deskContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`p-5 flex flex-col justify-between transition-all cursor-pointer border ${
                  isSelected 
                    ? 'bg-amber-50/90 border-red-900 shadow-[5px_5px_0px_#7f1d1d]' 
                    : 'bg-white hover:bg-stone-50 border-zinc-300 hover:border-black shadow-[3px_3px_0px_rgba(0,0,0,0.08)]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-zinc-200 pb-2">
                    <span className="bg-zinc-100 text-zinc-900 px-2 py-0.5 font-bold uppercase border border-zinc-300">
                      {meta.fileId}
                    </span>
                    <span className="text-red-900 font-black uppercase text-[9px]">
                      {meta.badge}
                    </span>
                  </div>

                  <h4 className="font-sans font-black text-sm md:text-base text-zinc-950 leading-snug line-clamp-3 hover:text-red-900 transition-colors">
                    {isAr ? article.titleAr : article.titleEn}
                  </h4>

                  <p className="font-serif text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                    {isAr ? (article.excerptAr || article.summaryAr) : (article.excerptEn || article.summaryEn)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-zinc-200 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500 font-bold">
                    {article.date}
                  </span>

                  <span className="text-red-900 font-black flex items-center gap-1 group">
                    <span>{isAr ? 'فتح الملف' : 'Open Dossier'}</span>
                    <span className="rtl:rotate-180 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER GENERAL LICENSE NOTICE */}
      <div className="border-t border-zinc-200 pt-4 text-center text-xxs font-mono text-zinc-500">
        <span>
          {isAr
            ? 'ديوان التحقيقات الخاصة — صحافة استقصائية مستقلة وبحوث سيادية موثقة © ٢٠٢٦ صحيفة الورّاق'
            : 'Special Investigations Hub — Independent Investigative Journalism & Sovereign Research © 2026 Al-Warraq'}
        </span>
      </div>

    </div>
  );
};

export default SpecialInvestigations;
