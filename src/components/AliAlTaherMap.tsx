import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Map as MapIcon, 
  Eye, 
  ShieldAlert, 
  HelpCircle, 
  Navigation, 
  Maximize2, 
  Target, 
  Info, 
  Layers, 
  Activity, 
  TrendingUp, 
  MapPin, 
  Radio, 
  BookOpen
} from 'lucide-react';

interface MapNode {
  id: string;
  nameAr: string;
  nameEn: string;
  coordX: number; // SVG X coordinate (0-800)
  coordY: number; // SVG Y coordinate (0-500)
  elevation: string;
  coordinates: string;
  roleAr: string;
  roleEn: string;
  tacticalAr: string;
  tacticalEn: string;
  threatLevel: 'HIGH' | 'CRITICAL' | 'STRATEGIC' | 'STABLE';
  threatLevelAr: string;
  tacticalCategory: 'ridge' | 'fortress' | 'city' | 'hydrological' | 'ambush';
}

const MAP_NODES: MapNode[] = [
  {
    id: 'ali-al-taher',
    nameAr: 'تلة علي الطاهر / مرتفعات الاستهداف',
    nameEn: 'Ali Al-Taher Ridge / Artillery Overlook',
    coordX: 380,
    coordY: 220,
    elevation: '750m',
    coordinates: '33°20\'32"N, 35°30\'41"E',
    roleEn: 'High commanding ridge. Exercises unhindered sight over Nabatiyeh, Litani river basins, and eastern valley passes.',
    roleAr: 'قمة جبلية شاهقة حاكمة. تمنح إشرافاً بصرياً ونارياً مباشراً على النبطية، حوض نهر الليطاني، وممرات عبور البقاع.',
    tacticalEn: 'Natural rock ledge fortifications. High-ground advantage provides total mastery for Anti-Tank Guided Missile (ATGM) crews targeting armored advancing columns.',
    tacticalAr: 'تحصينات صخرية طبيعية تحت الأرض. تعزز الصواريخ الموجهة المضادة للدروع والمربوطة بشبكة حفر مخفية تصعب تصفيتها من الجو.',
    threatLevel: 'CRITICAL',
    threatLevelAr: 'حرج للغاية (مفصلي)',
    tacticalCategory: 'ridge'
  },
  {
    id: 'beaufort-castle',
    nameAr: 'قلعة الشقيف التاريخية',
    nameEn: 'Historic Beaufort Castle Overlook',
    coordX: 250,
    coordY: 340,
    elevation: '710m',
    coordinates: '33°19\'29"N, 35°31\'55"E',
    roleEn: 'Crusader-era clifftop stronghold overlooking the deep Litani Gorge.',
    roleAr: 'معقل تاريخي بارز جاثم فوق منحدر صخري عملاق يشرف على خانقات وادي نهر الليطاني السحيقة.',
    tacticalEn: 'Serves as visual coordination radar watchtower. Features electro-optical targeting networks mapping troop routes.',
    tacticalAr: 'محطة رصد بالتنسيق الكهروبصري البصري والمسيرات الموجهة لرصد عمق الثغرات والسهول المفتوحة.',
    threatLevel: 'STRATEGIC',
    threatLevelAr: 'استراتيجي هام',
    tacticalCategory: 'fortress'
  },
  {
    id: 'nabatiyeh-city',
    nameAr: 'مدينة النبطية (حاضرة القطاع الجنوبي)',
    nameEn: 'Nabatiyeh City Urban Hub',
    coordX: 520,
    coordY: 150,
    elevation: '410m',
    coordinates: '33°22\'43"N, 35°29\'01"E',
    roleEn: 'Logistical nerve center and major demographic weight of Central South Lebanon.',
    roleAr: 'العصب اللوجستي والحاضرة السكانية الأكبر في عمق وسط وجنوب قطاع الليطاني.',
    tacticalEn: 'Squeezed between surrounding ridges. Sufferers heavy fire vulnerability from Ali Al-Taher overlooking slopes.',
    tacticalAr: 'خاصرة طبوغرافية مكشوفة لوقوعها الكامل تحت السيطرة السهمية والشاملة لراصدي مرتفعات علي الطاهر.',
    threatLevel: 'HIGH',
    threatLevelAr: 'عرضة للاستهداف العالي',
    tacticalCategory: 'city'
  },
  {
    id: 'litani-river',
    nameAr: 'حوض ومجرى نهر الليطاني',
    nameEn: 'Litani River Winding Gorge',
    coordX: 180,
    coordY: 420,
    elevation: '180m',
    coordinates: '33°20\'10"N, 35°32\'15"E',
    roleEn: 'Major natural physical barrier forming deep, steep and rugged mountain ravines.',
    roleAr: 'الشريان المائي الطبيعي والخنادق الطبوغرافية الوعرة التي تمثل خطاً دفاعياً طبيعياً للعبور.',
    tacticalEn: 'Channels armor columns toward highly monitored, predictable crossings and bridges.',
    tacticalAr: 'يجبر الحركة الهجومية والمدرعات الثقيلة على التجمع عند معابر وجسور محددة تقع بمجال الدفاع المدفعي.',
    threatLevel: 'HIGH',
    threatLevelAr: 'عقدة عبور مرتفعة الخطأ',
    tacticalCategory: 'hydrological'
  },
  {
    id: 'kill-zone',
    nameAr: 'منطقة كفرتبنيت والتقتيل الشمالية (٢٠٢٦)',
    nameEn: 'Kfar Tibnit Northern Kill Zone (2026)',
    coordX: 430,
    coordY: 280,
    elevation: '510m',
    coordinates: '33°21\'05"N, 35°30\'55"E',
    roleEn: 'Narrow choke passage on the plain corridor below Ali Al-Taher\'s northern slopes.',
    roleAr: 'ممر بري ضيق يقع أسفل سفح المرتفعات الشمالي ويتوسط محور كفرتبنيت - أرنون.',
    tacticalEn: 'The core bottleneck of mid-2026 armor actions. Heavy ATGM crossfire from Ali Al-Taher heights compromised armored divisions here.',
    tacticalAr: 'مركز الكمائن الجبلية ومصيدة المدرعات الكبرى في عمليات منتصف عام 2026، حيث أمطرت الدروع بالقذائف الجانبية المباشرة.',
    threatLevel: 'CRITICAL',
    threatLevelAr: 'منطقة قتال حامية الوطيس',
    tacticalCategory: 'ambush'
  }
];

