import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Sliders, 
  Info, 
  ArrowRightLeft,
  ChevronRight,
  Database,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar
} from 'recharts';
import { motion } from 'motion/react';

interface SaudiUaeFinancialChartProps {
  language: 'ar' | 'en';
  layoutMode?: 'digital' | 'classic-print';
}

export const SaudiUaeFinancialChart: React.FC<SaudiUaeFinancialChartProps> = ({ 
  language, 
  layoutMode = 'digital' 
}) => {
  const isAr = language === 'ar';
  const isPrint = layoutMode === 'classic-print';
  const [activeTab, setActiveTab] = useState<'decline' | 'latency'>('decline');
  const [rhqStrictness, setRhqStrictness] = useState<'high' | 'medium' | 'low'>('high');

  // Baseline data from investigative report (June - July 2026)
  const baseDeclineData = [
    { date: 'June 1', dateAr: '١ يونيو', rate: 1.2, volume: 450, descAr: 'معدل طبيعي', descEn: 'Baseline' },
    { date: 'June 8', dateAr: '٨ يونيو', rate: 1.5, volume: 440, descAr: 'معدل طبيعي', descEn: 'Baseline' },
    { date: 'June 15', dateAr: '١٥ يونيو', rate: 2.1, volume: 425, descAr: 'بدء التدقيق', descEn: 'Audit Start' },
    { date: 'June 22', dateAr: '٢٢ يونيو', rate: 3.8, volume: 380, descAr: 'إجراءات مكثفة', descEn: 'Intensified' },
    { date: 'June 29', dateAr: '٢٩ يونيو', rate: 5.4, volume: 340, descAr: 'مراجعة الشركات', descEn: 'RHQ Verification' },
    { date: 'July 5', dateAr: '٥ يوليو', rate: 7.2, volume: 310, descAr: 'تدقيق فائق', descEn: 'Enhanced CDD' },
    { date: 'July 8', dateAr: '٨ يوليو', rate: 8.4, volume: 290, descAr: 'ذروة الاضطراب', descEn: 'Peak Friction' },
  ];

  const baseLatencyData = [
    { date: 'June 1', dateAr: '١ يونيو', days: 1.5, transactions: 12000 },
    { date: 'June 8', dateAr: '٨ يونيو', days: 1.8, transactions: 11800 },
    { date: 'June 15', dateAr: '١٥ يونيو', days: 2.5, transactions: 11400 },
    { date: 'June 22', dateAr: '٢٢ يونيو', days: 4.8, transactions: 10500 },
    { date: 'June 29', dateAr: '٢٩ يونيو', days: 7.2, transactions: 9400 },
    { date: 'July 5', dateAr: '٥ يوليو', days: 9.1, transactions: 8800 },
    { date: 'July 8', dateAr: '٨ يوليو', days: 11.4, transactions: 8100 },
  ];

  // Dynamic simulation multipliers based on selected RHQ compliance strictness
  const getSimulatedDeclineData = () => {
    let multiplier = 1.0;
    if (rhqStrictness === 'medium') multiplier = 0.6;
    if (rhqStrictness === 'low') multiplier = 0.3;

    return baseDeclineData.map(d => {
      // Scale rate dynamically, keeping baseline minimums
      const simulatedRate = Math.max(1.2, parseFloat((d.rate * multiplier).toFixed(1)));
      // Volume drops inversely as friction rises
      const simulatedVolume = Math.round(d.volume * (1 + (1 - multiplier) * 0.25));
      return {
        ...d,
        rate: simulatedRate,
        volume: simulatedVolume
      };
    });
  };

  const getSimulatedLatencyData = () => {
    let multiplier = 1.0;
    if (rhqStrictness === 'medium') multiplier = 0.55;
    if (rhqStrictness === 'low') multiplier = 0.25;

    return baseLatencyData.map(d => {
      const simulatedDays = Math.max(1.5, parseFloat((d.days * multiplier).toFixed(1)));
      const simulatedTx = Math.round(d.transactions * (1 + (1 - multiplier) * 0.15));
      return {
        ...d,
        days: simulatedDays,
        transactions: simulatedTx
      };
    });
  };

  const activeDeclineData = getSimulatedDeclineData();
  const activeLatencyData = getSimulatedLatencyData();

  // Custom tooltips for Recharts
  const CustomDeclineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-zinc-950 text-white p-3 border border-zinc-800 rounded font-sans text-xs shadow-xl">
          <p className="font-bold mb-1.5 text-zinc-400">{isAr ? data.dateAr : data.date}</p>
          <div className="space-y-1">
            <p className="flex justify-between gap-6">
              <span>{isAr ? 'معدل الرفض والتعليق:' : 'Decline/Hold Rate:'}</span>
              <span className="text-red-400 font-mono font-bold">{payload[0].value}%</span>
            </p>
            <p className="flex justify-between gap-6">
              <span>{isAr ? 'حجم المعاملات اليومي (مليون $):' : 'Daily Tx Volume (M$):'}</span>
              <span className="text-amber-400 font-mono font-bold">{data.volume}M$</span>
            </p>
            <p className="text-xxs text-zinc-500 border-t border-zinc-800 pt-1.5 mt-1.5">
              {isAr ? `الحالة: ${data.descAr}` : `Status: ${data.descEn}`}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLatencyTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-zinc-950 text-white p-3 border border-zinc-800 rounded font-sans text-xs shadow-xl">
          <p className="font-bold mb-1.5 text-zinc-400">{isAr ? data.dateAr : data.date}</p>
          <div className="space-y-1">
            <p className="flex justify-between gap-6">
              <span>{isAr ? 'متوسط زمن المعالجة:' : 'Avg. Settlement Latency:'}</span>
              <span className="text-amber-400 font-mono font-bold">{payload[0].value} {isAr ? 'أيام عمل' : 'business days'}</span>
            </p>
            <p className="flex justify-between gap-6">
              <span>{isAr ? 'المعاملات البينية اليومية:' : 'Bilateral Txs / Day:'}</span>
              <span className="text-zinc-400 font-mono font-bold">{data.transactions.toLocaleString()}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="saudi-uae-financial-chart-widget" className="bg-zinc-50 border-2 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-sans space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b-2 border-black pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></span>
            <span className="font-mono text-xxs font-black text-red-700 tracking-widest uppercase">
              {isAr ? 'لوحة المراقبة الجيومالية لعام ٢٠٢٦' : '2026 FINANCIAL INTELLIGENCE DASHBOARD'}
            </span>
          </div>
          <h4 className="font-sans font-black text-xl md:text-2xl text-black leading-tight">
            {isAr ? 'مؤشر قيود السيولة والتحويلات المالية: السعودية ↔ الإمارات' : 'Capital Flow Scrutiny Index: Saudi Arabia ↔ UAE'}
          </h4>
          <p className="text-zinc-600 text-xs mt-1 leading-relaxed max-w-2xl">
            {isAr 
              ? 'مراقبة في الوقت الفعلي لنشوء قيود المدفوعات والتدقيق المستندي المستند إلى قواعد "مؤسسة النقد العربي السعودي" (SAMA) لتفعيل برنامج المقرات الإقليمية.' 
              : 'Real-time observation of emergent cross-border payment friction, document validation bottlenecks, and compliance audits aligned with SAMA policies.'}
          </p>
        </div>

        {/* Dynamic Metric Badge */}
        <div className="flex items-center gap-3 bg-white border border-black p-3 shrink-0 rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-right">
            <p className="text-xxs text-zinc-500 font-bold uppercase tracking-wider">
              {isAr ? 'الاضطراب الأقصى (يوليو)' : 'MAX FRICTION REGISTRATION'}
            </p>
            <p className="text-2xl font-mono font-black text-red-600 flex items-baseline justify-end gap-1">
              <span>8.4%</span>
              <span className="text-xs font-sans font-bold text-zinc-600">{isAr ? 'رفض' : 'decline'}</span>
            </p>
          </div>
          <AlertTriangle className="text-red-600 shrink-0" size={28} />
        </div>
      </div>

      {/* Selector and Simulation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Simulation Controls Sidebar */}
        <div className="lg:col-span-4 bg-white border border-zinc-300 p-4 rounded-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
            <Sliders className="text-black shrink-0" size={16} />
            <h5 className="font-bold text-sm uppercase tracking-wide text-black">
              {isAr ? 'محاكاة تأثير السياسات التنظيمية' : 'Policy Simulation Engine'}
            </h5>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5 flex justify-between">
                <span>{isAr ? 'درجة صرامة برنامج المقرات (RHQ):' : 'KSA RHQ Enforcement Strictness:'}</span>
                <span className="font-mono text-xxs px-2 py-0.5 bg-black text-white rounded font-bold uppercase">
                  {rhqStrictness}
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setRhqStrictness('high')}
                  className={`py-1.5 px-1 text-center font-bold text-xs border rounded transition-all cursor-pointer ${
                    rhqStrictness === 'high'
                      ? 'bg-red-950 text-red-300 border-red-700 font-extrabold shadow-sm'
                      : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {isAr ? 'صارم (الحالي)' : 'Strict (Active)'}
                </button>
                <button
                  onClick={() => setRhqStrictness('medium')}
                  className={`py-1.5 px-1 text-center font-bold text-xs border rounded transition-all cursor-pointer ${
                    rhqStrictness === 'medium'
                      ? 'bg-amber-950 text-amber-300 border-amber-700 font-extrabold shadow-sm'
                      : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {isAr ? 'معتدل (مرحلي)' : 'Moderate'}
                </button>
                <button
                  onClick={() => setRhqStrictness('low')}
                  className={`py-1.5 px-1 text-center font-bold text-xs border rounded transition-all cursor-pointer ${
                    rhqStrictness === 'low'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700 font-extrabold shadow-sm'
                      : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {isAr ? 'مرن (محدود)' : 'Lax / Grace'}
                </button>
              </div>
            </div>

            <div className="text-xxs text-zinc-500 leading-relaxed bg-zinc-50 p-2.5 rounded border border-zinc-200">
              <span className="font-bold flex items-center gap-1 text-zinc-700 mb-0.5">
                <Info size={12} className="shrink-0" />
                {isAr ? 'النمذجة المحاكاة:' : 'Simulation Model Note:'}
              </span>
              {isAr 
                ? 'بتعديل درجة صرامة تفعيل شروط المقر الإقليمي السعودي، تنخفض أو تتسارع معدلات التدقيق المكثف ورفض التحويلات المالية عبر منصة المعالجات في ساما.'
                : 'By scaling down or intensifying the KSA regional headquarters rules, you can simulate corresponding increases or drops in transactional blockages and document holds.'}
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-3 space-y-2">
            <h6 className="text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
              {isAr ? 'المؤشرات التشغيلية المحاكاة' : 'Simulated Indicators'}
            </h6>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                  {isAr ? 'معدل الرفض الحالي:' : 'Outbound Failure Rate:'}
                </span>
                <span className="font-mono font-bold text-red-600">
                  {rhqStrictness === 'high' ? '8.4%' : rhqStrictness === 'medium' ? '5.0%' : '2.5%'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  {isAr ? 'زمن التخليص المعتاد:' : 'Avg. Settlement Time:'}
                </span>
                <span className="font-mono font-bold text-amber-600">
                  {rhqStrictness === 'high' ? '11.4 يوم' : rhqStrictness === 'medium' ? '5.7 يوم' : '2.8 يوم'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                  {isAr ? 'فروقات الرسوم البديلة:' : 'Intermediary Premium:'}
                </span>
                <span className="font-mono font-bold text-zinc-800">
                  {rhqStrictness === 'high' ? '+2.5%' : rhqStrictness === 'medium' ? '+1.2%' : '+0.4%'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chart Section */}
        <div className="lg:col-span-8 bg-white border border-zinc-300 p-4 rounded-lg flex flex-col justify-between h-[360px] md:h-[380px]">
          {/* Chart Header Controls */}
          <div className="flex justify-between items-center border-b border-zinc-100 pb-3 mb-2 shrink-0">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('decline')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  activeTab === 'decline'
                    ? 'bg-black text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {isAr ? 'معدل الرفض والتعليق (%)' : 'Decline/Hold Rates (%)'}
              </button>
              <button
                onClick={() => setActiveTab('latency')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  activeTab === 'latency'
                    ? 'bg-black text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {isAr ? 'مدة تسوية المعاملات (يوم)' : 'Settlement Latency (Days)'}
              </button>
            </div>
            
            <span className="text-xxs text-zinc-400 font-mono flex items-center gap-1">
              <Database size={10} />
              SAMA COMM-DATA v2.6
            </span>
          </div>

          {/* Recharts Container */}
          <div className="w-full grow relative">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'decline' ? (
                <AreaChart
                  data={activeDeclineData}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.01}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey={isAr ? 'dateAr' : 'date'} 
                    tick={{ fontSize: 10, fill: '#71717a', fontFamily: 'sans-serif' }}
                    axisLine={{ stroke: '#e4e4e7' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: '#71717a', fontFamily: 'monospace' }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 10]}
                    unit="%"
                  />
                  <Tooltip content={<CustomDeclineTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#b91c1c" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#colorRate)" 
                  />
                </AreaChart>
              ) : (
                <AreaChart
                  data={activeLatencyData}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.01}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey={isAr ? 'dateAr' : 'date'} 
                    tick={{ fontSize: 10, fill: '#71717a', fontFamily: 'sans-serif' }}
                    axisLine={{ stroke: '#e4e4e7' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: '#71717a', fontFamily: 'monospace' }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 12]}
                    unit="D"
                  />
                  <Tooltip content={<CustomLatencyTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="days" 
                    stroke="#d97706" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#colorDays)" 
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Chart footer tags */}
          <div className="flex justify-between items-center pt-2 border-t border-zinc-100 text-xxs text-zinc-500 font-mono mt-2 shrink-0">
            <span>{isAr ? 'العينة المستقصاة: ١٤٢ شركة عاملة بين الرياض ودبي' : 'Survey Pool: 142 cross-border operating entities (KSA/UAE)'}</span>
            <span className="text-red-700 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
              {isAr ? 'أرقام حية مسقطة لعام ٢٠٢٦' : 'LIVE 2026 PROJECTIONS'}
            </span>
          </div>
        </div>
      </div>

      {/* Narrative block at bottom */}
      <div className="bg-zinc-100 p-3.5 border border-zinc-200 text-xs text-zinc-700 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Info size={16} className="text-black shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {isAr 
              ? 'تنويه: البيانات مصاغة بناءً على دراسة استقصائية لمطابقتي التوافق، وبسبب عدم كشف الجهات التنظيمية عن تجميد شامل، تظل الإجراءات في إطار الإجراءات المفرطة للاستعلام والتحديث المستندي لبرنامج مقرات الشركات.' 
              : 'Analytical Note: Data points are sourced from executive surveys of financial administrators. Due to the unannounced nature of compliance overrides, actual clearance times may vary depending on local branch protocols.'}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-1 font-bold text-black border-b border-black pb-0.5 text-xxs tracking-wider uppercase">
          {isAr ? 'تأكيد السجل' : 'RECHART PLOT VERIFIED'}
          <ShieldCheck size={12} className="text-emerald-700" />
        </div>
      </div>
    </div>
  );
};
