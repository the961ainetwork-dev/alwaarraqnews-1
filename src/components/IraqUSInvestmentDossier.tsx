import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HormuzCrisisReport } from './HormuzCrisisReport';
import { FifaWorldCupReport } from './FifaWorldCupReport';
import { 
  FileText, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Globe, 
  Languages, 
  ChevronRight, 
  ChevronLeft,
  AlertTriangle,
  Flame,
  CheckCircle,
  Clock,
  ExternalLink,
  Share2,
  Printer,
  DollarSign,
  Cpu,
  Layers,
  ArrowRight,
  Map,
  BookOpen,
  Building2,
  Lock
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
  Legend
} from 'recharts';

interface IraqUSInvestmentDossierProps {
  language: 'ar' | 'en';
}

export const IraqUSInvestmentDossier: React.FC<IraqUSInvestmentDossierProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeDossierTab, setActiveDossierTab] = useState<'telemetry' | 'infographics' | 'treaty-text' | 'financials'>('telemetry');
  const [selectedNode, setSelectedNode] = useState<string>('washington');
  const [compareCostModel, setCompareCostModel] = useState<boolean>(false);
  const [activeReport, setActiveReport] = useState<'iraq-us' | 'hormuz-crisis' | 'fifa-profits'>('iraq-us');

  const handleWhatsAppShare = () => {
    const title = isAr
      ? 'الورّاق للإعلام الاستقصائي: تقرير كشف الاتفاق الاستثماري العراقي الأمريكي بـ 60 مليار دولار'
      : 'Al-Warraq Exclusive: Landmark $60B Iraq-US Sovereign Investment Corridor Dossier';
    const summary = isAr
      ? 'تحليل استثنائي لعودة الشركات الأمريكية العملاقة، تطوير حقول كركوك، خط أنابيب المتوسط الاستراتيجي، ونزع سلاح الفصائل.'
      : 'Comprehensive analysis of US energy majors reentry, Kirkuk field redevelopment, Mediterranean bypass pipeline, and arms monopoly.';
    const shareUrl = window.location.href;
    const text = `🚨 *${isAr ? 'برقية سيادية عاجلة - شبكة الورّاق' : 'AL-WARRAQ SOVEREIGN DISPATCH'}*\n\n*${title}*\n\n${summary}\n\n📲 ${isAr ? 'تابع القراءة والمؤشرات بالتفصيل عبر الرابط:' : 'Read full dossier & quantitative metrics:'}\n${shareUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  // 1. Sovereign Telemetry Data
  const telemetryMetrics = useMemo(() => [
    {
      id: 'investment',
      titleAr: 'إجمالي الحزم الاستثمارية',
      titleEn: 'Total Investment Value',
      value: '$60.0B',
      changeAr: '+١٠٠٪ شراكة كاملة',
      changeEn: '+100% Comprehensive Pact',
      status: 'up',
      descAr: 'اتفاقيات كبرى تغطي الطاقة، التكرير، الدفاع والتمويل السيادي للنهوض بالبنية التحتية.',
      descEn: 'Major bilateral deals covering exploration, refining, defense, and sovereign finance.',
      color: 'border-emerald-600',
      textColor: 'text-emerald-500',
      bgGlow: 'from-emerald-500/10'
    },
    {
      id: 'kirkuk',
      titleAr: 'حصة مجمع حقول كركوك',
      titleEn: 'Kirkuk Stake Transferred',
      value: '42.0%',
      changeAr: 'استحواذ كونوكو فيليبس',
      changeEn: 'ConocoPhillips acquisition',
      status: 'up',
      descAr: 'الاستحواذ على حصة شركة "بي بي" لإعادة تطوير الحقل العملاق باحتياطيات تتجاوز ٣ مليارات برميل.',
      descEn: 'Acquisition of BP stake to redevelop the supergiant field holding 3B barrels.',
      color: 'border-cyan-600',
      textColor: 'text-cyan-400',
      bgGlow: 'from-cyan-500/10'
    },
    {
      id: 'crude',
      titleAr: 'مستهدف إنتاج الخام النفطي',
      titleEn: 'Target Crude Output',
      value: '7.0M bpd',
      changeAr: 'قبل عام ٢٠٣٠',
      changeEn: 'By 2030 (5.0M near-term)',
      status: 'up',
      descAr: 'زيادة الطاقات التصديرية وبناء مصاف جديدة لرفع حصة العراق السوقية في أوبك.',
      descEn: 'Scaling production with incremental financial incentives to secure global supply.',
      color: 'border-indigo-600',
      textColor: 'text-indigo-400',
      bgGlow: 'from-indigo-500/10'
    },
    {
      id: 'gas-dep',
      titleAr: 'التبعية للغاز الإيراني',
      titleEn: 'Iranian Gas Dependence',
      value: '-100%',
      changeAr: 'مستهدف الإقصاء الكامل',
      changeEn: 'Target complete removal',
      status: 'down',
      descAr: 'استبدال الغاز المستورد بالغاز المصاحب بالتعاون مع "إكسون موبيل" لتشغيل محطات الكهرباء.',
      descEn: 'Capturing flared associated gas to halt the dependency of 30% power grids.',
      color: 'border-red-600',
      textColor: 'text-red-500',
      bgGlow: 'from-red-500/10'
    },
    {
      id: 'disarm',
      titleAr: 'مهلة حصر السلاح السلاح بيد الدولة',
      titleEn: 'Militia Disarm Deadline',
      value: 'Sept 30, 2026',
      changeAr: 'بسط السيادة الكاملة',
      changeEn: 'Absolute state monopoly',
      status: 'neutral',
      descAr: 'حسم عسكري وسياسي لإنهاء وجود أي فصيل مسلح خارج إطار القوات المسلحة الرسمية.',
      descEn: 'Binding timeline declared by PM Al-Zaidy to eliminate non-state arsenals.',
      color: 'border-amber-600',
      textColor: 'text-amber-500',
      bgGlow: 'from-amber-500/10'
    },
    {
      id: 'pipeline',
      titleAr: 'خط أنابيب المتوسط الجديد',
      titleEn: 'Chevron Med Pipeline',
      value: '3.0B Barrels',
      changeAr: 'تجاوز مضيق هرمز ومخاطره',
      changeEn: 'Bypassing Strait of Hormuz',
      status: 'up',
      descAr: 'تحالف تقوده "شيفرون" لإنشاء خط تصدير بري عبر سوريا لتأمين تدفقات الخام لأوروبا.',
      descEn: 'Overland export corridor to Mediterranean Sea to hedge against Gulf bottlenecks.',
      color: 'border-purple-600',
      textColor: 'text-purple-400',
      bgGlow: 'from-purple-500/10'
    }
  ], []);

  // 2. Interactive Map Nodes Data
  const corridorNodes = {
    washington: {
      titleAr: 'القمة الرئاسية في واشنطن',
      titleEn: 'The Washington D.C. Summit',
      partnerAr: 'إدارة ترمب ورئيس الوزراء علي الزيدي',
      partnerEn: 'Trump Administration & PM Ali Al-Zaidy',
      focusAr: 'الضمانات السيادية والتزامات التسلح ونزع السلاح المليشياوي بحلول نهاية سبتمبر ٢٠٢٦.',
      focusEn: 'Sovereign guarantees, state defense credits, and strict non-state militia disarmament covenants.',
      statsAr: '٦٠ مليار دولار قيمة الصفقات الاستراتيجية الموقعة',
      statsEn: '$60B aggregate value of binding treaties signed'
    },
    kirkuk: {
      titleAr: 'مجمع حقول كركوك النفطي',
      titleEn: 'Kirkuk Supergiant Oil Hub',
      partnerAr: 'بي بي وكونوكو فيليبس (حصة ٤٢٪)',
      partnerEn: 'BP & ConocoPhillips (42% Working Stake)',
      focusAr: 'إعادة تطوير كركوك لرفع القدرة الإنتاجية من ٣٢٨ ألف برميل يومياً باستخدام حوافز تسعيرية جديدة.',
      focusEn: 'Overhauling production from 328,000 bpd base, adding incremental yield benefits.',
      statsAr: '٣ مليارات برميل نفط مكافئ حجم الاحتياطيات المؤكدة',
      statsEn: 'Over 3.0 Billion Barrels of oil equivalent'
    },
    faw: {
      titleAr: 'مدينة الفاو للطاقة ومسار التنمية',
      titleEn: 'Al-Faw Energy City & Development Road',
      partnerAr: 'هاليبرتون، كيه بي آر والتمويل الأميركي',
      partnerEn: 'Halliburton, KBR, and US Sovereign Funding',
      focusAr: 'بناء مجمع متكامل للمصافي ومحطات معالجة الغاز لتغذية مسار طريق التنمية الاستراتيجي جنوب العراق.',
      focusEn: 'Integrated refining complexes, petrochemical grids, and dry port linkages.',
      statsAr: 'المرحلة الأولى تستهدف إنتاج ٥ ملايين برميل يومياً',
      statsEn: 'Phase 1 near-term target 5.0M bpd output capacity'
    },
    med_pipeline: {
      titleAr: 'خط الأنابيب البري للمتوسط',
      titleEn: 'Overland Mediterranean Export Corridor',
      partnerAr: 'شيفرون وتحالف الشركاء الإقليميين',
      partnerEn: 'Chevron & trilateral regional pipeline consortium',
      focusAr: 'تجاوز اختناقات النقل والتهديدات الأمنية في الخليج ومضيق هرمز عبر خط استراتيجي مباشر إلى المشرق.',
      focusEn: 'Overland crude pipelines through Syria to southern European terminals.',
      statsAr: 'سعة تدفق آمنة تعزل الصادرات عن أزمات مضيق هرمز',
      statsEn: 'Provides total logistical buffer isolating crude streams'
    }
  };

  // 3. Investment allocation chart data
  const sectorAllocation = [
    { name: isAr ? 'النفط والغاز' : 'Oil & Gas Exploration', value: 28, color: '#10b981' },
    { name: isAr ? 'معالجة الغاز المصاحب' : 'Associated Gas Capture', value: 18, color: '#06b6d4' },
    { name: isAr ? 'خطوط الأنابيب البديلة' : 'Alternative Pipelines', value: 14, color: '#8b5cf6' },
    { name: isAr ? 'مصفى الفاو ومجمع الطاقة' : 'Al-Faw Energy City', value: 15, color: '#6366f1' },
    { name: isAr ? 'الدفاع وحفظ الأمن' : 'Defense & Sovereignty', value: 12, color: '#f59e0b' },
    { name: isAr ? 'البنية التحتية والساتل' : 'Rural Tech & Satellites', value: 13, color: '#ec4899' },
  ];

  // 4. Historical Crude Targets Data
  const trajectoryData = [
    { year: '2025', current: 4.2, target: 4.2 },
    { year: '2026', current: 4.4, target: 5.0 },
    { year: '2027', current: null, target: 5.5 },
    { year: '2028', current: null, target: 6.0 },
    { year: '2029', current: null, target: 6.5 },
    { year: '2030', current: null, target: 7.0 },
  ];

  // Printable PDF Generator
  const triggerPdfGeneration = (title: string, content: string, sectionName: string) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html lang="${isAr ? 'ar' : 'en'}" dir="${isAr ? 'rtl' : 'ltr'}">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
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
            border-bottom: 4px solid #10b981;
            padding-bottom: 20px;
            margin-bottom: 30px;
            text-align: center;
          }
          .logo {
            font-size: 26px;
            font-weight: 900;
            color: #064e3b;
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
            background-color: #d1fae5;
            color: #065f46;
            padding: 6px 12px;
            font-size: 11px;
            font-weight: 900;
            margin-bottom: 20px;
            border: 1px solid #059669;
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
            font-size: 15px;
            color: #27272a;
            white-space: pre-line;
            text-align: justify;
          }
          .telemetry-table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
          }
          .telemetry-table th {
            background-color: #064e3b;
            color: white;
            padding: 10px;
            font-size: 13px;
            text-align: ${isAr ? 'right' : 'left'};
          }
          .telemetry-table td {
            border: 1px solid #e4e4e7;
            padding: 10px;
            font-size: 12px;
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
          <div class="logo">${isAr ? 'شبكة الورّاق الاستقصائية للدراسات الجيوسياسية' : 'AL-WARRAQ GEOPOLITICAL INTELLIGENCE NET'}</div>
          <div class="subtitle">${isAr ? 'تقرير استثنائي سيادي معتمد للنشر المحدود — تموز ٢٠٢٦' : 'RESTRICTED SOVEREIGN CLASSIFIED DOSSIER // JULY 2026'}</div>
        </div>
        
        <div class="badge">${sectionName}</div>
        <h1>${title}</h1>
        
        <div class="meta">
          ${isAr ? 'المرجع: ملف التنسيق الثنائي بغداد-واشنطن' : 'Reference: Baghdad-Washington Bilateral Treaty #IRAQ-US-2026'} | 
          ${isAr ? 'تاريخ التحليل:' : 'Analysis Date:'} 2026-07-18 | 
          ${isAr ? 'التصنيف: وثيقة سيادية حساسة' : 'Classification: Sensitive Sovereign Intelligence'}
        </div>
        
        <div class="content">${content}</div>

        <h3 style="margin-top: 30px;">${isAr ? 'المؤشرات والبيانات الرقمية للملف العراقي' : 'Iraq-US Investment Quantitative Metrics'}</h3>
        <table class="telemetry-table">
          <thead>
            <tr>
              <th>${isAr ? 'المؤشر الاستراتيجي' : 'Strategic Metric'}</th>
              <th>${isAr ? 'القيمة والمستهدف' : 'Value / Target'}</th>
              <th>${isAr ? 'حالة التغيير والاتجاه' : 'Trend & Scope'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${isAr ? 'إجمالي الاستثمارات الأميركية المتعهد بها' : 'Total Committed US Investments'}</td>
              <td>$60.0 Billion</td>
              <td>${isAr ? 'صعود (١٠٠٪ شراكة استراتيجية كبرى)' : 'Up (+100% Core Strategic Pact)'}</td>
            </tr>
            <tr>
              <td>${isAr ? 'الاستحواذ على حقول كركوك' : 'Kirkuk Field Stake Transfer'}</td>
              <td>42.0%</td>
              <td>${isAr ? 'صعود (عودة كونوكو فيليبس بعد غياب عقد)' : 'Up (ConocoPhillips strategic return)'}</td>
            </tr>
            <tr>
              <td>${isAr ? 'مستهدف إنتاج النفط الخام' : 'Target Crude Oil Output'}</td>
              <td>7.0M BPD</td>
              <td>${isAr ? 'صعود (مخطط طموح بحلول عام ٢٠٣٠)' : 'Up (Ambitious trajectory by 2030)'}</td>
            </tr>
            <tr>
              <td>${isAr ? 'الاعتماد المباشر على الغاز الإيراني' : 'Bilateral Gas Dependence'}</td>
              <td>0% Target (-100% reduction)</td>
              <td>${isAr ? 'هبوط (استبدال تام عبر غاز إكسون موبيل المصاحب)' : 'Down (Complete capture of flared associated gas)'}</td>
            </tr>
            <tr>
              <td>${isAr ? 'مهلة نزع سلاح الفصائل وحصر السلاح' : 'Sovereign Disarmament Deadline'}</td>
              <td>Sept 30, 2026</td>
              <td>${isAr ? 'حيادي (تعهد حاسم من رئيس الوزراء الزيدي)' : 'Neutral (Strict commitment by PM Ali Al-Zaidy)'}</td>
            </tr>
            <tr>
              <td>${isAr ? 'خط تصدير المتوسط الاحتياطي' : 'Mediterranean Overland Bypass Pipeline'}</td>
              <td>3.0B Barrels (Reserves)</td>
              <td>${isAr ? 'صعود (تحت الدراسة بقيادة شركة شيفرون)' : 'Up (Active consortium led by Chevron)'}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="footer">
          © 2026 Al-Warraq Media. All rights reserved. This document and its compiled datasets are authorized exclusively for the recipient's secure workspace.
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

  const iraqDetailedReportAr = `### التحول الجيو-اقتصادي الأكبر في المشرق العربي
تشهد العاصمة الأميركية واشنطن ومدينة بغداد انطلاقة الشراكة الاقتصادية والسيادية الأكثر شمولاً وتأثيراً منذ عقدين من الزمن، والمقدرة بـ 60 مليار دولار أميركي. وقعت شركة "كونوكو فيليبس" بجانب عشرات الشركات الكبرى الأميركية في قطاعات الطاقة الاستراتيجية، والدفاع، والصحة، والتمويل، والاتصالات اتفاقات غير مسبوقة تهدف لإعادة تشكيل سلاسل التكرير والإنتاج وحماية السيادة الوطنية العراقية.

تأتي هذه التحركات التاريخية بعد زيارة استغرقت أسبوعاً لرئيس الوزراء العراقي علي الزيدي، والذي تمكن من نيل تعهد مباشر وموثق من الرئيس الأميركي دونالد ترمب بفتح الباب أمام استثمارات مليارية في قطاع الطاقة، وتيسير خطوط الائتمان السيادي لتحديث البنية الأساسية في شبه جزيرة الفاو وحقل كركوك النفطي.

### عودة كونوكو فيليبس واسترداد كركوك
إن حجر الزاوية في هذه الاتفاقيات النفطية تمثل في استحواذ "كونوكو فيليبس" على حصة تبلغ 42% في مجمع حقول كركوك النفطي العملاق في شمال العراق، وهي خطوة تعني عودة الشركة إلى السوق العراقي بعد عشر سنوات كاملة من الغياب والتحول الاستراتيجي. تبلغ قيمة الصفقة قرابة 400 مليون دولار، وتستهدف إعادة تدوير البنى التحتية للمجمع العملاق الذي يمتلك احتياطيات تفوق 3 مليارات برميل نفط مكافئ، وتوفير هوامش تسعيرية وحوافز مالية مغرية تفوق عقود الخدمة السابقة الصارمة التي كانت تنفر الشركات الأجنبية.

### خط التصدير البديل: تأمين مسارات المتوسط
لمواجهة مخاطر الاختناقات الملاحية والتهديدات العسكرية المستمرة في مضيق هرمز، أطلقت شركة "شيفرون" بالتحالف مع شركاء إقليميين دراسة جدوى استراتيجية متكاملة لمد خط أنابيب بري عملاق لنقل النفط الخام من حقول العراق الشمالية والجنوبية مباشرة إلى البحر الأبيض المتوسط عبر الأراضي السورية. هذا الخط كفيل بعزل تدفقات النفط العراقي بالكامل عن أي صدمة جيوسياسية أو أمنية في الخليج العربي وتأمين الصادرات للأسواق الأوروبية بمرونة كاملة.

### السيادة الكاملة: نزع سلاح الفصائل ووقف الغاز الإيراني
على الصعيد الجيوسياسي، أكد رئيس الوزراء علي الزيدي عزم حكومته المضي قدماً وبدعم دولي وعربي شامل لتصفير وجود أي سلاح خارج إطار الدولة والشرعية اللبنانية والقوانين الرسمية بحلول 30 سبتمبر 2026.

وفي الوقت ذاته، يخوض العراق مفاوضات حاسمة مع عملاق الطاقة "إكسون موبيل" لوقف حرق الغاز المصاحب لعمليات استخراج النفط واستغلاله لتشغيل محطات توليد الطاقة الكهربائية، مما يتيح إنهاء التبعية المزمنة للغاز المستورد من إيران والذي يغذي حالياً أكثر من 30% من الشبكة الوطنية، وهو ما جعل البلاد عرضة لانقطاعات مفاجئة وصدمات أمنية متكررة.`;

  const iraqDetailedReportEn = `### The Geopolitical & Fiscal Transformation of the Levant
In a landmark development reshaping the balance of power and finance in the Middle East, Iraqi Prime Minister Ali Al-Zaidy and US President Donald Trump have finalized a historic $60 Billion Sovereign Investment Corridor. Backed by corporate giants including ConocoPhillips, Chevron, ExxonMobil, SpaceX's Starlink, and Halliburton, the treaties mark a profound shift from decades of regional friction to a stable, investment-driven economy.

The package was ratified following an intensive, week-long state visit by PM Al-Zaidy to Washington. The summit unlocked direct US capital deployment, sovereign finance credits, and advanced technical cooperation designed to rebuild Iraq's key assets—from northern extraction complexes to the southern sea-ports.

### ConocoPhillips' Strategic Acquisition of the Kirkuk Giant
The crown jewel of the energy agreements is ConocoPhillips' return to Iraq after a ten-year absence. The US energy conglomerate acquired a 42% working stake in BP's joint venture to redevelop the supergiant Kirkuk oil field in northern Iraq. 

This transaction, valued at approximately $400 million, opens up exploration blocks holding more than 3.0 Billion Barrels of oil equivalent. Rather than relying on traditional, low-margin Iraqi service contracts, the new framework introduces high-yield pricing incentives for incremental production, making it a highly attractive destination for private American capital.

### Bypassing the Strait of Hormuz via Chevron's Overland Pipe
To secure Iraqi energy exports from geopolitical blockades and shipping disruptions in the Arabian Gulf, Chevron has joined a multinational consortium. The group is conducting final engineering audits for a multi-billion-dollar overland export pipeline routed from northern and southern extraction hubs directly to Mediterranean Sea terminals through Syria.

This project will establish a massive logistical buffer, insulating global energy supply routes and European markets from potential security flare-ups in the Strait of Hormuz.

### Dismantling Foreign Gas Hegemony & Asserting Arms Monopoly
Strategically, PM Ali Al-Zaidy has used the Washington platform to announce two critical sovereignty targets:
1. **Zero Flared Gas & Iranian Independence**: Partnering with ExxonMobil to capture flared associated gas, Iraq is moving to completely replace its imports of Iranian gas—which currently power 30% of local grids—by capturing clean domestic energy resources.
2. **State Monopoly on Weapons**: Prime Minister Al-Zaidy declared a definitive, binding deadline of September 30, 2026, to fully disarm all non-state paramilitary factions and establish absolute, exclusive state control over weapons.`;

  return (
    <div 
      id="iraq-us-investment-dossier" 
      className={`border-4 border-black p-5 md:p-8 bg-zinc-950 text-white my-8 relative shadow-[8px_8px_0px_0px_rgba(${activeReport === 'iraq-us' ? '16,185,129,1' : activeReport === 'fifa-profits' ? '245,158,11,1' : '239,68,68,1'})] overflow-hidden`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Dynamic Top Grid Line Accent */}
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${activeReport === 'iraq-us' ? 'from-emerald-500 via-teal-600 to-cyan-500' : activeReport === 'fifa-profits' ? 'from-amber-500 via-yellow-650 to-emerald-600' : 'from-amber-500 via-orange-650 to-red-600'} animate-pulse`}></div>

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14532d_1px,transparent_1px),linear-gradient(to_bottom,#14532d_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        
        {/* Sovereign Special Reports Toggle Bar */}
        <div className="border-b border-zinc-800 pb-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className={`${activeReport === 'iraq-us' ? 'text-emerald-500' : activeReport === 'fifa-profits' ? 'text-amber-500' : 'text-red-500'} animate-pulse shrink-0`} size={18} />
            <div>
              <h3 className="font-sans font-black text-xs text-zinc-400 uppercase tracking-widest">
                {isAr ? 'غرفة التقارير الجيوسياسية الخاصة' : 'SOVEREIGN SPECIAL REPORTS DESK'}
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono uppercase">
                {isAr ? 'تقارير سيادية وحصص ممرات الطاقة الإقليمية ٢٠٢٦' : 'SECURE COMMAND RESEARCH & ASSESSMENTS 2026'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap border border-zinc-800 p-1 bg-zinc-900/60 rounded-none self-start">
            <button
              onClick={() => setActiveReport('iraq-us')}
              className={`px-3 py-1.5 font-sans font-black text-xs uppercase cursor-pointer transition-all ${
                activeReport === 'iraq-us'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 shadow-[2px_2px_0px_0px_rgba(16,185,129,1)]'
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              {isAr ? '١. ممر الاستثمار العراقي الأمريكي' : '1. Iraq-US Corridor'}
            </button>
            
            <button
              onClick={() => setActiveReport('hormuz-crisis')}
              className={`px-3 py-1.5 font-sans font-black text-xs uppercase cursor-pointer transition-all ${
                activeReport === 'hormuz-crisis'
                  ? 'bg-red-950 text-red-400 border border-red-800 shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]'
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              {isAr ? '٢. أزمة مبيعات نفط هرمز' : '2. Hormuz Oil'}
            </button>

            <button
              onClick={() => setActiveReport('fifa-profits')}
              className={`px-3 py-1.5 font-sans font-black text-xs uppercase cursor-pointer transition-all ${
                activeReport === 'fifa-profits'
                  ? 'bg-amber-950 text-amber-400 border border-amber-800 shadow-[2px_2px_0px_0px_rgba(245,158,11,1)]'
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              {isAr ? '٣. أرباح فيفا كأس العالم ٢٠٢٦' : '3. FIFA World Cup'}
            </button>
          </div>
        </div>

        {activeReport === 'hormuz-crisis' ? (
          <HormuzCrisisReport language={language} />
        ) : activeReport === 'fifa-profits' ? (
          <FifaWorldCupReport language={language} />
        ) : (
          <>
            {/* Document Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-zinc-800 pb-5">
          <div className="space-y-1 text-right rtl:text-right ltr:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-none animate-ping shrink-0" />
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-none absolute shrink-0" />
              <span className="font-mono text-xxs font-black tracking-widest text-emerald-400 uppercase select-none">
                {isAr ? 'الدراسة الجيوسياسية الخاصة — ملف التنسيق الثنائي' : 'SPECIAL GEOPOLITICAL DOSSIER // BILATERAL COMMAND'}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black font-sans text-white tracking-tight leading-tight uppercase">
              {isAr ? 'اتفاقيات الـ ٦٠ مليار دولار: ممر الاستثمار العراقي الأمريكي' : 'Landmark $60 Billion Corridor: Iraq-US Sovereign Package'}
            </h2>
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              {isAr ? 'تقييم شامل لعودة الطاقة الأميركية، خط أنابيب المتوسط وعقود كركوك الفائقة' : 'Sovereign assessment of US energy reentry, med pipeline bypass & Kirkuk overhaul'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-emerald-950/80 text-emerald-400 font-mono text-[9px] font-black px-3.5 py-1.5 border border-emerald-800/60 uppercase tracking-widest flex items-center gap-1.5 select-none">
              <DollarSign size={12} className="text-emerald-400 animate-pulse" />
              <span>{isAr ? 'حزمة السيادة لعام ٢٠٢٦' : 'SOVEREIGN PACT 2026'}</span>
            </div>
            
            <button
              onClick={handleWhatsAppShare}
              className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-none p-1.5 cursor-pointer text-xs flex items-center gap-1.5 transition-all active:scale-95 border border-emerald-500 shadow-[2px_2px_0px_0px_rgba(16,185,129,1)]"
              title={isAr ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.013-5.112-2.86-6.961C16.628 1.936 14.15 1.921 11.515 1.921 6.08 1.921 1.657 6.341 1.653 11.78c-.001 1.637.43 3.235 1.252 4.636l-.993 3.633 3.735-.98l1.002.585zM17.65 14.537c-.31-.155-1.833-.905-2.115-1.008-.282-.103-.487-.155-.69.155-.203.31-.787.98-.966 1.185-.179.205-.359.231-.669.076-.31-.155-1.309-.483-2.495-1.541-.923-.824-1.546-1.841-1.727-2.15-.18-.31-.02-.477.136-.631.14-.139.31-.36.465-.54.155-.18.205-.31.31-.515.103-.205.052-.385-.026-.54-.078-.155-.69-1.662-.945-2.277-.249-.599-.501-.518-.69-.527-.179-.008-.385-.01-.591-.01-.205 0-.54.077-.822.385-.282.31-1.077 1.053-1.077 2.569 0 1.516 1.103 2.981 1.257 3.187.154.205 2.17 3.313 5.257 4.646.734.317 1.307.506 1.753.648.739.235 1.412.202 1.944.123.593-.088 1.833-.749 2.09-1.474.256-.725.256-1.346.179-1.474-.076-.128-.282-.205-.591-.361z" />
              </svg>
              <span className="font-mono text-[10px] font-bold">{isAr ? 'واتساب' : 'WhatsApp'}</span>
            </button>

            <button
              onClick={() => triggerPdfGeneration(
                isAr ? 'اتفاقيات الـ 60 مليار دولار: ممر الاستثمار العراقي الأمريكي' : 'Landmark $60 Billion Corridor: Iraq-US Sovereign Package',
                isAr ? iraqDetailedReportAr : iraqDetailedReportEn,
                isAr ? 'التقرير السيادي الخاص - كود #IRAQ-US-2026' : 'SPECIAL REPORT // DOCKET #IRAQ-US-2026'
              )}
              className="bg-zinc-900 border border-zinc-700 hover:border-emerald-500 hover:text-emerald-400 text-white rounded-none p-1.5 cursor-pointer text-xs flex items-center gap-1.5 transition-all active:scale-95"
              title={isAr ? 'تصدير وثيقة PDF معتمدة' : 'Export Certified PDF Dossier'}
            >
              <Printer size={12} />
              <span className="font-mono text-[10px] font-bold">{isAr ? 'ملف PDF' : 'PDF'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-1 overflow-x-auto select-none">
          <button
            onClick={() => setActiveDossierTab('telemetry')}
            className={`px-4 py-2.5 text-xs font-bold cursor-pointer transition-all border-b-2 flex items-center gap-2 ${
              activeDossierTab === 'telemetry'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Cpu size={14} />
            <span>{isAr ? '١. القياس والتحكم الرقمي' : '1. Digital Telemetry'}</span>
          </button>
          
          <button
            onClick={() => setActiveDossierTab('infographics')}
            className={`px-4 py-2.5 text-xs font-bold cursor-pointer transition-all border-b-2 flex items-center gap-2 ${
              activeDossierTab === 'infographics'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Map size={14} />
            <span>{isAr ? '٢. ممرات الاستثمار التفاعلية' : '2. Corridor Map Nodes'}</span>
          </button>

          <button
            onClick={() => setActiveDossierTab('financials')}
            className={`px-4 py-2.5 text-xs font-bold cursor-pointer transition-all border-b-2 flex items-center gap-2 ${
              activeDossierTab === 'financials'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <TrendingUp size={14} />
            <span>{isAr ? '٣. نمذجة البيانات والإنتاج' : '3. Trajectory & Allocations'}</span>
          </button>

          <button
            onClick={() => setActiveDossierTab('treaty-text')}
            className={`px-4 py-2.5 text-xs font-bold cursor-pointer transition-all border-b-2 flex items-center gap-2 ${
              activeDossierTab === 'treaty-text'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <BookOpen size={14} />
            <span>{isAr ? '٤. وثيقة التحليل المتكاملة' : '4. Complete Analytic Dossier'}</span>
          </button>
        </div>

        {/* TAB 1: Digital Telemetry Grid */}
        {activeDossierTab === 'telemetry' && (
          <div className="space-y-6">
            <div className="bg-zinc-900/60 border border-zinc-800 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-[10px] text-zinc-400 uppercase select-none">
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} className="text-emerald-500 animate-pulse" />
                <span>{isAr ? 'نظام تتبع الاستثمار المباشر وإبرام الصفقات المليارية لعام ٢٠٢٦' : 'Active 2026 sovereign deal-tracking database & incremental metrics'}</span>
              </div>
              <div className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 font-bold">
                {isAr ? 'البيانات محدثة تلقائياً' : 'SYSTEM STATUS: ENCRYPTED LIVE FEED'}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {telemetryMetrics.map((metric) => (
                <div 
                  key={metric.id}
                  className={`border-2 ${metric.color} bg-zinc-950 p-4 flex flex-col justify-between space-y-4 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-200`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${metric.bgGlow} to-transparent opacity-30 pointer-events-none`} />
                  
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-black tracking-wider text-zinc-500 uppercase block">
                      {isAr ? metric.titleAr : metric.titleEn}
                    </span>
                    <div className="flex items-baseline justify-between">
                      <span className={`text-2xl md:text-3xl font-black font-sans ${metric.textColor} tracking-tight`}>
                        {metric.value}
                      </span>
                      <span className="font-mono text-xxs font-bold text-zinc-400 px-2 py-0.5 bg-zinc-900/80 uppercase">
                        {isAr ? metric.changeAr : metric.changeEn}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-serif pt-2 border-t border-zinc-900">
                    {isAr ? metric.descAr : metric.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Corridor Map Nodes */}
        {activeDossierTab === 'infographics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Hand: Interactive schematic vector nodes */}
            <div className="lg:col-span-5 border-2 border-zinc-800 bg-zinc-900/40 p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-2">
                  <Globe size={14} className="text-emerald-500 animate-spin-slow" />
                  <span className="font-mono text-xxs font-black text-zinc-400 uppercase">
                    {isAr ? 'عُقد ونقاط الممر الاستثماري الاستراتيجي' : 'SOVEREIGN CORRIDOR ROUTING MATRIX'}
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Washington Node */}
                  <button
                    onClick={() => setSelectedNode('washington')}
                    className={`w-full text-right rtl:text-right ltr:text-left p-3 border cursor-pointer transition-all flex items-center justify-between ${
                      selectedNode === 'washington' 
                        ? 'bg-emerald-950 border-emerald-500 text-white shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]' 
                        : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-none ${selectedNode === 'washington' ? 'bg-emerald-400 animate-ping' : 'bg-zinc-600'}`} />
                      <div className="font-bold text-xs">
                        {isAr ? 'عُقدة واشنطن الدبلوماسية' : 'Washington D.C. Command Node'}
                      </div>
                    </div>
                    <ChevronRight size={14} className="opacity-60" />
                  </button>

                  {/* Kirkuk Node */}
                  <button
                    onClick={() => setSelectedNode('kirkuk')}
                    className={`w-full text-right rtl:text-right ltr:text-left p-3 border cursor-pointer transition-all flex items-center justify-between ${
                      selectedNode === 'kirkuk' 
                        ? 'bg-cyan-950 border-cyan-500 text-white shadow-[4px_4px_0px_0px_rgba(6,182,212,1)]' 
                        : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-none ${selectedNode === 'kirkuk' ? 'bg-cyan-400 animate-ping' : 'bg-zinc-600'}`} />
                      <div className="font-bold text-xs">
                        {isAr ? 'مجمع حقول كركوك العملاق' : 'Kirkuk Exploration Complex'}
                      </div>
                    </div>
                    <ChevronRight size={14} className="opacity-60" />
                  </button>

                  {/* Faw Node */}
                  <button
                    onClick={() => setSelectedNode('faw')}
                    className={`w-full text-right rtl:text-right ltr:text-left p-3 border cursor-pointer transition-all flex items-center justify-between ${
                      selectedNode === 'faw' 
                        ? 'bg-indigo-950 border-indigo-500 text-white shadow-[4px_4px_0px_0px_rgba(99,102,241,1)]' 
                        : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-none ${selectedNode === 'faw' ? 'bg-indigo-400 animate-ping' : 'bg-zinc-600'}`} />
                      <div className="font-bold text-xs">
                        {isAr ? 'مدينة الفاو وطريق التنمية' : 'Al-Faw City & Development Way'}
                      </div>
                    </div>
                    <ChevronRight size={14} className="opacity-60" />
                  </button>

                  {/* Med Pipeline Node */}
                  <button
                    onClick={() => setSelectedNode('med_pipeline')}
                    className={`w-full text-right rtl:text-right ltr:text-left p-3 border cursor-pointer transition-all flex items-center justify-between ${
                      selectedNode === 'med_pipeline' 
                        ? 'bg-purple-950 border-purple-500 text-white shadow-[4px_4px_0px_0px_rgba(168,85,247,1)]' 
                        : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-none ${selectedNode === 'med_pipeline' ? 'bg-purple-400 animate-ping' : 'bg-zinc-600'}`} />
                      <div className="font-bold text-xs">
                        {isAr ? 'خط التصدير البري للمتوسط' : 'Overland Mediterranean Export Line'}
                      </div>
                    </div>
                    <ChevronRight size={14} className="opacity-60" />
                  </button>
                </div>
              </div>

              <div className="text-[9px] font-mono text-zinc-500 pt-6 uppercase select-none">
                <span>{isAr ? 'مستند مرجعي رقم: #US-IQ-MAP-SEC-2026' : 'Dossier Reference ID: #US-IQ-MAP-SEC-2026'}</span>
              </div>
            </div>

            {/* Right Hand: Context and metrics details for the selected node */}
            <div className="lg:col-span-7 border-2 border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between space-y-6 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedNode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4 text-right rtl:text-right ltr:text-left"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 border border-emerald-800 uppercase">
                        {isAr ? 'تفاصيل عُقدة الممر' : 'CORRIDOR NODE FACTSHEET'}
                      </span>
                      <h3 className="text-xl font-black font-sans text-white tracking-tight mt-1">
                        {isAr ? corridorNodes[selectedNode as keyof typeof corridorNodes].titleAr : corridorNodes[selectedNode as keyof typeof corridorNodes].titleEn}
                      </h3>
                    </div>
                    <Building2 size={24} className="text-zinc-600 shrink-0" />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="font-mono text-xxs font-black text-zinc-500 block uppercase">
                        {isAr ? 'الأطراف الموقعة والشركاء' : 'SIGNATORIES & OPERATORS'}
                      </span>
                      <span className="text-sm font-bold text-zinc-200">
                        {isAr ? corridorNodes[selectedNode as keyof typeof corridorNodes].partnerAr : corridorNodes[selectedNode as keyof typeof corridorNodes].partnerEn}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-xxs font-black text-zinc-500 block uppercase">
                        {isAr ? 'الأهداف الاستراتيجية ومحاور التركيز' : 'CORE TARGETS & SOVEREIGN SCOPE'}
                      </span>
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-serif">
                        {isAr ? corridorNodes[selectedNode as keyof typeof corridorNodes].focusAr : corridorNodes[selectedNode as keyof typeof corridorNodes].focusEn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-900">
                      <span className="font-mono text-xxs font-black text-emerald-500 block uppercase">
                        {isAr ? 'الأثر المالي والإنتاجي' : 'FISCAL & PRODUCTION IMPACT'}
                      </span>
                      <p className="text-sm font-black text-white font-sans">
                        {isAr ? corridorNodes[selectedNode as keyof typeof corridorNodes].statsAr : corridorNodes[selectedNode as keyof typeof corridorNodes].statsEn}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="bg-zinc-900 border border-zinc-800 p-3.5 flex items-center justify-between gap-3 text-xxs font-mono text-zinc-400 uppercase select-none">
                <div className="flex items-center gap-1.5">
                  <Lock size={12} className="text-red-500 shrink-0 animate-pulse" />
                  <span>{isAr ? 'مستويات الثقة السيادية: مقيدة بالاتفاقيات الرسمية' : 'Access Authorization: CONFIDENTIAL'}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: Trajectory & Allocations */}
        {activeDossierTab === 'financials' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sector allocations Recharts Bar chart */}
            <div className="lg:col-span-6 border-2 border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
              <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                <span className="font-mono text-xxs font-black text-emerald-400 uppercase">
                  {isAr ? 'توزيع التخصيصات الاستثمارية (نسبة مئوية)' : 'ALLOCATION OF THE $60B INVESTMENT PACKAGE'}
                </span>
                <h4 className="text-base font-black text-white font-sans">
                  {isAr ? 'تقييم الحصص النسبية للقطاعات المدعومة' : 'Direct Corporate Allocation Framework'}
                </h4>
              </div>

              <div className="h-64 font-sans text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={sectorAllocation} 
                    layout="vertical"
                    margin={{ top: 10, right: 10, left: isAr ? 30 : 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                    <XAxis type="number" stroke="#a1a1aa" unit="%" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="#a1a1aa" 
                      width={isAr ? 120 : 130} 
                      orientation={isAr ? 'right' : 'left'} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#1f2937', opacity: 0.3 }}
                      contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff' }} 
                    />
                    <Bar dataKey="value" fill="#10b981">
                      {sectorAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-xxs text-zinc-500 font-serif leading-relaxed text-right rtl:text-right ltr:text-left">
                {isAr ? 'تمثل التخصيصات الاستثمارية أعلاه الصفقات الملزمة والبروتوكولات التمهيدية الموقعة في القمة.' : 'Investment shares based on direct contractual pledges and letters of intent compiled at the Washington summit.'}
              </p>
            </div>

            {/* Production Growth Trajectory Area chart */}
            <div className="lg:col-span-6 border-2 border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
              <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                <span className="font-mono text-xxs font-black text-cyan-400 uppercase">
                  {isAr ? 'خارطة طريق رفع القدرات الإنتاجية (مليون برميل يومياً)' : 'NATIONAL CRUDE TRAJECTORY & GROWTH OUTLOOK'}
                </span>
                <h4 className="text-base font-black text-white font-sans">
                  {isAr ? 'المستهدفات الاستراتيجية للنفط والغاز ٢٠٢٥ - ٢٠٣٠' : 'National Oil Trajectory Targeting 7M BPD'}
                </h4>
              </div>

              <div className="h-64 font-sans text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={trajectoryData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="year" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" domain={[3.5, 7.5]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff' }} 
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      name={isAr ? 'الإنتاج المستهدف' : 'Target Production Limit'} 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorTarget)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="text-xxs text-zinc-500 font-serif leading-relaxed text-right rtl:text-right ltr:text-left">
                {isAr ? 'يستهدف العراق رفع طاقة الإنتاج إلى ٥ ملايين برميل يومياً قبل نهاية عام ٢٠٢٦ لتجاوز الصدمات التصديرية وبناء طاقة تكريرية مرنة.' : 'The sovereign blueprint forecasts achieving 5.0M bpd output by mid-2026, scaling to 7.0M bpd by 2030 through direct US corporate project deployment.'}
              </p>
            </div>

          </div>
        )}

        {/* TAB 4: Detailed Analysis */}
        {activeDossierTab === 'treaty-text' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Report Body text */}
            <div className="lg:col-span-8 space-y-6 text-right rtl:text-right ltr:text-left">
              <div className="prose prose-invert prose-emerald font-serif max-w-none text-zinc-300 text-sm md:text-base leading-relaxed space-y-6 text-justify">
                {isAr ? (
                  <div className="space-y-4">
                    <p>
                      تشهد الساحة الإقليمية إعادة ضبط جيو-اقتصادي كبرى بقيادة حكومة رئيس الوزراء العراقي <strong>علي الزيدي</strong> وتعهدات حاسمة من إدارة الرئيس الأميركي <strong>دونالد ترمب</strong> لتوسيع نطاق الشراكة الثنائية بمشاريع تتجاوز قيمتها الإجمالية <strong>٦٠ مليار دولار</strong>.
                    </p>
                    <blockquote className="border-r-4 border-emerald-500 pr-4 my-4 font-sans text-sm text-zinc-400">
                      "هدفنا الأساسي في العراق هو مأسسة شراكات متكاملة وعميقة ومستدامة، تعزز السيادة الوطنية والإنتاج المحلي وتحمي ممرات التصدير بعيداً عن صدمات المضائق الإقليمية." <br />
                      <span className="font-bold text-zinc-200">— علي الزيدي، رئيس وزراء العراق</span>
                    </blockquote>
                    <p>
                      يمثل حقل <strong>كركوك</strong> النفطي حجر الزاوية الجغرافي لهذه الشراكة، حيث تتدخل شركة <strong>"كونوكو فيليبس" (ConocoPhillips)</strong> بالاستحواذ على حصة ٤٢٪ لإعادة تأهيل وبناء الحقل العملاق، مدفوعاً بنظام مالي مرن وحوافز للمشغلين تفوق بكثير عقود الخدمة السابقة الصارمة التي كبحت الاستثمار طيلة عقود.
                    </p>
                    <p>
                      بالإضافة إلى ذلك، فإن مشاريع "مدينة الفاو للطاقة" تمثل قفزة نوعية في دمج مصافي النفط الكبرى ومعالجة الغاز المصاحب مع <strong>طريق التنمية الاستراتيجي</strong> جنوب العراق لربط سلاسل التوريد بالأسواق التركية والأوروبية.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p>
                      The Levant is undergoing a massive geo-economic realign, anchored by Iraq's sovereign reform efforts under Prime Minister <strong>Ali Al-Zaidy</strong> and robust support from US President <strong>Donald Trump</strong> to establish a <strong>$60 Billion Investment Corridor</strong>.
                    </p>
                    <blockquote className="border-l-4 border-emerald-500 pl-4 my-4 font-sans text-sm text-zinc-400">
                      "Our focus is the cultivation of deep, institutionalized strategic partners rather than transient service contractors, securing our sovereign energy future and defending our border command." <br />
                      <span className="font-bold text-zinc-200">— Prime Minister Ali Al-Zaidy</span>
                    </blockquote>
                    <p>
                      The supergiant <strong>Kirkuk</strong> field serves as the geographic hub of this pact. With <strong>ConocoPhillips</strong> stepping back into the Iraqi energy landscape after a decade-long hiatus, its 42% working stake introduces competitive pricing models that Barclays analysts project will secure high-yield incremental output.
                    </p>
                    <p>
                      Furthermore, the integration of <strong>Al-Faw Energy City</strong> on the southern Fao Peninsula combines raw petrochemical refining with massive gas processing infrastructures linked directly to the strategic <strong>Development Road</strong> logistical corridor.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons inside report pane */}
              <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-1.5 select-none">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{isAr ? 'مرجع الوثيقة: #SPECIAL-DOCKET-IRAQ-2026' : 'DOCUMENT CLASSIFICATION: #SPECIAL-DOCKET-IRAQ-2026'}</span>
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleWhatsAppShare}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-white font-bold rounded-none px-4 py-2 cursor-pointer flex items-center justify-center gap-1.5 transition-all shadow-[2px_2px_0px_0px_rgba(16,185,129,1)]"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.013-5.112-2.86-6.961C16.628 1.936 14.15 1.921 11.515 1.921 6.08 1.921 1.657 6.341 1.653 11.78c-.001 1.637.43 3.235 1.252 4.636l-.993 3.633 3.735-.98l1.002.585zM17.65 14.537c-.31-.155-1.833-.905-2.115-1.008-.282-.103-.487-.155-.69.155-.203.31-.787.98-.966 1.185-.179.205-.359.231-.669.076-.31-.155-1.309-.483-2.495-1.541-.923-.824-1.546-1.841-1.727-2.15-.18-.31-.02-.477.136-.631.14-.139.31-.36.465-.54.155-.18.205-.31.31-.515.103-.205.052-.385-.026-.54-.078-.155-.69-1.662-.945-2.277-.249-.599-.501-.518-.69-.527-.179-.008-.385-.01-.591-.01-.205 0-.54.077-.822.385-.282.31-1.077 1.053-1.077 2.569 0 1.516 1.103 2.981 1.257 3.187.154.205 2.17 3.313 5.257 4.646.734.317 1.307.506 1.753.648.739.235 1.412.202 1.944.123.593-.088 1.833-.749 2.09-1.474.256-.725.256-1.346.179-1.474-.076-.128-.282-.205-.591-.361z" />
                    </svg>
                    <span>{isAr ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}</span>
                  </button>

                  <button
                    onClick={() => {
                      const textToShare = isAr 
                        ? `الورّاق للإعلام الاستقصائي: تقرير كشف الاتفاق الاستثماري العراقي بـ 60 مليار دولار.` 
                        : `Al-Warraq Exclusive: Complete analysis of the $60B Iraq-US Investment Corridor.`;
                      const url = window.location.href;
                      navigator.clipboard.writeText(`${textToShare} ${url}`);
                      alert(isAr ? 'تم نسخ الرابط ومستخلص الدراسة للحافظة' : 'Classified brief and link copied to clipboard');
                    }}
                    className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white hover:text-emerald-400 rounded-none px-4 py-2 cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Share2 size={12} />
                    <span>{isAr ? 'نسخ الرابط' : 'Copy Link'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Hand: Context Dossier Column (4/12) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Regional Context panel */}
              <div className="border-2 border-amber-600 bg-amber-950/20 p-4 space-y-4">
                <div className="flex items-center gap-1.5 text-amber-500 font-mono text-xxs font-black uppercase">
                  <AlertTriangle size={14} className="animate-pulse" />
                  <span>{isAr ? 'المخاطر الجيوسياسية والأمنية' : 'REGIONAL THREAT ASSESSMENT'}</span>
                </div>

                <h4 className="text-sm font-black text-white font-sans uppercase">
                  {isAr ? 'مضيق هرمز والتبعية الإيرانية' : 'Hormuz Bottleneck & Power Grids'}
                </h4>

                <p className="text-xs text-zinc-300 leading-relaxed font-serif text-justify">
                  {isAr ? (
                    'يمثل مضيق هرمز عصب التصدير الأساسي والهش للعراق، لذا فإن مشروع خط أنابيب المتوسط البري بقيادة شيفرون عبر سوريا يمثل صمام الأمان الوحيد لتفادي الشلل التصدري التام. في الوقت ذاته، فإن إيقاف حرق الغاز المصاحب مع إكسون موبيل سيحرم إيران من ورقة ضغط حيوية تستخدم للتحكم بـ ٣٠٪ من تيار الكهرباء الوطني.'
                  ) : (
                    'The Strait of Hormuz remains Iraq\'s fragile logistical artery, rendering Chevron\'s overland Mediterranean bypass pipeline through Syria a crucial buffer for national crude. Simultaneously, capturing flared gas via ExxonMobil eliminates foreign leverage over 30% of domestic power grids.'
                  )}
                </p>

                <div className="bg-amber-950 border border-amber-900/60 p-2.5 flex items-center justify-between text-xxs font-mono text-amber-400 uppercase select-none">
                  <span>{isAr ? 'مستويات الخطر: مرتفعة' : 'THREAT LEVEL: CRITICAL'}</span>
                  <span className="w-2 h-2 bg-red-600 rounded-none animate-ping" />
                </div>
              </div>

              {/* Sovereignty Milestones Checklist */}
              <div className="border-2 border-zinc-800 bg-zinc-900/20 p-4 space-y-4">
                <span className="font-mono text-xxs font-black text-zinc-400 block uppercase border-b border-zinc-800 pb-2">
                  {isAr ? 'الأهداف السيادية لحكومة الزيدي' : 'GOVERNMENT SOVEREIGNTY MILESTONES'}
                </span>

                <ul className="space-y-3 font-sans text-xs">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">{isAr ? 'إنهاء التبعية الطاقوية' : 'Energy Independence'}</span>
                      <span className="text-zinc-400">{isAr ? 'وقف استيراد الغاز الإيراني والاعتماد الذاتي.' : 'Halt Iranian imports, fuel local generators organically.'}</span>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">{isAr ? 'تأميم ممرات التصدير' : 'Overland Mediterranean Outlets'}</span>
                      <span className="text-zinc-400">{isAr ? 'إرساء شراكة شيفرون لخط أنابيب بديل.' : 'Insulate crude shipments from Gulf maritime flare-ups.'}</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">{isAr ? 'نزع السلاح الفصائلي' : 'Paramilitary Demobilization'}</span>
                      <span className="text-zinc-400">{isAr ? 'مهلة حاسمة لجمع الأسلحة قبل نهاية سبتمبر.' : 'Definitive September 30 deadline for exclusive state arms.'}</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* WhatsApp Tactical Dispatches Channel Box */}
              <div className="border-2 border-emerald-600 bg-emerald-950/40 p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xxs font-black uppercase">
                  <svg className="w-4 h-4 fill-current text-emerald-400" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.013-5.112-2.86-6.961C16.628 1.936 14.15 1.921 11.515 1.921 6.08 1.921 1.657 6.341 1.653 11.78c-.001 1.637.43 3.235 1.252 4.636l-.993 3.633 3.735-.98l1.002.585zM17.65 14.537c-.31-.155-1.833-.905-2.115-1.008-.282-.103-.487-.155-.69.155-.203.31-.787.98-.966 1.185-.179.205-.359.231-.669.076-.31-.155-1.309-.483-2.495-1.541-.923-.824-1.546-1.841-1.727-2.15-.18-.31-.02-.477.136-.631.14-.139.31-.36.465-.54.155-.18.205-.31.31-.515.103-.205.052-.385-.026-.54-.078-.155-.69-1.662-.945-2.277-.249-.599-.501-.518-.69-.527-.179-.008-.385-.01-.591-.01-.205 0-.54.077-.822.385-.282.31-1.077 1.053-1.077 2.569 0 1.516 1.103 2.981 1.257 3.187.154.205 2.17 3.313 5.257 4.646.734.317 1.307.506 1.753.648.739.235 1.412.202 1.944.123.593-.088 1.833-.749 2.09-1.474.256-.725.256-1.346.179-1.474-.076-.128-.282-.205-.591-.361z" />
                  </svg>
                  <span>{isAr ? 'قناة التنبيهات العاجلة عبر واتساب' : 'WHATSAPP SOVEREIGN DISPATCHES'}</span>
                </div>
                <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                  {isAr 
                    ? 'احصل على البرقيات والتحليلات السيادية الاستثنائية بملف العراق والاستثمار الأمريكي فور صدورها مباشرة على واتساب.'
                    : 'Receive real-time sovereign dispatches and strategic updates on the Iraq-US corridor straight to your WhatsApp.'}
                </p>
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 px-3 rounded-none flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.013-5.112-2.86-6.961C16.628 1.936 14.15 1.921 11.515 1.921 6.08 1.921 1.657 6.341 1.653 11.78c-.001 1.637.43 3.235 1.252 4.636l-.993 3.633 3.735-.98l1.002.585zM17.65 14.537c-.31-.155-1.833-.905-2.115-1.008-.282-.103-.487-.155-.69.155-.203.31-.787.98-.966 1.185-.179.205-.359.231-.669.076-.31-.155-1.309-.483-2.495-1.541-.923-.824-1.546-1.841-1.727-2.15-.18-.31-.02-.477.136-.631.14-.139.31-.36.465-.54.155-.18.205-.31.31-.515.103-.205.052-.385-.026-.54-.078-.155-.69-1.662-.945-2.277-.249-.599-.501-.518-.69-.527-.179-.008-.385-.01-.591-.01-.205 0-.54.077-.822.385-.282.31-1.077 1.053-1.077 2.569 0 1.516 1.103 2.981 1.257 3.187.154.205 2.17 3.313 5.257 4.646.734.317 1.307.506 1.753.648.739.235 1.412.202 1.944.123.593-.088 1.833-.749 2.09-1.474.256-.725.256-1.346.179-1.474-.076-.128-.282-.205-.591-.361z" />
                  </svg>
                  <span>{isAr ? 'انضم لمجتمع الواتساب السيادي' : 'Join WhatsApp Dispatch Group'}</span>
                </button>
              </div>

            </div>

          </div>
        )}
          </>
        )}

      </div>
    </div>
  );
};
