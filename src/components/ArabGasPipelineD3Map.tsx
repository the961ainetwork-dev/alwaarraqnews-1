import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { 
  Flame, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  MapPin, 
  Activity, 
  Info, 
  Layers, 
  Building2, 
  Maximize2,
  RefreshCw,
  Gauge,
  Compass,
  FileCheck,
  AlertTriangle
} from 'lucide-react';

interface Props {
  language?: 'ar' | 'en';
  onSelectStation?: (stationId: string) => void;
}

export interface PipelineNode {
  id: string;
  nameAr: string;
  nameEn: string;
  countryAr: string;
  countryEn: string;
  coordinates: [number, number]; // [longitude, latitude]
  type: 'hub' | 'terminal' | 'compression' | 'border' | 'power_plant';
  status: 'operational' | 'pending_ofac' | 'rehabilitating' | 'under_repair';
  capacity: string;
  operatorAr: string;
  operatorEn: string;
  descriptionAr: string;
  descriptionEn: string;
  technicalSpecsAr?: string;
  technicalSpecsEn?: string;
}

export interface PipelineSegment {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  lengthKm: number;
  diameterInches: number;
  status: 'active_flow' | 'pending_clearance' | 'under_maintenance';
  flowDirection: 'south_to_north' | 'bidirectional';
  notesAr: string;
  notesEn: string;
}

