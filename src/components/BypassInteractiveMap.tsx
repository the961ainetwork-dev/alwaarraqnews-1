import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Anchor, 
  TrendingUp, 
  ShieldAlert,
  Layers,
  Fuel,
  Activity
} from 'lucide-react';

interface BypassInteractiveMapProps {
  language: 'ar' | 'en';
}

interface MapFeature {
  id: string;
  type: 'pipeline' | 'chokepoint' | 'hub';
  nameEn: string;
  nameAr: string;
  statusEn: string;
  statusAr: string;
  statusColor: string; // text and border color classes
  glowColor: string; // Tailwind glow classes
  capacityEn?: string;
  capacityAr?: string;
  descEn: string;
  descAr: string;
  riskLevelEn: string;
  riskLevelAr: string;
  riskColor: string;
}

export const BypassInteractiveMap: React.FC<BypassInteractiveMapProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('petroline');
  const [activeLayer, setActiveLayer] = useState<'all' | 'pipelines' | 'chokepoints' | 'hubs'>('all');

  const features: Record<string, MapFeature> = {
    petroline: {
      id: 'petroline',
      type: 'pipeline',
      nameEn: 'Saudi East-West Pipeline (Petroline)',
      nameAr: 'خط الأنابيب شرق-غرب السعودي (بترولاين)',
      statusEn: 'ACTIVE BYPASS - MAXIMUM CAPACITY LOAD',
      statusAr: 'التفاف نشط - كفاءة تشغيل قصوى',
      statusColor: 'text-emerald-400 border-emerald-500 bg-emerald-950/25',
      glowColor: 'shadow-emerald-500/50',
      capacityEn: '5.0 Million Barrels/Day (Expandable to 7.0M)',
      capacityAr: '٥.٠ مليون برميل/يومياً (قابل للتوسيع إلى ٧.٠ مليون)',
      descEn: 'The primary overland alternative to the Strait of Hormuz. Stretching 1,200 km from the Eastern Abqaiq plants to the Yanbu port on the Red Sea, it allows Saudi crude to bypass Gulf maritime blockades. Currently running at maximum throughput due to the Hormuz blockade.',
      descAr: 'البديل البري الأهم لمضيق هرمز. يمتد لمسافة ١٢٠٠ كم من معامل بقيق في الشرق إلى ميناء ينبع على البحر الأحمر، مما يسمح للنفط السعودي بتفادي أي حصار بحري في الخليج. يعمل حالياً بالطاقة الكاملة نتيجة تعطيل مضيق هرمز.',
      riskLevelEn: 'MODERATE - Targeted by long-range drone threats',
      riskLevelAr: 'متوسط - هدف لتهديدات المسيرات بعيدة المدى',
      riskColor: 'text-amber-400'
    },
    habshan: {
      id: 'habshan',
      type: 'pipeline',
      nameEn: 'UAE Habshan-Fujairah Pipeline (ADCOP)',
      nameAr: 'خط أنابيب حبشان-الفجيرة الإماراتي (ADCOP)',
      statusEn: 'OPERATIONAL BYPASS',
      statusAr: 'التفاف تشغيلي نشط',
      statusColor: 'text-emerald-400 border-emerald-500 bg-emerald-950/25',
      glowColor: 'shadow-emerald-500/50',
      capacityEn: '1.5 Million Barrels/Day',
      capacityAr: '١.٥ مليون برميل/يومياً',
      descEn: 'Connects the giant Habshan fields in Abu Dhabi to the terminal port of Fujairah, located on the Gulf of Oman. Enables the UAE to export crude oil directly outside the Strait of Hormuz, minimizing maritime risk vectors.',
      descAr: 'يربط حقول حبشان العملاقة في أبوظبي بميناء الفجيرة الواقع على خليج عمان. يتيح لدولة الإمارات تصدير نفطها الخام بالكامل خارج مضيق هرمز، مما يقلل بشكل حاسم من مخاطر النقل الملاحي.',
      riskLevelEn: 'LOW - Heavily fortified terminal defenses',
      riskLevelAr: 'منخفض - دفاعات ساحلية معززة بشكل كامل',
      riskColor: 'text-emerald-400'
    },
    hormuz: {
      id: 'hormuz',
      type: 'chokepoint',
      nameEn: 'Strait of Hormuz (Gulf Chokepoint)',
      nameAr: 'مضيق هرمز (ممر الاختناق الخليجي)',
      statusEn: 'DE FACTO PARTIAL BLOCKADE - ACTIVE ESCALATION',
      statusAr: 'حصار واقعي جزئي - تصعيد عسكري نشط',
      statusColor: 'text-red-500 border-red-700 bg-red-950/25',
      glowColor: 'shadow-red-500/50',
      capacityEn: 'Transits ~20.5 Million Barrels/Day (Normal Baseline)',
      capacityAr: 'يعبر من خلاله حوالي ٢٠.٥ مليون برميل/يومياً (في الوضع الطبيعي)',
      descEn: 'The most critical naval chokepoint on Earth. Currently highly dangerous and partially shut down due to recurring US-Iran missile exchange waves, drone harassment, and aggressive naval mines, causing global insurance premiums to surge and redirection of cargo.',
      descAr: 'الممر المائي الأكثر حرجاً على كوكب الأرض. يشهد حالياً تصعيداً عسكرياً خطيراً وإغلاقاً جزئياً نتيجة لتبادل الرمايات الصاروخية بين القوات الأمريكية وإيران، ونشر الألغام البحرية، مما دفع بأسعار التأمين لارتفاع جنوني وتوجيه التدفقات برياً.',
      riskLevelEn: 'CRITICAL - Active Military War Zone',
      riskLevelAr: 'حرج جداً - منطقة عمليات عسكرية نشطة',
      riskColor: 'text-red-500 animate-pulse'
    },
    bab_mandab: {
      id: 'bab_mandab',
      type: 'chokepoint',
      nameEn: 'Bab al-Mandab Strait (Southern Red Sea)',
      nameAr: 'مضيق باب المندب (بوابة البحر الأحمر الجنوبية)',
      statusEn: 'VOLATILE - ACTIVE PROXY WARFARE FRONT',
      statusAr: 'غير مستقر - جبهة حرب وكلاء نشطة',
      statusColor: 'text-orange-500 border-orange-700 bg-orange-950/25',
      glowColor: 'shadow-orange-500/50',
      capacityEn: 'Transits ~6.2 Million Barrels/Day (Oil + Products)',
      capacityAr: 'يعبر من خلاله حوالي ٦.٢ مليون برميل/يومياً (نفط ومستخرجات)',
      descEn: 'The southern exit of the Red Sea. Active proxy interventions and anti-ship missile attacks launched from Yemen limit the overall utility of Red Sea bypass routes. If closed, Yanbu-bound exports heading to Asia or Europe are bottled up.',
      descAr: 'المخرج الجنوبي للبحر الأحمر. هجمات الصواريخ المضادة للسفن والطائرات المسيرة المنطلقة من اليمن تحد بشكل مباشر من كفاءة الالتفاف التصديري عبر موانئ ينبع، حيث تصبح السفن المتجهة لآسيا أو أوروبا تحت طائلة النيران.',
      riskLevelEn: 'HIGH - Persistent missile & swarm drone threat',
      riskLevelAr: 'مرتفع - تهديدات مستمرة بالصواريخ والمسيرات',
      riskColor: 'text-orange-500'
    },
    suez: {
      id: 'suez',
      type: 'chokepoint',
      nameEn: 'Suez Canal (Northern Red Sea Gateway)',
      nameAr: 'قناة السويس (البوابة الشمالية للبحر الأحمر)',
      statusEn: 'SEVERE FREIGHT SLOWDOWN / SECURED GRID',
      statusAr: 'تباطؤ ملاحي حاد / حماية عسكرية مشددة',
      statusColor: 'text-amber-500 border-amber-700 bg-amber-950/25',
      glowColor: 'shadow-amber-500/50',
      descEn: 'The global trade shortcut connecting the Red Sea to the Mediterranean. Egypt is suffering critical revenue drops as commercial container traffic redirects around Africa to avoid Bab al-Mandab fire vectors.',
      descAr: 'الممر التجاري العالمي الذي يربط البحر الأحمر بالبحر الأبيض المتوسط. تعاني الميزانية المصرية من تراجع حاد في الإيرادات نتيجة لتحول السفن الضخمة للدوران حول أفريقيا لتفادي خطر مضيق باب المندب.',
      riskLevelEn: 'MODERATE - Collateral logistics crisis',
      riskLevelAr: 'متوسط - أزمة لوجستية وتبعات غير مباشرة',
      riskColor: 'text-amber-500'
    },
    abqaiq: {
      id: 'abqaiq',
      type: 'hub',
      nameEn: 'Abqaiq Processing Nerve Center',
      nameAr: 'معامل بقيق للنفط (شريان المعالجة الرئيسي)',
      statusEn: 'OPERATIONAL - SECURED INFRASTRUCTURE',
      statusAr: 'تعمل بكفاءة - منشأة مؤمنة عسكرياً بالكامل',
      statusColor: 'text-emerald-400 border-emerald-500 bg-emerald-950/25',
      glowColor: 'shadow-emerald-500/50',
      capacityEn: 'Stabilizes up to 7.0 Million Barrels/Day',
      capacityAr: 'قدرة معالجة وتثبيت تصل إلى ٧.٠ مليون برميل/يومياً',
      descEn: 'The world\'s largest crude stabilization facility. Located in eastern Saudi Arabia, it acts as the starting point of the East-West Petroline. Highly defended with active anti-air missile batteries and electromagnetic jamming grids.',
      descAr: 'أكبر منشأة لتثبيت ومعالجة النفط الخام في العالم. تقع في المنطقة الشرقية للمملكة وهي بمثابة نقطة الانطلاق والمغذي الرئيسي لخط بترولاين شرق-غرب. محاطة بدفاعات صاروخية معقدة وشبكات تشويش كهرومغناطيسية.',
      riskLevelEn: 'MODERATE - Targeted cyber-reconnaissance alerts',
      riskLevelAr: 'متوسط - إنذارات برصد سيبراني استطلاعي متكرر',
      riskColor: 'text-amber-400'
    },
    yanbu: {
      id: 'yanbu',
      type: 'hub',
      nameEn: 'Yanbu Red Sea Terminal',
      nameAr: 'ميناء ينبع الصناعي (مصب البحر الأحمر)',
      statusEn: 'ACTIVE BYPASS EGRESS PORT',
      statusAr: 'ميناء الالتفاف التصديري النشط',
      statusColor: 'text-emerald-400 border-emerald-500 bg-emerald-950/25',
      glowColor: 'shadow-emerald-500/50',
      capacityEn: 'Egress Point for East-West Petroline Flow',
      capacityAr: 'نقطة المصب والتحميل لتدفقات خط شرق-غرب',
      descEn: 'Saudi Arabia\'s western energy shipping hub. Receives the overland pipeline crude and loads tankers for onward shipment. Facing high density of container and tanker queues but fully functional.',
      descAr: 'محور شحن الطاقة الغربي للمملكة العربية السعودية على البحر الأحمر. يستقبل النفط الخام القادم عبر خط شرق-غرب البري ويشحنه على الناقلات. يواجه حالياً ضغطاً تشغيلياً كبيراً نتيجة لجوء مئات السفن إليه.',
      riskLevelEn: 'MODERATE - Operational bottlenecks and regional alert',
      riskLevelAr: 'متوسط - ضغوط عملياتية وتأهب إقليمي مستمر',
      riskColor: 'text-amber-400'
    }
  };

  const selectedFeature = features[selectedFeatureId] || features.petroline;

  // Custom function to check if a feature matches the current active layer filter
  const isFeatureVisible = (type: 'pipeline' | 'chokepoint' | 'hub') => {
    if (activeLayer === 'all') return true;
    return activeLayer === type;
  };

  return (
    <div className="bg-[#0f1115] border border-zinc-800 p-4 md:p-6 rounded-md shadow-2xl relative overflow-hidden" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      
      {/* Geopolitical scanline layer */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

      {/* Header */}
      <div className="border-b border-zinc-800 pb-4 mb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-black text-emerald-400 tracking-wider uppercase">
              {isAr ? 'منظومة محاكاة الممرات الاستراتيجية والالتفاف البري' : 'Sovereign Pipeline Bypass & Corridor Simulation'}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-sans font-black text-white tracking-tight uppercase">
            {isAr ? '«بترولاين» وممرات الاختناق: مخطط الالتفاف الاستراتيجي' : 'Petroline Bypass Route vs Gulf Maritime Chokepoints'}
          </h3>
          <p className="text-xxs md:text-xs text-zinc-400 font-sans max-w-2xl leading-relaxed">
            {isAr 
              ? 'خريطة تكتيكية ومخطط تفاعلي لمسار خط الأنابيب شرق-غرب لتقييم كفاءة الالتفاف على مضيق هرمز المغلق ومقارنته بنقاط الاختناق الحيوية.' 
              : 'Interactive tactical scheme of the Saudi East-West Petroline assessing alternative bypass routing vs. critical maritime bottlenecks.'}
          </p>
        </div>

        {/* Layer Filters */}
        <div className="flex flex-wrap gap-1.5 font-mono text-[9px] shrink-0">
          {(['all', 'pipelines', 'chokepoints', 'hubs'] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-2 py-1 rounded cursor-pointer border font-bold transition-all ${
                activeLayer === layer
                  ? 'bg-red-950 text-red-400 border-red-800 font-black'
                  : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300'
              }`}
            >
              {layer === 'all' && (isAr ? 'كافة العناصر' : 'ALL LAYERS')}
              {layer === 'pipelines' && (isAr ? 'خطوط الأنابيب' : 'PIPELINES')}
              {layer === 'chokepoints' && (isAr ? 'ممرات الاختناق' : 'CHOKEPOINTS')}
              {layer === 'hubs' && (isAr ? 'مراكز المعالجة' : 'HUBS')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Interactive SVG Map Column */}
        <div className="lg:col-span-7 bg-[#07080a] border border-zinc-800/80 rounded p-3 flex flex-col justify-between relative min-h-[380px] overflow-hidden select-none">
          
          {/* Schematic visual grids */}
          <div className="absolute inset-0 bg-[radial-gradient(#181b22_1px,transparent_1px)] [background-size:16px_16px] opacity-65 pointer-events-none" />
          
          {/* Interactive SVG Stage */}
          <div className="relative w-full h-full flex items-center justify-center min-h-[300px]">
            <svg 
              viewBox="0 0 800 450" 
              className="w-full h-auto text-zinc-800"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Landmass outlines - Dotted tactical aesthetic representation */}
              
              {/* Egypt Outline (Left Top) */}
              <path d="M 10 50 L 150 50 L 150 150 L 120 180 L 10 180 Z" fill="none" stroke="#1d232e" strokeWidth="1" strokeDasharray="4,4" />
              <text x="40" y="100" className="fill-zinc-700 font-mono text-[10px] tracking-widest uppercase">Egypt</text>

              {/* Red Sea Outline (Left stripe) */}
              <path d="M 150 150 Q 140 250 190 380 L 170 410 L 110 390 L 100 220 L 120 180 Z" fill="none" stroke="#132738" strokeWidth="1.5" />
              <text x="110" y="300" className="fill-blue-900/40 font-sans font-bold text-[14px] tracking-widest uppercase origin-center rotate-[70deg]">Red Sea</text>

              {/* Saudi Arabia Outline (Center) */}
              <path d="M 150 150 L 320 100 L 450 140 L 520 220 L 490 280 L 330 380 Q 230 380 190 380 Z" fill="none" stroke="#252d3a" strokeWidth="1" strokeDasharray="3,3" />
              <text x="270" y="270" className="fill-zinc-600 font-sans font-black text-[16px] tracking-widest uppercase">Saudi Arabia</text>

              {/* Gulf Outline (North-East) */}
              <path d="M 410 140 Q 480 110 540 180 L 550 190 L 490 230 Z" fill="none" stroke="#132738" strokeWidth="1.5" />
              <text x="460" y="130" className="fill-blue-900/30 font-sans font-bold text-[10px] tracking-widest uppercase">Arabian Gulf</text>

              {/* Iran Outline (North of Gulf) */}
              <path d="M 380 50 L 580 50 L 590 150 L 540 180 Q 480 110 410 140 Z" fill="none" stroke="#241e24" strokeWidth="1" strokeDasharray="4,4" />
              <text x="480" y="80" className="fill-zinc-700 font-mono text-[11px] tracking-widest uppercase">Iran</text>

              {/* Oman / Yemen Outline (South/East) */}
              <path d="M 190 380 Q 250 420 330 380 L 490 280 L 580 220 L 580 320 L 380 430 Z" fill="none" stroke="#22272e" strokeWidth="1" strokeDasharray="4,4" />
              <text x="270" y="410" className="fill-zinc-700 font-mono text-[9px] tracking-wider uppercase">Yemen</text>
              <text x="490" y="330" className="fill-zinc-700 font-mono text-[9px] tracking-wider uppercase">Oman</text>

              {/* PIPELINE LINES */}
              
              {/* 1. SAUDI EAST-WEST PIPELINE (Abqaiq to Yanbu) */}
              {isFeatureVisible('pipeline') && (
                <g 
                  onClick={() => setSelectedFeatureId('petroline')}
                  className="cursor-pointer group"
                >
                  {/* Pipeline glow trace */}
                  <line 
                    x1="410" y1="210" x2="140" y2="210" 
                    stroke="#10b981" 
                    strokeWidth={selectedFeatureId === 'petroline' ? "6" : "3"} 
                    strokeLinecap="round" 
                    opacity={selectedFeatureId === 'petroline' ? "0.35" : "0.15"} 
                    className="transition-all duration-300"
                  />
                  {/* Pipeline dynamic dash line */}
                  <line 
                    x1="410" y1="210" x2="140" y2="210" 
                    stroke="#059669" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    strokeDasharray="12, 6"
                    className="animate-[dash_25s_linear_infinite]"
                    style={{ strokeDashoffset: -100 }}
                  />
                  {/* Label tag */}
                  <rect x="220" y="185" width="110" height="15" rx="3" fill="#064e3b" stroke="#059669" strokeWidth="0.5" opacity="0.9" />
                  <text x="275" y="196" fill="#10b981" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    EAST-WEST PETROLINE
                  </text>
                </g>
              )}

              {/* 2. ADCOP HABSHAN-FUJAIRAH PIPELINE */}
              {isFeatureVisible('pipeline') && (
                <g 
                  onClick={() => setSelectedFeatureId('habshan')}
                  className="cursor-pointer group"
                >
                  <line 
                    x1="475" y1="240" x2="548" y2="225" 
                    stroke="#10b981" 
                    strokeWidth={selectedFeatureId === 'habshan' ? "5" : "2"} 
                    strokeLinecap="round" 
                    opacity={selectedFeatureId === 'habshan' ? "0.4" : "0.15"} 
                    className="transition-all duration-300"
                  />
                  <line 
                    x1="475" y1="240" x2="548" y2="225" 
                    stroke="#059669" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    strokeDasharray="8, 4"
                    className="animate-[dash_15s_linear_infinite]"
                  />
                </g>
              )}


              {/* MARITIME CHOKEPOINTS (GLOWS & HOTSPOTS) */}
              
              {/* Suez Canal */}
              {isFeatureVisible('chokepoint') && (
                <g 
                  onClick={() => setSelectedFeatureId('suez')}
                  className="cursor-pointer group"
                >
                  <circle 
                    cx="120" cy="115" 
                    r={selectedFeatureId === 'suez' ? "18" : "12"} 
                    fill="none" 
                    stroke="#d97706" 
                    strokeWidth="1.5" 
                    opacity="0.3" 
                    className="animate-pulse"
                  />
                  <circle cx="120" cy="115" r="5" fill="#f59e0b" />
                  <text x="120" y="100" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="extrabold" textAnchor="middle">
                    SUEZ CANAL
                  </text>
                </g>
              )}

              {/* Strait of Hormuz */}
              {isFeatureVisible('chokepoint') && (
                <g 
                  onClick={() => setSelectedFeatureId('hormuz')}
                  className="cursor-pointer group"
                >
                  {/* Outer active warning ring */}
                  <circle 
                    cx="542" cy="184" 
                    r={selectedFeatureId === 'hormuz' ? "24" : "16"} 
                    fill="none" 
                    stroke="#dc2626" 
                    strokeWidth="2" 
                    opacity="0.5" 
                    className="animate-ping"
                    style={{ animationDuration: '3s' }}
                  />
                  <circle cx="542" cy="184" r="7" fill="#ef4444" className="animate-pulse" />
                  
                  {/* Danger Blockade Icon Overlay inside SVG */}
                  <path d="M 537 179 L 547 189 M 547 179 L 537 189" stroke="#ffffff" strokeWidth="2" />
                  
                  <text x="590" y="178" fill="#ef4444" fontSize="8" fontFamily="monospace" fontWeight="extrabold" textAnchor="start">
                    ⚠️ HORMUZ (CLOSED)
                  </text>
                </g>
              )}

              {/* Bab al-Mandab */}
              {isFeatureVisible('chokepoint') && (
                <g 
                  onClick={() => setSelectedFeatureId('bab_mandab')}
                  className="cursor-pointer group"
                >
                  <circle 
                    cx="175" cy="390" 
                    r={selectedFeatureId === 'bab_mandab' ? "20" : "14"} 
                    fill="none" 
                    stroke="#ea580c" 
                    strokeWidth="2" 
                    opacity="0.4" 
                    className="animate-pulse"
                  />
                  <circle cx="175" cy="390" r="6" fill="#f97316" />
                  <text x="215" y="394" fill="#f97316" fontSize="8" fontFamily="monospace" fontWeight="extrabold" textAnchor="start">
                    ⚡ BAB AL-MANDAB
                  </text>
                </g>
              )}


              {/* KEY INFRASTRUCTURE HUBS */}
              
              {/* Abqaiq (East Hub) */}
              {isFeatureVisible('hub') && (
                <g 
                  onClick={() => setSelectedFeatureId('abqaiq')}
                  className="cursor-pointer group"
                >
                  <circle 
                    cx="410" cy="210" 
                    r={selectedFeatureId === 'abqaiq' ? "14" : "10"} 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="1.5" 
                    opacity="0.4" 
                  />
                  <circle cx="410" cy="210" r="5" fill="#10b981" />
                  <text x="410" y="228" fill="#10b981" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                    ABQAIQ HUB
                  </text>
                </g>
              )}

              {/* Yanbu Terminal (West Hub) */}
              {isFeatureVisible('hub') && (
                <g 
                  onClick={() => setSelectedFeatureId('yanbu')}
                  className="cursor-pointer group"
                >
                  <circle 
                    cx="140" cy="210" 
                    r={selectedFeatureId === 'yanbu' ? "14" : "10"} 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="1.5" 
                    opacity="0.4" 
                  />
                  <circle cx="140" cy="210" r="5" fill="#10b981" />
                  <text x="140" y="228" fill="#10b981" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                    YANBU PORT
                  </text>
                </g>
              )}

            </svg>
          </div>

          {/* Interactive hints */}
          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[8.5px] font-mono text-zinc-500 bg-zinc-950/90 px-2 py-1.5 border border-zinc-900 rounded select-none">
            <span className="flex items-center gap-1">
              <Activity size={10} className="text-emerald-500 animate-pulse" />
              <span>{isAr ? 'اضغط على الخطوط والمنافذ للمطالعة والتحليل التكتيكي' : 'Click nodes or pathways to decrypt geopolitical intel'}</span>
            </span>
            <span className="text-[7.5px] uppercase tracking-wider text-red-500/80 font-black">{isAr ? 'سرية // رصد حي' : 'SECRET // LIVE GEO FEED'}</span>
          </div>

        </div>

        {/* Tactical intelligence Readout Card (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between border border-zinc-800 bg-[#121418] p-4 md:p-5 rounded relative">
          
          <div className="space-y-4">
            
            {/* Header / Selected feature badge */}
            <div className="border-b border-zinc-800 pb-3 flex justify-between items-start gap-1.5">
              <div>
                <span className="text-[9px] font-mono font-black uppercase text-zinc-500 block mb-0.5">
                  {isAr ? 'العنصر المحدد ملاحياً:' : 'SELECTED STRATEGIC COMPONENT'}
                </span>
                <h4 className="text-sm md:text-base font-sans font-black text-white">
                  {isAr ? selectedFeature.nameAr : selectedFeature.nameEn}
                </h4>
              </div>
              <span className="text-[8px] font-mono px-1.5 py-0.5 bg-zinc-950 text-zinc-400 uppercase rounded border border-zinc-800 select-none">
                {selectedFeature.type}
              </span>
            </div>

            {/* Feature Telemetry */}
            <div className="space-y-3 font-sans">
              
              {/* Capacity or Scale Metrics */}
              {selectedFeature.capacityEn && (
                <div className="bg-zinc-950 p-2.5 rounded border border-zinc-850/50 flex items-center gap-2.5">
                  <Fuel size={14} className="text-emerald-400 shrink-0" />
                  <div className="text-xxs">
                    <span className="text-zinc-500 font-mono font-black block uppercase select-none">{isAr ? 'الطاقة الاستيعابية / التدفق:' : 'LOGISTICAL CAPACITY:'}</span>
                    <span className="text-emerald-400 font-bold">{isAr ? selectedFeature.capacityAr : selectedFeature.capacityEn}</span>
                  </div>
                </div>
              )}

              {/* Status Alert Banner */}
              <div className={`p-2.5 rounded border text-xxs font-mono flex items-center gap-2 ${selectedFeature.statusColor}`}>
                <Anchor size={13} className="shrink-0" />
                <div>
                  <span className="text-zinc-400 font-black block uppercase text-[8px] select-none">{isAr ? 'الحالة التشغيلية الميدانية:' : 'OPERATIONAL DEFENSE STATUS:'}</span>
                  <span className="font-extrabold">{isAr ? selectedFeature.statusAr : selectedFeature.statusEn}</span>
                </div>
              </div>

              {/* Risk metrics */}
              <div className="bg-zinc-950 p-2.5 rounded border border-zinc-850/50 text-xxs flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={14} className="text-zinc-400 shrink-0" />
                  <div>
                    <span className="text-zinc-500 font-mono font-black block uppercase select-none">{isAr ? 'مستوى التهديد العسكري:' : 'TACTICAL THREAT LEVEL:'}</span>
                    <span className={`font-extrabold ${selectedFeature.riskColor}`}>{isAr ? selectedFeature.riskLevelAr : selectedFeature.riskLevelEn}</span>
                  </div>
                </div>
              </div>

              {/* Intel narrative text */}
              <div className="space-y-1.5">
                <span className="text-zinc-500 font-mono font-black text-xxs block uppercase select-none">{isAr ? 'التقرير التحليلي ومكافحة المخاطر:' : 'TACTICAL INTELLIGENCE NARRATIVE:'}</span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {isAr ? selectedFeature.descAr : selectedFeature.descEn}
                </p>
              </div>

            </div>

          </div>

          {/* Bottom Alert / Strategic Note */}
          <div className="mt-5 pt-3 border-t border-zinc-850/60 flex items-start gap-2 text-xxs text-zinc-400 leading-relaxed">
            <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
            <p>
              {isAr 
                ? 'مقارنة تكتيكية: خط أنابيب بترولاين يمكنه تخفيف أثر إغلاق هرمز، لكن بقاء مضيق باب المندب كجبهة مشتعلة يهدد السفن المحملة من ينبع باتجاه أوروبا وآسيا.' 
                : 'Strategic Synthesis: The Petroline bypass reduces reliance on Hormuz, but Bab al-Mandab proxy warfare threats continue to bottle up Red Sea shipping loops.'}
            </p>
          </div>

        </div>

      </div>

      {/* Embedded CSS for SVG path dashed line animation */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 1000;
          }
        }
      `}</style>

    </div>
  );
};
