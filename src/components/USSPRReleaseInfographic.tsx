import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Gauge, 
  Flame, 
  ShieldAlert, 
  RefreshCw, 
  Info, 
  Activity, 
  Droplets,
  Coins,
  ChevronRight,
  HelpCircle,
  AlertTriangle,
  Compass,
  ArrowRightLeft
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface USSPRReleaseInfographicProps {
  language: 'ar' | 'en';
}

export function USSPRReleaseInfographic({ language }: USSPRReleaseInfographicProps) {
  const isAr = language === 'ar';
  
  // State for interactive geopolitical simulator
  const [blockagePct, setBlockagePct] = useState<number>(35); // Default 35% blockage of Hormuz
  const [extraDrawdown, setExtraDrawdown] = useState<number>(1.5); // Default 1.5M bpd extra drawdown

  // Fuel prices data
  const fuelData = [
    {
      period: isAr ? 'قبل شهر' : '1 Month Ago',
      gas: 2.94,
      diesel: 3.67,
    },
    {
      period: isAr ? 'قبل أسبوع' : '1 Week Ago',
      gas: 3.20,
      diesel: 4.04,
    },
    {
      period: isAr ? 'الأربعاء (اليوم)' : 'Wednesday (Today)',
      gas: 3.58,
      diesel: 4.83,
    }
  ];

  // Calculations based on sliders
  // Base oil price: WTI = $73.90, Brent = $81.50 or $97 depending on current status.
  // Let's assume a base price of $73.90 (WTI) / $81.50 (Brent).
  // A 100% blockage of Hormuz adds $120 to Brent and WTI.
  // Additional drawdown helps mitigate price: reduces price by $5 per million bpd released.
  const simulatedWtiPrice = 73.90 + (blockagePct * 1.1) - (extraDrawdown * 4.5);
  const simulatedBrentPrice = 81.50 + (blockagePct * 1.25) - (extraDrawdown * 5.0);

  // Current SPR capacity is roughly 350M barrels as of 2026.
  // Survival days of remaining SPR under current and extra drawdown.
  // Let's assume a baseline drawdown of 1.4M bpd (172M barrels over 120 days).
  const totalDrawdownRate = 1.43 + extraDrawdown; // million barrels per day
  const sprCurrentInventory = 348; // Million barrels remaining
  const sprSurvivalDays = Math.round(sprCurrentInventory / totalDrawdownRate);

  return (
    <div className="border border-zinc-200 bg-stone-50 rounded-lg p-5 font-sans relative text-zinc-900 shadow-xs">
      
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#b91c1c] rounded-t-lg"></div>

      {/* Header */}
      <div className="border-b border-zinc-200 pb-4 mb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#b91c1c]/10 text-[#b91c1c]">
            <Droplets size={12} className="animate-pulse" />
            {isAr ? 'التقرير الفيدرالي الاستراتيجي للطاقة' : 'FEDERAL STRATEGIC ENERGY REPORT'}
          </span>
          <h4 className="font-sans font-black text-base md:text-lg text-zinc-950 mt-1 leading-snug">
            {isAr ? 'إنفوجرافيك تفاعلي: السحب الطارئ من الاحتياطي البترولي الاستراتيجي الأمريكي (SPR)' : 'Interactive Infographic: US Strategic Petroleum Reserve (SPR) Emergency Drawdown'}
          </h4>
          <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
            {isAr ? 'تحليل رقمي تفاعلي لتدفقات النفط وعلاوات الحرب ومستويات استنفاد المخزونات • ٢٠٢٦' : 'Interactive data model of oil flows, war premiums, and inventory depletion levels • 2026'}
          </p>
        </div>
        <div className="text-right font-mono text-[10px] text-zinc-400 bg-zinc-100 px-2 py-1 rounded border border-zinc-200">
          {isAr ? 'المستوى التشغيلي: حرج' : 'Operational Level: Critical'}
        </div>
      </div>

      {/* Grid containing data blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left column: Key metrics highlights */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* US Release Card */}
          <div className="bg-white border border-zinc-200 p-4 rounded-md shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 -mt-4 -mr-4 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-100 group-hover:scale-110 transition-transform">
              <Flame size={48} className="text-zinc-100/60" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#b91c1c] uppercase block">
              {isAr ? 'الإطلاق الاستراتيجي الطارئ' : 'EMERGENCY SPR RELEASE'}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black font-mono text-zinc-950">172M</span>
              <span className="text-xs font-bold text-zinc-500 font-mono">{isAr ? 'برميل' : 'bbl'}</span>
            </div>
            <div className="mt-2 text-xs text-zinc-650 space-y-1 relative z-10 font-sans font-medium">
              <div className="flex justify-between">
                <span>{isAr ? 'الجدول الزمني للتسليم:' : 'Delivery Window:'}</span>
                <span className="font-bold text-zinc-800">120 {isAr ? 'يوم' : 'Days'}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'تاريخ البدء المخطط:' : 'Start Date:'}</span>
                <span className="font-mono text-zinc-700">{isAr ? 'الأسبوع القادم' : 'Next Week'}</span>
              </div>
            </div>
          </div>

          {/* Refill Promise Card */}
          <div className="bg-white border border-zinc-200 p-4 rounded-md shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 -mt-4 -mr-4 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-100 group-hover:scale-110 transition-transform">
              <RefreshCw size={48} className="text-emerald-100/60" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase block">
              {isAr ? 'خطة إعادة ملء الاحتياطي' : 'REFILL & REBUILD TARGET'}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black font-mono text-zinc-950">200M</span>
              <span className="text-xs font-bold text-zinc-500 font-mono">{isAr ? 'برميل' : 'bbl'}</span>
            </div>
            <div className="mt-2 text-xs text-zinc-650 space-y-1 relative z-10 font-sans font-medium">
              <div className="flex justify-between">
                <span>{isAr ? 'فائض البراميل المطلقة:' : 'Net Surplus vs. Release:'}</span>
                <span className="font-bold text-emerald-700 font-mono">+28M (+20%)</span>
              </div>
              <div className="flex justify-between border-t border-zinc-100 pt-1 mt-1">
                <span className="text-zinc-500 text-[10px]">{isAr ? 'التكلفة الإجمالية لدافعي الضرائب:' : 'Total Cost to Taxpayers:'}</span>
                <span className="font-bold text-emerald-700 text-[10px]">{isAr ? 'صفر' : '$0.00'}</span>
              </div>
            </div>
          </div>

          {/* IEA Coordinated Release */}
          <div className="bg-zinc-900 text-white p-4 rounded-md shadow-xs relative overflow-hidden">
            <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
              {isAr ? 'تحالف وكالة الطاقة الدولية (IEA)' : 'IEA COORDINATED ACCORD'}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black font-mono text-white">400M</span>
              <span className="text-xs font-bold text-zinc-400 font-mono">{isAr ? 'برميل' : 'bbl'}</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">{isAr ? 'مقارنة استهلاك النفط العالمي:' : 'Global Consumption Coverage:'}</span>
                <span className="font-bold text-amber-300 font-mono">4.0 {isAr ? 'أيام كافية' : 'Days'}</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-[10px] text-zinc-400 leading-tight">
                {isAr 
                  ? 'يعادل الطلب العالمي نحو 100 مليون برميل يومياً. يعتبر هذا الإطلاق الأكبر في تاريخ الوكالة لتعديل كفة المعروض.' 
                  : 'Global demand averages ~100M bpd. This represents the largest coordinated intervention in history.'}
              </p>
            </div>
          </div>

        </div>

        {/* Center column: Fuel Prices timeline visualizer */}
        <div className="lg:col-span-8 flex flex-col justify-between border border-zinc-200 bg-white p-4 rounded-md shadow-xs">
          <div>
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2 mb-4">
              <span className="text-xs font-black uppercase text-zinc-850 flex items-center gap-1.5">
                <Activity size={14} className="text-[#b91c1c]" />
                {isAr ? 'تسلسل تصاعد أسعار الوقود في المحطات الأمريكية' : 'US Retail Fuel Price Trajectory'}
              </span>
              <span className="text-[9px] font-mono text-zinc-400">
                {isAr ? 'المصدر: AAA للوقود' : 'Source: AAA Gas Prices'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Gas Box */}
              <div className="bg-stone-50 p-3 rounded border border-zinc-200">
                <span className="text-[10px] font-mono font-bold text-[#b91c1c] uppercase block mb-2">
                  {isAr ? 'متوسط سعر البنزين العادي (جالون)' : 'Regular Gas Avg (per Gallon)'}
                </span>
                <div className="flex justify-between items-end gap-2">
                  <div className="space-y-1">
                    <span className="text-zinc-400 text-[10px] block font-mono">{isAr ? 'قبل شهر: $2.94' : '1M ago: $2.94'}</span>
                    <span className="text-zinc-500 text-[10px] block font-mono">{isAr ? 'قبل أسبوع: $3.20' : '1W ago: $3.20'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black font-mono text-zinc-950">$3.58</span>
                    <span className="text-[10px] text-[#b91c1c] font-black block font-mono">
                      +21.7% {isAr ? 'شهرياً' : 'MoM'}
                    </span>
                  </div>
                </div>
                <div className="border-t border-zinc-200 mt-2 pt-1.5 flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>{isAr ? 'الأعلى (كاليفورنيا):' : 'Highest State (California):'}</span>
                  <span className="font-bold text-[#b91c1c]">$5.34</span>
                </div>
              </div>

              {/* Diesel Box */}
              <div className="bg-stone-50 p-3 rounded border border-zinc-200">
                <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase block mb-2">
                  {isAr ? 'متوسط سعر الديزل (جالون)' : 'Diesel Avg (per Gallon)'}
                </span>
                <div className="flex justify-between items-end gap-2">
                  <div className="space-y-1">
                    <span className="text-zinc-400 text-[10px] block font-mono">{isAr ? 'قبل شهر: $3.67' : '1M ago: $3.67'}</span>
                    <span className="text-zinc-500 text-[10px] block font-mono">{isAr ? 'قبل أسبوع: $4.04' : '1W ago: $4.04'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black font-mono text-zinc-950">$4.83</span>
                    <span className="text-[10px] text-[#b91c1c] font-black block font-mono">
                      +31.6% {isAr ? 'شهرياً' : 'MoM'}
                    </span>
                  </div>
                </div>
                <div className="border-t border-zinc-200 mt-2 pt-1.5 flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>{isAr ? 'المخزونات التشغيلية في Cushing:' : 'Cushing Storage Limits:'}</span>
                  <span className="font-bold text-[#b91c1c]">{isAr ? 'حدود قصوى حرج' : 'Near Max Limit'}</span>
                </div>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fuelData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#b91c1c" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDiesel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="period" tick={{ fontSize: 9, fontFamily: 'monospace' }} />
                  <YAxis domain={[2.0, 5.5]} tick={{ fontSize: 9, fontFamily: 'monospace' }} />
                  <Tooltip formatter={(value: any) => [`$${value}`, '']} />
                  <Area type="monotone" name={isAr ? 'البنزين العادي' : 'Regular Gas'} dataKey="gas" stroke="#b91c1c" fillOpacity={1} fill="url(#colorGas)" strokeWidth={2} />
                  <Area type="monotone" name={isAr ? 'الديزل الفيدرالي' : 'Diesel'} dataKey="diesel" stroke="#2563eb" fillOpacity={1} fill="url(#colorDiesel)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="text-[10px] text-zinc-400 font-mono mt-3 flex justify-between border-t border-zinc-100 pt-2">
            <span>{isAr ? 'مستويات مخزون SPR:' : 'SPR Inventory Level:'}</span>
            <span className="font-bold text-[#b91c1c]">{isAr ? 'الأدنى منذ عام ١٩٨٣' : 'Lowest level since 1983'}</span>
          </div>
        </div>

      </div>

      {/* Geopolitical Scenario Simulator Block */}
      <div className="border-2 border-black p-4 bg-zinc-950 text-white rounded-md shadow-md">
        <div className="flex items-center gap-2 mb-3 border-b border-zinc-800 pb-2">
          <Compass size={18} className="text-amber-400" />
          <div>
            <h5 className="font-sans font-black text-sm text-white">
              {isAr ? 'جهاز محاكاة الإجهاد الجيواقتصادي: مضيق هرمز واستهلاك SPR' : 'Geo-Economic Stress Simulator: Hormuz Blockage & SPR Depletion'}
            </h5>
            <p className="text-[9.5px] text-zinc-400 font-mono">
              {isAr ? 'نموذج تفاعلي لمحاكاة التقلبات المتوقعة للأسعار والمدد التشغيلية للاحتياطيات' : 'Interactive model simulating price sensitivity and remaining reserve lifespans'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Sliders Control Pane (col-span-6) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Slider 1: Hormuz Blockage */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">{isAr ? 'نسبة إغلاق ممر هرمز اللوجستي:' : 'Strait of Hormuz Blockage Ratio:'}</span>
                <span className="font-bold text-amber-400">{blockagePct}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={blockagePct}
                onChange={(e) => setBlockagePct(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[8px] text-zinc-500 font-mono">
                <span>{isAr ? '0% (مرور طبيعي)' : '0% (Unrestricted)'}</span>
                <span>{isAr ? '50% (شحن مقيد)' : '50% (Restricted)'}</span>
                <span>{isAr ? '100% (إغلاق تام)' : '100% (Full Siege)'}</span>
              </div>
            </div>

            {/* Slider 2: Additional Drawdown */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">{isAr ? 'معدل سحب إضافي من SPR طارئ:' : 'Additional Emergency SPR Drawdown Rate:'}</span>
                <span className="font-bold text-red-400">{extraDrawdown.toFixed(1)}M {isAr ? 'برميل/يوم' : 'bpd'}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="5" 
                step="0.1"
                value={extraDrawdown}
                onChange={(e) => setExtraDrawdown(Number(e.target.value))}
                className="w-full accent-[#b91c1c] cursor-pointer h-1.5 bg-zinc-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[8px] text-zinc-500 font-mono">
                <span>{isAr ? '0.0 (السحب الأساسي)' : '0.0 (Baseline only)'}</span>
                <span>{isAr ? '2.5 (تدخل نشط)' : '2.5 M bpd (Active)'}</span>
                <span>{isAr ? '5.0 (استنفاد مطلق)' : '5.0 M bpd (Max out)'}</span>
              </div>
            </div>
          </div>

          {/* Simulator Outcomes Display (col-span-6) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3">
            
            {/* Simulated Price Card */}
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded relative overflow-hidden">
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">
                {isAr ? 'سعر برميل برنت المقدر' : 'PROJECTED BRENT CRUDE'}
              </span>
              <div className="text-xl font-mono font-black text-amber-400 mt-1">
                ${simulatedBrentPrice.toFixed(2)}
              </div>
              <span className="text-[8.5px] text-zinc-400 block font-mono mt-1">
                WTI: ${simulatedWtiPrice.toFixed(2)}
              </span>
              
              {simulatedBrentPrice > 120 && (
                <div className="absolute top-1 right-1">
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                  </span>
                </div>
              )}
            </div>

            {/* Simulated Survival Days Card */}
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded relative overflow-hidden">
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">
                {isAr ? 'بقاء مخزون SPR باليوم' : 'SPR SURVIVAL DAYS'}
              </span>
              <div className={`text-xl font-mono font-black mt-1 ${sprSurvivalDays < 120 ? 'text-[#b91c1c]' : 'text-emerald-400'}`}>
                {sprSurvivalDays} {isAr ? 'يوم' : 'Days'}
              </div>
              <span className="text-[8.5px] text-zinc-400 block font-mono mt-1">
                {isAr ? 'معدل سحب إجمالي:' : 'Total draw rate:'} {totalDrawdownRate.toFixed(2)}M/d
              </span>
            </div>

          </div>

        </div>

        {/* Dynamic Alerts inside the Simulator */}
        <div className="mt-4 pt-3 border-t border-zinc-800 text-[10.5px] font-sans flex items-center gap-2 text-zinc-400">
          {blockagePct > 70 ? (
            <div className="flex items-center gap-1.5 text-red-400 font-bold bg-red-950/40 p-2 rounded w-full border border-red-900/40">
              <ShieldAlert size={14} className="shrink-0 animate-bounce" />
              <span>
                {isAr 
                  ? 'تحذير: إغلاق حرج لمضيق هرمز يرفع علاوة المخاطر البحرية بشكل متسارع نحو مستويات تدمير الطلب المفرط.' 
                  : 'CRITICAL ALERT: Severe Hormuz blockades accelerate marine war premiums toward demand-destruction limits.'}
              </span>
            </div>
          ) : sprSurvivalDays < 110 ? (
            <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-950/40 p-2 rounded w-full border border-amber-900/40">
              <AlertTriangle size={14} className="shrink-0" />
              <span>
                {isAr 
                  ? 'تنبيه عسكري: معدلات السحب الحالية تفرغ الاحتياطي الطارئ لأدنى مستويات السعة الفعالة للمخازن الملحية.' 
                  : 'STRATEGIC RISK: Aggressive draw rates risk depleting key salt cavern inventories below baseline operational pressure.'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-zinc-400 p-1.5 w-full">
              <Info size={14} className="text-zinc-500 shrink-0" />
              <span>
                {isAr 
                  ? 'حسابات المحاكاة ديناميكية وتتبع مرونة أسعار المعروض ومخازن كوشينغ النفطية.' 
                  : 'Simulation parameters are dynamic, mapping supply elasticity coefficients against Cushing terminal buffers.'}
              </span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
