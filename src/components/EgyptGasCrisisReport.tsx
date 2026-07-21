import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Zap, 
  TrendingDown, 
  ChevronRight, 
  AlertTriangle, 
  Activity, 
  FileText, 
  Globe, 
  RefreshCw, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Percent,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Server
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';

interface EgyptGasCrisisReportProps {
  language: 'ar' | 'en';
}

export const EgyptGasCrisisReport: React.FC<EgyptGasCrisisReportProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'comparison' | 'flow' | 'obstacles'>('comparison');
  const [selectedFlowStep, setSelectedFlowStep] = useState<number>(0);
  const [hoveredObstacle, setHoveredObstacle] = useState<string | null>(null);

  // Data for the three-country production comparison
  // Egypt is in Billion Cubic Feet/day (BCF/d) -> 4.2 BCF/d
  // Syria is in Million Cubic Meters/day -> ~7-9 MCM/d which is ~0.25 - 0.31 BCF/d
  // Lebanon is 0 BCF/d
  const productionData = useMemo(() => [
    {
      nameAr: 'مصر',
      nameEn: 'Egypt',
      production: 4.20,
      unitAr: 'مليار قدم مكعب/يوم',
      unitEn: 'Billion cubic feet/day (BCF/d)',
      color: '#f43f5e',
      statusAr: 'أدنى مستوى في ٩ سنوات (عجز حاد)',
      statusEn: '9-Year Low (Severe Deficit)'
    },
    {
      nameAr: 'سوريا',
      nameEn: 'Syria',
      production: 0.28,
      unitAr: 'مليار قدم مكعب/يوم (~٨ مليون م³)',
      unitEn: 'Billion cubic feet/day (~8 MCM/d)',
      color: '#fbbf24',
      statusAr: 'إنتاج متهالك ومستنزف',
      statusEn: 'Crumbling & Depleted Production'
    },
    {
      nameAr: 'لبنان',
      nameEn: 'Lebanon',
      production: 0.00,
      unitAr: 'صفر إنتاج',
      unitEn: 'Zero Production',
      color: '#6b7280',
      statusAr: 'شلل تام واعتماد كلي على الخارج',
      statusEn: 'Complete Standstill / Fully Dependent'
    }
  ], []);

  // Egypt's production decline trend (2021-2026) in BCF/day
  const egyptDeclineData = useMemo(() => [
    { year: '2021', production: 6.2 },
    { year: '2022', production: 5.9 },
    { year: '2023', production: 5.5 },
    { year: '2024', production: 4.8 },
    { year: '2025', production: 4.4 },
    { year: '2026', production: 4.20 }
  ], []);

  // "Swap & Transit" steps
  const flowSteps = useMemo(() => [
    {
      titleAr: '١. الاستيراد والخلط',
      titleEn: '1. Import & Blending',
      descAr: 'تستقبل مصر الغاز الطبيعي عبر الأنابيب من إسرائيل والغاز الطبيعي المسال (LNG) المستورد بأسعار عالمية لتغطية العجز المحلي وتغذية شبكتها القومية.',
      descEn: 'Egypt imports natural gas via pipelines from Israel and LNG cargo shipments at global spot prices to cover its massive domestic deficit and fuel its national grid.',
      statsAr: 'الإنتاج المحلي: 4.2 مليار قدم مكعب/يوم مقابل استيراد قياسي',
      statsEn: 'Local production: 4.2 BCF/d backed by historic LNG import rates'
    },
    {
      titleAr: '٢. تفعيل آلية التبادل والمبادلة (Swap)',
      titleEn: '2. The Swap Mechanism',
      descAr: 'نظراً لصعوبة ضخ غاز مصري مباشر، يتم الاتفاق على مبادلة الشحنات بحيث يتم ضخ كميات مكافئة من الغاز الوارد عبر الشبكة إلى الأردن أو مباشرة إلى الخط العربي للغاز.',
      descEn: 'Since pumping direct Egyptian gas is physically impossible, swap contracts allow equivalent volumes of pipeline gas to be routed through Jordan into the Arab Gas Pipeline.',
      statsAr: 'آلية مرور ذكية بدون استنزاف مباشر للاحتياطي المصري',
      statsEn: 'Smart transit mechanism avoiding direct drainage of Egyptian reserves'
    },
    {
      titleAr: '٣. النقل عبر خط الغاز العربي',
      titleEn: '3. Transit via Arab Gas Pipeline',
      descAr: 'يمر الغاز عبر خط الأنابيب الإقليمي المشترك عابراً الأراضي الأردنية ثم السورية، مع اقتطاع سوريا لنسبة من الغاز كرسوم عبور عينية لتشغيل محطاتها.',
      descEn: 'Gas flows northwards via the regional pipeline traversing Jordanian territory into Syria, which skims off a percentage of the volume as in-kind transit fees.',
      statsAr: 'سوريا تنتج ٧-٩ مليون م³ يومياً وتطمح لزيادة التغذية بالعبور',
      statsEn: 'Syria produces 7-9 MCM/d and seeks to boost supply via transit'
    },
    {
      titleAr: '٤. الوصول ومعالجة دير عمار (لبنان)',
      titleEn: '4. Delivery & Lebanese Generation',
      descAr: 'يصل الغاز في نهاية الأنبوب إلى معمل "دير عمار" في شمال لبنان ليوفر ساعات تغذية كهربائية محدودة بعد تعطل جهود التنقيب الوطنية.',
      descEn: 'The gas finally reaches the "Deir Ammar" power plant in northern Lebanon to restore limited electricity generation after local offshore drilling efforts stalled.',
      statsAr: 'الإنتاج المحلي اللبناني: صفر قدم مكعب',
      statsEn: 'Lebanese domestic gas production: Zero BCF'
    }
  ], []);

  // Obstacles data
  const obstaclesData = useMemo(() => [
    {
      id: 'finance',
      titleAr: '١. أزمة التمويل والضمانات',
      titleEn: '1. Financing & Sovereign Guarantees',
      riskLevelAr: 'مرتفع جداً',
      riskLevelEn: 'Critical',
      color: 'bg-rose-500/10 border-rose-500 text-rose-500',
      descAr: 'يتوقف التنفيذ العملي على تمويل وضمانات من البنك الدولي ومؤسسات دولية، وهي مشروطة بإصلاحات هيكلية حقيقية في قطاع الطاقة اللبناني المتداعي وهو ما يواجه جموداً سياسياً مزمنًا.',
      descEn: 'Implementation hinges on World Bank funding and credit guarantees, which are strictly contingent on structural reforms in the Lebanese power sector currently bottlenecked by political stalemate.'
    },
    {
      id: 'technical',
      titleAr: '٢. الجاهزية الفنية للأنبوب العربي',
      titleEn: '2. Technical Pipeline Integrity',
      riskLevelAr: 'متوسط إلى مرتفع',
      riskLevelEn: 'Moderate to High',
      color: 'bg-amber-500/10 border-amber-500 text-amber-500',
      descAr: 'تضررت أجزاء واسعة من خط الغاز العربي المار بسوريا جراء سنوات الحرب، وتحتاج الأنابيب ومحطات القياس والضغط لعمليات صيانة وتأهيل شاملة تتولاها شركات هندسية مصرية.',
      descEn: 'Significant sections of the Arab Gas Pipeline in Syrian territory suffered war damage. Extensive maintenance, testing, and pressure-station restoration by Egyptian engineering firms are required.'
    },
    {
      id: 'domestic',
      titleAr: '٣. الأولويات الداخلية المصرية',
      titleEn: '3. Egyptian Domestic Priorities',
      riskLevelAr: 'مرتفع',
      riskLevelEn: 'High Risk',
      color: 'bg-orange-500/10 border-orange-500 text-orange-500',
      descAr: 'تواجه الحكومة المصرية ضغوطاً شعبية وصناعية هائلة لوقف انقطاع الكهرباء وتخفيف الأحمال وتوفير الوقود للمصانع الثقيلة المحلية، مما يجعل فكرة تصدير أو تسييل الغاز للغير تحت مجهر الرأي العام الداخلي.',
      descEn: 'The Egyptian government faces massive domestic pressure to stop rolling blackouts, satisfy heavy local industries, and secure power plants, rendering external transit extremely sensitive politically.'
    }
  ], []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6 my-8 text-slate-100 shadow-2xl">
      {/* Header section with badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            {isAr ? 'محاكي أرقام وتحليل الطاقة' : 'Energy Data & Analysis Simulator'}
          </span>
          <h4 className="text-xl font-bold text-white tracking-tight">
            {isAr 
              ? 'التقرير التفاعلي: لغز صفقات الغاز الإقليمية' 
              : 'Interactive Report: The Regional Gas Deal Puzzle'}
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            {isAr 
              ? 'البيانات والأبعاد الجيوسياسية لصفقة الغاز المصري اللبناني السوري لعام ٢٠٢٦' 
              : 'Data & Geopolitical Dimensions of the Egypt-Lebanon-Syria 2026 Gas Pledges'}
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 self-start md:self-auto">
          {(['comparison', 'flow', 'obstacles'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-slate-800 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'comparison' && (isAr ? 'مقارنة الإنتاج' : 'Production Comparison')}
              {tab === 'flow' && (isAr ? 'مسار العبور المتبادل' : 'Swap & Transit Flow')}
              {tab === 'obstacles' && (isAr ? 'مقياس المخاطر والعقبات' : 'Risk & Obstacles')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Container */}
      <div className="min-h-[380px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Comparison */}
          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left explanation card */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h5 className="text-sm font-semibold text-rose-400 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4" />
                    {isAr ? 'عجز تاريخي ومفارقة حادة' : 'Historic Deficit & High Paradox'}
                  </h5>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {isAr 
                      ? 'مصر، التي كانت يوماً مصدراً إقليمياً كبيراً، تعيش حالياً أدنى مستويات إنتاج الغاز منذ 9 سنوات (4.2 مليار قدم مكعبة/يوم). يضطرها هذا العجز لاستيراد شحنات غاز مسال بمليارات الدولارات وتكثيف استيراد الغاز الإسرائيلي عبر الأنابيب لتغطية العجز المحلي الحاد وانقطاع الكهرباء.'
                      : 'Egypt, once a major regional exporter, is grappling with a 9-year low in domestic gas output (4.2 BCF/d). This deficit forces Cairo to import billions in global LNG spot cargoes and boost Israeli pipeline gas imports just to meet its own domestic industrial and power grid demands.'}
                  </p>
                  <p className="text-xs text-slate-400 italic">
                    {isAr
                      ? '* يبلغ إنتاج سوريا المتهالك ما يعادل 0.28 مليار قدم مكعب يومياً فقط، بينما يسجل لبنان صفراً كاملاً.'
                      : '* Syria’s decaying output equates to just 0.28 BCF/d, while Lebanon remains at a absolute flat zero.'}
                  </p>
                </div>

                {/* Micro Stats Card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>{isAr ? 'إنتاج الغاز الإقليمي المقارن' : 'Comparative Regional Production'}</span>
                    <span className="text-rose-500 font-mono font-bold">2026 DATA</span>
                  </div>
                  <div className="space-y-2">
                    {productionData.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-slate-900 last:border-0 pb-1.5 last:pb-0">
                        <span className="text-xs font-semibold text-slate-200">{isAr ? item.nameAr : item.nameEn}</span>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-white" style={{ color: item.color }}>
                            {item.production.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-slate-400 ml-1">
                            {isAr ? 'مليار قدم³/يوم' : 'BCF/d'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Chart Card */}
              <div className="lg:col-span-7 bg-slate-950/40 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div className="mb-4">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
                    {isAr ? 'مقارنة حجم الإنتاج الفعلي (مليار قدم مكعبة/يوم)' : 'Actual Production Volume Comparison (BCF/day)'}
                  </span>
                  <p className="text-[11px] text-slate-500">
                    {isAr ? 'التباين الصارخ في حجم الموارد يظهر كيف تقع مصر في فئة مختلفة بالكامل رغم أزمتها الخانقة' : 'The stark resource contrast shows Egypt remains in a completely different category despite its severe crunch'}
                  </p>
                </div>

                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={productionData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis 
                        dataKey={isAr ? 'nameAr' : 'nameEn'} 
                        stroke="#94a3b8" 
                        fontSize={12}
                        tickLine={false}
                      />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                        formatter={(value: any, name: any, props: any) => [
                          `${value} ${isAr ? 'مليار قدم³/يوم' : 'BCF/d'}`,
                          isAr ? 'الإنتاج المقدر' : 'Estimated Production'
                        ]}
                      />
                      <Bar dataKey="production" radius={[6, 6, 0, 0]} maxBarSize={50}>
                        {productionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-2 text-[10px] text-slate-500 flex justify-between items-center border-t border-slate-800 pt-2">
                  <span>{isAr ? 'المصدر: تحقيقات الاقتصاد الإقليمي ٢٠٢٦' : 'Source: Regional Economy Investigations 2026'}</span>
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>{isAr ? 'مصر' : 'Egypt'}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>{isAr ? 'سوريا' : 'Syria'}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-500 inline-block"></span>{isAr ? 'لبنان' : 'Lebanon'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Swap & Transit Flow */}
          {activeTab === 'flow' && (
            <motion.div
              key="flow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h5 className="text-sm font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 animate-pulse" />
                  {isAr ? 'كيف يتم تسييل الغاز ورقياً عبر الحدود؟' : 'How does the Gas Flow Work on Paper across Boundaries?'}
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isAr
                    ? 'التوقيع المصري ليس التزاماً بتقديم فائض غاز محلي مادي غير موجود بالأساس، وإنما هو تفعيل لآلية "العبور والمبادلة" (Swap & Transit) الجيوسياسية. يوضح المخطط التفاعلي أدناه مراحل النقل الافتراضية والتبادل الهندسي عبر الخط العربي للغاز:'
                    : 'The Egyptian MoUs are not a physical commitment of domestic surplus gas (which doesn’t exist). Instead, they initiate a "Swap & Transit" framework. Explore the step-by-step interactive pipeline model below:'}
                </p>
              </div>

              {/* Step Navigation Dots/Track */}
              <div className="relative">
                <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-800 -translate-y-1/2 z-0 rounded-full" />
                <div className="relative flex justify-between z-10 px-2">
                  {flowSteps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFlowStep(idx)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 border-2 ${
                        selectedFlowStep === idx
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950 scale-110 shadow-lg shadow-emerald-500/20'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Step Panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFlowStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  <div className="md:col-span-8 space-y-3">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                      {isAr ? `المرحلة ${selectedFlowStep + 1} من أصل ٤` : `STAGE ${selectedFlowStep + 1} OF 4`}
                    </span>
                    <h6 className="text-base font-bold text-white">
                      {isAr ? flowSteps[selectedFlowStep].titleAr : flowSteps[selectedFlowStep].titleEn}
                    </h6>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isAr ? flowSteps[selectedFlowStep].descAr : flowSteps[selectedFlowStep].descEn}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-900">
                      <Server className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isAr ? flowSteps[selectedFlowStep].statsAr : flowSteps[selectedFlowStep].statsEn}</span>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex justify-end gap-2">
                    <button
                      disabled={selectedFlowStep === 0}
                      onClick={() => setSelectedFlowStep(prev => prev - 1)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 transition-colors border border-slate-800"
                    >
                      {isAr ? <ArrowLeft className="w-4 h-4 rotate-180" /> : <ArrowLeft className="w-4 h-4" />}
                    </button>
                    <button
                      disabled={selectedFlowStep === flowSteps.length - 1}
                      onClick={() => setSelectedFlowStep(prev => prev + 1)}
                      className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-semibold transition-colors flex items-center gap-1 px-4 text-xs"
                    >
                      <span>{isAr ? 'التالي' : 'Next'}</span>
                      {isAr ? <ArrowRight className="w-3.5 h-3.5 rotate-180" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Pipeline summary note */}
              <div className="text-[11px] text-slate-400 bg-slate-950/20 p-3 rounded-lg border border-slate-800/50 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  {isAr 
                    ? 'التحليل الجيوسياسي: إن إدخال شركات البترول المصرية لصيانة محطات الضغط والأنابيب السورية واللبنانية يُعد تحركاً تجارياً ذكياً يمنح القاهرة حقوق الصيانة والإدارة الفنية والمبيعات الخدمية، تمهيداً للعب دور الموزّع الإقليمي لغاز شرق المتوسط المستقبلي.'
                    : 'Geopolitical Note: Deploying Egyptian oil entities to rehabilitate Syrian and Lebanese networks is a calculated trade strategy that grants Cairo commercial maintenance, technical footprint, and engineering services revenue, securing its ultimate seat as the Eastern Mediterranean coordinator.'}
                </span>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Obstacles & Risk Matrix */}
          {activeTab === 'obstacles' && (
            <motion.div
              key="obstacles"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {obstaclesData.map((obstacle) => (
                <div
                  key={obstacle.id}
                  onMouseEnter={() => setHoveredObstacle(obstacle.id)}
                  onMouseLeave={() => setHoveredObstacle(null)}
                  className={`p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    hoveredObstacle === obstacle.id 
                      ? 'bg-slate-950 border-slate-700 scale-[1.02] shadow-xl' 
                      : 'bg-slate-950/40 border-slate-800'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h6 className="text-sm font-bold text-white leading-snug">
                        {isAr ? obstacle.titleAr : obstacle.titleEn}
                      </h6>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase shrink-0 ${obstacle.color}`}>
                        {isAr ? obstacle.riskLevelAr : obstacle.riskLevelEn}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isAr ? obstacle.descAr : obstacle.descEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      {isAr ? 'عائق تنفيذي جوهري' : 'Execution Bottleneck'}
                    </span>
                    <span className="font-mono">
                      {obstacle.id === 'finance' ? '95% RISK' : obstacle.id === 'technical' ? '70% RISK' : '85% RISK'}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
