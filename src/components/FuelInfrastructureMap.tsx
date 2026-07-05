import React, { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  Anchor, 
  Layers, 
  Compass, 
  ArrowRightLeft, 
  Activity, 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  FileText, 
  Zap 
} from 'lucide-react';

interface FuelInfrastructureMapProps {
  language: 'ar' | 'en';
}

interface MapNode {
  id: string;
  nameAr: string;
  nameEn: string;
  typeAr: string;
  typeEn: string;
  lat: string;
  lon: string;
  x: number; // SVG X coordinate
  y: number; // SVG Y coordinate
  roleAr: string;
  roleEn: string;
  operatorAr: string;
  operatorEn: string;
  capacityAr: string;
  capacityEn: string;
  hawkRelationAr: string;
  hawkRelationEn: string;
  riskAr: string;
  riskEn: string;
  isGlobal?: boolean;
}

export const FuelInfrastructureMap: React.FC<FuelInfrastructureMapProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [mapMode, setMapMode] = useState<'global' | 'local'>('local');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('dora');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Global Route Nodes
  const globalNodes: MapNode[] = [
    {
      id: 'russia',
      nameAr: 'مصب نوفوروسيسك (روسيا - البحر الأسود)',
      nameEn: 'Novorossiysk Terminal (Russia - Black Sea)',
      typeAr: 'ميناء التصدير المعاقب والمنشأ الفعلي',
      typeEn: 'Sanctioned Load Port (Actual Origin)',
      lat: "44.7244° N",
      lon: "37.7675° E",
      x: 150,
      y: 80,
      roleAr: 'نقطة انطلاق شحنات الفيول أويل الروسي الرخيص والمخالف لسقف الأسعار الدولي.',
      roleEn: 'Initial loading point for heavily discounted Russian fuel oil, priced below the G7/EU price cap.',
      operatorAr: 'شركات حكومية روسية بالتنسيق مع تجار دوليين غامضين',
      operatorEn: 'Russian State entities in coordination with offshore commodity brokers',
      capacityAr: 'ملايين البراميل شهرياً',
      capacityEn: 'Millions of barrels monthly',
      hawkRelationAr: 'شحنت سفينة Hawk III حوالي ٣٦,٠٠٠ طن من هذا الميناء مباشرة في صيف ٢٠٢٥.',
      hawkRelationEn: 'The vessel Hawk III loaded 36,000 MT of fuel oil here in late summer 2025.',
      riskAr: 'عالي جداً - انتهاك صريح للعقوبات الدولية ومخاطر حظر السفن.',
      riskEn: 'High - Direct breach of G7 price cap, exposing the cargo to seizure risks.',
      isGlobal: true
    },
    {
      id: 'greece',
      nameAr: 'خليج لاكونيا (اليونان - مياه دولية)',
      nameEn: 'Laconian Gulf STS Zone (Greece - Offshore)',
      typeAr: 'منطقة نقل شحنات من سفينة إلى أخرى (STS)',
      typeEn: 'Ship-to-Ship (STS) Transfer Hub',
      lat: "36.5161° N",
      lon: "22.5851° E",
      x: 350,
      y: 180,
      roleAr: 'نقل وتفريغ الحمولات في المياه المفتوحة لإخفاء هوية سفن الشحن الروسية وخلط المواد.',
      roleEn: 'Offshore operations zone used to transfer oil between tankers to mask Russian maritime origin.',
      operatorAr: 'أسطول الظل وتجار وشركات وهمية ومستقلة',
      operatorEn: 'Shadow fleet tankers and intermediary broker networks',
      capacityAr: 'محطة نقل بحري مفتوح',
      capacityEn: 'Maritime transit zone',
      hawkRelationAr: 'استخدم كحلقة وصل لتفريغ ودمج الشحنات قبل التوجه نحو المصبات التركية أو اللبنانية.',
      hawkRelationEn: 'Frequent STS waypoint used by facilitators to obscure origin trail before re-routing cargoes.',
      riskAr: 'مرتفع - تسرب نفطي ملاحي وتلاعب بأجهزة التتبع AIS.',
      riskEn: 'Medium-High - Intentional transponder blackouts (AIS spoofing) and pollution hazards.',
      isGlobal: true
    },
    {
      id: 'turkey',
      nameAr: 'مرفأ ميرسين / جيهان (تركيا)',
      nameEn: 'Mersin / Ceyhan Hub (Turkey)',
      typeAr: 'ميناء الترانزيت وتزوير شهادات المنشأ',
      typeEn: 'Transit & Certificate Spoofing Hub',
      lat: "36.8016° N",
      lon: "34.6331° E",
      x: 550,
      y: 160,
      roleAr: 'إصدار أوراق مزورة تدعي أن المنشأ تركي أو مصري بدلاً من الروسي للالتفاف على الرقابة.',
      roleEn: 'Location where shipping bills are re-issued under Turkish papers to bypass customs audits.',
      operatorAr: 'وكلاء بحريون بالتواطؤ مع شركات استيراد لبنانية وأجنبية',
      operatorEn: 'Complicit shipping agents and offshore shelf corporations',
      capacityAr: 'مجمع لوجستي وتخزيني ضخم',
      capacityEn: 'Major regional logistic terminal',
      hawkRelationAr: 'أصدر الوسطاء شهادات منشأ تركية مزورة لهذه الشحنة لتحصيل فارق مالي بقيمة ٧ ملايين دولار.',
      hawkRelationEn: 'Falsified papers issued here claimed the Hawk III fuel was Turkish, earning traders a $7M premium.',
      riskAr: 'تزوير جنائي وملاحقات قضائية دولية ومحكمة مالية.',
      riskEn: 'High - Active forgery node resulting in financial prosecution and asset freezes.',
      isGlobal: true
    },
    {
      id: 'lebanon_dest',
      nameAr: 'المنشآت اللبنانية الساحلية',
      nameEn: 'Lebanese Coastal Terminals',
      typeAr: 'الوجهة النهائية للتسليم والفرز',
      typeEn: 'Final Discharge & Storage Network',
      lat: "33.8938° N",
      lon: "35.5018° E",
      x: 700,
      y: 240,
      roleAr: 'تفريغ الوقود في خزانات الدولة أو القطاع الخاص وتوزيعه بالأسعار الاحتكارية المضخمة.',
      roleEn: 'Offloading point for fuel into state power plants or private cartel reservoirs.',
      operatorAr: 'كارتل الشركات المستوردة (APIC) ومؤسسة كهرباء لبنان (EDL)',
      operatorEn: 'The APIC Importing Cartel & Electricité du Liban (EDL)',
      capacityAr: '٢٠ لتراً لكل صفيحة بنزين / مازوت معبأ',
      capacityEn: 'Total domestic storage capacity across coastline',
      hawkRelationAr: 'تم تفريغ شحنات الوقود المغشوش في محطات كهرباء لبنان بأسعار خيالية بلغت ١٨ مليون دولار.',
      hawkRelationEn: 'Delivered directly to EDL stations, causing severe financial drain of $18M on treasury funds.',
      riskAr: 'سرقة أموال عامة، فساد إداري، وتلف منشآت التوليد بسبب رداءة الفيول.',
      riskEn: 'Extreme - Corrosive fuel damage to state generators and loss of public capital.',
      isGlobal: true
    }
  ];

  // Local Lebanese Coastal Nodes
  const localNodes: MapNode[] = [
    {
      id: 'tripoli',
      nameAr: 'منشآت النفط في طرابلس (مرفأ الشمال)',
      nameEn: 'Tripoli Oil Installations (North Port)',
      typeAr: 'منشآت نفط حكومية وخزانات استراتيجية',
      typeEn: 'State-Owned Oil Terminal & Strategic Storage',
      lat: "34.4561° N",
      lon: "35.8214° E",
      x: 450,
      y: 80,
      roleAr: 'بوابة الوقود الشمالية، تحوي خزانات ضخمة موصولة بأنبوب النفط العراقي القديم وتغذي شبكات الشمال وجزء من التهريب التاريخي.',
      roleEn: 'Northern gasoline gate, holding vast storage tanks connected to historical pipelines supplying North Lebanon.',
      operatorAr: 'وزارة الطاقة والمياه (المديرية العامة للنفط)',
      operatorEn: 'Ministry of Energy and Water (Directorate of Oil)',
      capacityAr: 'سعة استيعابية تفوق ٣٠٠,٠٠٠ متر مكعب',
      capacityEn: 'Over 300,000 m³ nominal capacity',
      hawkRelationAr: 'استخدمت المنشآت تاريخياً لخلط وتمرير صفقات الوقود المغطاة بقرارات استثنائية من الوزارة.',
      hawkRelationEn: 'Historically utilized to mix and buffer state imports under ministerial exceptional decrees.',
      riskAr: 'غياب الصيانة، تهالك البنية التحتية، وضعف الرقابة على كميات التسليم الفعلي.',
      riskEn: 'Infrastructure decay and lack of digital metering on delivery lines.',
      isGlobal: false
    },
    {
      id: 'amchit',
      nameAr: 'مصب عمشيت البحري (IPT)',
      nameEn: 'Amchit Fuel Terminal (IPT)',
      typeAr: 'مصب بحري وخزانات للقطاع الخاص (كارتل APIC)',
      typeEn: 'Private Sea Terminal & Corporate Depot',
      lat: "34.1482° N",
      lon: "35.6321° E",
      x: 430,
      y: 150,
      roleAr: 'المصب ومركز التوزيع الرئيسي لشركة IPT (عائلة عيسى)، يؤمن المحروقات لكسروان وجبيل وجبل لبنان الشمالي عبر خطوط نقل ساحلية.',
      roleEn: 'Primary marine discharge point and logistics node for IPT (Issa Family), feeding Mount Lebanon and Jbeil.',
      operatorAr: 'شركة IPT للنفط (عضو بارز في تجمع APIC)',
      operatorEn: 'IPT Powertech Group (Core APIC Member)',
      capacityAr: 'خزانات متطورة وخط تفريغ بحري بطول ١.٥ كم',
      capacityEn: 'Modern sea-line discharge extending 1.5km offshore',
      hawkRelationAr: 'جزء من تجمع APIC الذي يحصل على هوامش ربح مضمونة ومدولرة معزولة عن تقلبات الضرائب والعملة المحلية.',
      hawkRelationEn: 'Operates as part of the APIC guild securing fixed fresh-dollarized margins immune to domestic taxes.',
      riskAr: 'احتكار جغرافي وتثبيت سعر بالتواطؤ مع جدول الوزارة.',
      riskEn: 'Geographic monopoly pricing sheltered by Ministry fixed tariffs.',
      isGlobal: false
    },
    {
      id: 'dora',
      nameAr: 'مجمع خزانات ومصبات الدورة (ساحل المتن)',
      nameEn: 'Dora Marine Terminals (Metn Coast)',
      typeAr: 'المركز الرئيسي لكارتل استيراد النفط والمازوت',
      typeEn: 'Epicenter of private importing cartel (APIC)',
      lat: "33.9044° N",
      lon: "35.5472° E",
      x: 410,
      y: 220,
      roleAr: 'العصب الحيوي للنفط الخاص في لبنان. يضم مستودعات Liquigas/Coral (عائلة يمين) وميدكو (عائلة شماس). يغذي بيروت الكبرى وجبل لبنان بأكثر من ٦٠٪ من احتياجاتهم.',
      roleEn: 'The absolute beating heart of Lebanons fuel supply. Houses Coral/Liquigas (Yamin family) and Medco (Shammas family) reserves.',
      operatorAr: 'Coral, Liquigas, Medco, Wardieh (ائتلاف APIC الاحتكاري)',
      operatorEn: 'Coral Oil, Liquigas, Medco (De facto APIC oligarchy)',
      capacityAr: 'أكبر سعة تخزينية للقطاع الخاص تتعدى ٤٥٠,٠٠٠ طن متري',
      capacityEn: 'Over 450,000 MT capacity (largest private cluster)',
      hawkRelationAr: 'تتحكم الشركات المشغلة هنا في كميات المعروض النفطي في السوق وتملي فترات التقنين لرفع الأسعار بجدول وزارة الطاقة.',
      hawkRelationEn: 'APIC members here dictate market supply flow and pressure the Ministry during gridlocks to shield margins.',
      riskAr: 'مخاطر أمنية قصوى (قربها من التجمعات السكنية) وغياب تام للمنافسة السعرية.',
      riskEn: 'Extreme safety hazards near dense residential zones and total lock on retail price war.',
      isGlobal: false
    },
    {
      id: 'beirut_port',
      nameAr: 'رصيف المحروقات في مرفأ بيروت',
      nameEn: 'Beirut Port Fuel Quay',
      typeAr: 'محطة التفريغ والتدقيق الجمركي الوطني',
      typeEn: 'National Customs & Import Discharging Hub',
      lat: "33.9022° N",
      lon: "35.5184° E",
      x: 390,
      y: 250,
      roleAr: 'المحطة المركزية لمعاملات الجمارك الرسمية، وسحب العينات المخبرية لفحص الجودة النفطية ومطابقة المواصفات.',
      roleEn: 'Central hub for state customs, laboratory quality testing, and public cargo validation.',
      operatorAr: 'إدارة مرفأ بيروت / وزارة المالية والجمارك',
      operatorEn: 'Port of Beirut Authority / Customs & Ministry of Finance',
      capacityAr: 'رصيف متخصص لاستقبال ناقلات النفط الكبيرة',
      capacityEn: 'Dedicated deep-water fuel tanker quays',
      hawkRelationAr: 'عقدة الضعف الرقابي؛ حيث تم تزوير أوراق سفينة Hawk III هنا وادعاء جودة الوقود لمؤسسة الكهرباء دون فحص صارم.',
      hawkRelationEn: 'Vulnerability node: Falsified Hawk III documents passed customs checks here without robust lab verification.',
      riskAr: 'الفساد الجمركي، الرشاوى، والمماطلة في إصدار الفحوصات لفرض غرامات تأخير لصالح كارتل الشحن.',
      riskEn: 'Customs corruption, bribe loops, and delays in lab testing generating synthetic demurrage fees.',
      isGlobal: false
    },
    {
      id: 'jiyeh',
      nameAr: 'مصب منشآت الجية ومحطة الكهرباء',
      nameEn: 'Jiyeh Power Terminal & Depot',
      typeAr: 'محطة كهرباء حكومية ومخازن وقود طاقة',
      typeEn: 'State Thermal Power Station & Supply Terminal',
      lat: "33.6621° N",
      lon: "35.4184° E",
      x: 370,
      y: 330,
      roleAr: 'محطة توليد الكهرباء الحرارية التابعة للدولة (EDL)؛ ومخزن رئيسي لاستقبال الفيول المخصص لشبكة الطاقة الوطنية.',
      roleEn: 'Deplorable state thermal station (EDL) and direct pipeline terminal for heavy fuel oil.',
      operatorAr: 'مؤسسة كهرباء لبنان (EDL)',
      operatorEn: 'Electricité du Liban (EDL)',
      capacityAr: 'مخازن متهالكة ومولدات قديمة خاضعة لتقنين دائم',
      capacityEn: 'Legacy storage and heavily depleted turbine grids',
      hawkRelationAr: 'الفيول أويل المغشوش والروسي الخاضع للعقوبات كان يستهدف تسليمه هنا في الجية لغايات التشغيل الاحتيالي.',
      hawkRelationEn: 'Sanctioned low-grade Russian fuel from Hawk III was earmarked for combustion in these outdated turbines.',
      riskAr: 'تلوث بيئي قاتل للمنطقة الساحلية وأعطال كارثية للمعدات بسبب الفيول المغشوش.',
      riskEn: 'Severe ecological sulfur pollution and turbine damage caused by off-spec fuel deliveries.',
      isGlobal: false
    },
    {
      id: 'zahrani',
      nameAr: 'منشآت النفط والكهرباء بالزهراني (الجنوب)',
      nameEn: 'Zahrani Oil Installations (South)',
      typeAr: 'منشآت نفط حكومية ومصب النفط التاريخي (تابلاين)',
      typeEn: 'State Oil Facilities & Southern Power Plant',
      lat: "33.5114° N",
      lon: "35.3414° E",
      x: 350,
      y: 420,
      roleAr: 'المنشأة النفطية الأكبر في الجنوب، تحوي محطة الزهراني للكهرباء وخزانات الدولة ومجمع التوزيع الإقليمي للمازوت الجنوبي.',
      roleEn: 'Largest southern petroleum infrastructure, managing state fuel depots and Zahrani gas turbine station.',
      operatorAr: 'وزارة الطاقة والمياه ومؤسسة كهرباء لبنان',
      operatorEn: 'Directorate of Oil / Electricité du Liban (EDL)',
      capacityAr: 'سعة تخزينية كبرى تقارب ٤٠٠,٠٠٠ متر مكعب',
      capacityEn: 'Vast strategic storage capacity approaching 400,000 m³',
      hawkRelationAr: 'أحد المواقع التي تلقت شحنات وقود بأسعار منفوخة، وتخضع لتسويات سياسية لتخصيص الحصص وتغذية السوق الموازية.',
      hawkRelationEn: 'Primary receiving target for state-brokered fuel contracts riddled with political clientelism.',
      riskAr: 'السرقة المنظمة للمحروقات، المحسوبية في توزيع المازوت للمولدات، والحرائق المتكررة.',
      riskEn: 'Siphoning leaks, clientelist distribution of diesel to private cartels, and legacy fire hazards.',
      isGlobal: false
    }
  ];

  const activeNodes = mapMode === 'global' ? globalNodes : localNodes;
  const selectedNode = activeNodes.find(n => n.id === selectedNodeId) || activeNodes[0];

  return (
    <div className="bg-zinc-950 text-white p-4 md:p-6 border border-zinc-800 rounded-md shadow-lg font-mono">
      
      {/* Map Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-4 mb-4 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-[10px] font-black tracking-widest text-[#d97706] uppercase">
              {isAr ? 'نظام الرصد والملاحة الاستقصائي' : 'INVESTIGATIVE ENERGY TRACKING SYSTEM'}
            </span>
          </div>
          <h4 className="text-sm font-sans font-black text-zinc-100 uppercase tracking-tight">
            {isAr ? '❖ خارطة إمداد كارتل المحروقات ومسارات الالتفاف (٢٠٢٥-٢٠٢٦)' : '❖ Petroleum Cartel Supply Chain & Evasion Map'}
          </h4>
        </div>

        {/* View Toggles */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 p-0.5 rounded text-xs">
          <button
            onClick={() => {
              setMapMode('local');
              setSelectedNodeId('dora');
            }}
            className={`px-3 py-1.5 transition-colors cursor-pointer font-bold ${
              mapMode === 'local' 
                ? 'bg-[#d97706] text-zinc-950 font-black' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'المنشآت الساحلية للبنان' : 'Lebanon Coast'}
          </button>
          <button
            onClick={() => {
              setMapMode('global');
              setSelectedNodeId('russia');
            }}
            className={`px-3 py-1.5 transition-colors cursor-pointer font-bold ${
              mapMode === 'global' 
                ? 'bg-[#d97706] text-zinc-950 font-black' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'مسارات الملاحة الدولية' : 'Global Evasion Routes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Map Canvas Visualizer Column */}
        <div className="lg:col-span-7 flex flex-col justify-between border border-zinc-800 bg-zinc-900/60 p-3 rounded relative min-h-[380px] overflow-hidden">
          
          {/* Legend Overlay */}
          <div className="absolute top-3 right-3 z-10 bg-zinc-950/95 border border-zinc-800 p-2 text-[9px] text-zinc-400 rounded space-y-1">
            <span className="font-black text-white block mb-1 border-b border-zinc-800 pb-1">
              {isAr ? 'دليل الخارطة:' : 'MAP LEGEND:'}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block animate-pulse"></span>
              <span>{isAr ? 'منشأة دولة / فحص جمركي' : 'State Facilities / Customs'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span>{isAr ? 'مصبات ومستودعات كارتل APIC' : 'APIC Private Terminals'}</span>
            </div>
            {mapMode === 'global' && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 border-t border-dashed border-[#d97706] inline-block"></span>
                <span>{isAr ? 'مسار سفينة Hawk III المغشوش' : 'Hawk III Shipping Path'}</span>
              </div>
            )}
          </div>

          {/* Map View Indicator */}
          <div className="absolute bottom-3 left-3 z-10 bg-zinc-950/80 border border-zinc-800 px-2 py-1 text-[9px] text-zinc-500 rounded flex items-center gap-1.5">
            <Compass size={12} className="text-zinc-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span>{mapMode === 'global' ? 'GRID: MEDITERRANEAN REGION' : 'GRID: LEBANON COASTAL ZONE'}</span>
          </div>

          {/* SVG Canvas drawing */}
          <div className="w-full h-full min-h-[300px] flex items-center justify-center relative select-none">
            
            {mapMode === 'global' ? (
              /* GLOBAL VIEW: Russia to Greece/Turkey to Lebanon */
              <svg viewBox="0 0 800 320" className="w-full h-full max-h-[320px]">
                {/* Background Grid Lines */}
                <defs>
                  <pattern id="grid-global" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-global)" />

                {/* Stylized Landmass Schematics */}
                {/* Russia / Black Sea Area */}
                <path d="M 50 10 L 250 10 L 300 60 L 220 120 L 100 80 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1" opacity="0.6" />
                {/* Turkey Area */}
                <path d="M 400 80 L 620 80 L 640 150 L 520 180 L 410 130 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1" opacity="0.6" />
                {/* Greece Area */}
                <path d="M 280 130 L 370 130 L 360 210 L 310 220 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1" opacity="0.6" />
                {/* Cyprus */}
                <path d="M 580 200 L 610 200 L 600 215 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1" opacity="0.8" />
                {/* Levant / Lebanon Coast */}
                <path d="M 680 180 L 780 180 L 780 310 L 690 310 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1" opacity="0.6" />

                {/* Sea Shipping Lanes - Hawk III Evasion Routes */}
                {/* Russia to Greece */}
                <path d="M 150 80 Q 250 120 350 180" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                {/* Greece to Turkey */}
                <path d="M 350 180 Q 450 170 550 160" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="5,5" />
                {/* Turkey to Lebanon */}
                <path d="M 550 160 Q 620 200 700 240" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5,5" />

                {/* Intersecting secondary route lines */}
                <path d="M 450 310 Q 580 280 700 240" fill="none" stroke="#27272a" strokeWidth="1.5" strokeDasharray="2,2" />

                {/* Interactive Nodes */}
                {globalNodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isHovered = hoveredNodeId === node.id;
                  const markerColor = node.id === 'russia' || node.id === 'lebanon_dest' ? 'fill-red-600' : 'fill-amber-500';
                  
                  return (
                    <g 
                      key={node.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedNodeId(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                    >
                      {/* Pulse Circle for active/hovered */}
                      {(isSelected || isHovered) && (
                        <circle cx={node.x} cy={node.y} r="14" className="fill-none stroke-red-500 stroke-1 animate-ping" style={{ animationDuration: '2s' }} />
                      )}
                      
                      {/* Node circle */}
                      <circle cx={node.x} cy={node.y} r={isSelected ? "8" : "6"} className={`${markerColor} stroke-white stroke-2 transition-all duration-150`} />
                      
                      {/* Text label */}
                      <text 
                        x={node.x} 
                        y={node.y - 12} 
                        className={`text-[9px] font-bold ${isSelected ? 'fill-[#d97706]' : 'fill-zinc-300'} font-sans`}
                        textAnchor="middle"
                      >
                        {isAr ? node.nameAr.split('(')[0] : node.nameEn.split('(')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              /* LOCAL LEBANON VIEW: Tripoli, Amchit, Dora, Beirut, Jiyeh, Zahrani */
              <svg viewBox="0 0 800 480" className="w-full h-full max-h-[440px]">
                {/* Background Grid Lines */}
                <defs>
                  <pattern id="grid-local" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-local)" />

                {/* Stylized Lebanon Coastline (Detailed) */}
                {/* Sea (Left) / Land (Right) */}
                <path d="M 300 0 C 350 100, 310 200, 290 300 C 270 400, 220 480, 200 480 L 800 480 L 800 0 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" opacity="0.6" />

                {/* Coastal shipping lane lines */}
                <path d="M 120 40 L 450 80" fill="none" stroke="#27272a" strokeWidth="1" strokeDasharray="3,3" />
                <path d="M 100 180 Q 250 200 410 220" fill="none" stroke="#27272a" strokeWidth="1" strokeDasharray="3,3" />
                <path d="M 90 350 Q 200 360 370 330" fill="none" stroke="#27272a" strokeWidth="1" strokeDasharray="3,3" />

                {/* Connector pipeline schematic (Tripoli to South) */}
                <path d="M 450 80 L 430 150 L 410 220 L 390 250 L 370 330 L 350 420" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.15" />

                {/* Interactive Nodes */}
                {localNodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isHovered = hoveredNodeId === node.id;
                  // State vs Private colors
                  const isState = ['tripoli', 'beirut_port', 'jiyeh', 'zahrani'].includes(node.id);
                  const markerColor = isState ? 'fill-red-600' : 'fill-amber-500';

                  return (
                    <g 
                      key={node.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedNodeId(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                    >
                      {/* Pulse Circle for active/hovered */}
                      {(isSelected || isHovered) && (
                        <circle cx={node.x} cy={node.y} r="16" className="fill-none stroke-[#d97706] stroke-1 animate-ping" style={{ animationDuration: '2s' }} />
                      )}
                      
                      {/* Node circle */}
                      <circle cx={node.x} cy={node.y} r={isSelected ? "9" : "7"} className={`${markerColor} stroke-white stroke-2 transition-all duration-150`} />
                      
                      {/* Coordinates reference line */}
                      {isSelected && (
                        <line x1={node.x} y1={node.y} x2={node.x + 40} y2={node.y} stroke="#d97706" strokeWidth="1" strokeDasharray="2,2" />
                      )}

                      {/* Text label */}
                      <text 
                        x={node.x + 14} 
                        y={node.y + 4} 
                        className={`text-[10px] font-bold ${isSelected ? 'fill-[#d97706] font-black' : 'fill-zinc-300'} font-sans text-right`}
                        textAnchor="start"
                      >
                        {isAr ? node.nameAr.split('(')[0] : node.nameEn.split('(')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            )}

          </div>

          {/* Quick Stats bar */}
          <div className="border-t border-zinc-800 pt-2.5 mt-2 flex flex-wrap justify-between items-center text-[9px] text-zinc-500 gap-2">
            <span>{isAr ? 'اضغط على النقاط لعرض بنود الاستهداف والأوليغارشية النفطية' : 'Click nodes to query specific control entities & cartel linkages'}</span>
            <span className="font-mono text-zinc-400">LATENCY: LIVE // REF-SEC: MoEW-2026</span>
          </div>

        </div>

        {/* Node Detailed Information Column */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 p-4 flex flex-col justify-between rounded">
          
          <div className="space-y-4">
            
            {/* Header of details card */}
            <div className="border-b border-zinc-800 pb-3">
              <div className="flex items-center justify-between">
                <span className="bg-zinc-800 text-zinc-400 text-[8px] font-bold px-1.5 py-0.5 rounded">
                  {selectedNode.isGlobal ? 'GLOBAL ROUTE NODE' : 'LEBANESE SHORE NODE'}
                </span>
                <span className="font-mono text-[9px] text-zinc-500">
                  {selectedNode.lat} / {selectedNode.lon}
                </span>
              </div>
              
              <h5 className="font-sans font-black text-sm text-white mt-1.5">
                {isAr ? selectedNode.nameAr : selectedNode.nameEn}
              </h5>
              
              <p className="text-[10px] text-[#d97706] font-bold mt-0.5">
                {isAr ? selectedNode.typeAr : selectedNode.typeEn}
              </p>
            </div>

            {/* Structured specs */}
            <div className="space-y-3 text-xs">
              
              <div>
                <span className="text-[9px] text-zinc-500 block uppercase font-bold">
                  {isAr ? '❖ الدور والوظيفة الاقتصادية:' : '❖ CORE FUNCTION & ROLE:'}
                </span>
                <p className="text-zinc-200 mt-0.5 leading-relaxed text-xs">
                  {isAr ? selectedNode.roleAr : selectedNode.roleEn}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[9px] text-zinc-500 block uppercase font-bold">
                    {isAr ? 'الجهة المشغلة / النفوذ:' : 'OPERATOR / CONTROL:'}
                  </span>
                  <p className="text-zinc-300 font-sans text-xxs mt-0.5 font-bold">
                    {isAr ? selectedNode.operatorAr : selectedNode.operatorEn}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 block uppercase font-bold">
                    {isAr ? 'السعة الاستيعابية واللوجستية:' : 'STORAGE CAPACITY:'}
                  </span>
                  <p className="text-zinc-300 font-sans text-xxs mt-0.5">
                    {isAr ? selectedNode.capacityAr : selectedNode.capacityEn}
                  </p>
                </div>
              </div>

              <div className="border-t border-dashed border-zinc-800 pt-3">
                <span className="text-[9px] text-red-500 block uppercase font-black flex items-center gap-1">
                  <AlertTriangle size={12} />
                  {isAr ? 'العلاقة بصفقة وقود HAWK III والتربح:' : 'HAWK III SCANDAL & MARGIN LINKAGE:'}
                </span>
                <p className="text-zinc-300 mt-1 leading-relaxed text-xxs italic">
                  {isAr ? selectedNode.hawkRelationAr : selectedNode.hawkRelationEn}
                </p>
              </div>

              <div className="bg-zinc-950/80 p-2.5 border border-zinc-800 rounded">
                <span className="text-[8px] text-zinc-500 block uppercase font-bold">
                  {isAr ? 'مستويات المخاطر والثغرات الرقابية:' : 'MONITORING RISK ASSESSMENT:'}
                </span>
                <p className="text-amber-400/90 text-xxs mt-0.5 leading-relaxed font-sans">
                  {isAr ? selectedNode.riskAr : selectedNode.riskEn}
                </p>
              </div>

            </div>

          </div>

          {/* Bottom attribution */}
          <div className="border-t border-zinc-800 pt-3 mt-4 text-[9px] text-zinc-600 flex items-center justify-between">
            <span>{isAr ? 'أوليكارشية APIC ومحطات التعبئة الساحلية' : 'APIC Fuel Guild & Coastal Terminals'}</span>
            <span>AW-SYS-LEDGER-V2</span>
          </div>

        </div>

      </div>

    </div>
  );
};
