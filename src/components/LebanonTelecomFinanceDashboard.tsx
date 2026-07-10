import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Network, 
  Database, 
  Building2, 
  HelpCircle, 
  Info, 
  Lock, 
  Unlock, 
  Layers, 
  Radio, 
  FileText, 
  ChevronRight, 
  ArrowRightLeft,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { Article } from '../types';
import { NEW_ARTICLES } from '../newArticles';

interface LebanonTelecomFinanceDashboardProps {
  language: 'ar' | 'en';
  layoutMode?: 'digital' | 'classic-print';
  onSelectArticle?: (article: Article) => void;
}

export const LebanonTelecomFinanceDashboard: React.FC<LebanonTelecomFinanceDashboardProps> = ({
  language,
  layoutMode = 'digital',
  onSelectArticle
}) => {
  const isAr = language === 'ar';
  const isPrint = layoutMode === 'classic-print';

  const [activeTab, setActiveTab] = useState<'indicators' | 'sandbox' | 'dossiers'>('indicators');

  // Strategic simulation states
  const [collateralAsset, setCollateralAsset] = useState<'none' | 'telecom' | 'gold-telecom'>('none');
  const [regulatoryPath, setRegulatoryPath] = useState<'bypass' | 'compliant'>('bypass');

  // Find relevant articles from our global datasets
  // We want to highlight the telecom-restructuring-unknown-2026 article, starlink-lebanon-sovereignty, and BDL/depositors related ones.
  const relevantArticles = NEW_ARTICLES.filter(art => 
    art.id === 'telecom-restructuring-unknown-2026' || 
    art.id === 'starlink-lebanon-sovereignty-exclusives' ||
    art.id === 'fuel-smuggling-pricing-cartels' || // financial/economic report
    art.categories?.includes('telecom-internet') ||
    art.categories?.includes('economy') && art.categories?.includes('lebanon')
  ).slice(0, 4);

  // Sector stats
  const telecomRiskScore = regulatoryPath === 'bypass' ? 8.2 : 3.5;
  const infrastructureScore = collateralAsset === 'none' ? 30 : collateralAsset === 'telecom' ? 65 : 85;
  const sovereigntyScore = regulatoryPath === 'bypass' ? 45 : 92;
  const depositorTrust = collateralAsset === 'none' ? 14 : collateralAsset === 'telecom' ? 48 : 72;

  // Render helpers
  const t = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <div className={`border-4 border-black p-5 md:p-6 bg-white transition-all font-sans relative ${
      isPrint ? 'vintage-paper border-[#1b2b1d] text-[#1b2b1d]' : 'bg-white text-zinc-900 shadow-md'
    }`}>
      {/* Editorial Decorative Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-amber-700" />

      {/* Header section with double border */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-5 border-b-2 border-black border-double pt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Radio className="text-red-600 animate-pulse shrink-0" size={24} />
            <h4 className="font-sans font-black text-xl md:text-2xl tracking-tighter uppercase text-zinc-950">
              {t("Telecom & Finance Intelligence Terminal", "مرصد الاتصالات والمالية اللبنانية")}
            </h4>
          </div>
          <p className="text-xxs font-mono text-zinc-500 uppercase tracking-wider">
            {t("Geopolitical Oversight & Infrastructure Audits • July 2026", "الرقابة الجيوسياسية والتدقيق في البنية التحتية • يوليو ٢٠٢٦")}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border border-black p-0.5 mt-4 md:mt-0 max-w-full overflow-x-auto shrink-0 font-sans text-xs font-black">
          <button
            onClick={() => setActiveTab('indicators')}
            className={`px-3 py-1.5 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'indicators' ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-700'
            }`}
          >
            {t("Sector Indicators", "مؤشرات القطاعات")}
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-3 py-1.5 cursor-pointer transition-colors border-x border-zinc-200 whitespace-nowrap ${
              activeTab === 'sandbox' ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-700'
            }`}
          >
            {t("Policy Sandbox", "محاكاة الخيارات")}
          </button>
          <button
            onClick={() => setActiveTab('dossiers')}
            className={`px-3 py-1.5 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'dossiers' ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-700'
            }`}
          >
            {t("Investigative Dossiers", "ملفات التحقيق الصحفي")}
          </button>
        </div>
      </div>

      {/* Brief Quick Glance Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="border border-black p-3 bg-red-50/50 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xxs font-mono font-bold text-red-700 uppercase block">
              {t("Telecom Regulatory Status", "حالة قطاع الاتصالات")}
            </span>
            <span className="font-sans font-black text-sm text-zinc-950">
              {t("HIGH REGULATORY RISK", "مخاطر تنظيمية مرتفعة")}
            </span>
          </div>
          <ShieldAlert className="text-red-600" size={20} />
        </div>

        <div className="border border-black p-3 bg-amber-50/50 flex items-center justify-between border-l-0 sm:border-l">
          <div className="space-y-0.5">
            <span className="text-xxs font-mono font-bold text-amber-800 uppercase block">
              {t("Asset Protection Index", "مؤشر حماية الأصول")}
            </span>
            <span className="font-sans font-black text-sm text-zinc-950">
              {t("SYSTEMIC LIQUIDITY GAP", "فجوة سيولة هيكلية")}
            </span>
          </div>
          <Database className="text-amber-600" size={20} />
        </div>

        <div className="border border-black p-3 bg-zinc-50 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xxs font-mono font-bold text-zinc-600 uppercase block">
              {t("Infrastructure Readyness", "جاهزية البنية التحتية")}
            </span>
            <span className="font-sans font-black text-sm text-zinc-950">
              {t("CRITICALLY CONSTRAINED", "عجز تشغيلي حرج")}
            </span>
          </div>
          <Building2 className="text-zinc-600" size={20} />
        </div>
      </div>

      {/* TAB CONTENT 1: INDICATORS */}
      {activeTab === 'indicators' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Box: Telecom Sector Risk Breakdown */}
            <div className="border border-black p-4 space-y-4">
              <div className="border-b border-zinc-200 pb-2">
                <h5 className="font-sans font-black text-sm uppercase text-red-700 flex items-center gap-1.5">
                  <Network size={16} />
                  <span>{t("Telecom De-structuring Metrics", "تفكيك البنية التحتية للاتصالات")}</span>
                </h5>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  {t("Evaluating the decree to abolish ministry operational directorates", "تحليل تداعيات قرار إلغاء المديريات العامة التشغيلية قبل بديل ليبان تليكوم")}
                </p>
              </div>

              <div className="space-y-3 font-sans">
                {/* Metric 1 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{t("Regulatory Vacuum Exposure", "مستوى الفراغ التنظيمي")}</span>
                    <span className="text-red-600 font-mono">8.2 / 10</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2 border border-black overflow-hidden p-0.5">
                    <div className="bg-red-600 h-full" style={{ width: '82%' }} />
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-tight">
                    {t("Caused by dismantling the general directorate of maintenance before establishing Liban Telecom.", "ناجم عن إلغاء مديرية الصيانة والإنشاءات والتمويل قبل ولادة هيكل ليبان تليكوم الرسمي.")}
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{t("Digital Sovereignty Vulnerability (Starlink)", "مخاطر السيادة الرقمية (ستارلينك)")}</span>
                    <span className="text-amber-600 font-mono">7.5 / 10</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2 border border-black overflow-hidden p-0.5">
                    <div className="bg-amber-500 h-full" style={{ width: '75%' }} />
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-tight">
                    {t("Direct bypass of the Telecom Regulatory Authority (TRA) by ministerial emergency decrees.", "التجاوز المباشر لصلاحيات الهيئة المنظمة للاتصالات بموجب قرارات استثنائية صادرة عن الوزير.")}
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{t("Broadband FTTH Implementation Latency", "تأخر تنفيذ حزم الألياف الضوئية")}</span>
                    <span className="text-zinc-600 font-mono">75% {t("Delayed", "تأخير")}</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2 border border-black overflow-hidden p-0.5">
                    <div className="bg-zinc-600 h-full" style={{ width: '75%' }} />
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-tight">
                    {t("Ogero optical fiber project achieved only 25% target nationwide as of mid-2026.", "مشروع أوجيرو للألياف الضوئية لم يحقق سوى ٢٥٪ من أهدافه على مستوى القطر حتى منتصف عام ٢٠٢٦.")}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Box: Banking & Deposit Asset Protection Scrutiny */}
            <div className="border border-black p-4 space-y-4">
              <div className="border-b border-zinc-200 pb-2">
                <h5 className="font-sans font-black text-sm uppercase text-amber-700 flex items-center gap-1.5">
                  <Database size={16} />
                  <span>{t("Financial Gap & Deposit Protections", "فجوة الودائع وحماية الأصول السيادية")}</span>
                </h5>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  {t("Auditing legislative structures to collateralize debt with state utilities", "تحليل مقترحات رهن أو دعم سندات الخزينة بأصول ومؤسسات الدولة (أوجيرو والموانئ والذهب)")}
                </p>
              </div>

              <div className="space-y-3 font-sans">
                {/* Metric 1 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{t("Real Coverage Under $100k Protection Cap", "التغطية الفعلية تحت سقف حماية ١٠٠ ألف دولار")}</span>
                    <span className="text-red-600 font-mono">14% {t("of Total Volume", "من إجمالي حجم الودائع")}</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2 border border-black overflow-hidden p-0.5">
                    <div className="bg-red-500 h-full" style={{ width: '14%' }} />
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-tight">
                    {t("The $100,000 ceiling protects account counts but covers only 14% of the aggregate dollarized deposits.", "سقف ١٠٠ ألف دولار يحمي عدد الحسابات ولكنه يغطي ١٤٪ فقط من القيمة الإجمالية للودائع بالدولار.")}
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{t("State Asset Backing Proposal Support", "تأييد رهن أصول الدولة كضمانات")}</span>
                    <span className="text-amber-600 font-mono">22% {t("Consensus", "إجماع")}</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2 border border-black overflow-hidden p-0.5">
                    <div className="bg-amber-500 h-full" style={{ width: '22%' }} />
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-tight">
                    {t("Chairman of Finance & Budget Committee rejects uncollateralized bonds; demands telecom/gold backing.", "رئيس لجنة المال والموازنة يرفض السندات غير المضمونة ويطالب برهن رخص الاتصالات والذهب.")}
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{t("Bilateral Currency Hold Rate (Saudi-UAE Friction)", "معدل تعليق التحويلات (القيود السعودية الإماراتية)")}</span>
                    <span className="text-red-700 font-mono">8.4%</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2 border border-black overflow-hidden p-0.5">
                    <div className="bg-red-700 h-full" style={{ width: '84%' }} />
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-tight">
                    {t("Stringent commercial auditing (RHQ rules) spikes transaction holds and delays capital flows.", "التدقيق المالي والالتزام بضوابط المقرات الإقليمية يرفع معدلات تجميد الحوالات التجارية بين بيروت والخليج.")}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Analytical Takeaway Quote */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-zinc-950">
              <Info size={14} className="text-zinc-600 shrink-0" />
              <span>{t("Terminal Synthesis", "خلاصة المرصد التحليلية")}</span>
            </div>
            <p className="font-serif italic text-zinc-600">
              {t(
                "\"The intersection of the MoT's restructuring with state financial negotiations marks a critical crossroad. Bypassing state regulatory checks allows quick deployments like Starlink, but risks total corporate capturing. Meanwhile, dismantling general directorates before establishing Liban Telecom leaves Lebanon’s telecom network without an official operator, exposing the country's main telecom licenses to aggressive asset-backing foreclosures by creditor lobbies.\"",
                "\"يمثل تقاطع إعادة هيكلة وزارة الاتصالات مع مفاوضات دعم الودائع المالية منعطفاً مصيرياً. التجاوز العاجل للصلاحيات التنظيمية يمنح تمديداً سريعاً للحلول الالتفافية (مثل ستارلينك)، ولكنه يخلق مخاطر خصخصة مقنعة تكرّس النفوذ الاحتكاري. كما أن تصفية المديريات العامة للمصالح التشغيلية يترك قطاع الاتصالات بلا شبكة حماية قانونية أو مشغل شرعي بديل، مما يعرض أصول الاتصالات لضغوط تسييل شرسة من قبل لوبيات الدائنين.\""
              )}
            </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: SANDBOX SIMULATOR */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6">
          <div className="p-4 border border-zinc-200 bg-amber-50/20 text-xs leading-relaxed space-y-1">
            <p className="font-bold text-zinc-950">
              {t("Policy Sandbox: Restructuring & Capital Safeguard Simulation", "صندوق محاكاة الخيارات: نمذجة إعادة الهيكلة وحماية الرساميل")}
            </p>
            <p className="text-zinc-600 text-xxs">
              {t("Toggle the policy choices below to simulate the immediate feedback loops on depositor confidence, digital sovereignty, and the regulatory health rating.", "اضغط على الخيارات أدناه لمحاكاة التأثيرات الفورية على ثقة المودعين، والسيادة الرقمية، والتصنيف التنظيمي العام للاتصالات.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Controls Column */}
            <div className="md:col-span-5 space-y-5">
              
              {/* Parameter 1 */}
              <div className="border border-black p-4 space-y-3">
                <label className="text-xs font-black uppercase text-zinc-900 block flex items-center gap-1.5">
                  <Building2 size={15} className="text-amber-600" />
                  <span>{t("A) Depositor Bond Backing Source", "أ) مصدر تغطية سندات المودعين")}</span>
                </label>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setCollateralAsset('none')}
                    className={`w-full text-left p-2 border.5 text-xs rounded transition-all cursor-pointer ${
                      collateralAsset === 'none' 
                        ? 'bg-zinc-950 text-white border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                        : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      {collateralAsset === 'none' && <CheckCircle2 size={13} className="text-amber-400" />}
                      <span>{t("Standard Unsecured Bonds", "سندات عادية غير مضمونة بأصول")}</span>
                    </div>
                    <p className="text-[10px] opacity-75 mt-0.5 leading-tight">
                      {t("Zero claim on physical assets. Keeps state properties untouched.", "لا حقوق للدائنين على أصول الدولة. يحفظ المؤسسات العامة ولكن يفقد الثقة.")}
                    </p>
                  </button>

                  <button
                    onClick={() => setCollateralAsset('telecom')}
                    className={`w-full text-left p-2 border.5 text-xs rounded transition-all cursor-pointer ${
                      collateralAsset === 'telecom' 
                        ? 'bg-zinc-950 text-white border-black font-bold shadow-[2px_2px_0px_0px_rgba(245,158,11,1)]' 
                        : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      {collateralAsset === 'telecom' && <CheckCircle2 size={13} className="text-amber-400" />}
                      <span>{t("Collateralize Ogero & Telecom Licenses", "رهن أوجيرو ورخص الاتصالات الوطنية")}</span>
                    </div>
                    <p className="text-[10px] opacity-75 mt-0.5 leading-tight">
                      {t("Telecom revenue streams directly back the depositor restoration fund.", "تدفقات أرباح شبكة الاتصالات تدعم صندوق استرداد الودائع.")}
                    </p>
                  </button>

                  <button
                    onClick={() => setCollateralAsset('gold-telecom')}
                    className={`w-full text-left p-2 border.5 text-xs rounded transition-all cursor-pointer ${
                      collateralAsset === 'gold-telecom' 
                        ? 'bg-zinc-950 text-white border-black font-bold shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]' 
                        : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      {collateralAsset === 'gold-telecom' && <CheckCircle2 size={13} className="text-amber-400" />}
                      <span>{t("Telecom Assets + BDL Gold Reserves", "رهن شبكة الاتصالات + احتياطي الذهب")}</span>
                    </div>
                    <p className="text-[10px] opacity-75 mt-0.5 leading-tight">
                      {t("Max security backing. Elevates depositor reclaim trust, high default risks.", "أعلى ضمانة ممكنة ترفع الثقة، لكن تعرض سيادة الذهب والشبكة لمخاطر التسييل.")}
                    </p>
                  </button>
                </div>
              </div>

              {/* Parameter 2 */}
              <div className="border border-black p-4 space-y-3">
                <label className="text-xs font-black uppercase text-zinc-900 block flex items-center gap-1.5">
                  <Network size={15} className="text-red-600" />
                  <span>{t("B) Telecom Legislative Execution", "ب) آلية التنفيذ والامتثال التشريعي")}</span>
                </label>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setRegulatoryPath('bypass')}
                    className={`w-full text-left p-2 border.5 text-xs rounded transition-all cursor-pointer ${
                      regulatoryPath === 'bypass' 
                        ? 'bg-zinc-950 text-white border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                        : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      {regulatoryPath === 'bypass' && <CheckCircle2 size={13} className="text-red-500" />}
                      <span>{t("Unilateral Ministerial Decrees (Current)", "مراسيم وقرارات وزارية أحادية (الحالي)")}</span>
                    </div>
                    <p className="text-[10px] opacity-75 mt-0.5 leading-tight">
                      {t("Fast execution (Starlink, dissolution). Bypasses TRA and State Council reviews.", "تنفيذ سريع (ستارلينك، حل المديريات) متجاوزاً مجلس شورى الدولة والهيئة التنظيمية.")}
                    </p>
                  </button>

                  <button
                    onClick={() => setRegulatoryPath('compliant')}
                    className={`w-full text-left p-2 border.5 text-xs rounded transition-all cursor-pointer ${
                      regulatoryPath === 'compliant' 
                        ? 'bg-zinc-950 text-white border-black font-bold shadow-[2px_2px_0px_0px_rgba(16,185,129,1)]' 
                        : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      {regulatoryPath === 'compliant' && <CheckCircle2 size={13} className="text-emerald-500" />}
                      <span>{t("Comprehensive Institutional Path", "مسار تشريعي ومؤسساتي شامل")}</span>
                    </div>
                    <p className="text-[10px] opacity-75 mt-0.5 leading-tight">
                      {t("Requires TRA validation, assets juring, and official Liban Telecom setup.", "يستوجب مصادقة الهيئة المنظمة، جرد الأصول، وتأسيس شركة ليبان تليكوم أولاً.")}
                    </p>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Output Column (Dashboard Gauges) */}
            <div className="md:col-span-7 border border-black p-4 bg-zinc-50 flex flex-col justify-between">
              <div>
                <div className="border-b border-zinc-200 pb-2 mb-4">
                  <h5 className="font-sans font-black text-xs uppercase text-zinc-900">
                    {t("Real-time Strategic Simulation Feedback", "التغذية العكسية الفورية للمحاكاة")}
                  </h5>
                  <p className="text-[10px] text-zinc-500">
                    {t("Dynamic outcomes modeled on policy coordinates", "النتائج التفاعلية لقرارات التغطية والتشريع")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Gauge 1 */}
                  <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">
                      {t("Depositor Trust Index", "مؤشر ثقة المودعين")}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-amber-600 font-mono">{depositorTrust}%</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${depositorTrust}%` }} />
                    </div>
                    <p className="text-[9px] text-zinc-400 leading-tight">
                      {collateralAsset === 'none' && t("Extremely weak trust. Unsecured bonds lack capital guarantees.", "ثقة معدومة. السندات غير المضمونة تفتقر لأي غطاء مالي.")}
                      {collateralAsset === 'telecom' && t("Moderate backing. Telecom licenses offer solid future utility streams.", "دعم متوسط. رخص الاتصالات تمنح المودعين تدفقات مالية معقولة.")}
                      {collateralAsset === 'gold-telecom' && t("Maximum backing. Extreme credibility but risk of total asset loss on default.", "غطاء أقصى ذو موثوقية عالية، لكنه يعرض احتياطات الدولة للتسييل.")}
                    </p>
                  </div>

                  {/* Gauge 2 */}
                  <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">
                      {t("Digital Sovereignty Rating", "تقييم السيادة الرقمية الوطنية")}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-red-600 font-mono">{sovereigntyScore}%</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-red-600 h-full transition-all duration-500" style={{ width: `${sovereigntyScore}%` }} />
                    </div>
                    <p className="text-[9px] text-zinc-400 leading-tight">
                      {regulatoryPath === 'bypass' && t("Vulnerable. Direct foreign licensing bypasses central sovereign network nodes.", "سيادة منخفضة. التراخيص المباشرة للشركات الأجنبية تتجاوز العقد المركزية للدولة.")}
                      {regulatoryPath === 'compliant' && t("Strong. Multi-layered institutional control enforces local network firewalls.", "سيادة قوية. رقابة متعددة الجهات تضمن حماية خصوصية البيانات الوطنية.")}
                    </p>
                  </div>

                  {/* Gauge 3 */}
                  <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">
                      {t("Telecom Regulatory Vacuum", "مؤشر الفراغ التنظيمي لقطاع الاتصالات")}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-red-700 font-mono">{telecomRiskScore}/10</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-red-700 h-full transition-all duration-500" style={{ width: `${telecomRiskScore * 10}%` }} />
                    </div>
                    <p className="text-[9px] text-zinc-400 leading-tight">
                      {regulatoryPath === 'bypass' && t("CRITICAL. Abolishing directorates creates immediate administrative voids.", "خطر حرج. إلغاء الهياكل التشغيلية قبل البديل يربك أعمال الصيانة.")}
                      {regulatoryPath === 'compliant' && t("STABLE. Transition of services structured smoothly with clear legal terms.", "مستقر. انتقال المهام لشركة ليبان تليكوم يتم بضوابط تشريعية واضحة.")}
                    </p>
                  </div>

                  {/* Gauge 4 */}
                  <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">
                      {t("Network Modernization Capital", "رأس مال تطوير شبكات النطاق العريض")}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-zinc-700 font-mono">{infrastructureScore}%</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-zinc-700 h-full transition-all duration-500" style={{ width: `${infrastructureScore}%` }} />
                    </div>
                    <p className="text-[9px] text-zinc-400 leading-tight">
                      {collateralAsset === 'none' && t("Constrained. Minimal foreign capital inflow due to high risk ratings.", "تمويل عاجز. ضعف تدفق الاستثمار الخارجي نتيجة لتصنيفات المخاطر المرتفعة.")}
                      {collateralAsset === 'telecom' && t("Growing. Private partner involvement pumps resources into optical fiber.", "تمويل متزايد. إشراك المستثمر الخارجي يضخ اعتمادات في مشاريع الفايبر.")}
                      {collateralAsset === 'gold-telecom' && t("Saturated. Intense global capital availability under massive guarantees.", "تمويل وفير. توفر السيولة الدولية تحت غطاء الضمانات السيادية الضخمة.")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulation Insights Callout */}
              <div className="mt-4 p-3 bg-zinc-900 text-zinc-100 text-xxs font-mono flex items-center justify-between rounded">
                <div className="space-y-0.5">
                  <span className="text-amber-400 block font-bold">💡 {t("SIMULATED CONFLICT WARNING", "💡 تنبيه تقاطع المسارات")}</span>
                  <span>
                    {collateralAsset !== 'none' && regulatoryPath === 'bypass'
                      ? t("High danger: Leasing un-audited state assets with unchecked powers risks predatory privatization.", "خطر داهم: رهن الأصول السيادية بموجب قرارات منفردة بلا تنظيم يعرضها للاستحواذ الخارجي الرخيص.")
                      : t("Optimal alignment: Build robust legal frameworks to safeguard national infrastructure equity.", "السيناريو الآمن: بناء الأطر المؤسساتية أولاً لحماية البنية التحتية والملكيات العامة.")
                    }
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT 3: DOSSIER OF RELATED INVESTIGATIONS */}
      {activeTab === 'dossiers' && (
        <div className="space-y-4">
          <div className="border-b border-zinc-200 pb-2">
            <h5 className="font-sans font-black text-sm uppercase text-zinc-950">
              {t("Lebanon Telecom & Financial Sector Dossier", "سجل تحقيقات شؤون الاتصالات والمالية اللبنانية")}
            </h5>
            <p className="text-xxs text-zinc-500">
              {t("Click on any investigation to pull up the complete document context within the central viewport.", "اضغط على أي ملف تحقيق لقراءة النص الكامل ومطالعة التفاصيل والوثائق في نافذة العرض المركزية.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relevantArticles.map((art) => {
              const isTelecom = art.categories?.includes('telecom-internet') || art.id.includes('telecom');
              return (
                <div 
                  key={art.id} 
                  className="border-2 border-black p-4 bg-zinc-50/50 hover:bg-zinc-50 flex flex-col justify-between space-y-4 group transition-all"
                >
                  <div className="space-y-2">
                    {/* Category Label and View Counter */}
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-sans font-black px-2 py-0.5 border border-black uppercase ${
                        isTelecom ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isTelecom ? t("Telecom / Infrastructure", "اتصالات وبنية تحتية") : t("Finance / Geo-Economy", "المالية والاقتصاد")}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 font-bold">
                        👁️ {art.views?.toLocaleString() || '1,450'} {t("views", "مشاهدة")}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h6 className="font-sans font-black text-sm text-zinc-950 group-hover:text-red-700 transition-colors leading-snug">
                      {isAr ? art.titleAr : art.titleEn}
                    </h6>

                    {/* Excerpt */}
                    <p className="text-[11px] text-zinc-600 leading-relaxed font-serif">
                      {isAr ? art.excerptAr : art.excerptEn}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 border-t border-dashed border-zinc-200 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-zinc-500">
                      📅 {art.date}
                    </span>
                    
                    <button
                      onClick={() => onSelectArticle?.(art)}
                      className="px-3 py-1 bg-black text-white hover:bg-zinc-800 font-sans font-black text-xxs uppercase tracking-tight flex items-center gap-1 cursor-pointer transition-all hover:translate-x-1"
                    >
                      <span>{t("Load Investigation →", "طالع التحقيق ←")}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Aesthetic terminal credit line (Anti-AI-Slop compliant: simple and humble) */}
      <div className="mt-5 pt-3 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-center gap-2 text-xxs font-mono text-zinc-400">
        <span>{t("CONFIDENTIAL INTELLIGENCE DOSSIER • INTERNAL DISTRIBUTION ONLY", "سجل تحليلي سري داخلي • تداول محدود ومصادق")}</span>
        <span>© 2026 Al-Warraq Network Bureau</span>
      </div>
    </div>
  );
};
