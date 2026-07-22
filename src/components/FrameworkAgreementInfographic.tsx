import React, { useState } from 'react';
import { 
  FileText, 
  MapPin, 
  Calendar, 
  TrendingDown, 
  ShieldAlert, 
  Scale, 
  Compass, 
  Bookmark, 
  Globe, 
  Languages, 
  ChevronRight, 
  ChevronLeft,
  AlertTriangle,
  Flame,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Share2,
  Printer
} from 'lucide-react';

interface FrameworkAgreementInfographicProps {
  language: 'ar' | 'en';
}

export const FrameworkAgreementInfographic: React.FC<FrameworkAgreementInfographicProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'gains-losses' | 'bilingual-text' | 'secret-annex' | 'investigative-report'>('bilingual-text');
  const [selectedArticleIdx, setSelectedArticleIdx] = useState<number>(0);
  const [showFullTextSideBySide, setShowFullTextSideBySide] = useState<boolean>(false);

  // Helper function to share a story to WhatsApp
  const shareToWhatsApp = (title: string, desc: string) => {
    const appUrl = window.location.href;
    const text = `*الورّاق للإعلام الاستقصائي*\n\n*${title}*\n\n${desc}\n\n🔗 اقرأ التقرير الكامل عبر الرابط:\n${appUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Helper function to print/save a specific story as a formatted PDF
  const downloadAsPDF = (title: string, content: string, sectionName: string) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html lang="${isAr ? 'ar' : 'en'}" dir="${isAr ? 'rtl' : 'ltr'}">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Noto+Kufi+Arabic:wght@400;700;900&display=swap');
          body {
            font-family: ${isAr ? '"Noto Kufi Arabic"' : '"Inter"'}, sans-serif;
            color: #1c1917;
            background-color: #fff;
            margin: 40px;
            line-height: 1.6;
          }
          .header {
            border-bottom: 3px double #78350f;
            padding-bottom: 15px;
            margin-bottom: 30px;
            text-align: center;
          }
          .logo {
            font-size: 24px;
            font-weight: 900;
            color: #78350f;
            letter-spacing: 2px;
            margin-bottom: 5px;
          }
          .subtitle {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #6b7280;
            font-family: monospace;
          }
          .section-badge {
            display: inline-block;
            background-color: #fef3c7;
            color: #78350f;
            padding: 4px 10px;
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 15px;
          }
          h1 {
            font-size: 22px;
            font-weight: 900;
            color: #0c0a09;
            margin-top: 0;
            margin-bottom: 15px;
            line-height: 1.3;
          }
          .meta {
            font-size: 12px;
            color: #4b5563;
            margin-bottom: 25px;
            font-family: monospace;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 10px;
          }
          .content {
            font-size: 14px;
            color: #1c1917;
            white-space: pre-line;
            text-align: justify;
          }
          .footer {
            margin-top: 50px;
            border-top: 1px solid #e5e7eb;
            padding-top: 15px;
            font-size: 10px;
            color: #9ca3af;
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
          <div class="logo">${isAr ? 'الورّاق للإعلام الاستقصائي' : 'AL-WARRAQ INVESTIGATIVE NETWORK'}</div>
          <div class="subtitle">${isAr ? 'وثيقة مفرج عنها للجمهور العام — تموز ٢٠٢٦' : 'PUBLIC RELEASE DOCUMENT // JULY 2026'}</div>
        </div>
        
        <div class="section-badge">${sectionName}</div>
        <h1>${title}</h1>
        <div class="meta">
          ${isAr ? 'المصدر: أرشيف دبلوماتيك الورّاق' : 'Source: Al-Warraq Diplomatic Archives'} | 
          ${isAr ? 'تاريخ التوليد:' : 'Generated:'} 2026-07-06 | 
          ${isAr ? 'الحالة: مرخص للنشر الفردي' : 'Status: Licensed for Individual Share'}
        </div>
        
        <div class="content">${content}</div>
        
        <div class="footer">
          © 2026 Al-Warraq Media. All rights reserved. This document is part of the Washington Trilateral Agreement (June 2026) Analysis Series.
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

  // Helper component/element to render the action bar for a story
  const renderStoryActions = (title: string, desc: string, sectionName: string, ctaLabel?: string, ctaAction?: () => void, isDark = false) => {
    return (
      <div className={`mt-4 pt-3 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-150'} flex flex-wrap items-center justify-between gap-2`}>
        {/* CTA Button */}
        <button
          onClick={ctaAction || (() => {
            alert(isAr 
              ? `🚀 تم تفعيل الإجراء الميداني الخاص بـ "${title}" ونقل المعطيات للاستوديو.`
              : `🚀 Special field protocol for "${title}" has been activated. Intel forwarded to studio.`
            );
          })}
          className={`px-2.5 py-1 text-[10px] font-bold font-sans cursor-pointer rounded-none transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
            isDark 
              ? 'bg-red-950 hover:bg-red-900 text-red-200 border border-red-900' 
              : 'bg-amber-850 hover:bg-amber-950 text-white'
          }`}
        >
          <span>{ctaLabel || (isAr ? 'رصد استراتيجي' : 'Strategic Action')}</span>
          <ExternalLink size={10} />
        </button>

        {/* Share & PDF buttons */}
        <div className="flex items-center gap-1.5">
          {/* WhatsApp share */}
          <button
            onClick={() => shareToWhatsApp(title, desc)}
            className="px-2 py-1 text-[10px] font-bold font-mono cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white rounded-none transition-all flex items-center gap-1 hover:scale-105 active:scale-95"
            title={isAr ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}
          >
            <Share2 size={10} />
            <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
          </button>

          {/* PDF Download */}
          <button
            onClick={() => downloadAsPDF(title, desc, sectionName)}
            className={`px-2 py-1 text-[10px] font-bold font-mono cursor-pointer rounded-none transition-all flex items-center gap-1 hover:scale-105 active:scale-95 ${
              isDark 
                ? 'bg-zinc-900 hover:bg-zinc-855 text-white border border-zinc-700' 
                : 'bg-zinc-800 hover:bg-zinc-950 text-white'
            }`}
            title={isAr ? 'تنزيل بصيغة PDF' : 'Download as PDF'}
          >
            <Printer size={10} />
            <span>{isAr ? 'ملف PDF' : 'PDF'}</span>
          </button>
        </div>
      </div>
    );
  };

  // 1. Timeline Data
  const timelineEvents = [
    {
      dateAr: 'أكتوبر 2020',
      dateEn: 'October 2020',
      titleAr: 'إطلاق "اتفاق الإطار" المبدئي',
      titleEn: 'Initial "Framework Agreement" Launch',
      descAr: 'أعلن لبنان رعاية الأمم المتحدة ووساطة أمريكية لبدء مفاوضات غير مباشرة لترسيم الحدود البحرية بعد نزاع استمر لسنوات.',
      descEn: 'Lebanon announced UN-sponsored and US-mediated talks to launch indirect maritime demarcation negotiations after years of dispute.',
      icon: Compass,
      statusAr: 'مفاوضات شاقة غير مباشرة',
      statusEn: 'Indirect arduous negotiations'
    },
    {
      dateAr: 'أكتوبر 2022',
      dateEn: 'October 2022',
      titleAr: 'توقيع اتفاق الترسيم البحري',
      titleEn: 'Signing of Demarcation Treaty',
      descAr: 'اعتماد الخط 23 رسمياً، مما منح لبنان 860 كم² إضافية تشمل حقل قانا بالكامل، مقابل سيطرة إسرائيل التامة على حقل كاريش للإنتاج.',
      descEn: 'Official adoption of Line 23, granting Lebanon 860 km² including full potential of Qana field, while Israel retained full control of Karish field.',
      icon: Scale,
      statusAr: 'تسوية اقتصادية وأمنية بحتة',
      statusEn: 'Purely economic & security settlement'
    },
    {
      dateAr: 'أواخر 2023',
      dateEn: 'Late 2023',
      titleAr: 'خيبة الحفر الأول في البلوك 9',
      titleEn: 'First Drilling Disappointment in Block 9',
      descAr: 'أظهرت نتائج الحفر الاستكشافي لائتلاف شركات توتال وإيني وقطر للطاقة عدم وجود كميات غاز تجارية في بئر قانا، مسبباً صدمة قوية.',
      descEn: 'Exploratory drilling by Total, Eni, and QatarEnergy revealed no commercial gas volumes in Qana block 1, striking a heavy blow to quick relief hopes.',
      icon: TrendingDown,
      statusAr: 'واقع جيولوجي مخيب للآمال',
      statusEn: 'Disappointing geological findings'
    },
    {
      dateAr: 'أكتوبر 2023 - 2025',
      dateEn: 'Oct 2023 - 2025',
      titleAr: 'انفجار الجبهة الجنوبية والتعطيل',
      titleEn: 'Frontline Flare-up & Total Suspension',
      descAr: 'اندلاع المواجهات العسكرية المفتوحة في جنوب لبنان، مما شل حركة الاستثمار والتنقيب وجعل الشركات الكبرى تحجم عن أي استكشافات إضافية.',
      descEn: 'Outbreak of intensive military conflict in Southern Lebanon, halting all investments and making energy conglomerates freeze exploration.',
      icon: Flame,
      statusAr: 'واقع جيوسياسي وأمني متفجر',
      statusEn: 'Explosive security & geopolitical landscape'
    },
    {
      dateAr: '26 يونيو 2026',
      dateEn: 'June 26, 2026',
      titleAr: 'توقيع "اتفاق الإطار الثلاثي" الجديد في واشنطن',
      titleEn: 'Signing of New Trilateral Framework in D.C.',
      descAr: 'توقيع اتفاق إطار ثلاثي جديد بين لبنان والولايات المتحدة وإسرائيل في واشنطن برعاية الرئيس دونالد ترامب لإنهاء حالة الحرب وبسط سيادة الدولة اللبنانية.',
      descEn: 'Trilateral Framework signed in Washington D.C. under US President Donald Trump, aiming to conclude the state of war and assert state authority.',
      icon: Calendar,
      statusAr: 'تحول سياسي واستراتيجي جوهري',
      statusEn: 'Fundamental political & strategic pivot'
    }
  ];

  // 2. Sovereign Gains vs Economic Realities Data
  const gainsAndRealities = {
    gains: [
      {
        titleAr: 'تثبيت السيادة والحقوق القانونية',
        titleEn: 'Sovereignty & Legal Framework',
        descAr: 'تمكن لبنان من انتزاع اعتراف بحدوده البحرية الخالصة ووثق حقوقه وفقاً للقوانين الدولية دون التنازل عن شبر سيادي واحد.',
        descEn: 'Lebanon successfully secured recognition of its EEZ boundaries under international law without compromising on any sovereign territory.'
      },
      {
        titleAr: 'إزالة الفيتو وعقبات الاستثمار القانوني',
        titleEn: 'Clearing Legal Hurdles for Oil Giants',
        descAr: 'أنهى الاتفاق النزاع القانوني مما مهد الطريق لعودة الائتلافات الدولية الكبرى (توتال، إيني، قطر للطاقة) لتصميم وتنفيذ عمليات التنقيب في البلوكات الجنوبية.',
        descEn: 'Resolved boundary disputes that had prevented energy conglomerates from initiating exploration and drilling campaigns in Southern Blocks.'
      },
      {
        titleAr: 'تثبيت قواعد الاشتباك وتجنب التصعيد الفوري',
        titleEn: 'Deterring Maritime Warfare',
        descAr: 'توقيع الترسيم أبعد شبح المواجهة العسكرية البحرية المباشرة التي كادت تعصف بالمنطقة عند إرسال سفينة التنقيب الإسرائيلية لحقل كاريش.',
        descEn: 'The agreement temporarily averted direct naval confrontation when Israel initially positioned an extraction vessel in the disputed Karish field.'
      }
    ],
    realities: [
      {
        titleAr: 'خلو البئر الأول من كميات تجارية',
        titleEn: 'Geological Setback in Qana Block 9',
        descAr: 'النتائج العملية للحفر الاستكشافي أثبتت جفاف بئر قانا رقم 1 من الغاز التجاري، مما أطاح بوعود الدولة بجعل الغاز طوق إنقاذ سريع ومباشر.',
        descEn: 'Practical exploratory reports in late 2023 indicated no commercial gas reserves in Block 9, crushing immediate economic salvage hopes.'
      },
      {
        titleAr: 'هشاشة الاستقرار الأمني والعسكري',
        titleEn: 'Unstable & Explosive Security Reality',
        descAr: 'برهنت الأحداث على أن الاستقرار الحدودي كان هشاً للغاية، ومع اشتعال الجبهات، بات من المستحيل على الشركات الدولية استثمار مليار دولار في مياه مضطربة.',
        descEn: 'Escalations showed that offshore tranquility was short-lived. Amid active conflicts, international players refuse to sink billions into risky waters.'
      },
      {
        titleAr: 'العامل الزمني الطويل للاستفادة',
        titleEn: 'Long-term Gestation Period',
        descAr: 'حتى لو عثرت الشركات على غاز في آبار أخرى، فإن مرحلة البنية التحتية والاستخراج والتصدير تستغرق من 5 إلى 7 سنوات، وهو مدى زمني لا يسعف السيولة الحالية.',
        descEn: 'Even upon potential discovery, constructing pipelines, testing flow, and entering markets takes 5-7 years—failing to alleviate the acute cash crunch.'
      }
    ]
  };

  // 3. 14 Articles of the June 26, 2026 Framework Agreement
  const articlesData = [
    {
      num: 1,
      titleAr: 'حق الوجود بسلام وإنهاء حالة الحرب',
      titleEn: 'Right to Exist & Concluding State of War',
      ar: 'تؤكد إسرائيل ولبنان حق كل دولة في الوجود بسلام، ورغبتهما المتبادلة في العيش بأمن كدولتين ذاتي سيادة ومتجاورتين. وتعلن إسرائيل ولبنان بموجب هذا الإطار نيتهما إنهاء النزاع بينهما بشكل نهائي، ومعالجة أسبابه الجذرية، وبالتالي إنهاء أي حالة حرب قائمة بينهما بصورة رسمية. ويستند هذا الإطار، الذي تم التوصل إليه بعد عدة جولات من المفاوضات المباشرة بين الطرفين، إلى اتفاقات وتفاهمات سابقة ناجحة، ويعبر عن تصميم على إحراز تقدم لا رجعة فيه نحو الحل الشامل لجميع القضايا العالقة بين البلدين. ويؤكد البلدان عزمهما على حل هذه القضايا كدولتين ذات سيادة من خلال مفاوضات ثنائية مباشرة، بوساطة ودعم من الولايات المتحدة.',
      en: 'Israel and Lebanon affirm the right of each state to exist in peace, and their mutual desire to live in security as neighboring sovereign states. Israel and Lebanon hereby declare their intent to conclusively end the conflict, address its underlying causes, and to therewith formally conclude any state of war between them. This Framework, reached after multiple rounds of direct negotiations between the parties, builds upon previous successful agreements and understandings, and expresses a determination to make irreversible progress towards the comprehensive resolution of all issues between the two countries. Both countries affirm their intention to resolve these issues as sovereign states through direct bilateral negotiations, with the mediation and support of the United States.'
    },
    {
      num: 2,
      titleAr: 'نزع السلاح وإعادة الانتشار التدريجي',
      titleEn: 'LAF Authority & IDF Redeployment',
      ar: 'تلتزم حكومة إسرائيل وحكومة لبنان بعملية متبادلة ومتدرجة، وفق شروط واضحة، تستعيد بموجبها القوات المسلحة اللبنانية سلطة الدولة الفعلية على كامل الأراضي اللبنانية، وذلك بعد التحقق من نزع سلاح الجماعات المسلحة غير التابعة للدولة وتفكيك بنيتها التحتية المرتبطة بها، مما يتيح للقوات الإسرائيلية إعادة انتشارها تدريجياً خارج الأراضي اللبنانية. وسيتم تفصيل مكونات هذه العملية في ملحق أمني يُعد بدعم كامل من الولايات المتحدة ويكمل هذا الإطار. وسيحدد الإطار التدابير المطلوبة، والترتيبات الأمنية، وآليات التحقق اللازمة لدفع هذه العملية قدماً. ومن شأن التنفيذ الناجح لهذا الإطار أن يمهد الطريق لعلاقة مستقرة وسلمية بين البلدين، وأن يتيح للقوات الإسرائيلية إعادة انتشارها خارج الأراضي اللبنانية.',
      en: 'The Government of Israel and the Government of Lebanon commit to a reciprocal, sequenced process, with clear conditions, whereby the LAF will restore effective sovereign authority over all Lebanese territory, pending the verified disarmament of non-state armed groups and dismantlement of associated infrastructure, enabling the Israel Defense Forces (IDF) to progressively redeploy out of the Lebanese territory. The components of this process will be detailed in a Security Annex, developed with the full support of the United States, that will complement this Framework. The Framework will set out the requisite measures, security arrangements, and verification mechanisms to advance this process. Successful implementation of this Framework will pave the way for a stable and peaceful relationship between the two countries and will enable the IDF to redeploy out of the Lebanese territory.'
    },
    {
      num: 3,
      titleAr: 'المناطق التجريبية والعودة الآمنة للمدنيين',
      titleEn: 'Security Pilot Zones & Civil Reconstruction',
      ar: 'وعملاً بالملحق الأمني، وفي إطار الجهود الأوسع لتحقيق احتكار الدولة اللبنانية للسلاح والسيطرة السيادية على أراضيها، ستتولى القوات المسلحة اللبنانية تدريجياً المسؤولية الأمنية الكاملة والفعالة في مناطق تجريبية، والتي ستشكل آلية لإعادة الانتشار المرحلية والمتحقق منها للقوات الإسرائيلية وانتشار القوات المسلحة اللبنانية. وقد تم الاتفاق بين الجيش الإسرائيلي والجيش اللبناني على منطقتين أوليتين، كما سيتم الاتفاق على المناطق التجريبية المستقبلية بالتراضي المتبادل. وبعد التأكد من نجاح نزع سلاح الجماعات المسلحة غير التابعة للدولة وتفكيك بنيتها التحتية في هذه المناطق، ستتولى القوات المسلحة اللبنانية المسؤولية الأمنية الكاملة والفعالة فيها، وستبدأ جهود إعادة الإعمار المدعومة دولياً، وسيتمكن المدنيون اللبنانيون من العودة بأمان إلى هذه المناطق تحت السيطرة الحصرية لسلطات الدولة اللبنانية. وتعتزم الولايات المتحدة العمل بشكل وثيق مع البلدين للتحقق من هذه العملية ودعمها.',
      en: 'Pursuant to the Security Annex, and as part of the broader effort toward the Lebanese state’s monopoly of arms and sovereign territorial control, the LAF will gradually assume full and effective security responsibility in pilot zones, which will serve as the mechanism for phased and verified redeployments of the IDF and the deployments of the LAF. Two initial zones have been agreed to by the IDF and the LAF, and future pilot zones will also be agreed upon by mutual consent. Upon the confirmation of successful disarmament of non-state armed groups and dismantlement of their infrastructure in these zones, the LAF will assume full and effective security responsibility in these zones, internationally supported reconstruction efforts will begin, and Lebanese civilians will be able to safely return to these areas under the exclusive control of Lebanese state authorities. The United States intends to work closely with both countries to verify and support this process.'
    },
    {
      num: 4,
      titleAr: 'احتكار الدولة اللبنانية لاستخدام القوة',
      titleEn: 'State Monopoly on Force & Disarmament',
      ar: 'تؤكد حكومة لبنان مجدداً التزامها الحازم وغير القابل للتراجع باستعادة وممارسة السيادة الكاملة على جميع أراضيها. وستعمل حكومة لبنان على إعادة بناء احتكار الدولة لاستخدام القوة، وتحقيق نزع السلاح الكامل والمتحقق منه لجميع الجماعات المسلحة غير التابعة للدولة، وضمان عدم اضطلاع هذه الجماعات بأي دور عسكري أو أمني وعدم امتلاكها أي قدرات مسلحة في أي مكان داخل لبنان. وبموجب هذا الإطار، تطلب حكومة لبنان دعم الشركاء الدوليين، ولا سيما العرب، تحت قيادة الولايات المتحدة لتحقيق هذه النتيجة.',
      en: 'The Government of Lebanon reaffirms its resolute and irreversible commitment to restoring and exercising full sovereignty over all its territory. The Government of Lebanon will rebuild the State\'s monopoly on the use of force, achieve the complete and verified disarmament of all non-state armed groups, and ensure that such groups will have no military or security role and no armed capabilities anywhere in Lebanon. The Government of Lebanon herewith requests the support of international and particularly Arab partners, under the leadership of the United States, to achieve this outcome.'
    },
    {
      num: 5,
      titleAr: 'تفكيك تهديد الجماعات المسلحة وغير الإقليمية',
      titleEn: 'Dismantling Non-State Threats',
      ar: 'تشدد حكومة إسرائيل على أن عملياتها العسكرية في لبنان هي حصراً نتيجة للهجمات والتهديدات والنوايا العدائية الصادرة عن الجماعات المسلحة غير التابعة للدولة، ولا سيما "حزب الله". وتؤكد حكومة إسرائيل أن إنهاء هذا التهديد، من خلال نزع سلاح هذه الجماعات وتفكيكها في جميع أنحاء لبنان، إلى جانب ترتيبات أمنية إضافية يتم الاتفاق عليها بين البلدين، سيُلغي أي حاجة مستقبلية لعمل عسكري أو وجود عسكري للقوات الإسرائيلية في لبنان. واستناداً إلى ما تقدم، تعلن حكومة إسرائيل أنها لا تملك أي أطماع إقليمية في لبنان.',
      en: 'The Government of Israel stresses that its military actions in Lebanon are solely a consequence of the attacks, threat posed by, and hostile intent of non-state armed groups, particularly Hizballah. The Government of Israel underscores that the termination of this threat, through the disarmament and dismantlement of such groups in all of Lebanon and additional security arrangements to be agreed upon between the two countries, will eliminate any future need for IDF military action or presence in Lebanon. Pursuant to the above, the Government of Israel declares that it has no territorial ambitions in Lebanon.'
    },
    {
      num: 6,
      titleAr: 'حصرية سلطة الدولة لقرار الحرب والسلم',
      titleEn: 'Exclusive Sovereignty on War & Peace',
      ar: 'تؤكد حكومة لبنان، وفقاً لميثاق الأمم المتحدة وممارسةً لسلطتها السيادية، أن قواتها الأمنية تتحمل المسؤولية الحصرية عن أمن لبنان والدفاع عنه، وأن حكومة لبنان تمتلك السلطة السيادية الحصرية لاتخاذ قرار الحرب والسلم. وترفض حكومة لبنان ادعاءات أي دولة أو جهة غير حكومية استخدام القوة نيابة عنها دون تفويض صريح منها، وتكرر أن أي ادعاء من أي دولة أو جهة غير حكومية بممارسة دور عسكري أو أمني يُعد غير قانوني وفقاً لقرارات الحكومة اللبنانية ومخالفاً للمصالح الوطنية اللبنانية.',
      en: 'The Government of Lebanon, in accordance with the Charter of the United Nations and in exercise of its sovereign authority, reaffirms that its security forces hold exclusive responsibility for Lebanon’s security and defense and that the Government of Lebanon holds the exclusive sovereign authority to make war and peace. The Government of Lebanon rejects the claims of any state or non-state actor to use force on its behalf without its explicit authorization, and reiterates that any claim by any state or non-state actor to exercise a military or security role is illegal per the decisions of the Lebanese Government and contrary to Lebanese national interests.'
    },
    {
      num: 7,
      titleAr: 'حق الدفاع عن النفس ومجموعة التنسيق العسكرية',
      titleEn: 'Inherent Right of Self-Defense & Coordination',
      ar: 'تؤكد حكومة لبنان وحكومة إسرائيل أن لا شيء في هذا الإطار يمنعهما من ممارسة حقهما الأصيل في الدفاع عن النفس، كما هو معترف به في ميثاق الأمم المتحدة ووفقاً للقانون الدولي المعمول به، مع التأكيد على أنه لا يجوز لأي طرف ثالث ممارسة هذا الحق نيابة عنهما. كما تلتزم الحكومتان بإنشاء مجموعة تنسيق عسكرية، بدعم ومشاركة الولايات المتحدة، لضمان التنفيذ الشامل لهذا الإطار.',
      en: 'The Government of Lebanon and the Government of Israel affirm that nothing in this Framework prevents them from exercising their inherent right to defend themselves, as recognized in the Charter of the United Nations and consistent with applicable international law, reaffirming that no third party may exercise that right on their behalf. Both governments commit to establishing a military coordination group, with U.S. support and participation, to ensure overall implementation of this Framework.'
    },
    {
      num: 8,
      titleAr: 'إعادة بناء لبنان والعودة الآمنة للسكان',
      titleEn: 'Rebuilding Lebanon & Secure Returns',
      ar: 'يؤكد البلدان أنهما يشتركان في هدف إقامة لبنان آمن ومعاد بناؤه، تحت السيادة الكاملة للدولة اللبنانية، بحيث لا تشكل أي جماعة مسلحة غير تابعة للدولة تهديداً لإسرائيل أو لبنان أو لمواطني أي من البلدين. كما يعترف البلدان بأن استعادة الأمن في جنوب لبنان من خلال انتشار القوات المسلحة اللبنانية هي ركيزة حيوية للسماح للمدنيين من كلا الجانبين بالعودة الآمنة والمستقرة إلى ديارهم وتنشيط الاقتصاد المحلي بدعم دولي.',
      en: 'The two countries affirm their shared goal of a secure and rebuilt Lebanon, under the full sovereignty of the Lebanese State, where no non-state armed group poses a threat to Israel, Lebanon, or the citizens of either country. They recognize that restoring security in southern Lebanon through the deployment of the LAF is vital to enabling the safe, permanent return of civilians to their homes and revitalizing the local economy with international assistance.'
    },
    {
      num: 9,
      titleAr: 'احترام سيادة الأراضي والحدود الدولية',
      titleEn: 'Sovereignty & International Borders',
      ar: 'يلتزم الطرفان باحترام السلامة الإقليمية والسيادة الوطنية والاستقلال السياسي لكل منهما، مع الاعتراف بأن الحدود الدولية الرسمية والنهائية بين البلدين هي الحدود المعتمدة والموثقة تاريخياً، ويلتزم الطرفان بالامتناع عن أي هجمات أو تهديدات باستخدام القوة عبر هذه الحدود المشتركة.',
      en: 'Both parties commit to respecting each other’s territorial integrity, national sovereignty, and political independence. They recognize the official and definitive international border between the two countries as the historically documented boundary, and agree to refrain from any hostile actions or threats of force across these shared borders.'
    },
    {
      num: 10,
      titleAr: 'منع التهريب والتدفق غير المشروع للأسلحة',
      titleEn: 'Border Control & Arms Smuggling Prevention',
      ar: 'تتعهد حكومة لبنان باتخاذ جميع التدابير اللازمة لمنع التهريب أو النقل أو التدفق غير المشروع للأسلحة أو المواد المرتبطة بها إلى لبنان أو عبر أراضيه، وضمان أن تكون جميع عمليات استيراد الأسلحة والمعدات العسكرية محصورة ومصرحة حصرياً لصالح القوات المسلحة الرسمية اللبنانية.',
      en: 'The Government of Lebanon pledges to take all necessary measures to prevent the illegal smuggling, transfer, or flow of weapons or military-related materiel into or through its territory, ensuring that all imports of weapons and military equipment are strictly authorized for and restricted to the official Lebanese state security forces.'
    },
    {
      num: 11,
      titleAr: 'أمن الطيران والمجال الجوي والبحري',
      titleEn: 'Aviation Security & Airspace Regulations',
      ar: 'تلتزم الحكومتان بوضع قواعد تضمن سلامة وأمن الطيران والمجال الجوي والمياه الإقليمية، وبما يحترم السيادة المتبادلة ويمنع أي أعمال عدائية أو استطلاعية غير مصرح بها تخرق المجال الجوي للطرف الآخر، مع العمل المشترك على منع أي نشاط مسلح بحري أو جوي يهدد أمن البلدين.',
      en: 'The two governments commit to establishing standards that guarantee aviation security, airspace integrity, and territorial water safety. These rules will respect mutual sovereignty and prevent unauthorized hostile flights or incursions, while jointly checking any naval or aerial military activities that threaten bilateral security.'
    },
    {
      num: 12,
      titleAr: 'صياغة اتفاقية السلام والأمن الشاملة والكاملة',
      titleEn: 'Formulating Comprehensive Peace & Security Agreement',
      ar: 'تقر الحكومتان بأنه مع توقيع هذا الإطار، سيعمل البلدان على إنشاء مجموعات عمل لصياغة اتفاقية السلام والأمن الشاملة والكاملة. وعلاوة على ذلك، ولتحقيق أهداف هذا الإطار، ستنشئ الحكومتان على الفور مسارات متكاملة للمشاركة المباشرة المستمرة، بتيسير من الولايات المتحدة. وتلتزم الحكومتان بالمضي بحسن نية حتى تحقيق سلام كامل ودائم، يجلب الأمن والاستقرار والازدهار لشعبي إسرائيل ولبنان.',
      en: 'Upon the signing of this Framework, the two countries will work to establish working groups to draft the full comprehensive peace and security agreement. Moreover, to achieve the goals of the Framework, the two governments will immediately establish complementary tracks of ongoing direct engagement, facilitated by the United States. The two governments commit to proceeding in good faith until a full and lasting peace is achieved, bringing security, stability, and prosperity to the people of Israel and Lebanon.'
    },
    {
      num: 13,
      titleAr: 'إبداء حسن النية والإفراج عن المحتجزين',
      titleEn: 'Good Faith Measures & Release of Detainees',
      ar: 'انسجاماً مع أهدافهما المشتركة الرامية إلى إقامة علاقات مستقرة وسلمية، تلتزم إسرائيل ولبنان باتخاذ تدابير بحسن نية تعكس نوايا إيجابية، بما في ذلك وقف جميع الأعمال العدائية أو السلبية في المحافل السياسية أو القانونية الدولية، والتعهد بالعمل على البحث عن الرفات وإعادتها، والإفراج عن المحتجزين.',
      en: 'In line with their shared goals to establish stable and peaceful relations, Israel and Lebanon commit to take good faith measures that demonstrate positive intent, including the cessation of all hostile or adverse actions in international political or legal fora, and pledge to work towards the search for and return of remains and the release of detainees.'
    },
    {
      num: 14,
      titleAr: 'تقدير الدور والوساطة الأمريكية',
      titleEn: 'Acknowledging US Mediation & Leadership',
      ar: 'تقر الحكومتان بالدور الذي تؤديه الولايات المتحدة في دعم جهولوها لإنهاء عقود من النزاع وإرساء استقرار دائم وسلام شامل بين البلدين، وتعربان عن تقديرهما العميق لرؤية الرئيس دونالد ج. ترامب وقيادته.',
      en: 'The two governments acknowledge the role of the United States in supporting their efforts to end decades of conflict and establish lasting stability and comprehensive peace between the two countries and express their deep appreciation for the vision and leadership of President Donald J. Trump.'
    }
  ];

  return (
    <div className="border-4 border-double border-amber-800 p-5 md:p-6 bg-[#fdfbf7] text-black relative my-8 shadow-[6px_6px_0px_0px_rgba(180,83,9,1)] font-['Cairo']" style={{ fontFamily: "'Cairo', sans-serif" }}>
      {/* Top Banner Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-700"></div>

      {/* Header Bar */}
      <div className="flex justify-between items-center pb-3 mb-5 border-b-2 border-amber-850">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-amber-800 rounded-none inline-block animate-pulse"></span>
          <span className="font-mono text-xs tracking-widest font-black uppercase text-amber-900">
            {isAr ? 'إنفوجرافيك استقصائي تفاعلي والاتفاق الكامل' : 'INTERACTIVE GEOPOLITICAL DOSSIER & FULL TEXT'}
          </span>
        </div>
        <div className="bg-amber-800 text-white text-[10px] font-mono px-2 py-0.5 font-bold tracking-widest">
          {isAr ? 'الحدث الوطني الرئيسي' : 'NATIONAL MAJOR HEADLINE'}
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="text-center md:text-right rtl:text-right ltr:text-left space-y-3 mb-8">
        <div className="flex items-center justify-center md:justify-start gap-1 text-amber-800 font-mono text-xs font-bold">
          <Languages size={14} />
          <span>{isAr ? 'وثيقة ثنائية اللغة: العربية والإنجليزية' : 'Bilingual Document: Arabic & English'}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
          {isAr ? 'واقع جيولوجي غير مبشر وجيوسياسي متفجر' : 'An Unpromising Geology & Explosive Geopolitics'}
        </h3>
        <p className="text-xs md:text-sm text-stone-600 max-w-2xl leading-relaxed">
          {isAr 
            ? 'يقدم هذا القسم تشريحاً تفاعلياً لاتفاق الإطار الثلاثي المبرم في واشنطن في ٢٦ حزيران ٢٠٢٦، متضمناً تحليلاً للأبعاد الاقتصادية واللوجستية والبنود الكاملة والملحق السري.'
            : 'This section provides an interactive, detailed breakdown of the Washington Trilateral Framework signed on June 26, 2026, comparing sovereign gains, physical realities, treaty articles, and the leaked annex.'}
        </p>
        {renderStoryActions(
          isAr ? 'واقع جيولوجي غير مبشر وجيوسياسي متفجر: تشريح اتفاق الإطار الثلاثي' : 'An Unpromising Geology & Explosive Geopolitics: Trilateral Framework Analysis',
          isAr ? 'تشريح تفاعلي لاتفاق الإطار الثلاثي المبرم في واشنطن، متضمناً تحليلاً للأبعاد الاقتصادية واللوجستية والبنود الكاملة والملحق السري.' : 'Interactive breakdown of the Washington Trilateral Framework signed on June 26, 2026.',
          isAr ? 'ملف خاص: اتفاق الإطار' : 'Special Dossier: Framework Agreement'
        )}
      </div>

      {/* Tabs Selector Bar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200 mb-6 pb-px overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('timeline')}
          className={`px-4 py-2 text-xs md:text-sm font-bold cursor-pointer transition-all border-b-2 ${
            activeSubTab === 'timeline'
              ? 'border-amber-800 text-amber-850 bg-amber-50/50'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          📅 {isAr ? 'الترتيب الزمني التاريخي للترسيم' : 'Chronology of Demarcation Steps'}
        </button>
        <button
          onClick={() => setActiveSubTab('gains-losses')}
          className={`px-4 py-2 text-xs md:text-sm font-bold cursor-pointer transition-all border-b-2 ${
            activeSubTab === 'gains-losses'
              ? 'border-amber-850 text-amber-850 bg-amber-50/50'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          ⚖️ {isAr ? 'ميزان الأثر: سيادة حبرية vs واقع معطل' : 'Impact Balance: Sovereign vs Material'}
        </button>
        <button
          onClick={() => setActiveSubTab('bilingual-text')}
          className={`px-4 py-2 text-sm md:text-base font-black cursor-pointer transition-all border-b-2 ${
            activeSubTab === 'bilingual-text'
              ? 'border-amber-850 text-amber-950 bg-amber-50'
              : 'border-transparent text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
          }`}
        >
          📜 {isAr ? 'تصفح بنود الاتفاق الـ ١٤ حرفياً' : 'Examine the 14 Treaty Clauses Literally'}
        </button>
        <button
          onClick={() => setActiveSubTab('secret-annex')}
          className={`px-4 py-2 text-xs md:text-sm font-bold cursor-pointer transition-all border-b-2 ${
            activeSubTab === 'secret-annex'
              ? 'border-red-600 text-red-600 bg-red-50/30'
              : 'border-transparent text-zinc-500 hover:text-red-600 hover:bg-red-50/10'
          }`}
        >
          🔥 {isAr ? 'الملحق الأمني السري المسرّب' : 'Leaked Secret Security Annex'}
        </button>
        <button
          onClick={() => setActiveSubTab('investigative-report')}
          className={`px-4 py-2 text-xs md:text-sm font-bold cursor-pointer transition-all border-b-2 ${
            activeSubTab === 'investigative-report'
              ? 'border-amber-700 text-amber-800 bg-amber-50/40'
              : 'border-transparent text-zinc-500 hover:text-amber-800 hover:bg-amber-50/10'
          }`}
        >
          📰 {isAr ? '«المناطق التجريبية» في مهب الشروط' : 'Investigation: "Pilot Zones" Standoff'}
        </button>
      </div>

      {/* Tab 1: Chronological Path */}
      {activeSubTab === 'timeline' && (
        <div className="space-y-6">
          <div className="relative border-r md:border-r-0 md:before:absolute md:before:inset-y-0 md:before:left-1/2 md:before:w-[2px] md:before:bg-zinc-200 pr-6 md:pr-0">
            {timelineEvents.map((event, idx) => {
              const IconComp = event.icon;
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-col md:flex-row items-stretch md:justify-between mb-8 md:mb-12 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Badge on center line */}
                  <div className="absolute right-[-31px] md:left-1/2 md:right-auto md:translate-x-[-50%] top-0 w-8 h-8 rounded-full border-2 border-amber-800 bg-white flex items-center justify-center text-amber-800 shadow-sm z-10">
                    <IconComp size={16} />
                  </div>

                  {/* Content Box */}
                  <div className="w-full md:w-[45%] border border-zinc-200 bg-white p-4 shadow-sm space-y-2 text-right rtl:text-right">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-850 bg-amber-100 px-2.5 py-0.5 rounded-none">
                        {isAr ? event.dateAr : event.dateEn}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400 font-bold">
                        PHASE 0{idx + 1}
                      </span>
                    </div>
                    <h4 className="text-base font-black text-zinc-900">
                      {isAr ? event.titleAr : event.titleEn}
                    </h4>
                    <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-sans">
                      {isAr ? event.descAr : event.descEn}
                    </p>
                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-bold text-zinc-500 font-mono">
                      <span>{isAr ? 'الوضعية:' : 'Status:'}</span>
                      <span className="text-amber-850">{isAr ? event.statusAr : event.statusEn}</span>
                    </div>
                    {renderStoryActions(
                      isAr ? event.titleAr : event.titleEn,
                      isAr ? `${event.descAr}\n\nتاريخ المرحلة: ${event.dateAr}\nالوضعية الراهنة: ${event.statusAr}` : `${event.descEn}\n\nPhase Date: ${event.dateEn}\nCurrent Status: ${event.statusEn}`,
                      isAr ? 'الترتيب الزمني التاريخي للترسيم' : 'Historical Demarcation Chronology'
                    )}
                  </div>

                  {/* Empty Spacer Column for Desktop balance */}
                  <div className="hidden md:block w-[45%]"></div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Balance of Impact */}
      {activeSubTab === 'gains-losses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Sovereign Gains Panel */}
          <div className="border-2 border-emerald-600 bg-emerald-50/20 p-5 space-y-4 shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]">
            <div className="flex items-center gap-2 border-b border-emerald-200 pb-3">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">✓</div>
              <div>
                <h4 className="text-lg font-black text-emerald-950 font-sans">
                  {isAr ? 'المكاسب السيادية والجيوسياسية' : 'Sovereign & Geopolitical Gains'}
                </h4>
                <p className="text-xxs text-emerald-700 font-mono uppercase tracking-wider font-bold">
                  {isAr ? 'الاستفادة المحققة نظرياً ودبلوماسياً' : 'Theoretical & Diplomatic Accomplishments'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {gainsAndRealities.gains.map((gain, idx) => (
                <div key={idx} className="bg-white/80 p-3.5 border border-emerald-100 rounded-none space-y-1">
                  <h5 className="font-sans font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-600 inline-block"></span>
                    {isAr ? gain.titleAr : gain.titleEn}
                  </h5>
                  <p className="text-xs text-zinc-750 font-sans leading-relaxed">
                    {isAr ? gain.descAr : gain.descEn}
                  </p>
                  {renderStoryActions(
                    isAr ? `مكسب سيادي: ${gain.titleAr}` : `Sovereign Gain: ${gain.titleEn}`,
                    isAr ? gain.descAr : gain.descEn,
                    isAr ? 'ميزان الأثر: المكاسب السيادية' : 'Impact Balance: Sovereign Gains'
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Economic Realities Panel */}
          <div className="border-2 border-red-600 bg-red-50/20 p-5 space-y-4 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">
            <div className="flex items-center gap-2 border-b border-red-200 pb-3">
              <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">✗</div>
              <div>
                <h4 className="text-lg font-black text-red-950 font-sans">
                  {isAr ? 'الواقع الاقتصادي والامني المخيب' : 'Economic & Security Bottlenecks'}
                </h4>
                <p className="text-xxs text-red-700 font-mono uppercase tracking-wider font-bold">
                  {isAr ? 'النتائج المخيبة على أرض الواقع والمادة' : 'Stagnant & Deferred Physical Realities'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {gainsAndRealities.realities.map((reality, idx) => (
                <div key={idx} className="bg-white/80 p-3.5 border border-red-100 rounded-none space-y-1">
                  <h5 className="font-sans font-bold text-sm text-red-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-red-600 inline-block"></span>
                    {isAr ? reality.titleAr : reality.titleEn}
                  </h5>
                  <p className="text-xs text-zinc-750 font-sans leading-relaxed">
                    {isAr ? reality.descAr : reality.descEn}
                  </p>
                  {renderStoryActions(
                    isAr ? `واقع معطل: ${reality.titleAr}` : `Physical Reality: ${reality.titleEn}`,
                    isAr ? reality.descAr : reality.descEn,
                    isAr ? 'ميزان الأثر: الواقع الاقتصادي والمنطقة' : 'Impact Balance: Economic & Security Bottlenecks'
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Bilingual Text Examiner */}
      {activeSubTab === 'bilingual-text' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 text-xs font-sans text-amber-950 leading-relaxed space-y-1">
            <p className="font-bold">
              ℹ️ {isAr 
                ? 'النص الحرفي لبنود اتفاق الإطار الثلاثي الذي وقعه كل من لبنان والولايات المتحدة وإسرائيل في واشنطن يوم الجمعة ٢٦ حزيران ٢٠٢٦ متاح بالكامل أدناه.'
                : 'The literal text of the trilateral Framework Agreement signed in Washington D.C. on Friday June 26, 2026 is fully indexed below.'}
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setShowFullTextSideBySide(!showFullTextSideBySide)}
                className="bg-amber-800 hover:bg-amber-950 text-white font-mono font-bold text-xxs px-3 py-1.5 cursor-pointer uppercase transition-all flex items-center gap-1.5"
              >
                <Languages size={12} />
                <span>
                  {showFullTextSideBySide 
                    ? (isAr ? 'عرض بالبنود المنفصلة' : 'Switch to Clause-by-Clause view') 
                    : (isAr ? 'عرض النص الكامل جنباً إلى جنب' : 'View Full Text side-by-side')}
                </span>
              </button>
            </div>
          </div>

          {!showFullTextSideBySide ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Clause Index */}
              <div className="lg:col-span-4 space-y-1.5 max-h-[480px] overflow-y-auto pr-2 border-l border-zinc-200">
                <p className="text-xxs font-mono font-black text-zinc-400 tracking-wider uppercase mb-1.5">
                  {isAr ? 'قائمة البنود الـ ١٤' : 'Index of the 14 Articles'}
                </p>
                {articlesData.map((article, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedArticleIdx(idx)}
                    className={`w-full text-right rtl:text-right ltr:text-left p-2 text-xs font-sans transition-all flex items-center gap-2 border cursor-pointer ${
                      selectedArticleIdx === idx
                        ? 'border-amber-800 bg-amber-800 text-white font-bold'
                        : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
                    }`}
                  >
                    <span className={`w-5 h-5 font-mono text-[10px] font-black shrink-0 flex items-center justify-center border ${
                      selectedArticleIdx === idx ? 'border-white text-white' : 'border-zinc-300 text-zinc-500'
                    }`}>
                      {article.num}
                    </span>
                    <span className="truncate flex-1">
                      {isAr ? article.titleAr : article.titleEn}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right Column: Active Clause Detail */}
              <div className="lg:col-span-8 border border-zinc-200 bg-white p-5 space-y-6">
                {/* Header detail */}
                <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
                  <span className="font-mono text-xs font-black text-amber-850 uppercase bg-amber-50 px-2.5 py-1">
                    {isAr ? `البند رقم ${articlesData[selectedArticleIdx].num}` : `Article No. ${articlesData[selectedArticleIdx].num}`}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 font-bold uppercase">
                    <Clock size={12} />
                    <span>26 June 2026</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Arabic block */}
                  <div className="space-y-2 text-right rtl:text-right" dir="rtl">
                    <h4 className="font-sans font-black text-sm text-zinc-950 border-r-2 border-amber-800 pr-2">
                      {articlesData[selectedArticleIdx].titleAr}
                    </h4>
                    <p className="text-xs md:text-sm text-zinc-800 font-sans leading-relaxed whitespace-pre-line bg-amber-50/20 p-3 border border-amber-100">
                      {articlesData[selectedArticleIdx].ar}
                    </p>
                  </div>

                  {/* English block */}
                  <div className="space-y-2 text-left ltr:text-left" dir="ltr">
                    <h4 className="font-sans font-black text-sm text-zinc-950 border-l-2 border-amber-850 pl-2">
                      {articlesData[selectedArticleIdx].titleEn}
                    </h4>
                    <p className="text-xs md:text-sm text-zinc-850 font-sans leading-relaxed whitespace-pre-line bg-zinc-50 p-3 border border-zinc-200">
                      {articlesData[selectedArticleIdx].en}
                    </p>
                  </div>
                </div>

                {/* Story Actions (CTA, WhatsApp, PDF/ODF) */}
                {renderStoryActions(
                  isAr 
                    ? `البند رقم ${articlesData[selectedArticleIdx].num}: ${articlesData[selectedArticleIdx].titleAr}`
                    : `Article No. ${articlesData[selectedArticleIdx].num}: ${articlesData[selectedArticleIdx].titleEn}`,
                  isAr 
                    ? `النص العربي للبند رقم ${articlesData[selectedArticleIdx].num}:\n${articlesData[selectedArticleIdx].ar}\n\nالنص الإنجليزي للبند:\n${articlesData[selectedArticleIdx].en}`
                    : `Arabic text of Article ${articlesData[selectedArticleIdx].num}:\n${articlesData[selectedArticleIdx].ar}\n\nEnglish text of Article:\n${articlesData[selectedArticleIdx].en}`,
                  isAr ? 'البنود الـ ١٤ لاتفاق واشنطن' : 'The 14 Articles of the Washington Agreement',
                  isAr ? 'تدقيق دستوري وسيادي' : 'Constitutional Review'
                )}

                {/* Navigation helpers */}
                <div className="flex justify-between items-center pt-2.5 border-t border-zinc-100">
                  <button
                    disabled={selectedArticleIdx === 0}
                    onClick={() => setSelectedArticleIdx(prev => prev - 1)}
                    className="flex items-center gap-1.5 font-mono text-xxs font-black text-zinc-500 hover:text-zinc-950 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed uppercase"
                  >
                    <ChevronLeft size={14} />
                    <span>{isAr ? 'البند السابق' : 'Prev Clause'}</span>
                  </button>
                  <span className="font-mono text-xxs text-zinc-400">
                    {selectedArticleIdx + 1} / 14
                  </span>
                  <button
                    disabled={selectedArticleIdx === articlesData.length - 1}
                    onClick={() => setSelectedArticleIdx(prev => prev + 1)}
                    className="flex items-center gap-1.5 font-mono text-xxs font-black text-zinc-500 hover:text-zinc-950 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed uppercase"
                  >
                    <span>{isAr ? 'البند التالي' : 'Next Clause'}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Full Text Side-by-Side */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto border border-zinc-200 bg-white p-4">
              {/* Full Arabic */}
              <div className="space-y-6 text-right rtl:text-right" dir="rtl">
                <div className="sticky top-0 bg-white pb-2 border-b border-zinc-200 z-10">
                  <h4 className="font-sans font-black text-base text-zinc-950">النص الحرفي العربي الكامل للاتفاق</h4>
                  <p className="text-xxs text-zinc-500">موقع في واشنطن ٢٦ حزيران ٢٠٢٦</p>
                </div>
                {articlesData.map((article, idx) => (
                  <div key={idx} className="space-y-2 border-b border-zinc-100 pb-4">
                    <h5 className="font-sans font-bold text-sm text-amber-850">
                      البند {article.num}: {article.titleAr}
                    </h5>
                    <p className="text-xs md:text-sm text-zinc-800 font-sans leading-relaxed">
                      {article.ar}
                    </p>
                    {renderStoryActions(
                      `البند ${article.num}: ${article.titleAr}`,
                      article.ar,
                      isAr ? 'البنود الـ ١٤ لاتفاق واشنطن' : 'The 14 Articles of the Washington Agreement',
                      isAr ? 'تدقيق دستوري وسيادي' : 'Constitutional Review'
                    )}
                  </div>
                ))}
              </div>

              {/* Full English */}
              <div className="space-y-6 text-left ltr:text-left border-l border-zinc-200 pl-4" dir="ltr">
                <div className="sticky top-0 bg-white pb-2 border-b border-zinc-200 z-10">
                  <h4 className="font-sans font-black text-base text-zinc-950">Full Literal English Text of the Framework</h4>
                  <p className="text-xxs text-zinc-500">Signed at Washington D.C., June 26, 2026</p>
                </div>
                {articlesData.map((article, idx) => (
                  <div key={idx} className="space-y-2 border-b border-zinc-100 pb-4">
                    <h5 className="font-sans font-bold text-sm text-amber-850">
                      Article {article.num}: {article.titleEn}
                    </h5>
                    <p className="text-xs md:text-sm text-zinc-800 font-sans leading-relaxed">
                      {article.en}
                    </p>
                    {renderStoryActions(
                      `Article ${article.num}: ${article.titleEn}`,
                      article.en,
                      isAr ? 'البنود الـ ١٤ لاتفاق واشنطن' : 'The 14 Articles of the Washington Agreement',
                      isAr ? 'تدقيق دستوري وسيادي' : 'Constitutional Review'
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Leaked Secret Security Annex */}
      {activeSubTab === 'secret-annex' && (
        <div className="space-y-6">
          {/* Alert Header */}
          <div className="bg-red-950 text-red-100 border-2 border-red-800 p-4 rounded-none space-y-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-red-500 animate-pulse" size={20} />
              <span className="font-mono text-xs font-black tracking-widest text-red-500 uppercase">
                {isAr ? 'وثيقة استخباراتية مسربة - سرية للغاية' : 'CLASSIFIED LEAKED INTELLIGENCE BRIEF // EXTREMELY SENSITIVE'}
              </span>
            </div>
            <h4 className="text-lg font-black font-sans leading-tight">
              {isAr ? 'أسرار الملحق الأمني الإسرائيلي مع قائد الجيش جوزيف عون' : 'What the Israeli-Joseph Aoun Secret Security Annex Reveals'}
            </h4>
            <p className="text-xs text-red-200 font-sans leading-relaxed">
              {isAr 
                ? 'إن الملحق الأمني السري بين إسرائيل ولبنان، في حال الكشف عنه، سيهز الأوساط السياسية لأنه يرفع الغطاء عن الهيكل الحقيقي المخفي وراء الاتفاق العلني. بينما يتحدث الاتفاق المعلن عن السيادة والانسحاب، يقلب الملحق المفاهيم رأساً على عقب ليعيد تصميم منظومة القرار الأمني اللبناني.'
                : 'The secret Israel-Lebanon security annex, if revealed as expected, will shake Lebanon because it exposes the real architecture hidden behind the public framework. The public agreement speaks of sovereignty, withdrawal and reconstruction. The annex, however, appears to turn these words upside down.'}
            </p>
            {renderStoryActions(
              isAr ? 'أسرار الملحق الأمني السري المسرب' : 'Secret Security Annex Leaks',
              isAr ? 'إن الملحق الأمني السري بين إسرائيل ولبنان يرفع الغطاء عن الهيكل الحقيقي المخفي وراء الاتفاق العلني.' : 'The secret security annex exposes the real architecture hidden behind the public framework.',
              isAr ? 'الملحق الأمني السري' : 'Leaked Security Annex',
              undefined, undefined, true
            )}
          </div>

          {/* Interactive Bento Breakdown of the 6 Key Structural Shocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Shock 1 */}
            <div className="border border-red-900 bg-[#140b0b] text-zinc-100 p-4 space-y-2 hover:border-red-600 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-wider bg-red-950 px-2 py-0.5 border border-red-900">
                  {isAr ? 'بند 1: مناطق تجريبية مشروطة' : 'Clause 1: Pilot Zones'}
                </span>
                <span className="text-zinc-600 font-mono text-xs">#01</span>
              </div>
              <h5 className="font-sans font-black text-sm text-white">
                {isAr ? 'انعدام الجدول الزمني والانسحاب كـ"مكافأة"' : 'No Timetable: Withdrawal as a Reward'}
              </h5>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {isAr 
                  ? 'إسرائيل وحدها تحدد نطاق "المناطق التجريبية". لا توجد أي جداول زمنية محددة أو انسحاب تلقائي. كل خطوة معلقة حتى ينفذ لبنان جميع المطالب المفروضة؛ ليصبح الانسحاب الإسرائيلي مجرد مكافأة تُمنح بناءً على الرضا الفردي لتل أبيب.'
                  : 'Israel alone determines the scope of the so-called "pilot zones." It accepts no fixed timetable and no automatic withdrawal. Israeli redeployment becomes a reward granted only when Israel decides that Lebanon has performed satisfactorily.'}
              </p>
              {renderStoryActions(
                isAr ? 'الملحق السري - صدمة 1: مناطق تجريبية مشروطة' : 'Leaked Annex Shock #1: Conditional Pilot Zones',
                isAr ? 'إسرائيل وحدها تحدد نطاق "المناطق التجريبية" بلا جدول زمني، والانسحاب يتحول لمكافأة مشروطة.' : 'Israel determines pilot zones with no fixed timetable; withdrawal becomes a conditional reward.',
                isAr ? 'الملحق السري' : 'Leaked Security Annex',
                undefined, undefined, true
              )}
            </div>

            {/* Shock 2 */}
            <div className="border border-red-900 bg-[#140b0b] text-zinc-100 p-4 space-y-2 hover:border-red-600 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-wider bg-red-950 px-2 py-0.5 border border-red-900">
                  {isAr ? 'بند 2: حرية الحركة والتدخل' : 'Clause 2: Movement Freedom'}
                </span>
                <span className="text-zinc-600 font-mono text-xs">#02</span>
              </div>
              <h5 className="font-sans font-black text-sm text-white">
                {isAr ? 'المنطقة الأمنية وصلاحية تدمير القرى' : 'Security Zones & IDF Access'}
              </h5>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {isAr 
                  ? 'إسرائيل تحدد المنطقة الأمنية وما يجب على الجيش اللبناني فعله داخلها. ويحتفظ جيش الاحتلال بحرية الحركة والتوغل العسكري الكامل في جميع أنحاء المنطقة تحت ذريعة مواجهة التهديدات، وهي صيغة تبرر الاستمرار في تدمير القرى بذريعة الأمن.'
                  : 'Israel defines the security zone, decide which areas are included, and what the Lebanese army must do inside them. The Israeli army keeps complete freedom of movement throughout the area under the pretext of confronting threat vectors.'}
              </p>
              {renderStoryActions(
                isAr ? 'الملحق السري - صدمة 2: حرية الحركة والتغيير' : 'Leaked Annex Shock #2: Freedom of Movement',
                isAr ? 'إسرائيل تحدد المنطقة الأمنية وتتذرع بالتهديدات للاحتفاظ بحرية الحركة وتدمير القرى.' : 'Israel defines the security zone and keeps full freedom of military movement.',
                isAr ? 'الملحق السري' : 'Leaked Security Annex',
                undefined, undefined, true
              )}
            </div>

            {/* Shock 3 */}
            <div className="border border-red-900 bg-[#140b0b] text-zinc-100 p-4 space-y-2 hover:border-red-600 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-wider bg-red-950 px-2 py-0.5 border border-red-900">
                  {isAr ? 'بند 3: إملاء الإحداثيات والخرائط' : 'Clause 3: Supervised Maps'}
                </span>
                <span className="text-zinc-600 font-mono text-xs">#03</span>
              </div>
              <h5 className="font-sans font-black text-sm text-white">
                {isAr ? 'قوائم أهداف إسرائيلية والتحقق الميداني' : 'Israeli Target Lists & Verification'}
              </h5>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {isAr 
                  ? 'يتلقى الجيش اللبناني خرائط وإحداثيات وقوائم أهداف أعدتها إسرائيل وتمررها الولايات المتحدة. ويشرف فريق عسكري أمريكي على الأرض على التنفيذ، بل وترافق قوة عسكرية إسرائيلية الفريق الأمريكي في تفتيش الأراضي اللبنانية للتحقق ميدانياً.'
                  : 'The Lebanese army is expected to act on maps, coordinates, and target lists prepared by Israel and transmitted by the US. A US military team on soil supervises the process, potentially accompanied by Israeli military inspectors.'}
              </p>
              {renderStoryActions(
                isAr ? 'الملحق السري - صدمة 3: إملاء الخرائط والأهداف' : 'Leaked Annex Shock #3: Target Lists & Maps',
                isAr ? 'يتلقى الجيش اللبناني إحداثيات وأهداف إسرائيلية عبر أمريكا مع دورية تفتيش ميدانية مشتركة.' : 'LAF receives Israeli target lists supervised on soil by US/Israeli inspectors.',
                isAr ? 'الملحق السري' : 'Leaked Security Annex',
                undefined, undefined, true
              )}
            </div>

            {/* Shock 4 */}
            <div className="border border-red-900 bg-[#140b0b] text-zinc-100 p-4 space-y-2 hover:border-red-600 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-wider bg-red-950 px-2 py-0.5 border border-red-900">
                  {isAr ? 'بند 4: الإعمار كأداة للضغط' : 'Clause 4: Aid Pressure'}
                </span>
                <span className="text-zinc-600 font-mono text-xs">#04</span>
              </div>
              <h5 className="font-sans font-black text-sm text-white">
                {isAr ? 'ربط عودة السكان المدنيين بالرضا الأمني' : 'No Civil Return Without Approval'}
              </h5>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {isAr 
                  ? 'عودة المدنيين اللبنانيين وقرار بدء إعادة الإعمار ليسا حقوقاً سيادية تلقائية، بل هما مشروطان بمصادقة إسرائيل ورضاها عن التطبيق الفعلي للمطالب عبر الآلية الأمريكية المشتركة. تحول الإعمار إلى أداة ضغط سياسي واقتصادي باهظ.'
                  : 'The return of Lebanese civilians and the beginning of reconstruction are made conditional on this process. Residents cannot return before Israel is satisfied with the implementation, turning reconstruction into a tool of political pressure.'}
              </p>
              {renderStoryActions(
                isAr ? 'الملحق السري - صدمة 4: الإعمار والعودة كأداة ضغط' : 'Leaked Annex Shock #4: Reconstruction as Leverage',
                isAr ? 'عودة السكان وإعادة الإعمار مشروطان بموافقة إسرائيلية مسبقة ورضاها الأمني.' : 'Civil return and reconstruction conditioned on explicit Israeli approval.',
                isAr ? 'الملحق السري' : 'Leaked Security Annex',
                undefined, undefined, true
              )}
            </div>

            {/* Shock 5 */}
            <div className="border border-red-900 bg-[#140b0b] text-zinc-100 p-4 space-y-2 hover:border-red-600 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-wider bg-red-950 px-2 py-0.5 border border-red-900">
                  {isAr ? 'بند 5: تطهير صفوف الجيش' : 'Clause 5: LAF Purging'}
                </span>
                <span className="text-zinc-600 font-mono text-xs">#05</span>
              </div>
              <h5 className="font-sans font-black text-sm text-white">
                {isAr ? 'غربلة واستبعاد الضباط بناء على ملفات استخباراتية' : 'Purging LAF Ranks Under Intel Lists'}
              </h5>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {isAr 
                  ? 'تقوم آلية بإشراف أمريكي بفحص الجيش اللبناني من الداخل لتحديد الضباط والجنود المتهمين إسرائيلياً بالوقوع تحت تأثير حزب الله. الدولة اللبنانية ملزمة قانوناً بفصل أي ضابط يرفض التعاون، مع إمكانية عزل قيادة الجيش بالكامل عند مخالفتها التوجيهات.'
                  : 'A US-supervised mechanism will examine the Lebanese army from within, using Israeli intelligence files to list and dismiss officers and soldiers suspected of Hezbollah links or refusal to comply with full-scale target audits.'}
              </p>
              {renderStoryActions(
                isAr ? 'الملحق السري - صدمة 5: غربلة وتطهير قيادة الجيش' : 'Leaked Annex Shock #5: LAF Vetting & Purging',
                isAr ? 'آلية أمريكية تفحص ضباط الجيش اللبناني لاستبعاد المغضوب عليهم إسرائيلياً.' : 'US mechanism audits LAF officers against Israeli intelligence blacklists.',
                isAr ? 'الملحق السري' : 'Leaked Security Annex',
                undefined, undefined, true
              )}
            </div>

            {/* Shock 6 */}
            <div className="border border-red-900 bg-[#140b0b] text-zinc-100 p-4 space-y-2 hover:border-red-600 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-wider bg-red-950 px-2 py-0.5 border border-red-900">
                  {isAr ? 'بند 6: الحصار والرقابة المالية' : 'Clause 6: Financial Control'}
                </span>
                <span className="text-zinc-600 font-mono text-xs">#06</span>
              </div>
              <h5 className="font-sans font-black text-sm text-white">
                {isAr ? 'صندوق رقابة أمريكي وفتح ملفات التحويلات' : 'Sovereign Financial Auditing Registry'}
              </h5>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {isAr 
                  ? 'يلتزم لبنان بملاحقة التحويلات المالية لحزب الله وحظر أموال الإعمار والتعافي إذا شابتها أي شكوك. يوصى الملحق بإنشاء صندوق مالي تحت سلطة لبنانية لكن بإشراف ورقابة أمريكية تامة لتدقيق تدفقات الأموال وضمان حرمان الشبكات الشيعية منها.'
                  : 'Lebanon is required to block money transfers and block funds justified as reconstruction support if suspected of benefiting Hezbollah. A financial fund under Lebanese authority but American supervision is established to audit flows.'}
              </p>
              {renderStoryActions(
                isAr ? 'الملحق السري - صدمة 6: رقابة مالية وصندوق أمريكي' : 'Leaked Annex Shock #6: Financial Control',
                isAr ? 'فرض صندوق تدقيق أمريكي لملاحقة التحويلات المالية وحظر أموال إعادة الإعمار المشبوهة.' : 'US financial auditing fund monitors all reconstruction and banking transfers.',
                isAr ? 'الملحق السري' : 'Leaked Security Annex',
                undefined, undefined, true
              )}
            </div>
          </div>

          {/* Bilingual Full Text Stage for the leaked article */}
          <div className="border-2 border-black bg-white p-5 space-y-6">
            <div className="border-b border-zinc-200 pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <h4 className="text-base font-black font-sans text-zinc-950">
                {isAr ? 'التقرير الاستقصائي الكامل للملحق الأمني المسرّب' : 'Complete Investigative Report of the Leaked Security Annex'}
              </h4>
              <span className="text-xxs font-mono text-zinc-500">
                {isAr ? 'مستند استراتيجي للورّاق' : 'AL-WARRAQ EXCLUSIVE ANALYSIS DOSSIER'}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Arabic translation */}
              <div className="space-y-4 text-right" dir="rtl">
                <h5 className="font-sans font-black text-lg text-[#b91c1c] border-r-4 border-red-700 pr-3">
                  مضمون الملحق الأمني السري بين إسرائيل ولبنان
                </h5>
                <div className="text-xs md:text-sm text-zinc-800 font-sans leading-relaxed space-y-4 whitespace-pre-line bg-red-50/10 p-4 border border-red-100">
                  {`إن الملحق الأمني السري بين إسرائيل ولبنان، في حال الكشف عنه كما هو متوقع، سيهز لبنان لأنه يرفع الغطاء عن الهيكل الحقيقي المخفي وراء الاتفاق العلني. الاتفاق المعلن يتحدث عن السيادة والانسحاب وإعادة الإعمار، لكن الملحق يقلب هذه المفاهيم رأساً على عقب.

إسرائيل وحدها هي من يحدد نطاق ما يسمى "المناطق التجريبية" (Pilot Zones)، وهي لا تقبل بجدول زمني محدد أو انسحاب تلقائي. كل شيء يبقى معلقاً حتى ينفذ لبنان جميع المطالب المفروضة عليه. بالتالي، فإن إعادة انتشار القوات الإسرائيلية ليس التزاماً قانونياً، بل مكافأة تُمنح فقط عندما تقرر إسرائيل أن الأداء اللبناني كان مرضياً.

كما تحدد إسرائيل المنطقة الأمنية؛ فتقرر ما هي المناطق المدرجة، وتلك المستبعدة، وما يجب على الجيش اللبناني فعله داخلها. لا يُمنح الجيش اللبناني مهمة سيادية، بل يُسلّم أجندة إسرائيلية عبر القناة الأمريكية. وفي غضون ذلك، يحتفظ جيش الاحتلال الإسرائيلي بحرية الحركة في جميع أنحاء المنطقة المحتلة تحت ذريعة مواجهة التهديدات - وهي صيغة يمكن أن تبرر الاستمرار في تدمير القرى والمنازل.

وداخل المناطق التجريبية، يُتوقع من الجيش اللبناني التصرف بناءً على خرائط وإحداثيات وقوائم أهداف تعدها إسرائيل وتمررها الولايات المتحدة. ويشرف فريق عسكري أمريكي على الأراضي اللبنانية مباشرة على هذه العملية، وتحتفظ إسرائيل بحق التحقق من النتائج. والأخطر من ذلك، قد ترافق قوة عسكرية إسرائيلية الفريق الأمريكي لتفتيش الأراضي اللبنانية. وفقط إذا أعلنت إسرائيل رضاها التام، فإنها تنظر في اتخاذ خطوة انسحاب.

كما أن عودة المدنيين اللبنانيين إلى قراهم وبدء إعادة الإعمار مشروطان بهذه العملية. لا يمكن للسكان العودة قبل أن تبدي إسرائيل، عبر الآلية الأمريكية، رضاها عن التنفيذ. لم يعد إعمار الجنوب حقاً، بل تحول إلى أداة ضغط سياسي واقتصادي.

ويذهب الملحق إلى أبعد من ذلك من خلال إخضاع الجيش اللبناني نفسه للرقابة الخارجية؛ حيث تقوم آلية بإشراف أمريكي بفحص الجيش من الداخل بناءً على ملفات استخباراتية إسرائيلية تدرج أسماء ضباط وجنود تتهمهم إسرائيل بالوقوع تحت تأثير حزب الله أو العمل بتوجيه منه. وستكون الدولة اللبنانية مطالبة بفصل أي شخص يرفض التعاون مع هذه الآلية، وهو ما قد يصل إلى إقالة قيادة الجيش نفسها إذا رفضت تنفيذ الاتفاق بالكامل.

أخيراً، يضع الملحق نظام رقابة مالية يستهدف شبكات تمويل حزب الله وداعميه والمنتسبين إليه. وتحت غطاء قانوني عربي ودولي، سيُطلب من لبنان ملاحقة التحويلات المالية لحزب الله عبر المؤسسات والأفراد، وفتح ملف التحويلات المالية بالكامل، وحظر الأموال المبررة كدعم لإعادة الإعمار إذا شابتها شكوك في أنها تفيد حزب الله. كما يُقترح إنشاء صندوق مالي تحت سلطة لبنانية وبإشراف أمريكي لتدقيق تدفقات الأموال وضمان عدم وصول أي أموال إلى أي جهة مرتبطة بحزب الله.

هذا ليس ملحقاً أمنياً، بل هو آلية لوضع السيادة اللبنانية تحت الحكم الإسرائيلي والإشراف الأمريكي. إسرائيل تقرر المناطق، والتهديدات، والتحقق، وتوقيت الانسحاب، وشروط العودة. والولايات المتحدة تشرف على الجيش والخرائط والنظام المالي والتنفيذ. بينما لا يملك لبنان سوى التنفيذ والامتثال.

إذا تم الإعلان عن هذه الوثيقة، فإن الزلزال في لبنان لن يأتِ من المفاجأة، بل من الإدراك التام بأن الإطار المعلن لم يكن سوى غطاء دبلوماسي، في حين دُفنت التنازلات الحقيقية والجوهرية في الملحق الأمني السري.`}
                </div>
                {renderStoryActions(
                  'التقرير الاستقصائي الكامل للملحق الأمني المسرّب (بالعربية)',
                  'مضمون الملحق الأمني السري بين إسرائيل ولبنان وآلياته التنفيذية والرقابية.',
                  'الملحق السري المسرّب'
                )}
              </div>

              {/* English original */}
              <div className="space-y-4 text-left" dir="ltr">
                <h5 className="font-sans font-black text-lg text-zinc-900 border-l-4 border-zinc-800 pl-3">
                  What the Israel-Lebanon Secret Security Annex Reveals
                </h5>
                <div className="text-xs md:text-sm text-zinc-700 font-sans leading-relaxed space-y-4 whitespace-pre-line bg-zinc-50 p-4 border border-zinc-200">
                  {`The secret Israel-Lebanon security annex, if revealed as expected, will shake Lebanon because it exposes the real architecture hidden behind the public framework. The public agreement speaks of sovereignty, withdrawal and reconstruction. The annex, however, appears to turn these words upside down.

Israel alone determines the scope of the so-called “pilot zones.” It accepts no fixed timetable and no automatic withdrawal. Everything remains open until Lebanon carries out all the demands imposed on it. Israeli redeployment is therefore not a legal obligation. It becomes a reward granted only when Israel decides that Lebanon has performed satisfactorily.

Israel also defines the security zone. It decides which areas are included, which are excluded, and what the Lebanese army must do inside them. The Lebanese army is not given a sovereign mission; it is handed an Israeli agenda through the American channel. Meanwhile, the Israeli occupation army keeps freedom of movement throughout the occupied area under the pretext of confronting threats — a formula that can justify the continued destruction of villages and homes.

Inside the pilot zones, the Lebanese army is expected to act on maps, coordinates, and target lists prepared by Israel and transmitted by the United States. A US military team on Lebanese soil supervises the process directly. Israel then retains the right to verify the results. Even more dangerously, an Israeli military force may accompany the American team to inspect Lebanese territory. Only if Israel declares itself satisfied does it consider taking a withdrawal step.

The return of Lebanese civilians to their villages, and the beginning of reconstruction are also made conditional on this process. Residents cannot return before Israel, through the American mechanism, is satisfied with the implementation. Reconstruction is no longer a right. It becomes a tool of pressure.

The annex goes further by opening the Lebanese army itself to external scrutiny. A US-supervised mechanism is to examine the army from within, based on Israeli intelligence files listing officers and soldiers accused by Israel of being under Hezbollah’s influence or acting under its direction. The Lebanese state would be required to dismiss anyone who refuses to cooperate with this mechanism, potentially reaching the removal of the army command itself if it refuses to implement the agreement fully.

Finally, the annex creates a financial control system targeting Hezbollah’s networks, supporters and alleged affiliates. Under an Arab and international legal cover, Lebanon would be required to pursue money transfers to Hezbollah through institutions and individuals, open the entire financial-transfers file, and block funds justified as reconstruction support if they are suspected of benefiting Hezbollah. A financial fund under Lebanese authority but American supervision is also proposed, to audit money flows and ensure that no funds reach any entity connected to Hezbollah.

This is not a security annex. It is a mechanism for placing Lebanese sovereignty under Israeli judgment and American supervision. Israel decides the zones, the threats, the verification, the timing of withdrawal and the conditions for return. The United States supervises the army, the maps, the financial system and the implementation. Lebanon is left to execute.

If this document is made public, the earthquake in Lebanon will not come from surprise. It will come from recognition: the public framework was only the diplomatic cover. The real concessions were buried in the secret security annex.`}
                </div>
                {renderStoryActions(
                  'Full Investigative Report on Secret Security Annex (English)',
                  'Full analysis revealing what the Israel-Lebanon secret security annex exposes.',
                  'Leaked Security Annex'
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Investigative Special Report */}
      {activeSubTab === 'investigative-report' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Card */}
          <div className="bg-amber-950 text-white p-6 border-l-4 border-amber-500 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-bold">
              <span>{isAr ? 'الحدث الوطني الرئيسي // تقرير استقصائي خاص' : 'NATIONAL MAJOR HEADLINE // SPECIAL INVESTIGATIVE REPORT'}</span>
              <span>•</span>
              <span>{isAr ? 'وثيقة ثنائية اللغة' : 'BILINGUAL DOCUMENT'}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black font-sans leading-tight text-white">
              {isAr 
                ? '«المناطق التجريبية» في مهب الشروط المتبادلة: هل يشهد الجنوب انسحاباً إسرائيلياً هذا الأسبوع أم نكسة مبكرة لـ«اتفاق واشنطن»؟' 
                : '"Pilot Zones" in the Grip of Mutual Conditions: Will the South Witness an Israeli Withdrawal This Week, or an Early Setback for the "Washington Agreement"?'}
            </h3>
            <div className="text-sm font-mono text-amber-300 font-medium">
              {isAr ? 'تقرير استقصائي خاص — بيروت (تموز ٢٠٢٦)' : 'Special Investigative Report — Beirut (July 2026)'}
            </div>
            {renderStoryActions(
              isAr ? '«المناطق التجريبية» في مهب الشروط المتبادلة: تقرير استقصائي' : 'Special Investigation: "Pilot Zones" in the Grip of Mutual Conditions',
              isAr ? 'هل يشهد الجنوب انسحاباً إسرائيلياً هذا الأسبوع أم نكسة مبكرة لـ«اتفاق واشنطن»؟' : 'Will the South witness an Israeli withdrawal this week or an early setback?',
              isAr ? 'تقرير استقصائي خاص' : 'Special Investigative Report',
              undefined, undefined, true
            )}
          </div>

          {/* Side-by-Side Dual Column View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Arabic Column */}
            <div className="space-y-6 text-right" dir="rtl">
              <div className="bg-amber-50/50 p-5 border border-amber-100 font-sans text-sm text-zinc-800 leading-relaxed space-y-4">
                <p className="font-bold text-zinc-950 text-base leading-relaxed">
                  بعد مرور أيام قليلة على توقيع "الاتفاق الإطاري الثلاثي" في واشنطن (26 حزيران 2026) بين لبنان وإسرائيل برعاية أمريكية، يترقب الشارع اللبناني والأوساط العسكرية ما إذا كان هذا الأسبوع سيحمل أولى علامات الترجمة الميدانية للاتفاق عبر انسحاب القوات الإسرائيلية من نقاط محددة. إلا أن المؤشرات الميدانية والتسريبات الدبلوماسية المرافقة لاجتماعات "آلية التنسيق" تكشف عن عقبات حَرِجة قد تحوّل "الاختبار الأول" إلى مواجهة سياسية وعسكرية معقدة.
                </p>

                <div className="border-t-2 border-amber-800/20 pt-4 space-y-3">
                  <h4 className="text-base font-black font-sans text-amber-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-700"></span>
                    خلفية المشهد: معادلة "الأمن مقابل الانسحاب"
                  </h4>
                  <p>
                    تأسس اتفاق 26 حزيران الإطاري على بند جوهري يربط الانسحاب التدريجي لجيش الاحتلال الإسرائيلي من الأراضي التي توغل فيها خلال العمليات الأخيرة، ببسط الجيش اللبناني سيادته الكاملة وتفكيك البنية التحتية العسكرية للمجموعات المسلحة غير النظامية.
                  </p>
                  <p>
                    وفقاً للملحق الأمني السري للاتفاق، جرى التوافق على إطلاق ما يُعرف بـ <strong>"المناطق التجريبية" (Pilot Zones)</strong> كآلية اختبار أولى لتقييم جدية الترتيبات الأمنية قبل الانتقال إلى مراحل الانسحاب الشامل نحو الحدود الدولية.
                  </p>
                  <p className="bg-red-50 p-3 border-r-4 border-red-600 text-red-950 text-xs font-sans">
                    <strong>العقبة الراهنة:</strong> أعلنت هيئة البث الإسرائيلية الرسمية أن تل أبيب قررت تأجيل البدء في إخلاء هذه القرى هذا الأسبوع، مشترطةً التوصل أولاً إلى آلية رقابة مشتركة صارمة (تشمل غرفة عمليات افتراضية بإشراف أمريكي) تضمن خلو هذه المناطق مسبقاً من أي وجود مسلح، في حين يرفض الجيش اللبناني أي تنسيق عسكري مباشر مع تل أبيب ويشترش وقفاً كاملاً وشاملاً للغارات الجوية لبدء انتشاره.
                  </p>
                  {renderStoryActions(
                    'خلفية المشهد: معادلة "الأمن مقابل الانسحاب"',
                    'ربط الانسحاب التدريجي لجيش الاحتلال الإسرائيلي ببسط الجيش اللبناني سيادته والتراجع عن الإخلاء واشترط الآليات الثلاثية.',
                    'التقرير الاستقصائي - خلفية'
                  )}
                </div>

                <div className="border-t-2 border-amber-800/20 pt-4 space-y-4">
                  <h4 className="text-base font-black font-sans text-amber-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-700"></span>
                    جغرافية "الاختبار": النقاط المستهدفة بالانسحاب ومواقعها الحاكمة
                  </h4>
                  <p>
                    حددت المباحثات العسكرية الأولية منطقتين أساسيتين لبدء المرحلة التجريبية، تقعان خارج نطاق ما يسمى "الخط الأصفر" الذي تحاول إسرائيل تكريسه كحزام أمني مؤقت:
                  </p>

                  {/* Zone 1 Card */}
                  <div className="bg-white p-4 border border-zinc-200 shadow-xs space-y-2">
                    <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                      <span className="font-sans font-black text-sm text-amber-900">١. زوطر الغربية (قضاء النبطية)</span>
                      <span className="bg-amber-100 text-amber-900 font-mono text-[9px] px-2 py-0.5 font-bold">شمال الليطاني</span>
                    </div>
                    <p className="text-xs">
                      <strong>الموقع الجغرافي والاستراتيجي:</strong> تقع البلدة شمال نهر الليطاني، وتتميز بموقع حاكم يشرف مباشرة على المجرى الشمالي للنهر وعلى "وادي الحجير" الاستراتيجي.
                    </p>
                    <p className="text-xs">
                      <strong>الأهمية العسكرية:</strong> تصنف التقارير الاستخبارية الإسرائيلية زوطر الغربية كواحدة من أهم خطوط الإمداد اللوجستي والعملياتي تاريخياً نحو عمق القطاع الأوسط. وتتواجد في هذه البلدة حالياً وحدات ومدرعات إسرائيلية يتعين عليها الانسحاب وإخلاء مواقعها بموجب الترتيبات المقترحة.
                    </p>
                    {renderStoryActions(
                      'المنطقة التجريبية الأولى: زوطر الغربية (شمال الليطاني)',
                      'زوطر الغربية تشرف على وادي الحجير والمجرى الشمالي لليطاني وتعد خط إمداد استراتيجي يتوجب إخلاؤه.',
                      'جغرافية الاختبار الميداني'
                    )}
                  </div>

                  {/* Zone 2 Card */}
                  <div className="bg-white p-4 border border-zinc-200 shadow-xs space-y-2">
                    <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                      <span className="font-sans font-black text-sm text-amber-900">٢. فرون (قضاء بنت جبيل)</span>
                      <span className="bg-amber-100 text-amber-900 font-mono text-[9px] px-2 py-0.5 font-bold">جنوب الليطاني</span>
                    </div>
                    <p className="text-xs">
                      <strong>الموقع الجغرافي والاستراتيجي:</strong> تقع بلدة فرون جنوب نهر الليطاني، وتتمتع بتموضع جغرافي يشرف على محاور قتالية ونقاط تّماس متعددة بين القطاعين الأوسط والغربي.
                    </p>
                    <p className="text-xs">
                      <strong>الأهمية العسكرية:</strong> تخلو فرون حالياً من أي وجود عسكري إسرائيلي مباشر على الأرض، وهو ما يفسر سبب اختيارها من قِبل تل أبيب؛ إذ ترغب في تحويلها إلى "مختبر ميداني مكشوف" لمراقبة مدى قدرة وصلاحية وحدات الجيش اللبناني في منع أي مظاهر مسلحة وحظر وجود عناصر حزب الله فيها بشكل مسبق وفوري.
                    </p>
                    {renderStoryActions(
                      'المنطقة التجريبية الثانية: فرون (جنوب الليطاني)',
                      'بلدة فرون تشرف على محاور قتالية بين القطاعين الأوسط والغربي وتم اختيارها كمختبر ميداني لمراقبة انتشار الجيش.',
                      'جغرافية الاختبار الميداني'
                    )}
                  </div>
                </div>

                <div className="border-t-2 border-amber-800/20 pt-4 space-y-3">
                  <h4 className="text-base font-black font-sans text-amber-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-700"></span>
                    سيناريوهات الأسبوع الحالي: مراوغة أم مأزق تطبيقي؟
                  </h4>
                  <p>
                    التحقيقات الميدانية تشير إلى أن فرع المعطيات السياسية ينقسم إلى اتجاهين يعرقلان حدوث الانسحاب الفعلي خلال الأيام القليلة القادمة:
                  </p>
                  <p className="text-xs">
                    <strong>الشروط الإسرائيلية المسبقة:</strong> جولة رئيس الوزراء الإسرائيلي بنيامين نتنياهو الأخيرة في المنطقة الحدودية حملت رسائل حاسمة بأن تل أبيب "لن تنسحب دون التحقق الملموس من نزع السلاح". هذا الربط يحوّل الانسحاب من خطوة بناء ثقة إلى أداة ضغط مسبقة.
                  </p>
                  <p className="text-xs">
                    <strong>الانقسام الداخلي اللبناني:</strong> يواجه الاتفاق معارضة شرسة من حزب الله وحلفائه، حيث وصفه نواب الحزب بأنه "صك استسلام" وتجاوز للخطوط الحمراء، بالتزامن مع إشارات إيرانية تفيد بأن طهران ترفض إبرام تسوية نهائية تفصل مسار لبنان عن المفاوضات الإقليمية الأوسع مع واشنطن في جنيف.
                  </p>
                  {renderStoryActions(
                    'سيناريوهات الأسبوع الحالي: الشروط الإسرائيلية والموقف الداخلي',
                    'انقسام سياسي وشروط إسرائيلية مسبقة تحوّل الانسحاب إلى أداة ضغط وتعرقل التطبيق الميداني.',
                    'التقرير الاستقصائي - سيناريوهات'
                  )}
                </div>

                <div className="border-t-4 border-amber-800 pt-4 bg-amber-50 p-4 border border-amber-200 space-y-2">
                  <h4 className="text-base font-black font-sans text-amber-950">الخلاصة الاستقصائية:</h4>
                  <p className="text-xs font-sans text-zinc-900 font-medium">
                    عملياً، يقع "اتفاق واشنطن" هذا الأسبوع في المنطقة الرمادية؛ فالخرائط جاهزة والنقاط محددة بدقة (زوطر وفرون)، لكن قرار الانسحاب الإسرائيلي بات رهينة صراع الإرادات حول "من يبدأ أولاً": انتشار الجيش اللبناني وتفكيك البنية التحتية المسلحة، أم وقف العمليات الحربية الإسرائيلية والانسحاب العسكري الشامل. وبناءً على المعطيات الحالية، فإن التراجع الإسرائيلي عن التنفيذ الفوري يرجّح بقاء التعبئة الميدانية على حالها طيلة الأيام المقبلة بانتظار بلورة آلية الرقابة الثلاثية.
                  </p>
                  {renderStoryActions(
                    'الخلاصة الاستقصائية: اتفاق واشنطن في المنطقة الرمادية',
                    'الخرائط جاهزة والنقاط محددة في زوطر وفرون لكن قرار الانسحاب رهينة صراع الإرادات من يبدأ أولاً.',
                    'التقرير الاستقصائي - خلاصة'
                  )}
                </div>
              </div>
            </div>

            {/* English Column */}
            <div className="space-y-6 text-left" dir="ltr">
              <div className="bg-zinc-50 p-5 border border-zinc-200 font-sans text-sm text-zinc-800 leading-relaxed space-y-4">
                <p className="font-bold text-zinc-950 text-base leading-relaxed">
                  A few days after the signing of the trilateral "Framework Agreement" in Washington (June 26, 2026) between Lebanon and Israel under US mediation, the Lebanese street and military circles are closely watching whether this week will carry the first signs of practical translation of the agreement through the withdrawal of Israeli forces from specific points. However, field indicators and diplomatic leaks accompanying the meetings of the "coordination mechanism" reveal critical obstacles that may turn the "first test" into a complex political and military confrontation.
                </p>

                <div className="border-t-2 border-zinc-200 pt-4 space-y-3">
                  <h4 className="text-base font-black font-sans text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-zinc-700"></span>
                    Background: The "Security for Withdrawal" Equation
                  </h4>
                  <p>
                    The June 26 framework agreement was established on a fundamental clause linking the gradual withdrawal of the Israeli occupation army from the lands it encroached upon during recent operations, to the Lebanese Armed Forces (LAF) asserting full sovereign authority and disarming non-state armed groups.
                  </p>
                  <p>
                    According to the secret security annex of the agreement, it was agreed to launch what is known as <strong>"Pilot Zones"</strong> as a first testing mechanism to evaluate the seriousness of security arrangements before moving to the phases of full-scale withdrawal towards international borders.
                  </p>
                  <p className="bg-red-50/50 p-3 border-l-4 border-red-600 text-red-950 text-xs font-sans">
                    <strong>The Current Obstacle:</strong> The official Israeli Broadcasting Corporation announced that Tel Aviv decided to postpone the start of evacuating these villages this week, conditioning it on first reaching a strict joint monitoring mechanism (including a virtual operations room supervised by the US) that ensures these areas are pre-cleared of any armed presence. Meanwhile, the Lebanese Army rejects any direct military coordination with Tel Aviv and conditions a complete cessation of air raids to begin its deployment.
                  </p>
                  {renderStoryActions(
                    'Background: Security for Withdrawal Equation',
                    'Linking Israeli withdrawal to LAF deployment and disarmament, as Tel Aviv conditions evacuation on US supervision.',
                    'Investigation Background'
                  )}
                </div>

                <div className="border-t-2 border-zinc-200 pt-4 space-y-4">
                  <h4 className="text-base font-black font-sans text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-zinc-700"></span>
                    Test Geography: Targeted Withdrawal Points & Strategic Coordinates
                  </h4>
                  <p>
                    Initial military talks identified two primary areas to launch the pilot phase, located outside the scope of the so-called "Yellow Line" that Israel is trying to establish as a temporary security belt:
                  </p>

                  {/* Zone 1 Card */}
                  <div className="bg-white p-4 border border-zinc-200 shadow-xs space-y-2">
                    <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                      <span className="font-sans font-black text-sm text-zinc-900">1. Zoutar al-Gharbiyyeh (Nabatiyeh District)</span>
                      <span className="bg-zinc-200 text-zinc-800 font-mono text-[9px] px-2 py-0.5 font-bold">North of Litani</span>
                    </div>
                    <p className="text-xs">
                      <strong>Geographic & Strategic Location:</strong> The town is located north of the Litani River, commanding a panoramic view directly overlooking the northern course of the river and the strategic "Wadi al-Hujair".
                    </p>
                    <p className="text-xs">
                      <strong>Military Significance:</strong> Israeli intelligence reports classify Zoutar al-Gharbiyyeh as historically one of the most important logistical and operational supply lines towards the depth of the central sector. Currently, Israeli units and armor are located in this town and are slated to withdraw under the proposed arrangements.
                    </p>
                    {renderStoryActions(
                      'Pilot Zone 1: Zoutar al-Gharbiyyeh (North Litani)',
                      'Zoutar al-Gharbiyyeh overlooks Wadi al-Hujair and serves as a key logistical supply route slated for evacuation.',
                      'Field Test Geography'
                    )}
                  </div>

                  {/* Zone 2 Card */}
                  <div className="bg-white p-4 border border-zinc-200 shadow-xs space-y-2">
                    <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                      <span className="font-sans font-black text-sm text-zinc-900">2. Froun (Bint Jbeil District)</span>
                      <span className="bg-zinc-200 text-zinc-800 font-mono text-[9px] px-2 py-0.5 font-bold">South of Litani</span>
                    </div>
                    <p className="text-xs">
                      <strong>Geographic & Strategic Location:</strong> Located south of the Litani River, enjoying a geographic elevation that oversees multiple combat axes and contact lines between the central and western sectors.
                    </p>
                    <p className="text-xs">
                      <strong>Military Significance:</strong> Froun is currently free of any direct Israeli military presence on the ground, which explains its selection by Tel Aviv. They wish to turn it into an "exposed field laboratory" to monitor the ability of the Lebanese Army to prevent any armed manifestations and block Hezbollah elements proactively and immediately.
                    </p>
                    {renderStoryActions(
                      'Pilot Zone 2: Froun (South Litani)',
                      'Froun overlooks central-western combat axes, chosen as a test lab to monitor LAF deployment capabilities.',
                      'Field Test Geography'
                    )}
                  </div>
                </div>

                <div className="border-t-2 border-zinc-200 pt-4 space-y-3">
                  <h4 className="text-base font-black font-sans text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-zinc-700"></span>
                    Current Week Scenarios: Tactical Maneuver or Implementation Deadlock?
                  </h4>
                  <p>
                    Field intelligence indicates that the political spectrum is split into two obstructing paths delaying the actual physical withdrawal in the coming days:
                  </p>
                  <p className="text-xs">
                    <strong>Preemptive Israeli Conditions:</strong> Prime Minister Benjamin Netanyahu's recent tour in the border region carried decisive messages that Tel Aviv "will not withdraw without tangible verification of disarmament." This linkage converts withdrawal from a confidence-building step into a coercive leverage tool.
                  </p>
                  <p className="text-xs">
                    <strong>Internal Lebanese Fracture:</strong> The agreement faces fierce opposition from Hezbollah and its allies, whose lawmakers described it as an "act of surrender" violating red lines, synchronized with Iranian indications that Tehran rejects any final settlement that decouples Lebanon from broader regional talks with Washington in Geneva.
                  </p>
                  {renderStoryActions(
                    'Current Week Scenarios: Israeli Demands vs Lebanese Politics',
                    'Internal political divide and Israeli preconditions delay physical withdrawal in coming days.',
                    'Investigation Scenarios'
                  )}
                </div>

                <div className="border-t-4 border-zinc-800 pt-4 bg-zinc-100 p-4 border border-zinc-200 space-y-2">
                  <h4 className="text-base font-black font-sans text-zinc-950">Investigative Summary:</h4>
                  <p className="text-xs font-sans text-zinc-900 font-medium">
                    Practically, the "Washington Agreement" is suspended in a gray zone this week; the maps are drawn and coordinates (Zoutar and Froun) are highly precise, but the Israeli withdrawal remains hostage to a battle of wills over "who begins first": the LAF's deployment and disarmament of armed structures, or the complete cessation of Israeli military operations and full-scale withdrawal. Based on current parameters, Tel Aviv's immediate implementation delays suggest that military mobilization is likely to persist in the coming days pending the final formulation of the trilateral monitoring body.
                  </p>
                  {renderStoryActions(
                    'Investigative Summary: Washington Agreement in Gray Zone',
                    'Maps and coordinates are ready for Zoutar & Froun, but withdrawal is held hostage to a battle of wills.',
                    'Investigation Summary'
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
