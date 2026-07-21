import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Award, 
  Layers, 
  ChevronRight, 
  AlertTriangle,
  CheckCircle,
  Users,
  Trophy,
  Activity,
  ChevronDown,
  Percent,
  Coins,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

interface FifaWorldCupReportProps {
  language: 'ar' | 'en';
}

export const FifaWorldCupReport: React.FC<FifaWorldCupReportProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'narrative' | 'comparison' | 'strategy'>('narrative');
  
  // Custom slider values for interactive simulation
  const [ticketPricingFactor, setTicketPricingFactor] = useState<number>(1.2); // 1.0x to 2.0x
  const [totalMatches, setTotalMatches] = useState<number>(104); // 64 or 104 matches

  // Metrics for FIFA 2026 financial cycle
  const metrics = useMemo(() => [
    {
      id: 'total-revenue',
      titleAr: 'إجمالي الإيرادات المخططة',
      titleEn: 'Total Financial Cycle Revenues',
      value: '$15.0B+',
      subAr: 'توقعات دورة ٢٠٢٣-٢٠٢٦',
      subEn: '2023–2026 Cycle Projected',
      status: 'up',
      percentage: '+100%',
      descAr: 'تخطت حاجز الـ ١٥ مليار دولار مقارنة بـ ٧.٥ مليار في قطر ٢٠٢٢، بفضل توسيع البطولة ونمو مبيعات التذاكر.',
      descEn: 'Exceeded $15B compared to $7.5B in Qatar 2022, driven by a expanded tournament and booming tickets/sponsorship.',
      color: 'border-emerald-600',
      textColor: 'text-emerald-400',
      bgGlow: 'from-emerald-500/10'
    },
    {
      id: 'net-profit',
      titleAr: 'صافي الأرباح المباشرة للفيفا',
      titleEn: 'FIFA Net Direct Profits',
      value: '$3.5B - $4.5B',
      subAr: 'بعد خصم المصروفات والجوائز',
      subEn: 'Post-operating & Prize deductions',
      status: 'up',
      percentage: '+54.3%',
      descAr: 'أرباح قياسية غير مسبوقة تصب مباشرة في خزائن الفيفا المركزية بأقل قدر من مخاطر التكلفة التنظيمية.',
      descEn: 'Record-shattering direct margin flowing to FIFAs central reserves, protected from organizational cost exposures.',
      color: 'border-amber-600',
      textColor: 'text-amber-400',
      bgGlow: 'from-amber-500/10'
    },
    {
      id: 'stadium-costs',
      titleAr: 'تكلفة بناء وتحديث الاستادات',
      titleEn: 'Stadium Construction Costs',
      value: '<$1.0B',
      subAr: 'تغطية محلية شبه كاملة',
      subEn: 'Near-zero FIFA direct outlay',
      status: 'down',
      percentage: '-85.7%',
      descAr: 'على عكس قطر ٢٠٢٢ (~٧ مليار)، اعتمدت البطولة على ملاعب أمريكية وكندية ومكسيكية مقامة وجاهزة بالكامل.',
      descEn: 'Unlike Qatar 2022 (~$7B), the 2026 edition leverages entirely pre-existing stadium infrastructure.',
      color: 'border-red-650',
      textColor: 'text-red-400',
      bgGlow: 'from-red-500/10'
    },
    {
      id: 'forward-grant',
      titleAr: 'ميزانية برنامج Forward 3.0',
      titleEn: 'FIFA Forward 3.0 Grants',
      value: '$2.7B',
      subAr: 'دعم مباشر لـ ٢١١ اتحاداً',
      subEn: 'Direct support for 211 MAs',
      status: 'up',
      percentage: '8x Increase',
      descAr: 'زيادة تاريخية في المنح المالية للاتحادات الوطنية تستخدم كأداة رئيسية لتأمين الدعم الانتخابي لإنفانتينو.',
      descEn: 'Historical spike in direct national association funding, deployed as a crucial pillar for 2027 electoral backing.',
      color: 'border-cyan-600',
      textColor: 'text-cyan-400',
      bgGlow: 'from-cyan-500/10'
    }
  ], []);

  // Pie chart revenue breakdown data
  const revenueBreakdown = useMemo(() => [
    { nameEn: 'TV Broadcast Rights', nameAr: 'حقوق البث التلفزيوني', value: 4.2, color: '#3b82f6' },
    { nameEn: 'Tickets & Hospitality', nameAr: 'التذاكر والضيافة والرفاهية', value: 3.0, color: '#10b981' },
    { nameEn: 'Sponsorships & Commercial', nameAr: 'الرعاية والأنشطة التجارية', value: 2.8, color: '#f59e0b' },
    { nameEn: 'Other Cycle Inflows', nameAr: 'عائدات الدورة الأخرى', value: 5.0, color: '#ec4899' }
  ], []);

  // Compute simulated revenues based on slider interactions
  const simulatedData = useMemo(() => {
    // Base assumptions
    const baseBroadcast = 4.2; 
    const baseTickets = 3.0;
    const baseSponsorship = 2.8;
    const baseOthers = 5.0;

    // Scale tickets based on pricing factor and match scale (64 vs 104 matches is roughly a 1.6x multiplier for stadium capacity)
    const matchScale = totalMatches === 104 ? 1.625 : 1.0;
    const calculatedTickets = baseTickets * ticketPricingFactor * matchScale;
    const calculatedBroadcast = baseBroadcast * (totalMatches === 104 ? 1.25 : 1.0);
    const calculatedSponsorship = baseSponsorship * (totalMatches === 104 ? 1.15 : 1.0);
    
    const totalSimulated = calculatedBroadcast + calculatedTickets + calculatedSponsorship + baseOthers;
    const simulatedProfit = totalSimulated * 0.28; // roughly 28% margin

    return {
      broadcast: Number(calculatedBroadcast.toFixed(2)),
      tickets: Number(calculatedTickets.toFixed(2)),
      sponsorship: Number(calculatedSponsorship.toFixed(2)),
      others: baseOthers,
      total: Number(totalSimulated.toFixed(2)),
      profit: Number(simulatedProfit.toFixed(2))
    };
  }, [ticketPricingFactor, totalMatches]);

  return (
    <div 
      id="fifa-world-cup-profits-report" 
      className="bg-zinc-950 border border-zinc-800 p-4 md:p-6 text-zinc-100 space-y-6"
    >
      {/* Title & Badge */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-5">
        <div className="space-y-1 text-right rtl:text-right ltr:text-left flex-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-none animate-ping shrink-0" />
            <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest bg-amber-950/60 px-2 py-0.5 border border-amber-800">
              {isAr ? 'تحليل هيكلي استقصائي' : 'STRUCTURAL INVESTIGATION'}
            </span>
          </div>
          <h2 className="font-sans font-black text-lg md:text-xl text-white tracking-tight">
            {isAr ? 'أرباح "فيفا" والتكاليف الهيكلية لكأس العالم ٢٠٢٦' : 'FIFA Profits & Structural Cost Model for World Cup 2026'}
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            {isAr ? 'دراسة استثمارية سيادية في توزيع الأعباء بين الحكومات المحلية والفيفا تمهيداً لولاية ٢٠٢٧' : 'Sovereign investment analysis exploring host city debt loads versus FIFA cash flows'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 shrink-0 bg-zinc-900 border border-zinc-800 p-1">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`px-3 py-1 font-sans font-bold text-xs uppercase cursor-pointer transition-all ${
              activeTab === 'narrative'
                ? 'bg-amber-950 text-amber-400 border border-amber-800 shadow-[2px_2px_0px_0px_rgba(245,158,11,1)]'
                : 'text-zinc-400 hover:text-zinc-100 border border-transparent'
            }`}
          >
            {isAr ? '١. التدفق المالي' : '1. Cash Flows'}
          </button>
          
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1 font-sans font-bold text-xs uppercase cursor-pointer transition-all ${
              activeTab === 'comparison'
                ? 'bg-amber-950 text-amber-400 border border-amber-800 shadow-[2px_2px_0px_0px_rgba(245,158,11,1)]'
                : 'text-zinc-400 hover:text-zinc-100 border border-transparent'
            }`}
          >
            {isAr ? '٢. مقارنة ٢٠٢٦ ضد ٢٠٢٢' : '2. 2026 vs 2022'}
          </button>

          <button
            onClick={() => setActiveTab('strategy')}
            className={`px-3 py-1 font-sans font-bold text-xs uppercase cursor-pointer transition-all ${
              activeTab === 'strategy'
                ? 'bg-amber-950 text-amber-400 border border-amber-800 shadow-[2px_2px_0px_0px_rgba(245,158,11,1)]'
                : 'text-zinc-400 hover:text-zinc-100 border border-transparent'
            }`}
          >
            {isAr ? '٣. استراتيجية إنفانتينو ٢٠٢٧' : '3. Infantino 2027'}
          </button>
        </div>
      </div>

      {/* Sovereign Key Metrics Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div 
            key={metric.id}
            className={`border-l-4 ${metric.color} bg-zinc-900/40 p-4 border border-zinc-800 relative overflow-hidden flex flex-col justify-between`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${metric.bgGlow} to-transparent rounded-full blur-2xl pointer-events-none`} />
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
                {isAr ? metric.subAr : metric.subEn}
              </span>
              <h4 className="text-xs font-sans font-black text-zinc-300">
                {isAr ? metric.titleAr : metric.titleEn}
              </h4>
            </div>
            
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-xl md:text-2xl font-mono font-black text-white">
                {metric.value}
              </span>
              <span className={`text-xs font-mono font-bold ${metric.status === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {metric.percentage}
              </span>
            </div>

            <p className="text-[10px] text-zinc-400 font-sans leading-relaxed mt-2 border-t border-zinc-800/80 pt-2">
              {isAr ? metric.descAr : metric.descEn}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'narrative' && (
          <motion.div
            key="narrative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Interactive ROI Simulation Tool & Narrative */}
            <div className="lg:col-span-7 space-y-4 text-right rtl:text-right ltr:text-left">
              <div className="bg-zinc-900/60 border border-zinc-800 p-4 space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <Coins className="text-amber-500 shrink-0" size={16} />
                  <h3 className="font-sans font-black text-xs text-amber-500 uppercase tracking-wider">
                    {isAr ? 'محاكاة العائد المالي: تعديلات بطولة ٢٠٢٦' : 'FINANCIAL RETURN SIMULATOR: 2026 MODES'}
                  </h3>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {isAr 
                    ? 'يتحكم الفيفا بـ ١٠٤ مباريات كاملة بعد رفع عدد الفرق إلى ٤٨ فريقاً. اختبر كيف يؤدي اعتماد سياسات تسعير مرنة أو تغيير نطاق البطولة إلى تضخيم التدفقات النقدية المركزية.'
                    : 'FIFA controls 104 total matches with 48 teams. Adjust the tickets/hospitality premium and the match format below to see how central inflows spike.'}
                </p>

                {/* Simulation Sliders */}
                <div className="space-y-4 bg-zinc-950 p-3 border border-zinc-800 font-mono text-xs">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">{isAr ? 'باقة الضيافة وأسعار التذاكر:' : 'Hospitality & Ticket Premium:'}</span>
                      <span className="text-emerald-400 font-black">{ticketPricingFactor.toFixed(1)}x</span>
                    </div>
                    <input 
                      type="range" 
                      min="1.0" 
                      max="2.0" 
                      step="0.1" 
                      value={ticketPricingFactor} 
                      onChange={(e) => setTicketPricingFactor(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 bg-zinc-800 h-1 rounded-none appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">{isAr ? 'تنسيق البطولة المقترح:' : 'Proposed Tournament Format:'}</span>
                      <span className="text-cyan-400 font-black">{totalMatches} {isAr ? 'مباراة (٤٨ فريقاً)' : 'Matches (48 teams)'}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTotalMatches(64)}
                        className={`flex-1 py-1 text-center font-bold text-xxs border cursor-pointer ${
                          totalMatches === 64 
                            ? 'bg-zinc-800 text-white border-zinc-600' 
                            : 'bg-zinc-900/30 text-zinc-500 border-zinc-800/80 hover:text-zinc-300'
                        }`}
                      >
                        {isAr ? 'النظام القديم (٦٤ مباراة)' : 'Old Format (64 Matches)'}
                      </button>
                      <button
                        onClick={() => setTotalMatches(104)}
                        className={`flex-1 py-1 text-center font-bold text-xxs border cursor-pointer ${
                          totalMatches === 104 
                            ? 'bg-amber-950 text-amber-400 border-amber-800' 
                            : 'bg-zinc-900/30 text-zinc-500 border-zinc-800/80 hover:text-zinc-300'
                        }`}
                      >
                        {isAr ? 'النظام الموسع (١٠٤ مباراة)' : 'Expanded Format (104 Matches)'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Simulated Output Dashboard */}
                <div className="grid grid-cols-2 gap-3 bg-amber-950/20 border border-amber-900/40 p-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-zinc-400 block">{isAr ? 'إجمالي الإيرادات المقدرة' : 'Simulated Total Revenue'}</span>
                    <span className="text-lg font-mono font-black text-amber-400">${simulatedData.total.toFixed(1)}B</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-zinc-400 block">{isAr ? 'صافي أرباح الفيفا الحرة' : 'FIFA Simulated Free Margin'}</span>
                    <span className="text-lg font-mono font-black text-emerald-400">${simulatedData.profit.toFixed(1)}B</span>
                  </div>
                </div>
              </div>

              {/* Direct Analysis Narrative */}
              <div className="space-y-3 font-sans text-xs text-zinc-300 leading-relaxed">
                <p>
                  <strong className="text-white">{isAr ? 'أ) التوسيع الهيكلي للمباريات:' : 'A) Structural Match Expansion:'}</strong>{' '}
                  {isAr 
                    ? 'رفع عدد المباريات من ٦٤ إلى ١٠٤ مباراة رفع سعة البث والترويج الإجمالية وحزم التذاكر بنسبة تتجاوز ٦٠٪، مما شكل قفزة كبرى في ريع عقود البث الفضائي وحزم الضيافة.'
                    : 'Increasing matches from 64 to 104 raised global broadcast capacities, promotion, and ticket inventory by over 60%, creating a major spike in space sales and media licensing.'}
                </p>
                <p>
                  <strong className="text-white">{isAr ? 'ب) مبيعات تذاكر الرفاهية والـ Hospitality:' : 'B) Hospitality & Luxury Ticketing:'}</strong>{' '}
                  {isAr 
                    ? 'ارتفعت إيرادات يوم المباراة ومقاعد كبار الشخصيات من ٩٥٠ مليون دولار في قطر ٢٠٢٢ لتتخطى حاجز الـ ٣.٠ مليار دولار أمريكي، بفضل الطاقة الاستيعابية الفائقة للملاعب الرياضية الكبرى في أمريكا الشمالية.'
                    : 'Matchday and VIP seat ticketing yields shot up from $950M in Qatar 2022 to pass $3.0B, capitalizing on the immense premium seating layouts of major North American venues.'}
                </p>
                <p>
                  <strong className="text-white">{isAr ? 'ج) الرعاية والبث التلفزيوني الرقمي:' : 'C) Broadcast Rights & Digital Sponsorship:'}</strong>{' '}
                  {isAr 
                    ? 'حققت عقود التلفزة للبث المباشر رقماً قياسياً بلغ ٤.٢ مليار دولار، مدعومة بعقود شراكة تجارية ورعاية غير مسبوقة ناهزت ٢.٨ مليار دولار.'
                    : 'Media broadcasting contracts set an all-time record of $4.2B, reinforced by unprecedented commercial partnerships and corporate sponsorships reaching $2.8B.'}
                </p>
              </div>
            </div>

            {/* Visual Chart Breakdown */}
            <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-800 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                <Activity className="text-emerald-500 shrink-0" size={16} />
                <h3 className="font-sans font-black text-xs text-emerald-500 uppercase tracking-wider">
                  {isAr ? 'توزيع هيكل الإيرادات لعام ٢٠٢٦' : '2026 REVENUE STRUCTURE MIX'}
                </h3>
              </div>

              <div className="h-56 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueBreakdown}
                    layout="vertical"
                    margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                  >
                    <XAxis type="number" stroke="#a1a1aa" fontSize={9} tickLine={false} unit="B" />
                    <YAxis 
                      type="category" 
                      dataKey={isAr ? 'nameAr' : 'nameEn'} 
                      stroke="#a1a1aa" 
                      fontSize={8} 
                      width={90}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', fontSize: '10px' }}
                      formatter={(value) => [`$${value}B`, isAr ? 'القيمة' : 'Value']}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Explanatory Note */}
              <div className="bg-zinc-900 border-l-2 border-emerald-500 p-2.5 text-[10px] font-mono text-zinc-400">
                {isAr 
                  ? 'حققت الدورة الحالية (٢٠٢٣–٢٠٢٦) كفاءة تسويقية بنسبة ١٠٠٪ مقارنة بالدورات السابقة؛ حيث ارتفع الطلب على الباقات المدمجة وبوابات الضيافة الذكية.'
                  : 'The current (2023–2026) cycle demonstrates a 100% marketing efficiency improvement over previous cycles, driven by integrated corporate packages and smart booking rails.'}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'comparison' && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            {/* Introductory Explanation */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-4">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-3">
                <AlertTriangle className="text-amber-500 shrink-0" size={16} />
                <h3 className="font-sans font-black text-xs text-amber-500 uppercase tracking-wider">
                  {isAr ? 'تحليل هيكلي للأعباء الرأسمالية: فيفا ضد الحكومات المحلية' : 'CAPITAL EXPOSURE ANALYSIS: FIFA VS HOST CITIES'}
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {isAr 
                  ? 'يكمن السر الرئيسي في تحقيق الفيفا لأعلى هامش ربحي تاريخي في هذه النسخة في قيام حكومات المدن المستضيفة والدافع الضريبي المحلي بتغطية التكاليف التشغيلية الكبرى (الأمن، النقل الداخلي، الخدمات)، في حين تحتفظ الفيفا بالأنصبة الكبرى من مبيعات التذاكر، الرعاية، والبث التلفزيوني.'
                  : 'The primary catalyst for FIFAs record-breaking profit margin is the absolute shifting of massive operational liabilities (security, transport, city logistics) entirely onto host municipalities and local taxpayers, while the governing body retains the key commercial inflows.'}
              </p>
            </div>

            {/* Custom Designed Table */}
            <div className="overflow-x-auto border border-zinc-800 bg-zinc-900/30">
              <table className="w-full text-right rtl:text-right ltr:text-left text-xs font-sans min-w-[600px]">
                <thead>
                  <tr className="bg-zinc-900 text-zinc-400 border-b border-zinc-800">
                    <th className="p-3 font-mono text-[10px] uppercase font-bold">{isAr ? 'بند التكلفة والمؤشرات المالية' : 'Financial Matrix & Indicators'}</th>
                    <th className="p-3 font-mono text-[10px] uppercase font-bold text-amber-400">{isAr ? 'كأس العالم ٢٠٢٦ (أمريكا/المكسيك/كندا)' : 'World Cup 2026 (US/Mex/Can)'}</th>
                    <th className="p-3 font-mono text-[10px] uppercase font-bold text-zinc-400">{isAr ? 'كأس العالم ٢٠٢٢ (قطر)' : 'World Cup 2022 (Qatar)'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  <tr className="hover:bg-zinc-800/30">
                    <td className="p-3 font-bold text-zinc-200">{isAr ? 'إجمالي استثمارات البنية التحتية واللوجستيات' : 'Total Infrastructure & Logistics Outlays'}</td>
                    <td className="p-3 text-amber-400 font-mono font-bold">~ {isAr ? '١٢ إلى ١٤ مليار دولار' : '$12B to $14B'}</td>
                    <td className="p-3 text-zinc-400 font-mono">~ {isAr ? '٢٢٠ مليار دولار' : '$220B'}</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/30 bg-zinc-900/10">
                    <td className="p-3 font-bold text-zinc-200">{isAr ? 'تكاليف بناء وتحديث الاستادات مباشرة' : 'Stadium Construction & Upgrade Costs'}</td>
                    <td className="p-3 text-amber-400 font-mono font-bold">{isAr ? 'أقل من ١ مليار دولار (جاهزية كاملة)' : 'Under $1B (Fully Existing Venues)'}</td>
                    <td className="p-3 text-zinc-400 font-mono">~ {isAr ? '٧ مليار دولار' : '$7B'}</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/30">
                    <td className="p-3 font-bold text-zinc-200">{isAr ? 'التكلفة التشغيلية المباشرة لكل مدينة مستضيفة' : 'Direct Operating Load Per Host City'}</td>
                    <td className="p-3 text-amber-400 font-mono font-bold">{isAr ? '١٠٠ إلى ٢٠٠ مليون دولار لكل مدينة' : '$100M to $200M per city'}</td>
                    <td className="p-3 text-zinc-400 font-mono">{isAr ? 'مدمجة بالكامل في الميزانية الحكومية' : 'Fully absorbed by central treasury'}</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/30 bg-zinc-900/10">
                    <td className="p-3 font-bold text-zinc-200">{isAr ? 'إجمالي الجوائز المالية للمنتخبات' : 'Total Teams Prize Pool'}</td>
                    <td className="p-3 text-amber-400 font-mono font-bold">{isAr ? '٦٥٥ مليون دولار (٥٠ مليون للبطل)' : '$655M ($50M to Champion)'}</td>
                    <td className="p-3 text-zinc-400 font-mono">{isAr ? '٤٤٠ مليون دولار (٤٢ مليون للبطل)' : '$440M ($42M to Champion)'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key Economic Note Card */}
            <div className="bg-amber-950/20 border border-amber-900/60 p-4 flex gap-3 items-start">
              <Trophy className="text-amber-500 shrink-0 mt-0.5" size={18} />
              <div className="space-y-1">
                <h4 className="font-sans font-black text-xs text-white uppercase tracking-wider">
                  {isAr ? 'التحليل الاستراتيجي لهامش الربح الرياضي للفيفا' : 'STRATEGIC INTERPRETATION: SYSTEMIC MARGIN PEAK'}
                </h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {isAr 
                    ? 'بينما اضطرت قطر لاستثمار ما يزيد عن ٢٢٠ مليار دولار في البنى التحتية الشاملة والمترو ومجمعات الاستادات الشاهقة، فإن نموذج ٢٠٢٦ يعتمد على البنية التحتية الترفيهية القائمة مسبقاً في أمريكا الشمالية. هذا التحول ينقل الأعباء المالية والصيانة المستقبلية إلى المجتمعات المحلية، لتتحول البطولة إلى مهرجان استثماري عالي الريعية وبأقل قدر ممكن من المخاطر التشغيلية على الميزانية المركزية للفيفا.'
                    : 'While Qatar invested upwards of $220B in sweeping public infrastructure, municipal rail links, and high-density stadium compounds, the 2026 model exploits existing mega-metropolitan grids. This design shifts depreciation and structural debt onto local cities, allowing FIFA to secure highly de-risked net cash flow margins.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'strategy' && (
          <motion.div
            key="strategy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
          >
            {/* Electoral Roadmap Card */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 space-y-4 text-right rtl:text-right ltr:text-left">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                <Users className="text-cyan-500 shrink-0" size={16} />
                <h3 className="font-sans font-black text-xs text-cyan-500 uppercase tracking-wider">
                  {isAr ? 'خريطة الطريق لانتخابات رئيس الفيفا ٢٠٢٧' : 'THE ROAD TO INFANTINOS 2027 RE-ELECTION'}
                </h3>
              </div>

              <div className="space-y-3 text-xs text-zinc-300 leading-relaxed font-sans">
                <p>
                  {isAr 
                    ? 'يتحرك رئيس الاتحاد الدولي لكرة القدم، جياني إنفانتينو، وفق خطة مالية وسياسية محكمة لاستغلال هذه الأرباح التاريخية قبل دورة الانتخابات الرئاسية للفيفا في عام ٢٠٢٧.'
                    : 'FIFA President Gianni Infantino operates a meticulous politico-financial strategy, translating these massive cash reserves into solid voting loyalty ahead of the 2027 FIFA Presidential Elections.'}
                </p>
                <div className="bg-zinc-950 p-3 border-r-2 border-cyan-500 font-mono space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">{isAr ? 'الاتحادات الداعمة لولاية جديدة:' : 'Associations Pledged for Re-Election:'}</span>
                    <span className="text-cyan-400 font-bold">200+ / 211 MAs</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-none overflow-hidden">
                    <div className="bg-cyan-500 h-full" style={{ width: '95%' }} />
                  </div>
                  <p className="text-[10px] text-zinc-400">
                    {isAr ? 'أعلن إنفانتينو رسمياً تأمين دعم وتأييد الأغلبية المطلقة من الاتحادات الكروية لتجديد ولايته لعام ٢٠٢٧.' : 'Infantino has officially consolidated near-unanimous voting pledges to extend his presidency through 2031.'}
                  </p>
                </div>
              </div>
            </div>

            {/* FIFA Forward Funding Card */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 space-y-4 text-right rtl:text-right ltr:text-left">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                <ShieldCheck className="text-emerald-500 shrink-0" size={16} />
                <h3 className="font-sans font-black text-xs text-emerald-500 uppercase tracking-wider">
                  {isAr ? 'برنامج FIFA Forward 3.0 ومضاعفة الدعم' : 'FIFA FORWARD 3.0 AND THE FUNDING PIPELINE'}
                </h3>
              </div>

              <div className="space-y-3 text-xs text-zinc-300 leading-relaxed font-sans">
                <p>
                  {isAr 
                    ? 'تُمثل زيادة الأرباح الوقود الأساسي لتشغيل برنامج "FIFA Forward 3.0" الموجه لتمويل تطوير كرة القدم في الاتحادات الكروية الـ ٢١١ حول العالم.'
                    : 'The historical cycle cash flow represents the primary engine backing the "FIFA Forward 3.0" developmental program across the 211 member nations.'}
                </p>
                <ul className="list-disc pr-4 pl-4 space-y-2 text-zinc-400 text-xxs font-mono">
                  <li>
                    <strong className="text-zinc-200">{isAr ? 'زيادة ثمانية أضعاف:' : '8-Fold Allocation Growth:'}</strong>{' '}
                    {isAr ? 'ارتفع التمويل والتطوير المالي المباشر ليصل إلى ٢.٧ مليار دولار لدورة (٢٠٢٧–٢٠٣٠) مقارنة بعقد مضى.' : 'Direct development grants scaled to $2.7B for the 2027–2030 cycle, a massive increase compared to 10 years ago.'}
                  </li>
                  <li>
                    <strong className="text-zinc-200">{isAr ? 'تعزيز النفوذ الإقليمي:' : 'Regional Leverage:'}</strong>{' '}
                    {isAr ? 'يتم توجيه هذه الأرصدة لدعم المنشآت المحلية في الدول النامية كعربون كفاءة وتضامن كروي يثبت أركان الإدارة الحالية.' : 'Directly allocating funds to developing football boards strengthens backing for current FIFA leadership across Asia, Africa, and the Caribbean.'}
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Conclusion */}
      <div className="border-t border-zinc-800 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[10px] font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <Calendar size={12} className="text-amber-600" />
          <span>{isAr ? 'تاريخ التحديث: يوليو ٢٠٢٦' : 'Updated: July 2026'}</span>
        </div>
        <div>
          <span>{isAr ? 'المصدر: ورش العمل الإحصائية للفيفا ودراسات Sports Value' : 'Source: FIFA Financial Reports & Sports Value Studies'}</span>
        </div>
      </div>
    </div>
  );
};