// 1. Precise Geopolitical Pipeline Nodes (Egypt -> Jordan -> Syria -> Lebanon)
const PIPELINE_NODES: PipelineNode[] = [
  {
    id: 'arish-hub',
    nameAr: 'مجمع العريش للغاز',
    nameEn: 'Arish Gas Compression Hub',
    countryAr: 'مصر (سيناء)',
    countryEn: 'Egypt (Sinai)',
    coordinates: [33.80, 31.13],
    type: 'hub',
    status: 'operational',
    capacity: '10.3 BCM/yr',
    operatorAr: 'الشركة المصرية القابضة للغازات (إيجاس - EGAS)',
    operatorEn: 'Egyptian Natural Gas Holding Co. (EGAS)',
    descriptionAr: 'نقطة الانطلاق الرئيسية لخط الغاز العربي بشبه جزيرة سيناء، وتستقبل التدفّقات المباشرة من حقول شرق المتوسط ومجمع سوميد.',
    descriptionEn: 'The primary terminus of the Arab Gas Pipeline in the Sinai Peninsula, receiving direct flows from Eastern Med offshore fields & SUMED.',
    technicalSpecsAr: 'ضغط التشغيل: 70 بار | قطران الأنابيب: 36 بوصة | محطة معالجة وتدفق عالية الكفاءة',
    technicalSpecsEn: 'Operating Pressure: 70 Bar | Pipe Diameter: 36" | High-efficiency metering and treatment'
  },
  {
    id: 'taba-terminal',
    nameAr: 'محطة طابا البحرية',
    nameEn: 'Taba Red Sea Terminal',
    countryAr: 'مصر',
    countryEn: 'Egypt',
    coordinates: [34.89, 29.49],
    type: 'terminal',
    status: 'operational',
    capacity: '7.5 BCM/yr',
    operatorAr: 'شركة غاز الشرق (EGAS / East Gas)',
    operatorEn: 'East Gas Company',
    descriptionAr: 'محطة عبور خليج العقبة عبر خط أنبوب بحري يصل بين الأراضي المصرية والأردنية في أعماق البحر الأحمر.',
    descriptionEn: 'Subsea Gulf of Aqaba pipeline crossing section linking Egyptian facilities to Jordanian coastal infrastructure.',
    technicalSpecsAr: 'الأنبوب البحري: 15 كم تحت سطح البحر | محطات قياس الضغط الضوئي',
    technicalSpecsEn: 'Subsea Pipeline: 15 km under sea level | Optical pressure monitoring'
  },
  {
    id: 'aqaba-fsu',
    nameAr: 'منصة العقبة العائمة للغاز (FSRU)',
    nameEn: 'Aqaba LNG Terminal & FSRU',
    countryAr: 'الأردن',
    countryEn: 'Jordan',
    coordinates: [35.00, 29.53],
    type: 'terminal',
    status: 'operational',
    capacity: '5.0 BCM/yr',
    operatorAr: 'شركة الفجر للغاز الطبيعي / شركة الكهرباء الوطنية (NEPCO)',
    operatorEn: 'ALFAJR Natural Gas Co. / NEPCO',
    descriptionAr: 'مركز تحويل الغاز الطبيعي المسال وإمداد شبكة الكهرباء الأردنية، ونقطة ضخ الغاز شمالاً باتجاه عمان وسوريا.',
    descriptionEn: 'Floating Storage & Regasification Unit supplying Jordan grid and boosting gas northward toward Syria.',
    technicalSpecsAr: 'وحدة تغييز عائمة بقدرة 500 مليون قدم مكعب يومياً | ربط ثنائي مع شبكة الكهرباء',
    technicalSpecsEn: 'FSRU capacity of 500 MMSCFD | Dual tie-in with national power grid'
  },
  {
    id: 'amman-junction',
    nameAr: 'عقدة عمان الوسطى',
    nameEn: 'Central Amman Gas Node',
    countryAr: 'الأردن',
    countryEn: 'Jordan',
    coordinates: [35.93, 31.95],
    type: 'compression',
    status: 'operational',
    capacity: '4.2 BCM/yr',
    operatorAr: 'شركة الفجر للغاز الطبيعي',
    operatorEn: 'ALFAJR Natural Gas Pipeline Co.',
    descriptionAr: 'محطة توزيع وضغط وسط المملكة الأردنية الهاشمية تغذي محطات توليد الكهرباء الرئيسية بالرحاب والزرقاء.',
    descriptionEn: 'Central Jordan pressure station supplying Rehab and Zarka thermal power generation plants.',
    technicalSpecsAr: '3 ضواغط توربينية حديثة | نظام تحكم آلي SCADA',
    technicalSpecsEn: '3 modern turbine compressors | Automated SCADA system'
  },
  {
    id: 'rehab-station',
    nameAr: 'محطة ضخ الرحاب (المفرق)',
    nameEn: 'Rehab Pumping Station (Mafraq)',
    countryAr: 'الأردن',
    countryEn: 'Jordan',
    coordinates: [36.08, 32.33],
    type: 'compression',
    status: 'operational',
    capacity: '3.8 BCM/yr',
    operatorAr: 'شركة الفجر / وزارة الطاقة الثروة المعدنية',
    operatorEn: 'ALFAJR / Ministry of Energy',
    descriptionAr: 'محطة الضخ الشمالية بالأردن المقامة قرب الحدود السورية لبث الغاز عبر مركز درعا إلى الأراضي السورية.',
    descriptionEn: 'Northern Jordan booster station near Syrian border propelling gas across Daraa into Syria.',
    technicalSpecsAr: 'قياس دقيق للكميات العابرة | أجهزة تحليل النقاوة والرطوبة',
    technicalSpecsEn: 'Precision fiscal metering | Gas quality & moisture sensors'
  },
  {
    id: 'daraa-border',
    nameAr: 'نقطة عبور درعا الحدودية',
    nameEn: 'Daraa Border Crossing Point',
    countryAr: 'سوريا',
    countryEn: 'Syria',
    coordinates: [36.10, 32.62],
    type: 'border',
    status: 'pending_ofac',
    capacity: '2.5 BCM/yr',
    operatorAr: 'الشركة السورية للغاز (SGC)',
    operatorEn: 'Syrian Gas Company (SGC)',
    descriptionAr: 'مدخل أنبوب الغاز العربي إلى الأراضي السورية؛ يخضع لضوابط إعفاءات "أوفاك" (OFAC) والتسويات الميدانية.',
    descriptionEn: 'Entry point into Syrian territory; subject to US Treasury OFAC waivers and security guarantees.',
    technicalSpecsAr: 'أنبوب 36 بوصة مدفون | محطة قياس حدودية مشتركة',
    technicalSpecsEn: '36" buried steel pipeline | Joint border metering station'
  },
  {
    id: 'damascus-valve',
    nameAr: 'مجمع دمشق - دير علي',
    nameEn: 'Damascus / Deir Ali Node',
    countryAr: 'سوريا',
    countryEn: 'Syria',
    coordinates: [36.29, 33.51],
    type: 'power_plant',
    status: 'pending_ofac',
    capacity: '2.2 BCM/yr',
    operatorAr: 'الشركة السورية للغاز / وزارة الكهرباء',
    operatorEn: 'Syrian Gas Company / Ministry of Electricity',
    descriptionAr: 'ربط أنبوب الغاز العربي بمحطة توليد كهرباء "دير علي" جنوب دمشق، وتفرع الخط المتجه شمالاً نحو حمص.',
    descriptionEn: 'Interconnection with Deir Ali thermal station south of Damascus, with northern spur to Homs.',
    technicalSpecsAr: 'تأهيل الأجهزة المنفذ بواسطة فرق TGS المصرية',
    technicalSpecsEn: 'Rehabilitation of valve trains executed by Egyptian TGS teams'
  },
  {
    id: 'homs-hub',
    nameAr: 'عقدة حمص للضغط والربط الإقليمي',
    nameEn: 'Homs Central Compression Hub',
    countryAr: 'سوريا',
    countryEn: 'Syria',
    coordinates: [36.71, 34.73],
    type: 'hub',
    status: 'rehabilitating',
    capacity: '1.8 BCM/yr',
    operatorAr: 'الشركة السورية للغاز (SGC) / TGS المصرية',
    operatorEn: 'Syrian Gas Company / TGS Egypt',
    descriptionAr: 'قلب الشبكة السورية ومفترق الطرق للغاز المتجه غرباً إلى لبنان (الدبوسية) وشمالاً نحو الأناضول.',
    descriptionEn: 'Heart of the Syrian grid & junction for the western branch leading to Lebanon (Debboussiyeh) & Turkey.',
    technicalSpecsAr: 'أعمال صيانة مكثفة للضواغط الهيدروليكية | معالجة الرواسب',
    technicalSpecsEn: 'Intensive hydraulic compressor overhaul | Sediment removal'
  },
  {
    id: 'debboussiyeh-border',
    nameAr: 'معبر الدبوسية - العبودية الحدودية',
    nameEn: 'Debboussiyeh Border Crossing',
    countryAr: 'سوريا / لبنان',
    countryEn: 'Syria / Lebanon',
    coordinates: [36.13, 34.62],
    type: 'border',
    status: 'rehabilitating',
    capacity: '1.2 BCM/yr',
    operatorAr: 'شركة الخدمات الفنية للغاز المصرية (TGS) / وزارة الطاقة اللبنانية',
    operatorEn: 'Technical Gas Services (TGS) / Ministry of Energy Lebanon',
    descriptionAr: 'النقطة الحدودية الفاصلة التي ينفذ فيها فريق TGS المصري أعمال اختبار الضغط الهيدروليكي والسلامة الإنشائية.',
    descriptionEn: 'Cross-border entry point where Egypt TGS conducts hydrostatic testing and structural integrity checks.',
    technicalSpecsAr: 'اختبارات ضغط هيدروليكي 85 بار | استبدال الصمامات التالفة',
    technicalSpecsEn: '85-bar hydrostatic stress test | Damaged valve replacements'
  },
  {
    id: 'deir-ammar-power',
    nameAr: 'معمل دير عمار الكهربائي (البداوي)',
    nameEn: 'Deir Ammar Power Station (Beddawi)',
    countryAr: 'لبنان (طرابلس)',
    countryEn: 'Lebanon (Tripoli)',
    coordinates: [35.90, 34.46],
    type: 'power_plant',
    status: 'rehabilitating',
    capacity: '650M m³/yr (~450 MW)',
    operatorAr: 'منشآت النفط في طرابلس / كهرباء لبنان (EDL)',
    operatorEn: 'Tripoli Oil Installations / Electricité du Liban',
    descriptionAr: 'المقصد النهائي لاتفاقية الغاز المصرية-اللبنانية (2025/2026) لتوفير 650 مليون متر مكعب سنوياً وتوفير 450 ميغاوات.',
    descriptionEn: 'The final destination under the Egypt-Lebanon MoU (2025/2026) delivering 650M m³/yr to produce 450 MW.',
    technicalSpecsAr: 'تحويل التربينات من الوقود الثقيل للغاز | ربط مباشر مع خط البداوي',
    technicalSpecsEn: 'Turbine conversion from heavy oil to gas | Direct tie-in with Beddawi spur'
  }
];

