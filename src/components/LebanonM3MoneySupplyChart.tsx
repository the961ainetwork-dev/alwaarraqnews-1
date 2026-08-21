import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceDot,
  Area,
  ComposedChart
} from 'recharts';
import { 
  TrendingDown, 
  DollarSign, 
  Layers, 
  Percent, 
  Calendar, 
  AlertCircle, 
  Download, 
  ArrowDownRight, 
  Info,
  Building2,
  Lock
} from 'lucide-react';

export interface M3DataPoint {
  date: string;
  labelAr: string;
  labelEn: string;
  m3LbpBillion: number; // in LBP Billions
  m3UsdBillion: number; // in USD Billions (at official 89,500 LBP/USD)
  yoyChangePct: number; // Year-over-Year contraction percentage
  ytdChangePct: number; // Year-to-Date contraction percentage
  dollarizationPct: number; // % Dollarization of M3
  currencyInCirculationBillion: number; // Currency in circulation
  demandDepositsBillion: number; // Demand deposits
  foreignCurrencyDepositsUsdM: number; // FX deposits in Millions USD
  noteAr?: string;
  noteEn?: string;
  isMilestone?: boolean;
}

// Official Historical Telemetry Data derived from Banque du Liban (BDL) Monetary Bulletins
export const LEBANON_M3_DATASET: M3DataPoint[] = [
  {
    date: '2025-08-14',
    labelAr: 'أغسطس 2025',
    labelEn: 'Aug 2025',
    m3LbpBillion: 6140800,
    m3UsdBillion: 68.61,
    yoyChangePct: 0.0,
    ytdChangePct: 1.82,
    dollarizationPct: 97.45,
    currencyInCirculationBillion: 58500,
    demandDepositsBillion: 62000,
    foreignCurrencyDepositsUsdM: 65120,
    noteAr: 'سنة الأساس للمقارنة السنوية (M3 = 68.61 مليار دولار)',
    noteEn: 'YoY baseline reference point (M3 = $68.61B)'
  },
  {
    date: '2025-10-15',
    labelAr: 'أكتوبر 2025',
    labelEn: 'Oct 2025',
    m3LbpBillion: 6095200,
    m3UsdBillion: 68.10,
    yoyChangePct: -0.74,
    ytdChangePct: 1.05,
    dollarizationPct: 97.52,
    currencyInCirculationBillion: 57800,
    demandDepositsBillion: 61400,
    foreignCurrencyDepositsUsdM: 64750
  },
  {
    date: '2025-12-31',
    labelAr: 'ديسمبر 2025',
    labelEn: 'Dec 2025',
    m3LbpBillion: 6008400,
    m3UsdBillion: 67.13,
    yoyChangePct: -2.15,
    ytdChangePct: 0.00,
    dollarizationPct: 97.60,
    currencyInCirculationBillion: 56900,
    demandDepositsBillion: 60800,
    foreignCurrencyDepositsUsdM: 63900,
    noteAr: 'إقفال نهاية العام 2025 وبدء تسارع سحب الودائع',
    noteEn: 'Year-end 2025 close; onset of accelerated deposit withdrawals',
    isMilestone: true
  },
  {
    date: '2026-02-15',
    labelAr: 'فبراير 2026',
    labelEn: 'Feb 2026',
    m3LbpBillion: 5960200,
    m3UsdBillion: 66.59,
    yoyChangePct: -2.94,
    ytdChangePct: -0.80,
    dollarizationPct: 97.65,
    currencyInCirculationBillion: 56200,
    demandDepositsBillion: 60200,
    foreignCurrencyDepositsUsdM: 63400
  },
  {
    date: '2026-04-30',
    labelAr: 'أبريل 2026',
    labelEn: 'Apr 2026',
    m3LbpBillion: 5925178,
    m3UsdBillion: 66.20,
    yoyChangePct: -3.51,
    ytdChangePct: -1.38,
    dollarizationPct: 97.70,
    currencyInCirculationBillion: 55400,
    demandDepositsBillion: 59800,
    foreignCurrencyDepositsUsdM: 63010,
    noteAr: 'الميزانية النقدية الموحدة: صافي الأصول الأجنبية 3.59 تريليون ليرة',
    noteEn: 'Monetary survey benchmark: Net Foreign Assets at LBP 3.59T',
    isMilestone: true
  },
  {
    date: '2026-06-15',
    labelAr: 'يونيو 2026',
    labelEn: 'Jun 2026',
    m3LbpBillion: 5880100,
    m3UsdBillion: 65.70,
    yoyChangePct: -4.24,
    ytdChangePct: -2.13,
    dollarizationPct: 97.72,
    currencyInCirculationBillion: 54800,
    demandDepositsBillion: 59100,
    foreignCurrencyDepositsUsdM: 62550
  },
  {
    date: '2026-07-31',
    labelAr: 'يوليو 2026',
    labelEn: 'Jul 2026',
    m3LbpBillion: 5831700,
    m3UsdBillion: 65.16,
    yoyChangePct: -5.03,
    ytdChangePct: -2.94,
    dollarizationPct: 97.75,
    currencyInCirculationBillion: 54100,
    demandDepositsBillion: 58600,
    foreignCurrencyDepositsUsdM: 62110
  },
  {
    date: '2026-08-06',
    labelAr: '6 أغسطس 2026',
    labelEn: '6 Aug 2026',
    m3LbpBillion: 5831700,
    m3UsdBillion: 65.16,
    yoyChangePct: -5.03,
    ytdChangePct: -2.94,
    dollarizationPct: 97.774,
    currencyInCirculationBillion: 53950,
    demandDepositsBillion: 58450,
    foreignCurrencyDepositsUsdM: 62080,
    noteAr: 'ذروة الدولرة عند 97.774%',
    noteEn: 'Peak dollarization reached 97.774%'
  },
  {
    date: '2026-08-13',
    labelAr: '13 أغسطس 2026',
    labelEn: '13 Aug 2026',
    m3LbpBillion: 5825560,
    m3UsdBillion: 65.09,
    yoyChangePct: -5.13,
    ytdChangePct: -3.04,
    dollarizationPct: 97.739,
    currencyInCirculationBillion: 53276,
    demandDepositsBillion: 60216,
    foreignCurrencyDepositsUsdM: 61990,
    noteAr: 'أحدث إحصاء: انكماش سنوي قياسي بـ -5.13% وتراجع أسبوعي بـ 6,140 مليار ليرة',
    noteEn: 'Latest release: Record -5.13% YoY contraction & LBP 6,140B weekly drop',
    isMilestone: true
  }
];

