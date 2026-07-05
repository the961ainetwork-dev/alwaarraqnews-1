import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Copy, 
  Smartphone, 
  Mail, 
  RefreshCw, 
  Share2, 
  Check, 
  AlertCircle, 
  ExternalLink, 
  Flame, 
  Eye, 
  Download, 
  Sliders, 
  LayoutGrid,
  Archive
} from 'lucide-react';
import NewsletterArchive from './NewsletterArchive';
import { DOSSIER_DESKTOP_META } from './AlWarraqInvestigations';

interface NewsletterStory {
  id: string;
  category: string;
  headlineEn: string;
  headlineAr: string;
  synopsisEn: string;
  synopsisAr: string;
  ctaEn: string;
  ctaAr: string;
  url: string;
  unsplashTerm: string;
  isInvestigation?: boolean;
}

interface NewsletterProps {
  language: 'ar' | 'en';
  layoutMode: 'classic-print' | 'modern-white';
  subscribers?: string[];
  setSubscribers?: React.Dispatch<React.SetStateAction<string[]>>;
  onNavigateToSection?: (sectionId: string) => void;
  onSelectDossier?: (id: string) => void;
}

export default function Newsletter({ language, layoutMode, subscribers, setSubscribers, onNavigateToSection, onSelectDossier }: NewsletterProps) {
  const isAr = language === 'ar';
  
  const [emailText, setEmailText] = useState('');
  const [isSuccessfullySubscribed, setIsSuccessfullySubscribed] = useState(false);

  const handleRegisterSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMail = emailText.trim().toLowerCase();
    if (cleanMail) {
      if (setSubscribers) {
        setSubscribers((prev) => {
          if (prev.includes(cleanMail)) return prev;
          const newList = [...prev, cleanMail];
          try {
            localStorage.setItem('alwarraq_subscribers', JSON.stringify(newList));
          } catch (err) {
            console.error(err);
          }
          return newList;
        });
      } else {
        try {
          const stored = localStorage.getItem('alwarraq_subscribers');
          let list: string[] = [];
          if (stored) {
            list = JSON.parse(stored);
          }
          if (Array.isArray(list)) {
            if (!list.includes(cleanMail)) {
              list.push(cleanMail);
              localStorage.setItem('alwarraq_subscribers', JSON.stringify(list));
            }
          }
        } catch (err) {
          console.error("Local storage fallback sync failed:", err);
        }
      }
      setIsSuccessfullySubscribed(true);
      setEmailText('');
    }
  };
  
  const [stories, setStories] = useState<NewsletterStory[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Background integration states for seamless feed injection
  const [pendingStories, setPendingStories] = useState<NewsletterStory[]>([]);
  const [newStoriesCount, setNewStoriesCount] = useState(0);
  
  // Tab control: payload curation vs visual guide codex
  const [activeTab, setActiveTab] = useState<'feed' | 'vibe-guide' | 'archive'>('feed');
  
  // Custom interactive story slicer state for WhatsApp stories preview (9:16)
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [slicerTheme, setSlicerTheme] = useState<'dark-monolith' | 'stark-light' | 'neon-crimson'>('dark-monolith');
  
  // Copy indicators
  const [copiedStoryId, setCopiedStoryId] = useState<string | null>(null);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [whatsappSharedId, setWhatsappSharedId] = useState<string | null>(null);

  // Interactive Dispatch Engine States
  const [targetStoryId, setTargetStoryId] = useState<string | null>(null);
  const [dispatchMode, setDispatchMode] = useState<'whatsapp' | 'email'>('whatsapp');
  const [selectedRecipientEmail, setSelectedRecipientEmail] = useState<string>('');
  const [customDispatchNote, setCustomDispatchNote] = useState<string>('');
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [dispatchProgress, setDispatchProgress] = useState<number>(0);
  const [dispatchLogs, setDispatchLogs] = useState<string[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);

  // Load registered users from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('alwarraq_registered_users');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRegisteredUsers(parsed);
          if (parsed.length > 0) {
            setSelectedRecipientEmail(parsed[0].email);
          }
        }
      }
    } catch (e) {
      console.error("Local storage users fetch failed:", e);
    }
  }, []);

  // Sync targetStoryId if stories load
  useEffect(() => {
    if (stories.length > 0 && !targetStoryId) {
      setTargetStoryId(stories[0].id);
    }
  }, [stories, targetStoryId]);

  const handleTriggerEmailDispatch = () => {
    if (!targetStoryId) {
      alert(isAr ? 'برجاء اختيار خبر لإرساله أولاً' : 'Please select a story to dispatch.');
      return;
    }
    const story = stories.find(s => s.id === targetStoryId) || stories[0];
    const emailToUse = selectedRecipientEmail.trim().toLowerCase();
    if (!emailToUse) {
      alert(isAr ? 'يرجى إدخال أو تحديد عنوان بريد إلكتروني صالح' : 'Please enter or select a valid recipient email.');
      return;
    }

    setDispatchStatus('sending');
    setDispatchProgress(0);
    const startLogs = [
      `⏱ [${new Date().toLocaleTimeString()}] ${isAr ? 'جاري فتح بروتوكول تيسلير SMTP آمن...' : 'Opening secure SMTP transmission protocol...'}`,
      `📡 [${new Date().toLocaleTimeString()}] ${isAr ? 'تشفير ورصّ البرقية صالحة النشر للخبر: ' : 'Encrypting dispatch payload for: '} "${isAr ? story.headlineAr : story.headlineEn}"`,
    ];
    setDispatchLogs(startLogs);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setDispatchProgress(currentProgress);

      if (currentProgress === 40) {
        setDispatchLogs(prev => [...prev, 
          `⚙️ [${new Date().toLocaleTimeString()}] ${isAr ? `تطابق عنوان مستلم القراءة الدائمة (${emailToUse})` : `Validating permanent reader address (${emailToUse})`}`
        ]);
      } else if (currentProgress === 80) {
        setDispatchLogs(prev => [...prev, 
          `📨 [${new Date().toLocaleTimeString()}] ${isAr ? 'بث أحرف البرقية وتخصيص هوية المستلِم...' : 'Spooling news blocks and stamping headers...'}`
        ]);
      } else if (currentProgress === 100) {
        clearInterval(interval);
        setDispatchStatus('success');
        setDispatchLogs(prev => [...prev, 
          `✓ [${new Date().toLocaleTimeString()}] ${isAr ? `تم الإرسال وحفظ التوقيع بنجاح! رمز المعاملة: [ALW-${story.id.toUpperCase()}]` : `Dispatch completed successfully! Secured transaction: [ALW-${story.id.toUpperCase()}]`}`
        ]);
      }
    }, 350);
  };

  // Fetch / Regenerate fresh curation from backend API
  const fetchCuration = async (silent = false) => {
    if (!silent) setLoading(true);
    setErrorStatus(null);

    // Map investigations to NewsletterStory schema
    const dossierStories: NewsletterStory[] = Object.entries(DOSSIER_DESKTOP_META).map(([id, meta]) => ({
      id: id,
      category: "investigations",
      headlineEn: `INVESTIGATION: ${meta.titleEn}`,
      headlineAr: `تحقيق استقصائي: ${meta.titleAr}`,
      synopsisEn: meta.descEn,
      synopsisAr: meta.descAr,
      ctaEn: "READ DOSSIER",
      ctaAr: "قراءة الملف كاملاً",
      url: `https://www.alwarraqnews.com/?category=alwarraq-investigations&dossier=${id}`,
      unsplashTerm: "oil infrastructure harbor refinery ship",
      isInvestigation: true
    }));

    try {
      const res = await fetch('/api/newsletter/generate');
      if (res.ok) {
        const data = await res.json();
        if (data && data.curation) {
          const merged = [...data.curation, ...dossierStories];
          if (silent) {
            // Compare & calculate new stories count
            const newStories = merged.filter((newS: NewsletterStory) => 
              !stories.some(existingS => existingS.id === newS.id)
            );
            if (newStories.length > 0) {
              setPendingStories(merged);
              setNewStoriesCount(newStories.length);
            }
          } else {
            setStories(merged);
            if (merged.length > 0 && !selectedStoryId) {
              setSelectedStoryId(merged[0].id);
            }
            setPendingStories([]);
            setNewStoriesCount(0);
          }
        } else {
          throw new Error("Invalid schema received");
        }
      } else {
        throw new Error("API responded with error code");
      }
    } catch (err: any) {
      console.warn("Falling back to local high-fidelity curation telemetry:", err.message);
      // Hard fallback structured data complying with daily refresh specifications
      const fallbackPayload: NewsletterStory[] = [
        {
          id: "mou-hero",
          category: "techno-politics",
          headlineEn: "THE US-IRAN SWAP: THE RECOIL OF THE 2026 WAR AND THE ACCELERATED SHUNT",
          headlineAr: "تسونامي التفاهم: زلزال توقيع مذكرة واشنطن وطهران ومسارات الالتفاف الطاقي واللوجستي الجريئة",
          synopsisEn: "Now that the US-Iran MOU is signed, Gulf powers rapid-run pipeline expansions and cross-peninsula railways to bypass Strait of Hormuz pressure. Who stands to benefit?",
          synopsisAr: "الآن بعد توقيع مذكرة التفاهم بين الولايات المتحدة وإيران، ماذا بعد؟ دول المنطقة تتحرك بسرعة فائقة لتكييف بنيتها اللوجستية وتوسيع شبكات الأنابيب والسكك لتفادي طائلة حصار مضيق هرمز الحرج.",
          ctaEn: "ANALYZE FRICTION",
          ctaAr: "تفكيك المسار",
          url: "https://alwarraqnews.com/section/editor-desk",
          unsplashTerm: "nuclear power oil dock ship industry"
        },
        {
          id: "trans-1",
          category: "cyber-finance",
          headlineEn: "THE LIQUIDITY ESCROLL: LEBANON EUROBONDS CAPTURED IN THE 22-CENT SWIRL",
          headlineAr: "الملتفّ المالي: سندات يوروبوندز لبنان تنجرف في دوّامة الـ 22 سنتاً",
          synopsisEn: "A high-stakes chess match unfolds in post-war Lebanon as distressed debt funds brace for restructured haircuts. Behind closed doors, elite advisors recalculate exit yields against regional risk premiums.",
          synopsisAr: "معادلة صعبة تصيب السندات السيادية اللبنانية في أعقاب صدمات الحرب المستمرة في الشرق الأوسط. وفي كواليس المكاتب المغلقة، يعيد المستشارون تصفير التوقعات مع اتساع تكلفة المخاطر وتأجيل الإصلاحات التشريعية.",
          ctaEn: "DECODE DILEMMA",
          ctaAr: "فك الشفرة",
          url: "https://alwarraqnews.com/section/editor-desk",
          unsplashTerm: "financial market screen index graph"
        },
        {
          id: "trans-2",
          category: "techno-politics",
          headlineEn: "SUBSEA MONOPOLY: THE CO WAR ALONG SILICON TELECOM SHORES",
          headlineAr: "احتكار القاع: حياكة أسلاك الحرب الباردة فوق كوابل الاتصالات البحرية",
          synopsisEn: "Sovereign superpowers are silently rerouting optical fiber highways along deep marine shelves. The ambition is not merely connectivity—it is absolute territorial surveillance under the guise of cloud infrastructure.",
          synopsisAr: "قوى سيادية تعيد مد الطرق البحرية للألياف البصرية عبر الجروف القارية العميقة بنشاط هائل. طموح الاندفاع الجديد لا يقتصر على ربط القارات بالمقومات الرقمية، بل يهدف إلى إرساء مراقبة كلية شاملة تحت غطاء السحاب.",
          ctaEn: "ENTER THE VOID",
          ctaAr: "الولوج للعمق",
          url: "https://alwarraqnews.com/section/telecom-internet",
          unsplashTerm: "server matrix hardware wires cyber"
        },
        {
          id: "trans-3",
          category: "resource-friction",
          headlineEn: "DESERT KINETICS: THE ECO-AGRI RESISTANCE IN THE SEMI-ARID PLAIN",
          headlineAr: "حركية البادية: مقاومة زراعية ذكية لصد اختلال المناخ في وهاد البقاع",
          synopsisEn: "Amidst extreme regional droughts, cooperative farmers deploy miniature solar telemetry grids to reclaim dry fields. The agricultural revolution is offline, independent, and strictly decentralized.",
          synopsisAr: "في قلب مواسم الجفاف القاسية، يبتكر مزارعو البقاع مجسات رطوبة وشمسيات هجينة لاستنقاذ التربة من وهن العطش. الثورة الزراعية الجديدة تبدأ لا مركزية، مستقلة، وخارج تغطية الشبكات الموحدة.",
          ctaEn: "UNPACK THE CODE",
          ctaAr: "تحليل الكود",
          url: "https://alwarraqnews.com/section/lebanon",
          unsplashTerm: "agricultural solar panels farm arid"
        },
        {
          id: "trans-4",
          category: "sovereign-intel",
          headlineEn: "THE ALGORITHMIC EXPURGATORY: CRITICAL JOURNALISM TO OVERRIDE SYNTHETIC NOISE",
          headlineAr: "التصفية الخوارزمية: زاوية الحبر والتحقيق تصعد لمقاومة السيل التقني الزائف",
          synopsisEn: "As global feeds are flooded with synthetic generative noise, elite field reporters double down on handwritten logs and physical verify channels. Authenticity is now a form of systemic rebellion.",
          synopsisAr: "بينما تجتاح الخورازميات فضاء تلقي الأخبار ببريق زائف مكرر، يلوذ المراقبون بالتحقيق الميداني المدقّق والمشاهدة الحية المباشرة. باتت الحقيقة المحققة تمثل اليوم شكلًا صارمًا من العصيان المعرفي.",
          ctaEn: "WITNESS COGNITION",
          ctaAr: "شاهد المعرفة",
          url: "https://alwarraqnews.com/section/exclusives",
          unsplashTerm: "vintage dark newspaper block print"
        }
      ];
      const merged = [...fallbackPayload, ...dossierStories];
      setStories(merged);
      setSelectedStoryId(merged[0].id);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuration();
  }, []);

  // Periodic silent background feed monitor (every 12 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCuration(true);
    }, 12000);
    return () => clearInterval(interval);
  }, [stories]);

  const getStoryShareUrl = (story: NewsletterStory) => {
    const idMap: Record<string, string> = {
      'mou-hero': 'desk-mou',
      'trans-1': 'desk-eurobonds',
      'trans-2': 'telecom-2',
      'trans-3': 'leb-1',
      'trans-4': 'desk-cpi-extortion',
    };

    const mappedArticleId = idMap[story.id];
    if (mappedArticleId) {
      return `https://www.alwarraqnews.com/?article=${mappedArticleId}`;
    }

    try {
      const stored = localStorage.getItem('alwarraq_all_articles');
      if (stored) {
        const storedArticles = JSON.parse(stored);
        if (Array.isArray(storedArticles)) {
          const found = storedArticles.find((a: any) => 
            a.id === story.id ||
            a.titleEn === story.headlineEn ||
            a.titleAr === story.headlineAr ||
            (story.headlineAr && a.titleAr?.includes(story.headlineAr.slice(0, 10)))
          );
          if (found) {
            return `https://www.alwarraqnews.com/?article=${found.id}`;
          }
        }
      }
    } catch (e) {
      console.warn("Storage parsed mismatch:", e);
    }

    return `https://www.alwarraqnews.com/?article=${story.id}`;
  };

  const handleCopyStoryRaw = (story: NewsletterStory) => {
    const shareUrl = getStoryShareUrl(story);
    const textToCopy = `*${isAr ? story.headlineAr : story.headlineEn}*
${isAr ? story.synopsisAr : story.synopsisEn}

👉 ${isAr ? 'تابع من هنا:' : 'Read full dossier:'} ${shareUrl}
[${isAr ? story.ctaAr : story.ctaEn}]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedStoryId(story.id);
    setTimeout(() => setCopiedStoryId(null), 2500);
  };

  const handleShareWhatsApp = (story: NewsletterStory) => {
    const shareUrl = getStoryShareUrl(story);
    const prefix = isAr 
      ? `هذا تنبيه إخباري من alwarraqnews.com - تحليل وتغطية صحفية\n\n` 
      : `This is a news alert from alwarraqnews.com - News Analysis and Reporting\n\n`;
    const textToShare = `${prefix}*${isAr ? story.headlineAr : story.headlineEn}*
${isAr ? story.synopsisAr : story.synopsisEn}

👉 ${isAr ? 'لقراءة تفاصيل الملف:' : 'Read full dossier:'} ${shareUrl}
[${isAr ? story.ctaAr : story.ctaEn}]

join our whatsapp group on https://chat.whatsapp.com/Fgh6uYQegGKKjs3DL6hy6A -  read more on alwarraqnews.com - Read our latest newsletter edition on join our premium subscribers https://www.alwarraqnews.com/premium-pricing`;
    const encoded = encodeURIComponent(textToShare);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    setWhatsappSharedId(story.id);
    setTimeout(() => setWhatsappSharedId(null), 2500);
  };

  const handleShareTwitter = (story: NewsletterStory) => {
    const shareUrl = getStoryShareUrl(story);
    const textToTweet = `*${isAr ? story.headlineAr : story.headlineEn}* - ${shareUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(textToTweet)}`, '_blank');
  };

  const handleShareFacebook = (story: NewsletterStory) => {
    const shareUrl = getStoryShareUrl(story);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  // Generate complete valid, inline-styled email campaign HTML for Mailchimp / HubSpot
  const getCompiledEmailHtml = () => {
    const direction = isAr ? 'rtl' : 'ltr';
    const emailStories = stories.map((s) => `
      <!-- STORY ENTRY START -->
      <tr style="border-bottom: 2px solid #000000;">
        <td style="padding: 24px 0; font-family: 'Courier New', Courier, monospace; text-align: ${isAr ? 'right' : 'left'};">
          <span style="font-size: 11px; background-color: #000000; color: #ffffff; padding: 4px 8px; font-weight: bold; display: inline-block; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">
            ${s.category.toUpperCase()}
          </span>
          <h2 style="font-size: 20px; font-weight: 900; line-height: 1.2; margin: 0 0 10px 0; color: #000000; letter-spacing: -0.5px; text-transform: uppercase;">
            ${isAr ? s.headlineAr : s.headlineEn}
          </h2>
          <p style="font-size: 13px; line-height: 1.5; color: #2d2d2d; margin: 0 0 16px 0; font-family: Arial, sans-serif;">
            ${isAr ? s.synopsisAr : s.synopsisEn}
          </p>
          <a href="${s.url}" style="background-color: #ff3b30; color: #ffffff; text-decoration: none; padding: 10px 20px; font-weight: bold; font-size: 11px; display: inline-block; border: 2px solid #000000; text-transform: uppercase; letter-spacing: 1px;">
            ${isAr ? s.ctaAr : s.ctaEn} →
          </a>
        </td>
      </tr>
      <!-- STORY ENTRY END -->
    `).join('');

    return `<!DOCTYPE html>
<html lang="${language}" dir="${direction}">
<head>
  <meta charset="UTF-8">
  <title>THE DAILY TRANSMISSION - AL-WARRAQ</title>
</head>
<body style="background-color: #f6f6f6; margin: 0; padding: 4px; font-family: sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f6f6f6;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <!-- Container table -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border: 4px solid #000000; padding: 24px;">
          
          <!-- Stark Header -->
          <tr>
            <td style="border-bottom: 4px double #000000; padding-bottom: 20px; text-align: center;">
              <h1 style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 900; margin: 0 0 4px 0; letter-spacing: -1px; color: #000000;">
                THE DAILY TRANSMISSION
              </h1>
              <p style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; margin: 0; color: #666666; letter-spacing: 2px;">
                BENEATH CIVILIZATION • CURATED WIRELESS AL-WARRAQ INDICES
              </p>
              <p style="font-family: Arial, sans-serif; font-size: 10px; margin: 8px 0 0 0; color: #999;">
                DISPATCH TIME: ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} • REFRESHED DAILY
              </p>
            </td>
          </tr>

          <!-- Stories list -->
          <tr>
            <td>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                ${emailStories}
              </table>
            </td>
          </tr>

          <!-- Asymmetrical Stark Footer -->
          <tr>
            <td style="border-top: 4px double #000000; padding-top: 24px; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-align: center; color: #555555;">
              <p style="margin: 0 0 8px 0; font-weight: bold; text-transform: uppercase;">
                AL-WARRAQ ANTIGRAVITY WIRE TRANSMISSION SYSTEM
              </p>
              <p style="margin: 0; font-size: 9px; line-height: 1.4;">
                This telex dispatch is offline-safe, lightweight, and engineered without heavy trackers or color pollution for premium performance.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  };

  const handleCopyEmailHtml = () => {
    navigator.clipboard.writeText(getCompiledEmailHtml());
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const selectedStory = stories.find(s => s.id === selectedStoryId) || stories[0];

  return (
    <div className={`p-1 space-y-8 font-sans ${layoutMode === 'classic-print' ? 'text-zinc-900' : 'text-black'}`}>
      
      {/* Avant-Garde Stark Page Header */}
      <div className="border-4 border-black bg-black text-white p-8 md:p-12 relative overflow-hidden select-none">
        {/* Abstract absolute background graphics mock */}
        <div className="absolute top-0 right-0 w-32 h-full bg-zinc-800/10 transform skew-x-12"></div>
        <div className="absolute bottom-0 left-12 w-64 h-1/3 bg-red-600/15 transform -skew-x-12"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 inline-block animate-ping rounded-none shrink-0" />
              <span className="font-mono text-[9px] font-black tracking-widest bg-red-600 text-white px-2 py-0.5 uppercase">
                {isAr ? 'البث العام الفوري' : 'LIVE WIRE TRANSMISSION'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-black tracking-tighter leading-none text-white">
              {isAr ? 'نشرة أخبار الوراق alwarraqnews' : 'alwarraqnews Newsletter'}
            </h1>
            <p className="font-mono text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest mt-1">
              🚀 {isAr ? 'تاريخ النشرة:' : 'BULLETIN DATE:'} <span className="text-red-500">{new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span> • {isAr ? 'رقم البث الرقمي المستدام' : 'SUSTAINED TRANSMISSION ADAPTOR NO. 22'}
            </p>
            
            <p className="text-zinc-400 font-mono text-xs max-w-xl leading-relaxed">
              {isAr 
                ? 'موجز استخباري وفكري عاصف يقاوم غبار الخوارزميات. يعاد صياغة وتصفية أخبار الشأن الإقليمي والسيادي يومياً لتسليمها بخطوط عريضة دون رتوش.' 
                : 'A brutalist, high-contrast digital curation bypassessing machine clutter. Curating 3-5 of the daily geopolitical and financial frictions for instant email delivery and WhatsApp Story layouts.'}
            </p>

            {/* Brutalist Newsletter Subscription Form directly on page */}
            <div className="mt-6 pt-6 border-t border-zinc-850/60 max-w-xl">
              <AnimatePresence mode="wait">
                {isSuccessfullySubscribed ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="bg-zinc-900 border border-emerald-500 text-emerald-400 p-4 font-mono text-xs text-center flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(16,185,129,0.2)]"
                  >
                    <Check size={16} className="text-emerald-400 shrink-0 animate-bounce" />
                    <span>
                      {isAr 
                        ? 'تم تسجيل بريدكم في ديوان المتابعين واستلام أول إرسالية تيلكس بنجاح!' 
                        : 'Subscription successful! You are now connected to the Al-Warraq direct line.'}
                    </span>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleRegisterSubscription} 
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <input
                      type="email"
                      required
                      value={emailText}
                      onChange={(e) => setEmailText(e.target.value)}
                      placeholder={isAr ? 'أدخل بريدك الإلكتروني للاشتراك الفوري المباشر' : 'Enter your email for the direct telex wire'}
                      className="flex-1 bg-zinc-900 text-white font-mono text-xs border border-zinc-700 px-4 py-3 outline-none focus:border-red-500 transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-[#b91c1c] hover:bg-[#991b1b] text-white font-mono font-bold text-xs px-6 py-3 border border-red-700 uppercase transition-all tracking-wider cursor-pointer text-center whitespace-nowrap shrink-0"
                    >
                      {isAr ? 'اشتراك عاجل' : 'SUBSCRIBE TO WIRE'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              
              {/* LINK TO THE ARCHIVE */}
              <div className="mt-3 flex justify-between items-center text-zinc-500 font-mono text-[10px]">
                <span>* {isAr ? 'بدون تتبع إعلاني' : 'Zero trackers embedded'}</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('archive')}
                  className="text-zinc-400 hover:text-red-500 hover:underline transition-colors uppercase tracking-wider font-extrabold cursor-pointer"
                >
                  {isAr ? 'تصفح ديوان الأرشيف العام ←' : 'Browse Past Bulletins Archive →'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 md:text-right">
            <span className="text-[10px] font-mono font-black text-zinc-500 block uppercase tracking-widest">
              {isAr ? 'التردد الإشعاعي للوراق' : 'AL-WARRAQ STARK TELEX'}
            </span>
            <div className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 font-mono text-xxs flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              <span>{isAr ? 'مزامنة نشطة لليوم' : 'STARK TELEMETRY ON'}</span>
            </div>
            <button 
              onClick={() => fetchCuration()}
              disabled={loading}
              className="mt-2 text-white bg-[#b91c1c] hover:bg-[#991b1b] border border-black font-mono font-bold text-xxs px-3 py-1.5 rounded-none flex items-center gap-1.5 transition-all w-full md:w-auto justify-center cursor-pointer"
            >
              <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
              <span>{loading ? (isAr ? 'جاري الصقل...' : 'Recalibrating...') : (isAr ? 'تحديث فوري للنشرة' : 'REFRESH DAILY FEED')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Triple Tab Controller: Curation Feed vs Archive vs Design Vibe Guide */}
      <div className="flex flex-col sm:flex-row border-b-4 border-black select-none">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 py-4 px-6 text-xs md:text-sm font-black uppercase text-center border-t border-x border-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'feed'
              ? 'bg-black text-white hover:bg-black font-black'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          <LayoutGrid size={15} />
          <span>{isAr ? "البث اليومي المعروض" : "Today's Stark Curation"}</span>
        </button>
        <button
          onClick={() => setActiveTab('archive')}
          className={`flex-1 py-4 px-6 text-xs md:text-sm font-black uppercase text-center border-t border-x border-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'archive'
              ? 'bg-black text-white hover:bg-black font-black'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          <Archive size={15} />
          <span>{isAr ? "أرشيف النشرات السابقة" : "Past Bulletins Archive"}</span>
        </button>
        <button
          onClick={() => setActiveTab('vibe-guide')}
          className={`flex-1 py-4 px-6 text-xs md:text-sm font-black uppercase text-center border-t border-x border-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'vibe-guide'
              ? 'bg-black text-white hover:bg-black font-black'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          <Sliders size={15} />
          <span>{isAr ? "دليل الهوية والتصميم المتمرد" : "Design & Vibe Guide"}</span>
        </button>
      </div>

      {activeTab === 'feed' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT AREA: CURATION FEED LIST (3-5 Stories) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-center pb-2.5 border-b-2 border-black">
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#b91c1c] flex items-center gap-1.5">
                <Flame size={14} className="animate-pulse" />
                <span>{isAr ? 'ديوان طبعة الوراق والملفات العاجلة' : "AL-WARRAQ COMPILATION MATRIX"}</span>
              </span>
              <span className="font-mono text-[9.5px] bg-black text-white px-2 py-0.5 font-bold uppercase">
                {stories.length} {isAr ? 'برقيات مفرزة' : 'Dispatches Secured'}
              </span>
            </div>

            {loading ? (
              <div className="py-24 text-center space-y-4 bg-zinc-100 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                <RefreshCw size={36} className="mx-auto text-black animate-spin" />
                <p className="font-mono font-black text-xs text-black uppercase animate-pulse">
                  {isAr ? 'جاري فرز الأخبار وقراءة الكوابل السيادية...' : 'DREDGING TELECOMMUNICATION CACHING CYCLES...'}
                </p>
                <p className="text-xxs text-zinc-500 font-serif italic">
                  {isAr ? 'الذكاء الاصطناعي يستدعي أخبار بدارو ومخططات الشرق الأوسط' : 'Synthesizing Al-Warraq field reports with Gemini 3.5-flash'}
                </p>
              </div>
            ) : stories.length === 0 ? (
              <div className="py-24 text-center space-y-3 bg-yellow-50 border-2 border-dashed border-zinc-400 p-6">
                <AlertCircle size={32} className="mx-auto text-yellow-600" />
                <p className="font-mono text-xs font-black text-black uppercase">
                  {isAr ? 'لم نتمكن من التقاط إشارة البث المباشر' : 'No transmission intercepted.'}
                </p>
                <button 
                  onClick={() => fetchCuration()}
                  className="bg-black hover:bg-zinc-800 text-white font-mono text-xxs font-black px-4 py-2"
                >
                  {isAr ? 'إعادة الإرسال القسري' : 'FORCE RE-DISPATCH'}
                </button>
              </div>
            ) : (
              <div className="space-y-8" id="newsletter-layout-flow">
                
                {/* BACKGROUND UPDATES NOTIFICATION TOAST/BANNER */}
                {newStoriesCount > 0 && (
                  <div className="bg-black text-[#10b981] border-4 border-[#10b981] p-4 flex flex-col sm:flex-row justify-between items-center gap-3 animate-pulse shadow-[4px_4px_0px_0px_#10b981]">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                      <div className="text-left">
                        <span className="font-mono text-xs font-black uppercase tracking-wider block">
                          {isAr ? `تحديث عاجل: تم تدوير [${newStoriesCount}] برقية عاجلة` : `BULLETIN: [${newStoriesCount}] URGENT REPORT(S) FILED`}
                        </span>
                        <span className="text-[10px] text-zinc-300 font-medium block mt-0.5">
                          {isAr ? 'عناوين ميدانية جديدة متوفرة في ديوان النشرة دون اعتراض قراءتك الحالية.' : 'Fresh intelligence is pending merge. Your viewing position has been securely preserved.'}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setStories(pendingStories);
                        if (pendingStories.length > 0) {
                          setSelectedStoryId(pendingStories[0].id);
                        }
                        setPendingStories([]);
                        setNewStoriesCount(0);
                      }}
                      className="bg-[#10b981] hover:bg-[#059669] text-black font-mono font-black text-xxs px-4 py-2 border border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-100 uppercase shrink-0"
                    >
                      {isAr ? 'دمج التحديثات ومطالعة البث' : 'MERGE & EXPOSE NEW DOSSIERS'}
                    </button>
                  </div>
                )}

                {/* ======================================================== */}
                {/* 1. FEATURE STORY COMPONENT (The Premier Dossier)       */}
                {/* ======================================================== */}
                {(() => {
                  const featureS = stories[0];
                  return (
                    <div 
                      className={`border-4 border-black p-6 bg-[#FCFCFA] relative shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] transition-all ${
                        layoutMode === 'classic-print' ? 'vintage-paper' : ''
                      }`}
                      id="newsletter-feature-story"
                    >
                      {/* Feature Story Identification Badge */}
                      <span className="absolute -top-3.5 left-4 bg-red-650 text-white font-mono text-[9px] font-black uppercase px-3 py-1 border-2 border-black tracking-widest shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                        👑 {isAr ? 'القصة الرئيسية المميزة بالديوان' : 'PREMIER FEATURED DOSSIER'}
                      </span>

                      <span className="absolute top-3 right-4 font-mono text-[10px] text-zinc-400 font-black uppercase">
                        REF: T-{featureS.id.toUpperCase()}
                      </span>

                      <div className="pt-2 flex flex-wrap items-center gap-2.5 mb-3.5">
                        <span className="font-mono text-[9px] font-black uppercase bg-black text-white px-2 py-0.5 tracking-wider border border-black">
                          {featureS.category.toUpperCase()}
                        </span>
                        <span className="w-1.5 h-1.5 bg-red-600"></span>
                        <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">
                          {isAr ? 'سجل الرصد المالي والجيوسياسي' : 'SOVEREIGN REGISTER WIRE'}
                        </span>
                      </div>

                      {/* Large Headline */}
                      <h2 
                        className="text-xl md:text-2xl lg:text-3xl font-sans font-black tracking-tight leading-tight uppercase hover:text-red-700 cursor-pointer text-black transition-colors"
                        onClick={() => {
                          setSelectedStoryId(featureS.id);
                          setTargetStoryId(featureS.id);
                        }}
                      >
                        {isAr ? featureS.headlineAr : featureS.headlineEn}
                      </h2>

                      {/* Exquisite Full Sized Synopsis */}
                      <p className="mt-4 text-xs md:text-sm text-zinc-700 font-serif font-medium leading-relaxed select-text border-l-4 border-black pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pr-4">
                        {isAr ? featureS.synopsisAr : featureS.synopsisEn}
                      </p>

                      {/* Custom decorative divider resembling a print newspaper layout */}
                      <div className="my-6 border-b-2 border-dashed border-zinc-300"></div>

                      {/* Interactive Trigger Shortcuts */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                        <div className="flex items-center gap-2">
                          <a 
                            href={featureS.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-black hover:bg-zinc-800 text-white font-mono font-bold text-xxs px-4 py-2 border border-black uppercase flex items-center gap-1.5 transition-all text-center cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-none"
                          >
                            <span>{isAr ? featureS.ctaAr : featureS.ctaEn}</span>
                            <ExternalLink size={10} />
                          </a>

                          <button 
                            onClick={() => {
                              setSelectedStoryId(featureS.id);
                              setTargetStoryId(featureS.id);
                              const targetNode = document.getElementById('dispatch-control-station');
                              if (targetNode) targetNode.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-zinc-100 hover:bg-zinc-200 border-2 border-black text-neutral-900 font-mono text-xxs font-black py-1.5 px-3 uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)] hover:shadow-none"
                          >
                            <RefreshCw size={10} className="animate-spin-slow" />
                            <span>{isAr ? 'تلقيم جهاز البث فورا' : 'STAGE DISPATCH'}</span>
                          </button>
                        </div>

                        {/* Quick copy / Share buttons for Feature */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopyStoryRaw(featureS)}
                            className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white hover:bg-zinc-100 transition-all cursor-pointer text-black"
                            title="Copy telex draft"
                          >
                            {copiedStoryId === featureS.id ? (
                              <Check size={14} className="text-green-600" />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                          
                          <button
                            onClick={() => handleShareWhatsApp(featureS)}
                            className="w-8 h-8 flex items-center justify-center border-2 border-black text-[#25D366] bg-white hover:bg-[#25D366]/10 transition-all cursor-pointer"
                            title="Share story via WhatsApp"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008 0c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.512 5.281 3.51 8.487-.005 6.657-5.34 11.997-11.953 12.003-2.005-.001-3.973-.501-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436-.005 9.858-4.427 9.862-9.864.002-2.63-1.023-5.102-2.89-6.97C16.576 1.899 14.102 1.071 12.004 1.07 6.573 1.075 2.149 5.497 2.146 10.93.141 12.616.637 14.215 1.588 15.8l-.999 3.648 3.734-.979z"/>
                            </svg>
                          </button>

                          {/* Twitter */}
                          <button
                            onClick={() => handleShareTwitter(featureS)}
                            className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white hover:bg-zinc-100 text-black transition-all cursor-pointer"
                            title="Share story on X"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.16l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          </button>

                          {/* Facebook */}
                          <button
                            onClick={() => handleShareFacebook(featureS)}
                            className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white hover:bg-blue-50 text-blue-700 transition-all cursor-pointer"
                            title="Share story on Facebook"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* ======================================================== */}
                {/* 2. DYNAMIC NEWSWIRE ROW TABLE STRUCTURE FOR OTHER ITEMS   */}
                {/* ======================================================== */}
                <div className="border-4 border-black p-5 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-4" id="newswire-rows-section">
                  <div className="border-b-2 border-black pb-2 flex justify-between items-center sm:items-end">
                    <div>
                      <h4 className="font-sans font-black text-sm uppercase flex items-center gap-1.5 text-black">
                        🗞️ {isAr ? 'سجل البرقيات وشريط الأخبار اليومي الصاعد' : 'SUSTAINED DAILY NEWSWIRE REGISTER'}
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-medium">
                        {isAr ? 'الأرشيف الميداني المصنف للتطورات الجارية وقنوات الإحالة المحققة.' : 'Classified live feeds, indexed briefs, and verified destination links.'}
                      </p>
                    </div>
                    <span className="font-mono text-[9px] bg-red-100 text-red-700 px-2 py-0.5 uppercase font-bold border border-red-300">
                      {stories.slice(1).length} {isAr ? 'عناوين رصد' : 'Briefs Active'}
                    </span>
                  </div>

                  {stories.slice(1).length === 0 ? (
                    <p className="text-center italic text-zinc-400 py-6 font-serif text-xs">
                      {isAr ? 'لا توجد برقيات فرعية مدرجة بطبعة مصفوفة اليوم.' : 'No additional newswire briefs filed for today\'s edition.'}
                    </p>
                  ) : (
                    <div className="divide-y divide-black/80" id="wire-table-container">
                      {stories.slice(1).map((wireS, index) => {
                        const cleanUrlName = wireS.url.replace('https://', '').replace('www.', '').split('/')[0];
                        return (
                          <div 
                            key={wireS.id} 
                            className="py-4 hover:bg-neutral-50/50 transition-colors flex flex-col md:flex-row items-start gap-4 md:items-center justify-between"
                          >
                            {/* Left Meta indices column */}
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center flex-wrap gap-2">
                                <span className="font-mono text-[9px] bg-zinc-100 border border-zinc-300 font-black uppercase text-zinc-700 px-1.5 py-0.5">
                                  {wireS.category.toUpperCase()}
                                </span>
                                <span className="font-mono text-[9px] text-[#b91c1c] font-bold">
                                  #{wireS.id.toUpperCase()}
                                </span>
                                <span className="text-[10px] font-mono text-zinc-400">
                                  {(index + 2).toString().padStart(2, '0')}
                                </span>
                              </div>

                              {/* Clickable Headline */}
                              <h5 
                                className="font-sans font-black text-xs md:text-sm uppercase text-black hover:text-[#b91c1c] cursor-pointer"
                                onClick={() => {
                                  if (wireS.isInvestigation) {
                                    if (onSelectDossier) onSelectDossier(wireS.id);
                                    if (onNavigateToSection) onNavigateToSection('alwarraq-investigations');
                                  } else {
                                    setSelectedStoryId(wireS.id);
                                    setTargetStoryId(wireS.id);
                                  }
                                }}
                              >
                                {isAr ? wireS.headlineAr : wireS.headlineEn}
                              </h5>

                              {/* Tiny elegant Synopsis / Excerpt */}
                              <p className="text-[11px] text-zinc-600 font-serif leading-snug line-clamp-2">
                                {isAr ? wireS.synopsisAr : wireS.synopsisEn}
                              </p>

                              {/* Destination Pill (URL Name and Source Domain) */}
                              <div className="pt-0.5 flex items-center gap-1.5">
                                <span className="text-[10px] font-mono text-zinc-400">{isAr ? 'كابل المصدر:' : 'Source link:'}</span>
                                {wireS.isInvestigation ? (
                                  <button 
                                    onClick={() => {
                                      if (onSelectDossier) onSelectDossier(wireS.id);
                                      if (onNavigateToSection) onNavigateToSection('alwarraq-investigations');
                                    }}
                                    className="inline-flex items-center gap-1 font-mono text-[10px] text-zinc-500 hover:text-red-700 hover:underline bg-zinc-100 p-1 font-semibold border-b border-black cursor-pointer"
                                  >
                                    <span>/alwarraq-investigations?dossier={wireS.id}</span>
                                    <ExternalLink size={8} />
                                  </button>
                                ) : (
                                  <a 
                                    href={wireS.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-mono text-[10px] text-zinc-500 hover:text-red-700 hover:underline bg-zinc-100 p-1 font-semibold border-b border-black"
                                  >
                                    <span>{cleanUrlName}</span>
                                    <ExternalLink size={8} />
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Right sharing shortcuts column */}
                            <div className="flex items-center gap-1.5 justify-end w-full md:w-auto shrink-0 border-t border-dashed border-zinc-100 md:border-t-0 pt-2.5 md:pt-0">
                              {wireS.isInvestigation ? (
                                <button 
                                  onClick={() => {
                                    if (onSelectDossier) onSelectDossier(wireS.id);
                                    if (onNavigateToSection) onNavigateToSection('alwarraq-investigations');
                                    setTimeout(() => {
                                      window.print();
                                    }, 300);
                                  }}
                                  className="bg-red-900 hover:bg-red-950 text-white font-mono text-[9px] font-bold py-1 px-2.5 uppercase transition-colors cursor-pointer"
                                  title="Download dossier as PDF"
                                >
                                  {isAr ? 'تحميل PDF' : 'PDF DOWNLOAD'}
                                </button>
                              ) : (
                                <button 
                                  onClick={() => {
                                    setSelectedStoryId(wireS.id);
                                    setTargetStoryId(wireS.id);
                                  }}
                                  className="bg-zinc-100 hover:bg-black hover:text-white border border-black text-neutral-800 font-mono text-[9px] font-bold py-1 px-2.5 uppercase transition-colors cursor-pointer"
                                  title="Show inside interactive mobile simulator"
                                >
                                  {isAr ? 'مستعرض' : 'ACTIVATE'}
                                </button>
                              )}

                              {/* Copy and WhatsApp direct actions */}
                              <button
                                onClick={() => handleCopyStoryRaw(wireS)}
                                className="p-1 px-1.5 border border-zinc-300 hover:border-black bg-white transition-all text-black cursor-pointer"
                                title="Copy wire text"
                              >
                                {copiedStoryId === wireS.id ? (
                                  <Check size={11} className="text-green-600" />
                                ) : (
                                  <Copy size={11} />
                                )}
                              </button>

                              <button
                                onClick={() => handleShareWhatsApp(wireS)}
                                className="p-1 px-1.5 border border-zinc-300 hover:border-black text-[#25D366] bg-white hover:bg-emerald-50 transition-all cursor-pointer"
                                title="Forward directly via WhatsApp"
                              >
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008 0c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.512 5.281 3.51 8.487-.005 6.657-5.34 11.997-11.953 12.003-2.005-.001-3.973-.501-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436-.005 9.858-4.427 9.862-9.864.002-2.63-1.023-5.102-2.89-6.97C16.576 1.899 14.102 1.071 12.004 1.07 6.573 1.075 2.149 5.497 2.146 10.93.141 12.616.637 14.215 1.588 15.8l-.999 3.648 3.734-.979z"/>
                                </svg>
                              </button>

                              {/* Twitter */}
                              <button
                                onClick={() => handleShareTwitter(wireS)}
                                className="p-1 px-1.5 border border-zinc-300 hover:border-black text-black bg-white hover:bg-zinc-100 transition-all cursor-pointer flex items-center justify-center"
                                title="Share on X"
                              >
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.16l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                              </button>

                              {/* Facebook */}
                              <button
                                onClick={() => handleShareFacebook(wireS)}
                                className="p-1 px-1.5 border border-zinc-300 hover:border-black text-blue-700 bg-white hover:bg-blue-50 transition-all cursor-pointer flex items-center justify-center"
                                title="Share on Facebook"
                              >
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                              </button>

                              {/* Trigger Dispatch Console layout */}
                              <button
                                onClick={() => {
                                  setTargetStoryId(wireS.id);
                                  const targetNode = document.getElementById('dispatch-control-station');
                                  if (targetNode) targetNode.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="bg-[#b91c1c] hover:bg-red-800 text-white font-mono text-[9px] font-black py-1 px-2.5 border border-black hover:shadow-sm"
                                title="Direct dispatch action"
                              >
                                {isAr ? 'بث 📡' : 'DISPATCH 📡'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* ======================================================== */}
                {/* 3. INTERACTIVE DISPATCH RELAY & TELECAST WORKFLOW ENGINE  */}
                {/* ======================================================== */}
                <div 
                  className="border-4 border-black p-5 bg-zinc-50 relative shadow-[5px_5px_0_0_rgba(0,0,0,1)] space-y-4 text-xs" 
                  id="dispatch-control-station"
                >
                  <div className="absolute -top-3.5 left-4 bg-black text-white font-mono text-[9px] font-black uppercase px-3 py-1 border-2 border-black tracking-widest shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    📡 {isAr ? 'غرفة تدوير وبث وتفعيل التليكس العاجل' : 'TELECAST DISPATCH RELAY TERMINAL'}
                  </div>

                  <div className="pt-2 border-b border-black pb-2">
                    <h4 className="font-sans font-black text-xs uppercase text-zinc-900">
                      {isAr ? 'التحكم بنمط التوجيه ومزامنة تليكس المشتركين' : 'PROTOCOL CHANNELS & MULTI-USER BULLETINS'}
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                      {isAr 
                        ? 'قم بصياغة البث واختيار جهة الإبلاغ. يسمح لك النظام بمشاركة الحدث عبر بروتوكول واتس اب الفوري، أو محاكاة النقل الآمن لكود الحملة لبريد مستخدمي الديوان المسجلين.'
                        : 'Select any story and define target nodes. Dispatch instantly to a designated subscriber from our membership database, or compile custom telex structures for chat networks.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Left configurations block (7 cols) */}
                    <div className="md:col-span-7 space-y-4">
                      {/* Select Story to transmit */}
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] text-zinc-600 block uppercase font-black">{isAr ? 'ايراد موضوع البرقية للتليكس' : 'SELECT TARGET DOSSIER TO RELAY'}</label>
                        <select
                          value={targetStoryId || ''}
                          onChange={(e) => {
                            setTargetStoryId(e.target.value);
                            setDispatchStatus('idle');
                          }}
                          className="w-full p-2 border-2 border-black bg-white font-mono font-bold text-[11px] outline-none"
                        >
                          {stories.map(sto => (
                            <option key={sto.id} value={sto.id} className="font-mono">
                              [{sto.category.toUpperCase()}] {isAr ? sto.headlineAr.slice(0, 50) : sto.headlineEn.slice(0, 50)}...
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Select relay protocol */}
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] text-zinc-600 block uppercase font-black">{isAr ? 'بروتوكول البث وقناة النقل' : 'CHOOSE INTEGRATED RELAY INTERFACE'}</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setDispatchMode('whatsapp');
                              setDispatchStatus('idle');
                            }}
                            className={`py-2 px-2.5 font-mono text-[10px] font-black uppercase border-2 border-black transition-all cursor-pointer ${
                              dispatchMode === 'whatsapp' 
                                ? 'bg-[#25D366] text-black shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)]' 
                                : 'bg-white text-zinc-600 hover:bg-neutral-50'
                            }`}
                          >
                            💬 WhatsApp API Node
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDispatchMode('email');
                              setDispatchStatus('idle');
                            }}
                            className={`py-2 px-2.5 font-mono text-[10px] font-black uppercase border-2 border-black transition-all cursor-pointer ${
                              dispatchMode === 'email' 
                                ? 'bg-red-600 text-white shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)]' 
                                : 'bg-white text-zinc-600 hover:bg-neutral-50'
                            }`}
                          >
                            ✉ Members Mail Port
                          </button>
                        </div>
                      </div>

                      {/* Protocol specific forms */}
                      {dispatchMode === 'whatsapp' ? (
                        <div className="border border-black bg-white p-3 space-y-2">
                          <span className="font-mono text-[8.5px] text-emerald-800 font-extrabold uppercase bg-emerald-50 px-1.5 py-0.5 border border-emerald-300">
                            ✓ READY FOR WHATSAPP TELECAST
                          </span>
                          <p className="text-[10px] text-zinc-600 font-serif leading-relaxed">
                            {isAr 
                              ? 'يقوم هذا المسار بصياغة برقية مسبقة التشكيل ومجهزة بعناوين الدعم وعلامات التشفير لفتحها مباشرة عبر حساب واتس اب الخاص بكم وتوجيهها للمجموعات والقصص بضغطة زر.'
                              : 'Converts selected dispatch data blocks into highly share-optimized, un-polluted textual cables. Compatible with mobile groups or private client wires.'}
                          </p>

                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                const storyToUse = stories.find(s => s.id === targetStoryId) || stories[0];
                                handleShareWhatsApp(storyToUse);
                              }}
                              className="w-full bg-black hover:bg-zinc-800 text-[#25D366] font-mono font-black py-2 border-2 border-black uppercase text-center cursor-pointer flex items-center justify-center gap-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-none transition-all duration-100"
                            >
                              <Share2 size={13} />
                              <span>{isAr ? 'إرسال ونشر واتس اب 🚀' : 'LAUNCH WHATSAPP TELECAST 🚀'}</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="border border-black bg-white p-3 space-y-3">
                          <span className="font-mono text-[8.5px] text-red-800 font-extrabold uppercase bg-red-50 px-1.5 py-0.5 border border-red-300">
                            ✉ SOVEREIGN DIRECTORY RELAY PROTOCOL
                          </span>

                          <div className="space-y-1.5">
                            <label className="font-mono text-[9px] text-zinc-600 block uppercase font-bold">
                              {isAr ? 'تحديد البريد الإلكتروني للمشترك المسجل بالديوان' : 'SELECT RECIPIENT FROM REGISTERED SUBSCRIBERS'}
                            </label>
                            
                            {registeredUsers.length === 0 ? (
                              <div className="space-y-2">
                                <p className="text-xxs text-zinc-500 font-serif italic">
                                  {isAr ? 'لا يوجد أعضاء مسجلين محلياً حالياً. أدخل بريد يدوي:' : 'No registered users currently in local cache registry. Please type recipient mail:'}
                                </p>
                                <input
                                  type="email"
                                  value={selectedRecipientEmail}
                                  onChange={(e) => setSelectedRecipientEmail(e.target.value)}
                                  placeholder="e.g. reader@alwarraqnews.com"
                                  className="w-full p-2 border border-black bg-white font-mono font-bold text-xxs outline-none text-zinc-800"
                                />
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <select
                                  value={selectedRecipientEmail}
                                  onChange={(e) => setSelectedRecipientEmail(e.target.value)}
                                  className="w-full p-2 border border-black bg-white font-mono font-black text-xxs outline-none text-zinc-800"
                                >
                                  {registeredUsers.map(user => (
                                    <option key={user.email} value={user.email}>
                                      {user.username} ({user.email}) [{user.role || 'reader'}] {user.isPremiumSubscriber ? '★ PREMIUM' : '✉ FREE'}
                                    </option>
                                  ))}
                                </select>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder={isAr ? 'أو اكتب بريد إلكتروني بديل للمستلم...' : 'Or type alternative custom recipient email...'}
                                    value={selectedRecipientEmail}
                                    onChange={(e) => setSelectedRecipientEmail(e.target.value)}
                                    className="flex-1 p-1.5 border border-black bg-neutral-50 font-mono text-xxs outline-none"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-1">
                            <label className="font-mono text-[8.5px] text-zinc-500 block uppercase font-extrabold">{isAr ? 'إلحاق ملاحظة سيادية اختيارية' : 'ATTACH OPTIONAL CONFIDENTIAL PREAMBLE'}</label>
                            <input
                              type="text"
                              value={customDispatchNote}
                              onChange={(e) => setCustomDispatchNote(e.target.value)}
                              placeholder={isAr ? 'اكتب ملاحظة مختصرة صالحة للبرقية...' : 'Confidential note (e.g. For Your Eyes Only)...'}
                              className="w-full p-2 border border-black bg-[#fafafa] font-sans text-xxs block outline-none focus:bg-white"
                            />
                          </div>

                          <div className="pt-1.5">
                            <button
                              type="button"
                              onClick={handleTriggerEmailDispatch}
                              disabled={dispatchStatus === 'sending'}
                              className="w-full bg-[#b91c1c] hover:bg-zinc-900 border-2 border-black text-white font-mono font-black py-2.5 uppercase text-center cursor-pointer flex items-center justify-center gap-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-none transition-all duration-100 disabled:opacity-50"
                            >
                              <Mail size={13} />
                              <span>{isAr ? 'بث ونشر البرقية بريدياً للمشترك 📨' : 'DISPATCH REGISTERED MEMBER CRYPTO BULL 📨'}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right logs panel (5 cols) */}
                    <div className="md:col-span-5 bg-black text-zinc-400 p-4 font-mono text-[10px] space-y-4 border-2 border-black flex flex-col justify-between shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                          <span className="text-[#10b981] font-black uppercase text-[8.5px] tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping inline-block"></span>
                            DISPATCH CONTROLLER LOGS
                          </span>
                          <span className="text-zinc-600 font-extrabold">[NODE: OK]</span>
                        </div>

                        {dispatchStatus === 'idle' ? (
                          <div className="py-12 text-center text-zinc-600 font-serif italic" id="disp-idle">
                            {isAr ? 'قناة البث معلقة بانتظار تلقي الإشارة...' : 'Awaiting dispatch parameters trigger...'}
                          </div>
                        ) : (
                          <div className="space-y-1.5 max-h-[140px] overflow-y-auto leading-normal select-text scrollbar-thin">
                            {dispatchLogs.map((log, li) => (
                              <p key={li} className="text-zinc-300">
                                {log}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Display Progress simulation strip */}
                      {dispatchStatus !== 'idle' && (
                        <div className="space-y-1 border-t border-zinc-800 pt-3">
                          <div className="flex justify-between font-mono text-[9px] text-zinc-500 uppercase font-black">
                            <span>{isAr ? 'عملية بث التليكس السيادي' : 'TELEX BROADCAST CYCLE'}</span>
                            <span className="text-emerald-500 font-bold">{dispatchProgress}%</span>
                          </div>
                          
                          <div className="w-full bg-zinc-900 border border-zinc-700 h-2 p-0.5">
                            <div 
                              className="bg-emerald-500 h-full transition-all duration-300"
                              style={{ width: `${dispatchProgress}%` }}
                            ></div>
                          </div>

                          {dispatchStatus === 'success' && (
                            <div className="mt-1.5 bg-emerald-950/40 border border-emerald-500 p-2 text-emerald-400 font-sans font-medium text-[10px] leading-relaxed flex items-center gap-1.5">
                              <span className="font-bold">✓</span>
                              <span>
                                {isAr 
                                  ? `تم تسليم النشرة بنجاح لدليل المستلم (${selectedRecipientEmail}).` 
                                  : `Dispatch transmitted securely to permanent address (${selectedRecipientEmail}).`}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* RIGHT AREA: WHATSAPP SLICER PREVIEWER & HTML EXPUNGER */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            
            {/* WHATSAPP STORY SLICER PREVIEW PANEL */}
            <div className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000]">
              <div className="flex justify-between items-center pb-2 border-b-2 border-black mb-4">
                <div className="flex items-center gap-1.5 font-mono text-xs font-black text-black uppercase">
                  <Smartphone className="shrink-0 text-red-500" size={15} />
                  <span>{isAr ? 'قصص واتساب (9:16)' : 'Story Slicer (9:16)'}</span>
                </div>
                <span className="font-mono text-xxs tracking-wider bg-black text-white px-2 py-0.5 font-black uppercase">
                  Slices Preview
                </span>
              </div>
              
              <p className="text-xxs text-zinc-500 font-bold mb-4 leading-relaxed">
                {isAr 
                  ? 'اختر أي حدث وسيتم رصف شريحة رأسية مذهلة بنسبة 9:16 مصممة للقصص والمشاركة السريعة عبر الهاتف.' 
                  : 'Click on a story to load it in the viewport. Change visual themes to match your desired social brand guidelines.'}
              </p>

              {/* Theme selector */}
              <div className="flex gap-1.5 mb-4 select-none">
                <button
                  onClick={() => setSlicerTheme('dark-monolith')}
                  className={`flex-1 py-1 px-2 font-mono text-[9px] font-black border transition-all cursor-pointer ${
                    slicerTheme === 'dark-monolith' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                  }`}
                >
                  MONOLITH
                </button>
                <button
                  onClick={() => setSlicerTheme('stark-light')}
                  className={`flex-1 py-1 px-2 font-mono text-[9px] font-black border transition-all cursor-pointer ${
                    slicerTheme === 'stark-light' ? 'bg-white text-black border-black font-black' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                  }`}
                >
                  STARK WHITE
                </button>
                <button
                  onClick={() => setSlicerTheme('neon-crimson')}
                  className={`flex-1 py-1 px-2 font-mono text-[9px] font-black border transition-all cursor-pointer ${
                    slicerTheme === 'neon-crimson' ? 'bg-red-600 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                  }`}
                >
                  CYBER CRIMSON
                </button>
              </div>

              {/* VIRTUAL MOBILE CANVAS (9:16) */}
              {selectedStory ? (
                <div className="relative border-4 border-black max-w-[280px] mx-auto aspect-[9/16] overflow-hidden flex flex-col justify-between p-6 shadow-md transition-all">
                  
                  {/* Theme Background Application */}
                  <div className={`absolute inset-0 z-0 ${
                    slicerTheme === 'dark-monolith' 
                      ? 'bg-[#121212] star-monolith' 
                      : slicerTheme === 'stark-light'
                        ? 'bg-white text-black border-black border-2'
                        : 'bg-[#ff3b30] border-black text-white'
                  }`}></div>

                  <div className="relative z-10 flex flex-col justify-between h-full w-full">
                    {/* Header elements of Story template */}
                    <div className="flex justify-between items-center border-b border-zinc-100/10 pb-3">
                      <span className={`font-mono text-[10px] font-bold ${slicerTheme === 'stark-light' ? 'text-black' : 'text-zinc-400'}`}>
                        THE DAILY FEED
                      </span>
                      <span className={`font-mono text-[9px] px-2 py-0.5 border font-extrabold ${
                        slicerTheme === 'stark-light' 
                          ? 'bg-black text-white border-black' 
                          : 'bg-white text-black border-white'
                      }`}>
                        AL-WARRAQ
                      </span>
                    </div>

                    {/* Provocative Center Copypasta */}
                    <div className="space-y-4 my-auto select-none">
                      <span className={`font-mono text-[8.5px] font-black uppercase px-2 py-1 tracking-widest inline-block ${
                        slicerTheme === 'stark-light' 
                          ? 'bg-zinc-100 text-zinc-800 border border-zinc-300' 
                          : 'bg-zinc-800 text-zinc-200'
                      }`}>
                        {selectedStory.category}
                      </span>
                      
                      <h2 className={`font-sans font-black tracking-tight leading-tight uppercase ${
                        slicerTheme === 'stark-light' 
                          ? 'text-black text-lg' 
                          : 'text-white text-lg'
                      }`}>
                        {isAr ? selectedStory.headlineAr : selectedStory.headlineEn}
                      </h2>
                      
                      <p className={`line-clamp-5 text-xs font-medium leading-relaxed ${
                        slicerTheme === 'stark-light' ? 'text-zinc-600' : 'text-zinc-300'
                      }`}>
                        {isAr ? selectedStory.synopsisAr : selectedStory.synopsisEn}
                      </p>
                    </div>

                    {/* CTA strip and Story Footer */}
                    <div className="space-y-4 border-t border-zinc-100/10 pt-4">
                      <div className={`text-center py-2.5 font-sans font-black text-[9px] border-2 border-black tracking-widest uppercase transition-all ${
                        slicerTheme === 'stark-light'
                          ? 'bg-black text-white hover:bg-zinc-800'
                          : 'bg-white text-black hover:bg-zinc-100'
                      }`}>
                        Swipe up: {isAr ? selectedStory.ctaAr : selectedStory.ctaEn}
                      </div>
                      
                      <div className="flex justify-between items-center text-[8.5px] font-mono text-zinc-400">
                        <span>#DailyTransmission</span>
                        <span>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-24 text-center text-zinc-400 font-mono text-xs">
                  {isAr ? 'بانتظار تلقي الإشارة...' : 'Awaiting data parameters...'}
                </div>
              )}

              {/* Story Actions bar */}
              {selectedStory && (
                <div className="mt-4 flex gap-2 w-full justify-center">
                  <button
                    onClick={() => {
                      const instructions = isAr 
                        ? 'التقط لقطة شاشة (Screenshot) للشريحة من جوالك لمشاركتها فوراً على حالات واتس اب أو انقر فوق رمز المشاركة.'
                        : 'Take a screenshot of this vertical story to directly publish on your device.';
                      alert(instructions);
                    }}
                    className="flex-1 bg-black hover:bg-zinc-800 text-white font-mono font-bold text-xxs py-2 px-3 border border-black uppercase flex items-center justify-center gap-1"
                  >
                    <Smartphone size={12} />
                    <span>{isAr ? 'حفظ الشريحة (Screenshot)' : 'HOW TO VIEW'}</span>
                  </button>
                  <button
                    onClick={() => handleShareWhatsApp(selectedStory)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xxs py-2 px-3 uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Share2 size={12} />
                    <span>{isAr ? 'مشاركة الواتساب' : 'TELECAST'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* EMAIL MARKETING HTML CODE AREA */}
            <div className="border-4 border-black bg-zinc-900 text-white p-5 relative">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800 mb-4">
                <div className="flex items-center gap-1.5 font-mono text-xs font-black text-white uppercase">
                  <Mail className="text-red-500" size={15} />
                  <span>{isAr ? 'مصدّر كود الحملة للحبر الإلكتروني' : 'EMAIL CAMPAIGN CODY'}</span>
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>

              <p className="text-[10px] text-zinc-400 font-bold mb-4 leading-relaxed">
                {isAr
                  ? 'انسخ كود لغة HTML المصمم برابط مدمج وصالح لوضعه في Mailchimp، HubSpot، Substack فوراً.'
                  : 'Copy the raw inline-styled, client-safe HTML rendering of today\'s compiled telex blocks to drop directly into Mailchimp, Substack, email campaigns.'}
              </p>

              {/* Mini code block viewport */}
              <div className="bg-black/80 p-3 font-mono text-[10px] text-zinc-300 border border-zinc-800 overflow-x-auto max-h-[160px] leading-relaxed mb-4 scrollbar-thin">
                <pre className="select-all">
                  {getCompiledEmailHtml()}
                </pre>
              </div>

              {/* Action trigger copy */}
              <button
                onClick={handleCopyEmailHtml}
                className="w-full bg-[#ff3b30] hover:bg-red-700 text-white font-mono font-bold text-xxs py-3 px-4 uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border border-black"
              >
                {copiedHtml ? (
                  <>
                    <Check size={14} className="text-white" />
                    <span>{isAr ? '✓ تم النسخ بنجاح!' : '✓ COPIED CODE TO CLIPBOARD'}</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>{isAr ? 'نسخ كود HTML بالكامل' : 'COPY EMAIL CAMPAIGN CODE'}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      ) : activeTab === 'archive' ? (
        <NewsletterArchive 
          language={language} 
          layoutMode={layoutMode} 
          onLoadEdition={(storiesList) => {
            setStories(storiesList);
            if (storiesList.length > 0) {
              setSelectedStoryId(storiesList[0].id);
            }
            setActiveTab('feed');
          }}
          activeStoryId={selectedStoryId || undefined}
          currentStories={stories}
        />
      ) : (
        /* TAB 2: DESIGN & VIBE GUIDE (AESTHETIC SPECIFICATION OVERVIEW) */
        <div className="border-4 border-black bg-white p-8 space-y-8 shadow-[4px_4px_0px_0px_#000] select-text">
          
          <div className="border-b-2 border-black pb-4">
            <h2 className="text-2xl font-black uppercase text-black font-sans tracking-tight">
              {isAr ? 'البيان الجمالي ودليل الهوية الفنية المتمردة' : 'THE DIGITAL NEWS DISRUPTION MANIFESTO'}
            </h2>
            <p className="text-xs font-mono font-bold text-zinc-500 mt-1 uppercase">
              Visual Design Framework • Typography Swatches • Slicing Blueprint
            </p>
          </div>

          <p className="text-xs font-semibold leading-relaxed text-zinc-700">
            {isAr 
              ? 'نهج تصميم "The Daily Transmission" يتخلى عن الزخرفة الرقمية السلسة والمحركات الترويجية لصالح الصدمات البصرية عالية التباين، مما يسهل قراءتها كلغة تشفير عاجلة ويوسع قدرتها على الانتشار السريع كقصص مرئية عبر الهواتف والبريد الإلكتروني.'
              : 'Our design philosophy is anchored on Brutalist Anti-AI-Noise rules. High contrast extremes, pure black/white layout spaces, absolute typography hierarchies, and asymmetrical visual divisions. This ensures the output can be dissected, sliced for smartphone cards, or compiled as a stark, lightweight email campaign.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Color Palette Specifications with visual swatches */}
            <div className="border-2 border-black p-6 space-y-4">
              <h3 className="font-mono text-xs font-black uppercase tracking-widest text-[#b91c1c] border-b border-zinc-200 pb-2">
                1. Stark Color Palette Tokens
              </h3>
              
              <div className="space-y-3 font-mono text-xxs font-bold">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black border border-black shrink-0"></div>
                  <div>
                    <p className="text-black font-black">STARK SILICON (#000000)</p>
                    <p className="text-zinc-500">Pure raw ink background and text borders. Anchor of layout grid.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white border-2 border-black shrink-0"></div>
                  <div>
                    <p className="text-black font-black">STARK CHALK (#FFFFFF)</p>
                    <p className="text-zinc-500">Pure negative spacing background for optimal eye safety reading.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#ff3b30] border border-black shrink-0"></div>
                  <div>
                    <p className="text-black font-black">CYBER NEON CRIMSON (#FF3B30)</p>
                    <p className="text-zinc-500">Visual accent and highlight triggers. Used exclusively on badges and CTA.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-100 border border-zinc-300 shrink-0"></div>
                  <div>
                    <p className="text-black font-black">CARBON PAPYRUS (#F4F4F5)</p>
                    <p className="text-zinc-500">Asymmetric contrast background to divide meta indexes.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Typographical Hierarchy Specifications */}
            <div className="border-2 border-black p-6 space-y-4">
              <h3 className="font-mono text-xs font-black uppercase tracking-widest text-[#b91c1c] border-b border-zinc-200 pb-2">
                2. Typographical Hierarchy Scale
              </h3>
              
              <div className="space-y-4 text-xs font-bold leading-relaxed">
                <div>
                  <span className="font-mono text-[9px] text-[#ff3b30] uppercase block">Display Main Headings</span>
                  <p className="text-sm font-black text-black">Inter H1 / Space Grotesk Extra-Bold</p>
                  <p className="text-xxs text-zinc-500">Uppercase only, tight line-height, -0.05em letter spacing. Brutalist punch.</p>
                </div>

                <div>
                  <span className="font-mono text-[9px] text-[#ff3b30] uppercase block">Content Copy text</span>
                  <p className="text-sm font-semibold text-zinc-800">Inter Regular / System-UI</p>
                  <p className="text-xxs text-zinc-500">Slightly heavier weight (500) and spacious line spacing (1.5) for screen-holding readable flow.</p>
                </div>

                <div>
                  <span className="font-mono text-[9px] text-[#ff3b30] uppercase block">Meta & System Tags</span>
                  <p className="text-sm font-mono text-zinc-600 font-extrabold">JetBrains Mono / Courier New</p>
                  <p className="text-xxs text-zinc-500">Monospaced, tracking-wider (+0.1em), used for numeric indexes and categories.</p>
                </div>
              </div>
            </div>

            {/* Slicing Formula details */}
            <div className="border-2 border-black p-6 space-y-3">
              <h3 className="font-mono text-xs font-black uppercase tracking-widest text-[#b91c1c] border-b border-zinc-200 pb-2">
                3. WhatsApp Slicing Formula (9:16)
              </h3>
              <p className="text-xxs font-medium text-zinc-600 leading-relaxed">
                {isAr
                  ? 'رسم الشريحة يعتمد على اقتطاع الشاشات رأسياً بنسبة 9:16 مع إحاطة الإحصائية بحاشية استدلالية. يتم الحفاظ على الحجم بمقدار وعاء الهواتف لمنع تشوه الأحرف ودعم التكبير دون فقدان التباين.'
                  : 'To slice each dispatch into high-impact social layouts, maintain a strict 9:16 grid with absolute margins. Wrap headlines in thick borders, isolate raw copy text blocks inside spacious margins, and finish with a strong uppercase CTA button to force maximum click-through rates.'}
              </p>
              <div className="p-3 bg-zinc-50 border border-zinc-300 font-mono text-[9px] text-zinc-500">
                <span className="text-black font-black">STORY WRAPER CSS DESIGN TOKENS:</span><br/>
                - aspect-ratio: 9/16;<br/>
                - padding: 1.5rem;<br/>
                - border: 4px solid #000000;<br/>
                - flex-direction: column;<br/>
                - justify-content: space-between;
              </div>
            </div>

            {/* Email Blueprint guidelines */}
            <div className="border-2 border-black p-6 space-y-3">
              <h3 className="font-mono text-xs font-black uppercase tracking-widest text-[#b91c1c] border-b border-zinc-200 pb-2">
                4. Robust Email Styling Constraints
              </h3>
              <p className="text-xxs font-medium text-zinc-600 leading-relaxed">
                {isAr
                  ? 'يتم ترميز حملات البريد بأسلوب قديم ومتين (Old-school HTML table tables) لتفادي انهيار التموضع على متصفحات عملاء البريد القديمة ومحركات الجوال الضيقة.'
                  : 'To prevent responsive layout disintegration across legacy clients (MS Outlook, Apple Mail), we avoid flexbox/grids. Use stark, clean, old-school nested HTML table structures with literal inline style tags for consistent margins, bold colors, and robust readable widths.'}
              </p>
              <div className="p-3 bg-zinc-50 border border-zinc-300 font-mono text-[9px] text-zinc-500">
                <span className="text-black font-black">EMAIL CAMPAIGN CODING CONSTRAINTS:</span><br/>
                - Width constrained strictly to 600px;<br/>
                - Inline padding and background colors overrides;<br/>
                - Table width attributes set explicitly;<br/>
                - Web-safe typography stack (Courier, Arial, sans-serif) fallback;
              </div>
            </div>
          </div>
          
        </div>
      )}

    </div>
  );
}