// 2. Pipeline Segments Connecting Nodes
const PIPELINE_SEGMENTS: PipelineSegment[] = [
  {
    id: 'seg-arish-taba',
    fromNodeId: 'arish-hub',
    toNodeId: 'taba-terminal',
    lengthKm: 250,
    diameterInches: 36,
    status: 'active_flow',
    flowDirection: 'south_to_north',
    notesAr: 'خط بري يعبر شبه جزيرة سيناء؛ يعمل بكامل الكفاءة التشغيلية.',
    notesEn: 'Onshore Sinai desert transit line; fully operational.'
  },
  {
    id: 'seg-taba-aqaba',
    fromNodeId: 'taba-terminal',
    toNodeId: 'aqaba-fsu',
    lengthKm: 15,
    diameterInches: 36,
    status: 'active_flow',
    flowDirection: 'south_to_north',
    notesAr: 'خط بحري غاطس بقاع خليج العقبة بقدرة استيعابية فائقة.',
    notesEn: 'Subsea Aqaba trench connection with elevated pressure ratings.'
  },
  {
    id: 'seg-aqaba-amman',
    fromNodeId: 'aqaba-fsu',
    toNodeId: 'amman-junction',
    lengthKm: 310,
    diameterInches: 36,
    status: 'active_flow',
    flowDirection: 'south_to_north',
    notesAr: 'أنبوب الشريان الرئيس بالأردن؛ ينقل الغاز إلى محطات توليد الكهرباء الوسطى.',
    notesEn: 'Jordanian spine pipeline supplying central power generators.'
  },
  {
    id: 'seg-amman-rehab',
    fromNodeId: 'amman-junction',
    toNodeId: 'rehab-station',
    lengthKm: 90,
    diameterInches: 36,
    status: 'active_flow',
    flowDirection: 'south_to_north',
    notesAr: 'وصلة شمال الأردن المؤدية إلى مركز المفرق لتغذية الحدود السورية.',
    notesEn: 'North Jordan spur connecting Amman to Mafraq regional valves.'
  },
  {
    id: 'seg-rehab-daraa',
    fromNodeId: 'rehab-station',
    toNodeId: 'daraa-border',
    lengthKm: 30,
    diameterInches: 36,
    status: 'pending_clearance',
    flowDirection: 'south_to_north',
    notesAr: 'الخط العابر للحدود الأردنية-السورية؛ يتطلب ترخيص الخزانة الأمريكية (OFAC).',
    notesEn: 'Cross-border link awaiting US Treasury OFAC sanctions waiver.'
  },
  {
    id: 'seg-daraa-damascus',
    fromNodeId: 'daraa-border',
    toNodeId: 'damascus-valve',
    lengthKm: 110,
    diameterInches: 36,
    status: 'pending_clearance',
    flowDirection: 'south_to_north',
    notesAr: 'يمر بمحاذاة اتستراد درعا-دمشق لتغذية محطة دير علي.',
    notesEn: 'Runs parallel to Daraa-Damascus highway feeding Deir Ali station.'
  },
  {
    id: 'seg-damascus-homs',
    fromNodeId: 'damascus-valve',
    toNodeId: 'homs-hub',
    lengthKm: 160,
    diameterInches: 36,
    status: 'pending_clearance',
    flowDirection: 'south_to_north',
    notesAr: 'وصلة الوسط السوري؛ خضعت للصيانة واختبارات التسريب.',
    notesEn: 'Central Syria main trunk line undergoing leakage inspections.'
  },
  {
    id: 'seg-homs-debboussiyeh',
    fromNodeId: 'homs-hub',
    toNodeId: 'debboussiyeh-border',
    lengthKm: 65,
    diameterInches: 24,
    status: 'under_maintenance',
    flowDirection: 'south_to_north',
    notesAr: 'التفرع الغربي المتجه نحو الحدود اللبنانية بفرع الدبوسية-العبودية.',
    notesEn: 'Western spur directed towards the Lebanese frontier at Debboussiyeh.'
  },
  {
    id: 'seg-debboussiyeh-deir-ammar',
    fromNodeId: 'debboussiyeh-border',
    toNodeId: 'deir-ammar-power',
    lengthKm: 30,
    diameterInches: 24,
    status: 'under_maintenance',
    flowDirection: 'south_to_north',
    notesAr: 'الأنبوب اللبناني الأخير المقود لكتلة دير عمار؛ تخضعه شركة TGS المصرية للصيانة المباشرة.',
    notesEn: 'Final 30km Lebanese pipeline under active repair by Egyptian TGS teams.'
  }
];

