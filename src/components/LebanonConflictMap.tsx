import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Flame, 
  Map as MapIcon, 
  Layers, 
  Activity, 
  Crosshair, 
  Compass, 
  Info, 
  AlertTriangle,
  Server,
  Radio,
  Sliders,
  Sparkles
} from 'lucide-react';

interface ZoneData {
  id: string;
  nameAr: string;
  nameEn: string;
  majorTownsAr: string[];
  majorTownsEn: string[];
  altitude: string;
  terrainAr: string;
  terrainEn: string;
  
  // Dynamic stats & status based on active intensity phase
  phases: {
    [key: string]: {
      statusAr: string;
      statusEn: string;
      activityLevel: 'EXTREME' | 'HEAVY' | 'MODERATE' | 'LOW';
      color: string;
      descriptionAr: string;
      descriptionEn: string;
      estimatedDailyStrikes: number;
    }
  }
}

const REGIONAL_ZONES: ZoneData[] = [
  {
    id: 'sector-west',
    nameAr: 'القطاع الغربي (الناقورة - علما الشعب)',
    nameEn: 'Sector West (Naqoura - Alma al-Shaab)',
    majorTownsAr: ['الناقورة', 'علما الشعب', 'الضهيرة', 'يارين'],
    majorTownsEn: ['Naqoura', 'Alma al-Shaab', 'Dhairah', 'Yarin'],
    altitude: '100m - 350m',
    terrainAr: 'تلال منخفضة الارتفاع، قريبة من الساحل والأراضي المكشوفة.',
    terrainEn: 'Low altitude coastal rolling hills and flat citrus grove buffers.',
    phases: {
      low: {
        statusAr: 'مناوشات استطلاع متقطعة',
        statusEn: 'Intermittent Reconnaissance Exchanges',
        activityLevel: 'LOW',
        color: '#10b981',
        descriptionAr: 'تحركات استطلاع صغيرة على طول نقاط الخط الأزرق الساحلية وإطلاق قذائف إنارة فوق رأس الناقورة.',
        descriptionEn: 'Small-scale patrol maneuvers along coastal Blue Line markers with occasional offshore flares near Naqoura.',
        estimatedDailyStrikes: 3
      },
      medium: {
        statusAr: 'قصف مدفعي واستهداف أبراج الرصد',
        statusEn: 'Artillery Duel & Optical Post Hits',
        activityLevel: 'HEAVY',
        color: '#fbbf24',
        descriptionAr: 'استهداف مباشر لنقاط المراقبة والرادارات التقنية وتدمير جدران الخرسانة مع قنابل فسفورية حارقة بالأحراش.',
        descriptionEn: 'Systematic targeting of communication towers, technological radars, and foliage-burning white phosphorus exchanges.',
        estimatedDailyStrikes: 18
      },
      extreme: {
        statusAr: 'إنزال بحري محاكى واختراق بري ساحلي',
        statusEn: 'Coastal Amphibious Simulated Raids & Armor Jabs',
        activityLevel: 'EXTREME',
        color: '#ef4444',
        descriptionAr: 'تدمير البنية التحتية للطريق الساحلي واجتياحات مدرعة باتجاه تل المشرفة وغرب مروحين.',
        descriptionEn: 'Destruction of the coastal highway corridor with high-volume armored probes aiming up toward Shamaa ridge lines.',
        estimatedDailyStrikes: 65
      }
    }
  },
  {
    id: 'sector-central',
    nameAr: 'القطاع الأوسط (بنت جبيل - مارون الرأس)',
    nameEn: 'Sector Central (Bint Jbeil - Maroun al-Ras)',
    majorTownsAr: ['بنت جبيل', 'مارون الرأس', 'عيتا الشعب', 'رميش'],
    majorTownsEn: ['Bint Jbeil', 'Maroun al-Ras', 'Ayta al-Shab', 'Rmeish'],
    altitude: '700m - 900m',
    terrainAr: 'سلاسل جبلية صخرية شديدة الانحدار ودهاليز أودية وعرة.',
    terrainEn: 'Rocky mountain valleys, steep high altitude slopes and defensive subterranean networks.',
    phases: {
      low: {
        statusAr: 'قصف تكتيكي متبادل بمدافع الهاون',
        statusEn: 'Symmetrical Tactical Mortar Fire',
        activityLevel: 'MODERATE',
        color: '#34d399',
        descriptionAr: 'قصف متبادل يستهدف الأودية المقابلة لمستوطنتي دوفيف وأفيميم لمنع التسلل الأرضي.',
        descriptionEn: 'Targeted exchanges focused strictly on valleys facing Dovev and Avivim outposts to deter recon teams.',
        estimatedDailyStrikes: 8
      },
      medium: {
        statusAr: 'غارات جوية ثقيلة وحرب مسيرات من حافة الحدود',
        statusEn: 'Heavy Air Strikes & Border Drone Warfare',
        activityLevel: 'HEAVY',
        color: '#fbbf24',
        descriptionAr: 'قصف جوي متكرر على أطراف يارون وعيتا الشعب، وغارات بالصواريخ الارتجاجية على الأنفاق ومخابئ تخزين السلاح.',
        descriptionEn: 'Frequent fighter sweeps over Ayta and Yaroun. Underground bunker-busting strikes mapping deep storage facilities.',
        estimatedDailyStrikes: 32
      },
      extreme: {
        statusAr: 'اشتباكات التحام بري عنيف وحرب شوارع',
        statusEn: 'Close-Quarters Urban Probes & Street Battles',
        activityLevel: 'EXTREME',
        color: '#ef4444',
        descriptionAr: 'اندفاع فرق مشاة مدرعة عبر مرتفعات مارون الرأس واشتباكات وجهاً لوجه بمحيط مثلث مشروع الصفير بمدينة بنت جبيل.',
        descriptionEn: 'Infantry division breakthroughs over Maroun al-Ras. High-intensity street battles around Bint Jbeil choke corridors.',
        estimatedDailyStrikes: 110
      }
    }
  },
  {
    id: 'sector-east',
    nameAr: 'القطاع الشرقي (خيام - مرجعيون)',
    nameEn: 'Sector East (Khiam - Marjayoun)',
    majorTownsAr: ['الخيام', 'كفركلا', 'مرجعيون', 'عديسة'],
    majorTownsEn: ['Khiam', 'Kfar Kila', 'Marjayoun', 'Odaisseh'],
    altitude: '600m - 850m',
    terrainAr: 'سهول مفتوحة (سهل الخيام) تقود إلى تلال ومضايق جبلية جافة.',
    terrainEn: 'Open flat valley plains (Khiam plain) surrounded by dry karst cliffs and hills.',
    phases: {
      low: {
        statusAr: 'تبادل محدود لنترات نيران القنص',
        statusEn: 'Slight Sniping & Light Machine Gun Fires',
        activityLevel: 'LOW',
        color: '#10b981',
        descriptionAr: 'إطلاق نار تحذيري على العابرين بمحيط بوابة فاطمة بكفركلا وقذائف دخانية في كفرشوبا.',
        descriptionEn: 'Thermal-guided defensive gunfire at FATIMA Gate in Kfar Kila. Defensive smoke screening in Kfar Shouba.',
        estimatedDailyStrikes: 5
      },
      medium: {
        statusAr: 'قصف مدفعي مركز لسهل الخيام ولأطراف كفركلا',
        statusEn: 'Concentrated Artillery Saturation of Khiam Plain',
        activityLevel: 'HEAVY',
        color: '#fbbf24',
        descriptionAr: 'قصف مدفعي مباشر بنترات الفوسفور لحجب الرؤية على طول الجناح الشرقي لنهر الحاصباني وتدمير منازل خيام.',
        descriptionEn: 'Heavy 155mm shelling targeting defensive lookouts and storage hubs on the eastern margins of Hasbani Valley.',
        estimatedDailyStrikes: 45
      },
      extreme: {
        statusAr: 'التفاف دبابات ميركافا واشتباكات المدرعات الكبرى',
        statusEn: 'Merkava Tank Flanking & Armor Firestorms',
        activityLevel: 'EXTREME',
        color: '#ef4444',
        descriptionAr: 'محاولة التفاف مدرع كامل من سهل الخيام وبوابة العمرة لتطويق مرتفعات تل الحمامص والأحياء الجنوبية لكفركلا.',
        descriptionEn: 'Three-pronged armor push from Metulla and Khiam Plain attempting to envelope the historic Hamamas hilltops.',
        estimatedDailyStrikes: 140
      }
    }
  },
  {
    id: 'sector-hermon',
    nameAr: 'منحدرات جبل الشيخ ومزارع شبعا كفرشوبا',
    nameEn: 'Hermon Slopes & Shebaa Farms Ridge',
    majorTownsAr: ['شبعا', 'حلتا', 'كفرشوبا', 'الفرديس'],
    majorTownsEn: ['Shebaa', 'Halta', 'Kfar Shouba', 'Fardis'],
    altitude: '1000m - 1800m',
    terrainAr: 'جبال عالية جداً وعرة، صخور ثلجية، ومغاور ومغارات طبيعية محصنة.',
    terrainEn: 'Ultra-high limestone peaks, sub-zero snow sweeps and dense natural caves.',
    phases: {
      low: {
        statusAr: 'نيران رصد روتينية وقصف كاشف',
        statusEn: 'Routine Surveillance Thermal Scans',
        activityLevel: 'LOW',
        color: '#10b981',
        descriptionAr: 'قذائف تكتيكية متبادلة على مواقع الرادار الإسرائيلي برأس مرصد شبعا.',
        descriptionEn: 'Intermittent exchange of RPG-guided strikes targeting the telemetry listening dome on Mt. Hermon.',
        estimatedDailyStrikes: 2
      },
      medium: {
        statusAr: 'احتدام حرب الصواريخ الموجهة بالأحراش الجبلية',
        statusEn: 'Alpine Guided-Missile Engagements',
        activityLevel: 'HEAVY',
        color: '#fbbf24',
        descriptionAr: 'شن غارات جوية ثقيلة على وديان شبعا ومنحدرات السدّانة لضرب خطوط الإمداد القادمة من البقاع.',
        descriptionEn: 'Targeted jet strikes against Shebaa valleys to disrupt deep logistical links coming from eastern Bekaa.',
        estimatedDailyStrikes: 20
      },
      extreme: {
        statusAr: 'قصف تدميري شامل للمنحدرات وبتر خطوط الاتصال',
        statusEn: 'Total High-Altitude Artillery Saturation',
        activityLevel: 'EXTREME',
        color: '#ef4444',
        descriptionAr: 'قصف سجادي كاسح يحول المنحدرات الصخرية لأرض محروقة، واشتباكات قوات النخبة للمغاوير الجبلية بالأودية الثلجية.',
        descriptionEn: 'Carpet aerial shelling, transforming the alpine topography into a zero-cover zone with mountain commando probes.',
        estimatedDailyStrikes: 80
      }
    }
  }
];

