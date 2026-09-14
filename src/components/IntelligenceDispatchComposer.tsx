import React, { useState, useMemo, useEffect } from 'react';
import { 
  Article, 
  NavigationTab, 
  IntelligenceDispatch, 
  IntelligenceDispatchSection, 
  IntelligenceDispatchStoryOverride 
} from '../types';
import { 
  getStoredDispatches, 
  saveNewOrUpdatedDispatch 
} from '../data/intelligenceDispatches';
import AlWarraqLogo from './AlWarraqLogo';
import { 
  Radio, 
  CheckSquare, 
  Square, 
  Star, 
  Sparkles, 
  Send, 
  Eye, 
  FileText, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink, 
  RefreshCw, 
  Sliders, 
  Layers, 
  Calendar, 
  ShieldAlert, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Archive, 
  Globe, 
  Volume2, 
  BookOpen, 
  Download,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Flame,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';

interface IntelligenceDispatchComposerProps {
  language: 'ar' | 'en';
  articles: Article[];
  categories: NavigationTab[];
  subscribers: string[];
  setSubscribers?: React.Dispatch<React.SetStateAction<string[]>>;
  onNavigateToPublicDispatch?: () => void;
  onSelectArticle?: (article: Article) => void;
}

export default function IntelligenceDispatchComposer({
  language,
  articles,
  categories,
  subscribers,
  setSubscribers,
  onNavigateToPublicDispatch,
  onSelectArticle
}: IntelligenceDispatchComposerProps) {
  const isAr = language === 'ar';

  // Active composer sub-view: 'composer' (section selector & metadata) vs 'live-preview' (Arabic newsletter dispatch style) vs 'history' (manage all editions)
  const [activeView, setActiveView] = useState<'composer' | 'live-preview' | 'history'>('composer');

  // Stored dispatches list
  const [allDispatches, setAllDispatches] = useState<IntelligenceDispatch[]>(() => getStoredDispatches());

  // Current working dispatch state
  const [currentIssueNum, setCurrentIssueNum] = useState<number>(() => {
    const latest = allDispatches[0];
    return latest ? latest.issueNumber + 1 : 145;
  });

  const [dateStrAr, setDateStrAr] = useState<string>('الاثنين، ١٤ أيلول / سبتمبر ٢٠٢٦');
  const [dateStrEn, setDateStrEn] = useState<string>('Monday, September 14, 2026');
  const [classificationAr, setClassificationAr] = useState<string>('وثيقة تداول سيادي واقتصادي - نشرة ديوان التحرير اليومية');
  const [classificationEn, setClassificationEn] = useState<string>('SOVEREIGN INTELLIGENCE WIRE - DAILY DESK CIRCULATION');

  const [titleAr, setTitleAr] = useState<string>('برقية الورّاق الاستخباراتية: إعادة تشكيل خطوط الترانزيت واحتواء الصدمات النقدية');
  const [titleEn, setTitleEn] = useState<string>('Al-Warraq Intelligence Dispatch: Transit Corridors Realignment & Monetary Shock Absorption');

  const [executiveBriefingAr, setExecutiveBriefingAr] = useState<string>(
`تفتح غرفة الرصد الاستخباراتي في "الورّاق" نافذة التحليل اليومي على جملة من التحولات الجيواقتصادية المتسارعة؛ يتقدمها تسارع القوى الإقليمية نحو إنشاء ممرات لوجستية وبدائل خطوط أنابيب النفط والغاز لتجاوز مخاطر الاختناق الملاحي، بالتوازي مع التطورات المصرفية والنقدية الحساسة في بيروت، حيث تعيد الصناديق السيادية والدولية تسعير ديون لبنان واليوروبوندز في ظل ترقب تشريعات إعادة هيكلة القطاع المالي ونتائج تدقيق الالتزام بمعايير مكافحة غسل الأموال (FATF).

نضع بين أيدي صناع القرار والمتعاملين في الأسواق هذه الخلاصة المركزة عبر القطاعات الحيوية، موثقة بالبيانات والتحقيقات الميدانية.`
  );
  const [executiveBriefingEn, setExecutiveBriefingEn] = useState<string>(
`The Intelligence Desk at Al-Warraq opens today's daily briefing on rapid geo-economic realignments: foremost regional infrastructure pivots establishing alternative crude and gas bypass pipelines to hedge chokepoint vulnerabilities, coupled with crucial sovereign debt repricing on Lebanese Eurobonds amid fiscal restructuring talks.`
  );

  const [leadArticleId, setLeadArticleId] = useState<string>('us-iran-mou-regional-recoil-bypass-2026');

  // Selected article IDs mapped by section ID: { [sectionId: string]: string[] }
  const [selectedArticlesBySection, setSelectedArticlesBySection] = useState<Record<string, string[]>>(() => {
    // Initial preselection based on the latest dispatch if available
    const latest = allDispatches[0];
    if (latest && latest.sections) {
      const map: Record<string, string[]> = {};
      latest.sections.forEach(s => {
        map[s.sectionId] = [...s.articleIds];
      });
      return map;
    }
    return {
      'war-room': ['us-iran-mou-regional-recoil-bypass-2026', 'red-sea-corridor-chokepoint-analysis-2026'],
      'lebanon': ['lebanon-syria-relations-2026', 'lebanon-cement-quarries-scandal-2026'],
      'markets': ['saudi-treasury-yields-curve-2026', 'gcc-ma-surge-investment-banking-2026'],
      'special-investigations': ['sp-solidere-2069-asset-forensics']
    };
  });

  // Story overrides (custom bullet note, pinned lead flag)
  const [storyOverrides, setStoryOverrides] = useState<Record<string, IntelligenceDispatchStoryOverride>>({
    'us-iran-mou-regional-recoil-bypass-2026': {
      articleId: 'us-iran-mou-regional-recoil-bypass-2026',
      isPinnedLead: true,
      customNotesAr: 'المحور الاستراتيجي الأبرز: مسارات الالتفاف اللوجستي ونقاط الالتقاء الجيوسياسية.'
    }
  });

  // 3 Strategic Key Takeaways
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>([
    'تسارع استثمارات الممرات اللوجستية البديلة في الخليج ومصر لتفادي توترات الممرات البحرية الحساسة.',
    'تذبذب أسعار سندات يوروبوندز لبنان حول مستوى ٢٢-٢٤ سنتاً مع استمرار الترقب لبرنامج صندوق النقد الدولي.',
    'تدفق رؤوس الأموال السيادية نحو قطاعات الذكاء الاصطناعي والحوسبة الفائقة في الرياض وأبوظبي.'
  ]);

  // Section search query & section accordion expansion state
  const [storySearchTerm, setStorySearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'war-room': true,
    'lebanon': true,
    'markets': true,
    'special-investigations': true
  });

  // Feedback states
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [publishSuccessMsg, setPublishSuccessMsg] = useState<string | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState(0);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Group all available articles by their section/category
  const sectionBuckets = useMemo(() => {
    // List of canonical sections to display in order
    const targetSectionIds = [
      { id: 'lebanon', titleAr: 'أخبار وقضايا لبنان والشرق الأدنى', titleEn: 'Lebanon & Levant Bureau' },
      { id: 'markets', titleAr: 'أسواق المال والسندات والسلع', titleEn: 'Sovereign Markets & Commodities' },
      { id: 'war-room', titleAr: 'غرفة الحرب والجيوبوليتيك الإقليمي', titleEn: 'War Room Intel & Geopolitics' },
      { id: 'special-investigations', titleAr: 'ملفات التحقيقات الاستقصائية الخاصة', titleEn: 'Special Investigative Dossiers' },
      { id: 'alwarraq-investigations', titleAr: 'بوابة التحقيقات الاستقصائية للورّاق', titleEn: 'Al-Warraq Investigations Portal' },
      { id: 'oil-energy', titleAr: 'أسواق النفط والطاقة والاحتياطيات', titleEn: 'Oil, Gas & Strategic Reserves' },
      { id: 'world-of-ai', titleAr: 'عالم الذكاء الاصطناعي والتقنية السيادية', titleEn: 'World of AI & Sovereign Tech' },
      { id: 'economy', titleAr: 'الاقتصاد الكلي والسياسات المالية', titleEn: 'Macro-Economy & Fiscal Policies' },
      { id: 'pulse-of-the-street', titleAr: 'نبض الشارع وثمن الصراع', titleEn: 'Pulse of the Street & Living Costs' },
      { id: 'arab-markets', titleAr: 'مؤشرات الأسواق والبورصات العربية', titleEn: 'Arab Markets Indicators' },
      { id: 'editor-desk', titleAr: 'من رئيس التحرير وأعمدة الرأي', titleEn: 'Editor-in-Chief Columns' },
      { id: 'exclusives', titleAr: 'انفرادات إعلامية وملفات سرية', titleEn: 'Exclusive Intel & Breakouts' },
      { id: 'telecom-internet', titleAr: 'الاتصالات والإنترنت وكوابل الأعماق', titleEn: 'Telecom & Subsea Cables' },
      { id: 'fifa-2026', titleAr: 'مونديال فيفا 2026', titleEn: 'FIFA 2026' }
    ];

    return targetSectionIds.map(sec => {
      const matchingArticles = articles.filter(art => {
        if (!art) return false;
        const inMain = art.category === sec.id;
        const inCategories = art.categories && art.categories.includes(sec.id);
        const inId = sec.id === 'special-investigations' && (art.id.startsWith('sp-') || art.category === 'investigations');
        return inMain || inCategories || inId;
      });

      // Search filter if provided
      const filteredArticles = matchingArticles.filter(art => {
        if (!storySearchTerm.trim()) return true;
        const term = storySearchTerm.toLowerCase();
        return (
          art.titleAr.toLowerCase().includes(term) ||
          art.titleEn.toLowerCase().includes(term) ||
          art.summaryAr.toLowerCase().includes(term)
        );
      });

      return {
        ...sec,
        allStories: matchingArticles,
        displayStories: filteredArticles
      };
    }).filter(sec => sec.allStories.length > 0);
  }, [articles, storySearchTerm]);

  // Total selected stories count across all sections
  const totalSelectedCount = useMemo(() => {
    let count = 0;
    const seen = new Set<string>();
    (Object.values(selectedArticlesBySection) as string[][]).forEach(ids => {
      ids.forEach(id => {
        if (!seen.has(id)) {
          seen.add(id);
          count++;
        }
      });
    });
    return count;
  }, [selectedArticlesBySection]);

  // Toggle selection of a story in a section
  const handleToggleStory = (sectionId: string, articleId: string) => {
    setSelectedArticlesBySection(prev => {
      const currentList = prev[sectionId] || [];
      const isAlreadySelected = currentList.includes(articleId);
      const updatedList = isAlreadySelected 
        ? currentList.filter(id => id !== articleId)
        : [...currentList, articleId];

      return {
        ...prev,
        [sectionId]: updatedList
      };
    });

    // If no lead article is set, automatically make the newly selected story the lead
    if (!leadArticleId) {
      setLeadArticleId(articleId);
    }
  };

  // Toggle select all in a section
  const handleToggleSelectAllSection = (sectionId: string, allStoryIds: string[]) => {
    setSelectedArticlesBySection(prev => {
      const currentList = prev[sectionId] || [];
      const allSelected = allStoryIds.every(id => currentList.includes(id));
      return {
        ...prev,
        [sectionId]: allSelected ? [] : [...allStoryIds]
      };
    });
  };

  // Set an article as the lead story
  const handleSetLeadStory = (articleId: string) => {
    setLeadArticleId(articleId);
    setStoryOverrides(prev => ({
      ...prev,
      [articleId]: {
        ...(prev[articleId] || { articleId }),
        isPinnedLead: true
      }
    }));
  };

  // Update custom editorial note for a story
  const handleUpdateStoryNote = (articleId: string, note: string) => {
    setStoryOverrides(prev => ({
      ...prev,
      [articleId]: {
        ...(prev[articleId] || { articleId }),
        customNotesAr: note
      }
    }));
  };

  // Build the compiled dispatch object
  const compiledDispatch: IntelligenceDispatch = useMemo(() => {
    const constructedSections: IntelligenceDispatchSection[] = [];

    sectionBuckets.forEach(sec => {
      const selectedIds = (selectedArticlesBySection[sec.id] || []).filter(id => 
        articles.some(a => a.id === id)
      );

      if (selectedIds.length > 0) {
        constructedSections.push({
          sectionId: sec.id,
          sectionTitleAr: sec.titleAr,
          sectionTitleEn: sec.titleEn,
          articleIds: selectedIds,
          storyOverrides: storyOverrides
        });
      }
    });

    return {
      id: `dispatch-issue-${currentIssueNum}`,
      issueNumber: currentIssueNum,
      dateStr: dateStrEn,
      dateStrAr: dateStrAr,
      timestamp: Date.now(),
      titleAr,
      titleEn,
      classificationAr,
      classificationEn,
      executiveBriefingAr,
      executiveBriefingEn,
      leadArticleId,
      sections: constructedSections,
      keyTakeaways: keyTakeaways.filter(k => k.trim().length > 0),
      readTimeMinutes: Math.max(4, Math.round(totalSelectedCount * 1.5)),
      authorAr: 'ديوان الرصد والتحليل الاستخباراتي - الورّاق',
      authorEn: 'Al-Warraq Intelligence Monitoring Bureau',
      status: 'published',
      views: 120,
      broadcastSentAt: new Date().toISOString(),
      subscriberCountAtBroadcast: subscribers.length
    };
  }, [
    currentIssueNum,
    dateStrEn,
    dateStrAr,
    titleAr,
    titleEn,
    classificationAr,
    classificationEn,
    executiveBriefingAr,
    executiveBriefingEn,
    leadArticleId,
    sectionBuckets,
    selectedArticlesBySection,
    storyOverrides,
    keyTakeaways,
    totalSelectedCount,
    subscribers.length,
    articles
  ]);

  // AI-Assisted Briefing Synthesis: Summarizes selected articles into executive editorial notes
  const handleAiSynthesizeBriefing = async () => {
    setIsAiGenerating(true);

    // Collect titles and summaries of selected stories
    const selectedArticles: Article[] = [];
    (Object.values(selectedArticlesBySection) as string[][]).forEach(ids => {
      ids.forEach(id => {
        const found = articles.find(a => a.id === id);
        if (found && !selectedArticles.some(sa => sa.id === found.id)) {
          selectedArticles.push(found);
        }
      });
    });

    if (selectedArticles.length === 0) {
      alert(isAr ? 'يرجى تحديد قصة خبرية واحدة على الأقل لتوليف النشرة.' : 'Please select at least one story first.');
      setIsAiGenerating(false);
      return;
    }

    try {
      const digestPrompt = `أنت رئيس التحرير وكبير المحللين الاستراتيجيين في صحيفة وموقع "الورّاق" السيادي.
إليك قائمة بالقصص الإخبارية والتحقيقات المختارة لبرقية البث الاستخباراتي اليومي (العدد ${currentIssueNum}):
${selectedArticles.map((a, i) => `${i + 1}. [${a.category}] ${a.titleAr} - ${a.summaryAr}`).join('\n')}

المطلوب:
1. صياغة عنوان استخباراتي عريض ومثير للاهتمام للبرقية اليومية (headlineAr).
2. صياغة موجز تنفيذي استخباراتي رصين (من فقرتين) بأسلوب ديوان التحرير السياسي والاقتصادي الراقي.
3. استخراج أهم 3 نقاط محورية واستراتيجية للمتعاملين وصناع القرار (keyTakeaways).

أجب بصيغة JSON حصراً بهذا المخطط:
{
  "titleAr": "عنوان البرقية",
  "executiveBriefingAr": "نص الموجز التنفيذي هنا...",
  "keyTakeaways": ["النقطة 1", "النقطة 2", "النقطة 3"]
}`;

      const res = await fetch('/api/workspace/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: digestPrompt,
          language: 'ar'
        })
      });

      if (res.ok) {
        const data = await res.json();
        let rawAnswer = data.response || data.text || '';
        // Extract JSON if wrapped in codeblocks
        const jsonMatch = rawAnswer.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.titleAr) setTitleAr(parsed.titleAr);
          if (parsed.executiveBriefingAr) setExecutiveBriefingAr(parsed.executiveBriefingAr);
          if (Array.isArray(parsed.keyTakeaways) && parsed.keyTakeaways.length > 0) {
            setKeyTakeaways(parsed.keyTakeaways);
          }
        } else {
          // Fallback if returned plain text
          setExecutiveBriefingAr(rawAnswer.slice(0, 500));
        }
      }
    } catch (err) {
      console.warn('AI Synthesis fallback:', err);
      // Smart local fallback synthesis
      const firstTitle = selectedArticles[0]?.titleAr || 'التحولات السيادية';
      setTitleAr(`برقية الورّاق الاستخباراتية: ${firstTitle.slice(0, 60)} وتوازنات السندات والأسواق`);
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Publish & Save dispatch to storage and archive
  const handlePublishDispatch = () => {
    if (totalSelectedCount === 0) {
      alert(isAr ? 'يرجى اختيار قصة واحدة على الأقل قبل النشر.' : 'Please select at least one story before publishing.');
      return;
    }

    const updatedDispatches = saveNewOrUpdatedDispatch(compiledDispatch);
    setAllDispatches(updatedDispatches);

    setPublishSuccessMsg(
      isAr 
        ? `✓ تم حفظ ونشر البرقية الاستخباراتية (العدد ${currentIssueNum}) بنجاح في الموقع والأرشيف!`
        : `✓ Intelligence Dispatch (Issue #${currentIssueNum}) published to live site & archive successfully!`
    );

    setTimeout(() => {
      setPublishSuccessMsg(null);
    }, 6000);
  };

  // Broadcast simulation to subscribers
  const handleBroadcastToSubscribers = () => {
    setIsBroadcasting(true);
    setBroadcastProgress(10);

    const interval = setInterval(() => {
      setBroadcastProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBroadcasting(false);
          // Save and publish on broadcast
          handlePublishDispatch();
          alert(
            isAr 
              ? `✓ اكتمل بث البرقية الاستخباراتية بنجاح إلى ${subscribers.length} مشتركاً في ديوان الورّاق!`
              : `✓ Dispatch broadcast successfully transmitted to ${subscribers.length} active subscribers!`
          );
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  // Generate WhatsApp formatted text for instant broadcast
  const handleCopyWhatsAppText = () => {
    let text = `🚨 *${compiledDispatch.titleAr}*\n`;
    text += `📡 *العدد ${compiledDispatch.issueNumber}* | ${compiledDispatch.dateStrAr}\n`;
    text += `🔒 _[${compiledDispatch.classificationAr}]_\n\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📌 *الموجز التنفيذي للتحرير:*\n${compiledDispatch.executiveBriefingAr}\n\n`;

    if (compiledDispatch.keyTakeaways.length > 0) {
      text += `🎯 *أبرز إشارات الرصد الاستخباري:*\n`;
      compiledDispatch.keyTakeaways.forEach(k => {
        text += `• ${k}\n`;
      });
      text += `\n`;
    }

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📑 *أبرز ملفات العدد حسب القطاعات:*\n\n`;

    compiledDispatch.sections.forEach(sec => {
      text += `*【 ${sec.sectionTitleAr} 】*\n`;
      sec.articleIds.forEach(id => {
        const art = articles.find(a => a.id === id);
        if (art) {
          const override = storyOverrides[id];
          const isLead = id === leadArticleId || override?.isPinnedLead;
          text += `${isLead ? '⭐ ' : '▸ '}*${override?.customHeadlineAr || art.titleAr}*\n`;
          text += `  ${override?.customNotesAr || art.summaryAr.slice(0, 140)}...\n`;
          text += `  🔗 https://alwarraqnews.com/?article=${art.id}\n\n`;
        }
      });
    });

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🌐 طالع النسخة الكاملة والتفاعلية: https://alwarraqnews.com/intelligence-dispatch\n`;
    text += `للانضمام إلى ديوان المشتركين: https://alwarraqnews.com/premium-pricing\n`;

    navigator.clipboard.writeText(text);
    setCopiedKey('whatsapp');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Generate responsive HTML email code
  const handleCopyHtmlCode = () => {
    const htmlTemplate = `<!-- AL-WARRAQ INTELLIGENCE DISPATCH HTML EMAIL -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;font-family:Tahoma,sans-serif;direction:rtl;">
  <tr>
    <td align="center" style="padding:20px 10px;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:2px solid #000000;box-shadow:4px 4px 0 #000000;">
        <tr>
          <td style="background:#000000;color:#ffffff;padding:12px 20px;text-align:right;">
            <div style="font-size:10px;font-family:monospace;letter-spacing:1px;color:#ef4444;font-weight:bold;">// AL-WARRAQ INTELLIGENCE WIRE //</div>
            <div style="font-size:18px;font-weight:900;margin-top:4px;">برقية البث الاستخباراتي اليومي</div>
            <div style="font-size:11px;color:#a1a1aa;margin-top:2px;">العدد ${compiledDispatch.issueNumber} • ${compiledDispatch.dateStrAr}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px;border-bottom:1px solid #e4e4e7;">
            <h1 style="font-size:20px;line-height:1.4;margin:0 0 12px 0;color:#000000;">${compiledDispatch.titleAr}</h1>
            <div style="background:#fef2f2;border-right:4px solid #dc2626;padding:12px 16px;font-size:13px;line-height:1.7;color:#18181b;">
              <strong>الموجز التنفيذي لديوان التحرير:</strong><br/>
              ${compiledDispatch.executiveBriefingAr.replace(/\n/g, '<br/>')}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px;">
            ${compiledDispatch.sections.map(sec => `
              <div style="margin-bottom:20px;">
                <h3 style="font-size:14px;background:#f4f4f5;padding:6px 10px;border:1px solid #000;margin:0 0 10px 0;font-weight:bold;">${sec.sectionTitleAr}</h3>
                ${sec.articleIds.map(id => {
                  const art = articles.find(a => a.id === id);
                  if (!art) return '';
                  return `
                    <div style="padding:10px;margin-bottom:10px;border:1px dashed #d4d4d8;background:#fafafa;">
                      <a href="https://alwarraqnews.com/?article=${art.id}" style="color:#b91c1c;font-weight:bold;font-size:14px;text-decoration:none;display:block;">${art.titleAr}</a>
                      <p style="font-size:12px;color:#3f3f46;margin:6px 0 0 0;line-height:1.5;">${art.summaryAr}</p>
                    </div>
                  `;
                }).join('')}
              </div>
            `).join('')}
          </td>
        </tr>
        <tr>
          <td style="background:#fafafa;border-top:2px solid #000000;padding:15px;text-align:center;font-size:11px;color:#71717a;">
            جريدة وموقع "الورّاق" السيادية • جميع الحقوق محفوظة © 2026<br/>
            <a href="https://alwarraqnews.com/intelligence-dispatch" style="color:#000000;font-weight:bold;">عرض في المتصفح</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

    navigator.clipboard.writeText(htmlTemplate);
    setCopiedKey('html');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Load a historical dispatch to edit
  const handleLoadPastDispatch = (disp: IntelligenceDispatch) => {
    setCurrentIssueNum(disp.issueNumber);
    setDateStrAr(disp.dateStrAr);
    setDateStrEn(disp.dateStr);
    setTitleAr(disp.titleAr);
    setTitleEn(disp.titleEn);
    setClassificationAr(disp.classificationAr);
    setClassificationEn(disp.classificationEn);
    setExecutiveBriefingAr(disp.executiveBriefingAr);
    setExecutiveBriefingEn(disp.executiveBriefingEn);
    setLeadArticleId(disp.leadArticleId || '');
    setKeyTakeaways(disp.keyTakeaways || []);

    const newSelected: Record<string, string[]> = {};
    const newOverrides: Record<string, IntelligenceDispatchStoryOverride> = {};

    disp.sections.forEach(sec => {
      newSelected[sec.sectionId] = [...sec.articleIds];
      if (sec.storyOverrides) {
        Object.assign(newOverrides, sec.storyOverrides);
      }
    });

    setSelectedArticlesBySection(newSelected);
    setStoryOverrides(newOverrides);
    setActiveView('composer');
  };

  // Reset to brand new dispatch issue
  const handleResetToNewIssue = () => {
    const nextNum = (allDispatches[0]?.issueNumber || 144) + 1;
    setCurrentIssueNum(nextNum);
    setTitleAr(isAr ? `برقية الورّاق الاستخباراتية: تطورات المشهد السيادي والمالي - العدد ${nextNum}` : `Al-Warraq Intelligence Dispatch: Issue #${nextNum}`);
    setSelectedArticlesBySection({});
    setStoryOverrides({});
    setPublishSuccessMsg(null);
  };

  return (
    <div className="space-y-6 text-right rtl:text-right ltr:text-left font-sans" id="intelligence-dispatch-composer">
      
      {/* 1. TOP CONTROL & NAVIGATION BAR */}
      <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-black pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] bg-red-700 text-white px-2 py-0.5 font-bold uppercase tracking-wider border border-black flex items-center gap-1.5 animate-pulse">
                <Radio size={11} />
                {isAr ? 'ديوان البث الاستخباراتي' : 'INTELLIGENCE BROADCAST DESK'}
              </span>
              <span className="font-mono text-[10px] bg-black text-amber-300 px-2 py-0.5 font-bold border border-black">
                {isAr ? `العدد #${currentIssueNum}` : `ISSUE #${currentIssueNum}`}
              </span>
              <span className="font-mono text-[10px] bg-zinc-100 text-zinc-800 px-2 py-0.5 font-bold border border-zinc-400">
                {totalSelectedCount} {isAr ? 'قصص مختارة' : 'stories selected'}
              </span>
            </div>
            <h2 className="font-sans font-black text-xl lg:text-2xl uppercase tracking-tight text-black flex items-center gap-2">
              <FileText className="text-red-700" size={22} />
              {isAr ? 'مؤلف برقيات النشرة الاستخباراتية اليومية' : 'Intelligence Broadcast Dispatch Composer'}
            </h2>
            <p className="text-xs text-zinc-600 mt-1">
              {isAr 
                ? 'إعداد وتنسيق النشرة والبرقية اليومية باختيار الأخبار والتحقيقات الموزعة قطاعياً، وبثها للمشتركين ونشرها في الموقع والأرشيف.'
                : 'Select stories across all editorial desks, compose executive briefings, preview Arabic newsletter styling, and publish live.'}
            </p>
          </div>

          {/* Action Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveView('composer')}
              className={`px-3.5 py-2 font-mono text-xs font-black uppercase flex items-center gap-1.5 border-2 transition-all cursor-pointer ${
                activeView === 'composer'
                  ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]'
                  : 'bg-white text-black border-black hover:bg-zinc-100'
              }`}
            >
              <Sliders size={13} />
              <span>{isAr ? 'اختيار وتأليف البرقية' : 'Compose & Select'}</span>
            </button>

            <button
              onClick={() => setActiveView('live-preview')}
              className={`px-3.5 py-2 font-mono text-xs font-black uppercase flex items-center gap-1.5 border-2 transition-all cursor-pointer ${
                activeView === 'live-preview'
                  ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]'
                  : 'bg-white text-black border-black hover:bg-zinc-100'
              }`}
            >
              <Eye size={13} />
              <span>{isAr ? 'معاينة نمط النشرة والتيلكس' : 'Newsletter Preview'}</span>
            </button>

            <button
              onClick={() => setActiveView('history')}
              className={`px-3.5 py-2 font-mono text-xs font-black uppercase flex items-center gap-1.5 border-2 transition-all cursor-pointer ${
                activeView === 'history'
                  ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]'
                  : 'bg-white text-black border-black hover:bg-zinc-100'
              }`}
            >
              <Archive size={13} />
              <span>{isAr ? 'أرشيف الأعداد' : 'Past Issues'}</span>
              <span className="font-mono text-[10px] bg-red-700 text-white px-1.5 py-0.2 rounded-full">{allDispatches.length}</span>
            </button>

            {onNavigateToPublicDispatch && (
              <button
                onClick={onNavigateToPublicDispatch}
                className="px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white font-mono text-xs font-black uppercase flex items-center gap-1.5 border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <ArrowUpRight size={14} />
                <span>{isAr ? 'فتح صفحة البرقية بالموقع' : 'View Online Page'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Feedback alert toast */}
        {publishSuccessMsg && (
          <div className="mt-4 p-3 bg-emerald-50 border-2 border-emerald-700 text-emerald-900 font-bold text-xs flex items-center justify-between animate-fade-in shadow-[2px_2px_0px_0px_rgba(4,120,87,1)]">
            <span className="flex items-center gap-2">
              <Check size={16} className="text-emerald-700" />
              {publishSuccessMsg}
            </span>
            {onNavigateToPublicDispatch && (
              <button
                onClick={onNavigateToPublicDispatch}
                className="px-3 py-1 bg-emerald-700 text-white text-[11px] font-mono font-bold hover:bg-emerald-800 transition-all cursor-pointer"
              >
                {isAr ? 'معاينة في الموقع الآن ←' : 'Open Live Page Now →'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* 2. COMPOSER WORKFLOW VIEW */}
      {activeView === 'composer' && (
        <div className="space-y-6">
          
          {/* A. DISPATCH METADATA & EXECUTIVE BRIEFING CARD */}
          <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-black pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-red-100 border border-red-700 text-red-800">
                  <ShieldAlert size={16} />
                </span>
                <div>
                  <h3 className="font-sans font-black text-sm uppercase text-black">
                    {isAr ? 'ترويسة ومحددات البرقية الاستخباراتية' : 'Dispatch Envelope & Classification Headers'}
                  </h3>
                  <p className="text-[11px] text-zinc-500">
                    {isAr ? 'حدد رقم العدد، تاريخ الصدور، تصنيف التداول، وديباجة ديوان التحرير.' : 'Configure the serial metadata, date string, classification mark, and editor-in-chief desk telegram.'}
                  </p>
                </div>
              </div>

              {/* AI Synthesize Button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAiSynthesizeBriefing}
                  disabled={isAiGenerating}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-amber-200 to-amber-100 hover:from-amber-300 hover:to-amber-200 text-black border-2 border-black font-mono font-black text-xs uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Sparkles size={13} className="text-red-700 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>
                    {isAiGenerating 
                      ? (isAr ? 'جاري التوليف بالذكاء...' : 'Synthesizing with Gemini...') 
                      : (isAr ? 'توليف الموجز والعنوان بالذكاء' : 'AI Synthesize Briefing')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleResetToNewIssue}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-black border border-black font-mono text-xs font-bold transition-all cursor-pointer"
                >
                  {isAr ? 'تصفير لعدد جديد' : 'New Draft'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
              {/* Issue Number */}
              <div className="md:col-span-3 space-y-1">
                <label className="font-mono text-[10px] font-black uppercase text-zinc-600 block">
                  {isAr ? 'رقم العدد (Issue #)' : 'Issue Number'}
                </label>
                <input
                  type="number"
                  value={currentIssueNum}
                  onChange={(e) => setCurrentIssueNum(parseInt(e.target.value) || 1)}
                  className="w-full p-2 border-2 border-black font-mono font-black text-sm bg-zinc-50"
                />
              </div>

              {/* Issue Date Arabic */}
              <div className="md:col-span-4 space-y-1">
                <label className="font-mono text-[10px] font-black uppercase text-zinc-600 block">
                  {isAr ? 'تاريخ الإصدار (عربي)' : 'Issue Date (Arabic)'}
                </label>
                <input
                  type="text"
                  value={dateStrAr}
                  onChange={(e) => setDateStrAr(e.target.value)}
                  placeholder="الاثنين، ١٤ أيلول / سبتمبر ٢٠٢٦"
                  className="w-full p-2 border-2 border-black font-sans font-bold text-xs bg-zinc-50"
                />
              </div>

              {/* Classification Stamp */}
              <div className="md:col-span-5 space-y-1">
                <label className="font-mono text-[10px] font-black uppercase text-zinc-600 block">
                  {isAr ? 'ختم ودرجة السرية والتداول' : 'Classification Security Stamp'}
                </label>
                <input
                  type="text"
                  value={classificationAr}
                  onChange={(e) => setClassificationAr(e.target.value)}
                  className="w-full p-2 border-2 border-black font-sans font-bold text-xs bg-zinc-50"
                />
              </div>

              {/* Main Headline */}
              <div className="md:col-span-12 space-y-1">
                <label className="font-mono text-[10px] font-black uppercase text-zinc-600 block">
                  {isAr ? 'العنوان الرئيسي للبرقية الاستخباراتية (Lead Wire Headline)' : 'Main Dispatch Headline'}
                </label>
                <input
                  type="text"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  placeholder="برقية الورّاق الاستخباراتية: عنوان عريض يبرز المحاور الأساسية..."
                  className="w-full p-2.5 border-2 border-black font-sans font-black text-sm md:text-base bg-white"
                />
              </div>

              {/* Executive Briefing Textarea */}
              <div className="md:col-span-12 space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-[10px] font-black uppercase text-zinc-600">
                    {isAr ? 'الموجز التنفيذي لغرفة التحرير (Executive Editorial Briefing)' : 'Executive Briefing Telegram'}
                  </label>
                  <span className="font-mono text-[10px] text-zinc-500">
                    {executiveBriefingAr.length} {isAr ? 'حرف' : 'chars'}
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={executiveBriefingAr}
                  onChange={(e) => setExecutiveBriefingAr(e.target.value)}
                  placeholder="موجز تحليلي رصين من فقرتين يربط المحاور الاقتصادية والجيوسياسية للعدد..."
                  className="w-full p-3 border-2 border-black font-serif text-sm leading-relaxed bg-white"
                />
              </div>

              {/* 3 Strategic Key Takeaways */}
              <div className="md:col-span-12 space-y-2 pt-2 border-t border-dashed border-zinc-300">
                <label className="font-mono text-[10px] font-black uppercase text-zinc-600 block">
                  {isAr ? 'إشارات الرصد الاستراتيجي المحورية (Key Signals / 3 Takeaways)' : 'Strategic Signals (3 Takeaways)'}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-black bg-black text-white px-2 py-1">
                        0{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={takeaway}
                        onChange={(e) => {
                          const updated = [...keyTakeaways];
                          updated[idx] = e.target.value;
                          setKeyTakeaways(updated);
                        }}
                        className="w-full p-2 border border-black text-xs bg-white font-medium"
                        placeholder={`إشارة رصد رقم ${idx + 1}...`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* B. STORIES GROUPED BY SECTIONS */}
          <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-black pb-3">
              <div>
                <h3 className="font-sans font-black text-sm uppercase text-black flex items-center gap-2">
                  <Layers className="text-red-700" size={16} />
                  {isAr ? 'اختيار وتنسيق الأخبار المجمعة حسب القطاعات' : 'Curate Stories Grouped by Section'}
                </h3>
                <p className="text-[11px] text-zinc-500">
                  {isAr 
                    ? 'اختر القصص التي تود إدراجها في البرقية، وحدد القصة الافتتاحية المميزة بنجمة.' 
                    : 'Toggle stories to include per section and star the lead featured story.'}
                </p>
              </div>

              {/* Search filter within stories */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute top-2.5 right-2.5 text-zinc-400" />
                <input
                  type="text"
                  value={storySearchTerm}
                  onChange={(e) => setStorySearchTerm(e.target.value)}
                  placeholder={isAr ? 'بحث في كافة الأخبار...' : 'Filter stories by title...'}
                  className="w-full pl-3 pr-8 py-1.5 text-xs border border-black bg-zinc-50"
                />
              </div>
            </div>

            {/* Sections Accordions */}
            <div className="space-y-4">
              {sectionBuckets.map((sec) => {
                const isExpanded = expandedSections[sec.id] ?? true;
                const selectedInSec = selectedArticlesBySection[sec.id] || [];
                const count = selectedInSec.length;

                return (
                  <div 
                    key={sec.id}
                    className="border-2 border-black bg-[#fafafa]"
                  >
                    {/* Section Header Strip */}
                    <div 
                      className="p-3 bg-zinc-100 border-b border-black flex flex-wrap items-center justify-between gap-2 cursor-pointer hover:bg-zinc-200 transition-colors"
                      onClick={() => {
                        setExpandedSections(prev => ({
                          ...prev,
                          [sec.id]: !isExpanded
                        }));
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-black bg-black text-white px-2 py-0.5 border border-black">
                          {sec.id.toUpperCase()}
                        </span>
                        <h4 className="font-sans font-black text-xs md:text-sm text-black">
                          {isAr ? sec.titleAr : sec.titleEn}
                        </h4>
                        <span className={`font-mono text-[10px] px-2 py-0.5 font-bold border ${
                          count > 0 
                            ? 'bg-red-700 text-white border-red-800' 
                            : 'bg-white text-zinc-600 border-zinc-300'
                        }`}>
                          {count} / {sec.allStories.length} {isAr ? 'مختارة' : 'selected'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleToggleSelectAllSection(sec.id, sec.allStories.map(s => s.id))}
                          className="font-mono text-[10px] font-bold px-2 py-1 bg-white hover:bg-zinc-100 text-black border border-black cursor-pointer"
                        >
                          {sec.allStories.every(s => selectedInSec.includes(s.id))
                            ? (isAr ? 'إلغاء تحديد الكل' : 'Deselect All')
                            : (isAr ? 'تحديد كافة قصص القسم' : 'Select All')}
                        </button>

                        <button
                          type="button"
                          onClick={() => setExpandedSections(prev => ({ ...prev, [sec.id]: !isExpanded }))}
                          className="p-1 hover:bg-zinc-300 rounded"
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Section Stories Grid */}
                    {isExpanded && (
                      <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {sec.displayStories.length === 0 ? (
                          <div className="col-span-full py-4 text-center text-xs text-zinc-400 font-mono">
                            {isAr ? 'لا توجد أخبار تطابق البحث في هذا القسم.' : 'No stories matching search filter.'}
                          </div>
                        ) : (
                          sec.displayStories.map(story => {
                            const isSelected = selectedInSec.includes(story.id);
                            const isLead = story.id === leadArticleId || storyOverrides[story.id]?.isPinnedLead;
                            const override = storyOverrides[story.id];

                            return (
                              <div
                                key={story.id}
                                className={`p-3 border-2 transition-all flex flex-col justify-between ${
                                  isSelected 
                                    ? isLead 
                                      ? 'border-red-700 bg-red-50/50 shadow-[2px_2px_0px_0px_rgba(185,28,28,1)]' 
                                      : 'border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                    : 'border-zinc-300 bg-white/70 hover:border-zinc-400 opacity-75'
                                }`}
                              >
                                <div>
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    {/* Selection Toggle Checkbox */}
                                    <button
                                      type="button"
                                      onClick={() => handleToggleStory(sec.id, story.id)}
                                      className="flex items-center gap-2 text-right rtl:text-right cursor-pointer"
                                    >
                                      {isSelected ? (
                                        <CheckSquare className="text-red-700 shrink-0" size={18} />
                                      ) : (
                                        <Square className="text-zinc-400 shrink-0" size={18} />
                                      )}
                                      <span className="font-mono text-[9px] font-bold uppercase text-zinc-500">
                                        ID: {story.id.slice(0, 18)}...
                                      </span>
                                    </button>

                                    {/* Set as Lead Button */}
                                    {isSelected && (
                                      <button
                                        type="button"
                                        onClick={() => handleSetLeadStory(story.id)}
                                        title={isAr ? 'تعيين كخبر افتتاحي رئيسي للبرقية' : 'Set as Lead Story'}
                                        className={`px-2 py-0.5 text-[10px] font-mono font-bold flex items-center gap-1 border cursor-pointer ${
                                          isLead 
                                            ? 'bg-amber-400 text-black border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' 
                                            : 'bg-zinc-100 hover:bg-amber-100 text-zinc-600 border-zinc-300'
                                        }`}
                                      >
                                        <Star size={11} className={isLead ? 'fill-black' : ''} />
                                        <span>{isLead ? (isAr ? 'الخبر الرئيسي' : 'LEAD STORY') : (isAr ? 'اجعله رئيسياً' : 'Make Lead')}</span>
                                      </button>
                                    )}
                                  </div>

                                  {/* Story Headline */}
                                  <h5 className="font-sans font-black text-xs md:text-sm text-black leading-snug mb-1">
                                    {isAr ? story.titleAr : story.titleEn}
                                  </h5>

                                  {/* Excerpt */}
                                  <p className="text-[11px] text-zinc-600 line-clamp-2 leading-relaxed mb-2">
                                    {isAr ? story.summaryAr : story.summaryEn}
                                  </p>
                                </div>

                                {/* Custom Editorial Bullet Note on selection */}
                                {isSelected && (
                                  <div className="pt-2 border-t border-dashed border-zinc-200 mt-2 space-y-1">
                                    <label className="font-mono text-[9px] text-zinc-500 font-bold block">
                                      {isAr ? 'إشارة تحريرية مخصصة للبرقية (اختياري):' : 'Custom Dispatch Note:'}
                                    </label>
                                    <input
                                      type="text"
                                      value={override?.customNotesAr || ''}
                                      onChange={(e) => handleUpdateStoryNote(story.id, e.target.value)}
                                      placeholder={isAr ? 'ملاحظة موجزة تظهر تحت الخبر في النشرة...' : 'Editorial footnote...'}
                                      className="w-full text-[11px] p-1.5 border border-zinc-350 bg-amber-50/50 font-medium"
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* C. BOTTOM STICKY ACTION BAR */}
          <div className="sticky bottom-4 z-20 bg-black text-white p-4 border-2 border-white shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-black bg-red-700 px-2.5 py-1 text-white uppercase tracking-wider">
                {isAr ? `العدد #${currentIssueNum}` : `ISSUE #${currentIssueNum}`}
              </span>
              <span className="text-xs font-bold text-zinc-300">
                {totalSelectedCount} {isAr ? 'قصص محددة للبرقية عبر' : 'stories selected across'} {compiledDispatch.sections.length} {isAr ? 'قطاعات' : 'sections'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveView('live-preview')}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs font-black uppercase flex items-center gap-1.5 border border-zinc-500 cursor-pointer"
              >
                <Eye size={13} />
                <span>{isAr ? 'معاينة النشرة' : 'Preview Layout'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyWhatsAppText}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs font-black uppercase flex items-center gap-1.5 border border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {copiedKey === 'whatsapp' ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedKey === 'whatsapp' ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ نص الواتساب' : 'Copy WhatsApp')}</span>
              </button>

              <button
                type="button"
                onClick={handlePublishDispatch}
                className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white font-mono text-xs font-black uppercase flex items-center gap-1.5 border-2 border-white cursor-pointer shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)]"
              >
                <Send size={13} />
                <span>{isAr ? 'حفظ ونشر البرقية بالموقع والأرشيف' : 'Publish to Live Site'}</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 3. ARABIC NEWSLETTER STYLE LIVE PREVIEW */}
      {activeView === 'live-preview' && (
        <div className="space-y-6">
          
          {/* Action Toolbar on Top of Preview */}
          <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-black text-white px-2.5 py-1 font-black uppercase">
                {isAr ? 'نمط النشرة والتيلكس' : 'ARABIC NEWSLETTER TELEX STYLE'}
              </span>
              <span className="text-xs text-zinc-600">
                {isAr ? 'المعاينة المطابقة لشاشات المشتركين ومواقع التوزيع.' : 'Exact layout rendered for subscribers and live online dispatch reader.'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyWhatsAppText}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs font-bold flex items-center gap-1.5 border border-black cursor-pointer"
              >
                {copiedKey === 'whatsapp' ? <Check size={12} /> : <Share2 size={12} />}
                <span>{copiedKey === 'whatsapp' ? (isAr ? 'تم نسخ برقية الواتساب!' : 'Copied!') : (isAr ? 'نسخ للواتساب' : 'Copy WhatsApp Text')}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyHtmlCode}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-black text-white font-mono text-xs font-bold flex items-center gap-1.5 border border-black cursor-pointer"
              >
                {copiedKey === 'html' ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedKey === 'html' ? (isAr ? 'تم نسخ HTML!' : 'Copied!') : (isAr ? 'نسخ كود HTML للبريد' : 'Copy HTML Email')}</span>
              </button>

              <button
                type="button"
                onClick={handleBroadcastToSubscribers}
                disabled={isBroadcasting}
                className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white font-mono text-xs font-black uppercase flex items-center gap-1.5 border border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
              >
                <Radio size={12} className={isBroadcasting ? 'animate-pulse' : ''} />
                <span>
                  {isBroadcasting 
                    ? (isAr ? `جاري البث (${broadcastProgress}%)...` : `Broadcasting...`) 
                    : (isAr ? `بث مباشر للمشتركين (${subscribers.length})` : `Broadcast to ${subscribers.length} Subscribers`)}
                </span>
              </button>

              <button
                type="button"
                onClick={handlePublishDispatch}
                className="px-4 py-1.5 bg-black text-white hover:bg-zinc-800 font-mono text-xs font-black uppercase border border-black cursor-pointer"
              >
                {isAr ? 'اعتماد ونشر البرقية' : 'Publish Dispatch'}
              </button>
            </div>
          </div>

          {/* Broadcaster Progress Meter */}
          {isBroadcasting && (
            <div className="bg-black text-white p-3 border-2 border-red-700 space-y-1">
              <div className="flex justify-between items-baseline font-mono text-xs font-bold">
                <span className="text-red-400 animate-pulse">{isAr ? 'بث الإشارات المغناطيسية لمشتركي الورّاق...' : 'TRANSMITTING VIA ENCRYPTED WIRE...'}</span>
                <span>{broadcastProgress}%</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 border border-zinc-700 relative">
                <div className="bg-red-600 h-full transition-all duration-300" style={{ width: `${broadcastProgress}%` }} />
              </div>
            </div>
          )}

          {/* THE ARABIC NEWSLETTER BROADCAST CANVAS */}
          <div className="max-w-4xl mx-auto bg-[#fefefc] border-2 border-zinc-900 p-6 md:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.06)] text-black">
            
            {/* Masthead Header */}
            <div className="border-b-2 border-black pb-6 text-center space-y-3">
              <div className="flex justify-between items-center font-mono text-[10px] md:text-xs text-zinc-500 uppercase border-b border-zinc-300 pb-2 mb-3">
                <span className="font-bold">{compiledDispatch.classificationAr}</span>
                <span className="text-zinc-400">ISSN 2958-824X</span>
                <span>{compiledDispatch.dateStr}</span>
              </div>

              {/* Al-Warraq Logo Seal */}
              <div className="flex flex-col items-center justify-center pt-1 pb-2">
                <AlWarraqLogo size="md" variant="black" showText={false} />
                <span className="font-mono text-[10px] tracking-[0.2em] text-red-700 font-black uppercase mt-2 block">
                  {isAr ? 'ديوان الرصد والاستخبارات الاقتصادية والجيوسياسية' : 'SOVEREIGN INTELLIGENCE DESK'}
                </span>
                <h2 className="font-serif font-black text-2xl md:text-3xl text-black">
                  {isAr ? 'نشرة الورّاق الاستخباراتية' : 'Al-Warraq Intelligence Dispatch'}
                </h2>
              </div>

              <h1 className="font-serif font-black text-xl md:text-2xl text-zinc-900 leading-tight">
                {compiledDispatch.titleAr}
              </h1>

              <div className="border-y border-zinc-300 py-2 flex flex-wrap justify-center items-center gap-3 font-mono text-xs text-zinc-700">
                <span className="font-black bg-black text-amber-300 px-2 py-0.5">العدد #{compiledDispatch.issueNumber}</span>
                <span>•</span>
                <span className="font-bold">{compiledDispatch.dateStrAr}</span>
                <span>•</span>
                <span>زمن القراءة: {compiledDispatch.readTimeMinutes} دقائق</span>
                <span>•</span>
                <span className="bg-zinc-100 text-zinc-800 px-2 py-0.5 border border-zinc-300 font-bold">
                  {totalSelectedCount} ملفات استراتيجية
                </span>
              </div>
            </div>

            {/* Executive Editorial Briefing Card */}
            <div className="my-6 p-5 md:p-6 bg-red-50/70 border-2 border-red-800 shadow-[4px_4px_0px_0px_rgba(185,28,28,1)]">
              <div className="flex items-center gap-2 mb-3 border-b border-red-800/40 pb-2">
                <span className="p-1 bg-red-800 text-white font-mono text-[10px] font-black uppercase">
                  CONFIDENTIAL
                </span>
                <h3 className="font-sans font-black text-sm md:text-base text-red-950 uppercase">
                  {isAr ? 'الموجز التنفيذي وديوان التحرير الاستخباراتي' : 'Executive Editorial Telegram'}
                </h3>
              </div>
              <p className="font-serif text-sm md:text-base text-zinc-900 leading-relaxed whitespace-pre-line">
                {compiledDispatch.executiveBriefingAr}
              </p>
              <div className="mt-4 pt-3 border-t border-red-800/30 flex justify-between items-center text-xs font-mono text-red-900">
                <span className="font-bold">{compiledDispatch.authorAr}</span>
                <span className="italic">BEIRUT • LEVANT BUREAU</span>
              </div>
            </div>

            {/* Strategic Signals / Takeaways */}
            {compiledDispatch.keyTakeaways.length > 0 && (
              <div className="my-6 p-4 bg-zinc-100 border-2 border-black">
                <div className="font-mono text-xs font-black uppercase text-black mb-3 flex items-center gap-2">
                  <Flame size={14} className="text-red-700" />
                  <span>{isAr ? 'إشارات الرصد الاستراتيجي للمتعاملين في الأسواق' : 'Strategic Radar Signals'}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {compiledDispatch.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="p-2.5 bg-white border border-black font-sans text-xs font-semibold leading-relaxed">
                      <span className="font-mono text-[10px] font-black bg-black text-white px-1.5 py-0.5 ml-1.5 rtl:ml-1.5 ltr:mr-1.5">
                        0{idx + 1}
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grouped Sections Content */}
            <div className="space-y-8 my-8">
              {compiledDispatch.sections.map((sec, secIdx) => (
                <div key={sec.sectionId} className="space-y-4">
                  {/* Section Title Header */}
                  <div className="flex items-center justify-between border-b-2 border-black pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black bg-black text-white px-2 py-0.5">
                        {secIdx + 1}
                      </span>
                      <h3 className="font-sans font-black text-base md:text-lg text-black uppercase">
                        {sec.sectionTitleAr}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-zinc-500 font-bold">
                      {sec.articleIds.length} {isAr ? 'ملفات' : 'files'}
                    </span>
                  </div>

                  {/* Stories in Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sec.articleIds.map(id => {
                      const article = articles.find(a => a.id === id);
                      if (!article) return null;
                      const override = storyOverrides[id];
                      const isLead = id === leadArticleId || override?.isPinnedLead;

                      return (
                        <div 
                          key={id}
                          className={`p-4 border-2 transition-all flex flex-col justify-between ${
                            isLead 
                              ? 'border-red-800 bg-white shadow-[4px_4px_0px_0px_rgba(185,28,28,1)]' 
                              : 'border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                          }`}
                        >
                          <div>
                            {isLead && (
                              <div className="inline-block bg-red-700 text-white font-mono text-[9px] font-black px-2 py-0.5 uppercase tracking-wider mb-2">
                                ★ {isAr ? 'الملف الافتتاحي البارز' : 'FEATURED LEAD'}
                              </div>
                            )}

                            <h4 className="font-sans font-black text-sm md:text-base text-black leading-snug hover:text-red-700 transition-colors">
                              {override?.customHeadlineAr || article.titleAr}
                            </h4>

                            <p className="font-serif text-xs text-zinc-700 mt-2 leading-relaxed">
                              {article.summaryAr}
                            </p>

                            {override?.customNotesAr && (
                              <div className="mt-2.5 p-2 bg-amber-50 border-r-2 border-amber-600 font-sans text-xs text-amber-950">
                                <strong>{isAr ? 'ملاحظة ديوان التحرير:' : 'Note:'}</strong> {override.customNotesAr}
                              </div>
                            )}
                          </div>

                          <div className="mt-4 pt-3 border-t border-dashed border-zinc-300 flex items-center justify-between text-xs font-mono">
                            <span className="text-zinc-500">{article.date}</span>
                            <button
                              type="button"
                              onClick={() => onSelectArticle && onSelectArticle(article)}
                              className="text-red-700 font-black hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>{isAr ? 'قراءة التحليل كاملاً ←' : 'Read Full File →'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Dispatch Footer & Signature */}
            <div className="border-t-4 border-black pt-6 mt-10 text-center space-y-4">
              <div className="font-mono text-xs text-zinc-600">
                {isAr 
                  ? 'تم تنضيد وبث هذه البرقية من مكاتب ديوان التحرير في بيروت • معهد الورّاق للدراسات السيادية والاستخبارات'
                  : 'Compiled and transmitted from Al-Warraq Editorial Bureau, Beirut • Sovereign Intelligence'}
              </div>
              <div className="flex justify-center gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={handleCopyWhatsAppText}
                  className="px-4 py-2 bg-emerald-700 text-white font-bold hover:bg-emerald-800 cursor-pointer"
                >
                  {isAr ? 'مشاركة عبر الواتساب' : 'Share to WhatsApp'}
                </button>
                <button
                  type="button"
                  onClick={handlePublishDispatch}
                  className="px-4 py-2 bg-red-700 text-white font-bold hover:bg-red-800 cursor-pointer"
                >
                  {isAr ? 'نشر البرقية في الموقع' : 'Publish to Live Site'}
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 4. PAST DISPATCHES ARCHIVE TAB */}
      {activeView === 'history' && (
        <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-black pb-3">
            <div>
              <h3 className="font-sans font-black text-base uppercase text-black flex items-center gap-2">
                <Archive className="text-red-700" size={18} />
                {isAr ? 'سجل وأرشيف كافة أعداد برقيات البث اليومية' : 'Published Intelligence Dispatches Archive'}
              </h3>
              <p className="text-xs text-zinc-500">
                {isAr ? 'استعراض أو تعديل أو إعادة بث الأعداد الصادرة سابقاً.' : 'Review, modify, or duplicate previously broadcasted daily dispatches.'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetToNewIssue}
              className="px-4 py-2 bg-black text-white font-mono text-xs font-black uppercase hover:bg-zinc-800 transition-all cursor-pointer"
            >
              + {isAr ? 'إنشاء عدد جديد' : 'Compose New Issue'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allDispatches.map(disp => (
              <div
                key={disp.id}
                className="border-2 border-black p-4 bg-zinc-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between hover:border-red-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-black bg-red-700 text-white px-2 py-0.5">
                      العدد #{disp.issueNumber}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500 font-bold">
                      {disp.dateStrAr}
                    </span>
                  </div>

                  <h4 className="font-sans font-black text-sm text-black leading-snug mb-2">
                    {disp.titleAr}
                  </h4>

                  <p className="font-serif text-xs text-zinc-600 line-clamp-3 leading-relaxed mb-3">
                    {disp.executiveBriefingAr}
                  </p>

                  <div className="flex flex-wrap gap-1.5 my-2">
                    {disp.sections.map(s => (
                      <span key={s.sectionId} className="font-mono text-[9px] bg-white border border-zinc-400 px-1.5 py-0.5 text-zinc-700 font-bold">
                        {s.sectionTitleAr} ({s.articleIds.length})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-300 flex items-center justify-between mt-3">
                  <span className="font-mono text-[10px] text-zinc-500">
                    {disp.views || 0} {isAr ? 'قراءة' : 'views'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleLoadPastDispatch(disp)}
                      className="px-2.5 py-1 bg-black text-white hover:bg-zinc-800 text-xs font-mono font-bold cursor-pointer"
                    >
                      {isAr ? 'تحرير / استنساخ' : 'Edit / Clone'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
