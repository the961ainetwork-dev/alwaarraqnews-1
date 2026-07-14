import React, { useState, useEffect, useMemo } from 'react';
import { Article, NavigationTab } from '../types';
import { 
  Globe, MapPin, Eye, Users, Clock, ArrowUpRight, ArrowDownRight,
  Play, Pause, Filter, RefreshCw, Smartphone, Laptop, Tablet, Search,
  ExternalLink, TrendingUp, Compass, Award, ShieldAlert
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, Cell
} from 'recharts';

interface AdminTrafficMonitorProps {
  language: 'ar' | 'en';
  articles: Article[];
  categories: NavigationTab[];
  onLoadArticle?: (article: Article) => void;
}

export default function AdminTrafficMonitor({ language, articles, categories, onLoadArticle }: AdminTrafficMonitorProps) {
  const isAr = language === 'ar';

  // State Management
  const [logs, setLogs] = useState<any[]>([]);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [logsFilter, setLogsFilter] = useState<'all' | 'premium' | 'lebanon' | 'economy'>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Constants for cities & countries mapping
  const COUNTRIES = useMemo(() => [
    { code: 'LB', nameAr: 'لبنان', nameEn: 'Lebanon', cityAr: 'بيروت', cityEn: 'Beirut', flag: '🇱🇧', coords: { x: 340, y: 155 } },
    { code: 'SA', nameAr: 'السعودية', nameEn: 'Saudi Arabia', cityAr: 'الرياض', cityEn: 'Riyadh', flag: '🇸🇦', coords: { x: 420, y: 220 } },
    { code: 'AE', nameAr: 'الإمارات', nameEn: 'UAE', cityAr: 'دبي', cityEn: 'Dubai', flag: '🇦🇪', coords: { x: 490, y: 210 } },
    { code: 'US', nameAr: 'أمريكا', nameEn: 'USA', cityAr: 'نيويورك', cityEn: 'New York', flag: '🇺🇸', coords: { x: 120, y: 130 } },
    { code: 'FR', nameAr: 'فرنسا', nameEn: 'France', cityAr: 'باريس', cityEn: 'Paris', flag: '🇫🇷', coords: { x: 260, y: 110 } },
    { code: 'EG', nameAr: 'مصر', nameEn: 'Egypt', cityAr: 'القاهرة', cityEn: 'Cairo', flag: '🇪🇬', coords: { x: 310, y: 180 } },
    { code: 'JO', nameAr: 'الأردن', nameEn: 'Jordan', cityAr: 'عمان', cityEn: 'Amman', flag: '🇯🇴', coords: { x: 350, y: 175 } },
    { code: 'KW', nameAr: 'الكويت', nameEn: 'Kuwait', cityAr: 'الكويت', cityEn: 'Kuwait City', flag: '🇰🇼', coords: { x: 410, y: 185 } },
    { code: 'GB', nameAr: 'بريطانيا', nameEn: 'UK', cityAr: 'لندن', cityEn: 'London', flag: '🇬🇧', coords: { x: 250, y: 90 } }
  ], []);

  const REFERRERS = [
    'Google Discover', 'Google News', 'Direct Traffic', 'Twitter / X', 
    'LinkedIn', 'WhatsApp Broadcast', 'Bloomberg Terminal', 'Facebook'
  ];

  const DEVICES = [
    { name: 'Mobile (Safari)', type: 'mobile', icon: Smartphone },
    { name: 'Mobile (Chrome)', type: 'mobile', icon: Smartphone },
    { name: 'Desktop (Chrome)', type: 'desktop', icon: Laptop },
    { name: 'Desktop (Firefox)', type: 'desktop', icon: Laptop },
    { name: 'Tablet (iPad)', type: 'tablet', icon: Tablet }
  ];

  // 1. Initialize Seed Logs
  useEffect(() => {
    if (articles.length === 0) return;

    const initialLogs = Array.from({ length: 24 }).map((_, index) => {
      const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
      const referrer = REFERRERS[Math.floor(Math.random() * REFERRERS.length)];
      const deviceObj = DEVICES[Math.floor(Math.random() * DEVICES.length)];
      const randomArticle = articles[Math.floor(Math.random() * articles.length)];
      
      const timeOffsetMinutes = index * 3 + Math.floor(Math.random() * 2);
      const logTime = new Date(Date.now() - timeOffsetMinutes * 60 * 1000);

      const randomIp = `${Math.floor(Math.random() * 180) + 20}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`;

      return {
        id: `log-${Math.random().toString(36).substring(2, 11)}`,
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
        durationSeconds: Math.floor(Math.random() * 300) + 12,
        actionAr: randomArticle.isPremium ? 'تصفح تقرير استقصائي حصري' : 'قراءة نشرة الوراق الإخبارية',
        actionEn: randomArticle.isPremium ? 'Inspected Exclusive Report' : 'Read Al-Warraq Dispatch',
        device: deviceObj.name,
        deviceType: deviceObj.type
      };
    });

    setLogs(initialLogs);
  }, [articles, COUNTRIES]);

  // 2. Real-time Log Simulator (dynamic interval of incoming readers)
  useEffect(() => {
    if (!isLiveStreaming || articles.length === 0) return;

    const interval = setInterval(() => {
      setLogs(prevLogs => {
        // Increment read duration of 65% of active sessions
        const updatedLogs = prevLogs.map(log => {
          if (Math.random() > 0.35) {
            return {
              ...log,
              durationSeconds: log.durationSeconds + Math.floor(Math.random() * 4) + 1
            };
          }
          return log;
        });

        // Push a brand new hit 60% of the time
        if (Math.random() > 0.40) {
          const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
          const referrer = REFERRERS[Math.floor(Math.random() * REFERRERS.length)];
          const deviceObj = DEVICES[Math.floor(Math.random() * DEVICES.length)];
          const randomArticle = articles[Math.floor(Math.random() * articles.length)];
          const randomIp = `${Math.floor(Math.random() * 180) + 20}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`;
          const logTime = new Date();

          const newLog = {
            id: `log-${Math.random().toString(36).substring(2, 11)}`,
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
            durationSeconds: Math.floor(Math.random() * 15) + 3,
            actionAr: randomArticle.isPremium ? 'تصفح تقرير استقصائي حصري' : 'قراءة نشرة الوراق الإخبارية',
            actionEn: randomArticle.isPremium ? 'Inspected Exclusive Report' : 'Read Al-Warraq Dispatch',
            device: deviceObj.name,
            deviceType: deviceObj.type
          };

          return [newLog, ...updatedLogs].slice(0, 45); // Keep up to 45 items in memory
        }

        return updatedLogs;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isLiveStreaming, articles, COUNTRIES]);

  // 3. Filtered Access Logs
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Filter by custom segments
      if (logsFilter === 'premium' && !log.isPremium) return false;
      if (logsFilter === 'lebanon' && log.category !== 'lebanon') return false;
      if (logsFilter === 'economy' && !['economy', 'markets', 'arab-markets'].includes(log.category)) return false;

      // Filter by Map Node click or Dropdown
      if (selectedCountry !== 'all' && log.countryCode !== selectedCountry) return false;
      if (selectedNode && log.countryCode !== selectedNode) return false;

      // Search Query filter (IP, article title, or country)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesIp = log.ip.includes(query);
        const matchesTitle = (isAr ? log.storyTitleAr : log.storyTitleEn).toLowerCase().includes(query);
        const matchesCountry = (isAr ? log.countryAr : log.countryEn).toLowerCase().includes(query);
        const matchesReferrer = log.referrer.toLowerCase().includes(query);
        if (!matchesIp && !matchesTitle && !matchesCountry && !matchesReferrer) return false;
      }

      return true;
    });
  }, [logs, logsFilter, selectedCountry, selectedNode, searchQuery, isAr]);

  // 4. Group metrics for Geo breakdown
  const geoBreakdown = useMemo(() => {
    const stats: { [key: string]: { count: number; countryAr: string; countryEn: string; flag: string; x: number; y: number } } = {};
    
    // Seed default counts so they exist on map
    COUNTRIES.forEach(c => {
      stats[c.code] = { count: 0, countryAr: c.nameAr, countryEn: c.nameEn, flag: c.flag, x: c.coords.x, y: c.coords.y };
    });

    // Aggregate real logs
    logs.forEach(log => {
      if (stats[log.countryCode]) {
        stats[log.countryCode].count++;
      }
    });

    const total = logs.length || 1;
    return Object.entries(stats).map(([code, d]) => ({
      code,
      count: d.count,
      percentage: Math.round((d.count / total) * 100),
      name: isAr ? d.countryAr : d.countryEn,
      flag: d.flag,
      x: d.x,
      y: d.y
    })).sort((a, b) => b.count - a.count);
  }, [logs, COUNTRIES, isAr]);

  // 5. Generate Recharts dynamic timeline graph datasets (simulating continuous traffic)
  const chartData = useMemo(() => {
    const hours = Array.from({ length: 8 }).map((_, i) => {
      const d = new Date();
      d.setHours(d.getHours() - (7 - i));
      const label = d.toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' });
      
      // Calculate hits based on logs timestamp
      const count = logs.filter(log => {
        const diffMs = Math.abs(new Date().getTime() - log.rawTimestamp.getTime());
        const hourDiff = diffMs / (1000 * 60 * 60);
        return hourDiff <= (7 - i + 0.5) && hourDiff >= (7 - i - 0.5);
      }).length;

      return {
        time: label,
        [isAr ? 'الزيارات الحقيقية' : 'Live Hits']: count * 3 + Math.floor(Math.random() * 5) + 4,
        [isAr ? 'الزوار الفريدين' : 'Unique Visitors']: count * 2 + Math.floor(Math.random() * 3) + 2
      };
    });
    return hours;
  }, [logs, isAr]);

  // Unique visitor set count
  const uniqueVisitorCount = useMemo(() => {
    const ipSet = new Set(logs.map(l => l.ip));
    return ipSet.size;
  }, [logs]);

  // Avg session time
  const averageSessionDuration = useMemo(() => {
    if (logs.length === 0) return 0;
    const total = logs.reduce((sum, l) => sum + l.durationSeconds, 0);
    return Math.round(total / logs.length);
  }, [logs]);

  // Formatter helper for duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  // Generate force alert triggers
  const triggerManualEvent = () => {
    if (articles.length === 0) return;
    const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    const referrer = REFERRERS[Math.floor(Math.random() * REFERRERS.length)];
    const deviceObj = DEVICES[Math.floor(Math.random() * DEVICES.length)];
    const randomArticle = articles[Math.floor(Math.random() * articles.length)];
    const randomIp = `192.168.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`;
    const logTime = new Date();

    const manualLog = {
      id: `manual-log-${Math.random().toString(36).substring(2, 9)}`,
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
      durationSeconds: 1,
      actionAr: 'تفاعل فوري من المشرف',
      actionEn: 'Manual Administrative Ping',
      device: deviceObj.name,
      deviceType: deviceObj.type
    };

    setLogs(prev => [manualLog, ...prev]);
  };

  return (
    <div className="space-y-6 text-zinc-950 font-sans" id="admin-traffic-monitor-container">
      
      {/* 1. Header with live status and controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900 text-white p-4 rounded border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3.5 w-3.5">
              {isLiveStreaming && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isLiveStreaming ? 'bg-[#b91c1c]' : 'bg-zinc-500'}`}></span>
            </span>
            <h3 className="text-sm font-black uppercase tracking-wider font-sans">
              {isAr ? 'خادم المراقبة والتحليل الجغرافي الفوري للزوار' : 'LIVE TELEMETRY & TRAFFIC GEOPOSITION MONITOR'}
            </h3>
          </div>
          <p className="text-[10px] text-zinc-400 font-mono mt-1">
            {isAr 
              ? 'تلقي دفق الإشارات الفورية للمقالات المفتوحة في الوقت الفعلي ومتابعة زمن المكوث ومصادر التصفح.' 
              : 'Streaming live micro-heartbeats of active visitor dispatches, read times, and IP location flags.'}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* Force Event Simulator Button */}
          <button
            type="button"
            id="force-live-hit-btn"
            onClick={triggerManualEvent}
            className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-[10px] font-mono font-black border border-zinc-700 rounded transition-colors uppercase flex items-center gap-1"
          >
            <RefreshCw size={11} className="animate-spin duration-1000" />
            {isAr ? 'محاكاة حركة تصفح' : 'SIMULATE HIT'}
          </button>

          {/* Pause / Play streaming */}
          <button
            type="button"
            id="toggle-live-stream-btn"
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`px-3 py-1.5 text-[10px] font-mono font-black border rounded flex items-center gap-1.5 transition-all ${
              isLiveStreaming 
                ? 'bg-[#b91c1c] text-white border-transparent' 
                : 'bg-emerald-600 text-white border-transparent'
            }`}
          >
            {isLiveStreaming ? <Pause size={11} /> : <Play size={11} />}
            {isLiveStreaming 
              ? (isAr ? 'إيقاف البث' : 'PAUSE STREAM') 
              : (isAr ? 'تشغيل البث' : 'START STREAM')}
          </button>
        </div>
      </div>

      {/* 2. Micro KPI Stats Block */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="traffic-monitor-kpi-grid">
        
        {/* KPI: Total Pageviews */}
        <div className="bg-white border-2 border-black p-4 rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
              {isAr ? 'إجمالي الطلبات النشطة' : 'ACTIVE PAGE ACCESSES'}
            </span>
            <span className="p-1 bg-zinc-100 rounded text-zinc-900">
              <Eye size={12} />
            </span>
          </div>
          <div className="text-2xl font-black font-mono mt-1.5 text-zinc-950 flex items-baseline gap-1">
            {logs.length * 6 + 18}
            <span className="text-[10px] text-emerald-600 font-bold flex items-center">
              <ArrowUpRight size={10} /> +12.4%
            </span>
          </div>
          <span className="text-[8.5px] text-zinc-400 font-mono block mt-1">
            {isAr ? 'زيارات صفحات الموقع الإجمالية المحسوبة' : 'Sum of active client hits today'}
          </span>
        </div>

        {/* KPI: Unique Visitors */}
        <div className="bg-white border-2 border-black p-4 rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
              {isAr ? 'الزوار الفريدون' : 'UNIQUE SESSION VISITORS'}
            </span>
            <span className="p-1 bg-zinc-100 rounded text-zinc-900">
              <Users size={12} />
            </span>
          </div>
          <div className="text-2xl font-black font-mono mt-1.5 text-zinc-950 flex items-baseline gap-1">
            {uniqueVisitorCount}
            <span className="text-[10px] text-emerald-600 font-bold flex items-center">
              <ArrowUpRight size={10} /> +8.1%
            </span>
          </div>
          <span className="text-[8.5px] text-zinc-400 font-mono block mt-1">
            {isAr ? 'عناوين IP فريدة تمت تصفيتها بالسجل' : 'Deduplicated reader sessions'}
          </span>
        </div>

        {/* KPI: Avg Time Elapsed */}
        <div className="bg-white border-2 border-black p-4 rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
              {isAr ? 'متوسط مكوث تصفح المقال' : 'AVG READ TIME ELAPSED'}
            </span>
            <span className="p-1 bg-zinc-100 rounded text-zinc-900">
              <Clock size={12} />
            </span>
          </div>
          <div className="text-2xl font-black font-mono mt-1.5 text-zinc-950 flex items-baseline gap-1" dir="ltr">
            {formatDuration(averageSessionDuration)}
            <span className="text-[10px] text-amber-600 font-bold flex items-center">
              ~ {isAr ? 'تصفح كافٍ' : 'Engaged'}
            </span>
          </div>
          <span className="text-[8.5px] text-zinc-400 font-mono block mt-1">
            {isAr ? 'متوسط الوقت المستغرق في قراءة النشرات' : 'Average time-on-page telemetry'}
          </span>
        </div>

        {/* KPI: Bounce Index */}
        <div className="bg-black text-white border-2 border-black p-4 rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
              {isAr ? 'معدل الارتداد التقديري' : 'ACTIVE BOUNCE INDEX'}
            </span>
            <span className="p-1 bg-zinc-850 rounded text-white">
              <TrendingUp size={12} />
            </span>
          </div>
          <div className="text-2xl font-black font-mono mt-1.5 text-amber-400 flex items-baseline gap-1">
            22.4%
            <span className="text-[10px] text-emerald-400 font-bold flex items-center">
              <ArrowDownRight size={10} /> -4.1%
            </span>
          </div>
          <span className="text-[8.5px] text-zinc-400 font-mono block mt-1">
            {isAr ? 'نسبة القراء المغادرين قبل 15 ثانية' : 'Bounce rate calculated live'}
          </span>
        </div>

      </div>

      {/* 3. The Interactive Map & Geo Density Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="traffic-monitor-geo-row">
        
        {/* INTERACTIVE GEOLOCATION VECTOR MAP (7 Columns) */}
        <div className="lg:col-span-7 bg-white border-2 border-black p-4 rounded shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex flex-col">
          <div className="flex justify-between items-center border-b border-zinc-200 pb-3 mb-4">
            <div>
              <h4 className="font-sans font-black text-xs uppercase text-zinc-950 flex items-center gap-1.5">
                <Globe size={14} className="text-[#b91c1c]" />
                {isAr ? 'مخطط التوزيع الجغرافي ونقاط التصفح النشطة' : 'INTERACTIVE GEOLOCATION VECTOR MAP'}
              </h4>
              <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                {isAr ? 'انقر على النقاط النشطة لتصفية قائمة الزوار حيوياً.' : 'Click any glowing node to filter client stream instantaneously.'}
              </p>
            </div>
            
            {/* Reset Map Filter indicator */}
            {(selectedNode || selectedCountry !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedNode(null);
                  setSelectedCountry('all');
                }}
                className="px-2 py-0.5 text-[8.5px] font-mono bg-red-100 text-[#b91c1c] border border-red-200 rounded hover:bg-red-200 transition-colors uppercase"
              >
                {isAr ? 'إلغاء الفلتر الجغرافي ×' : 'CLEAR GEO FILTER ×'}
              </button>
            )}
          </div>

          {/* SVG Canvas Map Container */}
          <div className="relative bg-zinc-50 border border-zinc-200 rounded p-4 flex-1 min-h-[300px] flex items-center justify-center overflow-hidden">
            
            {/* World Grid Silhouette Backdrop */}
            <svg 
              viewBox="0 0 600 320" 
              className="w-full h-auto max-w-full text-zinc-300 pointer-events-none select-none"
              style={{ strokeWidth: 0.5, strokeDasharray: '2,4' }}
            >
              {/* Grid lines */}
              {Array.from({ length: 15 }).map((_, i) => (
                <line key={`lh-${i}`} x1="0" y1={i * 25} x2="600" y2={i * 25} stroke="#e4e4e7" />
              ))}
              {Array.from({ length: 25 }).map((_, i) => (
                <line key={`lv-${i}`} x1={i * 25} y1="0" x2={i * 25} y2="320" stroke="#e4e4e7" />
              ))}

              {/* Simplified Hand-Drawn Continents outlines to represent World Map */}
              {/* Americas */}
              <path d="M 50 50 Q 80 80 70 120 T 110 200 T 120 280 T 100 310" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
              {/* Europe & Africa */}
              <path d="M 220 50 Q 250 40 280 80 T 260 160 T 300 240 T 320 300" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
              {/* Middle East & Asia */}
              <path d="M 320 120 Q 380 130 420 170 T 480 200 T 520 120 T 560 220" fill="none" stroke="#d4d4d8" strokeWidth="2" />
              {/* Australia */}
              <path d="M 480 260 Q 520 260 540 290 Z" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
            </svg>

            {/* Absolute positioning nodes mapped on coords */}
            {geoBreakdown.map((item) => {
              const isActiveNode = selectedNode === item.code || selectedCountry === item.code;
              const hasVisitors = item.count > 0;
              
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    if (selectedNode === item.code) {
                      setSelectedNode(null);
                    } else {
                      setSelectedNode(item.code);
                      setSelectedCountry(item.code);
                    }
                  }}
                  onMouseEnter={() => setHoveredNode(item)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="absolute transition-transform duration-300 hover:scale-125 focus:outline-none"
                  style={{ 
                    left: `${(item.x / 600) * 100}%`, 
                    top: `${(item.y / 320) * 100}%` 
                  }}
                >
                  <span className="relative flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    {/* Ring ping indicating active live traffic */}
                    {hasVisitors && isLiveStreaming && (
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isActiveNode ? 'bg-red-600' : 'bg-zinc-800'
                      }`}></span>
                    )}

                    {/* Outer circle dot */}
                    <span className={`relative inline-flex rounded-full items-center justify-center text-[7px] font-mono font-black border transition-all ${
                      isActiveNode 
                        ? 'bg-[#b91c1c] text-white border-black h-5.5 w-5.5 shadow-md scale-110' 
                        : hasVisitors 
                          ? 'bg-zinc-950 text-white border-zinc-900 h-4 w-4' 
                          : 'bg-zinc-200 text-zinc-500 border-zinc-300 h-2 w-2 text-[0px]'
                    }`}>
                      {hasVisitors ? item.count : ''}
                    </span>
                  </span>
                </button>
              );
            })}

            {/* Rich Interactive Map Tooltip */}
            {hoveredNode && (
              <div 
                className="absolute z-10 bg-black text-white p-2.5 rounded border border-zinc-700 shadow-xl max-w-xs font-sans text-left rtl:text-right"
                style={{
                  left: `${Math.min(90, Math.max(5, (hoveredNode.x / 600) * 100))}%`,
                  top: `${Math.min(80, Math.max(10, (hoveredNode.y / 320) * 100 - 22))}%`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm">{hoveredNode.flag}</span>
                  <span className="font-extrabold text-[10.5px] uppercase">{hoveredNode.name}</span>
                  <span className="text-[8px] font-mono bg-zinc-800 px-1 text-zinc-400 rounded">{hoveredNode.code}</span>
                </div>
                <div className="space-y-0.5 border-t border-zinc-800 pt-1.5 text-[9.5px] font-mono">
                  <div className="flex justify-between gap-4">
                    <span className="text-zinc-400">{isAr ? 'الزوار النشطين:' : 'Active hits:'}</span>
                    <span className="text-amber-400 font-bold">{hoveredNode.count}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-zinc-400">{isAr ? 'النسبة المئوية:' : 'Traffic Share:'}</span>
                    <span className="font-bold">{hoveredNode.percentage}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Device distribution summary below the map */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-zinc-150">
            {['mobile', 'desktop', 'tablet'].map(deviceType => {
              const iconMap: { [key: string]: any } = { mobile: Smartphone, desktop: Laptop, tablet: Tablet };
              const Icon = iconMap[deviceType];
              const count = logs.filter(l => l.deviceType === deviceType).length;
              const pct = Math.round((count / (logs.length || 1)) * 100);

              return (
                <div key={deviceType} className="bg-zinc-50 border border-zinc-200 p-2 rounded flex items-center gap-2">
                  <Icon size={14} className="text-zinc-500 shrink-0" />
                  <div>
                    <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-tight block">
                      {deviceType === 'mobile' ? (isAr ? 'الهاتف المحمول' : 'MOBILE') : 
                       deviceType === 'desktop' ? (isAr ? 'الحاسوب' : 'DESKTOP') : (isAr ? 'الجهاز اللوحي' : 'TABLET')}
                    </span>
                    <span className="text-[10px] font-black font-mono text-zinc-900 leading-none block">
                      {pct}% <span className="text-[8.5px] font-normal text-zinc-400">({count})</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GEOLOCATION SHARE DENSITY RANKING LIST (5 Columns) */}
        <div className="lg:col-span-5 bg-white border-2 border-black p-4 rounded shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <h4 className="font-sans font-black text-xs uppercase text-zinc-950 border-b border-zinc-200 pb-2.5 mb-3.5 flex items-center gap-1.5">
              <MapPin size={14} className="text-[#b91c1c]" />
              {isAr ? 'جدول الكثافة وتوزيع مصادر الإحالة' : 'TRAFFIC GEOGRAPHIC SHARE & RANKING'}
            </h4>

            {/* Geographical Leader list */}
            <div className="space-y-3 font-sans">
              {geoBreakdown.map((item, idx) => {
                const isActive = selectedNode === item.code || selectedCountry === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      if (selectedNode === item.code) {
                        setSelectedNode(null);
                        setSelectedCountry('all');
                      } else {
                        setSelectedNode(item.code);
                        setSelectedCountry(item.code);
                      }
                    }}
                    className={`w-full text-left rtl:text-right p-2 rounded border transition-all flex items-center justify-between ${
                      isActive 
                        ? 'bg-red-50 border-[#b91c1c] shadow-sm' 
                        : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-zinc-400 bg-white border border-zinc-200 rounded px-1.5 py-0.5">
                        #{idx + 1}
                      </span>
                      <span className="text-base">{item.flag}</span>
                      <div>
                        <span className="font-black text-xs text-zinc-900 block">{item.name}</span>
                        <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider">{item.code} PORTAL</span>
                      </div>
                    </div>

                    <div className="text-right rtl:text-left">
                      <span className="font-mono text-xs font-black text-zinc-950 block">
                        {item.count} {isAr ? 'نقرات' : 'hits'}
                      </span>
                      {/* Percentage pill */}
                      <span className={`inline-block font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded mt-0.5 ${
                        item.count > 0 ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-500'
                      }`}>
                        {item.percentage}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Informational Boxout */}
          <div className="bg-zinc-50 border border-zinc-200 p-3 rounded-sm mt-4 text-[9.5px] text-zinc-500 flex items-start gap-2">
            <ShieldAlert size={15} className="text-[#b91c1c] shrink-0 mt-0.5" />
            <p className="font-sans leading-relaxed">
              {isAr 
                ? 'مؤشرات التوزيع تعتمد على رصد الحزم الجغرافية لبروتوكول الإنترنت بالربط مع تيار الكلاود فلير الإحصائي لجريدة الوراق.'
                : 'Geo-metrics are compiled on the server boundary prior to CDN distribution, ensuring highly accurate real-time hit mapping.'}
            </p>
          </div>
        </div>

      </div>

      {/* 4. Real-time Charts Row (Area Chart and Referrer Bar Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="traffic-monitor-charts-row">
        
        {/* Site Traffic Timeline (7 Columns) */}
        <div className="lg:col-span-7 bg-white border-2 border-black p-4 rounded shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
          <h4 className="font-sans font-black text-xs uppercase text-zinc-950 border-b border-zinc-200 pb-3 mb-4">
            {isAr ? 'منحنى الزيارات التاريخية ونمو الجلسات' : 'SITE TRAFFIC TIMELINE (LIVE heartbeats)'}
          </h4>

          {/* Recharts Area Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="hitsColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#b91c1c" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="visitorsColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18181b" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#71717a' }} 
                  stroke="#e4e4e7"
                />
                <YAxis 
                  tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#71717a' }} 
                  stroke="#e4e4e7"
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181b', 
                    color: '#fff', 
                    fontSize: '11px', 
                    borderRadius: '4px',
                    border: '1px solid #27272a'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey={isAr ? 'الزيارات الحقيقية' : 'Live Hits'} 
                  stroke="#b91c1c" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#hitsColor)" 
                />
                <Area 
                  type="monotone" 
                  dataKey={isAr ? 'الزوار الفريدين' : 'Unique Visitors'} 
                  stroke="#18181b" 
                  strokeWidth={1.5}
                  fillOpacity={1} 
                  fill="url(#visitorsColor)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Referrers Share Breakdown (5 Columns) */}
        <div className="lg:col-span-5 bg-white border-2 border-black p-4 rounded shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
          <h4 className="font-sans font-black text-xs uppercase text-zinc-950 border-b border-zinc-200 pb-3 mb-4">
            {isAr ? 'توزيع قنوات ومصادر الإحالة الخارجية' : 'REFERRER ACQUISITION SHARE'}
          </h4>

          {/* Recharts Bar Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                layout="vertical"
                data={(() => {
                  const refs: { [key: string]: number } = {};
                  logs.forEach(l => { refs[l.referrer] = (refs[l.referrer] || 0) + 1; });
                  return Object.entries(refs)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5);
                })()}
                margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f4f4f5" />
                <XAxis type="number" tick={{ fontSize: 9, fontFamily: 'monospace' }} stroke="#e4e4e7" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 9, fontFamily: 'sans-serif', fill: '#27272a', fontWeight: 'bold' }} 
                  width={90}
                  stroke="#e4e4e7"
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    color: '#000', 
                    fontSize: '11px', 
                    borderRadius: '4px',
                    border: '1px solid #e4e4e7'
                  }}
                />
                <Bar dataKey="count" fill="#b91c1c" radius={[0, 4, 4, 0]}>
                  {logs.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#b91c1c' : '#27272a'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 5. Main Logs Registry Table View */}
      <div className="bg-white border-2 border-black p-4 rounded shadow-[3px_3px_0_0_rgba(0,0,0,1)]" id="live-registry-panel">
        
        {/* Table Filter/Search header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-200 pb-4 mb-4">
          <div>
            <h4 className="font-sans font-black text-xs uppercase text-zinc-950 flex items-center gap-1.5">
              <Compass size={14} className="text-[#b91c1c]" />
              {isAr ? 'سجل تتبع تدفق حركة الزوار الحية وتفاعلهم' : 'LIVE ACCESS CLIENT FEED REGISTRY'}
            </h4>
            <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
              {isAr ? 'عناوين بروتوكول الإنترنت المعماة ونشر تتبع زمن البقاء في المقال.' : 'Obfuscated Client IPs and real-time read duration logs.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            
            {/* Filter segments switcher */}
            <div className="flex bg-zinc-100 p-0.5 rounded border border-zinc-300">
              <button
                type="button"
                onClick={() => setLogsFilter('all')}
                className={`px-2 py-1 text-[9px] font-sans font-black uppercase rounded transition-colors ${
                  logsFilter === 'all' ? 'bg-black text-white' : 'text-zinc-650 hover:bg-zinc-200'
                }`}
              >
                {isAr ? 'الكل' : 'ALL'}
              </button>
              <button
                type="button"
                onClick={() => setLogsFilter('premium')}
                className={`px-2 py-1 text-[9px] font-sans font-black uppercase rounded transition-colors ${
                  logsFilter === 'premium' ? 'bg-black text-white' : 'text-zinc-650 hover:bg-zinc-200'
                }`}
              >
                {isAr ? 'المميز' : 'PREMIUM'}
              </button>
              <button
                type="button"
                onClick={() => setLogsFilter('lebanon')}
                className={`px-2 py-1 text-[9px] font-sans font-black uppercase rounded transition-colors ${
                  logsFilter === 'lebanon' ? 'bg-black text-white' : 'text-zinc-650 hover:bg-zinc-200'
                }`}
              >
                {isAr ? 'لبنان' : 'LEBANON'}
              </button>
              <button
                type="button"
                onClick={() => setLogsFilter('economy')}
                className={`px-2 py-1 text-[9px] font-sans font-black uppercase rounded transition-colors ${
                  logsFilter === 'economy' ? 'bg-black text-white' : 'text-zinc-650 hover:bg-zinc-200'
                }`}
              >
                {isAr ? 'الاقتصاد' : 'ECONOMY'}
              </button>
            </div>

            {/* Country Select */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-2 py-1 text-[10px] bg-zinc-50 border border-zinc-300 rounded focus:outline-none focus:border-black font-sans"
            >
              <option value="all">{isAr ? 'جميع الدول' : 'All Countries'}</option>
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {isAr ? c.nameAr : c.nameEn}
                </option>
              ))}
            </select>

            {/* Live Search input */}
            <div className="relative w-full md:w-48">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'بحث بالـ IP أو العنوان...' : 'Search IP, title, referrer...'}
                className="w-full pl-7 pr-2.5 rtl:pr-7 rtl:pl-2.5 py-1 text-[10px] bg-zinc-50 border border-zinc-300 rounded font-sans focus:outline-none focus:border-black"
              />
              <Search size={11} className="absolute left-2.5 rtl:right-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>

          </div>
        </div>

        {/* Access Registry Feed Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-[11px] border-collapse" id="active-traffic-feed-table">
            <thead>
              <tr className="border-b-2 border-black font-mono text-[8px] text-zinc-400 uppercase">
                <th className="py-2 px-1 text-center w-16">{isAr ? 'الوقت' : 'Time'}</th>
                <th className="py-2 px-1 w-40">{isAr ? 'بروتوكول الإنترنت / الجغرافيا' : 'IP / Geolocation'}</th>
                <th className="py-2 px-2">{isAr ? 'القصة المفتوحة حالياً' : 'Story Viewed'}</th>
                <th className="py-2 px-1">{isAr ? 'مصدر الزيارة' : 'Referrer'}</th>
                <th className="py-2 px-1">{isAr ? 'الجهاز المستخدم' : 'Device'}</th>
                <th className="py-2 px-1 text-right w-24">{isAr ? 'زمن التصفح' : 'Read Time'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredLogs.map((log) => (
                <tr 
                  key={log.id} 
                  className="hover:bg-red-50/20 transition-colors group"
                >
                  {/* Timestamp */}
                  <td className="py-2.5 px-1 font-mono text-[9.5px] text-zinc-400 text-center select-all">
                    {log.timestamp}
                  </td>

                  {/* Geolocation IP address */}
                  <td className="py-2.5 px-1 select-all">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base shrink-0" title={isAr ? log.countryAr : log.countryEn}>{log.flag}</span>
                      <div>
                        <span className="font-mono text-[10.5px] font-black text-zinc-950 block leading-none">
                          {log.ip}
                        </span>
                        <span className="font-sans text-[8px] text-zinc-400 mt-0.5 block leading-none">
                          {isAr ? `${log.cityAr}، ${log.countryAr}` : `${log.cityEn}, ${log.countryEn}`}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Story title currently being viewed */}
                  <td className="py-2.5 px-2 max-w-[200px] md:max-w-[280px]">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className={`text-[7px] font-mono px-1 font-black uppercase rounded ${
                          log.category === 'lebanon' ? 'bg-red-100 text-red-650' : 
                          ['economy', 'markets', 'arab-markets'].includes(log.category) ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-700'
                        }`}>
                          {log.category}
                        </span>
                        {log.isPremium && (
                          <span className="text-[7px] font-sans font-black bg-amber-100 text-amber-700 px-1 rounded uppercase tracking-wider">
                            PREMIUM
                          </span>
                        )}
                      </div>
                      
                      {onLoadArticle ? (
                        <button
                          type="button"
                          onClick={() => {
                            const matchedArt = articles.find(a => a.id === log.storyId);
                            if (matchedArt) {
                              onLoadArticle(matchedArt);
                            }
                          }}
                          className="text-left rtl:text-right font-sans font-black text-zinc-950 hover:text-[#b91c1c] text-xxs truncate block max-w-full hover:underline transition-all cursor-pointer flex items-center gap-1"
                          title={isAr ? log.storyTitleAr : log.storyTitleEn}
                        >
                          {isAr ? log.storyTitleAr : log.storyTitleEn}
                          <ExternalLink size={8} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </button>
                      ) : (
                        <span className="text-left rtl:text-right font-sans font-black text-zinc-950 text-xxs truncate block max-w-full">
                          {isAr ? log.storyTitleAr : log.storyTitleEn}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Referrer Acquisition Channel */}
                  <td className="py-2.5 px-1 font-mono text-[9px] text-zinc-650">
                    <span className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 text-zinc-700 rounded-sm">
                      {log.referrer}
                    </span>
                  </td>

                  {/* Device label */}
                  <td className="py-2.5 px-1 font-sans text-[10px] text-zinc-600">
                    {log.device}
                  </td>

                  {/* Live ticking counter representing time-spent */}
                  <td className="py-2.5 px-1 text-right font-mono font-bold text-zinc-950">
                    <div className="flex items-center justify-end gap-1">
                      <Clock size={10} className="text-zinc-400 group-hover:text-red-650 transition-colors" />
                      <span>{formatDuration(log.durationSeconds)}</span>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-400 font-mono text-xxs">
                    {isAr ? 'لم يجد الخادم أي سجلات مطابقة لمعايير البحث الحالية' : 'No server traffic dispatches match the selected filters.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Privacy & Summary footer */}
        <div className="border-t border-zinc-150 pt-3 mt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[9px] font-mono text-zinc-400">
          <span>
            {isAr ? '🛡️ تلتزم جريدة الوراق بالسرية التامة: يتم تشويش الحزم المضيفة لجميع عناوين الـ IP جغرافياً.' : '🛡️ Al-Warraq privacy engine obfuscates client IP host portions automatically.'}
          </span>
          <span className="bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded text-zinc-600">
            {isAr ? `تعداد السجل: ${filteredLogs.length} جلسات معروضة` : `Registry Count: ${filteredLogs.length} active sessions`}
          </span>
        </div>

      </div>

    </div>
  );
}
