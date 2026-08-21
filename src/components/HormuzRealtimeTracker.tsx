import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as d3 from 'd3';
import {
  Navigation,
  ShieldAlert,
  Radio,
  Eye,
  EyeOff,
  Ship,
  TrendingDown,
  Anchor,
  Compass,
  Zap,
  Layers,
  ArrowRight,
  RefreshCw,
  Share2,
  Download,
  Check,
  AlertTriangle,
  FileText,
  Activity,
  Globe,
  Sliders,
  Maximize2
} from 'lucide-react';

interface Props {
  language?: 'ar' | 'en';
  compact?: boolean;
}

export interface VesselTelemetry {
  id: string;
  name: string;
  type: 'VLCC' | 'LNG' | 'VLGC' | 'Suezmax' | 'Aframax' | 'MR Product' | 'Panamax Bulk' | 'Container';
  flag: string;
  cargo: string;
  cargoAr: string;
  corridor: 'Hormuz-Iranian-Lane' | 'Hormuz-Dark' | 'Bab-el-Mandeb' | 'Cape-Reroute' | 'Fujairah-Anchorage';
  corridorAr: string;
  aisStatus: 'ON' | 'OFF (Dark Fleet)' | 'SPOOFED / UNILATERAL';
  aisStatusAr: string;
  speedKnots: number;
  coordinates: { x: number; y: number; lat: number; lng: number };
  riskTier: 'Tier 1 (High Risk / Avoid)' | 'Tier 2 (Risk Tolerant / Shadow)' | 'Exempt / Diverted';
  riskTierAr: string;
  insurancePremium: string;
  notesAr: string;
  notesEn: string;
}

const VESSELS_DATA: VesselTelemetry[] = [
  {
    id: 'vsl-xavia-vlgc',
    name: 'Xavia (VLGC)',
    type: 'VLGC',
    flag: 'Panama 🇵🇦',
    cargo: 'LPG (Ballast / Empty Return)',
    cargoAr: 'غاز نفطي مسال (إبحار بفارغ الوزن)',
    corridor: 'Hormuz-Iranian-Lane',
    corridorAr: 'المسار الإيراني الأحادي في هرمز',
    aisStatus: 'SPOOFED / UNILATERAL',
    aisStatusAr: 'مسار أحادي / إشراف إيراني',
    speedKnots: 14.2,
    coordinates: { x: 380, y: 155, lat: 26.58, lng: 56.45 },
    riskTier: 'Tier 2 (Risk Tolerant / Shadow)',
    riskTierAr: 'المستوى الثاني (تحمل عالي للمخاطر / أسطول الظل)',
    insurancePremium: '1.2% (War Risk Override)',
    notesAr: 'تعبر بفارغ الوزن عبر الممر الشمالي الإيراني المخصص للغاز المسال الخفيف.',
    notesEn: 'Ballast VLGC transit via northern Iranian unilateral corridor under special clearance.'
  },
  {
    id: 'vsl-norns-vlcc',
    name: 'Norns (VLCC Supertanker)',
    type: 'VLCC',
    flag: 'Liberia 🇱🇷',
    cargo: 'Crude Oil (1,980,000 Barrels)',
    cargoAr: 'نفط خام (١,٩٨٠,٠٠٠ برميل)',
    corridor: 'Bab-el-Mandeb',
    corridorAr: 'مضيق باب المندب (البحر الأحمر)',
    aisStatus: 'ON',
    aisStatusAr: 'مفعل (AIS نشط)',
    speedKnots: 11.8,
    coordinates: { x: 120, y: 310, lat: 12.58, lng: 43.32 },
    riskTier: 'Tier 2 (Risk Tolerant / Shadow)',
    riskTierAr: 'المستوى الثاني (تحمل عالي للمخاطر)',
    insurancePremium: '0.85% (Red Sea War Surcharge)',
    notesAr: 'شحنة خام ضخمة مبحرة جنوباً نحو خليج عدن بموجب إشعار ملاحي تفاوضي.',
    notesEn: '2M bbl supertanker southward transit through Bab el-Mandeb in two-track equilibrium.'
  },
  {
    id: 'vsl-ghost-suezmax',
    name: 'Suezmax Phantom VII',
    type: 'Suezmax',
    flag: 'Cook Islands 🇨🇰',
    cargo: 'Heavy Basrah Medium (1,000,000 bbl)',
    cargoAr: 'خام البصرة الثقيل (مليون برميل)',
    corridor: 'Hormuz-Dark',
    corridorAr: 'ملاحة مظلمة في مضيق هرمز',
    aisStatus: 'OFF (Dark Fleet)',
    aisStatusAr: 'مطفأ (ملاحة مظلمة - أسطول الظل)',
    speedKnots: 10.4,
    coordinates: { x: 340, y: 170, lat: 26.35, lng: 56.15 },
    riskTier: 'Tier 2 (Risk Tolerant / Shadow)',
    riskTierAr: 'المستوى الثاني (أسطول الظل)',
    insurancePremium: 'Non-P&I (Sovereign Underwriting)',
    notesAr: 'ملاحة مظلمة بالكامل مع إطفاء أجهزة التتبع لتفادي الرصد والحصار المفروض.',
    notesEn: 'Full dark-navigation profile with transponder off near Larak Island anchorage.'
  },
  {
    id: 'vsl-ocean-panamax',
    name: 'Ocean Pioneer IV',
    type: 'Panamax Bulk',
    flag: 'Marshall Islands 🇲🇭',
    cargo: 'Dry Bulk Agricultural Grain (75,000 DWT)',
    cargoAr: 'حبوب زراعية وبضائع صب (٧٥,٠٠٠ طن)',
    corridor: 'Hormuz-Iranian-Lane',
    corridorAr: 'خروج متقطع من الخليج',
    aisStatus: 'ON',
    aisStatusAr: 'مفعل (AIS نشط)',
    speedKnots: 12.1,
    coordinates: { x: 420, y: 190, lat: 25.95, lng: 56.85 },
    riskTier: 'Tier 1 (High Risk / Avoid)',
    riskTierAr: 'المستوى الأول (بضائع منخفضة التحمل)',
    insurancePremium: '0.65% (Commercial Bulk)',
    notesAr: 'خروج تدريجي من مياه الخليج باتجاه بحر عمان مع الالتزام بالبث المفتوح.',
    notesEn: 'Outbound dry-bulk transit with active AIS transponder heading towards Gulf of Oman.'
  },
  {
    id: 'vsl-al-dafna-lng',
    name: 'Al-Dafna Q-Max LNG',
    type: 'LNG',
    flag: 'Qatar 🇶🇦',
    cargo: 'Liquefied Natural Gas (266,000 m³)',
    cargoAr: 'غاز طبيعي مسال (٢٦٦,٠٠٠ متر مكعب)',
    corridor: 'Cape-Reroute',
    corridorAr: 'إعادة توجيه عبر رأس الرجاء الصالح',
    aisStatus: 'ON',
    aisStatusAr: 'مفعل (توجيه خارجي)',
    speedKnots: 19.5,
    coordinates: { x: 530, y: 340, lat: -34.82, lng: 20.01 },
    riskTier: 'Tier 1 (High Risk / Avoid)',
    riskTierAr: 'المستوى الأول (بضائع عالية القيمة)',
    insurancePremium: 'Standard (Cape Route Safety)',
    notesAr: 'إعادة توجيه كاملة حول أفريقيا (+12 يوماً) لتجنب مخاطر هرمز وباب المندب.',
    notesEn: 'Diverted around Cape of Good Hope to ensure cargo security; zero Hormuz presence.'
  },
  {
    id: 'vsl-persian-aframax',
    name: 'Caspian Horizon (Aframax)',
    type: 'Aframax',
    flag: 'Iran 🇮🇷',
    cargo: 'Condensate (750,000 bbl)',
    cargoAr: 'مكثفات نفطية (٧٥٠,٠٠٠ برميل)',
    corridor: 'Hormuz-Iranian-Lane',
    corridorAr: 'المسار الإيراني الأحادي',
    aisStatus: 'SPOOFED / UNILATERAL',
    aisStatusAr: 'مسار أحادي / إشراف محلي',
    speedKnots: 13.0,
    coordinates: { x: 360, y: 140, lat: 26.75, lng: 56.25 },
    riskTier: 'Tier 2 (Risk Tolerant / Shadow)',
    riskTierAr: 'المستوى الثاني (تحمل عالي)',
    insurancePremium: 'State Indemnity Fund',
    notesAr: 'إبحار تحت حماية خفر السواحل عبر المياه الإقليمية الشمالية للمضيق.',
    notesEn: 'Coastal navigation hugging Iranian northern shore under domestic protection.'
  },
  {
    id: 'vsl-gulf-diesel-mr',
    name: 'Gulf Express 5 (MR)',
    type: 'MR Product',
    flag: 'Singapore 🇸🇬',
    cargo: 'Ultra-Low Sulfur Diesel (38,000 MT)',
    cargoAr: 'ديزل منخفض الكبريت (٣٨,٠٠٠ طن متري)',
    corridor: 'Bab-el-Mandeb',
    corridorAr: 'مضيق باب المندب (متجه لسويس)',
    aisStatus: 'ON',
    aisStatusAr: 'مفعل (AIS نشط)',
    speedKnots: 13.6,
    coordinates: { x: 150, y: 280, lat: 14.12, lng: 42.85 },
    riskTier: 'Tier 2 (Risk Tolerant / Shadow)',
    riskTierAr: 'المستوى الثاني (مشتقات مكررة)',
    insurancePremium: '0.90% (War Surcharge)',
    notesAr: 'تدفق نشط غرباً باتجاه موانئ السويس بموجب تصريح انتقائي واستجابة للطلب الأوروبي.',
    notesEn: 'Westbound refined products heading towards Suez markets under conditional corridor.'
  }
];

