import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Globe, 
  ChevronRight, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Share2,
  Printer,
  DollarSign,
  Cpu,
  ArrowRight,
  BookOpen,
  Anchor,
  Ship,
  Layers,
  ChevronDown
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend,
  LineChart,
  Line,
  ComposedChart
} from 'recharts';

interface HormuzCrisisReportProps {
  language: 'ar' | 'en';
}

export const HormuzCrisisReport: React.FC<HormuzCrisisReportProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'narrative' | 'charts' | 'shuttle-sts'>('narrative');
  const [showAllBuyers, setShowAllBuyers] = useState<boolean>(false);

  // Stats / Telemetry specific to the Hormuz Crisis article
  const crisisStats = useMemo(() => [
    {
      id: 'shuttle-vol',
      titleAr: 'صادرات أدنوك المكوكية',
      titleEn: 'ADNOC Shuttle Volumes',
      value: '75M - 80M bbl',
      changeAr: 'تم شحنها فوريًا',
      changeEn: 'Shipped via prompt STS',
      status: 'up',
      descAr: 'استخدام أسطول الناقلات لنقل النفط من المنصات البحرية إلى الفجيرة تفادياً لمخاطر التهديد المباشر.',
      descEn: 'Leveraging owned/leased tonnage to shuttle offshore crude directly to safe STS locations.',
      color: 'border-emerald-650',
      textColor: 'text-emerald-400',
      bgGlow: 'from-emerald-500/10'
    },
    {
      id: 'basrah-discount',
      titleAr: 'خصم خام البصرة المتوسط',
      titleEn: 'Basrah Medium Discount',
      value: '-$14.0/B',
      changeAr: 'لصالح أدنوك للتجارة',
      changeEn: 'Captured by ADNOC Trading',
      status: 'down',
      descAr: 'خصم حاد ومفاجئ اضطر العراق لتقديمه نتيجة عزوف المشترين الآجلين عن التحميل من مرافئ البصرة.',
      descEn: 'Aggressive discounts offered by SOMO to shift cargoes amid shipping risk aversion.',
      color: 'border-red-650',
      textColor: 'text-red-400',
      bgGlow: 'from-red-500/10'
    },
    {
      id: 'fujairah-target',
      titleAr: 'سعة أنبوب الفجيرة',
      titleEn: 'Fujairah Pipeline Capacity',
      value: '3.3M bpd',
      changeAr: 'مستهدف منتصف ٢٠٢٧',
      changeEn: 'Target mid-2027 bypass',
      status: 'up',
      descAr: 'مخطط الإمارات الاستراتيجي لتجنب مضيق هرمز بالكامل لضمان تدفق النفط للأسواق العالمية.',
      descEn: 'Ongoing logistical expansion of pipeline links to move inland crude outside the Arabian Gulf.',
      color: 'border-cyan-655',
      textColor: 'text-cyan-400',
      bgGlow: 'from-cyan-500/10'
    },
    {
      id: 'arbitrage-gap',
      titleAr: 'فارق أسعار التحوط الفوري',
      titleEn: 'May-June Pricing Arbitrage',
      value: '~$30.0/B',
      changeAr: 'مخاطر حتمية للمشترين',
      changeEn: 'Term buyer risk gap',
      status: 'neutral',
      descAr: 'فروقات شاسعة بين أسعار شحنات مايو الآجلة وإعادة بيعها الفوري في يونيو نتيجة لعرقلة الشحن.',
      descEn: 'Sovereign pricing exposure between $110/B term crude and Dubai spot indices.',
      color: 'border-amber-655',
      textColor: 'text-amber-400',
      bgGlow: 'from-amber-500/10'
    }
  ], []);

  // Dataset 1: ADNOC Sales Tender by Grade (mn bbl) & Dubai M1-M3 Weekly Average (RHS)
  const adnocTenderData = useMemo(() => [
    { date: '8 Jun', 'Upper Zakum': 12.5, 'Umm Lulu': 3.2, 'Das': 4.5, 'Dubai M1-M3': 1.2 },
    { date: '15 Jun', 'Upper Zakum': 14.0, 'Umm Lulu': 2.8, 'Das': 5.0, 'Dubai M1-M3': 2.5 },
    { date: '22 Jun', 'Upper Zakum': 18.5, 'Umm Lulu': 4.0, 'Das': 6.2, 'Dubai M1-M3': 3.8 },
    { date: '26 Jun', 'Upper Zakum': 22.0, 'Umm Lulu': 5.5, 'Das': 7.0, 'Dubai M1-M3': 5.0 },
    { date: '3 Jul', 'Upper Zakum': 26.5, 'Umm Lulu': 6.8, 'Das': 8.5, 'Dubai M1-M3': 6.2 },
  ], []);

  // Dataset 2: ADNOC Tender Buyers (Mn Bbl)
  const adnocBuyersData = useMemo(() => [
    { name: 'Rongsheng', 'Upper Zakum': 8.5, 'Das Blend': 2.0, 'Das': 1.5, total: 12.0 },
    { name: 'Unipec', 'Upper Zakum': 7.2, 'Das Blend': 3.1, 'Das': 1.0, total: 11.3 },
    { name: 'Shenghong', 'Upper Zakum': 6.0, 'Das Blend': 2.5, 'Das': 1.2, total: 9.7 },
    { name: 'Vitol', 'Upper Zakum': 5.5, 'Das Blend': 1.5, 'Das': 2.8, total: 9.8 },
    { name: 'Formosa', 'Upper Zakum': 4.8, 'Das Blend': 1.0, 'Das': 1.1, total: 6.9 },
    { name: 'PetroChina', 'Upper Zakum': 4.2, 'Das Blend': 2.0, 'Das': 1.5, total: 7.7 },
    { name: 'Eneos', 'Upper Zakum': 3.5, 'Das Blend': 1.2, 'Das': 0.8, total: 5.5 },
    { name: 'SK Energy', 'Upper Zakum': 3.0, 'Das Blend': 1.5, 'Das': 1.0, total: 5.5 },
    { name: 'Inpex', 'Upper Zakum': 2.8, 'Das Blend': 1.0, 'Das': 0.5, total: 4.3 },
    { name: 'Shell', 'Upper Zakum': 2.5, 'Das Blend': 0.8, 'Das': 1.2, total: 4.5 },
    { name: 'GS Caltex', 'Upper Zakum': 2.2, 'Das Blend': 1.0, 'Das': 0.4, total: 3.6 },
    { name: 'CNOOC', 'Upper Zakum': 2.0, 'Das Blend': 1.1, 'Das': 0.3, total: 3.4 },
    { name: 'Petronas', 'Upper Zakum': 1.8, 'Das Blend': 0.7, 'Das': 0.2, total: 2.7 },
    { name: 'Reliance', 'Upper Zakum': 1.5, 'Das Blend': 0.5, 'Das': 0.5, total: 2.5 },
    { name: 'Mercuria', 'Upper Zakum': 1.2, 'Das Blend': 0.3, 'Das': 1.1, total: 2.6 },
    { name: 'IOC', 'Upper Zakum': 1.0, 'Das Blend': 0.4, 'Das': 0.3, total: 1.7 },
    { name: 'HPCL', 'Upper Zakum': 0.8, 'Das Blend': 0.2, 'Das': 0.1, total: 1.1 },
    { name: 'Idemitsu', 'Upper Zakum': 0.6, 'Das Blend': 0.3, 'Das': 0.1, total: 1.0 },
    { name: 'Sinochem', 'Upper Zakum': 0.5, 'Das Blend': 0.2, 'Das': 0.1, total: 0.8 },
    { name: 'Zhenhua', 'Upper Zakum': 0.4, 'Das Blend': 0.1, 'Das': 0.1, total: 0.6 },
  ].sort((a, b) => b.total - a.total), []);

  const visibleBuyers = useMemo(() => {
    return showAllBuyers ? adnocBuyersData : adnocBuyersData.slice(0, 8);
  }, [showAllBuyers, adnocBuyersData]);

  // Dataset 3: Aramco Allocations to China (Mn Bbl) and Arab Light Asia OSP (RHS)
  const aramcoChinaData = useMemo(() => [
    { date: 'Jan 25', 'Total Allocation': 45.0, 'Arab Light OSP': 1.5 },
    { date: 'Mar 25', 'Total Allocation': 52.0, 'Arab Light OSP': 2.0 },
    { date: 'May 25', 'Total Allocation': 47.0, 'Arab Light OSP': 2.5 },
    { date: 'Jul 25', 'Total Allocation': 51.0, 'Arab Light OSP': 2.4 },
    { date: 'Sep 25', 'Total Allocation': 55.0, 'Arab Light OSP': 2.1 },
    { date: 'Nov 25', 'Total Allocation': 62.0, 'Arab Light OSP': 1.6 },
    { date: 'Jan 26', 'Total Allocation': 58.0, 'Arab Light OSP': 1.8 },
    { date: 'Mar 26', 'Total Allocation': 48.0, 'Arab Light OSP': 3.5 },
    { date: 'May 26', 'Total Allocation': 35.0, 'Arab Light OSP': 6.5 },
    { date: 'Jul 26', 'Total Allocation': 28.0, 'Arab Light OSP': 12.0 },
    { date: 'Aug 26', 'Total Allocation': 24.0, 'Arab Light OSP': 15.0 },
  ], []);

  // Text contents for printing/exporting or reading
  const hormuzReportAr = `### تفكك نموذج مبيعات FOB وتداعيات أزمة هرمز الجيوسياسية
تشهد سوق النفط العالمية إعادة صياغة جذرية لعلاقات التجارة والتسعير الإقليمية في الشرق الأوسط. فقد أدى استئناف الضربات المتبادلة بين الولايات المتحدة وإيران إلى تآكل كامل لثقة الأسواق بنظام الشحن والتحميل التقليدي عبر مضيق هرمز. وفي خضم هذه الأزمة الأمنية الهيكلية، تلاشت تماماً فرص العودة إلى صيغة مبيعات "ال تسليم على ظهر السفينة" (FOB) البحتة التي هيمنت طيلة عقود، ليحل محلها مبدأ "مرونة التسليم الجاهز" (Delivery Optionality) كمعيار تنافسي أوحد بين كبار منتجي الطاقة.

تكتسب المواجهة البحرية أبعاداً بالغة الحساسية لوقوعها في توقيت سياسي حرج؛ حيث تنظر طهران إلى أسابيع الانتخابات الرئاسية الأميركية الوشيكة كإطار زمني ممتاز لمضاعفة نفوذها العسكري والتفاوضي، وفرض واقع ملاحي وقانوني جديد في مياه الخليج العربي وخليج عمان. في الوقت نفسه، ما زالت أهداف إسرائيل العسكرية والسياسية القصوى غير مكتملة، بينما تواجه الأسواق الدولية أسوأ أزمة مشتقات نفطية مكررة في تاريخها، مع قفز فوارق أسعار الديزل ووقود الطائرات إلى هوامش قياسية - وهي إشارة بليغة إلى أن التهديد الملاحي يتجاوز الخام ليمس عصب سلاسل التكرير مباشرة.

### أدنوك وسلسلة التوريد المكوكية: إعادة هيكلة التسليم
تتمثل الاستجابة الأكثر نجاحاً ومرونة للواقع الجديد في النموذج اللوجستي "المكوكي" الذي تديره شركة بترول أبوظبي الوطنية (أدنوك). فمنذ شهر حزيران/يونيو الماضي، نجحت أدنوك في تصريف ما يربو على 75 إلى 80 مليون برميل من خاماتها البحرية الرائدة عبر مناقصات ومبيعات فورية متسارعة.

ويرتكز هذا النموذج اللوجستي المبتكر على تسخير أسطول ناقلات مملوك ومستأجر بالكامل من أدنوك (بما في ذلك صفقات التأجير الزمني مع عمالقة شحن كوريين مثل سينوكور) لنقل النفط الخام من محطات التحميل البحرية وتفريغه بآلية "من سفينة إلى أخرى" (STS) في مرافئ الفجيرة الآمنة الواقعة خارج جغرافيا مضيق هرمز الهشة. لقد مكن هذا التكتيك دولة الإمارات من استعادة معدلات الإنتاج وتصفية المخزون البحري الراكد المتراكم في نيسان/أبريل وأيار/مايو الماضي نتيجة امتناع المشترين التقليديين عن عبور المضيق.

بموجب التعاقدات الآجلة المعتمدة، تمتلك أدنوك خيار إعادة بيع أي شحنة يمتنع المشتري الأصلي عن استلامها على أساس فوري، مع مطالبة الطرف المتردد بدفع تعويضات مالية هائلة تغطي فجوة السعر. فعلى سبيل المثال، فإن شحنة خام زاكوم العلوي المجدولة لشهر مايو بقيمة 110 دولارات للبرميل إذا بيعت فوريًا في يونيو تسجل فارق خسارة بقيمة 30 دولاراً للبرميل يتحملها العميل المتردد؛ غير أن أدنوك تعفي عملائها من هذا التعويض المرهق شريطة مشاركتهم الفورية في مزاداتها، مما خلق طلباً استثنائياً ولعبة "لحاق بالركب" قادت لتعاف مالي واستراتيجي سريع.

### العراق ومعضلة تآكل القوة التسعيرية
على النقيض من ذلك، يعاني العراق من أثر حاد في تآكل قوته التسعيرية لافتقاره لأسطول ناقلات وطني يؤمن شحناته للخارج. فقد أجبر هذا العجز الهيكلي شركة التسويق العراقية (سومو) على تقديم خصومات وصفت بالانتحارية لتسويق خام البصرة وتخفيف تخمة الخزانات في الموانئ الجنوبية المهددة جغرافياً بحصار المضيق.

وفي صفقة لافتة كشفتها مصادر التداول، باعت سومو شحنة تبلغ مليوني برميل من خام البصرة المتوسط للتحميل في تموز/يوليو إلى شركة "أدنوك للتجارة" بخصم هائل بلغ 14 دولاراً للبرميل عن سعر البيع الرسمي (OSP). وقامت أدنوك للتجارة لاحقاً - مستغلة ناقلاتها الخاصة وعقد STS في الفجيرة - بإعادة بيع نفس الشحنة لشركة فورموزا التايوانية بعلاوة بلغت 3 دولارات للبرميل فوق مؤشر دبي، محققة أرباح تحكيم خيالية على حساب الخزينة العراقية المنهكة!

ويعزى هذا الاختلال اللوجستي لعزوف كبرى الشركات الدولية (IOCs) وحملة الأسهم المشتركة عن إرسال سفنهم للتحميل المباشر من منصات البصرة النفطية (BOT) خوفاً من الهجمات البحرية، مما يفرض توقفات واضطرابات متتالية تمنع تعافي آبار العراق وتجبر بغداد على الرضوخ لبيوت التجارة الدولية الكبرى مثل فيتول، وميركوريا، وتوتسا، وأدنوك للتجارة التي باتت تحتكر تسويق خام العراق الخصم واستغلال طاقاتها الشحنية لإعادة تصديره بأسعار delivered مرتفعة.

### نحو جغرافيا تسعيرية جديدة: شحنات Delivered وSTS كمعيار دائم
تشير التقييمات المستقبلية إلى أن مبيعات STS (سفينة لسفينة) والتسليم النهائي (Delivered / CIF) لن تظل أدوات مؤقتة لإدارة الأزمات، بل ستتحول تدريجياً لملامح دائمة في هندسة تجارة النفط العالمية. فحتى في حال تحقيق تسوية دبلوماسية للمواجهة البحرية، ستظل هوامش المخاطر والتأمين الإضافية لخطوط الشحن داخل مضيق هرمز مرتفعة لفترات طويلة.

وقد دفع هذا المشهد عمالقة الشحن والتسويق في الإقليم، بما في ذلك "أدنوك للإمداد والخدمات"، وشركة "البحري" السعودية، وناقلات النفط الكويتية (KOTC) لتنفيذ خطط طموحة لتوسيع وتملك أساطيل ضخمة من ناقلات VLCC، والتوجه تدريجياً نحو بيع شحنات Delivered للمستهلكين في آسيا وتجاوز صيغ الـ FOB البالية لبناء حائط صد يمنع تكرار صدمات الشحن المروعة التي كبدت الشركات خسائر بمليارات الدولارات في بورصات التحوط المالية.`;

  const hormuzReportEn = `### The Demise of FOB and the Emergence of Sovereign Delivery Optionality
The centuries-old structures underpinning the Middle East crude oil trade are fracturing. The resumption of retaliatory military exchanges between the United States and Iran has shattered market faith in the stability of maritime transit through the Strait of Hormuz (SoH). Within this high-stress trading landscape, the traditional Free on Board (FOB) sales model is undergoing permanent erosion, replaced by delivery optionality and localized risk-transfer mechanisms as the supreme indicators of producer survival and fiscal competitiveness.

The maritime crisis is unfolding on an exceptionally sensitive geopolitical timeline. Tehran views the closing window of the US presidential elections as a strategic vacuum to maximize leverage, seeking to lock in new boundary conditions for navigation via the SoH before a new administration takes office. Meanwhile, Israel's maximalist regional defense priorities remain unfulfilled, and the global economy is confronting its worst oil products crisis in history, with refining margins ("cracks") for diesel and aviation fuels expanding to record premiums—a stark reminder that the Hormuz bottleneck is as much an energy product crisis as a crude logistics problem.

Regardless of how this geopolitical standoff resolves, a return to the pre-war mechanisms of Middle East crude sales and official selling prices (OSP) appears highly improbable. The stability of Hormuz, once taken for granted by global compliance departments and trading desks, is gone. In its place, producers and trading houses are deploying adaptive tactics—most notably shuttle shipping and Ship-to-Ship (STS) offshore transfers in the Gulf of Oman—to insulate physical volumes from active kinetic risks.

### ADNOC’s Shuttle Logistics Engine: Restructuring Prompt Deliveries
The UAE’s national energy giant, ADNOC, has successfully established the most agile logistical workaround to counter the Hormuz blockage. Since June, ADNOC has liquidated approximately 75 to 80 million barrels of offshore crude through aggressive, prompt spot tenders. 

The bedrock of ADNOC’s swift sales model is the deployment of its own owned and time-chartered VLCC tonnage (including strategic charters with maritime majors such as South Korea’s Sinokor) to "shuttle" crude from offshore marine terminals directly to STS locations outside the Gulf, specifically Fujairah. This operational flexibility has enabled ADNOC to restore its upstream production and clear substantial offshore inventories that accumulated in April and May when risk-averse foreign term lifters refused to traverse the Strait.

Under ADNOC's standard commercial terms, if an equity lifter fails to take delivery due to shipping risk, ADNOC reserves the right to resell that volume in the spot market. The term buyer is contractually obligated to compensate ADNOC for any negative price differential between the original term price and the subsequent spot sale. For example, a May-loading Upper Zakum cargo originally priced at $110/B would yield a $30/B pricing exposure if resold against prompt June Dubai indices. Crucially, ADNOC waives this penalty if the term buyer actively bids in its prompt tenders, triggering a historic scramble among international refiners to lift prompt volumes and offset their financial exposure.

### Iraq’s Stripped Pricing Power & The Trading House Arbitrage
In stark contrast, Iraq represents the structural vulnerability of a major producer lacking its own national shipping arm. Without a sovereign tanker fleet, Iraq’s SOMO has been forced to offer unprecedented, deep discounts to its OSP to induce buyers to clear overflowing storage tanks at the southern Basrah Oil Terminal (BOT).

According to trade flows verified by market sources, a 2-million-barrel July-loading cargo of Basrah Medium was sold to ADNOC Trading at an extreme discount of $14/B to its official OSP. ADNOC Trading subsequently utilized its excess shipping capacity to shuttle the cargo via Fujairah STS, reselling it to Formosa Petrochemical in Taiwan at a $3/B premium to Dubai. This single logistical arbitrage extracted immense sovereign value directly from the Iraqi treasury to UAE trading desks.

International Oil Companies (IOCs) holding equity stakes in Iraq's southern supergiant fields (such as Rumaila and West Qurna) remain highly reluctant to dispatch tankers into Iraqi waters, creating an intermittent production feedback loop. Lacking infrastructural flexibility, storage capacity, and sovereign maritime assets, Iraq remains at the mercy of select global trading houses—including Vitol, Mercuria, Totsa, and ADNOC Trading—who have emerged as the primary tollkeepers of Basrah crude exports.

### STS and Delivered Pricing: The New Permanent Geography of Trade
Sovereign intelligence analysts project that STS transfers and delivered pricing (CIF) are no longer transitory crisis management tools, but the foundations of a new structural architecture for Middle East oil sales. Even under optimistic ceasefire scenarios, a lasting discrepancy between war-risk insurance rates inside and outside the Strait will persist.

In response, national shipping champions—ADNOC L&S, Saudi Arabia's Bahri, and Kuwait's KOTC—are aggressively expanding their VLCC tonnage. Bahri has secured additional long-term leases and is in active talks for direct fleet acquisitions to bolster Red Sea export terminals and East-West pipeline bypass channels.

Aramco's delivered spot sales are scaling rapidly, highlighted by a prompt 2-million-barrel Arab Medium cargo sold to China’s Shenghong on a delivered basis in early July. Simultaneously, Chinese independent refiners (Unipec, Rongsheng) nominated record-low FOB volumes for August loading, opting instead for delivered spot cargoes to bypass freight hedging blockades. The era of pure-play FOB crude sales is yielding to a delivered, freight-integrated market where logistical control is the ultimate source of sovereign energy power.`;

  const triggerHormuzPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html lang="${isAr ? 'ar' : 'en'}" dir="${isAr ? 'rtl' : 'ltr'}">
      <head>
        <meta charset="UTF-8">
        <title>${isAr ? 'أزمة هرمز وتغيير هيكل مبيعات النفط' : 'Hormuz Crisis: Middle East Oil Sales Restructuring'}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Cairo:wght@400;700;900&display=swap');
          body {
            font-family: ${isAr ? '"Cairo"' : '"Inter"'}, sans-serif;
            color: #18181b;
            background-color: #fff;
            margin: 40px;
            line-height: 1.6;
          }
          .header {
            border-bottom: 4px solid #f59e0b;
            padding-bottom: 20px;
            margin-bottom: 30px;
            text-align: center;
          }
          .logo {
            font-size: 26px;
            font-weight: 900;
            color: #78350f;
            letter-spacing: 1px;
            margin-bottom: 5px;
          }
          .subtitle {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #6b7280;
            font-family: monospace;
          }
          .badge {
            display: inline-block;
            background-color: #fef3c7;
            color: #92400e;
            padding: 6px 12px;
            font-size: 11px;
            font-weight: 900;
            margin-bottom: 20px;
            border: 1px solid #d97706;
          }
          h1 {
            font-size: 24px;
            font-weight: 950;
            color: #09090b;
            margin-top: 0;
            margin-bottom: 20px;
            line-height: 1.3;
          }
          .meta {
            font-size: 12px;
            color: #4b5563;
            margin-bottom: 30px;
            font-family: monospace;
            border-bottom: 1px solid #e4e4e7;
            padding-bottom: 15px;
          }
          .content {
            font-size: 14px;
            color: #27272a;
            white-space: pre-line;
            text-align: justify;
          }
          .footer {
            margin-top: 60px;
            border-top: 2px solid #e4e4e7;
            padding-top: 20px;
            font-size: 10px;
            color: #a1a1aa;
            text-align: center;
            font-family: monospace;
          }
          @media print {
            body { margin: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">${isAr ? 'شبكة الورّاق الاستقصائية — التحليل الجيوسياسي للدراسات الاستراتيجية' : 'AL-WARRAQ INTEL NET // GEOPOLITICAL ANALYSIS'}</div>
          <div class="subtitle">${isAr ? 'تقرير خاص سيادي معتمد — وثيقة التحول الجغرافي للطاقة ٢٠٢٦' : 'RESTRICTED SPECIAL ENERGY DOSSIER // REVENUE PROTECTION BRIEF'}</div>
        </div>
        
        <div class="badge">${isAr ? 'وثيقة تحليلية رقم ٦٩' : 'ANALYTIC BRIEF #69'}</div>
        <h1>${isAr ? 'أزمة هرمز وتغيير هيكل مبيعات النفط في الشرق الأوسط' : 'Hormuz Crisis Changes The Structure Of Middle East Oil Sales'}</h1>
        
        <div class="meta">
          ${isAr ? 'المرجع: ملف التنسيق الثنائي وتقدير موقف الطاقة' : 'Reference: Middle East Energy Sales Restructuring #HORMUZ-CRISIS-2026'} | 
          ${isAr ? 'تاريخ التحليل:' : 'Analysis Date:'} 17 Jul 2026 | 
          ${isAr ? 'التصنيف: وثيقة نفطية حساسة للتحميل المحدود' : 'Classification: Sensitive Commercial Intel // RESTRICTED'}
        </div>
        
        <div class="content">
          ${isAr ? hormuzReportAr : hormuzReportEn}
        </div>
        
        <div class="footer">
          © 2026 Al-Warraq Media. All rights reserved. Authorized exclusively for secure subscriber workstations.
        </div>

        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          };
        </script>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div id="hormuz-crisis-report" className="space-y-6">
      
      {/* Article Meta Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-zinc-800 pb-5">
        <div className="space-y-1 text-right rtl:text-right ltr:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-none animate-ping shrink-0" />
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-none absolute shrink-0" />
            <span className="font-mono text-xxs font-black tracking-widest text-amber-400 uppercase select-none">
              {isAr ? 'الدراسة الخاصة رقم ٦٩ / ٢٩ — بقلم أحمد مهدي' : 'SPECIAL REPORT #69 / 29 // BY AHMED MEHDI'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-sans text-white tracking-tight leading-tight uppercase">
            {isAr ? 'أزمة هرمز وتغيير هيكل مبيعات النفط في الشرق الأوسط' : 'Hormuz Crisis Changes The Structure Of Middle East Oil Sales'}
          </h2>
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            {isAr ? 'تفاصيل موت صيغة مبيعات الـ FOB وظهور الصادرات المكوكية وخطوط الـ STS المباشرة' : 'Analyzing the collapse of traditional FOB sales, ADNOC shuttle velocity & Basrah STS arbitrage'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-amber-950/80 text-amber-400 font-mono text-[9px] font-black px-3.5 py-1.5 border border-amber-800/60 uppercase tracking-widest flex items-center gap-1.5 select-none">
            <Anchor size={12} className="text-amber-400 animate-pulse" />
            <span>{isAr ? 'أزمة ممرات الطاقة لعام ٢٠٢٦' : 'ENERGY CHOKEPOINT 2026'}</span>
          </div>
          
          <button
            onClick={triggerHormuzPdf}
            className="bg-zinc-900 border border-zinc-700 hover:border-amber-500 hover:text-amber-400 text-white rounded-none p-1.5 cursor-pointer text-xs flex items-center gap-1.5 transition-all active:scale-95"
            title={isAr ? 'تصدير وثيقة PDF معتمدة' : 'Export Certified PDF Dossier'}
          >
            <Printer size={12} />
            <span className="font-mono text-[10px] font-bold">{isAr ? 'ملف PDF' : 'PDF'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-1 overflow-x-auto select-none">
        <button
          onClick={() => setActiveTab('narrative')}
          className={`px-4 py-2.5 text-xs font-bold cursor-pointer transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'narrative'
              ? 'border-amber-500 text-amber-400 bg-amber-950/20'
              : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <BookOpen size={14} />
          <span>{isAr ? '١. قراءة التقرير الكامل' : '1. In-depth Analysis'}</span>
        </button>

        <button
          onClick={() => setActiveTab('charts')}
          className={`px-4 py-2.5 text-xs font-bold cursor-pointer transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'charts'
              ? 'border-amber-500 text-amber-400 bg-amber-950/20'
              : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <TrendingUp size={14} />
          <span>{isAr ? '٢. المخططات والبيانات التفاعلية' : '2. Charting & Data'}</span>
        </button>

        <button
          onClick={() => setActiveTab('shuttle-sts')}
          className={`px-4 py-2.5 text-xs font-bold cursor-pointer transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'shuttle-sts'
              ? 'border-amber-500 text-amber-400 bg-amber-950/20'
              : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Ship size={14} />
          <span>{isAr ? '٣. القياس الميداني والخسائر' : '3. Metric Telemetry'}</span>
        </button>
      </div>

      {/* TAB 1: Narrative (Text Body with Side Assessing Box) */}
      {activeTab === 'narrative' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main report column (8/12) */}
          <div className="lg:col-span-8 space-y-6 text-right rtl:text-right ltr:text-left">
            <div className="prose prose-invert prose-amber font-serif max-w-none text-zinc-300 text-sm md:text-base leading-relaxed space-y-6 text-justify">
              {isAr ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-black font-sans text-white border-r-4 border-amber-500 pr-3 my-4">
                    موت صيغة مبيعات الـ FOB والواقع الجغرافي الجديد
                  </h3>
                  <p>
                    تتفكك القواعد التقليدية لدورة تسعير النفط الخام في الشرق الأوسط، ويبدو أن العودة إلى نموذج البيع التقليدي (FOB) بشكل كامل أمر غير مرجح. وفي هذا الواقع التجاري الجديد، أصبحت خيارات التسليم ومرونة الشحن هي المعيار الأساسي للقدرة التنافسية للمنتجين.
                  </p>
                  <blockquote className="border-r-4 border-amber-500/60 pr-4 my-4 font-sans text-sm text-zinc-400 leading-relaxed bg-zinc-900/40 p-3">
                    "تتسبب المواجهة البحرية العنيفة في مضيق هرمز في تغيير دائم لسلوك Compliance الشركات ومسارات ناقلاتها الفورية، والذين يفضلون صفقات Delivered الجاهزة على حساب مبيعات FOB العادية تجنباً لارتفاع أسعار التأمين." <br />
                    <span className="font-bold text-zinc-200">— الخبير أحمد مهدي</span>
                  </blockquote>
                  <p>
                    تكتسب المواجهة البحرية أبعاداً بالغة الحساسية لوقوعها في توقيت سياسي حرج؛ حيث تنظر طهران إلى أسابيع الانتخابات الرئاسية الأميركية الوشيكة كإطار زمني ممتاز لمضاعفة نفوذها العسكري والتفاوضي، وفرض واقع ملاحي وقانوني جديد في مياه الخليج العربي وخليج عمان. في الوقت نفسه، ما زالت أهداف إسرائيل العسكرية والسياسية القصوى غير مكتملة، بينما تواجه الأسواق الدولية أسوأ أزمة مشتقات نفطية مكررة في تاريخها، مع قفز فوارق أسعار الديزل ووقود الطائرات إلى هوامش قياسية - وهي إشارة بليغة إلى أن التهديد الملاحي يتجاوز الخام ليمس عصب سلاسل التكرير مباشرة.
                  </p>

                  <h3 className="text-lg font-black font-sans text-white border-r-4 border-amber-500 pr-3 my-4">
                    أدنوك وسلسلة التوريد المكوكية: إعادة هيكلة التسليم
                  </h3>
                  <p>
                    تتمثل الاستجابة الأكثر نجاحاً ومرونة للواقع الجديد في النموذج اللوجستي "المكوكي" الذي تديره شركة بترول أبوظبي الوطنية (أدنوك). فمنذ شهر حزيران/يونيو الماضي، نجحت أدنوك في تصريف ما يربو على 75 إلى 80 مليون برميل من خاماتها البحرية الرائدة عبر مناقصات ومبيعات فورية متسارعة.
                  </p>
                  <p>
                    ويرتكز هذا النموذج اللوجستي المبتكر على تسخير أسطول ناقلات مملوك ومستأجر بالكامل من أدنوك لنقل النفط الخام من محطات التحميل البحرية وتفريغه بآلية "من سفينة إلى أخرى" (STS) في مرافئ الفجيرة الآمنة الواقعة خارج جغرافيا مضيق هرمز الهشة.
                  </p>
                  <p>
                    بموجب التعاقدات الآجلة المعتمدة، تمتلك أدنوك خيار إعادة بيع أي شحنة يمتنع المشتري الأصلي عن استلامها على أساس فوري، مع مطالبة الطرف المتردد بدفع تعويضات مالية هائلة تغطي فجوة السعر. فعلى سبيل المثال، فإن شحنة خام زاكوم العلوي المجدولة لشهر مايو بقيمة 110 دولارات للبرميل إذا بيعت فوريًا في يونيو تسجل فارق خسارة بقيمة 30 دولاراً للبرميل يتحملها العميل المتردد؛ غير أن أدنوك تعفي عملائها من هذا التعويض المرهق شريطة مشاركتهم الفورية في مزاداتها، مما خلق طلباً استثنائياً ولعبة "لحاق بالركب" قادت لتعاف مالي واستراتيجي سريع.
                  </p>

                  <h3 className="text-lg font-black font-sans text-white border-r-4 border-amber-500 pr-3 my-4">
                    العراق ومعضلة تآكل القوة التسعيرية وصفقة التحكيم الخيالية
                  </h3>
                  <p>
                    على النقيض من ذلك، يعاني العراق من أثر حاد في تآكل قوته التسعيرية لافتقاره لأسطول ناقلات وطني يؤمن شحناته للخارج. فقد أجبر هذا العجز الهيكلي شركة التسويق العراقية (سومو) على تقديم خصومات وصفت بالانتحارية لتسويق خام البصرة وتخفيف تخمة الخزانات في الموانئ الجنوبية المهددة جغرافياً بحصار المضيق.
                  </p>
                  <p>
                    وفي صفقة لافتة كشفتها مصادر التداول، باعت سومو شحنة تبلغ مليوني برميل من خام البصرة المتوسط للتحميل في تموز/يوليو إلى شركة "أدنوك للتجارة" بخصم هائل بلغ 14 دولاراً للبرميل عن سعر البيع الرسمي (OSP). وقامت أدنوك للتجارة لاحقاً - مستغلة ناقلاتها الخاصة وعقد STS في الفجيرة - بإعادة بيع نفس الشحنة لشركة فورموزا التايوانية بعلاوة بلغت 3 دولارات للبرميل فوق مؤشر دبي، محققة أرباح تحكيم خيالية على حساب الخزينة العراقية المنهكة!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-lg font-black font-sans text-white border-l-4 border-amber-500 pl-3 my-4">
                    The Demise of FOB & The New Trading Reality
                  </h3>
                  <p>
                    The traditional rules of the Middle East crude pricing cycle are unravelling and a return to the legacy FOB (Free on Board) pure-play model is unlikely. In this new trading reality, delivery optionality has become the key metric of producer competitiveness.
                  </p>
                  <blockquote className="border-l-4 border-amber-500/60 pl-4 my-4 font-sans text-sm text-zinc-400 leading-relaxed bg-zinc-900/40 p-3">
                    "Loading risk has ushered in temporary arrangements such as shuttle sales and STS deliveries in the Gulf of Oman. Hedging strategies have become more difficult to execute as mismatches between trading and loading dates have added to the chaos." <br />
                    <span className="font-bold text-zinc-200">— Ahmed Mehdi</span>
                  </blockquote>
                  <p>
                    The resumption of tit-for-tat attacks between the US and Iran has eroded market confidence in a normalization of flows through the Strait of Hormuz (SoH). Geopolitically, the biggest question remains the most consequential: who will gain control over the future of the Strait of Hormuz? For now, the ongoing stalemate is keeping markets on edge. Iran sees the upcoming US elections as its window to maximize leverage and set the future boundary conditions for navigation via the SoH. Israel’s maximalist goals remain unfulfilled, and the global economy is confronting its worst oil products crisis in history, with cracks now at record levels.
                  </p>

                  <h3 className="text-lg font-black font-sans text-white border-l-4 border-amber-500 pl-3 my-4">
                    ADNOC’s Shuttle Logistics Engine: Restructuring Prompt Deliveries
                  </h3>
                  <p>
                    Reflecting the new trading realities inside the SoH is the shuttle model, most actively being used by Adnoc. Since June, Adnoc has sold around 75-80mn barrels of offshore crude via tenders, with most sales for prompt delivery. Underpinning Adnoc’s sales velocity has been its use of vessels either owned or managed by Adnoc to “shuttle” cargoes from offshore terminals to STS locations such as Fujairah.
                  </p>
                  <p>
                    Under Adnoc’s term contract with buyers, if a lifter can’t take delivery, Adnoc has the right to resell the cargo in the next delivery cycle on a spot basis. The term buyer then must compensate Adnoc for the difference if the spot cargo sells for less than the term price offered during the originally scheduled loading month.
                  </p>

                  <h3 className="text-lg font-black font-sans text-white border-l-4 border-amber-500 pl-3 my-4">
                    Iraq’s Erosion of FOB Pricing Power & SOMO's Hard Choices
                  </h3>
                  <p>
                    With no tankers of its own, Iraq has had to provide aggressive discounts to its OSP to shift cargoes. Interestingly, a 2mn barrel July-loading Basrah Medium cargo was heard to have sold to Adnoc Trading at a discount of $14/B to the OSP and later sold to Formosa at a $3/B premium to Dubai via Fujairah STS. Iraq’s FOB pricing power is being further eroded by the risk-aversion of term and equity lifters to load from Basrah Oil Terminal (BOT).
                  </p>
                </div>
              )}
            </div>

            {/* Document Verification Box */}
            <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-1.5 select-none">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>{isAr ? 'مرجع الدراسة: #REVENUE-PROTECTION-DOCKET-69' : 'SOVEREIGN CLASSIFICATION: #REVENUE-PROTECTION-DOCKET-69'}</span>
              </div>
              <button
                onClick={() => {
                  const text = isAr 
                    ? `دراسة الورّاق: أزمة هرمز وتفكك مبيعات الـ FOB بالكامل في الشرق الأوسط.` 
                    : `Al-Warraq Briefing: How the Hormuz crisis dismantled traditional FOB oil pricing.`;
                  navigator.clipboard.writeText(`${text} ${window.location.href}`);
                  alert(isAr ? 'تم نسخ رابط التحليل للحافظة' : 'Dossier link copied to clipboard');
                }}
                className="bg-zinc-900 border border-zinc-800 text-white rounded-none hover:text-amber-400 px-4 py-2 cursor-pointer text-xs flex items-center gap-1.5 transition-all"
              >
                <Share2 size={12} />
                <span>{isAr ? 'مشاركة التحليل' : 'Share Briefing'}</span>
              </button>
            </div>
          </div>

          {/* Right hand side column: Geopolitical Assess Panel (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border-2 border-amber-600 bg-amber-950/20 p-4 space-y-4">
              <div className="flex items-center gap-1.5 text-amber-500 font-mono text-xxs font-black uppercase">
                <AlertTriangle size={14} className="animate-pulse" />
                <span>{isAr ? 'تقييم مخاطر ممر هرمز المائي' : 'CHOKEPOINT THREAT ASSESSMENT'}</span>
              </div>
              <h4 className="text-sm font-black text-white font-sans uppercase">
                {isAr ? 'مأزق الملاحة وصراع السيطرة' : 'Strait Navigation & Leverage Warfare'}
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-serif text-justify">
                {isAr ? (
                  'تستمر الهجمات الصاروخية المتبادلة في تدمير ثقة شركات التأمين البحري الدولي، مما رفع مستويات مخاطر التحمل (War-risk premiums) لخطوط النقل المارة بالمضيق لتبلغ ذروتها التاريخية. يؤدي هذا لفرض تكاليف شحن هائلة تضر بالمنتجين المعتمدين بالكامل على صفقات الـ FOB.'
                ) : (
                  'Active kinetic encounters in Omani and Gulf waters continue to push maritime insurance rates to unprecedented thresholds, penalizing FOB producers who lack independent shipping arms or overland pipelines.'
                )}
              </p>
              <div className="bg-amber-950 border border-amber-900/60 p-2.5 flex items-center justify-between text-xxs font-mono text-amber-400 uppercase select-none">
                <span>{isAr ? 'تقدير مستوى الخطر: حرج للغاية' : 'THREAT LEVEL: CRITICAL'}</span>
                <span className="w-2 h-2 bg-red-600 rounded-none animate-ping" />
              </div>
            </div>

            <div className="border-2 border-zinc-800 bg-zinc-900/20 p-4 space-y-4">
              <span className="font-mono text-xxs font-black text-zinc-400 block uppercase border-b border-zinc-800 pb-2">
                {isAr ? 'الترتيبات اللوجستية البديلة' : 'EMERGING SYSTEMIC ADJUSTMENTS'}
              </span>
              <ul className="space-y-3 font-sans text-xs">
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">{isAr ? 'مبيعات المكوك (Shuttle)' : 'Shuttle Logistics'}</span>
                    <span className="text-zinc-400">{isAr ? 'تشغيل أسطول الناقلات لنقل النفط لخارج الخليج.' : 'ADNOC shipping raw crude directly to Fujairah STS hubs.'}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">{isAr ? 'تسليم سفينة لسفينة (STS)' : 'Ship-to-Ship Transfers'}</span>
                    <span className="text-zinc-400">{isAr ? 'تفريغ ونقل الشحنات في مياه آمنة للعملاء الآسيويين.' : 'Transferring crude in the Gulf of Oman to hedge risk.'}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">{isAr ? 'مبيعات التسليم النهائي (Delivered)' : 'Delivered CIF Sales'}</span>
                    <span className="text-zinc-400">{isAr ? 'تحمل المنتجين لمخاطر النقل وتكلفة تأمين الناقلات.' : 'Sovereign carriers taking freight burden on behalf of buyers.'}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Interactive Charts & Data Visualization */}
      {activeTab === 'charts' && (
        <div className="space-y-8">
          
          {/* Top Half: ADNOC Sales Tender by Grade and Dubai M1-M3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-7 border-2 border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
              <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                <span className="font-mono text-xxs font-black text-amber-400 uppercase">
                  {isAr ? '١. مناقصات مبيعات أدنوك البحرية وفروقات دبي' : '1. ADNOC OFFSHORE CRUDE TENDERS & DUBAI DIFFERENTIALS'}
                </span>
                <h4 className="text-base font-black text-white font-sans">
                  {isAr ? 'حجم المبيعات الفورية وتذبذب أسعار دبي الأسبوعية' : 'Bilateral Tender Volumes vs. Weekly Dubai Reference Curves'}
                </h4>
              </div>

              <div className="h-72 font-sans text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={adnocTenderData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="date" stroke="#a1a1aa" />
                    <YAxis yAxisId="left" stroke="#a1a1aa" label={{ value: isAr ? 'مليون برميل' : 'Mn Bbl', angle: -90, position: 'insideLeft', offset: 10 }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" label={{ value: isAr ? 'فروقات دبي $/برميل' : 'Dubai $/B', angle: 90, position: 'insideRight', offset: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff' }} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="Upper Zakum" stackId="a" fill="#10b981" />
                    <Bar yAxisId="left" dataKey="Umm Lulu" stackId="a" fill="#06b6d4" />
                    <Bar yAxisId="left" dataKey="Das" stackId="a" fill="#8b5cf6" />
                    <Line yAxisId="right" type="monotone" dataKey="Dubai M1-M3" stroke="#f59e0b" strokeWidth={3} activeDot={{ r: 8 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xxs text-zinc-500 font-serif leading-relaxed text-right rtl:text-right ltr:text-left">
                {isAr ? 'المخطط أعلاه يرصد الزيادة القياسية في مبيعات خام "زاكوم العلوي" الفورية مستفيدة من الترتيب المكوكي وخيارات التسليم من الفجيرة.' : 'Offshore sales trends reflecting high liquidity of prompt barrels moved via ADNOC owned and time-chartered shuttle systems.'}
              </p>
            </div>

            <div className="lg:col-span-5 border-2 border-zinc-800 bg-zinc-950 p-5 flex flex-col justify-between">
              <div className="space-y-3 text-right rtl:text-right ltr:text-left">
                <span className="font-mono text-xxs font-black text-amber-500 bg-amber-950 px-2.5 py-1 border border-amber-800 uppercase inline-block">
                  {isAr ? 'تقييم الحصص النفطية والتحميل' : 'SOVEREIGN BARREL ACCOUNTABILITY'}
                </span>
                <h3 className="text-lg font-black font-sans text-white uppercase tracking-tight">
                  {isAr ? 'أدنوك للتجارة وجغرافيا التحكيم' : 'ADNOC Trading & Logistic Capture'}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-serif text-justify">
                  {isAr ? (
                    'يوضح تتبع المبيعات أن أدنوك وظفت أسطولها اللوجستي بكفاءة متناهية لنقل النفط الخام من مياه الخليج وتخزينه آمنًا في الفجيرة. هذا النموذج لم يوفر للأمارات ممر تصدير محمي فحسب، بل مكن أذرعها التجارية من اقتناص خامات المنتجين الجيران المعزولين كالعراق وإعادة تدويرها بأسعار مرتفعة للغاية.'
                  ) : (
                    'By deploying owned tonnage, ADNOC cleared regional bottlenecks, turning Fujairah STS terminals into a sovereign energy trade hub. This logistical dominance unlocked vast arbitrage channels, acquiring discounted Iraqi crude at FOB and reselling as delivered spot volumes.'
                  )}
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-3.5 space-y-1.5 font-mono text-[10px] text-zinc-400 uppercase select-none">
                <div className="flex justify-between items-center">
                  <span>{isAr ? 'مستهدف طاقة التصدير للفجيرة:' : 'Fujairah Pipeline Capacity:'}</span>
                  <span className="text-emerald-400 font-bold">3.3M bpd</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{isAr ? 'إجمالي البراميل المشحونة فوريًا:' : 'Aggregate Prompts Shipped:'}</span>
                  <span className="text-cyan-400 font-bold">75M - 80M bbl</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Half: ADNOC Tender Buyers (stacked horizontal bar chart) & Aramco Chinese Allocations vs Arab Light OSP */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ADNOC Tender Buyers */}
            <div className="lg:col-span-6 border-2 border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                  <span className="font-mono text-xxs font-black text-cyan-400 uppercase">
                    {isAr ? '٢. المشتري السيادي لمناقصات أدنوك (مليون برميل)' : '2. SOVEREIGN ADNOC TENDER BUYERS (MN BBL)'}
                  </span>
                  <h4 className="text-base font-black text-white font-sans">
                    {isAr ? 'توزع شحنات التندرات على المصافي والبيوت العالمية' : 'Tender Offtakers & Refiner Purchasing Splits'}
                  </h4>
                </div>
                
                <button
                  onClick={() => setShowAllBuyers(!showAllBuyers)}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono text-xxs px-2 py-1 flex items-center gap-1 cursor-pointer transition-all uppercase select-none"
                >
                  <span>{showAllBuyers ? (isAr ? 'عرض أقل' : 'Collapse') : (isAr ? 'عرض الكل ٢٠' : 'Show All 20')}</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${showAllBuyers ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className="h-80 font-sans text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visibleBuyers} layout="vertical" margin={{ top: 5, right: 10, left: isAr ? 20 : 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={true} horizontal={false} />
                    <XAxis type="number" stroke="#a1a1aa" />
                    <YAxis dataKey="name" type="category" stroke="#a1a1aa" width={90} orientation={isAr ? 'right' : 'left'} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff' }} />
                    <Legend />
                    <Bar dataKey="Upper Zakum" stackId="a" fill="#10b981" />
                    <Bar dataKey="Das Blend" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="Das" stackId="a" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Aramco Chinese Allocations vs Arab Light OSP */}
            <div className="lg:col-span-6 border-2 border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
              <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                <span className="font-mono text-xxs font-black text-amber-400 uppercase">
                  {isAr ? '٣. تخصيصات أرامكو للصين مقابل سعر البيع الرسمي' : '3. ARAMCO CHINA ALLOCATIONS VS. ARAB LIGHT OSP'}
                </span>
                <h4 className="text-base font-black text-white font-sans">
                  {isAr ? 'تأثر العقود الآجلة للصين بارتفاع سعر العربي الخفيف' : 'FOB Volumetric Erosion as OSP Premium Rises'}
                </h4>
              </div>

              <div className="h-80 font-sans text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={aramcoChinaData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="date" stroke="#a1a1aa" />
                    <YAxis yAxisId="left" stroke="#a1a1aa" label={{ value: isAr ? 'التخصيصات (مليون برميل)' : 'Allocations (Mn Bbl)', angle: -90, position: 'insideLeft', offset: 10 }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#ec4899" label={{ value: isAr ? 'سعر البيع العربي الخفيف ($/برميل)' : 'Arab Light OSP ($/B)', angle: 90, position: 'insideRight', offset: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff' }} />
                    <Legend />
                    <Area yAxisId="left" type="monotone" dataKey="Total Allocation" fill="#115e59" stroke="#14b8a6" fillOpacity={0.3} />
                    <Line yAxisId="right" type="monotone" dataKey="Arab Light OSP" stroke="#ec4899" strokeWidth={3} activeDot={{ r: 6 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xxs text-zinc-500 font-serif leading-relaxed text-right rtl:text-right ltr:text-left">
                {isAr ? 'المخطط يبرز بوضوح التآكل المستمر في مبيعات أرامكو الآجلة (FOB) إلى الصين مع تسجيل مستويات قياسية لعلاوة أسعار العربي الخفيف وتفضيل المشترين للمبيعات الفورية الجاهزة للتسليم.' : 'Visualizing the steep volumetric decline in FOB nominations as sovereign OSP premiums surge, forcing Chinese mega-refineries (Unipec, Rongsheng) to seek delivered spot barrels.'}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* TAB 3: Metric Telemetry Grid */}
      {activeTab === 'shuttle-sts' && (
        <div className="space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-850 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-[10px] text-zinc-400 uppercase select-none">
            <div className="flex items-center gap-2">
              <ShieldAlert size={14} className="text-amber-500 animate-pulse" />
              <span>{isAr ? 'نظام تقدير المخاطر المالية لمبيعات هرمز لعام ٢٠٢٦' : 'RESTRICTED LIVE REVENUE-RISK TELEMETRY FEED'}</span>
            </div>
            <div className="bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 font-bold">
              {isAr ? 'تحديث القياس: آمن' : 'COMMAND PROTOCOL: SECURE'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {crisisStats.map((stat) => (
              <div 
                key={stat.id}
                className="border-2 border-zinc-800 bg-zinc-950 p-4 flex flex-col justify-between space-y-4 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-200"
              >
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.bgGlow} to-transparent opacity-35 pointer-events-none`} />
                
                <div className="space-y-1">
                  <span className="font-mono text-[9px] font-black tracking-wider text-zinc-500 uppercase block">
                    {isAr ? stat.titleAr : stat.titleEn}
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl md:text-2xl font-black font-sans text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="font-mono text-xxs font-bold text-amber-400 px-2 py-0.5 bg-zinc-900/80 uppercase">
                      {isAr ? stat.changeAr : stat.changeEn}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-serif pt-2 border-t border-zinc-900">
                  {isAr ? stat.descAr : stat.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Deep arbitrage case study box */}
          <div className="border-2 border-red-900/60 bg-red-950/10 p-5 space-y-3">
            <h5 className="font-sans font-black text-sm text-red-400 uppercase tracking-tight flex items-center gap-1.5">
              <ShieldAlert size={16} className="animate-pulse" />
              <span>{isAr ? 'دراسة حالة التحكيم: استغلال عجز ناقلات العراق' : 'ARBITRAGE CASE STUDY: EXPLOITING SOMO SHIPP CONSTRAINTS'}</span>
            </h5>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-serif text-justify">
              {isAr ? (
                'تجسد الصفقة الأخيرة لخام البصرة المتوسط للتحميل في يوليو بوضوح تام حجم استنزاف القيمة السيادية؛ حيث بيع برميل النفط العراقي لشركة أدنوك للتجارة بخصم ضخم (-$14.0/B v OSP)، ليعاد شحنه وتفريغه مكوكياً وبيعه لشركة فورموزا التايوانية بعلاوة (+$3.0/B v Dubai). يمثل هذا فارق استخلاص أرباح بقيمة ملايين الدولارات لشحنة واحدة تبلغ مليوني برميل، نتيجة عجز البنية التحتية والناقلات الوطنية لبغداد.'
              ) : (
                'The July sale of a 2-million-barrel Basrah Medium cargo is a historic case of sovereign value erosion. SOMO, hindered by a lack of national tankers, was forced to offer a -$14.0/B OSP discount to ADNOC Trading. By utilizing independent shuttle shipping and Fujairah STS transfers, ADNOC subsequently liquidated the cargo to Formosa Petrochemical at a +$3.0/B Dubai premium, capturing a multi-million-dollar arbitrage margin on a single transaction.'
              )}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
