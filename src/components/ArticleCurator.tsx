import React, { useState, useEffect } from 'react';
import { Article, NavigationTab } from '../types';
import { RefreshCw, Newspaper, Tag, Check, AlertCircle, Sparkles, Layers, ArrowRightLeft } from 'lucide-react';

interface ArticleCuratorProps {
  language: 'ar' | 'en';
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  categories: NavigationTab[];
}

interface CuratedDispatch {
  id: string;
  category: string;
  headlineEn: string;
  headlineAr: string;
  synopsisEn: string;
  synopsisAr: string;
  ctaEn?: string;
  ctaAr?: string;
  url?: string;
  unsplashTerm?: string;
}

const LOCAL_FALLBACK_DISPATCHES: CuratedDispatch[] = [
  {
    id: "dispatch-mou-bypass",
    category: "resource-friction",
    headlineEn: "MOU BYPASS SECURED: ARCHITECTING REGIONAL LOGISTIC REDUNDANCY PIPELINES",
    headlineAr: "تدشين ممر التفتيت اللوجستي: إستراتيجية تجاوز المضائق البحرية في مذكرة تفاهم واشنطن وطهران",
    synopsisEn: "The newly signed US-Iran memorandum consolidates alternative trade bypass vectors. Key infrastructure focuses include expanding Saudi Arabia's East-West Petroline and developing integrated Arabian Rail Networks to offset critical shipping choke points.",
    synopsisAr: "شهدت تفاهمات واشنطن وطهران الأخيرة بلورة قنوات للنقل الرديف بعيداً عن المضائق البحرية الحساسة. تتركز الخطة على تدعيم مشروع الربط الحديدي العربي وتوسيع خط أنابيب شرق-غرب السعودي الممتد لتفادي أي احتكاك لوجستي مكلف.",
    ctaEn: "ANALYZE FRICTION",
    ctaAr: "تحليل الاحتكاك اللوجستي",
    url: "https://alwarraqnews.com/section/markets",
    unsplashTerm: "retro technology satellite orbital communication glowing cables"
  },
  {
    id: "dispatch-lebanon-bdd",
    category: "lebanon",
    headlineEn: "BEIRUT DIGITAL DISTRICT (BDD): HARNESSING DISTRIBUTED COGNITIVE INFRASTRUCTURE",
    headlineAr: "بيروت الرقمية (BDD): إطلاق مبادرة الحوسبة الموزعة لتأجير عقول الغد التقنية بلبنان",
    synopsisEn: "Beirut's premier tech hub BDD registers record levels of software engineering growth despite regional power constraints, offering decentralized sovereign databases and decentralized cloud compute platforms for global developers.",
    synopsisAr: "أعلنت منطقة بيروت الرقمية (BDD) عن تقدم إنتاجي قياسي في تشغيل شبكات البرمجة واستضافة خوادم سيادية موزعة، مستفيدة من حلول الطاقة المستدامة ومراكز الاتصال اللامركزية للتغلب على التحديات المحيطة.",
    ctaEn: "OBSERVE TELEMETRY",
    ctaAr: "راقب القياس الميداني",
    url: "https://alwarraqnews.com/section/lebanon",
    unsplashTerm: "modern server room datacentre with green lights"
  },
  {
    id: "dispatch-arabian-net",
    category: "technology",
    headlineEn: "THE INTEGRATED ARABIAN RAILWAY: COUPLING MEGAPROJECT CONNECTIVITY ACROSS GCC",
    headlineAr: "قاطرة المستقبل: الربط السككي الخليجي الموحد يرسم معالم ممر التبادل التجاري الضخم",
    synopsisEn: "GCC states accelerate construction of high-speed heavy rail linkage corridors. Analysts forecast the unified network will slash freight transit times between Red Sea ports and the Arabian Gulf by forty-five percent.",
    synopsisAr: "شهد مشروع السكك الحديدية الموحد بدول الخليج وثبة تنفيذية لتفعيل مسارات النقل الثقيل الفائق. يؤكد محللون أن الربط المصلحي سيخفض زمن العبور اللوجستي للبضائع بين موانئ البحر الأحمر والخليج العربي بنسبة الثلثين.",
    ctaEn: "TRACK SINGULARITY",
    ctaAr: "تتبع نقطة التحول",
    url: "https://alwarraqnews.com/section/middle-east",
    unsplashTerm: "glowing train tracks neon city night retro"
  },
  {
    id: "dispatch-sovereign-liquidity",
    category: "capital-markets",
    headlineEn: "LEVANT RESOURCE MONETARY DECK: PROTECTING TRADE ACCUMULATION METRICS",
    headlineAr: "ميزان السلع الشالم: خطة نقدية مستحدثة لعرقلة المضاربات الخارجية وحماية مستويات السيولة",
    synopsisEn: "Sovereign financial authorities formulate defensive monetary buffers to preserve local purchasing index. Key measures target real estate backing mechanisms and stable physical energy assets.",
    synopsisAr: "وضعت دوائر السياسة النقدية ببلدان الهلال الخصيب حزمة إجراءات دفاعية لحماية أسعار الصرف ومكافحة الانحراف السعري للوقود والمواد البنائية الأساسية، بالاستناد إلى سندات صلبة مقومة بالطاقة.",
    ctaEn: "ENTER THE VOID",
    ctaAr: "ولوجه الفراغ المالي",
    url: "https://alwarraqnews.com/section/capital-markets",
    unsplashTerm: "golden coins digital graphics statistics dark"
  }
];