interface AliAlTaherMapProps {
  language: 'ar' | 'en';
}

export default function AliAlTaherMap({ language }: AliAlTaherMapProps) {
  const isAr = language === 'ar';
  
  // Tactical view layer controls
  const [activeLayer, setActiveLayer] = useState<'contour' | 'sight' | 'engagement'>('contour');
  const [selectedNode, setSelectedNode] = useState<MapNode>(MAP_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<MapNode | null>(null);

  // Compass rotation based on cursor inside map box
  const [compassAngle, setCompassAngle] = useState(45);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    setCompassAngle(Math.round(angle));
  };

  return (
    <div id="ali-al-taher-map-section" className="border-4 border-black bg-amber-50/15 p-4 md:p-6 space-y-6 select-none my-8">
      <style dangerouslySetInnerHTML={{ __html: `
        #ali-al-taher-map-section, 
        #ali-al-taher-map-section * {
          font-family: 'Cairo', 'Inter', system-ui, -apple-system, sans-serif !important;
        }
        #ali-al-taher-map-section text {
          font-family: 'Cairo', 'Inter', system-ui, -apple-system, sans-serif !important;
        }
        #ali-al-taher-map-section .text-[8px] {
          font-size: 11px !important;
        }
        #ali-al-taher-map-section .text-[9px] {
          font-size: 11.5px !important;
        }
        #ali-al-taher-map-section .text-[10px] {
          font-size: 12.5px !important;
        }
        #ali-al-taher-map-section .text-[11px] {
          font-size: 13.5px !important;
        }
        #ali-al-taher-map-section .text-xxs {
          font-size: 12.5px !important;
        }
        #ali-al-taher-map-section .text-xs {
          font-size: 14.5px !important;
        }
        #ali-al-taher-map-section .text-sm {
          font-size: 16px !important;
        }
        #ali-al-taher-map-section .text-base {
          font-size: 18px !important;
        }
      `}} />
      
      {/* Title & Metadata row */}
      <div className="border-b-2 border-black pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-[#b91c1c] text-white font-mono text-[9px] font-black px-2 py-0.5 tracking-wider uppercase">
            <Radio className="animate-pulse" size={11} />
            {isAr ? "نظام الخرائط الطبوغرافية التفاعلية" : "Interactive Topography Intelligence Engine"}
          </div>
          <h3 className="font-sans font-black text-xl md:text-2xl text-black">
            {isAr ? "الرصد الكهروبصري والطبغرافي: سلسلة تلال علي الطاهر" : "Tactical Topographical Map: Ali Al-Taher Heights"}
          </h3>
          <p className="font-sans text-zinc-650 text-xs font-semibold leading-relaxed max-w-2xl">
            {isAr 
              ? "تفحص تفاصيل السيطرة النارية وخطوط الرؤية ومصائد الطيران الجغرافي. انقر على الإحداثيات والنقاط الحيوية لمراجعة تقييم الموقف التكتيكي."
              : "Examine the direct line of sight, logistical choke points, and armored channelling corridors. Highlight nodes on map to inspect tactical descriptions."
            }
          </p>
        </div>

        {/* Technical Stats corner */}
        <div className="border border-black p-2 font-mono text-[10px] bg-white flex flex-row md:flex-col gap-x-4 gap-y-1 w-full md:w-auto leading-tight shadow-custom justify-between">
          <div>LAT: 33°20'32" N</div>
          <div>LON: 35°30'41" E</div>
          <div className="text-zinc-450 font-bold">ALTITUDE: 750M ASL</div>
          <div className="text-[#b91c1c] font-black uppercase">GRID REFERENCE: AL-T01</div>
        </div>
      </div>

      {/* Grid: SVG Map Area (Left) & Control Briefing Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* SVG Interactive Map (8cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* Layer Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-2 border-black bg-white p-2.5 rounded-sm">
            <div className="flex items-center gap-2">
              <Layers size={15} className="text-[#b91c1c]" />
              <span className="font-mono text-xxs font-black uppercase text-zinc-600">
                {isAr ? "فلتر الطبقات التكتيكية:" : "Tactical Layers Toggles:"}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveLayer('contour')}
                className={`px-3 py-1 text-xxs font-mono font-black border uppercase transition-all cursor-pointer ${
                  activeLayer === 'contour' 
                    ? 'bg-black text-white border-black' 
                    : 'bg-zinc-50 hover:bg-zinc-150 text-zinc-750 border-zinc-300'
                }`}
              >
                {isAr ? "الكنتور والارتفاع" : "Contours & Terrain"}
              </button>

              <button
                onClick={() => setActiveLayer('sight')}
                className={`px-3 py-1 text-xxs font-mono font-black border uppercase transition-all cursor-pointer ${
                  activeLayer === 'sight' 
                    ? 'bg-black text-white border-black' 
                    : 'bg-zinc-50 hover:bg-zinc-150 text-zinc-750 border-zinc-300'
                }`}
              >
                {isAr ? "خطوط الرؤية (LOS)" : "Line of Sight"}
              </button>

              <button
                onClick={() => setActiveLayer('engagement')}
                className={`px-3 py-1 text-xxs font-mono font-black border uppercase transition-all cursor-pointer ${
                  activeLayer === 'engagement' 
                    ? 'bg-black text-white border-black' 
                    : 'bg-zinc-50 hover:bg-zinc-150 text-zinc-750 border-zinc-300'
                }`}
              >
                {isAr ? "نواقل الاشتباك ٢٠٢٦" : "Combat Vectors 2026"}
              </button>
            </div>
          </div>

          {/* Map Vector Stage */}
          <div 
            className="border-4 border-black bg-slate-900 aspect-[800/500] relative overflow-hidden select-none cursor-default shadow-custom"
            onMouseMove={handleMouseMove}
          >
            {/* Tech Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            
            {/* Target Radar Sweep Animation */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_380px_220px,rgba(185,28,28,0.05)_0%,transparent_70%)] pointer-events-none" />

            {/* Simulated Live CRT Scanline Screen effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_55%,rgba(0,0,0,0.45))] pointer-events-none" />

            {/* Actual Interactive SVG */}
            <svg 
              className="w-full h-full text-zinc-400 select-none"
              viewBox="0 0 800 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glow filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                {/* Arrow Marker */}
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#b91c1c" />
                </marker>
                <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
              </defs>

              {/* ------------------- BACKGROUND CONTUOR LINES (ELEVATIONS) ------------------- */}
              {activeLayer === 'contour' && (
                <g className="opacity-45 transition-opacity duration-300" stroke="#4b5563" strokeWidth="1" fill="none" strokeDasharray="2,2">
                  {/* Litani ravine bottom contour lines */}
                  <path d="M -50,450 Q 150,430 200,410 T 350,470 T 550,480" />
                  <path d="M -50,460 Q 150,442 201,422 T 350,482 T 550,490" />
                  
                  {/* Ali Al-Taher Peak Elevation Contours (centered around 380, 220) */}
                  <ellipse cx="380" cy="220" rx="280" ry="170" stroke="#374151" strokeWidth="0.75" />
                  <ellipse cx="380" cy="220" rx="220" ry="130" stroke="#4b5563" strokeWidth="1" />
                  <ellipse cx="380" cy="220" rx="160" ry="90" />
                  <ellipse cx="380" cy="220" rx="100" ry="55" stroke="#9ca3af" />
                  <ellipse cx="380" cy="220" rx="50" ry="28" stroke="#fbbf24" strokeWidth="1.5" />
                  <ellipse cx="380" cy="220" rx="15" ry="8" stroke="#ef4444" strokeWidth="2" />

                  {/* Beaufort Castle Peak Elevation Contours (centered card around 250, 340) */}
                  <ellipse cx="250" cy="340" rx="120" ry="80" />
                  <ellipse cx="250" cy="340" rx="80" ry="50" stroke="#9ca3af" />
                  <ellipse cx="250" cy="340" rx="40" ry="25" stroke="#fbbf24" strokeWidth="1.5" />

                  {/* Nabatiyeh (Lower bowl area) */}
                  <ellipse cx="520" cy="150" rx="150" ry="90" />
                  <ellipse cx="520" cy="150" rx="100" ry="60" stroke="#374151" />
                </g>
              )}

              {/* ------------------- HYDROLOGICAL ELEMENT: LITANI RIVER ------------------- */}
              <g id="litani-river-graphics">
                {/* River Flow backing track path */}
                <path 
                  d="M -20,440 Q 140,410 180,420 T 320,460 T 500,430 T 680,480 T 820,470" 
                  stroke="#1d4ed8" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeLinecap="round"
                  className="opacity-20"
                />
                {/* Core winding blue stream */}
                <path 
                  d="M -20,440 Q 140,410 180,420 T 320,460 T 500,430 T 680,480 T 820,470" 
                  stroke="#3b82f6" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="round"
                  strokeDasharray="1000"
                  strokeDashoffset="0"
                />
                {/* Water name text tag */}
                <text x="140" y="405" fill="#60a5fa" fontSize="9" fontFamily="monospace" fontWeight="bold" transform="rotate(-5, 140, 405)" className="tracking-widest">
                  {isAr ? "نهر الليطاني / LITANI GORGE" : "LITANI RIVER GORGE"}
                </text>
              </g>

              {/* ------------------- MILITARY ENGAGEMENT LAYER 2026 ------------------- */}
              {activeLayer === 'engagement' && (
                <g className="transition-all duration-300">
                  {/* Ambushes area indicators */}
                  <circle cx="430" cy="280" r="35" fill="url(#killzoneGrad)" className="opacity-40" />
                  <defs>
                    <radialGradient id="killzoneGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* ATGM Missile Fire lines from Ali Al-Taher peak into the northern kill zone */}
                  <line 
                    x1="380" y1="220" x2="430" y2="280" 
                    stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" 
                    markerEnd="url(#arrow)" 
                  />
                  
                  {/* Direct defense target lines flashing across Nabatiyeh accesses */}
                  <line 
                    x1="380" y1="220" x2="520" y2="150" 
                    stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" 
                    className="animate-pulse"
                  />

                  {/* Simulated Armored Advance Vector (green arrows representing IDF pushing from southern borders near Beaufort Castle heading north-east) */}
                  <path 
                    d="M 230,470 L 250,380 L 320,330" 
                    fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="8,4"
                    markerEnd="url(#arrow-green)"
                  />
                  <path 
                    d="M 320,330 L 415,290" 
                    fill="none" stroke="#b91c1c" strokeWidth="3" strokeDasharray="5,3"
                    markerEnd="url(#arrow)"
                    className="opacity-90"
                  />
                  
                  {/* Red crossout markers representing neutralized armor in the Kfar Tibnit corridor */}
                  <g stroke="#ef4444" strokeWidth="2" opacity="0.85">
                    <line x1="425" y1="275" x2="435" y2="285" />
                    <line x1="435" y1="275" x2="425" y2="285" />
                    
                    <line x1="445" y1="285" x2="455" y2="295" />
                    <line x1="455" y1="285" x2="445" y2="295" />
                  </g>

                  <text x="450" y="315" fill="#ef4444" fontSize="8" fontFamily="monospace" fontWeight="heavy" className="uppercase">
                    {isAr ? "كمائن الدروع ٢٠٢٦" : "ATGM AMBUSH GRID"}
                  </text>
                </g>
              )}

              {/* ------------------- VISUAL LINES OF SIGHT (LOS) LAYER ------------------- */}
              {activeLayer === 'sight' && (
                <g className="transition-all duration-300">
                  {/* Visual sweeps from Ali Al-Taher peak */}
                  {/* Over to Nabatiyeh */}
                  <line x1="380" y1="220" x2="520" y2="150" stroke="#f59e0b" strokeWidth="2.5" opacity="0.4" />
                  <ellipse cx="520" cy="150" rx="30" ry="15" stroke="#f59e0b" strokeWidth="1" fill="none" strokeDasharray="4,4" />
                  
                  {/* Over to Beaufort Castle */}
                  <line x1="380" y1="220" x2="250" y2="340" stroke="#f59e0b" strokeWidth="2.5" opacity="0.4" strokeDasharray="4,2" />
                  
                  {/* Over to the critical valley passes (Eastern Litani crossings) */}
                  <line x1="380" y1="220" x2="680" y2="450" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4" />
                  <circle cx="680" cy="450" r="10" stroke="#f59e0b" strokeWidth="1" fill="none" />

                  {/* Over to Litani river boundary directly south */}
                  <line x1="380" y1="220" x2="380" y2="440" stroke="#f59e0b" strokeWidth="1.5" opacity="0.3" />

                  <text x="390" y="195" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    {isAr ? "مدى السيطرة البصرية الحاكمة" : "OMNIDIRECTIONAL LINE OF SIGHT"}
                  </text>
                </g>
              )}

              {/* ------------------- STRATEGIC HIGHWAYS / SUPPLY ROUTES ------------------- */}
              <g id="local-inland-routes" className="opacity-30">
                {/* South-North Supply route connecting Litani crossing to Nabatiyeh */}
                <path 
                  d="M 280,490 L 250,340 Q 300,280 430,280 T 520,150 T 600,10" 
                  fill="none" 
                  stroke="#fbbf24" 
                  strokeWidth="2.5" 
                />
                
                {/* Trans-valley corridor heading East to the Bekaa depth */}
                <path 
                  d="M 430,280 Q 560,300 700,320 T 820,380" 
                  fill="none" 
                  stroke="#fbbf24" 
                  strokeWidth="2" 
                  strokeDasharray="4,4" 
                />

                <text x="610" y="295" fill="#f59e00" fontSize="8" fontFamily="monospace">
                  {isAr ? "طريق الإمداد الشرقي" : "EASTERN CORRIDOR"}
                </text>
              </g>

              {/* ------------------- INTERACTIVE HITPOINTS (NODES) ------------------- */}
              {MAP_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const isHovered = hoveredNode?.id === node.id;
                
                // Color mapping by threat categories
                const themeColor = node.threatLevel === 'CRITICAL' ? '#ef4444' : node.threatLevel === 'STRATEGIC' ? '#fbbf24' : '#60a5fa';

                return (
                  <g 
                    key={node.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Ring Pulse for Selected node */}
                    {(isSelected || isHovered) && (
                      <motion.circle 
                        cx={node.coordX} 
                        cy={node.coordY} 
                        r={22} 
                        fill="none" 
                        stroke={themeColor} 
                        strokeWidth={1.5}
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 2.2 }}
                      />
                    )}

                    {/* Outer core circle indicator */}
                    <circle 
                      cx={node.coordX} 
                      cy={node.coordY} 
                      r={isSelected ? 10 : 7} 
                      fill={isSelected ? '#0f172a' : 'transparent'} 
                      stroke={themeColor} 
                      strokeWidth={isSelected ? 3.5 : 2} 
                      className="transition-all duration-250 ease-out"
                    />

                    {/* Glowing internal point */}
                    <circle 
                      cx={node.coordX} 
                      cy={node.coordY} 
                      r={isSelected ? 4 : 3} 
                      fill={themeColor} 
                    />

                    {/* Node Tag Text Label with contrasting opaque dark backgrounds */}
                    <g transform={`translate(${node.coordX + 12}, ${node.coordY - 12})`}>
                      {/* Opaque tag backdrop backing */}
                      <rect 
                        x="-4" 
                        y="-10" 
                        width={(isAr ? node.nameAr.length : node.nameEn.length) * 5.6 + 12} 
                        height="16" 
                        fill="#0b1329" 
                        rx="2"
                        className="opacity-90 stroke-zinc-700 stroke-1"
                      />
                      {/* Title text */}
                      <text 
                        x="2" 
                        y="2" 
                        fill={isSelected ? '#f8fafc' : '#94a3b8'} 
                        fontSize="9" 
                        fontFamily="sans-serif" 
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {isAr ? node.nameAr.split(" / ")[0] : node.nameEn.split(" / ")[0]}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Compass Indicator Vector in Map Canvas */}
              <g transform="translate(68, 68)" className="opacity-75">
                <circle cx="0" cy="0" r="28" fill="#0f172a" stroke="#4b5563" strokeWidth="1.5" />
                <line x1="-28" y1="0" x2="28" y2="0" stroke="#374151" strokeWidth="1" />
                <line x1="0" y1="-28" x2="0" y2="28" stroke="#374151" strokeWidth="1" />
                
                {/* Needle */}
                <polygon 
                  points="0,-22 5,0 0,6" 
                  fill="#ef4444" 
                  transform={`rotate(${compassAngle})`}
                  className="transition-transform duration-100 ease-out"
                />
                <polygon 
                  points="0,22 5,0 0,-6" 
                  fill="#9ca3af" 
                  transform={`rotate(${compassAngle})`}
                  className="transition-transform duration-100 ease-out" 
                />

                <circle cx="0" cy="0" r="3" fill="#ffffff" />
                <text x="-4" y="-32" fill="#ef4444" fontSize="9" fontFamily="monospace" fontWeight="black">N</text>
              </g>

              {/* Scale Indicator */}
              <g transform="translate(710, 470)" className="opacity-80">
                <line x1="0" y1="0" x2="60" y2="0" stroke="#ffffff" strokeWidth="2" />
                <line x1="0" y1="-4" x2="0" y2="4" stroke="#ffffff" strokeWidth="2" />
                <line x1="30" y1="-2" x2="30" y2="2" stroke="#ffffff" strokeWidth="1" />
                <line x1="60" y1="-4" x2="60" y2="4" stroke="#ffffff" strokeWidth="2" />
                <text x="30" y="-10" fill="#9ca3af" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">2 KM (1.2 MI)</text>
              </g>
            </svg>
          </div>

        </div>

        {/* Dashboard Readout Briefing Panel (4cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active selection info dossier card */}
          <div className="border-4 border-black bg-white p-5 space-y-4 shadow-custom relative">
            <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-black text-white font-mono text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">
              {isAr ? "دواوين المخابرات الحربية" : "Operational Dossier"}
            </div>

            <div className="flex items-center gap-2 border-b-2 border-black pb-3">
              <Target className="text-[#b91c1c] animate-pulse" size={18} />
              <div className="leading-tight">
                <span className="font-mono text-[9px] font-extrabold text-zinc-400 block uppercase">
                  {isAr ? "المركب الطبوغرافي المعني" : "Selected Tactical Node"}
                </span>
                <h4 className="font-sans font-black text-sm text-[#b91c1c] uppercase">
                  {isAr ? selectedNode.nameAr : selectedNode.nameEn}
                </h4>
              </div>
            </div>

            {/* Micro details grid */}
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-zinc-200">
              <div className="bg-zinc-50 p-2 border border-zinc-350">
                <span className="font-mono text-[9px] text-zinc-400 font-bold block uppercase">{isAr ? "الارتفاع التام:" : "Elevation (ASL):"}</span>
                <span className="font-mono text-xs font-black text-black">{selectedNode.elevation}</span>
              </div>
              <div className="bg-zinc-50 p-2 border border-zinc-350">
                <span className="font-mono text-[9px] text-zinc-400 font-bold block uppercase">{isAr ? "مستوى الخطورة:" : "Security/Threat:"}</span>
                <span className="font-mono text-[10px] font-black text-red-600 block">
                  {isAr ? selectedNode.threatLevelAr : selectedNode.threatLevel}
                </span>
              </div>
              <div className="col-span-2 bg-zinc-50 p-2 border border-zinc-350">
                <span className="font-mono text-[9px] text-zinc-400 font-bold block uppercase">{isAr ? "الإحداثيات المدققة:" : "Geodetic Coordinates:"}</span>
                <span className="font-mono text-[10px] font-bold text-zinc-700">{selectedNode.coordinates}</span>
              </div>
            </div>

            {/* Analysis Text Sections */}
            <div className="space-y-3.5">
              <div className="space-y-1">
                <span className="font-mono text-[9px] font-black text-zinc-400 block uppercase tracking-wider">
                  {isAr ? "الدور الإستراتيجي واللوجستي:" : "Strategic/Logistic Dominance:"}
                </span>
                <p className="font-sans font-semibold text-xs text-zinc-800 leading-relaxed">
                  {isAr ? selectedNode.roleAr : selectedNode.roleEn}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[9px] font-black text-amber-600 block uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert size={12} />
                  {isAr ? "تقييم العقد العملياتي والمخاوف التكتيكية:" : "Defense Infrastructure & Assessment:"}
                </span>
                <p className="font-sans font-semibold text-xs text-zinc-700 leading-relaxed bg-amber-50/40 p-2.5 border-l-2 border-amber-500 rounded-r-xs">
                  {isAr ? selectedNode.tacticalAr : selectedNode.tacticalEn}
                </p>
              </div>
            </div>

            {/* Action Helper suggestion block based on node category */}
            <div className="bg-zinc-50 p-3.5 border border-zinc-300 font-mono text-[10px] text-zinc-450 leading-relaxed rounded-xs">
              <span className="font-black text-zinc-650 block uppercase mb-1 flex items-center gap-1">
                <Info size={11} className="text-[#b91c1c]" />
                {isAr ? "توجيهات القراءة والوعي الجغرافي:" : "Intelligencer Briefing Tip:"}
              </span>
              {selectedNode.id === 'ali-al-taher' ? (
                isAr 
                  ? "تتمم قراءة هذا التقرير بربط موقع علي الطاهر بقرية كفرتبنيت الواقعة جنوب نفق السيطرة الجبلية لتفسير التفاف الجيش المهاجم."
                  : "Correlate Ali Al-Taher's command height directly with Kfar Tibnit tunnels and Beaufort optics stations to understand the flank maneuvers."
              ) : selectedNode.id === 'kill-zone' ? (
                isAr 
                  ? "كانت هذه المنطقة محور تصدي استراتيجي في حرب ٢٠٢٦، حيث عجزت فيالق المدرعات الثقيلة من بسط الهيمنة لتعرضها لنيران من جانبي التلة."
                  : "The restricted flat approaches here made armored advance lanes predictable kill channels for defenders leveraging heights."
              ) : (
                isAr 
                  ? "تكامل حركة الدفاع الإقليمية يعتمد بصورة كلية على الحلف الدفاعي بين كتل المرتفعات وشبكات الرصد بالقلعة التاريخية."
                  : "Operational cohesion relies heavily on synchronized watch schedules between the heights and the ancient high-cliff optical stations."
              )}
            </div>

          </div>

          {/* Quick reference block */}
          <div className="border border-black bg-[#b91c1c]/5 p-4 rounded-xs font-sans text-xs">
            <span className="font-black uppercase text-[#b91c1c] block mb-1">
              📝 {isAr ? "ملخص معضلة حرب ٢٠٢٦ الجغرافية" : "2026 High Ground Battle Summary"}
            </span>
            <p className="text-zinc-700 leading-relaxed font-medium">
              {isAr 
                ? "انتهت المعارك بإثبات نظرية تفوق الجغرافيا الصارمة على تقدم العتاد والمدرعات الحديثة. حيث أصبحت تلة علي الطاهر المعلم والنموذج الكلاسيكي للمهتمين بالعلوم الاستراتيجية العسكرية في المشرق العربي."
                : "The engagements ended proving the historic military axiom that raw tactical elevation and rocky verticality compromise modern mechanical advantage when managed with coordinated local layouts."
              }
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
