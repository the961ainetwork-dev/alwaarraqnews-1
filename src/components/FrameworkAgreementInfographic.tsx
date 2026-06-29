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
  ExternalLink
} from 'lucide-react';

interface FrameworkAgreementInfographicProps {
  language: 'ar' | 'en';
}

export const FrameworkAgreementInfographic: React.FC<FrameworkAgreementInfographicProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'gains-losses' | 'bilingual-text'>('timeline');
  const [selectedArticleIdx, setSelectedArticleIdx] = useState<number>(0);
  const [showFullTextSideBySide, setShowFullTextSideBySide] = useState<boolean>(false);

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
      ar: 'وعملاً بالملحق الأمني، وفي إطار الجهود الأوسع لتحقيق احتكار الدولة اللبنانية للسلاح والسيطرة السيادية على أراضيها، ستتولى القوات المسلحة اللبنانية تدريجياً المسؤولية الأمنية الكاملة والفعالة في مناطق تجريبية، والتي ستشكل آلية لإعادة الانتشار المرحلية والمتحقق منها للقوات الإسرائيلية وانتشار القوات المسلحة اللبنانية. وقد تم الاتفاق بين الجيش الإسرائيلي والجيش اللبناني على منطقتين أوليتين، كما سيتم الاتفاق على المناطق التجريبية المستقبلية بالتراضي المتبادل. وبعد التأكد من نجاح نزع سلاح الجماعات المسلحة غير التابعة للدولة وتفكيك بنيتها التحتية في هذه المناطق، ستتولى القوات المسلحة اللبنانية المسؤولية الأمنية الكاملة والفعالة فيها، وستبدأ جهود إعادة الإعمار المدعومة دولياً، وسيتمكن المدنيون اللبنانيون من العودة بأمان إلى هذه المناطق تحت السيطرة الحصرية لسلطات الدولة اللبنانية. وتعتزم الولايات المتحدة العمل بشكل وثيق مع البلدين للتحقق من هذه العملية ودعمها.',
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
      ar: 'يؤكد البلدان أنهما يشتركان في هدف إقامة لبنان آمن ومعاد بناؤه، تحت السيادة الكاملة للدولة اللبنانية، بحيث لا تشكل أي جماعة مسلحة غير تابعة للدولة تهديداً لإسرائيل أو لبنان أو لمواطني أي من البلدين. كما يعترف البلدان بأن استعادة الأمن في جنوب لبنان من خلال انتشار القوات المسلحة اللبنانية، والعودة الآمنة للسكان المدنيين، وضمان أمن المجتمعات الإسرائيلية الشمالية، تشكل عناصر أساسية لتحقيق الاستقرار والسلام على المدى الطويل.',
      en: 'The two countries affirm that they share the objective of a secure, rebuilt Lebanon, under full Lebanese state sovereignty, in which no non-state armed group poses a threat to Israel, Lebanon, or citizens of either country. Furthermore, the two countries recognize that the restoration of security in South Lebanon through the deployment of the LAF, the safe return of its civilian population, and the security of Israel’s northern communities, are essential to long-term stability and peace.'
    },
    {
      num: 9,
      titleAr: 'برنامج الأداء وتفعيل قدرات الجيش اللبناني',
      titleEn: 'Performance-Based LAF Capacity Building',
      ar: 'تلتزم حكومة لبنان ببرنامج صارم قائم على الأداء لتمكين القوات المسلحة اللبنانية من فرض السيطرة العسكرية والأمنية الكاملة داخل لبنان وفقاً للترتيبات الأمنية المتفق عليها ضمن إطار المفاوضات، وتنفيذ نزع سلاح جميع الجماعات المسلحة غير التابعة للدولة، وممارسة سلطة فعالة في جميع أنحاء لبنان. وترحب حكومة لبنان باستعداد الولايات المتحدة لدعم هذه الجهود، مع الإقرار بأن أي مساعدات أميركية جديدة ستكون مشروطة بشكل صارم بتحقيق مراحل قابلة للتحقق، والشفافية الكاملة، والنتائج الملموسة، والإشراف المستمر. وستُمكّن هذه الجهود من إعادة بسط السيادة اللبنانية بشكل آمن ومنظم، بما يساهم أيضاً في الاستقرار والأمن الأوسع في منطقة الشرق الأوسط بأكملها.',
      en: 'The Government of Lebanon commits to a rigorous, performance-based program to enable the capacity of the LAF to assert full military and security control within Lebanon in accordance with security arrangements, agreed upon within the framework of negotiations, and to implement the disarmament of all non-state armed groups and exercise effective authority across Lebanon. The Government of Lebanon welcomes the readiness of the United States to support such efforts, recognizing that any new U.S. assistance will be strictly conditioned on verifiable milestones, full transparency, demonstrated results, and ongoing oversight. This effort will enable the safe and orderly re-establishment of Lebanese sovereignty, also contributing to the broader stability and security of the entire Middle East.'
    },
    {
      num: 10,
      titleAr: 'حشد الدعم الدولي لإعادة الإعمار والتعافي',
      titleEn: 'International Aid, Infrastructure & Recovery',
      ar: 'وبشكل منفصل ومتزامن، ستعمل الولايات المتحدة على حشد الشركاء الدوليين لدعم حكومة لبنان بصورة فعالة في إعادة بناء البلاد، وإصلاح البنية التحتية، واستعادة الاقتصاد، وخلق فرص للازدهار. ومن المتوقع أن يشمل ذلك حشد مساعدات كبيرة لإعادة الإعمار والمساعدات الإنسانية للبنان، وبرامج للتعافي الاقتصادي، ومبادرات استثمارية، بما يمكّن لبنان من التعافي من سنوات النزاع وتوفير مستقبل أفضل لجميع مواطنيه.',
      en: 'Separately, and simultaneously, the United States will rally international partners to actively support the Government of Lebanon in rebuilding the country, repairing infrastructure, restoring the economy, and creating opportunities for prosperity. This is expected to include mobilizing substantial reconstruction and humanitarian assistance for Lebanon, economic recovery programs, and investment initiatives so that Lebanon can recover from years of conflict and provide a better future for all its citizens.'
    },
    {
      num: 11,
      titleAr: 'تجفيف منابع تمويل المجموعات غير الشرعية',
      titleEn: 'Preventing Funding Streams to Non-State Actors',
      ar: 'يلتزم لبنان والولايات المتحدة بمنع تدفق الأموال إلى أي كيان أو منظمة أو فرد مرتبط بالجماعات المسلحة غير التابعة للدولة، واتخاذ التدابير القانونية المتاحة لحظر أنشطة أي كيان أو منظمة أو فرد من هذا النوع. كما تلتزم حكومة لبنان صراحةً بمنع وصول أموال إعادة الإعمار إلى الجماعات المسلحة غير التابعة للدولة والكيانات المرتبطة بها.',
      en: 'Lebanon and the United States commit to preventing funds from flowing to any entity, organization, or individual affiliated with non-state armed groups and to take available legal measures to proscribe the activity of any such entity, organization or individual. The Government of Lebanon explicitly commits to prevent reconstruction funds from flowing to non-state armed groups and connected entities.'
    },
    {
      num: 12,
      titleAr: 'صياغة اتفاق السلام الشامل والاتصال المباشر',
      titleEn: 'Working Groups for Comprehensive Peace',
      ar: 'عند توقيع هذا الإطار، سيعمل البلدان على إنشاء مجموعات عمل لصياغة اتفاق السلام والأمن الشامل الكامل. وإضافة إلى ذلك، ولتحقيق أهداف الإطار، ستنشئ الحكومتان فوراً مسارات مكمّلة من التواصل المباشر المستمر، بتسهيل من الولايات المتحدة. وتلتزم الحكومتان بالمضي بحسن نية حتى تحقيق سلام كامل ودائم، يجلب الأمن والاستقرار والازدهار لشعبي إسرائيل ولبنان.',
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
      ar: 'تقر الحكومتان بالدور الذي تؤديه الولايات المتحدة في دعم جهودهما لإنهاء عقود من النزاع وإرساء استقرار دائم وسلام شامل بين البلدين، وتعربان عن تقديرهما العميق لرؤية الرئيس دونالد ج. ترامب وقيادته.',
      en: 'The two governments acknowledge the role of the United States in supporting their efforts to end decades of conflict and establish lasting stability and comprehensive peace between the two countries and express their deep appreciation for the vision and leadership of President Donald J. Trump.'
    }
  ];

  return (
    <div className="border-4 border-double border-amber-800 p-5 md:p-6 bg-[#fdfbf7] text-black relative my-8 shadow-[6px_6px_0px_0px_rgba(180,83,9,1)]">
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
          <span>{isAr ? 'وثيقة ثنائية اللغة: العربية والانجليزية' : 'Bilingual Document: Arabic & English'}</span>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-amber-850 tracking-tight leading-tight uppercase font-mono">
          {isAr ? 'اتفاق الإطار اللبناني الإسرائيلي الثلاثي (واشنطن ٢٠٢٦)' : 'Trilateral Lebanon-Israel Framework Agreement (Washington 2026)'}
        </h3>
        <h2 className="text-2xl md:text-4.5xl font-black text-zinc-950 tracking-tight leading-none">
          {isAr ? 'واقع جيولوجي غير مبشر وجيوسياسي متفجر' : 'An Unpromising Geology & Explosive Geopolitics'}
        </h2>
        <p className="text-base md:text-lg text-zinc-700 font-serif max-w-4xl mx-auto leading-relaxed">
          {isAr 
            ? 'تفكيك بنود اتفاق الترسيم والواقع المادي المخيب بعد جفاف بئر قانا، متبوعاً بالنصّ الحرفي الكامل للاتفاق الموقّع برعاية أمريكية يوم الجمعة ٢٦ حزيران ٢٠٢٦.'
            : 'Deconstructing the demarcation clauses and the disappointing physical reality after Qana-1 well dried up, followed by the complete literal trilateral text signed under US auspices on June 26, 2026.'}
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap border-b border-zinc-200 mb-6 gap-1 md:gap-2">
        <button
          onClick={() => setActiveSubTab('timeline')}
          className={`px-4 py-2 text-xs md:text-sm font-bold font-sans cursor-pointer transition-all border-b-2 ${
            activeSubTab === 'timeline'
              ? 'border-amber-800 text-amber-850 bg-amber-50/50'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          📅 {isAr ? 'المسار الزمني (٢٠٢٠ - ٢٠٢٦)' : 'Chronological Path (2020 - 2026)'}
        </button>
        <button
          onClick={() => setActiveSubTab('gains-losses')}
          className={`px-4 py-2 text-xs md:text-sm font-bold font-sans cursor-pointer transition-all border-b-2 ${
            activeSubTab === 'gains-losses'
              ? 'border-amber-800 text-amber-850 bg-amber-50/50'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          ⚖️ {isAr ? 'ميزان الأثر: سيادة حبرية vs واقع معطل' : 'Impact Balance: Sovereign vs Material'}
        </button>
        <button
          onClick={() => setActiveSubTab('bilingual-text')}
          className={`px-4 py-2 text-xs md:text-sm font-bold font-sans cursor-pointer transition-all border-b-2 ${
            activeSubTab === 'bilingual-text'
              ? 'border-amber-800 text-amber-850 bg-amber-50/50'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          📜 {isAr ? 'تصفح بنود الاتفاق الـ ١٤ حرفياً' : 'Examine the 14 Treaty Clauses Literally'}
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
                    <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-serif">
                      {isAr ? event.descAr : event.descEn}
                    </p>
                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-bold text-zinc-500 font-mono">
                      <span>{isAr ? 'الوضعية:' : 'Status:'}</span>
                      <span className="text-amber-850">{isAr ? event.statusAr : event.statusEn}</span>
                    </div>
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
                  <p className="text-xs text-zinc-750 font-serif leading-relaxed">
                    {isAr ? gain.descAr : gain.descEn}
                  </p>
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
                  <p className="text-xs text-zinc-750 font-serif leading-relaxed">
                    {isAr ? reality.descAr : reality.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Bilingual Text Examiner */}
      {activeSubTab === 'bilingual-text' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 text-xs font-serif text-amber-950 leading-relaxed space-y-1">
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
                    <p className="text-xs md:text-sm text-zinc-800 font-serif leading-relaxed whitespace-pre-line bg-amber-50/20 p-3 border border-amber-100">
                      {articlesData[selectedArticleIdx].ar}
                    </p>
                  </div>

                  {/* English block */}
                  <div className="space-y-2 text-left ltr:text-left" dir="ltr">
                    <h4 className="font-sans font-black text-sm text-zinc-950 border-l-2 border-amber-850 pl-2">
                      {articlesData[selectedArticleIdx].titleEn}
                    </h4>
                    <p className="text-xs md:text-sm text-zinc-850 font-serif leading-relaxed whitespace-pre-line bg-zinc-50 p-3 border border-zinc-200">
                      {articlesData[selectedArticleIdx].en}
                    </p>
                  </div>
                </div>

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
                    <p className="text-xs md:text-sm text-zinc-800 font-serif leading-relaxed">
                      {article.ar}
                    </p>
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
                    <p className="text-xs md:text-sm text-zinc-800 font-serif leading-relaxed">
                      {article.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