export const HormuzRealtimeTracker: React.FC<Props> = ({ language = 'ar', compact = false }) => {
  const isAr = language === 'ar';
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'DARK' | 'SINGLE_LANE' | 'VLCC_ZERO' | 'BAB_EL_MANDEB'>('ALL');
  const [selectedVessel, setSelectedVessel] = useState<VesselTelemetry | null>(VESSELS_DATA[0]);
  const [activeTab, setActiveTab] = useState<'radar' | 'chokepoints' | 'pipelines' | 'strategy'>('radar');
  const [copied, setCopied] = useState(false);
  const [radarPulse, setRadarPulse] = useState(0);

  // Radar pulse animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarPulse((prev) => (prev + 1) % 100);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const filteredVessels = VESSELS_DATA.filter((v) => {
    if (activeFilter === 'DARK') return v.aisStatus.includes('OFF');
    if (activeFilter === 'SINGLE_LANE') return v.corridor === 'Hormuz-Iranian-Lane';
    if (activeFilter === 'VLCC_ZERO') return v.type === 'VLCC' || v.type === 'LNG';
    if (activeFilter === 'BAB_EL_MANDEB') return v.corridor === 'Bab-el-Mandeb';
    return true;
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}/?article=middle-east-maritime-structural-shift-kpler-2026`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownloadBrief = () => {
    const briefText = `================================================================
AL-WARRAQ INTELLIGENCE WIRE — MARITIME RESTRUCTURING BRIEFING
Subject: Middle East Maritime Navigation Structural Shift (Kpler Telemetry)
Date: August 2026 | Desk: Maritime Logistics & Energy Security
================================================================

1. CHOKEPOINT STATUS:
• Strait of Hormuz: 0-3 visible daily transits (down from 30-35).
• VLCC / LNG Supertankers: 0.0 visible transits (Absolute absence).
• Dark Fleet Volume: ~60% transits with AIS disabled or unilateral passage.
• Bab el-Mandeb: 4.9M bpd crude/condensate (two-track conditional equilibrium).
• Dark transits at Bab el-Mandeb: Decreased to 16 (from 40).

2. LOGISTICS RESTRUCTURING:
• Cape of Good Hope default detour: +10 to 14 days delay.
• Container capacity absorbed: 5-7% globally.
• Pipeline bypass flows:
  - Petroline (East-West Yanbu): Max capacity utilization.
  - Habshan-Fujairah Pipeline: Full offshore crude redirection.