import { Article } from '../types';
import { INITIAL_ARTICLES } from '../data';
import { ArrowRight, BookOpen, Newspaper } from 'lucide-react';

interface LebanonConflictMapProps {
  language: 'ar' | 'en';
  allArticles?: Article[];
  onSelectArticle?: (article: Article) => void;
}

export default function LebanonConflictMap({ 
  language,
  allArticles,
  onSelectArticle
}: LebanonConflictMapProps) {
  const isAr = language === 'ar';
  
  // Tactical phase representing intensity tiers
  const [activePhase, setActivePhase] = useState<'low' | 'medium' | 'extreme'>('medium');
  const [selectedZone, setSelectedZone] = useState<ZoneData>(REGIONAL_ZONES[1]);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const ZONE_ARTICLE_MAP: Record<string, string> = {
    'sector-west': 'us-intel-trump-netanyahu-lebanon',
    'sector-central': 'israel-escalation-logic-lebanon',
    'sector-east': 'ali-al-taher-investigation',
    'sector-hermon': 'excl-starlink-lebanon',
  };

  const getArticleForZoneId = (zoneId: string) => {
    const list = allArticles && allArticles.length > 0 ? allArticles : INITIAL_ARTICLES;
    const artId = ZONE_ARTICLE_MAP[zoneId];
    return list.find(a => a.id === artId);
  };

  const activeTargetArticle = getArticleForZoneId(selectedZone.id);

  return (
    <div id="lebanon-regional-conflict-map-widget" className="border-4 border-black bg-slate-50 p-4 md:p-6 space-y-6 select-none my-8">
      
      {/* Indicator Tag & Headers */}
      <div className="border-b-2 border-black pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-black text-[#fbbf24] font-mono text-[9px] font-black px-2 py-0.5 tracking-wider uppercase">
            <Activity className="animate-pulse" size={11} />
            {isAr ? "ديوان رصد الخطر التكتيكي والميداني" : "Operational Heatmap & Sector Evaluator"}
          </div>
          <h3 className="font-sans font-black text-xl md:text-2xl text-black">
            {isAr ? "مقياس مستويات التصعيد في جبهة جنوب لبنان ٢٠٢٦" : "Dynamic Escalation Heatmap: South Lebanon 2026"}
          </h3>
          <p className="font-sans text-zinc-600 text-xs font-semibold leading-relaxed max-w-2xl">
            {isAr 
              ? "تحكم بمستويات التصعيد العسكري لمراقبة تحول الخطر الجيو-طبوغرافي ونطاق القصف اليومي المقدر بقطاعات الجنوب الأربعة."
              : "Adjust the tactical intensity level below to visualize how the defensive thresholds and daily attack profiles alter across the frontline sectors."
            }
          </p>
        </div>

        {/* Live Status Board */}
        <div className="border border-black p-2.5 bg-white shadow-custom text-left font-mono text-[10px] space-y-1">
          <div className="flex items-center gap-1.5 justify-between">
            <span className="text-zinc-400 font-bold uppercase">FEED:</span>
            <span className="text-red-600 font-black animate-pulse uppercase">LIVE DATA STREAM</span>
          </div>
          <div className="flex items-center gap-1.5 justify-between">
            <span className="text-zinc-400 font-bold uppercase">INTENSITY STATE:</span>
            <span className={`font-black uppercase ${
              activePhase === 'low' ? 'text-[#10b981]' : activePhase === 'medium' ? 'text-amber-500' : 'text-red-500'
            }`}>
              {activePhase === 'low' ? (isAr ? 'منخفض' : 'Calibrated') : activePhase === 'medium' ? (isAr ? 'متوسط مرتفع' : 'Heavy/Aereal') : (isAr ? 'شامل/حرج للغاية' : 'Full Incursion')}
            </span>
          </div>
        </div>
      </div>

      {/* Control Dial: Scalable Escalation Tier Dial */}
      <div className="bg-white border-2 border-black p-4 flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-2.5">
          <Sliders className="text-[#b91c1c]" size={18} />
          <span className="font-sans font-black text-sm text-black">
            {isAr ? "مؤشر التحكم في خط التصعيد:" : "Escalation Threat Index Control:"}
          </span>
        </div>

        {/* Triple option slider */}
        <div className="grid grid-cols-3 gap-2 w-full md:w-auto min-w-[320px] md:min-w-[450px]">
          <button
            onClick={() => setActivePhase('low')}
            className={`px-3 py-2 text-xxs font-mono font-black border uppercase transition-all flex flex-col items-center justify-center cursor-pointer ${
              activePhase === 'low' 
                ? 'bg-[#10b981] text-white border-black shadow-custom' 
                : 'bg-zinc-50 text-zinc-650 hover:bg-zinc-100 border-zinc-300'
            }`}
          >
            <span className="text-[9px] opacity-75">{isAr ? "المستوى الأول" : "TIER I"}</span>
            <span className="font-bold">{isAr ? "نطاق مساندة مضبوط" : "Calibrated Skirmish"}</span>
          </button>

          <button
            onClick={() => setActivePhase('medium')}
            className={`px-3 py-2 text-xxs font-mono font-black border uppercase transition-all flex flex-col items-center justify-center cursor-pointer ${
              activePhase === 'medium' 
                ? 'bg-[#f59e0b] text-white border-black shadow-custom' 
                : 'bg-zinc-50 text-zinc-650 hover:bg-zinc-100 border-zinc-300'
            }`}
          >
            <span className="text-[9px] opacity-75">{isAr ? "المستوى الثاني" : "TIER II"}</span>
            <span className="font-bold">{isAr ? "حرب جوية مكثفة" : "Aerial Saturation"}</span>
          </button>

          <button
            onClick={() => setActivePhase('extreme')}
            className={`px-3 py-2 text-xxs font-mono font-black border uppercase transition-all flex flex-col items-center justify-center cursor-pointer ${
              activePhase === 'extreme' 
                ? 'bg-[#ef4444] text-white border-black shadow-custom' 
                : 'bg-zinc-50 text-zinc-650 hover:bg-zinc-100 border-zinc-300'
            }`}
          >
            <span className="text-[9px] opacity-75">{isAr ? "المستوى الثالث" : "TIER III"}</span>
            <span className="font-bold">{isAr ? "اختراقات والتحام بري" : "Full-Scale Incursion"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Map Visual Vector (Left) & Sector dossier readout (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* SVG Interactive Regional Vector (8cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          
          <div className="border-4 border-black bg-slate-900 aspect-[800/420] relative overflow-hidden shadow-custom">
            
            {/* HUD / System overlay warnings */}
            <div className="absolute top-3 left-4 flex items-center gap-1.5 bg-black/85 border border-zinc-700 px-2 py-1 select-none pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
              <span className="font-mono text-[9px] text-[#fbbf24] font-black uppercase tracking-widest leading-none">
                {isAr ? "شريط الرادار الإقليمي" : "SATELLITE SECTOR RADAR"}
              </span>
            </div>

            {/* Tactical Heat opacity overlays */}
            <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
              activePhase === 'low' 
                ? 'bg-emerald-500/5' 
                : activePhase === 'medium' 
                ? 'bg-amber-500/10' 
                : 'bg-red-500/15'
            }`} />

            {/* Actual Vector Drawing */}
            <svg 
              className="w-full h-full"
              viewBox="0 0 800 420"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Visual patterns */}
                <pattern id="diag-stripes" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(239, 68, 68, 0.15)" strokeWidth="3" />
                </pattern>
                {/* Glow Filter */}
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <g id="grid-coordinates-overlay" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="5,10">
                <line x1="100" y1="0" x2="100" y2="420" />
                <line x1="200" y1="0" x2="200" y2="420" />
                <line x1="300" y1="0" x2="300" y2="420" />
                <line x1="400" y1="0" x2="400" y2="420" />
                <line x1="500" y1="0" x2="500" y2="420" />
                <line x1="600" y1="0" x2="600" y2="420" />
                <line x1="700" y1="0" x2="700" y2="420" />
                
                <line x1="0" y1="100" x2="800" y2="100" />
                <line x1="0" y1="200" x2="800" y2="200" />
                <line x1="0" y1="300" x2="800" y2="300" />
              </g>

              {/* ------------------- FRONT MAP BOUNDARIES & RIVER GEOGRAPHIES ------------------- */}
              {/* Blue Line boundary approximation (representing border) */}
              <g id="blue-line-border">
                <path 
                  d="M 50,330 C 120,310 160,320 230,350 T 360,340 T 490,320 T 570,300 T 720,280" 
                  stroke="#3b82f6" 
                  strokeWidth="3.5" 
                  fill="none" 
                  strokeDasharray="6,4"
                  className="opacity-60"
                />
                <text x="590" y="270" fill="#60a5fa" fontSize="8" fontFamily="monospace" fontWeight="bold" className="tracking-widest">
                  {isAr ? "الخط الأزرق / BLUE LINE" : "BLUE LINE SEPARATION BOUNDARY"}
                </text>
              </g>

              {/* Litani River natural barrier further north */}
              <g id="litani-natural-barrier">
                <path 
                  d="M 40,165 Q 160,150 240,175 T 390,190 T 520,170 T 700,160" 
                  stroke="#0284c7" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeLinecap="round"
                  className="opacity-45"
                />
                <path 
                  d="M 40,165 Q 160,150 240,175 T 390,190 T 520,170 T 700,160" 
                  stroke="#38bdf8" 
                  strokeWidth="1.5" 
                  fill="none" 
                  strokeLinecap="round"
                />
                <text x="60" y="145" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="black" className="tracking-widest">
                  {isAr ? "مجرى نهر الليطاني العازل" : "LITANI RIVER NATURAL DEFENSIVE LINE"}
                </text>
              </g>

              {/* ------------------- REGIONAL SECTOR POLYGONS ------------------- */}
              {/* Sector West Polygon */}
              <g 
                onClick={() => setSelectedZone(REGIONAL_ZONES[0])}
                onMouseEnter={() => setHoveredZoneId('sector-west')}
                onMouseLeave={() => setHoveredZoneId(null)}
                className="cursor-pointer"
              >
                <polygon 
                  points="50,330 230,350 210,180 50,180" 
                  fill={selectedZone.id === 'sector-west' ? 'rgba(148, 163, 184, 0.25)' : hoveredZoneId === 'sector-west' ? 'rgba(148, 163, 184, 0.15)' : 'rgba(255,255,255,0.015)'}
                  stroke={selectedZone.id === 'sector-west' ? '#ffffff' : '#475569'}
                  strokeWidth={selectedZone.id === 'sector-west' ? 2 : 1}
                  className="transition-all duration-300"
                />
                <circle cx="120" cy="250" r={activePhase === 'low' ? 6 : activePhase === 'medium' ? 14 : 26} fill="rgba(239,68,68,0.3)" filter="url(#softGlow)" />
                <circle cx="120" cy="250" r="4" fill="#ef4444" />
                <text x="120" y="235" fill="#f8fafc" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  {isAr ? "الناقورة" : "NAQOURA"}
                </text>

                {/* Clickable reading badge */}
                <g 
                  onClick={(e) => {
                    e.stopPropagation();
                    const art = getArticleForZoneId('sector-west');
                    if (art && onSelectArticle) onSelectArticle(art);
                  }}
                  className="cursor-pointer select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                >
                  <rect 
                    x="85" y="243" width="70" height="13" 
                    rx="2" 
                    fill="#b91c1c" 
                    stroke="#ffffff" 
                    strokeWidth="0.75"
                    opacity="0.95"
                    className="hover:fill-red-700 transition"
                  />
                  <text 
                    x="120" y="252" 
                    fill="#ffffff" 
                    fontSize="7" 
                    fontFamily="sans-serif" 
                    fontWeight="black" 
                    textAnchor="middle"
                  >
                    {isAr ? "📖 اقرأ التقرير" : "📖 Read Report"}
                  </text>
                </g>
              </g>

              {/* Sector Central Polygon */}
              <g 
                onClick={() => setSelectedZone(REGIONAL_ZONES[1])}
                onMouseEnter={() => setHoveredZoneId('sector-central')}
                onMouseLeave={() => setHoveredZoneId(null)}
                className="cursor-pointer"
              >
                <polygon 
                  points="230,350 490,320 440,185 210,180" 
                  fill={selectedZone.id === 'sector-central' ? 'rgba(148, 163, 184, 0.25)' : hoveredZoneId === 'sector-central' ? 'rgba(148, 163, 184, 0.15)' : 'rgba(255,255,255,0.015)'}
                  stroke={selectedZone.id === 'sector-central' ? '#ffffff' : '#475569'}
                  strokeWidth={selectedZone.id === 'sector-central' ? 2 : 1}
                  className="transition-all duration-300"
                />
                {/* Scaled Threat circles */}
                <circle cx="350" cy="260" r={activePhase === 'low' ? 9 : activePhase === 'medium' ? 22 : 44} fill="rgba(239,68,68,0.35)" filter="url(#softGlow)" />
                <circle cx="350" cy="260" r="5" fill="#ef4444" />
                <text x="350" y="245" fill="#f8fafc" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  {isAr ? "بنت جبيل" : "BINT JBEIL"}
                </text>

                {/* Clickable reading badge */}
                <g 
                  onClick={(e) => {
                    e.stopPropagation();
                    const art = getArticleForZoneId('sector-central');
                    if (art && onSelectArticle) onSelectArticle(art);
                  }}
                  className="cursor-pointer select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                >
                  <rect 
                    x="315" y="253" width="70" height="13" 
                    rx="2" 
                    fill="#b91c1c" 
                    stroke="#ffffff" 
                    strokeWidth="0.75"
                    opacity="0.95"
                    className="hover:fill-red-700 transition"
                  />
                  <text 
                    x="350" y="262" 
                    fill="#ffffff" 
                    fontSize="7" 
                    fontFamily="sans-serif" 
                    fontWeight="black" 
                    textAnchor="middle"
                  >
                    {isAr ? "📖 اقرأ التقرير" : "📖 Read Report"}
                  </text>
                </g>
              </g>

              {/* Sector East Polygon */}
              <g 
                onClick={() => setSelectedZone(REGIONAL_ZONES[2])}
                onMouseEnter={() => setHoveredZoneId('sector-east')}
                onMouseLeave={() => setHoveredZoneId(null)}
                className="cursor-pointer"
              >
                <polygon 
                  points="490,320 590,300 620,180 440,185" 
                  fill={selectedZone.id === 'sector-east' ? 'rgba(148, 163, 184, 0.25)' : hoveredZoneId === 'sector-east' ? 'rgba(148, 163, 184, 0.15)' : 'rgba(255,255,255,0.015)'}
                  stroke={selectedZone.id === 'sector-east' ? '#ffffff' : '#475569'}
                  strokeWidth={selectedZone.id === 'sector-east' ? 2 : 1}
                  className="transition-all duration-300"
                />
                <circle cx="530" cy="250" r={activePhase === 'low' ? 7 : activePhase === 'medium' ? 26 : 56} fill="rgba(239,68,68,0.35)" filter="url(#softGlow)" />
                <circle cx="530" cy="250" r="4" fill="#ef4444" />
                <text x="530" y="235" fill="#f8fafc" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  {isAr ? "الخيام / مرجعيون" : "KHIAM / MARJAYOUN"}
                </text>

                {/* Clickable reading badge */}
                <g 
                  onClick={(e) => {
                    e.stopPropagation();
                    const art = getArticleForZoneId('sector-east');
                    if (art && onSelectArticle) onSelectArticle(art);
                  }}
                  className="cursor-pointer select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                >
                  <rect 
                    x="495" y="243" width="70" height="13" 
                    rx="2" 
                    fill="#b91c1c" 
                    stroke="#ffffff" 
                    strokeWidth="0.75"
                    opacity="0.95"
                    className="hover:fill-red-700 transition"
                  />
                  <text 
                    x="530" y="252" 
                    fill="#ffffff" 
                    fontSize="7" 
                    fontFamily="sans-serif" 
                    fontWeight="black" 
                    textAnchor="middle"
                  >
                    {isAr ? "📖 اقرأ التقرير" : "📖 Read Report"}
                  </text>
                </g>
              </g>

              {/* Mount Hermon & Shebaa Polygon */}
              <g 
                onClick={() => setSelectedZone(REGIONAL_ZONES[3])}
                onMouseEnter={() => setHoveredZoneId('sector-hermon')}
                onMouseLeave={() => setHoveredZoneId(null)}
                className="cursor-pointer"
              >
                <polygon 
                  points="590,300 750,280 710,150 620,180" 
                  fill={selectedZone.id === 'sector-hermon' ? 'rgba(148, 163, 184, 0.25)' : hoveredZoneId === 'sector-hermon' ? 'rgba(148, 163, 184, 0.15)' : 'rgba(255,255,255,0.015)'}
                  stroke={selectedZone.id === 'sector-hermon' ? '#ffffff' : '#475569'}
                  strokeWidth={selectedZone.id === 'sector-hermon' ? 2 : 1}
                  className="transition-all duration-300"
                />
                <circle cx="670" cy="220" r={activePhase === 'low' ? 5 : activePhase === 'medium' ? 16 : 38} fill="rgba(239,68,68,0.3)" filter="url(#softGlow)" />
                <circle cx="670" cy="220" r="4" fill="#ef4444" />
                <text x="670" y="205" fill="#f8fafc" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  {isAr ? "مزارع شبعا" : "SHEBAA FARMS"}
                </text>

                {/* Clickable reading badge */}
                <g 
                  onClick={(e) => {
                    e.stopPropagation();
                    const art = getArticleForZoneId('sector-hermon');
                    if (art && onSelectArticle) onSelectArticle(art);
                  }}
                  className="cursor-pointer select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                >
                  <rect 
                    x="635" y="213" width="70" height="13" 
                    rx="2" 
                    fill="#b91c1c" 
                    stroke="#ffffff" 
                    strokeWidth="0.75"
                    opacity="0.95"
                    className="hover:fill-red-700 transition"
                  />
                  <text 
                    x="670" y="222" 
                    fill="#ffffff" 
                    fontSize="7" 
                    fontFamily="sans-serif" 
                    fontWeight="black" 
                    textAnchor="middle"
                  >
                    {isAr ? "📖 اقرأ التقرير" : "📖 Read Report"}
                  </text>
                </g>
              </g>

              {/* Compass symbol in empty top-right space */}
              <g transform="translate(730, 60)" className="opacity-45 select-none pointer-events-none">
                <circle cx="0" cy="0" r="20" fill="none" stroke="#94a3b8" strokeWidth="1" />
                <line x1="-24" y1="0" x2="24" y2="0" stroke="#475569" strokeWidth="1" />
                <line x1="0" y1="-24" x2="0" y2="24" stroke="#475569" strokeWidth="1" />
                <polygon points="0,-16 4,0 0,4" fill="#ef4444" />
                <polygon points="0,16 4,0 0,-4" fill="#94a3b8" />
                <text x="-4" y="-28" fill="#ef4444" fontSize="8" fontFamily="monospace" fontWeight="heavy">N</text>
              </g>

              {/* Mediterranean water label bottom-left */}
              <g transform="translate(68, 380)" className="opacity-30">
                <text x="0" y="0" fill="#38bdf8" fontSize="9" fontFamily="monospace" className="tracking-widest font-black uppercase">
                  {isAr ? "حوض البحر الأبيض المتوسط" : "MEDITERRANEAN SEA"}
                </text>
              </g>

            </svg>
          </div>

          {/* Interactive instruction banner */}
          <div className="flex items-center gap-2 bg-zinc-150 border-2 border-black p-2.5 font-sans font-semibold text-[11px] text-zinc-800">
            <Info className="text-zinc-650 shrink-0" size={14} />
            <span>
              {isAr 
                ? "انقر على أحد قطاعات الرصد الحدودية (الناقورة، بنت جبيل، مرجعيون، شبعا) على خربطة الرادار لمشاهدة الملف الاستخباري وعقد القتال المقابلة."
                : "Interactive tip: Click on individual combat sectors (Naqoura, Bint Jbeil, Khiam, Shebaa) directly on the vector radar above to load the operational brief."
              }
            </span>
          </div>

        </div>

        {/* Intelligence Dossier sidebar (4cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Main Brief Card */}
          <div className="border-4 border-black bg-white p-5 space-y-4 shadow-custom relative">
            
            {/* Sector Title Block */}
            <div className="flex items-center gap-2 border-b-2 border-black pb-3">
              <Crosshair className="text-[#b91c1c] animate-spin-slow" size={18} />
              <div className="leading-tight">
                <span className="font-mono text-[9px] font-black text-zinc-400 block uppercase">
                  {isAr ? "الملف الاستخباري للقطاع" : "Intelligence Area File"}
                </span>
                <h4 className="font-sans font-black text-sm text-black uppercase">
                  {isAr ? selectedZone.nameAr : selectedZone.nameEn}
                </h4>
              </div>
            </div>

            {/* Quick stats panel */}
            <div className="grid grid-cols-2 gap-2 bg-zinc-50 p-2 text-xxs border border-zinc-250 font-semibold leading-relaxed">
              <div>
                <span className="text-zinc-450 uppercase block font-mono text-[9px]">{isAr ? "معدل القصف التقريبي:" : "Daily Shelling rate:"}</span>
                <span className="text-zinc-800 font-mono font-black text-sm">
                  ~ {selectedZone.phases[activePhase].estimatedDailyStrikes} {isAr ? "ضربة يومية" : "daily rounds"}
                </span>
              </div>
              <div>
                <span className="text-zinc-450 uppercase block font-mono text-[9px]">{isAr ? "طبيعة الارتفاع:" : "Operational Altitude:"}</span>
                <span className="text-[#b91c1c] font-mono font-black text-xs">
                  {selectedZone.altitude}
                </span>
              </div>
            </div>

            {/* Phase Status Readout */}
            <div className={`p-3 border-2 border-black ${
              activePhase === 'low' ? 'bg-[#10b981]/10' : activePhase === 'medium' ? 'bg-[#f59e0b]/10' : 'bg-red-500/10'
            }`}>
              <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-1 w-full mb-1.5">
                <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">
                  {isAr ? "الترسيم الحالي للقطاع:" : "Sector Engagement Status:"}
                </span>
                <span className={`text-[9px] font-mono font-black px-1.5 py-0.5 uppercase ${
                  activePhase === 'low' 
                    ? 'bg-[#10b981] text-white' 
                    : activePhase === 'medium' 
                    ? 'bg-[#f59e0b] text-black' 
                    : 'bg-red-500 text-white'
                }`}>
                  {selectedZone.phases[activePhase].activityLevel}
                </span>
              </div>

              <span className="font-sans font-black text-xs text-black block mb-1">
                {isAr ? selectedZone.phases[activePhase].statusAr : selectedZone.phases[activePhase].statusEn}
              </span>
              <p className="font-sans font-semibold text-zinc-700 text-xxs leading-relaxed">
                {isAr ? selectedZone.phases[activePhase].descriptionAr : selectedZone.phases[activePhase].descriptionEn}
              </p>
            </div>

            {/* Geography, Terrain and Major sites */}
            <div className="space-y-3 pt-2 text-xxs">
              <div>
                <span className="font-mono text-[9px] font-black text-zinc-400 block uppercase">
                  {isAr ? "تفاصيل طبيعة التضاريس:" : "Geomorphology & Terrain:"}
                </span>
                <p className="font-sans font-semibold text-zinc-700 mt-0.5 leading-relaxed">
                  {isAr ? selectedZone.terrainAr : selectedZone.terrainEn}
                </p>
              </div>

              <div>
                <span className="font-mono text-[9px] font-black text-zinc-400 block uppercase">
                  {isAr ? "النطاق السكاني ومحاور التجمع:" : "Socio-Military Settlement Overlaps:"}
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(isAr ? selectedZone.majorTownsAr : selectedZone.majorTownsEn).map((town, idx) => (
                    <span key={idx} className="bg-zinc-150 border border-zinc-250 text-neutral-800 font-mono font-bold px-1.5 py-0.5 rounded-sm">
                      📍 {town}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connected Lebanon Conflict Article Integration */}
            {activeTargetArticle && onSelectArticle && (
              <div className="mt-4 pt-3 border-t-2 border-dashed border-black/15 text-left">
                <span className="font-mono text-[9px] font-black text-[#b91c1c] block uppercase mb-1">
                  {isAr ? "التحقيق الميداني والتحليلي المرتبط:" : "Linked Tactical Investigation:"}
                </span>
                
                <div className="bg-red-50/50 border border-[#b91c1c] p-2.5 rounded-sm space-y-2">
                  <div className="flex items-start gap-2">
                    <Newspaper size={14} className="text-[#b91c1c] shrink-0 mt-0.5" />
                    <div className="leading-tight">
                      <span className="font-sans font-black text-xxs text-neutral-900 block line-clamp-2">
                        {isAr ? activeTargetArticle.titleAr : activeTargetArticle.titleEn}
                      </span>
                      <span className="font-mono text-[8px] text-zinc-500 block mt-0.5">
                        {activeTargetArticle.id === 'israel-escalation-logic-lebanon' 
                          ? (isAr ? "المقال المعروض حالياً" : "Currently Viewing")
                          : (activeTargetArticle.category === 'editor-desk'
                            ? (isAr ? 'هيئة تحرير صحيفة الوارّاق' : 'Al-Warraq Editorial Board')
                            : (isAr ? `تأليف: ${activeTargetArticle.author?.nameAr || ''}` : `By: ${activeTargetArticle.author?.nameEn || ''}`)
                          )
                        }
                      </span>
                    </div>
                  </div>

                  {activeTargetArticle.id !== 'israel-escalation-logic-lebanon' ? (
                    <button
                      onClick={() => onSelectArticle(activeTargetArticle)}
                      className="w-full bg-[#b91c1c] hover:bg-red-700 text-white font-sans font-black text-xxs py-1.5 px-2.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <BookOpen size={12} />
                      <span>{isAr ? "افتح واقرأ التحليل الكامل" : "Open and Read Full Analysis"}</span>
                      <ArrowRight size={11} className={isAr ? 'rotate-180' : ''} />
                    </button>
                  ) : (
                    <div className="w-full bg-zinc-100 text-zinc-500 font-sans font-bold text-center text-xxs py-1 border border-zinc-300 rounded-sm">
                      {isAr ? "مفتوح حالياً للرأي والمراجعة" : "Currently detailed in this view"}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Conflict Analysis side note excerpt */}
          <div className="bg-[#b91c1c]/5 border border-black p-4 space-y-1.5 rounded-sm">
            <span className="font-sans font-black text-xs text-[#b91c1c] uppercase flex items-center gap-1">
              <AlertTriangle size={13} />
              {isAr ? "تفسير تذويب خطوط الاشتباك" : "Tactical Fluidity Doctrine"}
            </span>
            <p className="font-sans font-semibold text-[11px] text-zinc-700 leading-normal">
              {isAr 
                ? "تتأثر الفعالية العسكرية للأرتال المهاجمة بنسب تشتيت المحاور وسرعة تنسيق الضربات المدفعية الجانبية من جبهة علي الطاهر وجبل الشيخ."
                : "Operational parameters prove that border defense divisions heavily depend on cross-command signals connecting the Hermon alpine slopes and central ridge lookouts."
              }
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
