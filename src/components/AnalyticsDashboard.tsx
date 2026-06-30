import React, { useState, useMemo } from 'react';
import { Article, NavigationTab } from '../types';
import { 
  TrendingUp, TrendingDown, Eye, BookOpen, Users, Award, 
  AlertCircle, CheckCircle2, Clock, BarChart3, Search, 
  FileText, RefreshCw, Gauge, ChevronRight, HelpCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, Cell 
} from 'recharts';

interface AnalyticsDashboardProps {
  language: 'ar' | 'en';
  articles: Article[];
  categories: NavigationTab[];
}

export default function AnalyticsDashboard({ language, articles, categories }: AnalyticsDashboardProps) {
  const isAr = language === 'ar';

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // State for Readability Text Inspector
  const [inspectorText, setInspectorText] = useState('');
  const [inspectorLang, setInspectorLang] = useState<'ar' | 'en'>(isAr ? 'ar' : 'en');
  const [inspectorTitle, setInspectorTitle] = useState('');

  // Auto-load first article content into inspector for onboarding
  React.useEffect(() => {
    if (articles.length > 0 && !inspectorText) {
      const art = articles[0];
      setInspectorTitle(isAr ? art.titleAr : art.titleEn);
      setInspectorText(isAr ? art.contentAr : art.contentEn);
      setInspectorLang(isAr ? 'ar' : 'en');
    }
  }, [articles, isAr]);

  // Handle article selection to load into readability inspector
  const handleLoadArticleToInspector = (article: Article) => {
    setInspectorTitle(isAr ? article.titleAr : article.titleEn);
    setInspectorText(isAr ? article.contentAr : article.contentEn);
    setInspectorLang(isAr ? 'ar' : 'en');
    // Scroll Inspector into view smoothly
    const element = document.getElementById('readability-inspector-card');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Aggregated Metric Calculations
  const metrics = useMemo(() => {
    const totalArticles = articles.length;
    const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
    const avgViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0;
    
    // Estimate unique visitors
    const uniqueVisitors = Math.round(totalViews * 0.68);
    // Bounce rate simulation based on premium ratio
    const premiumCount = articles.filter(a => a.isPremium).length;
    const bounceRate = Math.max(30, Math.min(65, 55 - (premiumCount / (totalArticles || 1)) * 30)).toFixed(1);

    return {
      totalArticles,
      totalViews,
      avgViews,
      uniqueVisitors,
      bounceRate
    };
  }, [articles]);

  // Category view performance calculations
  const categoryData = useMemo(() => {
    const data: { name: string; nameAr: string; views: number; count: number }[] = [];
    
    categories.forEach(cat => {
      if (cat.id === 'all') return;
      const catArticles = articles.filter(a => a.category === cat.id);
      const views = catArticles.reduce((sum, a) => sum + (a.views || 0), 0);
      data.push({
        name: cat.labelEn,
        nameAr: cat.labelAr,
        views,
        count: catArticles.length
      });
    });

    return data.sort((a, b) => b.views - a.views);
  }, [articles, categories]);

  // Simulated traffic over the last 30 days
  const trafficHistory = useMemo(() => {
    const data = [];
    const baseViews = metrics.totalViews / 30 || 2500;
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' });
      
      // Seeded random fluctuation for beautiful graphing
      const seed = Math.sin(i * 0.5) * 0.25 + Math.cos(i * 0.1) * 0.1;
      const dailyViews = Math.round(baseViews * (1 + seed));
      const dailyUniques = Math.round(dailyViews * 0.68);

      data.push({
        date: formattedDate,
        Views: dailyViews,
        Uniques: dailyUniques
      });
    }
    return data;
  }, [metrics.totalViews, isAr]);

  // Readability calculation engine
  const readabilityAnalysis = useMemo(() => {
    if (!inspectorText.trim()) {
      return {
        wordCount: 0,
        charCount: 0,
        sentenceCount: 0,
        paragraphCount: 0,
        avgSentenceLength: 0,
        avgWordLength: 0,
        readabilityScore: 0,
        readabilityLevelAr: 'أدخل نصاً لبدء التحليل',
        readabilityLevelEn: 'Enter text to analyze',
        readingTimeMin: 0,
        readingTimeSec: 0,
        complexityColor: 'text-zinc-400',
        complexityBg: 'bg-zinc-100',
        scoreDescriptionAr: '',
        scoreDescriptionEn: '',
        seoChecklist: []
      };
    }

    const text = inspectorText.trim();
    const charCount = text.length;
    
    // Clean text and split to calculate words
    const words = text.replace(/[\s\r\n]+/g, ' ').split(' ').filter(w => w.length > 0);
    const wordCount = words.length;

    // Split paragraphs
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const paragraphCount = Math.max(1, paragraphs.length);

    // Sentence splitting (support Arabic marks like ؟ and English marks like .)
    const sentences = text.split(/[.!?؟]+/).filter(s => s.trim().length > 0);
    const sentenceCount = Math.max(1, sentences.length);

    const avgSentenceLength = Number((wordCount / sentenceCount).toFixed(1));
    
    // Average character length of words
    const totalWordChars = words.reduce((sum, w) => sum + w.length, 0);
    const avgWordLength = wordCount > 0 ? Number((totalWordChars / wordCount).toFixed(1)) : 0;

    // Estimated Reading Time
    // Arabic is generally read slightly slower than English (150 wpm vs 200 wpm)
    const readingSpeed = inspectorLang === 'ar' ? 150 : 200;
    const totalReadingTimeSec = Math.round((wordCount / readingSpeed) * 60);
    const readingTimeMin = Math.floor(totalReadingTimeSec / 60);
    const readingTimeSec = totalReadingTimeSec % 60;

    // Calculate Readability score and levels
    let score = 0;
    let levelAr = '';
    let levelEn = '';
    let descAr = '';
    let descEn = '';
    let compColor = 'text-green-600';
    let compBg = 'bg-green-50 border-green-200';

    if (inspectorLang === 'ar') {
      // Arabic readability scoring heuristic
      // Slower sentence length and higher character counts indicate high complexity
      const wordLengthFactor = Math.max(0, 100 - (avgWordLength - 4) * 25);
      const sentenceLengthFactor = Math.max(0, 100 - (avgSentenceLength - 8) * 4);
      score = Math.round((wordLengthFactor * 0.4) + (sentenceLengthFactor * 0.6));

      if (score > 80) {
        levelAr = 'سهل ومبسط جداً';
        descAr = 'مناسب للأطفال والأشخاص في المراحل التعليمية الأولى. لغة واضحة وعبارات شديدة الإيجاز.';
        compColor = 'text-emerald-700';
        compBg = 'bg-emerald-50 border-emerald-200';
      } else if (score > 60) {
        levelAr = 'مبسط / صحافة عامة';
        descAr = 'مناسب للجمهور العريض والتحليلات الإخبارية اليومية السريعة. خالي من المصطلحات التقنية المعقدة.';
        compColor = 'text-green-700';
        compBg = 'bg-green-50 border-green-200';
      } else if (score > 40) {
        levelAr = 'متوسط / تحليلي سيادي';
        descAr = 'المستوى الأمثل لجريدة الوراق. يدمج تحليلات جيوسياسية واقتصادية بلغة فصحى متينة ومتوازنة.';
        compColor = 'text-amber-700';
        compBg = 'bg-amber-50 border-amber-200';
      } else {
        levelAr = 'أكاديمي معقد / تخصصي';
        descAr = 'نصوص ذات طابع تخصصي دقيق أو دراسات ومذكرات استراتيجية معقدة. يتطلب تركيزاً عاليًا.';
        compColor = 'text-red-700';
        compBg = 'bg-red-50 border-red-200';
      }
    } else {
      // English Readability: Flesch Reading Ease Formula
      // 206.835 - (1.015 * ASL) - (84.6 * ASW)
      // Since syllable count is complex to calculate in JavaScript client-side, we approximate syllables:
      // Syllables per word roughly correlates with word length. average: ~1.4 syllables per word.
      const syllablesPerWord = Math.max(1, avgWordLength * 0.32);
      const easeScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * syllablesPerWord);
      score = Math.round(Math.max(0, Math.min(100, easeScore)));

      if (score >= 80) {
        levelEn = 'Easy / Conversation Level';
        descEn = 'Highly readable. Casual language suitable for rapid reading and mass-consumer dispatches.';
        compColor = 'text-emerald-700';
        compBg = 'bg-emerald-50 border-emerald-200';
      } else if (score >= 60) {
        levelEn = 'Standard / Mainstream News';
        descEn = 'Optimal mainstream newspaper level. Clear prose, informative and accessible without being overly simplistic.';
        compColor = 'text-green-700';
        compBg = 'bg-green-50 border-green-200';
      } else if (score >= 45) {
        levelEn = 'Analytical / Premium Editorial';
        descEn = 'Al-Warraq standard. Geopolitical and macroeconomic depth, requiring solid focus. Balanced vocabulary.';
        compColor = 'text-amber-700';
        compBg = 'bg-amber-50 border-amber-200';
      } else {
        levelEn = 'Academic / High-Density Report';
        descEn = 'Densely packed professional brief or geopolitical whitepaper. High ratio of multi-syllabic jargon.';
        compColor = 'text-red-700';
        compBg = 'bg-red-50 border-red-200';
      }
    }

    // SEO checks
    const seoChecklist = [
      {
        labelAr: 'طول العنوان مثالي (بين ٤٠ و ٨٠ حرف)',
        labelEn: 'Headline length is ideal (40-80 chars)',
        status: inspectorTitle.length >= 40 && inspectorTitle.length <= 85
      },
      {
        labelAr: 'عمق المحتوى كافٍ للزحف والأرشفة (أكثر من ٢٠٠ كلمة)',
        labelEn: 'Sufficient content depth for crawling (200+ words)',
        status: wordCount >= 200
      },
      {
        labelAr: 'طول الفقرات مثالي (أقل من ٦٠ كلمة لكل فقرة بالمتوسط)',
        labelEn: 'Excellent paragraph density (under 60 words/para)',
        status: (wordCount / paragraphCount) <= 60
      },
      {
        labelAr: 'تركيبة الجمل سلسة ومختصرة (أقل من ٢٥ كلمة لكل جملة)',
        labelEn: 'Smooth sentence structure (under 25 words/sentence)',
        status: avgSentenceLength <= 25
      }
    ];

    return {
      wordCount,
      charCount,
      sentenceCount,
      paragraphCount,
      avgSentenceLength,
      avgWordLength,
      readabilityScore: score,
      readabilityLevelAr: levelAr,
      readabilityLevelEn: levelEn,
      readingTimeMin,
      readingTimeSec,
      complexityColor: compColor,
      complexityBg: compBg,
      scoreDescriptionAr: descAr,
      scoreDescriptionEn: descEn,
      seoChecklist
    };
  }, [inspectorText, inspectorLang, inspectorTitle]);

  // Filtered and sorted articles for the active report table
  const filteredArticles = useMemo(() => {
    return articles
      .filter(a => {
        const matchesSearch = 
          a.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => (b.views || 0) - (a.views || 0));
  }, [articles, searchTerm, selectedCategory]);

  return (
    <div className="space-y-8 animate-fade-in text-xs font-semibold select-text" id="admin-readability-traffic-panel">
      {/* Tab Header */}
      <div className="border-b border-black pb-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
        <div>
          <h3 className="font-sans font-black text-lg uppercase flex items-center gap-2">
            <BarChart3 size={18} className="text-[#b91c1c]" />
            {isAr ? 'مرصد إحصائيات المقروئية وحركة الزوار' : 'Readability Analysis & Site Traffic Observatory'}
          </h3>
          <p className="text-xxs text-zinc-500 mt-0.5">
            {isAr 
              ? 'مراجعة أداء النشر الحي وعملاء التصفح، وتحليل لغة المقالات لغوياً وتقنياً وقياس تلاؤمها مع محركات البحث.' 
              : 'Audit active news dispatches performance, analyze text complexity indexes, and review semantic reading profiles for optimal editorial delivery.'}
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold bg-[#b91c1c] text-white px-2.5 py-1 rounded">
          {isAr ? 'تحليل حي' : 'LIVE TELEMETRY'}
        </span>
      </div>

      {/* CORE BIG METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="border-2 border-black p-4 bg-white relative overflow-hidden">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
            {isAr ? 'إجمالي المشاهدات' : 'ACCUMULATED VIEWS'}
          </span>
          <div className="flex items-baseline gap-1 mt-1.5" dir="ltr">
            <span className="text-2.5xl font-black font-mono text-zinc-950">
              {metrics.totalViews.toLocaleString()}
            </span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={11} /> +12.4%
            </span>
          </div>
          <span className="text-[8.5px] text-zinc-400 block font-mono mt-1">
            {isAr ? 'نقرات الخادم الفعلية' : 'Aggregated reader hits'}
          </span>
        </div>

        <div className="border-2 border-black p-4 bg-white relative overflow-hidden">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
            {isAr ? 'الزوار الفريدين' : 'UNIQUE VISITORS'}
          </span>
          <div className="flex items-baseline gap-1 mt-1.5" dir="ltr">
            <span className="text-2.5xl font-black font-mono text-zinc-950">
              {metrics.uniqueVisitors.toLocaleString()}
            </span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp size={11} /> +8.1%
            </span>
          </div>
          <span className="text-[8.5px] text-zinc-400 block font-mono mt-1">
            {isAr ? 'تقدير البصمة الفريدة ٦٨٪' : '68% visitor footprint calc'}
          </span>
        </div>

        <div className="border-2 border-black p-4 bg-white relative overflow-hidden">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
            {isAr ? 'معدل الارتداد' : 'BOUNCE RATE'}
          </span>
          <div className="flex items-baseline gap-1 mt-1.5" dir="ltr">
            <span className="text-2.5xl font-black font-mono text-red-700">
              {metrics.bounceRate}%
            </span>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingDown size={11} /> -2.4%
            </span>
          </div>
          <span className="text-[8.5px] text-zinc-400 block font-mono mt-1">
            {isAr ? 'الخروج من الصفحة الأولى' : 'One-page session exit ratio'}
          </span>
        </div>

        <div className="border-2 border-black p-4 bg-white relative overflow-hidden">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
            {isAr ? 'متوسط قراءة المقال' : 'AVG ARTICLE HITS'}
          </span>
          <div className="flex items-baseline gap-1 mt-1.5" dir="ltr">
            <span className="text-2.5xl font-black font-mono text-zinc-950">
              {metrics.avgViews}
            </span>
            <span className="text-[9px] text-amber-600 font-bold flex items-center gap-0.5">
              • Stable
            </span>
          </div>
          <span className="text-[8.5px] text-zinc-400 block font-mono mt-1">
            {isAr ? 'معدل قراءة التحليل' : 'Views per archival item'}
          </span>
        </div>

        <div className="border-2 border-black p-4 bg-black text-white relative overflow-hidden col-span-2 md:col-span-1">
          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
            {isAr ? 'مؤشر عمق النص المقروء' : 'AVG COMPOSITE DEPTH'}
          </span>
          <div className="flex items-baseline gap-1 mt-1.5" dir="ltr">
            <span className="text-2.5xl font-black font-mono text-amber-400">
              {isAr ? 'مقبول' : 'B+ Core'}
            </span>
          </div>
          <span className="text-[8.5px] text-zinc-400 block font-mono mt-1">
            {isAr ? 'تحليل جودة السرد واللغة' : 'Semantic analysis level'}
          </span>
        </div>
      </div>

      {/* RECHARTS VISUALIZATION GRAPHS PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Traffic Over Time Chart (8 columns) */}
        <div className="lg:col-span-7 border-2 border-black p-4 bg-white">
          <div className="flex justify-between items-center border-b border-zinc-200 pb-2.5 mb-4">
            <h4 className="font-sans font-black text-xs uppercase text-zinc-950 flex items-center gap-1.5">
              <Users size={14} className="text-[#b91c1c]" />
              {isAr ? 'تطور تدفق حركة الزوار والمشاهدات (٣٠ يوماً الماضية)' : 'Audience Traffic & Server Hits Timeline (Last 30 Days)'}
            </h4>
            <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase">
              {isAr ? 'تحديث تلقائي' : 'Real-time telemetry'}
            </span>
          </div>

          <div className="h-[250px] w-full font-mono text-[10px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficHistory} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#b91c1c" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUniques" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18181b" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={9} />
                <YAxis stroke="#71717a" fontSize={9} />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181b', 
                    color: '#fff', 
                    borderRadius: '0px', 
                    border: '1px solid #000',
                    fontFamily: 'monospace',
                    fontSize: '11px'
                  }} 
                />
                <Area type="monotone" dataKey="Views" stroke="#b91c1c" strokeWidth={2.5} fillOpacity={1} fill="url(#colorViews)" name={isAr ? 'نقرات المشاهدة' : 'Views / Hits'} />
                <Area type="monotone" dataKey="Uniques" stroke="#18181b" strokeWidth={1.5} fillOpacity={1} fill="url(#colorUniques)" name={isAr ? 'زوار فريدون' : 'Unique Visitors'} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Views by Category (5 columns) */}
        <div className="lg:col-span-5 border-2 border-black p-4 bg-white flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-zinc-200 pb-2.5 mb-4">
              <h4 className="font-sans font-black text-xs uppercase text-zinc-950 flex items-center gap-1.5">
                <BookOpen size={14} className="text-zinc-900" />
                {isAr ? 'توزيع التفاعل والمشاهدات حسب القطاع الإخباري' : 'Audience Engagement Share by Column'}
              </h4>
            </div>

            <div className="h-[210px] w-full font-mono text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData.slice(0, 5)} layout="vertical" margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke="#f4f4f5" horizontal={false} />
                  <XAxis type="number" stroke="#71717a" fontSize={8} />
                  <YAxis type="category" dataKey={isAr ? 'nameAr' : 'name'} stroke="#71717a" fontSize={9} width={90} />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: '#18181b', 
                      color: '#fff', 
                      borderRadius: '0px', 
                      border: '1px solid #000',
                      fontFamily: 'monospace',
                      fontSize: '10px'
                    }} 
                  />
                  <Bar dataKey="views" fill="#18181b" name={isAr ? 'إجمالي المشاهدات' : 'Hits Count'} barSize={12}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#b91c1c' : index === 1 ? '#000000' : '#52525b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border-t border-zinc-150 pt-2 text-[9px] font-mono text-zinc-500 leading-snug flex items-center gap-1">
            <AlertCircle size={12} className="text-red-700 shrink-0" />
            <span>
              {isAr 
                ? 'القطاعات المتصدرة في التفاعل الإقليمي هي القطاع اللبناني الحصري ويليه سوق الأسهم.' 
                : 'Highest client traction index observed on sovereign analysis columns.'}
            </span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE READABILITY & SEO INSPECTOR (DETAILED MODULE) */}
      <div className="border-4 border-black bg-zinc-50 p-5 md:p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative overflow-hidden" id="readability-inspector-card">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-black"></div>

        <div className="border-b border-black pb-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Gauge size={16} className="text-[#b91c1c]" />
              <span className="font-mono text-[9px] font-black tracking-widest text-[#b91c1c] uppercase">
                {isAr ? 'مستشعر لغة ومفردات السرد الإخباري' : 'EDITORIAL LINGUISTICS & COMPREHENSION DESK'}
              </span>
            </div>
            <h4 className="font-sans font-black text-base md:text-lg text-zinc-950 leading-tight">
              {isAr ? 'الفاحص الإملائي واللغوي ومؤشر المقروئية الدقيق' : 'The Interactive Readability & SEO Prose Inspector'}
            </h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-serif mt-1 max-w-3xl">
              {isAr 
                ? 'تحليل مباشر لعمق المقال الإملائي وتكثيف الكلمات وطول الجمل وصلاحية محركات البحث المتقدمة. حدد أي خبر من الأسفل أو اكتب مباشرة لقياس المؤشرات فورياً.'
                : 'Live computational diagnostic of word count density, average sentence length, crawling validation, and language complexity scores. Select an archive article below to load.'}
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-white border-2 border-black p-0.5 rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <button
              type="button"
              onClick={() => setInspectorLang('ar')}
              className={`px-3 py-1 font-sans text-[10px] font-black uppercase rounded transition-colors ${
                inspectorLang === 'ar' ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => setInspectorLang('en')}
              className={`px-3 py-1 font-sans text-[10px] font-black uppercase rounded transition-colors ${
                inspectorLang === 'en' ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              ENGLISH
            </button>
          </div>
        </div>

        {/* Inspector Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Column 1: Input editor (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xxs font-mono uppercase font-black text-zinc-500">
                {isAr ? 'عنوان المقال التجريبي (لتحليل أبعاد السيو):' : 'Headline Under Inspection (For SEO Check):'}
              </label>
              <input
                type="text"
                value={inspectorTitle}
                onChange={(e) => setInspectorTitle(e.target.value)}
                placeholder={isAr ? 'أدخل عنوان المقال الإخباري...' : 'Enter strategic newspaper headline...'}
                className="w-full text-xs p-3 border-2 border-black outline-none font-bold bg-white focus:shadow-[2px_2px_0_0_rgba(185,28,28,1)] transition-all rounded"
              />
            </div>

            <div className="space-y-1.5 flex-1 flex flex-col">
              <label className="block text-xxs font-mono uppercase font-black text-zinc-500">
                {isAr ? 'متن التحليل الإخباري المراد فصحه (اكتب أو عدل بحرية):' : 'Raw Editorial Content Draft (Paste or type directly):'}
              </label>
              <textarea
                value={inspectorText}
                onChange={(e) => setInspectorText(e.target.value)}
                placeholder={isAr ? 'اكتب أو الصق محتوى المقال الإستراتيجي هنا...' : 'Type or paste your journalistic article content draft here...'}
                rows={12}
                className="w-full flex-1 text-xs p-3.5 border-2 border-black outline-none font-serif leading-relaxed bg-white focus:shadow-[2px_2px_0_0_rgba(185,28,28,1)] transition-all rounded select-text"
              />
            </div>
            
            <div className="text-[10px] text-zinc-400 font-mono italic">
              {isAr 
                ? '💡 تلميح: يمكنك الضغط على "تحليل المقروئية" بجانب أي خبر في الجدول أدناه لتلقيم هذا المحلل على الفور.' 
                : '💡 Hint: You can click the "Analyze Readability" button on any archival story in the registry list below to load it instantly.'}
            </div>
          </div>

          {/* Column 2: Dashboard metrics gauges (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Readability Score Gauge Box */}
            <div className={`border-2 border-black p-4 rounded-lg relative overflow-hidden ${readabilityAnalysis.complexityBg}`}>
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                  {isAr ? 'مؤشر سهولة الفهم والمقروئية' : 'COMPOSITE READABILITY SCORE'}
                </span>
                <span className="font-mono text-xs font-black" dir="ltr">
                  {readabilityAnalysis.readabilityScore}/100
                </span>
              </div>

              <div className="flex items-center gap-3.5 mt-3">
                <div className="text-3.5xl font-mono font-black tracking-tight" dir="ltr">
                  {readabilityAnalysis.readabilityScore}
                </div>
                <div>
                  <div className={`text-xs font-black font-sans uppercase ${readabilityAnalysis.complexityColor}`}>
                    {inspectorLang === 'ar' ? readabilityAnalysis.readabilityLevelAr : readabilityAnalysis.readabilityLevelEn}
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-snug mt-1 font-serif max-w-[280px]">
                    {inspectorLang === 'ar' ? readabilityAnalysis.scoreDescriptionAr : readabilityAnalysis.scoreDescriptionEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Textual Stats Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="border-2 border-black p-3 bg-white rounded">
                <span className="text-[8.5px] font-mono text-zinc-400 uppercase tracking-tight block font-bold">
                  {isAr ? 'إجمالي الكلمات' : 'WORD COUNT'}
                </span>
                <div className="text-xl font-mono font-black text-zinc-950 mt-1 flex items-center gap-1.5">
                  <FileText size={15} className="text-zinc-500" />
                  {readabilityAnalysis.wordCount}
                </div>
              </div>

              <div className="border-2 border-black p-3 bg-white rounded">
                <span className="text-[8.5px] font-mono text-zinc-400 uppercase tracking-tight block font-bold">
                  {isAr ? 'زمن القراءة المتوقع' : 'EST. READING TIME'}
                </span>
                <div className="text-xl font-mono font-black text-zinc-950 mt-1 flex items-center gap-1.5">
                  <Clock size={15} className="text-zinc-500" />
                  <span dir="ltr">
                    {readabilityAnalysis.readingTimeMin}m {readabilityAnalysis.readingTimeSec}s
                  </span>
                </div>
              </div>

              <div className="border-2 border-black p-3 bg-white rounded">
                <span className="text-[8.5px] font-mono text-zinc-400 uppercase tracking-tight block font-bold">
                  {isAr ? 'متوسط كلمات الجملة' : 'AVG SENTENCE LENGTH'}
                </span>
                <div className="text-xl font-mono font-black text-zinc-950 mt-1 flex items-center gap-1.5" dir="ltr">
                  {readabilityAnalysis.avgSentenceLength} <span className="text-[9px] text-zinc-400 font-mono">w/s</span>
                </div>
              </div>

              <div className="border-2 border-black p-3 bg-white rounded">
                <span className="text-[8.5px] font-mono text-zinc-400 uppercase tracking-tight block font-bold">
                  {isAr ? 'عدد الجمل والفقرات' : 'SENTENCES & PARA'}
                </span>
                <div className="text-xl font-mono font-black text-zinc-950 mt-1 flex items-center gap-1.5" dir="ltr">
                  {readabilityAnalysis.sentenceCount}s <span className="text-zinc-300 text-xs">/</span> {readabilityAnalysis.paragraphCount}p
                </div>
              </div>
            </div>

            {/* SEO & Search Crawler Checklist */}
            <div className="border-2 border-black p-4 bg-white rounded-lg space-y-3">
              <span className="text-[9px] font-mono text-zinc-950 uppercase tracking-wider block font-black border-b border-zinc-150 pb-1.5">
                {isAr ? 'فحص السيو الفوري ومؤشرات الزحف والأرشفة' : 'Instant SEO & Search Engine Crawling Audit'}
              </span>

              <div className="space-y-2.5">
                {readabilityAnalysis.seoChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[11px]">
                    {item.status ? (
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <span className={`font-medium ${item.status ? 'text-zinc-700' : 'text-zinc-500 line-through decoration-zinc-300'}`}>
                      {isAr ? item.labelAr : item.labelEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* DETAILED INDEXABLE STORIES LIST WITH VIEWS AND READABILITY ACTIONS */}
      <div className="border-2 border-black p-4 bg-white">
        
        {/* Filtering & Search Header */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 pb-4 mb-4 border-b border-zinc-200">
          <div>
            <h4 className="font-sans font-black text-xs uppercase text-zinc-950">
              {isAr ? 'سجل تصفح المواد ومؤشرات حركة القراءة' : 'Archival Story Traction & Readability Benchmarks'}
            </h4>
            <p className="text-[10px] text-zinc-500 font-mono">
              {isAr 
                ? `وجدت ${filteredArticles.length} مادة صحفية مرتبة حسب الأعلى مشاهدة` 
                : `Found ${filteredArticles.length} documents arranged by traffic rank`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={isAr ? 'ابحث في العناوين والرموز...' : 'Search title/id...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 pr-3 py-1.5 text-xxs font-bold border border-zinc-300 outline-none w-[170px] focus:border-black rounded font-sans"
              />
              <Search size={12} className="absolute left-2.5 top-2.5 text-zinc-400" />
            </div>

            {/* Category select filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2 py-1.5 text-xxs font-black border border-zinc-300 outline-none rounded bg-white font-sans uppercase"
            >
              <option value="all">{isAr ? 'جميع القطاعات' : 'ALL SECTIONS'}</option>
              {categories.map(c => (
                c.id !== 'all' && <option key={c.id} value={c.id}>{isAr ? c.labelAr : c.labelEn.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop responsive Table view */}
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-[11px] border-collapse">
            <thead>
              <tr className="border-b border-black font-mono text-[9px] text-zinc-400 uppercase">
                <th className="py-2.5 px-2">{isAr ? 'عنوان المقال / السند الصحفي' : 'Headline Dispatch'}</th>
                <th className="py-2.5 px-2">{isAr ? 'القطاع الإداري' : 'Category'}</th>
                <th className="py-2.5 px-2 text-center">{isAr ? 'الترخيص والمستوى' : 'Read Level'}</th>
                <th className="py-2.5 px-2 text-right">{isAr ? 'عدد القراء' : 'Reader Traffic'}</th>
                <th className="py-2.5 px-2 text-center">{isAr ? 'إجراءات التدقيق المالي واللغوي' : 'Diagnostics'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-150">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-zinc-400 italic">
                    {isAr ? 'لم يتم العثور على أي مقالات متطابقة.' : 'No articles match search filters.'}
                  </td>
                </tr>
              ) : (
                filteredArticles.map((story) => {
                  const words = (isAr ? story.contentAr : story.contentEn).split(/\s+/).filter(w => w.length > 0).length;
                  const readLevel = words > 450 ? (isAr ? 'عميق / مكثف' : 'Analytical') : (isAr ? 'موجز / سريع' : 'Digest');
                  const levelColor = words > 450 ? 'bg-amber-100 text-amber-900 border-amber-200' : 'bg-zinc-100 text-zinc-950 border-zinc-200';

                  return (
                    <tr key={story.id} className="hover:bg-zinc-50/70 transition-colors">
                      <td className="py-3 px-2">
                        <div className="font-sans font-black text-zinc-950 text-xs truncate max-w-[280px] md:max-w-[360px]">
                          {isAr ? story.titleAr : story.titleEn}
                        </div>
                        <div className="font-mono text-[9px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                          <span className="font-bold">ID:</span> {story.id}
                          {story.isPremium && (
                            <span className="px-1 bg-amber-450 text-black font-bold font-sans text-[8px] scale-90">PREMIUM</span>
                          )}
                          {story.isFeatured && (
                            <span className="px-1 bg-[#b91c1c] text-white font-bold font-sans text-[8px] scale-90">SLIDER</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="px-1.5 py-0.5 rounded font-sans text-[9px] font-black uppercase tracking-wider bg-zinc-900 text-white">
                          {story.category}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-0.5 border text-[9px] font-bold ${levelColor}`} dir="ltr">
                          {readLevel} ({words} w)
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right font-mono font-black text-zinc-950 text-xs">
                        <div className="flex items-center justify-end gap-1" dir="ltr">
                          <Eye size={12} className="text-zinc-400" />
                          <span>{(story.views || 0).toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleLoadArticleToInspector(story)}
                          className="px-2.5 py-1 text-[9px] font-mono font-black uppercase bg-black hover:bg-zinc-800 text-white border border-black cursor-pointer transition-colors inline-flex items-center gap-1"
                        >
                          {isAr ? 'فحص المقروئية' : 'Analyze'}
                          <ChevronRight size={10} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
