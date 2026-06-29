import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types';
import { 
  Instagram, 
  Smartphone, 
  Download, 
  Send, 
  Sparkles, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  ChevronRight, 
  Image as ImageIcon,
  Link as LinkIcon,
  MessageCircle
} from 'lucide-react';

interface SocialInfographicCreatorProps {
  language: 'ar' | 'en';
  articles: Article[];
}

type LayoutType = 'instagram' | 'tiktok';
type ThemeMode = 'dark-sovereign' | 'gold-prestige' | 'crimson-intercept' | 'emerald-finance';

export default function SocialInfographicCreator({ language, articles }: SocialInfographicCreatorProps) {
  const isAr = language === 'ar';
  
  // Select active story - default to the first article or a fallback
  const [selectedStoryId, setSelectedStoryId] = useState<string>(articles[0]?.id || '');
  const [activeStory, setActiveStory] = useState<Article | null>(articles[0] || null);
  
  // Language toggle for infographic text
  const [infoLanguage, setInfoLanguage] = useState<'ar' | 'en'>(isAr ? 'ar' : 'en');
  
  // Custom interactive texts
  const [headline, setHeadline] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [watermark, setWatermark] = useState('alwarraqnews.com');
  
  // Layout and style options
  const [layout, setLayout] = useState<LayoutType>('instagram');
  const [theme, setTheme] = useState<ThemeMode>('dark-sovereign');
  const [showLogo, setShowLogo] = useState(true);

  // Simulation states
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishPlatform, setPublishPlatform] = useState<'instagram' | 'tiktok' | null>(null);
  const [socialLogs, setSocialLogs] = useState<string[]>([]);
  const [publishSuccess, setPublishSuccess] = useState<boolean | null>(null);

  // Update fields when selected story changes
  useEffect(() => {
    const story = articles.find(a => a.id === selectedStoryId);
    if (story) {
      setActiveStory(story);
      if (infoLanguage === 'ar') {
        setHeadline(story.titleAr || '');
        setSynopsis(story.summaryAr || '');
      } else {
        setHeadline(story.titleEn || '');
        setSynopsis(story.summaryEn || '');
      }
      setShortLink(`alwarraq.news/st/${story.id.substring(0, 8)}`);
    }
  }, [selectedStoryId, infoLanguage, articles]);

  // Handle switching language for infographic fields manually
  const handleLanguageToggle = (lang: 'ar' | 'en') => {
    setInfoLanguage(lang);
    if (activeStory) {
      if (lang === 'ar') {
        setHeadline(activeStory.titleAr || '');
        setSynopsis(activeStory.summaryAr || '');
      } else {
        setHeadline(activeStory.titleEn || '');
        setSynopsis(activeStory.summaryEn || '');
      }
    }
  };

  // Simulated Social publishing pipeline
  const simulateSocialPublish = (platform: 'instagram' | 'tiktok') => {
    setIsPublishing(true);
    setPublishPlatform(platform);
    setPublishSuccess(null);
    setSocialLogs([]);

    const platformLabel = platform === 'instagram' ? 'Instagram Content API' : 'TikTok Content Posting API';
    
    const logs = [
      {
        delay: 300,
        text: isAr 
          ? `[١/٥] الاتصال بالواجهة البرمجية لمنصة ${platform}...` 
          : `[1/5] Handshaking with ${platformLabel} OAuth gateway...`
      },
      {
        delay: 1000,
        text: isAr 
          ? `✓ تم التحقق من ترخيص الحساب الموثق: @alwarraqnews` 
          : `✓ Account authenticated successfully: @alwarraqnews`
      },
      {
        delay: 1800,
        text: isAr 
          ? `[٢/٥] جاري تجميع وتصدير ملف الصورة المؤقت بدقة عالية...` 
          : `[2/5] Compiling and rendering high-resolution canvas asset...`
      },
      {
        delay: 2500,
        text: isAr 
          ? `✓ تم ترميز الملف بنجاح (نوع: image/png، الحجم: ١.٤ ميجابايت)` 
          : `✓ Binary payload encoded successfully (MIME: image/png, Size: 1.4MB)`
      },
      {
        delay: 3200,
        text: isAr 
          ? `[٣/٥] جاري إنشاء المنشور وربط الروابط والوسوم المخصصة...` 
          : `[3/5] Attaching shortlink metrics: ${shortLink}`
      },
      {
        delay: 4000,
        text: isAr 
          ? `[٤/٥] جاري رفع البيانات وبث الموجز الاستراتيجي إلى سحابة المنصة العامة...` 
          : `[4/5] Initiating final packet streaming to ${platform} live CDN...`
      },
      {
        delay: 4800,
        text: isAr 
          ? `[٥/٥] معالجة خوارزميات الضغط والتأكد من وضوح الصورة...` 
          : `[5/5] Processing compression layers and validating margins...`
      },
      {
        delay: 5500,
        text: isAr 
          ? `🎉 تم النشر بنجاح! المنشور متاح الآن بشكل عام على حساب الصحيفة رسميًا.` 
          : `🎉 Success! Infographic post is now live on the newspaper feed.`
      }
    ];

    logs.forEach((log) => {
      setTimeout(() => {
        setSocialLogs(prev => [...prev, log.text]);
      }, log.delay);
    });

    setTimeout(() => {
      setPublishSuccess(true);
      setIsPublishing(false);
    }, 6000);
  };

  // Canvas drawing and download logic
  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Define dimensions based on layout format
    const width = 1080;
    const height = layout === 'instagram' ? 1080 : 1920;
    
    canvas.width = width;
    canvas.height = height;

    // Apply background theme
    let bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    if (theme === 'dark-sovereign') {
      bgGradient.addColorStop(0, '#121315');
      bgGradient.addColorStop(1, '#080809');
    } else if (theme === 'gold-prestige') {
      bgGradient.addColorStop(0, '#0a0a0c');
      bgGradient.addColorStop(1, '#1c1811');
    } else if (theme === 'crimson-intercept') {
      bgGradient.addColorStop(0, '#581c1c');
      bgGradient.addColorStop(1, '#2c0e0e');
    } else if (theme === 'emerald-finance') {
      bgGradient.addColorStop(0, '#022c22');
      bgGradient.addColorStop(1, '#011c15');
    }
    
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Draw grid overlay for technical geopolitical feel
    ctx.strokeStyle = theme === 'crimson-intercept' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 60;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw double editorial frame
    ctx.strokeStyle = theme === 'gold-prestige' ? '#d97706' : theme === 'crimson-intercept' ? '#f87171' : theme === 'emerald-finance' ? '#10b981' : '#dc2626';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, width - 60, height - 60);
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // Text settings
    const isArText = infoLanguage === 'ar';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw Al-Warraq Logo Badge at the top
    if (showLogo) {
      // Background emblem shield
      ctx.fillStyle = theme === 'crimson-intercept' ? 'rgba(0,0,0,0.3)' : 'rgba(220, 38, 38, 0.08)';
      ctx.fillRect(width / 2 - 180, 80, 360, 100);
      ctx.strokeStyle = theme === 'gold-prestige' ? '#d97706' : theme === 'emerald-finance' ? '#10b981' : '#dc2626';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(width / 2 - 180, 80, 360, 100);

      // Calligraphy representation logo
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Cairo", sans-serif';
      ctx.fillText('الورّاق', width / 2, 115);

      ctx.fillStyle = theme === 'gold-prestige' ? '#fbbf24' : theme === 'emerald-finance' ? '#34d399' : '#f87171';
      ctx.font = '900 11px "JetBrains Mono", monospace';
      ctx.fillText('AL-WARRAQ GEOPOLITICAL SUITE', width / 2, 155);
    }

    // Draw Decorative Accent Coordinates
    ctx.fillStyle = 'rgba(156, 163, 175, 0.5)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('LAT: 33.8938° N / LON: 35.5018° E', 60, height - 120);
    ctx.fillText('SEC_DISPATCH_LEVEL: PRIORITY', 60, height - 100);
    
    ctx.textAlign = 'right';
    ctx.fillText(`HASH: ${activeStory?.id.toUpperCase() || 'ALW-INTEL'}`, width - 60, height - 120);
    ctx.fillText(`DATE: 2026-06-28`, width - 60, height - 100);

    // Draw headline
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px "Cairo", sans-serif';
    
    const maxTextWidth = width - 160;
    const headlineY = showLogo ? 320 : 250;
    
    // Line wrapping helper
    const wrapText = (text: string, x: number, y: number, lineH: number, maxW: number) => {
      const words = text.split(' ');
      let line = '';
      const lines = [];

      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxW && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i].trim(), x, y + (i * lineH));
      }
      return lines.length;
    };

    const headlineLinesCount = wrapText(headline, width / 2, headlineY, 70, maxTextWidth);

    // Draw separator line
    const separatorY = headlineY + (headlineLinesCount * 70) + 20;
    ctx.strokeStyle = theme === 'gold-prestige' ? '#d97706' : theme === 'emerald-finance' ? '#10b981' : '#dc2626';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 120, separatorY);
    ctx.lineTo(width / 2 + 120, separatorY);
    ctx.stroke();

    // Draw synopsis/summary
    ctx.fillStyle = '#e4e4e7';
    ctx.font = 'normal 28px "Cairo", "Inter", sans-serif';
    const synopsisY = separatorY + 60;
    const synopsisLinesCount = wrapText(synopsis, width / 2, synopsisY, 44, maxTextWidth - 40);

    // Draw link/URL stamp with small visual QR Code / Shortlink mockup at the bottom
    const bottomBlockY = layout === 'instagram' ? 900 : 1600;
    
    // Bottom border ribbon
    ctx.fillStyle = theme === 'gold-prestige' ? 'rgba(217, 119, 6, 0.1)' : theme === 'emerald-finance' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(220, 38, 38, 0.1)';
    ctx.fillRect(80, bottomBlockY - 40, width - 160, 80);
    ctx.strokeStyle = theme === 'gold-prestige' ? '#d97706' : theme === 'emerald-finance' ? '#10b981' : '#dc2626';
    ctx.strokeRect(80, bottomBlockY - 40, width - 160, 80);

    // Draw URL link
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`READ EXCLUSIVE AT: ${shortLink}`, width / 2, bottomBlockY);

    // Draw tiny watermark at absolute footer bottom
    ctx.fillStyle = 'rgba(156, 163, 175, 0.4)';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillText(`COPYRIGHT © 2026 AL-WARRAQ SUITE // ${watermark.toUpperCase()}`, width / 2, height - 60);

    // Create download link
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `AlWarraq_Infographic_${layout}_${activeStory?.id || 'export'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="social-infographics-manager" className="border-2 border-black bg-zinc-50 p-6 md:p-8 text-black" style={{ direction: 'ltr' }}>
      
      {/* Title */}
      <div className="border-b-2 border-black pb-4 mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-sans font-black text-xl md:text-2xl uppercase tracking-tight flex items-center gap-2">
            <Instagram className="text-pink-650" />
            <span>Social Infographic Builder</span>
          </h3>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            GENERATE VISUALLY OPTIMIZED SOCIAL MEDIA TEMPLATES FOR INSTAGRAM GRID & TIKTOK DISPATCHES
          </p>
        </div>
        
        {/* Toggle Language for Admin Inputs */}
        <div className="flex bg-neutral-200 p-0.5 border border-black rounded-none">
          <button
            onClick={() => handleLanguageToggle('ar')}
            className={`px-3 py-1 text-xs font-black transition-all ${
              infoLanguage === 'ar' ? 'bg-black text-white' : 'text-neutral-700 hover:text-black'
            }`}
          >
            العربية
          </button>
          <button
            onClick={() => handleLanguageToggle('en')}
            className={`px-3 py-1 text-xs font-black transition-all ${
              infoLanguage === 'en' ? 'bg-black text-white' : 'text-neutral-700 hover:text-black'
            }`}
          >
            English
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SETTINGS AND CONTROLS: LEFT (5/12) */}
        <div className="lg:col-span-5 space-y-5 bg-white p-5 border-2 border-black">
          
          {/* Story Selector */}
          <div>
            <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1.5">
              1. Choose a Story / Article
            </label>
            <select
              value={selectedStoryId}
              onChange={(e) => setSelectedStoryId(e.target.value)}
              className="w-full text-xs p-2.5 border-2 border-black bg-neutral-50 font-sans font-bold"
            >
              {articles.map((story) => (
                <option key={story.id} value={story.id}>
                  {story.category.toUpperCase()} - {isAr ? story.titleAr : story.titleEn}
                </option>
              ))}
            </select>
          </div>

          {/* Interactive Headline */}
          <div>
            <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1.5">
              2. Infographic Headline (Cairo Font)
            </label>
            <textarea
              rows={2}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full text-xs p-2.5 border-2 border-black outline-none font-sans font-extrabold text-left rtl:text-right"
              placeholder="Enter main punchy headline"
            />
          </div>

          {/* Interactive Synopsis */}
          <div>
            <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1.5">
              3. Small Synopsis/Brief (Max 200 chars recommended)
            </label>
            <textarea
              rows={3}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              className="w-full text-xs p-2.5 border-2 border-black outline-none font-sans leading-relaxed text-left rtl:text-right"
              placeholder="Enter brief key takeaway"
            />
          </div>

          {/* Target Shortlink & Watermark */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                4. Story Shortlink
              </label>
              <div className="flex items-center">
                <span className="bg-neutral-100 border-2 border-r-0 border-black p-2 text-[10px] font-mono shrink-0">
                  <LinkIcon size={11} />
                </span>
                <input
                  type="text"
                  value={shortLink}
                  onChange={(e) => setShortLink(e.target.value)}
                  className="w-full text-xs p-2 border-2 border-black font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                5. Brand Handle
              </label>
              <input
                type="text"
                value={watermark}
                onChange={(e) => setWatermark(e.target.value)}
                className="w-full text-xs p-2 border-2 border-black font-mono"
              />
            </div>
          </div>

          {/* Layout Mode Segmented Picker */}
          <div>
            <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1.5">
              6. Form Factors & Guidelines
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLayout('instagram')}
                className={`p-3 border-2 font-mono text-xxs font-black uppercase flex flex-col items-center justify-center gap-1.5 transition-all ${
                  layout === 'instagram'
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-neutral-50 hover:bg-neutral-100 border-zinc-300 text-neutral-600'
                }`}
              >
                <ImageIcon size={16} />
                <span>Instagram Grid (1:1)</span>
              </button>
              <button
                onClick={() => setLayout('tiktok')}
                className={`p-3 border-2 font-mono text-xxs font-black uppercase flex flex-col items-center justify-center gap-1.5 transition-all ${
                  layout === 'tiktok'
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-neutral-50 hover:bg-neutral-100 border-zinc-300 text-neutral-600'
                }`}
              >
                <Smartphone size={16} />
                <span>TikTok / Story (9:16)</span>
              </button>
            </div>
          </div>

          {/* Theme Accent Picker */}
          <div>
            <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1.5">
              7. Visual Sovereignty Theme Accent
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setTheme('dark-sovereign')}
                className={`p-2 border text-[10px] font-black uppercase flex flex-col items-center gap-1.5 transition-all ${
                  theme === 'dark-sovereign' ? 'border-black ring-2 ring-offset-1 ring-zinc-800' : 'border-zinc-300 hover:border-zinc-500'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-neutral-900 border border-zinc-700"></span>
                <span className="text-[9px] font-mono">Slate</span>
              </button>
              <button
                onClick={() => setTheme('gold-prestige')}
                className={`p-2 border text-[10px] font-black uppercase flex flex-col items-center gap-1.5 transition-all ${
                  theme === 'gold-prestige' ? 'border-black ring-2 ring-offset-1 ring-zinc-800' : 'border-zinc-300 hover:border-zinc-500'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-500"></span>
                <span className="text-[9px] font-mono">Gold</span>
              </button>
              <button
                onClick={() => setTheme('crimson-intercept')}
                className={`p-2 border text-[10px] font-black uppercase flex flex-col items-center gap-1.5 transition-all ${
                  theme === 'crimson-intercept' ? 'border-black ring-2 ring-offset-1 ring-zinc-800' : 'border-zinc-300 hover:border-zinc-500'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-red-800 border border-red-500"></span>
                <span className="text-[9px] font-mono">Crimson</span>
              </button>
              <button
                onClick={() => setTheme('emerald-finance')}
                className={`p-2 border text-[10px] font-black uppercase flex flex-col items-center gap-1.5 transition-all ${
                  theme === 'emerald-finance' ? 'border-black ring-2 ring-offset-1 ring-zinc-800' : 'border-zinc-300 hover:border-zinc-500'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-400"></span>
                <span className="text-[9px] font-mono">Emerald</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t-2 border-zinc-100 space-y-3">
            <button
              onClick={handleDownloadImage}
              className="w-full bg-black hover:bg-zinc-900 text-white font-black text-xs uppercase py-3 px-4 border border-black cursor-pointer flex items-center justify-center gap-2 transition-all shadow-md active:translate-y-0.5"
            >
              <Download size={14} />
              <span>Download PNG Image (Manual Post)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => simulateSocialPublish('instagram')}
                disabled={isPublishing}
                className="bg-zinc-100 hover:bg-neutral-200 text-black font-extrabold text-[10px] uppercase py-2.5 border border-black cursor-pointer flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
              >
                <Send size={12} className="text-pink-600" />
                <span>Push to Instagram</span>
              </button>
              <button
                onClick={() => simulateSocialPublish('tiktok')}
                disabled={isPublishing}
                className="bg-zinc-100 hover:bg-neutral-200 text-black font-extrabold text-[10px] uppercase py-2.5 border border-black cursor-pointer flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
              >
                <Send size={12} className="text-teal-600" />
                <span>Push to TikTok</span>
              </button>
            </div>
          </div>

        </div>

        {/* PIXEL-PERFECT INTERACTIVE DEVICE PREVIEW: RIGHT (7/12) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4">
          
          <span className="font-mono text-xxs font-black text-zinc-500 uppercase tracking-widest bg-zinc-200 px-3 py-1 border border-black select-none">
            🔴 Live Interactive Dispatch Render Output
          </span>

          {/* Layout Frame Container */}
          <div className="relative border-4 border-black p-1 bg-zinc-300 shadow-xl overflow-hidden w-full max-w-[420px]">
            
            {/* Dimensions Aspect ratio container */}
            <div 
              id="infographic-mockup-stage"
              className={`w-full transition-all duration-300 relative select-text overflow-hidden ${
                layout === 'instagram' ? 'aspect-square' : 'aspect-[9/16]'
              } ${
                theme === 'dark-sovereign' 
                  ? 'bg-gradient-to-b from-[#121315] to-[#080809] text-white border border-zinc-800' 
                  : theme === 'gold-prestige'
                    ? 'bg-gradient-to-b from-[#0a0a0c] to-[#1c1811] text-white border border-amber-900'
                    : theme === 'crimson-intercept'
                      ? 'bg-gradient-to-b from-[#581c1c] to-[#2c0e0e] text-white border border-red-950'
                      : 'bg-gradient-to-b from-[#022c22] to-[#011c15] text-white border border-emerald-950'
              }`}
            >
              
              {/* Tactical background grid lines */}
              <div className="absolute inset-0 grid grid-cols-12 gap-0 opacity-10 pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-full border-r border-dashed border-zinc-400"></div>
                ))}
              </div>

              {/* Editorial double thin borders */}
              <div className={`absolute inset-4 border-2 ${
                theme === 'gold-prestige' ? 'border-amber-600' : theme === 'crimson-intercept' ? 'border-red-400' : theme === 'emerald-finance' ? 'border-emerald-500' : 'border-red-600'
              }`}></div>
              <div className={`absolute inset-5 border ${
                theme === 'gold-prestige' ? 'border-amber-600/60' : theme === 'crimson-intercept' ? 'border-red-400/60' : theme === 'emerald-finance' ? 'border-emerald-500/60' : 'border-red-600/60'
              }`}></div>

              {/* Decorative Corner Coordinate Stamps */}
              <div className="absolute top-7 left-7 text-[8px] font-mono text-zinc-500/80 leading-none">
                33.8938° N / 35.5018° E
              </div>
              <div className="absolute top-7 right-7 text-[8px] font-mono text-zinc-500/80 leading-none uppercase">
                {layout.toUpperCase()}_DISPATCH
              </div>

              {/* Mockup content scroll flow */}
              <div className="relative h-full flex flex-col justify-between items-center p-8 pt-12 pb-12 z-10 text-center">
                
                {/* Logo Badge */}
                {showLogo && (
                  <div className={`flex flex-col items-center bg-black/40 border px-6 py-2 transition-all mt-1 ${
                    theme === 'gold-prestige' ? 'border-amber-600/30' : theme === 'crimson-intercept' ? 'border-red-500/30' : theme === 'emerald-finance' ? 'border-emerald-500/30' : 'border-red-500/30'
                  }`}>
                    <span className="font-sans font-black text-2xl tracking-normal text-white">الورّاق</span>
                    <span className={`font-mono text-[7px] font-black tracking-widest ${
                      theme === 'gold-prestige' ? 'text-amber-500' : theme === 'crimson-intercept' ? 'text-red-400' : theme === 'emerald-finance' ? 'text-emerald-400' : 'text-red-500'
                    }`}>
                      AL-WARRAQ GEOPOLITICAL SUITE
                    </span>
                  </div>
                )}

                {/* Core Headline & Synopsis Center Block */}
                <div className="space-y-4 my-auto w-full px-4">
                  {/* Headline */}
                  <h4 
                    className="font-sans font-extrabold leading-tight tracking-tight text-white text-center text-xl md:text-2xl" 
                    style={{ wordBreak: 'break-word', fontFamily: 'Cairo, sans-serif' }}
                  >
                    {headline || (infoLanguage === 'ar' ? 'أدخل عنوان الخبر' : 'Enter Headline')}
                  </h4>

                  {/* Red/Accent separator bar */}
                  <div className={`w-16 h-0.5 mx-auto ${
                    theme === 'gold-prestige' ? 'bg-amber-500' : theme === 'crimson-intercept' ? 'bg-red-400' : theme === 'emerald-finance' ? 'bg-emerald-500' : 'bg-red-600'
                  }`} />

                  {/* Synopsis Text */}
                  <p 
                    className="text-zinc-300 leading-relaxed text-center text-xs md:text-sm font-sans"
                    style={{ wordBreak: 'break-word', fontFamily: 'Cairo, sans-serif' }}
                  >
                    {synopsis || (infoLanguage === 'ar' ? 'الموجز الصحفي للبرقة الاستخبارية يظهر هنا...' : 'Story brief and geopolitical summary displays here...')}
                  </p>
                </div>

                {/* Bottom shortlink ribbon */}
                <div className="w-full space-y-3">
                  <div className={`mx-auto max-w-[320px] p-2 bg-black/50 border text-center ${
                    theme === 'gold-prestige' ? 'border-amber-500/40 text-amber-200' : theme === 'crimson-intercept' ? 'border-red-500/40 text-red-200' : theme === 'emerald-finance' ? 'border-emerald-500/40 text-emerald-200' : 'border-red-500/40 text-red-200'
                  }`}>
                    <span className="font-mono text-[10px] font-black tracking-wider uppercase">
                      READ AT: {shortLink}
                    </span>
                  </div>
                  
                  <span className="text-[8px] font-mono text-zinc-500/60 block uppercase">
                    CLASSIFIED DISPATCH DISSEMINATION SYSTEM © AL-WARRAQ
                  </span>
                </div>

              </div>

              {/* TikTok UI Overlay Mockup (Visible only for TikTok layout to verify safe zones) */}
              {layout === 'tiktok' && (
                <div className="absolute inset-0 pointer-events-none flex justify-between p-4 text-[10px] font-sans text-white/40">
                  {/* Left Bottom TikTok Creator details */}
                  <div className="absolute bottom-6 left-6 text-left space-y-1">
                    <span className="font-bold text-white/60">@alwarraqnews</span>
                    <p className="text-[9px] text-white/40 max-w-[200px]">Strategic intel forwarded straight from our bureau in Beirut #geopolitics</p>
                  </div>
                  {/* Right TikTok controls */}
                  <div className="absolute right-4 bottom-24 flex flex-col items-center gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">❤️</span>
                      <span className="text-[8px] mt-0.5">12.4K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">💬</span>
                      <span className="text-[8px] mt-0.5">859</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">⭐️</span>
                      <span className="text-[8px] mt-0.5">4.2K</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* SIMULATION PIPELINE LOGS DISPLAY */}
          {(socialLogs.length > 0 || isPublishing) && (
            <div className="w-full max-w-[420px] bg-black border-2 border-black text-xs font-mono p-4 text-emerald-400 space-y-2 shadow-lg">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2">
                <span className="font-black text-[10px] uppercase text-zinc-400">
                  ⚡ API Transmission Logs ({publishPlatform?.toUpperCase()})
                </span>
                {isPublishing ? (
                  <span className="flex items-center gap-1 text-amber-400 text-[9px] font-extrabold uppercase tracking-wide animate-pulse">
                    <RefreshCw size={10} className="animate-spin" />
                    Transmitting...
                  </span>
                ) : (
                  <span className="text-emerald-500 text-[9px] font-black uppercase">
                    COMPLETED
                  </span>
                )}
              </div>
              
              <div className="max-h-[160px] overflow-y-auto space-y-1.5 custom-scrollbar pr-2 select-text">
                {socialLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-1.5 items-start leading-relaxed text-xxs">
                    <span className="text-zinc-500 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

              {publishSuccess && (
                <div className="bg-emerald-950/40 border border-emerald-800/60 p-2.5 mt-2 flex items-center gap-2 text-xxs text-emerald-300">
                  <Check size={14} className="shrink-0 text-emerald-400" />
                  <span>
                    {isAr 
                      ? 'تم نشر المادة بنجاح تام! تم ترحيل الوسائط إلى صفحة الأخبار الاجتماعية لـ @alwarraqnews.' 
                      : 'Dispatch successfully deployed to production social graph endpoints.'}
                  </span>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