export default function ArticleCurator({
  language,
  articles,
  setArticles,
  categories
}: ArticleCuratorProps) {
  const isAr = language === 'ar';
  const [dispatches, setDispatches] = useState<CuratedDispatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Fetch generated news dispatches
  const fetchGeneratedNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/newsletter/generate');
      if (!res.ok) {
        throw new Error(`Server returned status: ${res.status}`);
      }
      const data = await res.json();
      if (data && Array.isArray(data.curation)) {
        setDispatches(data.curation);
        setSuccessMsg(isAr ? 'تم سحب آخر البرقيات الرقمية الخوارزمية بنجاح!' : 'Successfully fetched latest algorithmic neural dispatches!');
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        throw new Error('Invalid response structure: expected an array on "curation"');
      }
    } catch (err: any) {
      console.warn('Backend API connection unavailable, activating high-fidelity offline dispatches fallback. Reason:', err.message);
      // Fall back seamlessly to our beautifully curated local telemetry items
      setDispatches(LOCAL_FALLBACK_DISPATCHES);
      setSuccessMsg(
        isAr 
          ? 'تم تفعيل موجه البث اللاسلكي الاحتياطي (اتصال غير متصل بالخادم الأجنبي)' 
          : 'Offline bypass activated. High-fidelity reserve dispatches loaded successfully.'
      );
      setTimeout(() => setSuccessMsg(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    fetchGeneratedNews();
  }, []);

  // Helper to get matching published article
  const getPublishedArticle = (dispatchId: string): Article | undefined => {
    return articles.find(art => art.id === dispatchId || art.id === `curated-${dispatchId}`);
  };

  // Publish or re-route article based on section dropdown selection
  const handleSectionSelect = (dispatch: CuratedDispatch, selectedSectionId: string) => {
    const targetId = `curated-${dispatch.id}`;
    const existing = articles.find(art => art.id === targetId);

    if (selectedSectionId === 'draft') {
      // Unpublish: remove from global articles state
      if (existing) {
        setArticles(prev => prev.filter(art => art.id !== targetId));
        setSuccessMsg(isAr ? 'تم إلغاء النشر وحفظ المقال كمسودة.' : 'Article unpublished and reverted to Draft.');
        setTimeout(() => setSuccessMsg(null), 3000);
      }
      return;
    }

    if (existing) {
      // Re-route: update the category of the existing article immediately
      setArticles(prev => prev.map(art => {
        if (art.id === targetId) {
          return { ...art, category: selectedSectionId };
        }
        return art;
      }));
      setSuccessMsg(
        isAr 
          ? `تم تحديث تصنيف المقال ونقله بنجاح إلى: ${categories.find(c => c.id === selectedSectionId)?.labelAr || selectedSectionId}`
          : `Article category updated and routed immediately to: ${categories.find(c => c.id === selectedSectionId)?.labelEn || selectedSectionId}`
      );
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      // Publish new: construct full article and prepend to global state
      let imageUrl = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80';
      
      const term = dispatch.unsplashTerm?.toLowerCase() || '';
      if (term.includes('finance') || term.includes('economy') || term.includes('money')) {
        imageUrl = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80';
      } else if (term.includes('tech') || term.includes('cyber') || term.includes('algorithm') || term.includes('digital')) {
        imageUrl = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80';
      } else if (term.includes('sport') || term.includes('football') || term.includes('stadium') || term.includes('fifa')) {
        imageUrl = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80';
      } else if (term.includes('nature') || term.includes('water') || term.includes('health') || term.includes('life')) {
        imageUrl = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80';
      }

      const newArticle: Article = {
        id: targetId,
        category: selectedSectionId,
        titleAr: dispatch.headlineAr,
        titleEn: dispatch.headlineEn,
        summaryAr: dispatch.synopsisAr,
        summaryEn: dispatch.synopsisEn,
        contentAr: `${dispatch.synopsisAr}\n\nهذا الملف صِيغَ ونُسِّق بناءً على خلاصات برقيات الورّاق الرقمية المشفرة وبالتعاون المباشر مع مكاتب المتابعة الميدانية لرصد وتحليل المشاعر الوطنية.`,
        contentEn: `${dispatch.synopsisEn}\n\nThis brief is synthesized from digital intelligence reports and raw data feeds processed by Al-Warraq's automated telegraphic pipelines.`,
        author: {
          nameAr: 'مكتب الوراق للمتابعة والفرز',
          nameEn: 'Al-Warraq Neural Desk',
          titleAr: 'تغطية تحليلية خوارزمية',
          titleEn: 'Algorithmic Content Specialist',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
        },
        imageUrl,
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        readTimeAr: '٢ دقيقة قراءة',
        readTimeEn: '2 min read',
        isBreaking: false,
        isFeatured: false,
        isPremium: false,
        views: Math.floor(Math.random() * 240) + 30,
        tags: ['Al-Warraq Algorithmic', 'Neural Wire', dispatch.category || 'exclusive']
      };

      setArticles(prev => [newArticle, ...prev]);
      setSuccessMsg(
        isAr
          ? `✓ تم تفعيل المقال ونشره فوراً في قطاع: ${categories.find(c => c.id === selectedSectionId)?.labelAr || selectedSectionId}`
          : `✓ Article published immediately under: ${categories.find(c => c.id === selectedSectionId)?.labelEn || selectedSectionId}`
      );
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="border-b border-black pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-sans font-black text-lg uppercase flex items-center gap-2">
            <Sparkles size={18} className="text-[#b91c1c]" />
            {isAr ? 'ديوان التوطين والفرز الفوري للأخبار' : 'Algorithmic Article Curator'}
          </h3>
          <p className="text-xxs text-zinc-500 mt-0.5">
            {isAr
              ? 'تلقي البرقيات المولدة عصبياً، مراجعتها في جدول مرئي بلمسة واحدة، وتخصيص أقسام النشر الفوري للجريدة.'
              : 'Harvest newly synthesized neural news wire feeds, review details, and route them to live client sections instantly.'}
          </p>
        </div>

        <button
          type="button"
          onClick={fetchGeneratedNews}
          disabled={isLoading}
          className="bg-black hover:bg-zinc-800 text-white font-mono font-black text-xxs px-4 py-2 flex items-center gap-2 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(185,28,28,1)] active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
          {isLoading 
            ? (isAr ? 'جاري السحب والتحليل...' : 'HARVESTING FEED...') 
            : (isAr ? 'تحديث وسحب البرقيات' : 'REFRESH NEURAL FEEDS')}
        </button>
      </div>

      {/* Status Alerts */}
      {error && (
        <div className="p-4 bg-red-50 border-2 border-[#b91c1c] text-[#b91c1c] flex items-center gap-3 text-xs font-bold font-mono">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-500 text-emerald-800 flex items-center gap-3 text-xs font-bold font-mono animate-pulse">
          <Check size={16} className="shrink-0 text-emerald-600 font-black" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Curation Table */}
      <div className="bg-white border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {isLoading && dispatches.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#b91c1c] animate-spin" />
            <p className="font-mono text-xs font-extrabold text-[#b91c1c]">
              {isAr ? 'جاري الاتصال بقنوات البث السلكية واستخراج المادة...' : 'CONNECTING WIRES AND FETCHING NEWS FEED...'}
            </p>
          </div>
        ) : dispatches.length === 0 ? (
          <div className="py-12 text-center text-zinc-400 font-mono text-xs italic">
            {isAr 
              ? 'لم يتم سحب أي برقيات حتى الآن. اضغط فوق "تحديث وسحب البرقيات" لتوليد البث.' 
              : 'No dispatches loaded. Click on "REFRESH NEURAL FEEDS" to activate algorithmic generation.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right border-collapse">
              <thead>
                <tr className="bg-zinc-100 border-b-2 border-black font-mono text-xxs font-black uppercase text-black select-none">
                  <th className="p-3 border-r border-zinc-300 w-24 text-center">{isAr ? 'الهوية والرمز' : 'ID & STATUS'}</th>
                  <th className="p-3 border-r border-zinc-300 w-1/3">{isAr ? 'العنوان النيوروني (عربي / English)' : 'BILINGUAL TELEGRAPH HEADLINE'}</th>
                  <th className="p-3 border-r border-zinc-300 w-1/3 hidden md:table-cell">{isAr ? 'الملخص المقتضب' : 'SYNOPSIS EXCERPTS'}</th>
                  <th className="p-3 border-zinc-300 text-center w-48">{isAr ? 'التصنيف والنشر الفوري' : 'ROUTE TO ACTIVE DEPT'}</th>
                </tr>
              </thead>
              <tbody>
                {dispatches.map((disp, idx) => {
                  const published = getPublishedArticle(disp.id);
                  const currentCategory = published ? published.category : 'draft';

                  return (
                    <tr 
                      key={disp.id || idx} 
                      className={`border-b border-black hover:bg-neutral-50 transition-colors text-xs font-semibold ${
                        published ? 'bg-emerald-50/10' : 'bg-white'
                      }`}
                    >
                      {/* ID & STATUS */}
                      <td className="p-3 border-r border-zinc-300 text-center font-mono space-y-1.5">
                        <span className="block text-[10px] font-black text-black">
                          #{disp.id}
                        </span>
                        {published ? (
                          <span className="inline-block bg-emerald-100 text-emerald-800 text-[8px] font-extrabold px-1.5 py-0.5 border border-emerald-300 uppercase tracking-wider rounded-xs">
                            {isAr ? 'منشور' : 'PUBLISHED'}
                          </span>
                        ) : (
                          <span className="inline-block bg-zinc-150 text-zinc-500 text-[8px] font-semibold px-1.5 py-0.5 border border-zinc-300 uppercase tracking-normal rounded-xs">
                            {isAr ? 'مسودة خام' : 'DRAFT WIRE'}
                          </span>
                        )}
                      </td>

                      {/* BILINGUAL HEADLINE */}
                      <td className="p-3 border-r border-zinc-300 space-y-2.5">
                        <div className="space-y-1 text-left">
                          <span className="inline-block px-1 bg-zinc-100 border border-zinc-300 font-mono text-[8px] uppercase font-bold text-zinc-500">EN</span>
                          <h4 className="font-sans font-extrabold text-xs text-black leading-snug">
                            {disp.headlineEn}
                          </h4>
                        </div>
                        <div className="space-y-1 text-right border-t border-dashed border-zinc-200 pt-2 font-sans">
                          <span className="inline-block px-1 bg-red-50 border border-red-200 font-mono text-[8px] uppercase font-bold text-[#b91c1c]">AR</span>
                          <h4 className="font-sans font-black text-xs text-black leading-snug">
                            {disp.headlineAr}
                          </h4>
                        </div>
                      </td>

                      {/* SYNOPSIS EXCERPTS */}
                      <td className="p-3 border-r border-zinc-300 hidden md:table-cell space-y-3 font-serif">
                        <div className="text-left text-[10.5px] text-zinc-600 line-clamp-2">
                          {disp.synopsisEn}
                        </div>
                        <div className="text-right text-[10.5px] text-zinc-650 font-serif leading-relaxed line-clamp-2 border-t border-dashed border-zinc-150 pt-2 font-sans">
                          {disp.synopsisAr}
                        </div>
                      </td>

                      {/* PUBLISH TO SECTION SELECTOR */}
                      <td className="p-3 text-center space-y-2">
                        <div className="flex flex-col items-center justify-center gap-1.5">
                          <label className="font-mono text-[8px] font-bold text-zinc-400 uppercase block">
                            {isAr ? 'توجيه البث المباشر:' : 'TELEGRAPH ROUTE:'}
                          </label>
                          <select
                            value={currentCategory}
                            onChange={(e) => handleSectionSelect(disp, e.target.value)}
                            className={`w-full max-w-xs text-xs font-black p-2 border-2 outline-none cursor-pointer transition-all ${
                              currentCategory === 'draft'
                                ? 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-400'
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-500'
                            }`}
                          >
                            <option value="draft" className="text-zinc-600 font-bold">
                              {isAr ? '📁 مسودة إلكترونية (غير منشور)' : '📁 Draft / Hold Ingestion'}
                            </option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id} className="text-black font-semibold">
                                🚀 {isAr ? cat.labelAr : cat.labelEn}
                              </option>
                            ))}
                          </select>
                        </div>

                        {published && (
                          <div className="flex items-center justify-center gap-1 font-mono text-[8.5px] text-emerald-600 font-extrabold uppercase">
                            <Tag size={9} />
                            <span>
                              {categories.find(c => c.id === currentCategory)?.labelEn || currentCategory}
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Bottom info banner */}
      <div className="bg-zinc-50 border-2 border-dashed border-black p-4 flex gap-3 select-none">
        <ArrowRightLeft className="text-[#b91c1c] shrink-0 mt-0.5" size={16} />
        <div className="text-xxs text-zinc-600 space-y-1">
          <p className="font-bold text-black uppercase">
            {isAr ? 'القناة المباشرة وسرعة النشر التزامني' : 'Instant Decentralized Synchronization Policy'}
          </p>
          <p className="leading-relaxed">
            {isAr 
              ? 'اختيار أي قسم من القائمة المنسدلة أعلاه يقوم فوراً بصياغة مستند الخبر الإخباري عالي الدقة ودمجه بقائمة المقالات النشطة للمستخدمين بالصفحة الرئيسية وتحديث كتل البيانات التفاعلية بشكل فوري ومتزامن بمجرد الحفظ.'
              : 'Setting a department via any dropdown immediately formats a comprehensive NewsArticle footprint, prepending or updating its position in the live client flow. Selecting the draft state safely purges it from public view.'}
          </p>
        </div>
      </div>
    </div>
  );
}
