import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  AlertTriangle, 
  Zap, 
  MapPin, 
  Compass, 
  Plane, 
  FileText, 
  Activity, 
  Grid, 
  Database,
  Flame,
  Wifi,
  Radio,
  Globe,
  TrendingDown,
  Info
} from 'lucide-react';

interface InfrastructureWarInfographicProps {
  language: 'ar' | 'en';
}

interface TargetNode {
  id: string;
  nameAr: string;
  nameEn: string;
  coordinates: string;
  sectorAr: string;
  sectorEn: string;
  statusAr: string;
  statusEn: string;
  statusColor: string; // red, orange, yellow, green
  descriptionAr: string;
  descriptionEn: string;
  source: string;
}

export const InfrastructureWarInfographic: React.FC<InfrastructureWarInfographicProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'radar' | 'ledger' | 'analysis'>('radar');
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>('hormuz');
  const [regionFilter, setRegionFilter] = useState<'all' | 'gcc' | 'iran'>('all');

  const targets: TargetNode[] = [
    // GCC TARGETS
    {
      id: 'hormuz',
      nameAr: 'مضيق هرمز وجنوب الخليج',
      nameEn: 'Strait of Hormuz & South Gulf',
      coordinates: '26.56° N, 56.25° E',
      sectorAr: 'ممرات مائية وموانئ',
      sectorEn: 'Maritime & Ports',
      statusAr: 'حصار واقعي جزئي',
      statusEn: 'De Facto Partial Blockade',
      statusColor: 'bg-red-500 text-red-100',
      descriptionAr: 'العصب الحيوي الذي يمر عبره أكثر من 20% من النفط والغاز العالمي. فرضت إيران إغلاقاً بحرياً واقعياً عبر استهداف السفن التجارية ومحاولة تحصيل رسوم عبور قسرية.',
      descriptionEn: 'The global artery carrying over 20% of world oil and gas. Iran enforced a de facto blockade by targeting merchant vessels and attempting to levy arbitrary transit fees.',
      source: 'S&P Global'
    },
    {
      id: 'fujairah',
      nameAr: 'ميناء الفجيرة ومستودعات التخزين',
      nameEn: 'Port of Fujairah & Storage Terminals',
      coordinates: '25.12° N, 56.36° E',
      sectorAr: 'ممرات مائية وموانئ',
      sectorEn: 'Maritime & Ports',
      statusAr: 'تهديد مسيرات مستمر',
      statusEn: 'Persistent Drone Threat',
      statusColor: 'bg-amber-500 text-black',
      descriptionAr: 'يقع خارج مضيق هرمز ويمثل المخرج الرئيسي لنفط الإمارات عبر خط أنابيب حبشان-الفجيرة. تعرضت خزاناته لتهديدات متكررة ومحاولات استهداف بطائرات مسيرة لشل هذا البديل الملاحي.',
      descriptionEn: 'Located outside Hormuz, it is the crucial egress point for UAE crude via the Habshan-Fujairah pipeline. Faced recurrent drone threat vectors seeking to disable this maritime bypass.',
      source: 'ACLED'
    },
    {
      id: 'ruwais',
      nameAr: 'ميناء الرويس الصناعي (الإمارات)',
      nameEn: 'Ruwais Industrial Port (ADNOC)',
      coordinates: '24.11° N, 52.73° E',
      sectorAr: 'ممرات مائية وموانئ',
      sectorEn: 'Maritime & Ports',
      statusAr: 'تهديد سيبراني وحركي',
      statusEn: 'Cyber & Kinetic Threat',
      statusColor: 'bg-amber-500 text-black',
      descriptionAr: 'يضم مجمع أدنوك لتوسعة الغاز الطبيعي المسال (LNG). يمثل هدفاً استراتيجياً حساساً للغاية سعت طهران وحلفاؤها لوضعه تحت مراقبة ميدانية مستمرة.',
      descriptionEn: 'Houses the ADNOC LNG expansion infrastructure. Highly sensitive tactical node placed under persistent reconnaissance and threat alerts.',
      source: 'Arab Center Washington DC'
    },
    {
      id: 'bab-al-mandab',
      nameAr: 'مضيق باب المندب (البحر الأحمر)',
      nameEn: 'Bab al-Mandab Strait (Red Sea)',
      coordinates: '12.58° N, 43.34° E',
      sectorAr: 'ممرات مائية وموانئ',
      sectorEn: 'Maritime & Ports',
      statusAr: 'جبهة مشتعلة - نشط',
      statusEn: 'Volatile Active Front',
      statusColor: 'bg-red-500 text-red-100',
      descriptionAr: 'جبهة مشتعلة بواسطة الحوثيين بناءً على توجيهات طهران، حيث هددوا بفرض إغلاق كامل عليه ورفع أسعار النفط لـ 200 دولار للبرميل في حال تم استهداف شبكة الكهرباء الإيرانية.',
      descriptionEn: 'Active proxy warfare front controlled by Houthi forces under Tehran directives, threatening a complete blockade to drive oil prices to $200/barrel if Iran’s grid is hit.',
      source: 'ARAB NEWS'
    },
    {
      id: 'ras-tanura',
      nameAr: 'مجمع رأس تنورة (السعودية)',
      nameEn: 'Ras Tanura Complex (Aramco)',
      coordinates: '26.64° N, 50.12° E',
      sectorAr: 'منشآت نفطية ومصافي غاز',
      sectorEn: 'Refineries & Gas Plants',
      statusAr: 'أضرار جزئية تم إصلاحها',
      statusEn: 'Partial Damages Restored',
      statusColor: 'bg-orange-500 text-white',
      descriptionAr: 'أكبر منشأة لتكرير وشحن النفط في العالم ومحور شركة أرامكو. تعرض لضربات مباشرة بالصواريخ الباليستية والمسيرات الإيرانية في موجات التصعيد (مارس 2026) مما أحدث تذبذباً عالمياً.',
      descriptionEn: 'The world’s largest oil refining and shipping hub. Hit directly by ballistic missiles and drone waves during peak escalations (notably in March 2026), sparking high global market volatility.',
      source: 'S&P Global'
    },
    {
      id: 'ras-laffan',
      nameAr: 'مجمع رأس لفان الصناعي (قطر)',
      nameEn: 'Ras Laffan Industrial City (Qatar)',
      coordinates: '25.90° N, 51.52° E',
      sectorAr: 'منشآت نفطية ومصافي غاز',
      sectorEn: 'Refineries & Gas Plants',
      statusAr: 'تعليق إنتاج مؤقت سابق',
      statusEn: 'Prior Temporary Suspension',
      statusColor: 'bg-orange-500 text-white',
      descriptionAr: 'عصب إنتاج الغاز الطبيعي المسال (LNG) الأكبر عالمياً. تعرض لهجمات بمسيرات إيرانية، مما دفع شركة "قطر للطاقة" لإعلان تعليق مؤقت للإنتاج حينها وقفزت أسعار الغاز بأوروبا وآسيا.',
      descriptionEn: 'The global nerve center for Liquified Natural Gas (LNG). Hit by drone incursions, forcing QatarEnergy to declare a temporary halt in operations, triggering massive price spikes in Europe.',
      source: 'The Soufan Center'
    },
    {
      id: 'airports',
      nameAr: 'مطارات دبي وأبوظبي الدولية',
      nameEn: 'Dubai & Abu Dhabi Airports (UAE)',
      coordinates: '25.25° N, 55.36° E',
      sectorAr: 'طيران ومطارات',
      sectorEn: 'Aviation & Airports',
      statusAr: 'تعطيل جزئي سيبراني وحركي',
      statusEn: 'Partial Cyber & Kinetic Interruption',
      statusColor: 'bg-amber-500 text-black',
      descriptionAr: 'تعرضا لضربات صاروخية وهجمات بمسيرات ألحقت أضراراً مادية بالبنية التحتية والممرات، إلى جانب تفعيل جبهة سيبرانية لتعطيل أنظمة الملاحة والخدمات لشل قطاع السياحة والطيران.',
      descriptionEn: 'Suffered direct rocket/drone impacts damaging tarmac/infrastructure, accompanied by targeted DDoS operations disrupting air navigation services to isolate tourism flows.',
      source: 'ACLED'
    },

    // IRAN TARGETS
    {
      id: 'assaluyeh',
      nameAr: 'مجمع عسلوية للغاز (Assaluyeh)',
      nameEn: 'Assaluyeh Gas Complex',
      coordinates: '27.48° N, 52.62° E',
      sectorAr: 'منشآت نفطية ومصافي غاز',
      sectorEn: 'Refineries & Gas Plants',
      statusAr: 'تدمير واسع النطاق',
      statusEn: 'Severe Structural Destruction',
      statusColor: 'bg-red-600 text-white animate-pulse',
      descriptionAr: 'يضم منشآت معالجة حقل "جنوب فارس" العملاق. تعرض المجمع لضربات قاسية (منها هجمات بطائرات مسيرة إسرائيلية) ألحقت أضراراً جسيمة بمحطات معالجة وتكرير الغاز، ما عطل الاستهلاك المحلي الإيراني.',
      descriptionEn: 'Houses processing utilities for the giant South Pars field. Suffered heavy degradation (including Israeli drone vectors), knocking out processing trains and severely paralyzing domestic distribution.',
      source: 'Arab Center Washington DC'
    },
    {
      id: 'kharg-qeshm',
      nameAr: 'مصافي جزيرتي خارك وقشم',
      nameEn: 'Kharg & Qeshm Oil Terminals',
      coordinates: '29.25° N, 50.31° E',
      sectorAr: 'منشآت نفطية ومصافي غاز',
      sectorEn: 'Refineries & Gas Plants',
      statusAr: 'خارج الخدمة جزئياً',
      statusEn: 'Partially Out of Service',
      statusColor: 'bg-red-500 text-red-100',
      descriptionAr: 'نقاط التصدير الرئيسية للنفط الإيراني في الخليج؛ تعرضت لضربات أمريكية وإسرائيلية متكررة لشل الاقتصاد الإيراني وقطع الموارد المالية والسيولة كلياً عن النظام.',
      descriptionEn: 'Major export hubs in the Gulf; repeatedly targeted by US/Israeli strikes to sever Iran’s hard currency flow and halt crude loading operations completely.',
      source: 'S&P Global'
    },
    {
      id: 'iran-internet',
      nameAr: 'شبكة الإنترنت والاتصالات الإيرانية',
      nameEn: 'Iranian Telecom & Web Grid',
      coordinates: 'Tehran Command Center',
      sectorAr: 'بنية الاتصالات والفضاء الرقمي',
      sectorEn: 'Telecom & Cyber Domain',
      statusAr: 'انهيار بنسبة 96%',
      statusEn: '96% Traffic Collapse',
      statusColor: 'bg-red-600 text-white animate-pulse',
      descriptionAr: 'تعرضت لأكبر هجوم سيبراني في التاريخ بالتزامن مع الضربات العسكرية (مثل عملية Epic Fury في فبراير 2026)، مما أدى إلى انهيار سعة الإنترنت لتصل إلى ما بين 1% إلى 4% وشلل تام في المعاملات المصرفية ومحطات الوقود.',
      descriptionEn: 'Hit by the largest coordinated cyber offensive in history parallel to military operations (such as Operation Epic Fury in February 2026), dropping connectivity to between 1% and 4%, completely paralyzing digital payments and municipal grids.',
      source: 'EclecticIQ Blog'
    },
    {
      id: 'irgc-nuclear',
      nameAr: 'مجمعات الحرس الثوري والمنشآت النووية',
      nameEn: 'IRGC Complexes & Nuclear Facilities',
      coordinates: 'Tehran, Isfahan, Qom, Karaj',
      sectorAr: 'البنية التحتية العسكرية والنووية',
      sectorEn: 'Military & Nuclear Infrastructure',
      statusAr: 'ضربات مركزة مستمرة',
      statusEn: 'Persistent Precision Strikes',
      statusColor: 'bg-orange-500 text-white',
      descriptionAr: 'ضربات مركزة ودقيقة استهدفت المجمعات القيادية للحرس الثوري (IRGC) ومنشآت تخصيب اليورانيوم ومخازن الصواريخ الباليستية في أصفهان وقم وكرج وكرمانشاه.',
      descriptionEn: 'Coordinated strikes targeted Islamic Revolutionary Guard Corps command centers, missile depots, and uranium enrichment sites in Tehran, Isfahan, Qom, Karaj, and Kermanshah.',
      source: 'CloudSEK'
    }
  ];

  const filteredTargets = regionFilter === 'all' 
    ? targets 
    : targets.filter(t => regionFilter === 'gcc' ? !t.id.match(/assaluyeh|kharg|internet|irgc/) : t.id.match(/assaluyeh|kharg|internet|irgc/));

  const activeTarget = targets.find(t => t.id === selectedTargetId) || targets[0];

  return (
    <div className="bg-[#090A0D] text-[#E2E8F0] border-4 border-black p-4 md:p-6 my-6 font-mono relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      
      {/* Geoint cyber grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      
      {/* Top Banner */}
      <div className="relative z-10 border-b border-zinc-800 pb-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] text-red-500 font-extrabold tracking-wider">
          <span className="flex items-center gap-1.5 uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            {isAr ? 'برقية استخبارات البنية التحتية والبيانات الجغرافية' : 'INFRASTRUCTURE INTELLIGENCE & GEO-SPATIAL DISPATCH'}
          </span>
          <span className="text-zinc-500 font-bold uppercase">
            {isAr ? 'المرجع الاستقصائي: ACLED & S&P GLOBAL' : 'REF: ACLED & S&P GLOBAL • JULY 2026'}
          </span>
        </div>
        
        <h3 className="text-xl md:text-3xl font-sans font-black text-white tracking-tight mt-2 uppercase">
          {isAr ? '«شريان الحياة في مرمى النيران» جغرافيا الاستهداف المتبادل' : '«LIFELINES IN THE CROSSHAIR» GCC-IRAN SYSTEMIC TARGETING'}
        </h3>
        
        <p className="text-xxs md:text-xs text-zinc-400 mt-2 leading-relaxed font-sans max-w-4xl">
          {isAr 
            ? 'منظومة تفاعلية لرسم وتتبع الإحداثيات والضربات العسكرية والسيبرانية التدميرية المسجلة للبنى التحتية الحيوية في دول الخليج العربي وإيران حتى منتصف عام 2026.' 
            : 'An interactive analytical system mapping and tracking physical/cyber degradation points, coordinates, and systemic casualties across GCC and Iran up to mid-2026.'}
        </p>
      </div>

      {/* Tabs Row */}
      <div className="relative z-10 flex border-b border-zinc-800 gap-2 mb-6 font-sans text-xs">
        <button
          onClick={() => setActiveTab('radar')}
          className={`py-2 px-3 font-bold uppercase transition-all border-b-2 cursor-pointer ${
            activeTab === 'radar' 
              ? 'border-red-600 text-red-500 font-black' 
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {isAr ? 'رادار المراقبة الجغرافية' : 'Geo-Spatial Threat Radar'}
        </button>
        <button
          onClick={() => setActiveTab('ledger')}
          className={`py-2 px-3 font-bold uppercase transition-all border-b-2 cursor-pointer ${
            activeTab === 'ledger' 
              ? 'border-red-600 text-red-500 font-black' 
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {isAr ? 'جدول تقييم الخسائر السيادي' : 'Sovereign Loss Assessment Ledger'}
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`py-2 px-3 font-bold uppercase transition-all border-b-2 cursor-pointer ${
            activeTab === 'analysis' 
              ? 'border-red-600 text-red-500 font-black' 
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {isAr ? 'الخلاصة الإستراتيجية والمقارنة' : 'Strategic Synthesis'}
        </button>
      </div>

      {/* TAB CONTENT: RADAR */}
      {activeTab === 'radar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          
          {/* Left panel: Coordinates list with regional filters */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex justify-between items-center bg-zinc-900/60 p-2 border border-zinc-800 text-[10px]">
              <span className="text-zinc-400 font-bold uppercase">{isAr ? 'تصفية الإقليم:' : 'FILTER REGION:'}</span>
              <div className="flex gap-1.5">
                {(['all', 'gcc', 'iran'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRegionFilter(r);
                      // Auto-select first in filter
                      const matching = targets.filter(t => r === 'all' ? true : r === 'gcc' ? !t.id.match(/assaluyeh|kharg|internet|irgc/) : t.id.match(/assaluyeh|kharg|internet|irgc/));
                      if (matching.length > 0) {
                        setSelectedTargetId(matching[0].id);
                      }
                    }}
                    className={`px-2 py-0.5 text-[9px] uppercase border font-bold transition-all ${
                      regionFilter === r 
                        ? 'bg-red-950 border-red-700 text-red-400' 
                        : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {r === 'all' ? (isAr ? 'الكل' : 'ALL') : r === 'gcc' ? (isAr ? 'الخليج' : 'GCC') : (isAr ? 'إيران' : 'IRAN')}
                  </button>
                ))}
              </div>
            </div>

            {/* Target List */}
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {filteredNewswiresTargetList()}
            </div>
          </div>

          {/* Right panel: Live Radar Telemetry readout */}
          <div className="lg:col-span-7 flex flex-col justify-between border-2 border-zinc-800 bg-zinc-950 p-4 md:p-6 relative overflow-hidden min-h-[380px]">
            {/* Grid graphic background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.06)_0%,transparent_75%)] pointer-events-none" />
            
            {/* Crosshair decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-dashed border-red-900/30 w-72 h-72 rounded-full animate-spin [animation-duration:60s] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-dashed border-red-900/20 w-44 h-44 rounded-full pointer-events-none" />
            <div className="absolute top-4 right-4 text-zinc-800 select-none text-[9px] font-black pointer-events-none">GEOSPATIAL GRID SECURE v2.26</div>

            <AnimatePresence mode="wait">
              {activeTarget && (
                <motion.div
                  key={activeTarget.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4 relative z-10"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-zinc-800 pb-3">
                    <div>
                      <span className={`inline-block px-2 py-0.5 text-[9px] font-black uppercase mb-1.5 ${activeTarget.statusColor}`}>
                        {isAr ? activeTarget.statusAr : activeTarget.statusEn}
                      </span>
                      <h4 className="text-base md:text-xl font-sans font-black text-white">
                        {isAr ? activeTarget.nameAr : activeTarget.nameEn}
                      </h4>
                    </div>
                    <div className="text-right sm:text-left font-mono">
                      <div className="text-[10px] text-zinc-500 font-bold">{isAr ? 'الإحداثيات الجغرافية:' : 'GEO COORDS:'}</div>
                      <div className="text-xs text-red-500 font-black flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{activeTarget.coordinates}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xxs border-b border-zinc-900 pb-3">
                    <div>
                      <span className="text-zinc-500 uppercase font-black block mb-0.5">{isAr ? 'القطاع الاستراتيجي:' : 'STRATEGIC SECTOR:'}</span>
                      <span className="text-zinc-300 font-extrabold">{isAr ? activeTarget.sectorAr : activeTarget.sectorEn}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 uppercase font-black block mb-0.5">{isAr ? 'مرجع الرصد المعتمد:' : 'MONITORING REFERENCE:'}</span>
                      <span className="text-amber-500 font-extrabold">{activeTarget.source}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-zinc-500 uppercase font-black text-xxs block">{isAr ? 'البيان الاستخباراتي الميداني:' : 'TACTICAL INTELLIGENCE NARRATIVE:'}</span>
                    <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                      {isAr ? activeTarget.descriptionAr : activeTarget.descriptionEn}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 pt-3 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500">
              <span className="flex items-center gap-1">
                <Info size={11} className="text-red-500" />
                <span>{isAr ? 'اضغط على بنية تحتية في القائمة لمزامنة الرادار والبيانات' : 'Click any infrastructure node to sync geoint radar data'}</span>
              </span>
              <span className="hidden sm:inline font-bold">SECURE CHANNEL // NO-FORWARD</span>
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: LEDGER */}
      {activeTab === 'ledger' && (
        <div className="relative z-10 overflow-x-auto border-2 border-zinc-800 bg-zinc-950 shadow-inner">
          <table className="w-full text-right rtl:text-right ltr:text-left border-collapse table-auto text-xs">
            <thead>
              <tr className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-black tracking-wider text-[10px]">
                <th className="p-3 text-center w-28">{isAr ? 'القطاع المستهدف' : 'TARGETED SECTOR'}</th>
                <th className="p-3">{isAr ? 'حجم الأضرار في دول الخليج (GCC)' : 'GCC DAMAGE FOOTPRINT'}</th>
                <th className="p-3 border-r border-zinc-900">{isAr ? 'حجم الأضرار في إيران' : 'IRAN DAMAGE FOOTPRINT'}</th>
                <th className="p-3 border-r border-zinc-900">{isAr ? 'الأثر المشترك على الاقتصاد العالمي والإقليمي' : 'SYSTEMIC GLOBAL & REGIONAL IMPACT'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-300 font-sans">
              
              <tr className="hover:bg-zinc-900/40 transition-colors">
                <td className="p-3 text-center font-mono font-black text-red-500 bg-zinc-900/20">
                  <Flame size={14} className="inline-block mb-1 text-red-500 mr-1" />
                  <div>{isAr ? 'الطاقة والغاز' : 'ENERGY & GAS'}</div>
                </td>
                <td className="p-3 leading-relaxed">
                  {isAr 
                    ? 'توقف مؤقت لإنتاج الغاز في مجمع رأس لفان بدولة قطر، وأضرار هيكلية جزئية في مجمع أرامكو برأس تنورة، تم عزلها ومعالجتها فورياً عبر أنظمة الإمداد البديلة.'
                    : 'Temporary LNG production suspension at Qatar’s Ras Laffan; structural damages to Saudi Aramco’s Ras Tanura complex, swiftly isolated via redundant loops.'}
                </td>
                <td className="p-3 border-r border-zinc-900 leading-relaxed">
                  {isAr 
                    ? 'تدمير مدمر وواسع النطاق في مجمع عسلوية الاستراتيجي للغاز ومصافي الجزر (خارك وقشم)، وشلل شبه كامل لشبكات التوزيع ومحطات توزيع الوقود المحلية.'
                    : 'Catastrophic, deep physical destruction of Assaluyeh Gas Complex processing units and Kharg/Qeshm terminals. Near-total collapse of local fuel network.'}
                </td>
                <td className="p-3 border-r border-zinc-900 leading-relaxed font-medium text-amber-500">
                  {isAr 
                    ? 'قفزات حادة وتاريخية بأسعار الغاز والنفط عالمياً؛ واضطرار دول مستهلكة كبرى كالهند واليابان لتعديل سلاسل إمدادها البحرية بالكامل.'
                    : 'Unprecedented spikes in European and Asian gas benchmarks. Global buyers like India and Japan forced to redraw supply logistics chains.'}
                </td>
              </tr>

              <tr className="hover:bg-zinc-900/40 transition-colors">
                <td className="p-3 text-center font-mono font-black text-amber-500 bg-zinc-900/20">
                  <Plane size={14} className="inline-block mb-1 text-amber-500 mr-1" />
                  <div>{isAr ? 'الطيران والتجارة' : 'AVIATION'}</div>
                </td>
                <td className="p-3 leading-relaxed">
                  {isAr 
                    ? 'تراجع نسبي في حركة الطيران الدولي بمطاري دبي وأبوظبي، وإلغاء آلاف الرحلات وتأثر مؤقت لقطاع السياحة نتيجة تفعيل جبهة سيبرانية لتعطيل الملاحة.'
                    : 'Partial drops in international transit volume at Dubai, Abu Dhabi, and Manama hubs. Thousands of flights cancelled or rerouted over safety alerts.'}
                </td>
                <td className="p-3 border-r border-zinc-900 leading-relaxed">
                  {isAr 
                    ? 'شلل شبه تام في حركة الملاحة الجوية والمدنية الإيرانية، وتدمير أنظمة الرادار والمراقبة العسكرية الجوية الحيوية في القواعد الرئيسية.'
                    : 'Complete paralysis of Iranian civil aviation and commercial airspace. Destruction of primary military surveillance radars.'}
                </td>
                <td className="p-3 border-r border-zinc-900 leading-relaxed font-medium text-amber-500">
                  {isAr 
                    ? 'تصنيف الخليج والشرق الأوسط كـ "منطقة عمليات خطرة" من قبل شركات التأمين العالمية الكبرى، وتضاعف كلفة بوالص التأمين على الرحلات.'
                    : 'Global insurers classify the Gulf and Middle East air corridors as active "war risk zones," doubling aviation insurance premiums.'}
                </td>
              </tr>

              <tr className="hover:bg-zinc-900/40 transition-colors">
                <td className="p-3 text-center font-mono font-black text-blue-500 bg-zinc-900/20">
                  <Compass size={14} className="inline-block mb-1 text-blue-500 mr-1" />
                  <div>{isAr ? 'الشحن البحري' : 'MARITIME'}</div>
                </td>
                <td className="p-3 leading-relaxed">
                  {isAr 
                    ? 'شلل ملاحي تجاري خانق بمضيق هرمز، واعتماد مكثف على خطوط الأنابيب البرية البديلة (مثل خط شرق-غرب السعودي وممر السكك الحديدية).'
                    : 'Stifling trade friction in the Hormuz passage. Forced scaling of backup overland paths (Saudi East-West Pipeline & overland transit rail corridors).'}
                </td>
                <td className="p-3 border-r border-zinc-900 leading-relaxed">
                  {isAr 
                    ? 'فقدان تام للسيطرة الجمركية والقانونية على المياه الدولية، وتدمير عشرات الزوارق الهجومية السريعة والمنصات البحرية الاستطلاعية التابعة للحرس الثوري.'
                    : 'Total loss of naval jurisdiction. Attrition of IRGC fast-attack missile vessels and floating telemetry platforms in the Gulf.'}
                </td>
                <td className="p-3 border-r border-zinc-900 leading-relaxed font-medium text-amber-500">
                  {isAr 
                    ? 'انخفاض حركة الشحن في البحر الأحمر بنسبة تتجاوز 15% إضافية، وتضاعف أجور شحن الحاويات عالمياً وارتفاع كلفة التأمين البحري الحربي.'
                    : 'An extra 15% plunge in Red Sea container throughput. Container shipping costs double globally with skyrocketing maritime hull insurance.'}
                </td>
              </tr>

              <tr className="hover:bg-zinc-900/40 transition-colors">
                <td className="p-3 text-center font-mono font-black text-emerald-500 bg-zinc-900/20">
                  <Wifi size={14} className="inline-block mb-1 text-emerald-500 mr-1" />
                  <div>{isAr ? 'الفضاء الرقمي' : 'CYBER SPACE'}</div>
                </td>
                <td className="p-3 leading-relaxed">
                  {isAr 
                    ? 'موجات هجمات حجب الخدمة (DDoS) المنسقة ومحاولات اختراق البنوك والمطارات والوزارات، تمت تصفيتها وصد أغلبها عبر أنظمة الذكاء الاصطناعي الدفاعية.'
                    : 'Coordinated DDoS barrages targeting municipal banking, portals, and ministries. 95%+ successfully mitigated via real-time defense AI blocks.'}
                </td>
                <td className="p-3 border-r border-zinc-900 leading-relaxed">
                  {isAr 
                    ? 'انهيار شامل لشبكة الإنترنت والاتصالات بنسبة 96% عقب الضربات السيبرانية المشتركة المتزامنة مع شلل كامل للتحويلات المصرفية المركزية.'
                    : 'Complete collapse of the national internet backbone (96% drop) after devastating joint cyber attacks, paralyzing state-owned banking channels.'}
                </td>
                <td className="p-3 border-r border-zinc-900 leading-relaxed font-medium text-amber-500">
                  {isAr 
                    ? 'تحول منطقة الشرق الأوسط رسمياً إلى الساحة الأكبر لحروب الفضاء السيبراني الهجين بمشاركة قوى عظمى ومجموعات اختراق دولية.'
                    : 'The Middle East consolidates as the premier theatre for hybrid state-on-state cyber warfare, involving global powers and hacktivist cells.'}
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      )}

      {/* TAB CONTENT: ANALYSIS */}
      {activeTab === 'analysis' && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-950 p-5 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs">
              <Shield size={14} />
              <span>{isAr ? 'دول مجلس التعاون: المرونة الهيكلية والردع الاستباقي' : 'GCC: STRUCTURAL RESILIENCE & PREVENTIVE DETERRENCE'}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {isAr 
                ? 'على الرغم من الحجم الهائل للتهديدات العسكرية والسيبرانية الموجهة نحو عواصم الاقتصاد الخليجي، إلا أن الاستثمارات الضخمة في الدفاع السيبراني الاستباقي (Active Cyber Defense AI) وأنظمة الدفاع الجوي المتقدمة ساهمت في امتصاص الصدمات الأولى بكفاءة عالية. بالإضافة إلى ذلك، فإن الممرات اللوجستية البديلة (كشبكات الأنابيب البرية الفجيرة وحبشان، وسكك الحديد السعودية) منعت حدوث شلل كلي في الصادرات البترولية.'
                : 'Despite the immense volume of military and cyber threats leveled against Gulf financial hubs, massive capital investments in proactive cyber defense (AI-driven perimeter filtering) and integrated air defense architectures successfully absorbed the primary shockwaves. Furthermore, the strategic acceleration of bypass pipelines and overland transit lanes averted a complete freeze of petroleum exports.'}
            </p>
          </div>

          <div className="bg-zinc-950 p-5 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-red-500 font-bold text-xs">
              <AlertTriangle size={14} />
              <span>{isAr ? 'إيران: فخ العزلة الرقمية والانهيار اللوجستي' : 'IRAN: THE DIGITAL ISOLATION & LOGISTICAL COLLAPSE'}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {isAr 
                ? 'أثبتت الضربات العسكرية والسيبرانية المتزامنة على إيران (مثل عملية Epic Fury وعسلوية) هشاشة الشبكات الرقمية وحيوية الاتصالات كعصب للحكم والسيطرة. فقد تسبب انقطاع الإنترنت بنسبة 96% وتدمير مجمعات الغاز في عزل مالي وجغرافي فوري للنظام الإيراني. هذا الشلل دفع النظام لتبني سلوكيات انتحارية بمحاولة إغلاق مضيق هرمز وباب المندب لابتزاز المجتمع الدولي ورفع أسعار النفط كحل أخير.'
                : 'Simultaneous kinetic and digital strikes targeting Iran exposed the fragility of centralized, state-controlled digital systems. Paralyzing the national web backbone by 96% and degrading the Assaluyeh Gas Complex immediately quarantined the regime economically and administratively. This systemic shutdown triggered suicidal retaliation vectors, using chokepoint blockades in Hormuz and Bab al-Mandab as extreme geopolitical leverage.'}
            </p>
          </div>
        </div>
      )}

    </div>
  );

  function filteredNewswiresTargetList() {
    return filteredTargets.map((item) => {
      const isSelected = item.id === selectedTargetId;
      return (
        <div
          key={item.id}
          onClick={() => setSelectedTargetId(item.id)}
          className={`p-3 border transition-all cursor-pointer relative group flex flex-col justify-between gap-1.5 ${
            isSelected 
              ? 'bg-zinc-900 border-red-600 shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]' 
              : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex justify-between items-start gap-1">
            <span className="text-[10px] text-zinc-500 font-bold block truncate">
              {isAr ? item.sectorAr : item.sectorEn}
            </span>
            <span className={`text-[8px] font-mono px-1 py-0.5 uppercase tracking-tight shrink-0 ${item.statusColor}`}>
              {isAr ? item.statusAr : item.statusEn}
            </span>
          </div>

          <h5 className="text-xs font-sans font-extrabold text-zinc-100 group-hover:text-red-500 transition-colors">
            {isAr ? item.nameAr : item.nameEn}
          </h5>

          <div className="flex justify-between items-center text-[9px] font-mono pt-1 text-zinc-500">
            <span>COORDS: <strong className="text-red-500">{item.coordinates}</strong></span>
            <span className="text-amber-500 font-extrabold">{item.source}</span>
          </div>
        </div>
      );
    });
  }
};
