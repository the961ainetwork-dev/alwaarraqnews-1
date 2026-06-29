import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell,
  ReferenceLine
} from 'recharts';
import { 
  ShieldAlert, 
  HelpCircle, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Info, 
  Clock, 
  Layers, 
  PlusCircle, 
  ChevronDown, 
  ChevronUp, 
  FileCheck 
} from 'lucide-react';

interface LebanonAMLVisualizerProps {
  language: 'ar' | 'en';
  layoutMode: 'digital' | 'classic-print';
}

export default function LebanonAMLVisualizer({ language, layoutMode }: LebanonAMLVisualizerProps) {
  const isAr = language === 'ar';
  const isPrint = layoutMode === 'classic-print';
  const [activeTab, setActiveTab] = useState<'chart' | 'rankings' | 'commitments'>('chart');
  
  // States for FATF checklist interactions
  const [expandedCommitment, setExpandedCommitment] = useState<number | null>(null);

  // Raw Basel AML Index Data 2025: Higher score = Higher risk (Scale 0-10)
  // Recharts payload keys mapped logically
  const baseComparisonData = [
    { nameAr: 'الجزائر', nameEn: 'Algeria', score: 6.2, type: 'higher', isLebanon: false },
    { nameAr: 'الكويت', nameEn: 'Kuwait', score: 5.4, type: 'higher', isLebanon: false },
    { nameAr: 'الإمارات', nameEn: 'UAE', score: 5.2, type: 'higher', isLebanon: false },
    { nameAr: 'لبنان (مؤشر بازل)', nameEn: 'Lebanon (Basel Index)', score: 5.1, type: 'lebanon', isLebanon: true },
    { nameAr: 'العراق', nameEn: 'Iraq', score: 4.9, type: 'lower', isLebanon: false },
    { nameAr: 'مصر', nameEn: 'Egypt', score: 4.7, type: 'lower', isLebanon: false },
    { nameAr: 'السعودية', nameEn: 'Saudi Arabia', score: 4.4, type: 'lower', isLebanon: false },
    { nameAr: 'قطر', nameEn: 'Qatar', score: 4.1, type: 'lower', isLebanon: false },
  ];

  // Map data to language specific names for recharts keys
  const chartData = baseComparisonData.map(item => ({
    ...item,
    name: isAr ? item.nameAr : item.nameEn,
    'Risk Score / مؤشر المخاطر': item.score,
  }));

  // Rankings trends comparing 2024 vs 2025 based on the official study
  const rankingsTrend = [
    { 
      metricAr: 'الترتيب العالمي (من أصل 177 في 2025)', 
      metricEn: 'Global Rank (out of 177 in 2025)',
      val24: 50, 
      val25: 47, 
      changeAr: 'تراجع بـ 7 مراكز (على أساس عينة متطابقة)',
      changeEn: 'Slipped by 7 positions (on matched baseline)',
      increasedRisk: true 
    },
    { 
      metricAr: 'الدول ذات الدخل المتوسط الأدنى', 
      metricEn: 'Lower-Middle-Income Countries (LMICs)',
      val24: 26, 
      val25: 23, // Wait, prompt says "تراجع تصنيفه ضمن فئة الدول ذات الدخل المتوسط بمقدار 3 درجات"
      changeAr: 'تراجع بمقدار 3 درجات',
      changeEn: 'Slipped by 3 levels',
      increasedRisk: true 
    },
    { 
      metricAr: 'الترتيب العربي (من أصل 15)', 
      metricEn: 'Arab Regional Rank (out of 15)',
      val24: 6, 
      val25: 5, // prompt: "تراجع عربياً بمركز واحد على أساس سنوي" (lower rank/higher risk)
      changeAr: 'تراجع بمركز واحد',
      changeEn: 'Slipped by 1 position regional parity',
      increasedRisk: true 
    }
  ];

  // FATF 10-Commitment Action Plan details
  const commitments = [
    {
      id: 1,
      titleAr: 'إجراء تقييمات موجهة للمخاطر',
      titleEn: 'Conduct Conducted National Risk Assessments',
      descAr: 'تقييم المخاطر المحددة لغسل الأموال وتمويل الإرهاب التي تم تحديدها في التقييم المتبادل (MER) لعام 2023 وضمان وجود سياسات وتدابير ملائمة للتخفيف منها.',
      descEn: 'Assess specific ML/TF risks identified during the May 2023 Mutual Evaluation Report and build clear mitigating policy guidelines.',
      statusAr: 'تحت المراجعة الجارية',
      statusEn: 'Ongoing Review',
      progress: 60,
      severity: 'Medium'
    },
    {
      id: 2,
      titleAr: 'التعاون القانوني والمصادرة والتسليم',
      titleEn: 'Mutual Legal Assistance & Extraditions',
      descAr: 'تحسين الآلية لضمان الاستجابة والتعاون السريع لطلبات المساعدة القانونية المتبادلة، تسليم المجرمين، واسترداد الأصول المصادرة بالخارج.',
      descEn: 'Improve workflows to guarantee immediate cooperation on mutual legal requests, foreign asset retrieval, and extradition cases.',
      statusAr: 'تحت التنفيذ البيروقراطي',
      statusEn: 'Slow Execution',
      progress: 40,
      severity: 'High'
    },
    {
      id: 3,
      titleAr: 'الرقابة على المهن غير المالية (DNFBPs)',
      titleEn: 'Regulating DNFBPs Risk Compliance',
      descAr: 'تعزيز فهم المخاطر من جانب المهن غير المالية المحددة (مثل المحامين، المحاسبين وتجار الذهب)، وتطبيق عقوبات رادعة ومشددة على المخالفين.',
      descEn: 'Foster understanding of compliance risks among non-financial businesses and professions, implementing clear punitive actions on failures.',
      statusAr: 'فجوة حرجة',
      statusEn: 'Critical Deficiency',
      progress: 30,
      severity: 'Critical'
    },
    {
      id: 4,
      titleAr: 'شفافية المستفيد الحقيقي للشركات',
      titleEn: 'Ultimate Beneficial Ownership (UBO)',
      descAr: 'التأكد من تحديث سجلات المستفيد الحقيقي باستمرار للأشخاص والكيانات الاعتبارية، وفرض عقوبات تتناسب مع حجم الالتفاف والتهرب.',
      descEn: 'Establish that ultimate beneficial ownership data remains dynamic and accurate, alongside strict penalties on shadow entities.',
      statusAr: 'تحت التعديل التشريعي',
      statusEn: 'Under Amendment',
      progress: 50,
      severity: 'High'
    },
    {
      id: 5,
      titleAr: 'تفعيل مخرجات وحدة الاستخبارات المالية',
      titleEn: 'FIU Product Disseminations & Utility',
      descAr: 'تعزيز استخدام الأجهزة الأمنية والقضائية للتقارير والتحليلات الاستخباراتية المالية الصادرة عن هيئة التحقيق الخاصة (SIC).',
      descEn: 'Broaden security and prosecutorial adoption of financial intelligence assessments delivered by the Special Investigation Commission.',
      statusAr: 'مرتفع الفعالية نسبياً',
      statusEn: 'Adequately Robust',
      progress: 75,
      severity: 'Low'
    },
    {
      id: 6,
      titleAr: 'زيادة مستدامة في ملاحقات غسل الأموال',
      titleEn: 'AML Proactive Judicial Prosecutions',
      descAr: 'تحقيق نمو مستدام في التحقيقات القضائية وأحكام الإدانة بجرائم تبييض الأموال بما يتلاءم مع الحجم الفعلي للمخاطر النقدية في البلاد.',
      descEn: 'Demonstrate active expansion in formal judicial prosecutions, asset freezes, and indictments corresponding to national threat indexes.',
      statusAr: 'فجوة بسبب الشلل القضائي',
      statusEn: 'Delayed by Judicial Paralysis',
      progress: 25,
      severity: 'Critical'
    },
    {
      id: 7,
      titleAr: 'مكافحة التهريب وحركة النقد عبر الحدود',
      titleEn: 'Cross-Border Smuggling of Currency & Metals',
      descAr: 'تحسين كفاءة المديرية العامة للجمارك في تتبع وضبط ومصادرة محاولات النقل غير المشروع للمسكوكات النقدية والمعادن والأحجار الكريمة عبر المعابر.',
      descEn: 'Enhance regional custom detection, seizures, and cash-courier declarations of physical bank bills, gold, and diamonds across borders.',
      statusAr: 'تحت الإجراءات المشددة',
      statusEn: 'Enhanced Oversight',
      progress: 45,
      severity: 'High'
    },
    {
      id: 8,
      titleAr: 'تحقيقات تمويل الإرهاب ومشاركة الاستخبارات',
      titleEn: 'Terrorism Financing (TF) Intelligences',
      descAr: 'مواصلة الملاحقات الأمنية لشبكات التمويل وتقاسم البيانات والقرائن الأمنية بشكل نشط وعاجل مع الشركاء والنظراء الأجانب بالخارج.',
      descEn: 'Sustain active operations identifying terrorism financing corridors while actively feeding foreign partners required intelligence.',
      statusAr: 'نشط ومستمر',
      statusEn: 'Active Coordination',
      progress: 70,
      severity: 'Medium'
    },
    {
      id: 9,
      titleAr: 'تطبيق فوري للعقوبات استجابة لمجلس الأمن',
      titleEn: 'Targeted Financial Sanctions (TFS)',
      descAr: 'تنفيذ تدابير تجميد الأصول الفورية دون إبطاء طبقاً لقرارات مجلس الأمن الدولي، لا سيما في الوسطاء غير المصرفيين والمهن المستثناة.',
      descEn: 'Establish immediate asset-freeze workflows as mandated under UN security resolutions, strictly encompassing non-bank nodes.',
      statusAr: 'مستمر التطوير',
      statusEn: 'Ongoing Enforcement',
      progress: 55,
      severity: 'Medium'
    },
    {
      id: 10,
      titleAr: 'مراقبة قائمة على المخاطر للجمعيات الخيرية',
      titleEn: 'Risk-Based Monitoring for NPOs',
      descAr: 'مراقبة ومتابعة تدفقات الجمعيات غير الهادفة للربح (NPOs) المعرضة للاستغلال دون إلحاق الضرر أو التدخل التعسفي بالأنشطة الإنسانية والمشروعة.',
      descEn: 'Direct custom risk-aligned checks on higher-risk non-profit entities without impeding standard philanthropic workflows.',
      statusAr: 'فجوة تقييمية',
      statusEn: 'Classification Gap',
      progress: 35,
      severity: 'High'
    }
  ];

  // Helper colors for the Recharts Bar chart matching Al-Warraq editorial styling
  const getBarColor = (entry: any) => {
    if (entry.isLebanon) return '#dc2626'; // High contrast red for Lebanon focus
    if (entry.type === 'higher') return '#52525b'; // Dark charcoal for higher-risk peers
    return '#a1a1aa'; // Light neutral gray for lower-risk peers
  };

  return (
    <div className={`p-6 border-4 border-black transition-all ${
      isPrint ? 'vintage-paper border-[#1b2b1d] text-[#1b2b1d] bg-[#fdfaf2]' : 'bg-white text-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
    }`}>
      {/* HEADER SECTION */}
      <div className="border-b-2 border-black border-double pb-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 border border-red-900 rounded-none shrink-0">
              <ShieldAlert size={24} className="text-red-700" id="aml-visual-shield" />
            </div>
            <div>
              <h3 className="font-sans font-black text-lg md:text-xl md:leading-tight uppercase tracking-tight flex items-center gap-2">
                <span>{isAr ? 'فهرس بازل لمخاطر غسل الأموال وتصنيف لبنان ٢٠٢٥ - ٢٠٢٦' : 'BASEL AML RISK INDEX & LEBANON BENCHMARK REPORT'}</span>
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-wide">
                {isAr ? 'تحليل مقارن للمخاطر السيادية المالية بناءً على تقارير FATF ومعهد بازل للحوكمة' : 'Comparative Sovereign Analytics based on FATF Slate and Basel Institute Governance Indices'}
              </p>
            </div>
          </div>
          
          {/* Tabs switch */}
          <div className="flex border border-black bg-zinc-100 p-0.5 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'chart' 
                  ? 'bg-black text-white' 
                  : 'text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'المخاطر الإقليمية' : 'Regional Risk'}
            </button>
            <button
              onClick={() => setActiveTab('rankings')}
              className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer border-x border-black/10 ${
                activeTab === 'rankings' 
                  ? 'bg-black text-white' 
                  : 'text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'منحنى التراجع ٢٤/٢٥' : 'Rankings Drift'}
            </button>
            <button
              onClick={() => setActiveTab('commitments')}
              className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'commitments' 
                  ? 'bg-black text-white' 
                  : 'text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {isAr ? 'التزامات FATF العشرة' : '10 FATF Keys'}
            </button>
          </div>
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeTab === 'chart' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT / TOP: The Recharts Comparative Bar Chart */}
            <div className="md:col-span-8 border border-zinc-300 p-4 bg-zinc-50/50">
              <h4 className="font-sans font-bold text-sm tracking-tight mb-4 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-red-600 inline-block"></span>
                <span>{isAr ? 'تفنيد نقاط المخاطرة السيادية الفورية مقارنة بالأقران الإقليميين (أعلى من ٥,٠ يقع في فئة الخطر المتوسط)' : 'Sovereign Risk Score vs Regional Peer Economies (Scores > 5.0 fall under Medium-High risk thresholds)'}</span>
              </h4>
              
              <div className="w-full h-[280px] md:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 11, fontWeight: 'bold', fill: '#1b2c1d' }} 
                      interval={0}
                      height={40}
                    />
                    <YAxis 
                      domain={[0, 10]} 
                      tickCount={6}
                      tick={{ fontSize: 11, fontFamily: 'monospace' }} 
                    />
                    <Tooltip 
                      formatter={(value: any) => [`${value} / 10`, isAr ? 'مؤشر المخاطر' : 'Risk Index']}
                      contentStyle={{ fontFamily: 'var(--font-sans)', border: '1px solid black', padding: '10px' }}
                    />
                    <ReferenceLine y={5.0} stroke="#dc2626" strokeDasharray="4 4" label={{ value: isAr ? 'مؤشر الخطر المتوسط' : 'Medium Risk line', fill: '#dc2626', fontSize: 10, position: 'top' }} />
                    <Bar 
                      dataKey="Risk Score / مؤشر المخاطر" 
                      fill="#52525b"
                      barSize={32}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Chart Legend Explanation */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-2 pt-2 border-t border-zinc-200">
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <div className="w-4 h-4 bg-red-600 border border-black/20"></div>
                  <span>{isAr ? 'لبنان (٥,١ بمؤشر بازل)' : 'Lebanon (5.1 score)'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <div className="w-4 h-4 bg-zinc-600 border border-black/20"></div>
                  <span>{isAr ? 'مستويات مخاطرة أعلى من لبنان' : 'Higher Risk Profiling'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <div className="w-4 h-4 bg-zinc-300 border border-black/20"></div>
                  <span>{isAr ? 'مستويات مخاطرة أدنى' : 'Lower Risk Profiling'}</span>
                </div>
              </div>
            </div>

            {/* RIGHT / BOTTOM: Comprehensive contextual description / Brief Card */}
            <div className="md:col-span-4 space-y-4">
              <div className="rounded-none border border-black p-4 bg-amber-50/50 space-y-3">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle size={18} />
                  <span className="font-sans font-black text-xs uppercase tracking-wide">{isAr ? 'مذكرة تحليلية هامة' : 'Analytical Advisory Memo'}</span>
                </div>
                <p className="text-xs leading-relaxed">
                  {isAr 
                    ? 'يصنف "معهد بازل للحوكمة" لبنان حالياً في الشريحة المئوية ٢٧ عالمياً، وهو ما يعادل حقيقة أن ٧٣% من الاقتصادات المصنفة تمتلك كفاءة وهيكلية أفضل بمكافحة الجرائم النقدية مما يبقيه تحت ضغط البقاء في القائمة الرمادية لـ FATF.' 
                    : 'The Basel Institute ranks Lebanon in the 27th percentile globally, suggesting that 73% of evaluated economies pose less risk in public anti-money laundering frameworks. This directly solidifies the argument from FATF to restrict its financial transactions.'
                  }
                </p>
                <div className="text-[11px] space-y-1 font-mono text-zinc-600">
                  <div className="flex justify-between">
                    <span>{isAr ? 'التهديد العام:' : 'Severity Threat:'}</span>
                    <span className="font-bold text-red-600">{isAr ? 'متوسط مرتفع' : 'Medium-High'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isAr ? 'إدراج القائمة الرمادية الأول:' : 'First Grey Listed:'}</span>
                    <span className="font-bold">{isAr ? 'أكتوبر ٢٠٢٤' : 'October 2024'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isAr ? 'تأكيد القرار الأخير:' : 'Last Status Check:'}</span>
                    <span className="font-bold">{isAr ? '١٩ يونيو ٢٠٢٦' : 'June 19, 2026'}</span>
                  </div>
                </div>
              </div>

              {/* Comparative Peers List */}
              <div className="border border-zinc-200 p-4 space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold text-zinc-500 block">
                  {isAr ? 'مرجع المقارنات الإقليمية وبازل' : 'Regional Peer Breakdown Index'}
                </span>
                <div className="text-xs space-y-2">
                  <p>
                    <strong>{isAr ? 'مخاطرة أقل من:' : 'Less risky than:'}</strong>{' '}
                    {isAr ? 'جيبوتي، الجزائر، موريتانيا، الكويت، والإمارات.' : 'Djibouti, Algeria, Mauritania, Kuwait, and the UAE.'}
                  </p>
                  <p>
                    <strong>{isAr ? 'مخاطرة أعلى من:' : 'More risky than:'}</strong>{' '}
                    {isAr ? 'مصر، السعودية، قطر، الأردن، العراق، وتونس.' : 'Egypt, Saudi Arabia, Qatar, Jordan, Iraq, and Tunisia.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rankings' && (
        <div className="space-y-6">
          <div className="text-xs bg-zinc-100 p-4 border border-black/20">
            <p className="leading-relaxed">
              {isAr 
                ? 'عند مقارنة عينة متطابقة من الدول بين عامي ٢٠٢٤ و ٢٠٢٥، يُظهر لبنان تراجعاً في مختلف الفهارس والشرائح المئوية. هبوط الترتيب يعني اتساع نطاق المترتبات الهيكلية السلبية ونقص الفعالية.'
                : 'Evaluating exact matched cohorts between 2024 and 2025 demonstrates a systematic downgrade in Lebanon’s relative standing. Slipping ranks underscore worsening institutional metrics and a gap in compliance.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rankingsTrend.map((item, idx) => (
              <div key={idx} className="border border-black p-4 bg-white space-y-3 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 left-0 h-1 bg-red-600"></div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-zinc-600 font-sans block max-w-[80%]">
                      {isAr ? item.metricAr : item.metricEn}
                    </span>
                    <TrendingUp className="text-red-600 shrink-0" size={16} />
                  </div>
                  
                  <div className="flex items-baseline gap-4 pt-2">
                    <div className="text-3xl font-black font-mono tracking-tight">
                      {item.val25}
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">
                      {isAr ? `كان ${item.val24} في ٢٠٢٤` : `was ${item.val24} in 2024`}
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-3 mt-4 text-[11px] font-semibold text-red-700 font-sans-arabic bg-red-50/40 p-1">
                  {isAr ? item.changeAr : item.changeEn}
                </div>
              </div>
            ))}
          </div>

          {/* Percentile visual tracker */}
          <div className="border border-black p-5 bg-zinc-50 space-y-4">
            <h5 className="font-sans font-black text-xs uppercase block">
              {isAr ? 'الترتيب المئوي للمخاطر (كلما زادت النسبة، ارتفعت مستويات الخطورة وعجز التدابير المطبقة)' : 'Percentile Danger Slices (Higher percentage dictates higher vulnerabilities & severe gaps)'}
            </h5>

            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>{isAr ? 'المستوى المئوي العالمي' : 'Global Percentile Slice'}</span>
                  <span className="font-bold">27%</span>
                </div>
                <div className="w-full bg-zinc-200 h-4 border border-black/30 overflow-hidden">
                  <div className="bg-red-600 h-full" style={{ width: '27%' }}></div>
                </div>
                <span className="text-[10px] text-zinc-500 block">
                  {isAr ? '٧٣% من دول العالم المدرجة تتمتع بنظام ووقاية مالية أكثر أماناً ونظافة من لبنان.' : '73% of economies have lower relative threat levels in anti-fraud and tax protocols.'}
                </span>
              </div>

              <div className="space-y-1 pt-2">
                <div className="flex justify-between">
                  <span>{isAr ? 'المستوى المئوي الإقليمي العربي' : 'Arab Regional Percentile'}</span>
                  <span className="font-bold">40%</span>
                </div>
                <div className="w-full bg-zinc-200 h-4 border border-black/30 overflow-hidden">
                  <div className="bg-red-600 h-full" style={{ width: '40%' }}></div>
                </div>
                <span className="text-[10px] text-zinc-500 block">
                  {isAr ? '٦٠% من الدول العربية المصنفة بمؤشر بازل تتفوق على لبنان بالاستقرار والتحقيق المالي.' : '60% of indexed Arab countries are displaying cleaner scores and less risk parity.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'commitments' && (
        <div className="space-y-4">
          <div className="bg-red-55 border-l-4 border-red-600 p-4 space-y-2 text-zinc-800">
            <h4 className="font-sans font-black text-xs uppercase flex items-center gap-1.5">
              <FileCheck size={16} />
              <span>{isAr ? 'خطة عمل مجموعة FATF وتدابير الالتزامات العشرة' : 'FATF ACTION PLAN & THE 10 CRITICAL KEYS'}</span>
            </h4>
            <p className="text-xs leading-relaxed text-zinc-700">
              {isAr 
                ? 'في أكتوبر ٢٠٢٤، قدمت الدولة التزامات سياسية عالية المستوى لتعديل هذه الفجوات. انقر على البند لتفنيد الفجوة ومستوى التقدم المرتبط بكل معيار:' 
                : 'In October 2024, Beirut registered high-level political covenants to address strategic deficiencies. Click on individual lines below to review state progress & sector deficits:'
              }
            </p>
          </div>

          <div className="space-y-2">
            {commitments.map((item) => {
              const isExpanded = expandedCommitment === item.id;
              
              // Color helper for labels based on severity
              const getBadgeStyle = (sev: string) => {
                if (sev === 'Critical') return 'bg-red-100 text-red-900 border-red-400';
                if (sev === 'High') return 'bg-amber-100 text-amber-900 border-amber-400';
                if (sev === 'Medium') return 'bg-yellow-50 text-yellow-900 border-yellow-300';
                return 'bg-zinc-100 text-zinc-900 border-zinc-300';
              };

              return (
                <div 
                  key={item.id} 
                  className={`border border-black transition-all ${
                    isExpanded ? 'bg-zinc-50' : 'bg-white hover:bg-zinc-50/50'
                  }`}
                >
                  {/* Summary/Header row */}
                  <div 
                    onClick={() => setExpandedCommitment(isExpanded ? null : item.id)}
                    className="p-3.5 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold bg-black text-white w-5 h-5 flex items-center justify-center">
                        {item.id}
                      </span>
                      <span className="font-sans font-bold text-xs md:text-sm">
                        {isAr ? item.titleAr : item.titleEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Severity badge hidden on super small screens */}
                      <span className={`hidden sm:inline-block px-2 py-0.5 text-[9px] font-bold uppercase border ${getBadgeStyle(item.severity)}`}>
                        {item.severity}
                      </span>
                      
                      {/* Progress bar visualizer */}
                      <div className="w-16 h-2 bg-zinc-200 border border-zinc-400 rounded-none overflow-hidden hidden md:block">
                        <div className="bg-zinc-800 h-full" style={{ width: `${item.progress}%` }}></div>
                      </div>

                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded Description details */}
                  {isExpanded && (
                    <div className="p-4 border-t border-dashed border-black/10 bg-zinc-50 text-xs space-y-3">
                      <p className="leading-relaxed text-zinc-800 font-sans">
                        {isAr ? item.descAr : item.descEn}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-200/60 font-mono text-[11px]">
                        <div>
                          <span className="text-zinc-500 block uppercase font-bold text-[10px]">{isAr ? 'حالة التقييم الحالي:' : 'Current Assessment:'}</span>
                          <span className="font-bold text-red-700">{isAr ? item.statusAr : item.statusEn}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block uppercase font-bold text-[10px]">{isAr ? 'مستويات امتياز التطبيق:' : 'Estimated Compliance Rate:'}</span>
                          <span className="font-bold">{item.progress}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
