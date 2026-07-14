import React, { useState, useMemo } from 'react';
import { Article, NavigationTab } from '../types';
import AdminTrafficMonitor from './AdminTrafficMonitor';
import { 
  TrendingUp, TrendingDown, Eye, BookOpen, Users, 
  AlertCircle, CheckCircle2, Clock, BarChart3, Search, 
  FileText, RefreshCw, Gauge, ChevronRight, HelpCircle,
  Activity, Layers, Award, Globe, MapPin, Play, Pause, Filter,
  Smartphone, Laptop, Tablet
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, Cell,
  ScatterChart, Scatter, LabelList, Legend
} from 'recharts';

interface AdminDashboardStatsProps {
  language: 'ar' | 'en';
  articles: Article[];
  categories: NavigationTab[];
}

export default function AdminDashboardStats({ language, articles, categories }: AdminDashboardStatsProps) {
  const isAr = language === 'ar';
  
  // Tab Toggle between 'traffic', 'readability', and 'live-logs'
  const [activeMetricTab, setActiveMetricTab] = useState<'traffic' | 'readability' | 'live-logs'>('traffic');

  // Real-Time Traffic & Visitor Logs States
  const [logs, setLogs] = useState<any[]>([]);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [logsFilter, setLogsFilter] = useState<'all' | 'premium' | 'lebanon' | 'economy'>('all');
  const [selectedLogCountry, setSelectedLogCountry] = useState<string>('all');

  // Generate initial list of logs on load
  React.useEffect(() => {
    if (articles.length === 0) return;

    const countries = [
      { code: 'LB', nameAr: 'لبنان', nameEn: 'Lebanon', cityAr: 'بيروت', cityEn: 'Beirut', flag: '🇱🇧' },
      { code: 'SA', nameAr: 'السعودية', nameEn: 'Saudi Arabia', cityAr: 'الرياض', cityEn: 'Riyadh', flag: '🇸🇦' },
      { code: 'AE', nameAr: 'الإمارات', nameEn: 'UAE', cityAr: 'دبي', cityEn: 'Dubai', flag: '🇦🇪' },
      { code: 'US', nameAr: 'أمريكا', nameEn: 'USA', cityAr: 'نيويورك', cityEn: 'New York', flag: '🇺🇸' },
      { code: 'FR', nameAr: 'فرنسا', nameEn: 'France', cityAr: 'باريس', cityEn: 'Paris', flag: '🇫🇷' },
      { code: 'EG', nameAr: 'مصر', nameEn: 'Egypt', cityAr: 'القاهرة', cityEn: 'Cairo', flag: '🇪🇬' },
      { code: 'JO', nameAr: 'الأردن', nameEn: 'Jordan', cityAr: 'عمان', cityEn: 'Amman', flag: '🇯🇴' },
      { code: 'KW', nameAr: 'الكويت', nameEn: 'Kuwait', cityAr: 'الكويت', cityEn: 'Kuwait City', flag: '🇰🇼' },
      { code: 'GB', nameAr: 'بريطانيا', nameEn: 'UK', cityAr: 'لندن', cityEn: 'London', flag: '🇬🇧' }
    ];

    const referrers = [
      'Google Discover', 'Google News', 'Direct Traffic', 'Twitter / X', 
      'LinkedIn', 'WhatsApp Broadcast', 'Bloomberg Terminal', 'Facebook'
    ];

    const devices = ['Mobile (Safari)', 'Mobile (Chrome)', 'Desktop (Chrome)', 'Desktop (Firefox)', 'Tablet (iPad)'];

    const initialLogs = Array.from({ length: 15 }).map((_, index) => {
      const country = countries[Math.floor(Math.random() * countries.length)];
      const referrer = referrers[Math.floor(Math.random() * referrers.length)];
      const device = devices[Math.floor(Math.random() * devices.length)];
      const randomArticle = articles[Math.floor(Math.random() * articles.length)];
      
      const timeOffsetMinutes = index * 2 + Math.floor(Math.random() * 2);
      const logTime = new Date(Date.now() - timeOffsetMinutes * 60 * 1000);

      const randomIp = `${Math.floor(Math.random() * 180) + 20}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`;

      return {
        id: `log-${Math.random().toString(36).substr(2, 9)}`,
        ip: randomIp,
        timestamp: logTime.toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        rawTimestamp: logTime,
        countryCode: country.code,
        countryAr: country.nameAr,
        countryEn: country.nameEn,
        cityAr: country.cityAr,
        cityEn: country.cityEn,
        flag: country.flag,
        storyId: randomArticle.id,
        storyTitleAr: randomArticle.titleAr,
        storyTitleEn: randomArticle.titleEn,
        category: randomArticle.category || 'news',
        isPremium: !!randomArticle.isPremium,
        referrer,
        durationSeconds: Math.floor(Math.random() * 240) + 15,
        actionAr: randomArticle.isPremium ? 'فتح تقرير مميز' : 'قراءة المقال الأسبوعي',
        actionEn: randomArticle.isPremium ? 'Unlocked Premium Story' : 'Read Article Dispatch',
        device
      };
    });

    setLogs(initialLogs);
  }, [articles, isAr]);

  // Dynamic Real-time log streaming simulator
  React.useEffect(() => {
    if (!isLiveStreaming || articles.length === 0) return;

    const interval = setInterval(() => {
      // 1. Randomly increment duration of existing logs (simulate visitor spending more time)
      setLogs(prevLogs => {
        const updatedLogs = prevLogs.map(log => {
          if (Math.random() > 0.4) {
            return {
              ...log,
              durationSeconds: log.durationSeconds + Math.floor(Math.random() * 3) + 1
            };
          }
          return log;
        });

        // 2. Add a new log entry 55% of the time
        if (Math.random() > 0.45) {
          const countries = [
            { code: 'LB', nameAr: 'لبنان', nameEn: 'Lebanon', cityAr: 'بيروت', cityEn: 'Beirut', flag: '🇱🇧' },
            { code: 'SA', nameAr: 'السعودية', nameEn: 'Saudi Arabia', cityAr: 'الرياض', cityEn: 'Riyadh', flag: '🇸🇦' },
            { code: 'AE', nameAr: 'الإمارات', nameEn: 'UAE', cityAr: 'دبي', cityEn: 'Dubai', flag: '🇦🇪' },
            { code: 'US', nameAr: 'أمريكا', nameEn: 'USA', cityAr: 'نيويورك', cityEn: 'New York', flag: '🇺🇸' },
            { code: 'FR', nameAr: 'فرنسا', nameEn: 'France', cityAr: 'باريس', cityEn: 'Paris', flag: '🇫🇷' },
            { code: 'EG', nameAr: 'مصر', nameEn: 'Egypt', cityAr: 'القاهرة', cityEn: 'Cairo', flag: '🇪🇬' },
            { code: 'JO', nameAr: 'الأردن', nameEn: 'Jordan', cityAr: 'عمان', cityEn: 'Amman', flag: '🇯🇴' },
            { code: 'KW', nameAr: 'الكويت', nameEn: 'Kuwait', cityAr: 'الكويت', cityEn: 'Kuwait City', flag: '🇰🇼' },
            { code: 'GB', nameAr: 'بريطانيا', nameEn: 'UK', cityAr: 'لندن', cityEn: 'London', flag: '🇬🇧' }
          ];
          const referrers = [
            'Google Discover', 'Google News', 'Direct Traffic', 'Twitter / X', 
            'LinkedIn', 'WhatsApp Broadcast', 'Bloomberg Terminal', 'Facebook'
          ];
          const devices = ['Mobile (Safari)', 'Mobile (Chrome)', 'Desktop (Chrome)', 'Desktop (Firefox)', 'Tablet (iPad)'];

          const country = countries[Math.floor(Math.random() * countries.length)];
          const referrer = referrers[Math.floor(Math.random() * referrers.length)];
          const device = devices[Math.floor(Math.random() * devices.length)];
          const randomArticle = articles[Math.floor(Math.random() * articles.length)];
          const randomIp = `${Math.floor(Math.random() * 180) + 20}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`;
          const logTime = new Date();

          const newLog = {
            id: `log-${Math.random().toString(36).substr(2, 9)}`,
            ip: randomIp,
            timestamp: logTime.toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            rawTimestamp: logTime,
            countryCode: country.code,
            countryAr: country.nameAr,
            countryEn: country.nameEn,
            cityAr: country.cityAr,
            cityEn: country.cityEn,
            flag: country.flag,
            storyId: randomArticle.id,
            storyTitleAr: randomArticle.titleAr,
            storyTitleEn: randomArticle.titleEn,
            category: randomArticle.category || 'news',
            isPremium: !!randomArticle.isPremium,
            referrer,
            durationSeconds: Math.floor(Math.random() * 15) + 5,
            actionAr: randomArticle.isPremium ? 'فتح تقرير مميز' : 'قراءة المقال الأسبوعي',
            actionEn: randomArticle.isPremium ? 'Unlocked Premium Story' : 'Read Article Dispatch',
            device
          };

          return [newLog, ...updatedLogs].slice(0, 35);
        }

        return updatedLogs;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isLiveStreaming, articles, isAr]);

  // Filtered logs based on categories and countries selected
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Filter by category
      if (logsFilter === 'premium' && !log.isPremium) return false;
      if (logsFilter === 'lebanon' && log.category !== 'lebanon') return false;
      if (logsFilter === 'economy' && !['economy', 'markets', 'arab-markets'].includes(log.category)) return false;

      // Filter by country
      if (selectedLogCountry !== 'all' && log.countryCode !== selectedLogCountry) return false;

      return true;
    });
  }, [logs, logsFilter, selectedLogCountry]);

  // Compute geographical sharing statistics
  const geoShareStats = useMemo(() => {
    const counts: { [key: string]: { count: number; nameAr: string; nameEn: string; flag: string } } = {};
    logs.forEach(log => {
      const key = log.countryCode;
      if (!counts[key]) {
        counts[key] = {
          count: 0,
          nameAr: log.countryAr,
          nameEn: log.countryEn,
          flag: log.flag
        };
      }
      counts[key].count++;
    });

    const total = logs.length || 1;
    return Object.entries(counts)
      .map(([code, data]) => ({
        code,
        count: data.count,
        percentage: Math.round((data.count / total) * 100),
        name: isAr ? data.nameAr : data.nameEn,
        flag: data.flag
      }))
      .sort((a, b) => b.count - a.count);
  }, [logs, isAr]);

  // Interactive Readability Text Inspector state
  const [inspectorText, setInspectorText] = useState('');
  const [inspectorLang, setInspectorLang] = useState<'ar' | 'en'>(isAr ? 'ar' : 'en');
  const [inspectorTitle, setInspectorTitle] = useState('');

  // Initial onboarding load for text inspector
  React.useEffect(() => {
    if (articles.length > 0 && !inspectorText) {
      const art = articles[0];
      setInspectorTitle(isAr ? art.titleAr : art.titleEn);
      setInspectorText(isAr ? art.contentAr : art.contentEn);
      setInspectorLang(isAr ? 'ar' : 'en');
    }
  }, [articles, isAr]);

  // Load a specific article to the inspector
  const handleLoadArticle = (article: Article) => {
    setInspectorTitle(isAr ? article.titleAr : article.titleEn);
    setInspectorText(isAr ? article.contentAr : article.contentEn);
    setInspectorLang(isAr ? 'ar' : 'en');
    const el = document.getElementById('stats-text-inspector');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Aggregated traffic numbers
  const trafficMetrics = useMemo(() => {
    const totalArticles = articles.length;
    const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
    const avgViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0;
    const uniqueVisitors = Math.round(totalViews * 0.65);
    const bounceRate = Math.max(28, Math.min(65, 52 - (articles.filter(a => a.isPremium).length / (totalArticles || 1)) * 25)).toFixed(1);

    return {
      totalArticles,
      totalViews,
      avgViews,
      uniqueVisitors,
      bounceRate
    };
  }, [articles]);

  // 30 Days Traffic History data generator
  const trafficHistory = useMemo(() => {
    const data = [];
    const baseViews = trafficMetrics.totalViews / 30 || 2200;
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const label = date.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' });
      
      const fluctuation = Math.sin(i * 0.4) * 0.2 + Math.cos(i * 0.15) * 0.12;
      const views = Math.round(baseViews * (1 + fluctuation));
      const uniques = Math.round(views * 0.65);

      data.push({
        date: label,
        Views: views,
        Uniques: uniques
      });
    }
    return data;
  }, [trafficMetrics.totalViews, isAr]);

  // Views by Category Share
  const categoryTrafficData = useMemo(() => {
    return categories
      .filter(cat => cat.id !== 'all')
      .map(cat => {
        const catArticles = articles.filter(a => a.category === cat.id);
        const views = catArticles.reduce((sum, a) => sum + (a.views || 0), 0);
        return {
          name: cat.labelEn,
          nameAr: cat.labelAr,
          views,
          count: catArticles.length
        };
      })
      .sort((a, b) => b.views - a.views);
  }, [articles, categories]);

  // Helper: Client-side syllable estimator
  const estimateSyllables = (word: string) => {
    const cleaned = word.toLowerCase().replace(/[^a-z]/g, '');
    if (cleaned.length <= 3) return 1;
    const matches = cleaned.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  };

  // Readability indexes generator for site-wide articles
  const articlesReadabilityData = useMemo(() => {
    return articles.map(art => {
      const title = isAr ? art.titleAr : art.titleEn;
      const content = isAr ? art.contentAr : art.contentEn;
      const cleanText = content.trim();
      const wordCount = cleanText.split(/\s+/).filter(w => w.length > 0).length || 1;
      const sentenceCount = cleanText.split(/[.!?؟]+/).filter(s => s.trim().length > 0).length || 1;
      
      const avgSentenceLength = Number((wordCount / sentenceCount).toFixed(1));
      
      // Calculate readability score
      let score = 50; // default baseline
      if (isAr) {
        // Arabic complexity metric
        const chars = cleanText.length;
        const avgWordLength = chars / wordCount;
        const lengthPenalty = Math.max(0, (avgWordLength - 4.5) * 15);
        const sentencePenalty = Math.max(0, (avgSentenceLength - 12) * 2.5);
        score = Math.round(Math.max(10, Math.min(100, 95 - lengthPenalty - sentencePenalty)));
      } else {
        // English Flesch formula approx
        const words = cleanText.split(/\s+/).filter(w => w.length > 0);
        const totalSyllables = words.reduce((sum, w) => sum + estimateSyllables(w), 0);
        const avgSyllables = totalSyllables / wordCount;
        const ease = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllables);
        score = Math.round(Math.max(10, Math.min(100, ease)));
      }

      // Readability tier group
      let level = '';
      let color = '';
      if (score >= 75) {
        level = isAr ? 'سهل جداً' : 'Easy';
        color = '#10b981'; // emerald
      } else if (score >= 55) {
        level = isAr ? 'مبسط / عام' : 'Standard';
        color = '#22c55e'; // green
      } else if (score >= 35) {
        level = isAr ? 'تحليلي عميق' : 'Analytical';
        color = '#f59e0b'; // amber
      } else {
        level = isAr ? 'تخصصي معقد' : 'Academic';
        color = '#ef4444'; // red
      }

      return {
        id: art.id,
        title,
        wordCount,
        sentenceCount,
        avgSentenceLength,
        score,
        level,
        color,
        views: art.views || 0
      };
    });
  }, [articles, isAr]);

  // Readability Breakdown Summary counts
  const readabilityBreakdown = useMemo(() => {
    const counts = { Easy: 0, Standard: 0, Analytical: 0, Academic: 0 };
    articlesReadabilityData.forEach(item => {
      if (item.score >= 75) counts.Easy++;
      else if (item.score >= 55) counts.Standard++;
      else if (item.score >= 35) counts.Analytical++;
      else counts.Academic++;
    });

    return [
      { name: isAr ? 'سهل (٧٥+)' : 'Easy (75+)', count: counts.Easy, fill: '#10b981' },
      { name: isAr ? 'مبسط (٥٥-٧٤)' : 'Standard (55-74)', count: counts.Standard, fill: '#22c55e' },
      { name: isAr ? 'تحليلي (٣٥-٥٤)' : 'Analytical (35-54)', count: counts.Analytical, fill: '#f59e0b' },
      { name: isAr ? 'معقد (<٣٥)' : 'Academic (<35)', count: counts.Academic, fill: '#ef4444' }
    ];
  }, [articlesReadabilityData, isAr]);

  // Selected Article Inspector Readability Calculations
  const inspectorReadabilityAnalysis = useMemo(() => {
    if (!inspectorText.trim()) {
      return {
        wordCount: 0,
        sentenceCount: 0,
        avgSentenceLength: 0,
        score: 0,
        level: isAr ? 'يرجى إدخال نص للتحليل' : 'Enter text to analyze',
        readingTime: '0m',
        colorClass: 'text-zinc-400',
        bgClass: 'bg-zinc-100 border-zinc-200',
        checklist: []
      };
    }

    const text = inspectorText.trim();
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const sentences = text.split(/[.!?؟]+/).filter(s => s.trim().length > 0);
    const sentenceCount = Math.max(1, sentences.length);
    const avgSentenceLength = Number((wordCount / sentenceCount).toFixed(1));

    // Syllables and score calculation
    let score = 50;
    let level = '';
    let colorClass = 'text-green-600';
    let bgClass = 'bg-green-50 border-green-200';

    if (inspectorLang === 'ar') {
      const avgWordLength = text.length / wordCount;
      const lengthPenalty = Math.max(0, (avgWordLength - 4.5) * 15);
      const sentencePenalty = Math.max(0, (avgSentenceLength - 12) * 2.5);
      score = Math.round(Math.max(10, Math.min(100, 95 - lengthPenalty - sentencePenalty)));

      if (score >= 75) {
        level = 'سهل ومبسط جداً';
        colorClass = 'text-emerald-700';
        bgClass = 'bg-emerald-50 border-emerald-200';
      } else if (score >= 55) {
        level = 'صحافة عامة / مبسط';
        colorClass = 'text-green-700';
        bgClass = 'bg-green-50 border-green-200';
      } else if (score >= 35) {
        level = 'تحليلي عميق / نموذجي';
        colorClass = 'text-amber-700';
        bgClass = 'bg-amber-50 border-amber-200';
      } else {
        level = 'مكثف جداً / أكاديمي معقد';
        colorClass = 'text-red-700';
        bgClass = 'bg-red-50 border-red-200';
      }
    } else {
      const totalSyllables = words.reduce((sum, w) => sum + estimateSyllables(w), 0);
      const avgSyllables = totalSyllables / wordCount;
      const ease = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllables);
      score = Math.round(Math.max(10, Math.min(100, ease)));

      if (score >= 75) {
        level = 'Easy / Consumer News';
        colorClass = 'text-emerald-700';
        bgClass = 'bg-emerald-50 border-emerald-200';
      } else if (score >= 55) {
        level = 'Standard / Daily Paper';
        colorClass = 'text-green-700';
        bgClass = 'bg-green-50 border-green-200';
      } else if (score >= 35) {
        level = 'Analytical / Sovereign Intelligence';
        colorClass = 'text-amber-700';
        bgClass = 'bg-amber-50 border-amber-200';
      } else {
        level = 'Complex Academic / Dense Report';
        colorClass = 'text-red-700';
        bgClass = 'bg-red-50 border-red-200';
      }
    }

    // Estimated reading time (160 words per minute average)
    const readingTimeMin = Math.max(1, Math.round(wordCount / 160));
    const readingTime = `${readingTimeMin} min`;

    // Real-time SEO check lists
    const checklist = [
      {
        labelAr: 'عنوان المقال متزن (بين ٤٠ و ٨٥ حرفاً)',
        labelEn: 'Headline contains ideal width (40-85 chars)',
        status: inspectorTitle.length >= 40 && inspectorTitle.length <= 85
      },
      {
        labelAr: 'عمق التحليل ممتاز للأرشفة والزحف (٢٠٠+ كلمة)',
        labelEn: 'Optimal length for search crawlers (200+ words)',
        status: wordCount >= 200
      },
      {
        labelAr: 'طول الجمل مثالي للراحة البصرية (أقل من ٢٥ كلمة)',
        labelEn: 'Short sentence structure for legibility (under 25 words)',
        status: avgSentenceLength <= 25
      }
    ];

    return {
      wordCount,
      sentenceCount,
      avgSentenceLength,
      score,
      level,
      readingTime,
      colorClass,
      bgClass,
      checklist
    };
  }, [inspectorText, inspectorLang, inspectorTitle]);

  return (
    <div className="border-2 border-black p-5 bg-neutral-50 rounded space-y-6 select-text" id="admin-dashboard-stats-component">
      
      {/* Metric Category Toggle Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-black pb-4">
        <div>
          <h3 className="font-sans font-black text-base uppercase flex items-center gap-2 text-zinc-950">
            <BarChart3 size={18} className="text-[#b91c1c]" />
            {isAr ? 'مرصد مؤشرات القراءة ومعدلات حركة الموقع' : 'ADMIN METRICS & ENGAGEMENT COCKPIT'}
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
            {isAr 
              ? 'مراقبة فورية لأداء النشر، ومعدلات ارتداد القراء، والمقروئية اللغوية لجميع تحليلات جريدة الوراق.' 
              : 'Audit publication performance, reading complexity indexes, and traffic telemetry.'}
          </p>
        </div>

        {/* Traffic vs Readability Tab Switcher */}
        <div className="flex bg-white border-2 border-black p-0.5 rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)] self-stretch sm:self-auto justify-center flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setActiveMetricTab('traffic')}
            className={`flex-1 sm:flex-none px-3 py-1.5 font-sans text-xs font-black uppercase rounded transition-colors flex items-center justify-center gap-1.5 ${
              activeMetricTab === 'traffic' ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <Activity size={13} />
            {isAr ? 'حركة الزوار وتدفق القراء' : 'Traffic Metrics'}
          </button>
          <button
            type="button"
            onClick={() => setActiveMetricTab('readability')}
            className={`flex-1 sm:flex-none px-3 py-1.5 font-sans text-xs font-black uppercase rounded transition-colors flex items-center justify-center gap-1.5 ${
              activeMetricTab === 'readability' ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <Gauge size={13} />
            {isAr ? 'تحليل ومؤشر المقروئية' : 'Readability Analysis'}
          </button>
          <button
            type="button"
            onClick={() => setActiveMetricTab('live-logs')}
            className={`flex-1 sm:flex-none px-3 py-1.5 font-sans text-xs font-black uppercase rounded transition-colors flex items-center justify-center gap-1.5 ${
              activeMetricTab === 'live-logs' ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <Globe size={13} className="animate-pulse text-[#b91c1c]" />
            {isAr ? 'سجل التتبع الجغرافي الفوري' : 'Live Logs & Geolocation'}
          </button>
        </div>
      </div>

      {/* METRIC SUB-VIEWS */}
      {activeMetricTab === 'traffic' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Traffic Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border-2 border-black p-4 bg-white rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                {isAr ? 'إجمالي مشاهدات المقالات' : 'TOTAL ARTICLE VIEWS'}
              </span>
              <div className="text-2xl font-black font-mono mt-1 text-zinc-950" dir="ltr">
                {trafficMetrics.totalViews.toLocaleString()}
              </div>
              <span className="text-[8.5px] text-emerald-600 font-mono font-bold block mt-1 flex items-center gap-0.5">
                <TrendingUp size={11} /> +12.4% {isAr ? 'هذا الأسبوع' : 'this week'}
              </span>
            </div>

            <div className="border-2 border-black p-4 bg-white rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                {isAr ? 'الزوار الفريدين المقدرين' : 'EST. UNIQUE VISITORS'}
              </span>
              <div className="text-2xl font-black font-mono mt-1 text-zinc-950" dir="ltr">
                {trafficMetrics.uniqueVisitors.toLocaleString()}
              </div>
              <span className="text-[8.5px] text-emerald-600 font-mono font-bold block mt-1 flex items-center gap-0.5">
                <TrendingUp size={11} /> +8.1% {isAr ? 'نمو شهري' : 'monthly growth'}
              </span>
            </div>

            <div className="border-2 border-black p-4 bg-white rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                {isAr ? 'معدل الارتداد العام' : 'BOUNCE RATE INDEX'}
              </span>
              <div className="text-2xl font-black font-mono mt-1 text-red-650" dir="ltr">
                {trafficMetrics.bounceRate}%
              </div>
              <span className="text-[8.5px] text-zinc-400 font-mono block mt-1">
                {isAr ? 'معدل مغادرة الصفحة الواحدة' : 'Single page exit count'}
              </span>
            </div>

            <div className="border-2 border-black p-4 bg-black text-white rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span className="text-[8.5px] font-mono text-zinc-300 uppercase tracking-wider block font-bold">
                {isAr ? 'متوسط مشاهدة التحليل' : 'AVERAGE ARTICLE READS'}
              </span>
              <div className="text-2xl font-black font-mono mt-1 text-amber-400" dir="ltr">
                {trafficMetrics.avgViews}
              </div>
              <span className="text-[8.5px] text-zinc-400 font-mono block mt-1">
                {isAr ? 'متوسط نقرات كل مقال' : 'Average views per dispatch'}
              </span>
            </div>
          </div>

          {/* Traffic Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 30 Days Trend */}
            <div className="lg:col-span-8 border-2 border-black p-4 bg-white rounded">
              <h4 className="font-sans font-black text-xs uppercase text-zinc-900 border-b border-zinc-200 pb-2 mb-3.5 flex items-center gap-1.5">
                <Users size={14} className="text-[#b91c1c]" />
                {isAr ? 'تطور مؤشرات تصفح وحركة خادم النشر (آخر ٣٠ يوماً)' : 'Server Daily Hits & Traffic Trends (Last 30 Days)'}
              </h4>
              
              <div className="h-[240px] w-full font-mono text-[10px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficHistory} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="trafficColorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#b91c1c" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="trafficColorUniques" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#000000" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
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
                        border: '2px solid #000',
                        fontFamily: 'monospace',
                        fontSize: '11px'
                      }} 
                    />
                    <Area type="monotone" dataKey="Views" stroke="#b91c1c" strokeWidth={2.5} fillOpacity={1} fill="url(#trafficColorViews)" name={isAr ? 'الزيارات الإجمالية' : 'Total Views'} />
                    <Area type="monotone" dataKey="Uniques" stroke="#000000" strokeWidth={1.5} fillOpacity={1} fill="url(#trafficColorUniques)" name={isAr ? 'الزوار الفريدين' : 'Unique Visitors'} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Share */}
            <div className="lg:col-span-4 border-2 border-black p-4 bg-white rounded flex flex-col justify-between">
              <div>
                <h4 className="font-sans font-black text-xs uppercase text-zinc-900 border-b border-zinc-200 pb-2 mb-3.5 flex items-center gap-1.5">
                  <Layers size={14} />
                  {isAr ? 'مستويات التصفح حسب قطاع التغطية' : 'Traffic Share by Section'}
                </h4>
                
                <div className="h-[200px] w-full font-mono text-[9px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryTrafficData} layout="vertical" margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
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
                      <Bar dataKey="views" fill="#18181b" name={isAr ? 'مشاهدات' : 'Views'} barSize={12}>
                        {categoryTrafficData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#b91c1c' : index === 1 ? '#27272a' : '#71717a'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-2 text-[9px] font-mono text-zinc-400 leading-snug">
                {isAr 
                  ? '💡 تلميح: المقالات الحصرية (Exclusives) تمثل الحجم الأكبر من النقرات النشطة حالياً.' 
                  : '💡 Exclusives category holds the dominant share of active client queries.'}
              </div>
            </div>

          </div>

        </div>
      )}

      {activeMetricTab === 'readability' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Readability Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border-2 border-black p-4 bg-white rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                {isAr ? 'متوسط مقروئية الموقع' : 'AVG READABILITY SCORE'}
              </span>
              <div className="text-2xl font-black font-mono mt-1 text-zinc-950" dir="ltr">
                {Math.round(articlesReadabilityData.reduce((sum, a) => sum + a.score, 0) / (articlesReadabilityData.length || 1))} / 100
              </div>
              <span className="text-[8.5px] text-zinc-400 font-mono block mt-1">
                {isAr ? 'المتوسط الحسابي للنصوص' : 'Flesch / Arabic complex average'}
              </span>
            </div>

            <div className="border-2 border-black p-4 bg-white rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                {isAr ? 'المستوى اللغوي السائد' : 'CONSENSUS DIFFICULTY'}
              </span>
              <div className="text-2xl font-black font-sans mt-1 text-amber-600 uppercase">
                {isAr ? 'تحليلي عميق' : 'Analytical'}
              </div>
              <span className="text-[8.5px] text-zinc-400 font-mono block mt-1">
                {isAr ? 'ملائم للمثقفين والنخب' : 'Ideal for Al-Warraq standard'}
              </span>
            </div>

            <div className="border-2 border-black p-4 bg-white rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                {isAr ? 'معدل الكلمات الكافي' : 'IDEAL DEPTH RATIO'}
              </span>
              <div className="text-2xl font-black font-mono mt-1 text-emerald-600" dir="ltr">
                {Math.round((articlesReadabilityData.filter(a => a.wordCount >= 200).length / (articlesReadabilityData.length || 1)) * 100)}%
              </div>
              <span className="text-[8.5px] text-zinc-400 font-mono block mt-1">
                {isAr ? 'مقال يضم أكثر من ٢٠٠ كلمة' : 'Articles exceeding 200 words'}
              </span>
            </div>

            <div className="border-2 border-black p-4 bg-black text-white rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span className="text-[8.5px] font-mono text-zinc-300 uppercase tracking-wider block font-bold">
                {isAr ? 'متوسط طول الجملة' : 'AVG SENTENCE LENGTH'}
              </span>
              <div className="text-2xl font-black font-mono mt-1 text-amber-400" dir="ltr">
                {Number((articlesReadabilityData.reduce((sum, a) => sum + a.avgSentenceLength, 0) / (articlesReadabilityData.length || 1)).toFixed(1))}
              </div>
              <span className="text-[8.5px] text-zinc-400 font-mono block mt-1">
                {isAr ? 'كلمة لكل جملة بالمتوسط' : 'Words per sentence average'}
              </span>
            </div>
          </div>

          {/* Readability charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Readability distribution across articles */}
            <div className="lg:col-span-8 border-2 border-black p-4 bg-white rounded">
              <h4 className="font-sans font-black text-xs uppercase text-zinc-900 border-b border-zinc-200 pb-2 mb-3.5 flex items-center gap-1.5">
                <BookOpen size={14} className="text-[#b91c1c]" />
                {isAr ? 'توزيع درجات مقروئية المقالات الفردية والترابط اللغوي' : 'Distribution of Readability Scores & Text Complexity'}
              </h4>

              <div className="h-[240px] w-full font-mono text-[9px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={articlesReadabilityData.slice(0, 8)} margin={{ top: 15, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                    <XAxis dataKey="id" stroke="#71717a" fontSize={8} />
                    <YAxis domain={[0, 100]} stroke="#71717a" fontSize={9} />
                    <RechartsTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-zinc-950 text-white p-3 border-2 border-black font-mono text-xxs leading-relaxed max-w-[240px]">
                              <p className="font-bold border-b border-zinc-700 pb-1 mb-1 truncate">{data.title}</p>
                              <p>{isAr ? 'مؤشر المقروئية:' : 'Readability Score:'} <span className="font-bold text-amber-400">{data.score}/100</span> ({data.level})</p>
                              <p>{isAr ? 'متوسط الكلمات/الجملة:' : 'Words/Sentence:'} <span className="font-bold">{data.avgSentenceLength}</span></p>
                              <p>{isAr ? 'إجمالي الكلمات:' : 'Word Count:'} <span className="font-bold">{data.wordCount}</span></p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="score" fill="#22c55e" name={isAr ? 'مؤشر السهولة' : 'Readability Ease'} barSize={25}>
                      {articlesReadabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Readability levels breakdown pie/bar */}
            <div className="lg:col-span-4 border-2 border-black p-4 bg-white rounded flex flex-col justify-between">
              <div>
                <h4 className="font-sans font-black text-xs uppercase text-zinc-900 border-b border-zinc-200 pb-2 mb-3.5 flex items-center gap-1.5">
                  <Award size={14} />
                  {isAr ? 'توزيع مستويات المقروئية العام' : 'Readability Level Share'}
                </h4>

                <div className="h-[200px] w-full font-mono text-[9px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={readabilityBreakdown} layout="vertical" margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="1 1" stroke="#f4f4f5" horizontal={false} />
                      <XAxis type="number" stroke="#71717a" fontSize={8} />
                      <YAxis type="category" dataKey="name" stroke="#71717a" fontSize={8} width={80} />
                      <RechartsTooltip />
                      <Bar dataKey="count" fill="#3f3f46" name={isAr ? 'عدد المقالات' : 'Count'} barSize={15}>
                        {readabilityBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-2 text-[9px] font-mono text-zinc-400">
                {isAr 
                  ? '💡 هدف التحرير: تركيز المقالات بين مستويات ٣٥ و ٧٤ (Standard & Analytical).' 
                  : '💡 Editorial target: Maintain most compositions between scores 35 & 74.'}
              </div>
            </div>

          </div>

          {/* READABILITY TEXT INSPECTOR WORKSPACE */}
          <div className="border-4 border-black bg-zinc-50 p-5 rounded relative overflow-hidden" id="stats-text-inspector">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#b91c1c]"></div>

            <div className="border-b border-zinc-300 pb-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
              <div>
                <span className="font-mono text-[9px] text-[#b91c1c] font-black uppercase tracking-wider flex items-center gap-1">
                  <Gauge size={12} />
                  {isAr ? 'فاحص النصوص الدقيق المدمج' : 'INTERACTIVE COMPREHENSION DESK'}
                </span>
                <h4 className="font-sans font-black text-sm uppercase text-zinc-950 mt-1">
                  {isAr ? 'مستشعر ومعدل تلاؤم السيو اللغوي التفاعلي' : 'Live SEO & Comprehension Text Scanner'}
                </h4>
              </div>

              {/* Language Selector inside Inspector */}
              <div className="flex bg-white border border-black p-0.5 rounded shadow-[1px_1px_0_0_rgba(0,0,0,1)]">
                <button
                  type="button"
                  onClick={() => setInspectorLang('ar')}
                  className={`px-3 py-1 font-sans text-[9px] font-black uppercase rounded transition-colors ${
                    inspectorLang === 'ar' ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  العربية
                </button>
                <button
                  type="button"
                  onClick={() => setInspectorLang('en')}
                  className={`px-3 py-1 font-sans text-[9px] font-black uppercase rounded transition-colors ${
                    inspectorLang === 'en' ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  ENGLISH
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Input editor field */}
              <div className="lg:col-span-7 flex flex-col space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">
                    {isAr ? 'العنوان المقترح (لقياس السيو):' : 'Proposed Headline:'}
                  </label>
                  <input
                    type="text"
                    value={inspectorTitle}
                    onChange={(e) => setInspectorTitle(e.target.value)}
                    className="w-full text-xs p-2.5 border-2 border-black outline-none bg-white font-bold rounded"
                    placeholder={isAr ? 'أدخل العنوان هنا...' : 'Enter headline title...'}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">
                    {isAr ? 'متن التحليل المراد تدقيقه واختباره:' : 'Full Editorial Body Copy:'}
                  </label>
                  <textarea
                    value={inspectorText}
                    onChange={(e) => setInspectorText(e.target.value)}
                    rows={8}
                    className="w-full text-xs p-3 border-2 border-black outline-none bg-white font-serif leading-relaxed rounded select-text"
                    placeholder={isAr ? 'اكتب أو الصق نص التحليل هنا...' : 'Paste draft story here...'}
                  />
                </div>
              </div>

              {/* Readout statistics */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                
                {/* Composite Gauge card */}
                <div className={`border-2 border-black p-4 rounded ${inspectorReadabilityAnalysis.bgClass}`}>
                  <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2">
                    <span className="text-[9px] font-mono uppercase tracking-tight block font-black">
                      {isAr ? 'مؤشر سهولة القراءة الفوري' : 'COMPOSITE READABILITY EASINESS'}
                    </span>
                    <span className="font-mono text-xs font-black">
                      {inspectorReadabilityAnalysis.score}/100
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-mono font-black" dir="ltr">
                      {inspectorReadabilityAnalysis.score}
                    </div>
                    <div>
                      <div className={`text-xs font-black uppercase ${inspectorReadabilityAnalysis.colorClass}`}>
                        {inspectorReadabilityAnalysis.level}
                      </div>
                      <div className="text-[9px] text-zinc-500 mt-0.5">
                        {isAr 
                          ? `زمن قراءة مقدر: ${inspectorReadabilityAnalysis.readingTime} (سرعة متوسطة)` 
                          : `Estimated read duration: ${inspectorReadabilityAnalysis.readingTime}`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Counter parameters */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="border border-black p-2 bg-white rounded text-center">
                    <span className="text-[8px] font-mono text-zinc-400 block uppercase font-bold">WORDS</span>
                    <span className="text-sm font-mono font-black text-zinc-950 block">{inspectorReadabilityAnalysis.wordCount}</span>
                  </div>
                  <div className="border border-black p-2 bg-white rounded text-center">
                    <span className="text-[8px] font-mono text-zinc-400 block uppercase font-bold">SENTENCES</span>
                    <span className="text-sm font-mono font-black text-zinc-950 block">{inspectorReadabilityAnalysis.sentenceCount}</span>
                  </div>
                  <div className="border border-black p-2 bg-white rounded text-center" dir="ltr">
                    <span className="text-[8px] font-mono text-zinc-400 block uppercase font-bold">W / SENT</span>
                    <span className="text-sm font-mono font-black text-zinc-950 block">{inspectorReadabilityAnalysis.avgSentenceLength}</span>
                  </div>
                </div>

                {/* SEO checker */}
                <div className="border border-black p-3 bg-white rounded space-y-2.5">
                  <span className="text-[9px] font-mono font-black text-zinc-950 uppercase block border-b border-zinc-150 pb-1">
                    {isAr ? 'قائمة التحقق التقني لمحركات البحث' : 'SEO & Crawling Crawler Checklist'}
                  </span>
                  <div className="space-y-1.5 text-[10.5px]">
                    {inspectorReadabilityAnalysis.checklist.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        {item.status ? (
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                        )}
                        <span className={`font-semibold ${item.status ? 'text-zinc-700' : 'text-zinc-450 line-through decoration-zinc-200'}`}>
                          {isAr ? item.labelAr : item.labelEn}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB: LIVE TRAFFIC LOGS & GEOLOCATION STREAM */}
      {activeMetricTab === "live-logs" && (
        <AdminTrafficMonitor
          language={language}
          articles={articles}
          categories={categories}
          onLoadArticle={handleLoadArticle}
        />
      )}

      {/* BENCHMARK REGISTRY FOR ARTICLES (ALWAYS ACCESSIBLE BELOW WITH INSTANT LOAD HOOKS) */}
      <div className="border-2 border-black p-4 bg-white rounded">
        <h4 className="font-sans font-black text-xs uppercase text-zinc-950 border-b border-zinc-200 pb-2 mb-3">
          {isAr ? 'سجل تصفح المواد الحية ومؤشرات قراءة المحتوى' : 'Document Traction & Comprehensibility Registry'}
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-[10.5px] border-collapse font-sans">
            <thead>
              <tr className="border-b border-black font-mono text-[8.5px] text-zinc-400 uppercase">
                <th className="py-2 px-1.5">{isAr ? 'عنوان المقال / السند' : 'Dispatch Title'}</th>
                <th className="py-2 px-1.5">{isAr ? 'القطاع' : 'Category'}</th>
                <th className="py-2 px-1.5 text-center">{isAr ? 'المقروئية' : 'Read Ease'}</th>
                <th className="py-2 px-1.5 text-right">{isAr ? 'تصفح المشاهدين' : 'Traction'}</th>
                <th className="py-2 px-1.5 text-center">{isAr ? 'فحص تفاعلي' : 'Inspect Text'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-150">
              {articlesReadabilityData.map((data) => (
                <tr key={data.id} className="hover:bg-zinc-50/70 transition-colors">
                  <td className="py-2 px-1.5">
                    <div className="font-sans font-black text-zinc-950 text-xxs truncate max-w-[280px] md:max-w-[360px]">
                      {data.title}
                    </div>
                    <span className="font-mono text-[8px] text-zinc-400 block mt-0.5">ID: {data.id}</span>
                  </td>
                  <td className="py-2 px-1.5">
                    <span className="px-1.5 py-0.5 bg-zinc-900 text-white font-black text-[8px] uppercase tracking-wider rounded">
                      {articles.find(a => a.id === data.id)?.category || 'General'}
                    </span>
                  </td>
                  <td className="py-2 px-1.5 text-center">
                    <span className="px-1.5 py-0.5 font-bold font-mono border text-[8px] rounded" style={{ borderColor: data.color, color: data.color, backgroundColor: `${data.color}11` }}>
                      {data.score} ({data.level})
                    </span>
                  </td>
                  <td className="py-2 px-1.5 text-right font-mono font-black text-zinc-950">
                    <div className="flex items-center justify-end gap-1" dir="ltr">
                      <Eye size={11} className="text-zinc-400" />
                      <span>{data.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-2 px-1.5 text-center">
                    <button
                      type="button"
                      onClick={() => handleLoadArticle(articles.find(a => a.id === data.id)!)}
                      className="px-2 py-0.5 text-[8.5px] font-mono font-black uppercase bg-black text-white hover:bg-zinc-800 cursor-pointer border border-black rounded inline-flex items-center gap-1 transition-colors"
                    >
                      {isAr ? 'فحص المقروئية' : 'Inspect'}
                      <ChevronRight size={9} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