interface LebanonM3MoneySupplyChartProps {
  language?: 'ar' | 'en';
  showContainerBorder?: boolean;
  className?: string;
}

export const LebanonM3MoneySupplyChart: React.FC<LebanonM3MoneySupplyChartProps> = ({
  language = 'ar',
  showContainerBorder = true,
  className = ''
}) => {
  const isAr = language === 'ar';
  const [metricMode, setMetricMode] = useState<'usd' | 'lbp' | 'contraction' | 'dollarization'>('usd');
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);

  // Current latest telemetry point (13 August 2026)
  const latestData = LEBANON_M3_DATASET[LEBANON_M3_DATASET.length - 1];

  // Custom Chart Tooltip Formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload as M3DataPoint;
      return (
        <div className="bg-zinc-950 text-white p-3 border-2 border-black shadow-2xl rounded-xs text-xs font-mono max-w-xs z-50">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2">
            <span className="font-bold text-sky-400 font-sans">{isAr ? dataPoint.labelAr : dataPoint.labelEn}</span>
            <span className="text-[10px] text-zinc-400 font-mono">{dataPoint.date}</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 font-sans">{isAr ? 'الكتلة النقدية M3 (دولار):' : 'M3 (USD Equivalent):'}</span>
              <span className="font-bold text-white">${dataPoint.m3UsdBillion.toFixed(2)}B</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-zinc-400 font-sans">{isAr ? 'الكتلة النقدية M3 (ليرة):' : 'M3 (LBP Billions):'}</span>
              <span className="font-bold text-zinc-200">{(dataPoint.m3LbpBillion / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 })}T</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-zinc-400 font-sans">{isAr ? 'التغير السنوي (YoY):' : 'YoY Contraction:'}</span>
              <span className={`font-black ${dataPoint.yoyChangePct < 0 ? 'text-red-400' : 'text-emerald-400'}`} dir="ltr">
                {dataPoint.yoyChangePct > 0 ? `+${dataPoint.yoyChangePct}%` : `${dataPoint.yoyChangePct}%`}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-zinc-400 font-sans">{isAr ? 'التغير التراكمي (YTD):' : 'YTD Contraction:'}</span>
              <span className={`font-black ${dataPoint.ytdChangePct < 0 ? 'text-red-400' : 'text-emerald-400'}`} dir="ltr">
                {dataPoint.ytdChangePct > 0 ? `+${dataPoint.ytdChangePct}%` : `${dataPoint.ytdChangePct}%`}
              </span>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-zinc-800">
              <span className="text-zinc-400 font-sans">{isAr ? 'نسبة الدولرة:' : 'Dollarization Rate:'}</span>
              <span className="font-bold text-amber-400">{dataPoint.dollarizationPct}%</span>
            </div>

            {dataPoint.noteAr && (
              <div className="mt-2 pt-1.5 border-t border-dashed border-zinc-800 text-[10px] text-sky-300 leading-tight font-sans">
                💡 {isAr ? dataPoint.noteAr : dataPoint.noteEn}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className={`lebanon-m3-chart-container bg-white text-zinc-950 font-sans overflow-hidden ${
        showContainerBorder ? 'border-2 border-black p-4 sm:p-6 shadow-[4px_4px_0_0_#000]' : 'p-2'
      } ${className}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Top Header & Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-red-800 text-white text-[10px] font-mono font-black uppercase px-2 py-0.5 tracking-wider rounded-xs">
              BDL TELEMETRY // M3 AGGREGATE
            </span>
            <span className="text-zinc-500 font-mono text-[11px] font-bold">
              {isAr ? 'أغسطس 2025 – أغسطس 2026' : 'August 2025 – August 2026'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-sans text-zinc-950 tracking-tight">
            {isAr 
              ? 'المسار التاريخي لانكماش الكتلة النقدية (M3) في لبنان' 
              : "Historical Trajectory of Lebanon's M3 Money Supply Contraction"}
          </h3>
          <p className="text-xs text-zinc-600 font-sans mt-0.5">
            {isAr 
              ? 'رصد بياني دقيق يوثق انكماش M3 بنسبة 5.13% سنوياً وتراجعها إلى 65.09 مليار دولار بالتوازي مع دولرة بنسبة 97.74%.'
              : 'Interactive visualization mapping the 5.13% YoY contraction down to $65.09B alongside a persistent 97.74% dollarization baseline.'}
          </p>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-zinc-100 p-1 border border-zinc-300 self-stretch md:self-auto justify-center">
          <button
            onClick={() => setMetricMode('usd')}
            className={`px-3 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
              metricMode === 'usd'
                ? 'bg-black text-white shadow-xs'
                : 'text-zinc-700 hover:text-black hover:bg-zinc-200'
            }`}
          >
            {isAr ? 'الحجم بالدولار ($B)' : 'USD Value ($B)'}
          </button>
          <button
            onClick={() => setMetricMode('contraction')}
            className={`px-3 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
              metricMode === 'contraction'
                ? 'bg-red-800 text-white shadow-xs'
                : 'text-zinc-700 hover:text-black hover:bg-zinc-200'
            }`}
          >
            {isAr ? 'نسبة الانكماش السنوي (YoY %)' : 'YoY Contraction (%)'}
          </button>
          <button
            onClick={() => setMetricMode('dollarization')}
            className={`px-3 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
              metricMode === 'dollarization'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-zinc-700 hover:text-black hover:bg-zinc-200'
            }`}
          >
            {isAr ? 'الدولرة (%)' : 'Dollarization (%)'}
          </button>
          <button
            onClick={() => setMetricMode('lbp')}
            className={`px-3 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
              metricMode === 'lbp'
                ? 'bg-sky-800 text-white shadow-xs'
                : 'text-zinc-700 hover:text-black hover:bg-zinc-200'
            }`}
          >
            {isAr ? 'الليرة اللبنانية (LBP)' : 'LBP (Billions)'}
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-4">
        {/* Metric 1: Current M3 */}
        <div className="p-3 bg-zinc-50 border border-zinc-300 relative overflow-hidden">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
            {isAr ? 'الكتلة النقدية الحالية (M3)' : 'Current M3 Level (13 Aug)'}
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-zinc-950 mt-1 flex items-baseline gap-1.5">
            <span>$65.09B</span>
            <span className="text-[10px] font-normal text-zinc-500">(@ 89,500 LBP)</span>
          </div>
          <div className="text-[10px] font-mono text-sky-800 mt-0.5">
            5,825,560 {isAr ? 'مليار ليرة' : 'LBP Billion'}
          </div>
        </div>

        {/* Metric 2: YoY Contraction (The Core Request Requirement) */}
        <div className="p-3 bg-red-50/50 border border-red-300 relative overflow-hidden">
          <div className="text-[10px] font-mono text-red-700 uppercase tracking-wider font-bold flex items-center justify-between">
            <span>{isAr ? 'الانكماش السنوي (YoY)' : 'YoY Contraction Rate'}</span>
            <span className="bg-red-700 text-white px-1 py-0.2 text-[9px] font-mono font-black">KEY STAT</span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-red-700 mt-1 flex items-baseline gap-1.5" dir="ltr">
            <TrendingDown size={20} className="inline text-red-700 stroke-[3]" />
            <span>-5.13%</span>
          </div>
          <div className="text-[10px] font-mono text-red-800 mt-0.5">
            {isAr ? 'تراجع من $68.61B في أغسطس 2025' : 'Down from $68.61B in Aug 2025'}
          </div>
        </div>

        {/* Metric 3: YTD Performance */}
        <div className="p-3 bg-zinc-50 border border-zinc-300 relative overflow-hidden">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
            {isAr ? 'الأداء منذ بداية العام (YTD)' : 'Year-to-Date Performance'}
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-zinc-900 mt-1 flex items-baseline gap-1.5" dir="ltr">
            <ArrowDownRight size={20} className="inline text-zinc-700 stroke-[3]" />
            <span>-3.04%</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 mt-0.5">
            {isAr ? 'انكماش بـ 182,840 مليار ليرة' : 'LBP 182.8T nominal drop'}
          </div>
        </div>

        {/* Metric 4: Dollarization */}
        <div className="p-3 bg-amber-50/50 border border-amber-300 relative overflow-hidden">
          <div className="text-[10px] font-mono text-amber-800 uppercase tracking-wider font-bold">
            {isAr ? 'نسبة الدولرة القياسية' : 'Dollarization Baseline'}
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-amber-900 mt-1 flex items-baseline gap-1.5">
            <span>97.74%</span>
            <span className="text-[10px] font-normal text-amber-700 font-mono">(97.739%)</span>
          </div>
          <div className="text-[10px] font-mono text-amber-800 mt-0.5">
            {isAr ? 'شلل تام لوظيفة الليرة النقدية' : 'Total cash dollarization trap'}
          </div>
        </div>
      </div>

      {/* Main Interactive Recharts Line Graph Area */}
      <div className="relative bg-zinc-50/80 border border-zinc-300 p-2 sm:p-4 rounded-xs">
        <div className="h-[340px] sm:h-[400px] w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={LEBANON_M3_DATASET}
              margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
            >
              <defs>
                <linearGradient id="usdGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="contractionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#b91c1c" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="dollarizationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
              
              <XAxis 
                dataKey={isAr ? 'labelAr' : 'labelEn'} 
                tick={{ fill: '#3f3f46', fontSize: 11, fontFamily: 'monospace', fontWeight: 600 }}
                tickMargin={10}
                stroke="#71717a"
              />

              {metricMode === 'usd' && (
                <>
                  <YAxis 
                    domain={[64, 70]} 
                    tick={{ fill: '#3f3f46', fontSize: 11, fontFamily: 'monospace' }}
                    tickFormatter={(val) => `$${val}B`}
                    stroke="#71717a"
                  />
                  <Area
                    type="monotone"
                    dataKey="m3UsdBillion"
                    fill="url(#usdGradient)"
                    stroke="none"
                  />
                  <Line
                    type="monotone"
                    dataKey="m3UsdBillion"
                    name={isAr ? 'الكتلة النقدية M3 (مليار دولار)' : 'M3 Money Supply ($B)'}
                    stroke="#09090b"
                    strokeWidth={3.5}
                    dot={{ r: 4, fill: '#09090b', stroke: '#ffffff', strokeWidth: 2 }}
                    activeDot={{ r: 7, fill: '#b91c1c', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                </>
              )}

              {metricMode === 'contraction' && (
                <>
                  <YAxis 
                    domain={[-6, 1]} 
                    tick={{ fill: '#3f3f46', fontSize: 11, fontFamily: 'monospace' }}
                    tickFormatter={(val) => `${val}%`}
                    stroke="#71717a"
                  />
                  <ReferenceLine y={0} stroke="#71717a" strokeDasharray="3 3" />
                  <Area
                    type="monotone"
                    dataKey="yoyChangePct"
                    fill="url(#contractionGradient)"
                    stroke="none"
                  />
                  <Line
                    type="monotone"
                    dataKey="yoyChangePct"
                    name={isAr ? 'الانكماش السنوي (YoY %)' : 'YoY Contraction (%)'}
                    stroke="#b91c1c"
                    strokeWidth={3.5}
                    dot={{ r: 5, fill: '#b91c1c', stroke: '#ffffff', strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ytdChangePct"
                    name={isAr ? 'الانكماش التراكمي (YTD %)' : 'YTD Contraction (%)'}
                    stroke="#71717a"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3, fill: '#71717a' }}
                  />
                </>
              )}

              {metricMode === 'dollarization' && (
                <>
                  <YAxis 
                    domain={[97.2, 98.0]} 
                    tick={{ fill: '#3f3f46', fontSize: 11, fontFamily: 'monospace' }}
                    tickFormatter={(val) => `${val}%`}
                    stroke="#71717a"
                  />
                  <Area
                    type="monotone"
                    dataKey="dollarizationPct"
                    fill="url(#dollarizationGradient)"
                    stroke="none"
                  />
                  <Line
                    type="monotone"
                    dataKey="dollarizationPct"
                    name={isAr ? 'نسبة الدولرة (%)' : 'Dollarization Rate (%)'}
                    stroke="#d97706"
                    strokeWidth={3.5}
                    dot={{ r: 4, fill: '#d97706', stroke: '#ffffff', strokeWidth: 2 }}
                    activeDot={{ r: 7, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                </>
              )}

              {metricMode === 'lbp' && (
                <>
                  <YAxis 
                    domain={[5700000, 6200000]} 
                    tick={{ fill: '#3f3f46', fontSize: 11, fontFamily: 'monospace' }}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)}T`}
                    stroke="#71717a"
                  />
                  <Line
                    type="monotone"
                    dataKey="m3LbpBillion"
                    name={isAr ? 'الكتلة النقدية M3 (مليار ليرة)' : 'M3 (LBP Billions)'}
                    stroke="#0284c7"
                    strokeWidth={3.5}
                    dot={{ r: 4, fill: '#0284c7', stroke: '#ffffff', strokeWidth: 2 }}
                    activeDot={{ r: 7, fill: '#b91c1c', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                </>
              )}

              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                wrapperStyle={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold' }} 
              />

              {/* Highlighting the exact -5.13% Milestone on 13 August 2026 */}
              <ReferenceDot
                x={isAr ? '13 أغسطس 2026' : '13 Aug 2026'}
                y={
                  metricMode === 'usd' 
                    ? latestData.m3UsdBillion 
                    : metricMode === 'contraction' 
                      ? latestData.yoyChangePct 
                      : metricMode === 'dollarization'
                        ? latestData.dollarizationPct
                        : latestData.m3LbpBillion
                }
                r={8}
                fill="#b91c1c"
                stroke="#ffffff"
                strokeWidth={3}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Milestone Callout Banner */}
        <div className="mt-3 p-3 bg-white border border-zinc-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-700 animate-pulse"></div>
            <span className="font-bold text-zinc-900 font-sans">
              {isAr 
                ? 'النقطة المحورية (13 أغسطس 2026):' 
                : 'Focal Milestone (13 August 2026):'}
            </span>
            <span className="font-mono text-red-700 font-black">
              M3 = $65.09B (YoY: -5.13%)
            </span>
          </div>
          <div className="text-[11px] text-zinc-600 font-sans">
            {isAr 
              ? 'فقدت M3 نحو 3.52 مليار دولار على أساس سنوي مدفوعة بتراجع الودائع الأجنبية بـ $90M أسبوعياً.'
              : 'M3 contracted by ~$3.52B YoY, accelerated by a $90M weekly foreign deposit drain.'}
          </div>
        </div>
      </div>

      {/* Analytical Footnotes & Structural Drivers */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-zinc-50 border border-zinc-200">
          <div className="font-bold text-zinc-900 flex items-center gap-1.5 mb-1 font-sans">
            <Building2 size={14} className="text-zinc-700" />
            <span>{isAr ? '1. انكماش قهري لا إصلاحي' : '1. Involuntary Contraction'}</span>
          </div>
          <p className="text-[11px] text-zinc-600 leading-relaxed font-sans">
            {isAr 
              ? 'تراجع M3 ناتج عن انعدام الثقة المصرفية وتراجع الودائع بالعملات الأجنبية، وليس نتيجة سياسة تشديد نقدي إصلاحية مدروسة.'
              : 'M3 shrinkage stems from severe institutional distrust and foreign deposit outflows rather than deliberate monetary tightening.'}
          </p>
        </div>

        <div className="p-3 bg-zinc-50 border border-zinc-200">
          <div className="font-bold text-zinc-900 flex items-center gap-1.5 mb-1 font-sans">
            <Lock size={14} className="text-zinc-700" />
            <span>{isAr ? '2. شلل الائتمان والاستثمار' : '2. Credit Intermediation Freeze'}</span>
          </div>
          <p className="text-[11px] text-zinc-600 leading-relaxed font-sans">
            {isAr 
              ? 'ارتفاع فوائد الإقراض (8.43% بالليرة و4.13% بالدولار) جمد تسليفات القطاع الخاص عند 510,825 مليار ليرة مما كبح أي استثمار.'
              : 'Lending rates at 8.43% (LBP) and 4.13% (USD) froze private sector credit at LBP 510.8T, halting productive capital formation.'}
          </p>
        </div>

        <div className="p-3 bg-zinc-50 border border-zinc-200">
          <div className="font-bold text-zinc-900 flex items-center gap-1.5 mb-1 font-sans">
            <AlertCircle size={14} className="text-zinc-700" />
            <span>{isAr ? '3. تكريس اقتصاد الكاش' : '3. Entrenched Cash Economy'}</span>
          </div>
          <p className="text-[11px] text-zinc-600 leading-relaxed font-sans">
            {isAr 
              ? 'بقاء الدولرة عند 97.74% حوّل الليرة إلى أداة تداول يومي مجردة، وأخرج معظم الكتلة النقدية خارج المراقبة الضريبية والمصرفية.'
              : '97.74% dollarization stripped the LBP of its store-of-value role, driving trade into an untraceable physical cash economy.'}
          </p>
        </div>
      </div>

      {/* Source Citation */}
      <div className="mt-3 pt-2 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 font-mono">
        <span>
          {isAr 
            ? 'المصدر: مصرف لبنان المركزي — النشرة الإحصائية النقدية الأسبوعية (13 أغسطس 2026)' 
            : 'Source: Central Bank of Lebanon (BDL) — Weekly Monetary Statistical Bulletin (August 13, 2026)'}
        </span>
        <span className="font-bold text-zinc-700">
          AL-WARRAQ MONETARY TELEMETRY & RESEARCH UNIT
        </span>
      </div>
    </div>
  );
};

export default LebanonM3MoneySupplyChart;