• Shipping Tier Separation:
  - Tier 1 (High-Value / Low-Risk): Cape of Good Hope or Sea-Air.
  - Tier 2 (Shadow / High-Risk): Suez / Red Sea with 0.5-1.0% war risk surcharge.

================================================================
Generated by Al-Warraq Maritime Real-Time Tracker
https://alwarraq.press
================================================================`;

    const blob = new Blob([briefText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AlWarraq_Hormuz_Maritime_Restructuring_Brief_2026.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border-4 border-black bg-[#faf9f6] text-black shadow-[6px_6px_0_0_#000] my-6 select-none overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-[#0f172a] text-white p-3.5 sm:p-5 border-b-4 border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-red-600 border-2 border-white flex items-center justify-center font-mono font-black text-white text-base shadow-[2px_2px_0_0_#000]">
              <Radio size={20} className="animate-pulse text-white" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-700 text-white font-mono text-[9px] font-black px-1.5 py-0.5 uppercase tracking-wider">
                {isAr ? 'بيانات كبلر الحية (KPLER TELEMETRY)' : 'LIVE KPLER TELEMETRY'}
              </span>
              <span className="text-zinc-400 font-mono text-[10px]">
                {isAr ? 'تحديث فوري ٢٠٢٦' : 'REAL-TIME 2026 FEED'}
              </span>
            </div>
            <h3 className="font-sans font-black text-base sm:text-lg tracking-tight text-white leading-snug">
              {isAr
                ? 'راصد مضيق هرمز والملاحة البحرية: أسطول الظل والمسار الأحادي'
                : 'Hormuz Real-Time Tracker: Dark Fleet Activity & Single-Lane Transit'}
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={handleDownloadBrief}
            className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-500 font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-[1px_1px_0_0_#fff]"
            title={isAr ? 'تحميل التقرير الميداني' : 'Download Intel Brief'}
          >
            <Download size={13} />
            <span className="hidden sm:inline">{isAr ? 'تقرير موجز' : 'Intel Brief'}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-2.5 py-1.5 bg-red-600 hover:bg-red-500 text-white border border-black font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-[1px_1px_0_0_#000]"
          >
            {copied ? <Check size={13} className="text-white" /> : <Share2 size={13} />}
            <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : isAr ? 'مشاركة' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Real-time Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 border-b-2 border-black bg-zinc-100 font-mono text-center divide-x divide-y lg:divide-y-0 divide-black/20 rtl:divide-x-reverse">
        <div className="p-3 bg-red-50/80">
          <span className="text-[10px] text-red-700 font-bold block uppercase">
            {isAr ? 'العبور اليومي بهرمز' : 'Daily Hormuz Transit'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-red-900 block mt-0.5">0 – 3</span>
          <span className="text-[9px] text-red-600 font-bold">{isAr ? 'سفن/يوم (تراجع ٩٢٪)' : 'Vessels/day (-92%)'}</span>
        </div>

        <div className="p-3 bg-amber-50/80">
          <span className="text-[10px] text-amber-800 font-bold block uppercase">
            {isAr ? 'ناقلات VLCC والغاز' : 'VLCC & LNG Supertankers'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-950 block mt-0.5">0.0</span>
          <span className="text-[9px] text-amber-700 font-bold">{isAr ? 'غياب تام لحركة العبور' : 'Zero visible transits'}</span>
        </div>

        <div className="p-3 bg-zinc-900 text-white">
          <span className="text-[10px] text-zinc-300 font-bold block uppercase">
            {isAr ? 'أسطول الظل (Dark Fleet)' : 'Dark Fleet Ratio'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-400 block mt-0.5">~60%</span>
          <span className="text-[9px] text-zinc-400 font-bold">{isAr ? 'إطفاء AIS / مسار أحادي' : 'AIS Off / Stealth'}</span>
        </div>

        <div className="p-3 bg-emerald-50/80">
          <span className="text-[10px] text-emerald-800 font-bold block uppercase">
            {isAr ? 'تدفق باب المندب' : 'Bab el-Mandeb Flow'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-900 block mt-0.5">4.9M</span>
          <span className="text-[9px] text-emerald-700 font-bold">{isAr ? 'برميل/يوم (خام ومكثفات)' : 'bpd (Crude & Cond.)'}</span>
        </div>

        <div className="p-3 bg-blue-50/80">
          <span className="text-[10px] text-blue-800 font-bold block uppercase">
            {isAr ? 'التفاف رأس الرجاء' : 'Cape of Good Hope'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-blue-900 block mt-0.5">+10–14d</span>
          <span className="text-[9px] text-blue-700 font-bold">{isAr ? 'امتصاص ٥–٧٪ من الحاويات' : '5-7% Global Capacity'}</span>
        </div>

        <div className="p-3 bg-purple-50/80">
          <span className="text-[10px] text-purple-800 font-bold block uppercase">
            {isAr ? 'تأمين مخاطر الحرب' : 'War Risk Premium'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-purple-900 block mt-0.5">0.5–1.0%</span>
          <span className="text-[9px] text-purple-700 font-bold">{isAr ? 'من قيمة الشحنة/الهيكل' : 'Of Cargo/Hull Value'}</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-zinc-200 border-b-2 border-black flex flex-wrap items-center justify-between p-2 gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3 py-1.5 font-sans font-bold text-xs border border-black cursor-pointer transition-all ${
              activeTab === 'radar' ? 'bg-black text-white shadow-[2px_2px_0_0_#fff]' : 'bg-white text-zinc-800 hover:bg-zinc-100'
            }`}
          >
            {isAr ? '📡 رادار المضيق والملاحة المظلمة' : '📡 Strait Radar & Dark Fleet'}
          </button>

          <button
            onClick={() => setActiveTab('chokepoints')}
            className={`px-3 py-1.5 font-sans font-bold text-xs border border-black cursor-pointer transition-all ${
              activeTab === 'chokepoints' ? 'bg-black text-white shadow-[2px_2px_0_0_#fff]' : 'bg-white text-zinc-800 hover:bg-zinc-100'
            }`}
          >
            {isAr ? '⚖️ مقارنة الممرات (هرمز vs باب المندب)' : '⚖️ Corridors Comparison'}
          </button>

          <button
            onClick={() => setActiveTab('pipelines')}
            className={`px-3 py-1.5 font-sans font-bold text-xs border border-black cursor-pointer transition-all ${
              activeTab === 'pipelines' ? 'bg-black text-white shadow-[2px_2px_0_0_#fff]' : 'bg-white text-zinc-800 hover:bg-zinc-100'
            }`}
          >
            {isAr ? '🛢️ أنابيب الالتفاف البديلة' : '🛢️ Bypass Pipelines'}
          </button>

          <button
            onClick={() => setActiveTab('strategy')}
            className={`px-3 py-1.5 font-sans font-bold text-xs border border-black cursor-pointer transition-all ${
              activeTab === 'strategy' ? 'bg-black text-white shadow-[2px_2px_0_0_#fff]' : 'bg-white text-zinc-800 hover:bg-zinc-100'
            }`}
          >
            {isAr ? '📊 التحول الهيكلي والتوقعات' : '📊 Structural Projections'}
          </button>
        </div>

        {/* Filter Badges when in Radar view */}
        {activeTab === 'radar' && (
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-mono text-[10px] text-zinc-500 font-bold mr-1">
              {isAr ? 'تصفية الأسطول:' : 'Fleet Filter:'}
            </span>
            {[
              { id: 'ALL', labelAr: 'الكل', labelEn: 'All' },
              { id: 'DARK', labelAr: 'الملاحة المظلمة (60%)', labelEn: 'Dark Fleet' },
              { id: 'SINGLE_LANE', labelAr: 'المسار الإيراني', labelEn: 'Single Lane' },
              { id: 'VLCC_ZERO', labelAr: 'الناقلات العملاقة (0)', labelEn: 'VLCC/LNG Zero' },
              { id: 'BAB_EL_MANDEB', labelAr: 'باب المندب (4.9M)', labelEn: 'Bab el-Mandeb' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${
                  activeFilter === f.id
                    ? 'bg-red-800 text-white border-black'
                    : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100'
                }`}
              >
                {isAr ? f.labelAr : f.labelEn}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Tab Content */}
      <div className="p-4 sm:p-6 space-y-6">
        {activeTab === 'radar' && (
          <div className="space-y-6">
            {/* Tactical Brief Alert */}
            <div className="bg-amber-50 border-2 border-amber-800 p-3.5 flex items-start gap-3 text-amber-950 font-sans text-xs leading-relaxed">
              <ShieldAlert className="text-amber-800 shrink-0 mt-0.5" size={18} />
              <div>
                <strong>{isAr ? 'خلاصة الرصد البحري (Kpler Insights): ' : 'Kpler Intelligence Summary: '}</strong>
                {isAr
                  ? 'انخفاض تاريخي في حركة مضيق هرمز إلى ما بين صفر و٣ سفن يومياً مع غياب تام لناقلات الخام العملاقة (VLCC) وناقلات الغاز المسال (LNG). في المقابل، يمر نحو ٦٠٪ من النشاط عبر الملاحة المظلمة مع إطفاء أجهزة AIS أو عبر القنوات الإيرانية الأحادية، بينما يواصل باب المندب ضخ ٤.٩ مليون برميل يومياً في توازن ثنائي المسار.'
                  : 'Historic chokepoint constriction: Daily transits in Hormuz have collapsed to 0–3 vessels with zero visible VLCC/LNG supertankers. Approximately 60% of volume operates in the dark fleet regime with transponders disabled or under unilateral Iranian routing, while Bab el-Mandeb sustains 4.9M bpd crude/condensate in a conditional two-track equilibrium.'}
              </div>
            </div>

            {/* Radar Simulation & Map Display Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Visual Radar Canvas (7 cols) */}
              <div className="lg:col-span-7 bg-[#050b14] border-2 border-black p-4 text-white relative rounded-none shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Radar Grid Lines & Scope Elements */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <div className="w-full h-full border border-emerald-500/40 rounded-full scale-125"></div>
                  <div className="w-full h-full border border-emerald-500/30 rounded-full scale-75"></div>
                  <div className="w-full h-full border border-emerald-500/20 rounded-full scale-50"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-emerald-500/30"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-500/30"></div>
                </div>

                {/* Radar Sweep Animation */}
                <div
                  className="absolute inset-0 pointer-events-none origin-center"
                  style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.15) 0deg, transparent 60deg, transparent 360deg)',
                    transform: `rotate(${radarPulse * 3.6}deg)`
                  }}
                ></div>

                {/* Geographical Overlay SVG Canvas */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-700 font-mono text-[10px]">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <span className="text-emerald-400 font-bold uppercase">
                        {isAr ? 'النطاق التكتيكي: مضيق هرمز والخليج' : 'TACTICAL SCOPE: STRAIT OF HORMUZ & GULF'}
                      </span>
                    </div>
                    <span className="text-zinc-400">26.5°N, 56.4°E | AIS SATELLITE INTERCEPT</span>
                  </div>

                  {/* SVG Map Schematic */}
                  <svg className="w-full h-[320px] sm:h-[360px] my-2" viewBox="0 0 600 400">
                    {/* Background Gulf & Strait Water */}
                    <path
                      d="M 50 80 Q 200 120 320 160 Q 400 180 550 280 L 580 380 L 20 380 L 20 80 Z"
                      fill="#09182b"
                      stroke="#1e3a5f"
                      strokeWidth="1.5"
                    />

                    {/* Iranian Coastline (North) */}
                    <path
                      d="M 30 50 Q 180 70 330 110 Q 420 130 570 110"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeDasharray="6,3"
                    />
                    <text x="220" y="70" fill="#f87171" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      {isAr ? 'الساحل الإيراني (بندر عباس / لاراك)' : 'IRANIAN COAST (Bandar Abbas / Larak)'}
                    </text>

                    {/* Musandam Peninsula & Omani Coastline (South) */}
                    <path
                      d="M 310 240 Q 360 170 410 180 Q 460 250 490 350"
                      fill="#0f291e"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                    <text x="360" y="270" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      {isAr ? 'شبه جزيرة مسندم (عمان)' : 'MUSANDAM (Oman)'}
                    </text>

                    {/* UAE & Fujairah Anchorage Coast */}
                    <text x="440" y="320" fill="#60a5fa" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      {isAr ? 'مخطاف الفجيرة (خارج هرمز)' : 'Fujairah Anchorage (Bypass)'}
                    </text>

                    {/* Iranian Single-Lane Unilateral Corridor (Northern Channel) */}
                    <path
                      d="M 280 125 Q 360 145 440 165"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="6"
                      strokeOpacity="0.4"
                    />
                    <path
                      d="M 280 125 Q 360 145 440 165"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                    <text x="310" y="140" fill="#fbbf24" fontSize="9" fontFamily="monospace" fontWeight="black">
                      {isAr ? '⚠️ المسار الإيراني الأحادي (Single Lane)' : '⚠️ IRANIAN UNILATERAL CORRIDOR'}
                    </text>

                    {/* Conventional International Traffic Separation Scheme (Blocked / Zero VLCC) */}
                    <path
                      d="M 330 185 Q 400 195 460 215"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="2"
                      strokeDasharray="8,4"
                    />
                    <text x="350" y="210" fill="#ef4444" fontSize="9" fontFamily="monospace" fontWeight="bold">
                      {isAr ? '⛔ ممر الفصل الدولي التقليدي (معطل / صفر VLCC)' : '⛔ CONVENTIONAL TSS (BLOCKED / 0 VLCC)'}
                    </text>

                    {/* Plotted Interactive Vessels */}
                    {filteredVessels.map((vsl) => {
                      const isSelected = selectedVessel?.id === vsl.id;
                      const isDark = vsl.aisStatus.includes('OFF');
                      const isSingleLane = vsl.corridor === 'Hormuz-Iranian-Lane';

                      return (
                        <g
                          key={vsl.id}
                          className="cursor-pointer transition-transform hover:scale-125"
                          onClick={() => setSelectedVessel(vsl)}
                        >
                          {/* Pulsing selection aura */}
                          {isSelected && (
                            <circle
                              cx={vsl.coordinates.x}
                              cy={vsl.coordinates.y}
                              r="16"
                              fill="none"
                              stroke="#60a5fa"
                              strokeWidth="2"
                              strokeDasharray="3,3"
                              className="animate-spin"
                            />
                          )}

                          {/* Vessel Dot */}
                          <circle
                            cx={vsl.coordinates.x}
                            cy={vsl.coordinates.y}
                            r={isDark ? 6.5 : 5.5}
                            fill={isDark ? '#ef4444' : isSingleLane ? '#f59e0b' : '#10b981'}
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />

                          {/* Icon marker */}
                          {isDark ? (
                            <text
                              x={vsl.coordinates.x + 8}
                              y={vsl.coordinates.y + 4}
                              fill="#fca5a5"
                              fontSize="9"
                              fontFamily="monospace"
                              fontWeight="bold"
                            >
                              {vsl.name} (DARK)
                            </text>
                          ) : (
                            <text
                              x={vsl.coordinates.x + 8}
                              y={vsl.coordinates.y + 4}
                              fill="#ffffff"
                              fontSize="8.5"
                              fontFamily="sans-serif"
                              fontWeight="bold"
                            >
                              {vsl.name}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Radar Legend Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800 font-mono text-[9px]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block border border-white"></span>
                        <span className="text-zinc-300">{isAr ? 'أسطول الظل (AIS مطفأ)' : 'Dark Fleet (AIS OFF)'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block border border-white"></span>
                        <span className="text-zinc-300">{isAr ? 'المسار الإيراني الأحادي' : 'Unilateral Lane'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block border border-white"></span>
                        <span className="text-zinc-300">{isAr ? 'عبور تقليدي معلن' : 'Active AIS'}</span>
                      </div>
                    </div>

                    <span className="text-amber-400 font-bold">
                      {isAr ? 'انقر على أي سفينة لعرض تفاصيل التتبع' : 'Click any vessel to inspect'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Selected Vessel Telemetry & Inspector Details (5 cols) */}
              <div className="lg:col-span-5 bg-white border-2 border-black p-4 sm:p-5 flex flex-col justify-between space-y-4">
                {selectedVessel ? (
                  <div className="space-y-3.5">
                    <div className="flex items-start justify-between border-b-2 border-black pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-1.5 py-0.5 text-[9px] font-mono font-black text-white ${
                              selectedVessel.aisStatus.includes('OFF')
                                ? 'bg-red-700'
                                : selectedVessel.aisStatus.includes('SPOOFED')
                                ? 'bg-amber-600'
                                : 'bg-emerald-700'
                            }`}
                          >
                            {isAr ? selectedVessel.aisStatusAr : selectedVessel.aisStatus}
                          </span>
                          <span className="font-mono text-xs text-zinc-500 font-bold">
                            {selectedVessel.type}
                          </span>
                        </div>
                        <h4 className="font-sans font-black text-base sm:text-lg text-black mt-1">
                          {selectedVessel.name}
                        </h4>
                      </div>

                      <span className="text-sm font-mono">{selectedVessel.flag}</span>
                    </div>

                    {/* Spec Key-Value Data Points */}
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex justify-between py-1 border-b border-zinc-200">
                        <span className="text-zinc-500">{isAr ? 'نوع الشحنة والكمية:' : 'Cargo Payload:'}</span>
                        <strong className="text-black text-right">{isAr ? selectedVessel.cargoAr : selectedVessel.cargo}</strong>
                      </div>

                      <div className="flex justify-between py-1 border-b border-zinc-200">
                        <span className="text-zinc-500">{isAr ? 'الممر الملاحي الحالي:' : 'Navigation Corridor:'}</span>
                        <strong className="text-red-900 text-right">{isAr ? selectedVessel.corridorAr : selectedVessel.corridor}</strong>
                      </div>

                      <div className="flex justify-between py-1 border-b border-zinc-200">
                        <span className="text-zinc-500">{isAr ? 'السرعة والإحداثيات:' : 'Speed & Position:'}</span>
                        <strong className="text-black">{selectedVessel.speedKnots} kts ({selectedVessel.coordinates.lat}°N, {selectedVessel.coordinates.lng}°E)</strong>
                      </div>

                      <div className="flex justify-between py-1 border-b border-zinc-200">
                        <span className="text-zinc-500">{isAr ? 'مستوى تصنيف المخاطر:' : 'Risk Segmentation:'}</span>
                        <strong className="text-blue-900 text-right">{isAr ? selectedVessel.riskTierAr : selectedVessel.riskTier}</strong>
                      </div>

                      <div className="flex justify-between py-1 border-b border-zinc-200">
                        <span className="text-zinc-500">{isAr ? 'قسط تأمين الحرب:' : 'War Risk Premium:'}</span>
                        <strong className="text-purple-900">{selectedVessel.insurancePremium}</strong>
                      </div>
                    </div>

                    {/* Operational Notes */}
                    <div className="p-3 bg-zinc-50 border border-zinc-300 font-sans text-xs text-zinc-800 leading-relaxed">
                      <strong>{isAr ? 'ملاحظات الرصد الميداني: ' : 'Telemetry Intel Note: '}</strong>
                      {isAr ? selectedVessel.notesAr : selectedVessel.notesEn}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-zinc-400 font-mono text-xs">
                    {isAr ? 'حدد سفينة من شاشة الرادار لعرض بيانات الرصد' : 'Select a vessel from the radar view'}
                  </div>
                )}

                {/* Chokepoint Action Callout */}
                <div className="bg-[#0f172a] text-white p-3 border-2 border-black font-sans text-xs">
                  <div className="flex items-center gap-2 font-black text-amber-400 uppercase text-[10px] mb-1">
                    <AlertTriangle size={13} />
                    <span>{isAr ? 'قاعدة البيانات التشغيلية' : 'OPERATIONAL FACTOR'}</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 leading-normal">
                    {isAr
                      ? 'أصبح أسطول الظل هو النموذج التشغيلي الأساسي للشرق الأوسط، حيث يعتمد أكثر من 60% من السفن على إطفاء البث لتجاوز قيود الحصار وتجنب الاستهداف المباشر.'
                      : 'The shadow fleet has solidified as a core operational baseline: >60% of transit relies on cloaked AIS to circumvent blockade constraints and direct missile strikes.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Chokepoints Comparison (Hormuz vs Bab el-Mandeb vs Cape) */}
        {activeTab === 'chokepoints' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-2 border-black bg-white overflow-x-auto">
              <table className="w-full text-right rtl:text-right ltr:text-left font-sans text-xs">
                <thead>
                  <tr className="bg-black text-white font-mono text-[11px] uppercase">
                    <th className="p-3">{isAr ? 'الممر الملاحي' : 'Corridor'}</th>
                    <th className="p-3">{isAr ? 'حالة الأمان والحصار' : 'Security & Blockade'}</th>
                    <th className="p-3">{isAr ? 'حجم التدفق اليومي' : 'Daily Volume'}</th>
                    <th className="p-3">{isAr ? 'نسبة أسطول الظل' : 'Dark Fleet Ratio'}</th>
                    <th className="p-3">{isAr ? 'التأثير المباشر على الطاقة' : 'Energy Impact'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-300 font-medium">
                  <tr className="bg-red-50/50 hover:bg-red-50">
                    <td className="p-3 font-bold text-red-950 font-sans">
                      {isAr ? 'مضيق هرمز (Strait of Hormuz)' : 'Strait of Hormuz'}
                    </td>
                    <td className="p-3 text-red-700">
                      {isAr ? 'حصار وتوقف للممر الدولي / عبور أحادي إيراني فقط' : 'International TSS Blocked / Single-Lane Unilateral'}
                    </td>
                    <td className="p-3 font-mono font-bold text-red-900">
                      {isAr ? '٠ – ٣ سفن/يوم (صفر VLCC)' : '0–3 vessels/day (0 VLCC)'}
                    </td>
                    <td className="p-3 font-mono font-bold text-amber-700">~60%</td>
                    <td className="p-3 text-zinc-700">
                      {isAr ? 'اختناق فعلي لصادرات الخليج والغاز المسال' : 'Severe bottleneck for Arabian Gulf crude & LNG'}
                    </td>
                  </tr>

                  <tr className="bg-emerald-50/50 hover:bg-emerald-50">
                    <td className="p-3 font-bold text-emerald-950 font-sans">
                      {isAr ? 'باب المندب والبحر الأحمر' : 'Bab el-Mandeb & Red Sea'}
                    </td>
                    <td className="p-3 text-emerald-800">
                      {isAr ? 'توازن ثنائي المسار مشروط / تصاريح انتقائية' : 'Conditional Two-Track Equilibrium / Selective Permits'}
                    </td>
                    <td className="p-3 font-mono font-bold text-emerald-900">
                      {isAr ? '٤.٩ مليون برميل/يوم' : '4.9M bpd (Crude & Cond.)'}
                    </td>
                    <td className="p-3 font-mono font-bold text-emerald-700">
                      {isAr ? '١٦ عبوراً مظلماً فقط' : '16 dark transits'}
                    </td>
                    <td className="p-3 text-zinc-700">
                      {isAr ? 'تدفق نشط للمشتقات المكررة وخام Basrah/Norns غرباً' : 'Active refined & heavy crude westbound flows'}
                    </td>
                  </tr>

                  <tr className="bg-blue-50/50 hover:bg-blue-50">
                    <td className="p-3 font-bold text-blue-950 font-sans">
                      {isAr ? 'طريق رأس الرجاء الصالح' : 'Cape of Good Hope'}
                    </td>
                    <td className="p-3 text-blue-800">
                      {isAr ? 'آمن بالكامل / خط تشغيلي افتراضي عالمي' : 'Fully Safe / Global Default Baseline'}
                    </td>
                    <td className="p-3 font-mono font-bold text-blue-900">
                      {isAr ? 'استيعاب ٥–٧٪ من سعة الحاويات' : '5–7% Global Capacity Soaked'}
                    </td>
                    <td className="p-3 font-mono font-bold text-blue-700">0% (100% AIS)</td>
                    <td className="p-3 text-zinc-700">
                      {isAr ? 'إضافة ١٠–١٤ يوماً لشحنات الغاز والحاويات الكبرى' : '+10-14 days delay for LNG & major container lines'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* In-depth Breakdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-black bg-[#faf9f6] p-4 space-y-2">
                <h4 className="font-sans font-black text-sm text-red-900 border-b border-zinc-300 pb-1">
                  {isAr ? '١. تفصيل حركة الملاحة عبر هرمز' : '1. Hormuz Maritime Breakdown'}
                </h4>
                <ul className="space-y-1.5 font-sans text-xs text-zinc-700 list-disc list-inside leading-relaxed">
                  <li>
                    <strong>{isAr ? 'ناقلات VLCC والغاز المسال:' : 'VLCCs & LNG:'}</strong> {isAr ? 'صفر عبور مرئي، تعطل كامل بسبب المخاطر والحصار.' : 'Zero visible transits; complete freeze on supertankers.'}
                  </li>
                  <li>
                    <strong>{isAr ? 'ناقلات الغاز النفطي (LPG) والوقود:' : 'LPG & Fuel Tankers:'}</strong> {isAr ? 'محدودة جداً؛ دخول ناقلات فارغة (VLGCs مثل Xavia) عبر المسار الإيراني.' : 'Very limited; ballast VLGCs (e.g. Xavia) via unilateral Iranian lane.'}
                  </li>
                  <li>
                    <strong>{isAr ? 'سفن الصب الجاف:' : 'Dry Bulk:'}</strong> {isAr ? 'حركة دنيا تقتصر على خروج متقطع لسفن باناماكس مع تشغيل AIS.' : 'Minimal outbound Panamax bulk carriers with active transponders.'}
                  </li>
                  <li>
                    <strong>{isAr ? 'الحجم المظلم:' : 'Dark Fleet:'}</strong> {isAr ? '٦٠٪ من العبور يتم مع إطفاء AIS لتفادي الرصد.' : '~60% transits conducted with transponders disabled.'}
                  </li>
                </ul>
              </div>

              <div className="border-2 border-black bg-[#faf9f6] p-4 space-y-2">
                <h4 className="font-sans font-black text-sm text-emerald-900 border-b border-zinc-300 pb-1">
                  {isAr ? '٢. تفصيل حركة الملاحة عبر باب المندب' : '2. Bab el-Mandeb Breakdown'}
                </h4>
                <ul className="space-y-1.5 font-sans text-xs text-zinc-700 list-disc list-inside leading-relaxed">
                  <li>
                    <strong>{isAr ? 'النفط الخام والمكثفات:' : 'Crude & Condensate:'}</strong> {isAr ? 'مرونة عالية (٤.٩ مليون برميل يومياً، مشاركة ناقلات ضخمة مثل Norns بحمولة ٢ مليون برميل).' : 'High resilience (4.9M bpd, featuring supertankers like Norns carrying 2M bbl).'}
                  </li>
                  <li>
                    <strong>{isAr ? 'المشتقات المكررة:' : 'Refined Products:'}</strong> {isAr ? 'تدفق نشط غرباً نحو سويس عبر ناقلات MR المحملة بالديزل.' : 'Active westbound diesel flows via Medium Range tankers.'}
                  </li>
                  <li>
                    <strong>{isAr ? 'بضائع الصب والحاويات:' : 'Dry Bulk & Containers:'}</strong> {isAr ? 'استفادة من إعفاءات وتصاريح انتقائية من الحوثيين.' : 'Operating under selective exemptions and permits.'}
                  </li>
                  <li>
                    <strong>{isAr ? 'الحجم المظلم:' : 'Dark Transits:'}</strong> {isAr ? 'انخفض إلى ١٦ عملية عبور بعد أن كان ٤٠.' : 'Declined to 16 unmonitored transits from 40.'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Bypass Pipelines */}
        {activeTab === 'pipelines' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Pipeline 1: Saudi East-West Petroline */}
              <div className="border-2 border-black bg-white p-5 space-y-3">
                <div className="flex items-center justify-between border-b-2 border-black pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-emerald-600 border border-black inline-block"></span>
                    <h4 className="font-sans font-black text-base text-zinc-950">
                      {isAr ? 'خط أنابيب شرق-غرب السعودي (Petroline)' : 'Saudi East-West Petroline'}
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-800">5.0M bpd MAX</span>
                </div>

                <div className="font-mono text-xs space-y-1.5 text-zinc-700">
                  <div><strong>{isAr ? 'المسار:' : 'Route:'}</strong> {isAr ? 'من بقيق / حقول الشرقية إلى ميناء ينبع على البحر الأحمر' : 'Abqaiq / Eastern Province to Yanbu Port (Red Sea)'}</div>
                  <div><strong>{isAr ? 'الهدف الاستراتيجي:' : 'Strategic Goal:'}</strong> {isAr ? 'تجنب عبور مضيق هرمز بالكامل وتحميل الناقلات من البحر الأحمر' : 'Complete bypass of Strait of Hormuz to Red Sea berths'}</div>
                  <div><strong>{isAr ? 'الاستخدام الحالي:' : 'Current Load:'}</strong> <span className="text-emerald-700 font-bold">{isAr ? 'تشغيل بأقصى طاقة استيعابية للتعويض عن إغلاق هرمز' : 'Maximum capacity utilization replacing Gulf loadings'}</span></div>
                </div>

                <p className="font-sans text-xs text-zinc-600 leading-relaxed border-t border-zinc-200 pt-2">
                  {isAr
                    ? 'يعد خط ينبع الملاذ الأول لصادرات الخام العربي الخفيف إلى الأسواق الأوروبية والمتوسطية دون التعرض لاختناق الخليج.'
                    : 'The Petroline serves as the primary conduit for Arab Light exports to European refiners without touching Gulf waters.'}
                </p>
              </div>

              {/* Pipeline 2: Habshan-Fujairah Pipeline (UAE) */}
              <div className="border-2 border-black bg-white p-5 space-y-3">
                <div className="flex items-center justify-between border-b-2 border-black pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-600 border border-black inline-block"></span>
                    <h4 className="font-sans font-black text-base text-zinc-950">
                      {isAr ? 'خط أنابيب حبشان-الفجيرة (الإمارات)' : 'Habshan-Fujairah Pipeline (UAE)'}
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold text-blue-800">1.8M bpd CAP</span>
                </div>

                <div className="font-mono text-xs space-y-1.5 text-zinc-700">
                  <div><strong>{isAr ? 'المسار:' : 'Route:'}</strong> {isAr ? 'من حقول حبشان في أبوظبي إلى ميناء الفجيرة على بحر عمان' : 'Habshan Fields (Abu Dhabi) to Fujairah Port (Gulf of Oman)'}</div>
                  <div><strong>{isAr ? 'الهدف الاستراتيجي:' : 'Strategic Goal:'}</strong> {isAr ? 'تصدير خام مربان من خارج مضيق هرمز مباشرة للمحيط الهندي' : 'Direct export of Murban crude outside the Strait into Indian Ocean'}</div>
                  <div><strong>{isAr ? 'الاستخدام الحالي:' : 'Current Load:'}</strong> <span className="text-blue-700 font-bold">{isAr ? 'ضخ نشط وتحميل مباشر للناقلات في بحر عمان' : 'Full continuous throughput to deepwater Fujairah terminals'}</span></div>
                </div>

                <p className="font-sans text-xs text-zinc-600 leading-relaxed border-t border-zinc-200 pt-2">
                  {isAr
                    ? 'يتيح خط الفجيرة لشركات النفط الإماراتية تفادي رسوم التأمين الباهظة لمضيق هرمز وضمان تدفقات الخام للعملاء في آسيا.'
                    : 'Enables ADNOC to bypass elevated Hormuz war premiums and maintain uninterruptible Asian crude exports.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Strategic Supply Chain Projections */}
        {activeTab === 'strategy' && (
          <div className="space-y-4 animate-fade-in font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-black bg-white p-4 space-y-2">
                <div className="flex items-center gap-2 text-red-800 font-black text-xs uppercase border-b border-zinc-200 pb-1">
                  <span className="w-5 h-5 bg-red-800 text-white flex items-center justify-center font-mono text-[10px]">1</span>
                  <span>{isAr ? 'إعادة هيكلة الطاقة والأنابيب (٣-٦ أشهر)' : 'Energy & Pipeline Restructuring'}</span>
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  {isAr
                    ? 'تعظيم استخدام أنابيب النفط البرية (ينبع والفجيرة) لتفادي هرمز تماماً، مع تحول المشترين في أوروبا وآسيا لاستيراد المشتقات الوسطى من مراكز بديلة (الساحل الأمريكي، غرب أفريقيا، والهند).'
                    : 'Maximizing terrestrial pipeline throughput while Asian/European refiners pivot to US Gulf Coast, West Africa, and Indian distillate hubs.'}
                </p>
              </div>

              <div className="border-2 border-black bg-white p-4 space-y-2">
                <div className="flex items-center gap-2 text-blue-800 font-black text-xs uppercase border-b border-zinc-200 pb-1">
                  <span className="w-5 h-5 bg-blue-800 text-white flex items-center justify-center font-mono text-[10px]">2</span>
                  <span>{isAr ? 'اعتماد طريق رأس الرجاء الصالح كمسار افتراضي' : 'Cape of Good Hope Default'}</span>
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  {isAr
                    ? 'تثبيت مسار رأس الرجاء الصالح (+١٠ إلى ١٤ يوماً) كخط تشغيلي أساسي لخطوط آسيا–أوروبا، مما يستوعب ٥–٧٪ من سعة الحاويات العالمية ويقضي على عدم انتظام الجداول الزمنية.'
                    : 'Institutionalizing the Cape route (+10-14 days) across major liner networks, absorbing 5-7% of global container capacity to stabilize sailing schedules.'}
                </p>
              </div>

              <div className="border-2 border-black bg-white p-4 space-y-2">
                <div className="flex items-center gap-2 text-purple-800 font-black text-xs uppercase border-b border-zinc-200 pb-1">
                  <span className="w-5 h-5 bg-purple-800 text-white flex items-center justify-center font-mono text-[10px]">3</span>
                  <span>{isAr ? 'خدمات شحن ثنائية المستوى ومقسمة حسب المخاطر' : 'Two-Tier Risk Segmented Shipping'}</span>
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  {isAr
                    ? 'المستوى الأول (بضائع عالية القيمة) يلتزم برأس الرجاء الصالح أو الحلول متعددة الوسائط، بينما المستوى الثاني (بضائع منخفضة الهامش وأسطول الظل) يعبر سويس والبحر الأحمر مع تحمل أقساط تأمين حرب (٠.٥–١.٠٪).'
                    : 'Tier 1 (high-value/perishables) sticks to Cape/multimodal; Tier 2 (low-margin bulk & shadow fleet) navigates Red Sea/Suez bearing 0.5-1.0% war risk surcharges.'}
                </p>
              </div>

              <div className="border-2 border-black bg-white p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-black text-xs uppercase border-b border-zinc-200 pb-1">
                  <span className="w-5 h-5 bg-amber-800 text-white flex items-center justify-center font-mono text-[10px]">4</span>
                  <span>{isAr ? 'تعديلات التكلفة والمخزون الاحتياطي' : 'Buffer Stock & Surcharge Economics'}</span>
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  {isAr
                    ? 'إضافة مهل زمنية تتراوح بين أسبوعين إلى ٣ أسابيع في تخطيط سلاسل التوريد لزيادة مخزون الأمان الدائم، مع استمرار تقلب أسعار شحن الحاويات وإدراج رسوم المخاطر الطارئة.'
                    : 'Adding 2-3 weeks buffer lead times to procurement cycles, driving structural working capital increases alongside volatile risk surcharges.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer System Status Banner */}
      <div className="bg-zinc-100 border-t-2 border-black p-3 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-zinc-600">
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-red-700 animate-pulse" />
          <span>{isAr ? 'مصدر البيانات الميدانية: مرصد كبلر (Kpler) والأقمار الصناعية البحرية — صحيفة الورّاق' : 'Data Sources: Kpler Maritime Telemetry & Satellite AIS Intercept — Al-Warraq'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
          <span className="font-bold text-zinc-800">LATENCY: 42ms | SYSTEM ARMORED</span>
        </div>
      </div>
    </div>
  );
};

export default HormuzRealtimeTracker;
