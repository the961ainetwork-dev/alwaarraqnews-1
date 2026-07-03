import React, { useState } from 'react';

interface DepositsInfographicProps {
  language: 'ar' | 'en';
}

export const DepositsInfographic: React.FC<DepositsInfographicProps> = ({ language }) => {
  const isAr = language === 'ar';
  
  // Interactive state for Gold liquidation simulation
  const [liquidateGold, setLiquidateGold] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<'A' | 'B' | 'C'>('A');

  // Data Definitions
  const trendData = [
    { period: isAr ? 'شباط ٢٠٢٤' : 'Feb 2024', lbp: '8,488.6B', usd: 94.8, change: '—', color: 'bg-zinc-400' },
    { period: isAr ? 'أيار ٢٠٢٤' : 'May 2024', lbp: '8,498.3B', usd: 94.9, change: '+0.11%', color: 'bg-emerald-500' },
    { period: isAr ? 'أيلول ٢٠٢٤' : 'Sep 2024', lbp: '8,355.9B', usd: 93.4, change: '-1.68%', color: 'bg-red-500' },
    { period: isAr ? 'كانون الأول ٢٠٢٤' : 'Dec 2024', lbp: '8,260.0B', usd: 92.3, change: '-1.14%', color: 'bg-red-400' },
    { period: isAr ? 'حزيران ٢٠٢٥' : 'Jun 2025', lbp: '8,275.4B', usd: 92.5, change: 'مستقر', color: 'bg-zinc-300' },
    { period: isAr ? 'كانون الأول ٢٠٢٥' : 'Dec 2025', lbp: '8,119.5B', usd: 90.7, change: '-1.88%', color: 'bg-red-600' },
    { period: isAr ? 'أيار ٢٠٢٦' : 'May 2026', lbp: '7,997.9B', usd: 89.4, change: '-0.21%', color: 'bg-red-700' },
  ];

  const componentsData = [
    { name: isAr ? 'ودائع العملاء' : 'Customer Deposits', usd: 85.6, pct: 95.8, color: 'bg-amber-600' },
    { name: isAr ? 'ودائع القطاع المالي' : 'Financial Sector', usd: 3.1, pct: 3.5, color: 'bg-amber-800' },
    { name: isAr ? 'ودائع القطاع العام' : 'Public Sector', usd: 0.65, pct: 0.7, color: 'bg-red-900' },
  ];

  const currencyData = [
    { 
      type: isAr ? 'المقيمون بالليرة' : 'Residents in LBP', 
      feb24: '47.7T', 
      may26: '74.8T', 
      diff: '+56.9%', 
      desc: isAr ? 'نمو اسمي ضخم بلا قيمة حقيقية بالدولار' : 'Huge nominal growth, zero actual USD value' 
    },
    { 
      type: isAr ? 'المقيمون بالعملات الأجنبية' : 'Residents in Foreign', 
      feb24: '6,174.8T', 
      may26: '5,674.3T', 
      diff: '-8.1%', 
      desc: isAr ? 'الشريان النازف الرئيسي بقيمة ٥.٦ مليار$' : 'The main bleeding artery worth $5.6B' 
    },
    { 
      type: isAr ? 'غير المقيمين (الاغتراب)' : 'Non-Residents (Diaspora)', 
      feb24: '1,884.5T', 
      may26: '1,913.8T', 
      diff: '+1.6%', 
      desc: isAr ? 'صمود استثنائي يعبر عن التزام المغتربين' : 'Striking resilience showcasing diaspora loyalty' 
    },
  ];

  // Calculations based on interactive Gold toggle
  const goldValue = 41.7;
  const liquidCash = 11.4;
  const externalAssets = 9.5;
  const totalDeposits = 89.4;

  const totalAvailable = liquidCash + externalAssets + (liquidateGold ? goldValue : 0);
  const gap = totalDeposits - totalAvailable;
  const recoveryRate = (totalAvailable / totalDeposits) * 100;

  return (
    <div className="bg-[#FAF8F5] text-zinc-900 border border-zinc-300 p-4 md:p-6 my-4 font-serif text-right rtl:text-right ltr:text-left" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      
      {/* Visual Header */}
      <div className="border-b-2 border-zinc-800 pb-3 mb-6">
        <div className="flex justify-between items-center text-[10px] font-mono font-black text-amber-950 uppercase tracking-widest">
          <span>{isAr ? 'بيانات مصرفية تفاعلية' : 'INTERACTIVE MONETARY MODEL'}</span>
          <span>{isAr ? 'مستند تحليلي مدمج' : 'ATTACHED LEDGER'}</span>
        </div>
        <h3 className="text-lg md:text-xl font-sans font-black tracking-tight text-zinc-950 mt-1">
          {isAr ? '❖ البنية التحليلية للودائع اللبنانية ومستقبل تسييل الأصول (٢٠٢٤-٢٠٢٦)' : '❖ Structural Autopsy of Lebanese Deposits & Asset Liquidation Models'}
        </h3>
        <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
          {isAr 
            ? 'مستند مدمج يدمج البيانات المحققة بمحاكاة ذكية للمطالبات في مواجهة احتياطيات مصرف لبنان والذهب السيادي.' 
            : 'Interactive visual workspace illustrating historical monetary trends, liquid gaps, and gold-backed salvage rates.'}
        </p>
      </div>

      {/* Grid of Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 1. 28-Month Path Interactive Widget */}
        <div className="lg:col-span-7 bg-white p-4 border border-zinc-200 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-sans font-black text-xs text-amber-900 uppercase tracking-wider border-b border-zinc-150 pb-2 mb-3">
              {isAr ? '١. مسار الودائع خلال ٢٨ شهراً (مليار دولار)' : '1. 28-Month Deposit Path ($ Billions)'}
            </h4>
            
            {/* Visual Bar representation of USD values */}
            <div className="space-y-3 my-4">
              {trendData.map((d, idx) => {
                const maxUsd = 95.0;
                const percent = (d.usd / maxUsd) * 100;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xxs font-mono text-zinc-500">
                      <span className="font-bold">{d.period}</span>
                      <span>{d.lbp} {isAr ? 'ل.ل.' : 'LBP'} | <strong className="text-zinc-900 font-sans">${d.usd}B</strong> ({d.change})</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2.5 rounded-xs overflow-hidden relative border border-zinc-200">
                      <div 
                        className={`h-full ${idx === trendData.length - 1 ? 'bg-red-800' : 'bg-amber-700/85'} transition-all duration-1000`} 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-red-50/50 border border-red-200/50 p-2.5 text-xxs leading-relaxed font-mono text-red-950 mt-2">
            <strong>{isAr ? 'صافي التغيّر الكلي:' : 'NET CUMULATIVE SHRINKAGE:'}</strong> {isAr ? 'تراجع بمقدار ٥.٥ مليار دولار (-٥.٨٪) بمعدل استنزاف يقارب ١٩٦ مليون دولار شهرياً.' : 'Shrunk by $5.5B (-5.8%) at a slow-bleed pace of ~$196M per month.'}
          </div>
        </div>

        {/* 2. Components & Currency Distribution */}
        <div className="lg:col-span-5 bg-white p-4 border border-zinc-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h4 className="font-sans font-black text-xs text-amber-900 uppercase tracking-wider border-b border-zinc-150 pb-2 mb-3">
              {isAr ? '٢. تفصيل مكونات الودائع والحصة (مايو ٢٠٢٦)' : '2. Component Share Autopsy (May 2026)'}
            </h4>

            <div className="space-y-3 font-mono">
              {componentsData.map((c, idx) => (
                <div key={idx} className="border-b border-zinc-100 pb-2 last:border-none last:pb-0">
                  <div className="flex justify-between text-xxs">
                    <span className="font-sans font-bold text-zinc-800">{c.name}</span>
                    <span className="font-bold text-zinc-900">${c.usd}B ({c.pct}%)</span>
                  </div>
                  <div className="w-full bg-zinc-150 h-1.5 mt-1 rounded-full overflow-hidden">
                    <div className={`h-full ${c.color}`} style={{ width: `${c.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-3">
            <h4 className="font-sans font-black text-xs text-amber-900 uppercase tracking-wider mb-2">
              {isAr ? '٣. التوزع بحسب العملة وعامل المخاطرة' : '3. Currency Risk Segmentation'}
            </h4>
            <div className="space-y-2 text-xxs">
              {currencyData.map((curr, idx) => (
                <div key={idx} className="p-2 bg-stone-50 border border-zinc-200 leading-relaxed">
                  <div className="flex justify-between font-mono font-bold text-zinc-900">
                    <span>{curr.type}</span>
                    <span className="text-red-800 font-sans">{curr.diff}</span>
                  </div>
                  <p className="text-zinc-600 font-serif mt-0.5">{curr.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 3. Assets Liabilities Gap Simulator (HIGH INTERACTIVE VALUE) */}
      <div className="mt-6 bg-amber-50/40 p-4 border-2 border-dashed border-amber-900/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h4 className="font-sans font-black text-xs text-amber-950 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-800"></span>
              <span>{isAr ? 'محاكاة تسييل الأصول والفجوة التمويلية للودائع (تفاعلي)' : 'BALANCE SHEET GAP & ASSET LIQUIDATION SIMULATOR (Interactive)'}</span>
            </h4>
            <p className="text-xxs text-zinc-600 mt-1">
              {isAr 
                ? 'البنوك مطالبة بمبلغ ٨٩.٤ مليار دولار. قم بتبديل الذهب أدناه لرؤية كيف ينكمش العجز السيادي فورياً.' 
                : 'Commercial banks owe depositors $89.4B. Toggle gold liquidation below to see recovery parameters shift.'}
            </p>
          </div>
          
          <button 
            onClick={() => setLiquidateGold(!liquidateGold)}
            className={`font-mono text-xxs font-black px-4 py-2 border-2 uppercase transition-all duration-300 cursor-pointer ${
              liquidateGold 
                ? 'bg-amber-600 border-amber-700 text-white shadow-inner animate-pulse' 
                : 'bg-white border-zinc-800 text-zinc-900 hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            ✦ {isAr ? (liquidateGold ? 'تعطيل تسييل الذهب ✕' : 'تفعيل خيار تسييل الذهب 🗲') : (liquidateGold ? 'DISABLE GOLD LIQUIDATION ✕' : 'AUTHORIZE GOLD LIQUIDATION 🗲')}
          </button>
        </div>

        {/* Financial meters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center my-4">
          <div className="bg-white p-3 border border-zinc-200">
            <span className="text-zinc-500 text-[9px] block uppercase font-bold">{isAr ? 'المطالبات الاسمية الكلية:' : 'TOTAL DEPOSIT LIABILITY:'}</span>
            <span className="text-lg font-black text-zinc-950 font-sans">${totalDeposits}B</span>
          </div>
          <div className="bg-white p-3 border border-zinc-200">
            <span className="text-zinc-500 text-[9px] block uppercase font-bold">{isAr ? 'السيولة المعبأة والمتاحة:' : 'LIQUID RECOVERY COVERAGE:'}</span>
            <span className="text-lg font-black text-emerald-800 font-sans">${totalAvailable.toFixed(1)}B</span>
          </div>
          <div className="bg-white p-3 border border-zinc-200">
            <span className="text-zinc-500 text-[9px] block uppercase font-bold">{isAr ? 'الفجوة غير المغطاة (العجز):' : 'NET UNFUNDED DEFICIT:'}</span>
            <span className="text-lg font-black text-red-800 font-sans">${gap.toFixed(1)}B</span>
          </div>
        </div>

        {/* Visual stack bar */}
        <div className="space-y-1.5 my-4">
          <span className="text-[10px] font-mono text-zinc-500 block">{isAr ? 'مقارنة فجوة الميزانية التراكمية في مواجهة الودائع الكلية:' : 'Visual Mismatch & Covered Liquidity Stack:'}</span>
          <div className="w-full bg-zinc-200 h-6 flex border border-zinc-400 font-mono text-[9px] font-black text-white text-center leading-6 select-none">
            <div className="bg-emerald-600 transition-all duration-500" style={{ width: `${(liquidCash / totalDeposits) * 100}%` }} title={isAr ? 'سيولة نقدية BdL' : 'Liquid cash BdL'}>
              ${liquidCash}B
            </div>
            <div className="bg-emerald-800 transition-all duration-500" style={{ width: `${(externalAssets / totalDeposits) * 100}%` }} title={isAr ? 'أصول المصارف الخارجية' : 'Bank external assets'}>
              ${externalAssets}B
            </div>
            {liquidateGold && (
              <div className="bg-amber-600 transition-all duration-500 animate-pulse" style={{ width: `${(goldValue / totalDeposits) * 100}%` }} title={isAr ? 'تسييل الذهب' : 'Gold Liquidation'}>
                ${goldValue}B
              </div>
            )}
            <div className="bg-red-800 text-white transition-all duration-500 flex-1 min-w-[30px]" title={isAr ? 'العجز غير الممول' : 'Unfunded Deficit'}>
              ${gap.toFixed(1)}B
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-zinc-600 font-mono mt-1">
            <span>{isAr ? `معدل استرداد المودعين الفعلي: ${recoveryRate.toFixed(1)}٪` : `Actual Sovereign Recovery Index: ${recoveryRate.toFixed(1)}%`}</span>
            <span className="text-amber-900 font-bold">
              {liquidateGold 
                ? (isAr ? 'تضمين الذهب يدعم التعافي لـ ٧٠٪' : 'Gold inclusion unlocks ~70% recovery') 
                : (isAr ? 'بدون ذهب: التعافي يقتصر على ٢٣٪' : 'Without gold: Recovery capped at ~23%')
              }
            </span>
          </div>
        </div>
      </div>

      {/* 4. Future Projections Simulation Scenarios */}
      <div className="mt-6">
        <h4 className="font-sans font-black text-xs text-amber-900 uppercase tracking-wider mb-3">
          {isAr ? '٤. محاكاة المستقبل — ثلاثة سيناريوهات تشريعية لعام ٢٠٢٨-٢٠٣٣' : '4. Projections Simulator — Three Legislative Scenarios (2028-2033)'}
        </h4>

        {/* Tab buttons */}
        <div className="flex border-b border-zinc-200 gap-1 font-sans text-xs">
          <button 
            onClick={() => setSelectedScenario('A')}
            className={`py-2.5 px-3 font-black border-t-2 transition-all cursor-pointer ${
              selectedScenario === 'A' 
                ? 'border-red-800 bg-white text-zinc-950 font-black border-r border-l border-zinc-200' 
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {isAr ? 'س: الشلل المستمر (٦٠٪)' : 'S-A: Continuous Paralysis (60%)'}
          </button>
          <button 
            onClick={() => setSelectedScenario('B')}
            className={`py-2.5 px-3 font-black border-t-2 transition-all cursor-pointer ${
              selectedScenario === 'B' 
                ? 'border-amber-600 bg-white text-zinc-950 font-black border-r border-l border-zinc-200' 
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {isAr ? 'برنامج النقد وصندوق التعافي (٢٥٪)' : 'S-B: IMF & Bail-in (25%)'}
          </button>
          <button 
            onClick={() => setSelectedScenario('C')}
            className={`py-2.5 px-3 font-black border-t-2 transition-all cursor-pointer ${
              selectedScenario === 'C' 
                ? 'border-emerald-600 bg-white text-zinc-950 font-black border-r border-l border-zinc-200' 
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {isAr ? 'تسييل الذهب الكامل (١٥٪)' : 'S-C: Sovereign Gold Mobilization (15%)'}
          </button>
        </div>

        {/* Scenario content cards */}
        <div className="bg-white p-4 border-r border-l border-b border-zinc-200">
          {selectedScenario === 'A' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-red-800 font-bold">☠ {isAr ? 'السيناريو أ: استمرار الجمود والنزيف الصامت' : 'Scenario A: Slow Attrition & Off-market Write-offs'}</span>
                <span className="bg-zinc-100 text-zinc-700 px-2 py-0.5 font-bold">{isAr ? 'مستقبل مرجح' : 'Highly Probable'}</span>
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed font-serif">
                {isAr 
                  ? 'لا توقيع لاتفاق صندوق النقد الدولي، وتتجنب السلطة السياسية إصدار قوانين معالجة البنوك. تتآكل الودائع بـ ٢.٨ مليار دولار سنوياً من خلال سحوبات السحابة، وتسويات الديون، وتعديلات الليرة غير الرسمية. يتخلى المودعون سلوكياً عن أموالهم.' 
                  : 'Zero structural reforms. Deposits degrade by $2.8B annually via informal capital discounts, debt-offsets, and hyper-inflationary conversions. Banking sector is marginalized while cash-economy reigns.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center font-mono text-xxs border-t border-dashed border-zinc-200 pt-3">
                <div className="p-2 bg-stone-50">
                  <span className="text-zinc-500 uppercase block">{isAr ? 'الودائع المتبقية ٢٠٢٨:' : 'REMAINING DEPOSITS 2028:'}</span>
                  <strong className="text-sm font-sans text-red-900">$82.6B</strong>
                </div>
                <div className="p-2 bg-stone-50">
                  <span className="text-zinc-500 uppercase block">{isAr ? 'الودائع المتبقية ٢٠٣٣:' : 'REMAINING DEPOSITS 2033:'}</span>
                  <strong className="text-sm font-sans text-red-900">$68.6B</strong>
                </div>
                <div className="p-2 bg-stone-50">
                  <span className="text-zinc-500 uppercase block">{isAr ? 'معدل الاسترداد الفعلي:' : 'ACTUAL VALUE INDEX:'}</span>
                  <strong className="text-sm font-sans text-red-900">15–18¢ / $1.00</strong>
                </div>
              </div>
            </div>
          )}

          {selectedScenario === 'B' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-amber-800 font-bold">🛠 {isAr ? 'السيناريو ب: برنامج صندوق النقد وإعادة هيكلة البنوك' : 'Scenario B: Structured Reform & Large Depositor Haircut'}</span>
                <span className="bg-amber-50 text-amber-800 px-2 py-0.5 font-bold">{isAr ? 'مشروط بإجماع برلماني' : 'Requires Reforms'}</span>
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed font-serif">
                {isAr 
                  ? 'إقرار ميزانيات إصلاحية وبداية برنامج مع صندوق النقد. يتم تفعيل صندوق تعافي يضمن حماية الودائع الصغيرة (أقل من ١٠٠ ألف دولار) بنسبة ١٠٠٪، مع فرض اقتطاعات جزئية متدرجة (Haircut) على الودائع فوق هذا الحد في مقابل سندات حكومية طويلة الأجل.' 
                  : 'Formal IMF package active. Complete protection of accounts under $100k, while balances above $100k undergo tiered restructuring and equity swaps. Sovereign gold remains untouched.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center font-mono text-xxs border-t border-dashed border-zinc-200 pt-3">
                <div className="p-2 bg-amber-50/40">
                  <span className="text-zinc-500 uppercase block">{isAr ? 'حسابات تحت الـ ١٠٠ ألف:' : 'ACCOUNTS UNDER $100K:'}</span>
                  <strong className="text-sm font-sans text-emerald-800">100% {isAr ? 'حماية كاملة' : 'Protected'}</strong>
                </div>
                <div className="p-2 bg-amber-50/40">
                  <span className="text-zinc-500 uppercase block">{isAr ? 'فوق الـ ٥٠٠ ألف دولار:' : 'ACCOUNTS OVER $500K:'}</span>
                  <strong className="text-sm font-sans text-amber-800">30%–40% {isAr ? 'استرداد' : 'Recovery'}</strong>
                </div>
                <div className="p-2 bg-amber-50/40">
                  <span className="text-zinc-500 uppercase block">{isAr ? 'جدول التنفيذ المتوقع:' : 'EXPECTED TIMELINE:'}</span>
                  <strong className="text-sm font-sans text-zinc-900">3–5 {isAr ? 'سنوات' : 'Years'}</strong>
                </div>
              </div>
            </div>
          )}

          {selectedScenario === 'C' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-emerald-800 font-bold">✨ {isAr ? 'السيناريو ج: تسييل الذهب الكامل وصندوق السيادة الكلي' : 'Scenario C: Sovereign Gold Mobilization & Maximum Recovery'}</span>
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 font-bold">{isAr ? 'يتطلب تعديل قانون الذهب ٤٢/٨٦' : 'High Political Barrier'}</span>
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed font-serif">
                {isAr 
                  ? 'يصوت البرلمان اللبناني على تسييل أو رهن الذهب البالغ ٤١.٧ مليار دولار لدعم صندوق حماية المودعين. ينخفض العجز السائل فوراً لتصل نسبة استرداد الودائع الكبرى لـ ٧٥٪ والودائع الصغيرة لـ ١٠٠٪ بالكامل.' 
                  : 'Parliaments amends the historic Law 42/86, releasing the $41.7B gold reserves into a structured Recovery Trust. This serves as a leverage multiplier raising overall average salvage rates to 80+ cents.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center font-mono text-xxs border-t border-dashed border-zinc-200 pt-3">
                <div className="p-2 bg-emerald-50/40">
                  <span className="text-zinc-500 uppercase block">{isAr ? 'إجمالي الأصول السيادية المعبأة:' : 'MOBILIZED CAPITAL TRACE:'}</span>
                  <strong className="text-sm font-sans text-emerald-800">$56B–$61B</strong>
                </div>
                <div className="p-2 bg-emerald-50/40">
                  <span className="text-zinc-500 uppercase block">{isAr ? 'متوسط الاسترداد للمودعين:' : 'AVERAGE RECOVERY INDEX:'}</span>
                  <strong className="text-sm font-sans text-emerald-800">75¢–85¢ / $1.00</strong>
                </div>
                <div className="p-2 bg-emerald-50/40">
                  <span className="text-zinc-500 uppercase block">{isAr ? 'مستلزمات تشريعية برلمانية:' : 'LEGISLATIVE BARRIER:'}</span>
                  <strong className="text-sm font-sans text-red-800">{isAr ? 'قانون استثنائي لتسييل الذهب' : 'Law 42/86 Amendment'}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
