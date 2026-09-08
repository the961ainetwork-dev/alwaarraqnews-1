import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Scale, 
  Building2, 
  FileSpreadsheet, 
  Receipt, 
  ShieldAlert, 
  Percent,
  CheckCircle2,
  XCircle,
  BarChart3,
  Coins,
  FileCheck
} from 'lucide-react';

interface LebanonBudget2027InfographicProps {
  language: 'ar' | 'en';
}

export const LebanonBudget2027Infographic: React.FC<LebanonBudget2027InfographicProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'comparison' | 'appraisal'>('overview');

  return (
    <div className="bg-zinc-950 text-white p-4 md:p-6 border border-zinc-800 shadow-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-black uppercase">
              {isAr ? 'بيانات رسمية مدققة' : 'AUDITED FISCAL MATRIX'}
            </span>
            <span className="text-zinc-500 font-mono text-[10px]">
              AW-FILE-32 / LEBANON-BUDGET-2027
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-sans font-black text-white">
            {isAr 
              ? 'مؤشرات مسودة موازنة 2027: تفكيك المنظومة الضريبية والفجوة الهيكلية' 
              : 'Lebanon Draft Budget 2027: Fiscal Architecture & Structural Tax Gap'}
          </h3>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            {isAr 
              ? 'إعداد وتحليل: معن برازي — وحدة التحقيقات الاستقصائية بصحيفة الورّاق' 
              : 'Research & Analysis: Maan Barazi — Al-Warraq Investigative Unit'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-sm gap-1 self-stretch md:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'overview' ? 'bg-amber-500 text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'الأرقام الكلية' : 'Macro Metrics'}
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'comparison' ? 'bg-amber-500 text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'فجوة أرباح الشركات' : 'Corporate Tax Gap'}
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3 py-1.5 text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'articles' ? 'bg-amber-500 text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'الفصل الثالث (المواد 15-58)' : 'Chapter III Articles'}
          </button>
          <button
            onClick={() => setActiveTab('appraisal')}
            className={`px-3 py-1.5 text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'appraisal' ? 'bg-amber-500 text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'ميزان العدالة الضريبية' : 'Equity Appraisal'}
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW MACRO METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-amber-500"></div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                {isAr ? 'إجمالي الإنفاق المقترح' : 'Total Proposed Spending'}
              </span>
              <div className="text-2xl md:text-3xl font-mono font-black text-amber-400">
                $6.87 B
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 font-mono">
                {isAr ? '+614 تريليون ليرة (+15% مقارنة بـ 2026 و+40% مقارنة بـ 2025)' : '+614 Trillion LBP (+15% vs 2026, +40% vs 2025)'}
              </p>
            </div>

            {/* Metric 2 */}
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-emerald-500"></div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                {isAr ? 'عجز الموازنة المعلن' : 'Projected Fiscal Deficit'}
              </span>
              <div className="text-2xl md:text-3xl font-mono font-black text-emerald-400">
                0.00 %
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 font-mono">
                {isAr ? 'فرضية توازن مالي دون عجز في توقعات وزارة المالية' : 'Official Ministry of Finance zero-deficit balanced assumption'}
              </p>
            </div>

            {/* Metric 3 */}
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-red-500"></div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                {isAr ? 'هيمنة فاتورة أجور القطاع العام' : 'Public Sector Wage Bill'}
              </span>
              <div className="text-2xl md:text-3xl font-mono font-black text-red-400">
                53.54 %
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 font-mono">
                {isAr ? 'تلتهم أكثر من نصف اعتمادات الموازنة (8.61% من الناتج المحلي GDP)' : 'Swallows over half of budget appropriations (8.61% of GDP)'}
              </p>
            </div>

            {/* Metric 4 */}
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-blue-500"></div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                {isAr ? 'سعر الصرف المعتمد للجباية' : 'Tax Collection Exchange Rate'}
              </span>
              <div className="text-2xl md:text-3xl font-mono font-black text-blue-400">
                89,500 LBP
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 font-mono">
                {isAr ? 'دولرة كاملة للرسوم مقابل جمود الرواتب الرسمية عند 30,000 ليرة' : 'Full revenue dollarization vs wages frozen at ~30k LBP'}
              </p>
            </div>
          </div>

          {/* Core Findings Callout Box */}
          <div className="border border-zinc-800 bg-zinc-900/40 p-4 rounded-sm">
            <h4 className="font-mono font-bold text-xs uppercase text-amber-400 mb-2 flex items-center gap-2">
              <AlertTriangle size={14} />
              <span>{isAr ? 'مفارقة دولرة الضرائب وجمود الأجور' : 'The Dollarization vs Frozen Wage Paradox'}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif leading-relaxed text-zinc-300">
              <div className="p-3 bg-zinc-950 border border-zinc-800/80">
                <span className="font-mono font-bold text-[10px] text-red-400 block mb-1 uppercase">
                  {isAr ? 'جانب الإيرادات (الدولة)' : 'State Revenue Collection'}
                </span>
                <p>
                  {isAr 
                    ? 'أصبحت كافة إيرادات الدولة، والرسوم الجمركية، والضريبة على القيمة المضافة، ورسوم الطابع تُقيّم وتُستوفى بالكامل بسعر الصرف الفعلي (89,500 ليرة للدولار)، مما يضمن تدفقاً دولارياً كاملاً للخزينة.'
                    : 'All government revenues, customs duties, VAT, and official stamps are fully assessed and levied at the real market rate (89,500 LBP/USD), effectively dollarizing treasury inflows.'}
                </p>
              </div>
              <div className="p-3 bg-zinc-950 border border-zinc-800/80">
                <span className="font-mono font-bold text-[10px] text-amber-400 block mb-1 uppercase">
                  {isAr ? 'جانب المواطن والموظف' : 'Citizen & Wage-Earner Reality'}
                </span>
                <p>
                  {isAr 
                    ? 'بينما تم تعديل أسعار الضرائب فورياً، لا تزال رواتب موظفي القطاع العام والشرائح الواسعة من المتقاعدين والأجراء عالقة عند أسعار صرف قديمة لا تتجاوز 30,000 ليرة في أفضل السيناريوهات، مما يفاقم تآكل القدرة الشرائية.'
                    : 'While tax collection was instantaneously updated, public sector compensation and pensions remain trapped at legacy conversion scales (~30,000 LBP), accelerating purchasing power collapse.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CORPORATE TAX GAP & INTERNATIONAL BENCHMARK */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800 p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
              <div>
                <h4 className="font-sans font-black text-sm text-white">
                  {isAr ? 'تدني جباية ضرائب أرباح الشركات: المقارنة بالمعايير الدولية' : 'Corporate Income Tax Gap: International Benchmarks'}
                </h4>
                <p className="text-xs text-zinc-400 font-mono">
                  {isAr ? 'تحصيل 444 مليون دولار فقط تمثل 1.04% فقط من الناتج المحلي الإجمالي' : 'Only $444M projected, representing a mere 1.04% of GDP'}
                </p>
              </div>
              <div className="text-right rtl:text-right ltr:text-left font-mono">
                <span className="text-[10px] text-zinc-500 uppercase block">{isAr ? 'فجوة الإيرادات المهدورة' : 'Revenue Loss Gap'}</span>
                <span className="text-sm font-black text-red-400">$1,056,000,000+</span>
              </div>
            </div>

            {/* Benchmark Bars */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-red-400 font-bold">{isAr ? 'لبنان (مشروع موازنة 2027)' : 'Lebanon (Budget 2027 Draft)'}</span>
                  <span className="font-bold text-red-400">1.04% of GDP ($444M)</span>
                </div>
                <div className="w-full bg-zinc-800 h-4 rounded-xs overflow-hidden">
                  <div className="bg-red-500 h-full" style={{ width: `${(1.04 / 4.0) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-300">{isAr ? 'متوسط الدول الأفريقية' : 'African Nations Average'}</span>
                  <span className="text-zinc-300">3.30% of GDP</span>
                </div>
                <div className="w-full bg-zinc-800 h-4 rounded-xs overflow-hidden">
                  <div className="bg-zinc-500 h-full" style={{ width: `${(3.30 / 4.0) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-amber-400 font-bold">{isAr ? 'المتوسط العالمي العام' : 'Global Average Target'}</span>
                  <span className="text-amber-400 font-bold">3.50% of GDP (~$1.5B)</span>
                </div>
                <div className="w-full bg-zinc-800 h-4 rounded-xs overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: `${(3.50 / 4.0) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-300">{isAr ? 'الدول متوسطة الدخل (MICs)' : 'Middle-Income Countries (MICs)'}</span>
                  <span className="text-zinc-300">3.60% of GDP</span>
                </div>
                <div className="w-full bg-zinc-800 h-4 rounded-xs overflow-hidden">
                  <div className="bg-zinc-400 h-full" style={{ width: `${(3.60 / 4.0) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-emerald-400">{isAr ? 'دول منظمة التعاون الاقتصادي (OECD)' : 'OECD Member Economies'}</span>
                  <span className="text-emerald-400">3.80% of GDP</span>
                </div>
                <div className="w-full bg-zinc-800 h-4 rounded-xs overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${(3.80 / 4.0) * 100}%` }}></div>
                </div>
              </div>
            </div>

            {/* Explanatory Note */}
            <div className="mt-4 p-3 bg-red-950/30 border border-red-900/50 rounded text-xs font-serif text-zinc-300">
              <p>
                {isAr 
                  ? 'لو جَبَى لبنان ضرائب الأرباح وفق المتوسط العالمي (3.5% من الناتج المحلي)، لبلغت الإيرادات المحصلة نحو 1.5 مليار دولار بدلاً من 444 مليون دولار فقط — أي أكثر من ثلاثة أضعاف المبلغ المرصود، ما يكفي لسد العجز وتمويل الاستثمار الرأسمالي دون المساس بالطبقات العاملة.'
                  : 'Had Lebanon levied corporate taxes at the modest global average (3.5% of GDP), revenues would have reached $1.5 Billion rather than $444M — over triple the budgeted receipts, sufficient to balance spending without burdening wage-earners.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHAPTER III ARTICLES BREAKDOWN */}
      {activeTab === 'articles' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Section A */}
            <div className="bg-zinc-900/70 border border-zinc-800 p-3 space-y-2">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-1.5">
                <Building2 size={15} className="text-amber-400" />
                <h5 className="font-sans font-bold text-white uppercase text-xs">
                  {isAr ? '1. ضريبة الدخل والشركات' : '1. Income & Corporate Tax'}
                </h5>
              </div>
              <ul className="space-y-2 font-serif text-zinc-300 text-[11px]">
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 15 (تصريح الرواتب): ' : 'Art 15 (Payroll Reporting): '}</strong>
                  {isAr ? 'إلزامية تقديم بيانات سنوية بالرواتب بحلول 1 نيسان مع تقارير الاقتطاع الفردية.' : 'Mandatory annual payroll declarations by April 1 with individual withholding sheets.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 16 (التنزيل اليومي): ' : 'Art 16 (Daily Allowance): '}</strong>
                  {isAr ? 'تنزيل ضريبي 1.5 مليون ليرة يومياً، وضريبة مقطوعة 3% على العمالة المؤقتة دون تنزيل.' : '1.5M LBP daily base deduction; 3% flat tax on temporary contract labor.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 17 (تسوية الدخل الخارجي): ' : 'Art 17 (Foreign Income Amnesty): '}</strong>
                  {isAr ? 'مهلة 6 أشهر للمقيمين للتصريح وسداد ضريبة الدخل الخارجي دون أي غرامات.' : '6-month penalty-free grace period for resident foreign income declarations.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 19 (أرباح العقارات الرأسمالية): ' : 'Art 19 (Real Estate Capital Gains): '}</strong>
                  {isAr ? '10% للأفراد و15% للشركات، مع تخفيض 8% سنوياً وإعفاء كامل بعد 12 سنة ملكية.' : '10% on individuals, 15% on entities; 8% annual step-down, full exemption after 12 yrs.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المواد 20–24 (الأوفشور والقابضة): ' : 'Arts 20-24 (Offshore & Holding): '}</strong>
                  {isAr ? 'محاسبة بالدولار أو اليورو، ورفع الضريبة السنوية المقطوعة 4 أضعاف إلى 200 مليون ليرة.' : 'Forex books allowed; flat annual tax hiked 4x to 200,000,000 LBP.'}
                </li>
              </ul>
            </div>

            {/* Section B */}
            <div className="bg-zinc-900/70 border border-zinc-800 p-3 space-y-2">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-1.5">
                <Receipt size={15} className="text-blue-400" />
                <h5 className="font-sans font-bold text-white uppercase text-xs">
                  {isAr ? '2. الضرائب غير المباشرة و VAT' : '2. Indirect Taxes & VAT'}
                </h5>
              </div>
              <ul className="space-y-2 font-serif text-zinc-300 text-[11px]">
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 25 (مشروبات الطاقة): ' : 'Art 25 (Energy Drinks): '}</strong>
                  {isAr ? 'رسم استهلاك داخلي 15,000 ليرة لكل لتر اعتباراً من 30 تشرين الأول 2025.' : '15,000 LBP per liter excise duty effective Oct 30, 2025.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 48 (الخدمات الرقمية الأجنبية): ' : 'Art 48 (Digital Cross-Border VAT): '}</strong>
                  {isAr ? 'إلزام مزودي الخدمات الإلكترونية بالخارج بتعيين ممثل محلي واستيفاء الـ VAT.' : 'Mandatory fiscal rep and VAT remittance for foreign tech and digital suppliers.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 47 (عقوبات عدم تسجيل VAT): ' : 'Art 47 (Unregistered VAT Sanctions): '}</strong>
                  {isAr ? 'تكليف رتعي على إيرادات الأملاك المبنية أو ضعف هامش الربح المقطوع.' : 'Ex-officio assessment based on building tax or double standard profit margin.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 45 (المؤسسات الفردية): ' : 'Art 45 (Sole Proprietorships): '}</strong>
                  {isAr ? 'إعفاء التفرغ الكامل للمؤسسة الفردية من الضريبة على القيمة المضافة كنشاط مستمر.' : 'Full VAT transfer relief for sole proprietorships treated as going concerns.'}
                </li>
              </ul>
            </div>

            {/* Section C */}
            <div className="bg-zinc-900/70 border border-zinc-800 p-3 space-y-2">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-1.5">
                <Coins size={15} className="text-emerald-400" />
                <h5 className="font-sans font-bold text-white uppercase text-xs">
                  {isAr ? '3. الطابع المالي، التركات والجمارك' : '3. Stamp Duties, Estates & Customs'}
                </h5>
              </div>
              <ul className="space-y-2 font-serif text-zinc-300 text-[11px]">
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المواد 26–30 (رسم الطابع): ' : 'Arts 26-30 (Stamp Duty): '}</strong>
                  {isAr ? 'تصاريح فصلية إلكترونية، و3,000,000 ليرة كرسم طابع ثابت للبيانات الجمركية.' : 'Mandatory quarterly e-filing; 3M LBP fixed stamp on all standard customs bills.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 31 (تأمين الحياة): ' : 'Art 31 (Life Insurance): '}</strong>
                  {isAr ? 'استثناء مبالغ تأمين الحياة من أصول التركة، وإخضاعها لـ 5% ضريبة مقطوعة تقتطعها الشركات.' : 'Life insurance excluded from estate pool; 5% flat withholding tax levied.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 37 (ضريبة الشاغر العقاري): ' : 'Art 37 (Vacant Property Relief): '}</strong>
                  {isAr ? 'وقف ضريبة التجاري فور الشغور؛ وسكن المطورين حتى 3 سنوات وسنة لغير المطورين ثم 50%.' : 'Commercial tax freezes upon vacant filing; developers get 3 yrs max, others 1 yr.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 56 (رسوم الفواتير الأجنبية): ' : 'Art 56 (Import Invoices): '}</strong>
                  {isAr ? 'إعادة فرض رسم التحقق الدبلوماسي بنسبة 0.4% (4 بالـ 1000) على الفواتير المستوردة.' : 'Reinstating mandatory consular invoice verification at 0.4% (4‰) ad valorem.'}
                </li>
              </ul>
            </div>

            {/* Section D */}
            <div className="bg-zinc-900/70 border border-zinc-800 p-3 space-y-2">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-1.5">
                <ShieldAlert size={15} className="text-red-400" />
                <h5 className="font-sans font-bold text-white uppercase text-xs">
                  {isAr ? '4. الإدارة الضريبية والإنفاذ الزجري' : '4. Enforcement & Compliance Penalties'}
                </h5>
              </div>
              <ul className="space-y-2 font-serif text-zinc-300 text-[11px]">
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادتان 38 و42 (بيانات الضمان): ' : 'Arts 38 & 42 (NSSF Cross-Check): '}</strong>
                  {isAr ? 'تسجيل النشاط خلال شهرين؛ وغرامة تعادل ضعف فارق الأجور بين الضريبة والضمان.' : '2-month registry deadline; fines equal to double wage delta with NSSF records.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 39 (مهل التدقيق): ' : 'Art 39 (Audit Timelines): '}</strong>
                  {isAr ? 'مهلة 15 يوماً فقط للمكلف لإبداء الملاحظات على نتائج التدقيق قبل التكليف النهائي.' : 'Narrow 15-day window for taxpayers to object before final executive assessment.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادتان 40–41 (سقوف الغرامات): ' : 'Arts 40-41 (Audit Caps): '}</strong>
                  {isAr ? 'سقف غرامة نقص التصريح 20%؛ والحد الأدنى 18.75 مليون للمساهمة و2.5 مليون للأفراد.' : 'Deficiency fine capped at 20%; minimum floors: 18.75M LBP (SAL), 2.5M LBP (Individuals).'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 43 (حظر براءات الذمة): ' : 'Art 43 (Clearance Bar): '}</strong>
                  {isAr ? 'توجيه الإدارات لحجب الخدمات العامة والمعاملات عن أي مكلف لديه متأخرات ضريبية.' : 'Government agencies directed to freeze public services to delinquent taxpayers.'}
                </li>
                <li>
                  <strong className="text-white font-sans font-semibold">{isAr ? 'المادة 44 (تخفيض الغرامات): ' : 'Art 44 (Penalty Amnesty): '}</strong>
                  {isAr ? 'تخفيض استثنائي 85% على الغرامات بشرط سداد الأصل خلال 6 أشهر من النشر.' : 'Exceptional 85% penalty rebate if principal tax is cleared within 6 months.'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FISCAL EQUITY APPRAISAL */}
      {activeTab === 'appraisal' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Progressive Elements */}
            <div className="bg-emerald-950/20 border border-emerald-800/60 p-4">
              <div className="flex items-center gap-2 mb-3 text-emerald-400">
                <CheckCircle2 size={18} />
                <h5 className="font-sans font-black text-sm uppercase">
                  {isAr ? 'العناصر التصاعدية (الأحكام العادلة)' : 'Progressive Elements (Fair Provisions)'}
                </h5>
              </div>
              <ul className="space-y-2.5 font-serif text-zinc-300 text-xs leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✦</span>
                  <span>
                    <strong>{isAr ? 'ضرب المضاربة العقارية: ' : 'Targeting Real Estate Speculation: '}</strong>
                    {isAr ? 'فرض ضريبة 10-15% على الأرباح الرأسمالية السريعة مع حماية المساكن العائلية.' : '10-15% tax curbs flipping while safeguarding primary residential units.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✦</span>
                  <span>
                    <strong>{isAr ? 'تسوية الدخل الخارجي: ' : 'Foreign Income Voluntary Amnesty: '}</strong>
                    {isAr ? 'إتاحة التصريح عن الأرباح المحققة بالخارج يضع عبئاً أكثر عدالة على الأثرياء.' : 'Encourages compliant repatriation of offshore gains from wealthy residents.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✦</span>
                  <span>
                    <strong>{isAr ? 'مضاعفة رسوم الأوفشور 4 أضعاف: ' : '4x Hike on Offshore Shells: '}</strong>
                    {isAr ? 'تعديل الرسوم المقطوعة إلى 200 مليون ليرة يمنع استفادة الشركات الكبرى من تآكل التضخم.' : 'Hikes to 200M LBP prevent wealthy holding shells from paying deflated pennies.'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Regressive Elements */}
            <div className="bg-red-950/20 border border-red-800/60 p-4">
              <div className="flex items-center gap-2 mb-3 text-red-400">
                <XCircle size={18} />
                <h5 className="font-sans font-black text-sm uppercase">
                  {isAr ? 'العناصر التنازلية (الأحكام غير العادلة)' : 'Regressive Elements (Unfair Burdens)'}
                </h5>
              </div>
              <ul className="space-y-2.5 font-serif text-zinc-300 text-xs leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✦</span>
                  <span>
                    <strong>{isAr ? 'الهيمنة الساحقة للضرائب غير المباشرة: ' : 'Overreliance on Indirect VAT/Excise: '}</strong>
                    {isAr ? 'الضرائب على الاستهلاك تصيب الأسر الفقيرة ومتوسطة الدخل بنسبة مئوية تفوق الأثرياء.' : 'Consumption taxes disproportionately extract larger income shares from vulnerable households.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✦</span>
                  <span>
                    <strong>{isAr ? 'جباية الرواتب بدلاً من الأرباح الرأسمالية: ' : 'Wages Taxed, Windfalls Spared: '}</strong>
                    {isAr ? 'تعتمد الموازنة على الاقتطاع من رواتب الموظفين بدلاً من فرض ضرائب هيكلية على الثروات.' : 'Revenues rely on fixed salary withholdings rather than aggressive wealth/corporate profit taxes.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✦</span>
                  <span>
                    <strong>{isAr ? 'الضغط التضخمي وتغذية اقتصاد الظل: ' : 'CPI Inflation & Cash Economy Shift: '}</strong>
                    {isAr ? 'رفع تكاليف الامتثال ورسوم الفواتير (0.4%) يدفع الشركات الصغيرة نحو اقتصاد الكاش غير الرسمي.' : 'Heavy compliance friction and 0.4% invoice fees risk driving SMEs deeper into the unbanked cash shadow.'}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Macro Synthesis Footer */}
          <div className="p-3 bg-zinc-900 border border-zinc-800 text-center font-mono text-[11px] text-zinc-400">
            {isAr 
              ? 'خلاصة التحقيق: الموازنة تعمل كـ "أداة جباية تشغيلية قصيرة الأجل" لتغطية عجز الرواتب بدلاً من أن تكون محفزاً حقيقياً للنمو الاقتصادي أو الاستثمار في البنية التحتية المنهارة.'
              : 'Core Synthesis: Budget 2027 acts as a short-term operational collection tool to plug payroll outlays rather than a strategic catalyst for capital investment or structural recovery.'}
          </div>
        </div>
      )}
    </div>
  );
};