export const ArabGasPipelineD3Map: React.FC<Props> = ({ 
  language = 'ar',
  onSelectStation 
}) => {
  const isAr = language === 'ar';
  
  // States
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  const [selectedNode, setSelectedNode] = useState<PipelineNode>(PIPELINE_NODES[9]); // Deir Ammar default
  const [isPlayingFlow, setIsPlayingFlow] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'operational' | 'rehabilitating' | 'ofac'>('all');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [isHoveredNode, setIsHoveredNode] = useState<string | null>(null);

  // SVG dimensions
  const [dimensions, setDimensions] = useState({ width: 850, height: 560 });

  // Handle Resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const h = Math.max(480, Math.min(620, Math.round(w * 0.65)));
        setDimensions({ width: w, height: h });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Map D3 Projection
  const projection = useCallback((coords: [number, number]): [number, number] => {
    // Mercator mapping scaled specifically for Eastern Med (Egypt Sinai -> Jordan -> Syria -> Lebanon)
    // Longitude span: 32.5°E to 37.5°E
    // Latitude span: 28.8°N to 35.2°N
    const centerLng = 35.3;
    const centerLat = 32.1;
    
    // Width & Height ratio scaling
    const scale = dimensions.width < 500 ? 5500 : dimensions.width < 800 ? 7500 : 9000;
    
    const p = d3.geoMercator()
      .center([centerLng, centerLat])
      .scale(scale)
      .translate([dimensions.width / 2, dimensions.height / 2]);
      
    const projected = p(coords);
    return projected || [0, 0];
  }, [dimensions]);

  // Main D3 Rendering Effect
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    // Define Gradients and Filters
    const defs = svg.append('defs');

    // Glow Filter
    const filter = defs.append('filter')
      .attr('id', 'agp-glow')
      .attr('x', '-20%')
      .attr('y', '-20%')
      .attr('width', '140%')
      .attr('height', '140%');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Active Flow Linear Gradient
    const flowGrad = defs.append('linearGradient')
      .attr('id', 'pipeline-flow-grad')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    flowGrad.append('stop').attr('offset', '0%').attr('stop-color', '#10b981');
    flowGrad.append('stop').attr('offset', '50%').attr('stop-color', '#f59e0b');
    flowGrad.append('stop').attr('offset', '100%').attr('stop-color', '#ef4444');

    // Background Canvas Rect
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#090d16')
      .attr('rx', 12);

    // Render Grid Overlay Lines
    const gridGroup = svg.append('g').attr('class', 'grid-lines').attr('opacity', 0.15);
    for (let x = 0; x < width; x += 40) {
      gridGroup.append('line')
        .attr('x1', x).attr('y1', 0).attr('x2', x).attr('y2', height)
        .attr('stroke', '#3f3f46').attr('stroke-dasharray', '2,4');
    }
    for (let y = 0; y < height; y += 40) {
      gridGroup.append('line')
        .attr('x1', 0).attr('y1', y).attr('x2', width).attr('y2', y)
        .attr('stroke', '#3f3f46').attr('stroke-dasharray', '2,4');
    }

    // Coastal & Regional Geographic Schematics
    const geoGroup = svg.append('g').attr('class', 'geo-basemap');

    // Mediterranean Sea Label & Polygon Area
    const medSeaCoords: [number, number][] = [
      [32.0, 31.5], [33.8, 31.3], [34.5, 31.8], [34.8, 32.2], 
      [35.1, 33.0], [35.5, 33.9], [35.8, 34.6], [35.9, 35.5],
      [32.0, 35.5]
    ];
    const medSeaPath = medSeaCoords.map((c, i) => {
      const [px, py] = projection(c);
      return `${i === 0 ? 'M' : 'L'} ${px} ${py}`;
    }).join(' ') + ' Z';

    geoGroup.append('path')
      .attr('d', medSeaPath)
      .attr('fill', '#041527')
      .attr('opacity', 0.85)
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 1);

    // Mediterranean Text Label
    const [medX, medY] = projection([33.5, 33.2]);
    geoGroup.append('text')
      .attr('x', medX)
      .attr('y', medY)
      .attr('fill', '#38bdf8')
      .attr('opacity', 0.35)
      .attr('font-size', width < 500 ? '11px' : '14px')
      .attr('font-weight', '900')
      .attr('font-family', 'monospace')
      .attr('letter-spacing', '2px')
      .text(isAr ? 'البحر الأبيض المتوسط' : 'MEDITERRANEAN SEA');

    // Red Sea / Gulf of Aqaba Water Polygon
    const aqabaCoords: [number, number][] = [
      [34.2, 28.5], [34.8, 29.3], [35.0, 29.5], [34.9, 29.3], [34.4, 28.5]
    ];
    const aqabaPath = aqabaCoords.map((c, i) => {
      const [px, py] = projection(c);
      return `${i === 0 ? 'M' : 'L'} ${px} ${py}`;
    }).join(' ') + ' Z';

    geoGroup.append('path')
      .attr('d', aqabaPath)
      .attr('fill', '#021323')
      .attr('opacity', 0.9);

    const [aqX, aqY] = projection([34.5, 28.9]);
    geoGroup.append('text')
      .attr('x', aqX)
      .attr('y', aqY)
      .attr('fill', '#0284c7')
      .attr('opacity', 0.4)
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'monospace')
      .text(isAr ? 'خليج العقبة' : 'GULF OF AQABA');

    // Country Labels on Canvas
    const countryLabels = [
      { nameAr: 'جمهورية مصر العربية', nameEn: 'EGYPT', coords: [33.2, 30.1] as [number, number] },
      { nameAr: 'المملكة الأردنية الهاشمية', nameEn: 'JORDAN', coords: [36.8, 30.8] as [number, number] },
      { nameAr: 'الجمهورية العربية السورية', nameEn: 'SYRIA', coords: [37.3, 33.8] as [number, number] },
      { nameAr: 'الجمهورية اللبنانية', nameEn: 'LEBANON', coords: [35.5, 34.0] as [number, number] }
    ];

    countryLabels.forEach(c => {
      const [cx, cy] = projection(c.coords);
      geoGroup.append('text')
        .attr('x', cx)
        .attr('y', cy)
        .attr('fill', '#71717a')
        .attr('opacity', 0.25)
        .attr('font-size', width < 500 ? '12px' : '16px')
        .attr('font-weight', '900')
        .attr('font-family', 'monospace')
        .attr('text-anchor', 'middle')
        .text(isAr ? c.nameAr : c.nameEn);
    });

    // 3. Render Pipeline Segments
    const pipelinesGroup = svg.append('g').attr('class', 'pipelines');

    PIPELINE_SEGMENTS.forEach(segment => {
      const fromNode = PIPELINE_NODES.find(n => n.id === segment.fromNodeId);
      const toNode = PIPELINE_NODES.find(n => n.id === segment.toNodeId);

      if (!fromNode || !toNode) return;

      const [x1, y1] = projection(fromNode.coordinates);
      const [x2, y2] = projection(toNode.coordinates);

      // Status color code
      let strokeColor = '#10b981'; // Green active
      if (segment.status === 'pending_clearance') strokeColor = '#f59e0b'; // Amber OFAC
      if (segment.status === 'under_maintenance') strokeColor = '#ef4444'; // Red TGS Rehab

      // Base Outer Pipeline Pipe
      pipelinesGroup.append('line')
        .attr('x1', x1).attr('y1', y1)
        .attr('x2', x2).attr('y2', y2)
        .attr('stroke', '#18181b')
        .attr('stroke-width', segment.diameterInches === 36 ? 8 : 6)
        .attr('stroke-linecap', 'round');

      // Inner Pipeline Conduit Line
      const mainPipe = pipelinesGroup.append('line')
        .attr('x1', x1).attr('y1', y1)
        .attr('x2', x2).attr('y2', y2)
        .attr('stroke', strokeColor)
        .attr('stroke-width', segment.diameterInches === 36 ? 3.5 : 2.5)
        .attr('stroke-opacity', 0.85)
        .attr('stroke-linecap', 'round');

      // Animated Gas Flow Pulse Effect
      if (isPlayingFlow) {
        pipelinesGroup.append('line')
          .attr('x1', x1).attr('y1', y1)
          .attr('x2', x2).attr('y2', y2)
          .attr('stroke', segment.status === 'active_flow' ? '#6ee7b7' : segment.status === 'pending_clearance' ? '#fde047' : '#fca5a5')
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', '6, 12')
          .attr('stroke-linecap', 'round')
          .attr('filter', 'url(#agp-glow)')
          .style('animation', `agpFlowAnim ${segment.status === 'active_flow' ? '2.5s' : '4s'} linear infinite`);
      }

      // Length Label in Middle
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      
      pipelinesGroup.append('rect')
        .attr('x', mx - 16)
        .attr('y', my - 8)
        .attr('width', 32)
        .attr('height', 14)
        .attr('fill', '#090d16')
        .attr('stroke', strokeColor)
        .attr('stroke-width', 0.5)
        .attr('rx', 3)
        .attr('opacity', 0.75);

      pipelinesGroup.append('text')
        .attr('x', mx)
        .attr('y', my + 2)
        .attr('fill', '#d4d4d8')
        .attr('font-size', '8px')
        .attr('font-weight', 'bold')
        .attr('font-family', 'monospace')
        .attr('text-anchor', 'middle')
        .text(`${segment.lengthKm}k`);
    });

    // 4. Render Pipeline Nodes
    const nodesGroup = svg.append('g').attr('class', 'pipeline-nodes');

    PIPELINE_NODES.forEach(node => {
      // Filter check
      if (activeFilter === 'operational' && node.status !== 'operational') return;
      if (activeFilter === 'rehabilitating' && node.status !== 'rehabilitating') return;
      if (activeFilter === 'ofac' && node.status !== 'pending_ofac') return;

      const [nx, ny] = projection(node.coordinates);
      const isSelected = selectedNode.id === node.id;
      const isHovered = isHoveredNode === node.id;

      // Color coding
      let nodeColor = '#10b981'; // Green
      if (node.status === 'pending_ofac') nodeColor = '#f59e0b'; // Amber
      if (node.status === 'rehabilitating') nodeColor = '#ef4444'; // Red TGS

      const nodeG = nodesGroup.append('g')
        .attr('class', 'node-item')
        .style('cursor', 'pointer')
        .on('click', () => {
          setSelectedNode(node);
          if (onSelectStation) onSelectStation(node.id);
        })
        .on('mouseenter', () => setIsHoveredNode(node.id))
        .on('mouseleave', () => setIsHoveredNode(null));

      // Pulse Ring for selected / active
      if (isSelected || isHovered) {
        nodeG.append('circle')
          .attr('cx', nx)
          .attr('cy', ny)
          .attr('r', isSelected ? 18 : 14)
          .attr('fill', 'none')
          .attr('stroke', nodeColor)
          .attr('stroke-width', 1.5)
          .attr('stroke-dasharray', '3,3')
          .attr('opacity', 0.9)
          .attr('filter', 'url(#agp-glow)');
      }

      // Node Outer Badge
      nodeG.append('circle')
        .attr('cx', nx)
        .attr('cy', ny)
        .attr('r', node.type === 'hub' ? 10 : node.type === 'power_plant' ? 9 : 7)
        .attr('fill', '#090d16')
        .attr('stroke', nodeColor)
        .attr('stroke-width', isSelected ? 3 : 2);

      // Node Inner Icon Dot
      nodeG.append('circle')
        .attr('cx', nx)
        .attr('cy', ny)
        .attr('r', node.type === 'hub' ? 4 : 3)
        .attr('fill', nodeColor);

      // Node Name Label
      const labelYOffset = ny < height * 0.25 ? 18 : (ny > height * 0.8 ? -14 : -12);
      
      const textBg = nodeG.append('rect')
        .attr('fill', '#090d16')
        .attr('opacity', 0.9)
        .attr('rx', 4)
        .attr('stroke', isSelected ? nodeColor : '#27272a')
        .attr('stroke-width', isSelected ? 1 : 0.5);

      const textEl = nodeG.append('text')
        .attr('x', nx)
        .attr('y', ny + labelYOffset)
        .attr('fill', isSelected ? '#ffffff' : '#e4e4e7')
        .attr('font-size', width < 500 ? '9px' : '11px')
        .attr('font-weight', isSelected ? '900' : 'bold')
        .attr('font-family', 'sans-serif')
        .attr('text-anchor', 'middle')
        .text(isAr ? node.nameAr : node.nameEn);

      // Bounding box for text background
      try {
        const bbox = textEl.node()?.getBBox();
        if (bbox) {
          textBg
            .attr('x', bbox.x - 5)
            .attr('y', bbox.y - 2)
            .attr('width', bbox.width + 10)
            .attr('height', bbox.height + 4);
        }
      } catch {
        // Fallback if getBBox not immediately calculated
      }
    });

  }, [dimensions, projection, selectedNode, isPlayingFlow, activeFilter, isHoveredNode, isAr, onSelectStation]);

  return (
    <div 
      ref={containerRef}
      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 md:p-6 shadow-2xl text-zinc-100 font-sans my-6 overflow-hidden relative"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* CSS Keyframes for D3 Dash Animation */}
      <style>{`
        @keyframes agpFlowAnim {
          0% { stroke-dashoffset: 36; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Flame size={12} className="animate-pulse text-amber-400" />
              {isAr ? 'تحديث تفاعلي D3 • شبكة خط الغاز العربي' : 'D3 INTERACTIVE MAP • ARAB GAS PIPELINE CORRIDOR'}
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-black px-2 py-0.5 rounded-md">
              {isAr ? 'اتفاقية 2025/2026' : 'MoU 2025/2026'}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{isAr ? 'مسار أنبوب الغاز العربي: من العريش إلى دير عمار' : 'Arab Gas Pipeline Route: Arish to Deir Ammar'}</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            {isAr 
              ? 'محاكاة جغرافية وهندسية تفاعلية لمسار ضخ الغاز الطبيعي بين مصر، الأردن، سوريا، ولبنان. اضغط على أي عقدة لاستعراض البيانات التشغيلية وضغوط الشبكة وترخيص أوفاك (OFAC).'
              : 'Interactive D3 geospatial rendering of the regional natural gas transit corridor connecting Egypt, Jordan, Syria, and Lebanon. Click any node for technical & OFAC status.'}
          </p>
        </div>

        {/* CONTROLS & FILTER TOGGLES */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Flow Play/Pause */}
          <button
            onClick={() => setIsPlayingFlow(!isPlayingFlow)}
            className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlayingFlow 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30' 
                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
            }`}
          >
            {isPlayingFlow ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlayingFlow ? (isAr ? 'إيقاف التدفق' : 'Pause Flow') : (isAr ? 'محاكاة التدفق' : 'Simulate Flow')}</span>
          </button>

          {/* Filter Segment Dropdown / Buttons */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 text-xs font-mono">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isAr ? 'الكل' : 'All'}
            </button>
            <button
              onClick={() => setActiveFilter('operational')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeFilter === 'operational' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isAr ? 'تشغيلي' : 'Active'}
            </button>
            <button
              onClick={() => setActiveFilter('rehabilitating')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeFilter === 'rehabilitating' ? 'bg-red-950 text-red-400 border border-red-800' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isAr ? 'تأهيل TGS' : 'TGS Repair'}
            </button>
            <button
              onClick={() => setActiveFilter('ofac')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeFilter === 'ofac' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isAr ? 'إعفاء OFAC' : 'OFAC Waiver'}
            </button>
          </div>
        </div>
      </div>

      {/* MAP SVG CANVAS + SIDE PANEL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG CANVAS CONTAINER (Cols 8) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-zinc-900/60 border border-zinc-800 rounded-xl p-2 relative overflow-hidden group">
          
          {/* MAP CANVAS */}
          <svg 
            ref={svgRef} 
            width={dimensions.width} 
            height={dimensions.height} 
            className="w-full h-auto block rounded-lg transition-transform duration-300"
          />

          {/* MAP LEGEND OVERLAY */}
          <div className="absolute bottom-4 right-4 left-4 md:left-auto bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-lg p-3 text-[10px] font-mono space-y-1.5 shadow-xl">
            <div className="font-bold text-zinc-300 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Layers size={12} className="text-amber-400" />
              <span>{isAr ? 'دليل رموز الشبكة' : 'MAP MAP LEGEND & STATUS'}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span>{isAr ? 'أنبوب عملي نشط' : 'Active Gas Flow'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                <span>{isAr ? 'معبر تحت رخصة OFAC' : 'Pending OFAC Waiver'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                <span>{isAr ? 'تأهيل صيانة (TGS)' : 'TGS Repair Zone'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* STATION DETAILS SIDE PANEL (Cols 5 / 4) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          
          {/* SELECTED NODE CARD */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4 shadow-xl relative overflow-hidden">
            {/* Header Tag */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${
                  selectedNode.status === 'operational' ? 'bg-emerald-500 animate-pulse' : selectedNode.status === 'pending_ofac' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
                <span className="font-mono text-[10px] font-black uppercase text-zinc-400">
                  {selectedNode.type.toUpperCase()} • {isAr ? selectedNode.countryAr : selectedNode.countryEn}
                </span>
              </div>
              <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded border uppercase ${
                selectedNode.status === 'operational'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : selectedNode.status === 'pending_ofac'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-red-500/10 text-red-400 border-red-500/30'
              }`}>
                {selectedNode.status === 'operational' ? (isAr ? 'جاهزية كاملة' : 'OPERATIONAL') : selectedNode.status === 'pending_ofac' ? (isAr ? 'انتظار ترخيص OFAC' : 'OFAC CLEARANCE') : (isAr ? 'صيانة TGS جارٍ' : 'TGS REHABILITATION')}
              </span>
            </div>

            {/* Station Title */}
            <div>
              <h3 className="text-lg font-black text-white leading-snug">
                {isAr ? selectedNode.nameAr : selectedNode.nameEn}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {isAr ? selectedNode.descriptionAr : selectedNode.descriptionEn}
              </p>
            </div>

            {/* Capacity & Operator Metrics */}
            <div className="grid grid-cols-2 gap-2 bg-zinc-950 p-3 rounded-lg border border-zinc-800/80 font-mono text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">{isAr ? 'السعة التشغيلية' : 'Capacity'}</span>
                <span className="font-black text-amber-400 text-sm">{selectedNode.capacity}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">{isAr ? 'الشركة المشغلة' : 'Operator'}</span>
                <span className="font-bold text-zinc-200 truncate block">{isAr ? selectedNode.operatorAr : selectedNode.operatorEn}</span>
              </div>
            </div>

            {/* Technical Specs */}
            {selectedNode.technicalSpecsAr && (
              <div className="bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/50 space-y-1">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase flex items-center gap-1">
                  <Gauge size={12} className="text-emerald-400" />
                  {isAr ? 'المواصفات الهندسية' : 'Technical Specifications'}
                </span>
                <p className="text-xs font-mono text-zinc-300">
                  {isAr ? selectedNode.technicalSpecsAr : selectedNode.technicalSpecsEn}
                </p>
              </div>
            )}

            {/* Fast Station Selector Strip */}
            <div className="pt-2 border-t border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 block mb-2 font-bold uppercase">
                {isAr ? 'محطات خط الغاز العربي' : 'PIPELINE STATIONS SELECTOR'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PIPELINE_NODES.map(n => (
                  <button
                    key={n.id}
                    onClick={() => {
                      setSelectedNode(n);
                      if (onSelectStation) onSelectStation(n.id);
                    }}
                    className={`px-2 py-1 rounded text-[10px] font-mono transition-all cursor-pointer border ${
                      selectedNode.id === n.id
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    {isAr ? n.nameAr.split(' ')[0] : n.nameEn.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MOU EXECUTIVE SUMMARY CARD */}
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-950/20 border border-amber-900/40 rounded-xl p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
              <FileCheck size={16} />
              <span>{isAr ? 'ملخص اتفاقية الغاز المصرية (650M m³)' : 'EGAS-LEBANON AGREEMENT BRIEF'}</span>
            </div>
            <p className="text-zinc-300 leading-relaxed text-[11px]">
              {isAr 
                ? 'تنص اتفاقية كانون الأول 2025/2026 على ضخ 650 مليون متر مكعب سنوياً من الغاز الطبيعي عبر خط الغاز العربي إلى معمل دير عمار شمال لبنان، مما يرفع التوليد بنحو 450 ميغاوات، بانتظار استكمال أعمال الصيانة لشركة TGS وإعفاءات أوفاك.'
                : 'Dec 2025/2026 MoU pledges 650M m³/yr of natural gas to Deir Ammar plant via Arab Gas Pipeline, generating ~450 MW upon completion of Egyptian TGS repairs and US Treasury OFAC waivers.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ArabGasPipelineD3Map;
