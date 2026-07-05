import React, { useState } from 'react';
import { Shield, AlertTriangle, Radio, Settings, Filter, RefreshCw, Compass, HelpCircle, Layers, Info } from 'lucide-react';

interface SubseaCablesMapOverlayProps {
  language: 'ar' | 'en';
}

interface CableSegment {
  id: string;
  nameAr: string;
  nameEn: string;
  path: string;
  fromNode: string;
  toNode: string;
  capacity: string;
  owners: string;
  baseRisk: number; // 0 to 100
  riskModifiers: {
    standard: number; // multiplier or direct score
    redSea: number;
    hormuz: number;
    pacific: number;
  };
  descAr: string;
  descEn: string;
}

interface NodePoint {
  id: string;
  nameAr: string;
  nameEn: string;
  x: number;
  y: number;
  strategicValAr: string;
  strategicValEn: string;
}

export const SubseaCablesMapOverlay: React.FC<SubseaCablesMapOverlayProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeScenario, setActiveScenario] = useState<'standard' | 'redSea' | 'hormuz' | 'pacific'>('standard');
  const [minRiskThreshold, setMinRiskThreshold] = useState<number>(0);
  const [selectedSegment, setSelectedSegment] = useState<CableSegment | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodePoint | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<CableSegment | null>(null);

  // Nodes on our tactical map projection
  const nodes: NodePoint[] = [
    {
      id: 'marseille',
      nameAr: 'مارسيليا (فرنسا)',
      nameEn: 'Marseille (France)',
      x: 90,
      y: 90,
      strategicValAr: 'بوابة أوروبا الغربية لكافة الاتصالات البحرية العابرة للقارات.',
      strategicValEn: 'Europe’s primary mainland portal for all Mediterranean subsea fiber routes.'
    },
    {
      id: 'suez',
      nameAr: 'قناة السويس (مصر)',
      nameEn: 'Suez Canal (Egypt)',
      x: 160,
      y: 130,
      strategicValAr: 'نقطة الاختناق الرقمية الأكثر حساسية عالمياً، تعبر عبرها معظم كابلات آسيا-أوروبا.',
      strategicValEn: 'The world’s most critical digital transit choke point; handles nearly 90% of Asia-Europe traffic.'
    },
    {
      id: 'jeddah',
      nameAr: 'جدة (السعودية)',
      nameEn: 'Jeddah (KSA)',
      x: 195,
      y: 190,
      strategicValAr: 'عقدة ترحيل بحرية رئيسية تربط البحر الأحمر بأنظمة دول مجلس التعاون الخليجي.',
      strategicValEn: 'Major Red Sea relay terminal connecting Mediterranean backbones to GCC regional networks.'
    },
    {
      id: 'bab-el-mandeb',
      nameAr: 'باب المندب / جيبوتي',
      nameEn: 'Bab-el-Mandeb / Djibouti',
      x: 215,
      y: 260,
      strategicValAr: 'منطقة صراع ملتهبة مستهدفة من الطائرات المسيرة والقرصنة البحرية.',
      strategicValEn: 'High-risk maritime corridor highly exposed to asymmetric drone threats and naval blockades.'
    },
    {
      id: 'muscat',
      nameAr: 'مسقط (سلطنة عمان)',
      nameEn: 'Muscat (Oman)',
      x: 320,
      y: 195,
      strategicValAr: 'منفذ استراتيجي محصن يستقطب ممرات بديلة تتفوق على بحر الصين والشرق الأوسط.',
      strategicValEn: 'Secure Indian Ocean sanctuary increasingly selected as the hub for major bypass routes.'
    },
    {
      id: 'hormuz',
      nameAr: 'مضيق هرمز (الخليج)',
      nameEn: 'Strait of Hormuz (Gulf)',
      x: 310,
      y: 155,
      strategicValAr: 'عقدة تخديم حيوية لأربعة كابلات خليجية عملاقة تحت ظل التهديدات الإيرانية المستمرة.',
      strategicValEn: 'Vital artery for regional Gulf commerce wiring UAE, Qatar, Bahrain, Kuwait under shadow threats.'
    },
    {
      id: 'diego-garcia',
      nameAr: 'دييغو غارسيا (قاعدة أمريكية)',
      nameEn: 'Diego Garcia (US Base)',
      x: 380,
      y: 420,
      strategicValAr: 'قاعدة عسكرية استراتيجية مجهزة برادارات مائية ومظلة حماية كابلات فائقة الأمان.',
      strategicValEn: 'Highly secured US-UK joint military outpost housing passive acoustic subsea monitoring systems.'
    },
    {
      id: 'singapore',
      nameAr: 'سنغافورة (مضيق ملقا)',
      nameEn: 'Singapore (Malacca)',
      x: 520,
      y: 330,
      strategicValAr: 'عقدة الربط لجنوب شرق آسيا، ممر مزدحم يتعرض لحوادث مرساة السفن المتكررة.',
      strategicValEn: 'Southeastern Asia digital axis suffering from severe vessel anchor cable-cut incidents.'
    },
    {
      id: 'christmas-island',
      nameAr: 'جزيرة كريسماس (غوغل)',
      nameEn: 'Christmas Island (Google)',
      x: 550,
      y: 430,
      strategicValAr: 'محطة غوغل الجديدة للتوجيه السحابي وتجنب مضائق آسيا الملتهبة.',
      strategicValEn: 'Google’s newly acquired routing outpost engineered to circumvent Southeast Asian territorial disputes.'
    },
    {
      id: 'perth',
      nameAr: 'بيرث (أستراليا)',
      nameEn: 'Perth (Australia)',
      x: 580,
      y: 530,
      strategicValAr: 'المحطة الجنوبية الآمنة لكابل عمان-أستراليا العابر لعمق المحيط الهندي.',
      strategicValEn: 'Secure southern landing station anchoring the strategic Oman-Australia deep subsea highway.'
    },
    {
      id: 'hongkong',
      nameAr: 'هونغ كونغ (الصين)',
      nameEn: 'Hong Kong (China)',
      x: 580,
      y: 220,
      strategicValAr: 'نقطة تحكم صينية متنازع عليها، تفرض قيوداً وإجراءات صعبة لصيانة الكابلات المارة بمياهها.',
      strategicValEn: 'Chinese-controlled digital hub subject to stringent security laws and slow repair authorizations.'
    },
    {
      id: 'guam',
      nameAr: 'غوام (المحيط الهادئ)',
      nameEn: 'Guam (Pacific)',
      x: 700,
      y: 280,
      strategicValAr: 'القاعدة العسكرية الأمريكية ونقطة الهبوط الكبرى لكابلات المحيط الهادئ العابرة للولايات المتحدة.',
      strategicValEn: 'Critical US Pacific military jurisdiction and primary routing node for East-West transpacific trunks.'
    }
  ];

  // Cable segments on our tactical map
  const segments: CableSegment[] = [
    {
      id: 'med-link',
      nameAr: 'رابط البحر المتوسط (مارسيليا - السويس)',
      nameEn: 'Mediterranean Trunk (Marseille - Suez)',
      path: 'M 90,90 Q 120,110 160,130',
      fromNode: 'marseille',
      toNode: 'suez',
      capacity: '200 Tbps',
      owners: 'SEA-ME-WE Consortia, Telecom Italia',
      baseRisk: 40,
      riskModifiers: {
        standard: 40,
        redSea: 55,
        hormuz: 45,
        pacific: 42
      },
      descAr: 'الممر الرئيسي الرابط بين أوروبا ومصر. يعاني من ازدحام الملاحة التجارية وضربات مرساة السفن المتكررة.',
      descEn: 'The primary pipeline feeding European traffic into Egypt. Suffers from high commercial vessel traffic and anchor-drag damages.'
    },
    {
      id: 'red-sea-north',
      nameAr: 'قطاع البحر الأحمر الشمالي (السويس - جدة)',
      nameEn: 'Red Sea North Corridor (Suez - Jeddah)',
      path: 'M 160,130 L 195,190',
      fromNode: 'suez',
      toNode: 'jeddah',
      capacity: '180 Tbps',
      owners: 'Meta, Google, Telecom Egypt',
      baseRisk: 45,
      riskModifiers: {
        standard: 45,
        redSea: 82,
        hormuz: 50,
        pacific: 48
      },
      descAr: 'يربط مصر بالمملكة العربية السعودية عبر قاع البحر الأحمر الضيق. حساس لأي توتر إقليمي بالمنطقة.',
      descEn: 'Runs the length of the northern Red Sea. Highly vulnerable to regional escalating military confrontations.'
    },
    {
      id: 'red-sea-south',
      nameAr: 'شريان باب المندب (جدة - جيبوتي)',
      nameEn: 'Bab-el-Mandeb Chokehold (Jeddah - Djibouti)',
      path: 'M 195,190 L 215,260',
      fromNode: 'jeddah',
      toNode: 'bab-el-mandeb',
      capacity: '170 Tbps',
      owners: 'Google, GBI, Djibouti Telecom',
      baseRisk: 65,
      riskModifiers: {
        standard: 65,
        redSea: 98,
        hormuz: 70,
        pacific: 68
      },
      descAr: 'المنطقة الأكثر خطورة عالمياً. استهداف دائم للسفن وسفن الصيانة من المسيرات الإيرانية وصواريخ الحوثيين مع تعطل كامل لأي صيانة.',
      descEn: 'The ultimate global digital choke point. Active drone strikes and rebel hostilities freeze all maritime repair operations.'
    },
    {
      id: 'gulf-aden-trunk',
      nameAr: 'ممر خليج عدن وبحر العرب (جيبوتي - مسقط)',
      nameEn: 'Gulf of Aden Transit (Djibouti - Muscat)',
      path: 'M 215,260 Q 260,250 320,195',
      fromNode: 'bab-el-mandeb',
      toNode: 'muscat',
      capacity: '150 Tbps',
      owners: 'Tata Communications, Ooredoo',
      baseRisk: 50,
      riskModifiers: {
        standard: 50,
        redSea: 85,
        hormuz: 88,
        pacific: 52
      },
      descAr: 'يعبر المياه الإقليمية المضطربة قبالة السواحل اليمنية والصومالية باتجاه الأمان العماني في بحر العرب.',
      descEn: 'Traverses highly volatile territorial waters between Yemeni coastline and Somali basins towards Omani sovereign ports.'
    },
    {
      id: 'hormuz-trunk',
      nameAr: 'شبكة تخديم هرمز (مسقط - دبي - الخليج)',
      nameEn: 'Strait of Hormuz Network (Muscat - Hormuz)',
      path: 'M 320,195 L 310,155',
      fromNode: 'muscat',
      toNode: 'hormuz',
      capacity: '120 Tbps',
      owners: 'e-Marine, Etisalat, AWS',
      baseRisk: 55,
      riskModifiers: {
        standard: 55,
        redSea: 65,
        hormuz: 95,
        pacific: 58
      },
      descAr: 'تغذي البنية التحتية ومراكز بيانات الحوسبة بالخليج. تقع مباشرة تحت تهديد الاستهداف الإيراني وحرب الظل البحرية.',
      descEn: 'Directly serves Gulf digital hubs. Highly exposed to Iranian electronic warfare and tactical maritime interdictions.'
    },
    {
      id: 'oman-diego-highway',
      nameAr: 'طريق المحيط الهندي العسكري (مسقط - دييغو غارسيا)',
      nameEn: 'Oman-Diego Garcia Deep Expressway',
      path: 'M 320,195 Q 350,310 380,420',
      fromNode: 'muscat',
      toNode: 'diego-garcia',
      capacity: '220 Tbps',
      owners: 'Google, US Defense Logistics',
      baseRisk: 20,
      riskModifiers: {
        standard: 20,
        redSea: 22,
        hormuz: 25,
        pacific: 30
      },
      descAr: 'مسار آمن للغاية تحت الرصد الصوتي والبحري الدائم من القواعد العسكرية الأمريكية والبريطانية.',
      descEn: 'Deep-ocean path benefits from heavy US-UK naval patrols and acoustic maritime sensors guarding the seabed.'
    },
    {
      id: 'diego-perth-link',
      nameAr: 'جسر دييغو غارسيا الجنوبي (دييغو غارسيا - بيرث)',
      nameEn: 'Diego Garcia - Perth Deep Link',
      path: 'M 380,420 Q 480,470 580,530',
      fromNode: 'diego-garcia',
      toNode: 'perth',
      capacity: '210 Tbps',
      owners: 'SubPartners, Australian Government',
      baseRisk: 15,
      riskModifiers: {
        standard: 15,
        redSea: 15,
        hormuz: 18,
        pacific: 22
      },
      descAr: 'ممر جنوبي فائق الأمان يربط المحيط الهندي البعيد بالقارة الأسترالية بعيداً عن صراعات القوى العظمى.',
      descEn: 'A pristine deep-sea segment linking Australasia with southern oceans, highly shielded from geopolitical skirmishes.'
    },
    {
      id: 'scs-corridor',
      nameAr: 'ممر بحر الصين الجنوبي (سنغافورة - هونغ كونغ)',
      nameEn: 'South China Sea Corridor (Singapore - Hong Kong)',
      path: 'M 520,330 L 580,220',
      fromNode: 'singapore',
      toNode: 'hongkong',
      capacity: '160 Tbps',
      owners: 'China Telecom, Singtel, Meta',
      baseRisk: 60,
      riskModifiers: {
        standard: 60,
        redSea: 62,
        hormuz: 60,
        pacific: 94
      },
      descAr: 'بؤرة النزاع الأمريكي الصيني الحاد. صعوبة بالغة في الحصول على تراخيص صيانة وتخطيط الكابلات من بكين داخل خط تسع نقاط.',
      descEn: 'Ground zero of US-China digital decoupling. Beijing routinely blocks western cable ships from operating inside the Nine-Dash line.'
    },
    {
      id: 'google-christmas-bypass',
      nameAr: 'التوجيه البديل لغوغل (بيرث - جزيرة كريسماس)',
      nameEn: 'Google Christmas Bypass (Perth - Christmas Is.)',
      path: 'M 580,530 L 550,430',
      fromNode: 'perth',
      toNode: 'christmas-island',
      capacity: '240 Tbps',
      owners: 'Google Cloud Platform',
      baseRisk: 18,
      riskModifiers: {
        standard: 18,
        redSea: 20,
        hormuz: 18,
        pacific: 25
      },
      descAr: 'صُمم خصيصاً من غوغل في ٢٠٢٦ لتخطي بؤر التوتر بآسيا، لتوجيه البيانات مباشرة نحو القارة الأسترالية والمحيط الهادئ.',
      descEn: 'Engineered by Google to bypass standard Southeast Asian sea corridors, transferring cloud assets directly to Australia.'
    },
    {
      id: 'christmas-guam-link',
      nameAr: 'جسر كريسماس - غوام الاستراتيجي',
      nameEn: 'Christmas Is. - Guam Strategic Link',
      path: 'M 550,430 Q 625,355 700,280',
      fromNode: 'christmas-island',
      toNode: 'guam',
      capacity: '230 Tbps',
      owners: 'Google, Microsoft Azure',
      baseRisk: 22,
      riskModifiers: {
        standard: 22,
        redSea: 24,
        hormuz: 22,
        pacific: 40
      },
      descAr: 'عقدة الربط لشركات السحاب الأمريكية تربط جزر أستراليا البعيدة بالقاعدة العسكرية الأمريكية الكبرى بغوام.',
      descEn: 'Major cloud corridor wiring deep Indian Ocean outposts to Guam military aerospace and naval command.'
    },
    {
      id: 'transpacific-gateway',
      nameAr: 'بوابة الهادئ الكبرى (غوام - الولايات المتحدة)',
      nameEn: 'Trans-Pacific Gateway (Guam - US)',
      path: 'M 700,280 Q 750,290 800,300',
      fromNode: 'guam',
      toNode: 'guam', // custom endpoint representation (exiting right)
      capacity: '320 Tbps',
      owners: 'Google, Meta, NTT',
      baseRisk: 12,
      riskModifiers: {
        standard: 12,
        redSea: 12,
        hormuz: 12,
        pacific: 38
      },
      descAr: 'الشريان الرقمي الأعمق والآمن الرابط بين غرب الهادئ والبر الرئيسي للولايات المتحدة الأمريكية.',
      descEn: 'Ultra-deep ocean backbone connecting the key West Pacific hub of Guam to Oregon and California landing stations.'
    }
  ];

  // Get current risk score of a segment based on active scenario
  const getRiskScore = (segment: CableSegment): number => {
    switch (activeScenario) {
      case 'redSea':
        return segment.riskModifiers.redSea;
      case 'hormuz':
        return segment.riskModifiers.hormuz;
      case 'pacific':
        return segment.riskModifiers.pacific;
      case 'standard':
      default:
        return segment.riskModifiers.standard;
    }
  };

  // Get color color from risk score
  const getRiskColor = (score: number): string => {
    if (score >= 85) return '#ef4444'; // Red (Extreme Risk)
    if (score >= 65) return '#f97316'; // Orange (High Risk)
    if (score >= 40) return '#eab308'; // Yellow (Moderate Risk)
    return '#10b981'; // Green (Secure)
  };

  const getRiskText = (score: number) => {
    if (score >= 85) return isAr ? 'خطر حرج للغاية' : 'CRITICAL EXTREME';
    if (score >= 65) return isAr ? 'تهديد مرتفع' : 'HIGH THREAT';
    if (score >= 40) return isAr ? 'خطر متوسط' : 'MODERATE RISK';
    return isAr ? 'مؤمن ومستقر' : 'SECURE & STABLE';
  };

  const currentSegments = segments.filter(seg => getRiskScore(seg) >= minRiskThreshold);

  return (
    <div className="bg-[#0b0c10] border border-zinc-800 rounded-lg p-4 md:p-6 my-6 font-mono select-none" id="subsea-cables-heatmap-container">
      {/* Interactive Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">
              {isAr ? 'محاكاة الجغرافيا السياسية للكابلات البحرية' : 'SUBSEA CABLE GEOPOLITICAL SIMULATOR'}
            </span>
          </div>
          <h4 className="text-md md:text-lg font-sans font-black text-white mt-1">
            {isAr ? 'خريطة فحص الضعف الرقمي التفاعلية (SVG Heatmap)' : 'Interactive Digital Vulnerability Heatmap'}
          </h4>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-[9px] bg-zinc-950/60 p-2 rounded border border-zinc-900">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#ef4444] rounded-sm"></div>
            <span className="text-zinc-300">{isAr ? 'حرج (85%+)' : 'Extreme (85%+)'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#f97316] rounded-sm"></div>
            <span className="text-zinc-300">{isAr ? 'مرتفع (65%+)' : 'High (65%+)'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#eab308] rounded-sm"></div>
            <span className="text-zinc-300">{isAr ? 'متوسط (40%+)' : 'Mod (40%+)'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#10b981] rounded-sm"></div>
            <span className="text-zinc-300">{isAr ? 'أمن (<40%)' : 'Secure (<40%)'}</span>
          </div>
        </div>
      </div>

      {/* Control Panel: Scenario Selectors & Slider */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Scenarios */}
        <div className="lg:col-span-8 space-y-2">
          <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">
            {isAr ? '⚙ محاكاة سيناريوهات النزاع النشط:' : '⚙ ACTIVE CONFLICT SCENARIOS:'}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => {
                setActiveScenario('standard');
                setSelectedSegment(null);
                setSelectedNode(null);
              }}
              className={`p-2 border text-[11px] font-bold rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeScenario === 'standard'
                  ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <RefreshCw size={12} className={activeScenario === 'standard' ? 'animate-spin' : ''} />
              <span>{isAr ? 'الوضع المعتاد' : 'Commerce Mode'}</span>
            </button>

            <button
              onClick={() => {
                setActiveScenario('redSea');
                setSelectedSegment(null);
                setSelectedNode(null);
              }}
              className={`p-2 border text-[11px] font-bold rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeScenario === 'redSea'
                  ? 'border-red-500 bg-red-950/30 text-red-400 font-black shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <AlertTriangle size={12} className="text-red-500" />
              <span>{isAr ? 'إغلاق البحر الأحمر' : 'Red Sea Crisis'}</span>
            </button>

            <button
              onClick={() => {
                setActiveScenario('hormuz');
                setSelectedSegment(null);
                setSelectedNode(null);
              }}
              className={`p-2 border text-[11px] font-bold rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeScenario === 'hormuz'
                  ? 'border-orange-500 bg-orange-950/30 text-orange-400 font-black shadow-[0_0_10px_rgba(249,115,22,0.2)]'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Radio size={12} className="text-orange-500" />
              <span>{isAr ? 'تصعيد مضيق هرمز' : 'Hormuz Flareup'}</span>
            </button>

            <button
              onClick={() => {
                setActiveScenario('pacific');
                setSelectedSegment(null);
                setSelectedNode(null);
              }}
              className={`p-2 border text-[11px] font-bold rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeScenario === 'pacific'
                  ? 'border-amber-500 bg-amber-950/30 text-amber-400 font-black shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Compass size={12} className="text-amber-500" />
              <span>{isAr ? 'عسكرة بحر الصين' : 'Pacific Decoupling'}</span>
            </button>
          </div>
        </div>

        {/* Risk Threshold Slider */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-zinc-400 font-bold uppercase tracking-wider">
              {isAr ? '✦ ترشيح نسبة الخطورة الأدنى:' : '✦ FILTER MINIMUM RISK:'}
            </span>
            <span className="text-amber-500 font-bold">{minRiskThreshold}%</span>
          </div>
          <div className="flex items-center gap-3">
            <Filter size={14} className="text-zinc-500" />
            <input
              type="range"
              min="0"
              max="90"
              value={minRiskThreshold}
              onChange={(e) => setMinRiskThreshold(Number(e.target.value))}
              className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Main Interactive Map Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* SVG Tactical Map Overlay */}
        <div className="xl:col-span-8 bg-[#090a0e] border border-zinc-900 p-2 rounded-lg relative overflow-hidden shadow-inner">
          
          {/* Subtle grid indicators & coordinate metrics */}
          <div className="absolute top-2 left-2 text-[7px] text-zinc-600 font-mono tracking-widest pointer-events-none">
            GRID: MERCATOR SECURED // SECURE_COMMS_ON
          </div>
          <div className="absolute bottom-2 right-2 text-[7px] text-zinc-600 font-mono tracking-widest pointer-events-none">
            LAT 12.04 N // LON 43.15 E
          </div>

          <div className="relative w-full aspect-[4/3] max-h-[500px] min-h-[320px]">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tactical cyber Grid Lines */}
              <g className="opacity-15 pointer-events-none">
                {Array.from({ length: 16 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 50}
                    y1={0}
                    x2={i * 50}
                    y2={600}
                    stroke="#F4C430"
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                  />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1={0}
                    y1={i * 50}
                    x2={800}
                    y2={i * 50}
                    stroke="#F4C430"
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                  />
                ))}
              </g>

              {/* Stylized Abstract Landmass Outline Paths (Tactical representation) */}
              <g className="fill-[#13151f] stroke-[#242838] stroke-width-[1.5] transition-all duration-500">
                {/* Europe & Mediterranean outline */}
                <path d="M 20,40 Q 50,45 80,42 L 110,60 L 140,50 L 170,80 L 150,110 L 120,105 L 100,120 L 70,110 Z" />
                {/* East Africa / Horn of Africa */}
                <path d="M 40,150 L 120,150 L 140,240 L 180,260 L 210,310 L 220,380 L 190,440 L 140,480 L 110,480 L 100,400 L 40,320 L 30,220 Z" />
                {/* Madagascar */}
                <path d="M 185,455 L 205,475 L 195,525 L 175,485 Z" />
                {/* Arabian Peninsula */}
                <path d="M 150,150 L 230,130 L 280,160 L 305,190 L 290,240 L 230,280 L 190,220 L 180,180 Z" />
                {/* India/South Asia Contour */}
                <path d="M 320,180 L 370,180 L 415,230 L 395,290 L 375,300 L 350,220 Z" />
                {/* China & Southeast Asia Contour */}
                <path d="M 430,150 L 520,150 L 565,190 L 585,260 L 515,320 L 485,270 L 445,210 Z" />
                {/* Australia */}
                <path d="M 470,480 L 540,450 L 610,480 L 635,550 L 555,580 L 485,550 Z" />
              </g>

              {/* Geographic Labels in Grid background */}
              <g className="fill-zinc-600 font-sans font-bold text-[8px] tracking-widest opacity-40 pointer-events-none uppercase">
                <text x="60" y="300">Africa</text>
                <text x="210" y="160">Saudi Arabia</text>
                <text x="355" y="240">India</text>
                <text x="500" y="210">China</text>
                <text x="520" y="520">Australia</text>
                <text x="380" y="350">Indian Ocean</text>
                <text x="690" y="320">Pacific Ocean</text>
                <text x="65" y="70">Europe</text>
              </g>

              {/* Undersea Cable Heatmap Segments */}
              <g>
                {segments.map((seg) => {
                  const score = getRiskScore(seg);
                  const isFilteredOut = score < minRiskThreshold;
                  const color = getRiskColor(score);
                  const isSelected = selectedSegment?.id === seg.id;
                  const isHovered = hoveredSegment?.id === seg.id;

                  return (
                    <path
                      key={seg.id}
                      d={seg.path}
                      fill="none"
                      stroke={isFilteredOut ? '#1b1d25' : color}
                      strokeWidth={isSelected ? 5.5 : isHovered ? 4.5 : 2.5}
                      strokeDasharray={isFilteredOut ? '3 5' : 'none'}
                      className="cursor-pointer transition-all duration-300 hover:stroke-zinc-300"
                      onClick={() => {
                        setSelectedSegment(isSelected ? null : seg);
                        setSelectedNode(null);
                      }}
                      onMouseEnter={() => setHoveredSegment(seg)}
                      onMouseLeave={() => setHoveredSegment(null)}
                      style={{
                        filter: !isFilteredOut && score >= 75 ? `drop-shadow(0 0 5px ${color})` : 'none'
                      }}
                    />
                  );
                })}

                {/* Animated Pulsing highlight ring on top of high-risk / selected segment */}
                {segments.map((seg) => {
                  const score = getRiskScore(seg);
                  if (score < minRiskThreshold) return null;
                  const color = getRiskColor(score);
                  const isSelected = selectedSegment?.id === seg.id;

                  // Only pulse extremely high risk (>=85%) or currently selected cables
                  if (score < 85 && !isSelected) return null;

                  return (
                    <path
                      key={`pulse-${seg.id}`}
                      d={seg.path}
                      fill="none"
                      stroke={color}
                      strokeWidth={isSelected ? 10 : 6}
                      className="pointer-events-none opacity-20 animate-pulse transition-all duration-300"
                    />
                  );
                })}
              </g>

              {/* Strategic Tactical Node Points */}
              <g>
                {nodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const associatedCables = segments.filter(
                    s => s.fromNode === node.id || s.toNode === node.id
                  );
                  // Average risk around this node
                  const nodeAvgRisk = Math.round(
                    associatedCables.reduce((acc, curr) => acc + getRiskScore(curr), 0) /
                    (associatedCables.length || 1)
                  );
                  const color = getRiskColor(nodeAvgRisk);

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer transition-transform duration-300 hover:scale-125"
                      onClick={() => {
                        setSelectedNode(isSelected ? null : node);
                        setSelectedSegment(null);
                      }}
                    >
                      {/* Pulse outer layer for extreme risk nodes */}
                      {nodeAvgRisk >= 75 && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={10}
                          fill={color}
                          className="animate-ping opacity-30 pointer-events-none"
                        />
                      )}
                      
                      {/* Node circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? 6.5 : 4.5}
                        fill="#0b0c10"
                        stroke={isSelected ? '#ffffff' : color}
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        className="transition-all duration-300"
                      />

                      {/* Small text label next to important nodes */}
                      <text
                        x={node.x + 8}
                        y={node.y + 3}
                        fill={isSelected ? '#ffffff' : '#9ca3af'}
                        className={`font-sans font-black text-[7.5px] select-none ${
                          isSelected ? 'font-black opacity-100 fill-amber-400' : 'opacity-70'
                        }`}
                      >
                        {isAr ? node.nameAr.split(' ')[0] : node.nameEn.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Hover Floating Guide Label */}
            {hoveredSegment && (
              <div className="absolute top-4 left-4 bg-[#11131a]/95 border border-zinc-850 px-3 py-1.5 rounded text-[10px] space-y-0.5 pointer-events-none animate-fade-in shadow-lg">
                <span className="font-sans font-black text-amber-400">
                  {isAr ? hoveredSegment.nameAr : hoveredSegment.nameEn}
                </span>
                <div className="flex gap-2 text-zinc-400 font-mono text-[9px]">
                  <span>Score: <span className="font-bold text-white">{getRiskScore(hoveredSegment)}%</span></span>
                  <span>|</span>
                  <span>{getRiskText(getRiskScore(hoveredSegment))}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tactical Readout / Sidebar Controls */}
        <div className="xl:col-span-4 bg-[#111319] border border-zinc-850 p-4 rounded-lg self-stretch flex flex-col justify-between space-y-4">
          
          {/* Header */}
          <div className="border-b border-zinc-800 pb-3">
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest block">
              STATUS READOUT // CHANNELS ACTIVE
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Shield className="text-amber-500" size={14} />
              <span className="text-[11px] font-bold text-white">
                {isAr ? 'بيانات التهديد المباشرة' : 'Tactical Intercept Panel'}
              </span>
            </div>
          </div>

          {/* Interactive Info Block */}
          <div className="flex-grow space-y-4 text-xs leading-relaxed font-serif text-zinc-300">
            
            {/* If a Cable Segment is Selected */}
            {selectedSegment ? (
              <div className="space-y-3 animate-fade-in">
                <div className="flex justify-between items-start border-b border-zinc-800 pb-2">
                  <h5 className="font-sans font-black text-white text-xs">
                    {isAr ? selectedSegment.nameAr : selectedSegment.nameEn}
                  </h5>
                  <button
                    onClick={() => setSelectedSegment(null)}
                    className="text-xxs text-zinc-500 hover:text-white font-mono uppercase cursor-pointer"
                  >
                    ✕ {isAr ? 'إغلاق' : 'Clear'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-zinc-950/60 p-2 border border-zinc-900 rounded">
                  <div>
                    <span className="text-zinc-500 block uppercase tracking-wider">{isAr ? 'مستوى التهديد:' : 'RISK EVALUATION:'}</span>
                    <span className="font-bold font-sans text-xs" style={{ color: getRiskColor(getRiskScore(selectedSegment)) }}>
                      {getRiskScore(selectedSegment)}% ({getRiskText(getRiskScore(selectedSegment))})
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase tracking-wider">{isAr ? 'السعة الكلية:' : 'CABLE CAPACITY:'}</span>
                    <span className="font-bold text-white">{selectedSegment.capacity}</span>
                  </div>
                  <div className="col-span-2 pt-1.5 border-t border-zinc-900">
                    <span className="text-zinc-500 block uppercase tracking-wider">{isAr ? 'الجهات المالكة:' : 'OWNERS / OPERATORS:'}</span>
                    <span className="font-bold text-zinc-300">{selectedSegment.owners}</span>
                  </div>
                </div>

                <p className="text-zinc-300 leading-relaxed italic text-xxs font-serif bg-zinc-900/30 p-2 border border-zinc-850/50 rounded">
                  {isAr ? selectedSegment.descAr : selectedSegment.descEn}
                </p>

                {/* Simulated Impact under active Scenario */}
                <div className="border-l-2 border-amber-500 pl-2 text-[10px] text-zinc-400 font-mono space-y-1">
                  <span className="font-black text-amber-400">{isAr ? 'تأثير السيناريو الحالي:' : 'Active Scenario Impact:'}</span>
                  <p className="font-serif">
                    {activeScenario === 'standard' && (isAr ? 'عمليات بحرية طبيعية ومستقرة؛ صيانة عادية.' : 'Sustained standard maintenance window; normal global routing.')}
                    {activeScenario === 'redSea' && (isAr ? 'توقف تام لخدمات صيانة السفن بالبحر الأحمر. تحويل فوري للمرور السحابي.' : 'Severe repair ship lockouts; zero maintenance safely guaranteed in the Red Sea corridor.')}
                    {activeScenario === 'hormuz' && (isAr ? 'تهديد عسكري مباشر لأربع كابلات خليجية؛ تعطل خدمات الدفع والتطبيقات.' : 'Immediate cyber risk to GCC digital networks; AWS local regional channels disrupted.')}
                    {activeScenario === 'pacific' && (isAr ? 'تعطيل كامل لصيانة خطوط بحر الصين؛ غوغل تحول الحركة لعبر عمان.' : 'Chinese repair authorization bans force immediate rerouting via Australia-Oman deep links.')}
                  </p>
                </div>
              </div>
            ) : selectedNode ? (
              /* If a Node Point is Selected */
              <div className="space-y-3 animate-fade-in">
                <div className="flex justify-between items-start border-b border-zinc-800 pb-2">
                  <h5 className="font-sans font-black text-amber-400 text-xs">
                    {isAr ? selectedNode.nameAr : selectedNode.nameEn}
                  </h5>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-xxs text-zinc-500 hover:text-white font-mono uppercase cursor-pointer"
                  >
                    ✕ {isAr ? 'إغلاق' : 'Clear'}
                  </button>
                </div>

                <div className="bg-zinc-950/60 p-2.5 border border-zinc-900 rounded space-y-1">
                  <span className="text-zinc-500 text-[10px] block uppercase tracking-wider">{isAr ? 'الأهمية الجيواستراتيجية:' : 'STRATEGIC DISPATCH:'}</span>
                  <p className="text-xxs font-serif text-zinc-200 leading-relaxed">
                    {isAr ? selectedNode.strategicValAr : selectedNode.strategicValEn}
                  </p>
                </div>

                {/* Cables connected to this node */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">
                    {isAr ? 'الكابلات المرتبطة بهذه العقدة:' : 'ASSOCIATED SECTOR SEGMENTS:'}
                  </span>
                  <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                    {segments.filter(s => s.fromNode === selectedNode.id || s.toNode === selectedNode.id).map(seg => {
                      const score = getRiskScore(seg);
                      return (
                        <div
                          key={seg.id}
                          onClick={() => setSelectedSegment(seg)}
                          className="flex justify-between items-center bg-zinc-950/30 hover:bg-zinc-900/60 p-1.5 border border-zinc-900 rounded text-[10px] cursor-pointer"
                        >
                          <span className="text-zinc-300 font-sans truncate pr-2 max-w-[150px]">
                            {isAr ? seg.nameAr : seg.nameEn}
                          </span>
                          <span className="font-bold" style={{ color: getRiskColor(score) }}>
                            {score}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Default State - showing overall stats & instructions */
              <div className="space-y-3 font-serif text-xxs text-zinc-400 leading-relaxed">
                <p>
                  {isAr
                    ? '✦ يمثل هذا الإنفوجرافيك التفاعلي محاكاة جغرافية حقيقية لشبكات الإنترنت العالمية عبر المحيطات مع تحديد نقاط الاختناق ومستويات التعرض للخطر.'
                    : '✦ This interactive dashboard charts primary transoceanic internet routes and examines critical digital maritime bottlenecks.'}
                </p>
                <div className="bg-zinc-950/40 p-2.5 rounded border border-zinc-900 space-y-1.5 font-mono text-[9px]">
                  <strong className="text-zinc-300 uppercase block">{isAr ? 'تلميحات تفاعلية:' : 'TUTORIAL METRICS:'}</strong>
                  <ul className="list-disc list-inside space-y-1 text-zinc-400">
                    <li>{isAr ? 'اختر أي سيناريو صراع لتغيير خارطة الحرارة.' : 'Toggle conflict scenario tabs to recalculate heatmap data.'}</li>
                    <li>{isAr ? 'اضغط على الخطوط الملونة لفحص تفاصيل الكابل.' : 'Click on any cable route to evaluate capacity and owners.'}</li>
                    <li>{isAr ? 'اضغط على النقاط الدائرية لمعاينة أهميتها العسكرية.' : 'Click on geographic nodes to study regional dispatch notes.'}</li>
                  </ul>
                </div>

                <div className="p-2 border border-yellow-950/40 bg-yellow-950/10 text-yellow-300/80 rounded leading-relaxed text-[9px]">
                  <strong>{isAr ? 'ملاحظة سرية:' : 'SECURITY WARNING:'}</strong> {isAr ? 'إغلاق مضيق هرمز وباب المندب معاً يعني تعطل ٩٠٪ من المرور الرقمي بين آسيا وأوروبا دون أي قدرة لسفينة الصيانة e-Marine على التدخل الآمن.' : 'Simultaneous closures in the Red Sea and Hormuz channels will isolate East-West digital traffic. Single regional repair ships cannot function in hostile zones.'}
                </div>
              </div>
            )}
          </div>

          {/* Footer controls/disclaimer */}
          <div className="border-t border-zinc-800 pt-3 flex justify-between items-center text-[8px] text-zinc-500 font-mono">
            <span>{isAr ? 'المصدر: تشاتام هاوس & معن البرازي' : 'SOURCE: CHATHAM HOUSE & MAAN BARAZY'}</span>
            <span>{isAr ? 'تحديث: ٢٠٢٦' : 'METRICS INTEL 2026'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
